"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Menu, X, ChevronDown, Shield, Settings, Eye, Target, Users } from "lucide-react"
import Link from "next/link"
import OptimizedImage from "@/components/optimized-image"
import { CookieManagementButton } from "@/components/cookie-management-button"
import { Footer } from "@/components/footer"

export default function CookiesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/">
              <OptimizedImage
                src="/images/aves-logo.png"
                alt="AVES Birdwatching Tours Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Tours Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center text-gray-700 hover:text-emerald-600 transition-colors"
                aria-expanded="false"
                aria-haspopup="true"
              >
                Tours
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link
                  href="/tours"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors border-b"
                >
                  All Tours Overview
                </Link>
                <Link
                  href="/tours/adventure"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  🍃 AVES Adventure
                </Link>
                <Link
                  href="/tours/vision"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  🪶 AVES Vision
                </Link>
                <Link
                  href="/tours/elevate"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  🌼 AVES Elevate
                </Link>
                <Link
                  href="/tours/souls"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  🍓 AVES Souls
                </Link>
              </div>
            </div>
            {/* About Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-emerald-600 transition-colors">
                About
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link
                  href="/about"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  About AVES
                </Link>
                <Link
                  href="/team"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  Our Team
                </Link>
                <Link
                  href="/about/partners"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  Our Partners
                </Link>
              </div>
            </div>
            <Link href="/about/b-corp" className="text-gray-700 hover:text-emerald-600 transition-colors">
              B Corp Journey
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Blog
            </Link>
            <Link href="/conservation" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Conservation
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Link href="/shopping">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Book Your Journey</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              <div className="py-2">
                <div className="text-gray-700 font-medium py-2">Tours</div>
                <div className="pl-4 space-y-2">
                  <Link
                    href="/tours"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    All Tours Overview
                  </Link>
                  <Link
                    href="/tours/adventure"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🍃 AVES Adventure
                  </Link>
                  <Link
                    href="/tours/vision"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🪶 AVES Vision
                  </Link>
                  <Link
                    href="/tours/elevate"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🌼 AVES Elevate
                  </Link>
                  <Link
                    href="/tours/souls"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🍓 AVES Souls
                  </Link>
                </div>
              </div>
              <div className="py-2">
                <div className="text-gray-700 font-medium py-2">About</div>
                <div className="pl-4 space-y-2">
                  <Link
                    href="/about"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About AVES
                  </Link>
                  <Link
                    href="/team"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Our Team
                  </Link>
                  <Link
                    href="/about/partners"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Our Partners
                  </Link>
                </div>
              </div>
              <Link
                href="/about/b-corp"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                B Corp Journey
              </Link>
              <Link
                href="/blog"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/conservation"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Conservation
              </Link>
              <Link
                href="/contact"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4">
                <Link href="/shopping">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Book Your Journey</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

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
                  </CookieManagementButton>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
