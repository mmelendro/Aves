"use client"

import { cloneElement, isValidElement, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import translations from "@/content/colombia-home-es.json"

/** Colombia-home copy only: preserve IDs, URLs, form values and all event handlers.
 * Other routes return their original React tree. This small dictionary keeps the
 * urgent homepage translation separate from the later full Spanish site rollout.
 */
export function colombiaHomeText(text: string): string {
  const normalized = text.replace(/\s+/g, " ").trim()
  let translated = (translations as Record<string, string>)[normalized]
  if (!translated) {
    translated = normalized.replace(/^(\d+) person$/, "$1 persona").replace(/^(\d+) people$/, "$1 personas").replace(/^(\d+) days$/, "$1 días")
      .replace(/^Explore /, "Explorar ").replace(/^Image (\d+) of (\d+)$/, "Imagen $1 de $2")
    if (translated === normalized) {
      // Long messages also occur beside links or inside spoken slide announcements.
      for (const [original, replacement] of Object.entries(translations)) {
        if (original.length > 25) translated = translated.replace(original, replacement)
      }
      if (translated === normalized) return text
    }
  }
  return text.replace(normalized, translated)
}

const copyProps = ["aria-label", "aria-description", "title", "alt", "placeholder", "label", "mapLabel", "mediaLabel"]

/** Translate rendered text and accessible copy, never HTML or stored customer data. */
export function translateColombiaHomeTree(node: ReactNode): ReactNode {
    if (typeof node === "string") return colombiaHomeText(node)
    // Preserve single-child shape: Radix asChild requires an element, not an array.
    if (Array.isArray(node)) return node.map(translateColombiaHomeTree)
    if (!isValidElement<Record<string, unknown>>(node)) return node
    const child = node
    const props: Record<string, unknown> = {}
    for (const key of copyProps) if (typeof child.props[key] === "string") props[key] = colombiaHomeText(child.props[key])
    if (child.props.children !== undefined) props.children = translateColombiaHomeTree(child.props.children as ReactNode)
    return cloneElement(child, props)
}

export function useColombiaHomeCopy() {
  const path = usePathname()
  return path === "/colombia" ? translateColombiaHomeTree : (node: ReactNode) => node
}
