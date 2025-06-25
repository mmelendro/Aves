"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight, MapPin, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { AuthorBio } from "@/components/author-bio"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"

export default function ChocoEndemicExpeditionPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <NavigationHeader currentPage="/blog" />

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
      <Footer />
    </div>
  )
}
