import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import {
  BookOpen,
  Headphones,
  Play,
  ExternalLink,
  MapPin,
  TelescopeIcon as Binoculars,
  Globe,
  Users,
  Leaf,
  Mountain,
  Bird,
  Star,
  Award,
  Download,
  Languages,
  Camera,
  Heart,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Resources | AVES Colombia",
  description:
    "Comprehensive birding resources for your Colombia adventure. Expert podcasts, travel guides, birding trails, and preparation tips from leading birding authorities.",
  keywords: [
    "Colombia birding resources",
    "bird watching preparation",
    "Colombia travel guide",
    "birding podcasts",
    "bird identification",
    "Colombia wildlife",
    "eco-tourism resources",
    "Audubon birding trails",
  ],
}

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader currentPage="/resources" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-emerald-100 p-4 rounded-full">
                <BookOpen className="w-12 h-12 text-emerald-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-3">Birding Resources</h1>
            <p className="text-xl text-gray-600 mb-3 leading-relaxed">
              Everything you need to prepare for your Colombian birding adventure. From expert podcasts to comprehensive
              guides and official birding trails, we've curated the best resources to enhance your experience in the
              world's most biodiverse country.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center mb-2">
              <Button size="lg" asChild>
                <a href="#resources">
                  <Bird className="w-5 h-5 mr-2" />
                  Start Planning Your Trip
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/contact">
                  <Users className="w-5 h-5 mr-2" />
                  Contact Our Experts
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Quote */}
      <section className="py-6 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-3">
              <Star className="w-8 h-8 text-emerald-600" />
            </div>
            <blockquote className="text-2xl md:text-3xl font-light text-gray-800 mb-3 italic">
              "Colombia is not just a birding destination—it's THE birding destination. With over 1,900 species, it
              offers experiences you simply cannot find anywhere else on Earth."
            </blockquote>
            <p className="text-gray-600 font-medium">— Featured in American Birding Podcast</p>
          </div>
        </div>
      </section>

      {/* Main Resources Section with Accordion */}
      <section id="resources" className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comprehensive Resource Library</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our curated collection of expert resources, organized by category for easy navigation.
              </p>
            </div>

            <Accordion type="multiple" className="w-full space-y-4">
              {/* English Expert Podcasts */}
              <AccordionItem value="podcasts-english" className="border rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Headphones className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold text-gray-900">Expert Birding Podcasts</h3>
                      <p className="text-gray-600">English-language expert interviews and discussions</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* American Birding Podcast - John Myers */}
                    <Card className="overflow-hidden">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1 border">
                            <Image
                              src="/images/logos/american-birding-podcast-logo.jpeg"
                              alt="American Birding Podcast"
                              width={40}
                              height={40}
                              className="rounded object-contain"
                            />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Birding Means Business in Colombia</CardTitle>
                            <CardDescription>American Birding Podcast • John Myers</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Discover how Colombia has transformed into a world-class birding destination and the economic
                          impact of sustainable birding tourism on local communities.
                        </p>
                        <div className="flex gap-2 mb-4">
                          <Badge variant="secondary">Business</Badge>
                          <Badge variant="secondary">Tourism</Badge>
                          <Badge variant="secondary">Economics</Badge>
                          <Badge variant="outline" className="text-xs">
                            🇺🇸 English
                          </Badge>
                        </div>
                        <div className="w-full">
                          <iframe
                            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                            frameBorder="0"
                            height="175"
                            style={{ width: "100%", maxWidth: "660px", overflow: "hidden", borderRadius: "10px" }}
                            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                            src="https://embed.podcasts.apple.com/us/podcast/03-06-birding-means-business-in-colombia-with-john-myers/id1186824033?i=1000432701676"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* American Birding Podcast - Antpittas */}
                    <Card className="overflow-hidden">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1 border">
                            <Image
                              src="/images/logos/american-birding-podcast-logo.jpeg"
                              alt="American Birding Podcast"
                              width={40}
                              height={40}
                              className="rounded object-contain"
                            />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Antpittas and Adventure in Colombia</CardTitle>
                            <CardDescription>American Birding Podcast • Expert Interview</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Explore the fascinating world of Colombia's endemic Antpittas and the incredible birding
                          adventures that await in the cloud forests and mountains.
                        </p>
                        <div className="flex gap-2 mb-4">
                          <Badge variant="secondary">Endemic Species</Badge>
                          <Badge variant="secondary">Cloud Forest</Badge>
                          <Badge variant="secondary">Adventure</Badge>
                          <Badge variant="outline" className="text-xs">
                            🇺🇸 English
                          </Badge>
                        </div>
                        <div className="w-full">
                          <iframe
                            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                            frameBorder="0"
                            height="175"
                            style={{ width: "100%", maxWidth: "660px", overflow: "hidden", borderRadius: "10px" }}
                            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                            src="https://embed.podcasts.apple.com/us/podcast/05-41-antpittas-and-adventure-in-colombia/id1186824033?i=1000538559199"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* American Birding Podcast - Jose Martinez */}
                    <Card className="overflow-hidden">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1 border">
                            <Image
                              src="/images/logos/american-birding-podcast-logo.jpeg"
                              alt="American Birding Podcast"
                              width={40}
                              height={40}
                              className="rounded object-contain"
                            />
                          </div>
                          <div>
                            <CardTitle className="text-lg">The Rise of Birding Culture in Colombia</CardTitle>
                            <CardDescription>American Birding Podcast • Jose Martinez</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Learn about the cultural transformation and growing passion for birding among Colombians, and
                          how this movement is driving conservation efforts.
                        </p>
                        <div className="flex gap-2 mb-4">
                          <Badge variant="secondary">Culture</Badge>
                          <Badge variant="secondary">Conservation</Badge>
                          <Badge variant="secondary">Community</Badge>
                          <Badge variant="outline" className="text-xs">
                            🇺🇸 English
                          </Badge>
                        </div>
                        <div className="w-full">
                          <iframe
                            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                            frameBorder="0"
                            height="175"
                            style={{ width: "100%", maxWidth: "660px", overflow: "hidden", borderRadius: "10px" }}
                            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                            src="https://embed.podcasts.apple.com/us/podcast/07-12-the-rise-of-birding-culture-in-colombia/id1186824033?i=1000605525269"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Spanish Podcasts - Aves de Colombia */}
              <AccordionItem value="podcasts-spanish" className="border rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <Languages className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold text-gray-900">Aves de Colombia Podcast</h3>
                      <p className="text-gray-600">Spanish-language expert content • 🇨🇴 Contenido en Español</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="grid lg:grid-cols-1 gap-6 mb-6">
                    {/* Season 1 Episode 1 */}
                    <Card className="overflow-hidden border-red-200">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-2 border">
                            <Image
                              src="/images/logos/aves-de-colombia-podcast-logo.png"
                              alt="Aves de Colombia Podcast"
                              width={32}
                              height={32}
                              className="rounded object-contain"
                            />
                          </div>
                          <div>
                            <CardTitle className="text-lg">AVES DE COLOMBIA - Episodio 1</CardTitle>
                            <CardDescription>Temporada 1 • Episodio Inaugural</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          El episodio inaugural de "Aves de Colombia" que marca el inicio de esta fascinante serie
                          dedicada a la avifauna colombiana y su increíble diversidad.
                        </p>
                        <div className="flex gap-2 mb-4">
                          <Badge variant="secondary">Episodio Inaugural</Badge>
                          <Badge variant="secondary">Temporada 1</Badge>
                          <Badge variant="outline" className="text-xs">
                            🇨🇴 Español
                          </Badge>
                        </div>
                        <div className="w-full">
                          <iframe
                            src="https://widget.spreaker.com/player?episode_id=18463946&theme=dark&chapters-image=true"
                            width="100%"
                            height="200px"
                            title="AVES DE COLOMBIA Episodio 1"
                            frameBorder="0"
                            className="rounded-lg"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Season 2 First Episode */}
                    <Card className="overflow-hidden border-red-200">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-2 border">
                            <Image
                              src="/images/logos/aves-de-colombia-podcast-logo.png"
                              alt="Aves de Colombia Podcast"
                              width={32}
                              height={32}
                              className="rounded object-contain"
                            />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Las aves imitadoras: engañadoras emplumadas</CardTitle>
                            <CardDescription>Temporada 2 • Primer Episodio</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Descubre el fascinante mundo de las aves imitadoras de Colombia, estas increíbles engañadoras
                          emplumadas que han perfeccionado el arte del mimetismo vocal.
                        </p>
                        <div className="flex gap-2 mb-4">
                          <Badge variant="secondary">Aves Imitadoras</Badge>
                          <Badge variant="secondary">Temporada 2</Badge>
                          <Badge variant="outline" className="text-xs">
                            🇨🇴 Español
                          </Badge>
                        </div>
                        <div className="w-full">
                          <iframe
                            src="https://widget.spreaker.com/player?episode_id=53195666&theme=dark&chapters-image=true"
                            width="100%"
                            height="200px"
                            title="Las aves imitadoras: engañadoras emplumadas entrando al juego."
                            frameBorder="0"
                            className="rounded-lg"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Season 2 Last Episode */}
                    <Card className="overflow-hidden border-red-200">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-2 border">
                            <Image
                              src="/images/logos/aves-de-colombia-podcast-logo.png"
                              alt="Aves de Colombia Podcast"
                              width={32}
                              height={32}
                              className="rounded object-contain"
                            />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Danzas y Colores: Cómo Cortejan las Aves</CardTitle>
                            <CardDescription>Temporada 2 • Episodio Final</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Explora los rituales de cortejo más espectaculares del reino aviar colombiano, donde danzas
                          elaboradas y colores vibrantes se combinan en displays únicos.
                        </p>
                        <div className="flex gap-2 mb-4">
                          <Badge variant="secondary">Cortejo</Badge>
                          <Badge variant="secondary">Comportamiento</Badge>
                          <Badge variant="outline" className="text-xs">
                            🇨🇴 Español
                          </Badge>
                        </div>
                        <div className="w-full">
                          <iframe
                            src="https://widget.spreaker.com/player?episode_id=57257506&theme=dark&chapters-image=true"
                            width="100%"
                            height="200px"
                            title="Danzas y Colores Cómo Cortejan las Aves."
                            frameBorder="0"
                            className="rounded-lg"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Life List Podcast */}
              <AccordionItem value="podcasts-lifelist" className="border rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center p-1">
                      <Image
                        src="/images/logos/life-list-logo.png"
                        alt="Life List Podcast"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold text-gray-900">Life List Podcast</h3>
                      <p className="text-gray-600">Multi-platform birding stories and expert advice</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="grid lg:grid-cols-1 gap-6 mb-6">
                    <Card className="overflow-hidden border-indigo-200">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center p-1">
                            <Image
                              src="/images/logos/life-list-logo.png"
                              alt="Life List Podcast"
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <CardTitle className="text-lg">The Evolution of Birding in Colombia</CardTitle>
                            <CardDescription>Life List: A Birding Company • Diego Calderon</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Discover how birding has evolved in Colombia from a niche hobby to a major conservation and
                          tourism force, featuring insights from local expert Diego Calderon.
                        </p>
                        <div className="flex gap-2 mb-4">
                          <Badge variant="secondary">Evolution</Badge>
                          <Badge variant="secondary">Local Experts</Badge>
                          <Badge variant="secondary">Conservation</Badge>
                          <Badge variant="outline" className="text-xs">
                            🇺🇸 English
                          </Badge>
                        </div>
                        <div className="w-full">
                          <iframe
                            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                            frameBorder="0"
                            height="175"
                            style={{ width: "100%", maxWidth: "660px", overflow: "hidden", borderRadius: "10px" }}
                            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                            src="https://embed.podcasts.apple.com/us/podcast/the-evolution-of-birding-in-colombia-with-diego-calderon/id1578168978?i=1000567878189"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="text-center">
                    <Card className="max-w-2xl mx-auto border-indigo-200">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-center mb-4">
                          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center p-2">
                            <Image
                              src="/images/logos/life-list-logo.png"
                              alt="Life List Podcast"
                              width={48}
                              height={48}
                              className="object-contain"
                            />
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">More Life List Episodes</h3>
                        <p className="text-gray-600 mb-4">
                          Explore additional episodes from the Life List Podcast featuring birding stories, expert
                          advice, and conservation insights from around the world.
                        </p>
                        <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                          <a href="https://lifelistpodcast.com/all-episodes/" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Browse All Episodes
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Video Resources */}
              <AccordionItem value="videos" className="border rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1 border">
                      <Image
                        src="/images/logos/birders-show-full-logo.png"
                        alt="The Birders Show"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold text-gray-900">The Birding Show Videos</h3>
                      <p className="text-gray-600">Expert birding content and adventure videos</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Pacific Jungle Birding Video */}
                    <Card className="overflow-hidden">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Play className="w-5 h-5 text-emerald-600" />
                          Pacific Jungle Birding Adventure
                        </CardTitle>
                        <CardDescription>Valle del Cauca, Colombia • Field Guide Experience</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Join expert birders as they explore Colombia's Pacific jungle region, one of the most
                          biodiverse areas on Earth. Experience the thrill of discovering endemic species in their
                          natural habitat.
                        </p>
                        <div className="flex gap-2 mb-4">
                          <Badge variant="secondary">Pacific Coast</Badge>
                          <Badge variant="secondary">Endemic Species</Badge>
                          <Badge variant="secondary">Jungle Birding</Badge>
                        </div>
                        <div className="aspect-video w-full">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/zy-gTRyJLiM?si=eT4GlQecKYfrmMSu"
                            title="Pacific Jungle Birding Adventure"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            className="rounded-lg"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Second Video */}
                    <Card className="overflow-hidden">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Camera className="w-5 h-5 text-blue-600" />
                          Colombian Birding Expedition
                        </CardTitle>
                        <CardDescription>Expert-Led Birding Tour</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Follow along on an incredible Colombian birding expedition featuring expert guides and
                          spectacular bird encounters across diverse ecosystems.
                        </p>
                        <div className="flex gap-2 mb-4">
                          <Badge variant="secondary">Expert Guides</Badge>
                          <Badge variant="secondary">Multi-Region</Badge>
                          <Badge variant="secondary">Bird Photography</Badge>
                        </div>
                        <div className="aspect-video w-full">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/OfimHCHfd2c?si=XQ5h1iXDlsvAl8GK"
                            title="Colombian Birding Expedition"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            className="rounded-lg"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Third Video */}
                    <Card className="overflow-hidden">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Heart className="w-5 h-5 text-purple-600" />
                          Colombia's Endemic Birds
                        </CardTitle>
                        <CardDescription>Species Spotlight & Conservation</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Explore Colombia's remarkable endemic bird species and learn about the conservation efforts
                          protecting these unique creatures and their habitats.
                        </p>
                        <div className="flex gap-2 mb-4">
                          <Badge variant="secondary">Endemic Species</Badge>
                          <Badge variant="secondary">Conservation</Badge>
                          <Badge variant="secondary">Education</Badge>
                        </div>
                        <div className="aspect-video w-full">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/y-qMGrpnQO8?si=3jyrBuUjJCDhyMIg"
                            title="Colombia's Endemic Birds"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            className="rounded-lg"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Fourth Video */}
                    <Card className="overflow-hidden">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Binoculars className="w-5 h-5 text-green-600" />
                          Birding Techniques & Tips
                        </CardTitle>
                        <CardDescription>Expert Guidance for Colombian Birding</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Learn essential birding techniques and insider tips from experienced guides to maximize your
                          Colombian birding adventure and improve your field skills.
                        </p>
                        <div className="flex gap-2 mb-4">
                          <Badge variant="secondary">Techniques</Badge>
                          <Badge variant="secondary">Field Skills</Badge>
                          <Badge variant="secondary">Expert Tips</Badge>
                        </div>
                        <div className="aspect-video w-full">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/_oT3ECFNaMI?si=oJwg7Kg7t-tuw_JH"
                            title="Birding Techniques & Tips"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            className="rounded-lg"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Audubon Birding Trails */}
              <AccordionItem value="birding-trails" className="border rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center p-1">
                      <Image
                        src="/images/logos/audubon-logo.png"
                        alt="National Audubon Society"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold text-gray-900">Official Audubon Birding Trails</h3>
                      <p className="text-gray-600">Comprehensive regional guides and itineraries</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Northern Colombia Birding Trail */}
                    <Card className="overflow-hidden border-teal-200">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center p-1">
                            <Image
                              src="/images/logos/audubon-logo.png"
                              alt="National Audubon Society"
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Northern Colombia Birding Trail</CardTitle>
                            <CardDescription>National Audubon Society • Official Guide</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Comprehensive guide to birding in northern Colombia, including the Caribbean coast, Sierra
                          Nevada de Santa Marta, and key endemic species hotspots.
                        </p>
                        <div className="flex gap-2 mb-4">
                          <Badge variant="secondary">Caribbean Coast</Badge>
                          <Badge variant="secondary">Sierra Nevada</Badge>
                          <Badge variant="secondary">Endemic Species</Badge>
                          <Badge variant="outline" className="text-xs">
                            PDF Guide
                          </Badge>
                        </div>
                        <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                          <a
                            href="https://nas-national-prod.s3.amazonaws.com/ncbt_final_0.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download Northern Trail Guide
                          </a>
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Central Andes Birding Trail */}
                    <Card className="overflow-hidden border-teal-200">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center p-1">
                            <Image
                              src="/images/logos/audubon-logo.png"
                              alt="National Audubon Society"
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Central Andes Birding Trail</CardTitle>
                            <CardDescription>National Audubon Society • Mountain Specialists</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Detailed itinerary for the Central Andes region, featuring cloud forest species, high-altitude
                          endemics, and the best birding locations around Manizales and Pereira.
                        </p>
                        <div className="flex gap-2 mb-4">
                          <Badge variant="secondary">Cloud Forest</Badge>
                          <Badge variant="secondary">High Altitude</Badge>
                          <Badge variant="secondary">Manizales</Badge>
                          <Badge variant="outline" className="text-xs">
                            PDF Guide
                          </Badge>
                        </div>
                        <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                          <a
                            href="https://nas-national-prod.s3.amazonaws.com/central_andes_itinerary.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download Central Andes Guide
                          </a>
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Eastern Andes Birding Trail */}
                    <Card className="overflow-hidden border-teal-200">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center p-1">
                            <Image
                              src="/images/logos/audubon-logo.png"
                              alt="National Audubon Society"
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Eastern Andes Birding Trail</CardTitle>
                            <CardDescription>National Audubon Society • Eastern Cordillera</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Explore the Eastern Andes with this comprehensive guide covering Bogotá surroundings, páramo
                          ecosystems, and unique high-altitude bird communities.
                        </p>
                        <div className="flex gap-2 mb-4">
                          <Badge variant="secondary">Eastern Cordillera</Badge>
                          <Badge variant="secondary">Páramo</Badge>
                          <Badge variant="secondary">Bogotá Region</Badge>
                          <Badge variant="outline" className="text-xs">
                            PDF Guide
                          </Badge>
                        </div>
                        <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                          <a
                            href="https://nas-national-prod.s3.amazonaws.com/eastern_andes_birding_trail.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download Eastern Andes Guide
                          </a>
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Southwestern Andes Birding Trail */}
                    <Card className="overflow-hidden border-teal-200">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center p-1">
                            <Image
                              src="/images/logos/audubon-logo.png"
                              alt="National Audubon Society"
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Southwestern Andes Birding Trail</CardTitle>
                            <CardDescription>National Audubon Society • Pacific Slope</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Discover the incredible biodiversity of Colombia's southwestern region, including Chocó
                          endemics, Pacific slope specialties, and the famous Farallones de Cali.
                        </p>
                        <div className="flex gap-2 mb-4">
                          <Badge variant="secondary">Chocó Endemics</Badge>
                          <Badge variant="secondary">Pacific Slope</Badge>
                          <Badge variant="secondary">Farallones</Badge>
                          <Badge variant="outline" className="text-xs">
                            PDF Guide
                          </Badge>
                        </div>
                        <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                          <a
                            href="https://nas-national-prod.s3.amazonaws.com/southwestern_andes_birding_trail.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download Southwestern Guide
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Essential Travel Guides */}
              <AccordionItem value="guides" className="border rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold text-gray-900">Essential Travel Guides</h3>
                      <p className="text-gray-600">Comprehensive planning and species information</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Colombia.travel Official Guide */}
                    <Card className="h-full">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Globe className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">Essential Guide to Bird Watching in Colombia</h3>
                              <Award className="w-4 h-4 text-yellow-500" />
                            </div>
                            <p className="text-sm text-gray-500 mb-2">Colombia.travel • Official Tourism Guide</p>
                            <p className="text-sm text-gray-600 mb-4">
                              The official comprehensive guide covering Colombia's best birding sites, seasonal timing,
                              and practical travel information from the national tourism authority.
                            </p>
                            <div className="flex items-center gap-2 mb-4">
                              <Badge variant="outline" className="text-xs">
                                Official
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Comprehensive
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Free
                              </Badge>
                            </div>
                            <Button asChild size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700">
                              <a
                                href="https://colombia.travel/en/blog/your-essential-guide-bird-watching-and-bird-sites-in-colombia"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Read Official Guide
                              </a>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Birds of Colombia */}
                    <Card className="h-full">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-20 bg-black rounded-lg flex items-center justify-center flex-shrink-0 p-2">
                            <Image
                              src="/images/logos/birds-of-colombia-logo.png"
                              alt="Birds of Colombia"
                              width={48}
                              height={48}
                              className="object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2">Birds of Colombia</h3>
                            <p className="text-sm text-gray-500 mb-2">Comprehensive Species Database</p>
                            <p className="text-sm text-gray-600 mb-4">
                              The most complete online resource for Colombian birds, featuring detailed species
                              information, photos, sounds, and distribution maps for all 1,900+ species.
                            </p>
                            <div className="flex items-center gap-2 mb-4">
                              <Badge variant="outline" className="text-xs">
                                1,900+ Species
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Photos & Sounds
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Maps
                              </Badge>
                            </div>
                            <Button asChild size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                              <a href="https://birdsofcolombia.com/" target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Explore Species Database
                              </a>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Trip Preparation */}
              <AccordionItem value="preparation" className="border rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold text-gray-900">Trip Preparation Resources</h3>
                      <p className="text-gray-600">Expert advice and practical preparation tips</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* The Birder's Show Preparation Guide */}
                    <Card className="h-full">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1 border">
                            <Image
                              src="/images/logos/birders-show-full-logo.png"
                              alt="The Birders Show"
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <CardTitle className="text-lg">How to Prepare for a Birding Trip to Colombia</CardTitle>
                            <CardDescription>The Birder's Show • Expert Preparation Guide</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Comprehensive preparation guide covering everything from equipment and packing to timing and
                          expectations for your Colombian birding adventure.
                        </p>
                        <ul className="space-y-2 text-sm mb-4">
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                            Essential equipment checklist
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                            Best timing for different regions
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                            What to expect on your first trip
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                            Photography and recording tips
                          </li>
                        </ul>
                        <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                          <a
                            href="https://thebirdersshow.com/blog/how-to-prepare-for-a-birding-trip-to-colombia"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Read Preparation Guide
                          </a>
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Regional Information */}
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Mountain className="w-5 h-5 text-green-600" />
                          Regional Birding Information
                        </CardTitle>
                        <CardDescription>Climate, Timing & Species Highlights</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Colombia's diverse geography creates distinct birding regions, each with unique species and
                          optimal visiting times.
                        </p>
                        <ul className="space-y-2 text-sm mb-4">
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                            Andean cloud forests (2,000-3,500m)
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                            Caribbean coastal lowlands
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                            Pacific slope rainforests
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                            Eastern plains (Llanos)
                          </li>
                        </ul>
                        <Button asChild variant="outline" className="w-full">
                          <a href="/tours">
                            <MapPin className="w-4 h-4 mr-2" />
                            Explore Our Regional Tours
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Conservation & Responsible Birding */}
              <AccordionItem value="conservation" className="border rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold text-gray-900">Conservation & Responsible Birding</h3>
                      <p className="text-gray-600">Supporting communities and habitat protection</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Audubon Conservation */}
                    <Card className="h-full">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-20 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0 p-2">
                            <Image
                              src="/images/logos/audubon-logo.png"
                              alt="National Audubon Society"
                              width={48}
                              height={48}
                              className="object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">Colombia Conservation</h3>
                              <Award className="w-4 h-4 text-yellow-500" />
                            </div>
                            <p className="text-sm text-gray-500 mb-2">National Audubon Society</p>
                            <p className="text-sm text-gray-600 mb-4">
                              Learn about Audubon's conservation work in Colombia, including habitat protection,
                              community engagement, and sustainable ecotourism initiatives.
                            </p>
                            <div className="flex items-center gap-2 mb-4">
                              <Badge variant="outline" className="text-xs">
                                Conservation
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Habitat Protection
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Community
                              </Badge>
                            </div>
                            <Button asChild size="sm" className="w-full bg-green-600 hover:bg-green-700">
                              <a
                                href="https://www.audubon.org/conservation/americas/ecotourism/colombia"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Learn About Conservation
                              </a>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* AVES Conservation Impact */}
                    <Card className="h-full">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-20 bg-white rounded-lg flex items-center justify-center flex-shrink-0 p-2 border">
                            <Image
                              src="/images/logos/aves-logo.png"
                              alt="AVES Colombia"
                              width={48}
                              height={48}
                              className="object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2">AVES Conservation Impact</h3>
                            <p className="text-sm text-gray-500 mb-2">Our Commitment to Colombia</p>
                            <p className="text-sm text-gray-600 mb-4">
                              Discover how AVES tours directly support local communities, habitat conservation, and
                              scientific research while providing unforgettable birding experiences.
                            </p>
                            <div className="flex items-center gap-2 mb-4">
                              <Badge variant="outline" className="text-xs">
                                Local Impact
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Research Support
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                B Corp
                              </Badge>
                            </div>
                            <Button asChild size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700">
                              <a href="/conservation">
                                <Leaf className="w-4 h-4 mr-2" />
                                See Our Impact
                              </a>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-emerald-600 to-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Colombia's Incredible Birds?</h2>
            <p className="text-xl mb-6 opacity-90">
              Now that you're prepared with expert insights, comprehensive resources, and official birding trails, let
              our experienced guides show you the wonders of Colombian birding firsthand.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100" asChild>
                <a href="/tours">
                  <Bird className="w-5 h-5 mr-2" />
                  Book Your Colombian Adventure
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-emerald-600"
                asChild
              >
                <a href="/contact">
                  <Users className="w-5 h-5 mr-2" />
                  Speak with Our Experts
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
