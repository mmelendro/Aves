import {placeGalleryPhotos} from "@/lib/place-gallery"
import northCatalogue from "@/content/north-island-trip-catalogue.json"
import catalogue from "@/content/south-island-trip-catalogue.json"
import pilot from "@/content/bcorp-south-island-pilot.json"
import { publicPlaces } from "@/lib/south-island-public-places"

/** Public place IDs only. This tab basket is never a private-save receipt. */
export const nzPlanningPlaces = [
  { id: "mountains", label: "Arthur’s Pass" },
  { id: "forest-and-lakes", label: "Nelson Lakes" },
  { id: "southern-forest", label: "Fiordland" },
  { id: "coast", label: "Otago & the Catlins" },
] as const
export const nzLandscapeIdeas = placeGalleryPhotos.filter(photo=>photo.countryId==="new-zealand").map(photo=>({id:`landscape:${photo.id}`,label:photo.caption,regionId:photo.regionId,sourceUrl:photo.sourceUrl,creator:photo.creator,licence:photo.licence}))
const landscapes=new Map(nzLandscapeIdeas.map(photo=>[photo.id,photo]))
export const nzPublicPlanningPlaces = [...nzLandscapeIdeas,...nzPlanningPlaces, ...publicPlaces.points.map(({id,name})=>({id,label:name})), ...pilot.records.map(({id,name})=>({id,label:name})), ...catalogue.places.map(({id,name})=>({id,label:name})), ...northCatalogue.places.map(({id,name})=>({id,label:name}))]
const names = new Map<string, string>(nzPublicPlanningPlaces.map(place => [place.id, place.label]))
export const NZ_PLACE_IDEAS_EVENT = "aves:nz-place-ideas-changed"
export const NZ_PLACE_IDEAS_KEY = "aves:nz-place-ideas:v1"
const lifetime = 86400000
export function validNzPlaceIdeas(ids: unknown): ids is string[] {
  return Array.isArray(ids) && ids.length <= names.size && new Set(ids).size === ids.length
    && ids.every(id => typeof id === "string" && names.has(id))
}
export function readNzPlaceIdeas(storage: Pick<Storage,"getItem" | "removeItem">, now = Date.now()): string[] {
  try {
    const value = JSON.parse(storage.getItem(NZ_PLACE_IDEAS_KEY) || "null")
    if (value?.version === 1 && Number.isFinite(value.at) && now >= value.at && now - value.at <= lifetime && validNzPlaceIdeas(value.ids)) return value.ids
    storage.removeItem(NZ_PLACE_IDEAS_KEY)
  } catch { /* Blocked storage never claims a saved choice. */ }
  return []
}
export function writeNzPlaceIdeas(storage: Pick<Storage,"setItem" | "removeItem">, ids: string[], now = Date.now()) {
  if (!validNzPlaceIdeas(ids)) return false
  try {
    if (ids.length) storage.setItem(NZ_PLACE_IDEAS_KEY, JSON.stringify({version:1,at:now,ids}))
    else storage.removeItem(NZ_PLACE_IDEAS_KEY)
    return true
  } catch { return false }
}
const lineFor = (id: string) => {
  const photo=landscapes.get(id)
  return photo ? `Landscape idea: ${photo.label}. Photo: ${photo.creator}; ${photo.licence}. Source: ${photo.sourceUrl}` : `Place idea: ${names.get(id)}`
}
/** Plain public labels can be copied when a browser cannot carry the tab basket. */
export function nzPlaceIdeaText(ids: string[]) {
  return validNzPlaceIdeas(ids) ? ids.map(lineFor).join("\n") : ""
}
/** The guest deliberately appends readable ideas to the existing private notes. */
export function mergeNzPlaceNotes(message: string, ids: string[]): {message:string; error?:string} {
  if (!validNzPlaceIdeas(ids)) return {message,error:"These place choices could not be verified. Please choose them again."}
  const existing = new Set(message.split(/\r?\n/).map(line => line.trim()))
  const added = ids.map(lineFor).filter(line => !existing.has(line))
  const merged = added.length ? `${message}${message && !message.endsWith("\n") ? "\n\n" : ""}${added.join("\n")}` : message
  return merged.length <= 5000 ? {message:merged} : {message,error:"Your notes are nearly full. Shorten them before adding place ideas; your existing notes are unchanged."}
}
/** Call only with the server-confirmed saved message. Preserve newer ideas. */
export function consumeSavedNzPlaceIdeas(storage: Pick<Storage,"getItem" | "removeItem" | "setItem">, savedMessage: string) {
  const lines = new Set(savedMessage.split(/\r?\n/).map(line => line.trim()))
  const remaining = readNzPlaceIdeas(storage).filter(id => !lines.has(lineFor(id)))
  return writeNzPlaceIdeas(storage, remaining)
}
