# New Zealand bird checklist and private selections

The complete **published OSNZ 2024 main checklist** is the reference for this release: [Checklist, sixth edition](https://www.birdsnz.org.nz/society-publications/checklist/) and its [official workbook](https://www.birdsnz.org.nz/wp-content/uploads/2024/12/Supp-1-Checklist-2024-database.xlsx), checked 8 November 2026. All 432 species rows are included exactly once: 377 living and 55 extinct. Subspecies/hybrids are not duplicated as species, and fossil-only Appendix 1 / failed introductions in Appendix 2 are outside this defined main-list scope. It covers NZ's main, Chatham, Kermadec and NZ subantarctic islands. Rare visitors are labelled; inclusion does not imply dependable sightings, South Island occurrence, access or booking availability. Names/status are factual metadata; descriptive text, illustrations and photographs were not copied.

The 31 existing photographed/calling profiles retain their licensed media, location notes, sources and map links. Subspecies photos select their parent species; all 31 mappings are tested. Extinct historical entries are searchable and disabled. eBird remains the primary occurrence guide where accessible, alongside existing DOC/BirdLife references. Its automated site access and Cornell's download were blocked in this run, so do not describe this catalogue as a live eBird 2026 extract. Taxonomies differ; cite the actual edition, not a universal current species total.

`content/new-zealand-checklist.json` is public reference data, identical in both app branches. The source application's `scripts/import-nz-checklist.py` rebuilds it from the official workbook with Python's standard library, validates the complete main-list count and derives stable IDs from normalized scientific names. Example from the source checkout:

```powershell
python scripts/import-nz-checklist.py ../audit/research/nz-checklist-2024.xlsx content/new-zealand-checklist.json ../australia/content/new-zealand-checklist.json
```

A new reference edition needs deliberate source/count/taxon-alias review, tests, matching database whitelist and both app releases. Preserve saved identifiers when taxon names change; do not silently regenerate IDs underneath customer plans. Māori names are from the published naming data; shared-name asterisks are removed for display and duplicated English suffixes are not repeated. No totemic association is inferred.

Guest picks are a temporary same-tab basket (`lib/nz-bird-selection.ts`) with a one-day expiry. Only validated species IDs and a timestamp are stored; no questionnaire text, identity or credentials. The normal sign-in return URL contains no bird preferences. New draft prefill is reviewed before Save My Draft. Existing drafts require explicit merge; a failed save does not consume the basket, and a successful receipt removes only matching picks. Without browser storage, use the picker directly in the private editor. Sign-out clears the basket.

Saved choices use optional `details.questionnaire.birdIds`, bounded by API validation and the destination catalogue's nonpersonal `planning_bird_ids` whitelist. Existing ownership RLS and immutable submission snapshots apply. Notifications link to the private owner inbox without answers. No public guest checklist/profile is created. This is want-to-see planning, separate from seen/bingo, full itinerary generation or group collaboration.

Verification and exact live builds are in the current `CONTINUE-HERE.md` checkpoint. Physical phone and real guest trials remain unverified. Further media expansion requires individual licence checks; public access to eBird/Macaulay media is not reuse permission.
