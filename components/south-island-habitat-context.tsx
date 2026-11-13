"use client"

/** One page-local discovery state connects places, land cover and the existing
 * bird viewer. Guest bird wishes remain in their existing private/session flow.
 */
import { createContext, useEffect, useReducer, type ReactNode } from "react"
import { TripMapProvider } from "./trip-planner/trip-map-context"
import { MapLayerProvider } from "./map-layer-context"
import { useHeaderLandscape } from "./header-landscape-context"
import type { SouthIslandEcosystemFilter } from "@/content/south-island-ecosystems"
import { initialSouthIslandDiscovery, southIslandDiscoveryReducer, southIslandSlideIndex, type SouthIslandDiscoveryAction } from "@/lib/south-island-discovery-state"

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
  useEffect(()=>{
    const restore=()=>{const place=new URLSearchParams(window.location.search).get("place");if(place&&southIslandSlideIndex.some(s=>s.place.id===place))dispatch({type:"place",id:place});else dispatch({type:"slide",index:0})};restore();window.addEventListener("popstate",restore);return()=>window.removeEventListener("popstate",restore)
  },[])
  function select(action:SouthIslandDiscoveryAction){
    const next = southIslandDiscoveryReducer(state,action)
    publish({country:"new-zealand",regionId:"south-island",placeId:southIslandSlideIndex[next.slideIndex].place.id})
    dispatch(action)
    try{const url=new URL(window.location.href);url.searchParams.set("place",southIslandSlideIndex[next.slideIndex].place.id);window.history.pushState(window.history.state,"",`${url.pathname}${url.search}${url.hash}`)}catch{}
  }
  return <SouthIslandHabitatContext.Provider value={{
    value: state.habitat,
    slideIndex: state.slideIndex,
    select: habitat => select({ type: "habitat", habitat }),
    selectSlide: index => select({ type: "slide", index }),
    selectPlace: id => select({ type: "place", id }),
  }}><TripMapProvider><MapLayerProvider>{children}</MapLayerProvider></TripMapProvider></SouthIslandHabitatContext.Provider>
}
