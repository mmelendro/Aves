"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

interface BirdData {
  id: string
  englishName: string
  latinName: string
  spanishName: string
  description: string
  habitat: string
  bestTime: string
  primaryRegion: string
  secondaryRegions?: string[]
  conservationStatus: string
  difficulty: string
  image: string
  ebird?: string
}

const birdData: BirdData[] = [
  {
    id: "rainbow-bearded-thornbill",
    englishName: "Rainbow-bearded Thornbill",
    latinName: "Chalcostigma herrani",
    spanishName: "Colibrí Barbirrojo",
    description:
      "A spectacular high-altitude hummingbird endemic to Colombia's páramo ecosystems. Males display an iridescent rainbow-colored throat patch that shimmers in sunlight, making it one of the most sought-after species for birders visiting the Andes.",
    habitat: "High-altitude páramo grasslands, elfin forests, and Espeletia stands between 2,800-4,200m elevation",
    bestTime: "Year-round, best visibility during dry seasons (December-March, June-August) when flowers are abundant",
    primaryRegion: "Eastern Cordillera",
    secondaryRegions: ["Central Cordillera", "Boyacá Páramos"],
    conservationStatus: "Near Threatened",
    difficulty: "Challenging",
    image: "/images/rainbow-bearded-thornbill.jpg",
    ebird: "https://ebird.org/species/rabtho1",
  },
  {
    id: "chestnut-crowned-antpitta",
    englishName: "Chestnut-crowned Antpitta",
    latinName: "Grallaria ruficapilla",
    spanishName: "Tororoi Coronirrufo",
    description:
      "An elusive ground-dwelling bird endemic to Colombia's cloud forests. Known for its distinctive chestnut crown and secretive nature, this antpitta is often heard before seen, with its haunting call echoing through misty mountain forests.",
    habitat: "Dense cloud forest understory, bamboo thickets, and moss-covered slopes between 1,800-3,200m elevation",
    bestTime: "Early morning (5:30-8:00 AM) and late afternoon (4:00-6:00 PM) when most vocal and active",
    primaryRegion: "Central Cordillera",
    secondaryRegions: ["Eastern Cordillera", "Western Cordillera"],
    conservationStatus: "Least Concern",
    difficulty: "Moderate",
    image: "/images/chestnut-crowned-antpitta.jpg",
    ebird: "https://ebird.org/species/chcant2",
  },
  {
    id: "green-bearded-helmetcrest",
    englishName: "Green-bearded Helmetcrest",
    latinName: "Oxypogon guerinii",
    spanishName: "Colibrí Paramuno",
    description:
      "Colombia's most endangered hummingbird, found only in the páramos of the Santa Marta mountains and a few Andean locations. This remarkable species has adapted to extreme high-altitude conditions and is critically important for conservation efforts.",
    habitat: "High-altitude páramo vegetation, particularly areas with Espeletia plants and cushion bogs above 3,000m",
    bestTime: "Year-round, but best during flowering seasons of native plants (March-May, September-November)",
    primaryRegion: "Sierra Nevada de Santa Marta",
    secondaryRegions: ["Boyacá Páramos"],
    conservationStatus: "Critically Endangered",
    difficulty: "Expert",
    image: "/images/green-bearded-helmetcrest.png",
    ebird: "https://ebird.org/species/gnbhel1",
  },
  {
    id: "blue-crowned-motmot",
    englishName: "Blue-crowned Motmot",
    latinName: "Momotus coeruliceps",
    spanishName: "Momoto Coroniazul",
    description:
      "A stunning endemic motmot with brilliant blue crown and distinctive racket-tipped tail. This species represents the incredible diversity of Colombia's avifauna and is a favorite among photographers for its vibrant colors and distinctive appearance.",
    habitat: "Humid lowland and foothill forests, forest edges, and secondary growth between 0-1,500m elevation",
    bestTime: "Year-round, most active during early morning hours (6:00-9:00 AM) and late afternoon",
    primaryRegion: "Pacific Coast",
    secondaryRegions: ["Magdalena Valley", "Caribbean Coast"],
    conservationStatus: "Least Concern",
    difficulty: "Easy",
    image: "/images/blue-crowned-motmot-new.jpg",
    ebird: "https://ebird.org/species/blcmot1",
  },
  {
    id: "velvet-purple-coronet",
    englishName: "Velvet-purple Coronet",
    latinName: "Boissonneaua jardini",
    spanishName: "Coronita Aterciopelada",
    description:
      "A magnificent large hummingbird with deep velvet-purple plumage that seems to absorb light. Endemic to the cloud forests of the Western Cordillera, this species is known for its aggressive territorial behavior and spectacular aerial displays.",
    habitat: "Cloud forest canopy and edges, flowering trees and epiphytes between 1,200-2,400m elevation",
    bestTime: "Year-round, peak activity during flowering seasons of Inga and other native trees",
    primaryRegion: "Western Cordillera",
    secondaryRegions: ["Chocó Biogeographic Region"],
    conservationStatus: "Least Concern",
    difficulty: "Moderate",
    image: "/images/velvet-purple-coronet.jpg",
    ebird: "https://ebird.org/species/vepuco1",
  },
  {
    id: "black-billed-mountain-toucan",
    englishName: "Black-billed Mountain-toucan",
    latinName: "Andigena nigrirostris",
    spanishName: "Tucán Andino Piquinegro",
    description:
      "A spectacular high-altitude toucan endemic to Colombia's cloud forests. With its colorful plumage and distinctive black bill, this species represents the remarkable adaptation of toucans to montane environments.",
    habitat: "Cloud forest canopy, forest edges with fruiting trees between 1,800-3,200m elevation",
    bestTime: "Year-round, most active during fruiting seasons (March-June, October-December)",
    primaryRegion: "Central Cordillera",
    secondaryRegions: ["Eastern Cordillera", "Western Cordillera"],
    conservationStatus: "Near Threatened",
    difficulty: "Moderate",
    image: "/images/bbmtou1-black-billed-mountain-toucan.png",
    ebird: "https://ebird.org/species/blbmto1",
  },
]

