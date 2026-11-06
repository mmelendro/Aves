# One AVES account for Colombia and Australia

Colombia is the public website at `/`; the shared account and backend are maintained in the Australia app and publicly routed under `/australia`. Use native links across the two independently deployed Next apps. `/australia/account?country=colombia&region=<canonical-slug>` prefills a Colombian draft. Sign-in/sign-up receive a safe, unprefixed `next=/account?country=colombia` destination.

Old `/auth/login`, `/auth/signup`, `/dashboard`, `/account` and nested account routes redirect to that shared portal. Old recovery links start a fresh recovery; old project tokens and arbitrary redirect parameters are never forwarded. `/shopping` redirects to `/contact`, preserving recognised tour/region choices. The legacy Colombia authentication, profile, documents, booking and mock payment implementations have been removed. No historical data import or database deletion is performed by these redirects.

## Inquiries

The Colombia form posts JSON to same-origin `/australia/api/contact`: country `colombia`, intent `inquiry`, name, email, one canonical region (or empty for several), travel timing, group size, message, explicit optional updates consent and a honeypot. Extra preferences and multiple regions are included in the message. Unchanged retries reuse the same UUID `Idempotency-Key`.

Success requires `{success:true,status:"stored",intent:"inquiry",country:"colombia"}`. This means durable storage, not confirmed email delivery or booking. The shared backend owns consent evidence, throttling, idempotency and owner notifications. Optional Colombia updates use the exact wording “Email me AVES Colombia trip news and updates. I can unsubscribe at any time.” This is distinct from sending an inquiry.

Legacy `/api/contact` is a bounded, validated compatibility bridge to the fixed `https://aves.bio/australia/api/contact` endpoint. It forwards no cookies, authorization headers or service credentials. It requires a UUID key; cached old forms without one receive a clear refresh instruction. It does not follow redirects or fabricate success on timeout, provider errors or an outdated response.

## Configuration and release

Colombia only uses optional `NEXT_PUBLIC_SITE_URL` (default `https://aves.bio`) plus framework/platform settings. It no longer reads Supabase, database or email-provider environment variables. Review hosting integrations separately before removing their settings; application cleanup alone does not establish that external services no longer use them.

Deploy and verify the shared schema and upgraded backend **before** this Colombia version. An older backend does not understand the country field. The public proxy must route `/australia/api/*`, account pages and assets to the shared app. A standalone Colombia preview needs equivalent routing before real form/account QA; use mocked tests locally instead of submitting to production.

Run `node --test tests/*.test.cjs` and the strict production build. Historical SQL under `scripts/` is archived review evidence, not current deployment instructions. The authoritative shared schema/migrations and its account/security tests live in the Australia app.
