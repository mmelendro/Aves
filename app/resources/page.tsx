import type { Metadata } from "next"
import ResourcesPageClient from "./ResourcesPageClient"

export const metadata: Metadata = {
  title: "Expert Resources Hub | AVES Colombia",
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
