"use client";
import { useEffect, useState } from "react";
import CollectionPhoto from "./collection-photo";
import {
  accountRequest,
  AccountRequestError,
  errorMessage,
  dateLabel,
} from "./account-api";
import {
  collectionResponseSchema,
  type BirdCollectionResponse,
} from "@/lib/bird-collection";
import { useUiCopy } from "@/components/ui-copy-context";
export default function PrivateBirdCollection() {
  const uiCopy = useUiCopy();
  const [data, setData] = useState<BirdCollectionResponse | null>(null),
    [country, setCountry] = useState(""),
    [state, setState] = useState("all"),
    [query, setQuery] = useState(""),
    [offset, setOffset] = useState(0),
    [loading, setLoading] = useState(true),
    [feedback, setFeedback] = useState(""),
    [refresh, setRefresh] = useState(0);
  const [sessionExpired, setSessionExpired] = useState(false);
  const requestKey = JSON.stringify([country, state, query, offset]);
  const [dataKey, setDataKey] = useState("");
  // Results belong to the exact requested filters, including during a failed refresh.
  useEffect(() => {
    let live = true;
    const abort = new AbortController();
    setLoading(true);
    setSessionExpired(false);
    const timer = setTimeout(
      () => {
        const params = new URLSearchParams({
          country,
          state,
          q: query,
          offset: String(offset),
        });
        accountRequest<unknown>(`/api/account/collection?${params}`, {
          signal: abort.signal,
        })
          .then((raw) => {
            const result = collectionResponseSchema.parse(raw);
            if (live) {
              setData(result);
              setDataKey(requestKey);
              setFeedback("");
            }
          })
          .catch((e) => {
            if (live) {
              setFeedback(errorMessage(e));
              setSessionExpired(
                e instanceof AccountRequestError && e.status === 401,
              );
            }
          })
          .finally(() => {
            if (live) setLoading(false);
          });
      },
      query ? 250 : 0,
    );
    return () => {
      live = false;
      clearTimeout(timer);
      abort.abort();
    };
  }, [country, state, query, offset, refresh, requestKey]);
  const field =
    "mt-1 block min-h-11 w-full rounded-xl border border-emerald-200 bg-white px-3 py-2";
  return (
    <section
      aria-label={uiCopy("Your private bird collection")}
      aria-busy={loading}
      className="space-y-6"
    >
      <p className="leading-7 text-emerald-950">
        {uiCopy(
          "Bring together your bird albums across trips. Wish lists and your observations stay distinct. Every observation is unverified. Photos do not create or verify sightings.",
        )}
      </p>
      <p className="text-sm leading-6 text-gray-600">
        {uiCopy(
          "Country catalogues keep their own stable identities. A bird can appear in a wish list for one trip and an observation for another. Reference totals describe the named national catalogue, not a target, regional checklist or promise of sightings.",
        )}
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="text-sm">
          {uiCopy("Country")}
          <select
            className={field}
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setOffset(0);
            }}
          >
            <option value="">{uiCopy("All countries")}</option>
            <option value="colombia">Colombia</option>
            <option value="australia">Australia</option>
            <option value="new-zealand">{uiCopy("New Zealand")}</option>
          </select>
        </label>
        <label className="text-sm">
          {uiCopy("Record state")}
          <select
            className={field}
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              setOffset(0);
            }}
          >
            <option value="all">{uiCopy("Desired and observed")}</option>
            <option value="desired">{uiCopy("Desired")}</option>
            <option value="observed">{uiCopy("Observed, unverified")}</option>
          </select>
        </label>
        <label className="text-sm">
          {uiCopy("Find a bird")}
          <input
            type="search"
            maxLength={120}
            className={field}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOffset(0);
            }}
          />
        </label>
      </div>
      <button
        type="button"
        className="min-h-11 rounded-lg border border-emerald-300 px-4"
        disabled={loading}
        onClick={() => setRefresh((n) => n + 1)}
      >
        {uiCopy("Refresh collection")}
      </button>
      {loading && (
        <p role="status">{uiCopy("Loading your private collection…")}</p>
      )}
      {feedback && <p role="alert">{uiCopy(feedback)}</p>}
      {sessionExpired && (
        <a
          className="inline-flex min-h-11 items-center underline"
          href="/account/sign-in?next=%2Faccount%2Fcollection"
        >
          {uiCopy("Sign in to reopen your collection")}
        </a>
      )}
      {data && dataKey === requestKey && !loading && !feedback && (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            {data.catalogues
              .filter((c) => !country || c.countryId === country)
              .map((c) => (
                <article
                  key={c.countryId}
                  className="rounded-2xl border border-emerald-200 bg-white p-5"
                >
                  <h2 className="text-xl">{c.name}</h2>
                  <p className="mt-2">
                    {c.observed} {uiCopy("observed, unverified")} / {c.total}{" "}
                    {uiCopy("catalogue entries")}
                  </p>
                  <progress
                    className="mt-2 w-full accent-emerald-700"
                    max={c.total || 1}
                    value={c.observed}
                    aria-label={`${c.name}: ${uiCopy("observed catalogue entries")}`}
                  />
                  <p className="mt-2 text-sm">
                    {c.desired} {uiCopy("distinct entries in wish lists")}
                  </p>
                  <details className="mt-3 text-xs leading-6">
                    <summary className="min-h-11 cursor-pointer">
                      {uiCopy("Catalogue scope and source")}
                    </summary>
                    <p>{c.scope}</p>
                    <p>
                      {uiCopy("Reviewed")}: {c.reviewed}
                    </p>
                    {c.sources.map((s) => (
                      <p key={s.url}>
                        <a
                          href={s.url}
                          className="underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {s.title} · {s.edition}
                        </a>
                      </p>
                    ))}
                  </details>
                </article>
              ))}
          </div>
          <p className="text-sm">
            {data.matched} {uiCopy("distinct matching catalogue entries")} ·{" "}
            {data.plansIncluded} {uiCopy("saved trips reviewed")} ·{" "}
            {uiCopy("Updated")}: {dateLabel(data.generatedAt)}.
          </p>
          {data.olderTripsExcluded && (
            <p className="text-sm">
              {uiCopy(
                "This view covers your latest 100 saved trips. Older trip albums remain available in My Trips.",
              )}
            </p>
          )}
          {!data.items.length ? (
            <p className="rounded-2xl bg-emerald-50 p-6">
              {uiCopy(
                "No matching bird records yet. Add desired birds or your own observations to a trip's private album, then refresh this collection.",
              )}
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {data.items.map((item) => (
                <article
                  key={item.key}
                  className="min-w-0 space-y-3 rounded-2xl border border-emerald-200 bg-white p-4"
                >
                  <CollectionPhoto
                    key={
                      item.key +
                      ":" +
                      (item.ownerPhoto?.src ||
                        item.referenceImage?.src ||
                        "none")
                    }
                    item={item}
                  />
                  <h2 className="text-xl text-emerald-950">
                    {item.commonName}
                  </h2>
                  <p className="text-sm italic">{item.scientificName}</p>
                  <p className="text-xs">
                    {uiCopy(
                      item.country === "new-zealand"
                        ? "New Zealand"
                        : item.country === "colombia"
                          ? "Colombia"
                          : "Australia",
                    )}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {item.desired && (
                      <span className="rounded-full bg-emerald-50 px-3 py-2">
                        {uiCopy("Desired")}
                      </span>
                    )}
                    {item.observed && (
                      <span className="rounded-full bg-blue-50 px-3 py-2">
                        {uiCopy("Observed, unverified")}
                      </span>
                    )}
                  </div>
                  {!item.currentCatalogue && (
                    <p className="text-xs">
                      {uiCopy(
                        "Historical or unmatched catalogue record. Kept for review and excluded from current catalogue progress.",
                      )}
                    </p>
                  )}
                  <details>
                    <summary className="min-h-11 cursor-pointer">
                      {uiCopy("Linked trip records")} ({item.references.length})
                    </summary>
                    <ul className="space-y-2 text-sm">
                      {item.references.map((r) => (
                        <li key={`${r.planId}:${r.recordId}`}>
                          <a
                            href={`/account/trips/${r.planId}`}
                            className="inline-flex min-h-11 items-center underline"
                          >
                            {r.title}
                          </a>
                          <p>
                            {uiCopy(
                              r.state === "desired"
                                ? "Desired"
                                : "Observed, unverified",
                            )}
                            {r.date ? ` · ${dateLabel(r.date)}` : ""}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </details>
                </article>
              ))}
            </div>
          )}
          <div className="flex flex-wrap justify-between gap-4">
            <button
              type="button"
              className="min-h-11 underline"
              disabled={loading || data.offset === 0}
              onClick={() => setOffset(Math.max(0, data.offset - data.limit))}
            >
              {uiCopy("Previous birds")}
            </button>
            <button
              type="button"
              className="min-h-11 underline"
              disabled={loading || data.offset + data.limit >= data.matched}
              onClick={() => setOffset(data.offset + data.limit)}
            >
              {uiCopy("Next birds")}
            </button>
          </div>
        </>
      )}
    </section>
  );
}
