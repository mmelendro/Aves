-- Administrator-run integration verification. Synthetic accounts only; every row rolls back.
-- Applies to hosted Supabase and the isolated PGlite Auth stub. No mail or network calls.
begin;
set local plpgsql.check_asserts = on;

create function pg_temp.v(p_key text) returns text language sql stable as $$ select current_setting('test.' || p_key) $$;
create function pg_temp.u(p_key text) returns uuid language sql stable as $$ select pg_temp.v(p_key)::uuid $$;
create function pg_temp.expect_error(p_sql text,p_code text) returns void language plpgsql as $$
declare actual text;
begin
  begin execute p_sql; exception when others then get stacked diagnostics actual = returned_sqlstate; end;
  assert actual = p_code, format('Expected SQLSTATE %s, received %s for %s',p_code,coalesce(actual,'success'),p_sql);
end;
$$;

-- Test helpers need explicit grants now that new functions default to private.
grant execute on function pg_temp.v(text), pg_temp.u(text), pg_temp.expect_error(text,text)
  to authenticated, service_role;

do $$
declare k text; role_name text; f text;
begin
  foreach k in array array['client_a','client_b','owner','unconfirmed','plan_a','plan_b','plan_delete','proposal_a','create_key','issue_key','quote_key'] loop
    perform set_config('test.' || k,gen_random_uuid()::text,true);
  end loop;
  foreach k in array array['client_a','client_b','owner','unconfirmed'] loop
    insert into auth.users(id,email,email_confirmed_at)
      values(pg_temp.u(k),k || '+' || pg_temp.v(k) || '@example.test',case when k = 'unconfirmed' then null else clock_timestamp() end);
  end loop;
  insert into private.site_admins(user_id,grant_note) values(pg_temp.u('owner'),'Synthetic rollback test owner; no production membership');
  perform pg_temp.expect_error(format('insert into private.site_admins(user_id,grant_note) values(%L,%L)',pg_temp.v('unconfirmed'),'Invalid owner'),'PT403');
  foreach k in array array['trip_plans','quote_requests','quote_status_events','quote_proposals'] loop
    assert (select relrowsecurity from pg_class where oid = ('public.' || k)::regclass),'RLS required';
    assert not has_table_privilege('anon','public.' || k,'SELECT,INSERT,UPDATE,DELETE'),'Anon must have no account table access';
  end loop;
  assert not has_table_privilege('service_role','private.site_admins','INSERT,UPDATE,DELETE'),'Application cannot grant itself owner membership';
  assert not has_table_privilege('service_role','auth.users','INSERT,UPDATE,DELETE'),'Migration must not grant application Auth writes';
  assert has_column_privilege('service_role','auth.users','email_confirmed_at','SELECT'),'Verified identity lookup must be available';
  foreach f in array array[
    'public.submit_quote_request(uuid,uuid,uuid,text,timestamptz,text,text)',
    'public.account_admin_status(uuid)','public.list_admin_quotes(uuid,integer)','public.update_quote_status(uuid,uuid,text)',
    'public.create_quote_proposal(uuid,uuid,uuid,uuid,text,jsonb)','public.update_quote_proposal(uuid,uuid,timestamptz,jsonb)',
    'public.issue_quote_proposal(uuid,uuid,uuid,text,timestamptz)',
    'public.record_quote_notification(uuid,text,text,text)','public.record_proposal_notification(uuid,text,text,text)'
  ] loop
    foreach role_name in array array['anon','authenticated'] loop
      assert not has_function_privilege(role_name,f,'EXECUTE'),'Browser must not invoke service RPC';
    end loop;
    assert has_function_privilege('service_role',f,'EXECUTE'),'Service must invoke RPC';
    assert not (select prosecdef from pg_proc where oid = f::regprocedure),'No SECURITY DEFINER bypass';
  end loop;
  assert not public.proposal_details_valid('{"totalCents":0,"currency":null,"itinerary":"x","inclusions":"","exclusions":"","validUntil":null}');
  assert not public.proposal_details_valid('{"totalCents":1.5,"currency":"AUD","itinerary":"x","inclusions":"","exclusions":"","validUntil":null}');
  assert not public.proposal_details_valid('{"totalCents":10,"currency":"AUD","itinerary":"x","inclusions":"","exclusions":"","validUntil":"2027-02-30"}');
  assert not public.trip_details_valid('{"regions":[null],"travelWhen":"","partySize":"","message":""}');
  perform set_config('test.details','{"regions":["Tasmania"],"travelWhen":"Spring","partySize":"2","message":"Birds and forest"}',true);
  perform set_config('test.proposal_details','{"totalCents":123400,"currency":"AUD","itinerary":"Tasmania, three days","inclusions":"Guiding","exclusions":"Flights","validUntil":null}',true);
