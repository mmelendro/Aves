-- Live test reproduction. Requires explicit owner authorisation. Synthetic fixtures only; always rolls back. No schema/provider or customer-data changes.
begin;
set local lock_timeout='2s';
set local statement_timeout='15s';
do $qa$
declare
  actor uuid:=gen_random_uuid(); outsider uuid:=gen_random_uuid(); unconfirmed uuid:=gen_random_uuid();
  nz_plan uuid; fixture_plan uuid; country text; details jsonb; budget_currency text; receipt jsonb;
  actor_email text:='aves-c3-'||gen_random_uuid()::text||'@example.test';
  outsider_email text:='aves-c3-'||gen_random_uuid()::text||'@example.test';
  unconfirmed_email text:='aves-c3-'||gen_random_uuid()::text||'@example.test';
  base_role text:=current_user; affected bigint; checks integer:=0; stamp timestamptz; quote_id uuid;
begin
  insert into auth.users(id,email,email_confirmed_at,is_anonymous,aud,role,created_at,updated_at)
  values(actor,actor_email,now(),false,'authenticated','authenticated',now(),now()),
        (outsider,outsider_email,now(),false,'authenticated','authenticated',now(),now()),
        (unconfirmed,unconfirmed_email,null,false,'authenticated','authenticated',now(),now());
  foreach country in array array['australia','colombia','new-zealand'] loop
    fixture_plan:=gen_random_uuid();
    details:=jsonb_build_object('country',country,'regions',jsonb_build_array(case country when 'australia' then 'tasmania' when 'colombia' then 'central-andes' else 'south-island' end),'travelWhen','Flexible','partySize','2','message','Synthetic C3 transaction; never a guest record');
    if country='new-zealand' then
      nz_plan:=fixture_plan;
      details:=details||jsonb_build_object('questionnaire',jsonb_build_object('version',1,'pace','relaxed','birding','alternate','comfort','comfortable','interests',jsonb_build_array('birds'),'birdIds',jsonb_build_array('nz-de1ba81fa03b'),'budget',jsonb_build_object('currency','NZD','accommodation',0,'food',450,'activities',10000)));
    end if;
    perform set_config('request.jwt.claim.sub',actor::text,true);
    execute 'set local role authenticated';
    insert into public.trip_plans(id,user_id,title,details,create_payload_hash) values(fixture_plan,actor,'AVES C3 synthetic '||country,details,repeat('a',64));
    if (select count(*) from public.trip_plans where id=fixture_plan)<>1 then raise exception 'Own plan not visible'; end if;
    execute format('set local role %I',base_role);
  end loop;
  checks:=checks+1;
  foreach budget_currency in array array['NZD','AUD','USD','CAD','EUR','GBP'] loop
    details:=jsonb_set(details,'{questionnaire,budget,currency}',to_jsonb(budget_currency));
    if not public.trip_details_valid(details) then raise exception 'Valid budget rejected'; end if;
  end loop;
  if public.trip_details_valid(jsonb_set(details,'{questionnaire,budget,food}','-1'::jsonb)) or public.trip_details_valid(jsonb_set(details,'{questionnaire,budget,food}','0.5'::jsonb)) or public.trip_details_valid(jsonb_set(details,'{questionnaire,budget,food}','10001'::jsonb)) then raise exception 'Invalid budget accepted'; end if;
  checks:=checks+1;
  perform set_config('request.jwt.claim.sub',actor::text,true);
  execute 'set local role authenticated';
  update public.trip_plans set title='AVES C3 synthetic revised' where id=nz_plan;
  get diagnostics affected=row_count;
  if affected<>1 then raise exception 'Own draft edit rejected'; end if;
  execute format('set local role %I',base_role);
  checks:=checks+1;
  perform set_config('request.jwt.claim.sub',outsider::text,true);
  execute 'set local role authenticated';
  if (select count(*) from public.trip_plans where id=nz_plan)<>0 then raise exception 'Cross-account plan visible'; end if;
  update public.trip_plans set title='Must not change' where id=nz_plan;
  get diagnostics affected=row_count;
  if affected<>0 then raise exception 'Cross-account edit accepted'; end if;
  begin
    insert into public.trip_plans(id,user_id,title,details,create_payload_hash) values(gen_random_uuid(),actor,'Must not insert',details,repeat('b',64));
    raise exception 'Forged ownership accepted';
  exception when insufficient_privilege then null;
  end;
  execute format('set local role %I',base_role);
  checks:=checks+1;
  if (public.account_email_updates(actor,null)->>'subscribed')::boolean then raise exception 'Unrequested consent'; end if;
  if exists(select 1 from private.launch_subscribers where email_normalized=actor_email) then raise exception 'Consent read wrote a subscriber'; end if;
  checks:=checks+1;
  perform public.account_email_updates(actor,true);
  perform public.account_email_updates(actor,true);
  if (select count(*) from private.consent_events e join private.launch_subscribers s on s.id=e.launch_subscriber_id where s.email_normalized=actor_email)<>1 then raise exception 'Duplicate consent evidence'; end if;
  if not (public.account_email_updates(actor,null)->>'subscribed')::boolean then raise exception 'Consent not retained'; end if;
  checks:=checks+1;
  perform public.account_email_updates(actor,false);
  perform public.account_email_updates(actor,false);
  if (public.account_email_updates(actor,null)->>'subscribed')::boolean or (public.account_email_updates(outsider,null)->>'subscribed')::boolean then raise exception 'Unsubscribe/isolation failed'; end if;
  if (select count(*) from private.consent_events e join private.launch_subscribers s on s.id=e.launch_subscriber_id where s.email_normalized=actor_email)<>2 then raise exception 'Unsubscribe evidence mismatch'; end if;
  checks:=checks+1;
  begin
    perform public.account_email_updates(unconfirmed,true);
    raise exception 'Unconfirmed consent accepted';
  exception when sqlstate 'PT403' then null;
  end;
  checks:=checks+1;
  if has_function_privilege('authenticated','public.account_email_updates(uuid,boolean)','execute') or has_function_privilege('anon','public.account_email_updates(uuid,boolean)','execute') or has_function_privilege('authenticated','public.admin_ai_draft(uuid,uuid,text,text,timestamptz,uuid)','execute') then raise exception 'Privileged function publicly callable'; end if;
  checks:=checks+1;
  select updated_at into stamp from public.trip_plans where id=nz_plan;
  receipt:=public.submit_quote_request(actor,nz_plan,gen_random_uuid(),repeat('c',64),stamp,'AVES synthetic C3',actor_email);
  select id into quote_id from public.quote_requests where plan_id=nz_plan and client_user_id=actor;
  if quote_id is null then raise exception 'Synthetic quote absent'; end if;
  if (select plan_snapshot->'details'->'questionnaire'->'budget'->>'accommodation' from public.quote_requests where id=quote_id) is distinct from '0' then raise exception 'Frozen budget lost'; end if;
  perform set_config('request.jwt.claim.sub',actor::text,true);
  execute 'set local role authenticated';
  update public.trip_plans set title='Must not edit frozen brief' where id=nz_plan;
  get diagnostics affected=row_count;
  if affected<>0 then raise exception 'Frozen brief editable'; end if;
  execute format('set local role %I',base_role);
  checks:=checks+1;
  perform set_config('aves.qa.checks',checks::text,true);
end
$qa$;
select jsonb_build_object('passed',true,'checkGroups',current_setting('aves.qa.checks')::integer,'scope','live database transaction using synthetic fixtures only','cleanup','ROLLBACK follows; no fixture is committed','authOrEmailDeliveryVerified',false,'customerRecordsReadOrChanged',false) as result;
rollback;
