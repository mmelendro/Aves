import type {
  IslandPlanningContext,
  TripDraft,
  TripPlannerInput,
} from "./island-planning-types";
export function createPriceReferences(context: IslandPlanningContext) {
  const data = context.prices,
    catalogue = context.catalogue;
  /** Reference arithmetic only. Published rates never establish live availability,
   * complete trip cost or affordability. Room and adult units are not interchangeable. */
  const priceReferences = data.references;
  const priceByPlace = new Map(priceReferences.map((r) => [r.placeId, r]));
  /** Date limitations stay visible even when no allowance comparison is possible. */
  function priceDateIssue(placeId: string, date: string) {
    const ref = priceByPlace.get(placeId);
    if (!ref || !date) return "";
    if (
      date < ref.reviewedAt ||
      (ref.validFrom && date < ref.validFrom) ||
      (ref.validUntil && date > ref.validUntil)
    )
      return "Trip date has no applicable reviewed tariff";
    if (
      ref.weekdays &&
      !ref.weekdays.includes(new Date(date + "T00:00:00Z").getUTCDay())
    )
      return "Date does not match published opening days";
    return "";
  }
  function referenceAmounts(
    placeId: string,
    input: TripPlannerInput,
    date = "",
    now = Date.now(),
  ) {
    const ref = priceByPlace.get(placeId);
    if (!ref)
      return {
        ref: null,
        reason: "No reviewed price reference",
        low: null,
        high: null,
      };
    const blocked = (reason: string) => ({
      ref,
      reason,
      low: null,
      high: null,
    });
    if (ref.basis === "quote-required")
      return blocked("Named room or product needs a quote");
    if (!["room-night","adult-entry"].includes(ref.basis))
      return blocked("Reference unit needs a quote; no per-person conversion applied");
    if (input.currency !== ref.currency)
      return blocked("Currency differs; no conversion applied");
    if (now - Date.parse(ref.reviewedAt + "T00:00:00Z") > 90 * 86400000)
      return blocked(
        "Reference is over 90 days old; refresh before comparison",
      );
    const dateIssue = priceDateIssue(placeId, date);
    if (dateIssue) return blocked(dateIssue);
    const adults = input.adults ?? 1,
      rooms = input.rooms ?? 1;
    if (ref.basis === "room-night" && adults > rooms * ref.maxAdultsPerUnit)
      return blocked(
        "Room occupancy needs review; add units or obtain a quote",
      );
    const factor = ref.basis === "room-night" ? rooms / adults : 1;
    return {
      ref,
      reason: "Published reference only; dates and availability unquoted",
      low: ref.low * factor,
      high: ref.high * factor,
    };
  }
  const placeNames = new Map(catalogue.places.map((p) => [p.id, p.name]));
  function priceReviewRows(draft: TripDraft, now = Date.now()) {
    const rows: {
      day: number;
      category: "accommodation" | "activities";
      label: string;
      low: number | null;
      high: number | null;
      allowance: number | undefined;
      unknown: number;
      reason: string;
    }[] = [];
    let selected = 0,
      reviewed = 0;
    for (const [i, day] of draft.days.entries()) {
      const date = draft.input.departureDate
        ? new Date(
            Date.parse(draft.input.departureDate + "T00:00:00Z") -
              (draft.input.days - 1 - i) * 86400000,
          )
            .toISOString()
            .slice(0, 10)
        : "";
      if (day.stayId) {
        selected++;
        const a = referenceAmounts(day.stayId, draft.input, date, now);
        if (a.low !== null) reviewed++;
        rows.push({
          day: i + 1,
          category: "accommodation",
          label:
            a.ref?.product ||
            placeNames.get(day.stayId) ||
            "Accommodation to choose",
          low: a.low,
          high: a.high,
          allowance: draft.input.allowances.accommodation,
          unknown: a.low === null ? 1 : 0,
          reason: a.reason,
        });
      }
      const ids = [day.birdingId, day.extraId]
        .filter(Boolean)
        .filter(
          (id) =>
            !catalogue.places
              .find((p) => p.id === id)
              ?.categories.includes("food"),
        );
      const entries = ids.map((id) => {
        selected++;
        const result = referenceAmounts(id, draft.input, date, now);
        if (result.low !== null) reviewed++;
        return { id, ...result };
      });
      if (draft.input.activityBasis === "experience")
        for (const e of entries)
          rows.push({
            day: i + 1,
            category: "activities",
            label: placeNames.get(e.id) || "Outing",
            low: e.low,
            high: e.high,
            allowance: draft.input.allowances.activities,
            unknown: e.low === null ? 1 : 0,
            reason: e.reason,
          });
      else if (entries.length) {
        const known = entries.filter((e) => e.low !== null);
        rows.push({
          day: i + 1,
          category: "activities",
          label: "Scheduled outing references for this day",
          low: known.length ? known.reduce((n, e) => n + e.low!, 0) : null,
          high: known.length ? known.reduce((n, e) => n + e.high!, 0) : null,
          allowance: draft.input.allowances.activities,
          unknown: entries.length - known.length,
          reason:
            entries
              .filter((e) => e.low === null)
              .map((e) => e.reason)
              .join("; ") ||
            "Published reference only; dates and availability unquoted",
        });
      }
    }
    return { rows, selected, reviewed };
  }
  function comparisonLabel(row: {
    low: number | null;
    high: number | null;
    allowance: number | undefined;
    unknown: number;
  }) {
    if (row.low === null) return "Price still needs review";
    if (row.allowance === undefined) return "Allowance open";
    if (row.low > row.allowance) return "Reference above allowance";
    if (row.high! > row.allowance) return "Reference band crosses allowance";
    return row.unknown
      ? "Known subtotal below allowance; other prices missing"
      : "Reference below allowance; quote still needed";
  }
  function tripPriceNotes(draft: TripDraft) {
    const seen = new Set<string>(),
      lines: string[] = [];
    for (const day of draft.days)
      for (const id of [day.birdingId, day.extraId, day.stayId]) {
        const ref = priceByPlace.get(id);
        if (!ref || seen.has(id)) continue;
        seen.add(id);
        lines.push(
          `Price reference: ${ref.product}, ${ref.currency} ${ref.low}${ref.high !== ref.low ? `–${ref.high}` : ""} ${ref.basis}; checked ${ref.reviewedAt}. ${ref.conditions} ${ref.url}`,
        );
      }
    return lines.length
      ? [
          "Published price references, not date-specific quotes or complete costs:",
          ...lines,
        ]
      : [];
  }

  return {
    priceReferences,
    priceByPlace,
    priceDateIssue,
    referenceAmounts,
    priceReviewRows,
    comparisonLabel,
    tripPriceNotes,
  };
}
