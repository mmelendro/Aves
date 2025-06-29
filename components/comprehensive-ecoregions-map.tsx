"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Bird, Mountain, Droplets, TreePine, Fish, Globe } from "lucide-react"

interface EcoregionData {
  id: string
  name: string
  category: "terrestrial" | "marine" | "freshwater"
  description: string
  area: string
  elevation?: string
  climate: string
  precipitation: string
  temperature: string
  bestTime: string
  endemicSpecies: string[]
  keySpecies: string[]
  threats: string[]
  conservation: string
  protectedAreas: string[]
  coordinates: { x: number; y: number }
  color: string
  priority: "Critical" | "Vulnerable" | "Stable" | "Relatively Stable"
  bioregion: string
}

// Official bioregion color palette matching the provided map
const bioregionColors = {
  "Central Andes": "#8B4513", // Saddle Brown
  "Eastern Andes": "#A0522D", // Sienna
  "Western Andes": "#CD853F", // Peru
  "Sierra Nevada de Santa Marta": "#D2691E", // Chocolate
  "Massif Colombiano": "#DEB887", // Burlywood
  Pacific: "#228B22", // Forest Green
  Amazon: "#32CD32", // Lime Green
  "Cauca Valley": "#4169E1", // Royal Blue
  "Magdalena Valley": "#1E90FF", // Dodger Blue
  Llanos: "#FFD700", // Gold
  Caribbean: "#FF8C00", // Dark Orange
}

