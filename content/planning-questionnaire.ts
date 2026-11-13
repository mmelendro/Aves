/** Versioned, nonpersonal choices shared by the form, validation and private review.
 * Answers live in the owned trip record, never in this source file or a URL.
 */
import { budgetCategories, type TripBudget } from "./trip-budget"
import { nzBirdName } from "./new-zealand-checklist"
import {routeTiming,type RoutePreferences} from "@/lib/route-preferences"

export const planningChoices = {
  pace: { open: "Open to suggestions", relaxed: "Relaxed, with free time", balanced: "A balance of outings and downtime", active: "Active, with full days" },
  birding: { open: "Open to suggestions", occasional: "A few special birding outings", alternate: "Roughly every other day", daily: "Birding most days" },
  comfort: { open: "Open to suggestions", simple: "Simple and comfortable", comfortable: "Comfortable hotels or lodges", special: "Special stays where they add to the experience" },
  interests: { birds: "Birds and wildlife", scenery: "Scenery and gentle walks", photography: "Photography", food: "Food and local produce", culture: "Art, history and host-led culture", water: "Coasts and water activities", wellness: "Wellness and downtime" },
} as const

export type PlanningQuestionnaire = {
  version: 1
  pace: keyof typeof planningChoices.pace
  birding: keyof typeof planningChoices.birding
  comfort: keyof typeof planningChoices.comfort
  interests: (keyof typeof planningChoices.interests)[]
  birdIds?: string[]
  budget?: TripBudget
  routePreferences?: RoutePreferences
}

/** One readable representation is reused for the guest's review and owner inbox. */
export function planningSummary(answers: PlanningQuestionnaire) {
  return [
    { label: "Holiday pace", value: planningChoices.pace[answers.pace] },
    { label: "Birding frequency", value: planningChoices.birding[answers.birding] },
    { label: "Accommodation", value: planningChoices.comfort[answers.comfort] },
    { label: "Interests", value: answers.interests.map(id => planningChoices.interests[id]).join(", ") || "Open to suggestions" },
    ...(answers.budget ? budgetCategories.filter(({key}) => answers.budget?.[key] !== undefined).map(({key,label,unit}) => ({ label: `${label} budget`, value: `${new Intl.NumberFormat("en-NZ", {style:"currency",currency:answers.budget!.currency,currencyDisplay:"code",maximumFractionDigits:0}).format(answers.budget![key]!)} ${unit}` })) : []),
    ...(answers.birdIds?.length ? [{ label: `Birds you would love to see (${answers.birdIds.length})`, value: answers.birdIds.map(nzBirdName).join(", ") }] : []),
    ...(answers.routePreferences ? [
      {label:"Route preference dates",value:`${answers.routePreferences.islandId}: ${routeTiming(answers.routePreferences)}`},
      {label:"Route party preferences",value:`${answers.routePreferences.adults} adults, ${answers.routePreferences.rooms} rooms/units`},
      {label:"Route allowance preferences",value:`${answers.routePreferences.currency}; activities ${answers.routePreferences.activityBasis === "day" ? "per day" : "per primary or alternative outing"}. `+Object.entries(answers.routePreferences.allowances).map(([key,value])=>`${key}: ${value}`).join('; ')+'. Spending preferences, not quoted prices. General budget answers remain separate.'},
    ] : []),
  ]
}
