# AVES public technical checkpoint

Current published runtime: 65154ee3c2ce6635968b0c4561ba372646de942d. Accepted deployment: dpl_CkWf4ZtpR1mG6yVN53DcMbBjB4Ux. Canonical domains: aves.bio and www.aves.bio. Rollback: 2ab1c852e22f454ea80df995dba96156f950717d / dpl_EyjY2Ac2Q5GRFshRvv4bNenQv3ef. Subsequent documentation commits record the five-photo target and country/subregion gallery relationship; they are not new application deployments.

## Current gallery priority and release

The owner prioritised the prior items 9 and 10: five distinct photographs per subregion and connected country galleries. CONTINUE-HERE.md now contains the sole ranked 90-increment queue. NEXT: Nelson Lakes to five, then Fiordland, Otago/the Catlins, North Island and Rakiura. Items1–8 are immediate gallery releases;9–22 cover the New Zealand pilot journey, validation and economics;23–45 cover the private workspace;46–90 are a ranked candidate backlog. Reassess after every release and user test. Blocked device/person/source checks stay visibly incomplete while independent work proceeds.

Arthur’s Pass has five distinct reviewed landscape/context photographs. Nelson Lakes, Fiordland and Otago/the Catlins retain two each:11 South Island photographs total. One reviewed Rotorua photo and one Oban/Rakiura photo bring the shared registry to13. These are photographs, not bird occurrences, current access or current services. New source metadata, dates, original/rendition hashes and rights are in content/place-gallery-additions.json; display credits also enter the existing central credit directory. Five new local WebP assets were visually inspected and their creator/licence/locality checked on Commons.

New Zealand country/island gallery views reuse the same photo records. Country curation alternates islands, capped at two per island, and prioritises different places within the larger South Island collection. The current overview has four photos across all three islands. Selecting a photograph highlights its island in the existing planning or satellite map without changing country scope, bird membership or camera. Selecting a region exposes its reviewed collection. South Island retains the existing habitat/place gallery. Credits, carousel controls, photo zoom and enlargement reuse shared components; no second map is introduced. Explicit Show on the map above returns to the existing viewer.

617 tests, strict TypeScript/build and source audit passed:374 reachable modules, zero unreachable. Hosted acceptance checked all five Arthur’s Pass views, country/island filtering, overview photo restoration, vector and satellite highlights, unchanged map transform/scale on photo browsing, one map, compact credits/Escape with unchanged image/scroll after opening, enlargement return and340 CSS-pixel layout (document337, photo303px wide and545px high). Physical Safari/touch remains unverified. Final exact-source hosted and canonical return-link checks passed. The country return anchor placed the map at112px from viewport top. Both canonical aliases resolve to this accepted deployment. Scoped error/fatal scan05:14–05:24 UTC found no matching logs. Canonical country proof: https://aves.bio/new-zealand#place-gallery . Screenshot is retained in the private development checkpoint.

Wider five-photo country coverage, regional galleries in Colombia/Australia, journal uploads, sharing and launch readiness remain incomplete. The private Colombia journal example and invitation are not part of this public release.

## Earlier reviewed location pilot

Christchurch arrival/departure steps now offer an explicit Christchurch Airport reference, sourced from OurAirports public-domain airport-area coordinates and the official airport map. Town reference remains the default. Selecting the exact Novotel Christchurch Airport catalogue stay gives its overnight step the operator-published property GPS. Both references highlight within the existing habitat/satellite viewer, show their sources/review date and preserve local-base bird context. They do not establish terminal doors, road paths, bookings, environmental certification or airport/property bird checklists. Airport choice belongs to the current preview and is not persisted as a flight booking or imported into the saved itinerary. Full ordinal accessible labels survive map zoom.

614 tests, strict local and exact-source hosted builds passed. Architecture: 372 reachable modules, zero unreachable. Hosted airport selection, selected-property overnight and habitat/satellite switching passed. At 340 CSS pixels, document width337, one satellite map448px high, airport label fully inside its map. This is a narrow-width browser check, not physical Safari/touch acceptance. Canonical selected-hotel preview and both domains verified. Deployment-scoped error/fatal scan 04:24–04:34 UTC found no matching logs. Public proof is retained privately with the development checkpoint; no private trip content enters repository evidence.

The private journal/community requirements are recorded in TRAVELLER-WORKSPACE-ROADMAP.md. This earlier journal-first direction is superseded by the owner’s gallery priority and ranked queue above. Uploads and community publication are not implemented. An owner-only Colombia example and invitation draft are separate from the public application; do not copy private source material into this public repository. Maintain the numbered pathway and five-photo/subregion targets.

## Current shared interface

World, country and regional maps use the shared map-first viewer, with controls below the map. South Island uses the shared toolbar. Country previews no longer collapse under their navigation. Direct globe toggling retains map and bird choices; layers remain in the compact picker. South Island retains faded surrounding geography. One map/viewer and enlargement return were checked, including regional satellite navigation.

Bird, place, resource and team carousels share buttons and counters. Bird/place credits open locally, preserve photo and scroll, and restore focus on close. Opening bird credits pauses automatic slides. Arthur’s Pass now has five distinct photographs; the other three South Island galleries retain two each, eleven total. The target is five per subregion across all countries, with country galleries drawing from those same reviewed records. These wider targets are not yet fulfilled. Requirements: TRAVELLER-WORKSPACE-ROADMAP.md.