interface EnhancedEndemicBirdsCarouselProps {
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
}

export default function EnhancedEndemicBirdsCarousel({
  className = "",
  autoPlay = false,
  autoPlayInterval = 5000,
}: EnhancedEndemicBirdsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)
  const [showDetails, setShowDetails] = useState(false)
  const [selectedBird, setSelectedBird] = useState<BirdData | null>(null)
  const [imageLoaded, setImageLoaded] = useState<{ [key: string]: boolean }>({})
  const [isMobile, setIsMobile] = useState(false)

  // Responsive detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % birdData.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + birdData.length) % birdData.length)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(nextSlide, autoPlayInterval)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide, autoPlayInterval])

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(autoPlay)

  // Handle image loading
  const handleImageLoad = (birdId: string) => {
    setImageLoaded((prev) => ({ ...prev, [birdId]: true }))
  }

  // Handle details popup
  const handleShowDetails = (bird: BirdData) => {
    setSelectedBird(bird)
    setShowDetails(true)
  }

  const handleCloseDetails = () => {
    setShowDetails(false)
    setSelectedBird(null)
  }

  const getConservationColor = (status: string) => {
    switch (status) {
      case "Critically Endangered":
        return "bg-red-100 text-red-800 border-red-200"
      case "Near Threatened":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Least Concern":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Expert":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Challenging":
        return "bg-red-100 text-red-800 border-red-200"
      case "Moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Easy":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <>
      <div
        className={`relative w-full h-full bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl overflow-hidden shadow-2xl ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Main Image Display */}
        <div className="relative w-full h-full">
          <div className="absolute inset-0">
            {!imageLoaded[birdData[currentIndex].id] && (
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-blue-100 animate-pulse flex items-center justify-center">
                <div className="text-emerald-600 text-lg font-medium">Loading...</div>
              </div>
            )}
            <img
              src={birdData[currentIndex].image || "/placeholder.svg"}
              alt={birdData[currentIndex].englishName}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                imageLoaded[birdData[currentIndex].id] ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => handleImageLoad(birdData[currentIndex].id)}
              onError={() => handleImageLoad(birdData[currentIndex].id)}
            />
          </div>

          {/* Gradient Overlay for Better Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 w-10 h-10 lg:w-12 lg:h-12"
            onClick={prevSlide}
            aria-label="Previous bird"
          >
            <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 w-10 h-10 lg:w-12 lg:h-12"
            onClick={nextSlide}
            aria-label="Next bird"
          >
            <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
          </Button>

          {/* Info Button - Fixed to bottom-right corner */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-2 right-2 lg:bottom-4 lg:right-4 bg-emerald-600/90 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 w-10 h-10 lg:w-12 lg:h-12 rounded-full z-20"
            onClick={() => handleShowDetails(birdData[currentIndex])}
            aria-label="More details"
          >
            <Info className="w-5 h-5 lg:w-6 lg:h-6" />
          </Button>

          {/* Bird Name Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
            <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 lg:p-4">
              <h3 className="text-white font-bold text-lg lg:text-xl mb-1">{birdData[currentIndex].englishName}</h3>
              <p className="text-white/90 text-sm lg:text-base italic">{birdData[currentIndex].latinName}</p>
              <p className="text-white/80 text-xs lg:text-sm mt-1">{birdData[currentIndex].primaryRegion}</p>
            </div>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 lg:bottom-4">
          <div className="flex space-x-2 bg-black/50 backdrop-blur-sm rounded-full p-2">
            {birdData.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Details Popup Modal */}
      {showDetails && selectedBird && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in-0 duration-300">
          <Card
            className={`bg-white shadow-2xl max-h-[90vh] overflow-y-auto ${
              isMobile ? "w-full max-w-sm" : "w-full max-w-2xl"
            }`}
          >
            <CardContent className={isMobile ? "p-4" : "p-6 lg:p-8"}>
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 lg:top-4 lg:right-4 text-gray-500 hover:text-gray-700 hover:bg-gray-100 w-8 h-8 lg:w-10 lg:h-10"
                onClick={handleCloseDetails}
                aria-label="Close details"
              >
                <X className="w-4 h-4 lg:w-5 lg:h-5" />
              </Button>

              {/* Bird Image */}
              <div className={`${isMobile ? "aspect-[4/3] mb-4" : "aspect-[3/2] mb-6"} rounded-lg overflow-hidden`}>
                <img
                  src={selectedBird.image || "/placeholder.svg"}
                  alt={selectedBird.englishName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bird Information */}
              <div className="space-y-4 lg:space-y-6">
                {/* Names and Status */}
                <div>
                  {selectedBird.ebird && (
                    <Link
                      href={selectedBird.ebird}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block hover:underline"
                    >
                      <h2
                        className={`font-bold text-gray-900 mb-2 hover:text-emerald-600 transition-colors ${
                          isMobile ? "text-lg sm:text-xl" : "text-2xl lg:text-3xl"
                        }`}
                      >
                        {selectedBird.englishName}
                      </h2>
                    </Link>
                  )}
                  {!selectedBird.ebird && (
                    <h2
                      className={`font-bold text-gray-900 mb-2 ${
                        isMobile ? "text-lg sm:text-xl" : "text-2xl lg:text-3xl"
                      }`}
                    >
                      {selectedBird.englishName}
                    </h2>
                  )}
                  <p
                    className={`text-gray-600 italic mb-1 ${
                      isMobile ? "text-sm sm:text-base" : "text-base lg:text-lg"
                    }`}
                  >
                    {selectedBird.latinName}
                  </p>
                  <p className={`text-gray-600 mb-3 ${isMobile ? "text-sm sm:text-base" : "text-base lg:text-lg"}`}>
                    {selectedBird.spanishName}
                  </p>

                  {/* Status Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge
                      className={`${getConservationColor(selectedBird.conservationStatus)} border text-xs lg:text-sm`}
                    >
                      {selectedBird.conservationStatus}
                    </Badge>
                    <Badge className={`${getDifficultyColor(selectedBird.difficulty)} border text-xs lg:text-sm`}>
                      {selectedBird.difficulty}
                    </Badge>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3
                    className={`font-semibold text-gray-900 mb-2 ${
                      isMobile ? "text-base sm:text-lg" : "text-lg lg:text-xl"
                    }`}
                  >
                    Description
                  </h3>
                  <p
                    className={`text-gray-700 leading-relaxed ${
                      isMobile ? "text-sm sm:text-base" : "text-base lg:text-lg"
                    }`}
                  >
                    {selectedBird.description}
                  </p>
                </div>

                {/* Habitat */}
                <div>
                  <h3
                    className={`font-semibold text-gray-900 mb-2 ${
                      isMobile ? "text-base sm:text-lg" : "text-lg lg:text-xl"
                    }`}
                  >
                    Habitat
                  </h3>
                  <p
                    className={`text-gray-700 leading-relaxed ${
                      isMobile ? "text-sm sm:text-base" : "text-base lg:text-lg"
                    }`}
                  >
                    {selectedBird.habitat}
                  </p>
                </div>

                {/* Best Time to Observe */}
                <div>
                  <h3
                    className={`font-semibold text-gray-900 mb-2 ${
                      isMobile ? "text-base sm:text-lg" : "text-lg lg:text-xl"
                    }`}
                  >
                    Best Time to Observe
                  </h3>
                  <p
                    className={`text-gray-700 leading-relaxed ${
                      isMobile ? "text-sm sm:text-base" : "text-base lg:text-lg"
                    }`}
                  >
                    {selectedBird.bestTime}
                  </p>
                </div>

                {/* Regions */}
                <div>
                  <h3
                    className={`font-semibold text-gray-900 mb-2 ${
                      isMobile ? "text-base sm:text-lg" : "text-lg lg:text-xl"
                    }`}
                  >
                    Regions
                  </h3>
                  <div className="space-y-2">
                    <p className={`text-gray-700 ${isMobile ? "text-sm sm:text-base" : "text-base lg:text-lg"}`}>
                      <span className="font-medium">Primary:</span> {selectedBird.primaryRegion}
                    </p>
                    {selectedBird.secondaryRegions && selectedBird.secondaryRegions.length > 0 && (
                      <p className={`text-gray-700 ${isMobile ? "text-sm sm:text-base" : "text-base lg:text-lg"}`}>
                        <span className="font-medium">Also found in:</span> {selectedBird.secondaryRegions.join(", ")}
                      </p>
                    )}
                  </div>
                </div>

                {/* eBird Link */}
                {selectedBird.ebird && (
                  <div className="pt-4 border-t border-gray-200">
                    <Link
                      href={selectedBird.ebird}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center text-emerald-600 hover:text-emerald-700 hover:underline font-medium ${
                        isMobile ? "text-sm sm:text-base" : "text-base lg:text-lg"
                      }`}
                    >
                      View on eBird →
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
