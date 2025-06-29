"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Volume1,
  Info,
  Camera,
  MapPin,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface BirdData {
  id: string
  commonName: string
  scientificName: string
  spanishName: string
  bioregion: string
  bioregionSlug: string
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

// Eleven birds representing Colombia's bioregions
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
    bioregion: "Colombian Massif",
    bioregionSlug: "colombian-massif",
    family: "Trochilidae",
    order: "Apodiformes",
    status: "Endemic",
    habitat: "High-altitude páramo and volcanic slopes",
    description:
      "A spectacular endemic hummingbird with iridescent rainbow plumage on its throat and distinctive white leg puffs.",
    image: "/images/rainbow-bearded-thornbill.jpg",
    audioFile: "/audio/rabtho1.mp3",
    conservationStatus: "Near Threatened",
    bestTime: "December - March",
    difficulty: "Challenging",
    ebirdCode: "rabtho1",
    bioregionDescription: "High-altitude volcanic region where the Andes divide into three ranges.",
  },
  {
    id: "3",
    commonName: "Chestnut-crowned Antpitta",
    scientificName: "Grallaria ruficapilla",
    spanishName: "Tororoi Coronirrufo",
    bioregion: "Central Andes",
    bioregionSlug: "central-andes",
    family: "Grallariidae",
    order: "Passeriformes",
    status: "Endemic",
    habitat: "Cloud forest understory",
    description:
      "An elusive ground-dwelling bird known for its distinctive chestnut crown and secretive nature in dense cloud forests.",
    image: "/images/chestnut-crowned-antpitta.jpg",
    audioFile: "/audio/chcant2.mp3",
    conservationStatus: "Least Concern",
    bestTime: "Year-round",
    difficulty: "Moderate",
    ebirdCode: "chcant2",
    bioregionDescription: "Coffee region with cloud forests and high-altitude páramo ecosystems.",
  },
  {
    id: "4",
    commonName: "Blue-crowned Motmot",
    scientificName: "Momotus coeruliceps",
    spanishName: "Momoto Coroniazul",
    bioregion: "Western Andes",
    bioregionSlug: "western-andes",
    family: "Momotidae",
    order: "Coraciiformes",
    status: "Near Endemic",
    habitat: "Humid lowland and montane forests",
    description:
      "A stunning bird with a brilliant blue crown and distinctive racket-tipped tail, often seen perched motionlessly.",
    image: "/images/blue-crowned-motmot-new.jpg",
    audioFile: "/audio/blcmot1.mp3",
    conservationStatus: "Least Concern",
    bestTime: "Year-round",
    difficulty: "Easy",
    ebirdCode: "blcmot1",
    bioregionDescription: "Cloud forests and montane ecosystems with incredible hummingbird diversity.",
  },
  {
    id: "5",
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
    commonName: "Flamingo",
    scientificName: "Phoenicopterus ruber",
    spanishName: "Flamenco del Caribe",
    bioregion: "Caribbean Coast",
    bioregionSlug: "caribbean-coast",
    family: "Phoenicopteridae",
    order: "Phoenicopteriformes",
    status: "Regional Specialty",
    habitat: "Coastal lagoons, salt flats, and mangroves",
    description: "Iconic pink wading bird of Colombia's Caribbean coast, found in large flocks in coastal wetlands.",
    image: "/images/flamingo-caribbean.jpg",
    audioFile: "/audio/amefla.mp3",
    conservationStatus: "Least Concern",
    bestTime: "December - April",
    difficulty: "Easy",
    ebirdCode: "amefla",
    bioregionDescription: "Coastal wetlands, mangroves, and dry forests with unique Caribbean species.",
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
  const [audioPlaying, setAudioPlaying] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.6) // Default volume at 60%
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [userInteracted, setUserInteracted] = useState(false)
  const [audioError, setAudioError] = useState<string | null>(null)
  const [audioLoaded, setAudioLoaded] = useState<Set<string>>(new Set())
  const [componentMounted, setComponentMounted] = useState(false)
  const [initialAutoplayAttempted, setInitialAutoplayAttempted] = useState(false)
  const [pageFullyLoaded, setPageFullyLoaded] = useState(false)
  const volumeSliderRef = useRef<HTMLDivElement>(null)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bioregionBirds.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + bioregionBirds.length) % bioregionBirds.length)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
    setUserInteracted(true)
  }, [])

  // Function to get the appropriate volume icon based on volume level
  const getVolumeIcon = useCallback(() => {
    if (isMuted || volume === 0) return VolumeX
    if (volume < 0.5) return Volume1
    return Volume2
  }, [isMuted, volume])

  // Function to update audio volume
  const updateAudioVolume = useCallback((newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }, [])

  // Function to attempt initial autoplay on page load
  const attemptInitialAutoplay = useCallback(() => {
    if (initialAutoplayAttempted || isMuted || currentIndex !== 0 || !pageFullyLoaded) return

    const firstBird = bioregionBirds[0] // Green-bearded Helmetcrest
    if (!firstBird.audioFile) return

    setInitialAutoplayAttempted(true)

    // Stop any existing audio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    const audio = new Audio(firstBird.audioFile)
    audio.volume = volume
    audio.preload = "auto"
    audioRef.current = audio

    // Handle successful audio loading
    audio.onloadeddata = () => {
      setAudioLoaded((prev) => new Set(prev).add(firstBird.id))
      setAudioError(null)
    }

    // Handle audio errors
    audio.onerror = (e) => {
      console.log(`Initial autoplay audio error for ${firstBird.commonName}:`, e)
      setAudioError(null) // Don't show error for initial autoplay
      setAudioPlaying(null)
      audioRef.current = null
    }

    // Attempt to play immediately on page load
    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Audio started playing successfully
          setAudioPlaying(firstBird.id)
          setAudioError(null)
          console.log("✅ Initial autoplay successful for Green-bearded Helmetcrest")
        })
        .catch((error) => {
          console.log("⚠️ Initial autoplay prevented by browser:", error)
          // Don't show error for autoplay prevention on initial load
          setAudioPlaying(null)
          setAudioError(null)
        })
    }

    // Handle audio ending
    audio.onended = () => {
      setAudioPlaying(null)
      audioRef.current = null
      setAudioError(null)
    }
  }, [initialAutoplayAttempted, isMuted, currentIndex, pageFullyLoaded, volume])

  // Stop current audio and play new audio for the current slide
  const playCurrentSlideAudio = useCallback(() => {
    // Skip if muted, or if this is the initial load (handled separately)
    if (isMuted || (!userInteracted && currentIndex === 0 && !initialAutoplayAttempted)) return

    const currentBird = bioregionBirds[currentIndex]

    // Stop any currently playing audio immediately
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }

    // Clear any previous audio errors
    setAudioError(null)
    setAudioPlaying(null)

    // Play audio for current bird if available
    if (currentBird.audioFile) {
      const audio = new Audio(currentBird.audioFile)
      audio.volume = volume
      audio.preload = "auto"
      audioRef.current = audio

      // Handle successful audio loading
      audio.onloadeddata = () => {
        setAudioLoaded((prev) => new Set(prev).add(currentBird.id))
        setAudioError(null)
      }

      // Handle audio errors
      audio.onerror = (e) => {
        console.log(`Audio file error for ${currentBird.commonName}:`, e)
        setAudioError(`Audio not available for ${currentBird.commonName}`)
        setAudioPlaying(null)
        audioRef.current = null
      }

      // Attempt to play the audio
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Audio started playing successfully
            setAudioPlaying(currentBird.id)
            setAudioError(null)
          })
          .catch((error) => {
            console.log("Audio autoplay prevented or failed:", error)
            // Don't show error for autoplay prevention, just log it
            if (error.name !== "NotAllowedError") {
              setAudioError(`Audio not available for ${currentBird.commonName}`)
            }
            setAudioPlaying(null)
          })
      }

      // Handle audio ending
      audio.onended = () => {
        setAudioPlaying(null)
        audioRef.current = null
        setAudioError(null)
      }
    }
  }, [currentIndex, isMuted, userInteracted, initialAutoplayAttempted, volume])

  // Effect to handle component mounting and page load detection
  useEffect(() => {
    setComponentMounted(true)

    // Check if page is already loaded
    if (document.readyState === "complete") {
      setPageFullyLoaded(true)
    } else {
      // Listen for page load completion
      const handleLoad = () => {
        setPageFullyLoaded(true)
      }

      window.addEventListener("load", handleLoad)

      // Fallback timeout in case load event doesn't fire
      const fallbackTimer = setTimeout(() => {
        setPageFullyLoaded(true)
      }, 2000)

      return () => {
        window.removeEventListener("load", handleLoad)
        clearTimeout(fallbackTimer)
      }
    }
  }, [])

  // Effect to handle clicks outside volume slider
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (volumeSliderRef.current && !volumeSliderRef.current.contains(event.target as Node)) {
        setShowVolumeSlider(false)
      }
    }

    if (showVolumeSlider) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showVolumeSlider])

  // Effect to attempt initial autoplay when page is fully loaded
  useEffect(() => {
    if (pageFullyLoaded && componentMounted && !initialAutoplayAttempted) {
      // Small delay to ensure everything is settled
      const autoplayTimer = setTimeout(() => {
        attemptInitialAutoplay()
      }, 300)

      return () => clearTimeout(autoplayTimer)
    }
  }, [pageFullyLoaded, componentMounted, initialAutoplayAttempted, attemptInitialAutoplay])

  // Effect to handle automatic audio playback when slide changes (but not on initial load)
  useEffect(() => {
    if (!componentMounted) return

    // Small delay to ensure smooth transitions
    const timer = setTimeout(() => {
      playCurrentSlideAudio()
    }, 100)

    return () => clearTimeout(timer)
  }, [currentIndex, playCurrentSlideAudio, componentMounted])

  // Effect to update audio volume when volume state changes
  useEffect(() => {
    updateAudioVolume(volume)
  }, [volume, updateAudioVolume])

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(nextSlide, autoPlayInterval)
      return () => clearInterval(interval)
    }
  }, [isPlaying, nextSlide, autoPlayInterval])

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    setUserInteracted(true)
  }

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

  const playAudio = (audioFile: string, birdId: string) => {
    setUserInteracted(true)

    if (isMuted) return

    // If this bird's audio is already playing, stop it
    if (audioPlaying === birdId) {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        audioRef.current = null
      }
      setAudioPlaying(null)
      setAudioError(null)
      return
    }

    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    const audio = new Audio(audioFile)
    audio.volume = volume
    audio.preload = "auto"
    audioRef.current = audio

    audio.onloadeddata = () => {
      setAudioLoaded((prev) => new Set(prev).add(birdId))
    }

    audio.onerror = (e) => {
      console.log(`Audio file error: ${audioFile}`, e)
      const bird = bioregionBirds.find((b) => b.id === birdId)
      setAudioError(`Audio not available for ${bird?.commonName || "this bird"}`)
      setAudioPlaying(null)
      audioRef.current = null
    }

    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setAudioPlaying(birdId)
          setAudioError(null)
        })
        .catch((error) => {
          console.log("Audio playback failed:", error)
          const bird = bioregionBirds.find((b) => b.id === birdId)
          setAudioError(`Audio not available for ${bird?.commonName || "this bird"}`)
          setAudioPlaying(null)
        })
    }

    audio.onended = () => {
      setAudioPlaying(null)
      audioRef.current = null
      setAudioError(null)
    }
  }

  const toggleMute = () => {
    const newMutedState = !isMuted
    setIsMuted(newMutedState)
    setUserInteracted(true)

    // If muting, stop current audio immediately
    if (newMutedState && audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
      setAudioPlaying(null)
      setAudioError(null)
    }
    // If unmuting and we're on the first slide, attempt to play the initial audio
    else if (!newMutedState && currentIndex === 0 && pageFullyLoaded) {
      setTimeout(() => {
        attemptInitialAutoplay()
      }, 100)
    }
    // If unmuting on other slides, play current slide audio
    else if (!newMutedState && userInteracted) {
      setTimeout(() => {
        playCurrentSlideAudio()
      }, 100)
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    setUserInteracted(true)

    // If volume is set to 0, mute; if volume > 0 and was muted, unmute
    if (newVolume === 0 && !isMuted) {
      setIsMuted(true)
    } else if (newVolume > 0 && isMuted) {
      setIsMuted(false)
    }
  }

  const toggleVolumeSlider = () => {
    setShowVolumeSlider(!showVolumeSlider)
  }

  const handleNavigation = (direction: "next" | "prev") => {
    setUserInteracted(true)
    // Stop current audio immediately when navigating
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    setAudioPlaying(null)
    setAudioError(null)

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
  const VolumeIcon = getVolumeIcon()

  return (
    <div className={cn("relative w-full", className)}>
      <Card className="overflow-hidden border-0 shadow-2xl">
        <div className="relative">
          {/* Main Image */}
          <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
            <img
              src={currentBird.image || "/placeholder.svg?height=600&width=800&text=Bird+Image"}
              alt={`${currentBird.commonName} - ${currentBird.bioregion}`}
              className={cn(
                "w-full h-full transition-all duration-700 hover:scale-105",
                // Special handling for square images like the Green-bearded Helmetcrest
                currentBird.id === "1"
                  ? "object-contain bg-gradient-to-br from-sky-100 to-emerald-100"
                  : "object-cover",
              )}
              onLoad={() => setIsLoading(false)}
            />

            {/* Loading Indicator */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {/* Gradient Overlay - lighter for square images */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t via-transparent to-transparent",
                currentBird.id === "1" ? "from-black/40" : "from-black/70",
              )}
            />

            {/* Navigation Arrows */}
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

            {/* Control Buttons */}
            <div className="absolute top-2 right-2 flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 w-8 h-8 p-0"
                onClick={togglePlayPause}
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 w-8 h-8 p-0"
                onClick={toggleInfo}
                aria-label="Toggle information"
              >
                <Info className="w-3 h-3" />
              </Button>

              {currentBird.audioFile && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 w-8 h-8 p-0 transition-all",
                      audioPlaying === currentBird.id && "bg-green-500/30 ring-2 ring-green-400/50",
                    )}
                    onClick={() => playAudio(currentBird.audioFile!, currentBird.id)}
                    aria-label={audioPlaying === currentBird.id ? "Stop bird call" : "Play bird call"}
                  >
                    <Volume2 className={cn("w-3 h-3", audioPlaying === currentBird.id && "text-green-400")} />
                  </Button>

                  {/* Enhanced Volume Control with Slider */}
                  <div className="relative" ref={volumeSliderRef}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 w-8 h-8 p-0 transition-all",
                        isMuted && "bg-red-500/30 ring-2 ring-red-400/50",
                        showVolumeSlider && "bg-blue-500/30 ring-2 ring-blue-400/50",
                      )}
                      onClick={toggleVolumeSlider}
                      aria-label="Volume control"
                    >
                      <VolumeIcon className={cn("w-3 h-3", isMuted && "text-red-400")} />
                    </Button>

                    {/* Volume Slider Popup */}
                    {showVolumeSlider && (
                      <div className="absolute top-full right-0 mt-2 bg-black/80 backdrop-blur-sm rounded-lg p-3 min-w-[200px] z-50">
                        <div className="space-y-3">
                          {/* Volume Label */}
                          <div className="flex items-center justify-between text-white text-xs">
                            <span>Volume</span>
                            <span>{Math.round(volume * 100)}%</span>
                          </div>

                          {/* Volume Slider */}
                          <div className="relative">
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.05"
                              value={volume}
                              onChange={(e) => handleVolumeChange(Number.parseFloat(e.target.value))}
                              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer volume-slider"
                              aria-label="Volume slider"
                            />
                            <div
                              className="absolute top-0 left-0 h-2 bg-emerald-500 rounded-lg pointer-events-none"
                              style={{ width: `${volume * 100}%` }}
                            />
                          </div>

                          {/* Quick Volume Buttons */}
                          <div className="flex gap-1 justify-between">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-white hover:bg-white/20 text-xs px-2 py-1 h-6"
                              onClick={() => handleVolumeChange(0)}
                            >
                              0%
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-white hover:bg-white/20 text-xs px-2 py-1 h-6"
                              onClick={() => handleVolumeChange(0.25)}
                            >
                              25%
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-white hover:bg-white/20 text-xs px-2 py-1 h-6"
                              onClick={() => handleVolumeChange(0.5)}
                            >
                              50%
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-white hover:bg-white/20 text-xs px-2 py-1 h-6"
                              onClick={() => handleVolumeChange(0.75)}
                            >
                              75%
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-white hover:bg-white/20 text-xs px-2 py-1 h-6"
                              onClick={() => handleVolumeChange(1)}
                            >
                              100%
                            </Button>
                          </div>

                          {/* Mute Toggle */}
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full text-white border-white/30 hover:bg-white/20 bg-transparent text-xs"
                            onClick={toggleMute}
                          >
                            {isMuted ? "Unmute" : "Mute"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* eBird Link */}
              <a
                href={`https://ebird.org/species/${currentBird.ebirdCode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 w-8 h-8 p-0 rounded-md flex items-center justify-center transition-colors"
                aria-label={`View ${currentBird.commonName} on eBird`}
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Status and Difficulty Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              <Badge className={cn("text-xs font-medium border", getStatusColor(currentBird.status))}>
                {currentBird.status}
              </Badge>
              <Badge className={cn("text-xs font-medium border", getDifficultyColor(currentBird.difficulty))}>
                {currentBird.difficulty}
              </Badge>
            </div>

            {/* Audio Playing Indicator */}
            {audioPlaying === currentBird.id && !isMuted && !audioError && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2">
                <Badge className="bg-green-500/90 text-white border-green-400 animate-pulse">
                  <Volume2 className="w-3 h-3 mr-1" />
                  Playing {currentBird.commonName} Call
                </Badge>
              </div>
            )}

            {/* Initial Autoplay Welcome Indicator - Special for Green-bearded Helmetcrest */}
            {currentBird.id === "1" &&
              audioPlaying === currentBird.id &&
              !userInteracted &&
              !isMuted &&
              pageFullyLoaded && (
                <div className="absolute top-12 left-1/2 -translate-x-1/2">
                  <Badge className="bg-blue-500/90 text-white border-blue-400 animate-pulse">
                    <Volume2 className="w-3 h-3 mr-1" />🎵 Welcome to Colombia's Eastern Andes!
                  </Badge>
                </div>
              )}

            {/* Page Loading Indicator */}
            {!pageFullyLoaded && currentBird.id === "1" && (
              <div className="absolute top-12 left-1/2 -translate-x-1/2">
                <Badge className="bg-gray-500/90 text-white border-gray-400">
                  <Volume2 className="w-3 h-3 mr-1" />
                  Loading audio...
                </Badge>
              </div>
            )}

            {/* Muted Indicator */}
            {isMuted && (
              <div className="absolute top-12 left-1/2 -translate-x-1/2">
                <Badge className="bg-red-500/90 text-white border-red-400">
                  <VolumeX className="w-3 h-3 mr-1" />
                  Audio Muted
                </Badge>
              </div>
            )}

            {/* Volume Level Indicator */}
            {showVolumeSlider && !isMuted && (
              <div className="absolute top-20 left-1/2 -translate-x-1/2">
                <Badge className="bg-blue-500/90 text-white border-blue-400">
                  <VolumeIcon className="w-3 h-3 mr-1" />
                  Volume: {Math.round(volume * 100)}%
                </Badge>
              </div>
            )}

            {/* Audio Error Indicator */}
            {audioError && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2">
                <Badge className="bg-yellow-500/90 text-white border-yellow-400">
                  <VolumeX className="w-3 h-3 mr-1" />
                  Audio Unavailable
                </Badge>
              </div>
            )}

            {/* Bird Information Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-300">{currentBird.bioregion}</span>
                  {/* Audio availability indicator */}
                  {currentBird.audioFile && audioLoaded.has(currentBird.id) && (
                    <Volume2 className="w-3 h-3 text-emerald-400" />
                  )}
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold">{currentBird.commonName}</h3>
                  <p className="text-sm italic opacity-90">{currentBird.scientificName}</p>
                  <p className="text-xs opacity-75">{currentBird.spanishName}</p>
                </div>

                {showInfo && (
                  <div className="space-y-3 bg-black/40 backdrop-blur-sm rounded-lg p-3 mt-3">
                    <p className="text-sm leading-relaxed">{currentBird.description}</p>

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

                    {/* Audio controls in info panel */}
                    {currentBird.audioFile && (
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-medium">Audio:</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 px-2 text-xs border-white/30 text-white hover:bg-white/20 bg-transparent"
                          onClick={() => playAudio(currentBird.audioFile!, currentBird.id)}
                        >
                          {audioPlaying === currentBird.id ? "Stop Call" : "Play Call"}
                        </Button>
                        <span className="text-emerald-300">Vol: {Math.round(volume * 100)}%</span>
                        {currentBird.id === "1" && !userInteracted && pageFullyLoaded && (
                          <span className="text-emerald-300">(Auto-playing on load)</span>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2 mt-3">
                      <Link href={`/bioregions/${currentBird.bioregionSlug}`}>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-xs">
                          Explore {currentBird.bioregion}
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
                          Plan Your Trip
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <CardContent className="p-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {bioregionBirds.map((bird, index) => (
              <button
                key={bird.id}
                onClick={() => goToSlide(index)}
                className={cn(
                  "flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-all relative",
                  index === currentIndex
                    ? "border-emerald-500 ring-2 ring-emerald-200"
                    : "border-gray-200 hover:border-gray-300",
                )}
                aria-label={`View ${bird.commonName} from ${bird.bioregion}`}
              >
                <img
                  src={bird.image || "/placeholder.svg?height=48&width=64&text=Bird"}
                  alt={bird.commonName}
                  className={cn(
                    "w-full h-full transition-all",
                    bird.id === "1" ? "object-contain bg-gradient-to-br from-sky-50 to-emerald-50" : "object-cover",
                  )}
                />
                {index === currentIndex && <div className="absolute inset-0 bg-emerald-500/20" />}

                {/* Audio indicator for thumbnails */}
                {audioPlaying === bird.id && !isMuted && bird.audioFile && !audioError && (
                  <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                )}

                {/* Audio available indicator */}
                {bird.audioFile && audioLoaded.has(bird.id) && (
                  <div className="absolute top-0 left-0 w-2 h-2 bg-blue-500 rounded-full" />
                )}

                {/* Initial autoplay indicator for first bird */}
                {bird.id === "1" && audioPlaying === bird.id && !userInteracted && pageFullyLoaded && (
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                )}

                {/* Volume level indicator */}
                {index === currentIndex && !isMuted && volume > 0 && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-black/60">
                    <div className="h-full bg-emerald-400 transition-all" style={{ width: `${volume * 100}%` }} />
                  </div>
                )}

                {/* Bioregion indicator */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-1 py-0.5 truncate">
                  {bird.bioregion.split(" ")[0]}
                </div>
              </button>
            ))}
          </div>

          {/* Progress Indicators */}
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

          {/* Call-to-Action Section */}
          <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border border-emerald-200">
            <div className="text-center">
              <h4 className="font-semibold text-gray-900 mb-2">Ready to Explore Colombia's Bioregions?</h4>
              <p className="text-sm text-gray-600 mb-3">
                Discover the incredible diversity of Colombia's {bioregionBirds.length} unique bioregions, each with its
                own endemic species and spectacular wildlife.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
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

      {/* Custom CSS for volume slider */}
      <style jsx>{`
        .volume-slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #059669;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .volume-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #059669;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  )
}
