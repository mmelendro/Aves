"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Bird,
  Search,
  Heart,
  HeartOff,
  Play,
  Pause,
  MapPin,
  Users,
  Camera,
  TreePine,
  Mountain,
  Waves,
  Star,
  Info,
  Shuffle,
  RotateCcw,
  Plus,
  Minus,
  Sparkles,
  Target,
  Route,
  Zap,
  X,
  CheckCircle,
  Music,
  Apple,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import AudioPlayer from "@/components/audio-player"

// Enhanced bird species data with audio files and detailed information
const birdSpeciesData = [
  {
    id: "gnbhel1",
    commonName: "Green-bearded Helmetcrest",
    scientificName: "Oxypogon guerinii",
    spanishName: "Colibrí Crestado Verde",
    family: "Trochilidae",
    order: "Apodiformes",
    image: "/images/green-bearded-helmetcrest.png",
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gnbhel1-jW2PKUzvLWZei8669aA02TqmJyaG67.mp3",
    primaryRegion: "Eastern Andes",
    secondaryRegions: ["Central Andes"],
    habitat: "High-altitude páramo and cloud forest edges",
    elevation: "3,000 - 4,200m",
    conservationStatus: "Near Threatened",
    difficulty: "Challenging",
    bestTime: "December - March",
    description:
      "A spectacular endemic hummingbird found only in Colombia's high-altitude páramo ecosystems. Distinguished by its distinctive green beard and crest, this species is adapted to harsh mountain conditions.",
    behaviors: ["Territorial feeding", "High-altitude hovering", "Nectar feeding"],
    dietaryPreferences: ["Nectar from páramo flowers", "Small insects", "Tree sap"],
    breedingSeason: "October - February",
    migrationPattern: "Altitudinal migrant",
    photographyTips: "Best photographed at flowering shrubs in early morning light",
    funFacts: [
      "Can survive temperatures below freezing",
      "Heart beats over 1,200 times per minute",
      "Endemic to Colombian páramo",
    ],
    tourTypes: ["Vision Tours", "Adventure Tours"],
    experienceLevel: "Advanced",
    rarity: 9,
    photographyDifficulty: 8,
    tags: ["Endemic", "Hummingbird", "High-altitude", "Páramo", "Rare"],
  },
  {
    id: "rabtho1",
    commonName: "Rainbow-bearded Thornbill",
    scientificName: "Chalcostigma herrani",
    spanishName: "Colibrí Barbudo Arcoíris",
    family: "Trochilidae",
    order: "Apodiformes",
    image: "/images/rabtho1.jpg",
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rabtho1-wSpzpHneonuPjIv0HlwJvDekyiIOFS.mp3",
    primaryRegion: "Central Andes",
    secondaryRegions: ["Eastern Andes"],
    habitat: "Páramo grasslands and volcanic slopes",
    elevation: "3,200 - 4,500m",
    conservationStatus: "Least Concern",
    difficulty: "Challenging",
    bestTime: "December - March",
    description:
      "A stunning high-altitude hummingbird with iridescent throat patches that shimmer like a rainbow. Found in Colombia's páramo ecosystems, particularly around volcanic areas.",
    behaviors: ["Aggressive territorial displays", "Rapid aerial maneuvers", "Flower defense"],
    dietaryPreferences: ["Páramo flower nectar", "Small arthropods", "Tree sap"],
    breedingSeason: "November - March",
    migrationPattern: "Resident with local movements",
    photographyTips: "Position near flowering Espeletia plants for best shots",
    funFacts: [
      "Throat colors change with viewing angle",
      "Can fly backwards and upside down",
      "Builds tiny cup nests with spider webs",
    ],
    tourTypes: ["Vision Tours", "Adventure Tours", "Elevate Tours"],
    experienceLevel: "Advanced",
    rarity: 7,
    photographyDifficulty: 8,
    tags: ["Endemic", "Hummingbird", "Colorful", "Páramo", "Photography"],
  },
  {
    id: "bbmtou1",
    commonName: "Black-billed Mountain-Toucan",
    scientificName: "Andigena nigrirostris",
    spanishName: "Tucán Andino Piquinegro",
    family: "Ramphastidae",
    order: "Piciformes",
    image: "/images/bbmtou1-square.png",
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bbmtou1-2FO9udCERF00OCxv3mOYD7NSsuBka4.mp3",
    primaryRegion: "Central Andes",
    secondaryRegions: ["Western Andes", "Eastern Andes"],
    habitat: "Montane cloud forests and forest edges",
    elevation: "1,500 - 2,800m",
    conservationStatus: "Least Concern",
    difficulty: "Moderate",
    bestTime: "Year-round",
    description:
      "A magnificent mountain toucan with a distinctive black bill and colorful plumage. These social birds are often seen in small flocks moving through the cloud forest canopy.",
    behaviors: ["Fruit foraging", "Social calling", "Canopy movement"],
    dietaryPreferences: ["Fruits", "Insects", "Small reptiles", "Bird eggs"],
    breedingSeason: "March - July",
    migrationPattern: "Resident",
    photographyTips: "Best photographed at fruiting trees in morning light",
    funFacts: [
      "Can toss food into the air and catch it",
      "Sleeps with bill tucked under wing",
      "Important seed disperser",
    ],
    tourTypes: ["Adventure Tours", "Elevate Tours", "Souls Tours"],
    experienceLevel: "Intermediate",
    rarity: 6,
    photographyDifficulty: 5,
    tags: ["Toucan", "Colorful", "Cloud forest", "Social", "Frugivore"],
  },
  {
    id: "chcant2",
    commonName: "Chestnut-crowned Antpitta",
    scientificName: "Grallaria ruficapilla",
    spanishName: "Tororoi Coronirrufo",
    family: "Grallariidae",
    order: "Passeriformes",
    image: "/images/chestnut-crowned-antpitta.jpg",
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chcant2-Ki53m2SAfspPkf802ytalVJP6ydkP6.mp3",
    primaryRegion: "Colombian Massif",
    secondaryRegions: ["Central Andes", "Western Andes"],
    habitat: "Dense cloud forest understory",
    elevation: "1,800 - 3,200m",
    conservationStatus: "Least Concern",
    difficulty: "Moderate",
    bestTime: "Year-round (dawn and dusk)",
    description:
      "A secretive ground-dwelling bird with a distinctive chestnut crown. Known for its loud, haunting calls that echo through the misty cloud forests.",
    behaviors: ["Ground foraging", "Territorial calling", "Secretive movement"],
    dietaryPreferences: ["Insects", "Worms", "Small invertebrates"],
    breedingSeason: "February - June",
    migrationPattern: "Resident",
    photographyTips: "Requires patience and playback; best at dawn",
    funFacts: ["Can remain motionless for hours", "Calls carry over 1km in forest", "Builds dome-shaped ground nests"],
    tourTypes: ["Adventure Tours", "Vision Tours"],
    experienceLevel: "Intermediate",
    rarity: 7,
    photographyDifficulty: 9,
    tags: ["Antpitta", "Secretive", "Ground-dwelling", "Cloud forest", "Elusive"],
  },
  {
    id: "vercar1",
    commonName: "Vermilion Cardinal",
    scientificName: "Cardinalis phoeniceus",
    spanishName: "Cardenal Guajiro",
    family: "Cardinalidae",
    order: "Passeriformes",
    image: "/images/cardinal-guajiro.jpg",
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vercar1-WoATFgG9uKl13LGTrEjhszPdrlkyqU.mp3",
    primaryRegion: "Caribbean Coast",
    secondaryRegions: [],
    habitat: "Dry scrublands and thorny forests",
    elevation: "0 - 800m",
    conservationStatus: "Near Threatened",
    difficulty: "Moderate",
    bestTime: "December - April",
    description:
      "A stunning endemic cardinal with brilliant red plumage found only in northern Colombia. This species is adapted to arid environments and is considered a flagship species for conservation.",
    behaviors: ["Seed cracking", "Territorial singing", "Pair bonding"],
    dietaryPreferences: ["Seeds", "Fruits", "Insects"],
    breedingSeason: "April - August",
    migrationPattern: "Resident",
    photographyTips: "Best photographed at water sources during dry season",
    funFacts: [
      "Only cardinal species in South America",
      "Males sing from prominent perches",
      "Endemic to Guajira Peninsula",
    ],
    tourTypes: ["Adventure Tours", "Souls Tours"],
    experienceLevel: "Intermediate",
    rarity: 9,
    photographyDifficulty: 6,
    tags: ["Endemic", "Cardinal", "Red", "Dry forest", "Flagship species"],
  },
  {
    id: "higmot1",
    commonName: "Andean Motmot",
    scientificName: "Momotus aequatorialis",
    spanishName: "Momoto Andino",
    family: "Momotidae",
    order: "Coraciiformes",
    image: "/images/blue-crowned-motmot-new.jpg",
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/higmot1-eVTxTFPesSMAvyUuvDpYGmBUOvhIou.mp3",
    primaryRegion: "Central Andes",
    secondaryRegions: ["Western Andes", "Eastern Andes"],
    habitat: "Subtropical forest midstory",
    elevation: "1,200 - 2,600m",
    conservationStatus: "Least Concern",
    difficulty: "Easy",
    bestTime: "Year-round",
    description:
      "A beautiful motmot with distinctive racket-tipped tail feathers and turquoise crown. These birds are known for their pendulum-like tail movements and distinctive calls.",
    behaviors: ["Tail wagging", "Sit-and-wait hunting", "Cavity nesting"],
    dietaryPreferences: ["Insects", "Small reptiles", "Fruits"],
    breedingSeason: "March - July",
    migrationPattern: "Resident",
    photographyTips: "Look for birds perched on exposed branches",
    funFacts: [
      "Tail feathers have specialized barbs that break off",
      "Excavates tunnel nests in banks",
      "Can catch prey in mid-air",
    ],
    tourTypes: ["Adventure Tours", "Elevate Tours"],
    experienceLevel: "Beginner",
    rarity: 4,
    photographyDifficulty: 3,
    tags: ["Motmot", "Colorful", "Distinctive tail", "Easy to see", "Photogenic"],
  },
  {
    id: "vepcor1",
    commonName: "Velvet-purple Coronet",
    scientificName: "Boissonneaua jardini",
    spanishName: "Coronita Terciopelo Púrpura",
    family: "Trochilidae",
    order: "Apodiformes",
    image: "/images/velvet-purple-coronet.jpg",
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vepcor1-SUWzqmkywsyiGwsIZnfR6EeBx65w9e.mp3",
    primaryRegion: "Western Andes",
    secondaryRegions: ["Central Andes"],
    habitat: "Cloud forests and forest edges",
    elevation: "1,200 - 2,400m",
    conservationStatus: "Least Concern",
    difficulty: "Easy",
    bestTime: "Year-round",
    description:
      "A large, robust hummingbird with velvety purple and green plumage. Common at cloud forest edges and gardens, making it an excellent species for beginning birders.",
    behaviors: ["Aggressive feeding", "Territorial displays", "Flower visiting"],
    dietaryPreferences: ["Nectar", "Small insects", "Tree sap"],
    breedingSeason: "Year-round",
    migrationPattern: "Resident",
    photographyTips: "Easily photographed at feeders and flowering plants",
    funFacts: [
      "One of the largest hummingbirds in Colombia",
      "Can hover for extended periods",
      "Visits over 50 plant species",
    ],
    tourTypes: ["Adventure Tours", "Elevate Tours", "Vision Tours"],
    experienceLevel: "Beginner",
    rarity: 3,
    photographyDifficulty: 2,
    tags: ["Hummingbird", "Large", "Purple", "Common", "Garden visitor"],
  },
  {
    id: "gohman1",
    commonName: "Golden-headed Manakin",
    scientificName: "Ceratopipra erythrocephala",
    spanishName: "Saltarín Cabecidorado",
    family: "Pipridae",
    order: "Passeriformes",
    image: "/images/gohman1.jpg",
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gohman1-sOmUeeC5xVszFJSmeZ66Try02jkzGB.mp3",
    primaryRegion: "Pacific Coast",
    secondaryRegions: ["Western Andes"],
    habitat: "Tropical rainforest understory",
    elevation: "200 - 1,500m",
    conservationStatus: "Least Concern",
    difficulty: "Easy",
    bestTime: "Year-round",
    description:
      "A spectacular small bird with brilliant golden head and black body. Males perform elaborate courtship displays at traditional leks, making them a favorite among wildlife photographers.",
    behaviors: ["Lek displays", "Fruit foraging", "Acrobatic flights"],
    dietaryPreferences: ["Small fruits", "Insects"],
    breedingSeason: "March - September",
    migrationPattern: "Resident",
    photographyTips: "Visit leks early morning for display photography",
    funFacts: [
      "Males can perform over 20 different display moves",
      "Females build nests alone",
      "Can live over 10 years",
    ],
    tourTypes: ["Adventure Tours", "Vision Tours"],
    experienceLevel: "Beginner",
    rarity: 5,
    photographyDifficulty: 4,
    tags: ["Manakin", "Golden", "Display", "Rainforest", "Colorful"],
  },
  {
    id: "strman5",
    commonName: "Striped Manakin",
    scientificName: "Machaeropterus regulus",
    spanishName: "Saltarín Rayado",
    family: "Pipridae",
    order: "Passeriformes",
    image: "/images/strman5.jpg",
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/strman5-M7ePaDFfvKHcN4hSew56PkYN1C7B8N.mp3",
    primaryRegion: "Pacific Coast",
    secondaryRegions: ["Western Andes"],
    habitat: "Tropical rainforest understory",
    elevation: "200 - 1,800m",
    conservationStatus: "Least Concern",
    difficulty: "Moderate",
    bestTime: "Year-round",
    description:
      "A distinctive manakin with bold striped pattern and red crown. Known for its unique mechanical wing sounds produced during courtship displays.",
    behaviors: ["Wing snapping displays", "Lek behavior", "Fruit foraging"],
    dietaryPreferences: ["Small fruits", "Berries", "Insects"],
    breedingSeason: "February - August",
    migrationPattern: "Resident",
    photographyTips: "Listen for wing snaps to locate displaying males",
    funFacts: [
      "Wing sounds can be heard 100m away",
      "Modified wing feathers create mechanical sounds",
      "Displays on horizontal branches",
    ],
    tourTypes: ["Adventure Tours", "Vision Tours"],
    experienceLevel: "Intermediate",
    rarity: 6,
    photographyDifficulty: 5,
    tags: ["Manakin", "Striped", "Wing sounds", "Display", "Unique"],
  },
  {
    id: "scadov1",
    commonName: "Scaled Dove",
    scientificName: "Columbina squammata",
    spanishName: "Tortolita Escamosa",
    family: "Columbidae",
    order: "Columbiformes",
    image: "/images/scadov1.jpg",
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/scadov1-ZY5P1ezfAmzpRMfahJV0otL1QasgoJ.mp3",
    primaryRegion: "Caribbean Coast",
    secondaryRegions: ["Magdalena Valley"],
    habitat: "Dry scrublands and open areas",
    elevation: "0 - 1,000m",
    conservationStatus: "Least Concern",
    difficulty: "Easy",
    bestTime: "Year-round",
    description:
      "A small, ground-dwelling dove with distinctive scaled plumage pattern. Common in dry habitats and often seen walking on the ground searching for seeds.",
    behaviors: ["Ground foraging", "Dust bathing", "Pair bonding"],
    dietaryPreferences: ["Seeds", "Small fruits", "Insects"],
    breedingSeason: "Year-round",
    migrationPattern: "Resident",
    photographyTips: "Approach slowly as they forage on the ground",
    funFacts: ["Can go without water for long periods", "Builds simple platform nests", "Often seen in pairs"],
    tourTypes: ["Adventure Tours", "Souls Tours"],
    experienceLevel: "Beginner",
    rarity: 2,
    photographyDifficulty: 2,
    tags: ["Dove", "Ground-dwelling", "Scaled pattern", "Dry habitat", "Common"],
  },
  {
    id: "bkmtou1",
    commonName: "Yellow-throated Toucan",
    scientificName: "Ramphastos ambiguus",
    spanishName: "Tucán de Garganta Amarilla",
    family: "Ramphastidae",
    order: "Piciformes",
    image: "/images/bkmtou1.jpg",
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bkmtou1-Z7kswt5kh0hyKXzsni4zrZNFem5LY6.mp3",
    primaryRegion: "Eastern Andes",
    secondaryRegions: ["Central Andes", "Western Andes"],
    habitat: "Montane cloud forests",
    elevation: "800 - 2,400m",
    conservationStatus: "Least Concern",
    difficulty: "Moderate",
    bestTime: "Year-round",
    description:
      "A large, spectacular toucan with a massive colorful bill and bright yellow throat. These social birds are important seed dispersers in cloud forest ecosystems.",
    behaviors: ["Fruit tossing", "Social calling", "Canopy foraging"],
    dietaryPreferences: ["Fruits", "Insects", "Small vertebrates", "Eggs"],
    breedingSeason: "March - July",
    migrationPattern: "Resident",
    photographyTips: "Best photographed at fruiting trees in good light",
    funFacts: [
      "Bill is mostly hollow and lightweight",
      "Can regulate body temperature through bill",
      "Sleeps with bill tucked over back",
    ],
    tourTypes: ["Adventure Tours", "Elevate Tours", "Vision Tours"],
    experienceLevel: "Intermediate",
    rarity: 5,
    photographyDifficulty: 4,
    tags: ["Toucan", "Large bill", "Colorful", "Cloud forest", "Spectacular"],
  },
  {
    id: "gohque1",
    commonName: "Golden-headed Quetzal",
    scientificName: "Pharomachrus auriceps",
    spanishName: "Quetzal Cabecidorado",
    family: "Trogonidae",
    order: "Trogoniformes",
    image: "/images/gohque1.jpg",
    audioFile: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gohman1-O2SEW0cbNWsNGuBflkixHCiSmeivLj.mp3",
    primaryRegion: "Eastern Andes",
    secondaryRegions: ["Central Andes", "Western Andes"],
    habitat: "Cloud forests and montane forests",
    elevation: "1,200 - 2,800m",
    conservationStatus: "Least Concern",
    difficulty: "Moderate",
    bestTime: "Year-round",
    description:
      "A magnificent trogon with brilliant golden head and emerald green back. These birds are cavity nesters and play important roles in cloud forest ecosystems.",
    behaviors: ["Cavity nesting", "Fruit foraging", "Territorial calling"],
    dietaryPreferences: ["Fruits", "Insects", "Small vertebrates"],
    breedingSeason: "March - August",
    migrationPattern: "Resident",
    photographyTips: "Look for birds at fruiting trees and listen for calls",
    funFacts: ["Excavates nest holes in rotten wood", "Both parents incubate eggs", "Can rotate head 180 degrees"],
    tourTypes: ["Adventure Tours", "Vision Tours", "Elevate Tours"],
    experienceLevel: "Intermediate",
    rarity: 6,
    photographyDifficulty: 5,
    tags: ["Quetzal", "Golden", "Trogon", "Cloud forest", "Beautiful"],
  },
]

