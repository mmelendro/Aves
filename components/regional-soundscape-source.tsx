import { AudioLines, ExternalLink } from "lucide-react"
import catalogue from "@/content/regional-soundscape-sources.json"
/** Source-only access until playable audio and delivery can be verified. */
export default function RegionalSoundscapeSource({country,region=""}:{country:string;region?:string}) {
 const recording=catalogue.recordings.find(r=>r.country===country&&(!region||r.region===region))
 if(!recording)return null
 return <a href={recording.source} target="_blank" rel="noreferrer" aria-label={`Open soundscape source: ${recording.location}`} title={`${recording.location} · ${recording.creator} · ${recording.licence} · Opens Freesound`} className="inline-flex min-h-11 items-center justify-center gap-1 rounded-full border border-emerald-200 bg-white px-3 text-emerald-950"><AudioLines size={18} aria-hidden="true"/><ExternalLink size={12} aria-hidden="true"/></a>
}
