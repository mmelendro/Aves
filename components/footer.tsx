import Link from "next/link"
import OptimizedImage from "@/components/optimized-image"

export function Footer() {
  return (
    <footer className="bg-gray-900/95 backdrop-blur-sm text-white py-12 sm:py-16 relative z-10">
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
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
              />
            </div>
            <h3 className="text-lg font-bold mb-3 text-emerald-400">AVES Colombia</h3>
            <p className="text-gray-300 mb-6 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
              Premium birding tours in Colombia, committed to conservation and sustainable tourism.
            </p>

            {/* Contact Info */}
            <div className="mb-6 text-sm text-gray-300">
              <div className="flex items-center justify-center space-x-2">
                <span>📧</span>
                <span>info@aves.bio</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex justify-center space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-emerald-600 transition-all duration-300 cursor-pointer touch-manipulation transform hover:scale-110"
                aria-label="Facebook"
              >
                <span className="text-sm font-bold">f</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-emerald-600 transition-all duration-300 cursor-pointer touch-manipulation transform hover:scale-110"
                aria-label="Instagram"
              >
                <span className="text-sm font-bold">ig</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-emerald-600 transition-all duration-300 cursor-pointer touch-manipulation transform hover:scale-110"
                aria-label="Twitter"
              >
                <span className="text-sm font-bold">tw</span>
              </a>
            </div>
          </div>

          {/* Tours Column */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-4 text-base sm:text-lg text-emerald-400">🦅 Tours</h4>
            <ul className="space-y-3 text-gray-300 text-sm sm:text-base">
              <li>
                <Link
                  href="/tours/adventure"
                  className="hover:text-emerald-400 transition-colors duration-300 touch-manipulation block py-1 hover:translate-x-1 transform"
                >
                  🍃 Adventure Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/tours/vision"
                  className="hover:text-emerald-400 transition-colors duration-300 touch-manipulation block py-1 hover:translate-x-1 transform"
                >
                  🪶 Vision Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/tours/elevate"
                  className="hover:text-emerald-400 transition-colors duration-300 touch-manipulation block py-1 hover:translate-x-1 transform"
                >
                  🌼 Elevate Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/tours/souls"
                  className="hover:text-emerald-400 transition-colors duration-300 touch-manipulation block py-1 hover:translate-x-1 transform"
                >
                  🍓 Souls Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/tours"
                  className="hover:text-emerald-400 transition-colors duration-300 touch-manipulation block py-1 hover:translate-x-1 transform"
                >
                  🗺️ View All Tours
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-4 text-base sm:text-lg text-emerald-400">🏢 Company</h4>
            <ul className="space-y-3 text-gray-300 text-sm sm:text-base">
              <li>
                <Link
                  href="/about"
                  className="hover:text-emerald-400 transition-colors duration-300 touch-manipulation block py-1 hover:translate-x-1 transform"
                >
                  ℹ️ About AVES
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="hover:text-emerald-400 transition-colors duration-300 touch-manipulation block py-1 hover:translate-x-1 transform"
                >
                  👥 Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="/about/partners"
                  className="hover:text-emerald-400 transition-colors duration-300 touch-manipulation block py-1 hover:translate-x-1 transform"
                >
                  🤝 Our Partners
                </Link>
              </li>
              <li>
                <Link
                  href="/conservation"
                  className="hover:text-emerald-400 transition-colors duration-300 touch-manipulation block py-1 hover:translate-x-1 transform"
                >
                  🌱 Conservation
                </Link>
              </li>
              <li>
                <Link
                  href="/about/b-corp"
                  className="hover:text-emerald-400 transition-colors duration-300 inline-flex items-center group touch-manipulation block py-1 hover:translate-x-1 transform"
                >
                  <span className="mr-1 text-xs font-bold bg-white text-gray-900 px-1 rounded">B</span>B Corp Journey
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Support Column - Updated with AVES Explorer */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-4 text-base sm:text-lg text-emerald-400">📚 Resources</h4>
            <ul className="space-y-3 text-gray-300 text-sm sm:text-base">
              <li>
                <Link
                  href="/resources"
                  className="hover:text-emerald-400 transition-colors duration-300 touch-manipulation block py-1 hover:translate-x-1 transform"
                >
                  🎯 Resource Hub
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-emerald-400 transition-colors duration-300 touch-manipulation block py-1 hover:translate-x-1 transform"
                >
                  📝 Blog & Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/aves-explorer"
                  className="hover:text-emerald-400 transition-colors duration-300 touch-manipulation block py-1 hover:translate-x-1 transform"
                >
                  🦅 AVES Explorer
                </Link>
              </li>
              <li>
                <Link
                  href="/travel-tips"
                  className="hover:text-emerald-400 transition-colors duration-300 touch-manipulation block py-1 hover:translate-x-1 transform"
                >
                  ✈️ Travel Essentials
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-emerald-400 transition-colors duration-300 touch-manipulation block py-1 mt-4 pt-4 border-t border-gray-700/50 hover:translate-x-1 transform"
                >
                  📞 Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/shopping"
                  className="hover:text-emerald-400 transition-colors duration-300 touch-manipulation block py-1 hover:translate-x-1 transform"
                >
                  🎫 Book a Tour
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section with Copyright and Legal Links */}
        <div className="border-t border-gray-700/50 mt-12 pt-8">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
            <div className="text-center sm:text-left">
              <p className="text-gray-300 text-xs sm:text-sm">© 2025 AVES Colombia. All rights reserved.</p>
              <p className="text-gray-400 text-xs mt-1">
                Sustainable birding tours supporting conservation and local communities.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-300 text-center">
              <Link
                href="/privacy"
                className="hover:text-emerald-400 transition-colors duration-300 touch-manipulation"
              >
                🔒 Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-emerald-400 transition-colors duration-300 touch-manipulation">
                📋 Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="hover:text-emerald-400 transition-colors duration-300 touch-manipulation"
              >
                🍪 Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent pointer-events-none"></div>
    </footer>
  )
}
