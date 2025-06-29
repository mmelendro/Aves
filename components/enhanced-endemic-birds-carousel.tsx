"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Pause, Info, Camera, MapPin, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface BirdData {
  id: string
  commonName: string
  scientificName: string
  spanishName: string
  bioregion: string
  bioregionSlug: string
  secondaryRegions?: Array<{
    name: string
    slug: string
  }>
  family: string
  order: string
  status: "Endemic" | "Near Endemic" | "Spectacular" | "Regional Specialty"
  habitat: string
  description: string
  image: string
  audioFile?: string
  conservationStatus: string
  bestTime: string
  difficulty: "Easy" | "Moderate" | "Challenging"
  ebirdCode: string
  bioregionDescription: string
}

// Twelve birds representing Colombia's bioregions
const bioregionBirds: BirdData[] = [
  {
    id: "1",
    commonName: "Green-bearded Helmetcrest",
    scientificName: "Oxypogon guerinii",
    spanishName: "Colibrí Crestado Verde",
    bioregion: "Eastern Andes",
    bioregionSlug: "eastern-andes",
    family: "Trochilidae",
    order: "Apodiformes",
    status: "Endemic",
    habitat: "High-altitude páramo and cloud forest edges",
    description:
      "A spectacular endemic hummingbird with distinctive green throat feathers and crest, found only in Colombia's Eastern Andes.",
    image: "/images/green-bearded-helmetcrest.png",
    audioFile: "/audio/gnbhel1.mp3",
    conservationStatus: "Near Threatened",
    bestTime: "December - March",
    difficulty: "Challenging",
    ebirdCode: "gnbhel1",
    bioregionDescription: "High-altitude ecosystems including páramo and cloud forests near Bogotá.",
  },
  {
    id: "2",
    commonName: "Rainbow-bearded Thornbill",
    scientificName: "Chalcostigma herrani",
    spanishName: "Colibrí Barbudo Arcoíris",
    bioregion: "Central Andes",
    bioregionSlug: "central-andes",
    secondaryRegions: [
      { name: "Western Andes", slug: "western-andes" },
      { name: "Colombian Massif", slug: "colombian-massif" },
    ],
    family: "Trochilidae",
    order: "Apodiformes",
    status: "Endemic",
    habitat: "High-altitude páramo and volcanic slopes",
    description:
      "A spectacular endemic hummingbird with iridescent rainbow plumage on its throat and distinctive white leg puffs. Primarily found in the Central Andes with populations extending to the Western Andes and Colombian Massif.",
    image: "/images/rainbow-bearded-thornbill.jpg",
    audioFile: "/audio/rabtho1.mp3",
    conservationStatus: "Near Threatened",
    bestTime: "December - March",
    difficulty: "Challenging",
    ebirdCode: "rabtho1",
    bioregionDescription:
      "Coffee region with cloud forests and high-altitude páramo ecosystems across multiple Andean ranges.",
  },
  {
    id: "3",
    commonName: "Black-billed Mountain-Toucan",
    scientificName: "Andigena nigrirostris",
    spanishName: "Tucán Andino Piquinegro",
    bioregion: "Central Andes",
    bioregionSlug: "central-andes",
    secondaryRegions: [
      { name: "Western Andes", slug: "western-andes" },
      { name: "Eastern Andes", slug: "eastern-andes" },
      { name: "Colombian Massif", slug: "colombian-massif" },
      { name: "Cauca Valley", slug: "cauca-valley" },
    ],
    family: "Ramphastidae",
    order: "Piciformes",
    status: "Near Endemic",
    habitat: "Montane cloud forests and forest edges at 1,500-2,500m elevation",
    description:
      "A striking mountain toucan with distinctive black bill and colorful plumage, found across Colombia's Andean ranges at elevations between 1,500-2,500m. Primarily inhabits the Central Andes with populations extending throughout the Western and Eastern Andes, Colombian Massif, and Cauca Valley.",
    image: "/images/bbmtou1-black-billed-mountain-toucan.png",
    audioFile: "/audio/bbmtou1.mp3",
    conservationStatus: "Least Concern",
    bestTime: "Year-round",
    difficulty: "Moderate",
    ebirdCode: "bbmtou1",
    bioregionDescription:
      "Montane cloud forests across multiple Andean ranges, representing the extensive distribution of mid-elevation species.",
  },
  {
    id: "4",
    commonName: "Chestnut-crowned Antpitta",
    scientificName: "Grallaria ruficapilla",
    spanishName: "Tororoi Coronirrufo",
    bioregion: "Colombian Massif",
    bioregionSlug: "colombian-massif",
    secondaryRegions: [
      { name: "Eastern Andes", slug: "eastern-andes" },
      { name: "Central Andes", slug: "central-andes" },
      { name: "Cauca Valley", slug: "cauca-valley" },
    ],
    family: "Grallariidae",
    order: "Passeriformes",
    status: "Endemic",
    habitat: "Cloud forest understory",
    description:
      "An elusive ground-dwelling bird known for its distinctive chestnut crown and secretive nature in dense cloud forests. Primarily found in the Colombian Massif with populations extending across multiple Andean regions.",
    image: "/images/chestnut-crowned-antpitta.jpg",
    audioFile: "/audio/chcant2.mp3",
    conservationStatus: "Least Concern",
    bestTime: "Year-round",
    difficulty: "Moderate",
    ebirdCode: "chcant2",
    bioregionDescription:
      "High-altitude volcanic region where the Andes divide, with populations across multiple mountain ranges.",
  },
  {
    id: "5",
    commonName: "Andean Motmot",
    scientificName: "Momotus aequatorialis",
    spanishName: "Momoto Andino",
    bioregion: "Central Andes",
    bioregionSlug: "central-andes",
    secondaryRegions: [
      { name: "Colombian Massif", slug: "colombian-massif" },
      { name: "Western Andes", slug: "western-andes" },
      { name: "Pacific Coast Chocó", slug: "pacific-coast-choco" },
    ],
    family: "Momotidae",
    order: "Coraciiformes",
    status: "Near Endemic",
    habitat: "Humid montane forests and cloud forest edges",
    description:
      "A stunning bird with a brilliant blue crown and distinctive racket-tipped tail, found across multiple Andean regions with the highest concentrations in the Central Andes.",
    image: "/images/blue-crowned-motmot-new.jpg",
    audioFile: "/audio/blcmot1.mp3",
    conservationStatus: "Least Concern",
    bestTime: "Year-round",
    difficulty: "Easy",
    ebirdCode: "higmot1",
    bioregionDescription: "Montane cloud forests with incredible biodiversity across multiple Andean ranges.",
  },
  {
    id: "6",
    commonName: "Santa Marta Antbird",
    scientificName: "Drymophila hellmayri",
    spanishName: "Hormiguero de Santa Marta",
    bioregion: "Sierra Nevada de Santa Marta",
    bioregionSlug: "sierra-nevada-santa-marta",
    family: "Thamnophilidae",
    order: "Passeriformes",
    status: "Endemic",
    habitat: "Cloud forest understory and bamboo thickets",
    description:
      "Endemic antbird found only in the Sierra Nevada de Santa Marta, a symbol of this unique mountain range.",
    image: "/images/santa-marta-antbird.jpg",
    audioFile: "/audio/samant1.mp3",
    conservationStatus: "Near Threatened",
    bestTime: "December - March",
    difficulty: "Challenging",
    ebirdCode: "samant1",
    bioregionDescription: "World's most important endemic bird area with 15+ species found nowhere else.",
  },
  {
    id: "7",
    commonName: "Vermilion Cardinal",
    scientificName: "Cardinalis phoeniceus",
    spanishName: "Cardenal Guajiro",
    bioregion: "Caribbean Coast",
    bioregionSlug: "caribbean-coast",
    secondaryRegions: [{ name: "Magdalena Valley", slug: "magdalena-valley" }],
    family: "Cardinalidae",
    order: "Passeriformes",
    status: "Endemic",
    habitat: "Dry scrublands, thorny forests, and semi-arid coastal areas",
    description:
      "A spectacular endemic cardinal with brilliant vermilion-red plumage, found primarily along Colombia's Caribbean coast. This striking bird inhabits dry scrublands and thorny forests, with some populations extending into the northern Magdalena Valley.",
    image: "/images/cardinal-guajiro.jpg",
    audioFile: "/audio/vercar1.mp3",
    conservationStatus: "Near Threatened",
    bestTime: "December - April",
    difficulty: "Moderate",
    ebirdCode: "vercar1",
    bioregionDescription: "Dry coastal forests and scrublands with unique Caribbean endemic species.",
  },
  {
    id: "8",
    commonName: "Magdalena Antbird",
    scientificName: "Sipia laemosticta",
    spanishName: "Hormiguero del Magdalena",
    bioregion: "Magdalena Valley",
    bioregionSlug: "magdalena-valley",
    family: "Thamnophilidae",
    order: "Passeriformes",
    status: "Endemic",
    habitat: "Riparian forests and wetland edges",
    description: "Endemic antbird of the Magdalena Valley, representing the diverse river ecosystems of Colombia.",
    image: "/images/magdalena-antbird.jpg",
    audioFile: "/audio/magant1.mp3",
    conservationStatus: "Endangered",
    bestTime: "December - March",
    difficulty: "Moderate",
    ebirdCode: "magant1",
    bioregionDescription: "Major river valley with diverse habitats from wetlands to dry forests.",
  },
  {
    id: "9",
    commonName: "Cauca Guan",
    scientificName: "Penelope perspicax",
    spanishName: "Pava del Cauca",
    bioregion: "Cauca Valley",
    bioregionSlug: "cauca-valley",
    family: "Cracidae",
    order: "Galliformes",
    status: "Endemic",
    habitat: "Dry forests and forest edges",
    description:
      "Critically endangered endemic guan of the Cauca Valley, symbol of conservation efforts in the region.",
    image: "/images/cauca-guan.jpg",
    audioFile: "/audio/caugua1.mp3",
    conservationStatus: "Critically Endangered",
    bestTime: "Year-round",
    difficulty: "Challenging",
    ebirdCode: "caugua1",
    bioregionDescription: "Inter-Andean valley with dry forests and agricultural landscapes.",
  },
  {
    id: "10",
    commonName: "Orinocan Saltator",
    scientificName: "Saltator orenocensis",
    spanishName: "Saltador Llanero",
    bioregion: "Eastern Plains (Llanos)",
    bioregionSlug: "eastern-plains",
    family: "Thraupidae",
    order: "Passeriformes",
    status: "Regional Specialty",
    habitat: "Gallery forests and grassland edges",
    description: "Distinctive saltator of Colombia's vast Eastern Plains, representing the unique Llanos ecosystem.",
    image: "/images/orinocan-saltator.jpg",
    audioFile: "/audio/orisal1.mp3",
    conservationStatus: "Least Concern",
    bestTime: "December - April",
    difficulty: "Easy",
    ebirdCode: "orisal1",
    bioregionDescription: "Vast grasslands and gallery forests with unique grassland species.",
  },
  {
    id: "11",
    commonName: "Harpy Eagle",
    scientificName: "Harpia harpyja",
    spanishName: "Águila Arpía",
    bioregion: "Amazon Rainforest",
    bioregionSlug: "amazon-rainforest",
    family: "Accipitridae",
    order: "Accipitriformes",
    status: "Spectacular",
    habitat: "Primary rainforest canopy",
    description:
      "Magnificent apex predator of the Amazon, one of the world's most powerful eagles and symbol of pristine rainforest.",
    image: "/images/harpy-eagle.jpg",
    audioFile: "/audio/hareag1.mp3",
    conservationStatus: "Near Threatened",
    bestTime: "June - September",
    difficulty: "Challenging",
    ebirdCode: "hareag1",
    bioregionDescription: "World's largest rainforest with incredible biodiversity and canopy species.",
  },
  {
    id: "12",
    commonName: "Yellow-throated Toucan",
    scientificName: "Ramphastos ambiguus",
    spanishName: "Tucán Piquiverde",
    bioregion: "Pacific Coast Chocó",
    bioregionSlug: "pacific-coast-choco",
    family: "Ramphastidae",
    order: "Piciformes",
    status: "Spectacular",
    habitat: "Lowland and montane rainforests",
    description:
      "A magnificent large toucan with a massive colorful bill and distinctive yellow throat, often seen in fruiting trees.",
    image: "/images/yellow-throated-toucan.jpg",
    audioFile: "/audio/yellow-throated-toucan.mp3",
    conservationStatus: "Vulnerable",
    bestTime: "Year-round",
    difficulty: "Easy",
    ebirdCode: "yettou1",
    bioregionDescription: "One of the world's most biodiverse regions with spectacular endemic species.",
  },
]

