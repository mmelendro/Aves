"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Award, Users, Heart, Shield, Leaf, Globe, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <NavigationHeader currentPage="/about" />

      {/* Hero Section */}
      <section
        className={`relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                  🌿 B Corp Certified • Conservation-First
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  About
                  <span className="text-emerald-600 block">AVES</span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
                  We're passionate conservationists and expert birders dedicated to protecting Colombia's incredible
                  avian diversity through sustainable, transformative travel experiences.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/team">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-4">
                    Meet Our Team
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/about/b-corp">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-4 bg-transparent"
                  >
                    Our B Corp Journey
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/martin-melendro.jpg"
                  alt="Martin Melendro, AVES Founder, in the field with binoculars"
                  width={480}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Conservation First</div>
                    <div className="text-sm text-gray-600">Every tour protects habitat</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full opacity-20 -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-100 rounded-full opacity-20 translate-y-24 -translate-x-24"></div>
      </section>

      {/* Mission & Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mission & Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe that exceptional birding experiences and meaningful conservation go hand in hand.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Conservation First</h3>
              <p className="text-gray-600 leading-relaxed">
                Every tour directly supports habitat protection, research, and local communities. We're B Corp certified
                with verified environmental and social impact.
              </p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Guidance</h3>
              <p className="text-gray-600 leading-relaxed">
                Our certified ornithologist guides are passionate educators who share deep knowledge of bird behavior,
                ecology, and conservation challenges.
              </p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Transformative Experiences</h3>
              <p className="text-gray-600 leading-relaxed">
                We create life-changing encounters with Colombia's incredible biodiversity, fostering deep connections
                between travelers and nature.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Conservation Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Measurable results from our commitment to conservation and community development.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">15,000+</div>
              <div className="text-gray-600">Hectares Protected</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Local Guides Trained</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">25</div>
              <div className="text-gray-600">Communities Supported</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">100%</div>
              <div className="text-gray-600">Carbon Neutral</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-0 shadow-lg">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Habitat Protection</h3>
                  <p className="text-gray-600">
                    We partner with local conservation organizations to protect critical bird habitats through direct
                    funding and land acquisition programs.
                  </p>
                </div>
              </div>
              <Link href="/conservation" className="inline-flex items-center text-green-600 hover:text-green-700">
                Learn More About Our Conservation Work
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Card>

            <Card className="p-8 border-0 shadow-lg">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Community Development</h3>
                  <p className="text-gray-600">
                    Our tours provide sustainable income for local communities while training the next generation of
                    conservation leaders and guides.
                  </p>
                </div>
              </div>
              <Link href="/about/partners" className="inline-flex items-center text-blue-600 hover:text-blue-700">
                Meet Our Community Partners
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* B Corp Certification */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden border-0 shadow-xl">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="bg-gradient-to-br from-emerald-600 to-blue-600 p-8 text-white flex flex-col justify-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">B Corp Certified</h3>
                  <p className="text-lg mb-6 text-white/90">
                    We're proud to be B Corp certified, meeting the highest standards of verified social and
                    environmental performance, public transparency, and legal accountability.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span>Environmental impact verified</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span>Community benefit measured</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span>Governance transparency</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Our B Corp Journey</h4>
                  <p className="text-gray-600 mb-6">
                    Achieving B Corp certification was a rigorous process that validated our commitment to using
                    business as a force for good. We scored in the top 10% of all B Corps globally for environmental
                    impact.
                  </p>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Overall B Impact Score</span>
                      <span className="font-bold text-emerald-600">94.2/200</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Environment Score</span>
                      <span className="font-bold text-green-600">45.8/200</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Community Score</span>
                      <span className="font-bold text-blue-600">38.1/200</span>
                    </div>
                  </div>
                  <Link href="/about/b-corp">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      Read Our B Corp Story
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Expert Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our passionate guides and conservationists bring decades of experience and deep local knowledge to every
              expedition.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-square rounded-full overflow-hidden mx-auto mb-4 w-32 h-32">
                <Image
                  src="/images/martin-melendro.jpg"
                  alt="Martin Melendro, AVES Founder & Lead Guide"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Martin Melendro</h3>
              <p className="text-emerald-600 font-medium mb-3">Founder & Lead Guide</p>
              <p className="text-gray-600 text-sm">
                Ornithologist with 15+ years experience. Expert in Colombian endemics and conservation photography.
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-square rounded-full overflow-hidden mx-auto mb-4 w-32 h-32">
                <Image
                  src="/images/dagoberto-rudas.png"
                  alt="Dagoberto Rudas, Senior Ornithologist Guide"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dagoberto Rudas</h3>
              <p className="text-blue-600 font-medium mb-3">Senior Ornithologist</p>
              <p className="text-gray-600 text-sm">
                Chocó specialist with unmatched knowledge of Pacific slope endemics and rainforest ecology.
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-square rounded-full overflow-hidden mx-auto mb-4 w-32 h-32">
                <Image
                  src="/images/nicolas-rozo.png"
                  alt="Nicolás Rozo, High-Altitude Specialist"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Nicolás Rozo</h3>
              <p className="text-purple-600 font-medium mb-3">High-Altitude Specialist</p>
              <p className="text-gray-600 text-sm">
                Páramo expert specializing in high-altitude endemics and Andean ecosystem conservation.
              </p>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/team">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-4">
                Meet Our Full Team
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Ready to Experience Colombia's Incredible Biodiversity?</h2>
            <p className="text-xl mb-8 text-white/90">
              Join us for a transformative birding adventure that supports conservation and creates lasting memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tours">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-4">
                  Explore Our Tours
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-emerald-600 text-lg px-8 py-4 bg-transparent"
                >
                  Plan Your Trip
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
