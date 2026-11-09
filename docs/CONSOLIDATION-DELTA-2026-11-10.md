# AVES consolidation change assessment

Reviewed 10 November 2026, Sydney. C0 assessment is complete.

The existing AVES-020 draft is a useful foundation, but it is too old to replace either published application. Refresh it in bounded integration checkpoints. Preserve the current public site, newer private-account behaviour and the draft's unified routing/preview protections together. Do not merge or publish the draft as it stands.

This review changes documentation only. It does not select C1, approve a production release, retry hosted provisioning, apply SQL, change accounts/providers, send mail or call an AI service.

## Exact sources and method

| Source | Reviewed head | Import baseline used by the draft |
| --- | --- | --- |
| Main, webmaster/readiness-2026-11-05 | 1f28a40d95179986f52df31c50a83c34619e9045 | 705fe200f8c73c13c7fef853853f77096e7f9591 |
| Australia/backend, australia/preview | 68711fd53bbc4882511e3d2226344828ccda208f | 802422c4cc731488400a4debd598fff43b63cf3a |
| Draft, integration/aves-unified-2026-11-08 | 33fcd0e99895257a6610c36fd30f407d3e67d4b1 | Main common ancestor above |

GitHub [PR #3](https://github.com/mmelendro/Aves/pull/3) remains open, draft and not mergeable. Compared with current main, its history is 69 commits ahead and 91 behind. Commit counts include documentation and are not effort estimates.

Five complete, non-truncated Git trees were compared by path/blob SHA: the three current heads and two import baselines. Relevant source, routing, preview, account, schema-history and test files were read. Seven application files changed on both main and draft were probed with git merge-file in temporary files. No application branch was merged.

[Detailed path/blob inventory and assessment limits](evidence/2026-11-10-consolidation-delta-inventory.json).

## Size and overlap

| Measurement | Main since its import | Australia since its import |
| --- | --- | --- |
| Changed or added paths | 204 | 107 |
| Documentation/evidence paths, including Markdown | 82 | 47 |
| Remaining source/config/data/tests/assets/scripts | 122 | 60 |
| Deleted paths | 0 | 0 |

For the 204 main changes, 190 are absent from the draft or unchanged there since the ancestor, one is already identical, and 13 paths changed on both sides. Those 13 comprise seven application files and six documentation/entry-point files. This is a path-level inventory, not proof that 190 files can be copied without dependency or behavioural review.

The seven application overlap probes found:

| File | Textual conflict blocks | Required reconciliation |
| --- | --- | --- |
| app/colombia/page.tsx | 1 | Keep the newer extracted ColombiaHomePage/local Spanish implementation and wrap its server metadata with the draft's publicMetadata helper |
| app/layout.tsx | 2 | Retain PreviewModeProvider, preview no-index and canonical/structured-data corrections while adding the newer single root media provider |
| components/contact-form-section.tsx | 1 | Keep Colombian copy localisation AND read-only preview checks/local /api/inquiries submission |
| app/credits/page.tsx | 0 | Preserve new soundscape attribution and draft metadata wrapper |
| app/new-zealand/page.tsx | 0 | Preserve new South Island links/current copy and draft metadata wrapper |
| app/page.tsx | 0 | Preserve published birds/AVES heading and draft metadata wrapper |
| components/navigation-header.tsx | 0 | Preserve Colombian language toggle and preview-banner header offset |

Zero textual conflicts do not establish functional compatibility. The six documentation overlaps need semantic reconciliation using the current handoff/priority plan, while preserving the draft's consolidation and hosted-acceptance evidence. Their conflict counts were not probed.

## What must carry forward

| Area | Missing or stale in the draft | Integration treatment |
| --- | --- | --- |
| Colombia | Page-local Spanish copy, extracted homepage, restored planning geometry, deliberate previews and eleven-region whole-shape hover/focus | Preserve main's current artwork, marker positions, stable IDs, preview/navigation distinction and native links. Retain the draft's unified contact path and preview guard |
| Global/country discovery | Region drill-down, whole-region context, new card/map presentation, focal placement, Info refinements and responsive behaviour | Carry current main components/data/tests; adapt Australian inputs to the draft's namespaced maintained catalogue rather than restore obsolete proxy dependencies |
| South Island | Dedicated guide, habitat/place/photo state, land cover, satellite/conservation/public-place layers, place imagery, zoom/scale, full-screen, practical planning/resources and soundscapes | Bring the complete dependency closure and rights/provenance together. Treat delivered pilots as preservation work, not new product development |
| Australia public site | Later regional bird/overview data, zoom/resizing, Info/focal updates, first-activation previews and player support | Port relevant changes into features/australia and its existing shared wrappers. Do not paste Australia's root app, basePath or root layout into the unified tree |
| NZ selection | Living-only 377-entry public/private selection and validation, archived historical provenance | Use the current shared checklist contract; preserve existing brief IDs and compatibility rather than delete guest data |
| Private budgets | Budget questions, questionnaire type/summary, request validation and saved-owner-review representation | Update form, validation and review together. Denomination does not convert amounts |
| Email updates | Verified-account preference page/API, signup routing, wording/version and private consent handling | Port consent flow while keeping the draft's read-only auth guards and local root account URLs. Never infer consent or send campaigns |
| Owner review | Mobile Open Request focus/scroll repair and later manual proposal behaviour | Preserve the demonstrated usability repair independently of AI controls |
| AI prototype | Source/schema history exists in current Australia, absent from the draft | Record and preserve history intentionally; generation/connection checks remain deferred. Do not carry active provider requests into the refreshed workflow by default |

Critical finding: the draft's questionnaire uses a strict schema without budget. A newer saved brief containing budget can be read with incomplete presentation and cannot be round-tripped unchanged through that validator. Budget compatibility is a cutover requirement, not an optional new feature.

The email-updates page/API and consent-confirmation routing are also absent. Porting only the public pages would lose that behaviour at cutover.

## Shared components and data

Six helpers are byte-identical between current production sources: cover-focal-position, map-zoom, media-handoff, media-identity, media-navigation and region-activation. The living NZ checklist and public travel-media catalogue are also byte-identical. Keep one shared copy in the unified application.

The two current media providers, region-preview hooks and species-details panels differ. Main includes the newer ambience/foreground coordination and stronger shared preview logic. Do not choose a version solely because its filename matches. Review country-specific path handling, hover/navigation rules and the Australian consumer contract.

The draft already wraps its Australian carousel around the root shared viewer. Keep that direction. Bring newer Australian region associations into the namespaced content/helper layer and adapt global discovery to it. The main app's newer Australian snapshots do not justify keeping two independently maintained catalogues forever. Compare stable bird/region IDs and rights before removing any snapshot.

## Routing and media decisions

Keep the draft's local rewrites for legacy Australian auth/API URLs and its root shared portal/session migration. Preserve established public country/region URLs, not a new URL scheme.

The inspected registries contain 42 main public routes and 32 Australian routes. The refreshed unified sitemap should therefore contain 74 unique routes if no scope changes. The draft's recorded 73-page review predates the South Island guide. Derive the expected list from registries at implementation time rather than hard-code 74 indefinitely.

One root AvesMediaProvider should own the programme dock; AustraliaLayout must remain a thin layout. Feed it the union of current public routes with root asset paths. Preserve the content-country identity rule: motmot for Colombian programmes, kea for NZ, existing Australian bird for Australian content. Do not invent new programmes.

The current media navigation helper only enhances allowlisted public routes. A unified app alone does not make account/auth/API or reload navigation uninterrupted. Preserve explicit paused handoff at real document/security boundaries until separately reviewed. Test public Colombia–NZ–Australia continuity, close/Back behaviour, foreground calls/video priority and South Island ducking. Ambience stays page-local and ends on navigation.

Nine newer main public assets are absent from the draft: three soundscape MP3s, five landscape WebPs and the historical satellite JPG, totalling 3,173,291 source bytes. The Australian root bird image added to main is already identical in the draft. Preserve original rights/credits and intent-based loading; these byte totals are stored assets, not an initial-page download measurement.

## Backend and schema-history decisions

The draft is missing three maintained Australian migration files:

1. 20261108192239_private_trip_budget_preferences.sql.
2. 20261108225245_account_email_updates.sql.
3. 20261109001033_private_ai_proposal_drafts.sql.

The first changes trip-details validation, the second adds service-only consent access, and the third defines private owner AI-draft storage/functions. Carrying source history does not authorise rerunning deployed migrations or enabling AI.

The draft's native fixture explicitly applies eight maintained migrations to an empty local database. Its repository also contains a historical Colombia replacement-security baseline which that fixture deliberately excludes. Do not run every SQL file indiscriminately. An updated isolated fixture should deliberately represent the maintained schema history and newer budget/consent behaviour, without inference/provider calls. No hosted schema comparison or migration application was performed in C0.

Preserve deployed ownership/RLS, immutable submitted briefs, owner-only proposals, same-origin request validation, no-store private responses and root/legacy session migration. Auth-form changes need merging into the preview-protected draft, not wholesale replacement from Australia.

The current Australian AI module can call Gateway both for generation and a credit/connection check. The deferral must cover both paths; retaining an enabled panel then promising not to click it is insufficient for an acceptance setup. Keep manual proposals working and use a fail-closed disabled path or omit the active integration pending separate selection. Preserve private stored data/history; make no destructive cleanup.

## Dependencies and configuration

The draft already contains the maintained pinned Supabase client/SSR, Resend and server-only dependencies, plus the common Next/React toolchain. The notable later direct dependency in Australia is ai 7.0.165 for the deferred prototype. It is not required for manual budgets/consent or the public refresh. Do not add/activate AI merely to make a wholesale copy compile.

Retain one package/lockfile and frozen dependency resolutions; refresh the lock only for an intentional required dependency change. Avoid unrelated dependency upgrades during consolidation.

Both sources' inspected security-headers.mjs agree. Retain the draft's broader private-path headers, local rewrite/session rules, no-index preview state and Git auto-deployment disablement. No weaker preview guard is proposed.

The public environment template names the existing Supabase/Resend/contact configuration and VERCEL_ENV; no real secrets were read. Source review cannot verify that the intended project currently has the correct values, provider callback allowlists, aliases or email delivery configuration.

## Hosting target recommendation

Prefer the existing Australia/shared-backend Vercel project as the candidate target because it already hosts the maintained backend integration configuration. This is an architectural recommendation from the source inventory and prior consolidation record, not a fresh provider audit.

| Option | Assessment |
| --- | --- |
| Existing Australia/backend project | Preferred candidate. Reuse current private configuration without broad copying; confirm production/preview targets, aliases and hostname consumers before any cutover |
| Existing main project | Possible alternative, but private backend configuration and provider callbacks need a reviewed setup; do not assume public-site configuration is sufficient |
| New project | No demonstrated need at C0. Additional setup/protection/configuration and approval would be needed; no new resource or spend is authorised |

Keep both production projects and their current aliases untouched. A neutral project rename is later housekeeping, after hostname dependencies are removed and separately approved. Do not retire the old project immediately after moving a domain.

The recorded hosted test-environment blocker remains unresolved. Do not retry the previously declined paid database provisioning. A later decision must identify an authorised existing isolated setup or explicitly approve another controlled test method and its effects. Local native results and a read-only preview cannot prove hosted Google/email callbacks, real delivery or deployed-session handover.

## Recommended implementation order

These are separate source/preview checkpoints on the existing integration branch. They do not authorise production publication.

| Card | Outcome | Suggested effort | Exit |
| --- | --- | --- | --- |
| C1a | Restore current main public behaviour in the draft | 5 | Main public additions/data/assets/tests plus the seven reviewed overlapping files; current root media/ambience behaviour and all draft metadata/preview protections retained. No backend/provider changes. Required tests/type/build pass |
| C1b | Restore current Australian discovery using unified namespaces | 3 | Namespaced regions/data/maps, shared viewer contracts, local assets, deliberate previews and all Australian routes work. Public-route union and one player verified |
| C1c | Preserve newer private budget compatibility | 3 | Current form/types/validation/summaries and schema-history source; old and budget-bearing briefs survive round-trip in isolated tests, with ownership/snapshot rules intact |
| C1d | Preserve consent, owner usability and deferred-AI boundaries | 3 | Email-preference routing/API, verified-session consent and owner mobile repair; preview mutating routes remain blocked and no provider check/generation runs |
| C2 | Review the exact refreshed unified public preview | 3 | Full current route/asset/SEO/private-exclusion matrix, desktop/narrow/keyboard/media review; updated evidence and no live cutover |
| C3 | Hosted private acceptance | Re-estimate after setup decision | Authorised isolated/controlled setup; hosted auth/callback/recovery, persistence/isolation/owner/proposals, actual authorised inbox delivery and deployed-session handover |

C1a is the smallest coherent next recommendation. It is substantial because the public features share imports and state; split further if dependency discovery exceeds the five-point scope. Each code checkpoint must build and preserve its existing paths; do not stage a broken partial South Island page as a completed slice.

After C2/C3 pass on the current candidate, C4 production cutover and C5 project retirement still need their separate explicit approvals. Continue independent guest/business work if C3 is blocked.

## Verification matrix for the refreshed candidate

| Area | Required checks |
| --- | --- |
| Public routes/SEO | Current registry union, legacy links/redirects, 11 Colombian guides, 9 Australian regions, NZ/South Island, both sitemap endpoints, private exclusions, metadata wrappers and preview no-index |
| Discovery | Stable region IDs, real undistorted artwork, all homepage selections, first preview/later Explore, hover does not arm navigation, modifier/new-tab/Back behaviour |
| Layout/accessibility | Desktop, exact supported narrow widths including 320/390px, keyboard/Escape/focus, short Info frames, divider extremes, reduced motion, browser zoom |
| Media | One dock, known public route continuity, country identity, explicit document Resume, close/Back, calls/video precedence, crossfade/mute/volume/Off, hidden/navigation cleanup and unavailable habitats |
| Private planning | Existing and budget-bearing briefs across all supported destinations, living bird IDs, save/reopen/edit, retries/conflicts, immutable share snapshot, anonymous/cross-account denial |
| Consent/owner | Verified optional subscription/unsubscription and safe next routing, owner mobile Open Request, manual draft/issue visibility, no campaign or AI call |
| Provider/session | Hosted Google/email confirmation/recovery/sign-out, legacy/root identity precedence, actual authorised receipt delivery, production/preview configuration and controlled deployed-session handover |
| Delivery/recovery | Exact tested source/build, alias dependency inventory, production indexing/guards, rollback to the two recorded published apps, observation before retirement |

The earlier 345-test, 81-GET and 19-native-check results belong to the old draft revisions. They are useful regression evidence but do not certify the refreshed candidate or the three newer schema histories. Existing published 147-test soundscape evidence also does not prove unified integration.

No fresh application tests, builds, live browser checks or provider inspection were performed for C0. The only executed technical probe was the seven-file textual merge assessment. Physical iPhone/Safari, perceived sound quality, background/telephone behaviour and sustained YouTube playback retain their recorded verification limits.

Preserve the current commercial/stewardship gates in AGILE-PLAN.md: current Eco-Tourism Business Plan before commercial assumptions, evidenced environmental/supplier claims, cultural authority, sensitive-site protection and no invented certification. Consolidation does not create new business or conservation credentials.

## Result and next selection

C0 is complete with a reproducible source inventory and bounded implementation proposal. Recommend selecting C1a next. Integration code, hosted setup and production release remain unselected. Refresh all three Git heads before starting C1a; another chat may have changed them.
