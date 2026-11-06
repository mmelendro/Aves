# Colombia database replacement

**Superseded on 6 November 2026:** the owner has now said legacy data does not need to be preserved and wants a single working website with a secure linked database. Do not continue the legacy migration or contact support without renewed direction. The new project has only its security baseline; selecting the final shared/separate backend and retiring unused projects remain pending. The steps below are historical contingency guidance, not the current work order.

Prepared 6 November 2026. Target: `gfxirgzvbpytgfffolhj`, us-east-1. Source: paused `krzmqusxxrfljjkdbklx`. The source dashboard reports retained data and downloadable backups; their completeness has not yet been verified. This plan does not authorize deletion or claim migration is complete.

## 1. Preserve and inventory

The coordinating agent retrieves the original backup and storage export into restricted, untracked storage. Record file size, checksum, backup timestamp, export method, schema versions, and aggregate counts; never print credentials, password hashes, tokens, customer rows, or signed download links. Keep a verified original copy unchanged.

Inspect schema and metadata before choosing an application model: tables, columns, foreign keys, Auth users/identities, profiles, plans, requests, bookings, storage buckets/objects, functions, triggers, policies, grants, sequences, extensions, and encrypted data. Record which features actually have data. The repository's alternative SQL scripts are not evidence of the hosted schema.

## 2. Apply only the security baseline

The new migration `20261106105115_colombia_replacement_security_baseline.sql` creates an unexposed private schema and removes automatic browser access for future postgres-created objects. It does not create application tables, alter Auth, import records, or grant owner privileges. Verify the selected hosted project reference before applying it. Leave `supabase_admin` and managed Auth/Storage role defaults unchanged.

Postgres global default privileges accumulate with schema-specific ones. The baseline therefore removes both global and public/private browser defaults for `postgres`; this includes implicit PUBLIC function execution. Existing object privileges are unchanged. Future migrations must use explicit grants and ownership RLS. Keep `private` out of exposed API schemas. Verify actual creator roles and default ACLs again after import.

## 3. Reconcile the legacy model, then restore selectively

Create a reviewed mapping from each existing feature and stored entity to the new schema. Preserve IDs, timestamps, links, statuses, consent evidence, and valid customer data. Resolve differences between the actual backup, application queries, and repository scripts before writing further migrations. Do not create parallel guessed versions of `profiles`, trip plans, or bookings.

Restore Auth users and linked identities using a supported, version-compatible process. Preserve existing UUIDs, password hashes, confirmed state, and identity associations privately; do not recreate customers with random passwords or issue unsolicited invitations. Reconcile custom triggers and application foreign keys before importing dependent rows. Compare sensitive fields using private aggregate equality checks, never printed values. If encrypted fields, MFA factors, or Vault data exist, verify encryption-key requirements before restore. Do not copy platform internals or schema versions blindly.

Review old role grants, RLS, routines, triggers, views, and Storage policies instead of replaying old ACL/role SQL wholesale. Derive owner privileges from a verified account and protected membership, never editable user metadata. Use private buckets for account documents and scoped, expiring access where needed. Database Storage metadata is not a backup of the file bytes: transfer and verify both, retaining original object paths and ownership references. Public marketing assets can be classified separately after inventory.

## 4. Validate with controlled accounts

Keep production traffic on the current configuration during rehearsal. Compare source/target aggregate counts, ID sets, foreign-key integrity, sequence positions, required fields, statuses, and storage byte counts/checksums. Investigate every discrepancy without removing unexplained records.

Use synthetic accounts to verify sign-in, confirmation, recovery, sign-out, account settings, saved plans, quote requests and owner handling against the actual preserved feature set. Test anonymous denial, cross-account denial through both application and direct REST, owner restrictions, private-file access, update ownership checks, and idempotency. Verify no security-definer or view bypass. Test an existing controlled account with its owner entering the password; agents must not read or invent it. Avoid customer messages and bookings during rehearsal.

## 5. Cut over and retain rollback

Only after reconciliation and functional/security checks pass, configure the replacement project's production URLs, allowed redirects, SMTP and provider settings; these are separate from a database import. New project keys and issuer mean users should expect to sign in again. Copy no old sessions or reset links as a promise of continuity.

Coordinate a brief write freeze or an explicit final-delta strategy, take the final backup, and update Colombia's server and browser configuration together. Keep service secrets server-only. Australia keeps its separate project and configuration. Verify public Colombia account flows, owner receipt, private caching, and recovery on the actual domain. Keep a documented configuration rollback and preserve any writes made after cutover before rolling back; do not blindly switch databases and lose new records.

## 6. Delete the old project only after evidence and approval

Deletion remains pending until the migrated accounts/features, restored files, reconciliation, production checks, and usable backup are confirmed; an agreed observation period has passed; and the user explicitly approves the named old project. Retain only the backups justified by the migration and the user's retention decisions, with access restricted throughout.

## Local checks and reference material

The existing isolated harness runs the baseline plus rollback tests without network or hosted credentials:

```powershell
node ../audit/tools/pglite/run-account-storage.mjs supabase/migrations supabase/tests/replacement_baseline.sql
node supabase/tests/replacement-defaults.test.mjs ../audit/tools/pglite/node_modules/@electric-sql/pglite
```

The second test starts with deliberately unsafe global and schema defaults, then checks that the baseline removes browser defaults while preserving existing explicit grants and simulated `supabase_admin` defaults. PGlite validates PostgreSQL grants and RLS behavior. It does not emulate managed Supabase Auth, Storage bytes, project settings, or production cutover. Those remain explicit later checks.

- [Supabase backup and restore](https://supabase.com/docs/guides/platform/migrating-within-supabase/backup-restore)
- [Restore a downloaded dashboard backup](https://supabase.com/docs/guides/platform/migrating-within-supabase/dashboard-restore)
- [Storage downloads and file metadata](https://supabase.com/docs/guides/storage/management/download-objects)
- [PostgreSQL default privileges](https://www.postgresql.org/docs/current/sql-alterdefaultprivileges.html)
