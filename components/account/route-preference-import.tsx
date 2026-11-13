"use client"
import {useUiCopy} from "@/components/ui-copy-context"
import {routePreferences,routeTiming} from "@/lib/route-preferences"
import type {TripDraft} from "@/lib/island-planning-types"
export default function RoutePreferenceImport({routes,onApply}:{routes:TripDraft[];onApply:(draft:TripDraft)=>void}){
 const uiCopy=useUiCopy()
 if(!routes.length)return null
 return <section className="rounded-xl border border-emerald-200 p-5 space-y-4" aria-label={uiCopy("Review route preferences")}><h3 className="font-medium">{uiCopy("Review route preferences")}</h3><p className="text-sm leading-6">{uiCopy("Choose a route to copy its timing, party and allowance preferences into this unsaved brief. Existing general budget answers remain separate. Nothing is saved, converted or booked by this action.")}</p>{routes.map(draft=>{const p=routePreferences(draft);return <details key={p.islandId}><summary className="min-h-11 cursor-pointer">{p.islandId==='north-island'?uiCopy("North Island"):uiCopy("South Island")} · {p.days} {uiCopy("days")}</summary><dl className="space-y-2 text-sm"><div><dt>{uiCopy("Travel Timing")}</dt><dd>{routeTiming(p)}</dd></div><div><dt>{uiCopy("Group Size")}</dt><dd>{p.adults} {uiCopy("adults")} · {p.rooms} {uiCopy("rooms/units")}</dd></div><div><dt>{uiCopy("Spending preferences")}</dt><dd>{p.currency} · {uiCopy(p.activityBasis==='day'?"Activities per day":"Activities per primary or alternative outing")}</dd></div>{Object.entries(p.allowances).map(([k,v])=><div key={k}><dt>{uiCopy(k)}</dt><dd>{p.currency} {v}</dd></div>)}</dl><button type="button" className="mt-3 min-h-11 rounded-lg border border-emerald-400 px-4" onClick={()=>onApply(draft)}>{uiCopy("Use this route's preferences")}</button></details>})}</section>
}
