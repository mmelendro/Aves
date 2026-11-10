import Image from "next/image"
import type { ComponentProps } from "react"
export type { ImageProps } from "next/image"
/** Public source media is already hosted and credited by AVES. Avoid a second
 * optimizer/provider request or an Australian base-path rewrite. */
export default function PublicImage(props:ComponentProps<typeof Image>){return <Image {...props} unoptimized/>}
