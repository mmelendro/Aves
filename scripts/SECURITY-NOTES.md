# Archived legacy database security repair

**Historical review material only. Do not deploy these schemas.** Colombia now uses the shared AVES account, inquiry and quote backend maintained in the Australia app. The legacy account, booking, profile and document code has been retired from this public app. These scripts and isolated tests record the prior security review; they are not current setup or migration instructions. No old database was deleted by the code cleanup.

These scripts describe two incompatible legacy schemas. They are **development bootstraps, not production migrations**. In particular, `optimized-schema.sql` drops existing tables. Do not run it against a populated database. The deployed schema and backups must be inspected before preparing a separate migration. No hosted database was changed by this repair.

`create-user-tables.sql` defines `user_profiles(user_id)` / `user_bookings`; `optimized-schema.sql` instead defines `user_profiles(id)` / `trip_bookings`. The retired application also had clients for `profiles` / `bookings`, which neither script defines. Passing these historical tests does not establish the state of any hosted database.

The repair:

- Limits booking summary RPCs to the caller or a trusted administrator, revokes default PUBLIC/anonymous execution, fixes definer search paths and qualifies table references.
- Uses the caller's stored `auth.users.raw_app_meta_data.role` for legacy administrator checks. Editable `user_metadata` is not trusted. The private helper reveals only a boolean and does not grant customers access to `auth.users`. `create-storage-buckets.sql` now requires this helper from `create-user-tables.sql`.
- Combines row policies with narrow column grants. Customers cannot assign payment state, authoritative amounts, booking identities or audit timestamps. A priced/confirmed booking cannot have its request details rewritten by its customer. Privileged server operations must independently verify staff authority.
- Keeps customer creation as a request. The old non-null `user_bookings.price` defaults to **0 as an unpriced pending request**, not a free offer or charge. A trusted pricing operation must set a real amount before confirmation. The alternative `trip_bookings.total_amount` remains null until priced. This does not implement a pricing or payment workflow.
- Binds customer chat to the current user and their booking, rejecting staff/guide identities and system messages.
- Kept the legacy document bucket private. Its incompatible upload/public-URL UI has since been retired. The shared portal does not collect passport, health or document information.

Legacy account settings now redirect to the shared portal. Authentication and authorization belong to that maintained app; no deprecated auth helpers or legacy database models are loaded by Colombia's public pages.

## Isolated verification

The SQL suite runs the actual bootstrap scripts in two separate disposable PGlite databases with synthetic users and real role/RLS/column privileges. It performs no network calls and writes no persistent database. It uses PGlite **0.5.15** (PostgreSQL 18.6); hosted PostgreSQL compatibility has not been tested for this repair.

Install that exact PGlite version in an isolated tools directory, outside the application dependencies. Then run, with an absolute module path appropriate to that installation:

```powershell
$env:PGLITE_TEST_MODULE = 'C:\path\to\tools\node_modules\@electric-sql\pglite\dist\index.js'
node --test scripts/tests/database-security.test.mjs
```

The historical SQL suite covers 19 security scenarios in two parent tests (21 reported passes), including owner isolation, anonymous RPC denial, forged admin metadata, immutable financial fields, valid request edits, trusted admin operations, search-path shadowing, private document paths and staff chat impersonation. These tests do not exercise the shared portal, email delivery, live storage or real session revocation. Current Colombia redirect and contact bridge checks are in `tests/shared-account.test.cjs` and `tests/contact-route.test.cjs`.
