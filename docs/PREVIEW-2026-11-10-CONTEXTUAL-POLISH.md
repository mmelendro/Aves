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

## Browser review and refinements

First hosted runtime: 6a296c2e18c4a3c06039c598820b2efd93aa240e,
protected build dpl_j9y7cMtnqFs4vxrVQCsQJWMjRA2S. Hosted build passed.
All thirty studies render and the gallery declares noindex/nofollow, with no
horizontal overflow. World-map enlargement, 1.3/1.69x zoom, real mouse drag,
keyboard panning, reset and Escape/focus restoration passed. Desktop Colombia
viewer retained all eleven native map links. South Island enlargement retained
camera and scale, zoom changed from 2x to 3x, and Move enabled touch-action:none.
Physical two-finger input was not exercised; its anchor/clamping maths is tested.

At native 400% browser zoom (340 CSS pixels), the team page and enlarged world map
had no horizontal overflow. Map controls measured 44px square and the expanded
viewer fit the viewport width. Team desktop Next advanced to 2 of 9, and View
profile opened the correct existing accordion at its stable ID. Compact carousel
layout fit; physical swipe is not claimed. Browser zoom was restored to 100%.

Review found two polish issues: attribution outside some expanded viewers, and
existing circular portrait sources producing awkward rectangular corners. The
follow-up carries credits inside enlarged views, uses circular portraits with an
honest initials fallback if a real portrait fails, restores focus to an opened
team profile, increases South Island map space and keeps the close toolbar sticky.
A native-dialog attribute update prevents a transient unstyled expansion frame.
Final hosted verification of these refinements is recorded in the PR when complete.

154 automated tests, TypeScript and local production build passed before the
browser pass; five targeted geometry/gesture checks, TypeScript and a production
build passed again after the behavioural/portrait fixes. The final sticky-toolbar
CSS refinement is covered by the final hosted build/browser check. No dependency
change, database fixture, private record or production promotion occurred.

The final catalogue includes explicit existing map selection IDs (`mountains`,
`forest-and-lakes`, `southern-forest`, `coast`) separately from human-readable asset
IDs. Its resolver fails closed for unknown region/place selections; a contract test
checks those selections against the actual public place source. This remains a
prepared integration seam, not an assertion that selecting every place already
changes a production header. Further ecosystem variants remain queued.

## Authorized release subset

The owner authorized publication of headers supported with confidence after the
latest map/carousel refinements. The explicit production allowlist is Colombia
country plus Western Andes, Central Andes, Cauca Valley, Magdalena Valley,
Sierra Nevada de Santa Marta, Llanos, Amazonia and Colombian Massif.
These illustrative terrain/water composites use existing geographic context.
No uncertain new wildlife silhouettes or whales are installed. Inland contexts
use no water, river or wetland as appropriate. Eastern Andes, Pacific, Caribbean,
new Australian and additional NZ variants remain studies pending closer review.
The already published NZ country/South Island composition is preserved.

The main-app map and team improvements described above accompany this subset.
156 tests and TypeScript passed. True touch input and physical Safari remain
unverified. Release identifiers and final hosted checks follow in the handoff.
