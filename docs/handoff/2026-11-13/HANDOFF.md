# Source recovery branch for desktop integration

Branch: `handoff/2026-11-13-saved-map-bird-guide`.
Source snapshot based on local commit `076703a4973677d4ec968c978f94af86705022e8`.
The connected GitHub service uses the matching remote parent `bb2fc99d212802b6f90d102ee8aadf897f8cca43`, whose source tree is identical to that local base. Local commit objects are not direct remote ancestors because command-line Git write credentials are unavailable. The uploaded final source tree is verified against the local checkpoint. Do not mistake different commit metadata for missing source changes.
This snapshot preserves all 26 unfinished map source files and the ten preceding local repair commits. It is work in progress, not a deployable release. No current-tree validation or feature completion is claimed.

The source-only branch is being uploaded with explicit owner approval so the desktop chat can fetch it. Production branches and deployments must remain untouched. The earlier local-only wording below describes the preceding checkpoint, not a restriction on this now-authorised handoff branch upload.

Fetch only this branch into the desktop checkout, inspect it, and integrate into a separate working branch. Do not reset an older desktop checkout over this state. `1666c6d` was not present locally, so no ancestry assertion was made. The original absolute paths below belong to the source chat's workspace. On desktop, use this branch's repository-relative paths and the research JSON beside this document. The Git bundle/archive are local backups and are not required once this branch has been fetched.

Source review found no secrets or private customer records in the 62 outgoing changed source paths. Flagged strings were example.com/example.invalid placeholders or generic UI copy. All 26 source files are retained. Excluded source files: none. Local credentials, session caches, bundles, PDFs, rendered reports and logs were not added to Git.

Spanish style: no standalone owner prose/style sample was located. The existing product-copy dictionaries `content/colombia-home-es.json` and `content/account-ui-es.json` are available, but are not a personal writing sample.

Public soundscape-source research is included as `soundscape-candidates.json` and `soundscape-coverage.json`. These contain metadata and source links only, not new audio assets or completed player integration.

---

# AVES desktop handoff: work stopped locally

## Exact saved state

Workspace: `/workspace/scratch/74beaf1c4655`
Repository: `/workspace/scratch/74beaf1c4655/aves`
Branch: `feature/field-guide-card`
Local HEAD: `076703a4973677d4ec968c978f94af86705022e8`
Preserve the independent `australia/preview` application.
The desktop copy is reported as `1666c6d`. That object is NOT present in this checkout, so its ancestry and compatibility have not been established. Do not reset this working tree to the desktop copy or assume the desktop copy contains any of this work.

No implementation, upload, branch push, publication or deployment was performed after the handoff request. Existing working files were saved as they stood. No new source commit was created for the unfinished work.

## Local access without uploading

If the desktop chat can access this filesystem, open the exact repository above directly. This is the preferred route because it contains both the ten local repair commits and all uncommitted map work.

This folder also contains a local Git bundle, a binary tracked-file patch, an archive of all 26 uncommitted source files, a status listing and SHA-256 hashes. The bundle carries the committed branch history. The archive/patch carry the unfinished changes and must not be omitted.

For a separate clean directory on the SAME filesystem, clone the bundle, check out `feature/field-guide-card`, then extract `uncommitted-files.tar.gz` into that clone. Extracting the archive restores both modified and new files. Do NOT apply the patch as well after extracting the archive. The patch is an alternative for tracked changes only, with untracked files supplied separately.

A desktop chat in a different isolated filesystem cannot read these absolute paths automatically. No server-side mount or cross-chat transfer has been created. Without shared filesystem access, a local download/copy of the bundle and archive is required. No GitHub pull can obtain the unpublished working tree. These artifacts have not been uploaded anywhere.

## Publication state

Last verified public runtime: `43943bb2740dfce0fafd43577ffbafec3037ed5a`.
Last verified production deployment: `dpl_49nEtSR46vpeufJSdLncJ8r9i8Te`.
Public site: https://aves.bio
Last known remote branch head: `c5f2eda6f4a8d20690993eb0778879cfb1b3ebe6`.
No fresh remote inspection was performed for this local-only handoff.

Before the handoff request, ten matching GitHub tree/commit objects had been created through the connector, ending at `bb2fc99d212802b6f90d102ee8aadf897f8cca43`. The branch ref was NOT advanced to those objects. Their SHAs differ from the local commit SHAs because their commit metadata differ. Do not confuse unreferenced objects with a pushed branch or live release. Local transfer payloads are in `/workspace/scratch/74beaf1c4655/repairs-sync/`.

## Ten completed local repair commits, not released

