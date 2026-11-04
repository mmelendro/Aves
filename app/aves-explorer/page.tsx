import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"
import { RegionExplorer } from "@/components/region-explorer"
export const metadata: Metadata = { title: "Explore Australian Regions" }
export default function RegionsPage() {
  return <PageShell path="/aves-explorer" title="Explore Australia's Regions" description="Discover the landscapes inspiring our Australian journeys. Choose a region, explore its character, and tell us what you would love to experience."><RegionExplorer /></PageShell>
}
