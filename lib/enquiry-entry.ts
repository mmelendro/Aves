import { countryRegionLabels, isEnabledTripCountry, type TripCountry } from "@/content/trip-options"
import { canonicalColombiaRegion } from "./shared-account"

const tourIds = ["adventure", "vision", "elevate", "souls"]

/** Public context only. Never copy names, email addresses or private brief text
 * into an enquiry URL. Server submission validation remains authoritative. */
export function enquiryContext(params: URLSearchParams, fallback: TripCountry = "colombia") {
  const single = (key: string) => params.getAll(key).length === 1 ? params.get(key) : null
  const requested = single("country")
  const country = single("topic") === "new-zealand" ? "new-zealand"
    : isEnabledTripCountry(requested) ? requested : fallback
  const rawRegion = single("region") || ""
  const candidate = country === "colombia" ? canonicalColombiaRegion(rawRegion) || "" : rawRegion
  const region = Object.hasOwn(countryRegionLabels[country], candidate) ? candidate : ""
  const tour = single("tour") || single("preset") || ""
  return { country, region, tour: tourIds.includes(tour) ? tour : "", intent: country === "australia" && single("intent") === "waitlist" ? "waitlist" as const : "inquiry" as const }
}

export function enquiryHref(country: string, region = "", tour = "", intent = "inquiry") {
  const input = new URLSearchParams({ country, region, tour, intent })
  const context = enquiryContext(input)
  const params = new URLSearchParams({ country: context.country })
  if (context.country === "new-zealand") params.set("topic", "new-zealand")
  if (context.region) params.set("region", context.region)
  if (context.tour) params.set("tour", context.tour)
  if (context.intent === "waitlist") params.set("intent", context.intent)
  return `/contact?${params}#inquiry`
}

export function enquiryParams(query: Record<string, string | string[] | undefined>) {
  const params = new URLSearchParams()
  // Repeated keys are ambiguous, so accept a hint only when it has one value.
  for (const key of ["country", "region", "tour", "preset", "intent", "topic"]) {
    if (typeof query[key] === "string") params.set(key, query[key])
  }
  return params
}
