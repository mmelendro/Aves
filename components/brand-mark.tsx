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
}

const countryLabels: Record<BrandCountry, string> = {
  colombia: "Colombia",
  australia: "Australia",
  "new-zealand": "New Zealand",
}

// The containing home link supplies the accessible brand name.
export function BrandMark({ country, inverse = false, size = "header", priority = false, label }: BrandMarkProps) {
  const isFooter = size === "footer"
  const subtitle = label || (country ? countryLabels[country] : undefined)

  return (
    <span aria-hidden="true" className={cn("inline-flex shrink-0 items-center", isFooter ? "gap-3" : "gap-2")}>
      {country && (
        <Image
          src={sitePath(`/images/brand/aves-${country}-bird.png`)}
          alt=""
          width={isFooter ? 56 : 44}
          height={isFooter ? 56 : 44}
          priority={priority}
          className={cn("block shrink-0 object-contain", isFooter ? "h-14 w-14" : "h-11 w-11", inverse && "rounded-lg bg-white p-1")}
        />
      )}
      <span className="block leading-none">
        <span className={cn("block font-sans font-black tracking-[0.14em]", isFooter ? "text-[2rem]" : "text-2xl sm:text-[1.75rem]", inverse ? "text-white" : "text-emerald-950")}>AVES</span>
        {subtitle && <span className={cn("mt-1.5 block font-sans font-medium tracking-[0.1em]", isFooter ? "text-xs" : "text-[10px] sm:text-[11px]", inverse ? "text-emerald-100" : "text-emerald-800")}>{subtitle}</span>}
      </span>
    </span>
  )
}
