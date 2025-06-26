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
}

const ecoregionsData: EcoregionData[] = [
  // TERRESTRIAL ECOREGIONS
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
    coordinates: { x: 150, y: 300 },
    color: "#059669",
    priority: "Critical",
  },
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
    coordinates: { x: 400, y: 250 },
    color: "#DC2626",
    priority: "Critical",
  },
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
    coordinates: { x: 450, y: 100 },
    color: "#3B82F6",
    priority: "Critical",
  },
  {
    id: "northwestern-andean-montane-forests",
    name: "Northwestern Andean Montane Forests",
    category: "terrestrial",
    description: "Cloud forests of the Western and Central Cordilleras with exceptional bird diversity.",
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
    coordinates: { x: 300, y: 200 },
    color: "#8B5CF6",
    priority: "Vulnerable",
  },
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
    coordinates: { x: 500, y: 200 },
    color: "#7C3AED",
    priority: "Vulnerable",
  },
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
    coordinates: { x: 600, y: 250 },
    color: "#EAB308",
    priority: "Stable",
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
    coordinates: { x: 450, y: 400 },
    color: "#16A34A",
    priority: "Vulnerable",
  },
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
    coordinates: { x: 400, y: 500 },
    color: "#059669",
    priority: "Relatively Stable",
  },
]

export function ComprehensiveEcoregionsMap() {
  const [selectedEcoregion, setSelectedEcoregion] = useState<EcoregionData | null>(null)
  const [hoveredEcoregion, setHoveredEcoregion] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>("all")

  const filteredEcoregions =
    filterCategory === "all" ? ecoregionsData : ecoregionsData.filter((eco) => eco.category === filterCategory)

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

  return (
    <div className="w-full">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
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

      {/* Map Container */}
      <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-4 mb-8">
        <div className="aspect-[4/3] w-full max-w-5xl mx-auto relative">
          <svg
            viewBox="0 0 800 600"
            className="w-full h-full"
            style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" }}
          >
            {/* Background */}
            <defs>
              <pattern id="water" patternUnits="userSpaceOnUse" width="4" height="4">
                <rect width="4" height="4" fill="#3B82F6" opacity="0.1" />
                <path d="M 0,4 l 4,-4 M -1,1 l 2,-2 M 3,5 l 2,-2" stroke="#3B82F6" strokeWidth="0.5" opacity="0.3" />
              </pattern>
            </defs>

            {/* Caribbean Sea */}
            <rect x="0" y="0" width="800" height="120" fill="url(#water)" />
            <text x="400" y="60" textAnchor="middle" className="text-sm font-medium fill-blue-600">
              Caribbean Sea
            </text>

            {/* Pacific Ocean */}
            <rect x="0" y="120" width="180" height="480" fill="url(#water)" />
            <text
              x="90"
              y="360"
              textAnchor="middle"
              className="text-sm font-medium fill-blue-600"
              transform="rotate(-90 90 360)"
            >
              Pacific Ocean
            </text>

            {/* Colombia Outline */}
            <path
              d="M 180 120 L 700 120 L 750 200 L 800 300 L 800 500 L 700 580 L 200 600 L 180 500 L 200 400 L 180 300 Z"
              fill="#F9FAFB"
              stroke="#D1D5DB"
              strokeWidth="2"
            />

            {/* Ecoregion Areas */}
            {filteredEcoregions.map((ecoregion) => (
              <g key={ecoregion.id}>
                <circle
                  cx={ecoregion.coordinates.x}
                  cy={ecoregion.coordinates.y}
                  r={hoveredEcoregion === ecoregion.id ? "25" : "20"}
                  fill={ecoregion.color}
                  opacity={hoveredEcoregion === ecoregion.id ? "0.8" : "0.6"}
                  stroke={getPriorityColor(ecoregion.priority)}
                  strokeWidth="3"
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredEcoregion(ecoregion.id)}
                  onMouseLeave={() => setHoveredEcoregion(null)}
                  onClick={() => setSelectedEcoregion(ecoregion)}
                />
                <text
                  x={ecoregion.coordinates.x}
                  y={ecoregion.coordinates.y + 35}
                  textAnchor="middle"
                  className="text-xs font-medium fill-gray-700 pointer-events-none"
                >
                  {ecoregion.name.split(" ").slice(0, 2).join(" ")}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Hover tooltip */}
        {hoveredEcoregion && (
          <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg border max-w-xs">
            <h4 className="font-semibold text-gray-900 text-sm">
              {ecoregionsData.find((r) => r.id === hoveredEcoregion)?.name}
            </h4>
            <p className="text-xs text-gray-600 mt-1">
              {ecoregionsData.find((r) => r.id === hoveredEcoregion)?.description}
            </p>
            <div className="flex items-center gap-2 mt-2">
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
            </div>
            <p className="text-xs text-gray-500 mt-2">Click for detailed information</p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-600" />
          <span className="text-xs text-gray-600">Critical Priority</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-orange-500" />
          <span className="text-xs text-gray-600">Vulnerable</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-600" />
          <span className="text-xs text-gray-600">Stable</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-emerald-600" />
          <span className="text-xs text-gray-600">Relatively Stable</span>
        </div>
      </div>

      {/* Detailed Information Panel */}
      {selectedEcoregion && (
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
                  {selectedEcoregion.category === "terrestrial" && (
                    <TreePine className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  )}
                  {selectedEcoregion.category === "marine" && (
                    <Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  )}
                  {selectedEcoregion.category === "freshwater" && (
                    <Fish className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
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
                  <Mountain className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
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
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  Conservation Status
                </h4>
                <p className="text-sm text-gray-600 mb-3">{selectedEcoregion.conservation}</p>

                <h5 className="font-medium text-gray-900 mb-2 text-sm">Protected Areas:</h5>
                <ul className="space-y-1 mb-4">
                  {selectedEcoregion.protectedAreas.map((area, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
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
                <Bird className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                Bird Species Highlights
              </h4>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-900 mb-3 text-sm">Endemic Species</h5>
                  <div className="space-y-2">
                    {selectedEcoregion.endemicSpecies.map((species, index) => (
                      <Badge key={index} variant="secondary" className="mr-2 mb-2 text-xs">
                        {species}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-3 text-sm">Key Species</h5>
                  <div className="space-y-2">
                    {selectedEcoregion.keySpecies.map((species, index) => (
                      <Badge key={index} variant="outline" className="mr-2 mb-2 text-xs">
                        {species}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-6 border-t flex flex-col sm:flex-row gap-4">
              <Button asChild className="flex-1">
                <a href="/tours">
                  <Bird className="w-4 h-4 mr-2" />
                  Explore Tours in This Ecoregion
                </a>
              </Button>
              <Button variant="outline" asChild className="flex-1">
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
