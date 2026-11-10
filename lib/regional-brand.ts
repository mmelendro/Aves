import catalogue from "@/content/regional-brand-birds.json"

export interface RegionalBrandBird {
  name: string
  scientificName: string
  file: string
  facing: string
  source: string
  rationale: string
}

const birds: Record<string, RegionalBrandBird> = catalogue.birds

/** Unknown place falls back to its actual region, then country, never another country. */
export function regionalBrandBird(country = "global", regionId?: string, placeId?: string): RegionalBrandBird {
  return (placeId && birds[`${country}/${placeId}`]) ||
    (regionId && birds[`${country}/${regionId}`]) || birds[`${country}/country`] || birds.global
}
