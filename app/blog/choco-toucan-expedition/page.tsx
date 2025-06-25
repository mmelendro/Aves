import type { Metadata } from "next"
import Link from "next/link"
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import OptimizedImage from "@/components/optimized-image"
import AudioPlayer from "@/components/audio-player"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Into the Heart of Chocó: A Toucan Odyssey Through Colombia's Biodiversity Hotspot | AVES",
  description:
    "Join our expedition into the Chocó biogeographic region, one of the world's most biodiverse areas. Discover Yellow-throated Toucans, endemic species, and pristine rainforest ecosystems in this immersive birding adventure.",
  keywords:
    "Chocó region, Yellow-throated Toucan, Colombia birding, biodiversity hotspot, endemic species, rainforest expedition, AVES tours",
  openGraph: {
    title: "Into the Heart of Chocó: A Toucan Odyssey | AVES",
    description:
      "Explore Colombia's Chocó region and discover Yellow-throated Toucans in one of the world's most biodiverse ecosystems.",
    images: ["/images/yellow-throated-toucan-blog.jpg"],
  },
}

export default function ChocoToucanExpeditionPage() {
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
            <span className="text-gray-900">Into the Heart of Chocó: A Toucan Odyssey</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <article className="container mx-auto px-4 py-16">
        <header className="mb-8">
          <div className="text-center mb-6">
            <span className="inline-block bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
              Rainforest Expeditions
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Into the Heart of Chocó: A Toucan Odyssey Through Colombia's Biodiversity Hotspot
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Journey with us into the Chocó biogeographic region, where the haunting calls of Yellow-throated Toucans
              echo through one of Earth's most biodiverse ecosystems.
            </p>
          </div>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 mb-8">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              March 15, 2024
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />8 min read
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Chocó Region, Colombia
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Martin Melendro
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden mb-8">
            <OptimizedImage
              src="/images/yellow-throated-toucan-blog.jpg"
              alt="Yellow-throated Toucan in the Chocó rainforest canopy at dawn"
              fill
              className="object-cover"
              priority
            />
          </div>
        </header>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              As the first light of dawn filters through the dense canopy of the Chocó rainforest, a deep, resonant call
              pierces the morning mist. The unmistakable voice of the Yellow-throated Toucan—
              <em>Ramphastos ambiguus</em>—announces the beginning of another day in one of the world's most
              extraordinary biodiversity hotspots.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Dawn Chorus: Nature's Symphony</h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Our expedition begins before sunrise, when the forest awakens with a symphony of sounds that few places on
              Earth can match. The Yellow-throated Toucan's call—a series of deep, croaking notes that carry for miles
              through the humid air—serves as the conductor's baton for this natural orchestra.
            </p>

            {/* Audio Player */}
            <div className="my-8">
              <AudioPlayer
                src="/audio/yellow-throated-toucan.mp3"
                title="Yellow-throated Toucan Dawn Chorus"
                species="Ramphastos ambiguus"
                className="max-w-2xl mx-auto"
              />
              <p className="text-sm text-gray-500 text-center mt-2">
                Listen to the authentic call of the Yellow-throated Toucan recorded in the Chocó region
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              Standing beneath the towering cecropia trees, our small group of birding enthusiasts holds their breath as
              the forest comes alive. The toucan's call is soon joined by the melodic notes of tanagers, the rhythmic
              drumming of woodpeckers, and the haunting whistle of the Chocó Tinamou—a sound so rare that many birders
              travel thousands of miles just for the chance to hear it.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">A Biodiversity Hotspot Like No Other</h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              The Chocó biogeographic region stretches along the Pacific coast from Panama through Colombia and into
              Ecuador, but it's in the Colombian Chocó where this ecosystem reaches its most spectacular expression.
              With over 11,000 millimeters of annual rainfall in some areas, this is one of the wettest places on
              Earth—a fact that has given rise to an explosion of life found nowhere else on the planet.
            </p>

            <blockquote className="border-l-4 border-emerald-500 pl-6 my-8 text-xl italic text-gray-700">
              "In the Chocó, every tree is a universe unto itself, hosting dozens of species of epiphytes, insects,
              amphibians, and birds. It's not just about the numbers—it's about the intricate web of relationships that
              have evolved over millions of years."
              <footer className="text-base not-italic text-gray-500 mt-2">
                — Dr. María Elena Rodríguez, Conservation Biologist
              </footer>
            </blockquote>

            <p className="text-gray-700 leading-relaxed mb-6">
              The statistics are staggering: the Chocó contains more than 25% of Colombia's bird species despite
              covering less than 5% of the country's territory. For every square kilometer of forest, researchers have
              documented an average of 300 bird species—a density of avian diversity that rivals the Amazon while
              maintaining its own unique character.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Following the Toucan Trail</h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Our journey deeper into the forest follows ancient indigenous trails, paths that have been used by the
              Emberá people for centuries. These trails wind through different forest layers, each offering its own
              birding opportunities and challenges. The Yellow-throated Toucan, our primary quarry, prefers the upper
              canopy where fruiting trees provide abundant food sources.
            </p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 my-8">
              <h3 className="text-xl font-semibold text-emerald-800 mb-3">Species Spotlight: Yellow-throated Toucan</h3>
              <ul className="text-emerald-700 space-y-2">
                <li>
                  <strong>Scientific Name:</strong> <em>Ramphastos ambiguus</em>
                </li>
                <li>
                  <strong>Size:</strong> 47-61 cm (18-24 inches)
                </li>
                <li>
                  <strong>Habitat:</strong> Humid lowland and foothill forests
                </li>
                <li>
                  <strong>Diet:</strong> Primarily fruits, also insects, eggs, and small vertebrates
                </li>
                <li>
                  <strong>Conservation Status:</strong> Near Threatened
                </li>
                <li>
                  <strong>Best Viewing:</strong> Early morning and late afternoon in fruiting trees
                </li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              The toucan's massive bill, which can measure up to 20 centimeters in length, is not just for show. This
              remarkable adaptation allows the bird to reach fruits on branches too thin to support its body weight,
              giving it access to food sources unavailable to other species. The bill's bright yellow coloration serves
              as a signal to other toucans, helping to establish territory and attract mates.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conservation Challenges and Hope</h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Despite its incredible biodiversity, the Chocó faces significant conservation challenges. Deforestation
              for agriculture, mining, and urban development has fragmented much of the original forest cover. Climate
              change adds another layer of complexity, altering rainfall patterns and temperature regimes that many
              species depend upon.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              However, there is reason for hope. Local communities, conservation organizations, and ecotourism
              initiatives are working together to protect these vital ecosystems. Our birding expeditions contribute
              directly to these conservation efforts, providing economic incentives for forest protection while raising
              awareness about the importance of the Chocó's biodiversity.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Experience: More Than Just Birding</h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              As our day in the Chocó draws to a close, we reflect on more than just the 127 bird species we've
              recorded. We've witnessed the intricate dance of a ecosystem in perfect balance, heard the stories of
              indigenous communities who have been stewards of this land for generations, and felt the profound
              connection that comes from experiencing one of nature's most spectacular creations.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              The Yellow-throated Toucan's evening call echoes through the forest one last time as we make our way back
              to camp. Tomorrow will bring new adventures, new species, and new opportunities to contribute to the
              conservation of this irreplaceable ecosystem. But tonight, we carry with us the memory of a perfect day in
              one of the world's last great wildernesses.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Join Our Chocó Expeditions</h3>
              <p className="text-gray-700 mb-4">
                Experience the magic of the Chocó region with AVES. Our expert guides will take you deep into this
                biodiversity hotspot, where every day brings new discoveries and unforgettable encounters with some of
                the world's most spectacular birds.
              </p>
              <Link href="/shopping?region=choco">
                <Button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors inline-flex items-center gap-2">
                  Explore Our Chocó Tours
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Footer */}
      <Footer />
    </div>
  )
}
