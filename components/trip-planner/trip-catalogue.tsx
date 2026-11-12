"use client";
import {sourceFreshness} from "@/lib/source-freshness";
import { useIslandPlanner } from "./island-planner-context";

import TripPriceReference from "./trip-price-reference";

import { useEffect, useId, useState } from "react";
import {
  readNzPlaceIdeas,
  writeNzPlaceIdeas,
  NZ_PLACE_IDEAS_EVENT,
} from "@/lib/nz-place-ideas";
import { type TripCategory, type TripPlace } from "@/lib/island-planning-types";

import {
  button,
  external,
  field,
  SourceLink,
  VisitReference,
} from "./presentation";

/** Browsing and place ideas are independent of generated route and private save state. */
export default function TripCatalogue({ areaId }: { areaId: string }) {
  const {
    airbnbAreaUrl,
    categoryName,
    tripAreas,
    tripAreaById,
    tripCategories,
    tripPlaces,
    prices,
  } = useIslandPlanner();
  const { priceByPlace } = prices;
  const id = useId();
  const [category, setCategory] = useState("all"),
    [query, setQuery] = useState(""),
    [claim, setClaim] = useState("all"),
    [limit, setLimit] = useState(12);
  const [ideas, setIdeas] = useState<string[]>([]),
    [notice, setNotice] = useState("");
  useEffect(() => {
    const restore = () => {
      try {
        setIdeas(readNzPlaceIdeas(window.sessionStorage));
      } catch {
        setNotice(
          "Place ideas work on this page only. Copy their names before leaving.",
        );
      }
    };
    restore();
    window.addEventListener(NZ_PLACE_IDEAS_EVENT, restore);
    return () => window.removeEventListener(NZ_PLACE_IDEAS_EVENT, restore);
  }, []);
  function toggleIdea(place: TripPlace) {
    const next = ideas.includes(place.id)
      ? ideas.filter((x) => x !== place.id)
      : [...ideas, place.id];
    setIdeas(next);
    try {
      if (!writeNzPlaceIdeas(window.sessionStorage, next)) throw Error();
      window.dispatchEvent(new Event(NZ_PLACE_IDEAS_EVENT));
      setNotice(
        "Place ideas updated in this tab. Import and save them in your private brief.",
      );
    } catch {
      setNotice(
        "Place ideas are in this page only. Copy their names before leaving.",
      );
    }
  }
  const results = tripPlaces.filter(
    (p) =>
      (areaId === "all" || p.base === areaId) &&
      (category === "all" || p.categories.includes(category as TripCategory)) &&
      (claim === "all" ||
        (claim === "priced" && priceByPlace.has(p.id)) ||
        (claim === "eco" && p.eco) ||
        p.tags.includes(claim)) &&
      `${p.name} ${p.description}`
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase()),
  );
  return (
    <section className="mt-12" aria-labelledby={`${id}-browse`}>
      <h3 id={`${id}-browse`} className="text-2xl font-medium text-emerald-950">
        Build in the things you enjoy
      </h3>
      <p className="mt-3 text-sm leading-6 text-gray-600">
        Browse all categories, save individual ideas, or choose them in your
        daily draft. Organic and farm to table tags describe sourced operator
        statements, not a blanket certification.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <label className="text-sm" htmlFor={`${id}-search`}>
          Find a place
          <input
            className={`${field} mt-1`}
            id={`${id}-search`}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLimit(12);
            }}
            placeholder="Name or experience"
          />
        </label>
        <label className="text-sm" htmlFor={`${id}-category`}>
          Category
          <select
            id={`${id}-category`}
            className={`${field} mt-1`}
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setLimit(12);
            }}
          >
            <option value="all">All categories</option>
            {tripCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm" htmlFor={`${id}-evidence`}>
          Food & eco evidence
          <select
            className={`${field} mt-1`}
            id={`${id}-evidence`}
            value={claim}
            onChange={(e) => {
              setClaim(e.target.value);
              setLimit(12);
            }}
          >
            <option value="all">All reviewed references</option>
            <option value="eco">Published operator evidence</option>
            <option value="priced">Published price reference</option>
            <option value="organic-ingredients">
              Organic ingredient statements
            </option>
            <option value="farm-to-table">
              Farm / garden to table statements
            </option>
            <option value="local-produce">Local produce</option>
            <option value="natural-thermal">Natural thermal pools</option>
          </select>
        </label>
      </div>
      <p role="status" className="mt-4 text-sm text-gray-600">
        {results.length} references in this view
        {areaId !== "all" ? ` · ${tripAreaById.get(areaId)?.name}` : ""}.
      </p>
      <div className="mt-4 grid items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
        {results.slice(0, limit).map((place) => (
          <article
            key={place.id}
            aria-label={place.name}
            className="min-w-0 rounded-2xl border border-emerald-200 bg-white p-5"
          >
            <p className="text-xs font-medium text-emerald-700">
              {tripAreaById.get(place.base)?.name} ·{" "}
              {place.categories.map(categoryName).join(" · ")}
            </p>
            <h4 className="mt-2 text-lg font-semibold text-emerald-950">
              {place.name}
            </h4>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              {place.description}
            </p>
            {place.eco && (
              <details className="mt-3 text-xs leading-6 text-emerald-900">
                <summary className="min-h-11 cursor-pointer font-semibold">
                  Operator evidence & scope
                </summary>
                {place.eco.note}
              </details>
            )}
            {place.when && (
              <p className="mt-3 text-xs leading-6 text-amber-900">
                {place.when}
              </p>
            )}
            {place.access && (
              <details className="mt-2 text-xs leading-6 text-gray-600">
                <summary className="min-h-11 cursor-pointer font-semibold">
                  Access & planning
                </summary>
                {place.access}
              </details>
            )}
            <p className="mt-2 text-[11px] text-gray-500">
              Source reviewed {place.checkedAt}. {sourceFreshness(place.checkedAt)==="reviewed" ? "Check current access and arrangements." : "Review due. Recheck the original source before relying on access or supplier details."}
            </p>
            <VisitReference place={place} />
            <SourceLink place={place} />
            <TripPriceReference placeId={place.id} />
            <div>
              <button
                type="button"
                className={button}
                aria-pressed={ideas.includes(place.id)}
                onClick={() => toggleIdea(place)}
              >
                {ideas.includes(place.id)
                  ? "Remove place idea"
                  : "Add place idea"}
                <span className="sr-only">: {place.name}</span>
              </button>
            </div>
          </article>
        ))}
      </div>
      {results.length === 0 && (
        <p className="mt-5 text-sm text-gray-600">
          No reviewed matches here yet. Change the category, evidence filter or
          planning base.
        </p>
      )}
      {results.length > limit && (
        <button
          type="button"
          className={`${button} mt-5`}
          onClick={() => setLimit((n) => n + 12)}
        >
          Show more places and experiences
        </button>
      )}
      <details className="mt-6 rounded-2xl border border-emerald-200 bg-white p-4">
        <summary className="min-h-11 cursor-pointer font-semibold text-emerald-950">
          Airbnb searches & area reference sources
        </summary>
        <p className="mt-3 text-xs leading-6 text-gray-600">
          These are public area searches. AVES has not checked individual homes,
          host eco claims, prices or availability. Broad bases can span long
          drives; verify exact locations before choosing.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {tripAreas
            .filter((a) => areaId === "all" || a.id === areaId)
            .map((a) => (
              <div
                key={a.id}
                className="rounded-xl border border-emerald-100 p-3"
              >
                <a
                  href={airbnbAreaUrl(a.id)}
                  {...external}
                  className="inline-flex min-h-11 items-center text-sm font-semibold text-emerald-800 underline"
                >
                  Airbnb homes · {a.name}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <br />
                <a
                  href={a.sourceUrl}
                  {...external}
                  className="inline-flex min-h-11 items-center text-xs text-gray-600 underline"
                >
                  Area map reference
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            ))}
        </div>
      </details>
      <p role="status" className="mt-3 text-sm text-emerald-900">
        {notice}
      </p>
    </section>
  );
}
