/** Public factual names/status from the complete published OSNZ main checklist.
 * This is a versioned reference, not a promise of current sightings or access.
 * Historical extinct entries remain searchable but cannot become trip targets.
 */
import checklist from "./new-zealand-checklist.json"

export const newZealandChecklist = checklist.species
export const newZealandChecklistSource = checklist.source
export const nzBirdById = new Map(newZealandChecklist.map(bird => [bird.id, bird]))
export const selectableNzBirds = newZealandChecklist.filter(bird => !bird.extinct)
const selectableIds = new Set(selectableNzBirds.map(bird => bird.id))

export function validNzBirdIds(value: unknown): value is string[] {
  return Array.isArray(value) && value.length <= selectableNzBirds.length
    && new Set(value).size === value.length && value.every(id => typeof id === "string" && selectableIds.has(id))
}

/** Featured photos sometimes name a subspecies. Select its parent species once. */
export function featuredNzBirdId(scientificName: string): string | undefined {
  const speciesName = scientificName.trim().split(/\s+/).slice(0, 2).join(" ")
  return selectableNzBirds.find(bird => bird.scientificName === speciesName)?.id
}

export function nzBirdName(id: string): string {
  const bird = nzBirdById.get(id)
  return bird ? `${bird.commonName}${bird.maoriName ? ` / ${bird.maoriName}` : ""}` : "Previously selected bird"
}
