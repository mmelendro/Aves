"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Play, MapPin, Pause, ExternalLink, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import YouTubeBackground from "@/components/youtube-background"
import { cn } from "@/lib/utils"

interface VideoSlide {
  id: string
  title: string
  region: string
  description: string
  videoId: string
  thumbnail?: string
  isActive?: boolean
  fallbackVideoId?: string
  embedRestricted?: boolean
  youtubeUrl?: string
}

// Enhanced video configuration with verified IDs and comprehensive metadata
const videoSlides: VideoSlide[] = [
  {
    id: "sierra-nevada-tayrona",
    title: "Sierra Nevada & Tayrona National Park",
    region: "Caribbean Coast",
    description:
      "Discover the breathtaking landscapes where our birding adventures take place - from pristine Caribbean coastlines to cloud-covered mountain peaks.",
    videoId: "eEteVfDagrs", // Verified Tayrona video - FIRST
    isActive: true,
    youtubeUrl: "https://youtu.be/eEteVfDagrs?si=yLmhG5TeKW16jlqE",
  },
  {
    id: "los-besotes-eco-park-cesar",
    title: "Los Besotes Eco-Park (Cesar)",
    region: "Sierra Nevada de Santa Marta",
    description:
      "Stunning 4K aerial footage of Los Besotes Eco-Park near Valledupar, Cesar, showcasing the breathtaking landscapes of Sierra Nevada de Santa Marta, Colombia.",
    videoId: "q6C9UuqvFlE", // Cesar/Besotes video - has embedding restrictions
    isActive: true,
    fallbackVideoId: "eEteVfDagrs", // Fallback to Tayrona if this video fails
    embedRestricted: true, // Flag for potential embedding issues
    youtubeUrl: "https://youtu.be/q6C9UuqvFlE?si=zTYq0_qaqth0WDty",
  },
  {
    id: "los-besotes-eco-park-alternative",
    title: "Los Besotes Eco-Park (Alternative View)",
    region: "Sierra Nevada de Santa Marta",
    description:
      "Alternative aerial perspective of Los Besotes Eco-Park, featuring sweeping views of dry tropical forests and the rugged southeastern slopes of the Sierra Nevada de Santa Marta mountains.",
    videoId: "q6C9UuqvFlE", // Same video ID but different presentation
    isActive: true,
    fallbackVideoId: "eEteVfDagrs", // Fallback to Tayrona if this video fails
    embedRestricted: true, // Flag for potential embedding issues
    youtubeUrl: "https://youtu.be/q6C9UuqvFlE?si=ZSxPXhNUcRsjpMUw",
  },
  // Future videos ready for activation:
  {
    id: "choco-bioregion",
    title: "Chocó Bioregion",
    region: "Pacific Coast",
    description:
      "Explore one of the world's most biodiverse regions, home to countless endemic species and lush rainforests.",
    videoId: "PLACEHOLDER_CHOCO", // To be replaced with actual video ID
    isActive: false, // Set to true when video is ready
  },
  {
    id: "eastern-cordillera",
    title: "Eastern Cordillera",
    region: "Andean Mountains",
    description: "Journey through high-altitude cloud forests and páramo ecosystems where rare endemic birds thrive.",
    videoId: "PLACEHOLDER_CORDILLERA", // To be replaced with actual video ID
    isActive: false,
  },
].filter((slide) => slide.isActive) // Only show active videos

interface VideoSliderProps {
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
}

