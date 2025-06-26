"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Bird, Mountain, Droplets } from "lucide-react"

interface BioregionData {
  id: string
  name: string
  description: string
  area: string
  elevation: string
  climate: string
  bestTime: string
  endemicSpecies: string[]
  keySpecies: string[]
  culturalHighlights: string[]
  geography: string[]
  conservation: string
  color: string
}

const bioregionsData: BioregionData[] = [
  {
    id: "caribbean-tayrona",
    name: "Caribbean & Tayrona",
    description:
      "Home to the Sierra Nevada de Santa Marta, the world's highest coastal mountain range and a hotspot for endemic species.",
    area: "23,000 km²",
    elevation: "0 - 5,775m",
    climate: "Tropical to alpine",
    bestTime: "December - March, July - August",
    endemicSpecies: [
      "Santa Marta Parakeet",
      "White-tailed Starfrontlet",
      "Santa Marta Antbird",
      "Santa Marta Bush-Tyrant",
      "Santa Marta Warbler",
    ],
    keySpecies: [
      "Blue-billed Curassow",
      "Brown-rumped Tapaculo",
      "White-lored Warbler",
      "Rusty-headed Spinetail",
      "Santa Marta Woodstar",
    ],
    culturalHighlights: [
      "Kogí indigenous communities",
      "Arhuaco traditional territories",
      "Wiwa ancestral lands",
      "Kankuamo cultural heritage",
    ],
    geography: [
      "Coastal plains and beaches",
      "Tropical dry forests",
      "Cloud forests (1,500-3,000m)",
      "Páramo ecosystems",
      "Snow-capped peaks",
    ],
    conservation: "Critical habitat protection for 20+ endemic species",
    color: "#3B82F6",
  },
  {
    id: "choco",
    name: "Chocó Bioregion",
    description:
      "The world's most biodiverse rainforest per square kilometer, extending along Colombia's Pacific coast.",
    area: "187,000 km²",
    elevation: "0 - 4,000m",
    climate: "Tropical rainforest",
    bestTime: "Year-round (drier: January-March, July-September)",
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
    culturalHighlights: [
      "Afro-Colombian communities",
      "Emberá indigenous groups",
      "Traditional fishing villages",
      "Sustainable palm cultivation",
    ],
    geography: [
      "Mangrove swamps",
      "Lowland rainforests",
      "Montane cloud forests",
      "Pacific coastal plains",
      "River deltas and estuaries",
    ],
    conservation: "UNESCO Biosphere Reserve with critical habitat protection",
    color: "#10B981",
  },
  {
    id: "western-andes",
    name: "Western Andes",
    description: "The western mountain range featuring diverse elevational zones and high levels of endemism.",
    area: "76,000 km²",
    elevation: "1,000 - 4,250m",
    climate: "Montane tropical",
    bestTime: "December - March, June - August",
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
    culturalHighlights: [
      "Coffee growing communities",
      "Paisa cultural region",
      "Traditional mountain villages",
      "Artisan craft centers",
    ],
    geography: [
      "Cloud forests (1,500-3,000m)",
      "Montane forests",
      "Páramo grasslands",
      "Deep river valleys",
      "Steep mountain slopes",
    ],
    conservation: "Protected areas covering 35% of the region",
    color: "#8B5CF6",
  },
  {
    id: "cauca-valley",
    name: "Cauca Valley",
    description: "A fertile inter-Andean valley known for its dry forests and agricultural landscapes.",
    area: "22,000 km²",
    elevation: "900 - 2,000m",
    climate: "Tropical dry to humid",
    bestTime: "December - March, July - August",
    endemicSpecies: ["Cauca Poison Frog (associated birds)", "Valle Antbird", "Cauca Brush-Finch"],
    keySpecies: [
      "Red-bellied Grackle",
      "Scrub Greenlet",
      "Apical Flycatcher",
      "Bicolored Wren",
      "Yellow-crowned Redstart",
    ],
    culturalHighlights: [
      "Afro-Colombian heritage",
      "Sugar cane traditions",
      "Salsa music origins",
      "Colonial architecture",
    ],
    geography: [
      "River valley floor",
      "Dry tropical forests",
      "Gallery forests",
      "Agricultural plains",
      "Foothill transitions",
    ],
    conservation: "Habitat restoration projects for dry forest ecosystems",
    color: "#F59E0B",
  },
  {
    id: "central-andes",
    name: "Central Andes",
    description: "The central mountain range featuring the famous Coffee Triangle and diverse montane ecosystems.",
    area: "110,000 km²",
    elevation: "1,000 - 5,400m",
    climate: "Montane tropical to alpine",
    bestTime: "December - March, June - August",
    endemicSpecies: [
      "Tolima Dove",
      "Brown-banded Antpitta",
      "Stiles's Tapaculo",
      "Antioquia Wren",
      "Paramillo Tapaculo",
    ],
    keySpecies: [
      "Multicolored Tanager",
      "Golden-ringed Tanager",
      "Lacrimose Mountain-Tanager",
      "Powerful Woodpecker",
      "Mountain Velvetbreast",
    ],
    culturalHighlights: [
      "Coffee Cultural Landscape (UNESCO)",
      "Paisa traditions",
      "Guambiano indigenous culture",
      "Colonial coffee towns",
    ],
    geography: [
      "Coffee plantations (1,200-2,000m)",
      "Cloud forests",
      "Páramo ecosystems",
      "Volcanic peaks",
      "Deep canyons",
    ],
    conservation: "Coffee shade cultivation supporting bird diversity",
    color: "#DC2626",
  },
  {
    id: "magdalena-valley",
    name: "Magdalena Valley",
    description: "Colombia's principal river valley, featuring dry forests and wetland ecosystems.",
    area: "190,000 km²",
    elevation: "0 - 1,500m",
    climate: "Tropical dry to humid",
    bestTime: "December - March, July - August",
    endemicSpecies: ["Niceforo's Wren", "Magdalena Antbird", "Sooty Ant-Tanager"],
    keySpecies: [
      "Magdalena Tinamou",
      "Lance-tailed Manakin",
      "Russet-throated Puffbird",
      "Scaled Piculet",
      "Greyish Piculet",
    ],
    culturalHighlights: [
      "River port traditions",
      "Vallenato music heritage",
      "Colonial river towns",
      "Fishing communities",
    ],
    geography: [
      "Magdalena River system",
      "Dry tropical forests",
      "Wetlands and marshes",
      "Gallery forests",
      "Floodplains",
    ],
    conservation: "Wetland restoration and dry forest protection",
    color: "#059669",
  },
  {
    id: "eastern-andes",
    name: "Eastern Andes",
    description: "The eastern mountain range including Bogotá's surroundings and extensive páramo ecosystems.",
    area: "130,000 km²",
    elevation: "500 - 5,400m",
    climate: "Montane tropical to alpine",
    bestTime: "December - March, June - August",
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
    culturalHighlights: [
      "Muisca indigenous heritage",
      "Colonial Boyacá towns",
      "Emerald mining regions",
      "Highland farming communities",
    ],
    geography: [
      "Extensive páramo (3,000-4,000m)",
      "Cloud forests",
      "High-altitude lakes",
      "Andean valleys",
      "Glacial peaks",
    ],
    conservation: "Páramo ecosystem protection for water security",
    color: "#7C3AED",
  },
  {
    id: "llanos",
    name: "Llanos",
    description: "Vast tropical grasslands extending into Venezuela, supporting unique grassland bird communities.",
    area: "250,000 km²",
    elevation: "100 - 500m",
    climate: "Tropical savanna",
    bestTime: "December - March (dry season)",
    endemicSpecies: ["Orinoco Goose", "Llanos Long-tailed Tyrant"],
    keySpecies: ["Jabiru", "Orinoco Goose", "Scarlet Ibis", "Sunbittern", "Hoatzin"],
    culturalHighlights: [
      "Llanero cowboy culture",
      "Joropo music traditions",
      "Cattle ranching heritage",
      "Indigenous Sikuani communities",
    ],
    geography: ["Seasonal wetlands", "Gallery forests", "Open grasslands", "River systems", "Scattered palm groves"],
    conservation: "Sustainable ranching practices supporting wildlife",
    color: "#EAB308",
  },
  {
    id: "amazon",
    name: "Amazon",
    description: "Colombia's portion of the world's largest rainforest, featuring incredible biodiversity.",
    area: "483,000 km²",
    elevation: "100 - 500m",
    climate: "Tropical rainforest",
    bestTime: "June - September (drier season)",
    endemicSpecies: ["Caquetá Seedeater", "Yapacana Antbird"],
    keySpecies: ["Harpy Eagle", "Zigzag Heron", "Amazonian Umbrellabird", "Nocturnal Curassow", "Pavonine Quetzal"],
    culturalHighlights: [
      "Tikuna indigenous communities",
      "Huitoto traditional knowledge",
      "Yagua cultural practices",
      "Sustainable forest management",
    ],
    geography: ["Terra firme forests", "Várzea floodplains", "Igapó forests", "River systems", "Forest clearings"],
    conservation: "Indigenous territories protecting 80% of forest cover",
    color: "#16A34A",
  },
  {
    id: "colombian-massif",
    name: "Colombian Massif",
    description: "The mountainous region where the Andes divide into three ranges, featuring high endemism.",
    area: "35,000 km²",
    elevation: "1,000 - 4,750m",
    climate: "Montane tropical to alpine",
    bestTime: "December - March, June - August",
    endemicSpecies: ["Colorful Puffleg", "Gorgeted Puffleg", "Puracé Tapaculo", "Nariño Tapaculo"],
    keySpecies: [
      "Bearded Helmetcrest",
      "Rainbow-bearded Thornbill",
      "Golden-breasted Puffleg",
      "Sword-billed Hummingbird",
      "Giant Hummingbird",
    ],
    culturalHighlights: [
      "Nasa indigenous communities",
      "Coconuco thermal springs",
      "Archaeological sites",
      "Traditional weaving",
    ],
    geography: ["Volcanic peaks", "Páramo ecosystems", "Cloud forests", "Thermal springs", "Deep valleys"],
    conservation: "National parks protecting critical watersheds",
    color: "#BE185D",
  },
]

