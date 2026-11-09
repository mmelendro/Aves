"use client"

/**
 * One in-photo details panel serves destination, regional and editorial viewers.
 * Keeping these fields together preserves local notes, sources,
 * picker behavior and media rights while the presentation changes.
 */
import { useColombiaHomeCopy } from "@/components/colombia-home-language"
import Link from "next/link"
import { ExternalLink, MapPin, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { BirdProfile } from "@/content/birds"
import styles from "./species-details-panel.module.css"

type Props = {
  id: string
  bird: BirdProfile
  birds: BirdProfile[]
  selectedIndex: number
  showBirdPicker: boolean
  onSelectBird: (index: number) => void
  onClose: () => void
}

const linkClass = "text-emerald-800 underline underline-offset-2 hover:text-emerald-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"

export default function SpeciesDetailsPanel({ id, bird, birds, selectedIndex, showBirdPicker, onSelectBird, onClose }: Props) {
  const localizeHome = useColombiaHomeCopy()

  const speciesSource = bird.sources[0]
  const content = <>
    {showBirdPicker && birds.length > 1 && <div>
      <label htmlFor={`${id}-bird-picker`} className="mb-2 block font-semibold text-emerald-900">Choose a bird · {birds.length} featured species</label>
      <select id={`${id}-bird-picker`} value={selectedIndex} onChange={event => onSelectBird(Number(event.target.value))} className="min-h-11 w-full rounded-lg border border-emerald-200 bg-white px-3 text-sm text-emerald-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">
        {birds.map((bird, index) => <option key={bird.id} value={index}>{bird.commonName}</option>)}
      </select>
    </div>}
    <div><p className="font-semibold text-emerald-900">Where to find it</p><p className="mt-1 leading-relaxed text-gray-700">{bird.localOccurrence || bird.distribution}</p></div>
    {bird.localOccurrence && bird.localOccurrence !== bird.distribution && <div><p className="font-semibold text-emerald-900">Wider range</p><p className="mt-1 leading-relaxed text-gray-700">{bird.distribution}</p></div>}
    <div><p className="font-semibold text-emerald-900">Habitat</p><p className="mt-1 leading-relaxed text-gray-700">{bird.habitat}</p></div>
    <p className="text-xs leading-relaxed text-gray-600">Distribution describes the species’ range, not a guaranteed sighting. Photograph and recording locations may differ.</p>
    {(bird.regionHref || bird.regionSlug) && <a href={bird.regionHref || `/aves-explorer?region=${bird.regionSlug}`} className={cn(linkClass, "flex min-h-11 items-center gap-2")}><MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />Explore {bird.primaryRegion}</a>}
    {speciesSource && <a href={speciesSource.url} target="_blank" rel="noopener noreferrer" className={cn(linkClass, "flex min-h-11 items-center gap-2")}><ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />Read species guide</a>}
    <details className="border-t border-emerald-200 pt-2">
      <summary className="min-h-11 cursor-pointer rounded py-3 text-sm font-semibold text-emerald-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">Photo & recording credits</summary>
      <div className="space-y-3 pt-2">
        <p className="text-xs leading-relaxed text-gray-600">{bird.audioFile ? `Recording: ${bird.audioLabel || "Wild bird field recording"}.` : "A recording is not yet available for this bird."}</p>
        <div>
          <p className="text-xs font-semibold text-gray-600">Photographer</p>
          {bird.photoCredit.teamLink ? <Link href={bird.photoCredit.teamLink} className={cn(linkClass, "inline-flex min-h-11 items-center")}>{bird.photoCredit.photographer}</Link> : <p className="mt-1 text-gray-800">{bird.photoCredit.photographer}</p>}
          {bird.photoCredit.title && <p className="mt-1 text-xs text-gray-600">{bird.photoCredit.title}</p>}
        </div>
        {bird.photoCredit.reserve && <div>
          <p className="text-xs font-semibold text-gray-600">Photograph location</p>
          {bird.photoCredit.reserveLink ? <Link href={bird.photoCredit.reserveLink} className={cn(linkClass, "inline-flex min-h-11 items-center")}>{bird.photoCredit.reserve}</Link> : <p className="mt-1 text-gray-800">{bird.photoCredit.reserve}</p>}
        </div>}
        {bird.audioFile && <a href={bird.audioCreditHref || `/credits#audio-${bird.id}`} className={cn(linkClass, "flex min-h-11 items-center")}>Bird recording & licence</a>}
        {bird.photoCredit.instagramPost && <a href={bird.photoCredit.instagramPost} target="_blank" rel="noopener noreferrer" className={cn(linkClass, "flex min-h-11 items-center gap-2")}><ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />View photograph source</a>}
      </div>
    </details>
  </>

  return localizeHome(<section id={id} data-species-overlay aria-labelledby={`${id}-title`} className={styles.overlay}>
    <div className={styles.header}>
      <div className="min-w-0">
        <h3 id={`${id}-title`} className="text-base font-semibold leading-tight text-emerald-950 sm:text-lg">{bird.commonName}</h3>
        <p className="mt-1 text-xs italic text-gray-700">{bird.scientificName}</p>
      </div>
      <button type="button" aria-label="Close species details" onClick={onClose} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-emerald-950 hover:bg-emerald-100/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"><X className="h-5 w-5" aria-hidden="true" /></button>
    </div>
    {/* This nonmodal scroll area supports keyboard scrolling and ordinary Tab
        navigation. It never captures focus or locks the document scroll. */}
    <div role="group" aria-label="Scrollable species information" tabIndex={0} className={`${styles.body} space-y-4 text-sm`}>{content}</div>
  </section>)
}
