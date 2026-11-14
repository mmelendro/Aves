/**
 * One selected country drives the summary, destination link and existing bird
 * viewer. The map arrives as server-rendered children, so the whole world's
 * geometry does not become a browser JavaScript dependency.
 */
"use client";

import { usePathname } from "next/navigation";
import { enquiryHref } from "@/lib/enquiry-entry";

import { useTripMap } from "./trip-planner/trip-map-context";
import { journeyBirdProfiles } from "@/lib/trip-journey";
import TripJourneyControls, {
  TripJourneyMapNavigation,
} from "./trip-planner/trip-journey-controls";
import { useBirdFilters } from "./bird-filter-context";
import {
  filterConservationBirds,
  birdFiltersActive,
} from "@/lib/bird-conservation";
import { guideMapCue, mapCueSources } from "@/lib/guide-map-cue";

import {
  explorerLocation,
  readExplorerLocation,
  isReviewedGalleryPlace,
  explorerLocationHref,
  type ExplorerLocation,
} from "@/lib/explorer-location";
import { useColombiaHomeCopy } from "./colombia-home-language";
import { CountrySatelliteControl } from "./country-satellite-layer";
import { placeInSentence } from "@/lib/place-language";
import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { destinations } from "@/content/destinations";
import {
  destinationRegions,
  getBirdRegionIds,
  getDestinationRegionBirds,
} from "@/content/destination-regions";
import type { BirdProfile } from "@/content/birds";
import dynamic from "next/dynamic";
import DiscoveryLoading from "./discovery-loading";
const NewZealandBirdPicker = dynamic(
  () => import("./new-zealand-bird-picker"),
  { loading: () => <p role="status">Opening bird choices…</p> },
);
import { featuredNzBirdId } from "@/content/new-zealand-checklist";
import {
  readNzBirdBasket,
  writeNzBirdBasket,
  NZ_BIRD_BASKET_EVENT,
} from "@/lib/nz-bird-selection";
import DestinationCardMedia from "@/components/destination-card-media";
import { DestinationSelectionContext } from "@/components/destination-selection-context";
import { BirdDiscoveryContext } from "@/components/bird-discovery-context";
import { useHeaderLandscape } from "./header-landscape-context";
import { MapViewer } from "./map-viewer";
import RegionalSoundscapeSource from "./regional-soundscape-source";
import DestinationRegionalMap from "@/components/deferred-country-map";
import ResizableDiscoveryPair from "@/components/resizable-discovery-pair";
import SouthIslandHabitatProvider, {
  SouthIslandHabitatContext,
} from "./south-island-habitat-context";
const SouthIslandPlacesExplorer = dynamic(
  () => import("./south-island-places-explorer"),
  {
    loading: ({ error, retry }) => (
      <DiscoveryLoading
        error={error}
        retry={retry}
        label="South Island landscapes"
      />
    ),
  },
);
import SouthIslandEcosystemMap from "./deferred-south-island-map";
import {
  filterSouthIslandBirds,
  southIslandEcosystems,
} from "@/content/south-island-ecosystems";
import southIslandDiscoveryIndex from "@/content/south-island-discovery-index.json";
import { southIslandSlideIndex } from "@/lib/south-island-discovery-state";
const PlaceGallery = dynamic(() => import("./deferred-place-gallery"), {
  loading: ({ error, retry }) => (
    <DiscoveryLoading error={error} retry={retry} label="reviewed landscapes" />
  ),
});
import type { GalleryPhoto } from "@/lib/place-gallery";
import styles from "./homepage-destination-explorer.module.css";

type ExplorerProps = {
  map: ReactNode;
  initialCountryId?: string;
  initialRegionId?: string;
  onScopeChange?: (country: string, region: string) => void;
};
export default function HomepageDestinationExplorer(props: ExplorerProps) {
  return (
    <SouthIslandHabitatProvider>
      <HomepageDestinationExplorerCore {...props} />
    </SouthIslandHabitatProvider>
  );
}

