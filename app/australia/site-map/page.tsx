import { australiaMetadata } from "@/features/australia/lib/metadata"
/*
 * Human-readable navigation directory, grouped from lib/public-pages.ts.
 * The XML sitemap uses the same public-page inventory, keeping the two lists aligned.
 */
import type { Metadata } from "next"
import DestinationSiteTree from "@/components/destination-site-tree"
import {destinationSiteTree} from "@/lib/destination-site-tree"
import { PageShell } from "@/features/australia/components/page-shell"
import { canonicalUrl } from "@/features/australia/lib/site-path"

export const metadata: Metadata = australiaMetadata({
  title: "Site Map",
  description: "Find AVES Australia's region guides, birdlife, experiences and trip-planning information in one place.",
  alternates: { canonical: canonicalUrl("/site-map") },
})

// Add/remove public routes in lib/public-pages.ts so this directory and the XML list stay consistent.
export default function SiteMapPage() {
  return (
    <PageShell path="/site-map" title="Find your way around AVES" description="World, countries and regions in one expandable directory. Australia is open below; you can explore the other countries just as easily.">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <DestinationSiteTree tree={destinationSiteTree} initialCountry="australia"/>

      </div>
    </PageShell>
  )
}
