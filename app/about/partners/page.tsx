"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Leaf, Globe, ArrowRight, Menu, X, ChevronDown, ExternalLink } from "lucide-react"
import Link from "next/link"
import OptimizedImage from "@/components/optimized-image"
import { CookieManagementButton } from "@/components/cookie-management-button"

export default function PartnersPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const partners = [
    {
      id: "proaves",
      name: "Fundación ProAves",
      logo: "/images/partners/proaves-logo.png",
      description:
        "Colombia's leading bird conservation organization, protecting over 1 million acres of critical habitat across 29 nature reserves. ProAves has discovered 15 new bird species and leads groundbreaking conservation efforts including the protection of critically endangered species like the Blue-billed Curassow and Yellow-eared Parrot.",
      website: "https://proaves.org/en/",
      category: "Conservation Foundation",
      keyContributions: ["29 Protected Reserves", "15 New Species Discovered", "1M+ Acres Protected"],
    },
    {
      id: "el-dorado",
      name: "ProAves El Dorado Reserve",
      logo: "/images/partners/el-dorado-logo.png",
      description:
        "An award-winning ecolodge and research station in the Sierra Nevada de Santa Marta, protecting habitat for 22 endemic bird species. This unique cloud forest reserve offers unparalleled access to endemic species while directly funding habitat protection through sustainable ecotourism.",
      website: "https://proaves.org/en/proaves-el-dorado-reserve/",
      category: "Ecolodge & Research Station",
      keyContributions: ["22 Endemic Species", "Cloud Forest Protection", "Research Station"],
    },
    {
      id: "montezuma",
      name: "Montezuma Rainforest Lodge",
      logo: "/images/partners/montezuma-logo.png",
      description:
        "A premier eco-lodge nestled in the heart of Colombia's pristine rainforest, offering luxury accommodations with direct access to incredible biodiversity. The lodge provides expert-guided birding tours and supports local conservation initiatives while maintaining the highest standards of sustainable tourism.",
      website: "https://montezumarainforest.com/",
      category: "Luxury Ecolodge",
      keyContributions: ["Luxury Eco-Tourism", "Expert Guides", "Rainforest Access"],
    },
    {
      id: "hacienda-bosque",
      name: "Hacienda El Bosque",
      logo: "/images/partners/hacienda-bosque-logo.png",
      description:
        "A charming mountain retreat specializing in high-altitude birding experiences and sustainable agriculture. This family-owned hacienda offers intimate access to Andean cloud forest species while supporting local communities through responsible tourism and organic farming practices.",
      website: "https://www.instagram.com/haciendaelbosque/",
      category: "Mountain Retreat",
      keyContributions: ["High-Altitude Birding", "Sustainable Agriculture", "Cloud Forest Access"],
    },
    {
      id: "selva",
      name: "Fundación Selva",
      logo: "/images/partners/selva-logo.png",
      description:
        "Dedicated to protecting Colombia's tropical forests through research, education, and sustainable development. Their comprehensive approach includes biodiversity monitoring, community engagement, and habitat restoration across critical ecosystems in the Amazon and Chocó regions.",
      website: "https://www.selva.org.co/en/home/",
      category: "Research Foundation",
      keyContributions: ["Forest Protection", "Biodiversity Research", "Community Programs"],
    },
    {
      id: "refugio-esmeralda",
      name: "Refugio La Esmeralda",
      logo: "/images/partners/refugio-esmeralda-logo.png",
      description:
        "A hidden gem ecolodge offering authentic wilderness experiences in pristine natural settings. This intimate refuge provides exceptional birding opportunities while maintaining minimal environmental impact and supporting local conservation efforts through community-based tourism.",
      website: "https://www.instagram.com/refugiolaesmeraldaoficial/",
      category: "Wilderness Refuge",
      keyContributions: ["Wilderness Access", "Minimal Impact Tourism", "Community Support"],
    },
    {
      id: "finca-suasie",
      name: "Finca Suasie",
      logo: "/images/partners/finca-suasie-logo.png",
      description:
        "Specializing in high-altitude birding experiences in the Chingaza National Park region, offering unique access to páramo ecosystems and endemic Andean species. This working farm combines sustainable agriculture with exceptional birding opportunities at elevations above 3,000 meters.",
      website: "https://fincasuasie.com/en/birdwatching-in-chingaza-with-lodging/",
      category: "High-Altitude Birding",
      keyContributions: ["Páramo Access", "Endemic Species", "3,000m+ Elevation"],
    },
    {
      id: "termales-ruiz",
      name: "Termales del Ruiz",
      logo: "/images/partners/termales-ruiz-logo.png",
      description:
        "Combining the therapeutic benefits of natural hot springs with exceptional high-altitude birding opportunities in the Los Nevados National Park. This unique partnership offers relaxation and birding at extreme elevations, with access to specialized Andean species and stunning volcanic landscapes.",
      website: "https://termalesdelruiz.com/servicios/avistamiento-de-aves/",
      category: "Thermal Springs & Birding",
      keyContributions: ["Thermal Springs", "Volcanic Landscapes", "High-Altitude Species"],
    },
  ]

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
              <button className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors font-medium">
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
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  Our Team
                </Link>
                <Link
                  href="/about/partners"
                  className="block px-4 py-3 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-colors font-medium"
                >
                  🤝 Our Partners
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
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Our Team
                  </Link>
                  <Link
                    href="/about/partners"
                    className="block text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-colors py-1 px-2 rounded font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🤝 Our Partners
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
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-blue-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4">
              🤝 Conservation Partnerships
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Our
              <span className="text-emerald-600 block">Conservation Partners</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              AVES Colombia collaborates with leading conservation organizations, ecolodges, and research institutions
              to protect Colombia's incredible biodiversity while supporting local communities through sustainable
              tourism.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Conservation & Tourism Partners</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Together, we're creating a network of sustainable tourism that directly contributes to habitat protection
              and community development across Colombia.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {partners.map((partner) => (
              <Card key={partner.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm">
                        <OptimizedImage
                          src={partner.logo || "/placeholder.svg"}
                          alt={`${partner.name} official logo`}
                          width={80}
                          height={80}
                          className="max-w-full max-h-full object-contain p-2 transition-transform duration-200 group-hover:scale-105"
                          priority={partner.id === "proaves"} // Priority loading for first partner
                          onError={(e) => {
                            console.warn(`Failed to load logo for ${partner.name}`)
                            e.currentTarget.src =
                              "/placeholder.svg?height=80&width=80&text=" +
                              partner.name
                                .split(" ")
                                .map((w) => w[0])
                                .join("")
                          }}
                          sizes="(max-width: 768px) 64px, 80px"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">{partner.name}</h3>
                          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-3">
                            {partner.category}
                          </Badge>
                        </div>
                        <Link
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 ml-4"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Visit Site
                          </Button>
                        </Link>
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-4">{partner.description}</p>

                      {/* Key Contributions */}
                      <div className="flex flex-wrap gap-2">
                        {partner.keyContributions.map((contribution, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700"
                          >
                            {contribution}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why We Partner</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our partnerships create a multiplier effect for conservation impact and community benefit across
              Colombia's diverse ecosystems.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Conservation Impact</h3>
              <p className="text-gray-600">
                Direct funding for habitat protection and species research through sustainable tourism revenue.
              </p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Community Development</h3>
              <p className="text-gray-600">
                Supporting local communities through employment, training, and sustainable economic opportunities.
              </p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Scientific Research</h3>
              <p className="text-gray-600">
                Contributing to biodiversity research and species monitoring that informs conservation strategies.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-emerald-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Join Our Conservation Network</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience Colombia's biodiversity while directly supporting conservation and community development through
            our partner network.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tours">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-4">
                Explore Tours
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-4"
              >
                Contact Us
              </Button>
            </Link>
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
