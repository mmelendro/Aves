"use client"

/*
 * Reusable AVES wordmark, country bird and decorative landscape. The large logo hit area
 * opens the global homepage; the separate country label opens the destination homepage.
 * Use this component for brand sizing rather than the legacy OptimizedImage logo rules.
 */
import { BrandBird } from "@/components/brand-bird"
import { BrandLandscape } from "@/components/brand-landscape"
import { usePathname } from "next/navigation"
import { useHeaderLandscape } from "@/components/header-landscape-context"
import { brandContext } from "@/lib/brand-context"
import { cn } from "@/lib/utils"

export type BrandCountry = "colombia" | "australia" | "new-zealand"

interface BrandMarkProps {
  country?: BrandCountry
  inverse?: boolean
  size?: "header" | "footer"
  priority?: boolean
  label?: string
  unifiedHeaderContour?: boolean
  labelHref?: string
}

const countryLabels: Record<BrandCountry, string> = {
  colombia: "Colombia",
  australia: "Australia",
  "new-zealand": "New Zealand",
}

// Own both links here so the country subtitle never sits inside the global home link.
export function BrandMark({ country, inverse = false, size = "header", priority = false, label, labelHref, unifiedHeaderContour = false }: BrandMarkProps) {
  // Size changes the lockup as a unit; inverse supplies readable lettering on dark footers.
  // Optional label/labelHref let shared pages override the subtitle without changing the brand art.
  const { selection } = useHeaderLandscape()
  const context = brandContext(usePathname() || "/", country, selection)
  const isFooter = size === "footer"
  const subtitle = label || (country ? countryLabels[country] : undefined)
  const homeHref = "https://aves.bio/"
  const subtitleHref = labelHref || (country ? `/${country}` : homeHref)

  return (
    <span className={cn("relative inline-flex shrink-0 items-center pb-4", isFooter ? "gap-3 pb-6" : "gap-1.5 sm:gap-2")}>
      {/* Separate sibling links avoid invalid nested anchors. The subtitle's higher layer stays clickable. */}
      <a href={homeHref} aria-label="AVES home" className={cn("absolute inset-0 z-0 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4", inverse ? "focus-visible:outline-emerald-300" : "focus-visible:outline-emerald-700")} />
      {!unifiedHeaderContour && <svg aria-hidden="true" focusable="false" viewBox="0 0 240 40" fill="none" className={cn("pointer-events-none absolute inset-x-0 bottom-0 h-6 w-full", isFooter && "h-9", inverse ? "text-emerald-200" : "text-emerald-600")}>
        <BrandLandscape {...context} />
      </svg>}
        {/* Decorative image: the home link already names its purpose for assistive technology. */}
        <BrandBird
          {...context}
          alt=""
          size={isFooter ? 80 : 48}
          priority={priority}
          className={cn("pointer-events-none relative block shrink-0 object-contain", isFooter ? "h-20 w-20" : "h-11 w-11 sm:h-12 sm:w-12")}
        />
      <span className="pointer-events-none block leading-none">
        <span data-brand-wordmark="true" aria-hidden="true" className={cn("block w-fit font-sans font-medium tracking-[0.14em]", isFooter ? "text-[2rem]" : "text-2xl sm:text-[1.75rem]", inverse ? "text-white" : "text-emerald-950")}>AVES</span>
        {subtitle && <a href={subtitleHref} aria-label={label || `AVES ${subtitle} home`} className={cn("pointer-events-auto relative z-10 mt-1.5 block rounded-sm font-sans font-medium tracking-[0.1em] before:absolute before:inset-x-0 before:-top-1 before:h-6 before:content-[''] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4", isFooter ? "text-xs" : "text-[10px] sm:text-[11px]", inverse ? "text-emerald-100 focus-visible:outline-emerald-300" : "text-emerald-800 focus-visible:outline-emerald-700")}>{subtitle}</a>}
      </span>
    </span>
  )
}
