import { createRoadReferences } from "./island-road-references";
import {MAX_PLAN_NOTES,MAX_PLAN_NOTES_BYTES} from "./planning-limits";
import { createPriceReferences } from "./island-price-references";
import {
  tripCategories,
  tripCurrencies,
  allowanceCategories,
  type IslandPlanningContext,
  type TripArea,
  type TripPlace,
  type TripCategory,
  type TripPlannerInput,
  type TripDay,
  type TripDraft,
  type TripStyle,
} from "./island-planning-types";
import { validNzBirdIds, nzBirdName } from "@/content/new-zealand-checklist";
export * from "./island-planning-types";
/** One engine per explicit island catalogue. No cross-island fallback or shared draft slot. */
export function createIslandTripPlanner(context: IslandPlanningContext) {
  const tripAreas: TripArea[] = context.catalogue.areas;
  const tripPlaces = context.catalogue.places as TripPlace[];
  const tripPlaceById = new Map(tripPlaces.map((p) => [p.id, p]));
  const tripAreaById = new Map(tripAreas.map((a) => [a.id, a]));
  const tripGateways = context.gateways;
  const gatewayById = new Map(tripGateways.map((g) => [g.id, g]));
  const roads = createRoadReferences(context.roads),
    prices = createPriceReferences(context);
  const { roadReference, roadTimeLabel } = roads;
  const { tripPriceNotes } = prices;
  const defaultTripInput: TripPlannerInput = {
    islandId: context.id,
    days: 5,
    areaId: "all",
    birdIds: [],
    interests: ["food", "hikes", "ecotourism"],
    includeManaged: true,
    startCity: context.corridor?.startCity ?? "flexible",
    endCity: context.corridor?.endCity ?? "flexible",
    departureDate: "",
    currency: "NZD",
    allowances: {},
    activityBasis: "day",
    adults: 1,
    rooms: 1,
  };
  const TRIP_DRAFT_KEY = context.draftKey;
  const categoryName = (id: string) =>
    tripCategories.find((c) => c.id === id)?.label || id;
  const placesAt = (base: string) => tripPlaces.filter((p) => p.base === base);
  function validDate(value: string) {
    if (value === "") return true;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(`${value}T12:00:00Z`);
    return (
      Number.isFinite(date.getTime()) &&
      date.toISOString().slice(0, 10) === value
    );
  }
  function tripDayDate(input: TripPlannerInput, index: number) {
    if (!input.departureDate) return "";
    const date = new Date(`${input.departureDate}T12:00:00Z`);
    date.setUTCDate(date.getUTCDate() - (input.days - 1 - index));
    return date.toISOString().slice(0, 10);
  }
  function marketFitsDay(
    place: TripPlace,
    input: TripPlannerInput,
    index: number,
  ) {
    if (context.corridor && place.separateDay && input.days < 5) return false;
    if (
      !place.categories.includes("markets") &&
      !(context.corridor && (place.weekdays || place.months))
    )
      return true;
    const date = tripDayDate(input, index);
    if (!date) return false;
    const at = new Date(`${date}T12:00:00Z`);
    return (
      (!place.weekdays || place.weekdays.includes(at.getUTCDay())) &&
      (!place.months || place.months.includes(at.getUTCMonth() + 1))
    );
  }
  /** New suggestions honour reviewed calendars. Validation keeps legacy guest drafts intact. */
  function placeFitsCalendar(
    place: TripPlace,
    input: TripPlannerInput,
    index: number,
  ) {
    if (!marketFitsDay(place, input, index)) return false;
    if (!place.weekdays && !place.months && !place.excludedMonthDays && !place.excludedDates && !place.calendarValidFrom && !place.calendarValidUntil)
      return true;
    const date = tripDayDate(input, index);
    if (!date) return false;
    const at = new Date(`${date}T12:00:00Z`);
    return (
      (!place.weekdays || place.weekdays.includes(at.getUTCDay())) &&
      (!place.months || place.months.includes(at.getUTCMonth() + 1)) &&
      !place.excludedMonthDays?.includes(date.slice(5)) &&
      !place.excludedDates?.includes(date) &&
      (!place.calendarValidFrom || date >= place.calendarValidFrom) &&
      (!place.calendarValidUntil || date <= place.calendarValidUntil)
    );
  }
  function validTripInput(value: unknown): value is TripPlannerInput {
    if (!value || typeof value !== "object") return false;
    const v = value as TripPlannerInput;
    return (
      ((v.islandId === undefined && Boolean(context.legacyUntagged)) ||
        v.islandId === context.id) &&
      (v.adults === undefined ||
        (Number.isInteger(v.adults) && v.adults >= 1 && v.adults <= 12)) &&
      (v.rooms === undefined ||
        (Number.isInteger(v.rooms) &&
          v.rooms >= 1 &&
          v.rooms <= (v.adults ?? 1))) &&
      (v.maxDrivingMinutes === undefined ||
        [120, 180, 240, 300].includes(v.maxDrivingMinutes)) &&
      Number.isInteger(v.days) &&
      v.days >= 1 &&
      v.days <= 30 &&
      (!context.corridor ||
        (v.days >= context.corridor.minDays &&
          v.days <= context.corridor.maxDays &&
          v.startCity === context.corridor.startCity &&
          v.endCity === context.corridor.endCity &&
          v.areaId === "all")) &&
      (v.areaId === "all" || tripAreaById.has(v.areaId)) &&
      typeof v.startCity === "string" &&
      (v.startCity === "flexible" || gatewayById.has(v.startCity)) &&
      typeof v.endCity === "string" &&
      (v.endCity === "flexible" || gatewayById.has(v.endCity)) &&
      typeof v.departureDate === "string" &&
      validDate(v.departureDate) &&
      tripCurrencies.includes(v.currency) &&
      (v.activityBasis === "day" || v.activityBasis === "experience") &&
      v.allowances !== null &&
      typeof v.allowances === "object" &&
      !Array.isArray(v.allowances) &&
      Object.entries(v.allowances).every(
        ([key, n]) =>
          allowanceCategories.some((c) => c.id === key) &&
          Number.isInteger(n) &&
          n >= 0 &&
          n <= 10000,
      ) &&
      validNzBirdIds(v.birdIds) &&
      typeof v.includeManaged === "boolean" &&
      Array.isArray(v.interests) &&
      v.interests.length <= tripCategories.length &&
      new Set(v.interests).size === v.interests.length &&
      v.interests.every((c) => tripCategories.some((option) => option.id === c))
    );
  }
  const eligibleBirdStop = (p: TripPlace, input: TripPlannerInput) =>
    p.categories.includes("birding") &&
    (input.includeManaged || p.encounter === "wild");
  const matched = (p: TripPlace, ids: readonly string[]) =>
    p.birdIds.filter((id) => ids.includes(id));
  /** Bound is five bases. Compare geographic order only, never road distance or duration. */
  function orderTripBases(bases: string[], fixedFinish: boolean) {
    if (bases.length < 3) return;
    const first = bases[0],
      end = fixedFinish ? bases.at(-1) : undefined;
    const middle = bases.slice(1, end ? -1 : undefined);
    const leg = (a: string, b: string) => {
      const x = tripAreaById.get(a)!,
        y = tripAreaById.get(b)!;
      return Math.hypot(
        x.latitude - y.latitude,
        (x.longitude - y.longitude) *
          Math.cos(((x.latitude + y.latitude) * Math.PI) / 360),
      );
    };
    const cost = (route: string[]) =>
      route.slice(1).reduce((n, b, i) => n + leg(route[i], b), 0);
    let best = [...bases],
      bestCost = cost(best);
    const visit = (prefix: string[], remaining: string[]) => {
      if (!remaining.length) {
        const route = [first, ...prefix, ...(end ? [end] : [])],
          score = cost(route);
        if (score < bestCost) {
          best = route;
          bestCost = score;
        }
        return;
      }
      remaining.forEach((b, i) =>
        visit(
          [...prefix, b],
          remaining.filter((_, j) => j !== i),
        ),
      );
    };
    visit([], middle);
    bases.splice(0, bases.length, ...best);
  }
  /** Coverage is sourced opportunity, never sightings, driving optimisation or access. */
  function buildTrip(
    input: TripPlannerInput,
    style: TripStyle = "birds",
  ): TripDraft {
    if (!validTripInput(input))
      throw new Error(
        "Review the trip length, cities, date, birds and allowances.",
      );
    const start = gatewayById.get(input.startCity),
      finish = gatewayById.get(input.endCity);
    if (start && finish && start.baseId !== finish.baseId && input.days < 2)
      throw new Error(
        "Allow at least two days for different start and departure bases. Road time still needs checking.",
      );
    const pool = tripPlaces.filter(
      (p) =>
        eligibleBirdStop(p, input) &&
        (input.areaId === "all" || p.base === input.areaId),
    );
    const bases: string[] = [];
    if (context.corridor) bases.push(...context.corridor.bases);
    else {
      const remaining = new Set(input.birdIds);
      if (start) bases.push(start.baseId);
      for (const p of pool.filter(
        (p) => p.base === start?.baseId || p.base === finish?.baseId,
      ))
        for (const id of p.birdIds) remaining.delete(id);
      const hasEndpoints = Boolean(start || finish);
      const capacity = hasEndpoints
        ? Math.min(5, Math.max(1, Math.floor((input.days + 2) / 2)))
        : Math.min(
            style === "slower" ? 1 : 4,
            Math.max(1, Math.floor((input.days + 1) / 3)),
          );
      const endpointSlots = finish ? 1 : 0;
      const extraLimit = style === "slower" ? (hasEndpoints ? 1 : 1) : capacity;
      let added = 0;
      while (bases.length + endpointSlots < capacity && added < extraLimit) {
        const ranked = tripAreas
          .filter(
            (a) =>
              !bases.includes(a.id) &&
              a.id !== finish?.baseId &&
              (input.areaId === "all" || a.id === input.areaId),
          )
          .map((a) => {
            const birds = new Set(
              pool
                .filter((p) => p.base === a.id)
                .flatMap((p) => matched(p, [...remaining])),
            ).size;
            const variety =
              style === "variety"
                ? new Set(
                    placesAt(a.id).flatMap((p) =>
                      p.categories.filter((c) => input.interests.includes(c)),
                    ),
                  ).size
                : 0;
            const previous = tripAreaById.get(bases.at(-1) || "");
            const distance = previous
              ? Math.hypot(
                  a.latitude - previous.latitude,
                  a.longitude - previous.longitude,
                )
              : 0;
            return {
              id: a.id,
              score: birds * 20 + variety / (1 + distance),
              birds,
            };
          })
          .sort((a, b) => b.score - a.score);
        if (!ranked[0]?.score) break;
        bases.push(ranked[0].id);
        added++;
        for (const p of pool.filter((p) => p.base === ranked[0].id))
          for (const id of p.birdIds) remaining.delete(id);
        if (input.areaId !== "all") break;
      }
      if (!bases.length)
        bases.push(
          finish?.baseId ||
            (input.areaId === "all" ? context.defaultBaseId : input.areaId),
        );
      if (finish && bases.at(-1) !== finish.baseId) bases.push(finish.baseId);
      orderTripBases(bases, Boolean(finish));
    }
    const days: TripDay[] = [],
      visitDays = input.days - (context.corridor ? 0 : bases.length - 1);
    if (visitDays < 1)
      throw new Error(
        "Add days or simplify the start, finish and base choices.",
      );
    const counts = bases.map(() => 0);
    let spare = visitDays;
    for (let b = 0; b < bases.length && spare > 0; b++) {
      counts[b]++;
      spare--;
    }
    const last = bases.length - 1;
    if (
      finish &&
      spare > 0 &&
      pool.some(
        (p) => p.base === bases[last] && matched(p, input.birdIds).length,
      )
    ) {
      counts[last]++;
      spare--;
    }
    const preferred = bases
      .map((base, i) => ({
        i,
        score: pool
          .filter((p) => p.base === base)
          .reduce((n, p) => n + matched(p, input.birdIds).length, 0),
      }))
      .sort((a, b) => b.score - a.score);
    let round = 0;
    while (spare > 0) {
      const options = preferred.some((p) => p.score)
        ? preferred.filter((p) => p.score)
        : preferred;
      counts[options[round % options.length].i]++;
      round++;
      spare--;
    }
    const covered = new Set<string>(),
      usedExtras = new Set<string>();
    for (let b = 0; b < bases.length; b++) {
      const baseId = bases[b],
        stays = placesAt(baseId).filter((p) => p.categories.includes("stays"));
      const stayId =
        (style === "variety" && stays[1] ? stays[1].id : stays[0]?.id) ||
        `airbnb:${baseId}`;
      if (b > 0 && !context.corridor)
        days.push({
          baseId,
          transferFrom: bases[b - 1],
          birdingId: "",
          extraId: "",
          stayId,
        });
      const count = counts[b],
        usedStops = new Set<string>();
      for (let d = 0; d < count; d++) {
        const ordered = pool
          .filter(
            (p) =>
              p.base === baseId &&
              placeFitsCalendar(p, input, days.length) &&
              (!(context.corridor && b > 0 && d === 0) || p.shortTransferStop),
          )
          .sort(
            (a, z) =>
              matched(
                z,
                input.birdIds.filter((id) => !covered.has(id)),
              ).length -
                matched(
                  a,
                  input.birdIds.filter((id) => !covered.has(id)),
                ).length ||
              Number(usedStops.has(a.id)) - Number(usedStops.has(z.id)),
          );
        const stop = ordered[0];
        if (stop) {
          usedStops.add(stop.id);
          for (const id of stop.birdIds) covered.add(id);
        }
        const extras = placesAt(baseId).filter(
          (p) =>
            !stop?.separateDay &&
            (!(context.corridor && b > 0 && d === 0) ||
              (!stop && p.shortTransferStop)) &&
            p.id !== stop?.id &&
            !usedExtras.has(p.id) &&
            !p.categories.includes("stays") &&
            !p.categories.includes("birding") &&
            p.categories.some((c) => input.interests.includes(c)) &&
            placeFitsCalendar(p, input, days.length),
        );
        const extra = style === "variety" ? extras.at(-1) : extras[0];
        if (extra) usedExtras.add(extra.id);
        days.push({
          baseId,
          ...(context.corridor && b > 0 && d === 0
            ? { transferFrom: bases[b - 1] }
            : {}),
          birdingId: stop?.id || "",
          extraId: extra?.id || "",
          stayId,
        });
      }
    }
    days[days.length - 1].stayId = "";
    if (finish && !context.corridor) {
      days[days.length - 1].birdingId = "";
      days[days.length - 1].extraId = "";
    }
    return {
      version: 1,
      input: {
        ...input,
        islandId: context.id,
        birdIds: [...input.birdIds],
        interests: [...input.interests],
        allowances: { ...input.allowances },
      },
      days,
      style,
    };
  }
  const tripStyles = [
    { id: "birds", label: "Bird priorities" },
    { id: "slower", label: "Fewer bases" },
    { id: "variety", label: "More variety" },
  ] as const;
  function buildPlans(input: TripPlannerInput) {
    const seen = new Set<string>();
    return tripStyles.flatMap((style) => {
      const draft = buildTrip(input, style.id),
        key = JSON.stringify(draft.days);
      if (seen.has(key)) return [];
      seen.add(key);
      return [{ ...style, draft }];
    });
  }
  function tripAllowanceSummary(draft: TripDraft) {
    const { input } = draft;
    const experiences = draft.days.reduce(
      (n, d) =>
        n +
        Number(Boolean(d.birdingId)) +
        Number(
          Boolean(
            d.extraId &&
            tripPlaceById
              .get(d.extraId)
              ?.categories.some(
                (c) => !["food", "markets", "transport"].includes(c),
              ),
          ),
        ),
      0,
    );
    const units = {
      accommodation: input.days - 1,
      food: input.days,
      activities: input.activityBasis === "day" ? input.days : experiences,
      transport: input.days,
    };
    const rows = allowanceCategories
      .filter((c) => input.allowances[c.id] !== undefined)
      .map((c) => ({
        ...c,
        amount: input.allowances[c.id]!,
        units: units[c.id],
        total: input.allowances[c.id]! * units[c.id],
      }));
    return {
      rows,
      total: rows.reduce((n, r) => n + r.total, 0),
      experiences,
      complete: rows.length === 4,
    };
  }
  const validPlaceAt = (id: string, base: string, category?: TripCategory) =>
    !id ||
    Boolean(
      tripPlaceById.get(id)?.base === base &&
      (!category || tripPlaceById.get(id)?.categories.includes(category)),
    );
  function validTripDraft(value: unknown): value is TripDraft {
    if (!value || typeof value !== "object") return false;
    const v = value as TripDraft;
    if (
      v.version !== 1 ||
      !validTripInput(v.input) ||
      !Array.isArray(v.days) ||
      v.days.length !== v.input.days
    )
      return false;
    if (v.style !== undefined && !tripStyles.some((s) => s.id === v.style))
      return false;
    const start = gatewayById.get(v.input.startCity),
      finish = gatewayById.get(v.input.endCity);
    if (
      (start && v.days[0]?.baseId !== start.baseId) ||
      (finish && v.days.at(-1)?.baseId !== finish.baseId)
    )
      return false;
    if (context.corridor) {
      if (!v.days.every((d) => d && typeof d === "object")) return false;
      const sequence = v.days
        .filter((d, i) => i === 0 || d.baseId !== v.days[i - 1].baseId)
        .map((d) => d.baseId);
      if (JSON.stringify(sequence) !== JSON.stringify(context.corridor.bases))
        return false;
      for (const [i, d] of v.days.entries())
        if (d.transferFrom) {
          const reference = tripTransferContext(v, i)?.reference;
          const chosen = [d.birdingId, d.extraId].filter(Boolean);
          if (
            !reference ||
            reference.minutes > context.corridor.maxTransferMinutes ||
            chosen.length > 1 ||
            chosen.some((id) => !tripPlaceById.get(id)?.shortTransferStop)
          )
            return false;
        }
    }
    return v.days.every(
      (d, i) =>
        d &&
        tripAreaById.has(d.baseId) &&
        (v.input.areaId === "all" ||
          d.baseId === v.input.areaId ||
          d.baseId === start?.baseId ||
          d.baseId === finish?.baseId) &&
        (!(finish && !context.corridor && i === v.days.length - 1) ||
          (!d.birdingId && !d.extraId)) &&
        typeof d.birdingId === "string" &&
        validPlaceAt(d.birdingId, d.baseId, "birding") &&
        (!d.birdingId ||
          (eligibleBirdStop(tripPlaceById.get(d.birdingId)!, v.input) &&
            marketFitsDay(tripPlaceById.get(d.birdingId)!, v.input, i))) &&
        typeof d.extraId === "string" &&
        (!context.corridor ||
          !tripPlaceById.get(d.birdingId)?.separateDay ||
          !d.extraId) &&
        validPlaceAt(d.extraId, d.baseId) &&
        (!d.extraId ||
          (!tripPlaceById.get(d.extraId)!.categories.includes("stays") &&
            !tripPlaceById.get(d.extraId)!.categories.includes("birding") &&
            d.extraId !== d.birdingId)) &&
        (!d.extraId ||
          marketFitsDay(tripPlaceById.get(d.extraId)!, v.input, i)) &&
        typeof d.stayId === "string" &&
        (i === v.days.length - 1
          ? d.stayId === ""
          : d.stayId === `airbnb:${d.baseId}` ||
            validPlaceAt(d.stayId, d.baseId, "stays")) &&
        (i === 0
          ? !d.transferFrom
          : d.baseId === v.days[i - 1].baseId
            ? !d.transferFrom
            : d.transferFrom === v.days[i - 1].baseId) &&
        (!d.transferFrom ||
          Boolean(context.corridor) ||
          (!d.birdingId && !d.extraId)),
    );
  }
  function canScheduleDay(draft: TripDraft, index: number) {
    return (
      Boolean(context.corridor) ||
      (!draft.days[index]?.transferFrom &&
        !(
          index === draft.days.length - 1 && draft.input.endCity !== "flexible"
        ))
    );
  }
  function tripCoverage(draft: TripDraft) {
    const covered = new Set(
      draft.days.flatMap((d) => tripPlaceById.get(d.birdingId)?.birdIds || []),
    );
    return {
      covered: draft.input.birdIds.filter((id) => covered.has(id)),
      unmatched: draft.input.birdIds.filter((id) => !covered.has(id)),
    };
  }
  function airbnbAreaUrl(baseId: string) {
    const area = tripAreaById.get(baseId);
    return area
      ? `https://www.airbnb.com/s/homes?${new URLSearchParams({ query: area.search })}`
      : "";
  }
  function tripDirectionsUrl(
    from: string,
    to: string,
    origin?: string,
    destination?: string,
  ) {
    const a = tripAreaById.get(from),
      b = tripAreaById.get(to);
    return a && b
      ? `https://www.google.com/maps/dir/?${new URLSearchParams({ api: "1", origin: origin || a.search, destination: destination || b.search, travelmode: "driving" })}`
      : "";
  }
  /** Endpoint town overrides prevent treating Wānaka as Queenstown or Ōamaru as Dunedin. */
  function tripTransferContext(draft: TripDraft, index: number) {
    const day = draft.days[index];
    if (!day?.transferFrom) return null;
    const firstLeg = !draft.days.slice(0, index).some((d) => d.transferFrom);
    const lastLeg = draft.days
      .slice(index)
      .every((d) => d.baseId === day.baseId);
    const from =
      (firstLeg && gatewayById.get(draft.input.startCity)) ||
      tripGateways.find((g) => g.baseId === day.transferFrom);
    const to =
      (lastLeg && gatewayById.get(draft.input.endCity)) ||
      tripGateways.find((g) => g.baseId === day.baseId);
    if (!from || !to) return null;
    return { from, to, reference: roadReference(from.id, to.id) };
  }
  function tripTransferUrl(draft: TripDraft, index: number) {
    const day = draft.days[index],
      context = tripTransferContext(draft, index);
    if (!day?.transferFrom || !context) return "";
    return tripDirectionsUrl(
      day.transferFrom,
      day.baseId,
      `${context.from.name}, New Zealand`,
      `${context.to.name}, New Zealand`,
    );
  }
  function tripRoadSummary(draft: TripDraft) {
    const transfers = draft.days.flatMap((day, i) =>
      day.transferFrom ? [tripTransferContext(draft, i)] : [],
    );
    return {
      total: transfers.length,
      reviewed: transfers.filter((c) => c?.reference).length,
      unknown: transfers.filter((c) => !c?.reference).length,
      long: transfers.filter((c) => c?.reference && c.reference.minutes >= 300)
        .length,
    };
  }
  /** References are partial town-to-town driving, never a complete day duration. */
  function tripDayWorkload(draft: TripDraft, index: number) {
    const day = draft.days[index],
      journey = tripTransferContext(draft, index);
    const minutes = journey?.reference?.minutes ?? null;
    const stop = tripPlaceById.get(day.birdingId),
      extra = tripPlaceById.get(day.extraId);
    const label = day.transferFrom
      ? context.corridor
        ? "Travel and one local outing"
        : "Travel focus"
      : !canScheduleDay(draft, index)
        ? "Departure time"
        : stop?.separateDay
          ? "Dedicated excursion day"
          : stop || extra
            ? "Local outings to review"
            : "Flexible local day";
    const abovePreference =
      minutes !== null &&
      draft.input.maxDrivingMinutes !== undefined &&
      minutes > draft.input.maxDrivingMinutes;
    const notes: string[] = [];
    if(index===0)notes.push("Arrival day: actual arrival time is open. Allow for arrival formalities, collecting transport, local travel and rest before choosing an outing. A full available day is not assumed.");
    if (day.transferFrom)
      notes.push(
        minutes === null
          ? "No reviewed road time for this transfer. Review the route before adding activities."
          : "Town-to-town driving only. Add breaks, exact stay access and local travel.",
      );
    if (abovePreference)
      notes.push(
        "The published driving reference exceeds your preference. Consider an overnight break, fewer bases or a different route.",
      );
    if (stop?.separateDay)
      notes.push(
        "Keep this day for the excursion and its access arrangements.",
      );
    if (extra && stop)
      notes.push(
        "The extra outing is an alternative, not a confirmed combined schedule.",
      );
    if ([stop, extra].some((p) => p?.weekdays || p?.months || p?.when))
      notes.push(
        draft.input.departureDate
          ? "Check the selected date against current opening and operating conditions."
          : "A calendar date is needed to review opening days and seasonal availability.",
      );
    for (const place of [stop, extra].filter((p): p is TripPlace =>
      Boolean(p),
    )) {
      if (!placeFitsCalendar(place, draft.input, index))
        notes.push(
          `${place.name}: ${draft.input.departureDate ? "selected date conflicts with the reviewed calendar" : "choose a date to check the reviewed calendar"}. Your selection is kept for review; replace it or change the dates.`,
        );
      if (place.visitReference)
        notes.push(
          `${place.name}: about ${place.visitReference.minutes} minutes for ${place.visitReference.scope}. Local travel, birding and breaks are additional.`,
        );
    }
    if (stop && !stop.indoorAlternative) {
      const indoor = placesAt(day.baseId).find(
        (p) => p.indoorAlternative && placeFitsCalendar(p, draft.input, index),
      );
      if (indoor)
        notes.push(
          `Indoor alternative to review: ${indoor.name}. Replace an outing if wanted; check opening and travel conditions.`,
        );
      const accessAlternative = placesAt(day.baseId).find(
        (place) => place.accessAlternative && placeFitsCalendar(place, draft.input, index),
      );
      if (accessAlternative && accessAlternative.id !== stop.id)
        notes.push(`Local access alternative to review: ${accessAlternative.name}. Check current conditions before choosing a replacement outing. This is an information stop, not an extra excursion or a weather-safe journey.`);
    }
    if (stop || extra)
      notes.push(
        "Activity duration, local travel and weather suitability still need review.",
      );
    if (index === draft.days.length - 1)
      notes.push(
        "Departure day: allow for actual departure time, check-in, local travel and returning transport. This draft does not confirm a flight or ferry connection.",
      );
    return { label, minutes, abovePreference, notes };
  }
  function tripWorkloadSummary(draft: TripDraft) {
    const days = draft.days.map((_, i) => tripDayWorkload(draft, i));
    return {
      knownDrivingMinutes: days.reduce((n, d) => n + (d.minutes ?? 0), 0),
      unknownTransfers: draft.days.filter(
        (d, i) => d.transferFrom && days[i].minutes === null,
      ).length,
      abovePreference: days.filter((d) => d.abovePreference).length,
    };
  }
  function tripRoadNote(draft: TripDraft, index: number) {
    const context = tripTransferContext(draft, index);
    if (!context) return "";
    const ref = context.reference,
      label = `${context.from.name} to ${context.to.name}`;
    return ref
      ? `Road reference ${label}: about ${roadTimeLabel(ref.minutes)} (${ref.publisher}, reviewed ${ref.reviewedAt}; ${ref.stopPolicy}). Town references only, not live conditions or exact stay addresses. ${ref.url}`
      : `Road time needs review: ${label}. Check exact route, stops and current conditions.`;
  }

  const stayName = (id: string) =>
    id.startsWith("airbnb:")
      ? `Airbnb home near ${tripAreaById.get(id.slice(7))?.name} (listing to choose)`
      : tripPlaceById.get(id)?.name || "Stay to choose";
  function tripDraftText(draft: TripDraft) {
    if (!validTripDraft(draft)) return "";
    const coverage = tripCoverage(draft),
      budget = tripAllowanceSummary(draft);
    return [
      `[AVES ${context.name} itinerary v1]`,
      ...(draft.input.maxDrivingMinutes
        ? [
            `Driving preference: up to ${roadTimeLabel(draft.input.maxDrivingMinutes)} per day. Published town references exclude breaks and local travel.`,
          ]
        : []),
      `${draft.input.days} days / ${draft.input.days - 1} nights. Draft only; access, road times and availability to confirm.`,
      `Start: ${gatewayById.get(draft.input.startCity)?.name || "Open to suggestions"}. Finish: ${gatewayById.get(draft.input.endCity)?.name || "Open to suggestions"}${draft.input.departureDate ? ` on ${draft.input.departureDate}` : ""}.`,
      budget.rows.length
        ? `Per-person allowances (${draft.input.currency}, not quoted prices): ${budget.rows.map((r) => `${r.label} ${r.amount} × ${r.units} = ${r.total}`).join("; ")}. Entered allowance total ${budget.total}.`
        : "Budget allowances still open; prices not checked.",
      `Cost sharing: ${draft.input.adults ?? 1} ${(draft.input.adults ?? 1) === 1 ? "adult" : "adults"}, ${draft.input.rooms ?? 1} ${(draft.input.rooms ?? 1) === 1 ? "room/unit" : "rooms/units"}. Adult references only; dates and availability are not quoted.`,
      `Bird wishes: ${draft.input.birdIds.map(nzBirdName).join(", ") || "Open to suggestions"}.`,
      ...draft.days.map(
        (d, i) =>
          `Day ${i + 1}${tripDayDate(draft.input, i) ? ` (${tripDayDate(draft.input, i)})` : ""}: ${d.transferFrom ? `Transfer ${tripAreaById.get(d.transferFrom)?.name} to ` : ""}${tripAreaById.get(d.baseId)?.name}. ${[tripPlaceById.get(d.birdingId)?.name, d.extraId ? `Optional: ${tripPlaceById.get(d.extraId)?.name}` : "", d.stayId ? `Night: ${stayName(d.stayId)}` : "Final day, no overnight included"].filter(Boolean).join("; ")}.${d.transferFrom ? `\n${tripRoadNote(draft, i)}` : ""}`,
      ),
      ...draft.days.flatMap((_, i) =>
        tripDayWorkload(draft, i)
          .notes.filter(
            (note) =>
              note.includes("selected date conflicts") ||
              note.includes("choose a date to check") || note.startsWith("Arrival day:") || note.startsWith("Departure day:"),
          )
          .map((note) => `Day ${i + 1} timing/calendar review: ${note}`),
      ),
      ...tripPriceNotes(draft),
      coverage.unmatched.length
        ? `No scheduled sourced stop yet: ${coverage.unmatched.map(nzBirdName).join(", ")}.`
        : "",
      `[/AVES ${context.name} itinerary]`,
    ]
      .filter(Boolean)
      .join("\n");
  }
  function mergeTripNotes(message: string, draft: TripDraft) {
    const text = tripDraftText(draft);
    if (!text)
      return {
        message,
        error: "This itinerary needs to be rebuilt before importing.",
      };
    if (message.includes(text)) return { message };
    // Earlier generated blocks are left for the guest to review; never erase their edits.
    const merged = `${message}${message ? "\n\n" : ""}${text}`;
    return merged.length <= MAX_PLAN_NOTES && new TextEncoder().encode(merged).length <= MAX_PLAN_NOTES_BYTES
      ? { message: merged }
      : {
          message,
          error:
            "The itinerary and notes exceed the private planning limit. Keep a backup before shortening your notes; existing notes are unchanged.",
        };
  }
  function writeTripDraft(
    storage: Pick<Storage, "setItem">,
    draft: TripDraft,
    now = Date.now(),
  ) {
    if (!validTripDraft(draft)) return false;
    try {
      storage.setItem(
        TRIP_DRAFT_KEY,
        JSON.stringify({ at: now, islandId: context.id, draft }),
      );
      return true;
    } catch {
      return false;
    }
  }
  function readTripDraft(
    storage: Pick<Storage, "getItem" | "removeItem">,
    now = Date.now(),
  ): TripDraft | null {
    try {
      const v = JSON.parse(storage.getItem(TRIP_DRAFT_KEY) || "null");
      // An explicitly different island belongs to another planner. Never import or
      // delete it. Untagged historical envelopes are South Island only.
      if (
        (v?.islandId === undefined && !context.legacyUntagged) ||
        (v?.islandId !== undefined && v.islandId !== context.id)
      )
        return null;
      if (
        v?.draft?.input?.islandId !== undefined &&
        v.draft.input.islandId !== context.id
      )
        return null;
      if (
        Number.isFinite(v?.at) &&
        now >= v.at &&
        now - v.at <= 86400000 &&
        validTripDraft(v.draft)
      )
        return v.draft;
      storage.removeItem(TRIP_DRAFT_KEY);
    } catch {}
    return null;
  }
  function consumeTripDraft(
    storage: Pick<Storage, "getItem" | "removeItem">,
    savedMessage: string,
  ) {
    const draft = readTripDraft(storage);
    if (draft && savedMessage.includes(tripDraftText(draft)))
      storage.removeItem(TRIP_DRAFT_KEY);
  }

  return {
    context,
    roads,
    prices,
    tripAreas,
    tripPlaces,
    tripPlaceById,
    tripAreaById,
    tripGateways,
    gatewayById,
    tripCategories,
    tripCurrencies,
    allowanceCategories,
    defaultTripInput,
    TRIP_DRAFT_KEY,
    categoryName,
    placesAt,
    tripDayDate,
    marketFitsDay,
    placeFitsCalendar,
    validTripInput,
    buildTrip,
    tripStyles,
    buildPlans,
    tripAllowanceSummary,
    validTripDraft,
    canScheduleDay,
    tripCoverage,
    airbnbAreaUrl,
    tripDirectionsUrl,
    tripTransferContext,
    tripTransferUrl,
    tripRoadSummary,
    tripDayWorkload,
    tripWorkloadSummary,
    tripRoadNote,
    tripDraftText,
    mergeTripNotes,
    writeTripDraft,
    readTripDraft,
    consumeTripDraft,
  };
}
export type IslandTripPlanner = ReturnType<typeof createIslandTripPlanner>;
