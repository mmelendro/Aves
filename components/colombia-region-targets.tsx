"use client"

import type { MouseEvent, KeyboardEvent } from "react"
import boundaries from "@/content/colombia-planning-boundaries.json"
import { colombiaMapMarkers } from "@/content/colombia-map-markers"

type Props = {
  onSelect?: (id: string) => void
  onActivate?: (event: MouseEvent<HTMLAnchorElement>, id: string) => void
  onActivateKey?: (event: KeyboardEvent<HTMLAnchorElement>, id: string, href: string) => void
}

/** Exact reviewed artwork boundaries, in stable paint order. */
export default function ColombiaRegionTargets({ onSelect, onActivate, onActivateKey }: Props) {
  return <svg className="absolute inset-0 h-full w-full" viewBox={boundaries.viewBox} preserveAspectRatio="xMidYMid meet" role="group" aria-label="Choose a Colombian planning region">
    {boundaries.regions.map(boundary => {
      const region = colombiaMapMarkers.find(region => region.name === boundary.name)
      if (!region) return null
      const href = `/regions/${region.slug}`
      return <a key={region.slug} href={href} aria-label={`Explore ${region.name} region`} className="group outline-none"
        onClick={event => { if (onSelect && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) { event.preventDefault(); onSelect(region.slug) } else onActivate?.(event, region.slug) }}
        onKeyDown={event => onActivateKey?.(event, region.slug, href)}>
        <path d={boundary.path} fill="transparent" stroke="transparent" vectorEffect="non-scaling-stroke" className="cursor-pointer group-hover:fill-emerald-800/25 group-focus:fill-emerald-800/25 group-focus:stroke-emerald-950" />
      </a>
    })}
  </svg>
}
