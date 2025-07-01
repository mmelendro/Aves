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
  region: string
  regionSlug: string
  status: "Endemic" | "Near Endemic" | "Spectacular"
  difficulty: "Easy" | "Moderate" | "Challenging"
  habitat: string
  bestTime: string
  image: string
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
    region: "Eastern Andes",
    regionSlug: "eastern-andes",
    status: "Endemic",
    difficulty: "Challenging",
    habitat: "High-altitude páramo and cloud forest edges",
    bestTime: "December - March",
    image: "/images/green-bearded-helmetcrest.png",
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
    region: "Central Andes",
    regionSlug: "central-andes",
    status: "Endemic",
    difficulty: "Challenging",
    habitat: "High-altitude páramo and volcanic slopes",
    bestTime: "December - March",
    image: "/images/rainbow-bearded-thornbill.jpg",
    photoCredit: {
      photographer: "Nicolás Rozo",
      title: "AVES Guide",
      teamLink: "/team#nicolas-rozo",
      instagramPost: "https://www.instagram.com/p/C247ZDJgXBa/",
      reserve: "Termales del Ruiz",
      reserveLink: "/about/partners#termales-del-ruiz",
    },
  },
  {
    id: "3",
    commonName: "Black-billed Mountain-Toucan",
    scientificName: "Andigena nigrirostris",
    spanishName: "Tucán Andino Piquinegro",
    region: "Central Andes",
    regionSlug: "central-andes",
    status: "Near Endemic",
    difficulty: "Moderate",
    habitat: "Montane cloud forests at 1,500-2,500m elevation",
    bestTime: "Year-round",
    image: "/images/bbmtou1-black-billed-mountain-toucan.png",
    photoCredit: {
      photographer: "Nicolás Rozo",
      title: "AVES Guide",
      teamLink: "/team#nicolas-rozo",
      instagramPost: "https://www.instagram.com/p/C247ZDJgXBa/",
      reserve: "Reserva Río Blanco",
      reserveLink: "/about/partners#reserva-rio-blanco",
    },
  },
  {
    id: "4",
    commonName: "Chestnut-crowned Antpitta",
    scientificName: "Grallaria ruficapilla",
    spanishName: "Tororoi Coronirrufo",
    region: "Colombian Massif",
    regionSlug: "colombian-massif",
    status: "Endemic",
    difficulty: "Moderate",
    habitat: "Cloud forest understory",
    bestTime: "Year-round",
    image: "/images/chestnut-crowned-antpitta.jpg",
    photoCredit: {
      photographer: "Nicolás Rozo",
      title: "AVES Guide",
      teamLink: "/team#nicolas-rozo",
      instagramPost: "https://www.instagram.com/p/C247ZDJgXBa/",
      reserve: "Reserva Río Blanco",
      reserveLink: "/about/partners#reserva-rio-blanco",
    },
  },
  {
    id: "5",
    commonName: "Andean Motmot",
    scientificName: "Momotus aequatorialis",
    spanishName: "Momoto Andino",
    region: "Western Andes",
    regionSlug: "western-andes",
    status: "Near Endemic",
    difficulty: "Easy",
    habitat: "Humid montane forests and cloud forest edges",
    bestTime: "Year-round",
    image: "/images/blue-crowned-motmot-new.jpg",
    photoCredit: {
      photographer: "Nicolás Rozo",
      title: "AVES Guide",
      teamLink: "/team#nicolas-rozo",
      instagramPost: "https://www.instagram.com/p/C247ZDJgXBa/",
      reserve: "Reserva Río Blanco",
      reserveLink: "/about/partners#reserva-rio-blanco",
    },
  },
  {
    id: "6",
    commonName: "Vermilion Cardinal",
    scientificName: "Cardinalis phoeniceus",
    spanishName: "Cardenal Guajiro",
    region: "Caribbean Coast",
    regionSlug: "caribbean-coast",
    status: "Endemic",
    difficulty: "Moderate",
    habitat: "Dry scrublands and thorny forests",
    bestTime: "December - April",
    image: "/images/cardinal-guajiro.jpg",
    photoCredit: {
      photographer: "Nicolás Rozo",
      title: "AVES Guide",
      teamLink: "/team#nicolas-rozo",
      instagramPost: "https://www.instagram.com/p/C247ZDJgXBa/",
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
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [showInfo, setShowInfo] = useState(false)
  const [showPhotoCredit, setShowPhotoCredit] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const currentBird = birdData[currentIndex]

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % birdData.length)
    setImageLoaded(false)
    setImageError(false)
    setIsLoading(true)
    setShowInfo(false)
    setShowPhotoCredit(false)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + birdData.length) % birdData.length)
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

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(nextSlide, autoPlayInterval)
      return () => clearInterval(interval)
    }
  }, [isPlaying, nextSlide, autoPlayInterval])

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

  // Preload next image
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % birdData.length
    const nextImage = new Image()
    nextImage.src = birdData[nextIndex].image
  }, [currentIndex])

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

  // Enhanced image positioning for perfect square framing
  const getImagePositioning = (birdId: string) => {
    switch (birdId) {
      case "1": // Green-bearded Helmetcrest
        return {
          objectPosition: "center 35%",
          transform: "scale(1.2)",
        }
      case "2": // Rainbow-bearded Thornbill
        return {
          objectPosition: "center 30%",
          transform: "scale(1.1)",
        }
      case "3": // Black-billed Mountain-Toucan
        return {
          objectPosition: "center center",
          transform: "scale(1.15)",
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
      default:
        return {
          objectPosition: "center center",
          transform: "scale(1.1)",
        }
    }
  }

  const currentImagePositioning = getImagePositioning(currentBird.id)

  return (
    <div className={cn("relative w-full max-w-md mx-auto", className)}>
      <Card className="overflow-hidden border-0 shadow-xl">
        <div className="relative">
          {/* Main Image - Perfect Square */}
          <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-emerald-50 to-blue-50">
            {!imageError ? (
              <img
                src={currentBird.image || "/placeholder.svg?height=400&width=400&text=Bird+Image"}
                alt={`${currentBird.commonName} - ${currentBird.region}`}
                className={cn(
                  "w-full h-full object-cover transition-all duration-700 ease-out",
                  imageLoaded ? "opacity-100" : "opacity-0",
                )}
                style={{
                  objectPosition: currentImagePositioning.objectPosition,
                  transform: currentImagePositioning.transform,
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

            {/* Loading Indicator */}
            {isLoading && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-emerald-700 font-medium">Loading...</p>
                </div>
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Navigation Arrows */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 w-9 h-9 rounded-full z-30 transition-all duration-200"
              onClick={prevSlide}
              aria-label="Previous bird"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 w-9 h-9 rounded-full z-30 transition-all duration-200"
              onClick={nextSlide}
              aria-label="Next bird"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>

            {/* Top Control Buttons */}
            <div className="absolute top-3 right-3 flex gap-2 z-40">
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 w-8 h-8 p-0 rounded-full transition-all duration-200"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 w-8 h-8 p-0 rounded-full transition-all duration-200"
                onClick={() => setShowPhotoCredit(!showPhotoCredit)}
                aria-label="View photo credit"
              >
                <Camera className="w-3 h-3" />
              </Button>
            </div>

            {/* Status Badges - Top Left */}
            <div className="absolute top-3 left-3 flex flex-col gap-1 z-20">
              <Badge className={cn("text-xs font-medium border shadow-sm", getStatusColor(currentBird.status))}>
                {currentBird.status}
              </Badge>
              <Badge className={cn("text-xs font-medium border shadow-sm", getDifficultyColor(currentBird.difficulty))}>
                {currentBird.difficulty}
              </Badge>
            </div>

            {/* Region Info - Top Center */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20">
              <div className="flex items-center gap-1 bg-emerald-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                <MapPin className="w-3 h-3" />
                <span>{currentBird.region}</span>
              </div>
            </div>

            {/* Bird Information - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 text-white z-20">
              <div className="p-3 space-y-1">
                <h3 className="text-lg font-bold leading-tight">{currentBird.commonName}</h3>
                <p className="text-sm italic opacity-90 leading-tight">{currentBird.scientificName}</p>
                <p className="text-xs opacity-75 leading-tight">{currentBird.spanishName}</p>
              </div>
            </div>

            {/* Info Button - Bottom Right */}
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "absolute bottom-3 right-3 w-10 h-10 p-0 rounded-full border-0 transition-all duration-300 z-40",
                showInfo
                  ? "bg-emerald-600 text-white hover:bg-emerald-700 scale-110 shadow-emerald-500/40 shadow-lg"
                  : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30",
              )}
              onClick={() => setShowInfo(!showInfo)}
              aria-label={showInfo ? "Hide bird information" : "Show bird information"}
            >
              <Info className={cn("w-4 h-4 transition-all duration-300", showInfo ? "rotate-180" : "")} />
            </Button>

            {/* Photo Credit Popup */}
            {showPhotoCredit && (
              <div className="absolute top-14 right-3 z-50">
                <div className="bg-black/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs shadow-xl min-w-[180px]">
                  <div className="flex items-center gap-2 mb-2">
                    <Camera className="w-3 h-3" />
                    <span className="font-medium">Photo Credit</span>
                  </div>
                  <div className="space-y-1">
                    {currentBird.photoCredit.teamLink ? (
                      <Link
                        href={currentBird.photoCredit.teamLink}
                        className="text-emerald-300 hover:text-emerald-200 font-medium hover:underline block"
                      >
                        {currentBird.photoCredit.photographer}
                      </Link>
                    ) : (
                      <span className="text-emerald-300 font-medium">{currentBird.photoCredit.photographer}</span>
                    )}
                    <p className="text-blue-300 text-xs">{currentBird.photoCredit.title}</p>
                    {currentBird.photoCredit.reserve && (
                      <div>
                        {currentBird.photoCredit.reserveLink ? (
                          <Link
                            href={currentBird.photoCredit.reserveLink}
                            className="text-yellow-300 hover:text-yellow-200 text-xs hover:underline flex items-center gap-1"
                          >
                            <MapPin className="w-3 h-3" />
                            {currentBird.photoCredit.reserve}
                          </Link>
                        ) : (
                          <span className="text-yellow-300 text-xs">{currentBird.photoCredit.reserve}</span>
                        )}
                      </div>
                    )}
                    {currentBird.photoCredit.instagramPost && (
                      <a
                        href={currentBird.photoCredit.instagramPost}
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

            {/* Info Popup */}
            {showInfo && (
              <div className="absolute inset-0 bg-black/95 backdrop-blur-md z-50">
                <div className="h-full overflow-y-auto p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 w-8 h-8 p-0 rounded-full bg-white/20 hover:bg-white/30 text-white border-0"
                    onClick={() => setShowInfo(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>

                  <div className="pt-12 pb-6">
                    <div className="mb-4">
                      <h2 className="text-lg font-bold text-emerald-300 mb-1">{currentBird.commonName}</h2>
                      <p className="text-sm italic text-blue-300 mb-1">{currentBird.scientificName}</p>
                      <p className="text-xs text-gray-300">{currentBird.spanishName}</p>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div>
                        <span className="font-medium text-emerald-300 text-sm block mb-1">Habitat:</span>
                        <span className="text-white/90 text-xs">{currentBird.habitat}</span>
                      </div>
                      <div>
                        <span className="font-medium text-emerald-300 text-sm block mb-1">Best time:</span>
                        <span className="text-white/90 text-xs">{currentBird.bestTime}</span>
                      </div>
                      <div>
                        <span className="font-medium text-emerald-300 text-sm block mb-1">Region:</span>
                        <span className="text-white/90 text-xs">{currentBird.region}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Link href={`/aves-explorer#${currentBird.regionSlug}`}>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-xs w-full h-9">
                          <MapPin className="w-3 h-3 mr-1" />
                          Explore Region
                        </Button>
                      </Link>
                      <Link href="/tours">
                        <Button
                          variant="outline"
                          className="border-white/40 text-white hover:bg-white/15 text-xs bg-white/5 w-full h-9"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
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

        {/* Thumbnail Navigation */}
        <CardContent className="p-3">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {birdData.map((bird, index) => {
              const thumbnailPositioning = getImagePositioning(bird.id)
              return (
                <button
                  key={bird.id}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all relative",
                    index === currentIndex ? "border-emerald-500 ring-1 ring-emerald-200" : "border-gray-200",
                  )}
                  aria-label={`View ${bird.commonName}`}
                >
                  <img
                    src={bird.image || "/placeholder.svg?height=48&width=48&text=Bird"}
                    alt={bird.commonName}
                    className="w-full h-full object-cover transition-all"
                    style={{
                      objectPosition: thumbnailPositioning.objectPosition,
                      transform: thumbnailPositioning.transform,
                    }}
                  />
                  {index === currentIndex && <div className="absolute inset-0 bg-emerald-500/20" />}
                </button>
              )
            })}
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-1 mt-3">
            {birdData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all",
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
