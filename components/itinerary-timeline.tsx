"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Star } from "lucide-react"
import OptimizedImage from "./optimized-image"

interface ItineraryDay {
  day: number
  title: string
  location: string
  highlights: string[]
  description: string
  image: string
}

interface ItineraryTimelineProps {
  itinerary: ItineraryDay[]
}

export default function ItineraryTimeline({ itinerary }: ItineraryTimelineProps) {
  return (
    <div className="space-y-8" id="itinerary-section">
      {itinerary.map((day, index) => (
        <div key={day.day} className="relative">
          {/* Timeline Line */}
          {index < itinerary.length - 1 && (
            <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-orange-500 to-red-500 z-0"></div>
          )}

          <Card className="relative z-10 hover:shadow-xl transition-all duration-300 overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                {/* Day Number Circle */}
                <div className="absolute left-4 top-4 lg:relative lg:left-0 lg:top-0 z-20">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {day.day}
                  </div>
                </div>

                {/* Image Section */}
                <div className="lg:w-1/3 h-48 lg:h-auto relative">
                  <OptimizedImage
                    src={day.image}
                    alt={day.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                </div>

                {/* Content Section */}
                <div className="lg:w-2/3 p-6 lg:pl-8">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-medium text-orange-600">Day {day.day}</span>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{day.title}</h3>

                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600 font-medium">{day.location}</span>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">{day.description}</p>

                  {/* Highlights */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-semibold text-sm">Highlights:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {day.highlights.map((highlight, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}
