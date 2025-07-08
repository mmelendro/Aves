"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MapPin, Calendar, Globe, Instagram, ChevronDown } from "lucide-react"
import Link from "next/link"
import OptimizedImage from "@/components/optimized-image"
import { Footer } from "@/components/footer"
import { NavigationHeader } from "@/components/navigation-header"

export default function TeamPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const teamMembers = [
    {
      id: "martin-melendro",
      name: "Martin Melendro",
      role: "AVES Founder & Lead Expedition Guide",
      badge: "Founder & Lead Guide",
      badgeColor: "bg-emerald-100 text-emerald-800",
      roleColor: "text-emerald-600",
      image: "/images/martin-melendro.jpg",
      alt: "Martin Melendro - AVES Founder and Lead Ornithologist",
      bio: "Martin is AVES' founder and lead expedition guide, with over 15 years of experience exploring Colombia's diverse ecosystems. A passionate birding guide and conservation advocate, he specializes in creating transformative birding experiences that emphasize cultural exchange and conservation education.",
      expertise: [
        "High-altitude páramo birding",
        "Indigenous community partnerships",
        "Endemic species conservation",
        "Sustainable tourism development",
        "Bird photography and field research",
      ],
      details: [
        { icon: MapPin, text: "Based in Bogotá, Colombia" },
        { icon: Calendar, text: "15+ years experience" },
        { icon: Globe, text: "Spanish, English" },
      ],
      links: [
        {
          icon: Globe,
          text: "View eBird Profile",
          url: "https://ebird.org/profile/NDc2OTE5OA",
          color: "text-emerald-600 hover:text-emerald-700",
        },
      ],
    },
    {
      id: "yeferson-guale-epiayu",
      name: "Yeferson Guale Epiayu",
      role: "Wayuu Community Guide",
      badge: "Indigenous Guide",
      badgeColor: "bg-blue-100 text-blue-800",
      roleColor: "text-emerald-600",
      image: "/images/yeferson-guale-epiayu.png",
      alt: "Yeferson Guale Epiayu - Wayuu Community Guide specializing in Sierra Nevada de Santa Marta",
      fallback: "/images/manakin-1.jpg",
      bio: "Yeferson represents the Wayuu community of Kalekalemana and serves as our primary guide in the Sierra Nevada de Santa Marta. His deep knowledge of Cardinal Guajiro behavior and traditional ecological calendars makes him invaluable for our Sierra Nevada expeditions.",
      expertise: [
        "Wayuu traditional ecological knowledge",
        "Cardinal Guajiro specialist",
        "Weather pattern prediction",
        "Cultural interpretation",
      ],
      details: [],
      links: [
        {
          icon: Instagram,
          text: "@kalekalemana1921",
          url: "https://instagram.com/kalekalemana1921",
          color: "hover:text-emerald-600",
        },
      ],
    },
    {
      id: "dagoberto-rudas",
      name: "Dagoberto Rudas",
      role: "Tayrona Community Guide",
      badge: "Cloud Forest Specialist",
      badgeColor: "bg-blue-100 text-blue-800",
      roleColor: "text-blue-600",
      image: "/images/dagoberto-rudas.png",
      alt: "Dagoberto Rudas - Tayrona Community Guide specializing in cloud forest birding",
      bio: "Dagoberto brings extensive knowledge of the Tayrona region and specializes in cloud forest birding. His expertise in locating Blue-billed Curassows and understanding Kogi forest protocols makes him essential for our Sierra Nevada cloud forest expeditions.",
      expertise: [
        "Cloud forest navigation",
        "Blue-billed Curassow specialist",
        "Kogi cultural protocols",
        "Forest ecology interpretation",
      ],
      details: [],
      links: [
        { icon: Instagram, text: "@dago_rdg", url: "https://instagram.com/dago_rdg", color: "hover:text-blue-600" },
      ],
    },
    {
      id: "gleison-guarin",
      name: "Gleison Fernando Guarin Largo",
      role: "Tatamá National Park Specialist",
      badge: "Acoustic Ornithologist",
      badgeColor: "bg-green-100 text-green-800",
      roleColor: "text-green-600",
      image: "/images/gleison-guarin.png",
      alt: "Gleison Fernando Guarin Largo - Tatamá National Park Specialist and acoustic ornithologist",
      bio: "Gleison is part of the family that owns Montezuma Ecolodge in Tatamá National Park, Chocó. An exceptional acoustic ornithologist, he can identify over 1,000 bird species by their sounds alone. His expertise in the region's endemic species makes him invaluable for our Chocó expeditions.",
      expertise: [
        "Acoustic bird identification (1000+ species)",
        "Chocó endemic species specialist",
        "Cornell University collaborator",
        "Sound recording and documentation",
      ],
      details: [{ icon: MapPin, text: "Montezuma Ecolodge, Tatamá National Park" }],
      links: [
        {
          icon: Instagram,
          text: "@gleisonguarin",
          url: "https://instagram.com/gleisonguarin",
          color: "hover:text-green-600",
        },
      ],
    },
    {
      id: "david-jara",
      name: "David Jara",
      role: "El Dorado Cloud Forest Guide & Tour Leader",
      badge: "Multi-Regional Expert",
      badgeColor: "bg-purple-100 text-purple-800",
      roleColor: "text-purple-600",
      image: "/images/david-jara.png",
      alt: "David Jara - El Dorado Cloud Forest Guide and multi-regional tour leader",
      bio: "David Jara is our expert tour leader for El Dorado Reserve's cloud forest ecosystem and beyond. With over a decade of experience in the Sierra Nevada's montane forests, he has an unmatched ability to locate the region's most elusive endemic species in challenging weather conditions.",
      expertise: [
        "Cloud forest endemic species",
        "Montane ecosystem navigation",
        "Multi-region tour leadership",
        "Weather pattern interpretation",
        "High-altitude birding techniques",
        "Cross-operator collaboration",
      ],
      details: [{ icon: MapPin, text: "El Dorado Reserve & Multi-Regional Tours" }],
      links: [
        {
          icon: Instagram,
          text: "@davidjara20",
          url: "https://www.instagram.com/davidjara20/",
          color: "hover:text-purple-600",
        },
        {
          icon: Globe,
          text: "View eBird Profile",
          url: "https://ebird.org/profile/MTA2NjQxMA/CO-MET",
          color: "text-purple-600 hover:text-purple-700",
        },
      ],
    },
    {
      id: "david-faunal",
      name: "David Faunal",
      role: "Minca Observatory Owner & Transitional Forest Guide",
      badge: "Observatory Owner",
      badgeColor: "bg-orange-100 text-orange-800",
      roleColor: "text-orange-600",
      image: "/images/david-faunal-birds-reserve.jpg",
      alt: "Birds at David Faunal's Observatorio de Aves de Minca - showcasing the diverse avian life at the reserve",
      fallback: "/images/manakin-1.jpg",
      bio: "David Faunal is the owner and operator of Observatorio de Aves de Minca, a premier birdwatching destination in the Sierra Nevada de Santa Marta. His observatory specializes in Minca's unique transitional forest ecosystem, where cloud forest meets dry forest.",
      expertise: [
        "Transitional forest ecology",
        "Hummingbird behavior and feeding patterns",
        "Multi-elevation species tracking",
        "Observatory management and bird photography",
        "Coffee plantation birding",
      ],
      details: [{ icon: MapPin, text: "Observatorio de Aves de Minca" }],
      links: [
        {
          icon: Instagram,
          text: "@faunal_observatorioavesminca",
          url: "https://www.instagram.com/faunal_observatorioavesminca/",
          color: "hover:text-orange-600",
        },
        {
          icon: Globe,
          text: "observatoriodeavesdeminca.com",
          url: "https://www.observatoriodeavesdeminca.com/",
          color: "hover:text-orange-600",
        },
      ],
    },
    {
      id: "nicolas-rozo",
      name: "Nicolas Rozo",
      role: "Bogotá Region Ornithologist",
      badge: "Páramo Specialist",
      badgeColor: "bg-indigo-100 text-indigo-800",
      roleColor: "text-indigo-600",
      image: "/images/nicolas-rozo.png",
      alt: "Nicolas Rozo - Bogotá Region Ornithologist specializing in páramo ecosystems",
      bio: "Nicolas holds a degree in Biology from Universidad Distrital and is our expert ornithologist for the Bogotá region. His specialized knowledge of high-altitude páramo ecosystems makes him the ideal guide for exploring Chingaza and Sumapaz National Parks.",
      expertise: [
        "High-altitude páramo ornithology",
        "Andean endemic species specialist",
        "Chingaza and Sumapaz ecosystems",
        "Scientific research and documentation",
      ],
      details: [{ icon: MapPin, text: "Bogotá region páramo ecosystems" }],
      links: [
        {
          icon: Instagram,
          text: "@nicolas_rozop",
          url: "https://www.instagram.com/nicolas_rozop/",
          color: "hover:text-indigo-600",
        },
        {
          icon: Globe,
          text: "View eBird Profile",
          url: "https://ebird.org/profile/MTE0NzM0NQ/CO",
          color: "text-indigo-600 hover:text-indigo-700",
        },
      ],
    },
    {
      id: "jaider-carrillo",
      name: "Jaider Carrillo",
      role: "Perijá Mountains Specialist",
      badge: "Endemic Species Expert",
      badgeColor: "bg-teal-100 text-teal-800",
      roleColor: "text-teal-600",
      image: "/images/jaider-carrillo.png",
      alt: "Jaider Carrillo - Perijá Mountains Specialist and endemic species guide",
      bio: "Jaider Carrillo is our expert guide for the Perijá Mountains region, specializing in the unique endemic species found in this biogeographically distinct mountain range. His deep knowledge of the area's avifauna and challenging terrain makes him invaluable for expeditions seeking rare birds.",
      expertise: [
        "Perijá Mountains endemic species",
        "High-altitude cloud forest navigation",
        "Endemic bird behavior and ecology",
        "Challenging terrain expedition leadership",
        "Cross-border birding protocols",
      ],
      details: [{ icon: MapPin, text: "Perijá Mountains Endemic Region" }],
      links: [
        {
          icon: Instagram,
          text: "@jaidercarrillo20",
          url: "https://www.instagram.com/jaidercarrillo20",
          color: "hover:text-teal-600",
        },
        {
          icon: Instagram,
          text: "@perija_birding_travel",
          url: "https://www.instagram.com/perija_birding_travel/",
          color: "hover:text-teal-600",
        },
        {
          icon: Globe,
          text: "View eBird Profile",
          url: "https://ebird.org/profile/MTQ2MDk3Ng/CO",
          color: "text-teal-600 hover:text-teal-700",
        },
      ],
    },
    {
      id: "jose-luis-ropero",
      name: "Jose Luis Ropero",
      role: "Adventure Tourism Specialist",
      badge: "Adventure Tourism",
      badgeColor: "bg-amber-100 text-amber-800",
      roleColor: "text-amber-600",
      image: "/images/jose-luis-ropero.png",
      alt: "Jose Luis Ropero - Adventure Tourism Specialist and multi-ecosystem guide",
      bio: "Jose Luis Ropero is the founder of Ropero Aventuras and brings extensive experience in adventure tourism and multi-ecosystem birding expeditions. His comprehensive knowledge of Colombia's diverse regions and ability to navigate challenging terrains makes him exceptional for adventurous expeditions.",
      expertise: [
        "Multi-ecosystem birding expeditions",
        "Adventure tourism and logistics",
        "Community-based tourism development",
        "Challenging terrain navigation",
        "Sustainable tourism practices",
      ],
      details: [{ icon: MapPin, text: "Multi-Regional Adventure Tourism" }],
      links: [
        {
          icon: Instagram,
          text: "@roperoaventuras",
          url: "https://www.instagram.com/roperoaventuras",
          color: "hover:text-amber-600",
        },
        {
          icon: Globe,
          text: "roperoaventuras.com",
          url: "https://roperoaventuras.com/",
          color: "hover:text-amber-600",
        },
        {
          icon: Globe,
          text: "View eBird Profile",
          url: "https://ebird.org/profile/NjQ2ODY5/CO",
          color: "text-amber-600 hover:text-amber-700",
        },
      ],
    },
  ]

  const scrollToMember = (memberId: string) => {
    const element = document.getElementById(memberId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

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

      {/* Quick Navigation */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h2>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {teamMembers.map((member) => (
                <button
                  key={member.id}
                  onClick={() => scrollToMember(member.id)}
                  className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  {member.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Accordion */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Expert Guides</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team brings together scientific expertise, traditional ecological knowledge, and deep cultural
              connections to create extraordinary birding experiences throughout Colombia.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="multiple" className="space-y-4">
              {teamMembers.map((member) => (
                <AccordionItem
                  key={member.id}
                  value={member.id}
                  id={member.id}
                  className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden"
                >
                  <AccordionTrigger className="hover:no-underline p-6 hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center gap-6 w-full">
                      {/* Profile Photo */}
                      <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 overflow-hidden rounded-full">
                        <OptimizedImage
                          src={member.image}
                          alt={member.alt}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                          style={{ objectFit: "cover" }}
                          fallback={member.fallback}
                        />
                      </div>

                      {/* Name and Role */}
                      <div className="flex-1 text-left">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                          <h3 className="text-lg md:text-xl font-bold text-gray-900">{member.name}</h3>
                          <Badge className={`${member.badgeColor} text-xs md:text-sm w-fit`}>{member.badge}</Badge>
                        </div>
                        <p className={`${member.roleColor} font-medium text-sm md:text-base`}>{member.role}</p>
                      </div>

                      {/* View Profile Indicator */}
                      <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm">
                        <span className="hidden md:inline">View Profile</span>
                        <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="px-6 pb-6">
                    <div className="pt-4 border-t border-gray-200">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Bio Section */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">About</h4>
                          <p className="text-gray-700 text-sm leading-relaxed mb-4">{member.bio}</p>

                          {/* Details */}
                          {member.details.length > 0 && (
                            <div className="space-y-2">
                              {member.details.map((detail, index) => (
                                <div key={index} className="flex items-center text-gray-600 text-sm">
                                  <detail.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                                  <span>{detail.text}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Expertise and Links */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Areas of Expertise</h4>
                          <ul className="space-y-1 mb-4">
                            {member.expertise.map((skill, index) => (
                              <li key={index} className="text-gray-700 text-sm">
                                • {skill}
                              </li>
                            ))}
                          </ul>

                          {/* Links */}
                          {member.links.length > 0 && (
                            <div className="space-y-2">
                              <h5 className="font-medium text-gray-900 text-sm">Connect</h5>
                              {member.links.map((link, index) => (
                                <div key={index} className="flex items-center text-sm">
                                  <link.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                                  <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${link.color} transition-colors font-medium`}
                                  >
                                    {link.text}
                                  </a>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
