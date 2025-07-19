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
      reserve: "Parque Natural Del Sumapaz",
      reserveLink: "/about/partners#parque-natural-del-sumapaz",
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
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bbmtou1-2FO9udCERF00OCxv3mOYD7NSsuBka4.mp3",
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
      photographer: "Martin Melendro",
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
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/higmot1-eVTxTFPesSMAvyUuvDpYGmBUOvhIou.mp3",
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
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vercar1-WoATFgG9uKl13LGTrEjhszPdrlkyqU.mp3",
    photoCredit: {
      photographer: "Royann",
      title: "Wildlife Photographer",
      reserve: "La Guajira",
      reserveLink: "/about/partners#la-guajira",
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
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vepcor1-SUWzqmkywsyiGwsIZnfR6EeBx65w9e.mp3",
    photoCredit: {
      photographer: "Martin Melendro",
      title: "AVES Lead Guide & Founder",
      teamLink: "/team#martin-melendro",
      reserve: "Jardín de Rocas",
      reserveLink: "/about/partners#jardin-de-rocas",
    },
  },
  {
    id: "8",
    commonName: "Golden-headed Manakin",
    scientificName: "Ceratopipra erythrocephala",
    spanishName: "Saltarín Cabecidorado",
    primaryRegion: "Cauca River Region",
    secondaryRegions: ["Western Andes", "Central Andes"],
    ecoregions: ["Tropical rainforest", "Forest understory", "Secondary growth", "Forest edges"],
    regionSlug: "cauca-river",
    status: "Spectacular",
    difficulty: "Easy",
    habitat: "Understory of humid tropical forests and forest edges",
    bestTime: "Year-round (most active early morning)",
    elevation: "200 - 1,500m",
    image: "/images/gohman1.jpg",
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gohman1-sOmUeeC5xVszFJSmeZ66Try02jkzGB.mp3",
    photoCredit: {
      photographer: "Martin Melendro",
      title: "AVES Lead Guide & Founder",
      teamLink: "/team#martin-melendro",
      reserve: "Refugio La Esmeralda",
      reserveLink: "/about/partners#refugio-la-esmeralda",
    },
  },
  {
    id: "9",
    commonName: "Striped Manakin",
    scientificName: "Machaeropterus regulus",
    spanishName: "Saltarín Rayado",
    primaryRegion: "Cauca River Region",
    secondaryRegions: ["Western Andes", "Central Andes"],
    ecoregions: ["Tropical rainforest", "Forest understory", "Secondary growth", "Forest edges"],
    regionSlug: "cauca-river",
    status: "Spectacular",
    difficulty: "Moderate",
    habitat: "Understory of humid tropical forests and forest edges",
    bestTime: "Year-round (most active early morning)",
    elevation: "200 - 1,800m",
    image: "/images/strman5.jpg",
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/strman5-M7ePaDFfvKHcN4hSew56PkYN1C7B8N.mp3",
    photoCredit: {
      photographer: "Royann",
      title: "Wildlife Photographer",
      reserve: "Refugio La Esmeralda",
      reserveLink: "/about/partners#refugio-la-esmeralda",
    },
  },
  {
    id: "10",
    commonName: "Scaled Dove",
    scientificName: "Columbina squammata",
    spanishName: "Tortolita Escamosa",
    primaryRegion: "Caribbean Coast",
    secondaryRegions: ["Magdalena Valley"],
    ecoregions: ["Dry tropical forest", "Thorny scrubland", "Arid lowlands", "Desert edges"],
    regionSlug: "caribbean",
    status: "Spectacular",
    difficulty: "Easy",
    habitat: "Dry scrublands, thorny forests, and arid lowlands",
    bestTime: "Year-round (most active early morning and late afternoon)",
    elevation: "0 - 1,000m",
    image: "/images/scadov1.jpg",
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/scadov1-ZY5P1ezfAmzpRMfahJV0otL1QasgoJ.mp3",
    photoCredit: {
      photographer: "Royann",
      title: "Wildlife Photographer",
      reserve: "La Guajira",
      reserveLink: "/about/partners#la-guajira",
    },
  },
  {
    id: "11",
    commonName: "Yellow-throated Toucan",
    scientificName: "Ramphastos ambiguus",
    spanishName: "Tucán de Garganta Amarilla",
    primaryRegion: "Eastern Andes",
    secondaryRegions: ["Central Andes", "Western Andes"],
    ecoregions: ["Montane cloud forest", "Forest canopy", "Secondary growth", "Forest edges"],
    regionSlug: "eastern-andes",
    status: "Spectacular",
    difficulty: "Moderate",
    habitat: "Montane cloud forests and forest edges with fruiting trees",
    bestTime: "Year-round (most active early morning)",
    elevation: "800 - 2,400m",
    image: "/images/bkmtou1.jpg",
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bkmtou1-Z7kswt5kh0hyKXzsni4zrZNFem5LY6.mp3",
    photoCredit: {
      photographer: "Royann",
      title: "Wildlife Photographer",
      reserve: "Chamicero de Perija",
      reserveLink: "/about/partners#proaves",
    },
  },
  {
    id: "12",
    commonName: "Golden-headed Quetzal",
    scientificName: "Pharomachrus auriceps",
    spanishName: "Quetzal Cabecidorado",
    primaryRegion: "Eastern Andes",
    secondaryRegions: ["Central Andes", "Western Andes"],
    ecoregions: ["Cloud forest", "Montane forest", "Forest canopy", "Secondary growth"],
    regionSlug: "eastern-andes",
    status: "Spectacular",
    difficulty: "Moderate",
    habitat: "Cloud forests and montane forests with fruiting trees",
    bestTime: "Year-round (most active early morning)",
    elevation: "1,200 - 2,800m",
    image: "/images/gohque1.jpg",
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gohman1-O2SEW0cbNWsNGuBflkixHCiSmeivLj.mp3",
    photoCredit: {
      photographer: "Royann",
      title: "Wildlife Photographer",
      reserve: "Chamicero de Perija",
      reserveLink: "/about/partners#fundacion-proaves",
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

  // Thumbnail navigation state
  const [thumbnailScrollPosition, setThumbnailScrollPosition] = useState(0)
  const thumbnailContainerRef = useRef<HTMLDivElement>(null)

  // Audio refs and management
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const loadTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const eventListenersRef = useRef<Array<{ event: string; handler: EventListener }>>([])

  const currentBird = birdData[currentIndex]

  // Check if current bird should show the Explore Region button (only Vermilion Cardinal)
  const shouldShowExploreRegion = currentBird.id === "6" // Vermilion Cardinal

  // Check if current bird should show eBird button - Updated to include Golden-headed Quetzal
  const shouldShowEBirdButton = ["8", "9", "10", "11", "12"].includes(currentBird.id) // Golden-headed Manakin, Striped Manakin, Scaled Dove, Yellow-throated Toucan, Golden-headed Quetzal

  // Get eBird URL for current bird - Updated to include Golden-headed Quetzal
  const getEBirdUrl = (birdId: string) => {
    switch (birdId) {
      case "8":
        return "https://ebird.org/species/gohman1"
      case "9":
        return "https://ebird.org/species/strman5"
      case "10":
        return "https://ebird.org/species/scadov1"
      case "11":
        return "https://ebird.org/species/bkmtou1"
      case "12":
        return "https://ebird.org/species/gohque1"
      default:
        return ""
    }
  }

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

  // Thumbnail navigation functions
  const scrollThumbnails = useCallback(
    (direction: "left" | "right") => {
      if (!thumbnailContainerRef.current) return

      const container = thumbnailContainerRef.current
      const scrollAmount = 200 // Adjust based on thumbnail size
      const newPosition =
        direction === "left"
          ? Math.max(0, thumbnailScrollPosition - scrollAmount)
          : Math.min(container.scrollWidth - container.clientWidth, thumbnailScrollPosition + scrollAmount)

      setThumbnailScrollPosition(newPosition)
      container.scrollTo({ left: newPosition, behavior: "smooth" })
    },
    [thumbnailScrollPosition],
  )

  const canScrollThumbnails = useCallback(
    (direction: "left" | "right") => {
      if (!thumbnailContainerRef.current) return false

      const container = thumbnailContainerRef.current
      if (direction === "left") {
        return thumbnailScrollPosition > 0
      } else {
        return thumbnailScrollPosition < container.scrollWidth - container.clientWidth
      }
    },
    [thumbnailScrollPosition],
  )

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

  // Enhanced image positioning for perfect square framing with focus on bird's eye and wing - Updated to include Golden-headed Quetzal
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
      case "8": // Golden-headed Manakin
        return {
          objectPosition: "center 30%",
          transform: "scale(1.2)",
        }
      case "9": // Striped Manakin
        return {
          objectPosition: "center 35%",
          transform: "scale(1.15)",
        }
      case "10": // Scaled Dove
        return {
          objectPosition: "center 40%",
          transform: "scale(1.1)",
        }
      case "11": // Yellow-throated Toucan
        return {
          objectPosition: "center 30%",
          transform: "scale(1.1)",
        }
      case "12": // Golden-headed Quetzal
        return {
          objectPosition: "center 25%",
          transform: "scale(1.15)",
        }
      default:
        return {
          objectPosition: "center center",
          transform: "scale(1.1)",
        }
    }
  }

  const currentImagePositioning = getImagePositioning(currentBird.id)

  // Updated region colors to match Aves Explorer map exactly
  const getPrimaryRegionColor = (region: string) => {
    switch (region) {
      case "Pacific":
      case "Pacific Coast":
        return "bg-[#228B22]/90 text-white border-[#228B22]/50"
      case "Western Andes":
        return "bg-[#8B4513]/90 text-white border-[#8B4513]/50"
      case "Central Andes":
        return "bg-[#A0522D]/90 text-white border-[#A0522D]/50"
      case "Eastern Andes":
        return "bg-[#CD853F]/90 text-white border-[#CD853F]/50"
      case "Cauca Valley":
        return "bg-[#4169E1]/90 text-white border-[#4169E1]/50"
      case "Magdalena Valley":
        return "bg-[#1E90FF]/90 text-white border-[#1E90FF]/50"
      case "Caribbean":
      case "Caribbean Coast":
        return "bg-[#FF8C00]/90 text-white border-[#FF8C00]/50"
      case "SNSM":
      case "Sierra Nevada de Santa Marta":
        return "bg-[#D2691E]/90 text-white border-[#D2691E]/50"
      case "Llanos":
        return "bg-[#FFD700]/90 text-white border-[#FFD700]/50"
      case "Amazonia":
        return "bg-[#32CD32]/90 text-white border-[#32CD32]/50"
      case "Massif":
      case "Colombian Massif":
        return "bg-[#DEB887]/90 text-white border-[#DEB887]/50"
      case "Cauca River Region":
        return "bg-[#4169E2]/90 text-white border-[#4169E2]/50"
      default:
        return "bg-gray-600/90 text-white border-gray-500/50"
    }
  }

  // Updated region text colors to match Aves Explorer map exactly
  const getRegionTextColor = (region: string) => {
    switch (region) {
      case "Pacific":
      case "Pacific Coast":
        return {
          base: "text-[#228B22]",
          hover: "hover:text-[#1F7A1F]",
        }
      case "Western Andes":
        return {
          base: "text-[#8B4513]",
          hover: "hover:text-[#7A3E11]",
        }
      case "Central Andes":
        return {
          base: "text-[#A0522D]",
          hover: "hover:text-[#8F4928]",
        }
      case "Eastern Andes":
        return {
          base: "text-[#CD853F]",
          hover: "hover:text-[#B8763A]",
        }
      case "Cauca Valley":
        return {
          base: "text-[#4169E1]",
          hover: "hover:text-[#3A5FCA]",
        }
      case "Magdalena Valley":
        return {
          base: "text-[#1E90FF]",
          hover: "hover:text-[#1C82E6]",
        }
      case "Caribbean":
      case "Caribbean Coast":
        return {
          base: "text-[#FF8C00]",
          hover: "hover:text-[#E67E00]",
        }
      case "SNSM":
      case "Sierra Nevada de Santa Marta":
        return {
          base: "text-[#D2691E]",
          hover: "hover:text-[#BD5F1B]",
        }
      case "Llanos":
        return {
          base: "text-[#FFD700]",
          hover: "hover:text-[#E6C200]",
        }
      case "Amazonia":
        return {
          base: "text-[#32CD32]",
          hover: "hover:text-[#2DB82D]",
        }
      case "Massif":
      case "Colombian Massif":
        return {
          base: "text-[#DEB887]",
          hover: "hover:text-[#C8A679]",
        }
      case "Cauca River Region":
        return {
          base: "text-[#4169E2]",
          hover: "hover:text-[#3A5FCA]",
        }
      default:
        return {
          base: "text-emerald-300",
          hover: "hover:text-emerald-200",
        }
    }
  }

  // Function to determine if current bird has light background that needs enhanced button visibility
  const hasLightBackground = (birdId: string) => {
    // Birds with white/light backgrounds that need enhanced button visibility
    return birdId === "3" || birdId === "1" || birdId === "10" || birdId === "11" // Black-billed Mountain-Toucan, Green-bearded Helmetcrest, Scaled Dove, and Yellow-throated Toucan
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

  // Get the current bird's region colors for photo credit
  const regionColors = getRegionTextColor(currentBird.primaryRegion)

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

                    {/* Information Grid */}
                    <div className="space-y-4 text-sm">
                      {/* Primary Region */}
                      <div>
                        <h4 className="font-semibold text-emerald-300 mb-1">Primary Region</h4>
                        <p className="text-gray-300 leading-relaxed">{currentBird.primaryRegion}</p>
                      </div>

                      {/* Secondary Regions */}
                      {currentBird.secondaryRegions.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-emerald-300 mb-1">Also Found In</h4>
                          <p className="text-gray-300 leading-relaxed">{currentBird.secondaryRegions.join(", ")}</p>
                        </div>
                      )}

                      {/* Habitat */}
                      <div>
                        <h4 className="font-semibold text-emerald-300 mb-1">Habitat</h4>
                        <p className="text-gray-300 leading-relaxed">{currentBird.habitat}</p>
                      </div>

                      {/* Elevation */}
                      <div>
                        <h4 className="font-semibold text-emerald-300 mb-1">Elevation</h4>
                        <p className="text-gray-300 leading-relaxed">{currentBird.elevation}</p>
                      </div>

                      {/* Best Time */}
                      <div>
                        <h4 className="font-semibold text-emerald-300 mb-1">Best Time to Visit</h4>
                        <p className="text-gray-300 leading-relaxed">{currentBird.bestTime}</p>
                      </div>

                      {/* Ecoregions */}
                      <div>
                        <h4 className="font-semibold text-emerald-300 mb-2">Ecoregions</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {currentBird.ecoregions.map((ecoregion, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs bg-emerald-900/30 text-emerald-200 border-emerald-700/50 hover:bg-emerald-800/40 transition-colors"
                            >
                              {ecoregion}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 space-y-3">
                      {/* Conditional Explore Region Button - Only for Vermilion Cardinal */}
                      {shouldShowExploreRegion && (
                        <Link href={`/regions/${currentBird.regionSlug}`} className="block">
                          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white border-0 shadow-lg transition-all duration-200 hover:scale-[1.02]">
                            <MapPin className="w-4 h-4 mr-2" />
                            Explore {currentBird.primaryRegion}
                          </Button>
                        </Link>
                      )}

                      {/* Conditional eBird Button - Updated to include Golden-headed Quetzal */}
                      {shouldShowEBirdButton && (
                        <a
                          href={getEBirdUrl(currentBird.id)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg transition-all duration-200 hover:scale-[1.02]">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View on eBird
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Photo Credit Panel - Version 1 Style: Compact Popup */}
            {showPhotoCredit && !showInfo && (
              <div className="absolute top-16 right-3 z-60">
                <div className="bg-black/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg text-sm shadow-xl transition-all duration-300 animate-in slide-in-from-top-2 min-w-[200px] max-w-[280px] border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 flex-shrink-0" />
                      <span className="font-medium text-xs">Photo Credit</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-5 h-5 p-0 rounded-full hover:bg-white/20 text-white border-0 flex-shrink-0"
                      onClick={() => setShowPhotoCredit(false)}
                      aria-label="Close photo credit"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {/* Photographer */}
                    <div>
                      <span className="text-white/60 text-xs block">Photographer:</span>
                      <div className="text-white text-sm font-medium">
                        {currentBird.photoCredit.teamLink ? (
                          <Link
                            href={currentBird.photoCredit.teamLink}
                            className={cn(
                              "transition-colors underline decoration-dotted underline-offset-2",
                              regionColors.base,
                              regionColors.hover,
                            )}
                          >
                            {currentBird.photoCredit.photographer}
                          </Link>
                        ) : (
                          currentBird.photoCredit.photographer
                        )}
                      </div>
                      {currentBird.photoCredit.title && (
                        <div className="text-white/70 text-xs">{currentBird.photoCredit.title}</div>
                      )}
                    </div>

                    {/* Location */}
                    {currentBird.photoCredit.reserve && (
                      <div>
                        <span className="text-white/60 text-xs block">Location:</span>
                        <div className="text-white/90 text-sm">
                          {currentBird.photoCredit.reserveLink ? (
                            <Link
                              href={currentBird.photoCredit.reserveLink}
                              className={cn(
                                "transition-colors underline decoration-dotted underline-offset-2",
                                regionColors.base,
                                regionColors.hover,
                              )}
                            >
                              {currentBird.photoCredit.reserve}
                            </Link>
                          ) : (
                            currentBird.photoCredit.reserve
                          )}
                        </div>
                      </div>
                    )}

                    {/* Instagram Link */}
                    {currentBird.photoCredit.instagramPost && (
                      <div className="pt-2 border-t border-white/10">
                        <a
                          href={currentBird.photoCredit.instagramPost}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "inline-flex items-center gap-1.5 text-xs transition-colors",
                            regionColors.base,
                            regionColors.hover,
                          )}
                        >
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                          <span>View on Instagram</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Thumbnail Navigation with Scroll Controls */}
          <div className="relative bg-gradient-to-r from-emerald-50 to-blue-50 border-t border-emerald-100">
            {/* Scroll Left Button */}
            {canScrollThumbnails("left") && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 p-0 rounded-full bg-white/80 hover:bg-white shadow-md border border-emerald-200"
                onClick={() => scrollThumbnails("left")}
                aria-label="Scroll thumbnails left"
              >
                <ChevronLeft className="w-4 h-4 text-emerald-700" />
              </Button>
            )}

            {/* Scroll Right Button */}
            {canScrollThumbnails("right") && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 p-0 rounded-full bg-white/80 hover:bg-white shadow-md border border-emerald-200"
                onClick={() => scrollThumbnails("right")}
                aria-label="Scroll thumbnails right"
              >
                <ChevronRight className="w-4 h-4 text-emerald-700" />
              </Button>
            )}

            {/* Thumbnail Container */}
            <div
              ref={thumbnailContainerRef}
              className="flex gap-2 p-3 overflow-x-auto scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {birdData.map((bird, index) => (
                <button
                  key={bird.id}
                  className={cn(
                    "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105",
                    index === currentIndex
                      ? "border-emerald-500 ring-2 ring-emerald-200 shadow-lg"
                      : "border-gray-200 hover:border-emerald-300 shadow-sm",
                  )}
                  onClick={() => goToSlide(index)}
                  aria-label={`View ${bird.commonName}`}
                >
                  <Image
                    src={bird.image || "/placeholder.svg"}
                    alt={bird.commonName}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: getImagePositioning(bird.id).objectPosition,
                      transform: "scale(1.1)",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
