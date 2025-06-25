"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Play, Pause, ExternalLink, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import YouTubeBackground from "@/components/youtube-background"
import { cn } from "@/lib/utils"

interface VideoData {
  id: string
  title: string
  description: string
  region: string
  videoId: string
  youtubeUrl: string
  embedRestricted?: boolean
  isPlaceholder?: boolean
  thumbnailUrl?: string
}

// Enhanced video configuration with real and placeholder videos
const videoData: VideoData[] = [
  {
    id: "tayrona-sierra-nevada",
    title: "Sierra Nevada & Tayrona National Park",
    description:
      "Discover the breathtaking landscapes where our birding adventures take place - from pristine Caribbean coastlines to cloud-covered mountain peaks, showcasing Colombia's incredible biodiversity and natural beauty.",
    region: "Caribbean Coast",
    videoId: "eEteVfDagrs",
    youtubeUrl: "https://youtu.be/eEteVfDagrs?si=8WhhSGrDvLHiXPAf",
  },
  {
    id: "los-besotes-eco-park",
    title: "Los Besotes Eco-Park",
    description:
      "Stunning 4K aerial footage of Los Besotes Eco-Park showcasing the breathtaking dry tropical forests and rugged landscapes of the Sierra Nevada de Santa Marta region, home to incredible endemic bird species.",
    region: "Sierra Nevada de Santa Marta",
    videoId: "q6C9UuqvFlE",
    youtubeUrl: "https://youtu.be/q6C9UuqvFlE?si=E97YfXnbhlWEAQtI",
    embedRestricted: true,
  },
  {
    id: "choco-bioregion",
    title: "Chocó Bioregion",
    description:
      "Explore one of the world's most biodiverse regions along Colombia's Pacific coast, home to countless endemic species and lush rainforests where rare birds thrive in pristine tropical ecosystems.",
    region: "Pacific Coast",
    videoId: "PLACEHOLDER_CHOCO",
    youtubeUrl: "#",
    isPlaceholder: true,
  },
  {
    id: "eastern-cordillera",
    title: "Eastern Cordillera",
    description:
      "Journey through high-altitude cloud forests and páramo ecosystems of the Eastern Cordillera, where rare endemic birds and unique Andean species create unforgettable birding experiences.",
    region: "Andean Mountains",
    videoId: "PLACEHOLDER_CORDILLERA",
    youtubeUrl: "#",
    isPlaceholder: true,
  },
  {
    id: "amazon-rainforest",
    title: "Amazon Rainforest",
    description:
      "Venture into the heart of the Colombian Amazon, where the world's most biodiverse ecosystem harbors hundreds of bird species, from colorful parrots to elusive antbirds in pristine jungle settings.",
    region: "Amazon Basin",
    videoId: "PLACEHOLDER_AMAZON",
    youtubeUrl: "#",
    isPlaceholder: true,
  },
]

interface VideoCarouselProps {
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
}

