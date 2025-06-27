"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Info, Camera, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

interface BirdData {
  id: string
  commonName: string
  scientificName: string
  spanishName: string
  family: string
  order: string
  status: "Endemic" | "Near Endemic" | "Spectacular" | "Common Favorite"
  region: string
  habitat: string
  description: string
  image: string
  audioFile?: string
  conservationStatus: string
  bestTime: string
  difficulty: "Easy" | "Moderate" | "Challenging"
  ebirdCode: string
}

const birdData: BirdData[] = [
  {
    id: "1",
    commonName: "Rainbow-bearded Thornbill",
    scientificName: "Chalcostigma herrani",
    spanishName: "Colibrí Barbudo Arcoíris",
    family: "Trochilidae",
    order: "Apodiformes",
    status: "Endemic",
    region: "Colombian Massif",
    habitat: "High-altitude páramo and cloud forest edges",
    description:
      "A spectacular endemic hummingbird with iridescent rainbow plumage on its throat and distinctive white leg puffs.",
    image: "/images/rainbow-bearded-thornbill.jpg",
    conservationStatus: "Near Threatened",
    bestTime: "December - March",
    difficulty: "Challenging",
    ebirdCode: "rabtho1",
  },
  {
    id: "2",
    commonName: "Chestnut-crowned Antpitta",
    scientificName: "Grallaria ruficapilla",
    spanishName: "Tororoi Coronirrufo",
    family: "Grallariidae",
    order: "Passeriformes",
    status: "Endemic",
    region: "Central & Eastern Andes",
    habitat: "Cloud forest understory",
    description:
      "An elusive ground-dwelling bird known for its distinctive chestnut crown and secretive nature in dense cloud forests.",
    image: "/images/chestnut-crowned-antpitta.jpg",
    conservationStatus: "Least Concern",
    bestTime: "Year-round",
    difficulty: "Moderate",
    ebirdCode: "checra1",
  },
  {
    id: "3",
    commonName: "Blue-crowned Motmot",
    scientificName: "Momotus coeruliceps",
    spanishName: "Momoto Coroniazul",
    family: "Momotidae",
    order: "Coraciiformes",
    status: "Near Endemic",
    region: "Chocó & Western Andes",
    habitat: "Humid lowland and montane forests",
    description:
      "A stunning bird with a brilliant blue crown and distinctive racket-tipped tail, often seen perched motionlessly.",
    image: "/images/blue-crowned-motmot-new.jpg",
    conservationStatus: "Least Concern",
    bestTime: "Year-round",
    difficulty: "Easy",
    ebirdCode: "blcmot1",
  },
  {
    id: "4",
    commonName: "Resplendent Quetzal",
    scientificName: "Pharomachrus mocinno",
    spanishName: "Quetzal Resplandeciente",
    family: "Trogonidae",
    order: "Trogoniformes",
    status: "Spectacular",
    region: "Western & Central Andes",
    habitat: "Cloud forests 1,500-3,000m",
    description:
      "The legendary bird of Mesoamerica, males display brilliant emerald plumage and extremely long tail coverts.",
    image: "/images/resplendent-quetzal.jpg",
    conservationStatus: "Near Threatened",
    bestTime: "March - June",
    difficulty: "Moderate",
    ebirdCode: "resque1",
  },
  {
    id: "5",
    commonName: "Yellow-throated Toucan",
    scientificName: "Ramphastos ambiguus",
    spanishName: "Tucán Piquiverde",
    family: "Ramphastidae",
    order: "Piciformes",
    status: "Spectacular",
    region: "Chocó & Amazon",
    habitat: "Lowland and montane rainforests",
    description:
      "A magnificent large toucan with a massive colorful bill and distinctive yellow throat, often seen in fruiting trees.",
    image: "/images/yellow-throated-toucan.jpg",
    audioFile: "/audio/yellow-throated-toucan.mp3",
    conservationStatus: "Vulnerable",
    bestTime: "Year-round",
    difficulty: "Easy",
    ebirdCode: "yettou1",
  },
  {
    id: "6",
    commonName: "Green Hermit",
    scientificName: "Phaethornis guy",
    spanishName: "Colibrí Ermitaño Verde",
    family: "Trochilidae",
    order: "Apodiformes",
    status: "Common Favorite",
    region: "Western & Central Andes",
    habitat: "Cloud forest understory and edges",
    description:
      "A large hummingbird specialist of cloud forest environments, known for its distinctive curved bill and green plumage.",
    image: "/images/green-hermit-hummingbird.jpg",
    conservationStatus: "Least Concern",
    bestTime: "Year-round",
    difficulty: "Easy",
    ebirdCode: "greher1",
  },
]

