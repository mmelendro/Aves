"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Bird, TreePine, Mountain, ChevronRight, Waves, Leaf, Sun, Camera, ArrowRight, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import YouTubeHeroBackground from "@/components/youtube-hero-background"

// Complete bioregions data with corrected coordinates and accurate color mapping
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
    coordinates: { x: 8, y: 65 },
    color: "#228B22",
    gradient: "from-[#228B22] to-[#1F7A1F]",
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
    coordinates: { x: 20, y: 52 },
    color: "#8B4513",
    gradient: "from-[#8B4513] to-[#7A3E11]",
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
    coordinates: { x: 32, y: 48 },
    color: "#A0522D",
    gradient: "from-[#A0522D] to-[#8F4928]",
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
    coordinates: { x: 48, y: 42 },
    color: "#CD853F",
    gradient: "from-[#CD853F] to-[#B8763A]",
    icon: Mountain,
    habitat: "Páramo, high-altitude wetlands, montane forest",
    elevation: "500-5,400m",
    bestTime: "December-March, June-August",
    threats: ["Water extraction", "Urban expansion", "Agriculture"],
    conservation: "Critical páramo protection for water security",
  },
  {
    id: "Cauca Valley",
    name: "Cauca Valley",
    fullName: "Cauca Inter-Andean Valley",
    shortDescription: "Critically endangered dry forests between mountain ranges with unique endemic species",
    detailedDescription:
      "The fertile Cauca Valley between Colombia's mountain ranges once supported extensive dry forests, now among the world's most threatened ecosystems. This valley harbors unique endemic species adapted to seasonal dry conditions.",
    endemicCount: 12,
    totalSpecies: 420,
    keyBirds: ["Cauca Guan", "Apical Flycatcher", "Greyish Piculet", "Sooty Ant-Tanager", "White-mantled Barbet"],
    coordinates: { x: 26, y: 40 },
    color: "#4169E1",
    gradient: "from-[#4169E1] to-[#3A5FCA]",
    icon: Leaf,
    habitat: "Dry forest remnants, agricultural landscapes",
    elevation: "200-2,000m",
    bestTime: "December-March, July-August",
    threats: ["Agricultural conversion", "Cattle ranching", "Urban development"],
    conservation: "Habitat restoration projects underway",
  },
  {
    id: "Magdalena Valley",
    name: "Magdalena Valley",
    fullName: "Magdalena Inter-Andean Valley",
    shortDescription: "Principal river valley with critically endangered dry forests and endemic species",
    detailedDescription:
      "The Magdalena Valley, Colombia's principal river corridor, once supported extensive dry forests now reduced to small fragments. This region is critical for endemic species conservation and serves as an important migration corridor.",
    endemicCount: 18,
    totalSpecies: 550,
    keyBirds: ["Niceforo's Wren", "Magdalena Antbird", "Sooty Ant-Tanager", "Apical Flycatcher", "Greyish Piculet"],
    coordinates: { x: 40, y: 36 },
    color: "#1E90FF",
    gradient: "from-[#1E90FF] to-[#1C82E6]",
    icon: Leaf,
    habitat: "Dry forest remnants, agricultural landscapes, river systems",
    elevation: "200-2,000m",
    bestTime: "December-March, July-August",
    threats: ["Agricultural conversion", "Cattle ranching", "Urban development"],
    conservation: "Critical corridor restoration initiatives",
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
    coordinates: { x: 36, y: 18 },
    color: "#FF8C00",
    gradient: "from-[#FF8C00] to-[#E67E00]",
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
    coordinates: { x: 47, y: 10 },
    color: "#D2691E",
    gradient: "from-[#D2691E] to-[#BD5F1B]",
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
    coordinates: { x: 70, y: 42 },
    color: "#FFD700",
    gradient: "from-[#FFD700] to-[#E6C200]",
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
    coordinates: { x: 56, y: 78 },
    color: "#32CD32",
    gradient: "from-[#32CD32] to-[#2DB82D]",
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
    coordinates: { x: 20, y: 65 },
    color: "#DEB887",
    gradient: "from-[#DEB887] to-[#C8A679]",
    icon: Mountain,
    habitat: "Páramo, cloud forest, montane forest",
    elevation: "1,000-4,750m",
    bestTime: "December-March, June-August",
    threats: ["Agricultural expansion", "Infrastructure development", "Climate change"],
    conservation: "National parks protecting critical watersheds",
  },
]

