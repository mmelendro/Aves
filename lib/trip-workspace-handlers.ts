import "server-only";
import { z } from "zod";
import { requireAccountUser } from "@/lib/account-auth";
import { accountBody, accountHandler } from "./account-http";
import { AccountError } from "./account-errors";
import {
  emptyWorkspace,
  workspaceSchema,
  workspaceWriteSchema,
  workspacePlacesValid,
} from "./trip-workspace";
import { isKnownTripCountry } from "@/content/trip-options";
import type { SupabaseClient } from "@supabase/supabase-js";

const unavailable = () =>
  new AccountError(
    503,
    "Your trip workspace could not be confirmed. Keep your notes and try again.",
  );
export async function requireOwnedTrip(
  client: SupabaseClient,
  userId: string,
  id: string,
) {
  if (!z.uuid().safeParse(id).success)
    throw new AccountError(404, "This trip could not be found.");
  const { data, error } = await client
    .from("trip_plans")
    .select("id,details")
    .eq("id", id)
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw unavailable();
  if (!data) throw new AccountError(404, "This trip could not be found.");
  const country = data.details?.country ?? "australia";
  if (!isKnownTripCountry(country)) throw unavailable();
  return country;
}
export async function readWorkspace(client: SupabaseClient, id: string) {
  const { data, error } = await client
    .from("trip_workspaces")
    .select("revision,data")
    .eq("plan_id", id)
    .maybeSingle();
  if (error) throw unavailable();
  if (!data) return { revision: 0, data: emptyWorkspace() };
  const parsed = workspaceSchema.safeParse(data.data);
  if (!parsed.success || !Number.isSafeInteger(data.revision))
    throw unavailable();
  return { revision: data.revision as number, data: parsed.data };
}
export const workspaceGet = (id: string) =>
  accountHandler(async () => {
    const { user, client } = await requireAccountUser();
    await requireOwnedTrip(client, user.id, id);
    return readWorkspace(client, id);
  });
export const workspacePut = (request: Request, id: string) =>
  accountHandler(async () => {
    const { user, client } = await requireAccountUser();
    const body = await accountBody(request, workspaceWriteSchema);
    const country = await requireOwnedTrip(client, user.id, id);
    if (!workspacePlacesValid(body.data, country))
      throw new AccountError(
        400,
        "Choose a public place in this trip’s country.",
      );
    const next = body.expectedRevision + 1;
    const query =
      body.expectedRevision === 0
        ? client
            .from("trip_workspaces")
            .insert({ plan_id: id, revision: next, data: body.data })
        : client
            .from("trip_workspaces")
            .update({ revision: next, data: body.data })
            .eq("plan_id", id)
            .eq("revision", body.expectedRevision);
    const { data, error } = await query.select("revision,data").maybeSingle();
    if (error && error.code !== "23505") throw unavailable();
    if (!error && data)
      return {
        revision: data.revision,
        data: workspaceSchema.parse(data.data),
      };
    // A lost receipt is safe to retry only if the next revision contains this exact validated content.
    const current = await readWorkspace(client, id);
    if (
      current.revision === next &&
      JSON.stringify(current.data) === JSON.stringify(body.data)
    )
      return current;
    throw new AccountError(
      409,
      "This workspace changed in another tab. Your unsaved notes are still here. Copy them before reopening the saved version.",
    );
  });
