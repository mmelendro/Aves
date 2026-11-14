"use client"

/**
 * Shared AVES logo: a country bird, lightweight wordmark and landscape decoration.
 * The wordmark goes home, the bird opens its guide, and the subtitle opens its country.
 * Each destination has an independent keyboard and pointer target.
 */
import Link from "next/link"
import {useEffect,useState} from "react"
import brandBirds from "@/content/regional-brand-birds.json"
import {regionalBrandBird} from "@/lib/regional-brand"
import flight from "./brand-flight.module.css"
import { BrandBird } from "@/components/brand-bird"
import { BrandLandscape } from "@/components/brand-landscape"
import { usePathname } from "next/navigation"
import { useHeaderLandscape } from "@/components/header-landscape-context"
import { brandContext } from "@/lib/brand-context"
import { brandLocation } from "@/lib/brand-location"
import { cn } from "@/lib/utils"

export type BrandCountry = "colombia" | "australia" | "new-zealand"

interface BrandMarkProps {
  country?: BrandCountry | "global"
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
  const [flying,setFlying]=useState(false)
  const [frame,setFrame]=useState(0)
  const baseBird=regionalBrandBird(context.country,context.regionId,context.placeId)
  const candidates=Object.entries(brandBirds.birds).filter(([key])=>context.country==="global" || (context.regionId ? key.startsWith(`${context.country}/${context.regionId}/`) : key.startsWith(`${context.country}/`)))
  const sequence=[{key:"base",bird:baseBird},...candidates.filter(([,bird])=>bird.file!==baseBird.file).map(([key,bird])=>({key,bird}))]
  const active=sequence[frame % sequence.length]
  useEffect(()=>{
    if(!flying || window.matchMedia("(prefers-reduced-motion: reduce)").matches)return
    let steps=0
    const timer=window.setInterval(()=>{setFrame(n=>n+1);if(++steps>=4)window.clearInterval(timer)},1100)
    return ()=>window.clearInterval(timer)
  },[flying])
  const activeCountry=active.key==="base"?context.country:active.key.split("/")[0]
  const birdHref="/species/reference?"+new URLSearchParams({country:activeCountry==="global"?"colombia":activeCountry,q:active.bird.scientificName})+"#inventory-results"
  const CountryLink = nativeCountryLink ? "a" : Link
  const isFooter = size === "footer"
  const displayCountry = context.country === "global" ? undefined : context.country as BrandCountry
  const location = brandLocation(context)
  const subtitle = label || location?.name || (displayCountry ? countryLabels[displayCountry] : undefined)
  const homeHref = "/"
  const subtitleHref = labelHref || location?.href || (displayCountry ? `/${displayCountry}` : homeHref)

  return (
    <span onPointerEnter={()=>setFlying(true)} onPointerLeave={()=>{setFlying(false);setFrame(0)}} onFocus={()=>setFlying(true)} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget)){setFlying(false);setFrame(0)}}} className={cn("relative inline-flex min-w-0 max-w-full items-center pb-4", isFooter ? "flex-wrap gap-3 pb-6" : "gap-1.5 sm:gap-2")}>
      <svg aria-hidden="true" focusable="false" viewBox="0 0 240 40" fill="none" className={cn("pointer-events-none absolute inset-x-0 bottom-0 h-6 w-full", isFooter && "h-9", unifiedHeaderContour && "invisible", inverse ? "text-emerald-200" : "text-emerald-600")}>
        <BrandLandscape {...context} />
      </svg>
      <Link href={birdHref} aria-label={`Meet the ${active.bird.name} in the bird guide`} className="relative z-10 shrink-0 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">
        <span key={active.bird.file} className={flying ? flight.flight : undefined}>
          <BrandBird country={active.key==="base"?context.country:activeCountry} regionId={active.key==="base"?context.regionId:active.key.split("/").slice(1).join("/")} placeId={active.key==="base"?context.placeId:undefined} alt="" size={isFooter?80:48} priority={priority} className={cn("block object-contain",isFooter?"h-20 w-20":"h-11 w-11 sm:h-12 sm:w-12")} />
        </span>
      </Link>
      <span className={cn("relative z-10 block min-w-0 max-w-[9rem] rounded-sm leading-none sm:max-w-[13rem]", unifiedHeaderContour && !inverse && "bg-white")}>
        <Link href={homeHref} aria-label="AVES home" data-brand-wordmark="true" className={cn("block w-fit rounded-sm font-sans font-medium tracking-[0.14em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4", isFooter ? "text-[2rem]" : "text-2xl sm:text-[1.75rem]", inverse ? "text-white focus-visible:outline-emerald-300" : "text-emerald-950 focus-visible:outline-emerald-700")}>AVES</Link>
        {subtitle && <CountryLink href={subtitleHref} aria-label={label || `AVES ${subtitle} home`} className={cn("pointer-events-auto relative z-10 mt-1.5 flex min-h-6 min-w-6 items-center rounded-sm font-sans font-medium leading-snug tracking-[0.06em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4", isFooter ? "text-xs" : "text-[10px] sm:text-[11px]", inverse ? "text-emerald-100 focus-visible:outline-emerald-300" : "text-emerald-800 focus-visible:outline-emerald-700")}>{subtitle}</CountryLink>}
        {location?.regional && !isFooter && <CountryLink href={location.countryHref} aria-label={`Back to ${location.countryName}`} className={cn("flex min-h-6 items-center text-[10px] leading-snug underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",inverse?"text-emerald-100":"text-emerald-700")}>{location.countryName}</CountryLink>}
      </span>
    </span>
  )
}
