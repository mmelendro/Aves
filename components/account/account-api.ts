/**
 * Browser-facing types and HTTP helpers for the shared account screens.
 * The types describe expected JSON; they do not validate arbitrary server data or
 * grant permission. The API independently checks every request, regardless of what
 * buttons are visible. Private email/server credentials never belong in this file.
 */

import { sitePath } from "@/lib/site-path";
import {
  countryLabels,
  countryRegionLabels,
  normalizeTripCountry,
  type TripCountry,
} from "@/content/trip-options";
import type { PlanningQuestionnaire } from "@/content/planning-questionnaire";

export type TripFields = {
  country?: TripCountry;
  title: string;
  regions: string[];
  travelWhen: string;
  partySize: string;
  message: string;
  questionnaire?: PlanningQuestionnaire;
};
export type TripPlan = TripFields & {
  id: string;
  status: "draft" | "quote_requested";
  updatedAt: string;
};
export type ProposalFields = {
  totalCents: number;
  currency: "AUD";
  itinerary: string;
  inclusions: string;
  exclusions: string;
  validUntil: string | null;
};
export type Proposal = ProposalFields & {
  id: string;
  quoteRequestId: string;
  version: number;
  status: "draft" | "sent";
  issuedAt: string | null;
  updatedAt: string;
  notificationStatus: "pending" | "accepted" | "failed";
};
export type OwnerQuote = {
  id: string;
  planId: string;
  status: string;
  contactName: string;
  contactEmail: string;
  submittedAt: string;
  plan: TripFields;
  notificationStatus: "pending" | "accepted" | "failed";
  proposals: Proposal[];
};

/**
 * Retain the HTTP status so screens can distinguish expired sign-in from a stale edit or service failure.
 */
export class AccountRequestError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

/**
 * Fetch a private API path with same-origin cookies and no cache; return expected JSON or throw a friendly error.
 * The generic T is not full runtime validation; forms additionally check essential receipt fields.
 */
export async function accountRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(sitePath(path), {
    ...options,
    credentials: "same-origin",
    cache: "no-store",
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });
  const result = await response.json().catch(() => null);
  if (!response.ok) {
    const fallback =
      response.status === 401
        ? "Your session has expired. Please sign in again before continuing."
        : response.status === 409
          ? "This item has changed. Reload the saved version before trying again; your unsaved details are still shown here."
          : "Your request could not be completed. Please try again.";
    throw new AccountRequestError(
      typeof result?.error === "string" ? result.error : fallback,
      response.status,
    );
  }
  if (!result || typeof result !== "object")
    throw new Error("The result could not be confirmed. Please try again.");
  return result as T;
}

/**
 * Normalize a stored/optional country; historical plans without one belong to Australia.
 */
export function tripCountry(country?: TripCountry): TripCountry {
  return normalizeTripCountry(country);
}
/**
 * Return the display name for a plan's normalized country.
 */
export function countryLabel(country?: TripCountry) {
  return countryLabels[tripCountry(country)];
}
/**
 * Render known region labels while retaining old freeform values for the owner/client to review.
 */
export function regionSummary(regions: string[], country?: TripCountry) {
  const labels = countryRegionLabels[tripCountry(country)];
  return (
    regions.map((region) => labels[region] || region).join(", ") ||
    "Open to inspiration"
  );
}
/**
 * Calendar dates keep their named day. Instants use the viewer's time zone.
 */
export function dateLabel(value: string | null | undefined) {
  if (!value) return "Not specified";
  const calendar = /^\d{4}-\d{2}-\d{2}$/.test(value);
  const date = new Date(calendar ? `${value}T00:00:00Z` : value);
  if (
    Number.isNaN(date.getTime()) ||
    (calendar && date.toISOString().slice(0, 10) !== value)
  )
    return "Not specified";
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...(calendar ? { timeZone: "UTC" } : {}),
  }).format(date);
}
/**
 * Choose the caught error's user-facing text, or a generic fallback for non-Error failures.
 */
export function errorMessage(error: unknown) {
  if (error instanceof Error && error.name === "ZodError")
    return "The saved result could not be confirmed. Keep your edits and retry.";
  return error instanceof Error
    ? error.message
    : "Something went wrong. Please try again.";
}
