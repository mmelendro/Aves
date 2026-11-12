import "server-only";
import { requireAccountUser } from "@/lib/account-auth";
import { accountBody, accountHandler } from "./account-http";
import { AccountError } from "./account-errors";
import { requireOwnedTrip } from "./trip-workspace-handlers";
import {
  emptyTravelRecords,
  recordsSchema,
  recordsWriteSchema,
  type TravelRecords,
} from "./trip-records";
import type { SupabaseClient } from "@supabase/supabase-js";
const unavailable = () =>
  new AccountError(
    503,
    "Your travel records could not be confirmed. Keep your edits and retry.",
  );
export async function readTripRecords(client: SupabaseClient, planId: string) {
  const { data, error } = await client
    .from("trip_records")
    .select("revision,data")
    .eq("plan_id", planId)
    .maybeSingle();
  if (error) throw unavailable();
  if (!data) return { revision: 0, data: emptyTravelRecords() };
  const parsed = recordsSchema.safeParse(data.data);
  if (!parsed.success || !Number.isInteger(data.revision) || data.revision < 1)
    throw unavailable();
  return { revision: data.revision as number, data: parsed.data };
}
export const recordsGet = (planId: string) =>
  accountHandler(async () => {
    const { user, client } = await requireAccountUser();
    await requireOwnedTrip(client, user.id, planId);
    return readTripRecords(client, planId);
  });
async function validateJournalLinks(
  client: SupabaseClient,
  planId: string,
  data: TravelRecords,
) {
  if (!data.records.some((r) => r.entryId)) return;
  const { data: workspace, error } = await client
    .from("trip_workspaces")
    .select("data")
    .eq("plan_id", planId)
    .maybeSingle();
  if (error) throw unavailable();
  const ids = new Set(
    (workspace?.data?.entries || []).map((entry: { id: string }) => entry.id),
  );
  if (data.records.some((r) => r.entryId && !ids.has(r.entryId)))
    throw new AccountError(
      400,
      "Choose a saved journal entry from this trip for your receipt or document.",
    );
}
export const recordsPut = (request: Request, planId: string) =>
  accountHandler(async () => {
    const { user, client } = await requireAccountUser(),
      body = await accountBody(request, recordsWriteSchema);
    await requireOwnedTrip(client, user.id, planId);
    await validateJournalLinks(client, planId, body.data);
    const next = body.expectedRevision + 1;
    const query =
      body.expectedRevision === 0
        ? client
            .from("trip_records")
            .insert({ plan_id: planId, revision: next, data: body.data })
        : client
            .from("trip_records")
            .update({ revision: next, data: body.data })
            .eq("plan_id", planId)
            .eq("revision", body.expectedRevision);
    const { data, error } = await query.select("revision,data").maybeSingle();
    if (error && error.code !== "23505") throw unavailable();
    if (!error && data)
      return { revision: data.revision, data: recordsSchema.parse(data.data) };
    const current = await readTripRecords(client, planId);
    if (
      current.revision === next &&
      JSON.stringify(current.data) === JSON.stringify(body.data)
    )
      return current;
    throw new AccountError(
      409,
      "Travel records changed in another tab. Export or copy your unsaved edits before reopening.",
    );
  });
