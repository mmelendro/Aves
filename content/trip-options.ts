import { regionOptions } from "./region-options"

export type DestinationRegion = { id: string; label: string; acceptLabel?: boolean }
export type DestinationDefinition = { label: string; enabled: boolean; consentVersion: string | null; regions: readonly DestinationRegion[] }

// Launch configuration is deliberate: a registered country is not automatically
// offered to visitors. Keep these IDs and regions in sync with the DB catalogue.
export const destinationRegistry = {
  australia: {
    label: "Australia", enabled: true, consentVersion: "au-launch-updates-2026-11-05",
    regions: regionOptions.map(region => ({ ...region, acceptLabel: true })),
  },
  colombia: {
    label: "Colombia", enabled: true, consentVersion: "co-travel-updates-2026-11-06",
    regions: [
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
  },
  ecuador: { label: "Ecuador", enabled: false, consentVersion: null, regions: [] },
  "costa-rica": { label: "Costa Rica", enabled: false, consentVersion: null, regions: [] },
} satisfies Record<string, DestinationDefinition>

export type TripCountry = keyof typeof destinationRegistry
export const DEFAULT_TRIP_COUNTRY: TripCountry = "australia"

export function createCountryOptions<R extends Record<string, DestinationDefinition>>(registry: R, defaultCountry: Extract<keyof R, string>) {
  type Country = Extract<keyof R, string>
  const countryIds = Object.keys(registry) as Country[]
  const countryLabels = Object.fromEntries(countryIds.map(id => [id, registry[id].label])) as Record<Country, string>
  const countryRegionOptions = Object.fromEntries(countryIds.map(id => [id, registry[id].regions])) as Record<Country, readonly DestinationRegion[]>
  const countryRegionLabels = Object.fromEntries(countryIds.map(id => [id, Object.fromEntries(registry[id].regions.map(region => [region.id, region.label]))])) as Record<Country, Record<string, string>>
  function isKnownTripCountry(value: unknown): value is Country {
    return typeof value === "string" && Object.hasOwn(registry, value)
  }
  function isConfiguredTripCountry(value: unknown): value is Country {
    return isKnownTripCountry(value) && Boolean(registry[value].consentVersion)
  }
  function isEnabledTripCountry(value: unknown): value is Country {
    return isConfiguredTripCountry(value) && registry[value].enabled
  }
  function normalizeTripCountry(value?: Country): Country {
    if (value === undefined) return defaultCountry
    if (!isKnownTripCountry(value)) throw new Error("Unknown destination country")
    return value
  }
  function countryConsentVersion(country: Country): string {
    const version = registry[country]?.consentVersion
    if (!version) throw new Error("Destination consent wording is not configured")
    return version
  }
  function isCountryRegion(country: Country, region: string) {
    return isKnownTripCountry(country) && countryRegionOptions[country].some(option => option.id === region || (option.acceptLabel && option.label === region))
  }
  function isOtherCountryRegion(country: Country, region: string) {
    return countryIds.some(id => id !== country && countryRegionOptions[id].some(option => option.id === region || option.label === region))
  }
  function isContactRegion(country: Country, region: string) {
    return region === "" || isCountryRegion(country, region) || (country === defaultCountry && !isOtherCountryRegion(country, region))
  }
  const enabledCountries = countryIds.filter(isEnabledTripCountry).map(id => ({ id, label: countryLabels[id] }))
  return { countryLabels, countryRegionOptions, countryRegionLabels, enabledCountries, isKnownTripCountry, isConfiguredTripCountry, isEnabledTripCountry, normalizeTripCountry, countryConsentVersion, isCountryRegion, isOtherCountryRegion, isContactRegion }
}

export const { countryLabels, countryRegionOptions, countryRegionLabels, enabledCountries, isKnownTripCountry, isConfiguredTripCountry, isEnabledTripCountry, normalizeTripCountry, countryConsentVersion, isCountryRegion, isOtherCountryRegion, isContactRegion } = createCountryOptions(destinationRegistry, DEFAULT_TRIP_COUNTRY)

// Retained for historical callers. New validation handles all registered countries.
export function isColombiaRegion(region: string) {
  return countryRegionOptions.colombia.some(option => option.id === region || option.label === region)
}
