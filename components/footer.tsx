import Link from "next/link"
import OptimizedImage from "@/components/optimized-image"

interface FooterProps {
  transparent?: boolean
}

export function Footer({ transparent = false }: FooterProps) {
  const footerClasses = transparent
    ? "relative bg-gray-900/50 backdrop-blur-lg text-white py-12 sm:py-16 z-20 border-t border-white/20"
    : "bg-gray-900/95 backdrop-blur-sm text-white py-12 sm:py-16 relative z-10"

  return (
    <footer className={footerClasses}>
      <div className="container mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
          {/* Logo and Description Column - Mobile Optimized */}
          <div className="text-center sm:col-span-2 lg:col-span-1">
            <div className="flex justify-center mb-4">
              <OptimizedImage
                src="/images/aves-logo.png"
                alt="AVES Birdwatching Tours Logo"
                width={64}
                height={64}
                className={`w-12 h-12 sm:w-16 sm:h-16 object-contain ${transparent ? "drop-shadow-lg" : ""}`}
              />
            </div>
            <h3
              className={`text-lg font-bold mb-3 text-emerald-400 ${transparent ? "drop-shadow-lg text-shadow-lg" : "drop-shadow-sm"}`}
            >
              AVES Colombia
            </h3>
            <p
              className={`mb-6 text-sm sm:text-base leading-relaxed max-w-sm mx-auto ${transparent ? "text-white drop-shadow-md text-shadow-md" : "text-gray-200 drop-shadow-sm"}`}
            >
              Premium birding tours in Colombia, committed to conservation and sustainable tourism.
            </p>

            {/* Contact Info */}
            <div
              className={`mb-6 text-sm ${transparent ? "text-white drop-shadow-md text-shadow-md" : "text-gray-200 drop-shadow-sm"}`}
            >
              <div className="flex items-center justify-center space-x-2">
                <span>📧</span>
                <span>info@aves.bio</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex justify-center space-x-4">
              <a
                href="#"
                className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-all duration-300 cursor-pointer touch-manipulation transform hover:scale-110 ${
                  transparent
                    ? "bg-gray-800/40 backdrop-blur-md border border-white/30 hover:border-emerald-400/50 shadow-xl"
                    : "bg-gray-800/60 backdrop-blur-sm shadow-lg"
                }`}
                aria-label="Facebook"
              >
                <span className={`text-sm font-bold ${transparent ? "text-white drop-shadow-lg" : "text-white"}`}>
                  f
                </span>
              </a>
              <a
                href="#"
                className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-all duration-300 cursor-pointer touch-manipulation transform hover:scale-110 ${
                  transparent
                    ? "bg-gray-800/40 backdrop-blur-md border border-white/30 hover:border-emerald-400/50 shadow-xl"
                    : "bg-gray-800/60 backdrop-blur-sm shadow-lg"
                }`}
                aria-label="Instagram"
              >
                <span className={`text-sm font-bold ${transparent ? "text-white drop-shadow-lg" : "text-white"}`}>
                  ig
                </span>
              </a>
              <a
                href="#"
                className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-all duration-300 cursor-pointer touch-manipulation transform hover:scale-110 ${
                  transparent
                    ? "bg-gray-800/40 backdrop-blur-md border border-white/30 hover:border-emerald-400/50 shadow-xl"
                    : "bg-gray-800/60 backdrop-blur-sm shadow-lg"
                }`}
                aria-label="Twitter"
              >
                <span className={`text-sm font-bold ${transparent ? "text-white drop-shadow-lg" : "text-white"}`}>
                  tw
                </span>
              </a>
            </div>
          </div>

          {/* Tours Column */}
          <div className="text-center sm:text-left">
            <h4
              className={`font-semibold mb-4 text-base sm:text-lg text-emerald-400 ${transparent ? "drop-shadow-lg text-shadow-lg" : "drop-shadow-sm"}`}
            >
              🦅 Tours
            </h4>
            <ul className={`space-y-3 text-sm sm:text-base ${transparent ? "text-white" : "text-gray-200"}`}>
              <li>
                <Link
                  href="/tours"
                  className={`hover:text-emerald-400 transition-colors duration-300 cursor-pointer touch-manipulation ${transparent ? "drop-shadow-md text-shadow-md hover:drop-shadow-lg" : "drop-shadow-sm"}`}
                >
                  AVES Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/tours/adventure"
                  className={`hover:text-emerald-400 transition-colors duration-300 cursor-pointer touch-manipulation ${transparent ? "drop-shadow-md text-shadow-md hover:drop-shadow-lg" : "drop-shadow-sm"}`}
                >
                  Adventure Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/tours/vision"
                  className={`hover:text-emerald-400 transition-colors duration-300 cursor-pointer touch-manipulation ${transparent ? "drop-shadow-md text-shadow-md hover:drop-shadow-lg" : "drop-shadow-sm"}`}
                >
                  Vision Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/tours/elevate"
                  className={`hover:text-emerald-400 transition-colors duration-300 cursor-pointer touch-manipulation ${transparent ? "drop-shadow-md text-shadow-md hover:drop-shadow-lg" : "drop-shadow-sm"}`}
                >
                  Elevate Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/tours/souls"
                  className={`hover:text-emerald-400 transition-colors duration-300 cursor-pointer touch-manipulation ${transparent ? "drop-shadow-md text-shadow-md hover:drop-shadow-lg" : "drop-shadow-sm"}`}
                >
                  Souls Tours
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore Column */}
          <div className="text-center sm:text-left">
            <h4
              className={`font-semibold mb-4 text-base sm:text-lg text-emerald-400 ${transparent ? "drop-shadow-lg text-shadow-lg" : "drop-shadow-sm"}`}
            >
              🌎 Explore
            </h4>
            <ul className={`space-y-3 text-sm sm:text-base ${transparent ? "text-white" : "text-gray-200"}`}>
              <li>
                <Link
                  href="/aves-explorer"
                  className={`hover:text-emerald-400 transition-colors duration-300 cursor-pointer touch-manipulation ${transparent ? "drop-shadow-md text-shadow-md hover:drop-shadow-lg" : "drop-shadow-sm"}`}
                >
                  Colombia
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className={`hover:text-emerald-400 transition-colors duration-300 cursor-pointer touch-manipulation ${transparent ? "drop-shadow-md text-shadow-md hover:drop-shadow-lg" : "drop-shadow-sm"}`}
                >
                  Birding with AVES
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className={`hover:text-emerald-400 transition-colors duration-300 cursor-pointer touch-manipulation ${transparent ? "drop-shadow-md text-shadow-md hover:drop-shadow-lg" : "drop-shadow-sm"}`}
                >
                  Birding in Colombia
                </Link>
              </li>
              <li>
                <Link
                  href="/travel-tips"
                  className={`hover:text-emerald-400 transition-colors duration-300 cursor-pointer touch-manipulation ${transparent ? "drop-shadow-md text-shadow-md hover:drop-shadow-lg" : "drop-shadow-sm"}`}
                >
                  Travel Essentials
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="text-center sm:text-left">
            <h4
              className={`font-semibold mb-4 text-base sm:text-lg text-emerald-400 ${transparent ? "drop-shadow-lg text-shadow-lg" : "drop-shadow-sm"}`}
            >
              🏢 AVES
            </h4>
            <ul className={`space-y-3 text-sm sm:text-base ${transparent ? "text-white" : "text-gray-200"}`}>
              <li>
                <Link
                  href="/about"
                  className={`hover:text-emerald-400 transition-colors duration-300 cursor-pointer touch-manipulation ${transparent ? "drop-shadow-md text-shadow-md hover:drop-shadow-lg" : "drop-shadow-sm"}`}
                >
                  About AVES
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className={`hover:text-emerald-400 transition-colors duration-300 cursor-pointer touch-manipulation ${transparent ? "drop-shadow-md text-shadow-md hover:drop-shadow-lg" : "drop-shadow-sm"}`}
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="/about/partners"
                  className={`hover:text-emerald-400 transition-colors duration-300 cursor-pointer touch-manipulation ${transparent ? "drop-shadow-md text-shadow-md hover:drop-shadow-lg" : "drop-shadow-sm"}`}
                >
                  Our Partners
                </Link>
              </li>
              <li>
                <Link
                  href="/about/b-corp"
                  className={`hover:text-emerald-400 transition-colors duration-300 cursor-pointer touch-manipulation ${transparent ? "drop-shadow-md text-shadow-md hover:drop-shadow-lg" : "drop-shadow-sm"}`}
                >
                  Our B Corp Journey
                </Link>
              </li>
              <li>
                <Link
                  href="/conservation"
                  className={`hover:text-emerald-400 transition-colors duration-300 cursor-pointer touch-manipulation ${transparent ? "drop-shadow-md text-shadow-md hover:drop-shadow-lg" : "drop-shadow-sm"}`}
                >
                  Conservation
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`hover:text-emerald-400 transition-colors duration-300 cursor-pointer touch-manipulation ${transparent ? "drop-shadow-md text-shadow-md hover:drop-shadow-lg" : "drop-shadow-sm"}`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/50 mt-8 pt-8 text-center">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p
              className={`text-sm ${transparent ? "text-white drop-shadow-md text-shadow-md" : "text-gray-300 drop-shadow-sm"}`}
            >
              © 2024 AVES Colombia. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end space-x-4 text-sm">
              <Link
                href="/privacy"
                className={`hover:text-emerald-400 transition-colors duration-300 cursor-pointer touch-manipulation ${transparent ? "text-white drop-shadow-md text-shadow-md hover:drop-shadow-lg" : "text-gray-300 drop-shadow-sm"}`}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className={`hover:text-emerald-400 transition-colors duration-300 cursor-pointer touch-manipulation ${transparent ? "text-white drop-shadow-md text-shadow-md hover:drop-shadow-lg" : "text-gray-300 drop-shadow-sm"}`}
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className={`hover:text-emerald-400 transition-colors duration-300 cursor-pointer touch-manipulation ${transparent ? "text-white drop-shadow-md text-shadow-md hover:drop-shadow-lg" : "text-gray-300 drop-shadow-sm"}`}
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
