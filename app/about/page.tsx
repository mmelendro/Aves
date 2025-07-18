"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Users,
  Globe,
  Award,
  ArrowRight,
  Leaf,
  Eye,
  Target,
  CheckCircle,
  MapPin,
  Calendar,
  Star,
} from "lucide-react"
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
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4">🌿 About AVES</Badge>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">Connecting Hearts to Colombia's Avian Wonders</h1>
              <p className="text-xl text-gray-600 mb-8">
                We're more than a birding company—we're conservation partners, cultural bridges, and guardians of
                Colombia's extraordinary biodiversity. Every journey creates lasting impact for birds, communities, and
                the travelers who join our mission.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shopping">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Start Your Journey
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/conservation">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent"
                  >
                    Our Conservation Impact
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl relative">
                <Image
                  src="/images/vermillion-flycatcher.jpg"
                  alt="Vermilion Cardinal showcasing Colombia's vibrant bird diversity"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Photo Attribution */}
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
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-xl text-gray-600">Born from passion, driven by purpose</p>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="text-xl mb-6">
                AVES was founded on a simple yet powerful belief: that experiencing Colombia's incredible bird diversity
                can transform both travelers and the landscapes they visit. What started as a passion project has
                evolved into a conservation-focused enterprise that bridges the gap between world-class birding
                experiences and meaningful environmental impact.
              </p>

              <p className="mb-6">
                Colombia is home to over 1,900 bird species—more than any other country on Earth. Yet many of these
                species face unprecedented threats from habitat loss, climate change, and human encroachment. We believe
                that sustainable birding tourism can be a powerful force for conservation, creating economic incentives
                for habitat protection while fostering deep connections between people and nature.
              </p>

              <p className="mb-6">
                Our approach is holistic: we work directly with local communities, employ indigenous and local guides,
                support conservation research, and ensure that every tour contributes to long-term habitat protection.
                We're not just showing you birds—we're inviting you to become part of their conservation story.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mission & Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every decision we make is guided by our commitment to conservation, community, and transformative
              experiences
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
                  Every tour directly funds habitat protection and restoration projects. We're committed to leaving
                  ecosystems healthier than we found them.
                </p>
                <div className="flex items-center justify-center text-emerald-600 group-hover:text-emerald-700 opacity-0 group-hover:opacity-100 transition-all">
                  <span className="text-sm font-medium mr-1">Learn more</span>
                  <ArrowRight className="w-4 h-4" />
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
                  Our team of local and international guides brings decades of experience and deep cultural knowledge to
                  every expedition.
                </p>
                <div className="flex items-center justify-center text-emerald-600 group-hover:text-emerald-700 opacity-0 group-hover:opacity-100 transition-all">
                  <span className="text-sm font-medium mr-1">Meet our team</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Card>
            </Link>

            <Link href="/tours" className="block group">
              <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="w-16 h-16 bg-emerald-100 group-hover:bg-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                  <Eye className="w-8 h-8 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 mb-4 transition-colors">
                  Transformative Experiences
                </h3>
                <p className="text-gray-600 mb-4">
                  We create life-changing encounters with nature that inspire lasting connections to conservation and
                  Colombian culture.
                </p>
                <div className="flex items-center justify-center text-emerald-600 group-hover:text-emerald-700 opacity-0 group-hover:opacity-100 transition-all">
                  <span className="text-sm font-medium mr-1">Explore tours</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Sets Us Apart</h2>
            <p className="text-xl text-gray-600">The AVES difference in every detail</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <Target className="w-6 h-6 text-emerald-600 mr-3" />
                <h3 className="text-lg font-bold text-gray-900">Small Group Focus</h3>
              </div>
              <p className="text-gray-600">
                Maximum 4 participants per tour ensures personalized attention and minimal environmental impact.
              </p>
            </Card>

            <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-emerald-600 mr-3" />
                <h3 className="text-lg font-bold text-gray-900">Exclusive Access</h3>
              </div>
              <p className="text-gray-600">
                Private reserves and community-managed areas offer unique birding opportunities unavailable elsewhere.
              </p>
            </Card>

            <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <Calendar className="w-6 h-6 text-emerald-600 mr-3" />
                <h3 className="text-lg font-bold text-gray-900">Year-Round Excellence</h3>
              </div>
              <p className="text-gray-600">
                Colombia's equatorial location means exceptional birding opportunities throughout the year.
              </p>
            </Card>

            <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <Heart className="w-6 h-6 text-emerald-600 mr-3" />
                <h3 className="text-lg font-bold text-gray-900">Cultural Immersion</h3>
              </div>
              <p className="text-gray-600">
                Deep connections with indigenous communities and local traditions enrich every experience.
              </p>
            </Card>

            <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <Award className="w-6 h-6 text-emerald-600 mr-3" />
                <h3 className="text-lg font-bold text-gray-900">Conservation Impact</h3>
              </div>
              <p className="text-gray-600">
                Transparent reporting on how your tour directly contributes to habitat protection and research.
              </p>
            </Card>

            <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <Star className="w-6 h-6 text-emerald-600 mr-3" />
                <h3 className="text-lg font-bold text-gray-900">Lifetime Support</h3>
              </div>
              <p className="text-gray-600">
                Post-tour resources, species lists, and ongoing conservation updates keep the connection alive.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-20 bg-emerald-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Commitment to You</h2>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              When you choose AVES, you're not just booking a tour—you're joining a conservation movement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Ethical Practices</h3>
              <p className="text-emerald-100 text-sm">
                Fair wages, community partnerships, and transparent operations in everything we do.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Global Impact</h3>
              <p className="text-emerald-100 text-sm">
                Local actions with global significance for bird conservation and climate resilience.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Personal Growth</h3>
              <p className="text-emerald-100 text-sm">
                Transformative experiences that deepen your connection to nature and conservation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Lifelong Community</h3>
              <p className="text-emerald-100 text-sm">
                Join a network of conservation-minded travelers making a difference worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join us in protecting Colombia's incredible biodiversity while experiencing the adventure of a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shopping">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8 py-4">
                Book Your Conservation Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-4 bg-transparent"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
