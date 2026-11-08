# AVES — visual site architecture

**Current checkpoint —9November:** source f941bb9 and shared accounts5659bea are published and verified. See [current prompt](NEXT-WEEK-PROMPT.md) and [release checkpoint](RELEASE-2026-11-09-PLACES-ACCOUNTS.md). Historical release notices below are superseded. Private account hierarchy now includes `/account/email-updates`; exclude it from public/XML sitemaps. Next visual priority012c; automatic private proposal research/story059 remains queued. Pause after sync.

<details><summary>Historical plan and architecture evidence</summary>

**Latest release — 9 November 2026: Arthur’s Pass 3D place-card pilot published; paused.** Source3ef94db / dpl_CwtAGCjuBe4XdYHw72GKxNrJYwHC. ONE card flips between a sourced local map and two credited landscape photographs, with explicit controls, retained photo choice, inert hidden face and reduced-motion CSS.118 source tests, TypeScript/hosted build and staged/live checks passed within the recorded limits; mobile screenshot capture was unreliable, no physical-phone test. AU/account runtime unchanged3f644a1. Read [the release checkpoint](RELEASE-2026-11-09-SOUTH-ISLAND-PLACE-CARD.md) and [the current prompt](NEXT-WEEK-PROMPT.md); they supersede older status notes. Next proposed038 map zoom/scale requires owner selection.047–052 remain queued.

**Latest release —9November2026: homepage birds↔aves word flip published; paused.** Source3528885 / dpl_By1hgiuQgM1pKQ3G3Tr3esoPPU3u. Heading “Where will birds take you?”; only the word changes, in matching borderless lowercase green italics.116 full source checks plus14 focused refinement checks (overlapping), TypeScript/build and desktop/phone-sized verification passed within the recorded limits. AU/account runtime unchanged3f644a1. See [RELEASE-2026-11-09-HOMEPAGE-WORD-FLIP.md](RELEASE-2026-11-09-HOMEPAGE-WORD-FLIP.md). Next proposed: ONE South Island local-map/landscape3D place-card pilot015/037, Sol medium. Do not start it automatically. Background media041, sea context042, map hover preview043, paired place names044, team refresh045 and double-click navigation046 are queued.

This notice supersedes older release/next-step suggestions below; NEXT-WEEK-PROMPT.md is the clean current entrypoint.

**Latest release —9November2026: South Island land-cover map and simpler species wording published; paused.** Source011de84 / dpl_BHkhR6U5U1eGgWLFdoUq4gtLk7g4; AU/shared account3f644a1 / dpl_FxbDazX29G5cqCnuYP8ZmGDNwy34. Attributed LCDB2023/24 map/filter pilot is live; public/private controls now say “Search377 species” and “All species”, with extinct entries still excluded.115 source tests,9 focused wording/catalogue checks, TypeScript/builds and desktop/mobile verification passed within the release notes’ limits. See [RELEASE-2026-11-09-SOUTH-ISLAND-MAP-LAYER.md](RELEASE-2026-11-09-SOUTH-ISLAND-MAP-LAYER.md). Next owner priorities:026 homepage birds→AVES word flip, then015/037 ONE South Island place-map/landscape3D card pilot. Zoom+accurate scale038 and other follow-ups remain queued. Wait for one selected increment; Sol medium recommended.

**Current execution order is in NEXT-WEEK-PROMPT.md:**026 homepage word flip, then the owner-confirmed ONE South Island3D place card pilot015/037. Later map zoom+scale038, place carousel expansion, media previews039, whole-region context006c and North Island parity040 remain separate. Older status/ordering notes below are historical and do not override this checkpoint.

