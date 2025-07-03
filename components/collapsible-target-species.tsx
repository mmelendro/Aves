"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Star, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

interface TargetSpecies {
  name: string
  scientificName: string
  status: string
  difficulty: string
  habitat: string
  bestTime: string
}

interface CollapsibleTargetSpeciesProps {
  region: string
  className?: string
}

const regionSpeciesData: Record<string, { title: string; species: TargetSpecies[] }> = {
  caribbean: {
    title: "Caribbean Coast Target Species",
    species: [
      {
        name: "Vermilion Cardinal",
        scientificName: "Paroaria nigrogenis",
        status: "Endemic",
        difficulty: "Moderate",
        habitat: "Dry scrublands and thorny forests",
        bestTime: "December - April (dry season)",
      },
      {
        name: "Lance-tailed Manakin",
        scientificName: "Chiroxiphia lanceolata",
        status: "Near Endemic",
        difficulty: "Moderate",
        habitat: "Lowland forests and forest edges",
        bestTime: "Year-round (most active early morning)",
      },
      {
        name: "White-bellied Antbird",
        scientificName: "Myrmeciza longipes",
        status: "Spectacular",
        difficulty: "Challenging",
        habitat: "Dense forest understory, following army ant swarms",
        bestTime: "Year-round (dawn and dusk)",
      },
      {
        name: "Red-billed Emerald",
        scientificName: "Chlorostilbon gibsoni",
        status: "Endemic",
        difficulty: "Easy",
        habitat: "Gardens, forest edges, and flowering plants",
        bestTime: "Year-round (flowering seasons)",
      },
      {
        name: "Crested Bobwhite",
        scientificName: "Colinus cristatus",
        status: "Endemic",
        difficulty: "Moderate",
        habitat: "Open grasslands and scrublands",
        bestTime: "Early morning and late afternoon",
      },
      {
        name: "Buff-breasted Wren",
        scientificName: "Cantorchilus leucotis",
        status: "Near Endemic",
        difficulty: "Easy",
        habitat: "Dry scrublands and thorny forests",
        bestTime: "Year-round (most vocal at dawn)",
      },
    ],
  },
}

function CollapsibleTargetSpecies({ region, className }: CollapsibleTargetSpeciesProps) {
  const [isOpen, setIsOpen] = useState(false)
  const data = regionSpeciesData[region]

  if (!data) {
    return (
      <div className={cn("w-full max-w-4xl mx-auto", className)}>
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">Species data not available for this region.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Endemic":
        return "bg-red-100 text-red-800 border-red-200"
      case "Near Endemic":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Spectacular":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 border-green-200"
      case "Moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Challenging":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <Star className="w-6 h-6 text-yellow-500" />
                    {data.title}
                  </CardTitle>
                  <p className="text-gray-600 mt-2">Discover the must-see species that make this region special</p>
                </div>
                <Button variant="ghost" size="sm" className="ml-4">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </Button>
              </div>
            </CardHeader>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="grid gap-4 md:grid-cols-2">
                {data.species.map((species, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-lg text-gray-900">{species.name}</h4>
                          <p className="text-sm italic text-gray-600">{species.scientificName}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge className={cn("text-xs font-medium border", getStatusColor(species.status))}>
                            {species.status}
                          </Badge>
                          <Badge className={cn("text-xs font-medium border", getDifficultyColor(species.difficulty))}>
                            {species.difficulty}
                          </Badge>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium text-gray-700 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              Habitat:
                            </span>
                            <span className="text-gray-600 ml-4">{species.habitat}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Best time:</span>
                            <span className="text-gray-600 ml-2">{species.bestTime}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Pro Tip:</strong> Our expert guides know the best times and locations for each species. Book a
                  tour to maximize your chances of seeing these incredible birds!
                </p>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  )
}

export default CollapsibleTargetSpecies
export { CollapsibleTargetSpecies }
