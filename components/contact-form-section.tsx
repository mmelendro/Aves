"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, CheckCircle, Users, Award, Eye, ArrowRight, Globe, ExternalLink } from "lucide-react"
import Link from "next/link"
import { GoogleCalendarButton } from "@/components/google-calendar-button"

interface ContactFormSectionProps {
  showTitle?: boolean
  showFAQ?: boolean
  variant?: "homepage" | "contact-page"
  className?: string
}

export function ContactFormSection({
  showTitle = true,
  showFAQ = false,
  variant = "homepage",
  className = "",
}: ContactFormSectionProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    travelDate: "",
    groupSize: "1 person",
    duration: "8 days",
    experienceLevel: "Beginner birder",
    specialRequests: "",
  })

  const [selectedTourTypes, setSelectedTourTypes] = useState<string[]>([])
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])

  const tourTypes = [
    { id: "adventure", label: "Adventure Tours", icon: "🏔️" },
    { id: "vision", label: "Vision Tours", icon: "👁️" },
    { id: "elevate", label: "Elevate Tours", icon: "⬆️" },
    { id: "souls", label: "Souls Tours", icon: "💫" },
  ]

  const bioregions = [
    { id: "caribbean", label: "Caribbean Coast", emoji: "🏖️" },
    { id: "sierra-nevada", label: "Sierra Nevada de Santa Marta", emoji: "🏔️" },
    { id: "pacific-choco", label: "Pacific Coast Chocó", emoji: "🌊" },
    { id: "western-andes", label: "Western Andes", emoji: "⛰️" },
    { id: "cauca-valley", label: "Cauca Valley", emoji: "🌄" },
    { id: "central-andes", label: "Central Andes", emoji: "🗻" },
    { id: "magdalena-valley", label: "Magdalena Valley", emoji: "🏞️" },
    { id: "eastern-andes", label: "Eastern Andes", emoji: "🏔️" },
    { id: "eastern-plains", label: "Eastern Plains", emoji: "🌾" },
    { id: "amazon", label: "Amazon Rainforest", emoji: "🌳" },
    { id: "colombian-massif", label: "Colombian Massif", emoji: "🏕️" },
    { id: "multiple", label: "Multiple Regions", emoji: "🗺️" },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleTourType = (tourType: string) => {
    setSelectedTourTypes((prev) => (prev.includes(tourType) ? prev.filter((t) => t !== tourType) : [...prev, tourType]))
  }

  const toggleRegion = (region: string) => {
    setSelectedRegions((prev) => (prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]))
  }

  const generateEmailLink = () => {
    const subject = encodeURIComponent("Colombian Birding Tour Inquiry")
    const body = encodeURIComponent(`Hello AVES Team,

I'm interested in planning a Colombian birding adventure. Here are my details:

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone || "Not provided"}
Travel Date: ${formData.travelDate || "Not specified"}
Group Size: ${formData.groupSize}
Desired Duration: ${formData.duration}
Experience Level: ${formData.experienceLevel}

Interested Tour Types: ${selectedTourTypes.length > 0 ? selectedTourTypes.join(", ") : "Not specified"}
Preferred Biogeographic Regions: ${selectedRegions.length > 0 ? selectedRegions.join(", ") : "Not specified"}

Special Interests/Requests: ${formData.specialRequests || "None specified"}

I look forward to hearing from you within 24 hours as mentioned on your website.

Best regards,
${formData.firstName} ${formData.lastName}`)

    return `mailto:info@aves.bio?subject=${subject}&body=${body}`
  }

  const faqItems = [
    {
      question: "How far in advance should I book my tour?",
      answer:
        "We recommend booking 3-6 months in advance, especially for peak birding seasons (December-March and July-August). Our small group sizes (maximum 4 guests) mean tours fill up quickly.",
    },
    {
      question: "What's included in your tour packages?",
      answer:
        "All tours include expert ornithologist guides, transportation, accommodation, meals, park entrance fees, and specialized birding equipment. International flights and personal items are not included.",
    },
    {
      question: "Do I need birding experience to join a tour?",
      answer:
        "Not at all! We welcome birders of all experience levels, from complete beginners to expert ornithologists. Our guides adapt the experience to match your skill level and interests.",
    },
    {
      question: "What makes AVES different from other tour operators?",
      answer:
        "We're B Corp certified, operate 100% carbon-neutral tours, maintain small group sizes (max 4 guests), and provide access to private reserves unavailable to other operators. Our guides are certified ornithologists, not just general nature guides.",
    },
  ]

  return (
    <section className={`bg-gradient-to-br from-emerald-50 to-blue-50 py-16 lg:py-24 ${className}`}>
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Plan Your Colombian Birding Adventure</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tell us about your birding interests. We'll respond within 24 hours with personalized recommendations.
            </p>
          </div>
        )}

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Form - Left Side */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl bg-white">
                <CardContent className="p-6 lg:p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Tell Us About Your Birding Interests</h3>
                  <p className="text-gray-600 mb-8">
                    The more details you provide, the better we can customize your Colombian birding experience.
                  </p>

                  <form className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                        <Input
                          placeholder="Your first name"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                        <Input
                          placeholder="Your last name"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <Input
                          placeholder="+1 (555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Travel Preferences */}
                    <div className="grid md:grid-cols-2 gap-4">
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
                        <Select
                          value={formData.groupSize}
                          onValueChange={(value) => handleInputChange("groupSize", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1 person">1 person</SelectItem>
                            <SelectItem value="2 people">2 people</SelectItem>
                            <SelectItem value="3 people">3 people</SelectItem>
                            <SelectItem value="4 people">4 people</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Desired Duration</label>
                        <Select
                          value={formData.duration}
                          onValueChange={(value) => handleInputChange("duration", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5 days">5 days</SelectItem>
                            <SelectItem value="8 days">8 days</SelectItem>
                            <SelectItem value="10 days">10 days</SelectItem>
                            <SelectItem value="14 days">14 days</SelectItem>
                            <SelectItem value="21 days">21 days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                        <Select
                          value={formData.experienceLevel}
                          onValueChange={(value) => handleInputChange("experienceLevel", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Beginner birder">Beginner birder</SelectItem>
                            <SelectItem value="Intermediate birder">Intermediate birder</SelectItem>
                            <SelectItem value="Advanced birder">Advanced birder</SelectItem>
                            <SelectItem value="Expert ornithologist">Expert ornithologist</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Tour Types */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Interested Tour Types (select all that apply)
                        </label>
                        <Link
                          href="/tours"
                          className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center gap-1"
                        >
                          View All Tours <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        {tourTypes.map((tour) => (
                          <div key={tour.id} className="flex items-center space-x-3">
                            <Checkbox
                              id={tour.id}
                              checked={selectedTourTypes.includes(tour.id)}
                              onCheckedChange={() => toggleTourType(tour.id)}
                            />
                            <label
                              htmlFor={tour.id}
                              className="text-sm text-gray-700 cursor-pointer flex items-center gap-2"
                            >
                              <span>{tour.icon}</span>
                              {tour.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Biogeographic Regions */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Preferred Biogeographic Regions (select all that interest you)
                        </label>
                        <Link
                          href="/aves-explorer"
                          className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center gap-1"
                        >
                          Explore Map <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3 max-h-48 overflow-y-auto border rounded-lg p-4 bg-gray-50">
                        {bioregions.map((region) => (
                          <div key={region.id} className="flex items-center space-x-3">
                            <Checkbox
                              id={region.id}
                              checked={selectedRegions.includes(region.id)}
                              onCheckedChange={() => toggleRegion(region.id)}
                            />
                            <label
                              htmlFor={region.id}
                              className="text-sm text-gray-700 cursor-pointer flex items-center gap-2"
                            >
                              <span>{region.emoji}</span>
                              {region.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Interests or Requests
                      </label>
                      <Textarea
                        placeholder="Tell us about specific birds you'd like to see, photography interests, accessibility needs, dietary restrictions, or any other special requests..."
                        rows={4}
                        value={formData.specialRequests}
                        onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <a href={generateEmailLink()}>
                        <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                          <Mail className="mr-2 w-5 h-5" />
                          Send My Inquiry
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </a>

                      <p className="text-sm text-gray-500 text-center mt-4">
                        We'll get back to you with personalized recommendations
                      </p>

                      {/* Google Calendar Button - Fixed without empty box */}
                      <div className="flex items-center justify-center mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span>Prefer to talk first?</span>
                          <GoogleCalendarButton variant="outline" size="sm" />
                        </div>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Right Side */}
            <div className="space-y-6">
              {/* Why Choose AVES */}
              <Card className="border-0 shadow-lg bg-emerald-50">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Why Choose AVES?</h4>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="text-emerald-600 flex-shrink-0 w-5 h-5 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900">Expert Ornithologist Guides</div>
                        <div className="text-sm text-gray-600">
                          Certified local experts with deep knowledge of Colombian avifauna
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Users className="text-emerald-600 flex-shrink-0 w-5 h-5 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900">Small Group Expeditions</div>
                        <div className="text-sm text-gray-600">
                          Maximum 4 guests per tour for personalized attention
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Award className="text-emerald-600 flex-shrink-0 w-5 h-5 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900">B Corp Certified</div>
                        <div className="text-sm text-gray-600">
                          100% carbon neutral with verified conservation impact
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Eye className="text-emerald-600 flex-shrink-0 w-5 h-5 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900">Exclusive Access</div>
                        <div className="text-sm text-gray-600">
                          Private reserves and research stations unavailable to others
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Get in Touch Directly</h4>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Mail className="text-emerald-600 flex-shrink-0 w-5 h-5 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900">Email</div>
                        <a href="mailto:info@aves.bio" className="text-emerald-600 hover:text-emerald-700">
                          info@aves.bio
                        </a>
                        <div className="text-sm text-gray-600">24-hour response guarantee</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="text-emerald-600 flex-shrink-0 w-5 h-5 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900">Based in</div>
                        <div className="text-gray-700">Vancouver, Canada and Bogotá, Colombia</div>
                        <div className="text-sm text-gray-600">Operating in Colombia</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h4>
                  <div className="space-y-3">
                    <Link href="/tours" className="flex items-center text-emerald-600 hover:text-emerald-700 text-sm">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Browse All Tours
                    </Link>
                    <Link
                      href="/aves-explorer"
                      className="flex items-center text-emerald-600 hover:text-emerald-700 text-sm"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Explore Interactive Map
                    </Link>
                    <Link href="/species" className="flex items-center text-emerald-600 hover:text-emerald-700 text-sm">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Bird Species Explorer
                    </Link>
                    <Link
                      href="/travel-tips"
                      className="flex items-center text-emerald-600 hover:text-emerald-700 text-sm"
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Travel Tips & Preparation
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        {showFAQ && (
          <div className="mt-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common questions about planning your Colombian birding adventure
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {faqItems.map((item, index) => (
                <Card key={index} className="border-0 shadow-lg bg-white">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">{item.question}</h4>
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
