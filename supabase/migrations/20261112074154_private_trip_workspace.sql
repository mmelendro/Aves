begin;
-- Separate from immutable quote snapshots: sharing a brief never grants workspace access.
create function public.trip_workspace_data_valid(p jsonb) returns boolean
language plpgsql immutable security invoker set search_path='' as $$
declare item jsonb; v text;
begin
  if jsonb_typeof(p) is distinct from 'object' or octet_length(p::text)>32768
    or (select count(*) from jsonb_object_keys(p))<>3 or p->'version' is distinct from '1'::jsonb
    or jsonb_typeof(p->'tasks') is distinct from 'array' or jsonb_typeof(p->'entries') is distinct from 'array'
    or jsonb_array_length(p->'tasks')>50 or jsonb_array_length(p->'entries')>50 then return false; end if;
  if (select count(distinct x->>'id') from jsonb_array_elements(p->'tasks') x)<>jsonb_array_length(p->'tasks')
    or (select count(distinct x->>'id') from jsonb_array_elements(p->'entries') x)<>jsonb_array_length(p->'entries') then return false; end if;
  for item in select value from jsonb_array_elements(p->'tasks') loop
    if jsonb_typeof(item) is distinct from 'object' or (select count(*) from jsonb_object_keys(item))<>9
      or not item ?& array['id','title','category','done','dueDate','notes','url','arrangement','deleted'] then return false; end if;
    perform (item->>'id')::uuid;
    foreach v in array array['id','title','category','dueDate','notes','url','arrangement'] loop
      if jsonb_typeof(item->v) is distinct from 'string' then return false; end if;
    end loop;
    if char_length(item->>'title') not between 1 and 160 or char_length(item->>'notes')>500 or char_length(item->>'url')>1500
      or item->>'category' not in ('Flights','Accommodation','Activities','Transport','Gear','Documents','Other')
      or item->>'arrangement' not in ('idea','requested','provisional','confirmed','cancelled')
      or jsonb_typeof(item->'done') is distinct from 'boolean' or jsonb_typeof(item->'deleted') is distinct from 'boolean' then return false; end if;
    if item->>'dueDate'<>'' and ((item->>'dueDate')::date::text is distinct from item->>'dueDate') then return false; end if;
    if item->>'url'<>'' and (item->>'url' !~ '^https://[^/@[:space:]]+' or item->>'url' ~ '[[:space:]]') then return false; end if;
  end loop;
  for item in select value from jsonb_array_elements(p->'entries') loop
    if jsonb_typeof(item) is distinct from 'object' or (select count(*) from jsonb_object_keys(item))<>7
      or not item ?& array['id','title','body','date','day','placeId','deleted'] then return false; end if;
    perform (item->>'id')::uuid;
    foreach v in array array['id','title','body','date','placeId'] loop
      if jsonb_typeof(item->v) is distinct from 'string' then return false; end if;
    end loop;
    if char_length(item->>'title') not between 1 and 160 or char_length(item->>'body')>3000 or char_length(item->>'placeId')>250
      or jsonb_typeof(item->'deleted') is distinct from 'boolean' then return false; end if;
    if item->>'date'<>'' and ((item->>'date')::date::text is distinct from item->>'date') then return false; end if;
    if item->'day'<>'null'::jsonb and (jsonb_typeof(item->'day') is distinct from 'number' or (item->>'day')::numeric not between 1 and 365 or trunc((item->>'day')::numeric)<>(item->>'day')::numeric) then return false; end if;
  end loop;
  return true;
exception when others then return false;
end;
$$;
revoke all on function public.trip_workspace_data_valid(jsonb) from public,anon,authenticated;
grant execute on function public.trip_workspace_data_valid(jsonb) to authenticated,service_role;
create table public.trip_workspaces(
  plan_id uuid primary key references public.trip_plans(id) on delete cascade,
  revision bigint not null default 1 check(revision between 1 and 9007199254740991),
  data jsonb not null check(public.trip_workspace_data_valid(data))
);
alter table public.trip_workspaces enable row level security;
revoke all on public.trip_workspaces from public,anon,authenticated;
grant select on public.trip_workspaces to authenticated;
grant insert(plan_id,revision,data),update(revision,data) on public.trip_workspaces to authenticated;
create policy workspace_read_own on public.trip_workspaces for select to authenticated
  using(exists(select 1 from public.trip_plans p where p.id=plan_id and p.user_id=(select auth.uid())));
create policy workspace_insert_own on public.trip_workspaces for insert to authenticated
  with check(exists(select 1 from public.trip_plans p where p.id=plan_id and p.user_id=(select auth.uid())));
create policy workspace_update_own on public.trip_workspaces for update to authenticated
  using(exists(select 1 from public.trip_plans p where p.id=plan_id and p.user_id=(select auth.uid())))
  with check(exists(select 1 from public.trip_plans p where p.id=plan_id and p.user_id=(select auth.uid())));
-- Protect identity and revision even through direct Data API access.
create function private.guard_trip_workspace() returns trigger
language plpgsql security invoker set search_path='' as $$
begin
  if tg_op='INSERT' and new.revision<>1 then raise exception using errcode='23514',message='Start at revision one'; end if;
  if tg_op='UPDATE' and (new.plan_id<>old.plan_id or new.revision<>old.revision+1) then raise exception using errcode='23514',message='Workspace revision must advance once'; end if;
  return new;
end;
$$;
revoke all on function private.guard_trip_workspace() from public,anon,authenticated;
create trigger guard_trip_workspace before insert or update on public.trip_workspaces for each row execute function private.guard_trip_workspace();
commit;
