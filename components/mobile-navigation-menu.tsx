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

/**
 * Mobile Navigation Menu Component
 *
 * A fully responsive, accessible mobile navigation menu that slides in from the right,
 * covers 70% of the viewport width, and features 50% transparency with robust scrolling.
 *
 * Features:
 * - Slide-in animation from right edge
 * - 70% viewport width coverage
 * - 50% transparency with backdrop blur
 * - Robust scrolling mechanism
 * - Full accessibility compliance
 * - Responsive design for all screen sizes
 */
export default function MobileNavigationMenu({ className }: MobileNavigationMenuProps) {
  // State management
  const [isOpen, setIsOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  // Refs for DOM manipulation
  const menuContentRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()

  /**
   * Handle body scroll lock when menu is open
   * Prevents background scrolling while preserving menu scroll functionality
   */
  useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      const currentScrollY = window.scrollY
      setScrollPosition(currentScrollY)

      // Lock body scroll
      document.body.style.position = "fixed"
      document.body.style.top = `-${currentScrollY}px`
      document.body.style.left = "0"
      document.body.style.right = "0"
      document.body.style.width = "100%"
      document.body.style.overflow = "hidden"
      document.body.style.overscrollBehavior = "none"

      // Add menu open classes for styling
      document.body.classList.add("aves-mobile-menu-open")
      document.documentElement.classList.add("aves-mobile-menu-open")
    } else {
      // Restore body scroll
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.left = ""
      document.body.style.right = ""
      document.body.style.width = ""
      document.body.style.overflow = ""
      document.body.style.overscrollBehavior = ""

      // Remove menu open classes
      document.body.classList.remove("aves-mobile-menu-open")
      document.documentElement.classList.remove("aves-mobile-menu-open")

      // Restore scroll position smoothly
      requestAnimationFrame(() => {
        window.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        })
      })
    }

    // Cleanup function
    return () => {
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.left = ""
      document.body.style.right = ""
      document.body.style.width = ""
      document.body.style.overflow = ""
      document.body.style.overscrollBehavior = ""
      document.body.classList.remove("aves-mobile-menu-open")
      document.documentElement.classList.remove("aves-mobile-menu-open")
    }
  }, [isOpen, scrollPosition])

  /**
   * Handle scroll detection for visual feedback
   * Provides visual indication when user is actively scrolling
   */
  useEffect(() => {
    const menuElement = menuContentRef.current
    if (!menuElement) return

    const handleScroll = () => {
      setIsScrolling(true)

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      // Set new timeout to detect scroll end
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    // Add passive scroll listener for better performance
    menuElement.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      menuElement.removeEventListener("scroll", handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [isOpen])

  /**
   * Close menu handler
   */
  const closeMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  /**
   * Handle link clicks with smooth navigation
   * Closes menu and navigates to target with appropriate delay
   */
  const handleLinkClick = useCallback(
    (href: string) => {
      return (e: React.MouseEvent) => {
        e.preventDefault()
        closeMenu()

        // Navigate after menu close animation
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
            // Navigate to page
            window.location.href = href
          }
        }, 300)
      }
    },
    [closeMenu],
  )

  /**
   * Handle sheet open/close state changes
   */
  const handleSheetOpenChange = useCallback((open: boolean) => {
    setIsOpen(open)
  }, [])

  return (
    <div className={cn("md:hidden", className)}>
      <Sheet open={isOpen} onOpenChange={handleSheetOpenChange}>
        {/* Menu Trigger Button */}
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="aves-mobile-menu-trigger"
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
            aria-controls="aves-mobile-navigation"
          >
            <Menu className="h-6 w-6 text-gray-700" aria-hidden="true" />
          </Button>
        </SheetTrigger>

        {/* Menu Content */}
        <SheetContent
          side="right"
          className="aves-mobile-menu-container"
          data-testid="mobile-navigation-menu"
          id="aves-mobile-navigation"
          aria-label="Main navigation menu"
        >
          {/* Main Menu Wrapper */}
          <div className="aves-mobile-menu-wrapper">
            {/* Fixed Header Section */}
            <header className="aves-mobile-menu-header" role="banner">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/aves-logo.png"
                  alt="AVES Logo"
                  width={36}
                  height={36}
                  className="aves-logo-animation rounded-lg"
                  priority
                />
                <h1 className="aves-mobile-menu-title">AVES</h1>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeMenu}
                className="aves-mobile-menu-close-btn"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5 text-gray-600" aria-hidden="true" />
              </Button>
            </header>

            {/* Scrollable Content Area */}
            <div
              ref={menuContentRef}
              className={cn("aves-mobile-menu-scroll-area", isScrolling && "scrolling")}
              role="main"
              aria-label="Navigation menu content"
            >
              <nav className="aves-mobile-menu-nav" role="navigation" aria-label="Main navigation">
                {/* Tours Section */}
                <section className="aves-mobile-menu-section" aria-labelledby="tours-heading">
                  <h2 id="tours-heading" className="aves-mobile-menu-section-title">
                    Tours
                  </h2>
                  <ul className="aves-mobile-menu-section-content" role="list">
                    <li>
                      <Link
                        href="/tours"
                        onClick={handleLinkClick("/tours")}
                        className="aves-mobile-menu-link"
                        aria-describedby="tours-description"
                      >
                        <MapPin className="aves-mobile-menu-icon text-blue-500" aria-hidden="true" />
                        <span>AVES Tours</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/tours/adventure"
                        onClick={handleLinkClick("/tours/adventure")}
                        className="aves-mobile-menu-link"
                        aria-describedby="adventure-tours-description"
                      >
                        <span className="aves-mobile-menu-icon text-green-500" role="img" aria-label="Nature">
                          🌿
                        </span>
                        <span>Adventure Tours</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/tours/vision"
                        onClick={handleLinkClick("/tours/vision")}
                        className="aves-mobile-menu-link"
                        aria-describedby="vision-tours-description"
                      >
                        <span className="aves-mobile-menu-icon text-amber-600" role="img" aria-label="Feather">
                          🪶
                        </span>
                        <span>Vision Tours</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/tours/elevate"
                        onClick={handleLinkClick("/tours/elevate")}
                        className="aves-mobile-menu-link"
                        aria-describedby="elevate-tours-description"
                      >
                        <span className="aves-mobile-menu-icon text-yellow-500" role="img" aria-label="Sunflower">
                          🌻
                        </span>
                        <span>Elevate Tours</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/tours/souls"
                        onClick={handleLinkClick("/tours/souls")}
                        className="aves-mobile-menu-link"
                        aria-describedby="souls-tours-description"
                      >
                        <span className="aves-mobile-menu-icon text-red-500" role="img" aria-label="Strawberry">
                          🍓
                        </span>
                        <span>Souls Tours</span>
                      </Link>
                    </li>
                  </ul>
                </section>

                {/* Explore Section */}
                <section className="aves-mobile-menu-section" aria-labelledby="explore-heading">
                  <h2 id="explore-heading" className="aves-mobile-menu-section-title">
                    Explore
                  </h2>
                  <ul className="aves-mobile-menu-section-content" role="list">
                    <li>
                      <Link
                        href="/aves-explorer"
                        onClick={handleLinkClick("/aves-explorer")}
                        className="aves-mobile-menu-link"
                        aria-describedby="colombia-explorer-description"
                      >
                        <span className="aves-mobile-menu-icon text-amber-700" role="img" aria-label="Eagle">
                          🦅
                        </span>
                        <span>Colombia</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/blog"
                        onClick={handleLinkClick("/blog")}
                        className="aves-mobile-menu-link"
                        aria-describedby="blog-description"
                      >
                        <BookOpen className="aves-mobile-menu-icon text-indigo-500" aria-hidden="true" />
                        <span>Birding with AVES</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/resources"
                        onClick={handleLinkClick("/resources")}
                        className="aves-mobile-menu-link"
                        aria-describedby="resources-description"
                      >
                        <BookOpen className="aves-mobile-menu-icon text-blue-500" aria-hidden="true" />
                        <span>Birding in Colombia</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/travel-tips"
                        onClick={handleLinkClick("/travel-tips")}
                        className="aves-mobile-menu-link"
                        aria-describedby="travel-tips-description"
                      >
                        <span className="aves-mobile-menu-icon text-orange-500" role="img" aria-label="Airplane">
                          ✈️
                        </span>
                        <span>Travel Essentials</span>
                      </Link>
                    </li>
                  </ul>
                </section>

                {/* AVES Section */}
                <section className="aves-mobile-menu-section" aria-labelledby="aves-heading">
                  <h2 id="aves-heading" className="aves-mobile-menu-section-title">
                    AVES
                  </h2>
                  <ul className="aves-mobile-menu-section-content" role="list">
                    <li>
                      <Link
                        href="/about"
                        onClick={handleLinkClick("/about")}
                        className="aves-mobile-menu-link"
                        aria-describedby="about-description"
                      >
                        <Users className="aves-mobile-menu-icon text-emerald-500" aria-hidden="true" />
                        <span>About AVES</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/team"
                        onClick={handleLinkClick("/team")}
                        className="aves-mobile-menu-link"
                        aria-describedby="team-description"
                      >
                        <Users className="aves-mobile-menu-icon text-blue-500" aria-hidden="true" />
                        <span>Our Team</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about/partners"
                        onClick={handleLinkClick("/about/partners")}
                        className="aves-mobile-menu-link"
                        aria-describedby="partners-description"
                      >
                        <span className="aves-mobile-menu-icon text-purple-500" role="img" aria-label="Handshake">
                          🤝
                        </span>
                        <span>Our Partners</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about/b-corp"
                        onClick={handleLinkClick("/about/b-corp")}
                        className="aves-mobile-menu-link"
                        aria-describedby="b-corp-description"
                      >
                        <span className="aves-mobile-menu-icon text-green-500" role="img" aria-label="Leaf">
                          🌿
                        </span>
                        <span>Our B Corp Journey</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/conservation"
                        onClick={handleLinkClick("/conservation")}
                        className="aves-mobile-menu-link"
                        aria-describedby="conservation-description"
                      >
                        <span className="aves-mobile-menu-icon text-green-600" role="img" aria-label="Seedling">
                          🌱
                        </span>
                        <span>Conservation</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        onClick={handleLinkClick("/contact")}
                        className="aves-mobile-menu-link"
                        aria-describedby="contact-description"
                      >
                        <Mail className="aves-mobile-menu-icon text-blue-500" aria-hidden="true" />
                        <span>Contact</span>
                      </Link>
                    </li>
                  </ul>
                </section>
              </nav>
            </div>

            {/* Fixed Footer Section */}
            <footer className="aves-mobile-menu-footer" role="contentinfo">
              {/* Call-to-Action Button */}
              <div className="mb-4">
                <Link href="/shopping" tabIndex={-1}>
                  <Button
                    className="aves-mobile-menu-cta-button"
                    onClick={handleLinkClick("/shopping")}
                    aria-describedby="cta-description"
                  >
                    Book Your Journey
                  </Button>
                </Link>
              </div>

              {/* Footer Links */}
              <nav className="aves-mobile-menu-footer-links" role="navigation" aria-label="Footer navigation">
                <Link
                  href="/privacy"
                  onClick={handleLinkClick("/privacy")}
                  className="aves-mobile-menu-footer-link"
                  aria-describedby="privacy-description"
                >
                  <Shield className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <span>Privacy Policy</span>
                </Link>
                <Link
                  href="/terms"
                  onClick={handleLinkClick("/terms")}
                  className="aves-mobile-menu-footer-link"
                  aria-describedby="terms-description"
                >
                  <FileText className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <span>Terms of Service</span>
                </Link>
                <Link
                  href="/cookies"
                  onClick={handleLinkClick("/cookies")}
                  className="aves-mobile-menu-footer-link"
                  aria-describedby="cookies-description"
                >
                  <Cookie className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <span>Cookie Policy</span>
                </Link>
              </nav>
            </footer>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
