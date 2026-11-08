"use client"
/** Reuse the common AVES viewer with the Australian collection and its credited paths. */
import { useMemo, type ComponentProps } from "react"
import Carousel from "@/components/homepage-bird-carousel"
import { australianBirds, asAustralianBird } from "../content/carousel-birds"
type Props = ComponentProps<typeof Carousel>
export default function AustralianBirdCarousel({ birds, ...props }: Props) {
  const collection = useMemo(() => birds ? birds.map(asAustralianBird) : australianBirds, [birds])
  return <Carousel {...props} birds={collection} />
}
