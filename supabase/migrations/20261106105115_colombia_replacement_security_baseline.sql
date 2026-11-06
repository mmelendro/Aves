-- Replacement AVES Colombia project: gfxirgzvbpytgfffolhj (us-east-1).
-- Apply only to the verified replacement project, before any reviewed data import.
-- This baseline deliberately creates no application tables or account model.
begin;

create schema private authorization postgres;
revoke all on schema private from public, anon, authenticated;
grant usage on schema private to service_role;

-- API roles may use public only through future explicit object grants.
-- They must never be able to create objects in an exposed schema.
revoke create on schema public from public, anon, authenticated;

-- Defaults belong to their creator role. Change postgres (application migrations)
-- only: do not change supabase_admin or managed Auth/Storage role defaults.
-- Global grants accumulate with schema-specific grants. Remove both to make
-- future objects private even if a global default grant existed before this file.
-- These statements do not change any existing object grants or customer rows.
alter default privileges for role postgres revoke all on tables from public, anon, authenticated;
alter default privileges for role postgres revoke all on sequences from public, anon, authenticated;
alter default privileges for role postgres revoke all on functions from public, anon, authenticated;

alter default privileges for role postgres in schema public revoke all on tables from public, anon, authenticated;
alter default privileges for role postgres in schema public revoke all on sequences from public, anon, authenticated;
alter default privileges for role postgres in schema public revoke all on functions from public, anon, authenticated;
alter default privileges for role postgres in schema private revoke all on tables from public, anon, authenticated;
alter default privileges for role postgres in schema private revoke all on sequences from public, anon, authenticated;
alter default privileges for role postgres in schema private revoke all on functions from public, anon, authenticated;

-- All future migrations must explicitly choose their privileges. Exposed tables
-- need RLS plus ownership policies before grants; private tables should use RLS
-- as defense in depth. Backend routines should use SECURITY INVOKER and a fixed
-- search_path. Grant EXECUTE only to the intended role, never implicitly PUBLIC.
commit;
