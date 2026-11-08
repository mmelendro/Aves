/** Shared portal links use the same root routes as every destination. */
import Link from "next/link"
import type { ComponentProps } from "react"
import { accountPath } from "@/lib/account-path"
type Props = Omit<ComponentProps<"a">, "href"> & { href: string }
export function SiteLink({ href, children, ...props }: Props) {
  const target = href.startsWith("https://aves.bio/") ? href.slice("https://aves.bio".length) : accountPath(href)
  return <Link href={target} {...props}>{children}</Link>
}
