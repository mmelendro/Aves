"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Target, Users, Leaf, Globe, Award, ArrowRight, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function BCorpPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/">
              <Image
                src="/images/aves-logo.png"
                alt="AVES Birdwatching Tours Logo"
                width={50}
                height={50}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/tours" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Tours
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-emerald-600 transition-colors">
              About
            </Link>
            <Link href="/about/b-corp" className="text-emerald-600 font-semibold">
              B Corp Journey
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Blog
            </Link>
            <Link href="/#conservation" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Conservation
            </Link>
            <Link href="/#contact" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Link href="#tours">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Book Your Adventure</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              <Link
                href="/tours"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tours
              </Link>
              <Link
                href="/about"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/about/b-corp"
                className="block text-emerald-600 font-semibold py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                B Corp Journey
              </Link>
              <Link
                href="/blog"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/#conservation"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Conservation
              </Link>
              <Link
                href="/#contact"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4">
                <Link href="/tours">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Book Your Adventure</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4">🌱 Sustainability Journey</Badge>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">Our B Corp Journey</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            AVES is committed to becoming the first B Corp certified birding company in Colombia, joining BirdsChile as
            only the second birding-focused B Corp globally. Our journey toward certification reflects our dedication to
            the highest standards of social and environmental responsibility.
          </p>
        </div>
      </section>

      {/* What is B Corp Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Does B Corp Certification Mean?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              B Corp certification is awarded to companies that meet the highest standards of verified social and
              environmental performance, public transparency, and legal accountability to balance profit and purpose.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-emerald-50 rounded-2xl">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Environment</h3>
              <p className="text-gray-600">
                Measuring environmental impact and commitment to sustainable practices, carbon neutrality, and habitat
                protection.
              </p>
            </div>

            <div className="text-center p-8 bg-blue-50 rounded-2xl">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Community</h3>
              <p className="text-gray-600">
                Supporting local communities, indigenous partnerships, and contributing to economic development in the
                regions we operate.
              </p>
            </div>

            <div className="text-center p-8 bg-purple-50 rounded-2xl">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Governance</h3>
              <p className="text-gray-600">
                Transparent decision-making, stakeholder engagement, and accountability in all business operations and
                impact reporting.
              </p>
            </div>

            <div className="text-center p-8 bg-orange-50 rounded-2xl">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Impact</h3>
              <p className="text-gray-600">
                Measuring and improving positive impact on workers, customers, suppliers, and the broader ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Roadmap Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our B Corp Certification Roadmap</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're taking a systematic approach to meet and exceed B Corp standards across all areas of our business,
              addressing the comprehensive B Impact Assessment that evaluates companies across five key impact areas.
            </p>
          </div>

          <div className="space-y-16">
            {/* Phase 1 - Foundation & Assessment (Completed) */}
            <div className="relative">
              <div className="flex items-start space-x-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-xl p-8 shadow-xl border-l-4 border-emerald-600">
                    <div className="flex items-center mb-6">
                      <Badge className="bg-emerald-100 text-emerald-800 mr-4 text-sm font-semibold">✓ Completed</Badge>
                      <h3 className="text-3xl font-bold text-gray-900">Phase 1: Foundation & Assessment</h3>
                    </div>
                    <p className="text-lg text-gray-600 mb-6">
                      Completed comprehensive baseline assessment across all five B Corp impact areas, establishing
                      measurement frameworks and identifying areas for improvement.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Governance Assessment</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-emerald-600 mr-2 mt-1 flex-shrink-0" />
                            <span>Mission lock and legal accountability framework established</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-emerald-600 mr-2 mt-1 flex-shrink-0" />
                            <span>Stakeholder governance model with indigenous representation</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-emerald-600 mr-2 mt-1 flex-shrink-0" />
                            <span>Transparency and accountability policies implemented</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Workers Assessment</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-emerald-600 mr-2 mt-1 flex-shrink-0" />
                            <span>Fair compensation analysis for all team members and guides</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-emerald-600 mr-2 mt-1 flex-shrink-0" />
                            <span>Professional development and training programs established</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-emerald-600 mr-2 mt-1 flex-shrink-0" />
                            <span>Health, safety, and wellness benefits framework</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Community Impact</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-emerald-600 mr-2 mt-1 flex-shrink-0" />
                            <span>Indigenous partnership protocols and revenue sharing models</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-emerald-600 mr-2 mt-1 flex-shrink-0" />
                            <span>Local supplier diversity and community investment tracking</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-emerald-600 mr-2 mt-1 flex-shrink-0" />
                            <span>Economic impact measurement in operating regions</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Environment & Customers</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-emerald-600 mr-2 mt-1 flex-shrink-0" />
                            <span>Complete carbon footprint assessment and neutrality plan</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-emerald-600 mr-2 mt-1 flex-shrink-0" />
                            <span>Conservation impact measurement framework</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-emerald-600 mr-2 mt-1 flex-shrink-0" />
                            <span>Customer education and engagement programs</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 2 - Implementation & Improvement (In Progress) */}
            <div className="relative">
              <div className="flex items-start space-x-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-xl p-8 shadow-xl border-l-4 border-blue-600">
                    <div className="flex items-center mb-6">
                      <Badge className="bg-blue-100 text-blue-800 mr-4 text-sm font-semibold">🔄 In Progress</Badge>
                      <h3 className="text-3xl font-bold text-gray-900">Phase 2: Implementation & Improvement</h3>
                    </div>
                    <p className="text-lg text-gray-600 mb-6">
                      Currently implementing enhanced policies and practices to meet B Corp standards, with focus on
                      achieving minimum scores across all impact areas and preparing for verification.
                    </p>

                    <div className="space-y-6">
                      <div className="bg-blue-50 rounded-lg p-6">
                        <h4 className="font-bold text-blue-900 mb-4">Key Questions We're Addressing:</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium text-blue-800 mb-2">Governance & Accountability:</p>
                            <ul className="space-y-1 text-blue-700">
                              <li>• How do we ensure stakeholder voice in major decisions?</li>
                              <li>• What legal structures best protect our mission?</li>
                              <li>• How do we measure and report our impact transparently?</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium text-blue-800 mb-2">Worker Equity & Benefits:</p>
                            <ul className="space-y-1 text-blue-700">
                              <li>• How do we ensure fair compensation across all roles?</li>
                              <li>• What professional development opportunities can we provide?</li>
                              <li>• How do we create inclusive, safe working environments?</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium text-blue-800 mb-2">Community Investment:</p>
                            <ul className="space-y-1 text-blue-700">
                              <li>• How do we maximize economic benefits to local communities?</li>
                              <li>• What percentage of suppliers should be local/diverse?</li>
                              <li>• How do we support indigenous land rights and sovereignty?</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium text-blue-800 mb-2">Environmental Impact:</p>
                            <ul className="space-y-1 text-blue-700">
                              <li>• How do we achieve and maintain carbon neutrality?</li>
                              <li>• What conservation outcomes can we directly measure?</li>
                              <li>• How do we minimize our operational footprint?</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold text-gray-900 mb-3">Current Implementation Focus</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start">
                              <Clock className="w-4 h-4 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                              <span>Enhanced worker equity policies and profit-sharing programs</span>
                            </li>
                            <li className="flex items-start">
                              <Clock className="w-4 h-4 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                              <span>Supplier diversity initiatives and local sourcing expansion</span>
                            </li>
                            <li className="flex items-start">
                              <Clock className="w-4 h-4 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                              <span>Community investment program with measurable outcomes</span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-bold text-gray-900 mb-3">Environmental Certifications</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start">
                              <Clock className="w-4 h-4 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                              <span>ISO 14001 Environmental Management System certification</span>
                            </li>
                            <li className="flex items-start">
                              <Clock className="w-4 h-4 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                              <span>Carbon Trust certification for carbon neutrality</span>
                            </li>
                            <li className="flex items-start">
                              <Clock className="w-4 h-4 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                              <span>Conservation impact verification through third parties</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 3 - Verification & Certification (Planned) */}
            <div className="relative">
              <div className="flex items-start space-x-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-xl p-8 shadow-xl border-l-4 border-purple-600">
                    <div className="flex items-center mb-6">
                      <Badge className="bg-purple-100 text-purple-800 mr-4 text-sm font-semibold">🎯 Q2 2025</Badge>
                      <h3 className="text-3xl font-bold text-gray-900">Phase 3: Verification & Certification</h3>
                    </div>
                    <p className="text-lg text-gray-600 mb-6">
                      Final assessment, third-party verification, and submission for official B Corp certification. This
                      phase includes rigorous documentation review and site verification processes.
                    </p>

                    <div className="space-y-6">
                      <div className="bg-purple-50 rounded-lg p-6">
                        <h4 className="font-bold text-purple-900 mb-4">Certification Requirements & Timeline:</h4>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600 mb-2">80+</div>
                            <div className="text-sm text-purple-800">Minimum B Impact Score Required</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600 mb-2">6-10</div>
                            <div className="text-sm text-purple-800">Months Verification Process</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600 mb-2">3rd</div>
                            <div className="text-sm text-purple-800">Party Site Verification</div>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold text-gray-900 mb-3">Verification Process</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start">
                              <Target className="w-4 h-4 text-purple-600 mr-2 mt-1 flex-shrink-0" />
                              <span>Complete B Impact Assessment submission (200+ questions)</span>
                            </li>
                            <li className="flex items-start">
                              <Target className="w-4 h-4 text-purple-600 mr-2 mt-1 flex-shrink-0" />
                              <span>Documentation review and evidence verification</span>
                            </li>
                            <li className="flex items-start">
                              <Target className="w-4 h-4 text-purple-600 mr-2 mt-1 flex-shrink-0" />
                              <span>On-site verification including community interviews</span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-bold text-gray-900 mb-3">Legal Accountability</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start">
                              <Target className="w-4 h-4 text-purple-600 mr-2 mt-1 flex-shrink-0" />
                              <span>Legal structure amendment to include stakeholder governance</span>
                            </li>
                            <li className="flex items-start">
                              <Target className="w-4 h-4 text-purple-600 mr-2 mt-1 flex-shrink-0" />
                              <span>Mission lock provisions in corporate documents</span>
                            </li>
                            <li className="flex items-start">
                              <Target className="w-4 h-4 text-purple-600 mr-2 mt-1 flex-shrink-0" />
                              <span>Annual benefit report publication commitment</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="font-bold text-gray-900 mb-3">Expected Outcomes & Impact</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                          <div>
                            <p className="font-medium mb-2">Certification Achievement:</p>
                            <ul className="space-y-1 text-sm">
                              <li>• Official B Corp certification and logo usage rights</li>
                              <li>• Membership in global B Corp community</li>
                              <li>• Access to B Corp marketing and partnership opportunities</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium mb-2">Ongoing Commitments:</p>
                            <ul className="space-y-1 text-sm">
                              <li>• Annual impact reporting and transparency</li>
                              <li>• Recertification every three years</li>
                              <li>• Continuous improvement in all impact areas</li>
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
        </div>
      </section>

      {/* Current Initiatives Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Current B Corp Initiatives</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're already implementing many B Corp principles in our daily operations and tour experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-emerald-50 rounded-lg p-8">
              <Leaf className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Carbon Neutral Operations</h3>
              <p className="text-gray-600">
                All tours operate with full carbon neutrality, with offsets reinvested in critical bird habitat
                preservation projects throughout Colombia.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-8">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Indigenous Partnerships</h3>
              <p className="text-gray-600">
                Fair employment and revenue sharing with indigenous communities, supporting traditional ecological
                knowledge and land rights.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-8">
              <Globe className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Conservation Endowment</h3>
              <p className="text-gray-600">
                10% of net profits fund our Conservation Endowment Trust, dedicated to permanent habitat restoration and
                protection.
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-8">
              <Award className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Transparent Reporting</h3>
              <p className="text-gray-600">
                Annual impact reports detailing our environmental, social, and economic contributions to conservation
                and communities.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-8">
              <Target className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Stakeholder Governance</h3>
              <p className="text-gray-600">
                Advisory board including indigenous representatives, conservation scientists, and community leaders
                guiding our decisions.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-8">
              <CheckCircle className="w-12 h-12 text-yellow-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Worker Equity</h3>
              <p className="text-gray-600">
                Profit-sharing programs, comprehensive benefits, and professional development opportunities for all team
                members and guides.
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
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-emerald-600 text-lg px-8 py-4"
            >
              Download Impact Report
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src="/images/aves-logo.png"
                  alt="AVES Birdwatching Tours Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <p className="text-gray-400 mb-4">
                Premium birding tours in Colombia, committed to conservation and sustainable tourism.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                  <span className="text-sm">ig</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                  <span className="text-sm">tw</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Tours</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/tours/adventure" className="hover:text-white transition-colors">
                    🍃 AVES Adventure
                  </Link>
                </li>
                <li>
                  <Link href="/tours/vision" className="hover:text-white transition-colors">
                    🪶 AVES Vision
                  </Link>
                </li>
                <li>
                  <Link href="/tours/elevate" className="hover:text-white transition-colors">
                    🌼 AVES Elevate
                  </Link>
                </li>
                <li>
                  <Link href="/tours/souls" className="hover:text-white transition-colors">
                    🍓 AVES Souls
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    🦅 About AVES
                  </Link>
                </li>
                <li>
                  <Link href="/#conservation" className="hover:text-white transition-colors">
                    🌱 Conservation
                  </Link>
                </li>
                <li>
                  <Link href="/about/b-corp" className="hover:text-white transition-colors flex items-center group">
                    <span className="mr-1 text-xs font-bold bg-white text-gray-900 px-1 rounded">B</span>B Corp Journey
                    <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">↑</span>
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    📝 Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    🐦 Bird Guide
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    ✈️ Travel Tips
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="hover:text-white transition-colors">
                    📞 Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 AVES. All rights reserved.</p>
            <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-white transition-colors">
                🔒 Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                📋 Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                🍪 Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
