"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Globe, Instagram, Menu, X, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function TeamPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/">
              <Image
                src="/images/aves-logo.png"
                alt="AVES Birdwatching Tours Logo"
                width={50}
                height={50}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/tours" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Tours
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-emerald-600 transition-colors">
              About
            </Link>
            <Link href="/team" className="text-emerald-600 font-semibold">
              Our Team
            </Link>
            <Link href="/#conservation" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Conservation
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Blog
            </Link>
            <Link href="/#contact" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Link href="/shopping">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Book Your Adventure</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              <Link
                href="/tours"
                className="block text-gray-700 hover:text-emerald-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Tours
              </Link>
              <Link
                href="/about"
                className="block text-gray-700 hover:text-emerald-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link href="/team" className="block text-emerald-600 font-semibold" onClick={() => setIsMenuOpen(false)}>
                Our Team
              </Link>
              <Link
                href="/#conservation"
                className="block text-gray-700 hover:text-emerald-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Conservation
              </Link>
              <Link
                href="/blog"
                className="block text-gray-700 hover:text-emerald-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/#contact"
                className="block text-gray-700 hover:text-emerald-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 mt-4">Book Your Adventure</Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Meet the passionate ornithologists, indigenous guides, and conservation experts who make AVES expeditions
            extraordinary. Our team combines scientific expertise with deep cultural knowledge and unwavering commitment
            to sustainable birding tourism.
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Martin Melendro - Founder & Lead Guide */}
          <div id="martin-melendro" className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Badge className="bg-emerald-100 text-emerald-800 mb-4">Founder & Lead Guide</Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Martin Melendro</h2>
                <p className="text-xl text-gray-600 mb-6">Founder of AVES Birdwatching Tours & Lead Expedition Guide</p>

                <div className="space-y-4 text-gray-700 mb-8">
                  <p>
                    Martin is AVES' founder and lead expedition guide, with over 15 years of experience exploring
                    Colombia's diverse ecosystems. A passionate birding guide and conservation advocate, he has
                    dedicated his career to showcasing Colombia's extraordinary avian diversity while building
                    respectful partnerships with indigenous communities.
                  </p>

                  <p>
                    Fluent in Spanish, English, and basic indigenous languages, Martin specializes in creating
                    transformative birding experiences that go beyond species lists. His approach emphasizes cultural
                    exchange, conservation education, and sustainable tourism practices that benefit local communities.
                  </p>

                  <p>
                    Martin holds a degree in Biology from Universidad Nacional de Colombia and has contributed to
                    numerous conservation projects throughout the Neotropics. His field work has focused on endemic
                    species conservation, habitat restoration, and the intersection of traditional ecological knowledge
                    with modern conservation science.
                  </p>

                  <p>
                    When not leading expeditions, Martin works closely with indigenous communities to develop
                    community-based tourism initiatives, supports local conservation projects, and mentors the next
                    generation of Colombian naturalist guides. His passion lies in connecting people with nature while
                    supporting indigenous land rights and biodiversity conservation.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Based in Bogotá, Colombia
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    15+ years experience
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    Spanish, English, Indigenous languages
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">Specializations:</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• High-altitude páramo birding</li>
                    <li>• Indigenous community partnerships</li>
                    <li>• Endemic species conservation</li>
                    <li>• Sustainable tourism development</li>
                    <li>• Bird photography and field research</li>
                  </ul>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="relative">
                  <Image
                    src="/images/martin-melendro.jpg"
                    alt="Martin Melendro - AVES Founder and Lead Ornithologist"
                    width={500}
                    height={600}
                    className="rounded-2xl shadow-2xl object-cover w-full"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-emerald-600 text-white p-4 rounded-lg shadow-lg">
                    <p className="font-semibold">1,200+ species</p>
                    <p className="text-sm opacity-90">documented in Colombia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Indigenous Guides Section */}
          <div className="border-t border-gray-200 pt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Indigenous Community Guides</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our indigenous partners bring generations of traditional ecological knowledge and deep cultural
                connections to the territories we explore together.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Yeferson Guale Epiayu */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-emerald-600">YE</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Yeferson Guale Epiayu</h3>
                  <p className="text-emerald-600 font-medium">Wayuu Community Guide</p>
                </div>

                <div className="space-y-4 text-gray-700 text-sm">
                  <p>
                    Yeferson represents the Wayuu community of Kalekalemana and serves as our primary guide in the
                    Sierra Nevada de Santa Marta. His deep knowledge of Cardinal Guajiro behavior and traditional
                    ecological calendars makes him invaluable for our Sierra Nevada expeditions.
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Expertise:</h4>
                    <ul className="space-y-1">
                      <li>• Wayuu traditional ecological knowledge</li>
                      <li>• Cardinal Guajiro specialist</li>
                      <li>• Weather pattern prediction</li>
                      <li>• Cultural interpretation</li>
                    </ul>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Instagram className="w-4 h-4 mr-2" />
                    <a
                      href="https://instagram.com/kalekalemana1921"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-emerald-600 transition-colors"
                    >
                      @kalekalemana1921
                    </a>
                  </div>
                </div>
              </div>

              {/* Dagoberto Rudas */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">DR</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Dagoberto Rudas</h3>
                  <p className="text-blue-600 font-medium">Tayrona Community Guide</p>
                </div>

                <div className="space-y-4 text-gray-700 text-sm">
                  <p>
                    Dagoberto brings extensive knowledge of the Tayrona region and specializes in cloud forest birding.
                    His expertise in locating Blue-billed Curassows and understanding Kogi forest protocols makes him
                    essential for our Sierra Nevada cloud forest expeditions.
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Expertise:</h4>
                    <ul className="space-y-1">
                      <li>• Cloud forest navigation</li>
                      <li>• Blue-billed Curassow specialist</li>
                      <li>• Kogi cultural protocols</li>
                      <li>• Forest ecology interpretation</li>
                    </ul>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Instagram className="w-4 h-4 mr-2" />
                    <a
                      href="https://instagram.com/dago_rdg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 transition-colors"
                    >
                      @dago_rdg
                    </a>
                  </div>
                </div>
              </div>

              {/* Carlos Moreno */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">CM</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Carlos Moreno</h3>
                  <p className="text-green-600 font-medium">Chocó Specialist Guide</p>
                </div>

                <div className="space-y-4 text-gray-700 text-sm">
                  <p>
                    Carlos has spent over two decades studying the Chocó's endemic birds and serves as our primary guide
                    for Pacific coast expeditions. His intimate knowledge of Chocó endemics and rainforest navigation
                    skills are unmatched in the region.
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Expertise:</h4>
                    <ul className="space-y-1">
                      <li>• Chocó endemic species</li>
                      <li>• Rainforest navigation</li>
                      <li>• Toucan behavior specialist</li>
                      <li>• Conservation research</li>
                    </ul>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Río Ñambí Reserve</span>
                  </div>
                </div>
              </div>

              {/* David - El Dorado */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">DE</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">David</h3>
                  <p className="text-purple-600 font-medium">El Dorado Cloud Forest Guide</p>
                </div>

                <div className="space-y-4 text-gray-700 text-sm">
                  <p>
                    David is our resident expert for El Dorado Reserve's cloud forest ecosystem. With over a decade of
                    experience in the Sierra Nevada's montane forests, he has an unmatched ability to locate the
                    region's most elusive endemic species in challenging weather conditions.
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Expertise:</h4>
                    <ul className="space-y-1">
                      <li>• Cloud forest endemic species</li>
                      <li>• Montane ecosystem navigation</li>
                      <li>• Weather pattern interpretation</li>
                      <li>• High-altitude birding techniques</li>
                    </ul>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>El Dorado Reserve</span>
                  </div>
                </div>
              </div>

              {/* David - Minca */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-orange-600">DM</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">David</h3>
                  <p className="text-orange-600 font-medium">Minca Transitional Forest Guide</p>
                </div>

                <div className="space-y-4 text-gray-700 text-sm">
                  <p>
                    David specializes in Minca's unique transitional forest ecosystem, where cloud forest meets dry
                    forest. His expertise in this ecological gradient allows visitors to experience species from
                    multiple elevations in a single location, making him invaluable for efficient birding.
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Expertise:</h4>
                    <ul className="space-y-1">
                      <li>• Transitional forest ecology</li>
                      <li>• Multi-elevation species tracking</li>
                      <li>• Coffee plantation birding</li>
                      <li>• Hummingbird behavior specialist</li>
                    </ul>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Minca Region</span>
                  </div>
                </div>
              </div>

              {/* Martin - Kogi Liaison */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-indigo-600">MK</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Martin</h3>
                  <p className="text-indigo-600 font-medium">Kogi Cultural Liaison</p>
                </div>

                <div className="space-y-4 text-gray-700 text-sm">
                  <p>
                    Martin serves as our cultural liaison with the Kogi people, facilitating respectful exchanges
                    between visitors and indigenous communities. His deep understanding of Kogi protocols and
                    traditional ecological knowledge ensures meaningful cultural experiences while maintaining
                    appropriate boundaries.
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Expertise:</h4>
                    <ul className="space-y-1">
                      <li>• Kogi cultural protocols</li>
                      <li>• Traditional ecological knowledge</li>
                      <li>• Sacred site interpretation</li>
                      <li>• Cross-cultural communication</li>
                    </ul>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Kogi Territory</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center bg-emerald-50 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Meet Our Team?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join us on an expedition and experience firsthand the expertise, passion, and cultural knowledge that
              makes AVES tours extraordinary. Our team is ready to share Colombia's avian treasures with you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-3">Book Your Adventure</Button>
              <Button
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-3"
              >
                <Link href="/#contact">Contact Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src="/images/aves-logo.png"
                  alt="AVES Birdwatching Tours Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <p className="text-gray-400 mb-4">
                Premium birding tours in Colombia, committed to conservation and sustainable tourism.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                  <span className="text-sm">ig</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                  <span className="text-sm">tw</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Tours</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/tours/adventure" className="hover:text-white transition-colors">
                    🍃 AVES Adventure
                  </Link>
                </li>
                <li>
                  <Link href="/tours/vision" className="hover:text-white transition-colors">
                    🪶 AVES Vision
                  </Link>
                </li>
                <li>
                  <Link href="/tours/elevate" className="hover:text-white transition-colors">
                    🌼 AVES Elevate
                  </Link>
                </li>
                <li>
                  <Link href="/tours/souls" className="hover:text-white transition-colors">
                    🍓 AVES Souls
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    🦅 About AVES
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="hover:text-white transition-colors flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="/conservation" className="hover:text-white transition-colors">
                    🌱 Conservation
                  </Link>
                </li>
                <li>
                  <Link href="/about/b-corp" className="hover:text-white transition-colors flex items-center group">
                    <span className="mr-1 text-xs font-bold bg-white text-gray-900 px-1 rounded">B</span>B Corp Journey
                    <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">↑</span>
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    📝 Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    🐦 Bird Guide
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    📞 Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
