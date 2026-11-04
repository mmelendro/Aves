# Australia inquiry storage

This schema supports the existing Australia inquiry and launch-list form. All data access goes through the website's server. It does not create visitor accounts, verify email ownership, enroll anyone in a campaign, or send email.

## Private records and access

- `private.contact_requests` stores validated submissions, their idempotency key/hash, and the independent owner-notification outcome.
- `private.launch_subscribers` stores one normalized email per address, with `requested` or `suppressed` status. A form submission leaves `email_verified_at` null.
- `private.consent_events` stores consent and suppression evidence. The application can insert/read events but cannot update or delete them.

Keep `private` out of the Data API's exposed schemas. All three tables have RLS enabled and no browser-access policies. `anon`, `authenticated`, and `PUBLIC` have no table privileges. The three RPCs below use `SECURITY INVOKER`, an empty search path, qualified table names, and explicit execution grants only to `service_role`.

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

Preserve this registry when wording changes; introduce a new version rather than rewriting historical entries. `requested` records unverified submitted consent. **Do not send marketing until email ownership and opt-in have been verified through a separate approved process.** No verification or marketing workflow is implemented here. Suppression must be checked again when any future campaign is sent.

## Verification and deployment

The migration was originally generated with the verified Supabase CLI 3.0.0 `migration new` command. Its local filename is now [20261104210527_australia_contact_storage.sql](migrations/20261104210527_australia_contact_storage.sql), matching the authoritative version assigned when the Australia project applied it. The SQL content is unchanged; no hosted migration history was rewritten.

[tests/contact_storage.sql](tests/contact_storage.sql) is an administrator-run verification script for a test database after the migration. It uses reserved `example.test` addresses, exercises actual `service_role`/`anon` permissions, checks consent/idempotency/throttling/notification behavior, and rolls back all synthetic records. No test calls Resend or sends email.

On 5 November 2026 (Sydney), the migration and full rollback suite also passed on the hosted Australia database running PostgreSQL 17.11. All three private tables remained empty after verification. The security advisor reported no warnings or errors and three informational [RLS enabled with no policy](https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy) findings, one per private table. Those are intentional: browser roles have no grants or policies, and only the backend service role accesses the records. Do not add permissive policies merely to remove these notices.

The offline PGlite check verifies PostgreSQL functions, constraints, grants, and rollback behavior. It does not prove separate-session concurrency, hosted PostgREST exposure, or the project's deployment configuration. Verify those against the intended test project before release. An in-memory test database is not a backup, retention policy, or production storage configuration.
