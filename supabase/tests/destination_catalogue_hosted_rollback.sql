-- Runs on local PGlite or the shared hosted project as database administrator.
-- All synthetic countries, users, plans, requests and catalogue changes ROLLBACK.
-- No emails are sent. Existing customer records are never updated or selected.
select 'before' as phase,
  (select count(*) from auth.users) as auth_users,
  (select count(*) from public.trip_plans) as plans,
  (select count(*) from public.quote_requests) as quotes,
  (select count(*) from private.contact_requests) as contacts,
  (select count(*) from public.destination_countries) as countries,
  (select count(*) from public.destination_regions) as regions;
begin;
set local statement_timeout = '20s';
set local lock_timeout = '3s';
set local plpgsql.check_asserts = on;
create function pg_temp.v(k text) returns text language sql stable as $$ select current_setting('catalogue_test.' || k) $$;
create function pg_temp.u(k text) returns uuid language sql stable as $$ select pg_temp.v(k)::uuid $$;
create function pg_temp.expect_error(statement text,expected text) returns void language plpgsql as $$
declare actual text;
begin
  begin execute statement; exception when others then get stacked diagnostics actual = returned_sqlstate; end;
  assert actual = expected,format('Expected %s, got %s',expected,coalesce(actual,'success'));
end; $$;
grant execute on function pg_temp.v(text),pg_temp.u(text),pg_temp.expect_error(text,text) to anon,authenticated,service_role;
do $$ declare k text; begin
  assert not exists(select 1 from public.destination_countries where id = 'verification-destination'), 'Synthetic country must not exist before test';
  assert (select not enabled from public.destination_countries where id = 'ecuador');
  assert (select not enabled from public.destination_countries where id = 'costa-rica');
  assert not exists(select 1 from public.destination_regions where country_id in ('ecuador','costa-rica'));
  foreach k in array array['a','b','plan','quote','contact','au_contact'] loop
    perform set_config('catalogue_test.' || k,gen_random_uuid()::text,true);
  end loop;
  foreach k in array array['a','b'] loop
    insert into auth.users(id,email,email_confirmed_at)
      values(pg_temp.u(k),'catalogue-rollback+' || pg_temp.v(k) || '@example.test',clock_timestamp());
  end loop;
  perform set_config('catalogue_test.details','{"country":"verification-destination","regions":["test-forest"],"travelWhen":"Flexible","partySize":"2","message":"ROLLBACK QA - not a booking"}',true);
end; $$;
insert into public.destination_countries(id,label,enabled) values('verification-destination','Synthetic destination',true);
insert into public.destination_regions(country_id,id,label,accept_label) values
  ('verification-destination','test-forest','Test Forest',false),
  -- A repeated region ID in another country must not invalidate Australia's own region.
  ('verification-destination','tasmania','Synthetic Tasmania',false);

