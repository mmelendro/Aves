# AVES current handoff

Runtime: bae9953d4d03324f5fb73f988955ec00388f8a72. Deployment: dpl_EJ827uaf2AXa5Qhm9Wgg5VUMpCTs, READY on combined project prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv. Both aves.bio and www.aves.bio verified. Rollback before map changes: 0984fc3cd3df89c8878e0c0a5a98b1ce9cee82f7 / dpl_F4c2rMAGB5dKvqym4LwMfRpAgeHb. Branch: feature/field-guide-card.

## Current single-map acceptance

MAP-01/02 remove the duplicate South Island planner map and render itinerary base order within the existing explorer. Numbered schematic connectors are not road geometry. Base changes focus a broad area; map base CTA updates planner input without reloading or discarding the existing draft. Regeneration remains explicit. The same map/layers/selection persist in fullscreen. Google Maps public search/directions actions appear in public place details and planner listing disclosures, with no SDK, Places feed, private origin or automatic Google requests. Queries require matching-listing/entrance confirmation. Existing catalogue categories stay available through base previews; individual property coordinates have not been invented.

559 tests passed, TypeScript passed, local/hosted 75-page builds passed, architecture audit 347 modules with zero unreachable. The final marker stacking correction passed the three affected tests and local/hosted builds (which include type validation); route numbers paint above public markers without capturing gestures. Hosted checks covered South Island legacy restoration, endpoint regeneration, no duplicate base map, route toggle, Hanmer map-to-planner input handoff with retained draft, public Google directions URL, fullscreen continuity, and one explorer on Pacific Colombia, explicit Caribbean and New South Wales templates. At 340px, South Island document width was 337px and fullscreen kept one route overlay. Shared-template checks cover map ownership; this is not exhaustive manual acceptance of every regional URL or equal layer coverage everywhere. The canonical final build's numbered route and both aliases were verified. Error/fatal scan 08:46:26–08:56:26 UTC returned no matches. No private writes, mail, bookings, spend, schema or access changes. Physical Safari/touch and Google listing accuracy/live business hours remain unverified.

## Current island-context evidence

NZ-01a centralized configuration and explicit draft island identity, with untagged legacy South Island compatibility. Route generation remains South Island-specific; NZ-01b is next. 556 tests, TypeScript, local and hosted 75-page builds passed. Source audit: 344 modules, zero unreachable. Domain tests reject foreign/unknown island input and preserve foreign stored envelopes through read, failed write and consume. Hosted browser checked legacy seven-day restoration, regeneration to three days and the configured South Island account intent. Canonical live five-day local generation and published prices verified. Both aliases verified. Error/fatal scan 08:26:59–08:36:59 UTC returned no matches. This release adds no private record writes or North Island planner. No new physical-device or private save/reopen acceptance claimed. Storage on this path still carries the draft at explicit account handoff; do not claim every local edit autosaves.


## Current price-reference evidence

Seven published product/property price references, six eligible for arithmetic when conditions match. Party and room counts preserve per-person allowances. Room rates split by adults and units; adult entry rates do not. Unknown products, capacity, currency, review age and access/date conflicts stay unpriced. Sources and conditions appear in catalogue/day cards and copied notes. These are partial published references, not dated quotes, availability or complete trip costs. Food and transport remain unpriced. See docs/SOUTH-ISLAND-PRICE-REFERENCES-2026-11-11.md.

553 tests, TypeScript and local/hosted 75-page builds passed. Source audit: 343 modules, zero unreachable application modules. Hosted browser verified legacy draft restoration, Arthur's Pass two-adult shared-room NZD 67.50–82.50, currency mismatch blocking, Hanmer adult NZD 43 against a NZD 30 allowance without party division, Orokonui Tuesday 2027-01-19 access warning and blocked arithmetic, and copied price provenance. At 340px viewport, document width was 337px. Canonical live shared-room comparison and both aliases verified. Deployment-scoped error/fatal scan for 07:54:39–08:04:39 UTC returned no matches. No private record writes. Physical Safari/touch, availability, child pricing and complete priced itinerary acceptance remain untested.

