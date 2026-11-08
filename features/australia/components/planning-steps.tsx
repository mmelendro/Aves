/*
 * Reusable three-step explanation of the personal planning process. This is display content,
 * not a booking engine. The homepage shows a learn-more link; the full process page hides that self-link.
 */
import { SiteLink as Link } from "@/features/australia/components/site-link"
import { ArrowRight, MessageCircle, NotebookPen, FileCheck2 } from "lucide-react"

const steps = [
  { title: "Share what inspires you", icon: MessageCircle, text: "Send an enquiry with your interests, possible dates and preferred pace. You can start without an account." },
  { title: "Shape your trip", icon: NotebookPen, text: "Discuss the possibilities with AVES. An optional account keeps your draft plans together and lets you request a quote." },
  { title: "Review your proposal", icon: FileCheck2, text: "View your personal proposal, price in Australian dollars, inclusions and exclusions. Agree the final arrangements with AVES before booking." },
]

export function PlanningSteps({ showLink = true }: { showLink?: boolean }) {
  return <section className="bg-white py-14 lg:py-20" aria-labelledby="planning-heading"><div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mb-10 text-center"><p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-700">From first idea to personal proposal</p><h2 id="planning-heading" className="text-3xl font-bold text-gray-900 lg:text-4xl">A little planning. A lot to look forward to.</h2></div><ol className="grid gap-7 md:grid-cols-3">{steps.map(({ title, icon: Icon, text }, index) => <li key={title} className="rounded-xl border border-emerald-100 bg-white p-6 shadow-md"><div className="mb-5 flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-lg font-semibold text-emerald-800">{index + 1}</span><Icon className="h-6 w-6 text-emerald-600" aria-hidden="true" /></div><h3 className="text-xl font-bold text-gray-900">{title}</h3><p className="mt-3 leading-relaxed text-gray-600">{text}</p></li>)}</ol>{showLink && <div className="mt-7 text-center"><Link href="/how-it-works" className="inline-flex min-h-11 items-center gap-2 font-semibold text-emerald-700 underline-offset-4 hover:underline">How planning with AVES works <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>}</div></section>
}
