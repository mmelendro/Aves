"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Camera, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Bird {
  id: string
  name: string
  scientificName: string
  image: string
  description: string
  habitat: string
  status: string
  audioFile?: string
  hasLightBackground?: boolean
  photographer?: string
  photographerUrl?: string
}

const birds: Bird[] = [
  {
    id: "chestnut-crowned-antpitta",
    name: "Chestnut-crowned Antpitta",
    scientificName: "Grallaria ruficapilla",
    image: "/images/chestnut-crowned-antpitta.jpg",
    description: "A secretive ground-dwelling bird found in the cloud forests of the Andes.",
    habitat: "Cloud forests, 1,800-3,200m elevation",
    status: "Endemic to Colombia",
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chcant2-Ki53m2SAfspPkf802ytalVJP6ydkP6.mp3",
    photographer: "Martín Melendro Torres",
    photographerUrl: "https://www.instagram.com/martin.melendro/",
  },
  {
    id: "green-bearded-helmetcrest",
    name: "Green-bearded Helmetcrest",
    scientificName: "Oxypogon guerinii",
    image: "/images/green-bearded-helmetcrest.png",
    description: "A spectacular hummingbird endemic to the páramo of the Eastern Cordillera.",
    habitat: "Páramo, 2,800-4,200m elevation",
    status: "Endemic to Colombia",
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gnbhel1-jW2PKUzvLWZei8669aA02TqmJyaG67.mp3",
    hasLightBackground: true,
    photographer: "Martín Melendro Torres",
    photographerUrl: "https://www.instagram.com/martin.melendro/",
  },
  {
    id: "rainbow-bearded-thornbill",
    name: "Rainbow-bearded Thornbill",
    scientificName: "Chalcostigma herrani",
    image: "/images/rabtho1.jpg",
    description: "A stunning hummingbird with iridescent plumage found in high-altitude páramo.",
    habitat: "Páramo and elfin forest, 2,500-4,100m",
    status: "Endemic to Colombia",
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rabtho1-wSpzpHneonuPjIv0HlwJvDekyiIOFS.mp3",
    photographer: "Martín Melendro Torres",
    photographerUrl: "https://www.instagram.com/martin.melendro/",
  },
  {
    id: "black-billed-mountain-toucan",
    name: "Black-billed Mountain-Toucan",
    scientificName: "Andigena nigrirostris",
    image: "/images/bbmtou1-black-billed-mountain-toucan.png",
    description: "A large, colorful toucan found in the cloud forests of the Andes.",
    habitat: "Cloud forests, 1,500-3,000m elevation",
    status: "Near Endemic",
    hasLightBackground: true,
    photographer: "Martín Melendro Torres",
    photographerUrl: "https://www.instagram.com/martin.melendro/",
  },
]

interface HomepageBirdCarouselProps {
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
}

