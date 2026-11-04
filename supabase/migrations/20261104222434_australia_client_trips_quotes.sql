-- AVES Australia client plans, immutable quote snapshots, and priced proposals.
-- No accounts, owner memberships, emails, payments, or bookings are created here.
begin;

grant usage on schema auth to service_role;
grant select (id, email, email_confirmed_at) on auth.users to service_role;

create table private.site_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'owner' check (role = 'owner'),
  active boolean not null default true,
  granted_at timestamptz not null default now(),
  grant_note text not null check (char_length(btrim(grant_note)) between 1 and 500)
);
alter table private.site_admins enable row level security;
revoke all on private.site_admins from public, anon, authenticated, service_role;
grant select on private.site_admins to service_role;

create function private.require_client_identity(p_user_id uuid, p_expected_email text default null)
returns text language plpgsql security invoker set search_path = '' as $$
declare verified_email text;
begin
  select lower(btrim(email)) into verified_email from auth.users
    where id = p_user_id and email_confirmed_at is not null;
  if verified_email is null or verified_email = '' or
    (p_expected_email is not null and verified_email <> lower(btrim(p_expected_email))) then
    raise exception using errcode = 'PT403', message = 'A confirmed account is required';
  end if;
  return verified_email;
end;
$$;

create function private.require_site_admin(p_admin_user_id uuid)
returns void language plpgsql security invoker set search_path = '' as $$
begin
  perform private.require_client_identity(p_admin_user_id);
  if not exists (select 1 from private.site_admins where user_id = p_admin_user_id and active and role = 'owner') then
    raise exception using errcode = 'PT403', message = 'Owner access required';
  end if;
end;
$$;

create function private.guard_site_admin_assignment()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  if new.active then perform private.require_client_identity(new.user_id); end if;
  return new;
end;
$$;
create trigger site_admin_verified_account before insert or update on private.site_admins
  for each row execute function private.guard_site_admin_assignment();

-- Pure input validators are callable by authenticated writers; they read no data.
create function public.trip_details_valid(p_details jsonb)
returns boolean language plpgsql immutable security invoker set search_path = '' as $$
declare region jsonb; region_text text;
begin
  if p_details is null or jsonb_typeof(p_details) <> 'object' or octet_length(p_details::text) > 16384
    or not (p_details ?& array['regions','travelWhen','partySize','message'])
    or p_details - array['regions','travelWhen','partySize','message'] <> '{}'::jsonb then return false; end if;
  if jsonb_typeof(p_details->'regions') <> 'array' then return false; end if;
  if jsonb_array_length(p_details->'regions') > 20 then return false; end if;
  for region in select value from jsonb_array_elements(p_details->'regions') loop
    if jsonb_typeof(region) <> 'string' then return false; end if;
    region_text := region #>> '{}';
    if char_length(btrim(region_text)) not between 1 and 160 or region_text ~ '[[:cntrl:]]' then return false; end if;
  end loop;
  return jsonb_typeof(p_details->'travelWhen') = 'string'
    and char_length(p_details->>'travelWhen') <= 160 and (p_details->>'travelWhen') !~ '[[:cntrl:]]'
    and jsonb_typeof(p_details->'partySize') = 'string'
    and char_length(p_details->>'partySize') <= 40 and (p_details->>'partySize') !~ '[[:cntrl:]]'
    and jsonb_typeof(p_details->'message') = 'string' and char_length(p_details->>'message') <= 5000;
end;
$$;

