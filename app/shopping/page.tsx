"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  Star,
  Mail,
  Phone,
  User,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Percent,
  Gift,
} from "lucide-react"
import { tourOptions, regionOptions, accommodationOptions, experienceOptions } from "@/lib/form-options"

export default function ShoppingPage() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    tour: "",
    region: "",
    accommodation: "",
    experience: "",
    startDate: "",
    groupSize: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    specialRequests: "",
    dietaryRestrictions: "",
    emergencyContact: "",
    emergencyPhone: "",
  })

  // Discount state
  const [discount, setDiscount] = useState({
    percentage: 0,
    type: "",
    originalPrice: 0,
    discountedPrice: 0,
    isActive: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  // Base pricing
  const basePricing = {
    "🍃 Adventure Tours": 8000,
    "🪶 Vision Tours": 7500,
    "🌼 Elevate Tours": 9000,
    "🍓 Souls Tours": 8500,
  }

  useEffect(() => {
    // Pre-populate form from URL parameters
    const tour = searchParams.get("tour")
    const region = searchParams.get("region")
    const discountPercentage = searchParams.get("discount")
    const discountType = searchParams.get("discountType")
    const originalPrice = searchParams.get("originalPrice")
    const discountedPrice = searchParams.get("discountedPrice")

    if (tour) setFormData((prev) => ({ ...prev, tour: decodeURIComponent(tour) }))
    if (region) setFormData((prev) => ({ ...prev, region: decodeURIComponent(region) }))

    // Handle discount parameters
    if (discountPercentage && discountType && originalPrice && discountedPrice) {
      setDiscount({
        percentage: Number.parseInt(discountPercentage),
        type: discountType,
        originalPrice: Number.parseInt(originalPrice),
        discountedPrice: Number.parseInt(discountedPrice),
        isActive: true,
      })
    }
  }, [searchParams])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const calculateTotalCost = () => {
    const selectedTour = formData.tour as keyof typeof basePricing
    const basePrice = basePricing[selectedTour] || 8000

    // Use discount price if active, otherwise use base price
    if (discount.isActive) {
      return discount.discountedPrice
    }

    return basePrice
  }

  const calculateDeposit = () => {
    const total = calculateTotalCost()
    return Math.round(total * 0.3) // 30% deposit
  }

  const calculateFinalPayment = () => {
    return calculateTotalCost() - calculateDeposit()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const totalCost = calculateTotalCost()
      const deposit = calculateDeposit()
      const finalPayment = calculateFinalPayment()

      const emailData = {
        ...formData,
        totalCost,
        deposit,
        finalPayment,
        discount: discount.isActive ? discount : null,
        submittedAt: new Date().toISOString(),
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Booking request submitted:", emailData)
      setSubmitStatus("success")
    } catch (error) {
      console.error("Submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = () => {
    const requiredFields = ["tour", "region", "startDate", "groupSize", "firstName", "lastName", "email", "phone"]
    return requiredFields.every((field) => formData[field as keyof typeof formData])
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <NavigationHeader currentPage="/shopping" />

      {/* Discount Banner */}
      {discount.isActive && (
        <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white py-4 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 animate-bounce" />
                <span className="text-lg sm:text-xl font-bold">🔥 EARLY BIRD SPECIAL ACTIVE! 🔥</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-100">
                <Percent className="w-4 h-4" />
                <span className="font-semibold">
                  Save ${discount.originalPrice - discount.discountedPrice} with 25% OFF!
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Book Your Colombian Birding Adventure
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Complete your booking details below and we'll get back to you within 24 hours to confirm your adventure
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Calendar className="w-6 h-6 text-emerald-600" />
                  Booking Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Tour Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tour" className="text-base font-semibold">
                        Tour Type *
                      </Label>
                      <Select value={formData.tour} onValueChange={(value) => handleInputChange("tour", value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select your tour" />
                        </SelectTrigger>
                        <SelectContent>
                          {tourOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="region" className="text-base font-semibold">
                        Region *
                      </Label>
                      <Select value={formData.region} onValueChange={(value) => handleInputChange("region", value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          {regionOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Travel Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate" className="text-base font-semibold">
                        Preferred Start Date *
                      </Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => handleInputChange("startDate", e.target.value)}
                        className="mt-2"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>

                    <div>
                      <Label htmlFor="groupSize" className="text-base font-semibold">
                        Group Size *
                      </Label>
                      <Select
                        value={formData.groupSize}
                        onValueChange={(value) => handleInputChange("groupSize", value)}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Number of participants" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 person</SelectItem>
                          <SelectItem value="2">2 people</SelectItem>
                          <SelectItem value="3">3 people</SelectItem>
                          <SelectItem value="4">4 people</SelectItem>
                          <SelectItem value="5">5 people</SelectItem>
                          <SelectItem value="6">6 people</SelectItem>
                          <SelectItem value="7">7 people</SelectItem>
                          <SelectItem value="8">8 people</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="accommodation" className="text-base font-semibold">
                        Accommodation Preference
                      </Label>
                      <Select
                        value={formData.accommodation}
                        onValueChange={(value) => handleInputChange("accommodation", value)}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select accommodation" />
                        </SelectTrigger>
                        <SelectContent>
                          {accommodationOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="experience" className="text-base font-semibold">
                        Birding Experience Level
                      </Label>
                      <Select
                        value={formData.experience}
                        onValueChange={(value) => handleInputChange("experience", value)}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          {experienceOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-emerald-600" />
                      Personal Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-base font-semibold">
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="mt-2"
                          placeholder="Enter your first name"
                        />
                      </div>

                      <div>
                        <Label htmlFor="lastName" className="text-base font-semibold">
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className="mt-2"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label htmlFor="email" className="text-base font-semibold">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="mt-2"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-base font-semibold">
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="mt-2"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label htmlFor="country" className="text-base font-semibold">
                        Country of Residence
                      </Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                        className="mt-2"
                        placeholder="Enter your country"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Additional Information */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Additional Information</h3>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="dietaryRestrictions" className="text-base font-semibold">
                          Dietary Restrictions
                        </Label>
                        <Textarea
                          id="dietaryRestrictions"
                          value={formData.dietaryRestrictions}
                          onChange={(e) => handleInputChange("dietaryRestrictions", e.target.value)}
                          className="mt-2"
                          placeholder="Please list any dietary restrictions or allergies..."
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="emergencyContact" className="text-base font-semibold">
                            Emergency Contact Name
                          </Label>
                          <Input
                            id="emergencyContact"
                            value={formData.emergencyContact}
                            onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                            className="mt-2"
                            placeholder="Emergency contact name"
                          />
                        </div>

                        <div>
                          <Label htmlFor="emergencyPhone" className="text-base font-semibold">
                            Emergency Contact Phone
                          </Label>
                          <Input
                            id="emergencyPhone"
                            type="tel"
                            value={formData.emergencyPhone}
                            onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                            className="mt-2"
                            placeholder="Emergency contact phone"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="specialRequests" className="text-base font-semibold">
                          Special Requests
                        </Label>
                        <Textarea
                          id="specialRequests"
                          value={formData.specialRequests}
                          onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                          className="mt-2"
                          placeholder="Any special requests, accessibility needs, or questions..."
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Status */}
                  {submitStatus === "success" && (
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        Your booking request has been submitted successfully! We'll contact you within 24 hours.
                      </AlertDescription>
                    </Alert>
                  )}

                  {submitStatus === "error" && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        There was an error submitting your request. Please try again or contact us directly.
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={!isFormValid() || isSubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting Request...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        Submit Booking Request
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <CreditCard className="w-5 h-5 text-emerald-600" />
                    Booking Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Selected Tour */}
                  {formData.tour && (
                    <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-emerald-600" />
                        <span className="font-medium text-emerald-800">Tour</span>
                      </div>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                        {formData.tour}
                      </Badge>
                    </div>
                  )}

                  {/* Selected Region */}
                  {formData.region && (
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-blue-800">Region</span>
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {formData.region}
                      </Badge>
                    </div>
                  )}

                  {/* Group Size */}
                  {formData.groupSize && (
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span className="font-medium text-purple-800">Group Size</span>
                      </div>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        {formData.groupSize} {Number.parseInt(formData.groupSize) === 1 ? "person" : "people"}
                      </Badge>
                    </div>
                  )}

                  {/* Start Date */}
                  {formData.startDate && (
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-orange-600" />
                        <span className="font-medium text-orange-800">Start Date</span>
                      </div>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                        {new Date(formData.startDate).toLocaleDateString()}
                      </Badge>
                    </div>
                  )}

                  <Separator />

                  {/* Discount Section */}
                  {discount.isActive && (
                    <>
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Gift className="w-5 h-5 text-orange-600" />
                          <span className="font-bold text-orange-800">Early Bird Special</span>
                          <Badge className="bg-red-500 text-white animate-pulse">{discount.percentage}% OFF</Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Original Price:</span>
                            <span className="text-gray-500 line-through font-medium">
                              ${discount.originalPrice.toLocaleString()} USD
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-green-700 font-semibold">Discounted Price:</span>
                            <span className="text-green-600 font-bold text-lg">
                              ${discount.discountedPrice.toLocaleString()} USD
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-yellow-200">
                            <span className="text-green-700 font-bold">You Save:</span>
                            <span className="text-green-600 font-bold text-lg">
                              ${(discount.originalPrice - discount.discountedPrice).toLocaleString()} USD
                            </span>
                          </div>
                        </div>
                      </div>
                      <Separator />
                    </>
                  )}

                  {/* Pricing */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total Cost:</span>
                      <span
                        className={`text-xl font-bold ${discount.isActive ? "text-green-600" : "text-emerald-600"}`}
                      >
                        ${calculateTotalCost().toLocaleString()} USD
                      </span>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Deposit (30%):</span>
                        <span className="font-medium">${calculateDeposit().toLocaleString()} USD</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Final Payment:</span>
                        <span className="font-medium">${calculateFinalPayment().toLocaleString()} USD</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-emerald-50 rounded-lg p-4 mt-6">
                    <h4 className="font-semibold text-emerald-800 mb-2">Need Help?</h4>
                    <div className="space-y-1 text-sm text-emerald-700">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3" />
                        <span>+57 300 123 4567</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3" />
                        <span>info@aves.com</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
