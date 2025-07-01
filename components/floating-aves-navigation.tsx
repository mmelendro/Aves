"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Leaf, Camera, Award, Heart, X, ChevronUp, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface FloatingAVESNavigationProps {
  autoHideDuration?: number
}

export default function FloatingAVESNavigation({ autoHideDuration = 15000 }: FloatingAVESNavigationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Auto-hide functionality
  useEffect(() => {
    if (autoHideDuration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, autoHideDuration)

      return () => clearTimeout(timer)
    }
  }, [autoHideDuration])

  // Hide on scroll for mobile
  useEffect(() => {
    if (!isMobile) return

    let lastScrollY = window.scrollY
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
        setIsExpanded(false)
      }
      lastScrollY = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMobile])

  if (!isVisible) return null

  const tours = [
    {
      id: "adventure",
      name: "Adventure Tours",
      icon: Leaf,
      color: "emerald",
      emoji: "🍃",
      description: "Signature birding expeditions",
      href: "/tours/adventure",
    },
    {
      id: "vision",
      name: "Vision Tours",
      icon: Camera,
      color: "purple",
      emoji: "🪶",
      description: "Photography workshops",
      href: "/tours/vision",
    },
    {
      id: "elevate",
      name: "Elevate Tours",
      icon: Award,
      color: "yellow",
      emoji: "🌼",
      description: "Luxury expeditions",
      href: "/tours/elevate",
    },
    {
      id: "souls",
      name: "Souls Tours",
      icon: Heart,
      color: "red",
      emoji: "🍓",
      description: "Cultural immersion",
      href: "/tours/souls",
    },
  ]

  return (
    <div
      className={cn(
        "fixed z-40 transition-all duration-500 ease-in-out",
        isMobile ? "bottom-4 right-4 left-4" : "bottom-6 right-6",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
      )}
    >
      <Card
        className={cn(
          "bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl",
          isMobile ? "rounded-2xl" : "rounded-xl",
        )}
      >
        {/* Mobile Compact View */}
        {isMobile && !isExpanded && (
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Explore Tours</div>
                  <div className="text-xs text-gray-600">4 unique experiences</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  onClick={() => setIsExpanded(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-xs px-3 py-2 h-8"
                >
                  <ChevronUp className="w-3 h-3 mr-1" />
                  View
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsVisible(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Expanded View */}
        {isMobile && isExpanded && (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-900 text-base">Explore Our Tours</h3>
                <p className="text-xs text-gray-600">Discover Colombia's incredible biodiversity</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-gray-600 p-1 h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {tours.map((tour) => {
                const IconComponent = tour.icon
                return (
                  <Link key={tour.id} href={tour.href}>
                    <div className="p-3 rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200 touch-manipulation">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg">{tour.emoji}</span>
                        <IconComponent className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="text-xs font-semibold text-gray-900 mb-1">{tour.name}</div>
                      <div className="text-xs text-gray-600">{tour.description}</div>
                    </div>
                  </Link>
                )
              })}
            </div>

            <div className="flex space-x-2">
              <Link href="/tours" className="flex-1">
                <Button size="sm" variant="outline" className="w-full text-xs h-9 touch-manipulation bg-transparent">
                  <MapPin className="w-3 h-3 mr-1" />
                  All Tours
                </Button>
              </Link>
              <Link href="/contact" className="flex-1">
                <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700 text-xs h-9 touch-manipulation">
                  <Calendar className="w-3 h-3 mr-1" />
                  Plan Trip
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Desktop View */}
        {!isMobile && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Explore Our Tours</h3>
                <p className="text-sm text-gray-600">Discover Colombia's incredible biodiversity</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {tours.map((tour) => {
                const IconComponent = tour.icon
                return (
                  <Link key={tour.id} href={tour.href}>
                    <div className="p-4 rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200 group">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl">{tour.emoji}</span>
                        <IconComponent className="w-5 h-5 text-gray-600 group-hover:text-emerald-600" />
                      </div>
                      <div className="text-sm font-semibold text-gray-900 mb-1">{tour.name}</div>
                      <div className="text-xs text-gray-600">{tour.description}</div>
                    </div>
                  </Link>
                )
              })}
            </div>

            <div className="flex space-x-3">
              <Link href="/tours" className="flex-1">
                <Button size="sm" variant="outline" className="w-full bg-transparent">
                  <MapPin className="w-4 h-4 mr-2" />
                  View All Tours
                </Button>
              </Link>
              <Link href="/contact" className="flex-1">
                <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  Plan Your Trip
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
