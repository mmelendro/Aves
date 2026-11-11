export const tripCategories = [
  { id: "birding", label: "Birding" },
  { id: "stays", label: "Places to stay" },
  { id: "food", label: "Food & local produce" },
  { id: "markets", label: "Markets" },
  { id: "hot-springs", label: "Hot springs & pools" },
  { id: "hikes", label: "Hikes & walks" },
  { id: "adventures", label: "Adventures" },
  { id: "ecotourism", label: "Ecotourism" },
  { id: "culture", label: "Culture & local stories" },
  { id: "wellness", label: "Wellness" },
  { id: "transport", label: "Transport" },
] as const;
export type TripCategory = (typeof tripCategories)[number]["id"];
export type TripArea = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  sourceUrl: string;
  search: string;
};
export type TripPlace = {
  id: string;
  name: string;
  base: string;
  categories: TripCategory[];
  url: string;
  description: string;
  birdIds: string[];
  encounter: string;
  tags: string[];
  checkedAt: string;
  weekdays?: number[];
  months?: number[];
  eco?: { kind: string; note: string; url: string };
  when?: string;
  access?: string;
};
export const tripCurrencies = [
  "NZD",
  "AUD",
  "USD",
  "CAD",
  "EUR",
  "GBP",
] as const;
export const allowanceCategories = [
  { id: "accommodation", label: "Accommodation", unit: "per night" },
  { id: "food", label: "Food", unit: "per day" },
  { id: "activities", label: "Activities", unit: "per day or experience" },
  { id: "transport", label: "Transport", unit: "per day" },
] as const;
export type TripAllowances = Partial<
  Record<(typeof allowanceCategories)[number]["id"], number>
>;
export type TripPlannerInput = {
  islandId?: string;
  days: number;
  areaId: string;
  birdIds: string[];
  interests: TripCategory[];
  includeManaged: boolean;
  startCity: string;
  endCity: string;
  departureDate: string;
  currency: (typeof tripCurrencies)[number];
  allowances: TripAllowances;
  activityBasis: "day" | "experience";
  adults?: number;
  rooms?: number;
};
export type TripDay = {
  baseId: string;
  transferFrom?: string;
  birdingId: string;
  extraId: string;
  stayId: string;
};
export type TripStyle = "birds" | "slower" | "variety";
export type TripDraft = {
  version: 1;
  input: TripPlannerInput;
  days: TripDay[];
  style?: TripStyle;
};

export type IslandPlanningContext = {
  id: string;
  name: string;
  draftKey: string;
  accountHref: string;
  mapAnchor: string;
  defaultBaseId: string;
  legacyUntagged?: boolean;
  catalogue: {
    areas: TripArea[];
    places: readonly (Omit<TripPlace, "categories"> & {
      categories: string[];
    })[];
  };
  gateways: readonly { id: string; name: string; baseId: string }[];
  roads: {
    reviewedAt: string;
    conditionsUrl: string;
    sources: Record<
      string,
      { publisher: string; url: string; kind: string; stopPolicy: string }
    >;
    corridors: {
      fromId: string;
      toId: string;
      minutes: number;
      sourceId: string;
    }[];
  };
  prices: { references: PriceReference[] };
};
export type PriceReference = {
  placeId: string;
  product: string;
  category: string;
  basis: string;
  low: number;
  high: number;
  fromPrice: boolean;
  maxAdultsPerUnit: number;
  publisher: string;
  url: string;
  conditions: string;
  currency: string;
  reviewedAt: string;
  availability: string;
  validFrom?: string;
  validUntil?: string;
  weekdays?: number[];
};
