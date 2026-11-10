/** Small map-side previews reuse the same reviewed geometry as the explorer. */
import { australiaMapStates, australiaMapViewBox } from "@/content/global-australian-map"
import nz from "@/content/new-zealand-map.json"
import boundaries from "@/content/colombia-planning-boundaries.json"
import { colombiaMapMarkers } from "@/content/colombia-map-markers"

export type GuideMapCue = { label: string; image: string; viewBox: string; selectedPath?: string; point?: readonly [number, number] }
export function guideMapCue(country?: string, regionId?: string, regionLabel?: string): GuideMapCue {
  if (country === "australia") {
    const selected = australiaMapStates.find(state => state.regionId === regionId)
    return { label: regionLabel || selected?.name || "Australia", image:"/images/map-cues/australia.svg", viewBox:australiaMapViewBox, selectedPath:selected?.path, point:selected?.label }
  }
  if (country === "new-zealand") {
    const selected = nz.islands.find(island => island.id === regionId)
    return { label:regionLabel || selected?.label || "New Zealand", image:"/images/map-cues/new-zealand.svg", viewBox:nz.viewBox, selectedPath:selected?.paths.join(" ") }
  }
  if (country === "colombia") {
    const marker = colombiaMapMarkers.find(region => region.slug === regionId)
    return { label:regionLabel || marker?.name || "Colombia", image:"/images/map-cues/colombia.svg", viewBox:boundaries.viewBox, selectedPath:boundaries.regions.find(region => region.name === marker?.name)?.path }
  }
  return {label:"World map",image:"/images/map-cues/world.svg",viewBox:"0 0 1000 572"}
}
