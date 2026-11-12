"use client"

import {useId, useState} from "react"
import {eligibleBcorpPilotPins, bcorpBusinessCategories, bcorpCategoryLabel} from "@/lib/bcorp-pilot"
import {useMapLayers} from "./map-layer-context"

/** Company evidence stays distinct from an outlet, pickup point or AVES relationship. */
export default function BcorpDirectory() {
  const id = useId()
  const [category, setCategory] = useState("all")
  const {update} = useMapLayers()
  const records = eligibleBcorpPilotPins("new-zealand", "south-island")
  const shown = records.filter(record => category === "all" || record.category === category)
  return <details className="rounded-xl border p-4 text-sm leading-6">
    <summary className="min-h-11 cursor-pointer font-medium">B Corp company directory · South Island pilot</summary>
    <p className="mt-3">Five public location references from four companies. Certification belongs to the named company. A listed outlet, hotel or pickup point is not separately certified. These are independent listings, not AVES suppliers or partners.</p>
    <label htmlFor={id} className="mt-3 block">Type of business</label>
    <select id={id} className="mt-1 min-h-11 w-full rounded-lg border bg-white px-3" value={category} onChange={event => setCategory(event.target.value)}>
      <option value="all">All reviewed categories</option>
      {bcorpBusinessCategories.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
    </select>
    <p role="status" className="mt-3">{shown.length} reviewed location references</p>
    {shown.map(record => <article key={record.id} className="mt-4 border-t pt-3">
      <h4 className="font-semibold">{record.name}</h4>
      <p>{bcorpCategoryLabel(record.category)} · Certified company: {record.company}</p>
      <p>{record.certification.scopeNote}</p>
      <p className="mt-2">{record.location.address}. {record.location.precision}.</p>
      <p className="mt-2 text-xs text-gray-600">{record.limitations}</p>
      <p className="mt-2 text-xs">Company profile checked {record.certification.checkedAt}. Location checked {record.location.checkedAt}.</p>
      <div className="mt-2 flex flex-wrap gap-4">
        <a className="inline-flex min-h-11 items-center underline" href={record.certification.profileUrl} target="_blank" rel="noopener noreferrer">B Lab company profile<span className="sr-only">: {record.company} (opens in a new tab)</span></a>
        <a className="inline-flex min-h-11 items-center underline" href={record.location.sourceUrl} target="_blank" rel="noopener noreferrer">Business location source<span className="sr-only">: {record.name} (opens in a new tab)</span></a>
        <a className="inline-flex min-h-11 items-center underline" href="#south-island-bird-map" onClick={() => update({bcorps:true, point:record.id})}>Show company reference on map<span className="sr-only">: {record.name}</span></a>
      </div>
    </article>)}
    {!shown.length && <p className="mt-3">No current reviewed entries in this category. Expired or incomplete source checks are excluded from the directory and map.</p>}
  </details>
}
