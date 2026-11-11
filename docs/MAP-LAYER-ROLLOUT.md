# Map-layer source and integration criteria

Technical reference only. The single active delivery order is [CONTINUE-HERE.md](../CONTINUE-HERE.md), not this file. Consult [HANDOFF-CURRENT.md](HANDOFF-CURRENT.md) for shipped scope and [MAP-LAYER-COVERAGE.md](MAP-LAYER-COVERAGE.md) for gaps.

## Current foundation

The maintained satellite renderer uses global geographic tiles, not separate static country rasters. South Island already combines the reviewed LCDB/DOC geometry, public points and schematic itinerary. Planning-region outlines are published across 23 selectors; Colombia masks are explicitly approximate editorial areas. Preserve one map and independent layers; never stretch geographic data over the old Colombian artwork or treat its pixels as coordinates.

## Source families to investigate

| Area | Candidate publisher | Checks before use |
| --- | --- | --- |
| Colombia | Official RUNAP/protected-area authorities | Confirm the actual downloadable dataset, current reuse terms, attribution, projection, category meanings, date and omissions. Do not reuse an old licence assertion without verification. |
| Australia | Official CAPAD/protected-area authorities | Confirm the available release and recognised land categories. A legal national-park category is not interchangeable with IUCN II; separate marine/interim records and private-land gaps. |
| Remaining New Zealand | DOC public conservation land and national parks | Preserve the accepted South Island layer. Review North Island/Rakiura clipping, islands, categories, provenance and access limitations separately. Do not relabel South Island data as national coverage. |
| Public places and businesses | Land managers, operators, community/publisher sources | Verify public coordinates, source date, opening/access evidence and the exact scope of environmental or certification claims. A broad planning base is not a property entrance. |

## Record and geometry requirements

Store publisher, original source URL, licence/attribution, dataset/review dates, scope, original coordinate reference, input hash and reproducible transformation/generalisation. Verify control points and geometry validity, not only image presence. Preserve holes and relevant islands. Keep payloads bounded and load heavy detail only when enabled. Discard stale async responses after a scope change; retain useful selectors if a layer cannot load.

Distinguish official land status, public ownership, visitor access, habitat, bird/site evidence, company certification and operator statements. A park outline does not establish open access or sightings. Avoid sensitive nest coordinates and restricted cultural locations. National checklists cannot establish local occurrence. B Corp status is optional and verified for the named entity; no unverified sustainable score, partnership or regenerative outcome may be inferred.

## Integration and acceptance

Use the shared geographic renderer. Keep map and bird selections, camera, source/legend visibility, keyboard targets and small-screen controls usable through layer changes and expansion. Add no duplicate map, inactive coverage switch, paid API or private-data transmission. External Google Maps actions use reviewed public names; routes must distinguish actual road information from schematic base order.

Every functional increment follows CONTRIBUTING.md and the release rules in the master pathway. Update the coverage register and concise handoff after verification. Earlier release reports, including RELEASE-2026-11-09-SOUTH-ISLAND-DISCOVERY.md, are evidence of earlier stages, not instructions to pause or redo already published work.

Use [B Lab's ESC guidance](https://usca.bcorporation.net/putting-stewardship-to-work-tracking-esc-standards/) as an environmental/supplier evidence framework, not proof of certification, access rights, partnerships or an achieved impact outcome.
