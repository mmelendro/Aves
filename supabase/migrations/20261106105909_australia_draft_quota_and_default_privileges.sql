-- LOCAL REVIEW ONLY: apply separately from the later column-privilege migration.
-- Deploy the API's clear quota-conflict message first. No existing rows are removed:
-- accounts already above the limit may edit/delete/submit their existing drafts.
begin;

create index trip_plans_draft_owner_idx on public.trip_plans(user_id) where status = 'draft';

create function private.enforce_trip_draft_quota()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  if new.status <> 'draft' then return new; end if;

  -- PostgREST uses READ COMMITTED. A repeatable snapshot could miss a concurrent
  -- committed insert after waiting for the lock, so unsupported isolation fails
  -- closed rather than silently allowing the quota to be exceeded.
  if current_setting('transaction_isolation') <> 'read committed' then
    raise exception using errcode = '25001', message = 'Draft creation requires READ COMMITTED isolation.';
  end if;

  -- Serialize inserts for one account, including inserts made directly through REST.
  -- The volatile function's count runs after the lock, with a fresh query snapshot.
  perform pg_advisory_xact_lock(hashtextextended('aves-draft-quota:' || new.user_id::text, 0));

  -- Preserve the existing API's primary-key conflict/replay path even at capacity.
  -- Ownership is still independently enforced by RLS and the immutable-ID trigger.
  if exists(select 1 from public.trip_plans where id = new.id and user_id = new.user_id) then
    return new;
  end if;
  if (select count(*) from public.trip_plans where user_id = new.user_id and status = 'draft') >= 50 then
    raise exception using errcode = 'PT409', message = 'Draft plan limit reached.';
  end if;
  return new;
end;
$$;

revoke all on function private.enforce_trip_draft_quota() from public, anon, authenticated, service_role;
create trigger trip_plan_draft_quota before insert on public.trip_plans
  for each row execute function private.enforce_trip_draft_quota();

-- These defaults affect future objects created by the migration owner (postgres).
-- They do not revoke any existing table, sequence, or function privileges.
-- Other creator roles need the same explicit review if introduced later.
alter default privileges for role postgres in schema public revoke all on tables from public, anon, authenticated;
alter default privileges for role postgres in schema public revoke all on sequences from public, anon, authenticated;
alter default privileges for role postgres in schema public revoke all on functions from public, anon, authenticated;

-- PostgreSQL's implicit PUBLIC EXECUTE is global and cannot be removed by a
-- schema-level revoke. Future postgres-created functions in any schema therefore
-- require explicit EXECUTE grants. Existing functions are unaffected.
alter default privileges for role postgres revoke execute on functions from public;

commit;
