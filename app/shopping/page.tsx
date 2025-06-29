"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  Plus,
  Minus,
  Calculator,
  Save,
  Mail,
  Share2,
  MessageCircle,
  Trash2,
  Info,
  CheckCircle,
  X,
  Clock,
  ExternalLink,
  Map,
  Bird,
  Calendar,
  Users,
  MapPin,
  DollarSign,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import Link from "next/link"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { LOCATION_OPTIONS, CONTACT_TOUR_TYPE_OPTIONS, EXPERIENCE_LEVELS } from "@/lib/form-options"
import { useSearchParams } from "next/navigation"
import { EmbeddedTourCalendar } from "@/components/embedded-tour-calendar"

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
    price: 1400,
    description: "Premium photography-focused experiences",
    features: ["Photography guides", "Premium hides", "Equipment support"],
  },
  "🌼 Elevate Tours": {
    price: 1200,
    description: "Luxury comfort with exceptional birding",
    features: ["Luxury accommodations", "Gourmet meals", "Premium service"],
  },
  "🍓 Souls Tours": {
    price: 1600,
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

// Main Shopping Page Component
export default function ShoppingPage() {
  const searchParams = useSearchParams()
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
  const [currentStep, setCurrentStep] = useState(1)

  // Initialize tour selections
  useEffect(() => {
    const initialTourType =
      preselectedTourType && CONTACT_TOUR_TYPE_OPTIONS.includes(preselectedTourType as any)
        ? preselectedTourType
        : "🍃 Adventure Tours"
    const initialRegion =
      preselectedRegion && LOCATION_OPTIONS.includes(preselectedRegion as any) ? preselectedRegion : "⛰️ Western Andes"

    const initialTour: TourSelection = {
      id: "1",
      tourType: initialTourType,
      bioregion: initialRegion,
      participants: 2,
      totalDays: 8,
      restDays: 0,
    }

    setTourSelections([initialTour])

    if (preselectedTourType || preselectedRegion) {
      setPrefilledInfo({
        tourType: preselectedTourType || undefined,
        region: preselectedRegion || undefined,
        fromPage: fromPage || undefined,
      })
      setShowPrefilledNotification(true)
      setTimeout(() => setShowPrefilledNotification(false), 8000)
    }
  }, [preselectedTourType, preselectedRegion, fromPage])

  // Memoized calculations
  const getHighestTourPrice = useMemo(() => {
    return () =>
      Math.max(
        ...tourSelections.map((tour) => TOUR_TYPE_INFO[tour.tourType as keyof typeof TOUR_TYPE_INFO]?.price || 1000),
      )
  }, [tourSelections])

  const calculateRestDayCost = useCallback(
    (tourId: string, restDays: number, option: string) => {
      if (option === "independent") return 0
      const tour = tourSelections.find((t) => t.id === tourId)
      if (!tour || option !== "guided") return 0
      return getHighestTourPrice() * restDays * tour.participants
    },
    [tourSelections, getHighestTourPrice],
  )

  const costBreakdown = useMemo(() => {
    let totalCost = 0
    let totalDays = 0

    tourSelections.forEach((tour) => {
      const tourTypeInfo = TOUR_TYPE_INFO[tour.tourType as keyof typeof TOUR_TYPE_INFO]
      const pricePerDay = tourTypeInfo?.price || 1000
      const tourCost = pricePerDay * tour.totalDays * tour.participants

      const restDayOption = restDayOptions[tour.id]?.type || "independent"
      const restCost =
        tour.restDays > 0 && restDayOption === "guided" ? calculateRestDayCost(tour.id, tour.restDays, "guided") : 0

      totalCost += tourCost + restCost
      totalDays += tour.totalDays + tour.restDays
    })

    return {
      totalCost,
      totalDays,
      depositAmount: Math.round(totalCost * 0.3),
      finalPayment: totalCost - Math.round(totalCost * 0.3),
      participants: tourSelections[0]?.participants || 2,
    }
  }, [tourSelections, restDayOptions, calculateRestDayCost])

  const tripDuration = useMemo(() => {
    if (tourSelections.length === 0 || !tourSelections[0]?.startDate) {
      return { totalDays: 0 }
    }

    const firstTour = tourSelections[0]
    const lastTour = tourSelections[tourSelections.length - 1]

    if (!firstTour.startDate || !lastTour.endDate) {
      return { totalDays: 0 }
    }

    const timeDiff = lastTour.endDate.getTime() - firstTour.startDate.getTime()
    const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1

    return {
      startDate: firstTour.startDate,
      endDate: lastTour.endDate,
      totalDays,
    }
  }, [tourSelections])

  // Event handlers
  const addTourSelection = useCallback(() => {
    if (tourSelections.length < 4) {
      const newTour: TourSelection = {
        id: Date.now().toString(),
        tourType: "🍃 Adventure Tours",
        bioregion: "🗻 Central Andes",
        participants: tourSelections[0]?.participants || 2,
        totalDays: 8,
        restDays: 2,
      }

      const updatedSelections = [...tourSelections, newTour]
      const firstTourStartDate = tourSelections[0]?.startDate

      if (firstTourStartDate) {
        const recalculatedTours = calculateTourDates(updatedSelections, firstTourStartDate)
        setTourSelections(recalculatedTours)
      } else {
        setTourSelections(updatedSelections)
      }
    }
  }, [tourSelections])

  const removeTourSelection = useCallback(
    (id: string) => {
      if (tourSelections.length > 1) {
        const updatedSelections = tourSelections.filter((tour) => tour.id !== id)
        const firstTourStartDate = updatedSelections[0]?.startDate

        if (firstTourStartDate) {
          const recalculatedTours = calculateTourDates(updatedSelections, firstTourStartDate)
          setTourSelections(recalculatedTours)
        } else {
          setTourSelections(updatedSelections)
        }
      }
    },
    [tourSelections],
  )

  const updateTourSelection = useCallback(
    (id: string, field: keyof TourSelection, value: any) => {
      const updatedSelections = tourSelections.map((tour) => {
        if (tour.id === id) {
          const updatedTour = { ...tour, [field]: value }
          if (field === "totalDays" && value >= 8 && tourSelections.findIndex((t) => t.id === id) > 0) {
            updatedTour.restDays = Math.max(updatedTour.restDays, 2)
          }
          return updatedTour
        }
        return tour
      })

      const firstTourStartDate = updatedSelections[0]?.startDate
      if (firstTourStartDate) {
        const recalculatedTours = calculateTourDates(updatedSelections, firstTourStartDate)
        setTourSelections(recalculatedTours)
      } else {
        setTourSelections(updatedSelections)
      }
    },
    [tourSelections],
  )

  const updateAllParticipants = useCallback(
    (participants: number) => {
      const updatedSelections = tourSelections.map((tour) => ({ ...tour, participants }))
      const firstTourStartDate = updatedSelections[0]?.startDate

      if (firstTourStartDate) {
        const recalculatedTours = calculateTourDates(updatedSelections, firstTourStartDate)
        setTourSelections(recalculatedTours)
      } else {
        setTourSelections(updatedSelections)
      }
    },
    [tourSelections],
  )

  const updateRestDayOption = useCallback((tourId: string, field: string, value: any) => {
    setRestDayOptions((prev) => ({
      ...prev,
      [tourId]: {
        type: "independent",
        activities: [],
        customRequests: "",
        ...prev[tourId],
        [field]: value,
      },
    }))
  }, [])

  const updateStartDate = useCallback(
    (date: Date | undefined) => {
      if (!date) {
        setTourSelections(
          tourSelections.map((tour) => ({
            ...tour,
            startDate: undefined,
            endDate: undefined,
          })),
        )
        return
      }

      const recalculatedTours = calculateTourDates(tourSelections, date)
      setTourSelections(recalculatedTours)
    },
    [tourSelections],
  )

  const saveBooking = useCallback(() => {
    const bookingData = {
      tours: tourSelections,
      contactInfo,
      questions,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("aves-booking", JSON.stringify(bookingData))
    setSavedBooking(true)
    setTimeout(() => setSavedBooking(false), 3000)
  }, [tourSelections, contactInfo, questions])

  const generateEmailLink = useCallback(() => {
    const subject = encodeURIComponent("Colombian Birding Tour Booking Request")
    const body = encodeURIComponent(`Hello AVES Team,

I'm interested in booking the following Colombian birding adventure:

CONTACT INFORMATION:
Name: ${contactInfo.firstName} ${contactInfo.lastName}
Email: ${contactInfo.email}
Phone: ${contactInfo.phone || "Not provided"}
Travel Date: ${contactInfo.travelDate || "Flexible"}
Experience Level: ${contactInfo.experienceLevel}

TOUR SELECTIONS:
${tourSelections
  .map((tour, index) => {
    const regionInfo = REGION_DATA[tour.bioregion]
    const restDayOption = restDayOptions[tour.id]?.type || "independent"
    return `Tour ${index + 1}: ${tour.tourType}
Bioregion: ${regionInfo?.name || tour.bioregion}
Participants: ${tour.participants}
Duration: ${tour.totalDays} days${tour.restDays > 0 ? ` + ${tour.restDays} rest days` : ""}
${tour.startDate && tour.endDate ? `Tour Dates: ${formatDateRange(tour.startDate, tour.endDate)}` : "Tour Dates: To be determined"}
${tour.restDays > 0 ? `Rest Days: ${tour.restDays} days (${restDayOption === "independent" ? "FREE - independent" : `$${getHighestTourPrice()}/person/day - fully guided`})` : ""}`
  })
  .join("\n\n")}

BOOKING SUMMARY:
Total Cost: $${costBreakdown.totalCost.toLocaleString()}
Total Duration: ${costBreakdown.totalDays} days
Participants: ${costBreakdown.participants}
${tripDuration.startDate && tripDuration.endDate ? `Complete Trip: ${formatDateRange(tripDuration.startDate, tripDuration.endDate)}` : "Trip Dates: To be determined"}

${questions ? `SPECIAL REQUESTS:\n${questions}` : ""}

I look forward to hearing from you within 24 hours as mentioned on your website.

Best regards,
${contactInfo.firstName} ${contactInfo.lastName}`)

    return `mailto:info@aves.com?subject=${subject}&body=${body}`
  }, [tourSelections, contactInfo, questions, costBreakdown, tripDuration, restDayOptions, getHighestTourPrice])

  // Progress calculation
  const progress = useMemo(() => {
    let completed = 0
    const total = 4

    if (tourSelections.length > 0 && tourSelections[0].tourType && tourSelections[0].bioregion) completed++
    if (tourSelections[0]?.startDate) completed++
    if (contactInfo.firstName && contactInfo.lastName && contactInfo.email) completed++
    if (true) completed++ // Always count as ready to book

    return (completed / total) * 100
  }, [tourSelections, contactInfo])

  const minimumBookingDate = getMinimumBookingDate()

  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader currentPage="/shopping" />

      {/* Optimized Hero Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4">Build Your Adventure</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Plan Your Colombian Birding Journey</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create your perfect multi-tour birding experience across Colombia's diverse bioregions with expert
              guidance.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </section>

      {/* Pre-filled Notification */}
      {showPrefilledNotification && (
        <section className="py-4">
          <div className="container mx-auto px-4">
            <Alert className="border-emerald-200 bg-emerald-50 max-w-4xl mx-auto">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <AlertDescription className="text-emerald-800 pr-8">
                Great choice! We've pre-filled your selections based on your interest. You can customize everything
                below!
              </AlertDescription>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPrefilledNotification(false)}
                className="absolute right-2 top-2 h-6 w-6 p-0 text-emerald-600 hover:text-emerald-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </Alert>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Tour Builder - Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Tips */}
              <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-blue-800 mb-2">Expert Recommendations</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                        <ul className="space-y-1">
                          <li>• 8-day tours for optimal diversity</li>
                          <li>• 2-day rest periods recommended</li>
                          <li>• Maximum 4 participants per tour</li>
                        </ul>
                        <ul className="space-y-1">
                          <li>• Combine different bioregions</li>
                          <li>• Book 1 month in advance</li>
                          <li>• Independent rest days are FREE</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Calendar Section */}
              <EmbeddedTourCalendar
                selectedDate={tourSelections[0]?.startDate}
                onDateSelect={updateStartDate}
                minDate={minimumBookingDate}
              />

              {/* Tour Selections */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Your Tours</h2>
                  <Badge variant="outline" className="text-sm">
                    {tourSelections.length} of 4 tours
                  </Badge>
                </div>

                {tourSelections.map((tour, index) => (
                  <TourCard
                    key={tour.id}
                    tour={tour}
                    index={index}
                    isFirst={index === 0}
                    onUpdate={(field, value) => {
                      if (field === "participants") {
                        updateAllParticipants(value)
                      } else {
                        updateTourSelection(tour.id, field, value)
                      }
                    }}
                    onRemove={() => removeTourSelection(tour.id)}
                    restDayOptions={
                      restDayOptions[tour.id] || { type: "independent", activities: [], customRequests: "" }
                    }
                    onRestDayUpdate={(field, value) => updateRestDayOption(tour.id, field, value)}
                    calculateRestDayCost={calculateRestDayCost}
                    getHighestTourPrice={getHighestTourPrice}
                    tourSelections={tourSelections}
                    prefilledInfo={prefilledInfo}
                  />
                ))}

                {/* Add Tour Button */}
                {tourSelections.length < 4 && (
                  <Card className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 transition-colors">
                    <CardContent className="flex items-center justify-center py-8">
                      <Button
                        onClick={addTourSelection}
                        variant="ghost"
                        className="text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Add Another Tour ({4 - tourSelections.length} remaining)
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Contact Information - Compact */}
              <Card className="border-2 border-blue-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="First Name *"
                      value={contactInfo.firstName}
                      onChange={(e) => setContactInfo({ ...contactInfo, firstName: e.target.value })}
                    />
                    <Input
                      placeholder="Last Name *"
                      value={contactInfo.lastName}
                      onChange={(e) => setContactInfo({ ...contactInfo, lastName: e.target.value })}
                    />
                  </div>
                  <Input
                    type="email"
                    placeholder="Email Address *"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Phone (Optional)"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    />
                    <select
                      value={contactInfo.experienceLevel}
                      onChange={(e) => setContactInfo({ ...contactInfo, experienceLevel: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {EXPERIENCE_LEVELS.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Questions Section - Collapsible */}
              <Card className="border-2 border-purple-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Questions & Special Requests</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setShowQuestions(!showQuestions)}>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {showQuestions ? "Hide" : "Add Questions"}
                    </Button>
                  </div>
                </CardHeader>
                {showQuestions && (
                  <CardContent>
                    <textarea
                      value={questions}
                      onChange={(e) => setQuestions(e.target.value)}
                      placeholder="Any questions about the tours, dietary restrictions, accessibility needs, specific birds you'd like to see, or other special requests..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </CardContent>
                )}
              </Card>
            </div>

            {/* Booking Summary - Right Column */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-2 border-emerald-200 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-xl">
                    <Calculator className="w-5 h-5 mr-2 text-emerald-600" />
                    Booking Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Trip Overview */}
                  {tripDuration.startDate && tripDuration.endDate && (
                    <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-4 border border-emerald-200">
                      <h4 className="font-semibold text-emerald-800 mb-3 flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Trip Overview
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-emerald-700">Duration:</span>
                          <span className="font-medium text-emerald-800">{tripDuration.totalDays} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-emerald-700">Dates:</span>
                          <span className="font-medium text-emerald-800">
                            {formatDateRange(tripDuration.startDate, tripDuration.endDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tours Summary - Compact */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 border-b pb-2">Selected Tours</h4>
                    {tourSelections.map((tour, index) => {
                      const regionInfo = REGION_DATA[tour.bioregion]
                      const restDayOption = restDayOptions[tour.id]?.type || "independent"
                      const tourCost =
                        (TOUR_TYPE_INFO[tour.tourType as keyof typeof TOUR_TYPE_INFO]?.price || 1000) *
                        tour.totalDays *
                        tour.participants
                      const restCost =
                        tour.restDays > 0 && restDayOption === "guided"
                          ? calculateRestDayCost(tour.id, tour.restDays, "guided")
                          : 0

                      return (
                        <div key={tour.id} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="font-medium text-sm text-gray-900">
                                Tour {index + 1}: {tour.tourType.replace(/[🍃🪶🌼🍓]/gu, "").trim()}
                              </div>
                              <div className="text-xs text-gray-600">
                                {regionInfo?.shortName} • {tour.totalDays} days
                                {tour.restDays > 0 && ` + ${tour.restDays} rest`}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-sm text-emerald-600">
                                ${(tourCost + restCost).toLocaleString()}
                              </div>
                              {tour.restDays > 0 && (
                                <div className="text-xs text-gray-500">
                                  Rest: {restCost === 0 ? "FREE" : `$${restCost.toLocaleString()}`}
                                </div>
                              )}
                            </div>
                          </div>
                          {tour.startDate && tour.endDate && (
                            <div className="text-xs text-blue-600 font-medium">
                              {formatDateRange(tour.startDate, tour.endDate)}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Cost Breakdown */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold text-gray-900">Total Cost</span>
                      <span className="text-2xl font-bold text-emerald-600">
                        ${costBreakdown.totalCost.toLocaleString()}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600 mb-6">
                      <div className="flex justify-between">
                        <span>Deposit (30%):</span>
                        <span className="font-medium">${costBreakdown.depositAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Final Payment:</span>
                        <span className="font-medium">${costBreakdown.finalPayment.toLocaleString()}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">Final payment due 30 days before departure</div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <a
                        href={generateEmailLink()}
                        className="block w-full"
                        onClick={(e) => {
                          if (!contactInfo.firstName || !contactInfo.lastName || !contactInfo.email) {
                            e.preventDefault()
                            alert("Please fill in your name and email address before sending your inquiry.")
                          }
                        }}
                      >
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3">
                          <Mail className="mr-2 w-4 h-4" />
                          Send Booking Request
                        </Button>
                      </a>

                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={saveBooking}
                          className="border-gray-300 text-gray-900 hover:bg-gray-50 bg-transparent"
                        >
                          <Save className="w-4 h-4 mr-1" />
                          {savedBooking ? "Saved!" : "Save"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({
                                title: "AVES Colombian Birding Tours",
                                text: `Check out my ${tourSelections.length}-tour Colombian birding adventure!`,
                                url: window.location.href,
                              })
                            } else {
                              navigator.clipboard.writeText(window.location.href)
                              alert("Link copied to clipboard!")
                            }
                          }}
                          className="border-gray-300 text-gray-900 hover:bg-gray-50"
                        >
                          <Share2 className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                      </div>

                      <div className="text-xs text-gray-500 text-center mt-4">
                        <div className="flex items-center justify-center mb-2">
                          <Clock className="w-4 h-4 mr-1" />
                          24-hour response guarantee
                        </div>
                        <Link href="/contact" className="text-emerald-600 hover:text-emerald-700 underline">
                          Need help? Contact our experts
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Why Choose AVES - Compact */}
              <Card className="mt-6 border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Star className="w-5 h-5 mr-2 text-emerald-600" />
                    Why Choose AVES?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="text-gray-700">Expert ornithologist guides</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="text-gray-700">Maximum 4 guests per tour</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="text-gray-700">100% carbon neutral</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="text-gray-700">Indigenous partnerships</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
