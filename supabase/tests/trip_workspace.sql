-- Synthetic users/rows only. Every fixture and mutation rolls back.
begin;
set local plpgsql.check_asserts=on;
create function pg_temp.w(k text) returns uuid language sql stable as $$ select current_setting('workspace_test.'||k)::uuid $$;
grant execute on function pg_temp.w(text) to authenticated,anon;
do $$ declare k text; begin
  foreach k in array array['a','b','plan'] loop perform set_config('workspace_test.'||k,gen_random_uuid()::text,true);end loop;
  insert into auth.users(id,email,email_confirmed_at) values(pg_temp.w('a'),'workspace-a-'||pg_temp.w('a')||'@example.test',now()),(pg_temp.w('b'),'workspace-b-'||pg_temp.w('b')||'@example.test',now());
end $$;
set local role authenticated;
select set_config('request.jwt.claim.sub',pg_temp.w('a')::text,true);
insert into public.trip_plans(id,user_id,title,details,create_payload_hash) values(pg_temp.w('plan'),pg_temp.w('a'),'Synthetic workspace trip','{"regions":[],"travelWhen":"Flexible","partySize":"1","message":"Synthetic test"}',repeat('a',64));
insert into public.trip_workspaces(plan_id,data) values(pg_temp.w('plan'),'{"version":1,"tasks":[],"entries":[]}');
do $$ declare affected integer; begin
  assert (select count(*)=1 from public.trip_workspaces),'Owner can read';
  update public.trip_workspaces set revision=2,data=jsonb_build_object('version',1,'tasks','[]'::jsonb,'entries',jsonb_build_array(jsonb_build_object('id',gen_random_uuid(),'title','Recoverable memory','body','Private note','date','2026-12-01','day',1,'placeId','','deleted',true))) where plan_id=pg_temp.w('plan') and revision=1;
  assert (select revision=2 from public.trip_workspaces),'Owner saves revision';
  update public.trip_workspaces set revision=3 where plan_id=pg_temp.w('plan') and revision=1;get diagnostics affected=row_count;assert affected=0,'Stale revision changes no row';
  update public.trip_workspaces set revision=3,data=jsonb_set(data,'{entries,0,deleted}','false') where plan_id=pg_temp.w('plan') and revision=2;
  assert (select data#>>'{entries,0,body}'='Private note' and data#>>'{entries,0,deleted}'='false' from public.trip_workspaces),'Restore preserves notes';
  begin update public.trip_workspaces set revision=3 where plan_id=pg_temp.w('plan');raise exception 'Revision guard failed';exception when check_violation then null;end;
  begin update public.trip_workspaces set revision=4,data='{"version":1,"tasks":[],"entries":[{}]}' where plan_id=pg_temp.w('plan');raise exception 'Shape guard failed';exception when check_violation then null;end;
  begin update public.trip_workspaces set plan_id=gen_random_uuid();raise exception 'Identity ACL failed';exception when insufficient_privilege then null;end;
end $$;
select set_config('request.jwt.claim.sub',pg_temp.w('b')::text,true);
do $$ declare affected integer;begin
  assert not exists(select 1 from public.trip_workspaces),'Other account cannot read';
  update public.trip_workspaces set revision=4 where plan_id=pg_temp.w('plan');get diagnostics affected=row_count;assert affected=0,'Other account cannot edit';
  begin insert into public.trip_workspaces(plan_id,data) values(pg_temp.w('plan'),'{"version":1,"tasks":[],"entries":[]}');raise exception 'Ownership failed';exception when insufficient_privilege then null;end;
end $$;
set local role anon;
do $$ begin
  begin perform * from public.trip_workspaces;raise exception 'Anon read allowed';exception when insufficient_privilege then null;end;
end $$;
reset role;
rollback;
