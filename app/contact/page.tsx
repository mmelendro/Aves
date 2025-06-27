"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ExternalLink,
  Map,
  Bird,
  TelescopeIcon as Binoculars,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import {
  DURATION_OPTIONS,
  LOCATION_OPTIONS,
  CONTACT_TOUR_TYPE_OPTIONS,
  GROUP_SIZE_OPTIONS,
  EXPERIENCE_LEVELS,
} from "@/lib/form-options"

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
      tourLink?: string
    }
  > = {
    "🏖️ Caribbean Coast": {
      emoji: "🏖️",
      name: "Caribbean Coast",
      shortName: "Caribbean",
      description: "Coastal wetlands, mangroves, and dry forests with unique Caribbean species.",
      species: "300+",
      tourLink: "/tours/adventure",
    },
    "🏔️ Sierra Nevada de Santa Marta": {
      emoji: "🏔️",
      name: "Sierra Nevada de Santa Marta",
      shortName: "SNSM",
      description: "World's most important endemic bird area with 15+ species found nowhere else.",
      species: "600+",
      tourLink: "/tours/adventure/sierra-nevada",
    },
    "🌊 Pacific Coast Chocó": {
      emoji: "🌊",
      name: "Pacific Coast Chocó",
      shortName: "Chocó",
      description: "One of the world's most biodiverse regions with spectacular endemic species.",
      species: "800+",
      tourLink: "/tours/adventure",
    },
    "⛰️ Western Andes": {
      emoji: "⛰️",
      name: "Western Andes",
      shortName: "W. Andes",
      description: "Cloud forests and montane ecosystems with incredible hummingbird diversity.",
      species: "500+",
      tourLink: "/tours/vision",
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
      tourLink: "/tours/elevate",
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
      tourLink: "/tours/adventure",
    },
    "🌾 Eastern Plains": {
      emoji: "🌾",
      name: "Eastern Plains",
      shortName: "Llanos",
      description: "Vast grasslands and gallery forests with unique grassland species.",
      species: "300+",
      tourLink: "/tours/souls",
    },
    "🌳 Amazon Rainforest": {
      emoji: "🌳",
      name: "Amazon Rainforest",
      shortName: "Amazon",
      description: "World's largest rainforest with incredible biodiversity and canopy species.",
      species: "1000+",
      tourLink: "/tours/adventure",
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
      tourLink: "/tours",
    },
    "✨ Let AVES Choose": {
      emoji: "✨",
      name: "Let AVES Choose",
      shortName: "Expert Choice",
      description: "Let our experts design the perfect itinerary based on your interests.",
      species: "Custom",
      tourLink: "/contact",
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

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
Desired Locations/Bioregions: ${selectedLocations.length > 0 ? selectedLocations.join(", ") : "Not specified"}

Special Interests/Requests: ${formData.specialRequests || "None specified"}

I look forward to hearing from you within 24 hours as mentioned on your website.

Best regards,
${formData.firstName} ${formData.lastName}`)

    return `mailto:info@aves.com?subject=${subject}&body=${body}`
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <NavigationHeader currentPage="/contact" />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4">Get in Touch</Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Contact AVES</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to plan your Colombian birding adventure? We'd love to hear from you and help create the perfect tour
            for your interests and schedule.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Let's Plan Your Adventure</h2>
              <p className="text-lg text-gray-600 mb-8">
                Whether you're interested in a specific tour, have questions about our conservation efforts, or want to
                discuss a custom itinerary, our team is here to help.
              </p>

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email</div>
                    <a
                      href={generateEmailLink()}
                      className="text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
                    >
                      info@aves.com
                    </a>
                    <div className="text-xs text-emerald-600">Response within 24 hours</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Based in</div>
                    <div className="text-gray-600">Vancouver, Canada & Bogotá, Colombia</div>
                    <div className="text-xs text-emerald-600">Local expertise, global reach</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <Clock className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Response Time</div>
                    <div className="text-gray-600">Within 24 hours</div>
                    <div className="text-xs text-emerald-600">For all inquiries</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-emerald-50 rounded-lg">
                <h3 className="font-semibold text-emerald-800 mb-2">Prefer to Book Directly?</h3>
                <p className="text-emerald-700 mb-4">
                  Use our online booking system to build your custom Colombian birding adventure.
                </p>
                <Link href="/shopping">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Start Booking Your Journey
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <Card className="p-8 border-0 shadow-lg">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-2xl font-bold text-gray-900">Get Your Custom Tour Quote</CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <p className="text-sm text-gray-600 mb-6">
                  Fill out this form and we'll send you a personalized tour recommendation and quote within 24 hours.
                </p>

                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    const submissionData = {
                      firstName: formData.firstName,
                      lastName: formData.lastName,
                      email: formData.email,
                      travelDate: formData.travelDate,
                      groupSize: formData.groupSize,
                      desiredDuration: formData.desiredDuration,
                      experienceLevel: formData.experienceLevel,
                      desiredLocations: selectedLocations,
                      tourTypes: selectedTourTypes,
                      specialRequests: formData.specialRequests,
                    }
                    console.log("Form submission data:", submissionData)
                    // Here you would typically send the data to your backend
                    alert(
                      `Form submitted successfully!\n\nSelected Tour Types: ${selectedTourTypes.join(", ") || "None"}\nSelected Locations/Bioregions: ${selectedLocations.join(", ") || "None"}`,
                    )
                  }}
                >
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">First Name *</label>
                      <Input
                        placeholder="Your first name"
                        className="text-sm"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Last Name *</label>
                      <Input
                        placeholder="Your last name"
                        className="text-sm"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Email *</label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      className="text-sm"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Travel Dates</label>
                      <Input
                        type="date"
                        className="text-sm"
                        name="travelDate"
                        value={formData.travelDate}
                        onChange={(e) => handleInputChange("travelDate", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Group Size</label>
                      <select
                        name="groupSize"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        value={formData.groupSize}
                        onChange={(e) => handleInputChange("groupSize", e.target.value)}
                      >
                        {GROUP_SIZE_OPTIONS.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Desired Duration</label>
                      <select
                        name="desiredDuration"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        value={formData.desiredDuration}
                        onChange={(e) => handleInputChange("desiredDuration", e.target.value)}
                      >
                        {DURATION_OPTIONS.map((duration) => (
                          <option key={duration} value={duration}>
                            {duration}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Experience Level</label>
                      <select
                        name="experienceLevel"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        value={formData.experienceLevel}
                        onChange={(e) => handleInputChange("experienceLevel", e.target.value)}
                      >
                        {EXPERIENCE_LEVELS.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Tour Type Selection with Link */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-medium text-gray-700">
                        Interested Tour Types * (select all that apply)
                      </label>
                      <Link
                        href="/tours"
                        className="text-xs text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        View All Tours
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {CONTACT_TOUR_TYPE_OPTIONS.map((tourType) => (
                        <label
                          key={tourType}
                          className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedTourTypes.includes(tourType)}
                            onChange={() => toggleSelection(tourType, selectedTourTypes, setSelectedTourTypes)}
                            className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="text-xs text-gray-700">{tourType}</span>
                        </label>
                      ))}
                    </div>
                    {selectedTourTypes.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {selectedTourTypes.map((tourType) => (
                          <span
                            key={tourType}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-800"
                          >
                            {tourType}
                            <button
                              type="button"
                              onClick={() => toggleSelection(tourType, selectedTourTypes, setSelectedTourTypes)}
                              className="ml-1 text-emerald-600 hover:text-emerald-800"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Enhanced Biogeographic Regions Selection */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-gray-700">Preferred Biogeographic Regions</label>
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
                          href="/tours"
                          className="text-xs text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View Tours
                        </Link>
                      </div>
                    </div>

                    {/* Enhanced Region Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      {LOCATION_OPTIONS.map((location) => {
                        const isSelected = selectedLocations.includes(location)
                        const regionInfo = getRegionInfo(location)

                        return (
                          <div
                            key={location}
                            onClick={() => toggleSelection(location, selectedLocations, setSelectedLocations)}
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
                                    className={`font-medium text-sm ${isSelected ? "text-emerald-800" : "text-gray-800"}`}
                                  >
                                    {regionInfo.name}
                                  </h4>
                                </div>
                                <p
                                  className={`text-xs leading-relaxed ${isSelected ? "text-emerald-700" : "text-gray-600"}`}
                                >
                                  {regionInfo.description}
                                </p>
                                <div className="flex items-center justify-between mt-2">
                                  <span
                                    className={`text-xs font-medium ${isSelected ? "text-emerald-600" : "text-gray-500"}`}
                                  >
                                    {regionInfo.species} species
                                  </span>
                                  {regionInfo.tourLink && (
                                    <Link
                                      href={regionInfo.tourLink}
                                      onClick={(e) => e.stopPropagation()}
                                      className="text-xs text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
                                    >
                                      View Tour
                                      <ArrowRight className="w-3 h-3" />
                                    </Link>
                                  )}
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

                    {/* Selected Regions Summary */}
                    {selectedLocations.length > 0 && (
                      <div className="mb-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-emerald-800">
                              {selectedLocations.length} region{selectedLocations.length > 1 ? "s" : ""} selected
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {selectedLocations.map((location) => (
                                <span
                                  key={location}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-800"
                                >
                                  {getRegionInfo(location).emoji} {getRegionInfo(location).shortName}
                                  <button
                                    type="button"
                                    onClick={() => toggleSelection(location, selectedLocations, setSelectedLocations)}
                                    className="ml-1 text-emerald-600 hover:text-emerald-800"
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Informational Callout */}
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                          <Bird className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-blue-800 mb-1">Explore Before You Choose</h4>
                          <p className="text-xs text-blue-700 leading-relaxed mb-2">
                            Each bioregion offers unique species and experiences. Use our interactive tools to learn
                            more:
                          </p>
                          <div className="flex flex-wrap gap-3 text-xs">
                            <Link
                              href="/avifauna-explorer"
                              className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              <Map className="w-3 h-3 mr-1" />
                              Avifauna Explorer
                            </Link>
                            <Link
                              href="/endemic-birds"
                              className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              <Bird className="w-3 h-3 mr-1" />
                              Endemic Species
                            </Link>
                            <Link
                              href="/tours"
                              className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              <Binoculars className="w-3 h-3 mr-1" />
                              All Tours
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Special Interests or Requests
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                      rows={3}
                      placeholder="Photography focus, specific species interests, accessibility needs, etc."
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                    ></textarea>
                  </div>

                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-sm py-3">
                    Get My Custom Quote
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    We'll respond within 24 hours with a personalized recommendation and quote.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use the centralized Footer component */}
      <Footer />
    </div>
  )
}
