"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Calendar, ChevronDown, ChevronUp, MapPin, Utensils, Bed, Activity } from "lucide-react"
import Link from "next/link"

interface ItineraryStep {
  step: number
  title: string
  location: string
  description: string
  highlights: string[]
}

interface DetailedItineraryDay {
  day: number
  title: string
  activities: string[]
  accommodation: string
  meals: string
}

interface CollapsibleItineraryProps {
  conciseItinerary: ItineraryStep[]
  detailedItinerary?: DetailedItineraryDay[]
  region: string
}

export default function CollapsibleItinerary({
  conciseItinerary,
  detailedItinerary,
  region,
}: CollapsibleItineraryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"concise" | "detailed">("concise")

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between p-4 sm:p-6 h-auto border-l-4 border-l-orange-500 hover:bg-orange-50 bg-transparent transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-full flex-shrink-0">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
            </div>
            <div className="text-left min-w-0 flex-1">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">Complete Itinerary</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                {conciseItinerary.length}-step journey through the {region} region
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

      <CollapsibleContent className="pt-4 sm:pt-6 space-y-4 sm:space-y-6">
        {/* View Toggle */}
        {detailedItinerary && (
          <div className="flex justify-center">
            <div className="bg-gray-100 p-1 rounded-lg">
              <Button
                variant={viewMode === "concise" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("concise")}
                className={`touch-manipulation ${viewMode === "concise" ? "bg-orange-500 text-white hover:bg-orange-600" : "hover:bg-gray-200"}`}
              >
                Overview
              </Button>
              <Button
                variant={viewMode === "detailed" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("detailed")}
                className={`touch-manipulation ${viewMode === "detailed" ? "bg-orange-500 text-white hover:bg-orange-600" : "hover:bg-gray-200"}`}
              >
                Day by Day
              </Button>
            </div>
          </div>
        )}

        {/* Concise Itinerary */}
        {viewMode === "concise" && (
          <div className="space-y-4 sm:space-y-6">
            {conciseItinerary.map((step, index) => (
              <div key={step.step} className="relative">
                {/* Timeline Line */}
                {index < conciseItinerary.length - 1 && (
                  <div className="absolute left-5 sm:left-6 top-12 sm:top-16 w-0.5 h-full bg-gradient-to-b from-orange-500 to-red-500 z-0"></div>
                )}

                <Card className="relative z-10 hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Step Number */}
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg flex-shrink-0">
                        {step.step}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 mb-2">
                          <h4 className="text-lg sm:text-xl font-bold text-gray-800 line-clamp-2 flex-1">
                            {step.title}
                          </h4>
                        </div>

                        <div className="flex items-start gap-2 mb-3">
                          <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 font-medium text-sm sm:text-base line-clamp-1">
                            {step.location}
                          </span>
                        </div>

                        <p className="text-gray-700 mb-4 leading-relaxed text-sm sm:text-base line-clamp-3">
                          {step.description}
                        </p>

                        {/* Highlights */}
                        <div className="space-y-2">
                          <h5 className="font-semibold text-sm text-gray-800">Key Activities:</h5>
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {step.highlights.slice(0, 4).map((highlight, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {highlight}
                              </Badge>
                            ))}
                            {step.highlights.length > 4 && (
                              <Badge variant="secondary" className="text-xs">
                                +{step.highlights.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}

        {/* Detailed Itinerary */}
        {viewMode === "detailed" && detailedItinerary && (
          <div className="space-y-3 sm:space-y-4">
            {detailedItinerary.map((day, index) => (
              <Card key={day.day} className="hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {day.day}
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-gray-800 line-clamp-1 flex-1">{day.title}</h4>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Activities */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-4 h-4 text-orange-500 flex-shrink-0" />
                        <h5 className="font-semibold text-gray-700 text-sm sm:text-base">Activities</h5>
                      </div>
                      <ul className="space-y-1">
                        {day.activities.map((activity, actIndex) => (
                          <li key={actIndex} className="text-xs sm:text-sm text-gray-600 flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="line-clamp-2">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Accommodation & Meals */}
                    <div className="lg:col-span-2 space-y-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Bed className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          <h5 className="font-semibold text-gray-700 text-sm">Accommodation</h5>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{day.accommodation}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Utensils className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <h5 className="font-semibold text-gray-700 text-sm">Meals</h5>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600">{day.meals}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Section CTA */}
        <div className="mt-6 sm:mt-8">
          <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
            <CardContent className="p-4 sm:p-6 text-center">
              <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">Ready for This Complete Adventure?</h4>
              <p className="text-gray-600 mb-4 max-w-2xl mx-auto text-sm sm:text-base">
                Join us for this carefully planned journey through {region}'s most spectacular birding destinations.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href={`/checkout?region=${region.toLowerCase().replace(/\s+/g, "-")}&source=itinerary-section`}>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 touch-manipulation">
                    Book This Complete Itinerary
                  </Button>
                </Link>
                <Link href="/contact?subject=Itinerary+Questions">
                  <Button
                    variant="outline"
                    className="border-orange-500 text-orange-500 hover:bg-orange-50 px-6 bg-transparent touch-manipulation"
                  >
                    Customize This Trip
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
