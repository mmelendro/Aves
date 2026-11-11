import { eligibleBcorpPilotPins, type BcorpPilotRecord } from "@/lib/bcorp-pilot"
import data from "@/content/south-island-public-places.json"

export const publicPlaceCategories = [
  { id: "nature", name: "Nature & birding places", colour: "#047857" },
  { id: "projects", name: "Conservation projects", colour: "#4d7c0f" },
  { id: "heritage", name: "Public heritage sites", colour: "#9a3412" },
  { id: "towns", name: "Cities & towns", colour: "#334155" },
  { id: "businesses", name: "Ecotourism businesses", colour: "#6d28d9" },
  { id: "bcorps", name: "Certified B Corp businesses", colour: "#0369a1" },
] as const
export type PublicPlaceCategory = typeof publicPlaceCategories[number]["id"]
export type PublicPlace = typeof data.points[number] & { bcorp?: BcorpPilotRecord }
export function reviewedPublicPlaces(now=Date.now()): PublicPlace[] {
  return [...data.points, ...eligibleBcorpPilotPins("new-zealand", "south-island", now).map(record => ({
    id: record.id, name: record.name, categories: ["bcorps"],
    ...record.location.coordinates!, description: record.limitations,
    url: record.location.sourceUrl, coordinateSource: "OpenStreetMap contributors, ODbL 1.0",
    precision: record.location.precision, checked: record.location.checkedAt,
    evidenceUrl: "", bcorp: record,
  }))]
}
export function visiblePublicPlaces(layers: Record<PublicPlaceCategory, boolean>, now=Date.now()) {
  return reviewedPublicPlaces(now).filter(point => point.categories.some(category => layers[category as PublicPlaceCategory]))
}
export { data as publicPlaces }
