export interface BrandSelection { country: string; regionId?: string; placeId?: string }

/** Same public selection for every page logo, with direct-route fallback. */
export function brandContext(path: string, country?: string, selection?: BrandSelection | null): BrandSelection {
  const activeCountry = country || (path === "/" || path === "/new-zealand" || path === "/new-zealand/south-island" ? selection?.country : undefined) || "global"
  const parts = path.split("/").filter(Boolean)
  const regionId = parts[0] === "regions" ? parts[1]
    : parts[0] === activeCountry && parts.length > 1 ? parts[1] : undefined
  return selection?.country === activeCountry ? selection : { country: activeCountry, regionId }
}
