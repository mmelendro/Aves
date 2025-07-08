"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Map } from "lucide-react"
import Link from "next/link"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import ContactForm from "@/components/contact-form"
import { useSearchParams } from "next/navigation"

export default function ContactPage() {
  const searchParams = useSearchParams()

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <NavigationHeader currentPage="/contact" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4">
              🌿 Expert Birding Consultations
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Plan Your Colombian
              <span className="text-emerald-600 block">Birding Adventure</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with our expert ornithologists to design your perfect Colombian birding expedition. Share your
              interests and we'll create a personalized recommendation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-xl border-0">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  Tell Us About Your Birding Interests
                </CardTitle>
                <p className="text-gray-600 text-lg">
                  The more details you provide, the better we can customize your Colombian birding experience.
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Contact Form */}
                  <ContactForm variant="contact" />

                  {/* Contact Information Sidebar */}
                  <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Why Choose AVES?</h3>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="text-emerald-600 mt-1 flex-shrink-0 w-5 h-5" />
                        <div>
                          <div className="font-medium text-gray-900">Expert Ornithologist Guides</div>
                          <div className="text-gray-600 text-sm">
                            Certified local experts with deep knowledge of Colombian avifauna
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <CheckCircle className="text-emerald-600 mt-1 flex-shrink-0 w-5 h-5" />
                        <div>
                          <div className="font-medium text-gray-900">Small Group Expeditions</div>
                          <div className="text-gray-600 text-sm">
                            Maximum 4 guests per tour for personalized attention
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <CheckCircle className="text-emerald-600 mt-1 flex-shrink-0 w-5 h-5" />
                        <div>
                          <div className="font-medium text-gray-900">B Corp Certified</div>
                          <div className="text-gray-600 text-sm">
                            100% carbon neutral with verified conservation impact
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <CheckCircle className="text-emerald-600 mt-1 flex-shrink-0 w-5 h-5" />
                        <div>
                          <div className="font-medium text-gray-900">Exclusive Access</div>
                          <div className="text-gray-600 text-sm">
                            Private reserves and research stations unavailable to others
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Links */}
                    <div className="border-t border-emerald-200 pt-4 space-y-3">
                      <h4 className="font-medium text-gray-900">Quick Links</h4>
                      <div className="space-y-2">
                        <Link
                          href="/tours"
                          className="flex items-center text-emerald-600 hover:text-emerald-700 hover:underline text-sm"
                        >
                          <ArrowRight className="mr-2 w-3 h-3" />
                          Browse All Tours
                        </Link>
                        <Link
                          href="/aves-explorer"
                          className="flex items-center text-emerald-600 hover:text-emerald-700 hover:underline text-sm"
                        >
                          <Map className="mr-2 w-3 h-3" />
                          Explore Interactive Map
                        </Link>
                        <Link
                          href="/endemic-birds"
                          className="flex items-center text-emerald-600 hover:text-emerald-700 hover:underline text-sm"
                        >
                          <ArrowRight className="mr-2 w-3 h-3" />
                          Endemic Birds Guide
                        </Link>
                        <Link
                          href="/travel-tips"
                          className="flex items-center text-emerald-600 hover:text-emerald-700 hover:underline text-sm"
                        >
                          <ArrowRight className="mr-2 w-3 h-3" />
                          Travel Tips & Preparation
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 text-lg">Common questions about planning your Colombian birding adventure</p>
            </div>

            <div className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    How far in advance should I book my tour?
                  </h3>
                  <p className="text-gray-600">
                    We recommend booking 3-6 months in advance, especially for peak birding seasons (December-March and
                    July-August). Our small group sizes (maximum 4 guests) mean tours fill up quickly.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">What's included in your tour packages?</h3>
                  <p className="text-gray-600">
                    All tours include expert ornithologist guides, transportation, accommodation, meals, park entrance
                    fees, and specialized birding equipment. International flights and personal items are not included.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Do I need birding experience to join a tour?
                  </h3>
                  <p className="text-gray-600">
                    Not at all! We welcome birders of all experience levels, from complete beginners to expert
                    ornithologists. Our guides adapt the experience to match your skill level and interests.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    What makes AVES different from other tour operators?
                  </h3>
                  <p className="text-gray-600">
                    We're B Corp certified, operate 100% carbon-neutral tours, maintain small group sizes (max 4
                    guests), and provide access to private reserves unavailable to other operators. Our guides are
                    certified ornithologists, not just general nature guides.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
