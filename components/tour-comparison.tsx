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
    souls: "Couples only",
  },
  {
    name: "Duration",
    adventure: "7-14 days",
    vision: "10-12 days",
    elevate: "8-15 days",
    souls: "7-10 days",
  },
  {
    name: "Price per day",
    adventure: "$1,000",
    vision: "$1,400",
    elevate: "$1,200",
    souls: "$1,600",
  },
  {
    name: "Expert Guides",
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
    name: "Photography Equipment",
    adventure: false,
    vision: true,
    elevate: false,
    souls: false,
  },
  {
    name: "Photography Instruction",
    adventure: false,
    vision: true,
    elevate: false,
    souls: false,
  },
  {
    name: "Luxury Amenities",
    adventure: false,
    vision: false,
    elevate: true,
    souls: false,
  },
  {
    name: "Cultural Immersion",
    adventure: true,
    vision: false,
    elevate: false,
    souls: true,
  },
  {
    name: "Indigenous Partnerships",
    adventure: true,
    vision: false,
    elevate: false,
    souls: true,
  },
  {
    name: "Romantic Experiences",
    adventure: false,
    vision: false,
    elevate: false,
    souls: true,
  },
]

const tours = [
  {
    id: "adventure",
    name: "AVES Adventure",
    emoji: "🍃",
    color: "emerald",
    description: "Classic Birding Expeditions",
    href: "/tours/adventure",
  },
  {
    id: "vision",
    name: "AVES Vision",
    emoji: "🪶",
    color: "purple",
    description: "Photography Workshops",
    href: "/tours/vision",
  },
  {
    id: "elevate",
    name: "AVES Elevate",
    emoji: "🌼",
    color: "yellow",
    description: "Premium Expeditions",
    href: "/tours/elevate",
  },
  {
    id: "souls",
    name: "AVES Souls",
    emoji: "🍓",
    color: "red",
    description: "Romantic Retreats",
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
      if (selectedTours.length < 3) {
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

  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? <CheckCircle className="w-5 h-5 text-green-600" /> : <span className="text-gray-400">—</span>
    }
    return <span className="text-sm font-medium">{value}</span>
  }

  return (
    <div className="space-y-8">
      {/* Tour Selection */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Select Tours to Compare (up to 3)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tours.map((tour) => (
            <Button
              key={tour.id}
              variant={selectedTours.includes(tour.id) ? "default" : "outline"}
              className={`h-auto p-4 flex flex-col items-center space-y-2 ${
                selectedTours.includes(tour.id) ? getColorClasses(tour.color) : ""
              }`}
              onClick={() => toggleTour(tour.id)}
            >
              <span className="text-2xl">{tour.emoji}</span>
              <div className="text-center">
                <div className="font-semibold">{tour.name}</div>
                <div className="text-xs opacity-80">{tour.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-4 font-semibold">Features</th>
                  {selectedTours.map((tourId) => {
                    const tour = tours.find((t) => t.id === tourId)!
                    return (
                      <th key={tourId} className="text-center p-4 min-w-[150px]">
                        <div className="flex flex-col items-center space-y-2">
                          <span className="text-2xl">{tour.emoji}</span>
                          <div>
                            <div className="font-semibold">{tour.name}</div>
                            <div className="text-xs text-gray-600">{tour.description}</div>
                          </div>
                        </div>
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {tourFeatures.map((feature, index) => (
                  <tr key={feature.name} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-4 font-medium">{feature.name}</td>
                    {selectedTours.map((tourId) => (
                      <td key={tourId} className="p-4 text-center">
                        {renderFeatureValue(feature[tourId as keyof TourFeature] as boolean | string)}
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
      <div className="flex flex-wrap gap-4 justify-center">
        {selectedTours.map((tourId) => {
          const tour = tours.find((t) => t.id === tourId)!
          return (
            <Link key={tourId} href={tour.href}>
              <Button className={getColorClasses(tour.color)}>
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
