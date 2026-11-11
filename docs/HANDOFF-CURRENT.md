# AVES current handoff

Runtime: a47ac96b3c18fd04993d4569edc7c58edc7dc009. Deployment: dpl_7KVkvDizXKegXh3RBpDmFzqCoZYe, READY on combined project prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv. Both aves.bio and www.aves.bio verified. Rollback: e44de4e25f9f6782515e37d56f01730ad9ab158f / dpl_DrTb2rnEcFWLUpD7DzwFbuKA6f84. Branch: feature/field-guide-card.

## Current country-satellite acceptance

MAP-03b/c add optional NASA 2004 satellite backgrounds for Colombia, Australia and the NZ main-island overview, alongside existing world and South Island imagery. Australia/NZ retain the existing geographic transforms and selectable states/islands. Verified source-vertex fit residuals: Australia max 0.00867 SVG units; NZ max 0.09322, consistent with rounded paths. Source hashes match the original Natural Earth sources. Colombia uses a separately generated Mercator country overview, not a stretched image under editorial planning boundaries. Region selection survives switching back to planning artwork; the satellite view explicitly remains a country overview, without invented region polygons or property detail. Older Colombia/Australia hero explorers use the same source/action components. Static map cues remain scope/navigation cues, not independent imagery renderers.

565 tests, TypeScript, local/hosted 75-page builds passed. Architecture audit: 349 modules, zero unreachable. Each country raster is conditionally loaded, source-hashed, dated and below 140 KB. Image-error fallback has domain coverage; forced hosted asset failure and physical Safari/touch are not claimed. Offline generators/fit verification are retained; pyshp/numpy/scipy are tooling only, not new application dependencies.

Hosted browser checked Colombia country/fullscreen, Pacific region preservation across satellite/planning switches, Australian NSW state alignment and selection, NZ overview and North Island selection, legacy Colombia tours and Australian tours renderers, and South Island satellite combined with nine existing park boundary overlays and itinerary. Pacific Colombia and older Australian tour views at 340px had 337px document width. Canonical live Colombia satellite and both aliases verified. Error/fatal scan 09:32:22–09:42:22 UTC returned no matches. No new spend, schema, access, private record writes, mail or booking.

The broader request remains open: national parks/protected-area and other source-backed layer coverage is not yet equal across countries. Next is MAP-04, then MAP-05 in MAP-LAYER-COVERAGE.md, before NZ-01b. Do not label historical satellite as live conditions or infer environmental quality, current land cover, travel feasibility or permission to enter from it.

## Editing and privacy boundaries

ARCHITECTURE.md is the code/source map, AGILE-PLAN.md is the active backlog and CONTINUE-HERE.md specifies the next increment. One Next.js application owns public countries and shared accounts. Preserve stable bird/place IDs, old drafts, existing private records, ownership checks and immutable submissions. Earlier real synthetic draft save/reopen and cancelled enquiry review evidence is in REGIONAL-ITINERARY-PLANNER-2026-11-11.md. No private write was needed for these imagery releases. Do not print private identifiers or customer contents in public evidence.

Earlier source cleanup, route references, price comparisons and single-map acceptance remain in dated reports, HOSTED-ACCEPTANCE.md's referenced evidence and Git history. Avoid copying every historical validation log into the execution prompt. The original Eco-Tourism Business Plan remains unavailable in this checkout; do not invent financial assumptions. Distinguish company certification, operator statements, mapped land status and visitor access.

## Old project retirement

Do not delete either older project yet. Project-domain registration for aves.bio/www remains on prj_ZKEHgaFrywRyoEo9IfSFcln9k8pv in the last inspected state; normal add returned domain_already_in_use. Its autoAssignCustomDomains was disabled to prevent old builds reclaiming domains. Complete a real project-domain move, verify HTTPS/aliases/account/callbacks, and obtain Vercel's required project-deletion confirmation. The connector exposes deletion links, not deletion or project-domain moves. This remains a capability limit, not missing user authorization.

Also review older project prj_0cUcHh3lkewUHSqiObAzhux88Dpn, named aves, separately. Preserve unrelated databases, records, domain registrations and recovery history. This source cleanup did not alter these resources.
