/**
 * Reusable labels and values for Colombian planning forms.
 * The arrays are public content, not confirmed travel products. `as const` keeps
 * their exact values in TypeScript; the derived types below avoid a second list.
 * resolveTourTypePreset accepts recognized old labels and stable URL tour IDs.
 */
// Shared form options to ensure consistency across all pages
export const DURATION_OPTIONS = [
  "4 days",
  "5 days",
  "6 days",
  "7 days",
  "8 days",
  "9 days",
  "10 days",
  "11 days",
  "12 days",
  "13 days",
  "14 days",
  "15+ days",
  "Flexible",
] as const

// Consolidated location options with concise English names and appropriate emojis
export const LOCATION_OPTIONS = [
  "🏖️ Caribbean Coast",
  "🏔️ Sierra Nevada de Santa Marta",
  "🌊 Pacific Coast Chocó",
  "⛰️ Western Andes",
  "🏞️ Cauca Valley",
  "🗻 Central Andes",
  "🌄 Magdalena Valley",
  "🏔️ Eastern Andes",
  "🌾 Eastern Plains",
  "🌳 Amazon Rainforest",
  "🌋 Colombian Massif",
  "🗺️ Multiple Regions",
  "✨ Let AVES Choose",
] as const

export const TOUR_TYPE_OPTIONS = [
  "🍃 Adventure Tours",
  "🪶 Vision Tours",
  "🌼 Elevate Tours",
  "🍓 Souls Tours",
] as const

export const CONTACT_TOUR_TYPE_OPTIONS = [
  "🍃 Adventure Tours",
  "🪶 Vision Tours",
  "🌼 Elevate Tours",
  "🍓 Souls Tours",
  "Custom Itinerary",
  "Not sure yet",
] as const

// Accept stable tour IDs as well as labels used by older links and recommendations.
export function resolveTourTypePreset(value: string | null | undefined): ContactTourTypeOption | undefined {
  const normalized = value?.trim().toLowerCase()
  if (!normalized) return undefined

  return CONTACT_TOUR_TYPE_OPTIONS.find((option, index) => {
    const label = (index < TOUR_TYPE_OPTIONS.length ? option.slice(option.indexOf(" ") + 1) : option).toLowerCase()
    const tourId = index < TOUR_TYPE_OPTIONS.length ? label.replace(/ tours$/, "") : undefined
    return normalized === option.toLowerCase() || normalized === label || normalized === tourId
  })
}

export const EXPERIENCE_LEVELS = [
  "Beginner birder",
  "Intermediate birder",
  "Advanced birder",
  "Professional/Guide",
] as const

export const GROUP_SIZE_OPTIONS = ["1 person", "2 people", "3 people", "4 people"] as const

// Additional options for shopping page and other components
export const tourOptions = TOUR_TYPE_OPTIONS.map((option) => ({
  value: option,
  label: option,
}))

export const regionOptions = LOCATION_OPTIONS.map((option) => ({
  value: option,
  label: option,
}))

export const accommodationOptions = [
  { value: "budget", label: "Budget Accommodations" },
  { value: "standard", label: "Standard Hotels" },
  { value: "premium", label: "Premium Lodges" },
  { value: "luxury", label: "Luxury Eco-Resorts" },
  { value: "mixed", label: "Mixed (Budget + Premium)" },
] as const

export const experienceOptions = EXPERIENCE_LEVELS.map((level) => ({
  value: level.toLowerCase().replace(/\s+/g, "-"),
  label: level,
}))

// Type definitions for better type safety
export type DurationOption = (typeof DURATION_OPTIONS)[number]
export type LocationOption = (typeof LOCATION_OPTIONS)[number]
export type TourTypeOption = (typeof TOUR_TYPE_OPTIONS)[number]
export type ContactTourTypeOption = (typeof CONTACT_TOUR_TYPE_OPTIONS)[number]
export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number]
export type GroupSizeOption = (typeof GROUP_SIZE_OPTIONS)[number]
export type AccommodationOption = (typeof accommodationOptions)[number]
export type TourOption = (typeof tourOptions)[number]
export type RegionOption = (typeof regionOptions)[number]
export type ExperienceOption = (typeof experienceOptions)[number]

export const transportOptions = [
  { value: "included", label: "All Transport Included" },
  { value: "partial", label: "Partial Transport Included" },
  { value: "self-arranged", label: "Self-Arranged Transport" },
  { value: "flexible", label: "Flexible Transport Options" },
] as const
