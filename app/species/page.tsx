import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import HomepageBirdCarousel from "@/components/homepage-bird-carousel"
import { Button } from "@/components/ui/button"
import { canonicalUrl } from "@/lib/site-path"
export const metadata: Metadata = { title: "Australian Birdlife", alternates: { canonical: canonicalUrl("/species") } }
export default function SpeciesPage() {
  return <PageShell path="/species" title="Discover Australia's Birdlife" description="A first glimpse of the birds that inspire us. Browse the photographs, open the species information, and share the birds you would love to learn more about."><section className="py-16 bg-gradient-to-br from-blue-50 to-emerald-50"><div className="max-w-3xl mx-auto px-4"><HomepageBirdCarousel autoPlay={false} className="w-full" /><div className="text-center mt-10"><p className="text-gray-600 mb-5">Wildlife sightings are never guaranteed. These photographs offer inspiration for a personal inquiry.</p><Link href="/contact"><Button className="bg-emerald-600 hover:bg-emerald-700">Plan My Australian Birding Journey</Button></Link><p className="text-sm text-gray-500 mt-5"><Link href="/credits" className="underline">Photographer credits and licences</Link></p></div></div></section></PageShell>
}
