import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User, MapPin, Droplets, TreePine } from "lucide-react"
import Link from "next/link"
import OptimizedImage from "@/components/optimized-image"
import SpeciesTooltip from "@/components/species-tooltip"
import ImageGallery from "@/components/image-gallery"
import AudioPlayer from "@/components/audio-player"

export default function ChocoToucanBlogPost() {
  const yellowThroatedToucanData = {
    commonName: "Yellow-throated Toucan",
    scientificName: "Ramphastos ambiguus",
    spanishName: "Tucán de Garganta Amarilla",
    ebirdCode: "yethtou1",
    description: "Flagship species of the Chocó rainforest, largest toucan in Colombia",
  }

  const collaredAracariData = {
    commonName: "Collared Aracari",
    scientificName: "Pteroglossus torquatus",
    spanishName: "Arasarí de Collar",
    ebirdCode: "colarc1",
    description: "Smaller toucan species specializing in rainforest understory",
  }

  const greenHoneycreeperData = {
    commonName: "Green Honeycreeper",
    scientificName: "Chlorophanes spiza",
    spanishName: "Mielero Verde",
    ebirdCode: "grehon1",
    description: "Brilliant blue-headed nectar specialist of the Chocó canopy",
  }

  const redLoredAmazonData = {
    commonName: "Red-lored Amazon",
    scientificName: "Amazona autumnalis",
    spanishName: "Loro Frentirrojo",
    ebirdCode: "relama1",
    description: "Large parrot species and important seed disperser",
  }

  const galleryImages = [
    {
      src: "/images/yellow-throated-toucan-blog.jpg",
      alt: "Yellow-throated Toucan displaying its magnificent bill",
      caption: "Yellow-throated Toucan (Ramphastos ambiguus) - Chocó rainforest flagship species",
    },
    {
      src: "/images/collared-aracari.jpg",
      alt: "Collared Aracari in rainforest understory",
      caption: "Collared Aracari (Pteroglossus torquatus) showing colorful plumage",
    },
    {
      src: "/images/green-honeycreeper-blue.jpg",
      alt: "Green Honeycreeper male with brilliant turquoise head",
      caption: "Green Honeycreeper (Chlorophanes spiza) male in the Chocó canopy",
    },
    {
      src: "/images/red-lored-amazons-pair.jpg",
      alt: "Red-lored Amazons pair in Chocó rainforest canopy",
      caption: "Red-lored Amazons (Amazona autumnalis) - Chocó canopy specialists",
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
                width={50}
                height={50}
                className="object-contain"
                priority
              />
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/tours" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Tours
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-emerald-600 transition-colors">
              About
            </Link>
            <Link href="/conservation" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Conservation
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Contact
            </Link>
          </nav>
          <Button className="bg-emerald-600 hover:bg-emerald-700">Book Your Adventure</Button>
        </div>
      </header>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/blog" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        <div className="mb-8">
          <Badge className="bg-green-100 text-green-800 mb-4">Rainforest Expeditions</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Into the Heart of Chocó: A Toucan Odyssey Through Colombia's Rainforest Jewel
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              <Link href="/team#martin-melendro" className="hover:text-emerald-600 transition-colors">
                Martin Melendro
              </Link>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              May 22, 2025
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Biogeographic Chocó
            </div>
            <span>10 min read</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-12 shadow-2xl">
          <OptimizedImage
            src="/images/yellow-throated-toucan-blog.jpg"
            alt="Yellow-throated Toucan (Ramphastos ambiguus) displaying its magnificent bill in the Chocó rainforest canopy"
            width={1200}
            height={675}
            className="object-cover w-full h-full"
            priority
          />
          <div className="absolute bottom-4 left-4 bg-black/70 text-white p-3 rounded-lg">
            <p className="text-sm font-medium">
              <SpeciesTooltip species={yellowThroatedToucanData}>Yellow-throated Toucan</SpeciesTooltip> (Ramphastos
              ambiguus)
            </p>
            <p className="text-xs opacity-90">Chocó rainforest flagship species</p>
          </div>
        </div>

        {/* Audio Player for Toucan Calls */}
        <AudioPlayer
          src="/audio/yellow-throated-toucan-call.mp3"
          title="Yellow-throated Toucan Dawn Chorus"
          species="Ramphastos ambiguus"
          className="mb-8"
        />

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            The Biogeographic Chocó represents one of Earth's most extraordinary biodiversity hotspots—a narrow strip of
            Pacific rainforest that harbors more endemic species per square kilometer than almost anywhere else on the
            planet. Our expedition into this green cathedral was guided by one magnificent species: the{" "}
            <SpeciesTooltip species={yellowThroatedToucanData}>Yellow-throated Toucan</SpeciesTooltip>, whose presence
            signals the health of one of the world's most threatened ecosystems.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Chocó: A Biodiversity Supernova</h2>

          <p className="mb-6">
            Stretching along Colombia's Pacific coast from Panama to Ecuador, the Chocó biogeographic region receives
            some of the highest rainfall on Earth—up to 13 meters annually in some areas. This extraordinary
            precipitation, combined with stable temperatures and complex topography, has created evolutionary conditions
            that rival the Amazon in species richness while exceeding it in endemism.
          </p>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8 rounded-r-lg">
            <div className="flex items-start">
              <Droplets className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-green-900 mb-2">Rainfall and Biodiversity</h3>
                <p className="text-green-800">
                  The Chocó's extreme rainfall creates a unique ecosystem where epiphytes dominate the canopy, creating
                  aerial gardens that support entire communities of specialized species. This three-dimensional habitat
                  complexity provides countless ecological niches that have driven explosive speciation.
                </p>
              </div>
            </div>
          </div>

          <p className="mb-6">
            Our base camp was established near Nuquí, a small coastal town that serves as a gateway to some of the
            Chocó's most pristine forests. From here, we would venture into primary rainforest where the canopy towers
            60 meters above the forest floor, creating a vertical world that most visitors never experience.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Toucan's Domain</h2>

          <div className="grid md:grid-cols-2 gap-8 my-8">
            <div>
              <OptimizedImage
                src="/images/collared-aracari.jpg"
                alt="Collared Aracari (Pteroglossus torquatus) showing colorful plumage in rainforest understory"
                width={400}
                height={300}
                className="rounded-lg shadow-lg object-cover w-full h-64"
              />
              <p className="text-sm text-gray-600 mt-2 italic">
                <SpeciesTooltip species={collaredAracariData}>Collared Aracari</SpeciesTooltip> in the rainforest
                understory
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <p className="mb-4">
                The <SpeciesTooltip species={yellowThroatedToucanData}>Yellow-throated Toucan</SpeciesTooltip> reigns as
                the Chocó's most iconic species, its massive bill serving as both a foraging tool and a thermoregulatory
                device in the humid rainforest environment. These magnificent birds play crucial ecological roles as
                seed dispersers, helping maintain the forest's incredible plant diversity.
              </p>
              <p>
                Our first encounter came at dawn on our second day, when the distinctive yelping calls of a toucan pair
                echoed through the misty canopy. Following the sound led us to a massive cecropia tree where we
                witnessed the birds' remarkable feeding behavior—delicately plucking fruits with their oversized bills
                and tossing them back into their throats with precise head movements.
              </p>
            </div>
          </div>

          <p className="mb-6">
            The toucan's bill, despite its impressive size, is remarkably lightweight—a honeycomb structure of keratin
            that allows for precise manipulation of food items while maintaining the bird's aerial agility. Watching
            these birds navigate through dense canopy vegetation with such grace, despite their seemingly unwieldy
            appendage, never ceased to amaze our expedition team.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">A Symphony of Rainforest Voices</h2>

          <p className="mb-6">
            The Chocó rainforest awakens before dawn with a crescendo of bird calls that builds to an almost
            overwhelming symphony by sunrise. Our daily routine began at 4:30 AM, positioning ourselves in the canopy
            tower as the forest came alive around us. The diversity of vocalizations—from the haunting calls of tinamous
            to the mechanical sounds of woodpeckers—created a soundscape unlike anywhere else on Earth.
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-8">
            <div className="flex flex-col justify-center">
              <p className="mb-4">
                Among the most spectacular discoveries was a family group of{" "}
                <SpeciesTooltip species={greenHoneycreeperData}>Green Honeycreepers</SpeciesTooltip>, their brilliant
                blue heads contrasting sharply with their emerald bodies as they moved through the canopy in search of
                nectar and small insects. These birds exemplify the Chocó's evolutionary creativity—their specialized
                bills perfectly adapted for accessing nectar from the region's abundant flowering plants.
              </p>
              <p>
                The honeycreepers' feeding behavior revealed the intricate relationships between Chocó birds and plants.
                We observed them visiting over a dozen different flower species in a single morning, their movements
                creating a complex pollination network that maintains the forest's botanical diversity.
              </p>
            </div>
            <div>
              <OptimizedImage
                src="/images/green-honeycreeper-blue.jpg"
                alt="Green Honeycreeper (Chlorophanes spiza) male with brilliant turquoise head in Chocó rainforest"
                width={400}
                height={300}
                className="rounded-lg shadow-lg object-cover w-full h-64"
              />
              <p className="text-sm text-gray-600 mt-2 italic">
                <SpeciesTooltip species={greenHoneycreeperData}>Green Honeycreeper</SpeciesTooltip> male in the Chocó
                canopy
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Threats to Paradise</h2>

          <p className="mb-6">
            Despite its extraordinary biodiversity, the Chocó faces unprecedented threats. Deforestation rates in some
            areas exceed those of the Amazon, driven by illegal logging, mining, and agricultural expansion. Our
            expedition took us to forest edges where the contrast between pristine rainforest and cleared land created
            stark visual reminders of what's at stake.
          </p>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-lg">
            <div className="flex items-start">
              <TreePine className="w-6 h-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-red-900 mb-2">Conservation Crisis</h3>
                <p className="text-red-800">
                  Less than 25% of the original Chocó forest remains intact. Species like the{" "}
                  <SpeciesTooltip species={yellowThroatedToucanData}>Yellow-throated Toucan</SpeciesTooltip>, which
                  require large territories and continuous forest cover, are particularly vulnerable to habitat
                  fragmentation. Protecting remaining forest corridors is critical for the survival of the region's
                  endemic species.
                </p>
              </div>
            </div>
          </div>

          <p className="mb-6">
            Local communities play a crucial role in conservation efforts. We met with Afro-Colombian and indigenous
            groups who have protected these forests for generations, their traditional knowledge providing invaluable
            insights into sustainable forest management. Their stories reminded us that conservation in the Chocó cannot
            succeed without addressing the social and economic needs of local people.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Canopy's Hidden World</h2>

          <div className="relative aspect-[4/3] rounded-lg overflow-hidden my-8 shadow-lg">
            <OptimizedImage
              src="/images/red-lored-amazons-pair.jpg"
              alt="Red-lored Amazons (Amazona autumnalis) pair in Chocó rainforest canopy against blue sky"
              width={600}
              height={450}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-4 left-4 bg-black/70 text-white p-3 rounded-lg">
              <p className="text-sm font-medium">
                <SpeciesTooltip species={redLoredAmazonData}>Red-lored Amazons</SpeciesTooltip> (Amazona autumnalis)
              </p>
              <p className="text-xs opacity-90">Chocó canopy specialists</p>
            </div>
          </div>

          <p className="mb-6">
            Our canopy tower provided access to a world that few people ever experience—the aerial highways where
            toucans, parrots, and countless other species spend their lives. From this vantage point, we could observe
            behaviors impossible to see from the ground: the intricate social interactions of{" "}
            <SpeciesTooltip species={redLoredAmazonData}>Red-lored Amazon</SpeciesTooltip> flocks, the territorial
            displays of trogons, and the complex foraging strategies that allow multiple toucan species to coexist in
            the same forest.
          </p>

          <p className="mb-6">
            The canopy's epiphyte gardens created microhabitats within microhabitats. Bromeliads filled with rainwater
            supported entire aquatic ecosystems, while orchids and ferns created vertical meadows that extended the
            forest's growing space into three dimensions. This architectural complexity explained how the Chocó could
            support such extraordinary species diversity in a relatively small geographic area.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg">
            <h3 className="font-bold text-blue-900 mb-2">Chocó Species Highlights</h3>
            <ul className="text-blue-800 space-y-1">
              <li>
                •{" "}
                <strong>
                  <SpeciesTooltip species={yellowThroatedToucanData}>Yellow-throated Toucan</SpeciesTooltip>
                </strong>{" "}
                (<em>Ramphastos ambiguus</em>) - Flagship species
              </li>
              <li>
                •{" "}
                <strong>
                  <SpeciesTooltip species={collaredAracariData}>Collared Aracari</SpeciesTooltip>
                </strong>{" "}
                (<em>Pteroglossus torquatus</em>) - Understory specialist
              </li>
              <li>
                •{" "}
                <strong>
                  <SpeciesTooltip species={greenHoneycreeperData}>Green Honeycreeper</SpeciesTooltip>
                </strong>{" "}
                (<em>Chlorophanes spiza</em>) - Nectar specialist
              </li>
              <li>
                •{" "}
                <strong>
                  <SpeciesTooltip species={redLoredAmazonData}>Red-lored Amazon</SpeciesTooltip>
                </strong>{" "}
                (<em>Amazona autumnalis</em>) - Canopy frugivore
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Photography in the Rainforest Cathedral</h2>

          <p className="mb-6">
            Photographing in the Chocó presents unique challenges and rewards. The filtered light creates an ethereal
            quality that transforms even common species into artistic subjects, while the constant humidity tests both
            equipment and patience. Our most successful sessions occurred during brief breaks in the rain when shafts of
            sunlight illuminated the canopy, creating natural spotlights that highlighted the birds' brilliant colors.
          </p>

          <p className="mb-6">
            The <SpeciesTooltip species={yellowThroatedToucanData}>Yellow-throated Toucan's</SpeciesTooltip> portrait
            session became the expedition's highlight. After three days of patient observation, we learned the birds'
            routine well enough to position ourselves at their favorite fruiting tree just as the morning light reached
            optimal intensity. The resulting images captured not just the bird's physical beauty, but the essence of the
            Chocó itself—vibrant, mysterious, and utterly irreplaceable.
          </p>

          {/* Image Gallery */}
          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Expedition Gallery</h3>
          <ImageGallery images={galleryImages} className="mb-8" />

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">A Call to Action</h2>

          <p className="mb-6">
            As our expedition concluded and we prepared to leave this rainforest paradise, the weight of what we'd
            experienced settled upon us. The Chocó represents more than just a birding destination—it's a living
            laboratory of evolution, a climate regulator, and a cultural homeland for indigenous and Afro-Colombian
            communities.
          </p>

          <p className="mb-6">
            The <SpeciesTooltip species={yellowThroatedToucanData}>Yellow-throated Toucan</SpeciesTooltip>, with its
            magnificent presence and ecological importance, serves as an ambassador for this threatened ecosystem. Every
            sighting reminds us that we're witnessing something extraordinary and fragile—a natural heritage that could
            disappear within our lifetimes without immediate conservation action.
          </p>

          <p className="mb-8">
            For birders considering a visit to the Chocó, come with respect, travel responsibly, and understand that
            you're entering one of Earth's most precious places. The toucans are waiting, but they won't wait forever.
            The time to experience and protect the Chocó is now.
          </p>

          <div className="border-t border-gray-200 pt-8 mt-12">
            <p className="text-sm text-gray-600 italic">
              This expedition was conducted in partnership with local conservation organizations and community guides. A
              portion of all tour proceeds supports Chocó forest protection and community development programs.
            </p>
          </div>
        </div>

        {/* Related Links */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Explore the Chocó</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/tours/adventure"
              className="block p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <h4 className="font-bold text-green-900 mb-2">Chocó Expeditions</h4>
              <p className="text-green-800">Experience the world's most biodiverse rainforest with expert guides</p>
            </Link>
            <Link
              href="/tours/vision"
              className="block p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <h4 className="font-bold text-purple-900 mb-2">Rainforest Photography</h4>
              <p className="text-purple-800">Capture the beauty of toucans and other Chocó specialties</p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
