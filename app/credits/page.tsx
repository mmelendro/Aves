import type { Metadata } from "next"
import Image from "next/image"
import { PageShell } from "@/components/page-shell"
import { Card, CardContent } from "@/components/ui/card"
import credits from "@/content/image-credits.json"
export const metadata: Metadata = { title: "Photography Credits" }
export default function CreditsPage() {
  return <PageShell path="/credits" title="The People Behind the Photographs" description="Thank you to the photographers who make these glimpses of Australia possible. Photographs illustrate places and wildlife; they are not photographs of AVES-operated Australian tours."><section className="py-16 bg-gray-50"><div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">{credits.images.map(photo => <Card key={photo.file} className="border-0 shadow-lg overflow-hidden"><div className="relative h-64"><Image src={photo.path} alt={photo.alt} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" /></div><CardContent className="p-6"><h2 className="font-bold text-xl mb-3">{photo.title}</h2><p className="text-gray-600 mb-3">{photo.attribution}</p><div className="flex flex-wrap gap-4 text-sm text-emerald-700 underline"><a href={photo.creatorUrl} target="_blank" rel="noreferrer">{photo.creator}</a><a href={photo.sourceUrl} target="_blank" rel="noreferrer">Original photograph</a><a href={photo.licenseUrl} target="_blank" rel="noreferrer">{photo.license}</a></div><p className="text-sm text-gray-500 mt-4">{photo.modifications}</p></CardContent></Card>)}</div></section></PageShell>
}
