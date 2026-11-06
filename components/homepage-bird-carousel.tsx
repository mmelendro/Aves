"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Info,
  Camera,
  MapPin,
  ExternalLink,
  X,
  Volume2,
  VolumeX,
} from "lucide-react"
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
}

export default function HomepageBirdCarousel({
  className,
  autoPlay = true,
  autoPlayInterval = 8000,
  birds = allBirds,
}: HomepageBirdCarouselProps) {
  const birdData = birds
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [showPhotoCredit, setShowPhotoCredit] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [firstImageLoaded, setFirstImageLoaded] = useState(false)
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set())

  // Enhanced audio state management for mobile compatibility
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const [audioLoading, setAudioLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Thumbnail navigation state
  const [thumbnailScrollPosition, setThumbnailScrollPosition] = useState(0)
  const [thumbnailViewport, setThumbnailViewport] = useState(0)
  const thumbnailContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = thumbnailContainerRef.current
    if (!container) return
    const update = () => setThumbnailViewport(container.clientWidth)
    const observer = new ResizeObserver(update)
    observer.observe(container)
    update()
    return () => observer.disconnect()
  }, [])

  // Audio refs and management
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const volumeRef = useRef(volume)
  const playAttemptRef = useRef(0)

  const currentBird = birdData[currentIndex]

  // Every Australian photograph is linked to its featured region.
  const shouldShowExploreRegion = Boolean(currentBird.regionSlug)

  const speciesSource = currentBird.sources[0]
  const shouldShowBirdGuideButton = Boolean(speciesSource)

  // Detect mobile device on mount
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
      const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
      setIsMobile(mobileRegex.test(userAgent.toLowerCase()) || isTouchDevice)
    }

    checkMobile()
  }, [])

  // Thumbnail navigation functions
  const scrollThumbnails = useCallback(
    (direction: "left" | "right") => {
      if (!thumbnailContainerRef.current) return

      const container = thumbnailContainerRef.current
      const scrollAmount = 200 // Adjust based on thumbnail size
      const newPosition =
        direction === "left"
          ? Math.max(0, thumbnailScrollPosition - scrollAmount)
          : Math.min(container.scrollWidth - container.clientWidth, thumbnailScrollPosition + scrollAmount)

      setThumbnailScrollPosition(newPosition)
      container.scrollTo({ left: newPosition, behavior: "smooth" })
    },
    [thumbnailScrollPosition, thumbnailViewport],
  )

  const canScrollThumbnails = useCallback(
    (direction: "left" | "right") => {
      if (!thumbnailContainerRef.current) return false

      const container = thumbnailContainerRef.current
      if (direction === "left") {
        return thumbnailScrollPosition > 0
      } else {
        return thumbnailScrollPosition < container.scrollWidth - container.clientWidth
      }
    },
    [thumbnailScrollPosition, thumbnailViewport],
  )

  // Each slide owns one audio element. Volume changes must not recreate it.
  useEffect(() => {
    const audio = audioRef.current
    setIsAudioPlaying(false)
    setAudioError(false)
    setAudioLoading(false)
    setShowVolumeSlider(false)
    if (audio) audio.volume = volumeRef.current
    return () => { audio?.pause() }
  }, [currentBird.audioFile])

  const toggleAudio = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || !currentBird.audioFile) return
    const attempt = ++playAttemptRef.current
    if (!audio.paused) {
      audio.pause()
      setAudioLoading(false)
      setAudioError(false)
      return
    }
    setAudioError(false)
    setAudioLoading(true)
    try {
      if (audio.error) audio.load()
      // Keep play in the click handler so touch browsers retain user activation.
      await audio.play()
    } catch (error) {
      if (audioRef.current !== audio || playAttemptRef.current !== attempt) return
      setAudioError(!(error instanceof DOMException && error.name === "AbortError"))
      setAudioLoading(false)
      setIsAudioPlaying(false)
    }
  }, [currentBird.audioFile])

  const handleVolumeChange = useCallback((newVolume: number) => {
    const nextVolume = Math.max(0, Math.min(1, newVolume))
    volumeRef.current = nextVolume
    setVolume(nextVolume)
    if (audioRef.current) audioRef.current.volume = nextVolume
  }, [])

  // The main image and lazy thumbnails load on demand, rather than fetching
  // twenty full-size photographs on a mobile connection.
  useEffect(() => {
    if (autoPlay && firstImageLoaded) setIsPlaying(true)
  }, [autoPlay, firstImageLoaded])

  useEffect(() => {
    const container = thumbnailContainerRef.current
    const selected = container?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')
    if (!container || !selected) return
    const left = selected.offsetLeft
    const right = left + selected.offsetWidth
    if (left < container.scrollLeft) container.scrollTo({ left, behavior: "auto" })
    else if (right > container.scrollLeft + container.clientWidth) container.scrollTo({ left: right - container.clientWidth, behavior: "auto" })
  }, [currentIndex])

  // Enhanced slide navigation with audio completion check
  const nextSlide = useCallback(() => {
    if (firstImageLoaded || currentIndex > 0) {
      // If audio is playing, pause it before changing slides
      if (isAudioPlaying && audioRef.current) {
        audioRef.current.pause()
        setIsAudioPlaying(false)
      }

      setCurrentIndex((prevIndex) => (prevIndex + 1) % birdData.length)
      setShowInfo(false)
      setShowPhotoCredit(false)
      setShowVolumeSlider(false)

      // Update loading states for new image
      const nextIndex = (currentIndex + 1) % birdData.length
      const nextImage = birdData[nextIndex].image
      if (preloadedImages.has(nextImage)) {
        setIsLoading(false)
        setImageLoaded(true)
        setImageError(false)
      } else {
        setIsLoading(true)
        setImageLoaded(false)
        setImageError(false)
      }
    }
  }, [currentIndex, firstImageLoaded, preloadedImages, isAudioPlaying])

  const prevSlide = useCallback(() => {
    // If audio is playing, pause it before changing slides
    if (isAudioPlaying && audioRef.current) {
      audioRef.current.pause()
      setIsAudioPlaying(false)
    }

    setCurrentIndex((prevIndex) => (prevIndex - 1 + birdData.length) % birdData.length)
    setShowInfo(false)
    setShowPhotoCredit(false)
    setShowVolumeSlider(false)

    // Update loading states for new image
    const prevIndex = (currentIndex - 1 + birdData.length) % birdData.length
    const prevImage = birdData[prevIndex].image
    if (preloadedImages.has(prevImage)) {
      setIsLoading(false)
      setImageLoaded(true)
      setImageError(false)
    } else {
      setIsLoading(true)
      setImageLoaded(false)
      setImageError(false)
    }
  }, [currentIndex, preloadedImages, isAudioPlaying])

  const goToSlide = useCallback(
    (index: number) => {
      // If audio is playing, pause it before changing slides
      if (isAudioPlaying && audioRef.current) {
        audioRef.current.pause()
        setIsAudioPlaying(false)
      }

      setCurrentIndex(index)
      setShowInfo(false)
      setShowPhotoCredit(false)
      setShowVolumeSlider(false)

      // Update loading states for new image
      const targetImage = birdData[index].image
      if (preloadedImages.has(targetImage)) {
        setIsLoading(false)
        setImageLoaded(true)
        setImageError(false)
      } else {
        setIsLoading(true)
        setImageLoaded(false)
        setImageError(false)
      }
    },
    [preloadedImages, isAudioPlaying],
  )

  // Enhanced autoplay effect that waits for audio completion
  useEffect(() => {
    if (isPlaying && firstImageLoaded) {
      // If audio is playing, wait for it to complete before advancing
      if (isAudioPlaying || audioLoading) {
        return // Keep the selected bird visible while its recording plays or buffers
      }

      const interval = setInterval(nextSlide, autoPlayInterval)
      return () => clearInterval(interval)
    }
  }, [isPlaying, nextSlide, autoPlayInterval, firstImageLoaded, isAudioPlaying, audioLoading])

  const handleImageLoad = useCallback(() => {
    setIsLoading(false)
    setImageLoaded(true)
    setImageError(false)
    setFirstImageLoaded(true)
    setPreloadedImages(previous => new Set(previous).add(currentBird.image))
  }, [currentBird.image])

  const handleImageError = useCallback(() => {
    console.warn(`Failed to load current image: ${currentBird.image}`)
    setIsLoading(false)
    setImageLoaded(false)
    setImageError(true)
    setFirstImageLoaded(true)
  }, [currentBird.image])

  const getImagePositioning = (birdId: string) => ({
    objectPosition: birdData.find(bird => bird.id === birdId)?.imagePosition || "center center",
    transform: "none",
  })

  const getPrimaryRegionColor = (region: string) => {
    switch (region) {
      case "Pacific":
      case "Pacific Coast":
        return "bg-[#228B22]/90 text-white border-[#228B22]/50"
      case "Western Andes":
        return "bg-[#8B4513]/90 text-white border-[#8B4513]/50"
      case "Central Andes":
        return "bg-[#A0522D]/90 text-white border-[#A0522D]/50"
      case "Eastern Andes":
        return "bg-[#CD853F]/90 text-white border-[#CD853F]/50"
      case "Cauca Valley":
        return "bg-[#4169E1]/90 text-white border-[#4169E1]/50"
      case "Magdalena Valley":
        return "bg-[#1E90FF]/90 text-white border-[#1E90FF]/50"
      case "Caribbean":
      case "Caribbean Coast":
        return "bg-[#FF8C00]/90 text-white border-[#FF8C00]/50"
      case "SNSM":
      case "Sierra Nevada de Santa Marta":
        return "bg-[#D2691E]/90 text-white border-[#D2691E]/50"
      case "Llanos":
        return "bg-[#FFD700]/90 text-white border-[#FFD700]/50"
      case "Amazonia":
        return "bg-[#32CD32]/90 text-white border-[#32CD32]/50"
      case "Massif":
      case "Colombian Massif":
        return "bg-[#DEB887]/90 text-white border-[#DEB887]/50"
      case "Cauca River Region":
        return "bg-[#4169E2]/90 text-white border-[#4169E2]/50"
      default:
        return "bg-gray-600/90 text-white border-gray-500/50"
    }
  }

  // Updated region text colors to match Aves Explorer map exactly
  const getRegionTextColor = (region: string) => {
    switch (region) {
      case "Pacific":
      case "Pacific Coast":
        return {
          base: "text-[#228B22]",
          hover: "hover:text-[#1F7A1F]",
        }
      case "Western Andes":
        return {
          base: "text-[#8B4513]",
          hover: "hover:text-[#7A3E11]",
        }
      case "Central Andes":
        return {
          base: "text-[#A0522D]",
          hover: "hover:text-[#8F4928]",
        }
      case "Eastern Andes":
        return {
          base: "text-[#CD853F]",
          hover: "hover:text-[#B8763A]",
        }
      case "Cauca Valley":
        return {
          base: "text-[#4169E1]",
          hover: "hover:text-[#3A5FCA]",
        }
      case "Magdalena Valley":
        return {
          base: "text-[#1E90FF]",
          hover: "hover:text-[#1C82E6]",
        }
      case "Caribbean":
      case "Caribbean Coast":
        return {
          base: "text-[#FF8C00]",
          hover: "hover:text-[#E67E00]",
        }
      case "SNSM":
      case "Sierra Nevada de Santa Marta":
        return {
          base: "text-[#D2691E]",
          hover: "hover:text-[#BD5F1B]",
        }
      case "Llanos":
        return {
          base: "text-[#FFD700]",
          hover: "hover:text-[#E6C200]",
        }
      case "Amazonia":
        return {
          base: "text-[#32CD32]",
          hover: "hover:text-[#2DB82D]",
        }
      case "Massif":
      case "Colombian Massif":
        return {
          base: "text-[#DEB887]",
          hover: "hover:text-[#C8A679]",
        }
      case "Cauca River Region":
        return {
          base: "text-[#4169E2]",
          hover: "hover:text-[#3A5FCA]",
        }
      default:
        return {
          base: "text-emerald-300",
          hover: "hover:text-emerald-200",
        }
    }
  }

  // Function to determine if current bird has light background that needs enhanced button visibility
  const hasLightBackground = (birdId: string) => {
    // Birds with white/light backgrounds that need enhanced button visibility
    return birdId === "3" || birdId === "1" || birdId === "10" || birdId === "11" // Black-billed Mountain-Toucan, Green-bearded Helmetcrest, Scaled Dove, and Yellow-throated Toucan
  }

  // Enhanced button styling for light background images
  const getEnhancedButtonStyle = (baseClasses: string) => {
    if (hasLightBackground(currentBird.id)) {
      return cn(
        baseClasses,
        "bg-black/40 backdrop-blur-md hover:bg-black/50 border border-white/20 shadow-xl",
        "ring-1 ring-black/10",
      )
    }
    return cn(baseClasses, "bg-white/20 backdrop-blur-sm hover:bg-white/30")
  }

  // Check if current bird has audio and it's available
  const hasAvailableAudio = Boolean(currentBird.audioFile)

  // Get the current bird's region colors for photo credit
  const regionColors = getRegionTextColor(currentBird.primaryRegion)
  const currentImagePositioning = getImagePositioning(currentBird.id)

  return (
    <div className={cn("relative min-w-0 w-full max-w-md mx-auto carousel-container", className)}>
      {currentBird.audioFile && (
        <audio
          key={currentBird.id}
          ref={audioRef}
          src={currentBird.audioFile ? sitePath(currentBird.audioFile) : undefined}
          preload="none"
          aria-label={`${currentBird.commonName} recording`}
          onPlaying={() => { setIsAudioPlaying(true); setAudioLoading(false); setAudioError(false) }}
          onPause={() => { setIsAudioPlaying(false); setAudioLoading(false) }}
          onEnded={() => { setIsAudioPlaying(false); setAudioLoading(false) }}
          onWaiting={(event) => { if (!event.currentTarget.paused) setAudioLoading(true) }}
          onError={() => { setAudioError(true); setIsAudioPlaying(false); setAudioLoading(false) }}
        />
      )}
      <Card className="overflow-hidden border-0 shadow-xl">
        <div className="relative">
          {/* Main Image - Perfect Square */}
          <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-emerald-50 to-blue-50 carousel-image-container">
            {!imageError ? (
              <Image
                key={currentBird.id}
                src={sitePath(currentBird.image || "/placeholder.svg")}
                alt={currentBird.commonName}
                fill
                className={cn(
                  "object-cover transition-all duration-700 ease-out carousel-slide",
                  imageLoaded ? "opacity-100" : "opacity-0",
                )}
                style={{
                  objectPosition: currentImagePositioning.objectPosition,
                  transform: currentImagePositioning.transform,
                  transformOrigin: "center center",
                }}
                onLoad={handleImageLoad}
                onError={handleImageError}
                priority={currentIndex === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="text-center p-4">
                  <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                    <Camera className="w-8 h-8 text-gray-500" />
                  </div>
                  <p className="text-sm text-gray-600">Image unavailable</p>
                </div>
              </div>
            )}

            {/* Enhanced Loading Indicator */}
            {isLoading && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50 carousel-loading">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-emerald-700 font-medium">
                    {currentIndex === 0 && !firstImageLoaded ? "Loading first image..." : "Loading..."}
                  </p>
                </div>
              </div>
            )}

            {/* Enhanced Gradient Overlay for light background images */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent",
                hasLightBackground(currentBird.id) && "from-black/70 to-black/10",
              )}
            />

            {/* Navigation Arrows - Only show when info panel is closed */}
            {!showInfo && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "absolute left-2 text-white border-0 w-10 h-10 rounded-full z-40 transition-all duration-200 carousel-button shadow-lg",
                    "top-1/3 -translate-y-1/2 md:top-1/2",
                    getEnhancedButtonStyle(""),
                  )}
                  onClick={prevSlide}
                  aria-label="Previous bird"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "absolute right-2 text-white border-0 w-10 h-10 rounded-full z-40 transition-all duration-200 carousel-button shadow-lg",
                    "top-1/3 -translate-y-1/2 md:top-1/2",
                    getEnhancedButtonStyle(""),
                  )}
                  onClick={nextSlide}
                  aria-label="Next bird"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </>
            )}

            {/* Top Control Buttons - Enhanced with Audio Controls and Better Mobile Support */}
            {!showInfo && (
              <div className="absolute top-3 right-3 flex gap-2 z-50">
                {/* Audio Controls - Only show if bird has audio and it's available */}
                {hasAvailableAudio && (
                  <div className="relative flex gap-2">
                    {/* Audio Play/Pause Button with enhanced mobile feedback */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "text-white border-0 w-9 h-9 p-0 rounded-full transition-all duration-200 carousel-button shadow-lg",
                        audioError && "opacity-50",
                        isAudioPlaying && "ring-2 ring-emerald-400/50",
                        audioLoading && "animate-pulse",
                        getEnhancedButtonStyle(""),
                      )}
                      onClick={toggleAudio}
                      aria-label={
                        audioLoading
                          ? "Loading audio..."
                          : audioError
                            ? "Audio unavailable - tap to retry"
                            : isAudioPlaying
                              ? "Pause bird sound"
                              : "Play bird sound"
                      }
                    >
                      {audioLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : audioError ? (
                        <div className="w-4 h-4 flex items-center justify-center">
                          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                        </div>
                      ) : isAudioPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>

                    {/* Volume Control Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "text-white border-0 w-9 h-9 p-0 rounded-full transition-all duration-200 carousel-button shadow-lg",
                        audioError && "opacity-50 cursor-not-allowed",
                        showVolumeSlider && "ring-2 ring-blue-400/50",
                        getEnhancedButtonStyle(""),
                      )}
                      onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                      disabled={audioError}
                      aria-label="Volume control"
                      aria-expanded={showVolumeSlider}
                    >
                      {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>

                    {/* Volume Slider */}
                    {showVolumeSlider && !audioError && (
                      <div className="absolute top-12 right-0 bg-black/95 backdrop-blur-sm rounded-lg p-3 shadow-xl border border-white/10 min-w-[140px] animate-in slide-in-from-top-2">
                        <div className="flex items-center gap-2">
                          <VolumeX className="w-3 h-3 text-white/70 flex-shrink-0" />
                          <input
                            type="range"
                            aria-label="Bird call volume"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={(e) => handleVolumeChange(Number.parseFloat(e.target.value))}
                            className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                            style={{
                              background: `linear-gradient(to right, #10b981 0%, #10b981 ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`,
                            }}
                          />
                          <Volume2 className="w-3 h-3 text-white/70 flex-shrink-0" />
                        </div>
                        <div className="text-center mt-2">
                          <span className="text-xs text-white/70">{Math.round(volume * 100)}%</span>
                        </div>
                      </div>
                    )}

                    {/* Idle audio may defer loading until Play; show only active loading or errors. */}
                    {isMobile && (audioLoading || audioError) && (
                      <div className="absolute -bottom-8 right-0 bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        {audioLoading && "Loading..."}
                        {audioError && "Error - Tap to retry"}
                      </div>
                    )}
                  </div>
                )}

                {/* Slideshow Control */}
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "text-white border-0 w-9 h-9 p-0 rounded-full transition-all duration-200 carousel-button shadow-lg",
                    getEnhancedButtonStyle(""),
                  )}
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                  disabled={!firstImageLoaded}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>

                {/* Photo Credit Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "text-white border-0 w-9 h-9 p-0 rounded-full transition-all duration-200 carousel-button shadow-lg",
                    getEnhancedButtonStyle(""),
                  )}
                  onClick={() => setShowPhotoCredit(!showPhotoCredit)}
                  aria-label="View photo and recording credits"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Bird Information - Bottom with Primary Region Tag - CONDITIONALLY HIDDEN */}
            {!showInfo && (
              <div className="absolute bottom-0 left-0 right-0 text-white z-30 transition-all duration-300 ease-in-out">
                <div className="p-3 space-y-2">
                  {/* Bird Names */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold leading-tight drop-shadow-lg">{currentBird.commonName}</h3>
                    <p className="text-sm italic opacity-90 leading-tight drop-shadow-md">
                      {currentBird.scientificName}
                    </p>
                    <p className="text-xs opacity-90 leading-tight drop-shadow-md">Bird {currentIndex + 1} of {birdData.length}</p>
                  </div>

                  {/* Primary Region Tag and Info Button Row */}
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-sm shadow-lg",
                        getPrimaryRegionColor(currentBird.primaryRegion),
                      )}
                    >
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="whitespace-nowrap">{currentBird.primaryRegion}</span>
                    </div>

                    {/* Info Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "flex-shrink-0 w-11 h-11 p-0 rounded-full border-0 transition-all duration-300 shadow-lg text-white hover:scale-105",
                        getEnhancedButtonStyle(""),
                      )}
                      onClick={() => setShowInfo(true)}
                      aria-label="Show bird information"
                    >
                      <Info className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Species Information Panel - Enhanced Layout with Smooth Transitions */}
            {showInfo && (
              <div className="absolute inset-0 bg-black/95 backdrop-blur-md z-60 animate-in fade-in-0 duration-300">
                <div className="h-full overflow-y-auto p-6 mobile-menu-scroll">
                  {/* Close Button - Fixed position */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 w-10 h-10 p-0 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white border-0 z-70 shadow-lg transition-all duration-200 hover:scale-105"
                    onClick={() => setShowInfo(false)}
                    aria-label="Close species information"
                  >
                    <X className="w-5 h-5" />
                  </Button>

                  {/* Content with proper spacing */}
                  <div className="pt-4 pb-8 max-w-sm mx-auto">
                    {/* Header - Single source of truth for species name */}
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-emerald-300 mb-2 leading-tight pr-12">
                        {currentBird.commonName}
                      </h2>
                      <p className="text-base italic text-blue-300 mb-1 leading-tight">{currentBird.scientificName}</p>
                    </div>

                    <div className="space-y-5 text-sm">
                      {currentBird.localOccurrence && <div><h4 className="font-semibold text-emerald-300 mb-1">In this region</h4><p className="text-gray-200 leading-relaxed">{currentBird.localOccurrence}</p></div>}
                      <div><h4 className="font-semibold text-emerald-300 mb-1">Wider range</h4><p className="text-gray-200 leading-relaxed">{currentBird.distribution}</p></div>
                      <div><h4 className="font-semibold text-emerald-300 mb-1">Habitat</h4><p className="text-gray-200 leading-relaxed">{currentBird.habitat}</p></div>
                      {currentBird.photoCredit.reserve && <div><h4 className="font-semibold text-emerald-300 mb-1">Photograph location</h4><p className="text-gray-300 leading-relaxed">{currentBird.photoCredit.reserve}</p></div>}
                      <p className="text-xs leading-relaxed text-gray-400">Distribution describes the species’ range, not a guaranteed sighting. Photograph and recording locations may differ.</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 space-y-3">
                      {/* Featured Australian Region */}
                      {shouldShowExploreRegion && (
                        <Link href={`/aves-explorer?region=${currentBird.regionSlug}`} className="block">
                          <Button className="h-auto min-h-11 w-full whitespace-normal py-3 bg-emerald-600 hover:bg-emerald-700 text-white border-0 shadow-lg transition-all duration-200">
                            <MapPin className="w-4 h-4 mr-2" />
                            Explore {currentBird.primaryRegion}
                          </Button>
                        </Link>
                      )}

                      {/* Species Reference */}
                      {shouldShowBirdGuideButton && (
                        <a
                          href={speciesSource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg transition-all duration-200 hover:scale-[1.02]">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Read Species Guide
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Photo Credit Panel - Version 1 Style: Compact Popup */}
            {showPhotoCredit && !showInfo && (
              <div className="absolute top-16 right-3 z-[60]">
                <div className="bg-black/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg text-sm shadow-xl transition-all duration-300 animate-in slide-in-from-top-2 min-w-[200px] max-w-[280px] border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 flex-shrink-0" />
                      <span className="font-medium text-xs">Photo & Recording Credits</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-5 h-5 p-0 rounded-full hover:bg-white/20 text-white border-0 flex-shrink-0"
                      onClick={() => setShowPhotoCredit(false)}
                      aria-label="Close credits"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {/* Photographer */}
                    <div>
                      <span className="text-white/60 text-xs block">Photographer:</span>
                      <div className="text-white text-sm font-medium">
                        {currentBird.photoCredit.teamLink ? (
                          <Link
                            href={currentBird.photoCredit.teamLink}
                            className={cn(
                              "transition-colors underline decoration-dotted underline-offset-2",
                              regionColors.base,
                              regionColors.hover,
                            )}
                          >
                            {currentBird.photoCredit.photographer}
                          </Link>
                        ) : (
                          currentBird.photoCredit.photographer
                        )}
                      </div>
                      {currentBird.photoCredit.title && (
                        <div className="text-white/70 text-xs">{currentBird.photoCredit.title}</div>
                      )}
                    </div>

                    {/* Location */}
                    {currentBird.photoCredit.reserve && (
                      <div>
                        <span className="text-white/60 text-xs block">Location:</span>
                        <div className="text-white/90 text-sm">
                          {currentBird.photoCredit.reserveLink ? (
                            <Link
                              href={currentBird.photoCredit.reserveLink}
                              className={cn(
                                "transition-colors underline decoration-dotted underline-offset-2",
                                regionColors.base,
                                regionColors.hover,
                              )}
                            >
                              {currentBird.photoCredit.reserve}
                            </Link>
                          ) : (
                            currentBird.photoCredit.reserve
                          )}
                        </div>
                      </div>
                    )}

                    {currentBird.audioFile && <div>
                      <Link href={`/credits#audio-${currentBird.id}`} className="text-white/90 text-xs underline underline-offset-2">
                        Bird recording & licence
                      </Link>
                    </div>}

                    {/* Photograph Source Link */}
                    {currentBird.photoCredit.instagramPost && (
                      <div className="pt-2 border-t border-white/10">
                        <a
                          href={currentBird.photoCredit.instagramPost}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "inline-flex items-center gap-1.5 text-xs transition-colors",
                            regionColors.base,
                            regionColors.hover,
                          )}
                        >
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                          <span>View photograph source</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-emerald-100 bg-white px-4 py-4 text-sm">
            <p className="flex items-center gap-2 font-semibold text-emerald-800"><MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />Where to find it</p>
            <p className="mt-2 leading-relaxed text-gray-600">{currentBird.localOccurrence || currentBird.distribution}</p>
            {currentBird.audioFile && <p className="mt-2 text-xs text-gray-500">Recording: {currentBird.audioLabel || "Wild bird field recording"}.</p>}
            {!currentBird.audioFile && <p className="mt-2 text-xs text-gray-500">A recording is not yet available for this bird.</p>}
          </div>
          <p className="sr-only" role="status" aria-live={isPlaying ? "off" : "polite"}>{currentBird.commonName}, bird {currentIndex + 1} of {birdData.length}. {currentBird.localOccurrence || currentBird.distribution}</p>
          {/* Enhanced Thumbnail Navigation with Scroll Controls */}
          <div className="grid grid-cols-[44px_minmax(0,1fr)_44px] items-center gap-1 px-2 bg-gradient-to-r from-emerald-50 to-blue-50 border-t border-emerald-100">
            {/* Scroll Left Button */}
              <Button
                variant="ghost"
                size="sm"
                className="col-start-1 row-start-1 h-11 w-11 p-0 rounded-full bg-white/80 hover:bg-white shadow-md border border-emerald-200 disabled:opacity-30"
                disabled={!canScrollThumbnails("left")}
                onClick={() => scrollThumbnails("left")}
                aria-label="Scroll thumbnails left"
              >
                <ChevronLeft className="w-4 h-4 text-emerald-700" />
              </Button>

            {/* Scroll Right Button */}
              <Button
                variant="ghost"
                size="sm"
                className="col-start-3 row-start-1 h-11 w-11 p-0 rounded-full bg-white/80 hover:bg-white shadow-md border border-emerald-200 disabled:opacity-30"
                disabled={!canScrollThumbnails("right")}
                onClick={() => scrollThumbnails("right")}
                aria-label="Scroll thumbnails right"
              >
                <ChevronRight className="w-4 h-4 text-emerald-700" />
              </Button>

            {/* Thumbnail Container */}
            <div
              ref={thumbnailContainerRef}
              onScroll={event => setThumbnailScrollPosition(event.currentTarget.scrollLeft)}
              className="relative col-start-2 row-start-1 min-w-0 flex gap-2 p-3 overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {birdData.map((bird, index) => (
                <button
                  key={bird.id}
                  className={cn(
                    "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105",
                    index === currentIndex
                      ? "border-emerald-500 ring-2 ring-emerald-200 shadow-lg"
                      : "border-gray-200 hover:border-emerald-300 shadow-sm",
                  )}
                  onClick={() => goToSlide(index)}
                  aria-label={`View ${bird.commonName}`}
                  aria-pressed={index === currentIndex}
                >
                  <Image
                    src={sitePath(bird.image || "/placeholder.svg")}
                    alt=""
                    loading="lazy"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: getImagePositioning(bird.id).objectPosition,
                      transform: "none",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
