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

// Consolidated location options that include both geographic regions and bioregions
export const LOCATION_OPTIONS = [
  "Quetzal Highlands (Western Andes)",
  "Hummingbird Haven (Central Andes)",
  "Páramo Paradise (Eastern Andes)",
  "Wetland Wonders (Llanos)",
  "Canopy Kingdom (Amazon)",
  "Endemic Empire (Biogeographic Chocó)",
  "Coastal Crown (Caribbean + Sierra Nevada)",
  "Valley Voyager (Cauca Valley)",
  "River Realm (Magdalena Valley)",
  "Massif Majesty (Macizo Colombiano)",
  "Multiple Regions",
  "Let AVES Choose",
] as const

export const TOUR_TYPE_OPTIONS = ["🍃 AVES Adventure", "🪶 AVES Vision", "🌼 AVES Elevate", "🍓 AVES Souls"] as const

export const CONTACT_TOUR_TYPE_OPTIONS = [
  "🍃 AVES Adventure",
  "🪶 AVES Vision",
  "🌼 AVES Elevate",
  "🍓 AVES Souls",
  "Custom Itinerary",
  "Not sure yet",
] as const

export const EXPERIENCE_LEVELS = [
  "Beginner birder",
  "Intermediate birder",
  "Advanced birder",
  "Professional/Guide",
] as const

export const GROUP_SIZE_OPTIONS = ["1 person", "2 people", "3 people", "4 people"] as const

// Type definitions for better type safety
export type DurationOption = (typeof DURATION_OPTIONS)[number]
export type LocationOption = (typeof LOCATION_OPTIONS)[number]
export type TourTypeOption = (typeof TOUR_TYPE_OPTIONS)[number]
export type ContactTourTypeOption = (typeof CONTACT_TOUR_TYPE_OPTIONS)[number]
export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number]
export type GroupSizeOption = (typeof GROUP_SIZE_OPTIONS)[number]
