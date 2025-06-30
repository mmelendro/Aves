"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, MapPin, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface Bird {
  id: string
  name: string
  scientificName: string
  spanishName: string
  image: string
  audio?: string
  region: string
  secondaryRegions?: string[]
  status: "Endemic" | "Near Endemic" | "Resident"
  description: string
  habitat: string
  size: string
  diet: string
  behavior: string
  conservationStatus: string
  photographer?: string
  recordist?: string
}

const birds: Bird[] = [
  {
    id: "chestnut-crowned-antpitta",
    name: "Chestnut-crowned Antpitta",
    scientificName: "Grallaria ruficapilla",
    spanishName: "Tororoi Coronado",
    image: "/images/chestnut-crowned-antpitta.jpg",
    audio: "/audio/chcant2.mp3",
    region: "Central Andes",
    secondaryRegions: ["Eastern Andes", "Western Andes"],
    status: "Endemic",
    description: "A secretive ground-dwelling bird known for its distinctive chestnut crown and melodious song.",
    habitat: "Cloud forests and montane forests between 1,800-3,200m elevation",
    size: "16-18 cm",
    diet: "Insects, worms, and small invertebrates",
    behavior: "Terrestrial, often seen hopping on forest floor, very secretive",
    conservationStatus: "Least Concern",
    photographer: "Royann Petrell",
    recordist: "Various",
  },
  {
    id: "rainbow-bearded-thornbill",
    name: "Rainbow-bearded Thornbill",
    scientificName: "Chalcostigma herrani",
    spanishName: "Picoespina Arcoíris",
    image: "/images/rainbow-bearded-thornbill.jpg",
    audio: "/audio/rabtho1.mp3",
    region: "Eastern Andes",
    secondaryRegions: ["Central Andes"],
    status: "Endemic",
    description: "A spectacular high-altitude hummingbird with iridescent rainbow plumage and distinctive beard.",
    habitat: "Páramo and high-altitude scrublands above 3,000m",
    size: "10-11 cm",
    diet: "Nectar from high-altitude flowers, small insects",
    behavior: "Territorial, aggressive at feeding sites, performs aerial displays",
    conservationStatus: "Least Concern",
    photographer: "Royann Petrell",
    recordist: "Various",
  },
  {
    id: "green-bearded-helmetcrest",
    name: "Green-bearded Helmetcrest",
    scientificName: "Oxypogon guerinii",
    spanishName: "Colibrí Crestado Verde",
    image: "/images/green-bearded-helmetcrest.png",
    audio: "/audio/gnbhel1.mp3",
    region: "Eastern Andes",
    status: "Endemic",
    description:
      "A rare high-altitude hummingbird with distinctive green beard and crest, found only in Colombian páramos.",
    habitat: "Páramo ecosystems above 3,500m elevation",
    size: "11-12 cm",
    diet: "Nectar from páramo plants, especially Espeletia",
    behavior: "Highly territorial, adapted to extreme altitude conditions",
    conservationStatus: "Near Threatened",
    photographer: "Various",
    recordist: "Various",
  },
  {
    id: "yellow-throated-toucan",
    name: "Yellow-throated Toucan",
    scientificName: "Ramphastos ambiguus",
    spanishName: "Tucán Pico Iris",
    image: "/images/yellow-throated-toucan.jpg",
    audio: "/audio/yellow-throated-toucan.mp3",
    region: "Chocó",
    secondaryRegions: ["Western Andes", "Magdalena Valley"],
    status: "Resident",
    description: "A large, colorful toucan with distinctive yellow throat and chest, iconic of Colombian rainforests.",
    habitat: "Humid lowland and montane forests up to 2,000m",
    size: "47-61 cm",
    diet: "Fruits, insects, eggs, and small vertebrates",
    behavior: "Social, often seen in flocks, important seed disperser",
    conservationStatus: "Least Concern",
    photographer: "Royann Petrell",
    recordist: "Various",
  },
  {
    id: "vermillion-flycatcher",
    name: "Vermillion Flycatcher",
    scientificName: "Pyrocephalus rubinus",
    spanishName: "Petirrojo",
    image: "/images/vermillion-flycatcher.jpg",
    region: "Caribbean Coast",
    secondaryRegions: ["Magdalena Valley", "Cauca Valley"],
    status: "Resident",
    description:
      "A striking small flycatcher with brilliant red plumage in males, known for its aerial hunting displays.",
    habitat: "Open areas, savannas, and woodland edges",
    size: "13-14 cm",
    diet: "Flying insects caught in aerial sallies",
    behavior: "Perches conspicuously, performs elaborate courtship flights",
    conservationStatus: "Least Concern",
    photographer: "Royann Petrell",
  },
  {
    id: "black-billed-mountain-toucan",
    name: "Black-billed Mountain Toucan",
    scientificName: "Andigena nigrirostris",
    spanishName: "Tucán Andino Piquinegro",
    image: "/images/bbmtou1-black-billed-mountain-toucan.png",
    region: "Western Andes",
    secondaryRegions: ["Central Andes"],
    status: "Near Endemic",
    description:
      "A medium-sized mountain toucan with distinctive black bill and colorful plumage, endemic to the Andes.",
    habitat: "Cloud forests and montane forests between 1,800-3,200m",
    size: "42-48 cm",
    diet: "Fruits, especially figs, and occasionally insects",
    behavior: "Social, travels in small flocks, important for forest regeneration",
    conservationStatus: "Least Concern",
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
  autoPlayInterval = 5000,
}: EnhancedEndemicBirdsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [audioPlaying, setAudioPlaying] = useState<string | null>(null)
  const [audioMuted, setAudioMuted] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % birds.length)
      }, autoPlayInterval)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, autoPlayInterval])

  // Audio management
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % birds.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + birds.length) % birds.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const playAudio = (audioUrl: string, birdId: string) => {
    if (audioPlaying === birdId) {
      // Stop current audio
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
      setAudioPlaying(null)
    } else {
      // Play new audio
      if (audioRef.current) {
        audioRef.current.pause()
      }

      const audio = new Audio(audioUrl)
      audio.muted = audioMuted
      audioRef.current = audio

      audio.play().catch(console.error)
      setAudioPlaying(birdId)

      audio.onended = () => {
        setAudioPlaying(null)
      }
    }
  }

  const toggleMute = () => {
    setAudioMuted(!audioMuted)
    if (audioRef.current) {
      audioRef.current.muted = !audioMuted
    }
  }

  const currentBird = birds[currentIndex]

  return (
    <div className={cn("relative w-full h-full", className)}>
      <Card className="h-full border-0 shadow-2xl overflow-hidden bg-gradient-to-br from-emerald-50 to-blue-50">
        <CardContent className="p-0 h-full relative">
          {/* Main Image */}
          <div className="relative h-full group">
            <img
              src={currentBird.image || "/placeholder.svg"}
              alt={currentBird.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Navigation Arrows - Mobile Optimized */}
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm transition-all duration-300 ${
                isMobile ? "w-8 h-8" : "w-10 h-10"
              }`}
            >
              <ChevronLeft className={isMobile ? "w-4 h-4" : "w-5 h-5"} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm transition-all duration-300 ${
                isMobile ? "w-8 h-8" : "w-10 h-10"
              }`}
            >
              <ChevronRight className={isMobile ? "w-4 h-4" : "w-5 h-5"} />
            </Button>

            {/* Top Controls - Mobile Optimized */}
            <div className={`absolute top-3 right-3 flex gap-2 ${isMobile ? "scale-90" : ""}`}>
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlayPause}
                className={`bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm ${
                  isMobile ? "w-7 h-7" : "w-8 h-8"
                }`}
              >
                {isPlaying ? (
                  <Pause className={isMobile ? "w-3 h-3" : "w-4 h-4"} />
                ) : (
                  <Play className={isMobile ? "w-3 h-3" : "w-4 h-4"} />
                )}
              </Button>

              {currentBird.audio && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => playAudio(currentBird.audio!, currentBird.id)}
                  className={`bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm ${
                    audioPlaying === currentBird.id ? "bg-emerald-500/50" : ""
                  } ${isMobile ? "w-7 h-7" : "w-8 h-8"}`}
                >
                  {audioMuted ? (
                    <VolumeX className={isMobile ? "w-3 h-3" : "w-4 h-4"} />
                  ) : (
                    <Volume2 className={isMobile ? "w-3 h-3" : "w-4 h-4"} />
                  )}
                </Button>
              )}

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className={`bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm ${
                  isMobile ? "w-7 h-7" : "w-8 h-8"
                }`}
              >
                <Info className={isMobile ? "w-3 h-3" : "w-4 h-4"} />
              </Button>
            </div>

            {/* Bird Information Overlay - Mobile Optimized */}
            <div className={`absolute bottom-0 left-0 right-0 p-4 text-white ${isMobile ? "p-3" : "p-6"}`}>
              {/* Status Badge */}
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  className={`${
                    currentBird.status === "Endemic"
                      ? "bg-emerald-600 text-white"
                      : currentBird.status === "Near Endemic"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-600 text-white"
                  } ${isMobile ? "text-xs px-2 py-1" : "text-sm"}`}
                >
                  {currentBird.status}
                </Badge>
                {currentBird.photographer && (
                  <Badge
                    className={`bg-white/20 text-white backdrop-blur-sm ${isMobile ? "text-xs px-2 py-1" : "text-sm"}`}
                  >
                    © {currentBird.photographer}
                  </Badge>
                )}
              </div>

              {/* Bird Names - Mobile Optimized */}
              <div className={`space-y-1 ${isMobile ? "mb-2" : "mb-3"}`}>
                <h3 className={`font-bold leading-tight ${isMobile ? "text-lg" : "text-2xl"}`}>{currentBird.name}</h3>
                <p className={`italic opacity-90 ${isMobile ? "text-sm" : "text-lg"}`}>{currentBird.scientificName}</p>
                <p className={`opacity-80 ${isMobile ? "text-sm" : "text-base"}`}>{currentBird.spanishName}</p>
              </div>

              {/* Region Information - Mobile Optimized */}
              <div className={`flex items-center gap-2 ${isMobile ? "mb-2" : "mb-3"}`}>
                <MapPin className={`flex-shrink-0 ${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
                <div className={isMobile ? "text-sm" : "text-base"}>
                  <span className="font-medium">{currentBird.region}</span>
                  {currentBird.secondaryRegions && (
                    <span className="opacity-80"> + {currentBird.secondaryRegions.join(", ")}</span>
                  )}
                </div>
              </div>

              {/* Hover Information - Desktop Only or Always Show on Mobile */}
              <div
                className={`transition-all duration-300 ${
                  isMobile
                    ? "opacity-100 max-h-none"
                    : "opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-40 overflow-hidden"
                }`}
              >
                <div className={`bg-black/40 backdrop-blur-sm rounded-lg ${isMobile ? "p-2 mt-2" : "p-3 mt-3"}`}>
                  <p className={`leading-relaxed ${isMobile ? "text-xs" : "text-sm"}`}>{currentBird.description}</p>
                  <div className={`grid grid-cols-2 gap-2 mt-2 ${isMobile ? "text-xs" : "text-xs"}`}>
                    <div>
                      <span className="font-medium">Habitat:</span>
                      <br />
                      <span className="opacity-90">{currentBird.habitat}</span>
                    </div>
                    <div>
                      <span className="font-medium">Size:</span>
                      <br />
                      <span className="opacity-90">{currentBird.size}</span>
                    </div>
                  </div>
                  {!isMobile && (
                    <div className="mt-2">
                      <Link
                        href="/endemic-birds"
                        className="inline-flex items-center text-emerald-300 hover:text-emerald-200 text-xs font-medium"
                      >
                        Learn More About Colombian Endemics →
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile-specific Learn More Link */}
              {isMobile && (
                <div className="mt-2">
                  <Link
                    href="/endemic-birds"
                    className="inline-flex items-center text-emerald-300 hover:text-emerald-200 text-xs font-medium"
                  >
                    Learn More About Colombian Endemics →
                  </Link>
                </div>
              )}
            </div>

            {/* Progress Indicators - Mobile Optimized */}
            <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 ${isMobile ? "gap-1" : "gap-2"}`}>
              {birds.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 ${
                    index === currentIndex ? "bg-white" : "bg-white/40 hover:bg-white/60"
                  } ${isMobile ? "w-1.5 h-1.5 rounded-full" : "w-2 h-2 rounded-full"}`}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
