/**
 * Builds links from Colombia into the single AVES account and inquiry system.
 * A slug is the stable URL name, such as "eastern-andes". These helpers preserve
 * the traveller's country/region choice; they do not sign in or grant access.
 */
import { colombiaMapRegions } from "./region-links"

// Translate historical names so old bookmarks still select the right current region.
const regionAliases: Record<string, string> = {
  "sierra-nevada": "sierra-nevada-de-santa-marta",
  snsm: "sierra-nevada-de-santa-marta",
  "pacific-choco": "pacific",
  choco: "pacific",
  "eastern-plains": "llanos",
  amazon: "amazonia",
  "cauca-river": "cauca-valley",
}

/** Return a recognized current region slug, or undefined for an unknown value. */
export function canonicalColombiaRegion(value: string | undefined): string | undefined {
  const normalized = value?.trim().toLowerCase()
  if (!normalized) return undefined
  const slug = Object.hasOwn(regionAliases, normalized) ? regionAliases[normalized] : normalized
  return colombiaMapRegions.some(region => region.slug === slug) ? slug : undefined
}

/** URLSearchParams safely encodes the country and optional validated region. */
export function sharedAccountPath(region?: string): string {
  const query = new URLSearchParams({country: "colombia"})
  const canonical = canonicalColombiaRegion(region)
  if (canonical) query.set("region", canonical)
  return `/account?${query}`
}

// Native compatibility links enter the shared account routes in this application.
export function sharedAccountHref(region?: string): string {
  return sharedAccountPath(region)
}

/** Carry the intended account destination through sign-in/sign-up as the next parameter. */
export function sharedSignInHref(mode: "sign-in" | "sign-up" = "sign-in", region?: string): string {
  return `/account/${mode}?${new URLSearchParams({next: sharedAccountPath(region)})}`
}

/** Translate old planning links into the maintained contact form using allowed presets only. */
export function legacyPlanningHref(query: Record<string, string | string[] | undefined>): string {
  const first = (value: string | string[] | undefined) => typeof value === "string" ? value : undefined
  const params = new URLSearchParams()
  const regions = (first(query.region) || first(query.regions) || "").split(",")
    .map(canonicalColombiaRegion).filter((value): value is string => Boolean(value))
  if (regions.length === 1) params.set("region", regions[0])
  else if (regions.length > 1) params.set("regions", [...new Set(regions)].join(","))
  const tour = first(query.tour) || first(query.preset)
  if (tour && ["adventure", "vision", "elevate", "souls"].includes(tour)) params.set("tour", tour)
  if (first(query.preset) === "sierra-nevada") {
    params.set("region", "sierra-nevada-de-santa-marta")
    params.set("tour", "adventure")
  }
  return `/contact${params.size ? `?${params}` : ""}`
}
