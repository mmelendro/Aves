"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Plus,
  Minus,
  Trash2,
  CheckCircle,
  ExternalLink,
  Map,
  Bird,
  Calendar,
  Users,
  MapPin,
  DollarSign,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import Link from "next/link"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { LOCATION_OPTIONS, CONTACT_TOUR_TYPE_OPTIONS, EXPERIENCE_LEVELS } from "@/lib/form-options"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

// Optimized region data with enhanced information
const REGION_DATA: Record<
  string,
  {
    emoji: string
    name: string
    shortName: string
    description: string
    species: string
    highlights: string[]
    difficulty: "Easy" | "Moderate" | "Challenging"
  }
> = {
  "🏖️ Caribbean Coast": {
    emoji: "🏖️",
    name: "Caribbean Coast",
    shortName: "Caribbean",
    description: "Coastal wetlands, mangroves, and dry forests with unique Caribbean species.",
    species: "300+",
    highlights: ["Flamingos", "Mangrove species", "Coastal birds"],
    difficulty: "Easy",
  },
  "🏔️ Sierra Nevada de Santa Marta": {
    emoji: "🏔️",
    name: "Sierra Nevada de Santa Marta",
    shortName: "SNSM",
    description: "World's most important endemic bird area with 15+ species found nowhere else.",
    species: "600+",
    highlights: ["15 endemic species", "Santa Marta Antbird", "Altitude diversity"],
    difficulty: "Challenging",
  },
  "🌊 Pacific Coast Chocó": {
    emoji: "🌊",
    name: "Pacific Coast Chocó",
    shortName: "Chocó",
    description: "One of the world's most biodiverse regions with spectacular endemic species.",
    species: "800+",
    highlights: ["Highest diversity", "Endemic species", "Pristine rainforest"],
    difficulty: "Moderate",
  },
  "⛰️ Western Andes": {
    emoji: "⛰️",
    name: "Western Andes",
    shortName: "W. Andes",
    description: "Cloud forests and montane ecosystems with incredible hummingbird diversity.",
    species: "500+",
    highlights: ["Hummingbird paradise", "Cloud forests", "Tanager diversity"],
    difficulty: "Moderate",
  },
  "🏞️ Cauca Valley": {
    emoji: "🏞️",
    name: "Cauca Valley",
    shortName: "Cauca",
    description: "Inter-Andean valley with dry forests and agricultural landscapes.",
    species: "250+",
    highlights: ["Dry forest species", "Agricultural birds", "Easy access"],
    difficulty: "Easy",
  },
  "🗻 Central Andes": {
    emoji: "🗻",
    name: "Central Andes",
    shortName: "C. Andes",
    description: "Coffee region with cloud forests and high-altitude páramo ecosystems.",
    species: "450+",
    highlights: ["Coffee farms", "Páramo birds", "Andean species"],
    difficulty: "Moderate",
  },
  "🌄 Magdalena Valley": {
    emoji: "🌄",
    name: "Magdalena Valley",
    shortName: "Magdalena",
    description: "Major river valley with diverse habitats from wetlands to dry forests.",
    species: "400+",
    highlights: ["River birds", "Wetland species", "Diverse habitats"],
    difficulty: "Easy",
  },
  "🏔️ Eastern Andes": {
    emoji: "🏔️",
    name: "Eastern Andes",
    shortName: "E. Andes",
    description: "High-altitude ecosystems including páramo and cloud forests near Bogotá.",
    species: "350+",
    highlights: ["High-altitude species", "Páramo birds", "Near Bogotá"],
    difficulty: "Moderate",
  },
  "🌾 Eastern Plains": {
    emoji: "🌾",
    name: "Eastern Plains",
    shortName: "Llanos",
    description: "Vast grasslands and gallery forests with unique grassland species.",
    species: "300+",
    highlights: ["Grassland birds", "Gallery forests", "Open landscapes"],
    difficulty: "Easy",
  },
  "🌳 Amazon Rainforest": {
    emoji: "🌳",
    name: "Amazon Rainforest",
    shortName: "Amazon",
    description: "World's largest rainforest with incredible biodiversity and canopy species.",
    species: "1000+",
    highlights: ["Highest species count", "Canopy birds", "Pristine rainforest"],
    difficulty: "Challenging",
  },
  "🌋 Colombian Massif": {
    emoji: "🌋",
    name: "Colombian Massif",
    shortName: "Massif",
    description: "High-altitude volcanic region where the Andes divide into three ranges.",
    species: "200+",
    highlights: ["Volcanic landscapes", "High-altitude species", "Unique geology"],
    difficulty: "Challenging",
  },
  "🗺️ Multiple Regions": {
    emoji: "🗺️",
    name: "Multiple Regions",
    shortName: "Multi-Region",
    description: "Experience the best of Colombia across multiple biogeographic regions.",
    species: "500+",
    highlights: ["Maximum diversity", "Multiple ecosystems", "Comprehensive experience"],
    difficulty: "Moderate",
  },
  "✨ Let AVES Choose": {
    emoji: "✨",
    name: "Let AVES Choose",
    shortName: "Expert Choice",
    description: "Let our experts design the perfect itinerary based on your interests.",
    species: "Custom",
    highlights: ["Expert curation", "Personalized", "Optimal routing"],
    difficulty: "Moderate",
  },
}

