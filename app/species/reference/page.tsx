import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GlobalHeader, GlobalFooter } from "@/components/global-navigation";
import { CountrySpeciesInventory } from "@/components/country-species-inventory";
import {
  isSpeciesCountry,
  searchSpeciesReference,
} from "@/lib/species-reference";
import { readSpeciesQuery } from "@/lib/species-reference-query";
import { publicMetadata } from "@/lib/public-metadata";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = readSpeciesQuery(await searchParams);
  const country = params?.get("country") ?? "colombia";
  const name =
    country === "australia"
      ? "Australia"
      : country === "new-zealand"
        ? "New Zealand"
        : "Colombia";
  const filtered = params
    ? [...params.keys()].some((key) => key !== "country")
    : true;
  return publicMetadata({
    title: `${name} Bird Species Inventory`,
    description: `Browse the dated ${name} bird reference, with reviewed regional associations, sources and public places.`,
    alternates: {
      canonical: `https://aves.bio/species/reference?country=${isSpeciesCountry(country) ? country : "colombia"}`,
    },
    robots: { index: Boolean(params) && !filtered, follow: true },
  });
}

export default async function SpeciesReferencePage({ searchParams }: Props) {
  const params = readSpeciesQuery(await searchParams);
  if (!params) notFound();
  const country = params.get("country") ?? "colombia";
  if (!isSpeciesCountry(country)) notFound();
  const data = searchSpeciesReference(country, params);
  if (!data) notFound();
  return (
    <div className="min-h-screen bg-stone-50/40">
      <GlobalHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
      >
        <p className="text-sm font-medium text-emerald-700">
          AVES species reference
        </p>
        <h1 className="mt-3 text-balance text-3xl font-medium text-emerald-950 sm:text-4xl">
          Explore {data.name}’s bird inventory
        </h1>
        <p className="mb-8 mt-4 max-w-2xl leading-7 text-gray-700">
          Search beyond the featured photographs. Discover the source behind
          each record and the places we have reviewed so far.
        </p>
        <CountrySpeciesInventory data={data} params={params} />
      </main>
      <GlobalFooter />
    </div>
  );
}
