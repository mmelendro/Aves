import { destinations } from "@/content/destinations"
import { destinationRegions } from "@/content/destination-regions"

export type ExplorerLocation = { country: string; region: string }

/** Only public, known geographic IDs belong in explorer URLs. Bird wishes and
 * private planning answers remain in their existing separate storage flows. */
export function explorerLocation(country = "", region = ""): ExplorerLocation {
  const regions = Object.hasOwn(destinationRegions,country) ? destinationRegions[country] : undefined
  return destinations.some(item=>item.id===country) ? {country,region:regions?.some(item=>item.id===region) ? region : ""} : {country:"",region:""}
}

export function readExplorerLocation(search:string, fallback:ExplorerLocation):ExplorerLocation {
  const query = new URLSearchParams(search)
  if (!query.has("explore")) return explorerLocation(fallback.country,fallback.region)
  const country=query.get("explore") || "world"
  if(country==="world")return explorerLocation()
  if(!destinations.some(item=>item.id===country))return explorerLocation(fallback.country,fallback.region)
  return explorerLocation(country,query.get("region") || "")
}

export function explorerLocationHref(href:string,location:ExplorerLocation):string {
  const url=new URL(href,"https://aves.bio")
  const known=explorerLocation(location.country,location.region)
  url.searchParams.delete("place")
  // This is a change inside the mounted explorer, not a route navigation.
  // Keep its page shell on refresh and Back/Forward. Explicit guide links still
  // open the canonical country/region page through the existing hierarchy.
  url.searchParams.set("explore",known.country || "world")
  if(known.region)url.searchParams.set("region",known.region);else url.searchParams.delete("region")
  return `${url.pathname}${url.search}${url.hash}`
}
