import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, FileCheck2, MessageCircle, NotebookPen } from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "How Trip Planning Works",
  description: "Explore Colombia's birding regions, share your interests and discuss the details of a personal journey with AVES.",
  alternates: { canonical: "https://aves.bio/how-it-works" },
}

const steps = [
  {
    title: "Share what inspires you",
    icon: MessageCircle,
    text: "Send an enquiry with your interests, possible dates and preferred pace. A region, a bird you hope to see or a favourite way to travel is enough to start.",
  },
  {
    title: "Shape the journey",
    icon: NotebookPen,
    text: "Discuss the possibilities with AVES, including the route, walking requirements, accommodation and guide arrangements. Share any preferences that will help make the journey right for you.",
  },
  {
    title: "Confirm the details",
    icon: FileCheck2,
    text: "Before booking, confirm availability, your itinerary, the price and currency, what is included and excluded, and the applicable booking terms.",
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader currentPage="/how-it-works" />
      <main id="main-content" tabIndex={-1}>
        <section className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-emerald-700">Planning with AVES Colombia</p>
            <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">Your ideas. A journey taking shape.</h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">Explore first, ask questions and take your time. Here is how to start planning a Colombian birding journey with AVES.</p>
          </div>
        </section>

        <section className="bg-white py-14 lg:py-20" aria-label="Trip planning steps">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ol className="grid gap-7 md:grid-cols-3">
              {steps.map(({ title, icon: Icon, text }, index) => (
                <li key={title} className="rounded-xl border border-emerald-100 bg-white p-6 shadow-md">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-lg font-semibold text-emerald-800">{index + 1}</span>
                    <Icon className="h-6 w-6 text-emerald-600" aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                  <p className="mt-3 leading-relaxed text-gray-600">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-gradient-to-br from-emerald-50 to-blue-50 py-14 lg:py-20">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-xl border border-emerald-100 bg-white p-7 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900">Still finding your inspiration?</h2>
                <p className="mt-4 leading-relaxed text-gray-600">Explore Colombia's regions and birds, or compare the Adventure, Vision, Elevate and Souls collections. You do not need a finished itinerary to get in touch.</p>
                <Button asChild variant="outline" className="mt-6 min-h-11 border-emerald-600 text-emerald-700">
                  <Link href="/aves-explorer">Explore the regions <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
                </Button>
              </article>
              <article className="rounded-xl border border-emerald-100 bg-white p-7 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900">Ready to start a conversation?</h2>
                <p className="mt-4 leading-relaxed text-gray-600">Tell us your interests, group size, possible travel dates and any walking or accommodation preferences. Sending an enquiry starts a conversation; it does not confirm a booking.</p>
                <Button asChild className="mt-6 min-h-11 bg-emerald-600 hover:bg-emerald-700">
                  <Link href="/contact">Plan my Colombian trip <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
                </Button>
              </article>
            </div>
            <div className="mt-9 rounded-xl border border-emerald-100 bg-white/80 p-7">
              <h2 className="text-xl font-bold text-gray-900">Leave room for nature.</h2>
              <p className="mt-3 leading-relaxed text-gray-600">The birds and habitats on this website are inspiration for planning. Wildlife sightings cannot be guaranteed, and routes and conditions need to be discussed for your travel dates.</p>
              <p className="mt-4 leading-relaxed text-gray-600">Have a question? <a href="/australia/contact?topic=general#inquiry" className="font-medium text-emerald-700 underline underline-offset-4">Send AVES a message</a>.</p>
              <Link href="/terms" className="mt-4 inline-flex min-h-11 items-center text-emerald-700 underline underline-offset-4">Read the booking terms</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
