import profiles from "@/content/landscape-profiles.json"
import { newZealandRegionHref } from "./new-zealand-region-links"
import type { BrandSelection } from "./brand-context"

/** Labels follow explicit destination selection, never camera movement. */
export function brandLocation(context: BrandSelection) {
 const country = profiles.profiles.find(p => p.country === context.country && p.level === "country")
 if (!country) return undefined
 const region = profiles.profiles.find(p => p.country === context.country && p.level === "region" && p.selectionId === context.regionId)
 const countryHref = `/${context.country}`
 const href = !region ? countryHref : context.country === "colombia" ? `/regions/${region.selectionId}` : context.country === "new-zealand" ? newZealandRegionHref(region.selectionId) : `/australia/regions/${region.selectionId}`
 return { name:region?.name ?? country.name, href, countryName:country.name, countryHref, regional:Boolean(region) }
}
