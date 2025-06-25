"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, ExternalLink, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import OptimizedImage from "@/components/optimized-image"
import { cn } from "@/lib/utils"

interface EndemicBird {
  id: string
  commonNameEnglish: string
  commonNameSpanish: string
  scientificName: string
  ebirdCode: string
  imagePath: string
  description: string
  habitat: string
  region: string
}

const endemicBirdsData: EndemicBird[] = [
  {
    id: "vermilion-cardinal",
    commonNameEnglish: "Vermilion Cardinal",
    commonNameSpanish: "Cardenal Guajiro",
    scientificName: "Cardinalis phoeniceus",
    ebirdCode: "vercar1",
    imagePath: "/images/cardinal-guajiro.jpg",
    description:
      "Endemic to northern Colombia and Venezuela, known as Ishuu in Wayuu language. This striking red bird with black face mask represents the cultural connection between indigenous communities and Colombia's avian diversity.",
    habitat: "Dry scrublands and coastal areas",
    region: "Caribbean Coast",
  },
  {
    id: "colombian-chachalaca",
    commonNameEnglish: "Colombian Chachalaca",
    commonNameSpanish: "Chachalaca Colombiana",
    scientificName: "Ortalis columbiana",
    ebirdCode: "colcha1",
    imagePath: "/images/blue-bird.jpg", // Using available image as placeholder
    description:
      "Large, noisy game bird endemic to Colombia's dry forests. Known for their loud, raucous calls that echo through the forest canopy at dawn and dusk.",
    habitat: "Dry tropical forests and woodland edges",
    region: "Caribbean Coast",
  },
  {
    id: "blue-billed-curassow",
    commonNameEnglish: "Blue-billed Curassow",
    commonNameSpanish: "Paujil Piquiazul",
    scientificName: "Crax alberti",
    ebirdCode: "blbcur1",
    imagePath: "/images/king-vulture.jpg", // Using available large bird image
    description:
      "Critically endangered large ground bird endemic to Colombia. This magnificent species is one of the most threatened birds in the Neotropics, found only in fragmented forest patches.",
    habitat: "Lowland humid forests",
    region: "Caribbean Coast",
  },
  {
    id: "andean-emerald",
    commonNameEnglish: "Andean Emerald",
    commonNameSpanish: "Esmeralda Andina",
    scientificName: "Uranomitra franciae",
    ebirdCode: "andeme1",
    imagePath: "/images/green-hermit-hummingbird.jpg",
    description:
      "Beautiful endemic hummingbird of Colombia's Andean slopes. This emerald-green jewel is perfectly adapted to high-altitude cloud forest environments.",
    habitat: "Montane cloud forests and forest edges",
    region: "Western Cordillera",
  },
  {
    id: "santa-marta-antpitta",
    commonNameEnglish: "Santa Marta Antpitta",
    commonNameSpanish: "Tororoi de Santa Marta",
    scientificName: "Grallaria bangsi",
    ebirdCode: "smaant1",
    imagePath: "/images/chestnut-crowned-antpitta.jpg",
    description:
      "Endemic ground-dwelling bird of the Sierra Nevada de Santa Marta. This elusive species represents the unique montane avifauna of Colombia's isolated coastal range.",
    habitat: "High-altitude cloud forests and páramo edges",
    region: "Sierra Nevada de Santa Marta",
  },
  {
    id: "perija-tapaculo",
    commonNameEnglish: "Perijá Tapaculo",
    commonNameSpanish: "Tapaculo del Perijá",
    scientificName: "Scytalopus perijanus",
    ebirdCode: "pertap1",
    imagePath: "/images/white-bearded-manakin.jpg", // Using available small bird image
    description:
      "Recently discovered endemic species from the Perijá Mountains. This secretive bird was only described to science in 2015, highlighting Colombia's incredible undiscovered biodiversity.",
    habitat: "High-altitude cloud forests and bamboo thickets",
    region: "Perijá Mountains",
  },
  {
    id: "santa-marta-brushfinch",
    commonNameEnglish: "Santa Marta Brush-Finch",
    commonNameSpanish: "Atlapetes de Santa Marta",
    scientificName: "Atlapetes melanocephalus",
    ebirdCode: "smbfin1",
    imagePath: "/images/yellow-crowned-euphonia.jpg",
    description:
      "Endemic finch of the Sierra Nevada de Santa Marta's high elevations. This distinctive yellow and black bird is perfectly adapted to the unique páramo ecosystem.",
    habitat: "High-altitude páramo and elfin forest",
    region: "Sierra Nevada de Santa Marta",
  },
  {
    id: "red-bellied-grackle",
    commonNameEnglish: "Red-bellied Grackle",
    commonNameSpanish: "Chamón Ventrirrojo",
    scientificName: "Hypopyrrhus pyrohypogaster",
    ebirdCode: "rebgra1",
    imagePath: "/images/vermillion-flycatcher.jpg",
    description:
      "Striking endemic blackbird with brilliant red underparts. This social species is found only in Colombia's Central Cordillera, often seen in flocks in coffee plantations.",
    habitat: "Coffee plantations and montane forest edges",
    region: "Central Cordillera",
  },
  {
    id: "crested-ant-tanager",
    commonNameEnglish: "Crested Ant-Tanager",
    commonNameSpanish: "Tangara Hormiguera Crestada",
    scientificName: "Habia cristata",
    ebirdCode: "creant1",
    imagePath: "/images/red-headed-barbet.jpg",
    description:
      "Distinctive crested tanager endemic to Colombia's Pacific slope. This colorful bird follows army ant swarms to catch insects disturbed by the marching ants.",
    habitat: "Lowland humid forests and forest edges",
    region: "Pacific Coast",
  },
  {
    id: "golden-fronted-redstart",
    commonNameEnglish: "Golden-fronted Redstart",
    commonNameSpanish: "Candelita Frentidorada",
    scientificName: "Myioborus ornatus",
    ebirdCode: "gofreds1",
    imagePath: "/images/yellow-warbler.jpg",
    description:
      "Beautiful endemic warbler of Colombia's high Andes. This active insectivore displays a brilliant golden forehead that gleams in the mountain sunlight.",
    habitat: "High-altitude cloud forests and páramo edges",
    region: "Eastern Cordillera",
  },
]

