"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Users, Leaf, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { NavigationHeader } from "@/components/navigation-header"

export default function ConservationPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <NavigationHeader currentPage="/conservation" />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4">🌱 Conservation Impact</Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Travel That Makes a Difference</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every AVES tour directly supports habitat conservation and local communities. We're committed to becoming
            the first B Corp certified birding company in Colombia.
          </p>
        </div>
      </section>

      {/* Conservation Pillars */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Conservation Pillars</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every aspect of our operations is designed to create positive environmental and social impact
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Carbon Neutral Tours</h3>
              <p className="text-gray-600">
                All tours operate with full carbon neutrality, with offsets reinvested in critical bird habitat
                preservation projects.
              </p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Community Support</h3>
              <p className="text-gray-600">
                We partner with local communities, providing fair employment and supporting community-managed
                conservation initiatives.
              </p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Habitat Protection</h3>
              <p className="text-gray-600">
                10% of net profits fund our Conservation Endowment Trust, dedicated to permanent habitat restoration and
                protection.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* B Corp Journey */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Pursuing B Corp Certification</h3>
                <p className="text-gray-600 mb-6">
                  AVES is committed to meeting the highest standards of social and environmental responsibility. We're
                  working toward B Corp certification, joining BirdsChile as only the second birding-focused B Corp
                  globally.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
                    <span className="text-gray-700">Transparent impact reporting</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
                    <span className="text-gray-700">Stakeholder governance model</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
                    <span className="text-gray-700">Environmental accountability</span>
                  </div>
                </div>
              </div>
              <div className="aspect-square rounded-xl overflow-hidden relative">
                <Image
                  src="/images/masked-trogon-male.jpg"
                  alt="Masked Trogon representing cloud forest conservation efforts"
                  width={400}
                  height={400}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Every journey with AVES contributes directly to protecting Colombia's incredible biodiversity for future
            generations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shopping">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-4">
                Book Your Conservation Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src="/images/aves-logo.png"
                  alt="AVES Birdwatching Tours Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <p className="text-gray-400 mb-4">
                Premium birding tours in Colombia, committed to conservation and sustainable tourism.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                  <span className="text-sm">ig</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                  <span className="text-sm">tw</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Tours</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/tours/adventure" className="hover:text-white transition-colors">
                    AVES Adventure
                  </Link>
                </li>
                <li>
                  <Link href="/tours/vision" className="hover:text-white transition-colors">
                    AVES Vision
                  </Link>
                </li>
                <li>
                  <Link href="/tours/elevate" className="hover:text-white transition-colors">
                    AVES Elevate
                  </Link>
                </li>
                <li>
                  <Link href="/tours/souls" className="hover:text-white transition-colors">
                    AVES Souls
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About AVES
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="hover:text-white transition-colors flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="/conservation" className="hover:text-white transition-colors">
                    Conservation
                  </Link>
                </li>
                <li>
                  <Link href="/about/b-corp" className="hover:text-white transition-colors flex items-center group">
                    <span className="mr-1 text-xs font-bold bg-white text-gray-900 px-1 rounded">B</span>B Corp Journey
                    <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">↑</span>
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Bird Guide
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Travel Tips
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 AVES. All rights reserved.</p>
            <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
