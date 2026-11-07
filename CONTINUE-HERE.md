# AVES Australia and shared AVES portal — handoff, updated 7 November 2026 (Sydney)

The shared account/backend for Colombia and Australia is now live. The two public websites retain separate applications and Git histories.

## Current production — global homepage released 7 November 2026 (Sydney)

Both deployments below were successfully promoted and verified publicly on 7 November 2026 (Sydney). Their application commits were also verified on GitHub. This is the current live release; the older releases retained below are historical evidence.

| Application | Branch | Released source | Live deployment |
| --- | --- | --- | --- |
| Australia + shared accounts | `australia/preview` | `1e9307e` handoff head; application changes `95d870f` | `dpl_3DtQzWEbCUmx3VoPGPcrZxhLDy1V` |
| Global AVES homepage + Colombia | `webmaster/readiness-2026-11-05` | `762c5db` | `dpl_A6t7gvcu6mUHHPQAVZYBioNhD3zk` |

- [Australia/shared-account exact deployment](https://aves-australia-edosdqart-mmelendro-9273s-projects.vercel.app).
- [Global/Colombia exact deployment](https://v0-company-landing-page-avggk27ga-mmelendro-9273s-projects.vercel.app).
- Preparation test results: **212 Australia/shared-account tests passed; 66 global/Colombia source tests passed**.
- GitHub branch heads were verified as `1e9307e` for [Australia/shared accounts](https://github.com/mmelendro/Aves/tree/australia/preview) and `762c5db` for [global/Colombia](https://github.com/mmelendro/Aves/tree/webmaster/readiness-2026-11-05). Later handoff-only commits may advance those branches without changing the deployed application code.

### Current public structure

- `https://aves.bio/` is the global AVES homepage, with Colombia and Australia choices and an extensible public destination catalogue in the Colombia/root branch's `content/destinations.ts`.
- `https://aves.bio/colombia` holds the preserved Colombian homepage. Existing Colombian deep routes remain at `/regions/...`, `/aves-explorer`, `/tours`, `/contact` and their established paths.
- `https://aves.bio/australia` remains the Australian homepage, with global-destination and Colombia navigation. The fixed Australian base path remains `/australia`.
- `https://aves.bio/australia/account` remains the shared My Trips portal for both countries. Its global entry and navigation do not create a new account system or database; saved plans, quotes and proposals remain in the existing shared project.
- Native anchors cross between public applications. Do not prefix global `/` or `/colombia` links with the Australian base path. Within Australia, Next links remain unprefixed and native assets/API calls use `sitePath`.
- `/site-map` is the global/Colombia directory and links to `/australia/site-map`; the two native XML sitemaps remain available.
- Adding a country needs both the shared registry/configuration work below and a reviewed public-content release. Ecuador and Costa Rica remain disabled placeholders, not launched offerings.

### Verification of this publication

- **13/13 public HTTP checks passed**: main homepage, Colombia, Australia and site map returned 200 with correct canonical destinations; both destination photographs returned 200. XML sitemaps contained **40 root/Colombia entries and 32 Australian entries**, unique and excluding private routes. Legacy Colombian contact links resolve to `/contact`.
- Three anonymous private API checks returned **401** with **private, no-store** caching.
- Live browser navigation from the global homepage to Colombia worked; Colombia's **22-bird carousel** advanced, and its My Trips link preserved `country=colombia` on entry to the shared portal.
- Existing owned QA trip data and an issued proposal loaded; **Refresh Saved Plans** was verified. Generic account links from the global homepage and Australia worked, and **All Destinations** returned to the main homepage.
- Australia's **20-bird carousel** advanced. Selecting Tasmania on the map opened `/australia/contact?region=tasmania` with Tasmania selected.
- At a live **390px mobile viewport**, both country quick choices were visible above the fold, all main images loaded and document width was **376px**, with no horizontal overflow. The full desktop screenshot was also reviewed. Local workspace evidence is retained in `audit/evidence/global-home-mobile-2026-11-07.png` and `audit/evidence/global-home-desktop-2026-11-07.png`; these workspace files are outside this repository checkout.
- No browser errors were observed during these checks. This is bounded evidence, not a comprehensive security or defect-free guarantee.
- This publication made **no database changes** and submitted **no new drafts or emails**. The earlier controlled submission and email-delivery evidence remains below; those write/delivery flows were not repeated for this navigation release.

Database retirement update: **7 November 2026 (Sydney)**. Both unused projects were permanently deleted with the user's explicit confirmation; the shared project is the sole remaining Supabase project.

Future destinations: the shared country/region registry is **live and verified on 7 November 2026 (Sydney)**. Follow [Adding an AVES destination](docs/adding-destinations.md). Ecuador and Costa Rica remain disabled placeholders, not launched offerings. New destinations reuse the existing accounts/database and require reviewed configuration, migration and public-content releases; there is no country-management admin screen.

## Last verified production before the global homepage release

The releases below remain historical evidence and rollback references. The current release above supersedes them.

- Repository: https://github.com/mmelendro/Aves.
- Australia branch/project: `australia/preview` / `mmelendro-9273s-projects/aves-australia`.
- **Pre-global Australia/shared portal code: `9a7c03b`; deployment: `dpl_6CaX82WY4M5qvChywSLuMtZNoKth`.**
- Public: https://aves.bio/australia. Exact deployment: https://aves-australia-8naiv3je8-mmelendro-9273s-projects.vercel.app. Promoted on 7 November 2026 (Sydney), superseding the original shared-country release `caa1d01`.
- **Pre-global Colombia code: `731c871`; final deployment: `dpl_G5yHCqQ5PXfk1KVJHMvBamH6hC9k`.**
- Public: https://aves.bio/. Exact deployment: https://v0-company-landing-page-ltdx9ntqo-mmelendro-9273s-projects.vercel.app.
- Colombia branch and verified Vercel production branch: `webmaster/readiness-2026-11-05`; project `mmelendro-9273s-projects/v0-company-landing-page`.
- The final Colombia deployment was rebuilt/promoted after obsolete environment cleanup and supersedes the earlier same-code deployment, redesign release and urgent hotfix.
- Preserve independent checkouts/histories and branch-specific deployment guards. A shared backend does not mean merging the public applications.

## Shared account/database

The user explicitly chose one AVES account/database and abandoned old Colombian data migration.

- The retained project is **AVES Shared Accounts**, reference `qeyprwftrouztlqmwuzv`, healthy in Sydney; its display name was verified.
- Migration `20261106114144_shared_country_plans_and_contacts.sql` is applied. Hosted rollback verification passed without altering pre-existing rows.
- Earlier contact, accounts/quotes, draft-quota/default-privilege and client-column migrations remain applied. Preserve owner checks, immutable submitted/issued snapshots, trusted owner membership, explicit projections and least-privilege grants.
- Signup/sign-in, saved country-specific plans, quote requests and owner-priced proposals now serve both countries. There are no instant reservations or payments.
- Colombia links enter `/australia/account?country=colombia&region=<canonical-slug>`. Safe auth returns use unprefixed `next=/account?country=colombia&region=...`; arbitrary external destinations remain invalid.
- Country-aware contact validates that country's regions and records separate explicit updates consent. Colombia requires a stored receipt explicitly confirming Colombia; Australian consent compatibility is preserved.
- The old paused **AVES-Database** project `krzmqusxxrfljjkdbklx` and unused empty **AVES Colombia** replacement `gfxirgzvbpytgfffolhj` were **permanently deleted on 7 November 2026 (Sydney)** after explicit user confirmation. The project inventory and organization dashboard show only **AVES Shared Accounts** `qeyprwftrouztlqmwuzv`, active and healthy. Do not restore the superseded separate-Colombia migration plan.
- Post-retirement checks, before adding the catalogue, found **5 Auth users, 4 plans, 3 quote requests and 5 contacts** unchanged, with RLS on all **8 then-existing application tables**. After the catalogue migration, those customer-record counts remain unchanged; the database has **4 country rows, 20 region rows and 10 application tables, all with RLS enabled**.
- Applied catalogue migration: `20261106203926_extensible_destination_catalogue.sql`. Australia and Colombia are enabled; Ecuador and Costa Rica are disabled. Application/database registry parity is exact. Anonymous catalogue reads and authenticated catalogue writes are denied; contact-replay RPC access is service-only.
- Local migration filenames were aligned with the actual hosted versions `20261106105909`, `20261106105919` and `20261106114144`, with unchanged SQL hashes. Hosted migration history was not altered; do not reapply these migrations under their former filenames.

## Earlier destination-registry release verification — 7 November 2026 (Sydney)

- Release `9a7c03b`: **210 automated tests**, strict TypeScript checks and the production build passed; **24 static pages** were generated. All **6 local SQL verification suites** and the hosted destination-catalogue rollback verifier passed.
- Both `/` and `/australia` returned 200 after promotion. Unauthenticated plans, proposals and admin APIs returned 401 with private/no-store caching. Ecuador, Costa Rica and unknown-country contact submissions returned 400 with country validation errors; these checks created no records or emails.
- The live browser loaded saved plans and proposals after reload, preserving the owner session and showing the updated destination-editor copy. Reserved countries are not offered for new plans. Retiring a previously launched destination preserves owned same-country draft editing and exact stored-contact replay; keep its historical regions and consent version.
- The new deployment returned zero application-error records, with no excluded intervals, during `2026-11-06T20:32:49.855Z`–`2026-11-06T20:47:49.855Z` (7 November in Sydney). This is a bounded log check.

## Earlier cutover and email evidence — 6 November 2026

- **191 shared/Australia tests and 61 Colombia tests pass.** Both full strict type checks and production builds pass.
- Both original public releases, local/staged/public navigation and country-aware account entry were verified. The shared service has since been superseded by the 7 November release above.
- A controlled owner Colombia draft was saved, reloaded and verified with region `central-andes`; the exact temporary draft was deleted afterward using guarded SQL.
- A clearly labelled internal Colombia inquiry returned stored success and reached the owner's Gmail with country Colombia, `central-andes` and updates consent false. **One labelled internal test inquiry remains stored.**
- A probe of 34 public JavaScript bundles found only the shared Supabase host and no private-key patterns. Private APIs returned 401 without authentication, configuration probes returned 404 and security headers were verified. This is bounded evidence, not a comprehensive security guarantee.
- At 390px mobile width, country switching changed 9 Australian to 11 Colombian region choices, reset incompatible selection and showed no horizontal overflow.
- Vercel `CONTACT_FROM` and Supabase SMTP sender branding use AVES. SMTP persistence was verified after reload. Generic AVES auth templates retained their existing links; all four configured account-security alert switches persisted.
- After the verified cutover, 18 obsolete Colombia environment entries were removed; only its `NEXT_PUBLIC_SITE_URL` application setting remains. Automatic review blocked the earlier pre-cutover attempt, then allowed the safer retry. Colombia was rebuilt without those secrets. **Shared-app credentials were unchanged.**
- Environment removal does **not** revoke old external-provider keys. Any obsolete-key revocation requires its own dependency-aware review.

## Public content and routing

Australian content remains intact: twenty sourced bird profiles, genuine credited photographs, seventeen licensed recordings, nine regional guides and 39 local bird selections. Preserve accurate local versus wider range notes, introduced-species labels, missing recordings and user-initiated audio.

The fixed Next base path is `/australia`. Native assets/API requests use `sitePath`; internal Next links remain unprefixed. Native anchors cross between the separately deployed apps. Colombia forwards exact `/australia` and descendants to `https://aves-australia.vercel.app`, preserving the prefix. Do not remove those rules, broaden them over Colombia's assets/API or change DNS.

The Colombian public app has retired its old auth/profile/booking/document clients and mock checkout. It links to this maintained shared portal; legacy account paths redirect and old shopping links lead to personal inquiry.

## Remaining operational limits and next steps

- Supabase Free remains selected. Paid managed backups and leaked-password checking are not enabled. Establish an available export/recovery approach; backups must not be described as configured.
- Security-alert switches do not prove owner MFA enrollment. Complete or verify enrollment separately.
- Durable requests/proposals can have pending or failed notifications. Provider acceptance is not final delivery. Unchanged browser retries do not resend notifications; review and retry failures operationally. No unattended email retry worker is established.
- Preserve verified signup/recovery links, cookie/routing behavior and country-aware permissions in future changes. Never change the real owner's password during QA.
- Record future deployed commits/IDs only after successful public verification.

Contact: `mmelendro@gmail.com`. AVES is pursuing B Corp certification, not certified. Preserve the emerald palette, rounded cards and real bird media.

Use Node 22 and pinned pnpm 10.34.5: frozen install with lifecycle scripts disabled, tests, strict type checking and production build. Keep credentials, private environment files, customer data and hosting-auth files out of Git and chat; never print recovery tokens or disable package-integrity checks.
