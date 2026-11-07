/**
 * Shared photo-and-sound carousel used by destination, region and editorial pages.
 * The caller chooses the birds; this file owns slide navigation, audio and details.
 * The portrait frame is 9:16 and capped at 320px wide. object-cover fills that frame,
 * so landscape photos are cropped; each bird imagePosition controls the focal point.
 */
"use client"

import { useState, useEffect, useCallback, useRef, useId, type ButtonHTMLAttributes, type ReactNode, type KeyboardEvent, type TouchEvent } from "react"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Play, Pause, Info, Camera, MapPin, ExternalLink, Volume2, VolumeX, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { sitePath } from "@/lib/site-path"
import { birdData as allBirds, type BirdProfile } from "@/content/birds"

interface HomepageBirdCarouselProps {
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
  birds?: BirdProfile[]
  showBirdPicker?: boolean
  onBirdChange?: (bird: BirdProfile) => void
}

const controlClass = "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/40 bg-slate-950/50 text-white shadow-sm backdrop-blur-md transition-colors hover:bg-slate-950/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:opacity-40 motion-reduce:transition-none"
const linkClass = "text-emerald-800 underline underline-offset-2 hover:text-emerald-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"

// One icon button pattern keeps a spoken label even when its visible tooltip is hidden.
// Native button props carry disabled, pressed and expanded states to assistive tools.
type IconControlProps = ButtonHTMLAttributes<HTMLButtonElement> & { label: string; children: ReactNode; tooltipSide?: "left" | "right" | "bottom" }
function IconControl({ label, children, className, tooltipSide = "bottom", ...props }: IconControlProps) {
  return <span className={cn("group/control relative inline-flex", className)}>
    <button type="button" aria-label={label} className={controlClass} {...props}>{children}</button>
    <span aria-hidden="true" className={cn("pointer-events-none absolute z-30 w-max max-w-40 rounded-md bg-slate-950/95 px-2.5 py-1.5 text-center text-xs leading-4 text-white opacity-0 shadow-lg transition-opacity group-hover/control:opacity-100 group-focus-within/control:opacity-100 motion-reduce:transition-none", tooltipSide === "right" ? "left-full top-1/2 ml-2 -translate-y-1/2" : tooltipSide === "left" ? "right-full top-1/2 mr-2 -translate-y-1/2" : "right-0 top-full mt-2")}>{label}</span>
  </span>
}

