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
} from "lucide-react"

// Bioregions data - streamlined for the new design
const bioregionsData = [
  {
    id: "Pacific",
    name: "Pacific Coast",
    shortDescription: "World's most biodiverse rainforest with extraordinary rainfall and endemic species",
    endemicCount: 67,
    totalSpecies: 875,
    keyBirds: ["Chocó Vireo", "Harpy Eagle", "Great Green Macaw"],
    coordinates: { x: 15, y: 45 },
    color: "#10B981",
    gradient: "from-emerald-500 to-green-600",
    icon: TreePine,
  },
  {
    id: "Western Andes",
    name: "Western Andes",
    shortDescription: "Highest concentration of endemic bird species with cloud forests and páramo",
    endemicCount: 45,
    totalSpecies: 785,
    keyBirds: ["Gorgeted Puffleg", "Andean Cock-of-the-rock", "Cauca Guan"],
    coordinates: { x: 35, y: 50 },
    color: "#8B5CF6",
    gradient: "from-purple-500 to-indigo-600",
    icon: Mountain,
  },
  {
    id: "Central Andes",
    name: "Central Andes",
    shortDescription: "Coffee Triangle region with diverse montane ecosystems and Colombia's highest peaks",
    endemicCount: 34,
    totalSpecies: 720,
    keyBirds: ["Indigo-winged Parrot", "Yellow-eared Parrot", "Mountain Tapir"],
    coordinates: { x: 50, y: 50 },
    color: "#DC2626",
    gradient: "from-red-500 to-rose-600",
    icon: Mountain,
  },
  {
    id: "Eastern Andes",
    name: "Eastern Andes",
    shortDescription: "Bogotá's surroundings with extensive páramo and high-altitude wetlands",
    endemicCount: 23,
    totalSpecies: 650,
    keyBirds: ["Apolinar's Wren", "Bogotá Rail", "Andean Flamingo"],
    coordinates: { x: 65, y: 45 },
    color: "#7C3AED",
    gradient: "from-violet-500 to-purple-600",
    icon: Mountain,
  },
  {
    id: "Interandean Valleys",
    name: "Interandean Valleys",
    shortDescription: "Critically endangered dry forests between mountain ranges",
    endemicCount: 18,
    totalSpecies: 550,
    keyBirds: ["Niceforo's Wren", "Magdalena Antbird", "Sooty Ant-Tanager"],
    coordinates: { x: 45, y: 55 },
    color: "#F59E0B",
    gradient: "from-amber-500 to-orange-600",
    icon: Leaf,
  },
  {
    id: "Caribbean",
    name: "Caribbean Coast",
    shortDescription: "Coastal plains with dry forests, wetlands, and San Andrés archipelago",
    endemicCount: 12,
    totalSpecies: 635,
    keyBirds: ["Caribbean Flamingo", "Brown Pelican", "Magnificent Frigatebird"],
    coordinates: { x: 50, y: 15 },
    color: "#3B82F6",
    gradient: "from-blue-400 to-cyan-500",
    icon: Waves,
  },
  {
    id: "SNSM",
    name: "Sierra Nevada de Santa Marta",
    shortDescription: "World's highest coastal mountain with exceptional endemism per unit area",
    endemicCount: 79,
    totalSpecies: 635,
    keyBirds: ["Santa Marta Parakeet", "White-tailed Starfrontlet", "Blue-billed Curassow"],
    coordinates: { x: 60, y: 20 },
    color: "#06B6D4",
    gradient: "from-cyan-500 to-blue-500",
    icon: Mountain,
  },
  {
    id: "Llanos",
    name: "Llanos",
    shortDescription: "Vast tropical grasslands with seasonal wetlands supporting diverse waterbirds",
    endemicCount: 8,
    totalSpecies: 450,
    keyBirds: ["Jabiru", "Orinoco Goose", "Scarlet Ibis"],
    coordinates: { x: 75, y: 40 },
    color: "#EAB308",
    gradient: "from-yellow-400 to-amber-500",
    icon: Sun,
  },
  {
    id: "Amazonia",
    name: "Amazonia",
    shortDescription: "Colombia's portion of the world's largest rainforest with incredible biodiversity",
    endemicCount: 45,
    totalSpecies: 1250,
    keyBirds: ["Harpy Eagle", "Zigzag Heron", "Amazonian Umbrellabird"],
    coordinates: { x: 60, y: 75 },
    color: "#16A34A",
    gradient: "from-green-500 to-emerald-600",
    icon: TreePine,
  },
  {
    id: "Massif",
    name: "Colombian Massif",
    shortDescription: "Where the Andes divide into three ranges with páramo and cloud forest ecosystems",
    endemicCount: 15,
    totalSpecies: 380,
    keyBirds: ["Nasa indigenous communities", "Coconuco thermal springs", "Archaeological sites"],
    coordinates: { x: 45, y: 65 },
    color: "#BE185D",
    gradient: "from-pink-600 to-rose-700",
    icon: Mountain,
  },
  {
    id: "Marine",
    name: "Marine Regions",
    shortDescription: "Two ocean systems with coral reefs, mangroves, and diverse marine life",
    endemicCount: 20,
    totalSpecies: 341,
    keyBirds: ["Brown Pelican", "Humpback Whale", "Hammerhead Shark"],
    coordinates: { x: 25, y: 25 },
    color: "#0EA5E9",
    gradient: "from-sky-500 to-blue-600",
    icon: Waves,
  },
]

