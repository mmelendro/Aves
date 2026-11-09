# Native account and enquiry integration checks

These checks exercise the current AVES application through real HTTP, the pinned
Supabase SDK, native Supabase Auth, PostgREST and PostgreSQL. Four synthetic accounts
are created in a fresh disposable database. No hosted project, production key or
customer record is used. No provider or project configuration is changed.

Requirements: Linux x86_64, Node 22, Python 3.12+, OpenSSL, curl and npm. Install the
application with its pinned `corepack pnpm install --frozen-lockfile` first. Run
from the repository root, with Node 22 on PATH:

```sh
python tests/integration/setup-native.py --runtime /tmp/aves-test-runtime
python tests/integration/run-native.py --runtime /tmp/aves-test-runtime --node node --output /tmp/aves-native-result.json
```

The runtime directory must be outside this Git repository. Its isolated npm package
pins `embedded-postgres@17.11.0-beta.19`, which supplies PostgreSQL 17.11. npm is only
used for this separate test runtime. AVES retains pnpm 10 and its single pnpm lockfile.
Auth 2.197.0 and PostgREST 16.5 are pinned official Linux binaries; the installer
checks each downloaded archive against its recorded SHA-256 before extraction.

The launcher creates random local-only keys and passwords, a one-day TLS certificate
with a localhost SAN and a private temporary directory. Trust is limited to its Node
process tree using `NODE_EXTRA_CA_CERTS`; certificate verification remains enabled.
It binds only loopback TCP ports 3003, 54321, 54325, 54326, 54329, 54330 and 54331.
Keep them free and stop any separate AVES development server before running: Next
dev shares the repository's development build directory. PostgreSQL does not require
a Unix socket or Docker. `auth migrate` runs before `auth serve`, with the standard
authenticated default role and Auth-schema usage grants supplied explicitly.

The eleven maintained application migrations are listed in `native-runtime.mjs`.
The obsolete Colombia replacement baseline is intentionally excluded. No migration
command targets hosted Supabase. Row policies, column permissions and service-only
RPC grants remain active. The fixture owner grant exists only in this fresh database.

Next starts with explicit local fixture configuration and `VERCEL_ENV=development`.
This does not weaken the app's read-only Vercel Preview guard. All configured
environment keys are supplied locally, overriding `.env.local`. Account callbacks
and legacy session migration run through the actual Next route handlers. Cookie
paths and expiry writes are tracked in a small in-memory HTTP cookie jar. Password
and recovery SDK calls match the app's auth calls; no browser is automated here.
The old Colombian adapter check supplies its accepted canonical Origin header,
because Next dev internally normalizes its loopback request URL to `localhost`.

Auth SMTP accepts only reserved test-domain recipients. A local Resend-compatible
HTTP capture accepts fixture recipients and the quote workflow's existing fixed
owner envelope. It has no forwarding/delivery code. No external email is sent.
Acceptance and rejection responses from this capture exercise the application's
separate notification-status handling; they do not prove real Resend acceptance,
inbox delivery or Google/provider configuration. Raw mail and credentials remain
inside the private fixture directory or memory and are not written into the report.

The checks cover service setup plus confirmed/unconfirmed signup, PKCE callbacks,
three-country save/reopen/edit/delete, same-key retries, revision conflicts,
cross-account API and direct RLS denial, service-only RPC denial, old-cookie handover,
budget-free and budget-bearing NZ round trips, currency/zero/blank boundaries, immutable NZ submissions, owner-only proposals, correct proposal visibility,
enquiry consent/idempotency, both legacy enquiry adapters, notification failure,
one-time password recovery and refresh-token revocation after sign-out.

Normal completion stops the native services and removes the database, fixture mail,
certificates, keys and private logs. The launcher records cleanup only after the
temporary directory is removed. The output report contains check names, versions,
the application base revision, actual source fingerprint, harness hashes and explicit verification limits. No .vercel project link is required; all fixture HTTP requests stay on the exact local origins. Keep
PR #3 in draft until the hosted provider, browser and final cutover gates in
`docs/CONSOLIDATION.md` are resolved. Do not promote the read-only Preview artifact.