// Tour type information with enhanced details
const TOUR_TYPE_INFO = {
  "🍃 Adventure Tours": {
    price: 1000,
    description: "Active birding with hiking and exploration",
    features: ["Moderate hiking", "Remote locations", "Adventure activities"],
  },
  "🪶 Vision Tours": {
    price: 1250,
    description: "Premium photography-focused experiences",
    features: ["Photography guides", "Premium hides", "Equipment support"],
  },
  "🌼 Elevate Tours": {
    price: 1500,
    description: "Luxury comfort with exceptional birding",
    features: ["Luxury accommodations", "Gourmet meals", "Premium service"],
  },
  "🍓 Souls Tours": {
    price: 1750,
    description: "Deep cultural immersion with indigenous communities",
    features: ["Cultural immersion", "Indigenous guides", "Traditional experiences"],
  },
  "Custom Itinerary": {
    price: 1100,
    description: "Tailored experience designed for your needs",
    features: ["Fully customizable", "Personal consultation", "Flexible scheduling"],
  },
  "Not sure yet": {
    price: 1000,
    description: "We'll help you choose the perfect tour type",
    features: ["Expert consultation", "Flexible options", "Personalized recommendations"],
  },
}

// Utility functions
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

const formatDateRange = (startDate: Date, endDate: Date): string => {
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" }
  const start = startDate.toLocaleDateString("en-US", options)
  const end = endDate.toLocaleDateString("en-US", options)

  if (startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()) {
    const startDay = startDate.getDate()
    const endDay = endDate.getDate()
    const monthYear = startDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })
    return `${startDay}-${endDay} ${monthYear}`
  }
  return `${start} - ${end}`
}

const calculateTourDates = (tours: TourSelection[], baseStartDate?: Date): TourSelection[] => {
  if (!baseStartDate || tours.length === 0) {
    return tours.map((tour) => ({ ...tour, startDate: undefined, endDate: undefined }))
  }

  let currentStartDate = new Date(baseStartDate)
  return tours.map((tour, index) => {
    const startDate = new Date(currentStartDate)
    const endDate = addDays(startDate, tour.totalDays - 1)

    if (index < tours.length - 1) {
      const nextTour = tours[index + 1]
      currentStartDate = addDays(endDate, 1 + nextTour.restDays)
    }

    return { ...tour, startDate, endDate }
  })
}

const getMinimumBookingDate = (): Date => {
  const today = new Date()
  const oneMonthFromNow = new Date(today)
  oneMonthFromNow.setMonth(today.getMonth() + 1)
  return oneMonthFromNow
}

