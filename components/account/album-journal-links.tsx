"use client";
import { useState } from "react";
import { useUiCopy } from "@/components/ui-copy-context";
import type { AlbumBird, AlbumLinks } from "@/lib/bird-album";
export default function AlbumJournalLinks({
  planId,
  bird,
  options,
  onChange,
}: {
  planId: string;
  bird: AlbumBird;
  options: AlbumLinks | null;
  onChange: (patch: Partial<AlbumBird>) => void;
}) {
  const uiCopy = useUiCopy(),
    [view, setView] = useState(false),
    [failed, setFailed] = useState(false);
  const photo = options?.photos.find((p) => p.id === bird.photoId),
    entry = options?.entries.find((e) => e.id === bird.journalEntryId);
  return (
    <div className="space-y-3 border-t border-emerald-100 pt-3 text-sm">
      {bird.journalEntryId && (
        <p>
          {entry ? (
            <a
              className="inline-flex min-h-11 items-center underline"
              href={`#journal-entry-${entry.id}`}
            >
              {uiCopy("Open linked journal entry")}: {entry.title}
            </a>
          ) : (
            uiCopy(
              options
                ? "The linked journal entry is no longer active. You can keep the historical reference or clear it."
                : "A journal entry is linked. Load saved links to review it.",
            )
          )}
        </p>
      )}
      {bird.photoId && (
        <>
          <p>
            {uiCopy("Creator recorded when linked")}:{" "}
            {bird.photoCredit || uiCopy("Not entered")}
          </p>
          {options && !photo ? (
            <p>
              {uiCopy(
                "The linked photo is unavailable. Its recorded attribution is retained.",
              )}
            </p>
          ) : (
            <button
              type="button"
              className="min-h-11 underline"
              onClick={() => {
                setView((v) => !v);
                setFailed(false);
              }}
            >
              {uiCopy(view ? "Close linked photo" : "View linked photo")}
            </button>
          )}
          {view && !failed && (
            // eslint-disable-next-line @next/next/no-img-element -- Private media must use browser session cookies, without an image proxy.
            <img
              src={`/api/account/plans/${planId}/media/${bird.photoId}/content`}
              alt={
                photo?.caption ||
                uiCopy(
                  "Owner linked bird photograph, identification unverified",
                )
              }
              className="max-h-64 w-full rounded-lg object-contain"
              onError={() => setFailed(true)}
            />
          )}{" "}
          {view && failed && (
            <p role="status">
              {uiCopy(
                "The linked photo could not be opened. Refresh saved links and retry.",
              )}
            </p>
          )}
        </>
      )}
      {options && (
        <>
          <label className="block">
            {uiCopy("Linked journal entry")}
            <select
              aria-label={uiCopy("Linked journal entry")}
              className="mt-1 min-h-11 w-full rounded-lg border border-emerald-200 bg-white px-2"
              value={bird.journalEntryId || ""}
              onChange={(e) => {
                setView(false);
                onChange({
                  journalEntryId: e.target.value || undefined,
                  photoId: undefined,
                  photoCredit: undefined,
                });
              }}
            >
              <option value="">{uiCopy("No journal link")}</option>
              {bird.journalEntryId && !entry && (
                <option value={bird.journalEntryId}>
                  {uiCopy("Saved entry, no longer active")}
                </option>
              )}
              {options.entries.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.title}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            {uiCopy("Linked photo")}
            <select
              aria-label={uiCopy("Linked photo")}
              disabled={!bird.journalEntryId}
              className="mt-1 min-h-11 w-full rounded-lg border border-emerald-200 bg-white px-2"
              value={bird.photoId || ""}
              onChange={(e) => {
                setView(false);
                const selected = options.photos.find(
                  (p) => p.id === e.target.value,
                );
                onChange({
                  photoId: selected?.id,
                  photoCredit: selected?.creator,
                });
              }}
            >
              <option value="">{uiCopy("No photo link")}</option>
              {bird.photoId && !photo && (
                <option value={bird.photoId}>
                  {uiCopy("Saved photo, unavailable")}
                </option>
              )}
              {options.photos
                .filter((p) => p.entryId === bird.journalEntryId)
                .map((p, i) => (
                  <option key={p.id} value={p.id}>
                    {p.caption || `${uiCopy("Photo")} ${i + 1}`} ·{" "}
                    {p.creator || uiCopy("Creator not entered")}
                  </option>
                ))}
            </select>
          </label>
        </>
      )}
      {(bird.journalEntryId || bird.photoId) && (
        <button
          type="button"
          className="min-h-11 underline"
          onClick={() => {
            setView(false);
            onChange({
              journalEntryId: undefined,
              photoId: undefined,
              photoCredit: undefined,
            });
          }}
        >
          {uiCopy("Clear journal and photo links")}
        </button>
      )}
      <p className="text-xs">
        {uiCopy(
          "Links do not identify a bird automatically or verify an observation. Review and save the album after changing them.",
        )}
      </p>
    </div>
  );
}
