"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, MapPin, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"

export default function BlogPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const blogPosts = [
    {
      id: "hummingbird-vision-journey",
      title: "Jewels of the Andes: A Vision Journey Through Colombia's Hummingbird Sanctuaries",
      excerpt:
        "In the sacred heights of Colombia's three Andean cordilleras, where mist meets mountain and time seems to pause, we embark on a spiritual pilgrimage to witness nature's most exquisite aerial dancers—the hummingbirds.",
      image: "/images/long-tailed-sylph.jpg",
      imageAlt:
        "Long-tailed Sylph (Aglaiocercus kingii) displaying its magnificent elongated tail feathers and iridescent green plumage in cloud forest habitat",
      author: "Martin Melendro",
      date: "June 12, 2025",
      location: "Three Andean Cordilleras",
      readTime: "12 min read",
      category: "Vision Photography",
      categoryColor: "bg-purple-100 text-purple-800",
    },
    {
      id: "sierra-nevada-indigenous-birding",
      title: "Guardians of the Sky: Birding with the Kogi and Wayuu in Sierra Nevada de Santa Marta",
      excerpt:
        "The pre-dawn air was crisp as we began our ascent into the Sierra Nevada de Santa Marta, the world's highest coastal mountain range. Our destination: the sacred territories of the Kogi and Wayuu peoples, where ancient wisdom meets extraordinary biodiversity.",
      image: "/images/cardinal-guajiro.jpg",
      imageAlt: "Vermilion Cardinal (Cardinalis phoeniceus) - the endemic Cardinal Guajiro in its natural habitat",
      author: "Martin Melendro",
      date: "March 15, 2025",
      location: "Sierra Nevada de Santa Marta",
      readTime: "8 min read",
      category: "Indigenous Partnerships",
      categoryColor: "bg-emerald-100 text-emerald-800",
    },
    {
      id: "paramo-manizales-thornbill",
      title: "Fire and Ice: From Páramo Peaks to Thermal Springs and Manakin Magic",
      excerpt:
        "An eight-day journey through Colombia's Central Andes reveals the extraordinary diversity that exists within a single mountain range. From the frigid páramo heights where Rainbow-bearded Thornbills defy the elements, through therapeutic thermal springs, to the lush cloud forests where manakins dance.",
      image: "/images/rainbow-bearded-thornbill.jpg",
      imageAlt:
        "Rainbow-bearded Thornbill (Chalcostigma herrani) displaying its spectacular iridescent throat in high-altitude páramo habitat",
      author: "Martin Melendro",
      date: "April 8, 2025",
      location: "Manizales & Chinchiná, Caldas",
      readTime: "8 min read",
      category: "High Altitude Birding",
      categoryColor: "bg-blue-100 text-blue-800",
    },
    {
      id: "choco-toucan-expedition",
      title: "Into the Heart of Chocó: A Toucan Odyssey Through Colombia's Rainforest Jewel",
      excerpt:
        "The Biogeographic Chocó represents one of Earth's most extraordinary biodiversity hotspots—a narrow strip of Pacific rainforest that harbors more endemic species per square kilometer than almost anywhere else on the planet.",
      image: "/images/yellow-throated-toucan-blog.jpg",
      imageAlt:
        "Yellow-throated Toucan (Ramphastos ambiguus) displaying its magnificent bill in the Chocó rainforest canopy",
      author: "Martin Melendro",
      date: "May 22, 2025",
      location: "Biogeographic Chocó",
      readTime: "10 min read",
      category: "Rainforest Expeditions",
      categoryColor: "bg-green-100 text-green-800",
    },
  ]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <NavigationHeader currentPage="/blog" />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">AVES Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover the extraordinary world of Colombian birds through field reports, conservation stories, and expert
            insights from the most biodiverse country on Earth.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {blogPosts.map((post, index) => (
              <article key={post.id} className="group">
                <Link href={`/blog/${post.id}`}>
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.imageAlt}
                      width={600}
                      height={338}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      style={{
                        objectPosition:
                          post.id === "hummingbird-vision-journey"
                            ? "center 25%"
                            : post.id === "sierra-nevada-indigenous-birding"
                              ? "center 20%"
                              : post.id === "paramo-manizales-thornbill"
                                ? "center 15%"
                                : post.id === "choco-toucan-expedition"
                                  ? "center 40%"
                                  : "center",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <Badge className={`absolute top-4 left-4 ${post.categoryColor}`}>{post.category}</Badge>
                  </div>
                </Link>

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <Link href="/team#martin-melendro" className="hover:text-emerald-600 transition-colors">
                        {post.author}
                      </Link>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {post.location}
                    </div>
                    <span>{post.readTime}</span>
                  </div>

                  <Link href={`/blog/${post.id}`}>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors leading-tight">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>

                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium group-hover:gap-2 transition-all"
                  >
                    Read Full Story
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:ml-0 transition-all" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated on Our Latest Adventures</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Get exclusive field reports, conservation updates, and early access to new tour announcements delivered to
            your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Button className="bg-emerald-600 hover:bg-emerald-700 px-8">Subscribe</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
