-- Shared AVES destination catalogue. Adding a country requires catalogue data
-- and matching reviewed application content, not another account database.
-- Ecuador and Costa Rica are reserved but NOT launched by this migration.
begin;
set local lock_timeout = '3s';
set local statement_timeout = '30s';

create table public.destination_countries (
  id text primary key check (char_length(id) between 2 and 64 and id ~ '^[a-z]+(-[a-z]+)*$'),
  label text not null check (char_length(btrim(label)) between 1 and 120 and label !~ '[[:cntrl:]]'),
  enabled boolean not null default false
);
create table public.destination_regions (
  country_id text not null references public.destination_countries(id),
  id text not null check (char_length(id) between 1 and 100 and id ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  label text not null check (char_length(btrim(label)) between 1 and 160 and label !~ '[[:cntrl:]]'),
  accept_label boolean not null default false,
  primary key (country_id,id)
);
alter table public.destination_countries enable row level security;
alter table public.destination_regions enable row level security;
revoke all on public.destination_countries,public.destination_regions from public,anon,authenticated,service_role;
grant select on public.destination_countries,public.destination_regions to authenticated,service_role;
-- Nonpersonal catalogue metadata is readable; no browser role may change it.
create policy destination_countries_read on public.destination_countries for select to authenticated using (true);
create policy destination_regions_read on public.destination_regions for select to authenticated using (true);

insert into public.destination_countries(id,label,enabled) values
  ('australia','Australia',true),('colombia','Colombia',true),
  ('ecuador','Ecuador',false),('costa-rica','Costa Rica',false);
insert into public.destination_regions(country_id,id,label,accept_label) values
  ('australia','queensland','Queensland',true),
  ('australia','new-south-wales','New South Wales',true),
  ('australia','tasmania','Tasmania',true),
  ('australia','victoria','Victoria',true),
  ('australia','south-australia','South Australia',true),
  ('australia','western-australia','Western Australia',true),
  ('australia','northern-territory','Northern Territory',true),
  ('australia','australian-capital-territory','Australian Capital Territory',true),
  ('australia','jervis-bay-territory','Jervis Bay Territory',true),
  ('colombia','pacific','Pacific',false),
  ('colombia','western-andes','Western Andes',false),
  ('colombia','central-andes','Central Andes',false),
  ('colombia','eastern-andes','Eastern Andes',false),
  ('colombia','cauca-valley','Cauca Valley',false),
  ('colombia','magdalena-valley','Magdalena Valley',false),
  ('colombia','caribbean','Caribbean',false),
  ('colombia','sierra-nevada-de-santa-marta','Sierra Nevada de Santa Marta',false),
  ('colombia','llanos','Llanos',false),
  ('colombia','amazonia','Amazonia',false),
  ('colombia','colombian-massif','Colombian Massif',false);

create function public.trip_country_enabled(p_country text)
returns boolean language sql stable security invoker set search_path = '' as $$
  select exists(select 1 from public.destination_countries where id = p_country and enabled);
$$;
create or replace function public.trip_region_valid(p_country text,p_region text)
returns boolean language sql stable security invoker set search_path = '' as $$
  select exists(select 1 from public.destination_regions
    where country_id = p_country and (id = p_region or (accept_label and label = p_region)));
$$;
create function public.trip_region_is_other_country(p_country text,p_region text)
returns boolean language sql stable security invoker set search_path = '' as $$
  select exists(select 1 from public.destination_regions
    where country_id <> p_country and (id = p_region or label = p_region));
$$;
-- Retain this helper for old callers; new validation is country-independent.
create or replace function public.trip_region_is_colombia(p_region text)
returns boolean language sql stable security invoker set search_path = '' as $$
  select exists(select 1 from public.destination_regions
    where country_id = 'colombia' and (id = p_region or label = p_region));
$$;
revoke all on function public.trip_country_enabled(text),public.trip_region_valid(text,text),
  public.trip_region_is_other_country(text,text),public.trip_region_is_colombia(text) from public,anon,authenticated,service_role;
grant execute on function public.trip_country_enabled(text),public.trip_region_valid(text,text),
  public.trip_region_is_other_country(text,text),public.trip_region_is_colombia(text) to authenticated,service_role;

-- Immutable JSON shape checks must not consult mutable catalogue rows.
-- The generated foreign key and trigger below enforce catalogue membership.
create or replace function public.trip_details_valid(p_details jsonb)
returns boolean language plpgsql immutable security invoker set search_path = '' as $$
declare region jsonb; region_text text;
begin
  if p_details is null or jsonb_typeof(p_details) <> 'object' or octet_length(p_details::text) > 16384
    or not (p_details ?& array['regions','travelWhen','partySize','message'])
    or p_details - array['country','regions','travelWhen','partySize','message'] <> '{}'::jsonb then return false; end if;
  if p_details ? 'country' and (jsonb_typeof(p_details->'country') <> 'string'
    or char_length(p_details->>'country') not between 2 and 64
    or p_details->>'country' !~ '^[a-z]+(-[a-z]+)*$') then return false; end if;
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

alter table public.trip_plans add column destination_country text
  generated always as (coalesce(details->>'country','australia')) stored
  references public.destination_countries(id);
create index trip_plans_destination_country_idx on public.trip_plans(destination_country);
alter table private.contact_requests drop constraint contact_requests_country_check;
alter table private.contact_requests add constraint contact_requests_country_fkey
  foreign key (country) references public.destination_countries(id);
create index contact_requests_country_idx on private.contact_requests(country);

create or replace function private.guard_trip_country_regions()
returns trigger language plpgsql security invoker set search_path = '' as $$
declare country text; region_text text;
begin
  if not public.trip_details_valid(new.details) then return new; end if;
  country := coalesce(new.details->>'country','australia');
  -- Existing primary-key retries must retain their normal 23505 replay path.
  if tg_op = 'INSERT' and exists(select 1 from public.trip_plans where id = new.id and user_id = new.user_id) then return new; end if;
  if not public.trip_country_enabled(country) then
    -- A disabled destination cannot accept new plans or country changes, but
    -- owned drafts already saved there remain editable and quotable.
    if tg_op = 'INSERT' then
      raise exception using errcode = '23514', message = 'Choose an available destination country.';
    elsif country is distinct from coalesce(old.details->>'country','australia') then
      raise exception using errcode = '23514', message = 'Choose an available destination country.';
    end if;
  end if;
  for region_text in select jsonb_array_elements_text(new.details->'regions') loop
    if public.trip_region_valid(country,region_text) then continue; end if;
    if tg_op = 'UPDATE' then
      if country = 'australia' and coalesce(old.details->>'country','australia') = 'australia'
        and old.details->'regions' ? region_text
        and not public.trip_region_is_other_country(country,region_text) then continue; end if;
    end if;
    raise exception using errcode = '23514', message = 'Choose regions in the selected country.';
  end loop;
  return new;
end;
$$;

create or replace function public.submit_shared_contact_request(
  p_idempotency_key uuid,p_payload_hash text,p_intent text,p_name text,p_email text,
  p_updates boolean,p_consent_version text,p_region text default '',p_travel_when text default '',
  p_party_size text default '',p_message text default '',p_country text default 'australia'
) returns jsonb language plpgsql security invoker set search_path = '' as $$
declare receipt jsonb; stored_country text;
begin
  if not public.trip_country_enabled(p_country) then
    -- Preserve the exact receipt for a request accepted before a destination
    -- was disabled. The existing RPC still checks its hash under the same lock;
    -- no disabled destination can create a new request or consent event.
    perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(
      'aves-australia-request:' || p_idempotency_key::text,0));
    select country into stored_country from private.contact_requests
      where idempotency_key = p_idempotency_key for update;
    if not found then
      raise exception using errcode = '22023', message = 'Invalid destination country';
    end if;
    if stored_country is distinct from p_country then
      raise exception using errcode = 'PT409', message = 'Submission key belongs to another destination country';
    end if;
    return public.submit_contact_request(p_idempotency_key,p_payload_hash,p_intent,p_name,p_email,
      p_updates,p_consent_version,p_region,p_travel_when,p_party_size,p_message);
  end if;
  if p_region is null or (p_region <> '' and (
    (p_country <> 'australia' and not public.trip_region_valid(p_country,p_region))
    or (p_country = 'australia' and not public.trip_region_valid(p_country,p_region)
      and public.trip_region_is_other_country(p_country,p_region)))) then
    raise exception using errcode = '22023', message = 'Choose a region in the selected country.';
  end if;
  receipt := public.submit_contact_request(p_idempotency_key,p_payload_hash,p_intent,p_name,p_email,
    p_updates,p_consent_version,p_region,p_travel_when,p_party_size,p_message);
  if (receipt->>'created')::boolean then
    update private.contact_requests set country = p_country where id = (receipt->>'request_id')::uuid;
  else
    select country into stored_country from private.contact_requests where id = (receipt->>'request_id')::uuid;
    if stored_country is distinct from p_country then
      raise exception using errcode = 'PT409', message = 'Submission key belongs to another destination country';
    end if;
  end if;
  return receipt;
