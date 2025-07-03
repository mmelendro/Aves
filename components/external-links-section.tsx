"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LucideExternalLink, Info } from 'lucide-react'
import Link from "next/link"

interface ExternalLink {
  title: string
  description: string
  url: string
  category: string
}

interface ExternalLinksSectionProps {
  links: ExternalLink[]
}

function ExternalLinksSection({ links }: ExternalLinksSectionProps) {
  // Return null if no links to display (removed partner links)
  if (!links || links.length === 0) {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <Card className="max-w-2xl mx-auto bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-orange-100 rounded-full w-fit">
                  <Info className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-2xl text-gray-800">Ready to Explore the Caribbean?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Our Caribbean coast birding tours are carefully designed to maximize your wildlife encounters while
                  supporting local conservation efforts. Book directly with us for the best experience and expert
                  guidance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/checkout?region=caribbean&source=info-section">
                    <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8">
                      Book Your Caribbean Tour
                    </Button>
                  </Link>
                  <Link href="/contact?subject=Caribbean+Tour+Information">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 bg-transparent"
                    >
                      Get More Information
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Additional Resources</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore additional information and resources to enhance your Caribbean birding experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <LucideExternalLink className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-orange-600 uppercase tracking-wide">{link.category}</span>
                </div>
                <CardTitle className="text-lg text-gray-800">{link.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 leading-relaxed">{link.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
                  asChild
                >
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    Learn More
                    <LucideExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExternalLinksSection
export { ExternalLinksSection }
