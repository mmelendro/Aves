# Colombia national protected areas

## Scope and evidence

The optional satellite layer derives from the official RUNAP consolidated shapefile linked at https://runap.parquesnacionales.gov.co/cifras . Its live page showed the shapefile consolidated on 6 November 2026 and information updated on 10 November, inspected 11 November. The archive contains 1,952 records, including 124 national-category records. This release selects 109 national records with source condition INSCRITA or REGISTRADA; fifteen CONSTRUCCION records are omitted. This filter describes record readiness, not a judgment that an omitted place lacks legal protection. Regional categories and civil-society/private reserves are omitted. Never call this complete SINAP coverage.

Categories retained: 43 Parque Nacional Natural, 43 Reservas Forestales Protectoras Nacionales, ten Santuario de Fauna y Flora, five Distritos Nacionales de Manejo Integrado, three Reserva Natural, three Santuario de Flora, one Área Natural Única and one Vía Parque. Categories remain the publisher's Spanish management labels rather than an inferred IUCN classification. Marine/outlying geometry stays in the data even where the country camera does not include it. The area picker can reach it.

## Source and reuse

Publisher: Parques Nacionales Naturales de Colombia / RUNAP. Download: https://storage.googleapis.com/pnn_geodatabase/runap/latest.zip . SHA-256: 90f39221a5161561299429f917acf51763d232f5716eaafc80ae05f520b5a4cd . Archive bytes: 70,264,674. Source/derived field and coordinate metadata, source links, per-area category and record condition, omitted provisional IDs and geometry checks are in content/colombia-protected-areas.json.

The official metadata states commercial reuse, transformation, attribution and share-alike terms: https://geonetwork.parquesnacionales.gov.co/geonetwork/srv/api/records/0fdd10cc-8a87-428d-816e-020e8c639a85/formatters/xsl-view . The publisher's 18 September 2026 announcement confirms CC BY-SA 4.0 for institutional spatial data: https://www.parquesnacionales.gov.co/sala-prensa/boletines/datos-espaciales-de-parques-nacionales-adoptan-cc-by-sa-4-0/ . The derived GeoJSON and source-derived catalogue remain CC BY-SA 4.0, https://creativecommons.org/licenses/by-sa/4.0/ . Visible map attribution, details/source links and an unrestricted download of the adapted data accompany the layer. This is a data adaptation, not a claim of publisher endorsement or B Corp certification.

## Geography and performance

The archive PRJ is geographic MAGNA-SIRGAS (EPSG:4686). GDAL 3.10.3 transforms it to WGS84 longitude/latitude. A record's wkid describes area calculations and must not override the archive's actual coordinate system. Offline Shapely 2.1.2 performs topology-preserving simplification at no more than 0.0005 degrees, refining small/narrow areas until symmetric area change is at most 2%. Every source island/part and hole is retained. Eight-decimal serialization is an encoding choice, not positional-accuracy evidence. All input/output shapes are checked valid; labels lie inside their geometry.

The 1,666,697-byte web snapshot is about 609 KB gzip versus the 78 MB national raw GeoJSON. It is fetched only when enabled, from AVES itself, with cancellation for stale requests and retained in component memory through toggles. No runtime GIS dependency, external feature-service request, paid provider, new credential or location permission is needed. The source catalogue and controls load with Colombia only. One existing map supports both planning outlines and national areas.

## Visitor interaction and limits

An independent National protected areas checkbox adds amber boundaries. Explore 109 areas opens a keyboard-accessible native selector with management category, official record link, source date, scope, licence and download. Clicking a polygon, Enter/Space, or choosing an area focuses its full geometry without assigning a planning region, bird occurrence or itinerary stop. The detail panel overlays the map without changing its height; Escape/Close restores its trigger focus. Overlay toggles do not fit the camera or recreate the tile engine.

Boundaries show generalised source records, not entrances, road access, habitat, sightings, certification or current opening. Visitor access, permissions, closures and culturally sensitive restrictions must be checked with managers. No wildlife coordinates are added. This follows the evidence and environmental-risk emphasis in B Lab's ESC guidance: https://usca.bcorporation.net/putting-stewardship-to-work-tracking-esc-standards/ . The original Eco-Tourism Business Plan is unavailable in this checkout; no business assumptions are invented.

Automated checks cover integrity/hash, exact selected scope and status filters, categories/IDs, all source parts and holes, valid geographic positions and closed rings, catalogue bounds, label containment, record URLs and known Tayrona/Los Nevados/Chingaza locations. Current release acceptance, runtime and rollback belong in HANDOFF-CURRENT.md. The sole next-step order remains CONTINUE-HERE.md.
