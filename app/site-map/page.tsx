import { publicMetadata } from "@/lib/public-metadata"
/**
 * Human-readable site directory. Public groups come from lib/public-pages, which
 * also feeds the machine-readable sitemap. Australia has a separately linked directory.
 * Keep private account/admin pages out of the public-page catalogue.
 */
import type { Metadata } from "next"
import Link from "next/link"
import { GlobalFooter, GlobalHeader } from "@/components/global-navigation"
import { Badge } from "@/components/ui/badge"
import { publicNavigationGroups as publicPageGroups } from "@/lib/public-navigation"
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
            <Badge className="mb-5 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">🌿 AVES</Badge>
            <h1 className="mb-5 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">AVES Site Map</h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 lg:text-xl">Explore Colombia and Australia, discover our developing New Zealand destination, and find your way around AVES.</p>
          </div>
        </section>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {publicPageGroups.map(group => (
            <section key={group.id} aria-labelledby={`site-map-${group.id}`} className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/50 p-6">
              <h2 id={`site-map-${group.id}`} className="mb-3 text-xl font-semibold text-emerald-950">{group.title}</h2>
              <ul className="space-y-1">
                {group.pages.map(page => (
                  <li key={page.href}>
                    <Link href={page.href} aria-current={page.href === "/site-map" ? "page" : undefined} className="inline-flex min-h-11 items-center rounded-lg py-2 text-emerald-800 underline decoration-emerald-200 underline-offset-4 hover:decoration-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-4">{page.label}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <section aria-labelledby="australia-directory" className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
          <h2 id="australia-directory" className="text-xl font-semibold text-emerald-950">Explore Australia</h2>
          <p className="mt-2 text-gray-600">Discover Australia's regions, birdlife and journey planning on the Australia section of AVES.</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
            <li><a href="https://aves.bio/australia" className="inline-flex min-h-11 items-center rounded-lg font-medium text-emerald-800 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-4">Australia Home</a></li>
            <li><a href="https://aves.bio/australia/site-map" className="inline-flex min-h-11 items-center rounded-lg font-medium text-emerald-800 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-4">Australia Site Map</a></li>
          </ul>
        </section>
      </div>
      </main>
      <GlobalFooter />
    </div>
  )
}
