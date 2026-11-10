# Map-first two-sided guide · 11 November 2026

Published runtime: d091314c0764448f6f1367115b1184bd95914ac7.
Production: dpl_CrYVdpeTESBACZcnkp7zi311skMz, READY in prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv. Both aves.bio and www.aves.bio aliases verified on it.
Source tree: b191aa83489e0e3c4e793c6a90f891a6aa66083c.

## Delivered behavior

The shared map/media container offers deliberate Turn to the map / Turn to the birds controls and a gentle CSS 3D turn. Both faces remain mounted. Inert and aria-hidden exclude the reverse face from keyboard and assistive navigation. Reduced motion removes the transition. Show map & birds together retains the existing resizable comparison.

A compact map-footer thumbnail follows the current bird in the selected region/habitat collection, with its first valid bird as fallback. Clicking it opens the existing carousel and restores focus to the turning control. Expanded maps retain the same cue and close before returning. AU asset prefixes remain correct. Existing fragment links reveal the map face without blocking native navigation.

Following the owner's refinement, the global homepage starts with the world map ahead of the introductory copy. Shared destination explorers start on Map. Map content comes before the bird cue, rather than underneath a thumbnail banner. Turning scrolls the fitted frame into view without resetting map camera or selection. Map/photo heights follow the available viewport; guide photographs use contain. Guide and map toolbars remain available in their scrolling contexts. Existing selected-region birds and planning notes update with the map. South Island preserves its layer map and puts island navigation below it.

No new dependency, backend/auth/database/provider configuration, paid service or billing change. The prior US$1 safeguard was unchanged, not freshly inspected.

## Verification and limits

484 automated checks passed. A subsequent focused 24-check homepage run passed after adding the map-first regression assertion. Strict TypeScript and exact hosted production build passed. The earlier guide passed 483 checks; this refinement adds map-first/reveal coverage.

Browser acceptance covered world entry, Australia/NSW selection, current bird cue, contain rendering, turning/reveal, full-size cue and close, comparison and return. Preview checks also covered South Island links, island selection, layer-map presence and full-screen cue return. Live homepage frame was 960 × 704 within a 1363 × 936 browser viewport, with no page-width overflow. Opening world map, controls and cue fit that tested screen.

Exact phone viewport and physical Safari/touch remain unverified. DevTools mobile emulation is disabled by browser policy; no bypass was attempted. Viewport sizing and narrow-layout CSS are implemented, but this is not evidence of perfect fit on every phone or short landscape screen. Full-site style/authenticated-provider/range/endemic audits remain queued.

The 10-minute production error/fatal scan ending 2026-11-10T22:19:16.180Z returned no matching entries. This bounded scan does not prove absence of all defects.

Recovery: see ROLLBACK-CHECKPOINTS.md. Earlier core and first-guide deployments remain recorded. Domain registration transfer and old-project retirement remain pending.
