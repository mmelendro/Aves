/**
 * Canonical public guides for New Zealand's planning islands.
 * Only South Island has a dedicated guide today. Other islands retain the
 * existing country-page sections until their own pages are published.
 */
export function newZealandRegionHref(id: string): string {
  if (id === "south-island") return "/new-zealand/south-island"
  if (id === "north-island" || id === "rakiura") return `/new-zealand#region-${id}`
  return "/new-zealand#regions"
}