create function public.proposal_details_valid(p_details jsonb)
returns boolean language plpgsql immutable security invoker set search_path = '' as $$
declare valid_date text;
begin
  if p_details is null or jsonb_typeof(p_details) <> 'object' or octet_length(p_details::text) > 24576
    or not (p_details ?& array['totalCents','currency','itinerary','inclusions','exclusions','validUntil'])
    or p_details - array['totalCents','currency','itinerary','inclusions','exclusions','validUntil'] <> '{}'::jsonb then return false; end if;
  if jsonb_typeof(p_details->'totalCents') <> 'number' or (p_details->>'totalCents') !~ '^[0-9]+$'
    or (p_details->>'totalCents')::numeric > 2147483647
    or jsonb_typeof(p_details->'currency') <> 'string' or p_details->>'currency' <> 'AUD'
    or jsonb_typeof(p_details->'itinerary') <> 'string' or char_length(btrim(p_details->>'itinerary')) not between 1 and 10000
    or jsonb_typeof(p_details->'inclusions') <> 'string' or char_length(p_details->>'inclusions') > 5000
    or jsonb_typeof(p_details->'exclusions') <> 'string' or char_length(p_details->>'exclusions') > 5000 then return false; end if;
  if p_details->'validUntil' <> 'null'::jsonb then
    if jsonb_typeof(p_details->'validUntil') <> 'string' then return false; end if;
    valid_date := p_details->>'validUntil';
    if valid_date !~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' or (valid_date::date)::text <> valid_date then return false; end if;
  end if;
  return true;
exception when data_exception then return false;
end;
$$;

create table public.trip_plans (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(btrim(title)) between 1 and 120 and title !~ '[[:cntrl:]]'),
  details jsonb not null check (public.trip_details_valid(details)),
  status text not null default 'draft' check (status in ('draft','quote_requested')),
  create_payload_hash text not null check (create_payload_hash ~ '^[0-9a-f]{64}$'),
  created_at timestamptz not null default clock_timestamp(),
  updated_at timestamptz not null default clock_timestamp()
);
create index trip_plans_user_updated_idx on public.trip_plans(user_id, updated_at desc);
alter table public.trip_plans enable row level security;
revoke all on public.trip_plans from public, anon, authenticated, service_role;
grant select, delete on public.trip_plans to authenticated;
grant insert (id,user_id,title,details,create_payload_hash) on public.trip_plans to authenticated;
grant update (title,details) on public.trip_plans to authenticated;
grant select, insert, update, delete on public.trip_plans to service_role;
create policy trip_plans_read_own on public.trip_plans for select to authenticated
  using ((select auth.uid()) = user_id);
create policy trip_plans_insert_own_draft on public.trip_plans for insert to authenticated
  with check ((select auth.uid()) = user_id and status = 'draft');
create policy trip_plans_update_own_draft on public.trip_plans for update to authenticated
  using ((select auth.uid()) = user_id and status = 'draft')
  with check ((select auth.uid()) = user_id and status = 'draft');
create policy trip_plans_delete_own_draft on public.trip_plans for delete to authenticated
  using ((select auth.uid()) = user_id and status = 'draft');

create function private.guard_trip_plan()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  if tg_op = 'INSERT' then
    new.created_at := clock_timestamp(); new.updated_at := new.created_at;
  else
    if old.id <> new.id or old.user_id <> new.user_id or old.create_payload_hash <> new.create_payload_hash
      or old.created_at <> new.created_at then
      raise exception using errcode = '23514', message = 'Plan identity is immutable';
    end if;
    if old.status <> 'draft' then
      raise exception using errcode = 'PT409', message = 'Submitted plans are read-only';
    end if;
    new.updated_at := clock_timestamp();
  end if;
  return new;
end;
$$;
create trigger trip_plan_immutable_identity before insert or update on public.trip_plans
  for each row execute function private.guard_trip_plan();

