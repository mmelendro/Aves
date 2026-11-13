"use client";
import {useUiCopy} from "@/components/ui-language"
import { useIslandPlanner } from "./island-planner-context";
import TripPriceReference from "./trip-price-reference";
import { type TripDay, type TripDraft } from "@/lib/island-planning-types";

import { nzBirdName } from "@/content/new-zealand-checklist";
import { external, field, SourceLink, VisitReference } from "./presentation";

/** One editable itinerary day; transfers and the fixed departure day stay unscheduled. */
export default function TripDayCard({
  id,
  draft,
  index,
  onChange,
}: {
  id: string;
  draft: TripDraft;
  index: number;
  onChange: (patch: Partial<TripDay>) => void;
}) {
 const uiCopy=useUiCopy()

  const {
    context,
    canScheduleDay,
    airbnbAreaUrl,
    gatewayById,
    placeFitsCalendar,
    placesAt,
    tripAreaById,
    tripDayDate,
    tripPlaceById,
    tripTransferUrl,
    tripTransferContext,
    tripDayWorkload,
    roads,
  } = useIslandPlanner();
  const { roadReferenceData, roadTimeLabel } = roads;
  const day = draft.days[index];
  const journey = tripTransferContext(draft, index);
  const workload = tripDayWorkload(draft, index);
  const base = tripAreaById.get(day.baseId)!,
    local = placesAt(day.baseId),
    stop = tripPlaceById.get(day.birdingId),
    extra = tripPlaceById.get(day.extraId),
    stay = tripPlaceById.get(day.stayId);
  const arrival = Boolean(context.corridor && day.transferFrom);
  const birdStops = local.filter(
    (p) =>
      p.categories.includes("birding") &&
      (!arrival || p.shortTransferStop) &&
      (p.id === day.birdingId || placeFitsCalendar(p, draft.input, index)) &&
      (draft.input.includeManaged || p.encounter === "wild"),
  );
  return (
    <article
      aria-label={uiCopy("Itinerary day {day}",{day:index+1})}
      className="min-w-0 space-y-3 rounded-2xl border border-emerald-200 bg-white p-5"
    >
      <h4 className="text-lg font-semibold text-emerald-950">
        {uiCopy("\n        Day ")}{index + 1} · {base.name}
        {tripDayDate(draft.input, index)
          ? ` · ${tripDayDate(draft.input, index)}`
          : ""}
      </h4>
      {(index === 0 || index === draft.days.length - 1) && (
        <div className="space-y-2 rounded-xl border border-amber-100 bg-amber-50/50 p-3 text-sm leading-6 text-emerald-950">
          {index === 0 && <p>{uiCopy("Arrival timing is open. Check your actual arrival, local travel and rest before committing to this day’s outings.")}</p>}
          {index === draft.days.length - 1 && <p>{uiCopy("Departure timing is open. Allow for onward travel, check-in and returning transport before keeping this day’s outing.")}</p>}
        </div>
      )}
      <details className="rounded-xl border border-emerald-100 p-3">
        <summary className="min-h-11 cursor-pointer font-medium text-emerald-950">
          {uiCopy("\n          Daily pace review · ")}{uiCopy(workload.label)}
        </summary>
        {workload.abovePreference && (
          <p className="mt-2 font-semibold text-amber-900">
            {uiCopy("\n            Driving reference above your preference\n          ")}</p>
        )}
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-gray-600">
          {workload.notes.map((note) => (
            <li key={note}>{uiCopy(note)}</li>
          ))}
        </ul>
      </details>
      {day.transferFrom && (
        <>
          <p className="text-sm leading-6">
            {uiCopy("\n            Transfer from ")}{tripAreaById.get(day.transferFrom)?.name}.{" "}
            {context.corridor ? uiCopy("Keep time for travel, breaks and one optional short outing.") : uiCopy("Keep this day for travel, breaks and checking in.")}
          </p>
          {journey && (
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3 text-sm leading-6">
              <p className="font-medium text-emerald-950">
                {journey.reference ? uiCopy("Published road reference · about {time}",{time:roadTimeLabel(journey.reference.minutes)}) : uiCopy("Road time still needs review")}
              </p>
              <p>
                {journey.from.name} ↔ {journey.to.name}
              </p>
              {journey.reference ? (
                <>
                  <p className="mt-1 text-xs text-gray-600">
                    {journey.reference.publisher} {uiCopy(" · reviewed")}{" "}
                    {journey.reference.reviewedAt}{uiCopy(". Stops:")}{" "}
                    {journey.reference.stopPolicy}.
                  </p>
                  <a
                    className="inline-flex min-h-11 items-center font-semibold text-emerald-800 underline"
                    href={journey.reference.url}
                    {...external}
                  >
                    {uiCopy("\n                    Read journey source\n                    ")}<span className="sr-only"> {uiCopy(" (opens in a new tab)")}</span>
                  </a>
                  {journey.reference.minutes >= 300 && (
                    <p className="font-medium text-amber-900">
                      {uiCopy("\n                      Long driving reference. Consider breaking the journey\n                      overnight or choosing fewer bases.\n                    ")}</p>
                  )}
                </>
              ) : (
                <p className="mt-1 text-xs text-gray-600">
                  {uiCopy("\n                  No reviewed time for these towns yet. Do not assume a direct\n                  or short connection.\n                ")}</p>
              )}
              <p className="mt-1 text-xs text-gray-600">
                {uiCopy("\n                Town references, not exact stay addresses or live traffic.\n                Direction, weather, stops and local travel can change the time.\n              ")}</p>
              <a
                className="inline-flex min-h-11 items-center font-semibold text-emerald-800 underline"
                href={roadReferenceData.conditionsUrl}
                {...external}
              >
                {uiCopy("\n                Check NZTA road conditions\n                ")}<span className="sr-only"> {uiCopy(" (opens in a new tab)")}</span>
              </a>
            </div>
          )}
          <a
            className="inline-flex min-h-11 items-center text-sm font-semibold text-emerald-800 underline"
            href={tripTransferUrl(draft, index)}
            {...external}
          >
            {uiCopy("\n            Check this transfer in Google Maps\n            ")}<span className="sr-only"> {uiCopy(" (opens in a new tab)")}</span>
          </a>
        </>
      )}
      {!canScheduleDay(draft, index) ? (
        !day.transferFrom && (
          <p className="text-sm leading-6">
            {uiCopy("\n            Departure day in ")}{gatewayById.get(draft.input.endCity)?.name}{uiCopy(". Keep\n            time for local travel and your departure arrangements; flight, ferry\n            and check-in times must be checked separately.\n          ")}</p>
        )
      ) : (
        <>
          {arrival && (
            <p className="text-sm leading-6">
              {uiCopy("\n              Choose at most one short local outing after travel, breaks and\n              checking in. Local travel is additional. Keep your onward\n              departure time free.\n            ")}</p>
          )}
          <label
            className="block text-sm font-medium"
            htmlFor={`${id}-bird-${index}`}
          >
            {uiCopy("\n            Birding or nature outing\n            ")}<select
              className={`${field} mt-1`}
              id={`${id}-bird-${index}`}
              value={day.birdingId}
              onChange={(e) =>
                onChange({
                  birdingId: e.target.value,
                  extraId:
                    arrival ||
                    tripPlaceById.get(e.target.value)?.separateDay ||
                    day.extraId === e.target.value
                      ? ""
                      : day.extraId,
                })
              }
            >
              <option value="">{uiCopy("Leave open / local research day")}</option>
              {birdStops.map((p) => (
                <option
                  key={p.id}
                  value={p.id}
                  disabled={!placeFitsCalendar(p, draft.input, index)}
                >
                  {p.name}
                  {!placeFitsCalendar(p, draft.input, index) ? uiCopy(" · review date") : ""}
                </option>
              ))}
            </select>
          </label>
          {stop && (
            <div className="text-sm leading-6">
              <p>{stop.description}</p>
              <p className="mt-1 font-medium text-emerald-800">
                {stop.encounter === "restored-sanctuary" ? uiCopy("Free living restoration sanctuary · ") : stop.encounter === "sanctuary" ? uiCopy("Conservation sanctuary · ") : stop.encounter === "managed" ? uiCopy("Managed or captive encounter · ") : uiCopy("Wild outing · ")}
                {stop.birdIds
                  .filter((id) => draft.input.birdIds.includes(id))
                  .map(nzBirdName)
                  .join(", ") || uiCopy("Documented local bird opportunities")}
              </p>
              {stop.access && (
                <p className="mt-1 text-xs text-gray-600">{stop.access}</p>
              )}
              <VisitReference place={stop} />
              <SourceLink place={stop} />
              <TripPriceReference
                placeId={stop.id}
                date={tripDayDate(draft.input, index)}
              />
            </div>
          )}
          <label
            className="block text-sm font-medium"
            htmlFor={`${id}-extra-${index}`}
          >
            {uiCopy("\n            Food, market or optional alternative\n            ")}<select
              className={`${field} mt-1`}
              id={`${id}-extra-${index}`}
              value={day.extraId}
              onChange={(e) =>
                onChange({
                  extraId: e.target.value,
                  ...(arrival ? { birdingId: "" } : {}),
                })
              }
            >
              <option value="">{uiCopy("Keep time free")}</option>
              {local
                .filter(
                  (p) =>
                    !stop?.separateDay &&
                    (!arrival || p.shortTransferStop) &&
                    !p.categories.includes("stays") &&
                    !p.categories.includes("birding"),
                )
                .map((p) => (
                  <option
                    key={p.id}
                    value={p.id}
                    disabled={!placeFitsCalendar(p, draft.input, index)}
                  >
                    {p.name}
                    {!placeFitsCalendar(p, draft.input, index) ? uiCopy(" · needs a matching date") : ""}
                  </option>
                ))}
            </select>
          </label>
          {extra && (
            <div className="text-sm leading-6">
              <p>{extra.description}</p>
              {extra.when && (
                <p className="mt-1 text-xs font-medium text-amber-900">
                  {uiCopy("\n                  Date dependent: ")}{extra.when}
                </p>
              )}
              {extra.access && (
                <p className="mt-1 text-xs text-gray-600">{extra.access}</p>
              )}
              {extra.categories.some((c) =>
                ["adventures", "ecotourism", "hikes"].includes(c),
              ) && (
                <p className="mt-1 text-xs text-gray-600">
                  {uiCopy("\n                  Consider this instead of the main outing if travel or activity\n                  time requires a full day.\n                ")}</p>
              )}
              <VisitReference place={extra} />
              <SourceLink place={extra} />
              <TripPriceReference
                placeId={extra.id}
                date={tripDayDate(draft.input, index)}
              />
            </div>
          )}
        </>
      )}
      {index < draft.days.length - 1 ? (
        <>
          <label
            className="block text-sm font-medium"
            htmlFor={`${id}-stay-${index}`}
          >
            {uiCopy("\n            Stay after day ")}{index + 1}
            <select
              className={`${field} mt-1`}
              id={`${id}-stay-${index}`}
              value={day.stayId}
              onChange={(e) => onChange({ stayId: e.target.value })}
            >
              <option value="">{uiCopy("Choose accommodation later")}</option>
              <option value={`airbnb:${base.id}`}>
                {uiCopy("\n                Airbnb home near ")}{base.name} {uiCopy(" · listing to choose\n              ")}</option>
              {local
                .filter((p) => p.categories.includes("stays"))
                .map((p) => (
                  <option
                    key={p.id}
                    value={p.id}
                    disabled={!placeFitsCalendar(p, draft.input, index)}
                  >
                    {p.name}
                  </option>
                ))}
            </select>
          </label>
          {stay && (
            <div className="text-sm leading-6">
              <p>{stay.description}</p>
              {stay.eco && (
                <p className="mt-1 text-xs text-emerald-900">
                  {uiCopy("\n                  Operator evidence: ")}{stay.eco.note}
                </p>
              )}
              <SourceLink place={stay} />
              <TripPriceReference
                placeId={stay.id}
                date={tripDayDate(draft.input, index)}
              />
            </div>
          )}
          <a
            href={airbnbAreaUrl(base.id)}
            {...external}
            className="inline-flex min-h-11 items-center text-sm font-semibold text-emerald-800 underline"
          >
            {uiCopy("\n            Find Airbnb homes near this base\n            ")}<span className="sr-only"> {uiCopy(" (opens in a new tab)")}</span>
          </a>
          <p className="text-xs leading-5 text-gray-600">
            {uiCopy("\n            A location search, not a reviewed listing or eco filter. Choose a\n            property and add its link in your private brief. Check exact\n            location, total cost, host claims and availability.\n          ")}</p>
        </>
      ) : (
        <p className="text-sm text-gray-600">
          {uiCopy("\n          Final day · no overnight included.\n        ")}</p>
      )}
    </article>
  );
}
