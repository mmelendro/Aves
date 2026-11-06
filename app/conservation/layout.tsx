import type { Metadata } from "next"
import type { ReactNode } from "react"
import { canonicalUrl } from "@/lib/site-path"

export const metadata: Metadata = {
  title: "Responsible Birding",
  alternates: { canonical: canonicalUrl("/conservation") },
}

export default function PublicPageLayout({ children }: { children: ReactNode }) {
  return children
}
