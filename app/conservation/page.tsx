"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Users, Leaf, Globe, TrendingUp, AlertTriangle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { BeforeAfterSlider } from "@/components/before-after-slider"

export default function ConservationPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <NavigationHeader currentPage="/conservation" />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4">🌱 Conservation Impact</Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Travel That Makes a Difference</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every AVES tour directly supports habitat conservation and local communities. We're committed to becoming
            the first B Corp certified birding company in Colombia.
          </p>
        </div>
      </section>

      {/* Habitat Conservation Impact */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-emerald-600 mr-2" />
              <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Habitat Conservation</Badge>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The Critical Need for Bird Habitat Protection</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Witness how habitat degradation forces birds to adapt in harmful ways, and discover the transformative
              power of conservation efforts in restoring natural ecosystems.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                See the life-changing difference your conservation support makes. Drag the slider to witness how
                protecting breeding habitats saves bird families from toxic plastic contamination and preserves healthy
                ecosystems for generations.
              </p>
            </div>

            <BeforeAfterSlider
              beforeImage="/images/natural-nest.jpg"
              afterImage="/images/plastic-nest.jpg"
              beforeAlt="Natural bird nest made entirely with organic materials in protected habitat"
              afterAlt="Bird nest constructed with plastic pollution materials showing environmental impact on wildlife"
              beforeLabel="Protected Habitat"
              afterLabel="Polluted Habitat"
              className="mb-8"
              height={400}
              width={600}
            />

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <Card className="p-6 border-red-200 bg-red-50">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                  <h3 className="text-lg font-bold text-red-800">After Conservation: Protected Habitat</h3>
                </div>
                <ul className="space-y-3 text-red-700 text-sm">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Birds build nests with natural materials like twigs, grass, and organic fibers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Clean environments support healthy reproduction and stronger chick development</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Natural food chains remain uncontaminated, supporting biodiversity recovery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Thriving bird populations indicate healthy ecosystems that benefit all wildlife</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 border-emerald-200 bg-emerald-50">
                <div className="flex items-center mb-4">
                  <Leaf className="w-6 h-6 text-emerald-600 mr-3" />
                  <h3 className="text-lg font-bold text-emerald-800">Before Degradation: Protected Habitat</h3>
                </div>
                <ul className="space-y-3 text-emerald-700 text-sm">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>
                      Birds forced to incorporate plastic waste into nest construction due to habitat pollution
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Plastic materials break down into microplastics, entering the food chain through chicks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Toxic chemicals from plastics affect bird health, reproduction, and ecosystem balance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Contamination spreads through predator-prey relationships, affecting entire ecosystems</span>
                  </li>
                </ul>
              </Card>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-red-50 via-yellow-50 to-emerald-50 rounded-xl border-l-4 border-emerald-500">
              <div className="text-center">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Breaking the Pollution Cycle</h4>
                <p className="text-gray-800 text-sm leading-relaxed">
                  When birds use plastic in their nests, microplastics enter their chicks' systems from day one. These
                  toxins accumulate through the food chain, affecting predators and the entire ecosystem. Conservation
                  efforts create pollution-free zones where birds can nest naturally, breaking this harmful cycle and
                  restoring ecological balance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conservation Pillars */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Conservation Pillars</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every aspect of our operations is designed to create positive environmental and social impact
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Carbon Neutral Tours</h3>
              <p className="text-gray-600">
                All tours operate with full carbon neutrality, with offsets reinvested in critical bird habitat
                preservation projects.
              </p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Community Support</h3>
              <p className="text-gray-600">
                We partner with local communities, providing fair employment and supporting community-managed
                conservation initiatives.
              </p>
              <div className="mt-4">
                <Link href="/about/partners">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 p-0 h-auto font-medium text-sm transition-colors"
                  >
                    Discover our community partners
                    <ArrowRight className="ml-1 w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Habitat Protection</h3>
              <p className="text-gray-600">
                10% of net profits fund our Conservation Endowment Trust, dedicated to permanent habitat restoration and
                protection.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Conservation Metrics */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact by the Numbers</h2>
            <p className="text-xl text-gray-600">Measurable conservation outcomes from our tours</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl font-bold text-emerald-600 mb-2">100%</div>
              <div className="text-sm text-gray-600">Carbon Neutral Tours</div>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl font-bold text-emerald-600 mb-2">10%</div>
              <div className="text-sm text-gray-600">Profits to Conservation</div>
            </Card>

            <Link href="/team#guides" className="block">
              <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer hover:bg-gray-50">
                <div className="text-3xl font-bold text-emerald-600 mb-2">10+</div>
                <div className="text-sm text-gray-600">Local Guides Employed</div>
              </Card>
            </Link>

            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl font-bold text-emerald-600 mb-2">5</div>
              <div className="text-sm text-gray-600">Conservation Projects</div>
            </Card>
          </div>
        </div>
      </section>

      {/* B Corp Journey */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Pursuing B Corp Certification</h3>
                <p className="text-gray-600 mb-6">
                  AVES is committed to meeting the highest standards of social and environmental responsibility. We're
                  working toward B Corp certification, joining BirdsChile as only the second birding-focused B Corp
                  globally.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
                    <span className="text-gray-700">Transparent impact reporting</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
                    <span className="text-gray-700">Stakeholder governance model</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
                    <span className="text-gray-700">Environmental accountability</span>
                  </div>
                </div>
                <div className="mt-6">
                  <Link href="/about/b-corp">
                    <Button
                      variant="outline"
                      className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                    >
                      Learn About Our B Corp Journey
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="aspect-square rounded-xl overflow-hidden relative">
                <Image
                  src="/images/masked-trogon-male.jpg"
                  alt="Masked Trogon representing cloud forest conservation efforts"
                  width={400}
                  height={400}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Join Our Conservation Mission</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Every journey with AVES contributes directly to protecting Colombia's incredible biodiversity for future
            generations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shopping">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-4">
                Book Your Conservation Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/about/b-corp">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-emerald-600 text-lg px-8 py-4"
              >
                Learn More About Our Impact
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
