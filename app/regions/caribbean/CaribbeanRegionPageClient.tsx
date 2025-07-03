"use client"

import { NavigationHeader } from "@/components/navigation-header"
import YouTubeHeroBackground from "@/components/youtube-hero-background"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users, Camera, TelescopeIcon as Binoculars, Globe } from "lucide-react"
import Link from "next/link"
import { CaribbeanBirdCarousel } from "@/components/caribbean-bird-carousel"
import { InteractiveRegionMap } from "@/components/interactive-region-map"
import { CollapsibleTargetSpecies } from "@/components/collapsible-target-species"
import { CollapsibleItinerary } from "@/components/collapsible-itinerary"
import { HighlightCards } from "@/components/highlight-cards"
import { TestimonialSection } from "@/components/testimonial-section"
import { AccordionSections } from "@/components/accordion-sections"
import { ExternalLinksSection } from "@/components/external-links-section"
import { Footer } from "@/components/footer"

export default function CaribbeanRegionPageClient() {
  const highlights = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "5 Distinct Ecosystems",
      description: "From coastal mangroves to cloud forests",
      color: "emerald",
    },
    {
      icon: <Binoculars className="w-6 h-6" />,
      title: "300+ Bird Species",
      description: "Including 15+ endemic species",
      color: "blue",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Indigenous Guides",
      description: "Kogi and Wayuu cultural immersion",
      color: "purple",
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Photography Paradise",
      description: "Stunning landscapes and wildlife",
      color: "orange",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Mitchell",
      location: "Toronto, Canada",
      rating: 5,
      text: "The Caribbean coast exceeded all expectations. Our Kogi guide shared incredible knowledge about both birds and traditional culture.",
      tour: "Adventure Tour",
      image: "/placeholder-user.jpg",
    },
    {
      name: "Carlos Rodriguez",
      location: "Madrid, Spain",
      rating: 5,
      text: "From sea level to 5,700m - the diversity is mind-blowing. Saw my first Santa Marta Parakeet!",
      tour: "Vision Tour",
      image: "/placeholder-user.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader currentPage="/regions/caribbean" />

      {/* YouTube Hero Background */}
      <YouTubeHeroBackground
        videoId="QdV1BJNZQE0"
        title="Caribbean Coast"
        subtitle="Where the Sierra Nevada meets the sea - Colombia's most biodiverse region"
        showAttribution={true}
        attributionText="8K Drone Footage by Martín Melendro Torres"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <Link href="/tours/adventure">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-lg"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Caribbean Adventure
            </Button>
          </Link>
          <Link href="#overview">
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 font-semibold px-8 py-4 rounded-xl shadow-xl transition-all duration-300 text-lg"
            >
              <Globe className="w-5 h-5 mr-2" />
              Explore Region
            </Button>
          </Link>
        </div>
      </YouTubeHeroBackground>

      {/* Overview Section */}
      <section id="overview" className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-emerald-100 text-emerald-800">
              Colombia's Crown Jewel
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              The Caribbean Coast: Where Worlds Collide
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Experience the dramatic transition from Caribbean shores to snow-capped peaks in the world's highest
              coastal mountain range. The Sierra Nevada de Santa Marta rises from sea level to 5,700 meters in just 42
              kilometers, creating an unparalleled diversity of ecosystems and endemic species found nowhere else on
              Earth.
            </p>
          </div>

          <HighlightCards highlights={highlights} />
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore the Region</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the key birding locations across five distinct ecosystems, from mangrove swamps to cloud forests.
            </p>
          </div>
          <InteractiveRegionMap region="caribbean" />
        </div>
      </section>

      {/* Bird Species Carousel */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
              Endemic Treasures
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Caribbean Coast Specialties</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the remarkable endemic and near-endemic species that make this region a world-class birding
              destination.
            </p>
          </div>
          <CaribbeanBirdCarousel />
        </div>
      </section>

      {/* Target Species */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <CollapsibleTargetSpecies region="caribbean" />
        </div>
      </section>

      {/* Sample Itinerary */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <CollapsibleItinerary region="caribbean" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <TestimonialSection testimonials={testimonials} />
        </div>
      </section>

      {/* Detailed Information Accordions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <AccordionSections region="caribbean" />
        </div>
      </section>

      {/* External Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <ExternalLinksSection region="caribbean" />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready for Your Caribbean Adventure?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join us for an unforgettable journey through Colombia's most biodiverse region, where every day brings new
            discoveries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tours/adventure">
              <Button
                size="lg"
                className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Your Tour
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-all duration-300 bg-transparent"
              >
                <Users className="w-5 h-5 mr-2" />
                Custom Itinerary
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
