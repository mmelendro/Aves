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
              className={`flex items-center transition-colors ${
                currentPage?.startsWith("/tours") ? "text-emerald-600" : "text-gray-700 hover:text-emerald-600"
              }`}
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
                AVES Adventure
              </Link>
              <Link
                href="/tours/vision"
                className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                AVES Vision
              </Link>
              <Link
                href="/tours/elevate"
                className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                AVES Elevate
              </Link>
              <Link
                href="/tours/souls"
                className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                AVES Souls
              </Link>
            </div>
          </div>

          {/* About Dropdown */}
          <div className="relative group">
            <button
              className={`flex items-center transition-colors ${
                currentPage?.startsWith("/about") || currentPage?.startsWith("/team")
                  ? "text-emerald-600"
                  : "text-gray-700 hover:text-emerald-600"
              }`}
            >
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

          <Link
            href="/about/b-corp"
            className={`transition-colors ${
              currentPage === "/about/b-corp" ? "text-emerald-600" : "text-gray-700 hover:text-emerald-600"
            }`}
          >
            B Corp Journey
          </Link>
          <Link
            href="/blog"
            className={`transition-colors ${
              currentPage?.startsWith("/blog") ? "text-emerald-600" : "text-gray-700 hover:text-emerald-600"
            }`}
          >
            Blog
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
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

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[73px] z-40 bg-white border-t shadow-lg">
          <div className="max-h-[calc(100vh-73px)] overflow-y-auto overscroll-contain">
            <nav id="mobile-navigation" className="container mx-auto px-4 py-4 space-y-4">
              <div className="py-2">
                <div className="text-gray-700 font-medium py-2">Tours</div>
                <div className="pl-4 space-y-2">
                  <Link
                    href="/tours"
                    className="mobile-menu-item block text-gray-600 hover:text-emerald-600 transition-colors py-1 focus:outline-none"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    All Tours Overview
                  </Link>
                  <Link
                    href="/tours/adventure"
                    className="mobile-menu-item block text-gray-600 hover:text-emerald-600 transition-colors py-1 focus:outline-none"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    AVES Adventure
                  </Link>
                  <Link
                    href="/tours/vision"
                    className="mobile-menu-item block text-gray-600 hover:text-emerald-600 transition-colors py-1 focus:outline-none"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    AVES Vision
                  </Link>
                  <Link
                    href="/tours/elevate"
                    className="mobile-menu-item block text-gray-600 hover:text-emerald-600 transition-colors py-1 focus:outline-none"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    AVES Elevate
                  </Link>
                  <Link
                    href="/tours/souls"
                    className="mobile-menu-item block text-gray-600 hover:text-emerald-600 transition-colors py-1 focus:outline-none"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    AVES Souls
                  </Link>
                </div>
              </div>
              <div className="py-2">
                <div className="text-gray-700 font-medium py-2">About</div>
                <div className="pl-4 space-y-2">
                  <Link
                    href="/about"
                    className="mobile-menu-item block text-gray-600 hover:text-emerald-600 transition-colors py-1 focus:outline-none"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About AVES
                  </Link>
                  <Link
                    href="/team"
                    className="mobile-menu-item block text-gray-600 hover:text-emerald-600 transition-colors py-1 focus:outline-none"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Our Team
                  </Link>
                  <Link
                    href="/about/partners"
                    className="mobile-menu-item block text-gray-600 hover:text-emerald-600 transition-colors py-1 focus:outline-none"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Our Partners
                  </Link>
                </div>
              </div>
              <Link
                href="/about/b-corp"
                className="mobile-menu-item block text-gray-700 hover:text-emerald-600 transition-colors py-2 focus:outline-none"
                onClick={() => setMobileMenuOpen(false)}
              >
                B Corp Journey
              </Link>
              <Link
                href="/blog"
                className="mobile-menu-item block text-gray-700 hover:text-emerald-600 transition-colors py-2 focus:outline-none"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/conservation"
                className="mobile-menu-item block text-gray-700 hover:text-emerald-600 transition-colors py-2 focus:outline-none"
                onClick={() => setMobileMenuOpen(false)}
              >
                Conservation
              </Link>
              <Link
                href="/contact"
                className="mobile-menu-item block text-gray-700 hover:text-emerald-600 transition-colors py-2 focus:outline-none"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 pb-2">
                <Link href="/shopping">
                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
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
