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
  const mobileMenuRef = useRef<HTMLDivElement>(null)
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

  // Enhanced mobile menu toggle with improved scroll management
  const toggleMobileMenu = () => {
    try {
      const newState = !mobileMenuOpen
      setMobileMenuOpen(newState)

      if (newState) {
        // Store current scroll position
        const scrollY = window.scrollY
        document.body.style.position = "fixed"
        document.body.style.top = `-${scrollY}px`
        document.body.style.width = "100%"
        document.body.style.overflow = "hidden"
      } else {
        // Restore scroll position
        const scrollY = document.body.style.top
        document.body.style.position = ""
        document.body.style.top = ""
        document.body.style.width = ""
        document.body.style.overflow = ""

        if (scrollY) {
          window.scrollTo(0, Number.parseInt(scrollY || "0") * -1)
        }
      }
    } catch (error) {
      console.warn("Error toggling mobile menu:", error)
    }
  }

  // Handle ESC key to close menus
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      try {
        if (event.key === "Escape") {
          if (mobileMenuOpen) {
            toggleMobileMenu()
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

  // Enhanced transparency for AVES Explorer page
  const isAvesExplorer = currentPage === "/aves-explorer"

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div
          ref={menuRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "transition-all duration-700 ease-out",
            // Enhanced transparency for AVES Explorer page
            isAvesExplorer
              ? desktopMenuExpanded || isScrolled || mobileMenuOpen
                ? "bg-white/80 backdrop-blur-lg border-b border-white/40 shadow-xl"
                : "bg-white/5 backdrop-blur-md border-b border-white/20 shadow-lg"
              : desktopMenuExpanded || isScrolled || mobileMenuOpen
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
                    <ChevronLeft
                      className={cn(
                        "w-4 h-4 drop-shadow-sm transition-all duration-300",
                        isAvesExplorer
                          ? "text-white group-hover:text-emerald-300"
                          : "text-gray-700 group-hover:text-emerald-600",
                      )}
                    />
                  ) : (
                    <ChevronRight
                      className={cn(
                        "w-3 h-3 drop-shadow-sm transition-all duration-300",
                        isAvesExplorer
                          ? "text-white/80 group-hover:text-emerald-300"
                          : "text-gray-600 group-hover:text-emerald-600",
                      )}
                    />
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
                    currentPage?.startsWith("/tours")
                      ? "text-emerald-600"
                      : isAvesExplorer
                        ? "text-white hover:text-emerald-300"
                        : "text-gray-700",
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
                      : isAvesExplorer
                        ? "text-white hover:text-emerald-300"
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
                    🦅 Colombia
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
                      : isAvesExplorer
                        ? "text-white hover:text-emerald-300"
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
                  : isAvesExplorer
                    ? "bg-white/80 backdrop-blur-lg border border-white/70 shadow-xl scale-100 hover:scale-105"
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

      {/* Enhanced Mobile Navigation Slide-out Menu with 50% Transparency */}
      <div
        ref={mobileMenuRef}
        className={cn(
          "md:hidden fixed top-0 right-0 h-full z-50 transition-all duration-500 ease-out",
          // Exactly 75% screen width as requested
          "w-[75vw]",
          // 50% transparency effect with enhanced backdrop blur for readability
          "bg-white/50 backdrop-blur-xl border-l border-white/30 shadow-2xl",
          mobileMenuOpen ? "translate-x-0 opacity-100 visible" : "translate-x-full opacity-0 invisible",
        )}
        id="mobile-navigation"
        role="navigation"
        aria-label="Mobile navigation menu"
      >
        {/* Mobile Menu Content with Enhanced Scrolling and Transparency */}
        <div className="flex flex-col h-full">
          {/* Scrollable Navigation Content with Enhanced Contrast */}
          <div className="flex-1 overflow-y-auto pt-20 pb-6 px-6 mobile-menu-scroll-optimized">
            <nav className="space-y-6">
              {/* Tours Section */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300/60 pb-2 bg-white/40 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
                  Tours
                </h3>
                <div className="space-y-2 pl-4">
                  <Link
                    href="/tours"
                    className="block py-3 px-3 text-gray-800 hover:text-emerald-700 hover:bg-white/60 rounded-lg transition-all duration-200 touch-manipulation font-medium backdrop-blur-sm shadow-sm"
                    onClick={toggleMobileMenu}
                  >
                    🗺️ AVES Tours
                  </Link>
                  <Link
                    href="/tours/adventure"
                    className="block py-3 px-3 text-gray-800 hover:text-emerald-700 hover:bg-white/60 rounded-lg transition-all duration-200 touch-manipulation font-medium backdrop-blur-sm shadow-sm"
                    onClick={toggleMobileMenu}
                  >
                    🍃 Adventure Tours
                  </Link>
                  <Link
                    href="/tours/vision"
                    className="block py-3 px-3 text-gray-800 hover:text-emerald-700 hover:bg-white/60 rounded-lg transition-all duration-200 touch-manipulation font-medium backdrop-blur-sm shadow-sm"
                    onClick={toggleMobileMenu}
                  >
                    🪶 Vision Tours
                  </Link>
                  <Link
                    href="/tours/elevate"
                    className="block py-3 px-3 text-gray-800 hover:text-emerald-700 hover:bg-white/60 rounded-lg transition-all duration-200 touch-manipulation font-medium backdrop-blur-sm shadow-sm"
                    onClick={toggleMobileMenu}
                  >
                    🌼 Elevate Tours
                  </Link>
                  <Link
                    href="/tours/souls"
                    className="block py-3 px-3 text-gray-800 hover:text-emerald-700 hover:bg-white/60 rounded-lg transition-all duration-200 touch-manipulation font-medium backdrop-blur-sm shadow-sm"
                    onClick={toggleMobileMenu}
                  >
                    🍓 Souls Tours
                  </Link>
                </div>
              </div>

              {/* Explore Section */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300/60 pb-2 bg-white/40 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
                  Explore
                </h3>
                <div className="space-y-2 pl-4">
                  <Link
                    href="/aves-explorer"
                    className="block py-3 px-3 text-gray-800 hover:text-emerald-700 hover:bg-white/60 rounded-lg transition-all duration-200 touch-manipulation font-medium backdrop-blur-sm shadow-sm"
                    onClick={toggleMobileMenu}
                  >
                    🦅 Colombia
                  </Link>
                  <Link
                    href="/blog"
                    className="block py-3 px-3 text-gray-800 hover:text-emerald-700 hover:bg-white/60 rounded-lg transition-all duration-200 touch-manipulation font-medium backdrop-blur-sm shadow-sm"
                    onClick={toggleMobileMenu}
                  >
                    📝 Birding with AVES
                  </Link>
                  <Link
                    href="/resources"
                    className="block py-3 px-3 text-gray-800 hover:text-emerald-700 hover:bg-white/60 rounded-lg transition-all duration-200 touch-manipulation font-medium backdrop-blur-sm shadow-sm"
                    onClick={toggleMobileMenu}
                  >
                    📚 Birding in Colombia
                  </Link>
                  <Link
                    href="/travel-tips"
                    className="block py-3 px-3 text-gray-800 hover:text-emerald-700 hover:bg-white/60 rounded-lg transition-all duration-200 touch-manipulation font-medium backdrop-blur-sm shadow-sm"
                    onClick={toggleMobileMenu}
                  >
                    ✈️ Travel Essentials
                  </Link>
                </div>
              </div>

              {/* AVES Section */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300/60 pb-2 bg-white/40 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
                  AVES
                </h3>
                <div className="space-y-2 pl-4">
                  <Link
                    href="/about"
                    className="block py-3 px-3 text-gray-800 hover:text-emerald-700 hover:bg-white/60 rounded-lg transition-all duration-200 touch-manipulation font-medium backdrop-blur-sm shadow-sm"
                    onClick={toggleMobileMenu}
                  >
                    🏢 About AVES
                  </Link>
                  <Link
                    href="/team"
                    className="block py-3 px-3 text-gray-800 hover:text-emerald-700 hover:bg-white/60 rounded-lg transition-all duration-200 touch-manipulation font-medium backdrop-blur-sm shadow-sm"
                    onClick={toggleMobileMenu}
                  >
                    👥 Our Team
                  </Link>
                  <Link
                    href="/about/partners"
                    className="block py-3 px-3 text-gray-800 hover:text-emerald-700 hover:bg-white/60 rounded-lg transition-all duration-200 touch-manipulation font-medium backdrop-blur-sm shadow-sm"
                    onClick={toggleMobileMenu}
                  >
                    🤝 Our Partners
                  </Link>
                  <Link
                    href="/about/b-corp"
                    className="block py-3 px-3 text-gray-800 hover:text-emerald-700 hover:bg-white/60 rounded-lg transition-all duration-200 touch-manipulation font-medium backdrop-blur-sm shadow-sm"
                    onClick={toggleMobileMenu}
                  >
                    🌿 Our B Corp Journey
                  </Link>
                  <Link
                    href="/conservation"
                    className="block py-3 px-3 text-gray-800 hover:text-emerald-700 hover:bg-white/60 rounded-lg transition-all duration-200 touch-manipulation font-medium backdrop-blur-sm shadow-sm"
                    onClick={toggleMobileMenu}
                  >
                    🌱 Conservation
                  </Link>
                  <Link
                    href="/contact"
                    className="block py-3 px-3 text-gray-800 hover:text-emerald-700 hover:bg-white/60 rounded-lg transition-all duration-200 touch-manipulation font-medium backdrop-blur-sm shadow-sm"
                    onClick={toggleMobileMenu}
                  >
                    📞 Contact
                  </Link>
                </div>
              </div>
            </nav>
          </div>

          {/* Fixed Mobile CTA Button with Enhanced Transparency */}
          <div className="border-t border-gray-300/50 p-6 bg-white/60 backdrop-blur-lg shadow-lg">
            <Link href="/shopping" onClick={toggleMobileMenu}>
              <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 touch-manipulation">
                Book Your Journey
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop with Enhanced Transparency */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-500"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  )
}
