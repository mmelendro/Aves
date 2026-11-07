# AVES global homepage and Colombia — handoff, updated 7 November 2026 (Sydney)

## Current production — bird library and logo navigation, 7 November 2026 (Sydney)

Repository: https://github.com/mmelendro/Aves. Keep the two independent branches/checkouts; do not merge them or re-enable automatic Git deployments.

| Application | Branch | Deployed application commit | Deployment |
| --- | --- | --- | --- |
| Global, Colombia and New Zealand | `webmaster/readiness-2026-11-05` | `37379ca` | `dpl_8w1BMucTS94h3f6vHXZrhLXc13Ps` |
| Australia and shared accounts | `australia/preview` | `8c13ed1` | `dpl_8FafCYo3utohyHvWjPgtMt7ydE6D` |

Exact builds: [Global/Colombia/New Zealand](https://v0-company-landing-page-ori09kvl7-mmelendro-9273s-projects.vercel.app) and [Australia/shared accounts](https://aves-australia-jfpy00jig-mmelendro-9273s-projects.vercel.app). Both production builds were reviewed and promoted. Later documentation-only commits may advance branch heads.

- Public destinations: https://aves.bio/colombia, https://aves.bio/australia and https://aves.bio/new-zealand, selected from https://aves.bio/.
- Brand artwork and AVES link to the main homepage; each country subtitle links to its destination. The thinner lettering, country birds, landscape contours and global peregrine mark are retained.
- New Zealand now features **31 birds with photographs, local recordings, location/habitat notes and credits**, with particular depth for the South Island. The selector jumps to a species; the interactive map links North Island, South Island and Rakiura to their descriptions. This is a curated collection, not a complete checklist; eBird remains linked for wider records.
- Shared compact carousels preserve whole photographs, visible sound controls, image counters, species notes and attribution. Colombia has 22 featured birds (17 recordings); Australia has 20 (19 recordings). Every Colombian/Australian regional carousel and all four Colombian article carousels include sound. Five Colombian species and Gouldian Finch still lack a recording with suitable verified reuse rights; do not invent, misidentify or reuse NC recordings commercially.
- Public personal email has been replaced by contact links, including privacy/account/help links and error messages. Private notification delivery remains configured. Topic forms at `/australia/contact?topic=general`, `account`, `privacy`, `unsubscribe`, `partnership` and `new-zealand` use the maintained inquiry backend.
- Earlier completed content includes truthful author biography, removal of unverified testimonials, B Corp **pursuing/not certified** wording and land acknowledgements. Preserve these corrections.

### Accounts and remaining Google setup

My Trips remains https://aves.bio/australia/account, sharing one Supabase backend for Colombia/Australia. Existing owned saved plans and the issued QA proposal loaded and refreshed during this release work; anonymous private APIs rejected access with 401/no-store. No new customer records or email-delivery test were created for this release.

New Zealand remains public inspiration **in development**: it is not enabled in the shared booking/destination registry. Its inquiry topic sends a general message through the shared service; it must not create an Australian saved plan. Keep all private guest itinerary details out of public files and Git.

Google client/provider configuration exists in testing mode, but production `AVES_OAUTH_PROVIDERS` remains unset and social buttons stay hidden. The user requires `info@aves.bio` as Google's public support email. Restoring that Google Workspace mailbox and checking an actual subscription quote are pending a Google Admin passkey verification by the user. No mailbox subscription was purchased. Google sign-in still needs business support-address eligibility/configuration and a real end-to-end account test before activation. Facebook is deferred. See `docs/social-sign-in.md` in the Australian branch.

### Verification scope

Australia: 229 automated tests and strict TypeScript pass. Source: full existing test suite, strict TypeScript, the expanded media inventory and production build were checked before release. New audio files were decoded and sampled through browser controls; changing birds stops playback. Logo navigation was reviewed in both applications. Earlier HTTP/privacy checks covered 13 public pages, 43 client scripts, 2 stylesheets and three anonymous private endpoints; no personal Gmail was found in public output. The historical 390px mobile check below predates this release; a fresh mobile viewport could not be verified in the available browser and must not be claimed.

Application secrets stay in private provider configuration and untracked environment files. The laptop is not required to serve production. Read both branch handoffs before editing from a new chat.

## Historical release notes

The following sections describe earlier releases and their original verification, not the current application version.

The shared AVES account and country-aware inquiry system are now live. Colombia and Australia remain separate public applications, using one account/backend.

## Historical global homepage release — 7 November 2026 (Sydney)

Both deployments below were successfully promoted and verified publicly on 7 November 2026 (Sydney). The application commits were also verified on their GitHub branches. This was the original global homepage release; the newer release at the top supersedes it.

| Application | Branch | Released source | Live deployment |
| --- | --- | --- | --- |
| Global AVES homepage + Colombia | `webmaster/readiness-2026-11-05` | `762c5db` | `dpl_A6t7gvcu6mUHHPQAVZYBioNhD3zk` |
| Australia + shared accounts | `australia/preview` | `1e9307e` handoff head; application changes `95d870f` | `dpl_3DtQzWEbCUmx3VoPGPcrZxhLDy1V` |

- [Global/Colombia exact deployment](https://v0-company-landing-page-avggk27ga-mmelendro-9273s-projects.vercel.app).
- [Australia/shared-account exact deployment](https://aves-australia-edosdqart-mmelendro-9273s-projects.vercel.app).
- Preparation test results: **66 source tests passed; 212 Australia/shared-account tests passed**.
- GitHub branch heads were verified as `762c5db` for [global/Colombia](https://github.com/mmelendro/Aves/tree/webmaster/readiness-2026-11-05) and `1e9307e` for [Australia/shared accounts](https://github.com/mmelendro/Aves/tree/australia/preview). Subsequent handoff-only commits may advance those branches without changing the application deployments.

### Public structure at that release

- `https://aves.bio/` is the main AVES destination chooser, using the existing emerald palette, rounded cards and credited real bird photographs.
- `https://aves.bio/colombia` retains the Colombian homepage, including its bird carousel, region links and trip form. Colombian deep links such as `/regions/...`, `/aves-explorer`, `/tours` and `/contact` retain their established paths.
- `https://aves.bio/australia` remains the Australian homepage. Country navigation returns to the main destination chooser or directly switches country using native links across applications.
- `https://aves.bio/australia/account` remains the one shared My Trips portal. Country/region presets and existing saved plans and proposals are preserved.
- `/site-map` uses global navigation and distinguishes the main homepage, Colombia pages and Australian site map. Both XML sitemaps remain discoverable.
- Public country choices come from `content/destinations.ts` in this branch. Adding a public card does not enable a backend country: first follow the shared destination-registry release guide linked below. Ecuador and Costa Rica remain disabled and have no launched public cards.
- `762c5db` corrects remaining Colombian contact-section links after moving that homepage to `/colombia`; do not restore root `/#contact` assumptions.

### Verification of this publication

- **13/13 public HTTP checks passed**: main homepage, Colombia, Australia and site map returned 200 with the correct canonical destinations; both destination photographs returned 200. XML sitemaps contained **40 root/Colombia entries and 32 Australian entries**, unique and excluding private routes. Legacy Colombian contact links resolve to `/contact`.
- Three anonymous private API checks returned **401** with **private, no-store** caching.
- Live browser navigation from the global homepage to Colombia worked; Colombia's **22-bird carousel** advanced, and its My Trips entry preserved `country=colombia` in the shared portal.
- Existing owned QA trip data and an issued proposal loaded in My Trips; **Refresh Saved Plans** was verified. Generic account links from the main homepage and Australia worked, and **All Destinations** returned to the main homepage.
- Australia's **20-bird carousel** advanced. Selecting Tasmania on the map opened `/australia/contact?region=tasmania` with Tasmania selected.
- At a live **390px mobile viewport**, both country quick choices were visible above the fold, all main images loaded and document width was **376px**, with no horizontal overflow. The full desktop screenshot was also reviewed. Local workspace evidence is retained in `audit/evidence/global-home-mobile-2026-11-07.png` and `audit/evidence/global-home-desktop-2026-11-07.png`; these workspace files are outside this repository checkout.
- No browser errors were observed during these checks. This is scoped verification, not a guarantee that all defects are excluded.
- This publication made **no database changes** and submitted **no new drafts or emails**. Earlier controlled submission/delivery evidence is retained below; those write/delivery flows were not repeated for this navigation release.

Database retirement update: **7 November 2026 (Sydney)**. Both unused projects were permanently deleted with the user's explicit confirmation; the shared project is the sole remaining Supabase project.

Future destinations: the shared country/region registry is **live and verified on 7 November 2026 (Sydney)** in the Australia/shared service. Follow [Adding an AVES destination](https://github.com/mmelendro/Aves/blob/australia/preview/docs/adding-destinations.md). Ecuador and Costa Rica remain disabled placeholders, not launched offerings. New destinations reuse the existing accounts/database and require reviewed configuration, migration and public-content releases; there is no country-management admin screen.

## Last verified production before the global homepage release

The releases below are retained as historical evidence and rollback references. The current release above supersedes them.

- Repository: https://github.com/mmelendro/Aves.
- Colombia branch and verified Vercel production branch: `webmaster/readiness-2026-11-05`.
- Colombia project: `mmelendro-9273s-projects/v0-company-landing-page`.
- **Pre-global Colombia code: `731c871`; deployment: `dpl_G5yHCqQ5PXfk1KVJHMvBamH6hC9k`.**
- Public: https://aves.bio/. Exact deployment: https://v0-company-landing-page-ltdx9ntqo-mmelendro-9273s-projects.vercel.app.
- This final Colombia deployment was rebuilt and promoted after obsolete environment removal. It supersedes the earlier same-code deployment and all previous redesign/hotfix releases.
- **Pre-global Australia/shared portal code: `9a7c03b`; deployment: `dpl_6CaX82WY4M5qvChywSLuMtZNoKth`.**
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

## Earlier destination-registry release verification — 7 November 2026 (Sydney)

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
