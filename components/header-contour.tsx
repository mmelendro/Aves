"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { contextualHeaderGeometry, type HeaderProfile } from "@/lib/header-landscape.mjs"

type Geometry = ReturnType<typeof contextualHeaderGeometry>

/** Static decorative vectors; links and focus indicators stay above this layer. */
export function HeaderContour({ profile }: { profile: HeaderProfile }) {
  const ref = useRef<SVGSVGElement>(null)
  const [drawing, setDrawing] = useState<{ width: number; geometry: Geometry } | null>(null)
  useLayoutEffect(() => {
    const svg = ref.current, header = svg?.closest("header")
    const word = header?.querySelector<HTMLElement>("[data-brand-wordmark]")
    const nav = header?.querySelector<HTMLElement>("[data-contour-navigation]")
    if (!svg || !header || !word || !nav) return
    function measure() {
      const h = header!.getBoundingClientRect(), b = word!.getBoundingClientRect()
      setDrawing({ width: h.width, geometry: contextualHeaderGeometry({ width: h.width, wordCenter: b.left - h.left + b.width / 2 }, profile) })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(header); observer.observe(word); observer.observe(nav)
    let active = true
    document.fonts.ready.then(() => { if (active) measure() })
    return () => { active = false; observer.disconnect() }
  }, [profile])
  const g = drawing?.geometry
  return <svg ref={ref} data-header-contour={`australia-${profile.terrain}`} aria-hidden="true" focusable="false" viewBox={`0 0 ${drawing?.width || 1440} 132`} preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-0 h-[132px] w-full text-emerald-700" fill="none">
    <path d={g ? `${g.boundary} L${drawing!.width} 0 H0 Z` : "M0 108H1440V0H0Z"} fill="white" />
    {g && <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path data-landscape-boundary="true" d={g.boundary} strokeWidth="1.35" />
      {[...g.ridges, ...g.water].map((d, i) => <path key={i} d={d} strokeWidth=".65" />)}
    </g>}
  </svg>
}
