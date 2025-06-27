"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useRouter, useSearchParams } from "next/navigation"
import {
  MapPin,
  Bird,
  Search,
  ExternalLink,
  RotateCcw,
  Heart,
  Info,
  AlertTriangle,
  Calendar,
  TreePine,
  Mountain,
  Users,
  TelescopeIcon as Binoculars,
  ChevronRight,
  ArrowLeft,
  Waves,
  Leaf,
  Sun,
  ShoppingBag,
  Filter,
} from "lucide-react"

// Enhanced bird species data including both endemic and notable species
const birdSpeciesData = [
  // Endemic Species
  {
    commonName: "Santa Marta Parakeet",
    scientificName: "Pyrrhura viridicata",
    spanishName: "Periquito de Santa Marta",
    ebirdCode: "sampar1",
    ebirdUrl: "https://ebird.org/species/sampar1",
    regions: ["SNSM"],
    conservationStatus: "Endangered",
    habitat: "Cloud forests and forest edges",
    description:
      "Colorful parakeet endemic to Sierra Nevada de Santa Marta, threatened by habitat loss and capture for pet trade.",
    elevation: "1200-2800m",
    bestTime: "December-March, July-August",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Santa+Marta+Parakeet",
    isEndemic: true,
    category: "Endemic",
  },
  {
    commonName: "Santa Marta Blossomcrown",
    scientificName: "Anthocephala floriceps",
    spanishName: "Colibrí coronado de Santa Marta",
    ebirdCode: "blosac1",
    ebirdUrl: "https://ebird.org/species/blosac1",
    regions: ["SNSM"],
    conservationStatus: "Critically Endangered",
    habitat: "Cloud forest edges",
    description: "Tiny hummingbird with distinctive crown, one of the world's most endangered hummingbirds.",
    elevation: "1800-2800m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Santa+Marta+Blossomcrown",
    isEndemic: true,
    category: "Endemic",
  },
  {
    commonName: "Blue-bearded Helmetcrest",
    scientificName: "Oxypogon cyanolaemus",
    spanishName: "Colibrí crestado barbazul",
    ebirdCode: "blbhel2",
    ebirdUrl: "https://ebird.org/species/blbhel2",
    regions: ["SNSM"],
    conservationStatus: "Critically Endangered",
    habitat: "Páramo grasslands",
    description: "Distinctive páramo hummingbird with unique blue beard, extremely rare and localized.",
    elevation: "3000-4200m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Blue-bearded+Helmetcrest",
    isEndemic: true,
    category: "Endemic",
  },
  {
    commonName: "Gorgeted Puffleg",
    scientificName: "Eriocnemis isabellae",
    spanishName: "Calzadito gorgiblanco",
    ebirdCode: "gorpuf1",
    ebirdUrl: "https://ebird.org/species/gorpuf1",
    regions: ["Western Andes"],
    conservationStatus: "Critically Endangered",
    habitat: "Cloud forest edges",
    description: "Rare hummingbird with distinctive throat, one of the world's most endangered hummingbirds.",
    elevation: "1800-2800m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Gorgeted+Puffleg",
    isEndemic: true,
    category: "Endemic",
  },
  {
    commonName: "Indigo-winged Parrot",
    scientificName: "Hapalopsittaca fuertesi",
    spanishName: "Cotorra aliazul",
    ebirdCode: "indpar1",
    ebirdUrl: "https://ebird.org/species/indpar1",
    regions: ["Central Andes"],
    conservationStatus: "Critically Endangered",
    habitat: "Cloud forests",
    description: "Rare montane parrot, critically endangered with fewer than 300 individuals remaining.",
    elevation: "2000-3400m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Indigo-winged+Parrot",
    isEndemic: true,
    category: "Endemic",
  },
  // Notable Non-Endemic Species
  {
    commonName: "Resplendent Quetzal",
    scientificName: "Pharomachrus mocinno",
    spanishName: "Quetzal resplandeciente",
    ebirdCode: "resquet1",
    ebirdUrl: "https://ebird.org/species/resquet1",
    regions: ["Western Andes", "Central Andes"],
    conservationStatus: "Near Threatened",
    habitat: "Cloud forests",
    description: "Magnificent cloud forest bird with iridescent green plumage and long tail feathers.",
    elevation: "1400-3000m",
    bestTime: "Year-round",
    imageUrl: "/images/resplendent-quetzal.jpg",
    isEndemic: false,
    category: "Spectacular",
  },
  {
    commonName: "Andean Cock-of-the-Rock",
    scientificName: "Rupicola peruvianus",
    spanishName: "Gallito de roca andino",
    ebirdCode: "andcor1",
    ebirdUrl: "https://ebird.org/species/andcor1",
    regions: ["Eastern Andes", "Central Andes"],
    conservationStatus: "Least Concern",
    habitat: "Cloud forests and rocky areas",
    description: "Spectacular orange bird known for elaborate courtship displays and distinctive crest.",
    elevation: "500-2400m",
    bestTime: "Year-round",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Andean+Cock-of-the-Rock",
    isEndemic: false,
    category: "Spectacular",
  },
  {
    commonName: "King Vulture",
    scientificName: "Sarcoramphus papa",
    spanishName: "Rey zamuro",
    ebirdCode: "kinvul1",
    ebirdUrl: "https://ebird.org/species/kinvul1",
    regions: ["Amazonia", "Pacific"],
    conservationStatus: "Least Concern",
    habitat: "Lowland rainforest",
    description: "Magnificent large vulture with colorful head and impressive wingspan.",
    elevation: "0-1500m",
    bestTime: "Year-round",
    imageUrl: "/images/king-vulture.jpg",
    isEndemic: false,
    category: "Spectacular",
  },
  {
    commonName: "Yellow-throated Toucan",
    scientificName: "Ramphastos ambiguus",
    spanishName: "Tucán de garganta amarilla",
    ebirdCode: "yeltou1",
    ebirdUrl: "https://ebird.org/species/yeltou1",
    regions: ["Pacific", "Western Andes"],
    conservationStatus: "Vulnerable",
    habitat: "Rainforest canopy",
    description: "Large colorful toucan of Pacific rainforests with distinctive yellow throat.",
    elevation: "0-2000m",
    bestTime: "Year-round",
    imageUrl: "/images/yellow-throated-toucan.jpg",
    isEndemic: false,
    category: "Spectacular",
  },
  {
    commonName: "White-necked Jacobin",
    scientificName: "Florisuga mellivora",
    spanishName: "Jacobino nuquiblanco",
    ebirdCode: "whnjac1",
    ebirdUrl: "https://ebird.org/species/whnjac1",
    regions: ["Caribbean", "Pacific"],
    conservationStatus: "Least Concern",
    habitat: "Forest edges and gardens",
    description: "Large hummingbird with striking blue and white plumage pattern.",
    elevation: "0-1200m",
    bestTime: "Year-round",
    imageUrl: "/images/white-necked-jacobin.jpg",
    isEndemic: false,
    category: "Common Favorites",
  },
]

