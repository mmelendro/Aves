import EbirdLink from "./ebird-link";
import AlbumRail from "./album-rail";
/** Server-rendered, paginated public inventory. Only 40 rows and their media are
 * sent to a traveller. Native GET forms work without client JavaScript. */
import InventorySearchSubmit from "./inventory-search-submit";
import InventoryBirdImage from "./inventory-bird-image";
import BirdConservationLabel from "./bird-conservation-label";
import { birdConservation, statusLabels } from "@/lib/bird-conservation";

import type {
  SpeciesCountry,
  SpeciesReferenceResponse,
} from "@/lib/species-reference-types";

const countries: { id: SpeciesCountry; name: string }[] = [
  { id: "colombia", name: "Colombia" },
  { id: "australia", name: "Australia" },
  { id: "new-zealand", name: "New Zealand" },
];
const origins = [
  ["all", "All origins"],
  ["native", "Native, including endemic"],
  ["endemic", "Endemic"],
  ["introduced", "Introduced"],
  ["unknown", "Origin not confirmed"],
];
const occurrences = [
  ["all", "All occurrence types"],
  ["resident", "Resident"],
  ["migrant", "Migrant"],
  ["vagrant", "Vagrant"],
  ["introduced", "Introduced"],
  ["uncertain", "Uncertain"],
  ["unknown", "Not classified"],
  ["historical", "Historical"],
];
const selectStyle =
  "mt-1 min-h-11 w-full rounded-lg border border-emerald-200 bg-white px-3 text-sm";
const linkStyle =
  "inline-flex min-h-11 items-center rounded-lg border border-emerald-300 px-4 text-sm font-medium text-emerald-900 underline underline-offset-4";

