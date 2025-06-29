"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  MapPin,
  Bird,
  TreePine,
  Mountain,
  Users,
  ChevronRight,
  Waves,
  Leaf,
  Sun,
  ShoppingBag,
  Globe,
  BookOpen,
  Heart,
  Camera,
  TelescopeIcon as Binoculars,
  ExternalLink,
  Share2,
  Facebook,
  Twitter,
  Instagram,
  ArrowRight,
  Info,
  Shield,
  Target,
} from "lucide-react"

// Complete bioregions data with all necessary information
const bioregionsData = [
  {
    id: "Pacific",
    name: "Pacific Coast",
    fullName: "Pacific Coast & Chocó",
    shortDescription: "World's most biodiverse rainforest with extraordinary rainfall and endemic species",
    detailedDescription:
      "The Pacific Coast bioregion encompasses the Chocó biogeographic region, recognized as having the highest biodiversity per square kilometer on Earth. With annual rainfall exceeding 10,000mm in some areas, this region supports an incredible array of endemic bird species found nowhere else on the planet.",
    endemicCount: 67,
    totalSpecies: 875,
    keyBirds: ["Chocó Vireo", "Harpy Eagle", "Great Green Macaw", "Banded Ground-Cuckoo", "Beautiful Treerunner"],
    coordinates: { x: 15, y: 45 },
    color: "#10B981",
    gradient: "from-emerald-500 to-green-600",
    icon: TreePine,
    habitat: "Lowland rainforest, cloud forest, mangroves",
    elevation: "0-4,000m",
    bestTime: "January-March, July-September",
    threats: ["Deforestation", "Mining", "Infrastructure development"],
    conservation: "UNESCO Biosphere Reserve status",
  },
  {
    id: "Western Andes",
    name: "Western Andes",
    fullName: "Cordillera Occidental",
    shortDescription: "Highest concentration of endemic bird species with cloud forests and páramo ecosystems",
    detailedDescription:
      "The Western Andes represent Colombia's most endemic-rich mountain range, featuring diverse elevational zones from tropical lowlands to high-altitude páramo. This bioregion contains the highest concentration of endemic bird species per unit area in Colombia.",
    endemicCount: 45,
    totalSpecies: 785,
    keyBirds: [
      "Gorgeted Puffleg",
      "Andean Cock-of-the-rock",
      "Cauca Guan",
      "Chestnut Wood-Quail",
      "Rusty-faced Parrot",
    ],
    coordinates: { x: 35, y: 50 },
    color: "#8B5CF6",
    gradient: "from-purple-500 to-indigo-600",
    icon: Mountain,
    habitat: "Cloud forest, montane forest, páramo",
    elevation: "1,000-4,250m",
    bestTime: "December-March, June-August",
    threats: ["Coffee expansion", "Mining", "Habitat fragmentation"],
    conservation: "Multiple protected areas covering 35% of region",
  },
  {
    id: "Central Andes",
    name: "Central Andes",
    fullName: "Cordillera Central",
    shortDescription: "Coffee Triangle region with diverse montane ecosystems and Colombia's highest peaks",
    detailedDescription:
      "Home to Colombia's Coffee Cultural Landscape and the country's highest peaks, the Central Andes feature volcanic soils and diverse montane ecosystems. This region combines traditional coffee cultivation with important bird conservation areas.",
    endemicCount: 34,
    totalSpecies: 720,
    keyBirds: [
      "Indigo-winged Parrot",
      "Yellow-eared Parrot",
      "Multicolored Tanager",
      "Tolima Dove",
      "Brown-banded Antpitta",
    ],
    coordinates: { x: 50, y: 50 },
    color: "#DC2626",
    gradient: "from-red-500 to-rose-600",
    icon: Mountain,
    habitat: "Montane forest, coffee plantations, páramo",
    elevation: "1,000-5,400m",
    bestTime: "December-March, June-August",
    threats: ["Agricultural expansion", "Urban development", "Climate change"],
    conservation: "UNESCO World Heritage Coffee Cultural Landscape",
  },
  {
    id: "Eastern Andes",
    name: "Eastern Andes",
    fullName: "Cordillera Oriental",
    shortDescription: "Bogotá's surroundings with extensive páramo and high-altitude wetlands",
    detailedDescription:
      "The Eastern Andes include the Bogotá plateau and extensive páramo ecosystems that serve as Colombia's water towers. This bioregion features unique high-altitude wetlands and specialized bird communities adapted to cool mountain climates.",
    endemicCount: 23,
    totalSpecies: 650,
    keyBirds: ["Apolinar's Wren", "Bogotá Rail", "Andean Flamingo", "Noble Snipe", "Silvery-throated Spinetail"],
    coordinates: { x: 65, y: 45 },
    color: "#7C3AED",
    gradient: "from-violet-500 to-purple-600",
    icon: Mountain,
    habitat: "Páramo, high-altitude wetlands, montane forest",
    elevation: "500-5,400m",
    bestTime: "December-March, June-August",
    threats: ["Water extraction", "Urban expansion", "Agriculture"],
    conservation: "Critical páramo protection for water security",
  },
  {
    id: "Interandean Valleys",
    name: "Interandean Valleys",
    fullName: "Inter-Andean Valleys",
    shortDescription: "Critically endangered dry forests between mountain ranges with unique endemic species",
    detailedDescription:
      "The fertile valleys between Colombia's mountain ranges once supported extensive dry forests, now among the world's most threatened ecosystems. These valleys harbor unique endemic species adapted to seasonal dry conditions.",
    endemicCount: 18,
    totalSpecies: 550,
    keyBirds: ["Niceforo's Wren", "Magdalena Antbird", "Sooty Ant-Tanager", "Apical Flycatcher", "Greyish Piculet"],
    coordinates: { x: 45, y: 55 },
    color: "#F59E0B",
    gradient: "from-amber-500 to-orange-600",
    icon: Leaf,
    habitat: "Dry forest remnants, agricultural landscapes",
    elevation: "200-2,000m",
    bestTime: "December-March, July-August",
    threats: ["Agricultural conversion", "Cattle ranching", "Urban development"],
    conservation: "Habitat restoration projects underway",
  },
  {
    id: "Caribbean",
    name: "Caribbean Coast",
    fullName: "Caribbean Coastal Plains",
    shortDescription: "Coastal plains with dry forests, wetlands, and the unique San Andrés archipelago",
    detailedDescription:
      "The Caribbean Coast features diverse ecosystems from arid deserts to coastal wetlands, including the unique San Andrés archipelago. This region supports important migratory bird populations and endemic Caribbean species.",
    endemicCount: 12,
    totalSpecies: 635,
    keyBirds: [
      "Caribbean Flamingo",
      "Brown Pelican",
      "Magnificent Frigatebird",
      "Vermilion Cardinal",
      "Chestnut-winged Chachalaca",
    ],
    coordinates: { x: 50, y: 15 },
    color: "#3B82F6",
    gradient: "from-blue-400 to-cyan-500",
    icon: Waves,
    habitat: "Coastal wetlands, dry forest, mangroves",
    elevation: "0-500m",
    bestTime: "December-April",
    threats: ["Coastal development", "Tourism pressure", "Sea level rise"],
    conservation: "Marine protected areas and coastal reserves",
  },
  {
    id: "SNSM",
    name: "Sierra Nevada de Santa Marta",
    fullName: "Sierra Nevada de Santa Marta",
    shortDescription: "World's highest coastal mountain with exceptional endemism per unit area",
    detailedDescription:
      "Rising from Caribbean beaches to snow-capped peaks in just 42km, the Sierra Nevada de Santa Marta is the world's highest coastal mountain range. This isolated massif has the highest level of endemism per unit area on Earth.",
    endemicCount: 79,
    totalSpecies: 635,
    keyBirds: [
      "Santa Marta Parakeet",
      "White-tailed Starfrontlet",
      "Blue-billed Curassow",
      "Santa Marta Antbird",
      "Santa Marta Bush-Tyrant",
    ],
    coordinates: { x: 60, y: 20 },
    color: "#06B6D4",
    gradient: "from-cyan-500 to-blue-500",
    icon: Mountain,
    habitat: "All climate zones from tropical to alpine",
    elevation: "0-5,775m",
    bestTime: "December-March, July-August",
    threats: ["Coffee cultivation", "Tourism development", "Climate change"],
    conservation: "UNESCO Biosphere Reserve, indigenous territories",
  },
  {
    id: "Llanos",
    name: "Llanos",
    fullName: "Llanos Orientales",
    shortDescription: "Vast tropical grasslands with seasonal wetlands supporting diverse waterbird communities",
    detailedDescription:
      "The Llanos are vast tropical grasslands that flood seasonally, creating one of South America's most important waterbird habitats. This region supports massive congregations of waterfowl and wading birds during the wet season.",
    endemicCount: 8,
    totalSpecies: 450,
    keyBirds: ["Jabiru", "Orinoco Goose", "Scarlet Ibis", "Sunbittern", "Orinocan Saltator"],
    coordinates: { x: 75, y: 40 },
    color: "#EAB308",
    gradient: "from-yellow-400 to-amber-500",
    icon: Sun,
    habitat: "Tropical grasslands, seasonal wetlands, gallery forests",
    elevation: "100-500m",
    bestTime: "December-March",
    threats: ["Cattle ranching", "Agricultural conversion", "Oil extraction"],
    conservation: "Sustainable ranching initiatives",
  },
  {
    id: "Amazonia",
    name: "Amazonia",
    fullName: "Amazon Basin",
    shortDescription: "Colombia's portion of the world's largest rainforest with incredible biodiversity",
    detailedDescription:
      "Colombia's Amazon region represents the northern edge of the world's largest rainforest, featuring unique tepui formations and incredible biodiversity. This region harbors many species yet to be discovered by science.",
    endemicCount: 45,
    totalSpecies: 1250,
    keyBirds: ["Harpy Eagle", "Zigzag Heron", "Amazonian Umbrellabird", "Capped Heron", "Pavonine Quetzal"],
    coordinates: { x: 60, y: 75 },
    color: "#16A34A",
    gradient: "from-green-500 to-emerald-600",
    icon: TreePine,
    habitat: "Lowland rainforest, tepui formations, river systems",
    elevation: "100-3,000m",
    bestTime: "June-September",
    threats: ["Deforestation", "Mining", "Infrastructure development"],
    conservation: "Indigenous territories protecting 80% of forest",
  },
  {
    id: "Massif",
    name: "Colombian Massif",
    fullName: "Colombian Massif",
    shortDescription: "Where the Andes divide into three ranges with páramo and cloud forest ecosystems",
    detailedDescription:
      "The Colombian Massif is where the Andes mountain system divides into three separate ranges. This region serves as a critical watershed and features unique páramo and cloud forest ecosystems.",
    endemicCount: 15,
    totalSpecies: 380,
    keyBirds: [
      "Stiles's Tapaculo",
      "Colorful Puffleg",
      "Golden-plumed Parakeet",
      "Masked Mountain-Tanager",
      "Lacrimose Mountain-Tanager",
    ],
    coordinates: { x: 45, y: 65 },
    color: "#BE185D",
    gradient: "from-pink-600 to-rose-700",
    icon: Mountain,
    habitat: "Páramo, cloud forest, montane forest",
    elevation: "1,000-4,750m",
    bestTime: "December-March, June-August",
    threats: ["Agricultural expansion", "Infrastructure development", "Climate change"],
    conservation: "National parks protecting critical watersheds",
  },
  {
    id: "Marine",
    name: "Marine Regions",
    fullName: "Caribbean & Pacific Marine",
    shortDescription: "Two ocean systems with coral reefs, mangroves, and diverse marine life",
    detailedDescription:
      "Colombia's marine ecosystems span two oceans, featuring Caribbean coral reefs and Pacific upwelling systems. These waters support diverse seabird communities and serve as critical migration corridors.",
    endemicCount: 20,
    totalSpecies: 341,
    keyBirds: ["Brown Pelican", "Magnificent Frigatebird", "Red-billed Tropicbird", "Masked Booby", "Bridled Tern"],
    coordinates: { x: 25, y: 25 },
    color: "#0EA5E9",
    gradient: "from-sky-500 to-blue-600",
    icon: Waves,
    habitat: "Coral reefs, mangroves, open ocean",
    elevation: "0-4,000m depth",
    bestTime: "December-April (Caribbean), June-November (Pacific)",
    threats: ["Overfishing", "Coastal development", "Climate change", "Pollution"],
    conservation: "Marine protected areas and UNESCO sites",
  },
]