## Current verification and limits

Earlier shared-viewer acceptance: 612 tests and the strict production build passed. Architecture: 371 reachable modules, zero unreachable. Hosted mobile checks used a 340 CSS-pixel viewport with document width337. Country New Zealand SVG432px actual/unclipped, Australia432px, Colombia342px. South Island habitat590px actual/unclipped and satellite448px actual/unclipped. The world overview retains its geographic aspect ratio. Place credit panels fit the narrow screen. Credits close with unchanged selected image and page scroll; enlargement retains the slide. All three newly added place photos loaded. Resource and team next controls advanced; bird credits paused the slideshow. Canonical error/fatal scan found no matching logs in its scoped ten-minute window.

Physical iPhone/Safari, independent visitors, wider media review and launch readiness remain unverified. The precise-place pilot covers only Christchurch Airport and the selected Novotel property; wider points remain unreviewed. Itinerary ordinals are now positioned above place labels, preserving their geographic anchor. A three-day Christchurch/Queenstown hosted preview confirmed a12px gap at desktop and340 CSS-pixel widths, with one map. The airport/property pilot and full ordinal-label preservation are now delivered. The current next increment is Nelson Lakes to five photos, as prioritised above. Preserve static/reduced-motion use, existing drafts and free exploration.

## Earlier journey release evidence

The following describes the earlier b347cfd release. Its screenshots are historical evidence, not the current viewer layout.

### Historical checkpoint

Published source: b347cfd6ab23c80fc2d0ded299448742de338e55, branch feature/field-guide-card. Public site: https://aves.bio. Accepted deployment: dpl_CmkTcJBHZ2SzCxoxczQc1kgnTiJN. Both aves.bio and www.aves.bio resolve to that deployment. Rollback: 1dd7ec600c336b0e28aacdc821fed16d85d4714d / dpl_87uUuFZ5xJ6qzcizXphzHtQKxcHi.

## Published behaviour

Both New Zealand islands use the same itinerary engine, map controls and visual journey components. Generate a draft, then choose Preview your journey step by step. The preview follows arrival in a planning town, transfer, outing or alternative, overnight and finish. Previous, Next and direct step selection update the existing map and locally sourced bird context. Nearby activity cards use the reviewed catalogue. Explore freely ends the preview without rewriting the itinerary.

Wide screens show the step panel beside the map. Narrow layouts use compact navigation in the existing guide toolbar and place the detailed panel below. Headers, footers, type, fields, buttons and map/carousel components stay shared. Place details remain closed during guided navigation and have an explicit Back to the map control. The map title follows the selected town. See GUIDED-JOURNEY-2026-11-12.md.

The practical planning pilot also includes optional driving preferences, known driving-reference subtotals, unknown-transfer counts, daily pace disclosures, reviewed visit calendars, scoped walking references and an indoor Hamilton alternative. See PLANNER-PACE-2026-11-12.md and PLANNER-CALENDAR-2026-11-12.md.

## Public interface validation

All 607 tests, strict TypeScript and local/exact-source hosted 76-page production builds passed. Architecture audit: 368 reachable source modules, zero unreachable modules. Tests include island isolation, route/day/night retention, input immutability, managed-encounter exclusions and local bird-source/credit retention.

Hosted North Island three-day preview produced nine steps. Auckland, Hamilton and Rotorua highlights followed navigation. Hamilton bird text used Hamilton source references; Rotorua showed one reviewed photographed species. South Island three-day Christchurch/Queenstown preview produced six steps. Keyboard Enter advanced from transfer to overnight. Preview navigation kept the itinerary available for explicit saving.

At a 1363 CSS-pixel viewport, North Island had one map with a 320-pixel actual unclipped canvas. South Island had one map with a 336.8125-pixel actual unclipped canvas. Both documents measured 1348 pixels wide, without horizontal overflow. Colombia and Australia retained one header, one footer and one field guide, with no journey panel and no horizontal overflow at the same viewport.

Canonical public proof: https://aves.bio/new-zealand/south-island#trip-planner . Evidence: docs/evidence/2026-11-12-guided-journey.jpg and docs/evidence/2026-11-12-north-journey.jpg. Deployment-scoped error/fatal scan on 12 November 2026, 01:08:24–01:18:24 UTC, found no matching logs.

## Limits and next increment

The journey currently highlights broad town references. Exact airport/property points and richer travel/overnight animation require reviewed public coordinates and access sources. Town points must not be described as airport terminals, hotel entrances, wildlife locations or roads. A selected alternative does not establish a combined schedule, live availability or a reserved connection.

The 22-image Colombian catalogue has existing credit records. Forty additional bird-named repository assets need image, taxon, provenance and rights review before joining that catalogue. See COLOMBIA-MEDIA-INVENTORY-2026-11-12.md. An attribution does not itself establish a public reuse licence. Current status and locality claims must stay separately sourced.

Physical mobile/Safari, independent visitors and wider content/rights review remain outstanding. Narrow navigation is implemented but not newly verified on a physical device. Do not claim launch readiness. Separate the selected South Island ordinal from its town label where those overlap at a zoom level.

CONTINUE-HERE.md is the only active numbered pathway. Next: one reviewed airport/property-point pilot and marker-label polish, followed by the remaining media/content and device/visitor checks. Preserve one map, free exploration, explicit saving, reduced-motion use and a useful actual map canvas. No automated booking or unsolicited sending is introduced.
