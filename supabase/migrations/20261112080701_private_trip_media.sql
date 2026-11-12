begin;
create table public.trip_media(
  id uuid primary key,
  plan_id uuid not null references public.trip_plans(id) on delete restrict,
  user_id uuid not null references auth.users(id) on delete restrict,
  entry_id uuid not null,
  object_path text not null unique,
  kind text not null check(kind in ('photo','audio')),
  mime text not null check(mime in ('image/jpeg','image/png','image/webp','audio/mpeg','audio/mp4','audio/wav','audio/ogg','audio/webm')),
  byte_size integer not null check(byte_size between 1 and 3145728),
  content_hash text not null check(content_hash ~ '^[a-f0-9]{64}$'),
  state text not null default 'pending' check(state in ('pending','ready','deleting')),
  caption text not null default '' check(char_length(caption)<=300),
  creator text not null default '' check(char_length(creator)<=160),
  recorded_on date,
  position integer not null default 0 check(position between 0 and 999),
  notes text not null default '' check(char_length(notes)<=1500),
  revision integer not null default 1 check(revision>0),
  created_at timestamptz not null default now(),
  check((kind='photo')=(mime like 'image/%')),
  check(object_path=user_id::text||'/'||plan_id::text||'/'||id::text||'.'||case mime when 'image/jpeg' then 'jpg' when 'image/png' then 'png' when 'image/webp' then 'webp' when 'audio/mpeg' then 'mp3' when 'audio/mp4' then 'm4a' when 'audio/wav' then 'wav' when 'audio/ogg' then 'ogg' when 'audio/webm' then 'webm' end)
);
create index trip_media_owner on public.trip_media(user_id);
create index trip_media_trip_order on public.trip_media(plan_id,position,created_at);
alter table public.trip_media enable row level security;
revoke all on public.trip_media from public,anon,authenticated;
grant select,delete on public.trip_media to authenticated;
grant insert(id,plan_id,user_id,entry_id,object_path,kind,mime,byte_size,content_hash) on public.trip_media to authenticated;
grant update(state,caption,creator,recorded_on,position,notes,revision) on public.trip_media to authenticated;
create policy media_read_own on public.trip_media for select to authenticated using(user_id=(select auth.uid()) and exists(select 1 from public.trip_plans p where p.id=plan_id and p.user_id=(select auth.uid())));
create policy media_insert_own on public.trip_media for insert to authenticated with check(user_id=(select auth.uid()) and exists(select 1 from public.trip_plans p where p.id=plan_id and p.user_id=(select auth.uid())));
create policy media_update_own on public.trip_media for update to authenticated using(user_id=(select auth.uid()) and exists(select 1 from public.trip_plans p where p.id=plan_id and p.user_id=(select auth.uid()))) with check(user_id=(select auth.uid()) and exists(select 1 from public.trip_plans p where p.id=plan_id and p.user_id=(select auth.uid())));
create policy media_delete_own on public.trip_media for delete to authenticated using(user_id=(select auth.uid()) and state='deleting' and exists(select 1 from public.trip_plans p where p.id=plan_id and p.user_id=(select auth.uid())));
-- A narrowly scoped definer trigger is needed to count ALL owners for a hard project cap.
-- It is not an exposed RPC. It checks the signed actor and parent itself before counting.
create function private.guard_trip_media_insert() returns trigger language plpgsql security definer set search_path='' as $$
begin
  if (select auth.uid()) is null or new.user_id<>(select auth.uid()) or not exists(select 1 from public.trip_plans p where p.id=new.plan_id and p.user_id=(select auth.uid())) then raise exception using errcode='42501',message='Owned trip required';end if;
  if not exists(select 1 from public.trip_workspaces w,jsonb_array_elements(w.data->'entries') e where w.plan_id=new.plan_id and e->>'id'=new.entry_id::text and e->'deleted'='false'::jsonb) then raise exception using errcode='23514',message='Saved active journal entry required';end if;
  perform pg_advisory_xact_lock(76111229);
  if (select count(*) from public.trip_media)>=250 or (select count(*) from public.trip_media where user_id=new.user_id)>=20 then raise exception using errcode='PT409',message='Private media capacity reached';end if;
  if new.state<>'pending' or new.revision<>1 then raise exception using errcode='23514',message='Start pending';end if;
  return new;