export function ColombianBirdsExplorer() {
  const router = useRouter()
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("desktop")
  const [isGettingStartedOpen, setIsGettingStartedOpen] = useState(false)

  const currentRegion = selectedRegion ? bioregionsData.find((r) => r.id === selectedRegion) : null

  // Responsive screen size detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setScreenSize("mobile")
      } else if (width < 1024) {
        setScreenSize("tablet")
      } else {
        setScreenSize("desktop")
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Dynamic sizing based on screen size
  const getIconSizes = () => {
    switch (screenSize) {
      case "mobile":
        return {
          iconSize: "w-6 h-6",
          iconInnerSize: "w-3 h-3",
          borderWidth: "border-2",
          tooltipOffset: "top-8",
          tooltipPadding: "px-2 py-1",
          tooltipTextSize: "text-xs",
          hoverScale: "group-hover:scale-110",
          selectedScale: "scale-110",
          shadowSize: "shadow-md",
        }
      case "tablet":
        return {
          iconSize: "w-8 h-8",
          iconInnerSize: "w-4 h-4",
          borderWidth: "border-2",
          tooltipOffset: "top-10",
          tooltipPadding: "px-2 py-1",
          tooltipTextSize: "text-xs",
          hoverScale: "group-hover:scale-110",
          selectedScale: "scale-110",
          shadowSize: "shadow-lg",
        }
      default: // desktop
        return {
          iconSize: "w-10 h-10",
          iconInnerSize: "w-5 h-5",
          borderWidth: "border-3",
          tooltipOffset: "top-12",
          tooltipPadding: "px-3 py-2",
          tooltipTextSize: "text-sm",
          hoverScale: "group-hover:scale-110",
          selectedScale: "scale-110",
          shadowSize: "shadow-xl",
        }
    }
  }

  const iconSizes = getIconSizes()

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
    <div className="min-h-screen relative">
      {/* Full-Page YouTube Video Background */}
      <div className="fixed inset-0 z-0">
        <YouTubeHeroBackground
          videoId="QdV1BJNZQE0"
          title=""
          subtitle=""
          className="w-full h-full"
          showAttribution={false}
          attributionText=""
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Hero Section with Content */}
      <div className="relative z-10 w-full h-[40vh] min-h-[320px] flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-shadow-2xl">Explore Colombia</h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-shadow-lg max-w-3xl mx-auto">
            Discover Colombia's incredible bird diversity with our interactive explorer
          </p>
          <div className="mb-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/tours">
                <Calendar className="w-4 h-4 mr-2" />
                Book Your Adventure
              </Link>
            </Button>
          </div>
          <div className="text-xs text-white/70 mt-4">Drone Footage by Martín Melendro Torres</div>
        </div>
      </div>

      {/* Main Content with Transparent Background */}
      <div className="relative z-10">
        <section className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Left Column - Biodiversity Info */}
              <div className="order-2 lg:order-1 space-y-6">
                {/* Colombia's Biodiversity - Enhanced Transparency */}
                <Card className="bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <Bird className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-white">Colombia's Biodiversity</h2>
                    </div>
                    <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 mb-4"></div>

                    <div className="space-y-3 text-white/90">
                      <p className="leading-relaxed">
                        Colombia stands as the world's most biodiverse country per square kilometer. Our classification
                        system organizes this incredible diversity into{" "}
                        <Badge
                          variant="secondary"
                          className="bg-emerald-500/20 text-emerald-200 font-semibold border border-emerald-400/30"
                        >
                          11 bioregions
                        </Badge>{" "}
                        (major ecological areas) containing{" "}
                        <Badge
                          variant="secondary"
                          className="bg-blue-500/20 text-blue-200 font-semibold border border-blue-400/30"
                        >
                          31 ecoregions
                        </Badge>{" "}
                        (specific habitat types).
                      </p>

                      <p className="leading-relaxed">
                        This strategic location at the crossroads of North and South America, combined with three Andean
                        mountain ranges and coastlines on both oceans, creates an unparalleled variety of ecosystems and
                        the highest bird diversity on Earth.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Getting Started Accordion - Enhanced Transparency */}
                <Card className="bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20">
                  <CardContent className="p-6">
                    <Collapsible open={isGettingStartedOpen} onOpenChange={setIsGettingStartedOpen}>
                      <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                        <h3 className="text-lg font-semibold text-white">Getting Started</h3>
                        <ChevronDown
                          className={`w-5 h-5 text-white/70 transition-transform duration-200 ${
                            isGettingStartedOpen ? "rotate-180" : ""
                          }`}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-4">
                        <div className="space-y-3 text-white/80 text-sm bg-black/20 p-4 rounded-lg border border-white/20">
                          <p>
                            Click on any region in the interactive map to discover its unique ecosystems, endemic
                            species, and conservation status. Each bioregion offers distinct birding opportunities and
                            specialized tour experiences.
                          </p>
                          <ul className="space-y-2 ml-4">
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-400">•</span>
                              <span>Expert guides with decades of local experience</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-400">•</span>
                              <span>Small groups (max 4 guests) for personalized attention</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-400">•</span>
                              <span>Specialized tour experiences available for each region</span>
                            </li>
                          </ul>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </CardContent>
                </Card>

                {/* Selected Region Details - Enhanced Transparency */}
                {currentRegion && (
                  <Card className="bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20 animate-fade-in-up">
                    <CardContent className="p-6">
                      {/* Navigation Breadcrumb */}
                      <div className="mb-4 flex items-center gap-2 text-sm bg-black/20 p-3 rounded-lg border border-white/20">
                        <button
                          onClick={resetSelection}
                          className="hover:text-emerald-300 transition-colors font-medium flex items-center gap-2 text-white/80"
                        >
                          <ArrowRight className="w-4 h-4 rotate-180" />
                          All Bioregions
                        </button>
                        <ChevronRight className="w-4 h-4 text-white/60" />
                        <span className="text-white font-semibold">{currentRegion.name}</span>
                      </div>

                      {/* Region Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md"
                          style={{ backgroundColor: currentRegion.color }}
                        >
                          <currentRegion.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{currentRegion.fullName}</h3>
                          <p className="text-white/70 text-sm">
                            {currentRegion.habitat} • {currentRegion.elevation}
                          </p>
                        </div>
                      </div>

                      {/* Region Description */}
                      <p className="text-white/80 mb-4 text-sm leading-relaxed">{currentRegion.detailedDescription}</p>

                      {/* Key Information */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-black/20 p-3 rounded-lg border border-white/20">
                          <h4 className="font-semibold text-white mb-1 text-sm">Species Count</h4>
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="text-white/70">Total:</span>
                              <span className="font-medium text-white">{currentRegion.totalSpecies}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Endemic:</span>
                              <span className="font-medium text-white">{currentRegion.endemicCount}</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-black/20 p-3 rounded-lg border border-white/20">
                          <h4 className="font-semibold text-white mb-1 text-sm">Best Time</h4>
                          <p className="font-medium text-xs text-white/80">{currentRegion.bestTime}</p>
                        </div>
                      </div>

                      {/* Key Species */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-white mb-2 text-sm">Key Species</h4>
                        <div className="flex flex-wrap gap-1">
                          {currentRegion.keyBirds.slice(0, 3).map((bird, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs rounded-full border border-white/30"
                              style={{
                                color: "white",
                                backgroundColor: `${currentRegion.color}30`,
                              }}
                            >
                              {bird}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          asChild
                          size="sm"
                          className="flex-1 text-xs"
                          style={{
                            backgroundColor: currentRegion.color,
                            borderColor: currentRegion.color,
                          }}
                        >
                          <Link href="/tours">
                            <Bird className="w-3 h-3 mr-1" />
                            Tours
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          asChild
                          size="sm"
                          className="flex-1 text-xs bg-transparent text-white border-white/30 hover:bg-white/10"
                        >
                          <Link href="/contact">
                            <Camera className="w-3 h-3 mr-1" />
                            Plan Visit
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Column - Interactive Map with Transparent Background */}
              <div className="order-1 lg:order-2">
                <Card className="bg-white/5 backdrop-blur-lg shadow-2xl border border-white/20">
                  <CardContent className="p-4 sm:p-6">
                    {/* Interactive Map Container - Transparent Background */}
                    <div className="relative bg-transparent rounded-lg p-4 mb-4 border border-white/20">
                      <div className="relative mx-auto">
                        <img
                          src="/images/birding-regions-colombia-final.png"
                          alt="Colombia Interactive Bioregions Map"
                          className="w-full h-auto rounded-md shadow-lg opacity-90"
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
                                className={`absolute transform -translate-x-1/2 -translate-y-1/2 group z-10 focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-full transition-all duration-300 ${iconSizes.hoverScale}`}
                                style={{
                                  left: `${region.coordinates.x}%`,
                                  top: `${region.coordinates.y}%`,
                                }}
                                aria-label={`Explore ${region.name} bioregion`}
                              >
                                <div
                                  className={`${iconSizes.iconSize} rounded-full ${iconSizes.shadowSize} transition-all duration-300 flex items-center justify-center ${iconSizes.borderWidth} border-white ${
                                    isSelected
                                      ? `ring-2 ring-white ring-opacity-95 ${iconSizes.selectedScale} border-white`
                                      : ""
                                  }`}
                                  style={{
                                    backgroundColor: region.color,
                                    boxShadow: isSelected
                                      ? `0 0 0 2px ${region.color}40, 0 4px 15px ${region.color}70`
                                      : `0 2px 8px ${region.color}50`,
                                  }}
                                >
                                  <IconComponent
                                    className={`${iconSizes.iconInnerSize} text-white drop-shadow-sm`}
                                    style={{
                                      filter: "drop-shadow(0.5px 0.5px 1px rgba(0,0,0,0.8))",
                                    }}
                                  />
                                </div>
                                {isHovered && !isSelected && screenSize === "desktop" && (
                                  <div
                                    className={`absolute ${iconSizes.tooltipOffset} left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm ${iconSizes.tooltipPadding} rounded-md ${iconSizes.shadowSize} ${iconSizes.tooltipTextSize} font-medium whitespace-nowrap z-20 border border-white/30`}
                                  >
                                    <div className="font-bold text-white">{region.name}</div>
                                    <div className="text-xs text-white/70">Click to explore</div>
                                  </div>
                                )}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Map Instructions */}
                    <div className="text-center mb-4">
                      <p className="text-sm text-white/80 font-medium">
                        Click on any region to discover its unique ecosystems and species
                      </p>
                    </div>

                    {/* Statistics Below Map - Enhanced Transparency */}
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-emerald-500/20 backdrop-blur-sm text-white rounded-lg p-3 shadow-lg border border-emerald-400/30">
                        <div className="text-lg sm:text-xl font-bold">1,900+</div>
                        <div className="text-emerald-200 text-xs font-medium">Bird Species</div>
                      </div>
                      <div className="bg-blue-500/20 backdrop-blur-sm text-white rounded-lg p-3 shadow-lg border border-blue-400/30">
                        <div className="text-lg sm:text-xl font-bold">78+</div>
                        <div className="text-blue-200 text-xs font-medium">Endemic Species</div>
                      </div>
                      <div className="bg-purple-500/20 backdrop-blur-sm text-white rounded-lg p-3 shadow-lg border border-purple-400/30">
                        <div className="text-lg sm:text-xl font-bold">11</div>
                        <div className="text-purple-200 text-xs font-medium">Bioregions</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section with Maximum Transparency */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-black/5 backdrop-blur-sm relative overflow-hidden">
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-shadow-2xl">
                Ready to Experience Colombia's Avian Wonders?
              </h2>
              <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto text-shadow-lg">
                Join our expert-guided birding tours and discover the incredible diversity you've just explored. From
                endemic hummingbirds in the Andes to colorful toucans in the Amazon rainforest.
              </p>
            </div>

            {/* CTA Buttons with Enhanced Transparency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10">
              <Link href="/tours">
                <Button
                  size="lg"
                  className="w-full bg-white/15 backdrop-blur-md text-white hover:bg-white/25 font-semibold py-3 border border-white/30 shadow-lg"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  View All Tours
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-white/40 text-white hover:bg-white/15 font-semibold py-3 bg-transparent backdrop-blur-md shadow-lg"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Plan Custom Tour
                </Button>
              </Link>
            </div>

            {/* Additional Information Grid with Maximum Transparency */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="text-white/90 bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                <div className="text-2xl font-bold text-white mb-2 text-shadow-lg">Expert Guides</div>
                <div className="text-sm text-shadow">Professional ornithologists with decades of experience</div>
              </div>
              <div className="text-white/90 bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                <div className="text-2xl font-bold text-white mb-2 text-shadow-lg">Small Groups</div>
                <div className="text-sm text-shadow">Maximum 4 guests per tour for personalized experience</div>
              </div>
              <div className="text-white/90 bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                <div className="text-2xl font-bold text-white mb-2 text-shadow-lg">Carbon Neutral</div>
                <div className="text-sm text-shadow">100% carbon neutral tours supporting conservation</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
