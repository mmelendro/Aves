"use client"

import Link from "next/link"
import OptimizedImage from "@/components/optimized-image"
import { cn } from "@/lib/utils"

interface FooterProps {
  transparent?: boolean
}

export function Footer({ transparent = false }: FooterProps) {
  return (
    <footer
      className={cn(
        "relative z-20 mt-auto transition-all duration-300",
        transparent ? "bg-gray-900/50 backdrop-blur-lg" : "bg-gray-900/95 backdrop-blur-md",
      )}
    >
      {/* Enhanced gradient overlays for better text readability when transparent */}
      {transparent && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-radial-gradient from-black/40 via-transparent to-transparent pointer-events-none" />
        </>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <OptimizedImage
                src="/images/aves-logo.png"
                alt="AVES Logo"
                width={48}
                height={48}
                className={cn("rounded-lg transition-all duration-300", transparent ? "drop-shadow-lg" : "")}
              />
              <h3
                className={cn(
                  "text-2xl font-bold transition-all duration-300",
                  transparent ? "text-white text-shadow-md drop-shadow-lg" : "text-white",
                )}
              >
                AVES
              </h3>
            </div>
            <p
              className={cn(
                "mb-6 leading-relaxed transition-all duration-300",
                transparent ? "text-white text-shadow" : "text-gray-300",
              )}
            >
              Discover Colombia's incredible bird diversity with expert guides. Sustainable birding tours that support
              conservation and local communities.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://instagram.com/aves_birding_colombia"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-3 rounded-lg transition-all duration-300 transform hover:scale-110",
                  transparent
                    ? "bg-white/20 border border-white/30 backdrop-blur-sm hover:bg-white/30 hover:drop-shadow-lg"
                    : "bg-gray-800 hover:bg-gray-700",
                )}
                aria-label="Follow AVES on Instagram"
              >
                <OptimizedImage
                  src="/images/instagram-logo.png"
                  alt="Instagram"
                  width={24}
                  height={24}
                  className={cn("transition-all duration-300", transparent ? "drop-shadow-sm" : "")}
                />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className={cn(
                "text-lg font-semibold mb-6 transition-all duration-300",
                transparent ? "text-white text-shadow-md drop-shadow-lg" : "text-white",
              )}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/tours", label: "Tours" },
                { href: "/aves-explorer", label: "Colombia Explorer" },
                { href: "/blog", label: "Blog" },
                { href: "/resources", label: "Resources" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "transition-all duration-300 hover:translate-x-1",
                      transparent
                        ? "text-white hover:text-emerald-300 text-shadow hover:text-shadow-lg"
                        : "text-gray-300 hover:text-emerald-400",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tours */}
          <div>
            <h4
              className={cn(
                "text-lg font-semibold mb-6 transition-all duration-300",
                transparent ? "text-white text-shadow-md drop-shadow-lg" : "text-white",
              )}
            >
              Our Tours
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/tours/adventure", label: "Adventure Tours" },
                { href: "/tours/vision", label: "Vision Tours" },
                { href: "/tours/elevate", label: "Elevate Tours" },
                { href: "/tours/souls", label: "Souls Tours" },
                { href: "/regions/caribbean", label: "Caribbean Region" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "transition-all duration-300 hover:translate-x-1",
                      transparent
                        ? "text-white hover:text-emerald-300 text-shadow hover:text-shadow-lg"
                        : "text-gray-300 hover:text-emerald-400",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4
              className={cn(
                "text-lg font-semibold mb-6 transition-all duration-300",
                transparent ? "text-white text-shadow-md drop-shadow-lg" : "text-white",
              )}
            >
              Legal & Support
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/cookies", label: "Cookie Policy" },
                { href: "/about/b-corp", label: "B Corp Journey" },
                { href: "/conservation", label: "Conservation" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "transition-all duration-300 hover:translate-x-1",
                      transparent
                        ? "text-white hover:text-emerald-300 text-shadow hover:text-shadow-lg"
                        : "text-gray-300 hover:text-emerald-400",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className={cn(
            "mt-12 pt-8 transition-all duration-300",
            transparent ? "border-t border-white/20" : "border-t border-gray-800",
          )}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p
              className={cn(
                "text-sm transition-all duration-300",
                transparent ? "text-white text-shadow" : "text-gray-400",
              )}
            >
              © 2024 AVES Birdwatching Tours. All rights reserved.
            </p>
            <p
              className={cn(
                "text-sm transition-all duration-300",
                transparent ? "text-white text-shadow" : "text-gray-400",
              )}
            >
              Sustainable birding tours in Colombia 🇨🇴
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