export default function VideoSlider({ className, autoPlay = false, autoPlayInterval = 15000 }: VideoSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  // Enhanced error handling and logging
  const [videoErrors, setVideoErrors] = useState<Record<string, string>>({})
  const [debugMode, setDebugMode] = useState(false)
  const [retryAttempts, setRetryAttempts] = useState<Record<string, number>>({})

  // Logging utility
  const logCarouselEvent = useCallback(
    (event: string, data?: any) => {
      if (debugMode || process.env.NODE_ENV === "development") {
        console.log(`[VideoCarousel] ${event}:`, data)
      }
    },
    [debugMode],
  )

  // Video validation and error handling
  const handleVideoError = useCallback(
    (slideId: string, error: string) => {
      logCarouselEvent("Video Error", { slideId, error })
      setVideoErrors((prev) => ({ ...prev, [slideId]: error }))

      // Track retry attempts
      setRetryAttempts((prev) => ({
        ...prev,
        [slideId]: (prev[slideId] || 0) + 1,
      }))
    },
    [logCarouselEvent],
  )

  // Ensure we have valid slides
  const activeSlides = videoSlides.length > 0 ? videoSlides : []
  const totalSlides = activeSlides.length

  // Auto-play functionality with better control
  useEffect(() => {
    if (!isAutoPlaying || totalSlides <= 1) return

    const interval = setInterval(() => {
      if (!isTransitioning) {
        handleNext()
      }
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isAutoPlaying, autoPlayInterval, isTransitioning, totalSlides])

  // Enhanced transition handler with validation and logging
  const handleTransition = useCallback(
    (newIndex: number) => {
      if (isTransitioning || newIndex === currentIndex || totalSlides === 0) {
        logCarouselEvent("Transition Blocked", {
          reason: isTransitioning ? "already transitioning" : newIndex === currentIndex ? "same index" : "no slides",
          currentIndex,
          newIndex,
          totalSlides,
        })
        return
      }

      const targetSlide = activeSlides[newIndex]
      logCarouselEvent("Transition Started", { from: currentIndex, to: newIndex, slide: targetSlide.title })

      setIsTransitioning(true)
      setIsVideoLoaded(false)

      setTimeout(() => {
        setCurrentIndex(newIndex)
        logCarouselEvent("Video Changed", {
          newIndex,
          videoId: targetSlide.videoId,
          title: targetSlide.title,
        })

        setTimeout(() => {
          setIsTransitioning(false)
          setIsVideoLoaded(true)
          logCarouselEvent("Transition Completed", { index: newIndex })
        }, 100)
      }, 200)
    },
    [currentIndex, isTransitioning, totalSlides, activeSlides, logCarouselEvent],
  )

  const handlePrevious = useCallback(() => {
    setIsAutoPlaying(false)
    const newIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1
    handleTransition(newIndex)
  }, [currentIndex, totalSlides, handleTransition])

  const handleNext = useCallback(() => {
    const newIndex = (currentIndex + 1) % totalSlides
    handleTransition(newIndex)
  }, [currentIndex, totalSlides, handleTransition])

  const handleSlideClick = useCallback(
    (index: number) => {
      setIsAutoPlaying(false)
      handleTransition(index)
    },
    [handleTransition],
  )

  // Handle video load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoLoaded(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [currentIndex])

  const getRegionStyling = useCallback((slideId: string, region: string) => {
    const styles = {
      "sierra-nevada-tayrona": {
        gradient: "bg-gradient-to-br from-blue-100 via-cyan-50 to-emerald-100",
        icon: "🏖️",
        color: "text-blue-600",
      },
      "los-besotes-eco-park-cesar": {
        gradient: "bg-gradient-to-br from-emerald-100 via-green-50 to-blue-100",
        icon: "🏔️",
        color: "text-emerald-600",
      },
      "los-besotes-eco-park-alternative": {
        gradient: "bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100",
        icon: "🌲",
        color: "text-green-600",
      },
      "choco-bioregion": {
        gradient: "bg-gradient-to-br from-teal-100 via-emerald-50 to-green-100",
        icon: "🌊",
        color: "text-teal-600",
      },
      "eastern-cordillera": {
        gradient: "bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100",
        icon: "⛰️",
        color: "text-slate-600",
      },
    }

    return (
      styles[slideId as keyof typeof styles] || {
        gradient: "bg-gradient-to-br from-gray-100 to-gray-200",
        icon: "📹",
        color: "text-gray-600",
      }
    )
  }, [])

  // Handle video retry
  const handleVideoRetry = useCallback(
    (slideId: string) => {
      setVideoErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[slideId]
        return newErrors
      })
      setIsVideoLoaded(false)
      setTimeout(() => setIsVideoLoaded(true), 100)
      logCarouselEvent("Video Retry", { slideId })
    },
    [logCarouselEvent],
  )

  if (totalSlides === 0) {
    return (
      <div className={cn("relative aspect-video rounded-2xl bg-gray-100 flex items-center justify-center", className)}>
        <p className="text-gray-500">No videos available</p>
      </div>
    )
  }

  const currentSlide = activeSlides[currentIndex]

  return (
    <div className={cn("relative w-full", className)}>
      {/* Debug and Error Controls - Development Only */}
      {(process.env.NODE_ENV === "development" || debugMode) && (
        <div className="mb-4 p-3 bg-gray-100 rounded-lg text-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Debug Controls</span>
            <Button size="sm" variant="outline" onClick={() => setDebugMode(!debugMode)} className="text-xs">
              {debugMode ? "Hide Debug" : "Show Debug"}
            </Button>
          </div>
          {debugMode && (
            <div className="space-y-1 text-xs">
              <div>Current Index: {currentIndex}</div>
              <div>Total Slides: {totalSlides}</div>
              <div>Current Slide: {currentSlide?.title}</div>
              <div>Is Transitioning: {isTransitioning.toString()}</div>
              <div>Video Loaded: {isVideoLoaded.toString()}</div>
              <div>Current Video ID: {currentSlide?.videoId}</div>
              <div>Embed Restricted: {currentSlide?.embedRestricted?.toString()}</div>
              {Object.keys(videoErrors).length > 0 && (
                <div className="text-red-600">Errors: {JSON.stringify(videoErrors, null, 2)}</div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Main Video Display */}
      <div className="relative w-full">
        <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white relative bg-gray-900">
          {/* Video Player or Fallback */}
          {currentSlide.embedRestricted && (retryAttempts[currentSlide.id] > 0 || videoErrors[currentSlide.id]) ? (
            // Fallback display for embed-restricted videos
            <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center relative">
              <div className="text-center space-y-4 p-6">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                  <AlertCircle className="w-10 h-10 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{currentSlide.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 max-w-md">
                    This video has embedding restrictions. Click below to watch it directly on YouTube.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button
                      onClick={() => window.open(currentSlide.youtubeUrl, "_blank")}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      Watch on YouTube
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleVideoRetry(currentSlide.id)}
                      className="text-emerald-600 border-emerald-600 hover:bg-emerald-50"
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              </div>

              {/* Overlay gradient for visual consistency */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10 pointer-events-none" />
            </div>
          ) : (
            // Normal video player
            <YouTubeBackground
              videoId={currentSlide.videoId}
              className={cn(
                "w-full h-full transition-all duration-500 ease-in-out",
                isTransitioning ? "opacity-50 scale-95" : "opacity-100 scale-100",
                !isVideoLoaded && "opacity-75",
              )}
              overlay={true}
              controls={true}
              startTime={0}
              onError={() => {
                handleVideoError(currentSlide.id, "Video failed to load - may have embedding restrictions")
              }}
            />
          )}

          {/* Loading overlay */}
          {isTransitioning && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
              <div className="bg-white/90 rounded-full p-3 shadow-lg">
                <div className="animate-spin w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full"></div>
              </div>
            </div>
          )}

          {/* Navigation Arrows - Only show if more than 1 video */}
          {totalSlides > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white border-2 border-white/50 hover:border-white shadow-lg hover:shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handlePrevious}
                disabled={isTransitioning}
                aria-label="Previous video"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white border-2 border-white/50 hover:border-white shadow-lg hover:shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleNext}
                disabled={isTransitioning}
                aria-label="Next video"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </Button>
            </>
          )}

          {/* Region Badge */}
          <Badge className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 bg-emerald-600/90 text-white border-0 shadow-lg backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm">
            <MapPin className="w-3 h-3 mr-1" />
            {currentSlide.region}
          </Badge>

          {/* Video Counter */}
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 bg-black/50 text-white rounded-full px-2 py-1 text-xs backdrop-blur-sm">
            {currentIndex + 1} / {totalSlides}
          </div>

          {/* Auto-play control */}
          {totalSlides > 1 && (
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-16 sm:bottom-20 right-3 sm:right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white border border-white/50 hover:border-white shadow-md backdrop-blur-sm transition-all duration-300"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              aria-label={isAutoPlaying ? "Pause auto-play" : "Start auto-play"}
            >
              {isAutoPlaying ? (
                <Pause className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
              ) : (
                <Play className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
              )}
            </Button>
          )}

          {/* Slide Indicators - Only show if more than 1 video */}
          {totalSlides > 1 && (
            <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
              {activeSlides.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "transition-all duration-300 rounded-full border border-white/30",
                    index === currentIndex
                      ? "w-6 sm:w-8 h-2.5 sm:h-3 bg-white shadow-md"
                      : "w-2.5 sm:w-3 h-2.5 sm:h-3 bg-white/60 hover:bg-white/80 hover:scale-110",
                    isTransitioning && "opacity-50",
                  )}
                  onClick={() => handleSlideClick(index)}
                  disabled={isTransitioning}
                  aria-label={`Go to ${activeSlides[index].title}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Video Caption */}
        <div className="absolute -bottom-3 sm:-bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-white rounded-full px-4 sm:px-6 py-1.5 sm:py-2 shadow-lg border border-gray-200">
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
              <Play className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
              <span className="whitespace-nowrap">Aerial footage of Colombia's premier birding destinations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Video Information with Dynamic Updates */}
      <div className="mt-6 sm:mt-8 text-center px-2 sm:px-4">
        <h2
          className={cn(
            "text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 transition-all duration-500",
            "leading-tight max-w-4xl mx-auto min-h-[2.5rem] sm:min-h-[3rem]", // Prevent layout shift
            isTransitioning ? "opacity-60 translate-y-1" : "opacity-100 translate-y-0",
          )}
          key={`title-${currentIndex}`} // Force re-render on change
        >
          {currentSlide.title}
        </h2>
        <p
          className={cn(
            "text-xs sm:text-sm md:text-base text-gray-600 max-w-3xl mx-auto transition-all duration-500",
            "leading-relaxed min-h-[3rem] sm:min-h-[3.5rem] flex items-center justify-center", // Prevent layout shift
            isTransitioning ? "opacity-60 translate-y-1" : "opacity-100 translate-y-0",
          )}
          key={`description-${currentIndex}`} // Force re-render on change
        >
          {currentSlide.description}
        </p>

        {/* Additional info for embed-restricted videos */}
        {currentSlide.embedRestricted && (
          <div className="mt-3 flex items-center justify-center space-x-2 text-xs text-gray-500">
            <AlertCircle className="w-3 h-3" />
            <span>Video available on YouTube</span>
          </div>
        )}

        {/* Video metadata for debugging */}
        {debugMode && (
          <div className="mt-2 text-xs text-gray-400">
            Video ID: {currentSlide.videoId} | Region: {currentSlide.region} | Restricted:{" "}
            {currentSlide.embedRestricted?.toString()}
          </div>
        )}
      </div>

      {/* Enhanced Thumbnail Navigation - Scalable Design */}
      {totalSlides > 1 && (
        <div className="mt-4 sm:mt-6 flex justify-center">
          <div
            className={cn(
              "flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto pb-2 px-4",
              "scrollbar-hide", // Hide scrollbar for cleaner look
              totalSlides <= 4 ? "justify-center" : "justify-start",
            )}
          >
            {activeSlides.map((slide, index) => {
              const styling = getRegionStyling(slide.id, slide.region)
              return (
                <button
                  key={slide.id}
                  className={cn(
                    "relative group transition-all duration-300 flex-shrink-0",
                    "border-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md",
                    "w-20 sm:w-24 md:w-28 lg:w-32", // Responsive width for scalability
                    index === currentIndex
                      ? "border-emerald-500 ring-2 ring-emerald-200 scale-105"
                      : "border-gray-200 hover:border-emerald-300 hover:scale-102",
                    isTransitioning && index === currentIndex && "opacity-75",
                  )}
                  onClick={() => handleSlideClick(index)}
                  disabled={isTransitioning}
                  aria-label={`View ${slide.title}`}
                >
                  <div
                    className={cn(
                      "h-14 sm:h-16 md:h-18 lg:h-20 flex items-center justify-center relative",
                      styling.gradient,
                    )}
                  >
                    <div className="text-center">
                      <Play className={cn("w-3 h-3 sm:w-4 sm:h-4 mx-auto mb-1", styling.color)} />
                      <div className="text-xs font-medium text-gray-700 leading-tight px-1 truncate">
                        {slide.region}
                      </div>
                    </div>
                    {/* Region icon overlay */}
                    <div className="absolute top-1 right-1 opacity-40 text-xs sm:text-sm">{styling.icon}</div>

                    {/* Embed restriction indicator */}
                    {slide.embedRestricted && (
                      <div className="absolute bottom-1 left-1 opacity-60">
                        <ExternalLink className="w-2 h-2 sm:w-3 sm:h-3 text-gray-600" />
                      </div>
                    )}
                  </div>

                  {/* Current slide indicator */}
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-emerald-600/10 backdrop-blur-[0.5px]" />
                  )}

                  {/* Video title below thumbnail */}
                  <div className="absolute -bottom-5 sm:-bottom-6 left-1/2 transform -translate-x-1/2 w-full">
                    <div className="text-xs text-center text-gray-500 font-medium truncate px-1">
                      {slide.id === "sierra-nevada-tayrona"
                        ? "Tayrona"
                        : slide.id === "los-besotes-eco-park-cesar"
                          ? "Cesar"
                          : slide.id === "los-besotes-eco-park-alternative"
                            ? "Besotes"
                            : slide.title.split(" ")[0]}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Spacing buffer to prevent overlap */}
      <div className="h-6 sm:h-8"></div>
    </div>
  )
}
