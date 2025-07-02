"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Bird, Calendar, MapPin, Star } from "lucide-react"
import Link from "next/link"

interface Species {
  name: string
  scientific: string
  status: string
}

interface ItineraryDay {
  day: number
  title: string
  activities: string[]
  accommodation: string
  meals: string
}

interface Accommodation {
  name: string
  location: string
  description: string
  amenities: string[]
  rating: number
  nights: number
}

interface AccordionSectionsProps {
  speciesList: Species[]
  detailedItinerary: ItineraryDay[]
  accommodations: Accommodation[]
}

export default function AccordionSections({ speciesList, detailedItinerary, accommodations }: AccordionSectionsProps) {
  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Detailed Information</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore comprehensive details about species, itinerary, and accommodations for your Caribbean coast
            adventure.
          </p>
        </div>

        <div className="space-y-4">
          {/* Species List Accordion */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
            <CardHeader
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection("species")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-full">
                    <Bird className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-800">Species List</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {speciesList.length} species including endemics and specialties
                    </p>
                  </div>
                </div>
                {openSection === "species" ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </CardHeader>
            {openSection === "species" && (
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {speciesList.map((species, index) => (
                    <div key={index} className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-800 text-sm">{species.name}</h4>
                        <Badge variant={species.status === "Endemic" ? "destructive" : "secondary"} className="text-xs">
                          {species.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 italic">{species.scientific}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link href="/checkout?region=caribbean&source=species-list">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                      Book Tour to See These Species
                    </Button>
                  </Link>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Detailed Itinerary Accordion */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
            <CardHeader
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection("itinerary")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-800">Detailed Itinerary</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {detailedItinerary.length}-day comprehensive birding adventure
                    </p>
                  </div>
                </div>
                {openSection === "itinerary" ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </CardHeader>
            {openSection === "itinerary" && (
              <CardContent className="pt-0">
                <div className="space-y-6">
                  {detailedItinerary.map((day, index) => (
                    <div key={index} className="p-6 bg-white rounded-lg border hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {day.day}
                        </div>
                        <h4 className="text-lg font-bold text-gray-800">{day.title}</h4>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="lg:col-span-2">
                          <h5 className="font-semibold text-gray-700 mb-2">Activities:</h5>
                          <ul className="space-y-1">
                            {day.activities.map((activity, actIndex) => (
                              <li key={actIndex} className="text-sm text-gray-600 flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <h5 className="font-semibold text-gray-700 text-sm">Accommodation:</h5>
                            <p className="text-sm text-gray-600">{day.accommodation}</p>
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-700 text-sm">Meals:</h5>
                            <p className="text-sm text-gray-600">{day.meals}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link href="/checkout?region=caribbean&source=detailed-itinerary">
                    <Button className="bg-green-500 hover:bg-green-600 text-white">Book This Complete Adventure</Button>
                  </Link>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Accommodations Accordion */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
            <CardHeader
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection("accommodations")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-800">Accommodations</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{accommodations.length} carefully selected properties</p>
                  </div>
                </div>
                {openSection === "accommodations" ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </CardHeader>
            {openSection === "accommodations" && (
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {accommodations.map((accommodation, index) => (
                    <div key={index} className="p-6 bg-white rounded-lg border hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-lg font-bold text-gray-800">{accommodation.name}</h4>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {accommodation.location}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {accommodation.nights} {accommodation.nights === 1 ? "night" : "nights"}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-1 mb-3">
                        {renderStars(accommodation.rating)}
                        <span className="text-sm text-gray-600 ml-2">{accommodation.rating}/5</span>
                      </div>

                      <p className="text-sm text-gray-700 mb-4 leading-relaxed">{accommodation.description}</p>

                      <div>
                        <h5 className="font-semibold text-gray-700 text-sm mb-2">Amenities:</h5>
                        <div className="flex flex-wrap gap-1">
                          {accommodation.amenities.map((amenity, amenityIndex) => (
                            <Badge key={amenityIndex} variant="secondary" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link href="/checkout?region=caribbean&source=accommodations">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                      Book Tour with These Accommodations
                    </Button>
                  </Link>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}
