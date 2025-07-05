"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, MapPin, Clock, ArrowRight, CheckCircle, ExternalLink, Map } from "lucide-react"
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

export default function ContactPage() {
  const [selectedTourTypes, setSelectedTourTypes] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
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
    const subject = searchParams.get("subject")
    if (subject) {
      setFormData((prev) => ({
        ...prev,
        specialRequests: `Subject: ${decodeURIComponent(subject)}\n\n` + prev.specialRequests,
      }))
    }
  }, [searchParams])

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

I look forward to hearing from you within 24 hours as mentioned on your website.

Best regards,
${formData.firstName} ${formData.lastName}`)

    return `mailto:info@aves.bio?subject=${subject}&body=${body}`
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <NavigationHeader currentPage="/contact" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4">
              🌿 Expert Birding Consultations
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Plan Your Colombian
              <span className="text-emerald-600 block">Birding Adventure</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with our expert ornithologists to design your perfect Colombian birding expedition. We respond
              within 24 hours with personalized recommendations.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600 mb-4">Get personalized tour recommendations</p>
                <a
                  href="mailto:info@aves.bio"
                  className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
                >
                  info@aves.bio
                </a>
                <div className="text-sm text-gray-500 mt-2">24-hour response guarantee</div>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
                <p className="text-gray-600 mb-4">Based in Colombia's capital</p>
                <div className="text-gray-700 font-medium">Vancouver, Canada and Bogota, Colombia</div>
                <div className="text-sm text-gray-500 mt-2">Operating in Colombia</div>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Response Time</h3>
                <p className="text-gray-600 mb-4">Fast, professional service</p>
                <div className="text-purple-600 font-bold text-lg">Within 24 Hours</div>
                <div className="text-sm text-gray-500 mt-2">Guaranteed response</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-xl border-0">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  Tell Us About Your Birding Interests
                </CardTitle>
                <p className="text-gray-600 text-lg">
                  The more details you provide, the better we can customize your Colombian birding experience.
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Contact Form */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                        <Input
                          placeholder="Your first name"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                        <Input
                          placeholder="Your last name"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
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
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <Input
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
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
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Group Size</label>
                        <select
                          value={formData.groupSize}
                          onChange={(e) => handleInputChange("groupSize", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                      />
                    </div>

                    <a
                      href={generateEmailLink()}
                      className="block w-full"
                      onClick={(e) => {
                        if (!formData.firstName || !formData.lastName || !formData.email) {
                          e.preventDefault()
                          alert("Please fill in your name and email address before submitting.")
                        }
                      }}
                    >
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 text-lg py-4">
                        <Mail className="mr-2 w-5 h-5" />
                        Send My Inquiry
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </a>

                    <p className="text-gray-500 text-center text-sm">
                      We'll respond within 24 hours with personalized recommendations
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

                    {/* Direct Contact */}
                    <div className="border-t border-emerald-200 pt-4 mt-6">
                      <h4 className="font-medium text-gray-900 mb-3">Direct Contact</h4>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <Mail className="text-emerald-600 mt-1 flex-shrink-0 w-4 h-4" />
                          <div>
                            <a
                              href="mailto:info@aves.bio"
                              className="text-emerald-600 hover:text-emerald-700 hover:underline text-sm"
                            >
                              info@aves.bio
                            </a>
                            <div className="text-gray-600 text-xs">24-hour response guarantee</div>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <MapPin className="text-emerald-600 mt-1 flex-shrink-0 w-4 h-4" />
                          <div>
                            <div className="text-gray-700 text-sm">Vancouver, Canada and Bogota, Colombia</div>
                            <div className="text-gray-600 text-xs">Operating in Colombia</div>
                          </div>
                        </div>
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
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
