-- Administrator-run shared-country verification after the compatibility migration.
-- Execute this complete file in one connection, with stop-on-error enabled.
-- Synthetic example.test users and records exist only inside this transaction.
-- No customer records, passwords, memberships, policies or triggers are changed.
-- No email provider is called. Do not replace ROLLBACK with COMMIT.
select 'before' as phase,
  (select count(*) from auth.users) as auth_users,
  (select count(*) from public.trip_plans) as plans,
  (select count(*) from public.trip_plans where coalesce(details->>'country','australia') = 'australia') as australian_plans,
  (select count(*) from public.trip_plans where details->>'country' = 'colombia') as colombian_plans,
  (select count(*) from public.quote_requests) as quotes,
  (select count(*) from private.contact_requests) as contacts;

begin;
set local statement_timeout = '20s';
set local lock_timeout = '3s';
set local plpgsql.check_asserts = on;
create function pg_temp.v(k text) returns text language sql stable as $$ select current_setting('shared_live.' || k) $$;
create function pg_temp.u(k text) returns uuid language sql stable as $$ select pg_temp.v(k)::uuid $$;
create function pg_temp.expect_error(statement text, expected text) returns void language plpgsql as $$
declare actual text;
begin
  begin execute statement; exception when others then get stacked diagnostics actual = returned_sqlstate; end;
  assert actual = expected,format('Expected %s, got %s',expected,coalesce(actual,'success'));
end; $$;
grant execute on function pg_temp.v(text), pg_temp.u(text), pg_temp.expect_error(text,text) to anon,authenticated,service_role;
do $$ declare k text; begin
  foreach k in array array['a','b','au_plan','co_plan','quote_key','contact_key'] loop
    perform set_config('shared_live.' || k,gen_random_uuid()::text,true);
  end loop;
  foreach k in array array['a','b'] loop
    insert into auth.users(id,email,email_confirmed_at)
      values(pg_temp.u(k),'shared-rollback+' || pg_temp.v(k) || '@example.test',clock_timestamp());
  end loop;
  perform set_config('shared_live.au','{"regions":["tasmania"],"travelWhen":"Flexible","partySize":"2","message":"ROLLBACK QA - not a booking"}',true);
  perform set_config('shared_live.co','{"country":"colombia","regions":["pacific","western-andes","central-andes","eastern-andes","cauca-valley","magdalena-valley","caribbean","sierra-nevada-de-santa-marta","llanos","amazonia","colombian-massif"],"travelWhen":"Flexible","partySize":"2","message":"ROLLBACK QA - not a booking"}',true);
end; $$;

set local role anon;
select pg_temp.expect_error('select id from public.trip_plans','42501');
select pg_temp.expect_error($q$select public.submit_shared_contact_request(gen_random_uuid(),repeat('a',64),'inquiry','Test','synthetic@example.test',false,'test')$q$,'42501');
reset role;
set local role authenticated;
do $$ begin perform set_config('request.jwt.claim.sub',pg_temp.v('a'),true); end; $$;
do $$ begin
  insert into public.trip_plans(id,user_id,title,details,create_payload_hash) values
    (pg_temp.u('co_plan'),pg_temp.u('a'),'ROLLBACK QA Colombia',pg_temp.v('co')::jsonb,repeat('a',64)),
    (pg_temp.u('au_plan'),pg_temp.u('a'),'ROLLBACK QA Australia',pg_temp.v('au')::jsonb,repeat('b',64));
  assert (select count(*) = 2 from public.trip_plans),'Only the synthetic owner plans are visible';
  assert (select jsonb_array_length(details->'regions') = 11 from public.trip_plans where id = pg_temp.u('co_plan'));
  update public.trip_plans set title = 'ROLLBACK QA Colombia edited',
    details = jsonb_set(details,'{travelWhen}','"Timing to discuss"') where id = pg_temp.u('co_plan');
  assert (select title = 'ROLLBACK QA Colombia edited' and details->>'country' = 'colombia'
    and details->>'travelWhen' = 'Timing to discuss' from public.trip_plans where id = pg_temp.u('co_plan'));
  perform pg_temp.expect_error($q$insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
    values(gen_random_uuid(),pg_temp.u('a'),'Mixed',jsonb_set(pg_temp.v('co')::jsonb,'{regions}','["pacific","tasmania"]'),repeat('c',64))$q$,'23514');
  perform pg_temp.expect_error($q$update public.trip_plans set details = jsonb_set(details,'{country}','"peru"')
    where id = pg_temp.u('co_plan')$q$,'23514');