end;
$$;
revoke all on function private.guard_trip_media_insert() from public,anon,authenticated;
create trigger guard_trip_media_insert before insert on public.trip_media for each row execute function private.guard_trip_media_insert();
create function private.guard_trip_media_change() returns trigger language plpgsql security invoker set search_path='' as $$
begin
  if tg_op='DELETE' then
    if old.state<>'deleting' or exists(select 1 from storage.objects o where o.bucket_id='trip-journal-private' and o.name=old.object_path) then raise exception using errcode='23514',message='Remove stored bytes first';end if;return old;
  end if;
  if new.revision<>old.revision+1 or (old.state='deleting' and new.state<>'deleting') or (old.state='ready' and new.state='pending') then raise exception using errcode='23514',message='Invalid media revision or state';end if;
  if new.state='ready' and old.state='pending' and not exists(select 1 from storage.objects o where o.bucket_id='trip-journal-private' and o.name=new.object_path and (o.metadata->>'size')::bigint=new.byte_size) then raise exception using errcode='23514',message='Stored bytes not confirmed';end if;
  return new;
end;
$$;
revoke all on function private.guard_trip_media_change() from public,anon,authenticated;
create trigger guard_trip_media_change before update or delete on public.trip_media for each row execute function private.guard_trip_media_change();
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('trip-journal-private','trip-journal-private',false,3145728,array['image/jpeg','image/png','image/webp','audio/mpeg','audio/mp4','audio/wav','audio/ogg','audio/webm']);
create policy journal_storage_read_own on storage.objects for select to authenticated using(bucket_id='trip-journal-private' and (storage.foldername(name))[1]=(select auth.uid())::text and exists(select 1 from public.trip_media m where m.object_path=name and m.user_id=(select auth.uid())));
create policy journal_storage_insert_own on storage.objects for insert to authenticated with check(bucket_id='trip-journal-private' and (storage.foldername(name))[1]=(select auth.uid())::text and exists(select 1 from public.trip_media m where m.object_path=name and m.user_id=(select auth.uid()) and m.state='pending'));
create policy journal_storage_delete_own on storage.objects for delete to authenticated using(bucket_id='trip-journal-private' and (storage.foldername(name))[1]=(select auth.uid())::text and exists(select 1 from public.trip_media m where m.object_path=name and m.user_id=(select auth.uid()) and m.state='deleting'));
-- Recovery remains possible. Neither media nor old entries can disappear from a JSON replacement.
create or replace function private.guard_trip_workspace() returns trigger language plpgsql security invoker set search_path='' as $$
begin
  if tg_op='INSERT' and new.revision<>1 then raise exception using errcode='23514',message='Start at revision one';end if;
  if tg_op='UPDATE' then
    if new.plan_id<>old.plan_id or new.revision<>old.revision+1 then raise exception using errcode='23514',message='Workspace revision must advance once';end if;
    if exists(select 1 from jsonb_array_elements(old.data->'entries') e where not exists(select 1 from jsonb_array_elements(new.data->'entries') n where n->>'id'=e->>'id')) or exists(select 1 from jsonb_array_elements(old.data->'tasks') e where not exists(select 1 from jsonb_array_elements(new.data->'tasks') n where n->>'id'=e->>'id')) then raise exception using errcode='23514',message='Move existing items to removed items instead';end if;
  end if;
  return new;
end;
$$;
revoke all on function private.guard_trip_workspace() from public,anon,authenticated;
commit;
