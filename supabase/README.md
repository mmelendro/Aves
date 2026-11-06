# Shared AVES inquiry and account storage

This database supports both Australia and Colombia through one AVES account and owner portal. The application remains in the `australia` repository and the shared portal is served at `/australia/account`. Contact records use server-only data access; authenticated clients own their trip plans, quote requests, and issued proposals. Migrations do not create real accounts, grant an owner membership, enroll anyone in a campaign, or send email.

The shared country/region registry is **live and verified on 7 November 2026 (Sydney)** at release `9a7c03b`, deployment `dpl_6CaX82WY4M5qvChywSLuMtZNoKth` ([exact deployment](https://aves-australia-8naiv3je8-mmelendro-9273s-projects.vercel.app)). See [Adding an AVES destination](../docs/adding-destinations.md) for the reviewed configuration/migration process, disabled Ecuador/Costa Rica placeholders and separate public launch requirements. No new database or customer accounts are needed, and there is no country-management admin screen.

## Destination catalogue — verified 7 November 2026

[20261106203926_extensible_destination_catalogue.sql](migrations/20261106203926_extensible_destination_catalogue.sql) is applied. `public.destination_countries` and `public.destination_regions` match `content/trip-options.ts` exactly: **4 countries and 20 regions**, with only Australia and Colombia enabled. Ecuador and Costa Rica have no regions and remain unavailable for new plans/inquiries. The generated plan-country foreign key and contact-country foreign key preserve stored references.

All **10 application tables** have RLS enabled. Anonymous catalogue reads and authenticated catalogue writes are denied; catalogue changes require reviewed administrative SQL. The service-only `replay_shared_contact_request` RPC retrieves only an existing country/key/hash-matched receipt and cannot create records, consent events or notifications. An owned draft for a retired destination remains editable in the same country; new plans or country changes into a retired destination are rejected. Preserve historical regions and consent versions when retiring a destination.

The hosted catalogue rollback verifier and all **6 local SQL suites** passed. Customer-record counts remained **5 Auth users, 4 plans, 3 quote requests and 5 contacts**. The shared application passed **210 tests**, strict TypeScript checks and its production build, generating **24 static pages**. After promotion, both public homepages returned 200; unauthenticated plans/proposals/admin APIs returned 401 with private/no-store caching; disabled/unknown-country contact requests returned 400 without writes or emails.

Local migration filenames for draft-quota/default privileges, client quote columns and the shared-country schema were aligned with the actual hosted versions **`20261106105909`, `20261106105919` and `20261106114144`**, respectively. Their SQL hashes are unchanged, and hosted migration history was not edited. This is filename alignment, not a new schema operation: do not reapply the same SQL under its former filenames.

## Shared-country architecture and rollout

[20261106114144_shared_country_plans_and_contacts.sql](migrations/20261106114144_shared_country_plans_and_contacts.sql) extended the existing working database. The coordinating agent confirmed hosted application and a successful run of the dedicated hosted rollback verifier on 6 November 2026 (Sydney). At that verification, the before/after totals remained 5 Auth users, 4 plans (all Australia), 3 quote requests, and 4 contact requests. The original shared release was `caa1d01` / deployment `dpl_275hNaQAeiofr3BsQjL6NX7P8BYo`, superseded by the 7 November catalogue release above. Colombia's connected application release remains `731c871` / deployment `dpl_G5yHCqQ5PXfk1KVJHMvBamH6hC9k`.

- A plan's optional `details.country` identifies a registered country; new plans currently accept only enabled Australia or Colombia. Missing historical values mean Australia. API responses normalize the country. Australian serialization omits the default country to preserve existing creation hashes and retry receipts.
- New plan selections must belong to the chosen country. Colombia supports all 11 canonical regions; region options live in `content/trip-options.ts`. Existing Australian freeform region strings can be retained exactly when editing that same Australian plan; they cannot be added to a new plan. Both the HTTP handler and a database trigger enforce these rules.
- Quote requests freeze country with the plan snapshot. Account ownership, confirmed identity, owner authorization, RLS, the 50-draft limit, quote throttling, and immutable issued proposals remain unchanged. Proposal prices remain explicitly **AUD**, including Colombia proposals.
- Each private contact request stores its country, defaulting existing records to Australia. Country-specific consent versions remain linked to the request. Global email suppression continues to apply; a request for one country does not authorize marketing for the other.
- The old `submit_contact_request` RPC remains compatible for Australian callers. New application code uses the service-only `submit_shared_contact_request` wrapper. No private table or privileged RPC becomes browser-accessible.

The rollout completed in compatibility order: migration, shared application, then Colombia's form/portal links. Colombia requires `country: "colombia"` in the stored response: the former Australian handler would otherwise discard an unknown country field. No old-data import was required or performed.

On **7 November 2026 (Sydney)**, after the user's explicit confirmation, **AVES-Database** (`krzmqusxxrfljjkdbklx`) and the unused empty **AVES Colombia** replacement (`gfxirgzvbpytgfffolhj`) were permanently deleted. The replacement had no Auth users or application tables immediately before deletion. The project inventory and organization dashboard now show only the retained **AVES Shared Accounts** project (`qeyprwftrouztlqmwuzv`), active and healthy. Post-retirement checks, before the catalogue migration, found its existing **5 Auth users, 4 plans, 3 quote requests and 5 contacts** unchanged, with RLS enabled on all **8 then-existing application tables**. The catalogue later added two protected tables, bringing the current RLS-enabled total to **10** without changing customer-record counts. The extra contact compared with the earlier rollback verification is the retained labelled live inquiry test described in the release handoff.

After the verified shared release, 18 obsolete Colombia environment-variable entries were removed and the final Colombia deployment was published with only its site URL setting. Automatic approval review accepted this safer sequence after previously blocking removal before deployment. Removing environment settings does not revoke the old external provider keys; their retirement remains a separate task.

The shared contact HTTP contract is `POST /australia/api/contact`, with an `Idempotency-Key` UUID and `{country?, intent, name, email, region?, travelWhen?, partySize?, message?, updates, website?}`. A successful durable receipt is `{success: true, status: "stored", intent, country}`. Colombia accepts one canonical region or an empty selection; additional preferences belong in the message. Waitlist requests require explicit updates consent. Country selection is not an authorization boundary: verified account ownership still controls every private account record.

## Private records and access

- `private.contact_requests` stores validated submissions, their idempotency key/hash, and the independent owner-notification outcome.
- `private.launch_subscribers` stores one normalized email per address, with `requested` or `suppressed` status. A form submission leaves `email_verified_at` null.
- `private.consent_events` stores consent and suppression evidence. The application can insert/read events but cannot update or delete them.

Keep `private` out of the Data API's exposed schemas. All three tables have RLS enabled and no browser-access policies. `anon`, `authenticated`, and `PUBLIC` have no table privileges. The contact RPCs below use `SECURITY INVOKER`, an empty search path, qualified table names, and explicit execution grants only to `service_role`.

Use a dedicated backend client with the server-only Supabase secret key. Never use a `NEXT_PUBLIC_` variable for that key, attach a visitor session to this client, or expose the private tables through browser queries. The service role bypasses RLS; the route's validation and the database grants/constraints remain important.

## Server RPC contract

`public.submit_contact_request` accepts:

```text
p_idempotency_key uuid
p_payload_hash text                 # server-computed SHA-256, 64 lowercase hex characters
p_intent text                       # inquiry | waitlist
p_name text
p_email text
p_updates boolean
p_consent_version text
p_region text = ''
p_travel_when text = ''
p_party_size text = ''
p_message text = ''
```

It returns `{request_id, created, submitted_at, notification_status, subscriber_status}`. A new submission, applicable subscriber update, and consent evidence commit together. Waiting-list requests require `p_updates=true`; an inquiry with `false` does not unsubscribe an existing subscriber.

`public.submit_shared_contact_request` takes the same arguments plus final `p_country text = 'australia'`. It validates country/region, delegates atomic storage and locking to the original RPC, records country on the request, and rejects a replay for a different country. Its database receipt has the same shape; the HTTP route adds the validated country. The original RPC is retained for older Australian application versions.

Hash the canonical validated submission, including its consent version, on the server. A retry with the same key/hash returns the original request without reapplying consent. Reusing the key with a different hash raises `PT409`. Request-key locks serialize concurrent retries; email locks enforce at most five new submissions per normalized email within 15 minutes (`PT429`). Retries do not consume this quota. No IP addresses are collected.

`public.record_contact_notification(p_request_id uuid, p_status text, p_provider_id text = null, p_error_code text = null)` records `accepted` or `failed`. Acceptance requires a provider receipt and cannot be overwritten by a later failure. Return value: `{request_id, notification_status, provider_id}`. Use short non-sensitive error codes, never raw provider messages or submitted personal data. An unknown request raises `PT404`.

Send the owner notification only for a newly created request, after the transaction commits. Use the saved request ID as the Resend idempotency key. A browser replay must not initiate another email. Pending/failed notifications require a separate operational review/retry process; this migration does not create an automatic sender. Provider acceptance is not proof of delivery.

`public.suppress_launch_subscriber(p_email text, p_source text = 'email_request')` atomically suppresses an address and records an unsubscribe event. Allowed sources: `email_request`, `unsubscribe_link`, `admin`. Return value: `{subscriber_id, status: 'suppressed', changed}`. Repeated suppression is idempotent. Suppression also works before any opt-in exists, so a later anonymous submission cannot override that instruction.

Use suppression only for actual unsubscribe requests or a documented administrative suppression instruction. Any future public unsubscribe endpoint must verify its unsubscribe-only token before calling this service-only RPC. Do not expose arbitrary email suppression directly to anonymous clients. No reactivation RPC is supplied: a new form submission, old replay, or unchecked checkbox cannot remove suppression.

## Consent wording registry

The server-owned version `au-launch-updates-2026-11-05` refers to the following exact checkbox wording:

| Intent | Checkbox wording |
| --- | --- |
| `waitlist` | Yes, email me AVES Australia launch news and trip updates. I can unsubscribe at any time. |
| `inquiry` | Email me Australian launch news and trip updates. (Optional; unsubscribe at any time.) |

The waitlist checkbox is required; the inquiry checkbox is optional. Consent evidence stores the version, source, server timestamp, request reference, and whether it affected the subscriber's status. An opt-in submitted for a suppressed address is retained as an unapplied request.

The additional server-owned version `co-travel-updates-2026-11-06` records: “Email me AVES Colombia trip news and updates. I can unsubscribe at any time.” Historical Australian wording remains unchanged.

Preserve this registry when wording changes; introduce a new version rather than rewriting historical entries. `requested` records unverified submitted consent. **Do not send marketing until email ownership and opt-in have been verified through a separate approved process.** No verification or marketing workflow is implemented here. Suppression must be checked again when any future campaign is sent.

## Verification and deployment

The migration was originally generated with the verified Supabase CLI 3.0.0 `migration new` command. Its local filename is now [20261104210527_australia_contact_storage.sql](migrations/20261104210527_australia_contact_storage.sql), matching the authoritative version assigned when the Australia project applied it. The SQL content is unchanged; no hosted migration history was rewritten.

[tests/contact_storage.sql](tests/contact_storage.sql) is an administrator-run verification script for a test database after the migration. It uses reserved `example.test` addresses, exercises actual `service_role`/`anon` permissions, checks consent/idempotency/throttling/notification behavior, and rolls back all synthetic records. No test calls Resend or sends email.

On 5 November 2026 (Sydney), the migration and full rollback suite also passed on the hosted Australia database running PostgreSQL 17.11. All three private tables remained empty after verification. The security advisor reported no warnings or errors and three informational [RLS enabled with no policy](https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy) findings, one per private table. Those are intentional: browser roles have no grants or policies, and only the backend service role accesses the records. Do not add permissive policies merely to remove these notices.

The offline PGlite check verifies PostgreSQL functions, constraints, grants, and rollback behavior. It does not prove separate-session concurrency, hosted PostgREST exposure, or the project's deployment configuration. Verify those against the intended test project before release. An in-memory test database is not a backup, retention policy, or production storage configuration.

## Client plans and owner proposals

[20261104222434_australia_client_trips_quotes.sql](migrations/20261104222434_australia_client_trips_quotes.sql) was generated with the same verified CLI and renamed after application to match the authoritative hosted migration version. Its content is unchanged (SHA-256 `474847628BFA24EDC4E703A5A81668EF80614D03696544E9880B522F924D3FDD`); no hosted migration history was rewritten. It adds:

- `public.trip_plans`: authenticated users read their own plans and insert/edit/delete their own drafts. Column grants prevent changing ownership, creation hashes, timestamps, or status. Requesting a quote freezes the plan; a different itinerary starts as a new draft.
- `public.quote_requests`: a complete immutable plan snapshot and the contact identity verified against `auth.users` at submission. Clients can read only their own requests; the server owns status and notification changes.
- `public.quote_status_events`: append-only history for the application, readable only by the request's client or the authorized server.
- `public.quote_proposals`: one editable draft per request, with increasing version numbers. Clients can read only their own issued (`sent`) versions. Issued price, itinerary, inclusions, exclusions, currency, validity, and issuance identity are immutable. A revision creates another draft/version.
- `private.site_admins`: explicit owner authorization by confirmed Auth user UUID. No browser access and no application INSERT/UPDATE/DELETE grants. A verified email alone is not an owner grant, and user-editable profile metadata is never authorization.

Every table has RLS. Public clients have no direct quote/proposal writes. Privileged RPCs use `SECURITY INVOKER`, an empty search path, and explicit service-role-only execution grants. The migration grants the service role only the additional Auth read columns it needs: `id`, `email`, and `email_confirmed_at`; it does not grant Auth writes. The two pure JSON validators read no data and are also callable by authenticated writers.

Provision the owner separately only after verifying the approved account's confirmed UUID and obtaining an explicit owner assignment. Insert that UUID and a meaningful `grant_note` as the database administrator; do not authorize by an email string or self-declared profile role. Set `active=false` to revoke access immediately. No production membership is seeded by the migration or tests.

The server must obtain each actor UUID from a verified Auth session, never from browser JSON. A dedicated service client must not inherit visitor cookies. Quote submission independently verifies that the client is confirmed and that the supplied contact email matches Auth. A name is display data only. Hash canonical validated inputs on the server and retain timestamp strings at their database precision for optimistic revision checks.

### Account RPC contract

All privileged functions below are in `public` and executable only by `service_role`. Parameters have the exact `p_` names shown; UUID/key parameters are UUIDs, hashes are 64 lowercase hexadecimal characters, and revisions are `timestamptz`.

| Function | Parameters | Result |
| --- | --- | --- |
| `account_admin_status` | `p_user_id` | Boolean; true only for an active, confirmed UUID owner grant |
| `submit_quote_request` | `p_client_user_id, p_plan_id, p_idempotency_key, p_payload_hash, p_expected_updated_at, p_contact_name, p_contact_email` | `{request_id, created, plan_id, submitted_at, status, notification_status, plan_snapshot, contact_name, contact_email, plan_updated_at}` |
| `list_admin_quotes` | `p_admin_user_id, p_limit=100` | Array of raw quote rows with `proposals[]` and `status_history[]`; limit 1–100 |
| `update_quote_status` | `p_admin_user_id, p_request_id, p_status` | Raw quote row; status `reviewing`, `responded`, or `closed` |
| `create_quote_proposal` | `p_admin_user_id, p_request_id, p_proposal_id, p_idempotency_key, p_payload_hash, p_details` | `{created, proposal: rawRow}` |
| `update_quote_proposal` | `p_admin_user_id, p_proposal_id, p_expected_updated_at, p_details` | Raw draft proposal row |
| `issue_quote_proposal` | `p_admin_user_id, p_proposal_id, p_idempotency_key, p_payload_hash, p_expected_updated_at` | `{issued, proposal: rawRow, request_id, contact_name, contact_email}` |
| `record_quote_notification` | `p_request_id, p_status, p_provider_id=null, p_error_code=null` | `{request_id, notification_status}` |
| `record_proposal_notification` | `p_proposal_id, p_status, p_provider_id=null, p_error_code=null` | `{proposal_id, notification_status}` |

A plan has a separate `title` and exact `details` JSON shape `{country?: "australia" | "colombia", regions: string[], travelWhen: string, partySize: string, message: string}`. A quote's snapshot is `{title, details, plan_id, plan_updated_at}`; the outer receipt's `plan_updated_at` is the frozen plan revision. The immutable `create_payload_hash` lets the application recognize an original draft-create retry even after later edits. Duplicate plan IDs with a different original creation hash must be rejected by the server.

Proposal details have the exact shape `{totalCents: integer, currency: "AUD", itinerary: string, inclusions: string, exclusions: string, validUntil: null | "YYYY-MM-DD"}`. Raw proposal rows use `total_cents`, `quote_request_id`, `issued_at`, `updated_at`, and other snake-case database fields. `sent` means issued and visible in the client account; it does not assert that email arrived. There is no payment, acceptance, or booking record.

Quote submission locks the idempotency key, checks replay first, then serializes the per-client quota and plan update. It permits five new requests per confirmed client in 15 minutes; no IP address is collected. A replay does not consume quota or write another history event. Proposal creation and issue are idempotent; draft editing requires an exact current revision. Issuance atomically freezes the proposal and marks the request `responded`. Closed requests must be reopened before another proposal is created or issued. Status changes append history; requesting the same status twice does not duplicate it.

Expected service errors are `PT403` (unconfirmed identity or unauthorized owner), `PT404` (missing/inaccessible record), `PT409` (stale revision, reused key, or incompatible state), `PT429` (quota), and `22023` (invalid input). Browser writes also encounter ordinary permission, RLS, or constraint errors.

Send notifications only after the durable transaction succeeds and only when `created=true` or `issued=true`. Use the saved quote/proposal ID as the provider idempotency key. A browser retry returns the saved receipt without starting another email. Record outcomes independently: `accepted` requires a provider receipt and cannot be overwritten by a later failure; `failed` requires a short safe error code. Draft proposals cannot record a notification. Pending/failed rows need a separate operational retry process. No notification worker, provider webhook, or delivery guarantee is created by SQL.

Proposal issue/replay returns the client's **current confirmed Auth email** as `contact_email`, so an old quote address is not reused after a confirmed account-email change. Issuing fails if the current recipient identity is unconfirmed. The original quote contact identity remains immutable audit evidence. The server uses the returned recipient and never accepts a proposal destination from browser input.

### Account verification

[tests/client_trips_quotes.sql](tests/client_trips_quotes.sql) creates reserved `example.test` Auth users and an explicit synthetic owner inside one rolled-back transaction. It checks actual role grants/RLS, own-draft editing, cross-account isolation, confirmed identity, frozen snapshots, replay conflicts and quotas, owner grants/revocation, hidden draft proposals, issuance/versioning, immutable issued content, status history, and independent monotonic notification outcomes. It never sends email.

On 5 November 2026 (Sydney), both migrations and both rollback suites passed locally with pinned PGlite 0.5.15 / PostgreSQL 18.6; every application table and synthetic Auth table was empty afterward. The reviewed account migration was subsequently applied to the hosted Australia project as version `20261104222434`. An independent hosted rerun of the contact rollback suite passed. The hosted account rollback attempt required confirmation and expired without successful execution; it was not retried through another path. Separately, the main agent's real hosted HTTP tests passed all six account, quote, proposal, and access-isolation groups. These are distinct checks; the local account rollback pass is not a hosted SQL-suite pass.

The hosted security advisor returned no warnings or errors and four expected informational [RLS enabled with no policy](https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy) findings for the three private contact tables and `private.site_admins`. Browser access to these tables is intentionally denied. No permissive policies were added. Evidence is retained under the workspace's `audit/evidence` directory.

The local runner uses a minimal Auth stub, so it does not establish hosted Auth/SMTP configuration, PostgREST behavior, multi-session lock scheduling, or real email delivery. HTTP checks exercise hosted Auth and Data API behavior separately. Production signup, recovery, quote notification, and proposal email were verified separately during the original release; those historical passes do not by themselves verify this shared-country release.

### Shared-country verification

[tests/shared_countries.sql](tests/shared_countries.sql) is a **local disposable-database** regression suite. It exercises real anonymous/authenticated/service roles, all 11 Colombian regions, old Australian hashes and exact freeform selections, country-preserving snapshots, direct-write rejection, cross-account isolation, and contact replay. Its historical fixture briefly disables the new trigger inside a rollback; do not use that fixture script on the hosted database.

[tests/shared_countries_hosted_rollback.sql](tests/shared_countries_hosted_rollback.sql) is the dedicated administrator-run hosted verifier. It creates only synthetic `example.test` identities and records inside one transaction, does not disable triggers or change policies, exercises Colombian draft creation/editing/quote replay and account isolation, then rolls everything back. It emits only before/after aggregate counts. Run the whole file in one connection with stop-on-error enabled; never change its `ROLLBACK` to `COMMIT`. It does not send email or verify browser sessions.

The coordinating agent ran this dedicated verifier successfully against the shared hosted project on 6 November 2026 (Sydney). All reported before/after totals were unchanged; aggregate-only evidence is recorded at `../audit/evidence/shared-country-hosted-rollback-verification.json`. This pass is distinct from the original account suite and from browser, email, or release verification.

The subsequent public release verification saved and reloaded a Colombia plan for `central-andes`, confirmed its country in the database, and deleted that exact labelled test draft. A separate labelled Colombia inquiry was stored with updates disabled and no subscriber link, then received in the owner's Gmail inbox at 12:04:51 UTC on 6 November 2026. Its test receipt is retained; provider acceptance and inbox receipt were checked separately. No marketing subscription was created.

The original 6 November public probe inspected 34 JavaScript bundles: no tested secret patterns were found and the only Supabase host observed was the shared project. Unauthenticated account/admin APIs returned 401; both probed `.git/config` paths returned 404. This is a bounded scan, not proof that every possible secret or security defect is absent. Evidence: `../audit/evidence/shared-release-public-security-probe.json`. Original cutover tests/builds are recorded in `../audit/evidence/shared-release-final-builds.json` (Australia 191 tests, Colombia 61 tests, strict checks and production builds passed); the newer 7 November catalogue verification is recorded at the top of this README.

Sender/authentication-template branding is AVES and confirmation/recovery links are unchanged. SMTP display and all four security-alert settings (password change, email change, MFA factor added, MFA factor removed) were reloaded and verified. Both countries' privacy/terms notices now describe the shared service. The Free plan remains in use; owner MFA enrollment, managed scheduled backups, and old external-key revocation remain open. Failed/pending application notifications still require manual review; no automatic retry worker exists.

From the repository root, the local verification command is:

```powershell
node ../audit/tools/pglite/run-account-storage.mjs supabase/migrations supabase/tests/contact_storage.sql supabase/tests/client_trips_quotes.sql supabase/tests/account_hardening.sql supabase/tests/shared_countries.sql supabase/tests/shared_countries_hosted_rollback.sql
```

Shared-country local evidence is saved outside the published application at `../audit/evidence/shared-country-local-verification.log`; the hosted pass has its separate aggregate evidence above. Concurrent real submissions can change aggregate counts, so review any future before/after delta without exporting customer records.
