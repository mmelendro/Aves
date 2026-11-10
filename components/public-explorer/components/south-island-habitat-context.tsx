"use client"

/** One page-local discovery state connects places, land cover and the existing
 * bird viewer. Guest bird wishes remain in their existing private/session flow.
 */
import { createContext, useReducer, type ReactNode } from "react"
import { MapLayerProvider } from "./map-layer-context"
import { useHeaderLandscape } from "./header-landscape-context"
import type { SouthIslandEcosystemFilter } from "@/components/public-explorer/content/south-island-ecosystems"
import { initialSouthIslandDiscovery, southIslandDiscoveryReducer, southIslandLandscapeSlides, type SouthIslandDiscoveryAction } from "@/components/public-explorer/lib/south-island-discovery"

export const SouthIslandHabitatContext = createContext<{
  value: SouthIslandEcosystemFilter
  slideIndex: number
  select: (value: SouthIslandEcosystemFilter) => void
  selectSlide: (index: number) => void
  selectPlace: (id: string) => void
} | null>(null)

export default function SouthIslandHabitatProvider({ children }: { children: ReactNode }) {
  const { publish } = useHeaderLandscape()
  const [state, dispatch] = useReducer(southIslandDiscoveryReducer, initialSouthIslandDiscovery)
  function select(action:SouthIslandDiscoveryAction){
    const next = southIslandDiscoveryReducer(state,action)
    publish({country:"new-zealand",regionId:"south-island",placeId:southIslandLandscapeSlides[next.slideIndex].place.id})
    dispatch(action)
  }
  return <SouthIslandHabitatContext.Provider value={{
    value: state.habitat,
    slideIndex: state.slideIndex,
    select: habitat => select({ type: "habitat", habitat }),
    selectSlide: index => select({ type: "slide", index }),
    selectPlace: id => select({ type: "place", id }),
  }}><MapLayerProvider>{children}</MapLayerProvider></SouthIslandHabitatContext.Provider>
}
