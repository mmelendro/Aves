import index from "@/content/south-island-discovery-index.json"
import type {SouthIslandEcosystemFilter} from "@/content/south-island-ecosystems"
export const southIslandSlideIndex=index.slides as {place:{id:string;habitat:Exclude<SouthIslandEcosystemFilter,"all">}}[]
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
    const index = action.habitat === "all" || southIslandSlideIndex[state.slideIndex].place.habitat === action.habitat
      ? state.slideIndex : southIslandSlideIndex.findIndex(slide => slide.place.habitat === action.habitat)
    return index < 0 ? state : { habitat: action.habitat, slideIndex: index }
  }
  const index = action.type === "place"
    ? southIslandSlideIndex.findIndex(slide => slide.place.id === action.id)
    : Number.isInteger(action.index)
      ? ((action.index % southIslandSlideIndex.length) + southIslandSlideIndex.length) % southIslandSlideIndex.length : -1
  if (index < 0) return state
  return { habitat: southIslandSlideIndex[index].place.habitat, slideIndex: index }
}
