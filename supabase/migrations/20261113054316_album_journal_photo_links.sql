begin;
set local lock_timeout='3s';
create or replace function public.trip_bird_album_valid(p jsonb) returns boolean
language plpgsql immutable security invoker set search_path='' as $$
declare b jsonb; k text;
begin
 if jsonb_typeof(p) is distinct from 'object' or octet_length(p::text)>32768
 or (select count(*) from jsonb_object_keys(p))<>2 or p->'version' is distinct from '1'::jsonb
 or jsonb_typeof(p->'birds') is distinct from 'array' or jsonb_array_length(p->'birds')>100 then return false; end if;
 if (select count(distinct x->>'id') from jsonb_array_elements(p->'birds') x)<>jsonb_array_length(p->'birds') then return false; end if;
 for b in select value from jsonb_array_elements(p->'birds') loop
  if jsonb_typeof(b) is distinct from 'object' or (select count(*) from jsonb_object_keys(b)) not between 7 and 10
   or b-array['id','speciesId','state','date','regionId','notes','deleted','journalEntryId','photoId','photoCredit']<>'{}'::jsonb
   or not b ?& array['id','speciesId','state','date','regionId','notes','deleted'] then return false; end if;
  perform (b->>'id')::uuid;
  foreach k in array array['id','speciesId','state','date','regionId','notes'] loop
   if jsonb_typeof(b->k) is distinct from 'string' then return false; end if;
  end loop;
  if b->>'speciesId' !~ '^[a-z0-9-]{1,64}$' or char_length(b->>'regionId')>160 or char_length(b->>'notes')>800
   or b->>'state' not in ('desired','observed') or jsonb_typeof(b->'deleted') is distinct from 'boolean' then return false; end if;
  if b->>'date'<>'' and ((b->>'date')::date::text is distinct from b->>'date') then return false; end if;
  foreach k in array array['journalEntryId','photoId'] loop
   if b?k then
    if jsonb_typeof(b->k) is distinct from 'string' then return false; end if;
    perform (b->>k)::uuid;
   end if;
  end loop;
  if b?'photoId' and not b?'journalEntryId' then return false; end if;
  if b?'photoCredit' and (not b?'photoId' or jsonb_typeof(b->'photoCredit') is distinct from 'string' or char_length(b->>'photoCredit')>160) then return false; end if;
  if b->>'state'='desired' and b->>'date'<>'' then return false; end if;
 end loop;
 return true;
exception when others then return false;
end;
$$;

create function private.guard_album_journal_links() returns trigger
language plpgsql security invoker set search_path='' as $$
declare b jsonb; prior jsonb;
begin
 for b in select value from jsonb_array_elements(new.data->'birds') loop
  if not (b?'journalEntryId' or b?'photoId') then continue; end if;
  prior:=null;
  if tg_op='UPDATE' then select value into prior from jsonb_array_elements(old.data->'birds') where value->>'id'=b->>'id'; end if;
  if prior is not null and prior->'journalEntryId' is not distinct from b->'journalEntryId'
   and prior->'photoId' is not distinct from b->'photoId' and prior->'photoCredit' is not distinct from b->'photoCredit' then continue; end if;
  if not exists(select 1 from public.trip_workspaces w cross join lateral jsonb_array_elements(w.data->'entries') e
   where w.plan_id=new.plan_id and e->>'id'=b->>'journalEntryId' and e->'deleted'='false'::jsonb) then
   raise exception using errcode='23514',message='Choose an active journal entry from this trip';
  end if;
  if b?'photoId' and not exists(select 1 from public.trip_media m
   where m.id=(b->>'photoId')::uuid and m.plan_id=new.plan_id and m.user_id=(select auth.uid())
    and m.entry_id=(b->>'journalEntryId')::uuid and m.kind='photo' and m.state='ready'
    and m.creator=coalesce(b->>'photoCredit','')) then
   raise exception using errcode='23514',message='Choose a ready photo and its attribution from this trip';
  end if;
 end loop;
 return new;
end;
$$;
revoke all on function private.guard_album_journal_links() from public,anon,authenticated;
create trigger guard_album_links before insert or update on public.trip_bird_albums for each row execute function private.guard_album_journal_links();
commit;
