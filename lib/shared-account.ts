import { colombiaMapRegions } from "./region-links"

const regionAliases: Record<string, string> = {
  "sierra-nevada": "sierra-nevada-de-santa-marta",
  snsm: "sierra-nevada-de-santa-marta",
  "pacific-choco": "pacific",
  choco: "pacific",
  "eastern-plains": "llanos",
  amazon: "amazonia",
  "cauca-river": "cauca-valley",
}

export function canonicalColombiaRegion(value: string | undefined): string | undefined {
  const normalized = value?.trim().toLowerCase()
  if (!normalized) return undefined
  const slug = Object.hasOwn(regionAliases, normalized) ? regionAliases[normalized] : normalized
  return colombiaMapRegions.some(region => region.slug === slug) ? slug : undefined
}

export function sharedAccountPath(region?: string): string {
  const query = new URLSearchParams({country: "colombia"})
  const canonical = canonicalColombiaRegion(region)
  if (canonical) query.set("region", canonical)
  return `/account?${query}`
}

// Native links cross into the shared portal's independently deployed Next app.
export function sharedAccountHref(region?: string): string {
  return `/australia${sharedAccountPath(region)}`
}

export function sharedSignInHref(mode: "sign-in" | "sign-up" = "sign-in", region?: string): string {
  return `/australia/account/${mode}?${new URLSearchParams({next: sharedAccountPath(region)})}`
}

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
