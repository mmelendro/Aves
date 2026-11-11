# Australia national park pilot

Status: candidate source, awaiting hosted acceptance. Production remains the Colombia release recorded in HANDOFF-CURRENT.md until that acceptance succeeds.

## Scope and provenance

13 selected parks across NSW, Queensland, Victoria, Tasmania, SA, WA, ACT, NT and Jervis Bay Territory. This is a useful bounded pilot, not complete Australian protected-area coverage. Selected parks: Blue Mountains, Booderee, Cradle Mountain-Lake St Clair, Ikara-Flinders Ranges, Kakadu, Karijini, Kosciuszko, Lamington, Namadgi, Royal, South Bruny, Wilsons Promontory and Yanchep.

Official publisher: Australian Government Department of Climate Change, Energy, the Environment and Water. [CAPAD 2024](https://www.dcceew.gov.au/environment/land/nrs/science/capad/2024) is a 30 June 2024 snapshot. Its [technical specification](https://www.dcceew.gov.au/sites/default/files/documents/capad-2024-tech-spec.pdf) explicitly permits CC BY 4.0 reuse. Attribution: Collaborative Australian Protected Areas Database (CAPAD) 2024, Commonwealth of Australia 2025. Boundaries and catalogue selected/generalised by AVES. No certification, bird presence or access permission is inferred.

The official [service metadata](https://gis.environment.gov.au/gispubmap/rest/services/ogc_services/CAPAD/FeatureServer/0/metadata?f=html&format=default) identifies GDA94 / EPSG:4283 and supplier custodianship. The downloaded GeoJSON requests outSR=4326; no hand-assigned coordinate system. A mixed terrestrial/coastal environment flag is retained, not clipped into invented terrestrial boundaries. Separate marine reserves and other reserve categories are omitted.

## Reproduction and checks

`content/australia-protected-area-inputs.json` retains exact public service query URLs and SHA-256 hashes. Download each response to the specified filename. Run `PYTHONPATH=/tmp/aves-map-gis python scripts/generate-australia-protected-areas.py FOLDER` with Shapely 2.1.2. Reject incomplete/changed responses and invalid source geometry. No runtime GIS dependency or external feature request.

Source responses contain 117 parcels for 14 initial park IDs. One Daintree residual NP record is explicitly omitted: the separate National Park Aboriginal record QLD_0017DAB001 needs combined-category review. Displaying the tiny standard NP parcel as the whole named park would be misleading. Do not silently add that source parcel later.

The retained 116 parcels are grouped by permanent PA_ID, never by name. South Bruny has 92 parcels and Namadgi 13, including repeated PA_PID values. Union preserves their full extent. Generalisation retains every union island and hole, validates the rounded result, caps symmetric area difference at 2%, and places labels inside the resulting geometry. The manifest records checks, source classification, governance, manager abbreviation and bounds. Coordinates round to eight decimals. Derived GeoJSON is 438,272 bytes, fetched only after enabling.

Data tests check 13 unique parks, nine jurisdictions, exact manifest/geometry correspondence, hashes/licence/date, source category/status, all ring closures and coordinate bounds, island/hole counts, interior labels, record URLs and independent Royal/Blue Mountains/Kakadu control points. They do not prove current access or survey accuracy.

## Shared implementation

`ProtectedAreaExplorer` now owns one optional overlay, selector, camera-only selection, keyboard activation, Escape/close focus restoration, loading/failure retry and attribution cleanup. Colombia/Australia lazy wrappers supply separate catalogues, credits and scope text. Colombia geometry, catalogue and licence are unchanged. Switching countries unmounts the old wrapper, aborting stale requests and removing its paths/attribution. Bird and planning-region callbacks are not invoked by park selection. No duplicated map or private-data write.

The preview daemon cannot start this existing Next.js application: it injects unsupported Vite options `--host` and `--strictPort`. Working application scripts were preserved. Use the hosted exact-commit candidate for browser acceptance. Physical iPhone/Safari remains unverified.

## Release evidence

Before commit: 576 tests passed, strict TypeScript passed, source audit reported 355 modules and zero unreachable. Local production build and hosted acceptance are recorded below when complete. Rollback remains a4661e63b0594fa6a4bea5cca177a2f3d854a3c3 / dpl_HFWoiGc5Zm2FqHTB6CYoiPcBHzmJ. No schema, provider keys, spend, access, private records, mail or booking changed.

## Narrow-screen defect found in candidate acceptance

At a real browser zoom width of 340 CSS pixels, the existing guide face shrank to 240px and its overflow-hidden map surface clipped the satellite canvas below wrapped controls. A keyboard focus could scroll the hidden surface while pointer targets stayed obscured. This is a blocker to publication, not a passed mobile check.

The correction gives geographic guide faces at least 44rem, allows the inline surface to scroll all intrinsic controls/map content, keeps the canvas at least 20rem, and lets very short expanded dialogs scroll vertically. Park detail headers remain sticky inside their own scroll panel. The map is never remounted for resize. Recheck exact hosted source before publication. This addresses observed clipping within MAP-05; shared layer-picker parity is still pending.

The corrected map frame exposed a second existing short-window obstruction: the 132px sticky site header plus sticky guide actions consumed almost all of a 340×234 CSS-pixel zoom viewport. Below 480px viewport height those two page elements now scroll normally. The modal map keeps its own close toolbar. This targets landscape/high-zoom usability, not a claim of physical Safari testing.
