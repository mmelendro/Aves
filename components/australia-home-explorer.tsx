"use client"

/*
 * Homepage pairing of the small clickable map and portrait bird carousel. The carousel
 * reports its current bird to this parent; the map highlights one associated region, not the
 * bird's complete range. Geographic shapes come from content/australia-map.ts, never logo artwork.
 */

import { useCallback, useId, useState } from "react"
import Link from "next/link"
import { ArrowRight, ChevronDown } from "lucide-react"
import HomepageBirdCarousel from "@/components/homepage-bird-carousel"
import { Button } from "@/components/ui/button"
import { australiaMapProvenance, australiaMapStates, australiaMapViewBox } from "@/content/australia-map"
import { birdData, type BirdProfile } from "@/content/birds"
import { regionOptions } from "@/content/region-options"
import { sitePath } from "@/lib/site-path"

// Label callouts make tiny territories usable; these positions do not alter their geographic boundaries.
const smallTerritories = [
  { id: "australian-capital-territory", label: "ACT", x: 620, y: 493, line: "573.81,460.3 608,514 620,514" },
  { id: "jervis-bay-territory", label: "Jervis Bay", x: 620, y: 427, line: "597.38,458.06 608,448 620,448" },
]

export function AustraliaHomeExplorer() {
  const id = useId()
  // React state remembers the displayed bird. The stable callback avoids unnecessary effect retriggers.
  const [bird, setBird] = useState<BirdProfile>(birdData[0])
  const onBirdChange = useCallback((nextBird: BirdProfile) => setBird(nextBird), [])
  // This featured region is one place to look, not a map of the species' entire distribution.
  const highlightedRegion = regionOptions.find(region => region.id === bird.regionSlug)

  return <div className="mx-auto grid max-w-4xl items-center gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
    {/* Media comes first on phones; desktop order places the map left and portrait carousel right. */}
    <div className="mx-auto min-w-0 w-full max-w-[20rem] lg:order-2">
      <HomepageBirdCarousel className="w-full max-w-none" autoPlay={false} onBirdChange={onBirdChange} />
      <p className="mt-3 text-center text-sm leading-relaxed text-gray-600">A glimpse of Australia’s <a href="https://birdlife.org.au/about/" target="_blank" rel="noreferrer" className="font-medium text-emerald-800 underline underline-offset-4">800+ bird species<span className="sr-only"> (source: BirdLife Australia; opens in a new tab)</span></a>. Sightings depend on your route and season.</p>
    </div>
    <div className="mx-auto min-w-0 w-full max-w-2xl lg:order-1">
      <div className="overflow-hidden rounded-2xl border border-emerald-100/70 bg-white/60">
        <div className="px-4 pt-3">
          <h2 className="font-medium text-emerald-950">Explore Australia</h2>
        </div>
        {/* Source geometry is reused unchanged. useId keeps title/description IDs unique on the page. */}
        <svg viewBox={australiaMapViewBox} role="group" aria-labelledby={`${id}-map-title`} aria-describedby={`${id}-map-description`} className="mx-auto my-1 block h-[240px] w-full max-w-[370px] sm:h-[260px] lg:h-[220px] xl:h-[230px]">
          <title id={`${id}-map-title`}>Explore Australia’s states and territories</title>
          <desc id={`${id}-map-description`}>Select a region to open its guide. The darker region is one place to look for the bird in the carousel, not its complete range. All nine regions also have larger links below the map. Generalised boundaries; external territories are outside this map.</desc>
          {australiaMapStates.map(state => {
            const selected = state.regionId === highlightedRegion?.id
            const outline = <path d={state.path} fill={selected ? "#065f46" : "#c5dbd0"} stroke="#6e9582" strokeWidth="1" strokeLinejoin="round" vectorEffect="non-scaling-stroke" fillRule="evenodd" className={`transition-colors group-focus-visible:stroke-emerald-950 group-focus-visible:[stroke-width:3] motion-reduce:transition-none ${selected ? "group-hover:fill-emerald-700 group-focus-visible:fill-emerald-700" : "group-hover:fill-[#9cc4af] group-focus-visible:fill-[#9cc4af]"}`} />
            return state.regionId ? <a key={state.code} href={sitePath(`/regions/${state.regionId}`)} aria-label={`Explore ${state.name}`} className="group outline-none"><title>{state.name}</title>{outline}</a> : <g key={state.code} aria-hidden="true">{outline}</g>
          })}
          {australiaMapStates.filter(state => state.shortName).map(state => <text key={state.code} x={state.label[0]} y={state.label[1]} textAnchor="middle" dominantBaseline="middle" fontSize="27" fontWeight="600" fill={state.regionId === highlightedRegion?.id ? "#ffffff" : "#064e3b"} className="pointer-events-none select-none" aria-hidden="true">{state.shortName}</text>)}
          {/* ACT and Jervis Bay receive separate labelled targets because their outlines are very small. */}
          {smallTerritories.map(territory => <g key={territory.id}>
            <polyline points={territory.line} fill="none" stroke="#047857" strokeWidth="1.5" aria-hidden="true" />
            <a href={sitePath(`/regions/${territory.id}`)} aria-label={`Explore ${regionOptions.find(region => region.id === territory.id)?.label}`} className="group outline-none">
              <rect x={territory.x} y={territory.y} width="94" height="42" rx="9" fill={highlightedRegion?.id === territory.id ? "#065f46" : "#ffffff"} stroke="#6e9582" strokeWidth="1.5" className="group-hover:stroke-[3] group-focus-visible:stroke-[4]" />
              <text x={territory.x + 47} y={territory.y + 22} textAnchor="middle" dominantBaseline="middle" fontSize="17" fontWeight="600" fill={highlightedRegion?.id === territory.id ? "#ffffff" : "#064e3b"} className="pointer-events-none">{territory.label}</text>
            </a>
          </g>)}
        </svg>
        <div className="px-4 pb-3">
          <p className="min-h-10 text-sm leading-5 text-gray-600">{highlightedRegion ? <>Highlighted: <Link href={`/regions/${highlightedRegion.id}`} className="font-medium text-emerald-800 underline underline-offset-4">{highlightedRegion.label}</Link> — one region for {bird.commonName}.</> : "Explore a region to discover its birds and plan your route."}</p>
          {/* Keyboard/touch-friendly text alternatives keep all nine region guides reachable. */}
          <details className="group mt-2 rounded-lg border border-emerald-100 bg-emerald-50/50">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-3 text-sm font-medium text-emerald-800 marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 [&::-webkit-details-marker]:hidden">Browse all 9 regions<ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" /></summary>
            <nav aria-label="Australian region guides" className="grid gap-1 border-t border-emerald-100 p-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">{regionOptions.map(region => <Link key={region.id} href={`/regions/${region.id}`} className="flex min-h-11 items-center rounded-md px-2 text-sm text-emerald-900 hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">{region.label}</Link>)}</nav>
          </details>
          <p className="mt-2 text-[10px] leading-4 text-gray-500"><a href={australiaMapProvenance.sourceUrl} target="_blank" rel="noreferrer" className="rounded underline underline-offset-2 focus-visible:outline focus-visible:outline-emerald-700">Map: Natural Earth · Public domain<span className="sr-only"> (opens in a new tab)</span></a></p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
        <Button asChild size="lg" className="min-h-12 rounded-full bg-emerald-700 px-5 shadow-sm hover:bg-emerald-800"><Link href="/contact">Plan my trip<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></Button>
        <Link href="/aves-explorer" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-emerald-800 underline-offset-4 hover:underline">Explore the regions<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-gray-500">Journeys in development. Routes, guides and pricing agreed personally.</p>
    </div>
  </div>
}
