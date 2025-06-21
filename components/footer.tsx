import Link from "next/link"
import { Users } from "lucide-react"
import OptimizedImage from "@/components/optimized-image"
import { CookieManagementButton } from "@/components/cookie-management-button"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <OptimizedImage
                src="/images/aves-logo.png"
                alt="AVES Birdwatching Tours Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <p className="text-gray-400 mb-4">
              Premium birding tours in Colombia, committed to conservation and sustainable tourism.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                <span className="text-sm">f</span>
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                <span className="text-sm">ig</span>
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                <span className="text-sm">tw</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Tours</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/tours/adventure" className="hover:text-white transition-colors">
                  🍃 AVES Adventure
                </Link>
              </li>
              <li>
                <Link href="/tours/vision" className="hover:text-white transition-colors">
                  🪶 AVES Vision
                </Link>
              </li>
              <li>
                <Link href="/tours/elevate" className="hover:text-white transition-colors">
                  🌼 AVES Elevate
                </Link>
              </li>
              <li>
                <Link href="/tours/souls" className="hover:text-white transition-colors">
                  🍓 AVES Souls
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  🦅 About AVES
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-white transition-colors flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/about/partners" className="hover:text-white transition-colors">
                  🤝 Our Partners
                </Link>
              </li>
              <li>
                <Link href="/conservation" className="hover:text-white transition-colors">
                  🌱 Conservation
                </Link>
              </li>
              <li>
                <Link href="/about/b-corp" className="hover:text-white transition-colors flex items-center group">
                  <span className="mr-1 text-xs font-bold bg-white text-gray-900 px-1 rounded">B</span>B Corp Journey
                  <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">↑</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  📝 Blog
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  🐦 Bird Guide
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  ✈️ Travel Tips
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  📞 Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 AVES. All rights reserved.</p>
          <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">
              🔒 Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              📋 Terms of Service
            </Link>
            <CookieManagementButton
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white transition-colors p-0 h-auto font-normal"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
