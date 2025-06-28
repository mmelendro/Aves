"use client"

import { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
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
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { LOCATION_OPTIONS, CONTACT_TOUR_TYPE_OPTIONS, EXPERIENCE_LEVELS } from "@/lib/form-options"
import { useSearchParams } from "next/navigation"
import { DatePicker } from "@/components/ui/date-picker"

// Helper function to get region information
const getRegionInfo = (location: string) => {
  const regionData: Record<
    string,
    {
      emoji: string
      name: string
      shortName: string
      description: string
      species: string
    }
  > = {
    "🏖️ Caribbean Coast": {
      emoji: "🏖️",
      name: "Caribbean Coast",
      shortName: "Caribbean",
      description: "Coastal wetlands, mangroves, and dry forests with unique Caribbean species.",
      species: "300+",
    },
    "🏔️ Sierra Nevada de Santa Marta": {
      emoji: "🏔️",
      name: "Sierra Nevada de Santa Marta",
      shortName: "SNSM",
      description: "World's most important endemic bird area with 15+ species found nowhere else.",
      species: "600+",
    },
    "🌊 Pacific Coast Chocó": {
      emoji: "🌊",
      name: "Pacific Coast Chocó",
      shortName: "Chocó",
      description: "One of the world's most biodiverse regions with spectacular endemic species.",
      species: "800+",
    },
    "⛰️ Western Andes": {
      emoji: "⛰️",
      name: "Western Andes",
      shortName: "W. Andes",
      description: "Cloud forests and montane ecosystems with incredible hummingbird diversity.",
      species: "500+",
    },
    "🏞️ Cauca Valley": {
      emoji: "🏞️",
      name: "Cauca Valley",
      shortName: "Cauca",
      description: "Inter-Andean valley with dry forests and agricultural landscapes.",
      species: "250+",
    },
    "🗻 Central Andes": {
      emoji: "🗻",
      name: "Central Andes",
      shortName: "C. Andes",
      description: "Coffee region with cloud forests and high-altitude páramo ecosystems.",
      species: "450+",
    },
    "🌄 Magdalena Valley": {
      emoji: "🌄",
      name: "Magdalena Valley",
      shortName: "Magdalena",
      description: "Major river valley with diverse habitats from wetlands to dry forests.",
      species: "400+",
    },
    "🏔️ Eastern Andes": {
      emoji: "🏔️",
      name: "Eastern Andes",
      shortName: "E. Andes",
      description: "High-altitude ecosystems including páramo and cloud forests near Bogotá.",
      species: "350+",
    },
    "🌾 Eastern Plains": {
      emoji: "🌾",
      name: "Eastern Plains",
      shortName: "Llanos",
      description: "Vast grasslands and gallery forests with unique grassland species.",
      species: "300+",
    },
    "🌳 Amazon Rainforest": {
      emoji: "🌳",
      name: "Amazon Rainforest",
      shortName: "Amazon",
      description: "World's largest rainforest with incredible biodiversity and canopy species.",
      species: "1000+",
    },
    "🌋 Colombian Massif": {
      emoji: "🌋",
      name: "Colombian Massif",
      shortName: "Massif",
      description: "High-altitude volcanic region where the Andes divide into three ranges.",
      species: "200+",
    },
    "🗺️ Multiple Regions": {
      emoji: "🗺️",
      name: "Multiple Regions",
      shortName: "Multi-Region",
      description: "Experience the best of Colombia across multiple biogeographic regions.",
      species: "500+",
    },
    "✨ Let AVES Choose": {
      emoji: "✨",
      name: "Let AVES Choose",
      shortName: "Expert Choice",
      description: "Let our experts design the perfect itinerary based on your interests.",
      species: "Custom",
    },
  }

  return (
    regionData[location] || {
      emoji: "🌍",
      name: location,
      shortName: location,
      description: "Explore this unique Colombian bioregion.",
      species: "Various",
    }
  )
}

// Helper function to add days to a date
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

// Helper function to calculate start and end dates for all tours
const calculateTourDates = (tours: TourSelection[], baseStartDate?: Date): TourSelection[] => {
  if (!baseStartDate || tours.length === 0) {
    return tours.map((tour) => ({ ...tour, startDate: undefined, endDate: undefined }))
  }

  let currentStartDate = new Date(baseStartDate)

  return tours.map((tour, index) => {
    // Set start date for current tour
    const startDate = new Date(currentStartDate)

    // Calculate end date (tour duration - 1 because start day is included)
    const endDate = addDays(startDate, tour.totalDays - 1)

    // Calculate next tour's start date if there is a next tour
    if (index < tours.length - 1) {
      const nextTour = tours[index + 1]
      // Next tour starts after current tour ends + 1 day + rest days
      currentStartDate = addDays(endDate, 1 + nextTour.restDays)
    }

    return {
      ...tour,
      startDate: startDate,
      endDate: endDate,
    }
  })
}

// Helper function to format date ranges
const formatDateRange = (startDate: Date, endDate: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  }

  const start = startDate.toLocaleDateString("en-US", options)
  const end = endDate.toLocaleDateString("en-US", options)

  // If same month and year, show abbreviated format
  if (startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()) {
    const startDay = startDate.getDate()
    const endDay = endDate.getDate()
    const monthYear = startDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })
    return `${startDay}-${endDay} ${monthYear}`
  }

  return `${start} - ${end}`
}