create table public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  client_user_id uuid not null references auth.users(id) on delete cascade,
  plan_id uuid references public.trip_plans(id) on delete set null,
  idempotency_key uuid not null,
  payload_hash text not null check (payload_hash ~ '^[0-9a-f]{64}$'),
  plan_snapshot jsonb not null check (jsonb_typeof(plan_snapshot) = 'object' and octet_length(plan_snapshot::text) <= 18432),
  contact_name text not null check (char_length(btrim(contact_name)) between 1 and 120 and contact_name !~ '[[:cntrl:]]'),
  contact_email text not null check (char_length(contact_email) between 3 and 254 and contact_email !~ '[[:cntrl:]]'),
  status text not null default 'submitted' check (status in ('submitted','reviewing','responded','closed')),
  submitted_at timestamptz not null default clock_timestamp(),
  updated_at timestamptz not null default clock_timestamp(),
  notification_status text not null default 'pending' check (notification_status in ('pending','accepted','failed')),
  notification_provider_id text,
  notification_error_code text check (notification_error_code is null or notification_error_code ~ '^[a-z][a-z0-9_]{0,63}$'),
  notification_updated_at timestamptz,
  notification_accepted_at timestamptz,
  unique (client_user_id, idempotency_key),
  constraint quote_notification_receipt check (
    (notification_status = 'accepted' and notification_provider_id is not null and char_length(notification_provider_id) between 1 and 200
      and notification_accepted_at is not null and notification_error_code is null)
    or (notification_status <> 'accepted' and notification_provider_id is null and notification_accepted_at is null)
  )
);
create index quote_requests_client_time_idx on public.quote_requests(client_user_id,submitted_at desc);
create index quote_requests_plan_idx on public.quote_requests(plan_id) where plan_id is not null;
create index quote_requests_inbox_idx on public.quote_requests(submitted_at desc);

create table public.quote_status_events (
  id uuid primary key default gen_random_uuid(),
  quote_request_id uuid not null references public.quote_requests(id) on delete cascade,
  client_user_id uuid not null references auth.users(id) on delete cascade,
  actor_user_id uuid references auth.users(id) on delete set null,
  previous_status text check (previous_status is null or previous_status in ('submitted','reviewing','responded','closed')),
  status text not null check (status in ('submitted','reviewing','responded','closed')),
  occurred_at timestamptz not null default clock_timestamp()
);
create index quote_status_events_request_time_idx on public.quote_status_events(quote_request_id,occurred_at);
create index quote_status_events_client_idx on public.quote_status_events(client_user_id);
create index quote_status_events_actor_idx on public.quote_status_events(actor_user_id) where actor_user_id is not null;

create table public.quote_proposals (
  id uuid primary key,
  quote_request_id uuid not null references public.quote_requests(id) on delete cascade,
  client_user_id uuid not null references auth.users(id) on delete cascade,
  version integer not null check (version >= 1),
  created_by uuid references auth.users(id) on delete set null,
  create_idempotency_key uuid not null unique,
  create_payload_hash text not null check (create_payload_hash ~ '^[0-9a-f]{64}$'),
  total_cents integer not null check (total_cents >= 0),
  currency text not null default 'AUD' check (currency = 'AUD'),
  itinerary text not null check (char_length(btrim(itinerary)) between 1 and 10000),
  inclusions text not null check (char_length(inclusions) <= 5000),
  exclusions text not null check (char_length(exclusions) <= 5000),
  valid_until date,
  status text not null default 'draft' check (status in ('draft','sent')),
  created_at timestamptz not null default clock_timestamp(),
  updated_at timestamptz not null default clock_timestamp(),
  issued_at timestamptz,
  issue_idempotency_key uuid unique,
  issue_payload_hash text check (issue_payload_hash is null or issue_payload_hash ~ '^[0-9a-f]{64}$'),
  notification_status text not null default 'pending' check (notification_status in ('pending','accepted','failed')),
  notification_provider_id text,
  notification_error_code text check (notification_error_code is null or notification_error_code ~ '^[a-z][a-z0-9_]{0,63}$'),
  notification_updated_at timestamptz,
  notification_accepted_at timestamptz,
  unique (quote_request_id, version),
  constraint proposal_issue_consistent check (
    (status = 'sent' and issued_at is not null and issue_idempotency_key is not null and issue_payload_hash is not null)
    or (status = 'draft' and issued_at is null and issue_idempotency_key is null and issue_payload_hash is null)
  ),
  constraint proposal_notification_receipt check (
    (notification_status = 'accepted' and notification_provider_id is not null
      and char_length(notification_provider_id) between 1 and 200
      and notification_accepted_at is not null and notification_error_code is null)
    or (notification_status <> 'accepted' and notification_provider_id is null and notification_accepted_at is null)
  )
);
create unique index quote_proposals_one_draft_idx on public.quote_proposals(quote_request_id) where status = 'draft';
create index quote_proposals_client_idx on public.quote_proposals(client_user_id,issued_at desc) where status = 'sent';
create index quote_proposals_creator_idx on public.quote_proposals(created_by) where created_by is not null;

