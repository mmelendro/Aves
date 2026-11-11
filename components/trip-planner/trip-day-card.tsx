import {
  airbnbAreaUrl,
  gatewayById,
  marketFitsDay,
  placesAt,
  tripAreaById,
  tripDayDate,
  tripPlaceById,
  tripTransferUrl,
  type TripDay,
  type TripDraft,
} from "@/lib/south-island-trip-planner";
import { nzBirdName } from "@/content/new-zealand-checklist";
import { external, field, SourceLink } from "./presentation";

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
  const day = draft.days[index];
  const base = tripAreaById.get(day.baseId)!,
    local = placesAt(day.baseId),
    stop = tripPlaceById.get(day.birdingId),
    extra = tripPlaceById.get(day.extraId),
    stay = tripPlaceById.get(day.stayId);
  const birdStops = local.filter(
    (p) =>
      p.categories.includes("birding") &&
      (draft.input.includeManaged || p.encounter === "wild"),
  );
  return (
    <article
      aria-label={`Itinerary day ${index + 1}`}
      className="min-w-0 space-y-3 rounded-2xl border border-emerald-200 bg-white p-5"
    >
      <h4 className="text-lg font-semibold text-emerald-950">
        Day {index + 1} · {base.name}
        {tripDayDate(draft.input, index)
          ? ` · ${tripDayDate(draft.input, index)}`
          : ""}
      </h4>
      {day.transferFrom ? (
        <>
          <p className="text-sm leading-6">
            Transfer from {tripAreaById.get(day.transferFrom)?.name}. Keep this
            day for travel, breaks and checking in.
          </p>
          <a
            className="inline-flex min-h-11 items-center text-sm font-semibold text-emerald-800 underline"
            href={tripTransferUrl(draft, index)}
            {...external}
          >
            Check this transfer in Google Maps
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </>
      ) : index === draft.days.length - 1 &&
        draft.input.endCity !== "flexible" ? (
        <p className="text-sm leading-6">
          Departure day in {gatewayById.get(draft.input.endCity)?.name}. Keep
          time for local travel and your departure arrangements; flight, ferry
          and check-in times must be checked separately.
        </p>
      ) : (
        <>
          <label
            className="block text-sm font-medium"
            htmlFor={`${id}-bird-${index}`}
          >
            Birding or nature outing
            <select
              className={`${field} mt-1`}
              id={`${id}-bird-${index}`}
              value={day.birdingId}
              onChange={(e) =>
                onChange({
                  birdingId: e.target.value,
                  extraId: day.extraId === e.target.value ? "" : day.extraId,
                })
              }
            >
              <option value="">Leave open / local research day</option>
              {birdStops.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          {stop && (
            <div className="text-sm leading-6">
              <p>{stop.description}</p>
              <p className="mt-1 font-medium text-emerald-800">
                {stop.encounter !== "wild" ? "Conservation encounter · " : ""}
                {stop.birdIds
                  .filter((id) => draft.input.birdIds.includes(id))
                  .map(nzBirdName)
                  .join(", ") || "Documented local bird opportunities"}
              </p>
              {stop.access && (
                <p className="mt-1 text-xs text-gray-600">{stop.access}</p>
              )}
              <SourceLink place={stop} />
            </div>
          )}
          <label
            className="block text-sm font-medium"
            htmlFor={`${id}-extra-${index}`}
          >
            Food, market or optional alternative
            <select
              className={`${field} mt-1`}
              id={`${id}-extra-${index}`}
              value={day.extraId}
              onChange={(e) => onChange({ extraId: e.target.value })}
            >
              <option value="">Keep time free</option>
              {local
                .filter(
                  (p) =>
                    !p.categories.includes("stays") &&
                    !p.categories.includes("birding"),
                )
                .map((p) => (
                  <option
                    key={p.id}
                    value={p.id}
                    disabled={!marketFitsDay(p, draft.input, index)}
                  >
                    {p.name}
                    {p.categories.includes("markets") &&
                    !marketFitsDay(p, draft.input, index)
                      ? " · needs a matching date"
                      : ""}
                  </option>
                ))}
            </select>
          </label>
          {extra && (
            <div className="text-sm leading-6">
              <p>{extra.description}</p>
              {extra.when && (
                <p className="mt-1 text-xs font-medium text-amber-900">
                  Date dependent: {extra.when}
                </p>
              )}
              {extra.access && (
                <p className="mt-1 text-xs text-gray-600">{extra.access}</p>
              )}
              {extra.categories.some((c) =>
                ["adventures", "ecotourism", "hikes"].includes(c),
              ) && (
                <p className="mt-1 text-xs text-gray-600">
                  Consider this instead of the main outing if travel or activity
                  time requires a full day.
                </p>
              )}
              <SourceLink place={extra} />
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
            Stay after day {index + 1}
            <select
              className={`${field} mt-1`}
              id={`${id}-stay-${index}`}
              value={day.stayId}
              onChange={(e) => onChange({ stayId: e.target.value })}
            >
              <option value="">Choose accommodation later</option>
              <option value={`airbnb:${base.id}`}>
                Airbnb home near {base.name} · listing to choose
              </option>
              {local
                .filter((p) => p.categories.includes("stays"))
                .map((p) => (
                  <option key={p.id} value={p.id}>
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
                  Operator evidence: {stay.eco.note}
                </p>
              )}
              <SourceLink place={stay} />
            </div>
          )}
          <a
            href={airbnbAreaUrl(base.id)}
            {...external}
            className="inline-flex min-h-11 items-center text-sm font-semibold text-emerald-800 underline"
          >
            Find Airbnb homes near this base
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <p className="text-xs leading-5 text-gray-600">
            A location search, not a reviewed listing or eco filter. Choose a
            property and add its link in your private brief. Check exact
            location, total cost, host claims and availability.
          </p>
        </>
      ) : (
        <p className="text-sm text-gray-600">
          Final day · no overnight included.
        </p>
      )}
    </article>
  );
}
