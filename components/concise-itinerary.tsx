"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, ChevronRight } from "lucide-react"

interface ItineraryStep {
  step: number
  title: string
  location: string
  description: string
  highlights: string[]
}

interface ConciseItineraryProps {
  itinerary: ItineraryStep[]
}

export default function ConciseItinerary({ itinerary }: ConciseItineraryProps) {
  return (
    <div className="space-y-6">
      {/* Mobile: Single Column */}
      <div className="block lg:hidden space-y-4">
        {itinerary.map((step, index) => (
          <Card
            key={step.step}
            className="relative hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500"
          >
            <CardContent className="p-6">
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {step.step}
              </div>

              {/* Content */}
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-600">Step {step.step}</span>
                </div>

                <h3 className="text-xl font-bold mb-2 text-gray-800">{step.title}</h3>

                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 font-medium">{step.location}</span>
                </div>

                <p className="text-gray-700 text-sm mb-4 leading-relaxed">{step.description}</p>

                {/* Highlights */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Highlights:</span>
                  <div className="grid grid-cols-2 gap-1">
                    {step.highlights.map((highlight, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs justify-start">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Arrow for flow */}
              {index < itinerary.length - 1 && (
                <div className="flex justify-center mt-4">
                  <ChevronRight className="w-5 h-5 text-orange-400" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop: Grid Layout */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-6">
        {itinerary.map((step, index) => (
          <Card
            key={step.step}
            className="relative hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500"
          >
            <CardContent className="p-6">
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {step.step}
              </div>

              {/* Content */}
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-600">Step {step.step}</span>
                </div>

                <h3 className="text-lg font-bold mb-2 text-gray-800">{step.title}</h3>

                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 font-medium">{step.location}</span>
                </div>

                <p className="text-gray-700 text-sm mb-4 leading-relaxed">{step.description}</p>

                {/* Highlights */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Highlights:</span>
                  <div className="flex flex-wrap gap-1">
                    {step.highlights.map((highlight, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
