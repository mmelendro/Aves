"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, ChevronLeft } from "lucide-react"
import Link from "next/link"
import OptimizedImage from "@/components/optimized-image"
import { cn } from "@/lib/utils"

interface NavigationHeaderProps {
  currentPage?: string
}

export function NavigationHeader({ currentPage }: NavigationHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [desktopMenuExpanded, setDesktopMenuExpanded] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const collapseTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Handle scroll detection for consistent background across all pages
  useEffect(() => {
    const handleScroll = () => {
      try {
        const scrollPosition = window.scrollY
        setIsScrolled(scrollPosition > 10)
      } catch (error) {
        console.warn("Error handling scroll:", error)
      }
    }

    handleScroll() // Check initial scroll position
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      try {
        window.removeEventListener("scroll", handleScroll)
      } catch (error) {
        console.warn("Error removing scroll listener:", error)
      }
    }
  }, [])

  // Handle auto-collapse after 3 seconds when cursor leaves menu area
  useEffect(() => {
    try {
      if (desktopMenuExpanded && !isHovering) {
        collapseTimeoutRef.current = setTimeout(() => {
          setDesktopMenuExpanded(false)
        }, 3000)
      } else if (collapseTimeoutRef.current) {
        clearTimeout(collapseTimeoutRef.current)
        collapseTimeoutRef.current = null
      }
    } catch (error) {
      console.warn("Error in auto-collapse effect:", error)
    }

    return () => {
      try {
        if (collapseTimeoutRef.current) {
          clearTimeout(collapseTimeoutRef.current)
        }
      } catch (error) {
        console.warn("Error clearing timeout:", error)
      }
    }
  }, [desktopMenuExpanded, isHovering])

  // Handle mouse enter/leave for the entire menu area
  const handleMouseEnter = () => {
    try {
      setIsHovering(true)
    } catch (error) {
      console.warn("Error handling mouse enter:", error)
    }
  }

  const handleMouseLeave = () => {
    try {
      setIsHovering(false)
    } catch (error) {
      console.warn("Error handling mouse leave:", error)
    }
  }

  // Toggle desktop menu
  const toggleDesktopMenu = () => {
    try {
      setDesktopMenuExpanded(!desktopMenuExpanded)
    } catch (error) {
      console.warn("Error toggling desktop menu:", error)
    }
  }

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    try {
      setMobileMenuOpen(!mobileMenuOpen)
    } catch (error) {
      console.warn("Error toggling mobile menu:", error)
    }
  }

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    try {
      if (mobileMenuOpen) {
        document.body.classList.add("menu-open")
        const scrollY = window.scrollY
        document.body.style.top = `-${scrollY}px`
      } else {
        document.body.classList.remove("menu-open")
        const scrollY = document.body.style.top
        document.body.style.top = ""
        if (scrollY) {
          window.scrollTo(0, Number.parseInt(scrollY || "0") * -1)
        }
      }
    } catch (error) {
      console.warn("Error managing body scroll:", error)
    }

    return () => {
      try {
        document.body.classList.remove("menu-open")
        document.body.style.top = ""
      } catch (error) {
        console.warn("Error cleaning up body scroll:", error)
      }
    }
  }, [mobileMenuOpen])

  // Handle ESC key to close menus
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      try {
        if (event.key === "Escape") {
          if (mobileMenuOpen) {
            setMobileMenuOpen(false)
          }
          if (desktopMenuExpanded) {
            setDesktopMenuExpanded(false)
          }
        }
      } catch (error) {
        console.warn("Error handling ESC key:", error)
      }
    }

    try {
      if (mobileMenuOpen || desktopMenuExpanded) {
        document.addEventListener("keydown", handleEscKey)
      }
    } catch (error) {
      console.warn("Error adding keydown listener:", error)
    }

    return () => {
      try {
        document.removeEventListener("keydown", handleEscKey)
      } catch (error) {
        console.warn("Error removing keydown listener:", error)
      }
    }
  }, [mobileMenuOpen, desktopMenuExpanded])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div
        ref={menuRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "transition-all duration-700 ease-out",
          // Unified background behavior across all pages
          desktopMenuExpanded || isScrolled || mobileMenuOpen
            ? "bg-white/95 backdrop-blur-md border-b border-white/30 shadow-lg"
            : "bg-white/10 backdrop-blur-sm border-b border-white/10 shadow-sm",
        )}
      >
        <div
          className={cn(
            "container mx-auto px-4 flex items-center justify-between transition-all duration-700 ease-out",
            desktopMenuExpanded ? "py-5" : "py-3",
          )}
        >
          {/* Desktop Logo and Toggle Section */}
          <div
            className={cn(
              "hidden md:flex items-center transition-all duration-700 ease-out",
              desktopMenuExpanded ? "pr-8 min-w-[120px]" : "pr-4 min-w-[80px]",
            )}
          >
            <button
              onClick={toggleDesktopMenu}
              className={cn(
                "flex items-center group transition-all duration-700 ease-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-opacity-50 rounded-xl",
                desktopMenuExpanded
                  ? "space-x-3 p-3 bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg"
                  : "space-x-2 p-2 bg-white/10 backdrop-blur-sm border border-white/20 shadow-md",
              )}
              aria-label={desktopMenuExpanded ? "Collapse menu" : "Expand menu"}
            >
              {/* Logo Container with Animation */}
              <div
                className={cn(
                  "relative transition-all duration-700 ease-out flex items-center justify-center flex-shrink-0",
                  desktopMenuExpanded
                    ? "w-12 h-12 sm:w-14 sm:h-14 md:w-12 md:h-12"
                    : "w-8 h-8 sm:w-9 sm:h-9 md:w-8 md:h-8",
                )}
              >
                <OptimizedImage
                  src="/images/aves-logo.png"
                  alt="AVES Birdwatching Tours Logo"
                  width={48}
                  height={48}
                  className={cn(
                    "object-contain transition-all duration-700 ease-out drop-shadow-sm",
                    desktopMenuExpanded
                      ? "w-10 h-10 sm:w-12 sm:h-12 md:w-10 md:h-10 opacity-100"
                      : "w-6 h-6 sm:w-7 sm:h-7 md:w-6 md:h-6 opacity-60",
                  )}
                  style={{
                    objectFit: "contain",
                    objectPosition: "center",
                  }}
                  priority
                />

                {/* Glow effect */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-lg transition-all duration-700 ease-out pointer-events-none",
                    desktopMenuExpanded ? "shadow-md opacity-15" : "shadow-sm opacity-10",
                  )}
                />
              </div>

              {/* Arrow indicator */}
              <div
                className={cn(
                  "transition-all duration-500 ease-out flex items-center justify-center flex-shrink-0",
                  desktopMenuExpanded
                    ? "opacity-100 scale-110 w-6 h-6 bg-white/30 rounded-full p-1 border border-white/20"
                    : "opacity-90 scale-100 w-5 h-5 bg-white/20 rounded-full p-0.5",
                )}
              >
                {desktopMenuExpanded ? (
                  <ChevronLeft className="w-4 h-4 text-gray-700 group-hover:text-emerald-600 drop-shadow-sm transition-all duration-300" />
                ) : (
                  <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-emerald-600 drop-shadow-sm transition-all duration-300" />
                )}
              </div>
            </button>
          </div>

          {/* Mobile Logo Placeholder - Hidden on Mobile */}
          <div className="md:hidden flex-1" />

          {/* Desktop Navigation - Expandable */}
          <nav
            className={cn(
              "hidden md:flex items-center transition-all duration-700 ease-out",
              desktopMenuExpanded
                ? "opacity-100 translate-x-0 pointer-events-auto scale-100 space-x-6 lg:space-x-8"
                : "opacity-0 translate-x-6 pointer-events-none scale-95 space-x-4",
            )}
          >
            {/* Tours Dropdown */}
            <div className="relative group">
              <Link
                href="/tours"
                className={cn(
                  "flex items-center transition-all duration-300 font-medium text-sm lg:text-base whitespace-nowrap hover:text-emerald-600",
                  currentPage?.startsWith("/tours") ? "text-emerald-600" : "text-gray-700",
                )}
                aria-expanded="false"
                aria-haspopup="true"
              >
                Tours
                <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" />
              </Link>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <Link
                  href="/tours"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/80 transition-all duration-200 border-b border-gray-100/50 rounded-t-xl"
                >
                  🗺️ All Tours Overview
                </Link>
                <Link
                  href="/tours/adventure"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/80 transition-all duration-200"
                >
                  🍃 Adventure Tours
                </Link>
                <Link
                  href="/tours/vision"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/80 transition-all duration-200"
                >
                  🪶 Vision Tours
                </Link>
                <Link
                  href="/tours/elevate"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/80 transition-all duration-200"
                >
                  🌼 Elevate Tours
                </Link>
                <Link
                  href="/tours/souls"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/80 transition-all duration-200 rounded-b-xl"
                >
                  🍓 Souls Tours
                </Link>
              </div>
            </div>

            {/* Resources Dropdown */}
            <div className="relative group">
              <Link
                href="/resources"
                className={cn(
                  "flex items-center transition-all duration-300 font-medium text-sm lg:text-base whitespace-nowrap hover:text-emerald-600",
                  currentPage?.startsWith("/blog") ||
                    currentPage?.startsWith("/resources") ||
                    currentPage?.startsWith("/travel-tips") ||
                    currentPage?.startsWith("/aves-explorer")
                    ? "text-emerald-600"
                    : "text-gray-700",
                )}
              >
                Resources
                <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" />
              </Link>
              <div className="absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="p-3">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100/50 mb-2">
                    Explore & Plan
                  </div>
                  <Link
                    href="/aves-explorer"
                    className="flex items-center px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/80 transition-all duration-200 rounded-lg"
                  >
                    <span className="text-lg mr-3">🦅</span>
                    <div>
                      <div className="font-medium">AVES Explorer</div>
                      <div className="text-xs text-gray-500">1,900+ species across 11 bioregions & 31 ecoregions</div>
                    </div>
                  </Link>

                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100/50 mb-2 mt-3">
                    Learn & Prepare
                  </div>
                  <Link
                    href="/resources"
                    className="flex items-center px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/80 transition-all duration-200 rounded-lg"
                  >
                    <span className="text-lg mr-3">📚</span>
                    <div>
                      <div className="font-medium">Expert Resources Hub</div>
                      <div className="text-xs text-gray-500">Podcasts, guides & preparation</div>
                    </div>
                  </Link>
                  <Link
                    href="/travel-tips"
                    className="flex items-center px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/80 transition-all duration-200 rounded-lg"
                  >
                    <span className="text-lg mr-3">✈️</span>
                    <div>
                      <div className="font-medium">Travel Essentials</div>
                      <div className="text-xs text-gray-500">Practical travel advice</div>
                    </div>
                  </Link>

                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100/50 mb-2 mt-3">
                    Stories & Insights
                  </div>
                  <Link
                    href="/blog"
                    className="flex items-center px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/80 transition-all duration-200 rounded-lg"
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
                className={cn(
                  "flex items-center transition-all duration-300 font-medium text-sm lg:text-base whitespace-nowrap hover:text-emerald-600",
                  currentPage?.startsWith("/about") || currentPage?.startsWith("/team")
                    ? "text-emerald-600"
                    : "text-gray-700",
                )}
              >
                About
                <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" />
              </Link>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <Link
                  href="/about"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/80 transition-all duration-200 rounded-t-xl"
                >
                  🏢 About AVES
                </Link>
                <Link
                  href="/team"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/80 transition-all duration-200"
                >
                  👥 Our Team
                </Link>
                <Link
                  href="/about/partners"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/80 transition-all duration-200 rounded-b-xl"
                >
                  🤝 Our Partners
                </Link>
              </div>
            </div>

            <Link
              href="/about/b-corp"
              className={cn(
                "transition-all duration-300 font-medium text-sm lg:text-base whitespace-nowrap hover:text-emerald-600",
                currentPage === "/about/b-corp" ? "text-emerald-600" : "text-gray-700",
              )}
            >
              B Corp Journey
            </Link>
            <Link
              href="/conservation"
              className={cn(
                "transition-all duration-300 font-medium text-sm lg:text-base whitespace-nowrap hover:text-emerald-600",
                currentPage === "/conservation" ? "text-emerald-600" : "text-gray-700",
              )}
            >
              Conservation
            </Link>
            <Link
              href="/contact"
              className={cn(
                "transition-all duration-300 font-medium text-sm lg:text-base whitespace-nowrap hover:text-emerald-600",
                currentPage === "/contact" ? "text-emerald-600" : "text-gray-700",
              )}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA Button */}
          <div
            className={cn(
              "hidden md:block transition-all duration-700 ease-out",
              desktopMenuExpanded
                ? "opacity-100 translate-x-0 pointer-events-auto scale-100"
                : "opacity-0 translate-x-6 pointer-events-none scale-95",
            )}
          >
            <Link href="/shopping">
              <Button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm lg:text-base whitespace-nowrap">
                Book Your Journey
              </Button>
            </Link>
          </div>

          {/* Mobile AVES Logo Button - Replaces Hamburger Menu */}
          <button
            className={cn(
              "md:hidden flex items-center justify-center transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded-xl touch-manipulation",
              // Size transitions - inactive ~25px, active scales up
              mobileMenuOpen
                ? "w-16 h-16 p-3 bg-white/95 backdrop-blur-md border-2 border-emerald-200 shadow-xl scale-110"
                : "w-12 h-12 p-2.5 bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg scale-100 hover:scale-105",
            )}
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {/* AVES Logo with Perfect Centering */}
            <div className="relative flex items-center justify-center w-full h-full">
              <OptimizedImage
                src="/images/aves-logo.png"
                alt="AVES Navigation Menu"
                width={32}
                height={32}
                className={cn(
                  "object-contain transition-all duration-500 ease-out",
                  // Logo size - inactive ~25px (fits in 12x12 container), active scales proportionally
                  mobileMenuOpen ? "w-10 h-10 opacity-100 drop-shadow-md" : "w-7 h-7 opacity-90 drop-shadow-sm",
                )}
                style={{
                  objectFit: "contain",
                  objectPosition: "center",
                }}
                priority
              />

              {/* Subtle glow effect */}
              <div
                className={cn(
                  "absolute inset-0 rounded-xl transition-all duration-500 ease-out pointer-events-none",
                  mobileMenuOpen ? "bg-emerald-100/30 shadow-lg opacity-100" : "bg-white/10 shadow-sm opacity-60",
                )}
              />

              {/* Active state indicator */}
              {mobileMenuOpen && (
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-emerald-400/20 to-emerald-600/20 animate-pulse" />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Backdrop */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 top-[73px] bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[73px] z-40 bg-white/95 backdrop-blur-md border-t border-white/20 shadow-xl">
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
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-2 text-base touch-manipulation"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🗺️ All Tours Overview
                  </Link>
                  <Link
                    href="/tours/adventure"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-2 text-base touch-manipulation"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🍃 Adventure Tours
                  </Link>
                  <Link
                    href="/tours/vision"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-2 text-base touch-manipulation"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🪶 Vision Tours
                  </Link>
                  <Link
                    href="/tours/elevate"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-2 text-base touch-manipulation"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🌼 Elevate Tours
                  </Link>
                  <Link
                    href="/tours/souls"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-2 text-base touch-manipulation"
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
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-2 text-base touch-manipulation"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🦅 AVES Explorer
                  </Link>

                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide py-1 mt-4">
                    Learn & Prepare
                  </div>
                  <Link
                    href="/resources"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-2 text-base touch-manipulation"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    📚 Expert Resources Hub
                  </Link>
                  <Link
                    href="/travel-tips"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-2 text-base touch-manipulation"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    ✈️ Travel Essentials
                  </Link>

                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide py-1 mt-4">
                    Stories & Insights
                  </div>
                  <Link
                    href="/blog"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-2 text-base touch-manipulation"
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
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-2 text-base touch-manipulation"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🏢 About AVES
                  </Link>
                  <Link
                    href="/team"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-2 text-base touch-manipulation"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    👥 Our Team
                  </Link>
                  <Link
                    href="/about/partners"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-2 text-base touch-manipulation"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🤝 Our Partners
                  </Link>
                </div>
              </div>
              <Link
                href="/about/b-corp"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2 text-lg touch-manipulation"
                onClick={() => setMobileMenuOpen(false)}
              >
                B Corp Journey
              </Link>
              <Link
                href="/conservation"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2 text-lg touch-manipulation"
                onClick={() => setMobileMenuOpen(false)}
              >
                Conservation
              </Link>
              <Link
                href="/contact"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2 text-lg touch-manipulation"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-6 pb-4 border-t border-gray-100/50">
                <Link href="/shopping">
                  <Button
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 min-h-[48px] text-base rounded-xl touch-manipulation"
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
