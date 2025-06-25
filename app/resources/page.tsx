import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
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
} from "lucide-react"

export const metadata: Metadata = {
  title: "Resources | AVES Colombia",
  description:
    "Comprehensive birding resources for your Colombia adventure. Expert podcasts, travel guides, and preparation tips from leading birding authorities.",
  keywords: [
    "Colombia birding resources",
    "bird watching preparation",
    "Colombia travel guide",
    "birding podcasts",
    "bird identification",
    "Colombia wildlife",
    "eco-tourism resources",
  ],
}

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-emerald-100 p-4 rounded-full">
                <BookOpen className="w-12 h-12 text-emerald-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Birding Resources</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Everything you need to prepare for your Colombian birding adventure. From expert podcasts to comprehensive
              guides, we've curated the best resources to enhance your experience in the world's most biodiverse
              country.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                <Bird className="w-5 h-5 mr-2" />
                Start Planning Your Trip
              </Button>
              <Button size="lg" variant="outline">
                <Users className="w-5 h-5 mr-2" />
                Contact Our Experts
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <a
              href="#podcasts"
              className="flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <Headphones className="w-8 h-8 text-emerald-600 mb-2" />
              <span className="text-sm font-medium">Expert Podcasts</span>
            </a>
            <a
              href="#videos"
              className="flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <Play className="w-8 h-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium">Video Resources</span>
            </a>
            <a
              href="#guides"
              className="flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <BookOpen className="w-8 h-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium">Travel Guides</span>
            </a>
            <a
              href="#preparation"
              className="flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <MapPin className="w-8 h-8 text-orange-600 mb-2" />
              <span className="text-sm font-medium">Trip Preparation</span>
            </a>
          </div>
        </div>
      </section>

      {/* Featured Quote */}
      <section className="py-12 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <Star className="w-8 h-8 text-emerald-600" />
            </div>
            <blockquote className="text-2xl md:text-3xl font-light text-gray-800 mb-6 italic">
              "Colombia is not just a birding destination—it's THE birding destination. With over 1,900 species, it
              offers experiences you simply cannot find anywhere else on Earth."
            </blockquote>
            <p className="text-gray-600 font-medium">— Featured in American Birding Podcast</p>
          </div>
        </div>
      </section>

      {/* Expert Podcasts Section */}
      <section id="podcasts" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <Headphones className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Expert Birding Podcasts</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Listen to leading birding experts discuss Colombia's incredible avian diversity, conservation efforts,
                and the evolution of birding culture in South America's most biodiverse nation.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* American Birding Podcast - John Myers */}
              <Card className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Headphones className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Birding Means Business in Colombia</CardTitle>
                      <CardDescription>American Birding Podcast • John Myers</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Discover how Colombia has transformed into a world-class birding destination and the economic impact
                    of sustainable birding tourism on local communities.
                  </p>
                  <div className="flex gap-2 mb-4">
                    <Badge variant="secondary">Business</Badge>
                    <Badge variant="secondary">Tourism</Badge>
                    <Badge variant="secondary">Economics</Badge>
                  </div>
                  <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <a
                      href="https://www.aba.org/american-birding-podcast-birding-means-business-in-colombia-with-john-myers/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Listen to Episode
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* American Birding Podcast - Antpittas */}
              <Card className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Headphones className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Antpittas and Adventure in Colombia</CardTitle>
                      <CardDescription>American Birding Podcast • Expert Interview</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Explore the fascinating world of Colombia's endemic Antpittas and the incredible birding adventures
                    that await in the cloud forests and mountains.
                  </p>
                  <div className="flex gap-2 mb-4">
                    <Badge variant="secondary">Endemic Species</Badge>
                    <Badge variant="secondary">Cloud Forest</Badge>
                    <Badge variant="secondary">Adventure</Badge>
                  </div>
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                    <a
                      href="https://www.aba.org/antpittas-and-adventure-in-colombia/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Listen to Episode
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* American Birding Podcast - Jose Martinez */}
              <Card className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Headphones className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">The Rise of Birding Culture in Colombia</CardTitle>
                      <CardDescription>American Birding Podcast • Jose Martinez</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Learn about the cultural transformation and growing passion for birding among Colombians, and how
                    this movement is driving conservation efforts.
                  </p>
                  <div className="flex gap-2 mb-4">
                    <Badge variant="secondary">Culture</Badge>
                    <Badge variant="secondary">Conservation</Badge>
                    <Badge variant="secondary">Community</Badge>
                  </div>
                  <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                    <a
                      href="https://www.aba.org/the-rise-of-birding-culture-in-colombia-with-jose-martinez/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Listen to Episode
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Apple Podcasts - Diego Calderon - Now with embedded player */}
              <Card className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Headphones className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">The Evolution of Birding in Colombia</CardTitle>
                      <CardDescription>Apple Podcasts • Diego Calderon</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Discover how birding has evolved in Colombia from a niche hobby to a major conservation and tourism
                    force, featuring insights from local experts.
                  </p>
                  <div className="flex gap-2 mb-4">
                    <Badge variant="secondary">Evolution</Badge>
                    <Badge variant="secondary">Local Experts</Badge>
                    <Badge variant="secondary">History</Badge>
                  </div>
                  {/* Embedded Apple Podcasts Player */}
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
          </div>
        </div>
      </section>

      {/* Video Resources Section */}
      <section id="videos" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <Play className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Birding Adventure Videos</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Experience Colombia's incredible birding destinations through these immersive videos showcasing the
                country's diverse ecosystems and spectacular bird life.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
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
                    Join expert birders as they explore Colombia's Pacific jungle region, one of the most biodiverse
                    areas on Earth. Experience the thrill of discovering endemic species in their natural habitat.
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
                    <Play className="w-5 h-5 text-blue-600" />
                    Colombian Birding Expedition
                  </CardTitle>
                  <CardDescription>Expert-Led Birding Tour</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Follow along on an incredible Colombian birding expedition featuring expert guides and spectacular
                    bird encounters across diverse ecosystems.
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
                    <Play className="w-5 h-5 text-purple-600" />
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
                    <Play className="w-5 h-5 text-green-600" />
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
          </div>
        </div>
      </section>

      <Separator />

      {/* Essential Guides Section */}
      <section id="guides" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <BookOpen className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Essential Travel Guides</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive guides from leading birding and travel authorities to help you plan the perfect Colombian
                birding adventure.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
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
                        The official comprehensive guide covering Colombia's best birding sites, seasonal timing, and
                        practical travel information from the national tourism authority.
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
                    <div className="w-16 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Bird className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">Birds of Colombia</h3>
                      <p className="text-sm text-gray-500 mb-2">Comprehensive Species Database</p>
                      <p className="text-sm text-gray-600 mb-4">
                        The most complete online resource for Colombian birds, featuring detailed species information,
                        photos, sounds, and distribution maps for all 1,900+ species.
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
          </div>
        </div>
      </section>

      <Separator />

      {/* Trip Preparation Section */}
      <section id="preparation" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <MapPin className="w-10 h-10 text-purple-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trip Preparation Resources</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Expert advice and practical information to ensure you're fully prepared for your Colombian birding
                adventure.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* The Birder's Show Preparation Guide */}
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Binoculars className="w-5 h-5 text-purple-600" />
                    How to Prepare for a Birding Trip to Colombia
                  </CardTitle>
                  <CardDescription>The Birder's Show • Expert Preparation Guide</CardDescription>
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
                    Colombia's diverse geography creates distinct birding regions, each with unique species and optimal
                    visiting times.
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
                    <a href="/tours" rel="noopener noreferrer">
                      <MapPin className="w-4 h-4 mr-2" />
                      Explore Our Regional Tours
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Conservation Section */}
      <section id="conservation" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <Leaf className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Conservation & Responsible Birding</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Learn about conservation efforts in Colombia and how responsible birding tourism supports local
                communities and habitat protection.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Audubon Conservation */}
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Leaf className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">Colombia Conservation</h3>
                        <Award className="w-4 h-4 text-yellow-500" />
                      </div>
                      <p className="text-sm text-gray-500 mb-2">National Audubon Society</p>
                      <p className="text-sm text-gray-600 mb-4">
                        Learn about Audubon's conservation work in Colombia, including habitat protection, community
                        engagement, and sustainable ecotourism initiatives.
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
                    <div className="w-16 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">AVES Conservation Impact</h3>
                      <p className="text-sm text-gray-500 mb-2">Our Commitment to Colombia</p>
                      <p className="text-sm text-gray-600 mb-4">
                        Discover how AVES tours directly support local communities, habitat conservation, and scientific
                        research while providing unforgettable birding experiences.
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
                        <a href="/conservation" rel="noopener noreferrer">
                          <Leaf className="w-4 h-4 mr-2" />
                          See Our Impact
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-emerald-600 to-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Colombia's Incredible Birds?</h2>
            <p className="text-xl mb-8 opacity-90">
              Now that you're prepared with expert insights and comprehensive resources, let our experienced guides show
              you the wonders of Colombian birding firsthand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
                <Bird className="w-5 h-5 mr-2" />
                Book Your Colombian Adventure
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-emerald-600"
              >
                <Users className="w-5 h-5 mr-2" />
                Speak with Our Experts
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
