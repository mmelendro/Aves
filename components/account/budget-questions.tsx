"use client"
import {useUiCopy} from "@/components/ui-copy-context"

import { useState } from "react"
import { budgetCategories, budgetCurrencies, type TripBudget } from "@/content/trip-budget"

/** One state value drives each slider/number pair. Empty means undecided, not zero.
 * Native range controls retain keyboard support; the number field allows precision.
 */
export function BudgetQuestions({ prefix, budget }: { prefix: string; budget?: TripBudget }) {
 const uiCopy=useUiCopy()

  const [currency, setCurrency] = useState<TripBudget["currency"]>(budget?.currency || "NZD")
  const [amounts, setAmounts] = useState<Record<string, string>>(() => Object.fromEntries(budgetCategories.map(({key}) => [key, budget?.[key]?.toString() ?? ""])))
  return <fieldset className="space-y-5 rounded-xl border border-emerald-200 bg-emerald-50/50 p-5">
    <legend className="px-2 font-medium text-emerald-950">{uiCopy("Your planning budget (optional)")}</legend>
    <p className="text-sm leading-6 text-gray-600">{uiCopy("Set a working allowance, or leave any category open. These are preferences, not prices or reservations. Transport and flights are separate.")}</p>
    <div><label htmlFor={`${prefix}-currency`} className="mb-2 block text-sm font-medium">{uiCopy("Budget currency")}</label><select id={`${prefix}-currency`} name="budgetCurrency" value={currency} onChange={e => setCurrency(e.target.value as TripBudget["currency"])} className="min-h-11 w-full rounded-md border border-input bg-white px-3">{budgetCurrencies.map(code => <option value={code} key={code}>{code}</option>)}</select></div>
    <p id={`${prefix}-currency-help`} className="text-xs leading-5 text-gray-600">{uiCopy("Changing currency keeps the numbers you entered; it does not convert them. Review your amounts in the selected currency. Whole currency units, up to 10,000 per category.")}</p>
    {budgetCategories.map(({key,label,unit}) => <div key={key} className="space-y-2">
      <label htmlFor={`${prefix}-budget-${key}`} className="block text-sm font-medium">{uiCopy(label)} {uiCopy("amount ({currency}, {unit})",{currency,unit:uiCopy(unit)})}</label>
      <input id={`${prefix}-budget-${key}`} name={`budget-${key}`} type="number" inputMode="numeric" min="0" max="10000" step="1" value={amounts[key]} onChange={e => setAmounts(current => ({...current,[key]:e.target.value}))} aria-describedby={`${prefix}-currency-help`} placeholder={uiCopy("Open to suggestions")} className="min-h-11 w-full rounded-md border border-input bg-white px-3" />
      <input type="range" min="0" max={Math.max(1000, Number(amounts[key]) || 0)} step="1" value={Number(amounts[key]) || 0} onChange={e => setAmounts(current => ({...current,[key]:e.target.value}))} aria-label={uiCopy("{category} budget slider ({currency}, {unit})",{category:uiCopy(label),currency,unit:uiCopy(unit)})} aria-valuetext={amounts[key] === "" ? uiCopy("Open to suggestions") : `${amounts[key]} ${currency}, ${unit}`} className="min-h-11 w-full accent-emerald-700" />
      <button type="button" onClick={() => setAmounts(current => ({...current,[key]:""}))} className="min-h-11 rounded px-2 text-sm text-emerald-800 underline">{uiCopy("Leave {category} open",{category:uiCopy(label).toLowerCase()})}</button>
    </div>)}
  </fieldset>
}
