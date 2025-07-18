"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Pause, Info, Camera, MapPin, ExternalLink, X } from "lucide-react"
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
  photoCredit?: {
    photographer: string
    instagramHandle?: string
    postUrl?: string
    linkTo?: string
    isGuide?: boolean
    title?: string
    location?: string
    locationLink?: string
  }
}

// Bird data - all entries have actual images
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
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gnbhel1-jW2PKUzvLWZei8669aA02TqmJyaG67.mp3",
    conservationStatus: "Near Threatened",
    bestTime: "December - March",
    difficulty: "Challenging",
    ebirdCode: "gnbhel1",
    bioregionDescription: "High-altitude ecosystems including páramo and cloud forests near Bogotá.",
    photoCredit: {
      photographer: "Nicolás Rozo",
      title: "AVES Guide",
      instagramHandle: "@nicolas_rozop",
      postUrl: "https://www.instagram.com/p/C247ZDJgXBa/",
      linkTo: "/team#nicolas-rozo",
      isGuide: true,
    },
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
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rabtho1-wSpzpHneonuPjIv0HlwJvDekyiIOFS.mp3",
    conservationStatus: "Near Threatened",
    bestTime: "December - March",
    difficulty: "Challenging",
    ebirdCode: "rabtho1",
    bioregionDescription:
      "Coffee region with cloud forests and high-altitude páramo ecosystems across multiple Andean ranges.",
    photoCredit: {
      photographer: "Royann Petrell",
      title: "Early Guest",
      location: "Termales del Ruiz",
      locationLink: "/about/partners#termales-del-ruiz",
    },
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
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bbmtou1-2FO9udCERF00OCxv3mOYD7NSsuBka4.mp3",
    conservationStatus: "Least Concern",
    bestTime: "Year-round",
    difficulty: "Moderate",
    ebirdCode: "bbmtou1",
    bioregionDescription:
      "Montane cloud forests across multiple Andean ranges, representing the extensive distribution of mid-elevation species.",
    photoCredit: {
      photographer: "Royann Petrell",
      title: "Early Guest",
      location: "Reserva Río Blanco",
      locationLink: "/about/partners#reserva-rio-blanco",
    },
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
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chcant2-Ki53m2SAfspPkf802ytalVJP6ydkP6.mp3",
    conservationStatus: "Least Concern",
    bestTime: "Year-round",
    difficulty: "Moderate",
    ebirdCode: "chcant2",
    bioregionDescription:
      "High-altitude volcanic region where the Andes divide, with populations across multiple mountain ranges.",
    photoCredit: {
      photographer: "Martin Melendro",
      title: "Founder & Lead Guide",
      linkTo: "/team#martin-melendro",
      isGuide: true,
      location: "Reserva Río Blanco",
      locationLink: "/about/partners#reserva-rio-blanco",
    },
  },
  {
    id: "5",
    commonName: "Andean Motmot",
    scientificName: "Momotus aequatorialis",
    spanishName: "Momoto Andino",
    bioregion: "Western Andes",
    bioregionSlug: "western-andes",
    secondaryRegions: [
      { name: "Colombian Massif", slug: "colombian-massif" },
      { name: "Central Andes", slug: "central-andes" },
      { name: "Pacific Coast Chocó", slug: "pacific-coast-choco" },
    ],
    family: "Momotidae",
    order: "Coraciiformes",
    status: "Near Endemic",
    habitat: "Humid montane forests and cloud forest edges",
    description:
      "A stunning bird with a brilliant blue crown and distinctive racket-tipped tail, found across multiple Andean regions with the highest concentrations in the Western Andes.",
    image: "/images/blue-crowned-motmot-new.jpg",
    audioFile: "/audio/blcmot1.mp3",
    conservationStatus: "Least Concern",
    bestTime: "Year-round",
    difficulty: "Easy",
    ebirdCode: "higmot1",
    bioregionDescription: "Montane cloud forests with incredible biodiversity across multiple Andean ranges.",
    photoCredit: {
      photographer: "Martin Melendro",
      title: "Founder & Lead Guide",
      linkTo: "/team#martin-melendro",
      isGuide: true,
      location: "Reserva Río Blanco",
      locationLink: "/about/partners#reserva-rio-blanco",
    },
  },
  {
    id: "6",
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
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vercar1-WoATFgG9uKl13LGTrEjhszPdrlkyqU.mp3",
    conservationStatus: "Near Threatened",
    bestTime: "December - April",
    difficulty: "Moderate",
    ebirdCode: "vercar1",
    bioregionDescription: "Dry coastal forests and scrublands with unique Caribbean endemic species.",
    photoCredit: {
      photographer: "Royann Petrell",
      title: "Early Guest",
    },
  },
  {
    id: "7",
    commonName: "Velvet-purple Coronet",
    scientificName: "Boissonneaua jardini",
    spanishName: "Colibrí Terciopelo Púrpura",
    bioregion: "Pacific Coast Chocó",
    bioregionSlug: "pacific-coast-choco",
    family: "Trochilidae",
    order: "Apodiformes",
    status: "Endemic",
    habitat: "Cloud forests and forest edges on Pacific slopes",
    description:
      "A stunning hummingbird endemic to Colombia's Pacific slope cloud forests, known for its brilliant iridescent purple and blue plumage that shimmers like velvet in the forest light.",
    image: "/images/velvet-purple-coronet.jpg",
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vepcor1-SUWzqmkywsyiGwsIZnfR6EeBx65w9e.mp3",
    conservationStatus: "Near Threatened",
    bestTime: "Year-round",
    difficulty: "Moderate",
    ebirdCode: "vepcor1",
    bioregionDescription: "One of the world's most biodiverse regions with spectacular endemic hummingbirds.",
    photoCredit: {
      photographer: "Royann Petrell",
      title: "Early Guest",
      location: "Montezuma Rainforest Lodge",
      locationLink: "/about/partners#montezuma",
    },
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
  autoPlayInterval = 12000,
}: EnhancedEndemicBirdsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [showInfo, setShowInfo] = useState(false)
  const [showPhotoCredit, setShowPhotoCredit] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

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
    setImageLoaded(false)
    setImageError(false)
    setIsLoading(true)
    setShowInfo(false)
    setShowPhotoCredit(false)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + bioregionBirds.length) % bioregionBirds.length)
    setImageLoaded(false)
    setImageError(false)
    setIsLoading(true)
    setShowInfo(false)
    setShowPhotoCredit(false)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
    setImageLoaded(false)
    setImageError(false)
    setIsLoading(true)
    setShowInfo(false)
    setShowPhotoCredit(false)
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

  // Enhanced image positioning function optimized for square aspect ratio
  const getImagePositioning = (birdId: string) => {
    switch (birdId) {
      case "1": // Green-bearded Helmetcrest - Center on bird's face and crest
        return {
          objectPosition: "center 35%",
          className: "object-cover",
          transform: "scale(1.2)",
        }
      case "2": // Rainbow-bearded Thornbill - Center on bird with full visibility
        return {
          objectPosition: "center 30%",
          className: "object-cover",
          transform: "scale(1.1)",
        }
      case "3": // Black-billed Mountain-Toucan - Center on bird's face and beak
        return {
          objectPosition: "center center",
          className: "object-cover",
          transform: "scale(1.15)",
        }
      case "4": // Chestnut-crowned Antpitta - Show full bird including feet
        return {
          objectPosition: "center 40%",
          className: "object-cover",
          transform: "scale(1.1)",
        }
      case "5": // Andean Motmot - Center on bird
        return {
          objectPosition: "center center",
          className: "object-cover",
          transform: "scale(1.1)",
        }
      case "6": // Vermilion Cardinal - Show full bird including crest
        return {
          objectPosition: "center 25%",
          className: "object-cover",
          transform: "scale(1.1)",
        }
      case "7": // Velvet-purple Coronet - Center on bird
        return {
          objectPosition: "center center",
          className: "object-cover",
          transform: "scale(1.1)",
        }
      default:
        return {
          objectPosition: "center center",
          className: "object-cover",
          transform: "scale(1.1)",
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
    if (showPhotoCredit) {
      setShowPhotoCredit(false)
    }
  }

  const togglePhotoCredit = () => {
    setShowPhotoCredit(!showPhotoCredit)
    if (showInfo) {
      setShowInfo(false)
    }
  }

  const handleImageLoad = useCallback(() => {
    setIsLoading(false)
    setImageLoaded(true)
    setImageError(false)
  }, [])

  const handleImageError = useCallback(() => {
    setIsLoading(false)
    setImageLoaded(false)
    setImageError(true)
  }, [])

  // Preload next image for smoother transitions
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % bioregionBirds.length
    const nextImage = new Image()
    nextImage.src = bioregionBirds[nextIndex].image
  }, [currentIndex])

  const navigateToEbird = (ebirdCode: string) => {
    window.open(`https://ebird.org/species/${ebirdCode}`, "_blank", "noopener,noreferrer")
  }

  // Mobile-optimized layout
  if (isMobile) {
    return (
      <div className={cn("relative w-full max-w-full overflow-hidden", className)}>
        <Card className="overflow-hidden border-0 shadow-lg mx-2">
          <div className="relative">
            {/* Mobile Main Image - Square Aspect Ratio */}
            <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-emerald-50 to-blue-50">
              {!imageError ? (
                <img
                  src={currentBird.image || "/placeholder.svg?height=400&width=400&text=Bird+Image"}
                  alt={`${currentBird.commonName} - ${currentBird.bioregion}`}
                  className={cn(
                    "w-full h-full transition-all duration-1000 ease-out",
                    currentImagePositioning.className,
                    imageLoaded ? "opacity-100" : "opacity-0",
                  )}
                  style={{
                    objectPosition: currentImagePositioning.objectPosition,
                    objectFit: "cover",
                    transform: currentImagePositioning.transform || "scale(1)",
                    transformOrigin: "center center",
                  }}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="text-center p-4">
                    <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-500" />
                    </div>
                    <p className="text-sm text-gray-600">Image unavailable</p>
                  </div>
                </div>
              )}

              {/* Enhanced Loading Indicator */}
              {isLoading && !imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-emerald-700 font-medium">Loading image...</p>
                  </div>
                </div>
              )}

              {/* Mobile Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Mobile Navigation Arrows */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 hover:text-gray-900 border border-gray-200 w-12 h-12 rounded-full touch-manipulation shadow-xl z-30 transition-all duration-200"
                onClick={() => handleNavigation("prev")}
                aria-label="Previous bird"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 hover:text-gray-900 border border-gray-200 w-12 h-12 rounded-full touch-manipulation shadow-xl z-30 transition-all duration-200"
                onClick={() => handleNavigation("next")}
                aria-label="Next bird"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              {/* Mobile Control Buttons */}
              <div className="absolute top-3 right-3 flex gap-2 z-40">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 hover:text-gray-900 border border-gray-200 w-10 h-10 p-0 rounded-full touch-manipulation shadow-lg transition-all duration-200"
                  onClick={togglePlayPause}
                  aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>

                {currentBird.photoCredit && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 hover:text-gray-900 border border-gray-200 w-10 h-10 p-0 rounded-full touch-manipulation shadow-lg transition-all duration-200"
                    onClick={togglePhotoCredit}
                    aria-label="View photo credit"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* Mobile Info Button - Restored Version 18 Style */}
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "absolute bottom-4 right-4 w-12 h-12 p-0 rounded-full shadow-xl border-2 transition-all duration-300 touch-manipulation z-40",
                  showInfo
                    ? "bg-emerald-600 text-white hover:bg-emerald-700 border-emerald-500 scale-110 shadow-emerald-500/40"
                    : "bg-white/95 backdrop-blur-sm hover:bg-white text-emerald-600 hover:text-emerald-700 border-emerald-200 hover:border-emerald-300",
                )}
                onClick={toggleInfo}
                aria-label={showInfo ? "Hide bird information" : "Show bird information"}
                aria-expanded={showInfo}
              >
                <Info className={cn("w-5 h-5 transition-all duration-300", showInfo ? "rotate-180" : "")} />
              </Button>

              {/* Mobile Photo Credit Popup - Restored Version 18 Style */}
              {currentBird.photoCredit && showPhotoCredit && (
                <div className="absolute top-16 right-3 z-50">
                  <div className="bg-black/95 backdrop-blur-sm text-white px-3 py-3 rounded-lg text-xs shadow-xl transition-all duration-300 animate-in slide-in-from-top-2 min-w-[200px] border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Camera className="w-3 h-3 flex-shrink-0" />
                      <span className="font-medium">Photo Credit</span>
                    </div>

                    <div className="space-y-2">
                      <div>
                        {currentBird.photoCredit.linkTo ? (
                          <Link
                            href={currentBird.photoCredit.linkTo}
                            className="text-emerald-300 hover:text-emerald-200 font-medium hover:underline block"
                          >
                            {currentBird.photoCredit.photographer}
                          </Link>
                        ) : (
                          <span className="text-emerald-300 font-medium block">
                            {currentBird.photoCredit.photographer}
                          </span>
                        )}
                        <span className="text-blue-300 text-xs">{currentBird.photoCredit.title}</span>
                      </div>

                      {currentBird.photoCredit.location && (
                        <div>
                          {currentBird.photoCredit.locationLink ? (
                            <Link
                              href={currentBird.photoCredit.locationLink}
                              className="text-yellow-300 hover:text-yellow-200 text-xs hover:underline block flex items-center gap-1"
                            >
                              <MapPin className="w-3 h-3 flex-shrink-0" />
                              {currentBird.photoCredit.location}
                            </Link>
                          ) : (
                            <span className="text-yellow-300 text-xs flex items-center gap-1">
                              <MapPin className="w-3 h-3 flex-shrink-0" />
                              {currentBird.photoCredit.location}
                            </span>
                          )}
                        </div>
                      )}

                      {currentBird.photoCredit.postUrl && (
                        <a
                          href={currentBird.photoCredit.postUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-300 hover:text-blue-200 text-xs hover:underline block"
                        >
                          📱 View on Instagram
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Bird Information Display - Restored Version 18 Style */}
              <div className="absolute bottom-0 left-0 right-0 text-white z-20">
                <div className="p-3 space-y-2">
                  {/* Region Info */}
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm font-medium text-emerald-300 truncate">{currentBird.bioregion}</span>
                    {currentBird.secondaryRegions && currentBird.secondaryRegions.length > 0 && (
                      <span className="text-xs text-blue-300 flex-shrink-0">
                        +{currentBird.secondaryRegions.length}
                      </span>
                    )}
                  </div>

                  {/* Bird Name */}
                  <div className="mb-3">
                    <button
                      onClick={() => navigateToEbird(currentBird.ebirdCode)}
                      className="text-base font-bold leading-tight text-left hover:text-emerald-300 transition-colors cursor-pointer bg-transparent border-0 p-0 underline decoration-emerald-400 underline-offset-2 block"
                    >
                      {currentBird.commonName}
                    </button>
                    <p className="text-xs italic opacity-90 leading-tight">{currentBird.scientificName}</p>
                  </div>
                </div>
              </div>

              {/* Mobile Species Information Box - Restored Version 18 Style */}
              {showInfo && (
                <div className="absolute inset-0 bg-black/95 backdrop-blur-md z-50 animate-in fade-in-0 duration-300">
                  <div className="h-full overflow-y-auto p-4 mobile-menu-scroll">
                    {/* Close Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-4 right-4 w-10 h-10 p-0 rounded-full bg-white/20 hover:bg-white/30 text-white border-0 z-60"
                      onClick={toggleInfo}
                      aria-label="Close details"
                    >
                      <X className="w-5 h-5" />
                    </Button>

                    {/* Content */}
                    <div className="pt-16 pb-8">
                      {/* Header */}
                      <div className="mb-6">
                        <button
                          onClick={() => navigateToEbird(currentBird.ebirdCode)}
                          className="text-left hover:text-emerald-300 transition-colors cursor-pointer bg-transparent border-0 p-0 group block w-full"
                          aria-label={`View ${currentBird.commonName} on eBird`}
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <ExternalLink className="w-5 h-5 text-emerald-400 flex-shrink-0 group-hover:text-emerald-300 transition-colors mt-1" />
                            <div className="flex-1 min-w-0">
                              <h2 className="text-lg sm:text-xl font-bold text-emerald-300 group-hover:text-emerald-200 underline decoration-emerald-400/60 underline-offset-2 group-hover:decoration-emerald-300 transition-all leading-tight">
                                {currentBird.commonName}
                              </h2>
                              <p className="text-sm sm:text-base italic text-blue-300 group-hover:text-blue-200 transition-colors leading-tight mt-1">
                                {currentBird.scientificName}
                              </p>
                              <p className="text-xs sm:text-sm text-gray-300 group-hover:text-gray-200 transition-colors leading-tight mt-1">
                                {currentBird.spanishName}
                              </p>
                            </div>
                          </div>
                        </button>

                        {/* Status Badges */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge
                            className={cn("text-xs font-medium border shadow-sm", getStatusColor(currentBird.status))}
                          >
                            {currentBird.status}
                          </Badge>
                          <Badge
                            className={cn(
                              "text-xs font-medium border shadow-sm",
                              getDifficultyColor(currentBird.difficulty),
                            )}
                          >
                            {currentBird.difficulty}
                          </Badge>
                          <Badge className="text-xs font-medium border bg-gray-50 text-gray-700 border-gray-300 shadow-sm">
                            {currentBird.conservationStatus}
                          </Badge>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mb-6">
                        <p className="text-sm sm:text-base leading-relaxed text-white/95 font-light">
                          {currentBird.description}
                        </p>
                      </div>

                      {/* Details Grid */}
                      <div className="space-y-4 mb-6">
                        <div>
                          <span className="font-medium text-emerald-300 text-sm block mb-1">Habitat:</span>
                          <span className="text-white/90 text-sm leading-relaxed">{currentBird.habitat}</span>
                        </div>
                        <div>
                          <span className="font-medium text-emerald-300 text-sm block mb-1">Best time to observe:</span>
                          <span className="text-white/90 text-sm leading-relaxed">{currentBird.bestTime}</span>
                        </div>
                        <div>
                          <span className="font-medium text-emerald-300 text-sm block mb-1">Primary region:</span>
                          <span className="text-white/90 text-sm leading-relaxed">{currentBird.bioregion}</span>
                        </div>
                        {currentBird.secondaryRegions && currentBird.secondaryRegions.length > 0 && (
                          <div>
                            <span className="font-medium text-blue-300 text-sm block mb-1">Also found in:</span>
                            <span className="text-white/90 text-sm leading-relaxed">
                              {currentBird.secondaryRegions.map((region, index) => (
                                <span key={region.slug}>
                                  {region.name}
                                  {index < currentBird.secondaryRegions!.length - 1 ? ", " : ""}
                                </span>
                              ))}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-3">
                        <Link href={`/bioregions/${currentBird.bioregionSlug}`} className="w-full">
                          <Button className="bg-emerald-600 hover:bg-emerald-700 text-sm w-full h-11 font-medium shadow-lg">
                            <MapPin className="w-4 h-4 mr-2" />
                            Explore {currentBird.bioregion.split(" ")[0]}
                          </Button>
                        </Link>
                        <Link
                          href={`/shopping?region=${encodeURIComponent(currentBird.bioregion)}&tour=Adventure+Tours&from=carousel`}
                          className="w-full"
                        >
                          <Button
                            variant="outline"
                            className="border-white/40 text-white hover:bg-white/15 text-sm bg-white/5 w-full h-11 font-medium shadow-lg backdrop-blur-sm"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Plan Trip
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Content Section */}
          <CardContent className="p-4">
            {/* Mobile Thumbnail Navigation - Square thumbnails */}
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
                          transform: thumbnailPositioning.transform || "scale(1)",
                        }}
                      />
                      {index === currentIndex && <div className="absolute inset-0 bg-emerald-500/20" />}
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
          </CardContent>
        </Card>
      </div>
    )
  }

  // Desktop layout
  return (
    <div className={cn("relative w-full max-w-3xl mx-auto", className)}>
      <Card className="overflow-hidden border-0 shadow-2xl">
        <div className="relative">
          {/* Desktop Main Image - Square Aspect Ratio */}
          <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-emerald-50 to-blue-50">
            {!imageError ? (
              <img
                src={currentBird.image || "/placeholder.svg?height=600&width=600&text=Bird+Image"}
                alt={`${currentBird.commonName} - ${currentBird.bioregion}`}
                className={cn(
                  "w-full h-full transition-all duration-1000 ease-out hover:scale-105",
                  currentImagePositioning.className,
                  imageLoaded ? "opacity-100" : "opacity-0",
                )}
                style={{
                  objectPosition: currentImagePositioning.objectPosition,
                  objectFit: "cover",
                  transform: currentImagePositioning.transform || "scale(1)",
                  transformOrigin: "center center",
                }}
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="eager"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="text-center p-6">
                  <div className="w-20 h-20 mx-auto mb-3 bg-gray-300 rounded-full flex items-center justify-center">
                    <Camera className="w-10 h-10 text-gray-500" />
                  </div>
                  <p className="text-gray-600">Image unavailable</p>
                </div>
              </div>
            )}

            {/* Enhanced Loading Indicator */}
            {isLoading && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                  <p className="text-emerald-700 font-medium">Loading image...</p>
                </div>
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Desktop Navigation Arrows */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 w-10 h-10 rounded-full z-30 transition-all duration-200"
              onClick={() => handleNavigation("prev")}
              aria-label="Previous bird"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 w-10 h-10 rounded-full z-30 transition-all duration-200"
              onClick={() => handleNavigation("next")}
              aria-label="Next bird"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>

            {/* Desktop Control Buttons */}
            <div className="absolute top-3 right-3 flex gap-2 z-40">
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 w-10 h-10 p-0 rounded-full relative group transition-all duration-200"
                onClick={togglePlayPause}
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {isPlaying ? "Pause slideshow" : "Play slideshow"}
                </div>
              </Button>

              {currentBird.photoCredit && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 w-10 h-10 p-0 rounded-full relative group transition-all duration-200"
                  onClick={togglePhotoCredit}
                  aria-label="View photo credit"
                >
                  <Camera className="w-4 h-4" />
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    Photo credit
                  </div>
                </Button>
              )}
            </div>

            {/* Desktop Info Button - Restored Version 18 Style */}
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "absolute bottom-4 right-4 w-12 h-12 p-0 rounded-full border-2 transition-all duration-300 group z-40",
                showInfo
                  ? "bg-emerald-600 text-white hover:bg-emerald-700 border-emerald-500 scale-110 shadow-emerald-500/40 shadow-xl"
                  : "bg-white/95 backdrop-blur-sm text-emerald-600 hover:text-emerald-700 border-emerald-200 hover:border-emerald-300 shadow-lg hover:bg-white",
              )}
              onClick={toggleInfo}
              aria-label={showInfo ? "Hide bird information" : "Show bird information"}
              aria-expanded={showInfo}
            >
              <Info className={cn("w-5 h-5 transition-all duration-300", showInfo ? "rotate-180" : "")} />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                {showInfo ? "Hide details" : "Show details"}
              </div>
            </Button>

            {/* Desktop Photo Credit Popup - Restored Version 18 Style */}
            {currentBird.photoCredit && showPhotoCredit && (
              <div className="absolute top-16 right-3 z-50">
                <div className="bg-black/95 backdrop-blur-sm text-white px-4 py-3 rounded-lg text-sm shadow-xl transition-all duration-300 animate-in slide-in-from-top-2 min-w-[220px] border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Camera className="w-4 h-4 flex-shrink-0" />
                    <span className="font-medium">Photo Credit</span>
                  </div>

                  <div className="space-y-2">
                    <div>
                      {currentBird.photoCredit.linkTo ? (
                        <Link
                          href={currentBird.photoCredit.linkTo}
                          className="text-emerald-300 hover:text-emerald-200 font-medium hover:underline block"
                        >
                          {currentBird.photoCredit.photographer}
                        </Link>
                      ) : (
                        <span className="text-emerald-300 font-medium block">
                          {currentBird.photoCredit.photographer}
                        </span>
                      )}
                      <span className="text-blue-300 text-sm">{currentBird.photoCredit.title}</span>
                    </div>

                    {currentBird.photoCredit.location && (
                      <div>
                        {currentBird.photoCredit.locationLink ? (
                          <Link
                            href={currentBird.photoCredit.locationLink}
                            className="text-yellow-300 hover:text-yellow-200 text-sm hover:underline block flex items-center gap-1"
                          >
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            {currentBird.photoCredit.location}
                          </Link>
                        ) : (
                          <span className="text-yellow-300 text-sm flex items-center gap-1">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            {currentBird.photoCredit.location}
                          </span>
                        )}
                      </div>
                    )}

                    {currentBird.photoCredit.postUrl && (
                      <a
                        href={currentBird.photoCredit.postUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-300 hover:text-blue-200 text-sm hover:underline block"
                      >
                        📱 View on Instagram
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Desktop Bird Information Display - Restored Version 18 Style */}
            <div className="absolute bottom-0 left-0 right-0 text-white z-20">
              <div className="p-4 space-y-3">
                {/* Region Info */}
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

                {/* Bird Name */}
                <div className="mb-4">
                  <button
                    onClick={() => navigateToEbird(currentBird.ebirdCode)}
                    className="text-xl font-bold text-left hover:text-emerald-300 transition-colors cursor-pointer bg-transparent border-0 p-0 underline decoration-emerald-400 underline-offset-2 block"
                  >
                    {currentBird.commonName}
                  </button>
                  <p className="text-sm italic opacity-90">{currentBird.scientificName}</p>
                  <p className="text-xs opacity-75">{currentBird.spanishName}</p>
                </div>
              </div>
            </div>

            {/* Desktop Species Information Box - Restored Version 18 Style */}
            {showInfo && (
              <div className="absolute inset-0 bg-black/95 backdrop-blur-md z-50 animate-in fade-in-0 duration-300">
                <div className="h-full overflow-y-auto p-6">
                  {/* Close Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-6 right-6 w-12 h-12 p-0 rounded-full bg-white/20 hover:bg-white/30 text-white border-0 z-60"
                    onClick={toggleInfo}
                    aria-label="Close details"
                  >
                    <X className="w-6 h-6" />
                  </Button>

                  {/* Content */}
                  <div className="max-w-2xl mx-auto pt-20 pb-8">
                    {/* Header */}
                    <div className="mb-8">
                      <button
                        onClick={() => navigateToEbird(currentBird.ebirdCode)}
                        className="text-left hover:text-emerald-300 transition-colors cursor-pointer bg-transparent border-0 p-0 group block w-full"
                        aria-label={`View ${currentBird.commonName} on eBird`}
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <ExternalLink className="w-6 h-6 text-emerald-400 flex-shrink-0 group-hover:text-emerald-300 transition-colors mt-1" />
                          <div className="flex-1 min-w-0">
                            <h2 className="text-2xl lg:text-3xl font-bold text-emerald-300 group-hover:text-emerald-200 underline decoration-emerald-400/60 underline-offset-2 group-hover:decoration-emerald-300 transition-all leading-tight">
                              {currentBird.commonName}
                            </h2>
                            <p className="text-lg lg:text-xl italic text-blue-300 group-hover:text-blue-200 transition-colors leading-tight mt-2">
                              {currentBird.scientificName}
                            </p>
                            <p className="text-base lg:text-lg text-gray-300 group-hover:text-gray-200 transition-colors leading-tight mt-1">
                              {currentBird.spanishName}
                            </p>
                          </div>
                        </div>
                      </button>

                      {/* Status Badges */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        <Badge
                          className={cn(
                            "text-sm font-medium border shadow-sm px-3 py-1",
                            getStatusColor(currentBird.status),
                          )}
                        >
                          {currentBird.status}
                        </Badge>
                        <Badge
                          className={cn(
                            "text-sm font-medium border shadow-sm px-3 py-1",
                            getDifficultyColor(currentBird.difficulty),
                          )}
                        >
                          {currentBird.difficulty}
                        </Badge>
                        <Badge className="text-sm font-medium border bg-gray-50 text-gray-700 border-gray-300 shadow-sm px-3 py-1">
                          {currentBird.conservationStatus}
                        </Badge>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                      <p className="text-base lg:text-lg leading-relaxed text-white/95 font-light">
                        {currentBird.description}
                      </p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 gap-6 mb-8">
                      <div>
                        <span className="font-medium text-emerald-300 text-base lg:text-lg block mb-2">Habitat:</span>
                        <span className="text-white/90 text-sm lg:text-base leading-relaxed">
                          {currentBird.habitat}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-emerald-300 text-base lg:text-lg block mb-2">
                          Best time to observe:
                        </span>
                        <span className="text-white/90 text-sm lg:text-base leading-relaxed">
                          {currentBird.bestTime}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-emerald-300 text-base lg:text-lg block mb-2">
                          Primary region:
                        </span>
                        <span className="text-white/90 text-sm lg:text-base leading-relaxed">
                          {currentBird.bioregion}
                        </span>
                      </div>
                      {currentBird.secondaryRegions && currentBird.secondaryRegions.length > 0 && (
                        <div>
                          <span className="font-medium text-blue-300 text-base lg:text-lg block mb-2">
                            Also found in:
                          </span>
                          <span className="text-white/90 text-sm lg:text-base leading-relaxed">
                            {currentBird.secondaryRegions.map((region, index) => (
                              <span key={region.slug}>
                                {region.name}
                                {index < currentBird.secondaryRegions!.length - 1 ? ", " : ""}
                              </span>
                            ))}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href={`/bioregions/${currentBird.bioregionSlug}`} className="flex-1">
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-base w-full h-12 font-medium shadow-lg">
                          <MapPin className="w-5 h-5 mr-2" />
                          Explore {currentBird.bioregion.split(" ")[0]}
                        </Button>
                      </Link>
                      <Link
                        href={`/shopping?region=${encodeURIComponent(currentBird.bioregion)}&tour=Adventure+Tours&from=carousel`}
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          className="border-white/40 text-white hover:bg-white/15 text-base bg-white/5 w-full h-12 font-medium shadow-lg backdrop-blur-sm"
                        >
                          <ExternalLink className="w-5 h-5 mr-2" />
                          Plan Trip
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Content Section */}
        <CardContent className="p-4 lg:p-6">
          {/* Desktop Thumbnail Navigation - Square thumbnails */}
          <div className="mb-4 lg:mb-6">
            <div className="flex gap-2 lg:gap-3 overflow-x-auto scrollbar-hide pb-2 carousel-touch-area">
              {bioregionBirds.map((bird, index) => {
                const thumbnailPositioning = getImagePositioning(bird.id)
                return (
                  <button
                    key={bird.id}
                    onClick={() => goToSlide(index)}
                    className={cn(
                      "flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 transition-all relative aspect-square",
                      index === currentIndex ? "border-emerald-500 ring-2 ring-emerald-200" : "border-gray-200",
                    )}
                    style={{ scrollSnapAlign: "start" }}
                    aria-label={`View ${bird.commonName} from ${bird.bioregion}`}
                  >
                    <img
                      src={bird.image || "/placeholder.svg?height=80&width=80&text=Bird"}
                      alt={bird.commonName}
                      className={cn("w-full h-full transition-all", thumbnailPositioning.className)}
                      style={{
                        objectPosition: thumbnailPositioning.objectPosition,
                        objectFit: "cover",
                        transform: thumbnailPositioning.transform || "scale(1)",
                      }}
                    />
                    {index === currentIndex && <div className="absolute inset-0 bg-emerald-500/20" />}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Desktop Progress Indicators */}
          <div className="flex justify-center gap-2 mb-4 lg:mb-6">
            {bioregionBirds.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all",
                  index === currentIndex ? "bg-emerald-500" : "bg-gray-300",
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
