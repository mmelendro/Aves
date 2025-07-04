"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, MapPin, Compass, BookOpen, Users, Mail, Shield, FileText, Cookie } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface MobileNavigationMenuProps {
  className?: string
}

export default function MobileNavigationMenu({ className }: MobileNavigationMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <div className={cn("md:hidden", className)}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-gray-100 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80 p-0 bg-white">
          <div className="flex flex-col h-full">
            {/* Header - Navigation text completely removed */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Image src="/images/aves-logo.png" alt="AVES" width={40} height={40} className="rounded-lg" />
                <span className="text-xl font-bold text-gray-900">AVES</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeMenu}
                className="p-2 hover:bg-gray-100 transition-colors"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5 text-gray-500" />
              </Button>
            </div>

            {/* Navigation Content */}
            <div className="flex-1 overflow-y-auto py-6">
              <nav className="space-y-8 px-6">
                {/* Tours Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tours</h3>
                  <div className="space-y-3">
                    <Link
                      href="/tours"
                      onClick={closeMenu}
                      className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition-colors"
                    >
                      <MapPin className="h-5 w-5 text-blue-500" />
                      <span>All Tours Overview</span>
                    </Link>
                    <Link
                      href="/tours/adventure"
                      onClick={closeMenu}
                      className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition-colors"
                    >
                      <div className="h-5 w-5 text-green-500">🌿</div>
                      <span>Adventure Tours</span>
                    </Link>
                    <Link
                      href="/tours/vision"
                      onClick={closeMenu}
                      className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition-colors"
                    >
                      <div className="h-5 w-5 text-amber-600">🪶</div>
                      <span>Vision Tours</span>
                    </Link>
                    <Link
                      href="/tours/elevate"
                      onClick={closeMenu}
                      className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition-colors"
                    >
                      <div className="h-5 w-5 text-yellow-500">🌻</div>
                      <span>Elevate Tours</span>
                    </Link>
                    <Link
                      href="/tours/souls"
                      onClick={closeMenu}
                      className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition-colors"
                    >
                      <div className="h-5 w-5 text-red-500">🍓</div>
                      <span>Souls Tours</span>
                    </Link>
                  </div>
                </div>

                {/* Regions Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Regions</h3>
                  <div className="space-y-3">
                    <Link
                      href="/regions/caribbean"
                      onClick={closeMenu}
                      className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition-colors"
                    >
                      <Compass className="h-5 w-5 text-cyan-500" />
                      <span>Caribbean Coast</span>
                    </Link>
                    <Link
                      href="/endemic-birds"
                      onClick={closeMenu}
                      className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition-colors"
                    >
                      <div className="h-5 w-5 text-purple-500">🦅</div>
                      <span>Endemic Birds</span>
                    </Link>
                  </div>
                </div>

                {/* Resources Hub Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources Hub</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">EXPLORE & PLAN</h4>
                      <div className="space-y-3">
                        <Link
                          href="/aves-explorer"
                          onClick={closeMenu}
                          className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition-colors"
                        >
                          <div className="h-5 w-5 text-amber-700">🦅</div>
                          <span>AVES Explorer</span>
                        </Link>
                        <Link
                          href="/avifauna-explorer"
                          onClick={closeMenu}
                          className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition-colors"
                        >
                          <Compass className="h-5 w-5 text-emerald-500" />
                          <span>Avifauna Explorer</span>
                        </Link>
                        <Link
                          href="/resources"
                          onClick={closeMenu}
                          className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition-colors"
                        >
                          <BookOpen className="h-5 w-5 text-blue-500" />
                          <span>Resources</span>
                        </Link>
                        <Link
                          href="/blog"
                          onClick={closeMenu}
                          className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition-colors"
                        >
                          <BookOpen className="h-5 w-5 text-indigo-500" />
                          <span>Blog</span>
                        </Link>
                        <Link
                          href="/travel-tips"
                          onClick={closeMenu}
                          className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition-colors"
                        >
                          <div className="h-5 w-5 text-orange-500">✈️</div>
                          <span>Travel Tips</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* About Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
                  <div className="space-y-3">
                    <Link
                      href="/about"
                      onClick={closeMenu}
                      className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition-colors"
                    >
                      <Users className="h-5 w-5 text-emerald-500" />
                      <span>About AVES</span>
                    </Link>
                    <Link
                      href="/team"
                      onClick={closeMenu}
                      className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition-colors"
                    >
                      <Users className="h-5 w-5 text-blue-500" />
                      <span>Our Team</span>
                    </Link>
                    <Link
                      href="/about/partners"
                      onClick={closeMenu}
                      className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition-colors"
                    >
                      <div className="h-5 w-5 text-purple-500">🤝</div>
                      <span>Partners</span>
                    </Link>
                    <Link
                      href="/conservation"
                      onClick={closeMenu}
                      className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition-colors"
                    >
                      <div className="h-5 w-5 text-green-600">🌱</div>
                      <span>Conservation</span>
                    </Link>
                    <Link
                      href="/about/b-corp"
                      onClick={closeMenu}
                      className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition-colors"
                    >
                      <div className="h-5 w-5 text-green-500">🌿</div>
                      <span>B Corp Certified</span>
                    </Link>
                  </div>
                </div>

                {/* Contact Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
                  <div className="space-y-3">
                    <Link
                      href="/contact"
                      onClick={closeMenu}
                      className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition-colors"
                    >
                      <Mail className="h-5 w-5 text-blue-500" />
                      <span>Contact Us</span>
                    </Link>
                  </div>
                </div>
              </nav>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6">
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <Link
                  href="/privacy"
                  onClick={closeMenu}
                  className="flex items-center gap-2 hover:text-emerald-600 transition-colors"
                >
                  <Shield className="h-4 w-4" />
                  <span>Privacy Policy</span>
                </Link>
                <Link
                  href="/terms"
                  onClick={closeMenu}
                  className="flex items-center gap-2 hover:text-emerald-600 transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  <span>Terms of Service</span>
                </Link>
                <Link
                  href="/cookies"
                  onClick={closeMenu}
                  className="flex items-center gap-2 hover:text-emerald-600 transition-colors"
                >
                  <Cookie className="h-4 w-4" />
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
