"use client"
import {useUiCopy} from "@/components/ui-copy-context"
/** The first small questionnaire: optional preferences, without guessed guest defaults. */
import { planningChoices, planningSummary, type PlanningQuestionnaire } from "@/content/planning-questionnaire"

export function PlanningQuestions({ prefix, answers }: { prefix: string; answers?: PlanningQuestionnaire }) {
 const uiCopy=useUiCopy()

  return <fieldset className="space-y-5 rounded-xl border border-emerald-200 bg-emerald-50/50 p-5">
    <legend className="px-2 font-medium text-emerald-950">{uiCopy("What would make this your kind of holiday?")}</legend>
    <p className="text-sm leading-6 text-gray-600">{uiCopy("A few starting points. Leave anything open; you can change these after saving.")}</p>
    {(["pace", "birding", "comfort"] as const).map(key => <div key={key}>
      <label htmlFor={`${prefix}-${key}`} className="mb-2 block text-sm font-medium text-gray-700">{uiCopy({ pace: "Holiday pace", birding: "How often would you enjoy birding?", comfort: "Accommodation preference" }[key])}</label>
      <select id={`${prefix}-${key}`} name={key} defaultValue={answers?.[key] || "open"} className="min-h-11 w-full rounded-md border border-input bg-white px-3 py-2 text-sm">{Object.entries(planningChoices[key]).map(([id, label]) => <option key={id} value={id}>{uiCopy(label)}</option>)}</select>
    </div>)}
    <fieldset><legend className="mb-2 text-sm font-medium text-gray-700">{uiCopy("What else would you enjoy? Choose any, or leave open.")}</legend><div className="grid gap-x-4 sm:grid-cols-2">{Object.entries(planningChoices.interests).map(([id, label]) => <label key={id} className="flex min-h-11 items-center gap-2 text-sm text-gray-700"><input type="checkbox" name="interests" value={id} defaultChecked={answers?.interests.includes(id as PlanningQuestionnaire["interests"][number])} className="accent-emerald-700" />{uiCopy(label)}</label>)}</div></fieldset>
  </fieldset>
}

/** Render saved answers as text, rather than HTML from a guest's input. */
export function PlanningAnswers({ answers }: { answers?: PlanningQuestionnaire }) {
 const uiCopy=useUiCopy()
  if (!answers) return null
  return <dl className="mb-5 grid gap-3 text-sm">{planningSummary(answers).map(row => <div key={row.label}><dt className="font-medium text-gray-900">{uiCopy(row.label)}</dt><dd className="text-gray-600">{row.value.split(", ").map(v=>uiCopy(v)).join(", ")}</dd></div>)}</dl>
}