// Tour recommendation data
const tourRecommendations = {
  "Adventure Tours": {
    icon: TreePine,
    color: "emerald",
    description: "Active birding with hiking and exploration",
    difficulty: "Moderate to Challenging",
    duration: "6-10 days",
    groupSize: "2-4 people",
    features: ["Moderate hiking", "Remote locations", "Adventure activities", "Basic accommodations"],
    bestFor: ["Endemic species", "High-altitude birds", "Remote locations", "Active birders"],
  },
  "Vision Tours": {
    icon: Camera,
    color: "purple",
    description: "Premium photography-focused experiences",
    difficulty: "Easy to Moderate",
    duration: "7-12 days",
    groupSize: "2-4 people",
    features: ["Photography guides", "Premium hides", "Equipment support", "Golden hour sessions"],
    bestFor: ["Colorful species", "Display behaviors", "Photography", "Rare birds"],
  },
  "Elevate Tours": {
    icon: Mountain,
    color: "blue",
    description: "Luxury comfort with exceptional birding",
    difficulty: "Easy to Moderate",
    duration: "8-14 days",
    groupSize: "2-4 people",
    features: ["Luxury accommodations", "Gourmet meals", "Premium service", "Comfortable transport"],
    bestFor: ["Common species", "Easy access", "Comfort", "Scenic locations"],
  },
  "Souls Tours": {
    icon: Users,
    color: "orange",
    description: "Deep cultural immersion with indigenous communities",
    difficulty: "Moderate",
    duration: "10-15 days",
    groupSize: "2-4 people",
    features: ["Cultural immersion", "Indigenous guides", "Traditional experiences", "Community support"],
    bestFor: ["Cultural species", "Traditional knowledge", "Community tourism", "Unique experiences"],
  },
}

