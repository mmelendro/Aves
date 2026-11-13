"use client";
import {useUiCopy} from "@/components/ui-copy-context"
import { useIslandPlanner } from "./island-planner-context";
import { type TripDraft } from "@/lib/island-planning-types";

/** Shows entered allowances, never inferred room rates or affordability claims. */
export default function TripAllowanceSummary({ draft }: { draft: TripDraft }) {
 const uiCopy=useUiCopy()

  const { tripAllowanceSummary } = useIslandPlanner();
  const budget = tripAllowanceSummary(draft);
  if (!budget.rows.length) return null;
  const money = (n: number) =>
    new Intl.NumberFormat("en", {
      style: "currency",
      currency: draft.input.currency,
      maximumFractionDigits: 2,
    }).format(n);
  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5">
      <h4 className="font-semibold text-emerald-950">
        {uiCopy("\n        Your allowance envelope · ")}{money(budget.total)} {uiCopy(" per person\n      ")}</h4>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">
            {uiCopy("\n            User-entered category allowances, not verified travel prices\n          ")}</caption>
          <thead>
            <tr>
              <th className="p-2">{uiCopy("Category")}</th>
              <th className="p-2">{uiCopy("Allowance")}</th>
              <th className="p-2">{uiCopy("Units")}</th>
              <th className="p-2">{uiCopy("Subtotal")}</th>
            </tr>
          </thead>
          <tbody>
            {budget.rows.map((r) => (
              <tr key={r.id}>
                <th className="p-2 font-medium">{uiCopy(r.label)}</th>
                <td className="p-2">{money(r.amount)}</td>
                <td className="p-2">
                  {r.units}{" "}
                  {r.id === "accommodation" ? uiCopy("nights") : r.id === "activities" &&
                        draft.input.activityBasis === "experience" ? uiCopy("outings") : uiCopy("days")}
                </td>
                <td className="p-2">{money(r.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs leading-6 text-gray-600">
        {draft.input.activityBasis === "experience" && uiCopy("An outing allowance counts one primary or alternative outing per day, not both. ")}
        {budget.complete ? uiCopy("All four category allowances are entered.") : uiCopy("This total includes entered categories only; other costs remain open.")}{" "}
        {uiCopy("\n        This is a spending envelope, not a priced proposal. Accommodation,\n        meals, activity charges, transport and connections have not been checked\n        against live prices.\n      ")}</p>
    </div>
  );
}
