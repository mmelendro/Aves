/**
 * One selected country drives the summary, destination link and existing bird
 * viewer. The map arrives as server-rendered children, so the whole world's
 * geometry does not become a browser JavaScript dependency.
 */
"use client"

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { destinations } from "@/content/destinations"
import { destinationRegions, getBirdRegionIds, getDestinationRegionBirds } from "@/content/destination-regions"
import type { BirdProfile } from "@/content/birds"
import { australiaMapProvenance } from "@/content/global-australian-map"
import nzMap from "@/content/new-zealand-map.json"
import DestinationCardMedia from "@/components/destination-card-media"
import { DestinationSelectionContext } from "@/components/destination-selection-context"
import { BirdDiscoveryContext } from "@/components/bird-discovery-context"
import { useHeaderLandscape } from "./header-landscape-context"
import { MapViewer } from "./map-viewer"
import DestinationRegionalMap from "@/components/destination-regional-map"
import ResizableDiscoveryPair from "@/components/resizable-discovery-pair"
import { useRegionPreview } from "./use-region-preview"
import styles from "./homepage-destination-explorer.module.css"

export default function HomepageDestinationExplorer({ map, initialCountryId }: { map: ReactNode; initialCountryId?: string }) {
  const { publish } = useHeaderLandscape()
  const [selectedId, setSelectedId] = useState(initialCountryId ?? destinations[0]?.id)
  const [zoomed, setZoomed] = useState(false)
  const [regionId, setRegionId] = useState("")
  const [birdId, setBirdId] = useState("")
  const backButton = useRef<HTMLButtonElement>(null)
  const regionBackButton = useRef<HTMLButtonElement>(null)
  const countryButtons = useRef<Record<string, HTMLButtonElement | null>>({})
  const destination = destinations.find(country => country.id === selectedId) ?? destinations[0]
  const regions = destinationRegions[destination?.id] ?? []
  const region = regions.find(item => item.id === regionId)
  const birds = getDestinationRegionBirds(destination?.id, region?.id)
  const highlightedRegions = region ? [region.id] : getBirdRegionIds(destination?.id, birdId || birds[0]?.id)
  useEffect(()=>{ if(destination) publish({country:destination.id,regionId:region?.id}) },[destination,region,publish])
  const onBirdChange = useCallback((bird: BirdProfile) => setBirdId(bird.id), [])

  const regionPreview = useRegionPreview(id => { setRegionId(id); setBirdId("") })
  const selectDestination = (id: string) => {
    if (!destinations.some(country => country.id === id)) return
    regionPreview.clear()
    setSelectedId(id)
    setRegionId("")
    setBirdId("")
    setZoomed(true)
  }
  const selectRegion = (id: string) => {
    if (id && !regions.some(item => item.id === id)) return
    regionPreview.preview(id)
  }
  const backToWorld = () => {
    regionPreview.clear()
    setZoomed(false)
    setRegionId("")
    setBirdId("")
    countryButtons.current[destination.id]?.focus({ preventScroll: true })
  }
  useEffect(() => {
    // The clicked world shape becomes inert during the transition. Move focus
    // to the new view's persistent exit without scrolling a phone's page.
    if (zoomed) (regionId ? regionBackButton : backButton).current?.focus({ preventScroll: true })
  }, [zoomed, selectedId, regionId])
  if (!destination) return null

  return (
    <DestinationSelectionContext.Provider value={{ selectedId: destination.id, selectDestination, zoomed }}>
    <BirdDiscoveryContext.Provider value={onBirdChange}>
      <div className="mx-auto max-w-6xl">
        <div role="group" aria-label="Choose a country to preview" className="mb-6 flex flex-wrap justify-center gap-2 sm:gap-3">
          {destinations.map(country => (
            <button key={country.id} ref={node => { countryButtons.current[country.id] = node }} type="button" aria-pressed={destination.id === country.id} aria-controls="homepage-country-preview"
              onClick={() => selectDestination(country.id)}
              className={`inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${destination.id === country.id ? "border-emerald-800 bg-emerald-800 text-white" : "border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50"}`}>
              {country.name}
            </button>
          ))}
        </div>
        <div id="homepage-country-preview" className="mb-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-medium tracking-tight text-emerald-950">{region ? <>{region.name}<span className="ml-2 text-sm font-normal text-emerald-800"> · {destination.name}</span></> : destination.name}</h2>
            </div>
            <p className="mt-2 text-sm leading-6 text-gray-600">{region?.description || destination.description}</p>
          </div>
          {/* Selection stays on this page; this native link opens the chosen app. */}
          <a href={region?.href || destination.href} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-3 rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">
            Explore {region?.name || destination.name}<ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <div className={styles.layout}>
          {/* Keep the divider mounted when countries change, preserving its split.
              Only the keyed viewer resets old slides, calls, timers and details. */}
          <ResizableDiscoveryPair mapLabel="Resize world map and bird photographs"
            map={<div className={styles.mapPanel}><MapViewer label="Destination explorer map" credits="AVES planning regions · Natural Earth public-domain geography"><div className={styles.mapStage} data-map-view={zoomed ? "country" : "world"}>
              {/* Both views share one footprint. Inert also removes the hidden
                  world's SVG buttons from keyboard and assistive navigation. */}
              <div className={styles.worldView} inert={zoomed} aria-hidden={zoomed}>{map}</div>
              {zoomed && <figure className={styles.countryView} aria-label={`${destination.name} regional preview`}>
                <div className={styles.countryHeader}>
                  <button ref={backButton} type="button" onClick={backToWorld} className={styles.backButton}><ArrowLeft className="h-4 w-4" aria-hidden="true" />Back to world</button>
                  <h2 className="text-lg font-medium text-emerald-950">Explore {destination.name}</h2>
                </div>
                <div className={styles.regionalCanvas}><DestinationRegionalMap country={destination.id} selectedRegionId={region?.id} highlightedRegionIds={highlightedRegions} onSelectRegion={id => { const item = regions.find(region => region.id === id); if (item) regionPreview.activateButton(id, item.href) }} /></div>
                <figcaption className={styles.countryFooter}>
                  {region && <button ref={regionBackButton} type="button" onClick={() => selectRegion("")} className={styles.backButton}><ArrowLeft className="h-4 w-4" aria-hidden="true" />Back to {destination.name}</button>}
                  <label htmlFor="homepage-region" className="mb-2 block text-xs font-medium text-emerald-900">Choose a region in {destination.name}</label>
                  <select id="homepage-region" value={regionId} onChange={event => selectRegion(event.target.value)} className={styles.regionSelect}>
                    <option value="">All featured {destination.name} birds</option>
                    {regions.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                  </select>
                  {region ? <a href={region.href} className={styles.regionLink}>Explore {region.name}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></a>
                    : <p className="mt-2 text-xs leading-5 text-emerald-900">Tap a region to preview its birds. Tap it again, or choose Explore, to open its guide. Highlights show featured areas for the current bird.</p>}
                  <p className="mt-2 text-[10px] leading-4 text-gray-500">{destination.id === "colombia" ? `AVES planning ${region ? "location focus" : "regions"} · existing map artwork` : <><a className="underline" href={destination.id === "australia" ? australiaMapProvenance.sourceUrl : nzMap.source.url}>Natural Earth</a> · {destination.id === "australia" ? "States and territories · external territories omitted" : "Main islands shown"}</>}. Featured regions, not complete species ranges.</p>
                </figcaption>
              </figure>}
            </div></MapViewer></div>}
            media={<div key={`${destination.id}:${regionId}`} className={styles.mediaPanel}>
              <DestinationCardMedia destination={destination} birds={birds} label={`${region?.name ?? destination.name} bird photographs`} fillPanel />
            </div>} />
        </div>
        <p role="status" className="sr-only">{destination.name}{region ? `, ${region.name}` : ""} selected. Showing {birds.length} featured bird photographs{zoomed ? " and its regional map. Back to world returns to the overview." : " and the world map."}</p>
        <noscript><p className="mt-4 text-sm text-emerald-900">Open a destination: {destinations.map(country => <a key={country.id} href={country.href} className="mr-4 inline-flex min-h-11 items-center underline">{country.name}</a>)}</p></noscript>
      </div>
    </BirdDiscoveryContext.Provider>
    </DestinationSelectionContext.Provider>
  )
}