export function CountrySpeciesInventory({
  data,
  params,
}: {
  data: SpeciesReferenceResponse;
  params: URLSearchParams;
}) {
  const sourceById = new Map(data.sources.map((source) => [source.id, source]));
  const pageHref = (offset: number) => {
    const query = new URLSearchParams(params);
    query.set("country", data.countryId);
    query.set("offset", String(offset));
    return `/species/reference?${query.toString()}#inventory-results`;
  };
  return (
    <div className="space-y-8">
      <nav
        aria-label="Country species inventories"
        className="flex flex-wrap gap-3"
      >
        {countries.map((country) => (
          <a
            key={country.id}
            href={`/species/reference?country=${country.id}`}
            aria-current={country.id === data.countryId ? "page" : undefined}
            className={`${linkStyle} ${country.id === data.countryId ? "bg-emerald-900 text-white" : "bg-emerald-50"}`}
          >
            {country.name}
          </a>
        ))}
      </nav>
      <p className="max-w-2xl text-lg leading-8 text-emerald-950">A whole flock of possibilities. Find a familiar face, meet a new favourite, and turn a card to discover where its story unfolds.</p>
      <details className="max-w-3xl text-sm leading-6 text-gray-600"><summary className="min-h-11 cursor-pointer">About this collection · {data.total.toLocaleString("en")} birds</summary><p>{data.defaultTotal.toLocaleString("en")} birds appear in the main collection. You can include historical and reference records with the filters below.</p><p className="mt-2">{data.scope}</p><p className="mt-2">We’ve reviewed regional links for {data.regionalCoverage} entries so far. Region filters are a growing selection; a missing link does not mean a bird is absent. Wildlife keeps its own calendar—records and photographs cannot promise a sighting.</p></details>
      <form
        method="get"
        action="/species/reference#inventory-results"
        className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 sm:p-6"
      >
        <input type="hidden" name="country" value={data.countryId} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-sm font-medium text-gray-900">
            Bird name or family
            <input
              name="q"
              defaultValue={params.get("q") ?? ""}
              maxLength={120}
              type="search"
              className={selectStyle}
              placeholder="Common, local or scientific name"
            />
          </label>
          <label className="text-sm font-medium text-gray-900">
            Origin
            <select
              name="origin"
              defaultValue={params.get("origin") ?? "all"}
              className={selectStyle}
            >
              {origins.map(([value, name]) => (
                <option key={value} value={value}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium text-gray-900">
            Occurrence
            <select
              name="occurrence"
              defaultValue={params.get("occurrence") ?? "all"}
              className={selectStyle}
            >
              {occurrences.map(([value, name]) => (
                <option key={value} value={value}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium text-gray-900">
            Reviewed regional selection
            <select
              name="region"
              defaultValue={params.get("region") ?? ""}
              className={selectStyle}
            >
              <option value="">National reference</option>
              {data.regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name} ({region.reviewedCount} reviewed)
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="mt-4 flex min-h-11 items-center gap-3 text-sm text-gray-800">
          <input
            type="checkbox"
            name="reference"
            value="1"
            defaultChecked={params.get("reference") === "1"}
            className="h-4 w-4 accent-emerald-700"
          />
          Include historical, hypothetical and other reference-only entries
        </label>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <InventorySearchSubmit />
          <a
            href={`/species/reference?country=${data.countryId}`}
            className="inline-flex min-h-11 items-center text-sm text-emerald-800 underline underline-offset-4"
          >
            Clear filters
          </a>
        </div>
      </form>
      <section
        id="inventory-results"
        aria-labelledby="inventory-results-heading"
        className="scroll-mt-24"
      >
        <h2
          id="inventory-results-heading"
          tabIndex={-1}
          className="text-2xl font-medium text-emerald-950"
        >
          {data.matched.toLocaleString("en")} {data.matched === 1 ? "bird" : "birds"} to discover
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {data.results.length
            ? `Showing ${data.offset + 1} to ${data.offset + data.results.length}.`
            : "No birds match these filters. Try another name or clear the filters."}{" "}
          Turn a card to explore its places and sources.
        </p>
        {data.results.length === 0 && (
          <a
            href={`/species/reference?country=${data.countryId}`}
            className={`${linkStyle} mt-4`}
          >
            Reset this search
          </a>
        )}
        <AlbumRail label="Bird album"><ul className="mt-6">
          {data.results.map((bird) => (
            <li
              key={bird.id}
              className="min-w-0 overflow-hidden rounded-2xl border border-emerald-100 bg-white p-3 shadow-sm"
            >
              <div className="mb-4 overflow-hidden rounded-xl bg-emerald-50">
                {bird.media || bird.guide ? <InventoryBirdImage src={bird.media?.bird.image ?? bird.guide!.image} name={bird.commonName} album /> : <div className="flex aspect-[3/2] items-center justify-center bg-gradient-to-br from-emerald-50 to-amber-50 p-6 text-center text-sm text-emerald-800">A face still to discover<br />Photograph coming later</div>}
                {bird.media?.kind === "illustration" && <p className="px-3 py-1 text-xs text-gray-600">Reference illustration</p>}
              </div>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="break-words text-lg font-semibold text-gray-900">
                    {bird.commonName}
                    {bird.localName && ` / ${bird.localName}`}
                  </h3>
                  <p className="mt-1 break-words text-sm italic text-gray-600">
                    {bird.scientificName}
                  </p>
                  {bird.commonName === bird.scientificName && (
                    <p className="mt-1 text-xs text-gray-600">
                      Common name awaiting source review.
                    </p>
                  )}
                  {bird.family && (
                    <p className="mt-1 text-xs text-gray-600">{bird.family}</p>
                  )}
                </div>
              </div>
              <p className="mt-3 text-xs leading-5 text-emerald-900">Global conservation: {statusLabels[birdConservation(bird)?.globalStatus ?? "unknown"]}</p>
              <EbirdLink scientificName={bird.scientificName}/>
              <details className="mt-3 border-t border-emerald-100 pt-2"><summary className="min-h-11 cursor-pointer content-center text-sm font-medium text-emerald-800">Turn the card · meet this bird</summary>
                <BirdConservationLabel bird={bird} sources />
                {bird.media && <details className="source-note"><summary>Photo credit</summary><p className="text-xs leading-6 text-gray-600">Image: {bird.media.credit.creator} · <a className="underline" href={bird.media.credit.sourceUrl} target="_blank" rel="noreferrer">Original source</a> · <a className="underline" href={bird.media.credit.licenseUrl} target="_blank" rel="noreferrer">{bird.media.credit.license}</a></p></details>}
                {bird.guide && <a href={bird.guide.href} className="inline-flex min-h-11 items-center text-sm text-emerald-800 underline">Open bird guide & media</a>}
              <p className="mt-3 text-sm capitalize text-emerald-900">
                {bird.origin === "unknown"
                  ? "Origin not confirmed"
                  : bird.origin}{" "}
                ·{" "}
                {bird.occurrence === "unknown"
                  ? "Occurrence not classified"
                  : bird.occurrence}
              </p>
              {(bird.historical || bird.referenceOnly) && (
                <p className="mt-2 text-sm font-medium text-amber-900">
                  Reference entry. Not presented as a current trip target.
                </p>
              )}
              <p className="mt-2 break-words text-xs leading-5 text-gray-600">
                Published record: {bird.sourceStatus}
                {bird.populationStatus &&
                  ` · WLAB 2023: ${bird.populationStatus}`}
              </p>
              {bird.regionalExtinction && (
                <p className="mt-1 text-xs leading-5 text-gray-600">
                  The older source reports extinction within Australia. This
                  does not mean global extinction.
                </p>
              )}
              {bird.previousScientificName && (
                <p className="mt-1 text-xs leading-5 text-gray-600">
                  Previous source name: {bird.previousScientificName}. Taxonomy
                  changes can involve splits or lumps.
                </p>
              )}
              {bird.sourceCrosswalk && (
                <p className="mt-1 break-words text-xs leading-5 text-gray-600">
                  Published taxonomy crosswalk: {bird.sourceCrosswalk}. Retained
                  as a source reference, not a merged species identity.
                </p>
              )}
              {bird.regions.length > 0 ? (
                <p className="mt-3 text-xs leading-6 text-gray-700">
                  Reviewed regions:{" "}
                  {bird.regions.map((region, index) => (
                    <span key={region.id}>
                      {index > 0 && ", "}
                      <a
                        href={region.href}
                        className="text-emerald-800 underline underline-offset-4"
                      >
                        {region.name}
                      </a>
                    </span>
                  ))}
                </p>
              ) : (
                <p className="mt-3 text-xs text-gray-600">
                  Regional associations awaiting review.
                </p>
              )}
              {!!bird.regionEvidence?.length&&<details className="mt-3 rounded-lg border border-emerald-100 px-3 text-xs"><summary className="min-h-11 cursor-pointer content-center">Regional evidence and source dates</summary><p className="leading-6">Broad regional association within each source’s scope. Historical sampling does not establish a present-day sighting or complete regional coverage.</p>{bird.regionEvidence.map(edge=>{const source=sourceById.get(edge.sourceId);return source?<p key={edge.regionId+edge.sourceId} className="my-2 leading-6"><a href={source.url} target="_blank" rel="noopener noreferrer" className="underline">{source.title}</a> · {edge.sourceName} · checked {edge.reviewed}</p>:null})}</details>}
              {bird.places.length > 0 && (
                <details className="mt-3 rounded-lg bg-emerald-50 px-3">
                  <summary className="min-h-11 cursor-pointer content-center text-sm font-medium text-emerald-900">
                    {bird.places.length} reviewed{" "}
                    {bird.places.length === 1 ? "place" : "places"} and
                    activities
                  </summary>
                  <ul className="space-y-4 pb-4">
                    {bird.places.map((place) => (
                      <li key={place.id} className="text-xs leading-5">
                        <a
                          href={place.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-emerald-900 underline underline-offset-4"
                        >
                          {place.name}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                        <p>
                          Encounter: {place.encounter}. Activities:{" "}
                          {place.activities.join(", ")}. Reviewed{" "}
                          {place.reviewed}.
                        </p>
                        <p>{place.access}</p>
                      </li>
                    ))}
                  </ul>
                  <p className="pb-4 text-xs leading-5 text-gray-600">
                    Public planning references. Supplier participation and
                    current access require separate confirmation.
                  </p>
                </details>
              )}
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs leading-6 text-emerald-800">
                {bird.guide && (
                  <a
                    href={bird.guide.href}
                    className="underline underline-offset-4"
                  >
                    Featured guide and media credits
                  </a>
                )}
                <a
                  href={sourceById.get(bird.sourceId)?.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4"
                >
                  {sourceById.get(bird.sourceId)?.edition} species source
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                {[...new Set([bird.nameSourceId, bird.statusSourceId])]
                  .filter(
                    (id): id is string => Boolean(id) && id !== bird.sourceId,
                  )
                  .map((id) => (
                    <a
                      key={id}
                      href={sourceById.get(id)?.url}
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-4"
                    >
                      Additional names/status: {sourceById.get(id)?.edition}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ))}
              </div>
              </details>
            </li>
          ))}
        </ul></AlbumRail>
        <nav
          aria-label="Species result pages"
          className="mt-6 flex flex-wrap gap-3"
        >
          {data.offset > 0 && (
            <a
              href={pageHref(Math.max(0, data.offset - data.limit))}
              className={linkStyle}
            >
              Previous birds
            </a>
          )}
          {data.offset + data.limit < data.matched && (
            <a href={pageHref(data.offset + data.limit)} className={linkStyle}>
              Next birds
            </a>
          )}
          {data.offset >= data.matched && data.offset > 0 && (
            <a href={pageHref(0)} className={linkStyle}>
              First page
            </a>
          )}
        </nav>
      </section>
      <details className="rounded-xl border border-emerald-200 p-4 sm:p-6">
        <summary className="min-h-11 cursor-pointer content-center text-lg font-medium text-emerald-950">
          Sources, taxonomy and coverage
        </summary>
        <div className="mt-3 space-y-4 text-sm leading-6 text-gray-700">
          <p>
            Updated {data.reviewed}. Names and classifications follow the country sources below. Earlier names remain available in each bird’s details.
          </p>
          {!!data.regionalExclusions?.length&&<details className="rounded-lg border p-3"><summary className="min-h-11 cursor-pointer">Regional source names awaiting taxonomy review ({data.regionalExclusions.length})</summary><ul className="space-y-2">{data.regionalExclusions.map(row=><li key={row.sourceId+row.sourceName}><span className="italic">{row.sourceName}</span>: {row.reason}. No regional join added from this source name.</li>)}</ul></details>}
          {data.sources.map((source) => (
            <div key={source.id}>
              <a
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-emerald-800 underline underline-offset-4"
              >
                {source.title}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <p>
                {source.edition}
                {source.license && ` · ${source.license}`}
              </p>
              {source.usage && <p>{source.usage}</p>}
              <p>
                <a
                  href={source.dataUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center text-emerald-800 underline underline-offset-4"
                >
                  Original published source file
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
              {source.sha256&&<p className="break-all text-xs">
                Source file SHA-256: {source.sha256}
              </p>}
            </div>
          ))}
          {data.excludedRows.length > 0 && (
            <p>
              {data.excludedRows.length} rows in the published workbook have no
              valid current species name and were excluded pending
              clarification:{" "}
              {data.excludedRows
                .map((row) => `${row.previousName} (row ${row.row})`)
                .join(", ")}
              . The displayed count follows the usable named rows, rather than
              an assumed national total.
            </p>
          )}
          <p>
            eBird live data is not connected. Its API terms require prior
            written permission for commercial use. Regional coverage,
            seasonality and supplier connections will expand as evidence is
            reviewed.
          </p>
        </div>
      </details>
    </div>
  );
}
