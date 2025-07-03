"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Camera, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface MapLocation {
  id: string
  name: string
  coordinates: [number, number]
  description: string
  highlights: string[]
}

interface InteractiveRegionMapProps {
  region: string
  className?: string
}

const regionData: Record<string, { locations: MapLocation[]; title: string; description: string }> = {
  caribbean: {
    title: "Caribbean Coast & Sierra Nevada",
    description: "Explore key birding locations from sea level to cloud forests",
    locations: [
      {
        id: "riohacha",
        name: "Riohacha",
        coordinates: [11.5444, -72.9072],
        description: "Coastal scrubland birding with endemic species",
        highlights: ["Vermilion Cardinal", "Crested Bobwhite", "Groove-billed Ani"],
      },
      {
        id: "las-gaviotas",
        name: "Las Gaviotas",
        coordinates: [11.2167, -73.25],
        description: "Lowland forest birding paradise",
        highlights: ["Lance-tailed Manakin", "White-bellied Antbird", "Buff-breasted Wren"],
      },
      {
        id: "salamanca",
        name: "Salamanca National Park",
        coordinates: [11.0833, -74.0833],
        description: "Mangrove and coastal wetland birding",
        highlights: ["Red-billed Emerald", "Pied Puffbird", "Bicolored Conebill"],
      },
      {
        id: "tayrona",
        name: "Tayrona National Park",
        coordinates: [11.3167, -73.9667],
        description: "Dry forest and foothill trails",
        highlights: ["Barred Antshrike", "Crimson-crested Woodpecker", "Various tanagers"],
      },
    ],
  },
}

function InteractiveRegionMap({ region, className }: InteractiveRegionMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const data = regionData[region]

  if (!data) {
    return (
      <div className={cn("w-full max-w-4xl mx-auto", className)}>
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">Map data not available for this region.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const selectedLocationData = data.locations.find((loc) => loc.id === selectedLocation)

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      <Card className="overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">{data.title}</CardTitle>
          <p className="text-gray-600">{data.description}</p>
        </CardHeader>
        <CardContent className="p-6">
          {/* Simplified Map Representation */}
          <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8 mb-6 min-h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-green-100/50 rounded-lg" />

            {/* Map Title */}
            <div className="relative z-10 text-center mb-8">
              <h3 className="text-lg font-semibold text-gray-800">Key Birding Locations</h3>
              <p className="text-sm text-gray-600">Click on locations to learn more</p>
            </div>

            {/* Location Markers */}
            <div className="relative z-10 grid grid-cols-2 gap-4 h-full">
              {data.locations.map((location, index) => (
                <Button
                  key={location.id}
                  variant={selectedLocation === location.id ? "default" : "outline"}
                  className={cn(
                    "h-auto p-4 flex flex-col items-start text-left transition-all duration-200",
                    selectedLocation === location.id
                      ? "bg-blue-600 text-white shadow-lg scale-105"
                      : "bg-white/80 backdrop-blur-sm hover:bg-white/90 hover:scale-102",
                  )}
                  onClick={() => setSelectedLocation(location.id)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="font-semibold">{location.name}</span>
                  </div>
                  <p className="text-xs opacity-90 line-clamp-2">{location.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {location.highlights.slice(0, 2).map((highlight, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className={cn(
                          "text-xs",
                          selectedLocation === location.id ? "bg-white/20 text-white" : "bg-blue-100 text-blue-800",
                        )}
                      >
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Location Details */}
          {selectedLocationData && (
            <Card className="border-blue-200 bg-blue-50/50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-gray-900 mb-2">{selectedLocationData.name}</h4>
                    <p className="text-gray-700 mb-3">{selectedLocationData.description}</p>
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-1">
                        <Camera className="w-4 h-4" />
                        Key Species
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedLocationData.highlights.map((highlight, index) => (
                          <Badge key={index} variant="outline" className="bg-white">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Instructions */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-full">
              <Info className="w-4 h-4" />
              <span>Select a location above to view detailed information</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default InteractiveRegionMap
export { InteractiveRegionMap }
