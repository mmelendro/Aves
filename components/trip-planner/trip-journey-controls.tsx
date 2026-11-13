"use client";
import {useUiCopy} from "@/components/ui-copy-context"
import {arrivalReferences} from "@/lib/journey-reference-points";
import { useEffect } from "react";
import { useTripMap } from "./trip-map-context";
import { useMapLayers } from "../map-layer-context";
import { button, external, field } from "./presentation";
/** The same map stays unobscured. Native navigation works without animation or autoplay. */
export default function TripJourneyControls({
  islandId,
}: {
  islandId: string;
}) {
 const uiCopy=useUiCopy()

  const trip = useTripMap(),
    { update,layers } = useMapLayers();
  const journey = trip?.journey?.islandId === islandId ? trip.journey : null;
  const step = journey?.steps[journey.index];
  useEffect(() => {
    if (step)
      update({
        planning: true,
        itinerary: true,
        point: `planning-base-${step.baseId}`,
        park: "",
      });
  }, [step, update]);
  if (!journey || !step) return null;
  return (
    <section
      aria-label={uiCopy("Your journey step by step")}
      className="mb-6 rounded-2xl border border-emerald-200 bg-white p-4 sm:p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
            {uiCopy("\n            Day ")}{step.day} · {uiCopy(step.kind)}
          </p>
          <h3
            aria-live="polite"
            aria-atomic="true"
            className="mt-2 text-xl font-medium text-emerald-950"
          >
            {step.mapPoint && step.kind!=="overnight" ? step.mapPoint.name : step.title}
          </h3>
        </div>
        <button
          type="button"
          className={button}
          onClick={() => trip?.stopJourney()}
        >
          {uiCopy("\n          Explore freely\n        ")}</button>
      </div>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
        {step.mapPoint && (step.kind==="arrival" || step.kind==="departure") ? uiCopy("Confirm your flight details and timing. The map highlights the selected airport area.") : step.note}
      </p>
      <label className="mt-3 flex min-h-11 items-center gap-2 text-sm text-emerald-950"><input type="checkbox" checked={trip?.journeyMotion??true} onChange={e=>trip?.setJourneyMotion(e.target.checked)}/>{uiCopy("Animate journey transitions")}</label>
      <p className="text-xs leading-5 text-gray-500">{uiCopy("Reduced motion uses static highlights. Steps advance only when you choose. ")}{layers.background!=="satellite"&&"Choose Satellite for geographic location and transfer highlights."}</p>
      {step.kind==="overnight"&&<p role="status" className="mt-2 text-sm text-emerald-900">{uiCopy("Rest overnight, then choose Next step when you are ready. No automatic advance.")}</p>}
      {step.transfer&&<p className="mt-2 text-xs leading-5 text-gray-600">{uiCopy("Illustrated town-to-town sequence, not a road or live location. About ")}{step.transfer.minutes} {uiCopy(" minutes driving reference from ")}{step.transfer.publisher}{uiCopy("; breaks and local travel are additional. ")}<a href={step.transfer.sourceUrl} {...external} className="underline">{uiCopy("Transfer source")}</a></p>}
      {arrivalReferences(step.baseId,step.kind).length>0&&<label className="mt-3 block text-sm text-emerald-950">{uiCopy("Arrival / departure map reference\n        ")}<select className={field} value={step.mapPoint?.id??""} onChange={e=>trip?.selectArrivalReference(e.target.value)}>
          <option value="">{uiCopy("Town reference · arrival still to choose")}</option>
          {arrivalReferences(step.baseId,step.kind).map(p=><option key={p.id} value={p.id}>{p.name} {uiCopy(" · only if using this airport")}</option>)}
        </select>
      </label>}
      <div className="mt-3 grid grid-cols-2 items-center gap-2">
        <button
          type="button"
          className={button}
          disabled={journey.index === 0}
          onClick={() => trip?.goToStep(journey.index - 1)}
        >
          {uiCopy("\n          Previous step\n        ")}</button>
        <label className="order-first col-span-2 min-w-0 text-xs">
          <span className="sr-only">{uiCopy("Journey step")}</span>
          <select
            className={field}
            aria-label={uiCopy("Journey step")}
            value={journey.index}
            onChange={(e) => trip?.goToStep(Number(e.target.value))}
          >
            {journey.steps.map((s, i) => (
              <option key={s.id} value={i}>
                {i + 1}/{journey.steps.length} {uiCopy(" · Day ")}{s.day} · {uiCopy(s.title)}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className={button}
          disabled={journey.index === journey.steps.length - 1}
          onClick={() => trip?.goToStep(journey.index + 1)}
        >
          {uiCopy("\n          Next step\n        ")}</button>
      </div>
      <p className="mt-3 text-xs leading-5 text-gray-500">
        {uiCopy("\n        Map highlight: ")}{step.mapPoint ? <>{step.mapPoint.name}. {step.mapPoint.scope} {uiCopy(" Reviewed ")}{step.mapPoint.reviewedAt}. <a href={step.mapPoint.sourceUrl} {...external} className="underline">{uiCopy("Location source")}</a> · <a href={step.mapPoint.coordinateSourceUrl} {...external} className="underline">{uiCopy("Coordinate source")}</a></> : <>{step.baseName}{uiCopy(", a broad town reference. Exact points have not been reviewed for this step.")}</>}
        {" "}{uiCopy("Bird photographs follow sourced opportunities around the planning base, not a checklist for an airport or property.\n      ")}</p>
      <details className="mt-2">
        <summary className="min-h-11 cursor-pointer content-center text-sm font-semibold text-emerald-800">
          {uiCopy("\n          Places and activities around ")}{step.baseName}
        </summary>
        <ul
          aria-label={uiCopy("Ideas around {place}",{place:step.baseName})}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3"
        >
          {step.places.map((place) => (
            <li
              key={place.id}
              className="w-64 max-w-[85%] shrink-0 snap-start rounded-xl border border-emerald-100 bg-emerald-50/50 p-4"
            >
              <h4 className="font-semibold text-emerald-950">{place.name}</h4>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {place.description}
              </p>
              <a
                className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-emerald-800 underline"
                href={place.url}
                {...external}
              >
                {uiCopy("\n                Visitor source\n                ")}<span className="sr-only"> {uiCopy(" (opens in a new tab)")}</span>
              </a>
            </li>
          ))}
        </ul>
      </details>
      <a
        className="inline-flex min-h-11 items-center text-sm font-semibold text-emerald-800 underline"
        href="#trip-planner"
      >
        {uiCopy("\n        Return to your editable days\n      ")}</a>
    </section>
  );
}

/** Compact navigation lives in the shared guide toolbar on narrow layouts. */
export function TripJourneyMapNavigation({ islandId }: { islandId: string }) {
 const uiCopy=useUiCopy()

  const trip = useTripMap();
  const journey = trip?.journey?.islandId === islandId ? trip.journey : null;
  if (!journey) return null;
  const step = journey.steps[journey.index];
  function go(index: number) {
    trip?.goToStep(index);
    document
      .getElementById(`${islandId}-bird-map`)
      ?.scrollIntoView({ block: "start", behavior: "instant" });
  }
  return (
    <div
      role="group"
      aria-label={uiCopy("Map journey navigation")}
      className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 lg:hidden"
    >
      <button
        type="button"
        className={button}
        aria-label={uiCopy("Previous map step")}
        disabled={journey.index === 0}
        onClick={() => go(journey.index - 1)}
      >
        {uiCopy("\n        Previous\n      ")}</button>
      <p className="min-w-0 truncate text-center text-xs font-semibold text-emerald-950">
        {journey.index + 1}/{journey.steps.length} · {uiCopy(step.title)}
      </p>
      <button
        type="button"
        className={button}
        aria-label={uiCopy("Next map step")}
        disabled={journey.index === journey.steps.length - 1}
        onClick={() => go(journey.index + 1)}
      >
        {uiCopy("\n        Next\n      ")}</button>
    </div>
  );
}
