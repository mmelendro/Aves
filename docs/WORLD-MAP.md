# Homepage world map — AVES-003a

## Camera continuity increment — November 2026

The main interactive explorer now uses the existing Leaflet geographic engine for Planning, Satellite, Roads and Topographic backgrounds. Only the background layer changes; the mounted map, centre, zoom, geographic bounds and selected region remain. The Equal Earth artwork described below remains the server-rendered/no-JavaScript fallback and the static destination-card illustration. The specialist South Island habitat explorer is a separate follow-up, not covered by this increment.

The planning background uses `public/data/planning-world.geojson`, generated from the same pinned Natural Earth source below. `node scripts/generate-geographic-planning-world.mjs PATH-TO-COUNTRIES.geojson` preserves its geographic coordinates, removes unused metadata and retains only destination IDs and country names. The public-domain file loads when planning geography is displayed, outside the initial JavaScript bundle. Country names appear on hover/focus; destination choices also remain in a native selector. This is planning geography, not official access, bird ranges or current conditions.

Background switches never call fitBounds/setView. Explicit location selection and Reset remain the camera-changing actions. Resize/fullscreen retain the centre and zoom while adapting the visible extent to the new viewport. Browser regressions compare the engine's actual camera and canvas dimensions after manual pan/zoom and repeated switches in both directions, including blocked remote tiles.

The sections below document the original illustrated implementation.

The homepage centers its title above an Equal Earth world map and one connected bird carousel. AVES-003a-2 adds country zoom: select Colombia, Australia or New Zealand to reveal its regional map, choose a region to preview its verified birds, and use Back to world to restore the overview and full country collection. This supersedes the earlier three-card-carousel layout and unpromoted map version `27cc9bd`. Ecological layers remain AVES-003b. Country pages retain their viewers/dividers; shared image framing now preserves intrinsic-photo focal points during resizing.

## Source and projection

- Country geometry: Natural Earth 1:110m admin-0 countries, 177 features. Source: https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson
- Download SHA-256: `6866c877d39cba9c357620878839b336d569f8c662d3cfab4cb1dbe2d39c977f`.
- Reuse: public domain, including commercial modification/redistribution. https://www.naturalearthdata.com/about/terms-of-use/
- Projection: Equal Earth, central meridian 0, north up. Formula: https://raw.githubusercontent.com/d3/d3-geo/main/src/projection/equalEarth.js ; authors' overview: https://ica-abs.copernicus.org/articles/1/321/2019/ica-abs-1-321-2019.html
- This small-scale overview is destination navigation, not a precise border, territory or bird-range map. Small islands may be simplified or absent at 1:110m scale. No ecological classification is inferred from the fills.

## How the files connect

`scripts/equal-earth.mjs` projects longitude/latitude using a uniform scale. `scripts/generate-world-map.mjs` turns the reviewed GeoJSON into `content/world-map.json`, including country shapes, label anchors, the globe outline and graticule. Paths are precomputed, rounded to two decimals and rendered with their original aspect ratio. Geographic anchors and geometry use the same transform; label offsets alone are presentation choices.

`content/destinations.ts` supplies the current destination names, routes, status and optional map country code/label rectangle. The component does not maintain another country availability list. Adding public metadata does not register a country in the shared private account backend.

`components/world-destination-map.tsx` keeps neutral world geometry on the server. Three small `world-map-country.tsx` controls share page-only selection with `homepage-destination-explorer.tsx` through `destination-selection-context.tsx`. Selecting a country or equivalent 44px text button updates the summary/Explore link and reveals its regional map. Enter/Space work on SVG controls. `world-map-scene.tsx` uniformly zooms toward bounds derived from the real projected country path; existing regional geometry then fades into the same footprint. It is a visual transition between reviewed maps, not a claim of continuous identical-projection map tiles. Reduced motion removes the animation. The hidden world becomes inert and aria-hidden; focus moves to Back, then returns to the selected country text button on exit. Native page scroll and browser pinch zoom remain available.

`content/destination-regions.ts` joins existing country media to verified local memberships: Colombian regional notes, an attributed public snapshot of Australia's regional selections, and explicit NZ bird/island associations. All 23 regions have photographed birds; all 73 featured country profiles highlight at least one supported region. Region selection changes the same viewer and its local notes/link, never the photograph's occurrence claims or media rights. Bird changes update highlights when viewing the full country. A country-and-region key reuses existing cleanup to stop old sound/timers and close details on collection changes. Back restores the full country collection. No account or preference persistence is involved.

Labels use smaller 20-unit SVG type on roomy maps, with a narrow-map adjustment and larger invisible hit areas. The world is uniformly scaled, never stretched. `ResizableDiscoveryPair` retains pointer drag, arrow keys/Home/End, safe 256px minimum panels and Reset layout at its 624px container breakpoint. Its split stays mounted across country/region choices. Resizing/re-stacking retains the current bird and expanded details. The credited 4:5 viewer uses the shared bounded height and translucent in-photo Info panel; short-frame details remain scrollable. `coverFocalPosition` and the existing image-load effect observe the photo frame and preserve the intrinsic focal point with uniform cover scaling, clamped at photo edges to avoid blank padding.

Narrow screens keep independent media first and map second, hiding the separator from display/keyboard. The regional map retains usable space for its diagram, region select and Explore link. `DestinationCardMedia` accepts optional page-supplied birds/label plus `fillPanel`; it still delegates to the existing carousel. Footer links and a no-JavaScript fallback open the three destinations directly. NZ remains in development with a planning beta. No map SDK, service, key, geolocation or paid feature was added.

## Regional map cards

Below the main explorer, `components/destination-map-cards.tsx` renders three server-only map cards. The extracted `destination-regional-map.tsx` draws both those native-link cards and the interactive zoomed maps, avoiding duplicate geography. Colombia reuses the original artwork/markers; its fitted size container preserves the artwork ratio so marker positions do not drift when resized. Australia reuses `content/global-australian-map.ts`, a public snapshot of the independent app's map with original provenance/projection. NZ retains the existing 50m coastline and island-label anchors. Geometry is never stretched to fill a card. Refresh snapshots only from reviewed source changes.

All eleven Colombian planning regions, nine Australian states/territories and three NZ planning islands have native links plus readable region lists in `details` disclosures. NZ links use existing `/new-zealand#region-…` sections; dedicated island pages are not implied. A later physical-card flip to a regional carousel is queued as AVES-015. It is not implemented or claimed in this publication.

## Regenerate

Download the source above to a temporary file outside Git, then from the `source` checkout run:

```powershell
node scripts/generate-world-map.mjs 'PATH-TO-DOWNLOADED-COUNTRIES.geojson'
node --test tests/world-map.test.cjs tests/global-home.test.cjs
```

The generator rejects a different input hash. Review source/licence/geography before deliberately updating that pin. Commit the generated JSON and scripts, not a new runtime dependency or a private export. Unit checks cover equal-area behaviour, symmetry, full bounds, both main NZ islands, selection semantics and one viewer with each complete country collection/route. Browser checks remain necessary for actual switching, audio cleanup, layout and all three destination links.
