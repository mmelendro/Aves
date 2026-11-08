/**
 * A small wrapper selects a country's full collection for the shared viewer.
 * It also works inside the homepage's client-side country selector. A future
 * destination without a collection keeps its attributed photograph.
 */
import Image from "next/image"
import Link from "next/link"
import HomepageBirdCarousel from "@/components/homepage-bird-carousel"
import { destinationBirds } from "@/content/destination-birds"
import type { Destination } from "@/content/destinations"
import type { BirdProfile } from "@/content/birds"

export default function DestinationCardMedia({ destination, fillPanel = false, birds = destinationBirds[destination.id], label }: { destination: Destination; fillPanel?: boolean; birds?: BirdProfile[]; label?: string }) {
  if (birds?.length) return <HomepageBirdCarousel
    birds={birds} variant="destination-card" label={label ?? `${destination.name} bird photographs`}
    autoPlay={false} priority={false} showBirdPicker fillPanel={fillPanel}
  />

  return <>
    <div className="relative aspect-[4/5] overflow-hidden bg-emerald-50" style={fillPanel ? { height: "var(--discovery-media-height, auto)" } : undefined}>
      <Image src={destination.image} alt={destination.imageAlt} fill
        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 400px"
        className="object-cover" style={{ objectPosition: destination.imagePosition, transform: `scale(${destination.imageScale ?? 1})`, transformOrigin: "top left" }} />
    </div>
    <p className="px-4 py-2 text-xs text-gray-500"><span>{destination.bird} · </span><Link href="/credits" className="underline underline-offset-2">Photo: {destination.photographer}</Link></p>
  </>
}
