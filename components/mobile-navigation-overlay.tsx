"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import OptimizedImage from "@/components/optimized-image"
import { cn } from "@/lib/utils"

interface MobileNavigationOverlayProps {
  currentPage?: string
}

export function MobileNavigationOverlay({ currentPage }: MobileNavigationOverlayProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const logoButtonRef = useRef<HTMLButtonElement>(null)

  // Handle scroll detection for logo button styling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 20)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle menu toggle with body scroll lock
  const toggleMenu = () => {
    const newState = !isMenuOpen
    setIsMenuOpen(newState)

    if (newState) {
      // Lock body scroll and store current position
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.body.style.overflow = "hidden"
    } else {
      // Restore body scroll and position
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflow = ""

      if (scrollY) {
        window.scrollTo(0, Number.parseInt(scrollY || "0") * -1)
      }
    }
  }

  // Close menu on link click
  const handleLinkClick = () => {
    toggleMenu()
  }

  // Handle ESC key to close menu
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        toggleMenu()
      }
    }

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isMenuOpen])

  // Focus management for accessibility
  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      const firstFocusableElement = menuRef.current.querySelector(
        'a, button, [tabindex]:not([tabindex="-1"])',
      ) as HTMLElement
      firstFocusableElement?.focus()
    }
  }, [isMenuOpen])

  return (
    <>
      {/* Sticky AVES Logo Button - Only visible on mobile */}
      <button
        ref={logoButtonRef}
        onClick={toggleMenu}
        className={cn(
          "md:hidden fixed top-4 right-4 z-[100] w-12 h-12 rounded-xl transition-all duration-300 ease-out",
          "flex items-center justify-center shadow-lg hover:shadow-xl",
          "focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2",
          "transform hover:scale-105 active:scale-95",
          isScrolled || isMenuOpen
            ? "bg-white/95 backdrop-blur-md border border-white/30"
            : "bg-white/80 backdrop-blur-sm border border-white/20",
          isMenuOpen && "rotate-180 scale-110 bg-emerald-50/95 border-emerald-200",
        )}
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation-menu"
      >
        <OptimizedImage
          src="/images/aves-logo.png"
          alt="AVES Logo"
          width={28}
          height={28}
          className={cn("object-contain transition-all duration-300", isMenuOpen ? "opacity-90" : "opacity-100")}
          priority
        />

        {/* Subtle glow effect */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl transition-all duration-300 pointer-events-none",
            isMenuOpen
              ? "bg-gradient-to-br from-emerald-400/20 to-emerald-600/20"
              : "bg-gradient-to-br from-white/10 to-white/5",
          )}
        />
      </button>

      {/* Backdrop Overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-[90] transition-opacity duration-300"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Menu */}
      <div
        ref={menuRef}
        id="mobile-navigation-menu"
        className={cn(
          "md:hidden fixed top-0 right-0 h-full z-[95] transition-all duration-500 ease-out",
          "w-[75vw] max-w-sm",
          "bg-white/50 backdrop-blur-xl border-l border-white/30 shadow-2xl",
          isMenuOpen ? "translate-x-0 opacity-100 visible" : "translate-x-full opacity-0 invisible",
        )}
        role="navigation"
        aria-label="Mobile navigation menu"
      >
        {/* Menu Content Container */}
        <div className="flex flex-col h-full">
          {/* Header Spacer */}
          <div className="h-20 flex-shrink-0" />

          {/* Scrollable Navigation Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <nav className="space-y-8">
              {/* Tours Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 px-3 py-2 bg-white/60 backdrop-blur-sm rounded-lg border border-white/40 shadow-sm">
                  🗺️ Tours
                </h3>
                <div className="space-y-2 pl-2">
                  <Link
                    href="/tours"
                    onClick={handleLinkClick}
                    className={cn(
                      "block py-3 px-4 rounded-lg transition-all duration-200",
                      "text-gray-800 hover:text-emerald-700 hover:bg-white/70",
                      "bg-white/40 backdrop-blur-sm border border-white/30 shadow-sm",
                      "font-medium text-sm",
                      currentPage?.startsWith("/tours") &&
                        !currentPage.includes("/adventure") &&
                        !currentPage.includes("/vision") &&
                        !currentPage.includes("/elevate") &&
                        !currentPage.includes("/souls")
                        ? "bg-emerald-50/80 text-emerald-700 border-emerald-200"
                        : "",
                    )}
                  >
                    All AVES Tours
                  </Link>
                  <Link
                    href="/tours/adventure"
                    onClick={handleLinkClick}
                    className={cn(
                      "block py-3 px-4 rounded-lg transition-all duration-200",
                      "text-gray-800 hover:text-emerald-700 hover:bg-white/70",
                      "bg-white/40 backdrop-blur-sm border border-white/30 shadow-sm",
                      "font-medium text-sm",
                      currentPage?.includes("/tours/adventure")
                        ? "bg-emerald-50/80 text-emerald-700 border-emerald-200"
                        : "",
                    )}
                  >
                    🌿 Adventure Tours
                  </Link>
                  <Link
                    href="/tours/vision"
                    onClick={handleLinkClick}
                    className={cn(
                      "block py-3 px-4 rounded-lg transition-all duration-200",
                      "text-gray-800 hover:text-emerald-700 hover:bg-white/70",
                      "bg-white/40 backdrop-blur-sm border border-white/30 shadow-sm",
                      "font-medium text-sm",
                      currentPage?.includes("/tours/vision")
                        ? "bg-emerald-50/80 text-emerald-700 border-emerald-200"
                        : "",
                    )}
                  >
                    🪶 Vision Tours
                  </Link>
                  <Link
                    href="/tours/elevate"
                    onClick={handleLinkClick}
                    className={cn(
                      "block py-3 px-4 rounded-lg transition-all duration-200",
                      "text-gray-800 hover:text-emerald-700 hover:bg-white/70",
                      "bg-white/40 backdrop-blur-sm border border-white/30 shadow-sm",
                      "font-medium text-sm",
                      currentPage?.includes("/tours/elevate")
                        ? "bg-emerald-50/80 text-emerald-700 border-emerald-200"
                        : "",
                    )}
                  >
                    🌻 Elevate Tours
                  </Link>
                  <Link
                    href="/tours/souls"
                    onClick={handleLinkClick}
                    className={cn(
                      "block py-3 px-4 rounded-lg transition-all duration-200",
                      "text-gray-800 hover:text-emerald-700 hover:bg-white/70",
                      "bg-white/40 backdrop-blur-sm border border-white/30 shadow-sm",
                      "font-medium text-sm",
                      currentPage?.includes("/tours/souls")
                        ? "bg-emerald-50/80 text-emerald-700 border-emerald-200"
                        : "",
                    )}
                  >
                    🍓 Souls Tours
                  </Link>
                </div>
              </div>

              {/* Explore Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 px-3 py-2 bg-white/60 backdrop-blur-sm rounded-lg border border-white/40 shadow-sm">
                  🦅 Explore
                </h3>
                <div className="space-y-2 pl-2">
                  <Link
                    href="/aves-explorer"
                    onClick={handleLinkClick}
                    className={cn(
                      "block py-3 px-4 rounded-lg transition-all duration-200",
                      "text-gray-800 hover:text-emerald-700 hover:bg-white/70",
                      "bg-white/40 backdrop-blur-sm border border-white/30 shadow-sm",
                      "font-medium text-sm",
                      currentPage?.includes("/aves-explorer")
                        ? "bg-emerald-50/80 text-emerald-700 border-emerald-200"
                        : "",
                    )}
                  >
                    🇨🇴 Colombia
                  </Link>
                  <Link
                    href="/blog"
                    onClick={handleLinkClick}
                    className={cn(
                      "block py-3 px-4 rounded-lg transition-all duration-200",
                      "text-gray-800 hover:text-emerald-700 hover:bg-white/70",
                      "bg-white/40 backdrop-blur-sm border border-white/30 shadow-sm",
                      "font-medium text-sm",
                      currentPage?.includes("/blog") ? "bg-emerald-50/80 text-emerald-700 border-emerald-200" : "",
                    )}
                  >
                    📖 Birding with AVES
                  </Link>
                  <Link
                    href="/resources"
                    onClick={handleLinkClick}
                    className={cn(
                      "block py-3 px-4 rounded-lg transition-all duration-200",
                      "text-gray-800 hover:text-emerald-700 hover:bg-white/70",
                      "bg-white/40 backdrop-blur-sm border border-white/30 shadow-sm",
                      "font-medium text-sm",
                      currentPage?.includes("/resources") ? "bg-emerald-50/80 text-emerald-700 border-emerald-200" : "",
                    )}
                  >
                    📚 Birding in Colombia
                  </Link>
                  <Link
                    href="/travel-tips"
                    onClick={handleLinkClick}
                    className={cn(
                      "block py-3 px-4 rounded-lg transition-all duration-200",
                      "text-gray-800 hover:text-emerald-700 hover:bg-white/70",
                      "bg-white/40 backdrop-blur-sm border border-white/30 shadow-sm",
                      "font-medium text-sm",
                      currentPage?.includes("/travel-tips")
                        ? "bg-emerald-50/80 text-emerald-700 border-emerald-200"
                        : "",
                    )}
                  >
                    ✈️ Travel Essentials
                  </Link>
                </div>
              </div>

              {/* AVES Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 px-3 py-2 bg-white/60 backdrop-blur-sm rounded-lg border border-white/40 shadow-sm">
                  🏢 AVES
                </h3>
                <div className="space-y-2 pl-2">
                  <Link
                    href="/about"
                    onClick={handleLinkClick}
                    className={cn(
                      "block py-3 px-4 rounded-lg transition-all duration-200",
                      "text-gray-800 hover:text-emerald-700 hover:bg-white/70",
                      "bg-white/40 backdrop-blur-sm border border-white/30 shadow-sm",
                      "font-medium text-sm",
                      currentPage?.includes("/about") &&
                        !currentPage.includes("/partners") &&
                        !currentPage.includes("/b-corp")
                        ? "bg-emerald-50/80 text-emerald-700 border-emerald-200"
                        : "",
                    )}
                  >
                    👥 About AVES
                  </Link>
                  <Link
                    href="/team"
                    onClick={handleLinkClick}
                    className={cn(
                      "block py-3 px-4 rounded-lg transition-all duration-200",
                      "text-gray-800 hover:text-emerald-700 hover:bg-white/70",
                      "bg-white/40 backdrop-blur-sm border border-white/30 shadow-sm",
                      "font-medium text-sm",
                      currentPage?.includes("/team") ? "bg-emerald-50/80 text-emerald-700 border-emerald-200" : "",
                    )}
                  >
                    🧑‍🤝‍🧑 Our Team
                  </Link>
                  <Link
                    href="/about/partners"
                    onClick={handleLinkClick}
                    className={cn(
                      "block py-3 px-4 rounded-lg transition-all duration-200",
                      "text-gray-800 hover:text-emerald-700 hover:bg-white/70",
                      "bg-white/40 backdrop-blur-sm border border-white/30 shadow-sm",
                      "font-medium text-sm",
                      currentPage?.includes("/about/partners")
                        ? "bg-emerald-50/80 text-emerald-700 border-emerald-200"
                        : "",
                    )}
                  >
                    🤝 Our Partners
                  </Link>
                  <Link
                    href="/about/b-corp"
                    onClick={handleLinkClick}
                    className={cn(
                      "block py-3 px-4 rounded-lg transition-all duration-200",
                      "text-gray-800 hover:text-emerald-700 hover:bg-white/70",
                      "bg-white/40 backdrop-blur-sm border border-white/30 shadow-sm",
                      "font-medium text-sm",
                      currentPage?.includes("/about/b-corp")
                        ? "bg-emerald-50/80 text-emerald-700 border-emerald-200"
                        : "",
                    )}
                  >
                    🌿 Our B Corp Journey
                  </Link>
                  <Link
                    href="/conservation"
                    onClick={handleLinkClick}
                    className={cn(
                      "block py-3 px-4 rounded-lg transition-all duration-200",
                      "text-gray-800 hover:text-emerald-700 hover:bg-white/70",
                      "bg-white/40 backdrop-blur-sm border border-white/30 shadow-sm",
                      "font-medium text-sm",
                      currentPage?.includes("/conservation")
                        ? "bg-emerald-50/80 text-emerald-700 border-emerald-200"
                        : "",
                    )}
                  >
                    🌱 Conservation
                  </Link>
                  <Link
                    href="/contact"
                    onClick={handleLinkClick}
                    className={cn(
                      "block py-3 px-4 rounded-lg transition-all duration-200",
                      "text-gray-800 hover:text-emerald-700 hover:bg-white/70",
                      "bg-white/40 backdrop-blur-sm border border-white/30 shadow-sm",
                      "font-medium text-sm",
                      currentPage?.includes("/contact") ? "bg-emerald-50/80 text-emerald-700 border-emerald-200" : "",
                    )}
                  >
                    📧 Contact
                  </Link>
                </div>
              </div>
            </nav>
          </div>

          {/* Footer CTA Button */}
          <div className="flex-shrink-0 p-6 border-t border-white/30 bg-white/60 backdrop-blur-lg">
            <Link href="/shopping" onClick={handleLinkClick}>
              <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Book Your Journey
              </Button>
            </Link>

            {/* Legal Links */}
            <div className="flex justify-center space-x-4 mt-4 text-xs text-gray-600">
              <Link href="/privacy" onClick={handleLinkClick} className="hover:text-emerald-600 transition-colors">
                Privacy
              </Link>
              <span>•</span>
              <Link href="/terms" onClick={handleLinkClick} className="hover:text-emerald-600 transition-colors">
                Terms
              </Link>
              <span>•</span>
              <Link href="/cookies" onClick={handleLinkClick} className="hover:text-emerald-600 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
