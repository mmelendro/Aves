/**
 * Public attribution directory built from the media-credit JSON files.
 * Recording IDs become audio-<id> anchors used by carousel credit links.
 * Keep source, creator, licence and modification details with every added asset.
 */
import { southIslandSoundscapes, soundscapeCreator, soundscapeLicence } from "@/content/south-island-soundscapes"
import type { Metadata } from "next"
import Image from "next/image"
import { PageShell } from "@/components/page-shell"
import { Card, CardContent } from "@/components/ui/card"
import credits from "@/content/image-credits.json"
import audioCredits from "@/content/audio-credits.json"
import extraColombiaAudioCredits from "@/content/colombia-extra-audio-credits.json"
import newZealandExpansionCredits from "@/content/new-zealand-expansion-credits.json"
import newZealandSupplementCredits from "@/content/new-zealand-supplement-credits.json"
import checklistImages from "@/content/new-zealand-checklist-thumbnails.json"
import { canonicalUrl, sitePath } from "@/lib/site-path"
export const metadata: Metadata = { title: "Photography & Recording Credits", alternates: { canonical: canonicalUrl("/credits") } }
export default function CreditsPage() {
  return (
    <PageShell path="/credits" title="The People Behind the Photographs & Sounds" description="Thank you to the photographers and field recordists who bring AVES destinations to life. Main homepage, Colombian and New Zealand recording credits are below. The New Zealand page also lists its photographs; Australia maintains its own media credits.">
      <section className="bg-white py-12" aria-labelledby="checklist-image-credits">
        <div className="mx-auto max-w-6xl px-4"><h2 id="checklist-image-credits" className="text-2xl font-medium text-emerald-950">New Zealand checklist reference images</h2>
          <p className="mt-3 text-sm text-gray-600">Small reference images help you recognise birds while planning. Original source labels, licences and creators are retained. Illustrations are labelled in the checklist. A reference image does not establish local presence or trip availability.</p>
          <details className="mt-5 rounded-xl border border-emerald-100 p-4"><summary className="min-h-11 cursor-pointer font-medium text-emerald-950">Sources and licences for {checklistImages.images.length} checklist images</summary><ul className="mt-4 space-y-4 text-sm">{checklistImages.images.map(image => <li key={image.id} id={`checklist-${image.id}`} className="break-words border-t border-emerald-100 pt-3"><p className="font-medium">{image.commonName} · <i>{image.scientificName}</i></p><p className="mt-1">{image.creator} · <a href={image.licenseUrl} className="underline">{image.license}</a> · <a href={image.sourceUrl} className="underline">Original image and source</a></p><p className="mt-1 text-gray-600">{image.modifications}</p></li>)}</ul></details>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          {credits.images.map(photo => (
            <Card key={photo.file} className="border-0 shadow-lg overflow-hidden">
              <div className="relative h-64">
                <Image src={sitePath(photo.path)} alt={photo.alt} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h2 className="font-bold text-xl mb-3">{photo.title}</h2>
                <p className="text-gray-600 mb-3">{photo.attribution}</p>
                <div className="flex flex-wrap gap-4 text-sm text-emerald-700 underline">
                  <a href={photo.creatorUrl} target="_blank" rel="noreferrer">{photo.creator}</a>
                  <a href={photo.sourceUrl} target="_blank" rel="noreferrer">Original photograph</a>
                  <a href={photo.licenseUrl} target="_blank" rel="noreferrer">{photo.license}</a>
                </div>
                <p className="text-sm text-gray-500 mt-4">{photo.modifications}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="py-12 bg-emerald-50" aria-labelledby="soundscape-credits">
        <div className="max-w-6xl mx-auto px-4"><h2 id="soundscape-credits" className="text-2xl font-medium text-emerald-950">South Island soundscapes</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-600">Representative Canterbury field recordings, not live audio or a soundtrack guaranteed at any selected place. AVES uses repeated 60-second excerpts from the creator’s public HQ previews, with level adjustment and short edge fades. No recordings are loaded by this credits page. No mountain recording is included.</p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">{southIslandSoundscapes.map(recording => <article key={recording.id} id={`soundscape-${recording.id}`} className="rounded-2xl border border-emerald-200 bg-white p-5 scroll-mt-24">
            <h3 className="font-medium text-emerald-950">{recording.title}</h3><p className="mt-2 text-sm text-gray-600">{recording.location} · {soundscapeCreator}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-emerald-800 underline underline-offset-4"><a href={recording.source} target="_blank" rel="noreferrer">Original recording</a><a href={soundscapeLicence} target="_blank" rel="noreferrer">CC0 1.0</a><a href={recording.src} download>Edited excerpt</a></div>
          </article>)}</div>
        </div>
      </section>
      <section className="py-16 bg-white" aria-labelledby="recording-credits">
        <div className="max-w-6xl mx-auto px-4">
          <h2 id="recording-credits" className="text-3xl font-bold mb-8">Bird Recordings</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[...audioCredits.recordings, ...extraColombiaAudioCredits.recordings, ...newZealandExpansionCredits.recordings, ...newZealandSupplementCredits.recordings].map(recording => (
              <Card key={recording.id} id={`audio-${recording.id}`} className="border-0 shadow-lg scroll-mt-24">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-3">{recording.title}</h3>
                  <p className="text-gray-600 mb-3">{recording.attribution}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-emerald-700 underline">
                    <a href={recording.sourceUrl} target="_blank" rel="noreferrer">Original recording</a>
                    <a href={recording.licenseUrl} target="_blank" rel="noreferrer">{recording.license}</a>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">{recording.modifications}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