alter table public.quote_requests enable row level security;
alter table public.quote_status_events enable row level security;
alter table public.quote_proposals enable row level security;
revoke all on public.quote_requests,public.quote_status_events,public.quote_proposals from public,anon,authenticated,service_role;
grant select on public.quote_requests,public.quote_status_events,public.quote_proposals to authenticated;
grant select,insert,update on public.quote_requests,public.quote_proposals to service_role;
grant select,insert on public.quote_status_events to service_role;
create policy quote_requests_read_own on public.quote_requests for select to authenticated
  using ((select auth.uid()) = client_user_id);
create policy quote_events_read_own on public.quote_status_events for select to authenticated
  using ((select auth.uid()) = client_user_id);
create policy quote_proposals_read_own_sent on public.quote_proposals for select to authenticated
  using ((select auth.uid()) = client_user_id and status = 'sent');

create function private.guard_quote_snapshot()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  if new.id <> old.id or new.client_user_id <> old.client_user_id or new.idempotency_key <> old.idempotency_key
    or new.payload_hash <> old.payload_hash or new.plan_snapshot <> old.plan_snapshot
    or new.contact_name <> old.contact_name or new.contact_email <> old.contact_email or new.submitted_at <> old.submitted_at
    or (new.plan_id is distinct from old.plan_id and new.plan_id is not null) then
    raise exception using errcode = '23514', message = 'Submitted quote details are immutable';
  end if;
  new.updated_at := clock_timestamp();
  return new;
end;
$$;
create trigger quote_request_immutable_snapshot before update on public.quote_requests
  for each row execute function private.guard_quote_snapshot();

create function private.guard_proposal_snapshot()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  if new.id <> old.id or new.quote_request_id <> old.quote_request_id or new.client_user_id <> old.client_user_id
    or new.version <> old.version or new.create_idempotency_key <> old.create_idempotency_key
    or new.create_payload_hash <> old.create_payload_hash or new.created_at <> old.created_at
    or (new.created_by is distinct from old.created_by and new.created_by is not null) then
    raise exception using errcode = '23514', message = 'Proposal identity is immutable';
  end if;
  if old.status = 'sent' and (
    new.status <> old.status or new.total_cents <> old.total_cents or new.currency <> old.currency
    or new.itinerary <> old.itinerary or new.inclusions <> old.inclusions or new.exclusions <> old.exclusions
    or new.valid_until is distinct from old.valid_until or new.issued_at is distinct from old.issued_at
    or new.issue_idempotency_key is distinct from old.issue_idempotency_key
    or new.issue_payload_hash is distinct from old.issue_payload_hash
  ) then raise exception using errcode = 'PT409', message = 'Issued proposals are immutable; create a new version'; end if;
  new.updated_at := clock_timestamp();
  return new;
end;
$$;
create trigger quote_proposal_immutable_issue before update on public.quote_proposals
  for each row execute function private.guard_proposal_snapshot();

create function private.quote_request_receipt(p_request public.quote_requests, p_created boolean)
returns jsonb language sql stable security invoker set search_path = '' as $$
  select jsonb_build_object('request_id',p_request.id,'created',p_created,'plan_id',p_request.plan_id,
    'submitted_at',p_request.submitted_at,'status',p_request.status,'notification_status',p_request.notification_status,
    'plan_snapshot',p_request.plan_snapshot,'contact_name',p_request.contact_name,'contact_email',p_request.contact_email,
    'plan_updated_at',(select updated_at from public.trip_plans where id = p_request.plan_id));
$$;

