-- Isolated synthetic rollback verification. Never sends mail or exports data.
begin;
set local plpgsql.check_asserts = on;
create function pg_temp.v(k text) returns text language sql stable as $$ select current_setting('shared.' || k) $$;
create function pg_temp.u(k text) returns uuid language sql stable as $$ select pg_temp.v(k)::uuid $$;
create function pg_temp.expect_error(statement text, expected text) returns void language plpgsql as $$
declare actual text;
begin
  begin execute statement; exception when others then get stacked diagnostics actual = returned_sqlstate; end;
  assert actual = expected,format('Expected %s, got %s',expected,coalesce(actual,'success'));
end; $$;
grant execute on function pg_temp.v(text), pg_temp.u(text), pg_temp.expect_error(text,text) to authenticated,service_role,anon;
do $$ declare k text; begin
  foreach k in array array['a','b','legacy','co_plan','contact','old_contact'] loop
    perform set_config('shared.' || k,gen_random_uuid()::text,true);
  end loop;
  foreach k in array array['a','b'] loop
    insert into auth.users(id,email,email_confirmed_at)
      values(pg_temp.u(k),'shared+' || pg_temp.v(k) || '@example.test',clock_timestamp());
  end loop;
  perform set_config('shared.au','{"regions":["Tasmania"],"travelWhen":"Flexible","partySize":"2","message":"Synthetic"}',true);
  perform set_config('shared.co','{"country":"colombia","regions":["pacific","western-andes","central-andes","eastern-andes","cauca-valley","magdalena-valley","caribbean","sierra-nevada-de-santa-marta","llanos","amazonia","colombian-massif"],"travelWhen":"Flexible","partySize":"2","message":"Synthetic"}',true);
end; $$;

-- Emulate an already stored, pre-migration freeform AU draft as administrator.
alter table public.trip_plans disable trigger trip_plan_country_regions;
insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
  values(pg_temp.u('legacy'),pg_temp.u('a'),'Legacy AU',jsonb_set(pg_temp.v('au')::jsonb,'{regions}','["North Queensland rainforest"]'),repeat('a',64));
alter table public.trip_plans enable trigger trip_plan_country_regions;

set local role anon;
select pg_temp.expect_error('select id from public.trip_plans','42501');
select pg_temp.expect_error($q$select public.submit_shared_contact_request(gen_random_uuid(),repeat('a',64),'inquiry','Test','synthetic@example.test',false,'test')$q$,'42501');
reset role;
set local role authenticated;
select set_config('request.jwt.claim.sub',pg_temp.v('a'),true);
do $$ begin
  insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
    values(pg_temp.u('co_plan'),pg_temp.u('a'),'Colombia',pg_temp.v('co')::jsonb,repeat('b',64));
  assert (select jsonb_array_length(details->'regions') = 11 and details->>'country' = 'colombia'
    from public.trip_plans where id = pg_temp.u('co_plan')),'All 11 Colombia regions persist';
  perform pg_temp.expect_error($q$insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
    values(gen_random_uuid(),pg_temp.u('a'),'Mixed',jsonb_set(pg_temp.v('co')::jsonb,'{regions}','["pacific","tasmania"]'),repeat('c',64))$q$,'23514');
  perform pg_temp.expect_error($q$insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
    values(gen_random_uuid(),pg_temp.u('a'),'Missing country',pg_temp.v('co')::jsonb - 'country',repeat('c',64))$q$,'23514');
  perform pg_temp.expect_error($q$insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
    values(gen_random_uuid(),pg_temp.u('a'),'Invalid country',jsonb_set(pg_temp.v('co')::jsonb,'{country}','"peru"'),repeat('c',64))$q$,'23514');
  perform pg_temp.expect_error($q$insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
    values(gen_random_uuid(),pg_temp.u('a'),'New freeform',jsonb_set(pg_temp.v('au')::jsonb,'{regions}','["Unlisted place"]'),repeat('c',64))$q$,'23514');
  update public.trip_plans set title = 'Edited legacy' where id = pg_temp.u('legacy');
  assert (select details->'regions' = '["North Queensland rainforest"]'::jsonb from public.trip_plans where id = pg_temp.u('legacy')),
    'Exact old freeform selection survives an edit';
  perform pg_temp.expect_error($q$update public.trip_plans set details = jsonb_set(details,'{regions}','["North Queensland rainforest","Unlisted place"]')
    where id = pg_temp.u('legacy')$q$,'23514');
  perform pg_temp.expect_error($q$update public.trip_plans set details = jsonb_set(details,'{country}','"colombia"')
    where id = pg_temp.u('legacy')$q$,'23514');
  perform pg_temp.expect_error($q$insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
    values(pg_temp.u('legacy'),pg_temp.u('a'),'Legacy AU',jsonb_set(pg_temp.v('au')::jsonb,'{regions}','["North Queensland rainforest"]'),repeat('a',64))$q$,'23505');
  perform pg_temp.expect_error($q$select public.submit_shared_contact_request(gen_random_uuid(),repeat('a',64),'inquiry','Test','synthetic@example.test',false,'test')$q$,'42501');
