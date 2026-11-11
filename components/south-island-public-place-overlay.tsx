"use client"

import NzPlaceIdeas from "./nz-place-ideas"
import { bcorpCategoryLabel } from "@/lib/bcorp-pilot"
import { useMapLayers } from "./map-layer-context"
import { publicPlaceCategories, visiblePublicPlaces } from "@/lib/south-island-public-places"
import { ecosystemMapPoint } from "@/lib/ecosystem-map-camera"
import map from "@/content/south-island-ecosystem-map.json"

export default function SouthIslandPublicPlaceOverlay({ unit }: { unit: number }) {
  const { layers, update } = useMapLayers()
  return <g data-map-layer="public-places">
    {visiblePublicPlaces(layers).map(point => {
      const xy = ecosystemMapPoint(point.longitude, point.latitude, map.bbox)
      const selected = point.id === layers.point
      const colour = publicPlaceCategories.find(category => point.categories.includes(category.id) && layers[category.id])!.colour
      return <g key={point.id} role="button" tabIndex={0} aria-label={`Preview public place: ${point.name}`} aria-pressed={selected} className="cursor-pointer outline-none [&:focus-visible>circle:first-of-type]:stroke-emerald-700" onClick={() => update({point:point.id,park:""})} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); update({point:point.id,park:""}) } }}>
        <title>{point.name} · {point.precision}</title>
        <circle cx={xy.x} cy={xy.y} r={22*unit} fill="transparent" />
        <circle cx={xy.x} cy={xy.y} r={(selected ? 9 : 6)*unit} fill={selected ? colour : "#fff"} stroke={colour} strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <circle cx={xy.x} cy={xy.y} r={selected ? 3*unit : 0} fill="white" />
      </g>
    })}
  </g>
}

export function PublicPlaceDetails() {
  const { layers, update } = useMapLayers()
  const point = visiblePublicPlaces(layers).find(point => point.id === layers.point)
  if (!point) return null
  return <section aria-label="Selected public place" className="my-2 shrink-0 rounded-lg border border-emerald-200 bg-white p-2 text-xs leading-5">
    <div className="flex items-center justify-between gap-2"><p role="status" className="font-semibold text-emerald-950">{point.name}</p><button type="button" className="min-h-11 shrink-0 rounded px-2 text-emerald-800 underline" onClick={() => update({point:""})}>Clear place</button></div>
    <p className="mt-1 text-[11px] text-gray-600">{point.precision} · checked {point.checked}</p>
    <details className="max-h-48 overflow-auto"><summary className="min-h-11 cursor-pointer content-center rounded font-semibold text-emerald-800 underline">About this place & sources</summary>
    <p>{point.description}</p>
    <p className="mt-1 text-[11px] text-emerald-800">{publicPlaceCategories.filter(category=>point.categories.includes(category.id)).map(category=>category.name).join(" · ")}</p>
    <a href={point.url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded font-semibold text-emerald-800 underline">{point.categories.includes("towns") ? "View settlement data source" : "Visitor information at source"}<span className="sr-only"> (opens in a new tab)</span></a>
    {point.evidenceUrl && <p><a href={point.evidenceUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded text-emerald-800 underline">Operator's published conservation information<span className="sr-only"> (opens in a new tab)</span></a></p>}
    {point.categories.includes("businesses") && <p className="text-[11px] text-gray-600">Public listing, not an AVES partner, certification, sustainability rating or confirmed booking.</p>}
    {point.bcorp && <div className="space-y-1">
      <p className="font-medium">{bcorpCategoryLabel(point.bcorp.category)} · Certified company: {point.bcorp.company}</p>
      <p>{point.bcorp.location.address}</p>
      <p>{point.bcorp.certification.scopeNote} Profile checked {point.bcorp.certification.checkedAt}.</p>
      <p><a href={point.bcorp.certification.profileUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center underline">View B Lab certification profile<span className="sr-only"> (opens in a new tab)</span></a></p>
      <p><a href={point.bcorp.location.coordinateSourceUrl!} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center underline">Address point source<span className="sr-only"> (opens in a new tab)</span></a> · <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center underline">© OpenStreetMap contributors · ODbL<span className="sr-only"> (opens in a new tab)</span></a></p>
    </div>}
    </details>
    <details className="max-h-48 overflow-auto"><summary className="min-h-11 cursor-pointer content-center rounded font-semibold text-emerald-800 underline">Add to your trip ideas</summary><NzPlaceIdeas key={point.id} placeId={point.id}/></details>
  </section>
}
