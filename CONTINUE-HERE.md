# AVES Australia and shared AVES portal — handoff, updated 8 November 2026 (Sydney)

## Current production — country-card carousels, 8 November 2026 (Sydney)

**AVES-011 is published, tested and synced to GitHub. Paused before the next change.** On https://aves.bio each destination card now has its own country bird carousel: Colombia 22, Australia 20, New Zealand 31. The existing mixed-country hero, country links and New Zealand development status are preserved. Compact 4:5 card frames reuse the established translucent controls and speaker highlight. Photo attribution follows each slide; details retain habitat, range, species sources and media credits. Card images are lazy, recordings load on request, and one call plays at a time across all homepage viewers.

| Application | Branch | Deployed application commit | Deployment |
| --- | --- | --- | --- |
| Global, Colombia and New Zealand | `webmaster/readiness-2026-11-05` | `c0589e6` | `dpl_HXvhwoUKBqY28WPEgbLMDwWRstBG` |
| Australia and shared accounts (unchanged build) | `australia/preview` | `5762603` | `dpl_2AhmDWLg3FbTMExao84Fz3ywJZ1B` |

[Main-site build](https://v0-company-landing-page-iztcjducp-mmelendro-9273s-projects.vercel.app). The source release passed 18 homepage/sitemap checks, strict TypeScript and the Vercel production build. Local and live browser checks covered independent navigation/credits, calls for all three countries, single-call playback, keyboard navigation and narrow-phone stacking without horizontal overflow. The missing Australian recording is disabled. All 39 Australian photo/audio URLs returned 200 with correct media types. Country homepages returned 200, and a real browser visit to /account reached the existing shared sign-in page with Google available. No account, provider, database or customer data changes were made. Existing Google AVES branding and info@aves.bio support are preserved.

Edit `components/destination-card-media.tsx` and `content/destination-birds.ts` in the main branch for card composition/collections; `components/homepage-bird-carousel.tsx` keeps default country-page proportions and adds the compact card variant. `content/global-australian-birds.json` is a public metadata snapshot of the Australian original/expansion catalogues; media/licences remain on /australia. Refresh that snapshot if the Australian collection changes. The shared destination catalogue remains small, and future countries without a bird library keep an attributed photo fallback.

Evidence: workspace `audit/evidence/nov8-global-country-carousels-desktop.png` and `nov8-global-country-carousels-mobile.png`. Planning files are mirrored across the independent branches. Documentation commits can advance branch heads without redeploying runtime code; automatic Git deployment stays disabled. Remaining features are in the living brief and inbox. Do not start another increment until the owner resumes.

## Historical production — verified Google AVES branding, 8 November 2026 (Sydney)

**Google branding is verified, published and observed live. Paused before the next change.** Google now shows the AVES name and existing global peregrine logo. Its Developer info panel lists `info@aves.bio` as support. No additional paid feature/subscription, credential or permission grant was added. The optional new Search Console/DNS ownership question became obsolete after Google's automated check succeeded; do not act on a later answer to it.

| Application | Branch | Deployed application commit | Deployment |
| --- | --- | --- | --- |
| Global, Colombia and New Zealand | `webmaster/readiness-2026-11-05` | `e2a53a4` | `dpl_JK4rqnJ851jveirHoQ46tQZt7gDU` |
| Australia and shared accounts | `australia/preview` | `5762603` | `dpl_2AhmDWLg3FbTMExao84Fz3ywJZ1B` |

Both privacy notices now describe optional Google identity data, permitted uses, service-provider processing, revocation and deletion requests. Both production builds passed; live `/privacy` and `/australia/privacy` returned 200 with the disclosure, and the homepage links to the exact configured privacy URL. Existing Google login, `/account` routing, basic scopes, database ownership protections and email/password access were preserved. No new accounts, trips, bookings or messages were created during branding verification. Google sign-in remains enabled; Facebook remains deferred.

[Main-site build](https://v0-company-landing-page-k57r1yoc9-mmelendro-9273s-projects.vercel.app) · [shared-account build](https://aves-australia-dou3r6fo5-mmelendro-9273s-projects.vercel.app). Documentation commits may advance branch heads without changing application builds. Git auto-deployment stays disabled. Full setup/proof details: [social-sign-in.md](https://github.com/mmelendro/Aves/blob/australia/preview/docs/social-sign-in.md). The existing mailbox subscription remains the previously approved CAD $11/month plus tax; branding introduced no new billing change.

Evidence is kept privately in workspace `audit/evidence/`. All other roadmap work remains queued. The friendlier landing for provider-expired state remains a separately scoped follow-up; do not start it until the owner resumes work.

## Historical Google sign-in release, 8 November 2026 (Sydney)

**Published, verified and paused after AVES-009.** Do not start another backlog item without the owner's next instruction.

| Application | Branch | Deployed application commit | Deployment |
| --- | --- | --- | --- |
| Global, Colombia and New Zealand | `webmaster/readiness-2026-11-05` | `98bb838` | `dpl_HZhcaPwoRZP67fumjvaV4k3Ymkyq` |
| Australia and shared accounts | `australia/preview` | `4600240` | `dpl_BzjBrpRJNjJCXcgx1kMMUJqyUS21` |

Google sign-in is live at [the shared account](https://aves.bio/account/sign-in) and signup. Google's public support email is `info@aves.bio`; the owner approved its limited OAuth Config Editor access and restoration of one Workspace Business Starter mailbox licence at CAD $11/month plus tax on the flexible plan. Licence assignment was verified; external mailbox delivery was not independently retested. Facebook remains deferred and hidden. Provider credentials stay only in Supabase, outside GitHub/browser code. Production `AVES_OAUTH_PROVIDERS=google` contains a provider name, not a credential.

The existing owner account loaded its existing saved test plan/proposal after live Google login. Australia/Tasmania prefill, session persistence after reload and sign-out passed. Local fresh/returning login, Colombia/Central Andes and a synthetic cancellation callback also passed. The 68 relevant automated cases, strict TypeScript and the production build passed. Signup/recovery visibility and public country/privacy/terms checks passed. No error/fatal entries were returned by the new deployment's 15-minute runtime scan. No customer plans, quotes or bookings were created by these tests. The two temporary local test callback rules were removed.

[Exact deployed account build](https://aves-australia-f4ohjtv3a-mmelendro-9273s-projects.vercel.app). The global application was not redeployed; its existing `/account` proxy serves the updated backend. Git auto-deployment remains disabled. Documentation-only commits may advance branch heads beyond the deployed application commits.

Google still displays the Supabase Auth hostname: AVES brand/display-name verification is not complete. An expired provider state before the website callback may still land on the existing Australian fallback page; a friendlier stale-link landing is a follow-up. Fresh login is verified; do not treat these follow-ups as an unimplemented login feature. Email/password remains available, but new email delivery and a second Google identity were not independently exercised in this release. Details: [Google setup record](https://github.com/mmelendro/Aves/blob/australia/preview/docs/social-sign-in.md).

The existing speaker highlight and Santa Marta editorial pilot remain published. Homepage carousels, matching explorer cards, the world map, richer region libraries and itinerary features remain queued in the living brief/change inbox. Workspace evidence: `audit/evidence/google-sign-in-live-2026-11-08.png` and `google-sign-in-release-checks-2026-11-08.json`.

## Historical Santa Marta editorial pilot, 8 November 2026 (Sydney)

**Paused after the completed incremental release.** The homepage country-card carousel and explorer-style requests were added to planning only; do not start another batch without the owner's next instruction.

| Application | Branch | Deployed application commit | Deployment |
| --- | --- | --- | --- |
| Global, Colombia and New Zealand | `webmaster/readiness-2026-11-05` | `98bb838` | `dpl_HZhcaPwoRZP67fumjvaV4k3Ymkyq` |
| Australia and shared accounts | `australia/preview` | `f635b97` | `dpl_BLcQrh1yCEYqmEnSVB8w7xJkjBWo` |

Published source build: [Global/Colombia/New Zealand](https://v0-company-landing-page-kv1r3zmia-mmelendro-9273s-projects.vercel.app). Australia's existing speaker-highlight build remains live; its changes this increment are documentation only. Later handoff commits may advance branch heads without changing application builds.

- AVES-001a is complete: [Santa Marta's regional guide](https://aves.bio/regions/sierra-nevada-de-santa-marta) presents the three featured birds' shared range once above their habitat cards. Each card has a shorter, distinct local note; the carousel retains the complete species range, recording availability and existing credits/sources.
- `sharedBirdRange` in `content/regions.ts` identifies exactly which bird IDs the paragraph covers. Only those cards omit their repeated range paragraphs. Other regions and future birds outside that list retain their wider-range notes. The bird catalogue, photos and recordings were not replaced. See `content/README.md` for the field contract.
- Strict TypeScript, 16 relevant sitemap/global-home tests and the source production build passed. The exact build was reviewed before promotion. Staged browser review confirmed the shared paragraph, three habitat cards, full carousel range detail and Central Andes' four individual range notes. Live browser/HTTP checks confirmed the same after promotion; a 390px view had 376px content width and no sideways overflow. The initial immediate HTTP read still showed old content during the domain switch; a fresh check passed once the new page was serving.
- Evidence: `audit/evidence/nov8-santa-marta-editorial-live.png` and `audit/evidence/nov8-santa-marta-editorial-live-checks.json` in the workspace. Existing reserve sources were reviewed for context; this reorganised existing catalogue facts rather than adding a new species batch. The large tourism PDF could not be refetched through the web tool because of its size; its existing source link remains available.
- The remaining whole-site editorial work is still AVES-001, not declared complete. AVES-011 queues country-specific carousels in global destination cards. AVES-012 queues visual alignment of the bird/map and map/subregion explorers using the owner's Australian reference screenshots. See the [living brief](docs/NEXT-WEEK-PROMPT.md) and [inbox](docs/AVES-CHANGE-INBOX.md).

Historical sections below describe previous versions and their own verification.

## Historical speaker-highlight release, 8 November 2026 (Sydney)

**Paused at the owner's explicit request after publishing this single incremental release.** Do not start the next backlog item until the owner resumes it.

| Application | Branch | Deployed application commit | Deployment |
| --- | --- | --- | --- |
| Global, Colombia and New Zealand | `webmaster/readiness-2026-11-05` | `c515cf3` | `dpl_xUegpwZqUpjMBjtaLUS1MHVtbh9d` |
| Australia and shared accounts | `australia/preview` | `f635b97` | `dpl_BLcQrh1yCEYqmEnSVB8w7xJkjBWo` |

Exact builds: [Global/Colombia/New Zealand](https://v0-company-landing-page-9m0aks8jb-mmelendro-9273s-projects.vercel.app) and [Australia/shared accounts](https://aves-australia-pmrwsjjsl-mmelendro-9273s-projects.vercel.app). Both READY builds were reviewed and promoted. Application source is synced to GitHub; later documentation-only commits may advance the branch heads.

- AVES-008 is complete: available bird recordings have a quiet emerald-tinted speaker button, pale emerald border and static soft halo. Playback uses a brighter green fill. Missing recordings keep the muted disabled control. Spoken labels, focus treatment, click-to-play behaviour and the existing carousel/map layout are preserved.
- This is a styling-only change in each shared `homepage-bird-carousel.tsx`. No new dependencies, motion, media, database/provider changes or account work. `buttonClassName` styles the actual icon button while the existing `className` continues to position its wrapper.
- Strict TypeScript checks and both production builds passed. Staged browser checks covered the available style, Gouldian Finch's disabled/unhighlighted missing recording, NZ mobile appearance without sideways overflow, keyboard playback reaching readyState 4 and advancing, brighter playing state, and bird navigation stopping audio/resetting time to zero. Pointer activation was also checked at desktop width. No physical touch-device or foldable-hardware test is claimed.
- Final public HTTP checks returned 200 and highlighted available speaker markup at `/`, `/colombia`, `/new-zealand` and `/australia`. A live NZ browser check confirmed the intended background, border, halo and no animation. Evidence in the workspace: `audit/evidence/nov8-speaker-highlight-live-checks.json` and `audit/evidence/nov8-speaker-highlight-mobile-live.png`. Backend/email write tests and the broad prior test suites were not repeated for this cosmetic release.
- All other work remains in the [living brief](docs/NEXT-WEEK-PROMPT.md) and [change inbox](docs/AVES-CHANGE-INBOX.md). Google activation, editorial cleanup, new regional pages, adjustable panels and the planning app remain pending.

## Historical paired discovery-header release, 8 November 2026 (Sydney)

Both final builds are published and their source is on GitHub. The two applications remain independent; automatic Git deployment remains disabled.

| Application | Branch | Deployed application commit | Deployment |
| --- | --- | --- | --- |
| Global, Colombia and New Zealand | `webmaster/readiness-2026-11-05` | `4dfa50e` | `dpl_6kShjStz2CLwzhkHRb2ZMrSQRCL3` |
| Australia and shared accounts | `australia/preview` | `b2efc9e` | `dpl_7sXkLSfk5kZ4cUtBFVRsjoNLhBhX` |

Exact published builds: [Global/Colombia/New Zealand](https://v0-company-landing-page-hupvo43ol-mmelendro-9273s-projects.vercel.app) and [Australia/shared accounts](https://aves-australia-g7b78u452-mmelendro-9273s-projects.vercel.app). Documentation-only commits may advance branch heads.

- Matching vertical map and photo cards now share top/bottom alignment on country homepages and the selected public discovery, regional, experience and article headers. User explicitly chose this scope; contact, policy and account screens keep their practical layouts. At widths below 44rem, bird media precedes a separate naturally sized map card. Wider viewport layouts include unfolded phones when enough space is available. Real hinged/foldable hardware was not tested.
- `components/country-hero-explorer.module.css` defines the pair. Container units derive map height from column width, including the photo card borders. Keep country geography undistorted. A shared `BirdDiscoveryContext` lets server-supplied regional/article carousels report their bird to the nearby map. Each page keeps its existing species list and local occurrence notes; regional headers start with the correct region.
- Colombia's selected region has a persistent, named pointing callout and ring. Manual dropdown selections override the bird suggestion and remain selected; other marker titles appear on hover/focus. All 11 Colombian regions and 9 Australian region links remain accessible; Australia's expanded list scrolls inside the paired card. The three NZ island links have larger vertical targets.
- Validation: 69 source and 244 Australian tests passed during this work, with strict TypeScript and both final production builds passing. Browser review covered all three country headers at desktop, NZ/Australia at 720px, all three at 390px, a Colombian article and region, a Colombian experience, and Tasmania's regional guide. Country card heights differed by less than one CSS pixel at tested paired widths. Narrow layouts had no sideways overflow and media preceded maps. All nine Australian text links remained available; Tasmania opened its actual guide. Colombia selection callouts were checked interactively. Sixteen live public/account/privacy HTTP checks passed again after final publication. No forms, records or emails were submitted; backend/provider/database configuration was untouched.
- Pending work is now combined in [NEXT-WEEK-PROMPT.md](docs/NEXT-WEEK-PROMPT.md): homepage world map, editorial cleanup, wider Colombian regional bird coverage, bird wishlist/optional bingo, and a phased sustainable itinerary/supplier application. These features are planning only and were not implemented today. Keep personal pilot plans and guest/operator details private. The global homepage world map remains pending, not part of the completed country header rollout.

Read the retained architecture/security and beginner guides below. Earlier release-specific verification belongs to its own version.

## Historical portrait-carousel release and beginner documentation, 8 November 2026 (Sydney)

**Status: GitHub synced; both exact builds READY, preview-reviewed and successfully promoted; 16 live HTTP/account/privacy checks passed.** This release supersedes application commits `73cc370` (global/Colombia/New Zealand) and `0f1a113` (Australia/shared accounts); their deployments remain in the historical section below.

Repository: [mmelendro/Aves](https://github.com/mmelendro/Aves). Keep the two independent branches/checkouts; do not merge them or re-enable automatic Git deployments. A GitHub push preserves source online but does not automatically publish this site.

| Application | Branch | Deployed application commit, pushed to GitHub | Production deployment |
| --- | --- | --- | --- |
| Global, Colombia and New Zealand | `webmaster/readiness-2026-11-05` | `43ca96d` | `dpl_J93NVgfCNAKVKXCKHR1vbtegU94Q` |
| Australia and shared accounts | `australia/preview` | `ed19223` | `dpl_3ks99DHJcQtLUUy7G6v1S3fNtGGF` |

Exact published builds: [Global/Colombia/New Zealand](https://v0-company-landing-page-bboqohxzg-mmelendro-9273s-projects.vercel.app) and [Australia/shared accounts](https://aves-australia-jrtms5bdy-mmelendro-9273s-projects.vercel.app). Both completed successfully, were reviewed in preview and were promoted to production. Later documentation-only commits may advance branch heads without changing these application builds.

### What changed in this release

- The shared bird viewer now uses one **9:16 portrait image, capped at 320 CSS pixels wide**, filled edge to edge with `object-cover`. Landscape photographs are intentionally cropped; per-species `imagePosition` focal points keep the important subject in view where possible. There is no duplicated blurred backdrop. Earlier whole-photo framing described in historical notes no longer describes the current release.
- Three discreet translucent controls sit over the image: slideshow, sound, and one species-details/credits control. The single information panel includes range/habitat, source links, New Zealand's species picker when enabled, and expandable media credits. One previous/next pair and an image counter remain; extra sliders/thumbnail rails do not return. Accessible names, hover/focus labels, swipe/keyboard operation, reduced-motion handling and visitor-initiated sound are preserved.
- The cached-image loading check now recognizes an image that finished before React's normal load callback. Moving to another bird stops the previous recording. All original factual notes and attribution remain associated with their species.
- Country headings sit above a quieter map-and-photo composition, with the map on the left and portrait carousel on the right at desktop width. Mobile presents the heading, photo, then map. Lighter heading typography, calmer map colours, and warm journey/planning sections retain the AVES visual family while reducing visual clutter. Global/discovery/article hero layouts retain their text/media relationship.
- All 11 Colombian regions, 9 Australian regions and 3 New Zealand islands remain accessible. A map highlight indicates the displayed bird's featured planning area, not its entire distribution or a guaranteed sighting. Map interaction and regional inquiry links remain available.
- Beginner documentation and comments now explain module roles, public function inputs/results, significant UI sections, and less obvious state/authentication/data-flow decisions. This is meaningful coverage, not a claim that every line is commented. Repeated controls, static records, generated material and immutable migrations have companion guides rather than repetitive inline notes.

### Start reading or editing here

1. [README](README.md) and [beginner's guide](docs/BEGINNERS-GUIDE.md): applications, branches, folders, syntax and safe first edits.
2. [Frontend code tour](docs/frontend-code-tour.md): which page/component creates each visible section and how photo/map interactions work.
3. [Public content guide](content/README.md), [shared UI guide](components/ui/README.md), and [test guide](tests/README.md): bird/media records, reusable controls and verification scope.
4. [CONTRIBUTING](CONTRIBUTING.md): local setup, checks, independent branches and deliberate deployment workflow.
5. [Backend code tour](docs/backend-code-tour.md) and [Supabase schema/migration guide](supabase/README.md): browser/server boundaries, shared accounts, saved plans, quotes, email outcomes and database permissions.

### Verification of this publication

- **69 source tests and 244 Australian tests passed**, together with strict TypeScript checks and successful production builds in both applications.
- Review of **253 changed TypeScript/JavaScript files** compared normalized syntax trees with the prior commits and compiled JSX-comment differences. Runtime changes were confined to the agreed design/carousel/map/homepage/focal-point files and source global-home test. Account/authentication/backend behavior was unchanged; migration SQL was not edited.
- Local 390px browser review found no sideways overflow on New Zealand or Australia. New Zealand recording playback advanced and stopped when changing birds. Staged desktop New Zealand/Australia layouts were reviewed. Live Colombia at 390px also had no sideways overflow (376px content width); its photograph loaded at approximately 318 x 566px. Evidence: `audit/evidence/nov8-portrait-colombia-mobile-live.png` in the workspace. These checks do not claim a full device matrix.
- **16 live HTTP/account/privacy checks passed** after promotion; recorded in workspace `audit/evidence/nov8-live-account-checks.json`. The live signed-in `/account` page loaded the existing owned QA plan and issued proposal. Clicking **Refresh Saved Plans** completed successfully: loading ended, the QA plan and issued proposal remained visible, and the refresh button was enabled again.
- Documentation links were checked. No forms or emails were sent, and no database or provider configuration was changed for this release. Stored-write and email-delivery flows were not retested as part of these design/documentation changes.

### Retained public structure and account constraints

Public destinations remain [Colombia](https://aves.bio/colombia), [Australia](https://aves.bio/australia), and [New Zealand](https://aves.bio/new-zealand), selected from [the AVES homepage](https://aves.bio/). The bird/AVES logo area returns to the global homepage and the country subtitle returns to its country home. Thin lettering, country birds, landscape contours and the global peregrine mark remain.

[My Trips](https://aves.bio/account) is the shared public account address. Root account screens forward to the maintained Australian implementation; callbacks, APIs and assets remain under `/australia`. Legacy `/australia/account` links redirect while preserving country/region intent. Root-path `aves-auth` cookies and the verified legacy-session bridge support the shared session. Preserve this routing and the independent API/database ownership checks.

New Zealand remains public inspiration **in development**, not an enabled saved-trip destination. Its general inquiry topic uses the existing shared contact service; it must not silently create an Australian saved plan. Private guest itineraries stay out of public content and Git. Colombia and Australia continue to share the existing account/database system; adding a country requires the coordinated catalogue/content process, not another database.

The featured collections remain Colombia 22 birds (17 recordings), Australia 20 (19 recordings), and New Zealand 31 with local recordings. Missing calls must remain unavailable until suitable verified reuse rights exist; do not substitute species or use noncommercial-only media commercially. Existing truthful biography, unverified-testimonial removals, B Corp pursuing/not-certified wording, land acknowledgements and public contact links are retained.

Last recorded Google setup remains pending: the provider/client exists in testing mode, social buttons remain hidden, and the user wants `info@aves.bio` as the public support address. Workspace restoration, support-address eligibility and a real end-to-end Google sign-in test need completion before activation; Facebook is deferred. This design/documentation release does not resolve that setup or purchase a mailbox subscription. See the Australian social-sign-in guide.

Application secrets remain in private provider settings and untracked environment files. A saved request is not a booking, an issued proposal is not a payment, and email-provider acceptance is not proof of delivery. No new backup/MFA/provider-security verification is claimed here. The laptop is not required to serve the published production website.

## Historical release notes

The following sections preserve earlier releases and their original verification. Their whole-photo/blurred-backdrop descriptions and old account URLs are historical, not instructions for the current release.

## Historical compact-carousel production release — earlier 8 November 2026 (Sydney)

Repository: https://github.com/mmelendro/Aves. Keep the two independent branches/checkouts; do not merge them or re-enable automatic Git deployments.

| Application | Branch | Deployed application commit | Deployment |
| --- | --- | --- | --- |
| Global, Colombia and New Zealand | `webmaster/readiness-2026-11-05` | `73cc370` | `dpl_EtLQaJrYkig4jPAwXXmeH8Lgh8aP` |
| Australia and shared accounts | `australia/preview` | `0f1a113` | `dpl_6bA4V98aPdGvubMmud9LiUGgx2dS` |

Exact builds: [Global/Colombia/New Zealand](https://v0-company-landing-page-2hsa23047-mmelendro-9273s-projects.vercel.app) and [Australia/shared accounts](https://aves-australia-9jrueh9s8-mmelendro-9273s-projects.vercel.app). Both production builds were reviewed and promoted. Later documentation-only commits may advance branch heads.

- Latest refinement: centred destination headings above a smaller clickable map on the left and larger bird carousel on the right; mobile shows heading, carousel, then map. All 11 Colombian regions, 9 Australian regions and 3 NZ islands remain accessible. Map highlights follow the displayed bird's existing featured-area metadata, not a complete species range or promised sighting.
- Carousels now use translucent icon controls over the image, one previous/next pair and a small image counter. Removed external navigation bars, thumbnail rails and volume slider. Hover/focus labels, accessible names, swipe, keyboard controls and opt-in sound remain. Details, NZ's species picker and credits open on demand. Whole photographs sit over a muted blurred version of the same image. Global home, shared discovery-page layout and article heroes put text left and photos right.
- This refinement passed 69 source tests, 244 Australian tests, strict TypeScript and both production builds. Desktop and 390px browser review covered all three countries, map navigation, sound advancing then resetting on bird change, NZ selector retention, article credits and the global homepage. No sideways overflow on the three phone layouts. The 16 live public/account/security checks passed again after promotion. No backend, credentials, customer records or email settings changed. Evidence is in the workspace audit/evidence directory, including nov8-compact-nz-live.png.

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
