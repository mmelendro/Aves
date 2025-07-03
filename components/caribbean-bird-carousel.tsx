"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Pause, Info, Camera, MapPin, ExternalLink, X } from 'lucide-react'
import { cn } from "@/lib/utils"
import Link from "next/link"
import { caribbeanData } from "@/lib/caribbean-data"

interface HomepageBirdCarouselProps {
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
}

function CaribbeanBirdCarousel({
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

  const birdData = caribbeanData.carouselBirds
  const currentBird = birdData[currentIndex]

  // Preload all images on component mount
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = birdData.map((bird, index) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image()
          img.onload = () => {
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
          img.onerror = () => {
            if (index === 0) {
              setFirstImageLoaded(true)
              setIsLoading(false)
              setImageError(true)
            }
            reject()
          }
          // Set high priority for first image
          if (index === 0) {
            img.fetchPriority = "high"
          }
          img.src = bird.image
        })
      })

      // Wait for at least the first image to load
      try {
        await imagePromises[0]
      } catch (error) {
        console.warn("Failed to load first image:", error)
      }

      // Continue loading other images in background
      Promise.allSettled(imagePromises.slice(1))
    }

    preloadImages()
  }, [autoPlay, birdData])

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
  }, [currentIndex, firstImageLoaded, preloadedImages, birdData])

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
  }, [currentIndex, preloadedImages, birdData])

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
    [preloadedImages, birdData],
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
    setIsLoading(false)
    setImageLoaded(false)
    setImageError(true)
  }, [])

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
      case "1": // Vermilion Cardinal
        return {
          objectPosition: "center 25%",
          transform: "scale(1.1)",
        }
      case "2": // Lance-tailed Manakin
        return {
          objectPosition: "center center",
          transform: "scale(1.15)",
        }
      case "3": // White-bellied Antbird
        return {
          objectPosition: "center 30%",
          transform: "scale(1.2)",
        }
      case "4": // Buff-breasted Wren
        return {
          objectPosition: "center 35%",
          transform: "scale(1.1)",
        }
      case "5": // Crimson-crested Woodpecker
        return {
          objectPosition: "center center",
          transform: "scale(1.1)",
        }
      case "6": // Red-billed Emerald
        return {
          objectPosition: "center 40%",
          transform: "scale(1.2)",
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
      case "Caribbean Coast":
        return "bg-orange-600/90 text-white border-orange-500/50"
      case "Eastern Andes":
        return "bg-blue-600/90 text-white border-blue-500/50"
      case "Central Andes":
        return "bg-purple-600/90 text-white border-purple-500/50"
      case "Western Andes":
        return "bg-green-600/90 text-white border-green-500/50"
      case "Colombian Massif":
        return "bg-orange-600/90 text-white border-orange-500/50"
      default:
        return "bg-gray-600/90 text-white border-gray-500/50"
    }
  }

  return (
    <div className={cn("relative w-full max-w-md mx-auto", className)}>
      <Card className="overflow-hidden border-0 shadow-xl">
        <div className="relative">
          {/* Main Image - Perfect Square */}
          <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-orange-50 to-red-50">
            {!imageError ? (
              <img
                src={currentBird.image || "/placeholder.svg?height=400&width=400&text=Bird+Image"}
                alt={`${currentBird.commonName} - ${currentBird.primaryRegion}`}
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
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-3 border-orange-600 border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-orange-700 font-medium">
                    {currentIndex === 0 && !firstImageLoaded ? "Loading first image..." : "Loading..."}
                  </p>
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
                disabled={!firstImageLoaded} // Disable until first image loads
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

            {/* Bird Information - Bottom with Primary Region Tag */}
            <div className="absolute bottom-0 left-0 right-0 text-white z-20">
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
                      "w-10 h-10 p-0 rounded-full border-0 transition-all duration-300",
                      showInfo
                        ? "bg-orange-600 text-white hover:bg-orange-700 scale-110 shadow-orange-500/40 shadow-lg"
                        : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30",
                    )}
                    onClick={() => setShowInfo(!showInfo)}
                    aria-label={showInfo ? "Hide bird information" : "Show bird information"}
                  >
                    <Info className={cn("w-4 h-4 transition-all duration-300", showInfo ? "rotate-180" : "")} />
                  </Button>
                </div>
              </div>
            </div>

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
                        className="text-orange-300 hover:text-orange-200 font-medium hover:underline block"
                      >
                        {currentBird.photoCredit.photographer}
                      </Link>
                    ) : (
                      <span className="text-orange-300 font-medium">{currentBird.photoCredit.photographer}</span>
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

            {/* Enhanced Info Popup */}
            {showInfo && (
              <div className="absolute inset-0 bg-black/20 backdrop-blur-lg z-50">
                <div className="h-full overflow-y-auto p-4">
                  {/* Separate close button in top-right */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 w-8 h-8 p-0 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white border-0 z-10 shadow-lg"
                    onClick={() => setShowInfo(false)}
                    aria-label="Close information"
                  >
                    <X className="w-4 h-4" />
                  </Button>

                  <div className="pt-12 pb-6">
                    <div className="mb-4">
                      <h2 className="text-lg font-bold text-white mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]">
                        {currentBird.commonName}
                      </h2>
                      <p className="text-sm italic text-orange-200 mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_3px_rgb(0_0_0_/_80%)]">
                        {currentBird.scientificName}
                      </p>
                      <p className="text-xs text-gray-200 mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_3px_rgb(0_0_0_/_80%)]">
                        {currentBird.spanishName}
                      </p>

                      {/* Status and Difficulty Badges - Enhanced with backdrop */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge
                          className={cn(
                            "text-xs font-medium border shadow-lg backdrop-blur-sm",
                            getStatusColor(currentBird.status),
                          )}
                        >
                          {currentBird.status}
                        </Badge>
                        <Badge
                          className={cn(
                            "text-xs font-medium border shadow-lg backdrop-blur-sm",
                            getDifficultyColor(currentBird.difficulty),
                          )}
                        >
                          {currentBird.difficulty}
                        </Badge>
                      </div>

                      {/* Regional Distribution */}
                      <div className="space-y-3 mb-4">
                        {/* Primary Region */}
                        <div>
                          <span className="font-medium text-white text-sm block mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_3px_rgb(0_0_0_/_80%)]">
                            Primary Region:
                          </span>
                          <div
                            className={cn(
                              "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border shadow-lg backdrop-blur-sm",
                              getPrimaryRegionColor(currentBird.primaryRegion),
                            )}
                          >
                            <MapPin className="w-3 h-3" />
                            <span>{currentBird.primaryRegion}</span>
                          </div>
                        </div>

                        {/* Secondary Regions */}
                        {currentBird.secondaryRegions.length > 0 && (
                          <div>
                            <span className="font-medium text-white text-sm block mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_3px_rgb(0_0_0_/_80%)]">
                              Also found in:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {currentBird.secondaryRegions.map((region, index) => (
                                <div
                                  key={index}
                                  className={cn(
                                    "px-2 py-1 rounded-full text-xs font-medium border shadow-lg backdrop-blur-sm",
                                    getPrimaryRegionColor(region).replace("/90", "/80"),
                                  )}
                                >
                                  {region}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Ecoregions */}
                        <div>
                          <span className="font-medium text-white text-sm block mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_3px_rgb(0_0_0_/_80%)]">
                            Ecoregions:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {currentBird.ecoregions.map((ecoregion, index) => (
                              <div
                                key={index}
                                className="px-2 py-1 rounded-full text-xs font-medium border bg-slate-600/90 text-white border-slate-400/60 shadow-lg backdrop-blur-sm"
                              >
                                {ecoregion}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div>
                        <span className="font-medium text-white text-sm block mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_3px_rgb(0_0_0_/_80%)]">
                          Habitat:
                        </span>
                        <span className="text-white text-xs drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_3px_rgb(0_0_0_/_80%)]">
                          {currentBird.habitat}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-white text-sm block mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_3px_rgb(0_0_0_/_80%)]">
                          Best time:
                        </span>
                        <span className="text-white text-xs drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_3px_rgb(0_0_0_/_80%)]">
                          {currentBird.bestTime}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-white text-sm block mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_3px_rgb(0_0_0_/_80%)]">
                          Elevation:
                        </span>
                        <span className="text-white text-xs drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_3px_rgb(0_0_0_/_80%)]">
                          {currentBird.elevation}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Link href="/checkout?region=caribbean&source=carousel-info">
                        <Button className="bg-orange-600/90 hover:bg-orange-700/90 text-xs w-full h-9 shadow-lg backdrop-blur-sm border border-orange-500/40">
                          <MapPin className="w-3 h-3 mr-1" />
                          Book Caribbean Tour
                        </Button>
                      </Link>
                      <Link href="/contact?subject=Caribbean+Coast+Birding">
                        <Button
                          variant="outline"
                          className="border-white/70 text-white hover:bg-white/20 text-xs bg-white/10 w-full h-9 shadow-lg backdrop-blur-sm"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Ask Our Experts
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
              const isPreloaded = preloadedImages.has(bird.image)
              return (
                <button
                  key={bird.id}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all relative",
                    index === currentIndex ? "border-orange-500 ring-1 ring-orange-200" : "border-gray-200",
                    !isPreloaded && "opacity-50", // Visual indicator for unloaded images
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
                    loading={index < 3 ? "eager" : "lazy"} // Eager load first 3 thumbnails
                  />
                  {index === currentIndex && <div className="absolute inset-0 bg-orange-500/20" />}
                  {!isPreloaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
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
                  index === currentIndex ? "bg-orange-500" : "bg-gray-300",
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

export default CaribbeanBirdCarousel
export { CaribbeanBirdCarousel }
