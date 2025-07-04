"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight, Info, X, Camera, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import OptimizedImage from "@/components/optimized-image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface BirdData {
  id: string
  name: string
  scientificName: string
  region: string
  regionSlug: string
  image: string
  photographer?: string
  instagramUrl?: string
  profileUrl?: string
  elevation?: string
  primaryRegion?: string
  alsoFoundIn?: string[]
  ecoregions?: string[]
  description?: string
}

const birdData: BirdData[] = [
  {
    id: "green-bearded-helmetcrest",
    name: "Green-bearded Helmetcrest",
    scientificName: "Oxypogon guerinii",
    region: "Eastern Andes",
    regionSlug: "eastern-andes",
    image: "/images/green-bearded-helmetcrest.png",
    photographer: "Dagoberto Rudas",
    profileUrl: "/team#dagoberto-rudas",
    elevation: "3,000 - 4,200m",
    primaryRegion: "Eastern Andes",
    alsoFoundIn: ["Central Andes"],
    ecoregions: ["High-altitude páramo", "Montane forest", "Forest understory"],
    description: "A spectacular endemic hummingbird found only in Colombia's high-altitude páramo ecosystems.",
  },
  {
    id: "rainbow-bearded-thornbill",
    name: "Rainbow-bearded Thornbill",
    scientificName: "Chalcostigma herrani",
    region: "Central Andes",
    regionSlug: "central-andes",
    image: "/images/rainbow-bearded-thornbill.jpg",
    photographer: "Juan Camilo Canadiense",
    profileUrl: "/team#juan-camilo-canadiense",
    elevation: "1,800 - 3,500m",
    primaryRegion: "Central Andes",
    alsoFoundIn: ["Eastern Andes", "Western Andes"],
    ecoregions: ["Cloud forest", "Montane forest", "Forest understory"],
    description: "One of Colombia's most colorful endemic hummingbirds, known for its iridescent plumage.",
  },
  {
    id: "chestnut-crowned-antpitta",
    name: "Chestnut-crowned Antpitta",
    scientificName: "Grallaria ruficapilla",
    region: "Central Andes",
    regionSlug: "central-andes",
    image: "/images/chestnut-crowned-antpitta.jpg",
    photographer: "David Jara",
    profileUrl: "/team#david-jara",
    elevation: "1,400 - 2,800m",
    primaryRegion: "Central Andes",
    alsoFoundIn: ["Eastern Andes", "Western Andes", "Colombian Massif"],
    ecoregions: ["Cloud forest", "Montane forest", "Forest understory"],
    description: "A secretive ground-dwelling bird endemic to Colombia's Andean cloud forests.",
  },
  {
    id: "cardinal-guajiro",
    name: "Vermilion Cardinal",
    scientificName: "Cardinalis phoeniceus",
    region: "Caribbean",
    regionSlug: "caribbean",
    image: "/images/cardinal-guajiro.jpg",
    photographer: "Nicolás Rozo",
    profileUrl: "/team#nicolas-rozo",
    elevation: "0 - 500m",
    primaryRegion: "Caribbean Coast",
    alsoFoundIn: ["Magdalena Valley"],
    ecoregions: ["Dry forest", "Scrubland", "Coastal areas"],
    description: "A stunning endemic cardinal found only in Colombia's Caribbean coastal regions.",
  },
  {
    id: "black-billed-mountain-toucan",
    name: "Black-billed Mountain-Toucan",
    scientificName: "Andigena nigrirostris",
    region: "Western Andes",
    regionSlug: "western-andes",
    image: "/images/bbmtou1-black-billed-mountain-toucan.png",
    photographer: "Gleison Guarín",
    profileUrl: "/team#gleison-guarin",
    elevation: "1,500 - 3,200m",
    primaryRegion: "Western Andes",
    alsoFoundIn: ["Central Andes"],
    ecoregions: ["Cloud forest", "Montane forest", "Forest canopy"],
    description: "A magnificent toucan species endemic to Colombia's Andean cloud forests.",
  },
  {
    id: "velvet-purple-coronet",
    name: "Velvet-purple Coronet",
    scientificName: "Boissonneaua jardini",
    region: "Western Andes",
    regionSlug: "western-andes",
    image: "/images/velvet-purple-coronet.jpg",
    photographer: "Yeferson Gualé Epiayu",
    profileUrl: "/team#yeferson-guale-epiayu",
    elevation: "1,200 - 2,400m",
    primaryRegion: "Western Andes",
    alsoFoundIn: ["Central Andes"],
    ecoregions: ["Cloud forest", "Montane forest", "Forest edge"],
    description: "A beautiful hummingbird with distinctive velvet-purple plumage found in Colombia's cloud forests.",
  },
]

