"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Calendar, MapPin, Clock, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface ItineraryDay {
  day: number
  title: string
  location: string
  activities: string[]
  highlights: string[]
  accommodation?: string
  meals?: string
}

interface CollapsibleItineraryProps {
  region: string
  className?: string
}

const regionItineraryData: Record<string, { title: string; duration: string; itinerary: ItineraryDay[] }> = {
  caribbean: {
    title: "Caribbean Coast Adventure",
    duration: "8 Days / 7 Nights",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Santa Marta",
        location: "Santa Marta",
        activities: [
          "Airport pickup and transfer to accommodation",
          "Welcome briefing and equipment check",
          "Afternoon birding at Quinta de San Pedro Alejandrino",
          "Evening species checklist review",
        ],
        highlights: ["Orientation", "First birding session", "Equipment check"],
        accommodation: "Hotel Casa Verde",
        meals: "Dinner",
      },
      {
        day: 2,
        title: "Riohacha Scrublands",
        location: "Riohacha",
        activities: [
          "Early morning departure to Riohacha",
          "Scrubland birding for Vermilion Cardinal",
          "Coastal wetland exploration",
          "Afternoon rest and local culture experience",
        ],
        highlights: ["Vermilion Cardinal", "Crested Bobwhite", "Coastal species"],
        accommodation: "Hotel Almirante Padilla",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 3,
        title: "Las Gaviotas Forest Reserve",
        location: "Las Gaviotas",
        activities: [
          "Pre-dawn departure to Las Gaviotas",
          "Full day lowland forest birding",
          "Manakin lek observation",
          "Night sounds and nocturnal species",
        ],
        highlights: ["Lance-tailed Manakin", "White-bellied Antbird", "Forest species"],
        accommodation: "Las Gaviotas Eco-Lodge",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 4,
        title: "Río Ancho Exploration",
        location: "Las Gaviotas",
        activities: [
          "Dawn chorus birding along Río Ancho",
          "Canopy tower birding session",
          "Afternoon antbird following",
          "Evening photography workshop",
        ],
        highlights: ["Canopy species", "Army ant followers", "Photography"],
        accommodation: "Las Gaviotas Eco-Lodge",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 5,
        title: "Salamanca National Park",
        location: "Salamanca NP",
        activities: [
          "Transfer to Salamanca National Park",
          "Mangrove birding by boat",
          "Coastal wetland exploration",
          "Flamingo observation (seasonal)",
        ],
        highlights: ["Mangrove species", "Wetland birds", "Coastal habitats"],
        accommodation: "Hotel Decamerón Baru",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 6,
        title: "Tayrona National Park",
        location: "Tayrona NP",
        activities: [
          "Early morning Tayrona entrance",
          "Dry forest trail birding",
          "Coastal forest exploration",
          "Beach and mangrove interface birding",
        ],
        highlights: ["Dry forest species", "Coastal interface", "Trail birding"],
        accommodation: "Hotel Casa Verde",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 7,
        title: "Sierra Nevada Foothills",
        location: "Sierra Nevada",
        activities: [
          "Foothill birding excursion",
          "Mid-elevation species targeting",
          "Cultural visit to Tungueka (Kogi community)",
          "Traditional lunch with community",
        ],
        highlights: ["Foothill species", "Cultural experience", "Indigenous guides"],
        accommodation: "Hotel Casa Verde",
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        day: 8,
        title: "Departure",
        location: "Santa Marta",
        activities: ["Final morning birding session", "Species list compilation", "Transfer to airport", "Departure"],
        highlights: ["Final birding", "Species review", "Departure"],
        meals: "Breakfast",
      },
    ],
  },
}

function CollapsibleItinerary({ region, className }: CollapsibleItineraryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const data = regionItineraryData[region]

  if (!data) {
    return (
      <div className={cn("w-full max-w-4xl mx-auto", className)}>
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">Itinerary data not available for this region.</p>
          </CardContent>
        </Card>
      </div>
    )
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
                    <Calendar className="w-6 h-6 text-blue-500" />
                    Sample Itinerary: {data.title}
                  </CardTitle>
                  <div className="flex items-center gap-4 mt-2 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{data.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>Small groups (max 8)</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="ml-4">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </Button>
              </div>
            </CardHeader>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-6">
                {data.itinerary.map((day, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Day {day.day}
                              </Badge>
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <MapPin className="w-3 h-3" />
                                <span>{day.location}</span>
                              </div>
                            </div>
                            <h4 className="font-semibold text-lg text-gray-900">{day.title}</h4>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-gray-800 mb-2">Activities</h5>
                            <ul className="space-y-1 text-sm text-gray-600">
                              {day.activities.map((activity, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                                  <span>{activity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-medium text-gray-800 mb-2">Highlights</h5>
                            <div className="flex flex-wrap gap-1">
                              {day.highlights.map((highlight, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {highlight}
                                </Badge>
                              ))}
                            </div>

                            {(day.accommodation || day.meals) && (
                              <div className="mt-3 space-y-1 text-xs text-gray-500">
                                {day.accommodation && (
                                  <div>
                                    <strong>Accommodation:</strong> {day.accommodation}
                                  </div>
                                )}
                                {day.meals && (
                                  <div>
                                    <strong>Meals:</strong> {day.meals}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Note:</strong> This is a sample itinerary. All tours are customizable based on your interests,
                  fitness level, and time constraints. Contact us to create your perfect birding adventure!
                </p>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  )
}

export default CollapsibleItinerary
export { CollapsibleItinerary }
