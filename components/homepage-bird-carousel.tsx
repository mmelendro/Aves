"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Pause, Info, Camera, MapPin, ExternalLink, X, Volume2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface BirdData {
  id: string
  commonName: string
  scientificName: string
  spanishName: string
  primaryRegion: string
  secondaryRegions: string[]
  ecoregions: string[]
  regionSlug: string
  status: "Endemic" | "Near Endemic" | "Spectacular"
  difficulty: "Easy" | "Moderate" | "Challenging"
  habitat: string
  bestTime: string
  elevation: string
  image: string
  audioFile?: string
  photoCredit: {
    photographer: string
    title: string
    teamLink?: string
    instagramPost?: string
    reserve?: string
    reserveLink?: string
  }
}

const birdData: BirdData[] = [
  {
    id: "1",
    commonName: "Green-bearded Helmetcrest",
    scientificName: "Oxypogon guerinii",
    spanishName: "Colibrí Crestado Verde",
    primaryRegion: "Eastern Andes",
    secondaryRegions: ["Central Andes"],
    ecoregions: ["High-altitude páramo", "Cloud forest edges", "Alpine scrubland"],
    regionSlug: "eastern-andes",
    status: "Endemic",
    difficulty: "Challenging",
    habitat: "High-altitude páramo and cloud forest edges above 3,000m",
    bestTime: "December - March (dry season)",
    elevation: "3,000 - 4,200m",
    image: "/images/green-bearded-helmetcrest.png",
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gnbhel1-njVmyxK8Wn7VWVxZmnAUGhKKqEHDmg.mp3",
    photoCredit: {
      photographer: "Nicolás Rozo",
      title: "AVES Guide",
      teamLink: "/team#nicolas-rozo",
      instagramPost: "https://www.instagram.com/p/C247ZDJgXBa/",
    },
  },
  {
    id: "2",
    commonName: "Rainbow-bearded Thornbill",
    scientificName: "Chalcostigma herrani",
    spanishName: "Colibrí Barbudo Arcoíris",
    primaryRegion: "Central Andes",
    secondaryRegions: ["Eastern Andes"],
    ecoregions: ["Páramo grasslands", "Volcanic slopes", "Alpine scrub", "High-altitude wetlands"],
    regionSlug: "central-andes",
    status: "Endemic",
    difficulty: "Challenging",
    habitat: "High-altitude páramo and volcanic slopes with scattered shrubs",
    bestTime: "December - March (clear weather)",
    elevation: "3,200 - 4,500m",
    image: "/images/rabtho1.jpg",
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rabtho1-zlI0qx9zdy6wFmPwI8rEJXXYXjJp3H.mp3",
    photoCredit: {
      photographer: "Royann",
      title: "Wildlife Photographer",
      reserve: "Termales del Ruiz",
      reserveLink: "/about/partners#termales-del-ruiz",
    },
  },
  {
    id: "3",
    commonName: "Black-billed Mountain-Toucan",
    scientificName: "Andigena nigrirostris",
    spanishName: "Tucán Andino Piquinegro",
    primaryRegion: "Central Andes",
    secondaryRegions: ["Western Andes", "Eastern Andes"],
    ecoregions: ["Montane cloud forest", "Forest canopy", "Secondary growth", "Forest edges"],
    regionSlug: "central-andes",
    status: "Near Endemic",
    difficulty: "Moderate",
    habitat: "Montane cloud forests and forest edges with fruiting trees",
    bestTime: "Year-round (most active mornings)",
    elevation: "1,500 - 2,800m",
    image: "/images/bbmtou1-square.png",
    photoCredit: {
      photographer: "Royann",
      title: "Wildlife Photographer",
      reserve: "Reserva Río Blanco",
      reserveLink: "/about/partners#reserva-rio-blanco",
    },
  },
  {
    id: "4",
    commonName: "Chestnut-crowned Antpitta",
    scientificName: "Grallaria ruficapilla",
    spanishName: "Tororoi Coronirrufo",
    primaryRegion: "Colombian Massif",
    secondaryRegions: ["Central Andes", "Western Andes"],
    ecoregions: ["Cloud forest understory", "Dense leaf litter", "Bamboo thickets", "Mossy forest floor"],
    regionSlug: "colombian-massif",
    status: "Endemic",
    difficulty: "Moderate",
    habitat: "Dense cloud forest understory with thick leaf litter",
    bestTime: "Year-round (dawn and dusk)",
    elevation: "1,800 - 3,200m",
    image: "/images/chestnut-crowned-antpitta.jpg",
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chcant2-6pqzdAPhoSOUOXsdXTRugdtXK67CbY.mp3",
    photoCredit: {
      photographer: "Martin Meléndro",
      title: "AVES Guide",
      teamLink: "/team#martin-melendro",
      reserve: "Reserva Río Blanco",
      reserveLink: "/about/partners#reserva-rio-blanco",
    },
  },
  {
    id: "5",
    commonName: "Andean Motmot",
    scientificName: "Momotus aequatorialis",
    spanishName: "Momoto Andino",
    primaryRegion: "Central Andes",
    secondaryRegions: ["Western Andes", "Eastern Andes", "Colombian Massif"],
    ecoregions: [
      "Subtropical forest midstory",
      "Mossy cloud forest",
      "Forest edges",
      "Secondary growth",
      "Foothills to subtropical zone",
    ],
    regionSlug: "central-andes",
    status: "Near Endemic",
    difficulty: "Easy",
    habitat: "Midstory of mossy subtropical forests, forest edges from foothills into subtropical zone",
    bestTime: "Year-round (most active early morning)",
    elevation: "1,200 - 2,600m",
    image: "/images/blue-crowned-motmot-new.jpg",
    photoCredit: {
      photographer: "Martin Meléndro",
      title: "AVES Guide",
      teamLink: "/team#martin-melendro",
      reserve: "Reserva Río Blanco",
      reserveLink: "/about/partners#reserva-rio-blanco",
    },
  },
  {
    id: "6",
    commonName: "Vermilion Cardinal",
    scientificName: "Cardinalis phoeniceus",
    spanishName: "Cardenal Guajiro",
    primaryRegion: "Caribbean Coast",
    secondaryRegions: [],
    ecoregions: ["Dry tropical forest", "Thorny scrubland", "Desert edges", "Arid lowlands"],
    regionSlug: "caribbean",
    status: "Endemic",
    difficulty: "Moderate",
    habitat: "Dry scrublands and thorny forests of the Guajira Peninsula",
    bestTime: "December - April (dry season)",
    elevation: "0 - 800m",
    image: "/images/cardinal-guajiro.jpg",
    photoCredit: {
      photographer: "Royann",
      title: "Wildlife Photographer",
    },
  },
  {
    id: "7",
    commonName: "Andean Cock-of-the-rock",
    scientificName: "Rupicola peruvianus",
    spanishName: "Gallito de Roca Andino",
    primaryRegion: "Central Andes",
    secondaryRegions: ["Western Andes", "Eastern Andes", "Colombian Massif"],
    ecoregions: ["Cloud forest", "Montane forest", "Forest understory", "Rocky outcrops"],
    regionSlug: "central-andes",
    status: "Spectacular",
    difficulty: "Moderate",
    habitat: "Cloud forests and montane forests with rocky outcrops and dense understory",
    bestTime: "Year-round (most active early morning)",
    elevation: "1,400 - 2,400m",
    image: "/images/andean-cock-of-the-rock.jpg",
    photoCredit: {
      photographer: "Martin Melendro",
      title: "AVES Lead Guide & Founder",
      teamLink: "/team#martin-melendro",
      reserve: "Jardín de Rocas",
      reserveLink: "/about/partners#jardin-de-rocas",
    },
  },
]

