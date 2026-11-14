import "server-only";
import ebirdLinks from "@/content/ebird-reference-links.json";

import colombia from "@/content/species/colombia.json";
import australia from "@/content/species/australia.json";
import newZealand from "@/content/species/new-zealand.json";
import { destinationBirds } from "@/content/destination-birds";
import {
  destinationRegions,
  getBirdRegionIds,
} from "@/content/destination-regions";
import { nzChecklistMedia } from "@/content/new-zealand-checklist-media";
import northIsland from "@/content/north-island-trip-catalogue.json";
import southIsland from "@/content/south-island-trip-catalogue.json";
import regionalEvidence from "@/content/species-regional-evidence.json";
import type {
  ReferenceResult,
  SpeciesCountry,
  SpeciesPlace,
  SpeciesReference,
  SpeciesReferenceResponse,
} from "./species-reference-types";

import { normalizeSpeciesQuery } from "./species-reference-query";
export { isSpeciesCountry } from "./species-reference-query";

const catalogues: Record<SpeciesCountry, SpeciesReference> = {
  colombia: colombia as SpeciesReference,
  australia: australia as SpeciesReference,
  "new-zealand": newZealand as SpeciesReference,
};
const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
const speciesName = (value: string) =>
  value.trim().split(/\s+/).slice(0, 2).join(" ");
const placeIndex = new Map<string, SpeciesPlace[]>();

// Only existing, explicitly reviewed species/place edges. A nearby cafe or hotel
// is not occurrence evidence. No private coordinates or user records are read.
for (const catalogue of [northIsland, southIsland]) {
  for (const place of catalogue.places) {
    if (!place.url.startsWith("https://")) continue;
    for (const id of place.birdIds) {
      const entry: SpeciesPlace = {
        id: place.id,
        name: place.name,
        url: place.url,
        regionId: catalogue.region,
        encounter: place.encounter,
        activities: place.categories,
        access:
          place.access ??
          "Check current access with the official place source.",
        reviewed: place.checkedAt,
      };
      placeIndex.set(id, [...(placeIndex.get(id) ?? []), entry]);
    }
  }
}

// Build immutable public indexes once per server process, never per-user state.
const indexed = Object.fromEntries(
  Object.entries(catalogues).map(([country, catalogue]) => {
    const countryId = country as SpeciesCountry;
    const featured = new Map(
      (destinationBirds[countryId] ?? []).map((bird) => [
        speciesName(bird.scientificName),
        bird,
      ]),
    );
    const records = catalogue.species.map((bird) => {
      // Exact current species match only. Previous-name crosswalks may represent
      // splits/lumps and deliberately do not create an identity or range join.
      const profile = featured.get(bird.scientificName);
      const places =
        countryId === "new-zealand" ? (placeIndex.get(bird.id) ?? []) : [];
      const curatedRegions = profile
        ? getBirdRegionIds(countryId, profile.id)
        : [];
      const evidence=regionalEvidence.edges.filter(edge=>edge.countryId===countryId&&edge.speciesId===bird.id&&edge.scientificName===bird.scientificName)
      const regionIds = new Set([
        ...curatedRegions,
        ...places.map((place) => place.regionId),
        ...evidence.map(edge=>edge.regionId),
      ]);
      const regions = (destinationRegions[countryId] ?? [])
        .filter((region) => regionIds.has(region.id))
        .map((region) => ({
          id: region.id,
          name: region.name,
          href: region.href,
        }));
      const guide = profile
        ? {
            href:
              countryId === "australia"
                ? `/australia/species#${profile.id}`
                : countryId === "colombia"
                  ? `/species#${profile.id}`
                  : "/new-zealand#birdlife",
            image: profile.image,
            name: profile.commonName,
          }
        : undefined;
      const code=(ebirdLinks as Record<string,string>)[bird.scientificName];
      const ebirdUrl=code?`https://ebird.org/species/${code}`:undefined;
      return { ...bird, regions, places, guide,ebirdUrl,regionEvidence:evidence.map(edge=>({regionId:edge.regionId,sourceId:edge.sourceId,reviewed:edge.reviewed,sourceName:edge.sourceName})) } satisfies ReferenceResult;
    });
    return [countryId, records];
  }),
) as Record<SpeciesCountry, ReferenceResult[]>;

