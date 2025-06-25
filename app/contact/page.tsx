"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Mail, MapPin, Clock, ArrowRight } from "lucide-react"
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
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Desired Locations <span className="text-gray-500">(Select multiple)</span>
                      </label>
                      <div className="relative">
                        <div className="border border-gray-300 rounded-md p-2 bg-white max-h-32 overflow-y-auto">
                          {LOCATION_OPTIONS.map((location) => (
                            <label
                              key={location}
                              className="flex items-center space-x-2 py-1 cursor-pointer hover:bg-gray-50 rounded px-1"
                            >
                              <input
                                type="checkbox"
                                checked={selectedLocations.includes(location)}
                                onChange={() => toggleSelection(location, selectedLocations, setSelectedLocations)}
                                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 text-xs"
                              />
                              <span className="text-xs text-gray-700">{location}</span>
                            </label>
                          ))}
                        </div>
                        {selectedLocations.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {selectedLocations.map((location) => (
                              <span
                                key={location}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                              >
                                {location.length > 20 ? `${location.substring(0, 20)}...` : location}
                                <button
                                  type="button"
                                  onClick={() => toggleSelection(location, selectedLocations, setSelectedLocations)}
                                  className="ml-1 text-blue-600 hover:text-blue-800"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Interested Tour Types * (select all that apply)
                    </label>
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
