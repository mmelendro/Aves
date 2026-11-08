/**
 * Connects Colombia bird media to its clickable planning-region map.
 * A changed slide highlights a featured region; selecting a map link opens a region
 * page. The dropdown offers the same navigation without needing to tap a tiny marker.
 */
"use client"

import { useCallback, useState } from "react"
import type { ReactNode } from "react"
import { BirdDiscoveryContext } from "@/components/bird-discovery-context"
import styles from "@/components/country-hero-explorer.module.css"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import ColombiaMapArtwork from "@/components/colombia-map-artwork"
import HomepageBirdCarousel from "@/components/homepage-bird-carousel"
import ResizableDiscoveryPair from "@/components/resizable-discovery-pair"
import { birdData, type BirdProfile } from "@/content/birds"
import { colombiaMapMarkers as mapMarkers } from "@/content/colombia-map-markers"


export default function ColombiaHeroExplorer({ media, initialRegion, initialBird, resizable = false }: { media?: ReactNode; initialRegion?: string; initialBird?: BirdProfile; resizable?: boolean } = {}) {
  const [currentBird, setCurrentBird] = useState(initialBird ?? birdData[0])
  // Manual choices remain while viewing a bird; the resizable homepage follows
  // the next bird, while focused regional/article pages retain their region.
  const [chosenRegion, setChosenRegion] = useState(initialRegion ?? "")
  // The homepage follows a newly chosen bird. Other page types retain their
  // deliberate region focus; choosing a region without changing birds still works.
  const onBirdChange = useCallback((bird: BirdProfile) => {
    setCurrentBird(bird)
    if (resizable) setChosenRegion("")
  }, [resizable])
  const featuredRegion = mapMarkers.find(region => region.slug === currentBird.regionSlug)
  // Before a manual choice, offer the current bird region as a useful starting point.
  const selectedRegion = chosenRegion || featuredRegion?.slug || mapMarkers[0].slug
  const selectedRegionDetails = mapMarkers.find(region => region.slug === selectedRegion)!

  const mediaContent = <>
        {media ?? <HomepageBirdCarousel className="w-full max-w-none" birds={birdData} infoPresentation={resizable ? "overlay" : "below"} fillPanel={resizable} showBirdPicker={resizable} autoPlay={false} />}
        {!media && <p className="mt-3 text-center text-sm leading-6 text-gray-600">A glimpse of Colombia’s <a href="https://colombia.travel/en/birdwatching" target="_blank" rel="noreferrer" className="font-medium text-emerald-800 underline underline-offset-4">1,900+ bird species<span className="sr-only"> (source: Colombia Travel; opens in a new tab)</span></a>. Sightings depend on your route, habitat and season.</p>}
      </>
  const mapContent = <>
        <div style={resizable ? { height: "var(--discovery-panel-height, auto)" } : undefined} className={`${styles.mapCard} rounded-2xl border border-emerald-100/70 bg-white/60 p-4`}>
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="font-medium text-emerald-950">Explore Colombia</h2>
            <Link href="/aves-explorer" className="inline-flex min-h-9 items-center gap-1 rounded text-xs font-medium text-emerald-800 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">Full map<ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>
          </div>
          <div className={styles.mapCanvas}><div className={styles.colombiaArtwork} style={resizable ? { width: "min(100%, calc((var(--discovery-panel-height, 35rem) - 14rem) * 198 / 250))" } : undefined} role="group" aria-label="Colombia map: choose from 11 birding regions">
            <ColombiaMapArtwork alt="" fill sizes={resizable ? "400px" : "230px"} className="object-contain" />
            {mapMarkers.map((region, index) => {
              // A manual region choice takes priority over the bird's suggestion.
              // Keep its name visible; other labels appear on hover or keyboard focus.
              const selected = region.slug === selectedRegion
              const labelPosition = region.x < 25 ? "left-0 after:left-2" : region.x > 65 ? "right-0 after:right-2" : "left-1/2 -translate-x-1/2 after:left-1/2 after:-translate-x-1/2"
              return <Link key={region.slug} href={`/regions/${region.slug}`} aria-label={`Explore ${region.name}${selected ? "; selected on the map" : ""}`} aria-current={selected ? "true" : undefined} title={region.name} style={{ left: `${region.x}%`, top: `${region.y}%` }} className={`group absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[10px] font-bold shadow-sm transition-colors hover:z-30 hover:bg-emerald-950 hover:text-white focus-visible:z-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-950 ${selected ? "z-20 border-white bg-emerald-950 text-white ring-2 ring-emerald-700 ring-offset-2" : "z-10 border-emerald-900/30 bg-white/95 text-emerald-950"}`}>
                <span aria-hidden="true">{index + 1}</span>
                <span aria-hidden="true" className={`pointer-events-none absolute bottom-full mb-2 w-max max-w-40 rounded-md bg-emerald-950 px-2 py-1.5 text-center text-xs font-medium leading-4 text-white shadow after:absolute after:top-full after:h-2 after:w-2 after:-translate-y-1/2 after:rotate-45 after:bg-emerald-950 after:content-[''] group-hover:opacity-100 group-focus-visible:opacity-100 ${labelPosition} ${selected ? "opacity-100" : "opacity-0"}`}>{region.name}</span>
              </Link>
            })}
          </div>
          </div>
          <div className={styles.mapFooter}><div className="flex gap-2">
            <label htmlFor="colombia-hero-region" className="sr-only">Choose a Colombia region</label>
            <select id="colombia-hero-region" value={selectedRegion} onChange={event => setChosenRegion(event.target.value)} className="min-h-11 min-w-0 flex-1 rounded-lg border border-emerald-200 bg-white px-2 text-sm text-emerald-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">
              {mapMarkers.map((region, index) => <option key={region.slug} value={region.slug}>{index + 1}. {region.name}</option>)}
            </select>
            <Link href={`/regions/${selectedRegion}`} className="inline-flex min-h-11 shrink-0 items-center gap-1 rounded-lg bg-emerald-50 px-3 text-sm font-semibold text-emerald-900 hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">Explore<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <p className="mt-2 text-xs leading-4 text-gray-600">Selected: {selectedRegionDetails.name}. {chosenRegion ? "Explore its birds and habitats." : featuredRegion ? "A starting point for this bird." : "Explore its birds and habitats."} Planning regions, not a complete species range.</p></div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 font-semibold text-white shadow-sm hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">Plan my trip<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          <span className="max-w-40 text-xs leading-5 text-gray-600">A personal itinerary, shaped around you.</span>
        </div>
      </>
  return <BirdDiscoveryContext.Provider value={onBirdChange}>
    {resizable ? <ResizableDiscoveryPair media={mediaContent} map={mapContent} mapLabel="Explore Colombia" /> :
      <div className={styles.layout}><div className={styles.mediaColumn}>{mediaContent}</div><div className={styles.mapColumn}>{mapContent}</div></div>}
  </BirdDiscoveryContext.Provider>
}
