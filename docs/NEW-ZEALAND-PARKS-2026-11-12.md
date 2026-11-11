# North Island and Rakiura national park pilot

Status: published. Runtime f5d66f7c0a80a597b87fdd25a63d73cd82d070b4, deployment dpl_7caDwrFuRsue4PukCcgGoCBeD6Jq. Both canonical aliases assigned within the approved continuation. Rollback: 347a10f4e057f787d2fe0a8d7c94c9a6277ad43a / dpl_EFg18vbzoQAHLT9YkTmELtqk6F1Q.

## Source and scope

Four official DOC land units: Te Papa-Kura-o-Taranaki, Tongariro National Park, Whanganui National Park and Rakiura National Park. The separate South Island nine-park and public conservation-land implementation is unchanged. This increment does not claim all New Zealand conservation land, offshore reserves, marine areas or Te Urewera.

[DOC Public Conservation Land](https://services1.arcgis.com/3JjYDyG3oajxU6HO/arcgis/rest/services/DOC_Public_Conservation_Land/FeatureServer/0) explicitly declares Creative Commons Attribution 4.0 in its description, including the Crown copyright attribution requirement. Service item ID: 72354ba9bf7a4706af3fdfe60f86eea1. Source CRS is NZTM2000/EPSG:2193; the official query requests outSR=4326. The service last-edit timestamp is 10 November 2026 17:13:58.246 UTC. Retrieval/review date is 12 November 2026, Sydney, not a legal gazettal date or proof of current visitor access.

The input specification keeps exact query URL, SHA-256, stable NaPALIS unit IDs, island identity and DOC visitor guides. The displayed Taranaki name follows DOC’s current guide; the complete raw source name is retained separately. Source legislation/type fields are preserved as dataset codes, not a new legal interpretation. The shared UI links directly to the relevant DOC visitor guide so visitors can check conditions, permits and cultural guidance.

## Important geometry correction

The official service’s GeoJSON conversion emits invalid nested exterior shells for all four records. Accepting it or filling it with a generic repair would erase excluded areas. The generator therefore uses the original Esri JSON response. It reconstructs clockwise exterior rings and assigns each counterclockwise hole to the smallest containing shell. It rejects orphan holes, invalid assembled geometry, incomplete responses, unexpected record IDs and source hash changes. No automatic geometry repair or buffer operation is used.

The reconstructed source preserves these polygon/hole counts:

| Unit | Polygons | Holes |
| --- | ---: | ---: |
| Te Papa-Kura-o-Taranaki | 15 | 1 |
| Whanganui National Park | 155 | 6 |
| Tongariro National Park | 23 | 1 |
| Rakiura National Park | 131 | 4 |

Simplification uses at most 0.0005 degrees, retaining every island/hole, validating the eight-decimal rounded result, interior label and at most 2% symmetric area change. The derived GeoJSON is 234,645 bytes. Download the exact input URL from content/new-zealand-protected-area-input.json, then run `PYTHONPATH=/tmp/aves-map-gis python scripts/generate-nz-remaining-protected-areas.py SOURCE.json` with Shapely 2.1.2. The input hash rejects later upstream changes until re-reviewed.

## Integration and limits

A country-scoped lazy wrapper reuses ProtectedAreaExplorer on the existing satellite map for NZ overview, North Island and Rakiura contexts. It is excluded from the South Island adapter, which already supplies its own reviewed DOC/park overlays. Geometry fetches only after enabling. Selection changes the camera without assigning bird occurrence, changing island context or creating a trip stop. No duplicate map, external runtime feature API, private-data write or GIS application dependency.

Data tests check four units, island identity, legal-type source codes, current/raw names, original hash, date scope, licence, exact geometry/catalogue correspondence, all preserved islands/holes, ring closure, interior labels/bounds and independent Taranaki/Tongariro/Rakiura control points. South Island’s nine named parks remain unchanged.

Hosted acceptance and release IDs are recorded below when completed. Physical iPhone/Safari is not claimed. No schema, keys, access settings, new spend, private records, mail or booking changed.

Final acceptance: all 580 tests, TypeScript, 356 source modules with zero unreachable and local/hosted 75-page builds passed. Browser checked four park controls, Tongariro/Rakiura, Enter/Escape, zero/four layer toggling, expansion and unchanged island context. South Island retained nine named park markers, one existing image overlay and no new protected-area controls. 340px viewport: document 337px, canvas 283.25×320px, panel 267.25px. Canonical live proof is in evidence/2026-11-12-new-zealand-parks.jpg. Error/fatal scan 19:25:37–19:35:37 UTC found no matching logs. Physical touch/Safari remains unverified.