create function public.submit_quote_request(
  p_client_user_id uuid,p_plan_id uuid,p_idempotency_key uuid,p_payload_hash text,
  p_expected_updated_at timestamptz,p_contact_name text,p_contact_email text
) returns jsonb language plpgsql security invoker set search_path = '' as $$
declare verified_email text; existing public.quote_requests; plan public.trip_plans; result public.quote_requests;
begin
  verified_email := private.require_client_identity(p_client_user_id,p_contact_email);
  if p_plan_id is null or p_idempotency_key is null or p_payload_hash is null or p_payload_hash !~ '^[0-9a-f]{64}$'
    or p_expected_updated_at is null or p_contact_name is null or char_length(btrim(p_contact_name)) not between 1 and 120
    or p_contact_name ~ '[[:cntrl:]]' or p_contact_email is null then
    raise exception using errcode = '22023', message = 'Invalid quote request';
  end if;
  perform pg_advisory_xact_lock(hashtextextended('aves-quote-key:' || p_client_user_id::text || ':' || p_idempotency_key::text,0));
  select * into existing from public.quote_requests where client_user_id = p_client_user_id and idempotency_key = p_idempotency_key;
  if found then
    if existing.payload_hash <> p_payload_hash or existing.plan_id is distinct from p_plan_id then
      raise exception using errcode = 'PT409', message = 'Idempotency key already used for different request';
    end if;
    return private.quote_request_receipt(existing,false);
  end if;
  perform pg_advisory_xact_lock(hashtextextended('aves-quote-client:' || p_client_user_id::text,0));
  if (select count(*) from public.quote_requests where client_user_id = p_client_user_id
    and submitted_at > clock_timestamp() - interval '15 minutes') >= 5 then
    raise exception using errcode = 'PT429', message = 'Please wait before submitting another request';
  end if;
  select * into plan from public.trip_plans where id = p_plan_id and user_id = p_client_user_id for update;
  if not found then raise exception using errcode = 'PT404', message = 'Trip plan not found'; end if;
  if plan.status <> 'draft' or plan.updated_at <> p_expected_updated_at then
    raise exception using errcode = 'PT409', message = 'Trip plan changed; reload before requesting a quote';
  end if;
  insert into public.quote_requests(client_user_id,plan_id,idempotency_key,payload_hash,plan_snapshot,contact_name,contact_email)
  values(p_client_user_id,plan.id,p_idempotency_key,p_payload_hash,
    jsonb_build_object('title',plan.title,'details',plan.details,'plan_id',plan.id,'plan_updated_at',plan.updated_at),
    btrim(p_contact_name),verified_email) returning * into result;
  update public.trip_plans set status = 'quote_requested' where id = plan.id;
  insert into public.quote_status_events(quote_request_id,client_user_id,actor_user_id,status)
    values(result.id,p_client_user_id,p_client_user_id,'submitted');
  return private.quote_request_receipt(result,true);
end;
$$;

create function public.account_admin_status(p_user_id uuid)
returns boolean language sql stable security invoker set search_path = '' as $$
  select exists(select 1 from private.site_admins a join auth.users u on u.id = a.user_id
    where a.user_id = p_user_id and a.active and a.role = 'owner' and u.email_confirmed_at is not null
      and u.email is not null and btrim(u.email) <> '');
$$;

create function public.list_admin_quotes(p_admin_user_id uuid,p_limit integer default 100)
returns jsonb language plpgsql stable security invoker set search_path = '' as $$
declare result jsonb;
begin
  perform private.require_site_admin(p_admin_user_id);
  if p_limit is null or p_limit not between 1 and 100 then
    raise exception using errcode = '22023', message = 'Invalid result limit';
  end if;
  select coalesce(jsonb_agg(to_jsonb(q) || jsonb_build_object(
    'proposals',(select coalesce(jsonb_agg(to_jsonb(p) order by p.version),'[]'::jsonb) from public.quote_proposals p where p.quote_request_id = q.id),
    'status_history',(select coalesce(jsonb_agg(to_jsonb(e) order by e.occurred_at),'[]'::jsonb) from public.quote_status_events e where e.quote_request_id = q.id)
  ) order by q.submitted_at desc),'[]'::jsonb) into result
  from (select * from public.quote_requests order by submitted_at desc limit p_limit) q;
  return result;
end;
$$;

