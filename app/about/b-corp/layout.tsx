import { publicMetadata } from "@/lib/public-metadata"
/**
 * Search title and canonical URL for the /about/b-corp route subtree.
 * This layout returns children unchanged: it adds metadata, not visible page chrome.
 * The page component owns the actual header, sections and footer.
 */
import type { Metadata } from "next"
import type { ReactNode } from "react"
import { canonicalUrl } from "@/lib/site-path"

export const metadata: Metadata = publicMetadata({
  title: "Our B Corp Journey",
  alternates: { canonical: canonicalUrl("/about/b-corp") },
})

export default function PublicPageLayout({ children }: { children: ReactNode }) {
  return children
}