// Ecoregions data for the explorer section
const ecoregionsData = [
  {
    name: "Chocó-Darién Moist Forests",
    priority: "Critical",
    description: "World's most biodiverse rainforest per square kilometer",
    species: 875,
    threats: ["Deforestation", "Mining", "Infrastructure"],
  },
  {
    name: "Northwestern Andean Montane Forests",
    priority: "Vulnerable",
    description: "Cloud forests with exceptional bird diversity",
    species: 785,
    threats: ["Coffee expansion", "Mining", "Deforestation"],
  },
  {
    name: "Magdalena Valley Dry Forests",
    priority: "Critical",
    description: "Critically endangered dry forest ecosystem",
    species: 320,
    threats: ["Agriculture", "Cattle ranching", "Urban development"],
  },
  {
    name: "Santa Marta Montane Forests",
    priority: "Critical",
    description: "Highest endemism per unit area globally",
    species: 635,
    threats: ["Coffee cultivation", "Tourism", "Infrastructure"],
  },
  {
    name: "Southwest Amazon Moist Forests",
    priority: "Stable",
    description: "Colombia's portion of world's largest rainforest",
    species: 1250,
    threats: ["Deforestation", "Mining", "Infrastructure"],
  },
  {
    name: "Northern Andean Páramo",
    priority: "Vulnerable",
    description: "High-altitude tropical alpine ecosystem",
    species: 180,
    threats: ["Climate change", "Water extraction", "Agriculture"],
  },
]

