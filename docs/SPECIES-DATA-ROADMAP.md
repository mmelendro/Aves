# Species coverage and place connections

Owner requirement added 13 November 2026 Sydney as audit task 83. Keep existing task IDs, including the authorised 0 to 61 batch. Treat this as a cross-cutting data priority before claiming comprehensive country or regional coverage.

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
