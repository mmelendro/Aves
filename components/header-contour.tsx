"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { contextualHeaderGeometry, type HeaderProfile } from "@/lib/header-landscape.mjs"

import styles from "./header-contour.module.css"

type Geometry = ReturnType<typeof contextualHeaderGeometry>

/** Static decorative vectors; links and focus indicators stay above this layer. */
type Drawing = { width: number; geometry: Geometry; key: string }

export function HeaderContour({ profile, country = "australia" }: { profile: HeaderProfile; country?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const [drawing, setDrawing] = useState<Drawing | null>(null)
  const [previous, setPrevious] = useState<Drawing | null>(null)
  const latest = useRef<Drawing | null>(null)
  const sceneKey = profile ? `${country}-${profile.terrain}-${profile.water}` : "new-zealand"
  useLayoutEffect(() => {
    const svg = ref.current, header = svg?.closest("header")
    const word = header?.querySelector<HTMLElement>("[data-brand-wordmark]")
    const nav = header?.querySelector<HTMLElement>("[data-contour-navigation]")
    if (!svg || !header || !word || !nav) return
    function measure() {
      const h = header!.getBoundingClientRect(), b = word!.getBoundingClientRect()
      const next = { key: sceneKey, width: h.width, geometry: contextualHeaderGeometry({width:h.width,wordCenter:b.left-h.left+b.width/2},profile) }
      if (latest.current && latest.current.key !== sceneKey) setPrevious(latest.current)
      latest.current = next
      setDrawing(next)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(header); observer.observe(word); observer.observe(nav)
    let active = true
    document.fonts.ready.then(() => { if (active) measure() })
    return () => { active = false; observer.disconnect() }
  }, [profile, sceneKey])
  const g = drawing?.geometry
  return <svg ref={ref} data-header-contour={profile ? `${country}-${profile.terrain}` : "new-zealand"} aria-hidden="true" focusable="false" viewBox={`0 0 ${drawing?.width || 1440} 132`} preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-0 h-[132px] w-full text-emerald-700" fill="none">
    {previous && <g key={`old-${previous.key}`} className={styles.leave}><ContourScene g={previous.geometry} width={previous.width} /></g>}
    {g ? <g key={drawing!.key} className={previous ? styles.enter : undefined}><ContourScene g={g} width={drawing!.width} /></g> : <path d="M0 108H1440V0H0Z" fill="white" />}

  </svg>
}

function ContourScene({g,width}:{g:Geometry;width:number}){ return <>
    <path d={`${g.boundary} L${width} 0 H0 Z`} fill="white" />
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path data-landscape-boundary="true" d={g.boundary} strokeWidth="1.35" />
      {[...g.ridges, ...g.water].map((d, i) => <path key={i} d={d} strokeWidth=".65" />)}

    </g>
</> }
