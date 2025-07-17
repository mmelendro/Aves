"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Info,
  Camera,
  MapPin,
  ExternalLink,
  X,
  Volume2,
  VolumeX,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

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
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gnbhel1-jW2PKUzvLWZei8669aA02TqmJyaG67.mp3",
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
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rabtho1-wSpzpHneonuPjIv0HlwJvDekyiIOFS.mp3",
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
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chcant2-Ki53m2SAfspPkf802ytalVJP6ydkP6.mp3",
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
    commonName: "Velvet-purple Coronet",
    scientificName: "Boissonneaua jardini",
    spanishName: "Coronita Terciopelo Púrpura",
    primaryRegion: "Western Andes",
    secondaryRegions: ["Central Andes"],
    ecoregions: ["Cloud forest", "Montane forest", "Forest edges", "Secondary growth"],
    regionSlug: "western-andes",
    status: "Near Endemic",
    difficulty: "Easy",
    habitat: "Cloud forests and forest edges in the Western Andes",
    bestTime: "Year-round (most active early morning)",
    elevation: "1,200 - 2,400m",
    image: "/images/velvet-purple-coronet.jpg",
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
  const [isPlaying, setIsPlaying] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [showPhotoCredit, setShowPhotoCredit] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [firstImageLoaded, setFirstImageLoaded] = useState(false)
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set())

  // Enhanced audio state management for mobile compatibility
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const [audioLoading, setAudioLoading] = useState(false)
  const [audioReady, setAudioReady] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [audioFileExists, setAudioFileExists] = useState<Record<string, boolean>>({})

  // Audio refs and management
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const loadTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const eventListenersRef = useRef<Array<{ event: string; handler: EventListener }>>([])

  const currentBird = birdData[currentIndex]

  // Check if current bird should show the Explore Region button (only Vermilion Cardinal)
  const shouldShowExploreRegion = currentBird.id === "6" // Vermilion Cardinal

  // Detect mobile device on mount
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
      const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
      setIsMobile(mobileRegex.test(userAgent.toLowerCase()) || isTouchDevice)
    }

    checkMobile()
  }, [])

  // Check if audio file exists
  const checkAudioFileExists = useCallback(
    async (audioFile: string): Promise<boolean> => {
      if (audioFileExists[audioFile] !== undefined) {
        return audioFileExists[audioFile]
      }

      try {
        const response = await fetch(audioFile, { method: "HEAD" })
        const exists = response.ok
        setAudioFileExists((prev) => ({ ...prev, [audioFile]: exists }))
        return exists
      } catch (error) {
        console.warn(`Audio file check failed for ${audioFile}:`, error)
        setAudioFileExists((prev) => ({ ...prev, [audioFile]: false }))
        return false
      }
    },
    [audioFileExists],
  )

  // Initialize AudioContext for mobile browsers
  const initializeAudioContext = useCallback(async () => {
    if (!isMobile || audioContextRef.current) return true

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      if (AudioContextClass) {
        audioContextRef.current = new AudioContextClass()

        // Resume context if suspended (common on mobile)
        if (audioContextRef.current.state === "suspended") {
          await audioContextRef.current.resume()
        }

        return audioContextRef.current.state === "running"
      }
    } catch (error) {
      console.warn("AudioContext initialization failed:", error)
    }

    return false
  }, [isMobile])

  // Enhanced audio cleanup function with proper event listener removal
  const cleanupAudio = useCallback(() => {
    // Clear timeout
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current)
      loadTimeoutRef.current = null
    }

    // Clean up existing audio with proper event listener removal
    if (audioRef.current) {
      // Pause and reset audio
      audioRef.current.pause()
      audioRef.current.currentTime = 0

      // Remove all tracked event listeners
      eventListenersRef.current.forEach(({ event, handler }) => {
        audioRef.current?.removeEventListener(event, handler)
      })
      eventListenersRef.current = []

      // Only clear src after removing event listeners to prevent error events
      try {
        audioRef.current.src = ""
        audioRef.current.load()
      } catch (error) {
        // Ignore errors during cleanup
      }

      audioRef.current = null
    }

    // Reset audio states
    setIsAudioPlaying(false)
    setAudioError(false)
    setAudioLoading(false)
    setAudioReady(false)
  }, [])

  // Enhanced audio initialization with better error handling and file validation
  const initializeAudio = useCallback(async () => {
    cleanupAudio()

    if (!currentBird.audioFile) {
      return
    }

    try {
      // First check if audio file exists
      const fileExists = await checkAudioFileExists(currentBird.audioFile)
      if (!fileExists) {
        console.warn(`Audio file not found: ${currentBird.audioFile}`)
        setAudioError(true)
        setAudioLoading(false)
        setAudioReady(false)
        return
      }

      setAudioLoading(true)
      setAudioError(false)
      setAudioReady(false)

      // Initialize AudioContext for mobile
      if (isMobile) {
        await initializeAudioContext()
      }

      // Create new audio element with mobile-optimized settings
      const audio = new Audio()
      audioRef.current = audio

      // Mobile-specific audio attributes
      if (isMobile) {
        audio.setAttribute("playsinline", "true")
        audio.setAttribute("webkit-playsinline", "true")
        audio.preload = "metadata" // Better for mobile
      } else {
        audio.preload = "metadata"
      }

      audio.crossOrigin = "anonymous"
      audio.volume = volume
      audio.loop = false

      // Enhanced event listeners with better mobile handling
      const addEventListenerWithTracking = (event: string, handler: EventListener) => {
        audio.addEventListener(event, handler)
        eventListenersRef.current.push({ event, handler })
      }

      const handleLoadStart = () => {
        console.log(`Audio load started: ${currentBird.commonName}`)
        setAudioLoading(true)
        setAudioError(false)
      }

      const handleLoadedData = () => {
        console.log(`Audio data loaded: ${currentBird.commonName}`)
        setAudioLoading(false)
        setAudioReady(true)
        setAudioError(false)

        if (loadTimeoutRef.current) {
          clearTimeout(loadTimeoutRef.current)
          loadTimeoutRef.current = null
        }
      }

      const handleCanPlay = () => {
        console.log(`Audio can play: ${currentBird.commonName}`)
        setAudioLoading(false)
        setAudioReady(true)
        setAudioError(false)
      }

      const handleCanPlayThrough = () => {
        console.log(`Audio can play through: ${currentBird.commonName}`)
        setAudioLoading(false)
        setAudioReady(true)
        setAudioError(false)
      }

      const handleEnded = () => {
        console.log(`Audio ended: ${currentBird.commonName}`)
        setIsAudioPlaying(false)
      }

      const handleError = (e: Event) => {
        // Only handle errors if this is still the current audio element
        if (audioRef.current !== audio) {
          return
        }

        const error = audio.error
        let errorMessage = "Unknown audio error"

        if (error) {
          switch (error.code) {
            case MediaError.MEDIA_ERR_ABORTED:
              errorMessage = "Audio loading was aborted"
              break
            case MediaError.MEDIA_ERR_NETWORK:
              errorMessage = "Network error loading audio"
              break
            case MediaError.MEDIA_ERR_DECODE:
              errorMessage = "Audio format not supported"
              break
            case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
              errorMessage = "Audio file not found or format not supported"
              break
          }
        }

        console.error(`Audio error for ${currentBird.commonName}:`, errorMessage, error)

        // Mark file as non-existent for future reference
        if (currentBird.audioFile) {
          setAudioFileExists((prev) => ({ ...prev, [currentBird.audioFile!]: false }))
        }

        setAudioError(true)
        setIsAudioPlaying(false)
        setAudioLoading(false)
        setAudioReady(false)
      }

      const handleStalled = () => {
        console.warn(`Audio stalled: ${currentBird.commonName}`)
      }

      const handleWaiting = () => {
        console.log(`Audio waiting: ${currentBird.commonName}`)
        setAudioLoading(true)
      }

      const handlePlaying = () => {
        console.log(`Audio playing: ${currentBird.commonName}`)
        setIsAudioPlaying(true)
        setAudioLoading(false)
        setAudioError(false)
      }

      const handlePause = () => {
        console.log(`Audio paused: ${currentBird.commonName}`)
        setIsAudioPlaying(false)
      }

      // Add all event listeners with tracking
      addEventListenerWithTracking("loadstart", handleLoadStart)
      addEventListenerWithTracking("loadeddata", handleLoadedData)
      addEventListenerWithTracking("canplay", handleCanPlay)
      addEventListenerWithTracking("canplaythrough", handleCanPlayThrough)
      addEventListenerWithTracking("ended", handleEnded)
      addEventListenerWithTracking("error", handleError)
      addEventListenerWithTracking("stalled", handleStalled)
      addEventListenerWithTracking("waiting", handleWaiting)
      addEventListenerWithTracking("playing", handlePlaying)
      addEventListenerWithTracking("pause", handlePause)

      // Set timeout for loading (mobile networks can be slow)
      loadTimeoutRef.current = setTimeout(() => {
        if (audioRef.current === audio && !audioReady && !audioError) {
          console.warn(`Audio load timeout: ${currentBird.commonName}`)
          setAudioError(true)
          setAudioLoading(false)
          setAudioReady(false)
        }
      }, 10000) // 10 second timeout for mobile

      // Set the source last to trigger loading
      audio.src = currentBird.audioFile

      // For mobile devices, explicitly call load()
      if (isMobile) {
        audio.load()
      }
    } catch (error) {
      console.error(`Error initializing audio for ${currentBird.commonName}:`, error)
      setAudioError(true)
      setAudioLoading(false)
      setAudioReady(false)
    }
  }, [
    currentBird.audioFile,
    currentBird.commonName,
    volume,
    cleanupAudio,
    initializeAudioContext,
    isMobile,
    checkAudioFileExists,
  ])

  // Enhanced audio toggle with mobile-specific handling
  const toggleAudio = useCallback(async () => {
    // Mark user interaction for mobile autoplay policies
    if (!userInteracted) {
      setUserInteracted(true)
    }

    if (!audioRef.current || !currentBird.audioFile) {
      console.warn("No audio element or file available")
      return
    }

    // Check if audio file exists before attempting to play
    if (audioFileExists[currentBird.audioFile] === false) {
      console.warn("Audio file does not exist, cannot play")
      setAudioError(true)
      return
    }

    try {
      if (isAudioPlaying) {
        // Pause audio
        audioRef.current.pause()
        setIsAudioPlaying(false)
        console.log(`Audio paused: ${currentBird.commonName}`)
      } else {
        // Play audio
        if (audioError) {
          console.log("Audio error detected, reinitializing...")
          await initializeAudio()
          // Wait a bit for initialization
          await new Promise((resolve) => setTimeout(resolve, 500))
        }

        if (!audioRef.current) {
          console.warn("Audio element not available after initialization")
          return
        }

        // Ensure AudioContext is running for mobile
        if (isMobile) {
          await initializeAudioContext()
        }

        setAudioLoading(true)

        // Check if audio is ready to play
        if (audioReady || audioRef.current.readyState >= 2) {
          try {
            const playPromise = audioRef.current.play()

            if (playPromise !== undefined) {
              await playPromise
              setIsAudioPlaying(true)
              setAudioLoading(false)
              console.log(`Audio started playing: ${currentBird.commonName}`)
            }
          } catch (playError) {
            console.error(`Error playing audio for ${currentBird.commonName}:`, playError)
            setAudioError(true)
            setIsAudioPlaying(false)
            setAudioLoading(false)

            // Try to reinitialize on play error (common on mobile)
            if (isMobile) {
              setTimeout(() => initializeAudio(), 1000)
            }
          }
        } else {
          // Audio not ready, wait for it
          console.log("Audio not ready, waiting...")

          const waitForReady = () => {
            if (audioRef.current && (audioReady || audioRef.current.readyState >= 2)) {
              audioRef.current
                .play()
                .then(() => {
                  setIsAudioPlaying(true)
                  setAudioLoading(false)
                  console.log(`Audio started playing (after wait): ${currentBird.commonName}`)
                })
                .catch((error) => {
                  console.error(`Error playing audio after wait: ${currentBird.commonName}:`, error)
                  setAudioError(true)
                  setIsAudioPlaying(false)
                  setAudioLoading(false)
                })
            } else {
              // Still not ready, set error
              console.warn(`Audio still not ready: ${currentBird.commonName}`)
              setAudioError(true)
              setAudioLoading(false)
            }
          }

          // Wait up to 3 seconds for audio to be ready
          setTimeout(waitForReady, 3000)
        }
      }
    } catch (error) {
      console.error(`Error toggling audio for ${currentBird.commonName}:`, error)
      setAudioError(true)
      setIsAudioPlaying(false)
      setAudioLoading(false)
    }
  }, [
    isAudioPlaying,
    currentBird.audioFile,
    currentBird.commonName,
    audioError,
    audioReady,
    userInteracted,
    initializeAudio,
    initializeAudioContext,
    isMobile,
    audioFileExists,
  ])

  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }, [])

  // Initialize audio when bird changes
  useEffect(() => {
    initializeAudio()

    return () => {
      cleanupAudio()
    }
  }, [initializeAudio, cleanupAudio])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupAudio()
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [cleanupAudio])

  // Preload all images on component mount with proper error handling
  useEffect(() => {
    const preloadImages = async () => {
      try {
        const imagePromises = birdData.map((bird, index) => {
          return new Promise<void>((resolve) => {
            const img = new window.Image()

            const handleLoad = () => {
              setPreloadedImages((prev) => new Set(prev).add(bird.image))
              if (index === 0) {
                setFirstImageLoaded(true)
                setIsLoading(false)
                setImageLoaded(true)
                // Start autoplay only after first image is loaded
                if (autoPlay) {
                  setTimeout(() => setIsPlaying(true), 1000)
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
              resolve()
            }

            img.onload = handleLoad
            img.onerror = handleError
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

  // Enhanced slide navigation with audio completion check
  const nextSlide = useCallback(() => {
    if (firstImageLoaded || currentIndex > 0) {
      // If audio is playing, pause it before changing slides
      if (isAudioPlaying && audioRef.current) {
        audioRef.current.pause()
        setIsAudioPlaying(false)
      }

      setCurrentIndex((prevIndex) => (prevIndex + 1) % birdData.length)
      setShowInfo(false)
      setShowPhotoCredit(false)
      setShowVolumeSlider(false)

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
  }, [currentIndex, firstImageLoaded, preloadedImages, isAudioPlaying])

  const prevSlide = useCallback(() => {
    // If audio is playing, pause it before changing slides
    if (isAudioPlaying && audioRef.current) {
      audioRef.current.pause()
      setIsAudioPlaying(false)
    }

    setCurrentIndex((prevIndex) => (prevIndex - 1 + birdData.length) % birdData.length)
    setShowInfo(false)
    setShowPhotoCredit(false)
    setShowVolumeSlider(false)

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
  }, [currentIndex, preloadedImages, isAudioPlaying])

  const goToSlide = useCallback(
    (index: number) => {
      // If audio is playing, pause it before changing slides
      if (isAudioPlaying && audioRef.current) {
        audioRef.current.pause()
        setIsAudioPlaying(false)
      }

      setCurrentIndex(index)
      setShowInfo(false)
      setShowPhotoCredit(false)
      setShowVolumeSlider(false)

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
    [preloadedImages, isAudioPlaying],
  )

  // Enhanced autoplay effect that waits for audio completion
  useEffect(() => {
    if (isPlaying && firstImageLoaded) {
      // If audio is playing, wait for it to complete before advancing
      if (isAudioPlaying) {
        return // Don't set interval while audio is playing
      }

      const interval = setInterval(nextSlide, autoPlayInterval)
      return () => clearInterval(interval)
    }
  }, [isPlaying, nextSlide, autoPlayInterval, firstImageLoaded, isAudioPlaying])

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
      case "2": // Rainbow-bearded Thornbill
        return {
          objectPosition: "center 25%",
          transform: "scale(1.15)",
        }
      case "3": // Black-billed Mountain-Toucan
        return {
          objectPosition: "center 20%",
          transform: "scale(1.0)",
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
      case "7": // Velvet-purple Coronet
        return {
          objectPosition: "center 30%",
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

  // Function to determine if current bird has light background that needs enhanced button visibility
  const hasLightBackground = (birdId: string) => {
    // Birds with white/light backgrounds that need enhanced button visibility
    return birdId === "3" || birdId === "1" // Black-billed Mountain-Toucan and Green-bearded Helmetcrest
  }

  // Enhanced button styling for light background images
  const getEnhancedButtonStyle = (baseClasses: string) => {
    if (hasLightBackground(currentBird.id)) {
      return cn(
        baseClasses,
        "bg-black/40 backdrop-blur-md hover:bg-black/50 border border-white/20 shadow-xl",
        "ring-1 ring-black/10",
      )
    }
    return cn(baseClasses, "bg-white/20 backdrop-blur-sm hover:bg-white/30")
  }

  // Check if current bird has audio and it's available
  const hasAvailableAudio = currentBird.audioFile && audioFileExists[currentBird.audioFile] !== false

  return (
    <div className={cn("relative w-full max-w-md mx-auto carousel-container", className)}>
      <Card className="overflow-hidden border-0 shadow-xl">
        <div className="relative">
          {/* Main Image - Perfect Square */}
          <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-emerald-50 to-blue-50 carousel-image-container">
            {!imageError ? (
              <Image
                src={currentBird.image || "/placeholder.svg"}
                alt={`${currentBird.commonName} - ${currentBird.primaryRegion}`}
                fill
                className={cn(
                  "object-cover transition-all duration-700 ease-out carousel-slide",
                  imageLoaded ? "opacity-100" : "opacity-0",
                )}
                style={{
                  objectPosition: currentImagePositioning.objectPosition,
                  transform: currentImagePositioning.transform,
                  transformOrigin: "center center",
                }}
                onLoad={handleImageLoad}
                onError={handleImageError}
                priority={currentIndex === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
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

            {/* Enhanced Gradient Overlay for light background images */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent",
                hasLightBackground(currentBird.id) && "from-black/70 to-black/10",
              )}
            />

            {/* Navigation Arrows - Only show when info panel is closed */}
            {!showInfo && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "absolute left-2 text-white border-0 w-10 h-10 rounded-full z-40 transition-all duration-200 carousel-button shadow-lg",
                    "top-1/3 -translate-y-1/2 md:top-1/2",
                    getEnhancedButtonStyle(""),
                  )}
                  onClick={prevSlide}
                  aria-label="Previous bird"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "absolute right-2 text-white border-0 w-10 h-10 rounded-full z-40 transition-all duration-200 carousel-button shadow-lg",
                    "top-1/3 -translate-y-1/2 md:top-1/2",
                    getEnhancedButtonStyle(""),
                  )}
                  onClick={nextSlide}
                  aria-label="Next bird"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </>
            )}

            {/* Top Control Buttons - Enhanced with Audio Controls and Better Mobile Support */}
            {!showInfo && (
              <div className="absolute top-3 right-3 flex gap-2 z-50">
                {/* Audio Controls - Only show if bird has audio and it's available */}
                {hasAvailableAudio && (
                  <div className="relative flex gap-2">
                    {/* Audio Play/Pause Button with enhanced mobile feedback */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "text-white border-0 w-9 h-9 p-0 rounded-full transition-all duration-200 carousel-button shadow-lg",
                        audioError && "opacity-50 cursor-not-allowed",
                        isAudioPlaying && "ring-2 ring-emerald-400/50",
                        audioLoading && "animate-pulse",
                        getEnhancedButtonStyle(""),
                      )}
                      onClick={toggleAudio}
                      aria-label={
                        audioLoading
                          ? "Loading audio..."
                          : audioError
                            ? "Audio unavailable - tap to retry"
                            : isAudioPlaying
                              ? "Pause bird sound"
                              : "Play bird sound"
                      }
                    >
                      {audioLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : audioError ? (
                        <div className="w-4 h-4 flex items-center justify-center">
                          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                        </div>
                      ) : isAudioPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>

                    {/* Volume Control Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "text-white border-0 w-9 h-9 p-0 rounded-full transition-all duration-200 carousel-button shadow-lg",
                        audioError && "opacity-50 cursor-not-allowed",
                        showVolumeSlider && "ring-2 ring-blue-400/50",
                        getEnhancedButtonStyle(""),
                      )}
                      onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                      disabled={audioError}
                      aria-label="Volume control"
                    >
                      {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>

                    {/* Volume Slider */}
                    {showVolumeSlider && !audioError && (
                      <div className="absolute top-12 right-0 bg-black/95 backdrop-blur-sm rounded-lg p-3 shadow-xl border border-white/10 min-w-[140px] animate-in slide-in-from-top-2">
                        <div className="flex items-center gap-2">
                          <VolumeX className="w-3 h-3 text-white/70 flex-shrink-0" />
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={(e) => handleVolumeChange(Number.parseFloat(e.target.value))}
                            className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                            style={{
                              background: `linear-gradient(to right, #10b981 0%, #10b981 ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`,
                            }}
                          />
                          <Volume2 className="w-3 h-3 text-white/70 flex-shrink-0" />
                        </div>
                        <div className="text-center mt-2">
                          <span className="text-xs text-white/70">{Math.round(volume * 100)}%</span>
                        </div>
                      </div>
                    )}

                    {/* Mobile Audio Status Indicator */}
                    {isMobile && (audioLoading || audioError || !audioReady) && (
                      <div className="absolute -bottom-8 right-0 bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        {audioLoading && "Loading..."}
                        {audioError && "Error - Tap to retry"}
                        {!audioReady && !audioLoading && !audioError && "Preparing..."}
                      </div>
                    )}
                  </div>
                )}

                {/* Slideshow Control */}
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "text-white border-0 w-9 h-9 p-0 rounded-full transition-all duration-200 carousel-button shadow-lg",
                    getEnhancedButtonStyle(""),
                  )}
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                  disabled={!firstImageLoaded}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>

                {/* Photo Credit Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "text-white border-0 w-9 h-9 p-0 rounded-full transition-all duration-200 carousel-button shadow-lg",
                    getEnhancedButtonStyle(""),
                  )}
                  onClick={() => setShowPhotoCredit(!showPhotoCredit)}
                  aria-label="View photo credit"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Bird Information - Bottom with Primary Region Tag - CONDITIONALLY HIDDEN */}
            {!showInfo && (
              <div className="absolute bottom-0 left-0 right-0 text-white z-30 transition-all duration-300 ease-in-out">
                <div className="p-3 space-y-2">
                  {/* Bird Names */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold leading-tight drop-shadow-lg">{currentBird.commonName}</h3>
                    <p className="text-sm italic opacity-90 leading-tight drop-shadow-md">
                      {currentBird.scientificName}
                    </p>
                    <p className="text-xs opacity-75 leading-tight drop-shadow-md">{currentBird.spanishName}</p>
                  </div>

                  {/* Primary Region Tag and Info Button Row */}
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-sm shadow-lg",
                        getPrimaryRegionColor(currentBird.primaryRegion),
                      )}
                    >
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="whitespace-nowrap">{currentBird.primaryRegion}</span>
                    </div>

                    {/* Info Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "flex-shrink-0 w-11 h-11 p-0 rounded-full border-0 transition-all duration-300 shadow-lg text-white hover:scale-105",
                        getEnhancedButtonStyle(""),
                      )}
                      onClick={() => setShowInfo(true)}
                      aria-label="Show bird information"
                    >
                      <Info className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Species Information Panel - Enhanced Layout with Smooth Transitions */}
            {showInfo && (
              <div className="absolute inset-0 bg-black/95 backdrop-blur-md z-60 animate-in fade-in-0 duration-300">
                <div className="h-full overflow-y-auto p-6 mobile-menu-scroll">
                  {/* Close Button - Fixed position */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 w-10 h-10 p-0 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white border-0 z-70 shadow-lg transition-all duration-200 hover:scale-105"
                    onClick={() => setShowInfo(false)}
                    aria-label="Close species information"
                  >
                    <X className="w-5 h-5" />
                  </Button>

                  {/* Content with proper spacing */}
                  <div className="pt-4 pb-8 max-w-sm mx-auto">
                    {/* Header - Single source of truth for species name */}
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-emerald-300 mb-2 leading-tight pr-12">
                        {currentBird.commonName}
                      </h2>
                      <p className="text-base italic text-blue-300 mb-1 leading-tight">{currentBird.scientificName}</p>
                      <p className="text-sm text-gray-300 leading-tight">{currentBird.spanishName}</p>
                    </div>

                    {/* Status Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Badge className={cn("text-xs font-medium border shadow-sm", getStatusColor(currentBird.status))}>
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
                    </div>

                    {/* Details Grid with improved spacing */}
                    <div className="space-y-5 mb-6">
                      <div>
                        <span className="font-medium text-emerald-300 text-sm block mb-2">Habitat:</span>
                        <span className="text-white/90 text-sm leading-relaxed block">{currentBird.habitat}</span>
                      </div>
                      <div>
                        <span className="font-medium text-emerald-300 text-sm block mb-2">Best Time:</span>
                        <span className="text-white/90 text-sm leading-relaxed block">{currentBird.bestTime}</span>
                      </div>
                      <div>
                        <span className="font-medium text-emerald-300 text-sm block mb-2">Elevation:</span>
                        <span className="text-white/90 text-sm leading-relaxed block">{currentBird.elevation}</span>
                      </div>
                      <div>
                        <span className="font-medium text-emerald-300 text-sm block mb-2">Primary Region:</span>
                        <span className="text-white/90 text-sm leading-relaxed block">{currentBird.primaryRegion}</span>
                      </div>
                      {currentBird.secondaryRegions.length > 0 && (
                        <div>
                          <span className="font-medium text-blue-300 text-sm block mb-2">Also found in:</span>
                          <span className="text-white/90 text-sm leading-relaxed block">
                            {currentBird.secondaryRegions.join(", ")}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Ecoregions with improved layout */}
                    <div className="space-y-3 mb-8">
                      <span className="font-medium text-emerald-300 text-sm block">Ecoregions:</span>
                      <div className="flex flex-wrap gap-2">
                        {currentBird.ecoregions.map((ecoregion, index) => (
                          <Badge key={index} variant="secondary" className="text-xs py-1 px-2">
                            {ecoregion}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons - Enhanced for Full Functionality */}
                    <div className="flex gap-3 pt-4 border-t border-white/10">
                      <Link href="/aves-explorer" className="flex-1" prefetch={true}>
                        <Button
                          size="sm"
                          className="w-full text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white border-0 shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                        >
                          <ExternalLink className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span>Explore Species</span>
                        </Button>
                      </Link>
                      {shouldShowExploreRegion && (
                        <Link href={`/regions/${currentBird.regionSlug}`} className="flex-1" prefetch={true}>
                          <Button
                            size="sm"
                            className="w-full text-sm font-semibold bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 text-white border-0 shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation()
                            }}
                          >
                            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span>Caribbean</span>
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Photo Credit Panel - Only show when info panel is closed */}
            {showPhotoCredit && !showInfo && (
              <div className="absolute top-16 right-3 z-60">
                <div className="bg-black/95 backdrop-blur-sm text-white px-4 py-3 rounded-lg text-sm shadow-xl transition-all duration-300 animate-in slide-in-from-top-2 min-w-[220px] border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 flex-shrink-0" />
                      <span className="font-medium">Photo Credit</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-6 h-6 p-0 rounded-full hover:bg-white/20 text-white border-0"
                      onClick={() => setShowPhotoCredit(false)}
                      aria-label="Close photo credit"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-emerald-300 block">{currentBird.photoCredit.photographer}</span>
                      <span className="text-blue-300 text-sm">{currentBird.photoCredit.title}</span>
                    </div>
                    {currentBird.photoCredit.reserve && (
                      <div>
                        <span className="text-yellow-300 text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          {currentBird.photoCredit.reserve}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-3">
                    {currentBird.photoCredit.teamLink && (
                      <Link href={currentBird.photoCredit.teamLink} prefetch={true}>
                        <Button
                          size="sm"
                          className="text-xs font-medium bg-emerald-600/90 hover:bg-emerald-700 active:bg-emerald-800 text-white border-0 shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                        >
                          <ExternalLink className="w-3 h-3 mr-1 flex-shrink-0" />
                          <span>Profile</span>
                        </Button>
                      </Link>
                    )}
                    {currentBird.photoCredit.instagramPost && (
                      <a
                        href={currentBird.photoCredit.instagramPost}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <Button
                          size="sm"
                          className="text-xs font-medium bg-blue-600/90 hover:bg-blue-700 active:bg-blue-800 text-white border-0 shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                        >
                          <ExternalLink className="w-3 h-3 mr-1 flex-shrink-0" />
                          <span>Instagram</span>
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Thumbnail Navigation - Mobile-optimized spacing */}
          <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200/50 carousel-thumbnails">
            <div className="p-3 md:p-3">
              <div className="flex justify-center gap-2 mb-3 px-2 md:px-0">
                {birdData.map((bird, index) => (
                  <button
                    key={bird.id}
                    className={cn(
                      "w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 carousel-thumbnail relative",
                      index === currentIndex
                        ? "border-emerald-500 ring-2 ring-emerald-200 scale-110 shadow-lg"
                        : "border-gray-300 hover:border-gray-400 hover:scale-105 shadow-sm",
                    )}
                    onClick={() => goToSlide(index)}
                    aria-label={`View ${bird.commonName}`}
                  >
                    <Image
                      src={bird.image || "/placeholder.svg"}
                      alt={bird.commonName}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                      style={{
                        objectPosition: getImagePositioning(bird.id).objectPosition,
                        transform: "scale(1.1)",
                      }}
                      loading="lazy"
                      sizes="48px"
                    />
                    {/* Audio indicator for birds with sound - only show if audio is available */}
                    {bird.audioFile && audioFileExists[bird.audioFile] !== false && audioReady && (
                      <div className="absolute top-0.5 right-0.5 w-3 h-3 bg-emerald-500 rounded-full flex items-center justify-center">
                        <Volume2 className="w-2 h-2 text-white" />
                      </div>
                    )}
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
        </div>
      </Card>

      {/* Custom CSS for volume slider */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  )
}
