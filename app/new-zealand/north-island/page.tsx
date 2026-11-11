import type { Metadata } from "next";
import { publicMetadata } from "@/lib/public-metadata";
import { canonicalUrl } from "@/lib/site-path";
import { GlobalHeader, GlobalFooter } from "@/components/global-navigation";
import DestinationExplorerPage from "@/components/destination-explorer-page";
import WorldDestinationMap from "@/components/world-destination-map";
import NorthIslandTripPlanner from "@/components/north-island-trip-planner";
const path = "/new-zealand/north-island";
export const metadata: Metadata = publicMetadata({
  title: {
    absolute: "North Island birding and trip planning | AVES New Zealand",
  },
  description:
    "Plan a three to seven day Auckland, Hamilton and Rotorua nature trip. Explore sourced bird opportunities, stays, walks, culture and thermal pools.",
  alternates: { canonical: canonicalUrl(path) },
});
export default function NorthIslandPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <GlobalHeader />
      <main id="main-content" tabIndex={-1}>
        <DestinationExplorerPage
          initialRegionId="north-island"
          map={<WorldDestinationMap />}
        >
          <section id="corridor" className="scroll-mt-24 py-10 sm:py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <p className="text-sm uppercase tracking-widest text-emerald-700">
                A first North Island route
              </p>
              <h2 className="mt-3 text-3xl font-medium text-emerald-950">
                Auckland to Hamilton to Rotorua
              </h2>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
                Start rested in Auckland and finish in Rotorua. Explore native
                forest, gardens and lakeside birdlife, with time for food, local
                culture or thermal pools. This three base pilot covers 3 to 7
                days. It does not include an Auckland return journey or an
                international flight connection.
              </p>
              <div className="mt-7 grid gap-6 md:grid-cols-3">
                {[
                  [
                    "Auckland",
                    "Public native forest paths at Tōtara Park and the adjoining Botanic Gardens can begin the trip. Tiritiri Matangi is an optional separate ferry day, subject to dated sailings, weather and biosecurity checks.",
                  ],
                  [
                    "Hamilton",
                    "Choose Hamilton Gardens or the public restoration landscape at Waiwhakareke. Maungatautari is an additional excursion to Pukeatua with its own transport and access arrangements.",
                  ],
                  [
                    "Rotorua",
                    "Use public paths at Sulphur Bay for sourced local bird opportunities. Longer stays can add a Redwoods walk, Te Puia, mineral pools or Wingspan’s managed falconry experience.",
                  ],
                ].map(([name, text]) => (
                  <article
                    key={name}
                    className="rounded-2xl border border-emerald-100 p-6"
                  >
                    <h3 className="text-xl font-medium text-emerald-950">
                      {name}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-gray-600">
                      {text}
                    </p>
                  </article>
                ))}
              </div>
              <p className="mt-6 text-sm leading-7 text-gray-600">
                The planner uses public source links rather than live sightings.
                Wild outings, free living restoration sanctuaries and captive
                demonstrations are labelled separately. Keep unmatched bird
                wishes visible. Three day plans allow only one short local
                outing on each arrival day. Use five to seven days for extra
                excursions and a gentler pace.
              </p>
            </div>
          </section>
          <NorthIslandTripPlanner />
          <section
            id="travel-with-care"
            className="scroll-mt-24 bg-stone-50 py-12"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-medium text-emerald-950">
                Respect the place and its hosts
              </h2>
              <div className="mt-5 grid gap-7 md:grid-cols-2">
                <div>
                  <p className="leading-7 text-gray-600">
                    We recognise Māori as tangata whenua. Choose cultural
                    experiences led by people sharing their own stories, with
                    their consent and on their terms. Public references do not
                    imply an AVES partnership or certification.
                  </p>
                  <p className="mt-4 leading-7 text-gray-600">
                    Stay on designated paths, give nesting and roosting birds
                    space, never feed wildlife and avoid playing calls in the
                    field. Follow local forest, waterway and island biosecurity
                    instructions. Sulphur Bay has fragile geothermal ground.
                    Check current DOC guidance before walking.
                  </p>
                </div>
                <div>
                  <p className="leading-7 text-gray-600">
                    Road estimates cover named towns only. Exact accommodation
                    addresses, local travel, weather, track access and departure
                    arrangements need a fresh check. Stays, food, ferry and
                    transport prices remain open until quoted. Published
                    admission references do not price the whole trip.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <a
                      className="inline-flex min-h-11 items-center font-semibold text-emerald-800 underline"
                      href="https://www.journeys.nzta.govt.nz/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Check NZTA road conditions
                    </a>
                    <a
                      className="inline-flex min-h-11 items-center font-semibold text-emerald-800 underline"
                      href="/account?country=new-zealand&region=north-island"
                    >
                      Start your private North Island brief
                    </a>
                  </div>
                </div>
              </div>
              <p className="mt-6 text-xs leading-6 text-gray-500">
                Source review 11 November 2026 UTC. Settlement points are broad
                planning references, not entrances or wildlife coordinates.
                Choose Satellite in Layers for the corridor bases and your
                itinerary on the same map.
              </p>
            </div>
          </section>
        </DestinationExplorerPage>
      </main>
      <GlobalFooter />
    </div>
  );
}
