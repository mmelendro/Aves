/**
 * Shared AVES logo: a country bird, lightweight wordmark and landscape decoration.
 * The large background link goes home; the independently clickable subtitle goes
 * to its country. These are sibling links, so no link is nested inside another link.
 */
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { sitePath } from "@/lib/site-path"

export type BrandCountry = "colombia" | "australia" | "new-zealand"

interface BrandMarkProps {
  country?: BrandCountry
  inverse?: boolean
  size?: "header" | "footer"
  priority?: boolean
  label?: string
  labelHref?: string
}

const countryLabels: Record<BrandCountry, string> = {
  colombia: "Colombia",
  australia: "Australia",
  "new-zealand": "New Zealand",
}

// Landscape-inspired contours, not geographic outlines. The shared coast line
// connects each destination to the original “From mountains to ocean” identity.
const landscapes: Record<BrandCountry | "global", string> = {
  colombia: "M2 30 23 22 41 9 52 17 66 3 83 21 96 13 113 28 Q127 22 138 27 T163 28",
  australia: "M2 30 Q16 28 29 22 T53 20 Q64 10 78 16 L91 25 Q106 19 120 25 T153 28",
  "new-zealand": "M2 31 25 25 44 10 55 19 72 2 84 21 93 13 110 30 Q129 23 150 28",
  global: "M2 31 24 23 41 9 55 22 68 14 89 29 Q108 22 127 27 T156 28",
}

// Own both links here so the country subtitle never sits inside the global home link.
export function BrandMark({ country, inverse = false, size = "header", priority = false, label, labelHref }: BrandMarkProps) {
  const isFooter = size === "footer"
  const subtitle = label || (country ? countryLabels[country] : undefined)
  const homeHref = "/"
  const subtitleHref = labelHref || (country ? `/${country}` : homeHref)

  return (
    <span className={cn("relative inline-flex shrink-0 items-center pb-4", isFooter ? "gap-3 pb-6" : "gap-1.5 sm:gap-2")}>
      <Link href={homeHref} aria-label="AVES home" className={cn("absolute inset-0 z-0 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4", inverse ? "focus-visible:outline-emerald-300" : "focus-visible:outline-emerald-700")} />
      <svg aria-hidden="true" focusable="false" viewBox="0 0 240 40" fill="none" className={cn("pointer-events-none absolute inset-x-0 bottom-0 h-6 w-full", isFooter && "h-9", inverse ? "text-emerald-200" : "text-emerald-600")}>
        <path d={landscapes[country || "global"]} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M131 29 Q146 22 161 28 T192 28 T223 28 L238 28 M164 36 Q180 30 195 35 T237 34" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        {country === "australia" && <path d="M29 24V10 M22 15Q29 3 37 14 M25 10Q30 1 35 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />}
        {country === "colombia" && <path d="M116 27V18 M110 21Q116 10 122 21 M125 26V21 M120 23Q125 15 131 23" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />}
      </svg>
        <Image
          src={sitePath(`/images/brand/aves-${country || "global"}-bird.png`)}
          alt=""
          width={isFooter ? 80 : 48}
          height={isFooter ? 80 : 48}
          priority={priority}
          className={cn("pointer-events-none relative block shrink-0 object-contain", isFooter ? "h-20 w-20" : "h-11 w-11 sm:h-12 sm:w-12")}
        />
      <span className="pointer-events-none block leading-none">
        <span aria-hidden="true" className={cn("block font-sans font-medium tracking-[0.14em]", isFooter ? "text-[2rem]" : "text-2xl sm:text-[1.75rem]", inverse ? "text-white" : "text-emerald-950")}>AVES</span>
        {subtitle && <Link href={subtitleHref} aria-label={label || `AVES ${subtitle} home`} className={cn("pointer-events-auto relative z-10 mt-1.5 block rounded-sm font-sans font-medium tracking-[0.1em] before:absolute before:inset-x-0 before:-top-1 before:h-6 before:content-[''] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4", isFooter ? "text-xs" : "text-[10px] sm:text-[11px]", inverse ? "text-emerald-100 focus-visible:outline-emerald-300" : "text-emerald-800 focus-visible:outline-emerald-700")}>{subtitle}</Link>}
      </span>
    </span>
  )
}