end;
$$;

set local role authenticated;
select set_config('request.jwt.claim.sub',pg_temp.v('client_a'),true);
do $$
declare revision timestamptz;
begin
  insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
    values(pg_temp.u('plan_a'),pg_temp.u('client_a'),'First plan',pg_temp.v('details')::jsonb,repeat('a',64)),
      (pg_temp.u('plan_delete'),pg_temp.u('client_a'),'Delete me',pg_temp.v('details')::jsonb,repeat('b',64));
  select updated_at into revision from public.trip_plans where id = pg_temp.u('plan_a');
  update public.trip_plans set title = 'Tasmania trip' where id = pg_temp.u('plan_a');
  assert (select updated_at > revision and create_payload_hash = repeat('a',64) from public.trip_plans where id = pg_temp.u('plan_a')),
    'Editing updates revision but preserves creation hash';
  delete from public.trip_plans where id = pg_temp.u('plan_delete');
  assert not exists(select 1 from public.trip_plans where id = pg_temp.u('plan_delete')),'Own draft deletion works';
  perform pg_temp.expect_error($q$update public.trip_plans set status = 'quote_requested' where id = pg_temp.u('plan_a')$q$,'42501');
  perform pg_temp.expect_error($q$update public.trip_plans set user_id = pg_temp.u('client_b') where id = pg_temp.u('plan_a')$q$,'42501');
  perform pg_temp.expect_error($q$update public.trip_plans set create_payload_hash = repeat('b',64) where id = pg_temp.u('plan_a')$q$,'42501');
  perform pg_temp.expect_error($q$insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
    values(gen_random_uuid(),pg_temp.u('client_b'),'Wrong owner',pg_temp.v('details')::jsonb,repeat('a',64))$q$,'42501');
  perform pg_temp.expect_error($q$insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
    values(gen_random_uuid(),pg_temp.u('client_a'),'Bad shape','{}',repeat('a',64))$q$,'23514');
  perform pg_temp.expect_error($q$select public.list_admin_quotes(pg_temp.u('owner'))$q$,'42501');
end;
$$;
select set_config('request.jwt.claim.sub',pg_temp.v('client_b'),true);
do $$
declare affected integer;
begin
  assert not exists(select 1 from public.trip_plans where id = pg_temp.u('plan_a')),'Other client plan invisible';
  update public.trip_plans set title = 'Hijacked' where id = pg_temp.u('plan_a'); get diagnostics affected = row_count;
  assert affected = 0,'Other client plan cannot be edited';
  insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
    values(pg_temp.u('plan_b'),pg_temp.u('client_b'),'Second client',pg_temp.v('details')::jsonb,repeat('b',64));
end;
$$;
reset role;