// Region data for recommendations
const regionData = {
  "Eastern Andes": {
    icon: Mountain,
    color: "amber",
    description: "High-altitude páramo and cloud forests",
    specialties: ["High-altitude species", "Endemic hummingbirds", "Páramo birds"],
    difficulty: "Challenging",
    bestTime: "December - March",
  },
  "Central Andes": {
    icon: Mountain,
    color: "red",
    description: "Coffee region with diverse montane ecosystems",
    specialties: ["Mountain toucans", "Cloud forest species", "Coffee farm birds"],
    difficulty: "Moderate",
    bestTime: "December - March, June - August",
  },
  "Western Andes": {
    icon: Mountain,
    color: "green",
    description: "Cloud forests with incredible diversity",
    specialties: ["Hummingbirds", "Tanagers", "Endemic species"],
    difficulty: "Moderate",
    bestTime: "December - March, June - August",
  },
  "Caribbean Coast": {
    icon: Waves,
    color: "blue",
    description: "Dry forests and coastal wetlands",
    specialties: ["Endemic cardinals", "Dry forest species", "Coastal birds"],
    difficulty: "Easy",
    bestTime: "December - April",
  },
  "Pacific Coast": {
    icon: TreePine,
    color: "emerald",
    description: "World's most biodiverse rainforest",
    specialties: ["Manakins", "Rainforest species", "Display behaviors"],
    difficulty: "Moderate",
    bestTime: "January - March, July - September",
  },
  "Colombian Massif": {
    icon: Mountain,
    color: "purple",
    description: "Where the Andes divide into three ranges",
    specialties: ["Antpittas", "Cloud forest species", "Secretive birds"],
    difficulty: "Moderate",
    bestTime: "December - March, June - August",
  },
}

