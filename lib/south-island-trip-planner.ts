import { southIslandPlanning } from "@/content/new-zealand-planning-context";
import { createIslandTripPlanner } from "./island-trip-planner";
/** Stable South Island API and historical draft key retained for existing consumers. */
export const southIslandPlanner = createIslandTripPlanner(southIslandPlanning);
export * from "./island-planning-types";
export const {
  tripAreas,
  tripPlaces,
  tripPlaceById,
  tripAreaById,
  tripGateways,
  gatewayById,
  defaultTripInput,
  TRIP_DRAFT_KEY,
  categoryName,
  placesAt,
  tripDayDate,
  marketFitsDay,
  validTripInput,
  buildTrip,
  tripStyles,
  buildPlans,
  tripAllowanceSummary,
  validTripDraft,
  tripCoverage,
  airbnbAreaUrl,
  tripDirectionsUrl,
  tripTransferContext,
  tripTransferUrl,
  tripRoadSummary,
  tripRoadNote,
  tripDraftText,
  mergeTripNotes,
  writeTripDraft,
  readTripDraft,
  consumeTripDraft,
} = southIslandPlanner;
export const buildSouthIslandTrip = southIslandPlanner.buildTrip;
export const buildSouthIslandPlans = southIslandPlanner.buildPlans;
