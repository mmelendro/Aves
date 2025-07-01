"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Leaf, Globe, Heart, Award, Target } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <NavigationHeader currentPage="/about" />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4">🌿 About AVES</Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Connecting People with Nature</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're passionate about creating transformative birding experiences while supporting conservation and local
            communities across Colombia's incredible bioregions.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/3] relative overflow-hidden rounded-xl">
                <Image
                  src="/images/cardinal-guajiro.jpg"
                  alt="Vermilion Cardinal (Cardinalis phoeniceus) - Endemic to Colombia's Caribbean coast"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Photo Attribution for Vermilion Cardinal */}
                <div className="absolute bottom-3 right-3 z-50">
                  <div className="bg-white/25 backdrop-blur-sm hover:bg-white/35 text-white border-0 w-10 h-10 p-0 rounded-md flex items-center justify-center transition-colors relative group">
                    <span className="text-lg">📷</span>
                    <div className="absolute bottom-full right-0 mb-3 px-4 py-3 bg-black/95 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[70] shadow-xl whitespace-nowrap">
                      <div className="text-center leading-relaxed">
                        <div className="font-medium">Photo © Royann Petrell</div>
                        <div className="text-emerald-300 text-xs mt-1">✨ Early Client</div>
                      </div>
                      <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/95"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                AVES was born from a simple belief: that experiencing Colombia's incredible biodiversity should benefit
                both travelers and the communities that protect these natural treasures.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded by passionate birders and conservationists, we've built relationships with local guides and
                communities across Colombia's 12 unique bioregions. Every tour we offer directly supports habitat
                conservation and provides sustainable income to local families.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We're working toward B Corp certification, joining the global movement of businesses that balance profit
                with purpose. Our goal is simple: to become the most responsible birding company in Colombia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/team">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Meet Our Team
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/about/b-corp">
                  <Button
                    variant="outline"
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent"
                  >
                    Our B Corp Journey
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mission & Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything we do is guided by our commitment to conservation, community, and creating unforgettable
              experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/conservation" className="block group">
              <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="w-16 h-16 bg-emerald-100 group-hover:bg-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                  <Leaf className="w-8 h-8 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 mb-4 transition-colors">
                  Conservation First
                </h3>
                <p className="text-gray-600 mb-4">
                  10% of our profits fund habitat protection. Every tour contributes directly to preserving Colombia's
                  incredible biodiversity for future generations.
                </p>
                <div className="flex items-center justify-center text-emerald-600 group-hover:text-emerald-700 transition-colors opacity-0 group-hover:opacity-100">
                  <span className="text-sm font-medium">Learn about our conservation impact</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </Card>
            </Link>

            <Link href="/team" className="block group">
              <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="w-16 h-16 bg-emerald-100 group-hover:bg-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                  <Users className="w-8 h-8 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 mb-4 transition-colors">
                  Expert Guidance
                </h3>
                <p className="text-gray-600 mb-4">
                  Our local guides are passionate experts who know every bird call, migration pattern, and hidden
                  hotspot in their regions.
                </p>
                <div className="flex items-center justify-center text-emerald-600 group-hover:text-emerald-700 transition-colors opacity-0 group-hover:opacity-100">
                  <span className="text-sm font-medium">Meet our expert guides</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </Card>
            </Link>

            <Link href="/tours" className="block group">
              <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="w-16 h-16 bg-emerald-100 group-hover:bg-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                  <Heart className="w-8 h-8 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 mb-4 transition-colors">
                  Transformative Experiences
                </h3>
                <p className="text-gray-600 mb-4">
                  We create life-changing moments that connect you deeply with nature and leave you with memories that
                  last forever.
                </p>
                <div className="flex items-center justify-center text-emerald-600 group-hover:text-emerald-700 transition-colors opacity-0 group-hover:opacity-100">
                  <span className="text-sm font-medium">Explore our tours</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Approach</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe responsible tourism can be a powerful force for conservation and community development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 border-0 shadow-lg">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Local Partnerships</h3>
              <p className="text-gray-600 text-sm">
                We work exclusively with local guides and communities, ensuring tourism benefits reach the people who
                protect these ecosystems.
              </p>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Small Groups</h3>
              <p className="text-gray-600 text-sm">
                Our intimate group sizes (max 8 people) minimize environmental impact while maximizing your birding
                success and personal attention.
              </p>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Quality Focus</h3>
              <p className="text-gray-600 text-sm">
                We prioritize quality over quantity, carefully curating each experience to showcase Colombia's
                biodiversity at its finest.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet the Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our passionate team of birders, conservationists, and local experts make every AVES experience
              unforgettable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Expert Guides</h3>
              <p className="text-gray-600 text-sm">Local birding experts with decades of experience in their regions</p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Conservationists</h3>
              <p className="text-gray-600 text-sm">
                Dedicated professionals working to protect Colombia's biodiversity
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Community Leaders</h3>
              <p className="text-gray-600 text-sm">Local partners committed to sustainable tourism development</p>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/team">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Meet Our Full Team
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Explore Colombia?</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join us for an unforgettable birding adventure that supports conservation and local communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shopping">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-4">
                Book Your Adventure
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-emerald-600 text-lg px-8 py-4 bg-transparent"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
