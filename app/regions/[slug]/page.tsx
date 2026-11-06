import type { Metadata } from "next"
import { notFound, permanentRedirect } from "next/navigation"
import { regions } from "@/content/regions"
import { ColombiaRegionPage } from "@/components/colombia-region-page"
import { canonicalUrl } from "@/lib/site-path"

type Props = { params: Promise<{ slug: string }> }
function findRegion(slug: string) {
  if (slug === "cauca-river") permanentRedirect("/regions/cauca-valley")
  const region = regions.find(item => item.id === slug)
  if (!region) notFound()
  return region
}
export function generateStaticParams() { return regions.filter(r => r.id !== "caribbean").map(r => ({slug:r.id})) }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const region = findRegion((await params).slug)
  return {title:`Birding in ${region.name} | AVES Colombia`,description:region.description,alternates:{canonical:canonicalUrl(`/regions/${region.id}`)}}
}
export default async function RegionPage({params}: Props) { return <ColombiaRegionPage region={findRegion((await params).slug)} /> }
