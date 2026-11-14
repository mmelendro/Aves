/**
 * Colombia contact-page layout. Introductory copy and contact context are here;
 * fields, validation feedback and request submission live in ContactFormSection.
 * The same form is also included on the Colombia homepage.
 */
import type { Metadata } from "next"
import { canonicalUrl } from "@/lib/site-path"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { ContactFormSection } from "@/components/contact-form-section"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ContextualEnquiryLink } from "@/components/contextual-enquiry-link"
import { Mail, MapPin, Clock } from "lucide-react"

export const metadata: Metadata = { title: "Plan My Trip", alternates: { canonical: canonicalUrl("/contact") } }

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader currentPage="/contact" />
      <main id="main-content" tabIndex={-1}>

      {/* Redesigned Hero Section with Text and Badges */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-6">
              Colombia Trip Planning
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Contact Martín
              <span className="text-emerald-600 block">Your Colombia Trip</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Tell us what you would love to see. We will help shape a personal birding itinerary in Colombia.
            </p>

            {/* Core Value Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 px-4 py-2 text-sm font-medium">
                Personal Planning
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-4 py-2 text-sm font-medium">
                Your Pace
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 px-4 py-2 text-sm font-medium">
                Birds and Landscapes
              </Badge>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200 px-4 py-2 text-sm font-medium">
                Thoughtful Travel
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section with FAQ */}
      <ContactFormSection showTitle={true} showFAQ={true} className="bg-white" />

      {/* Get in Touch - Contact Information Cards */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Tell Martín about your interests, travel dates and ideas for Colombia.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Email Contact */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-emerald-50 to-green-50">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Send a Message</h3>
                  <p className="text-gray-600 mb-4">Contact AVES about your inquiry or proposal</p>
                  <ContextualEnquiryLink
                    country="colombia"
                    className="text-emerald-600 hover:text-emerald-700 font-semibold text-lg"
                  >
                    Open the contact form
                  </ContextualEnquiryLink>
                </CardContent>
              </Card>

              {/* Office Locations */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Colombia Trip Planning</h3>
                  <div className="space-y-3 text-gray-600">
                    <div>
                      <div className="font-semibold text-gray-900">Your destination</div>
                      <div className="text-sm">Explore Colombia’s birds, landscapes and local culture.</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Your journey</div>
                      <div className="text-sm">Discuss your route, pace and preferences before confirming arrangements.</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Replies and Trip Support */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-purple-50 to-pink-50">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Replies and Trip Support</h3>
                  <div className="space-y-2 text-gray-600">
                    <div>
                      <div className="font-semibold text-gray-900">Preferred contact time</div>
                      <div className="text-sm">Include your time zone and when you are available.</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Agreed arrangements</div>
                      <div className="text-sm">Response and trip-support arrangements are agreed individually before you book.</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  )
}
