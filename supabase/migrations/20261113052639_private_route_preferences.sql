begin;
set local lock_timeout='3s';
create function public.route_preferences_valid(p jsonb) returns boolean
language plpgsql immutable security invoker set search_path='' as $$
declare k text;b jsonb;n numeric;
begin
 if jsonb_typeof(p) is distinct from 'object' or p->'version' is distinct from '1'::jsonb
 or not p?&array['version','islandId','days','departureDate','currency','allowances','activityBasis','adults','rooms']
 or p-array['version','islandId','days','departureDate','currency','allowances','activityBasis','adults','rooms']<>'{}'::jsonb then return false; end if;
 foreach k in array array['islandId','departureDate','currency','activityBasis'] loop
  if jsonb_typeof(p->k) is distinct from 'string' then return false; end if;
 end loop;
 if p->>'islandId' not in ('north-island','south-island') or p->>'currency' not in ('NZD','AUD','USD','CAD','EUR','GBP') or p->>'activityBasis' not in ('day','experience') then return false; end if;
 foreach k in array array['days','adults','rooms'] loop
  if jsonb_typeof(p->k) is distinct from 'number' then return false; end if;
  n:=(p->>k)::numeric;if n<>trunc(n) or n<1 or n>(case when k='days' then 30 else 12 end) then return false; end if;
 end loop;
 if (p->>'rooms')::integer>(p->>'adults')::integer then return false; end if;
 if p->>'departureDate'<>'' and ((p->>'departureDate')::date::text is distinct from p->>'departureDate') then return false; end if;
 if jsonb_typeof(p->'allowances') is distinct from 'object' or (p->'allowances')-array['accommodation','food','activities','transport']<>'{}'::jsonb then return false; end if;
 for k,b in select key,value from jsonb_each(p->'allowances') loop
  if jsonb_typeof(b) is distinct from 'number' then return false; end if;
  n:=(b#>>'{}')::numeric;if n<>trunc(n) or n<0 or n>10000 then return false; end if;
 end loop;
 return true;
exception when others then return false;
end;
$$;
revoke all on function public.route_preferences_valid(jsonb) from public,anon,authenticated;
grant execute on function public.route_preferences_valid(jsonb) to authenticated,service_role;
create or replace function public.trip_details_valid(p_details jsonb)
returns boolean language plpgsql immutable security invoker set search_path = '' as $$
declare region jsonb; region_text text; q jsonb; interest jsonb; bird jsonb; b jsonb; amount_key text;
begin
  if p_details is null or jsonb_typeof(p_details) <> 'object' or octet_length(p_details::text) > 262144
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
      or q - array['version','pace','birding','comfort','interests','birdIds','budget','routePreferences'] <> '{}'::jsonb
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
    -- Optional additive budgets preserve historical questionnaires. No ownership,
    -- permissions or submitted-snapshot rules change with this validation extension.
    if q ? 'budget' then
      b := q->'budget';
      if jsonb_typeof(b) is distinct from 'object' then return false; end if;
      if b - array['currency','accommodation','food','activities'] <> '{}'::jsonb
        or not coalesce(b->>'currency' = any(array['NZD','AUD','USD','CAD','EUR','GBP']),false)
        or not (b ?| array['accommodation','food','activities']) then return false; end if;
      for amount_key in select unnest(array['accommodation','food','activities']) loop
        if b ? amount_key then
          if jsonb_typeof(b->amount_key) is distinct from 'number' then return false; end if;
          if (b->>amount_key)::numeric < 0 or (b->>amount_key)::numeric > 10000
            or (b->>amount_key)::numeric <> trunc((b->>amount_key)::numeric) then return false; end if;
        end if;
      end loop;
    end if;
    if q ? 'routePreferences' and not public.route_preferences_valid(q->'routePreferences') then return false; end if;
    if q ? 'birdIds' then
      if jsonb_typeof(q->'birdIds') is distinct from 'array' then return false; end if;
      if jsonb_array_length(q->'birdIds') > 512 then return false; end if;
      for bird in select value from jsonb_array_elements(q->'birdIds') loop
        if jsonb_typeof(bird) <> 'string' or (bird #>> '{}') !~ '^nz-[a-f0-9]{12}$' then return false; end if;
      end loop;
      if (select count(*) <> count(distinct value) from jsonb_array_elements(q->'birdIds')) then return false; end if;
    end if;
  end if;
  return jsonb_typeof(p_details->'travelWhen') = 'string'
    and char_length(p_details->>'travelWhen') <= 160 and (p_details->>'travelWhen') !~ '[[:cntrl:]]'
    and jsonb_typeof(p_details->'partySize') = 'string'
    and char_length(p_details->>'partySize') <= 40 and (p_details->>'partySize') !~ '[[:cntrl:]]'
    and jsonb_typeof(p_details->'message') = 'string' and char_length(p_details->>'message') <= 60000 and octet_length(p_details->>'message') <= 196608;
end;
$$;
commit;
