"use client"

/** Landscape media shares the page's habitat choice with the bird explorer.
 * Place pins are public reference points, never wildlife sightings or boundaries.
 */
import { useContext, useId, useReducer, useRef, useState } from "react"
import RecoverablePhoto from "./recoverable-photo"
import {CarouselButton,CarouselCount} from "./carousel-controls"
import PhotoCredit from "./photo-credit"
import PhotoZoom from "./photo-zoom"
import { ChevronLeft, ChevronRight, Info, X } from "lucide-react"
import { southIslandPlaces } from "@/content/south-island"
import { southIslandPlaceContexts } from "@/content/south-island-place-media"
import type { SouthIslandEcosystemFilter } from "@/content/south-island-ecosystems"
import { SouthIslandHabitatContext } from "./south-island-habitat-context"
import ExpandableMedia from "./expandable-media"
import NzPlaceIdeas from "./nz-place-ideas"
import SouthIslandHabitatSelect from "./south-island-habitat-select"
import styles from "./south-island-places-explorer.module.css"
import { initialSouthIslandDiscovery, southIslandDiscoveryReducer, southIslandLandscapeSlides as slides } from "@/lib/south-island-discovery"


export default function SouthIslandPlacesExplorer() {
  const shared = useContext(SouthIslandHabitatContext)
  // The reducer fallback also supports rendering this viewer outside the page.
  const [local, dispatch] = useReducer(southIslandDiscoveryReducer, initialSouthIslandDiscovery)
  const habitat = shared?.value ?? local.habitat
  const active = shared?.slideIndex ?? local.slideIndex
  const [infoIndex, setInfo] = useState<number | null>(null)
  const info = infoIndex === active
  const infoButton = useRef<HTMLButtonElement>(null)
  const id = useId()
  const { place, photo } = slides[active]
  const guidance = southIslandPlaces.find(item => item.id === place.id)!

  function showSlide(next: number) {
    if (shared) shared.selectSlide(next)
    else dispatch({ type: "slide", index: next })
    setInfo(null)
  }
  function filter(next: SouthIslandEcosystemFilter) {
    if (shared) shared.select(next)
    else dispatch({ type: "habitat", habitat: next })
    setInfo(null)
  }
  const media = <><ExpandableMedia label="South Island landscapes" kind="place"><section className={styles.card} aria-label="South Island places carousel">
      <div data-place-image className={styles.frame} tabIndex={0} onKeyDown={event => {
        if (event.key === "Escape" && info) { event.preventDefault(); setInfo(null); infoButton.current?.focus() }
        if (event.target !== event.currentTarget) return
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); showSlide(active + (event.key === "ArrowRight" ? 1 : -1)) }
      }}>
        <PhotoZoom key={photo.src} label={place.label}><RecoverablePhoto src={photo.src} alt={photo.alt} fill sizes="(max-width: 623px) 100vw, 55vw" className={styles.image} /></PhotoZoom>
        <div className={styles.top}><span className={styles.counter}><CarouselCount index={active + 1} total={slides.length}/></span>
          <CarouselButton buttonRef={infoButton} tone="overlay" title="Place details & credits" aria-label="Place details & credits" aria-expanded={info} aria-controls={`${id}-info`} onClick={() => setInfo(index => index === active ? null : active)}><Info size={19} aria-hidden="true" /></CarouselButton>
        </div>
        {!info && <div className="absolute inset-x-3 top-16 z-20"><SouthIslandHabitatSelect value={habitat} onChange={filter} label="Habitat for place carousel" /></div>}
        <div className={styles.arrows}><CarouselButton tone="overlay" title="Previous landscape" aria-label="Previous landscape" onClick={() => showSlide(active - 1)}><ChevronLeft aria-hidden="true" /></CarouselButton><CarouselButton tone="overlay" title="Next landscape" aria-label="Next landscape" onClick={() => showSlide(active + 1)}><ChevronRight aria-hidden="true" /></CarouselButton></div>
        <div className={styles.caption} aria-live="polite"><p className="text-xs">South Island places</p><h3 className="text-xl font-medium">{place.label}</h3><p className="mt-1 text-xs">{photo.caption}</p><p className="mt-1 text-xs">Photo {place.photos.findIndex(item=>item.src===photo.src)+1} of {place.photos.length}</p><PhotoCredit key={photo.src} creator={photo.creator} sourceUrl={photo.sourceUrl} licence={photo.licence} licenceUrl={photo.licenceUrl} modifications={photo.modifications}/></div>
        {info && <div id={`${id}-info`} role="region" aria-label={`About ${place.label}`} className={styles.info} data-info-presentation="overlay">
          <div className="flex items-start justify-between gap-3"><h4 className="text-xl font-medium">{place.label}</h4><button type="button" aria-label="Close place details" className={styles.close} onClick={() => { setInfo(null); infoButton.current?.focus() }}><X size={19} aria-hidden="true" /></button></div>
          <p className="mt-2 text-sm font-medium">{guidance.habitat}</p><p className="mt-3 text-sm">{guidance.birds}</p>
          <p className="mt-3 text-sm leading-6">{guidance.description}</p><p className="mt-3 text-sm leading-6">{guidance.balance}</p>
          <a className="mt-4 inline-block text-sm underline" href={guidance.source.url} target="_blank" rel="noreferrer">{guidance.source.title}<span className="sr-only"> (opens in a new tab)</span></a>
          <p className="mt-5 text-xs leading-5">Photo: {photo.creator}. <a href={photo.licenceUrl} target="_blank" rel="noreferrer" className="underline">{photo.licence}</a>. {photo.modifications}</p>
        </div>}
      </div>
    </section></ExpandableMedia><NzPlaceIdeas placeId={`landscape:${photo.src}`} /></>
  return <div className="mx-auto max-w-4xl">{media}<nav aria-label="Choose a South Island landscape" className="mt-4 flex flex-wrap gap-3">{southIslandPlaceContexts.map(item => <button key={item.id} type="button" aria-pressed={place.id === item.id} className="min-h-11 rounded-full border border-emerald-200 px-4 text-sm font-semibold text-emerald-800 aria-pressed:bg-emerald-100" onClick={() => showSlide(slides.findIndex(slide => slide.place.id === item.id))}>{item.label}</button>)}</nav><a href="#south-island-bird-map" className="mt-4 inline-flex min-h-11 items-center font-semibold text-emerald-800 underline">Show these places on the map above</a></div>
}
