/*
 * One reusable regional-guide template, populated by the matching record in content/regions.ts.
 * The URL slug selects the region; this file controls the section order and layout.
 * The featured carousel joins the separate species catalogue through RegionalBirdCarousel.
 */
import type { Metadata } from "next"
import Image from "next/image"
import { SiteLink as Link } from "@/features/australia/components/site-link"
import { notFound } from "next/navigation"
import { ArrowRight, Bird, CalendarDays, ChevronRight, Clock3, ExternalLink, Footprints, Leaf, MapPin } from "lucide-react"
import { PageShell } from "@/features/australia/components/page-shell"
import { Button } from "@/components/ui/button"
import { regions } from "@/features/australia/content/regions"
import { RegionalBirdCarousel } from "@/features/australia/components/regional-bird-carousel"
import { canonicalUrl, sitePath } from "@/features/australia/lib/site-path"

type Props = { params: Promise<{ slug: string }> }

// Use the same lookup for metadata and visible content, so an unknown region cannot show a misleading page.
function findRegion(slug: string) {
  const region = regions.find(item => item.id === slug)
  if (!region) notFound()
  return region
}

// Tell Next.js which region URLs can be prepared from the content catalogue during a build.
export function generateStaticParams() {
  return regions.map(region => ({ slug: region.id }))
}

// Search/share previews use this region record and canonical public URLs.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const region = findRegion((await params).slug)
  const title = `Birding in ${region.state} | ${region.landscape}`
  return {
    title,
    description: region.description,
    alternates: { canonical: canonicalUrl(`/regions/${region.id}`) },
    openGraph: {
      title,
      description: region.description,
      url: canonicalUrl(`/regions/${region.id}`),
      images: [{ url: canonicalUrl(region.image), alt: region.alt }],
    },
  }
}

