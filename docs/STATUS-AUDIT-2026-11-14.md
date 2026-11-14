# AVES status, pending changes and legacy review — 14 November 2026

This checkpoint follows the owner's instruction to finish one further change, commit and push it, audit the current state, then pause. It supersedes older “running CI” notices. No further feature development is authorized within this paused batch until resumed.

## Production and release status

The Vercel connector confirms that `aves.bio` points to READY production deployment `dpl_6LNCBWt2DXAVBSHRpQHXPVrAz2ME`, source `036fa286dfd063298cc201894331557438400c12`, project `aves-australia` (`prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv`). No deployment has been made in this batch. The production release predates the compact floating controls and eBird-link candidate.

[CI 43583359399](https://github.com/mmelendro/Aves/actions/runs/43583359399) for `6872eda` completed with failure: 185 browser checks passed, 217 intentional project skips, six failures. Five were Firefox accessibility scans reporting `Page crashed`; the remaining failure was a 320px Sierra Nevada map-source disclosure partly obscured by the floating control dock. Lint, types, units, application build and earlier workflow steps passed in that run. Previous visual/eBird run 43582332051 also failed; it was never a successful release.

The change accompanying this document anchors the floating dock to the actual map canvas rather than the complete viewer, leaving source notes below it. It observes canvas, dock and viewer sizes and follows inner-surface scrolling when credits open. Expanded-map controls retain their existing position. Dedicated phone, desktop Chromium and Firefox journeys exercise placement and opening map credits. This is a targeted repair, not a claim that the Firefox accessibility crashes are fixed. Its pushed commit requires its own full CI result before any deployment. Check [branch workflow runs](https://github.com/mmelendro/Aves/actions?query=branch%3Afeature%2Falbum-experience) against the exact source SHA.

Local verification of the completed change: production build including lint/types passed; all **784 unit tests** passed; **nine focused browser checks** passed (six dock/credit journeys and three Sierra Nevada accessibility scans across phone-320, desktop Chromium and Firefox). Source reachability, gallery snapshot consistency, generated map cues, catalogue loading and performance budgets passed. Estimated homepage gzip is 340,930 bytes against 367,210; account is 323,012 against 356,026. These are scoped checks, not a replacement for full CI. Local pnpm dependency resolution required `NODE_PATH` pointing to `node_modules/.pnpm/node_modules` for ESLint/build; the repository dependency versions were left unchanged.

## Committed but unpublished

The following commits are descendants of the live source and ancestors of this checkpoint, oldest first. All are already pushed to `feature/album-experience`; “pending” here means pending publication, not unpushed work. The accompanying dock repair is one additional commit.

| Commit | Change | State |
| --- | --- | --- |
| `3b2e52f` | Record camera release and reflow follow-up | Documentation |
| `75a09f2` | Record verified camera and phone reflow releases | Documentation |
| `249e525` | Reconcile release and work queue | Documentation |
| `ffd076d` | Measure sticky guide spacing for enlarged text | Unpublished spacing candidate |
| `fc8c0da` | Accept map-first homepage in spacing checks | Unpublished test change |
| `0694930` | Let oversized headers scroll on short viewports | Unpublished spacing candidate |
| `e742295` | Wait for map hydration in enlarged-navigation tests | Unpublished test change |
| `8e619d5` | Reserve more viewport space below enlarged controls | Unpublished spacing candidate |
| `ded0e2f` | Separate consent and settled-page accessibility audits | CI 43577619807 failed |
| `abecfa9` | Preserve release status and capped-batch handoff | Documentation |
| `500e6e0` | Compact bird albums, credits and floating map controls | Unpublished visual candidate |
| `db3cee9` | Verified eBird taxonomy links, labelled search fallbacks | Unpublished; subsequent CI failed |
| `e2903db` | Visual direction/eBird checkpoint | Documentation |
| `6872eda` | Move Leaflet attribution top-left; one CI browser worker | CI 43583359399 failed |

## Preserved incomplete work

| Location | Contents | Completion needed |
| --- | --- | --- |
| `release-map-search`, stash `c27f0b6e389dcbc47b3344110a729692385bb6a3` | Natural-height landscape photos, over-photo captions/credits/navigation and compact photo-mode framing | Build and browser/visual acceptance; check short panoramas and phone credits |
| Same stash | Public bounded map-search endpoint, map overlay search, unit/browser test drafts | End-to-end verification, keyboard/mobile checks and exact-commit gates |
| Same stash | Inventory carousel arrows crossing 40-result server pages with filters preserved | Verify boundaries, browser history, filter changes and missing media |
| Same stash | Playwright 1.65.1 experiment and temporary Firefox diagnostics | Not a proven fix; do not restore indiscriminately. The committed dependency remains 1.65.0 |
| `release-sticky-camera`, branch `release/sticky-camera-2026-11-14`, HEAD `e2903db` | South Island habitat/satellite camera adapters and continuity/overlay tests | Resolve Firefox timeouts; preserve habitats, DOC/LCDB, places and itinerary behaviour |
| `album-current`, local `feature/album-experience`, HEAD `75a09f2` | About/team/creator/profile, header search, admin-plan cleanup and supporting data/media drafts | Review and release independently; local branch is behind the pushed release branch. Do not push this stale HEAD over it |

The stash was verified to contain the untracked search route/components/tests as well as tracked drafts. An additional tracked-change patch and staged-dock patch are retained in the parent `audit` directory. Restore feature files selectively: the stash also contains an earlier dock patch that overlaps this checkpoint, plus unsuccessful dependency/diagnostic experiments. Do not blindly pop the whole stash over the new repair. Generated assets, dependencies and browser traces are local evidence, not additional pending product commits. No worktree, asset collection, account data or original draft was deleted.

## Code, comments and legacy review

- The current static source audit reports **485 modules and no unreachable modules**. This is a dependency-graph result; it does not prove that every export or historical route is required.
- The cleanup scan reports **96 routes, no dependency-removal candidates, no single-reference export candidates, 1,771 local public files, 390 duplicate-content groups and 10,458,613 extra bytes**. The local asset set includes generated renditions and can differ from a fresh checkout. Duplicates remain candidates for review against old URLs, computed paths, provenance and Australian compatibility.
- The original cleanup script treats a Windows rendition junction as a file and exits with `EISDIR`. A read-only local adapter that follows directory junctions produced the counts above; no repository audit script was changed. CI uses ordinary generated directories. A portable junction-aware audit improvement is a separate follow-up.
- Searches for `TODO`, `FIXME`, `HACK` and `XXX` in application/component/library/feature source found no matches. Absence of markers does not mean the roadmap is complete.
- Compatibility code remains intentional: older Australian account/auth/API paths, shopping redirects, contact payload support and legacy guest itinerary data. Removing these without route/session/link evidence could break existing visitors. This checkpoint makes no compatibility deletions.
- The `BirdFilterControls` comment about retaining the legacy `align` prop matches two current callers. It is an adapter, not proven dead code. Remove it only together with those callers in a small verified change.
- `components/map-viewer.module.css` has accumulated successive `.toolbar`/`.surface` overrides. Some earlier prose describes a normal-flow map-first arrangement while later rules float the dock. Consolidation would improve maintenance, but needs visual checks across expanded, inline, geographic and specialist map surfaces. This repair keeps its behavioural scope narrow.
- Carousel and brand comments must remain honest: featured bird selections are incomplete; the current inventory rail still loads 40 records per server page; logo artwork is flattened raster media; translating a bird does not flap its wings. The logo currently navigates to an inventory URL. The new in-page carousel selection behaviour is requested and not implemented.
- Older roadmap/checkpoint documents retain historical CI states and worktree descriptions. The active roadmap and visual-direction file now point here and distinguish failed, unpublished and live work. Historical evidence was retained rather than rewritten as a successful release.
- `album-current` contains many untracked build logs, diagnostics and test-result folders alongside genuine product drafts. These should be classified and backed up before any later cleanup. Do not treat that directory as a release-ready diff.

## Remaining requested behaviour

1. Resolve Firefox accessibility crashes without skipping the browser, removing WCAG tags, disabling target-size checks or claiming one diagnostic pass proves stability. Global/scoped blur removal, scroll-snap removal, fresh browser processes, legacy axe mode, optimizer settings, reduced result detail and Playwright 1.65.1 did not establish a reliable fix. None of these experiments was committed as a repair.
2. Once exact-commit gates pass, deploy only that verified source, preserve the canonical `aves.bio`/www redirect, and verify the live release.
3. Resume photo-led landscape presentation, map search and full inventory navigation from the preserved drafts, one reviewed increment at a time.
4. Logo bird clicks should select the bird in the existing active carousel on the same page. Keep inventory URL fallback, stable species matching, deterministic handling of multiple carousels, filter resolution and map/guide face coordination. No implementation is included at this checkpoint.
5. Keep requested global megadiverse-country/hotspot layers, natural flock formations, genuine logo wing flapping, regional membership and community “our flock” language in the roadmap. Sources and acceptance detail are in [visual direction](VISUAL-DIRECTION-2026-11-14.md).

The user requested a pause after this commit/push/audit. Do not resume feature development or start a new batch automatically.
