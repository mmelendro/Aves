"use client"

import HeroVideoDemo from "@/components/hero-video-demo"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function HeroDemoPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader currentPage="/hero-demo" />

      {/* Demo Navigation */}
      <div className="bg-emerald-50 border-b border-emerald-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/placement-analysis">
              <Button variant="outline" size="sm" className="border-emerald-600 text-emerald-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Analysis
              </Button>
            </Link>
            <div className="text-center">
              <h2 className="text-lg font-semibold text-emerald-800">Hero Section Video Background</h2>
              <p className="text-sm text-emerald-600">Live demonstration of recommended placement</p>
            </div>
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <main>
        <HeroVideoDemo />

        {/* Analysis Summary */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl font-bold text-gray-900">Hero Video Background Analysis</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="text-3xl font-bold text-green-600 mb-2">95</div>
                  <div className="text-sm font-medium text-gray-900 mb-1">Visual Impact</div>
                  <div className="text-xs text-gray-600">Maximum first impression</div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="text-3xl font-bold text-blue-600 mb-2">90</div>
                  <div className="text-sm font-medium text-gray-900 mb-1">User Engagement</div>
                  <div className="text-xs text-gray-600">Immersive experience</div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="text-3xl font-bold text-purple-600 mb-2">82</div>
                  <div className="text-sm font-medium text-gray-900 mb-1">Overall Score</div>
                  <div className="text-xs text-gray-600">Excellent rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