// Sample bird species data
const featuredBirds = [
  {
    commonName: "Santa Marta Parakeet",
    scientificName: "Pyrrhura viridicata",
    region: "Sierra Nevada de Santa Marta",
    status: "Endangered",
    isEndemic: true,
    imageUrl: "/placeholder.svg?height=200&width=300&text=Santa+Marta+Parakeet",
  },
  {
    commonName: "Resplendent Quetzal",
    scientificName: "Pharomachrus mocinno",
    region: "Western Andes",
    status: "Near Threatened",
    isEndemic: false,
    imageUrl: "/images/resplendent-quetzal.jpg",
  },
  {
    commonName: "King Vulture",
    scientificName: "Sarcoramphus papa",
    region: "Amazonia",
    status: "Least Concern",
    isEndemic: false,
    imageUrl: "/images/king-vulture.jpg",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
      {/* Hero Section */}
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
              Discover the world's most diverse avifauna across Colombia's 11 distinct bioregions. From endemic
              hummingbirds to spectacular toucans, explore over 1,900 species in their natural habitats.
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

      {/* Colombia & Its Diversity */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Colombia & Its Diversity</h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Colombia is the world's most biodiverse country per square kilometer, positioned at the intersection
                  of North and South America. This strategic location, combined with three separate Andean mountain
                  ranges and access to both Pacific and Caribbean coasts, creates an extraordinary variety of
                  ecosystems.
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  From sea level to 5,775 meters elevation, Colombia encompasses Amazon rainforest, Andean cloud
                  forests, Caribbean dry forests, Pacific rainforest, and high-altitude páramo - each supporting unique
                  bird communities.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-emerald-50 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600">31</div>
                    <div className="text-sm text-gray-600">Ecoregions</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">5,775m</div>
                    <div className="text-sm text-gray-600">Max Elevation</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/images/birding-regions-colombia.png"
                  alt="Colombia's Diverse Landscapes"
                  className="w-full h-auto rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bioregions + Ecoregions Definitions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Understanding Our Classification System</h2>
            <p className="text-lg text-gray-600">
              We use two complementary approaches to organize Colombia's incredible biodiversity
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-emerald-600" />
                </div>
                <CardTitle className="text-2xl text-emerald-800">11 Bioregions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Practical approach</strong> designed for birding tours and operations
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Geographic boundaries</strong> that make sense for travel and logistics
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Species targeting</strong> optimized for maximum diversity per tour
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TreePine className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-blue-800">31 Ecoregions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Scientific classification</strong> based on species assemblages and habitats
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Conservation priorities</strong> defined by environmental conditions
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Research framework</strong> for biodiversity assessment and protection
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Colombia's 11 Bioregions List */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Colombia's 11 Bioregions</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Each bioregion represents a unique combination of geography, climate, and bird communities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bioregionsData.map((region) => {
                const IconComponent = region.icon
                return (
                  <Card
                    key={region.id}
                    className="hover:shadow-lg transition-shadow group cursor-pointer"
                    onClick={() => handleRegionClick(region.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${region.gradient} flex items-center justify-center shadow-md`}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                            {region.name}
                          </h3>
                          <div className="text-sm text-emerald-600 font-medium">
                            {region.endemicCount} endemic species
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{region.shortDescription}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{region.totalSpecies} total species</span>
                        <span className="text-emerald-600 font-medium">Click to explore →</span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Bioregion Map */}
      <section id="bioregions-map" className="py-16 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Interactive Bioregions Map</h2>
              <p className="text-lg text-gray-600">
                Click on any region to discover its unique bird species and characteristics
              </p>
            </div>

            <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-2 border-emerald-200">
              <CardContent className="p-8">
                {/* Navigation Breadcrumb */}
                {selectedRegion && (
                  <div className="mb-8 flex items-center gap-2 text-lg bg-gray-50 p-4 rounded-lg">
                    <button onClick={resetSelection} className="hover:text-emerald-600 transition-colors font-medium">
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
                      alt="Colombia Bioregions Map"
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
                            {isHovered && (
                              <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-white px-4 py-3 rounded-lg shadow-xl text-sm font-medium whitespace-nowrap z-20 border border-gray-200">
                                <div className="font-bold text-gray-900">{region.name}</div>
                                <div className="text-emerald-600 font-semibold">
                                  {region.endemicCount} endemic species
                                </div>
                                <div className="text-gray-500">{region.totalSpecies} total species</div>
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
                  <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-16 h-16 rounded-xl bg-gradient-to-br ${currentRegion.gradient} flex items-center justify-center shadow-lg`}
                          >
                            <currentRegion.icon className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-2xl text-gray-900">{currentRegion.name}</CardTitle>
                            <CardDescription className="text-lg mt-1">{currentRegion.shortDescription}</CardDescription>
                          </div>
                        </div>
                        <Button variant="ghost" onClick={resetSelection} className="text-gray-500 hover:text-gray-700">
                          ✕
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-6 mb-6">
                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                          <div className="text-2xl font-bold text-emerald-600">{currentRegion.endemicCount}</div>
                          <div className="text-sm text-gray-600">Endemic Species</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                          <div className="text-2xl font-bold text-blue-600">{currentRegion.totalSpecies}</div>
                          <div className="text-sm text-gray-600">Total Species</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                          <div className="text-lg font-bold text-purple-600">Key Birds</div>
                          <div className="text-xs text-gray-600">Notable Species</div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Key Bird Species:</h4>
                        <div className="flex flex-wrap gap-2">
                          {currentRegion.keyBirds.map((bird, index) => (
                            <Badge key={index} variant="secondary" className="text-sm">
                              {bird}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button asChild className="flex-1">
                          <Link href="/tours">
                            <Camera className="w-4 h-4 mr-2" />
                            Book Tour
                          </Link>
                        </Button>
                        <Button variant="outline" asChild className="flex-1 bg-transparent">
                          <Link href="/contact">
                            <Users className="w-4 h-4 mr-2" />
                            Plan Visit
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

      {/* Colombia's Ecoregions Explorer */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Colombia's Ecoregions Explorer</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Dive deeper into the scientific classification of Colombia's ecosystems. Our 31 ecoregions provide the
                foundation for conservation efforts and biodiversity research.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Ecoregions Matter</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <TreePine className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Conservation Planning</h4>
                      <p className="text-gray-600">
                        Ecoregions help identify priority areas for habitat protection and restoration efforts.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bird className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Species Research</h4>
                      <p className="text-gray-600">
                        Understanding species assemblages and their ecological relationships within specific habitats.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Globe className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Global Standards</h4>
                      <p className="text-gray-600">
                        WWF ecoregions provide internationally recognized frameworks for biodiversity assessment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
                  <div className="text-3xl font-bold text-red-600 mb-2">8</div>
                  <div className="text-sm text-gray-600">Critical Priority Ecoregions</div>
                </div>
                <div className="text-center p-6 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-3xl font-bold text-orange-600 mb-2">12</div>
                  <div className="text-sm text-gray-600">Vulnerable Ecoregions</div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-3xl font-bold text-green-600 mb-2">11</div>
                  <div className="text-sm text-gray-600">Stable Ecoregions</div>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-3xl font-bold text-blue-600 mb-2">31</div>
                  <div className="text-sm text-gray-600">Total Ecoregions</div>
                </div>
              </div>
            </div>

            <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Explore Detailed Ecoregion Data</h3>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                  Access comprehensive scientific data, species lists, conservation status, and detailed information
                  about each of Colombia's 31 ecoregions.
                </p>
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Ecoregions Database
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Birds Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Colombian Birds</h2>
              <p className="text-lg text-gray-600">Meet some of Colombia's most remarkable bird species</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredBirds.map((bird, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={bird.imageUrl || "/placeholder.svg"}
                      alt={bird.commonName}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge
                        className={bird.isEndemic ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"}
                      >
                        {bird.isEndemic ? "Endemic" : "Resident"}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-900 mb-2">{bird.commonName}</h3>
                    <p className="text-sm italic text-gray-600 mb-2">{bird.scientificName}</p>
                    <p className="text-sm text-gray-600 mb-3">{bird.region}</p>
                    <Badge variant="outline" className="text-xs">
                      {bird.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-white/20 p-6 rounded-full">
                <Heart className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Experience Colombia's Avian Wonders?</h2>
            <p className="text-xl text-emerald-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              Join our expert-guided tours to witness these incredible species in their natural habitats. From endemic
              hummingbirds to spectacular toucans, create memories that will last a lifetime.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="font-semibold mb-2">Expert Guides</h4>
                <p className="text-emerald-100 text-sm">Local ornithologists and indigenous guides</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Small Groups</h4>
                <p className="text-emerald-100 text-sm">Maximum 8 participants per tour</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Conservation Focus</h4>
                <p className="text-emerald-100 text-sm">Supporting local communities and habitat protection</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
