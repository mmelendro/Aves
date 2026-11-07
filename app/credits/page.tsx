import type { Metadata } from "next"
import Image from "next/image"
import { PageShell } from "@/components/page-shell"
import { Card, CardContent } from "@/components/ui/card"
import credits from "@/content/image-credits.json"
import audioCredits from "@/content/audio-credits.json"
import extraColombiaAudioCredits from "@/content/colombia-extra-audio-credits.json"
import newZealandExpansionCredits from "@/content/new-zealand-expansion-credits.json"
import newZealandSupplementCredits from "@/content/new-zealand-supplement-credits.json"
import { canonicalUrl, sitePath } from "@/lib/site-path"
export const metadata: Metadata = { title: "Photography & Recording Credits", alternates: { canonical: canonicalUrl("/credits") } }
export default function CreditsPage() {
  return (
    <PageShell path="/credits" title="The People Behind the Photographs & Sounds" description="Thank you to the photographers and field recordists who bring AVES destinations to life. Main homepage, Colombian and New Zealand recording credits are below. The New Zealand page also lists its photographs; Australia maintains its own media credits.">
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
