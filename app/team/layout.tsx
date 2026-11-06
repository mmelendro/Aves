import type { Metadata } from "next"
import type { ReactNode } from "react"
import { canonicalUrl } from "@/lib/site-path"

export const metadata: Metadata = {
  title: "Our Team",
  alternates: { canonical: canonicalUrl("/team") },
}

export default function PublicPageLayout({ children }: { children: ReactNode }) {
  return children
}
