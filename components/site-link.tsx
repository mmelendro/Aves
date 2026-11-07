import Link from "next/link"
import type { ComponentProps } from "react"

type SiteLinkProps = Omit<ComponentProps<"a">, "href"> & { href: string }

// Next Link adds /australia. Shared accounts belong to the root application
// boundary instead, so those links must load the page at its public address.
export function SiteLink({ href, children, ...props }: SiteLinkProps) {
  if (/^\/(?:australia\/)?account(?:[/?#]|$)/.test(href)) {
    return <a href={href.replace(/^\/australia(?=\/account)/, "")} {...props}>{children}</a>
  }
  return <Link href={href} {...props}>{children}</Link>
}
