# AVES accounts and inquiries: a beginner's code tour

This guide explains the code in this repository, not the current state of a hosted database or provider dashboard. It was prepared by reading the source; no live database checks or email sends were performed for this documentation change.

The `australia/` application also runs the **shared AVES account backend**. Visitors use `https://aves.bio/account` for My Trips. The main website forwards those account pages to this application; its normal public country pages and API endpoints live under `/australia`. Colombia uses the same account system, not a separate customer database. See [account-path.ts](../lib/account-path.ts), [middleware.ts](../middleware.ts), and the main site's routing configuration when changing this arrangement.

## Start with these files

| Read in this order | What it explains |
| --- | --- |
| [account/page.tsx](../app/account/page.tsx) | The server checks sign-in before rendering the workspace. |
| [account-dashboard.tsx](../components/account/account-dashboard.tsx) | The browser loads plans and proposals, opens editors, and reports saved results. |
| [trip-plan-editor.tsx](../components/account/trip-plan-editor.tsx) | A form becomes a request to save a draft. |
| [account-api.ts](../components/account/account-api.ts) | Browser HTTP requests, response types, and friendly errors. |
| [plans/route.ts](../app/api/account/plans/route.ts) | A small URL/method adapter that delegates to a shared handler. |
| [account-handlers.ts](../lib/account-handlers.ts) | The actual plan, quote, and proposal operations. |
| [account-auth.ts](../lib/account-auth.ts) and [account-http.ts](../lib/account-http.ts) | Verified identity, bounded/validated input, origin checks, and safe responses. |
| [account-service.ts](../lib/account-service.ts) | Private calls to carefully named database functions. |
| [Supabase README](../supabase/README.md) | Tables, permissions, migration history, and database tests. |
| [account-notifications.ts](../lib/account-notifications.ts) | Email follows storage; its outcome is tracked separately. |

`"use client"` marks components with browser behavior, such as clicks and form state. Server-rendered components can prepare HTML without sending all their implementation to the browser. `import "server-only"` prevents a private helper from being imported into a client bundle. Neither directive replaces authorization checks.

## The three places where work happens

| Place | Responsibility | What it must not be trusted to decide alone |
| --- | --- | --- |
| Visitor's browser | Show forms; keep unsaved input; send requests with session cookies; display confirmed results. | Who owns a record, who is an administrator, or whether a price is authorized. Someone can alter browser code and requests. |
| AVES server | Verify the session, validate input, derive the actor from Auth, choose the database operation, return safe results. | A browser-supplied user ID, a hidden button, or an unchecked `next` URL. |
| Supabase Auth and Postgres | Auth verifies identity; database grants, row rules, constraints, triggers, and functions restrict/commit data changes. | A service key being safe merely because RLS is enabled. The service role bypasses RLS. |

There are **two different database access modes**:

- [supabase/client.ts](../lib/supabase/client.ts) and [supabase/server.ts](../lib/supabase/server.ts) use the **publishable key plus the visitor's session**. The server version is still visitor-scoped. Row-level security (RLS) limits which rows that user may access.
- [account-service.ts](../lib/account-service.ts) and [contact-store.ts](../lib/contact-store.ts) use a **private server key** for specific RPCs. RPC means “remote procedure call”: here it is a database function. These service-role calls bypass RLS, so the called function must enforce identity, ownership/owner grants, input rules, and allowed state changes. The actor ID is derived by the server after `getUser()`, never accepted from form JSON.

The public key is designed to reach the browser. The private database key, email key, OAuth client secrets, session tokens, and passwords must never be pasted into source comments, GitHub, screenshots, or logs. Environment-variable **names** can be documented; values cannot.

## Example 1: save a trip idea

1. A country link may include country/region hints. [plan-intent.ts](../components/account/plan-intent.ts) validates these hints before prefilling an **unsaved** form.
2. [TripPlanEditor](../components/account/trip-plan-editor.tsx) collects the title, country, regions, timing, party size, and interests. A new draft gets a random UUID. If the same request is retried without changing the fields, it reuses that UUID.
3. `accountRequest()` sends JSON to `POST /australia/api/account/plans` with the UUID in `Idempotency-Key`. An edit uses `PATCH /australia/api/account/plans/:id` and the last saved `updatedAt` value.
4. `plansPost` or `planPatch` calls `requireAccountUser()`. Auth must return a confirmed, non-anonymous user. The handler also validates origin, body size, schema, country, and region rules.
5. The server assigns `user_id` from that verified session. The visitor-scoped Supabase client writes `public.trip_plans`; RLS and database triggers provide additional checks. The database caps active drafts at 50 per user.
6. The handler returns the confirmed row. Only then does the browser replace its displayed saved plan. A save failure keeps the form input available.

