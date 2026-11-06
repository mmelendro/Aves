# Local database security repair

These scripts describe two incompatible legacy schemas. They are **development bootstraps, not production migrations**. In particular, `optimized-schema.sql` drops existing tables. Do not run it against a populated database. The deployed schema and backups must be inspected before preparing a separate migration. No hosted database was changed by this repair.

`create-user-tables.sql` defines `user_profiles(user_id)` / `user_bookings`; `optimized-schema.sql` instead defines `user_profiles(id)` / `trip_bookings`. The application also contains clients for `profiles` / `bookings`, which neither script defines. Passing these local tests does not prove that the live database uses either schema or protects those other tables.

The repair:

- Limits booking summary RPCs to the caller or a trusted administrator, revokes default PUBLIC/anonymous execution, fixes definer search paths and qualifies table references.
- Uses the caller's stored `auth.users.raw_app_meta_data.role` for legacy administrator checks. Editable `user_metadata` is not trusted. The private helper reveals only a boolean and does not grant customers access to `auth.users`. `create-storage-buckets.sql` now requires this helper from `create-user-tables.sql`.
- Combines row policies with narrow column grants. Customers cannot assign payment state, authoritative amounts, booking identities or audit timestamps. A priced/confirmed booking cannot have its request details rewritten by its customer. Privileged server operations must independently verify staff authority.
- Keeps customer creation as a request. The old non-null `user_bookings.price` defaults to **0 as an unpriced pending request**, not a free offer or charge. A trusted pricing operation must set a real amount before confirmation. The alternative `trip_bookings.total_amount` remains null until priced. This does not implement a pricing or payment workflow.
- Binds customer chat to the current user and their booking, rejecting staff/guide identities and system messages.
- Keeps the document bucket private. The legacy upload UI still uses a filename incompatible with its folder policy, requests public URLs for private objects, and does not remove uploaded objects when removing profile links. Those storage flows remain unverified and need separate repair before collecting documents. No passport/medical data or existing feature was removed in this change.

The account settings server page now uses `getUser()` verification before reading a profile. The deprecated auth helper and conflicting profile models still require consolidation before legacy account features can be declared ready.

## Isolated verification

The SQL suite runs the actual bootstrap scripts in two separate disposable PGlite databases with synthetic users and real role/RLS/column privileges. It performs no network calls and writes no persistent database. It uses PGlite **0.5.15** (PostgreSQL 18.6); hosted PostgreSQL compatibility has not been tested for this repair.

Install that exact PGlite version in an isolated tools directory, outside the application dependencies. Then run, with an absolute module path appropriate to that installation:

```powershell
$env:PGLITE_TEST_MODULE = 'C:\path\to\tools\node_modules\@electric-sql\pglite\dist\index.js'
node --test scripts/tests/database-security.test.mjs
node --test tests/account-settings-auth.test.cjs
```

The SQL suite covers 19 security scenarios in two parent tests (21 reported passes), including owner isolation, anonymous RPC denial, forged admin metadata, immutable financial fields, valid request edits, trusted admin operations, search-path shadowing, private document paths and staff chat impersonation. The account page suite covers anonymous, failed-verification and verified-user behavior. These tests do not exercise email delivery, live storage, real session revocation or the undeclared `bookings`/`profiles` schema.