// Helper function to calculate total trip duration
const calculateTotalTripDuration = (
  tours: TourSelection[],
): { startDate?: Date; endDate?: Date; totalDays: number } => {
  if (tours.length === 0 || !tours[0]?.startDate) {
    return { totalDays: 0 }
  }

  const firstTour = tours[0]
  const lastTour = tours[tours.length - 1]

  if (!firstTour.startDate || !lastTour.endDate) {
    return { totalDays: 0 }
  }

  const startDate = firstTour.startDate
  const endDate = lastTour.endDate

  // Calculate total days including rest days
  const timeDiff = endDate.getTime() - startDate.getTime()
  const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1 // +1 because end date is inclusive

  return { startDate, endDate, totalDays }
}

// Helper function to get minimum booking date (1 month from now)
const getMinimumBookingDate = (): Date => {
  const today = new Date()
  const oneMonthFromNow = new Date(today)
  oneMonthFromNow.setMonth(today.getMonth() + 1)
  return oneMonthFromNow
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

export default function ShoppingPage() {
  const searchParams = useSearchParams()
  const preselectedTourType = searchParams.get("preset") || searchParams.get("tour")
  const preselectedRegion = searchParams.get("region") || searchParams.get("bioregion")
  const fromPage = searchParams.get("from")

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
  const [dateValidationError, setDateValidationError] = useState<string>("")

  // Initialize tour selections based on URL parameters
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

    // Show notification if parameters were pre-filled
    if (preselectedTourType || preselectedRegion) {
      setPrefilledInfo({
        tourType: preselectedTourType || undefined,
        region: preselectedRegion || undefined,
        fromPage: fromPage || undefined,
      })
      setShowPrefilledNotification(true)

      // Auto-hide notification after 8 seconds
      setTimeout(() => {
        setShowPrefilledNotification(false)
      }, 8000)
    }
  }, [preselectedTourType, preselectedRegion, fromPage])

  const addTourSelection = useCallback(() => {
    if (tourSelections.length < 4) {
      const newTour: TourSelection = {
        id: Date.now().toString(),
        tourType: "🍃 Adventure Tours",
        bioregion: "🗻 Central Andes",
        participants: tourSelections[0]?.participants || 2,
        totalDays: 8,
        restDays: 2, // Suggest 2-day rest for additional tours
      }

      const updatedSelections = [...tourSelections, newTour]

      // Recalculate dates if first tour has a start date
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

        // Recalculate dates if first tour has a start date
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

          // Auto-suggest rest days when tour duration is 8+ days and it's not the first tour
          if (field === "totalDays" && value >= 8 && tourSelections.findIndex((t) => t.id === id) > 0) {
            updatedTour.restDays = Math.max(updatedTour.restDays, 2)
          }

          return updatedTour
        }
        return tour
      })

      // Recalculate dates if the first tour's start date exists
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

      // Recalculate dates if first tour has a start date
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

  const calculateTotalCost = useCallback(() => {
    let totalCost = 0
    let totalDays = 0

    const basePrices = {
      "🍃 Adventure Tours": 1000,
      "🪶 Vision Tours": 1400,
      "🌼 Elevate Tours": 1200,
      "🍓 Souls Tours": 1600,
      "Custom Itinerary": 1100,
      "Not sure yet": 1000,
    }

    tourSelections.forEach((tour) => {
      const pricePerDay = basePrices[tour.tourType as keyof typeof basePrices] || 1000

      // Calculate tour cost: price per day × days × participants
      const tourCost = pricePerDay * tour.totalDays * tour.participants

      // Add rest days cost (same rate as tour days)
      const restCost = tour.restDays > 0 ? pricePerDay * tour.restDays * tour.participants : 0

      totalCost += tourCost + restCost
      totalDays += tour.totalDays + tour.restDays
    })

    const depositAmount = Math.round(totalCost * 0.3)
    const finalPayment = totalCost - depositAmount

    return {
      totalCost,
      totalDays,
      depositAmount,
      finalPayment,
      participants: tourSelections[0]?.participants || 2,
    }
  }, [tourSelections])

  const costBreakdown = calculateTotalCost()
  const tripDuration = calculateTotalTripDuration(tourSelections)

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

  const updateStartDate = useCallback(
    (date: Date | undefined) => {
      setDateValidationError("")

      if (!date) {
        // Clear all dates if no start date is selected
        setTourSelections(
          tourSelections.map((tour) => ({
            ...tour,
            startDate: undefined,
            endDate: undefined,
          })),
        )
        return
      }

      // Validate that the date is at least 1 month from now
      const minimumDate = getMinimumBookingDate()
      if (date < minimumDate) {
        setDateValidationError(
          `Tours must be booked at least 1 month in advance. Please select a date on or after ${minimumDate.toLocaleDateString(
            "en-US",
            {
              month: "long",
              day: "numeric",
              year: "numeric",
            },
          )}.`,
        )
        return
      }

      const recalculatedTours = calculateTourDates(tourSelections, date)
      setTourSelections(recalculatedTours)
    },
    [tourSelections],
  )

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
  .map(
    (tour, index) =>
      `Tour ${index + 1}: ${tour.tourType}
Bioregion: ${tour.bioregion}
Participants: ${tour.participants}
Duration: ${tour.totalDays} days${tour.restDays > 0 ? ` + ${tour.restDays} rest days` : ""}
${tour.startDate && tour.endDate ? `Tour Dates: ${formatDateRange(tour.startDate, tour.endDate)}` : "Tour Dates: To be determined"}`,
  )
  .join("\n\n")}

