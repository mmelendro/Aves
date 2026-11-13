"use client";
import {useUiCopy} from "@/components/ui-language"
import { useIslandPlanner } from "./island-planner-context";

import type { TripDraft } from "@/lib/south-island-trip-planner";

/** Partial comparisons never turn a published starting rate into a priced trip. */
export default function TripPriceReview({ draft }: { draft: TripDraft }) {
 const uiCopy=useUiCopy()

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
      aria-label={uiCopy("Published price comparisons")}
      className="rounded-2xl border border-emerald-200 bg-white p-5"
    >
      <details className="mt-2">
        <summary className="min-h-11 cursor-pointer font-semibold text-emerald-950">
          {uiCopy("\n          Compare references with your allowances\n        ")}</summary>
        <p className="mt-2 text-sm leading-6">
          {result.reviewed} of {result.selected} {uiCopy(" candidate stay/outing costs have\n          comparable published references. Adult costs only ·")}{" "}
          {draft.input.adults ?? 1}{" "}
          {draft.input.adults === 1 ? uiCopy("adult") : uiCopy("adults")} ·{" "}
          {draft.input.rooms ?? 1}{" "}
          {draft.input.rooms === 1 ? uiCopy("room/unit") : uiCopy("rooms/units")}.
        </p>
        <p className="mt-2 text-xs leading-6 text-gray-600">
          {uiCopy("\n          Starting prices and general tariffs are not quotes for your dates.\n          Food, transport, extras and unpriced items remain open. A reference\n          below your allowance does not confirm affordability or availability.\n          Only NZD references are currently compared; other currencies require a\n          quote. Primary and alternative outings are separate options. They are\n          compared individually against your allowance and are never added into\n          a combined trip price.\n        ")}</p>
        <p className="mt-2 text-xs leading-6 text-gray-600">
          {uiCopy("\n          Stays compare per night. Outings compare")}{" "}
          {draft.input.activityBasis === "day" ? uiCopy("each outing option against your daily allowance") : uiCopy("each planned experience")}
          .
        </p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">
              {uiCopy("\n              Partial per-person price reference comparisons\n            ")}</caption>
            <thead>
              <tr>
                <th className="p-2">{uiCopy("Day / category")}</th>
                <th className="p-2">{uiCopy("Reference per person")}</th>
                <th className="p-2">{uiCopy("Your allowance")}</th>
                <th className="p-2">{uiCopy("Review")}</th>
              </tr>
            </thead>
            <tbody>
              {result.rows.map((row, i) => (
                <tr key={i}>
                  <th className="p-2 font-medium">
                    {row.day} ·{" "}
                    {row.category === "accommodation" ? uiCopy("Stay") : uiCopy("Outings")}
                    <span className="mt-1 block text-xs font-normal text-gray-600">
                      {uiCopy(row.label)}
                    </span>
                  </th>
                  <td className="p-2">
                    {row.low === null ? uiCopy("Unknown") : `${money(row.low)}${row.high !== row.low ? `–${money(row.high!)}` : ""}`}
                  </td>
                  <td className="p-2">
                    {row.allowance === undefined ? uiCopy("Open") : money(row.allowance)}
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
                      {uiCopy(comparisonLabel(row))}
                    </span>
                    {row.unknown > 0 && (
                      <span className="mt-1 block text-xs">
                        {row.unknown} {uiCopy(" unpriced item\n                        ")}{row.unknown === 1 ? "" : "s"} · {uiCopy(row.reason)}
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
