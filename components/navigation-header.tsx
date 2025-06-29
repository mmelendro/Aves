"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"
import OptimizedImage from "@/components/optimized-image"

interface NavigationHeaderProps {
  currentPage?: string
}

export function NavigationHeader({ currentPage }: NavigationHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("menu-open")
      // Store current scroll position
      const scrollY = window.scrollY
      document.body.style.top = `-${scrollY}px`
    } else {
      document.body.classList.remove("menu-open")
      // Restore scroll position
      const scrollY = document.body.style.top
      document.body.style.top = ""
      if (scrollY) {
        window.scrollTo(0, Number.parseInt(scrollY || "0") * -1)
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("menu-open")
      document.body.style.top = ""
    }
  }, [mobileMenuOpen])

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [mobileMenuOpen])

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center">
            <OptimizedImage
              src="/images/aves-logo.png"
              alt="AVES Birdwatching Tours Logo"
              width={64}
              height={64}
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {/* Tours Dropdown */}
          <div className="relative group">
            <Link
              href="/tours"
              className={`flex items-center transition-colors ${
                currentPage?.startsWith("/tours") ? "text-emerald-600" : "text-gray-700 hover:text-emerald-600"
              }`}
              aria-expanded="false"
              aria-haspopup="true"
            >
              Tours
              <ChevronDown className="w-4 h-4 ml-1" />
            </Link>
            <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link
                href="/tours"
                className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors border-b"
              >
                🗺️ All Tours Overview
              </Link>
              <Link
                href="/tours/adventure"
                className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                🍃 Adventure Tours
              </Link>
              <Link
                href="/tours/vision"
                className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                🪶 Vision Tours
              </Link>
              <Link
                href="/tours/elevate"
                className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                🌼 Elevate Tours
              </Link>
              <Link
                href="/tours/souls"
                className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                🍓 Souls Tours
              </Link>
            </div>
          </div>

          {/* Resources Dropdown - Enhanced Mega Menu with AVES Explorer */}
          <div className="relative group">
            <Link
              href="/resources"
              className={`flex items-center transition-colors ${
                currentPage?.startsWith("/blog") ||
                currentPage?.startsWith("/resources") ||
                currentPage?.startsWith("/travel-tips") ||
                currentPage?.startsWith("/aves-explorer")
                  ? "text-emerald-600"
                  : "text-gray-700 hover:text-emerald-600"
              }`}
            >
              Resources
              <ChevronDown className="w-4 h-4 ml-1" />
            </Link>
            <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100 mb-2">
                  Explore & Plan
                </div>
                <Link
                  href="/aves-explorer"
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors rounded-md"
                >
                  <span className="text-lg mr-3">🦅</span>
                  <div>
                    <div className="font-medium">AVES Explorer</div>
                    <div className="text-xs text-gray-500">1,900+ species across 11 bioregions & 31 ecoregions</div>
                  </div>
                </Link>

                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100 mb-2 mt-3">
                  Learn & Prepare
                </div>
                <Link
                  href="/resources"
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors rounded-md"
                >
                  <span className="text-lg mr-3">📚</span>
                  <div>
                    <div className="font-medium">Expert Resources Hub</div>
                    <div className="text-xs text-gray-500">Podcasts, guides & preparation</div>
                  </div>
                </Link>
                <Link
                  href="/travel-tips"
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors rounded-md"
                >
                  <span className="text-lg mr-3">✈️</span>
                  <div>
                    <div className="font-medium">Travel Essentials</div>
                    <div className="text-xs text-gray-500">Practical travel advice</div>
                  </div>
                </Link>

                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100 mb-2 mt-3">
                  Stories & Insights
                </div>
                <Link
                  href="/blog"
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors rounded-md"
                >
                  <span className="text-lg mr-3">📝</span>
                  <div>
                    <div className="font-medium">Blog & Expeditions</div>
                    <div className="text-xs text-gray-500">Field stories & discoveries</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* About Dropdown */}
          <div className="relative group">
            <Link
              href="/about"
              className={`flex items-center transition-colors ${
                currentPage?.startsWith("/about") || currentPage?.startsWith("/team")
                  ? "text-emerald-600"
                  : "text-gray-700 hover:text-emerald-600"
              }`}
            >
              About
              <ChevronDown className="w-4 h-4 ml-1" />
            </Link>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link
                href="/about"
                className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                🏢 About AVES
              </Link>
              <Link
                href="/team"
                className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                👥 Our Team
              </Link>
              <Link
                href="/about/partners"
                className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                🤝 Our Partners
              </Link>
            </div>
          </div>

          <Link
            href="/about/b-corp"
            className={`transition-colors ${
              currentPage === "/about/b-corp" ? "text-emerald-600" : "text-gray-700 hover:text-emerald-600"
            }`}
          >
            B Corp Journey
          </Link>
          <Link
            href="/conservation"
            className={`transition-colors ${
              currentPage === "/conservation" ? "text-emerald-600" : "text-gray-700 hover:text-emerald-600"
            }`}
          >
            Conservation
          </Link>
          <Link
            href="/contact"
            className={`transition-colors ${
              currentPage === "/contact" ? "text-emerald-600" : "text-gray-700 hover:text-emerald-600"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <Link href="/shopping">
            <Button className="bg-emerald-600 hover:bg-emerald-700">Book Your Journey</Button>
          </Link>
        </div>

        {/* Mobile Menu Button - Enhanced */}
        <button
          className="md:hidden p-3 -mr-3 touch-manipulation"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
        </button>
      </div>

      {/* Mobile Navigation Backdrop */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 top-[73px] bg-black/20 z-30"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation - Enhanced with AVES Explorer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[73px] z-40 bg-white border-t shadow-lg">
          <div className="max-h-[calc(100vh-73px)] overflow-y-auto overscroll-contain">
            <nav id="mobile-navigation" className="container mx-auto px-4 py-6 space-y-6">
              <div className="py-2">
                <Link
                  href="/tours"
                  className="text-gray-700 font-medium py-3 hover:text-emerald-600 transition-colors block text-lg touch-manipulation"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Tours
                </Link>
                <div className="pl-4 space-y-3 mt-3">
                  <Link
                    href="/tours"
                    className="mobile-menu-item block text-gray-600 hover:text-emerald-600 transition-colors py-2 focus:outline-none text-base touch-manipulation"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🗺️ All Tours Overview
                  </Link>
                  <Link
                    href="/tours/adventure"
                    className="mobile-menu-item block text-gray-600 hover:text-emerald-600 transition-colors py-2 focus:outline-none text-base touch-manipulation"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🍃 Adventure Tours
                  </Link>
                  <Link
                    href="/tours/vision"
                    className="mobile-menu-item block text-gray-600 hover:text-emerald-600 transition-colors py-2 focus:outline-none text-base touch-manipulation"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🪶 Vision Tours
                  </Link>
                  <Link
                    href="/tours/elevate"
                    className="mobile-menu-item block text-gray-600 hover:text-emerald-600 transition-colors py-2 focus:outline-none text-base touch-manipulation"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🌼 Elevate Tours
                  </Link>
                  <Link
                    href="/tours/souls"
                    className="mobile-menu-item block text-gray-600 hover:text-emerald-600 transition-colors py-2 focus:outline-none text-base touch-manipulation"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🍓 Souls Tours
                  </Link>
                </div>
              </div>
              <div className="py-2">
                <Link
                  href="/resources"
                  className="text-gray-700 font-medium py-3 hover:text-emerald-600 transition-colors block text-lg touch-manipulation"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Resources Hub
                </Link>
                <div className="pl-4 space-y-3 mt-3">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide py-1">Explore & Plan</div>
                  <Link
                    href="/aves-explorer"
                    className="mobile-menu-item block text-gray-600 hover:text-emerald-600 transition-colors py-2 focus:outline-none text-base touch-manipulation"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🦅 AVES Explorer
                  </Link>

                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide py-1 mt-4">
                    Learn & Prepare
                  </div>
                  <Link
                    href="/resources"
                    className="mobile-menu-item block text-gray-600 hover:text-emerald-600 transition-colors py-2 focus:outline-none text-base touch-manipulation"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    📚 Expert Resources Hub
                  </Link>
                  <Link
                    href="/travel-tips"
                    className="mobile-menu-item block text-gray-600 hover:text-emerald-600 transition-colors py-2 focus:outline-none text-base touch-manipulation"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    ✈️ Travel Essentials
                  </Link>

                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide py-1 mt-4">
                    Stories & Insights
                  </div>
                  <Link
                    href="/blog"
                    className="mobile-menu-item block text-gray-600 hover:text-emerald-600 transition-colors py-2 focus:outline-none text-base touch-manipulation"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    📝 Blog & Expeditions
                  </Link>
                </div>
              </div>
              <div className="py-2">
                <Link
                  href="/about"
                  className="text-gray-700 font-medium py-3 hover:text-emerald-600 transition-colors block text-lg touch-manipulation"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <div className="pl-4 space-y-3 mt-3">
                  <Link
                    href="/about"
                    className="mobile-menu-item block text-gray-600 hover:text-emerald-600 transition-colors py-2 focus:outline-none text-base touch-manipulation"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🏢 About AVES
                  </Link>
                  <Link
                    href="/team"
                    className="mobile-menu-item block text-gray-600 hover:text-emerald-600 transition-colors py-2 focus:outline-none text-base touch-manipulation"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    👥 Our Team
                  </Link>
                  <Link
                    href="/about/partners"
                    className="mobile-menu-item block text-gray-600 hover:text-emerald-600 transition-colors py-2 focus:outline-none text-base touch-manipulation"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🤝 Our Partners
                  </Link>
                </div>
              </div>
              <Link
                href="/about/b-corp"
                className="mobile-menu-item block text-gray-700 hover:text-emerald-600 transition-colors py-2 focus:outline-none text-lg touch-manipulation"
                onClick={() => setMobileMenuOpen(false)}
              >
                B Corp Journey
              </Link>
              <Link
                href="/conservation"
                className="mobile-menu-item block text-gray-700 hover:text-emerald-600 transition-colors py-2 focus:outline-none text-lg touch-manipulation"
                onClick={() => setMobileMenuOpen(false)}
              >
                Conservation
              </Link>
              <Link
                href="/contact"
                className="mobile-menu-item block text-gray-700 hover:text-emerald-600 transition-colors py-2 focus:outline-none text-lg touch-manipulation"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-6 pb-4 border-t border-gray-100">
                <Link href="/shopping">
                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700 min-h-[48px] text-base touch-manipulation"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Book Your Journey
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
