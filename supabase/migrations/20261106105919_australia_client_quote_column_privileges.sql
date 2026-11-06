-- DEPLOYMENT ORDER: first deploy lib/account-handlers.ts with an explicit client
-- proposal select; verify the live account/proposals endpoint; only then apply
-- this migration. The older select('*') endpoint will fail after these revokes.
-- Do not batch-push both new migrations before that application deployment.
begin;

revoke select on public.quote_requests, public.quote_status_events, public.quote_proposals from authenticated;

-- Client-visible request content and lifecycle only. Internal hashes, request
-- keys, owner UUIDs, provider IDs, and notification diagnostics remain private.
grant select(id, client_user_id, plan_id, plan_snapshot, contact_name, contact_email,
  status, submitted_at, updated_at, notification_status)
  on public.quote_requests to authenticated;
grant select(id, quote_request_id, client_user_id, previous_status, status, occurred_at)
  on public.quote_status_events to authenticated;
grant select(id, quote_request_id, client_user_id, version, status, total_cents, currency,
  itinerary, inclusions, exclusions, valid_until, issued_at, updated_at, notification_status)
  on public.quote_proposals to authenticated;

-- Existing ownership/sent-only RLS and service-role privileges are unchanged.
commit;