set local role anon;
select pg_temp.expect_error('select * from public.destination_countries','42501');
select pg_temp.expect_error('select * from public.destination_regions','42501');
select pg_temp.expect_error('select * from public.trip_plans','42501');
select pg_temp.expect_error($q$select public.trip_country_enabled('australia')$q$,'42501');
select pg_temp.expect_error($q$select public.replay_shared_contact_request(gen_random_uuid(),repeat('a',64),'australia')$q$,'42501');
reset role;
set local role authenticated;
do $$ begin perform set_config('request.jwt.claim.sub',pg_temp.v('a'),true); end; $$;
do $$ begin
  assert public.trip_country_enabled('verification-destination');
  assert not public.trip_country_enabled('ecuador') and not public.trip_country_enabled('costa-rica');
  assert not public.trip_country_enabled('unknown-country') and not public.trip_country_enabled(null);
  assert public.trip_region_valid('australia','tasmania') and public.trip_region_valid('australia','Tasmania');
  assert public.trip_region_valid('verification-destination','test-forest');
  assert not public.trip_region_valid('verification-destination','Test Forest');
  assert public.trip_region_is_other_country('australia','Test Forest');
  assert not public.trip_details_valid('{"country":"__proto__","regions":[],"travelWhen":"","partySize":"","message":""}');
  assert not public.trip_details_valid('{"country":null,"regions":[],"travelWhen":"","partySize":"","message":""}');
  perform pg_temp.expect_error($q$update public.destination_countries set enabled = true where id = 'ecuador'$q$,'42501');
  perform pg_temp.expect_error($q$insert into public.destination_countries values('forged-country','Forged',true)$q$,'42501');
  perform pg_temp.expect_error($q$delete from public.destination_countries where id = 'ecuador'$q$,'42501');
  perform pg_temp.expect_error($q$insert into public.destination_regions values('australia','fake','Fake',false)$q$,'42501');
  perform pg_temp.expect_error('select * from private.contact_requests','42501');
  perform pg_temp.expect_error($q$select public.submit_shared_contact_request(gen_random_uuid(),repeat('a',64),'inquiry','Test','synthetic@example.test',false,'test')$q$,'42501');
  perform pg_temp.expect_error($q$select public.replay_shared_contact_request(gen_random_uuid(),repeat('a',64),'australia')$q$,'42501');
  insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
    values(pg_temp.u('plan'),pg_temp.u('a'),'Synthetic new country',pg_temp.v('details')::jsonb,repeat('a',64));
  assert (select destination_country = 'verification-destination' and details->>'country' = 'verification-destination'
    from public.trip_plans where id = pg_temp.u('plan')),'New countries survive storage without falling back to Australia';
  perform pg_temp.expect_error($q$update public.trip_plans set destination_country = 'australia' where id = pg_temp.u('plan')$q$,'428C9');
  perform pg_temp.expect_error($q$insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
    values(gen_random_uuid(),pg_temp.u('a'),'Disabled',jsonb_set(pg_temp.v('details')::jsonb,'{country}','"ecuador"'),repeat('b',64))$q$,'23514');
  perform pg_temp.expect_error($q$insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
    values(gen_random_uuid(),pg_temp.u('a'),'Unknown',jsonb_set(pg_temp.v('details')::jsonb,'{country}','"unknown-country"'),repeat('b',64))$q$,'23514');
  perform pg_temp.expect_error($q$update public.trip_plans set details = jsonb_set(details,'{regions}','["test-forest","llanos"]') where id = pg_temp.u('plan')$q$,'23514');
  perform pg_temp.expect_error($q$update public.trip_plans set details = jsonb_set(details,'{country}','"costa-rica"') where id = pg_temp.u('plan')$q$,'23514');
end; $$;
do $$ begin perform set_config('request.jwt.claim.sub',pg_temp.v('b'),true); end; $$;
do $$ declare affected integer; begin
  assert not exists(select 1 from public.trip_plans),'Another country does not bypass account ownership';
  update public.trip_plans set title = 'Wrong owner' where id = pg_temp.u('plan');
  get diagnostics affected = row_count;
  assert affected = 0;