// Rest day activities (condensed)
const REST_DAY_CATEGORIES = {
  Culinary: ["Coffee tours", "Cooking classes", "Food markets", "Wine tasting"],
  Wellness: ["Spa treatments", "Hot springs", "Yoga sessions", "Nature retreats"],
  Cultural: ["Indigenous visits", "Craft workshops", "Music & dance", "Historical sites"],
  Adventure: ["Hiking", "River rafting", "Horseback riding", "Photography"],
  Shopping: ["Artisan crafts", "Local markets", "Emerald shopping", "Souvenirs"],
}

interface TourSelection {
  id: string
  tourType: string
  bioregion: string
  participants: number
  totalDays: number
  restDays: number
  startDate?: Date
  endDate?: Date
}

interface RestDayOptions {
  type: "independent" | "guided"
  activities: string[]
  customRequests: string
}

// Optimized Tour Card Component
const TourCard = ({
  tour,
  index,
  isFirst,
  onUpdate,
  onRemove,
  restDayOptions,
  onRestDayUpdate,
  calculateRestDayCost,
  getHighestTourPrice,
  tourSelections,
  prefilledInfo,
}: {
  tour: TourSelection
  index: number
  isFirst: boolean
  onUpdate: (field: keyof TourSelection, value: any) => void
  onRemove: () => void
  restDayOptions: RestDayOptions
  onRestDayUpdate: (field: string, value: any) => void
  calculateRestDayCost: (tourId: string, restDays: number, option: string) => number
  getHighestTourPrice: () => number
  tourSelections: TourSelection[]
  prefilledInfo: any
}) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [showRestDayDetails, setShowRestDayDetails] = useState(false)

  const regionInfo = REGION_DATA[tour.bioregion] || REGION_DATA["⛰️ Western Andes"]
  const tourTypeInfo =
    TOUR_TYPE_INFO[tour.tourType as keyof typeof TOUR_TYPE_INFO] || TOUR_TYPE_INFO["🍃 Adventure Tours"]

  const tourCost = tourTypeInfo.price * tour.totalDays * tour.participants
  const restCost =
    tour.restDays > 0
      ? restDayOptions.type === "independent"
        ? 0
        : calculateRestDayCost(tour.id, tour.restDays, "guided")
      : 0
  const totalCost = tourCost + restCost

  return (
    <Card className="border-2 border-emerald-200 shadow-lg transition-all duration-200 hover:shadow-xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge className="bg-emerald-100 text-emerald-800 px-3 py-1 text-sm font-bold">Tour {index + 1}</Badge>
            {tour.restDays > 0 && (
              <Badge variant="outline" className="border-amber-300 text-amber-700 text-xs">
                +{tour.restDays} rest days
              </Badge>
            )}
            {isFirst && (prefilledInfo.tourType || prefilledInfo.region) && (
              <Badge className="bg-blue-100 text-blue-800 text-xs">Pre-selected</Badge>
            )}
            <Badge variant="secondary" className="text-xs">
              {regionInfo.difficulty}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-500 hover:text-gray-700"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
            {!isFirst && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRemove}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Compact Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span className="font-medium">{regionInfo.shortName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>{tour.totalDays} days</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-600" />
            <span>{tour.participants} people</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="font-bold">${totalCost.toLocaleString()}</span>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Tour Type Selection - Compact Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">Tour Type *</label>
              <Link href="/tours" className="text-xs text-emerald-600 hover:underline flex items-center gap-1">
                <ExternalLink className="w-3 h-3" />
                Compare Tours
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {CONTACT_TOUR_TYPE_OPTIONS.map((tourType) => {
                const info = TOUR_TYPE_INFO[tourType as keyof typeof TOUR_TYPE_INFO]
                return (
                  <label
                    key={tourType}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all text-sm ${
                      tour.tourType === tourType
                        ? "border-emerald-500 bg-emerald-50 shadow-md"
                        : "border-gray-200 hover:border-emerald-300 bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`tourType-${tour.id}`}
                      value={tourType}
                      checked={tour.tourType === tourType}
                      onChange={(e) => onUpdate("tourType", e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{tourType}</span>
                      <span className="text-xs text-emerald-600 font-bold">${info?.price}/day</span>
                    </div>
                    <p className="text-xs text-gray-600">{info?.description}</p>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Bioregion Selection - Enhanced Cards */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">Bioregion *</label>
              <div className="flex items-center gap-2 text-xs">
                <Link
                  href="/avifauna-explorer#bioregions-map"
                  className="text-emerald-600 hover:underline flex items-center gap-1"
                >
                  <Map className="w-3 h-3" />
                  Map
                </Link>
                <span className="text-gray-300">|</span>
                <Link href="/endemic-birds" className="text-blue-600 hover:underline flex items-center gap-1">
                  <Bird className="w-3 h-3" />
                  Species
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {LOCATION_OPTIONS.filter(
                (location) => location === tour.bioregion || !tourSelections.some((t) => t.bioregion === location),
              ).map((location) => {
                const isSelected = tour.bioregion === location
                const info = REGION_DATA[location]

                return (
                  <div
                    key={location}
                    onClick={() => onUpdate("bioregion", location)}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-50 shadow-md"
                        : "border-gray-200 hover:border-emerald-300 bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{info.emoji}</span>
                          <h4 className={`font-medium text-sm ${isSelected ? "text-emerald-800" : "text-gray-800"}`}>
                            {info.name}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {info.species} species
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {info.difficulty}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {info.highlights.slice(0, 2).map((highlight, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                          isSelected ? "border-emerald-500 bg-emerald-500" : "border-gray-300"
                        }`}
                      >
                        {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Compact Controls Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Participants */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Participants *</label>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onUpdate("participants", Math.max(1, tour.participants - 1))}
                  disabled={tour.participants <= 1}
                  className="px-3"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 text-center font-medium min-w-[80px]">{tour.participants}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onUpdate("participants", Math.min(4, tour.participants + 1))}
                  disabled={tour.participants >= 4}
                  className="px-3"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration *{" "}
                <Badge variant="secondary" className="ml-1 text-xs">
                  8 days optimal
                </Badge>
              </label>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onUpdate("totalDays", Math.max(3, tour.totalDays - 1))}
                  disabled={tour.totalDays <= 3}
                  className="px-3"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 text-center font-medium min-w-[80px]">{tour.totalDays} days</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onUpdate("totalDays", Math.min(14, tour.totalDays + 1))}
                  disabled={tour.totalDays >= 14}
                  className="px-3"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Rest Days */}
            {!isFirst && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rest Days{" "}
                  <Badge variant="secondary" className="ml-1 text-xs">
                    2 recommended
                  </Badge>
                </label>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onUpdate("restDays", Math.max(0, tour.restDays - 1))}
                    disabled={tour.restDays <= 0}
                    className="px-3"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 text-center font-medium min-w-[80px]">{tour.restDays} days</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onUpdate("restDays", Math.min(5, tour.restDays + 1))}
                    disabled={tour.restDays >= 5}
                    className="px-3"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Tour Dates Display */}
          {tour.startDate && tour.endDate && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-blue-800 mb-1">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    {isFirst ? "Tour Schedule" : "Calculated Schedule"}
                  </h4>
                  <p className="text-sm text-blue-700 font-medium">{formatDateRange(tour.startDate, tour.endDate)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-blue-600">
                    Start: {tour.startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                  <p className="text-xs text-blue-600">
                    End: {tour.endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Rest Day Options */}
          {!isFirst && tour.restDays > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">Rest Day Options</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRestDayDetails(!showRestDayDetails)}
                  className="text-xs"
                >
                  {showRestDayDetails ? "Hide Details" : "Customize"}
                </Button>
              </div>

              {/* Quick Rest Day Selection */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <label
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    restDayOptions.type === "independent"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                >
                  <input
                    type="radio"
                    name={`restDayType-${tour.id}`}
                    value="independent"
                    checked={restDayOptions.type === "independent"}
                    onChange={(e) => onRestDayUpdate("type", e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">Independent</span>
                    <Badge className="bg-green-100 text-green-800 text-xs">FREE</Badge>
                  </div>
                  <p className="text-xs text-gray-600">Self-arranged activities</p>
                </label>

                <label
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    restDayOptions.type === "guided"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <input
                    type="radio"
                    name={`restDayType-${tour.id}`}
                    value="guided"
                    checked={restDayOptions.type === "guided"}
                    onChange={(e) => onRestDayUpdate("type", e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">Fully Guided</span>
                    <span className="text-xs text-blue-600 font-bold">${getHighestTourPrice()}/day</span>
                  </div>
                  <p className="text-xs text-gray-600">Complete package included</p>
                </label>
              </div>

              {/* Detailed Rest Day Options */}
              {showRestDayDetails && restDayOptions.type === "guided" && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Activity Preferences</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {Object.entries(REST_DAY_CATEGORIES).map(([category, activities]) => (
                        <div key={category} className="space-y-1">
                          <h5 className="text-xs font-medium text-gray-600">{category}</h5>
                          {activities.map((activity) => (
                            <label key={activity} className="flex items-center space-x-2 text-xs">
                              <input
                                type="checkbox"
                                checked={restDayOptions.activities.includes(activity)}
                                onChange={(e) => {
                                  const newActivities = e.target.checked
                                    ? [...restDayOptions.activities, activity]
                                    : restDayOptions.activities.filter((a) => a !== activity)
                                  onRestDayUpdate("activities", newActivities)
                                }}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span>{activity}</span>
                            </label>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Custom Requests</label>
                    <textarea
                      value={restDayOptions.customRequests}
                      onChange={(e) => onRestDayUpdate("customRequests", e.target.value)}
                      placeholder="Any specific preferences or requirements..."
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Cost Summary */}
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-4 border border-emerald-200">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-900">Tour {index + 1} Total:</span>
              <span className="text-xl font-bold text-emerald-600">${totalCost.toLocaleString()}</span>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>Tour ({tour.totalDays} days):</span>
                <span>${tourCost.toLocaleString()}</span>
              </div>
              {tour.restDays > 0 && (
                <div className="flex justify-between">
                  <span>Rest days ({tour.restDays} days):</span>
                  <span className={restCost === 0 ? "text-green-600 font-medium" : ""}>
                    {restCost === 0 ? "FREE" : `$${restCost.toLocaleString()}`}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

// Add this function before the useEffect
const mapBioregionToLocation = (bioregionId: string): string => {
  const mapping: Record<string, string> = {
    Pacific: "🌊 Pacific Coast Chocó",
    "Western Andes": "⛰️ Western Andes",
    "Central Andes": "🗻 Central Andes",
    "Eastern Andes": "🏔️ Eastern Andes",
    "Interandean Valleys": "🌄 Magdalena Valley",
    Caribbean: "🏖️ Caribbean Coast",
    SNSM: "🏔️ Sierra Nevada de Santa Marta",
    Llanos: "🌾 Eastern Plains",
    Amazonia: "🌳 Amazon Rainforest",
    Massif: "🌋 Colombian Massif",
    Marine: "🏖️ Caribbean Coast",
  }
  return mapping[bioregionId] || bioregionId
}

// Main Shopping Page Component with Auth Integration
function ShoppingPageContent() {
  const searchParams = useSearchParams()
  const { user, loading: authLoading, signOut, supabase } = useAuth()
  const preselectedTourType = searchParams.get("preset") || searchParams.get("tour")
  const preselectedRegion = searchParams.get("region") || searchParams.get("bioregion")
  const fromPage = searchParams.get("from")

  // State management
  const [tourSelections, setTourSelections] = useState<TourSelection[]>([])
  const [showQuestions, setShowQuestions] = useState(false)
  const [questions, setQuestions] = useState("")
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    travelDate: "",
    experienceLevel: "Beginner birder",
  })
  const [savedBooking, setSavedBooking] = useState(false)
  const [showPrefilledNotification, setShowPrefilledNotification] = useState(false)
  const [prefilledInfo, setPrefilledInfo] = useState<{
    tourType?: string
    region?: string
    fromPage?: string
  }>({})
  const [restDayOptions, setRestDayOptions] = useState<Record<string, RestDayOptions>>({})
  const [showAccountPrompt, setShowAccountPrompt] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)

  const [progress, setProgress] = useState(0)
  const [costBreakdown, setCostBreakdown] = useState({
    totalCost: 0,
    depositAmount: 0,
    finalPayment: 0,
  })

  const minimumBookingDate = useMemo(() => getMinimumBookingDate(), [])

  // Prefill logic
  useEffect(() => {
    if (preselectedTourType || preselectedRegion || fromPage) {
      const mappedRegion = preselectedRegion ? mapBioregionToLocation(preselectedRegion) : undefined

      setPrefilledInfo({
        tourType: preselectedTourType || undefined,
        region: mappedRegion,
        fromPage: fromPage || undefined,
      })

      setTourSelections([
        {
          id: Date.now().toString(),
          tourType: preselectedTourType || "🍃 Adventure Tours",
          bioregion: mappedRegion || "⛰️ Western Andes",
          participants: 2,
          totalDays: 8,
          restDays: 0,
        },
      ])
      setShowPrefilledNotification(true)
    } else {
      setTourSelections([
        {
          id: Date.now().toString(),
          tourType: "🍃 Adventure Tours",
          bioregion: "⛰️ Western Andes",
          participants: 2,
          totalDays: 8,
          restDays: 0,
        },
      ])
    }
  }, [preselectedTourType, preselectedRegion, fromPage])

  // Tour date calculation
  useEffect(() => {
    if (tourSelections.length > 0 && tourSelections[0]) {
      const calculatedTours = calculateTourDates(tourSelections, tourSelections[0].startDate)
      setTourSelections(calculatedTours)
    }
  }, [tourSelections])

  // Cost calculation
  useEffect(() => {
    const totalCost = tourSelections.reduce((sum, tour) => {
      const tourTypeInfo =
        TOUR_TYPE_INFO[tour.tourType as keyof typeof TOUR_TYPE_INFO] || TOUR_TYPE_INFO["🍃 Adventure Tours"]
      const tourCost = tourTypeInfo.price * tour.totalDays * tour.participants
      const restCost =
        tour.restDays > 0
          ? restDayOptions[tour.id]?.type === "independent"
            ? 0
            : calculateRestDayCost(tour.id, tour.restDays, "guided")
          : 0
      return sum + tourCost + restCost
    }, 0)

    const depositAmount = totalCost * 0.3
    const finalPayment = totalCost - depositAmount

    setCostBreakdown({
      totalCost,
      depositAmount,
      finalPayment,
    })
  }, [tourSelections, restDayOptions])

  // Progress calculation
  useEffect(() => {
    let completedFields = 0

    if (tourSelections.length > 0) {
      completedFields += tourSelections.length * 2 // tourType and bioregion
      completedFields += tourSelections.reduce((sum, tour) => {
        return sum + (tour.participants > 0 ? 1 : 0) + (tour.totalDays > 0 ? 1 : 0)
      }, 0)
    }

    if (contactInfo.firstName) completedFields++
    if (contactInfo.lastName) completedFields++
    if (contactInfo.email) completedFields++

    const totalFields = tourSelections.length * 4 + 3
    const calculatedProgress = (completedFields / totalFields) * 100

    setProgress(Math.min(100, calculatedProgress))
  }, [tourSelections, contactInfo])

  const addTourSelection = useCallback(() => {
    setTourSelections((prevSelections) => [
      ...prevSelections,
      {
        id: Date.now().toString(),
        tourType: "🍃 Adventure Tours",
        bioregion: "⛰️ Western Andes",
        participants: 2,
        totalDays: 8,
        restDays: 0,
      },
    ])
  }, [])

  const updateTourSelection = useCallback((id: string, field: keyof TourSelection, value: any) => {
    setTourSelections((prevSelections) =>
      prevSelections.map((tour) => (tour.id === id ? { ...tour, [field]: value } : tour)),
    )
  }, [])

  const removeTourSelection = useCallback((id: string) => {
    setTourSelections((prevSelections) => prevSelections.filter((tour) => tour.id !== id))
    setRestDayOptions((prevOptions) => {
      const newOptions = { ...prevOptions }
      delete newOptions[id]
      return newOptions
    })
  }, [])

  const updateStartDate = useCallback((date: Date) => {
    setTourSelections((prevSelections) => {
      const firstTour = prevSelections[0]
      if (firstTour) {
        return calculateTourDates(
          prevSelections.map((tour, index) => (index === 0 ? { ...tour, startDate: date } : { ...tour })),
          date,
        )
      }
      return prevSelections
    })
  }, [])

  const updateAllParticipants = useCallback((value: number) => {
    setTourSelections((prevSelections) => prevSelections.map((tour) => ({ ...tour, participants: value })))
  }, [])

  const updateRestDayOption = useCallback((tourId: string, field: string, value: any) => {
    setRestDayOptions((prevOptions) => ({
      ...prevOptions,
      [tourId]: {
        ...prevOptions[tourId],
        [field]: value,
      },
    }))
  }, [])

  const calculateRestDayCost = useCallback((tourId: string, restDays: number, option: string): number => {
    if (option === "independent") return 0
    const highestTourPrice = getHighestTourPrice()
    return highestTourPrice * restDays
  }, [])

  const getHighestTourPrice = useCallback((): number => {
    return Object.values(TOUR_TYPE_INFO).reduce((max, tourType) => Math.max(max, tourType.price), 0)
  }, [])

  const handleAccountCreated = useCallback(() => {
    setShowAccountPrompt(false)
  }, [])

  const bookingData = useMemo(
    () => ({
      tours: tourSelections,
      contactInfo,
      totalCost: costBreakdown.totalCost,
    }),
    [tourSelections, contactInfo, costBreakdown.totalCost],
  )

  const tripDuration = useMemo(() => {
    if (tourSelections.length === 0) {
      return { startDate: undefined, endDate: undefined, totalDays: 0 }
    }

    const firstTour = tourSelections[0]
    const lastTour = tourSelections[tourSelections.length - 1]

    if (!firstTour || !lastTour) {
      return { startDate: undefined, endDate: undefined, totalDays: 0 }
    }

    const startDate = firstTour.startDate
    const endDate = lastTour.endDate
    const totalDays = tourSelections.reduce((sum, tour) => sum + tour.totalDays, 0)

    return { startDate, endDate, totalDays }
  }, [tourSelections])

  const generateEmailLink = useCallback(() => {
    const subject = `Booking Request - ${contactInfo.firstName} ${contactInfo.lastName}`
    const body = `
      Contact Information:
      Name: ${contactInfo.firstName} ${contactInfo.lastName}
      Email: ${contactInfo.email}
      Phone: ${contactInfo.phone}
      Experience Level: ${contactInfo.experienceLevel}

      Tour Details:
      ${tourSelections
        .map(
          (tour, index) => `
        Tour ${index + 1}:
        Type: ${tour.tourType}
        Bioregion: ${tour.bioregion}
        Participants: ${tour.participants}
        Duration: ${tour.totalDays} days
        Rest Days: ${tour.restDays} days
        ${
          tour.startDate && tour.endDate
            ? `Dates: ${formatDateRange(tour.startDate, tour.endDate)}`
            : "Dates: Not yet scheduled"
        }
      `,
        )
        .join("\n")}

      Questions & Special Requests:
      ${questions}

      Total Cost: $${costBreakdown.totalCost.toLocaleString()}
    `

    return `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }, [contactInfo, tourSelections, questions, costBreakdown])

  const saveBooking = useCallback(async () => {
    try {
      localStorage.setItem("savedBooking", JSON.stringify(bookingData))
      setSavedBooking(true)
      setTimeout(() => setSavedBooking(false), 3000)
    } catch (error) {
      console.error("Error saving booking to local storage:", error)
    }
  }, [bookingData])

  return (
    <div>
      {/* Navigation Header */}
      <NavigationHeader />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Prefilled Notification */}
        {showPrefilledNotification && (
          <Alert className="mb-6">
            <AlertDescription>Your booking has been pre-filled based on your previous selections.</AlertDescription>
          </Alert>
        )}

        {/* Tour Selections */}
        <div className="space-y-6">
          {tourSelections.map((tour, index) => (
            <TourCard
              key={tour.id}
              tour={tour}
              index={index}
              isFirst={index === 0}
              onUpdate={(field, value) => updateTourSelection(tour.id, field, value)}
              onRemove={() => removeTourSelection(tour.id)}
              restDayOptions={restDayOptions[tour.id] || { type: "independent", activities: [], customRequests: "" }}
              onRestDayUpdate={(field, value) => updateRestDayOption(tour.id, field, value)}
              calculateRestDayCost={calculateRestDayCost}
              getHighestTourPrice={getHighestTourPrice}
              tourSelections={tourSelections}
              prefilledInfo={prefilledInfo}
            />
          ))}
        </div>

        {/* Add Tour Button */}
        <Button onClick={addTourSelection} className="mt-6">
          Add Another Tour
        </Button>

        {/* Contact Information */}
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={contactInfo.firstName}
              onChange={(e) => setContactInfo({ ...contactInfo, firstName: e.target.value })}
              className="col-span-2 md:col-span-1"
            />
            <Input
              label="Last Name"
              value={contactInfo.lastName}
              onChange={(e) => setContactInfo({ ...contactInfo, lastName: e.target.value })}
              className="col-span-2 md:col-span-1"
            />
            <Input
              label="Email"
              value={contactInfo.email}
              onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
              className="col-span-2"
            />
            <Input
              label="Phone"
              value={contactInfo.phone}
              onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
              className="col-span-2"
            />
            <Input
              label="Travel Date"
              type="date"
              value={contactInfo.travelDate}
              onChange={(e) => setContactInfo({ ...contactInfo, travelDate: e.target.value })}
              min={minimumBookingDate.toISOString().split("T")[0]}
              className="col-span-2"
            />
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
              <select
                value={contactInfo.experienceLevel}
                onChange={(e) => setContactInfo({ ...contactInfo, experienceLevel: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                {EXPERIENCE_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Questions & Special Requests */}
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Questions & Special Requests</h3>
          <textarea
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
            placeholder="Feel free to ask any questions or specify any special requests..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Cost Breakdown */}
        <div className="mt-8 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-4 border border-emerald-200">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-900">Total Cost:</span>
            <span className="text-xl font-bold text-emerald-600">${costBreakdown.totalCost.toLocaleString()}</span>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Deposit Amount:</span>
              <span>${costBreakdown.depositAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Final Payment:</span>
              <span>${costBreakdown.finalPayment.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Save Booking Button */}
        <Button onClick={saveBooking} className="mt-6">
          Save Booking
        </Button>

        {/* Email Booking Button */}
        <Button onClick={() => (window.location.href = generateEmailLink())} className="mt-6">
          Email Booking
        </Button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default ShoppingPageContent
