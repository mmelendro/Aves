-- Administrator-run, isolated integration checks. Reserved synthetic addresses;
-- all rows, test objects, and grants roll back. No mail or network operations.
begin;
set local plpgsql.check_asserts = on;

create function pg_temp.v(p_key text) returns text language sql stable as $$ select current_setting('hardening.' || p_key) $$;
create function pg_temp.u(p_key text) returns uuid language sql stable as $$ select pg_temp.v(p_key)::uuid $$;
create function pg_temp.expect_error(p_sql text, p_code text) returns void language plpgsql as $$
declare actual text;
begin
  begin execute p_sql; exception when others then get stacked diagnostics actual = returned_sqlstate; end;
  assert actual = p_code, format('Expected SQLSTATE %s, received %s', p_code, coalesce(actual, 'success'));
end;
$$;
grant execute on function pg_temp.v(text), pg_temp.u(text), pg_temp.expect_error(text,text)
  to authenticated, service_role;

do $$
declare k text;
begin
  foreach k in array array['client_a','client_b','client_bulk','first_plan','replacement_plan'] loop
    perform set_config('hardening.' || k, gen_random_uuid()::text, true);
  end loop;
  foreach k in array array['client_a','client_b','client_bulk'] loop
    insert into auth.users(id,email,email_confirmed_at)
      values(pg_temp.u(k),'hardening+' || pg_temp.v(k) || '@example.test',clock_timestamp());
  end loop;
  perform set_config('hardening.details','{"regions":["Tasmania"],"travelWhen":"Flexible","partySize":"2","message":"Synthetic quota test"}',true);
end;
$$;

set local role authenticated;
select set_config('request.jwt.claim.sub', pg_temp.v('client_a'), true);
do $$
begin
  insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
    values(pg_temp.u('first_plan'),pg_temp.u('client_a'),'First draft',pg_temp.v('details')::jsonb,repeat('a',64));
  insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
    select gen_random_uuid(),pg_temp.u('client_a'),'Draft ' || n,pg_temp.v('details')::jsonb,repeat('b',64)
    from generate_series(2,50) n;
  assert (select count(*) = 50 from public.trip_plans),'Exactly 50 drafts are allowed';
  perform pg_temp.expect_error($q$insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
    values(gen_random_uuid(),pg_temp.u('client_a'),'Draft 51',pg_temp.v('details')::jsonb,repeat('c',64))$q$,'PT409');
  assert (select count(*) = 50 from public.trip_plans),'Rejected insert creates no row';

  -- The API depends on this primary-key error to return the existing saved plan.
  perform pg_temp.expect_error($q$insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
    values(pg_temp.u('first_plan'),pg_temp.u('client_a'),'First draft',pg_temp.v('details')::jsonb,repeat('a',64))$q$,'23505');
  update public.trip_plans set title = 'Edited at capacity' where id = pg_temp.u('first_plan');
  assert (select title = 'Edited at capacity' from public.trip_plans where id = pg_temp.u('first_plan')),
    'Existing drafts remain editable at capacity';
  perform pg_temp.expect_error($q$insert into public.trip_plans(id,user_id,title,details,status,create_payload_hash)
    values(gen_random_uuid(),pg_temp.u('client_a'),'Forged status',pg_temp.v('details')::jsonb,'quote_requested',repeat('c',64))$q$,'42501');
  perform pg_temp.expect_error($q$insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
    values(gen_random_uuid(),pg_temp.u('client_b'),'Forged owner',pg_temp.v('details')::jsonb,repeat('c',64))$q$,'42501');

  delete from public.trip_plans where id = pg_temp.u('first_plan');
  insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
    values(pg_temp.u('replacement_plan'),pg_temp.u('client_a'),'Replacement',pg_temp.v('details')::jsonb,repeat('d',64));
  assert (select count(*) = 50 from public.trip_plans),'Deleting a draft frees one slot';
end;
$$;

select set_config('request.jwt.claim.sub', pg_temp.v('client_b'), true);
do $$
declare affected integer;
begin
  assert not exists(select 1 from public.trip_plans),'Other account drafts remain invisible';
  update public.trip_plans set title = 'Wrong owner' where id = pg_temp.u('replacement_plan');
  get diagnostics affected = row_count;
  assert affected = 0,'Other account drafts cannot be changed';
  insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
    values(gen_random_uuid(),pg_temp.u('client_b'),'Independent quota',pg_temp.v('details')::jsonb,repeat('e',64));
  assert (select count(*) = 1 from public.trip_plans),'Each account has independent capacity';
end;
$$;

select set_config('request.jwt.claim.sub', pg_temp.v('client_bulk'), true);
do $$
begin
  perform pg_temp.expect_error($q$insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
    select gen_random_uuid(),pg_temp.u('client_bulk'),'Bulk draft ' || n,pg_temp.v('details')::jsonb,repeat('f',64)
    from generate_series(1,51) n$q$,'PT409');
  assert not exists(select 1 from public.trip_plans),'Oversized bulk insert rolls back atomically';
end;
$$;