export function ColombianBirdsExplorer() {
  const router = useRouter()
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  const currentRegion = selectedRegion ? bioregionsData.find((r) => r.id === selectedRegion) : null

  const handleRegionClick = (regionId: string) => {
    if (selectedRegion === regionId) {
      setSelectedRegion(null)
    } else {
      setSelectedRegion(regionId)
    }
  }

  const resetSelection = () => {
    setSelectedRegion(null)
  }

  const shareOnSocial = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent("Explore Colombia's incredible bird diversity!")

    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      instagram: `https://www.instagram.com/`,
    }

    window.open(urls[platform as keyof typeof urls], "_blank", "width=600,height=400")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
      {/* 1. Page Title and Introduction */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-to-br from-emerald-500 to-blue-600 p-6 rounded-full shadow-xl">
                <Bird className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">Explore Colombian Birds</h1>
            <p className="text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed max-w-4xl mx-auto">
              Discover the world's most diverse avifauna across Colombia's extraordinary landscapes. With over 1,900
              bird species and 78+ endemics, Colombia offers unparalleled opportunities for birdwatching and
              conservation discovery.
            </p>

            <div className="flex justify-center gap-12 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600">1,900+</div>
                <div className="text-gray-600">Bird Species</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">78+</div>
                <div className="text-gray-600">Endemic Species</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600">11</div>
                <div className="text-gray-600">Bioregions</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white shadow-lg text-lg px-8 py-4"
                onClick={() => document.getElementById("bioregions-map")?.scrollIntoView({ behavior: "smooth" })}
              >
                <MapPin className="w-5 h-5 mr-2" />
                Explore Bioregions
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 bg-transparent text-lg px-8 py-4"
              >
                <Link href="/tours">
                  <Camera className="w-5 h-5 mr-2" />
                  Book Your Tour
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Colombia & Its Diversity */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Colombia & Its Diversity</h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Colombia stands as the world's most biodiverse country per square kilometer, a natural treasure
                  positioned at the crossroads of North and South America. This strategic location, combined with three
                  separate Andean mountain ranges and coastlines on both the Pacific Ocean and Caribbean Sea, creates an
                  extraordinary mosaic of ecosystems.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From sea level to snow-capped peaks at 5,775 meters, Colombia encompasses every climate zone on Earth.
                  The Amazon rainforest meets Andean cloud forests, Caribbean dry forests border Pacific rainforests,
                  and high-altitude páramo grasslands crown the mountains - each ecosystem supporting unique bird
                  communities found nowhere else.
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  This incredible diversity makes Colombia home to more bird species than any other country, with new
                  species still being discovered regularly by scientists and birdwatchers alike.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <div className="text-2xl font-bold text-emerald-600">31</div>
                    <div className="text-sm text-gray-600">Ecoregions</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">5,775m</div>
                    <div className="text-sm text-gray-600">Max Elevation</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-2xl font-bold text-purple-600">2 Oceans</div>
                    <div className="text-sm text-gray-600">Coastlines</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="relative overflow-hidden rounded-xl shadow-2xl">
                  <img
                    src="/images/birding-regions-colombia.png"
                    alt="Colombia's Diverse Landscapes and Bioregions"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-medium">Colombia's 11 Bioregions</p>
                    <p className="text-xs opacity-90">Interactive map below</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Bioregions + Ecoregion Definitions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Understanding Our Classification System</h2>
            <p className="text-lg text-gray-600">
              We use two complementary approaches to organize and understand Colombia's incredible biodiversity,
              ensuring both practical tour planning and scientific accuracy.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-emerald-600" />
                </div>
                <CardTitle className="text-2xl text-emerald-800">11 Bioregions</CardTitle>
                <CardDescription className="text-emerald-700">Practical Birding Approach</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-emerald-800">Tour-Optimized Boundaries:</strong> Geographic regions
                      designed for efficient birding tours and maximum species diversity per trip
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-emerald-800">Practical Logistics:</strong> Boundaries that make sense for
                      travel, accommodation, and field operations
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-emerald-800">Species Targeting:</strong> Regions organized to maximize
                      encounters with endemic and spectacular species
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-emerald-800">Conservation Focus:</strong> Aligned with local conservation
                      efforts and community-based tourism initiatives
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TreePine className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-blue-800">31 Ecoregions</CardTitle>
                <CardDescription className="text-blue-700">Scientific Classification</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-blue-800">Species Assemblages:</strong> Defined by distinctive groups of
                      species that occur together in specific environmental conditions
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-blue-800">Ecological Processes:</strong> Based on natural environmental
                      conditions, climate patterns, and habitat characteristics
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-blue-800">Conservation Priorities:</strong> WWF framework for identifying
                      critical areas for biodiversity protection
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-blue-800">Research Foundation:</strong> Scientific basis for biodiversity
                      assessment and ecosystem management
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto mt-12">
            <Card className="bg-gradient-to-r from-emerald-100 to-blue-100 border-emerald-300">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Perfect Integration</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Our bioregions encompass multiple ecoregions, providing both scientific accuracy and practical tour
                  organization. This dual approach ensures comprehensive coverage of Colombia's biodiversity while
                  maintaining operational efficiency for unforgettable birding experiences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. Colombia's 11 Bioregions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Colombia's 11 Bioregions</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Each bioregion represents a unique combination of geography, climate, and bird communities, offering
                distinct opportunities for discovery and conservation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bioregionsData.map((region) => {
                const IconComponent = region.icon
                return (
                  <Card
                    key={region.id}
                    className="hover:shadow-xl transition-all duration-300 group cursor-pointer border-2 border-gray-200 hover:border-emerald-300"
                    onClick={() => handleRegionClick(region.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${region.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                        >
                          <IconComponent className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors text-lg">
                            {region.name}
                          </h3>
                          <div className="text-sm text-emerald-600 font-medium">
                            {region.endemicCount} endemic • {region.totalSpecies} total species
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                        {region.shortDescription}
                      </p>

                      <div className="space-y-2 text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <Mountain className="w-3 h-3" />
                          <span>{region.elevation}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TreePine className="w-3 h-3" />
                          <span>{region.habitat}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                        <span className="text-xs text-gray-500">Best: {region.bestTime}</span>
                        <span className="text-emerald-600 font-medium text-sm group-hover:text-emerald-700">
                          Click to explore →
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bioregion Map */}
      <section id="bioregions-map" className="py-16 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Interactive Bioregions Map</h2>
              <p className="text-lg text-gray-600">
                Click on any region to discover its unique characteristics, key species, and conservation status
              </p>
            </div>

            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-2 border-emerald-200">
              <CardContent className="p-8">
                {/* Navigation Breadcrumb */}
                {selectedRegion && (
                  <div className="mb-8 flex items-center gap-2 text-lg bg-gray-50 p-4 rounded-lg">
                    <button
                      onClick={resetSelection}
                      className="hover:text-emerald-600 transition-colors font-medium flex items-center gap-2"
                    >
                      <ArrowRight className="w-4 h-4 rotate-180" />
                      All Bioregions
                    </button>
                    <ChevronRight className="w-5 h-5" />
                    <span className="text-gray-900 font-semibold">{currentRegion?.name}</span>
                  </div>
                )}

                {/* Map Container */}
                <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 mb-8 border border-emerald-100">
                  <div className="relative mx-auto max-w-4xl">
                    <img
                      src="/images/birding-regions-colombia.png"
                      alt="Colombia Interactive Bioregions Map"
                      className="w-full h-auto opacity-95 rounded-lg shadow-md"
                    />

                    {/* Interactive Overlay */}
                    <div className="absolute inset-0">
                      {bioregionsData.map((region) => {
                        const IconComponent = region.icon
                        const isSelected = selectedRegion === region.id
                        const isHovered = hoveredRegion === region.id
                        return (
                          <button
                            key={region.id}
                            onClick={() => handleRegionClick(region.id)}
                            onMouseEnter={() => setHoveredRegion(region.id)}
                            onMouseLeave={() => setHoveredRegion(null)}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10 focus:outline-none focus:ring-4 focus:ring-emerald-400 rounded-full transition-all duration-300"
                            style={{
                              left: `${region.coordinates.x}%`,
                              top: `${region.coordinates.y}%`,
                            }}
                            aria-label={`Explore ${region.name} bioregion`}
                          >
                            <div
                              className={`w-12 h-12 rounded-full bg-gradient-to-br ${region.gradient} shadow-lg group-hover:scale-125 transition-all duration-300 flex items-center justify-center ${
                                isSelected ? "ring-4 ring-white ring-opacity-90 scale-125" : ""
                              }`}
                            >
                              <IconComponent className="w-6 h-6 text-white" />
                            </div>
                            {isHovered && !isSelected && (
                              <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-white px-4 py-3 rounded-lg shadow-xl text-sm font-medium whitespace-nowrap z-20 border border-gray-200">
                                <div className="font-bold text-gray-900">{region.name}</div>
                                <div className="text-emerald-600 font-semibold">
                                  {region.endemicCount} endemic species
                                </div>
                                <div className="text-gray-500">{region.totalSpecies} total species</div>
                                <div className="text-xs text-emerald-600 mt-1">Click to explore</div>
                              </div>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Region Details Panel */}
                {currentRegion && (
                  <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-16 h-16 rounded-xl bg-gradient-to-br ${currentRegion.gradient} flex items-center justify-center shadow-lg`}
                          >
                            <currentRegion.icon className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-2xl text-gray-900">{currentRegion.fullName}</CardTitle>
                            <CardDescription className="text-lg mt-1 text-gray-600">
                              {currentRegion.habitat} • {currentRegion.elevation}
                            </CardDescription>
                          </div>
                        </div>
                        <Button variant="ghost" onClick={resetSelection} className="text-gray-500 hover:text-gray-700">
                          ✕
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-6 leading-relaxed text-lg">{currentRegion.detailedDescription}</p>

                      <div className="grid md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                          <div className="text-2xl font-bold text-emerald-600">{currentRegion.endemicCount}</div>
                          <div className="text-sm text-gray-600">Endemic Species</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                          <div className="text-2xl font-bold text-blue-600">{currentRegion.totalSpecies}</div>
                          <div className="text-sm text-gray-600">Total Species</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                          <div className="text-lg font-bold text-purple-600">{currentRegion.bestTime}</div>
                          <div className="text-sm text-gray-600">Best Season</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                          <div className="text-lg font-bold text-orange-600">
                            {currentRegion.conservation.includes("UNESCO") ? "UNESCO" : "Protected"}
                          </div>
                          <div className="text-sm text-gray-600">Status</div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Bird className="w-5 h-5 text-emerald-600" />
                          Key Bird Species:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {currentRegion.keyBirds.map((bird, index) => (
                            <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                              {bird}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Shield className="w-5 h-5 text-red-600" />
                          Conservation Threats:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {currentRegion.threats.map((threat, index) => (
                            <Badge key={index} variant="destructive" className="text-sm px-3 py-1">
                              {threat}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button asChild className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                          <Link href={`/tours?region=${currentRegion.id}`}>
                            <Camera className="w-4 h-4 mr-2" />
                            Book Tour
                          </Link>
                        </Button>
                        <Button variant="outline" asChild className="flex-1 bg-transparent">
                          <Link href="/contact">
                            <Users className="w-4 h-4 mr-2" />
                            Plan Custom Visit
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 6. Colombia's Ecoregions Explorer */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Colombia's Ecoregions Explorer</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Dive deeper into the scientific classification of Colombia's ecosystems. Our 31 ecoregions provide the
                foundation for conservation efforts and biodiversity research worldwide.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Ecoregions Matter for Bird Conservation</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Target className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Conservation Planning</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Ecoregions help identify priority areas for habitat protection and restoration efforts, ensuring
                        the most critical bird habitats receive focused conservation attention.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bird className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Species Research</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Understanding species assemblages and their ecological relationships within specific habitats
                        helps scientists predict climate change impacts and plan conservation strategies.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Globe className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Global Standards</h4>
                      <p className="text-gray-600 leading-relaxed">
                        WWF ecoregions provide internationally recognized frameworks for biodiversity assessment,
                        enabling global conservation coordination and funding allocation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-6 bg-red-50 rounded-xl border-2 border-red-200">
                  <div className="text-4xl font-bold text-red-600 mb-2">8</div>
                  <div className="text-sm text-gray-600 font-medium">Critical Priority</div>
                  <div className="text-xs text-gray-500 mt-1">Immediate action needed</div>
                </div>
                <div className="text-center p-6 bg-orange-50 rounded-xl border-2 border-orange-200">
                  <div className="text-4xl font-bold text-orange-600 mb-2">12</div>
                  <div className="text-sm text-gray-600 font-medium">Vulnerable</div>
                  <div className="text-xs text-gray-500 mt-1">Threatened ecosystems</div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-xl border-2 border-green-200">
                  <div className="text-4xl font-bold text-green-600 mb-2">11</div>
                  <div className="text-sm text-gray-600 font-medium">Stable</div>
                  <div className="text-xs text-gray-500 mt-1">Well-protected areas</div>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                  <div className="text-4xl font-bold text-blue-600 mb-2">31</div>
                  <div className="text-sm text-gray-600 font-medium">Total Ecoregions</div>
                  <div className="text-xs text-gray-500 mt-1">Complete coverage</div>
                </div>
              </div>
            </div>

            {/* Featured Ecoregions Gallery */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Featured Ecoregions</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ecoregionsData.map((ecoregion, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-emerald-500">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-gray-900 text-lg leading-tight">{ecoregion.name}</h4>
                        <Badge
                          className={`text-xs font-medium ${
                            ecoregion.priority === "Critical"
                              ? "bg-red-100 text-red-800 border-red-200"
                              : ecoregion.priority === "Vulnerable"
                                ? "bg-orange-100 text-orange-800 border-orange-200"
                                : "bg-green-100 text-green-800 border-green-200"
                          }`}
                        >
                          {ecoregion.priority}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed text-sm">{ecoregion.description}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium text-emerald-600">{ecoregion.species} species</span>
                        <span className="text-gray-500">{ecoregion.threats.length} main threats</span>
                      </div>
                      <div className="mt-3 text-xs text-gray-500">
                        <span>Threats: {ecoregion.threats.join(", ")}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-emerald-100 p-4 rounded-full">
                    <BookOpen className="w-8 h-8 text-emerald-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Explore Detailed Ecoregion Database</h3>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
                  Access comprehensive scientific data, complete species lists, conservation status reports, and
                  detailed habitat information for each of Colombia's 31 ecoregions. Perfect for researchers,
                  conservationists, and serious birders.
                </p>
                <div className="flex justify-center">
                  <Button size="lg" variant="outline" className="bg-transparent" asChild>
                    <Link
                      href="https://www.arcgis.com/apps/View/index.html?appid=d60ec415febb4874ac5e0960a6a2e448"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      WWF Global Database
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 7. Explore Further */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Main Call to Action */}
            <div className="text-center mb-16">
              <div className="flex justify-center mb-8">
                <div className="bg-white/20 p-6 rounded-full">
                  <Heart className="w-12 h-12 text-white" />
                </div>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Explore Further</h2>
              <p className="text-xl text-emerald-100 mb-8 leading-relaxed max-w-4xl mx-auto">
                Ready to experience Colombia's avian wonders? Join our expert-guided tours to witness incredible species
                in their natural habitats. From endemic hummingbirds in cloud forests to spectacular toucans in
                rainforest canopies, create memories that will last a lifetime while supporting local conservation
                efforts.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button asChild size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-4">
                  <Link href="/shopping">
                    <ShoppingBag className="w-6 h-6 mr-3" />
                    Book Your Adventure
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-emerald-600 text-lg px-8 py-4 bg-transparent"
                >
                  <Link href="/tours">
                    <Binoculars className="w-6 h-6 mr-3" />
                    Explore All Tours
                  </Link>
                </Button>
              </div>
            </div>

            {/* Why Choose Us & Resources Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {/* Expert Guides */}
              <div className="text-center">
                <div className="bg-white/10 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-10 h-10" />
                </div>
                <Button
                  asChild
                  className="bg-white/10 hover:bg-white text-white hover:text-emerald-600 border-0 text-xl font-bold py-3 px-6 mb-4 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Link href="/team">Expert Local Guides</Link>
                </Button>
                <p className="text-emerald-100 text-sm leading-relaxed">
                  Professional ornithologists and indigenous guides with deep local knowledge
                </p>
              </div>

              {/* Small Groups */}
              <div className="text-center">
                <div className="bg-white/10 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Target className="w-10 h-10" />
                </div>
                <Button
                  asChild
                  className="bg-white/10 hover:bg-white text-white hover:text-emerald-600 border-0 text-xl font-bold py-3 px-6 mb-4 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Link href="/tours">Intimate Group Experience</Link>
                </Button>
                <p className="text-emerald-100 text-sm leading-relaxed">
                  Small groups ensure personalized attention and exceptional wildlife encounters
                </p>
              </div>

              {/* Conservation Impact */}
              <div className="text-center">
                <div className="bg-white/10 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Shield className="w-10 h-10" />
                </div>
                <Button
                  asChild
                  className="bg-white/10 hover:bg-white text-white hover:text-emerald-600 border-0 text-xl font-bold py-3 px-6 mb-4 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Link href="/conservation">Conservation Impact</Link>
                </Button>
                <p className="text-emerald-100 text-sm leading-relaxed">
                  Every tour directly supports habitat protection and local communities
                </p>
              </div>
            </div>

            {/* Resources Section */}
            <div className="max-w-4xl mx-auto mb-16">
              <h3 className="text-3xl font-bold mb-8 text-center">Explore Our Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white hover:text-emerald-600 bg-transparent justify-start h-auto p-6 group"
                >
                  <Link href="/resources">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/10 p-3 rounded-lg group-hover:bg-emerald-600 transition-colors">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-lg">Birding Guides</div>
                        <div className="text-sm opacity-90">Field guides & species identification</div>
                      </div>
                    </div>
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white hover:text-emerald-600 bg-transparent justify-start h-auto p-6 group"
                >
                  <Link href="/blog">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/10 p-3 rounded-lg group-hover:bg-emerald-600 transition-colors">
                        <Camera className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-lg">Latest Trips</div>
                        <div className="text-sm opacity-90">Recent expeditions & discoveries</div>
                      </div>
                    </div>
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white hover:text-emerald-600 bg-transparent justify-start h-auto p-6 group"
                >
                  <Link href="/travel-tips">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/10 p-3 rounded-lg group-hover:bg-emerald-600 transition-colors">
                        <Info className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-lg">Travel Tips</div>
                        <div className="text-sm opacity-90">Essential birding preparation</div>
                      </div>
                    </div>
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white hover:text-emerald-600 bg-transparent justify-start h-auto p-6 group"
                >
                  <Link href="/contact">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/10 p-3 rounded-lg group-hover:bg-emerald-600 transition-colors">
                        <Users className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-lg">Contact Experts</div>
                        <div className="text-sm opacity-90">Plan your perfect birding adventure</div>
                      </div>
                    </div>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Social Media Sharing */}
            <div className="border-t border-white/20 pt-8 text-center">
              <h4 className="text-lg font-semibold mb-4">Share Colombia's Bird Diversity</h4>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => shareOnSocial("facebook")}
                  variant="outline"
                  size="sm"
                  className="border-white/30 text-white hover:bg-white hover:text-blue-600 bg-transparent"
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </Button>
                <Button
                  onClick={() => shareOnSocial("twitter")}
                  variant="outline"
                  size="sm"
                  className="border-white/30 text-white hover:bg-white hover:text-blue-400 bg-transparent"
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </Button>
                <Button
                  onClick={() => shareOnSocial("instagram")}
                  variant="outline"
                  size="sm"
                  className="border-white/30 text-white hover:bg-white hover:text-pink-600 bg-transparent"
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  Instagram
                </Button>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    alert("Link copied to clipboard!")
                  }}
                  variant="outline"
                  size="sm"
                  className="border-white/30 text-white hover:bg-white hover:text-emerald-600 bg-transparent"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
