"use client"

import { useRef, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import OptimizedImage from "./optimized-image"
import styles from "./team-carousel.module.css"

type Member = { id: string; name: string; role: string; image: string; alt: string; fallback?: string }

/** Native scroll and snap, no autoplay or extra dependency. Existing biographies
 * remain the source; this supplies a visual route into the full profiles.
 */
export function TeamCarousel({ members, onSelect }: { members: Member[]; onSelect: (id: string) => void }) {
  const track = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(1)
  function step(direction: number) {
    const element = track.current
    if (!element) return
    const card = element.firstElementChild as HTMLElement | null
    element.scrollBy({ left: direction * ((card?.offsetWidth || element.clientWidth) + 20), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })
  }
  return <section aria-label="Meet the AVES team" aria-roledescription="carousel" className="mx-auto max-w-6xl">
    <div className="mb-4 flex items-center justify-between gap-4"><p className="text-left text-sm text-gray-600">Swipe through the team, then open a profile.</p><div className="flex shrink-0 gap-2"><button type="button" aria-label="Previous team members" onClick={()=>step(-1)} className={styles.control}><ArrowLeft size={19} aria-hidden="true"/></button><button type="button" aria-label="Next team members" onClick={()=>step(1)} className={styles.control}><ArrowRight size={19} aria-hidden="true"/></button></div></div>
    <div ref={track} className={styles.track} onScroll={()=>{const e=track.current;if(e){const first=e.firstElementChild as HTMLElement;setPosition(Math.min(members.length,Math.round(e.scrollLeft/(first.offsetWidth+20))+1))}}}>
      {members.map((member,i)=><article key={member.id} className={styles.card} aria-roledescription="slide" aria-label={`${i+1} of ${members.length}: ${member.name}`}>
        <div className="aspect-[4/3] overflow-hidden bg-emerald-50"><OptimizedImage src={member.image} fallback={member.fallback} alt={member.alt} width={480} height={360} className="h-full w-full object-cover object-top"/></div>
        <div className="flex flex-1 flex-col p-5 text-left"><h3 className="text-lg font-semibold text-emerald-950">{member.name}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{member.role}</p><button type="button" onClick={()=>onSelect(member.id)} className="mt-auto inline-flex min-h-11 items-center gap-2 self-start rounded pt-3 text-sm font-semibold text-emerald-800 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">View profile<ArrowRight size={16} aria-hidden="true"/></button></div>
      </article>)}
    </div>
    <p className="mt-3 text-left text-xs text-gray-500" aria-live="polite">Showing from {position} of {members.length}</p>
  </section>
}