end; $$;
do $$ begin perform set_config('request.jwt.claim.sub',pg_temp.v('b'),true); end; $$;
do $$ declare affected integer; begin
  assert not exists(select 1 from public.trip_plans),'Other account cannot see plans';
  update public.trip_plans set title = 'Wrong owner' where id = pg_temp.u('co_plan');
  get diagnostics affected = row_count;
  assert affected = 0,'Other account cannot edit the plan';
  perform pg_temp.expect_error($q$insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
    values(gen_random_uuid(),pg_temp.u('a'),'Wrong owner',pg_temp.v('co')::jsonb,repeat('c',64))$q$,'42501');
end; $$;
reset role;
set local role service_role;
do $$ declare receipt jsonb; replay jsonb; revision timestamptz; email_value text; begin
  email_value := 'shared-rollback+' || pg_temp.v('a') || '@example.test';
  select updated_at into revision from public.trip_plans where id = pg_temp.u('co_plan');
  receipt := public.submit_quote_request(pg_temp.u('a'),pg_temp.u('co_plan'),pg_temp.u('quote_key'),repeat('d',64),revision,'ROLLBACK QA',email_value);
  assert receipt->'plan_snapshot'->'details'->>'country' = 'colombia','Quote snapshot preserves Colombia';
  assert receipt->'plan_snapshot'->>'title' = 'ROLLBACK QA Colombia edited','Quote snapshots the edited draft';
  replay := public.submit_quote_request(pg_temp.u('a'),pg_temp.u('co_plan'),pg_temp.u('quote_key'),repeat('d',64),revision,'ROLLBACK QA',email_value);
  assert replay->>'created' = 'false' and replay->>'request_id' = receipt->>'request_id','Quote retry is durable';
  assert (select status = 'quote_requested' from public.trip_plans where id = pg_temp.u('co_plan'));
  receipt := public.submit_shared_contact_request(pg_temp.u('contact_key'),repeat('e',64),'inquiry','ROLLBACK QA',email_value,
    false,'co-travel-updates-2026-11-06','pacific','','','ROLLBACK QA - not a booking','colombia');
  assert (select country = 'colombia' from private.contact_requests where id = (receipt->>'request_id')::uuid);
  replay := public.submit_shared_contact_request(pg_temp.u('contact_key'),repeat('e',64),'inquiry','ROLLBACK QA',email_value,
    false,'co-travel-updates-2026-11-06','pacific','','','ROLLBACK QA - not a booking','colombia');
  assert replay->>'created' = 'false' and replay->>'request_id' = receipt->>'request_id';
  perform pg_temp.expect_error($q$select public.submit_shared_contact_request(gen_random_uuid(),repeat('a',64),'inquiry','Test','synthetic@example.test',false,'test','','','','','peru')$q$,'22023');
  assert not has_function_privilege('authenticated','public.submit_shared_contact_request(uuid,text,text,text,text,boolean,text,text,text,text,text,text)','EXECUTE');
  assert not (select prosecdef from pg_proc where oid = 'public.submit_shared_contact_request(uuid,text,text,text,text,boolean,text,text,text,text,text,text)'::regprocedure);
end; $$;
reset role;
set local role authenticated;
do $$ begin perform set_config('request.jwt.claim.sub',pg_temp.v('a'),true); end; $$;
do $$ declare affected integer; begin
  assert (select count(*) = 1 from public.quote_requests),'Only this client quote is visible';
  assert (select plan_snapshot->'details'->>'country' = 'colombia' from public.quote_requests where plan_id = pg_temp.u('co_plan'));
  update public.trip_plans set title = 'Cannot edit submitted' where id = pg_temp.u('co_plan');
  get diagnostics affected = row_count;
  assert affected = 0,'Submitted plan stays frozen';
end; $$;
do $$ begin perform set_config('request.jwt.claim.sub',pg_temp.v('b'),true); end; $$;
do $$ begin assert not exists(select id from public.quote_requests),'Other account cannot read the quote'; end; $$;
reset role;
rollback;

-- Compare these aggregate-only results with the initial snapshot; no PII is returned.
-- A concurrent real submission can legitimately change counts; investigate any delta.
select 'after_rollback' as phase,
  (select count(*) from auth.users) as auth_users,
  (select count(*) from public.trip_plans) as plans,
  (select count(*) from public.trip_plans where coalesce(details->>'country','australia') = 'australia') as australian_plans,
  (select count(*) from public.trip_plans where details->>'country' = 'colombia') as colombian_plans,
  (select count(*) from public.quote_requests) as quotes,
  (select count(*) from private.contact_requests) as contacts;
