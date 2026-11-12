# AVES public technical checkpoint

Current published runtime:5c92d3625e34d07683dc98f3a31e20a46ee945f8. Accepted deployment:dpl_6JYQgT436EJF6FMGHFRLbzZchdY5. Canonical aliases aves.bio and www.aves.bio both resolve to this deployment. Rollback:d805201861e3b69afdbc03f04b7d9c542152530f / dpl_GqJkcoebQQgtFpFqSQkEQJUxNsap. Documentation commits do not represent new application deployments.

## Current autonomous batch and touch correction

Roadmap12–16 is delivered, plus the owner’s direct mobile-map correction. The next five remaining autonomous items are17–21. Preserve9–11 as pending physical-device/independent-person checks. The owner’s latest batch request is ten tasks total, with urgent map defects ahead of content or private review work.

All maintained map families start with direct gestures: shared planning maps, South Island SVG and the single satellite engine. Dragging at fit works without Move; pinch and double tap zoom the map. Optional hand controls pause gestures. Native page interactions remain outside the canvas. A single habitat/region tap remains available. Photos retain their existing tighter bounds. Details are in MOBILE-MAP-TOUCH-2026-11-12.md.

Auckland airport is opt-in; the existing ibis stay receives its reviewed operator GPS only when selected. Both islands reuse the transient journey hook for selected locations, a1200ms schematic transfer bead and an overnight highlight. Fit the camera immediately, then animate the bead: a cancellable animated fit could leave the destination outside the viewport. Reduced motion and manual static mode retain full labels/endpoints. Explore freely removes transient layers and cancels frames; no automatic step advance. JOURNEY-REFERENCES-MOTION-2026-11-12.md records sources and scope.

624 tests, strict TypeScript and76-page production build passed;375 source modules, zero unreachable. Touch-type component tests cover drag at fit, pinch and double tap. Hosted native-input checks moved a fitted Colombia map100px/50px, doubled the world map to1.5x and the South Island SVG from2x to3x. Habitat keyboard selection remains available, while click-capture tests preserve single taps. Satellite starts with native drag/touch classes enabled. At340 CSS pixels document337 had no overflow and one active map. Physical iPhone/Safari remains unverified.

Hosted and canonical checks exercised Auckland airport, ibis overnight, Christchurch airport/Novotel preservation, sourced95-minute transfer, static mode and Explore freely cleanup. Both canonical aliases resolve to the accepted touch release. Proof:aves-map-free-touch-live.jpg and aves-journey-motion-live.jpg. No private-record write, booking, invitation send, schema change or new dependency was performed.

## Current gallery priority and release

Roadmap items1–8 are delivered. The latest five-item batch covers4–8: North Island five photographs, Rakiura five photographs, count/filter checks, country overview card reuse, and narrow/keyboard/enlargement/credit checks. The owner requests five eligible items at a time with emphasis on autonomous work. NEXT remaining batch:17–21. Item9 requires physical iPhone/Safari, item10 an independent visitor, and item11 that visitor’s feedback. These remain pending, rather than falsely complete. CONTINUE-HERE.md remains the only active90-increment queue;91–100 are explicitly proposed follow-ons.

Arthur’s Pass, Nelson Lakes, Fiordland and Otago/the Catlins each have five photographs:20 South Island photographs. North Island and Rakiura each have five, bringing the shared library to30. The country preview now has six, two per island, and each island overview card uses a photo from the same regional library. These are current gallery collection counts, not five photos for every locality or worldwide coverage. Colombia and Australia expansion remains incomplete.

This batch adds eight distinct real photographs, with locality, creator, licence, capture date, original/rendition hash and central credits. The new WebP assets total about1.38MB; all22 reviewed-addition hashes match the local renditions and have unique original hashes. Source metadata is in content/place-gallery-additions.json. Photos do not establish current access, current services or bird sightings. All gallery and card surfaces reuse PhotoCredit, PhotoZoom and ExpandableMedia. No second map or new dependency is introduced.

Hosted acceptance found and fixed an old overview map link and a native-dialog scroll jump. The overview link now targets country-discovery-map. The shared viewer records the page position and restores it after React returns the viewer to inline layout; explicit map navigation and guide restoration keep their own navigation. A regression check exercises page-position restoration after native show/close changes scroll.

