"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  Minus,
  Calendar,
  Users,
  MapPin,
  Calculator,
  CreditCard,
  Save,
  Mail,
  Share2,
  MessageCircle,
  Trash2,
  Info,
} from "lucide-react"
import Link from "next/link"
import { NavigationHeader } from "@/components/navigation-header"

const tourTypes = {
  adventure: {
    name: "🍃 AVES Adventure",
    description: "Classic birding expeditions across Colombia's prime hotspots",
    pricePerDay: 1000,
    color: "emerald",
  },
  vision: {
    name: "🪶 AVES Vision",
    description: "Photography workshops with professional wildlife photographers",
    pricePerDay: 1250,
    color: "purple",
  },
  elevate: {
    name: "🌼 AVES Elevate",
    description: "Premium expeditions with luxury amenities",
    pricePerDay: 1500,
    color: "yellow",
  },
  souls: {
    name: "🍓 AVES Souls",
    description: "Romantic retreats for couples",
    pricePerDay: 1750,
    color: "red",
  },
}

const bioregions = [
  { id: "western-andes", name: "Quetzal Highlands", subtitle: "Western Andes", suggestedDays: 8 },
  { id: "central-andes", name: "Hummingbird Haven", subtitle: "Central Andes", suggestedDays: 8 },
  { id: "eastern-andes", name: "Páramo Paradise", subtitle: "Eastern Andes", suggestedDays: 8 },
  { id: "llanos", name: "Wetland Wonders", subtitle: "Llanos", suggestedDays: 8 },
  { id: "amazon", name: "Canopy Kingdom", subtitle: "Amazon", suggestedDays: 8 },
  { id: "choco", name: "Endemic Empire", subtitle: "Biogeographic Chocó", suggestedDays: 8 },
  { id: "caribbean", name: "Coastal Crown", subtitle: "Caribbean + Sierra Nevada", suggestedDays: 8 },
  { id: "cauca-valley", name: "Valley Voyager", subtitle: "Cauca Valley", suggestedDays: 8 },
  { id: "magdalena-valley", name: "River Realm", subtitle: "Magdalena Valley", suggestedDays: 8 },
  { id: "macizo", name: "Massif Majesty", subtitle: "Macizo Colombiano", suggestedDays: 8 },
]

interface TourSelection {
  id: string
  tourType: string
  bioregion: string
  participants: number
  totalDays: number
  breakDays: number
}

