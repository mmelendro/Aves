/**
 * Dynamic Colombia-region route. [slug] is the URL segment after /regions/.
 * Look up a known content record, redirect the old Cauca alias, or return a 404.
 * Rendering is delegated to ColombiaRegionPage so all region guides share one layout.
 */
import type { Metadata } from "next"
import { notFound, permanentRedirect } from "next/navigation"
import { regions, colombiaBirdingTitle } from "@/content/regions"
import { ColombiaRegionPage } from "@/components/colombia-region-page"
import { canonicalUrl } from "@/lib/site-path"

type Props = { params: Promise<{ slug: string }> }
function findRegion(slug: string) {
  if (slug === "cauca-river") permanentRedirect("/regions/cauca-valley")
  const region = regions.find(item => item.id === slug)
  if (!region) notFound()
  return region
}
// Prebuild known region URLs. Caribbean has its own explicit route file.
export function generateStaticParams() { return regions.filter(r => r.id !== "caribbean").map(r => ({slug:r.id})) }
// Use the same lookup for SEO and visible content so unknown slugs do not invent pages.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const region = findRegion((await params).slug)
  return {title:`${colombiaBirdingTitle(region)} | AVES Colombia`,description:region.description,alternates:{canonical:canonicalUrl(`/regions/${region.id}`)}}
}
export default async function RegionPage({params}: Props) { return <ColombiaRegionPage region={findRegion((await params).slug)} /> }
