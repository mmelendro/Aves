"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Play, Pause, ExternalLink, AlertCircle } from "lucide-react"
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
  thumbnailUrl?: string
  youtubeUrl: string
  embedRestricted?: boolean
  isActive: boolean
}

// Video configuration with enhanced metadata
const videoData: VideoData[] = [
  {
    id: "tayrona-sierra-nevada",
    title: "Sierra Nevada & Tayrona National Park",
    description:
      "Discover the breathtaking landscapes where our birding adventures take place - from pristine Caribbean coastlines to cloud-covered mountain peaks, showcasing Colombia's incredible biodiversity.",
    region: "Caribbean Coast",
    videoId: "eEteVfDagrs",
    youtubeUrl: "https://youtu.be/eEteVfDagrs?si=yLmhG5TeKW16jlqE",
    isActive: true,
  },
  {
    id: "cesar-besotes-region",
    title: "Los Besotes Eco-Park (Cesar Region)",
    description:
      "Stunning 4K aerial footage of Los Besotes Eco-Park near Valledupar in the Cesar region, showcasing the breathtaking dry tropical forests of Sierra Nevada de Santa Marta.",
    region: "Sierra Nevada de Santa Marta",
    videoId: "q6C9UuqvFlE",
    youtubeUrl: "https://youtu.be/q6C9UuqvFlE?si=zTYq0_qaqth0WDty",
    embedRestricted: true,
    isActive: true,
  },
  {
    id: "besotes-drone-perspective",
    title: "Los Besotes Eco-Park (Drone View)",
    description:
      "Alternative aerial perspective of Los Besotes Eco-Park, featuring sweeping views of rugged southeastern slopes and unique dry forest ecosystems of the Sierra Nevada mountains.",
    region: "Sierra Nevada de Santa Marta",
    videoId: "q6C9UuqvFlE",
    youtubeUrl: "https://youtu.be/q6C9UuqvFlE?si=ZSxPXhNUcRsjpMUw",
    embedRestricted: true,
    isActive: true,
  },
  {
    id: "choco-bioregion",
    title: "Chocó Bioregion",
    description:
      "Explore one of the world's most biodiverse regions, home to countless endemic species and lush Pacific coast rainforests where rare birds thrive.",
    region: "Pacific Coast",
    videoId: "PLACEHOLDER_CHOCO",
    youtubeUrl: "#",
    isActive: false,
  },
  {
    id: "eastern-cordillera",
    title: "Eastern Cordillera",
    description:
      "Journey through high-altitude cloud forests and páramo ecosystems where rare endemic birds and unique Andean species create unforgettable birding experiences.",
    region: "Andean Mountains",
    videoId: "PLACEHOLDER_CORDILLERA",
    youtubeUrl: "#",
    isActive: false,
  },
]

interface VideoCarouselProps {
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
}

