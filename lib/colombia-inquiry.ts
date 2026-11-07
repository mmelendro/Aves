/**
 * Converts the Colombian form's fields into the shared contact API's format.
 * This is a data transformation, not a database write or an email sender.
 * See docs/BEGINNERS-GUIDE.md for the full browser -> server -> database journey.
 */
import { canonicalColombiaRegion } from "./shared-account"

// TypeScript describes the fields callers must supply; server validation is separate.
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

/** Build a Colombia inquiry payload; optional updates defaults to no marketing consent. */
export function makeColombiaInquiry(fields: ColombiaInquiryFields, regions: string[], tourTypes: string[], updates = false, website = "") {
  // Normalize old region names, discard unknown values, and remove duplicates with Set.
  const selectedRegions = [...new Set(regions.map(canonicalColombiaRegion).filter((value): value is string => Boolean(value)))]
  // Keep optional planning details as readable message lines, omitting blank answers.
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
    // A multi-region inquiry must not pretend that only one region was selected.
    region: selectedRegions.length === 1 && !regions.includes("multiple") ? selectedRegions[0] : "",
    travelWhen: fields.travelDate,
    partySize: fields.groupSize,
    message: [...preferences, fields.specialRequests.trim()].filter(Boolean).join("\n\n"),
    updates,
    // Hidden anti-bot field: the receiving server requires this to remain empty.
    website,
  }
}
