"use client"

import { useState, useEffect, useCallback, useRef, useId, type KeyboardEvent, type TouchEvent } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Pause, Info, Camera, MapPin, ExternalLink, Volume2, VolumeX } from "lucide-react"
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
}

const controlClass = "min-h-11 min-w-11 bg-emerald-900 text-white hover:bg-emerald-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 disabled:opacity-40 motion-reduce:transition-none"
const linkClass = "text-emerald-800 underline underline-offset-2 hover:text-emerald-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"

export default function HomepageBirdCarousel({
  className,
  autoPlay = true,
  autoPlayInterval = 8000,
  birds = allBirds,
  showBirdPicker = false,
}: HomepageBirdCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true)
  const [showInfo, setShowInfo] = useState(false)
  const [showPhotoCredit, setShowPhotoCredit] = useState(false)
  const [imageState, setImageState] = useState<{ image: string; status: "loading" | "loaded" | "error" }>({ image: "", status: "loading" })
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const [audioLoading, setAudioLoading] = useState(false)
  const [thumbnailScroll, setThumbnailScroll] = useState({ left: false, right: false })
  const thumbnailContainerRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const volumeRef = useRef(volume)
  const playAttemptRef = useRef(0)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const carouselId = useId()
  const selectedIndex = birds.length ? currentIndex % birds.length : 0
  const currentBird = birds[selectedIndex]
  const imageStatus = imageState.image === currentBird?.image ? imageState.status : "loading"

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => {
      setPrefersReducedMotion(preference.matches)
      if (preference.matches) setIsPlaying(false)
    }
    updatePreference()
    setIsPlaying(autoPlay && !preference.matches)
    preference.addEventListener("change", updatePreference)
    return () => preference.removeEventListener("change", updatePreference)
  }, [autoPlay])

  const updateThumbnailScroll = useCallback(() => {
    const container = thumbnailContainerRef.current
    if (!container) return
    setThumbnailScroll({
      left: container.scrollLeft > 1,
      right: container.scrollLeft + container.clientWidth < container.scrollWidth - 1,
    })
  }, [])

  useEffect(() => {
    const container = thumbnailContainerRef.current
    if (!container) return
    const observer = new ResizeObserver(updateThumbnailScroll)
    observer.observe(container)
    updateThumbnailScroll()
    return () => observer.disconnect()
  }, [updateThumbnailScroll, birds.length])

  useEffect(() => {
    const container = thumbnailContainerRef.current
    const selected = container?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')
    if (!container || !selected) return
    const left = selected.offsetLeft
    const right = left + selected.offsetWidth
    if (left < container.scrollLeft) container.scrollTo({ left, behavior: "auto" })
    else if (right > container.scrollLeft + container.clientWidth) {
      container.scrollTo({ left: right - container.clientWidth, behavior: "auto" })
    }
    updateThumbnailScroll()
  }, [selectedIndex, updateThumbnailScroll])

  // Keep a single audio element for the selected bird; volume changes do not recreate it.
  useEffect(() => {
    const audio = audioRef.current
    setIsAudioPlaying(false)
    setAudioError(false)
    setAudioLoading(false)
    setShowVolumeSlider(false)
    if (audio) audio.volume = volumeRef.current
    return () => {
      playAttemptRef.current += 1
      audio?.pause()
    }
  }, [currentBird?.id, currentBird?.audioFile])

  const toggleAudio = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || !currentBird?.audioFile) return
    const attempt = ++playAttemptRef.current
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
      // Play directly from the click so mobile browsers retain user activation.
      await audio.play()
    } catch (error) {
      if (audioRef.current !== audio || playAttemptRef.current !== attempt) return
      setAudioError(!(error instanceof DOMException && error.name === "AbortError"))
      setAudioLoading(false)
      setIsAudioPlaying(false)
    }
  }, [currentBird?.audioFile, audioLoading])

  const goToSlide = useCallback((index: number) => {
    if (!birds.length) return
    playAttemptRef.current += 1
    audioRef.current?.pause()
    setIsPlaying(false)
    setIsAudioPlaying(false)
    setAudioLoading(false)
    setCurrentIndex(((index % birds.length) + birds.length) % birds.length)
    setShowInfo(false)
    setShowPhotoCredit(false)
    setShowVolumeSlider(false)
  }, [birds.length])

  useEffect(() => {
    if (!isPlaying || birds.length < 2 || imageStatus === "loading" || isAudioPlaying || audioLoading || showInfo || showPhotoCredit) return
    const timer = window.setTimeout(() => setCurrentIndex(index => (index + 1) % birds.length), autoPlayInterval)
    return () => window.clearTimeout(timer)
  }, [isPlaying, birds.length, currentIndex, imageStatus, autoPlayInterval, isAudioPlaying, audioLoading, showInfo, showPhotoCredit])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      setShowInfo(false)
      setShowPhotoCredit(false)
      setShowVolumeSlider(false)
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

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current
    touchStartRef.current = null
    if (!start || event.changedTouches.length !== 1) return
    const horizontal = event.changedTouches[0].clientX - start.x
    const vertical = event.changedTouches[0].clientY - start.y
    if (Math.abs(horizontal) > 50 && Math.abs(horizontal) > Math.abs(vertical) * 1.5) {
      goToSlide(selectedIndex + (horizontal < 0 ? 1 : -1))
    }
  }

  const scrollThumbnails = (direction: "left" | "right") => {
    thumbnailContainerRef.current?.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    })
  }

  if (!currentBird) return null

  const speciesSource = currentBird.sources[0]
  const audioButtonText = audioLoading
    ? "Loading bird call..."
    : audioError
      ? "Retry bird call"
      : isAudioPlaying
        ? "Pause bird call"
        : "Listen to bird call"

  return (
    <div
      className={cn("relative min-w-0 w-full max-w-md mx-auto rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-4", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Bird photographs"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onFocusCapture={event => {
        if (!(event.target as HTMLElement).closest("[data-slideshow-control]")) setIsPlaying(false)
      }}
    >
      {showBirdPicker && birds.length > 1 && (
        <div className="mb-4">
          <label htmlFor={`${carouselId}-bird-picker`} className="mb-2 block text-sm font-semibold text-emerald-900">Choose a bird · {birds.length} featured species</label>
          <select id={`${carouselId}-bird-picker`} value={selectedIndex} onChange={event => goToSlide(Number(event.target.value))} className="min-h-11 w-full rounded-lg border border-emerald-200 bg-white px-3 text-sm text-emerald-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">
            {birds.map((bird, index) => <option key={bird.id} value={index}>{bird.commonName}</option>)}
          </select>
        </div>
      )}
      {currentBird.audioFile && (
        <audio
          key={currentBird.id}
          ref={audioRef}
          src={sitePath(currentBird.audioFile)}
          preload="none"
          aria-label={`${currentBird.commonName} recording`}
          onPlaying={() => { setIsAudioPlaying(true); setAudioLoading(false); setAudioError(false) }}
          onPause={() => { setIsAudioPlaying(false); setAudioLoading(false) }}
          onEnded={() => { setIsAudioPlaying(false); setAudioLoading(false) }}
          onWaiting={event => { if (!event.currentTarget.paused) setAudioLoading(true) }}
          onError={() => { setAudioError(true); setIsAudioPlaying(false); setAudioLoading(false) }}
        />
      )}
      <Card className="overflow-hidden rounded-2xl border border-emerald-100 shadow-xl">
        <div
          className="relative w-full aspect-[4/3] max-h-80 overflow-hidden bg-stone-100"
          style={{ touchAction: "pan-y pinch-zoom" }}
          onTouchStart={event => {
            touchStartRef.current = event.touches.length === 1
              ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
              : null
          }}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={() => { touchStartRef.current = null }}
        >
          {imageStatus !== "error" ? (
            <Image
              key={currentBird.id}
              src={sitePath(currentBird.image || "/placeholder.svg")}
              alt={currentBird.commonName}
              fill
              className={cn("object-contain object-center transition-opacity duration-300 motion-reduce:transition-none", imageStatus === "loaded" ? "opacity-100" : "opacity-0")}
              onLoad={() => setImageState({ image: currentBird.image, status: "loaded" })}
              onError={() => setImageState({ image: currentBird.image, status: "error" })}
              priority={selectedIndex === 0}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 448px"
            />
          ) : (
            <div className="flex h-full items-center justify-center gap-2 text-stone-600">
              <Camera className="h-6 w-6" aria-hidden="true" />
              <p>Image unavailable</p>
            </div>
          )}
          {imageStatus === "loading" && (
            <div className="absolute inset-0 flex items-center justify-center bg-stone-100 text-sm text-emerald-900" role="status">
              Loading photograph...
            </div>
          )}
        </div>

        <div className="border-y border-emerald-100 bg-emerald-50 px-3 py-2">
          <div className="grid grid-cols-[44px_minmax(0,1fr)_44px_auto] items-center gap-2" data-image-navigation>
            <Button type="button" className={cn(controlClass, "h-11 w-11 rounded-full p-0")} onClick={() => goToSlide(selectedIndex - 1)} aria-label="Previous image" disabled={birds.length < 2}>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </Button>
            <p className="text-center text-sm font-semibold tabular-nums text-emerald-950">Image {selectedIndex + 1} / {birds.length}</p>
            <Button type="button" className={cn(controlClass, "h-11 w-11 rounded-full p-0")} onClick={() => goToSlide(selectedIndex + 1)} aria-label="Next image" disabled={birds.length < 2}>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button
              type="button"
              data-slideshow-control
              className={cn(controlClass, "h-11 w-11 gap-2 p-0 sm:w-auto sm:px-3")}
              onClick={() => setIsPlaying(playing => !playing)}
              aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
              title={isPlaying ? "Pause slideshow" : "Play slideshow"}
              aria-pressed={isPlaying}
              disabled={birds.length < 2 || imageStatus === "loading"}
            >
              {isPlaying ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
              <span className="hidden text-xs sm:inline">Slideshow</span>
            </Button>
          </div>
        </div>

        <div className="space-y-3 bg-white p-3 sm:p-4">
          <div>
            <h3 className="text-lg font-bold leading-tight text-gray-900">{currentBird.commonName}</h3>
            <p className="mt-1 text-sm italic text-gray-600">{currentBird.scientificName}</p>
          </div>

          {currentBird.audioFile ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Button type="button" className={cn(controlClass, "flex-1 gap-2 whitespace-normal px-3")} onClick={toggleAudio} aria-pressed={isAudioPlaying}>
                  {isAudioPlaying ? <Pause className="h-4 w-4 shrink-0" aria-hidden="true" /> : <Volume2 className="h-4 w-4 shrink-0" aria-hidden="true" />}
                  {audioButtonText}
                </Button>
                <Button type="button" className={cn(controlClass, "h-11 w-11 shrink-0 p-0")} onClick={() => setShowVolumeSlider(visible => !visible)} aria-label="Adjust bird call volume" aria-expanded={showVolumeSlider} aria-controls={`${carouselId}-volume`}>
                  {volume === 0 ? <VolumeX className="h-4 w-4" aria-hidden="true" /> : <Volume2 className="h-4 w-4" aria-hidden="true" />}
                </Button>
              </div>
              {showVolumeSlider && (
                <div id={`${carouselId}-volume`} className="rounded-lg bg-emerald-50 px-3 py-2">
                  <label htmlFor={`${carouselId}-volume-input`} className="text-sm font-medium text-emerald-950">Bird call volume: {Math.round(volume * 100)}%</label>
                  <input
                    id={`${carouselId}-volume-input`}
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={event => {
                      const nextVolume = Number.parseFloat(event.target.value)
                      volumeRef.current = nextVolume
                      setVolume(nextVolume)
                      if (audioRef.current) audioRef.current.volume = nextVolume
                    }}
                    className="block h-11 w-full accent-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
                  />
                </div>
              )}
              <p className="text-xs leading-relaxed text-gray-600">Recording: {currentBird.audioLabel || "Wild bird field recording"}.</p>
              {(audioError || audioLoading) && <p role="status" className="text-sm text-emerald-900">{audioError ? "The recording could not play. Please try again." : "Loading the recording..."}</p>}
            </div>
          ) : <p className="text-xs text-gray-600">A recording is not yet available for this bird.</p>}

          <div className="text-sm">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="font-semibold text-emerald-900">Where to find it</p>
              <p className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-900">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />{currentBird.primaryRegion}
              </p>
            </div>
            <p className="mt-1 leading-relaxed text-gray-600">{currentBird.localOccurrence || currentBird.distribution}</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button type="button" className={cn(controlClass, "h-auto gap-2 whitespace-normal px-3 py-2 text-xs")} onClick={() => setShowInfo(visible => !visible)} aria-expanded={showInfo} aria-controls={`${carouselId}-info`}>
              <Info className="h-4 w-4 shrink-0" aria-hidden="true" />{showInfo ? "Hide species details" : "Species details"}
            </Button>
            <Button type="button" className={cn(controlClass, "h-auto gap-2 whitespace-normal px-3 py-2 text-xs")} onClick={() => setShowPhotoCredit(visible => !visible)} aria-expanded={showPhotoCredit} aria-controls={`${carouselId}-credits`}>
              <Camera className="h-4 w-4 shrink-0" aria-hidden="true" />{showPhotoCredit ? "Hide credits" : "Photo & audio credits"}
            </Button>
          </div>

          {showInfo && (
            <div id={`${carouselId}-info`} className="space-y-4 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm">
              <h4 className="font-bold text-emerald-950">About {currentBird.commonName}</h4>
              <div><p className="font-semibold text-emerald-900">Wider range</p><p className="mt-1 leading-relaxed text-gray-700">{currentBird.distribution}</p></div>
              <div><p className="font-semibold text-emerald-900">Habitat</p><p className="mt-1 leading-relaxed text-gray-700">{currentBird.habitat}</p></div>
              {currentBird.photoCredit.reserve && <div><p className="font-semibold text-emerald-900">Photograph location</p><p className="mt-1 text-gray-700">{currentBird.photoCredit.reserve}</p></div>}
              <p className="text-xs leading-relaxed text-gray-600">Distribution describes the species’ range, not a guaranteed sighting. Photograph and recording locations may differ.</p>
              {currentBird.regionSlug && <Link href={`/aves-explorer?region=${currentBird.regionSlug}`} className={cn(linkClass, "flex min-h-11 items-center gap-2")}><MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />Explore {currentBird.primaryRegion}</Link>}
              {speciesSource && <a href={speciesSource.url} target="_blank" rel="noopener noreferrer" className={cn(linkClass, "flex min-h-11 items-center gap-2")}><ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />Read species guide</a>}
            </div>
          )}

          {showPhotoCredit && (
            <div id={`${carouselId}-credits`} className="space-y-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm">
              <h4 className="font-bold text-emerald-950">Photo & recording credits</h4>
              <div>
                <p className="text-xs font-semibold text-gray-600">Photographer</p>
                {currentBird.photoCredit.teamLink ? <Link href={currentBird.photoCredit.teamLink} className={cn(linkClass, "inline-flex min-h-11 items-center")}>{currentBird.photoCredit.photographer}</Link> : <p className="mt-1 text-gray-800">{currentBird.photoCredit.photographer}</p>}
                {currentBird.photoCredit.title && <p className="mt-1 text-xs text-gray-600">{currentBird.photoCredit.title}</p>}
              </div>
              {currentBird.photoCredit.reserve && <div>
                <p className="text-xs font-semibold text-gray-600">Photograph location</p>
                {currentBird.photoCredit.reserveLink ? <Link href={currentBird.photoCredit.reserveLink} className={cn(linkClass, "inline-flex min-h-11 items-center")}>{currentBird.photoCredit.reserve}</Link> : <p className="mt-1 text-gray-800">{currentBird.photoCredit.reserve}</p>}
              </div>}
              {currentBird.audioFile && <Link href={`/credits#audio-${currentBird.id}`} className={cn(linkClass, "flex min-h-11 items-center")}>Bird recording & licence</Link>}
              {currentBird.photoCredit.instagramPost && <a href={currentBird.photoCredit.instagramPost} target="_blank" rel="noopener noreferrer" className={cn(linkClass, "flex min-h-11 items-center gap-2")}><ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />View photograph source</a>}
            </div>
          )}
        </div>

        <p className="sr-only" role="status" aria-live={isPlaying ? "off" : "polite"}>{currentBird.commonName}, image {selectedIndex + 1} of {birds.length}. {currentBird.localOccurrence || currentBird.distribution}</p>
        <div className="grid grid-cols-[44px_minmax(0,1fr)_44px] items-center gap-1 border-t border-emerald-100 bg-emerald-50 px-2" data-image-navigation>
          <Button type="button" className={cn(controlClass, "h-11 w-11 rounded-full p-0")} disabled={!thumbnailScroll.left} onClick={() => scrollThumbnails("left")} aria-label="Scroll thumbnails left"><ChevronLeft className="h-4 w-4" aria-hidden="true" /></Button>
          <div ref={thumbnailContainerRef} onScroll={updateThumbnailScroll} className="relative flex min-w-0 gap-2 overflow-x-auto p-2">
            {birds.map((bird, index) => (
              <button
                type="button"
                key={bird.id}
                className={cn("h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2", index === selectedIndex ? "border-emerald-800 ring-2 ring-emerald-200" : "border-gray-300 hover:border-emerald-600")}
                onClick={() => goToSlide(index)}
                aria-label={`View image ${index + 1}: ${bird.commonName}`}
                aria-pressed={index === selectedIndex}
              >
                <Image src={sitePath(bird.image || "/placeholder.svg")} alt="" loading="lazy" width={56} height={56} className="h-full w-full object-contain" />
              </button>
            ))}
          </div>
          <Button type="button" className={cn(controlClass, "h-11 w-11 rounded-full p-0")} disabled={!thumbnailScroll.right} onClick={() => scrollThumbnails("right")} aria-label="Scroll thumbnails right"><ChevronRight className="h-4 w-4" aria-hidden="true" /></Button>
        </div>
      </Card>
    </div>
  )
}
