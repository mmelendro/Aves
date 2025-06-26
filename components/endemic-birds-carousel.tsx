"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight, Play, Pause, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import OptimizedImage from "./optimized-image"
import SpeciesTooltip from "./species-tooltip"

interface BirdData {
  id: string
  image: string
  commonName: string
  scientificName: string
  spanishName: string
  region: string
  description: string
  ebirdCode: string
  conservation?: string
}

interface EndemicBirdsCarouselProps {
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
  showThumbnails?: boolean
}

const ENDEMIC_BIRDS: BirdData[] = [
  {
    id: "1",
    image: "/images/rainbow-bearded-thornbill.jpg",
    commonName: "Rainbow-bearded Thornbill",
    scientificName: "Chalcostigma herrani",
    spanishName: "Colibrí Arcoíris",
    region: "Eastern Cordillera",
    description: "Endemic hummingbird of Colombia's high-altitude páramo ecosystems",
    ebirdCode: "rabth1",
    conservation: "Near Threatened",
  },
  {
    id: "2",
    image: "/images/chestnut-crowned-antpitta.jpg",
    commonName: "Chestnut-crowned Antpitta",
    scientificName: "Grallaria ruficapilla",
    spanishName: "Tororoi Coronado",
    region: "Central Cordillera",
    description: "Secretive ground-dwelling bird endemic to Colombian cloud forests",
    ebirdCode: "chcant1",
  },
  {
    id: "3",
    image: "/images/blue-crowned-motmot.jpg",
    commonName: "Blue-crowned Motmot",
    scientificName: "Momotus coeruliceps",
    spanishName: "Barranquero Coronado",
    region: "Western Cordillera",
    description: "Colorful endemic motmot of Colombia's Pacific slope forests",
    ebirdCode: "blcmot1",
  },
  {
    id: "4",
    image: "/images/yellow-crowned-amazon.jpg",
    commonName: "Yellow-crowned Amazon",
    scientificName: "Amazona ochrocephala",
    spanishName: "Lora Real",
    region: "Caribbean Coast",
    description: "Charismatic parrot species found in Colombia's northern regions",
    ebirdCode: "yecama1",
  },
  {
    id: "5",
    image: "/images/long-tailed-sylph.jpg",
    commonName: "Long-tailed Sylph",
    scientificName: "Aglaiocercus kingii",
    spanishName: "Colibrí Colilargo",
    region: "Andean Slopes",
    description: "Spectacular hummingbird with iridescent plumage and elongated tail",
    ebirdCode: "lotsy1",
  },
]

export default function EndemicBirdsCarousel({
  className = "",
  autoPlay = true,
  autoPlayInterval = 5000,
  showThumbnails = true,
}: EndemicBirdsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isLoading, setIsLoading] = useState(true)
  const [showInfo, setShowInfo] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Touch handling for mobile swipe
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % ENDEMIC_BIRDS.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + ENDEMIC_BIRDS.length) % ENDEMIC_BIRDS.length)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && autoPlay) {
      intervalRef.current = setInterval(nextSlide, autoPlayInterval)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, autoPlay, autoPlayInterval, nextSlide])

  // Pause on hover (desktop only)
  const handleMouseEnter = () => {
    if (window.innerWidth >= 768) {
      setIsPlaying(false)
    }
  }

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768 && autoPlay) {
      setIsPlaying(true)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide()
      } else if (e.key === "ArrowRight") {
        nextSlide()
      } else if (e.key === " ") {
        e.preventDefault()
        togglePlayPause()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  const currentBird = ENDEMIC_BIRDS[currentIndex]

  return (
    <div
      className={`relative w-full bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={carouselRef}
    >
      {/* Main Image Container */}
      <div
        className="relative aspect-[4/3] sm:aspect-[5/3] lg:aspect-[16/10] overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src={currentBird.image}
            alt={`${currentBird.commonName} - ${currentBird.description}`}
            width={800}
            height={500}
            className="w-full h-full object-cover transition-all duration-700 ease-in-out"
            style={{
              objectPosition: "center center",
              filter: showInfo ? "brightness(0.7)" : "brightness(1)",
            }}
            priority={currentIndex === 0}
            onLoad={() => setIsLoading(false)}
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Navigation Controls - Mobile Optimized */}
        <div className="absolute inset-0 flex items-center justify-between p-2 sm:p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-0 rounded-full transition-all duration-200 active:scale-95"
            aria-label="Previous bird"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-0 rounded-full transition-all duration-200 active:scale-95"
            aria-label="Next bird"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
        </div>

        {/* Top Controls */}
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 flex justify-between items-start">
          {/* Region Badge */}
          <Badge className="bg-emerald-600/90 text-white hover:bg-emerald-600 backdrop-blur-sm text-xs sm:text-sm">
            📍 {currentBird.region}
          </Badge>

          {/* Control Buttons */}
          <div className="flex space-x-1 sm:space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowInfo(!showInfo)}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-0 rounded-full"
              aria-label="Toggle information"
            >
              <Info className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>

            {autoPlay && (
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlayPause}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-0 rounded-full"
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5" />}
              </Button>
            )}
          </div>
        </div>

        {/* Bird Information Overlay */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-6 text-white transition-all duration-300 ${showInfo ? "translate-y-0 opacity-100" : "translate-y-2 opacity-90"}`}
        >
          <div className="space-y-1 sm:space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold truncate">
                  <SpeciesTooltip
                    species={{
                      commonName: currentBird.commonName,
                      scientificName: currentBird.scientificName,
                      spanishName: currentBird.spanishName,
                      ebirdCode: currentBird.ebirdCode,
                      description: currentBird.description,
                    }}
                  >
                    {currentBird.commonName}
                  </SpeciesTooltip>
                </h3>
                <p className="text-sm sm:text-base text-white/90 italic truncate">{currentBird.scientificName}</p>
                <p className="text-xs sm:text-sm text-white/80 truncate">{currentBird.spanishName}</p>
              </div>

              {currentBird.conservation && (
                <Badge className="bg-amber-500/90 text-white hover:bg-amber-500 backdrop-blur-sm text-xs whitespace-nowrap">
                  {currentBird.conservation}
                </Badge>
              )}
            </div>

            {showInfo && (
              <div className="space-y-2 animate-in slide-in-from-bottom-2 duration-300">
                <p className="text-sm sm:text-base text-white/90 leading-relaxed">{currentBird.description}</p>
                <a
                  href={`https://ebird.org/species/${currentBird.ebirdCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs sm:text-sm text-emerald-300 hover:text-emerald-200 transition-colors"
                >
                  View on eBird →
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Thumbnail Navigation - Mobile Optimized */}
      {showThumbnails && (
        <div className="p-2 sm:p-3 lg:p-4 bg-white/95 backdrop-blur-sm">
          <div className="flex space-x-1 sm:space-x-2 overflow-x-auto scrollbar-hide">
            {ENDEMIC_BIRDS.map((bird, index) => (
              <button
                key={bird.id}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden transition-all duration-200 ${
                  index === currentIndex
                    ? "ring-2 ring-emerald-500 ring-offset-2 scale-105"
                    : "hover:scale-105 opacity-70 hover:opacity-100"
                }`}
                aria-label={`View ${bird.commonName}`}
              >
                <OptimizedImage
                  src={bird.image}
                  alt={bird.commonName}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
                {index === currentIndex && <div className="absolute inset-0 bg-emerald-500/20" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Progress Indicators */}
      <div className="absolute bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
        {ENDEMIC_BIRDS.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
              index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