BOOKING SUMMARY:
Total Cost: $${costBreakdown.totalCost.toLocaleString()}
Total Duration: ${costBreakdown.totalDays} days
Participants: ${costBreakdown.participants}
${tripDuration.startDate && tripDuration.endDate ? `Complete Trip: ${formatDateRange(tripDuration.startDate, tripDuration.endDate)}` : "Trip Dates: To be determined"}
${tripDuration.totalDays > 0 ? `Total Trip Duration: ${tripDuration.totalDays} days` : ""}

${questions ? `SPECIAL REQUESTS:\n${questions}` : ""}

I look forward to hearing from you within 24 hours as mentioned on your website.

Best regards,
${contactInfo.firstName} ${contactInfo.lastName}`)

    return `mailto:info@aves.com?subject=${subject}&body=${body}`
  }, [tourSelections, contactInfo, questions, costBreakdown, tripDuration])

  const getPrefilledMessage = () => {
    const tourTypeName = prefilledInfo.tourType
    const regionName = prefilledInfo.region ? getRegionInfo(prefilledInfo.region).name : null

    let message = "Great choice! We've pre-filled your selections"

    if (tourTypeName && regionName) {
      message += ` with ${tourTypeName} for ${regionName}`
    } else if (tourTypeName) {
      message += ` with ${tourTypeName}`
    } else if (regionName) {
      message += ` for ${regionName}`
    }

    if (prefilledInfo.fromPage) {
      message += ` based on your interest`
    }

    message += ". You can customize everything below!"

    return message
  }

  const dismissNotification = () => {
    setShowPrefilledNotification(false)
  }

  const dismissDateError = () => {
    setDateValidationError("")
  }

  const minimumBookingDate = getMinimumBookingDate()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <NavigationHeader currentPage="/shopping" />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4">Build Your Adventure</Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Plan Your Colombian Birding Journey</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create your perfect multi-tour birding experience across Colombia's diverse bioregions. Our experts will
            help you design the ultimate adventure with optimal rest periods between tours.
          </p>
        </div>
      </section>

      {/* Pre-filled Notification */}
      {showPrefilledNotification && (
        <section className="py-4">
          <div className="container mx-auto px-4">
            <Alert className="border-emerald-200 bg-emerald-50">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <AlertDescription className="text-emerald-800 pr-8">{getPrefilledMessage()}</AlertDescription>
              <Button
                variant="ghost"
                size="sm"
                onClick={dismissNotification}
                className="absolute right-2 top-2 h-6 w-6 p-0 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </Alert>
          </div>
        </section>
      )}

      {/* Date Validation Error */}
      {dateValidationError && (
        <section className="py-4">
          <div className="container mx-auto px-4">
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 pr-8">{dateValidationError}</AlertDescription>
              <Button
                variant="ghost"
                size="sm"
                onClick={dismissDateError}
                className="absolute right-2 top-2 h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </Alert>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Tour Builder */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Build Your Multi-Tour Adventure</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Design your perfect Colombian birding experience by combining multiple tours across different
                  bioregions. We recommend 8-day tours with 2-day rest periods for optimal wildlife viewing and
                  recovery.
                </p>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 mb-8">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                      <Info className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-blue-800 mb-2">Expert Recommendations</h4>
                      <ul className="text-blue-700 space-y-1 text-sm">
                        <li>• 8-day tours provide optimal species diversity and cultural immersion</li>
                        <li>• 2-day rest periods between tours help with travel and acclimatization</li>
                        <li>• Maximum 4 participants per tour ensures personalized attention</li>
                        <li>• Combine different bioregions for maximum species variety</li>
                        <li>• Tours must be booked at least 1 month in advance for proper planning</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tour Selections */}
              <div className="space-y-6">
                {tourSelections.map((tour, index) => (
                  <Card key={tour.id} className="border-2 border-emerald-200 shadow-lg">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl flex items-center gap-3">
                          <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold">
                            Tour {index + 1}
                          </span>
                          {tour.restDays > 0 && (
                            <Badge variant="outline" className="border-amber-300 text-amber-700">
                              +{tour.restDays} rest days
                            </Badge>
                          )}
                          {index === 0 && (prefilledInfo.tourType || prefilledInfo.region) && (
                            <Badge className="bg-blue-100 text-blue-800">Pre-selected</Badge>
                          )}
                        </CardTitle>
                        {tourSelections.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTourSelection(tour.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Tour Type Selection */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="block text-sm font-medium text-gray-700">Tour Type * (select one)</label>
                          <Link
                            href="/tours"
                            className="text-xs text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View All Tours
                          </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {CONTACT_TOUR_TYPE_OPTIONS.map((tourType) => (
                            <label
                              key={tourType}
                              className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
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
                                onChange={(e) => updateTourSelection(tour.id, "tourType", e.target.value)}
                                className="sr-only"
                              />
                              <div
                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                  tour.tourType === tourType ? "border-emerald-500 bg-emerald-500" : "border-gray-300"
                                }`}
                              >
                                {tour.tourType === tourType && <div className="w-2 h-2 bg-white rounded-full" />}
                              </div>
                              <span className="text-sm font-medium text-gray-700">{tourType}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Bioregion Selection */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Preferred Biogeographic Region *
                          </label>
                          <div className="flex items-center gap-2">
                            <Link
                              href="/avifauna-explorer#bioregions-map"
                              className="text-xs text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1"
                            >
                              <Map className="w-3 h-3" />
                              Interactive Map
                            </Link>
                            <span className="text-gray-300">|</span>
                            <Link
                              href="/endemic-birds"
                              className="text-xs text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
                            >
                              <Bird className="w-3 h-3" />
                              Endemic Species
                            </Link>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {LOCATION_OPTIONS.filter(
                            (location) =>
                              location === tour.bioregion || !tourSelections.some((t) => t.bioregion === location),
                          ).map((location) => {
                            const isSelected = tour.bioregion === location
                            const regionInfo = getRegionInfo(location)

                            return (
                              <div
                                key={location}
                                onClick={() => updateTourSelection(tour.id, "bioregion", location)}
                                className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                                  isSelected
                                    ? "border-emerald-500 bg-emerald-50 shadow-md"
                                    : "border-gray-200 hover:border-emerald-300 bg-white"
                                }`}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <span className="text-lg">{regionInfo.emoji}</span>
                                      <h4
                                        className={`font-medium text-sm ${
                                          isSelected ? "text-emerald-800" : "text-gray-800"
                                        }`}
                                      >
                                        {regionInfo.name}
                                      </h4>
                                    </div>
                                    <p
                                      className={`text-xs leading-relaxed mb-2 ${
                                        isSelected ? "text-emerald-700" : "text-gray-600"
                                      }`}
                                    >
                                      {regionInfo.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                      <span
                                        className={`text-xs font-medium ${
                                          isSelected ? "text-emerald-600" : "text-gray-500"
                                        }`}
                                      >
                                        {regionInfo.species} species
                                      </span>
                                    </div>
                                  </div>
                                  <div
                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
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

                      {/* Participants (applies to all tours) */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Number of Participants * (applies to all tours)
                        </label>
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 text-gray-900 hover:bg-gray-50 bg-transparent"
                            onClick={() => {
                              const newCount = Math.max(1, tour.participants - 1)
                              updateAllParticipants(newCount)
                            }}
                            disabled={tour.participants <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="px-4 py-2 border rounded-md min-w-[80px] text-center bg-white font-medium">
                            {tour.participants} {tour.participants === 1 ? "person" : "people"}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 text-gray-900 hover:bg-gray-50 bg-transparent"
                            onClick={() => {
                              const newCount = Math.min(4, tour.participants + 1)
                              updateAllParticipants(newCount)
                            }}
                            disabled={tour.participants >= 4}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Maximum 4 participants per tour for personalized experience
                        </p>
                      </div>

                      {/* Tour Duration */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Tour Duration *
                          <Badge variant="secondary" className="ml-2">
                            8 days recommended
                          </Badge>
                        </label>
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 text-gray-900 hover:bg-gray-50 bg-transparent"
                            onClick={() => updateTourSelection(tour.id, "totalDays", Math.max(3, tour.totalDays - 1))}
                            disabled={tour.totalDays <= 3}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="px-4 py-2 border rounded-md min-w-[100px] text-center bg-white font-medium">
                            {tour.totalDays} days
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 text-gray-900 hover:bg-gray-50 bg-transparent"
                            onClick={() => updateTourSelection(tour.id, "totalDays", Math.min(14, tour.totalDays + 1))}
                            disabled={tour.totalDays >= 14}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          3-14 days available • 8 days optimal for species diversity and cultural immersion
                        </p>
                      </div>

                      {/* Start Date Selection (only for first tour) */}
                      {index === 0 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            <Calendar className="w-4 h-4 inline mr-2" />
                            Tour Start Date *
                          </label>
                          <DatePicker
                            date={tour.startDate}
                            onDateChange={updateStartDate}
                            placeholder="Select your tour start date"
                            className="w-full"
                            minDate={minimumBookingDate}
                          />
                          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                            <div className="flex items-start space-x-2">
                              <Clock className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                              <div className="text-sm text-amber-800">
                                <p className="font-medium mb-1">Advance Booking Required</p>
                                <p>
                                  Tours must be booked at least 1 month in advance to ensure proper planning and
                                  coordination. Earliest available date:{" "}
                                  <span className="font-medium">
                                    {minimumBookingDate.toLocaleDateString("en-US", {
                                      weekday: "long",
                                      month: "long",
                                      day: "numeric",
                                      year: "numeric",
                                    })}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            Start dates for subsequent tours will be calculated automatically based on tour duration and
                            rest days
                          </p>
                        </div>
                      )}

                      {/* Calculated Start Date and Date Range (for all tours when start date is set) */}
                      {tour.startDate && tour.endDate && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            <Calendar className="w-4 h-4 inline mr-2" />
                            {index === 0 ? "Tour Schedule" : "Calculated Tour Schedule"}
                          </label>
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-blue-800">Start Date:</span>
                                <span className="text-sm text-blue-700">
                                  {tour.startDate.toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-blue-800">End Date:</span>
                                <span className="text-sm text-blue-700">
                                  {tour.endDate.toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                              <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                                <span className="text-sm font-bold text-blue-800">Date Range:</span>
                                <span className="text-sm font-bold text-blue-700">
                                  {formatDateRange(tour.startDate, tour.endDate)}
                                </span>
                              </div>
                            </div>
                          </div>
                          {index > 0 && (
                            <p className="text-xs text-gray-500 mt-2">
                              Automatically calculated: Previous tour ends on{" "}
                              {tourSelections[index - 1]?.endDate?.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}{" "}
                              + {tour.restDays} rest day{tour.restDays !== 1 ? "s" : ""} = starts{" "}
                              {tour.startDate.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Rest Days (for tours after the first) */}
                      {index > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Rest Days Before This Tour
                            <Badge variant="secondary" className="ml-2">
                              2 days recommended
                            </Badge>
                          </label>
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-300 text-gray-900 hover:bg-gray-50 bg-transparent"
                              onClick={() => updateTourSelection(tour.id, "restDays", Math.max(0, tour.restDays - 1))}
                              disabled={tour.restDays <= 0}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="px-4 py-2 border rounded-md min-w-[100px] text-center bg-white font-medium">
                              {tour.restDays} days
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-300 text-gray-900 hover:bg-gray-50 bg-transparent"
                              onClick={() => updateTourSelection(tour.id, "restDays", Math.min(5, tour.restDays + 1))}
                              disabled={tour.restDays >= 5}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            Rest days for travel, acclimatization, and relaxation between bioregions. Changing this will
                            automatically adjust subsequent tour start dates.
                          </p>
                        </div>
                      )}

                      {/* Tour Cost Preview */}
                      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-4 border border-emerald-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900">Tour {index + 1} Cost:</span>
                          <span className="text-xl font-bold text-emerald-600">
                            ${(() => {
                              const basePrices = {
                                "🍃 Adventure Tours": 1000,
                                "🪶 Vision Tours": 1400,
                                "🌼 Elevate Tours": 1200,
                                "🍓 Souls Tours": 1600,
                                "Custom Itinerary": 1100,
                                "Not sure yet": 1000,
                              }
                              const pricePerDay = basePrices[tour.tourType as keyof typeof basePrices] || 1000
                              const tourCost = pricePerDay * tour.totalDays * tour.participants
                              const restCost = tour.restDays > 0 ? pricePerDay * tour.restDays * tour.participants : 0
                              return (tourCost + restCost).toLocaleString()
                            })()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          ${(() => {
                            const basePrices = {
                              "🍃 Adventure Tours": 1000,
                              "🪶 Vision Tours": 1400,
                              "🌼 Elevate Tours": 1200,
                              "🍓 Souls Tours": 1600,
                              "Custom Itinerary": 1100,
                              "Not sure yet": 1000,
                            }
                            return (basePrices[tour.tourType as keyof typeof basePrices] || 1000).toLocaleString()
                          })()} /person/day × {tour.totalDays} days × {tour.participants} participant
                          {tour.participants > 1 ? "s" : ""}
                          {tour.restDays > 0 && ` + ${tour.restDays} rest days`}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Add Tour Button */}
                {tourSelections.length < 4 && (
                  <Card className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 transition-colors bg-emerald-50/30">
                    <CardContent className="flex items-center justify-center py-12">
                      <Button
                        onClick={addTourSelection}
                        variant="ghost"
                        className="text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 text-lg px-8 py-4"
                      >
                        <Plus className="w-6 h-6 mr-3" />
                        Add Another Tour (Max 4 Total)
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Contact Information */}
              <Card className="border-2 border-blue-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                  <p className="text-gray-600">Provide your details so we can create your personalized itinerary</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <Input
                        value={contactInfo.firstName}
                        onChange={(e) => setContactInfo({ ...contactInfo, firstName: e.target.value })}
                        placeholder="Your first name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <Input
                        value={contactInfo.lastName}
                        onChange={(e) => setContactInfo({ ...contactInfo, lastName: e.target.value })}
                        placeholder="Your last name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <Input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone (Optional)</label>
                      <Input
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Travel Date</label>
                      <Input
                        type="date"
                        value={contactInfo.travelDate}
                        onChange={(e) => setContactInfo({ ...contactInfo, travelDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                    <select
                      value={contactInfo.experienceLevel}
                      onChange={(e) => setContactInfo({ ...contactInfo, experienceLevel: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
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

              {/* Questions Section */}
              <Card className="border-2 border-purple-200 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Questions & Special Requests</CardTitle>
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
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </CardContent>
                )}
              </Card>
            </div>

            {/* Sidebar - Booking Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-2 border-emerald-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Calculator className="w-6 h-6 mr-3 text-emerald-600" />
                    Booking Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Overall Trip Dates */}
                  {tripDuration.startDate && tripDuration.endDate && (
                    <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-4 border border-emerald-200">
                      <h4 className="font-semibold text-emerald-800 mb-3 flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Complete Trip Overview
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-emerald-700">Trip Dates:</span>
                          <span className="font-medium text-emerald-800">
                            {formatDateRange(tripDuration.startDate, tripDuration.endDate)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-emerald-700">Total Duration:</span>
                          <span className="font-medium text-emerald-800">{tripDuration.totalDays} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-emerald-700">Start Date:</span>
                          <span className="font-medium text-emerald-800">
                            {tripDuration.startDate.toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-emerald-700">End Date:</span>
                          <span className="font-medium text-emerald-800">
                            {tripDuration.endDate.toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tours Summary */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 border-b pb-2">Your Selected Tours:</h4>
                    {tourSelections.map((tour, index) => (
                      <div key={tour.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="font-medium text-gray-900 text-sm mb-1">
                          Tour {index + 1}: {tour.tourType}
                        </div>
                        <div className="text-gray-600 text-sm">{getRegionInfo(tour.bioregion).name}</div>
                        <div className="text-gray-600 text-sm">
                          {tour.totalDays} days {tour.restDays > 0 && `+ ${tour.restDays} rest days`}
                        </div>
                        {tour.startDate && tour.endDate && (
                          <div className="space-y-1 mt-2">
                            <div className="text-blue-600 text-sm font-medium">
                              {formatDateRange(tour.startDate, tour.endDate)}
                            </div>
                            <div className="text-xs text-gray-500">
                              Start: {tour.startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} •
                              End: {tour.endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Tours:</span>
                      <span className="font-medium">{tourSelections.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Participants:</span>
                      <span className="font-medium">{costBreakdown.participants}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Days:</span>
                      <span className="font-medium">{costBreakdown.totalDays} days</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold text-gray-900">Total Cost</span>
                      <span className="text-3xl font-bold text-emerald-600">
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
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-base py-4">
                          <Mail className="mr-2 w-5 h-5" />
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
                                text: `Check out my ${tourSelections.length}-tour Colombian birding adventure for $${costBreakdown.totalCost.toLocaleString()}!`,
                                url: window.location.href,
                              })
                            } else {
                              navigator.clipboard.writeText(window.location.href)
                              alert("Link copied to clipboard!")
                            }
                          }}
                          className="border-gray-300 text-gray-900 hover:bg-gray-50 bg-transparent"
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
                          Need help? Contact our birding experts
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Why Choose AVES */}
              <Card className="mt-6 border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg">Why Choose AVES?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Expert ornithologist guides with deep local knowledge</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Maximum 4 guests per tour for personalized attention</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">100% carbon neutral with conservation impact</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Authentic partnerships with indigenous communities</span>
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
