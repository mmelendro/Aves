-- Every synthetic identity, trip, reservation and quota test rolls back.
begin;
set local plpgsql.check_asserts=on;
create function pg_temp.m(k text) returns uuid language sql stable as $$ select current_setting('media_test.'||k)::uuid $$;
grant execute on function pg_temp.m(text) to authenticated,anon;
do $$ declare k text;begin
 foreach k in array array['a','b','plan','entry','media'] loop perform set_config('media_test.'||k,gen_random_uuid()::text,true);end loop;
 insert into auth.users(id,email,email_confirmed_at) values(pg_temp.m('a'),'media-a-'||pg_temp.m('a')||'@example.test',now()),(pg_temp.m('b'),'media-b-'||pg_temp.m('b')||'@example.test',now());
end $$;
set local role authenticated;
select set_config('request.jwt.claim.sub',pg_temp.m('a')::text,true);
insert into public.trip_plans(id,user_id,title,details,create_payload_hash) values(pg_temp.m('plan'),pg_temp.m('a'),'Synthetic media trip','{"regions":[],"travelWhen":"Flexible","partySize":"1","message":"Synthetic test"}',repeat('a',64));
insert into public.trip_workspaces(plan_id,data) values(pg_temp.m('plan'),jsonb_build_object('version',1,'tasks','[]'::jsonb,'entries',jsonb_build_array(jsonb_build_object('id',pg_temp.m('entry'),'title','Synthetic note','body','','date','','day',null,'placeId','','deleted',false))));
insert into public.trip_media(id,plan_id,user_id,entry_id,object_path,kind,mime,byte_size,content_hash) values(pg_temp.m('media'),pg_temp.m('plan'),pg_temp.m('a'),pg_temp.m('entry'),pg_temp.m('a')||'/'||pg_temp.m('plan')||'/'||pg_temp.m('media')||'.wav','audio','audio/wav',44,repeat('a',64));
do $$ declare affected integer;n integer;x uuid;begin
 assert (select count(*)=1 from public.trip_media),'Owner sees reservation';
 assert not has_function_privilege('authenticated',(select p.oid from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='private' and p.proname='guard_trip_media_insert'),'EXECUTE'),'Quota definer is not callable';
 begin update public.trip_media set state='ready',revision=2 where id=pg_temp.m('media');raise exception 'Ready without bytes allowed';exception when check_violation then null;end;
 assert exists(select 1 from pg_constraint where conrelid='public.trip_media'::regclass and confrelid='public.trip_plans'::regclass and confdeltype='r'),'Stored records restrict parent removal';
 begin update public.trip_workspaces set revision=2,data='{"version":1,"tasks":[],"entries":[]}' where plan_id=pg_temp.m('plan');raise exception 'Journal recovery lost';exception when check_violation then null;end;
 update public.trip_media set state='deleting',revision=2 where id=pg_temp.m('media');
 assert exists(select 1 from pg_policies where tablename='trip_media' and policyname='media_delete_own' and qual like '%deleting%'),'Removal requires reserved state';
 for n in 1..19 loop x=gen_random_uuid();insert into public.trip_media(id,plan_id,user_id,entry_id,object_path,kind,mime,byte_size,content_hash) values(x,pg_temp.m('plan'),pg_temp.m('a'),pg_temp.m('entry'),pg_temp.m('a')||'/'||pg_temp.m('plan')||'/'||x||'.wav','audio','audio/wav',44,repeat('a',64));end loop;
 begin x=gen_random_uuid();insert into public.trip_media(id,plan_id,user_id,entry_id,object_path,kind,mime,byte_size,content_hash) values(x,pg_temp.m('plan'),pg_temp.m('a'),pg_temp.m('entry'),pg_temp.m('a')||'/'||pg_temp.m('plan')||'/'||x||'.wav','audio','audio/wav',44,repeat('a',64));raise exception 'Quota failed';exception when sqlstate 'PT409' then null;end;
 assert (select count(*)=20 from public.trip_media),'Quota is enforced atomically';
end $$;
select set_config('request.jwt.claim.sub',pg_temp.m('b')::text,true);
do $$ declare affected integer;begin
 assert not exists(select 1 from public.trip_media),'Other account sees no metadata';
 assert not exists(select 1 from storage.objects where bucket_id='trip-journal-private'),'No foreign file listing';
 update public.trip_media set revision=2;get diagnostics affected=row_count;assert affected=0,'Foreign edit blocked';
 assert exists(select 1 from pg_policies where tablename='trip_media' and policyname='media_delete_own' and qual like '%auth.uid%'),'Removal is owner scoped';
end $$;
set local role anon;
do $$ begin begin perform * from public.trip_media;raise exception 'Anonymous metadata exposed';exception when insufficient_privilege then null;end;end $$;
reset role;
do $$ begin assert (select not public and file_size_limit=3145728 from storage.buckets where id='trip-journal-private'),'Bucket private and bounded';end $$;
rollback;
