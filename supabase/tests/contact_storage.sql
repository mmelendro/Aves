-- Run after the migration, as a database administrator, on a test project.
-- All records use reserved example.test addresses and are rolled back.
-- No function in this test sends email or makes an external request.
begin;
set local plpgsql.check_asserts = on;

do $$
declare
  relation_name text;
  role_name text;
  function_name text;
begin
  foreach relation_name in array array['contact_requests', 'launch_subscribers', 'consent_events'] loop
    assert (select relrowsecurity from pg_class where oid = ('private.' || relation_name)::regclass),
      'RLS must be enabled on every private table';
    foreach role_name in array array['anon', 'authenticated'] loop
      assert not has_table_privilege(role_name, 'private.' || relation_name, 'SELECT,INSERT,UPDATE,DELETE'),
        'Public clients must have no table privileges';
    end loop;
  end loop;
  foreach role_name in array array['anon', 'authenticated'] loop
    assert not has_schema_privilege(role_name, 'private', 'USAGE'),
      'Private schema must not be usable by public clients';
    foreach function_name in array array[
      'public.submit_contact_request(uuid,text,text,text,text,boolean,text,text,text,text,text)',
      'public.record_contact_notification(uuid,text,text,text)',
      'public.suppress_launch_subscriber(text,text)'
    ] loop
      assert not has_function_privilege(role_name, function_name, 'EXECUTE'),
        'Public clients must have no RPC execution privileges';
      assert has_function_privilege('service_role', function_name, 'EXECUTE'),
        'Service role must be able to execute the backend RPCs';
      assert not (select prosecdef from pg_proc where oid = function_name::regprocedure),
        'Backend functions must use SECURITY INVOKER';
    end loop;
  end loop;
  assert not has_table_privilege('service_role', 'private.consent_events', 'UPDATE,DELETE'),
    'Consent evidence must be append-only for the application';
end;
$$;

set local role service_role;
do $$
declare
  run_id uuid := gen_random_uuid();
  first_key uuid := gen_random_uuid();
  opt_in_key uuid := gen_random_uuid();
  throttle_key uuid;
  first_request uuid;
  subscriber_id uuid;
  test_email text;
  throttle_email text;
  receipt jsonb;
  replay jsonb;
  i integer;
