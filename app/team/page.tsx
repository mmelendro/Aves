"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Globe, Instagram, Menu, X, Users, ChevronDown } from "lucide-react"
import Link from "next/link"
import OptimizedImage from "@/components/optimized-image"
import { CookieManagementButton } from "@/components/cookie-management-button"

export default function TeamPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
              <OptimizedImage
                src="/images/aves-logo.png"
                alt="AVES Birdwatching Tours Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Tours Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center text-gray-700 hover:text-emerald-600 transition-colors"
                aria-expanded="false"
                aria-haspopup="true"
              >
                Tours
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link
                  href="/tours"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors border-b"
                >
                  All Tours Overview
                </Link>
                <Link
                  href="/tours/adventure"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  🍃 AVES Adventure
                </Link>
                <Link
                  href="/tours/vision"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  🪶 AVES Vision
                </Link>
                <Link
                  href="/tours/elevate"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  🌼 AVES Elevate
                </Link>
                <Link
                  href="/tours/souls"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  🍓 AVES Souls
                </Link>
              </div>
            </div>
            {/* About Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors">
                About
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link
                  href="/about"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  About AVES
                </Link>
                <Link
                  href="/team"
                  className="block px-4 py-3 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-colors"
                >
                  Our Team
                </Link>
                <Link
                  href="/about/partners"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  Our Partners
                </Link>
              </div>
            </div>
            <Link href="/about/b-corp" className="text-gray-700 hover:text-emerald-600 transition-colors">
              B Corp Journey
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Blog
            </Link>
            <Link href="/conservation" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Conservation
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Link href="/shopping">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Book Your Journey</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              <div className="py-2">
                <div className="text-gray-700 font-medium py-2">Tours</div>
                <div className="pl-4 space-y-2">
                  <Link
                    href="/tours"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    All Tours Overview
                  </Link>
                  <Link
                    href="/tours/adventure"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🍃 AVES Adventure
                  </Link>
                  <Link
                    href="/tours/vision"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🪶 AVES Vision
                  </Link>
                  <Link
                    href="/tours/elevate"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🌼 AVES Elevate
                  </Link>
                  <Link
                    href="/tours/souls"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🍓 AVES Souls
                  </Link>
                </div>
              </div>
              <div className="py-2">
                <div className="text-emerald-600 font-medium py-2">About</div>
                <div className="pl-4 space-y-2">
                  <Link
                    href="/about"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About AVES
                  </Link>
                  <Link
                    href="/team"
                    className="block text-emerald-600 font-medium transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Our Team
                  </Link>
                  <Link
                    href="/about/partners"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Our Partners
                  </Link>
                </div>
              </div>
              <Link
                href="/about/b-corp"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                B Corp Journey
              </Link>
              <Link
                href="/blog"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/conservation"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Conservation
              </Link>
              <Link
                href="/contact"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4">
                <Link href="/shopping">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Book Your Journey</Button>
                </Link>
              </div>
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
                    Fluent in Spanish and English, Martin specializes in creating transformative birding experiences
                    that go beyond species lists. His approach emphasizes cultural exchange, conservation education, and
                    sustainable tourism practices that benefit local communities.
                  </p>

                  <p>
                    Through years of field experience, Martin has contributed to numerous conservation projects
                    throughout the Neotropics. His field work has focused on endemic species conservation, habitat
                    restoration, and the intersection of traditional ecological knowledge with modern conservation
                    science.
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
                    Spanish, English
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
                  <OptimizedImage
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Local Community Guides</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our local partners are regional experts who bring deep knowledge of their territories, combining
                traditional ecological wisdom, scientific understanding, and intimate connections to the landscapes we
                explore together.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Yeferson Guale Epiayu */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                    <OptimizedImage
                      src="/images/yeferson-guale-epiayu.png"
                      alt="Yeferson Guale Epiayu - Wayuu Community Guide specializing in Sierra Nevada de Santa Marta"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                      style={{ objectFit: "cover" }}
                    />
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
                  <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                    <OptimizedImage
                      src="/images/dagoberto-rudas.png"
                      alt="Dagoberto Rudas - Tayrona Community Guide specializing in cloud forest birding"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                      style={{ objectFit: "cover" }}
                    />
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

              {/* Gleison Fernando Guarin Largo */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                    <OptimizedImage
                      src="/images/gleison-guarin.png"
                      alt="Gleison Fernando Guarin Largo - Tatamá National Park Specialist and acoustic ornithologist"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Gleison Fernando Guarin Largo</h3>
                  <p className="text-green-600 font-medium">Tatamá National Park Specialist</p>
                </div>

                <div className="space-y-4 text-gray-700 text-sm">
                  <p>
                    Gleison is part of the family that owns Montezuma Ecolodge in Tatamá National Park, Chocó. An
                    exceptional acoustic ornithologist, he can identify over 1,000 bird species by their sounds alone.
                    His expertise in the region's endemic species makes him invaluable for our Chocó expeditions.
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Expertise:</h4>
                    <ul className="space-y-1">
                      <li>• Acoustic bird identification (1000+ species)</li>
                      <li>• Chocó endemic species specialist</li>
                      <li>• Cornell University collaborator</li>
                      <li>• Sound recording and documentation</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Instagram className="w-4 h-4 mr-2" />
                      <a
                        href="https://instagram.com/gleisonguarin"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-600 transition-colors"
                      >
                        @gleisonguarin
                      </a>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>Montezuma Ecolodge, Tatamá National Park</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* David Jara */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                    <OptimizedImage
                      src="/images/david-jara.png"
                      alt="David Jara - El Dorado Cloud Forest Guide and multi-regional tour leader"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">David Jara</h3>
                  <p className="text-purple-600 font-medium">El Dorado Cloud Forest Guide & Tour Leader</p>
                </div>

                <div className="space-y-4 text-gray-700 text-sm">
                  <p>
                    David Jara is our expert tour leader for El Dorado Reserve's cloud forest ecosystem and beyond. With
                    over a decade of experience in the Sierra Nevada's montane forests, he has an unmatched ability to
                    locate the region's most elusive endemic species in challenging weather conditions. David leads
                    tours across multiple regions and collaborates with several renowned birding operators.
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Expertise:</h4>
                    <ul className="space-y-1">
                      <li>• Cloud forest endemic species</li>
                      <li>• Montane ecosystem navigation</li>
                      <li>• Multi-region tour leadership</li>
                      <li>• Weather pattern interpretation</li>
                      <li>• High-altitude birding techniques</li>
                      <li>• Cross-operator collaboration</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Tour Operator Affiliations:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <Instagram className="w-4 h-4 mr-2" />
                        <a
                          href="https://www.instagram.com/amazorinoquiabirding/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-purple-600 transition-colors"
                        >
                          @amazorinoquiabirding
                        </a>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Instagram className="w-4 h-4 mr-2" />
                        <a
                          href="https://www.instagram.com/manakinnaturetours/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-purple-600 transition-colors"
                        >
                          @manakinnaturetours
                        </a>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Instagram className="w-4 h-4 mr-2" />
                        <a
                          href="https://www.instagram.com/expeditionminca/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-purple-600 transition-colors"
                        >
                          @expeditionminca
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Instagram className="w-4 h-4 mr-2" />
                      <a
                        href="https://www.instagram.com/davidjara20/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-purple-600 transition-colors font-medium"
                      >
                        @davidjara20
                      </a>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>El Dorado Reserve & Multi-Regional Tours</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* David - Minca */}
              {/* David Faunal */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                    <OptimizedImage
                      src="/images/david-faunal-birds-reserve.jpg"
                      alt="Birds at David Faunal's Observatorio de Aves de Minca - showcasing the diverse avian life at the reserve"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                      style={{ objectFit: "cover" }}
                      fallback="/images/manakin-1.jpg"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">David Faunal</h3>
                  <p className="text-orange-600 font-medium">Minca Observatory Owner & Transitional Forest Guide</p>
                </div>

                <div className="space-y-4 text-gray-700 text-sm">
                  <p>
                    David Faunal is the owner and operator of Observatorio de Aves de Minca, a premier birdwatching
                    destination in the Sierra Nevada de Santa Marta. His observatory specializes in Minca's unique
                    transitional forest ecosystem, where cloud forest meets dry forest, creating exceptional birding
                    opportunities.
                  </p>

                  <p>
                    With years of experience in the region, David has developed an intimate knowledge of local bird
                    behavior and migration patterns. His observatory provides visitors with unparalleled access to
                    hummingbird feeding stations and strategic viewing points for observing the area's incredible avian
                    diversity.
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Expertise:</h4>
                    <ul className="space-y-1">
                      <li>• Transitional forest ecology</li>
                      <li>• Hummingbird behavior and feeding patterns</li>
                      <li>• Multi-elevation species tracking</li>
                      <li>• Observatory management and bird photography</li>
                      <li>• Coffee plantation birding</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Instagram className="w-4 h-4 mr-2" />
                      <a
                        href="https://www.instagram.com/faunal_observatorioavesminca/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-orange-600 transition-colors"
                      >
                        @faunal_observatorioavesminca
                      </a>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Globe className="w-4 h-4 mr-2" />
                      <a
                        href="https://www.observatoriodeavesdeminca.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-orange-600 transition-colors"
                      >
                        observatoriodeavesdeminca.com
                      </a>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>Observatorio de Aves de Minca</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nicolas Rozo */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                    <OptimizedImage
                      src="/images/nicolas-rozo.png"
                      alt="Nicolas Rozo - Bogotá Region Ornithologist specializing in páramo ecosystems"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Nicolas Rozo</h3>
                  <p className="text-indigo-600 font-medium">Bogotá Region Ornithologist</p>
                </div>

                <div className="space-y-4 text-gray-700 text-sm">
                  <p>
                    Nicolas holds a degree in Biology from Universidad Distrital and is our expert ornithologist for the
                    Bogotá region. His specialized knowledge of high-altitude páramo ecosystems makes him the ideal
                    guide for exploring Chingaza and Sumapaz National Parks, where he leads expeditions to observe
                    endemic Andean species.
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Expertise:</h4>
                    <ul className="space-y-1">
                      <li>• High-altitude páramo ornithology</li>
                      <li>• Andean endemic species specialist</li>
                      <li>• Chingaza and Sumapaz ecosystems</li>
                      <li>• Scientific research and documentation</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Instagram className="w-4 h-4 mr-2" />
                      <a
                        href="https://www.instagram.com/nicolas_rozop/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-indigo-600 transition-colors"
                      >
                        @nicolas_rozop
                      </a>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>Bogotá region páramo ecosystems</span>
                    </div>
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
                <OptimizedImage
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
                  <Link href="/about/partners" className="hover:text-white transition-colors text-white">
                    🤝 Our Partners
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
                  <Link href="/blog" className="hover:text-white transition-colors">
                    ✈️ Travel Tips
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

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 AVES. All rights reserved.</p>
            <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-white transition-colors">
                🔒 Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                📋 Terms of Service
              </Link>
              <CookieManagementButton
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white transition-colors p-0 h-auto font-normal"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
