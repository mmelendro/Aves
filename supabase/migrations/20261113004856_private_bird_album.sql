begin;
-- Self-reported wishes/observations only. No client can award verified status.
create function public.trip_bird_album_valid(p jsonb) returns boolean
language plpgsql immutable security invoker set search_path='' as $$
declare b jsonb; k text;
begin
 if jsonb_typeof(p) is distinct from 'object' or octet_length(p::text)>32768
 or (select count(*) from jsonb_object_keys(p))<>2 or p->'version' is distinct from '1'::jsonb
 or jsonb_typeof(p->'birds') is distinct from 'array' or jsonb_array_length(p->'birds')>100 then return false; end if;
 if (select count(distinct x->>'id') from jsonb_array_elements(p->'birds') x)<>jsonb_array_length(p->'birds') then return false; end if;
 for b in select value from jsonb_array_elements(p->'birds') loop
  if jsonb_typeof(b) is distinct from 'object' or (select count(*) from jsonb_object_keys(b))<>7
   or not b ?& array['id','speciesId','state','date','regionId','notes','deleted'] then return false; end if;
  perform (b->>'id')::uuid;
  foreach k in array array['id','speciesId','state','date','regionId','notes'] loop
   if jsonb_typeof(b->k) is distinct from 'string' then return false; end if;
  end loop;
  if b->>'speciesId' !~ '^[a-z0-9-]{1,64}$' or char_length(b->>'regionId')>160 or char_length(b->>'notes')>800
   or b->>'state' not in ('desired','observed') or jsonb_typeof(b->'deleted') is distinct from 'boolean' then return false; end if;
  if b->>'date'<>'' and ((b->>'date')::date::text is distinct from b->>'date') then return false; end if;
  if b->>'state'='desired' and b->>'date'<>'' then return false; end if;
 end loop;
 return true;
exception when others then return false;
end;
$$;
revoke all on function public.trip_bird_album_valid(jsonb) from public,anon,authenticated;
grant execute on function public.trip_bird_album_valid(jsonb) to authenticated,service_role;
create table public.trip_bird_albums(
 plan_id uuid primary key references public.trip_plans(id) on delete cascade,
 revision bigint not null default 1 check(revision between 1 and 9007199254740991),
 data jsonb not null check(public.trip_bird_album_valid(data))
);
alter table public.trip_bird_albums enable row level security;
revoke all on public.trip_bird_albums from public,anon,authenticated;
grant select on public.trip_bird_albums to authenticated;
grant insert(plan_id,revision,data),update(revision,data) on public.trip_bird_albums to authenticated;
create policy bird_album_read_own on public.trip_bird_albums for select to authenticated
 using(exists(select 1 from public.trip_plans p where p.id=plan_id and p.user_id=(select auth.uid())));
create policy bird_album_insert_own on public.trip_bird_albums for insert to authenticated
 with check(exists(select 1 from public.trip_plans p where p.id=plan_id and p.user_id=(select auth.uid())));
create policy bird_album_update_own on public.trip_bird_albums for update to authenticated
 using(exists(select 1 from public.trip_plans p where p.id=plan_id and p.user_id=(select auth.uid())))
 with check(exists(select 1 from public.trip_plans p where p.id=plan_id and p.user_id=(select auth.uid())));
create trigger guard_trip_bird_album before insert or update on public.trip_bird_albums for each row execute function private.guard_trip_workspace();
commit;
