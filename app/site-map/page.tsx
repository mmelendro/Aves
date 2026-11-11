import { publicMetadata } from "@/lib/public-metadata"
/**
 * Human-readable site directory. Public groups come from lib/public-pages, which
 * also feeds the machine-readable sitemap. One tree includes every country.
 * Keep private account/admin pages out of the public-page catalogue.
 */
import type { Metadata } from "next"
import DestinationSiteTree from "@/components/destination-site-tree"
import {destinationSiteTree} from "@/lib/destination-site-tree"
import { GlobalFooter, GlobalHeader } from "@/components/global-navigation"
import { canonicalUrl } from "@/lib/site-path"

export const metadata: Metadata = publicMetadata({
  title: "AVES Site Map",
  description: "Find AVES destinations, Colombia's region guides, Australian regional guides and New Zealand trip planning.",
  alternates: { canonical: canonicalUrl("/site-map") },
})

export default function SiteMapPage() {
  return (
    <div className="min-h-screen bg-white">
      <GlobalHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-12 lg:py-16">
          <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
            <h1 className="mb-5 text-3xl font-medium tracking-tight text-emerald-950 md:text-4xl lg:text-5xl">AVES Site Map</h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 lg:text-xl">Start with the world, open a country, then choose a region. Every destination belongs to the same AVES site.</p>
          </div>
        </section>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <DestinationSiteTree tree={destinationSiteTree}/>

      </div>
      </main>
      <GlobalFooter />
    </div>
  )
}
