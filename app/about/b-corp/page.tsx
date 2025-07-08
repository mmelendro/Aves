"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Clock,
  Target,
  Users,
  Leaf,
  Globe,
  Award,
  ArrowRight,
  PowerIcon as Gear,
  Hourglass,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"

export default function BCorpPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <NavigationHeader currentPage="/about/b-corp" />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4">🌱 Sustainability Journey</Badge>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">Our B Corp Journey</h1>

          {/* Introductory Summary */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto mb-8 border border-emerald-100">
            <p className="text-xl text-gray-700 font-medium leading-relaxed">
              AVES is committed to becoming the first B Corp certified birding company operating in Colombia. Our
              journey toward certification reflects our dedication to meeting the rigorous standards set by{" "}
              <a
                href="https://www.bcorporation.net/en-us/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 font-semibold underline decoration-2 underline-offset-2 transition-colors duration-200 inline-flex items-center gap-1"
              >
                B Lab
                <ExternalLink className="w-4 h-4" />
              </a>{" "}
              for social and environmental responsibility in sustainable birding tourism.
            </p>
          </div>
        </div>
      </section>

      {/* What is B Corp Section - Condensed */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">B Corp Certification Standards</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              B Corp certification requires meeting the highest verified standards across five key impact areas.{" "}
              <a
                href="https://www.bcorporation.net/en-us/standards/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 font-semibold underline decoration-2 underline-offset-2 transition-colors duration-200 inline-flex items-center gap-1"
              >
                Learn more about B Corp Standards
                <ExternalLink className="w-4 h-4" />
              </a>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-emerald-50 rounded-xl">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Environment</h3>
              <p className="text-sm text-gray-600">Carbon neutrality, habitat protection, and sustainable practices.</p>
            </div>

            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Community</h3>
              <p className="text-sm text-gray-600">Indigenous partnerships and local economic development.</p>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Governance</h3>
              <p className="text-sm text-gray-600">Transparent decision-making and stakeholder accountability.</p>
            </div>

            <div className="text-center p-6 bg-orange-50 rounded-xl">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Impact</h3>
              <p className="text-sm text-gray-600">Measuring positive impact on all stakeholders.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Roadmap Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Certification Timeline</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic three-phase approach to achieving B Corp certification and becoming Colombia's first
              certified sustainable birding company.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Timeline Container */}
            <div className="relative">
              {/* Vertical Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-400 via-blue-400 to-blue-400 hidden md:block"></div>

              {/* Phase 1 - Foundation & Assessment (In Progress) */}
              <div className="relative mb-16">
                <div className="flex items-start">
                  {/* Timeline Icon */}
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                      <Gear className="w-8 h-8 text-white animate-spin" style={{ animationDuration: "3s" }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="ml-8 flex-1">
                    <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-amber-500">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                        <div>
                          <Badge className="bg-amber-100 text-amber-800 mb-2 text-sm font-semibold">
                            ⚙️ In Progress
                          </Badge>
                          <h3 className="text-2xl font-bold text-gray-900">Phase 1: Foundation & Assessment</h3>
                          <p className="text-gray-600 mt-2">
                            Comprehensive baseline assessment and framework establishment
                          </p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                            <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                            Completed Assessments
                          </h4>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li>• Governance and legal accountability framework</li>
                            <li>• Worker equity and compensation analysis</li>
                            <li>• Indigenous partnership protocols established</li>
                            <li>• Carbon footprint assessment completed</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                            <Clock className="w-4 h-4 text-amber-600 mr-2" />
                            Current Focus Areas
                          </h4>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li>• Stakeholder governance model refinement</li>
                            <li>• Community investment measurement</li>
                            <li>• Environmental impact verification</li>
                            <li>• Transparency reporting systems</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 2 - Implementation (Coming Q3 2025) */}
              <div className="relative mb-16">
                <div className="flex items-start">
                  {/* Timeline Icon */}
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                      <Hourglass className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="ml-8 flex-1">
                    <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-blue-500">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                        <div>
                          <Badge className="bg-blue-100 text-blue-800 mb-2 text-sm font-semibold">
                            ⏳ Coming Q3 2025
                          </Badge>
                          <h3 className="text-2xl font-bold text-gray-900">Phase 2: Implementation</h3>
                          <p className="text-gray-600 mt-2">Enhanced policies and practices to meet B Corp standards</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold text-gray-900 mb-3">Implementation Priorities</h4>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li>• Enhanced worker equity and profit-sharing</li>
                            <li>• Supplier diversity expansion</li>
                            <li>• Community investment programs</li>
                            <li>• ISO 14001 environmental certification</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-bold text-gray-900 mb-3">Target Outcomes</h4>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li>• 80+ B Impact Assessment score</li>
                            <li>• Carbon Trust certification</li>
                            <li>• Third-party impact verification</li>
                            <li>• Legal structure amendments</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 3 - Verification (Coming Q3 2026) */}
              <div className="relative">
                <div className="flex items-start">
                  {/* Timeline Icon */}
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                      <Hourglass className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="ml-8 flex-1">
                    <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-blue-600">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                        <div>
                          <Badge className="bg-blue-100 text-blue-800 mb-2 text-sm font-semibold">
                            🎯 Coming Q3 2026
                          </Badge>
                          <h3 className="text-2xl font-bold text-gray-900">Phase 3: Verification & Certification</h3>
                          <p className="text-gray-600 mt-2">Final assessment and official B Corp certification</p>
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-6 mb-6">
                        <h4 className="font-bold text-blue-900 mb-4">Certification Milestones</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-blue-600 mb-1">200+</div>
                            <div className="text-xs text-blue-800">Assessment Questions</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-blue-600 mb-1">6-10</div>
                            <div className="text-xs text-blue-800">Months Process</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-blue-600 mb-1">1st</div>
                            <div className="text-xs text-blue-800">B Corp in Colombia</div>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold text-gray-900 mb-3">Verification Process</h4>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li>• Complete B Impact Assessment submission</li>
                            <li>• Documentation review and evidence verification</li>
                            <li>• On-site verification with community interviews</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-bold text-gray-900 mb-3">Expected Outcomes</h4>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li>• Official B Corp certification</li>
                            <li>• Global B Corp community membership</li>
                            <li>• Annual impact reporting commitment</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Initiatives Section - Condensed */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Current B Corp Initiatives</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're already implementing B Corp principles in our operations and tour experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-emerald-50 rounded-lg p-6">
              <Leaf className="w-10 h-10 text-emerald-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Carbon Neutral Operations</h3>
              <p className="text-sm text-gray-600">
                All tours operate with full carbon neutrality, with offsets reinvested in habitat preservation.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <Users className="w-10 h-10 text-blue-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Indigenous Partnerships</h3>
              <p className="text-sm text-gray-600">
                Fair employment and revenue sharing with indigenous communities and traditional knowledge holders.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <Globe className="w-10 h-10 text-purple-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Conservation Endowment</h3>
              <p className="text-sm text-gray-600">
                10% of net profits fund our Conservation Endowment Trust for permanent habitat protection.
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-6">
              <Award className="w-10 h-10 text-orange-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Transparent Reporting</h3>
              <p className="text-sm text-gray-600">
                Annual impact reports detailing environmental, social, and economic contributions.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <Target className="w-10 h-10 text-green-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Stakeholder Governance</h3>
              <p className="text-sm text-gray-600">
                Advisory board with indigenous representatives and conservation scientists guiding decisions.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6">
              <CheckCircle className="w-10 h-10 text-yellow-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Worker Equity</h3>
              <p className="text-sm text-gray-600">
                Profit-sharing programs and comprehensive benefits for all team members and guides.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Join Our B Corp Journey</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Experience birding tourism that makes a difference. Every tour supports our mission to become Colombia's
            first B Corp certified birding company.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tours">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-4">
                Book a Sustainable Tour
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-emerald-600 text-lg px-8 py-4 bg-transparent"
              >
                Learn About Our Mission
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
