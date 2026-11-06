import { regionOptions } from "./region-options"

export type TripCountry = "australia" | "colombia"
export const countryLabels: Record<TripCountry, string> = { australia: "Australia", colombia: "Colombia" }
export const countryRegionOptions: Record<TripCountry, readonly { id: string; label: string }[]> = {
  australia: regionOptions,
  colombia: [
    { id: "pacific", label: "Pacific" },
    { id: "western-andes", label: "Western Andes" },
    { id: "central-andes", label: "Central Andes" },
    { id: "eastern-andes", label: "Eastern Andes" },
    { id: "cauca-valley", label: "Cauca Valley" },
    { id: "magdalena-valley", label: "Magdalena Valley" },
    { id: "caribbean", label: "Caribbean" },
    { id: "sierra-nevada-de-santa-marta", label: "Sierra Nevada de Santa Marta" },
    { id: "llanos", label: "Llanos" },
    { id: "amazonia", label: "Amazonia" },
    { id: "colombian-massif", label: "Colombian Massif" },
  ],
}
export const countryRegionLabels: Record<TripCountry, Record<string, string>> = {
  australia: Object.fromEntries(countryRegionOptions.australia.map(region => [region.id, region.label])),
  colombia: Object.fromEntries(countryRegionOptions.colombia.map(region => [region.id, region.label])),
}
export function isCountryRegion(country: TripCountry, region: string) {
  return countryRegionOptions[country].some(option => option.id === region || (country === "australia" && option.label === region))
}
export function isColombiaRegion(region: string) {
  return countryRegionOptions.colombia.some(option => option.id === region || option.label === region)
}
