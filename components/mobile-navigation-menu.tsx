"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, MapPin, BookOpen, Users, Mail, Shield, FileText, Cookie } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

interface MobileNavigationMenuProps {
  className?: string
}

export default function MobileNavigationMenu({ className }: MobileNavigationMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const menuContentRef = useRef<HTMLDivElement>(null)
  const { scrollToSection } = useSmoothScroll()

  // Enhanced scroll position management with smooth transitions
  useEffect(() => {
    if (isOpen) {
      // Store current scroll position with smooth transition
      const currentScrollY = window.scrollY
      setScrollPosition(currentScrollY)

      // Add classes for mobile menu state with enhanced animations
      document.body.classList.add("mobile-menu-open")
      document.documentElement.classList.add("mobile-menu-open")

      // Prevent background scrolling with smooth lock
      document.body.style.position = "fixed"
      document.body.style.top = `-${currentScrollY}px`
      document.body.style.width = "100%"
      document.body.style.overflow = "hidden"
      document.body.style.transition = "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
    } else {
      // Remove classes and restore scroll position with smooth transition
      document.body.classList.remove("mobile-menu-open")
      document.documentElement.classList.remove("mobile-menu-open")

      // Restore scrolling with enhanced smoothness
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflow = ""
      document.body.style.transition = ""

      // Restore scroll position with smooth behavior
      requestAnimationFrame(() => {
        window.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        })
      })
    }

    // Enhanced cleanup function
    return () => {
      document.body.classList.remove("mobile-menu-open")
      document.documentElement.classList.remove("mobile-menu-open")
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflow = ""
      document.body.style.transition = ""
    }
  }, [isOpen, scrollPosition])

  // Enhanced scroll detection for menu content
  useEffect(() => {
    const menuElement = menuContentRef.current
    if (!menuElement) return

    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      setIsScrolling(true)
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    menuElement.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      menuElement.removeEventListener("scroll", handleScroll)
      clearTimeout(scrollTimeout)
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

        // Enhanced smooth navigation with delay for menu close animation
        setTimeout(() => {
          if (href.startsWith("#")) {
            scrollToSection(href, 80)
          } else {
            window.location.href = href
          }
        }, 200)
      }
    },
    [closeMenu, scrollToSection],
  )

  // Enhanced touch handling for better mobile experience
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.stopPropagation()
  }, [])

  return (
    <div className={cn("md:hidden", className)}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
          className="w-80 p-0 mobile-menu-transparent border-l-0 shadow-2xl"
          data-mobile-menu="true"
          onTouchStart={handleTouchStart}
        >
          <div
            ref={menuContentRef}
            className={cn("flex flex-col h-full mobile-menu-scroll-optimized", isScrolling && "scrolling")}
          >
            {/* Enhanced Header with improved transparency */}
            <div className="flex items-center justify-between p-6 border-b border-white/20 mobile-menu-section-header">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/aves-logo.png"
                  alt="AVES"
                  width={40}
                  height={40}
                  className="rounded-lg logo-animation"
                  priority
                />
                <span className="text-xl font-bold mobile-menu-text-enhanced">AVES</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeMenu}
                className="p-2 hover:bg-white/20 transition-all duration-300 touch-manipulation"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5 text-gray-600" />
              </Button>
            </div>

            {/* Enhanced Navigation Content with smooth scrolling */}
            <div className="flex-1 overflow-y-auto py-6 mobile-menu-scroll-optimized">
              <nav className="space-y-8 px-6">
                {/* Tours Section with enhanced styling */}
                <div className="scroll-snap-start">
                  <h3 className="text-lg font-semibold mb-4 mobile-menu-section-header p-3 rounded-lg">Tours</h3>
                  <div className="space-y-3">
                    <Link
                      href="/tours"
                      onClick={handleLinkClick("/tours")}
                      className="flex items-center gap-3 p-3 rounded-lg mobile-menu-item-enhanced mobile-menu-item touch-manipulation"
                    >
                      <MapPin className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span>AVES Tours</span>
                    </Link>
                    <Link
                      href="/tours/adventure"
                      onClick={handleLinkClick("/tours/adventure")}
                      className="flex items-center gap-3 p-3 rounded-lg mobile-menu-item-enhanced mobile-menu-item touch-manipulation"
                    >
                      <div className="h-5 w-5 text-green-500 flex-shrink-0">🌿</div>
                      <span>Adventure Tours</span>
                    </Link>
                    <Link
                      href="/tours/vision"
                      onClick={handleLinkClick("/tours/vision")}
                      className="flex items-center gap-3 p-3 rounded-lg mobile-menu-item-enhanced mobile-menu-item touch-manipulation"
                    >
                      <div className="h-5 w-5 text-amber-600 flex-shrink-0">🪶</div>
                      <span>Vision Tours</span>
                    </Link>
                    <Link
                      href="/tours/elevate"
                      onClick={handleLinkClick("/tours/elevate")}
                      className="flex items-center gap-3 p-3 rounded-lg mobile-menu-item-enhanced mobile-menu-item touch-manipulation"
                    >
                      <div className="h-5 w-5 text-yellow-500 flex-shrink-0">🌻</div>
                      <span>Elevate Tours</span>
                    </Link>
                    <Link
                      href="/tours/souls"
                      onClick={handleLinkClick("/tours/souls")}
                      className="flex items-center gap-3 p-3 rounded-lg mobile-menu-item-enhanced mobile-menu-item touch-manipulation"
                    >
                      <div className="h-5 w-5 text-red-500 flex-shrink-0">🍓</div>
                      <span>Souls Tours</span>
                    </Link>
                  </div>
                </div>

                {/* Explore Section with enhanced styling */}
                <div className="scroll-snap-start">
                  <h3 className="text-lg font-semibold mb-4 mobile-menu-section-header p-3 rounded-lg">Explore</h3>
                  <div className="space-y-3">
                    <Link
                      href="/aves-explorer"
                      onClick={handleLinkClick("/aves-explorer")}
                      className="flex items-center gap-3 p-3 rounded-lg mobile-menu-item-enhanced mobile-menu-item touch-manipulation"
                    >
                      <div className="h-5 w-5 text-amber-700 flex-shrink-0">🦅</div>
                      <span>Colombia</span>
                    </Link>
                    <Link
                      href="/blog"
                      onClick={handleLinkClick("/blog")}
                      className="flex items-center gap-3 p-3 rounded-lg mobile-menu-item-enhanced mobile-menu-item touch-manipulation"
                    >
                      <BookOpen className="h-5 w-5 text-indigo-500 flex-shrink-0" />
                      <span>Birding with AVES</span>
                    </Link>
                    <Link
                      href="/resources"
                      onClick={handleLinkClick("/resources")}
                      className="flex items-center gap-3 p-3 rounded-lg mobile-menu-item-enhanced mobile-menu-item touch-manipulation"
                    >
                      <BookOpen className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span>Birding in Colombia</span>
                    </Link>
                    <Link
                      href="/travel-tips"
                      onClick={handleLinkClick("/travel-tips")}
                      className="flex items-center gap-3 p-3 rounded-lg mobile-menu-item-enhanced mobile-menu-item touch-manipulation"
                    >
                      <div className="h-5 w-5 text-orange-500 flex-shrink-0">✈️</div>
                      <span>Travel Essentials</span>
                    </Link>
                  </div>
                </div>

                {/* AVES Section with enhanced styling */}
                <div className="scroll-snap-start">
                  <h3 className="text-lg font-semibold mb-4 mobile-menu-section-header p-3 rounded-lg">AVES</h3>
                  <div className="space-y-3">
                    <Link
                      href="/about"
                      onClick={handleLinkClick("/about")}
                      className="flex items-center gap-3 p-3 rounded-lg mobile-menu-item-enhanced mobile-menu-item touch-manipulation"
                    >
                      <Users className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                      <span>About AVES</span>
                    </Link>
                    <Link
                      href="/team"
                      onClick={handleLinkClick("/team")}
                      className="flex items-center gap-3 p-3 rounded-lg mobile-menu-item-enhanced mobile-menu-item touch-manipulation"
                    >
                      <Users className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span>Our Team</span>
                    </Link>
                    <Link
                      href="/about/partners"
                      onClick={handleLinkClick("/about/partners")}
                      className="flex items-center gap-3 p-3 rounded-lg mobile-menu-item-enhanced mobile-menu-item touch-manipulation"
                    >
                      <div className="h-5 w-5 text-purple-500 flex-shrink-0">🤝</div>
                      <span>Our Partners</span>
                    </Link>
                    <Link
                      href="/about/b-corp"
                      onClick={handleLinkClick("/about/b-corp")}
                      className="flex items-center gap-3 p-3 rounded-lg mobile-menu-item-enhanced mobile-menu-item touch-manipulation"
                    >
                      <div className="h-5 w-5 text-green-500 flex-shrink-0">🌿</div>
                      <span>Our B Corp Journey</span>
                    </Link>
                    <Link
                      href="/conservation"
                      onClick={handleLinkClick("/conservation")}
                      className="flex items-center gap-3 p-3 rounded-lg mobile-menu-item-enhanced mobile-menu-item touch-manipulation"
                    >
                      <div className="h-5 w-5 text-green-600 flex-shrink-0">🌱</div>
                      <span>Conservation</span>
                    </Link>
                    <Link
                      href="/contact"
                      onClick={handleLinkClick("/contact")}
                      className="flex items-center gap-3 p-3 rounded-lg mobile-menu-item-enhanced mobile-menu-item touch-manipulation"
                    >
                      <Mail className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span>Contact</span>
                    </Link>
                  </div>
                </div>
              </nav>
            </div>

            {/* Enhanced Footer with improved transparency */}
            <div className="border-t border-white/20 p-6 mobile-menu-cta-area">
              <div className="mb-4">
                <Link href="/shopping">
                  <Button
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 touch-manipulation"
                    onClick={handleLinkClick("/shopping")}
                  >
                    Book Your Journey
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <Link
                  href="/privacy"
                  onClick={handleLinkClick("/privacy")}
                  className="flex items-center gap-2 hover:text-emerald-600 transition-colors mobile-menu-text-enhanced touch-manipulation"
                >
                  <Shield className="h-4 w-4 flex-shrink-0" />
                  <span>Privacy Policy</span>
                </Link>
                <Link
                  href="/terms"
                  onClick={handleLinkClick("/terms")}
                  className="flex items-center gap-2 hover:text-emerald-600 transition-colors mobile-menu-text-enhanced touch-manipulation"
                >
                  <FileText className="h-4 w-4 flex-shrink-0" />
                  <span>Terms of Service</span>
                </Link>
                <Link
                  href="/cookies"
                  onClick={handleLinkClick("/cookies")}
                  className="flex items-center gap-2 hover:text-emerald-600 transition-colors mobile-menu-text-enhanced touch-manipulation"
                >
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
