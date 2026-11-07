/*
 * Link adapter for this app, which normally lives under /australia. Next Link handles
 * Australian routes; shared /account links must leave that base path and use a normal anchor.
 * This changes navigation only: account authentication still happens in the account/server code.
 */
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
