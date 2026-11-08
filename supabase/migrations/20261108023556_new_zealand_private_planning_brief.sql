-- NZ is enabled for private planning, not confirmed tour availability.
-- Reuse owned drafts, immutable submission snapshots and existing RLS/grants.
begin;
set local lock_timeout = '3s';
set local statement_timeout = '30s';
insert into public.destination_countries(id,label,enabled) values ('new-zealand','New Zealand',true);
insert into public.destination_regions(country_id,id,label,accept_label) values
  ('new-zealand','north-island','North Island',false),
  ('new-zealand','south-island','South Island',false),
  ('new-zealand','rakiura','Rakiura / Stewart Island',false);

create or replace function public.trip_details_valid(p_details jsonb)
returns boolean language plpgsql immutable security invoker set search_path = '' as $$
declare region jsonb; region_text text; q jsonb; interest jsonb;
begin
  if p_details is null or jsonb_typeof(p_details) <> 'object' or octet_length(p_details::text) > 16384
    or not (p_details ?& array['regions','travelWhen','partySize','message'])
    or p_details - array['country','regions','travelWhen','partySize','message','questionnaire'] <> '{}'::jsonb then return false; end if;
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
  -- Questionnaire v1 is optional for historical plans and limited to NZ.
  -- Strict keys/enums bound the JSON at the database as well as the API.
  if p_details ? 'questionnaire' then
    q := p_details->'questionnaire';
    if p_details->>'country' is distinct from 'new-zealand'
      or jsonb_typeof(q) is distinct from 'object' then return false; end if;
    if not (q ?& array['version','pace','birding','comfort','interests'])
      or q - array['version','pace','birding','comfort','interests'] <> '{}'::jsonb
      or q->'version' is distinct from '1'::jsonb
      or not coalesce(q->>'pace' = any(array['open','relaxed','balanced','active']),false)
      or not coalesce(q->>'birding' = any(array['open','occasional','alternate','daily']),false)
      or not coalesce(q->>'comfort' = any(array['open','simple','comfortable','special']),false)
      or jsonb_typeof(q->'interests') is distinct from 'array' then return false; end if;
    if jsonb_array_length(q->'interests') > 7 then return false; end if;
    for interest in select value from jsonb_array_elements(q->'interests') loop
      if jsonb_typeof(interest) <> 'string' or not ((interest #>> '{}') = any(array['birds','scenery','photography','food','culture','water','wellness'])) then return false; end if;
    end loop;
    if (select count(*) <> count(distinct value) from jsonb_array_elements(q->'interests')) then return false; end if;
  end if;
  return jsonb_typeof(p_details->'travelWhen') = 'string'
    and char_length(p_details->>'travelWhen') <= 160 and (p_details->>'travelWhen') !~ '[[:cntrl:]]'
    and jsonb_typeof(p_details->'partySize') = 'string'
    and char_length(p_details->>'partySize') <= 40 and (p_details->>'partySize') !~ '[[:cntrl:]]'
    and jsonb_typeof(p_details->'message') = 'string' and char_length(p_details->>'message') <= 5000;
end;
$$;
-- CREATE OR REPLACE preserves the existing function permissions.
commit;