Two ideas prevent accidental data loss:

- **Idempotency** means a retry can return the original saved result instead of creating duplicates. A SHA-256 hash compares validated content; it is a fingerprint, **not encryption**. Changing content while reusing a key causes a conflict.
- **Revision checking** means an edit/delete includes the original `updatedAt` timestamp. The database update also matches that timestamp, owner, and draft status. If another tab changed the record first, the API returns `409` rather than silently overwriting it. Preserve the full timestamp precision.

A saved draft is not a quote request, reservation, or payment.

## Example 2: ask AVES to price the plan

1. The dashboard's `QuoteRequestForm` submits the saved plan ID, contact name, expected revision, and a retry key.
2. `quotePost` verifies the account. It takes the contact email and user ID from Auth rather than trusting submitted identity fields.
3. The service-only `submit_quote_request` database function checks the actor and owned draft, handles same-key retries, and limits new requests to five per client in 15 minutes.
4. In one transaction, it stores a frozen snapshot in `quote_requests` and marks the plan `quote_requested`. That snapshot records what the client actually requested; later workflow updates do not rewrite it.
5. Only a newly created request triggers `notifyAccount("quote", ...)`. Email goes to the server-selected owner recipient. The client gets `status: "stored"` even if the separate notification attempt is unavailable.

The owner's inbox can retrieve the saved request through the authorized admin API. An email failure does not mean the request disappeared.

## Example 3: prepare and issue a priced proposal

1. [owner-quote-inbox.tsx](../components/account/owner-quote-inbox.tsx) calls the admin quote API. A signed-in account is insufficient: the database requires an active, explicit UUID grant in `private.site_admins`.
2. [ProposalEditor](../components/account/proposal-editor.tsx) stores a draft containing itinerary, inclusions, exclusions, validity date, and price in **integer AUD cents**. Current code does not support other proposal currencies, even for Colombia.
3. Saving a draft does not show it to the client. The database permits one draft per request and assigns proposal version numbers. Updates require the current revision.
4. The owner reviews the proposal and explicitly chooses to issue it. `proposalSend` calls `issue_quote_proposal` with the session-derived actor, expected revision, and retry key.
5. The database freezes the issued content and makes it visible to that client. The result includes the client's **current confirmed Auth email** for the notification, rather than assuming the old quote email is still current.
6. Only the first issue attempts the notification. The browser reports the issued proposal and its separate email status. Further changes require a new version; the issued version is not overwritten.

`sent` is the existing database/API name for **issued and client-visible**. It does not prove email delivery, client acceptance, payment, or a confirmed booking. This code contains no payment or reservation workflow.

## Example 4: public contact form without an account

The public [contact route](../app/api/contact/route.ts) is separate from the signed-in quote workflow:

1. It accepts an inquiry or waitlist form as JSON, including a UUID retry key. It rejects cross-site browser submissions when the supplied headers identify them, but unlike account mutations it permits a missing `Origin`. Origin checks are not a general anti-bot guarantee.
2. It bounds input to 32 KiB, validates fields/region, checks a honeypot, and requires explicit updates consent for waitlist requests. The server chooses the consent wording version.
3. [contact-store.ts](../lib/contact-store.ts) stores a private request and any applicable subscriber/consent evidence atomically. New requests are limited to five per normalized email in 15 minutes; retries do not consume another slot. No IP-based limit is implemented here.
4. An unchanged retry returns its original result without another consent write or notification. Disabled destinations permit only a matching historical replay, not a new request.
5. A new saved request triggers one plaintext owner notification, with the visitor as reply-to. It does not send a visitor confirmation email or verify a newsletter address.

The public endpoint's `status: "stored"` confirms storage only. Opt-in wording/version is recorded, but the address is not verified by this form; historical suppression and country-specific wording remain relevant. See the database README for the exact stored consent contract.

## Sign-in, recovery, and shared sessions

