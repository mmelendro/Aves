"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Settings, Eye, Target, Users } from "lucide-react"
import Link from "next/link"
import OptimizedImage from "@/components/optimized-image"
import { NavigationHeader } from "@/components/navigation-header"
import CookieManagementButton from "@/components/cookie-management-button" // Import the CookieManagementButton component

export default function CookiesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <NavigationHeader currentPage="/cookies" />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-blue-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-6">
              🍪 Privacy & Transparency
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Our Cookie
              <span className="text-emerald-600 block">Policy</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              We believe in transparency about how we collect and use data. Learn about our cookie practices and how you
              can control your privacy preferences.
            </p>
          </div>
        </div>
      </section>

      {/* Cookie Policy Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <Card className="mb-12 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <Shield className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Introduction</h2>
                </div>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    This Cookie Policy explains how AVES Colombia uses cookies and similar technologies to recognize you
                    when you visit our website. It explains what these technologies are and why we use them, as well as
                    your rights to control our use of them.
                  </p>
                  <p>
                    Cookies are small data files that are placed on your computer or mobile device when you visit a
                    website. Cookies are widely used by website owners to make their websites work, or to work more
                    efficiently, as well as to provide reporting information.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Types of Cookies */}
            <Card className="mb-12 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <Settings className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Types of Cookies We Use</h2>
                </div>
                <p className="text-gray-600 mb-8">
                  We use first-party and third-party cookies for several purposes. First-party cookies are set by us,
                  while third-party cookies are set by third-party domains.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Shield className="w-6 h-6 text-emerald-600 mr-3" />
                      <h3 className="text-lg font-semibold text-gray-900">Strictly Necessary</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      These cookies are essential to enable you to browse our website and use its features, such as
                      accessing secure areas.
                    </p>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Eye className="w-6 h-6 text-blue-600 mr-3" />
                      <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      These cookies collect information about how visitors use our website, such as which pages are
                      visited most often.
                    </p>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Settings className="w-6 h-6 text-purple-600 mr-3" />
                      <h3 className="text-lg font-semibold text-gray-900">Functionality</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      These cookies allow our website to remember choices you make and provide enhanced, personalized
                      features.
                    </p>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Target className="w-6 h-6 text-orange-600 mr-3" />
                      <h3 className="text-lg font-semibold text-gray-900">Targeting</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      These cookies are used to deliver advertisements that are more relevant to you and your interests.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Managing Preferences */}
            <Card className="mb-12 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Managing Your Cookie Preferences</h2>
                </div>
                <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
                  <p>
                    You have the right to decide whether to accept or reject cookies. You can exercise your cookie
                    preferences by using our cookie consent manager. You can set or amend your web browser controls to
                    accept or refuse cookies.
                  </p>
                  <p>
                    If you choose to reject cookies, you may still use our website though your access to some
                    functionality and areas of our website may be restricted.
                  </p>
                </div>

                <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <span className="mr-3 text-sm font-bold bg-emerald-600 text-white px-2 py-1 rounded">B</span>
                    <h3 className="text-xl font-semibold text-emerald-800">Manage Your Preferences Now</h3>
                  </div>
                  <p className="text-emerald-700 mb-4">
                    Take control of your privacy. Use our preference center to customize your cookie settings according
                    to your preferences.
                  </p>
                  <CookieManagementButton
                    variant="default"
                    size="lg"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Open Cookie Preference Center
                  </CookieManagementButton>{" "}
                  {/* Corrected JSX closing tag */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <OptimizedImage
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
                    🍃 AVES Adventure
                  </Link>
                </li>
                <li>
                  <Link href="/tours/vision" className="hover:text-white transition-colors">
                    🪶 AVES Vision
                  </Link>
                </li>
                <li>
                  <Link href="/tours/elevate" className="hover:text-white transition-colors">
                    🌼 AVES Elevate
                  </Link>
                </li>
                <li>
                  <Link href="/tours/souls" className="hover:text-white transition-colors">
                    🍓 AVES Souls
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    🦅 About AVES
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
                    🌱 Conservation
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
                    📝 Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    🐦 Bird Guide
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    ✈️ Travel Tips
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    📞 Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 AVES. All rights reserved.</p>
            <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-white transition-colors">
                🔒 Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                📋 Terms of Service
              </Link>
              <CookieManagementButton
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white transition-colors p-0 h-auto font-normal"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
