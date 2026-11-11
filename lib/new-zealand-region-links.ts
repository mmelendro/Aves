/**
 * Canonical public guides for New Zealand's planning islands.
 * North and South Island have dedicated guides. Rakiura retains the
 * existing country-page sections until their own pages are published.
 */
export function newZealandRegionHref(id: string): string {
  if (id === "south-island" || id === "north-island") return `/new-zealand/${id}`
  if (id === "rakiura") return `/new-zealand#region-${id}`
  return "/new-zealand#regions"
}
