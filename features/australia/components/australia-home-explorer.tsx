"use client"

import { guideMapCue } from "@/lib/guide-map-cue"

/*
 * Pairs a clickable map and bird carousel, with resizing opted into by the homepage. The carousel
 * reports its current bird to this parent; the map highlights one associated region, not the
 * bird's complete range. Geographic shapes come from content/australia-map.ts, never logo artwork.
 */

import {useBirdFilters} from "@/components/bird-filter-context"
import {filterConservationBirds,birdFiltersActive} from "@/lib/bird-conservation"
import { useHeaderLandscape } from "./header-landscape-context"
import { useRegionPreview } from "./use-region-preview"
import { useCallback, useEffect, useId, useRef, useState } from "react"
import type { MouseEvent, ReactNode } from "react"
import { BirdDiscoveryContext } from "@/components/bird-discovery-context"
import styles from "@/features/australia/components/country-hero-explorer.module.css"
import zoomStyles from "@/features/australia/components/australia-regional-zoom.module.css"
import { SiteLink as Link } from "@/features/australia/components/site-link"
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react"
import HomepageBirdCarousel from "@/features/australia/components/homepage-bird-carousel"
import ResizableDiscoveryPair from "@/components/resizable-discovery-pair"
import { Button } from "@/components/ui/button"
import { australiaMapProvenance, australiaMapStates, australiaMapViewBox } from "@/features/australia/content/australia-map"
import { birdData, type BirdProfile } from "@/features/australia/content/birds"
import { regionOptions } from "@/features/australia/content/region-options"
import { sitePath } from "@/features/australia/lib/site-path"
import MapFeatherMarker from "./map-feather-marker"
import { Feather } from "lucide-react"
import { MapViewer } from "./map-viewer"
import { mapZoomTransform } from "@/features/australia/lib/map-zoom"
import { australianRegionBirds } from "@/features/australia/lib/australia-region-birds"
import regionOverviews from "@/features/australia/content/region-overviews.json"

