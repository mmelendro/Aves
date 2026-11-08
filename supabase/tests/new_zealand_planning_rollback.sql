-- Synthetic identities and records only; the entire transaction rolls back.
-- No email is sent, no password/session is created, and existing guests are not read.
begin;
set local statement_timeout = '20s';
set local plpgsql.check_asserts = on;
create function pg_temp.nz(k text) returns uuid language sql stable as $$ select current_setting('nz_qa.' || k)::uuid $$;
create function pg_temp.nz_error(statement text, expected text) returns void language plpgsql as $$
declare actual text;
begin
  begin execute statement; exception when others then get stacked diagnostics actual = returned_sqlstate; end;
  assert actual = expected,format('Expected %s, got %s',expected,coalesce(actual,'success'));
end; $$;
grant execute on function pg_temp.nz(text),pg_temp.nz_error(text,text) to anon,authenticated,service_role;
do $$ declare k text; begin
  foreach k in array array['a','b','owner','plan','quote'] loop perform set_config('nz_qa.' || k,gen_random_uuid()::text,true); end loop;
  foreach k in array array['a','b','owner'] loop
    insert into auth.users(id,email,email_confirmed_at) values(pg_temp.nz(k),'nz-qa+' || pg_temp.nz(k)::text || '@example.test',clock_timestamp());
  end loop;
  insert into private.site_admins(user_id,grant_note) values(pg_temp.nz('owner'),'Synthetic rollback QA only');
end; $$;
set local role anon;
select pg_temp.nz_error('select id from public.trip_plans','42501');
reset role;
set local role authenticated;
do $$ begin perform set_config('request.jwt.claim.sub',pg_temp.nz('a')::text,true); end; $$;
do $$ declare fixture jsonb; bad jsonb; begin
  fixture := '{"country":"new-zealand","regions":["south-island"],"travelWhen":"Year to confirm","partySize":"2 people","message":"Synthetic planning QA","questionnaire":{"version":1,"pace":"balanced","birding":"alternate","comfort":"comfortable","interests":["birds","food"]}}';
  assert public.trip_details_valid(fixture);
  foreach bad in array array[
    jsonb_set(fixture,'{questionnaire}','null'),
    jsonb_set(fixture,'{questionnaire,version}','2'),
    jsonb_set(fixture,'{questionnaire,pace}','"invalid"'),
    jsonb_set(fixture,'{questionnaire,interests}','["birds","birds"]'),
    jsonb_set(fixture,'{questionnaire,unexpected}','true'),
    jsonb_set(fixture,'{country}','"australia"')
  ] loop assert not public.trip_details_valid(bad),'Malformed or wrong-country answers must fail'; end loop;
  insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
    values(pg_temp.nz('plan'),pg_temp.nz('a'),'Synthetic NZ planning QA',fixture,repeat('a',64));
  assert (select details->'questionnaire'->>'birding' = 'alternate' from public.trip_plans where id=pg_temp.nz('plan'));
  update public.trip_plans set details=jsonb_set(details,'{questionnaire,pace}','"relaxed"') where id=pg_temp.nz('plan');
  assert (select details->'questionnaire'->>'pace' = 'relaxed' from public.trip_plans where id=pg_temp.nz('plan'));
  perform pg_temp.nz_error($q$update public.trip_plans set details=jsonb_set(details,'{regions}','["tasmania"]') where id=pg_temp.nz('plan')$q$,'23514');
end; $$;
do $$ begin perform set_config('request.jwt.claim.sub',pg_temp.nz('b')::text,true); end; $$;
do $$ declare affected integer; begin
  assert not exists(select id from public.trip_plans where id=pg_temp.nz('plan')),'Other account must not see the brief';
  update public.trip_plans set title='Wrong owner' where id=pg_temp.nz('plan');
  get diagnostics affected=row_count; assert affected=0,'Other account must not edit answers';
end; $$;
reset role;
set local role service_role;
do $$ declare receipt jsonb; replay jsonb; stamp timestamptz; begin
  select updated_at into stamp from public.trip_plans where id=pg_temp.nz('plan');
  receipt := public.submit_quote_request(pg_temp.nz('a'),pg_temp.nz('plan'),pg_temp.nz('quote'),repeat('b',64),stamp,'Synthetic QA','nz-qa+' || pg_temp.nz('a')::text || '@example.test');
  assert receipt->'plan_snapshot'->'details'->'questionnaire'->>'pace'='relaxed','Frozen submission retains reviewed answers';
  replay := public.submit_quote_request(pg_temp.nz('a'),pg_temp.nz('plan'),pg_temp.nz('quote'),repeat('b',64),stamp,'Synthetic QA','nz-qa+' || pg_temp.nz('a')::text || '@example.test');
  assert replay->>'created'='false' and replay->>'request_id'=receipt->>'request_id','Retry must not duplicate submission';
  assert exists(select 1 from jsonb_array_elements(public.list_admin_quotes(pg_temp.nz('owner'),100)) q where q->'plan_snapshot'->'details'->'questionnaire'->>'pace'='relaxed'),'Authorized owner can read the submitted questionnaire';
  perform pg_temp.nz_error($q$select public.list_admin_quotes(pg_temp.nz('b'),100)$q$,'PT403');
end; $$;
reset role;
set local role authenticated;
do $$ begin perform set_config('request.jwt.claim.sub',pg_temp.nz('b')::text,true); end; $$;
do $$ begin assert not exists(select id from public.quote_requests where plan_id=pg_temp.nz('plan')),'Other account cannot read submitted answers'; end; $$;
do $$ begin perform set_config('request.jwt.claim.sub',pg_temp.nz('a')::text,true); end; $$;
do $$ declare affected integer; begin
  update public.trip_plans set title='Cannot edit frozen brief' where id=pg_temp.nz('plan');
  get diagnostics affected=row_count; assert affected=0;
end; $$;
reset role;
rollback;
select 'NZ questionnaire validation, isolation, edit, immutable submission, retry and owner access passed; synthetic changes rolled back' as result;