interface EnhancedEndemicBirdsCarouselProps {
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
}

export default function EnhancedEndemicBirdsCarousel({
  className,
  autoPlay = true,
  autoPlayInterval = 8000,
}: EnhancedEndemicBirdsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [showInfo, setShowInfo] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Mobile detection with proper hydration handling
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bioregionBirds.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + bioregionBirds.length) % bioregionBirds.length)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const handleNavigation = (direction: "next" | "prev") => {
    if (direction === "next") {
      nextSlide()
    } else {
      prevSlide()
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Endemic":
        return "bg-red-100 text-red-800 border-red-200"
      case "Near Endemic":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Spectacular":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Regional Specialty":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 border-green-200"
      case "Moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Challenging":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const currentBird = bioregionBirds[currentIndex]

  // Function to get image positioning based on bird ID
  const getImagePositioning = (birdId: string) => {
    switch (birdId) {
      case "1": // Green-bearded Helmetcrest
        return {
          objectPosition: "left center",
          className: "object-cover object-left",
        }
      case "7": // Vermilion Cardinal - shift down to show crest
        return {
          objectPosition: "center 60%", // Shift down by ~20px equivalent
          className: "object-cover",
        }
      default:
        return {
          objectPosition: "center center",
          className: "object-cover",
        }
    }
  }

  const currentImagePositioning = getImagePositioning(currentBird.id)

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(nextSlide, autoPlayInterval)
      return () => clearInterval(interval)
    }
  }, [isPlaying, nextSlide, autoPlayInterval])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

  // Mobile-optimized layout
  if (isMobile) {
    return (
      <div className={cn("relative w-full max-w-full overflow-hidden", className)}>
        <Card className="overflow-hidden border-0 shadow-lg mx-2">
          <div className="relative">
            {/* Mobile Main Image - 16:9 aspect ratio for better mobile viewing */}
            <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
              <img
                src={currentBird.image || "/placeholder.svg?height=400&width=600&text=Bird+Image"}
                alt={`${currentBird.commonName} - ${currentBird.bioregion}`}
                className={cn("w-full h-full transition-all duration-500", currentImagePositioning.className)}
                style={{
                  objectPosition: currentImagePositioning.objectPosition,
                  objectFit: "cover",
                }}
                onLoad={() => setIsLoading(false)}
              />

              {/* Loading Indicator */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="w-6 h-6 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {/* Mobile Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Mobile Navigation Arrows - Larger touch targets */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/25 backdrop-blur-sm hover:bg-white/35 text-white border-0 w-12 h-12 rounded-full touch-manipulation shadow-lg"
                onClick={() => handleNavigation("prev")}
                aria-label="Previous bird"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/25 backdrop-blur-sm hover:bg-white/35 text-white border-0 w-12 h-12 rounded-full touch-manipulation shadow-lg"
                onClick={() => handleNavigation("next")}
                aria-label="Next bird"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              {/* Mobile Control Buttons - Repositioned for better accessibility */}
              <div className="absolute top-3 right-3 flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/25 backdrop-blur-sm hover:bg-white/35 text-white border-0 w-10 h-10 p-0 rounded-full touch-manipulation shadow-lg"
                  onClick={togglePlayPause}
                  aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/25 backdrop-blur-sm hover:bg-white/35 text-white border-0 w-10 h-10 p-0 rounded-full touch-manipulation shadow-lg"
                  onClick={toggleInfo}
                  aria-label="Toggle information"
                >
                  <Info className="w-4 h-4" />
                </Button>
              </div>

              {/* Mobile Status Badges - Smaller and repositioned */}
              <div className="absolute top-3 left-3 flex flex-col gap-1">
                <Badge className={cn("text-xs font-medium border", getStatusColor(currentBird.status))}>
                  {currentBird.status}
                </Badge>
                {currentBird.secondaryRegions && currentBird.secondaryRegions.length > 0 && (
                  <Badge className="text-xs font-medium border bg-blue-50 text-blue-700 border-blue-200">
                    Multi-region
                  </Badge>
                )}
              </div>

              {/* Mobile Bird Information Overlay - Optimized spacing */}
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm font-medium text-emerald-300 truncate">{currentBird.bioregion}</span>
                    {currentBird.secondaryRegions && currentBird.secondaryRegions.length > 0 && (
                      <span className="text-xs text-blue-300 flex-shrink-0">
                        +{currentBird.secondaryRegions.length}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold leading-tight">{currentBird.commonName}</h3>
                    <p className="text-sm italic opacity-90 leading-tight">{currentBird.scientificName}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Content Section */}
          <CardContent className="p-4">
            {/* Mobile Info Panel */}
            {showInfo && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg border">
                <p className="text-sm leading-relaxed mb-3">{currentBird.description}</p>

                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div className="flex items-center gap-1">
                    <Camera className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{currentBird.bestTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge className={cn("text-xs", getDifficultyColor(currentBird.difficulty))}>
                      {currentBird.difficulty}
                    </Badge>
                  </div>
                </div>

                <div className="text-xs text-gray-600 mb-3">
                  <span className="font-medium">Habitat:</span> {currentBird.habitat}
                </div>

                <div className="flex flex-col gap-2">
                  <Link href={`/bioregions/${currentBird.bioregionSlug}`} className="w-full">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-xs w-full">
                      <MapPin className="w-3 h-3 mr-2" />
                      Explore {currentBird.bioregion.split(" ")[0]}
                    </Button>
                  </Link>
                  <Link
                    href={`/shopping?region=${encodeURIComponent(currentBird.bioregion)}&tour=Adventure+Tours&from=carousel`}
                    className="w-full"
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-xs w-full bg-transparent"
                    >
                      <ExternalLink className="w-3 h-3 mr-2" />
                      Plan Trip
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Mobile Thumbnail Navigation - Horizontal scroll */}
            <div className="mb-4">
              <div
                className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 carousel-touch-area"
                style={{ scrollSnapType: "x mandatory" }}
              >
                {bioregionBirds.map((bird, index) => {
                  const thumbnailPositioning = getImagePositioning(bird.id)
                  return (
                    <button
                      key={bird.id}
                      onClick={() => goToSlide(index)}
                      className={cn(
                        "flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all relative touch-manipulation",
                        index === currentIndex ? "border-emerald-500 ring-2 ring-emerald-200" : "border-gray-200",
                      )}
                      style={{ scrollSnapAlign: "start" }}
                      aria-label={`View ${bird.commonName} from ${bird.bioregion}`}
                    >
                      <img
                        src={bird.image || "/placeholder.svg?height=56&width=56&text=Bird"}
                        alt={bird.commonName}
                        className={cn("w-full h-full transition-all", thumbnailPositioning.className)}
                        style={{
                          objectPosition: thumbnailPositioning.objectPosition,
                          objectFit: "cover",
                        }}
                      />
                      {index === currentIndex && <div className="absolute inset-0 bg-emerald-500/20" />}

                      {/* Multi-region indicator */}
                      {bird.secondaryRegions && bird.secondaryRegions.length > 0 && (
                        <div className="absolute top-0 right-0 w-2 h-2 bg-blue-400 rounded-full" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Mobile Progress Indicators */}
            <div className="flex justify-center gap-1 mb-4">
              {bioregionBirds.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all touch-manipulation",
                    index === currentIndex ? "bg-emerald-500" : "bg-gray-300",
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Mobile CTA Section */}
            <div className="p-3 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border border-emerald-200">
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">Explore Colombia's Bioregions</h4>
                <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                  Discover {bioregionBirds.length} unique bioregions with endemic species and spectacular wildlife.
                </p>
                <div className="flex flex-col gap-2">
                  <Link href={`/bioregions/${currentBird.bioregionSlug}`} className="w-full">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-sm w-full">
                      <MapPin className="w-4 h-4 mr-2" />
                      Explore {currentBird.bioregion.split(" ")[0]}
                    </Button>
                  </Link>
                  <a
                    href={`https://ebird.org/species/${currentBird.ebirdCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button
                      variant="outline"
                      className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-sm w-full bg-transparent"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on eBird
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Desktop layout (existing code with responsive improvements)
  return (
    <div className={cn("relative w-full max-w-4xl mx-auto", className)}>
      <Card className="overflow-hidden border-0 shadow-2xl">
        <div className="relative">
          {/* Desktop Main Image */}
          <div className="aspect-square relative overflow-hidden bg-gray-100">
            <img
              src={currentBird.image || "/placeholder.svg?height=600&width=600&text=Bird+Image"}
              alt={`${currentBird.commonName} - ${currentBird.bioregion}`}
              className={cn(
                "w-full h-full transition-all duration-700 hover:scale-105",
                currentImagePositioning.className,
              )}
              style={{
                objectPosition: currentImagePositioning.objectPosition,
                objectFit: "cover",
              }}
              onLoad={() => setIsLoading(false)}
            />

            {/* Loading Indicator */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Desktop Navigation Arrows */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 w-10 h-10 rounded-full"
              onClick={() => handleNavigation("prev")}
              aria-label="Previous bird"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 w-10 h-10 rounded-full"
              onClick={() => handleNavigation("next")}
              aria-label="Next bird"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>

            {/* Desktop Control Buttons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 w-10 h-10 p-0 relative group"
                  onClick={togglePlayPause}
                  aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {isPlaying ? "Pause slideshow" : "Play slideshow"}
                  </div>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 w-10 h-10 p-0 relative group"
                  onClick={toggleInfo}
                  aria-label="Toggle information"
                >
                  <Info className="w-4 h-4" />
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    Toggle information
                  </div>
                </Button>
              </div>

              <div className="flex justify-end">
                <a
                  href={`https://ebird.org/species/${currentBird.ebirdCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 w-10 h-10 p-0 rounded-md flex items-center justify-center transition-colors relative group"
                  aria-label={`View ${currentBird.commonName} on eBird`}
                >
                  <ExternalLink className="w-4 h-4" />
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    View on eBird
                  </div>
                </a>
              </div>
            </div>

            {/* Desktop Status and Difficulty Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              <Badge className={cn("text-xs font-medium border", getStatusColor(currentBird.status))}>
                {currentBird.status}
              </Badge>
              <Badge className={cn("text-xs font-medium border", getDifficultyColor(currentBird.difficulty))}>
                {currentBird.difficulty}
              </Badge>
              {currentBird.secondaryRegions && currentBird.secondaryRegions.length > 0 && (
                <Badge className="text-xs font-medium border bg-blue-50 text-blue-700 border-blue-200">
                  Multi-region
                </Badge>
              )}
            </div>

            {/* Desktop Bird Information Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-medium text-emerald-300">{currentBird.bioregion}</span>
                  </div>
                  {currentBird.secondaryRegions && currentBird.secondaryRegions.length > 0 && (
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-blue-300">+{currentBird.secondaryRegions.length} more</span>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold">{currentBird.commonName}</h3>
                  <p className="text-sm italic opacity-90">{currentBird.scientificName}</p>
                  <p className="text-xs opacity-75">{currentBird.spanishName}</p>
                </div>

                {showInfo && (
                  <div className="space-y-3 bg-black/40 backdrop-blur-sm rounded-lg p-3 mt-3">
                    <p className="text-sm leading-relaxed">{currentBird.description}</p>

                    {currentBird.secondaryRegions && currentBird.secondaryRegions.length > 0 && (
                      <div className="text-xs">
                        <span className="font-medium text-emerald-300">Primary region:</span> {currentBird.bioregion}
                        <br />
                        <span className="font-medium text-blue-300">Also found in:</span>{" "}
                        {currentBird.secondaryRegions.map((region, index) => (
                          <span key={region.slug}>
                            {region.name}
                            {index < currentBird.secondaryRegions!.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <Camera className="w-3 h-3" />
                        <span>{currentBird.bestTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Status:</span>
                        <span>{currentBird.conservationStatus}</span>
                      </div>
                    </div>

                    <div className="text-xs opacity-75">
                      <span className="font-medium">Habitat:</span> {currentBird.habitat}
                    </div>

                    <div className="flex flex-row gap-2 mt-3">
                      <Link href={`/bioregions/${currentBird.bioregionSlug}`}>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-xs">
                          Explore {currentBird.bioregion.split(" ")[0]}
                        </Button>
                      </Link>
                      <Link
                        href={`/shopping?region=${encodeURIComponent(currentBird.bioregion)}&tour=Adventure+Tours&from=carousel`}
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white text-white hover:bg-white hover:text-gray-900 text-xs bg-transparent"
                        >
                          Plan Trip
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Thumbnail Navigation */}
        <CardContent className="p-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {bioregionBirds.map((bird, index) => {
              const thumbnailPositioning = getImagePositioning(bird.id)
              return (
                <button
                  key={bird.id}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all relative",
                    index === currentIndex
                      ? "border-emerald-500 ring-2 ring-emerald-200"
                      : "border-gray-200 hover:border-gray-300",
                  )}
                  aria-label={`View ${bird.commonName} from ${bird.bioregion}`}
                >
                  <img
                    src={bird.image || "/placeholder.svg?height=64&width=64&text=Bird"}
                    alt={bird.commonName}
                    className={cn("w-full h-full transition-all", thumbnailPositioning.className)}
                    style={{
                      objectPosition: thumbnailPositioning.objectPosition,
                      objectFit: "cover",
                    }}
                  />
                  {index === currentIndex && <div className="absolute inset-0 bg-emerald-500/20" />}

                  {bird.secondaryRegions && bird.secondaryRegions.length > 0 && (
                    <div className="absolute top-0 right-0 w-2 h-2 bg-blue-400 rounded-full" />
                  )}

                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-1 py-0.5 truncate">
                    {bird.bioregion.split(" ")[0]}
                    {bird.secondaryRegions && bird.secondaryRegions.length > 0 && (
                      <span className="text-blue-300">+</span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Desktop Progress Indicators */}
          <div className="flex justify-center gap-1 mt-3">
            {bioregionBirds.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === currentIndex ? "bg-emerald-500" : "bg-gray-300 hover:bg-gray-400",
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Desktop Call-to-Action Section */}
          <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border border-emerald-200">
            <div className="text-center">
              <h4 className="font-semibold text-gray-900 mb-2">Ready to Explore Colombia's Bioregions?</h4>
              <p className="text-sm text-gray-600 mb-3">
                Discover the incredible diversity of Colombia's {bioregionBirds.length} unique bioregions, each with its
                own endemic species and spectacular wildlife.
              </p>
              <div className="flex flex-row gap-2 justify-center">
                <Link href={`/bioregions/${currentBird.bioregionSlug}`}>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    Explore {currentBird.bioregion}
                  </Button>
                </Link>
                <Link
                  href={`/shopping?region=${encodeURIComponent(currentBird.bioregion)}&tour=Adventure+Tours&from=carousel`}
                >
                  <Button
                    variant="outline"
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-sm bg-transparent"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Plan Your Adventure
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