export function AustraliaHomeExplorer({ media, initialRegion, resizable = false }: { media?: ReactNode; initialRegion?: string; resizable?: boolean } = {}) {
  const { publish } = useHeaderLandscape()
  const {filters}=useBirdFilters()
  const id = useId()
  const [chosenRegion, setChosenRegion] = useState(initialRegion ?? "")
  const backButton = useRef<HTMLButtonElement>(null)
  const regionSelect = useRef<HTMLSelectElement>(null)
  const focusedRegion = regionOptions.find(region => region.id === chosenRegion)
  const focusedOverview = regionOverviews.regions.find(region => region.id === focusedRegion?.id)
  const birds = filterConservationBirds(australianRegionBirds(focusedRegion?.id),filters)
  // React state remembers the displayed bird. The stable callback avoids unnecessary effect retriggers.
  const [bird, setBird] = useState<BirdProfile>(birds[0] ?? birdData[0])
  const onBirdChange = useCallback((nextBird: BirdProfile) => setBird(nextBird), [])
  // This featured region is one place to look, not a map of the species' entire distribution.
  const cueBird = birds.find(item=>item.id===bird.id) ?? birds[0]
  const highlightedRegion = focusedRegion ?? regionOptions.find(region => region.id === bird.regionSlug)
  const focusedShape = australiaMapStates.find(state => state.regionId === focusedRegion?.id)
  const mapTransform = mapZoomTransform(australiaMapViewBox, focusedShape ? [focusedShape.path] : [], 12)
  const highlightedShape = australiaMapStates.find(state => state.regionId === highlightedRegion?.id)
  const markerSize = 44 / Number(mapTransform.match(/scale\(([^)]+)/)?.[1] || 1)

  function selectRegion(regionId: string) {
    if (regionId && !regionOptions.some(region => region.id === regionId)) return
    publish({country:"australia",regionId:regionId || undefined})
    setChosenRegion(regionId)
    setBird(australianRegionBirds(regionId)[0] ?? birdData[0])
  }
  const preview = useRegionPreview(selectRegion)
  function previewRegion(event: MouseEvent<SVGAElement | HTMLAnchorElement>, regionId: string) {
    if (!media) preview.activate(event, regionId)
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
        {highlightedRegion && <p className="mx-4 my-2 flex items-center justify-center gap-2 text-center text-sm font-medium text-emerald-900"><Feather size={16} aria-hidden="true" />{highlightedRegion.label}</p>}
        {/* Source geometry is reused unchanged. useId keeps title/description IDs unique on the page. */}
        <MapViewer label="Australian regional map" credits={<a href={australiaMapProvenance.sourceUrl} className="underline">Natural Earth · Public domain · Generalised boundaries; external territories not shown</a>}>
        <svg viewBox={australiaMapViewBox} role="group" aria-labelledby={`${id}-map-title`} aria-describedby={`${id}-map-description`} className={`${styles.auMap} ${zoomStyles.viewport}`}>
          <title id={`${id}-map-title`}>Explore Australia’s states and territories</title>
          <desc id={`${id}-map-description`}>{focusedRegion ? `Closer view of ${focusedRegion.label}. Use Back to Australia for the whole country.` : "Select a region to zoom into it and preview its birds; Explore opens its guide."} The darker region is one place to look for the bird in the carousel, not its complete range. All nine regions also have larger links below the map. Generalised boundaries; external territories are outside this map.</desc>
          <g className={zoomStyles.layer} style={{ transform: mapTransform }} data-map-zoom={focusedRegion?.id ?? "country"}>
          {australiaMapStates.map(state => {
            const selected = state.regionId === highlightedRegion?.id
            const outline = <path opacity={birdFiltersActive(filters) && state.regionId && !filterConservationBirds(australianRegionBirds(state.regionId),filters).length ? .25 : 1} d={state.path} fill={selected ? "#065f46" : "#c5dbd0"} stroke="#6e9582" strokeWidth="1" strokeLinejoin="round" vectorEffect="non-scaling-stroke" fillRule="evenodd" className={`transition-colors group-focus-visible:stroke-emerald-950 group-focus-visible:[stroke-width:3] motion-reduce:transition-none ${selected ? "group-hover:fill-emerald-700 group-focus-visible:fill-emerald-700" : "group-hover:fill-[#9cc4af] group-focus-visible:fill-[#9cc4af]"}`} />
            return state.regionId ? <a key={state.code} href={sitePath(`/regions/${state.regionId}`)} onKeyDown={event => { if (!media) preview.activateKey(event, state.regionId!, sitePath(`/regions/${state.regionId}`)) }} onClick={event => previewRegion(event, state.regionId!)} aria-label={`Explore ${state.name}`} className="group outline-none"><title>{state.name}</title>{outline}</a> : <g key={state.code} aria-hidden="true">{outline}</g>
          })}
          {highlightedShape && <svg x={highlightedShape.label[0]-markerSize/2} y={highlightedShape.label[1]-markerSize/2} width={markerSize} height={markerSize} pointerEvents="none"><MapFeatherMarker size={markerSize}/></svg>}
          </g>
        </svg>
        </MapViewer>
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
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2"><Link href={`/regions/${focusedRegion.id}`} className="inline-flex min-h-11 items-center gap-2 rounded text-sm font-semibold text-emerald-800 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">Read the regional guide<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><Link href={`/contact?region=${focusedRegion.id}`} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">Plan your {focusedRegion.label} trip<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
      <p role="status" className="sr-only">{focusedRegion.label} selected. Showing its regional introduction, {birds.length} featured birds and trip-planning link.</p>
    </section>}
    {resizable ? <ResizableDiscoveryPair mapCue={guideMapCue("australia",chosenRegion)} birdCue={cueBird ? {...cueBird,image:sitePath(cueBird.image)} : undefined} media={mediaContent} map={mapContent} mapLabel="Explore Australia" /> :
      <div className={styles.layout}><div className={styles.mediaColumn}>{mediaContent}</div><div className={styles.mapColumn}>{mapContent}</div></div>}
  </BirdDiscoveryContext.Provider>
}
