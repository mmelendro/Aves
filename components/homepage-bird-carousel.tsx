/**
 * Shared photo-and-sound carousel used by destination, region and editorial pages.
 * The caller chooses the birds; this file owns slide navigation, audio and details.
 * Every surface uses the same compact 3:2 album frame. Contained photographs
 * retain the complete bird, including its eyes, at every viewport size.
 */
"use client"
import {BirdWishButton} from "@/components/bird-wish-button"

import {CarouselButton,CarouselCount} from "./carousel-controls"
import PhotoCredit from "./photo-credit"
import CulturalNameContext from "./cultural-name-context"
import BirdStory from "./bird-story"
import {useMediaPreferences} from "./media-preferences"
import BirdFilterControls from "@/components/bird-filter-controls"
import BirdConservationLabel from "@/components/bird-conservation-label"
import {useBirdFilters} from "@/components/bird-filter-context"
import {filterConservationBirds} from "@/lib/bird-conservation"
import { useSharedBirdAudio } from "./use-shared-bird-audio"
import { FollowBirdCalls, type FollowCallStatus } from "@/lib/follow-bird-calls"
import { playForegroundMedia } from "@/lib/media-focus"
import { useColombiaHomeCopy } from "@/components/colombia-home-language"
import { FieldGuideContext } from "./field-guide-context"
import { useState, useContext, useEffect, useCallback, useRef, useId, type Ref, type ButtonHTMLAttributes, type ReactNode, type KeyboardEvent, type TouchEvent } from "react"
import { BirdDiscoveryContext } from "@/components/bird-discovery-context"
import SpeciesDetailsPanel from "@/components/species-details-panel"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Play, Pause, Info, Camera, MapPin, Volume2, VolumeX, Loader2, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "./responsive-photo"
import PhotoZoom from "./photo-zoom"
import { sitePath } from "@/lib/site-path"
import { coverFocalPosition } from "@/lib/cover-focal-position"
import { birdData as allBirds, type BirdProfile } from "@/content/birds"

interface HomepageBirdCarouselProps {
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
  birds?: BirdProfile[]
  showBirdPicker?: boolean
  onBirdChange?: (bird: BirdProfile) => void
  variant?: "default" | "destination-card"
  label?: string
  priority?: boolean
  fillPanel?: boolean
  selection?: { isSelected: (bird: BirdProfile) => boolean; onToggle: (bird: BirdProfile) => void }
  imageTools?: ReactNode
  countryId?: string
}



// One icon button pattern keeps a spoken label even when its visible tooltip is hidden.
// Native button props carry disabled, pressed and expanded states to assistive tools.
type IconControlProps = ButtonHTMLAttributes<HTMLButtonElement> & { label: string; children: ReactNode; buttonClassName?: string; tooltipSide?: "left" | "right" | "bottom"; buttonRef?: Ref<HTMLButtonElement> }
function IconControl({ label, children, className, buttonClassName, tooltipSide = "bottom", buttonRef, ...props }: IconControlProps) {
  return <span className={cn("group/control relative inline-flex", className)}>
    <CarouselButton buttonRef={buttonRef} tone="overlay" aria-label={label} className={buttonClassName} {...props}>{children}</CarouselButton>
    <span aria-hidden="true" className={cn("pointer-events-none absolute z-30 w-max max-w-40 rounded-md bg-slate-950/95 px-2.5 py-1.5 text-center text-xs leading-4 text-white opacity-0 shadow-lg transition-opacity group-hover/control:opacity-100 group-focus-within/control:opacity-100 motion-reduce:transition-none", tooltipSide === "right" ? "left-full top-1/2 ml-2 -translate-y-1/2" : tooltipSide === "left" ? "right-full top-1/2 mr-2 -translate-y-1/2" : "right-0 top-full mt-2")}>{label}</span>
  </span>
}

