import Link from "next/link"
import OptimizedImage from "@/components/optimized-image"

interface FooterProps {
  transparent?: boolean
}

export function Footer({ transparent = false }: FooterProps) {
  const footerClasses = transparent
    ? "relative bg-gray-900/50 backdrop-blur-lg text-white py-12 sm:py-16 z-20 border-t border-white/20"
    : "bg-gray-900/95 backdrop-blur-sm text-white py-12 sm:py-16 relative z-10"

  const linkClasses = transparent
    ? "hover:text-emerald-400 transition-colors duration-300 cursor-pointer touch-manipulation drop-shadow-md text-shadow-md hover:drop-shadow-lg flex items-center space-x-2"
    : "hover:text-emerald-400 transition-colors duration-300 cursor-pointer touch-manipulation drop-shadow-sm flex items-center space-x-2"

  const textClasses = transparent ? "text-white drop-shadow-md text-shadow-md" : "text-gray-200 drop-shadow-sm"

  const headingClasses = transparent ? "drop-shadow-lg text-shadow-lg" : "drop-shadow-sm"

  return (
    <footer className={footerClasses}>
      <div className="container mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
          {/* Logo and Description Column */}
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
            <h3 className={`text-lg font-bold mb-3 text-emerald-400 ${headingClasses}`}>AVES Colombia</h3>
            <p className={`mb-6 text-sm sm:text-base leading-relaxed max-w-sm mx-auto ${textClasses}`}>
              Premium birding tours in Colombia, committed to conservation and sustainable tourism.
            </p>

            {/* Contact Info */}
            <div className={`mb-6 text-sm ${textClasses}`}>
              <div className="flex items-center justify-center space-x-2">
                <span>📧</span>
                <a
                  href="mailto:info@aves.bio"
                  className={`hover:text-emerald-400 transition-colors duration-300 ${transparent ? "drop-shadow-md text-shadow-md hover:drop-shadow-lg" : "drop-shadow-sm"}`}
                  aria-label="Email AVES Colombia"
                >
                  info@aves.bio
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex justify-center space-x-4">
              <a
                href="https://facebook.com/avescolombia"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-all duration-300 cursor-pointer touch-manipulation transform hover:scale-110 ${
                  transparent
                    ? "bg-gray-800/40 backdrop-blur-md border border-white/30 hover:border-emerald-400/50 shadow-xl"
                    : "bg-gray-800/60 backdrop-blur-sm shadow-lg"
                }`}
                aria-label="Follow AVES Colombia on Facebook"
              >
                <span className={`text-sm font-bold ${transparent ? "text-white drop-shadow-lg" : "text-white"}`}>
                  f
                </span>
              </a>
              <a
                href="https://instagram.com/avescolombia"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-all duration-300 cursor-pointer touch-manipulation transform hover:scale-110 ${
                  transparent
                    ? "bg-gray-800/40 backdrop-blur-md border border-white/30 hover:border-emerald-400/50 shadow-xl"
                    : "bg-gray-800/60 backdrop-blur-sm shadow-lg"
                }`}
                aria-label="Follow AVES Colombia on Instagram"
              >
                <span className={`text-sm font-bold ${transparent ? "text-white drop-shadow-lg" : "text-white"}`}>
                  ig
                </span>
              </a>
              <a
                href="https://twitter.com/avescolombia"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-all duration-300 cursor-pointer touch-manipulation transform hover:scale-110 ${
                  transparent
                    ? "bg-gray-800/40 backdrop-blur-md border border-white/30 hover:border-emerald-400/50 shadow-xl"
                    : "bg-gray-800/60 backdrop-blur-sm shadow-lg"
                }`}
                aria-label="Follow AVES Colombia on Twitter"
              >
                <span className={`text-sm font-bold ${transparent ? "text-white drop-shadow-lg" : "text-white"}`}>
                  tw
                </span>
              </a>
            </div>
          </div>

          {/* Tours Column */}
          <div className="text-center sm:text-left">
            <h4 className={`font-semibold mb-4 text-base sm:text-lg text-emerald-400 ${headingClasses}`}>🦅 Tours</h4>
            <ul className={`space-y-3 text-sm sm:text-base ${textClasses}`}>
              <li>
                <Link href="/tours" className={linkClasses}>
                  <span>🗺️</span>
                  <span>All Tours</span>
                </Link>
              </li>
              <li>
                <Link href="/tours/adventure" className={linkClasses}>
                  <span>🏔️</span>
                  <span>Adventure Tours</span>
                </Link>
              </li>
              <li>
                <Link href="/tours/vision" className={linkClasses}>
                  <span>👁️</span>
                  <span>Vision Tours</span>
                </Link>
              </li>
              <li>
                <Link href="/tours/elevate" className={linkClasses}>
                  <span>⬆️</span>
                  <span>Elevate Tours</span>
                </Link>
              </li>
              <li>
                <Link href="/tours/souls" className={linkClasses}>
                  <span>✨</span>
                  <span>Souls Tours</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore Column */}
          <div className="text-center sm:text-left">
            <h4 className={`font-semibold mb-4 text-base sm:text-lg text-emerald-400 ${headingClasses}`}>🌎 Explore</h4>
            <ul className={`space-y-3 text-sm sm:text-base ${textClasses}`}>
              <li>
                <Link href="/aves-explorer" className={linkClasses}>
                  <span>🇨🇴</span>
                  <span>Colombia Explorer</span>
                </Link>
              </li>
              <li>
                <Link href="/species" className={linkClasses}>
                  <span>🐦</span>
                  <span>Bird Species</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className={linkClasses}>
                  <span>📝</span>
                  <span>Birding Blog</span>
                </Link>
              </li>
              <li>
                <Link href="/resources" className={linkClasses}>
                  <span>📚</span>
                  <span>Birding Resources</span>
                </Link>
              </li>
              <li>
                <Link href="/travel-tips" className={linkClasses}>
                  <span>🎒</span>
                  <span>Travel Tips</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="text-center sm:text-left">
            <h4 className={`font-semibold mb-4 text-base sm:text-lg text-emerald-400 ${headingClasses}`}>🏢 Company</h4>
            <ul className={`space-y-3 text-sm sm:text-base ${textClasses}`}>
              <li>
                <Link href="/about" className={linkClasses}>
                  <span>ℹ️</span>
                  <span>About AVES</span>
                </Link>
              </li>
              <li>
                <Link href="/team" className={linkClasses}>
                  <span>👥</span>
                  <span>Our Team</span>
                </Link>
              </li>
              <li>
                <Link href="/about/partners" className={linkClasses}>
                  <span>🤝</span>
                  <span>Our Partners</span>
                </Link>
              </li>
              <li>
                <Link href="/about/b-corp" className={linkClasses}>
                  <span>🌱</span>
                  <span>B Corp Journey</span>
                </Link>
              </li>
              <li>
                <Link href="/conservation" className={linkClasses}>
                  <span>🌿</span>
                  <span>Conservation</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className={linkClasses}>
                  <span>📞</span>
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/50 mt-8 pt-8 text-center">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className={`text-sm ${textClasses}`}>© 2024 AVES Colombia. All rights reserved.</p>
            <div className="flex flex-wrap justify-center sm:justify-end space-x-4 text-sm">
              <Link href="/privacy" className={`${linkClasses} justify-center sm:justify-start`}>
                <span>🔒</span>
                <span>Privacy Policy</span>
              </Link>
              <Link href="/terms" className={`${linkClasses} justify-center sm:justify-start`}>
                <span>📋</span>
                <span>Terms of Service</span>
              </Link>
              <Link href="/cookies" className={`${linkClasses} justify-center sm:justify-start`}>
                <span>🍪</span>
                <span>Cookie Policy</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
