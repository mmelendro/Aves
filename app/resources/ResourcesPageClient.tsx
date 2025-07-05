"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import {
  BookOpen,
  Headphones,
  Play,
  ExternalLink,
  MapPin,
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
  Search,
  TrendingUp,
  CheckCircle,
  Video,
  Coffee,
  TreePine,
} from "lucide-react"

export default function ResourcesPageClient() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader currentPage="/resources" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-emerald-100 p-4 rounded-full">
                <BookOpen className="w-12 h-12 text-emerald-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Expert Resources Hub</h1>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Your comprehensive birding resource center. From expert podcasts to official guides, preparation tips, and
              conservation insights—everything you need for your Colombian birding adventure.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <button
                onClick={() => {
                  // Switch to learning tab
                  const learningTab = document.querySelector('[data-state="inactive"][value="learning"]') as HTMLElement
                  if (learningTab) learningTab.click()
                  // Wait for tab switch then scroll
                  setTimeout(() => {
                    document.getElementById("podcasts-section")?.scrollIntoView({ behavior: "smooth" })
                  }, 100)
                }}
                className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="text-2xl font-bold text-emerald-600">15+</div>
                <div className="text-sm text-gray-600">Expert Podcasts</div>
              </button>
              <button
                onClick={() => document.getElementById("audubon-trails")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="text-2xl font-bold text-blue-600">4</div>
                <div className="text-sm text-gray-600">Official Trails</div>
              </button>
              <button
                onClick={() => {
                  // Switch to guides tab
                  const guidesTab = document.querySelector('[data-state="inactive"][value="guides"]') as HTMLElement
                  if (guidesTab) guidesTab.click()
                  // Wait for tab switch then scroll to top of guides section
                  setTimeout(() => {
                    document.getElementById("resources")?.scrollIntoView({ behavior: "smooth" })
                  }, 100)
                }}
                className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="text-2xl font-bold text-purple-600">7+</div>
                <div className="text-sm text-gray-600">Video Guides</div>
              </button>
              <button
                onClick={() => (window.location.href = "/avifauna-explorer")}
                className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="text-2xl font-bold text-orange-600">1,900+</div>
                <div className="text-sm text-gray-600">Bird Species</div>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild>
                <a href="#resources">
                  <Bird className="w-5 h-5 mr-2" />
                  Explore Resources
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
      <section className="py-8 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <Star className="w-8 h-8 text-emerald-600" />
            </div>
            <blockquote className="text-2xl md:text-3xl font-light text-gray-800 mb-4 italic">
              "Colombia is not just a birding destination—it's THE birding destination. With over 1,900 species, it
              offers experiences you simply cannot find anywhere else on Earth."
            </blockquote>
            <p className="text-gray-600 font-medium">— Featured in American Birding Podcast</p>
          </div>
        </div>
      </section>

      {/* Main Resources Section with Tabs */}
      <section id="resources" className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comprehensive Resource Library</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                Explore our curated collection of expert resources, organized by your birding journey stage.
              </p>

              {/* Search Bar */}
              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search resources..." className="pl-10 pr-4 py-2" />
              </div>
            </div>

            <Tabs defaultValue="planning" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="planning" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="hidden sm:inline">Trip Planning</span>
                  <span className="sm:hidden">Plan</span>
                </TabsTrigger>
                <TabsTrigger value="learning" className="flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  <span className="hidden sm:inline">Learning</span>
                  <span className="sm:hidden">Learn</span>
                </TabsTrigger>
                <TabsTrigger value="guides" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Field Guides</span>
                  <span className="sm:hidden">Guides</span>
                </TabsTrigger>
                <TabsTrigger value="conservation" className="flex items-center gap-2">
                  <Leaf className="w-4 h-4" />
                  <span className="hidden sm:inline">Conservation</span>
                  <span className="sm:hidden">Impact</span>
                </TabsTrigger>
              </TabsList>

              {/* Trip Planning Tab */}
              <TabsContent value="planning" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Official Audubon Trails */}
                  <Card className="col-span-full" id="audubon-trails">
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
                          <CardTitle className="text-xl">Official Audubon Birding Trails</CardTitle>
                          <CardDescription>Comprehensive regional guides and itineraries</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card className="border-teal-200">
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2">Northern Colombia</h4>
                            <p className="text-sm text-gray-600 mb-3">Caribbean coast & Sierra Nevada</p>
                            <div className="flex gap-1 mb-3">
                              <Badge variant="outline" className="text-xs">
                                Caribbean
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Endemic
                              </Badge>
                            </div>
                            <Button asChild size="sm" className="w-full bg-teal-600 hover:bg-teal-700">
                              <a
                                href="https://nas-national-prod.s3.amazonaws.com/ncbt_final_0.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Download className="w-3 h-3 mr-1" />
                                Download
                              </a>
                            </Button>
                          </CardContent>
                        </Card>

                        <Card className="border-teal-200">
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2">Central Andes</h4>
                            <p className="text-sm text-gray-600 mb-3">Cloud forests & high altitude</p>
                            <div className="flex gap-1 mb-3">
                              <Badge variant="outline" className="text-xs">
                                Cloud Forest
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Manizales
                              </Badge>
                            </div>
                            <Button asChild size="sm" className="w-full bg-teal-600 hover:bg-teal-700">
                              <a
                                href="https://nas-national-prod.s3.amazonaws.com/central_andes_itinerary.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Download className="w-3 h-3 mr-1" />
                                Download
                              </a>
                            </Button>
                          </CardContent>
                        </Card>

                        <Card className="border-teal-200">
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2">Eastern Andes</h4>
                            <p className="text-sm text-gray-600 mb-3">Páramo ecosystems & Bogotá</p>
                            <div className="flex gap-1 mb-3">
                              <Badge variant="outline" className="text-xs">
                                Páramo
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Bogotá
                              </Badge>
                            </div>
                            <Button asChild size="sm" className="w-full bg-teal-600 hover:bg-teal-700">
                              <a
                                href="https://nas-national-prod.s3.amazonaws.com/eastern_andes_birding_trail.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Download className="w-3 h-3 mr-1" />
                                Download
                              </a>
                            </Button>
                          </CardContent>
                        </Card>

                        <Card className="border-teal-200">
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2">Southwestern Andes</h4>
                            <p className="text-sm text-gray-600 mb-3">Chocó endemics & Pacific slope</p>
                            <div className="flex gap-1 mb-3">
                              <Badge variant="outline" className="text-xs">
                                Chocó
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Pacific
                              </Badge>
                            </div>
                            <Button asChild size="sm" className="w-full bg-teal-600 hover:bg-teal-700">
                              <a
                                href="https://nas-national-prod.s3.amazonaws.com/southwestern_andes_birding_trail.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Download className="w-3 h-3 mr-1" />
                                Download
                              </a>
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Trip Preparation */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-orange-600" />
                        Trip Preparation Guide
                      </CardTitle>
                      <CardDescription>Expert preparation advice from The Birder's Show</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        Comprehensive preparation guide covering equipment, timing, and expectations for your Colombian
                        birding adventure.
                      </p>
                      <ul className="space-y-2 text-sm mb-4">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Essential equipment checklist
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Best timing for different regions
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Photography and recording tips
                        </li>
                      </ul>
                      <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
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
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Mountain className="w-5 h-5 text-green-600" />
                        Regional Birding Information
                      </CardTitle>
                      <CardDescription>Climate, timing & species highlights</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        Colombia's diverse geography creates distinct birding regions, each with unique species and
                        optimal visiting times.
                      </p>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                          <Mountain className="w-4 h-4 text-green-600" />
                          <span className="text-sm">Andean cloud forests (2,000-3,500m)</span>
                        </div>
                        <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                          <Globe className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">Caribbean coastal lowlands</span>
                        </div>
                        <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                          <Leaf className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm">Pacific slope rainforests</span>
                        </div>
                      </div>
                      <Button asChild variant="outline" className="w-full bg-transparent">
                        <a href="/tours">
                          <MapPin className="w-4 h-4 mr-2" />
                          Explore Our Regional Tours
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Learning Tab - Restructured with all video content */}
              <TabsContent value="learning" className="space-y-6">
                <div className="space-y-8">
                  {/* Expert Podcasts Section */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* English Podcasts */}
                    <Card id="podcasts-section">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <Headphones className="w-6 h-6 text-emerald-600" />
                          </div>
                          <div>
                            <CardTitle>Expert Birding Podcasts</CardTitle>
                            <CardDescription>English-language expert interviews</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="border rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <Image
                                src="/images/logos/american-birding-podcast-logo.jpeg"
                                alt="American Birding Podcast"
                                width={32}
                                height={32}
                                className="rounded"
                              />
                              <div>
                                <h4 className="font-semibold text-sm">Birding Means Business in Colombia</h4>
                                <p className="text-xs text-gray-500">American Birding Podcast</p>
                              </div>
                            </div>
                            <div className="flex gap-1 mb-2">
                              <Badge variant="outline" className="text-xs">
                                Business
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Tourism
                              </Badge>
                            </div>
                            <iframe
                              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                              frameBorder="0"
                              height="120"
                              style={{ width: "100%", overflow: "hidden", borderRadius: "6px" }}
                              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                              src="https://embed.podcasts.apple.com/us/podcast/03-06-birding-means-business-in-colombia-with-john-myers/id1186824033?i=1000432701676"
                            />
                          </div>

                          <div className="border rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <Image
                                src="/images/logos/life-list-logo.png"
                                alt="Life List Podcast"
                                width={32}
                                height={32}
                                className="rounded"
                              />
                              <div>
                                <h4 className="font-semibold text-sm">Evolution of Birding in Colombia</h4>
                                <p className="text-xs text-gray-500">Life List Podcast</p>
                              </div>
                            </div>
                            <div className="flex gap-1 mb-2">
                              <Badge variant="outline" className="text-xs">
                                Evolution
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Local Experts
                              </Badge>
                            </div>
                            <iframe
                              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                              frameBorder="0"
                              height="120"
                              style={{ width: "100%", overflow: "hidden", borderRadius: "6px" }}
                              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                              src="https://embed.podcasts.apple.com/us/podcast/the-evolution-of-birding-in-colombia-with-diego-calderon/id1578168978?i=1000567878189"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Spanish Podcasts */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <Languages className="w-6 h-6 text-red-600" />
                          </div>
                          <div>
                            <CardTitle>Aves de Colombia Podcast</CardTitle>
                            <CardDescription>🇨🇴 Contenido en Español</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="border rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <Image
                                src="/images/logos/aves-de-colombia-podcast-logo.png"
                                alt="Aves de Colombia"
                                width={32}
                                height={32}
                                className="rounded"
                              />
                              <div>
                                <h4 className="font-semibold text-sm">AVES DE COLOMBIA - Episodio 1</h4>
                                <p className="text-xs text-gray-500">Temporada 1 • Episodio Inaugural</p>
                              </div>
                            </div>
                            <iframe
                              src="https://widget.spreaker.com/player?episode_id=18463946&theme=light&chapters-image=true"
                              width="100%"
                              height="120px"
                              title="AVES DE COLOMBIA Episodio 1"
                              frameBorder="0"
                              className="rounded"
                            />
                          </div>

                          <div className="border rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <Image
                                src="/images/logos/aves-de-colombia-podcast-logo.png"
                                alt="Aves de Colombia"
                                width={32}
                                height={32}
                                className="rounded"
                              />
                              <div>
                                <h4 className="font-semibold text-sm">Las aves imitadoras</h4>
                                <p className="text-xs text-gray-500">Temporada 2 • Primer Episodio</p>
                              </div>
                            </div>
                            <iframe
                              src="https://widget.spreaker.com/player?episode_id=53195666&theme=light&chapters-image=true"
                              width="100%"
                              height="120px"
                              title="Las aves imitadoras"
                              frameBorder="0"
                              className="rounded"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Video Learning Resources - Consolidated Section */}
                  <Card id="video-series">
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
                          <CardTitle>The Birding Show - Complete Video Series</CardTitle>
                          <CardDescription>Expert birding content and field guides from Colombia</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Toucan and Hummingbird Heaven */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Play className="w-4 h-4 text-emerald-600" />
                            <h4 className="font-semibold">Toucan and Hummingbird Heaven</h4>
                          </div>
                          <div className="aspect-video">
                            <iframe
                              width="100%"
                              height="100%"
                              src="https://www.youtube.com/embed/y-qMGrpnQO8?si=3jyrBuUjJCDhyMIg"
                              title="Toucan and Hummingbird Heaven | Caldas, Colombia | Field Guides"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                              className="rounded-lg"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="secondary">Caldas</Badge>
                            <Badge variant="secondary">Toucans</Badge>
                            <Badge variant="secondary">Hummingbirds</Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            Explore the incredible diversity of toucans and hummingbirds in Colombia's coffee region.
                          </p>
                        </div>

                        {/* Colombia's Coolest Hummingbird */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Camera className="w-4 h-4 text-blue-600" />
                            <h4 className="font-semibold">Colombia's Coolest Hummingbird?</h4>
                          </div>
                          <div className="aspect-video">
                            <iframe
                              width="100%"
                              height="100%"
                              src="https://www.youtube.com/embed/_oT3ECFNaMI?si=oJwg7Kg7t-tuw_JH"
                              title="Is This Colombia's Coolest Hummingbird? | Caldas, Colombia | Field Guides"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                              className="rounded-lg"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="secondary">Caldas</Badge>
                            <Badge variant="secondary">Endemic</Badge>
                            <Badge variant="secondary">Hummingbird</Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            Discover one of Colombia's most spectacular hummingbird species in the cloud forests.
                          </p>
                        </div>

                        {/* Coffee Region Birding */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Coffee className="w-4 h-4 text-amber-600" />
                            <h4 className="font-semibold">Birding in the Coffee Region</h4>
                          </div>
                          <div className="aspect-video">
                            <iframe
                              width="100%"
                              height="100%"
                              src="https://www.youtube.com/embed/OfimHCHfd2c?si=XQ5h1iXDlsvAl8GK"
                              title="Birding in the Coffee Region | Caldas, Colombia | Field Guides"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                              className="rounded-lg"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="secondary">Coffee Region</Badge>
                            <Badge variant="secondary">Multi-Species</Badge>
                            <Badge variant="secondary">Expert Guides</Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            Complete guide to birding in Colombia's famous coffee-growing region of Caldas.
                          </p>
                        </div>

                        {/* Pacific Jungle Adventure */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 mb-2">
                            <TreePine className="w-4 h-4 text-green-600" />
                            <h4 className="font-semibold">Pacific Jungle Birding Adventure</h4>
                          </div>
                          <div className="aspect-video">
                            <iframe
                              width="100%"
                              height="100%"
                              src="https://www.youtube.com/embed/zy-gTRyJLiM?si=eT4GlQecKYfrmMSu"
                              title="Birding Adventures in Colombia's Pacific Jungle | Valle del Cauca, Colombia | Field Guides"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                              className="rounded-lg"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="secondary">Pacific Coast</Badge>
                            <Badge variant="secondary">Valle del Cauca</Badge>
                            <Badge variant="secondary">Rainforest</Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            Adventure through Colombia's biodiverse Pacific jungle and its incredible bird life.
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Video className="w-5 h-5 text-blue-600" />
                          <h4 className="font-semibold text-blue-900">Complete Video Series</h4>
                        </div>
                        <p className="text-sm text-blue-800 mb-3">
                          These four episodes provide comprehensive coverage of Colombia's most important birding
                          regions, from the coffee-growing highlands to the Pacific rainforests.
                        </p>
                        <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <a href="https://thebirdersshow.com/" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Visit The Birding Show Channel
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Field Guides Tab */}
              <TabsContent value="guides" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Colombia.travel Official Guide */}
                  <Card>
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
                            and practical travel information.
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

                  {/* Birds of Colombia Database */}
                  <Card id="species-database">
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
                            information, photos, sounds, and distribution maps.
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

                  {/* McMullan Birding Field Guides */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">McMullan Birding Field Guides</h3>
                          <p className="text-sm text-gray-500 mb-2">Professional Field Guide Collection</p>
                          <p className="text-sm text-gray-600 mb-4">
                            Comprehensive collection of professional field guides and birding books, including
                            specialized guides for Colombian birds and Neotropical species.
                          </p>
                          <div className="flex items-center gap-2 mb-4">
                            <Badge variant="outline" className="text-xs">
                              Field Guides
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Professional
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Neotropical
                            </Badge>
                          </div>
                          <Button asChild size="sm" className="w-full bg-amber-600 hover:bg-amber-700">
                            <a href="https://mcmullanbirding.com/libros/" target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Browse Field Guide Collection
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Interactive Tools */}
                  <Card className="col-span-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                        Interactive Exploration Tools
                      </CardTitle>
                      <CardDescription>Discover Colombia's incredible biodiversity</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Card className="border-purple-200">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-2xl">🦅</span>
                              <div>
                                <h4 className="font-semibold">Avifauna Explorer</h4>
                                <p className="text-sm text-gray-600">1,900+ Colombian bird species</p>
                              </div>
                            </div>
                            <Button asChild variant="outline" className="w-full bg-transparent">
                              <a href="/avifauna-explorer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Explore Species
                              </a>
                            </Button>
                          </CardContent>
                        </Card>

                        <Card className="border-purple-200">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-2xl">🗺️</span>
                              <div>
                                <h4 className="font-semibold">Interactive Bioregions</h4>
                                <p className="text-sm text-gray-600">Explore Colombia's ecosystems</p>
                              </div>
                            </div>
                            <Button asChild variant="outline" className="w-full bg-transparent">
                              <a href="/bioregions">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Explore Regions
                              </a>
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Conservation Tab - Updated with National Geographic video */}
              <TabsContent value="conservation" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Audubon Conservation */}
                  <Card>
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
                  <Card>
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

                  {/* Conservation Videos */}
                  <Card className="col-span-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-purple-600" />
                        Conservation Stories & Impact
                      </CardTitle>
                      <CardDescription>Understanding Colombia's conservation efforts and biodiversity</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Birdwatching with FARC | National Geographic */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Globe className="w-4 h-4 text-blue-600" />
                            <h4 className="font-semibold">Birdwatching with FARC | National Geographic</h4>
                          </div>
                          <div className="aspect-video">
                            <iframe
                              width="100%"
                              height="100%"
                              src="https://www.youtube.com/embed/ZF9rfNphh5I?start=26"
                              title="Birdwatching with FARC | National Geographic"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                              className="rounded-lg"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="secondary">National Geographic</Badge>
                            <Badge variant="secondary">Peace Process</Badge>
                            <Badge variant="secondary">Conservation</Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            A powerful National Geographic documentary exploring how Colombia's peace process has opened
                            new opportunities for conservation and birdwatching, featuring former FARC members who now
                            protect biodiversity in previously inaccessible regions.
                          </p>
                        </div>

                        {/* The Importance of Avitourism for Conservation */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Heart className="w-4 h-4 text-red-600" />
                            <h4 className="font-semibold">The Importance of Avitourism for Conservation</h4>
                          </div>
                          <div className="aspect-video">
                            <iframe
                              width="100%"
                              height="100%"
                              src="https://www.youtube.com/embed/ONDXPGaDN40?start=114"
                              title="The Importance of Avitourism for Conservation – Bird Watching Colombia"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                              className="rounded-lg"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="secondary">Avitourism</Badge>
                            <Badge variant="secondary">Conservation Impact</Badge>
                            <Badge variant="secondary">Sustainable Tourism</Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            Discover how bird watching tourism creates powerful economic incentives for conservation in
                            Colombia, directly supporting local communities while protecting critical habitats and
                            endangered species through sustainable ecotourism practices.
                          </p>
                        </div>

                        {/* The case for a birdwatching vacation | TEDx */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="w-4 h-4 text-purple-600" />
                            <h4 className="font-semibold">The Case for a Birdwatching Vacation</h4>
                          </div>
                          <div className="aspect-video">
                            <iframe
                              width="100%"
                              height="100%"
                              src="https://www.youtube.com/embed/DVBDf0rYYbQ"
                              title="The case for a birdwatching vacation | Natalia Ocampo-Peñuela | TEDxSantaCruz"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                              className="rounded-lg"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="secondary">TEDx Talk</Badge>
                            <Badge variant="secondary">Travel Benefits</Badge>
                            <Badge variant="secondary">Conservation Science</Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            Conservation scientist Natalia Ocampo-Peñuela presents a compelling TEDx talk on why
                            birdwatching vacations offer unique benefits for both travelers and conservation. Discover
                            how birding tourism creates meaningful connections with nature while supporting scientific
                            research and local communities.
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Leaf className="w-5 h-5 text-green-600" />
                          <h4 className="font-semibold text-green-900">Conservation Through Ecotourism</h4>
                        </div>
                        <p className="text-sm text-green-800 mb-3">
                          These videos highlight how responsible birding and ecotourism directly contribute to
                          conservation efforts, community development, and habitat protection in Colombia.
                        </p>
                        <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
                          <a href="/conservation">
                            <Heart className="w-4 h-4 mr-2" />
                            Learn About Our Conservation Impact
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
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
                className="border-white text-white hover:bg-white hover:text-emerald-600 bg-transparent"
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
