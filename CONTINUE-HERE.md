# AVES Australia and shared AVES portal — handoff, updated 8 November 2026 (Sydney)

## Current production — global account and carousel-first pages, 8 November 2026 (Sydney)

Repository: https://github.com/mmelendro/Aves. Keep the two independent branches/checkouts; do not merge them or re-enable automatic Git deployments.

| Application | Branch | Deployed application commit | Deployment |
| --- | --- | --- | --- |
| Global, Colombia and New Zealand | `webmaster/readiness-2026-11-05` | `8f9ccbd` | `dpl_4rQBp3MXEuSc729d1PiC1Yw3ooGM` |
| Australia and shared accounts | `australia/preview` | `21dc0ca` | `dpl_7X3mJw3HSNe1XrUUMFQaco2DS4uM` |

Exact builds: [Global/Colombia/New Zealand](https://v0-company-landing-page-rjoy6d0eg-mmelendro-9273s-projects.vercel.app) and [Australia/shared accounts](https://aves-australia-7dv0h69iq-mmelendro-9273s-projects.vercel.app). Both production builds were reviewed and promoted. Later documentation-only commits may advance branch heads.

- Footer wording follow-up: the Colombian footer now says **My Trips**, matching Australia; the shared account link is unchanged. Published and visually verified, with all 12 shared-account tests passing.
- My Trips now lives at **https://aves.bio/account**. Existing `/australia/account` links redirect with their country/region query preserved. Root account screens proxy the maintained Australian backend; callbacks/APIs/assets remain under `/australia`. Native account links avoid framework base-path conflicts. No database or hosting-provider configuration changed.
- Shared sessions now use root-path `aves-auth` cookies. The legacy-session bridge verifies before migrating, preserves pending PKCE callbacks, never overwrites a newer shared session, and uses a non-authentication loop guard. The real existing user session carried over and saved plans/proposals refreshed at `/account` after publication. See source `docs/shared-accounts.md` and Australian session migration tests.
- Bird carousels are now leading media across the global homepage, all three destination homepages, Colombian/Australian region guides, bird directories, experience pages and Colombian articles. NZ uses its existing 31-bird library in the hero; the global homepage has a sourced nine-bird selection across the three countries. Existing sounds, credits and compact whole-photo framing remain. Practical forms/account/legal screens remain task-focused.
- Public destinations: https://aves.bio/colombia, https://aves.bio/australia and https://aves.bio/new-zealand, selected from https://aves.bio/.
- Brand artwork and AVES link to the main homepage; each country subtitle links to its destination. The thinner lettering, country birds, landscape contours and global peregrine mark are retained.
- New Zealand now features **31 birds with photographs, local recordings, location/habitat notes and credits**, with particular depth for the South Island. The selector jumps to a species; the interactive map links North Island, South Island and Rakiura to their descriptions. This is a curated collection, not a complete checklist; eBird remains linked for wider records.
- Shared compact carousels preserve whole photographs, visible sound controls, image counters, species notes and attribution. Colombia has 22 featured birds (17 recordings); Australia has 20 (19 recordings). Every Colombian/Australian regional carousel and all four Colombian article carousels include sound. Five Colombian species and Gouldian Finch still lack a recording with suitable verified reuse rights; do not invent, misidentify or reuse NC recordings commercially.
- Public personal email has been replaced by contact links, including privacy/account/help links and error messages. Private notification delivery remains configured. Topic forms at `/australia/contact?topic=general`, `account`, `privacy`, `unsubscribe`, `partnership` and `new-zealand` use the maintained inquiry backend.
- Earlier completed content includes truthful author biography, removal of unverified testimonials, B Corp **pursuing/not certified** wording and land acknowledgements. Preserve these corrections.

### Accounts and remaining Google setup

My Trips is https://aves.bio/account, sharing one Supabase backend for Colombia/Australia. Existing owned saved plans and the issued QA proposal loaded and refreshed during this release work; anonymous private APIs rejected access with 401/no-store. No new customer records or email-delivery test were created for this release.

New Zealand remains public inspiration **in development**: it is not enabled in the shared booking/destination registry. Its inquiry topic sends a general message through the shared service; it must not create an Australian saved plan. Keep all private guest itinerary details out of public files and Git.

Google client/provider configuration exists in testing mode, but production `AVES_OAUTH_PROVIDERS` remains unset and social buttons stay hidden. The user requires `info@aves.bio` as Google's public support email. Restoring that Google Workspace mailbox and checking an actual subscription quote are pending a Google Admin passkey verification by the user. No mailbox subscription was purchased. Google sign-in still needs business support-address eligibility/configuration and a real end-to-end account test before activation. Facebook is deferred. See `docs/social-sign-in.md` in the Australian branch.

### Verification scope

8 November release: Australia 244 tests and source 69 tests pass, with strict TypeScript and both production builds passing. Browser review covered NZ, an article, the global home and an Australian region; a 390px NZ view had no horizontal overflow. Live checks covered seven public pages, both account entry URLs with preserved intent, signup/recovery/check-email screens, three anonymous private APIs (401/no-store), and a hostile redirect rejection. No forms or emails were sent. New audio files were decoded and sampled through browser controls; changing birds stops playback. Logo navigation was reviewed in both applications. Earlier HTTP/privacy checks covered 13 public pages, 43 client scripts, 2 stylesheets and three anonymous private endpoints; no personal Gmail was found in public output. The 8 November 390px browser check covers the NZ page; other historical mobile evidence below belongs to earlier releases.

Application secrets stay in private provider configuration and untracked environment files. The laptop is not required to serve production. Read both branch handoffs before editing from a new chat.

## Historical release notes

The following sections describe earlier releases and their original verification, not the current application version.

The shared account/backend for Colombia and Australia is now live. The two public websites retain separate applications and Git histories.

## Historical global homepage release — 7 November 2026 (Sydney)

Both deployments below were successfully promoted and verified publicly on 7 November 2026 (Sydney). Their application commits were also verified on GitHub. This was the original global homepage release; the newer release at the top supersedes it.

| Application | Branch | Released source | Live deployment |
| --- | --- | --- | --- |
| Australia + shared accounts | `australia/preview` | `1e9307e` handoff head; application changes `95d870f` | `dpl_3DtQzWEbCUmx3VoPGPcrZxhLDy1V` |
| Global AVES homepage + Colombia | `webmaster/readiness-2026-11-05` | `762c5db` | `dpl_A6t7gvcu6mUHHPQAVZYBioNhD3zk` |

- [Australia/shared-account exact deployment](https://aves-australia-edosdqart-mmelendro-9273s-projects.vercel.app).
- [Global/Colombia exact deployment](https://v0-company-landing-page-avggk27ga-mmelendro-9273s-projects.vercel.app).
- Preparation test results: **212 Australia/shared-account tests passed; 66 global/Colombia source tests passed**.
- GitHub branch heads were verified as `1e9307e` for [Australia/shared accounts](https://github.com/mmelendro/Aves/tree/australia/preview) and `762c5db` for [global/Colombia](https://github.com/mmelendro/Aves/tree/webmaster/readiness-2026-11-05). Later handoff-only commits may advance those branches without changing the deployed application code.

### Public structure at that release

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
