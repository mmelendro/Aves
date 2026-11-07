import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ExternalLink, Leaf, Target, Users, Globe } from "lucide-react"
import Link from "next/link"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"

const preparationPriorities = [
  {
    title: "Environmental impact",
    description: "Plan how to measure environmental impacts and identify practical ways to reduce them.",
    icon: Leaf,
    colour: "bg-emerald-50",
    iconColour: "text-emerald-600",
  },
  {
    title: "People and communities",
    description: "Review working practices and how our relationships with guides, suppliers and communities can improve.",
    icon: Users,
    colour: "bg-blue-50",
    iconColour: "text-blue-600",
  },
  {
    title: "Accountability",
    description: "Review policies and decision-making with the interests of people and the environment in mind.",
    icon: Target,
    colour: "bg-purple-50",
    iconColour: "text-purple-600",
  },
  {
    title: "Evidence and transparency",
    description: "Identify the records and measures needed to support clear, verifiable reporting on our progress.",
    icon: Globe,
    colour: "bg-orange-50",
    iconColour: "text-orange-600",
  },
]

const roadmap = [
  {
    title: "Understand the requirements",
    description: "Establish what certification would require for AVES and build a clear picture of our starting point.",
    actions: [
      "Review the current B Lab Standards and applicable eligibility requirements.",
      "Gather records of our existing policies, operations and business relationships.",
      "Identify gaps in our practices and the evidence needed to assess them.",
    ],
    milestone: "A documented baseline and a prioritised preparation plan.",
  },
  {
    title: "Plan improvements and document progress",
    description: "Use the baseline to guide practical changes and the way we measure their results.",
    actions: [
      "Set clear responsibilities for the improvements identified during the review.",
      "Develop appropriate policies and measures for our social and environmental impacts.",
      "Keep evidence of changes and review progress against the applicable requirements.",
    ],
    milestone: "Documented improvements and evidence to support a readiness review.",
  },
  {
    title: "Prepare for application and independent review",
    description: "When ready, prepare for the application and verification process required for certification.",
    actions: [
      "Confirm the applicable requirements and application process with B Lab.",
      "Prepare the required information and supporting evidence for submission.",
      "Respond to review findings and share confirmed developments on this page.",
    ],
    milestone: "An application supported by evidence, with certification subject to the required independent review.",
  },
]

export default function BCorpPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader currentPage="/about/b-corp" />

      <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4">
            Pursuing certification
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">Our B Corp Journey</h1>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-emerald-100">
            <p className="text-xl text-gray-700 font-medium leading-relaxed">
              AVES is pursuing B Corp certification. We are not yet a certified B Corporation. Our aim is to strengthen
              how we care for the people, communities and habitats connected to our birding journeys.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding B Corp certification</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              B Corp certification involves meeting B Lab&apos;s applicable social, environmental and governance
              requirements, supported by independent verification. The current standards and certification guidance
              are available directly from B Lab.
            </p>
            <a
              href="https://www.bcorporation.net/standards/performance-requirements/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 text-emerald-600 hover:text-emerald-700 font-semibold underline decoration-2 underline-offset-2 transition-colors duration-200 inline-flex items-center gap-1"
            >
              Explore the B Lab Standards
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Our preparation priorities</h3>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            These are the areas we intend to review as part of our preparation.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {preparationPriorities.map(({ title, description, icon: Icon, colour, iconColour }) => (
              <div key={title} className={`text-center p-6 rounded-xl ${colour}`}>
                <Icon className={`w-10 h-10 mx-auto mb-3 ${iconColour}`} aria-hidden="true" />
                <h4 className="text-lg font-bold text-gray-900 mb-2">{title}</h4>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our planned roadmap</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              This roadmap sets out intended preparation and review milestones. We have no confirmed certification
              date; timing will depend on our readiness and the required assessment process.
            </p>
          </div>
          <ol className="max-w-4xl mx-auto space-y-8">
            {roadmap.map(({ title, description, actions, milestone }, index) => (
              <li key={title} className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border-l-4 border-emerald-500">
                <div className="flex items-start gap-4 mb-5">
                  <span className="w-12 h-12 flex-shrink-0 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xl font-bold">
                    {index + 1}
                  </span>
                  <div>
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-2">Planned work</Badge>
                    <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
                  </div>
                </div>
                <p className="text-gray-600 mb-5">{description}</p>
                <ul className="list-disc pl-5 space-y-3 text-gray-700">
                  {actions.map((action) => (
                    <li key={action}>{action}</li>
                  ))}
                </ul>
                <div className="bg-emerald-50 rounded-lg p-5 mt-6">
                  <p className="font-semibold text-emerald-900 mb-1">Milestone to work towards</p>
                  <p className="text-sm text-emerald-800">{milestone}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Get to know AVES</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Discover our birding journeys and the values behind our ambition to become a certified B Corporation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tours">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-4">
                Explore Our Tours
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
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

      <Footer />
    </div>
  )
}
