# Site-wide map layer coverage

Active audit, 11 November 2026. This is a coverage register, not a claim that every layer exists. Source/runtime checks in HANDOFF-CURRENT.md identify what is deployed. Keep this register current until the owner's whole-site request is complete. Layer parity precedes the shared planner/North Island pilot; do not mark the request done after world satellite alone.

Active satellite architecture: CONTINUOUS-SATELLITE-2026-11-11.md. The planning background retains the reviewed artwork/projections. Satellite uses global geographic tiles and a shared display preference. Colombian region extents are editorial camera focus, not official boundaries. Planning-region polygon overlays are now separately authored and explicitly approximate for Colombia; states and main-island groups reuse Natural Earth. See PLANNING-REGIONS-LAYER-2026-11-11.md. 3D globe and elevation are future work.

## Map families and gaps

| Map family / consumers | Geometry | Satellite | Parks / protected areas | Other supported information | Remaining work |
| --- | --- | --- | --- | --- | --- |
| World, including Back to world inside destination guides | Equal Earth, Natural Earth | Shared EOX 2016 global tiles | Not mapped | Country selection and bird conservation filters | Add a suitable source-verified protected-area overview; retain global tile navigation |
| Australia country/state regional explorers, including shared Australian shell | Spherical Albers, Natural Earth states | Shared EOX 2016 global tiles | Missing | Selectable state/territory outlines, regional bird associations and bird filters | Source official protected-area data; retain state focus and geographic tiles |
| New Zealand overview, North Island and Rakiura overview selections | Spherical Mercator fitted to main islands | Shared EOX 2016 global tiles | Missing | Selectable main-island outlines, curated bird associations and bird filters | Add DOC layers; retain main-island scope and geographic tiles |
| South Island regional explorer and its compact/fullscreen forms | Mercator, 2023/24 LCDB | Shared EOX 2016 global tiles | Existing nine national park previews and generalised DOC conservation land | Habitats, bird filters, public places, B Corp pilot, planning bases and schematic itinerary | Expand verified point-level activity/category coverage; preserve source scale, date and access limits |
| Colombia country/planning regions and shared regional shell | Editorial artwork in planning view; separate geographic Mercator in satellite view | Shared EOX 2016 global tiles and regional camera focus | Missing | Selectable approximate planning-area polygons, country/region birds and bird filters | Shared tiles retain regional focus. Next: official protected-area overlays and source-verified public places; camera extents remain editorial; editorial regions are not official ecosystem boundaries |
| Older explorer entry points retained by current route inventory | Reuse or compose the families above; verify per consumer | Inherits only when using the updated renderer | Inherits only when supported by that renderer | Existing selections and compatibility | Inspect Colombia hero/bird explorer and Australian home explorer directly; shared main-guide checks alone do not certify these consumers |
| Small map cues/thumbnails | Static navigation cues | No independent layers | No independent layers | Selected scope cue | Reflect selected map/background where practical; open the existing map, never create a competing interactive renderer |

## Required layer inventory

Satellite/background; habitats/land cover; national parks; other protected/conservation areas; country/island/planning region context; birds with endemic/threat filters and explicit occurrence scope; public towns/places; stays; food/local produce/organic ingredient and farm-to-table evidence; market days; thermal pools; walks/hikes; adventures; ecotourism; community-led culture; wellness; transport; separately verified B Corp evidence; selected itinerary base sequence and eventually sourced road geometry.

Not every record has coordinates or suitability evidence. A business category in the catalogue is not an exact map pin. A national checklist is not a species range raster. Certification, land cover, public land, national parks and access are distinct data. Make missing coverage explicit internally and offer useful source guidance publicly instead of inactive switches or fabricated features. Never silently copy South Island data onto other islands or countries.

## Delivery order

The prior static-imagery increments below are superseded by the shared tiled map. Historical source assets remain recovery evidence.

1. Prior MAP-03a: world satellite in the existing map, with conditional image loading, dated NASA attribution, preserved country hit targets and fallback. This is the first increment, not whole-site completion.
2. Prior MAP-03b: aligned satellite for Australia and NZ main-island views using their existing projections and recoverable fits. Check regional zoom, fullscreen, bird selection and map cues.
3. Prior satellite portion of MAP-03c: geographic Colombia base with preserved planning selectors and transparent distinction between editorial areas and official geography. Then satellite and official overlays can be added honestly.
4. MAP-04: reviewed national park and other protected-area sources per country. Record licence, publisher, dataset date, geometry/coordinate reference, generalisation, omissions, review date and access limitations. Candidate acquisition should use official Australian protected-area data, Colombian protected-area authorities and NZ DOC sources; no unreviewed commercial licence assumptions or data copied from Google Maps.
5. MAP-05: consistent layer picker, category/legend/source displays and selection persistence across scopes. Extend curated place and activity layers using sourced coordinates and dated evidence. Keep slow or heavy layers conditional. Mobile/keyboard/fullscreen and failure states are part of each release, not deferred here.
6. Resume NZ-01b, then the researched North Island planning corridor. Layer parity for North Island must not depend on inventing its still-unpublished itinerary content.

## Scientific and performance acceptance

One active map surface per regional guide. Layers must share a documented projection/fit. Test coastline/boundary alignment and several control points, not just image presence. Retain base selection, camera, filtering and credits on expansion and scope changes. Satellite dates and source resolution must stay visible; old composites are not live conditions, detailed trail imagery or evidence of current habitat. Use bounded payloads and show a useful fallback when data cannot load. No unlicensed tiles, synthetic protected boundaries, sensitive nest coordinates or claim of permission to enter.

B Lab stewardship principles require traceable environmental evidence and biodiversity considerations; they do not make a B Corp listing a park or prove a property's impact. The original Eco-Tourism Business Plan remains unavailable in this checkout. This map work introduces no commercial assumption, new paid API, billing change, schema migration or outreach.

NASA GIBS source documentation checked 11 November: https://nasa-gibs.github.io/gibs-api-docs/access-basics/ . Source JPEG for world preprocessing requested through EPSG:4326 WMS, BlueMarble_NextGeneration, bbox -180,-90,180,90, dimensions 2048 by 1024. Asset provenance is in content/world-satellite-source.json; preprocessing script is scripts/project-world-satellite.py. The source raster download is reproducible through the documented service parameters and its hash, not a new runtime network dependency.
