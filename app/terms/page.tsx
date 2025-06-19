"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, Users } from "lucide-react"
import Link from "next/link"
import OptimizedImage from "@/components/optimized-image"

export default function TermsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/">
              <OptimizedImage
                src="/images/aves-logo.png"
                alt="AVES Birdwatching Tours Logo"
                width={50}
                height={50}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Tours Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-emerald-600 transition-colors">
                Tours
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link
                  href="/tours"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors border-b"
                >
                  All Tours Overview
                </Link>
                <Link
                  href="/tours/adventure"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  🍃 AVES Adventure
                </Link>
                <Link
                  href="/tours/vision"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  🪶 AVES Vision
                </Link>
                <Link
                  href="/tours/elevate"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  🌼 AVES Elevate
                </Link>
                <Link
                  href="/tours/souls"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  🍓 AVES Souls
                </Link>
              </div>
            </div>
            {/* About Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-emerald-600 transition-colors">
                About
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link
                  href="/about"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  About AVES
                </Link>
                <Link
                  href="/team"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  Our Team
                </Link>
              </div>
            </div>
            <Link href="/about/b-corp" className="text-gray-700 hover:text-emerald-600 transition-colors">
              B Corp Journey
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Blog
            </Link>
            <Link href="/conservation" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Conservation
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Link href="/shopping">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Book Your Journey</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              <div className="py-2">
                <div className="text-gray-700 font-medium py-2">Tours</div>
                <div className="pl-4 space-y-2">
                  <Link
                    href="/tours"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    All Tours Overview
                  </Link>
                  <Link
                    href="/tours/adventure"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🍃 AVES Adventure
                  </Link>
                  <Link
                    href="/tours/vision"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🪶 AVES Vision
                  </Link>
                  <Link
                    href="/tours/elevate"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🌼 AVES Elevate
                  </Link>
                  <Link
                    href="/tours/souls"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🍓 AVES Souls
                  </Link>
                </div>
              </div>
              <div className="py-2">
                <div className="text-gray-700 font-medium py-2">About</div>
                <div className="pl-4 space-y-2">
                  <Link
                    href="/about"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About AVES
                  </Link>
                  <Link
                    href="/team"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Our Team
                  </Link>
                </div>
              </div>
              <Link
                href="/about/b-corp"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                B Corp Journey
              </Link>
              <Link
                href="/blog"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/conservation"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Conservation
              </Link>
              <Link
                href="/contact"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4">
                <Link href="/shopping">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Book Your Journey</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600">
              Clear, fair terms that reflect our B Corp commitment to balancing purpose and profit while serving all
              stakeholders.
            </p>
            <div className="text-sm text-gray-500 mt-4">
              Last updated: January 2025 | Effective Date: January 1, 2025
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            {/* B Corp Commitment */}
            <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 mb-8">
              <h2 className="text-xl font-bold text-emerald-800 mb-3 flex items-center">
                <span className="mr-2 text-sm font-bold bg-emerald-600 text-white px-2 py-1 rounded">B</span>
                Our B Corp Service Commitment
              </h2>
              <p className="text-emerald-700 mb-0">
                As a Certified B Corporation, AVES Colombia operates under the highest standards of social and
                environmental performance, accountability, and transparency. These terms reflect our commitment to
                creating positive impact for all stakeholders - our guests, local communities, wildlife, and the
                environment.
              </p>
            </div>

            {/* Acceptance of Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using AVES Colombia's services, including our website, booking platform, and tour
                experiences, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree
                to these terms, please do not use our services.
              </p>
              <p>
                These terms apply to all visitors, users, and others who access or use our services, whether as
                individuals, groups, or organizations.
              </p>
            </section>

            {/* Our Services */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Our Services</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Tour Experiences</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  <strong>🍃 AVES Adventure:</strong> Multi-day birding expeditions with expert local guides
                </li>
                <li>
                  <strong>🪶 AVES Vision:</strong> Photography-focused tours for capturing Colombia's avian diversity
                </li>
                <li>
                  <strong>🌼 AVES Elevate:</strong> Premium experiences with luxury accommodations and exclusive access
                </li>
                <li>
                  <strong>🍓 AVES Souls:</strong> Cultural immersion tours connecting with indigenous communities
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Additional Services</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Custom tour planning and consultation</li>
                <li>Equipment rental and photography services</li>
                <li>Educational workshops and conservation programs</li>
                <li>Travel coordination and logistics support</li>
              </ul>
            </section>

            {/* Booking and Payment */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Booking and Payment</h2>

              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Booking Process</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All bookings must be confirmed with a deposit of 30% of the total tour cost</li>
                  <li>Full payment is required 60 days before tour departure</li>
                  <li>Bookings are subject to availability and confirmation by AVES Colombia</li>
                  <li>We reserve the right to decline bookings that don't align with our values or safety standards</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Terms</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payments are processed securely through our certified payment partners</li>
                <li>All prices are in USD unless otherwise specified</li>
                <li>Prices include all activities, accommodations, and meals as specified in tour descriptions</li>
                <li>Additional costs (flights, visas, personal expenses) are clearly outlined separately</li>
              </ul>
            </section>

            {/* Cancellation and Refund Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cancellation and Refund Policy</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-emerald-800 mb-2">Guest Cancellations</h3>
                  <ul className="text-emerald-700 text-sm space-y-1">
                    <li>• 90+ days: Full refund minus 5% processing fee</li>
                    <li>• 60-89 days: 75% refund</li>
                    <li>• 30-59 days: 50% refund</li>
                    <li>• Less than 30 days: No refund</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">AVES Cancellations</h3>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Weather/safety: Full refund or reschedule</li>
                    <li>• Minimum group not met: Full refund</li>
                    <li>• Force majeure: Credit for future tour</li>
                    <li>• Our fault: Full refund + compensation</li>
                  </ul>
                </div>
              </div>

              <p className="text-sm text-gray-600 bg-gray-100 p-4 rounded-lg">
                <strong>Travel Insurance:</strong> We strongly recommend comprehensive travel insurance to protect
                against unforeseen circumstances. We can provide recommendations for reputable providers.
              </p>
            </section>

            {/* Responsibilities and Conduct */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Guest Responsibilities and Conduct</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Expected Conduct</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Respect for wildlife, local communities, and fellow travelers</li>
                <li>Adherence to all safety guidelines and instructions from guides</li>
                <li>Compliance with local laws, customs, and environmental regulations</li>
                <li>Responsible photography and social media sharing practices</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Health and Safety Requirements</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Disclosure of any medical conditions that may affect tour participation</li>
                <li>Maintenance of adequate physical fitness for chosen tour activities</li>
                <li>Compliance with vaccination and health requirements</li>
                <li>Participation in mandatory safety briefings</li>
              </ul>
            </section>

            {/* Liability and Risk */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Liability and Risk Acknowledgment</h2>

              <div className="border-l-4 border-orange-500 pl-6 mb-4 bg-orange-50 p-4">
                <h3 className="text-lg font-semibold text-orange-800 mb-2">Important Notice</h3>
                <p className="text-orange-700 text-sm">
                  Adventure travel involves inherent risks. While we maintain the highest safety standards and
                  comprehensive insurance coverage, guests participate at their own risk and must acknowledge the
                  potential for unforeseen circumstances.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">Our Commitment to Safety</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Certified, experienced local guides with wilderness first aid training</li>
                <li>Regular safety equipment inspections and maintenance</li>
                <li>Comprehensive emergency response procedures</li>
                <li>24/7 support and communication capabilities</li>
                <li>Partnerships with local medical facilities and evacuation services</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property and Media</h2>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">Photography and Media Rights</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Guests retain rights to their personal photographs and videos</li>
                <li>AVES may use group photos for marketing with guest consent</li>
                <li>Professional photography services available with separate licensing terms</li>
                <li>Respect for indigenous community photography restrictions</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">Content and Branding</h3>
              <p>
                All AVES Colombia content, including tour descriptions, educational materials, and branding, is
                protected by copyright. Guests may share experiences but may not reproduce our content for commercial
                purposes.
              </p>
            </section>

            {/* Environmental and Social Responsibility */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Environmental and Social Responsibility</h2>

              <div className="bg-green-50 p-6 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-green-800 mb-3">Our B Corp Commitments</h3>
                <ul className="list-disc pl-6 space-y-2 text-green-700">
                  <li>Carbon-neutral operations through verified offset programs</li>
                  <li>Direct support for local conservation initiatives</li>
                  <li>Fair wages and capacity building for local guides and communities</li>
                  <li>Sustainable accommodation and transportation partnerships</li>
                  <li>Educational programs promoting environmental awareness</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">Guest Participation</h3>
              <p>
                By joining our tours, guests become part of our conservation mission. We encourage active participation
                in our sustainability initiatives and provide opportunities to contribute directly to local conservation
                projects.
              </p>
            </section>

            {/* Dispute Resolution */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Dispute Resolution</h2>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">Our Approach</h3>
              <p className="mb-4">
                Consistent with our B Corp values, we prioritize transparent communication and fair resolution of any
                concerns. We encourage direct dialogue and will work collaboratively to address any issues.
              </p>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Resolution Process</h4>
                <ol className="list-decimal pl-6 space-y-1 text-blue-700 text-sm">
                  <li>Direct communication with your tour guide or AVES representative</li>
                  <li>Escalation to our Guest Experience team within 24 hours</li>
                  <li>Formal review by our management team within 7 days</li>
                  <li>Mediation through accredited third-party services if needed</li>
                </ol>
              </div>
            </section>

            {/* Changes to Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to These Terms</h2>
              <p className="mb-4">
                We may update these terms to reflect changes in our services, legal requirements, or B Corp standards.
                We will provide at least 30 days' notice of material changes via email and prominent website
                notification.
              </p>
              <p>
                Continued use of our services after changes take effect constitutes acceptance of the updated terms.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
              <div className="bg-emerald-50 p-6 rounded-lg">
                <h3 className="font-semibold text-emerald-800 mb-3">Legal and Terms Inquiries</h3>
                <div className="space-y-2 text-emerald-700">
                  <p>
                    <strong>Email:</strong> info@aves.bio
                  </p>
                  <p>
                    <strong>Phone:</strong> +1 (555) 123-AVES
                  </p>
                  <p className="text-sm mt-4">
                    We are committed to responding to all terms-related inquiries within 48 hours and providing clear,
                    helpful guidance in accordance with our B Corp values of transparency and stakeholder service.
                  </p>
                </div>
              </div>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
              <p>
                These terms are governed by the laws of British Columbia, Canada, and the Republic of Colombia,
                reflecting our bi-national operations. Any disputes will be resolved in accordance with the jurisdiction
                most appropriate to the specific circumstances and guest location.
              </p>
            </section>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                  <Link href="/shopping?preset=adventure" className="hover:text-white transition-colors">
                    🍃 AVES Adventure
                  </Link>
                </li>
                <li>
                  <Link href="/shopping?preset=vision" className="hover:text-white transition-colors">
                    🪶 AVES Vision
                  </Link>
                </li>
                <li>
                  <Link href="/shopping?preset=elevate" className="hover:text-white transition-colors">
                    🌼 AVES Elevate
                  </Link>
                </li>
                <li>
                  <Link href="/shopping?preset=souls" className="hover:text-white transition-colors">
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
              <Link href="/terms" className="hover:text-white transition-colors text-emerald-400">
                📋 Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                🍪 Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