export default function HomepageBirdCarousel({
  className = "",
  autoPlay = false,
  autoPlayInterval = 5000,
}: HomepageBirdCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [audioPlaying, setAudioPlaying] = useState<string | null>(null)
  const [audioMuted, setAudioMuted] = useState(false)
  const [audioVolume, setAudioVolume] = useState(0.7)
  const [audioAutoAdvance, setAudioAutoAdvance] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const currentBird = birds[currentIndex]

  // Get adaptive button styling based on background
  const getButtonStyling = (isActive = false) => {
    if (currentBird.hasLightBackground) {
      return isActive
        ? "bg-black/60 backdrop-blur-sm hover:bg-black/70 text-white border border-white/30 shadow-xl"
        : "bg-black/40 backdrop-blur-sm hover:bg-black/50 text-white border border-white/20 shadow-xl"
    }
    return isActive
      ? "bg-white/30 backdrop-blur-sm hover:bg-white/40 text-white border-0 shadow-lg"
      : "bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 shadow-lg"
  }

  // Auto-advance functionality
  useEffect(() => {
    if (isPlaying && !audioPlaying && !audioAutoAdvance) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % birds.length)
      }, autoPlayInterval)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, audioPlaying, audioAutoAdvance, autoPlayInterval])

  // Audio management
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = audioMuted ? 0 : audioVolume
    }
  }, [audioMuted, audioVolume])

  const handlePrevious = () => {
    stopAudio()
    setAudioAutoAdvance(false)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + birds.length) % birds.length)
  }

  const handleNext = () => {
    stopAudio()
    setAudioAutoAdvance(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % birds.length)
  }

  const handleThumbnailClick = (index: number) => {
    stopAudio()
    setAudioAutoAdvance(false)
    setCurrentIndex(index)
  }

  const handleDotClick = (index: number) => {
    stopAudio()
    setAudioAutoAdvance(false)
    setCurrentIndex(index)
  }

  const toggleSlideshow = () => {
    if (audioPlaying) {
      stopAudio()
    }
    setAudioAutoAdvance(false)
    setIsPlaying(!isPlaying)
  }

  const playAudio = async () => {
    if (!currentBird.audioFile) return

    try {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }

      const audio = new Audio(currentBird.audioFile)
      audioRef.current = audio

      audio.volume = audioMuted ? 0 : audioVolume

      audio.onloadstart = () => {
        console.log("Audio loading started")
      }

      audio.oncanplaythrough = () => {
        console.log("Audio can play through")
      }

      audio.onerror = (e) => {
        console.error("Audio error:", e)
        setAudioPlaying(null)
      }

      audio.onended = () => {
        setAudioPlaying(null)
        setAudioAutoAdvance(true)

        // Auto-advance to next bird after audio completes
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % birds.length)
          setAudioAutoAdvance(false)
        }, 1000)
      }

      await audio.play()
      setAudioPlaying(currentBird.id)
      setIsPlaying(false) // Pause slideshow when audio plays
    } catch (error) {
      console.error("Error playing audio:", error)
      setAudioPlaying(null)
    }
  }

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setAudioPlaying(null)
  }

  const toggleAudio = () => {
    if (audioPlaying === currentBird.id) {
      stopAudio()
    } else {
      playAudio()
    }
  }

  const toggleMute = () => {
    setAudioMuted(!audioMuted)
  }

  return (
    <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
      <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-gray-900 to-gray-800">
        <CardContent className="p-0 relative">
          {/* Main Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={currentBird.image || "/placeholder.svg"}
              alt={currentBird.name}
              fill
              className="object-cover transition-all duration-700 ease-in-out"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Navigation Arrows */}
            <Button
              variant="ghost"
              size="icon"
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${getButtonStyling()}`}
              onClick={handlePrevious}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={`absolute right-4 top-1/2 -translate-y-1/2 ${getButtonStyling()}`}
              onClick={handleNext}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Audio Controls */}
            {currentBird.audioFile && (
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={getButtonStyling(audioPlaying === currentBird.id)}
                  onClick={toggleAudio}
                >
                  {audioPlaying === currentBird.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>

                <Button variant="ghost" size="icon" className={getButtonStyling(audioMuted)} onClick={toggleMute}>
                  {audioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
              </div>
            )}

            {/* Slideshow Control */}
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-4 left-4 ${getButtonStyling(isPlaying)}`}
              onClick={toggleSlideshow}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>

            {/* Photo Credit */}
            {currentBird.photographer && (
              <div className="absolute bottom-4 right-4">
                {currentBird.photographerUrl ? (
                  <Link
                    href={currentBird.photographerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs transition-all duration-200 ${getButtonStyling()}`}
                  >
                    <Camera className="w-3 h-3" />
                    {currentBird.photographer}
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                ) : (
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${getButtonStyling()}`}>
                    <Camera className="w-3 h-3" />
                    {currentBird.photographer}
                  </div>
                )}
              </div>
            )}

            {/* Bird Information Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-2xl font-bold">{currentBird.name}</h3>
                  <Badge variant="secondary" className="bg-emerald-600 text-white hover:bg-emerald-700">
                    {currentBird.status}
                  </Badge>
                </div>
                <p className="text-emerald-200 italic text-lg">{currentBird.scientificName}</p>
                <p className="text-gray-200 text-sm max-w-2xl">{currentBird.description}</p>
                <p className="text-gray-300 text-xs">{currentBird.habitat}</p>
              </div>
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="bg-gray-900 p-4">
            <div className="flex gap-2 justify-center overflow-x-auto">
              {birds.map((bird, index) => (
                <button
                  key={bird.id}
                  onClick={() => handleThumbnailClick(index)}
                  className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                    index === currentIndex
                      ? "ring-2 ring-emerald-400 scale-110"
                      : "opacity-70 hover:opacity-100 hover:scale-105"
                  }`}
                >
                  <Image
                    src={bird.image || "/placeholder.svg"}
                    alt={bird.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
            {birds.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