- [auth-form.tsx](../components/account/auth-form.tsx) calls the browser Auth SDK for password sign-in, signup, recovery, resend, and enabled social providers. Browser checks help feedback; provider-side Auth policy is authoritative.
- [auth/callback](../app/auth/callback/route.ts) exchanges a one-time PKCE code for a cookie-backed session. PKCE ties an authorization response to the browser that started it.
- [auth/confirm](../app/auth/confirm/route.ts) verifies allowed email token types; recovery leads to the reset form. Password update is authorized by Auth, not merely by showing that form.
- [safeAuthNext](../lib/auth-redirect.ts) accepts only local account/admin return paths. Invalid or external values fall back to `/account`.
- Root-scoped `aves-auth` cookies support all destinations. [session-migration.ts](../lib/supabase/session-migration.ts) moves older Australia-only session cookies after verification, without replacing a newer shared session. Its verifier handling is separate because a PKCE verifier is not a signed-in identity.
- Middleware refreshes cookies and handles old account URLs, but each private API re-verifies the user. The `x-aves-account-proxy` header is a routing hint, not authorization. The short `aves-session-checked` cookie prevents redirect loops, not sign-in checks.
- `isAdmin` in dashboard JSON decides whether to show an owner link. Neither that flag nor a hidden button grants owner privileges.

## What email states really mean

| State | Meaning in this code |
| --- | --- |
| `pending` | No final provider outcome has been recorded. |
| `accepted` | The email provider returned a receipt ID. Inbox delivery is not confirmed. |
| `failed` | The attempt was rejected, misconfigured, or acceptance was not confirmed in time. |

The eight-second `Promise.race` limits how long the route waits; it **does not cancel** the email provider's request. A timeout can therefore mean “outcome unknown,” not “definitely unsent.” Stable provider idempotency keys reduce duplicate attempts. Recording the status is best-effort, so the stored status may lag the provider result.

There is no automatic notification retry worker or delivery webhook in this implementation. Authentication emails use Supabase Auth's configured email setup; inquiry/proposal notices use the server's Resend integration. Do not assume they are the same code path.

## Editing safely

- For visible wording/layout, start in account components/pages. For API behavior, follow route → handler → Auth/validation → database permissions/function. A browser-only restriction is insufficient for protected data.
- Keep customer IDs derived from verified Auth. Owner access comes from explicit database grants, not an email address or user-editable profile metadata.
- Keep private responses uncached. Search-engine `noindex` and hidden navigation are useful presentation choices, not security boundaries.
- Add a **new** migration for schema changes; do not rewrite applied migration files. Consult [Supabase README](../supabase/README.md) before changing RLS, grants, RPCs, triggers, or defaults.
- New destinations need coordinated application and database catalogue changes; a public destination page alone does not enable account requests. Use [adding-destinations.md](adding-destinations.md).
- Avoid changing historical country serialization, payload hashes, consent versions, or issued snapshots casually: old retries and customer records depend on them.
- Keep error messages/logs free of keys, session tokens, submitted personal details, and raw provider responses. The current helpers use deliberate messages; new code must do the same.
- For comments-only edits, run `node node_modules/typescript/bin/tsc --noEmit --incremental false` in this application and confirm that non-comment source is unchanged. For behavior changes, also run relevant automated tests and verify the complete flow in an isolated test environment. Database tests must not be aimed at production by default.

These controls reduce risk; they do not make any website impossible to attack. Hosted provider settings, key rotation, backups, monitoring, and real delivery require separate operational checks, which this source tour does not claim to have performed.


## Optional account email updates —9November2026

Shared signup offers an unchecked choice before email/Google authentication. Opt-in intent routes to `/account/email-updates`; the visitor confirms with Save. The private screen reads and updates `/australia/api/account/email-updates`. That route verifies the account, validates same-origin strict boolean input, and calls service-only `account_email_updates`; the database checks confirmed identity and writes the existing subscriber/consent tables. No email address or actor ID is accepted from browser JSON. GET is read-only; duplicate saved values do not append duplicate consent events. Explicit authenticated opt-in may reactivate a prior suppression; the public contact form still cannot do so. Essential account/proposal messages are separate. See migration20261108225245 and tests/email-updates.test.cjs. This function uses SECURITY DEFINER with empty search_path and explicit service-role-only execution; keep its API identity check and database confirmation check intact. It sends no campaign mail.
