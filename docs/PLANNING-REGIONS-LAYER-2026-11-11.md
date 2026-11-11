# Planning regions on satellite

Adds one optional Planning regions checkbox to the retained satellite map. The layer defaults on, follows the active country and uses the same region IDs and selection callbacks as the bird guide. Toggling it never resets the satellite engine or refits the camera. With outlines enabled, a single selected-region name replaces the crowded overview pills; names remain available on hover/focus and in the persistent native dropdown. Polygons support click, Enter and Space.

Coverage: Colombia 11 approximate planning areas, Australia nine generalised states/territories, New Zealand three main island groups. This is the existing selector taxonomy, not 15 fabricated South Island district boundaries. The existing planning-base, DOC, habitat and itinerary layers remain separate. World-level destination buttons remain available before choosing a country.

## Geographic meaning

Colombia shapes are new AVES editorial approximations, authored directly in longitude/latitude and clipped to the reviewed Natural Earth country outline and existing camera extents. Mountain/valley corridors use broad display widths, not ecological buffers. Overlap and gaps are intentional possibilities; these are not official regions, exact landform boundaries, habitat maps, bird ranges or access permissions. Dashed outlines and the visible caption state this. Source specifications are in content/colombia-planning-geography.json and are easy to edit. The national tourism guide supports the broad travel-region descriptions, not the authored polygons: https://colombia.travel/en/your-essential-guide-bird-watching-and-bird-sites-colombia . Do not cite it as their geometry provider.

Australia uses the same Natural Earth 1:50m admin-1 source as the existing state map, including ACT and Jervis Bay Territory. New Zealand uses the same Natural Earth country polygons as the maintained island map. Each nearby island is assigned once to the closest eligible main island, avoiding duplicate Cook Strait/D'Urville geometry caused by overlapping camera boxes. Outlying islands remain outside this selector's scope.

Natural Earth data are public domain: https://www.naturalearthdata.com/about/terms-of-use/ . Their generalised borders/coastlines can omit small coastal/border features. Colombia planning areas carry AVES authorship; the public-domain credit applies to the Natural Earth geography. No species occurrence or conservation/certification evidence is derived from these outlines.

## Implementation and maintenance

GeographicPlanningLayer owns only the vector overlay and selected label. Leaflet and the existing satellite source remain shared. Country geometry loads only while the layer is enabled and that country is visible. Raw country payloads are approximately 23 KB Colombia, 89 KB Australia and 18 KB New Zealand, each below 100 KB. Async responses are discarded after scope changes/unmount; old polygons and labels are removed. Load failure preserves the satellite map and native region selector.

The offline generator scripts/generate-geographic-planning-regions.py verifies both input hashes before generating all three GeoJSON snapshots. Shapely 2.1.2 and pyshp 2.3.1 are tooling only; no GIS runtime dependency is shipped. The only dependency addition is an explicit existing GeoJSON TypeScript declaration package.

Geometry checks cover selector/feature parity, valid coordinate bounds and closed rings, selected labels inside their own shape, distinct valley reference points, explicit editorial/source meaning and unique New Zealand island assignment. Hosted map acceptance and final deployment are recorded in HANDOFF-CURRENT.md after testing.
