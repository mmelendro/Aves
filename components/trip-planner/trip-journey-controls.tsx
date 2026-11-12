"use client";
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
            {step.title}
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
        {step.note}
      </p>
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2">
        <button
          type="button"
          className={button}
          disabled={journey.index === 0}
          onClick={() => trip?.goToStep(journey.index - 1)}
        >
          Previous step
        </button>
        <label className="order-first col-span-2 min-w-0 text-xs sm:order-none sm:col-span-1">
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
        Map highlight: {step.baseName}, a broad town reference. Bird photographs
        follow sourced local opportunities, never guaranteed sightings. Exact
        airports and properties still need reviewed coordinates.
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
