"use client"
import {useId,useState} from "react"
import {compareTripPlans} from "@/lib/compare-trip-plans"
import type {TripPlan} from "./account-api"
export default function CompareSavedTrips({plans}:{plans:TripPlan[]}){
 const id=useId(),[leftId,setLeft]=useState(plans[0]?.id??""),[rightId,setRight]=useState(plans[1]?.id??"")
 const left=plans.find(p=>p.id===leftId),right=plans.find(p=>p.id===rightId)
 if(plans.length<2)return <p className="text-sm">Save two trip plans to compare their itineraries and planning answers here.</p>
 return <section aria-label="Compare saved itineraries" className="min-w-0 space-y-4">
  <h3 className="text-xl font-medium">Compare your saved itineraries</h3><p className="text-sm leading-6 text-gray-600">Saved versions only. Notes show each itinerary as you saved it. Unspecified dates, journey times and prices stay unknown. Allowances remain separate from quotes.</p>
  <div className="grid gap-4 sm:grid-cols-2">{[{label:"First trip",value:leftId,set:setLeft},{label:"Second trip",value:rightId,set:setRight}].map((field,index)=><label key={field.label} htmlFor={`${id}-${index}`}>{field.label}<select id={`${id}-${index}`} aria-label={field.label} className="mt-1 block min-h-11 w-full min-w-0 rounded border px-2" value={field.value} onChange={e=>field.set(e.target.value)}>{plans.map(p=><option key={p.id} value={p.id}>{p.title}</option>)}</select></label>)}</div>
  {left&&right&&left.id!==right.id?<><div className="overflow-x-auto"><table className="w-full border-collapse text-left text-sm"><caption className="sr-only">Saved planning differences</caption><thead><tr><th className="border p-3">Planning detail</th><th className="border p-3">{left.title}</th><th className="border p-3">{right.title}</th></tr></thead><tbody>{compareTripPlans(left,right).map(row=><tr key={row.label} className={row.different?"bg-emerald-50":""}><th scope="row" className="border p-3">{row.label}{row.different&&<span className="block text-xs font-normal">Different</span>}</th><td className="border p-3">{row.left}</td><td className="border p-3">{row.right}</td></tr>)}</tbody></table></div><div className="grid gap-4 sm:grid-cols-2">{[left,right].map(p=><article key={p.id} className="min-w-0 rounded-xl border p-4"><h4 className="font-medium">{p.title}: saved itinerary and notes</h4><p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6">{p.message||"No itinerary or notes saved."}</p></article>)}</div></>:<p role="status">Choose two different saved trips.</p>}
 </section>
}
