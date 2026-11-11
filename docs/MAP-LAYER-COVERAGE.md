# Site-wide map layer coverage

Active audit, 11 November 2026. This is a coverage register, not a claim that every layer exists. Source/runtime checks in HANDOFF-CURRENT.md identify what is deployed. Keep this register current as scoped releases improve coverage. The only delivery order is the numbered pathway in [CONTINUE-HERE.md](../CONTINUE-HERE.md). Core protected-area coverage and usable controls precede planner expansion; complete worldwide layer/catalogue parity is not a gate to North Island.

Active satellite architecture: CONTINUOUS-SATELLITE-2026-11-11.md. The planning background retains the reviewed artwork/projections. Satellite uses global geographic tiles and a shared display preference. Colombian region extents are editorial camera focus, not official boundaries. Planning-region polygon overlays are now separately authored and explicitly approximate for Colombia; states and main-island groups reuse Natural Earth. See PLANNING-REGIONS-LAYER-2026-11-11.md. 3D globe and elevation are future work.

## Map families and gaps

| Map family / consumers | Geometry | Satellite | Parks / protected areas | Other supported information | Remaining work |
| --- | --- | --- | --- | --- | --- |
| World, including Back to world inside destination guides | Planning: Equal Earth; satellite: geographic tiles | Shared EOX 2016 global tiles | Not mapped | Country selection and bird conservation filters | Add a suitable source-verified protected-area overview; retain global tile navigation |
| Australia country/state regional explorers, including shared Australian shell | Planning: Albers; satellite: geographic tiles | Shared EOX 2016 global tiles | Missing | Selectable state/territory outlines, regional bird associations and bird filters | Source official protected-area data; retain state focus and geographic tiles |
| New Zealand overview, North Island and Rakiura overview selections | Spherical Mercator fitted to main islands | Shared EOX 2016 global tiles | Missing | Selectable main-island outlines, curated bird associations and bird filters | Add DOC layers; retain main-island scope and geographic tiles |
| South Island regional explorer and its compact/fullscreen forms | Mercator, 2023/24 LCDB | Shared EOX 2016 global tiles | Existing nine national park previews and generalised DOC conservation land | Habitats, bird filters, public places, B Corp pilot, planning bases and schematic itinerary | Expand verified point-level activity/category coverage; preserve source scale, date and access limits |
| Colombia country/planning regions and shared regional shell | Editorial artwork in planning view; separate geographic Mercator in satellite view | Shared EOX 2016 global tiles and regional camera focus | Missing | Selectable adjoining approximate planning-area polygons, country/region birds and bird filters | Shared tiles retain regional focus. Next: official protected-area overlays and source-verified public places; camera extents follow complete polygons; editorial regions are not official ecosystem boundaries |
| Older explorer entry points retained by current route inventory | Reuse or compose the families above; verify per consumer | Inherits only when using the updated renderer | Inherits only when supported by that renderer | Existing selections and compatibility | Inspect Colombia hero/bird explorer and Australian home explorer directly; shared main-guide checks alone do not certify these consumers |
| Small map cues/thumbnails | Static navigation cues | No independent layers | No independent layers | Selected scope cue | Reflect selected map/background where practical; open the existing map, never create a competing interactive renderer |

## Required layer inventory

Satellite/background; habitats/land cover; national parks; other protected/conservation areas; country/island/planning region context; birds with endemic/threat filters and explicit occurrence scope; public towns/places; stays; food/local produce/organic ingredient and farm-to-table evidence; market days; thermal pools; walks/hikes; adventures; ecotourism; community-led culture; wellness; transport; separately verified B Corp evidence; selected itinerary base sequence and eventually sourced road geometry.

Not every record has coordinates or suitability evidence. A business category in the catalogue is not an exact map pin. A national checklist is not a species range raster. Certification, land cover, public land, national parks and access are distinct data. Make missing coverage explicit internally and offer useful source guidance publicly instead of inactive switches or fabricated features. Never silently copy South Island data onto other islands or countries.

## Scope of the next map step

Follow step 1 of [CONTINUE-HERE.md](../CONTINUE-HERE.md): Colombia protected areas (MAP-04a), Australia (MAP-04b), then the remaining NZ country/island coverage (MAP-04c), each as a bounded release. A useful explicitly scoped subset can ship when full data is unavailable. Verify official publisher, licence, dataset date, coordinate reference, simplification, omissions and access limits before importing. Candidate sources are Colombian protected-area authorities, Australia's protected-area datasets and NZ DOC; current availability and terms must be checked at implementation time.

Step 2 covers shared layer controls (MAP-05). Wider optional categories remain in the inventory; they are not a reason to postpone the shared planner and North Island pilot indefinitely. Do not add empty switches or imply complete coverage. Static NASA overview assets are historical recovery records, not the active satellite source; see CONTINUOUS-SATELLITE-2026-11-11.md.

## Scientific and performance acceptance

One active map surface per regional guide. Layers must share a documented projection/fit. Test coastline/boundary alignment and several control points, not just image presence. Retain base selection, camera, filtering and credits on expansion and scope changes. Satellite dates and source resolution must stay visible; old composites are not live conditions, detailed trail imagery or evidence of current habitat. Use bounded payloads and show a useful fallback when data cannot load. No unlicensed tiles, synthetic protected boundaries, sensitive nest coordinates or claim of permission to enter.

B Lab stewardship principles require traceable environmental evidence and biodiversity considerations; they do not make a B Corp listing a park or prove a property's impact. The original Eco-Tourism Business Plan remains unavailable in this checkout. This map work introduces no commercial assumption, new paid API, billing change, schema migration or outreach.
