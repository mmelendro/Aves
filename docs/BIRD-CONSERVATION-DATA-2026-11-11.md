# Bird conservation metadata

Checked 11 November 2026, Sydney. This snapshot contains global species-level assessments for all 73 photographed species concepts across the Colombian, Australian and New Zealand catalogues. The additional living Birds New Zealand main-checklist entries retain their sourced endemic flags, with global status unknown unless independently verified here. The shared metadata has 414 unique species records.

## Evidence and taxonomy

Each global record stores its source and check date. GBIF exact species matches in class Aves were joined to the public iucnRedListCategory endpoint. The queried canonical name, GBIF accepted key and IUCN taxon identifier are retained where available. A fetch date does not imply a new IUCN assessment or live status. Threatened means CR, EN or VU, following BirdLife/IUCN definitions: https://datazone.birdlife.org/about-our-science/the-iucn-red-list . Data Deficient and missing/unverified status remain distinct.

The photographed subspecies of white heron, weka, tomtit and crested grebe use their parent species assessments and the interface explicitly labels them as global species status. This does not assign a subspecies or regional threat classification.

GBIF's Rainbow Lorikeet match resolves Trichoglossus moluccanus into a different/lumped taxon. Its current BirdLife Australia species page confirms LC; the BirdLife DataZone species concept provides its native-country endemic context. No status was copied from the lumped taxon.

GBIF's Erythrura gouldiae synonym represents the catalogue's Chloebia gouldiae. The direct 2022 IUCN assessment confirms global LC: https://doi.org/10.2305/IUCN.UK.2022-1.RLTS.T22719744A211561819.en . BirdLife Australia's profile currently labels it globally EN, in conflict with that assessment. The direct IUCN source takes precedence. Its separately sourced Australian EPBC Endangered listing remains visible as national status and can be filtered separately. Ceratopipra erythrocephala resolves to Pipra erythrocephala; the accepted synonym is retained in the record.

## Endemism and national listings

Colombian and Australian endemic flags use Birds Canada's Avibase IOC 15.2 country checklists, checked through web retrieval. Only factual flags for photographed species were added, not descriptions or a copied national checklist. Australian Magpie and Sulphur-crested Cockatoo are not Australian endemics. Vermilion Cardinal and Velvet-purple Coronet are not Colombian endemics. Native-country endemism is separate from introduced populations elsewhere and from regional occurrence.

Living New Zealand endemic flags reuse the already sourced Birds New Zealand sixth-edition (2024) main checklist. The broad country includes its offshore islands. These flags neither prove presence on a chosen island nor constitute island endemism.

National classifications are a deliberately incomplete verified selection: kea (NZ), Gouldian Finch, the Australian subspecies of Southern Cassowary, and Carnaby's Black-Cockatoo (Australia). They retain an explicit system, category and source. The Nationally threatened filter says verified entries. It must not be presented as a complete national threatened-species list. Expand it through an audited national ledger rather than inferring it from global categories.

## Product behavior

One root-level, in-memory filter state combines country endemics and a conservation category across maps, carousels and the NZ bird picker. It is not saved to guest/account records. Global, country and regional explorer collections intersect the filter with existing geography and South Island habitat membership. Matching planning regions/countries are outlined or nonmatching ones dimmed, while all visible neighbour choices stay clickable. Country-card selects show matching counts. Empty results retain a clearable filter control rather than falling back to unrelated photos. No species range polygons or wildlife coordinates were invented.

The popover uses the browser's native top layer to avoid clipping inside either card face or expanded map dialogs. The map's geometry, satellite/conservation layers, requests, media rights and private saved wishes remain separate. The same shared metadata labels species details, captions and both maintained bird viewers.

Remaining work includes full national status ledgers, island/subregion endemic adjudication, complete Australia/Colombia checklists beyond photographed selections, and continuing range/habitat coverage. Missing records must remain unknown. Physical Safari/touch acceptance is not claimed by automated component tests or Chromium.
