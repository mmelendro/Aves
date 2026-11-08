# Editing public bird and region content

This folder contains public editorial data. Never put customer itineraries, private contact information or credentials here. TypeScript files accept comments; strict JSON files do not, so their field explanations belong in this README.

## Bird fields

| Field | Meaning |
| --- | --- |
| `id` | Stable identifier joining the species to region selections and credits; keep existing IDs stable. |
| `commonName`, `scientificName` | Display names; verify taxonomy and which actual species the media depicts. |
| `primaryRegion`, `regionSlug` | A featured planning area and its URL identifier, not the whole distribution. |
| `distribution` | Wider species range. |
| `localOccurrence` / regional `whereFound` | Specific, sourced places/habitats relevant to this region. |
| `habitat` | The environment where a visitor may look for the species. |
| `image` | Public image path. The Australian app adds its base path through `sitePath`. |
| `imagePosition` | Optional focal point within the original photograph: `35% center` means 35% from its left edge and halfway down. The shared carousel keeps that point centred as its frame resizes, clamping at photo edges to avoid blank padding. |
| `audioFile`, `audioLabel` | Optional recording path and description/attribution; omission is an unavailable call. |
| `sources` | Factual source titles and links; these are not a live data API or a media licence. |
| `photoCredit` | Photographer, source and related metadata displayed with the bird. |

Media credit JSON keeps the original source page, creator, licence URL and modification information. Do not remove credits when replacing an asset. Photo/recording locations can differ from the local occurrence described. Newly sourced media needs a licence compatible with its intended commercial use; an eBird link alone does not grant that permission.

## Where the collections live

| Application | Main collections |
| --- | --- |
| Global/Colombia/NZ branch | `birds-catalogue.json` -> `birds.ts`; regional selections in `regions.ts`; homepage cards in `destinations.ts`; mixed-country gallery in `global-birds.ts`. |
| New Zealand on that branch | `new-zealand.ts`, `new-zealand-expansion.ts`, `new-zealand-supplement.ts`, assembled by `new-zealand-carousel.ts`; matching credits alongside them. |
| Australian branch | `birds-original.json`, `birds-expansion-a.json`, `birds-expansion-b.json` -> `birds.ts`; guide content in `regions.ts`; local selections in `regional-birds.ts`. |
| Shared trip support on Australian branch | `trip-options.ts` holds the destination registry and allowed regions; `contact-topics.ts` defines general inquiry topics. |

Geographic path coordinates (`australia-map.ts` or `new-zealand-map.json`) are generated boundary data. Their long numeric paths describe outlines; edit the map component's colours or labels rather than hand-editing those coordinates. Preserve the dataset provenance.

## A safe editing sequence

1. Add or correct the profile and factual sources, keeping its stable ID consistent.
2. Add the licensed local photo/audio file and its corresponding credit record.
3. Add appropriate regional selections with locally relevant occurrence notes.
4. Check the photo in the carousel's portrait and shorter frames, including narrow/wide divider positions; set `imagePosition` to the bird's focal point when needed. The existing carousel uses `coverFocalPosition` with the original image dimensions and current frame size. It scales uniformly to cover the frame, centres the point where possible and clamps at the photo edges, without distorting the bird or exposing blank padding. Pages pass their bird collections to this same viewer rather than creating another carousel.
5. Run the application's type check/tests and preview the page, sound and credits. Missing audio must remain visibly unavailable rather than being substituted with another species.

This is a curated inspiration collection, not a complete national checklist or a guarantee of sightings, guide availability or access. Counts and dated operational information need periodic factual review.

## Shared range copy in a region

`regions.ts` may supply `sharedBirdRange` with an editorial `text` and explicit `birdIds`. Those birds share one range paragraph above the local habitat cards instead of repeating it in every card. Their full carousel profiles and factual sources remain intact. Other regions and newly added birds outside that list retain their individual wider-range notes. Verify the summary still matches the named species when changing the list.
