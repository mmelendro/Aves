"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ExternalLink, Search, MapPin, Calendar, Bird, ArrowRight } from "lucide-react"
import OptimizedImage from "@/components/optimized-image"
import SpeciesTooltip from "@/components/species-tooltip"
import Link from "next/link"

// Enhanced bird species data including both endemic and attractive species
const birdSpeciesData = [
  // Endemic Species
  {
    id: "santa-marta-parakeet",
    commonName: "Santa Marta Parakeet",
    scientificName: "Pyrrhura viridicata",
    spanishName: "Periquito de Santa Marta",
    ebirdCode: "sampar1",
    region: "Sierra Nevada de Santa Marta",
    regionCode: "SNSM",
    status: "Endemic",
    conservationStatus: "Endangered",
    habitat: "Cloud forests",
    elevation: "1200-2800m",
    bestTime: "December-March",
    imageUrl: "/images/santa-marta-parakeet.jpg",
    description: "Colorful endemic parakeet found only in the Sierra Nevada de Santa Marta.",
    isEndemic: true,
  },
  {
    id: "blue-bearded-helmetcrest",
    commonName: "Blue-bearded Helmetcrest",
    scientificName: "Oxypogon cyanolaemus",
    spanishName: "Colibrí crestado barbazul",
    ebirdCode: "blbhel2",
    region: "Sierra Nevada de Santa Marta",
    regionCode: "SNSM",
    status: "Endemic",
    conservationStatus: "Critically Endangered",
    habitat: "Páramo grasslands",
    elevation: "3000-4200m",
    bestTime: "December-March",
    imageUrl: "/images/blue-bearded-helmetcrest.jpg",
    description: "Extremely rare páramo hummingbird with distinctive blue beard.",
    isEndemic: true,
  },
  {
    id: "gorgeted-puffleg",
    commonName: "Gorgeted Puffleg",
    scientificName: "Eriocnemis isabellae",
    spanishName: "Calzadito gorgiblanco",
    ebirdCode: "gorpuf1",
    region: "Western Andes",
    regionCode: "Western Andes",
    status: "Endemic",
    conservationStatus: "Critically Endangered",
    habitat: "Cloud forest edges",
    elevation: "1800-2800m",
    bestTime: "December-March",
    imageUrl: "/images/gorgeted-puffleg.jpg",
    description: "One of the world's most endangered hummingbirds with distinctive throat.",
    isEndemic: true,
  },
  {
    id: "indigo-winged-parrot",
    commonName: "Indigo-winged Parrot",
    scientificName: "Hapalopsittaca fuertesi",
    spanishName: "Cotorra aliazul",
    ebirdCode: "indpar1",
    region: "Central Andes",
    regionCode: "Central Andes",
    status: "Endemic",
    conservationStatus: "Critically Endangered",
    habitat: "Cloud forests",
    elevation: "2000-3400m",
    bestTime: "December-March",
    imageUrl: "/images/indigo-winged-parrot.jpg",
    description: "Rare montane parrot with fewer than 300 individuals remaining.",
    isEndemic: true,
  },
  // Attractive Non-Endemic Species
  {
    id: "resplendent-quetzal",
    commonName: "Resplendent Quetzal",
    scientificName: "Pharomachrus mocinno",
    spanishName: "Quetzal resplandeciente",
    ebirdCode: "resquet1",
    region: "Western Andes",
    regionCode: "Western Andes",
    status: "Resident",
    conservationStatus: "Near Threatened",
    habitat: "Cloud forests",
    elevation: "1400-3000m",
    bestTime: "Year-round",
    imageUrl: "/images/resplendent-quetzal.jpg",
    description: "Magnificent cloud forest bird with iridescent green plumage and long tail.",
    isEndemic: false,
  },
  {
    id: "andean-cock-of-the-rock",
    commonName: "Andean Cock-of-the-Rock",
    scientificName: "Rupicola peruvianus",
    spanishName: "Gallito de roca andino",
    ebirdCode: "andcor1",
    region: "Eastern Andes",
    regionCode: "Eastern Andes",
    status: "Resident",
    conservationStatus: "Least Concern",
    habitat: "Cloud forests",
    elevation: "500-2400m",
    bestTime: "Year-round",
    imageUrl: "/images/andean-cock-of-the-rock.jpg",
    description: "Spectacular orange bird known for elaborate courtship displays.",
    isEndemic: false,
  },
  {
    id: "rainbow-bearded-thornbill",
    commonName: "Rainbow-bearded Thornbill",
    scientificName: "Chalcostigma herrani",
    spanishName: "Colibrí barbirrainbow",
    ebirdCode: "rabtho1",
    region: "Colombian Massif",
    regionCode: "Massif",
    status: "Endemic",
    conservationStatus: "Near Threatened",
    habitat: "Páramo",
    elevation: "3000-4500m",
    bestTime: "December-March",
    imageUrl: "/images/rainbow-bearded-thornbill.jpg",
    description: "High-altitude hummingbird with distinctive iridescent throat patch.",
    isEndemic: true,
  },
  {
    id: "king-vulture",
    commonName: "King Vulture",
    scientificName: "Sarcoramphus papa",
    spanishName: "Rey zamuro",
    ebirdCode: "kinvul1",
    region: "Amazon Basin",
    regionCode: "Amazonia",
    status: "Resident",
    conservationStatus: "Least Concern",
    habitat: "Lowland rainforest",
    elevation: "0-1500m",
    bestTime: "Year-round",
    imageUrl: "/images/king-vulture.jpg",
    description: "Magnificent large vulture with colorful head and impressive wingspan.",
    isEndemic: false,
  },
  {
    id: "yellow-throated-toucan",
    commonName: "Yellow-throated Toucan",
    scientificName: "Ramphastos ambiguus",
    spanishName: "Tucán de garganta amarilla",
    ebirdCode: "yeltou1",
    region: "Pacific Coast",
    regionCode: "Pacific",
    status: "Resident",
    conservationStatus: "Vulnerable",
    habitat: "Rainforest canopy",
    elevation: "0-2000m",
    bestTime: "Year-round",
    imageUrl: "/images/yellow-throated-toucan.jpg",
    description: "Large colorful toucan of Pacific rainforests with distinctive yellow throat.",
    isEndemic: false,
  },
  {
    id: "white-necked-jacobin",
    commonName: "White-necked Jacobin",
    scientificName: "Florisuga mellivora",
    spanishName: "Jacobino nuquiblanco",
    ebirdCode: "whnjac1",
    region: "Caribbean Coast",
    regionCode: "Caribbean",
    status: "Resident",
    conservationStatus: "Least Concern",
    habitat: "Forest edges",
    elevation: "0-1200m",
    bestTime: "Year-round",
    imageUrl: "/images/white-necked-jacobin.jpg",
    description: "Large hummingbird with striking blue and white plumage pattern.",
    isEndemic: false,
  },
]

