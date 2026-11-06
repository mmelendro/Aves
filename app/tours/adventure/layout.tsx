import type { Metadata } from "next"
import type { ReactNode } from "react"
import { canonicalUrl } from "@/lib/site-path"

export const metadata: Metadata = {
  title: "Adventure Tours",
  alternates: { canonical: canonicalUrl("/tours/adventure") },
}

export default function PublicPageLayout({ children }: { children: ReactNode }) {
  return children
}
