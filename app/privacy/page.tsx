"use client"

import { useState, useEffect } from "react"
import { Users } from "lucide-react"
import Link from "next/link"
import OptimizedImage from "@/components/optimized-image"
import { NavigationHeader } from "@/components/navigation-header"

export default function PrivacyPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <NavigationHeader currentPage="/privacy" />

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal
              information.
            </p>
            <div className="text-sm text-gray-500 mt-4">
              Last updated: January 2025 | Effective Date: January 1, 2025
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="mb-4">
                AVES Colombia ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, and disclose your personal information when you use our website, booking
                platform, and tour experiences.
              </p>
              <p>
                This policy applies to all visitors, users, and others who access or use our services, whether as
                individuals, groups, or organizations.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  <strong>Contact Information:</strong> Name, email address, phone number, and mailing address
                </li>
                <li>
                  <strong>Booking Information:</strong> Tour preferences, travel dates, and payment details
                </li>
                <li>
                  <strong>Demographic Information:</strong> Age, gender, and country of residence
                </li>
                <li>
                  <strong>Health Information:</strong> Dietary restrictions, allergies, and medical conditions (if
                  disclosed)
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Non-Personal Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Log Data:</strong> IP address, browser type, referring website, pages visited, and timestamps
                </li>
                <li>
                  <strong>Device Information:</strong> Device type, operating system, and hardware settings
                </li>
                <li>
                  <strong>Cookies and Tracking Technologies:</strong> Data collected through cookies, web beacons, and
                  similar technologies
                </li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To process bookings and provide tour services</li>
                <li>To communicate with you about your tours and travel arrangements</li>
                <li>To personalize your experience and recommend relevant tours</li>
                <li>To improve our website and services</li>
                <li>To send you marketing communications (with your consent)</li>
                <li>To comply with legal and regulatory requirements</li>
              </ul>
            </section>

            {/* How We Share Your Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How We Share Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>With our tour guides and local partners to provide tour services</li>
                <li>With our payment processors to process payments</li>
                <li>With our marketing partners to send you marketing communications (with your consent)</li>
                <li>With our legal and regulatory authorities to comply with legal requirements</li>
                <li>
                  With our service providers who assist us with website hosting, data analysis, and customer service
                </li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p>
                We take reasonable measures to protect your personal information from unauthorized access, use, or
                disclosure. These measures include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Using encryption to protect sensitive data</li>
                <li>Implementing access controls to limit who can access your information</li>
                <li>Regularly monitoring our systems for security vulnerabilities</li>
                <li>Training our employees on data security best practices</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
              <p>You have the following rights regarding your personal information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The right to access your personal information</li>
                <li>The right to correct your personal information</li>
                <li>The right to delete your personal information</li>
                <li>The right to object to the processing of your personal information</li>
                <li>The right to withdraw your consent to the processing of your personal information</li>
              </ul>
              <p>To exercise these rights, please contact us at info@aves.com.</p>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
              <p>
                We will retain your personal information for as long as necessary to provide you with our services,
                comply with legal requirements, resolve disputes, and enforce our agreements.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
              <p>
                Our services are not directed to children under the age of 16, and we do not knowingly collect personal
                information from children under the age of 16. If you are a parent or guardian and believe that your
                child has provided us with personal information, please contact us at info@aves.com.
              </p>
            </section>

            {/* Changes to This Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by
                posting the new Privacy Policy on our website. You are advised to review this Privacy Policy
                periodically for any changes.
              </p>
            </section>

            {/* Contact Us */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email: info@aves.com</li>
                <li>Phone: +1 (555) 123-AVES</li>
                <li>Address: 123 Main Street, Vancouver, BC, Canada</li>
              </ul>
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
                  <Link href="/tours/adventure" className="hover:text-white transition-colors">
                    AVES Adventure
                  </Link>
                </li>
                <li>
                  <Link href="/tours/vision" className="hover:text-white transition-colors">
                    AVES Vision
                  </Link>
                </li>
                <li>
                  <Link href="/tours/elevate" className="hover:text-white transition-colors">
                    AVES Elevate
                  </Link>
                </li>
                <li>
                  <Link href="/tours/souls" className="hover:text-white transition-colors">
                    AVES Souls
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About AVES
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
                    Conservation
                  </Link>
                </li>
                <li>
                  <Link href="/about/b-corp" className="hover:text-white transition-colors flex items-center group">
                    <span className="mr-1 text-xs font-bold bg-white text-gray-900 px-1 rounded">B</span>B Corp Journey
                    <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">↑</span>
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Bird Guide
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Travel Tips
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 AVES. All rights reserved.</p>
            <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
