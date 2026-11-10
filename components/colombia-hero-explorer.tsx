/**
 * Connects Colombia bird media to its clickable planning-region map.
 * A changed slide highlights a featured region. Country-page selection zooms to
 * a planning location and updates local media; custom guides keep native links.
 * The dropdown offers the same choices without needing to tap a tiny marker.
 */
"use client"

import { placeInSentence } from "@/lib/place-language"
import ColombiaRegionTargets from "./colombia-region-targets"

import { useRegionPreview } from "./use-region-preview"
import { useColombiaHomeCopy } from "@/components/colombia-home-language"
import { useCallback, useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import { BirdDiscoveryContext } from "@/components/bird-discovery-context"
import styles from "@/components/country-hero-explorer.module.css"
import Link from "next/link"
import MapFeatherMarker from "./map-feather-marker"
import { ArrowRight, Feather } from "lucide-react"
import { useHeaderLandscape } from "./header-landscape-context"
import { MapViewer } from "./map-viewer"
import ColombiaMapArtwork from "@/components/colombia-map-artwork"
import HomepageBirdCarousel from "@/components/homepage-bird-carousel"
import ResizableDiscoveryPair from "@/components/resizable-discovery-pair"
import { birdData, type BirdProfile } from "@/content/birds"
import { colombiaMapMarkers as mapMarkers } from "@/content/colombia-map-markers"
import { colombiaRegionBirds } from "@/content/colombia-regional-birds"
import { regions } from "@/content/regions"


export default function ColombiaHeroExplorer({ media, initialRegion, initialBird, resizable = false }: { media?: ReactNode; initialRegion?: string; initialBird?: BirdProfile; resizable?: boolean } = {}) {
  const { publish } = useHeaderLandscape()
  const localizeHome = useColombiaHomeCopy()

  const [currentBird, setCurrentBird] = useState(initialBird ?? birdData[0])
  // A deliberate region remains focused until Back. In the country overview,
  // each new bird can still highlight one of its sourced planning regions.
  const [chosenRegion, setChosenRegion] = useState(initialRegion ?? "")
  const onBirdChange = useCallback((bird: BirdProfile) => setCurrentBird(bird), [])
  const backRef = useRef<HTMLButtonElement>(null)
  const selectRef = useRef<HTMLSelectElement>(null)
  useEffect(() => { if (chosenRegion && !media) backRef.current?.focus({ preventScroll: true }) }, [chosenRegion, media])
  const birds = chosenRegion ? colombiaRegionBirds(chosenRegion) : birdData
  const chooseRegion = (id: string) => {
    if (!mapMarkers.some(region => region.slug === id)) return
    publish({country:"colombia",regionId:id})
    setChosenRegion(id)
    setCurrentBird(colombiaRegionBirds(id)[0])
  }
  const preview = useRegionPreview(chooseRegion)
  const featuredRegion = mapMarkers.find(region => region.slug === currentBird.regionSlug)
  // Before a manual choice, offer the current bird region as a useful starting point.
  const selectedRegion = chosenRegion || featuredRegion?.slug || mapMarkers[0].slug
  const selectedRegionDetails = mapMarkers.find(region => region.slug === selectedRegion)!
  const focused = Boolean(chosenRegion)
  const localOverview = regions.find(region => region.id === chosenRegion)

  const mediaContent = <>
        {media && chosenRegion === initialRegion ? media : <HomepageBirdCarousel key={chosenRegion || "colombia"} className="w-full max-w-none" birds={birds} label={chosenRegion ? `${selectedRegionDetails.name} bird photographs` : "Colombia bird photographs"} fillPanel={resizable} showBirdPicker={resizable} autoPlay={false} />}
        {!media && <p className="mt-3 text-center text-sm leading-6 text-gray-600">A glimpse of Colombia’s <a href="https://colombia.travel/en/birdwatching" target="_blank" rel="noreferrer" className="font-medium text-emerald-800 underline underline-offset-4">1,900+ bird species<span className="sr-only"> (source: Colombia Travel; opens in a new tab)</span></a>. Sightings depend on your route, habitat and season.</p>}
      </>
  const mapContent = <>
        <div style={resizable ? { height: "var(--discovery-panel-height, auto)" } : undefined} className={`${styles.mapCard} rounded-2xl border border-emerald-100/70 bg-white/60 p-4`}>
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="font-medium text-emerald-950">{focused ? selectedRegionDetails.name : "Explore Colombia"}</h2>
            {focused && (media ? <Link href="/colombia" className="inline-flex min-h-11 items-center text-xs font-semibold text-emerald-800 underline underline-offset-4">Back to Colombia</Link> : <button ref={backRef} type="button" onClick={() => { preview.clear(); publish({country:"colombia"}); setChosenRegion(""); setCurrentBird(birdData[0]); selectRef.current?.focus({ preventScroll: true }) }} className="inline-flex min-h-11 items-center text-xs font-semibold text-emerald-800 underline underline-offset-4">Back to Colombia</button>)}
            <Link href="/aves-explorer" className="inline-flex min-h-9 items-center gap-1 rounded text-xs font-medium text-emerald-800 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">Full map<ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>
          </div>
          <p className="my-2 flex items-center justify-center gap-2 text-center text-sm font-medium text-emerald-900"><Feather size={16} aria-hidden="true" />{selectedRegionDetails.name}</p>
          <MapViewer label="Colombia planning map" credits="AVES planning-region artwork · representative locations, not official ecological boundaries."><div className={`${styles.mapCanvas} ${styles.mapViewport}`}><div data-zoom-artwork="true" className={styles.colombiaArtwork} style={resizable ? { width: "min(100%, calc((var(--discovery-panel-height, 35rem) - 14rem) * 198 / 250))" } : undefined} role="group" aria-label="Colombia map: choose from 11 birding regions">
            <div className={`absolute inset-0 ${styles.pointZoom}`} style={focused ? { transform: `scale(2.4) translate(${50 - selectedRegionDetails.x}%, ${50 - selectedRegionDetails.y}%)` } : undefined}>
            <ColombiaMapArtwork flat selectedRegion={selectedRegionDetails.name} alt="" fill sizes={resizable ? "400px" : "230px"} className="object-contain" />
            <ColombiaRegionTargets onActivate={media ? undefined : (event, id) => preview.activate(event, id)} onActivateKey={media ? undefined : (event, id, href) => preview.activateKey(event, id, href)} />
            {mapMarkers.map(region => {
              // A manual region choice takes priority over the bird's suggestion.
              // Keep its name visible; other labels appear on hover or keyboard focus.
              const selected = region.slug === selectedRegion
              return <Link key={region.slug} href={`/regions/${region.slug}`} onKeyDown={event => { if (!media) preview.activateKey(event, region.slug, `/regions/${region.slug}`) }} onClick={event => { if (!media) preview.activate(event, region.slug) }} aria-label={`Explore ${placeInSentence(region.name)}${selected ? "; selected on the map" : ""}`} aria-current={selected ? "true" : undefined} title={region.name} style={{ left: `${region.x}%`, top: `${region.y}%` }} className={`group absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[10px] font-bold shadow-sm transition-colors hover:z-30 hover:bg-emerald-950 hover:text-white focus-visible:z-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-950 ${selected ? "z-20 border-white bg-emerald-950 text-white ring-2 ring-emerald-700 ring-offset-2" : "z-10 border-emerald-900/30 bg-white/95 text-emerald-950"}`}>
                {selected ? <MapFeatherMarker /> : <span className="h-2 w-2 rounded-full bg-emerald-700" aria-hidden="true"/>}
              </Link>
            })}
            </div>
          </div>
          </div>
          </MapViewer><div className={styles.mapFooter}><div className="flex gap-2">
            <label htmlFor="colombia-hero-region" className="sr-only">Choose a Colombia region</label>
            <select ref={selectRef} id="colombia-hero-region" value={focused ? chosenRegion : ""} onChange={event => { const id = event.target.value; if (media && id) window.location.assign(`/regions/${id}`); else preview.preview(id) }} className="min-h-11 min-w-0 flex-1 rounded-lg border border-emerald-200 bg-white px-2 text-sm text-emerald-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">
              <option value="">Choose a Colombian region</option>
              {mapMarkers.map(region => <option key={region.slug} value={region.slug}>{region.name}</option>)}
            </select>
            <Link href={`/regions/${selectedRegion}`} className="inline-flex min-h-11 shrink-0 items-center gap-1 rounded-lg bg-emerald-50 px-3 text-sm font-semibold text-emerald-900 hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">Explore<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <p className="mt-2 text-xs leading-4 text-gray-600">{media ? "Choose a neighbouring region to open its guide." : "Tap to preview; tap the same region again or choose Explore to open its guide."} {focused ? "Focused planning location: " : "Highlighted: "}{selectedRegionDetails.name}. {focused ? "Location marker, not a precise regional boundary." : "A starting point for this bird."} Not a complete species range.</p></div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link href={chosenRegion ? `/contact?region=${chosenRegion}` : "/contact"} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 font-semibold text-white shadow-sm hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">Plan my trip<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          <span className="max-w-40 text-xs leading-5 text-gray-600">A personal itinerary, shaped around you.</span>
        </div>
        {localOverview && <div className="mt-4 rounded-xl border border-emerald-100 bg-white p-4 text-left"><h3 className="font-medium text-emerald-950">{selectedRegionDetails.name}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{localOverview.description}</p><Link href={`/regions/${chosenRegion}`} className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-emerald-800 underline underline-offset-4">Open the region guide<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>}
      </>
  return localizeHome(<BirdDiscoveryContext.Provider value={onBirdChange}>
    {resizable ? <ResizableDiscoveryPair birdCue={birds.find(bird=>bird.id===currentBird.id) ?? birds[0]} media={mediaContent} map={mapContent} mapLabel="Explore Colombia" /> :
      <div className={styles.layout}><div className={styles.mediaColumn}>{mediaContent}</div><div className={styles.mapColumn}>{mapContent}</div></div>}
  </BirdDiscoveryContext.Provider>)
}