set local role service_role;
do $$
declare revision timestamptz; receipt jsonb;
begin
  perform pg_temp.expect_error($q$insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
    values(gen_random_uuid(),pg_temp.u('client_a'),'Service draft 51',pg_temp.v('details')::jsonb,repeat('c',64))$q$,'PT409');
  select updated_at into revision from public.trip_plans where id = pg_temp.u('replacement_plan');
  receipt := public.submit_quote_request(pg_temp.u('client_a'),pg_temp.u('replacement_plan'),gen_random_uuid(),repeat('1',64),
    revision,'Synthetic client','hardening+' || pg_temp.v('client_a') || '@example.test');
  assert receipt->>'created' = 'true','Quote submission still works at draft capacity';
end;
$$;
set local role authenticated;
select set_config('request.jwt.claim.sub', pg_temp.v('client_a'), true);
do $$
begin
  insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
    values(gen_random_uuid(),pg_temp.u('client_a'),'After submission',pg_temp.v('details')::jsonb,repeat('2',64));
  assert (select count(*) = 50 from public.trip_plans where status = 'draft'),'Submitting a quote frees a draft slot';
  assert (select count(*) = 51 from public.trip_plans),'Submitted plans remain stored separately';
end;
$$;

reset role;
create table public.hardening_future_table(id integer);
create sequence public.hardening_future_sequence;
create function public.hardening_future_function() returns integer language sql as $$ select 1 $$;
do $$
declare r text; item text[];
begin
  foreach r in array array['anon','authenticated'] loop
    assert not has_table_privilege(r,'public.hardening_future_table','SELECT,INSERT,UPDATE,DELETE,TRUNCATE,REFERENCES,TRIGGER'),
      'New public tables must require explicit grants';
    assert not has_sequence_privilege(r,'public.hardening_future_sequence','USAGE,SELECT,UPDATE'),
      'New public sequences must require explicit grants';
    assert not has_function_privilege(r,'public.hardening_future_function()','EXECUTE'),
      'New public functions must not inherit PUBLIC execution';
    assert not has_function_privilege(r,'private.enforce_trip_draft_quota()','EXECUTE'),
      'Quota helper is not an exposed RPC';
  end loop;
  assert not (select prosecdef from pg_proc where oid = 'private.enforce_trip_draft_quota()'::regprocedure),
    'Quota does not add a SECURITY DEFINER bypass';
  foreach item slice 1 in array array[
    ['quote_requests','idempotency_key'],['quote_requests','payload_hash'],['quote_requests','notification_provider_id'],
    ['quote_requests','notification_error_code'],['quote_status_events','actor_user_id'],
    ['quote_proposals','created_by'],['quote_proposals','create_idempotency_key'],['quote_proposals','create_payload_hash'],
    ['quote_proposals','issue_idempotency_key'],['quote_proposals','issue_payload_hash'],
    ['quote_proposals','notification_provider_id'],['quote_proposals','notification_error_code']
  ] loop
    assert not has_column_privilege('authenticated','public.' || item[1],item[2],'SELECT'),
      format('Client must not read internal %s.%s',item[1],item[2]);
    assert has_column_privilege('service_role','public.' || item[1],item[2],'SELECT'),
      'Service owner workflows retain their existing read access';
  end loop;
  assert has_function_privilege('authenticated','public.trip_details_valid(jsonb)','EXECUTE'),
    'Existing explicit validator grant remains intact';
end;
$$;

set local role authenticated;
do $$
begin
  perform pg_temp.expect_error('select * from public.quote_requests','42501');
  perform pg_temp.expect_error('select * from public.quote_proposals','42501');
  perform pg_temp.expect_error('select actor_user_id from public.quote_status_events','42501');
  -- Exact application projection remains usable with the narrower column grants.
  perform id,quote_request_id,client_user_id,version,status,total_cents,currency,itinerary,
    inclusions,exclusions,valid_until,issued_at,updated_at,notification_status
    from public.quote_proposals where client_user_id = auth.uid() and status = 'sent' order by issued_at desc;
  perform id,plan_id,plan_snapshot,contact_name,contact_email,status,submitted_at,updated_at,notification_status
    from public.quote_requests where client_user_id = auth.uid();
  assert (select count(id) = 1 from public.quote_requests),'Own client-visible quote remains readable';
end;
$$;
rollback;

-- A stale repeatable snapshot must not bypass the count-after-lock safeguard.
begin isolation level repeatable read;
set local plpgsql.check_asserts = on;
do $$
declare actual text; client_id uuid := gen_random_uuid();
begin
  insert into auth.users(id,email,email_confirmed_at) values(client_id,'isolation+' || client_id::text || '@example.test',clock_timestamp());
  begin
    insert into public.trip_plans(id,user_id,title,details,create_payload_hash)
      values(gen_random_uuid(),client_id,'Unsupported isolation','{"regions":[],"travelWhen":"","partySize":"","message":""}',repeat('a',64));
  exception when others then get stacked diagnostics actual = returned_sqlstate;
  end;
  assert actual = '25001','Unsupported isolation must fail closed';
  assert not exists(select 1 from public.trip_plans),'Rejected isolation creates no draft';
end;
$$;
rollback;
