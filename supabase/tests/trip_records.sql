-- Synthetic, rollback-only ownership and validation checks. No real traveller records.
begin;
select set_config('aves.qa_owner',gen_random_uuid()::text,true),set_config('aves.qa_other',gen_random_uuid()::text,true),set_config('aves.qa_plan',gen_random_uuid()::text,true),set_config('aves.qa_record',gen_random_uuid()::text,true);
insert into auth.users(id,email) values(current_setting('aves.qa_owner')::uuid,'aves-rollback-'||current_setting('aves.qa_owner')||'@example.test'),(current_setting('aves.qa_other')::uuid,'aves-rollback-'||current_setting('aves.qa_other')||'@example.test');
insert into public.trip_plans(id,user_id,title,details,status,create_payload_hash) values(current_setting('aves.qa_plan')::uuid,current_setting('aves.qa_owner')::uuid,'Synthetic rollback-only record check','{"country":"new-zealand","regions":[],"travelWhen":"","partySize":"","message":"Synthetic rollback-only test. No booking."}'::jsonb,'draft',repeat('a',64));
select set_config('request.jwt.claims',jsonb_build_object('sub',current_setting('aves.qa_owner'),'role','authenticated','is_anonymous',false)::text,true);
set local role authenticated;
insert into public.trip_records(plan_id,revision,data) values(current_setting('aves.qa_plan')::uuid,1,jsonb_build_object('version',1,'records',jsonb_build_array(jsonb_build_object('id',current_setting('aves.qa_record'),'kind','expense','title','Synthetic receipt','category','Transport','date','2026-11-12','notes','','url','','entryId','','deleted',false,'amountMinor',1234,'currency','NZD','status','paid'))));
do $$ begin
 if (select count(*) from public.trip_records where plan_id=current_setting('aves.qa_plan')::uuid)<>1 then raise exception 'Owner read failed';end if;
 begin
  update public.trip_records set revision=1 where plan_id=current_setting('aves.qa_plan')::uuid;
  raise exception 'Stale revision accepted';
 exception when check_violation then null;end;
 begin
  update public.trip_records set revision=2,data=jsonb_set(data,'{records,0,amountMinor}','-1'::jsonb) where plan_id=current_setting('aves.qa_plan')::uuid;
  raise exception 'Negative expense accepted';
 exception when check_violation then null;end;
 begin
  update public.trip_records set revision=2,data=jsonb_set(data,'{records,0,entryId}',to_jsonb(gen_random_uuid()::text)) where plan_id=current_setting('aves.qa_plan')::uuid;
  raise exception 'Unrelated journal accepted';
 exception when check_violation then null;end;
 begin
  update public.trip_records set revision=2,data='{"version":1,"records":[]}'::jsonb where plan_id=current_setting('aves.qa_plan')::uuid;
  raise exception 'Existing identity removal accepted';
 exception when check_violation then null;end;
end $$;
update public.trip_records set revision=2,data=jsonb_set(data,'{records,0,deleted}','true'::jsonb) where plan_id=current_setting('aves.qa_plan')::uuid;
update public.trip_records set revision=3,data=jsonb_set(data,'{records,0,deleted}','false'::jsonb) where plan_id=current_setting('aves.qa_plan')::uuid;
select set_config('request.jwt.claims',jsonb_build_object('sub',current_setting('aves.qa_other'),'role','authenticated','is_anonymous',false)::text,true);
do $$ declare affected integer; begin
 if exists(select 1 from public.trip_records where plan_id=current_setting('aves.qa_plan')::uuid) then raise exception 'Foreign read succeeded';end if;
 update public.trip_records set revision=4 where plan_id=current_setting('aves.qa_plan')::uuid;get diagnostics affected=row_count;if affected<>0 then raise exception 'Foreign write succeeded';end if;
 begin
  insert into public.trip_records(plan_id,revision,data) values(current_setting('aves.qa_plan')::uuid,1,'{"version":1,"records":[]}'::jsonb);
  raise exception 'Foreign insert succeeded';
 exception when insufficient_privilege then null;end;
end $$;
reset role;
do $$ begin
 if has_table_privilege('anon','public.trip_records','select') then raise exception 'Anonymous table grant';end if;
 if not (select relrowsecurity from pg_class where oid='public.trip_records'::regclass) then raise exception 'RLS missing';end if;
 if has_function_privilege('authenticated','private.guard_trip_records()','execute') then raise exception 'Trigger callable';end if;
 if public.trip_records_data_valid('{"version":1,"records":[{"id":"notuuid"}]}'::jsonb) then raise exception 'Invalid document accepted';end if;
end $$;
select 'Owner read/write, stale revisions, amounts, journal ownership, recovery, foreign access and RLS checks passed; transaction will roll back' as qa_result;

rollback;
