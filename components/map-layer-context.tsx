"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type MapLayers = { background: "habitats" | "satellite"; overlayOpacity: number; nationalParks: boolean; conservation: boolean; park: string; nature: boolean; projects: boolean; heritage: boolean; towns: boolean; businesses: boolean; bcorps: boolean; planning: boolean; point: string }
export const initialMapLayers: MapLayers = { background: "habitats", overlayOpacity: .45, nationalParks: false, conservation: false, park: "", nature: false, projects: false, heritage: false, towns: false, businesses: false, bcorps: false, planning: true, point: "" }
const Context = createContext<{ layers: MapLayers; update: (next: Partial<MapLayers>) => void } | null>(null)

/** Public, page-local display choices. No location, account or trip data is sent. */
export function MapLayerProvider({ children }: { children: ReactNode }) {
  const [layers, setLayers] = useState(initialMapLayers)
  return <Context.Provider value={{ layers, update: next => setLayers(current => ({ ...current, ...next })) }}>{children}</Context.Provider>
}
export function useMapLayers() {
  const shared = useContext(Context)
  const [local, setLocal] = useState(initialMapLayers)
  return shared ?? { layers: local, update: (next: Partial<MapLayers>) => setLocal(current => ({ ...current, ...next })) }
}