export default function ShoppingPage() {
  const [tourSelections, setTourSelections] = useState<TourSelection[]>([
    {
      id: "1",
      tourType: "adventure",
      bioregion: "western-andes",
      participants: 2,
      totalDays: 8,
      breakDays: 0,
    },
  ])
  const [showQuestions, setShowQuestions] = useState(false)
  const [questions, setQuestions] = useState("")
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [savedBooking, setSavedBooking] = useState(false)

  const addTourSelection = () => {
    if (tourSelections.length < 4) {
      const newTour: TourSelection = {
        id: Date.now().toString(),
        tourType: "adventure",
        bioregion: "central-andes",
        participants: tourSelections[0]?.participants || 2,
        totalDays: 8,
        breakDays: 2, // Suggest 2-day break for additional tours
      }
      setTourSelections([...tourSelections, newTour])
    }
  }

  const removeTourSelection = (id: string) => {
    if (tourSelections.length > 1) {
      setTourSelections(tourSelections.filter((tour) => tour.id !== id))
    }
  }

  const updateTourSelection = (id: string, field: keyof TourSelection, value: any) => {
    setTourSelections(tourSelections.map((tour) => (tour.id === id ? { ...tour, [field]: value } : tour)))
  }

  const calculateTotalCost = () => {
    let totalCost = 0
    let totalDays = 0

    tourSelections.forEach((tour) => {
      const tourType = tourTypes[tour.tourType as keyof typeof tourTypes]
      // Calculate cost: price per day × days × participants
      const tourCost = tourType.pricePerDay * tour.totalDays * tour.participants

      // Add break days cost (same rate as tour days)
      const breakCost = tour.breakDays > 0 ? tourType.pricePerDay * tour.breakDays * tour.participants : 0

      totalCost += tourCost + breakCost
      totalDays += tour.totalDays + tour.breakDays
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
  }

  const costBreakdown = calculateTotalCost()

  const saveBooking = () => {
    const bookingData = {
      tours: tourSelections,
      contactInfo,
      questions,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("aves-booking", JSON.stringify(bookingData))
    setSavedBooking(true)
    setTimeout(() => setSavedBooking(false), 3000)
  }

  const emailBooking = () => {
    const subject = `AVES Booking Inquiry - ${tourSelections.length} Tour${tourSelections.length > 1 ? "s" : ""}`
    const body = `
Hello AVES Team,

I'm interested in booking the following tour${tourSelections.length > 1 ? "s" : ""}:

${tourSelections
  .map(
    (tour, index) =>
      `Tour ${index + 1}: ${tourTypes[tour.tourType as keyof typeof tourTypes].name}
Bioregion: ${bioregions.find((b) => b.id === tour.bioregion)?.name}
Participants: ${tour.participants}
Duration: ${tour.totalDays} days${tour.breakDays > 0 ? ` + ${tour.breakDays} break days` : ""}`,
  )
  .join("\n\n")}

Total Cost: $${costBreakdown.totalCost.toLocaleString()}
Total Duration: ${costBreakdown.totalDays} days

Contact Information:
Name: ${contactInfo.name}
Email: ${contactInfo.email}
Phone: ${contactInfo.phone}

${questions ? `Additional Questions:\n${questions}` : ""}

Looking forward to hearing from you!
    `.trim()

    window.location.href = `mailto:info@aves.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const shareBooking = async () => {
    const shareData = {
      title: "AVES Birdwatching Tour Booking",
      text: `Check out my Colombian birding adventure booking: ${tourSelections.length} tour${
        tourSelections.length > 1 ? "s" : ""
      } for $${costBreakdown.totalCost.toLocaleString()}`,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`)
      alert("Booking details copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Unified Navigation Header */}
      <NavigationHeader currentPage="/shopping" />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Build Your Colombian Adventure</h1>
              <p className="text-gray-600 mb-4">
                Create your perfect birding experience by combining up to 4 tours across different bioregions. We
                recommend 8-day tours with 2-day breaks between regions, but you can customize the duration to fit your
                schedule.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  Max 4 participants
                </span>
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Max 4 bioregions
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Flexible duration
                </span>
              </div>
            </div>

            {/* Tour Selections */}
            <div className="space-y-6">
              {tourSelections.map((tour, index) => (
                <Card key={tour.id} className="border-2 border-dashed border-gray-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        Tour {index + 1}
                        {tour.breakDays > 0 && (
                          <Badge variant="outline" className="ml-2">
                            +{tour.breakDays} break days
                          </Badge>
                        )}
                      </CardTitle>
                      {tourSelections.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTourSelection(tour.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Tour Type Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Tour Type</label>
                      <div className="grid md:grid-cols-2 gap-3">
                        {Object.entries(tourTypes).map(([key, type]) => (
                          <label
                            key={key}
                            className={`relative flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                              tour.tourType === key
                                ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200"
                                : "border-gray-200"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`tourType-${tour.id}`}
                              value={key}
                              checked={tour.tourType === key}
                              onChange={(e) => updateTourSelection(tour.id, "tourType", e.target.value)}
                              className="sr-only"
                            />
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{type.name}</div>
                              <div className="text-sm text-gray-600">
                                ${type.pricePerDay.toLocaleString()}/person/day
                              </div>
                              <div className="text-xs text-gray-500 mt-1">{type.description}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Bioregion Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Bioregion</label>
                      <select
                        value={tour.bioregion}
                        onChange={(e) => updateTourSelection(tour.id, "bioregion", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        {bioregions
                          .filter(
                            (region) =>
                              region.id === tour.bioregion || !tourSelections.some((t) => t.bioregion === region.id),
                          )
                          .map((region) => (
                            <option key={region.id} value={region.id}>
                              {region.name} - {region.subtitle}
                            </option>
                          ))}
                      </select>
                    </div>

                    {/* Participants */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Number of Participants (applies to all tours)
                      </label>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-300 text-gray-900 hover:bg-gray-50"
                          onClick={() => {
                            const newCount = Math.max(1, tour.participants - 1)
                            tourSelections.forEach((t) => updateTourSelection(t.id, "participants", newCount))
                          }}
                          disabled={tour.participants <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="px-4 py-2 border rounded-md min-w-[60px] text-center bg-white">
                          {tour.participants}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-300 text-gray-900 hover:bg-gray-50"
                          onClick={() => {
                            const newCount = Math.min(4, tour.participants + 1)
                            tourSelections.forEach((t) => updateTourSelection(t.id, "participants", newCount))
                          }}
                          disabled={tour.participants >= 4}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Duration */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Tour Duration
                        <Badge variant="secondary" className="ml-2">
                          8 days recommended
                        </Badge>
                      </label>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-300 text-gray-900 hover:bg-gray-50"
                          onClick={() => updateTourSelection(tour.id, "totalDays", Math.max(3, tour.totalDays - 1))}
                          disabled={tour.totalDays <= 3}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="px-4 py-2 border rounded-md min-w-[80px] text-center bg-white">
                          {tour.totalDays} days
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-300 text-gray-900 hover:bg-gray-50"
                          onClick={() => updateTourSelection(tour.id, "totalDays", Math.min(14, tour.totalDays + 1))}
                          disabled={tour.totalDays >= 14}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Pricing: ${tourTypes[tour.tourType as keyof typeof tourTypes].pricePerDay.toLocaleString()}
                        /person/day (3-14 days available)
                      </p>
                    </div>

                    {/* Break Days (for tours after the first) */}
                    {index > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Break Days Before This Tour
                          <Badge variant="secondary" className="ml-2">
                            2 days recommended
                          </Badge>
                        </label>
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 text-gray-900 hover:bg-gray-50"
                            onClick={() => updateTourSelection(tour.id, "breakDays", Math.max(0, tour.breakDays - 1))}
                            disabled={tour.breakDays <= 0}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="px-4 py-2 border rounded-md min-w-[80px] text-center bg-white">
                            {tour.breakDays} days
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 text-gray-900 hover:bg-gray-50"
                            onClick={() => updateTourSelection(tour.id, "breakDays", Math.min(5, tour.breakDays + 1))}
                            disabled={tour.breakDays >= 5}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Rest days between bioregions for travel and relaxation
                        </p>
                      </div>
                    )}

                    {/* Tour Cost Preview */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Tour {index + 1} Cost:</span>
                        <span className="text-lg font-bold text-emerald-600">
                          ${(() => {
                            const tourType = tourTypes[tour.tourType as keyof typeof tourTypes]
                            const tourCost = tourType.pricePerDay * tour.totalDays * tour.participants
                            const breakCost =
                              tour.breakDays > 0 ? tourType.pricePerDay * tour.breakDays * tour.participants : 0
                            return (tourCost + breakCost).toLocaleString()
                          })()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        ${tourTypes[tour.tourType as keyof typeof tourTypes].pricePerDay.toLocaleString()}/person/day ×{" "}
                        {tour.totalDays} days × {tour.participants} participant{tour.participants > 1 ? "s" : ""}
                        {tour.breakDays > 0 && ` + ${tour.breakDays} break days`}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add Tour Button */}
              {tourSelections.length < 4 && (
                <Card className="border-2 border-dashed border-gray-300 hover:border-emerald-500 transition-colors">
                  <CardContent className="flex items-center justify-center py-12">
                    <Button
                      onClick={addTourSelection}
                      variant="ghost"
                      className="text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add Another Tour (Max 4)
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <Input
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <Input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone (Optional)</label>
                  <Input
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Questions Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Questions & Special Requests</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowQuestions(!showQuestions)}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {showQuestions ? "Hide" : "Add Questions"}
                  </Button>
                </div>
              </CardHeader>
              {showQuestions && (
                <CardContent>
                  <Textarea
                    value={questions}
                    onChange={(e) => setQuestions(e.target.value)}
                    placeholder="Any questions about the tours, dietary restrictions, accessibility needs, or special requests..."
                    rows={4}
                  />
                </CardContent>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Tours Summary */}
                <div className="space-y-3">
                  {tourSelections.map((tour, index) => (
                    <div key={tour.id} className="text-sm">
                      <div className="font-medium text-gray-900">
                        {tourTypes[tour.tourType as keyof typeof tourTypes].name}
                      </div>
                      <div className="text-gray-600">{bioregions.find((b) => b.id === tour.bioregion)?.name}</div>
                      <div className="text-gray-600">
                        {tour.totalDays} days {tour.breakDays > 0 && `+ ${tour.breakDays} break days`}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Tours:</span>
                    <span>{tourSelections.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Participants:</span>
                    <span>{costBreakdown.participants}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Days:</span>
                    <span>{costBreakdown.totalDays} days</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold">Total Cost</span>
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
                    <Link href="/checkout">
                      <Button
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                        disabled={!contactInfo.name || !contactInfo.email}
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pay Deposit (${costBreakdown.depositAmount.toLocaleString()})
                      </Button>
                    </Link>

                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={saveBooking}
                        className="border-gray-300 text-gray-900 hover:bg-gray-50"
                      >
                        <Save className="w-4 h-4" />
                        {savedBooking ? "Saved!" : "Save"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={emailBooking}
                        className="border-gray-300 text-gray-900 hover:bg-gray-50"
                      >
                        <Mail className="w-4 h-4" />
                        Email
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={shareBooking}
                        className="border-gray-300 text-gray-900 hover:bg-gray-50"
                      >
                        <Share2 className="w-4 h-4" />
                        Share
                      </Button>
                    </div>

                    <div className="text-xs text-gray-500 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Info className="w-4 h-4 mr-1" />
                        Need help?
                      </div>
                      <Link href="/contact" className="text-emerald-600 hover:text-emerald-700 underline">
                        Contact our team for custom itineraries
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AVES Colombia</h3>
              <p className="text-gray-400 text-sm">
                Authentic bird watching and eco-tourism experiences across Colombia's diverse ecosystems.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Tours</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/tours/adventure" className="hover:text-white transition-colors">
                    AVES Adventure
                  </Link>
                </li>
                <li>
                  <Link href="/tours/vision" className="hover:text-white transition-colors">
                    AVES Vision
                  </Link>
                </li>
                <li>
                  <Link href="/tours/elevate" className="hover:text-white transition-colors">
                    AVES Elevate
                  </Link>
                </li>
                <li>
                  <Link href="/tours/souls" className="hover:text-white transition-colors">
                    AVES Souls
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="hover:text-white transition-colors">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="/about/partners" className="hover:text-white transition-colors">
                    Our Partners
                  </Link>
                </li>
                <li>
                  <Link href="/about/b-corp" className="hover:text-white transition-colors">
                    B Corp Journey
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-white transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 AVES Colombia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
