# AVES Colombia — handoff, 6 November 2026

**Shared-account release pending.** The Colombian redesign is already live. The newer shared-account/contact cleanup is verified locally, but has not yet replaced the live code listed below.

## Source and current live releases

- Repository: https://github.com/mmelendro/Aves.
- Colombia checkout/branch: `source` / `webmaster/readiness-2026-11-05`.
- Colombia hosting project: `mmelendro-9273s-projects/v0-company-landing-page`.
- Vercel's Colombia production branch is now `webmaster/readiness-2026-11-05`, verified through its API.
- Live Colombia: `00e2129`, deployment `dpl_HbF8jQLfBNQNZrxnTTYDcM1fk8Ry`, at https://aves.bio/. This full redesign superseded the urgent hotfix; do not report the hotfix as current production.
- Live Australia: `88601b6`, deployment `dpl_96tkV7vQzoJYAVJLQTZSvu1SuFFc`, at https://aves.bio/australia, hosted by `mmelendro-9273s-projects/aves-australia`.
- Australia checkout/branch: `australia` / `australia/preview`. Keep the two public applications and their independent histories separate; do not merge one application into the other.
- Preserve the branch-specific automatic-deployment guards in `vercel.json`. Update these release identifiers only after the next public deployment is verified.

## Confirmed decision: one AVES account and backend

The user explicitly chose one shared AVES account/database for Colombia and Australia and abandoned migration of the old Colombian account data. The existing working backend `qeyprwftrouztlqmwuzv` is the shared backend. Do not resume the superseded plan to migrate Colombia into a separate project.

The shared-country migration `20261106113240_shared_country_plans_and_contacts.sql` has been applied to that hosted backend. Its hosted rollback verification passed. Observed counts were unchanged before/after: 5 Auth users, 4 Australian plans, 0 Colombian plans, 3 quote requests and 4 contact requests. These are verification-time counts, not a permanent inventory or evidence of a completed frontend cutover.

The paused old project `krzmqusxxrfljjkdbklx` and unused empty replacement `gfxirgzvbpytgfffolhj` still exist. Their deletion remains pending until the shared cutover is deployed and verified. No historical data import or deletion was performed by the code cleanup. The owner remains on Supabase Free.

## Ready local implementation — not yet this live release

- Legacy Colombia login/signup, dashboard and account routes redirect to the shared portal under `/australia/account`. My Trips appears in desktop/mobile navigation and the footer; all 11 region guides can prefill a Colombian draft.
- `/shopping` now redirects to personal inquiry, preserving recognised region/tour choices. There are no instant reservations or payments.
- Old Colombia Supabase clients, global auth providers, conflicting profile/booking models, document collection UI and mock checkout code have been removed after dependency review. The prior profile lifecycle repair is superseded by this retirement.
- Colombia's form posts to same-origin `/australia/api/contact` with `country:"colombia"`, canonical region information, explicit optional Colombia updates consent and a stable UUID for unchanged retries.
- The old `/api/contact` is a bounded compatibility proxy to the fixed shared endpoint, without database or email credentials. Cached legacy forms without an idempotency key receive a refresh instruction.
- Success requires a stored receipt explicitly confirming Colombia; it does not claim email delivery or a booking. Multiple-region choices and extra preferences are retained in the inquiry message.
- Five unused dependencies were removed: the two Supabase packages, Resend, react-day-picker and Recharts. The lockfile only shrank; no package versions were added or upgraded.
- See `docs/shared-accounts.md` and the nonsecret `.env.example` for routing and runtime configuration. Colombia no longer requires Supabase or mail-provider credentials.
- Historical SQL under `scripts/` is archived review evidence, explicitly not current deployment/migration instructions.

The live visual/content work remains intact: 22 bird profiles, genuine credited photographs, 14 recording links with provenance/rights notes, 37 sourced bird selections across 11 regions, regional carousels, map links, public sitemaps, canonicals and credits. Preserve missing-call notices and documented legacy-media limitations; never invent licences or substitute species.

Canonical region slugs: `pacific`, `western-andes`, `central-andes`, `eastern-andes`, `cauca-valley`, `magdalena-valley`, `caribbean`, `sierra-nevada-de-santa-marta`, `llanos`, `amazonia`, `colombian-massif`.

## Verification and operational state

- Colombia: **61 automated tests pass**, full TypeScript check passes, and the production build passes with strict type checking enabled; 52/52 static pages generated. The old TypeScript build bypass has been removed. ESLint remains a separate unchecked build step.
- Shared/Australia app: **191 automated tests pass**, strict type checking and production build pass.
- No remaining Colombia tests import the removed account/document/mock-booking implementations. Public JavaScript contained no Supabase client markers in the verification scan.
- Vercel `CONTACT_FROM` and the Supabase SMTP display name were changed to generic AVES branding. Auth templates now use AVES wording with their existing links preserved. Password-change, email-change and MFA-change security alerts were enabled.
- SMTP display name AVES and the four security-alert switches were verified after reloading the dashboard. MFA-change alerts do not establish that owner MFA enrollment is complete.
- An attempt to remove obsolete hosting environment variables/connections was **blocked by automatic approval review before deployment**. No variables were removed. Complete deployment and verification first, then revisit removal; do not claim cleanup already happened or bypass the review.

## Release order and next work

1. Finish the shared release review; SMTP persistence is verified.
2. Deploy the upgraded shared/Australia application first. Verify the country-aware schema/API, account signup/sign-in, Colombian and Australian draft plans, quote requests, owner proposals and genuine notification outcomes.
3. Deploy the Colombia cleanup from its verified production branch. Verify desktop/mobile navigation, account redirects, regional presets and a controlled Colombia inquiry through the public proxy. The older shared handler does not understand the country field, so Colombia must not be released first.
4. Preserve the exact `/australia` and descendant forwarding rules to `https://aves-australia.vercel.app`, retaining the upstream prefix. Do not broaden routing over Colombia's assets/API or change DNS.
5. Record both verified final deployment IDs/commits here. Then remove obsolete project connections/environment settings and, after explicit cutover verification, retire the two unused Colombian databases. Their deletion is still pending.

Contact: `mmelendro@gmail.com`. AVES is pursuing B Corp certification, not certified.

Use Node 22 and pinned pnpm 10.34.5. Run a frozen install with lifecycle scripts disabled, `pnpm test`, `tsc --noEmit` and `pnpm build`. If the bundled Corepack cannot validate pnpm's current signing key, use the already verified pinned CLI; never disable integrity checks. Keep credentials, private environment files, customer data and hosting-auth files out of Git and chat. No additional paid service was authorised or enabled.

The retained database display name is AVES Shared Accounts (same project reference and Sydney region). Shared privacy notices and proposal information were corrected to match the current account and inquiry flows.
