"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type MapLayers = { background: "habitats" | "satellite"; nationalParks: boolean; conservation: boolean; park: string }
const initial: MapLayers = { background: "habitats", nationalParks: false, conservation: false, park: "" }
const Context = createContext<{ layers: MapLayers; update: (next: Partial<MapLayers>) => void } | null>(null)

/** Public, page-local display choices. No location, account or trip data is sent. */
export function MapLayerProvider({ children }: { children: ReactNode }) {
  const [layers, setLayers] = useState(initial)
  return <Context.Provider value={{ layers, update: next => setLayers(current => ({ ...current, ...next })) }}>{children}</Context.Provider>
}
export function useMapLayers() {
  const shared = useContext(Context)
  const [local, setLocal] = useState(initial)
  return shared ?? { layers: local, update: (next: Partial<MapLayers>) => setLocal(current => ({ ...current, ...next })) }
}