interface EnhancedEndemicBirdsCarouselProps {
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
}

export default function EnhancedEndemicBirdsCarousel({
  className,
  autoPlay = false,
  autoPlayInterval = 5000,
}: EnhancedEndemicBirdsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [showInfo, setShowInfo] = useState(false)
  const [audioPlaying, setAudioPlaying] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % birdData.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + birdData.length) % birdData.length)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

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

  const playAudio = (audioFile: string, birdId: string) => {
    if (audioPlaying === birdId) {
      setAudioPlaying(null)
      return
    }

    const audio = new Audio(audioFile)
    audio.volume = isMuted ? 0 : 0.7
    audio.play()
    setAudioPlaying(birdId)

    audio.onended = () => {
      setAudioPlaying(null)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Endemic":
        return "bg-red-100 text-red-800"
      case "Near Endemic":
        return "bg-orange-100 text-orange-800"
      case "Spectacular":
        return "bg-purple-100 text-purple-800"
      case "Common Favorite":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Moderate":
        return "bg-yellow-100 text-yellow-800"
      case "Challenging":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const currentBird = birdData[currentIndex]

  return (
    <div className={cn("relative w-full", className)}>
      <Card className="overflow-hidden border-0 shadow-2xl">
        <div className="relative">
          {/* Main Image */}
          <div className="aspect-[4/3] relative overflow-hidden">
            <img
              src={currentBird.image || "/placeholder.svg"}
              alt={currentBird.commonName}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Navigation Arrows */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0"
              onClick={nextSlide}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>

            {/* Control Buttons */}
            <div className="absolute top-2 right-2 flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 w-8 h-8 p-0"
                onClick={togglePlayPause}
              >
                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 w-8 h-8 p-0"
                onClick={toggleInfo}
              >
                <Info className="w-3 h-3" />
              </Button>

              {currentBird.audioFile && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 w-8 h-8 p-0"
                    onClick={() => playAudio(currentBird.audioFile!, currentBird.id)}
                  >
                    <Volume2 className={cn("w-3 h-3", audioPlaying === currentBird.id && "text-green-400")} />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 w-8 h-8 p-0"
                    onClick={toggleMute}
                  >
                    {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                  </Button>
                </>
              )}
            </div>

            {/* Status and Difficulty Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              <Badge className={cn("text-xs font-medium", getStatusColor(currentBird.status))}>
                {currentBird.status}
              </Badge>
              <Badge className={cn("text-xs font-medium", getDifficultyColor(currentBird.difficulty))}>
                {currentBird.difficulty}
              </Badge>
            </div>

            {/* Bird Information Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="space-y-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold">{currentBird.commonName}</h3>
                  <p className="text-sm italic opacity-90">{currentBird.scientificName}</p>
                  <p className="text-xs opacity-75">{currentBird.spanishName}</p>
                </div>

                {showInfo && (
                  <div className="space-y-2 bg-black/40 backdrop-blur-sm rounded-lg p-3 mt-2">
                    <p className="text-sm leading-relaxed">{currentBird.description}</p>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{currentBird.region}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Camera className="w-3 h-3" />
                        <span>{currentBird.bestTime}</span>
                      </div>
                    </div>

                    <div className="text-xs opacity-75">
                      <span className="font-medium">Habitat:</span> {currentBird.habitat}
                    </div>

                    <div className="text-xs opacity-75">
                      <span className="font-medium">Conservation:</span> {currentBird.conservationStatus}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <CardContent className="p-3">
          <div className="flex gap-2 overflow-x-auto">
            {birdData.map((bird, index) => (
              <button
                key={bird.id}
                onClick={() => goToSlide(index)}
                className={cn(
                  "flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-all",
                  index === currentIndex
                    ? "border-emerald-500 ring-2 ring-emerald-200"
                    : "border-gray-200 hover:border-gray-300",
                )}
              >
                <img
                  src={bird.image || "/placeholder.svg"}
                  alt={bird.commonName}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-1 mt-3">
            {birdData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === currentIndex ? "bg-emerald-500" : "bg-gray-300 hover:bg-gray-400",
                )}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
