import type { Metadata } from "next"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import ContactForm from "@/components/contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Phone, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us | AVES - Colombian Birding Tours",
  description:
    "Get in touch with AVES for your Colombian birding adventure. Expert ornithologist guides, small groups, and personalized service.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader currentPage="/contact" />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-50 to-blue-50 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Plan Your Colombian Birding Adventure
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Ready to discover Colombia's incredible avifauna? Get in touch with our expert team and we'll create a
                personalized birding experience just for you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form and Info Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Contact Form */}
                <div className="lg:col-span-2">
                  <Card className="shadow-xl border-0">
                    <CardContent className="p-8">
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Send Us Your Inquiry</h2>
                        <p className="text-gray-600">
                          Fill out the form below and we'll get back to you within 24 hours with personalized
                          recommendations for your Colombian birding adventure.
                        </p>
                      </div>

                      <ContactForm variant="contact" />
                    </CardContent>
                  </Card>
                </div>

                {/* Contact Information */}
                <div className="space-y-8">
                  {/* Direct Contact */}
                  <Card className="shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>

                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Mail className="text-emerald-600 mt-1 flex-shrink-0 w-5 h-5" />
                          <div>
                            <div className="font-medium text-gray-900">Email</div>
                            <a
                              href="mailto:info@aves.bio"
                              className="text-emerald-600 hover:text-emerald-700 hover:underline"
                            >
                              info@aves.bio
                            </a>
                            <div className="text-gray-600 text-sm">24-hour response guarantee</div>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <MapPin className="text-emerald-600 mt-1 flex-shrink-0 w-5 h-5" />
                          <div>
                            <div className="font-medium text-gray-900">Based in</div>
                            <div className="text-gray-700">Vancouver, Canada</div>
                            <div className="text-gray-700">Bogotá, Colombia</div>
                            <div className="text-gray-600 text-sm">Operating throughout Colombia</div>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Clock className="text-emerald-600 mt-1 flex-shrink-0 w-5 h-5" />
                          <div>
                            <div className="font-medium text-gray-900">Response Time</div>
                            <div className="text-gray-700">Within 24 hours</div>
                            <div className="text-gray-600 text-sm">Usually much faster!</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Why Choose AVES */}
                  <Card className="shadow-lg bg-gradient-to-br from-emerald-50 to-blue-50">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose AVES?</h3>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                          <span className="text-sm text-gray-700">Expert ornithologist guides</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                          <span className="text-sm text-gray-700">Maximum 4 guests per tour</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                          <span className="text-sm text-gray-700">78+ endemic species access</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                          <span className="text-sm text-gray-700">100% carbon neutral tours</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                          <span className="text-sm text-gray-700">B Corp certified company</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Emergency Contact */}
                  <Card className="shadow-lg border-amber-200 bg-amber-50">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold text-amber-800 mb-3">Already on a Tour?</h3>
                      <p className="text-amber-700 text-sm mb-3">
                        If you're currently on a tour and need immediate assistance, contact your guide directly or use
                        our emergency line.
                      </p>
                      <div className="flex items-center space-x-2">
                        <Phone className="text-amber-600 w-4 h-4" />
                        <span className="text-amber-800 font-medium text-sm">Emergency: +57 XXX XXX XXXX</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
