# Style and functionality checkpoint, 10 November 2026

Owner selected nine increments one by one: Australia map controls; map-style parity;
photo zoom; invitation word animation; continuous bird calls; origin filters; South
Island sea context; saved places; optional B Corp businesses layer. This checkpoint
records the first two. Production remains at the published selection/thumbnails baseline.

## Australia map controls, verified preview

Runtime 7e2d7ab65170c4833a0c588ac7504269acbe3623, deployment
 dpl_BYQfL3MYBM6vsbPEJpDQpKHTxZfc, project prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv.
https://aves-australia-43wmvfgvv-mmelendro-9273s-projects.vercel.app/australia

Both AustraliaHomeExplorer and AustraliaRegionMap use the existing main MapViewer
and gesture calculation pattern. Zoom/reset, modal enlargement, activated drag and
pinch and keyboard panning preserve selected region and native guide links.
Inline Move is explicit so ordinary page/browser gestures remain native elsewhere.
The modal retains attribution, closes on Escape and restores the trigger's focus.

Hosted checks passed: both map variants, zoom/reset, keyboard pan, actual pointer
drag, first-activation Victoria selection inside the modal without navigation,
header/flock update, selection preserved on close, attribution and focus return.
Native browser 400% zoom produced a 340 CSS-pixel-wide, 234px short frame with no
horizontal overflow and a visible 44px close control. Restored browser zoom to 100%.
Two math and three event tests cover pinch coordinates, inactive gestures,
two-contact pinch/tap safety and modal focus. All 301 AU tests pass.
Physical iPhone/Safari, true two-finger input and exact 320/390px remain unverified.
Screenshot evidence is local at /workspace/shared/aves-australia-map-controls.png.

## Map presentation, local checks passed; hosted acceptance pending

Main draft PR #13, feature/map-style-parity, 4ddab4a9b12b0ee9d50ef9c6649c42c06b2f11ca:
Colombia uses the flat sage palette, selected planning area fill, feather marker,
external full-name caption and names without numeric prefixes. New Zealand uses
one neutral island fill and named targets without connecting leader lines.

AU draft PR #12, feature/au-map-controls, 2b623db5631eb80eaa3cb94fb52b89f73c0db7db:
selected full names above maps, shared feather markers, full-name region buttons,
and removal of internal abbreviations and crossing territory connectors. Source
geography, selection IDs and named keyboard/dropdown alternatives are retained.
PR #12 contains both increments; its old control-only preview does NOT show styling.

162 main and 301 AU tests, strict TypeScript and both local production builds passed
for this exact styling source. No new dependencies or account/API/auth/database/
provider/geometry changes. No signed-in private save was tested here.

## Deployment blocker and next action

Both requested styling previews were rejected by Vercel with HTTP 402,
api-deployments-free-per-day: more than 100, retryAfter 86400 seconds. No vercel
CLI is installed for the mapped fallback. Do not retry deployments while the cap
is active, change plans/billing, weaken protection or use a different account/project
as a workaround. No new hosted styling deployment exists from these rejected calls.

When capacity returns, inspect existing deployments first, then build only the
exact reviewed source in the correct two projects. Complete desktop/narrow visual,
selection/link, map-control and keyboard checks before moving to photo zoom.
Use batched Git tree/commit/ref writes for a whole increment, avoiding per-file
ref updates and unnecessary intermediate builds. Reconcile PR descriptions and
this checkpoint after acceptance. Separate production approval remains pending.

PR #11 still awaits actual signed-in candidate save/reopen/edit and private-shell
checks. Fifteen public checklist images remain pending. eBird permission enquiry
remains unsent; B Corp data access/certification verification remains a later task.