export function HomepageDestinationExplorerCore({
  map,
  initialCountryId,
  initialRegionId,
  onScopeChange,
}: ExplorerProps) {
  const currentPath = usePathname() || "/";
  const { filters } = useBirdFilters();
  const localizeHome = useColombiaHomeCopy();
  const { publish } = useHeaderLandscape();
  const [scope, setScope] = useState(() =>
    explorerLocation(initialCountryId, initialRegionId),
  );
  const selectedId = scope.country,
    regionId = scope.region,
    zoomed = Boolean(scope.country);
  const [navigationAvailable, setNavigationAvailable] = useState(true);
  useEffect(() => {
    const fallback = explorerLocation(initialCountryId, initialRegionId);
    function restore() {
      const next = readExplorerLocation(window.location.search, fallback);
      setScope(next);
    setGalleryPlaceId("");
    setGalleryPhoto(null);
      setBirdId("");
      setShowBirdAreas(false);
      const place = new URLSearchParams(window.location.search).get("place");
      setGalleryPlaceId(place ?? "");
      setGalleryPhoto(null);
    }
    restore();
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, [initialCountryId, initialRegionId]);
  function navigate(next: ExplorerLocation) {
    setScope(next);
    try {
      const href = explorerLocationHref(window.location.href, next);
      if (
        `${window.location.pathname}${window.location.search}${window.location.hash}` !==
        href
      )
        window.history.pushState(window.history.state, "", href);
      setNavigationAvailable(true);
    } catch {
      setNavigationAvailable(false);
    }
  }
  const [birdId, setBirdId] = useState("");
  const [showBirdAreas, setShowBirdAreas] = useState(false);
  const [galleryPlaceId, setGalleryPlaceId] = useState("");
  const detailView = Boolean(initialCountryId) || isReviewedGalleryPlace({country:selectedId,region:regionId},galleryPlaceId);
  const [galleryPhoto, setGalleryPhoto] = useState<GalleryPhoto | null>(null);
  const [wishIds, setWishIds] = useState<string[]>([]);
  const [storageAvailable, setStorageAvailable] = useState(true);
  useEffect(() => {
    function restore() {
      try {
        setWishIds(readNzBirdBasket(window.sessionStorage));
      } catch {
        setStorageAvailable(false);
      }
    }
    restore();
    window.addEventListener("pageshow", restore);
    window.addEventListener(NZ_BIRD_BASKET_EVENT, restore);
    return () => {
      window.removeEventListener("pageshow", restore);
      window.removeEventListener(NZ_BIRD_BASKET_EVENT, restore);
    };
  }, []);
  function chooseBirds(ids: string[]) {
    setWishIds(ids);
    try {
      setStorageAvailable(writeNzBirdBasket(window.sessionStorage, ids));
    } catch {
      setStorageAvailable(false);
    }
  }
  const backButton = useRef<HTMLButtonElement>(null);
  const regionBackButton = useRef<HTMLButtonElement>(null);
  const countryButtons = useRef<Record<string, HTMLButtonElement | null>>({});
  const destination =
    destinations.find((country) => country.id === selectedId) ??
    destinations[0];
  const regions = destinationRegions[destination?.id] ?? [];
  const region = regions.find((item) => item.id === regionId);
  const sharedHabitat = useContext(SouthIslandHabitatContext);
  const southIsland =
    zoomed && destination.id === "new-zealand" && region?.id === "south-island";
  const selectedPlace = sharedHabitat
    ? southIslandSlideIndex[sharedHabitat.slideIndex].place
    : undefined;
  const journey = useTripMap()?.journey;
  const journeyStep =
    journey &&
    zoomed &&
    destination.id === "new-zealand" &&
    journey.islandId === regionId
      ? journey.steps[journey.index]
      : null;
  const collection = journeyStep
    ? journeyBirdProfiles(
        getDestinationRegionBirds("new-zealand"),
        journeyStep,
        regionId,
        featuredNzBirdId,
      )
    : zoomed
      ? getDestinationRegionBirds(destination?.id, region?.id)
      : destinations.flatMap((item) => getDestinationRegionBirds(item.id));
  const conservationBirds = filterConservationBirds(
    collection,
    filters,
    zoomed ? destination.id : "world",
  );
  const birds =
    southIsland && !journeyStep
      ? filterSouthIslandBirds(conservationBirds, sharedHabitat?.value ?? "all")
      : conservationBirds;
  const filtering = birdFiltersActive(filters);
  const matchingRegionIds = regions
    .filter(
      (item) =>
        filterConservationBirds(
          getDestinationRegionBirds(destination.id, item.id),
          filters,
          destination.id,
        ).length > 0,
    )
    .map((item) => item.id);
  const matchingCountryIds = destinations
    .filter(
      (item) =>
        filterConservationBirds(
          getDestinationRegionBirds(item.id),
          filters,
          item.id,
        ).length > 0,
    )
    .map((item) => item.id);
  useEffect(() => {
    onScopeChange?.(zoomed ? destination.id : "", region?.id ?? "");
  }, [zoomed, destination.id, region?.id, onScopeChange]);
  const contactHref = enquiryHref(destination.id, region?.id);
  const galleryRegion =
    zoomed && !southIsland
      ? galleryPhoto?.countryId === destination.id
        ? galleryPhoto.regionId
        : regionId
      : "";
  const highlightedRegions = region
    ? [region.id]
    : showBirdAreas
      ? getBirdRegionIds(destination?.id, birdId || birds[0]?.id)
      : galleryRegion
        ? [galleryRegion]
        : [];
  useEffect(() => {
    if (destination)
      publish(
        zoomed
          ? { country: destination.id, regionId: region?.id }
          : { country: "global" },
      );
  }, [destination, region, zoomed, publish]);
  const previewPhoto = useCallback(
    (photo: GalleryPhoto) => setGalleryPhoto(photo),
    [],
  );
  const onBirdChange = useCallback(
    (bird: BirdProfile) => setBirdId(bird.id),
    [],
  );

  const selectDestination = (id: string) => {
    if (!destinations.some((country) => country.id === id)) return;
    setShowBirdAreas(false);
    navigate(explorerLocation(id));
    setBirdId("");
  };
  const selectRegion = (id: string) => {
    if (id && !regions.some((item) => item.id === id)) return;
    navigate(explorerLocation(selectedId, id));
    setBirdId("");
  };
  const backToWorld = () => {
    setShowBirdAreas(false);
    navigate(explorerLocation());
    setBirdId("");
    countryButtons.current[destination.id]?.focus({ preventScroll: true });
  };
  useEffect(() => {
    // The clicked world shape becomes inert during the transition. Move focus
    // to the new view's persistent exit without scrolling a phone's page.
    if (zoomed)
      (regionId ? regionBackButton : backButton).current?.focus({
        preventScroll: true,
      });
  }, [zoomed, selectedId, regionId]);
  if (!destination) return null;

  return localizeHome(
    <DestinationSelectionContext.Provider
      value={{
        selectedId: zoomed ? destination.id : "",
        selectDestination,
        zoomed,
        matchingCountryIds: filtering ? matchingCountryIds : undefined,
      }}
    >
      <BirdDiscoveryContext.Provider value={onBirdChange}>
        <div className="mx-auto max-w-6xl">
          <div
            className={`${styles.layout} ${journeyStep ? styles.journeyLayout : ""}`}
          >
            {/* Keep the divider mounted when countries change, preserving its split.
              Only the keyed viewer resets old slides, calls, timers and details. */}
            <ResizableDiscoveryPair
              journeyNavigation={
                journeyStep ? (
                  <TripJourneyMapNavigation islandId={regionId} />
                ) : undefined
              }
              guidedJourney={Boolean(journeyStep)}
              initialFace="map"
              mapCue={guideMapCue(
                zoomed ? destination.id : undefined,
                regionId,
                region?.name,
              )}
              birdCue={birds.find((bird) => bird.id === birdId) ?? birds[0]}
              mapLabel="Resize world map and bird photographs"
              map={
                <div
                  className={`${styles.mapPanel} scroll-mt-28 ${southIsland ? styles.layeredPanel : ""}`}
                  id={
                    !southIsland &&
                    destination.id === "new-zealand" &&
                    regionId === "north-island"
                      ? "north-island-bird-map"
                      : !southIsland && zoomed
                        ? "country-discovery-map"
                        : undefined
                  }
                >
                  {southIsland ? (
                    <div
                      id="south-island-bird-map"
                      className="scroll-mt-24 gap-2"
                    >
                      <SouthIslandEcosystemMap
                        matchingHabitats={
                          filtering
                            ? southIslandEcosystems
                                .filter(
                                  (item) =>
                                    filterSouthIslandBirds(
                                      conservationBirds,
                                      item.id,
                                    ).length > 0,
                                )
                                .map((item) => item.id)
                            : undefined
                        }
                        selected={sharedHabitat?.value ?? "all"}
                        onSelect={(value) => sharedHabitat?.select(value)}
                        places={southIslandDiscoveryIndex.places}
                        selectedPlace={selectedPlace?.id}
                        onSelectPlace={sharedHabitat?.selectPlace}
                        onZoomOutAtMinimum={() => selectRegion("")}
                        onSelectIsland={selectRegion}
                      />
                      <div className={styles.islandScope}>
                        <button
                          type="button"
                          className={styles.backButton}
                          onClick={backToWorld}
                        >
                          World
                        </button>
                        <label className="sr-only" htmlFor="explorer-island">
                          Explore an island
                        </label>
                        <select
                          id="explorer-island"
                          aria-label="Explore a New Zealand island"
                          value={regionId}
                          className={styles.regionSelect}
                          onChange={(event) => selectRegion(event.target.value)}
                        >
                          <option value="">All New Zealand</option>
                          {regions.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                              {filtering
                                ? ` · ${filterConservationBirds(getDestinationRegionBirds(destination.id, item.id), filters, destination.id).length} matches`
                                : ""}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ) : (
                    <MapViewer
                      listenControl={<RegionalSoundscapeSource country={zoomed ? destination.id : ""} region={regionId}/>}
                      geographicScope={{
                        country: zoomed ? destination.id : "",
                        region: regionId,
                        highlightRegion:
                          !regionId && !showBirdAreas
                            ? galleryRegion
                            : undefined,
                        selectCountry: (id) =>
                          id ? selectDestination(id) : backToWorld(),
                        selectRegion,
                      }}
                      layerControl={
                        <CountrySatelliteControl
                          country={zoomed ? destination.id : ""}
                          region={regionId}
                        />
                      }
                      label="Destination explorer map"
                      viewKey={`${selectedId}:${regionId}`}
                      onZoomOutAtMinimum={
                        zoomed
                          ? () => (region ? selectRegion("") : backToWorld())
                          : undefined
                      }
                      credits="AVES planning regions · Natural Earth public-domain geography"
                    >
                      <div
                        className={styles.mapStage}
                        data-map-view={zoomed ? "country" : "world"}
                      >
                        {/* Both views share one footprint. Inert also removes the hidden
                  world's SVG buttons from keyboard and assistive navigation. */}
                        <div
                          className={styles.worldView}
                          inert={zoomed}
                          aria-hidden={zoomed}
                        >
                          {map}
                        </div>
                        {zoomed && (
                          <figure
                            className={styles.countryView}
                            aria-label={`${destination.name} regional preview`}
                          >
                            <div className={styles.countryHeader}>
                              <button
                                ref={backButton}
                                type="button"
                                onClick={backToWorld}
                                className={styles.backButton}
                              >
                                <ArrowLeft
                                  className="h-4 w-4"
                                  aria-hidden="true"
                                />
                                Back to world
                              </button>
                              <h2 className="text-lg font-medium text-emerald-950">
                                Explore {destination.name}
                              </h2>
                            </div>
                            <div className={styles.regionalCanvas}>
                              <DestinationRegionalMap
                                country={destination.id}
                                selectedRegionId={region?.id}
                                highlightedRegionIds={highlightedRegions}
                                matchingRegionIds={
                                  filtering ? matchingRegionIds : undefined
                                }
                                onSelectRegion={selectRegion}
                              />
                            </div>
                            <figcaption className={styles.countryFooter}>
                              {region && (
                                <button
                                  ref={regionBackButton}
                                  type="button"
                                  onClick={() => selectRegion("")}
                                  className={styles.backButton}
                                >
                                  <ArrowLeft
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                  />
                                  Back to {destination.name}
                                </button>
                              )}
                              <label
                                htmlFor="homepage-region"
                                className="mb-2 block text-xs font-medium text-emerald-900"
                              >
                                Choose a region in {destination.name}
                              </label>
                              <select
                                id="homepage-region"
                                value={regionId}
                                onChange={(event) =>
                                  selectRegion(event.target.value)
                                }
                                className={styles.regionSelect}
                              >
                                <option value="">
                                  All featured {destination.name} birds
                                </option>
                                {regions.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                              {!region && (
                                <button
                                  type="button"
                                  aria-pressed={showBirdAreas}
                                  className={styles.backButton}
                                  onClick={() =>
                                    setShowBirdAreas((value) => !value)
                                  }
                                >
                                  {showBirdAreas
                                    ? "Hide bird areas"
                                    : "Show areas for this bird"}
                                </button>
                              )}
                              {region && region.href !== currentPath ? (
                                <a
                                  href={region.href}
                                  className={styles.regionLink}
                                >
                                  Explore {placeInSentence(region.name)}
                                  <ArrowRight
                                    className="h-4 w-4 shrink-0"
                                    aria-hidden="true"
                                  />
                                </a>
                              ) : (
                                <p className="mt-2 text-xs leading-5 text-emerald-900">
                                  Choose a region to zoom in and update the
                                  birds and planning notes here. Use Back to
                                  zoom out. Open its guide for more detail.
                                </p>
                              )}
                              <p className="mt-2 text-[10px] leading-4 text-gray-500">
                                {destination.id === "colombia" ? (
                                  `AVES planning-region selector · artwork in planning view; country geography in satellite view`
                                ) : (
                                  <>
                                    <a
                                      className="underline"
                                      href={
                                        destination.id === "australia"
                                          ? mapCueSources.australia
                                          : mapCueSources["new-zealand"]
                                      }
                                    >
                                      Natural Earth
                                    </a>{" "}
                                    ·{" "}
                                    {destination.id === "australia"
                                      ? "States and territories · external territories omitted"
                                      : "Main islands shown"}
                                  </>
                                )}
                                . Featured regions, not complete species ranges.
                              </p>
                            </figcaption>
                          </figure>
                        )}
                      </div>
                    </MapViewer>
                  )}
                </div>
              }
              media={
                <div
                  key={
                    zoomed
                      ? `${destination.id}:${regionId}:${journeyStep?.baseId || (southIsland ? sharedHabitat?.value : "")}`
                      : "world"
                  }
                  className={styles.mediaPanel}
                >
                  <DestinationCardMedia
                    destination={destination}
                    countryId={zoomed ? destination.id : "world"}
                    birds={birds}
                    label={
                      zoomed
                        ? `${region?.name ?? destination.name} bird photographs`
                        : "Birds across AVES destinations"
                    }
                    fillPanel
                    selection={
                      zoomed && destination.id === "new-zealand"
                        ? {
                            isSelected: (bird) =>
                              wishIds.includes(
                                featuredNzBirdId(bird.scientificName) || "",
                              ),
                            onToggle: (bird) => {
                              const id = featuredNzBirdId(bird.scientificName);
                              if (id)
                                chooseBirds(
                                  wishIds.includes(id)
                                    ? wishIds.filter((value) => value !== id)
                                    : [...wishIds, id],
                                );
                            },
                          }
                        : undefined
                    }
                  />
                </div>
              }
            />
            {zoomed && destination.id === "new-zealand" && (
              <TripJourneyControls islandId={regionId} />
            )}
          </div>
          <div
            role="group"
            aria-label="Choose a country to preview"
            className="mb-6 flex flex-wrap justify-center gap-2 sm:gap-3"
          >
            {destinations.map((country) => (
              <button
                key={country.id}
                ref={(node) => {
                  countryButtons.current[country.id] = node;
                }}
                type="button"
                aria-pressed={zoomed && destination.id === country.id}
                aria-controls="homepage-country-preview"
                onClick={() => selectDestination(country.id)}
                className={`inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${zoomed && destination.id === country.id ? "border-emerald-800 bg-emerald-800 text-white" : "border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50"}`}
              >
                {country.name}
              </button>
            ))}
          </div>
          <div
            id="homepage-country-preview"
            data-explorer-content={
              zoomed && !detailView
                ? `${destination.id}:${region?.id ?? ""}`
                : undefined
            }
            className="mb-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
          >
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-medium tracking-tight text-emerald-950">
                  {!zoomed ? (
                    "Choose your next destination"
                  ) : region ? (
                    <>
                      {region.name}
                      <span className="ml-2 text-sm font-normal text-emerald-800">
                        {" "}
                        · {destination.name}
                      </span>
                    </>
                  ) : (
                    destination.name
                  )}
                </h2>
              </div>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {!zoomed
                  ? "Choose a country, then drop your feather on a region to explore its birds and landscapes."
                  : region?.description || destination.description}
              </p>
            </div>
            {/* Selection stays on this page; this native link opens the chosen app. */}
            {(!zoomed ||
              (region?.href || destination.href) !== currentPath) && (
              <a
                href={
                  !zoomed ? "#destinations" : region?.href || destination.href
                }
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-3 rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
              >
                {!zoomed
                  ? "Choose a country on the map"
                  : `Explore ${placeInSentence(region?.name || destination.name)}`}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
          {zoomed && detailView && galleryRegion && !regionId && (
            <p
              role="status"
              className="mb-4 rounded-xl border border-emerald-200 bg-white p-3 text-sm text-emerald-900"
            >
              Map preview:{" "}
              {regions.find((item) => item.id === galleryRegion)?.name}. Your
              planning region is still open.{" "}
              <button
                type="button"
                className="min-h-11 underline"
                onClick={() => selectRegion(galleryRegion)}
              >
                Plan around this region
              </button>
            </p>
          )}
          {zoomed && detailView && (
            <section
              aria-label="Selected place planning"
              data-explorer-content={`${destination.id}:${region?.id ?? ""}`}
              className="mt-6 grid gap-5 rounded-3xl border border-emerald-100 bg-white p-5 sm:p-7 md:grid-cols-2"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
                  Your selected place
                </p>
                <h3 className="mt-2 text-xl font-medium text-emerald-950">
                  Plan around{" "}
                  {placeInSentence(region?.name || destination.name)}
                </h3>
                {southIsland && (
                  <label className="mt-4 block text-sm font-medium text-emerald-950">
                    Explore by ecosystem
                    <select
                      aria-label="Explore by ecosystem"
                      value={sharedHabitat?.value ?? "all"}
                      className={styles.regionSelect}
                      onChange={(event) =>
                        sharedHabitat?.select(
                          event.target.value as Parameters<
                            NonNullable<typeof sharedHabitat>["select"]
                          >[0],
                        )
                      }
                    >
                      <option value="all">All habitats</option>
                      {southIslandEcosystems.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  <a className={styles.regionLink} href={contactHref}>
                    Discuss your {region?.name || destination.name} trip
                  </a>
                  <a
                    className={styles.regionLink}
                    href={`/account?country=${destination.id}${region ? `&region=${region.id}` : ""}`}
                  >
                    Save a private trip brief
                  </a>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-emerald-950">
                  Birdlife and habitats
                </h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">
                  {birds.length} photographed species{" "}
                  {filtering ? "match your bird filters" : "in this view"}. Open
                  a bird’s information for its habitat, wider range and sources.
                  These photographs are a selection, not a complete checklist.
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-700">
                  {birds.slice(0, 3).map((bird) => (
                    <li key={bird.id}>
                      <span className="font-semibold">{bird.commonName}</span>:{" "}
                      {bird.localOccurrence || bird.habitat}
                    </li>
                  ))}
                </ul>
                {southIsland && (
                  <p className="mt-3 text-xs leading-6 text-gray-500">
                    Map layers include the existing DOC conservation land,
                    national parks, satellite background and curated public
                    places. Your layer choices stay selected when you zoom out
                    and return.
                  </p>
                )}
              </div>
            </section>
          )}
          {zoomed && detailView && !southIsland && (
            <PlaceGallery
              key={`${destination.id}:${regionId}`}
              selectedPlaceId={galleryPlaceId}
              mapHref={
                regionId === "north-island"
                  ? "#north-island-bird-map"
                  : "#country-discovery-map"
              }
              countryId={destination.id}
              countryName={destination.name}
              regionId={regionId}
              regions={regions}
              selectedPhotoId={
                galleryPhoto?.countryId === destination.id
                  ? galleryPhoto.id
                  : undefined
              }
              onPhotoPreview={previewPhoto}
              onPhotoChange={(photo) => {
                setGalleryPhoto(photo);
                setShowBirdAreas(false);
                try {
                  const url = new URL(window.location.href);
                  url.searchParams.set("place", photo.placeId);
                  setGalleryPlaceId(photo.placeId);
                  if (window.location.search !== url.search)
                    window.history.pushState(
                      window.history.state,
                      "",
                      `${url.pathname}${url.search}#place-gallery`,
                    );
                } catch {
                  setNavigationAvailable(false);
                }
              }}
              onRegionChange={selectRegion}
            />
          )}
          {southIsland && detailView && (
            <section
              id="places"
              aria-label="A few places to build around."
              className="mt-7"
            >
              <h2 className="text-2xl font-medium text-emerald-950">
                A few places to build around.
              </h2>
              <p className="mt-3 mb-5 text-sm leading-7 text-gray-600">
                These public landscape references share the habitat and place
                selections of the map above. They are planning ideas, not a
                promise of access or sightings.
              </p>
              <p className="mt-2 mb-5 text-sm text-emerald-800">
                {southIslandDiscoveryIndex.places
                  .map((place) => place.label)
                  .join(" · ")}
              </p>
              <SouthIslandPlacesExplorer />
            </section>
          )}
          {zoomed && detailView && destination.id === "new-zealand" && (
            <section
              aria-label="New Zealand bird wishes"
              className="mt-6 rounded-3xl border border-emerald-100 bg-white p-5 sm:p-7"
            >
              <h3 className="text-xl font-medium text-emerald-950">
                Birds you would love to see
              </h3>
              <p className="mt-2 text-sm leading-7 text-gray-600">
                Tap a photograph’s heart, or search the complete published New
                Zealand checklist, including endemics. This country checklist
                includes other islands and rare visitors. Inclusion does not
                mean a bird occurs in the selected region.
              </p>
              <div className="mt-5">
                <NewZealandBirdPicker
                  selected={wishIds}
                  onChange={chooseBirds}
                />
              </div>
              <a
                className={styles.regionLink}
                href={`/account?country=new-zealand${region ? `&region=${region.id}` : ""}`}
              >
                Save {wishIds.length || "your"} bird choices in a private brief
              </a>
              <p className="mt-2 text-xs leading-6 text-gray-500">
                {storageAvailable
                  ? "Unsaved choices stay in this browser tab for up to a day. Sign in, review and save your private draft. Sharing with AVES remains a separate step."
                  : "This browser cannot carry your choices between pages. Choose birds in the private brief before saving."}
              </p>
            </section>
          )}
          {!navigationAvailable && (
            <p role="status" className="mt-3 text-xs text-gray-600">
              Your map works here, but this browser could not update its
              address. Refresh may return to this page’s starting place.
            </p>
          )}
          <p role="status" className="sr-only">
            {zoomed
              ? `${destination.name}${region ? `, ${region.name}` : ""} selected. Showing ${birds.length} featured bird photographs and its regional map. Back to world returns to the overview.`
              : `World overview. No destination selected. Showing ${birds.length} birds across AVES destinations.`}
          </p>
          <noscript>
            <p className="mt-4 text-sm text-emerald-900">
              Open a destination:{" "}
              {destinations.map((country) => (
                <a
                  key={country.id}
                  href={country.href}
                  className="mr-4 inline-flex min-h-11 items-center underline"
                >
                  {country.name}
                </a>
              ))}
            </p>
          </noscript>
        </div>
      </BirdDiscoveryContext.Provider>
    </DestinationSelectionContext.Provider>,
  );
}
