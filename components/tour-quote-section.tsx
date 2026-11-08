/**
 * Public experience pages invite a personal proposal instead of publishing rates.
 * The existing preset route carries the chosen style into the enquiry form.
 * Issued customer proposals and their prices belong to the private account flow.
 */
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const styles = {
  adventure: { name: "Adventure", background: "bg-emerald-50", button: "bg-emerald-600 hover:bg-emerald-700" },
  vision: { name: "Vision", background: "bg-purple-50", button: "bg-purple-600 hover:bg-purple-700" },
  elevate: { name: "Elevate", background: "bg-yellow-50", button: "bg-yellow-600 hover:bg-yellow-700" },
  souls: { name: "Souls", background: "bg-red-50", button: "bg-red-600 hover:bg-red-700" },
} as const

export default function TourQuoteSection({ tour }: { tour: keyof typeof styles }) {
  const style = styles[tour]
  return <section className={`py-16 sm:py-20 ${style.background}`} aria-labelledby="personal-proposal-heading">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-7 text-center shadow-sm sm:p-10">
        <h2 id="personal-proposal-heading" className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl">Plan your {style.name} journey</h2>
        <p className="mt-5 text-lg leading-relaxed text-gray-600">Share the route, dates and pace you have in mind. We’ll discuss guiding, stays and other arrangements, then confirm the itinerary, inclusions and availability in a personal proposal.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href={`/shopping?preset=${tour}`}><Button size="lg" className={`min-h-12 ${style.button}`}>Request a personal quote<ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Button></Link>
          <Link href="/contact"><Button size="lg" variant="outline" className="min-h-12">Ask questions</Button></Link>
        </div>
        <p className="mt-4 text-sm leading-6 text-gray-500">A trip request does not confirm a booking.</p>
      </div>
    </div>
  </section>
}
