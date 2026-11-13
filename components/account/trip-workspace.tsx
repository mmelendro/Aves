"use client";
import { useUnsavedChanges } from "./unsaved-changes";
import { useUiCopy, UiText } from "@/components/ui-copy-context";

import { useEffect, useId, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { JournalPreview } from "./journal-preview";
import { TripTravelRecords } from "./trip-travel-records";
import { TripMediaProvider, TripJournalMedia } from "./trip-journal-media";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { accountRequest, errorMessage } from "./account-api";
import {
  arrangementStates,
  privateReferenceUrl,
  emptyWorkspace,
  journalPlaces,
  preparationCategories,
  workspaceReceiptSchema,
  workspaceSchema,
  type JournalEntry,
  type Preparation,
  type TripWorkspaceData,
} from "@/lib/trip-workspace";
import type { TripCountry } from "@/content/trip-options";

const PrivateBirdAlbum = dynamic(() => import("./bird-album"), {
  loading: () => (
    <p>
      <UiText source="Opening your bird album…" />
    </p>
  ),
});
const SavedItineraryEditor = dynamic(() => import("./saved-itinerary-editor"), {
  loading: () => (
    <p role="status">
      <UiText source="Opening saved itineraries…" />
    </p>
  ),
});
const field =
  "block min-h-11 w-full min-w-0 rounded-xl border border-emerald-200 bg-white px-3 py-2 text-sm text-emerald-950";
export function TripWorkspace({
  planId,
  country,
}: {
  planId: string;
  country: TripCountry;
}) {
  const uiCopy = useUiCopy();

  const prefix = useId(),
    busyRef = useRef(false);
  const [data, setData] = useState<TripWorkspaceData>(emptyWorkspace),
    [revision, setRevision] = useState(0);
  const [loading, setLoading] = useState(true),
    [busy, setBusy] = useState(false),
    [dirty, setDirty] = useState(false);
  const [feedback, setFeedback] = useState(""),
    [failed, setFailed] = useState(false);
  const [taskTitle, setTaskTitle] = useState(""),
    [entryTitle, setEntryTitle] = useState("");
  const [trash, setTrash] = useState(false);
  useEffect(() => {
    let active = true;
    accountRequest<unknown>(`/api/account/plans/${planId}/workspace`)
      .then((result) => {
        const saved = workspaceReceiptSchema.parse(result);
        if (active) {
          setData(saved.data);
          setRevision(saved.revision);
          setFailed(false);
        }
      })
      .catch((error) => {
        if (active) {
          setFeedback(errorMessage(error));
          setFailed(true);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [planId]);
  useUnsavedChanges(
    dirty || Boolean(taskTitle) || Boolean(entryTitle),
    uiCopy("You have unsaved workspace edits. Leave and discard them?"),
  );
  function change(next: TripWorkspaceData) {
    setData(next);
    setDirty(true);
    setFeedback("");
  }
  function task(id: string, values: Partial<Preparation>) {
    change({
      ...data,
      tasks: data.tasks.map((item) =>
        item.id === id ? { ...item, ...values } : item,
      ),
    });
  }
  function entry(id: string, values: Partial<JournalEntry>) {
    change({
      ...data,
      entries: data.entries.map((item) =>
        item.id === id ? { ...item, ...values } : item,
      ),
    });
  }
  async function save() {
    if (busyRef.current) return;
    if (taskTitle || entryTitle) {
      setFeedback("Add your new item before saving, or clear its title.");
      return;
    }
    const parsed = workspaceSchema.safeParse(data);
    if (!parsed.success) {
      setFeedback(
        parsed.error.issues[0]?.message ||
          "Check dates, links and note lengths before saving.",
      );
      return;
    }
    busyRef.current = true;
    setBusy(true);
    setFeedback("");
    try {
      const raw = await accountRequest<unknown>(
        `/api/account/plans/${planId}/workspace`,
        {
          method: "PUT",
          body: JSON.stringify({
            expectedRevision: revision,
            data: parsed.data,
          }),
        },
      );
      const result = workspaceReceiptSchema.parse(raw);
      if (
        result.revision !== revision + 1 ||
        JSON.stringify(result.data) !== JSON.stringify(parsed.data)
      )
        throw new Error(
          "The saved result did not match these notes. Keep them here and retry.",
        );
      setData(result.data);
      setRevision(result.revision);
      setDirty(false);
      setFeedback("Your private checklist and journal are saved.");
    } catch (error) {
      setFeedback(errorMessage(error));
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  }
  const places = journalPlaces(country);
  if (loading)
    return (
      <p role="status">{uiCopy("Opening your private trip workspace…")}</p>
    );
  if (failed)
    return (
      <div
        role="alert"
        className="rounded-2xl border border-emerald-200 bg-white p-6"
      >
        <p>{uiCopy(feedback)}</p>
        <p className="mt-3">
          {uiCopy(
            "Reopen this page to try again. No empty workspace has been saved over your records.",
          )}
        </p>
      </div>
    );
  return (
    <TripMediaProvider planId={planId}>
      <div className="space-y-7 min-w-0">
        <nav
          aria-label={uiCopy("Trip workspace sections")}
          className="sm:sticky sm:top-32 z-20 flex flex-wrap gap-2 rounded-2xl border border-emerald-200 bg-white/95 p-3 shadow-sm"
        >
          {[
            ["trip-overview", "Overview"],
            ...(country === "new-zealand" ? [["trip-route", "Route"]] : []),
            ["trip-checklist", "Checklist"],
            ["trip-journal", "Journal"],
            ["trip-album", "Bird album"],
            ["trip-records", "Expenses and bookings"],
            ["trip-pack", "Offline pack"],
          ].map(([id, label]) => (
            <a
              key={id}
              className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm text-emerald-900 underline"
              href={`#${id}`}
            >
              {uiCopy(label)}
            </a>
          ))}
        </nav>
        <section
          className="rounded-2xl border border-emerald-200 bg-white p-5 sm:p-7 shadow-sm"
          id="trip-overview"
          style={{ scrollMarginTop: "16rem" }}
          aria-label={uiCopy("Private trip workspace")}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-emerald-700">
                {uiCopy("Just for you")}
              </p>
              <h2 className="mt-2 text-2xl font-medium text-emerald-950">
                {uiCopy("Prepare. Explore. Remember.")}
              </h2>
            </div>
            <Button
              type="button"
              onClick={() => void save()}
              disabled={busy || !dirty}
              className="bg-emerald-700 hover:bg-emerald-800"
            >
              {busy ? uiCopy("Saving…") : uiCopy("Save workspace")}
            </Button>
          </div>
          <p className="mt-4 text-sm leading-6 text-gray-600">
            {uiCopy(
              "Your checklist and journal belong to this trip. Sharing a planning brief with AVES does not share these records. A checked task does not confirm a booking.",
            )}
          </p>
          <a
            className="mt-3 inline-flex min-h-11 items-center underline text-emerald-800"
            href={country === "new-zealand" ? "#trip-route" : "#trip-checklist"}
          >
            {uiCopy(
              country === "new-zealand"
                ? "Resume your route"
                : "Resume your checklist",
            )}
          </a>
          <p role="status" className="mt-3 text-sm text-emerald-800">
            {dirty
              ? uiCopy(
                  "You have unsaved changes. Save before leaving this page.",
                )
              : revision
                ? uiCopy("Showing your saved workspace.")
                : uiCopy("Start your first checklist or journal entry.")}
          </p>
          {feedback && (
            <p role="alert" className="mt-3 text-sm text-emerald-950">
              {uiCopy(feedback)}
            </p>
          )}
        </section>
        {country === "new-zealand" && (
          <div id="trip-route" className="scroll-mt-64">
            <SavedItineraryEditor planId={planId} />
          </div>
        )}
        <fieldset disabled={busy} className="space-y-7 min-w-0">
          <section
            id="trip-checklist"
            style={{ scrollMarginTop: "16rem" }}
            aria-labelledby={`${prefix}-tasks`}
            className="rounded-2xl border border-emerald-100 bg-white p-5 sm:p-7"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2
                id={`${prefix}-tasks`}
                className="text-2xl font-medium text-emerald-950"
              >
                {uiCopy("Before you go")}
              </h2>
              <p className="text-sm text-emerald-700">
                {data.tasks.filter((t) => t.done && !t.deleted).length} of{" "}
                {data.tasks.filter((t) => !t.deleted).length}{" "}
                {uiCopy(" completed")}
              </p>
            </div>
            <form
              className="mt-5 flex flex-wrap items-end gap-3"
              onSubmit={(event) => {
                event.preventDefault();
                if (!taskTitle.trim() || data.tasks.length >= 50) return;
                change({
                  ...data,
                  tasks: [
                    ...data.tasks,
                    {
                      id: crypto.randomUUID(),
                      title: taskTitle.trim(),
                      category: "Other",
                      done: false,
                      dueDate: "",
                      notes: "",
                      url: "",
                      arrangement: "idea",
                      deleted: false,
                    },
                  ],
                });
                setTaskTitle("");
              }}
            >
              <label className="min-w-0 flex-1 text-sm text-emerald-950">
                {uiCopy("New preparation")}
                <Input
                  aria-label={uiCopy("New preparation")}
                  value={taskTitle}
                  onChange={(event) => setTaskTitle(event.target.value)}
                  maxLength={160}
                  required
                  className="mt-2"
                  placeholder={uiCopy("Arrange airport transport")}
                />
              </label>
              <Button
                variant="outline"
                type="submit"
                disabled={data.tasks.length >= 50}
              >
                {uiCopy("Add to checklist")}
              </Button>
            </form>
            {data.tasks.length >= 50 && (
              <p className="mt-3 text-sm">
                {uiCopy(
                  "This trip has reached its 50 preparation limit, including removed items.",
                )}
              </p>
            )}
            <div className="mt-5 space-y-3">
              {data.tasks
                .filter((item) => !item.deleted)
                .map((item) => (
                  <article
                    key={item.id}
                    className="rounded-xl border border-emerald-100 p-4"
                  >
                    <label className="flex items-center gap-3 font-medium text-emerald-950">
                      <input
                        type="checkbox"
                        checked={item.done}
                        onChange={(event) =>
                          task(item.id, { done: event.target.checked })
                        }
                        className="h-5 w-5 accent-emerald-700"
                      />
                      <span className="min-w-0 break-words">{item.title}</span>
                    </label>
                    <details className="mt-3">
                      <summary className="min-h-11 cursor-pointer text-sm text-emerald-700">
                        {uiCopy("Details, dates and references")}
                      </summary>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="text-sm">
                          {uiCopy("Preparation title")}
                          <input
                            className={field}
                            value={item.title}
                            maxLength={160}
                            onChange={(e) =>
                              task(item.id, { title: e.target.value })
                            }
                          />
                        </label>
                        <label className="text-sm">
                          {uiCopy("Category")}
                          <select
                            className={field}
                            value={item.category}
                            onChange={(e) =>
                              task(item.id, {
                                category: e.target
                                  .value as Preparation["category"],
                              })
                            }
                          >
                            {preparationCategories.map((category) => (
                              <option value={category} key={category}>
                                {uiCopy(category)}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="text-sm">
                          {uiCopy("Due date, optional")}
                          <input
                            type="date"
                            className={field}
                            value={item.dueDate}
                            onChange={(e) =>
                              task(item.id, { dueDate: e.target.value })
                            }
                          />
                        </label>
                        <label className="text-sm">
                          {uiCopy("Arrangement status")}
                          <select
                            className={field}
                            value={item.arrangement}
                            onChange={(e) =>
                              task(item.id, {
                                arrangement: e.target
                                  .value as Preparation["arrangement"],
                              })
                            }
                          >
                            {arrangementStates.map((state) => (
                              <option key={state} value={state}>
                                {uiCopy(
                                  state.charAt(0).toUpperCase() +
                                    state.slice(1),
                                )}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="text-sm sm:col-span-2">
                          {uiCopy("Private reference link, optional")}
                          <input
                            type="url"
                            className={field}
                            placeholder="https://"
                            value={item.url}
                            maxLength={1500}
                            onChange={(e) =>
                              task(item.id, { url: e.target.value })
                            }
                          />
                        </label>
                        <label className="text-sm sm:col-span-2">
                          {uiCopy("Your notes")}
                          <textarea
                            className={field}
                            value={item.notes}
                            maxLength={500}
                            rows={3}
                            onChange={(e) =>
                              task(item.id, { notes: e.target.value })
                            }
                          />
                        </label>
                      </div>
                      {item.url &&
                        privateReferenceUrl.safeParse(item.url).success && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex min-h-11 items-center text-sm text-emerald-800 underline"
                          >
                            {uiCopy("Open reference in another tab")}
                          </a>
                        )}
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => task(item.id, { deleted: true })}
                      >
                        {uiCopy("Move preparation to removed items")}
                      </Button>
                    </details>
                  </article>
                ))}
            </div>
          </section>
          <section
            id="trip-journal"
            style={{ scrollMarginTop: "16rem" }}
            aria-labelledby={`${prefix}-journal`}
            className="rounded-2xl border border-emerald-100 bg-white p-5 sm:p-7"
          >
            <p className="text-xs uppercase tracking-widest text-emerald-700">
              {uiCopy("Your journey, in your words")}
            </p>
            <h2
              id={`${prefix}-journal`}
              className="mt-2 text-2xl font-medium text-emerald-950"
            >
              {uiCopy("Trip journal")}
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              {uiCopy(
                "Add a memory or a practical note. Dates, days and places are your own associations, not verified visits or sightings.",
              )}
            </p>
            <form
              className="mt-5 flex flex-wrap items-end gap-3"
              onSubmit={(event) => {
                event.preventDefault();
                if (!entryTitle.trim() || data.entries.length >= 50) return;
                change({
                  ...data,
                  entries: [
                    ...data.entries,
                    {
                      id: crypto.randomUUID(),
                      title: entryTitle.trim(),
                      body: "",
                      date: "",
                      day: null,
                      placeId: "",
                      deleted: false,
                    },
                  ],
                });
                setEntryTitle("");
              }}
            >
              <label className="min-w-0 flex-1 text-sm">
                {uiCopy("New journal entry")}
                <Input
                  aria-label={uiCopy("New journal entry")}
                  value={entryTitle}
                  onChange={(e) => setEntryTitle(e.target.value)}
                  maxLength={160}
                  required
                  className="mt-2"
                  placeholder={uiCopy("A morning beside the lake")}
                />
              </label>
              <Button
                type="submit"
                variant="outline"
                disabled={data.entries.length >= 50}
              >
                {uiCopy("Add journal entry")}
              </Button>
            </form>
            {data.entries.length >= 50 && (
              <p className="mt-3 text-sm">
                {uiCopy(
                  "This trip has reached its 50 journal entry limit, including removed items.",
                )}
              </p>
            )}
            <div className="mt-5 space-y-5">
              {data.entries
                .filter((item) => !item.deleted)
                .map((item) => (
                  <article
                    key={item.id}
                    id={`journal-entry-${item.id}`}
                    className="scroll-mt-24 rounded-xl border border-emerald-100 bg-emerald-50/30 p-4 sm:p-5 space-y-4"
                  >
                    <label className="block text-sm">
                      {uiCopy("Entry title")}
                      <input
                        className={field}
                        value={item.title}
                        maxLength={160}
                        onChange={(e) =>
                          entry(item.id, { title: e.target.value })
                        }
                      />
                    </label>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <label className="text-sm">
                        {uiCopy("Date, optional")}
                        <input
                          className={field}
                          type="date"
                          value={item.date}
                          onChange={(e) =>
                            entry(item.id, { date: e.target.value })
                          }
                        />
                      </label>
                      <label className="text-sm">
                        {uiCopy("Trip day, optional")}
                        <input
                          className={field}
                          type="number"
                          min={1}
                          max={365}
                          value={item.day ?? ""}
                          onChange={(e) =>
                            entry(item.id, {
                              day: e.target.value
                                ? Number(e.target.value)
                                : null,
                            })
                          }
                        />
                      </label>
                    </div>
                    <label className="block text-sm">
                      {uiCopy("Public place or region, optional")}
                      <select
                        className={field}
                        value={item.placeId}
                        onChange={(e) =>
                          entry(item.id, { placeId: e.target.value })
                        }
                      >
                        <option value="">{uiCopy("No place selected")}</option>
                        {places.map((place) => (
                          <option key={place.id} value={place.id}>
                            {place.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block text-sm">
                      {uiCopy("Journal notes")}
                      <textarea
                        className={field}
                        value={item.body}
                        rows={5}
                        maxLength={3000}
                        onChange={(e) =>
                          entry(item.id, { body: e.target.value })
                        }
                      />
                    </label>
                    <TripJournalMedia
                      entryId={item.id}
                      enabled={!dirty && !busy}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => entry(item.id, { deleted: true })}
                    >
                      {uiCopy("Move entry to removed items")}
                    </Button>
                  </article>
                ))}
            </div>
          </section>
          <section className="rounded-2xl border border-emerald-100 bg-white p-5">
            <Button
              type="button"
              variant="outline"
              aria-expanded={trash}
              onClick={() => setTrash(!trash)}
            >
              {uiCopy("Removed items (")}
              {data.tasks.filter((t) => t.deleted).length +
                data.entries.filter((e) => e.deleted).length}
              )
            </Button>
            {trash && (
              <div className="mt-4 space-y-3">
                <p className="text-sm text-gray-600">
                  {uiCopy(
                    "Removed items stay private and can be restored. Save to keep a removal or restoration.",
                  )}
                </p>
                {data.tasks
                  .filter((t) => t.deleted)
                  .map((t) => (
                    <div
                      key={t.id}
                      className="flex flex-wrap items-center justify-between gap-3"
                    >
                      <span className="min-w-0 break-words">{t.title}</span>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => task(t.id, { deleted: false })}
                      >
                        {uiCopy("Restore preparation")}
                      </Button>
                    </div>
                  ))}
                {data.entries
                  .filter((e) => e.deleted)
                  .map((e) => (
                    <div
                      key={e.id}
                      className="flex flex-wrap items-center justify-between gap-3"
                    >
                      <span className="min-w-0 break-words">{e.title}</span>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => entry(e.id, { deleted: false })}
                      >
                        {uiCopy("Restore journal entry")}
                      </Button>
                    </div>
                  ))}
              </div>
            )}
          </section>
        </fieldset>
        <JournalPreview
          data={data}
          country={country}
          ready={!dirty && !busy && !loading && !failed}
        />
        <div id="trip-album" className="scroll-mt-64">
          <PrivateBirdAlbum planId={planId} country={country} />
        </div>
        <div id="trip-records" className="scroll-mt-64">
          <TripTravelRecords
            planId={planId}
            entries={data.entries}
            preparations={data.tasks}
            workspaceRevision={revision}
            workspaceSaved={!dirty && !busy}
          />
        </div>
      </div>
    </TripMediaProvider>
  );
}