begin
  test_email := 'storage-' || run_id::text || '@example.test';
  throttle_email := 'limit-' || run_id::text || '@example.test';

  receipt := public.submit_contact_request(first_key, repeat('a', 64), 'inquiry', 'Local Test',
    test_email, false, 'au-launch-v1', 'New South Wales', 'Flexible', '2 people', 'Synthetic test');
  first_request := (receipt->>'request_id')::uuid;
  assert receipt->>'created' = 'true', 'First request must be created';
  assert receipt->>'notification_status' = 'pending', 'Notification starts pending';
  assert (select count(*) from private.launch_subscribers where email_normalized = test_email) = 0,
    'No subscriber may be created without explicit opt-in';

  replay := public.submit_contact_request(first_key, repeat('a', 64), 'inquiry', 'Local Test',
    test_email, false, 'au-launch-v1', 'New South Wales', 'Flexible', '2 people', 'Synthetic test');
  assert replay->>'created' = 'false' and replay->>'request_id' = receipt->>'request_id',
    'An idempotent replay must return the original request';
  begin
    perform public.submit_contact_request(first_key, repeat('b', 64), 'inquiry', 'Local Test',
      test_email, false, 'au-launch-v1');
    raise exception 'Expected idempotency conflict';
  exception when sqlstate 'PT409' then null;
  end;

  receipt := public.submit_contact_request(opt_in_key, repeat('c', 64), 'waitlist', 'Local Test',
    upper(test_email), true, 'au-launch-v1');
  assert receipt->>'subscriber_status' = 'requested', 'Explicit opt-in must be recorded';
  select id into strict subscriber_id from private.launch_subscribers where email_normalized = test_email;
  assert (select email_verified_at is null from private.launch_subscribers where id = subscriber_id),
    'Submitting a form must not claim verified email ownership';
  assert (select count(*) from private.consent_events where launch_subscriber_id = subscriber_id) = 1,
    'An opt-in must have one evidence event';
  perform public.submit_contact_request(opt_in_key, repeat('c', 64), 'waitlist', 'Local Test',
    upper(test_email), true, 'au-launch-v1');
  assert (select count(*) from private.consent_events where launch_subscriber_id = subscriber_id) = 1,
    'A replay must not duplicate consent evidence';
  perform public.submit_contact_request(gen_random_uuid(), repeat('d', 64), 'inquiry', 'Local Test',
    test_email, false, 'au-launch-v1');
  assert (select status from private.launch_subscribers where id = subscriber_id) = 'requested',
    'An unchecked inquiry box must not unsubscribe an existing subscriber';

  perform public.suppress_launch_subscriber(test_email, 'email_request');
  perform public.suppress_launch_subscriber(test_email, 'email_request');
  assert (select count(*) from private.consent_events
    where launch_subscriber_id = subscriber_id and event_type = 'unsubscribe') = 1,
    'Repeated suppression must be idempotent';
  receipt := public.submit_contact_request(gen_random_uuid(), repeat('e', 64), 'waitlist', 'Local Test',
    test_email, true, 'au-launch-v1');
  assert receipt->>'subscriber_status' = 'suppressed', 'A new form must not reactivate a suppressed address';
  assert exists (select 1 from private.consent_events
    where contact_request_id = (receipt->>'request_id')::uuid and event_type = 'opt_in_request' and not applied),
    'A suppressed opt-in request must retain evidence without changing status';
  perform public.submit_contact_request(opt_in_key, repeat('c', 64), 'waitlist', 'Local Test',
    upper(test_email), true, 'au-launch-v1');
  assert (select status from private.launch_subscribers where id = subscriber_id) = 'suppressed',
    'Replaying pre-unsubscribe consent must not reactivate a subscriber';

  perform public.record_contact_notification(first_request, 'failed', null, 'provider_rejected');
  receipt := public.record_contact_notification(first_request, 'accepted', 'synthetic-provider-id', null);
  assert receipt->>'notification_status' = 'accepted', 'A successful retry may record provider acceptance';
  receipt := public.record_contact_notification(first_request, 'failed', null, 'transport_error');
  assert receipt->>'notification_status' = 'accepted', 'A stale failure must not downgrade acceptance';
  assert receipt->>'provider_id' = 'synthetic-provider-id', 'Provider receipt must be preserved';
  begin
    perform public.record_contact_notification(first_request, 'accepted', null, null);
    raise exception 'Expected invalid provider receipt rejection';
  exception when invalid_parameter_value then null;
  end;

  for i in 1..5 loop
    throttle_key := gen_random_uuid();
    perform public.submit_contact_request(throttle_key, repeat('f', 64), 'inquiry', 'Local Test',
      throttle_email, false, 'au-launch-v1');
  end loop;
  replay := public.submit_contact_request(throttle_key, repeat('f', 64), 'inquiry', 'Local Test',
    throttle_email, false, 'au-launch-v1');
  assert replay->>'created' = 'false', 'A retry must succeed even when the submission quota is full';
  begin
    perform public.submit_contact_request(gen_random_uuid(), repeat('f', 64), 'inquiry', 'Local Test',
      upper(throttle_email), false, 'au-launch-v1');
    raise exception 'Expected per-email rate limit';
  exception when sqlstate 'PT429' then null;
  end;
  assert (select count(*) from private.contact_requests where email_normalized = throttle_email) = 5,
    'Rejected submissions must not create records';

  begin
    perform public.submit_contact_request(gen_random_uuid(), repeat('a', 64), 'waitlist', 'Local Test',
      'invalid-' || run_id::text || '@example.test', false, 'au-launch-v1');
    raise exception 'Expected waitlist consent constraint';
  exception when check_violation then null;
  end;
  begin
    perform public.submit_contact_request(gen_random_uuid(), repeat('a', 64), 'inquiry', E'Header\nInjection',
      'invalid-' || run_id::text || '@example.test', false, 'au-launch-v1');
    raise exception 'Expected single-line name constraint';
  exception when check_violation then null;
  end;
  begin
    perform public.submit_contact_request(gen_random_uuid(), repeat('a', 64), 'inquiry', 'Local Test',
      'invalid-' || run_id::text || '@example.test', false, 'au-launch-v1', '', '', '', repeat('x', 5001));
    raise exception 'Expected message size constraint';
  exception when check_violation then null;
  end;
  begin
    update private.consent_events set source = 'admin' where launch_subscriber_id = subscriber_id;
    raise exception 'Expected append-only consent permissions';
  exception when insufficient_privilege then null;
  end;
  raise notice 'contact storage: service-role behavior checks passed';
end;
$$;
reset role;

set local role anon;
do $$
begin
  begin
    perform count(*) from private.contact_requests;
    raise exception 'Anonymous table access must be rejected';
  exception when insufficient_privilege then null;
  end;
  begin
    perform public.submit_contact_request(gen_random_uuid(), repeat('a', 64), 'inquiry', 'Local Test',
      'anonymous@example.test', false, 'au-launch-v1');
    raise exception 'Anonymous RPC access must be rejected';
  exception when insufficient_privilege then null;
  end;
  raise notice 'contact storage: anonymous access checks passed';
end;
$$;
reset role;
rollback;
