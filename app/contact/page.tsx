"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, ArrowRight, CheckCircle, ExternalLink, Map, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import {
  DURATION_OPTIONS,
  LOCATION_OPTIONS,
  TOUR_TYPE_OPTIONS,
  EXPERIENCE_LEVELS,
  GROUP_SIZE_OPTIONS,
} from "@/lib/form-options"
import { useSearchParams } from "next/navigation"
import { createInquiry, checkSupabaseConnection } from "@/lib/supabase"

export default function ContactPage() {
  const [selectedTourTypes, setSelectedTourTypes] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error" | "warning"; text: string } | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<"checking" | "connected" | "disconnected">("checking")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    travelDate: "",
    groupSize: "1 person",
    desiredDuration: "8 days",
    experienceLevel: "Beginner birder",
    specialRequests: "",
  })

  const searchParams = useSearchParams()

  useEffect(() => {
    checkConnection()
    const subject = searchParams.get("subject")
    if (subject) {
      setFormData((prev) => ({
        ...prev,
        specialRequests: `Subject: ${decodeURIComponent(subject)}\n\n` + prev.specialRequests,
      }))
    }
  }, [searchParams])

  const checkConnection = async () => {
    setConnectionStatus("checking")
    const { connected } = await checkSupabaseConnection()
    setConnectionStatus(connected ? "connected" : "disconnected")
  }

  const toggleSelection = (item: string, selectedItems: string[], setSelectedItems: (items: string[]) => void) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selected) => selected !== item))
    } else {
      setSelectedItems([...selectedItems, item])
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setMessage({ type: "error", text: "First name is required" })
      return false
    }
    if (!formData.lastName.trim()) {
      setMessage({ type: "error", text: "Last name is required" })
      return false
    }
    if (!formData.email.trim()) {
      setMessage({ type: "error", text: "Email is required" })
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setMessage({ type: "error", text: "Please enter a valid email address" })
      return false
    }

    return true
  }

  const sanitizeInput = (input: string) => {
    return input.trim().replace(/[<>]/g, "")
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    // Check connection first
    if (connectionStatus === "disconnected") {
      setMessage({ type: "error", text: "No internet connection. Please check your network and try again." })
      setLoading(false)
      return
    }

    if (!validateForm()) {
      setLoading(false)
      return
    }

    try {
      // Sanitize all inputs
      const sanitizedData = {
        firstName: sanitizeInput(formData.firstName),
        lastName: sanitizeInput(formData.lastName),
        email: sanitizeInput(formData.email.toLowerCase()),
        phone: sanitizeInput(formData.phone),
        specialRequests: sanitizeInput(formData.specialRequests),
      }

      // Create inquiry message
      const inquiryMessage = `
Travel Date: ${formData.travelDate || "Not specified"}
Group Size: ${formData.groupSize}
Desired Duration: ${formData.desiredDuration}
Experience Level: ${formData.experienceLevel}

Interested Tour Types: ${selectedTourTypes.length > 0 ? selectedTourTypes.join(", ") : "Not specified"}
Desired Locations: ${selectedLocations.length > 0 ? selectedLocations.join(", ") : "Not specified"}

Special Interests/Requests: ${sanitizedData.specialRequests || "None specified"}
      `.trim()

      // Create inquiry in database
      const inquiryData = {
        email: sanitizedData.email,
        full_name: `${sanitizedData.firstName} ${sanitizedData.lastName}`,
        phone: sanitizedData.phone || null,
        message: inquiryMessage,
        inquiry_type: "tour_inquiry",
        status: "pending",
        priority: "normal",
        created_at: new Date().toISOString(),
      }

      const { data, error } = await createInquiry(inquiryData)

      if (error) {
        throw error
      }

      setMessage({
        type: "success",
        text: "Your inquiry has been submitted successfully! We'll get back to you within 24 hours.",
      })

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        travelDate: "",
        groupSize: "1 person",
        desiredDuration: "8 days",
        experienceLevel: "Beginner birder",
        specialRequests: "",
      })
      setSelectedTourTypes([])
      setSelectedLocations([])
    } catch (error: any) {
      console.error("Form submission error:", error)

      let errorMessage = "An error occurred while submitting your inquiry. Please try again."

      if (error.message?.includes("fetch")) {
        errorMessage = "Network connection failed. Please check your internet connection and try again."
      } else if (error.message?.includes("DNS")) {
        errorMessage = "DNS resolution failed. Please check your network settings or try again later."
      } else if (error.code === "NETWORK_ERROR" || error.name === "NetworkError") {
        errorMessage = "Network error occurred. Please check your connection and try again."
      }

      setMessage({ type: "error", text: errorMessage })
    } finally {
      setLoading(false)
    }
  }

  const generateEmailLink = () => {
    const subject = encodeURIComponent("Colombian Birding Tour Inquiry - Contact Form")
    const body = encodeURIComponent(`Hello AVES Team,

I'm interested in planning a Colombian birding adventure. Here are my details:

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone || "Not provided"}
Travel Date: ${formData.travelDate || "Not specified"}
Group Size: ${formData.groupSize}
Desired Duration: ${formData.desiredDuration}
Experience Level: ${formData.experienceLevel}

Interested Tour Types: ${selectedTourTypes.length > 0 ? selectedTourTypes.join(", ") : "Not specified"}
Desired Locations: ${selectedLocations.length > 0 ? selectedLocations.join(", ") : "Not specified"}

Special Interests/Requests: ${formData.specialRequests || "None specified"}

I look forward to hearing from you soon.

Best regards,
${formData.firstName} ${formData.lastName}`)

    return `mailto:contact@aves.bio?subject=${subject}&body=${body}`
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <NavigationHeader currentPage="/contact" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4">
              🌿 Expert Birding Consultations
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Plan Your Colombian
              <span className="text-emerald-600 block">Birding Adventure</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with our expert ornithologists to design your perfect Colombian birding expedition. Share your
              interests and we'll create a personalized recommendation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-xl border-0">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  Tell Us About Your Birding Interests
                </CardTitle>
                <p className="text-gray-600 text-lg">
                  The more details you provide, the better we can customize your Colombian birding experience.
                </p>
              </CardHeader>
              <CardContent className="p-8">
                {connectionStatus === "disconnected" && (
                  <Alert className="border-yellow-200 bg-yellow-50 mb-6">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-800">
                      Connection issue detected.
                      <Button
                        variant="link"
                        className="p-0 h-auto text-yellow-800 underline ml-1"
                        onClick={checkConnection}
                      >
                        Retry connection
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}

                {message && (
                  <Alert
                    className={
                      message.type === "success"
                        ? "border-green-200 bg-green-50 mb-6"
                        : message.type === "warning"
                          ? "border-yellow-200 bg-yellow-50 mb-6"
                          : "border-red-200 bg-red-50 mb-6"
                    }
                  >
                    {message.type === "success" ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle
                        className={`h-4 w-4 ${message.type === "warning" ? "text-yellow-600" : "text-red-600"}`}
                      />
                    )}
                    <AlertDescription
                      className={
                        message.type === "success"
                          ? "text-green-800"
                          : message.type === "warning"
                            ? "text-yellow-800"
                            : "text-red-800"
                      }
                    >
                      {message.text}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Contact Form */}
                  <div className="space-y-6">
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                          <Input
                            placeholder="Your first name"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            required
                            disabled={loading || connectionStatus === "disconnected"}
                            maxLength={50}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                          <Input
                            placeholder="Your last name"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            required
                            disabled={loading || connectionStatus === "disconnected"}
                            maxLength={50}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                            disabled={loading || connectionStatus === "disconnected"}
                            maxLength={100}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                          <Input
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            disabled={loading || connectionStatus === "disconnected"}
                            maxLength={20}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Travel Date</label>
                          <Input
                            type="date"
                            value={formData.travelDate}
                            onChange={(e) => handleInputChange("travelDate", e.target.value)}
                            disabled={loading || connectionStatus === "disconnected"}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Group Size</label>
                          <select
                            value={formData.groupSize}
                            onChange={(e) => handleInputChange("groupSize", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            disabled={loading || connectionStatus === "disconnected"}
                          >
                            {GROUP_SIZE_OPTIONS.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Desired Duration</label>
                          <select
                            value={formData.desiredDuration}
                            onChange={(e) => handleInputChange("desiredDuration", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            disabled={loading || connectionStatus === "disconnected"}
                          >
                            {DURATION_OPTIONS.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                          <select
                            value={formData.experienceLevel}
                            onChange={(e) => handleInputChange("experienceLevel", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            disabled={loading || connectionStatus === "disconnected"}
                          >
                            {EXPERIENCE_LEVELS.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Tour Type Selection */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Interested Tour Types (select all that apply)
                          </label>
                          <Link
                            href="/tours"
                            className="text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1 text-xs"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View All Tours
                          </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {TOUR_TYPE_OPTIONS.map((tourType) => (
                            <button
                              key={tourType}
                              type="button"
                              onClick={() => toggleSelection(tourType, selectedTourTypes, setSelectedTourTypes)}
                              className={`text-left p-3 rounded-lg border transition-all text-sm ${
                                selectedTourTypes.includes(tourType)
                                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                  : "border-gray-200 hover:border-emerald-300 text-gray-700"
                              }`}
                              disabled={loading || connectionStatus === "disconnected"}
                            >
                              {tourType}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Location Preferences */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Preferred Biogeographic Regions (select all that interest you)
                          </label>
                          <Link
                            href="/aves-explorer"
                            className="text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1 text-xs"
                          >
                            <Map className="w-3 h-3" />
                            Explore Map
                          </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {LOCATION_OPTIONS.map((location) => (
                            <label
                              key={location}
                              className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={selectedLocations.includes(location)}
                                onChange={() => toggleSelection(location, selectedLocations, setSelectedLocations)}
                                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                disabled={loading || connectionStatus === "disconnected"}
                              />
                              <span className="text-gray-700 text-xs">{location}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Special Interests or Requests
                        </label>
                        <Textarea
                          placeholder="Tell us about specific birds you'd like to see, photography interests, accessibility needs, dietary restrictions, or any other special requests..."
                          value={formData.specialRequests}
                          onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                          rows={4}
                          className="resize-none"
                          disabled={loading || connectionStatus === "disconnected"}
                          maxLength={1000}
                        />
                      </div>

                      <div className="flex gap-4">
                        <Button
                          type="submit"
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 text-lg py-4"
                          disabled={loading || connectionStatus === "disconnected"}
                        >
                          {loading ? (
                            <>
                              <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Mail className="mr-2 w-5 h-5" />
                              Submit Inquiry
                              <ArrowRight className="ml-2 w-5 h-5" />
                            </>
                          )}
                        </Button>

                        <a
                          href={generateEmailLink()}
                          className="flex-1"
                          onClick={(e) => {
                            if (!formData.firstName || !formData.lastName || !formData.email) {
                              e.preventDefault()
                              alert("Please fill in your name and email address before using email client.")
                            }
                          }}
                        >
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full text-lg py-4 bg-transparent"
                            disabled={loading}
                          >
                            <Mail className="mr-2 w-5 h-5" />
                            Use Email Client
                          </Button>
                        </a>
                      </div>
                    </form>

                    <p className="text-gray-500 text-center text-sm">
                      We'll get back to you with personalized recommendations within 24 hours
                    </p>
                  </div>

                  {/* Contact Information Sidebar */}
                  <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Why Choose AVES?</h3>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="text-emerald-600 mt-1 flex-shrink-0 w-5 h-5" />
                        <div>
                          <div className="font-medium text-gray-900">Expert Ornithologist Guides</div>
                          <div className="text-gray-600 text-sm">
                            Certified local experts with deep knowledge of Colombian avifauna
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <CheckCircle className="text-emerald-600 mt-1 flex-shrink-0 w-5 h-5" />
                        <div>
                          <div className="font-medium text-gray-900">Small Group Expeditions</div>
                          <div className="text-gray-600 text-sm">
                            Maximum 4 guests per tour for personalized attention
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <CheckCircle className="text-emerald-600 mt-1 flex-shrink-0 w-5 h-5" />
                        <div>
                          <div className="font-medium text-gray-900">B Corp Certified</div>
                          <div className="text-gray-600 text-sm">
                            100% carbon neutral with verified conservation impact
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <CheckCircle className="text-emerald-600 mt-1 flex-shrink-0 w-5 h-5" />
                        <div>
                          <div className="font-medium text-gray-900">Exclusive Access</div>
                          <div className="text-gray-600 text-sm">
                            Private reserves and research stations unavailable to others
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Links */}
                    <div className="border-t border-emerald-200 pt-4 space-y-3">
                      <h4 className="font-medium text-gray-900">Quick Links</h4>
                      <div className="space-y-2">
                        <Link
                          href="/tours"
                          className="flex items-center text-emerald-600 hover:text-emerald-700 hover:underline text-sm"
                        >
                          <ArrowRight className="mr-2 w-3 h-3" />
                          Browse All Tours
                        </Link>
                        <Link
                          href="/aves-explorer"
                          className="flex items-center text-emerald-600 hover:text-emerald-700 hover:underline text-sm"
                        >
                          <Map className="mr-2 w-3 h-3" />
                          Explore Interactive Map
                        </Link>
                        <Link
                          href="/endemic-birds"
                          className="flex items-center text-emerald-600 hover:text-emerald-700 hover:underline text-sm"
                        >
                          <ArrowRight className="mr-2 w-3 h-3" />
                          Endemic Birds Guide
                        </Link>
                        <Link
                          href="/travel-tips"
                          className="flex items-center text-emerald-600 hover:text-emerald-700 hover:underline text-sm"
                        >
                          <ArrowRight className="mr-2 w-3 h-3" />
                          Travel Tips & Preparation
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 text-lg">Common questions about planning your Colombian birding adventure</p>
            </div>

            <div className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    How far in advance should I book my tour?
                  </h3>
                  <p className="text-gray-600">
                    We recommend booking 3-6 months in advance, especially for peak birding seasons (December-March and
                    July-August). Our small group sizes (maximum 4 guests) mean tours fill up quickly.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">What's included in your tour packages?</h3>
                  <p className="text-gray-600">
                    All tours include expert ornithologist guides, transportation, accommodation, meals, park entrance
                    fees, and specialized birding equipment. International flights and personal items are not included.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Do I need birding experience to join a tour?
                  </h3>
                  <p className="text-gray-600">
                    Not at all! We welcome birders of all experience levels, from complete beginners to expert
                    ornithologists. Our guides adapt the experience to match your skill level and interests.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    What makes AVES different from other tour operators?
                  </h3>
                  <p className="text-gray-600">
                    We're B Corp certified, operate 100% carbon-neutral tours, maintain small group sizes (max 4
                    guests), and provide access to private reserves unavailable to other operators. Our guides are
                    certified ornithologists, not just general nature guides.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