create function public.update_quote_status(p_admin_user_id uuid,p_request_id uuid,p_status text)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare prior public.quote_requests; result public.quote_requests;
begin
  perform private.require_site_admin(p_admin_user_id);
  if p_status is null or p_status not in ('reviewing','responded','closed') then
    raise exception using errcode = '22023', message = 'Invalid quote status';
  end if;
  select * into prior from public.quote_requests where id = p_request_id for update;
  if not found then raise exception using errcode = 'PT404', message = 'Quote request not found'; end if;
  if prior.status = p_status then return to_jsonb(prior); end if;
  update public.quote_requests set status = p_status where id = p_request_id returning * into result;
  insert into public.quote_status_events(quote_request_id,client_user_id,actor_user_id,previous_status,status)
    values(result.id,result.client_user_id,p_admin_user_id,prior.status,p_status);
  return to_jsonb(result);
end;
$$;

create function public.create_quote_proposal(
  p_admin_user_id uuid,p_request_id uuid,p_proposal_id uuid,p_idempotency_key uuid,p_payload_hash text,p_details jsonb
) returns jsonb language plpgsql security invoker set search_path = '' as $$
declare request public.quote_requests; existing public.quote_proposals; result public.quote_proposals; next_version integer;
begin
  perform private.require_site_admin(p_admin_user_id);
  if p_request_id is null or p_proposal_id is null or p_idempotency_key is null or p_payload_hash is null
    or p_payload_hash !~ '^[0-9a-f]{64}$' or public.proposal_details_valid(p_details) is not true then
    raise exception using errcode = '22023', message = 'Invalid proposal';
  end if;
  perform pg_advisory_xact_lock(hashtextextended('aves-proposal-create:' || p_idempotency_key::text,0));
  select * into existing from public.quote_proposals where create_idempotency_key = p_idempotency_key;
  if found then
    if existing.id <> p_proposal_id or existing.quote_request_id <> p_request_id or existing.create_payload_hash <> p_payload_hash then
      raise exception using errcode = 'PT409', message = 'Idempotency key already used for different proposal';
    end if;
    return jsonb_build_object('created',false,'proposal',to_jsonb(existing));
  end if;
  select * into request from public.quote_requests where id = p_request_id for update;
  if not found then raise exception using errcode = 'PT404', message = 'Quote request not found'; end if;
  if request.status = 'closed' then raise exception using errcode = 'PT409', message = 'Reopen the request before preparing a proposal'; end if;
  if exists(select 1 from public.quote_proposals where id = p_proposal_id or (quote_request_id = p_request_id and status = 'draft')) then
    raise exception using errcode = 'PT409', message = 'A proposal with this identity or an editable draft already exists';
  end if;
  select coalesce(max(version),0) + 1 into next_version from public.quote_proposals where quote_request_id = p_request_id;
  insert into public.quote_proposals(id,quote_request_id,client_user_id,version,created_by,create_idempotency_key,create_payload_hash,
    total_cents,currency,itinerary,inclusions,exclusions,valid_until)
  values(p_proposal_id,request.id,request.client_user_id,next_version,p_admin_user_id,p_idempotency_key,p_payload_hash,
    (p_details->>'totalCents')::integer,p_details->>'currency',p_details->>'itinerary',p_details->>'inclusions',p_details->>'exclusions',
    (p_details->>'validUntil')::date) returning * into result;
  return jsonb_build_object('created',true,'proposal',to_jsonb(result));
exception when unique_violation then
  raise exception using errcode = 'PT409', message = 'Proposal identity is already in use';
end;
$$;

create function public.update_quote_proposal(p_admin_user_id uuid,p_proposal_id uuid,p_expected_updated_at timestamptz,p_details jsonb)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare prior public.quote_proposals; result public.quote_proposals;
begin
  perform private.require_site_admin(p_admin_user_id);
  if p_expected_updated_at is null or public.proposal_details_valid(p_details) is not true then
    raise exception using errcode = '22023', message = 'Invalid proposal';
  end if;
  select * into prior from public.quote_proposals where id = p_proposal_id for update;
  if not found then raise exception using errcode = 'PT404', message = 'Proposal not found'; end if;
  if prior.status <> 'draft' or prior.updated_at <> p_expected_updated_at then
    raise exception using errcode = 'PT409', message = 'Proposal changed or was already sent; reload before editing';
  end if;
  update public.quote_proposals set total_cents = (p_details->>'totalCents')::integer,currency = p_details->>'currency',
    itinerary = p_details->>'itinerary',inclusions = p_details->>'inclusions',exclusions = p_details->>'exclusions',
    valid_until = (p_details->>'validUntil')::date where id = p_proposal_id returning * into result;
  return to_jsonb(result);
