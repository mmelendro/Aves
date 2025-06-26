import Link from "next/link"
import { Users } from "lucide-react"
import OptimizedImage from "@/components/optimized-image"
import { CookieManagementButton } from "@/components/cookie-management-button"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 sm:py-16">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-8">
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
            <p className="text-gray-400 mb-6 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
              Premium birding tours in Colombia, committed to conservation and sustainable tourism.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer touch-manipulation">
                <span className="text-sm">f</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer touch-manipulation">
                <span className="text-sm">ig</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer touch-manipulation">
                <span className="text-sm">tw</span>
              </div>
            </div>
          </div>

          {/* Tours Column - Mobile Optimized */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-4 text-base sm:text-lg">Tours</h4>
            <ul className="space-y-3 text-gray-400 text-sm sm:text-base">
              <li>
                <Link
                  href="/tours/adventure"
                  className="hover:text-white transition-colors touch-manipulation block py-1"
                >
                  🍃 AVES Adventure
                </Link>
              </li>
              <li>
                <Link href="/tours/vision" className="hover:text-white transition-colors touch-manipulation block py-1">
                  🪶 AVES Vision
                </Link>
              </li>
              <li>
                <Link
                  href="/tours/elevate"
                  className="hover:text-white transition-colors touch-manipulation block py-1"
                >
                  🌼 AVES Elevate
                </Link>
              </li>
              <li>
                <Link href="/tours/souls" className="hover:text-white transition-colors touch-manipulation block py-1">
                  🍓 AVES Souls
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column - Mobile Optimized */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-4 text-base sm:text-lg">Company</h4>
            <ul className="space-y-3 text-gray-400 text-sm sm:text-base">
              <li>
                <Link href="/about" className="hover:text-white transition-colors touch-manipulation block py-1">
                  🦅 About AVES
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="hover:text-white transition-colors inline-flex items-center touch-manipulation block py-1"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="/about/partners"
                  className="hover:text-white transition-colors touch-manipulation block py-1"
                >
                  🤝 Our Partners
                </Link>
              </li>
              <li>
                <Link href="/conservation" className="hover:text-white transition-colors touch-manipulation block py-1">
                  🌱 Conservation
                </Link>
              </li>
              <li>
                <Link
                  href="/about/b-corp"
                  className="hover:text-white transition-colors inline-flex items-center group touch-manipulation block py-1"
                >
                  <span className="mr-1 text-xs font-bold bg-white text-gray-900 px-1 rounded">B</span>B Corp Journey
                  <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">↑</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column - Mobile Optimized */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-4 text-base sm:text-lg">Resources</h4>
            <ul className="space-y-3 text-gray-400 text-sm sm:text-base">
              <li>
                <Link href="/blog" className="hover:text-white transition-colors touch-manipulation block py-1">
                  📝 Blog
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white transition-colors touch-manipulation block py-1">
                  📚 Resources
                </Link>
              </li>
              <li>
                <Link href="/travel-tips" className="hover:text-white transition-colors touch-manipulation block py-1">
                  ✈️ Travel Tips
                </Link>
              </li>
              <li>
                <Link href="/bioregions" className="hover:text-white transition-colors touch-manipulation block py-1">
                  🗺️ Bioregions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors touch-manipulation block py-1">
                  📞 Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section - Mobile Optimized */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
          <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">© 2025 AVES. All rights reserved.</p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-400 text-center">
            <Link href="/privacy" className="hover:text-white transition-colors touch-manipulation py-1">
              🔒 Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors touch-manipulation py-1">
              📋 Terms of Service
            </Link>
            <CookieManagementButton
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white transition-colors p-1 h-auto font-normal touch-manipulation"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
