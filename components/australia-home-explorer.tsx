"use client"

/*
 * Pairs a clickable map and bird carousel, with resizing opted into by the homepage. The carousel
 * reports its current bird to this parent; the map highlights one associated region, not the
 * bird's complete range. Geographic shapes come from content/australia-map.ts, never logo artwork.
 */

import { useRegionPreview } from "./use-region-preview"
import { useCallback, useEffect, useId, useRef, useState } from "react"
import type { MouseEvent, ReactNode } from "react"
import { BirdDiscoveryContext } from "@/components/bird-discovery-context"
import styles from "@/components/country-hero-explorer.module.css"
import zoomStyles from "@/components/australia-regional-zoom.module.css"
import Link from "next/link"
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react"
import HomepageBirdCarousel from "@/components/homepage-bird-carousel"
import ResizableDiscoveryPair from "@/components/resizable-discovery-pair"
import { Button } from "@/components/ui/button"
import { australiaMapProvenance, australiaMapStates, australiaMapViewBox } from "@/content/australia-map"
import { birdData, type BirdProfile } from "@/content/birds"
import { regionOptions } from "@/content/region-options"
import { sitePath } from "@/lib/site-path"
import { mapZoomTransform } from "@/lib/map-zoom"
import { australianRegionBirds } from "@/lib/australia-region-birds"
import regionOverviews from "@/content/region-overviews.json"

// Label callouts make tiny territories usable; these positions do not alter their geographic boundaries.
const smallTerritories = [
  { id: "australian-capital-territory", label: "ACT", x: 620, y: 493, line: "573.81,460.3 608,514 620,514" },
  { id: "jervis-bay-territory", label: "Jervis Bay", x: 620, y: 427, line: "597.38,458.06 608,448 620,448" },
]

