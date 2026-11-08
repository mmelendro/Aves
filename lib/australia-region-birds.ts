/** Public regional joins for the existing explorer; media and rights stay shared. */
import { birdData, type BirdProfile } from "@/content/birds"
import { regionalBirdSelections } from "@/content/regional-birds"
import { regionOptions } from "@/content/region-options"

// Cache each collection once so the carousel's current bird is a stable object
// when its parent updates a highlight. The local note is not a media location.
const collections: Record<string, BirdProfile[]> = Object.fromEntries(regionOptions.map(region => [region.id,
  (regionalBirdSelections[region.id] ?? []).flatMap(selection => {
    const bird = birdData.find(item => item.id === selection.birdId)
    return bird ? [{ ...bird, primaryRegion: region.label, regionSlug: region.id,
      localOccurrence: selection.whereFound,
      sources: [...new Map([...bird.sources, ...selection.sources].map(source => [source.url, source])).values()],
    }] : []
  }),
]))

// Regent Bowerbird predates the curated local lists. Retain its already-sourced
// Queensland occurrence so all photographed country birds remain discoverable.
// This matches the public collection used by the main AVES homepage.
for (const bird of birdData) {
  if (Object.values(collections).some(birds => birds.some(item => item.id === bird.id))) continue
  const region = regionOptions.find(item => item.id === bird.regionSlug)
  if (region) collections[region.id].push({ ...bird, primaryRegion: region.label })
}

export function australianRegionBirds(regionId?: string): BirdProfile[] {
  if (!regionId) return birdData
  return Object.hasOwn(collections, regionId) ? collections[regionId] : []
}
