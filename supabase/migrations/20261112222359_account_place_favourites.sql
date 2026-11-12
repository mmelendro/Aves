begin;
create table public.account_place_favourites(
 user_id uuid not null references auth.users(id) on delete cascade,
 place_id text not null check(char_length(place_id) between 8 and 160 and place_id ~ '^place:[a-z0-9:-]+$'),
 created_at timestamptz not null default now(),
 primary key(user_id,place_id)
);
alter table public.account_place_favourites enable row level security;
revoke all on public.account_place_favourites from public,anon,authenticated;
grant select,delete on public.account_place_favourites to authenticated;
grant insert(user_id,place_id) on public.account_place_favourites to authenticated;
create policy favourites_read_own on public.account_place_favourites for select to authenticated using((select auth.uid())=user_id);
create policy favourites_insert_own on public.account_place_favourites for insert to authenticated with check((select auth.uid())=user_id);
create policy favourites_delete_own on public.account_place_favourites for delete to authenticated using((select auth.uid())=user_id);
create function private.guard_place_favourites() returns trigger language plpgsql security invoker set search_path='' as $$
begin
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(new.user_id::text,0));
 if exists(select 1 from public.account_place_favourites where user_id=new.user_id and place_id=new.place_id) then return new;end if;
 if (select count(*) from public.account_place_favourites where user_id=new.user_id)>=200 then raise exception using errcode='23514',message='Favourite place limit reached';end if;
 return new;
end;$$;
revoke all on function private.guard_place_favourites() from public,anon,authenticated;
create trigger guard_place_favourites before insert on public.account_place_favourites for each row execute function private.guard_place_favourites();
commit;
