# Release checkpoint — 9 November 2026 (Sydney)

## Published runtime

- Main site / Colombia / New Zealand: **f941bb9**, deployment **dpl_22U8bSe868U733p3g73qXosp6zSv**, https://aves.bio.
- Australia / shared accounts: **5659bea**, deployment **dpl_DaNUuTUmMNmcL9ctnMSPaAD1EAvv**, promoted successfully to the existing Australia/shared-account service.
- GitHub branches remain `webmaster/readiness-2026-11-05` and `australia/preview`. Later documentation commits do not require another runtime build.

## What changed

South Island now has the connected four-place landscape carousel and ecosystem map, zoom/pan/reset/metric scale, Info overlays, shared on-viewer habitat selection and expandable planning guidance. Three additional licensed landscape assets carry credits. Map marker titles were corrected to avoid hydration mismatch. Public NZ development badges were removed. The prior single flip-card pilot is superseded by this connected discovery layout; no claim that every requested 3D treatment is complete.

Owner inbox Open Request focuses/reveals the correct details even when already selected. Prepare a Proposal focuses/reveals its new heading instead of opening below the phone viewport. This remains a manual private draft editor; AI research/narrative generation is queued as059. Owner page now checks the database owner grant before rendering; APIs independently check access.

Optional subscription uses an unchecked choice on shared email/social sign-in/signup. Selecting it leads to the private email-preference confirmation screen after authentication; the visitor explicitly saves there. `/account/email-updates` is also linked from the account shell. Reopening and unsubscribing use the same existing private subscriber registry and versioned consent ledger. A service-only RPC checks confirmed account identity; the API derives that identity from verified sign-in. No newsletter campaign or marketing message was sent. Existing contact-form opt-ins remain separate entrypoints to that registry.

User-approved older NZ request cleanup was completed with exact-scope assertions; retained request and underlying saved plans preserved. No real guest identifiers, answers or itineraries are recorded here.

## Verification and limits

- Source119 automated tests/type check and hosted build passed. Responsive South Island checks passed locally and live, including 390x844, 320x568 and 844x390 frames, Info scrollability, controls, scale and divider.
- Account281 automated tests/type check passed; exact hosted deployment READY before promotion. Tests cover optional choice in email/Google flows, verified identity, rejected injected identity/foreign origin, ordinary-account page denial, request focus and existing proposal draft operations.
- Isolated Chrome responsive checks passed at1280/390/320px: request/proposal reveal/focus/cancel, no overflow; subscription opt-in/save/reopen/unsubscribe against synthetic UI responses, no real emails or quotes sent.
- Hosted database subscription read/opt-in/retry/unsubscribe/re-opt-in tested inside a rollback. Zero synthetic subscriber rows remained. Ordinary-account owner-RPC denial verified; exactly one active owner grant; quote tables deny direct public/customer reads, trip plans use RLS. Synthetic QA route removed before build and returns404 in production.
- Live20 check groups passed: all three countries and South Island, homepage, credits/media, human/XML sitemaps, private401/307 responses, signup unchecked opt-in and visible Google button. Public sitemap excludes account/admin/API/test routes; no public page inventory changes in the account increment.
- No physical iPhone/native touch test or fresh real Google/email account signup was completed in this increment. The existing provider callback has not been newly authorized with a different user. Consent persistence and subscription controls are verified separately from mailing-campaign delivery, which is not implemented here.
- Supabase security advisor reports intentional no-policy INFO entries for service-only private tables. Leaked-password protection remains disabled on the chosen free plan: https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection . No billing upgrade was authorized. These checks do not establish that any service is impossible to attack.

## Continue later

Use NEXT-WEEK-PROMPT.md. Prompt/backlog now include logo names/pronunciation, month-first seasonal observations, feather-inspired controls, researched private trip stories, photographic reference and unfinished media-identification intake. Next visual priority012c map-card consistency. Resources036, checklist previews039, full region context006c/055 and North Island parity040 remain queued. Pause after GitHub sync; do not start another increment automatically.
