import {
  priceByPlace,
  priceDateIssue,
} from "@/lib/south-island-price-references";
import { external } from "./presentation";

/** Shows the named product and original unit before any budget arithmetic. */
export default function TripPriceReference({
  placeId,
  date = "",
}: {
  placeId: string;
  date?: string;
}) {
  const ref = priceByPlace.get(placeId);
  if (!ref) return null;
  const unit =
    ref.basis === "room-night"
      ? "per room / night, up to two adults"
      : ref.basis === "adult-entry"
        ? "per adult entry"
        : "property-wide range; quote required";
  const issue = priceDateIssue(placeId, date);
  return (
    <>
      {issue && (
        <p className="my-2 rounded-xl bg-amber-50 p-3 text-xs font-medium leading-6 text-amber-950">
          Price / access check: {issue}. Choose another day or confirm
          arrangements with the operator.
        </p>
      )}
      <details className="my-2 rounded-xl border border-emerald-100 p-3 text-xs leading-6 text-gray-600">
        <summary className="min-h-11 cursor-pointer font-semibold text-emerald-900">
          Published price reference · NZ${ref.low}
          {ref.high !== ref.low ? `–${ref.high}` : ""}
        </summary>
        <p>
          {ref.product} · {unit}
          {ref.fromPrice ? " · starting-price reference" : ""}.
        </p>
        <p>{ref.conditions}</p>
        <p>
          Reviewed {ref.reviewedAt}
          {ref.validUntil ? ` · published tariff ends ${ref.validUntil}` : ""}.
          Your dates, fees and availability still need checking.
        </p>
        <a
          className="inline-flex min-h-11 items-center font-semibold text-emerald-800 underline"
          href={ref.url}
          {...external}
        >
          Read price source
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </details>
    </>
  );
}
