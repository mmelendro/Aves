/**
 * Hummingbird photography article, with a shared ArticleHero and AuthorBio.
 * The labelled JSX sections hold the prose, place descriptions, gallery and related links.
 * The hero carousel selection is maintained in components/article-bird-carousel.tsx.
 */
"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, Heart, Eye, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { AuthorBio } from "@/components/author-bio"
import ArticleHero from "@/components/article-hero"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"

export default function HummingbirdVisionJourneyPage() {

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
            <Link href="/colombia" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <span>→</span>
            <Link href="/blog" className="hover:text-emerald-600 transition-colors">
              Blog
            </Link>
            <span>→</span>
            <span className="text-gray-900">Jewels of the Andes: A Vision Journey</span>
          </nav>
        </div>
      </div>

      <ArticleHero article="hummingbirds" title="Jewels of the Andes: A Vision Journey Through Colombia's Hummingbird Sanctuaries" eyebrow="Vision Photography Series · Part IV" location="Three Andean Cordilleras" date="June 12, 2025" readTime="12 min read" description="Explore Colombia's Andean hummingbirds, with time to watch, listen and photograph the life of the cloud forests.">
        <Link href="/tours/vision" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800"><Camera className="h-5 w-5" aria-hidden="true" />Explore photography journeys</Link>
      </ArticleHero>

      {/* Main Content */}
      <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Opening */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl leading-relaxed text-gray-700 mb-8">
                There exists a realm where the physical and spiritual converge—where the beating of wings creates a
                meditation, where iridescent feathers catch light like fragments of heaven, and where the simple act of
                witnessing becomes a form of prayer. This is the world of Colombia's hummingbirds, and this is our final
                chapter in the Vision series: a journey that transcends photography to become a pilgrimage of the soul.
              </p>

              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                Over eight transformative days, we traverse Colombia's three magnificent Andean cordilleras—each a
                cathedral of biodiversity, each home to species found nowhere else on Earth. From the mystical páramos
                of Chingaza to the cloud forests of Jardín, from the endemic sanctuaries of Tatamá to the hidden valleys
                where ancient wisdom still flows, we seek not just photographs, but moments of profound connection with
                these aerial angels.
              </p>
            </div>

            {/* The Sacred Geography */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <Heart className="w-8 h-8 mr-3 text-purple-600" />
                The Sacred Geography of Vision
              </h2>

              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-lg leading-relaxed text-gray-700 mb-6">
                  Our Vision Journey unfolds across three sacred landscapes, each offering its own revelation, its own
                  teaching about the delicate balance between patience and presence that defines both hummingbird
                  photography and spiritual practice.
                </p>
              </div>

              {/* Central Andes Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Central Andes: Temple of the Páramo</h3>
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      High in Colombia's Central Andes, the páramo exists in a realm between earth and sky.
                      Here, in the high-altitude páramo ecosystem, we encounter the Rainbow-bearded Thornbill—a species
                      so perfectly adapted to these harsh conditions that it seems to embody the very spirit of
                      resilience.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      In the pre-dawn cold, as mist rises from ancient lakes and the first light touches the
                      frailejones, we practice the art of stillness. The thornbill's fiery throat patch—a burst of
                      orange and red against the muted páramo palette—becomes our meditation object, teaching us about
                      finding warmth and beauty in the most austere environments.
                    </p>
                    <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Scientific Name:</strong> Chalcostigma herrani
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Spanish Name:</strong> Colibrí Barbirrojo
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Elevation:</strong> 3,000-4,000m
                      </p>
                      <Link
                        href="https://ebird.org/species/rabth1"
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        View on eBird →
                      </Link>
                    </div>
                  </div>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/images/rabtho1.jpg"
                      alt="Rainbow-bearded Thornbill, a hummingbird of high Andean páramo and treeline habitats"
                      width={600}
                      height={450}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>
              </div>

              {/* Jardín Section */}
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Jardín: Garden of Earthly Delights</h3>
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/images/collared-inca.jpg"
                      alt="Collared Inca displaying its distinctive black and white collar in cloud forest habitat"
                      width={600}
                      height={450}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Descending from the páramo's austerity, we enter the lush embrace of Jardín's cloud forests. Here,
                      at 1,800 meters, the Collared Inca reigns supreme—a hummingbird whose elegant black and white
                      collar speaks to the formal beauty of nature's design.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      In Jardín's gardens and forest edges, we learn the rhythm of abundance. Multiple species share the
                      same flowering trees, creating a symphony of wings and territorial displays. The photography here
                      becomes a dance—anticipating movement, reading behavior, finding harmony in apparent chaos.
                    </p>
                    <div className="bg-white rounded-lg p-4 border-l-4 border-emerald-500">
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Scientific Name:</strong> Coeligena torquata
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Spanish Name:</strong> Inca Acollarado
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Elevation:</strong> 1,500-2,500m
                      </p>
                      <Link
                        href="https://ebird.org/species/colin1"
                        className="text-emerald-600 hover:text-emerald-700 text-sm"
                      >
                        View on eBird →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tatamá Section */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Tatamá: Sanctuary of Endemism</h3>
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      In the Western Cordillera's crown jewel, Tatamá National Park, we encounter species found nowhere
                      else on Earth. The Violet-tailed Sylph, with its impossibly long tail streamers and electric blue
                      crown, represents the pinnacle of hummingbird evolution—beauty refined to its absolute essence.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Here, at 2,400 meters, we practice the deepest form of wildlife photography: the art of becoming
                      invisible while remaining fully present. The sylph's courtship displays—aerial ballets of
                      impossible grace—teach us about the sacred nature of beauty itself.
                    </p>
                    <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Scientific Name:</strong> Aglaiocercus coelestis
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Spanish Name:</strong> Silfo Colivioleta
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Elevation:</strong> 2,000-3,000m
                      </p>
                      <Link
                        href="https://ebird.org/species/vitsy1"
                        className="text-purple-600 hover:text-purple-700 text-sm"
                      >
                        View on eBird →
                      </Link>
                    </div>
                  </div>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/images/violet-tailed-sylph.jpg"
                      alt="Violet-tailed Sylph displaying its spectacular blue crown and long tail streamers"
                      width={600}
                      height={450}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Species Gallery */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <Camera className="w-8 h-8 mr-3 text-purple-600" />
                Portraits of the Divine
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Green Hermit Feeding */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src="/images/green-hermit-feeding.jpg"
                      alt="Green Hermit hummingbird feeding from bright pink tropical flowers"
                      width={600}
                      height={338}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Green Hermit</h3>
                    <p className="text-gray-600 mb-2">
                      <em>Phaethornis guy</em> • Ermitaño Verde
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      The hermit hummingbirds represent a different philosophy of existence—preferring the forest's
                      understory to open gardens, embodying the contemplative path of seeking nectar in shadow rather
                      than sunlight.
                    </p>
                    <Link
                      href="https://ebird.org/species/greher1"
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      View on eBird →
                    </Link>
                  </div>
                </div>

                {/* White-necked Jacobin */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src="/images/white-necked-jacobin.jpg"
                      alt="White-necked Jacobin displaying its distinctive white collar and dark plumage"
                      width={600}
                      height={338}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">White-necked Jacobin</h3>
                    <p className="text-gray-600 mb-2">
                      <em>Florisuga mellivora</em> • Jacobino Nuquiblanco
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      With its striking monochromatic elegance, the jacobin teaches us about the power of simplicity—
                      how sometimes the most profound beauty lies in the perfect balance of light and shadow.
                    </p>
                    <Link
                      href="https://ebird.org/species/whnj1"
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      View on eBird →
                    </Link>
                  </div>
                </div>

                {/* Rufous-tailed Hummingbird */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src="/images/rufous-tailed-hummingbird.jpg"
                      alt="Rufous-tailed Hummingbird showing beautiful green and rufous coloration"
                      width={600}
                      height={338}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Rufous-tailed Hummingbird</h3>
                    <p className="text-gray-600 mb-2">
                      <em>Amazilia tzacatl</em> • Colibrí Colirrufo
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      Perhaps the most approachable of our subjects, the rufous-tailed hummingbird embodies the joy of
                      accessibility—reminding us that profound beauty often dwells in the familiar and everyday.
                    </p>
                    <Link
                      href="https://ebird.org/species/ruthu1"
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      View on eBird →
                    </Link>
                  </div>
                </div>

                {/* Long-tailed Sylph */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src="/images/long-tailed-sylph.jpg"
                      alt="Long-tailed Sylph displaying its spectacular elongated tail feathers"
                      width={600}
                      height={338}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Long-tailed Sylph</h3>
                    <p className="text-gray-600 mb-2">
                      <em>Aglaiocercus kingii</em> • Silfo Colilargo
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      The male's extraordinary tail feathers—longer than his entire body—represent nature's commitment
                      to beauty for its own sake, a living reminder that aesthetics and survival are not opposing
                      forces.
                    </p>
                    <Link
                      href="https://ebird.org/species/lotsy1"
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      View on eBird →
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* The Vision Philosophy */}
            <section className="mb-16">
              <div className="bg-gradient-to-br from-purple-100 via-indigo-100 to-emerald-100 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Eye className="w-8 h-8 mr-3 text-purple-600" />
                  The Philosophy of Vision
                </h2>

                <div className="prose prose-lg max-w-none">
                  <p className="text-lg leading-relaxed text-gray-700 mb-6">
                    What distinguishes our Vision Journey from mere wildlife photography is the understanding that we
                    are not simply capturing images—we are participating in a sacred exchange. Each photograph becomes a
                    prayer, each moment of patient waiting a form of meditation, each successful capture a gift of
                    grace.
                  </p>

                  <p className="text-lg leading-relaxed text-gray-700 mb-6">
                    The hummingbird, with its impossible flight patterns and jewel-like beauty, serves as our teacher in
                    the art of presence. To photograph these aerial masters, we must learn to anticipate without
                    controlling, to be ready without being tense, to see without grasping.
                  </p>

                  <blockquote className="border-l-4 border-purple-500 pl-6 italic text-xl text-gray-800 my-8">
                    "In the space between the hummingbird's wingbeats—80 times per second—exists an entire universe of
                    possibility. Our cameras may freeze a single moment, but our hearts capture the eternal dance."
                  </blockquote>

                  <p className="text-lg leading-relaxed text-gray-700 mb-6">
                    This is why we call it Vision—not just the act of seeing, but the cultivation of insight. Through
                    eight days of patient observation, technical mastery, and spiritual practice, we develop not just
                    better photographs, but a deeper way of being in relationship with the natural world.
                  </p>
                </div>
              </div>
            </section>

            {/* Technical Mastery */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">The Art of Hummingbird Photography</h2>

              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Sacred Technique</h3>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      <strong>Shutter Speed:</strong> 1/2000s minimum to freeze wing motion, though we often push to
                      1/4000s for the most dynamic shots. The goal is to capture the poetry of motion without losing the
                      detail that makes each species unique.
                    </p>
                    <p>
                      <strong>Focus Strategy:</strong> Back-button focus with single-point AF, allowing us to track
                      these aerial dancers while maintaining compositional control. We practice the meditation of
                      following without chasing.
                    </p>
                    <p>
                      <strong>Light as Teacher:</strong> Early morning and late afternoon provide the warm, directional
                      light that brings out the iridescence in hummingbird feathers. We learn to read light like a
                      spiritual text.
                    </p>
                    <p>
                      <strong>Patience as Practice:</strong> Hours of stillness for minutes of action. This ratio
                      teaches us about the nature of dedication and the rewards of sustained attention.
                    </p>
                  </div>
                </div>

                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/buff-tailed-coronet.jpg"
                    alt="Buff-tailed Coronet displaying its distinctive yellow spectacles in cloud forest habitat"
                    width={600}
                    height={450}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-medium">Buff-tailed Coronet</p>
                    <p className="text-xs opacity-90">Boissonneaua flavescens</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Call to Journey */}
            <section className="mb-16">
              <div className="bg-gradient-to-r from-purple-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
                <h2 className="text-3xl font-bold mb-6">Begin Your Vision Journey</h2>
                <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
                  This is more than a photography tour—it's an invitation to see the world through new eyes, to develop
                  not just technical skills but spiritual awareness, to return home not just with images but with a
                  transformed relationship to beauty itself.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/shopping?region=western-andes">
                    <Button className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2">
                      Explore Our Andes Tours
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/tours/vision">
                    <Button
                      variant="outline"
                      className="border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
                    >
                      Learn About Vision Tours
                      <Camera className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </section>

            {/* Author Bio */}
            <AuthorBio />

            {/* Related Posts */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Continue the Vision Series</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Link href="/blog/sierra-nevada-indigenous-birding" className="group">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src="/images/cardinal-guajiro.jpg"
                        alt="Vermilion Cardinal in Sierra Nevada"
                        width={400}
                        height={225}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        style={{ objectPosition: "center 20%" }}
                      />
                    </div>
                    <div className="p-6">
                      <Badge className="bg-emerald-100 text-emerald-800 mb-3">Part I</Badge>
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                        Guardians of the Sky: Indigenous Birding
                      </h3>
                      <p className="text-sm text-gray-600">Sierra Nevada de Santa Marta</p>
                    </div>
                  </div>
                </Link>

                <Link href="/blog/paramo-manizales-thornbill" className="group">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src="/images/rainbow-bearded-thornbill.jpg"
                        alt="Rainbow-bearded Thornbill in páramo"
                        width={400}
                        height={225}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        style={{ objectPosition: "center 30%" }}
                      />
                    </div>
                    <div className="p-6">
                      <Badge className="bg-blue-100 text-blue-800 mb-3">Part II</Badge>
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        Fire and Ice: Páramo to Thermal Springs
                      </h3>
                      <p className="text-sm text-gray-600">Manizales & Chinchiná</p>
                    </div>
                  </div>
                </Link>

                <Link href="/blog/choco-toucan-expedition" className="group">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src="/images/yellow-throated-toucan-blog.jpg"
                        alt="Yellow-throated Toucan in Chocó"
                        width={400}
                        height={225}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        style={{ objectPosition: "center 40%" }}
                      />
                    </div>
                    <div className="p-6">
                      <Badge className="bg-green-100 text-green-800 mb-3">Part III</Badge>
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                        Into the Heart of Chocó
                      </h3>
                      <p className="text-sm text-gray-600">Biogeographic Chocó</p>
                    </div>
                  </div>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </article>

      {/* Footer */}
      <Footer />
    </div>
  )
}