interface HomepageBirdCarouselProps {
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
}

export default function HomepageBirdCarousel({
  className,
  autoPlay = true,
  autoPlayInterval = 8000,
}: HomepageBirdCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false) // Start paused to allow first image to load
  const [showInfo, setShowInfo] = useState(false)
  const [showPhotoCredit, setShowPhotoCredit] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [firstImageLoaded, setFirstImageLoaded] = useState(false)
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set())

  const currentBird = birdData[currentIndex]

  // Check if current bird should show the Explore Region button (only Vermilion Cardinal)
  const shouldShowExploreRegion = currentBird.id === "6" // Vermilion Cardinal

  // Preload all images on component mount with proper error handling
  useEffect(() => {
    const preloadImages = async () => {
      try {
        const imagePromises = birdData.map((bird, index) => {
          return new Promise<void>((resolve) => {
            const img = new Image()

            const handleLoad = () => {
              setPreloadedImages((prev) => new Set(prev).add(bird.image))
              if (index === 0) {
                setFirstImageLoaded(true)
                setIsLoading(false)
                setImageLoaded(true)
                // Start autoplay only after first image is loaded
                if (autoPlay) {
                  setTimeout(() => setIsPlaying(true), 1000) // Give 1 second buffer
                }
              }
              resolve()
            }

            const handleError = () => {
              console.warn(`Failed to load image: ${bird.image}`)
              if (index === 0) {
                setFirstImageLoaded(true)
                setIsLoading(false)
                setImageError(true)
              }
              resolve() // Resolve even on error to prevent hanging
            }

            img.onload = handleLoad
            img.onerror = handleError

            // Set high priority for first image
            if (index === 0) {
              img.fetchPriority = "high"
            }
            img.src = bird.image
          })
        })

        // Wait for at least the first image to load/fail
        try {
          await imagePromises[0]
        } catch (error) {
          console.warn("Error loading first image:", error)
          setFirstImageLoaded(true)
          setIsLoading(false)
          setImageError(true)
        }

        // Continue loading other images in background
        try {
          await Promise.allSettled(imagePromises.slice(1))
        } catch (error) {
          console.warn("Error loading additional images:", error)
        }
      } catch (error) {
        console.warn("Error in preloadImages:", error)
        setFirstImageLoaded(true)
        setIsLoading(false)
        setImageError(true)
      }
    }

    preloadImages()
  }, [autoPlay])

  const nextSlide = useCallback(() => {
    // Only advance if first image has loaded or we're not on the first slide
    if (firstImageLoaded || currentIndex > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % birdData.length)
      setShowInfo(false)
      setShowPhotoCredit(false)

      // Update loading states for new image
      const nextIndex = (currentIndex + 1) % birdData.length
      const nextImage = birdData[nextIndex].image
      if (preloadedImages.has(nextImage)) {
        setIsLoading(false)
        setImageLoaded(true)
        setImageError(false)
      } else {
        setIsLoading(true)
        setImageLoaded(false)
        setImageError(false)
      }
    }
  }, [currentIndex, firstImageLoaded, preloadedImages])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + birdData.length) % birdData.length)
    setShowInfo(false)
    setShowPhotoCredit(false)

    // Update loading states for new image
    const prevIndex = (currentIndex - 1 + birdData.length) % birdData.length
    const prevImage = birdData[prevIndex].image
    if (preloadedImages.has(prevImage)) {
      setIsLoading(false)
      setImageLoaded(true)
      setImageError(false)
    } else {
      setIsLoading(true)
      setImageLoaded(false)
      setImageError(false)
    }
  }, [currentIndex, preloadedImages])

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(index)
      setShowInfo(false)
      setShowPhotoCredit(false)

      // Update loading states for new image
      const targetImage = birdData[index].image
      if (preloadedImages.has(targetImage)) {
        setIsLoading(false)
        setImageLoaded(true)
        setImageError(false)
      } else {
        setIsLoading(true)
        setImageLoaded(false)
        setImageError(false)
      }
    },
    [preloadedImages],
  )

  // Modified autoplay effect to respect first image loading
  useEffect(() => {
    if (isPlaying && firstImageLoaded) {
      const interval = setInterval(nextSlide, autoPlayInterval)
      return () => clearInterval(interval)
    }
  }, [isPlaying, nextSlide, autoPlayInterval, firstImageLoaded])

  const handleImageLoad = useCallback(() => {
    setIsLoading(false)
    setImageLoaded(true)
    setImageError(false)
  }, [])

  const handleImageError = useCallback(() => {
    console.warn(`Failed to load current image: ${currentBird.image}`)
    setIsLoading(false)
    setImageLoaded(false)
    setImageError(true)
  }, [currentBird.image])

  const playAudio = useCallback(() => {
    if (currentBird.audioFile) {
      try {
        const audio = new Audio(currentBird.audioFile)
        audio.play().catch((error) => {
          console.warn("Audio play failed:", error)
        })
      } catch (error) {
        console.warn("Audio creation failed:", error)
      }
    }
  }, [currentBird.audioFile])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Endemic":
        return "bg-red-100 text-red-800 border-red-200"
      case "Near Endemic":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Spectacular":
        return "bg-purple-100 text-purple-800 border-purple-200"
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

  // Enhanced image positioning for perfect square framing with focus on bird's eye and wing
  const getImagePositioning = (birdId: string) => {
    switch (birdId) {
      case "1": // Green-bearded Helmetcrest
        return {
          objectPosition: "center 35%",
          transform: "scale(1.2)",
        }
      case "2": // Rainbow-bearded Thornbill - Updated for rabtho1.jpg
        return {
          objectPosition: "center 25%", // Focus on the bird's head and colorful throat
          transform: "scale(1.15)", // Slight zoom to highlight the rainbow beard
        }
      case "3": // Black-billed Mountain-Toucan - Updated for bbmtou1-square.png
        return {
          objectPosition: "center 20%", // Position toucan's face and eye at the top
          transform: "scale(1.0)", // No scaling needed for square format
        }
      case "4": // Chestnut-crowned Antpitta
        return {
          objectPosition: "center 40%",
          transform: "scale(1.1)",
        }
      case "5": // Andean Motmot
        return {
          objectPosition: "center center",
          transform: "scale(1.1)",
        }
      case "6": // Vermilion Cardinal
        return {
          objectPosition: "center 25%",
          transform: "scale(1.1)",
        }
      case "7": // Andean Cock-of-the-rock
        return {
          objectPosition: "center 40%",
          transform: "scale(1.0)",
        }
      default:
        return {
          objectPosition: "center center",
          transform: "scale(1.1)",
        }
    }
  }

  const currentImagePositioning = getImagePositioning(currentBird.id)

  const getPrimaryRegionColor = (region: string) => {
    switch (region) {
      case "Eastern Andes":
        return "bg-blue-600/90 text-white border-blue-500/50"
      case "Central Andes":
        return "bg-purple-600/90 text-white border-purple-500/50"
      case "Western Andes":
        return "bg-green-600/90 text-white border-green-500/50"
      case "Colombian Massif":
        return "bg-orange-600/90 text-white border-orange-500/50"
      case "Caribbean Coast":
        return "bg-cyan-600/90 text-white border-cyan-500/50"
      default:
        return "bg-gray-600/90 text-white border-gray-500/50"
    }
  }

  return (
    <div className={cn("relative w-full max-w-md mx-auto carousel-container", className)}>
      <Card className="overflow-hidden border-0 shadow-xl">
        <div className="relative">
          {/* Main Image - Perfect Square */}
          <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-emerald-50 to-blue-50 carousel-image-container">
            {!imageError ? (
              <img
                src={currentBird.image || "/placeholder.svg?height=400&width=400&text=Bird+Image"}
                alt={`${currentBird.commonName} - ${currentBird.primaryRegion}`}
                className={cn(
                  "w-full h-full object-cover transition-all duration-700 ease-out carousel-slide",
                  imageLoaded ? "opacity-100" : "opacity-0",
                )}
                style={{
                  objectPosition: currentImagePositioning.objectPosition,
                  transform: currentImagePositioning.transform,
                  transformOrigin: "center center",
                }}
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading={currentIndex === 0 ? "eager" : "lazy"}
                fetchPriority={currentIndex === 0 ? "high" : "auto"}
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
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50 carousel-loading">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-emerald-700 font-medium">
                    {currentIndex === 0 && !firstImageLoaded ? "Loading first image..." : "Loading..."}
                  </p>
                </div>
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Navigation Arrows - Enhanced positioning to avoid thumbnail overlap */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 w-10 h-10 rounded-full z-40 transition-all duration-200 carousel-button shadow-lg"
              onClick={prevSlide}
              aria-label="Previous bird"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 w-10 h-10 rounded-full z-40 transition-all duration-200 carousel-button shadow-lg"
              onClick={nextSlide}
              aria-label="Next bird"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>

            {/* Top Control Buttons - Enhanced positioning */}
            <div className="absolute top-3 right-3 flex gap-2 z-50">
              {currentBird.audioFile && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 w-9 h-9 p-0 rounded-full transition-all duration-200 carousel-button shadow-lg"
                  onClick={playAudio}
                  aria-label="Play bird call"
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 w-9 h-9 p-0 rounded-full transition-all duration-200 carousel-button shadow-lg"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                disabled={!firstImageLoaded}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 w-9 h-9 p-0 rounded-full transition-all duration-200 carousel-button shadow-lg"
                onClick={() => setShowPhotoCredit(!showPhotoCredit)}
                aria-label="View photo credit"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            {/* Bird Information - Bottom with Primary Region Tag */}
            <div className="absolute bottom-0 left-0 right-0 text-white z-30">
              <div className="p-3 space-y-2">
                {/* Bird Names */}
                <div className="space-y-1">
                  <h3 className="text-lg font-bold leading-tight">{currentBird.commonName}</h3>
                  <p className="text-sm italic opacity-90 leading-tight">{currentBird.scientificName}</p>
                  <p className="text-xs opacity-75 leading-tight">{currentBird.spanishName}</p>
                </div>

                {/* Primary Region Tag and Info Button Row */}
                <div className="flex items-center justify-between">
                  <div
                    className={cn(
                      "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border backdrop-blur-sm",
                      getPrimaryRegionColor(currentBird.primaryRegion),
                    )}
                  >
                    <MapPin className="w-3 h-3" />
                    <span>{currentBird.primaryRegion}</span>
                  </div>

                  {/* Info Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "w-10 h-10 p-0 rounded-full border-0 transition-all duration-300 carousel-button shadow-lg",
                      showInfo
                        ? "bg-emerald-600 text-white hover:bg-emerald-700 scale-110"
                        : "bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white",
                    )}
                    onClick={() => setShowInfo(!showInfo)}
                    aria-label={showInfo ? "Hide bird information" : "Show bird information"}
                  >
                    {showInfo ? <X className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Thumbnail Navigation - Fixed positioning to avoid overlap */}
          <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200/50 p-3 carousel-thumbnails">
            <div className="flex justify-center gap-2 mb-3">
              {birdData.map((bird, index) => (
                <button
                  key={bird.id}
                  className={cn(
                    "w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 carousel-thumbnail",
                    index === currentIndex
                      ? "border-emerald-500 ring-2 ring-emerald-200 scale-110 shadow-lg"
                      : "border-gray-200 hover:border-gray-300 hover:scale-105 shadow-sm",
                  )}
                  onClick={() => goToSlide(index)}
                  aria-label={`View ${bird.commonName}`}
                >
                  <img
                    src={bird.image || "/placeholder.svg"}
                    alt={bird.commonName}
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: getImagePositioning(bird.id).objectPosition,
                      transform: "scale(1.1)",
                    }}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center gap-1.5">
              {birdData.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300 carousel-indicator",
                    index === currentIndex ? "bg-emerald-600 scale-125" : "bg-gray-300 hover:bg-gray-400",
                  )}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Enhanced Information Panel */}
      {showInfo && (
        <Card className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md border border-white/20 shadow-xl z-50 carousel-info-panel">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900">Species Information</h4>
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0 rounded-full hover:bg-gray-100"
                onClick={() => setShowInfo(false)}
                aria-label="Close information panel"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-medium text-gray-700">Status:</span>
                <Badge className={cn("ml-2 text-xs", getStatusColor(currentBird.status))} variant="outline">
                  {currentBird.status}
                </Badge>
              </div>
              <div>
                <span className="font-medium text-gray-700">Difficulty:</span>
                <Badge className={cn("ml-2 text-xs", getDifficultyColor(currentBird.difficulty))} variant="outline">
                  {currentBird.difficulty}
                </Badge>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-700">Habitat:</span>
                <p className="text-gray-600 mt-1">{currentBird.habitat}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Best Time:</span>
                <p className="text-gray-600 mt-1">{currentBird.bestTime}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Elevation:</span>
                <p className="text-gray-600 mt-1">{currentBird.elevation}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-700">Ecoregions:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {currentBird.ecoregions.map((ecoregion, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {ecoregion}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Link href="/aves-explorer" className="flex-1">
                <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Explore Species
                </Button>
              </Link>
              {shouldShowExploreRegion && (
                <Link href={`/regions/${currentBird.regionSlug}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                    <MapPin className="w-3 h-3 mr-1" />
                    Explore Region
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Photo Credit Panel */}
      {showPhotoCredit && (
        <Card className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md border border-white/20 shadow-xl z-50 carousel-credit-panel">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900">Photo Credit</h4>
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0 rounded-full hover:bg-gray-100"
                onClick={() => setShowPhotoCredit(false)}
                aria-label="Close photo credit panel"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-700">Photographer:</span>
                <span className="ml-2 text-gray-600">{currentBird.photoCredit.photographer}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Title:</span>
                <span className="ml-2 text-gray-600">{currentBird.photoCredit.title}</span>
              </div>
              {currentBird.photoCredit.reserve && (
                <div>
                  <span className="font-medium text-gray-700">Location:</span>
                  <span className="ml-2 text-gray-600">{currentBird.photoCredit.reserve}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-3">
              {currentBird.photoCredit.teamLink && (
                <Link href={currentBird.photoCredit.teamLink}>
                  <Button variant="outline" size="sm" className="text-xs bg-transparent">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View Profile
                  </Button>
                </Link>
              )}
              {currentBird.photoCredit.instagramPost && (
                <a href={currentBird.photoCredit.instagramPost} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="text-xs bg-transparent">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Instagram
                  </Button>
                </a>
              )}
              {currentBird.photoCredit.reserveLink && (
                <Link href={currentBird.photoCredit.reserveLink}>
                  <Button variant="outline" size="sm" className="text-xs bg-transparent">
                    <MapPin className="w-3 h-3 mr-1" />
                    Reserve Info
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
