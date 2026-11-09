"use client"

/** Homepage-only presentation. Geometry and guide URLs remain the reviewed originals.
 * The select and full-name list provide 44px alternatives to small map locations.
 * First map activation previews; a later activation opens its real guide URL.
 */
import { useId, useState } from "react"
import { ArrowRight, Feather } from "lucide-react"
import { colombiaMapMarkers } from "@/content/colombia-map-markers"
import { australiaMapStates, australiaMapViewBox, australiaMapProvenance } from "@/content/global-australian-map"
import colombiaBoundaries from "@/content/colombia-planning-boundaries.json"
import nz from "@/content/new-zealand-map.json"
import { newZealandRegionHref } from "@/lib/new-zealand-region-links"
import { useRegionPreview } from "./use-region-preview"
import { destinationRegions } from "@/content/destination-regions"
import MapFeatherMarker from "./map-feather-marker"
import styles from "./homepage-country-map-card.module.css"

type Region = { id: string; name: string; href: string; x: number; y: number }
const nzAnchors = [[389,184], [235,419], [135,572]]
const regionsByCountry: Record<string, Region[]> = {
  colombia: colombiaMapMarkers.map(region => ({ id: region.slug, name: region.name, href: `/regions/${region.slug}`, x: region.x * 6.34, y: region.y * 8.02 })),
  australia: australiaMapStates.filter(state => state.regionId).map(state => ({ id: state.regionId!, name: state.name, href: `/australia/regions/${state.regionId}`, x: state.label[0], y: state.label[1] })),
  "new-zealand": nz.islands.map((island,index) => ({ id: island.id, name: island.label, href: newZealandRegionHref(island.id), x: nzAnchors[index][0], y: nzAnchors[index][1] })),
}
const geography: Record<string, string> = { colombia: "Planning regions", australia: "States and territories", "new-zealand": "Main islands" }

export default function HomepageCountryMapCard({ country, name, href }: { country: string; name: string; href: string }) {
  const regions = regionsByCountry[country]
  const [activeId, setActiveId] = useState(regions[0].id)
  const preview = useRegionPreview(setActiveId)
  const description = destinationRegions[country]?.find(region => region.id === activeId)?.description
  const active = regions.find(region => region.id === activeId) || regions[0]
  const id = useId().replace(/:/g, "")
  const viewBox = country === "colombia" ? "0 0 634 802" : country === "australia" ? australiaMapViewBox : nz.viewBox
  const [vx,vy,vw,vh] = viewBox.split(" ").map(Number)
  // Uniform fit into the same inner frame. Never stretch the original geometry.
  const scale = Math.min(320 / vw, 244 / vh)
  const point = { x: 20 + (320-vw*scale)/2 + (active.x-vx)*scale, y: 60 + (244-vh*scale)/2 + (active.y-vy)*scale }
  const focusRegion = (region: Region) => ({ onKeyDown: (event: React.KeyboardEvent) => preview.activateKey(event, region.id, region.href), onClick: (event: React.MouseEvent) => preview.activate(event, region.id), onFocus: () => setActiveId(region.id), onPointerEnter: (event: React.PointerEvent) => { if (event.pointerType !== "touch") setActiveId(region.id) } })
  return <article className={styles.card} aria-label={`${name} regional map`} data-country-map-card={country}>
    <header className={styles.header}><h3>{name}</h3><p>{geography[country]} · {regions.length} destinations</p></header>
    <div className={styles.canvas}>
      <p className={styles.callout}><Feather size={16} aria-hidden="true"/>{active.name}</p>
      <svg viewBox="0 45 360 275" role="group" aria-label={`${name}: ${geography[country].toLowerCase()}`} preserveAspectRatio="xMidYMid meet">
        <defs><filter id={`land-${id}`} colorInterpolationFilters="sRGB"><feFlood floodColor="#c5dbd0"/><feComposite in2="SourceAlpha" operator="in"/></filter></defs>
        <svg x="20" y="60" width="320" height="244" viewBox={viewBox} preserveAspectRatio="xMidYMid meet" aria-hidden={country === "colombia" ? true : undefined}>
          {country === "colombia" ? <g><image href="/images/birding-regions-colombia-final.png" width="634" height="802" filter={`url(#land-${id})`} />{colombiaBoundaries.regions.map(region => <path key={region.name} d={region.path} fill="none" stroke="#6e9582" strokeWidth=".85" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />)}</g>
            : country === "australia" ? australiaMapStates.filter(state => state.regionId).map(state => <a key={state.regionId} href={`/australia/regions/${state.regionId}`} aria-label={`Explore ${state.name}`} {...focusRegion(regions.find(region => region.id === state.regionId)!)} className={styles.area} data-active={activeId === state.regionId}><path d={state.path} fillRule="evenodd" vectorEffect="non-scaling-stroke"/></a>)
            : nz.islands.map(island => <a key={island.id} href={newZealandRegionHref(island.id)} aria-label={`Explore ${island.label}`} {...focusRegion(regions.find(region => region.id === island.id)!)} className={styles.area} data-active={activeId === island.id}>{island.paths.map((path,index) => <path key={index} d={path} fillRule="evenodd" vectorEffect="non-scaling-stroke"/>)}</a>)}
        </svg>
        {country === "colombia" && regions.map(region => {
          const x=20+(320-vw*scale)/2+(region.x-vx)*scale, y=60+(244-vh*scale)/2+(region.y-vy)*scale
          return <a key={region.id} href={region.href} aria-label={`Explore ${region.name}`} {...focusRegion(region)} className={styles.location} data-active={activeId === region.id}><circle cx={x} cy={y} r="8"/><circle cx={x} cy={y} r="15" fill="transparent" stroke="none"/></a>
        })}
        <g transform={`translate(${point.x-14},${point.y-14})`} pointerEvents="none"><MapFeatherMarker /></g>
      </svg>
    </div>
    <div className={styles.controls}>
      <p className="mb-2 text-xs leading-5 text-gray-600">Tap a region to preview. Tap it again, or choose Explore, to open its guide.</p>
      {description && <p className="mb-2 text-xs leading-5 text-emerald-900" aria-live="polite">{description}</p>}
      <label htmlFor={`region-${id}`}>Locate a {country === "new-zealand" ? "main island" : country === "australia" ? "state or territory" : "planning region"}</label>
      <select id={`region-${id}`} value={active.id} onChange={event => preview.preview(event.target.value)}>{regions.map(region => <option key={region.id} value={region.id}>{region.name}</option>)}</select>
      <a className={styles.regionAction} href={active.href}>Explore {active.name}<ArrowRight aria-hidden="true" size={16}/></a>
    </div>
    <p className={styles.credit}>{country === "colombia" ? "AVES map artwork · Representative planning locations, not regional boundaries." : <><a href={country === "australia" ? australiaMapProvenance.sourceUrl : nz.source.url}>Natural Earth</a> · Public domain · {country === "australia" ? "External territories not shown." : "Main islands shown."}</>}</p>
    <details className={styles.details}><summary>Browse all {regions.length} {country === "new-zealand" ? "islands" : country === "australia" ? "states and territories" : "regions"}</summary><ul>{regions.map(region => <li key={region.id}><a href={region.href} onFocus={() => setActiveId(region.id)} data-active={activeId === region.id}>{region.name}</a></li>)}</ul></details>
    <a href={href} className={styles.countryAction}>Explore {name}<ArrowRight aria-hidden="true" size={16}/></a>
  </article>
}
