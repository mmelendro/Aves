/**
 * Server route for resources metadata. Interactive tabs and the resource catalogue
 * are rendered by ResourcesPageClient; keeping metadata here avoids putting it inside
 * a browser-only component.
 */
import { canonicalUrl } from "@/lib/site-path"
import type { Metadata } from "next"
import ResourcesPageClient from "./ResourcesPageClient"

export const metadata: Metadata = {
  alternates: { canonical: canonicalUrl("/resources") },
  title: "Expert Resources Hub | AVES Tours",
  description:
    "Your comprehensive birding resource center. Expert podcasts, official guides, preparation tips, and conservation insights for your Colombian birding adventure.",
  keywords: [
    "Colombia birding resources",
    "bird watching preparation",
    "Colombia travel guide",
    "birding podcasts",
    "bird identification",
    "Colombia wildlife",
    "eco-tourism resources",
    "Audubon birding trails",
  ],
}

export default function ResourcesPage() {
  return <ResourcesPageClient />
}
