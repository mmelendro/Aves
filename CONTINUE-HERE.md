# AVES Colombia — live handoff, updated 7 November 2026 (Sydney)

The shared AVES account and country-aware inquiry system are now live. Colombia and Australia remain separate public applications, using one account/backend.

Database retirement update: **7 November 2026 (Sydney)**. Both unused projects were permanently deleted with the user's explicit confirmation; the shared project is the sole remaining Supabase project.

Future destinations: the shared country/region registry is **live and verified on 7 November 2026 (Sydney)** in the Australia/shared service. Follow [Adding an AVES destination](https://github.com/mmelendro/Aves/blob/australia/preview/docs/adding-destinations.md). Ecuador and Costa Rica remain disabled placeholders, not launched offerings. New destinations reuse the existing accounts/database and require reviewed configuration, migration and public-content releases; there is no country-management admin screen.

## Current production

- Repository: https://github.com/mmelendro/Aves.
- Colombia branch and verified Vercel production branch: `webmaster/readiness-2026-11-05`.
- Colombia project: `mmelendro-9273s-projects/v0-company-landing-page`.
- **Live Colombia code: `731c871`; deployment: `dpl_G5yHCqQ5PXfk1KVJHMvBamH6hC9k`.**
- Public: https://aves.bio/. Exact deployment: https://v0-company-landing-page-ltdx9ntqo-mmelendro-9273s-projects.vercel.app.
- This final Colombia deployment was rebuilt and promoted after obsolete environment removal. It supersedes the earlier same-code deployment and all previous redesign/hotfix releases.
- **Live Australia/shared portal code: `9a7c03b`; deployment: `dpl_6CaX82WY4M5qvChywSLuMtZNoKth`.**
- Public: https://aves.bio/australia. Exact deployment: https://aves-australia-8naiv3je8-mmelendro-9273s-projects.vercel.app. This shared-service release was promoted on 7 November 2026 (Sydney); Colombia's application code and deployment are unchanged.
- Australia branch/project: `australia/preview` / `mmelendro-9273s-projects/aves-australia`. Keep independent histories/checkouts and preserve branch-specific deployment guards.

## One account and maintained backend

The user explicitly chose one AVES account/database for both countries and abandoned migration of old Colombian account data.

- Shared project: **AVES Shared Accounts**, reference `qeyprwftrouztlqmwuzv`, healthy in Sydney. Its project display name was verified.
- Shared migration `20261106114144_shared_country_plans_and_contacts.sql` is applied. Hosted rollback verification passed without changing the pre-existing rows.
- The shared portal supports signup/sign-in, country-specific saved plans, quote requests and owner-issued priced proposals. These are not instant reservations or payments.
- Colombia's legacy account routes redirect to `/australia/account`; My Trips is available in desktop/mobile navigation, the footer and region guides. Safe country/region presets survive entry into the portal.
- Old Colombia auth clients, conflicting profile/booking models, document collection and mock checkout are retired. `/shopping` leads to personal inquiry with recognised presets preserved.
- The old **AVES-Database** project `krzmqusxxrfljjkdbklx` and unused empty **AVES Colombia** replacement `gfxirgzvbpytgfffolhj` were **permanently deleted on 7 November 2026 (Sydney)** after explicit user confirmation. The project inventory and organization dashboard show only **AVES Shared Accounts** `qeyprwftrouztlqmwuzv`, active and healthy. No legacy data import was requested or performed; do not resume the abandoned migration.
- Post-retirement checks, before adding the catalogue, found **5 Auth users, 4 plans, 3 quote requests and 5 contacts** unchanged, with RLS on all **8 then-existing application tables**. After the catalogue migration, those customer-record counts remain unchanged; the database has **4 country rows, 20 region rows and 10 application tables, all with RLS enabled**.
- Applied catalogue migration: `20261106203926_extensible_destination_catalogue.sql`. Australia and Colombia are enabled; Ecuador and Costa Rica are disabled. Application/database registry parity is exact. Anonymous catalogue reads and authenticated catalogue writes are denied; contact-replay RPC access is service-only.
- Local migration filenames were aligned with the actual hosted versions `20261106105909`, `20261106105919` and `20261106114144`, with unchanged SQL hashes. Hosted migration history was not altered; do not reapply these migrations under their former filenames.

## Inquiries and configuration

The Colombia form submits to same-origin `/australia/api/contact`, explicitly identifying Colombia and its selected regions. Updates consent is separate and optional. Unchanged retries reuse a UUID; success requires a stored receipt confirming Colombia. The legacy `/api/contact` is a bounded compatibility proxy without database/email credentials.

After cutover and verification, **18 obsolete Colombia environment entries were removed**. Only the application setting `NEXT_PUBLIC_SITE_URL` remains. The initial pre-cutover removal attempt was blocked by automatic approval review; the safer post-cutover retry was allowed. The final Colombia deployment was rebuilt without the old secrets. Shared-app credentials were unchanged.

Removing environment entries **does not revoke old external-provider keys**. Review/revoke any obsolete provider credentials separately when their remaining dependencies are understood. Never print or commit them.

SMTP sender branding is AVES and persistence was verified after reload. Generic AVES authentication templates preserve their existing links; all four configured security-alert switches persisted. The shared project's display-name change does not change its reference or credentials.

## Current release verification — 7 November 2026 (Sydney)

- Shared/Australia release `9a7c03b`: **210 automated tests**, strict TypeScript checks and the production build passed; **24 static pages** were generated. All **6 local SQL verification suites** and the hosted destination-catalogue rollback verifier passed.
- Both `/` and `/australia` returned 200 after promotion. Unauthenticated plans, proposals and admin APIs returned 401 with private/no-store caching. Ecuador, Costa Rica and unknown-country contact submissions returned 400 with country validation errors; these checks created no records or emails.
- The live browser loaded saved plans and proposals after reload, preserving the owner session and showing the updated destination-editor copy. Reserved countries are not offered for new plans. Retiring a previously launched destination preserves owned same-country draft editing and exact stored-contact replay; keep its historical regions and consent version.
- The new deployment returned zero application-error records, with no excluded intervals, during `2026-11-06T20:32:49.855Z`–`2026-11-06T20:47:49.855Z` (7 November in Sydney). This is a bounded log check.

## Earlier cutover evidence — 6 November 2026

- Colombia: **61 automated tests pass**, full strict TypeScript check and production build pass. Australia/shared app: **191 tests**, strict type checking and production build pass.
- Both releases were verified after their original publication; local, staged and public navigation were checked. The shared service has since been superseded by the 7 November release above.
- A controlled Colombia draft was saved, reloaded and verified in the database with country Colombia and region `central-andes`. That exact temporary draft was subsequently deleted by guarded SQL.
- A clearly labelled internal Colombia inquiry returned stored success and reached the owner's Gmail inbox with country Colombia, `central-andes` and updates consent false. **One labelled internal test inquiry is retained.**
- The public probe examined 34 JavaScript bundles: only the shared `qeyprwftrouztlqmwuzv` Supabase host was found, with no private-key patterns. Unauthenticated private APIs returned 401; configuration probes returned 404; security headers were verified. This is scoped verification, not a claim that every vulnerability is excluded.
- At 390px mobile width, changing country switched between 9 Australian and 11 Colombian region choices, cleared incompatible selection and caused no horizontal overflow.

Colombia's 22 bird profiles, credited real media, 14 recording links with provenance/rights notes, 37 local bird selections across 11 regions, map, carousels, credits and public sitemaps remain intact. Preserve missing-call notices and legacy-media limitations.

## Remaining operational limits and next steps

- Supabase Free remains selected. Paid managed backups and leaked-password checking are not enabled. Establish an available export/recovery process; do not describe backups as configured.
- Security alerts do not establish owner MFA enrollment. Complete or verify enrollment separately.
- Requests/proposals may be saved while their email notification is pending or failed. Provider acceptance is not final delivery. Unchanged browser retries do not resend notifications; operational review/retry remains necessary when delivery is unavailable. No unattended retry worker is established.
- Preserve exact `/australia` and descendant forwarding to `https://aves-australia.vercel.app`, including the prefix. Do not broaden routing over Colombia's assets/API or change DNS.
- Historical SQL in `scripts/` is archived review evidence, not deployment instructions. See `docs/shared-accounts.md` and nonsecret `.env.example` for architecture/configuration; any release-order discussion there describes the completed cutover sequence.

Contact: `mmelendro@gmail.com`. AVES is pursuing B Corp certification, not certified.

Use Node 22 and pinned pnpm 10.34.5; frozen installs with lifecycle scripts disabled, automated tests, strict type checking and production builds remain required. ESLint is still a separate unchecked build step. Never disable package-integrity checks or commit credentials, private environment files, customer data or hosting-auth files.
