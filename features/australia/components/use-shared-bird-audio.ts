"use client"

import { useEffect, useRef, useState } from "react"
import type { BirdProfile } from "@/features/australia/content/birds"
import { birdMediaResource } from "@/lib/media-resource"
import { useAvesMedia } from "@/components/aves-media-provider"

/** The shared dock owns playback; this hook only follows deliberate bird choices. */
export function useSharedBirdAudio(bird: BirdProfile | undefined) {
  const media = useAvesMedia()
  const [following, setFollowing] = useState(false)
  const resource = bird ? birdMediaResource(bird) : null
  const current = useRef(resource)
  current.current = resource
  const id = resource?.id
  const play = media?.play, stop = media?.stop
  useEffect(() => () => { if (id) stop?.(id) }, [id, stop])
  useEffect(() => {
    if (following && resource) play?.(resource)
  }, [id, following, play])
  useEffect(() => {
    const hidden = () => { if (document.hidden) { setFollowing(false); if (current.current) stop?.(current.current.id) } }
    const request = (event: Event) => { if ((event as CustomEvent<string>).detail !== current.current?.id) setFollowing(false) }
    document.addEventListener("visibilitychange", hidden)
    document.addEventListener("aves:media-request", request)
    return () => { document.removeEventListener("visibilitychange", hidden); document.removeEventListener("aves:media-request", request) }
  }, [stop])
  const playing = Boolean(media && id === media.resourceId && media.playing)
  return {
    available: Boolean(media), following, playing,
    toggle() { if (!media || !resource) return; if (following) { setFollowing(false); media.pause(); return } if (playing) media.pause(); else media.play(resource) },
    toggleFollow() { if (following) media?.pause(); setFollowing(value => !value) },
  }
}
