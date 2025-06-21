"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <NavigationHeader currentPage="/contact" />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4">Get in Touch</Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Contact AVES</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to plan your Colombian birding adventure? We'd love to hear from you and help create the perfect tour
            for your interests and schedule.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Let's Plan Your Adventure</h2>
              <p className="text-lg text-gray-600 mb-8">
                Whether you're interested in a specific tour, have questions about our conservation efforts, or want to
                discuss a custom itinerary, our team is here to help.
              </p>

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email</div>
                    <div className="text-gray-600">info@aves.com</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Phone</div>
                    <div className="text-gray-600">+1 (555) 123-AVES</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Based in</div>
                    <div className="text-gray-600">Vancouver, Canada & Bogotá, Colombia</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <Clock className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Response Time</div>
                    <div className="text-gray-600">Within 24 hours</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-emerald-50 rounded-lg">
                <h3 className="font-semibold text-emerald-800 mb-2">Prefer to Book Directly?</h3>
                <p className="text-emerald-700 mb-4">
                  Use our online booking system to build your custom Colombian birding adventure.
                </p>
                <Link href="/shopping">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Start Booking Your Journey
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <Card className="p-8 border-0 shadow-lg">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-2xl font-bold text-gray-900">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <Input placeholder="Your first name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <Input placeholder="Your last name" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <Input type="email" placeholder="your.email@example.com" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone (Optional)</label>
                    <Input placeholder="+1 (555) 123-4567" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Interested Tour Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500">
                      <option>Select a tour type</option>
                      <option>AVES Adventure</option>
                      <option>AVES Vision</option>
                      <option>AVES Elevate</option>
                      <option>AVES Souls</option>
                      <option>Custom Itinerary</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bioregions of Interest</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500">
                      <option>Select bioregion(s)</option>
                      <option>Quetzal Highlands (Western Andes)</option>
                      <option>Hummingbird Haven (Central Andes)</option>
                      <option>Páramo Paradise (Eastern Andes)</option>
                      <option>Wetland Wonders (Llanos)</option>
                      <option>Canopy Kingdom (Amazon)</option>
                      <option>Endemic Empire (Biogeographic Chocó)</option>
                      <option>Coastal Crown (Caribbean + Sierra Nevada)</option>
                      <option>Valley Voyager (Cauca Valley)</option>
                      <option>River Realm (Magdalena Valley)</option>
                      <option>Massif Majesty (Macizo Colombiano)</option>
                      <option>Multiple regions</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <Textarea
                      rows={4}
                      placeholder="Tell us about your birding interests, travel dates, group size, and any questions you have..."
                    />
                  </div>

                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use the centralized Footer component */}
      <Footer />
    </div>
  )
}
