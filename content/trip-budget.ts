/** Currency codes describe entered budgets, not exchange-rate conversions. */
export const budgetCurrencies = ["NZD", "AUD", "USD", "CAD", "EUR", "GBP"] as const
export const budgetCategories = [
  { key: "accommodation", label: "Accommodation", unit: "per person per night" },
  { key: "food", label: "Food", unit: "per person per day" },
  { key: "activities", label: "Activities", unit: "per person per day" },
] as const
export type TripBudget = { currency: typeof budgetCurrencies[number]; accommodation?: number; food?: number; activities?: number }
