"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import YouTubeBackground from "@/components/youtube-background"
import { cn } from "@/lib/utils"

interface VideoSlide {
  id: string
  title: string
  region: string
  description: string
  videoId: string // YouTube video ID - will be placeholder for now
  thumbnail?: string
}

const videoSlides: VideoSlide[] = [
  {
    id: "sierra-nevada",
    title: "Sierra Nevada & Tayrona National Park",
    region: "Caribbean Coast",
    description:
      "Discover the breathtaking landscapes where our birding adventures take place - from pristine Caribbean coastlines to cloud-covered mountain peaks.",
    videoId: "eEteVfDagrs", // Current video
  },
  {
    id: "choco-bioregion",
    title: "Chocó Bioregion",
    region: "Pacific Coast",
    description:
      "Explore one of the world's most biodiverse regions, home to countless endemic species and lush rainforests.",
    videoId: "dQw4w9WgXcQ", // Placeholder - will be replaced
  },
  {
    id: "eastern-cordillera",
    title: "Eastern Cordillera",
    region: "Andean Mountains",
    description: "Journey through high-altitude cloud forests and páramo ecosystems where rare endemic birds thrive.",
    videoId: "dQw4w9WgXcQ", // Placeholder - will be replaced
  },
  {
    id: "llanos-orientales",
    title: "Llanos Orientales",
    region: "Eastern Plains",
    description: "Experience the vast grasslands and wetlands that host spectacular waterbird concentrations.",
    videoId: "dQw4w9WgXcQ", // Placeholder - will be replaced
  },
  {
    id: "amazon-basin",
    title: "Amazon Basin",
    region: "Rainforest",
    description: "Venture into the heart of the Amazon to discover incredible biodiversity and pristine wilderness.",
    videoId: "dQw4w9WgXcQ", // Placeholder - will be replaced
  },
]

interface VideoSliderProps {
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
}

export default function VideoSlider({ className, autoPlay = false, autoPlayInterval = 8000 }: VideoSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videoSlides.length)
        setIsTransitioning(false)
      }, 300)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isAutoPlaying, autoPlayInterval])

  const goToPrevious = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setIsAutoPlaying(false)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? videoSlides.length - 1 : prevIndex - 1))
      setIsTransitioning(false)
    }, 300)
  }

  const goToNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setIsAutoPlaying(false)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videoSlides.length)
      setIsTransitioning(false)
    }, 300)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return
    setIsTransitioning(true)
    setIsAutoPlaying(false)
    setTimeout(() => {
      setCurrentIndex(index)
      setIsTransitioning(false)
    }, 300)
  }

  const currentSlide = videoSlides[currentIndex]

  return (
    <div className={cn("relative", className)}>
      {/* Main Video Display */}
      <div className="relative">
        <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white relative">
          <YouTubeBackground
            videoId={currentSlide.videoId}
            className={cn(
              "w-full h-full transition-opacity duration-300",
              isTransitioning ? "opacity-75" : "opacity-100",
            )}
            overlay={true}
            controls={true}
            startTime={0}
          />

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white border-2 border-white/50 hover:border-white shadow-lg hover:shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-110"
            onClick={goToPrevious}
            disabled={isTransitioning}
            aria-label="Previous video"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white border-2 border-white/50 hover:border-white shadow-lg hover:shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-110"
            onClick={goToNext}
            disabled={isTransitioning}
            aria-label="Next video"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </Button>

          {/* Region Badge */}
          <Badge className="absolute top-4 left-4 z-20 bg-emerald-600/90 text-white border-0 shadow-lg backdrop-blur-sm px-3 py-1.5">
            <MapPin className="w-3 h-3 mr-1" />
            {currentSlide.region}
          </Badge>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
            {videoSlides.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "transition-all duration-300 rounded-full",
                  index === currentIndex
                    ? "w-8 h-3 bg-white shadow-md"
                    : "w-3 h-3 bg-white/60 hover:bg-white/80 hover:scale-110",
                )}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                aria-label={`Go to ${videoSlides[index].title}`}
              />
            ))}
          </div>
        </div>

        {/* Video Caption */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-white rounded-full px-6 py-2 shadow-lg border border-gray-200">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Play className="w-4 h-4 text-emerald-600" />
              <span>Aerial footage of Colombia's premier birding destinations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Information */}
      <div className="mt-8 text-center">
        <h2
          className={cn(
            "text-2xl lg:text-3xl font-bold text-gray-900 mb-2 transition-opacity duration-300",
            isTransitioning ? "opacity-75" : "opacity-100",
          )}
        >
          {currentSlide.title}
        </h2>
        <p
          className={cn(
            "text-gray-600 max-w-2xl mx-auto transition-opacity duration-300",
            isTransitioning ? "opacity-75" : "opacity-100",
          )}
        >
          {currentSlide.description}
        </p>
      </div>

      {/* Thumbnail Navigation */}
      <div className="mt-6 flex justify-center">
        <div className="flex space-x-3 overflow-x-auto pb-2 max-w-full">
          {videoSlides.map((slide, index) => (
            <button
              key={slide.id}
              className={cn(
                "flex-shrink-0 relative group transition-all duration-300",
                "border-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md",
                index === currentIndex
                  ? "border-emerald-500 ring-2 ring-emerald-200 scale-105"
                  : "border-gray-200 hover:border-emerald-300 hover:scale-102",
              )}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              aria-label={`View ${slide.title}`}
            >
              <div className="w-24 h-16 bg-gradient-to-br from-emerald-100 to-blue-100 flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <div className="text-xs font-medium text-gray-700 leading-tight">{slide.region}</div>
                </div>
              </div>
              {index === currentIndex && <div className="absolute inset-0 bg-emerald-600/10 backdrop-blur-[0.5px]" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
