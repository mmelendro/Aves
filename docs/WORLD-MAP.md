# Homepage world map — AVES-003a

The homepage replaces its mixed-country hero carousel with a server-rendered Equal Earth world map. The three country-card carousels remain unchanged. This release highlights Colombia, Australia and New Zealand only; it does not claim to display biodiversity hotspots or megadiverse-country coverage. Those layers remain AVES-003b.

## Source and projection

- Country geometry: Natural Earth 1:110m admin-0 countries, 177 features. Source: https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson
- Download SHA-256: `6866c877d39cba9c357620878839b336d569f8c662d3cfab4cb1dbe2d39c977f`.
- Reuse: public domain, including commercial modification/redistribution. https://www.naturalearthdata.com/about/terms-of-use/
- Projection: Equal Earth, central meridian 0, north up. Formula: https://raw.githubusercontent.com/d3/d3-geo/main/src/projection/equalEarth.js ; authors' overview: https://ica-abs.copernicus.org/articles/1/321/2019/ica-abs-1-321-2019.html
- This small-scale overview is destination navigation, not a precise border, territory or bird-range map. Small islands may be simplified or absent at 1:110m scale. No ecological classification is inferred from the fills.

## How the files connect

`scripts/equal-earth.mjs` projects longitude/latitude using a uniform scale. `scripts/generate-world-map.mjs` turns the reviewed GeoJSON into `content/world-map.json`, including country shapes, label anchors, the globe outline and graticule. Paths are precomputed, rounded to two decimals and rendered with their original aspect ratio. Geographic anchors and geometry use the same transform; label offsets alone are presentation choices.

`content/destinations.ts` supplies the current destination names, routes, status and optional map country code/label rectangle. The component does not maintain another country availability list. Adding public metadata does not register a country in the shared private account backend.

`components/world-destination-map.tsx` is a server component with native SVG links. No runtime map library, extra service, access key, visitor geolocation or client-side map state is required. Equivalent large text links beside the map support keyboard/touch navigation even at narrow widths. Hover and keyboard focus highlight both the country and its label. New Zealand is clearly in development with a planning beta; confirmed bookings are not implied.

## Regenerate

Download the source above to a temporary file outside Git, then from the `source` checkout run:

```powershell
node scripts/generate-world-map.mjs 'PATH-TO-DOWNLOADED-COUNTRIES.geojson'
node --test tests/world-map.test.cjs tests/global-home.test.cjs
```

The generator rejects a different input hash. Review source/licence/geography before deliberately updating that pin. Commit the generated JSON and scripts, not a new runtime dependency or a private export. Unit checks cover equal-area behaviour, symmetry, full bounds, both main NZ islands, accessible native links and retention of all three country viewers. Browser checks remain necessary for layout and real navigation.
