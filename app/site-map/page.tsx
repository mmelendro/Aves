/*
 * Human-readable navigation directory, grouped from lib/public-pages.ts.
 * The XML sitemap uses the same public-page inventory, keeping the two lists aligned.
 */
import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import { publicPageGroups } from "@/lib/public-pages"
import { canonicalUrl } from "@/lib/site-path"

export const metadata: Metadata = {
  title: "Site Map",
  description: "Find AVES Australia's region guides, birdlife, experiences and trip-planning information in one place.",
  alternates: { canonical: canonicalUrl("/site-map") },
}

// Add/remove public routes in lib/public-pages.ts so this directory and the XML list stay consistent.
export default function SiteMapPage() {
  return (
    <PageShell path="/site-map" title="Find Your Way Around AVES Australia" description="Explore a place, meet its birds, or find the information you need to start planning.">
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
        <nav aria-label="AVES destinations" className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
          {[
            { href: "https://aves.bio/", label: "All destinations" },
            { href: "https://aves.bio/colombia", label: "Visit AVES Colombia" },
            { href: "https://aves.bio/site-map", label: "AVES site map" },
          ].map(({ href, label }) => (
            <a key={href} href={href} className="inline-flex min-h-11 items-center rounded-lg font-medium text-emerald-800 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-4">{label}</a>
          ))}
        </nav>
      </div>
    </PageShell>
  )
}

