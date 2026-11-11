/** Public navigation only. Reuse the reviewed country/region URLs and sitemap
 * inventories so a tree edit cannot quietly drop a published guide. */
import { destinations } from "@/content/destinations";
import { destinationRegions } from "@/content/destination-regions";
import { publicNavigationGroups } from "@/lib/public-navigation";

export type SiteTreeNode = {
  id: string;
  label: string;
  href?: string;
  children?: SiteTreeNode[];
  hint?: string;
};
const countryLinks = new Set(
  destinations.map((country) => country.href as string),
);
const regionLinks = new Set(
  Object.values(destinationRegions).flatMap(
    (regions) => regions?.map((region) => region.href) ?? [],
  ),
);
/** Ownership is content metadata, never inferred from a group title or identifier. */
export function buildDestinationSiteTree(
  groups = publicNavigationGroups,
): SiteTreeNode {
  const groupsFor = (country: string | null) =>
    groups.flatMap((group) => {
      if (group.country !== country) return [];
      const pages = group.pages.filter(
        (page) =>
          page.href !== "/" &&
          !countryLinks.has(page.href) &&
          !regionLinks.has(page.href),
      );
      return pages.length
        ? [
            {
              id: group.id,
              label: group.title,
              children: pages.map((page) => ({
                id: page.href,
                label: page.label,
                href: page.href,
              })),
            },
          ]
        : [];
    });
  return {
    id: "world",
    label: "World",
    href: "/",
    hint: "All destinations",
    children: [
      ...destinations.map((country) => ({
        id: country.id,
        label: country.name,
        href: country.href,
        hint: `${destinationRegions[country.id]?.length ?? 0} regions`,
        children: [
          ...(destinationRegions[country.id] ?? []).map((region) => {
            const page = groups
              .flatMap((group) => group.pages)
              .find((page) => page.href === region.href);
            return {
              id: `${country.id}:${region.id}`,
              label: region.name,
              href: region.href,
              children: page?.sections?.map((section) => ({
                id: `${region.href}#${section.id}`,
                label: section.label,
                href: `${region.href}#${section.id}`,
              })),
            };
          }),
          ...groupsFor(country.id),
        ],
      })),
      {
        id: "website-information",
        label: "Website information",
        children: groupsFor(null).flatMap((group) => group.children ?? []),
      },
    ],
  };
}
export const destinationSiteTree = buildDestinationSiteTree();
