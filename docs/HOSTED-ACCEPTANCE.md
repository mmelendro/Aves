# AVES hosted acceptance

Runtime: a47ac96b3c18fd04993d4569edc7c58edc7dc009. Deployment: dpl_7KVkvDizXKegXh3RBpDmFzqCoZYe, READY on combined project prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv. Both aves.bio and www.aves.bio verified. Rollback: e44de4e25f9f6782515e37d56f01730ad9ab158f / dpl_DrTb2rnEcFWLUpD7DzwFbuKA6f84. Branch: feature/field-guide-card.

## Current country-satellite acceptance

MAP-03b/c add optional NASA 2004 satellite backgrounds for Colombia, Australia and the NZ main-island overview, alongside existing world and South Island imagery. Australia/NZ retain the existing geographic transforms and selectable states/islands. Verified source-vertex fit residuals: Australia max 0.00867 SVG units; NZ max 0.09322, consistent with rounded paths. Source hashes match the original Natural Earth sources. Colombia uses a separately generated Mercator country overview, not a stretched image under editorial planning boundaries. Region selection survives switching back to planning artwork; the satellite view explicitly remains a country overview, without invented region polygons or property detail. Older Colombia/Australia hero explorers use the same source/action components. Static map cues remain scope/navigation cues, not independent imagery renderers.

565 tests, TypeScript, local/hosted 75-page builds passed. Architecture audit: 349 modules, zero unreachable. Each country raster is conditionally loaded, source-hashed, dated and below 140 KB. Image-error fallback has domain coverage; forced hosted asset failure and physical Safari/touch are not claimed. Offline generators/fit verification are retained; pyshp/numpy/scipy are tooling only, not new application dependencies.

Hosted browser checked Colombia country/fullscreen, Pacific region preservation across satellite/planning switches, Australian NSW state alignment and selection, NZ overview and North Island selection, legacy Colombia tours and Australian tours renderers, and South Island satellite combined with nine existing park boundary overlays and itinerary. Pacific Colombia and older Australian tour views at 340px had 337px document width. Canonical live Colombia satellite and both aliases verified. Error/fatal scan 09:32:22–09:42:22 UTC returned no matches. No new spend, schema, access, private record writes, mail or booking.

The broader request remains open: national parks/protected-area and other source-backed layer coverage is not yet equal across countries. Next is MAP-04, then MAP-05 in MAP-LAYER-COVERAGE.md, before NZ-01b. Do not label historical satellite as live conditions or infer environmental quality, current land cover, travel feasibility or permission to enter from it.

## Earlier accepted flows and limits

Prior single-map work removed the duplicate South Island planner map, retained schematic route order in the shared explorer, map-to-planner input handoff, Google public lookup/directions, and 340px containment. Source cleanup, corridor and tariff reviews retain dated source records. Earlier automated counts and scoped runtime scans remain in Git history; they are not cumulative guarantees about all traffic or all content.

The prior real owner test explicitly imported an unsent synthetic itinerary into its existing labelled draft. Save, reload, reopen and cancelled enquiry review retained itinerary/date/allowances, Airbnb choice, birds and earlier notes/places. See REGIONAL-ITINERARY-PLANNER-2026-11-11.md. Current imagery releases performed no private writes. Automated ownership, stale-edit and immutable snapshot checks remain active.

Independent guest/provider acceptance, physical Safari/touch, live booking availability, final enquiry delivery, proposal issue and inbox receipt are not newly verified. Old project/domain registration retirement remains separate in HANDOFF-CURRENT.md. Detailed historical rollback/database evidence remains in docs/evidence/ and Git history.
