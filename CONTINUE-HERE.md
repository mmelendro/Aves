# AVES Australia and shared AVES portal — handoff, 6 November 2026

**Shared-account release pending.** Australia remains published at https://aves.bio/australia. The newer code generalising its working account/backend to both Colombia and Australia is verified, but is not yet the public release listed below.

## Source and current live releases

- Repository: https://github.com/mmelendro/Aves.
- Australia checkout/branch: `australia` / `australia/preview`.
- Hosting project: `mmelendro-9273s-projects/aves-australia`.
- Live Australia: `88601b6`, deployment `dpl_96tkV7vQzoJYAVJLQTZSvu1SuFFc`.
- Colombia checkout/branch: `source` / `webmaster/readiness-2026-11-05`.
- Live Colombia redesign: `00e2129`, deployment `dpl_HbF8jQLfBNQNZrxnTTYDcM1fk8Ry`, at https://aves.bio/. It superseded the urgent hotfix.
- Colombia's Vercel production branch is now `webmaster/readiness-2026-11-05`, verified through the API.
- Keep the public applications and independent Git histories separate. Their account backend is shared; this is not a merge of the two website codebases.
- Preserve branch-specific automatic-deployment guards in `vercel.json`. Update final release IDs only after publication and verification succeed.

## One shared account/database — supersedes separate Colombia migration

The user explicitly chose one AVES account/database for both countries and abandoned migration of old Colombian data. Reuse the existing working backend `qeyprwftrouztlqmwuzv`. Do not point this app at either old Colombian project or restart a separate account migration.

Hosted migration `20261106113240_shared_country_plans_and_contacts.sql` is **applied**. Hosted rollback verification **passed**, with these observed counts unchanged before/after: 5 Auth users, 4 Australian plans, 0 Colombian plans, 3 quote requests and 4 contact requests. No permanent Colombian test plan was introduced by that rollback suite. This verifies the schema change, not the pending frontend deployment.

The earlier contact, account/quote, draft quota/default-privilege and client-column migrations remain applied. Preserve their ownership checks, immutable submitted/issued snapshots, trusted owner membership, explicit projections and least-privilege grants.

The paused old project `krzmqusxxrfljjkdbklx` and empty unused replacement `gfxirgzvbpytgfffolhj` remain pending deletion **after** the shared cutover is published and verified. No old data import or database deletion has occurred. Supabase Free remains the selected plan; no paid backup/security service was enabled by this work.

## Prepared implementation

- The existing signup/sign-in, saved plans, quote requests, owner-issued AUD proposals and notification records serve both countries. Generic AVES account labels and country selection preserve the existing public website style.
- Colombia links enter `/australia/account?country=colombia&region=<canonical-slug>`. The safe auth return parameter is unprefixed `next=/account?country=colombia&region=...`; never accept arbitrary external destinations.
- Shared contact accepts an explicit country and validates that country's regions. Existing Australian requests/consent wording remain compatible. Colombia uses its own explicit optional trip-updates consent; an inquiry does not imply marketing permission.
- Successful contact receipts include the stored request's country. Colombia requires `{success:true,status:"stored",intent:"inquiry",country:"colombia"}`. Durable saving and email-provider acceptance/delivery remain distinct.
- The Colombia public app has retired its conflicting auth/profile/booking/document clients and points to this maintained portal/backend. Old shopping links become personal inquiries, with recognised presets preserved.
- No instant reservations, payments, fabricated delivery states or automatic visitor confirmation emails are introduced.

Australian public content remains intact: twenty sourced bird profiles, genuine credited photographs, seventeen licensed recordings and nine regional guides (six states, NT, ACT and Jervis Bay Territory). The regional catalogue provides 39 local selections. Preserve accurate local occurrence versus wider ranges, introduced-species labels, missing recordings and user-initiated playback.

## Verified checks and email configuration

- Latest shared/Australia local checks: **191 automated tests**, full strict type checking and production build all pass.
- Latest Colombia local checks: **61 automated tests**, full strict type checking and production build all pass; the old TypeScript build bypass is removed.
- Hosted shared-country rollback suite passed with unchanged counts as recorded above. These results do not replace live verification of the new deployments.
- Vercel `CONTACT_FROM` and Supabase's SMTP display name were renamed to AVES. Auth templates now use generic AVES wording while preserving their existing callback/recovery links.
- Password-change, email-change and MFA-change security alerts were enabled. SMTP display name AVES and the four security-alert switches were verified after reloading the dashboard. MFA-change alerts are not proof of completed owner MFA enrollment.
- Automatic approval review **blocked the attempted removal of obsolete hosting connections/environment variables before deployment**. No variables were removed. Follow deployment and verification with the cleanup; do not bypass the review or report cleanup as finished.

## Routing and release order

The fixed Next base path remains `/australia`. Native assets/API requests use `sitePath`; internal Next links remain unprefixed. Native anchors cross between the independently deployed public apps. Colombia's hosting project forwards exact `/australia` and descendants to `https://aves-australia.vercel.app`, preserving the prefix. Do not remove those rules, broaden them over Colombia's assets/API or change DNS.

1. Finish the shared release review; SMTP persistence is verified.
2. Deploy this upgraded shared/Australia app first, against the already-applied migration. Verify both countries' account, draft, quote/proposal and contact flows, with controlled fixtures and truthful notification results.
3. Only then deploy the Colombia cleanup. Its requests must not hit the old Australia-only handler, which does not understand country.
4. Verify public routing, redirects, cookies, mobile navigation and country-preserving form/account presets. Record both final public commits and deployment IDs in the handoffs.
5. After successful cutover, remove obsolete hosting connections/variables and retire the two unused Colombian databases through the authorised review process. These actions remain pending.

Contact: `mmelendro@gmail.com`. AVES is pursuing B Corp certification, not certified. Preserve the emerald palette, rounded cards and genuine bird media.

Use Node 22 and pinned pnpm 10.34.5. Run a frozen install with lifecycle scripts disabled, `pnpm test`, `pnpm typecheck` and `pnpm build`. Credentials, private environment files, customer data and hosting-auth files stay out of Git and chat. Use controlled service tests; never print auth tokens or change the real owner's password during QA.

The retained database display name is AVES Shared Accounts (same project reference and Sydney region). Shared privacy notices and proposal information were corrected to match the current account and inquiry flows.
