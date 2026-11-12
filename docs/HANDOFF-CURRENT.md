# AVES public technical checkpoint

Current published runtime: daeda01116bfd0557c8947c7168081e9a81e2cf7. Accepted deployment: dpl_D8TRJc7zZnZdjAsQMLdKF4XLKShU. Canonical domains: aves.bio and www.aves.bio. Rollback: c75a535db034e03a588ed6d835b7aa7b54159cb6 / dpl_2hZAu9RoLCr1DvJZEYhSb262an76. Subsequent documentation commits record the five-photo target and country/subregion gallery relationship; they are not new application deployments.

## Current shared interface

World, country and regional maps use the shared map-first viewer, with controls below the map. South Island uses the shared toolbar. Country previews no longer collapse under their navigation. Direct globe toggling retains map and bird choices; layers remain in the compact picker. South Island retains faded surrounding geography. One map/viewer and enlargement return were checked, including regional satellite navigation.

Bird, place, resource and team carousels share buttons and counters. Bird/place credits open locally, preserve photo and scroll, and restore focus on close. Opening bird credits pauses automatic slides. Four South Island place galleries contain two distinct photographs each, eight total. The target is five per subregion across all countries, with country galleries drawing from those same reviewed records. These wider targets are not yet fulfilled. Requirements: TRAVELLER-WORKSPACE-ROADMAP.md.

## Current verification and limits

612 tests and the strict production build passed. Architecture: 371 reachable modules, zero unreachable. Hosted mobile checks used a 340 CSS-pixel viewport with document width337. Country New Zealand SVG432px actual/unclipped, Australia432px, Colombia342px. South Island habitat590px actual/unclipped and satellite448px actual/unclipped. The world overview retains its geographic aspect ratio. Place credit panels fit the narrow screen. Credits close with unchanged selected image and page scroll; enlargement retains the slide. All three newly added place photos loaded. Resource and team next controls advanced; bird credits paused the slideshow. Canonical error/fatal scan found no matching logs in its scoped ten-minute window.

Physical iPhone/Safari, independent visitors, wider media review and launch readiness remain unverified. Precise airports/property points are not yet implemented. Itinerary ordinals are now positioned above place labels, preserving their geographic anchor. A three-day Christchurch/Queenstown hosted preview confirmed a12px gap at desktop and340 CSS-pixel widths, with one map. Next bounded increment: review exact public airport/property points for one corridor. Preserve full accessible ordinal labels through zoom callbacks in the next polish. Preserve static/reduced-motion use, existing drafts and free exploration.

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
