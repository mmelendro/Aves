// Isolated canaries for default-ACL accumulation and managed-role preservation.
// Usage: node <this-file> <installed-@electric-sql/pglite-directory>
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import { pathToFileURL } from "node:url"

if (!process.argv[2]) throw new Error("Provide the installed PGlite package directory; no hosted credentials are used.")
const { PGlite } = await import(pathToFileURL(resolve(process.argv[2], "dist/index.js")).href)
const db = await PGlite.create()
try {
  await db.exec(`
    create role anon nologin;
    create role authenticated nologin;
    create role service_role nologin bypassrls;
    create role supabase_admin nologin;
    grant usage on schema public to anon, authenticated, service_role;
    grant usage, create on schema public to supabase_admin;
    alter default privileges for role postgres grant select on tables to anon, authenticated;
    alter default privileges for role postgres grant usage on sequences to anon, authenticated;
    alter default privileges for role postgres grant execute on functions to anon, authenticated;
    alter default privileges for role postgres in schema public grant all on tables to anon, authenticated;
    alter default privileges for role postgres in schema public grant all on sequences to anon, authenticated;
    alter default privileges for role postgres in schema public grant execute on functions to anon, authenticated;
    alter default privileges for role supabase_admin in schema public grant select on tables to anon;
    alter default privileges for role supabase_admin grant execute on functions to authenticated;
    create table public.existing_explicit_grant_canary(id integer);
    grant select on public.existing_explicit_grant_canary to anon;
    create function public.existing_explicit_function_canary() returns integer language sql as $$ select 1 $$;
    grant execute on function public.existing_explicit_function_canary() to authenticated;
  `)
  const vendorDefaults = `select defaclnamespace, defaclobjtype, defaclacl::text
    from pg_default_acl where defaclrole = 'supabase_admin'::regrole order by defaclnamespace,defaclobjtype`
  const before = (await db.query(vendorDefaults)).rows
  await db.exec(await readFile(new URL("../migrations/20261106105115_colombia_replacement_security_baseline.sql", import.meta.url), "utf8"))
  assert.deepEqual((await db.query(vendorDefaults)).rows, before, "Managed creator defaults must remain unchanged")
  await db.exec(`
    set plpgsql.check_asserts = on;
    create table public.future_default_canary(id integer);
    create sequence public.future_default_sequence;
    create function public.future_default_function() returns integer language sql as $$ select 1 $$;
    do $$ declare r text; begin
      foreach r in array array['anon','authenticated'] loop
        assert not has_table_privilege(r,'public.future_default_canary','SELECT,INSERT,UPDATE,DELETE');
        assert not has_sequence_privilege(r,'public.future_default_sequence','USAGE,SELECT,UPDATE');
        assert not has_function_privilege(r,'public.future_default_function()','EXECUTE');
      end loop;
      assert has_table_privilege('anon','public.existing_explicit_grant_canary','SELECT');
      assert has_function_privilege('authenticated','public.existing_explicit_function_canary()','EXECUTE');
    end; $$;
    set role supabase_admin;
    create table public.vendor_future_canary(id integer);
    reset role;
    do $$ begin
      assert has_table_privilege('anon','public.vendor_future_canary','SELECT'), 'Vendor defaults remain independent';
    end; $$;
  `)
  console.log("PASS: global and schema browser defaults removed; existing explicit grants and supabase_admin defaults unchanged")
} finally {
  await db.close()
}
