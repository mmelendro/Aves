/**
 * Connects labels in the original Colombian map artwork to current web addresses.
 * Keep slugs aligned with content/regions.ts and the guides under app/regions.
 * Changing a displayed name is safer than changing a slug that visitors may have bookmarked.
 */
// Legacy artwork IDs map to the canonical guides and contact-form presets.
export const colombiaMapRegions = [
  { mapId: "Pacific", slug: "pacific" },
  { mapId: "Western Andes", slug: "western-andes" },
  { mapId: "Central Andes", slug: "central-andes" },
  { mapId: "Eastern Andes", slug: "eastern-andes" },
  { mapId: "Cauca Valley", slug: "cauca-valley" },
  { mapId: "Magdalena Valley", slug: "magdalena-valley" },
  { mapId: "Caribbean", slug: "caribbean" },
  { mapId: "SNSM", slug: "sierra-nevada-de-santa-marta" },
  { mapId: "Llanos", slug: "llanos" },
  { mapId: "Amazonia", slug: "amazonia" },
  { mapId: "Massif", slug: "colombian-massif" },
] as const

/** Return guide and inquiry links, falling back to the general explorer if the map ID is unknown. */
export function getRegionLinks(mapId: string) {
  const region = colombiaMapRegions.find(item => item.mapId === mapId)
  return region
    ? { guideHref: `/regions/${region.slug}`, enquiryHref: `/contact?region=${region.slug}` }
    : { guideHref: "/aves-explorer", enquiryHref: "/contact" }
}
