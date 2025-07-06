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
  const menuContentRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()

  // Enhanced scroll position management with body lock
  useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      const currentScrollY = window.scrollY
      setScrollPosition(currentScrollY)

      // Prevent background scrolling while preserving menu scroll
      document.body.style.position = "fixed"
      document.body.style.top = `-${currentScrollY}px`
      document.body.style.left = "0"
      document.body.style.right = "0"
      document.body.style.width = "100%"
      document.body.style.overflow = "hidden"
      document.body.style.overscrollBehavior = "none"

      // Add menu open class for additional styling
      document.body.classList.add("mobile-menu-open")
      document.documentElement.classList.add("mobile-menu-open")
    } else {
      // Restore body scroll and position
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.left = ""
      document.body.style.right = ""
      document.body.style.width = ""
      document.body.style.overflow = ""
      document.body.style.overscrollBehavior = ""

      // Remove menu open classes
      document.body.classList.remove("mobile-menu-open")
      document.documentElement.classList.remove("mobile-menu-open")

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
      document.body.classList.remove("mobile-menu-open")
      document.documentElement.classList.remove("mobile-menu-open")
    }
  }, [isOpen, scrollPosition])

  // Optimized scroll detection for menu content
  useEffect(() => {
    const menuElement = menuContentRef.current
    if (!menuElement) return

    const handleScroll = () => {
      setIsScrolling(true)

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    // Use passive listeners for better performance
    menuElement.addEventListener("scroll", handleScroll, { passive: true })

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

        // Navigate after menu closes
        setTimeout(() => {
          if (href.startsWith("#")) {
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

  const handleSheetOpenChange = useCallback((open: boolean) => {
    setIsOpen(open)
  }, [])

  return (
    <div className={cn("md:hidden", className)}>
      <Sheet open={isOpen} onOpenChange={handleSheetOpenChange}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-gray-100 transition-all duration-300 mobile-menu-trigger"
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="mobile-menu-container p-0 border-l-0 shadow-2xl" data-mobile-menu="true">
          {/* Main menu wrapper with proper structure */}
          <div className="mobile-menu-wrapper">
            {/* Fixed Header */}
            <div className="mobile-menu-header">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/aves-logo.png"
                  alt="AVES"
                  width={36}
                  height={36}
                  className="rounded-lg logo-animation"
                  priority
                />
                <span className="mobile-menu-title">AVES</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeMenu}
                className="mobile-menu-close-btn"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5 text-gray-600" />
              </Button>
            </div>

            {/* Scrollable Content Area - CRITICAL SCROLLING FIX */}
            <div ref={menuContentRef} className={cn("mobile-menu-scroll-container", isScrolling && "scrolling")}>
              <nav className="mobile-menu-nav">
                {/* Tours Section */}
                <div className="mobile-menu-section">
                  <h3 className="mobile-menu-section-title">Tours</h3>
                  <div className="mobile-menu-section-content">
                    <Link href="/tours" onClick={handleLinkClick("/tours")} className="mobile-menu-link">
                      <MapPin className="mobile-menu-icon text-blue-500" />
                      <span>AVES Tours</span>
                    </Link>
                    <Link
                      href="/tours/adventure"
                      onClick={handleLinkClick("/tours/adventure")}
                      className="mobile-menu-link"
                    >
                      <div className="mobile-menu-icon text-green-500">🌿</div>
                      <span>Adventure Tours</span>
                    </Link>
                    <Link href="/tours/vision" onClick={handleLinkClick("/tours/vision")} className="mobile-menu-link">
                      <div className="mobile-menu-icon text-amber-600">🪶</div>
                      <span>Vision Tours</span>
                    </Link>
                    <Link
                      href="/tours/elevate"
                      onClick={handleLinkClick("/tours/elevate")}
                      className="mobile-menu-link"
                    >
                      <div className="mobile-menu-icon text-yellow-500">🌻</div>
                      <span>Elevate Tours</span>
                    </Link>
                    <Link href="/tours/souls" onClick={handleLinkClick("/tours/souls")} className="mobile-menu-link">
                      <div className="mobile-menu-icon text-red-500">🍓</div>
                      <span>Souls Tours</span>
                    </Link>
                  </div>
                </div>

                {/* Explore Section */}
                <div className="mobile-menu-section">
                  <h3 className="mobile-menu-section-title">Explore</h3>
                  <div className="mobile-menu-section-content">
                    <Link
                      href="/aves-explorer"
                      onClick={handleLinkClick("/aves-explorer")}
                      className="mobile-menu-link"
                    >
                      <div className="mobile-menu-icon text-amber-700">🦅</div>
                      <span>Colombia</span>
                    </Link>
                    <Link href="/blog" onClick={handleLinkClick("/blog")} className="mobile-menu-link">
                      <BookOpen className="mobile-menu-icon text-indigo-500" />
                      <span>Birding with AVES</span>
                    </Link>
                    <Link href="/resources" onClick={handleLinkClick("/resources")} className="mobile-menu-link">
                      <BookOpen className="mobile-menu-icon text-blue-500" />
                      <span>Birding in Colombia</span>
                    </Link>
                    <Link href="/travel-tips" onClick={handleLinkClick("/travel-tips")} className="mobile-menu-link">
                      <div className="mobile-menu-icon text-orange-500">✈️</div>
                      <span>Travel Essentials</span>
                    </Link>
                  </div>
                </div>

                {/* AVES Section */}
                <div className="mobile-menu-section">
                  <h3 className="mobile-menu-section-title">AVES</h3>
                  <div className="mobile-menu-section-content">
                    <Link href="/about" onClick={handleLinkClick("/about")} className="mobile-menu-link">
                      <Users className="mobile-menu-icon text-emerald-500" />
                      <span>About AVES</span>
                    </Link>
                    <Link href="/team" onClick={handleLinkClick("/team")} className="mobile-menu-link">
                      <Users className="mobile-menu-icon text-blue-500" />
                      <span>Our Team</span>
                    </Link>
                    <Link
                      href="/about/partners"
                      onClick={handleLinkClick("/about/partners")}
                      className="mobile-menu-link"
                    >
                      <div className="mobile-menu-icon text-purple-500">🤝</div>
                      <span>Our Partners</span>
                    </Link>
                    <Link href="/about/b-corp" onClick={handleLinkClick("/about/b-corp")} className="mobile-menu-link">
                      <div className="mobile-menu-icon text-green-500">🌿</div>
                      <span>Our B Corp Journey</span>
                    </Link>
                    <Link href="/conservation" onClick={handleLinkClick("/conservation")} className="mobile-menu-link">
                      <div className="mobile-menu-icon text-green-600">🌱</div>
                      <span>Conservation</span>
                    </Link>
                    <Link href="/contact" onClick={handleLinkClick("/contact")} className="mobile-menu-link">
                      <Mail className="mobile-menu-icon text-blue-500" />
                      <span>Contact</span>
                    </Link>
                  </div>
                </div>
              </nav>
            </div>

            {/* Fixed Footer */}
            <div className="mobile-menu-footer">
              <div className="mb-4">
                <Link href="/shopping">
                  <Button className="mobile-menu-cta-button" onClick={handleLinkClick("/shopping")}>
                    Book Your Journey
                  </Button>
                </Link>
              </div>
              <div className="mobile-menu-footer-links">
                <Link href="/privacy" onClick={handleLinkClick("/privacy")} className="mobile-menu-footer-link">
                  <Shield className="h-4 w-4 flex-shrink-0" />
                  <span>Privacy Policy</span>
                </Link>
                <Link href="/terms" onClick={handleLinkClick("/terms")} className="mobile-menu-footer-link">
                  <FileText className="h-4 w-4 flex-shrink-0" />
                  <span>Terms of Service</span>
                </Link>
                <Link href="/cookies" onClick={handleLinkClick("/cookies")} className="mobile-menu-footer-link">
                  <Cookie className="h-4 w-4 flex-shrink-0" />
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
