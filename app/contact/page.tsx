"use client"

import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { ContactFormSection } from "@/components/contact-form-section"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader currentPage="/contact" />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Contact AVES Colombia</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to discover Colombia's incredible bird diversity? Get in touch with our expert team to plan your
            perfect birding adventure.
          </p>
        </div>
      </section>

      {/* Contact Form Section with FAQ */}
      <ContactFormSection showTitle={false} showFAQ={true} variant="contact-page" className="py-0 bg-white" />

      <Footer />
    </div>
  )
}
