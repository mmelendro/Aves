"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TreePine, Droplets, Fish, RotateCcw } from "lucide-react"

// Comprehensive ecoregions data based on WWF classification
const ecoregionsData = {
  terrestrial: [
    // Tropical and Subtropical Moist Broadleaf Forests
    { name: "Chocó-Darién Moist Forests", priority: "Critical", code: "NT0115", biome: "Tropical Moist Forests" },
    { name: "Magdalena-Urabá Moist Forests", priority: "Critical", code: "NT0137", biome: "Tropical Moist Forests" },
    { name: "Catatumbo Moist Forests", priority: "Vulnerable", code: "NT0108", biome: "Tropical Moist Forests" },
    { name: "Napo Moist Forests", priority: "Stable", code: "NT0142", biome: "Tropical Moist Forests" },
    { name: "Putumayo-Solimões Moist Forests", priority: "Stable", code: "NT0157", biome: "Tropical Moist Forests" },
    { name: "Southwest Amazon Moist Forests", priority: "Stable", code: "NT0166", biome: "Tropical Moist Forests" },
    {
      name: "Japurá-Solimões-Negro Moist Forests",
      priority: "Stable",
      code: "NT0132",
      biome: "Tropical Moist Forests",
    },
    { name: "Rio Negro Campinarana", priority: "Stable", code: "NT0158", biome: "Tropical Moist Forests" },

    // Tropical and Subtropical Dry Broadleaf Forests
    { name: "Magdalena Valley Dry Forests", priority: "Critical", code: "NT0225", biome: "Tropical Dry Forests" },
    { name: "Sinú Valley Dry Forests", priority: "Critical", code: "NT0229", biome: "Tropical Dry Forests" },
    { name: "Patía Valley Dry Forests", priority: "Vulnerable", code: "NT0174", biome: "Tropical Dry Forests" },
    { name: "Cauca Valley Dry Forests", priority: "Critical", code: "NT0207", biome: "Tropical Dry Forests" },

    // Tropical and Subtropical Montane Forests
    { name: "Magdalena Valley Montane Forests", priority: "Critical", code: "NT0136", biome: "Montane Forests" },
    { name: "Santa Marta Montane Forests", priority: "Critical", code: "NT0159", biome: "Montane Forests" },
    { name: "Cauca Valley Montane Forests", priority: "Vulnerable", code: "NT0109", biome: "Montane Forests" },
    {
      name: "Eastern Cordillera Real Montane Forests",
      priority: "Vulnerable",
      code: "NT0121",
      biome: "Montane Forests",
    },
    { name: "Northwestern Andean Montane Forests", priority: "Vulnerable", code: "NT0145", biome: "Montane Forests" },
    { name: "Cordillera Oriental Montane Forests", priority: "Vulnerable", code: "NT0118", biome: "Montane Forests" },

    // Montane Grasslands and Shrublands
    { name: "Cordillera de Mérida Páramo", priority: "Vulnerable", code: "NT1006", biome: "Páramo" },
    { name: "Northern Andean Páramo", priority: "Vulnerable", code: "NT1007", biome: "Páramo" },
    { name: "Santa Marta Páramo", priority: "Critical", code: "NT1008", biome: "Páramo" },
    { name: "Eastern Cordillera Real Páramo", priority: "Vulnerable", code: "NT1009", biome: "Páramo" },

    // Tropical and Subtropical Grasslands
    { name: "Llanos", priority: "Stable", code: "NT0709", biome: "Grasslands" },
    { name: "Guianan Highlands Moist Forests", priority: "Stable", code: "NT0124", biome: "Tropical Moist Forests" },

    // Flooded Grasslands and Savannas
    { name: "Orinoco Wetlands", priority: "Vulnerable", code: "NT0907", biome: "Wetlands" },
    { name: "Pantanos de Centla", priority: "Vulnerable", code: "NT0904", biome: "Wetlands" },

    // Deserts and Xeric Shrublands
    { name: "La Guajira Desert", priority: "Stable", code: "NT1315", biome: "Desert" },
    { name: "Malpelo Island Xeric Scrub", priority: "Stable", code: "NT1316", biome: "Desert" },

    // Mangroves
    { name: "Amazon-Orinoco-Southern Caribbean Mangroves", priority: "Vulnerable", code: "NT1401", biome: "Mangroves" },
    { name: "Moist Pacific Coast Mangroves", priority: "Vulnerable", code: "NT1405", biome: "Mangroves" },
  ],
  marine: [
    { name: "Caribbean Sea", priority: "Vulnerable", code: "G200", biome: "Marine" },
    { name: "Eastern Tropical Pacific", priority: "Stable", code: "G201", biome: "Marine" },
  ],
  freshwater: [
    { name: "Magdalena-Cauca", priority: "Critical", code: "F301", biome: "Freshwater" },
    { name: "Caribbean Coast", priority: "Vulnerable", code: "F302", biome: "Freshwater" },
    { name: "Orinoco", priority: "Stable", code: "F303", biome: "Freshwater" },
    { name: "Amazon", priority: "Stable", code: "F304", biome: "Freshwater" },
    { name: "Pacific Coast", priority: "Vulnerable", code: "F305", biome: "Freshwater" },
  ],
}

