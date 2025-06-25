"use client"

import PlacementAnalysis from "@/components/placement-analysis"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"

export default function PlacementAnalysisPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader currentPage="/placement-analysis" />
      <main className="py-20">
        <PlacementAnalysis />
      </main>
      <Footer />
    </div>
  )
}
