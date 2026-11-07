/**
 * Turn a destination/region link into optional new-plan form defaults.
 * These query parameters are hints, not saved records or permission to book.
 * Unknown or disabled destinations are not accepted as new-plan intent.
 */

import { countryRegionOptions, isEnabledTripCountry, DEFAULT_TRIP_COUNTRY, type TripCountry } from "@/content/trip-options"
import type { AccountSearchParams } from "./account-navigation"

export type PlanIntent = { country: TripCountry; regions: string[] }

/**
 * Return valid enabled-country/region defaults from query input, or undefined when no usable intent exists.
 */
export function planIntentFromSearch(search: AccountSearchParams): PlanIntent | undefined {
  if (search.country === undefined && search.region === undefined) return undefined
  if (search.country !== undefined && !isEnabledTripCountry(search.country)) return undefined
  const country = search.country ?? DEFAULT_TRIP_COUNTRY
  const region = typeof search.region === "string" && countryRegionOptions[country].some(item => item.id === search.region) ? search.region : undefined
  return { country, regions: region ? [region] : [] }
}

/**
 * Build the shared My Trips link with optional country/first-region prefill; this saves nothing.
 */
export function accountPlanPath(intent?: PlanIntent): string {
  if (!intent) return "/account"
  const params = new URLSearchParams({ country: intent.country })
  if (intent.regions[0]) params.set("region", intent.regions[0])
  return `/account?${params}`
}

/**
 * Convert known labels to IDs and remove duplicates, preserving unknown historical values for review.
 * The server decides whether those old values may remain on that specific plan.
 */
export function normalizePlanRegions(country: TripCountry, regions: string[]): string[] {
  const options = countryRegionOptions[country]
  return [...new Set(regions.map(value => options.find(option => option.id === value || option.label === value)?.id || value))]
}
