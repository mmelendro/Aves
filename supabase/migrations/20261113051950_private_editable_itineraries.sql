begin;
set local lock_timeout='3s';
set local statement_timeout='30s';
create function public.trip_itineraries_valid(p jsonb) returns boolean
language plpgsql immutable security invoker set search_path='' as $$
declare r jsonb; i jsonb; d jsonb; k text; b jsonb; n numeric;
begin
 if jsonb_typeof(p) is distinct from 'object' or octet_length(p::text)>65536
 or p->'version' is distinct from '1'::jsonb or p-array['version','routes']<>'{}'::jsonb
 or jsonb_typeof(p->'routes') is distinct from 'array' or jsonb_array_length(p->'routes')>2 then return false; end if;
 if (select count(distinct x->'input'->>'islandId') from jsonb_array_elements(p->'routes') x)<>jsonb_array_length(p->'routes') then return false; end if;
 for r in select value from jsonb_array_elements(p->'routes') loop
  i:=r->'input';
  if jsonb_typeof(r) is distinct from 'object' or r-array['version','input','days','style']<>'{}'::jsonb
   or r->'version' is distinct from '1'::jsonb or (r?'style' and (jsonb_typeof(r->'style') is distinct from 'string' or r->>'style' not in ('birds','slower','variety')))
   or jsonb_typeof(i) is distinct from 'object' or not i?&array['islandId','days','areaId','birdIds','interests','includeManaged','startCity','endCity','departureDate','currency','allowances','activityBasis']
   or i-array['islandId','days','areaId','birdIds','interests','includeManaged','startCity','endCity','departureDate','currency','allowances','activityBasis','maxDrivingMinutes','adults','rooms']<>'{}'::jsonb
   or i->>'islandId' not in ('north-island','south-island') or i->>'currency' not in ('NZD','AUD','USD','CAD','EUR','GBP')
   or i->>'activityBasis' not in ('day','experience') or jsonb_typeof(i->'includeManaged') is distinct from 'boolean' then return false; end if;
  foreach k in array array['islandId','areaId','startCity','endCity','departureDate','currency','activityBasis'] loop
   if jsonb_typeof(i->k) is distinct from 'string' or char_length(i->>k)>100 then return false; end if;
  end loop;
  if jsonb_typeof(i->'days') is distinct from 'number' or (i->>'days')::numeric not between 1 and 30 or (i->>'days')::numeric<>trunc((i->>'days')::numeric)
   or jsonb_typeof(i->'birdIds') is distinct from 'array' or jsonb_array_length(i->'birdIds')>512
   or jsonb_typeof(i->'interests') is distinct from 'array' or jsonb_array_length(i->'interests')>11
   or jsonb_typeof(r->'days') is distinct from 'array' or jsonb_array_length(r->'days')<>(i->>'days')::integer then return false; end if;
  if i->>'departureDate'<>'' and ((i->>'departureDate')::date::text is distinct from i->>'departureDate') then return false; end if;
  foreach k in array array['adults','rooms'] loop
   if i?k and (jsonb_typeof(i->k) is distinct from 'number' or (i->>k)::numeric not between 1 and 12 or (i->>k)::numeric<>trunc((i->>k)::numeric)) then return false; end if;
  end loop;
  if coalesce((i->>'rooms')::integer,1)>coalesce((i->>'adults')::integer,1) or (i?'maxDrivingMinutes' and (jsonb_typeof(i->'maxDrivingMinutes') is distinct from 'number' or i->>'maxDrivingMinutes' not in ('120','180','240','300'))) then return false; end if;
  if jsonb_typeof(i->'allowances') is distinct from 'object' or i->'allowances'-array['accommodation','food','activities','transport']<>'{}'::jsonb then return false; end if;
  for k,b in select key,value from jsonb_each(i->'allowances') loop
   if jsonb_typeof(b) is distinct from 'number' then return false; end if;
   n:=(b#>>'{}')::numeric;if n<0 or n>10000 or n<>trunc(n) then return false; end if;
  end loop;
  if (select count(distinct value) from jsonb_array_elements(i->'birdIds'))<>jsonb_array_length(i->'birdIds') then return false; end if;
  if (select count(distinct value) from jsonb_array_elements(i->'interests'))<>jsonb_array_length(i->'interests') then return false; end if;
  for b in select value from jsonb_array_elements(i->'birdIds') loop
   if jsonb_typeof(b) is distinct from 'string' or b#>>'{}' !~ '^nz-[a-f0-9]{12}$' then return false; end if;
  end loop;
  for b in select value from jsonb_array_elements(i->'interests') loop
   if jsonb_typeof(b) is distinct from 'string' or b#>>'{}' not in ('birding','stays','food','markets','hot-springs','hikes','adventures','ecotourism','culture','wellness','transport') then return false; end if;
  end loop;
  for d in select value from jsonb_array_elements(r->'days') loop
   if jsonb_typeof(d) is distinct from 'object' or not d?&array['baseId','birdingId','extraId','stayId'] or d-array['baseId','birdingId','extraId','stayId','transferFrom']<>'{}'::jsonb then return false; end if;
   for k,b in select key,value from jsonb_each(d) loop
    if jsonb_typeof(b) is distinct from 'string' or b#>>'{}' !~ '^[a-z0-9:-]{0,100}$' then return false; end if;
   end loop;
  end loop;
 end loop;
 return true;
exception when others then return false;
end;
$$;
revoke all on function public.trip_itineraries_valid(jsonb) from public,anon,authenticated;
grant execute on function public.trip_itineraries_valid(jsonb) to authenticated,service_role;
create table public.trip_itineraries(
 plan_id uuid primary key references public.trip_plans(id) on delete cascade,
 revision bigint not null default 1 check(revision between 1 and 9007199254740991),
 data jsonb not null check(public.trip_itineraries_valid(data))
);
alter table public.trip_itineraries enable row level security;
revoke all on public.trip_itineraries from public,anon,authenticated;
grant select on public.trip_itineraries to authenticated;
grant insert(plan_id,revision,data),update(revision,data) on public.trip_itineraries to authenticated;
create policy itinerary_read_own on public.trip_itineraries for select to authenticated
 using(exists(select 1 from public.trip_plans p where p.id=plan_id and p.user_id=(select auth.uid())));
create policy itinerary_insert_own on public.trip_itineraries for insert to authenticated
 with check(exists(select 1 from public.trip_plans p where p.id=plan_id and p.user_id=(select auth.uid()) and p.details->>'country'='new-zealand'));
create policy itinerary_update_own on public.trip_itineraries for update to authenticated
 using(exists(select 1 from public.trip_plans p where p.id=plan_id and p.user_id=(select auth.uid())))
 with check(exists(select 1 from public.trip_plans p where p.id=plan_id and p.user_id=(select auth.uid()) and p.details->>'country'='new-zealand'));
create trigger guard_trip_itinerary before insert or update on public.trip_itineraries for each row execute function private.guard_trip_workspace();
commit;
