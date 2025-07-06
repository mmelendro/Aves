"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, MapPin, BookOpen, Users, Mail, Shield, FileText, Cookie } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface MobileNavigationMenuProps {
  className?: string
}

export default function MobileNavigationMenu({ className }: MobileNavigationMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [screenWidth, setScreenWidth] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)
  const menuContentRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()

  // Track screen dimensions for responsive scaling
  useEffect(() => {
    const updateScreenDimensions = () => {
      setScreenWidth(window.innerWidth)
      setScreenHeight(window.innerHeight)
    }

    updateScreenDimensions()
    window.addEventListener("resize", updateScreenDimensions)
    window.addEventListener("orientationchange", updateScreenDimensions)

    return () => {
      window.removeEventListener("resize", updateScreenDimensions)
      window.removeEventListener("orientationchange", updateScreenDimensions)
    }
  }, [])

  // Calculate responsive font sizes based on screen dimensions
  const getResponsiveFontSizes = useCallback(() => {
    const baseWidth = 375 // iPhone SE width as baseline
    const scaleFactor = Math.min(screenWidth / baseWidth, 1.2) // Max scale of 1.2x
    const minScale = 0.8 // Minimum scale for very small screens

    const finalScale = Math.max(Math.min(scaleFactor, 1.2), minScale)

    return {
      title: `${Math.max(1.25 * finalScale, 1)}rem`, // 20px base, min 16px
      sectionHeader: `${Math.max(1.125 * finalScale, 0.9)}rem`, // 18px base, min 14.4px
      menuItem: `${Math.max(1 * finalScale, 0.85)}rem`, // 16px base, min 13.6px
      footerLink: `${Math.max(0.875 * finalScale, 0.75)}rem`, // 14px base, min 12px
    }
  }, [screenWidth])

  // Enhanced scroll position management with smooth transitions
  useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      const currentScrollY = window.scrollY
      setScrollPosition(currentScrollY)

      // Add classes for mobile menu state
      document.body.classList.add("mobile-menu-open")
      document.documentElement.classList.add("mobile-menu-open")

      // Prevent background scrolling while allowing menu scroll
      document.body.style.position = "fixed"
      document.body.style.top = `-${currentScrollY}px`
      document.body.style.left = "0"
      document.body.style.right = "0"
      document.body.style.width = "100%"
      document.body.style.overscrollBehavior = "none"
    } else {
      // Remove classes and restore scroll position
      document.body.classList.remove("mobile-menu-open")
      document.documentElement.classList.remove("mobile-menu-open")

      // Restore scrolling with enhanced smoothness
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.left = ""
      document.body.style.right = ""
      document.body.style.width = ""
      document.body.style.overscrollBehavior = ""

      // Restore scroll position with smooth behavior
      requestAnimationFrame(() => {
        window.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        })
      })
    }

    // Cleanup function
    return () => {
      document.body.classList.remove("mobile-menu-open")
      document.documentElement.classList.remove("mobile-menu-open")
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.left = ""
      document.body.style.right = ""
      document.body.style.width = ""
      document.body.style.overscrollBehavior = ""
    }
  }, [isOpen, scrollPosition])

  // Enhanced scroll detection for menu content with optimized performance
  useEffect(() => {
    const menuElement = menuContentRef.current
    if (!menuElement) return

    const handleScroll = (e: Event) => {
      setIsScrolling(true)

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      // Set new timeout
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    // Add scroll listener with passive option for better performance
    menuElement.addEventListener("scroll", handleScroll, {
      passive: true,
      capture: false,
    })

    return () => {
      menuElement.removeEventListener("scroll", handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [isOpen])

  const closeMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleLinkClick = useCallback(
    (href: string) => {
      return (e: React.MouseEvent) => {
        e.preventDefault()
        closeMenu()

        // Enhanced smooth navigation with proper delay
        setTimeout(() => {
          if (href.startsWith("#")) {
            // Smooth scroll to section
            const element = document.getElementById(href.substring(1))
            if (element) {
              element.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
              })
            }
          } else {
            window.location.href = href
          }
        }, 300)
      }
    },
    [closeMenu],
  )

  // Enhanced touch handling for better mobile experience
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    // Allow natural touch behavior for scrolling
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    // Allow natural scroll behavior
  }, [])

  // Prevent background scroll without affecting menu scroll
  const handleSheetOpenChange = useCallback((open: boolean) => {
    setIsOpen(open)
  }, [])

  const responsiveFontSizes = getResponsiveFontSizes()

  return (
    <div className={cn("md:hidden", className)}>
      <Sheet open={isOpen} onOpenChange={handleSheetOpenChange}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-gray-100 transition-all duration-300 mobile-menu-btn touch-manipulation"
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="mobile-menu-container-70 p-0 border-l-0 shadow-2xl"
          data-mobile-menu="true"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          style={{
            width: `${Math.min(screenWidth * 0.7, 320)}px`, // 70% width, max 320px
            maxWidth: `${Math.min(screenWidth * 0.7, 320)}px`,
          }}
        >
          {/* Swipe-in animation wrapper with 50% transparency */}
          <div className="mobile-menu-wrapper-70">
            {/* Fixed Header - Non-scrollable with responsive text */}
            <div
              className="mobile-menu-header-70 flex items-center justify-between p-4 border-b border-white/20"
              style={{ minHeight: "70px" }}
            >
              <div className="flex items-center gap-3">
                <Image
                  src="/images/aves-logo.png"
                  alt="AVES"
                  width={screenWidth < 350 ? 32 : 36}
                  height={screenWidth < 350 ? 32 : 36}
                  className="rounded-lg logo-animation"
                  priority
                />
                <span className="font-bold mobile-menu-text-enhanced" style={{ fontSize: responsiveFontSizes.title }}>
                  AVES
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeMenu}
                className="p-2 hover:bg-white/20 transition-all duration-300 touch-manipulation"
                aria-label="Close navigation menu"
                style={{ minWidth: "40px", minHeight: "40px" }}
              >
                <X className="h-5 w-5 text-gray-600" />
              </Button>
            </div>

            {/* Scrollable Content Area with responsive text scaling */}
            <div
              ref={menuContentRef}
              className={cn("mobile-menu-scroll-area-70", isScrolling && "scrolling")}
              style={{
                height: `calc(100vh - 70px - ${screenHeight < 600 ? "160px" : "180px"})`,
                maxHeight: `calc(100vh - 70px - ${screenHeight < 600 ? "160px" : "180px"})`,
              }}
            >
              <nav className="mobile-menu-nav-70">
                {/* Tours Section with responsive text */}
                <div className="mobile-menu-section-70">
                  <h3 className="mobile-menu-section-title-70" style={{ fontSize: responsiveFontSizes.sectionHeader }}>
                    Tours
                  </h3>
                  <div className="mobile-menu-section-content-70">
                    <Link href="/tours" onClick={handleLinkClick("/tours")} className="mobile-menu-link-70">
                      <MapPin className="mobile-menu-icon-70 text-blue-500" />
                      <span style={{ fontSize: responsiveFontSizes.menuItem }}>AVES Tours</span>
                    </Link>
                    <Link
                      href="/tours/adventure"
                      onClick={handleLinkClick("/tours/adventure")}
                      className="mobile-menu-link-70"
                    >
                      <div className="mobile-menu-icon-70 text-green-500">🌿</div>
                      <span style={{ fontSize: responsiveFontSizes.menuItem }}>Adventure Tours</span>
                    </Link>
                    <Link
                      href="/tours/vision"
                      onClick={handleLinkClick("/tours/vision")}
                      className="mobile-menu-link-70"
                    >
                      <div className="mobile-menu-icon-70 text-amber-600">🪶</div>
                      <span style={{ fontSize: responsiveFontSizes.menuItem }}>Vision Tours</span>
                    </Link>
                    <Link
                      href="/tours/elevate"
                      onClick={handleLinkClick("/tours/elevate")}
                      className="mobile-menu-link-70"
                    >
                      <div className="mobile-menu-icon-70 text-yellow-500">🌻</div>
                      <span style={{ fontSize: responsiveFontSizes.menuItem }}>Elevate Tours</span>
                    </Link>
                    <Link href="/tours/souls" onClick={handleLinkClick("/tours/souls")} className="mobile-menu-link-70">
                      <div className="mobile-menu-icon-70 text-red-500">🍓</div>
                      <span style={{ fontSize: responsiveFontSizes.menuItem }}>Souls Tours</span>
                    </Link>
                  </div>
                </div>

                {/* Explore Section with responsive text */}
                <div className="mobile-menu-section-70">
                  <h3 className="mobile-menu-section-title-70" style={{ fontSize: responsiveFontSizes.sectionHeader }}>
                    Explore
                  </h3>
                  <div className="mobile-menu-section-content-70">
                    <Link
                      href="/aves-explorer"
                      onClick={handleLinkClick("/aves-explorer")}
                      className="mobile-menu-link-70"
                    >
                      <div className="mobile-menu-icon-70 text-amber-700">🦅</div>
                      <span style={{ fontSize: responsiveFontSizes.menuItem }}>Colombia</span>
                    </Link>
                    <Link href="/blog" onClick={handleLinkClick("/blog")} className="mobile-menu-link-70">
                      <BookOpen className="mobile-menu-icon-70 text-indigo-500" />
                      <span style={{ fontSize: responsiveFontSizes.menuItem }}>Birding with AVES</span>
                    </Link>
                    <Link href="/resources" onClick={handleLinkClick("/resources")} className="mobile-menu-link-70">
                      <BookOpen className="mobile-menu-icon-70 text-blue-500" />
                      <span style={{ fontSize: responsiveFontSizes.menuItem }}>Birding in Colombia</span>
                    </Link>
                    <Link href="/travel-tips" onClick={handleLinkClick("/travel-tips")} className="mobile-menu-link-70">
                      <div className="mobile-menu-icon-70 text-orange-500">✈️</div>
                      <span style={{ fontSize: responsiveFontSizes.menuItem }}>Travel Essentials</span>
                    </Link>
                  </div>
                </div>

                {/* AVES Section with responsive text */}
                <div className="mobile-menu-section-70">
                  <h3 className="mobile-menu-section-title-70" style={{ fontSize: responsiveFontSizes.sectionHeader }}>
                    AVES
                  </h3>
                  <div className="mobile-menu-section-content-70">
                    <Link href="/about" onClick={handleLinkClick("/about")} className="mobile-menu-link-70">
                      <Users className="mobile-menu-icon-70 text-emerald-500" />
                      <span style={{ fontSize: responsiveFontSizes.menuItem }}>About AVES</span>
                    </Link>
                    <Link href="/team" onClick={handleLinkClick("/team")} className="mobile-menu-link-70">
                      <Users className="mobile-menu-icon-70 text-blue-500" />
                      <span style={{ fontSize: responsiveFontSizes.menuItem }}>Our Team</span>
                    </Link>
                    <Link
                      href="/about/partners"
                      onClick={handleLinkClick("/about/partners")}
                      className="mobile-menu-link-70"
                    >
                      <div className="mobile-menu-icon-70 text-purple-500">🤝</div>
                      <span style={{ fontSize: responsiveFontSizes.menuItem }}>Our Partners</span>
                    </Link>
                    <Link
                      href="/about/b-corp"
                      onClick={handleLinkClick("/about/b-corp")}
                      className="mobile-menu-link-70"
                    >
                      <div className="mobile-menu-icon-70 text-green-500">🌿</div>
                      <span style={{ fontSize: responsiveFontSizes.menuItem }}>Our B Corp Journey</span>
                    </Link>
                    <Link
                      href="/conservation"
                      onClick={handleLinkClick("/conservation")}
                      className="mobile-menu-link-70"
                    >
                      <div className="mobile-menu-icon-70 text-green-600">🌱</div>
                      <span style={{ fontSize: responsiveFontSizes.menuItem }}>Conservation</span>
                    </Link>
                    <Link href="/contact" onClick={handleLinkClick("/contact")} className="mobile-menu-link-70">
                      <Mail className="mobile-menu-icon-70 text-blue-500" />
                      <span style={{ fontSize: responsiveFontSizes.menuItem }}>Contact</span>
                    </Link>
                  </div>
                </div>
              </nav>
            </div>

            {/* Fixed Footer - Non-scrollable with responsive text */}
            <div
              className="mobile-menu-footer-70 border-t border-white/20 p-4"
              style={{
                minHeight: screenHeight < 600 ? "160px" : "180px",
                maxHeight: screenHeight < 600 ? "160px" : "180px",
              }}
            >
              <div className="mb-3">
                <Link href="/shopping">
                  <Button
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 touch-manipulation"
                    onClick={handleLinkClick("/shopping")}
                    style={{
                      fontSize: responsiveFontSizes.menuItem,
                      minHeight: "44px",
                    }}
                  >
                    Book Your Journey
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link
                  href="/privacy"
                  onClick={handleLinkClick("/privacy")}
                  className="flex items-center gap-2 hover:text-emerald-600 transition-colors mobile-menu-text-enhanced touch-manipulation"
                  style={{ fontSize: responsiveFontSizes.footerLink }}
                >
                  <Shield className="h-3 w-3 flex-shrink-0" />
                  <span>Privacy Policy</span>
                </Link>
                <Link
                  href="/terms"
                  onClick={handleLinkClick("/terms")}
                  className="flex items-center gap-2 hover:text-emerald-600 transition-colors mobile-menu-text-enhanced touch-manipulation"
                  style={{ fontSize: responsiveFontSizes.footerLink }}
                >
                  <FileText className="h-3 w-3 flex-shrink-0" />
                  <span>Terms of Service</span>
                </Link>
                <Link
                  href="/cookies"
                  onClick={handleLinkClick("/cookies")}
                  className="flex items-center gap-2 hover:text-emerald-600 transition-colors mobile-menu-text-enhanced touch-manipulation"
                  style={{ fontSize: responsiveFontSizes.footerLink }}
                >
                  <Cookie className="h-3 w-3 flex-shrink-0" />
                  <span>Cookie Policy</span>
                </Link>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