const ecoregionsData: EcoregionData[] = [
  // CENTRAL ANDES BIOREGION
  {
    id: "northwestern-andean-montane-forests",
    name: "Northwestern Andean Montane Forests",
    category: "terrestrial",
    description: "Cloud forests of the Central Cordillera with exceptional bird diversity.",
    area: "54,000 km²",
    elevation: "1,000-3,500m",
    climate: "Montane cloud forest",
    precipitation: "2,000-6,000mm/year",
    temperature: "12-20°C",
    bestTime: "December-March, June-August",
    endemicSpecies: [
      "Cauca Guan",
      "Chestnut Wood-Quail",
      "Antioquia Bristle-Tyrant",
      "Yellow-headed Manakin",
      "Dusky Starfrontlet",
    ],
    keySpecies: [
      "Andean Cock-of-the-rock",
      "Plate-billed Mountain-Toucan",
      "Golden-headed Quetzal",
      "Masked Trogon",
      "Crimson-rumped Toucanet",
    ],
    threats: ["Deforestation", "Coffee expansion", "Mining", "Climate change"],
    conservation: "Multiple protected areas and reserves",
    protectedAreas: ["Farallones de Cali National Park", "Tatamá National Park", "Los Nevados National Park"],
    coordinates: { x: 35, y: 55 }, // Adjusted for new map
    color: bioregionColors["Central Andes"],
    priority: "Vulnerable",
    bioregion: "Central Andes",
  },
  {
    id: "central-andes-paramo",
    name: "Central Andes Páramo",
    category: "terrestrial",
    description: "High-altitude páramo ecosystems of the Central Cordillera.",
    area: "12,000 km²",
    elevation: "3,000-4,700m",
    climate: "High montane páramo",
    precipitation: "800-2,000mm/year",
    temperature: "2-12°C",
    bestTime: "December-March, June-August",
    endemicSpecies: ["Buffy Helmetcrest", "Páramo Seedeater"],
    keySpecies: ["Andean Condor", "Spectacled Bear", "Mountain Tapir"],
    threats: ["Climate change", "Mining", "Agriculture"],
    conservation: "Critical water source protection",
    protectedAreas: ["Los Nevados National Park", "Puracé National Park"],
    coordinates: { x: 38, y: 50 }, // Adjusted for new map
    color: bioregionColors["Central Andes"],
    priority: "Vulnerable",
    bioregion: "Central Andes",
  },

  // EASTERN ANDES BIOREGION
  {
    id: "eastern-cordillera-real-montane-forests",
    name: "Eastern Cordillera Real Montane Forests",
    category: "terrestrial",
    description: "High-altitude forests and páramo ecosystems of the Eastern Andes.",
    area: "35,000 km²",
    elevation: "2,000-4,000m",
    climate: "High montane",
    precipitation: "1,000-3,000mm/year",
    temperature: "6-16°C",
    bestTime: "December-March, July-August",
    endemicSpecies: [
      "Cundinamarca Antpitta",
      "Bogotá Rail",
      "Apolinar's Wren",
      "Silvery-throated Spinetail",
      "Flame-winged Parakeet",
    ],
    keySpecies: [
      "Andean Flamingo",
      "Noble Snipe",
      "Many-striped Canastero",
      "Páramo Seedeater",
      "Brown-backed Chat-Tyrant",
    ],
    threats: ["Agriculture", "Urban expansion", "Mining", "Water extraction"],
    conservation: "Critical páramo protection for water security",
    protectedAreas: ["Chingaza National Park", "Sumapaz National Park", "Iguaque National Park"],
    coordinates: { x: 55, y: 55 }, // Adjusted for new map
    color: bioregionColors["Eastern Andes"],
    priority: "Vulnerable",
    bioregion: "Eastern Andes",
  },
  {
    id: "eastern-andes-paramo",
    name: "Eastern Andes Páramo",
    category: "terrestrial",
    description: "Extensive páramo ecosystems surrounding Bogotá and the Eastern Cordillera.",
    area: "18,000 km²",
    elevation: "3,000-4,200m",
    climate: "Páramo alpine",
    precipitation: "800-1,500mm/year",
    temperature: "2-10°C",
    bestTime: "December-March, July-August",
    endemicSpecies: ["Apolinar's Wren", "Bogotá Rail"],
    keySpecies: ["Andean Condor", "Noble Snipe", "Many-striped Canastero"],
    threats: ["Urban expansion", "Water extraction", "Climate change"],
    conservation: "Critical for Bogotá's water supply",
    protectedAreas: ["Chingaza National Park", "Sumapaz National Park"],
    coordinates: { x: 58, y: 50 }, // Adjusted for new map
    color: bioregionColors["Eastern Andes"],
    priority: "Critical",
    bioregion: "Eastern Andes",
  },

  // WESTERN ANDES BIOREGION
  {
    id: "western-andes-montane-forests",
    name: "Western Andes Montane Forests",
    category: "terrestrial",
    description: "Cloud forests of the Western Cordillera with Pacific slope influence.",
    area: "25,000 km²",
    elevation: "1,500-3,500m",
    climate: "Montane cloud forest",
    precipitation: "2,500-5,000mm/year",
    temperature: "10-18°C",
    bestTime: "December-March, June-August",
    endemicSpecies: ["Cauca Guan", "Chestnut Wood-Quail"],
    keySpecies: ["Andean Cock-of-the-rock", "Plate-billed Mountain-Toucan"],
    threats: ["Deforestation", "Mining", "Infrastructure"],
    conservation: "Fragmented habitat protection needed",
    protectedAreas: ["Farallones de Cali National Park", "Tatamá National Park"],
    coordinates: { x: 25, y: 60 }, // Adjusted for new map
    color: bioregionColors["Western Andes"],
    priority: "Vulnerable",
    bioregion: "Western Andes",
  },

  // SIERRA NEVADA DE SANTA MARTA BIOREGION
  {
    id: "santa-marta-montane-forests",
    name: "Santa Marta Montane Forests",
    category: "terrestrial",
    description: "Isolated mountain range with the highest level of endemism per unit area in the world.",
    area: "17,000 km²",
    elevation: "900-5,775m",
    climate: "Montane tropical to alpine",
    precipitation: "1,000-4,000mm/year",
    temperature: "6-24°C",
    bestTime: "December-March, July-August",
    endemicSpecies: [
      "Santa Marta Parakeet",
      "White-tailed Starfrontlet",
      "Santa Marta Antbird",
      "Santa Marta Bush-Tyrant",
      "Santa Marta Warbler",
      "White-lored Warbler",
      "Santa Marta Woodstar",
    ],
    keySpecies: ["Blue-billed Curassow", "Brown-rumped Tapaculo", "Rusty-headed Spinetail"],
    threats: ["Agriculture", "Coffee cultivation", "Climate change", "Infrastructure"],
    conservation: "Sierra Nevada de Santa Marta Biosphere Reserve",
    protectedAreas: ["Sierra Nevada de Santa Marta National Park", "Tayrona National Park"],
    coordinates: { x: 65, y: 25 }, // Adjusted for new map
    color: bioregionColors["Sierra Nevada de Santa Marta"],
    priority: "Critical",
    bioregion: "Sierra Nevada de Santa Marta",
  },

  // MASSIF COLOMBIANO BIOREGION
  {
    id: "magdalena-valley-montane-forests",
    name: "Magdalena Valley Montane Forests",
    category: "terrestrial",
    description: "Montane forests of the Massif Colombiano with exceptional levels of endemism.",
    area: "8,500 km²",
    elevation: "1,000-3,200m",
    climate: "Cfb - Oceanic Climate",
    precipitation: "1,000-2,500mm/year",
    temperature: "16-24°C",
    bestTime: "December-February, June-August",
    endemicSpecies: ["Niceforo's Wren", "Antioquia Bristle-tyrant", "Magdalena Antbird"],
    keySpecies: ["Andean Cock-of-the-rock", "Mountain Tapir", "Spectacled Bear"],
    threats: ["Agricultural expansion", "Coffee cultivation", "Urban development"],
    conservation: "Severely fragmented with many endemic species at risk",
    protectedAreas: ["Nevado del Huila National Park", "Puracé National Park"],
    coordinates: { x: 42, y: 75 }, // Adjusted for new map
    color: bioregionColors["Massif Colombiano"],
    priority: "Critical",
    bioregion: "Massif Colombiano",
  },

  // PACIFIC BIOREGION
  {
    id: "choco-darien-moist-forests",
    name: "Chocó-Darién Moist Forests",
    category: "terrestrial",
    description: "The world's most biodiverse rainforest per square kilometer, extending along the Pacific coast.",
    area: "187,400 km²",
    elevation: "0-1,500m",
    climate: "Tropical rainforest",
    precipitation: "4,000-12,000mm/year",
    temperature: "24-28°C",
    bestTime: "January-March, July-September",
    endemicSpecies: [
      "Banded Ground-Cuckoo",
      "Chocó Vireo",
      "Beautiful Treerunner",
      "Chocó Tapaculo",
      "Baudó Oropendola",
    ],
    keySpecies: [
      "Harpy Eagle",
      "Great Green Macaw",
      "Baudo Guan",
      "Long-wattled Umbrellabird",
      "Pacific Royal Flycatcher",
    ],
    threats: ["Deforestation", "Mining", "Agricultural expansion", "Infrastructure development"],
    conservation: "UNESCO Biosphere Reserve, multiple national parks",
    protectedAreas: ["Utría National Park", "Los Katíos National Park", "Farallones de Cali"],
    coordinates: { x: 15, y: 55 }, // Adjusted for new map
    color: bioregionColors["Pacific"],
    priority: "Critical",
    bioregion: "Pacific",
  },

  // AMAZON BIOREGION
  {
    id: "amazon-rainforest",
    name: "Southwest Amazon Moist Forests",
    category: "terrestrial",
    description: "Colombia's portion of the world's largest rainforest with incredible biodiversity.",
    area: "200,000 km²",
    elevation: "100-500m",
    climate: "Tropical rainforest",
    precipitation: "2,300-3,500mm/year",
    temperature: "24-28°C",
    bestTime: "June-September (drier season)",
    endemicSpecies: ["Perijá Metaltail"],
    keySpecies: [
      "Harpy Eagle",
      "Zigzag Heron",
      "Amazonian Umbrellabird",
      "Nocturnal Curassow",
      "Pavonine Quetzal",
      "Wire-tailed Manakin",
    ],
    threats: ["Deforestation", "Mining", "Infrastructure", "Climate change"],
    conservation: "Indigenous territories protecting 80% of forest cover",
    protectedAreas: ["Amacayacu National Park", "Cahuinarí National Park"],
    coordinates: { x: 55, y: 85 }, // Adjusted for new map
    color: bioregionColors["Amazon"],
    priority: "Relatively Stable",
    bioregion: "Amazon",
  },
  {
    id: "caqueta-moist-forests",
    name: "Caquetá Moist Forests",
    category: "terrestrial",
    description: "Transitional forests between the Andes and Amazon with unique species assemblages.",
    area: "315,000 km²",
    elevation: "200-1,000m",
    climate: "Tropical moist",
    precipitation: "2,500-4,000mm/year",
    temperature: "24-28°C",
    bestTime: "June-September, December-February",
    endemicSpecies: ["Caquetá Seedeater", "Yapacana Antbird"],
    keySpecies: ["Harpy Eagle", "Crested Eagle", "Zigzag Heron", "Nocturnal Curassow", "Pavonine Quetzal"],
    threats: ["Deforestation", "Coca cultivation", "Armed conflict", "Cattle ranching"],
    conservation: "Recent peace process enabling conservation efforts",
    protectedAreas: ["Chiribiquete National Park", "Serranía de los Churumbelos National Park"],
    coordinates: { x: 48, y: 75 }, // Adjusted for new map
    color: bioregionColors["Amazon"],
    priority: "Vulnerable",
    bioregion: "Amazon",
  },

  // CAUCA VALLEY BIOREGION
  {
    id: "cauca-valley-dry-forests",
    name: "Cauca Valley Dry Forests",
    category: "terrestrial",
    description: "Inter-Andean valley with critically endangered dry forest remnants.",
    area: "15,000 km²",
    elevation: "900-1,800m",
    climate: "Tropical dry",
    precipitation: "800-1,200mm/year",
    temperature: "22-28°C",
    bestTime: "December-March",
    endemicSpecies: ["Cauca Guan", "Apical Flycatcher"],
    keySpecies: ["Lance-tailed Manakin", "Russet-throated Puffbird", "Scaled Piculet"],
    threats: ["Agriculture", "Urban development", "Sugarcane cultivation"],
    conservation: "Less than 5% of original forest remains",
    protectedAreas: ["Farallones de Cali National Park"],
    coordinates: { x: 32, y: 65 }, // Adjusted for new map
    color: bioregionColors["Cauca Valley"],
    priority: "Critical",
    bioregion: "Cauca Valley",
  },

  // MAGDALENA VALLEY BIOREGION
  {
    id: "magdalena-valley-dry-forests",
    name: "Magdalena Valley Dry Forests",
    category: "terrestrial",
    description: "Critically endangered dry forest ecosystem in Colombia's principal river valley.",
    area: "65,000 km²",
    elevation: "0-1,000m",
    climate: "Tropical dry",
    precipitation: "1,000-2,000mm/year",
    temperature: "26-32°C",
    bestTime: "December-March",
    endemicSpecies: ["Niceforo's Wren", "Magdalena Antbird", "Sooty Ant-Tanager"],
    keySpecies: ["Magdalena Tinamou", "Lance-tailed Manakin", "Russet-throated Puffbird", "Scaled Piculet"],
    threats: ["Agriculture", "Cattle ranching", "Urban development", "Mining"],
    conservation: "Less than 8% of original forest remains",
    protectedAreas: ["Isla de Salamanca National Park", "Los Colorados Fauna and Flora Sanctuary"],
    coordinates: { x: 45, y: 60 }, // Adjusted for new map
    color: bioregionColors["Magdalena Valley"],
    priority: "Critical",
    bioregion: "Magdalena Valley",
  },

  // LLANOS BIOREGION
  {
    id: "llanos",
    name: "Llanos",
    category: "terrestrial",
    description: "Vast tropical grasslands with seasonal flooding, extending into Venezuela.",
    area: "250,000 km²",
    elevation: "100-500m",
    climate: "Tropical savanna",
    precipitation: "1,200-2,500mm/year",
    temperature: "24-32°C",
    bestTime: "December-April (dry season)",
    endemicSpecies: ["Orinocan Saltator", "Llanos Long-tailed Tyrant"],
    keySpecies: ["Jabiru", "Orinoco Goose", "Scarlet Ibis", "Sunbittern", "Hoatzin", "Sharp-tailed Ibis"],
    threats: ["Cattle ranching intensification", "Agriculture", "Infrastructure", "Climate change"],
    conservation: "Sustainable ranching practices, protected wetlands",
    protectedAreas: ["El Tuparro National Park", "Wisirare National Park"],
    coordinates: { x: 75, y: 55 }, // Adjusted for new map
    color: bioregionColors["Llanos"],
    priority: "Stable",
    bioregion: "Llanos",
  },

  // CARIBBEAN BIOREGION
  {
    id: "caribbean-dry-forests",
    name: "Caribbean Dry Forests",
    category: "terrestrial",
    description: "Coastal dry forests and wetlands of the Caribbean region.",
    area: "25,000 km²",
    elevation: "0-500m",
    climate: "Tropical dry",
    precipitation: "500-1,500mm/year",
    temperature: "26-32°C",
    bestTime: "December-April",
    endemicSpecies: ["Sinú Parakeet", "Caribbean Flamingo"],
    keySpecies: ["Scaled Dove", "Vermilion Flycatcher", "Tropical Mockingbird"],
    threats: ["Coastal development", "Tourism pressure", "Water extraction"],
    conservation: "Important stopover for migratory birds",
    protectedAreas: ["Los Flamencos Sanctuary", "Ciénaga Grande de Santa Marta"],
    coordinates: { x: 55, y: 20 }, // Adjusted for new map
    color: bioregionColors["Caribbean"],
    priority: "Vulnerable",
    bioregion: "Caribbean",
  },
]

