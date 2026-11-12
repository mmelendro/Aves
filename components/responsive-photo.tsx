"use client"

import Image, { type ImageProps } from "next/image"
import { useContext, type Ref } from "react"
import { ExpandedMediaContext } from "./expandable-media"
import manifest from "@/content/photo-renditions.json"

type Rendition = { width: number; height: number; variants: { src: string; width: number }[] }
const images: Record<string, Rendition> = manifest.images

/** React 19 passes the native image ref through props. Use a small web rendition
 * in cards and thumbnails; expanded photos retain their full original source.
 * The same img stays mounted, preserving focal points, load events and zoom. */
export default function ResponsivePhoto(props: ImageProps & { ref?: Ref<HTMLImageElement> }) {
  const expanded = useContext(ExpandedMediaContext)
  const rendition = typeof props.src === "string" && Object.hasOwn(images, props.src) ? images[props.src] : undefined
  if (!rendition) return <Image {...props} alt={props.alt} />
  return <picture style={{ display: "contents" }}>
    {!expanded && <source type="image/webp" srcSet={rendition.variants.map(image => `${image.src} ${image.width}w`).join(", ")} sizes={props.sizes || "100vw"} />}
    <Image {...props} alt={props.alt} priority={false} loading={props.priority ? "eager" : props.loading} fetchPriority={props.priority ? "high" : props.fetchPriority} />
  </picture>
}