const categoryInfo = {
  terrestrial: {
    icon: TreePine,
    title: "Terrestrial Ecoregions",
    description: "Land-based ecosystems from sea level to 5,775m",
    color: "green",
    count: 24,
  },
  marine: {
    icon: Droplets,
    title: "Marine Ecoregions",
    description: "Coastal and oceanic ecosystems",
    color: "blue",
    count: 2,
  },
  freshwater: {
    icon: Fish,
    title: "Freshwater Ecoregions",
    description: "River systems and wetland ecosystems",
    color: "indigo",
    count: 5,
  },
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Critical":
      return "bg-red-100 text-red-800"
    case "Vulnerable":
      return "bg-orange-100 text-orange-800"
    case "Stable":
      return "bg-green-100 text-green-800"
    case "Relatively Stable":
      return "bg-emerald-100 text-emerald-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function EcoregionSelector() {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedEcoregion, setSelectedEcoregion] = useState<string>("")

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setSelectedEcoregion("") // Reset ecoregion when category changes

    // Dispatch event for table to listen to
    window.dispatchEvent(
      new CustomEvent("category-selected", {
        detail: { category },
      }),
    )
  }

  const handleEcoregionSelect = (ecoregionName: string) => {
    setSelectedEcoregion(ecoregionName)

    // Find the full ecoregion data
    const categoryData = ecoregionsData[selectedCategory as keyof typeof ecoregionsData]
    const ecoregionData = categoryData?.find((eco) => eco.name === ecoregionName)

    // Dispatch event for table to listen to
    window.dispatchEvent(
      new CustomEvent("ecoregion-selected", {
        detail: {
          category: selectedCategory,
          ecoregion: ecoregionName,
          data: ecoregionData,
        },
      }),
    )
  }

  const handleReset = () => {
    setSelectedCategory("")
    setSelectedEcoregion("")

    // Dispatch reset event
    window.dispatchEvent(new CustomEvent("selection-reset"))
  }

  const currentEcoregions = selectedCategory ? ecoregionsData[selectedCategory as keyof typeof ecoregionsData] : []

  return (
    <div className="space-y-6">
      {/* Step 1: Category Selection */}
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Step 1: Select Ecoregion Category</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {Object.entries(categoryInfo).map(([key, info]) => {
            const IconComponent = info.icon
            const isSelected = selectedCategory === key

            return (
              <Card
                key={key}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  isSelected ? "ring-2 ring-emerald-500 bg-emerald-50" : "hover:bg-gray-50"
                }`}
                onClick={() => handleCategorySelect(key)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <IconComponent className={`w-6 h-6 text-${info.color}-600`} />
                    <div>
                      <CardTitle className="text-base sm:text-lg">{info.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {info.count} ecoregions
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm">{info.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Step 2: Ecoregion Selection */}
      {selectedCategory && (
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Step 2: Select Specific Ecoregion</h3>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="flex-1 w-full">
              <Select value={selectedEcoregion} onValueChange={handleEcoregionSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={`Select from ${currentEcoregions.length} ${selectedCategory} ecoregions`} />
                </SelectTrigger>
                <SelectContent>
                  {currentEcoregions.map((ecoregion) => (
                    <SelectItem key={ecoregion.name} value={ecoregion.name}>
                      <div className="flex items-center justify-between w-full">
                        <span className="flex-1">{ecoregion.name}</span>
                        <Badge className={`ml-2 text-xs ${getPriorityColor(ecoregion.priority)}`} variant="secondary">
                          {ecoregion.priority}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="sm" onClick={handleReset} className="whitespace-nowrap">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      )}

      {/* Selection Summary */}
      {selectedCategory && selectedEcoregion && (
        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-emerald-800">Selected:</span>
              <Badge variant="secondary" className="text-xs">
                {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
              </Badge>
              <span className="text-emerald-700">→</span>
              <span className="font-medium text-emerald-900">{selectedEcoregion}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