export function InteractiveBioregionsMap() {
  const [selectedRegion, setSelectedRegion] = useState<BioregionData | null>(null)
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  return (
    <div className="w-full">
      {/* Map Container */}
      <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-4 mb-8">
        <div className="aspect-[4/3] w-full max-w-4xl mx-auto relative">
          <svg
            viewBox="0 0 800 600"
            className="w-full h-full"
            style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" }}
          >
            {/* Colombia outline and regions */}
            <defs>
              <pattern id="water" patternUnits="userSpaceOnUse" width="4" height="4">
                <rect width="4" height="4" fill="#3B82F6" opacity="0.1" />
                <path d="M 0,4 l 4,-4 M -1,1 l 2,-2 M 3,5 l 2,-2" stroke="#3B82F6" strokeWidth="0.5" opacity="0.3" />
              </pattern>
            </defs>

            {/* Caribbean Sea */}
            <rect x="0" y="0" width="800" height="150" fill="url(#water)" />

            {/* Pacific Ocean */}
            <rect x="0" y="150" width="200" height="450" fill="url(#water)" />

            {/* Caribbean & Tayrona */}
            <path
              d="M 200 50 L 400 50 L 450 100 L 400 150 L 200 150 Z"
              fill={hoveredRegion === "caribbean-tayrona" ? "#3B82F6" : "#DBEAFE"}
              stroke="#1E40AF"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onMouseEnter={() => setHoveredRegion("caribbean-tayrona")}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => setSelectedRegion(bioregionsData.find((r) => r.id === "caribbean-tayrona") || null)}
            />

            {/* Chocó Bioregion */}
            <path
              d="M 200 150 L 300 150 L 320 300 L 280 450 L 200 450 Z"
              fill={hoveredRegion === "choco" ? "#10B981" : "#D1FAE5"}
              stroke="#047857"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onMouseEnter={() => setHoveredRegion("choco")}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => setSelectedRegion(bioregionsData.find((r) => r.id === "choco") || null)}
            />

            {/* Western Andes */}
            <path
              d="M 300 150 L 400 150 L 420 300 L 380 450 L 320 450 L 320 300 Z"
              fill={hoveredRegion === "western-andes" ? "#8B5CF6" : "#EDE9FE"}
              stroke="#7C3AED"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onMouseEnter={() => setHoveredRegion("western-andes")}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => setSelectedRegion(bioregionsData.find((r) => r.id === "western-andes") || null)}
            />

            {/* Cauca Valley */}
            <path
              d="M 400 200 L 480 200 L 480 350 L 420 350 L 420 300 L 400 250 Z"
              fill={hoveredRegion === "cauca-valley" ? "#F59E0B" : "#FEF3C7"}
              stroke="#D97706"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onMouseEnter={() => setHoveredRegion("cauca-valley")}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => setSelectedRegion(bioregionsData.find((r) => r.id === "cauca-valley") || null)}
            />

            {/* Central Andes */}
            <path
              d="M 480 150 L 580 150 L 600 300 L 560 450 L 480 450 L 480 350 L 480 200 Z"
              fill={hoveredRegion === "central-andes" ? "#DC2626" : "#FEE2E2"}
              stroke="#B91C1C"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onMouseEnter={() => setHoveredRegion("central-andes")}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => setSelectedRegion(bioregionsData.find((r) => r.id === "central-andes") || null)}
            />

            {/* Magdalena Valley */}
            <path
              d="M 450 100 L 550 100 L 580 150 L 580 300 L 520 350 L 480 300 L 450 200 Z"
              fill={hoveredRegion === "magdalena-valley" ? "#059669" : "#D1FAE5"}
              stroke="#047857"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onMouseEnter={() => setHoveredRegion("magdalena-valley")}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => setSelectedRegion(bioregionsData.find((r) => r.id === "magdalena-valley") || null)}
            />

            {/* Eastern Andes */}
            <path
              d="M 580 150 L 680 150 L 700 300 L 660 450 L 600 450 L 600 300 Z"
              fill={hoveredRegion === "eastern-andes" ? "#7C3AED" : "#EDE9FE"}
              stroke="#6D28D9"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onMouseEnter={() => setHoveredRegion("eastern-andes")}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => setSelectedRegion(bioregionsData.find((r) => r.id === "eastern-andes") || null)}
            />

            {/* Llanos */}
            <path
              d="M 680 150 L 800 150 L 800 350 L 700 350 L 700 300 Z"
              fill={hoveredRegion === "llanos" ? "#EAB308" : "#FEF3C7"}
              stroke="#CA8A04"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onMouseEnter={() => setHoveredRegion("llanos")}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => setSelectedRegion(bioregionsData.find((r) => r.id === "llanos") || null)}
            />

            {/* Amazon */}
            <path
              d="M 560 450 L 800 450 L 800 600 L 200 600 L 280 450 L 380 450 Z"
              fill={hoveredRegion === "amazon" ? "#16A34A" : "#DCFCE7"}
              stroke="#15803D"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onMouseEnter={() => setHoveredRegion("amazon")}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => setSelectedRegion(bioregionsData.find((r) => r.id === "amazon") || null)}
            />

            {/* Colombian Massif */}
            <path
              d="M 380 450 L 480 450 L 520 500 L 480 550 L 380 550 L 340 500 Z"
              fill={hoveredRegion === "colombian-massif" ? "#BE185D" : "#FCE7F3"}
              stroke="#BE185D"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200 hover:opacity-80"
              onMouseEnter={() => setHoveredRegion("colombian-massif")}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => setSelectedRegion(bioregionsData.find((r) => r.id === "colombian-massif") || null)}
            />

            {/* Region Labels */}
            <text x="325" y="100" textAnchor="middle" className="text-xs font-medium fill-gray-700">
              Caribbean & Tayrona
            </text>
            <text x="250" y="300" textAnchor="middle" className="text-xs font-medium fill-gray-700">
              Chocó
            </text>
            <text x="360" y="300" textAnchor="middle" className="text-xs font-medium fill-gray-700">
              Western Andes
            </text>
            <text x="440" y="275" textAnchor="middle" className="text-xs font-medium fill-gray-700">
              Cauca Valley
            </text>
            <text x="530" y="300" textAnchor="middle" className="text-xs font-medium fill-gray-700">
              Central Andes
            </text>
            <text x="515" y="225" textAnchor="middle" className="text-xs font-medium fill-gray-700">
              Magdalena Valley
            </text>
            <text x="640" y="300" textAnchor="middle" className="text-xs font-medium fill-gray-700">
              Eastern Andes
            </text>
            <text x="740" y="250" textAnchor="middle" className="text-xs font-medium fill-gray-700">
              Llanos
            </text>
            <text x="500" y="525" textAnchor="middle" className="text-xs font-medium fill-gray-700">
              Amazon
            </text>
            <text x="430" y="500" textAnchor="middle" className="text-xs font-medium fill-gray-700">
              Colombian Massif
            </text>
          </svg>
        </div>

        {/* Hover tooltip */}
        {hoveredRegion && (
          <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg border max-w-xs">
            <h4 className="font-semibold text-gray-900">{bioregionsData.find((r) => r.id === hoveredRegion)?.name}</h4>
            <p className="text-sm text-gray-600 mt-1">
              {bioregionsData.find((r) => r.id === hoveredRegion)?.description}
            </p>
            <p className="text-xs text-gray-500 mt-2">Click for detailed information</p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-8">
        {bioregionsData.map((region) => (
          <div key={region.id} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded border"
              style={{ backgroundColor: region.color + "40", borderColor: region.color }}
            />
            <span className="text-xs text-gray-600">{region.name}</span>
          </div>
        ))}
      </div>

      {/* Detailed Information Panel */}
      {selectedRegion && (
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                  {selectedRegion.name}
                </CardTitle>
                <CardDescription className="text-lg mt-2">{selectedRegion.description}</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedRegion(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Geographic Information */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Mountain className="w-5 h-5 text-blue-600" />
                  Geographic Features
                </h4>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Area:</span>
                    <span className="font-medium">{selectedRegion.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Elevation:</span>
                    <span className="font-medium">{selectedRegion.elevation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Climate:</span>
                    <span className="font-medium">{selectedRegion.climate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Best Time:</span>
                    <span className="font-medium">{selectedRegion.bestTime}</span>
                  </div>
                </div>

                <h5 className="font-medium text-gray-900 mb-2">Key Landscapes:</h5>
                <ul className="space-y-1">
                  {selectedRegion.geography.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cultural and Conservation */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Cultural Highlights
                </h4>
                <ul className="space-y-1 mb-4">
                  {selectedRegion.culturalHighlights.map((highlight, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-green-600" />
                  Conservation Status
                </h5>
                <p className="text-sm text-gray-600">{selectedRegion.conservation}</p>
              </div>
            </div>

            {/* Bird Species */}
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Bird className="w-5 h-5 text-emerald-600" />
                Bird Species Highlights
              </h4>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-900 mb-3">Endemic Species</h5>
                  <div className="space-y-2">
                    {selectedRegion.endemicSpecies.map((species, index) => (
                      <Badge key={index} variant="secondary" className="mr-2 mb-2">
                        {species}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-3">Key Species</h5>
                  <div className="space-y-2">
                    {selectedRegion.keySpecies.map((species, index) => (
                      <Badge key={index} variant="outline" className="mr-2 mb-2">
                        {species}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-6 border-t flex gap-4">
              <Button asChild>
                <a href="/tours">
                  <Bird className="w-4 h-4 mr-2" />
                  Explore Tours in This Region
                </a>
              </Button>
              <Button variant="outline" asChild>
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
