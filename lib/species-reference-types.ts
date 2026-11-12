/** Public source-version facts. A national record is never a regional sighting. */
import type { NzChecklistMedia } from "@/content/new-zealand-checklist-media"

export type SpeciesCountry = "colombia" | "australia" | "new-zealand"
export type SpeciesSource = {
  id: string; title: string; url: string; dataUrl: string; edition: string
  reviewed: string; sha256: string; usage?: string; license?: string
}
export type ReferenceSpecies = {
  id: string; scientificName: string; commonName: string; localName: string; family: string
  origin: string; occurrence: string; sourceStatus: string; sourceId: string
  aliases: string[]; historical: boolean; referenceOnly: boolean
  previousScientificName?: string; sourceCrosswalk?: string; nameSourceId?: string
  sourceFlags?: string[]; populationStatus?: string; statusSourceId?: string; regionalExtinction?: boolean
}
export type SpeciesReference = {
  countryId: SpeciesCountry; name: string; schemaVersion: number; reviewed: string; scope: string
  sources: SpeciesSource[]; species: ReferenceSpecies[]
  excludedRows: { row: number; previousName: string; reason: string }[]
}
export type SpeciesRegion = { id: string; name: string; reviewedCount: number }
export type SpeciesPlace = {
  id: string; name: string; url: string; regionId: string; encounter: string
  activities: string[]; access: string; reviewed: string
}
export type ReferenceResult = ReferenceSpecies & {
  regions: { id: string; name: string; href: string }[]
  places: SpeciesPlace[]
  guide?: { href: string; image: string; name: string }
  media?: NzChecklistMedia
}
export type SpeciesReferenceResponse = {
  countryId: SpeciesCountry; name: string; scope: string; reviewed: string; sources: SpeciesSource[]
  total: number; defaultTotal: number; matched: number; offset: number; limit: number
  excludedRows: SpeciesReference["excludedRows"]; regions: SpeciesRegion[]; regionalCoverage: number
  results: ReferenceResult[]
}
