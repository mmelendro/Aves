"use client";

import { useEffect, useId, useRef, useState } from "react";
import NewZealandBirdPicker from "./new-zealand-bird-picker";
import {
  readNzBirdBasket,
  writeNzBirdBasket,
  NZ_BIRD_BASKET_EVENT,
} from "@/lib/nz-bird-selection";
import { nzBirdName } from "@/content/new-zealand-checklist";
import {
  buildSouthIslandPlans,
  tripGateways,
  gatewayById,
  tripCurrencies,
  allowanceCategories,
  tripDayDate,
  defaultTripInput,
  readTripDraft,
  tripAreaById,
  tripAreas,
  tripPlaces,
  tripCategories,
  tripCoverage,
  tripDraftText,
  validTripInput,
  writeTripDraft,
  type TripDay,
  type TripDraft,
  type TripPlannerInput,
  type TripStyle,
} from "@/lib/south-island-trip-planner";
import TripBaseMap from "./trip-planner/trip-base-map";
import TripDayCard from "./trip-planner/trip-day-card";
import TripCatalogue from "./trip-planner/trip-catalogue";
import TripAllowanceSummary from "./trip-planner/trip-allowance-summary";
import { button, field } from "./trip-planner/presentation";

/** Owns trip inputs, suggestions and explicit private handoff. Child modules own display and browsing. */
export default function SouthIslandTripPlanner() {
  const id = useId(),
    output = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState<TripPlannerInput>(defaultTripInput);
  const [draft, setDraft] = useState<TripDraft | null>(null);
  const [alternatives, setAlternatives] = useState<
    { id: TripStyle; label: string; draft: TripDraft }[]
  >([]);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    try {
      const saved = readTripDraft(window.sessionStorage),
        birds = readNzBirdBasket(window.sessionStorage);
      if (saved) {
        setDraft(saved);
        setInput({
          ...saved.input,
          ...(birds.length ? { birdIds: birds } : {}),
        });
      } else setInput((current) => ({ ...current, birdIds: birds }));
      const base = new URLSearchParams(window.location.search).get("base");
      if (base && tripAreaById.has(base))
        setInput((current) => ({ ...current, areaId: base }));
    } catch {
      setNotice(
        "Your choices work here, but this browser may not carry them between pages. Use Copy itinerary if needed.",
      );
    }
    const restoreBirds = () => {
      try {
        const birds = readNzBirdBasket(window.sessionStorage);
        setInput((current) => ({ ...current, birdIds: birds }));
      } catch {}
    };
    const selectBase = (event: Event) => {
      const base = (event as CustomEvent).detail;
      if (typeof base === "string" && tripAreaById.has(base))
        setInput((current) => ({ ...current, areaId: base }));
    };
    window.addEventListener(NZ_BIRD_BASKET_EVENT, restoreBirds);
    window.addEventListener("aves:trip-base", selectBase);
    return () => {
      window.removeEventListener(NZ_BIRD_BASKET_EVENT, restoreBirds);
      window.removeEventListener("aves:trip-base", selectBase);
    };
  }, []);
  function chooseBirds(ids: string[]) {
    setInput((current) => ({ ...current, birdIds: ids }));
    try {
      if (!writeNzBirdBasket(window.sessionStorage, ids))
        setNotice(
          "Bird choices are in this page only. Copy the itinerary before leaving.",
        );
    } catch {
      setNotice(
        "Copy the itinerary before leaving; browser storage is unavailable.",
      );
    }
  }
  function generate() {
    try {
      const choices = buildSouthIslandPlans(input);
      setAlternatives(choices);
      setDraft(choices[0].draft);
      setNotice(
        `${choices.length} distinct draft${choices.length === 1 ? "" : "s"} ready below. Compare them, then adjust outings and stays.`,
      );
      output.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (error) {
      setNotice(
        error instanceof Error ? error.message : "Review your choices.",
      );
    }
  }
  function changeDay(index: number, patch: Partial<TripDay>) {
    if (!draft) return;
    const next = {
      ...draft,
      days: draft.days.map((day, i) =>
        i === index ? { ...day, ...patch } : day,
      ),
    };
    setDraft(next);
    setAlternatives((current) =>
      current.map((option) =>
        option.id === next.style ? { ...option, draft: next } : option,
      ),
    );
    setNotice(
      "Itinerary updated on this page. Carry it to your private brief when ready.",
    );
  }
  const dirty = Boolean(
    draft && JSON.stringify(input) !== JSON.stringify(draft.input),
  );
  function carry() {
    if (!draft || dirty) return;
    try {
      if (!writeTripDraft(window.sessionStorage, draft)) throw Error();
      if (!writeNzBirdBasket(window.sessionStorage, draft.input.birdIds))
        throw Error();
      window.location.assign(
        "/account?country=new-zealand&region=south-island",
      );
    } catch {
      setNotice(
        "This browser could not carry the itinerary. Copy it below and paste it into your private brief’s notes.",
      );
    }
  }
  async function copy() {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(tripDraftText(draft));
      setNotice(
        "Itinerary copied. Paste it into your private brief’s notes, review, then save.",
      );
    } catch {
      setNotice("Select the itinerary text below and copy it manually.");
    }
  }
  const coverage = draft ? tripCoverage(draft) : null;
  const activeBases = draft
    ? draft.days
        .filter((d, i) => i === 0 || d.baseId !== draft.days[i - 1].baseId)
        .map((d) => d.baseId)
    : [];
  return (
    <section
      id="trip-planner"
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-28 bg-emerald-50/50 py-10 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-widest text-emerald-700">
          Make room for the whole trip
        </p>
        <h2
          id={`${id}-heading`}
          className="mt-3 text-3xl font-medium tracking-tight text-emerald-950 sm:text-4xl"
        >
          Your birds. Your days. Your South Island.
        </h2>
        <p className="mt-4 max-w-3xl leading-7 text-gray-600">
          Choose your birds and trip length, then shape a day by day draft with
          stays, local food, markets, walks, hot pools and experiences.{" "}
          {tripPlaces.length} source-linked places and experiences across{" "}
          {tripAreas.length} planning bases. B Corp certification is optional.
        </p>
        <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(15rem,.6fr)]">
          <div className="min-w-0 space-y-5 rounded-3xl border border-emerald-200 bg-white p-5 sm:p-7">
            <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_8rem]">
              <label className="text-sm font-medium" htmlFor={`${id}-area`}>
                Plan around
                <select
                  id={`${id}-area`}
                  value={input.areaId}
                  onChange={(e) => {
                    setInput((current) => ({
                      ...current,
                      areaId: e.target.value,
                    }));
                  }}
                  className={`${field} mt-2`}
                >
                  <option value="all">
                    South Island · suggest bases for my birds
                  </option>
                  {tripAreas.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-medium" htmlFor={`${id}-days`}>
                Number of days
                <input
                  id={`${id}-days`}
                  className={`${field} mt-2`}
                  type="number"
                  min={1}
                  max={30}
                  step={1}
                  value={input.days || ""}
                  onChange={(e) =>
                    setInput((current) => ({
                      ...current,
                      days: Number(e.target.value),
                    }))
                  }
                />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium" htmlFor={`${id}-start`}>
                Starting city / town
                <select
                  id={`${id}-start`}
                  className={`${field} mt-2`}
                  value={input.startCity}
                  onChange={(e) =>
                    setInput((current) => ({
                      ...current,
                      startCity: e.target.value,
                    }))
                  }
                >
                  <option value="flexible">Open to suggestions</option>
                  {tripGateways.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-medium" htmlFor={`${id}-finish`}>
                Departure city / town
                <select
                  id={`${id}-finish`}
                  className={`${field} mt-2`}
                  value={input.endCity}
                  onChange={(e) =>
                    setInput((current) => ({
                      ...current,
                      endCity: e.target.value,
                    }))
                  }
                >
                  <option value="flexible">Open to suggestions</option>
                  {tripGateways.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label
              className="block text-sm font-medium"
              htmlFor={`${id}-departure`}
            >
              Departure / final day (optional)
              <input
                id={`${id}-departure`}
                type="date"
                className={`${field} mt-2`}
                value={input.departureDate}
                onChange={(e) => {
                  if (e.target.validity.badInput) return;
                  const departureDate = e.target.value;
                  setInput((current) => ({ ...current, departureDate }));
                }}
              />
            </label>
            {input.departureDate && validTripInput(input) && (
              <p className="text-sm text-emerald-800">
                First day: {tripDayDate(input, 0)} · Last day:{" "}
                {input.departureDate}. Add flight and check-in times in your
                private brief.
              </p>
            )}
            <details className="rounded-2xl border border-emerald-100 p-4">
              <summary className="min-h-11 cursor-pointer font-semibold text-emerald-900">
                Your daily allowances · {input.currency}
              </summary>
              <p className="mt-2 text-xs leading-6 text-gray-600">
                Per person. Accommodation is per night; food and transport per
                day. Leave any amount open. These are your allowances, not
                checked room or activity prices.
              </p>
              <label className="mt-3 block text-sm" htmlFor={`${id}-currency`}>
                Currency
                <select
                  id={`${id}-currency`}
                  className={`${field} mt-1`}
                  value={input.currency}
                  onChange={(e) =>
                    setInput((current) => ({
                      ...current,
                      currency: e.target.value as TripPlannerInput["currency"],
                    }))
                  }
                >
                  {tripCurrencies.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {allowanceCategories.map((c) => (
                  <label
                    key={c.id}
                    className="text-sm"
                    htmlFor={`${id}-allowance-${c.id}`}
                  >
                    {c.label} allowance ({input.currency})
                    <input
                      id={`${id}-allowance-${c.id}`}
                      type="number"
                      min={0}
                      max={10000}
                      step={1}
                      className={`${field} mt-1`}
                      placeholder="Open"
                      value={input.allowances[c.id] ?? ""}
                      onChange={(e) =>
                        setInput((current) => {
                          const allowances = { ...current.allowances };
                          if (e.target.value === "") delete allowances[c.id];
                          else allowances[c.id] = Number(e.target.value);
                          return { ...current, allowances };
                        })
                      }
                    />
                  </label>
                ))}
              </div>
              <label
                className="mt-3 block text-sm"
                htmlFor={`${id}-activity-basis`}
              >
                Activities allowance is
                <select
                  id={`${id}-activity-basis`}
                  className={`${field} mt-1`}
                  value={input.activityBasis}
                  onChange={(e) =>
                    setInput((current) => ({
                      ...current,
                      activityBasis: e.target.value as "day" | "experience",
                    }))
                  }
                >
                  <option value="day">Per day, across all activities</option>
                  <option value="experience">Per planned experience</option>
                </select>
              </label>
              <p className="mt-2 text-xs leading-6 text-gray-600">
                Changing currency keeps the numbers; it does not convert them.
                Per-experience allowances reserve for each planned outing,
                including walks that may have no entry charge. Check actual
                prices separately.
              </p>
            </details>
            <details className="rounded-2xl border border-emerald-100 p-4">
              <summary className="min-h-11 cursor-pointer font-semibold text-emerald-900">
                Your bird choices · {input.birdIds.length}
              </summary>
              <div className="mt-3">
                <NewZealandBirdPicker
                  selected={input.birdIds}
                  onChange={chooseBirds}
                />
              </div>
            </details>
            <fieldset>
              <legend className="text-sm font-semibold text-emerald-950">
                What else belongs in your trip?
              </legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {tripCategories
                  .filter(
                    (c) => !["birding", "stays", "transport"].includes(c.id),
                  )
                  .map((c) => (
                    <label
                      key={c.id}
                      className="flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-emerald-200 px-3 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={input.interests.includes(c.id)}
                        onChange={(e) =>
                          setInput((current) => ({
                            ...current,
                            interests: e.target.checked
                              ? [...current.interests, c.id]
                              : current.interests.filter((x) => x !== c.id),
                          }))
                        }
                      />
                      {c.label}
                    </label>
                  ))}
              </div>
            </fieldset>
            <label className="flex min-h-11 items-start gap-2 text-sm leading-6">
              <input
                className="mt-1.5"
                type="checkbox"
                checked={input.includeManaged}
                onChange={(e) =>
                  setInput((current) => ({
                    ...current,
                    includeManaged: e.target.checked,
                  }))
                }
              />
              Include sanctuary and managed conservation encounters, labelled
              separately from wild outings
            </label>
            <button
              type="button"
              className={`${button} bg-emerald-800 text-white hover:bg-emerald-900`}
              disabled={!validTripInput(input)}
              onClick={generate}
            >
              {draft ? "Update my suggestions" : "Suggest my itineraries"}
            </button>
            <p className="text-xs leading-6 text-gray-600">
              A planning draft built from documented bird/site links, not live
              sightings. Transfers get their own day. Road times, within-base
              travel, track access, season, prices and availability need
              checking. Longer outings may replace that day’s birding.
            </p>
          </div>
          <TripBaseMap
            areaId={input.areaId}
            activeBases={activeBases}
            onSelect={(areaId) =>
              setInput((current) => ({ ...current, areaId }))
            }
          />
        </div>
        <p role="status" className="mt-5 text-sm leading-6 text-emerald-900">
          {notice}
        </p>
        <div ref={output} className="scroll-mt-28">
          {draft && (
            <div className="mt-8 space-y-5">
              {alternatives.length > 0 && (
                <div
                  aria-label="Compare itinerary suggestions"
                  className="grid gap-3 md:grid-cols-3"
                >
                  {alternatives.map((option) => {
                    const c = tripCoverage(option.draft);
                    return (
                      <button
                        key={option.id}
                        type="button"
                        aria-pressed={draft.style === option.id}
                        disabled={dirty}
                        className="min-h-24 rounded-2xl border border-emerald-200 bg-white p-4 text-left text-emerald-950 aria-pressed:border-emerald-800 aria-pressed:bg-emerald-100 disabled:opacity-50"
                        onClick={() => {
                          setDraft(option.draft);
                          setNotice(
                            "Suggestion selected. Daily changes apply to this draft.",
                          );
                        }}
                      >
                        <span className="block font-semibold">
                          {option.label}
                        </span>
                        <span className="mt-2 block text-xs leading-6">
                          {new Set(option.draft.days.map((d) => d.baseId)).size}{" "}
                          bases ·{" "}
                          {
                            option.draft.days.filter((d) => d.transferFrom)
                              .length
                          }{" "}
                          transfer days · {c.covered.length}/
                          {option.draft.input.birdIds.length} bird wishes linked
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
              {alternatives.length === 1 && (
                <p className="text-sm text-gray-600">
                  One distinct route fits this set of choices. More days, a
                  wider area or different interests may produce more
                  alternatives.
                </p>
              )}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-medium text-emerald-950">
                    Your {draft.input.days} day draft
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {draft.input.days - 1} overnight
                    {draft.input.days === 2 ? "" : "s"} ·{" "}
                    {activeBases
                      .map((id) => tripAreaById.get(id)?.name)
                      .join(" → ")}
                  </p>
                </div>
                <button
                  type="button"
                  className={button}
                  disabled={dirty}
                  onClick={carry}
                >
                  Review and save in My Trips
                </button>
              </div>
              <p className="text-sm leading-6 text-emerald-900">
                Start:{" "}
                {gatewayById.get(draft.input.startCity)?.name ||
                  "Open to suggestions"}{" "}
                · Finish:{" "}
                {gatewayById.get(draft.input.endCity)?.name ||
                  "Open to suggestions"}
                {draft.input.departureDate
                  ? ` · Depart ${draft.input.departureDate}`
                  : ""}
                .
              </p>
              <TripAllowanceSummary draft={draft} />
              {dirty && (
                <p
                  role="alert"
                  className="rounded-xl bg-amber-50 p-4 text-sm text-amber-950"
                >
                  Your choices changed. Rebuild before carrying this itinerary
                  to your private brief.
                </p>
              )}
              <p className="text-sm leading-6 text-emerald-900">
                {coverage!.covered.length} of {draft.input.birdIds.length} bird
                wishes linked to scheduled, sourced opportunities. This is
                coverage of your choices, not the chance of a sighting.
              </p>
              {coverage!.unmatched.length > 0 && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <h4 className="font-semibold text-amber-950">
                    Still needs a suitable site or more days
                  </h4>
                  <p className="mt-2 text-sm leading-6">
                    {coverage!.unmatched.map(nzBirdName).join(", ")}. These
                    birds have no scheduled sourced stop in this draft. They may
                    need another region, season, guide or more catalogue
                    research.
                  </p>
                </div>
              )}
              <div className="grid items-start gap-4 xl:grid-cols-2">
                {draft.days.map((_, index) => (
                  <TripDayCard
                    key={index}
                    id={id}
                    draft={draft}
                    index={index}
                    onChange={(patch) => changeDay(index, patch)}
                  />
                ))}
              </div>
              <details className="rounded-2xl border border-emerald-200 bg-white p-4">
                <summary className="min-h-11 cursor-pointer font-medium text-emerald-900">
                  Copy or review the complete itinerary text
                </summary>
                <textarea
                  aria-label="Itinerary text to copy"
                  readOnly
                  value={tripDraftText(draft)}
                  rows={10}
                  className={`${field} mt-3 font-mono text-xs`}
                />
                <button
                  type="button"
                  className={`${button} mt-3`}
                  onClick={copy}
                >
                  Copy itinerary
                </button>
              </details>
              <p className="text-xs leading-6 text-gray-600">
                Your choices, date and allowances use this tab for up to one
                day; they are not sent to booking platforms. In My Trips, choose
                Add Itinerary to Notes, review and Save My Draft. Saving and
                sharing are separate steps. This does not book travel.
              </p>
            </div>
          )}
        </div>
        <TripCatalogue key={input.areaId} areaId={input.areaId} />
      </div>
    </section>
  );
}
