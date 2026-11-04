-- AVES Australia: server-only inquiry storage and launch-list consent.
-- This migration sends no email and creates no customer accounts.
-- Keep `private` out of the Data API's exposed schemas.
begin;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
grant usage on schema private to service_role;
grant usage on schema public to service_role;

create table private.launch_subscribers (
  id uuid primary key default gen_random_uuid(),
  email_normalized text not null unique,
  status text not null default 'requested',
  created_at timestamptz not null default now(),
  last_requested_at timestamptz,
  suppressed_at timestamptz,
  email_verified_at timestamptz,
  constraint subscriber_email_valid check (
    email_normalized = lower(btrim(email_normalized))
    and char_length(email_normalized) between 3 and 254
    and email_normalized ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    and email_normalized !~ '[[:cntrl:]]'
  ),
  constraint subscriber_status_valid check (status in ('requested', 'suppressed')),
  constraint subscriber_suppression_consistent check (
    (status = 'suppressed') = (suppressed_at is not null)
  )
);

create table private.contact_requests (
  id uuid primary key default gen_random_uuid(),
  idempotency_key uuid not null unique,
  payload_hash text not null check (payload_hash ~ '^[0-9a-f]{64}$'),
  intent text not null check (intent in ('inquiry', 'waitlist')),
  name text not null check (char_length(name) between 1 and 120 and name = btrim(name) and name !~ '[[:cntrl:]]'),
  email_normalized text not null check (
    email_normalized = lower(btrim(email_normalized))
    and char_length(email_normalized) between 3 and 254
    and email_normalized ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    and email_normalized !~ '[[:cntrl:]]'
  ),
  region text not null default '' check (char_length(region) <= 160 and region !~ '[[:cntrl:]]'),
  travel_when text not null default '' check (char_length(travel_when) <= 160 and travel_when !~ '[[:cntrl:]]'),
  party_size text not null default '' check (char_length(party_size) <= 40 and party_size !~ '[[:cntrl:]]'),
  message text not null default '' check (char_length(message) <= 5000),
  updates boolean not null,
  consent_version text not null check (consent_version ~ '^[A-Za-z0-9._-]{1,80}$'),
  submitted_at timestamptz not null default now(),
  launch_subscriber_id uuid references private.launch_subscribers(id),
  notification_status text not null default 'pending' check (notification_status in ('pending', 'accepted', 'failed')),
  notification_updated_at timestamptz,
  notification_accepted_at timestamptz,
  notification_provider_id text check (
    notification_provider_id is null or
    (char_length(notification_provider_id) between 1 and 200 and notification_provider_id !~ '[[:cntrl:]]')
  ),
  notification_error_code text check (
    notification_error_code is null or notification_error_code ~ '^[a-z][a-z0-9_]{0,63}$'
  ),
  constraint waitlist_requires_consent check (intent <> 'waitlist' or updates),
  constraint notification_receipt_consistent check (
    (notification_status = 'accepted' and notification_provider_id is not null
      and notification_accepted_at is not null and notification_error_code is null)
    or (notification_status <> 'accepted' and notification_provider_id is null and notification_accepted_at is null)
  )
);

create index contact_requests_email_recent_idx
  on private.contact_requests (email_normalized, submitted_at desc);
create index contact_requests_pending_notification_idx
  on private.contact_requests (submitted_at)
  where notification_status in ('pending', 'failed');
create index contact_requests_subscriber_idx on private.contact_requests (launch_subscriber_id)
  where launch_subscriber_id is not null;

create table private.consent_events (
  id uuid primary key default gen_random_uuid(),
  launch_subscriber_id uuid not null references private.launch_subscribers(id),
  contact_request_id uuid unique references private.contact_requests(id) on delete set null,
  event_type text not null check (event_type in ('opt_in_request', 'unsubscribe')),
  applied boolean not null,
  occurred_at timestamptz not null default now(),
  consent_version text check (consent_version is null or consent_version ~ '^[A-Za-z0-9._-]{1,80}$'),
  source text not null check (source in ('website', 'email_request', 'unsubscribe_link', 'admin')),
  constraint consent_event_evidence_valid check (
    (event_type = 'opt_in_request' and consent_version is not null and source = 'website')
    or (event_type = 'unsubscribe' and applied and source <> 'website')
  )
);
create index consent_events_subscriber_time_idx
  on private.consent_events (launch_subscriber_id, occurred_at desc);

