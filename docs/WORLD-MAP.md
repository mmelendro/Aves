# Homepage world map — AVES-003a

The homepage centers its title above an Equal Earth world map and one country-switching carousel. This supersedes the earlier three-card-carousel layout and the unpromoted map version `27cc9bd`. This release highlights Colombia, Australia and New Zealand only; it does not claim to display biodiversity hotspots or megadiverse-country coverage. Those layers remain AVES-003b. Country destination pages retain their existing carousels and dividers.

## Source and projection

- Country geometry: Natural Earth 1:110m admin-0 countries, 177 features. Source: https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson
- Download SHA-256: `6866c877d39cba9c357620878839b336d569f8c662d3cfab4cb1dbe2d39c977f`.
- Reuse: public domain, including commercial modification/redistribution. https://www.naturalearthdata.com/about/terms-of-use/
- Projection: Equal Earth, central meridian 0, north up. Formula: https://raw.githubusercontent.com/d3/d3-geo/main/src/projection/equalEarth.js ; authors' overview: https://ica-abs.copernicus.org/articles/1/321/2019/ica-abs-1-321-2019.html
- This small-scale overview is destination navigation, not a precise border, territory or bird-range map. Small islands may be simplified or absent at 1:110m scale. No ecological classification is inferred from the fills.

## How the files connect

`scripts/equal-earth.mjs` projects longitude/latitude using a uniform scale. `scripts/generate-world-map.mjs` turns the reviewed GeoJSON into `content/world-map.json`, including country shapes, label anchors, the globe outline and graticule. Paths are precomputed, rounded to two decimals and rendered with their original aspect ratio. Geographic anchors and geometry use the same transform; label offsets alone are presentation choices.

`content/destinations.ts` supplies the current destination names, routes, status and optional map country code/label rectangle. The component does not maintain another country availability list. Adding public metadata does not register a country in the shared private account backend.

`components/world-destination-map.tsx` keeps neutral world geometry on the server. Three small `world-map-country.tsx` client controls share page-only selection with `homepage-destination-explorer.tsx` through `destination-selection-context.tsx`. Selecting a map country or an equivalent 44px text button changes the one mounted viewer, summary and native Explore-country link. Enter/Space work on the SVG controls; selected/hover/focus states remain distinct. A country-keyed viewer reuses existing cleanup to stop old sound/timers and reset details when countries change. No account or preference persistence is involved.

Labels use smaller 20-unit SVG type on roomy maps, with a legible narrow-map adjustment and larger invisible hit areas. The world is uniformly scaled, never stretched. On narrow screens the independent media card precedes the map. The homepage now reuses `ResizableDiscoveryPair`, the existing country-page divider, for pointer drag, arrow keys/Home/End, safe 256px minimum panels and Reset layout. Paired layout follows the actual 624px container breakpoint. The split stays mounted across country changes; only the old country viewer remounts. Resizing/re-stacking retains the current bird and expanded details. The map follows the shared bounded panel height; the homepage viewer reserves its credit-link height and expands details below that frame. Narrow layouts hide the separator from display/keyboard and keep the independent media card before the map. The generic country-page divider itself is unchanged. `DestinationCardMedia` has an opt-in `fillPanel` prop; other uses retain their natural 4:5 layout. Footer country links and a no-JavaScript link fallback still open all three destinations directly. New Zealand is clearly in development with a planning beta; confirmed bookings are not implied. No runtime map SDK, new service, access key, visitor geolocation or paid feature is needed.

## Regional map cards

Below the main explorer, `components/destination-map-cards.tsx` renders three server-only map cards, not three additional carousels. Colombia reuses the original artwork and `content/colombia-map-markers.ts`, also imported by its existing hero. Australia reuses a public snapshot `content/global-australian-map.ts` from the independent Australian app's `content/australia-map.ts`; the embedded Natural Earth version, source hash, licence and projection are retained. Refresh that snapshot only when the reviewed Australian map changes. New Zealand uses the existing 50m coastline JSON and the same island-label anchors as its country map. Geometry is never stretched to fill a card.

All eleven Colombian planning regions, nine Australian states/territories and three NZ planning islands have native links plus readable region lists in `details` disclosures. NZ links use existing `/new-zealand#region-…` sections; dedicated island pages are not implied. A later physical-card flip to a regional carousel is queued as AVES-015. It is not implemented or claimed in this publication.

## Regenerate

Download the source above to a temporary file outside Git, then from the `source` checkout run:

```powershell
node scripts/generate-world-map.mjs 'PATH-TO-DOWNLOADED-COUNTRIES.geojson'
node --test tests/world-map.test.cjs tests/global-home.test.cjs
```

The generator rejects a different input hash. Review source/licence/geography before deliberately updating that pin. Commit the generated JSON and scripts, not a new runtime dependency or a private export. Unit checks cover equal-area behaviour, symmetry, full bounds, both main NZ islands, selection semantics and one viewer with each complete country collection/route. Browser checks remain necessary for actual switching, audio cleanup, layout and all three destination links.
