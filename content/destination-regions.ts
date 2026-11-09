/**
 * The homepage drill-down joins existing maps to verified regional bird lists.
 * These are planning examples, not complete ranges or promised sightings.
 * Stable region IDs also drive highlighting, so the map and photo cannot silently
 * disagree about a bird. No occurrence is inferred from its photograph or label.
 */
import type { BirdProfile, BirdSource } from "./birds"
import { destinationBirds } from "./destination-birds"
import { regions as colombianRegions } from "./regions"
import { colombiaMapMarkers } from "./colombia-map-markers"
import { australiaMapStates } from "./global-australian-map"
import { australianRegionBirds } from "@/features/australia/lib/australia-region-birds"
import { newZealandRegions } from "./new-zealand"
import { newZealandBirdIslands } from "./new-zealand-bird-islands"
import { newZealandRegionHref } from "@/lib/new-zealand-region-links"
import australianOverviews from "@/features/australia/content/region-overviews.json"

export type DestinationRegion = { id: string; name: string; href: string; description?: string }

export const destinationRegions: Record<string, readonly DestinationRegion[] | undefined> = {
  colombia: colombiaMapMarkers.map(region => ({ id: region.slug, name: region.name, href: `/regions/${region.slug}`, description: colombianRegions.find(item => item.id === region.slug)?.description })),
  australia: australiaMapStates.flatMap(state => state.regionId ? [{ id: state.regionId, name: state.name, href: `/australia/regions/${state.regionId}`, description: australianOverviews.regions.find(item => item.id === state.regionId)?.description }] : []),
  "new-zealand": newZealandRegions.map(region => ({ id: region.id, name: region.name, href: newZealandRegionHref(region.id), description: region.description })),
}

type LocalSelection = { birdId: string; whereFound: string; sources: BirdSource[] }

// Reuse the wider profile and its media rights; only its selected-region context
// changes. Keep the species guide first and append any extra local references.
function regionalProfile(countryId: string, region: DestinationRegion, selection: LocalSelection): BirdProfile {
  const bird = destinationBirds[countryId]?.find(item => item.id === selection.birdId)
  if (!bird) throw new Error(`Unknown regional bird: ${countryId}/${region.id}/${selection.birdId}`)
  return {
    ...bird,
    primaryRegion: region.name,
    regionSlug: region.id,
    regionHref: region.href,
    localOccurrence: selection.whereFound,
    sources: [...new Map([...bird.sources, ...selection.sources].map(source => [source.url, source])).values()],
  }
}

// Build these small public collections once. This avoids repeatedly joining the
// catalogues as visitors move through the map or the photographed species.
const regionalBirds: Record<string, Record<string, BirdProfile[]> | undefined> = Object.fromEntries(
  Object.entries(destinationRegions).map(([countryId, regions]) => [countryId, Object.fromEntries((regions ?? []).map(region => {
    if (countryId === "australia") return [region.id, australianRegionBirds(region.id)]
    const selections: readonly LocalSelection[] = countryId === "colombia"
      ? colombianRegions.find(item => item.id === region.id)?.birds ?? []
      : (destinationBirds[countryId] ?? []).filter(bird => newZealandBirdIslands[bird.id]?.some(id => id === region.id))
          .map(bird => ({ birdId: bird.id, whereFound: bird.localOccurrence || bird.distribution, sources: bird.sources }))
    return [region.id, selections.map(selection => regionalProfile(countryId, region, selection))]
  }))]),
)

// A featured country profile can predate the curated local lists. If it has no
// membership at all, retain its already-sourced primary region and occurrence
// notes rather than leaving its photograph without a map highlight. This adds
// the Australian Regent Bowerbird to Queensland; it invents no new association.
for (const [countryId, collections] of Object.entries(regionalBirds)) {
  if (!collections) continue
  for (const bird of destinationBirds[countryId] ?? []) {
    if (Object.values(collections).some(birds => birds.some(item => item.id === bird.id))) continue
    const region = destinationRegions[countryId]?.find(item => item.id === bird.regionSlug)
    if (region) collections[region.id].push(regionalProfile(countryId, region, {
      birdId: bird.id, whereFound: bird.localOccurrence || bird.distribution, sources: bird.sources,
    }))
  }
}

/** No region means the full country; unknown IDs fail closed, never another list. */
export function getDestinationRegionBirds(countryId: string, regionId?: string): BirdProfile[] {
  const regions = Object.hasOwn(destinationRegions, countryId) ? destinationRegions[countryId] : undefined
  if (!regions) return []
  if (!regionId) return destinationBirds[countryId] ?? []
  if (!regions.some(region => region.id === regionId)) return []
  return regionalBirds[countryId]?.[regionId] ?? []
}

/** A photographed bird may legitimately highlight several planning regions. */
export function getBirdRegionIds(countryId: string, birdId: string): readonly string[] {
  const regions = Object.hasOwn(destinationRegions, countryId) ? destinationRegions[countryId] : undefined
  return (regions ?? []).filter(region => regionalBirds[countryId]?.[region.id]?.some(bird => bird.id === birdId)).map(region => region.id)
}
