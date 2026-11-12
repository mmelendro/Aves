import type { TripDraft, TripArea, TripPlace } from "./island-planning-types";
export type TripJourneyStep = {
  id: string;
  day: number;
  baseId: string;
  baseName: string;
  kind: "arrival" | "transfer" | "outing" | "overnight" | "departure" | "free";
  title: string;
  note: string;
  birdIds: string[];
  places: { id: string; name: string; description: string; url: string }[];
};
/** A preview of the existing draft, not a reservation, precise address or timed schedule. */
export function buildTripJourney(
  draft: TripDraft,
  areas: readonly TripArea[],
  places: readonly TripPlace[],
): TripJourneyStep[] {
  const areaById = new Map(areas.map((a) => [a.id, a])),
    placeById = new Map(places.map((p) => [p.id, p]));
  const steps: TripJourneyStep[] = [];
  for (const [index, day] of draft.days.entries()) {
    const area = areaById.get(day.baseId);
    if (!area) continue;
    const local = places.filter((p) => p.base === day.baseId);
    const common = {
      day: index + 1,
      baseId: area.id,
      baseName: area.name,
      birdIds: [
        ...new Set(
          local
            .filter((p) => draft.input.includeManaged || p.encounter === "wild")
            .flatMap((p) => p.birdIds),
        ),
      ],
      places: local
        .filter((p) => !p.categories.includes("transport"))
        .map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          url: p.url,
        })),
    };
    const add = (kind: TripJourneyStep["kind"], title: string, note: string) =>
      steps.push({
        ...common,
        id: `day-${index + 1}-${kind}`,
        kind,
        title,
        note,
      });
    if (index === 0)
      add(
        "arrival",
        `Begin in ${area.name}`,
        "Confirm your arrival point and time. The map highlights the broad planning base, not an airport.",
      );
    if (day.transferFrom)
      add(
        "transfer",
        `Travel from ${areaById.get(day.transferFrom)?.name || "the previous base"} to ${area.name}`,
        "Town-to-town planning sequence. Connectors are not roads; check driving references, local travel and breaks in your daily draft.",
      );
    const chosen = [day.birdingId, day.extraId].flatMap((id) => {
      const p = placeById.get(id);
      return p ? [p] : [];
    });
    if (chosen.length)
      add(
        "outing",
        chosen.length === 1 ? chosen[0].name : `Explore ${area.name}`,
        chosen.length > 1
          ? `${chosen.map((p) => p.name).join(" or ")}. These are alternatives to review, not a confirmed combined schedule.`
          : chosen[0].description,
      );
    else if (!day.transferFrom && index !== draft.days.length - 1)
      add(
        "free",
        `Time to explore ${area.name}`,
        "Leave this part of the day open, or choose an outing in your editable draft.",
      );
    if (day.stayId) {
      const stay = placeById.get(day.stayId);
      add(
        "overnight",
        `Overnight near ${area.name}`,
        stay
          ? `${stay.name}. Exact property location, availability and check-in still need confirmation.`
          : "Accommodation still to choose. The map shows the planning base, not a reviewed home or hotel.",
      );
    }
    if (index === draft.days.length - 1)
      add(
        "departure",
        `Finish in ${area.name}`,
        "Confirm your actual onward travel, airport or ferry, check-in and departure time. No connection is reserved.",
      );
  }
  return steps;
}
