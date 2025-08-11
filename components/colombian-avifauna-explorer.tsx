"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { MapPin, Bird, TreePine, Mountain, Users, ChevronRight, Waves, Leaf, Sun, Globe, Calendar } from "lucide-react"

// Bioregions data - streamlined for the new design
const bioregionsData = [
  {
    id: "Pacific",
    name: "Pacific Coast",
    shortDescription: "World's most biodiverse rainforest with extraordinary rainfall and endemic species",
    fullDescription:
      "The Chocó bioregion represents the world's most biodiverse rainforest per square kilometer. This extraordinary ecosystem receives up to 12,000mm of annual rainfall, creating perfect conditions for an incredible array of endemic species. From the elusive Banded Ground-Cuckoo to the magnificent Harpy Eagle, this region offers unparalleled birding opportunities in pristine rainforest settings.",
    endemicCount: 67,
    totalSpecies: 875,
    keyBirds: ["Chocó Vireo", "Harpy Eagle", "Great Green Macaw", "Banded Ground-Cuckoo", "Beautiful Treerunner"],
    coordinates: { x: 15, y: 45 },
    color: "#10B981",
    gradient: "from-emerald-500 to-green-600",
    icon: TreePine,
    highlights: [
      "Highest rainfall in the Americas",
      "UNESCO Biosphere Reserve",
      "Indigenous territories",
      "Pristine primary forest",
    ],
    bestTime: "January-March, July-September",
    difficulty: "Moderate to Challenging",
    tourTypes: ["Adventure", "Vision"],
    bookingCTA: "Explore Pacific Tours",
  },
  {
    id: "Western Andes",
    name: "Western Andes",
    shortDescription: "Highest concentration of endemic bird species with cloud forests and páramo",
    fullDescription:
      "The Western Andes showcase Colombia's most spectacular montane ecosystems, from lush cloud forests to high-altitude páramo. This bioregion boasts the highest concentration of endemic bird species, including the iconic Andean Cock-of-the-rock and the rare Gorgeted Puffleg. The dramatic elevation changes create diverse microhabitats perfect for specialized birding adventures.",
    endemicCount: 45,
    totalSpecies: 785,
    keyBirds: [
      "Gorgeted Puffleg",
      "Andean Cock-of-the-rock",
      "Cauca Guan",
      "Plate-billed Mountain-Toucan",
      "Golden-headed Quetzal",
    ],
    coordinates: { x: 35, y: 50 },
    color: "#8B5CF6",
    gradient: "from-purple-500 to-indigo-600",
    icon: Mountain,
    highlights: [
      "Highest endemic concentration",
      "Cloud forest ecosystems",
      "Dramatic elevation changes",
      "Cock-of-the-rock leks",
    ],
    bestTime: "December-March, June-August",
    difficulty: "Moderate",
    tourTypes: ["Adventure", "Elevate"],
    bookingCTA: "Book Western Andes",
  },
  {
    id: "Central Andes",
    name: "Central Andes",
    shortDescription: "Coffee Triangle region with diverse montane ecosystems and Colombia's highest peaks",
    fullDescription:
      "The Central Andes encompass Colombia's famous Coffee Triangle, where traditional coffee farms create perfect habitat for montane forest species. This bioregion features the country's highest peaks and most accessible cloud forests, offering excellent opportunities to observe high-altitude specialists like the Indigo-winged Parrot and the critically endangered Yellow-eared Parrot.",
    endemicCount: 34,
    totalSpecies: 720,
    keyBirds: [
      "Indigo-winged Parrot",
      "Yellow-eared Parrot",
      "Mountain Tapir",
      "Buffy Helmetcrest",
      "Many-striped Canastero",
    ],
    coordinates: { x: 50, y: 50 },
    color: "#DC2626",
    gradient: "from-red-500 to-rose-600",
    icon: Mountain,
    highlights: [
      "Coffee Triangle region",
      "Highest peaks in Colombia",
      "Accessible cloud forests",
      "Parrot conservation success",
    ],
    bestTime: "December-March, July-August",
    difficulty: "Easy to Moderate",
    tourTypes: ["Adventure", "Elevate", "Souls"],
    bookingCTA: "Discover Central Andes",
  },
  {
    id: "Eastern Andes",
    name: "Eastern Andes",
    shortDescription: "Bogotá's surroundings with extensive páramo and high-altitude wetlands",
    fullDescription:
      "The Eastern Andes surround Colombia's capital and feature the most extensive páramo ecosystems in the country. This bioregion is crucial for water security and harbors unique high-altitude specialists like the endemic Apolinar's Wren and the mysterious Bogotá Rail. The proximity to Bogotá makes it highly accessible for birding expeditions.",
    endemicCount: 23,
    totalSpecies: 650,
    keyBirds: ["Apolinar's Wren", "Bogotá Rail", "Andean Flamingo", "Noble Snipe", "Silvery-throated Spinetail"],
    coordinates: { x: 65, y: 45 },
    color: "#7C3AED",
    gradient: "from-violet-500 to-purple-600",
    icon: Mountain,
    highlights: [
      "Extensive páramo ecosystems",
      "High-altitude wetlands",
      "Easy access from Bogotá",
      "Water source protection",
    ],
    bestTime: "December-March, July-August",
    difficulty: "Easy to Moderate",
    tourTypes: ["Adventure", "Vision"],
    bookingCTA: "Explore Eastern Andes",
  },
  {
    id: "Interandean Valleys",
    name: "Interandean Valleys",
    shortDescription: "Critically endangered dry forests between mountain ranges",
    fullDescription:
      "The Interandean Valleys represent Colombia's most threatened ecosystems - the critically endangered dry forests nestled between the Andean ranges. These unique habitats harbor specialized species like Niceforo's Wren and the Magdalena Antbird, making every sighting precious. Conservation efforts here directly support some of Colombia's rarest birds.",
    endemicCount: 18,
    totalSpecies: 550,
    keyBirds: [
      "Niceforo's Wren",
      "Magdalena Antbird",
      "Sooty Ant-Tanager",
      "Apical Flycatcher",
      "Lance-tailed Manakin",
    ],
    coordinates: { x: 45, y: 55 },
    color: "#F59E0B",
    gradient: "from-amber-500 to-orange-600",
    icon: Leaf,
    highlights: [
      "Critically endangered ecosystems",
      "Unique dry forest species",
      "Conservation priority",
      "Rare endemic birds",
    ],
    bestTime: "December-March",
    difficulty: "Moderate",
    tourTypes: ["Adventure", "Vision"],
    bookingCTA: "Visit Dry Forests",
  },
  {
    id: "Caribbean",
    name: "Caribbean Coast",
    shortDescription: "Coastal plains with dry forests, wetlands, and San Andrés archipelago",
    fullDescription:
      "The Caribbean Coast combines diverse coastal ecosystems from dry forests to extensive wetlands, plus the unique San Andrés archipelago. This bioregion is essential for migratory birds and features spectacular waterbird concentrations, including Caribbean Flamingos and magnificent seabird colonies on offshore islands.",
    endemicCount: 12,
    totalSpecies: 635,
    keyBirds: ["Caribbean Flamingo", "Brown Pelican", "Magnificent Frigatebird", "Scaled Dove", "Vermilion Flycatcher"],
    coordinates: { x: 50, y: 15 },
    color: "#3B82F6",
    gradient: "from-blue-400 to-cyan-500",
    icon: Waves,
    highlights: ["Migratory bird stopover", "Flamingo colonies", "Seabird islands", "Coastal wetlands"],
    bestTime: "December-April",
    difficulty: "Easy",
    tourTypes: ["Adventure", "Souls"],
    bookingCTA: "Book Caribbean Tour",
  },
  {
    id: "SNSM",
    name: "Sierra Nevada de Santa Marta",
    shortDescription: "World's highest coastal mountain with exceptional endemism per unit area",
    fullDescription:
      "The Sierra Nevada de Santa Marta stands as the world's highest coastal mountain and boasts the highest level of endemism per unit area globally. This isolated massif harbors 79 endemic species, including the stunning Santa Marta Parakeet and White-tailed Starfrontlet. Indigenous communities protect these sacred mountains, creating a unique cultural-conservation partnership.",
    endemicCount: 79,
    totalSpecies: 635,
    keyBirds: [
      "Santa Marta Parakeet",
      "White-tailed Starfrontlet",
      "Blue-billed Curassow",
      "Santa Marta Antbird",
      "Santa Marta Warbler",
    ],
    coordinates: { x: 60, y: 20 },
    color: "#06B6D4",
    gradient: "from-cyan-500 to-blue-500",
    icon: Mountain,
    highlights: ["Highest endemism per area", "Indigenous territories", "Isolated evolution", "Sacred mountains"],
    bestTime: "December-March, July-August",
    difficulty: "Moderate to Challenging",
    tourTypes: ["Adventure", "Vision", "Elevate"],
    bookingCTA: "Discover Sierra Nevada",
  },
  {
    id: "Llanos",
    name: "Llanos",
    shortDescription: "Vast tropical grasslands with seasonal wetlands supporting diverse waterbirds",
    fullDescription:
      "The Llanos represent one of South America's most extensive tropical grassland ecosystems, featuring seasonal wetlands that support incredible waterbird diversity. During the wet season, these plains transform into a birding paradise with massive concentrations of Jabiru, Orinoco Goose, and Scarlet Ibis creating unforgettable wildlife spectacles.",
    endemicCount: 8,
    totalSpecies: 450,
    keyBirds: ["Jabiru", "Orinoco Goose", "Scarlet Ibis", "Sunbittern", "Hoatzin", "Sharp-tailed Ibis"],
    coordinates: { x: 75, y: 40 },
    color: "#EAB308",
    gradient: "from-yellow-400 to-amber-500",
    icon: Sun,
    highlights: [
      "Seasonal wetland spectacles",
      "Massive bird concentrations",
      "Traditional ranching",
      "Waterbird paradise",
    ],
    bestTime: "December-April (dry season)",
    difficulty: "Easy to Moderate",
    tourTypes: ["Adventure", "Vision"],
    bookingCTA: "Experience Llanos",
  },
  {
    id: "Amazonia",
    name: "Amazonia",
    shortDescription: "Colombia's portion of the world's largest rainforest with incredible biodiversity",
    fullDescription:
      "Colombian Amazonia encompasses the country's portion of the world's largest rainforest, harboring over 1,250 bird species in pristine wilderness. From the mighty Harpy Eagle to the secretive Zigzag Heron, this bioregion offers the ultimate rainforest birding experience. Indigenous territories protect 80% of the forest cover, ensuring sustainable wildlife viewing.",
    endemicCount: 45,
    totalSpecies: 1250,
    keyBirds: ["Harpy Eagle", "Zigzag Heron", "Amazonian Umbrellabird", "Nocturnal Curassow", "Pavonine Quetzal"],
    coordinates: { x: 60, y: 75 },
    color: "#16A34A",
    gradient: "from-green-500 to-emerald-600",
    icon: TreePine,
    highlights: ["Highest species diversity", "Indigenous protection", "Pristine wilderness", "Harpy Eagle territory"],
    bestTime: "June-September (drier season)",
    difficulty: "Moderate to Challenging",
    tourTypes: ["Adventure", "Vision", "Elevate"],
    bookingCTA: "Explore Amazon",
  },
  {
    id: "Massif",
    name: "Colombian Massif",
    shortDescription: "Where the Andes divide into three ranges with páramo and cloud forest ecosystems",
    fullDescription:
      "The Colombian Massif marks the dramatic point where the Andes divide into three separate ranges, creating unique transitional ecosystems. This bioregion combines páramo, cloud forest, and montane habitats, supporting specialized species adapted to these transitional zones. Archaeological sites add cultural significance to the birding experience.",
    endemicCount: 15,
    totalSpecies: 380,
    keyBirds: [
      "Rusty-headed Spinetail",
      "Brown-rumped Tapaculo",
      "Andean Cock-of-the-rock",
      "Mountain Tapir",
      "Spectacled Bear",
    ],
    coordinates: { x: 45, y: 65 },
    color: "#BE185D",
    gradient: "from-pink-600 to-rose-700",
    icon: Mountain,
    highlights: ["Andean division point", "Transitional ecosystems", "Archaeological sites", "Cultural significance"],
    bestTime: "December-February, June-August",
    difficulty: "Moderate",
    tourTypes: ["Adventure", "Elevate"],
    bookingCTA: "Visit Colombian Massif",
  },
  {
    id: "Marine",
    name: "Marine Regions",
    shortDescription: "Two ocean systems with coral reefs, mangroves, and diverse marine life",
    fullDescription:
      "Colombia's Marine Regions encompass both Pacific and Caribbean ocean systems, featuring coral reefs, mangrove forests, and diverse coastal habitats. These areas are crucial for seabirds, coastal species, and marine wildlife including humpback whales. The combination of terrestrial and marine birding creates unique expedition opportunities.",
    endemicCount: 20,
    totalSpecies: 341,
    keyBirds: ["Brown Pelican", "Magnificent Frigatebird", "Laughing Gull", "Royal Tern", "Neotropic Cormorant"],
    coordinates: { x: 25, y: 25 },
    color: "#0EA5E9",
    gradient: "from-sky-500 to-blue-600",
    icon: Waves,
    highlights: ["Two ocean systems", "Coral reef ecosystems", "Whale watching", "Seabird colonies"],
    bestTime: "December-April",
    difficulty: "Easy to Moderate",
    tourTypes: ["Adventure", "Souls"],
    bookingCTA: "Marine Expeditions",
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

  // Enhanced booking CTA handler
  const handleBookingCTA = (region: any) => {
    // Navigate to shopping page with pre-selected region
    router.push(`/shopping?region=${encodeURIComponent(region.name)}&focus=${region.id}`)
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
                Explore Interactive Map
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 bg-transparent text-lg px-8 py-4"
              >
                <Link href="/shopping">
                  <Calendar className="w-5 h-5 mr-2" />
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

      {/* Simplified Classification System */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Classification System</h2>
            <p className="text-lg text-gray-600 mb-8">
              We organize Colombia's biodiversity using <strong>11 practical bioregions</strong> designed for birding
              tours and <strong>31 scientific ecoregions</strong> for conservation research.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
                <CardContent className="p-6 text-center">
                  <Globe className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-emerald-800 mb-2">11 Bioregions</h3>
                  <p className="text-gray-700">
                    Practical approach for birding tours with geographic boundaries optimized for maximum species
                    diversity
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <TreePine className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-blue-800 mb-2">31 Ecoregions</h3>
                  <p className="text-gray-700">
                    Scientific classification based on species assemblages and environmental conditions for conservation
                    priorities
                  </p>
                </CardContent>
              </Card>
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

                {/* Enhanced Region Details Panel with Strategic CTAs */}
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
                          <div className="text-lg font-bold text-purple-600">{currentRegion.difficulty}</div>
                          <div className="text-xs text-gray-600">Difficulty Level</div>
                        </div>
                      </div>

                      {/* Tour Types Available */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Available Tour Types:</h4>
                        <div className="flex flex-wrap gap-2">
                          {currentRegion.tourTypes.map((type, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-sm bg-blue-50 text-blue-700 border-blue-200"
                            >
                              {type} Tours
                            </Badge>
                          ))}
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

                      {/* Enhanced Strategic CTAs */}
                      <div className="flex gap-4">
                        <Button
                          className="flex-1"
                          onClick={() => handleBookingCTA(currentRegion)}
                          style={{ backgroundColor: currentRegion.color }}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          {currentRegion.bookingCTA}
                        </Button>
                        <Button variant="outline" className="flex-1 bg-transparent" asChild>
                          <Link href="/contact">
                            <Users className="w-4 h-4 mr-2" />
                            Plan Custom Visit
                          </Link>
                        </Button>
                      </div>

                      {/* Additional Info */}
                      <div className="mt-4 p-4 bg-white/60 rounded-lg">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Best Time:</span>
                            <p className="text-gray-600">{currentRegion.bestTime}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Difficulty:</span>
                            <p className="text-gray-600">{currentRegion.difficulty}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Colombia's 11 Bioregions Detailed Sections - Enhanced with Strategic CTAs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Colombia's 11 Bioregions</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Each bioregion represents a unique combination of geography, climate, and bird communities. Explore
                detailed information about each region and discover your perfect birding destination.
              </p>
            </div>

            <div className="space-y-12">
              {bioregionsData.map((region) => {
                const IconComponent = region.icon
                return (
                  <Card key={region.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="grid lg:grid-cols-2 gap-0">
                        {/* Content Side */}
                        <div className="p-8">
                          <div className="flex items-center gap-4 mb-6">
                            <div
                              className={`w-16 h-16 rounded-xl bg-gradient-to-br ${region.gradient} flex items-center justify-center shadow-lg`}
                            >
                              <IconComponent className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900">{region.name}</h3>
                              <p className="text-emerald-600 font-semibold">{region.endemicCount} endemic species</p>
                            </div>
                          </div>

                          <p className="text-gray-700 mb-6 leading-relaxed">{region.fullDescription}</p>

                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                              <div className="text-xl font-bold text-emerald-600">{region.totalSpecies}</div>
                              <div className="text-xs text-gray-600">Total Species</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                              <div className="text-sm font-bold text-blue-600">{region.bestTime}</div>
                              <div className="text-xs text-gray-600">Best Time</div>
                            </div>
                          </div>

                          <div className="mb-6">
                            <h4 className="font-semibold text-gray-900 mb-3">Highlights:</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {region.highlights.map((highlight, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                  {highlight}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mb-6">
                            <h4 className="font-semibold text-gray-900 mb-3">Key Species:</h4>
                            <div className="flex flex-wrap gap-2">
                              {region.keyBirds.slice(0, 3).map((bird, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {bird}
                                </Badge>
                              ))}
                              {region.keyBirds.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{region.keyBirds.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Enhanced Strategic CTAs */}
                          <div className="flex gap-3">
                            <Button
                              className="flex-1"
                              style={{ backgroundColor: region.color }}
                              onClick={() => handleBookingCTA(region)}
                            >
                              <Calendar className="w-4 h-4 mr-2" />
                              {region.bookingCTA}
                            </Button>
                            <Button variant="outline" className="flex-1 bg-transparent" asChild>
                              <Link href="/contact">
                                <Users className="w-4 h-4 mr-2" />
                                Plan Visit
                              </Link>
                            </Button>
                          </div>
                        </div>

                        {/* Visual Side */}
                        <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 min-h-[400px] lg:min-h-full">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center p-8">
                              <div
                                className={`w-24 h-24 rounded-full bg-gradient-to-br ${region.gradient} flex items-center justify-center shadow-xl mb-4 mx-auto`}
                              >
                                <IconComponent className="w-12 h-12 text-white" />
                              </div>
                              <h4 className="text-xl font-bold text-gray-800 mb-2">{region.name}</h4>
                              <p className="text-gray-600 text-sm">{region.shortDescription}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Birds Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Colombian Birds</h2>
              <p className="text-lg text-gray-600">
                Discover some of Colombia's most spectacular and endemic bird species
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredBirds.map((bird, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <img
                      src={bird.imageUrl || "/placeholder.svg"}
                      alt={bird.commonName}
                      className="w-full h-full object-cover"
                    />
                    {bird.isEndemic && <Badge className="absolute top-2 right-2 bg-emerald-600">Endemic</Badge>}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{bird.commonName}</h3>
                    <p className="text-sm text-gray-600 italic mb-2">{bird.scientificName}</p>
                    <p className="text-sm text-gray-700 mb-2">Region: {bird.region}</p>
                    <Badge variant={bird.status === "Endangered" ? "destructive" : "secondary"}>{bird.status}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Explore Colombia's Birds?</h2>
            <p className="text-xl text-emerald-100 mb-8">
              Join us on an unforgettable birding adventure through Colombia's most spectacular bioregions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-4">
                <Link href="/shopping">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Your Tour
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white text-white hover:bg-white hover:text-emerald-600 text-lg px-8 py-4 bg-transparent"
              >
                <Link href="/contact">
                  <Users className="w-5 h-5 mr-2" />
                  Plan Custom Trip
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