export default function HomepageBirdCarousel({
  className,
  autoPlay = true,
  autoPlayInterval = 8000,
  birds: suppliedBirds = allBirds,
  showBirdPicker = false,
  onBirdChange,
  variant = "default",
  label = "Bird photographs",
  priority = true,
  fillPanel = false,
  selection,
  imageTools,
  countryId = "colombia",
}: HomepageBirdCarouselProps) {
  const {filters}=useBirdFilters()
  const {lowBandwidth}=useMediaPreferences()
  const birds=filterConservationBirds(suppliedBirds,filters,countryId)
  const localizeHome = useColombiaHomeCopy()

  const isDestinationCard = variant === "destination-card"
  // State drives what is drawn. Refs hold browser objects or attempt IDs without re-rendering.
  // Slideshow playback and sound playback are deliberately separate controls.
  const mediaVisible = useContext(FieldGuideContext)?.mediaVisible !== false
  const reportBirdToMap = useContext(BirdDiscoveryContext)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [imageState, setImageState] = useState<{ image: string; status: "loading" | "loaded" | "error" }>({ image: "", status: "loading" })
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const [audioLoading, setAudioLoading] = useState(false)
  const [followStatus, setFollowStatus] = useState<FollowCallStatus>("off")
  const follow = useRef<FollowBirdCalls | null>(null)
  if (!follow.current) follow.current = new FollowBirdCalls(audio => playForegroundMedia(audio as HTMLAudioElement), setFollowStatus)
  const infoButtonRef = useRef<HTMLButtonElement | null>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const playAttemptRef = useRef(0)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const carouselId = useId()
  // Wrap a stale index safely if a caller replaces the bird list with a shorter one.
  const selectedIndex = birds.length ? currentIndex % birds.length : 0
  const currentBird = birds[selectedIndex]
  const sharedAudio = useSharedBirdAudio(currentBird)
  const callPlaying = sharedAudio.available ? sharedAudio.playing : isAudioPlaying
  const callsFollow = sharedAudio.available ? sharedAudio.following : follow.current.enabled
  const renderPhoto = mediaVisible || imageState.image === currentBird?.image
  const imageStatus = imageState.image === currentBird?.image ? imageState.status : "loading"

  useEffect(() => {
    const image = imageRef.current
    const imagePath = currentBird?.image
    if (!image || imagePath === undefined) return
    // Observe the actual photo box, so both divider drags and window changes keep
    // the authored bird focal point centred without resizing the surrounding card.
    const centreFocalPoint = () => {
      const frame = image.getBoundingClientRect()
      image.style.objectPosition = coverFocalPosition({
        frameWidth: frame.width, frameHeight: frame.height,
        imageWidth: image.naturalWidth, imageHeight: image.naturalHeight,
        position: currentBird?.imagePosition || "center",
        fit: getComputedStyle(image).objectFit === "contain" ? "contain" : "cover",
      })
    }
    // Cached images can finish before hydration delivers Next Image's callback.
    const markLoaded = () => {
      if (!image.complete || image.naturalWidth === 0) return
      centreFocalPoint()
      setImageState(previous => previous.image === imagePath && previous.status === "loaded" ? previous : { image: imagePath, status: "loaded" })
    }
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(centreFocalPoint)
    observer?.observe(image)
    if (!observer) window.addEventListener("resize", centreFocalPoint)
    image.addEventListener("load", markLoaded)
    markLoaded()
    return () => {
      observer?.disconnect()
      window.removeEventListener("resize", centreFocalPoint)
      image.removeEventListener("load", markLoaded)
    }
  }, [currentBird?.id, currentBird?.image, currentBird?.imagePosition, renderPhoto])

  // Respect reduced motion on initial load and stop the slideshow if that preference changes.
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => { if (preference.matches) setIsPlaying(false) }
    setIsPlaying(autoPlay && !lowBandwidth && !preference.matches)
    preference.addEventListener("change", updatePreference)
    return () => preference.removeEventListener("change", updatePreference)
  }, [autoPlay,lowBandwidth])

  // Let the country wrapper update its map; the carousel does not own geographic data.
  useEffect(() => {
    if (currentBird) {
      onBirdChange?.(currentBird)
      if (reportBirdToMap !== onBirdChange) reportBirdToMap?.(currentBird)
    }
  }, [currentBird, onBirdChange, reportBirdToMap])

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

  useEffect(() => {
    follow.current?.select(audioRef.current)
  }, [currentBird?.id, currentBird?.audioFile])
  useEffect(() => {
    const stopWhenHidden = () => { if (document.hidden) follow.current?.stop() }
    const stopForOtherMedia = (event: Event) => {
      const target = event.target
      if (target instanceof HTMLMediaElement && target !== audioRef.current && !target.hasAttribute("data-aves-ambience")) follow.current?.stop()
    }
    document.addEventListener("visibilitychange", stopWhenHidden)
    document.addEventListener("play", stopForOtherMedia, true)
    return () => {
      document.removeEventListener("visibilitychange", stopWhenHidden)
      document.removeEventListener("play", stopForOtherMedia, true)
      follow.current?.dispose()
    }
  }, [])

  const toggleAudio = useCallback(async () => {
    if (sharedAudio.available) { setIsPlaying(false); sharedAudio.toggle(); return }
    if (follow.current?.enabled) { follow.current.stop(); return }
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
      await playForegroundMedia(audio)
    } catch (error) {
      if (audioRef.current !== audio || playAttemptRef.current !== attempt) return
      setAudioError(!(error instanceof DOMException && error.name === "AbortError"))
      setAudioLoading(false)
      setIsAudioPlaying(false)
    }
  }, [currentBird?.audioFile, audioLoading, sharedAudio])

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
    if (!isPlaying || birds.length < 2 || imageStatus === "loading" || callPlaying || audioLoading || showInfo) return
    const timer = window.setTimeout(() => setCurrentIndex(index => (index + 1) % birds.length), autoPlayInterval)
    return () => window.clearTimeout(timer)
  }, [isPlaying, birds.length, currentIndex, imageStatus, autoPlayInterval, callPlaying, audioLoading, showInfo])

  function closeInfo() {
    setShowInfo(false)
    infoButtonRef.current?.focus({ preventScroll: true })
  }

  // Only intercept arrows when the frame or image-navigation controls have focus.
  // Inputs and links inside the details panel keep their normal keyboard behaviour.
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      if (showInfo) {
        event.preventDefault()
        event.stopPropagation()
        closeInfo()
      } else {
        event.currentTarget.focus()
      }
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

  if (!currentBird) return <div className="min-h-48 rounded-2xl border border-emerald-100 bg-white p-4 text-emerald-950" role="region" aria-label={label}>
    <BirdFilterControls align="left"/><p className="mt-4" role="status">No featured birds match these filters in this view.</p><p className="mt-2 text-sm">Change your bird filters, habitat or region. This selection is not a complete checklist.</p>
  </div>
  const audioButtonText = !currentBird.audioFile ? "Recording not yet available" : audioLoading ? "Loading bird call..." : audioError ? "Retry bird call" : callPlaying ? "Pause bird call" : "Listen to bird call"
  const infoPanel = showInfo ? <SpeciesDetailsPanel id={`${carouselId}-info`} bird={currentBird} birds={birds}
    selectedIndex={selectedIndex} showBirdPicker={showBirdPicker}
    onSelectBird={index => goToSlide(index, true)} onClose={closeInfo} /> : null


  return localizeHome((
    <div
      className={cn("relative mx-auto w-full min-w-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-4", className, "max-w-3xl")}
      data-info-presentation="overlay" role="region" aria-roledescription="carousel" aria-label={label} tabIndex={0}
      onKeyDown={handleKeyDown}
      onFocusCapture={event => { if (!(event.target as HTMLElement).closest("[data-slideshow-control]")) setIsPlaying(false) }}
    >
      {/* Load sound only on request. Browser events, rather than a guessed timer, update playback UI. */}
      {!sharedAudio.available && currentBird.audioFile && <audio
        key={currentBird.id} ref={audioRef} src={sitePath(currentBird.audioFile)} preload="none" data-aves-bird-call aria-label={`${currentBird.commonName} recording`}
        onPlay={event => {
          // Several viewers can share a page. Starting one call stops the others
          // without a separate global listener.
          const playing = event.currentTarget
          document.querySelectorAll<HTMLMediaElement>("audio:not([data-aves-ambience]),video").forEach(audio => {
            if (audio !== playing) audio.pause()
          })
        }}
        onPlaying={() => { setIsAudioPlaying(true); setAudioLoading(false); setAudioError(false) }}
        onPause={() => { setIsAudioPlaying(false); setAudioLoading(false) }}
        onEnded={() => { setIsAudioPlaying(false); setAudioLoading(false); follow.current?.ended() }}
        onWaiting={event => { if (!event.currentTarget.paused) setAudioLoading(true) }}
        onError={() => { follow.current?.stop(); setAudioError(true); setIsAudioPlaying(false); setAudioLoading(false) }}
      />}
      <Card className={cn("overflow-hidden rounded-2xl border border-emerald-100 shadow-lg", isDestinationCard && "rounded-none border-0 shadow-none")}>
        <div data-carousel-image data-has-bird-selection={selection ? "true" : undefined}
          className={cn("relative w-full overflow-hidden bg-stone-100", "aspect-[3/2]")}
          style={{ containerType: "size", touchAction: "pan-y pinch-zoom",  }}
          onTouchStart={event => { touchStartRef.current = !(event.target as HTMLElement).closest("button, a, input, select, textarea, [data-species-overlay]") && event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null }}
          onTouchEnd={handleTouchEnd} onTouchCancel={() => { touchStartRef.current = null }}
        >
          {/* One edge-to-edge photo, with a per-species focal point for the portrait crop. */}
          {renderPhoto && imageStatus !== "error" ? <PhotoZoom key={currentBird.id} label={currentBird.commonName}><Image
            key={currentBird.id} ref={imageRef} src={sitePath(currentBird.image || "/placeholder.svg")} alt={currentBird.commonName} fill
            className={cn("object-contain transition-opacity duration-300 motion-reduce:transition-none", imageStatus === "loaded" ? "opacity-100" : "opacity-0")}
            style={{ objectPosition: "center" }}
            onLoad={() => setImageState({ image: currentBird.image, status: "loaded" })}
            onError={() => setImageState({ image: currentBird.image, status: "error" })}
            priority={priority && selectedIndex === 0}
            sizes={fillPanel ? "(max-width: 703px) 100vw, (max-width: 1279px) 60vw, 704px" : isDestinationCard ? "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 400px" : "(max-width: 767px) 100vw, 768px"}
          /></PhotoZoom> : <div className="flex h-full items-center justify-center gap-2 text-stone-600"><Camera className="h-6 w-6" aria-hidden="true" /><p>{renderPhoto ? "Image unavailable" : "Turn to the birds to load this photograph."}</p></div>}
          {renderPhoto && imageStatus === "loading" && <div className="absolute inset-0 flex items-center justify-center bg-stone-100 text-sm text-emerald-900" role="status">Loading photograph...</div>}

          {/* Image count describes this curated selection, not a destination species total. */}
          <p className="absolute left-3 top-3 rounded-full border border-white/30 bg-slate-950/60 px-3 py-2 text-xs font-medium tabular-nums text-white backdrop-blur-md" aria-label={`Image ${selectedIndex + 1} of ${birds.length}`}><CarouselCount index={selectedIndex+1} total={birds.length}/></p>
          {!selection && (currentBird.countryId ?? countryId) === "australia" && <div className="absolute left-3 top-16 z-20"><BirdWishButton id={currentBird.id} name={currentBird.commonName} country="australia" /></div>}
          {selection && <IconControl label={`${selection.isSelected(currentBird) ? "Remove" : "Add"} ${currentBird.commonName} ${selection.isSelected(currentBird) ? "from" : "to"} bird wish list`} aria-pressed={selection.isSelected(currentBird)} onClick={() => selection.onToggle(currentBird)} className="absolute left-3 top-16 z-20" buttonClassName={selection.isSelected(currentBird) ? "border-emerald-100 bg-emerald-700/90" : undefined}><Heart className="h-4 w-4" fill={selection.isSelected(currentBird) ? "currentColor" : "none"} aria-hidden="true" /></IconControl>}
          <div className="absolute right-2 top-2 z-20 flex gap-1 sm:right-3 sm:top-3 sm:gap-1.5">
            <IconControl label={isPlaying ? "Pause slideshow" : "Play slideshow"} data-slideshow-control onClick={() => {
              // A requested slideshow returns to the photo rather than showing a
              // playing state while the open overlay deliberately pauses its timer.
              if (showInfo) { setShowInfo(false); setIsPlaying(true) }
              else setIsPlaying(playing => !playing)
            }} aria-pressed={isPlaying} disabled={birds.length < 2 || imageStatus === "loading"}>
              {isPlaying ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
            </IconControl>
            {/* A quiet green halo advertises a real recording; a brighter fill marks active playback.
                buttonClassName styles the button itself, while className still positions its wrapper. */}
            <IconControl label={audioButtonText} onClick={toggleAudio} aria-pressed={callPlaying} disabled={!currentBird.audioFile}
              buttonClassName={currentBird.audioFile ? cn("border-emerald-200/80 bg-emerald-950/80 text-emerald-50 shadow-[0_0_0_3px_rgba(167,243,208,0.14)] hover:bg-emerald-900/90", callPlaying && "border-emerald-100 bg-emerald-700/95 text-white shadow-[0_0_0_3px_rgba(167,243,208,0.24)] hover:bg-emerald-700") : undefined}>
              {audioLoading ? <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" /> : callPlaying ? <VolumeX className="h-4 w-4" aria-hidden="true" /> : <Volume2 className="h-4 w-4" aria-hidden="true" />}
            </IconControl>
            <IconControl buttonRef={infoButtonRef} label={showInfo ? "Hide species details & credits" : "Species details & credits"} aria-expanded={showInfo} aria-controls={`${carouselId}-info`} onClick={() => { if (showInfo) closeInfo(); else { setIsPlaying(false); setShowInfo(true) } }}><Info className="h-4 w-4" aria-hidden="true" /></IconControl>
          </div>
          {imageTools && !showInfo && <div className="absolute inset-x-3 top-28 z-20">{imageTools}</div>}
          {infoPanel}
          {birds.length > 1 && <div data-image-navigation className={cn("pointer-events-none absolute inset-x-2 z-10 flex justify-between sm:inset-x-3", showInfo ? "bottom-3" : "top-1/2 -translate-y-1/2")}>
            <IconControl label="Previous image" tooltipSide="right" className="pointer-events-auto" onClick={() => goToSlide(selectedIndex - 1)}><ChevronLeft className="h-5 w-5" aria-hidden="true" /></IconControl>
            <IconControl label="Next image" tooltipSide="left" className="pointer-events-auto" onClick={() => goToSlide(selectedIndex + 1)}><ChevronRight className="h-5 w-5" aria-hidden="true" /></IconControl>
          </div>}

        </div>
          {!showInfo && <div className="bg-emerald-950 px-4 py-3 text-white sm:px-5">
            <h3 className="text-base font-semibold leading-tight sm:text-lg">{currentBird.commonName}</h3>
            <p className="mt-1 text-xs italic text-white/90 sm:text-sm">{currentBird.scientificName}</p>
            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-white/95"><MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /><span>{currentBird.primaryRegion}</span></p>
            <BirdConservationLabel bird={currentBird}/>
          </div>}
        <nav aria-label="Choose a bird photograph" className="flex gap-2 overflow-x-auto border-t border-emerald-100 bg-white p-3">
          {birds.map((bird,index)=><button key={bird.id} type="button" aria-label={`Show ${bird.commonName}`} aria-pressed={index===selectedIndex} onClick={()=>goToSlide(index)} className={cn("w-16 shrink-0 rounded-lg p-1 text-[10px] leading-4 text-emerald-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700",index===selectedIndex?"bg-emerald-100 ring-2 ring-inset ring-emerald-700":"hover:bg-emerald-50")}><Image src={sitePath(bird.image)} alt="" width={64} height={64} sizes="64px" className="h-14 w-14 rounded-md bg-stone-50 object-contain"/><span className="mt-1 line-clamp-2 block">{bird.commonName}</span></button>)}
        </nav>
        {/* The photographer follows the selected slide; never keep a static card credit. */}
        <div className="border-b border-emerald-100 bg-emerald-50/40 px-3 text-xs text-emerald-800">
          <PhotoCredit key={currentBird.id} onOpen={()=>setIsPlaying(false)} creator={currentBird.photoCredit.photographer} sourceUrl={currentBird.photoCredit.instagramPost || currentBird.photoCredit.teamLink || "/credits"} title={currentBird.photoCredit.title}/>
        </div>
        <div className="bg-white px-3"><CulturalNameContext key={currentBird.id} kind="bird" entityId={currentBird.id} onOpen={()=>setIsPlaying(false)}/></div>
        <div className="bg-white px-3"><BirdStory key={currentBird.id+"-story"} birdId={currentBird.id} countryId={currentBird.countryId ?? countryId} onOpen={()=>setIsPlaying(false)}/></div>
        <div className="flex flex-wrap items-center gap-2 border-t border-emerald-100 bg-white px-3 py-2 text-emerald-950">
          <button type="button" className="min-h-11 rounded-lg border border-emerald-200 px-3 text-xs font-medium hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700"
            aria-pressed={callsFollow} onClick={() => {
              setIsPlaying(false); playAttemptRef.current += 1
              if (sharedAudio.available) { sharedAudio.toggleFollow(); return }
              if (follow.current?.enabled) follow.current.stop()
              else follow.current?.start(audioRef.current)
            }}>Listen as you change birds: {callsFollow ? "On" : "Off"}</button><BirdFilterControls/>
          <p className="text-xs leading-5" role="status">{sharedAudio.available ? callsFollow ? (currentBird.audioFile ? "Listening follows your bird choices in the shared player." : "No recording for this bird. Choose another to continue.") : "Optional for this viewer. Stops when you leave or hide this page." : followStatus === "blocked" ? "Playback stopped. Press Listen again to resume." : followStatus === "missing" ? "No recording for this bird. Choose another to continue." : followStatus === "loading" ? "Loading this bird’s call…" : followStatus === "playing" ? "Listening follows your bird choices. Pause to stop." : followStatus === "ready" ? "Choose another bird to hear its call." : "Optional for this viewer. Stops when you leave or hide this page."}</p>
        </div>

        {(audioError || audioLoading) && <p role="status" className="bg-white px-4 py-2 text-xs text-emerald-950">{audioError ? "The recording could not play. Use the sound button to try again." : "Loading the recording..."}</p>}
        {/* Announce manual changes politely; automatic playback must not repeatedly interrupt speech. */}
        <p className="sr-only" role="status" aria-live={isPlaying ? "off" : "polite"}>{currentBird.commonName}, image {selectedIndex + 1} of {birds.length}. {currentBird.localOccurrence || currentBird.distribution}</p>
      </Card>
    </div>
  ))
}
