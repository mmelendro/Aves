"use client"

/** One page-local discovery state connects places, land cover and the existing
 * bird viewer. Guest bird wishes remain in their existing private/session flow.
 */
import { createContext, useReducer, type ReactNode } from "react"
import { MapLayerProvider } from "./map-layer-context"
import type { SouthIslandEcosystemFilter } from "@/content/south-island-ecosystems"
import { initialSouthIslandDiscovery, southIslandDiscoveryReducer } from "@/lib/south-island-discovery"

export const SouthIslandHabitatContext = createContext<{
  value: SouthIslandEcosystemFilter
  slideIndex: number
  select: (value: SouthIslandEcosystemFilter) => void
  selectSlide: (index: number) => void
  selectPlace: (id: string) => void
} | null>(null)

export default function SouthIslandHabitatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(southIslandDiscoveryReducer, initialSouthIslandDiscovery)
  return <SouthIslandHabitatContext.Provider value={{
    value: state.habitat,
    slideIndex: state.slideIndex,
    select: habitat => dispatch({ type: "habitat", habitat }),
    selectSlide: index => dispatch({ type: "slide", index }),
    selectPlace: id => dispatch({ type: "place", id }),
  }}><MapLayerProvider>{children}</MapLayerProvider></SouthIslandHabitatContext.Provider>
}