end;
$$;
-- CREATE OR REPLACE preserves the service-only wrapper grant and trigger ACL.

-- A disabled application destination may only retrieve an already stored
-- receipt, including while its database launch flag is still enabled during a
-- rolling release. This function cannot insert requests, consent or email work.
create function public.replay_shared_contact_request(
  p_idempotency_key uuid,p_payload_hash text,p_country text
) returns jsonb language plpgsql stable security invoker set search_path = '' as $$
declare request_record private.contact_requests%rowtype;
begin
  if p_idempotency_key is null or p_payload_hash is null or p_payload_hash !~ '^[0-9a-f]{64}$'
    or p_country is null or char_length(p_country) not between 2 and 64
    or p_country !~ '^[a-z]+(-[a-z]+)*$' then
    raise exception using errcode = '22023', message = 'Invalid submission identity';
  end if;
  select * into request_record from private.contact_requests where idempotency_key = p_idempotency_key;
  if not found then
    raise exception using errcode = '22023', message = 'No stored request matches this submission';
  end if;
  if request_record.payload_hash <> p_payload_hash or request_record.country <> p_country then
    raise exception using errcode = 'PT409', message = 'Submission key already used for different details';
  end if;
  return jsonb_build_object(
    'request_id',request_record.id,
    'created',false,
    'submitted_at',request_record.submitted_at,
    'notification_status',request_record.notification_status,
    'subscriber_status',(select status from private.launch_subscribers where id = request_record.launch_subscriber_id)
  );
end;
$$;
revoke all on function public.replay_shared_contact_request(uuid,text,text) from public,anon,authenticated,service_role;
grant execute on function public.replay_shared_contact_request(uuid,text,text) to service_role;
-- Customer ownership, quote immutability, limits, consent and AUD prices stay intact.
commit;
