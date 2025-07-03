"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Info, ChevronDown, ChevronUp } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface MapLocation {
  id: string
  name: string
  coordinates: number[]
  description: string
  highlights: string[]
}

interface InteractiveRegionMapProps {
  locations: MapLocation[]
  region: string
}

function InteractiveRegionMap({ locations, region }: InteractiveRegionMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between p-4 sm:p-6 h-auto border-l-4 border-l-orange-500 hover:bg-orange-50 bg-transparent transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-full flex-shrink-0">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
            </div>
            <div className="text-left min-w-0 flex-1">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">Key Birding Locations</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                Explore {locations.length} premier birding sites across the {region} region
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 ml-2">
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </div>
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="space-y-4 sm:space-y-6 pt-4 sm:pt-6">
        {/* Interactive Map Container */}
        <div className="relative w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg sm:rounded-xl overflow-hidden border-2 border-orange-200">
          <div className="absolute inset-0 bg-[url('/images/birding-regions-colombia-final.png')] bg-cover bg-center opacity-60"></div>

          {/* Map Markers */}
          {locations.map((location, index) => (
            <button
              key={location.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 hover:scale-110 transition-all duration-200 group touch-manipulation"
              style={{
                left: `${20 + index * 18}%`,
                top: `${30 + (index % 2) * 20}%`,
              }}
              onClick={() => setSelectedLocation(location)}
              aria-label={`View details for ${location.name}`}
            >
              <div className="bg-orange-500 text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-orange-600 transition-colors group-hover:shadow-xl">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
              <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {location.name}
              </div>
            </button>
          ))}

          {/* Map Legend */}
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/95 backdrop-blur-sm p-3 sm:p-4 rounded-lg shadow-lg border border-orange-200 max-w-[200px]">
            <h4 className="font-semibold text-xs sm:text-sm mb-2 sm:mb-3 text-gray-800">Birding Locations</h4>
            <div className="space-y-1 sm:space-y-2 max-h-32 sm:max-h-40 overflow-y-auto">
              {locations.map((location, index) => (
                <button
                  key={location.id}
                  className="flex items-center gap-2 text-xs hover:bg-orange-50 p-1 rounded transition-colors w-full text-left touch-manipulation"
                  onClick={() => setSelectedLocation(location)}
                  aria-label={`Select ${location.name}`}
                >
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 truncate">{location.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {locations.map((location) => (
            <Card
              key={location.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-l-4 touch-manipulation ${
                selectedLocation?.id === location.id
                  ? "border-l-orange-500 shadow-lg bg-orange-50"
                  : "border-l-gray-200 hover:border-l-orange-300"
              }`}
              onClick={() => setSelectedLocation(location)}
            >
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-base sm:text-lg text-gray-800 line-clamp-1 flex-1 mr-2">
                    {location.name}
                  </h3>
                  <Badge variant="secondary" className="text-xs flex-shrink-0">
                    {location.highlights.length} species
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed line-clamp-2">{location.description}</p>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-gray-700">Key Species:</h4>
                  <div className="flex flex-wrap gap-1">
                    {location.highlights.slice(0, 3).map((species, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-orange-200 text-orange-700">
                        {species}
                      </Badge>
                    ))}
                    {location.highlights.length > 3 && (
                      <Badge variant="outline" className="text-xs border-gray-200 text-gray-500">
                        +{location.highlights.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
                  <Info className="w-3 h-3 flex-shrink-0" />
                  <span>Tap to highlight on map</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Location Details */}
        {selectedLocation && (
          <Card className="border-2 border-orange-500 bg-gradient-to-r from-orange-50 to-red-50">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-orange-500 rounded-full flex-shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-1">{selectedLocation.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Coordinates: {selectedLocation.coordinates[0].toFixed(4)},{" "}
                    {selectedLocation.coordinates[1].toFixed(4)}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">{selectedLocation.description}</p>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Target Species at this location:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedLocation.highlights.map((species, idx) => (
                    <Badge key={idx} className="bg-orange-500 text-white text-xs">
                      {species}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}

export default InteractiveRegionMap
export { InteractiveRegionMap }
