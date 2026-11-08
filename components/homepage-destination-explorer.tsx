/**
 * One selected country drives the summary, destination link and existing bird
 * viewer. The map arrives as server-rendered children, so the whole world's
 * geometry does not become a browser JavaScript dependency.
 */
"use client"

import { useState, type ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import { destinations } from "@/content/destinations"
import DestinationCardMedia from "@/components/destination-card-media"
import { DestinationSelectionContext } from "@/components/destination-selection-context"
import ResizableDiscoveryPair from "@/components/resizable-discovery-pair"
import styles from "./homepage-destination-explorer.module.css"

export default function HomepageDestinationExplorer({ map, initialCountryId }: { map: ReactNode; initialCountryId?: string }) {
  const [selectedId, selectDestination] = useState(initialCountryId ?? destinations[0]?.id)
  const destination = destinations.find(country => country.id === selectedId) ?? destinations[0]
  if (!destination) return null

  return (
    <DestinationSelectionContext.Provider value={{ selectedId: destination.id, selectDestination }}>
      <div className="mx-auto max-w-6xl">
        <div role="group" aria-label="Choose a country to preview" className="mb-6 flex flex-wrap justify-center gap-2 sm:gap-3">
          {destinations.map(country => (
            <button key={country.id} type="button" aria-pressed={destination.id === country.id} aria-controls="homepage-country-preview"
              onClick={() => selectDestination(country.id)}
              className={`inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${destination.id === country.id ? "border-emerald-800 bg-emerald-800 text-white" : "border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50"}`}>
              {country.name}
            </button>
          ))}
        </div>
        <div id="homepage-country-preview" className="mb-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-medium tracking-tight text-emerald-950">{destination.name}</h2>
              {destination.status && <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-900">{destination.status} · Planning beta</span>}
            </div>
            <p className="mt-2 text-sm leading-6 text-gray-600">{destination.description}</p>
          </div>
          {/* Selection stays on this page; this native link opens the chosen app. */}
          <a href={destination.href} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-3 rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">
            Explore {destination.name}<ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <div className={styles.layout}>
          {/* Keep the divider mounted when countries change, preserving its split.
              Only the keyed viewer resets old slides, calls, timers and details. */}
          <ResizableDiscoveryPair mapLabel="Resize world map and bird photographs"
            map={<div className={styles.mapPanel}>{map}</div>}
            media={<div key={destination.id} className={styles.mediaPanel}>
              <DestinationCardMedia destination={destination} fillPanel />
            </div>} />
        </div>
        <p role="status" className="sr-only">{destination.name} selected. Showing its bird photographs and destination link.</p>
        <noscript><p className="mt-4 text-sm text-emerald-900">Open a destination: {destinations.map(country => <a key={country.id} href={country.href} className="mr-4 inline-flex min-h-11 items-center underline">{country.name}</a>)}</p></noscript>
      </div>
    </DestinationSelectionContext.Provider>
  )
}