export function AustraliaHomeExplorer({ media, initialRegion, resizable = false }: { media?: ReactNode; initialRegion?: string; resizable?: boolean } = {}) {
  const id = useId()
  const [chosenRegion, setChosenRegion] = useState(initialRegion ?? "")
  const backButton = useRef<HTMLButtonElement>(null)
  const regionSelect = useRef<HTMLSelectElement>(null)
  const focusedRegion = regionOptions.find(region => region.id === chosenRegion)
  const focusedOverview = regionOverviews.regions.find(region => region.id === focusedRegion?.id)
  const birds = australianRegionBirds(focusedRegion?.id)
  // React state remembers the displayed bird. The stable callback avoids unnecessary effect retriggers.
  const [bird, setBird] = useState<BirdProfile>(birds[0] ?? birdData[0])
  const onBirdChange = useCallback((nextBird: BirdProfile) => setBird(nextBird), [])
  // This featured region is one place to look, not a map of the species' entire distribution.
  const highlightedRegion = focusedRegion ?? regionOptions.find(region => region.id === bird.regionSlug)
  const focusedShape = australiaMapStates.find(state => state.regionId === focusedRegion?.id)
  const mapTransform = mapZoomTransform(australiaMapViewBox, focusedShape ? [focusedShape.path] : [], 12)

  function selectRegion(regionId: string) {
    if (regionId && !regionOptions.some(region => region.id === regionId)) return
    setChosenRegion(regionId)
    setBird(australianRegionBirds(regionId)[0] ?? birdData[0])
  }
  const preview = useRegionPreview(selectRegion)
  function previewRegion(event: MouseEvent<SVGAElement | HTMLAnchorElement>, regionId: string) {
    preview.activate(event, regionId)
  }
  function backToAustralia() {
    preview.clear()
    selectRegion("")
    regionSelect.current?.focus({ preventScroll: true })
  }
  useEffect(() => {
    if (!media && focusedRegion) backButton.current?.focus({ preventScroll: true })
  }, [focusedRegion, media])

  const mediaContent = <>
      {media && chosenRegion === initialRegion ? media : <HomepageBirdCarousel key={focusedRegion?.id ?? "australia"} birds={birds} label={focusedRegion ? `${focusedRegion.label} bird photographs` : "Bird photographs"} className="w-full max-w-none" fillPanel={resizable} showBirdPicker={resizable} autoPlay={false} />}
      {!media && <p className="mt-3 text-center text-sm leading-relaxed text-gray-600">{focusedRegion ? `${birds.length} featured birds of ${focusedRegion.label}. Open Info for local places, wider range and sources.` : <>A glimpse of Australia’s <a href="https://birdlife.org.au/about/" target="_blank" rel="noreferrer" className="font-medium text-emerald-800 underline underline-offset-4">800+ bird species<span className="sr-only"> (source: BirdLife Australia; opens in a new tab)</span></a>.</>} Sightings depend on your route and season.</p>}
    </>
  const mapContent = <>
      <div style={resizable ? { height: "var(--discovery-panel-height, auto)" } : undefined} className={`${styles.mapCard} rounded-2xl border border-emerald-100/70 bg-white/60`}>
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 pt-3">
          {focusedRegion && (media ? <Link href="/" className="inline-flex min-h-11 items-center gap-1 rounded text-xs font-medium text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Back to Australia</Link> : <button ref={backButton} type="button" onClick={backToAustralia} className="inline-flex min-h-11 items-center gap-1 rounded text-xs font-medium text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Back to Australia</button>)}
          <h2 className="font-medium text-emerald-950">{focusedRegion?.label ?? "Explore Australia"}</h2>
        </div>
        {/* Source geometry is reused unchanged. useId keeps title/description IDs unique on the page. */}
        <svg viewBox={australiaMapViewBox} role="group" aria-labelledby={`${id}-map-title`} aria-describedby={`${id}-map-description`} className={`${styles.auMap} ${zoomStyles.viewport}`}>
          <title id={`${id}-map-title`}>Explore Australia’s states and territories</title>
          <desc id={`${id}-map-description`}>{focusedRegion ? `Closer view of ${focusedRegion.label}. Use Back to Australia for the whole country.` : "Select a region to zoom into it and preview its birds; Explore opens its guide."} The darker region is one place to look for the bird in the carousel, not its complete range. All nine regions also have larger links below the map. Generalised boundaries; external territories are outside this map.</desc>
          <g className={zoomStyles.layer} style={{ transform: mapTransform }} data-map-zoom={focusedRegion?.id ?? "country"}>
          {australiaMapStates.map(state => {
            const selected = state.regionId === highlightedRegion?.id
            const outline = <path d={state.path} fill={selected ? "#065f46" : "#c5dbd0"} stroke="#6e9582" strokeWidth="1" strokeLinejoin="round" vectorEffect="non-scaling-stroke" fillRule="evenodd" className={`transition-colors group-focus-visible:stroke-emerald-950 group-focus-visible:[stroke-width:3] motion-reduce:transition-none ${selected ? "group-hover:fill-emerald-700 group-focus-visible:fill-emerald-700" : "group-hover:fill-[#9cc4af] group-focus-visible:fill-[#9cc4af]"}`} />
            return state.regionId && (!focusedRegion || selected) ? <a key={state.code} href={sitePath(`/regions/${state.regionId}`)} onKeyDown={event => preview.activateKey(event, state.regionId!, sitePath(`/regions/${state.regionId}`))} onClick={event => previewRegion(event, state.regionId!)} aria-label={`Explore ${state.name}`} className="group outline-none"><title>{state.name}</title>{outline}</a> : <g key={state.code} aria-hidden="true">{outline}</g>
          })}
          {!focusedRegion && australiaMapStates.filter(state => state.shortName).map(state => <text key={state.code} x={state.label[0]} y={state.label[1]} textAnchor="middle" dominantBaseline="middle" fontSize="27" fontWeight="600" fill={state.regionId === highlightedRegion?.id ? "#ffffff" : "#064e3b"} className="pointer-events-none select-none" aria-hidden="true">{state.shortName}</text>)}
          {/* ACT and Jervis Bay receive separate labelled targets because their outlines are very small. */}
          {!focusedRegion && smallTerritories.map(territory => <g key={territory.id}>
            <polyline points={territory.line} fill="none" stroke="#047857" strokeWidth="1.5" aria-hidden="true" />
            <a href={sitePath(`/regions/${territory.id}`)} onKeyDown={event => preview.activateKey(event, territory.id, sitePath(`/regions/${territory.id}`))} onClick={event => previewRegion(event, territory.id)} aria-label={`Explore ${regionOptions.find(region => region.id === territory.id)?.label}`} className="group outline-none">
              <rect x={territory.x} y={territory.y} width="94" height="42" rx="9" fill={highlightedRegion?.id === territory.id ? "#065f46" : "#ffffff"} stroke="#6e9582" strokeWidth="1.5" className="group-hover:stroke-[3] group-focus-visible:stroke-[4]" />
              <text x={territory.x + 47} y={territory.y + 22} textAnchor="middle" dominantBaseline="middle" fontSize="17" fontWeight="600" fill={highlightedRegion?.id === territory.id ? "#ffffff" : "#064e3b"} className="pointer-events-none">{territory.label}</text>
            </a>
          </g>)}
          </g>
        </svg>
        <div className={`${styles.mapFooter} px-4 pb-3`}>
          {!media && <><label htmlFor={`${id}-region`} className="sr-only">Choose an Australian region</label><select ref={regionSelect} id={`${id}-region`} aria-label="Choose an Australian region" value={focusedRegion?.id ?? ""} onChange={event => preview.preview(event.target.value)} className="mb-3 min-h-11 w-full rounded-lg border border-emerald-200 bg-white px-2 text-sm text-emerald-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700"><option value="">All featured Australia birds</option>{regionOptions.map(region => <option key={region.id} value={region.id}>{region.label}</option>)}</select></>}
          {focusedRegion && <Link href={`/regions/${focusedRegion.id}`} className="mb-2 inline-flex min-h-11 items-center gap-2 rounded text-sm font-semibold text-emerald-800 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">Explore {focusedRegion.label}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}
          <p className="mb-2 text-xs leading-5 text-gray-600">Tap a region to preview. Tap it again, or choose Explore, to open its guide.</p>
          <p className="min-h-10 text-sm leading-5 text-gray-600">{highlightedRegion ? <>Highlighted: <Link href={`/regions/${highlightedRegion.id}`} className="font-medium text-emerald-800 underline underline-offset-4">{highlightedRegion.label}</Link> — one region for {bird.commonName}.</> : "Explore a region to discover its birds and plan your route."}</p>
          {/* Keyboard/touch-friendly text alternatives keep all nine region guides reachable. */}
          <details className="group mt-2 rounded-lg border border-emerald-100 bg-emerald-50/50">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-3 text-sm font-medium text-emerald-800 marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 [&::-webkit-details-marker]:hidden">Browse all 9 regions<ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" /></summary>
            <nav aria-label="Australian region guides" className={`${styles.regionList} grid gap-1 border-t border-emerald-100 p-2`}>{regionOptions.map(region => <Link key={region.id} href={`/regions/${region.id}`} className="flex min-h-11 items-center rounded-md px-2 text-sm text-emerald-900 hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">{region.label}</Link>)}</nav>
          </details>
          <p className="mt-2 text-[10px] leading-4 text-gray-500"><a href={australiaMapProvenance.sourceUrl} target="_blank" rel="noreferrer" className="rounded underline underline-offset-2 focus-visible:outline focus-visible:outline-emerald-700">Map: Natural Earth · Public domain<span className="sr-only"> (opens in a new tab)</span></a></p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
        <Button asChild size="lg" className="min-h-12 rounded-full bg-emerald-700 px-5 shadow-sm hover:bg-emerald-800"><Link href="/contact">Plan my trip<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></Button>
        <Link href="/aves-explorer" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-emerald-800 underline-offset-4 hover:underline">Explore the regions<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-gray-500">Journeys in development. Routes, guides and pricing agreed personally.</p>
    </>
  return <BirdDiscoveryContext.Provider value={onBirdChange}>
    {/* The same selected region changes the story, local birds, map and enquiry
        context together. Regional/article pages already supply their own copy. */}
    {!media && focusedRegion && focusedOverview && <section aria-labelledby={`${id}-preview-heading`} className="mx-auto mb-6 max-w-5xl rounded-2xl border border-emerald-100 bg-white/80 p-5 text-left sm:p-6">
      <h2 id={`${id}-preview-heading`} className="text-2xl font-medium tracking-tight text-emerald-950">Birding in {focusedRegion.label}</h2>
      <p className="mt-3 text-sm leading-7 text-gray-600">{focusedOverview.description}</p>
      <p className="mt-2 text-xs leading-6 text-emerald-900"><span className="font-semibold">A starting point: </span>{focusedOverview.gateway}</p>
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2"><Link href={`/regions/${focusedRegion.id}`} className="inline-flex min-h-11 items-center gap-2 rounded text-sm font-semibold text-emerald-800 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">Read the regional guide<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><Link href={`/contact?region=${focusedRegion.id}`} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">Plan a {focusedRegion.label} trip<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
      <p role="status" className="sr-only">{focusedRegion.label} selected. Showing its regional introduction, {birds.length} featured birds and trip-planning link.</p>
    </section>}
    {resizable ? <ResizableDiscoveryPair media={mediaContent} map={mapContent} mapLabel="Explore Australia" /> :
      <div className={styles.layout}><div className={styles.mediaColumn}>{mediaContent}</div><div className={styles.mapColumn}>{mapContent}</div></div>}
  </BirdDiscoveryContext.Provider>
}
