/**
 * Reusable presentation of the existing Colombia map image. An SVG colour filter
 * changes its palette without redrawing boundaries or moving any clickable markers.
 * Image dimensions, accessible text and layout are supplied by each caller.
 */
import boundaries from "@/content/colombia-planning-boundaries.json"
import { useId } from "react"
import Image, { type ImageProps } from "next/image"

type ColombiaMapArtworkProps = Omit<ImageProps, "src"> & { flat?: boolean }

/** Keeps the original map geometry while giving every use the same AVES palette. */
export default function ColombiaMapArtwork({ style, flat = false, ...props }: ColombiaMapArtworkProps) {
  // A unique ID prevents two maps on one page from referencing the wrong SVG filter.
  const filterId = `colombia-map-sage-${useId().replace(/:/g, "")}`

  return <>
    <svg width="0" height="0" className="pointer-events-none absolute" aria-hidden="true" focusable="false">
      <defs>
        <filter id={filterId} colorInterpolationFilters="sRGB">
          {flat ? <><feFlood floodColor="#c5dbd0"/><feComposite in2="SourceAlpha" operator="in"/></> : <>
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncR type="gamma" amplitude="1" exponent="3" offset="0" />
            <feFuncG type="gamma" amplitude="1" exponent="3" offset="0" />
            <feFuncB type="gamma" amplitude="1" exponent="3" offset="0" />
          </feComponentTransfer>
          <feColorMatrix type="matrix" values="0.82 0 0 0 0.18  0 0.58 0 0 0.42  0 0 0.68 0 0.32  0 0 0 1 0" />
          </>}
        </filter>
      </defs>
    </svg>
    <Image {...props} src="/images/birding-regions-colombia-final.png" style={{ ...style, filter: `url(#${filterId})` }} />
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox={boundaries.viewBox} preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false" data-colombia-boundaries="true">
      {boundaries.regions.map(region => <path key={region.name} d={region.path} fill="none" stroke="#6e9582" strokeWidth=".85" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke"/>)}
    </svg>
  </>
}
