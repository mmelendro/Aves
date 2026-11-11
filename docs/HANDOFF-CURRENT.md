# AVES current handoff

Runtime: a3aa3ea8b58efc9aa1fcf9663d63d3dc86f5e093. Deployment: dpl_AL7v9skSFaUCwHVdPsaYkTHJvxkV, READY on the combined project prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv. Both aves.bio and www.aves.bio aliases verified. Rollback: a348a12ef183ffd37565c4967f25f55b80564b83 / dpl_9ea2EGnbjpK58KcThngCAkXAStSA. Branch: feature/field-guide-card.

Removed 101 unreachable application modules, copied NZ data and unused styles, and 27 unreferenced direct dependencies. The refreshed lockfile and frozen install pass. Split planner map, daily editor, allowance summary, catalogue and presentation primitives into components/trip-planner/. Public navigation now has explicit country ownership and South Island tool anchors. README and docs/ARCHITECTURE.md describe the actual live single application. Added a read-only source reachability check; TypeScript now rejects unused locals/parameters. Compatibility redirects remain necessary live entry points, not duplicate implementations.

541 active tests, TypeScript and local/hosted 75-page builds passed. Fourteen obsolete prototype tests were removed and two module-boundary tests added, alongside the new ownership test. The source audit checks 339 modules and reports zero unreachable application modules. Hosted browser checks covered the world, Colombia and Australia explorers, site tree and direct planner anchor, kea selection, seven-day endpoint route, NZD 1,440 allowance arithmetic, editable Airbnb overnight, source filters, place basket add/remove, area filter/stale-draft protection, copy fallback and sign-in handoff. At 340px, tree and planner document width was 337px. Live site tree and both aliases verified. Physical Safari/touch remains untested. The deployment-scoped error/fatal scan for 06:58:45–07:08:45 UTC returned no matches.

## Editing boundaries

Use docs/ARCHITECTURE.md as the current route/component/data map. One Next.js server owns all public countries and the shared account. Established URLs and callback/API redirects remain valid. Private/auth/admin routes stay out of the public tree and sitemap. Scientific names, region occurrence, conservation status, media rights, operator evidence and B Corp certification require distinct sources. The original Eco-Tourism Business Plan was not located; do not invent financial assumptions.

The existing unsent synthetic QA draft retained its itinerary/date/allowances/Airbnb choice and original notes in the prior release's real owner save/reopen/review check. This cleanup did not change private data. Preserve all existing plans. No final enquiry, email, booking or payment was sent. Do not print account identifiers or customer plan contents in public evidence.

## Next work

Sourced road connections and travel-time references; dated prices/availability and actual budget matching; broader reviewed catalogue coverage; physical Safari/touch; independent guest/provider and owner proposal/email acceptance within the approved synthetic scope. AVES-062 remains partial for automatic in-page road times and other countries.

## Old project retirement

Do not delete either older project yet. Project-domain registration for aves.bio/www remains on prj_ZKEHgaFrywRyoEo9IfSFcln9k8pv in the last inspected state; normal add returned domain_already_in_use. Its autoAssignCustomDomains was disabled to prevent old builds reclaiming domains. Complete a real project-domain move, verify HTTPS/aliases/account/callbacks, and obtain Vercel's required project-deletion confirmation. The connector exposes deletion links, not deletion or project-domain moves. This remains a capability limit, not missing user authorization.

Also review older project prj_0cUcHh3lkewUHSqiObAzhux88Dpn, named aves, separately. Preserve unrelated databases, records, domain registrations and recovery history. This source cleanup did not alter these resources.
