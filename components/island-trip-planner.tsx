"use client";
import {useUiCopy} from "@/components/ui-copy-context"

import {UiLanguageProvider,UiLanguageToggle} from "@/components/ui-language"
import type { IslandTripPlanner } from "@/lib/island-trip-planner";
import {readPlannerRecovery,writePlannerRecovery} from "@/lib/planner-recovery";
import {useUnsavedChanges} from "./account/unsaved-changes";
import {
  IslandPlannerProvider,
  useIslandPlanner,
} from "./trip-planner/island-planner-context";
import { useEffect, useId, useRef, useState } from "react";
import NewZealandBirdPicker from "./new-zealand-bird-picker";
import {
  readNzBirdBasket,
  readNzBirdBasketSelection,
  writeNzBirdBasket,
  NZ_BIRD_BASKET_EVENT,
} from "@/lib/nz-bird-selection";
import { nzBirdName } from "@/content/new-zealand-checklist";
import type {
  TripDay,
  TripDraft,
  TripPlannerInput,
  TripStyle,
} from "@/lib/island-planning-types";
import { useMapLayers } from "./map-layer-context";
import { buildTripJourney } from "@/lib/trip-journey";
import { useTripMap } from "./trip-planner/trip-map-context";
import TripDayCard from "./trip-planner/trip-day-card";
import TripCatalogue from "./trip-planner/trip-catalogue";
import RouteReading from "./trip-planner/route-reading";
import TripPriceReview from "./trip-planner/trip-price-review";
import TripAllowanceSummary from "./trip-planner/trip-allowance-summary";
import { button, field } from "./trip-planner/presentation";

