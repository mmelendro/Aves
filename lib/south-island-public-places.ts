import data from "@/content/south-island-public-places.json"

export const publicPlaceCategories = [
  { id: "nature", name: "Nature & birding places", colour: "#047857" },
  { id: "projects", name: "Conservation projects", colour: "#4d7c0f" },
  { id: "heritage", name: "Public heritage sites", colour: "#9a3412" },
  { id: "towns", name: "Cities & towns", colour: "#334155" },
  { id: "businesses", name: "Ecotourism businesses", colour: "#6d28d9" },
] as const
export type PublicPlaceCategory = typeof publicPlaceCategories[number]["id"]
export function visiblePublicPlaces(layers: Record<PublicPlaceCategory, boolean>) {
  return data.points.filter(point => point.categories.some(category => layers[category as PublicPlaceCategory]))
}
export { data as publicPlaces }
