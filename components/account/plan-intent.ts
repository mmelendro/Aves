import { countryRegionOptions, type TripCountry } from "@/content/trip-options"
import type { AccountSearchParams } from "./account-navigation"

export type PlanIntent = { country: TripCountry; regions: string[] }

export function planIntentFromSearch(search: AccountSearchParams): PlanIntent | undefined {
  if (search.country === undefined && search.region === undefined) return undefined
  if (search.country !== undefined && search.country !== "australia" && search.country !== "colombia") return undefined
  const country = search.country === "colombia" ? "colombia" : "australia"
  const region = typeof search.region === "string" && countryRegionOptions[country].some(item => item.id === search.region) ? search.region : undefined
  return { country, regions: region ? [region] : [] }
}

export function accountPlanPath(intent?: PlanIntent): string {
  if (!intent) return "/account"
  const params = new URLSearchParams({ country: intent.country })
  if (intent.regions[0]) params.set("region", intent.regions[0])
  return `/account?${params}`
}

export function normalizePlanRegions(country: TripCountry, regions: string[]): string[] {
  const options = countryRegionOptions[country]
  return [...new Set(regions.map(value => options.find(option => option.id === value || option.label === value)?.id || value))]
}
