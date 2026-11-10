/** Origin comes only from the published checklist, independently of rarity. */
export type NzOriginFilter = "all" | "native" | "endemic" | "introduced" | "unknown"
type ReferenceBird = { id: string; commonName: string; maoriName?: string; scientificName: string; family?: string; origin?: string }
const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
export function nzOriginGroup(origin?: string): Exclude<NzOriginFilter, "all"> {
  switch (origin?.trim().toLowerCase()) {
    case "endemic": return "endemic"
    case "native": return "native"
    case "introduced": return "introduced"
    default: return "unknown"
  }
}
export function matchesNzOrigin(origin: string | undefined, filter: NzOriginFilter) {
  const group = nzOriginGroup(origin)
  return filter === "all" || filter === group || filter === "native" && group === "endemic"
}
export function nzOriginLabel(origin?: string) {
  const group = nzOriginGroup(origin)
  return group === "endemic" ? "Endemic to New Zealand" : group === "native" ? "Native species" : group === "introduced" ? "Introduced species" : "Origin not confirmed"
}
export function filterNzBirds<T extends ReferenceBird>(birds: readonly T[], options: {
  query: string; origin: NzOriginFilter; selectedOnly: boolean; selected: readonly string[]
}): T[] {
  const term = normalize(options.query.trim())
  const selected = new Set(options.selected)
  return birds.filter(bird => (!options.selectedOnly || selected.has(bird.id))
    && matchesNzOrigin(bird.origin, options.origin)
    && (!term || normalize([bird.commonName, bird.maoriName, bird.scientificName, bird.family].filter(Boolean).join(" ")).includes(term)))
}
