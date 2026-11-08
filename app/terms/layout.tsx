import { publicMetadata } from "@/lib/public-metadata"
/**
 * Search title and canonical URL for the /terms route subtree.
 * This layout returns children unchanged: it adds metadata, not visible page chrome.
 * The page component owns the actual header, sections and footer.
 */
import type { Metadata } from "next"
import type { ReactNode } from "react"
import { canonicalUrl } from "@/lib/site-path"

export const metadata: Metadata = publicMetadata({
  title: "Terms",
  alternates: { canonical: canonicalUrl("/terms") },
})

export default function PublicPageLayout({ children }: { children: ReactNode }) {
  return children
}
