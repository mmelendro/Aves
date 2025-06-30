"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Globe, Instagram } from "lucide-react"
import Link from "next/link"
import OptimizedImage from "@/components/optimized-image"
import { Footer } from "@/components/footer"
import { NavigationHeader } from "@/components/navigation-header"

export default function TeamPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader currentPage="/team" />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Meet the passionate ornithologists, indigenous guides, and conservation experts who make AVES expeditions
            extraordinary. Our team combines scientific expertise with deep cultural knowledge and unwavering commitment
            to sustainable birding tourism.
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Expert Guides</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team brings together scientific expertise, traditional ecological knowledge, and deep cultural
              connections to create extraordinary birding experiences throughout Colombia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Martin Melendro - Founder & Lead Guide */}
            <div id="martin-melendro" className="bg-gray-50 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                  <OptimizedImage
                    src="/images/martin-melendro.jpg"
                    alt="Martin Melendro - AVES Founder and Lead Ornithologist"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <Badge className="bg-emerald-100 text-emerald-800 mb-2">Founder & Lead Guide</Badge>
                <h3 className="text-xl font-bold text-gray-900">Martin Melendro</h3>
                <p className="text-emerald-600 font-medium">AVES Founder & Lead Expedition Guide</p>
              </div>

              <div className="space-y-4 text-gray-700 text-sm">
                <p>
                  Martin is AVES' founder and lead expedition guide, with over 15 years of experience exploring
                  Colombia's diverse ecosystems. A passionate birding guide and conservation advocate, he specializes in
                  creating transformative birding experiences that emphasize cultural exchange and conservation
                  education.
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Expertise:</h4>
                  <ul className="space-y-1">
                    <li>• High-altitude páramo birding</li>
                    <li>• Indigenous community partnerships</li>
                    <li>• Endemic species conservation</li>
                    <li>• Sustainable tourism development</li>
                    <li>• Bird photography and field research</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Based in Bogotá, Colombia</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>15+ years experience</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Globe className="w-4 h-4 mr-2" />
                    <span>Spanish, English</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Globe className="w-4 h-4 mr-2" />
                    <a
                      href="https://ebird.org/profile/NDc2OTE5OA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700 transition-colors font-medium"
                    >
                      View eBird Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Yeferson Guale Epiayu */}
            <div id="yeferson-guale-epiayu" className="bg-gray-50 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                  <OptimizedImage
                    src="/images/yeferson-guale-epiayu.png"
                    alt="Yeferson Guale Epiayu - Wayuu Community Guide specializing in Sierra Nevada de Santa Marta"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    style={{ objectFit: "cover" }}
                    fallback="/images/manakin-1.jpg"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Yeferson Guale Epiayu</h3>
                <p className="text-emerald-600 font-medium">Wayuu Community Guide</p>
              </div>

              <div className="space-y-4 text-gray-700 text-sm">
                <p>
                  Yeferson represents the Wayuu community of Kalekalemana and serves as our primary guide in the Sierra
                  Nevada de Santa Marta. His deep knowledge of Cardinal Guajiro behavior and traditional ecological
                  calendars makes him invaluable for our Sierra Nevada expeditions.
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Expertise:</h4>
                  <ul className="space-y-1">
                    <li>• Wayuu traditional ecological knowledge</li>
                    <li>• Cardinal Guajiro specialist</li>
                    <li>• Weather pattern prediction</li>
                    <li>• Cultural interpretation</li>
                  </ul>
                </div>

                <div className="flex items-center text-gray-600">
                  <Instagram className="w-4 h-4 mr-2" />
                  <a
                    href="https://instagram.com/kalekalemana1921"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-600 transition-colors"
                  >
                    @kalekalemana1921
                  </a>
                </div>
              </div>
            </div>

            {/* Dagoberto Rudas */}
            <div id="dagoberto-rudas" className="bg-gray-50 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                  <OptimizedImage
                    src="/images/dagoberto-rudas.png"
                    alt="Dagoberto Rudas - Tayrona Community Guide specializing in cloud forest birding"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Dagoberto Rudas</h3>
                <p className="text-blue-600 font-medium">Tayrona Community Guide</p>
              </div>

              <div className="space-y-4 text-gray-700 text-sm">
                <p>
                  Dagoberto brings extensive knowledge of the Tayrona region and specializes in cloud forest birding.
                  His expertise in locating Blue-billed Curassows and understanding Kogi forest protocols makes him
                  essential for our Sierra Nevada cloud forest expeditions.
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Expertise:</h4>
                  <ul className="space-y-1">
                    <li>• Cloud forest navigation</li>
                    <li>• Blue-billed Curassow specialist</li>
                    <li>• Kogi cultural protocols</li>
                    <li>• Forest ecology interpretation</li>
                  </ul>
                </div>

                <div className="flex items-center text-gray-600">
                  <Instagram className="w-4 h-4 mr-2" />
                  <a
                    href="https://instagram.com/dago_rdg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors"
                  >
                    @dago_rdg
                  </a>
                </div>
              </div>
            </div>

            {/* Gleison Fernando Guarin Largo */}
            <div id="gleison-guarin" className="bg-gray-50 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                  <OptimizedImage
                    src="/images/gleison-guarin.png"
                    alt="Gleison Fernando Guarin Largo - Tatamá National Park Specialist and acoustic ornithologist"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Gleison Fernando Guarin Largo</h3>
                <p className="text-green-600 font-medium">Tatamá National Park Specialist</p>
              </div>

              <div className="space-y-4 text-gray-700 text-sm">
                <p>
                  Gleison is part of the family that owns Montezuma Ecolodge in Tatamá National Park, Chocó. An
                  exceptional acoustic ornithologist, he can identify over 1,000 bird species by their sounds alone. His
                  expertise in the region's endemic species makes him invaluable for our Chocó expeditions.
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Expertise:</h4>
                  <ul className="space-y-1">
                    <li>• Acoustic bird identification (1000+ species)</li>
                    <li>• Chocó endemic species specialist</li>
                    <li>• Cornell University collaborator</li>
                    <li>• Sound recording and documentation</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Instagram className="w-4 h-4 mr-2" />
                    <a
                      href="https://instagram.com/gleisonguarin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-green-600 transition-colors"
                    >
                      @gleisonguarin
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Montezuma Ecolodge, Tatamá National Park</span>
                  </div>
                </div>
              </div>
            </div>

            {/* David Jara */}
            <div id="david-jara" className="bg-gray-50 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                  <OptimizedImage
                    src="/images/david-jara.png"
                    alt="David Jara - El Dorado Cloud Forest Guide and multi-regional tour leader"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">David Jara</h3>
                <p className="text-purple-600 font-medium">El Dorado Cloud Forest Guide & Tour Leader</p>
              </div>

              <div className="space-y-4 text-gray-700 text-sm">
                <p>
                  David Jara is our expert tour leader for El Dorado Reserve's cloud forest ecosystem and beyond. With
                  over a decade of experience in the Sierra Nevada's montane forests, he has an unmatched ability to
                  locate the region's most elusive endemic species in challenging weather conditions.
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Expertise:</h4>
                  <ul className="space-y-1">
                    <li>• Cloud forest endemic species</li>
                    <li>• Montane ecosystem navigation</li>
                    <li>• Multi-region tour leadership</li>
                    <li>• Weather pattern interpretation</li>
                    <li>• High-altitude birding techniques</li>
                    <li>• Cross-operator collaboration</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Instagram className="w-4 h-4 mr-2" />
                    <a
                      href="https://www.instagram.com/davidjara20/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-purple-600 transition-colors font-medium"
                    >
                      @davidjara20
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Globe className="w-4 h-4 mr-2" />
                    <a
                      href="https://ebird.org/profile/MTA2NjQxMA/CO-MET"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-700 transition-colors font-medium"
                    >
                      View eBird Profile
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>El Dorado Reserve & Multi-Regional Tours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* David Faunal */}
            <div id="david-faunal" className="bg-gray-50 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                  <OptimizedImage
                    src="/images/david-faunal-birds-reserve.jpg"
                    alt="Birds at David Faunal's Observatorio de Aves de Minca - showcasing the diverse avian life at the reserve"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    style={{ objectFit: "cover" }}
                    fallback="/images/manakin-1.jpg"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">David Faunal</h3>
                <p className="text-orange-600 font-medium">Minca Observatory Owner & Transitional Forest Guide</p>
              </div>

              <div className="space-y-4 text-gray-700 text-sm">
                <p>
                  David Faunal is the owner and operator of Observatorio de Aves de Minca, a premier birdwatching
                  destination in the Sierra Nevada de Santa Marta. His observatory specializes in Minca's unique
                  transitional forest ecosystem, where cloud forest meets dry forest.
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Expertise:</h4>
                  <ul className="space-y-1">
                    <li>• Transitional forest ecology</li>
                    <li>• Hummingbird behavior and feeding patterns</li>
                    <li>• Multi-elevation species tracking</li>
                    <li>• Observatory management and bird photography</li>
                    <li>• Coffee plantation birding</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Instagram className="w-4 h-4 mr-2" />
                    <a
                      href="https://www.instagram.com/faunal_observatorioavesminca/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-orange-600 transition-colors"
                    >
                      @faunal_observatorioavesminca
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Globe className="w-4 h-4 mr-2" />
                    <a
                      href="https://www.observatoriodeavesdeminca.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-orange-600 transition-colors"
                    >
                      observatoriodeavesdeminca.com
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Observatorio de Aves de Minca</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Nicolas Rozo */}
            <div id="nicolas-rozo" className="bg-gray-50 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                  <OptimizedImage
                    src="/images/nicolas-rozo.png"
                    alt="Nicolas Rozo - Bogotá Region Ornithologist specializing in páramo ecosystems"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Nicolas Rozo</h3>
                <p className="text-indigo-600 font-medium">Bogotá Region Ornithologist</p>
              </div>

              <div className="space-y-4 text-gray-700 text-sm">
                <p>
                  Nicolas holds a degree in Biology from Universidad Distrital and is our expert ornithologist for the
                  Bogotá region. His specialized knowledge of high-altitude páramo ecosystems makes him the ideal guide
                  for exploring Chingaza and Sumapaz National Parks.
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Expertise:</h4>
                  <ul className="space-y-1">
                    <li>• High-altitude páramo ornithology</li>
                    <li>• Andean endemic species specialist</li>
                    <li>• Chingaza and Sumapaz ecosystems</li>
                    <li>• Scientific research and documentation</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Instagram className="w-4 h-4 mr-2" />
                    <a
                      href="https://www.instagram.com/nicolas_rozop/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-indigo-600 transition-colors"
                    >
                      @nicolas_rozop
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Globe className="w-4 h-4 mr-2" />
                    <a
                      href="https://ebird.org/profile/MTE0NzM0NQ/CO"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-700 transition-colors font-medium"
                    >
                      View eBird Profile
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Bogotá region páramo ecosystems</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Jaider Carrillo */}
            <div id="jaider-carrillo" className="bg-gray-50 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                  <OptimizedImage
                    src="/images/jaider-carrillo.png"
                    alt="Jaider Carrillo - Perijá Mountains Specialist and endemic species guide"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Jaider Carrillo</h3>
                <p className="text-teal-600 font-medium">Perijá Mountains Specialist</p>
              </div>

              <div className="space-y-4 text-gray-700 text-sm">
                <p>
                  Jaider Carrillo is our expert guide for the Perijá Mountains region, specializing in the unique
                  endemic species found in this biogeographically distinct mountain range. His deep knowledge of the
                  area's avifauna and challenging terrain makes him invaluable for expeditions seeking rare birds.
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Expertise:</h4>
                  <ul className="space-y-1">
                    <li>• Perijá Mountains endemic species</li>
                    <li>• High-altitude cloud forest navigation</li>
                    <li>• Endemic bird behavior and ecology</li>
                    <li>• Challenging terrain expedition leadership</li>
                    <li>• Cross-border birding protocols</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Instagram className="w-4 h-4 mr-2" />
                    <a
                      href="https://www.instagram.com/jaidercarrillo20"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-teal-600 transition-colors"
                    >
                      @jaidercarrillo20
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Instagram className="w-4 h-4 mr-2" />
                    <a
                      href="https://www.instagram.com/perija_birding_travel/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-teal-600 transition-colors"
                    >
                      @perija_birding_travel
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Globe className="w-4 h-4 mr-2" />
                    <a
                      href="https://ebird.org/profile/MTQ2MDk3Ng/CO"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:text-teal-700 transition-colors font-medium"
                    >
                      View eBird Profile
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Perijá Mountains Endemic Region</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Jose Luis Ropero */}
            <div id="jose-luis-ropero" className="bg-gray-50 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                  <OptimizedImage
                    src="/images/jose-luis-ropero.png"
                    alt="Jose Luis Ropero - Adventure Tourism Specialist and multi-ecosystem guide"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Jose Luis Ropero</h3>
                <p className="text-amber-600 font-medium">Adventure Tourism Specialist</p>
              </div>

              <div className="space-y-4 text-gray-700 text-sm">
                <p>
                  Jose Luis Ropero is the founder of Ropero Aventuras and brings extensive experience in adventure
                  tourism and multi-ecosystem birding expeditions. His comprehensive knowledge of Colombia's diverse
                  regions and ability to navigate challenging terrains makes him exceptional for adventurous
                  expeditions.
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Expertise:</h4>
                  <ul className="space-y-1">
                    <li>• Multi-ecosystem birding expeditions</li>
                    <li>• Adventure tourism and logistics</li>
                    <li>• Community-based tourism development</li>
                    <li>• Challenging terrain navigation</li>
                    <li>• Sustainable tourism practices</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Instagram className="w-4 h-4 mr-2" />
                    <a
                      href="https://www.instagram.com/roperoaventuras"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amber-600 transition-colors"
                    >
                      @roperoaventuras
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Globe className="w-4 h-4 mr-2" />
                    <a
                      href="https://roperoaventuras.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amber-600 transition-colors"
                    >
                      roperoaventuras.com
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Globe className="w-4 h-4 mr-2" />
                    <a
                      href="https://ebird.org/profile/NjQ2ODY5/CO"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:text-amber-700 transition-colors font-medium"
                    >
                      View eBird Profile
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Multi-Regional Adventure Tourism</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center bg-emerald-50 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Meet Our Team?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join us on an expedition and experience firsthand the expertise, passion, and cultural knowledge that
              makes AVES tours extraordinary. Our team is ready to share Colombia's avian treasures with you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-3">Book Your Adventure</Button>
              <Button
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-3 bg-transparent"
              >
                <Link href="/#contact">Contact Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
