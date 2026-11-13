"use client"
import {useUiCopy} from "@/components/ui-copy-context"
import {useIslandPlanner} from "./island-planner-context"
import {nzRouteReading} from "@/content/nz-route-reading"
import {sourceFreshness} from "@/lib/source-freshness"
import {useMapLayers} from "@/components/map-layer-context"
import BcorpDirectory from "@/components/bcorp-directory"
import {publicPlaces} from "@/lib/south-island-public-places"
export default function RouteReading() {
 const uiCopy=useUiCopy()

 const {context}=useIslandPlanner()
 const {update}=useMapLayers()
 const region=context.id === "north-island" ? "north-island" : "south-island"
 return <section className="mt-10 space-y-5" aria-label={uiCopy("Route sources and conservation references")}>
  <h3 className="text-2xl font-medium text-emerald-950">{uiCopy("Read before you plan")}</h3>
  <p className="text-sm leading-6 text-gray-600">{uiCopy("Official guidance and dated personal accounts serve different purposes. Check current access with the original publisher. Historical stories do not establish today’s services, dates or sightings.")}</p>
  <div className="grid gap-4 md:grid-cols-2">{nzRouteReading.filter(item=>item.region===region).map(item=><article key={item.id} className="rounded-xl border p-4 text-sm leading-6">
   <p className="text-xs text-emerald-800">{item.kind} · {item.place}</p>
   <h4 className="mt-2 font-semibold">{item.publisher}{item.author ? ` · ${item.author}` : ""}</h4>
   <p className="mt-2">{item.summary}</p>
   {item.publishedOn && <p className="mt-2 text-amber-900">{uiCopy("Published ")}{item.publishedOn}{uiCopy(". Historical account.")}</p>}
   <p className="mt-2 text-xs">{uiCopy("Source checked ")}{item.reviewedOn}{sourceFreshness(item.reviewedOn)==="review-due" ? uiCopy(" · Review due. Recheck the publisher before relying on this reference.") : uiCopy(" · Check current arrangements.")}</p>
   <a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center text-emerald-800 underline">{uiCopy("Read original source")}<span className="sr-only">: {item.place}, {item.kind} {uiCopy(" (opens in a new tab)")}</span></a>
  </article>)}</div>
  {region==="south-island" && <details className="rounded-xl border p-4 text-sm leading-6"><summary className="min-h-11 cursor-pointer font-medium">{uiCopy("Conservation directory · South Island pilot")}</summary>
   <p className="mt-3">{uiCopy("Two reviewed public references. The sanctuary and operator describe their own work. Listings are independent of AVES and do not establish a partnership or an audited impact result.")}</p>
   {publicPlaces.points.filter(point=>["orokonui","abel-tasman-eco-tours"].includes(point.id)).map(point=><article key={point.id} className="mt-4 border-t pt-3"><h4 className="font-semibold">{point.name}</h4><p>{point.description}</p><p className="text-xs">{uiCopy("Source reviewed ")}{point.checked}. {point.precision}.</p><div className="flex flex-wrap gap-4"><a href={point.evidenceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline">{uiCopy("Organisation’s evidence")}<span className="sr-only">: {point.name} {uiCopy(" (opens in a new tab)")}</span></a><a href="#south-island-bird-map" className="inline-flex min-h-11 items-center underline" onClick={()=>update({projects:true,point:point.id})}>{uiCopy("Show public reference on map")}<span className="sr-only">: {point.name}</span></a></div></article>)}
  </details>}
  {region==="south-island" && <BcorpDirectory />}
 </section>
}
