# Species coverage and place connections

Owner requirement added 13 November 2026 Sydney as audit task 70, explicitly included in the authorised batch alongside tasks 0 to 61. Previous task 70 (collectible 3D birds) and subsequent tasks move to 71 onward. Treat this as a cross-cutting data priority before claiming comprehensive country or regional coverage.


## Implemented source-version reference increment

Public route: `/species/reference?country=colombia` (also `australia` and `new-zealand`). One shared server-rendered layout supports name/family search, origin, occurrence, reviewed region selection, opt-in historical/reference entries and 40-row pagination. National JSON and the large NZ media index stay server-side. Existing NZ saved wish-list IDs and the private wish-list flow remain unchanged.

| Country | Source-version entries | Default browser | Entries with reviewed regional edges | Maintained regions |
| --- | ---: | ---: | ---: | ---: |
| Colombia | 1,983 | 1,945 | 22 | 11 |
| Australia | 977 | 969 | 20 | 9 |
| New Zealand | 432 | 377 | 41 | 3 |

These totals are deliberately not described as the number of reliably encounterable birds. The Colombian workbook has three rows with `#N/A` in its current scientific-name column: Chaetocercus bombus (313), Pionus fuscus (844) and Polioptila guianensis (1573). They remain in an exclusion report rather than becoming fabricated species rows. The source calls its 2026 taxonomy in progress. Uncertain extinction stays uncertain.

Australian names follow Birds Queensland's AviList 2026 release 2. Older WLAB 4.3 population/family facts attach only on exact current scientific-name matches. 99 names have no exact older match, so those older facts remain unknown. A breeding-only endemic is not asserted to be globally endemic. A V/R flag can apply to Queensland, so it does not independently establish national vagrancy. An Australian extinction record does not establish global extinction.

New Zealand retains all 432 archived species and the 377 living default entries. Public NZ place/activity edges reuse explicitly reviewed catalogue bird IDs and preserve encounter, access and review date. A nearby hotel, cafe or other business does not create a bird-occurrence edge. No supplier partnership is inferred.

All 73 featured profiles match the current national references at species rank. Legitimate region overlaps remain many-to-many. No country list is copied wholesale into a region. Comprehensive regional checklists, a fully reconciled global taxonomy, further independently sourced business links, seasonality and commercial eBird access are still open work. Task 70 is not marked fully complete.

### Reproduce and validate

Download the exact source URLs recorded with SHA-256 hashes in `content/species/*.json` into a local cache. Use filenames `co-2026.xlsx`, `co-2022-dwca.zip`, `au-2026.pdf`, `au-wlab-2023.xlsx`, and `nz-2024.xlsx`. The factual extraction does not copy descriptions, media or source page layouts. Python needs `pdfplumber` for the Australian PDF.

```sh
python scripts/import-species-reference.py --source-dir /path/to/source-cache
node --test tests/species-reference.test.cjs
```

The importer asserts source counts and fails for review when the workbook/PDF changes. Source files are not committed. Crosswalks and previous names are preserved without silently merging taxa. Country source editions are explicit rather than represented as one global taxonomy.

## Intended traveller result

A traveller can choose a species, understand which countries and planning regions have evidence for it, review the season and encounter context, then discover appropriate public places, relevant businesses and nearby activities. A business listing, nearby location or historical observation must not become a promised sighting, current availability or an AVES partnership.

## Delivery stages

1. Inventory every existing country catalogue, regional association, island list, habitat facet and checklist edition. Report coverage and contradictions separately from the number of photographs. The curated carousel is not the country checklist.
2. Reconcile species identities against an explicitly versioned taxonomy. Preserve AVES IDs, scientific names, provider codes and aliases through taxonomic splits, lumps and name changes. Distinguish species from subspecies, hybrids and other taxon categories so totals do not silently double count them.
3. Use many-to-many country, planning-region and place associations. A species may cross several boundaries. An AVES bioregion or corridor is not automatically an eBird geopolitical region. Record the reviewed spatial mapping and exceptions.
4. Review each association using dated sources. Separate native and introduced status, residency, seasonal occurrence, rare or historical records, local extinction and uncertainty. Separate wider distribution, observed occurrence, habitat suitability and practical encounter opportunity.
5. Record source, source version, observation or model period, retrieval date, review date, spatial precision, permitted use and review state. Show gaps honestly. Absence from recent observations does not establish absence, and raw observations do not by themselves provide encounter probabilities.
6. Evaluate the official eBird API and data products for the required scale, permitted uses, attribution and refresh method. Keep any API credential server-side. Use caching, bounded requests, failure handling and a dated fallback. Do not scrape around access restrictions or assume a public API provides a complete range model.
7. Join species to reviewed public birding places, then independently reviewed businesses and activities using stable IDs. Keep occurrence evidence, seasonal advice, access, supplier participation, certification, availability and commercial relationships as separate facts.
8. Protect sensitive wildlife and contributor information. Publish suitable public access locations, not private observation coordinates or nesting sites. Media rights require their own records and do not follow automatically from observation-data access.
9. Verify coverage, overlaps, duplicates, unresolved identities and stale sources across Colombia, Australia and New Zealand. Test maps, filters, search, album records and planning together. Pilot one corridor before expanding the pipeline.

## Completion evidence

- A dated coverage matrix for every maintained country and planning region, with the source checklist and known gaps.
- Stable species identities and reviewed overlapping associations, with no inferred presence from a photograph or business address.
- Clearly labelled season, encounter context, origin and uncertainty where supported.
- A verified species-to-place-to-business/activity pilot without unsupported partnership or sighting claims.
- An integration decision documenting eBird access, terms, commercial scope, provider codes, refresh, caching and fallback. Live integration is not complete until its actual access and data flow are verified.

## Official references checked 13 November 2026 Sydney

- [Cornell Lab: eBird data products](https://science.ebird.org/en/use-ebird-data/download-ebird-data-products)
- [eBird: downloading data and the scope of the public API](https://support.ebird.org/en/support/solutions/articles/48000838205-download-ebird-data)
- [eBird: regional and hotspot exploration](https://support.ebird.org/en/support/solutions/articles/48001255129)
- [eBird: data use and media distinctions](https://support.ebird.org/en/support/solutions/articles/48001078113)

The official help describes the API as serving limited recent and summary outputs and requiring a personal key. Data products may be more suitable for some completeness and seasonality needs. Exact access and use conditions must be checked for the selected product before integration. No eBird connection or complete species coverage is asserted by this roadmap.

Commercial eBird API use requires prior written permission under the [official API terms](https://www.birds.cornell.edu/home/ebird-api-terms-of-use/) and the [data-access terms](https://www.birds.cornell.edu/home/ebird-data-access-terms-of-use/). No API key, live integration or commercial permission is asserted. Access and permitted use must be resolved before implementation.