export default function VideoSlider({ className, autoPlay = false, autoPlayInterval = 12000 }: VideoCarouselProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isVideoLoading, setIsVideoLoading] = useState(true)
  const [videoError, setVideoError] = useState<string | null>(null)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)
  const [thumbnailsLoaded, setThumbnailsLoaded] = useState<Set<string>>(new Set())

  const thumbnailContainerRef = useRef<HTMLDivElement>(null)
  const activeVideos = videoData.filter((video) => video.isActive)
  const currentVideo = activeVideos[currentVideoIndex]

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || activeVideos.length <= 1) return

    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % activeVideos.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isAutoPlaying, autoPlayInterval, activeVideos.length])

  // Handle video selection
  const handleVideoSelect = useCallback(
    (index: number) => {
      if (index === currentVideoIndex) return

      setIsAutoPlaying(false)
      setIsVideoLoading(true)
      setVideoError(null)
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
    },
    [currentVideoIndex],
  )

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
  const getThumbnailUrl = useCallback((videoId: string) => {
    if (videoId.startsWith("PLACEHOLDER_")) {
      return `/placeholder.svg?height=120&width=200&text=${encodeURIComponent("Coming Soon")}`
    }
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
  }, [])

  // Get region styling
  const getRegionStyling = useCallback((region: string) => {
    const styles = {
      "Caribbean Coast": {
        gradient: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
        icon: "🏖️",
      },
      "Sierra Nevada de Santa Marta": {
        gradient: "from-emerald-500 to-green-500",
        bgColor: "bg-emerald-50",
        textColor: "text-emerald-700",
        icon: "🏔️",
      },
      "Pacific Coast": {
        gradient: "from-teal-500 to-emerald-500",
        bgColor: "bg-teal-50",
        textColor: "text-teal-700",
        icon: "🌊",
      },
      "Andean Mountains": {
        gradient: "from-slate-500 to-blue-500",
        bgColor: "bg-slate-50",
        textColor: "text-slate-700",
        icon: "⛰️",
      },
    }

    return (
      styles[region as keyof typeof styles] || {
        gradient: "from-gray-500 to-gray-600",
        bgColor: "bg-gray-50",
        textColor: "text-gray-700",
        icon: "📹",
      }
    )
  }, [])

  const regionStyle = getRegionStyling(currentVideo.region)

  return (
    <div className={cn("w-full space-y-6", className)}>
      {/* Main Video Player */}
      <div className="relative">
        <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-900 relative">
          {/* Video Player or Error State */}
          {videoError || (currentVideo.embedRestricted && !isVideoLoading) ? (
            <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
              <div className="text-center space-y-4 p-8">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                  <AlertCircle className="w-10 h-10 text-emerald-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">{currentVideo.title}</h3>
                  <p className="text-gray-600 max-w-md">
                    This video has embedding restrictions. Click below to watch it directly on YouTube.
                  </p>
                </div>
                <Button
                  onClick={() => window.open(currentVideo.youtubeUrl, "_blank")}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Watch on YouTube
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <YouTubeBackground
              videoId={currentVideo.videoId}
              className="w-full h-full"
              overlay={true}
              controls={true}
              onLoad={handleVideoLoad}
              onError={() => handleVideoError("Failed to load video")}
            />
          )}

          {/* Loading Overlay */}
          {isVideoLoading && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
              <div className="bg-white/90 rounded-full p-4 shadow-lg">
                <div className="animate-spin w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full"></div>
              </div>
            </div>
          )}

          {/* Region Badge */}
          <Badge
            className={`absolute top-4 left-4 z-20 bg-gradient-to-r ${regionStyle.gradient} text-white border-0 shadow-lg backdrop-blur-sm px-3 py-1.5`}
          >
            <span className="mr-1">{regionStyle.icon}</span>
            {currentVideo.region}
          </Badge>

          {/* Video Counter */}
          <div className="absolute top-4 right-4 z-20 bg-black/50 text-white rounded-full px-3 py-1 text-sm backdrop-blur-sm">
            {currentVideoIndex + 1} / {activeVideos.length}
          </div>

          {/* Auto-play Toggle */}
          {activeVideos.length > 1 && (
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-white/50 shadow-lg backdrop-blur-sm"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              aria-label={isAutoPlaying ? "Pause auto-play" : "Start auto-play"}
            >
              {isAutoPlaying ? <Pause className="w-4 h-4 text-gray-700" /> : <Play className="w-4 h-4 text-gray-700" />}
            </Button>
          )}
        </div>

        {/* Video Information */}
        <div className="mt-6 text-center space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{currentVideo.title}</h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">{currentVideo.description}</p>

          {/* Additional Info for Restricted Videos */}
          {currentVideo.embedRestricted && (
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <AlertCircle className="w-4 h-4" />
              <span>Video available on YouTube</span>
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {activeVideos.length > 1 && (
        <div className="relative">
          <div
            ref={thumbnailContainerRef}
            className="flex space-x-4 overflow-x-auto pb-4 px-4 scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {activeVideos.map((video, index) => {
              const isSelected = index === currentVideoIndex
              const isLoaded = thumbnailsLoaded.has(video.id)
              const styling = getRegionStyling(video.region)

              return (
                <button
                  key={video.id}
                  onClick={() => handleVideoSelect(index)}
                  className={cn(
                    "relative flex-shrink-0 w-48 h-28 rounded-xl overflow-hidden transition-all duration-300",
                    "border-3 shadow-lg hover:shadow-xl hover:scale-105",
                    isSelected
                      ? "border-emerald-500 ring-2 ring-emerald-200 scale-105"
                      : "border-gray-200 hover:border-emerald-300",
                  )}
                  aria-label={`Play ${video.title}`}
                >
                  {/* Thumbnail Image */}
                  <div className="relative w-full h-full bg-gray-100">
                    {video.isActive ? (
                      <img
                        src={getThumbnailUrl(video.videoId) || "/placeholder.svg"}
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
                          <div className="text-2xl mb-1">{styling.icon}</div>
                          <div className="text-xs font-medium text-gray-600">Coming Soon</div>
                        </div>
                      </div>
                    )}

                    {/* Loading State */}
                    {video.isActive && !isLoaded && (
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
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                        <Play className="w-6 h-6 text-gray-700 ml-0.5" />
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    {isSelected && <div className="absolute inset-0 bg-emerald-600/10 backdrop-blur-[0.5px]" />}

                    {/* Embed Restriction Indicator */}
                    {video.embedRestricted && (
                      <div className="absolute top-2 right-2">
                        <ExternalLink className="w-4 h-4 text-white drop-shadow-lg" />
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Title */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <div className="text-white text-sm font-medium leading-tight">
                      {video.title.length > 30 ? `${video.title.substring(0, 30)}...` : video.title}
                    </div>
                    <div className="text-white/80 text-xs mt-1">{video.region}</div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Scroll Indicators */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
            <div className="w-8 h-full bg-gradient-to-r from-white via-white/50 to-transparent" />
            <div className="w-8 h-full bg-gradient-to-l from-white via-white/50 to-transparent" />
          </div>
        </div>
      )}

      {/* Caption */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 text-sm text-gray-600 bg-white rounded-full px-4 py-2 shadow-md border border-gray-200">
          <Play className="w-4 h-4 text-emerald-600" />
          <span>Aerial footage of Colombia's premier birding destinations</span>
        </div>
      </div>
    </div>
  )
}