5903a4a: Scheduler button no longer submits enquiries.
cbc7adc: Hash-only workspace history preserves dirty edits without a false leave prompt.
b5d7315: Public enquiry draft guards and contextual enquiry links.
47c064e: Accurate saved-record export wording before deletion.
4c7dc1f: Source/gallery/HTML CI gates and enquiry recovery regression coverage.
ff6ad2d: Cookie copy reflects actual behaviour.
6d8fb1c: Responsive, dismissible scheduling dialog and both enquiry guards.
8167ed0: Lint/hook fixes preserving editing, media and map invariants.
e203685: Current recovery runbook references.
076703a: Retain scheduling error indicator.

Current register: `docs/audit/queue-2026-11-13.json`, 28 tasks numbered 0–27. It still reflects the last published audit. Do not mark 0–8 published yet. Original 19 decision/access/participation tasks remain pending. Latest new map/media/album requests have not yet been entered as final numbered tasks.

## Unfinished map work already saved

Shared exact-location photo request bridge and deferred country gallery loader are implemented locally. SVG/Leaflet region and place actions are partly wired. Strict matching avoids substituting an unrelated place photo. Missing photographs show an honest empty state.

The new photo panel currently sits AFTER MapViewer and closes its fullscreen on a photo request. This is transitional and violates the latest requested behaviour. Replace it with an obvious Map / Place toggle within the same frame, preserving map mount, camera and fullscreen.

Map basemap definitions now include satellite, roads and topographic. Background context now has a shared fullscreen preference, but MapViewer still uses LOCAL expanded state and does not restore the preference. NZ to South Island fullscreen persistence remains unfixed.

MapControlsContext exists and GeographicSatelliteMap registers engine zoom/reset callbacks, but MapViewer does NOT yet provide/consume that context. Leaflet's previous zoom widget was removed. Until this is completed, the satellite engine may have no visible zoom controls. Do not publish this intermediate state.

MapViewer and South Island still retain redundant hand/move controls. South Island still tests background===satellite, so roads/topographic do not consistently select the geographic engine. Remove redundant controls and implement one uniform zoom/reset/layers/fullscreen toolbar on every map. South Island needs custom planning-camera control registration or equivalent callbacks.

Layer menus were changed to nonmodal attached dropdowns and selection handlers no longer close them. This needs positioning, clipping, focus, Escape and map-interaction verification in both inline and fullscreen frames. Protected-area fill opacity is partly added. Selected fill currently has a minimum opacity, so slider zero may not mean transparent.

ResizableDiscoveryPair now distinguishes cross-surface flip icons from actual map fullscreen, and preview requests can fire even if the face is unchanged. Needs browser tests.

Cities need uniform legible dot/label styling and click-to-zoom checks. North Island city selection partly zooms to level12. Business Google Maps links already exist, but the improved map/address presentation is not implemented. No paid embed, API key or new spend is authorised/required.

World map wide/short issue is NOT fixed or conclusively diagnosed. Inspect `world-destination-map.tsx`, `world-map-scene.tsx`, `world-destination-map.module.css`, `map-viewer.module.css` and `content/world-map.json`. Equal Earth is inherently wider than tall; retain geography proportions and correct frame/available-height behaviour rather than stretching SVG. Existing unit tests already check projection and complete geometry.

## Latest inventory / bird guide / media requests: not implemented

Use Bird guide rather than Bird inventory for browsing. Wishlist wording can remain Birds you'd love to see.

Create a polished, visually scannable collectible album inspired by Chocolatinas Jet: photo fronts, a smooth accessible flip/reveal of species identity, habitat and range, with search and filters retained. Do not present unreviewed range as established presence or copy branded artwork.

Current inventory remains the older text-heavy server-rendered paginated list (40 results). Search uses GET forms and should keep URL/pagination/history and non-JS usability. Main files: `components/country-species-inventory.tsx`, `app/species/reference/page.tsx`, `components/inventory-search-submit.tsx`, `lib/species-reference.ts`, `lib/species-reference-query.ts`, `lib/species-reference-types.ts`.

Improve image quality when resized across all bird libraries. Likely areas to inspect: `components/responsive-photo.tsx` rendition/sizes selection, low-bandwidth preference, `content/photo-renditions.json`, full-screen image sizing, source dimensions, and small source assets. This is a hypothesis, not a verified root cause. No replacement image assets were added and no image fix was made.

Bird guide without a map should fit its photo with minimal empty surrounding space. Inspect `homepage-bird-carousel.tsx`, `expandable-media.tsx`, `expandable-media.module.css`, `photo-zoom.tsx` and the standalone caller layouts. Preserve aspect ratios and image provenance.

Replace verbose follow-call copy with a clear compact icon/pressed state and accessible label/tooltip. Actual playback/loading/error messages must remain understandable. No code changed for this yet.

Add direct eBird species profile links throughout bird libraries. No complete reliable code mapping is present yet. Some BirdProfile.sources already contain canonical eBird URLs. Do not invent species codes or silently map taxonomic splits/lumps by fuzzy name.

