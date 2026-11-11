"use client"

import { createContext, useCallback, useContext, useState, type ReactNode } from "react"

export type MapLayers = { background: "habitats" | "satellite"; overlayOpacity: number; satelliteError: string; nationalParks: boolean; conservation: boolean; park: string; nature: boolean; projects: boolean; heritage: boolean; towns: boolean; businesses: boolean; bcorps: boolean; planning: boolean; itinerary: boolean; point: string }
export const initialMapLayers: MapLayers = { background: "habitats", overlayOpacity: .45, satelliteError: "", nationalParks: false, conservation: false, park: "", nature: false, projects: false, heritage: false, towns: false, businesses: false, bcorps: false, planning: true, itinerary: true, point: "" }
const Context = createContext<{ layers: MapLayers; update: (next: Partial<MapLayers>) => void } | null>(null)

/** Public, page-local display choices. No location, account or trip data is sent. */
export function MapLayerProvider({ children }: { children: ReactNode }) {
  const [layers, setLayers] = useState(initialMapLayers)
  const update = useCallback((next: Partial<MapLayers>) => setLayers(current => ({ ...current, ...next })), []);
  return <Context.Provider value={{ layers, update }}>{children}</Context.Provider>
}
export function useMapLayers() {
  const shared = useContext(Context)
  const [local, setLocal] = useState(initialMapLayers)
  const update = useCallback((next: Partial<MapLayers>) => setLocal(current => ({ ...current, ...next })), []);
  return shared ?? { layers: local, update }
}