export default async function RegionPage({ params }: Props) {
  const region = findRegion((await params).slug)
  // Carry the region into the form as a preselection; nothing is booked by following this link.
  const inquiryHref = `/contact?region=${region.id}`

  return (
    <PageShell path={`/regions/${region.id}`} title={`Birding in ${region.state}`} description={region.description} eyebrow="Australian regions" media={<RegionalBirdCarousel regionId={region.id} compact />}>
      {/* Region focus, breadcrumb and planning essentials. Edit the region record for factual copy. */}
      <section className="pb-16 lg:pb-20" aria-labelledby="region-focus">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="py-6 text-sm text-gray-600">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
              <li><Link href="/" className="underline underline-offset-4 hover:text-emerald-800">Australia</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
              <li><Link href="/aves-explorer" className="underline underline-offset-4 hover:text-emerald-800">Regions</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
              <li aria-current="page" className="font-medium text-gray-900">{region.state}</li>
            </ol>
          </nav>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-6 sm:p-8">
              <p className="text-sm font-semibold text-emerald-800 flex items-center gap-2"><MapPin className="h-4 w-4" aria-hidden="true" />Our focus within {region.state}</p>
              <h2 id="region-focus" className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900">{region.landscape}</h2>
              <p className="mt-5 text-gray-700 leading-relaxed">{region.detail}</p>
              <Button asChild size="lg" className="mt-7 h-auto min-h-11 whitespace-normal py-3 bg-emerald-700 hover:bg-emerald-800">
                <Link href={inquiryHref}>Discuss {region.state}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link>
              </Button>
              <p className="mt-3 text-sm text-gray-600">A planning conversation, with arrangements confirmed personally.</p>
          </div>

          <dl className="mt-8 grid md:grid-cols-2 gap-5">
            <div className="rounded-xl border border-gray-200 p-6">
              <dt className="flex items-center gap-2 text-sm font-semibold text-emerald-800"><MapPin className="h-4 w-4" aria-hidden="true" />Where to begin</dt>
              <dd className="mt-3 text-lg font-medium text-gray-900">{region.gateway}</dd>
            </div>
            <div className="rounded-xl border border-gray-200 p-6">
              <dt className="flex items-center gap-2 text-sm font-semibold text-emerald-800"><Clock3 className="h-4 w-4" aria-hidden="true" />Suggested time to explore</dt>
              <dd className="mt-3 text-lg font-medium text-gray-900">{region.planningLength}</dd>
              <dd className="mt-2 text-sm text-gray-600">An AVES planning suggestion, not the duration of a published tour.</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Season, pace and habitats help visitors judge fit before requesting a trip. */}
      <section className="bg-gradient-to-br from-blue-50 to-emerald-50 py-16 lg:py-20" aria-labelledby="timing-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm">
            <CalendarDays className="h-8 w-8 text-emerald-700 mb-5" aria-hidden="true" />
            <h2 id="timing-heading" className="text-2xl font-bold text-gray-900">Choosing your season</h2>
            <p className="mt-4 font-medium text-emerald-900">{region.season.summary}</p>
            <p className="mt-3 text-gray-600 leading-relaxed">{region.season.detail}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm">
            <Footprints className="h-8 w-8 text-emerald-700 mb-5" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-gray-900">Finding your pace</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">{region.pace}</p>
            <h3 className="mt-6 text-sm font-semibold text-gray-900 flex items-center gap-2"><Leaf className="h-4 w-4 text-emerald-700" aria-hidden="true" />Habitats to explore</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {region.habitats.map(habitat => <li key={habitat} className="rounded-full bg-emerald-50 px-3 py-2 text-sm text-emerald-900">{habitat}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* These short regional bird notes complement the media carousel above. */}
      <section className="py-16 lg:py-20" aria-labelledby="birds-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <h2 id="birds-heading" className="text-2xl sm:text-3xl font-bold text-gray-900">Birds worth getting to know</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">A few birds connected with these habitats. They offer a way into the landscape, not a promised sightings list.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {region.birds.map(bird => <article key={bird.name} className="rounded-2xl border border-emerald-100 p-6 sm:p-7">
              <Bird className="h-7 w-7 text-emerald-700 mb-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-gray-900">{bird.name}</h3>
              <p className="mt-3 text-sm font-medium text-emerald-800"><span className="font-semibold">Where to find it:</span> {bird.whereFound}</p><p className="mt-3 text-gray-600 leading-relaxed">{bird.note}</p>
            </article>)}
          </div>
          <p className="mt-6 text-sm text-gray-600">Give birds space, keep away from nests and avoid using call playback to attract them. <a href="https://birdlife.org.au/how-to/ethical-birdwatching-guidelines" className="text-emerald-800 underline underline-offset-4">Read BirdLife Australia’s ethical birdwatching guidance.</a></p>
        </div>
      </section>

      {/* Landscape, possible places and practical caveats; these are ideas, not confirmed bookings. */}
      <section className="bg-gray-50 py-16 lg:py-20" aria-labelledby="places-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-10 lg:gap-14">
          <div className="lg:col-span-3">
            <figure className="mb-8 overflow-hidden rounded-2xl bg-emerald-50 shadow-md">
              <div className="relative aspect-[16/9]">
                <Image src={sitePath(region.image)} alt={region.alt} fill sizes="(max-width: 1023px) 100vw, 60vw" className="object-cover" />
              </div>
              {region.photoCaption && <figcaption className="bg-white px-5 py-4 text-sm leading-relaxed text-gray-600">{region.photoCaption} <Link href="/credits" className="text-emerald-800 underline underline-offset-4">Photography credits</Link>.</figcaption>}
            </figure>
            <h2 id="places-heading" className="text-2xl sm:text-3xl font-bold text-gray-900">Places to shape the conversation</h2>
            <div className="mt-8 space-y-7">
              {region.places.map(place => <article key={place.name} className="border-l-2 border-emerald-300 pl-5">
                <h3 className="text-lg font-semibold text-gray-900">{place.name}</h3>
                <p className="mt-2 text-gray-600 leading-relaxed">{place.detail}</p>
              </article>)}
            </div>
          </div>
          <aside className="lg:col-span-2 rounded-2xl border border-emerald-100 bg-white p-6 sm:p-8 self-start" aria-labelledby="planning-heading">
            <h2 id="planning-heading" className="text-xl font-bold text-gray-900">Before you make plans</h2>
            <ul className="mt-5 list-disc pl-5 space-y-4 text-gray-600 leading-relaxed marker:text-emerald-700">
              {region.planningNotes.map(note => <li key={note}>{note}</li>)}
            </ul>
          </aside>
        </div>
      </section>

      <section className="py-16 lg:py-20" aria-labelledby="region-inquiry-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-emerald-800 p-7 sm:p-10 text-white grid lg:grid-cols-3 gap-7 items-center">
            <div className="lg:col-span-2">
              <h2 id="region-inquiry-heading" className="text-2xl sm:text-3xl font-bold">What would you love to notice here?</h2>
              <p className="mt-4 text-emerald-50 leading-relaxed">Tell us about your interests, timing and preferred pace. We’ll start with {region.state} selected and work from your ideas. Dates, guides, access, pricing and availability will be confirmed before any booking.</p>
            </div>
            <Button asChild size="lg" className="h-auto min-h-11 whitespace-normal py-3 bg-white text-emerald-900 hover:bg-emerald-50 focus:bg-emerald-50">
              <Link href={inquiryHref}>Ask about {region.state}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link>
            </Button>
          </div>

          {/* Keep official sources visible so visitors can check current access and wildlife advice. */}
          <div className="mt-12 max-w-4xl" aria-labelledby="sources-heading">
            <h2 id="sources-heading" className="text-xl font-bold text-gray-900">Official information for your planning</h2>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">These park, tourism and BirdLife resources inform the regional notes above. Use their current advice for access, conditions and wildlife guidance; the places listed here are ideas to discuss, not a confirmed itinerary.</p>
            <ul className="mt-5 grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {region.sources.map(source => <li key={source.url}><a href={source.url} className="inline-flex items-start gap-2 text-sm text-emerald-800 underline underline-offset-4 hover:text-emerald-950"><ExternalLink className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" /><span>{source.title}</span></a></li>)}
            </ul>
            <Link href="/aves-explorer" className="mt-8 inline-flex min-h-11 items-center gap-2 font-medium text-emerald-800 underline underline-offset-4">Compare our Australian regions<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
