import type { Metadata } from "next"
import type { ReactNode } from "react"
import { canonicalUrl } from "@/lib/site-path"

export const metadata: Metadata = {
  title: "Sierra Nevada Birding",
  alternates: { canonical: canonicalUrl("/blog/sierra-nevada-indigenous-birding") },
}

export default function PublicPageLayout({ children }: { children: ReactNode }) {
  return children
}
