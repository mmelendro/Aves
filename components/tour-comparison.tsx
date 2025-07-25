"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

interface TourFeature {
  name: string
  adventure: boolean | string
  vision: boolean | string
  elevate: boolean | string
  souls: boolean | string
}

const tourFeatures: TourFeature[] = [
  {
    name: "Group Size",
    adventure: "4 guests max",
    vision: "3 photographers max",
    elevate: "4 guests max",
    souls: "2 couples max",
  },
  {
    name: "Duration",
    adventure: "7-14 days",
    vision: "7-14 days",
    elevate: "7-14 days",
    souls: "7-14 days",
  },
  {
    name: "Average Daily Price",
    adventure: "$1,000/day",
    vision: "$1,250/day",
    elevate: "$1,500/day",
    souls: "$1,750/day",
  },
  {
    name: "Expert Bird Guides",
    adventure: true,
    vision: true,
    elevate: true,
    souls: true,
  },
  {
    name: "Premium Accommodation",
    adventure: true,
    vision: true,
    elevate: true,
    souls: true,
  },
  {
    name: "Private Transportation",
    adventure: true,
    vision: true,
    elevate: true,
    souls: true,
  },
  {
    name: "Endemic Species Focus",
    adventure: true,
    vision: true,
    elevate: true,
    souls: true,
  },
  {
    name: "Photography Instruction & Workshops",
    adventure: false,
    vision: true,
    elevate: false,
    souls: false,
  },
  {
    name: "High-Altitude Specialization",
    adventure: false,
    vision: false,
    elevate: true,
    souls: false,
  },
  {
    name: "Gourmet Dining",
    adventure: false,
    vision: false,
    elevate: true,
    souls: true,
  },
  {
    name: "Luxury Amenities & Premium Services",
    adventure: false,
    vision: false,
    elevate: true,
    souls: true,
  },
  {
    name: "Cultural Immersion Experiences",
    adventure: true,
    vision: false,
    elevate: false,
    souls: true,
  },
  {
    name: "Indigenous Community Partnerships",
    adventure: true,
    vision: false,
    elevate: false,
    souls: true,
  },
  {
    name: "Romantic & Intimate Experiences",
    adventure: false,
    vision: false,
    elevate: false,
    souls: true,
  },
]

const tours = [
  {
    id: "adventure",
    name: "Adventure Tours",
    emoji: "🍃",
    color: "emerald",
    description: "Classic Birding",
    valueProposition: "Diverse ecosystems & cultural immersion",
    keyBenefit: "Best Value • Cultural Immersion",
    href: "/tours/adventure",
  },
  {
    id: "vision",
    name: "Vision Tours",
    emoji: "🪶",
    color: "purple",
    description: "Photography Focus",
    valueProposition: "Pro equipment & expert instruction",
    keyBenefit: "Pro Equipment • Expert Instruction",
    href: "/tours/vision",
  },
  {
    id: "elevate",
    name: "Elevate Tours",
    emoji: "🌼",
    color: "yellow",
    description: "Luxury Experience",
    valueProposition: "Exclusive high-altitude locations",
    keyBenefit: "Luxury Accommodations • Exclusive Access",
    href: "/tours/elevate",
  },
  {
    id: "souls",
    name: "Souls Tours",
    emoji: "🍓",
    color: "red",
    description: "Couples Retreat",
    valueProposition: "Intimate cultural experiences",
    keyBenefit: "Couples Only • Indigenous Culture",
    href: "/tours/souls",
  },
]

