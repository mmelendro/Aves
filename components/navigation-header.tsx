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

        // Enhanced mobile logo visibility during scroll
        if (typeof window !== "undefined" && window.innerWidth <= 768) {
          document.body.classList.toggle("scrolling", scrollPosition > 0)
        }
      } catch (error) {
        console.warn("Error handling scroll:", error)
      }
    }

    handleScroll() // Check initial scroll position
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      try {
        window.removeEventListener("scroll", handleScroll)
        if (typeof document !== "undefined") {
          document.body.classList.remove("scrolling")
        }
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
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = ""
      }
    } catch (error) {
      console.warn("Error managing body scroll:", error)
    }

    return () => {
      try {
        document.body.style.overflow = ""
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
    <>
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
                    🗺️ AVES Tours
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

              {/* Explore Dropdown */}
              <div className="relative group">
                <Link
                  href="/aves-explorer"
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
                  Explore
                  <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" />
                </Link>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <Link
                    href="/aves-explorer"
                    className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/80 transition-all duration-200 border-b border-gray-100/50 rounded-t-xl"
                  >
                    🦅 Explore Colombia
                  </Link>
                  <Link
                    href="/blog"
                    className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/80 transition-all duration-200"
                  >
                    📝 Birding with AVES
                  </Link>
                  <Link
                    href="/resources"
                    className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/80 transition-all duration-200"
                  >
                    📚 Birding in Colombia
                  </Link>
                  <Link
                    href="/travel-tips"
                    className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/80 transition-all duration-200 rounded-b-xl"
                  >
                    ✈️ Travel Essentials
                  </Link>
                </div>
              </div>

              {/* AVES Dropdown */}
              <div className="relative group">
                <Link
                  href="/about"
                  className={cn(
                    "flex items-center transition-all duration-300 font-medium text-sm lg:text-base whitespace-nowrap hover:text-emerald-600",
                    currentPage?.startsWith("/about") ||
                      currentPage?.startsWith("/team") ||
                      currentPage?.startsWith("/conservation") ||
                      currentPage?.startsWith("/contact")
                      ? "text-emerald-600"
                      : "text-gray-700",
                  )}
                >
                  AVES
                  <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" />
                </Link>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <Link
                    href="/about"
                    className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/80 transition-all duration-200 border-b border-gray-100/50 rounded-t-xl"
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
                    className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/80 transition-all duration-200"
                  >
                    🤝 Our Partners
                  </Link>
                  <Link
                    href="/about/b-corp"
                    className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/80 transition-all duration-200"
                  >
                    🌿 Our B Corp Journey
                  </Link>
                  <Link
                    href="/conservation"
                    className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/80 transition-all duration-200"
                  >
                    🌱 Conservation
                  </Link>
                  <Link
                    href="/contact"
                    className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/80 transition-all duration-200 rounded-b-xl"
                  >
                    📞 Contact
                  </Link>
                </div>
              </div>
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

            {/* Mobile AVES Logo Button - Top Right Corner */}
            <button
              className={cn(
                "md:hidden fixed top-4 right-4 z-[60] flex items-center justify-center transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded-xl touch-manipulation",
                // Perfect 44px touch target for accessibility
                "w-11 h-11 p-2.5",
                // Enhanced styling with smooth transitions
                mobileMenuOpen
                  ? "bg-white/98 backdrop-blur-lg border-2 border-emerald-200 shadow-2xl scale-110"
                  : "bg-white/95 backdrop-blur-md border border-white/70 shadow-xl scale-100 hover:scale-105",
                // Ensure proper stacking and visibility during scroll
                "will-change-transform transform-gpu",
              )}
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              style={{
                // Ensure consistent positioning across all mobile devices
                position: "fixed",
                top: "16px",
                right: "16px",
                zIndex: 60,
              }}
            >
              {/* AVES Logo - Always visible with enhanced contrast */}
              <div className="relative flex items-center justify-center w-full h-full">
                <OptimizedImage
                  src="/images/aves-logo.png"
                  alt="AVES Navigation Menu"
                  width={24}
                  height={24}
                  className={cn(
                    "object-contain transition-all duration-500 ease-out",
                    "w-6 h-6 opacity-100 drop-shadow-lg",
                    mobileMenuOpen && "rotate-180 scale-110",
                  )}
                  style={{
                    objectFit: "contain",
                    objectPosition: "center",
                    filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
                  }}
                  priority
                />

                {/* Enhanced glow effect with better visibility */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-xl transition-all duration-500 ease-out pointer-events-none",
                    mobileMenuOpen ? "bg-emerald-100/60 shadow-2xl opacity-100" : "bg-white/40 shadow-lg opacity-90",
                  )}
                />

                {/* Active state pulse with enhanced visibility */}
                {mobileMenuOpen && (
                  <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-emerald-400/30 to-emerald-600/30 animate-pulse" />
                )}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Slide-out Menu - 75% Screen Width */}
      <div
        className={cn(
          "md:hidden fixed top-0 right-0 h-full z-50 transition-all duration-500 ease-out",
          // Exactly 75% screen width as requested
          "w-[75vw]",
          // 90% opacity with subtle transparency as requested
          "bg-white/90 backdrop-blur-xl border-l border-white/50 shadow-2xl",
          mobileMenuOpen ? "translate-x-0 opacity-100 visible" : "translate-x-full opacity-0 invisible",
        )}
        id="mobile-navigation"
        data-mobile-menu
      >
        {/* Menu Header with AVES Branding */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/70 bg-white/60 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <OptimizedImage
              src="/images/aves-logo.png"
              alt="AVES Logo"
              width={32}
              height={32}
              className="w-8 h-8 object-contain drop-shadow-md"
            />
            <span className="text-xl font-bold text-gray-900 drop-shadow-sm">AVES</span>
          </div>
        </div>

        {/* Menu Content with Smooth Scrolling */}
        <div className="flex flex-col h-full pt-4 pb-24 overflow-y-auto bg-gradient-to-b from-white/50 to-white/60 mobile-menu-scroll">
          <nav className="px-6 space-y-6 flex-1">
            {/* Tours Section */}
            <div className="space-y-3">
              <Link
                href="/tours"
                className="text-gray-900 font-bold text-lg hover:text-emerald-600 transition-all duration-300 block touch-manipulation drop-shadow-sm mobile-menu-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tours
              </Link>
              <div className="pl-4 space-y-3 bg-white/60 rounded-xl p-4 backdrop-blur-sm border border-white/50 shadow-sm">
                <Link
                  href="/tours"
                  className="block text-gray-800 hover:text-emerald-600 transition-all duration-300 py-2 text-base touch-manipulation font-medium mobile-menu-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🗺️ AVES Tours
                </Link>
                <Link
                  href="/tours/adventure"
                  className="block text-gray-800 hover:text-emerald-600 transition-all duration-300 py-2 text-base touch-manipulation font-medium mobile-menu-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🍃 Adventure Tours
                </Link>
                <Link
                  href="/tours/vision"
                  className="block text-gray-800 hover:text-emerald-600 transition-all duration-300 py-2 text-base touch-manipulation font-medium mobile-menu-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🪶 Vision Tours
                </Link>
                <Link
                  href="/tours/elevate"
                  className="block text-gray-800 hover:text-emerald-600 transition-all duration-300 py-2 text-base touch-manipulation font-medium mobile-menu-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🌼 Elevate Tours
                </Link>
                <Link
                  href="/tours/souls"
                  className="block text-gray-800 hover:text-emerald-600 transition-all duration-300 py-2 text-base touch-manipulation font-medium mobile-menu-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🍓 Souls Tours
                </Link>
              </div>
            </div>

            {/* Explore Section */}
            <div className="space-y-3">
              <Link
                href="/aves-explorer"
                className="text-gray-900 font-bold text-lg hover:text-emerald-600 transition-all duration-300 block touch-manipulation drop-shadow-sm mobile-menu-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore
              </Link>
              <div className="pl-4 space-y-3 bg-white/60 rounded-xl p-4 backdrop-blur-sm border border-white/50 shadow-sm">
                <Link
                  href="/aves-explorer"
                  className="block text-gray-800 hover:text-emerald-600 transition-all duration-300 py-2 text-base touch-manipulation font-medium mobile-menu-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🦅 Explore Colombia
                </Link>
                <Link
                  href="/blog"
                  className="block text-gray-800 hover:text-emerald-600 transition-all duration-300 py-2 text-base touch-manipulation font-medium mobile-menu-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  📝 Birding with AVES
                </Link>
                <Link
                  href="/resources"
                  className="block text-gray-800 hover:text-emerald-600 transition-all duration-300 py-2 text-base touch-manipulation font-medium mobile-menu-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  📚 Birding in Colombia
                </Link>
                <Link
                  href="/travel-tips"
                  className="block text-gray-800 hover:text-emerald-600 transition-all duration-300 py-2 text-base touch-manipulation font-medium mobile-menu-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ✈️ Travel Essentials
                </Link>
              </div>
            </div>

            {/* AVES Section */}
            <div className="space-y-3">
              <Link
                href="/about"
                className="text-gray-900 font-bold text-lg hover:text-emerald-600 transition-all duration-300 block touch-manipulation drop-shadow-sm mobile-menu-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                AVES
              </Link>
              <div className="pl-4 space-y-3 bg-white/60 rounded-xl p-4 backdrop-blur-sm border border-white/50 shadow-sm">
                <Link
                  href="/about"
                  className="block text-gray-800 hover:text-emerald-600 transition-all duration-300 py-2 text-base touch-manipulation font-medium mobile-menu-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🏢 About AVES
                </Link>
                <Link
                  href="/team"
                  className="block text-gray-800 hover:text-emerald-600 transition-all duration-300 py-2 text-base touch-manipulation font-medium mobile-menu-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  👥 Our Team
                </Link>
                <Link
                  href="/about/partners"
                  className="block text-gray-800 hover:text-emerald-600 transition-all duration-300 py-2 text-base touch-manipulation font-medium mobile-menu-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🤝 Our Partners
                </Link>
                <Link
                  href="/about/b-corp"
                  className="block text-gray-800 hover:text-emerald-600 transition-all duration-300 py-2 text-base touch-manipulation font-medium mobile-menu-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🌿 Our B Corp Journey
                </Link>
                <Link
                  href="/conservation"
                  className="block text-gray-800 hover:text-emerald-600 transition-all duration-300 py-2 text-base touch-manipulation font-medium mobile-menu-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🌱 Conservation
                </Link>
                <Link
                  href="/contact"
                  className="block text-gray-800 hover:text-emerald-600 transition-all duration-300 py-2 text-base touch-manipulation font-medium mobile-menu-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  📞 Contact
                </Link>
              </div>
            </div>
          </nav>

          {/* CTA Button with Enhanced Styling */}
          <div className="px-6 pt-6 border-t border-gray-200/70 bg-white/60 backdrop-blur-md">
            <Link href="/shopping">
              <Button
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 min-h-[48px] text-base rounded-xl touch-manipulation shadow-xl font-bold transform hover:scale-105 transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Your Journey
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop with 90% Opacity */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/10 backdrop-blur-sm z-40 transition-all duration-500 ease-out"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
