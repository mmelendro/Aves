import { southIslandPlaceContexts } from "@/content/south-island-place-media"

/** One ordered media collection keeps map selections and photo arrows in step.
 * These are reviewed landscape references, not exact species occurrence sites. */
export const southIslandLandscapeSlides = southIslandPlaceContexts.flatMap(place =>
  place.photos.map(photo => ({ place, photo })),
)

export {southIslandDiscoveryReducer,initialSouthIslandDiscovery} from "./south-island-discovery-state"
export type {SouthIslandDiscovery,SouthIslandDiscoveryAction} from "./south-island-discovery-state"
