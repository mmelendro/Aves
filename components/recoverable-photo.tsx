"use client"

import Image, { type ImageProps } from "next/image"
import { useState } from "react"

/** Keep the credited photograph's identity when loading fails. A retry remounts
 * that same source; it never substitutes a different place, bird or creator. */
export default function RecoverablePhoto(props: ImageProps) {
  const [failedSource, setFailedSource] = useState<ImageProps["src"] | null>(null)
  const [attempt, setAttempt] = useState(0)
  const failed = failedSource === props.src
  return <>
    {!failed && <Image key={`${String(props.src)}:${attempt}`} {...props} onError={event => {
      setFailedSource(props.src)
      props.onError?.(event)
    }} />}
    {failed && <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-emerald-50 p-6 text-center text-emerald-950">
      <p role="status" className="text-sm">This photograph could not load.</p>
      <p className="max-w-prose text-xs">{props.alt}</p>
      <button type="button" className="min-h-11 rounded-lg border border-emerald-700 bg-white px-4 text-sm font-medium" onClick={event => {
        event.stopPropagation()
        setFailedSource(null)
        setAttempt(value => value + 1)
      }}>Try Photograph Again</button>
    </div>}
  </>
}