end; $$;
select set_config('request.jwt.claim.sub',pg_temp.v('b'),true);
do $$ declare affected integer; begin
  assert not exists(select 1 from public.trip_plans),'Other account cannot see either country';
  update public.trip_plans set title = 'Wrong owner' where id = pg_temp.u('co_plan');
  get diagnostics affected = row_count;
  assert affected = 0,'Country never grants cross-account edits';
  perform pg_temp.expect_error($q$insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
    values(gen_random_uuid(),pg_temp.u('a'),'Wrong owner',pg_temp.v('co')::jsonb,repeat('c',64))$q$,'42501');
end; $$;
reset role;
set local role service_role;
do $$ declare receipt jsonb; revision timestamptz; email_value text; event_count integer; begin
  email_value := 'shared+' || pg_temp.v('a') || '@example.test';
  select updated_at into revision from public.trip_plans where id = pg_temp.u('co_plan');
  receipt := public.submit_quote_request(pg_temp.u('a'),pg_temp.u('co_plan'),gen_random_uuid(),repeat('d',64),revision,'Synthetic',email_value);
  assert receipt->'plan_snapshot'->'details'->>'country' = 'colombia','Quote freezes country from the owned plan';
  -- Service quote submission must also preserve an exact legacy freeform region.
  select updated_at into revision from public.trip_plans where id = pg_temp.u('legacy');
  receipt := public.submit_quote_request(pg_temp.u('a'),pg_temp.u('legacy'),gen_random_uuid(),repeat('e',64),revision,'Synthetic',email_value);
  assert receipt->'plan_snapshot'->'details'->'regions' = '["North Queensland rainforest"]'::jsonb;

  receipt := public.submit_shared_contact_request(pg_temp.u('contact'),repeat('f',64),'inquiry','Synthetic',email_value,
    true,'co-travel-updates-2026-11-06','pacific','','','Synthetic','colombia');
  assert (select country = 'colombia' from private.contact_requests where id = (receipt->>'request_id')::uuid);
  assert (select consent_version = 'co-travel-updates-2026-11-06' from private.consent_events where contact_request_id = (receipt->>'request_id')::uuid);
  select count(*) into event_count from private.consent_events;
  receipt := public.submit_shared_contact_request(pg_temp.u('contact'),repeat('f',64),'inquiry','Synthetic',email_value,
    true,'co-travel-updates-2026-11-06','pacific','','','Synthetic','colombia');
  assert receipt->>'created' = 'false' and (select count(*) from private.consent_events) = event_count,'Country retry creates no new consent';
  perform pg_temp.expect_error(format($q$select public.submit_shared_contact_request(%L,repeat('f',64),'inquiry','Synthetic',%L,false,'test','','','','','australia')$q$,
    pg_temp.v('contact'),email_value),'PT409');
  perform pg_temp.expect_error($q$select public.submit_shared_contact_request(gen_random_uuid(),repeat('a',64),'inquiry','Test','synthetic@example.test',false,'test','','','','','peru')$q$,'22023');
  perform pg_temp.expect_error($q$select public.submit_shared_contact_request(gen_random_uuid(),repeat('a',64),'inquiry','Test','synthetic@example.test',false,'test','tasmania','','','','colombia')$q$,'22023');
  receipt := public.submit_contact_request(pg_temp.u('old_contact'),repeat('1',64),'inquiry','Synthetic',email_value,false,'au-launch-updates-2026-11-05','Tasmania');
  assert (select country = 'australia' from private.contact_requests where id = (receipt->>'request_id')::uuid),'Old RPC remains Australian';
  receipt := public.submit_shared_contact_request(pg_temp.u('old_contact'),repeat('1',64),'inquiry','Synthetic',email_value,false,'au-launch-updates-2026-11-05','Tasmania');
  assert receipt->>'created' = 'false','New wrapper can replay an old Australian RPC request';
  assert not has_function_privilege('authenticated','public.submit_shared_contact_request(uuid,text,text,text,text,boolean,text,text,text,text,text,text)','EXECUTE');
  assert not (select prosecdef from pg_proc where oid = 'public.submit_shared_contact_request(uuid,text,text,text,text,boolean,text,text,text,text,text,text)'::regprocedure);
end; $$;
rollback;
