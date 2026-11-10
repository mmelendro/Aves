import Image from "next/image"
import { regionalBrandBird } from "@/lib/regional-brand"
import { sitePath } from "@/lib/site-path"

/** Render direction belongs to the artwork record, never to header/footer styling. */
export function BrandBird({ country = "global", regionId, placeId, size = 48, priority = false, className, alt = "" }: {
  country?: string; regionId?: string; placeId?: string; size?: number
  priority?: boolean; className?: string; alt?: string
}) {
  const bird = regionalBrandBird(country, regionId, placeId)
  return <Image src={sitePath(`/images/brand/${bird.file}`)} alt={alt} width={size} height={size}
    priority={priority} className={className} style={{ transform: bird.facing === "left" ? "scaleX(-1)" : undefined }}
    data-brand-bird={bird.scientificName} data-brand-facing="right" />
}
