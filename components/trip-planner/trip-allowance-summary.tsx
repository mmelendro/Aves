import {
  tripAllowanceSummary,
  type TripDraft,
} from "@/lib/south-island-trip-planner";

/** Shows entered allowances, never inferred room rates or affordability claims. */
export default function TripAllowanceSummary({ draft }: { draft: TripDraft }) {
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
        Your allowance envelope · {money(budget.total)} per person
      </h4>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">
            User-entered category allowances, not verified travel prices
          </caption>
          <thead>
            <tr>
              <th className="p-2">Category</th>
              <th className="p-2">Allowance</th>
              <th className="p-2">Units</th>
              <th className="p-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {budget.rows.map((r) => (
              <tr key={r.id}>
                <th className="p-2 font-medium">{r.label}</th>
                <td className="p-2">{money(r.amount)}</td>
                <td className="p-2">
                  {r.units}{" "}
                  {r.id === "accommodation"
                    ? "nights"
                    : r.id === "activities" &&
                        draft.input.activityBasis === "experience"
                      ? "outings"
                      : "days"}
                </td>
                <td className="p-2">{money(r.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs leading-6 text-gray-600">
        {budget.complete
          ? "All four category allowances are entered."
          : "This total includes entered categories only; other costs remain open."}{" "}
        This is a spending envelope, not a priced proposal. Accommodation,
        meals, activity charges, transport and connections have not been checked
        against live prices.
      </p>
    </div>
  );
}