end;
$$;

create function public.issue_quote_proposal(
  p_admin_user_id uuid,p_proposal_id uuid,p_idempotency_key uuid,p_payload_hash text,p_expected_updated_at timestamptz
) returns jsonb language plpgsql security invoker set search_path = '' as $$
declare prior public.quote_proposals; request public.quote_requests; result public.quote_proposals; request_id uuid; recipient_email text;
begin
  perform private.require_site_admin(p_admin_user_id);
  if p_proposal_id is null or p_idempotency_key is null or p_payload_hash is null or p_payload_hash !~ '^[0-9a-f]{64}$'
    or p_expected_updated_at is null then raise exception using errcode = '22023', message = 'Invalid issue request'; end if;
  perform pg_advisory_xact_lock(hashtextextended('aves-proposal-issue:' || p_idempotency_key::text,0));
  select * into prior from public.quote_proposals where issue_idempotency_key = p_idempotency_key;
  if found then
    if prior.id <> p_proposal_id or prior.issue_payload_hash <> p_payload_hash then
      raise exception using errcode = 'PT409', message = 'Idempotency key already used for different issue request';
    end if;
    select * into request from public.quote_requests where id = prior.quote_request_id;
    recipient_email := private.require_client_identity(request.client_user_id);
    return jsonb_build_object('issued',false,'proposal',to_jsonb(prior),'request_id',request.id,
      'contact_name',request.contact_name,'contact_email',recipient_email);
  end if;
  select quote_request_id into request_id from public.quote_proposals where id = p_proposal_id;
  if not found then raise exception using errcode = 'PT404', message = 'Proposal not found'; end if;
  -- Lock parent before child, matching proposal creation and quote status changes.
  select * into request from public.quote_requests where id = request_id for update;
  select * into prior from public.quote_proposals where id = p_proposal_id for update;
  if prior.status <> 'draft' or prior.updated_at <> p_expected_updated_at or request.status = 'closed' then
    raise exception using errcode = 'PT409', message = 'Proposal changed, was sent, or its request is closed';
  end if;
  -- Notification follows the current confirmed account, while the original inquiry remains an audit snapshot.
  recipient_email := private.require_client_identity(request.client_user_id);
  update public.quote_proposals set status = 'sent',issued_at = clock_timestamp(),
    issue_idempotency_key = p_idempotency_key,issue_payload_hash = p_payload_hash
    where id = p_proposal_id returning * into result;
  if request.status <> 'responded' then
    update public.quote_requests set status = 'responded' where id = request.id;
    insert into public.quote_status_events(quote_request_id,client_user_id,actor_user_id,previous_status,status)
      values(request.id,request.client_user_id,p_admin_user_id,request.status,'responded');
  end if;
  return jsonb_build_object('issued',true,'proposal',to_jsonb(result),'request_id',request.id,
    'contact_name',request.contact_name,'contact_email',recipient_email);
end;
$$;

create function private.notification_input_valid(p_status text,p_provider_id text,p_error_code text)
returns boolean language sql immutable security invoker set search_path = '' as $$
  select coalesce(
    (p_status = 'accepted' and p_provider_id is not null and char_length(p_provider_id) between 1 and 200
      and p_provider_id !~ '[[:cntrl:]]' and p_error_code is null)
    or (p_status = 'failed' and p_provider_id is null and p_error_code is not null and p_error_code ~ '^[a-z][a-z0-9_]{0,63}$'),false);
$$;

