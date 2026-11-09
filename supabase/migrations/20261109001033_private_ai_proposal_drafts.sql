-- Unpriced owner notes never become client-visible proposals.
begin;
create table private.quote_ai_drafts (
 quote_request_id uuid primary key references public.quote_requests(id) on delete cascade,
 body text not null default '' check(char_length(body)<=16000),
 model text not null default 'openai/gpt-5.4-mini', generated_at timestamptz,
 updated_at timestamptz not null default clock_timestamp(),
 generation_id uuid, started_at timestamptz,
 attempts integer not null default 0 check(attempts between 0 and 3)
);
alter table private.quote_ai_drafts enable row level security;
revoke all on private.quote_ai_drafts from public,anon,authenticated;
grant select,insert,update on private.quote_ai_drafts to service_role;

-- Service-only invoker: the verified server supplies the actor; DB rechecks owner.
create function public.admin_ai_draft(p_admin_user_id uuid,p_request_id uuid,p_action text default 'get',p_body text default null,p_expected_updated_at timestamptz default null,p_generation_id uuid default null)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare q public.quote_requests; d private.quote_ai_drafts; token uuid;
begin
 perform private.require_site_admin(p_admin_user_id);
 if p_action is null or p_action not in ('get','begin','complete','save','fail') then raise exception 'Invalid action'; end if;
 -- One quote-row lock serializes starts/edits across tabs and server instances.
 select * into q from public.quote_requests where id=p_request_id for update;
 if not found or q.plan_snapshot->'details'->>'country' is distinct from 'new-zealand' then raise exception using errcode='PT404',message='Request unavailable'; end if;
 select * into d from private.quote_ai_drafts where quote_request_id=p_request_id;
 if p_action<>'get' and q.status='closed' then raise exception using errcode='PT409',message='Reopen request first'; end if;
 if p_action='begin' then
  -- Saved results are replayed without spending again or overwriting owner edits.
  if coalesce(d.body,'')='' then
   if d.attempts>=3 or d.started_at>clock_timestamp()-interval '15 minutes' then raise exception using errcode='PT429',message='Generation limit'; end if;
   token:=gen_random_uuid();
   insert into private.quote_ai_drafts(quote_request_id,generation_id,started_at,attempts) values(p_request_id,token,clock_timestamp(),1)
   on conflict(quote_request_id) do update set generation_id=token,started_at=clock_timestamp(),attempts=private.quote_ai_drafts.attempts+1;
  end if;
 elsif p_action in ('save','complete') then
  if p_body is null or char_length(btrim(p_body)) not between 1 and 16000 then raise exception 'Invalid draft'; end if;
  if d.quote_request_id is null or
   (p_action='complete' and (p_generation_id is null or d.generation_id is distinct from p_generation_id)) or
   (p_action='save' and (p_expected_updated_at is null or d.updated_at is distinct from p_expected_updated_at or d.generation_id is not null or d.body='')) then
   raise exception using errcode='PT409',message='Draft changed';
  end if;
  update private.quote_ai_drafts set body=btrim(p_body),updated_at=clock_timestamp(),generation_id=null,
   generated_at=case when p_action='complete' then clock_timestamp() else generated_at end where quote_request_id=p_request_id;
 elsif p_action='fail' then
  update private.quote_ai_drafts set generation_id=null where quote_request_id=p_request_id and generation_id=p_generation_id;
 end if;
 select * into d from private.quote_ai_drafts where quote_request_id=p_request_id;
 return jsonb_build_object('snapshot',jsonb_build_object('details',q.plan_snapshot->'details',
  'year',case when q.plan_snapshot->>'title' ~ '^20[0-9]{2}$' then (q.plan_snapshot->>'title')::integer else null end),'generationToken',token,
  'draft',case when d.body<>'' then jsonb_build_object('text',d.body,'updatedAt',d.updated_at,'generatedAt',d.generated_at,'model',d.model) else null end);
end;
$$;
revoke all on function public.admin_ai_draft(uuid,uuid,text,text,timestamptz,uuid) from public,anon,authenticated;
grant execute on function public.admin_ai_draft(uuid,uuid,text,text,timestamptz,uuid) to service_role;
commit;
