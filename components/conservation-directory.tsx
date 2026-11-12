"use client"

import directory from "@/content/conservation-directory.json"
import {sourceFreshness} from "@/lib/source-freshness"
import type {DestinationRegion} from "@/content/destination-regions"
import {useColombiaHomeCopy} from "@/components/colombia-home-language"

export default function ConservationDirectory({countryId, regions, mapHref, onRegionChange}: {
  countryId:string; regions:readonly DestinationRegion[]; mapHref:string; onRegionChange:(id:string)=>void
}) {
  const localizeHome=useColombiaHomeCopy()
  const records = directory.records.filter(record => record.countryId === countryId)
  if (!records.length) return null
  return localizeHome(<details className="mt-6 rounded-xl border border-emerald-200 bg-white p-4 text-sm leading-6">
    <summary className="min-h-11 cursor-pointer font-medium text-emerald-950">Conservation directory · reviewed regional references</summary>
    <p className="mt-3">Explore organisations and their published work. Map links show the broad planning region. Listings do not imply an AVES partnership, certification, current access or independently measured impact.</p>
    {records.map(record => <article key={record.id} className="mt-4 border-t pt-3">
      <h3 className="font-semibold">{record.name}</h3>
      <p className="text-xs text-gray-600">{record.location}</p>
      <p className="mt-2">{record.description}</p>
      <p className="mt-2 text-xs">Source checked {record.checkedAt}. {sourceFreshness(record.checkedAt) === "reviewed" ? "Confirm current arrangements with the organisation." : "Source review due. Recheck before relying on this listing."}</p>
      <div className="mt-2 flex flex-wrap gap-4">
        <a className="inline-flex min-h-11 items-center text-emerald-800 underline" href={record.sourceUrl} target="_blank" rel="noopener noreferrer">Organisation’s evidence<span className="sr-only">: {record.name} (opens in a new tab)</span></a>
        <a className="inline-flex min-h-11 items-center text-emerald-800 underline" href={record.visitorUrl} target="_blank" rel="noopener noreferrer">Current visitor guidance<span className="sr-only">: {record.name} (opens in a new tab)</span></a>
        <a className="inline-flex min-h-11 items-center text-emerald-800 underline" href={mapHref} onClick={() => onRegionChange(record.regionId)}>Show planning region<span className="sr-only">: {regions.find(region => region.id === record.regionId)?.name}</span></a>
      </div>
    </article>)}
  </details>)
}
