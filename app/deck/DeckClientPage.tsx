"use client"

import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Bird,
  Users,
  Globe,
  TrendingUp,
  Award,
  Calendar,
  ExternalLink,
  Play,
  Maximize2,
  ArrowRight,
} from "lucide-react"

export default function DeckClientPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <NavigationHeader />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-emerald-600 via-emerald-700 to-blue-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-full shadow-xl">
                <Bird className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">AVES Investor Presentation</h1>
            <p className="text-xl lg:text-2xl text-emerald-100 mb-8 leading-relaxed">
              Colombia's Premier Birding Experience - Follow the Birds to Extraordinary Investment Opportunities
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">2,000+</div>
                <div className="text-emerald-200 text-sm">Bird Species</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">80</div>
                <div className="text-emerald-200 text-sm">Unique Endemics</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">4</div>
                <div className="text-emerald-200 text-sm">Max Guests</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-emerald-200 text-sm">Carbon Neutral</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-emerald-700 hover:bg-emerald-50 shadow-lg text-lg px-8 py-4"
                onClick={() => document.getElementById("presentation-deck")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Play className="w-5 h-5 mr-2" />
                View Presentation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-emerald-700 text-lg px-8 py-4 bg-transparent"
                asChild
              >
                <Link href="/contact">
                  <Users className="w-5 h-5 mr-2" />
                  Contact Investors
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Business Highlights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Investment Highlights</h2>
              <p className="text-lg text-gray-600">
                Discover the unique value proposition of AVES in the growing eco-tourism market
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-emerald-800">Unparalleled Market Position</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Colombia hosts the world's highest bird diversity with 1,900+ species. AVES provides exclusive
                    access to 80 unique endemic species through expert-guided, intimate journeys.
                  </p>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                      World's #1 Bird Diversity
                    </Badge>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                      Exclusive Access
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-blue-800">Sustainable Growth Model</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    B Corp Certified with 100% carbon-neutral operations. Our intimate group sizes (max 4 guests) ensure
                    premium pricing while maintaining environmental responsibility.
                  </p>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      B Corp Certified
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Carbon Neutral
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-purple-800">Expert-Led Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Led by expert ornithologists, each tour is limited to 4 guests maximum, ensuring personalized,
                    immersive experiences that command premium pricing in the luxury eco-tourism market.
                  </p>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      Expert Ornithologists
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      Premium Pricing
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Presentation */}
      <section id="presentation-deck" className="py-16 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Interactive Presentation Deck</h2>
              <p className="text-lg text-gray-600 mb-6">
                Explore our comprehensive business presentation with detailed market analysis, financial projections,
                and growth strategy
              </p>

              {/* Presentation Controls Info */}
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 mb-8 border border-emerald-200">
                <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    <span>Navigate with arrow keys</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Maximize2 className="w-4 h-4" />
                    <span>Click fullscreen for best experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    <span>All links are interactive</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Gamma Presentation */}
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-2 border-emerald-200">
              <CardContent className="p-0">
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    src="https://aves-colombias-premier-b-p39lhi8.gamma.site/"
                    className="absolute inset-0 w-full h-full rounded-lg"
                    title="AVES Investor Presentation Deck"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation allow-top-navigation-by-user-activation"
                    loading="lazy"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Presentation Summary */}
            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-emerald-800 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Market Opportunity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>Global eco-tourism market growing at 15% CAGR</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>Colombia's unique position as world's most biodiverse country</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>Premium birding tourism commands 3x higher margins</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>Untapped market with limited high-quality operators</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Competitive Advantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Exclusive access to 80 endemic species</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Expert ornithologist-led expeditions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Intimate group sizes ensure premium pricing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>B Corp certification and carbon-neutral operations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Opportunity */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Invest in the Future of Eco-Tourism?</h2>
            <p className="text-xl text-emerald-100 mb-8">
              Join us in building Colombia's premier birding experience while generating sustainable returns and
              positive environmental impact.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                <div className="text-2xl font-bold text-white mb-2">$2.5M</div>
                <div className="text-emerald-200">Series A Target</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                <div className="text-2xl font-bold text-white mb-2">3-5x</div>
                <div className="text-emerald-200">Projected ROI</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                <div className="text-2xl font-bold text-white mb-2">18 months</div>
                <div className="text-emerald-200">Break-even Timeline</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-4">
                <Link href="/contact">
                  <Users className="w-5 h-5 mr-2" />
                  Schedule Investor Meeting
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white text-white hover:bg-white hover:text-emerald-600 text-lg px-8 py-4 bg-transparent"
              >
                <Link href="/about">
                  <Globe className="w-5 h-5 mr-2" />
                  Learn More About AVES
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Next Steps</h2>
              <p className="text-lg text-gray-600">Ready to explore this investment opportunity further?</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Review Presentation</h3>
                  <p className="text-gray-600 mb-4">
                    Explore our comprehensive deck above with detailed financials and market analysis
                  </p>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Full Screen
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Schedule Meeting</h3>
                  <p className="text-gray-600 mb-4">
                    Connect with our team to discuss investment terms and answer your questions
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/contact">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Meeting
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Due Diligence</h3>
                  <p className="text-gray-600 mb-4">
                    Access detailed financial documents, legal information, and operational data
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/contact">
                      <Users className="w-4 h-4 mr-2" />
                      Request Access
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
