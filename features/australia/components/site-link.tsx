/** Explicit Australian public paths, with root routes for the shared portal. */
import Link from "next/link"
import type { ComponentProps } from "react"
import { sitePath } from "../lib/site-path"
type Props = Omit<ComponentProps<"a">, "href"> & { href: string }
export function SiteLink({ href, children, ...props }: Props) {
  let target = href
  if (href.startsWith("https://aves.bio/")) {
    const url = new URL(href)
    target = url.pathname + url.search + url.hash
  } else if (/^\/(?:australia\/)?(?:account|admin|auth|api)(?:[/?#]|$)/.test(href)) {
    target = href.replace(/^\/australia(?=\/(?:account|admin|auth|api)(?:[/?#]|$))/, "")
  } else if (!/^\/(?:colombia|new-zealand)(?:[/?#]|$)/.test(href)) {
    target = sitePath(href)
  }
  return <Link href={target} {...props}>{children}</Link>
}
