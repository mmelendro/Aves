-- Disposable generated users and favourites. Every write is rolled back.
begin;
create temporary table aves_favourite_test(user_a uuid,user_b uuid) on commit drop;
insert into aves_favourite_test values(gen_random_uuid(),gen_random_uuid());
grant select on aves_favourite_test to authenticated;
insert into auth.users(id,aud,role,email)
 select user_a,'authenticated','authenticated','aves-fav-'||user_a::text||'@example.invalid' from aves_favourite_test
 union all select user_b,'authenticated','authenticated','aves-fav-'||user_b::text||'@example.invalid' from aves_favourite_test;
select set_config('request.jwt.claims',json_build_object('sub',user_a::text,'role','authenticated')::text,true) from aves_favourite_test;
set local role authenticated;
insert into public.account_place_favourites(user_id,place_id) select user_a,'place:new-zealand:trip-arthurs-pass-information' from aves_favourite_test;
do $$begin
 if (select count(*) from public.account_place_favourites)<>1 then raise exception 'Owner favourite read failed';end if;
end$$;
reset role;
select set_config('request.jwt.claims',json_build_object('sub',user_b::text,'role','authenticated')::text,true) from aves_favourite_test;
set local role authenticated;
do $$begin
 if exists(select 1 from public.account_place_favourites) then raise exception 'Other owner favourite leaked';end if;
 begin
  insert into public.account_place_favourites(user_id,place_id) select user_a,'place:new-zealand:trip-ni-waikato-museum' from aves_favourite_test;
  raise exception 'Foreign owner insert was accepted';
 exception when insufficient_privilege then null;end;
 if has_table_privilege('authenticated','public.account_place_favourites','UPDATE') then raise exception 'Unexpected owner reassignment privilege';end if;
 delete from public.account_place_favourites where user_id=(select user_a from aves_favourite_test);
 insert into public.account_place_favourites(user_id,place_id) select user_b,'place:new-zealand:trip-ni-waikato-museum' from aves_favourite_test;
 delete from public.account_place_favourites where user_id=(select user_b from aves_favourite_test);
 if exists(select 1 from public.account_place_favourites) then raise exception 'Owner removal failed';end if;
end$$;
reset role;
do $$begin
 if not exists(select 1 from public.account_place_favourites where user_id=(select user_a from aves_favourite_test)) then raise exception 'Foreign deletion modified another owner';end if;
 if has_table_privilege('anon','public.account_place_favourites','SELECT') or has_table_privilege('anon','public.account_place_favourites','INSERT') or has_table_privilege('anon','public.account_place_favourites','DELETE') then raise exception 'Unexpected anonymous privileges';end if;
end$$;
rollback;