interface EnhancedEndemicBirdsCarouselProps {
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
}

export default function EnhancedEndemicBirdsCarousel({
  className = "",
  autoPlay = true,
  autoPlayInterval = 8000,
}: EnhancedEndemicBirdsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % birdSpeciesData.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isAutoPlaying, autoPlayInterval])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + birdSpeciesData.length) % birdSpeciesData.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % birdSpeciesData.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  const currentBird = birdSpeciesData[currentIndex]

  const getStatusColor = (status: string, isEndemic: boolean) => {
    if (isEndemic) return "bg-emerald-500 text-white"
    return "bg-blue-500 text-white"
  }

  const getConservationColor = (status: string) => {
    switch (status) {
      case "Critically Endangered":
        return "bg-red-500 text-white"
      case "Endangered":
        return "bg-orange-500 text-white"
      case "Vulnerable":
        return "bg-yellow-500 text-white"
      case "Near Threatened":
        return "bg-blue-500 text-white"
      default:
        return "bg-green-500 text-white"
    }
  }

  const generateExplorerUrl = () => {
    return `/avifauna-explorer?region=${encodeURIComponent(currentBird.regionCode)}&species=${encodeURIComponent(
      currentBird.commonName,
    )}`
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Card className="border-0 shadow-2xl overflow-hidden bg-white">
        <div className="relative">
          {/* Main Image */}
          <div className="relative h-80 lg:h-96 overflow-hidden">
            <OptimizedImage
              src={currentBird.imageUrl}
              alt={`${currentBird.commonName} - ${currentBird.description}`}
              width={800}
              height={600}
              className="object-cover w-full h-full transition-all duration-700 hover:scale-105"
              style={{ objectPosition: "center 30%" }}
              priority
            />

            {/* Enhanced gradient overlay for better text readability and visual depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

            {/* Status Badges - Enhanced positioning and styling */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              <Badge
                className={`${getStatusColor(currentBird.status, currentBird.isEndemic)} shadow-lg font-semibold px-3 py-1`}
              >
                {currentBird.isEndemic ? "🦅 Endemic" : "🌟 Spectacular"}
              </Badge>
              <Badge
                className={`${getConservationColor(currentBird.conservationStatus)} shadow-lg font-semibold px-3 py-1`}
              >
                {currentBird.conservationStatus}
              </Badge>
            </div>

            {/* Enhanced Navigation Arrows - Optimized for mobile */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm hover:bg-white/50 rounded-full p-2 sm:p-3 transition-all duration-200 group z-10 focus:outline-none focus:ring-2 focus:ring-white/50 touch-manipulation"
              aria-label="Previous bird"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm hover:bg-white/50 rounded-full p-2 sm:p-3 transition-all duration-200 group z-10 focus:outline-none focus:ring-2 focus:ring-white/50 touch-manipulation"
              aria-label="Next bird"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* Enhanced Slide Indicators - Better mobile touch targets */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
              {birdSpeciesData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 touch-manipulation ${
                    index === currentIndex
                      ? "bg-white scale-125 shadow-lg"
                      : "bg-white/60 hover:bg-white/80 hover:scale-110"
                  }`}
                  aria-label={`Go to slide ${index + 1}: ${birdSpeciesData[index].commonName}`}
                />
              ))}
            </div>

            {/* Enhanced Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 text-white z-10">
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 leading-tight">
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
                  <p className="text-lg italic opacity-90 mb-1">{currentBird.scientificName}</p>
                  <p className="text-base opacity-80">{currentBird.spanishName}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{currentBird.region}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{currentBird.bestTime}</span>
                  </div>
                </div>

                <p className="text-sm opacity-90 leading-relaxed line-clamp-2">{currentBird.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Action Section */}
        <CardContent className="p-6 bg-white">
          {/* Quick Stats - Enhanced layout */}
          <div className="mb-6 pt-2 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="font-semibold text-gray-900 mb-1">Elevation</div>
                <div className="text-gray-600 text-xs">{currentBird.elevation}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Habitat</div>
                <div className="text-gray-600 text-xs">{currentBird.habitat}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Status</div>
                <div className="text-gray-600 text-xs">{currentBird.isEndemic ? "Endemic" : "Resident"}</div>
              </div>
            </div>
          </div>

          {/* Single Consolidated CTA Section - Perfectly aligned */}
          <div className="space-y-4">
            <Link href={generateExplorerUrl()} className="block">
              <Button className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-blue-600 hover:from-emerald-600 hover:via-emerald-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-4 px-6 text-lg font-semibold rounded-lg group">
                <Search className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                Explore in Colombian Avifauna Explorer
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            {/* Secondary action - eBird link with consistent alignment */}
            <a
              href={`https://ebird.org/species/${currentBird.ebirdCode}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                variant="outline"
                className="w-full border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-600 bg-transparent py-3 px-6 font-medium rounded-lg transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Detailed Info on eBird
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Progress Indicator */}
      <div className="mt-4 bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-emerald-500 to-blue-600 h-full transition-all duration-500 ease-out"
          style={{ width: `${((currentIndex + 1) / birdSpeciesData.length) * 100}%` }}
        />
      </div>

      {/* Species Counter */}
      <div className="mt-3 text-center text-sm text-gray-600">
        <span className="font-medium">{currentIndex + 1}</span> of{" "}
        <span className="font-medium">{birdSpeciesData.length}</span> featured species
      </div>

      {/* Compact Informational Banner - Optimized for column balance */}
      <div className="mt-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-4 border border-emerald-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-100 p-2 rounded-full flex-shrink-0">
              <Bird className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Explore 1,900+ Species</h4>
              <p className="text-xs text-gray-600">Across 11 unique biogeographic regions</p>
            </div>
          </div>
          <Link href="/avifauna-explorer">
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-xs px-3 py-2 whitespace-nowrap">
              <Search className="w-3 h-3 mr-1" />
              Explore
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
