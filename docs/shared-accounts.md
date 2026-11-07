# One AVES account across destinations

The main AVES homepage at `/` is the global destination chooser. Colombia lives at `/colombia`, Australia at `/australia`, and New Zealand inspiration at `/new-zealand`. **My Trips lives at `/account`**, with sign-in, sign-up and recovery screens below that path. Colombia/Australia are currently enabled for saved plans; New Zealand remains in development.

Account code, APIs, auth callbacks and assets remain in the maintained Australian app. Root middleware proxies only `/account/*` to the fixed Australian deployment; its routing marker is never authorization. Native account links avoid Next's Australian base-path prefix. Private/no-store/noindex protections and server verification remain in place.

New sessions use `aves-auth`, Path=/, Secure in production and SameSite=Lax. The first root visit may pass through `/australia/auth/session` to verify and migrate legacy cookies from their original scope. Only verified sessions migrate; newer root sessions take precedence. Pending PKCE verifiers are preserved. The HttpOnly `aves-session-checked` guard prevents loops and grants no access. Existing `/australia/account` links redirect to `/account`, preserving the query. `/account?country=colombia&region=<canonical-slug>` prefills a Colombian draft. Safe nested sign-in return paths preserve country and region choices.

Existing `/australia/auth/callback` and `/australia/auth/confirm` addresses remain valid and finish on root account screens. Proposal emails link to `/account`. Owner quotes remain at `/australia/admin/quotes`. No database or provider configuration change is required.

Old `/auth/login`, `/auth/signup` and `/dashboard` routes redirect to the shared portal. Old Colombian recovery links start a fresh recovery; retired-project tokens and arbitrary redirects are never forwarded. `/shopping` redirects to `/contact`, preserving recognised tour/region choices. The legacy Colombia authentication, profile, documents, booking and mock payment implementations have been removed. No historical data import or database deletion is performed by these redirects.

## Inquiries

The Colombia form posts JSON to same-origin `/australia/api/contact`: country `colombia`, intent `inquiry`, name, email, one canonical region (or empty for several), travel timing, group size, message, explicit optional updates consent and a honeypot. Extra preferences and multiple regions are included in the message. Unchanged retries reuse the same UUID `Idempotency-Key`.

Success requires `{success:true,status:"stored",intent:"inquiry",country:"colombia"}`. This means durable storage, not confirmed email delivery or booking. The shared backend owns consent evidence, throttling, idempotency and owner notifications. Optional Colombia updates use the exact wording “Email me AVES Colombia trip news and updates. I can unsubscribe at any time.” This is distinct from sending an inquiry.

Legacy `/api/contact` is a bounded, validated compatibility bridge to the fixed `https://aves.bio/australia/api/contact` endpoint. It forwards no cookies, authorization headers or service credentials. It requires a UUID key; cached old forms without one receive a clear refresh instruction. It does not follow redirects or fabricate success on timeout, provider errors or an outdated response.

## Configuration and release

Colombia only uses optional `NEXT_PUBLIC_SITE_URL` (default `https://aves.bio`) plus framework/platform settings. It no longer reads Supabase, database or email-provider environment variables. Review hosting integrations separately before removing their settings; application cleanup alone does not establish that external services no longer use them.

Deploy and verify the shared schema and upgraded backend **before** this Colombia version. An older backend does not understand the country field. The public proxy must route `/australia/api/*`, account pages and assets to the shared app. A standalone Colombia preview needs equivalent routing before real form/account QA; use mocked tests locally instead of submitting to production.

Run `node --test tests/*.test.cjs` and the strict production build. Historical SQL under `scripts/` is archived review evidence, not current deployment instructions. The authoritative shared schema/migrations and its account/security tests live in the Australia app.
