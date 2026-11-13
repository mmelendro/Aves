import "server-only";
import { requireAccountUser } from "@/lib/account-auth";
import { accountHandler } from "./account-http";
import { AccountError } from "./account-errors";
import { albumSchema } from "./bird-album";
import { workspaceSchema } from "./trip-workspace";
import {
  collectAlbumEntries,
  collectionQuerySchema,
  type CollectionEntry,
} from "./bird-collection";
import {
  getReferenceSpecies,
  isSpeciesCountry,
  collectionCatalogue,
} from "./species-reference";
import { nzChecklistMedia } from "@/content/new-zealand-checklist-media";
import imageCredits from "@/content/image-credits.json";
import type { SpeciesCountry } from "./species-reference-types";
const unavailable = () =>
  new AccountError(
    503,
    "Your collection could not be confirmed. No records have been changed. Please retry.",
  );
const countries: SpeciesCountry[] = ["colombia", "australia", "new-zealand"];
function referenceImage(entry: CollectionEntry) {
  if (!isSpeciesCountry(entry.country)) return null;
  if (entry.country === "new-zealand") {
    const m = nzChecklistMedia.get(entry.speciesId);
    if (m)
      return {
        src: m.bird.image,
        kind:
          m.kind === "illustration"
            ? "Reference illustration"
            : "Reference photograph",
        creator: m.credit.creator,
        license: m.credit.license,
        sourceUrl: m.credit.sourceUrl,
        licenseUrl: m.credit.licenseUrl,
        location: m.credit.location,
        modifications: m.credit.modifications,
      };
  }
  const guide = getReferenceSpecies(entry.country, entry.speciesId)?.guide,
    credit = guide && imageCredits.images.find((i) => i.path === guide.image);
  if (
    !guide ||
    !credit ||
    !/^(?:CC BY|CC0|Public domain)/i.test(credit.license)
  )
    return null;
  return {
    src: guide.image,
    kind: "Reference photograph",
    creator: credit.creator,
    license: credit.license,
    sourceUrl: credit.sourceUrl,
    licenseUrl: credit.licenseUrl,
    location: "location" in credit ? String(credit.location) : "",
    modifications:
      "modifications" in credit ? String(credit.modifications) : "",
  };
}
/** Bound the owner-level read to the latest 100 plans and disclose that scope.
 * Country IDs remain part of species identity; desired and observed references
 * can coexist. Photo access is rechecked against active same-trip journal data. */
export const birdCollectionGet = (request: Request) =>
  accountHandler(async () => {
    const { client, user } = await requireAccountUser(),
      url = new URL(request.url),
      parsed = collectionQuerySchema.safeParse(
        Object.fromEntries(url.searchParams),
      );
    if (!parsed.success)
      throw new AccountError(
        400,
        "Choose a country, record state and a short search.",
      );
    const query = parsed.data;
    const plansResult = await client
      .from("trip_plans")
      .select("id,title,details", { count: "exact" })
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })
      .limit(100);
    if (plansResult.error || !Array.isArray(plansResult.data))
      throw unavailable();
    const plans = plansResult.data.filter((p) =>
        isSpeciesCountry(p.details?.country ?? "australia"),
      ),
      byId = new Map(plans.map((p) => [p.id, p])),
      ids = plans.map((p) => p.id);
    const rows = ids.length
      ? await client
          .from("trip_bird_albums")
          .select("plan_id,revision,data")
          .in("plan_id", ids)
      : { data: [], error: null };
    if (rows.error || !Array.isArray(rows.data)) throw unavailable();
    const sources = rows.data.map((row) => {
      const plan = byId.get(row.plan_id),
        album = albumSchema.safeParse(row.data);
      if (!plan || !album.success) throw unavailable();
      return {
        planId: plan.id,
        title: plan.title,
        country: plan.details?.country ?? "australia",
        data: album.data,
      };
    });
    const entries = collectAlbumEntries(sources, (country, id) =>
      isSpeciesCountry(country) ? getReferenceSpecies(country, id) : undefined,
    );
    const summaries = countries.map((c) => ({
      ...collectionCatalogue(c),
      desired: entries.filter(
        (e) => e.country === c && e.desired && e.currentCatalogue,
      ).length,
      observed: entries.filter(
        (e) => e.country === c && e.observed && e.currentCatalogue,
      ).length,
    }));
    const term = query.q.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase();
    const matches = entries.filter(
      (e) =>
        (!query.country || query.country === e.country) &&
        (query.state === "all" || e[query.state]) &&
        `${e.commonName} ${e.scientificName}`
          .normalize("NFKD")
          .replace(/\p{M}/gu, "")
          .toLowerCase()
          .includes(term),
    );
    const offset = Math.min(
        Math.floor(query.offset / 24) * 24,
        Math.max(0, Math.floor((matches.length - 1) / 24) * 24),
      ),
      page = matches.slice(offset, offset + 24);
    let media: {
      id: string;
      plan_id: string;
      entry_id: string;
      creator: string;
      caption: string;
    }[] = [];
    const activeEntries = new Map<string, Set<string>>();
    if (page.some((e) => e.references.some((r) => r.photoId))) {
      const pagePlans = [
        ...new Set(page.flatMap((e) => e.references.map((r) => r.planId))),
      ];
      const [uploads, workspaces] = await Promise.all([
        client
          .from("trip_media")
          .select("id,plan_id,entry_id,creator,caption")
          .eq("user_id", user.id)
          .in("plan_id", pagePlans)
          .eq("state", "ready")
          .eq("kind", "photo"),
        client
          .from("trip_workspaces")
          .select("plan_id,data")
          .in("plan_id", pagePlans),
      ]);
      if (
        uploads.error ||
        workspaces.error ||
        !Array.isArray(uploads.data) ||
        !Array.isArray(workspaces.data)
      )
        throw unavailable();
      media = uploads.data;
      for (const row of workspaces.data) {
        if (!byId.has(row.plan_id)) throw unavailable();
        const parsed = workspaceSchema.safeParse(row.data);
        if (!parsed.success) throw unavailable();
        activeEntries.set(
          row.plan_id,
          new Set(
            parsed.data.entries.filter((e) => !e.deleted).map((e) => e.id),
          ),
        );
      }
    }
    const items = page.map((entry) => {
      const linked = entry.references.flatMap((r) => {
        const photo = media.find(
          (m) =>
            m.id === r.photoId &&
            m.plan_id === r.planId &&
            m.entry_id === r.journalEntryId &&
            activeEntries.get(r.planId)?.has(m.entry_id),
        );
        return photo
          ? [
              {
                src: `/api/account/plans/${r.planId}/media/${photo.id}/content`,
                creator: photo.creator,
                caption: photo.caption,
                kind: "Your linked photo",
              },
            ]
          : [];
      })[0];
      return {
        ...entry,
        ownerPhoto: linked ?? null,
        referenceImage: referenceImage(entry),
      };
    });
    return {
      generatedAt: new Date().toISOString(),
      scope: "Latest 100 saved trips; country catalogues remain separate.",
      plansIncluded: plans.length,
      olderTripsExcluded: (plansResult.count ?? plans.length) > 100,
      total: entries.length,
      matched: matches.length,
      offset,
      limit: 24,
      catalogues: summaries,
      items,
    };
  });
