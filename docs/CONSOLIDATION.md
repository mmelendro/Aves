# AVES-020: one application, staged cutover

## Current checkpoint

**Integration and read-only preview implemented. Production cutover is pending.** Review [draft PR #3](https://github.com/mmelendro/Aves/pull/3). Runtime commit: `7137d6089619c1cabcb8245aed7b8be9f83f65c5`. Ready Preview deployment: `dpl_FjVASappbNWdF1mo93YRAtHLmQnZ`, [preview URL](https://aves-australia-pg3jzdtd0-mmelendro-9273s-projects.vercel.app). Vercel authentication remains enabled. Request a fresh temporary share link in chat if needed; never commit the share token.

The owner authorized code integration and preview testing on 8 November 2026. Work is isolated to `integration/aves-unified-2026-11-08`. No production release, domain/DNS change, project rename, migration or project deletion is included in this checkpoint. The eco-tourism business plan remains to be created.

## Source inventory

| Source | Branch snapshot | Production application commit | Production deployment |
| --- | --- | --- | --- |
| Global, Colombia, NZ | `webmaster/readiness-2026-11-05` at `705fe200f8c73c13c7fef853853f77096e7f9591` | `f5eee01` | `dpl_BA2SbW56xbfkktQqPQw8TBHqQsje` |
| Australia, shared backend | `australia/preview` at `802422c4cc731488400a4debd598fff43b63cf3a` | `10554a3` | `dpl_4J7C7ecQeG2YovNNwYvbWHnH6QEX` |

The global tree has 498 tracked files and Australia 233, including 35 identical overlaps and 51 differing overlaps. Directly merging both roots would collide in app routes, catalogues, shared UI, middleware and configuration. The integration starts from the maintained global tree, adds Australia public code under a namespace, and brings the existing account/backend into the root. Stale `main` is not the base. Source migration history is preserved; no SQL is executed.

## Routing and content

| Established entry | Unified destination / implementation |
| --- | --- |
| `/`, `/colombia`, `/new-zealand` and existing global deep links | Existing root public routes |
| `/australia` and all Australian public deep links | Explicit `app/australia` routes, no Next basePath |
| `/account`, `/admin`, `/auth/*`, `/api/account/*`, `/api/admin/*` | Shared backend in this app |
| `/australia/account/*`, `/australia/admin/*` | Redirect to equivalent root portal path, preserving query; old proxy-header requests rewrite locally for compatibility |
| `/australia/auth/*` | Local rewrite to shared auth handlers, preserving existing provider/email callback URLs |
| `/australia/api/contact` | Local rewrite to `/api/inquiries`, retaining current request schema |
| `/australia/api/*` | Local rewrite to shared root API |
| `/api/contact` | Legacy Colombian payload adapter calling the shared inquiry handler locally |
| `/australia/shopping`, `/australia/calendar` | Australian enquiry page |
| `/australia/sitemap.xml`, `/australia/robots.txt` | Retained metadata endpoints |

Australia UI/catalogues live in `features/australia`; country `SiteLink` explicitly prefixes public paths and keeps portal links at root. Colombia and NZ content stay in their established locations. One cookie-preference provider, shared UI primitives and the maintained global bird viewer serve all countries. The global Australia viewer reuses the maintained Australian catalogue rather than a stale snapshot. Australia photos/audio retain `/australia/images/*` and `/australia/audio/*` URLs, attribution and licences.

Root sessions keep the existing `aves-auth` cookie at Path `/`. The one-time legacy `/australia/auth/session` bridge continues verifying older `aves-au-auth` cookies and preserving safe trip-return intent. Callback and API handlers continue independently validating credentials/ownership; routing is not authorization. No cross-project network proxy remains.

## Naming, branding and search

Public brand remains AVES and public domain remains `aves.bio`. Country bird/landscape marks and existing indexed country/deep URLs are preserved. Package name is `aves-web`; the retained production Vercel project should use the same neutral name at the separately reviewed cutover. Do not rename `aves-australia` yet: the currently published global app depends on its hostname.

The root sitemap combines 73 unique public URLs and retains the Australian subset endpoint. Private routes remain excluded. A shared public metadata helper keeps each page title, canonical and social URL aligned. It removes duplicate AVES suffixes, normalizes legacy AVES Tours metadata branding to AVES, preserves article images and gives missing descriptions page context. Country pages retain their distinct identity. Australia also keeps its country-specific social image/locale. Canonicals and structured-data image URLs use `https://aves.bio`, independent of the old Australia project's environment path. Preview robots and response headers discourage indexing. Infrastructure naming is for clarity, not a promise of search ranking gains.

Keep B Corp wording as pursuing certification, not certified. Preserve community attribution, media rights, explicit consent and wildlife guidance. No new business credentials, carbon claims, supplier promises or booking availability are inferred from consolidation.

## Build, configuration and review

Node.js 22, pinned pnpm 10.34.5, Next.js 15.5.29 and React 19.0.9 remain. Shared backend dependencies are the maintained pinned Supabase SSR/client, Resend and server-only versions. The reviewed dependency overrides and one pnpm lockfile are retained. The resizable UI wrapper now uses the installed library's current Group/Separator exports so strict TypeScript passes.

Git automatic deployments are disabled globally in `vercel.json`. Explicit API deployment of the exact integration commit to the existing `aves-australia` project's **Preview** environment avoids copying private service credentials or creating a second database. Production project settings and environment values are unchanged. Do not copy `.env.local` or `.vercel` into Git.

`VERCEL_ENV=preview` makes the review read-only: public inquiry handling and private mutating API requests return 503 before storage/email, auth confirmation/callback tokens are not redeemed, and browser auth/enquiry buttons are disabled. Normal production behaviour remains enabled. Do not promote this read-only preview artifact directly into production: create a separately approved production-target build so environment-specific guards and indexing are correct.

## Verification

* 345 automated tests and strict TypeScript pass. Both source suites and new routing, preview and metadata cases run with isolated database/auth/email doubles. No real enquiries or emails were sent.
* The Node 22 Vercel production build for the exact runtime commit above is READY as a **Preview** target. Git automatic deployments remain disabled.
* The final hosted check passed 81 GET requests. All 73 public sitemap pages return 200 with unique document titles, descriptions, matching canonical/Open Graph URLs, Twitter titles and no-index meta/headers. Both robots endpoints return plain text with preview crawling disallowed; both XML sitemaps work. Anonymous root and legacy Australian account/admin APIs return JSON 401 with `private, no-store` and no-index headers. See [the sanitized report](evidence/aves-unified-preview-review.json).
* Repeat the HTTP review with `scripts/verify-unified-preview.py`, passing the exact preview origin, temporary same-origin share link, commit and output path. It never submits forms, keeps access cookies only in memory and does not include share tokens/cookies in the report. It excludes SVG region titles when parsing document titles. The connector's fetch wrapper can mislabel an application 401 as deployment authentication; the direct authorized HTTP check verified the actual JSON response and headers.
* Browser review covered the global homepage, Colombia, Australia and NZ at 1363px and 340 CSS px. The narrow check used browser zoom with a short 234px CSS viewport, not mobile device emulation. No horizontal overflow or broken loaded country images appeared. Australian menu/keyboard/Escape worked; narrow discovery stacked media before maps and hid the desktop divider. At desktop, the divider changed from 50 to 52 by keyboard, bird changes updated the associated region, and details/credits remained available.
* NZ details opened as the preserved photo overlay; Escape closed it. Kea wishlist add/remove restored the original empty selection. The private-brief entry preserved NZ/South Island through the root sign-in URL. Sign-in fields were disabled for review. Audio playback state was stopped on bird change; no claim of independently hearing every recording is made.
* Browser UI evidence was captured on `251a18e`; the only subsequent runtime change was the legacy robots rewrite/removal of its unused nested metadata file. The exact later deployment passed the complete HTTP review. [Desktop screenshot](evidence/aves-unified-preview-desktop.png): Superb Fairywren photograph by JJ Harrison, [CC BY-SA 4.0 source](https://commons.wikimedia.org/wiki/File:Malurus_cyaneus_-_Sydney_Olympic_Park.jpg); map boundaries from Natural Earth, public domain. The screenshot crops the website viewport; source media and credits remain in the application.
* Production deployment listings still identify `dpl_BA2SbW56xbfkktQqPQw8TBHqQsje` and `dpl_4J7C7ecQeG2YovNNwYvbWHnH6QEX`. No production/domain/project rename, environment-value change, SQL migration or customer-data operation was performed.

Remaining release gates: real Google/email signup/recovery, existing-user session continuity, private save/reopen/edit/submission, enquiry persistence/authorized notification delivery and owner permissions need a separately bounded integration check using approved synthetic/test resources. The read-only preview intentionally cannot prove live writes. Physical phone/touch hardware and real guest journeys were not tested. Keep the PR in draft and do not directly promote the read-only preview.

## Cutover checklist, only after separate approval

1. Review the exact PR/commit and hosted preview. Recheck both source branch heads; integrate any newer approved work deliberately before release.
2. Complete the outstanding account/provider and persistence checks in an isolated approved test environment or controlled production-target test. Keep enquiries, consent, ownership/RLS and immutable submissions unchanged. No customer data is needed for layout review.
3. Record current `aves.bio`/`www` aliases, dependent URLs, environment targets, OAuth/email redirect allowlists and integrations. Preserve the two deployment IDs above as rollback anchors. Do not infer aliases from a deployment's READY status.
4. Select the one retained production project and future release branch. Reusing the Australia project preserves private integration configuration. Rename it `aves-web` only when dependent hostnames are safely replaced and the owner approves production cutover. No domain purchase or new paid service is required.
5. Build the reviewed integration commit with Production environment after approval. Verify indexing/metadata and that normal account/inquiry behaviour is enabled. Move production domains/aliases only as explicitly approved, then verify all three countries, deep routes, assets, callbacks, cookie handover, accounts, enquiries and owner access on the live domain.
6. If an essential journey fails, restore the exact prior domain/alias mapping and both production deployments. Do not roll back or delete customer records. Keep the old applications and backend available during observation.
7. After verified cutover and owner sign-off, designate one maintained application branch. Archive/retire the extra project only with explicit retirement approval and after its remaining hostnames/integrations are inventoried.

Other roadmap work remains paused. Do not create the business plan, add countries, redesign content or start supplier/AI/payment work merely because consolidation is underway.
