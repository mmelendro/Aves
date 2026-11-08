/** Shared planning-region markers on the existing Colombian map artwork. */
import { colombiaMapRegions } from "@/lib/region-links"

// The same artwork positions used by the full Colombia Explorer. These are
// planning regions, not species coordinates or official ecological boundaries.
export const colombiaMapMarkers = [
  { mapId: "Pacific", name: "Pacific Coast & Chocó", x: 8, y: 65 },
  { mapId: "Western Andes", name: "Western Andes", x: 20, y: 52 },
  { mapId: "Central Andes", name: "Central Andes", x: 32, y: 48 },
  { mapId: "Eastern Andes", name: "Eastern Andes", x: 48, y: 42 },
  { mapId: "Cauca Valley", name: "Cauca Valley", x: 26, y: 40 },
  { mapId: "Magdalena Valley", name: "Magdalena Valley", x: 40, y: 36 },
  { mapId: "Caribbean", name: "Caribbean", x: 36, y: 18 },
  { mapId: "SNSM", name: "Sierra Nevada de Santa Marta", x: 47, y: 10 },
  { mapId: "Llanos", name: "Llanos", x: 70, y: 42 },
  { mapId: "Amazonia", name: "Amazonia", x: 56, y: 78 },
  { mapId: "Massif", name: "Colombian Massif", x: 20, y: 65 },
].map(marker => {
  const region = colombiaMapRegions.find(region => region.mapId === marker.mapId)
  if (!region) throw new Error(`Unknown Colombia map region: ${marker.mapId}`)
  return { ...marker, slug: region.slug }
})

