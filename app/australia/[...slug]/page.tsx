import { australiaMetadata } from "@/features/australia/lib/metadata"
/*
 * Server-rendered fallback for public information pages and Australian trip-style pages.
 * A catch-all slug is an array: /tours/vision becomes ["tours", "vision"].
 * Most editable information copy comes from content/information.ts; specific app routes take precedence.
 */
import type { Metadata } from "next"
import { SiteLink as Link } from "@/features/australia/components/site-link"
import { notFound, redirect } from "next/navigation"
import { ArrowRight, Bird } from "lucide-react"
import { PageShell } from "@/features/australia/components/page-shell"
import HomepageBirdCarousel from "@/features/australia/components/homepage-bird-carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { information } from "@/features/australia/content/information"
import { canonicalUrl } from "@/features/australia/lib/site-path"

type Props = { params: Promise<{slug:string[]}> }
// Trip-style copy lives here; these are inquiry starting points rather than dates/prices from inventory.
const styles = [
  {slug:"adventure",name:"Adventure Tours",icon:"🍃",description:"Explore birdlife and natural habitats with a journey shaped around curiosity, your interests and your preferred pace."},
  {slug:"vision",name:"Vision Tours",icon:"🪶",description:"Discuss a birding and photography-focused journey, with time to observe and enjoy the details."},
  {slug:"elevate",name:"Elevate Tours",icon:"🌼",description:"Imagine a nature-focused journey with room to slow down, learn and reconnect with the outdoors."},
  {slug:"souls",name:"Souls Tours",icon:"🍓",description:"Share your ideas for a personal journey centred on connection, meaningful experiences and the natural world."},
]

// Next.js calls this separately to build the browser/search title and preferred public URL.
export async function generateMetadata({params}:Props):Promise<Metadata> {
  const path = (await params).slug.join("/")
  return australiaMetadata({title:information[path]?.title || styles.find(style=>`tours/${style.slug}`===path)?.name || "Australian Trip Styles", description: information[path]?.description || styles.find(style=>`tours/${style.slug}`===path)?.description, alternates: { canonical: canonicalUrl(`/${path}`) }})
}

export default async function InformationPage({params}:Props) {
  const path = (await params).slug.join("/")
  // Retire old shopping/calendar links into the real inquiry flow instead of showing a checkout.
  if (path === "shopping" || path === "calendar") redirect("/australia/contact")
  const tour = styles.find(style=>`tours/${style.slug}` === path)
  if (path === "tours" || tour) return <PageShell path={`/${path}`} title={tour ? `${tour.name} in Australia` : "Explore Our Australian Trip Styles"} description="The familiar AVES tour styles are a starting point for your ideas. Our Australian journeys are being developed; routes, guides, dates and pricing will be confirmed personally." media={<HomepageBirdCarousel autoPlay={false} className="w-full" />}><section className="py-16 bg-gradient-to-br from-blue-50 to-emerald-50"><div className={`max-w-6xl mx-auto px-4 grid ${tour ? "max-w-3xl" : "md:grid-cols-2"} gap-8`}>{(tour?[tour]:styles).map(style=><Card key={style.slug} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white"><CardContent className="p-8"><div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6 text-3xl">{style.icon}</div><h2 className="text-2xl font-bold text-gray-900 mb-4">{style.name}</h2><p className="text-gray-600 leading-relaxed mb-6">{style.description}</p><p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 p-4 rounded-lg mb-6">Australian itinerary development • Custom inquiries welcome</p><Link href={tour?`/contact?tour=${style.slug}`:`/tours/${style.slug}`}><Button className="bg-emerald-600 hover:bg-emerald-700">{tour?"Discuss This Journey":"Explore This Style"}<ArrowRight className="ml-2 w-4 h-4" /></Button></Link></CardContent></Card>)}</div></section></PageShell>
  // Remaining known paths use the information catalogue; unknown paths return the proper 404.
  const page = information[path]
  if (!page) notFound()
  return <PageShell path={`/${path}`} title={page.title} description={page.description} media={path === "blog" ? <HomepageBirdCarousel autoPlay={false} className="w-full" /> : undefined}><section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50"><div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">{page.sections.map(section=><Card key={section.title} className="border-0 shadow-lg bg-white"><CardContent className="p-8"><div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-5"><Bird className="w-6 h-6 text-emerald-600" /></div><h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2><p className="text-gray-600 leading-relaxed">{section.text}</p>{section.href && <Link href={section.href} className="inline-flex items-center gap-2 mt-5 text-emerald-700 font-medium hover:underline">{section.link}<ArrowRight className="w-4 h-4" /></Link>}</CardContent></Card>)}</div></section></PageShell>
}