**Latest release — 9 November 2026: South Island ecosystem filter and living-only NZ checklist published; paused.** Four coarse habitat filters reuse 30 sourced South Island profiles and the shared carousel; Info/calls/wishes remain connected. Public and private pickers show 377 living entries; 55 extinct records remain archived, not browsable/selectable. Source df46c45 / dpl_7VQUbcr1NuTAWxFx3BAaQE4E3Ri2; account app c0a31ec / dpl_CEczrT3zECEYVLwS7WKSa19Fryag. Desktop/mobile,113 source +275 account tests, TypeScript, hosted builds and live sitemap checks passed. See [ecosystem release checkpoint](RELEASE-2026-11-09-SOUTH-ISLAND-ECOSYSTEMS.md). Detailed ecosystem polygons/place overlays and other-region rollout remain queued; this pilot does not claim mapped habitat boundaries. Keep Sol medium for the next selected code increment; wait for selection. This supersedes older next-step/status notes.

**Latest checkpoint — 9 November 2026: private NZ budget controls published; paused.** Optional accommodation/food/activities sliders and editable whole-unit amounts, six currency codes, save/edit/reopen and frozen owner review verified live. Currency selection labels entered numbers; automatic conversion is NOT implemented. Source app remains 4d1c703; account app e8656ad / dpl_HWRbDEFKZXJdhfuwbURNWsjJ7xHf. See [private-budget release checkpoint](RELEASE-2026-11-09-PRIVATE-BUDGETS.md). Latest follow-ups: embedded resources036; featured places/ecosystem map and verified local bird filtering034/013; dated sitewide currency conversion035. Keep Sol medium for the next selected coding increment; wait for selection. This notice supersedes older next-step/state notes.

**Current release — 9 November 2026: published and paused.** South Island/regional zoom is live: source5847eb7 / dpl_GMPLFwPviWsLq73i9JJBjCNvkaja; AU6ba7fee / dpl_9ZrHC1jyd3SGzMeVn248kcFBwmcv. Desktop/mobile and live sitemap checks passed within the limits recorded in [RELEASE-2026-11-09-SOUTH-ISLAND.md](RELEASE-2026-11-09-SOUTH-ISLAND.md). A1 is complete; B1 private-brief verification is the next proposed increment, not started. Announce model/effort before resuming; Sol medium recommended. This notice overrides older staged/paused status below.

Design/source snapshot: 9 November 2026 (Sydney). **Planning only; no navigation or sitemap interface has been deployed by this update.** Public registry data was inspected locally today. Provider/live status remains the 8 November checkpoint; the new South Island route was published and verified live 9 November. See AGILE-PLAN for sequencing and the mandatory deployment sitemap gate (033).

## Read the two dimensions

Vertical nesting below describes the visitor's information hierarchy, not a proposed URL rename. Existing Colombian region URLs stay under /regions; Australian URLs include /australia. Regions are planning regions, states/territories or islands as appropriate, not interchangeable boundary claims.

Horizontal journeys cross that hierarchy:

```mermaid
flowchart LR
  W[World] --> C[Country]
  C --> R[Region]
  R --> B[Birds and habitats]
  B --> E[Nearby experiences and useful resources]
  E --> P[Private trip brief]
  P --> M[Shared My Trips]
  M --> O[Human review and personal quote]
```

Related links express those journeys; they do not create duplicate pages or expose private records. Photos and maps are two ways into the same place/species content. The public expandable directory should show only useful cross-links, not an all-to-all diagram.

## Expandable public page tree — design preview

The lists below are generated from the inspected lib/public-pages.ts registries, then grouped by visitor context. They are a documentation snapshot, not a third runtime catalogue. Refresh from those registries when routes change. Until 033b ships, the human sitemap still uses grouped cards. Its future tree should reuse those same route records and minimal parent/related metadata.

<details open>
<summary>AVES — all destinations</summary>

