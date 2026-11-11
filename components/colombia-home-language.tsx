"use client"

import { Children, cloneElement, createContext, isValidElement, useContext, useState, type ReactNode } from "react"
import translations from "@/content/colombia-home-es.json"

const LanguageContext = createContext({ spanish: false, setSpanish: (_value: boolean) => {} })

/** English on every fresh visit; Spanish is an explicit, page-local choice. */
export function ColombiaHomeLanguage({ children }: { children: ReactNode }) {
  const [spanish, setSpanish] = useState(false)
  return (
    <LanguageContext.Provider value={{ spanish, setSpanish }}>
      <div lang={spanish ? "es-CO" : "en"}>
        {spanish ? translateColombiaHomeTree(children) : children}
      </div>
    </LanguageContext.Provider>
  )
}

export function ColombiaHomeLanguageToggle() {
  const { spanish, setSpanish } = useContext(LanguageContext)
  const label = spanish ? "Switch to English" : "Cambiar a español colombiano"
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={spanish}
      onClick={() => setSpanish(!spanish)}
      className="inline-flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-0.5 rounded-full border border-emerald-200 bg-white hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
    >
      {/* Inline flags render consistently on Windows, where emoji can show letters. */}
      <svg aria-hidden="true" width="24" height="16" viewBox="0 0 60 40" className="overflow-hidden rounded-sm">
        {spanish ? (
          <>
            <path fill="#FCD116" d="M0 0h60v20H0z" />
            <path fill="#003893" d="M0 20h60v10H0z" />
            <path fill="#CE1126" d="M0 30h60v10H0z" />
          </>
        ) : (
          <>
            <path fill="#012169" d="M0 0h60v40H0z" />
            <path stroke="#fff" strokeWidth="8" d="m0 0 60 40M60 0 0 40" />
            <path stroke="#C8102E" strokeWidth="3" d="m0 0 60 40M60 0 0 40" />
            <path stroke="#fff" strokeWidth="12" d="M30 0v40M0 20h60" />
            <path stroke="#C8102E" strokeWidth="7" d="M30 0v40M0 20h60" />
          </>
        )}
      </svg>
      <span aria-hidden="true" className="text-[9px] font-medium leading-none">{spanish ? "ES" : "EN"}</span>
    </button>
  )
}

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
    if (Array.isArray(node)) return Children.map(node, translateColombiaHomeTree)
    if (!isValidElement<Record<string, unknown>>(node)) return node
    const child = node
    const props: Record<string, unknown> = {}
    for (const key of copyProps) if (typeof child.props[key] === "string") props[key] = colombiaHomeText(child.props[key])
    if (child.props.children !== undefined) props.children = translateColombiaHomeTree(child.props.children as ReactNode)
    return cloneElement(child, props)
}

export function useColombiaHomeCopy() {
  const { spanish } = useContext(LanguageContext)
  return spanish ? translateColombiaHomeTree : (node: ReactNode) => node
}
