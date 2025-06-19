"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Clock, ArrowRight, Menu, X, ChevronDown, MapPin, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { AuthorBio } from "@/components/author-bio"

export default function ChocoEndemicExpeditionPage() {
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
            {/* Tours Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-emerald-600 transition-colors">
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
              <button className="flex items-center text-gray-700 hover:text-emerald-600 transition-colors">
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
              </div>
            </div>
            <Link href="/about/b-corp" className="text-gray-700 hover:text-emerald-600 transition-colors">
              B Corp Journey
            </Link>
            <Link href="/blog" className="text-emerald-600 font-medium transition-colors">
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
                <div className="text-gray-700 font-medium py-2">About</div>
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
                className="block text-emerald-600 font-medium transition-colors py-2"
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

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <span>→</span>
            <Link href="/blog" className="hover:text-emerald-600 transition-colors">
              Blog
            </Link>
            <span>→</span>
            <span className="text-gray-900">Voices of the Forest: Chocó Endemic Species</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Badge className="bg-red-100 text-red-800 mb-4">Cultural Conservation</Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Voices of the Forest: Chocó Endemic Species and Community Wisdom
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                An immersive journey into the heart of indigenous territories, where traditional ecological knowledge
                meets modern conservation science in protecting Colombia's most endangered endemic species.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 mb-8">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>March 28, 2025</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>9 min read</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Chocó Bioregion, Colombia</span>
              </div>
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                <span>Cultural Immersion</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/chestnut-crowned-antpitta.jpg"
                alt="Chestnut-crowned Antpitta in its natural Chocó habitat, representing the deep connection between indigenous knowledge and endemic species conservation"
                width={1200}
                height={675}
                className="object-cover w-full h-full"
                style={{ objectPosition: "center 30%" }}
              />
            </div>
            <p className="text-sm text-gray-500 text-center mt-4">
              A Chestnut-crowned Antpitta, one of the Chocó's most elusive endemic species, captured during our cultural
              immersion expedition with indigenous guides.
            </p>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Deep in the heart of Colombia's Chocó bioregion, where the morning mist clings to ancient cecropia trees
                and the forest floor pulses with life, I found myself following Yurumí, an elder from the Embera
                community, along a barely visible trail that seemed to exist only in his memory.
              </p>

              <p>
                "Listen," he whispered, raising his weathered hand. In the pre-dawn darkness, I strained to hear what
                his trained ears had already detected—the distinctive, haunting call of the Chestnut-crowned Antpitta,
                one of the Chocó's most elusive endemic species and a bird that, according to Yurumí, holds the stories
                of the forest in its song.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Keepers of Ancient Knowledge</h2>

              <p>
                This moment marked the beginning of what would become one of our most profound AVES Souls expeditions—a
                journey that transcended traditional birdwatching to explore the intricate relationships between
                indigenous communities and the endemic species they have coexisted with for millennia.
              </p>

              <p>
                The Chocó bioregion, stretching along Colombia's Pacific coast, harbors one of the world's highest
                levels of endemism. Yet the true guardians of this biodiversity are not found in scientific journals or
                conservation databases—they live in the communities that have called this forest home for generations.
              </p>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 my-8">
                <p className="text-emerald-800 italic">
                  "The birds are our teachers," Yurumí explained as we waited in the pre-dawn silence. "Each species has
                  its place, its purpose, its story. When we lose a bird, we lose a piece of our own knowledge."
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Endemic Treasures of the Chocó</h2>

              <p>
                Over the course of eight transformative days, our small group of travelers experienced the Chocó through
                the eyes of its indigenous inhabitants. We encountered species that exist nowhere else on Earth, each
                one a testament to the unique evolutionary pressures of this isolated bioregion.
              </p>

              <p>
                The Chocó Vireo, with its distinctive yellow spectacles, guided us through the understory while Yurumí
                shared the traditional names and ecological roles of each species. The Baudo Oropendola's elaborate
                hanging nests became a lesson in sustainable architecture, their construction techniques inspiring
                traditional building methods still used by local communities today.
              </p>

              <div className="grid md:grid-cols-2 gap-8 my-12">
                <div>
                  <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg mb-4">
                    <Image
                      src="/images/chestnut-crowned-antpitta-ground.jpg"
                      alt="Chestnut-crowned Antpitta foraging on the forest floor"
                      width={400}
                      height={300}
                      className="object-cover w-full h-full"
                      style={{ objectPosition: "center 40%" }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    The elusive Chestnut-crowned Antpitta foraging on the forest floor, a behavior that indigenous
                    guides can predict with remarkable accuracy.
                  </p>
                </div>
                <div>
                  <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg mb-4">
                    <Image
                      src="/images/yellow-throated-toucan-blog.jpg"
                      alt="Yellow-throated Toucan in Chocó canopy"
                      width={400}
                      height={300}
                      className="object-cover w-full h-full"
                      style={{ objectPosition: "center 25%" }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    A Yellow-throated Toucan, whose presence indicates healthy forest ecosystems according to
                    traditional ecological knowledge.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
                Traditional Ecological Knowledge in Action
              </h2>

              <p>
                What struck me most profoundly was the depth of ecological understanding embedded in traditional
                practices. Yurumí could predict bird behavior with an accuracy that rivaled any field guide, but his
                knowledge went far beyond identification—he understood the intricate web of relationships that connected
                each species to the forest ecosystem.
              </p>

              <p>
                "When the Lemon-spectacled Tanager calls from the cecropia trees at dawn, the rains will come within
                three days," he explained, pointing to a brilliant yellow bird high in the canopy. "Our ancestors
                learned to read these signs, and we plant our crops accordingly."
              </p>

              <p>
                This traditional ecological knowledge, passed down through generations of oral tradition, represents a
                sophisticated understanding of ecosystem dynamics that complements and often surpasses modern scientific
                approaches to conservation.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
                Conservation Through Cultural Preservation
              </h2>

              <p>
                As our expedition progressed, it became clear that the conservation of Chocó's endemic species is
                inextricably linked to the preservation of indigenous cultures. The communities we visited have
                developed sustainable practices that have allowed them to coexist with these species for centuries
                without causing population declines.
              </p>

              <p>
                Traditional hunting practices, for example, include sophisticated rotation systems that prevent
                overexploitation of any single area. Sacred groves, protected by cultural taboos, serve as crucial
                refugia for endemic species. These community-managed conservation areas often harbor higher biodiversity
                than formally protected national parks.
              </p>

              <div className="bg-gray-50 rounded-lg p-8 my-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Species Encountered During Our Expedition:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                      Chestnut-crowned Antpitta
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                      Chocó Vireo
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                      Baudo Oropendola
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                      Lemon-spectacled Tanager
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                      Yellow-throated Toucan
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                      Stub-tailed Antbird
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                      Orange-breasted Fruiteater
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                      Rufous-crowned Antpitta
                    </li>
                  </ul>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Path Forward</h2>

              <p>
                Our expedition concluded with a community ceremony where we were formally welcomed as friends of the
                forest. As we sat around the fire, listening to stories that connected the calls of endemic birds to the
                creation myths of the Embera people, I realized that we had experienced something far more valuable than
                a traditional birding tour.
              </p>

              <p>
                We had witnessed a living example of how conservation and cultural preservation can work hand in hand.
                The endemic species of the Chocó are not just biological treasures—they are integral parts of a cultural
                landscape that has been shaped by thousands of years of sustainable interaction between humans and
                nature.
              </p>

              <p>
                As climate change and deforestation threaten both the Chocó's endemic species and the indigenous
                communities that protect them, expeditions like these become more than just travel experiences—they
                become acts of solidarity and support for a way of life that offers crucial lessons for global
                conservation efforts.
              </p>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8">
                <p className="text-red-800">
                  <strong>Conservation Impact:</strong> A portion of proceeds from our Souls expeditions directly
                  supports community-based conservation initiatives and traditional knowledge preservation programs in
                  the Chocó region.
                </p>
              </div>

              <p className="text-lg text-gray-700 mt-8">
                The voices of the forest—both avian and human—continue to call out with urgent messages about the
                interconnectedness of all life. Through expeditions like these, we not only witness the incredible
                diversity of endemic species but also learn from the communities that have been their guardians for
                generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Author Bio */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AuthorBio
              name="Dr. Elena Vargas"
              role="Cultural Conservation Specialist & AVES Souls Guide"
              bio="Dr. Elena Vargas is an ethnobiologist and cultural conservation specialist who has spent over 15 years working with indigenous communities throughout Latin America. She leads AVES Souls expeditions, focusing on the intersection of traditional ecological knowledge and modern conservation science."
              image="/images/martin-melendro.jpg"
            />
          </div>
        </div>
      </section>

      {/* Related Tours CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Experience Cultural Conservation Firsthand</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join our AVES Souls expeditions to connect with indigenous communities and witness the deep relationships
              between culture and conservation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tours/souls">
                <Button size="lg" className="bg-red-600 hover:bg-red-700">
                  Explore Souls Tours
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/shopping?preset=souls">
                <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                  Book Your Journey
                </Button>
              </Link>
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
              <Link href="/cookies" className="hover:text-white transition-colors">
                🍪 Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