export default function HomepageBirdCarousel({
  className,
  autoPlay = true,
  autoPlayInterval = 8000,
  birds = allBirds,
  showBirdPicker = false,
  onBirdChange,
}: HomepageBirdCarouselProps) {
  // State drives what is drawn. Refs hold browser objects or attempt IDs without re-rendering.
  // Slideshow playback and sound playback are deliberately separate controls.
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [imageState, setImageState] = useState<{ image: string; status: "loading" | "loaded" | "error" }>({ image: "", status: "loading" })
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const [audioLoading, setAudioLoading] = useState(false)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const playAttemptRef = useRef(0)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const carouselId = useId()
  // Wrap a stale index safely if a caller replaces the bird list with a shorter one.
  const selectedIndex = birds.length ? currentIndex % birds.length : 0
  const currentBird = birds[selectedIndex]
  const imageStatus = imageState.image === currentBird?.image ? imageState.status : "loading"

  useEffect(() => {
    const image = imageRef.current
    const imagePath = currentBird?.image
    if (!image || imagePath === undefined) return
    // Cached images can finish before hydration delivers Next Image's callback.
    const markLoaded = () => {
      if (!image.complete || image.naturalWidth === 0) return
      setImageState(previous => previous.image === imagePath && previous.status === "loaded" ? previous : { image: imagePath, status: "loaded" })
    }
    image.addEventListener("load", markLoaded)
    markLoaded()
    return () => image.removeEventListener("load", markLoaded)
  }, [currentBird?.id, currentBird?.image])

  // Respect reduced motion on initial load and stop the slideshow if that preference changes.
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => { if (preference.matches) setIsPlaying(false) }
    setIsPlaying(autoPlay && !preference.matches)
    preference.addEventListener("change", updatePreference)
    return () => preference.removeEventListener("change", updatePreference)
  }, [autoPlay])

  // Let the country wrapper update its map; the carousel does not own geographic data.
  useEffect(() => {
    if (currentBird) onBirdChange?.(currentBird)
  }, [currentBird, onBirdChange])

  // Only the selected bird owns an audio element. Changing birds stops playback.
  useEffect(() => {
    const audio = audioRef.current
    setIsAudioPlaying(false)
    setAudioError(false)
    setAudioLoading(false)
    return () => {
      playAttemptRef.current += 1
      audio?.pause()
    }
  }, [currentBird?.id, currentBird?.audioFile])

  const toggleAudio = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || !currentBird?.audioFile) return
    // A sequence number prevents a rejected, older play request changing a newer slide.
    const attempt = ++playAttemptRef.current
    setIsPlaying(false)
    if (!audio.paused || audioLoading) {
      audio.pause()
      setAudioLoading(false)
      setAudioError(false)
      return
    }
    setAudioError(false)
    setAudioLoading(true)
    try {
      if (audio.error) audio.load()
      // Keep play in the click handler so mobile browser activation is retained.
      await audio.play()
    } catch (error) {
      if (audioRef.current !== audio || playAttemptRef.current !== attempt) return
      setAudioError(!(error instanceof DOMException && error.name === "AbortError"))
      setAudioLoading(false)
      setIsAudioPlaying(false)
    }
  }, [currentBird?.audioFile, audioLoading])

  // Every manual navigation stops motion/audio. The picker can keep details open
  // so keyboard focus stays on the same select element after a bird is chosen.
  const goToSlide = useCallback((index: number, keepInfoOpen = false) => {
    if (!birds.length) return
    playAttemptRef.current += 1
    audioRef.current?.pause()
    setIsPlaying(false)
    setIsAudioPlaying(false)
    setAudioLoading(false)
    setCurrentIndex(((index % birds.length) + birds.length) % birds.length)
    setShowInfo(keepInfoOpen)
  }, [birds.length])

  // Schedule one slide at a time; do not advance while loading, listening or reading.
  // Cleanup cancels the old timeout whenever any relevant state changes.
  useEffect(() => {
    if (!isPlaying || birds.length < 2 || imageStatus === "loading" || isAudioPlaying || audioLoading || showInfo) return
    const timer = window.setTimeout(() => setCurrentIndex(index => (index + 1) % birds.length), autoPlayInterval)
    return () => window.clearTimeout(timer)
  }, [isPlaying, birds.length, currentIndex, imageStatus, autoPlayInterval, isAudioPlaying, audioLoading, showInfo])

  // Only intercept arrows when the frame or image-navigation controls have focus.
  // Inputs and links inside the details panel keep their normal keyboard behaviour.
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      setShowInfo(false)
      event.currentTarget.focus()
      return
    }
    const target = event.target as HTMLElement
    if (target !== event.currentTarget && !target.closest("[data-image-navigation]")) return
    if (event.key === "ArrowLeft") goToSlide(selectedIndex - 1)
    else if (event.key === "ArrowRight") goToSlide(selectedIndex + 1)
    else if (event.key === "Home") goToSlide(0)
    else if (event.key === "End") goToSlide(birds.length - 1)
    else return
    event.preventDefault()
  }

  // A mostly horizontal swipe changes the bird; normal vertical scrolling stays available.
  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current
    touchStartRef.current = null
    if (!start || event.changedTouches.length !== 1) return
    const horizontal = event.changedTouches[0].clientX - start.x
    const vertical = event.changedTouches[0].clientY - start.y
    if (Math.abs(horizontal) > 50 && Math.abs(horizontal) > Math.abs(vertical) * 1.5) goToSlide(selectedIndex + (horizontal < 0 ? 1 : -1))
  }

  if (!currentBird) return null
  const speciesSource = currentBird.sources[0]
  const audioButtonText = !currentBird.audioFile ? "Recording not yet available" : audioLoading ? "Loading bird call..." : audioError ? "Retry bird call" : isAudioPlaying ? "Pause bird call" : "Listen to bird call"

  return (
    <div
      className={cn("relative mx-auto w-full min-w-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-4", className, "max-w-[20rem]")}
      role="region" aria-roledescription="carousel" aria-label="Bird photographs" tabIndex={0}
      onKeyDown={handleKeyDown}
      onFocusCapture={event => { if (!(event.target as HTMLElement).closest("[data-slideshow-control]")) setIsPlaying(false) }}
    >
      {/* Load sound only on request. Browser events, rather than a guessed timer, update playback UI. */}
      {currentBird.audioFile && <audio
        key={currentBird.id} ref={audioRef} src={sitePath(currentBird.audioFile)} preload="none" aria-label={`${currentBird.commonName} recording`}
        onPlaying={() => { setIsAudioPlaying(true); setAudioLoading(false); setAudioError(false) }}
        onPause={() => { setIsAudioPlaying(false); setAudioLoading(false) }}
        onEnded={() => { setIsAudioPlaying(false); setAudioLoading(false) }}
        onWaiting={event => { if (!event.currentTarget.paused) setAudioLoading(true) }}
        onError={() => { setAudioError(true); setIsAudioPlaying(false); setAudioLoading(false) }}
      />}
      <Card className="overflow-hidden rounded-2xl border border-emerald-100 shadow-lg">
        <div
          className="relative aspect-[9/16] w-full overflow-hidden bg-stone-100"
          style={{ touchAction: "pan-y pinch-zoom" }}
          onTouchStart={event => { touchStartRef.current = !(event.target as HTMLElement).closest("button, a") && event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null }}
          onTouchEnd={handleTouchEnd} onTouchCancel={() => { touchStartRef.current = null }}
        >
          {/* One edge-to-edge photo, with a per-species focal point for the portrait crop. */}
          {imageStatus !== "error" ? <Image
            key={currentBird.id} ref={imageRef} src={sitePath(currentBird.image || "/placeholder.svg")} alt={currentBird.commonName} fill
            className={cn("object-cover transition-opacity duration-300 motion-reduce:transition-none", imageStatus === "loaded" ? "opacity-100" : "opacity-0")}
            style={{ objectPosition: currentBird.imagePosition || "center" }}
            onLoad={() => setImageState({ image: currentBird.image, status: "loaded" })}
            onError={() => setImageState({ image: currentBird.image, status: "error" })}
            priority={selectedIndex === 0} sizes="(max-width: 352px) calc(100vw - 32px), 320px"
          /> : <div className="flex h-full items-center justify-center gap-2 text-stone-600"><Camera className="h-6 w-6" aria-hidden="true" /><p>Image unavailable</p></div>}
          {imageStatus === "loading" && <div className="absolute inset-0 flex items-center justify-center bg-stone-100 text-sm text-emerald-900" role="status">Loading photograph...</div>}

          {/* Image count describes this curated selection, not a destination species total. */}
          <p className="absolute left-3 top-3 rounded-full border border-white/30 bg-slate-950/60 px-3 py-2 text-xs font-medium tabular-nums text-white backdrop-blur-md" aria-label={`Image ${selectedIndex + 1} of ${birds.length}`}>{selectedIndex + 1} / {birds.length}</p>
          <div className="absolute right-2 top-2 z-20 flex gap-1 sm:right-3 sm:top-3 sm:gap-1.5">
            <IconControl label={isPlaying ? "Pause slideshow" : "Play slideshow"} data-slideshow-control onClick={() => setIsPlaying(playing => !playing)} aria-pressed={isPlaying} disabled={birds.length < 2 || imageStatus === "loading"}>
              {isPlaying ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
            </IconControl>
            <IconControl label={audioButtonText} onClick={toggleAudio} aria-pressed={isAudioPlaying} disabled={!currentBird.audioFile}>
              {audioLoading ? <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" /> : isAudioPlaying ? <VolumeX className="h-4 w-4" aria-hidden="true" /> : <Volume2 className="h-4 w-4" aria-hidden="true" />}
            </IconControl>
            <IconControl label={showInfo ? "Hide species details & credits" : "Species details & credits"} aria-expanded={showInfo} aria-controls={`${carouselId}-info`} onClick={() => setShowInfo(value => !value)}><Info className="h-4 w-4" aria-hidden="true" /></IconControl>
          </div>
          {birds.length > 1 && <div data-image-navigation className="pointer-events-none absolute inset-x-2 top-1/2 z-10 flex -translate-y-1/2 justify-between sm:inset-x-3">
            <IconControl label="Previous image" tooltipSide="right" className="pointer-events-auto" onClick={() => goToSlide(selectedIndex - 1)}><ChevronLeft className="h-5 w-5" aria-hidden="true" /></IconControl>
            <IconControl label="Next image" tooltipSide="left" className="pointer-events-auto" onClick={() => goToSlide(selectedIndex + 1)}><ChevronRight className="h-5 w-5" aria-hidden="true" /></IconControl>
          </div>}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent px-4 pb-3 pt-12 text-white sm:px-5 sm:pb-4">
            <h3 className="text-base font-semibold leading-tight sm:text-lg">{currentBird.commonName}</h3>
            <p className="mt-1 text-xs italic text-white/90 sm:text-sm">{currentBird.scientificName}</p>
            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-white/95"><MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /><span>{currentBird.primaryRegion}</span></p>
          </div>
        </div>
        {(audioError || audioLoading) && <p role="status" className="bg-white px-4 py-2 text-xs text-emerald-950">{audioError ? "The recording could not play. Use the sound button to try again." : "Loading the recording..."}</p>}
        {/* Details are opt-in, keeping the photo prominent while retaining facts and licences. */}
        {showInfo && <div className="bg-white p-3 sm:p-4">
          <div id={`${carouselId}-info`} className="space-y-4 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm">
            <h4 className="font-bold text-emerald-950">About {currentBird.commonName}</h4>
            {showBirdPicker && birds.length > 1 && <div>
              <label htmlFor={`${carouselId}-bird-picker`} className="mb-2 block font-semibold text-emerald-900">Choose a bird · {birds.length} featured species</label>
              <select id={`${carouselId}-bird-picker`} value={selectedIndex} onChange={event => goToSlide(Number(event.target.value), true)} className="min-h-11 w-full rounded-lg border border-emerald-200 bg-white px-3 text-sm text-emerald-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">
                {birds.map((bird, index) => <option key={bird.id} value={index}>{bird.commonName}</option>)}
              </select>
            </div>}
            <div><p className="font-semibold text-emerald-900">Where to find it</p><p className="mt-1 leading-relaxed text-gray-700">{currentBird.localOccurrence || currentBird.distribution}</p></div>
            {currentBird.localOccurrence && currentBird.localOccurrence !== currentBird.distribution && <div><p className="font-semibold text-emerald-900">Wider range</p><p className="mt-1 leading-relaxed text-gray-700">{currentBird.distribution}</p></div>}
            <div><p className="font-semibold text-emerald-900">Habitat</p><p className="mt-1 leading-relaxed text-gray-700">{currentBird.habitat}</p></div>
            <p className="text-xs leading-relaxed text-gray-600">Distribution describes the species’ range, not a guaranteed sighting. Photograph and recording locations may differ.</p>
            {(currentBird.regionHref || currentBird.regionSlug) && <a href={currentBird.regionHref || `/aves-explorer?region=${currentBird.regionSlug}`} className={cn(linkClass, "flex min-h-11 items-center gap-2")}><MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />Explore {currentBird.primaryRegion}</a>}
            {speciesSource && <a href={speciesSource.url} target="_blank" rel="noopener noreferrer" className={cn(linkClass, "flex min-h-11 items-center gap-2")}><ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />Read species guide</a>}
            <details className="border-t border-emerald-200 pt-2">
              <summary className="min-h-11 cursor-pointer rounded py-3 text-sm font-semibold text-emerald-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">Photo & recording credits</summary>
              <div className="space-y-3 pt-2">
                <p className="text-xs leading-relaxed text-gray-600">{currentBird.audioFile ? `Recording: ${currentBird.audioLabel || "Wild bird field recording"}.` : "A recording is not yet available for this bird."}</p>
                <div>
                  <p className="text-xs font-semibold text-gray-600">Photographer</p>
                  {currentBird.photoCredit.teamLink ? <Link href={currentBird.photoCredit.teamLink} className={cn(linkClass, "inline-flex min-h-11 items-center")}>{currentBird.photoCredit.photographer}</Link> : <p className="mt-1 text-gray-800">{currentBird.photoCredit.photographer}</p>}
                  {currentBird.photoCredit.title && <p className="mt-1 text-xs text-gray-600">{currentBird.photoCredit.title}</p>}
                </div>
                {currentBird.photoCredit.reserve && <div>
                  <p className="text-xs font-semibold text-gray-600">Photograph location</p>
                  {currentBird.photoCredit.reserveLink ? <Link href={currentBird.photoCredit.reserveLink} className={cn(linkClass, "inline-flex min-h-11 items-center")}>{currentBird.photoCredit.reserve}</Link> : <p className="mt-1 text-gray-800">{currentBird.photoCredit.reserve}</p>}
                </div>}
                {currentBird.audioFile && <a href={currentBird.audioCreditHref || `/credits#audio-${currentBird.id}`} className={cn(linkClass, "flex min-h-11 items-center")}>Bird recording & licence</a>}
                {currentBird.photoCredit.instagramPost && <a href={currentBird.photoCredit.instagramPost} target="_blank" rel="noopener noreferrer" className={cn(linkClass, "flex min-h-11 items-center gap-2")}><ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />View photograph source</a>}
              </div>
            </details>
          </div>
        </div>}
        {/* Announce manual changes politely; automatic playback must not repeatedly interrupt speech. */}
        <p className="sr-only" role="status" aria-live={isPlaying ? "off" : "polite"}>{currentBird.commonName}, image {selectedIndex + 1} of {birds.length}. {currentBird.localOccurrence || currentBird.distribution}</p>
      </Card>
    </div>
  )
}
