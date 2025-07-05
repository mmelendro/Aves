"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Bird, TreePine, Mountain, ChevronRight, Waves, Leaf, Sun, Camera, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users } from "lucide-react"

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

  const currentRegion = selectedRegion ? bioregionsData.find((r) => r.id === selectedRegion) : null

  // Responsive screen size detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 768) {
        setScreenSize("mobile")
      } else if (width < 1024) {
        setScreenSize("tablet")
      } else {
        setScreenSize("desktop")
      }
    }

    handleResize() // Initial check
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Dynamic sizing based on screen size
  const getIconSizes = () => {
    switch (screenSize) {
      case "mobile":
        return {
          iconSize: "w-6 h-6", // Smaller for mobile
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
          iconSize: "w-8 h-8", // Medium for tablet
          iconInnerSize: "w-4 h-4",
          borderWidth: "border-2",
          tooltipOffset: "top-10",
          tooltipPadding: "px-3 py-2",
          tooltipTextSize: "text-sm",
          hoverScale: "group-hover:scale-115",
          selectedScale: "scale-115",
          shadowSize: "shadow-lg",
        }
      default: // desktop
        return {
          iconSize: "w-10 h-10", // Smaller for desktop split layout
          iconInnerSize: "w-5 h-5",
          borderWidth: "border-3",
          tooltipOffset: "top-12",
          tooltipPadding: "px-3 py-2",
          tooltipTextSize: "text-sm",
          hoverScale: "group-hover:scale-120",
          selectedScale: "scale-120",
          shadowSize: "shadow-lg",
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

  // Default content for when no region is selected
  const defaultContent = {
    title: "Understanding Colombia's Biodiversity",
    content: (
      <div className="space-y-6">
        <p className="text-lg text-gray-700 leading-relaxed">
          Colombia stands as the world's most biodiverse country per square kilometer. Our classification system
          organizes this incredible diversity into{" "}
          <Badge variant="secondary" className="mx-1 bg-emerald-100 text-emerald-800 font-semibold">
            11 bioregions
          </Badge>{" "}
          (major ecological areas) containing{" "}
          <Badge variant="secondary" className="mx-1 bg-blue-100 text-blue-800 font-semibold">
            31 ecoregions
          </Badge>{" "}
          (specific habitat types).
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          This strategic location at the crossroads of North and South America, combined with three Andean mountain
          ranges and coastlines on both oceans, creates an unparalleled variety of ecosystems and the highest bird
          diversity on Earth.
        </p>
        <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-100">
          <h4 className="font-semibold text-emerald-800 mb-3">Click on any region to explore:</h4>
          <ul className="text-sm text-emerald-700 space-y-1">
            <li>• Detailed habitat descriptions</li>
            <li>• Endemic and key bird species</li>
            <li>• Conservation status and threats</li>
            <li>• Best visiting times and elevations</li>
          </ul>
        </div>
      </div>
    ),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Clean Hero Section with Integrated Interactive Map */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Centered Hero Title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <Bird className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">Explore Colombia</h1>

            {/* Introductory Text - Properly Positioned and Visible */}
            <div className="max-w-4xl mx-auto mb-8">
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-medium">
                Discover Colombia's incredible bird diversity with our interactive explorer. Navigate through 11
                distinct bioregions, explore over 1,900 species, and plan your perfect birding adventure with expert
                insights and detailed habitat information.
              </p>
            </div>
          </div>

          {/* Interactive Map Section - Clean Layout */}
          <div className="bg-white/95 backdrop-blur-sm shadow-2xl border-2 border-emerald-200 rounded-2xl overflow-hidden">
            {/* Navigation Breadcrumb - Only show on mobile when region selected */}
            {selectedRegion && screenSize === "mobile" && (
              <div className="p-4 flex items-center gap-2 text-base bg-gray-50 border-b">
                <button
                  onClick={resetSelection}
                  className="hover:text-emerald-600 transition-colors font-medium flex items-center gap-2"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  All Bioregions
                </button>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-semibold">{currentRegion?.name}</span>
              </div>
            )}

            {/* Main Content Area - Balanced Layout */}
            <div className={`${screenSize === "desktop" ? "grid grid-cols-2 min-h-[600px]" : "block"}`}>
              {/* Left Side - Interactive Map (Desktop) / Top (Mobile) */}
              <div
                className={`${screenSize === "desktop" ? "border-r border-gray-200" : ""} p-6 lg:p-8 flex flex-col justify-center`}
              >
                {/* Map Instructions - Clear and Visible */}
                <div className="text-center mb-6">
                  <p className="text-lg text-gray-700 font-medium">
                    Click on any region to discover its unique ecosystems and species
                  </p>
                </div>

                {/* Interactive Map - Centered and Balanced */}
                <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 border border-emerald-100 flex items-center justify-center min-h-[400px]">
                  <div className="relative w-full max-w-lg mx-auto">
                    <img
                      src="/images/birding-regions-colombia-final.png"
                      alt="Colombia Interactive Bioregions Map - Explore Colombia"
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
                            className={`absolute transform -translate-x-1/2 -translate-y-1/2 group z-10 focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-full transition-all duration-300 ${iconSizes.hoverScale}`}
                            style={{
                              left: `${region.coordinates.x}%`,
                              top: `${region.coordinates.y}%`,
                            }}
                            aria-label={`Explore ${region.name} bioregion - ${region.endemicCount} endemic species`}
                          >
                            <div
                              className={`${iconSizes.iconSize} rounded-full ${iconSizes.shadowSize} transition-all duration-300 flex items-center justify-center ${iconSizes.borderWidth} border-white/90 ${
                                isSelected
                                  ? `ring-4 ring-white ring-opacity-95 ${iconSizes.selectedScale} ${iconSizes.shadowSize} border-white`
                                  : ""
                              }`}
                              style={{
                                backgroundColor: region.color,
                                boxShadow: isSelected
                                  ? `0 0 0 4px ${region.color}40, 0 8px 25px ${region.color}70`
                                  : `0 4px 15px ${region.color}50`,
                              }}
                            >
                              <IconComponent
                                className={`${iconSizes.iconInnerSize} text-white drop-shadow-lg`}
                                style={{
                                  filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.8))",
                                }}
                              />
                            </div>
                            {isHovered && !isSelected && screenSize === "desktop" && (
                              <div
                                className={`absolute ${iconSizes.tooltipOffset} left-1/2 transform -translate-x-1/2 bg-white ${iconSizes.tooltipPadding} rounded-lg ${iconSizes.shadowSize} ${iconSizes.tooltipTextSize} font-medium whitespace-nowrap z-20 border border-gray-200 backdrop-blur-sm bg-white/95`}
                              >
                                <div className="font-bold text-gray-900">{region.name}</div>
                                <div className="font-semibold" style={{ color: region.color }}>
                                  {region.endemicCount} endemic • {region.totalSpecies} total species
                                </div>
                                <div className="text-gray-500 text-xs">{region.habitat}</div>
                                <div className="text-xs mt-1 font-medium" style={{ color: region.color }}>
                                  Click to explore →
                                </div>
                              </div>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Dynamic Content Panel (Desktop) / Bottom (Mobile) - Vertically Aligned */}
              <div className="p-6 lg:p-8 flex flex-col justify-center">
                <div className="space-y-6">
                  {/* Dynamic Content Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {currentRegion ? currentRegion.fullName : defaultContent.title}
                    </h3>
                    {currentRegion && screenSize === "desktop" && (
                      <Button
                        variant="ghost"
                        onClick={resetSelection}
                        className="text-gray-500 hover:text-gray-700 p-2"
                      >
                        ✕
                      </Button>
                    )}
                  </div>

                  {/* Dynamic Content Body */}
                  {currentRegion ? (
                    <div className="space-y-6">
                      {/* Region Icon and Basic Info */}
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                          style={{ backgroundColor: currentRegion.color }}
                        >
                          <currentRegion.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">
                            {currentRegion.habitat} • {currentRegion.elevation}
                          </div>
                          <div className="text-sm font-medium text-gray-800">Best time: {currentRegion.bestTime}</div>
                        </div>
                      </div>

                      {/* Detailed Description */}
                      <p className="text-gray-700 leading-relaxed">{currentRegion.detailedDescription}</p>

                      {/* Statistics Grid */}
                      <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                        <div className="text-center">
                          <div className="text-2xl font-bold" style={{ color: currentRegion.color }}>
                            {currentRegion.totalSpecies}
                          </div>
                          <div className="text-sm text-gray-600">Total Species</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold" style={{ color: currentRegion.color }}>
                            {currentRegion.endemicCount}
                          </div>
                          <div className="text-sm text-gray-600">Endemic Species</div>
                        </div>
                      </div>

                      {/* Key Species */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Key Species</h4>
                        <div className="flex flex-wrap gap-2">
                          {currentRegion.keyBirds.map((bird, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 text-sm rounded-full border"
                              style={{
                                borderColor: currentRegion.color,
                                color: currentRegion.color,
                                backgroundColor: `${currentRegion.color}10`,
                              }}
                            >
                              {bird}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button
                          asChild
                          className="flex-1"
                          style={{
                            backgroundColor: currentRegion.color,
                            borderColor: currentRegion.color,
                          }}
                        >
                          <Link href="/tours">
                            <Bird className="w-4 h-4 mr-2" />
                            Explore Tours
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          asChild
                          className="flex-1 border-2 bg-transparent"
                          style={{
                            borderColor: currentRegion.color,
                            color: currentRegion.color,
                          }}
                        >
                          <Link href="/contact">
                            <Camera className="w-4 h-4 mr-2" />
                            Plan Visit
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    defaultContent.content
                  )}
                </div>
              </div>
            </div>

            {/* Footer Summary Section - Clean Statistics Display */}
            <div className="border-t border-gray-200 bg-gray-50/50 px-6 py-6">
              <div className="text-center">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
                    <div className="text-2xl font-bold text-emerald-600 mb-1">1,900+</div>
                    <div className="text-sm text-gray-600 font-medium">Bird Species</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                    <div className="text-2xl font-bold text-blue-600 mb-1">78+</div>
                    <div className="text-sm text-gray-600 font-medium">Endemic Species</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100">
                    <div className="text-2xl font-bold text-purple-600 mb-1">11</div>
                    <div className="text-sm text-gray-600 font-medium">Bioregions</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Discover Colombia's incredible bird diversity with our interactive explorer
                </p>
              </div>
            </div>
          </div>

          {/* Book Your Tour Button - Properly Spaced */}
          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/tours">
                <Calendar className="w-5 h-5 mr-2" />
                Book Your Birding Adventure
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Experience Colombia's Avian Wonders?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
            Join our expert-guided birding tours and discover the incredible diversity you've just explored. From
            endemic hummingbirds in the Andes to colorful toucans in the Amazon rainforest.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-emerald-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/tours">
                <Calendar className="w-5 h-5 mr-2" />
                View All Tours
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-emerald-700 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 bg-transparent"
            >
              <Link href="/contact">
                <Users className="w-5 h-5 mr-2" />
                Plan Custom Tour
              </Link>
            </Button>
          </div>

          {/* Additional Information */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="text-emerald-100">
              <div className="text-2xl font-bold text-white mb-2">Expert Guides</div>
              <div className="text-sm">Professional ornithologists with decades of experience</div>
            </div>
            <div className="text-emerald-100">
              <div className="text-2xl font-bold text-white mb-2">Small Groups</div>
              <div className="text-sm">Maximum 4 guests per tour for personalized experience</div>
            </div>
            <div className="text-emerald-100">
              <div className="text-2xl font-bold text-white mb-2">Carbon Neutral</div>
              <div className="text-sm">100% carbon neutral tours supporting conservation</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
