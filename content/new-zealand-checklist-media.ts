/** Portable reference-image adapter. IDs follow the checklist; original credits stay intact. */
import catalogue from "./new-zealand-checklist-thumbnails.json"
import { nzChecklistPhotos } from "./new-zealand-checklist-photos"

export type NzChecklistMedia = {
  bird: { commonName: string; scientificName: string; image: string }
  credit: { creator: string; location: string; title: string; sourceUrl: string; license: string; licenseUrl: string; modifications: string }
  kind?: "photograph" | "illustration"
}

export const nzChecklistMedia = new Map<string, NzChecklistMedia>(catalogue.images.map(image => [image.id, {
  bird: { commonName: image.commonName, scientificName: image.scientificName, image: image.asset },
  credit: { creator: image.creator, location: "See original source", title: "Original image and provenance", sourceUrl: image.sourceUrl, license: image.license, licenseUrl: image.licenseUrl, modifications: image.modifications },
  kind: "kind" in image && image.kind === "illustration" ? "illustration" : "photograph",
}]))
// Prefer the existing larger, individually reviewed photographs where available.
for (const [id, photo] of nzChecklistPhotos) nzChecklistMedia.set(id, { ...photo, kind: "photograph" })