- [Global homepage / world explorer](https://aves.bio/)
- [Human site map](https://aves.bio/site-map)

<details>
<summary>Colombia</summary>

<details>
<summary>Overview, birdlife and trip planning</summary>

- [Colombia Home](https://aves.bio/colombia)
- [Explore the Regions](https://aves.bio/aves-explorer)
- [Colombian Birdlife](https://aves.bio/species)
- [How It Works](https://aves.bio/how-it-works)
- [Plan My Colombia Trip](https://aves.bio/contact)

</details>
<details>
<summary>Colombian Regions</summary>

- [Pacific](https://aves.bio/regions/pacific)
- [Western Andes](https://aves.bio/regions/western-andes)
- [Central Andes](https://aves.bio/regions/central-andes)
- [Eastern Andes](https://aves.bio/regions/eastern-andes)
- [Cauca Valley](https://aves.bio/regions/cauca-valley)
- [Magdalena Valley](https://aves.bio/regions/magdalena-valley)
- [Caribbean](https://aves.bio/regions/caribbean)
- [Sierra Nevada de Santa Marta](https://aves.bio/regions/sierra-nevada-de-santa-marta)
- [Llanos](https://aves.bio/regions/llanos)
- [Amazonia](https://aves.bio/regions/amazonia)
- [Colombian Massif](https://aves.bio/regions/colombian-massif)

</details>
<details>
<summary>Colombia Birding Experiences</summary>

- [Birding Experiences](https://aves.bio/tours)
- [Adventure Tours](https://aves.bio/tours/adventure)
- [Vision Tours](https://aves.bio/tours/vision)
- [Elevate Tours](https://aves.bio/tours/elevate)
- [Souls Tours](https://aves.bio/tours/souls)
- [Sierra Nevada Birding Experience](https://aves.bio/tours/adventure/sierra-nevada)

</details>
<details>
<summary>Colombia Reading & Planning</summary>

- [Birding Blog](https://aves.bio/blog)
- [Hummingbird Sanctuaries](https://aves.bio/blog/hummingbird-vision-journey)
- [Sierra Nevada Birding](https://aves.bio/blog/sierra-nevada-indigenous-birding)
- [Páramo & Cloud Forests](https://aves.bio/blog/paramo-manizales-thornbill)
- [Chocó Birding](https://aves.bio/blog/choco-toucan-expedition)
- [Birding Resources](https://aves.bio/resources)
- [Travel Tips](https://aves.bio/travel-tips)

</details>
<details>
<summary>About AVES Colombia</summary>

- [About AVES Colombia](https://aves.bio/about)
- [Our Team](https://aves.bio/team)
- [Our Partners](https://aves.bio/about/partners)
- [Our B Corp Journey](https://aves.bio/about/b-corp)
- [Responsible Birding](https://aves.bio/conservation)

</details>

</details>

<details>
<summary>Australia</summary>

<details>
<summary>Start Exploring</summary>

- [Australia Home](https://aves.bio/australia)
- [Explore the Regions](https://aves.bio/australia/aves-explorer)
- [Australian Birdlife](https://aves.bio/australia/species)
- [How It Works](https://aves.bio/australia/how-it-works)
- [Plan My Trip](https://aves.bio/australia/contact)

</details>
<details>
<summary>Australian Regions</summary>

- [Queensland](https://aves.bio/australia/regions/queensland)
- [New South Wales](https://aves.bio/australia/regions/new-south-wales)
- [Tasmania](https://aves.bio/australia/regions/tasmania)
- [Victoria](https://aves.bio/australia/regions/victoria)
- [South Australia](https://aves.bio/australia/regions/south-australia)
- [Western Australia](https://aves.bio/australia/regions/western-australia)
- [Northern Territory](https://aves.bio/australia/regions/northern-territory)
- [Australian Capital Territory](https://aves.bio/australia/regions/australian-capital-territory)
- [Jervis Bay Territory](https://aves.bio/australia/regions/jervis-bay-territory)

</details>
<details>
<summary>Birding Experiences</summary>

- [Birding Experiences](https://aves.bio/australia/tours)
- [Adventure Tours](https://aves.bio/australia/tours/adventure)
- [Vision Tours](https://aves.bio/australia/tours/vision)
- [Elevate Tours](https://aves.bio/australia/tours/elevate)
- [Souls Tours](https://aves.bio/australia/tours/souls)

</details>
<details>
<summary>Reading & Planning</summary>

- [Australian Notes](https://aves.bio/australia/blog)
- [Birding Resources](https://aves.bio/australia/resources)
- [Travel Tips](https://aves.bio/australia/travel-tips)

</details>
<details>
<summary>About AVES</summary>

- [About AVES Australia](https://aves.bio/australia/about)
- [Our Team](https://aves.bio/australia/team)
- [Our Connections](https://aves.bio/australia/about/partners)
- [Our B Corp Journey](https://aves.bio/australia/about/b-corp)
- [Responsible Birding](https://aves.bio/australia/conservation)

</details>
<details>
<summary>Website Information</summary>

- [Privacy](https://aves.bio/australia/privacy)
- [Terms](https://aves.bio/australia/terms)
- [Cookies](https://aves.bio/australia/cookies)
- [Photo & Sound Credits](https://aves.bio/australia/credits)
- [Site Map](https://aves.bio/australia/site-map)

</details>

</details>

<details>
<summary>Aotearoa New Zealand</summary>

- [New Zealand — In Development](https://aves.bio/new-zealand)
- [South Island — Birdlife & Trip Planning](https://aves.bio/new-zealand/south-island) **Published 9 November 2026.**
- [North Island — current country-page section](https://aves.bio/new-zealand#region-north-island); dedicated guide **planned**, URL not assigned by this document.
- [Rakiura — current country-page section](https://aves.bio/new-zealand#region-rakiura); dedicated guide **planned**, URL not assigned by this document.
- [South Island practical planning — in-page section, published9 November](https://aves.bio/new-zealand/south-island#practical-planning). [Curated listening, viewing and reading](https://aves.bio/new-zealand/south-island#resources) also published9 November; both are in-page sections, not separate canonical routes.

</details>

<details>
<summary>Global website information and credits</summary>

- [Privacy](https://aves.bio/privacy)
- [Terms](https://aves.bio/terms)
- [Cookies](https://aves.bio/cookies)
- [Photo & Sound Credits](https://aves.bio/credits)
- [Site Map](https://aves.bio/site-map)

</details>

</details>

## Shared private journey — not an indexed branch

- Shared [My Trips entry](https://aves.bio/account) is the generic sign-in/private-workspace doorway across all destinations, not a public list of clients or itineraries.
- Existing private drafts, wishlist selections, questionnaire answers, explicit requests and owner-priced proposals remain access-controlled. No personal content belongs in this document, the public tree, XML or logs.
- A public directory may link the generic My Trips doorway separately from its SEO-page inventory. Do not enumerate owner/admin tools or private record URLs publicly. Sitemap omission/robots are not access controls.

## Planned directory presentation and release checks

Keep country names visible; expand to regions and related pages with nested lists/disclosures, full region names and a clear current-page cue. Use the AVES emerald style and small cross-link rows, not a heavy graph library. Desktop may align branches in columns; phones need a readable vertical stack with keyboard/touch disclosure and no horizontal overflow.

For every deployment: compare canonical public routes and registry; refresh this snapshot/visible directory when structure changes, otherwise mark checked/unchanged; test links/parents, canonicals/redirects/Australian base path and private-route exclusion; check human and XML views on stage/live. No false lastModified dates. Planned nodes stay out of public navigation until available; newly published South Island must lose its staged badge in this planning snapshot.

Search-engine inventories remain separate from this visual hierarchy: [AVES XML](https://aves.bio/sitemap.xml) and [Australia XML](https://aves.bio/australia/sitemap.xml). Existing tests already validate canonical uniqueness, region coverage, private exclusions and base paths. Add only missing route/hierarchy drift checks when implementing 033b; no application changes are made by this planning artifact.

</details>