export function ComprehensiveEcoregionsMap() {
  const [selectedEcoregion, setSelectedEcoregion] = useState<EcoregionData | null>(null)
  const [hoveredEcoregion, setHoveredEcoregion] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterBioregion, setFilterBioregion] = useState<string>("all")

  const filteredEcoregions = ecoregionsData.filter((eco) => {
    const categoryMatch = filterCategory === "all" || eco.category === filterCategory
    const bioregionMatch = filterBioregion === "all" || eco.bioregion === filterBioregion
    return categoryMatch && bioregionMatch
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "#DC2626"
      case "Vulnerable":
        return "#F59E0B"
      case "Stable":
        return "#10B981"
      case "Relatively Stable":
        return "#059669"
      default:
        return "#6B7280"
    }
  }

  const uniqueBioregions = Array.from(new Set(ecoregionsData.map((eco) => eco.bioregion)))

  return (
    <div className="w-full">
      {/* Filter Buttons */}
      <div className="space-y-4 mb-6">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            variant={filterCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterCategory("all")}
            className="text-xs sm:text-sm"
          >
            All Ecoregions
          </Button>
          <Button
            variant={filterCategory === "terrestrial" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterCategory("terrestrial")}
            className="text-xs sm:text-sm"
          >
            <TreePine className="w-3 h-3 mr-1" />
            Terrestrial
          </Button>
          <Button
            variant={filterCategory === "marine" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterCategory("marine")}
            className="text-xs sm:text-sm"
          >
            <Droplets className="w-3 h-3 mr-1" />
            Marine
          </Button>
          <Button
            variant={filterCategory === "freshwater" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterCategory("freshwater")}
            className="text-xs sm:text-sm"
          >
            <Fish className="w-3 h-3 mr-1" />
            Freshwater
          </Button>
        </div>

        {/* Bioregion Filters */}
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            variant={filterBioregion === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterBioregion("all")}
            className="text-xs sm:text-sm"
          >
            All Bioregions
          </Button>
          {uniqueBioregions.map((bioregion) => (
            <Button
              key={bioregion}
              variant={filterBioregion === bioregion ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterBioregion(bioregion)}
              className="text-xs sm:text-sm border-2 transition-all duration-200"
              style={{
                backgroundColor:
                  filterBioregion === bioregion
                    ? bioregionColors[bioregion as keyof typeof bioregionColors]
                    : "transparent",
                borderColor: bioregionColors[bioregion as keyof typeof bioregionColors],
                color:
                  filterBioregion === bioregion ? "white" : bioregionColors[bioregion as keyof typeof bioregionColors],
              }}
            >
              {bioregion}
            </Button>
          ))}
        </div>
      </div>

      {/* Map Container with Real Colombia Bioregions Map */}
      <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-4 mb-8">
        <div className="aspect-[4/3] w-full max-w-5xl mx-auto relative">
          {/* Base Map Image */}
          <div className="relative w-full h-full">
            <img
              src="/images/colombia-bioregions-map.png"
              alt="Colombia Bioregions Map"
              className="w-full h-full object-contain rounded-lg shadow-lg"
            />

            {/* Interactive Overlay with Positioned Markers */}
            <div className="absolute inset-0">
              {filteredEcoregions.map((ecoregion) => (
                <div
                  key={ecoregion.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{
                    left: `${ecoregion.coordinates.x}%`,
                    top: `${ecoregion.coordinates.y}%`,
                  }}
                  onMouseEnter={() => setHoveredEcoregion(ecoregion.id)}
                  onMouseLeave={() => setHoveredEcoregion(null)}
                  onClick={() => setSelectedEcoregion(ecoregion)}
                >
                  {/* Interactive Marker */}
                  <div
                    className={`w-6 h-6 rounded-full border-3 border-white shadow-lg group-hover:scale-125 transition-all duration-200 ${
                      hoveredEcoregion === ecoregion.id ? "scale-125 ring-4 ring-white ring-opacity-50" : ""
                    }`}
                    style={{
                      backgroundColor: ecoregion.color,
                      borderColor: getPriorityColor(ecoregion.priority),
                      borderWidth: "3px",
                    }}
                  />

                  {/* Region Label */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-md shadow-md text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20 border">
                    <div className="font-semibold text-gray-900">{ecoregion.bioregion}</div>
                    <div className="text-gray-600">{ecoregion.name.split(" ").slice(0, 3).join(" ")}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hover tooltip */}
        {hoveredEcoregion && (
          <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-xl border-2 max-w-xs z-30">
            <h4 className="font-semibold text-gray-900 text-sm mb-1">
              {ecoregionsData.find((r) => r.id === hoveredEcoregion)?.name}
            </h4>
            <p className="text-xs text-gray-600 mb-2">
              {ecoregionsData.find((r) => r.id === hoveredEcoregion)?.description}
            </p>
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant="secondary"
                className="text-xs"
                style={{
                  backgroundColor:
                    getPriorityColor(ecoregionsData.find((r) => r.id === hoveredEcoregion)?.priority || "Stable") +
                    "20",
                  color: getPriorityColor(ecoregionsData.find((r) => r.id === hoveredEcoregion)?.priority || "Stable"),
                }}
              >
                {ecoregionsData.find((r) => r.id === hoveredEcoregion)?.priority}
              </Badge>
              <Badge
                variant="outline"
                className="text-xs border-2"
                style={{
                  borderColor: ecoregionsData.find((r) => r.id === hoveredEcoregion)?.color,
                  color: ecoregionsData.find((r) => r.id === hoveredEcoregion)?.color,
                  backgroundColor: ecoregionsData.find((r) => r.id === hoveredEcoregion)?.color + "10",
                }}
              >
                {ecoregionsData.find((r) => r.id === hoveredEcoregion)?.bioregion}
              </Badge>
            </div>
            <p className="text-xs text-gray-500">Click for detailed information</p>
          </div>
        )}
      </div>

      {/* Enhanced Legend with Color-Coded Sections */}
      <div className="space-y-6 mb-8">
        {/* Priority Legend */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Conservation Priority</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-600 border-2 border-white shadow-sm" />
              <span className="text-xs text-gray-600">Critical Priority</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-500 border-2 border-white shadow-sm" />
              <span className="text-xs text-gray-600">Vulnerable</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-600 border-2 border-white shadow-sm" />
              <span className="text-xs text-gray-600">Stable</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-emerald-600 border-2 border-white shadow-sm" />
              <span className="text-xs text-gray-600">Relatively Stable</span>
            </div>
          </div>
        </div>

        {/* Bioregion Legend with Color-Coded Cards */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Colombian Bioregions</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Mountain Regions - Brown Shades */}
            <Card className="border-2" style={{ borderColor: bioregionColors["Central Andes"] + "40" }}>
              <CardContent className="p-4">
                <h5 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Mountain className="w-4 h-4" />
                  Mountain Regions
                </h5>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: bioregionColors["Central Andes"] }}
                    />
                    <span className="text-xs text-gray-600">Central Andes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: bioregionColors["Eastern Andes"] }}
                    />
                    <span className="text-xs text-gray-600">Eastern Andes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: bioregionColors["Western Andes"] }}
                    />
                    <span className="text-xs text-gray-600">Western Andes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: bioregionColors["Sierra Nevada de Santa Marta"] }}
                    />
                    <span className="text-xs text-gray-600">SNSM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: bioregionColors["Massif Colombiano"] }}
                    />
                    <span className="text-xs text-gray-600">Massif</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Forest Regions - Green Shades */}
            <Card className="border-2" style={{ borderColor: bioregionColors["Pacific"] + "40" }}>
              <CardContent className="p-4">
                <h5 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <TreePine className="w-4 h-4" />
                  Forest Regions
                </h5>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: bioregionColors["Pacific"] }}
                    />
                    <span className="text-xs text-gray-600">Pacific</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: bioregionColors["Amazon"] }}
                    />
                    <span className="text-xs text-gray-600">Amazon</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Valley Regions - Blue Shades */}
            <Card className="border-2" style={{ borderColor: bioregionColors["Cauca Valley"] + "40" }}>
              <CardContent className="p-4">
                <h5 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Droplets className="w-4 h-4" />
                  Valley Regions
                </h5>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: bioregionColors["Cauca Valley"] }}
                    />
                    <span className="text-xs text-gray-600">Cauca Valley</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: bioregionColors["Magdalena Valley"] }}
                    />
                    <span className="text-xs text-gray-600">Magdalena Valley</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lowland Regions - Orange/Yellow Shades */}
            <Card className="border-2" style={{ borderColor: bioregionColors["Llanos"] + "40" }}>
              <CardContent className="p-4">
                <h5 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Lowland Regions
                </h5>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: bioregionColors["Llanos"] }}
                    />
                    <span className="text-xs text-gray-600">Llanos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: bioregionColors["Caribbean"] }}
                    />
                    <span className="text-xs text-gray-600">Caribbean</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Detailed Information Panel */}
      {selectedEcoregion && (
        <Card className="mt-8 border-2" style={{ borderColor: selectedEcoregion.color + "40" }}>
          <CardHeader style={{ backgroundColor: selectedEcoregion.color + "05" }}>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
                  {selectedEcoregion.category === "terrestrial" && (
                    <TreePine className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: selectedEcoregion.color }} />
                  )}
                  {selectedEcoregion.category === "marine" && (
                    <Droplets className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: selectedEcoregion.color }} />
                  )}
                  {selectedEcoregion.category === "freshwater" && (
                    <Fish className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: selectedEcoregion.color }} />
                  )}
                  {selectedEcoregion.name}
                </CardTitle>
                <CardDescription className="text-sm sm:text-base mt-2">{selectedEcoregion.description}</CardDescription>
                <div className="flex gap-2 mt-3">
                  <Badge
                    variant="secondary"
                    style={{
                      backgroundColor: getPriorityColor(selectedEcoregion.priority) + "20",
                      color: getPriorityColor(selectedEcoregion.priority),
                    }}
                  >
                    {selectedEcoregion.priority} Priority
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-2"
                    style={{
                      borderColor: selectedEcoregion.color,
                      color: selectedEcoregion.color,
                      backgroundColor: selectedEcoregion.color + "10",
                    }}
                  >
                    {selectedEcoregion.bioregion}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {selectedEcoregion.category}
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedEcoregion(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Geographic & Climate Information */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Mountain className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: selectedEcoregion.color }} />
                  Geographic & Climate Data
                </h4>
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Area:</span>
                    <span className="font-medium">{selectedEcoregion.area}</span>
                  </div>
                  {selectedEcoregion.elevation && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Elevation:</span>
                      <span className="font-medium">{selectedEcoregion.elevation}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Climate:</span>
                    <span className="font-medium">{selectedEcoregion.climate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Precipitation:</span>
                    <span className="font-medium">{selectedEcoregion.precipitation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Temperature:</span>
                    <span className="font-medium">{selectedEcoregion.temperature}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Best Time:</span>
                    <span className="font-medium">{selectedEcoregion.bestTime}</span>
                  </div>
                </div>
              </div>

              {/* Conservation Information */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: selectedEcoregion.color }} />
                  Conservation Status
                </h4>
                <p className="text-sm text-gray-600 mb-3">{selectedEcoregion.conservation}</p>

                <h5 className="font-medium text-gray-900 mb-2 text-sm">Protected Areas:</h5>
                <ul className="space-y-1 mb-4">
                  {selectedEcoregion.protectedAreas.map((area, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedEcoregion.color }} />
                      {area}
                    </li>
                  ))}
                </ul>

                <h5 className="font-medium text-gray-900 mb-2 text-sm">Main Threats:</h5>
                <div className="flex flex-wrap gap-1">
                  {selectedEcoregion.threats.map((threat, index) => (
                    <Badge key={index} variant="destructive" className="text-xs">
                      {threat}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Bird Species */}
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Bird className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: selectedEcoregion.color }} />
                Bird Species Highlights
              </h4>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-900 mb-3 text-sm">Endemic Species</h5>
                  <div className="space-y-2">
                    {selectedEcoregion.endemicSpecies.map((species, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="mr-2 mb-2 text-xs border"
                        style={{
                          backgroundColor: selectedEcoregion.color + "20",
                          color: selectedEcoregion.color,
                          borderColor: selectedEcoregion.color + "40",
                        }}
                      >
                        {species}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-3 text-sm">Key Species</h5>
                  <div className="space-y-2">
                    {selectedEcoregion.keySpecies.map((species, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="mr-2 mb-2 text-xs"
                        style={{
                          borderColor: selectedEcoregion.color,
                          color: selectedEcoregion.color,
                        }}
                      >
                        {species}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-6 border-t flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="flex-1"
                style={{
                  backgroundColor: selectedEcoregion.color,
                  borderColor: selectedEcoregion.color,
                }}
              >
                <a href="/tours">
                  <Bird className="w-4 h-4 mr-2" />
                  Explore Tours in This Bioregion
                </a>
              </Button>
              <Button
                variant="outline"
                asChild
                className="flex-1 border-2 bg-transparent"
                style={{
                  borderColor: selectedEcoregion.color,
                  color: selectedEcoregion.color,
                }}
              >
                <a href="/contact">
                  <Users className="w-4 h-4 mr-2" />
                  Plan Your Visit
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
