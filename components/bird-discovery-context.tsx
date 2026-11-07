"use client"

/** A nearby map can follow a carousel even when a server page supplies its media.
 * Outside a country duo, the default is null and existing carousel behaviour is unchanged.
 */
import { createContext } from "react"
import type { BirdProfile } from "@/content/birds"
export const BirdDiscoveryContext = createContext<((bird: BirdProfile) => void) | null>(null)
