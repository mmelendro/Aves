# Planning regions on satellite

Adds one optional Planning regions checkbox to the retained satellite map. The layer defaults on, follows the active country and uses the same region IDs and selection callbacks as the bird guide. Toggling it never resets the satellite engine or refits the camera. The geographic scope note remains visible with the layer off, avoiding a map-height/camera shift when outlines are toggled. With outlines enabled, a single selected-region name replaces the crowded overview pills; names remain available on hover/focus and in the persistent native dropdown. Polygons support click, Enter and Space.

Coverage: Colombia 11 approximate planning areas, Australia nine generalised states/territories, New Zealand three main island groups. This is the existing selector taxonomy, not 15 fabricated South Island district boundaries. The existing planning-base, DOC, habitat and itinerary layers remain separate. World-level destination buttons remain available before choosing a country.

## Geographic meaning

Colombia shapes form one joined AVES editorial partition of the reviewed Natural Earth country outline. Internal seams are authored in longitude/latitude in content/colombia-planning-geography.json, assigned once, precision-noded and simplified together with Shapely coverage operations. Each shared edge is rendered once. The generator checks valid coverage, exact country union and pairwise zero-area intersections. The website tests edge incidence, mesh equality, total area and sampled single ownership. Camera extents follow each complete region. These remain approximate planning regions, not official regions, exact landforms, habitat maps, bird ranges or access permissions. The original hand-drawn artwork establishes editorial context, not geographic coordinates. The national tourism guide supports descriptions only: https://colombia.travel/en/your-essential-guide-bird-watching-and-bird-sites-colombia . This joined partition supersedes the earlier separate buffered corridors and dashed overlapping patches.

Australia uses the same Natural Earth 1:50m admin-1 source as the existing state map, including ACT and Jervis Bay Territory. New Zealand uses the same Natural Earth country polygons as the maintained island map. Each nearby island is assigned once to the closest eligible main island, avoiding duplicate Cook Strait/D'Urville geometry caused by overlapping camera boxes. Outlying islands remain outside this selector's scope.

Natural Earth data are public domain: https://www.naturalearthdata.com/about/terms-of-use/ . Their generalised borders/coastlines can omit small coastal/border features. Colombia planning areas carry AVES authorship; the public-domain credit applies to the Natural Earth geography. No species occurrence or conservation/certification evidence is derived from these outlines.

## Implementation and maintenance

GeographicPlanningLayer owns only the vector overlay and selected label. Leaflet and the existing satellite source remain shared. Country geometry loads only while the layer is enabled and that country is visible. Raw country payloads are approximately 23 KB Colombia, 89 KB Australia and 18 KB New Zealand, each below 100 KB. Async responses are discarded after scope changes/unmount; old polygons and labels are removed. Load failure preserves the satellite map and native region selector.

The offline generator scripts/generate-geographic-planning-regions.py verifies both input hashes before generating all three GeoJSON snapshots. Shapely 2.1.2 and pyshp 2.3.1 are tooling only; no GIS runtime dependency is shipped. The only dependency addition is an explicit existing GeoJSON TypeScript declaration package.

Geometry checks cover selector/feature parity, valid coordinate bounds and closed rings, selected labels inside their own shape, distinct valley reference points, explicit editorial/source meaning and unique New Zealand island assignment. Hosted map acceptance and final deployment are recorded in HANDOFF-CURRENT.md after testing.