Official source checked: https://www.birds.cornell.edu/clementschecklist/download/ redirects to the 2026 citation/downloads page, offering eBird taxonomy CSV. Also official https://support.ebird.org/en/support/solutions/articles/48000837816-the-ebird-taxonomy. An attempted Python download using requests failed because requests is not installed. No taxonomy was downloaded, imported or joined. Prefer verified static profile links and source-backed exact taxonomy crosswalks; this does not authorise a commercial live eBird API integration.

Videos for all place/business pages are a future request. No footage was supplied or fabricated.

## Regional soundscapes

Research saved locally at `/workspace/scratch/74beaf1c4655/soundscape-research/candidates.json` and `coverage.json`.
15 verified official recording-source candidates: six Colombia regions, eight Australian regions, New Zealand North Island. Existing three South Island tracks remain. Seven regional gaps remain: Colombia Western Andes/Cauca/Magdalena/Llanos/Massif, Australia Jervis Bay Territory, New Zealand Rakiura.
No audio assets were downloaded. No source cards or player integration were added yet. Do not guess Freesound preview/CDN URLs or bypass sign-in. External Listen at source cards with creator, exact locality and licence are an honest implementable option. A Rakiura Ulva Island Commons tīeke video lead has not been auditioned and must not count as confirmed ambience.

## Outstanding checks

Before uncommitted map changes: all 777 unit tests passed, lint had zero errors/warnings, typecheck logs were clean. Logs: `/workspace/scratch/74beaf1c4655/repair-unit.log`, `repair-lint-3.log`, `repair-types-final.log`.
`map-photo-types.log` is empty but predates the latest controls/basemaps edits. It does NOT establish current-tree validation.
Current unfinished tree has NOT had a final typecheck, lint, unit suite, build, full browser suite, performance budgets or live QA. No test was run for the handoff request.
Meaningful browser regressions needed: strict place matching, map/photo toggle, layer picker staying open with working map, one control set on all backgrounds, fullscreen preserving the selected surface and NZ→SouthIsland size, world aspect/frame, high-resolution source selection at resize, album keyboard/touch/reduced-motion, search/filters/pagination and eBird link correctness.
CI-only synthetic enquiry tests added in `tests/browser/final-repairs.spec.ts` and fixture preparation remain unrun on GitHub for this candidate. Never send real enquiries during verification.
Local ESLint shared dependencies previously needed NODE_PATH pointing to existing `.pnpm/*eslint-plugin*/node_modules` directories. Do not mutate shared dependencies to fix resolution. Managed preview was unavailable due to unsupported Next launcher --host flag. No separate local server was started.

## Business plan and reports still unfinished

Owner business plan local copy: `/workspace/scratch/74beaf1c4655/repair-plan/AVES_Business_Plan_2026-11.pdf`, 10 pages. Page2 contains stale runtime/test evidence; it was inspected but NOT edited. Update only after actual release validation, preserve unknown actual financial inputs. Prior render `before-page2.png` is in the same folder.
Audit report local: `/workspace/scratch/74beaf1c4655/AVES_Audit_and_Todo_2026-11-13.html`. No current release completion is recorded there yet.
Do not upload/replace these during this handoff. Later continuation must refresh version guards before any Library update.

## Spanish prose/style reference

No standalone saved owner Spanish prose/style reference was identified in this workspace. Do not describe translation dictionaries as a personal writing sample.
Existing Spanish product-copy references are `content/colombia-home-es.json`, `content/account-ui-es.json` and `docs/RELEASE-2026-11-09-COLOMBIA-SPANISH.md`. `/workspace/scratch/74beaf1c4655/extra-spanish.py` is an older translation-update helper, not an owner prose/style reference. If the desktop chat has a distinct saved Spanish prose sample, preserve and use that separately.

## Exact uncommitted file list

```text
 M components/australia-protected-areas.tsx
 M components/country-satellite-layer.tsx
 M components/deferred-place-gallery.tsx
 M components/destination-regional-map.tsx
 M components/geographic-protected-areas.tsx
 M components/geographic-satellite-map.tsx
 M components/homepage-destination-explorer.tsx
 M components/map-background-context.tsx
 M components/map-layer-context.tsx
 M components/map-layer-picker.tsx
 M components/map-viewer.tsx
 M components/new-zealand-protected-areas.tsx
 M components/north-island-planning-layer.tsx
 M components/protected-area-explorer.tsx
 M components/resizable-discovery-pair.tsx
 M components/south-island-conservation-overlay.tsx
 M components/south-island-ecosystem-map.tsx
 M components/south-island-map-layers.tsx
 M components/south-island-public-place-overlay.tsx
 M components/south-island-satellite-map.tsx
 M components/world-map-country.tsx
?? components/map-controls-context.tsx
?? components/map-location-photos.tsx
?? content/map-basemaps.ts
?? lib/load-gallery-photos.ts
?? lib/map-photo-request.ts
```
