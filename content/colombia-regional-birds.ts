/** One cached join supplies country previews and dedicated Colombian guides. */
import { birdData, type BirdProfile } from "./birds"
import { regions } from "./regions"
import { colombiaMapMarkers } from "./colombia-map-markers"

const collections: Record<string, BirdProfile[]> = Object.fromEntries(regions.map(region => [region.id,
  region.birds.flatMap(selection => {
    const bird = birdData.find(item => item.id === selection.birdId)
    return bird ? [{ ...bird, regionSlug: region.id, regionHref: `/regions/${region.id}`,
      primaryRegion: colombiaMapMarkers.find(marker => marker.slug === region.id)?.name || region.name,
      localOccurrence: selection.whereFound,
      sources: [...new Map([...bird.sources, ...selection.sources].map(source => [source.url, source])).values()],
    }] : []
  }),
]))

export function colombiaRegionBirds(id: string): BirdProfile[] {
  return Object.hasOwn(collections, id) ? collections[id] : []
}
