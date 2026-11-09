# Combined satellite, ecosystems and public-place pilot

Source: `1aed534d5a295168cf445d3185876184425c671e`.
Verified READY Preview: `dpl_5spu9oJot5VL1pMEZLLByJZff6UY`.
Published READY Production: `dpl_EpZR2p99nc9zy5gp8z83zpueMCKp`.
Previous runtime: `14798a1`, Production `dpl_DBHMyn8kGx78oNg7oikUkWEwz3mM`.
Named source checkpoint: `checkpoint/2026-11-09-06-combined-ecotourism-layers`.

## Changes

Satellite defaults to 55% visibility, adjustable from 20% to 80% with a native
keyboard-accessible slider. Ecosystem colours stay visible and selectable above
it unless the visitor explicitly hides them. The historical raster is clipped
to the island coastline in the same Mercator frame. Ecosystems, nine national
parks, hatched DOC conservation land and public places combine independently.
Parks and point previews focus the map; none silently changes the bird filter.
Reset clears display layers while retaining the chosen bird habitat.

Five public-place categories add ten deduplicated references: two nature/birding
places, one conservation project, one public heritage site, six settlements and
two ecotourism visitor enterprises. Some references belong to multiple layers.
These are a curated pilot, not a complete directory or real-time access map.
No nesting locations, restricted cultural sites, private guest inputs, prices
or booking promises are included.

Ecotourism listings: Orokonui Ecosanctuary and Abel Tasman Eco Tours. Public
visitor/conservation pages support their descriptions; evidence is linked, not
presented as independently audited impact. Orokonui uses an approximate DOC
reserve reference. Abel Tasman uses the approximate Mārahau area in the
operator's published contact map, not a claimed exact office/meeting point.
Listings imply neither AVES partnership nor certification or sustainability
rating. Check source pages for actual arrangements.

Arrowtown Chinese Settlement is a publicly interpreted archaeological/heritage
visitor area, with a DOC-derived approximate reference. Cities/towns use
Natural Earth 5.1.2 public-domain geometry. DOC CC BY 4.0 attribution, source
checksums, snapshot dates and offline generation scripts accompany the data.
Sources are checked 9 November 2026. No runtime API key or paid provider added.

## Verification

128 tests and strict type check passed. Next.js build passed, and the final
exact candidate built READY on Vercel. Browser checks verified all seven
optional overlay categories enabled together on both maps: 18 park paths,
two hatched conservation paths, six ecosystem paths and twenty public-place
buttons, representing ten unique places on each map. Satellite opacity changes
propagate to both maps. Hidden ecosystem colours remove their map hit targets.

First public-place activation previews its detail card without navigating.
The native place list is an alternative to small markers. A business preview
preserved chosen bird habitat and opened source information through an explicit
link. The details are expandable and do not overlap the map. Clear, keyboard
Enter/Escape, focus return, all-layer Reset and existing habitat controls passed.

Desktop and 340 CSS-pixel browser reflow passed, including business preview,
opacity and Reset with no document horizontal overflow. Exact 320/390 viewport
and physical phone touch remain unverified. Browser DevTools resizing is
unavailable; no unsupported emulation is claimed. No new route or sitemap entry,
account/backend change, database mutation or third-party request for visitor data.

## Continue

The owner requested automatic continuation with saved checkpoints. Read
MAP-LAYER-ROLLOUT.md for the country-specific source/projection gates and next
increments. This release covers both South Island maps only, not every country
or subregion. Soundscapes is still the next media priority; playback is not
implemented here. Google driving times and paid AI remain separate/deferred.

Live verification: both maps rendered satellite at 55%, six ecosystem paths,
18 park paths, two hatched conservation paths and four business markers. Enter
on Orokonui updated both detail cards without navigation. Reset map view worked
while preserving overlays. [Saved live browser evidence](evidence/2026-11-09-combined-ecotourism-live.png).

All 31 live country/region/asset/human/XML sitemap checks returned HTTP 200.
Main sitemap: 42 unique URLs; Australia: 32. Account/admin/API routes remain
excluded. Existing region routes and Colombia boundary artwork remain intact.
