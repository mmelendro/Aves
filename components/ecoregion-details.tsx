"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Bird, Calendar, AlertTriangle, Shield, Users } from "lucide-react"

interface EcoregionDetailsProps {
  category: "terrestrial" | "marine" | "freshwater"
}

const ecoregionsByCategory = {
  terrestrial: [
    {
      id: "choco-darien",
      name: "Chocó-Darién Moist Forests",
      area: "187,400 km²",
      description: "The world's most biodiverse rainforest per square kilometer",
      priority: "Critical",
      endemics: 15,
      keySpecies: ["Harpy Eagle", "Great Green Macaw", "Banded Ground-Cuckoo"],
      threats: ["Deforestation", "Mining", "Infrastructure"],
      bestTime: "Jan-Mar, Jul-Sep",
    },
    {
      id: "magdalena-valley-dry",
      name: "Magdalena Valley Dry Forests",
      area: "65,000 km²",
      description: "Critically endangered dry forest ecosystem",
      priority: "Critical",
      endemics: 8,
      keySpecies: ["Niceforo's Wren", "Magdalena Antbird", "Sooty Ant-Tanager"],
      threats: ["Agriculture", "Cattle ranching", "Urban development"],
      bestTime: "Dec-Mar",
    },
    {
      id: "santa-marta-montane",
      name: "Santa Marta Montane Forests",
      area: "17,000 km²",
      description: "Highest endemism per unit area in the world",
      priority: "Critical",
      endemics: 20,
      keySpecies: ["Santa Marta Parakeet", "White-tailed Starfrontlet", "Blue-billed Curassow"],
      threats: ["Agriculture", "Climate change", "Infrastructure"],
      bestTime: "Dec-Mar, Jul-Aug",
    },
    {
      id: "northwestern-andean",
      name: "Northwestern Andean Montane Forests",
      area: "54,000 km²",
      description: "Cloud forests with exceptional bird diversity",
      priority: "Vulnerable",
      endemics: 12,
      keySpecies: ["Andean Cock-of-the-rock", "Plate-billed Mountain-Toucan", "Cauca Guan"],
      threats: ["Deforestation", "Coffee expansion", "Mining"],
      bestTime: "Dec-Mar, Jun-Aug",
    },
    {
      id: "eastern-cordillera",
      name: "Eastern Cordillera Real Montane Forests",
      area: "35,000 km²",
      description: "High-altitude forests and páramo ecosystems",
      priority: "Vulnerable",
      endemics: 10,
      keySpecies: ["Apolinar's Wren", "Bogotá Rail", "Andean Flamingo"],
      threats: ["Agriculture", "Urban expansion", "Water extraction"],
      bestTime: "Dec-Mar, Jul-Aug",
    },
    {
      id: "llanos",
      name: "Llanos",
      area: "250,000 km²",
      description: "Vast tropical grasslands with seasonal flooding",
      priority: "Stable",
      endemics: 3,
      keySpecies: ["Jabiru", "Orinoco Goose", "Scarlet Ibis"],
      threats: ["Intensive ranching", "Agriculture", "Infrastructure"],
      bestTime: "Dec-Apr",
    },
    {
      id: "amazon-southwest",
      name: "Southwest Amazon Moist Forests",
      area: "200,000 km²",
      description: "Colombia's portion of the world's largest rainforest",
      priority: "Relatively Stable",
      endemics: 5,
      keySpecies: ["Harpy Eagle", "Zigzag Heron", "Amazonian Umbrellabird"],
      threats: ["Deforestation", "Mining", "Infrastructure"],
      bestTime: "Jun-Sep",
    },
    {
      id: "caqueta-moist",
      name: "Caquetá Moist Forests",
      area: "315,000 km²",
      description: "Transitional forests between Andes and Amazon",
      priority: "Vulnerable",
      endemics: 4,
      keySpecies: ["Caquetá Seedeater", "Crested Eagle", "Nocturnal Curassow"],
      threats: ["Deforestation", "Armed conflict", "Cattle ranching"],
      bestTime: "Jun-Sep, Dec-Feb",
    },
  ],
  marine: [
    {
      id: "caribbean-marine",
      name: "Caribbean Marine Ecoregion",
      area: "589,000 km²",
      description: "Coral reefs, mangroves, and seagrass beds of the Caribbean coast",
      priority: "Vulnerable",
      endemics: 2,
      keySpecies: ["Brown Pelican", "Magnificent Frigatebird", "Royal Tern"],
      threats: ["Coastal development", "Pollution", "Overfishing"],
      bestTime: "Dec-Apr",
    },
    {
      id: "pacific-marine",
      name: "Pacific Marine Ecoregion",
      area: "200,000 km²",
      description: "Mangrove forests and rocky shores of the Pacific coast",
      priority: "Vulnerable",
      endemics: 1,
      keySpecies: ["Brown Booby", "Neotropic Cormorant", "Whimbrel"],
      threats: ["Coastal development", "Shrimp farming", "Pollution"],
      bestTime: "Jun-Nov",
    },
  ],
  freshwater: [
    {
      id: "magdalena-cauca",
      name: "Magdalena-Cauca Freshwater",
      area: "273,000 km²",
      description: "Colombia's principal river system with diverse wetlands",
      priority: "Critical",
      endemics: 6,
      keySpecies: ["Horned Screamer", "Least Bittern", "Pied Water-Tyrant"],
      threats: ["Pollution", "Dam construction", "Habitat conversion"],
      bestTime: "Dec-Mar",
    },
    {
      id: "caribbean-coast-fresh",
      name: "Caribbean Coast Freshwater",
      area: "132,000 km²",
      description: "Coastal rivers, lagoons, and seasonal wetlands",
      priority: "Vulnerable",
      endemics: 2,
      keySpecies: ["Caribbean Coot", "Least Grebe", "Yellow-crowned Night-Heron"],
      threats: ["Agricultural runoff", "Urban development", "Climate change"],
      bestTime: "Dec-Apr",
    },
    {
      id: "orinoco-fresh",
      name: "Orinoco Freshwater",
      area: "347,000 km²",
      description: "Llanos rivers, gallery forests, and seasonal wetlands",
      priority: "Stable",
      endemics: 3,
      keySpecies: ["Sunbittern", "Zigzag Heron", "Capped Heron"],
      threats: ["Cattle ranching", "Agricultural expansion", "Infrastructure"],
      bestTime: "Dec-Apr",
    },
    {
      id: "amazon-fresh",
      name: "Amazon Freshwater",
      area: "645,000 km²",
      description: "World's largest river system with incredible aquatic diversity",
      priority: "Relatively Stable",
      endemics: 4,
      keySpecies: ["Hoatzin", "Horned Screamer", "Cocoi Heron"],
      threats: ["Deforestation", "Mining", "Dam construction"],
      bestTime: "Jun-Sep",
    },
    {
      id: "pacific-coast-fresh",
      name: "Pacific Coast Freshwater",
      area: "76,000 km²",
      description: "Short coastal rivers and estuarine systems",
      priority: "Vulnerable",
      endemics: 1,
      keySpecies: ["Fasciated Tiger-Heron", "Boat-billed Heron", "Green Ibis"],
      threats: ["Deforestation", "Mining", "Agricultural runoff"],
      bestTime: "Jan-Mar, Jul-Sep",
    },
  ],
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Critical":
      return "bg-red-100 text-red-800 border-red-200"
    case "Vulnerable":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "Stable":
      return "bg-green-100 text-green-800 border-green-200"
    case "Relatively Stable":
      return "bg-emerald-100 text-emerald-800 border-emerald-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function EcoregionDetails({ category }: EcoregionDetailsProps) {
  const ecoregions = ecoregionsByCategory[category]

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 capitalize">{category} Ecoregions</h3>
        <p className="text-sm sm:text-base text-gray-600">
          {category === "terrestrial" && "Land-based ecosystems from sea level to high-altitude páramo"}
          {category === "marine" && "Coastal and oceanic ecosystems of Colombia's two seas"}
          {category === "freshwater" && "River systems, lakes, and wetland ecosystems"}
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6">
        {ecoregions.map((ecoregion) => (
          <Card key={ecoregion.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1">
                  <CardTitle className="text-lg sm:text-xl mb-2">{ecoregion.name}</CardTitle>
                  <CardDescription className="text-sm sm:text-base">{ecoregion.description}</CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className={`${getPriorityColor(ecoregion.priority)} text-xs`}>{ecoregion.priority}</Badge>
                  <Badge variant="outline" className="text-xs">
                    {ecoregion.area}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Bird className="w-4 h-4 text-emerald-600" />
                  <span className="text-gray-600">
                    <strong>{ecoregion.endemics}</strong> endemics
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-600">{ecoregion.bestTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-orange-600" />
                  <span className="text-gray-600">
                    <strong>{ecoregion.threats.length}</strong> main threats
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-gray-600">Protected areas</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2 text-sm">Key Species:</h5>
                  <div className="flex flex-wrap gap-1">
                    {ecoregion.keySpecies.map((species, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {species}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2 text-sm">Main Threats:</h5>
                  <div className="flex flex-wrap gap-1">
                    {ecoregion.threats.map((threat, index) => (
                      <Badge key={index} variant="destructive" className="text-xs">
                        {threat}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mt-4 pt-4 border-t">
                <Button size="sm" variant="outline" className="flex-1" asChild>
                  <a href="/tours">
                    <MapPin className="w-3 h-3 mr-1" />
                    View Tours
                  </a>
                </Button>
                <Button size="sm" variant="outline" className="flex-1" asChild>
                  <a href="/contact">
                    <Users className="w-3 h-3 mr-1" />
                    Plan Visit
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
