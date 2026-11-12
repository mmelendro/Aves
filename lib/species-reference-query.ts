/** A shared public query contract keeps the form, metadata and search in sync. */
import type { SpeciesCountry } from "./species-reference-types";
export const speciesOrigins = [
  "all",
  "native",
  "endemic",
  "introduced",
  "unknown",
];
export const speciesOccurrences = [
  "all",
  "resident",
  "migrant",
  "vagrant",
  "introduced",
  "uncertain",
  "unknown",
  "historical",
];
export const speciesQueryKeys = [
  "country",
  "q",
  "origin",
  "occurrence",
  "region",
  "reference",
  "offset",
];
export function isSpeciesCountry(
  value: string | null,
): value is SpeciesCountry {
  return (
    value === "colombia" || value === "australia" || value === "new-zealand"
  );
}
export function normalizeSpeciesQuery(
  input: URLSearchParams,
): URLSearchParams | null {
  if (speciesQueryKeys.some((key) => input.getAll(key).length > 1)) return null;
  const country = input.get("country") || "colombia";
  if (!isSpeciesCountry(country)) return null;
  const origin = input.get("origin") || "all",
    occurrence = input.get("occurrence") || "all";
  if (
    !speciesOrigins.includes(origin) ||
    !speciesOccurrences.includes(occurrence)
  )
    return null;
  const reference = input.get("reference") || "0";
  if (reference !== "0" && reference !== "1") return null;
  const output = new URLSearchParams({ country });
  const query = (input.get("q") ?? "").trim().slice(0, 120);
  if (query) output.set("q", query);
  if (origin !== "all") output.set("origin", origin);
  if (occurrence !== "all") output.set("occurrence", occurrence);
  const region = input.get("region") ?? "";
  if (region) output.set("region", region);
  if (reference === "1") output.set("reference", "1");
  const rawOffset = input.get("offset") ?? "0";
  const offset = /^\d+$/.test(rawOffset) ? Number(rawOffset) : 0;
  if (Number.isSafeInteger(offset) && offset > 0)
    output.set("offset", String(offset));
  return output;
}
export function readSpeciesQuery(
  input: Record<string, string | string[] | undefined>,
): URLSearchParams | null {
  const values = new URLSearchParams();
  for (const key of speciesQueryKeys) {
    const value = input[key];
    if (Array.isArray(value)) return null;
    if (typeof value === "string") values.set(key, value);
  }
  return normalizeSpeciesQuery(values);
}