end; $$;
reset role;
set local role service_role;
do $$ declare receipt jsonb; replay jsonb; email_value text; contact_count integer; consent_count integer; begin
  email_value := 'catalogue-rollback+' || pg_temp.v('a') || '@example.test';
  perform pg_temp.expect_error($q$update public.destination_countries set enabled = true where id = 'ecuador'$q$,'42501');
  receipt := public.submit_shared_contact_request(pg_temp.u('contact'),repeat('b',64),'inquiry','ROLLBACK QA',email_value,
    true,'synthetic-destination-consent','test-forest','','','ROLLBACK QA - not a booking','verification-destination');
  assert (select country = 'verification-destination' from private.contact_requests where id = (receipt->>'request_id')::uuid);
  assert (select consent_version = 'synthetic-destination-consent' from private.consent_events where contact_request_id = (receipt->>'request_id')::uuid);
  replay := public.submit_shared_contact_request(pg_temp.u('contact'),repeat('b',64),'inquiry','ROLLBACK QA',email_value,
    true,'synthetic-destination-consent','test-forest','','','ROLLBACK QA - not a booking','verification-destination');
  assert replay->>'created' = 'false' and replay->>'request_id' = receipt->>'request_id';
  select count(*) into contact_count from private.contact_requests;
  select count(*) into consent_count from private.consent_events;
  replay := public.replay_shared_contact_request(pg_temp.u('contact'),repeat('b',64),'verification-destination');
  assert replay = receipt || '{"created":false}'::jsonb,'Read-only replay matches the original receipt even while database country remains enabled';
  perform pg_temp.expect_error(format($q$select public.replay_shared_contact_request(%L,repeat('c',64),'verification-destination')$q$,pg_temp.v('contact')),'PT409');
  perform pg_temp.expect_error(format($q$select public.replay_shared_contact_request(%L,repeat('b',64),'australia')$q$,pg_temp.v('contact')),'PT409');
  perform pg_temp.expect_error($q$select public.replay_shared_contact_request(gen_random_uuid(),repeat('b',64),'verification-destination')$q$,'22023');
  perform pg_temp.expect_error($q$select public.replay_shared_contact_request(null,repeat('b',64),'verification-destination')$q$,'22023');
  perform pg_temp.expect_error(format($q$select public.replay_shared_contact_request(%L,'not-a-hash','verification-destination')$q$,pg_temp.v('contact')),'22023');
  perform pg_temp.expect_error(format($q$select public.replay_shared_contact_request(%L,repeat('b',64),null)$q$,pg_temp.v('contact')),'22023');
  assert (select count(*) from private.contact_requests) = contact_count and (select count(*) from private.consent_events) = consent_count;
  assert (select provolatile = 's' and not prosecdef from pg_proc where oid = 'public.replay_shared_contact_request(uuid,text,text)'::regprocedure);
  perform pg_temp.expect_error(format($q$select public.submit_shared_contact_request(%L,repeat('b',64),'inquiry','ROLLBACK QA',%L,false,'test','','','','','colombia')$q$,
    pg_temp.v('contact'),email_value),'PT409');
  perform pg_temp.expect_error($q$select public.submit_shared_contact_request(gen_random_uuid(),repeat('c',64),'inquiry','Test','synthetic@example.test',false,'test','','','','','ecuador')$q$,'22023');
  perform pg_temp.expect_error($q$select public.submit_shared_contact_request(gen_random_uuid(),repeat('c',64),'inquiry','Test','synthetic@example.test',false,'test','','','','','unknown-country')$q$,'22023');
  perform pg_temp.expect_error($q$select public.submit_shared_contact_request(gen_random_uuid(),repeat('c',64),'inquiry','Test','synthetic@example.test',false,'test','llanos','','','','verification-destination')$q$,'22023');
  perform pg_temp.expect_error($q$select public.submit_shared_contact_request(gen_random_uuid(),repeat('c',64),'inquiry','Test','synthetic@example.test',false,'test','Test Forest','','','','australia')$q$,'22023');
  receipt := public.submit_shared_contact_request(pg_temp.u('au_contact'),repeat('d',64),'inquiry','ROLLBACK QA',email_value,
    false,'au-launch-updates-2026-11-05','tasmania','','','ROLLBACK QA - not a booking','australia');
  assert (select country = 'australia' from private.contact_requests where id = (receipt->>'request_id')::uuid),'An own region takes precedence over a shared foreign region name';
end; $$;
reset role;
-- Disabling a launch flag never deletes a country or strands existing history.
update public.destination_countries set enabled = false where id = 'verification-destination';
set local role authenticated;
do $$ begin perform set_config('request.jwt.claim.sub',pg_temp.v('a'),true); end; $$;
do $$ begin
  update public.trip_plans set title = 'Existing draft after destination disabled' where id = pg_temp.u('plan');
  assert (select title = 'Existing draft after destination disabled' from public.trip_plans where id = pg_temp.u('plan'));
  perform pg_temp.expect_error($q$insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
    values(gen_random_uuid(),pg_temp.u('a'),'New disabled',pg_temp.v('details')::jsonb,repeat('a',64))$q$,'23514');
  perform pg_temp.expect_error($q$insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
    values(pg_temp.u('plan'),pg_temp.u('a'),'Synthetic new country',pg_temp.v('details')::jsonb,repeat('a',64))$q$,'23505');
