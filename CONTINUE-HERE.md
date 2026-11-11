# AVES continue here

## Modular source cleanup live · 11 November 2026

Runtime: a3aa3ea8b58efc9aa1fcf9663d63d3dc86f5e093. Deployment: dpl_AL7v9skSFaUCwHVdPsaYkTHJvxkV, READY on the combined project prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv. Both aves.bio and www.aves.bio aliases verified. Rollback: a348a12ef183ffd37565c4967f25f55b80564b83 / dpl_9ea2EGnbjpK58KcThngCAkXAStSA. Branch: feature/field-guide-card.

Removed 101 unreachable application modules, copied NZ data and unused styles, and 27 unreferenced direct dependencies. The refreshed lockfile and frozen install pass. Split planner map, daily editor, allowance summary, catalogue and presentation primitives into components/trip-planner/. Public navigation now has explicit country ownership and South Island tool anchors. README and docs/ARCHITECTURE.md describe the actual live single application. Added a read-only source reachability check; TypeScript now rejects unused locals/parameters. Compatibility redirects remain necessary live entry points, not duplicate implementations.

541 active tests, TypeScript and local/hosted 75-page builds passed. Fourteen obsolete prototype tests were removed and two module-boundary tests added, alongside the new ownership test. The source audit checks 339 modules and reports zero unreachable application modules. Hosted browser checks covered the world, Colombia and Australia explorers, site tree and direct planner anchor, kea selection, seven-day endpoint route, NZD 1,440 allowance arithmetic, editable Airbnb overnight, source filters, place basket add/remove, area filter/stale-draft protection, copy fallback and sign-in handoff. At 340px, tree and planner document width was 337px. Live site tree and both aliases verified. Physical Safari/touch remains untested. The deployment-scoped error/fatal scan for 06:58:45–07:08:45 UTC returned no matches.

Start editing with README.md and docs/ARCHITECTURE.md. Run check:architecture, typecheck, test and build. Historical release detail remains in Git history and named release documents. No new private record, email, enquiry, booking, payment, schema change or access change was made in this cleanup. Keep the existing labelled unsent QA draft. Prior live save/reopen evidence is in docs/REGIONAL-ITINERARY-PLANNER-2026-11-11.md.

Next increment: sourced journey-time references and visible unknown transfers, then current dated prices/availability to match options to allowances. Continue with bounded tested releases. No live road-time or price guarantee exists today.

Preserve the combined app and retained production project. Do not deploy an old standalone branch over it. Old project/domain registration retirement is still separate; see docs/HANDOFF-CURRENT.md.