interface SelectedBird {
  id: string
  priority: number
}

interface ItineraryRecommendation {
  tourType: string
  regions: string[]
  duration: number
  difficulty: string
  targetSpecies: string[]
  confidence: number
  reasoning: string[]
}

export function BirdSpeciesExplorer() {
  // State management
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState<string>("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [selectedConservation, setSelectedConservation] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("name")
  const [selectedBirds, setSelectedBirds] = useState<SelectedBird[]>([])
  const [showItineraryBuilder, setShowItineraryBuilder] = useState(false)
  const [selectedBirdDetail, setSelectedBirdDetail] = useState<string | null>(null)
  const [currentAudio, setCurrentAudio] = useState<string | null>(null)
  const [recommendations, setRecommendations] = useState<ItineraryRecommendation[]>([])
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [favoriteSpecies, setFavoriteSpecies] = useState<string[]>([])

  // Filter and sort birds
  const filteredBirds = useMemo(() => {
    const filtered = birdSpeciesData.filter((bird) => {
      const matchesSearch =
        bird.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bird.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bird.spanishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bird.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesRegion =
        selectedRegion === "all" ||
        bird.primaryRegion === selectedRegion ||
        bird.secondaryRegions.includes(selectedRegion)

      const matchesDifficulty = selectedDifficulty === "all" || bird.difficulty === selectedDifficulty

      const matchesConservation = selectedConservation === "all" || bird.conservationStatus === selectedConservation

      return matchesSearch && matchesRegion && matchesDifficulty && matchesConservation
    })

    // Sort birds
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.commonName.localeCompare(b.commonName)
        case "rarity":
          return b.rarity - a.rarity
        case "difficulty":
          const difficultyOrder = { Easy: 1, Moderate: 2, Challenging: 3 }
          return (
            difficultyOrder[a.difficulty as keyof typeof difficultyOrder] -
            difficultyOrder[b.difficulty as keyof typeof difficultyOrder]
          )
        case "region":
          return a.primaryRegion.localeCompare(b.primaryRegion)
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, selectedRegion, selectedDifficulty, selectedConservation, sortBy])

  // Generate itinerary recommendations
  const generateRecommendations = useCallback(() => {
    if (selectedBirds.length === 0) return []

    const selectedSpecies = selectedBirds.map((sb) => birdSpeciesData.find((bird) => bird.id === sb.id)!)

    // Analyze selected species
    const regionCounts: Record<string, number> = {}
    const tourTypeCounts: Record<string, number> = {}
    const difficultyCounts: Record<string, number> = {}

    selectedSpecies.forEach((bird) => {
      // Count regions
      regionCounts[bird.primaryRegion] = (regionCounts[bird.primaryRegion] || 0) + 2
      bird.secondaryRegions.forEach((region) => {
        regionCounts[region] = (regionCounts[region] || 0) + 1
      })

      // Count tour types
      bird.tourTypes.forEach((tourType) => {
        tourTypeCounts[tourType] = (tourTypeCounts[tourType] || 0) + 1
      })

      // Count difficulties
      difficultyCounts[bird.difficulty] = (difficultyCounts[bird.difficulty] || 0) + 1
    })

    // Generate recommendations
    const recs: ItineraryRecommendation[] = []

    // Primary recommendation based on most common tour type
    const topTourType = Object.entries(tourTypeCounts).sort(([, a], [, b]) => b - a)[0]?.[0]
    const topRegions = Object.entries(regionCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([region]) => region)

    if (topTourType && topRegions.length > 0) {
      const primaryDifficulty = Object.entries(difficultyCounts).sort(([, a], [, b]) => b - a)[0]?.[0]
      const targetSpecies = selectedSpecies
        .filter(
          (bird) =>
            topRegions.includes(bird.primaryRegion) || bird.secondaryRegions.some((r) => topRegions.includes(r)),
        )
        .slice(0, 10)
        .map((bird) => bird.commonName)

      recs.push({
        tourType: topTourType,
        regions: topRegions,
        duration: selectedBirds.length <= 5 ? 7 : selectedBirds.length <= 10 ? 10 : 14,
        difficulty: primaryDifficulty || "Moderate",
        targetSpecies,
        confidence: Math.min(95, 60 + selectedBirds.length * 2),
        reasoning: [
          `${selectedBirds.length} species selected match this tour style`,
          `Primary regions: ${topRegions.slice(0, 2).join(", ")}`,
          `Optimal for ${primaryDifficulty?.toLowerCase()} difficulty level`,
          `${targetSpecies.length} target species identified`,
        ],
      })
    }

    // Alternative recommendation for photography if many colorful/rare species
    const colorfulSpecies = selectedSpecies.filter((bird) => bird.tags.includes("Colorful") || bird.rarity >= 7)

    if (colorfulSpecies.length >= 3 && topTourType !== "Vision Tours") {
      const photoRegions = [
        ...new Set(colorfulSpecies.flatMap((bird) => [bird.primaryRegion, ...bird.secondaryRegions])),
      ].slice(0, 2)

      recs.push({
        tourType: "Vision Tours",
        regions: photoRegions,
        duration: Math.min(12, 8 + colorfulSpecies.length),
        difficulty: "Moderate",
        targetSpecies: colorfulSpecies.slice(0, 8).map((bird) => bird.commonName),
        confidence: Math.min(90, 50 + colorfulSpecies.length * 5),
        reasoning: [
          `${colorfulSpecies.length} rare/colorful species ideal for photography`,
          `Specialized photography equipment and guides included`,
          `Focus on display behaviors and optimal lighting`,
          `Premium hides and feeding stations available`,
        ],
      })
    }

    // Cultural recommendation if endemic species selected
    const endemicSpecies = selectedSpecies.filter((bird) => bird.tags.includes("Endemic"))
    if (endemicSpecies.length >= 2) {
      const endemicRegions = [...new Set(endemicSpecies.map((bird) => bird.primaryRegion))].slice(0, 2)

      recs.push({
        tourType: "Souls Tours",
        regions: endemicRegions,
        duration: Math.min(15, 10 + endemicSpecies.length),
        difficulty: "Moderate",
        targetSpecies: endemicSpecies.slice(0, 6).map((bird) => bird.commonName),
        confidence: Math.min(85, 40 + endemicSpecies.length * 8),
        reasoning: [
          `${endemicSpecies.length} endemic species with cultural significance`,
          `Indigenous communities have traditional knowledge`,
          `Support local conservation efforts`,
          `Unique cultural and birding experience combined`,
        ],
      })
    }

    return recs.sort((a, b) => b.confidence - a.confidence)
  }, [selectedBirds])

  // Handle bird selection for itinerary
  const toggleBirdSelection = useCallback((birdId: string) => {
    setSelectedBirds((prev) => {
      const existing = prev.find((sb) => sb.id === birdId)
      if (existing) {
        return prev.filter((sb) => sb.id !== birdId)
      } else if (prev.length < 20) {
        return [...prev, { id: birdId, priority: prev.length + 1 }]
      }
      return prev
    })
  }, [])

  // Handle favorites
  const toggleFavorite = useCallback((birdId: string) => {
    setFavoriteSpecies((prev) => (prev.includes(birdId) ? prev.filter((id) => id !== birdId) : [...prev, birdId]))
  }, [])

  // Generate recommendations when selection changes
  useEffect(() => {
    if (selectedBirds.length > 0) {
      const recs = generateRecommendations()
      setRecommendations(recs)
    } else {
      setRecommendations([])
    }
  }, [selectedBirds, generateRecommendations])

  // Get conservation status color
  const getConservationColor = (status: string) => {
    switch (status) {
      case "Critically Endangered":
        return "bg-red-100 text-red-800 border-red-200"
      case "Endangered":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Vulnerable":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Near Threatened":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Least Concern":
        return "bg-green-100 text-green-800 border-green-200"
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

  const selectedBirdData = selectedBirdDetail ? birdSpeciesData.find((b) => b.id === selectedBirdDetail) : null

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-500 via-blue-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-white/20 p-3 rounded-full">
              <Bird className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">Discover Colombian Birds</h1>
          </div>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Explore Colombia's incredible avian diversity, listen to bird songs, and create your perfect birding
            adventure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              onClick={() => setShowItineraryBuilder(true)}
            >
              <Target className="w-5 h-5 mr-2" />
              Create Your Itinerary
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold bg-transparent"
            >
              <Music className="w-5 h-5 mr-2" />
              Listen to Bird Songs
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filters */}
          <Card className="mb-8 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Search className="w-6 h-6 text-emerald-600" />
                    Explore Species
                  </CardTitle>
                  <p className="text-gray-600 mt-1">
                    Discover {birdSpeciesData.length} incredible bird species from Colombia
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    List
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search by name, scientific name, or characteristics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                />
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-emerald-500 rounded-xl">
                    <SelectValue placeholder="All Regions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="Eastern Andes">Eastern Andes</SelectItem>
                    <SelectItem value="Central Andes">Central Andes</SelectItem>
                    <SelectItem value="Western Andes">Western Andes</SelectItem>
                    <SelectItem value="Caribbean Coast">Caribbean Coast</SelectItem>
                    <SelectItem value="Pacific Coast">Pacific Coast</SelectItem>
                    <SelectItem value="Colombian Massif">Colombian Massif</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-emerald-500 rounded-xl">
                    <SelectValue placeholder="All Difficulties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Difficulties</SelectItem>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Challenging">Challenging</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedConservation} onValueChange={setSelectedConservation}>
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-emerald-500 rounded-xl">
                    <SelectValue placeholder="Conservation Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Critically Endangered">Critically Endangered</SelectItem>
                    <SelectItem value="Endangered">Endangered</SelectItem>
                    <SelectItem value="Vulnerable">Vulnerable</SelectItem>
                    <SelectItem value="Near Threatened">Near Threatened</SelectItem>
                    <SelectItem value="Least Concern">Least Concern</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-emerald-500 rounded-xl">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="rarity">Rarity</SelectItem>
                    <SelectItem value="difficulty">Difficulty</SelectItem>
                    <SelectItem value="region">Region</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Results Summary */}
              <div className="flex items-center justify-between bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4 border border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <Bird className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Showing {filteredBirds.length} of {birdSpeciesData.length} species
                    </div>
                    {selectedBirds.length > 0 && (
                      <div className="text-sm text-emerald-600 font-medium">
                        {selectedBirds.length}/20 selected for itinerary
                      </div>
                    )}
                  </div>
                </div>
                {selectedBirds.length > 0 && (
                  <Button onClick={() => setShowItineraryBuilder(true)} className="bg-emerald-600 hover:bg-emerald-700">
                    <Route className="w-4 h-4 mr-2" />
                    Build Itinerary ({selectedBirds.length})
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Species Grid/List */}
          <div
            className={cn(
              "gap-6",
              viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "space-y-4",
            )}
          >
            {filteredBirds.map((bird) => {
              const isSelected = selectedBirds.some((sb) => sb.id === bird.id)
              const isFavorite = favoriteSpecies.includes(bird.id)
              const selectionNumber = selectedBirds.find((sb) => sb.id === bird.id)?.priority

              return (
                <Card
                  key={bird.id}
                  className={cn(
                    "group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-0 bg-white/90 backdrop-blur-sm overflow-hidden",
                    isSelected && "ring-2 ring-emerald-500 shadow-xl",
                    viewMode === "list" && "flex flex-row",
                  )}
                  onClick={() => setSelectedBirdDetail(bird.id)}
                >
                  <div
                    className={cn(
                      "relative overflow-hidden",
                      viewMode === "grid" ? "aspect-square" : "w-32 h-32 flex-shrink-0",
                    )}
                  >
                    <Image
                      src={bird.image || "/placeholder.svg"}
                      alt={bird.commonName}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Selection Badge */}
                    {isSelected && (
                      <div className="absolute top-2 left-2 bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        {selectionNumber}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 p-0 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(bird.id)
                        }}
                      >
                        {isFavorite ? <Heart className="w-4 h-4 fill-current" /> : <HeartOff className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "w-8 h-8 p-0 rounded-full backdrop-blur-sm text-white transition-all",
                          isSelected ? "bg-emerald-500 hover:bg-emerald-600" : "bg-white/20 hover:bg-white/30",
                        )}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleBirdSelection(bird.id)
                        }}
                      >
                        {isSelected ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </Button>
                    </div>

                    {/* Audio Button */}
                    {bird.audioFile && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute bottom-2 right-2 w-8 h-8 p-0 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                        onClick={(e) => {
                          e.stopPropagation()
                          setCurrentAudio(currentAudio === bird.id ? null : bird.id)
                        }}
                      >
                        {currentAudio === bird.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                    )}

                    {/* Rarity Stars */}
                    <div className="absolute bottom-2 left-2 flex gap-0.5">
                      {Array.from({ length: Math.min(5, Math.ceil(bird.rarity / 2)) }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  <CardContent className={cn("p-4", viewMode === "list" && "flex-1")}>
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                          {bird.commonName}
                        </h3>
                        <p className="text-sm italic text-gray-600">{bird.scientificName}</p>
                        <p className="text-xs text-gray-500">{bird.spanishName}</p>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        <Badge className={cn("text-xs", getConservationColor(bird.conservationStatus))}>
                          {bird.conservationStatus}
                        </Badge>
                        <Badge className={cn("text-xs", getDifficultyColor(bird.difficulty))}>{bird.difficulty}</Badge>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4 text-emerald-600" />
                          <span>{bird.primaryRegion}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mountain className="w-4 h-4 text-blue-600" />
                          <span>{bird.elevation}</span>
                        </div>
                      </div>

                      {viewMode === "list" && <p className="text-sm text-gray-600 line-clamp-2">{bird.description}</p>}

                      <div className="flex flex-wrap gap-1">
                        {bird.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* No Results */}
          {filteredBirds.length === 0 && (
            <Card className="text-center py-16 border-0 bg-white/80 backdrop-blur-sm shadow-xl">
              <CardContent>
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No species found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Try adjusting your search terms or filters to find the birds you're looking for.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedRegion("all")
                    setSelectedDifficulty("all")
                    setSelectedConservation("all")
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Species Detail Modal */}
      <Dialog open={!!selectedBirdDetail} onOpenChange={() => setSelectedBirdDetail(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
          {selectedBirdData && (
            <>
              <DialogHeader className="pb-6">
                <DialogTitle className="text-3xl flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  <div className="bg-gradient-to-br from-emerald-500 to-blue-600 p-2 rounded-full">
                    <Bird className="w-6 h-6 text-white" />
                  </div>
                  {selectedBirdData.commonName}
                </DialogTitle>
                <DialogDescription className="text-xl italic text-gray-600 font-medium">
                  {selectedBirdData.scientificName}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-8">
                {/* Species Image and Audio */}
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  <div className="aspect-video relative">
                    <Image
                      src={selectedBirdData.image || "/placeholder.svg"}
                      alt={selectedBirdData.commonName}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Audio Player */}
                    {selectedBirdData.audioFile && (
                      <div className="absolute bottom-4 left-4 right-4">
                        <AudioPlayer
                          src={selectedBirdData.audioFile}
                          title={`${selectedBirdData.commonName} call`}
                          species={selectedBirdData.scientificName}
                          className="bg-white/10 backdrop-blur-md border-white/20"
                        />
                      </div>
                    )}

                    {/* Status Badges */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Badge className={cn("text-sm", getConservationColor(selectedBirdData.conservationStatus))}>
                        {selectedBirdData.conservationStatus}
                      </Badge>
                      <Badge className={cn("text-sm", getDifficultyColor(selectedBirdData.difficulty))}>
                        {selectedBirdData.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Species Information Tabs */}
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="behavior">Behavior</TabsTrigger>
                    <TabsTrigger value="habitat">Habitat</TabsTrigger>
                    <TabsTrigger value="photography">Photography</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 border-emerald-100">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-emerald-800">
                            <Info className="w-5 h-5" />
                            Basic Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-700">Family:</span>
                              <p className="text-gray-900">{selectedBirdData.family}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Order:</span>
                              <p className="text-gray-900">{selectedBirdData.order}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Spanish Name:</span>
                              <p className="text-gray-900">{selectedBirdData.spanishName}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Experience Level:</span>
                              <p className="text-gray-900">{selectedBirdData.experienceLevel}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-purple-800">
                            <MapPin className="w-5 h-5" />
                            Location & Timing
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3 text-sm">
                            <div>
                              <span className="font-medium text-gray-700">Primary Region:</span>
                              <p className="text-gray-900">{selectedBirdData.primaryRegion}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Elevation:</span>
                              <p className="text-gray-900">{selectedBirdData.elevation}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Best Time:</span>
                              <p className="text-gray-900">{selectedBirdData.bestTime}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Breeding Season:</span>
                              <p className="text-gray-900">{selectedBirdData.breedingSeason}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Description</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed text-lg">{selectedBirdData.description}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Fun Facts</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {selectedBirdData.funFacts.map((fact, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Sparkles className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{fact}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="behavior" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-orange-500" />
                            Behaviors
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {selectedBirdData.behaviors.map((behavior, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                                <span className="text-gray-700">{behavior}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Apple className="w-5 h-5 text-green-500" />
                            Diet
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {selectedBirdData.dietaryPreferences.map((diet, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                                <span className="text-gray-700">{diet}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Route className="w-5 h-5 text-blue-500" />
                          Migration Pattern
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700">{selectedBirdData.migrationPattern}</p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="habitat" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TreePine className="w-5 h-5 text-green-600" />
                          Habitat Description
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 text-lg leading-relaxed">{selectedBirdData.habitat}</p>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Primary Region</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                            <span className="font-medium">{selectedBirdData.primaryRegion}</span>
                          </div>
                        </CardContent>
                      </Card>

                      {selectedBirdData.secondaryRegions.length > 0 && (
                        <Card>
                          <CardHeader>
                            <CardTitle>Secondary Regions</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {selectedBirdData.secondaryRegions.map((region, index) => (
                                <div key={index} className="flex items-center gap-3">
                                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                                  <span>{region}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="photography" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Camera className="w-5 h-5 text-purple-500" />
                            Photography Tips
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700">{selectedBirdData.photographyTips}</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-red-500" />
                            Difficulty Ratings
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Rarity</span>
                              <span className="text-sm text-gray-600">{selectedBirdData.rarity}/10</span>
                            </div>
                            <Progress value={selectedBirdData.rarity * 10} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Photography Difficulty</span>
                              <span className="text-sm text-gray-600">{selectedBirdData.photographyDifficulty}/10</span>
                            </div>
                            <Progress value={selectedBirdData.photographyDifficulty * 10} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Recommended Tour Types</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {selectedBirdData.tourTypes.map((tourType) => (
                            <Badge key={tourType} className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white">
                              {tourType}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t">
                  <Button
                    onClick={() => toggleBirdSelection(selectedBirdData.id)}
                    className={cn(
                      "flex-1",
                      selectedBirds.some((sb) => sb.id === selectedBirdData.id)
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-blue-600 hover:bg-blue-700",
                    )}
                  >
                    {selectedBirds.some((sb) => sb.id === selectedBirdData.id) ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Added to Itinerary
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Add to Itinerary
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toggleFavorite(selectedBirdData.id)}
                    className={cn(favoriteSpecies.includes(selectedBirdData.id) && "border-red-300 text-red-600")}
                  >
                    {favoriteSpecies.includes(selectedBirdData.id) ? (
                      <Heart className="w-4 h-4 fill-current" />
                    ) : (
                      <HeartOff className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Itinerary Builder Modal */}
      <Dialog open={showItineraryBuilder} onOpenChange={setShowItineraryBuilder}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
          <DialogHeader className="pb-6">
            <DialogTitle className="text-3xl flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              <div className="bg-gradient-to-br from-emerald-500 to-blue-600 p-2 rounded-full">
                <Route className="w-6 h-6 text-white" />
              </div>
              Create Your Birding Itinerary
            </DialogTitle>
            <DialogDescription className="text-xl text-gray-600">
              Select up to 20 bird species to get personalized tour recommendations
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-8">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Species Selected</span>
                <span>{selectedBirds.length}/20</span>
              </div>
              <Progress value={(selectedBirds.length / 20) * 100} className="h-3" />
            </div>

            {/* Selected Birds */}
            {selectedBirds.length > 0 && (
              <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-emerald-600" />
                    Your Selected Species ({selectedBirds.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedBirds.map((selectedBird) => {
                      const bird = birdSpeciesData.find((b) => b.id === selectedBird.id)!
                      return (
                        <div key={bird.id} className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                          <div className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            {selectedBird.priority}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">{bird.commonName}</div>
                            <div className="text-xs text-gray-500 truncate">{bird.primaryRegion}</div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-6 h-6 p-0 text-red-500 hover:text-red-700"
                            onClick={() => toggleBirdSelection(bird.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">Recommended Tours</h3>
                  <Badge className="bg-emerald-100 text-emerald-800">
                    {recommendations.length} recommendation{recommendations.length !== 1 ? "s" : ""}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {recommendations.map((rec, index) => {
                    const tourInfo = tourRecommendations[rec.tourType as keyof typeof tourRecommendations]
                    const IconComponent = tourInfo.icon

                    return (
                      <Card key={index} className="border-2 border-gray-200 hover:border-emerald-300 transition-colors">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-3">
                              <div className={`bg-${tourInfo.color}-100 p-2 rounded-lg`}>
                                <IconComponent className={`w-5 h-5 text-${tourInfo.color}-600`} />
                              </div>
                              {rec.tourType}
                            </CardTitle>
                            <Badge className="bg-emerald-100 text-emerald-800">{rec.confidence}% match</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-gray-600">{tourInfo.description}</p>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-700">Duration:</span>
                              <p className="text-gray-900">{rec.duration} days</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Difficulty:</span>
                              <p className="text-gray-900">{rec.difficulty}</p>
                            </div>
                          </div>

                          <div>
                            <span className="font-medium text-gray-700 text-sm">Primary Regions:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {rec.regions.map((region) => (
                                <Badge key={region} variant="secondary" className="text-xs">
                                  {region}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="font-medium text-gray-700 text-sm">
                              Target Species ({rec.targetSpecies.length}):
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {rec.targetSpecies.slice(0, 6).map((species) => (
                                <Badge key={species} className="text-xs bg-emerald-100 text-emerald-800">
                                  {species}
                                </Badge>
                              ))}
                              {rec.targetSpecies.length > 6 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{rec.targetSpecies.length - 6} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div>
                            <span className="font-medium text-gray-700 text-sm">Why this tour:</span>
                            <ul className="mt-1 space-y-1">
                              {rec.reasoning.slice(0, 3).map((reason, i) => (
                                <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                                  <div className="w-1 h-1 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                                  {reason}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <Button className="w-full bg-emerald-600 hover:bg-emerald-700" asChild>
                            <Link
                              href={`/shopping?preset=${encodeURIComponent(rec.tourType)}&regions=${encodeURIComponent(rec.regions.join(","))}`}
                            >
                              <Route className="w-4 h-4 mr-2" />
                              Book This Tour
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex gap-4 pt-6 border-t">
              <Button variant="outline" onClick={() => setSelectedBirds([])} disabled={selectedBirds.length === 0}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Clear Selection
              </Button>
              <Button
                onClick={() => {
                  const randomBirds = [...birdSpeciesData]
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 10)
                    .map((bird, index) => ({ id: bird.id, priority: index + 1 }))
                  setSelectedBirds(randomBirds)
                }}
              >
                <Shuffle className="w-4 h-4 mr-2" />
                Random Selection
              </Button>
              {selectedBirds.length > 0 && (
                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setShowRecommendations(true)}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get Recommendations
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Audio Player for Current Audio */}
      {currentAudio && (
        <div className="fixed bottom-4 right-4 z-50">
          {(() => {
            const bird = birdSpeciesData.find((b) => b.id === currentAudio)
            return bird?.audioFile ? (
              <AudioPlayer
                src={bird.audioFile}
                title={bird.commonName}
                species={bird.scientificName}
                className="bg-white shadow-2xl border border-gray-200 min-w-[300px]"
                autoPlay
              />
            ) : null
          })()}
        </div>
      )}
    </div>
  )
}
