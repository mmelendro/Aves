"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Play, Pause, Camera, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface Bird {
  id: string
  name: string
  scientificName: string
  location: string
  region: string
  image: string
  thumbnail: string
  photographer?: string
  description?: string
}

const birds: Bird[] = [
  {
    id: "green-bearded-helmetcrest",
    name: "Green-bearded Helmetcrest",
    scientificName: "Oxypogon guerinii",
    location: "Cordillera Oriental",
    region: "Eastern Andes",
    image: "/images/green-bearded-helmetcrest.png",
    thumbnail: "/images/green-bearded-helmetcrest.png",
    photographer: "David Jara",
    description:
      "An endemic hummingbird found only in the high-altitude páramo ecosystems of Colombia's Eastern Andes.",
  },
  {
    id: "rainbow-bearded-thornbill",
    name: "Rainbow-bearded Thornbill",
    scientificName: "Chalcostigma herrani",
    location: "Páramo de Manizales",
    region: "Central Andes",
    image: "/images/rainbow-bearded-thornbill.jpg",
    thumbnail: "/images/rabtho1.jpg",
    photographer: "Nicolas Rozo",
    description: "A spectacular endemic hummingbird with iridescent plumage found in Colombia's high-altitude páramo.",
  },
  {
    id: "chestnut-crowned-antpitta",
    name: "Chestnut-crowned Antpitta",
    scientificName: "Grallaria ruficapilla",
    location: "Refugio La Esmeralda",
    region: "Central Andes",
    image: "/images/chestnut-crowned-antpitta.jpg",
    thumbnail: "/images/chestnut-crowned-antpitta.jpg",
    photographer: "Juan Camilo Canadiense",
    description: "A secretive ground-dwelling bird endemic to Colombia's cloud forests.",
  },
  {
    id: "black-billed-mountain-toucan",
    name: "Black-billed Mountain Toucan",
    scientificName: "Andigena nigrirostris",
    location: "Western Andes",
    region: "Western Andes",
    image: "/images/bbmtou1-black-billed-mountain-toucan.png",
    thumbnail: "/images/bbmtou1-square.png",
    photographer: "Gleison Guarin",
    description: "A colorful toucan species found in the cloud forests of Colombia's Western Andes.",
  },
  {
    id: "velvet-purple-coronet",
    name: "Velvet-purple Coronet",
    scientificName: "Boissonneaua jardini",
    location: "Chocó Region",
    region: "Western Andes",
    image: "/images/velvet-purple-coronet.jpg",
    thumbnail: "/images/velvet-purple-coronet.jpg",
    photographer: "Yeferson Guale Epiayu",
    description: "A stunning hummingbird with deep purple plumage found in Colombia's biodiverse Chocó region.",
  },
  {
    id: "andean-cock-of-the-rock",
    name: "Andean Cock-of-the-rock",
    scientificName: "Rupicola peruvianus",
    location: "Eastern Andes",
    region: "Eastern Andes",
    image: "/images/andean-cock-of-the-rock.jpg",
    thumbnail: "/images/andean-cock-of-the-rock.jpg",
    photographer: "Dagoberto Rudas",
    description:
      "Peru's national bird, also found in Colombia's cloud forests, known for its spectacular orange plumage.",
  },
  {
    id: "yellow-throated-toucan",
    name: "Yellow-throated Toucan",
    scientificName: "Ramphastos ambiguus",
    location: "Caribbean Coast",
    region: "Caribbean",
    image: "/images/yellow-throated-toucan.jpg",
    thumbnail: "/images/yellow-throated-toucan.jpg",
    photographer: "Jose Luis Ropero",
    description: "A large, colorful toucan species found in the lowland forests of Colombia's Caribbean coast.",
  },
]

interface HomepageBirdCarouselProps {
  className?: string
}

export default function HomepageBirdCarousel({ className }: HomepageBirdCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [showInfo, setShowInfo] = useState(false)
  const [showPhotoCredit, setShowPhotoCredit] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % birds.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + birds.length) % birds.length)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying, nextSlide])

  const currentBird = birds[currentIndex]

  return (
    <div className={cn("relative w-full max-w-2xl mx-auto", className)}>
      <Card className="overflow-hidden bg-white shadow-2xl border-0">
        <CardContent className="p-0 relative">
          {/* Main Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={currentBird.image || "/placeholder.svg"}
              alt={`${currentBird.name} - ${currentBird.scientificName}`}
              fill
              className="object-cover transition-all duration-700 ease-in-out"
              priority={currentIndex === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Navigation Arrows */}
            <Button
              onClick={prevSlide}
              variant="ghost"
              size="sm"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white hover:text-white transition-all duration-200"
              aria-label="Previous bird"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <Button
              onClick={nextSlide}
              variant="ghost"
              size="sm"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white hover:text-white transition-all duration-200"
              aria-label="Next bird"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>

            {/* Top Control Buttons - AUDIO BUTTON COMPLETELY REMOVED */}
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                variant="ghost"
                size="sm"
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white hover:text-white transition-all duration-200"
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>

              <Button
                onClick={() => setShowPhotoCredit(!showPhotoCredit)}
                variant="ghost"
                size="sm"
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white hover:text-white transition-all duration-200"
                aria-label="Show photo credit"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            {/* Bird Information Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1 drop-shadow-lg">{currentBird.name}</h3>
                  <p className="text-lg italic opacity-90 mb-2 drop-shadow">{currentBird.scientificName}</p>
                  <p className="text-sm opacity-80 drop-shadow">{currentBird.location}</p>
                  <Badge variant="secondary" className="mt-2 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                    {currentBird.region}
                  </Badge>
                </div>

                <Button
                  onClick={() => setShowInfo(!showInfo)}
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white hover:text-white transition-all duration-200 ml-4"
                  aria-label="Show bird information"
                >
                  <Info className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Photo Credit Popup */}
            {showPhotoCredit && (
              <div className="absolute top-16 right-4 bg-black/80 backdrop-blur-sm text-white p-3 rounded-lg text-sm max-w-xs">
                <p className="font-medium">Photo by {currentBird.photographer}</p>
                <Button
                  onClick={() => setShowPhotoCredit(false)}
                  variant="ghost"
                  size="sm"
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 text-white p-0"
                  aria-label="Close photo credit"
                >
                  ×
                </Button>
              </div>
            )}

            {/* Info Panel */}
            {showInfo && (
              <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 max-w-md text-white border border-white/20">
                  <h4 className="text-xl font-bold mb-3">{currentBird.name}</h4>
                  <p className="text-lg italic mb-4">{currentBird.scientificName}</p>
                  <p className="text-sm leading-relaxed mb-4">{currentBird.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="opacity-80">📍 {currentBird.location}</span>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {currentBird.region}
                    </Badge>
                  </div>
                  <Button
                    onClick={() => setShowInfo(false)}
                    variant="ghost"
                    size="sm"
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white p-0"
                    aria-label="Close information panel"
                  >
                    ×
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Thumbnail Navigation */}
          <div className="p-4 bg-gray-50">
            <div className="flex gap-2 justify-center overflow-x-auto pb-2">
              {birds.map((bird, index) => (
                <button
                  key={bird.id}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200",
                    index === currentIndex
                      ? "border-emerald-500 ring-2 ring-emerald-200"
                      : "border-gray-200 hover:border-gray-300",
                  )}
                  aria-label={`View ${bird.name}`}
                >
                  <Image
                    src={bird.thumbnail || "/placeholder.svg"}
                    alt={bird.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
            {birds.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75",
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
