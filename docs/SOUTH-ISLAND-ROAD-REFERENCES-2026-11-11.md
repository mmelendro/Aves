# South Island journey reference increment

Adds fifteen manually reviewed road-corridor references from five primary publishers: DOC, Destination Kaikōura, Hanmer Springs Thermal Pools & Spa, RealNZ and Visit Fiordland. Records retain publisher, URL, reviewed date, published minutes and the source's stated stop policy. These are published town references, not live routing, traffic, exact stay addresses, transport availability or guaranteed arrival times. Direction and actual addresses can change a journey.

## Data and scope

`content/south-island-road-references.json` owns the reviewable records. `lib/south-island-road-references.ts` provides a symmetric corridor lookup and readable time labels. Trip endpoint overrides are resolved in the planner domain module, not in JSX. An unreviewed Wānaka–Te Anau journey cannot inherit the reviewed Queenstown–Te Anau figure. After endpoints, broad regions use explicit representative town labels. Guests still need exact lodging and activity locations.

Transfer cards display a published reference or an explicit unknown, source/review details, current NZTA condition link and the existing external directions link. References of at least five hours receive an editorial suggestion to break the journey overnight or reduce bases. This is an AVES planning threshold, not an official safety limit. Transfer days and final departure constraints remain unchanged. Itinerary summary counts reviewed, unknown and long references; it does not invent a total drive time from incomplete data. Copy/private note text includes reference provenance and unknowns. Existing immutable submissions remain unchanged.

No composite times, straight-line speed estimates or price claims are derived. A reference does not validate the entire route. References with different stop policies are not added into a misleading trip total. No paid API, new dependency, booking, email, private write or schema change is introduced by the increment.

## Source review

Reviewed 11 November 2026:

- DOC Devils Punchbowl Walking Track: Christchurch 2 h 30 min and Greymouth 1 h 30 min to Arthur's Pass. https://www.doc.govt.nz/parks-and-recreation/places-to-go/canterbury/places/arthurs-pass-national-park/things-to-do/tracks/devils-punchbowl-walking-track/
- Destination Kaikōura: Christchurch 2 h 30 min, Picton 2 h to Kaikōura. https://www.kaikoura.co.nz/about-kaikoura
- Hanmer Springs operator: published Christchurch reference of 90 minutes. https://hanmersprings.co.nz/visiting-the-region
- RealNZ road matrix: six Christchurch, Dunedin, Queenstown and Invercargill corridors. Stop inclusion is not specified. https://www.realnz.com/en/plan/driving-times/
- Visit Fiordland: Queenstown/Te Anau and Invercargill/Te Anau 2 h, Dunedin/Te Anau 4 h and Christchurch/Te Anau 8 h. Its table states rest stops included, sightseeing excluded. https://www.fiordland.org.nz/plan/getting-to-fiordland/
- NZTA current journey and state-highway condition information: https://www.journeys.nzta.govt.nz/journey-planner

Excluded Tourism New Zealand's Top of the South itinerary as a road-time source because its rendered text still carries an old restricted SH1 operating window. Other publishers differ on timing. A review date proves when AVES checked a page, not that the publisher supplies live or uniformly current figures. Keep each selected source and scope visible; do not silently present these as exact times.

## Verification

Runtime: d16c36f881eef0183faad86566f0d8f0d80f49dc. Deployment: dpl_Gg1GZRddP2nsBmfcesuvLV31Cgo2, READY on the combined project prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv. Both aves.bio and www.aves.bio aliases verified. Rollback: a3aa3ea8b58efc9aa1fcf9663d63d3dc86f5e093 / dpl_AL7v9skSFaUCwHVdPsaYkTHJvxkV. Branch: feature/field-guide-card.

546 tests, TypeScript, local and hosted 75-page builds passed. Source audit: 340 modules, zero unreachable application modules. Hosted browser verified the mixed Christchurch–Arthur’s Pass–Queenstown draft, published versus unknown counts, copied source notes, the long Christchurch–Queenstown reference, Wānaka–Te Anau remaining unknown and Queenstown–Te Anau using its own reference. At 340px, document width was 337px. The canonical live Queenstown–Te Anau card and both aliases were verified. The deployment-scoped error/fatal scan for 07:14:39–07:24:39 UTC found no matches. This is scoped evidence, not proof about all traffic or current road conditions. Physical Safari/touch, current traffic, road closures, exact stay/outing travel and actual priced feasibility remain outside this increment. AVES-062 advances to sourced in-page references but remains partial for real routing and broader coverage.
