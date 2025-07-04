"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Leaf, Heart, ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img src="/images/aves-logo.png" alt="AVES Colombia Logo" className="h-10 w-10" />
              <div>
                <h3 className="text-xl font-bold">AVES</h3>
                <p className="text-emerald-300 text-sm">Colombia</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Expert-guided birding tours across Colombia's 11 bioregions. Discover 1,900+ species with passionate
              ornithologists committed to conservation and sustainable tourism.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/aves-colombia"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/aves-colombia"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/aves-colombia"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/aves-colombia"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-emerald-300">Explore</h4>
            <nav className="space-y-3">
              <Link
                href="/tours"
                className="block text-gray-300 hover:text-emerald-300 transition-colors hover:translate-x-1 transform duration-200"
              >
                Our Tours
              </Link>
              <Link
                href="/aves-explorer"
                className="block text-gray-300 hover:text-emerald-300 transition-colors hover:translate-x-1 transform duration-200"
              >
                Explore Colombia
              </Link>
              <Link
                href="/endemic-birds"
                className="block text-gray-300 hover:text-emerald-300 transition-colors hover:translate-x-1 transform duration-200"
              >
                Endemic Birds
              </Link>
              <Link
                href="/blog"
                className="block text-gray-300 hover:text-emerald-300 transition-colors hover:translate-x-1 transform duration-200"
              >
                Blog
              </Link>
              <Link
                href="/resources"
                className="block text-gray-300 hover:text-emerald-300 transition-colors hover:translate-x-1 transform duration-200"
              >
                Resources
              </Link>
              <Link
                href="/travel-tips"
                className="block text-gray-300 hover:text-emerald-300 transition-colors hover:translate-x-1 transform duration-200"
              >
                Travel Tips
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-emerald-300">Company</h4>
            <nav className="space-y-3">
              <Link
                href="/about"
                className="block text-gray-300 hover:text-emerald-300 transition-colors hover:translate-x-1 transform duration-200"
              >
                About AVES
              </Link>
              <Link
                href="/team"
                className="block text-gray-300 hover:text-emerald-300 transition-colors hover:translate-x-1 transform duration-200"
              >
                Our Team
              </Link>
              <Link
                href="/about/partners"
                className="block text-gray-300 hover:text-emerald-300 transition-colors hover:translate-x-1 transform duration-200"
              >
                Partners
              </Link>
              <Link
                href="/about/b-corp"
                className="block text-gray-300 hover:text-emerald-300 transition-colors hover:translate-x-1 transform duration-200"
              >
                B Corp Journey
              </Link>
              <Link
                href="/conservation"
                className="block text-gray-300 hover:text-emerald-300 transition-colors hover:translate-x-1 transform duration-200"
              >
                Conservation
              </Link>
              <Link
                href="/contact"
                className="block text-gray-300 hover:text-emerald-300 transition-colors hover:translate-x-1 transform duration-200"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-emerald-300">Stay Connected</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="mailto:info@aves.bio" className="text-gray-300 hover:text-emerald-300 transition-colors">
                    info@aves.bio
                  </a>
                  <p className="text-gray-400 text-sm">24-hour response</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Vancouver, Canada</p>
                  <p className="text-gray-300">Bogotá, Colombia</p>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h5 className="font-medium text-white">Newsletter</h5>
              <p className="text-gray-400 text-sm">Get birding tips and tour updates</p>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500"
                />
                <Button className="bg-emerald-600 hover:bg-emerald-700 px-4">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-700" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-gray-400 text-sm">© 2024 AVES Colombia. All rights reserved.</p>
            <div className="flex items-center space-x-4 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-emerald-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-emerald-300 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-emerald-300 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-emerald-300">
              <Leaf className="h-4 w-4" />
              <span className="text-sm font-medium">B Corp Certified</span>
            </div>
            <div className="flex items-center space-x-2 text-emerald-300">
              <Heart className="h-4 w-4" />
              <span className="text-sm font-medium">Carbon Neutral</span>
            </div>
          </div>
        </div>

        {/* Additional Links */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400">
            <a
              href="https://www.bcorporation.net/en-us/find-a-b-corp/company/aves-colombia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 hover:text-emerald-300 transition-colors"
            >
              <span>B Corp Directory</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://www.carbonfund.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 hover:text-emerald-300 transition-colors"
            >
              <span>Carbon Offset Partner</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://www.proaves.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 hover:text-emerald-300 transition-colors"
            >
              <span>Conservation Partner</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
