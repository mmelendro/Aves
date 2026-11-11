/** Shared, page-only country selection. No accounts, cookies or saved preferences. */
"use client"

import { createContext, useContext } from "react"

export const DestinationSelectionContext = createContext<{
  selectedId: string
  selectDestination: (id: string) => void
  zoomed?: boolean
  matchingCountryIds?: readonly string[]
} | null>(null)

export function useDestinationSelection() {
  const value = useContext(DestinationSelectionContext)
  if (!value) throw new Error("Country controls must be inside HomepageDestinationExplorer")
  return value
}
