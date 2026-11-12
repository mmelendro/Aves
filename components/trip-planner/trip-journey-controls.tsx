"use client";
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
  const trip = useTripMap(),
    { update } = useMapLayers();
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
      aria-label="Your journey step by step"
      className="mb-6 rounded-2xl border border-emerald-200 bg-white p-4 sm:p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
            Day {step.day} · {step.kind}
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
          Explore freely
        </button>
      </div>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
        {step.mapPoint && (step.kind==="arrival" || step.kind==="departure") ? "Confirm your flight details and timing. The map highlights the selected airport area." : step.note}
      </p>
      {arrivalReferences(step.baseId,step.kind).length>0&&<label className="mt-3 block text-sm text-emerald-950">Arrival / departure map reference
        <select className={field} value={step.mapPoint?.id??""} onChange={e=>trip?.selectArrivalReference(e.target.value)}>
          <option value="">Town reference · arrival still to choose</option>
          {arrivalReferences(step.baseId,step.kind).map(p=><option key={p.id} value={p.id}>{p.name} · only if using this airport</option>)}
        </select>
      </label>}
      <div className="mt-3 grid grid-cols-2 items-center gap-2">
        <button
          type="button"
          className={button}
          disabled={journey.index === 0}
          onClick={() => trip?.goToStep(journey.index - 1)}
        >
          Previous step
        </button>
        <label className="order-first col-span-2 min-w-0 text-xs">
          <span className="sr-only">Journey step</span>
          <select
            className={field}
            aria-label="Journey step"
            value={journey.index}
            onChange={(e) => trip?.goToStep(Number(e.target.value))}
          >
            {journey.steps.map((s, i) => (
              <option key={s.id} value={i}>
                {i + 1}/{journey.steps.length} · Day {s.day} · {s.title}
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
          Next step
        </button>
      </div>
      <p className="mt-3 text-xs leading-5 text-gray-500">
        Map highlight: {step.mapPoint ? <>{step.mapPoint.name}. {step.mapPoint.scope} Reviewed {step.mapPoint.reviewedAt}. <a href={step.mapPoint.sourceUrl} {...external} className="underline">Location source</a> · <a href={step.mapPoint.coordinateSourceUrl} {...external} className="underline">Coordinate source</a></> : <>{step.baseName}, a broad town reference. Exact points have not been reviewed for this step.</>}
        {" "}Bird photographs follow sourced opportunities around the planning base, not a checklist for an airport or property.
      </p>
      <details className="mt-2">
        <summary className="min-h-11 cursor-pointer content-center text-sm font-semibold text-emerald-800">
          Places and activities around {step.baseName}
        </summary>
        <ul
          aria-label={`Ideas around ${step.baseName}`}
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
                Visitor source
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </details>
      <a
        className="inline-flex min-h-11 items-center text-sm font-semibold text-emerald-800 underline"
        href="#trip-planner"
      >
        Return to your editable days
      </a>
    </section>
  );
}

/** Compact navigation lives in the shared guide toolbar on narrow layouts. */
export function TripJourneyMapNavigation({ islandId }: { islandId: string }) {
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
      aria-label="Map journey navigation"
      className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 lg:hidden"
    >
      <button
        type="button"
        className={button}
        aria-label="Previous map step"
        disabled={journey.index === 0}
        onClick={() => go(journey.index - 1)}
      >
        Previous
      </button>
      <p className="min-w-0 truncate text-center text-xs font-semibold text-emerald-950">
        {journey.index + 1}/{journey.steps.length} · {step.title}
      </p>
      <button
        type="button"
        className={button}
        aria-label="Next map step"
        disabled={journey.index === journey.steps.length - 1}
        onClick={() => go(journey.index + 1)}
      >
        Next
      </button>
    </div>
  );
}