/** Exact stable identity lookup for owner records, never a fuzzy name join. */
export function getReferenceSpecies(country:SpeciesCountry,id:string){
  return indexed[country].find(bird=>bird.id===id)
}
export function collectionCatalogue(country:SpeciesCountry){
 const c=catalogues[country];return {countryId:country,name:c.name,reviewed:c.reviewed,scope:c.scope,total:indexed[country].filter(b=>!b.historical&&!b.referenceOnly).length,sources:c.sources.map(s=>({title:s.title,edition:s.edition,url:s.url}))}
}

/** Bounded anonymous reference search. No saved wishes, accounts or live sightings. */
export function searchSpeciesReference(
  country: SpeciesCountry,
  params: URLSearchParams,
): SpeciesReferenceResponse | null {
  const normalized = normalizeSpeciesQuery(params);
  if (!normalized) return null;
  params = normalized;
  const catalogue = catalogues[country];
  const all = indexed[country];
  const regionId = params.get("region") ?? "";
  const regions = destinationRegions[country] ?? [];
  if (regionId && !regions.some((region) => region.id === regionId))
    return null;
  const query = normalize((params.get("q") ?? "").trim().slice(0, 120));
  const origin = params.get("origin") ?? "all";
  const occurrence = params.get("occurrence") ?? "all";
  const includeReference = params.get("reference") === "1";
  const filter = all.filter(
    (bird) =>
      (includeReference || !(bird.historical || bird.referenceOnly)) &&
      (!regionId || bird.regions.some((region) => region.id === regionId)) &&
      (origin === "all" ||
        (origin === "native"
          ? ["native", "endemic"].includes(bird.origin)
          : bird.origin === origin)) &&
      (occurrence === "all" || bird.occurrence === occurrence) &&
      (!query ||
        normalize(
          [
            bird.commonName,
            bird.localName,
            bird.scientificName,
            bird.family,
            bird.previousScientificName ?? "",
            ...bird.aliases,
          ].join(" "),
        ).includes(query)),
  );
  const rawOffset = Number(params.get("offset") ?? 0);
  const limit = 40;
  // Snap stale links to the last available result page, never a misleading empty page.
  const lastOffset = Math.max(0, Math.ceil(filter.length / limit) - 1) * limit;
  const offset =
    Number.isSafeInteger(rawOffset) && rawOffset >= 0
      ? Math.min(Math.floor(rawOffset / limit) * limit, lastOffset)
      : 0;
  // Full national JSON and the NZ media catalogue stay server-side. Only the
  // requested page and its existing, credited images reach the browser.
  const results = filter.slice(offset, offset + limit).map((bird) => ({
    ...bird,
    media:
      country === "new-zealand" ? nzChecklistMedia.get(bird.id) : undefined,
  }));
  return {
    countryId: country,
    name: catalogue.name,
    scope: catalogue.scope,
    reviewed: catalogue.reviewed,
    sources: [...catalogue.sources,...regionalEvidence.sources.filter(source=>source.countryId===country)],
    regionalExclusions:regionalEvidence.excludedRows.filter(row=>regionalEvidence.sources.some(source=>source.id===row.sourceId&&source.countryId===country)).map(row=>({sourceId:row.sourceId,sourceName:row.sourceName,reason:row.reason})),
    total: all.length,
    defaultTotal: all.filter((bird) => !(bird.historical || bird.referenceOnly))
      .length,
    matched: filter.length,
    offset,
    limit,
    excludedRows: catalogue.excludedRows,
    regions: regions.map((region) => ({
      id: region.id,
      name: region.name,
      reviewedCount: all.filter((bird) =>
        bird.regions.some((item) => item.id === region.id),
      ).length,
    })),
    regionalCoverage: all.filter((bird) => bird.regions.length > 0).length,
    results,
  };
}
