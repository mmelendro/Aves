"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ExternalLink,
  Map,
  CheckCircle,
  Users,
  Award,
  Shield,
  Star,
  Calendar,
  TelescopeIcon as Binoculars,
  Camera,
  Heart,
} from "lucide-react"
import Link from "next/link"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import FloatingAVESNavigation from "@/components/floating-aves-navigation"
import {
  DURATION_OPTIONS,
  LOCATION_OPTIONS,
  TOUR_TYPE_OPTIONS,
  EXPERIENCE_LEVELS,
  GROUP_SIZE_OPTIONS,
} from "@/lib/form-options"

export default function ContactPage() {
  const [selectedTourTypes, setSelectedTourTypes] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    travelDate: "",
    groupSize: "1 person",
    desiredDuration: "8 days",
    experienceLevel: "Beginner birder",
    specialRequests: "",
  })

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
    const subject = encodeURIComponent("Colombian Birding Tour Inquiry")
    const body = encodeURIComponent(`Hello AVES Team,

I'm interested in planning a Colombian birding adventure. Here are my details:

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
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

    return `mailto:info@aves.com?subject=${subject}&body=${body}`
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <NavigationHeader currentPage="/contact" />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 animate-pulse mb-6">
              🌿 B Corp Certified • Carbon Neutral Tours
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Plan Your Colombian
              <span className="text-emerald-600 block">Birding Adventure</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed mb-8">
              Tell us about your birding interests and travel preferences. Our expert team will respond within 24 hours
              with personalized recommendations.
            </p>

            {/* Key Value Props */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-emerald-100 shadow-lg p-4 sm:p-6 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-emerald-600 w-4 h-4 flex-shrink-0" />
                  <span className="text-gray-700">Expert ornithologist guides</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-emerald-600 w-4 h-4 flex-shrink-0" />
                  <span className="text-gray-700">Maximum 4 guests per tour</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-emerald-600 w-4 h-4 flex-shrink-0" />
                  <span className="text-gray-700">78+ endemic species</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-emerald-600 w-4 h-4 flex-shrink-0" />
                  <span className="text-gray-700">100% carbon neutral</span>
                </div>
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <Link href="/tours">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Binoculars className="mr-2 w-5 h-5" />
                  Browse All Tours
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/aves-explorer">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 shadow-md hover:shadow-lg transition-all duration-300 bg-transparent"
                >
                  <Map className="mr-2 w-5 h-5" />
                  Explore Interactive Map
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-emerald-100 rounded-full opacity-20 -translate-y-16 sm:-translate-y-24 lg:-translate-y-32 translate-x-16 sm:translate-x-24 lg:translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-36 sm:h-36 lg:w-48 lg:h-48 bg-blue-100 rounded-full opacity-20 translate-y-12 sm:translate-y-18 lg:translate-y-24 -translate-x-12 sm:-translate-x-18 lg:-translate-x-24"></div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Contact Form */}
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Tell Us About Your Trip</h2>
                      <p className="text-gray-600 mb-6">
                        Fill out this form and we'll create a personalized birding itinerary just for you.
                      </p>
                    </div>

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

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Travel Date</label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
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
                          className="text-xs text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1"
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
                            className={`text-left p-3 rounded-lg border text-sm transition-all ${
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
                          className="text-xs text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1"
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
                            <span className="text-xs text-gray-700">{location}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Interests or Requests
                      </label>
                      <textarea
                        placeholder="Tell us about specific birds you'd like to see, photography interests, accessibility needs, dietary restrictions, or any other special requests..."
                        value={formData.specialRequests}
                        onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
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
                      <Button className="w-full text-lg py-4 bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300">
                        <Mail className="mr-2 w-5 h-5" />
                        Send My Inquiry
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </a>

                    <p className="text-sm text-gray-500 text-center">
                      We'll respond within 24 hours with personalized recommendations
                    </p>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Get in Touch Directly</h3>

                    <div className="space-y-6 mb-8">
                      <div className="flex items-start space-x-3">
                        <Mail className="text-emerald-600 w-5 h-5 mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-gray-900">Email</div>
                          <a
                            href="mailto:info@aves.com"
                            className="text-emerald-600 hover:text-emerald-700 hover:underline"
                          >
                            info@aves.com
                          </a>
                          <div className="text-sm text-gray-600">24-hour response guarantee</div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <MapPin className="text-emerald-600 w-5 h-5 mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-gray-900">Based in</div>
                          <div className="text-gray-700">Bogotá, Colombia</div>
                          <div className="text-sm text-gray-600">Operating nationwide</div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Clock className="text-emerald-600 w-5 h-5 mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-gray-900">Response Time</div>
                          <div className="text-gray-700">Within 24 hours</div>
                          <div className="text-sm text-gray-600">Usually much faster!</div>
                        </div>
                      </div>
                    </div>

                    {/* Why Choose AVES */}
                    <div className="border-t border-emerald-200 pt-6 mb-6">
                      <h4 className="font-medium text-gray-900 mb-4">Why Choose AVES</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Users className="text-emerald-600 w-4 h-4 flex-shrink-0" />
                          <span className="text-sm text-gray-700">Expert ornithologist guides</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Shield className="text-emerald-600 w-4 h-4 flex-shrink-0" />
                          <span className="text-sm text-gray-700">B Corp certified & carbon neutral</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Award className="text-emerald-600 w-4 h-4 flex-shrink-0" />
                          <span className="text-sm text-gray-700">Maximum 4 guests per tour</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="text-emerald-600 w-4 h-4 flex-shrink-0" />
                          <span className="text-sm text-gray-700">5-star rated experiences</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Links */}
                    <div className="border-t border-emerald-200 pt-4">
                      <h4 className="font-medium text-gray-900 mb-3">Quick Links</h4>
                      <div className="space-y-2">
                        <Link
                          href="/tours"
                          className="flex items-center text-sm text-emerald-600 hover:text-emerald-700 hover:underline"
                        >
                          <ArrowRight className="mr-2 w-3 h-3" />
                          Browse All Tours
                        </Link>
                        <Link
                          href="/aves-explorer"
                          className="flex items-center text-sm text-emerald-600 hover:text-emerald-700 hover:underline"
                        >
                          <Map className="mr-2 w-3 h-3" />
                          Explore Interactive Map
                        </Link>
                        <Link
                          href="/endemic-birds"
                          className="flex items-center text-sm text-emerald-600 hover:text-emerald-700 hover:underline"
                        >
                          <ArrowRight className="mr-2 w-3 h-3" />
                          Endemic Birds Guide
                        </Link>
                        <Link
                          href="/travel-tips"
                          className="flex items-center text-sm text-emerald-600 hover:text-emerald-700 hover:underline"
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

      {/* Tour Types Preview */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Four Unique Birding Experiences</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              Each tour is carefully crafted for different interests and comfort levels, all featuring expert guides and
              premium accommodations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Adventure Tours */}
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 right-0 bg-emerald-600 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                POPULAR
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">🍃 Adventure Tours</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400 fill-current w-4 h-4" />
                    <span className="text-sm text-gray-600">4.9</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Our signature birding expeditions across Colombia's prime hotspots. 7-14 days of immersive wildlife
                  discovery.
                </p>
                <div className="space-y-2 mb-5">
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="text-emerald-600 mr-2 w-3 h-3 flex-shrink-0" />
                    <span>Professional ornithologist guides</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="text-emerald-600 mr-2 w-3 h-3 flex-shrink-0" />
                    <span>Premium eco-lodges</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="text-emerald-600 mr-2 w-3 h-3 flex-shrink-0" />
                    <span>Conservation project visits</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold text-emerald-600">$8,000</div>
                      <div className="text-xs text-gray-500">avg. per person</div>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-800 text-xs">7-14 days</Badge>
                  </div>
                  <Link href="/tours/adventure" className="block">
                    <Button className="w-full text-sm bg-emerald-600 hover:bg-emerald-700">View Details & Book</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Vision Tours */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">🪶 Vision Tours</h3>
                  <Camera className="text-purple-600 w-5 h-5" />
                </div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Specialized photography workshops with professional wildlife photographers capturing Colombia's avian
                  beauty.
                </p>
                <div className="space-y-2 mb-5">
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="text-purple-600 mr-2 w-3 h-3 flex-shrink-0" />
                    <span>Exclusive photography hides</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="text-purple-600 mr-2 w-3 h-3 flex-shrink-0" />
                    <span>Post-processing sessions</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="text-purple-600 mr-2 w-3 h-3 flex-shrink-0" />
                    <span>Professional equipment included</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold text-purple-600">$10,000</div>
                      <div className="text-xs text-gray-500">avg. per person</div>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800 text-xs">10-12 days</Badge>
                  </div>
                  <Link href="/tours/vision" className="block">
                    <Button
                      variant="outline"
                      className="w-full text-sm border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white bg-transparent"
                    >
                      View Details & Book
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Elevate Tours */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">🌼 Elevate Tours</h3>
                  <Award className="text-yellow-500 w-5 h-5" />
                </div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Premium expeditions with luxury amenities in exclusive locations for the ultimate comfort experience.
                </p>
                <div className="space-y-2 mb-5">
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="text-yellow-500 mr-2 w-3 h-3 flex-shrink-0" />
                    <span>Luxury accommodations</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="text-yellow-500 mr-2 w-3 h-3 flex-shrink-0" />
                    <span>Private chef & spa access</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="text-yellow-500 mr-2 w-3 h-3 flex-shrink-0" />
                    <span>Helicopter transfers</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold text-yellow-600">$12,000</div>
                      <div className="text-xs text-gray-500">avg. per person</div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">8-10 days</Badge>
                  </div>
                  <Link href="/tours/elevate" className="block">
                    <Button
                      variant="outline"
                      className="w-full text-sm border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white bg-transparent"
                    >
                      View Details & Book
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Souls Tours */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">🍓 Souls Tours</h3>
                  <Heart className="text-red-500 w-5 h-5" />
                </div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Cultural immersion tours combining birding with indigenous communities and traditional crafts.
                </p>
                <div className="space-y-2 mb-5">
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="text-red-500 mr-2 w-3 h-3 flex-shrink-0" />
                    <span>Indigenous community visits</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="text-red-500 mr-2 w-3 h-3 flex-shrink-0" />
                    <span>Traditional craft workshops</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="text-red-500 mr-2 w-3 h-3 flex-shrink-0" />
                    <span>Community-based lodging</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold text-red-600">$14,000</div>
                      <div className="text-xs text-gray-500">avg. per person</div>
                    </div>
                    <Badge className="bg-red-100 text-red-800 text-xs">6-8 days</Badge>
                  </div>
                  <Link href="/tours/souls" className="block">
                    <Button
                      variant="outline"
                      className="w-full text-sm border-red-600 text-red-600 hover:bg-red-600 hover:text-white bg-transparent"
                    >
                      View Details & Book
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl border border-emerald-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Can't Decide? Let Us Help You Choose</h3>
              <p className="text-base text-gray-600 mb-4 max-w-2xl mx-auto">
                Our birding experts will recommend the perfect tour based on your interests, experience level, and
                travel preferences.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/tours">
                  <Button className="text-sm px-6 bg-emerald-600 hover:bg-emerald-700">
                    <Calendar className="mr-2 w-4 h-4" />
                    Compare All Tours
                  </Button>
                </Link>
                <Link href="/aves-explorer">
                  <Button
                    variant="outline"
                    className="text-sm px-6 border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent"
                  >
                    <Map className="mr-2 w-4 h-4" />
                    Explore Interactive Map
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating Navigation */}
      <FloatingAVESNavigation />
    </div>
  )
}
