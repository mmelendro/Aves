"use client"

/**
 * Shared AVES logo: a country bird, lightweight wordmark and landscape decoration.
 * The large background link goes home; the independently clickable subtitle goes
 * to its country. These are sibling links, so no link is nested inside another link.
 */
import Link from "next/link"
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
  labelHref?: string
  nativeCountryLink?: boolean
  unifiedHeaderContour?: boolean
}

const countryLabels: Record<BrandCountry, string> = {
  colombia: "Colombia",
  australia: "Australia",
  "new-zealand": "New Zealand",
}

// Own both links here so the country subtitle never sits inside the global home link.
export function BrandMark({ country, inverse = false, size = "header", priority = false, label, labelHref, unifiedHeaderContour = false, nativeCountryLink = false }: BrandMarkProps) {
  const { selection } = useHeaderLandscape()
  const context = brandContext(usePathname() || "/", country, selection)
  const CountryLink = nativeCountryLink ? "a" : Link
  const isFooter = size === "footer"
  const displayCountry = context.country === "global" ? undefined : context.country as BrandCountry
  const subtitle = label || (displayCountry ? countryLabels[displayCountry] : undefined)
  const homeHref = "/"
  const subtitleHref = labelHref || (displayCountry ? `/${displayCountry}` : homeHref)

  return (
    <span className={cn("relative inline-flex shrink-0 items-center pb-4", isFooter ? "gap-3 pb-6" : "gap-1.5 sm:gap-2")}>
      <Link href={homeHref} aria-label="AVES home" className={cn("absolute inset-0 z-0 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4", inverse ? "focus-visible:outline-emerald-300" : "focus-visible:outline-emerald-700")} />
      <svg aria-hidden="true" focusable="false" viewBox="0 0 240 40" fill="none" className={cn("pointer-events-none absolute inset-x-0 bottom-0 h-6 w-full", isFooter && "h-9", unifiedHeaderContour && "invisible", inverse ? "text-emerald-200" : "text-emerald-600")}>
        <BrandLandscape {...context} />
      </svg>
        <BrandBird
          {...context}
          alt=""
          size={isFooter ? 80 : 48}
          priority={priority}
          className={cn("pointer-events-none relative block shrink-0 object-contain", isFooter ? "h-20 w-20" : "h-11 w-11 sm:h-12 sm:w-12")}
        />
      <span className="pointer-events-none block leading-none">
        <span data-brand-wordmark="true" aria-hidden="true" className={cn("block w-fit font-sans font-medium tracking-[0.14em]", isFooter ? "text-[2rem]" : "text-2xl sm:text-[1.75rem]", inverse ? "text-white" : "text-emerald-950")}>AVES</span>
        {subtitle && <CountryLink href={subtitleHref} aria-label={label || `AVES ${subtitle} home`} className={cn("pointer-events-auto relative z-10 mt-1.5 block rounded-sm font-sans font-medium tracking-[0.1em] before:absolute before:inset-x-0 before:-top-1 before:h-6 before:content-[''] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4", isFooter ? "text-xs" : "text-[10px] sm:text-[11px]", inverse ? "text-emerald-100 focus-visible:outline-emerald-300" : "text-emerald-800 focus-visible:outline-emerald-700")}>{subtitle}</CountryLink>}
      </span>
    </span>
  )
}
