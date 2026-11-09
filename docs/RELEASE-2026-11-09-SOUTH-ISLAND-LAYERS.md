# South Island map-layer pilot

Published source: `14798a16b4363d27bfff6b563470dc984520b057`.
Preview: `dpl_AexoBX2q6sFUx1CCQgfgpEh4tGrs`, READY and browser checked.
Production: `dpl_DBHMyn8kGx78oNg7oikUkWEwz3mM`, READY, built from the same commit.
Previous main runtime: `da82055`, Production `dpl_9uif85cMYtEpqv4Dy6WPtPre62jx`.
Recovery source: `checkpoint/2026-11-09-05-south-island-layers`.

## Delivered

Both South Island ecosystem maps share page-local layer choices. Habitats remain
the default. Optional satellite imagery is NASA Blue Marble Next Generation's
historical 2004 composite, served locally without a key, visitor provider request
or new account. Its Mercator extent exactly matches the existing habitat map.
It is not live imagery, road detail or a current ecological survey.

Official DOC Public Conservation Land provides the public-land overlay and nine
national parks intersecting the main island. Geometry is clipped and generalised
to about 2 km, includes attribution, snapshot checksum and generation scripts.
Nearby islands and small parcels can be omitted. Private conservation coverage
is incomplete. These are map context layers, not bird-range filters or access
permission. Park selection focuses both maps; existing habitat/bird, places,
wish-list, zoom, pan and scale controls remain separate.

The compact picker closes after a choice and restores focus. Native checkboxes,
park select, Escape, reset and named SVG buttons provide alternatives to small
map areas. Satellite mode hides land-cover hit areas and initially collapses its
habitat legend to retain space for the map. The legend and habitat selectors
remain available. An image failure displays the habitat fallback with a message.

## Verification and limits

127 tests, strict type check and staged Next.js build passed. Browser checks
covered shared choices on both maps, 18 rendered park paths, two conservation
paths, satellite attribution, Fiordland focus, preserved bird filtering,
Escape/focus return and shared reset. Desktop and browser zoom/reflow at 340 CSS
pixels passed; new controls have 44px minimum height and no document horizontal
overflow. Exact 320/390px viewport and physical touch remain unverified because
the available browser does not expose supported viewport resizing. No claim of
physical iPhone or forced image-network-failure testing.

Live satellite/park rendering and Fiordland selection passed at
`https://aves.bio/new-zealand/south-island`. Routes and sitemap hierarchy are
unchanged. All 31 live route/asset/sitemap checks returned HTTP 200; main XML
sitemap has 42 unique URLs, Australia has 32, with account/admin/API excluded.
No database, environment, billing, private brief or account change.

## Continue automatically

Next: curated public nature/birding places, conservation projects, public
heritage visitor sites and towns on this sample; verify each before extending
the pattern across suitable maps. Source availability and projection alignment
remain gates. National park coverage elsewhere, archaeological sites elsewhere,
all species/season facets and soundscape playback are not delivered here.
AVES-053 soundscapes remains the next media priority with explicit opt-in and
verified recording rights/locality. No paid services or AI retry is authorised.