end; $$;
reset role;
set local role service_role;
do $$ declare receipt jsonb; revision timestamptz; email_value text; contact_count integer; consent_count integer; begin
  email_value := 'catalogue-rollback+' || pg_temp.v('a') || '@example.test';
  select count(*) into contact_count from private.contact_requests;
  select count(*) into consent_count from private.consent_events;
  receipt := public.submit_shared_contact_request(pg_temp.u('contact'),repeat('b',64),'inquiry','ROLLBACK QA',email_value,
    true,'synthetic-destination-consent','test-forest','','','ROLLBACK QA - not a booking','verification-destination');
  assert receipt->>'created' = 'false','Disabled destination still returns its existing durable receipt';
  assert public.replay_shared_contact_request(pg_temp.u('contact'),repeat('b',64),'verification-destination') = receipt,
    'Read-only replay also works after the database destination is disabled';
  assert (select count(*) from private.contact_requests) = contact_count and (select count(*) from private.consent_events) = consent_count;
  perform pg_temp.expect_error(format($q$select public.submit_shared_contact_request(%L,repeat('c',64),'inquiry','ROLLBACK QA',%L,true,'synthetic-destination-consent','test-forest','','','','verification-destination')$q$,
    pg_temp.v('contact'),email_value),'PT409');
  perform pg_temp.expect_error(format($q$select public.submit_shared_contact_request(%L,repeat('b',64),'inquiry','ROLLBACK QA',%L,true,'synthetic-destination-consent','','','','','ecuador')$q$,
    pg_temp.v('contact'),email_value),'PT409');
  perform pg_temp.expect_error($q$select public.submit_shared_contact_request(gen_random_uuid(),repeat('c',64),'inquiry','Test','synthetic@example.test',false,'test','','','','','verification-destination')$q$,'22023');
  select updated_at into revision from public.trip_plans where id = pg_temp.u('plan');
  receipt := public.submit_quote_request(pg_temp.u('a'),pg_temp.u('plan'),pg_temp.u('quote'),repeat('e',64),revision,
    'ROLLBACK QA','catalogue-rollback+' || pg_temp.v('a') || '@example.test');
  assert receipt->'plan_snapshot'->'details'->>'country' = 'verification-destination','Quote snapshot retains any registered country';
  assert receipt->'plan_snapshot'->'details'->'regions' = '["test-forest"]'::jsonb;
end; $$;
reset role;
set local role authenticated;
do $$ begin perform set_config('request.jwt.claim.sub',pg_temp.v('a'),true); end; $$;
do $$ declare affected integer; begin
  assert (select count(*) = 1 from public.quote_requests);
  assert (select plan_snapshot->'details'->>'country' = 'verification-destination' from public.quote_requests where plan_id = pg_temp.u('plan'));
  update public.trip_plans set title = 'Cannot edit submitted' where id = pg_temp.u('plan');
  get diagnostics affected = row_count;
  assert affected = 0;
end; $$;
do $$ begin perform set_config('request.jwt.claim.sub',pg_temp.v('b'),true); end; $$;
do $$ begin assert not exists(select 1 from public.quote_requests); end; $$;
reset role;
-- Both generated plan-country and contact-country FKs protect saved references.
delete from public.destination_regions where country_id = 'verification-destination';
select pg_temp.expect_error($q$delete from public.destination_countries where id = 'verification-destination'$q$,'23503');
rollback;
select 'after_rollback' as phase,
  (select count(*) from auth.users) as auth_users,
  (select count(*) from public.trip_plans) as plans,
  (select count(*) from public.quote_requests) as quotes,
  (select count(*) from private.contact_requests) as contacts,
  (select count(*) from public.destination_countries) as countries,
  (select count(*) from public.destination_regions) as regions;
