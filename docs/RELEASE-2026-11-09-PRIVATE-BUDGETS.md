# Private NZ budget release — 9 November 2026 (Sydney)

Published and verified; pause before another feature.

- Account/Australia app: e8656ad on australia/preview; dpl_HWRbDEFKZXJdhfuwbURNWsjJ7xHf, promoted from the READY production candidate https://aves-australia-i8ll6pagu-mmelendro-9273s-projects.vercel.app.
- Global/Colombia/NZ app unchanged: 4d1c703 on webmaster/readiness-2026-11-05. The shared account remains https://aves.bio/account.
- Optional NZ private-brief accommodation per person/night, food and activities per person/day; paired native sliders and editable whole-unit amounts, blank versus zero, six currency codes. Defaults NZD, no guest amounts prefilled. This is denomination, NOT exchange conversion or booking/pricing.
- Supabase migration 20261108192239_private_trip_budget_preferences.sql applied to Shared Accounts. Strict optional JSON validation is additive/backward compatible; no policy/table/account permissions changed. RLS remains enabled. Existing authentication/private ownership/frozen submission workflow reused.

## Verification

275 full Australian tests passed, including the 105 targeted account/security/UI subset (not additive); strict TypeScript, diff checks and hosted production build passed. Direct database validator checks accepted valid/zero budgets and old briefs while rejecting unsupported currency, negative/fractional/oversized/non-numeric/null/currency-only/unknown-key payloads.

Live 1280x1000 desktop and 390x844 phone-sized checks used one clearly synthetic owner-controlled QA draft. Entered three amounts, saved, reloaded and reopened; edited the food amount and incremented it with the slider keyboard control; changed denomination without changing amounts; cleared activities, saved/reopened and verified it remained blank; entered an explicit zero and switched back to NZD; saved and shared. The immutable shared copy and owner inbox retained the exact three amounts including zero and units. No proposal issued and no booking created. Notification accepted by email service; actual mailbox arrival not independently checked. Existing earlier synthetic briefs remained readable. Physical touch hardware and exhaustive assistive-technology testing were not performed.

Staged account navigation redirected to the production canonical /account; authenticated persistence was therefore tested after promotion, not claimed as staged UI testing. Desktop/mobile had no document-width overflow. Evidence is private under audit/evidence/nov9-budget-*.png and test logs. Four South Island content tests also rerun successfully; they prove explicit island-association/media consistency, not complete independent ecological verification.

No public route inventory changed. Live source and Australian XML sitemaps and Australian human directory returned 200; neither XML contained private account/admin/auth locations. Sitemap checked/unchanged; no artificial modification dates. Docs-only checkpoint sync does not require another deployment.

## Follow-ups recorded, not shipped

034/013: local imagery audit, featured places and verified ecosystems linked to bird filtering, South Island first. 035: dated automatic currency conversion. 036: lawful podcast/video embeds. Historical/extinct public catalogue cleanup remains017. Private guest/trip particulars remain outside Git. These follow-ups do not authorize starting all work together. Keep Sol medium for the next selected code increment, publish/sync/pause after its acceptance checks.