interface EndemicBirdsCarouselProps {
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
}

export default function EndemicBirdsCarousel({
  className,
  autoPlay = true,
  autoPlayInterval = 6000,
}: EndemicBirdsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-play functionality with proper cleanup
  useEffect(() => {
    if (!isAutoPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    intervalRef.current = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % endemicBirdsData.length)
        setIsTransitioning(false)
      }, 150)
    }, autoPlayInterval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isAutoPlaying, autoPlayInterval])

  const goToPrevious = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setIsAutoPlaying(false)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? endemicBirdsData.length - 1 : prevIndex - 1))
      setIsTransitioning(false)
    }, 150)
  }

  const goToNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setIsAutoPlaying(false)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % endemicBirdsData.length)
      setIsTransitioning(false)
    }, 150)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return
    setIsTransitioning(true)
    setIsAutoPlaying(false)
    setTimeout(() => {
      setCurrentIndex(index)
      setIsTransitioning(false)
    }, 150)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  const currentBird = endemicBirdsData[currentIndex]

  return (
    <div className={cn("w-full max-w-6xl mx-auto", className)}>
      <Card className="overflow-hidden shadow-2xl border-0 bg-white">
        <CardContent className="p-0">
          {/* Main Carousel Display */}
          <div className="relative">
            {/* Image Container - Optimized Dimensions */}
            <div className="relative aspect-[5/3] overflow-hidden bg-gradient-to-br from-emerald-50 via-blue-50 to-emerald-50">
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent z-10" />

              <OptimizedImage
                src={currentBird.imagePath}
                alt={`${currentBird.commonNameEnglish} - ${currentBird.description}`}
                width={1000}
                height={600}
                className={cn(
                  "carousel-active transition-all duration-500 ease-in-out",
                  isTransitioning ? "opacity-75 scale-105" : "opacity-100 scale-100",
                )}
                priority={currentIndex === 0}
                style={{
                  objectFit: "contain",
                  objectPosition: "center center",
                }}
              />

              {/* Enhanced Navigation Buttons */}
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2 z-20",
                  "w-10 h-10 rounded-full",
                  "bg-white/95 hover:bg-white border-2 border-emerald-200 hover:border-emerald-300",
                  "shadow-lg hover:shadow-xl backdrop-blur-sm",
                  "transition-all duration-300 ease-in-out",
                  "hover:scale-110 active:scale-95",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                )}
                onClick={goToPrevious}
                disabled={isTransitioning}
                aria-label="Previous bird species"
              >
                <ChevronLeft className="w-5 h-5 text-emerald-700" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2 z-20",
                  "w-10 h-10 rounded-full",
                  "bg-white/95 hover:bg-white border-2 border-emerald-200 hover:border-emerald-300",
                  "shadow-lg hover:shadow-xl backdrop-blur-sm",
                  "transition-all duration-300 ease-in-out",
                  "hover:scale-110 active:scale-95",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                )}
                onClick={goToNext}
                disabled={isTransitioning}
                aria-label="Next bird species"
              >
                <ChevronRight className="w-5 h-5 text-emerald-700" />
              </Button>

              {/* Compact Slide Indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 z-20">
                {endemicBirdsData.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "transition-all duration-300 rounded-full",
                      index === currentIndex
                        ? "w-6 h-2.5 bg-white shadow-md"
                        : "w-2.5 h-2.5 bg-white/60 hover:bg-white/80 hover:scale-110",
                    )}
                    onClick={() => goToSlide(index)}
                    disabled={isTransitioning}
                    aria-label={`Go to ${endemicBirdsData[index].commonNameEnglish}`}
                  />
                ))}
              </div>

              {/* Compact Region Badge */}
              <Badge className="absolute top-3 left-3 z-20 bg-emerald-600/90 text-white border-0 shadow-lg backdrop-blur-sm px-2.5 py-1 text-xs">
                {currentBird.region}
              </Badge>
            </div>

            {/* Optimized Information Panel */}
            <div className="p-6 bg-white">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Names and Scientific Info */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="text-2xl font-bold text-gray-900 leading-tight">{currentBird.commonNameEnglish}</h3>
                    <p className="text-lg text-emerald-600 font-medium italic">{currentBird.commonNameSpanish}</p>
                    <p className="text-sm text-gray-500 italic font-light">{currentBird.scientificName}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <span className="text-xs font-semibold text-gray-700 min-w-[50px]">Habitat:</span>
                      <span className="text-xs text-gray-600 leading-relaxed">{currentBird.habitat}</span>
                    </div>
                  </div>
                </div>

                {/* Description and Controls */}
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed text-sm">{currentBird.description}</p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://ebird.org/species/${currentBird.ebirdCode}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-300 text-xs font-medium shadow-md hover:shadow-lg hover:scale-105"
                    >
                      <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                      View on eBird
                    </a>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleAutoPlay}
                      className={cn(
                        "border-2 transition-all duration-300 px-4 py-2.5 text-xs",
                        isAutoPlaying
                          ? "border-emerald-600 text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
                          : "border-gray-300 text-gray-600 hover:border-emerald-300 hover:text-emerald-600",
                      )}
                    >
                      {isAutoPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5 mr-1.5" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 mr-1.5" />
                          Play
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Thumbnail Navigation */}
          <div className="p-4 bg-gradient-to-r from-gray-50 to-emerald-50 border-t border-gray-100">
            <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-hide">
              {endemicBirdsData.map((bird, index) => (
                <button
                  key={bird.id}
                  className={cn(
                    "flex-shrink-0 relative w-16 h-16 rounded-lg overflow-hidden transition-all duration-300",
                    "border-2 shadow-sm hover:shadow-md",
                    index === currentIndex
                      ? "border-emerald-500 ring-2 ring-emerald-200 scale-105"
                      : "border-gray-200 hover:border-emerald-300 hover:scale-102",
                  )}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  aria-label={`View ${bird.commonNameEnglish}`}
                >
                  <OptimizedImage
                    src={bird.imagePath}
                    alt={bird.commonNameEnglish}
                    width={64}
                    height={64}
                    className="carousel object-cover w-full h-full"
                  />
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-emerald-600/15 backdrop-blur-[0.5px]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compact Progress Indicator */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center space-x-3 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100">
          <span className="text-xs font-medium text-gray-600">
            {currentIndex + 1} of {endemicBirdsData.length}
          </span>
          <div className="w-px h-3 bg-gray-300" />
          <span className="text-xs text-emerald-600 font-medium">Endemic Colombian Birds</span>
        </div>
      </div>
    </div>
  )
}
