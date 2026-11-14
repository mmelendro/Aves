/**
 * Colombia inquiry form, shared by the country homepage and contact page.
 * Inputs are kept in React state and submitted to the shared local inquiry API.
 * This browser component never writes directly to the database and contains no secrets;
 * the API must validate and protect every request regardless of browser checks.
 */
"use client"
import { useReadOnlyPreview } from "@/components/preview-mode"
import { useUnsavedChanges } from "@/components/account/unsaved-changes"
import { enquiryHref } from "@/lib/enquiry-entry"

import { useColombiaHomeCopy } from "@/components/colombia-home-language"
import React, { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, CheckCircle, Users, Award, Eye, ArrowRight, Globe, ExternalLink } from "lucide-react"
import Link from "next/link"
import { GoogleCalendarButton } from "@/components/google-calendar-button"
import { makeColombiaInquiry } from "@/lib/colombia-inquiry"
import { canonicalColombiaRegion, sharedAccountHref } from "@/lib/shared-account"

interface ContactFormSectionProps {
  showTitle?: boolean
  showFAQ?: boolean
  className?: string
}

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


export function ContactFormSection({
  showTitle = true,
  showFAQ = false,
  className = "",
}: ContactFormSectionProps) {
  const readOnly = useReadOnlyPreview()
  const localizeHome = useColombiaHomeCopy()
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [feedback, setFeedback] = useState("")
  const [updates, setUpdates] = useState(false)
  const [website, setWebsite] = useState("")
  const [dirty, setDirty] = useState(false)
  useUnsavedChanges(dirty, "You have an unfinished enquiry. Leave and discard your answers?")
  // Refs update immediately: the lock catches double-clicks before React re-renders.
  // An unchanged retry reuses its request key, allowing the API to avoid duplicate inquiries.
  const inFlight = useRef(false)
  const submission = useRef<{body: string; key: string} | null>(null)

  // Region/tour links can prefill the form. Only recognised values are accepted here;
  // this convenience is not a substitute for validation by the receiving API.
  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const aliases: Record<string, string> = { "sierra-nevada-de-santa-marta": "sierra-nevada", pacific: "pacific-choco", llanos: "eastern-plains", amazonia: "amazon", "cauca-river": "cauca-valley" }
    const raw = (query.get("region") || query.get("regions") || "").split(",")
    const selected = raw.map(value => canonicalColombiaRegion(value)).filter(Boolean).map(value => Object.hasOwn(aliases, value!) ? aliases[value!] : value!)
    if (selected.length) setSelectedRegions(selected.filter(id => bioregions.some(region => region.id === id)))
    const tour = query.get("tour") || query.get("preset")
    if (tour && tourTypes.some(item => item.id === tour)) setSelectedTourTypes([tour])
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setDirty(true)
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleTourType = (tourType: string) => {
    setDirty(true)
    setSelectedTourTypes((prev) => (prev.includes(tourType) ? prev.filter((t) => t !== tourType) : [...prev, tourType]))
  }

  const toggleRegion = (region: string) => {
    setDirty(true)
    setSelectedRegions((prev) => (prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (readOnly) { setFeedback("Sending is disabled in this preview. Please use live AVES."); return }
    if (inFlight.current) return
    inFlight.current = true
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setFeedback("")
    try {
      // Convert presentation labels into the shared contact API contract. No private key is sent.
      const body = JSON.stringify(makeColombiaInquiry(formData, selectedRegions, selectedTourTypes, updates, website))
      if (submission.current?.body !== body) submission.current = {body, key: crypto.randomUUID()}
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": submission.current.key },
        body,
      })
      const result = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(result?.error || "Your inquiry could not be saved. Please try again.")
      // HTTP success alone is insufficient: require confirmation of the saved Colombia inquiry.
      if (result?.success !== true || result?.status !== "stored" || result?.intent !== "inquiry" || result?.country !== "colombia") {
        throw new Error("We couldn't confirm that your inquiry was saved. Please try again.")
      }
      setSubmitStatus("success")
      setDirty(false)
    } catch (error) {
      setSubmitStatus("error")
      setFeedback(error instanceof Error ? error.message : "Your inquiry could not be saved. Please try again.")
    } finally {
      inFlight.current = false
      setIsSubmitting(false)
    }
  }

  const faqItems = [
    {
      question: "When should I start planning?",
      answer:
        "Share your preferred dates and how flexible you can be. Timing, access and availability depend on the itinerary and will be discussed before any booking is arranged.",
    },
    {
      question: "What will my proposal include?",
      answer:
        "Your proposal will set out the suggested itinerary, price in Australian dollars (AUD), inclusions, exclusions and any validity date. Guiding, transport, accommodation, meals, fees and equipment arrangements must be confirmed for your particular trip.",
    },
    {
      question: "Do I need birding experience to join a tour?",
      answer:
        "Tell us your experience level, interests and preferred pace so we can discuss suitable options. Any guiding arrangements and practical requirements will be confirmed for the proposed itinerary.",
    },
    {
      question: "What makes AVES different from other tour operators?",
      answer:
        "B Corp certification is an ambition. We shape personal birding itineraries around your interests, with guiding, access, group size and inclusions confirmed in your proposal.",
    },
  ]

  return localizeHome((
    <section id="inquiry" className={`bg-gradient-to-br from-emerald-50 to-blue-50 py-16 lg:py-24 ${className}`}>
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Plan Your Colombian Birding Adventure</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tell us about your birding interests. We'll review your ideas and reply personally.
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

                  <form className="space-y-6" onChangeCapture={() => setDirty(true)} onSubmit={handleSubmit}>
            <fieldset disabled={readOnly || isSubmitting} className="contents">
                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                        <Input
                          placeholder="Your first name"
                          maxLength={59}
                          aria-label="First name"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                        <Input
                          placeholder="Your last name"
                          maxLength={59}
                          aria-label="Last name"
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
                          maxLength={254}
                          aria-label="Email address"
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
                          maxLength={50}
                          aria-label="Phone number"
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
                          aria-label="Preferred travel date"
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
                          <SelectTrigger aria-label="Group size">
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
                          <SelectTrigger aria-label="Desired duration">
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
                          <SelectTrigger aria-label="Experience level">
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
                        maxLength={4000}
                        aria-label="Special interests or requests"
                        placeholder="Tell us about specific birds you'd like to see, photography interests, accessibility needs, dietary restrictions, or any other special requests..."
                        rows={4}
                        value={formData.specialRequests}
                        onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                      />
                    </div>

                    {/* Empty bot-trap field; real visitors skip it. Updates require a separate opt-in. */}
                    <div className="hidden" aria-hidden="true"><label>Website<input name="website" autoComplete="off" tabIndex={-1} value={website} onChange={event => setWebsite(event.target.value)} /></label></div>
                    <label className="flex items-start gap-3 text-sm text-gray-700"><input type="checkbox" className="mt-1 accent-emerald-600" checked={updates} onChange={event => setUpdates(event.target.checked)} /><span>Email me AVES Colombia trip news and updates. I can unsubscribe at any time.</span></label>
                    <p className="text-sm text-gray-500">Updates are optional. We'll use your details to respond to this inquiry. <Link href="/privacy" className="text-emerald-700 underline">Read our privacy information</Link>.</p>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                        disabled={readOnly || isSubmitting}
                      >
                        <Mail className="mr-2 w-5 h-5" />
                        {isSubmitting ? "Sending..." : "Send My Inquiry"}
                        {!isSubmitting && <ArrowRight className="ml-2 w-4 h-4" />}
                      </Button>

                      {submitStatus === "success" && (
                        <p role="status" className="text-sm text-emerald-600 text-center mt-4 font-medium">
                          Your inquiry has been saved for AVES to review. We'll reply personally.
                        </p>
                      )}
                      {submitStatus === "error" && (
                        <p role="alert" className="text-sm text-red-600 text-center mt-4">
                          {feedback} Your details are still here so you can retry.
                        </p>
                      )}
                      {submitStatus === "idle" && (
                        <p className="text-sm text-gray-500 text-center mt-4">
                          We'll get back to you with personalized recommendations
                        </p>
                      )}
                      <p className="mt-4 text-center text-sm"><a href={sharedAccountHref(selectedRegions.length === 1 ? selectedRegions[0] : undefined)} className="inline-flex min-h-11 items-center font-medium text-emerald-700 underline underline-offset-4">Save ideas and request a priced proposal in My Trips</a></p>

                      {/* Google Calendar Button - Fixed without empty box */}
                      <div className="flex items-center justify-center mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span>Prefer to talk first?</span>
                          <GoogleCalendarButton variant="outline" size="sm" />
                        </div>
                      </div>
                    </div>
                  </fieldset>
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
                        <div className="font-semibold text-gray-900">Birding Around Your Interests</div>
                        <div className="text-sm text-gray-600">
                          Discuss the birds, habitats and pace that interest you
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Users className="text-emerald-600 flex-shrink-0 w-5 h-5 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900">Your Group, Your Plans</div>
                        <div className="text-sm text-gray-600">
                          Group size and arrangements confirmed in your proposal
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Award className="text-emerald-600 flex-shrink-0 w-5 h-5 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900">B Corp Preparation</div>
                        <div className="text-sm text-gray-600">
                          AVES is not currently certified; no assessment outcome is claimed
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Eye className="text-emerald-600 flex-shrink-0 w-5 h-5 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900">Places Worth Exploring</div>
                        <div className="text-sm text-gray-600">
                          Routes and access discussed for your preferred regions
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Get in Touch</h4>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Mail className="text-emerald-600 flex-shrink-0 w-5 h-5 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900">Have a question?</div>
                        <a href={enquiryHref("colombia")} className="inline-flex min-h-11 items-center text-emerald-600 hover:text-emerald-700 underline">
                          Send AVES a message
                        </a>
                        <div className="text-sm text-gray-600">Contact AVES about your inquiry or proposal</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="text-emerald-600 flex-shrink-0 w-5 h-5 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900">Based in</div>
                        <div className="text-gray-700">Sydney, Australia and Bogotá, Colombia</div>
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
  ))
}
