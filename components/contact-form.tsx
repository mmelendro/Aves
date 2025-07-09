"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, ArrowRight, ExternalLink, Map, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import {
  DURATION_OPTIONS,
  LOCATION_OPTIONS,
  TOUR_TYPE_OPTIONS,
  EXPERIENCE_LEVELS,
  GROUP_SIZE_OPTIONS,
} from "@/lib/form-options"

interface ContactFormProps {
  variant?: "homepage" | "contact"
}

export default function ContactForm({ variant = "homepage" }: ContactFormProps) {
  const [selectedTourTypes, setSelectedTourTypes] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

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
    // Clear any existing error messages when user starts typing
    if (submitStatus.type === "error") {
      setSubmitStatus({ type: null, message: "" })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setSubmitStatus({
        type: "error",
        message: "Please fill in your name and email address before submitting.",
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          selectedTourTypes,
          selectedLocations,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: result.message,
        })

        // Reset form after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          travelDate: "",
          groupSize: "1 person",
          desiredDuration: "8 days",
          experienceLevel: "Beginner birder",
          specialRequests: "",
        })
        setSelectedTourTypes([])
        setSelectedLocations([])
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to send inquiry. Please try again.",
        })
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
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

    return `mailto:info@aves.bio?subject=${subject}&body=${body}`
  }

  return (
    <div className="space-y-6">
      {/* Status Messages */}
      {submitStatus.type && (
        <div
          className={`p-4 rounded-lg border flex items-start gap-3 ${
            submitStatus.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {submitStatus.type === "success" ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          )}
          <div>
            <p className="font-medium">{submitStatus.type === "success" ? "Success!" : "Error"}</p>
            <p className="text-sm mt-1">{submitStatus.message}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700 mb-2 text-sm">First Name *</label>
            <Input
              placeholder="Your first name"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="h-11"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-2 text-sm">Last Name *</label>
            <Input
              placeholder="Your last name"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className="h-11"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium text-gray-700 mb-2 text-sm">Email Address *</label>
          <Input
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="h-11"
            required
          />
        </div>

        {/* Travel Date and Group Size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700 mb-2 text-sm">Travel Date</label>
            <Input
              type="date"
              value={formData.travelDate}
              onChange={(e) => handleInputChange("travelDate", e.target.value)}
              className="h-11"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-2 text-sm">Group Size</label>
            <select
              value={formData.groupSize}
              onChange={(e) => handleInputChange("groupSize", e.target.value)}
              className="w-full px-3 py-2 h-11 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {GROUP_SIZE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Duration and Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700 mb-2 text-sm">Duration</label>
            <select
              value={formData.desiredDuration}
              onChange={(e) => handleInputChange("desiredDuration", e.target.value)}
              className="w-full px-3 py-2 h-11 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {DURATION_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-2 text-sm">Experience Level</label>
            <select
              value={formData.experienceLevel}
              onChange={(e) => handleInputChange("experienceLevel", e.target.value)}
              className="w-full px-3 py-2 h-11 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
            <label className="block font-medium text-gray-700 text-sm">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {TOUR_TYPE_OPTIONS.map((tourType) => (
              <button
                key={tourType}
                type="button"
                onClick={() => toggleSelection(tourType, selectedTourTypes, setSelectedTourTypes)}
                className={`text-left rounded-lg border transition-all p-3 text-sm ${
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
            <label className="block font-medium text-gray-700 text-sm">
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
          <div className="border border-gray-200 rounded-lg bg-gray-50 max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
            <div className="p-2 space-y-1">
              {LOCATION_OPTIONS.map((location) => (
                <label
                  key={location}
                  className="flex items-center space-x-2 border border-gray-200 rounded-lg hover:bg-white cursor-pointer p-2 transition-colors duration-200 bg-white/80 hover:bg-white hover:shadow-sm"
                >
                  <input
                    type="checkbox"
                    checked={selectedLocations.includes(location)}
                    onChange={() => toggleSelection(location, selectedLocations, setSelectedLocations)}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 flex-shrink-0"
                  />
                  <span className="text-gray-700 text-xs leading-relaxed">{location}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label className="block font-medium text-gray-700 mb-2 text-sm">Special Interests or Requests</label>
          <textarea
            placeholder="Tell us about specific birds you'd like to see, photography interests, accessibility needs, dietary restrictions, or any other special requests..."
            value={formData.specialRequests}
            onChange={(e) => handleInputChange("specialRequests", e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 text-lg py-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Mail className="mr-2 w-5 h-5" />
              Send My Inquiry
              <ArrowRight className="ml-2 w-5 h-5" />
            </>
          )}
        </Button>

        {/* Fallback Email Link */}
        {submitStatus.type === "error" && (
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Having trouble? You can also email us directly:</p>
            <a
              href={generateEmailLink()}
              className="inline-flex items-center text-emerald-600 hover:text-emerald-700 hover:underline text-sm"
            >
              <Mail className="mr-1 w-4 h-4" />
              Open Email Client
              <ExternalLink className="ml-1 w-3 h-3" />
            </a>
          </div>
        )}

        <p className="text-gray-500 text-center text-sm">
          We'll respond within 24 hours with personalized recommendations
        </p>
      </form>
    </div>
  )
}