export default function HomepageBirdCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showInfo, setShowInfo] = useState(false)
  const [showPhotoCredit, setShowPhotoCredit] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const currentBird = birdData[currentIndex]

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !showInfo && !showPhotoCredit) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % birdData.length)
      }, 5000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, showInfo, showPhotoCredit])

  // Navigation functions
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % birdData.length)
    setImageLoaded(false)
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + birdData.length) % birdData.length)
    setImageLoaded(false)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
    setImageLoaded(false)
  }, [])

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrevious()
    }
  }

  // Close panels when changing slides
  useEffect(() => {
    setShowInfo(false)
    setShowPhotoCredit(false)
  }, [currentIndex])

  // Handle info panel toggle
  const toggleInfo = () => {
    setShowInfo(!showInfo)
    setShowPhotoCredit(false)
  }

  // Handle photo credit toggle
  const togglePhotoCredit = () => {
    setShowPhotoCredit(!showPhotoCredit)
    setShowInfo(false)
  }

  return (
    <div className="relative w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden carousel-container">
      {/* Main Image Container */}
      <div
        className="relative aspect-square bg-gradient-to-br from-emerald-50 to-cyan-50 carousel-image-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Bird Image */}
        <div className="relative w-full h-full overflow-hidden">
          <OptimizedImage
            src={currentBird.image}
            alt={`${currentBird.name} - ${currentBird.scientificName}`}
            width={400}
            height={400}
            className={cn(
              "w-full h-full object-cover transition-all duration-700 ease-out carousel-slide",
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105",
            )}
            onLoad={() => setImageLoaded(true)}
            priority={currentIndex === 0}
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />

          {/* Loading overlay */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-cyan-100 animate-pulse carousel-loading" />
          )}
        </div>

        {/* Navigation Arrows - Hidden when info panel is open */}
        {!showInfo && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 carousel-button z-30"
              aria-label="Previous bird"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 carousel-button z-30"
              aria-label="Next bird"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}

        {/* Bird Information Overlay - Hidden when info panel is open */}
        {!showInfo && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 transition-all duration-300 ease-in-out">
            <div className="flex items-end justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-lg leading-tight drop-shadow-lg">{currentBird.name}</h3>
                <p className="text-white/90 text-sm italic drop-shadow-md">{currentBird.scientificName}</p>
                <div className="mt-2">
                  <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
                    {currentBird.region}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-3">
                <button
                  onClick={toggleInfo}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-white/30 hover:border-white/50"
                  aria-label="Show bird information"
                >
                  <Info className="w-4 h-4 text-white drop-shadow-sm" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Photo Credit Button - Hidden when info panel is open */}
        {!showInfo && currentBird.photographer && (
          <button
            onClick={togglePhotoCredit}
            className="absolute top-3 left-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-medium transition-all duration-300 hover:scale-105 active:scale-95 border border-white/30 hover:border-white/50 z-20"
            aria-label="Show photo credit"
          >
            <Camera className="w-3 h-3 inline mr-1" />
            Photo Credit
          </button>
        )}

        {/* Close Button - Only visible when info panel is open */}
        {showInfo && (
          <button
            onClick={() => setShowInfo(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-emerald-600 hover:bg-emerald-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg z-50"
            aria-label="Close information panel"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        )}

        {/* Species Information Panel */}
        {showInfo && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm p-6 overflow-y-auto z-40 carousel-info-panel">
            <div className="text-white space-y-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">{currentBird.name}</h2>
                <p className="text-emerald-300 text-lg italic">{currentBird.scientificName}</p>
              </div>

              {currentBird.elevation && (
                <div>
                  <h3 className="text-emerald-400 font-semibold mb-1">Elevation:</h3>
                  <p className="text-gray-200">{currentBird.elevation}</p>
                </div>
              )}

              {currentBird.primaryRegion && (
                <div>
                  <h3 className="text-emerald-400 font-semibold mb-1">Primary Region:</h3>
                  <p className="text-gray-200">{currentBird.primaryRegion}</p>
                </div>
              )}

              {currentBird.alsoFoundIn && currentBird.alsoFoundIn.length > 0 && (
                <div>
                  <h3 className="text-emerald-400 font-semibold mb-1">Also found in:</h3>
                  <p className="text-gray-200">{currentBird.alsoFoundIn.join(", ")}</p>
                </div>
              )}

              {currentBird.ecoregions && currentBird.ecoregions.length > 0 && (
                <div>
                  <h3 className="text-emerald-400 font-semibold mb-2">Ecoregions:</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentBird.ecoregions.map((ecoregion, index) => (
                      <span
                        key={index}
                        className="bg-white/20 text-white text-xs px-2 py-1 rounded-full border border-white/30"
                      >
                        {ecoregion}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {currentBird.description && (
                <div>
                  <h3 className="text-emerald-400 font-semibold mb-1">About this species:</h3>
                  <p className="text-gray-200 leading-relaxed">{currentBird.description}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col space-y-3 pt-4 border-t border-white/20">
                <Link href="/aves-explorer" prefetch={true}>
                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Explore Species</span>
                  </Button>
                </Link>

                <Link href={`/regions/${currentBird.regionSlug}`} prefetch={true}>
                  <Button
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>{currentBird.region}</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Photo Credit Panel */}
        {showPhotoCredit && currentBird.photographer && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-40 carousel-credit-panel">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
              <Camera className="w-8 h-8 text-white mx-auto mb-3" />
              <h3 className="text-white font-semibold text-lg mb-2">Photo by</h3>
              <p className="text-emerald-300 font-bold text-xl mb-4">{currentBird.photographer}</p>

              <div className="flex flex-col space-y-3">
                {currentBird.profileUrl && (
                  <Link href={currentBird.profileUrl} prefetch={true}>
                    <Button
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Profile</span>
                    </Button>
                  </Link>
                )}

                {currentBird.instagramUrl && (
                  <a
                    href={currentBird.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer">
                      <Instagram className="w-4 h-4 mr-2" />
                      <span>Instagram</span>
                    </Button>
                  </a>
                )}
              </div>

              <button
                onClick={() => setShowPhotoCredit(false)}
                className="mt-4 text-white/70 hover:text-white text-sm transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      <div className="carousel-thumbnails">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2">
          {birdData.map((bird, index) => (
            <button
              key={bird.id}
              onClick={() => goToSlide(index)}
              className={cn(
                "flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 active:scale-95 carousel-thumbnail",
                index === currentIndex ? "border-emerald-500 shadow-lg" : "border-gray-300 hover:border-emerald-300",
              )}
              aria-label={`View ${bird.name}`}
            >
              <OptimizedImage
                src={bird.image}
                alt={bird.name}
                width={48}
                height={48}
                className="w-full h-full object-cover"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </button>
          ))}
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center space-x-2 mt-3">
          {birdData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 active:scale-90 carousel-indicator",
                index === currentIndex ? "bg-emerald-500 shadow-md" : "bg-gray-300 hover:bg-emerald-300",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