/** Owns trip inputs, suggestions and explicit private handoff. Child modules own display and browsing. */
export default function IslandTripPlannerView({
  planner,
  initialDraft,
  onSave,
}: {
  planner: IslandTripPlanner;
  initialDraft?:TripDraft;
  onSave?:(draft:TripDraft)=>Promise<void>;
}) {
  return (
    <UiLanguageProvider scope="island"><UiLanguageToggle/><IslandPlannerProvider planner={planner}>
      <IslandPlannerForm key={planner.context.id} initialDraft={initialDraft} onSave={onSave}/>
    </IslandPlannerProvider></UiLanguageProvider>
  );
}
function IslandPlannerForm({initialDraft,onSave}:{initialDraft?:TripDraft;onSave?:(draft:TripDraft)=>Promise<void>}) {
 const uiCopy=useUiCopy()
 const planner=useIslandPlanner();

  const {
    context,
    buildPlans,
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
    tripRoadSummary,
    tripWorkloadSummary,
    tripDraftText,
    validTripInput,
    writeTripDraft,
  } = useIslandPlanner();
  const tripMap = useTripMap();
  const { update: updateMapLayers } = useMapLayers();
  const id = useId(),
    output = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState<TripPlannerInput>(initialDraft?.input??defaultTripInput);
  const [draft, setDraft] = useState<TripDraft | null>(initialDraft??null);
  const [privateBusy,setPrivateBusy]=useState(false),privateLock=useRef(false);
  const [alternatives, setAlternatives] = useState<
    { id: TripStyle; label: string; draft: TripDraft }[]
  >([]);
  const [notice, setNotice] = useState("");
  const [recovered,setRecovered]=useState(false);
  const [recoveryAvailable,setRecoveryAvailable]=useState(true);
  useUnsavedChanges(Boolean(onSave)&&(JSON.stringify(input)!==JSON.stringify(initialDraft?.input)||JSON.stringify(draft)!==JSON.stringify(initialDraft))||!onSave&&!recoveryAvailable&&(Boolean(draft)||JSON.stringify(input)!==JSON.stringify(defaultTripInput)),uiCopy("You have unsaved itinerary edits. Leave and discard them?"));
  useEffect(() => {
    if(onSave)return;
    try {
      const recovery=readPlannerRecovery(window.sessionStorage,planner);
      const saved = readTripDraft(window.sessionStorage),
        birds = readNzBirdBasketSelection(window.sessionStorage);
      if (recovery || saved) {
        setDraft(recovery ? recovery.draft : saved);
        setInput({
          ...(recovery?.input ?? saved!.input),
          ...(birds !== null ? { birdIds: birds } : {}),
        });
      } else setInput((current) => ({ ...current, birdIds: birds ?? [] }));
      const base = new URLSearchParams(window.location.search).get("base");
      if (!context.corridor && base && tripAreaById.has(base))
        setInput((current) => ({ ...current, areaId: base }));
    } catch {
      setRecoveryAvailable(false);
      setNotice(
        "Your choices work here, but this browser may not carry them between pages. Use Copy itinerary if needed.",
      );
    }
    setRecovered(true);
    const restoreBirds = () => {
      try {
        const birds = readNzBirdBasket(window.sessionStorage);
        setInput((current) => ({ ...current, birdIds: birds }));
      } catch {}
    };
    const selectBase = (event: Event) => {
      const base = (event as CustomEvent).detail;
      if (
        !context.corridor &&
        typeof base === "string" &&
        tripAreaById.has(base)
      )
        setInput((current) => ({ ...current, areaId: base }));
    };
    window.addEventListener(NZ_BIRD_BASKET_EVENT, restoreBirds);
    window.addEventListener("aves:trip-base", selectBase);
    return () => {
      window.removeEventListener(NZ_BIRD_BASKET_EVENT, restoreBirds);
      window.removeEventListener("aves:trip-base", selectBase);
    };
  }, [planner,readTripDraft,context.corridor,tripAreaById,onSave]);
  useEffect(()=>{
    if(onSave||!recovered||!validTripInput(input))return;
    let kept=false;
    try{kept=writePlannerRecovery(window.sessionStorage,planner,input,draft)}catch{}
    setRecoveryAvailable(kept);
    if(!kept)setNotice("Tab recovery is unavailable. Copy your reviewed itinerary before leaving.");
  },[recovered,input,draft,planner,validTripInput,onSave]);
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
      tripMap?.stopJourney();
      const choices = buildPlans(input);
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
    tripMap?.stopJourney();
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
  async function carry() {
    if (!draft || dirty) return;
    if(onSave){
      if(privateLock.current)return;privateLock.current=true;setPrivateBusy(true);
      try{await onSave(draft);setNotice("Your editable itinerary is saved privately.")}catch(error){setNotice(error instanceof Error?error.message:"Your itinerary could not be confirmed. Keep your edits and retry.")}finally{privateLock.current=false;setPrivateBusy(false)}
      return;
    }
    try {
      if (!writeTripDraft(window.sessionStorage, draft)) throw Error();
      if (!writeNzBirdBasket(window.sessionStorage, draft.input.birdIds))
        throw Error();
      window.location.assign(context.accountHref);
    } catch {
      setNotice(
        "This browser could not carry the itinerary. Copy it below and paste it into your private brief’s notes.",
      );
    }
  }
  async function copy() {
    if (!draft || dirty) return;
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
  const roads = draft ? tripRoadSummary(draft) : null;
  const activeBases = draft
    ? draft.days
        .filter((d, i) => i === 0 || d.baseId !== draft.days[i - 1].baseId)
        .map((d) => d.baseId)
    : [];
  const routeKey = activeBases.join("|");
  const setMapBases = tripMap?.setBases;
  const stopMapJourney = tripMap?.stopJourney;
  const selectedMapBase = tripMap?.selectedBase;
  useEffect(() => {
    setMapBases?.(routeKey ? routeKey.split("|") : []);
    return () => {
      setMapBases?.([]);
      stopMapJourney?.();
    };
  }, [routeKey, setMapBases, stopMapJourney]);
  useEffect(() => {
    if (
      !context.corridor &&
      selectedMapBase &&
      tripAreaById.has(selectedMapBase.id)
    )
      setInput((current) => ({ ...current, areaId: selectedMapBase.id }));
  }, [selectedMapBase]);
  useEffect(() => {
    if (tripAreaById.has(input.areaId))
      updateMapLayers({
        planning: true,
        point: `planning-base-${input.areaId}`,
        park: "",
      });
  }, [input.areaId, updateMapLayers]);
  return (
    <section
      id="trip-planner"
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-28 bg-emerald-50/50 py-10 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-widest text-emerald-700">
          {uiCopy("\n          Make room for the whole trip\n        ")}</p>
        <h2
          id={`${id}-heading`}
          className="mt-3 text-3xl font-medium tracking-tight text-emerald-950 sm:text-4xl"
        >
          {uiCopy("\n          Your birds. Your days. Your ")}{context.name}.
        </h2>
        <p className="mt-4 max-w-3xl leading-7 text-gray-600">
          {uiCopy("\n          Choose your birds and trip length, then shape a day by day draft with\n          stays, local food, markets, walks, hot pools and experiences.")}{" "}
          {tripPlaces.length} {uiCopy(" source-linked places and experiences across")}{" "}
          {tripAreas.length} {uiCopy(" planning bases. B Corp certification is optional.\n        ")}</p>
        <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(15rem,.6fr)]">
          <div className="min-w-0 space-y-5 rounded-3xl border border-emerald-200 bg-white p-5 sm:p-7">
            <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_8rem]">
              <label className="text-sm font-medium" htmlFor={`${id}-area`}>
                {uiCopy("\n                Plan around\n                ")}<select
                  id={`${id}-area`}
                  value={input.areaId}
                  disabled={Boolean(context.corridor)}
                  onChange={(e) => {
                    setInput((current) => ({
                      ...current,
                      areaId: e.target.value,
                    }));
                  }}
                  className={`${field} mt-2`}
                >
                  <option value="all">
                    {context.name} ·{" "}
                    {context.corridor ? uiCopy("Auckland to Rotorua pilot") : uiCopy("suggest bases for my birds")}
                  </option>
                  {tripAreas.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-medium" htmlFor={`${id}-days`}>
                {uiCopy("\n                Number of days\n                ")}<input
                  id={`${id}-days`}
                  className={`${field} mt-2`}
                  type="number"
                  min={context.corridor?.minDays ?? 1}
                  max={context.corridor?.maxDays ?? 30}
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
                {uiCopy("\n                Starting city / town\n                ")}<select
                  id={`${id}-start`}
                  className={`${field} mt-2`}
                  value={input.startCity}
                  disabled={Boolean(context.corridor)}
                  onChange={(e) =>
                    setInput((current) => ({
                      ...current,
                      startCity: e.target.value,
                    }))
                  }
                >
                  <option value="flexible">{uiCopy("Open to suggestions")}</option>
                  {tripGateways.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-medium" htmlFor={`${id}-finish`}>
                {uiCopy("\n                Departure city / town\n                ")}<select
                  id={`${id}-finish`}
                  className={`${field} mt-2`}
                  value={input.endCity}
                  disabled={Boolean(context.corridor)}
                  onChange={(e) =>
                    setInput((current) => ({
                      ...current,
                      endCity: e.target.value,
                    }))
                  }
                >
                  <option value="flexible">{uiCopy("Open to suggestions")}</option>
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
              {uiCopy("\n              Departure / final day (optional)\n              ")}<input
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
            <label
              className="block text-sm font-medium"
              htmlFor={`${id}-drive`}
            >
              {uiCopy("\n              Preferred maximum driving per day\n              ")}<select
                id={`${id}-drive`}
                className={`${field} mt-1`}
                value={input.maxDrivingMinutes ?? ""}
                onChange={(e) =>
                  setInput((current) => ({
                    ...current,
                    maxDrivingMinutes: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  }))
                }
              >
                <option value="">{uiCopy("Open to suggestions")}</option>
                {[120, 180, 240, 300].map((minutes) => (
                  <option key={minutes} value={minutes}>
                    {minutes / 60} {uiCopy(" hours\n                  ")}</option>
                ))}
              </select>
              <span className="mt-2 block text-xs leading-5 text-gray-600">
                {uiCopy("\n                A comparison preference, not a routing guarantee. Published\n                times exclude breaks and local travel.\n              ")}</span>
            </label>
            {input.departureDate && validTripInput(input) && (
              <p className="text-sm text-emerald-800">
                {uiCopy("\n                First day: ")}{tripDayDate(input, 0)} {uiCopy(" · Last day:")}{" "}
                {input.departureDate}{uiCopy(". Add flight and check-in times in your\n                private brief.\n              ")}</p>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium" htmlFor={`${id}-adults`}>
                {uiCopy("\n                Adults sharing costs\n                ")}<input
                  id={`${id}-adults`}
                  className={`${field} mt-2`}
                  type="number"
                  min={1}
                  max={12}
                  step={1}
                  value={input.adults ?? 1}
                  onChange={(e) =>
                    setInput((current) => ({
                      ...current,
                      adults: Number(e.target.value),
                    }))
                  }
                />
              </label>
              <label className="text-sm font-medium" htmlFor={`${id}-rooms`}>
                {uiCopy("\n                Rooms / units per night\n                ")}<input
                  id={`${id}-rooms`}
                  className={`${field} mt-2`}
                  type="number"
                  min={1}
                  max={input.adults ?? 1}
                  step={1}
                  value={input.rooms ?? 1}
                  onChange={(e) =>
                    setInput((current) => ({
                      ...current,
                      rooms: Number(e.target.value),
                    }))
                  }
                />
              </label>
            </div>
            <p className="text-xs leading-6 text-gray-600">
              {uiCopy("\n              Allowances stay per person. Room references divide across the\n              adults and units above. Child rates and exact room availability\n              need a quote.\n            ")}</p>
            <details className="rounded-2xl border border-emerald-100 p-4">
              <summary className="min-h-11 cursor-pointer font-semibold text-emerald-900">
                {uiCopy("\n                Your daily allowances · ")}{input.currency}
              </summary>
              <p className="mt-2 text-xs leading-6 text-gray-600">
                {uiCopy("\n                Per person. Accommodation is per night; food and transport per\n                day. Leave any amount open. These are your allowances, not\n                checked room or activity prices.\n              ")}</p>
              <label className="mt-3 block text-sm" htmlFor={`${id}-currency`}>
                {uiCopy("\n                Currency\n                ")}<select
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
                    <option value={c} key={c}>{c}</option>
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
                    {uiCopy(c.label)} {uiCopy(" allowance (")}{input.currency})
                    <input
                      id={`${id}-allowance-${c.id}`}
                      type="number"
                      min={0}
                      max={10000}
                      step={1}
                      className={`${field} mt-1`}
                      placeholder={uiCopy("Open")}
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
                {uiCopy("\n                Activities allowance is\n                ")}<select
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
                  <option value="day">{uiCopy("Per day, across all activities")}</option>
                  <option value="experience">{uiCopy("Per planned experience")}</option>
                </select>
              </label>
              <p className="mt-2 text-xs leading-6 text-gray-600">
                {uiCopy("\n                Changing currency keeps the numbers; it does not convert them.\n                Per-experience allowances reserve for each planned outing,\n                including walks that may have no entry charge. Check actual\n                prices separately.\n              ")}</p>
            </details>
            <details className="rounded-2xl border border-emerald-100 p-4">
              <summary className="min-h-11 cursor-pointer font-semibold text-emerald-900">
                {uiCopy("\n                Your bird choices · ")}{input.birdIds.length}
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
                {uiCopy("\n                What else belongs in your trip?\n              ")}</legend>
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
                      {uiCopy(c.label)}
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
              {uiCopy("\n              Include sanctuary and managed conservation encounters, labelled\n              separately from wild outings\n            ")}</label>
            <button
              type="button"
              className={`${button} bg-emerald-800 text-white hover:bg-emerald-900`}
              disabled={!validTripInput(input)}
              onClick={generate}
            >
              {draft ? uiCopy("Update my suggestions") : uiCopy("Suggest my itineraries")}
            </button>
            <p className="text-xs leading-6 text-gray-600">
              {uiCopy("\n              A planning draft built from documented bird/site links, not live\n              sightings.")}{" "}
              {context.corridor ? uiCopy("This pilot runs Auckland to Hamilton to Rotorua in 3 to 7 days. Short transfers allow one reviewed local outing on arrival. Final city is not a confirmed flight connection.") : uiCopy("Transfers get their own day.")}{" "}
              {uiCopy("\n              Road times, within-base travel, track access, season, prices and\n              availability need checking. Longer outings may replace that day’s\n              birding.\n            ")}</p>
          </div>
          <div className="rounded-3xl border border-emerald-200 bg-white p-5 text-sm leading-6">
            <h3 className="font-semibold text-emerald-950">
              {uiCopy("\n              Your route on the map\n            ")}</h3>
            <p className="mt-2">
              {uiCopy("\n              Planning bases and your itinerary share the explorer above. The\n              itinerary layer shows base order, not roads or confirmed travel\n              times.\n            ")}</p>
            <a
              onClick={() => {
                if (context.corridor)
                  updateMapLayers({
                    background: "satellite",
                    itinerary: true,
                    planning: true,
                  });
              }}
              href={context.mapAnchor}
              className="mt-3 inline-flex min-h-11 items-center rounded font-semibold text-emerald-800 underline"
            >
              {uiCopy("\n              View your itinerary on the map\n            ")}</a>
          </div>
        </div>
        <p role="status" className="mt-5 text-sm leading-6 text-emerald-900">
          {uiCopy(notice)}
        </p>
        <div ref={output} className="scroll-mt-28">
          {draft && (
            <div className="mt-8 space-y-5">
              {alternatives.length > 0 && (
                <div
                  aria-label={uiCopy("Compare itinerary suggestions")}
                  className="grid gap-3 md:grid-cols-3"
                >
                  {alternatives.map((option) => {
                    const c = tripCoverage(option.draft);
                    const pace = tripWorkloadSummary(option.draft);
                    return (
                      <button
                        key={option.id}
                        type="button"
                        aria-pressed={draft.style === option.id}
                        disabled={dirty}
                        className="min-h-24 rounded-2xl border border-emerald-200 bg-white p-4 text-left text-emerald-950 aria-pressed:border-emerald-800 aria-pressed:bg-emerald-100 disabled:opacity-50"
                        onClick={() => {
                          tripMap?.stopJourney();
                          setDraft(option.draft);
                          setNotice(
                            "Suggestion selected. Daily changes apply to this draft.",
                          );
                        }}
                      >
                        <span className="block font-semibold">
                          {uiCopy(option.label)}
                        </span>
                        <span className="mt-2 block text-xs leading-6">
                          {uiCopy("\n                          Known driving references:")}{" "}
                          {Math.floor(pace.knownDrivingMinutes / 60)} h{" "}
                          {pace.knownDrivingMinutes % 60} {uiCopy(" min ·")}{" "}
                          {pace.unknownTransfers} {uiCopy(" transfers without reviewed\n                          times\n                          ")}{pace.abovePreference
                            ? uiCopy(" · {count} above your driving preference",{count:pace.abovePreference})
                            : ""}
                          {uiCopy("\n                          . Local travel and breaks additional.\n                        ")}</span>
                        <span className="mt-2 block text-xs leading-6">
                          {new Set(option.draft.days.map((d) => d.baseId)).size}{" "}
                          {uiCopy("\n                          bases ·")}{" "}
                          {
                            option.draft.days.filter((d) => d.transferFrom)
                              .length
                          }{" "}
                          transfer{" "}
                          {option.draft.days.filter((d) => d.transferFrom)
                            .length === 1 ? uiCopy("day") : uiCopy("days")}{" "}
                          · {c.covered.length}/
                          {option.draft.input.birdIds.length} {uiCopy(" bird wishes linked\n                        ")}</span>
                      </button>
                    );
                  })}
                </div>
              )}
              {alternatives.length === 1 && (
                <p className="text-sm text-gray-600">
                  {uiCopy("\n                  One distinct route fits this set of choices. More days, a\n                  wider area or different interests may produce more\n                  alternatives.\n                ")}</p>
              )}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-medium text-emerald-950">
                    {uiCopy("Your {days} day draft",{days:draft.input.days})}</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {draft.input.days - 1} overnight
                    {draft.input.days === 2 ? "" : "s"} ·{" "}
                    {activeBases
                      .map((id) => tripAreaById.get(id)?.name)
                      .join(" → ")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={context.mapAnchor}
                    className={button}
                    aria-disabled={dirty}
                    onClick={(event) => {
                      if (dirty) {
                        event.preventDefault();
                        return;
                      }
                      tripMap?.startJourney(
                        context.id,
                        buildTripJourney(draft, tripAreas, tripPlaces),
                      );
                      updateMapLayers({
                        planning: true,
                        itinerary: true,
                        background: "satellite",
                      });
                    }}
                  >
                    {uiCopy("\n                    Preview your journey step by step\n                  ")}</a>
                  <button
                    type="button"
                    className={button}
                    disabled={dirty||privateBusy}
                    onClick={carry}
                  >
                    {onSave ? uiCopy(privateBusy?"Saving…":"Save editable itinerary") : uiCopy("\n                    Review and save in My Trips\n                  ")}</button>
                </div>
              </div>
              <p className="text-sm leading-6 text-emerald-900">
                {uiCopy("\n                Start:")}{" "}
                {gatewayById.get(draft.input.startCity)?.name || uiCopy("Open to suggestions")}{" "}
                {uiCopy("\n                · Finish:")}{" "}
                {gatewayById.get(draft.input.endCity)?.name || uiCopy("Open to suggestions")}
                {draft.input.departureDate
                  ? uiCopy(" · Depart {date}",{date:draft.input.departureDate})
                  : ""}
                .
              </p>
              <TripAllowanceSummary draft={draft} />
              <TripPriceReview draft={draft} />
              {roads && roads.total > 0 && (
                <p className="text-sm leading-6 text-emerald-900">
                  {roads.total} transfer {roads.total === 1 ? uiCopy("day") : uiCopy("days")} ·{" "}
                  {roads.reviewed} {uiCopy(" with published road references ·")}{" "}
                  {roads.unknown} {uiCopy(" awaiting road-time review\n                  ")}{roads.long ? uiCopy(" · {count} long driving references",{count:roads.long}) : ""}
                  {uiCopy("\n                  . References do not confirm an entire route's feasibility.\n                ")}</p>
              )}
              {dirty && (
                <p
                  role="alert"
                  className="rounded-xl bg-amber-50 p-4 text-sm text-amber-950"
                >
                  {uiCopy("\n                  Your choices changed. Rebuild before carrying this itinerary\n                  to your private brief.\n                ")}</p>
              )}
              <p className="text-sm leading-6 text-emerald-900">
                {coverage!.covered.length} of {draft.input.birdIds.length} {uiCopy(" bird\n                wishes linked to scheduled, sourced opportunities. This is\n                coverage of your choices, not the chance of a sighting.\n              ")}</p>
              {coverage!.unmatched.length > 0 && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <h4 className="font-semibold text-amber-950">
                    {uiCopy("\n                    Still needs a suitable site or more days\n                  ")}</h4>
                  <p className="mt-2 text-sm leading-6">
                    {coverage!.unmatched.map(nzBirdName).join(", ")}{uiCopy(". These\n                    birds have no scheduled sourced stop in this draft. They may\n                    need another region, season, guide or more catalogue\n                    research.\n                  ")}</p>
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
                  {uiCopy("\n                  Copy or review the complete itinerary text\n                ")}</summary>
                <textarea
                  aria-label={uiCopy("Itinerary text to copy")}
                  readOnly
                  value={dirty ? uiCopy("Your choices changed. Rebuild before copying this itinerary.") : tripDraftText(draft)}
                  rows={10}
                  className={`${field} mt-3 font-mono text-xs`}
                />
                <button
                  type="button"
                  className={`${button} mt-3`}
                  onClick={copy}
                  disabled={dirty}
                >
                  {uiCopy("\n                  Copy itinerary\n                ")}</button>
              </details>
              <p className="text-xs leading-6 text-gray-600">
                {uiCopy("\n                Your choices, date and allowances use this tab for up to one\n                day; they are not sent to booking platforms. In My Trips, choose\n                Add Itinerary to Notes, review and Save My Draft. Saving and\n                sharing are separate steps. This does not book travel.\n              ")}</p>
              <section aria-label={uiCopy("From draft to personal quote")} className="rounded-xl border border-emerald-200 bg-white p-4 text-sm leading-6">
                <h4 className="font-semibold text-emerald-950">{uiCopy("From your draft to a personal quote")}</h4>
                <ol className="mt-2 list-decimal space-y-2 pl-5">
                  <li>{uiCopy("Review your itinerary and carry it to your private brief in My Trips.")}</li>
                  <li>{uiCopy("Save your draft, then submit an enquiry when you are ready for a personal quote.")}</li>
                  <li>{uiCopy("Review the proposed services, complete price, availability and terms before accepting any arrangement.")}</li>
                </ol>
                <p className="mt-2">{uiCopy("Your allowances are your spending preferences. Published reference prices are dated comparisons. A saved draft or submitted enquiry is not a reservation or a confirmed booking.")}</p>
              </section>
            </div>
          )}
        </div>
        <RouteReading />
        <TripCatalogue
          key={context.corridor ? selectedMapBase?.id : input.areaId}
          areaId={
            context.corridor && tripAreaById.has(selectedMapBase?.id || "")
              ? selectedMapBase!.id
              : input.areaId
          }
        />
      </div>
    </section>
  );
}