set local role service_role;
do $$
declare revision timestamptz; result jsonb; replay jsonb; proposal jsonb; changed jsonb; emitted jsonb; next_proposal uuid;
begin
  select updated_at into revision from public.trip_plans where id = pg_temp.u('plan_a');
  assert public.account_admin_status(pg_temp.u('owner')),'Confirmed mapped owner recognized';
  assert not public.account_admin_status(pg_temp.u('client_a')),'Ordinary confirmed account is not owner';
  assert not public.account_admin_status(pg_temp.u('unconfirmed')),'Unconfirmed account is not owner';
  perform pg_temp.expect_error($q$select public.submit_quote_request(pg_temp.u('unconfirmed'),pg_temp.u('plan_a'),gen_random_uuid(),repeat('a',64),now(),'Test','unconfirmed@example.test')$q$,'PT403');
  perform pg_temp.expect_error($q$select public.submit_quote_request(pg_temp.u('client_a'),pg_temp.u('plan_a'),gen_random_uuid(),repeat('a',64),now(),'Test','someoneelse@example.test')$q$,'PT403');
  perform pg_temp.expect_error(format($q$select public.submit_quote_request(%L,%L,gen_random_uuid(),repeat('a',64),now(),'Test',%L)$q$,
    pg_temp.v('client_b'),pg_temp.v('plan_a'),'client_b+' || pg_temp.v('client_b') || '@example.test'),'PT404');
  perform pg_temp.expect_error(format($q$select public.submit_quote_request(%L,%L,gen_random_uuid(),repeat('a',64),now() - interval '1 day','Test',%L)$q$,
    pg_temp.v('client_a'),pg_temp.v('plan_a'),'client_a+' || pg_temp.v('client_a') || '@example.test'),'PT409');
  result := public.submit_quote_request(pg_temp.u('client_a'),pg_temp.u('plan_a'),pg_temp.u('quote_key'),repeat('a',64),revision,
    'Synthetic client','client_a+' || pg_temp.v('client_a') || '@example.test');
  perform set_config('test.request_id',result->>'request_id',true);
  assert (result->>'created')::boolean and result->>'status' = 'submitted' and result->>'notification_status' = 'pending';
  assert result->'plan_snapshot'->>'title' = 'Tasmania trip' and result->'plan_snapshot'->'details' = pg_temp.v('details')::jsonb,
    'Quote contains immutable complete snapshot';
  assert (select status = 'quote_requested' and updated_at = (result->>'plan_updated_at')::timestamptz
    from public.trip_plans where id = pg_temp.u('plan_a')),'Submitted plan freezes atomically';
  replay := public.submit_quote_request(pg_temp.u('client_a'),pg_temp.u('plan_a'),pg_temp.u('quote_key'),repeat('a',64),revision,
    'Synthetic client','client_a+' || pg_temp.v('client_a') || '@example.test');
  assert not (replay->>'created')::boolean and replay->>'request_id' = result->>'request_id';
  assert (select count(*) = 1 from public.quote_status_events where quote_request_id = pg_temp.u('request_id')),'Replay creates no history duplicate';
  perform pg_temp.expect_error(format($q$select public.submit_quote_request(%L,%L,%L,repeat('b',64),%L,'Test',%L)$q$,
    pg_temp.v('client_a'),pg_temp.v('plan_a'),pg_temp.v('quote_key'),revision,'client_a+' || pg_temp.v('client_a') || '@example.test'),'PT409');
  perform pg_temp.expect_error($q$update public.quote_requests set plan_snapshot = '{}' where id = pg_temp.u('request_id')$q$,'23514');
  perform pg_temp.expect_error($q$select public.list_admin_quotes(pg_temp.u('client_a'))$q$,'PT403');
  perform pg_temp.expect_error($q$insert into private.site_admins(user_id,grant_note) values(pg_temp.u('client_a'),'Escalation')$q$,'42501');
  assert jsonb_array_length(public.list_admin_quotes(pg_temp.u('owner'))) >= 1,'Mapped owner reads inbox';
  result := public.update_quote_status(pg_temp.u('owner'),pg_temp.u('request_id'),'reviewing');
  assert result->>'status' = 'reviewing';
  perform public.update_quote_status(pg_temp.u('owner'),pg_temp.u('request_id'),'reviewing');
  assert (select count(*) = 2 from public.quote_status_events where quote_request_id = pg_temp.u('request_id')),'Same status is idempotent';
  result := public.record_quote_notification(pg_temp.u('request_id'),'failed',null,'provider_unavailable');
  assert result->>'notification_status' = 'failed';
  perform pg_temp.expect_error($q$select public.record_quote_notification(pg_temp.u('request_id'),'accepted',null,null)$q$,'22023');
  perform public.record_quote_notification(pg_temp.u('request_id'),'accepted','synthetic-provider-quote');
  result := public.record_quote_notification(pg_temp.u('request_id'),'failed',null,'stale_failure');
  assert result->>'notification_status' = 'accepted','Late failure cannot erase provider acceptance';

  result := public.create_quote_proposal(pg_temp.u('owner'),pg_temp.u('request_id'),pg_temp.u('proposal_a'),pg_temp.u('create_key'),repeat('c',64),pg_temp.v('proposal_details')::jsonb);
  proposal := result->'proposal';
  assert (result->>'created')::boolean and proposal->>'status' = 'draft' and (proposal->>'version')::integer = 1;
  replay := public.create_quote_proposal(pg_temp.u('owner'),pg_temp.u('request_id'),pg_temp.u('proposal_a'),pg_temp.u('create_key'),repeat('c',64),pg_temp.v('proposal_details')::jsonb);
  assert not (replay->>'created')::boolean and replay->'proposal' = proposal;
  perform pg_temp.expect_error($q$select public.create_quote_proposal(pg_temp.u('client_a'),pg_temp.u('request_id'),gen_random_uuid(),gen_random_uuid(),repeat('c',64),pg_temp.v('proposal_details')::jsonb)$q$,'PT403');
  perform pg_temp.expect_error($q$select public.create_quote_proposal(pg_temp.u('owner'),pg_temp.u('request_id'),gen_random_uuid(),gen_random_uuid(),repeat('c',64),pg_temp.v('proposal_details')::jsonb)$q$,'PT409');
  perform pg_temp.expect_error($q$select public.record_proposal_notification(pg_temp.u('proposal_a'),'accepted','synthetic-provider')$q$,'PT409');
  changed := public.update_quote_proposal(pg_temp.u('owner'),pg_temp.u('proposal_a'),(proposal->>'updated_at')::timestamptz,
    pg_temp.v('proposal_details')::jsonb || '{"totalCents":145600}'::jsonb);
  assert (changed->>'total_cents')::integer = 145600;
  perform pg_temp.expect_error(format($q$select public.update_quote_proposal(%L,%L,%L,%L)$q$,
    pg_temp.v('owner'),pg_temp.v('proposal_a'),proposal->>'updated_at',pg_temp.v('proposal_details')),'PT409');
  perform set_config('test.proposal_revision',changed->>'updated_at',true);
  -- Leave a draft for the next client-visibility check.