create function public.record_quote_notification(p_request_id uuid,p_status text,p_provider_id text default null,p_error_code text default null)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare result public.quote_requests;
begin
  if not private.notification_input_valid(p_status,p_provider_id,p_error_code) then
    raise exception using errcode = '22023', message = 'Invalid notification outcome';
  end if;
  select * into result from public.quote_requests where id = p_request_id for update;
  if not found then raise exception using errcode = 'PT404', message = 'Quote request not found'; end if;
  if result.notification_status <> 'accepted' then
    update public.quote_requests set notification_status = p_status,notification_provider_id = p_provider_id,
      notification_error_code = p_error_code,notification_updated_at = clock_timestamp(),
      notification_accepted_at = case when p_status = 'accepted' then clock_timestamp() else null end
      where id = p_request_id returning * into result;
  end if;
  return jsonb_build_object('request_id',result.id,'notification_status',result.notification_status);
end;
$$;

create function public.record_proposal_notification(p_proposal_id uuid,p_status text,p_provider_id text default null,p_error_code text default null)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare result public.quote_proposals;
begin
  if not private.notification_input_valid(p_status,p_provider_id,p_error_code) then
    raise exception using errcode = '22023', message = 'Invalid notification outcome';
  end if;
  select * into result from public.quote_proposals where id = p_proposal_id for update;
  if not found then raise exception using errcode = 'PT404', message = 'Proposal not found'; end if;
  if result.status <> 'sent' then raise exception using errcode = 'PT409', message = 'Proposal has not been issued'; end if;
  if result.notification_status <> 'accepted' then
    update public.quote_proposals set notification_status = p_status,notification_provider_id = p_provider_id,
      notification_error_code = p_error_code,notification_updated_at = clock_timestamp(),
      notification_accepted_at = case when p_status = 'accepted' then clock_timestamp() else null end
      where id = p_proposal_id returning * into result;
  end if;
  return jsonb_build_object('proposal_id',result.id,'notification_status',result.notification_status);
end;
$$;

-- Explicit ACLs: no browser can invoke privileged RPCs, even with a forged actor UUID.
revoke all on function public.trip_details_valid(jsonb),public.proposal_details_valid(jsonb) from public,anon,authenticated;
grant execute on function public.trip_details_valid(jsonb),public.proposal_details_valid(jsonb) to authenticated,service_role;
revoke all on function private.require_client_identity(uuid,text),private.require_site_admin(uuid),
  private.guard_site_admin_assignment(),private.guard_trip_plan(),private.guard_quote_snapshot(),private.guard_proposal_snapshot(),
  private.quote_request_receipt(public.quote_requests,boolean),private.notification_input_valid(text,text,text)
  from public,anon,authenticated;
grant execute on function private.require_client_identity(uuid,text),private.require_site_admin(uuid),
  private.quote_request_receipt(public.quote_requests,boolean),private.notification_input_valid(text,text,text) to service_role;
revoke all on function public.submit_quote_request(uuid,uuid,uuid,text,timestamptz,text,text),
  public.account_admin_status(uuid),public.list_admin_quotes(uuid,integer),public.update_quote_status(uuid,uuid,text),
  public.create_quote_proposal(uuid,uuid,uuid,uuid,text,jsonb),public.update_quote_proposal(uuid,uuid,timestamptz,jsonb),
  public.issue_quote_proposal(uuid,uuid,uuid,text,timestamptz),
  public.record_quote_notification(uuid,text,text,text),public.record_proposal_notification(uuid,text,text,text)
  from public,anon,authenticated;
grant execute on function public.submit_quote_request(uuid,uuid,uuid,text,timestamptz,text,text),
  public.account_admin_status(uuid),public.list_admin_quotes(uuid,integer),public.update_quote_status(uuid,uuid,text),
  public.create_quote_proposal(uuid,uuid,uuid,uuid,text,jsonb),public.update_quote_proposal(uuid,uuid,timestamptz,jsonb),
  public.issue_quote_proposal(uuid,uuid,uuid,text,timestamptz),
  public.record_quote_notification(uuid,text,text,text),public.record_proposal_notification(uuid,text,text,text)
  to service_role;

commit;
