# Place-specific contours, map controls and team carousel

Owner-selected continuation after the published NZ header. 10 November 2026.
Review branch: feature/aves-contextual-headers. No new production release.

## Thirty contour studies

The source inventory contains three countries, eleven Colombian planning regions,
nine Australian states/territories and three NZ island groups, plus four existing
South Island public place contexts. These are the current subregion/place contexts,
not newly invented standalone pages. There are no other configured subregion routes.
The geographic maps, boundaries and marker positions remain unchanged.

`content/landscape-profiles.json` records terrain, water type, flight family and
source per context. `lib/landscape-study.mjs` generates original SVG studies;
`scripts/design/generate-landscape-studies.mjs` saves each to docs/design/landscapes.
The protected review page `/design/landscapes` shows all thirty. It is noindex and
not linked from public navigation or added to sitemaps. These are proposed contour
assets, not automatically installed headers on all thirty production contexts.

Arthur's Pass uses land only, Nelson Lakes sheltered lake, the current Fiordland
base/lake context uses lake rather than falsely implying its inland lake has whales.
ACT is landlocked; Llanos is wetland; Amazonia and the Andean river valleys use rivers.
Australia's previews follow current regional focus rather than copying generic
mountains or treating every coastal state as an ocean scene. No marine animals
outside the approved NZ alpine/coastal composite. Snow is not added everywhere.

Flight families are abstract placeholders, not verified species identification.
Exact species silhouette, anatomical detail, seasonal context and page-level
compositions still need design/ecology review before rollout. 26 of 27 external
reference URLs returned HTTP 200 in this pass; this verifies availability, not all
scientific claims. One unavailable Catlins URL was replaced with the existing DOC
hoiho reference; that replacement was not freshly fetched in the same HTTP pass.
Source availability evidence is recorded in docs/evidence/2026-11-10-landscape-sources.json.

## Bounded map improvement

Main-app world, homepage country cards and regional preview, NZ island maps,
Colombia country/full explorer and South Island habitat maps gain enlargement.
The same map stays mounted in a native modal, preserving selection and credits.
Escape returns focus; the document scroll lock is restored on cleanup. Original
links, first-activation previews, geographic artwork and source layers are retained.

Shared generic map controls offer 44px zoom/reset/Move/enlarge actions. Camera
updates use requestAnimationFrame; button zoom has a short reduced-motion-aware
transition. Inline Move explicitly activates drag/pinch; native page scrolling and
browser pinch zoom remain available outside it. Two-finger pinch anchors on the
midpoint, pans at the same time and clamps at map bounds. Generic zoom is a display
camera, not new geographic detail. South Island retains its existing geographic
camera and accurate scale calculation, adding two-pointer input in Move mode.
No wheel/trackpad scrolling is hijacked and no new paid SDK or provider is added.

Australia's independently deployed application is unchanged. Its representations
on the main homepage share these new review controls, but that is not an AU app
release. The schematic location-list component is not presented as a navigational
map. Actual touch pinch and physical Safari need device verification.

## Team carousel and scope

The team page gains a native scroll-snap portrait carousel with previous/next,
swipe, profile links and no autoplay. It reuses existing photos, roles and biography
records without inventing credentials or relationships. View profile opens the
existing team accordion and scrolls to its stable ID, respecting reduced motion.
Advisory sections remain intact. No backend, accounts, consent, bookings or map data
change. Further ecosystem-specific headers are retained for later, after this work.
