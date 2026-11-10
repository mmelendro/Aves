"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { landscapes, type BrandCountry } from "@/components/brand-mark"

/** One visible outline replaces the logo contour AND header divider. Measure
 * the reserved logo SVG so its country landscape retains its exact proportions.
 */
export function HeaderContour({ country }: { country?: BrandCountry }) {
  const ref = useRef<SVGSVGElement>(null)
  const [edge, setEdge] = useState("M0 68 L1440 68")
  const [width, setWidth] = useState(1440)
  useLayoutEffect(() => {
    const svg = ref.current
    const header = svg?.closest("header")
    const logo = header?.querySelector<SVGSVGElement>("[data-brand-landscape]")
    if (!svg || !header || !logo) return
    function measure() {
      const h = header!.getBoundingClientRect(), l = logo!.getBoundingClientRect()
      const scale = Math.min(l.width / 240, l.height / 40)
      const x = l.left - h.left + (l.width - 240 * scale) / 2
      const y = l.top - h.top + (l.height - 40 * scale) / 2
      let index = 0
      const landscape = landscapes[country || "global"].replace(/-?\d+(?:\.\d+)?/g, value => String((index++ % 2 ? y : x) + Number(value) * scale))
      const numbers = landscape.match(/-?\d+(?:\.\d+)?/g)!.map(Number)
      const endX = numbers[numbers.length - 2], endY = numbers[numbers.length - 1]
      const firstY = numbers[1], remaining = h.width - endX
      setWidth(h.width)
      setEdge(`M0 ${firstY} ${landscape.replace(/^M/, "L")} C${endX + remaining * .18} ${endY} ${endX + remaining * .2} ${endY + 3} ${endX + remaining * .4} ${endY + 1} S${endX + remaining * .72} ${endY - 2} ${h.width} ${endY}`)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(header); observer.observe(logo)
    return () => observer.disconnect()
  }, [country])
  return <svg ref={ref} aria-hidden="true" focusable="false" viewBox={`0 0 ${width} 92`} preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-0 h-[92px] w-full text-emerald-600" fill="none">
    <path d={`${edge} L${width} 0 H0 Z`} fill="white" fillOpacity=".98" />
    <path d={edge} stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity=".65" />
  </svg>
}
