# Continuous satellite foundation

Owner direction: a Google Earth experience for birders. A shared geographic map replaces separate static country satellite images. The same background preference follows country/region selection, client navigation and reloads within the browser tab. Private trip data is not stored by this preference.

Implementation uses Leaflet 1.9.4, loaded only for satellite mode. Global EPSG:3857 imagery comes directly from EOX's `s2cloudless_3857` 2016 tile layer, native zooms capped at 14. Country/region choices move the camera within one global tile surface. This increment is a continuous 2D map; rotating-globe and elevation rendering remain future work. Native selectors remain alternatives to map labels. Scope selection sets the geographic camera without animation so expansion and resize cannot interrupt regional focus. Native dragging/pinching and zoom controls remain available. Map or tile failures explain the issue and retain the Planning map control.

Primary source and terms checked 11 November 2026:

- https://cloudless.eox.at/documentation/faq explicitly permits commercial embedding and reasonable traffic on the free 2016 endpoint under CC BY 4.0, without uptime or rate guarantees. Newer commercial imagery is not authorised by this implementation.
- https://maps.eox.at/ requests attribution and a link back.
- https://tiles.maps.eox.at/wmts/1.0.0/WMTSCapabilities.xml identifies `s2cloudless_3857`, tile ordering and attribution.
- https://leafletjs.com/examples/quick-start/ documents geographic tiles and visible attribution.

The visible credit names EOxCloudless, EOX IT Services GmbH, modified Copernicus Sentinel data 2016 and CC BY 4.0. This is historical landscape imagery, not live conditions, detailed aerial photography or evidence of current habitat/occurrence/access.

Camera extents reuse Natural Earth 1:50m country/state geography. Colombian region extents and New Zealand main-island extents are broad editorial focus boxes, not ecological/admin boundaries. No traced artwork pixels are treated as coordinates. Focus data covers every current selector, including Jervis Bay Territory.

South Island retains its page-local layer picker, habitat bird filters, public place details and planner. Its existing LCDB and DOC generalised geometry is rendered as a transparent SVG image overlay with even-odd holes intact and placed on the geographic map using the original Mercator extent. Public points use their reviewed geographic coordinates. Dashed itinerary connectors remain base order rather than roads. The satellite and planning backgrounds share one root preference; country/region overlay choices remain local. No location permission or paid API was introduced.

Retired the world-only satellite context and static country renderers. Historical source records/assets remain recovery evidence, not active tiles. Next: verify all maintained entry points and geographic overlays in browsers, extend source-verified protected-area coverage outside South Island, then add geographic species evidence and route planning. Globe curvature, elevation relief, 3D buildings, live sightings and full layer parity are not claimed. A WebGL globe candidate could not initialise in the acceptance browser and was replaced before publication, rather than making 3D hardware a requirement.

Release acceptance and exact deployment are recorded in HANDOFF-CURRENT.md after browser verification.
