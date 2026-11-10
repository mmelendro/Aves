"use client"

import { useCallback, useState, type ReactNode } from "react"
import SouthIslandHabitatProvider from "./south-island-habitat-context"
import { destinations } from "@/components/public-explorer/content/destinations"
import { destinationRegions } from "@/components/public-explorer/content/destination-regions"
import { useColombiaHomeCopy } from "./colombia-home-language"
import { placeInSentence } from "@/components/public-explorer/lib/place-language"
import { HomepageDestinationExplorerCore } from "./homepage-destination-explorer"

/** The route opens at its own country/region; its map can explore outward without
 * retaining the original editorial content beneath a different selected place.
 * The habitat/layer provider stays mounted throughout those scope changes.
 */
export default function DestinationExplorerPage({ map, children, initialRegionId, initialCountryId="new-zealand", titleStyle="explore" }: { map:ReactNode; children:ReactNode; initialRegionId?:string; initialCountryId?:string; titleStyle?:"explore"|"birding" }) {
  const localizeHome=useColombiaHomeCopy()
  const [scope,setScope]=useState({country:initialCountryId,region:initialRegionId ?? ""})
  const change=useCallback((country:string,region:string)=>setScope(previous=>previous.country===country&&previous.region===region ? previous : {country,region}),[])
  const showEditorial=scope.country===initialCountryId&&scope.region===(initialRegionId ?? "")
  const region=destinationRegions[scope.country]?.find(item=>item.id===scope.region)
  const country=destinations.find(item=>item.id===scope.country)
  const title=country ? `${titleStyle==="birding" && region ? "Birding in" : "Explore"} ${placeInSentence(region?.name || country.name)}` : "Explore the world"
  return localizeHome(<SouthIslandHabitatProvider>
    <section className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-7 max-w-3xl text-center"><h1 className="text-balance text-3xl font-medium tracking-tight text-emerald-950 sm:text-4xl">{title}</h1><p className="mt-4 leading-7 text-gray-600">Follow the birds, habitats and places. Zoom out to explore the country and the world, then choose your next region.</p></div>
        <HomepageDestinationExplorerCore map={map} initialCountryId={initialCountryId} initialRegionId={initialRegionId} onScopeChange={change}/>
      </div>
    </section>
    {showEditorial && children}
  </SouthIslandHabitatProvider>)
}
