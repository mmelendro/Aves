"use client";
import { useIslandPlanner } from "./island-planner-context";

import type { TripDraft } from "@/lib/south-island-trip-planner";

/** Partial comparisons never turn a published starting rate into a priced trip. */
export default function TripPriceReview({ draft }: { draft: TripDraft }) {
  const { prices } = useIslandPlanner();
  const { priceReviewRows, comparisonLabel } = prices;
  const result = priceReviewRows(draft),
    money = (n: number) =>
      new Intl.NumberFormat("en", {
        style: "currency",
        currency: draft.input.currency,
        maximumFractionDigits: 2,
      }).format(n);
  return (
    <section
      aria-label="Published price comparisons"
      className="rounded-2xl border border-emerald-200 bg-white p-5"
    >
      <details className="mt-2">
        <summary className="min-h-11 cursor-pointer font-semibold text-emerald-950">
          Compare references with your allowances
        </summary>
        <p className="mt-2 text-sm leading-6">
          {result.reviewed} of {result.selected} selected stay/outing costs have
          comparable published references. Adult costs only ·{" "}
          {draft.input.adults ?? 1}{" "}
          {draft.input.adults === 1 ? "adult" : "adults"} ·{" "}
          {draft.input.rooms ?? 1}{" "}
          {draft.input.rooms === 1 ? "room/unit" : "rooms/units"}.
        </p>
        <p className="mt-2 text-xs leading-6 text-gray-600">
          Starting prices and general tariffs are not quotes for your dates.
          Food, transport, extras and unpriced items remain open. A reference
          below your allowance does not confirm affordability or availability.
          Only NZD references are currently compared; other currencies require a
          quote. Daily activity subtotals include the optional alternative;
          choose one outing if it replaces the other.
        </p>
        <p className="mt-2 text-xs leading-6 text-gray-600">
          Stays compare per night. Outings compare{" "}
          {draft.input.activityBasis === "day"
            ? "the known daily subtotal"
            : "each planned experience"}
          .
        </p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">
              Partial per-person price reference comparisons
            </caption>
            <thead>
              <tr>
                <th className="p-2">Day / category</th>
                <th className="p-2">Reference per person</th>
                <th className="p-2">Your allowance</th>
                <th className="p-2">Review</th>
              </tr>
            </thead>
            <tbody>
              {result.rows.map((row, i) => (
                <tr key={i}>
                  <th className="p-2 font-medium">
                    {row.day} ·{" "}
                    {row.category === "accommodation" ? "Stay" : "Outings"}
                    <span className="mt-1 block text-xs font-normal text-gray-600">
                      {row.label}
                    </span>
                  </th>
                  <td className="p-2">
                    {row.low === null
                      ? "Unknown"
                      : `${money(row.low)}${row.high !== row.low ? `–${money(row.high!)}` : ""}`}
                  </td>
                  <td className="p-2">
                    {row.allowance === undefined
                      ? "Open"
                      : money(row.allowance)}
                  </td>
                  <td className="p-2">
                    <span
                      className={
                        row.low !== null &&
                        row.allowance !== undefined &&
                        row.low > row.allowance
                          ? "font-medium text-amber-900"
                          : "text-gray-700"
                      }
                    >
                      {comparisonLabel(row)}
                    </span>
                    {row.unknown > 0 && (
                      <span className="mt-1 block text-xs">
                        {row.unknown} unpriced item
                        {row.unknown === 1 ? "" : "s"} · {row.reason}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}
