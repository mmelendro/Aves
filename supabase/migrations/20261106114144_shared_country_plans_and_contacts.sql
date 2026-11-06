-- One AVES account backend for Australia and Colombia.
-- Apply this compatibility expansion before deploying the shared application.
-- No accounts, plans, quotes, consent records or financial values are rewritten.
begin;

create function public.trip_region_valid(p_country text, p_region text)
returns boolean language sql immutable security invoker set search_path = '' as $$
  select coalesce(case p_country
    when 'australia' then p_region = any(array[
      'queensland','new-south-wales','tasmania','victoria','south-australia','western-australia',
      'northern-territory','australian-capital-territory','jervis-bay-territory',
      'Queensland','New South Wales','Tasmania','Victoria','South Australia','Western Australia',
      'Northern Territory','Australian Capital Territory','Jervis Bay Territory'])
    when 'colombia' then p_region = any(array[
      'pacific','western-andes','central-andes','eastern-andes','cauca-valley','magdalena-valley',
      'caribbean','sierra-nevada-de-santa-marta','llanos','amazonia','colombian-massif'])
    else false end, false);
$$;
create function public.trip_region_is_colombia(p_region text)
returns boolean language sql immutable security invoker set search_path = '' as $$
  select public.trip_region_valid('colombia',p_region) or coalesce(p_region = any(array[
    'Pacific','Western Andes','Central Andes','Eastern Andes','Cauca Valley','Magdalena Valley',
    'Caribbean','Sierra Nevada de Santa Marta','Llanos','Amazonia','Colombian Massif']),false);
$$;
revoke all on function public.trip_region_valid(text,text), public.trip_region_is_colombia(text) from public,anon,authenticated;
grant execute on function public.trip_region_valid(text,text), public.trip_region_is_colombia(text) to authenticated,service_role;

create or replace function public.trip_details_valid(p_details jsonb)
returns boolean language plpgsql immutable security invoker set search_path = '' as $$
declare region jsonb; region_text text;
begin
  if p_details is null or jsonb_typeof(p_details) <> 'object' or octet_length(p_details::text) > 16384
    or not (p_details ?& array['regions','travelWhen','partySize','message'])
    or p_details - array['country','regions','travelWhen','partySize','message'] <> '{}'::jsonb then return false; end if;
  if p_details ? 'country' and (jsonb_typeof(p_details->'country') <> 'string'
    or p_details->>'country' not in ('australia','colombia')) then return false; end if;
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

create function private.guard_trip_country_regions()
returns trigger language plpgsql security invoker set search_path = '' as $$
declare country text; region_text text;
begin
  -- Preserve constraint errors for malformed data; only inspect valid shapes.
  if not public.trip_details_valid(new.details) then return new; end if;
  country := coalesce(new.details->>'country','australia');
  -- Existing primary-key retries must retain their normal 23505 replay path.
  if tg_op = 'INSERT' and exists(select 1 from public.trip_plans where id = new.id and user_id = new.user_id) then return new; end if;
  for region_text in select jsonb_array_elements_text(new.details->'regions') loop
    if public.trip_region_valid(country,region_text) then continue; end if;
    if tg_op = 'UPDATE' then
      if country = 'australia' and coalesce(old.details->>'country','australia') = 'australia'
        and old.details->'regions' ? region_text and not public.trip_region_is_colombia(region_text) then continue; end if;
    end if;
    raise exception using errcode = '23514', message = 'Choose regions in the selected country.';
  end loop;
  return new;
end;
$$;
revoke all on function private.guard_trip_country_regions() from public,anon,authenticated,service_role;
create trigger trip_plan_country_regions before insert or update on public.trip_plans
  for each row execute function private.guard_trip_country_regions();

alter table private.contact_requests add column country text not null default 'australia'
  check (country in ('australia','colombia'));

-- Keep the original RPC and its exact signature for old Australian clients.
-- The wrapper shares its request-key lock, durable replay, per-email quota and
-- global unsubscribe suppression. Country is recorded with each consent request;
-- it does not automatically subscribe somebody to the other country's updates.
create function public.submit_shared_contact_request(
  p_idempotency_key uuid, p_payload_hash text, p_intent text, p_name text, p_email text,
  p_updates boolean, p_consent_version text, p_region text default '', p_travel_when text default '',
  p_party_size text default '', p_message text default '', p_country text default 'australia'
) returns jsonb language plpgsql security invoker set search_path = '' as $$
declare receipt jsonb; stored_country text;
begin
  if p_country is null or p_country not in ('australia','colombia') then
    raise exception using errcode = '22023', message = 'Invalid destination country';
  end if;
  if p_region is null or (p_region <> '' and ((p_country = 'colombia' and not public.trip_region_valid('colombia',p_region))
    or (p_country = 'australia' and public.trip_region_is_colombia(p_region)))) then
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
revoke all on function public.submit_shared_contact_request(uuid,text,text,text,text,boolean,text,text,text,text,text,text)
  from public,anon,authenticated,service_role;
grant execute on function public.submit_shared_contact_request(uuid,text,text,text,text,boolean,text,text,text,text,text,text)
  to service_role;

-- RLS, ownership policies, account authentication, draft quota, quote freezes and
-- AUD proposal amounts are unchanged. The immutable quote snapshot carries the
-- country in plan details; missing historical country continues to mean Australia.
commit;
