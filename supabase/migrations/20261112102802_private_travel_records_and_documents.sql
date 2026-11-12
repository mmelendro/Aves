begin;
-- Practical records are independent of both submitted briefs and the existing workspace JSON.
create function public.trip_records_data_valid(p jsonb) returns boolean
language plpgsql immutable security invoker set search_path='' as $$
declare r jsonb; k text; v text;
begin
 if jsonb_typeof(p) is distinct from 'object' or octet_length(p::text)>32768
  or (select count(*) from jsonb_object_keys(p))<>2 or p->'version' is distinct from '1'::jsonb
  or jsonb_typeof(p->'records') is distinct from 'array' or jsonb_array_length(p->'records')>50 then return false; end if;
 if (select count(distinct x->>'id') from jsonb_array_elements(p->'records') x)<>jsonb_array_length(p->'records') then return false; end if;
 for r in select value from jsonb_array_elements(p->'records') loop
  if jsonb_typeof(r) is distinct from 'object' or (select count(*) from jsonb_object_keys(r))<>12
   or not r ?& array['id','kind','title','category','date','notes','url','entryId','deleted','status'] then return false; end if;
  foreach v in array array['id','kind','title','category','date','notes','url','entryId','status'] loop
   if jsonb_typeof(r->v) is distinct from 'string' then return false; end if;
  end loop;
  perform (r->>'id')::uuid;
  if r->>'entryId'<>'' then perform (r->>'entryId')::uuid; end if;
  if char_length(btrim(r->>'title')) not between 1 and 160 or char_length(r->>'notes')>1000 or char_length(r->>'url')>1500
   or r->>'category' not in ('Flights','Accommodation','Activities','Transport','Gear','Documents','Other')
   or jsonb_typeof(r->'deleted') is distinct from 'boolean' then return false; end if;
  if r->>'date'<>'' and (r->>'date')::date::text is distinct from r->>'date' then return false; end if;
  if r->>'url'<>'' and (r->>'url' !~ '^https://[^/@[:space:]]+' or r->>'url' ~ '[[:space:]]') then return false; end if;
  k=r->>'kind';
  if k='expense' then
   if not r ?& array['amountMinor','currency'] or jsonb_typeof(r->'currency') is distinct from 'string'
    or r->>'currency' not in ('AUD','CAD','COP','EUR','GBP','NZD','USD','JPY') or r->>'status' not in ('estimated','paid','refunded')
    or jsonb_typeof(r->'amountMinor') is distinct from 'number' or (r->>'amountMinor')::numeric not between 0 and 1000000000
    or trunc((r->>'amountMinor')::numeric)<>(r->>'amountMinor')::numeric then return false; end if;
  elsif k='booking' then
   if not r ?& array['provider','reference'] or jsonb_typeof(r->'provider') is distinct from 'string' or jsonb_typeof(r->'reference') is distinct from 'string'
    or char_length(r->>'provider')>160 or char_length(r->>'reference')>160 or r->>'status' not in ('idea','requested','provisional','confirmed','cancelled') then return false; end if;
  else return false; end if;
 end loop;
 return true;
exception when others then return false;
end;
$$;
revoke all on function public.trip_records_data_valid(jsonb) from public,anon,authenticated;
grant execute on function public.trip_records_data_valid(jsonb) to authenticated,service_role;
create table public.trip_records(
 plan_id uuid primary key references public.trip_plans(id) on delete cascade,
 revision integer not null default 1 check(revision between 1 and 2147483647),
 data jsonb not null check(public.trip_records_data_valid(data))
);
alter table public.trip_records enable row level security;
revoke all on public.trip_records from public,anon,authenticated;
grant select on public.trip_records to authenticated;
grant insert(plan_id,revision,data),update(revision,data) on public.trip_records to authenticated;
create policy records_read_own on public.trip_records for select to authenticated
 using(exists(select 1 from public.trip_plans p where p.id=plan_id and p.user_id=(select auth.uid())));
create policy records_insert_own on public.trip_records for insert to authenticated
 with check(exists(select 1 from public.trip_plans p where p.id=plan_id and p.user_id=(select auth.uid())));
create policy records_update_own on public.trip_records for update to authenticated
 using(exists(select 1 from public.trip_plans p where p.id=plan_id and p.user_id=(select auth.uid())))
 with check(exists(select 1 from public.trip_plans p where p.id=plan_id and p.user_id=(select auth.uid())));
create function private.guard_trip_records() returns trigger language plpgsql security invoker set search_path='' as $$
begin
 if tg_op='INSERT' and new.revision<>1 then raise exception using errcode='23514',message='Start at revision one';end if;
 if tg_op='UPDATE' then
  if new.plan_id<>old.plan_id or new.revision<>old.revision+1 then raise exception using errcode='23514',message='Advance the same record revision once';end if;
  if exists(select 1 from jsonb_array_elements(old.data->'records') r where not exists(select 1 from jsonb_array_elements(new.data->'records') n where n->>'id'=r->>'id')) then raise exception using errcode='23514',message='Move records to removed items instead';end if;
 end if;
 if exists(select 1 from jsonb_array_elements(new.data->'records') r where r->>'entryId'<>'' and not exists(select 1 from public.trip_workspaces w,jsonb_array_elements(w.data->'entries') e where w.plan_id=new.plan_id and e->>'id'=r->>'entryId')) then raise exception using errcode='23514',message='Use this trip journal entry';end if;
 return new;
end;
$$;
revoke all on function private.guard_trip_records() from public,anon,authenticated;
create trigger guard_trip_records before insert or update on public.trip_records for each row execute function private.guard_trip_records();
-- Existing private media quotas, row ownership and storage policies are retained.
alter table public.trip_media drop constraint trip_media_kind_check,drop constraint trip_media_mime_check,drop constraint trip_media_check,drop constraint trip_media_check1;
alter table public.trip_media add constraint trip_media_kind_check check(kind in ('photo','audio','document')),
 add constraint trip_media_mime_check check(mime in ('image/jpeg','image/png','image/webp','audio/mpeg','audio/mp4','audio/wav','audio/ogg','audio/webm','application/pdf')),
 add constraint trip_media_kind_mime_check check((kind='photo' and mime like 'image/%') or (kind='audio' and mime like 'audio/%') or (kind='document' and mime='application/pdf')),
 add constraint trip_media_path_check check(object_path=user_id::text||'/'||plan_id::text||'/'||id::text||'.'||case mime when 'image/jpeg' then 'jpg' when 'image/png' then 'png' when 'image/webp' then 'webp' when 'audio/mpeg' then 'mp3' when 'audio/mp4' then 'm4a' when 'audio/wav' then 'wav' when 'audio/ogg' then 'ogg' when 'audio/webm' then 'webm' when 'application/pdf' then 'pdf' end);
update storage.buckets set allowed_mime_types=array['image/jpeg','image/png','image/webp','audio/mpeg','audio/mp4','audio/wav','audio/ogg','audio/webm','application/pdf'] where id='trip-journal-private' and public=false and file_size_limit=3145728;
commit;
