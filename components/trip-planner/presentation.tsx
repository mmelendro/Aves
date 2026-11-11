import type { TripPlace } from "@/lib/south-island-trip-planner";

/** Shared field, button and source-link presentation for the regional planner. */
export const field =
  "min-h-11 w-full min-w-0 rounded-xl border border-emerald-200 bg-white px-3 py-2 text-sm text-emerald-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700";
export const button =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-emerald-300 px-4 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:opacity-50";
export const external = { target: "_blank", rel: "noreferrer" } as const;
export function SourceLink({ place }: { place: TripPlace }) {
  return (
    <a
      href={place.url}
      {...external}
      className="inline-flex min-h-11 items-center text-sm font-semibold text-emerald-800 underline underline-offset-4"
    >
      Visitor information & source
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
