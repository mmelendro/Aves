"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, ArrowLeft, CheckCircle, Calendar, Users, CreditCard, Shield } from "lucide-react"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { NavigationHeader } from "@/components/navigation-header"

const tourTypes = {
  adventure: {
    name: "🍃 AVES Adventure",
    color: "emerald",
    pricePerDay: 1000,
    icon: "🍃",
    description: "Classic birding expeditions across Colombia's prime hotspots",
  },
  vision: {
    name: "🪶 AVES Vision",
    color: "purple",
    pricePerDay: 1250,
    icon: "🪶",
    description: "Photography workshops with professional wildlife photographers",
  },
  elevate: {
    name: "🌼 AVES Elevate",
    color: "yellow",
    pricePerDay: 1500,
    icon: "🌼",
    description: "Premium expeditions with luxury amenities",
  },
  souls: {
    name: "🍓 AVES Souls",
    color: "red",
    pricePerDay: 1750,
    icon: "🍓",
    description: "Romantic retreats for couples",
  },
}

const bioregions = [
  { id: "western-andes", name: "Quetzal Highlands", subtitle: "Western Andes", priceModifier: 1.0 },
  { id: "central-andes", name: "Hummingbird Haven", subtitle: "Central Andes", priceModifier: 0.9 },
  { id: "eastern-andes", name: "Páramo Paradise", subtitle: "Eastern Andes", priceModifier: 0.95 },
  { id: "llanos", name: "Wetland Wonders", subtitle: "Llanos", priceModifier: 0.85 },
  { id: "amazon", name: "Canopy Kingdom", subtitle: "Amazon", priceModifier: 1.1 },
  { id: "choco", name: "Endemic Empire", subtitle: "Biogeographic Chocó", priceModifier: 1.15 },
  { id: "caribbean", name: "Coastal Crown", subtitle: "Caribbean + Sierra Nevada", priceModifier: 1.05 },
  { id: "cauca-valley", name: "Valley Voyager", subtitle: "Cauca Valley", priceModifier: 0.8 },
  { id: "magdalena-valley", name: "River Realm", subtitle: "Magdalena Valley", priceModifier: 0.85 },
  { id: "macizo", name: "Massif Majesty", subtitle: "Macizo Colombiano", priceModifier: 1.0 },
]

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedTour, setSelectedTour] = useState(searchParams.get("tour") || "adventure")
  const [duration, setDuration] = useState(7)
  const [guests, setGuests] = useState(2)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    specialRequests: "",
    dietaryRestrictions: "",
    experienceLevel: "intermediate",
    newsletter: false,
  })

  const [showSourceNotification, setShowSourceNotification] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState("")

  useEffect(() => {
    const region = searchParams.get("region")
    const source = searchParams.get("source")

    if (region === "caribbean") {
      setSelectedRegion("Caribbean")
      if (source === "caribbean-page") {
        setShowSourceNotification(true)
        setTimeout(() => setShowSourceNotification(false), 5000)
      }
    }
  }, [searchParams])

  useEffect(() => {
    const tour = searchParams.get("tour")
    if (tour && tourTypes[tour as keyof typeof tourTypes]) {
      setSelectedTour(tour)
    }
  }, [searchParams])

  const calculateRestDays = () => {
    return Math.floor(duration / 7) * 2
  }

  const calculateTotalPrice = () => {
    const tourType = tourTypes[selectedTour as keyof typeof tourTypes]
    const basePrice = tourType?.pricePerDay || 0
    const restDays = calculateRestDays()
    return (duration + restDays) * basePrice * guests
  }

  const totalPrice = calculateTotalPrice()
  const depositAmount = Math.round(totalPrice * 0.3)
  const finalPayment = totalPrice - depositAmount

  const getTourColor = (tourType: string) => {
    const colors = {
      adventure: "emerald",
      vision: "purple",
      elevate: "yellow",
      souls: "red",
    }
    return colors[tourType as keyof typeof colors] || "gray"
  }

  const handleTourChange = (e: any) => {
    setSelectedTour(e.target.value)
  }

  const handleDurationChange = (e: any) => {
    setDuration(Number.parseInt(e.target.value))
  }

  const handleGuestsChange = (e: any) => {
    setGuests(Number.parseInt(e.target.value))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <NavigationHeader currentPage="/checkout" />

      {showSourceNotification && (
        <div className="container mx-auto px-4 pt-4">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
            <p className="text-orange-800 text-sm">
              <strong>Caribbean Region Selected:</strong> You've been directed here from the Caribbean region page. The
              Caribbean region has been pre-selected for your convenience.
            </p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Customize Your Adventure</h2>

                  {/* Tour Selection */}
                  <div className="space-y-6">
                    <div className="border rounded-lg p-6 bg-gray-50">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Tour Type</label>
                          <select
                            value={selectedTour}
                            onChange={handleTourChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          >
                            {Object.entries(tourTypes).map(([key, tour]) => (
                              <option key={key} value={key}>
                                {tour.icon} {tour.name} - ${tour.pricePerDay}/day
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Duration (days)</label>
                          <Input
                            type="number"
                            value={duration}
                            onChange={handleDurationChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests</label>
                          <Input
                            type="number"
                            value={guests}
                            onChange={handleGuestsChange}
                            min="1"
                            max="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                          <p className="text-xs text-gray-600 mt-1">
                            Maximum 4 guests per booking. For groups larger than 4, please{" "}
                            <a href="/contact" className="text-emerald-600 hover:text-emerald-700 underline">
                              contact us directly
                            </a>{" "}
                            to arrange discounts for multiple 4-person groups.
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Region</label>
                          <select
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          >
                            <option value="">Select a region</option>
                            <option value="Caribbean">Caribbean + Sierra Nevada</option>
                            <option value="Western Andes">Western Andes</option>
                            <option value="Central Andes">Central Andes</option>
                            <option value="Eastern Andes">Eastern Andes</option>
                            <option value="Amazon">Amazon</option>
                            <option value="Chocó">Biogeographic Chocó</option>
                            <option value="Llanos">Llanos</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-8">
                    <Button onClick={() => setStep(2)} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      Continue to Details
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Information</h2>

                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                        <Input
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder="Your first name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                        <Input
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder="Your last name"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country of Residence</label>
                      <Input
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="United States"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Birding Experience Level</label>
                      <select
                        value={formData.experienceLevel}
                        onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="beginner">Beginner - New to birding</option>
                        <option value="intermediate">Intermediate - Some birding experience</option>
                        <option value="advanced">Advanced - Experienced birder</option>
                        <option value="expert">Expert - Professional/serious birder</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Restrictions</label>
                      <Input
                        value={formData.dietaryRestrictions}
                        onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
                        placeholder="Vegetarian, allergies, etc."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requests or Comments
                      </label>
                      <Textarea
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                        placeholder="Any special requests, accessibility needs, or additional information..."
                        rows={4}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={formData.newsletter}
                        onCheckedChange={(checked) => setFormData({ ...formData, newsletter: checked as boolean })}
                      />
                      <label htmlFor="newsletter" className="text-sm text-gray-700">
                        Subscribe to our newsletter for birding tips and tour updates
                      </label>
                    </div>
                  </form>

                  <div className="flex justify-between mt-8">
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="border-gray-300 text-gray-900 hover:bg-gray-50"
                    >
                      <ArrowLeft className="mr-2 w-4 h-4" />
                      Back to Tours
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      disabled={!formData.firstName || !formData.lastName || !formData.email}
                    >
                      Continue to Payment
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Payment & Confirmation</h2>

                  <div className="space-y-6">
                    {/* Payment Structure */}
                    <div className="bg-emerald-50 rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <Shield className="w-6 h-6 text-emerald-600 mr-2" />
                        <h3 className="text-lg font-bold text-emerald-900">Secure Payment Structure</h3>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <CreditCard className="w-5 h-5 text-emerald-600 mr-2" />
                            <span className="font-semibold text-gray-900">Deposit (30%)</span>
                          </div>
                          <div className="text-2xl font-bold text-emerald-600">${depositAmount.toLocaleString()}</div>
                          <p className="text-sm text-gray-600 mt-1">Due today to secure your booking</p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <Calendar className="w-5 h-5 text-emerald-600 mr-2" />
                            <span className="font-semibold text-gray-900">Final Payment (70%)</span>
                          </div>
                          <div className="text-2xl font-bold text-emerald-600">${finalPayment.toLocaleString()}</div>
                          <p className="text-sm text-gray-600 mt-1">Due 30 days before tour departure</p>
                        </div>
                      </div>
                    </div>

                    {/* Booking Summary */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Booking Summary</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Guest Name:</span>
                          <span className="font-medium">
                            {formData.firstName} {formData.lastName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Email:</span>
                          <span className="font-medium">{formData.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tour Type:</span>
                          <span className="font-medium">{tourTypes[selectedTour as keyof typeof tourTypes].name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span className="font-medium">{duration} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Number of Guests:</span>
                          <span className="font-medium">{guests}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Experience Level:</span>
                          <span className="font-medium capitalize">{formData.experienceLevel}</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Terms */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-bold text-gray-900 mb-3">Payment Terms & Conditions</h4>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• 30% deposit required to secure your booking</li>
                        <li>• Remaining 70% due 30 days before tour departure</li>
                        <li>• Full refund if cancelled more than 60 days before departure</li>
                        <li>• 50% refund if cancelled 30-60 days before departure</li>
                        <li>• No refund for cancellations within 30 days of departure</li>
                        <li>• Travel insurance is strongly recommended</li>
                      </ul>
                    </div>

                    {/* Next Steps */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Next Steps</h4>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700">
                        <li>Complete deposit payment to secure your booking</li>
                        <li>Receive booking confirmation and detailed itinerary</li>
                        <li>Pre-trip consultation call with your guide</li>
                        <li>Receive packing list and travel preparation guide</li>
                        <li>Final payment due 30 days before departure</li>
                        <li>Begin your incredible Colombian birding adventure!</li>
                      </ol>
                    </div>

                    <div className="bg-emerald-50 rounded-lg p-4">
                      <p className="text-sm text-emerald-800">
                        <strong>Note:</strong> By proceeding with payment, you agree to our terms and conditions. Our
                        team will contact you within 24 hours to confirm your booking details and answer any questions.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="border-gray-300 text-gray-900 hover:bg-gray-50"
                    >
                      <ArrowLeft className="mr-2 w-4 h-4" />
                      Back to Tours
                    </Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      Pay Deposit (${depositAmount.toLocaleString()})
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h3>

                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <Badge
                        className={`bg-${getTourColor(selectedTour)}-100 text-${getTourColor(selectedTour)}-800 mr-2`}
                      >
                        {tourTypes[selectedTour as keyof typeof tourTypes].icon}
                      </Badge>
                      <span className="font-medium">{tourTypes[selectedTour as keyof typeof tourTypes].name}</span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {duration} days
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {guests} guests
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Rate per day per person:</span>
                      <span className="font-medium">
                        ${tourTypes[selectedTour as keyof typeof tourTypes].pricePerDay.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{duration} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rest Days:</span>
                      <span className="font-medium">{calculateRestDays()} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Guests:</span>
                      <span className="font-medium">{guests}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Calculation:</span>
                      <span>
                        ${tourTypes[selectedTour as keyof typeof tourTypes].pricePerDay} x {duration} days +{" "}
                        {calculateRestDays()} rest days x {guests} guests
                      </span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-emerald-600">${totalPrice.toLocaleString()}</span>
                    </div>
                    {step === 3 && (
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Deposit (30%):</span>
                          <span className="font-medium">${depositAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Final Payment:</span>
                          <span className="font-medium">${finalPayment.toLocaleString()}</span>
                        </div>
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-1">*Final pricing subject to confirmation</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                    <span>Carbon neutral tours</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                    <span>Expert ornithologist guides</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                    <span>Premium eco-lodge accommodation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                    <span>All meals and transportation</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
