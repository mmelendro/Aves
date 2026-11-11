"use client"

import { NewZealandHeader } from "@/components/new-zealand-header"
import { GlobalFooter } from "@/components/global-navigation"
import { Footer } from "./footer"
import { useHeaderLandscape } from "./header-landscape-context"
import type { BrandCountry } from "./brand-mark"

/** Both explorer and editorial pages use the same public chrome and glass contour. */
export function ExplorerHeader() {
  return <NewZealandHeader country="global" />
}

export function ExplorerFooter() {
  const { selection } = useHeaderLandscape()
  const country = selection?.country ?? "australia"
  return country === "australia" ? <Footer /> : <GlobalFooter country={country as BrandCountry | "global"} />
}