end;
$$;
reset role;

set local role authenticated;
select set_config('request.jwt.claim.sub',pg_temp.v('client_a'),true);
do $$
declare affected integer;
begin
  assert (select count(*) = 1 from public.quote_requests where id = pg_temp.u('request_id')),'Client sees own quote';
  assert not exists(select 1 from public.quote_proposals where id = pg_temp.u('proposal_a')),'Client cannot see draft proposal';
  update public.trip_plans set title = 'Changed after quote' where id = pg_temp.u('plan_a'); get diagnostics affected = row_count;
  assert affected = 0,'Submitted plan cannot be edited';
  delete from public.trip_plans where id = pg_temp.u('plan_a'); get diagnostics affected = row_count;
  assert affected = 0,'Submitted plan cannot be deleted';
  perform pg_temp.expect_error($q$update public.quote_requests set status = 'closed' where id = pg_temp.u('request_id')$q$,'42501');
  perform pg_temp.expect_error($q$update public.quote_proposals set total_cents = 0 where id = pg_temp.u('proposal_a')$q$,'42501');
  perform pg_temp.expect_error($q$insert into public.quote_status_events(quote_request_id,client_user_id,status) values(pg_temp.u('request_id'),pg_temp.u('client_a'),'responded')$q$,'42501');
end;
$$;
reset role;

-- A changed client address must be re-confirmed before the owner can issue a proposal.
update auth.users set email = 'changed+' || pg_temp.v('client_a') || '@example.test', email_confirmed_at = null
  where id = pg_temp.u('client_a');
set local role service_role;
select pg_temp.expect_error($q$select public.issue_quote_proposal(pg_temp.u('owner'),pg_temp.u('proposal_a'),pg_temp.u('issue_key'),repeat('d',64),pg_temp.v('proposal_revision')::timestamptz)$q$,'PT403');
do $$ begin
  assert (select status = 'draft' from public.quote_proposals where id = pg_temp.u('proposal_a')),'Unconfirmed recipient prevents issuance atomically';
end $$;
reset role;
update auth.users set email_confirmed_at = clock_timestamp() where id = pg_temp.u('client_a');

