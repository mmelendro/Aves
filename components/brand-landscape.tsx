import profiles from "@/content/regional-brand-landscapes.json"
import type { BrandSelection } from "@/lib/brand-context"

/** Reuse the page's reviewed terrain; inland lockups never inherit an ocean. */
export function BrandLandscape(context: BrandSelection) {
  const entries: Record<string, {terrain:string; water:string; line:string}> = profiles
  const profile = entries[`${context.country}/${context.placeId || context.regionId || "country"}`]
    || entries[`${context.country}/country`] || entries.global
  return <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" data-brand-terrain={profile.terrain}>
    <path d={profile.line} />
    {profile.water !== "none" && <path d="M144 34 Q160 30 176 34 T208 34 T237 34" />}
  </g>
}