## Earlier journey-reference evidence

546 tests, TypeScript, local and hosted 75-page builds passed. Source audit: 340 modules, zero unreachable application modules. Hosted browser verified the mixed Christchurch–Arthur’s Pass–Queenstown draft, published versus unknown counts, copied source notes, the long Christchurch–Queenstown reference, Wānaka–Te Anau remaining unknown and Queenstown–Te Anau using its own reference. At 340px, document width was 337px. The canonical live Queenstown–Te Anau card and both aliases were verified. The deployment-scoped error/fatal scan for 07:14:39–07:24:39 UTC found no matches. This is scoped evidence, not proof about all traffic or current road conditions.

Fifteen sourced corridor references and their unknown/long/town-scope handling are detailed in SOUTH-ISLAND-ROAD-REFERENCES-2026-11-11.md. No private data was changed.

## Earlier source-cleanup evidence

Removed 101 unreachable application modules, copied NZ data and unused styles, and 27 unreferenced direct dependencies. The refreshed lockfile and frozen install pass. Split planner map, daily editor, allowance summary, catalogue and presentation primitives into components/trip-planner/. Public navigation now has explicit country ownership and South Island tool anchors. README and docs/ARCHITECTURE.md describe the actual live single application. Added a read-only source reachability check; TypeScript now rejects unused locals/parameters. Compatibility redirects remain necessary live entry points, not duplicate implementations.

541 active tests, TypeScript and local/hosted 75-page builds passed. Fourteen obsolete prototype tests were removed and two module-boundary tests added, alongside the new ownership test. The source audit checks 339 modules and reports zero unreachable application modules. Hosted browser checks covered the world, Colombia and Australia explorers, site tree and direct planner anchor, kea selection, seven-day endpoint route, NZD 1,440 allowance arithmetic, editable Airbnb overnight, source filters, place basket add/remove, area filter/stale-draft protection, copy fallback and sign-in handoff. At 340px, tree and planner document width was 337px. Live site tree and both aliases verified. Physical Safari/touch remains untested. The deployment-scoped error/fatal scan for 06:58:45–07:08:45 UTC returned no matches.

## Editing boundaries

Use docs/ARCHITECTURE.md as the current route/component/data map. One Next.js server owns all public countries and the shared account. Established URLs and callback/API redirects remain valid. Private/auth/admin routes stay out of the public tree and sitemap. Scientific names, region occurrence, conservation status, media rights, operator evidence and B Corp certification require distinct sources. The original Eco-Tourism Business Plan was not located; do not invent financial assumptions.

The existing unsent synthetic QA draft retained its itinerary/date/allowances/Airbnb choice and original notes in the prior release's real owner save/reopen/review check. This cleanup did not change private data. Preserve all existing plans. No final enquiry, email, booking or payment was sent. Do not print account identifiers or customer plan contents in public evidence.

## Active priorities

MAP-01/02 consolidate the South Island itinerary overlay into the regional explorer and add external Google Maps actions. See current acceptance above for publication status. Resume NZ-01b next: shared generation and independent island drafts, then the sourced North Island pilot. AGILE-PLAN.md is the single active queue and CONTINUE-HERE.md specifies the next increment. One map surface per regional guide is now a continuing regression requirement. Do not invent point-level business coverage or imply an embedded Google provider.

## Old project retirement

Do not delete either older project yet. Project-domain registration for aves.bio/www remains on prj_ZKEHgaFrywRyoEo9IfSFcln9k8pv in the last inspected state; normal add returned domain_already_in_use. Its autoAssignCustomDomains was disabled to prevent old builds reclaiming domains. Complete a real project-domain move, verify HTTPS/aliases/account/callbacks, and obtain Vercel's required project-deletion confirmation. The connector exposes deletion links, not deletion or project-domain moves. This remains a capability limit, not missing user authorization.

Also review older project prj_0cUcHh3lkewUHSqiObAzhux88Dpn, named aves, separately. Preserve unrelated databases, records, domain registrations and recovery history. This source cleanup did not alter these resources.