export default function VideoCarousel({ className, autoPlay = false, autoPlayInterval = 15000 }: VideoCarouselProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isVideoLoading, setIsVideoLoading] = useState(true)
  const [videoError, setVideoError] = useState<string | null>(null)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)
  const [thumbnailsLoaded, setThumbnailsLoaded] = useState<Set<string>>(new Set())
  const [isTransitioning, setIsTransitioning] = useState(false)

  const thumbnailContainerRef = useRef<HTMLDivElement>(null)
  const currentVideo = videoData[currentVideoIndex]

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || videoData.length <= 1) return

    const interval = setInterval(() => {
      if (!isTransitioning) {
        setCurrentVideoIndex((prev) => (prev + 1) % videoData.length)
      }
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isAutoPlaying, autoPlayInterval, isTransitioning])

  // Handle video selection with smooth transition
  const handleVideoSelect = useCallback(
    (index: number) => {
      if (index === currentVideoIndex || isTransitioning) return

      setIsAutoPlaying(false)
      setIsTransitioning(true)
      setVideoError(null)

      // Smooth transition effect
      setTimeout(() => {
        setIsVideoLoading(true)
        setCurrentVideoIndex(index)

        // Scroll thumbnail into view
        if (thumbnailContainerRef.current) {
          const thumbnail = thumbnailContainerRef.current.children[index] as HTMLElement
          if (thumbnail) {
            thumbnail.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "center",
            })
          }
        }

        setTimeout(() => {
          setIsTransitioning(false)
        }, 300)
      }, 150)
    },
    [currentVideoIndex, isTransitioning],
  )

  // Navigation functions
  const handlePrevious = useCallback(() => {
    const newIndex = currentVideoIndex === 0 ? videoData.length - 1 : currentVideoIndex - 1
    handleVideoSelect(newIndex)
  }, [currentVideoIndex, handleVideoSelect])

  const handleNext = useCallback(() => {
    const newIndex = (currentVideoIndex + 1) % videoData.length
    handleVideoSelect(newIndex)
  }, [currentVideoIndex, handleVideoSelect])

  // Handle video load events
  const handleVideoLoad = useCallback(() => {
    setIsVideoLoading(false)
    setVideoError(null)
  }, [])

  const handleVideoError = useCallback((error: string) => {
    setIsVideoLoading(false)
    setVideoError(error)
  }, [])

  // Lazy load thumbnail
  const handleThumbnailLoad = useCallback((videoId: string) => {
    setThumbnailsLoaded((prev) => new Set([...prev, videoId]))
  }, [])

  // Generate thumbnail URL
  const getThumbnailUrl = useCallback((video: VideoData) => {
    if (video.isPlaceholder) {
      return `/placeholder.svg?height=120&width=200&text=${encodeURIComponent("Coming Soon")}`
    }
    return `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`
  }, [])

  // Get region styling
  const getRegionStyling = useCallback((region: string) => {
    const styles = {
      "Caribbean Coast": {
        gradient: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
        icon: "🏖️",
        borderColor: "border-blue-200",
      },
      "Sierra Nevada de Santa Marta": {
        gradient: "from-emerald-500 to-green-500",
        bgColor: "bg-emerald-50",
        textColor: "text-emerald-700",
        icon: "🏔️",
        borderColor: "border-emerald-200",
      },
      "Pacific Coast": {
        gradient: "from-teal-500 to-emerald-500",
        bgColor: "bg-teal-50",
        textColor: "text-teal-700",
        icon: "🌊",
        borderColor: "border-teal-200",
      },
      "Andean Mountains": {
        gradient: "from-slate-500 to-blue-500",
        bgColor: "bg-slate-50",
        textColor: "text-slate-700",
        icon: "⛰️",
        borderColor: "border-slate-200",
      },
      "Amazon Basin": {
        gradient: "from-green-600 to-emerald-600",
        bgColor: "bg-green-50",
        textColor: "text-green-700",
        icon: "🌳",
        borderColor: "border-green-200",
      },
    }

    return (
      styles[region as keyof typeof styles] || {
        gradient: "from-gray-500 to-gray-600",
        bgColor: "bg-gray-50",
        textColor: "text-gray-700",
        icon: "📹",
        borderColor: "border-gray-200",
      }
    )
  }, [])

  const regionStyle = getRegionStyling(currentVideo.region)

  return (
    <div className={cn("w-full space-y-6", className)}>
      {/* Main Video Player */}
      <div className="relative">
        <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-900 relative border-4 border-white">
          {/* Video Player or Error/Placeholder State */}
          {videoError || currentVideo.isPlaceholder || (currentVideo.embedRestricted && !isVideoLoading) ? (
            <div className={cn("w-full h-full flex items-center justify-center", regionStyle.bgColor)}>
              <div className="text-center space-y-4 p-8 max-w-md">
                <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  {currentVideo.isPlaceholder ? (
                    <span className="text-3xl">{regionStyle.icon}</span>
                  ) : (
                    <AlertCircle className="w-10 h-10 text-emerald-600" />
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">{currentVideo.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {currentVideo.isPlaceholder
                      ? "This exciting destination video is coming soon! Stay tuned for breathtaking footage of Colombia's diverse ecosystems."
                      : "This video has embedding restrictions. Click below to watch it directly on YouTube."}
                  </p>
                </div>
                {!currentVideo.isPlaceholder && (
                  <Button
                    onClick={() => window.open(currentVideo.youtubeUrl, "_blank")}
                    className="bg-emerald-600 hover:bg-emerald-700 shadow-lg"
                  >
                    Watch on YouTube
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <YouTubeBackground
              videoId={currentVideo.videoId}
              className={cn(
                "w-full h-full transition-all duration-500 ease-in-out",
                isTransitioning ? "opacity-50 scale-95" : "opacity-100 scale-100",
              )}
              overlay={true}
              controls={true}
              onLoad={handleVideoLoad}
              onError={() => handleVideoError("Failed to load video")}
            />
          )}

          {/* Loading Overlay */}
          {(isVideoLoading || isTransitioning) && !currentVideo.isPlaceholder && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
              <div className="bg-white/95 rounded-full p-4 shadow-xl">
                <div className="animate-spin w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full"></div>
              </div>
            </div>
          )}

          {/* Region Badge */}
          <Badge
            className={cn(
              "absolute top-4 left-4 z-20 bg-gradient-to-r text-white border-0 shadow-lg backdrop-blur-sm px-3 py-1.5 text-sm",
              regionStyle.gradient,
            )}
          >
            <span className="mr-1">{regionStyle.icon}</span>
            {currentVideo.region}
          </Badge>

          {/* Video Counter */}
          <div className="absolute top-4 right-4 z-20 bg-black/60 text-white rounded-full px-3 py-1 text-sm backdrop-blur-sm border border-white/20">
            {currentVideoIndex + 1} / {videoData.length}
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 hover:bg-white border-2 border-white/50 hover:border-white shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-110"
            onClick={handlePrevious}
            disabled={isTransitioning}
            aria-label="Previous video"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 hover:bg-white border-2 border-white/50 hover:border-white shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-110"
            onClick={handleNext}
            disabled={isTransitioning}
            aria-label="Next video"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </Button>

          {/* Auto-play Toggle */}
          <Button
            variant="outline"
            size="icon"
            className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-white/50 shadow-lg backdrop-blur-sm transition-all duration-300"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            aria-label={isAutoPlaying ? "Pause auto-play" : "Start auto-play"}
          >
            {isAutoPlaying ? <Pause className="w-4 h-4 text-gray-700" /> : <Play className="w-4 h-4 text-gray-700" />}
          </Button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
            {videoData.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "transition-all duration-300 rounded-full border border-white/30",
                  index === currentVideoIndex
                    ? "w-8 h-3 bg-white shadow-md"
                    : "w-3 h-3 bg-white/60 hover:bg-white/80 hover:scale-110",
                  isTransitioning && "opacity-50",
                )}
                onClick={() => handleVideoSelect(index)}
                disabled={isTransitioning}
                aria-label={`Go to ${videoData[index].title}`}
              />
            ))}
          </div>
        </div>

        {/* Video Information */}
        <div className="mt-6 text-center space-y-3">
          <h2
            className={cn(
              "text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight transition-all duration-500",
              isTransitioning ? "opacity-60 translate-y-2" : "opacity-100 translate-y-0",
            )}
          >
            {currentVideo.title}
          </h2>
          <p
            className={cn(
              "text-gray-600 max-w-4xl mx-auto leading-relaxed text-base md:text-lg transition-all duration-500",
              isTransitioning ? "opacity-60 translate-y-2" : "opacity-100 translate-y-0",
            )}
          >
            {currentVideo.description}
          </p>

          {/* Additional Info */}
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            {currentVideo.embedRestricted && (
              <div className="flex items-center space-x-1">
                <AlertCircle className="w-4 h-4" />
                <span>Available on YouTube</span>
              </div>
            )}
            {currentVideo.isPlaceholder && (
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                <span>Coming Soon</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="relative">
        <div
          ref={thumbnailContainerRef}
          className="flex space-x-4 overflow-x-auto pb-4 px-4 scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {videoData.map((video, index) => {
            const isSelected = index === currentVideoIndex
            const isLoaded = thumbnailsLoaded.has(video.id)
            const styling = getRegionStyling(video.region)

            return (
              <button
                key={video.id}
                onClick={() => handleVideoSelect(index)}
                disabled={isTransitioning}
                className={cn(
                  "relative flex-shrink-0 w-56 h-32 rounded-xl overflow-hidden transition-all duration-300",
                  "border-3 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
                  isSelected
                    ? "border-emerald-500 ring-2 ring-emerald-200 scale-105 shadow-emerald-200/50"
                    : cn("border-gray-200 hover:border-emerald-300 hover:scale-102", styling.borderColor),
                  isTransitioning && "opacity-75",
                )}
                aria-label={`Play ${video.title}`}
              >
                {/* Thumbnail Image */}
                <div className="relative w-full h-full bg-gray-100">
                  {!video.isPlaceholder ? (
                    <img
                      src={getThumbnailUrl(video) || "/placeholder.svg"}
                      alt={`${video.title} thumbnail`}
                      className={cn(
                        "w-full h-full object-cover transition-opacity duration-300",
                        isLoaded ? "opacity-100" : "opacity-0",
                      )}
                      onLoad={() => handleThumbnailLoad(video.id)}
                      loading="lazy"
                    />
                  ) : (
                    <div className={cn("w-full h-full flex items-center justify-center", styling.bgColor)}>
                      <div className="text-center">
                        <div className="text-3xl mb-2">{styling.icon}</div>
                        <div className="text-sm font-medium text-gray-700">Coming Soon</div>
                        <div className="text-xs text-gray-500 mt-1">{video.region}</div>
                      </div>
                    </div>
                  )}

                  {/* Loading State */}
                  {!video.isPlaceholder && !isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <div className="animate-spin w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full"></div>
                    </div>
                  )}

                  {/* Play Overlay */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300",
                      isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                    )}
                  >
                    <div className="w-12 h-12 bg-white/95 rounded-full flex items-center justify-center shadow-lg">
                      <Play className="w-6 h-6 text-gray-700 ml-0.5" />
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  {isSelected && <div className="absolute inset-0 bg-emerald-600/10 backdrop-blur-[0.5px]" />}

                  {/* Status Indicators */}
                  <div className="absolute top-2 right-2 flex space-x-1">
                    {video.embedRestricted && (
                      <div className="w-6 h-6 bg-black/60 rounded-full flex items-center justify-center">
                        <ExternalLink className="w-3 h-3 text-white" />
                      </div>
                    )}
                    {video.isPlaceholder && (
                      <div className="w-6 h-6 bg-amber-500/80 rounded-full flex items-center justify-center">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Thumbnail Title */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3">
                  <div className="text-white text-sm font-semibold leading-tight">
                    {video.title.length > 35 ? `${video.title.substring(0, 35)}...` : video.title}
                  </div>
                  <div className="text-white/90 text-xs mt-1 flex items-center">
                    <span className="mr-1">{styling.icon}</span>
                    {video.region}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Scroll Fade Indicators */}
        <div className="absolute top-0 bottom-4 left-0 w-8 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />
        <div className="absolute top-0 bottom-4 right-0 w-8 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none" />
      </div>

      {/* Caption */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 text-sm text-gray-600 bg-white rounded-full px-6 py-3 shadow-md border border-gray-200">
          <Play className="w-4 h-4 text-emerald-600" />
          <span className="font-medium">Aerial footage of Colombia's premier birding destinations</span>
        </div>
      </div>
    </div>
  )
}