// 11 distinct regions data
const regionsData = [
  {
    id: "Pacific",
    name: "Pacific Coast",
    fullName: "Pacific Coast & Chocó",
    description:
      "World's most biodiverse rainforest per square kilometer, including the Chocó biogeographic region with extraordinary rainfall and endemic species.",
    color: "#10B981",
    gradient: "from-emerald-500 to-green-600",
    icon: TreePine,
    endemicSpeciesCount: 2,
    totalSpecies: 875,
    keyFeatures: ["Highest rainfall on Earth", "Chocó endemism hotspot", "Lowland rainforest"],
    coordinates: { x: 15, y: 45 },
    elevation: "0-4,000m",
    climate: "Tropical rainforest",
    bestTime: "January-March, July-September",
    area: "187,000 km²",
  },
  {
    id: "Western Andes",
    name: "Western Andes",
    fullName: "Cordillera Occidental",
    description:
      "Western mountain range with the highest concentration of endemic bird species, featuring diverse elevational zones from cloud forests to páramo.",
    color: "#8B5CF6",
    gradient: "from-purple-500 to-indigo-600",
    icon: Mountain,
    endemicSpeciesCount: 36,
    totalSpecies: 785,
    keyFeatures: ["Highest endemic concentration", "Cloud forests", "Páramo ecosystems"],
    coordinates: { x: 35, y: 50 },
    elevation: "1,000-4,250m",
    climate: "Montane tropical",
    bestTime: "December-March, June-August",
    area: "76,000 km²",
  },
  {
    id: "Central Andes",
    name: "Central Andes",
    fullName: "Cordillera Central",
    description:
      "Central mountain range featuring the Coffee Triangle and diverse montane ecosystems, home to Colombia's highest peaks.",
    color: "#DC2626",
    gradient: "from-red-500 to-rose-600",
    icon: Mountain,
    endemicSpeciesCount: 34,
    totalSpecies: 720,
    keyFeatures: ["Coffee Triangle", "Highest peaks", "Volcanic soils"],
    coordinates: { x: 50, y: 50 },
    elevation: "1,000-5,400m",
    climate: "Montane tropical to alpine",
    bestTime: "December-March, June-August",
    area: "110,000 km²",
  },
  {
    id: "Eastern Andes",
    name: "Eastern Andes",
    fullName: "Cordillera Oriental",
    description:
      "Eastern mountain range including Bogotá's surroundings with extensive páramo and high-altitude wetlands.",
    color: "#7C3AED",
    gradient: "from-violet-500 to-purple-600",
    icon: Mountain,
    endemicSpeciesCount: 20,
    totalSpecies: 650,
    keyFeatures: ["Bogotá plateau", "Extensive páramo", "High-altitude wetlands"],
    coordinates: { x: 65, y: 45 },
    elevation: "500-5,400m",
    climate: "Montane tropical to alpine",
    bestTime: "December-March, June-August",
    area: "130,000 km²",
  },
  {
    id: "Interandean Valleys",
    name: "Interandean Valleys",
    fullName: "Inter-Andean Valleys",
    description:
      "Fertile valleys between mountain ranges with critically endangered dry forests, including Cauca and Magdalena valleys.",
    color: "#F59E0B",
    gradient: "from-amber-500 to-orange-600",
    icon: Leaf,
    endemicSpeciesCount: 12,
    totalSpecies: 550,
    keyFeatures: ["Dry forest remnants", "Agricultural landscapes", "River systems"],
    coordinates: { x: 45, y: 55 },
    elevation: "200-2,000m",
    climate: "Tropical dry to humid",
    bestTime: "December-March, July-August",
    area: "212,000 km²",
  },
  {
    id: "Caribbean",
    name: "Caribbean Coast",
    fullName: "Caribbean Coastal Plains",
    description:
      "Coastal plains with dry forests, wetlands, and the unique San Andrés archipelago, featuring distinct Caribbean ecosystems.",
    color: "#3B82F6",
    gradient: "from-blue-400 to-cyan-500",
    icon: Waves,
    endemicSpeciesCount: 6,
    totalSpecies: 635,
    keyFeatures: ["Coastal ecosystems", "Dry forests", "San Andrés archipelago"],
    coordinates: { x: 50, y: 15 },
    elevation: "0-500m",
    climate: "Tropical dry to semi-arid",
    bestTime: "December-April",
    area: "132,000 km²",
  },
  {
    id: "SNSM",
    name: "Sierra Nevada de Santa Marta",
    fullName: "Sierra Nevada de Santa Marta",
    description:
      "World's highest coastal mountain range with exceptional endemism per unit area, rising from sea level to snow-capped peaks.",
    color: "#06B6D4",
    gradient: "from-cyan-500 to-blue-500",
    icon: Mountain,
    endemicSpeciesCount: 23,
    totalSpecies: 635,
    keyFeatures: ["Highest coastal mountain", "Exceptional endemism", "All climate zones"],
    coordinates: { x: 60, y: 20 },
    elevation: "0-5,775m",
    climate: "Tropical to alpine",
    bestTime: "December-March, July-August",
    area: "17,000 km²",
  },
  {
    id: "Llanos",
    name: "Llanos",
    fullName: "Llanos Orientales",
    description:
      "Vast tropical grasslands extending into Venezuela with seasonal wetlands and gallery forests, supporting diverse waterbird communities.",
    color: "#EAB308",
    gradient: "from-yellow-400 to-amber-500",
    icon: Sun,
    endemicSpeciesCount: 0,
    totalSpecies: 450,
    keyFeatures: ["Tropical grasslands", "Seasonal wetlands", "Gallery forests"],
    coordinates: { x: 75, y: 40 },
    elevation: "100-500m",
    climate: "Tropical savanna",
    bestTime: "December-March",
    area: "250,000 km²",
  },
  {
    id: "Amazonia",
    name: "Amazonia",
    fullName: "Amazon Basin",
    description:
      "Colombia's portion of the world's largest rainforest with unique tepui formations and incredible biodiversity.",
    color: "#16A34A",
    gradient: "from-green-500 to-emerald-600",
    icon: TreePine,
    endemicSpeciesCount: 1,
    totalSpecies: 1250,
    keyFeatures: ["Lowland rainforest", "Tepui formations", "River systems"],
    coordinates: { x: 60, y: 75 },
    elevation: "100-3,000m",
    climate: "Tropical rainforest",
    bestTime: "June-September",
    area: "483,000 km²",
  },
  {
    id: "Massif",
    name: "Massif",
    fullName: "Colombian Massif",
    description:
      "Mountainous region where the Andes divide into three ranges, featuring páramo and cloud forest ecosystems.",
    color: "#BE185D",
    gradient: "from-pink-600 to-rose-700",
    icon: Mountain,
    endemicSpeciesCount: 3,
    totalSpecies: 380,
    keyFeatures: ["Andean division point", "Páramo ecosystems", "Water sources"],
    coordinates: { x: 45, y: 65 },
    elevation: "1,000-4,750m",
    climate: "Montane tropical to alpine",
    bestTime: "December-March, June-August",
    area: "35,000 km²",
  },
]

