import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User, MapPin, Camera, Heart, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function SierraNevadaBlogPost() {
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
            <span className="text-gray-900">Guardians of the Sky: Birding with the Kogi and Wayuu</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/blog" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        <div className="mb-8">
          <Badge className="bg-emerald-100 text-emerald-800 mb-4">Indigenous Partnerships</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Guardians of the Sky: Birding with the Kogi and Wayuu in Sierra Nevada de Santa Marta
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
              December 15, 2024
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Sierra Nevada de Santa Marta
            </div>
            <span>8 min read</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-12 shadow-2xl">
          <Image
            src="/images/cardinal-guajiro.jpg"
            alt="Vermilion Cardinal (Cardinalis phoeniceus) - the endemic Cardinal Guajiro in its natural habitat in Sierra Nevada de Santa Marta"
            width={1200}
            height={675}
            className="object-cover w-full h-full"
            style={{ objectPosition: "center" }}
          />
          <div className="absolute bottom-4 left-4 bg-black/70 text-white p-3 rounded-lg">
            <p className="text-sm font-medium">Vermilion Cardinal (Cardinalis phoeniceus)</p>
            <p className="text-xs opacity-90">Endemic to Colombia's Caribbean coast</p>
          </div>
          <div className="absolute bottom-4 right-4 bg-black/70 text-white p-2 rounded-lg">
            <p className="text-xs opacity-90">Photo: Royann Petrell</p>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            The pre-dawn air was crisp as we began our eight-day journey through Colombia's Sierra Nevada de Santa
            Marta, the world's highest coastal mountain range. Our expedition would take us from the cloud forests of El
            Dorado to the coastal scrublands of Riohacha, working with an extraordinary team of local guides who would
            reveal both the region's incredible biodiversity and rich cultural heritage.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Our Guide Team</h2>

          <p className="mb-6">
            Our journey would unfold across eight immersive days and five distinct locations, each with its own
            specialist guide. At El Dorado Reserve, we would spend three full days with <strong>David</strong>, a cloud
            forest expert who knows every trail and endemic species. In Minca, another <strong>David</strong> would
            guide us through two days in the transitional forests. <strong>Dagoberto Rudas</strong> (
            <a
              href="https://instagram.com/dago_rdg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-700"
            >
              @dago_rdg
            </a>
            ) would lead us through two days exploring Tayrona's diverse habitats. <strong>Martin</strong> would
            facilitate our cultural exchange with the Kogi people, and finally, <strong>Yeferson Guale Epiayu</strong>{" "}
            from the Wayuu community of Kalekalemana (
            <a
              href="https://instagram.com/kalekalemana1921"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-700"
            >
              @kalekalemana1921
            </a>
            ) would guide our final day searching for the Cardinal Guajiro in Riohacha. This itinerary is available as
            part of our{" "}
            <Link href="/tours/adventure" className="text-emerald-600 hover:text-emerald-700">
              AVES Adventure Tours
            </Link>{" "}
            program.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Day 1-3: El Dorado Cloud Forest Immersion</h2>

          <p className="mb-6">
            Our expedition began with three full days in the misty cloud forests of El Dorado Reserve, where David's
            intimate knowledge of the endemic species proved invaluable. The extended stay allowed us to explore
            different trail systems at various times of day, maximizing our chances with the region's most elusive
            endemics. Day one focused on the main trails and common species, day two took us to remote areas for
            specialized endemics, and day three provided flexibility for return visits to promising locations and
            photography opportunities.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Day 4-5: Minca Transitional Zone Deep Dive</h2>

          <p className="mb-6">
            Our two days in Minca allowed for thorough exploration of the transitional zone between cloud forest and dry
            forest. The first day focused on the higher elevation trails where cloud forest species overlap with
            mid-elevation specialists. The second day took us to lower elevations and different habitat types, creating
            a comprehensive understanding of this remarkable ecological gradient. The extended time here proved crucial
            for locating mixed-species flocks and understanding seasonal bird movements.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Day 6-7: Tayrona National Park & Kogi Cultural Exchange
          </h2>

          <p className="mb-6">
            Two full days with Dagoberto in Tayrona's diverse habitats provided unparalleled access to this complex
            ecosystem. Day six focused on the coastal forests and their specialized avifauna, while day seven took us
            inland to valleys and higher elevations. The extended time allowed for both intensive birding and meaningful
            cultural exchange with the Kogi people, as Martin facilitated our respectful encounter and learning about
            traditional ecological knowledge.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Day 8: Riohacha - Cardinal Guajiro Finale</h2>

          <p className="mb-6">
            Our final day brought us to the coastal scrublands around Riohacha, where Yeferson's ancestral knowledge of
            the Wayuu territory would prove essential for finding the endemic Vermilion Cardinal. The dry forests and
            thorny scrublands of this region represent a completely different ecosystem from the cloud forests where we
            began.
          </p>

          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 my-8 rounded-r-lg">
            <div className="flex items-start">
              <Heart className="w-6 h-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-emerald-900 mb-2">Indigenous Wisdom in Conservation</h3>
                <p className="text-emerald-800">
                  "The birds are the messengers of the mountain," Yeferson explained as we walked through the dry
                  forest. "They tell us about the health of our territory, about the rains that will come, about the
                  balance we must maintain."
                </p>
              </div>
            </div>
          </div>

          <p className="mb-6">
            Yeferson's knowledge of bird behavior, passed down through generations of Wayuu tradition, proved
            invaluable. He could predict bird movements by reading subtle changes in wind patterns and vegetation,
            skills that no field guide could teach. His understanding of the Cardinal Guajiro's habits—when it feeds,
            where it nests, how it responds to seasonal changes—came from a lifetime of observation rooted in cultural
            connection to the land.
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-8">
            <div>
              <Image
                src="/images/red-lored-amazons-pair.jpg"
                alt="Red-lored Amazons (Amazona autumnalis) pair perched on palm trunk in Sierra Nevada habitat"
                width={400}
                height={300}
                className="rounded-lg shadow-lg object-cover w-full h-64"
              />
              <p className="text-sm text-gray-600 mt-2 italic">Red-lored Amazons in their Sierra Nevada habitat</p>
            </div>
            <div className="flex flex-col justify-center">
              <p className="mb-4">
                The Vermilion Cardinal, known locally as Cardinal Guajiro, represents one of Colombia's most striking
                endemic species. Found only in the dry forests and scrublands of the Caribbean coast, this brilliant red
                bird has become a symbol of the region's unique biodiversity.
              </p>
              <p>
                Our search began in the early morning hours when the cardinals are most active. Dagoberto led us through
                a network of trails known only to local communities, paths that wind through thorny scrub and
                cacti-dotted landscapes that most tourists never see.
              </p>
            </div>
          </div>

          <p className="mb-6">
            The moment came just as the sun crested the mountains. A flash of brilliant red caught our attention—there,
            perched on a flowering <em>Guaiacum officinale</em> tree, was a male Cardinal Guajiro in perfect morning
            light. The bird's crimson plumage seemed to glow against the pale yellow flowers, creating a scene that
            epitomized the magic of Colombian birding.
          </p>

          <div className="bg-gray-50 p-6 rounded-lg my-8">
            <div className="flex items-start">
              <Camera className="w-6 h-6 text-gray-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Photography Ethics in Indigenous Territories</h3>
                <p className="text-gray-700">
                  Before capturing any images, we followed protocols established with our indigenous guides. Photography
                  in sacred territories requires permission, respect, and understanding that some areas and species hold
                  special cultural significance that transcends their biological importance. For photographers
                  interested in this approach, our{" "}
                  <Link href="/tours/vision" className="text-purple-600 hover:text-purple-700">
                    AVES Vision photography workshops
                  </Link>{" "}
                  emphasize these ethical practices.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Encounter with the Blue-billed Curassow</h2>

          <p className="mb-6">
            Our second day brought us deeper into the cloud forests of the Sierra Nevada, where Dagoberto promised us an
            encounter with one of Colombia's most elusive birds: the Blue-billed Curassow (<em>Crax alberti</em>). This
            critically endangered species, endemic to Colombia, represents the ultimate prize for any serious birder
            visiting the region.
          </p>

          <p className="mb-6">
            The search required patience and respect for Kogi protocols. We were entering territories considered sacred,
            where every step required permission from traditional authorities. The Kogi understanding of forest ecology
            guided our approach—they knew exactly where the curassows would be feeding on fallen fruits in the early
            morning.
          </p>

          <div className="relative aspect-[4/3] rounded-lg overflow-hidden my-8 shadow-lg">
            <Image
              src="/images/emerald-toucanet.jpg"
              alt="Emerald Toucanet (Aulacorhynchus prasinus) in cloud forest habitat of Sierra Nevada"
              width={600}
              height={450}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-4 left-4 bg-black/70 text-white p-3 rounded-lg">
              <p className="text-sm font-medium">Emerald Toucanet (Aulacorhynchus prasinus)</p>
              <p className="text-xs opacity-90">Cloud forest specialist of the Sierra Nevada</p>
            </div>
          </div>

          <p className="mb-6">
            The moment we spotted the curassow was electric. This magnificent bird, with its distinctive blue bill and
            imposing presence, emerged from the understory like a prehistoric apparition. Watching it forage through the
            leaf litter, completely unaware of our presence, felt like witnessing a piece of Colombia's natural heritage
            that few people ever experience.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Beyond Birding: Cultural Exchange</h2>

          <p className="mb-6">
            What made this expedition truly special wasn't just the remarkable bird sightings—it was the cultural
            exchange that occurred throughout our journey. Sharing meals with Wayuu families, learning about traditional
            ecological calendars from Kogi elders, and understanding how indigenous communities view their role as
            guardians of biodiversity added profound depth to our birding experience. These cultural connections are a
            cornerstone of our{" "}
            <Link href="/tours/adventure#indigenous-partnerships" className="text-emerald-600 hover:text-emerald-700">
              indigenous partnership programs
            </Link>
            .
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-8">
            <div className="flex flex-col justify-center">
              <p className="mb-4">
                Yeferson shared stories of how his grandmother could predict weather patterns by observing bird
                behavior, knowledge that proved remarkably accurate during our expedition. When he pointed out subtle
                changes in hummingbird activity that indicated an approaching weather front, we witnessed traditional
                ecological knowledge in action.
              </p>
              <p>
                These interactions reminded us that birding in indigenous territories isn't just about adding species to
                our lists—it's about understanding the complex relationships between people, birds, and landscapes that
                have evolved over millennia.
              </p>
            </div>
            <div>
              <Image
                src="/images/green-honeycreeper-male.jpg"
                alt="Green Honeycreeper (Chlorophanes spiza) male with brilliant blue head in Sierra Nevada forest"
                width={400}
                height={300}
                className="rounded-lg shadow-lg object-cover w-full h-64"
              />
              <p className="text-sm text-gray-600 mt-2 italic">Blue-headed Parrot in the forest canopy</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conservation Through Community Partnership</h2>

          <p className="mb-6">
            Our expedition highlighted the critical importance of community-based conservation. The Kogi and Wayuu
            peoples have protected these forests for generations, not through formal conservation programs, but through
            cultural practices that recognize the intrinsic value of biodiversity.
          </p>

          <p className="mb-6">
            Working with guides like Yeferson and Dagoberto ensures that tourism revenue directly benefits local
            communities while providing economic incentives for habitat protection. This model demonstrates how
            responsible birding tourism can support both conservation goals and indigenous rights. For couples seeking a
            more intimate experience of these partnerships, our{" "}
            <Link href="/tours/souls" className="text-red-600 hover:text-red-700">
              AVES Souls retreats
            </Link>{" "}
            offer a perfect balance of birding and cultural immersion.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg">
            <h3 className="font-bold text-blue-900 mb-2">Species Highlights from Our Expedition</h3>
            <ul className="text-blue-800 space-y-1">
              <li>
                • <strong>Vermilion Cardinal</strong> (<em>Cardinalis phoeniceus</em>) - Endemic
              </li>
              <li>
                • <strong>Blue-billed Curassow</strong> (<em>Crax alberti</em>) - Critically Endangered Endemic
              </li>
              <li>
                • <strong>Santa Marta Parakeet</strong> (<em>Pyrrhura viridicata</em>) - Endemic
              </li>
              <li>
                • <strong>White-tailed Starfrontlet</strong> (<em>Coeligena phalerata</em>) - Endemic
              </li>
              <li>
                • <strong>Green Honeycreeper</strong> (<em>Chlorophanes spiza</em>)
              </li>
              <li>
                • <strong>Emerald Toucanet</strong> (<em>Aulacorhynchus prasinus</em>)
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Reflections on Responsible Birding</h2>

          <p className="mb-6">
            As we descended from the Sierra Nevada, our cameras full of images and our notebooks filled with
            observations, we carried with us something more valuable than any photograph: a deeper understanding of what
            it means to be a responsible birder in indigenous territories.
          </p>

          <p className="mb-6">
            The Sierra Nevada de Santa Marta isn't just a birding destination—it's a living landscape where culture and
            nature intertwine in ways that challenge our conventional understanding of conservation. Our guides didn't
            just show us birds; they showed us a different way of seeing the world, one where humans and nature exist in
            respectful partnership.
          </p>

          <p className="mb-8">
            For birders considering a visit to this remarkable region, remember that you're not just entering a national
            park or protected area—you're entering someone's home, someone's sacred space. Approach with respect, travel
            with indigenous guides, and understand that the most meaningful birding experiences often come not from the
            species we see, but from the people who help us see them.
          </p>

          <div className="border-t border-gray-200 pt-8 mt-12">
            <p className="text-sm text-gray-600 italic">
              Special thanks to Yeferson Guale Epiayu (@kalekalemana1921) and Dagoberto Rudas (@dago_rdg) for their
              guidance, wisdom, and friendship. Their commitment to sharing their cultural knowledge while protecting
              their ancestral territories makes experiences like this possible.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Sierra Nevada 8-Day Itinerary</h2>

        <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-emerald-50 p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-emerald-800">Our Standard 8-Day Sierra Nevada Experience</h3>
              <Link
                href="/tours/adventure/sierra-nevada"
                className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                View Full Tour Details
              </Link>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            <div className="p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mr-3">
                  1
                </span>
                <div>
                  <h4 className="font-bold">El Dorado Reserve - Day 1</h4>
                  <p className="text-gray-600">
                    Arrival and introduction to cloud forest birding, focusing on common species and orientation
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mr-3">
                  2
                </span>
                <div>
                  <h4 className="font-bold">El Dorado Reserve - Day 2</h4>
                  <p className="text-gray-600">
                    Full day exploring remote trails for endemic species with specialist guide David
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mr-3">
                  3
                </span>
                <div>
                  <h4 className="font-bold">El Dorado Reserve - Day 3</h4>
                  <p className="text-gray-600">Flexible day for photography and return visits to promising locations</p>
                </div>
              </div>
            </div>

            <div className="p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mr-3">
                  4
                </span>
                <div>
                  <h4 className="font-bold">Minca - Day 1</h4>
                  <p className="text-gray-600">
                    Higher elevation trails exploring cloud forest and mid-elevation species overlap
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mr-3">
                  5
                </span>
                <div>
                  <h4 className="font-bold">Minca - Day 2</h4>
                  <p className="text-gray-600">Lower elevation trails and different habitat types with guide David</p>
                </div>
              </div>
            </div>

            <div className="p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mr-3">
                  6
                </span>
                <div>
                  <h4 className="font-bold">Tayrona National Park - Day 1</h4>
                  <p className="text-gray-600">Coastal forests and specialized avifauna with guide Dagoberto Rudas</p>
                </div>
              </div>
            </div>

            <div className="p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mr-3">
                  7
                </span>
                <div>
                  <h4 className="font-bold">Tayrona & Kogi Cultural Exchange</h4>
                  <p className="text-gray-600">
                    Inland valleys, higher elevations, and meaningful cultural exchange with the Kogi people
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mr-3">
                  8
                </span>
                <div>
                  <h4 className="font-bold">Riohacha - Cardinal Guajiro</h4>
                  <p className="text-gray-600">
                    Coastal scrublands with Wayuu guide Yeferson Guale Epiayu searching for the endemic Vermilion
                    Cardinal
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-gray-600 text-sm">This itinerary can be customized to your preferences</p>
              <Link
                href="/contact"
                className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors"
              >
                Request Customization
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8 rounded-r-lg">
          <h3 className="font-bold text-amber-900 mb-2">Flexible Scheduling Options</h3>
          <ul className="text-amber-800 space-y-2">
            <li>
              • <strong>Photography Focus:</strong> Extended time at locations with cooperative subjects -{" "}
              <Link href="/tours/vision" className="text-purple-600 hover:text-purple-700">
                AVES Vision Tours
              </Link>
            </li>
            <li>
              • <strong>Cultural Emphasis:</strong> Additional time with indigenous communities -{" "}
              <Link href="/tours/adventure#cultural" className="text-emerald-600 hover:text-emerald-700">
                Cultural Immersion
              </Link>
            </li>
            <li>
              • <strong>Endemic Specialization:</strong> Concentrated effort on specific target species -{" "}
              <Link href="/tours/adventure#endemic" className="text-emerald-600 hover:text-emerald-700">
                Endemic Focus
              </Link>
            </li>
            <li>
              • <strong>Comfort Pacing:</strong> Relaxed schedule with afternoon rest periods -{" "}
              <Link href="/tours/elevate" className="text-yellow-600 hover:text-yellow-700">
                AVES Elevate
              </Link>
            </li>
            <li>
              • <strong>Adventure Add-ons:</strong> Optional hiking, cultural workshops, or conservation activities -{" "}
              <Link href="/tours/adventure#add-ons" className="text-emerald-600 hover:text-emerald-700">
                Adventure Add-ons
              </Link>
            </li>
          </ul>
        </div>

        {/* Related Links */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Plan Your Sierra Nevada Adventure</h3>
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600 mb-6">
              Experience the magic of the Sierra Nevada with indigenous guides and discover endemic species found
              nowhere else on Earth.
            </p>
            <Link href="/shopping?region=caribbean">
              <Button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors inline-flex items-center gap-2">
                Explore Our Sierra Nevada Tours
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/tours/adventure/sierra-nevada"
              className="block p-6 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
            >
              <h4 className="font-bold text-emerald-900 mb-2">Sierra Nevada 8-Day Itinerary</h4>
              <p className="text-emerald-800">Our signature itinerary as described in this article</p>
            </Link>
            <Link
              href="/tours/adventure"
              className="block p-6 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
            >
              <h4 className="font-bold text-emerald-900 mb-2">AVES Adventure Tours</h4>
              <p className="text-emerald-800">Experience the Sierra Nevada with expert indigenous guides</p>
            </Link>
            <Link href="/contact" className="block p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <h4 className="font-bold text-blue-900 mb-2">Custom Expeditions</h4>
              <p className="text-blue-800">Design your own indigenous community birding experience</p>
            </Link>
          </div>
        </div>

        {/* New Content */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Indigenous Perspectives on Birds</h2>
          <p className="mb-6">
            For many Indigenous communities, birds are not merely objects of scientific study but are integral parts of
            their culture, spirituality, and daily lives. Birds often feature in stories, ceremonies, and traditional
            practices. Understanding these perspectives can enrich our appreciation of birds and the environment.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Birding Locations in the Sierra Nevada</h2>
          <p className="mb-6">
            The Sierra Nevada offers numerous birding locations, each with its unique avian inhabitants. Some popular
            spots include:
          </p>
          <ul className="mb-6">
            <li>El Dorado Reserve</li>
            <li>Minca</li>
            <li>Tayrona National Park</li>
            <li>Riohacha</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Respectful Birding Practices</h2>
          <p className="mb-6">
            When birding in the Sierra Nevada, it's essential to practice responsible and respectful birding. This
            includes:
          </p>
          <ul className="mb-6">
            <li>Staying on marked trails</li>
            <li>Avoiding disturbance to nesting birds</li>
            <li>Packing out all trash</li>
            <li>Being mindful of Indigenous cultural sites</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Learning from Indigenous Communities</h2>
          <p className="mb-6">
            Engaging with Indigenous communities can provide valuable insights into bird ecology and conservation. Look
            for opportunities to participate in educational programs, workshops, or guided tours led by Indigenous
            experts.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Conclusion</h2>
          <p className="mb-8">
            Birding in the Sierra Nevada offers a unique opportunity to connect with nature and learn from Indigenous
            knowledge. By practicing respectful birding and engaging with local communities, we can contribute to the
            conservation of birds and their habitats for future generations.
          </p>
        </div>

        <div className="mt-5 text-gray-500">
          <span>Published: March 15, 2025</span>
        </div>
      </article>
      <Footer />
    </div>
  )
}