618 tests, strict TypeScript and the76-page production build passed. Architecture audit:374 reachable modules, zero unreachable. Hosted acceptance reviewed all five North Island and five Rakiura captions, regional counts, six-photo country restoration, keyboard arrow navigation, inline credit Escape without scroll/slide loss, same-photo enlargement return, three shared island overview thumbnails and enlargement. A settled overview-card test returned to the same3683px scroll position. At340 CSS pixels the document was337px wide and gallery photo303px wide by545px high without horizontal overflow. Physical Safari/touch remains unverified.

Both canonical aliases were checked against the accepted deployment. Public verification showed the six-photo overview and the new Lee Bay photo at2of5 in the Rakiura collection: https://aves.bio/new-zealand . Public proof image: aves-five-item-gallery-live.jpg. Private journal material is excluded from this release. Uploads, sharing, business viability and full launch readiness remain incomplete.

## Earlier reviewed location pilot

Christchurch arrival/departure steps now offer an explicit Christchurch Airport reference, sourced from OurAirports public-domain airport-area coordinates and the official airport map. Town reference remains the default. Selecting the exact Novotel Christchurch Airport catalogue stay gives its overnight step the operator-published property GPS. Both references highlight within the existing habitat/satellite viewer, show their sources/review date and preserve local-base bird context. They do not establish terminal doors, road paths, bookings, environmental certification or airport/property bird checklists. Airport choice belongs to the current preview and is not persisted as a flight booking or imported into the saved itinerary. Full ordinal accessible labels survive map zoom.

614 tests, strict local and exact-source hosted builds passed. Architecture: 372 reachable modules, zero unreachable. Hosted airport selection, selected-property overnight and habitat/satellite switching passed. At 340 CSS pixels, document width337, one satellite map448px high, airport label fully inside its map. This is a narrow-width browser check, not physical Safari/touch acceptance. Canonical selected-hotel preview and both domains verified. Deployment-scoped error/fatal scan 04:24–04:34 UTC found no matching logs. Public proof is retained privately with the development checkpoint; no private trip content enters repository evidence.

The private journal/community requirements are recorded in TRAVELLER-WORKSPACE-ROADMAP.md. This earlier journal-first direction is superseded by the owner’s gallery priority and ranked queue above. Uploads and community publication are not implemented. An owner-only Colombia example and invitation draft are separate from the public application; do not copy private source material into this public repository. Maintain the numbered pathway and five-photo/subregion targets.

## Current shared interface

World, country and regional maps use the shared map-first viewer, with controls below the map. South Island uses the shared toolbar. Country previews no longer collapse under their navigation. Direct globe toggling retains map and bird choices; layers remain in the compact picker. South Island retains faded surrounding geography. One map/viewer and enlargement return were checked, including regional satellite navigation.

Bird, place, resource and team carousels share buttons and counters. Bird/place credits open locally, preserve photo and scroll, and restore focus on close. Opening bird credits pauses automatic slides. Arthur’s Pass now has five distinct photographs; the other three South Island galleries retain two each, eleven total. The target is five per subregion across all countries, with country galleries drawing from those same reviewed records. These wider targets are not yet fulfilled. Requirements: TRAVELLER-WORKSPACE-ROADMAP.md.

## Current verification and limits

Earlier shared-viewer acceptance: 612 tests and the strict production build passed. Architecture: 371 reachable modules, zero unreachable. Hosted mobile checks used a 340 CSS-pixel viewport with document width337. Country New Zealand SVG432px actual/unclipped, Australia432px, Colombia342px. South Island habitat590px actual/unclipped and satellite448px actual/unclipped. The world overview retains its geographic aspect ratio. Place credit panels fit the narrow screen. Credits close with unchanged selected image and page scroll; enlargement retains the slide. All three newly added place photos loaded. Resource and team next controls advanced; bird credits paused the slideshow. Canonical error/fatal scan found no matching logs in its scoped ten-minute window.

Physical iPhone/Safari, independent visitors, wider media review and launch readiness remain unverified. The precise-place pilot covers only Christchurch Airport and the selected Novotel property; wider points remain unreviewed. Itinerary ordinals are now positioned above place labels, preserving their geographic anchor. A three-day Christchurch/Queenstown hosted preview confirmed a12px gap at desktop and340 CSS-pixel widths, with one map. The airport/property pilot and full ordinal-label preservation are now delivered. The next remaining batch is roadmap items17–21, as prioritised above. Preserve static/reduced-motion use, existing drafts and free exploration.

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
