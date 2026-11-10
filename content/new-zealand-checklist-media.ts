/** Public reference snapshot only. No plan/user data belongs in this catalogue. */
import catalogue from "./new-zealand-checklist-media.json"

export type NzChecklistMedia = {
  id: string
  commonName: string
  scientificName: string
  asset: string
  kind: string
  credit: { creator: string; location: string; title: string; sourceUrl: string; license: string; licenseUrl: string; modifications: string }
}
export const nzChecklistMedia = new Map<string, NzChecklistMedia>(catalogue.images.map(image => [image.id, image]))