export default function TourComparison() {
  const [selectedTours, setSelectedTours] = useState<string[]>(["adventure", "vision"])

  const toggleTour = (tourId: string) => {
    if (selectedTours.includes(tourId)) {
      if (selectedTours.length > 1) {
        setSelectedTours(selectedTours.filter((id) => id !== tourId))
      }
    } else {
      if (selectedTours.length < 4) {
        setSelectedTours([...selectedTours, tourId])
      }
    }
  }

  const getColorClasses = (color: string) => {
    const colorMap = {
      emerald: "bg-emerald-600 text-white border-emerald-600",
      purple: "bg-purple-600 text-white border-purple-600",
      yellow: "bg-yellow-600 text-white border-yellow-600",
      red: "bg-red-600 text-white border-red-600",
    }
    return colorMap[color as keyof typeof colorMap] || "bg-gray-600 text-white border-gray-600"
  }

  const renderFeatureValue = (value: boolean | string, tourId: string) => {
    if (typeof value === "boolean") {
      return value ? (
        <div className="flex items-center justify-center relative">
          <CheckCircle
            className={`w-6 h-6 drop-shadow-sm ${
              tourId === "adventure"
                ? "text-emerald-500"
                : tourId === "vision"
                  ? "text-purple-500"
                  : tourId === "elevate"
                    ? "text-yellow-500"
                    : "text-red-500"
            }`}
          />
          {/* Subtle glow effect for premium tiers */}
          {(tourId === "elevate" || tourId === "souls") && (
            <div
              className={`absolute w-8 h-8 rounded-full -z-10 opacity-20 ${
                tourId === "elevate" ? "bg-yellow-200" : "bg-red-200"
              }`}
            ></div>
          )}
        </div>
      ) : (
        <span className="text-gray-300 text-lg font-light">—</span>
      )
    }
    return (
      <span
        className={`text-sm font-medium ${
          tourId === "souls"
            ? "text-red-700 font-semibold"
            : tourId === "elevate"
              ? "text-yellow-700 font-semibold"
              : tourId === "vision"
                ? "text-purple-700 font-semibold"
                : "text-emerald-700 font-semibold"
        }`}
      >
        {value}
      </span>
    )
  }

  return (
    <div className="space-y-12 p-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 relative">
      {/* Enhanced tier progression indicator */}
      <div className="absolute top-4 right-4 flex items-center space-x-2 opacity-40">
        <div className="flex flex-col items-center space-y-1">
          <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-sm"></div>
          <div className="text-xs text-emerald-600 font-medium">Basic</div>
        </div>
        <div className="w-px h-8 bg-gray-300"></div>
        <div className="flex flex-col items-center space-y-1">
          <div className="w-3 h-3 bg-purple-500 rounded-full shadow-sm"></div>
          <div className="text-xs text-purple-600 font-medium">Pro</div>
        </div>
        <div className="w-px h-8 bg-gray-300"></div>
        <div className="flex flex-col items-center space-y-1">
          <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
          <div className="text-xs text-yellow-600 font-medium">Luxury</div>
        </div>
        <div className="w-px h-8 bg-gray-300"></div>
        <div className="flex flex-col items-center space-y-1">
          <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
          <div className="text-xs text-red-600 font-medium">Premium</div>
        </div>
      </div>
      {/* Introduction */}
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Choose Your Perfect Colombian Birding Adventure</h2>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          Each AVES tour is carefully crafted to deliver unique experiences. Compare our specialized expeditions to find
          the perfect match for your birding dreams, photography goals, luxury preferences, or cultural interests.
        </p>
      </div>

      {/* Tour Selection */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Select Tours to Compare (up to 4)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {tours.map((tour) => (
            <Button
              key={tour.id}
              variant={selectedTours.includes(tour.id) ? "default" : "outline"}
              className={`h-auto p-5 flex flex-col items-center space-y-2 transition-all duration-200 hover:scale-105 hover:shadow-md rounded-xl border-2 ${
                selectedTours.includes(tour.id) ? getColorClasses(tour.color) : ""
              }`}
              onClick={() => toggleTour(tour.id)}
            >
              <span className="text-3xl mb-1">{tour.emoji}</span>
              <div className="text-center space-y-1">
                <div className="font-bold text-base">{tour.name}</div>
                <div className="text-sm font-medium opacity-90">{tour.description}</div>
                <div className="text-xs opacity-75 leading-tight px-1">{tour.valueProposition}</div>
                <div className="text-xs font-semibold opacity-95 bg-white/25 rounded-full px-2 py-0.5 mt-2 text-center leading-tight break-words hyphens-auto max-w-full">
                  {tour.keyBenefit}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <Card className="overflow-hidden shadow-lg border-0 rounded-xl">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gradient-to-r from-gray-100 to-gray-50">
                  <th className="text-left p-4 font-semibold">Features</th>
                  {selectedTours.map((tourId) => {
                    const tour = tours.find((t) => t.id === tourId)!
                    return (
                      <th key={tourId} className="text-center p-4 min-w-[180px] max-w-[200px]">
                        <div className="flex flex-col items-center space-y-2">
                          <span className="text-2xl">{tour.emoji}</span>
                          <div className="space-y-1">
                            <div className="font-bold text-base">{tour.name}</div>
                            <div className="text-sm font-medium text-gray-600">{tour.description}</div>
                            <div className="text-xs text-gray-500 leading-tight">{tour.valueProposition}</div>
                            <div className="text-xs font-semibold text-gray-700 bg-gray-100 rounded-full px-2 py-0.5">
                              {tour.keyBenefit}
                            </div>
                          </div>
                        </div>
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {tourFeatures.map((feature, index) => (
                  <tr
                    key={feature.name}
                    className={index % 2 === 0 ? "bg-white hover:bg-blue-50/30" : "bg-gray-50/50 hover:bg-blue-50/30"}
                  >
                    <td className="p-4 font-medium">{feature.name}</td>
                    {selectedTours.map((tourId) => (
                      <td key={tourId} className="p-4 text-center">
                        <div className="flex items-center justify-center min-h-[40px]">
                          {renderFeatureValue(feature[tourId as keyof TourFeature] as boolean | string, tourId)}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-6 justify-center pt-4">
        {selectedTours.map((tourId) => {
          const tour = tours.find((t) => t.id === tourId)!
          return (
            <Link key={tourId} href={tour.href}>
              <Button
                className={`${getColorClasses(tour.color)} shadow-md hover:shadow-lg transition-all duration-200 px-6 py-3 rounded-xl font-semibold`}
              >
                Learn More About {tour.name}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
