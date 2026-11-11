# AVES current handoff

Runtime: a0278216ee93537c5afc3ce1e1ee6a904f0af415. Deployment: dpl_6r8i8AdJJCTaV2gkymugf1stzt4r, READY on the combined project prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv. Both aves.bio and www.aves.bio aliases verified. Rollback: d16c36f881eef0183faad86566f0d8f0d80f49dc / dpl_Gg1GZRddP2nsBmfcesuvLV31Cgo2. Branch: feature/field-guide-card.

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

## Next work

Season/access constraints; expanded dated prices/availability, food/transport costs and actual budget matching; broader reviewed catalogue coverage; physical Safari/touch; independent guest/provider and owner proposal/email acceptance within the approved synthetic scope. AVES-062 remains partial for automatic in-page road times and other countries.

## Old project retirement

Do not delete either older project yet. Project-domain registration for aves.bio/www remains on prj_ZKEHgaFrywRyoEo9IfSFcln9k8pv in the last inspected state; normal add returned domain_already_in_use. Its autoAssignCustomDomains was disabled to prevent old builds reclaiming domains. Complete a real project-domain move, verify HTTPS/aliases/account/callbacks, and obtain Vercel's required project-deletion confirmation. The connector exposes deletion links, not deletion or project-domain moves. This remains a capability limit, not missing user authorization.

Also review older project prj_0cUcHh3lkewUHSqiObAzhux88Dpn, named aves, separately. Preserve unrelated databases, records, domain registrations and recovery history. This source cleanup did not alter these resources.
