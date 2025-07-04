"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, ChevronRight, MapPin, TelescopeIcon as Binoculars, BookOpen, Phone, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

interface MobileNavigationMenuProps {
  className?: string
}

export default function MobileNavigationMenu({ className }: MobileNavigationMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const navigationItems = [
    {
      title: "Tours",
      icon: <Binoculars className="w-5 h-5" />,
      items: [
        { name: "All Tours", href: "/tours" },
        { name: "Adventure Tours", href: "/tours/adventure" },
        { name: "Elevate Tours", href: "/tours/elevate" },
        { name: "Souls Tours", href: "/tours/souls" },
        { name: "Vision Tours", href: "/tours/vision" },
        { name: "Sierra Nevada", href: "/tours/adventure/sierra-nevada" },
      ],
    },
    {
      title: "Regions",
      icon: <MapPin className="w-5 h-5" />,
      items: [
        { name: "Caribbean Coast", href: "/regions/caribbean" },
        { name: "Eastern Andes", href: "/regions/eastern-andes" },
        { name: "Central Andes", href: "/regions/central-andes" },
        { name: "Western Andes", href: "/regions/western-andes" },
        { name: "Colombian Massif", href: "/regions/colombian-massif" },
      ],
    },
    {
      title: "Resources",
      icon: <BookOpen className="w-5 h-5" />,
      items: [
        { name: "All Resources", href: "/resources" },
        { name: "Endemic Birds", href: "/endemic-birds" },
        { name: "Avifauna Explorer", href: "/avifauna-explorer" },
        { name: "Aves Explorer", href: "/aves-explorer" },
        { name: "Travel Tips", href: "/travel-tips" },
        { name: "Blog", href: "/blog" },
      ],
    },
    {
      title: "About",
      icon: <Info className="w-5 h-5" />,
      items: [
        { name: "About AVES", href: "/about" },
        { name: "Our Team", href: "/team" },
        { name: "Partners", href: "/about/partners" },
        { name: "B Corp Certified", href: "/about/b-corp" },
        { name: "Conservation", href: "/conservation" },
      ],
    },
    {
      title: "Contact",
      icon: <Phone className="w-5 h-5" />,
      items: [
        { name: "Contact Us", href: "/contact" },
        { name: "Plan My Trip", href: "/shopping" },
        { name: "Checkout", href: "/checkout" },
      ],
    },
  ]

  return (
    <>
      {/* AVES Logo Button - Top Right */}
      <div className={cn("fixed top-4 right-4 z-50", className)}>
        <Button
          onClick={toggleMenu}
          className={cn(
            "w-12 h-12 p-0 rounded-full bg-white/90 hover:bg-white backdrop-blur-sm border border-gray-200/50 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95",
            isOpen && "rotate-180",
          )}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <div className="relative w-8 h-8">
            <Image
              src="/images/aves-logo.png"
              alt="AVES"
              width={32}
              height={32}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </Button>
      </div>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 transition-all duration-500 ease-out"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-3/4 bg-white/90 backdrop-blur-md border-l border-gray-200/50 shadow-2xl z-50 transition-all duration-500 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="h-full overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200/50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8">
                  <Image
                    src="/images/aves-logo.png"
                    alt="AVES"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Navigation text completely removed */}
              </div>
              <Button
                onClick={closeMenu}
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0 rounded-full hover:bg-gray-100"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Navigation Content */}
          <div className="p-4 space-y-6">
            {navigationItems.map((section, sectionIndex) => (
              <div key={section.title} className="space-y-3">
                {/* Section Header */}
                <div className="flex items-center gap-3 px-2">
                  <div className="text-emerald-600">{section.icon}</div>
                  <h3 className="text-base font-semibold text-gray-900">{section.title}</h3>
                </div>

                {/* Section Items */}
                <div className="space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-emerald-50 active:bg-emerald-100 transition-all duration-200 group"
                    >
                      <span className="text-sm font-medium text-gray-700 group-hover:text-emerald-700">
                        {item.name}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition-colors duration-200" />
                    </Link>
                  ))}
                </div>

                {/* Divider (except for last section) */}
                {sectionIndex < navigationItems.length - 1 && <div className="border-t border-gray-200/50 pt-2" />}
              </div>
            ))}

            {/* Footer Links */}
            <div className="pt-6 border-t border-gray-200/50 space-y-2">
              <Link
                href="/privacy"
                onClick={closeMenu}
                className="block px-4 py-2 text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                onClick={closeMenu}
                className="block px-4 py-2 text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                onClick={closeMenu}
                className="block px-4 py-2 text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
