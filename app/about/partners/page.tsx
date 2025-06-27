"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Leaf, Globe, ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import OptimizedImage from "@/components/optimized-image"
import { cn } from "@/lib/utils"
import { Footer } from "@/components/footer"
import { NavigationHeader } from "@/components/navigation-header"

export default function PartnersPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const partners = [
    {
      id: "proaves",
      name: "Fundación ProAves",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Proaves-uNr98rqYDPhDEWaKP6rOMR2BpDebz0.gif",
      description:
        "Colombia's leading bird conservation organization, protecting over 1 million acres of critical habitat across 29 nature reserves. ProAves has discovered 15 new bird species and leads groundbreaking conservation efforts including the protection of critically endangered species like the Blue-billed Curassow and Yellow-eared Parrot.",
      website: "https://proaves.org/en/",
      category: "Conservation Foundation",
      keyContributions: ["29 Protected Reserves", "15 New Species Discovered", "1M+ Acres Protected"],
    },
    {
      id: "el-dorado",
      name: "ProAves El Dorado Reserve",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ElDorado-jG9NzEyeb8afnzxKfKaALuYlKis10L.png",
      description:
        "An award-winning ecolodge and research station in the Sierra Nevada de Santa Marta, protecting habitat for 22 endemic bird species. This unique cloud forest reserve offers unparalleled access to endemic species while directly funding habitat protection through sustainable ecotourism.",
      website: "https://proaves.org/en/proaves-el-dorado-reserve/",
      category: "Ecolodge & Research Station",
      keyContributions: ["22 Endemic Species", "Cloud Forest Protection", "Research Station"],
    },
    {
      id: "montezuma",
      name: "Montezuma Rainforest Lodge",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Montezuma-uD6jOfKuFacfO8EBv66OaXWJ11msyD.webp",
      description:
        "A premier eco-lodge nestled in the heart of Colombia's pristine rainforest, offering luxury accommodations with direct access to incredible biodiversity. The lodge provides expert-guided birding tours and supports local conservation initiatives while maintaining the highest standards of sustainable tourism.",
      website: "https://montezumarainforest.com/",
      category: "Luxury Ecolodge",
      keyContributions: ["Luxury Eco-Tourism", "Expert Guides", "Rainforest Access"],
    },
    {
      id: "hacienda-bosque",
      name: "Hacienda El Bosque",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hacienda%20el%20Bosque-CcDbCAFi8PGERoeC9RV2IHBrZ7v2Zb.png",
      description:
        "A charming mountain retreat specializing in high-altitude birding experiences and sustainable agriculture. This family-owned hacienda offers intimate access to Andean cloud forest species while supporting local communities through responsible tourism and organic farming practices.",
      website: "https://www.instagram.com/haciendaelbosque/",
      category: "Mountain Retreat",
      keyContributions: ["High-Altitude Birding", "Sustainable Agriculture", "Cloud Forest Access"],
    },
    {
      id: "selva",
      name: "Fundación Selva",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-SELVA-Cs5ncIEoRRhVmEJbOsYEObrKToFaEx.png",
      description:
        "Dedicated to protecting Colombia's tropical forests through research, education, and sustainable development. Their comprehensive approach includes biodiversity monitoring, community engagement, and habitat restoration across critical ecosystems in the Amazon and Chocó regions.",
      website: "https://www.selva.org.co/en/home/",
      category: "Research Foundation",
      keyContributions: ["Forest Protection", "Biodiversity Research", "Community Programs"],
    },
    {
      id: "refugio-esmeralda",
      name: "Refugio La Esmeralda",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Refugio%20La%20Esmeralda-6EqP7mLLqiYWEv45xv3PRXrk13YUlH.png",
      description:
        "A hidden gem ecolodge offering authentic wilderness experiences in pristine natural settings. This intimate refuge provides exceptional birding opportunities while maintaining minimal environmental impact and supporting local conservation efforts through community-based tourism.",
      website: "https://www.instagram.com/refugiolaesmeraldaoficial/",
      category: "Wilderness Refuge",
      keyContributions: ["Wilderness Access", "Minimal Impact Tourism", "Community Support"],
    },
    {
      id: "finca-suasie",
      name: "Finca Suasie",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Finca%20Suasie-buMkScxufSseucAtYRyytpm4cEomB4.png",
      description:
        "Specializing in high-altitude birding experiences in the Chingaza National Park region, offering unique access to páramo ecosystems and endemic Andean species. This working farm combines sustainable agriculture with exceptional birding opportunities at elevations above 3,000 meters.",
      website: "https://fincasuasie.com/en/birdwatching-in-chingaza-with-lodging/",
      category: "High-Altitude Birding",
      keyContributions: ["Páramo Access", "Endemic Species", "3,000m+ Elevation"],
    },
    {
      id: "termales-ruiz",
      name: "Termales del Ruiz",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Termales%20del%20Ruiz-8xj86TcNFAli9zxWTi4QKq1bgK3Kwn.png",
      description:
        "Combining the therapeutic benefits of natural hot springs with exceptional high-altitude birding opportunities in the Los Nevados National Park. This unique partnership offers relaxation and birding at extreme elevations, with access to specialized Andean species and stunning volcanic landscapes.",
      website: "https://termalesdelruiz.com/servicios/avistamiento-de-aves/",
      category: "Thermal Springs & Birding",
      keyContributions: ["Thermal Springs", "Volcanic Landscapes", "High-Altitude Species"],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <NavigationHeader currentPage="/about/partners" />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-blue-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4">
              🤝 Conservation Partnerships
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Our
              <span className="text-emerald-600 block">Conservation Partners</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              AVES Colombia collaborates with leading conservation organizations, ecolodges, and research institutions
              to protect Colombia's incredible biodiversity while supporting local communities through sustainable
              tourism.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Conservation & Tourism Partners</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Together, we're creating a network of sustainable tourism that directly contributes to habitat protection
              and community development across Colombia.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {partners.map((partner) => (
              <Card key={partner.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center overflow-hidden border-2 border-emerald-100 shadow-sm hover:border-emerald-200 transition-colors duration-200">
                        <OptimizedImage
                          src={partner.logo || "/placeholder.svg"}
                          alt={`${partner.name} official logo`}
                          width={80}
                          height={80}
                          className={cn(
                            "max-w-full max-h-full object-contain p-3 transition-transform duration-200 group-hover:scale-105",
                            partner.id === "proaves" ? "filter drop-shadow-sm" : "",
                          )}
                          priority={partner.id === "proaves"}
                          style={{
                            filter:
                              partner.id === "proaves" ? "drop-shadow(0 2px 4px rgba(16, 185, 129, 0.1))" : "none",
                          }}
                          onError={(e) => {
                            console.warn(`Failed to load logo for ${partner.name}`)
                            e.currentTarget.src =
                              "/placeholder.svg?height=80&width=80&text=" +
                              partner.name
                                .split(" ")
                                .map((w) => w[0])
                                .join("")
                          }}
                          sizes="(max-width: 768px) 64px, 80px"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">{partner.name}</h3>
                          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-3">
                            {partner.category}
                          </Badge>
                        </div>
                        <Link
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 ml-4"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white bg-transparent"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Visit Site
                          </Button>
                        </Link>
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-4">{partner.description}</p>

                      {/* Key Contributions */}
                      <div className="flex flex-wrap gap-2">
                        {partner.keyContributions.map((contribution, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700"
                          >
                            {contribution}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why We Partner</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our partnerships create a multiplier effect for conservation impact and community benefit across
              Colombia's diverse ecosystems.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Conservation Impact</h3>
              <p className="text-gray-600">
                Direct funding for habitat protection and species research through sustainable tourism revenue.
              </p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Community Development</h3>
              <p className="text-gray-600">
                Supporting local communities through employment, training, and sustainable economic opportunities.
              </p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Scientific Research</h3>
              <p className="text-gray-600">
                Contributing to biodiversity research and species monitoring that informs conservation strategies.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-emerald-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Join Our Conservation Network</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience Colombia's biodiversity while directly supporting conservation and community development through
            our partner network.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tours">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-4">
                Explore Tours
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-4 bg-transparent"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
