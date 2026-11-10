"use client"

import { useCallback, useState, type ReactNode } from "react"
import SouthIslandHabitatProvider from "./south-island-habitat-context"
import { HomepageDestinationExplorerCore } from "./homepage-destination-explorer"

/** The route opens at the South Island; its map can explore outward without
 * retaining South Island editorial content beneath a different selected place.
 * The habitat/layer provider stays mounted throughout those scope changes.
 */
export default function SouthIslandUnifiedExplorer({ map, children }: { map:ReactNode; children:ReactNode }) {
  const [scope,setScope]=useState({country:"new-zealand",region:"south-island"})
  const change=useCallback((country:string,region:string)=>setScope(previous=>previous.country===country&&previous.region===region ? previous : {country,region}),[])
  const southIsland=scope.country==="new-zealand"&&scope.region==="south-island"
  const title=southIsland ? "Explore the South Island" : scope.country ? "Explore your destination" : "Explore the world"
  return <SouthIslandHabitatProvider>
    <section className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-7 max-w-3xl text-center"><h1 className="text-balance text-3xl font-medium tracking-tight text-emerald-950 sm:text-4xl">{title}</h1><p className="mt-4 leading-7 text-gray-600">Follow the birds, habitats and places. Zoom out to explore New Zealand and the world, then choose your next region.</p></div>
        <HomepageDestinationExplorerCore map={map} initialCountryId="new-zealand" initialRegionId="south-island" onScopeChange={change}/>
      </div>
    </section>
    {southIsland && children}
  </SouthIslandHabitatProvider>
}
