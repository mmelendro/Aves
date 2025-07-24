import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { ContactFormSection } from "@/components/contact-form-section"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader currentPage="/contact" />

      {/* Redesigned Hero Section with Text and Badges */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-6">
              🌿 Expert Birding Consultations
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Contact Our
              <span className="text-emerald-600 block">Birding Experts</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with our certified ornithologists for personalized consultation and expert birding guidance.
            </p>

            {/* Core Value Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 px-4 py-2 text-sm font-medium">
                🏆 Expert Consultation
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-4 py-2 text-sm font-medium">
                👥 Personalized Service
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 px-4 py-2 text-sm font-medium">
                🌍 Local Knowledge
              </Badge>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200 px-4 py-2 text-sm font-medium">
                🌿 Sustainable Tourism
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section with FAQ */}
      <ContactFormSection showTitle={true} showFAQ={true} variant="contact-page" className="bg-white" />

      {/* Get in Touch - Contact Information Cards */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Multiple ways to reach our expert team for personalized birding consultation
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Email Contact */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-emerald-50 to-green-50">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Email Us</h3>
                  <p className="text-gray-600 mb-4">Get detailed responses from our ornithology experts</p>
                  <a
                    href="mailto:info@aves.bio"
                    className="text-emerald-600 hover:text-emerald-700 font-semibold text-lg"
                  >
                    info@aves.bio
                  </a>
                </CardContent>
              </Card>

              {/* Office Locations */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Our Offices</h3>
                  <div className="space-y-3 text-gray-600">
                    <div>
                      <div className="font-semibold text-gray-900">Vancouver, Canada</div>
                      <div className="text-sm">North American Operations</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Bogotá, Colombia</div>
                      <div className="text-sm">Field Operations Center</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-purple-50 to-pink-50">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Business Hours</h3>
                  <div className="space-y-2 text-gray-600">
                    <div>
                      <div className="font-semibold text-gray-900">Monday - Friday</div>
                      <div className="text-sm">9:00 AM - 6:00 PM PST</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Weekend</div>
                      <div className="text-sm">Emergency support available</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