set local role service_role;
do $$
declare result jsonb; replay jsonb; proposal jsonb; plan_id uuid; plan_revision timestamptz; i integer; snapshot jsonb;
begin
  result := public.issue_quote_proposal(pg_temp.u('owner'),pg_temp.u('proposal_a'),pg_temp.u('issue_key'),repeat('d',64),pg_temp.v('proposal_revision')::timestamptz);
  proposal := result->'proposal';
  assert (result->>'issued')::boolean and proposal->>'status' = 'sent' and proposal->>'issued_at' is not null;
  assert result->>'contact_email' = 'changed+' || pg_temp.v('client_a') || '@example.test','Issue uses current confirmed recipient';
  assert (select contact_email = 'client_a+' || pg_temp.v('client_a') || '@example.test' from public.quote_requests where id = pg_temp.u('request_id')),
    'Original confirmed inquiry identity remains unchanged';
  assert (select status = 'responded' from public.quote_requests where id = pg_temp.u('request_id')),'Issue updates request status';
  replay := public.issue_quote_proposal(pg_temp.u('owner'),pg_temp.u('proposal_a'),pg_temp.u('issue_key'),repeat('d',64),pg_temp.v('proposal_revision')::timestamptz);
  assert not (replay->>'issued')::boolean and replay->'proposal' = proposal,'Replay returns existing issue; do not send another email';
  assert replay->>'contact_email' = result->>'contact_email','Replay returns the current confirmed recipient';
  perform pg_temp.expect_error($q$select public.issue_quote_proposal(pg_temp.u('owner'),pg_temp.u('proposal_a'),pg_temp.u('issue_key'),repeat('e',64),pg_temp.v('proposal_revision')::timestamptz)$q$,'PT409');
  perform pg_temp.expect_error($q$update public.quote_proposals set total_cents = 0 where id = pg_temp.u('proposal_a')$q$,'PT409');
  perform pg_temp.expect_error($q$update public.quote_proposals set itinerary = 'Changed' where id = pg_temp.u('proposal_a')$q$,'PT409');
  perform public.record_proposal_notification(pg_temp.u('proposal_a'),'failed',null,'provider_unavailable');
  perform public.record_proposal_notification(pg_temp.u('proposal_a'),'accepted','synthetic-provider-proposal');
  result := public.record_proposal_notification(pg_temp.u('proposal_a'),'failed',null,'stale_failure');
  assert result->>'notification_status' = 'accepted';
  result := public.create_quote_proposal(pg_temp.u('owner'),pg_temp.u('request_id'),gen_random_uuid(),gen_random_uuid(),repeat('e',64),pg_temp.v('proposal_details')::jsonb);
  assert (result->'proposal'->>'version')::integer = 2 and result->'proposal'->>'status' = 'draft','Revision is a distinct draft';
  assert (select total_cents = 145600 and status = 'sent' from public.quote_proposals where id = pg_temp.u('proposal_a')),'Prior issued price remains unchanged';
  result := public.list_admin_quotes(pg_temp.u('owner'));
  assert exists(select 1 from jsonb_array_elements(result) q where q->>'id' = pg_temp.v('request_id')
    and jsonb_array_length(q->'proposals') = 2 and jsonb_array_length(q->'status_history') = 3),'Owner gets proposals and complete status history';

  -- Five new quote requests per account, including the first. Replays do not consume quota.
  for i in 2..6 loop
    plan_id := gen_random_uuid();
    insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
      values(plan_id,pg_temp.u('client_a'),'Quota test',pg_temp.v('details')::jsonb,repeat('f',64)) returning updated_at into plan_revision;
    if i <= 5 then
      perform public.submit_quote_request(pg_temp.u('client_a'),plan_id,gen_random_uuid(),repeat('f',64),plan_revision,
        'Synthetic client','changed+' || pg_temp.v('client_a') || '@example.test');
    else
      perform pg_temp.expect_error(format($q$select public.submit_quote_request(%L,%L,gen_random_uuid(),repeat('f',64),%L,'Synthetic client',%L)$q$,
        pg_temp.v('client_a'),plan_id,plan_revision,'changed+' || pg_temp.v('client_a') || '@example.test'),'PT429');
      assert (select status = 'draft' from public.trip_plans where id = plan_id),'Rejected quote does not freeze plan';
    end if;
  end loop;
  select plan_snapshot into snapshot from public.quote_requests where id = pg_temp.u('request_id');
  result := public.submit_quote_request(pg_temp.u('client_a'),pg_temp.u('plan_a'),pg_temp.u('quote_key'),repeat('a',64),
    (snapshot->>'plan_updated_at')::timestamptz,'Synthetic client','changed+' || pg_temp.v('client_a') || '@example.test');
  assert not (result->>'created')::boolean,'Idempotent replay works even after quota reached';
end;
$$;
reset role;

set local role authenticated;
select set_config('request.jwt.claim.sub',pg_temp.v('client_a'),true);
do $$
begin
  assert (select count(*) = 1 from public.quote_proposals where quote_request_id = pg_temp.u('request_id')),'Client sees only sent version';
  assert (select total_cents = 145600 and currency = 'AUD' and status = 'sent' from public.quote_proposals where id = pg_temp.u('proposal_a'));
end;
$$;
select set_config('request.jwt.claim.sub',pg_temp.v('client_b'),true);
do $$
begin
  assert not exists(select 1 from public.quote_requests where id = pg_temp.u('request_id')),'Other client quote invisible';
  assert not exists(select 1 from public.quote_proposals where id = pg_temp.u('proposal_a')),'Other client sent proposal invisible';
  assert not exists(select 1 from public.quote_status_events where quote_request_id = pg_temp.u('request_id')),'Other client history invisible';
end;
$$;
reset role;

-- Revocation is immediate: a valid confirmed account still needs an active UUID grant.
update private.site_admins set active = false where user_id = pg_temp.u('owner');
set local role service_role;
select pg_temp.expect_error($q$select public.list_admin_quotes(pg_temp.u('owner'))$q$,'PT403');
do $$ begin assert not public.account_admin_status(pg_temp.u('owner')),'Revoked owner is not admin'; end $$;
reset role;

rollback;
