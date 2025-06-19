"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Users, Menu, X, ChevronDown, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleBusinessPlanDownload = () => {
    // Simple download function for any remaining download needs
    const link = document.createElement("a")
    link.href = "/documents/aves-focused-business-plan-2024-2027.pdf"
    link.download = "AVES-Focused-Business-Plan-2024-2027.pdf"
    link.click()
  }

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
            <Link href="/shopping" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Tours
            </Link>
            {/* About Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-emerald-600 font-medium transition-colors">
                About
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link
                  href="/about"
                  className="block px-4 py-3 text-emerald-600 font-medium hover:bg-emerald-50 transition-colors"
                >
                  About AVES
                </Link>
                <Link
                  href="/team"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  Our Team
                </Link>
              </div>
            </div>
            <Link href="/about/b-corp" className="text-gray-700 hover:text-emerald-600 transition-colors">
              B Corp Journey
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Blog
            </Link>
            <Link href="/#conservation" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Conservation
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Link href="/shopping">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Book Your Journey</Button>
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
                href="/shopping"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tours
              </Link>
              <div className="py-2">
                <div className="text-emerald-600 font-medium py-2">About</div>
                <div className="pl-4 space-y-2">
                  <Link
                    href="/about"
                    className="block text-emerald-600 font-medium transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About AVES
                  </Link>
                  <Link
                    href="/team"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Our Team
                  </Link>
                </div>
              </div>
              <Link
                href="/about/b-corp"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2"
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
                href="/contact"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4">
                <Link href="/shopping">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Book Your Journey</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4">About AVES</Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Pioneering Sustainable Birding Tourism</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AVES Birdwatching Tours is a premium ecotourism company offering exclusive small-group birding expeditions
            across Colombia. Each tour immerses travelers in the country's unparalleled bird diversity while advancing a
            strong conservation mission through our innovative Conservation Endowment Trust (CET) structure.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
              <Image
                src="/images/chestnut-crowned-antpitta.jpg"
                alt="Chestnut-crowned Antpitta representing AVES' scientific approach to finding elusive cloud forest specialists"
                width={600}
                height={450}
                className="object-contain w-full h-full"
              />
            </div>

            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission & Vision</h2>

              <div className="bg-emerald-50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-2">Our Mission</h3>
                <p className="text-gray-700 italic">
                  "To deliver immersive, scientifically enriched birding experiences that transparently finance
                  ecosystem restoration, uplift local communities, and foster lasting environmental stewardship."
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-2">Our Vision</h3>
                <p className="text-gray-700 italic">
                  "To become the leading conservation-focused ecotourism B Corporation, ensuring every journey
                  undertaken directly funds measurable habitat restoration and sustainably empowers local communities in
                  Earth's most biodiverse regions."
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">Conservation-First Approach</div>
                    <div className="text-gray-600">
                      Every tour directly funds habitat protection through our Conservation Endowment Trust
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">Ultra-Small Group Excellence</div>
                    <div className="text-gray-600">
                      Maximum 4 guests per tour (2 for Souls tours) for personalized, low-impact experiences
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">B Corp Certification Pursuit</div>
                    <div className="text-gray-600">
                      Aiming to become the second birding-focused B Corp globally, following BirdsChile
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">Carbon Neutral Operations</div>
                    <div className="text-gray-600">
                      All tours operate with full carbon neutrality, with offsets reinvested in critical bird habitats
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/shopping">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Structure & Governance */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Legal Structure & Governance</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AVES operates under an innovative legal framework designed to maximize social and environmental impact
              through our Conservation Endowment Trust (CET) structure
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div>
              <Card className="p-8 border-0 shadow-lg h-full">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                    <Shield className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Conservation Endowment Trust (CET)</h3>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>
                    AVES is structured around our innovative Conservation Endowment Trust, which legally commits the
                    company to:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mr-2 mt-1 flex-shrink-0" />
                      <span>
                        <strong>10% of net profit or 1% of gross revenue</strong> (whichever is higher) annually
                        dedicated to conservation
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mr-2 mt-1 flex-shrink-0" />
                      <span>Perpetual habitat restoration and community-driven conservation projects</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mr-2 mt-1 flex-shrink-0" />
                      <span>Non-revocable mission-locked by-law ensuring lasting environmental impact</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mr-2 mt-1 flex-shrink-0" />
                      <span>Transparent annual reporting of fund allocation and measurable outcomes</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>

            <div>
              <Card className="p-8 border-0 shadow-lg h-full">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Benefit Company Structure</h3>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>
                    AVES is incorporated as a Benefit Company in British Columbia, embedding social and environmental
                    responsibility into our legal framework:
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Stakeholder-Centric Ownership</h4>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>
                          • <strong>Employee Stock Option Plan (ESOP):</strong> Up to 10% of shares reserved for
                          employees
                        </li>
                        <li>
                          • <strong>Staff Equity Trust (SET):</strong> 10% of annual net profits allocated to employee
                          ownership
                        </li>
                        <li>
                          • <strong>Mission-Locked Governance:</strong> Legal mandate to prioritize stakeholder
                          interests
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Regulatory Compliance</h4>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>• Canadian Business Registration & Provincial Licensing</li>
                        <li>• Colombian National Tourism Registry (RNT) Compliance</li>
                        <li>• Comprehensive Liability & Professional Insurance Coverage</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Stakeholder Rights & Commitments */}
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Stakeholder Rights & Commitments</h3>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="text-center lg:text-left">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4">
                    <span className="text-emerald-600 font-bold text-lg">%</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-4 text-xl">Economic Rights Distribution</h4>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700 font-medium">Founder (Class A Shares):</span>
                    <span className="font-bold text-emerald-600 text-lg">≥70%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700 font-medium">Employee Ownership (ESOP/SET):</span>
                    <span className="font-bold text-emerald-600 text-lg">Up to 20%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700 font-medium">Conservation Trust (CET):</span>
                    <span className="font-bold text-emerald-600 text-lg">10% min</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700 font-medium">Community Investment:</span>
                    <span className="font-bold text-emerald-600 text-lg">12%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="text-center lg:text-left">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4">
                    <span className="text-blue-600 font-bold text-lg">⚖</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-4 text-xl">Governance Structure</h4>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div className="flex items-start space-x-3 py-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold text-gray-900 block">Mission-Driven Decision Making</span>
                      <span className="text-gray-600 text-sm">
                        All decisions consider environmental and social impact
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 py-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold text-gray-900 block">Annual Benefit Reports</span>
                      <span className="text-gray-600 text-sm">
                        Public transparency on social and environmental performance
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 py-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold text-gray-900 block">Stakeholder Advisory Input</span>
                      <span className="text-gray-600 text-sm">
                        Regular feedback mechanisms for employees and communities
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 py-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold text-gray-900 block">B Corp Accountability</span>
                      <span className="text-gray-600 text-sm">
                        Third-party verification of impact claims and practices
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency & Financial Disclosure */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Transparency & Financial Disclosure</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete transparency regarding our operations, finances, and impact based on our comprehensive business
              plan and B Corp assessment framework
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="p-6 border-0 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Revenue Allocation Model</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Direct Conservation (CET):</span>
                  <span className="font-semibold text-emerald-600">10%</span>
                </div>
                <div className="flex justify-between">
                  <span>Community Investment:</span>
                  <span className="font-semibold text-emerald-600">12%</span>
                </div>
                <div className="flex justify-between">
                  <span>Guide Compensation:</span>
                  <span className="font-semibold text-emerald-600">25%</span>
                </div>
                <div className="flex justify-between">
                  <span>Tour Operations (COGS):</span>
                  <span className="font-semibold text-gray-600">50%</span>
                </div>
                <div className="flex justify-between">
                  <span>Business Operations:</span>
                  <span className="font-semibold text-gray-600">3%</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Operational Projections</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Year 1 Revenue Target:</span>
                  <span className="font-semibold">CAD $561,600</span>
                </div>
                <div className="flex justify-between">
                  <span>Projected Tours (Year 1):</span>
                  <span className="font-semibold">46 bookings</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Tour Value:</span>
                  <span className="font-semibold">CAD $10,400-$18,200</span>
                </div>
                <div className="flex justify-between">
                  <span>Gross Margin Target:</span>
                  <span className="font-semibold text-emerald-600">~50%</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">B Corp Assessment Metrics</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Target B Corp Score:</span>
                  <span className="font-semibold text-emerald-600">≥80 points</span>
                </div>
                <div className="flex justify-between">
                  <span>Certification Timeline:</span>
                  <span className="font-semibold">Q4 2026</span>
                </div>
                <div className="flex justify-between">
                  <span>Carbon Neutrality:</span>
                  <span className="font-semibold text-emerald-600">100%</span>
                </div>
                <div className="flex justify-between">
                  <span>Local Guide Employment:</span>
                  <span className="font-semibold">~10 guides</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-0 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Financial Structure & Funding</h3>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Startup Investment</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Initial Founder Contribution: CAD $10,000</li>
                    <li>• Equipment Investment: ~CAD $25,000 (professional optics & cameras)</li>
                    <li>• Projected Loan Package: CAD $75,000 (Futurpreneur & BDC)</li>
                    <li>• Marketing Budget (Year 1): CAD $80,000</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Cost Structure</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Tour Cost of Goods Sold: ~50% of revenue</li>
                    <li>• Marketing & Sales: ~14% of revenue</li>
                    <li>• Operations & Administration: ~8% of revenue</li>
                    <li>• Conservation & Community: ~22% of revenue</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-0 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Impact Measurement Framework</h3>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Conservation Metrics</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Habitat restoration funding tracked per tour</li>
                    <li>• Carbon offset verification and reinvestment</li>
                    <li>• Species documentation and citizen science contribution</li>
                    <li>• Protected area support through park fees and partnerships</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Social Impact Tracking</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Local guide employment and fair wage standards</li>
                    <li>• Community-based tourism revenue distribution</li>
                    <li>• Indigenous partnership respect and cultural preservation</li>
                    <li>• Employee ownership and profit-sharing implementation</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Legal Compliance Notice */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Legal Compliance & Regulatory Framework</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              AVES Birdwatching Tours operates under a comprehensive legal and regulatory framework designed to ensure
              full compliance with tourism regulations in both Canada and Colombia. Our innovative Conservation
              Endowment Trust (CET) structure is legally embedded through mission-locked by-laws as part of our British
              Columbia Benefit Company incorporation. We maintain comprehensive liability insurance, professional
              certifications, and adhere to all applicable tourism industry standards. Our legal structure represents a
              pioneering approach to binding conservation commitments in the ecotourism sector, ensuring transparency
              and accountability in all operations.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-gray-600">
              <span>BC Benefit Company Structure</span>
              <span>•</span>
              <span>CET Legal Framework</span>
              <span>•</span>
              <span>B Corp Certification Target: Q4 2026</span>
              <span>•</span>
              <span>Full Regulatory Compliance</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Experience Colombia's Biodiversity?</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join us for an exclusive, conservation-focused birding experience that directly funds habitat restoration
            through our innovative Conservation Endowment Trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shopping">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-4">
                Book Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
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
                Premium birding tours in Colombia, committed to conservation through our innovative Conservation
                Endowment Trust structure.
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
                  <Link href="/shopping?preset=adventure" className="hover:text-white transition-colors">
                    🍃 AVES Adventure
                  </Link>
                </li>
                <li>
                  <Link href="/shopping?preset=vision" className="hover:text-white transition-colors">
                    🪶 AVES Vision
                  </Link>
                </li>
                <li>
                  <Link href="/shopping?preset=elevate" className="hover:text-white transition-colors">
                    🌼 AVES Elevate
                  </Link>
                </li>
                <li>
                  <Link href="/shopping?preset=souls" className="hover:text-white transition-colors">
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
                  <Link href="/team" className="hover:text-white transition-colors flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Our Team
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
                  <Link href="/contact" className="hover:text-white transition-colors">
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
