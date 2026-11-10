"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { newZealandHeaderGeometry } from "@/lib/header-landscape.mjs"

type Geometry = ReturnType<typeof newZealandHeaderGeometry>

/** Static decorative vectors; links and focus indicators stay above this layer. */
export function HeaderContour() {
  const ref = useRef<SVGSVGElement>(null)
  const [drawing, setDrawing] = useState<{ width: number; geometry: Geometry } | null>(null)
  useLayoutEffect(() => {
    const svg = ref.current, header = svg?.closest("header")
    const word = header?.querySelector<HTMLElement>("[data-brand-wordmark]")
    const nav = header?.querySelector<HTMLElement>("[data-contour-navigation]")
    if (!svg || !header || !word || !nav) return
    function measure() {
      const h = header!.getBoundingClientRect(), b = word!.getBoundingClientRect(), n = nav!.getBoundingClientRect()
      setDrawing({ width: h.width, geometry: newZealandHeaderGeometry({ width: h.width, wordCenter: b.left - h.left + b.width / 2, navLeft: n.left - h.left, navRight: n.right - h.left }) })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(header); observer.observe(word); observer.observe(nav)
    let active = true
    document.fonts.ready.then(() => { if (active) measure() })
    return () => { active = false; observer.disconnect() }
  }, [])
  const g = drawing?.geometry
  return <svg ref={ref} data-header-contour="new-zealand" aria-hidden="true" focusable="false" viewBox={`0 0 ${drawing?.width || 1440} 132`} preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-0 h-[132px] w-full text-emerald-700" fill="none">
    <path d={g ? `${g.boundary} L${drawing!.width} 0 H0 Z` : "M0 108H1440V0H0Z"} fill="white" />
    {g && <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path data-landscape-boundary="true" d={g.boundary} strokeWidth="1.35" />
      {[...g.ridges, ...g.water].map((d, i) => <path key={i} d={d} strokeWidth=".65" />)}
      <g data-header-wildlife="true" strokeWidth=".7">
        {g.whales.map((d, i) => <path key={i} d={d} />)}
        {g.birds.map((bird, i) => <g key={i} transform={`translate(${bird.x} ${bird.y}) rotate(${bird.rotation}) scale(${bird.size})`}>
          <path d={i % 3 === 0 ? "M-1 -.2 Q-.5 -.52 0 0 Q.28 -.34 .9 -.52 M0 0 L.08 .2 L.2 .09" : "M-1 -.2 Q-.48 -.34 0 0 Q.48 -.34 1 -.2 M0 0 L.06 .2 L.15 .08"} strokeWidth={.7 / bird.size} />
        </g>)}
      </g>
    </g>}
  </svg>
}
