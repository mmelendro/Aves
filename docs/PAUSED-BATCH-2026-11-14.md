# Paused development batch — 14 November 2026

## User limit and next action

The user requested a pause after two additional commits, then batches of at most five commits. The first additional commit is `ded0e2f` (accessibility test synchronization); this handoff is the second. Pause after pushing this documentation. Do not automatically begin another batch.

On explicit continuation, first inspect [CI 43577619807](https://github.com/mmelendro/Aves/actions/runs/43577619807) for exact source `ded0e2fb85bc5ec49b59d61caaee57492c45d8c5`. It was in progress at this checkpoint. If all gates pass, deploy that exact spacing candidate and verify the live site before committing/publishing the South Island work. If any check fails, investigate and correct it within the next five-commit maximum. Do not treat the prior failed run as successful.

## Live versus candidate

Production remains `036fa286dfd063298cc201894331557438400c12`, deployment `dpl_6LNCBWt2DXAVBSHRpQHXPVrAz2ME`, https://aves.bio. No deployment was made in this batch. Preserve the www path/query redirect. The Vercel target is team `team_Th6ddqWyWKU1mLzTbJPlduDx`, project `prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv` (`aves-australia`), account mmelendro@gmail.com.

Working checkout: `release-sticky-camera`, local branch `release/sticky-camera-2026-11-14`. Push reviewed commits to GitHub `feature/album-experience`. The original `album-current` checkout remains at 75a09f2 with unrelated team/search/admin drafts intact; do not sweep that working tree into the release.

The spacing candidate measures actual header/toolbar height and scroll margins. Headers taller than 25% of the viewport and toolbars whose combined sticky area exceeds 35% scroll normally. It preserves ordinary sticky behavior where space permits. The production build, local lint/types and 782 unit tests passed during development. Seven focused enlarged-text browser checks passed (one intentional skip). Final local consent/page audits passed all six phone/desktop/Firefox checks.

Previous exact CI 43576247764 passed build, lint/types, 782 unit tests, audits, budgets and priority journeys; the full browser run had 182 passes, 213 intentional skips and one Firefox NSW target-size failure. The delayed first-visit cookie banner could appear during the page audit and partially cover Reset map view. The correction independently audits cookie controls, dismisses consent, and scans the settled page; it also settles consent before the public-sitemap audit. The accessibility assertions and WCAG rule set remain intact. Final exact CI is still required.

## South Island draft — uncommitted and unpublished

Changed files:
- components/geographic-satellite-map.tsx: optional reserved status space so tile-error/retry UI cannot change the South Island canvas extent.
- components/south-island-ecosystem-map.tsx: one mounted geographic renderer after hydration, original SVG retained in server fallback; stable caption and geographic distance scale.
- components/south-island-satellite-map.tsx: georeferenced interactive LCDB SVG, selected habitats, DOC/park overlays, existing place/itinerary layers retained across backgrounds.
- tests/browser/map-camera-continuity.spec.ts: adds South Island to the existing camera/fullscreen regression.
- tests/browser/south-camera-overlays.spec.ts (new): habitat/park persistence and generated itinerary-stop continuity.

The draft production build and types/lint passed. 782 unit tests passed before the final reserved-status/caption correction; 41 focused South Island tests also passed. First broad browser run: 26 passes and one desktop failure caused by tile-error status shrinking the fullscreen canvas by 64px. This is corrected by reserving status space for South Island and stabilizing caption height. Latest focused run: five passes and two intentional skips; two Firefox journeys hit the overall 45-second timeout without a camera mismatch assertion. Phone and desktop camera/overlay checks and desktop itinerary checks passed. Recheck Firefox in isolation, inspect traces and performance, and fix the cause before claiming completion. Do not silently relax camera equality or omit Firefox coverage.

No South Island commit or deployment is authorized as ready merely because the draft exists. Continue normal development/testing within the user's already authorized scope.

## Evidence and preservation

Logs in sibling `audit/`: sticky-build-final.log, sticky-unit-final.log, sticky-acceptance.log, consent-accessibility.log, south-build-final.log, south-all-unit.log, south-browser.log, south-browser-final.log. Browser traces/screenshots in this checkout's ignored test-results directory may be overwritten by later runs. A preserved copy is in sibling `audit/pause-2026-11-14/`.

The four map-cue SVG files marked modified have normalization-only noise; exclude them unless substantive changes are demonstrated. Dependencies are reused through a node_modules junction to album-current. Direct Node commands with NODE_PATH pointing to album-current/node_modules/.pnpm/node_modules were used for local builds; default pnpm invocation hit a local tool-install permission problem. Git push needs the approved network-capable execution path. GitHub CI installs the pinned dependencies normally.

Next batch: finish spacing CI/deploy/live acceptance; then finish South Island Firefox, exact-commit CI, deployment and live verification; update this handoff and the roadmap. Maximum five commits, counting fixes and documentation. Keep unrelated content/admin work separate.