alter table private.contact_requests enable row level security;
alter table private.launch_subscribers enable row level security;
alter table private.consent_events enable row level security;

-- No public-client policies: the service role intentionally bypasses RLS.
-- Reset project defaults explicitly, then grant only application operations.
revoke all on private.contact_requests, private.launch_subscribers, private.consent_events
  from public, anon, authenticated, service_role;
grant select, insert, update on private.contact_requests, private.launch_subscribers to service_role;
grant select, insert on private.consent_events to service_role;

create function public.submit_contact_request(
  p_idempotency_key uuid,
  p_payload_hash text,
  p_intent text,
  p_name text,
  p_email text,
  p_updates boolean,
  p_consent_version text,
  p_region text default '',
  p_travel_when text default '',
  p_party_size text default '',
  p_message text default ''
)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  request_record private.contact_requests%rowtype;
  subscriber_record private.launch_subscribers%rowtype;
  normalized_email text := lower(btrim(p_email));
  created boolean := false;
begin
  if p_idempotency_key is null or p_payload_hash is null or p_payload_hash !~ '^[0-9a-f]{64}$' then
    raise exception using errcode = '22023', message = 'Invalid submission identity';
  end if;
  if normalized_email is null or char_length(normalized_email) not between 3 and 254 then
    raise exception using errcode = '23514', message = 'Invalid email address';
  end if;

  -- Lock order is always request key, then email. An in-flight duplicate waits
  -- for the original transaction instead of creating a second request/event.
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(
    'aves-australia-request:' || p_idempotency_key::text, 0));
  select * into request_record from private.contact_requests where idempotency_key = p_idempotency_key;

  if request_record.id is not null then
    if request_record.payload_hash <> p_payload_hash then
      raise exception using errcode = 'PT409', message = 'Submission key already used for different details';
    end if;
  else
    -- Serialize submissions for the same normalized email, without storing IPs.
    -- The replay check above occurs before quota evaluation and has no side effects.
    perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(
      'aves-australia-email:' || normalized_email, 0));
    if (select count(*) from private.contact_requests
      where email_normalized = normalized_email and submitted_at > now() - interval '15 minutes') >= 5 then
      raise exception using errcode = 'PT429', message = 'Please wait before sending another request';
    end if;

    insert into private.contact_requests (
      idempotency_key, payload_hash, intent, name, email_normalized, region,
      travel_when, party_size, message, updates, consent_version
    ) values (
      p_idempotency_key, p_payload_hash, p_intent, btrim(p_name), normalized_email,
      btrim(p_region), btrim(p_travel_when), btrim(p_party_size), btrim(p_message), p_updates, p_consent_version
    ) returning * into request_record;
    created := true;

    if p_updates then
      insert into private.launch_subscribers (email_normalized, status, last_requested_at)
        values (normalized_email, 'requested', now())
        on conflict (email_normalized) do nothing;
      select * into strict subscriber_record from private.launch_subscribers
        where email_normalized = normalized_email for update;

      -- An anonymous form never clears an unsubscribe, including a fresh opt-in.
      if subscriber_record.status = 'requested' then
        update private.launch_subscribers set last_requested_at = now()
          where id = subscriber_record.id;
      end if;
      insert into private.consent_events (
        launch_subscriber_id, contact_request_id, event_type, applied, consent_version, source
      ) values (
        subscriber_record.id, request_record.id, 'opt_in_request',
        subscriber_record.status = 'requested', p_consent_version, 'website'
      );
      update private.contact_requests set launch_subscriber_id = subscriber_record.id
        where id = request_record.id returning * into request_record;
    end if;
  end if;

  return jsonb_build_object(
    'request_id', request_record.id,
    'created', created,
    'submitted_at', request_record.submitted_at,
    'notification_status', request_record.notification_status,
    'subscriber_status', (select status from private.launch_subscribers where id = request_record.launch_subscriber_id)
  );
end;
$$;

