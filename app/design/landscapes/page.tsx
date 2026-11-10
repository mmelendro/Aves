import { publicMetadata } from "@/lib/public-metadata"
import type { Metadata } from "next"
import catalogue from "@/content/landscape-profiles.json"
import { profileSvg } from "@/lib/landscape-study.mjs"

export const metadata: Metadata = publicMetadata({ title: "AVES landscape studies · review", robots: { index: false, follow: false } })

export default function LandscapeStudies() {
  return <main className="mx-auto max-w-6xl px-5 py-10 text-emerald-950">
    <h1 className="text-3xl font-medium">Landscapes shaped by place</h1>
    <p className="mt-4 max-w-3xl leading-7">Thirty vector studies for the existing country, planning-region and South Island place contexts. These are reference studies, not surveyed views. Released routes use reviewed adaptations; this gallery is not the live header inventory. Inland scenes use rivers, sheltered water or land. Exact bird silhouettes and local species still need visual review.</p>
    <nav aria-label="Study groups" className="my-6 flex flex-wrap gap-5">{["country", "region", "place"].map(level => <a key={level} href={`#${level}`} className="inline-flex min-h-11 items-center underline underline-offset-4">{level === "place" ? "Place / subregion contexts" : `${level} studies`}</a>)}</nav>
    {["country", "region", "place"].map(level => <section key={level} id={level} className="mb-10 scroll-mt-4">
      <h2 className="mb-4 text-xl font-medium capitalize">{level === "place" ? "Place / subregion contexts" : level}</h2>
      <div className="grid gap-6 lg:grid-cols-2">{catalogue.profiles.filter(p => p.level === level).map(profile => <article key={profile.id} id={profile.id.replaceAll("/", "-")} className="overflow-hidden rounded-xl border border-emerald-200 bg-white">
        <div dangerouslySetInnerHTML={{ __html: profileSvg(profile) }} />
        <div className="p-5"><h3 className="font-semibold">{profile.name}</h3><p className="mt-1 text-sm text-emerald-700">{profile.country} · {profile.water === "none" ? "Land only" : profile.water} · {profile.flock} flight study</p><p className="mt-3 text-sm leading-6 text-gray-700">{profile.note}</p><p className="mt-3 text-xs leading-5 text-gray-500">Abstract silhouettes indicate a flight family, not a verified species identification. Marine wildlife is confined to the approved NZ alpine/coastal composite.</p>{profile.source.startsWith("https:") && <a href={profile.source} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-11 items-center text-sm underline underline-offset-4">Place reference</a>}</div>
      </article>)}</div>
    </section>)}
  </main>
}
