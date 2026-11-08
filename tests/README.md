This integration branch is documented in [CONSOLIDATION.md](../docs/CONSOLIDATION.md). Older two-app paths below describe the pre-cutover production architecture.

# Reading the automated checks

Run `corepack pnpm test` from this application. The package script invokes Node's test runner on `tests/*.test.cjs`. A test name describes the behavior being checked. `assert` compares the actual result with the expected result; a failure stops that test and reports the difference.

Tests commonly prepare a small fake request/session/database adapter, exercise the real application helper, then assert both the result and any permitted/forbidden calls. These local doubles allow retries, errors, cross-account requests and redirect attacks to be checked without contacting customers. Helper loaders transpile selected TypeScript into the test context; they are test plumbing, not website code.

The root/global branch checks account forwarding/legacy links, contact compatibility, public sitemaps and page composition. The Australian branch additionally checks account APIs, contact storage, shared sessions, OAuth guards, destination validation and discovery content. Read each test title and its setup together before changing an expected value.

SQL checks under `supabase/tests` are separate from this package command. See the database README before executing them. A passing local suite does not prove real email delivery, every browser layout or hosted database configuration. Verify those separately only when the change requires it.

The [native integration suite](integration/README.md) adds real local PostgreSQL,
Supabase Auth, PostgREST and application HTTP checks without Docker or hosted
credentials. Its 19 checks passed for the unified candidate; the sanitized evidence
and remaining hosted provider/browser gates are recorded in `docs/CONSOLIDATION.md`.
It is separate from `pnpm test` and sends no external email.
