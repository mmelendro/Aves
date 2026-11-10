import { southIslandPlaceContexts } from "@/components/public-explorer/content/south-island-place-media"
import type { SouthIslandEcosystemFilter } from "@/components/public-explorer/content/south-island-ecosystems"

/** One ordered media collection keeps map selections and photo arrows in step.
 * These are reviewed landscape references, not exact species occurrence sites. */
export const southIslandLandscapeSlides = southIslandPlaceContexts.flatMap(place =>
  place.photos.map(photo => ({ place, photo })),
)

export type SouthIslandDiscovery = { habitat: SouthIslandEcosystemFilter; slideIndex: number }
export type SouthIslandDiscoveryAction =
  | { type: "habitat"; habitat: SouthIslandEcosystemFilter }
  | { type: "slide"; index: number }
  | { type: "place"; id: string }

export const initialSouthIslandDiscovery: SouthIslandDiscovery = { habitat: "all", slideIndex: 0 }

/** Update habitat and landscape together, without an effect's mismatched frame.
 * All restores the bird collection while retaining the visitor's chosen place.
 * A place/slide selects its broad habitat; it does not assert local bird ranges. */
export function southIslandDiscoveryReducer(state: SouthIslandDiscovery, action: SouthIslandDiscoveryAction): SouthIslandDiscovery {
  if (action.type === "habitat") {
    const index = action.habitat === "all" || southIslandLandscapeSlides[state.slideIndex].place.habitat === action.habitat
      ? state.slideIndex : southIslandLandscapeSlides.findIndex(slide => slide.place.habitat === action.habitat)
    return index < 0 ? state : { habitat: action.habitat, slideIndex: index }
  }
  const index = action.type === "place"
    ? southIslandLandscapeSlides.findIndex(slide => slide.place.id === action.id)
    : Number.isInteger(action.index)
      ? ((action.index % southIslandLandscapeSlides.length) + southIslandLandscapeSlides.length) % southIslandLandscapeSlides.length : -1
  if (index < 0) return state
  return { habitat: southIslandLandscapeSlides[index].place.habitat, slideIndex: index }
}
