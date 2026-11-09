"use client"

/** One page-local habitat state connects places, land cover and the existing
 * bird viewer. Guest bird wishes remain in their existing private/session flow.
 */
import { createContext, useState, type ReactNode } from "react"
import { MapLayerProvider } from "./map-layer-context"
import type { SouthIslandEcosystemFilter } from "@/content/south-island-ecosystems"

export const SouthIslandHabitatContext = createContext<{ value: SouthIslandEcosystemFilter; select: (value: SouthIslandEcosystemFilter) => void } | null>(null)

export default function SouthIslandHabitatProvider({ children }: { children: ReactNode }) {
  const [value, select] = useState<SouthIslandEcosystemFilter>("all")
  return <SouthIslandHabitatContext.Provider value={{ value, select }}><MapLayerProvider>{children}</MapLayerProvider></SouthIslandHabitatContext.Provider>
}
