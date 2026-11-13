"use client";
import {useUiCopy} from "@/components/ui-language"
import GoogleMapsActions from "../google-maps-actions";
import { useIslandPlanner } from "./island-planner-context";
import type { TripPlace } from "@/lib/south-island-trip-planner";

/** Shared field, button and source-link presentation for the regional planner. */
export const field =
  "min-h-11 w-full min-w-0 rounded-xl border border-emerald-200 bg-white px-3 py-2 text-sm text-emerald-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700";
export const button =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-emerald-300 px-4 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:opacity-50";
export const external = { target: "_blank", rel: "noreferrer" } as const;
export function SourceLink({ place }: { place: TripPlace }) {
 const uiCopy=useUiCopy()

  const { context, tripAreaById } = useIslandPlanner();
  return (
    <div>
      <a
        href={place.url}
        {...external}
        className="inline-flex min-h-11 items-center text-sm font-semibold text-emerald-800 underline underline-offset-4"
      >
        {uiCopy("\n        Visitor information & source\n        ")}<span className="sr-only"> {uiCopy(" (opens in a new tab)")}</span>
      </a>
      <details>
        <summary className="min-h-11 cursor-pointer content-center rounded text-xs font-semibold text-emerald-800 underline">
          {uiCopy("\n          Directions & business lookup\n        ")}</summary>
        <GoogleMapsActions
          query={`${place.name}, ${tripAreaById.get(place.base)?.name || context.name}, New Zealand`}
        />
      </details>
    </div>
  );
}

/** Scoped walking references never imply a complete activity or day duration. */
export function VisitReference({ place }: { place: TripPlace }) {
 const uiCopy=useUiCopy()

  const reference = place.visitReference;
  if (!reference) return null;
  return (
    <p className="mt-2 text-xs leading-6 text-gray-600">
      {uiCopy("\n      Published walking reference: about ")}{reference.minutes} {uiCopy(" minutes for")}{" "}
      {reference.scope}{uiCopy(". Local travel, birding and breaks are additional.")}{" "}
      <a
        href={reference.url}
        {...external}
        className="font-semibold text-emerald-800 underline"
      >
        {uiCopy("\n        Walking source, reviewed ")}{reference.reviewedAt}
        <span className="sr-only"> {uiCopy(" (opens in a new tab)")}</span>
      </a>
    </p>
  );
}
