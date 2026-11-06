import { canonicalColombiaRegion } from "./shared-account"

export type ColombiaInquiryFields = {
  firstName: string
  lastName: string
  email: string
  phone: string
  travelDate: string
  groupSize: string
  duration: string
  experienceLevel: string
  specialRequests: string
}

export function makeColombiaInquiry(fields: ColombiaInquiryFields, regions: string[], tourTypes: string[], updates = false, website = "") {
  const selectedRegions = [...new Set(regions.map(canonicalColombiaRegion).filter((value): value is string => Boolean(value)))]
  const preferences = [
    fields.phone ? `Phone: ${fields.phone}` : "",
    fields.duration ? `Preferred duration: ${fields.duration}` : "",
    fields.experienceLevel ? `Birding experience: ${fields.experienceLevel}` : "",
    tourTypes.length ? `Tour interests: ${tourTypes.join(", ")}` : "",
    regions.length ? `Region interests: ${regions.includes("multiple") ? `Multiple Colombian regions${selectedRegions.length ? `, including ${selectedRegions.join(", ")}` : ""}` : selectedRegions.join(", ")}` : "",
  ].filter(Boolean)
  return {
    country: "colombia" as const,
    intent: "inquiry" as const,
    name: `${fields.firstName.trim()} ${fields.lastName.trim()}`.trim(),
    email: fields.email.trim(),
    region: selectedRegions.length === 1 && !regions.includes("multiple") ? selectedRegions[0] : "",
    travelWhen: fields.travelDate,
    partySize: fields.groupSize,
    message: [...preferences, fields.specialRequests.trim()].filter(Boolean).join("\n\n"),
    updates,
    website,
  }
}