interface SpeciesModalProps {
  species: (typeof birdSpeciesData)[0] | null
  isOpen: boolean
  onClose: () => void
  onBookTour: (species: (typeof birdSpeciesData)[0]) => void
}

function SpeciesModal({ species, isOpen, onClose, onBookTour }: SpeciesModalProps) {
  if (!species) return null

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

  const getConservationIcon = (status: string) => {
    switch (status) {
      case "Critically Endangered":
      case "Endangered":
        return <AlertTriangle className="w-4 h-4" />
      case "Vulnerable":
      case "Near Threatened":
        return <Info className="w-4 h-4" />
      default:
        return <Bird className="w-4 h-4" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Bird className="w-6 h-6 text-emerald-600" />
            {species.commonName}
          </DialogTitle>
          <DialogDescription className="text-lg italic">{species.scientificName}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Species Image */}
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={species.imageUrl || "/placeholder.svg"}
              alt={species.commonName}
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <Badge className={`${getConservationColor(species.conservationStatus)} flex items-center gap-2`}>
                {getConservationIcon(species.conservationStatus)}
                {species.conservationStatus}
              </Badge>
              {species.isEndemic && (
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Endemic</Badge>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Spanish Name</h4>
                <p className="text-gray-700">{species.spanishName}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Habitat</h4>
                <p className="text-gray-700">{species.habitat}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Elevation Range</h4>
                <p className="text-gray-700">{species.elevation}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Best Viewing Time</h4>
                <p className="text-gray-700">{species.bestTime}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Regions</h4>
                <div className="flex flex-wrap gap-2">
                  {species.regions.map((region) => (
                    <Badge key={region} variant="outline">
                      {region}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Category</h4>
                <Badge
                  className={
                    species.isEndemic
                      ? "bg-emerald-100 text-emerald-800"
                      : species.category === "Spectacular"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                  }
                >
                  {species.category}
                </Badge>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
            <p className="text-gray-700 leading-relaxed">{species.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button asChild className="flex-1">
              <a href={species.ebirdUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                View on eBird
              </a>
            </Button>
            <Button onClick={() => onBookTour(species)} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Book Tour
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function ColombianAvifaunaExplorer() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [selectedSpecies, setSelectedSpecies] = useState<(typeof birdSpeciesData)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Initialize from URL parameters
  useEffect(() => {
    const region = searchParams.get("region")
    const species = searchParams.get("species")

    if (region) {
      setSelectedRegion(region)
    }
    if (species) {
      setSearchTerm(species)
    }
  }, [searchParams])

  // Get current region data
  const currentRegion = selectedRegion ? regionsData.find((r) => r.id === selectedRegion) : null

  // Filter species based on current selection
  const filteredSpecies = useMemo(() => {
    let filtered = birdSpeciesData

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (species) =>
          species.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          species.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          species.spanishName.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (categoryFilter !== "all") {
      if (categoryFilter === "endemic") {
        filtered = filtered.filter((species) => species.isEndemic)
      } else {
        filtered = filtered.filter((species) => species.category === categoryFilter)
      }
    }

    // Filter by region
    if (selectedRegion) {
      filtered = filtered.filter((species) => species.regions.includes(selectedRegion))
    }

    return filtered
  }, [searchTerm, selectedRegion, categoryFilter])

  const handleSpeciesClick = (species: (typeof birdSpeciesData)[0]) => {
    setSelectedSpecies(species)
    setIsModalOpen(true)
  }

  const handleRegionClick = (regionId: string) => {
    if (selectedRegion === regionId) {
      setSelectedRegion(null)
      router.push("/avifauna-explorer", { scroll: false })
    } else {
      setSelectedRegion(regionId)
      router.push(`/avifauna-explorer?region=${encodeURIComponent(regionId)}`, { scroll: false })
    }
  }

  const handleBookTour = (species: (typeof birdSpeciesData)[0]) => {
    const regions = species.regions.join(",")
    router.push(`/shopping?regions=${encodeURIComponent(regions)}&species=${encodeURIComponent(species.commonName)}`)
  }

  const resetSelection = () => {
    setSelectedRegion(null)
    setSearchTerm("")
    setCategoryFilter("all")
    router.push("/avifauna-explorer", { scroll: false })
  }

  const totalSpecies = birdSpeciesData.length
  const endemicCount = birdSpeciesData.filter((s) => s.isEndemic).length

  return (
    <div className="space-y-8">
      {/* Introduction Section */}
      <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 border-emerald-200">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <div className="bg-emerald-100 p-2 rounded-full">
              <Bird className="w-6 h-6 text-emerald-600" />
            </div>
            Colombian Avifauna Explorer
          </CardTitle>
          <CardDescription className="text-lg">
            Discover Colombia's incredible bird diversity across 11 distinct biogeographic regions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">World's Most Diverse Avifauna</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Colombia is home to more bird species than any other country in the world, with over 1,900 recorded
                species. This extraordinary diversity includes endemic species found nowhere else on Earth, spectacular
                residents, and remarkable migrants that make Colombia a premier birding destination.
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-emerald-600">{endemicCount}+</div>
                  <div className="text-sm text-gray-600">Endemic Species</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">1,900+</div>
                  <div className="text-sm text-gray-600">Total Species</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Explore by Category</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our avifauna explorer showcases different categories of Colombian birds, from endemic species to
                spectacular residents and common favorites that delight birders worldwide.
              </p>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-gray-700">
                    <strong>Endemic:</strong> Found only in Colombia
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <span className="text-gray-700">
                    <strong>Spectacular:</strong> Iconic and sought-after species
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-gray-700">
                    <strong>Common Favorites:</strong> Beloved resident species
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Map Section */}
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                Interactive Biogeographic Regions Map
              </CardTitle>
              <CardDescription>
                Click on any region to explore its bird species. Each region represents a distinct biogeographic area
                with unique characteristics and specialized avifauna.
              </CardDescription>
            </div>
            {selectedRegion && (
              <Button variant="outline" onClick={resetSelection} size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Reset View
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {/* Navigation Breadcrumb */}
          {selectedRegion && (
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
              <button onClick={resetSelection} className="hover:text-emerald-600 transition-colors">
                All Regions
              </button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">{currentRegion?.name}</span>
            </div>
          )}

          {/* Map Container */}
          <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 mb-6">
            <div className="relative mx-auto max-w-3xl">
              {/* Base Map Image */}
              <div className="relative">
                <img
                  src="/images/birding-regions-colombia.png"
                  alt="Colombia Birding Regions Map"
                  className="w-full h-auto opacity-90 rounded-lg shadow-sm"
                />

                {/* Interactive Overlay */}
                <div className="absolute inset-0">
                  {/* Region Markers */}
                  {regionsData.map((region) => {
                    const IconComponent = region.icon
                    const isSelected = selectedRegion === region.id
                    return (
                      <button
                        key={region.id}
                        onClick={() => handleRegionClick(region.id)}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10"
                        style={{
                          left: `${region.coordinates.x}%`,
                          top: `${region.coordinates.y}%`,
                        }}
                      >
                        <div
                          className={`w-10 h-10 rounded-full bg-gradient-to-br ${region.gradient} shadow-lg group-hover:scale-110 transition-all duration-200 flex items-center justify-center ${
                            isSelected ? "ring-4 ring-white ring-opacity-60 scale-110" : ""
                          }`}
                        >
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20 border">
                          <div className="font-semibold text-gray-900">{region.name}</div>
                          <div className="text-gray-600">{region.endemicSpeciesCount} endemic species</div>
                          <div className="text-gray-500">{region.totalSpecies} total species</div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Region Information Panel */}
            {currentRegion && (
              <div className="mt-6 bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${currentRegion.gradient} flex items-center justify-center flex-shrink-0`}
                  >
                    <currentRegion.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{currentRegion.fullName}</h3>
                    <p className="text-gray-600 mb-4">{currentRegion.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Endemic Species:</span>
                        <div className="text-lg font-bold text-emerald-600">{currentRegion.endemicSpeciesCount}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Total Species:</span>
                        <div className="text-lg font-bold text-blue-600">{currentRegion.totalSpecies}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Elevation:</span>
                        <div className="text-sm text-gray-600">{currentRegion.elevation}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Best Time:</span>
                        <div className="text-sm text-gray-600">{currentRegion.bestTime}</div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="font-medium text-gray-700 text-sm">Key Features:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {currentRegion.keyFeatures.map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Region Overview */}
          {!selectedRegion && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {regionsData.map((region) => {
                const IconComponent = region.icon
                return (
                  <button
                    key={region.id}
                    onClick={() => handleRegionClick(region.id)}
                    className="text-left p-4 rounded-lg border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all group bg-white"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${region.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="font-medium text-gray-900 text-sm mb-1">{region.name}</h4>
                    <div className="text-xs text-gray-600">
                      <div className="font-medium text-emerald-600">{region.endemicSpeciesCount} endemic</div>
                      <div>{region.totalSpecies} total species</div>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Search and Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-emerald-600" />
            Explore Colombian Birds
            {currentRegion && ` in ${currentRegion.name}`}
          </CardTitle>
          <CardDescription>
            {filteredSpecies.length > 0
              ? `Showing ${filteredSpecies.length} species`
              : "No species found matching your criteria"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter Controls */}
          <div className="space-y-4 mb-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by common name, scientific name, or Spanish name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter by Category
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Categories</option>
                  <option value="endemic">Endemic Species</option>
                  <option value="Spectacular">Spectacular Species</option>
                  <option value="Common Favorites">Common Favorites</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Quick Stats</label>
                <div className="text-sm text-gray-600">
                  <div>Total: {totalSpecies} species</div>
                  <div>Endemic: {endemicCount} species</div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Quick Actions</label>
                <Button onClick={resetSelection} variant="outline" className="w-full bg-transparent">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset All Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Species Grid or No Data Message */}
          {filteredSpecies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSpecies.map((species) => (
                <Card
                  key={species.ebirdCode}
                  className="cursor-pointer hover:shadow-lg transition-shadow group"
                  onClick={() => handleSpeciesClick(species)}
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={species.imageUrl || "/placeholder.svg"}
                      alt={species.commonName}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Badge
                        className={
                          species.isEndemic
                            ? "bg-emerald-100 text-emerald-800"
                            : species.category === "Spectacular"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-blue-100 text-blue-800"
                        }
                      >
                        {species.category}
                      </Badge>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge
                        variant="secondary"
                        className={`${
                          species.conservationStatus === "Critically Endangered"
                            ? "bg-red-100 text-red-800"
                            : species.conservationStatus === "Endangered"
                              ? "bg-orange-100 text-orange-800"
                              : species.conservationStatus === "Vulnerable"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                        }`}
                      >
                        {species.conservationStatus}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                      {species.commonName}
                    </h3>
                    <p className="text-sm italic text-gray-600 mb-2">{species.scientificName}</p>
                    <p className="text-sm text-gray-500 mb-3">{species.spanishName}</p>
                    <div className="space-y-2 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{species.elevation}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{species.bestTime}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mt-3 line-clamp-2">{species.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bird className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Species Found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || categoryFilter !== "all" || selectedRegion
                  ? "No species found matching your search criteria. Try adjusting your filters."
                  : "Start exploring by selecting a region or searching for specific species."}
              </p>
              {(searchTerm || categoryFilter !== "all" || selectedRegion) && (
                <Button variant="outline" onClick={resetSelection}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Clear All Filters
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Experience Colombia's Incredible Birds?</h2>
          <p className="text-lg opacity-90 mb-6 max-w-3xl mx-auto">
            Join our expert-guided tours to witness these incredible species in their natural habitats. From endemic
            species to spectacular residents, discover the birds that make Colombia the world's premier birding
            destination.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-white/20 rounded-full p-3 w-fit mx-auto mb-3">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Expert Local Guides</h3>
              <p className="text-sm opacity-80">Learn from passionate birders who know every call and habitat</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-full p-3 w-fit mx-auto mb-3">
                <Binoculars className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Premium Equipment</h3>
              <p className="text-sm opacity-80">High-quality optics and field guides for the best experience</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-full p-3 w-fit mx-auto mb-3">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Conservation Focus</h3>
              <p className="text-sm opacity-80">Support local communities and bird conservation efforts</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-50">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Book Your Birding Adventure
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              <ExternalLink className="w-5 h-5 mr-2" />
              View All Tours
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Species Modal */}
      <SpeciesModal
        species={selectedSpecies}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBookTour={handleBookTour}
      />
    </div>
  )
}
