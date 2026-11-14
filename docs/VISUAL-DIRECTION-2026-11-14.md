# Map and album direction — 14 November 2026

The latest user request resumes work and puts map/carousel presentation first. Continue in batches of no more than five commits, then pause with a durable handoff. The earlier two-commit pause was completed. The source/deployment gates still apply.

## Batch checkpoint

Implementation commits pushed: `500e6e0` (compact albums/map controls) and `db3cee9` (eBird links). Current exact-commit CI: [43582332051](https://github.com/mmelendro/Aves/actions/runs/43582332051), for `db3cee98145cb139ce0c9c0bc184f6b3f6ae7495`. It was queued/running at this checkpoint; no deployment was made. aves.bio still points to `dpl_6LNCBWt2DXAVBSHRpQHXPVrAz2ME` (confirmed through Vercel).

Local validation: production build for the visual increment passed; 10 focused phone/desktop album-and-map checks passed, and screenshots were inspected. The phone layer panel initially extended off-screen; anchoring it to the control dock and bounding its width/height corrected that. Scoped visual unit tests: 16 passed. eBird link/reference tests: 11 passed. eBird lint passed after fixing the carousel client directive. Full exact-commit CI remains the release authority because local builds also contain the preserved, excluded South Island draft.

Evidence: sibling audit/visual-acceptance.log, visual-build-dock.log, visual-lint.log, visual-unit.log, ebird-tests-final.log and ebird-build-final.log. The final eBird production build completed successfully. Catalogue deferral, deferred geometry and download-size budgets also passed (homepage 341,917 / 367,210 estimated gzip bytes; account 323,622 / 356,026).

On continuation, inspect exact CI first; correct failures before deploying. Verify the actual deployed map, imagery, overlays and carousel on phone/desktop, then record rollback. Continue remaining visual priorities below in a new batch of at most five commits.

## eBird links

The user added a request for links on all birds. Inventory cards and shared featured carousels now expose a discreet eBird action. Downloaded the public species taxonomy from https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=csv&cat=species . Exact scientific-name matching yields 2,946 direct species links across 3,038 names found in site content; 92 unresolved names have a labelled Find on eBird web search restricted to ebird.org/species/. No species code is invented and no species identities are merged. Audit provenance and unresolved names are in docs/audit/ebird-links-2026-11-14.json. The full inventory lookup stays on the server; featured carousels use a 583-name subset. Canonical URL examples and unresolved-name handling are unit-tested.

## Current visual increment

- Inventory becomes a native swipeable carousel of the loaded species cards; every matching species remains reachable through existing country filters/search/pagination. Do not imply that all national records are already loaded into one client array. Compact 3:2 media, discreet arrows and retained native list semantics.
- Photograph credits become a simple carousel; expanded attribution/licence stays available under Credit & licence.
- Global/national assessment explanations and photo credit text are collapsed. Visible wording is concise; source links and licence information remain available by tap/keyboard. The main taxonomy explanation is shortened.
- Follow-bird playback uses Auto-listen with pressed state, and detailed status remains accessible without taking a full visible row.
- Map controls overlay the map with a translucent surface. Layer choices open above the controls as a compact dropdown. Long map source paragraphs are collapsed into Map info & credits.
- Country inventory tabs prominently feature Colombia, Australia and New Zealand, with a strong selected state.

## Next visual priorities

1. Inspect phone/desktop screenshots and correct the reported empty space in each actual map mode; do not equate moving controls with proving every source of blank space is removed.
2. Put an actual location search on the map, sharing the destination/region/place selection state. Native country/region selectors are not yet a unified map search.
3. Complete all-species carousel navigation across page boundaries, retaining query/history, missing-photo states and bounded loading. The current rail is a first increment, not a claim that every species is loaded at once.
4. Simplify all remaining recording/credit collections into the same compact carousel language, preserving deep-link credit anchors.
5. Animate actual wings during flight. Current logo birds are flattened raster artwork, so translation/rotation does not constitute wing animation. Prepare separated wing artwork or an accurate vector rig, respect reduced motion, and verify regional membership from occurrence evidence. Do not select logo birds using national membership alone where regional evidence is absent.
6. Research reusable regional gallery fallbacks. Wikimedia Commons supports location-based file search: https://commons.wikimedia.org/wiki/Commons:Search_by_location . Build a bounded, cached, attributed collection with location review and an honest fallback; do not silently populate arbitrary Google image search results. No gallery provider integration was added in this increment.

## Existing release and drafts

CI 43577619807 for ded0e2f finished with failure; the candidate was not deployed. Production was last verified at 036fa28. Inspect exact job evidence before the next deployment. The South Island continuity work remains uncommitted in the same checkout and must not accidentally ship with visual changes. Its latest focused Firefox journeys timed out; phone/desktop and itinerary checks passed. Preserve its files and the prior audit backup.

Unrelated team, About, creator and admin drafts remain in album-current. The current credits change uses the committed page and does not import the older CreatorAlbum draft or its biographies/account claims.

Working checkout: release-sticky-camera, local branch release/sticky-camera-2026-11-14; reviewed source pushes target feature/album-experience. Stage only the visual files listed by each commit; geographic-satellite-map.tsx contains the committed compact-info change and a separate unstaged South Island status-space draft.
