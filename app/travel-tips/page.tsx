import type { Metadata } from "next"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Heart, Leaf, Users, TrendingUp, MapPin, Clock, AlertTriangle, CheckCircle, Globe } from "lucide-react"

export const metadata: Metadata = {
  title: "Travel Tips for Colombia | Essential Guide for Birdwatching Tours | AVES",
  description:
    "Comprehensive travel guide for Colombia covering safety, culture, and sustainable tourism. Learn about Colombia's transformation and how birdwatching supports local communities.",
  keywords:
    "Colombia travel tips, Colombia safety, sustainable tourism, birdwatching Colombia, travel guide, responsible tourism",
}

export default function TravelTipsPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Travel Tips for Colombia</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Your comprehensive guide to visiting Colombia safely and responsibly, while supporting sustainable tourism
            and local communities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Shield className="w-5 h-5 mr-2" />
              Safety First
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Heart className="w-5 h-5 mr-2" />
              Cultural Respect
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Leaf className="w-5 h-5 mr-2" />
              Sustainable Tourism
            </Badge>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Globe className="w-6 h-6 mr-3 text-emerald-600" />
                Colombia Today: A Country Transformed
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                Colombia has undergone a remarkable transformation over the past two decades. Once known primarily for
                its challenges, the country has emerged as one of South America's most dynamic destinations, offering
                unparalleled biodiversity, rich cultural heritage, and warm hospitality. This guide will help you
                understand what to expect and how to travel responsibly while supporting local communities through
                sustainable tourism.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Safety Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Safety in Colombia: Significant Improvements</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  Positive Developments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Peace Process:</strong> The 2016 peace agreement with FARC has significantly improved
                      security in many regions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Tourism Growth:</strong> International visitor numbers have increased by over 300% since
                      2010
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Infrastructure:</strong> Major improvements in roads, airports, and tourist facilities
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Government Support:</strong> Strong commitment to promoting safe, sustainable tourism
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Shield className="w-5 h-5 mr-2 text-blue-600" />
                  Current Safety Landscape
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Tourist Areas:</strong> Major destinations like Cartagena, Bogotá, and Medellín are
                      generally safe for visitors
                    </span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Guided Tours:</strong> Professional tour operators provide safe access to remote birding
                      locations
                    </span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Local Knowledge:</strong> Experienced guides understand current conditions and safe routes
                    </span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Communication:</strong> Improved cell coverage and emergency response systems
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-amber-50 border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-amber-800">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Balanced Perspective
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-800">
                While Colombia has made tremendous progress, it's important to acknowledge that challenges remain in
                some areas. This is why choosing experienced, responsible tour operators like AVES is crucial. We work
                closely with local communities and authorities to ensure safe, meaningful experiences while contributing
                to positive change.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Socioeconomic Impact */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Birdwatching: A Force for Positive Change</h2>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Users className="w-5 h-5 mr-2 text-emerald-600" />
                  Community Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Direct employment as guides, drivers, and hospitality staff</li>
                  <li>• Income for local families through homestays and meals</li>
                  <li>• Market opportunities for local crafts and products</li>
                  <li>• Skills development and capacity building</li>
                  <li>• Alternative livelihoods to extractive industries</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Leaf className="w-5 h-5 mr-2 text-green-600" />
                  Environmental Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Incentivizes forest and habitat conservation</li>
                  <li>• Provides economic value to biodiversity</li>
                  <li>• Supports protected area management</li>
                  <li>• Promotes sustainable land use practices</li>
                  <li>• Funds conservation research and monitoring</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                  Regional Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Infrastructure improvements in rural areas</li>
                  <li>• Increased investment in remote regions</li>
                  <li>• Enhanced connectivity and communication</li>
                  <li>• Educational opportunities and exchanges</li>
                  <li>• Cultural preservation and pride</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-emerald-50 border-emerald-200">
            <CardHeader>
              <CardTitle className="text-2xl text-emerald-800">Success Stories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-emerald-800 mb-2">Chocó Region Transformation</h4>
                  <p className="text-emerald-700 text-sm">
                    Former conflict zones in the Chocó have become premier birding destinations, providing sustainable
                    income to communities while protecting some of the world's most biodiverse forests.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-800 mb-2">Sierra Nevada Indigenous Tourism</h4>
                  <p className="text-emerald-700 text-sm">
                    Indigenous communities in the Sierra Nevada have developed successful ecotourism programs, sharing
                    their cultural knowledge while generating income and protecting sacred lands.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Why Choose Sustainable Tourism */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Sustainable Tourism Companies</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">The AVES Approach</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Heart className="w-5 h-5 mr-2 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Community Partnership:</strong> We work directly with local communities, ensuring fair
                      compensation and meaningful participation
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Leaf className="w-5 h-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Conservation Focus:</strong> Every tour contributes to habitat protection and species
                      monitoring
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Users className="w-5 h-5 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Local Expertise:</strong> Our guides are from the regions we visit, providing authentic
                      cultural exchange
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-5 h-5 mr-2 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Safety Standards:</strong> Rigorous safety protocols and local knowledge ensure secure
                      experiences
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Impact of Your Visit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-emerald-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-emerald-800 mb-2">Economic Impact</h4>
                    <p className="text-emerald-700 text-sm">
                      Your tour directly supports 15-20 local families through employment, services, and purchases.
                    </p>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Conservation Contribution</h4>
                    <p className="text-blue-700 text-sm">
                      A portion of tour fees funds habitat protection and species research programs.
                    </p>
                  </div>
                  <div className="bg-purple-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Cultural Exchange</h4>
                    <p className="text-purple-700 text-sm">
                      Meaningful interactions with local communities promote mutual understanding and respect.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Practical Travel Information */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Practical Travel Information</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  Best Time to Visit
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="mb-2">
                  <strong>Dry Season:</strong> December - March, July - August
                </p>
                <p className="mb-2">
                  <strong>Wet Season:</strong> April - June, September - November
                </p>
                <p className="text-gray-600">
                  Colombia's diverse geography means different regions have varying weather patterns. We'll help you
                  choose the best time for your specific interests.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <MapPin className="w-5 h-5 mr-2 text-green-600" />
                  Entry Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <ul className="space-y-1">
                  <li>• Valid passport (6+ months remaining)</li>
                  <li>• No visa required for most countries (90 days)</li>
                  <li>• Yellow fever vaccination for certain regions</li>
                  <li>• Travel insurance recommended</li>
                  <li>• Return ticket may be requested</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Heart className="w-5 h-5 mr-2 text-red-600" />
                  Health Considerations
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <ul className="space-y-1">
                  <li>• Consult travel medicine specialist</li>
                  <li>• Malaria prophylaxis for some lowland areas</li>
                  <li>• Altitude considerations for Andean regions</li>
                  <li>• Good medical facilities in major cities</li>
                  <li>• Comprehensive travel insurance essential</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Users className="w-5 h-5 mr-2 text-purple-600" />
                  Cultural Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <ul className="space-y-1">
                  <li>• Colombians are warm and welcoming</li>
                  <li>• Spanish is the primary language</li>
                  <li>• Respect for indigenous cultures important</li>
                  <li>• Tipping is appreciated but not mandatory</li>
                  <li>• Dress modestly in rural areas</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Shield className="w-5 h-5 mr-2 text-orange-600" />
                  Safety Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <ul className="space-y-1">
                  <li>• Stay with your group and guide</li>
                  <li>• Keep valuables secure</li>
                  <li>• Use official transportation</li>
                  <li>• Stay informed about local conditions</li>
                  <li>• Register with your embassy</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Leaf className="w-5 h-5 mr-2 text-emerald-600" />
                  Sustainable Practices
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <ul className="space-y-1">
                  <li>• Minimize plastic use</li>
                  <li>• Respect wildlife and habitats</li>
                  <li>• Support local businesses</li>
                  <li>• Follow Leave No Trace principles</li>
                  <li>• Learn about local conservation efforts</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-6 text-emerald-800">Ready to Experience Colombia Responsibly?</h2>
              <p className="text-lg text-emerald-700 mb-8 max-w-2xl mx-auto">
                Join us for an unforgettable journey that supports local communities, protects biodiversity, and
                showcases the incredible transformation of Colombia through sustainable tourism.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/tours"
                  className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Explore Our Tours
                </a>
                <a
                  href="/contact"
                  className="border-2 border-emerald-600 text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  )
}
