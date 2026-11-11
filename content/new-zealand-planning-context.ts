import catalogue from "./south-island-trip-catalogue.json";
import roads from "./south-island-road-references.json";
import prices from "./south-island-price-references.json";

/** Only researched, operational planners are registered. Overview links do not
 * make an island plannable. Keep labels, source sets and private intent together. */
const gateways = [
  { id: "christchurch", name: "Christchurch", baseId: "christchurch" },
  { id: "queenstown", name: "Queenstown", baseId: "lakes" },
  { id: "wanaka", name: "Wānaka", baseId: "lakes" },
  { id: "glenorchy", name: "Glenorchy", baseId: "lakes" },
  { id: "dunedin", name: "Dunedin", baseId: "otago" },
  { id: "oamaru", name: "Ōamaru", baseId: "otago" },
  { id: "nelson", name: "Nelson", baseId: "tasman" },
  { id: "motueka", name: "Motueka", baseId: "tasman" },
  { id: "marahau", name: "Mārahau", baseId: "tasman" },
  { id: "kaikoura", name: "Kaikōura", baseId: "kaikoura" },
  { id: "te-anau", name: "Te Anau", baseId: "fiordland" },
  { id: "arthurs-pass", name: "Arthur’s Pass", baseId: "arthurs-pass" },
  { id: "st-arnaud", name: "St Arnaud", baseId: "nelson-lakes" },
  { id: "hanmer", name: "Hanmer Springs", baseId: "hanmer" },
  { id: "maruia", name: "Maruia Springs", baseId: "maruia" },
  { id: "franz-josef", name: "Franz Josef", baseId: "west-coast" },
  { id: "curio-bay", name: "Curio Bay", baseId: "catlins" },
  { id: "invercargill", name: "Invercargill", baseId: "invercargill" },
  { id: "greymouth", name: "Greymouth", baseId: "greymouth" },
  { id: "picton", name: "Picton", baseId: "picton" },
] as const;
export const southIslandPlanning = {
  id: "south-island",
  name: "South Island",
  draftKey: "aves:south-island-itinerary:v1",
  accountHref: "/account?country=new-zealand&region=south-island",
  catalogue, roads, prices, gateways,
} as const;
export function planningContext(id: string) {
  return id === southIslandPlanning.id ? southIslandPlanning : null;
}
