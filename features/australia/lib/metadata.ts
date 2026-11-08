import type { Metadata } from "next"
import { publicMetadata } from "@/lib/public-metadata"

/** Use the same public identity rules while keeping Australian page context. */
export function australiaMetadata(metadata: Metadata): Metadata {
  return publicMetadata(metadata, { brand: "AVES Australia", locale: "en_AU", image: "/images/brand/aves-australia-bird.png" })
}