create function public.record_contact_notification(
  p_request_id uuid,
  p_status text,
  p_provider_id text default null,
  p_error_code text default null
)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  request_record private.contact_requests%rowtype;
begin
  if p_status is null or p_status not in ('accepted', 'failed') then
    raise exception using errcode = '22023', message = 'Invalid notification status';
  end if;
  if p_status = 'accepted' and (
    p_provider_id is null or char_length(btrim(p_provider_id)) not between 1 and 200
    or p_provider_id ~ '[[:cntrl:]]'
  ) then
    raise exception using errcode = '22023', message = 'Provider acceptance requires a receipt';
  end if;
  if p_error_code is not null and p_error_code !~ '^[a-z][a-z0-9_]{0,63}$' then
    raise exception using errcode = '22023', message = 'Use a non-sensitive notification error code';
  end if;
  select * into request_record from private.contact_requests where id = p_request_id for update;
  if request_record.id is null then
    raise exception using errcode = 'PT404', message = 'Request not found';
  end if;

  -- Provider acceptance is not delivery. Once recorded, an old failure cannot
  -- overwrite it. This RPC only records an outcome; it never triggers email.
  if request_record.notification_status <> 'accepted' then
    update private.contact_requests set
      notification_status = p_status,
      notification_updated_at = now(),
      notification_accepted_at = case when p_status = 'accepted' then now() else null end,
      notification_provider_id = case when p_status = 'accepted' then btrim(p_provider_id) else null end,
      notification_error_code = case when p_status = 'failed' then p_error_code else null end
      where id = p_request_id returning * into request_record;
  end if;
  return jsonb_build_object(
    'request_id', request_record.id,
    'notification_status', request_record.notification_status,
    'provider_id', request_record.notification_provider_id
  );
end;
$$;

create function public.suppress_launch_subscriber(p_email text, p_source text default 'email_request')
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  normalized_email text := lower(btrim(p_email));
  subscriber_record private.launch_subscribers%rowtype;
  inserted_count integer;
  changed boolean;
begin
  if p_source is null or p_source not in ('email_request', 'unsubscribe_link', 'admin') then
    raise exception using errcode = '22023', message = 'Invalid suppression source';
  end if;
  if normalized_email is null or char_length(normalized_email) not between 3 and 254 then
    raise exception using errcode = '23514', message = 'Invalid email address';
  end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(
    'aves-australia-email:' || normalized_email, 0));
  insert into private.launch_subscribers (email_normalized, status, suppressed_at)
    values (normalized_email, 'suppressed', now()) on conflict (email_normalized) do nothing;
  get diagnostics inserted_count = row_count;
  select * into strict subscriber_record from private.launch_subscribers
    where email_normalized = normalized_email for update;
  changed := inserted_count = 1 or subscriber_record.status <> 'suppressed';
  if changed then
    update private.launch_subscribers set status = 'suppressed', suppressed_at = now()
      where id = subscriber_record.id;
    insert into private.consent_events (launch_subscriber_id, event_type, applied, source)
      values (subscriber_record.id, 'unsubscribe', true, p_source);
  end if;
  return jsonb_build_object('subscriber_id', subscriber_record.id, 'status', 'suppressed', 'changed', changed);
end;
$$;

-- Function EXECUTE is granted to PUBLIC by PostgreSQL unless revoked explicitly.
-- Grant only these server-facing entry points; never add browser/RLS allow-all policies.
revoke all on function public.submit_contact_request(uuid,text,text,text,text,boolean,text,text,text,text,text)
  from public, anon, authenticated, service_role;
revoke all on function public.record_contact_notification(uuid,text,text,text)
  from public, anon, authenticated, service_role;
revoke all on function public.suppress_launch_subscriber(text,text)
  from public, anon, authenticated, service_role;
grant execute on function public.submit_contact_request(uuid,text,text,text,text,boolean,text,text,text,text,text) to service_role;
grant execute on function public.record_contact_notification(uuid,text,text,text) to service_role;
grant execute on function public.suppress_launch_subscriber(text,text) to service_role;

comment on table private.contact_requests is 'Private AVES Australia submissions. Hash is a server-computed SHA-256 of canonical submitted fields, including consent version.';
comment on table private.launch_subscribers is 'Requested opt-in is not verified email ownership. Suppressed rows cannot be reactivated by the public contact workflow.';
comment on table private.consent_events is 'Append-only application evidence. Consent wording must remain recoverable from the server-owned version identifier.';

commit;
