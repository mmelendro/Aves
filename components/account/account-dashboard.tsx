"use client";
import { useUiCopy, UiText } from "@/components/ui-copy-context";

/**
 * Signed-in visitor's browser workspace for drafts, quote requests, and proposals.
 * The server supplies the display email, then the component fetches private data
 * through the account API. Local React state makes the UI responsive; only a
 * successful server receipt confirms that a change has actually been saved.
 */

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { SiteLink as Link } from "@/components/site-link";
import {
  Bird,
  Edit3,
  LogOut,
  MapPin,
  Plus,
  RefreshCw,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import {
  AccountRequestError,
  accountRequest,
  dateLabel,
  errorMessage,
  countryLabel,
  regionSummary,
  type Proposal,
  type TripPlan,
} from "./account-api";
import { PlanningAnswers } from "./planning-questions";
import { ProposalCard } from "./proposal-card";
import { confirmDiscardPendingEdits } from "./unsaved-changes";
import { DeleteDraft } from "./delete-draft";
const TripPlanEditor = dynamic(
  () => import("./trip-plan-editor").then((m) => m.TripPlanEditor),
  { loading: () => <p role="status">Opening your trip editor…</p> },
);
import { NZ_BIRD_BASKET_KEY } from "@/lib/nz-bird-selection";
import { accountPlanPath, type PlanIntent } from "./plan-intent";
import { accountEntryHref } from "./account-navigation";
import dynamic from "next/dynamic";
const SavedTripTools = dynamic(() => import("./saved-trip-tools"), {
  loading: () => (
    <p role="status">
      <UiText source="Opening your saved trip tools…" />
    </p>
  ),
});

/**
 * Submit a saved plan's revision and contact name; call onSubmitted only for a confirmed stored receipt.
 */
function QuoteRequestForm({
  plan,
  onSubmitted,
  onCancel,
}: {
  plan: TripPlan;
  onSubmitted: (plan: TripPlan) => void;
  onCancel: () => void;
}) {
  const uiCopy = useUiCopy();

  const prefix = useId();
  const request = useRef<{ payload: string; key: string } | null>(null);
  const busyRef = useRef(false);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busyRef.current) return;
    const values = new FormData(event.currentTarget);
    const payload = JSON.stringify({
      expectedUpdatedAt: plan.updatedAt,
      contactName: String(values.get("contactName") || "").trim(),
    });
    busyRef.current = true;
    setBusy(true);
    setFeedback("");
    try {
      // Keep the retry key until a stored receipt arrives. A lost response must
      // not create a second quote request from the same unchanged submission.
      if (request.current?.payload !== payload)
        request.current = { payload, key: crypto.randomUUID() };
      const result = await accountRequest<{
        success: boolean;
        status: string;
        requestId: string;
        plan: TripPlan;
      }>(`/api/account/plans/${plan.id}/quote-requests`, {
        method: "POST",
        headers: { "Idempotency-Key": request.current.key },
        body: payload,
      });
      if (
        result.success !== true ||
        result.status !== "stored" ||
        !result.requestId ||
        result.plan?.id !== plan.id ||
        result.plan.status !== "quote_requested"
      )
        throw new Error(
          "Your quote request could not be confirmed. Please try again.",
        );
      request.current = null;
      onSubmitted(result.plan);
    } catch (error) {
      setFeedback(
        error instanceof AccountRequestError && error.status === 409
          ? `${error.message} Cancel this request, then choose Refresh Saved Plans to see its current status.`
          : errorMessage(error),
      );
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  }
  return (
    <form
      onSubmit={submit}
      className="mt-6 border-t border-gray-200 pt-6 space-y-4"
    >
      <fieldset disabled={busy} className="space-y-4">
        <div>
          <label
            htmlFor={`${prefix}-name`}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {uiCopy("Your Name *")}
          </label>
          <Input
            id={`${prefix}-name`}
            name="contactName"
            autoComplete="name"
            maxLength={120}
            required
          />
        </div>
        <p className="text-sm text-gray-600">
          {plan.country === "new-zealand"
            ? uiCopy(
                "Share this reviewed planning brief privately with AVES. A submitted copy is kept unchanged; start another draft for later changes. No tour, price or availability is confirmed.",
              )
            : uiCopy(
                "Send this saved plan to AVES for a personal quote. These details will become a submitted record; to change them later, start another draft. This does not create a booking.",
              )}
        </p>
        {plan.country !== "new-zealand" && (
          <p className="text-sm text-gray-600">
            {uiCopy(
              "Proposals for Colombia and Australia are currently quoted in Australian dollars (AUD).",
            )}
          </p>
        )}
        <div className="flex flex-wrap gap-3">
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
            <Send className="w-4 h-4 mr-2" />
            {busy
              ? uiCopy("Submitting…")
              : plan.country === "new-zealand"
                ? uiCopy("Share Planning Brief")
                : uiCopy("Submit Quote Request")}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            {uiCopy("Cancel")}
          </Button>
        </div>
      </fieldset>
      {feedback && (
        <p className="text-sm text-red-700" role="alert">
          {uiCopy(feedback)}
        </p>
      )}
    </form>
  );
}

/**
 * Load the signed-in client's plans/proposals; optional initialPlan opens a prefilled unsaved draft.
 */
export function AccountDashboard({
  email,
  initialPlan,
}: {
  email: string;
  initialPlan?: PlanIntent;
}) {
  const uiCopy = useUiCopy();

  const returnPath = accountPlanPath(initialPlan);
  const [plans, setPlans] = useState<TripPlan[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [editing, setEditing] = useState<TripPlan | "new" | null>(
    initialPlan ? "new" : null,
  );
  const [requesting, setRequesting] = useState<string | null>(null);
  const [signingOut, setSigningOut] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      // These independent reads can run together. Both endpoints verify the
      // session; filtering issued proposals here is only an extra display check.
      const [saved, issued] = await Promise.all([
        accountRequest<{ plans: TripPlan[]; isAdmin?: boolean }>(
          "/api/account/plans",
        ),
        accountRequest<{ proposals: Proposal[] }>("/api/account/proposals"),
      ]);
      if (!Array.isArray(saved.plans) || !Array.isArray(issued.proposals))
        throw new Error(
          "Your account information could not be loaded. Please try again.",
        );
      setPlans(saved.plans);
      setProposals(
        issued.proposals.filter((proposal) => proposal.status === "sent"),
      );
      setIsAdmin(saved.isAdmin === true);
    } catch (error) {
      setIsAdmin(false);
      if (error instanceof AccountRequestError && error.status === 401)
        window.location.assign(
          accountEntryHref("/account/sign-in", returnPath),
        );
      else setError(errorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [returnPath]);
  useEffect(() => {
    void load();
  }, [load]);
  // Local sign-out ends this browser's session; it does not request sign-out on
  // every other device. The redirect removes the current workspace from view.
  async function signOut() {
    if (!confirmDiscardPendingEdits()) return;
    setSigningOut(true);
    setError("");
    try {
      const { error } = await createClient().auth.signOut({ scope: "local" });
      if (error) throw error;
      try {
        window.sessionStorage.removeItem(NZ_BIRD_BASKET_KEY);
      } catch {
        /* Storage may be blocked. */
      }
      window.location.replace("/account/sign-in");
    } catch (error) {
      setError(errorMessage(error));
      setSigningOut(false);
    }
  }
  // Receive a confirmed server result and update its visible card, not the database.
  function replacePlan(plan: TripPlan) {
    setPlans((current) => [
      plan,
      ...current.filter((item) => item.id !== plan.id),
    ]);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-gray-600 break-all">
          {uiCopy("Signed in as ")}
          <span className="font-medium text-gray-900">{email}</span>
        </p>
        <Button variant="outline" onClick={signOut} disabled={signingOut}>
          <LogOut className="w-4 h-4 mr-2" />
          {signingOut ? uiCopy("Signing out…") : uiCopy("Sign Out")}
        </Button>
      </div>
      {isAdmin && (
        <Card className="border-0 shadow-lg bg-emerald-50">
          <CardContent className="p-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-emerald-900 font-medium">
              {uiCopy("Your private AVES owner workspace")}
            </p>
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/admin/quotes">{uiCopy("Open Quote Inbox")}</Link>
            </Button>
          </CardContent>
        </Card>
      )}
      {error && (
        <Card className="border-0 shadow-lg bg-white">
          <CardContent className="p-6">
            <p role="alert" className="text-red-700 mb-4">
              {uiCopy(error)}
            </p>
            <Button
              variant="outline"
              onClick={() => void load()}
              disabled={loading}
            >
              {uiCopy("Try Again")}
            </Button>
          </CardContent>
        </Card>
      )}
      {feedback && (
        <p className="text-emerald-700 font-medium" role="status">
          {uiCopy(feedback)}
        </p>
      )}
      {!loading && !error && (
        <section className="space-y-4">
          <button
            type="button"
            className="min-h-11 rounded-lg border border-emerald-300 bg-white px-4 text-emerald-950"
            aria-expanded={toolsOpen}
            onClick={() => setToolsOpen(!toolsOpen)}
          >
            {uiCopy("Favourite places and itinerary comparison")}
          </button>
          {toolsOpen && <SavedTripTools plans={plans} onSaved={replacePlan} />}
        </section>
      )}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
          {uiCopy("My Trip Plans")}
        </h2>
        <Button asChild variant="outline">
          <Link href="/account/collection">{uiCopy("My bird collection")}</Link>
        </Button>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() => void load()}
            disabled={Boolean(editing || requesting) || loading}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            {uiCopy("Refresh Saved Plans")}
          </Button>
          <Button
            onClick={() => {
              setEditing("new");
              setFeedback("");
            }}
            disabled={Boolean(editing || requesting) || loading}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            {uiCopy("Start a New Plan")}
          </Button>
        </div>
      </div>
      {editing && (
        <TripPlanEditor
          key={editing === "new" ? "new" : editing.id}
          plan={editing === "new" ? undefined : editing}
          initial={initialPlan}
          onCancel={() => setEditing(null)}
          onSaved={(plan) => {
            replacePlan(plan);
            setEditing(null);
            setFeedback(
              plan.country === "new-zealand"
                ? "Your private planning draft is saved. Review it below, edit it, or choose Share with AVES when ready."
                : "Your trip draft has been saved. You can keep refining it or request a quote when you're ready.",
            );
          }}
        />
      )}
      {loading ? (
        <p role="status" className="text-gray-600">
          {uiCopy("Loading your saved plans…")}
        </p>
      ) : plans.length === 0 && !error ? (
        <Card className="border-0 shadow-lg bg-white">
          <CardContent className="p-8 text-center">
            <Bird className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {uiCopy("A Little Curiosity Is a Good Start")}
            </h3>
            <p className="text-gray-600 mb-5">
              {uiCopy(
                "Save the birds, places and experiences you'd love to explore. You don't need a finished itinerary.",
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <a
                href="https://aves.bio/aves-explorer"
                className="text-emerald-700 underline"
              >
                {uiCopy("Explore Colombian Regions")}
              </a>
              <Link
                href="/australia/aves-explorer"
                className="text-emerald-700 underline"
              >
                {uiCopy("Explore Australian Regions")}
              </Link>
              <Link href="/new-zealand" className="text-emerald-700 underline">
                {uiCopy("Explore New Zealand")}
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <Card key={plan.id} className="border-0 shadow-lg bg-white">
              <CardContent className="p-6 lg:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <h3 className="text-xl font-bold text-gray-900 break-words">
                    {plan.title}
                  </h3>
                  <Badge
                    className={
                      plan.status === "draft"
                        ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                        : "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                    }
                  >
                    {plan.status === "draft"
                      ? uiCopy("Draft")
                      : plan.country === "new-zealand"
                        ? uiCopy("Brief Shared")
                        : uiCopy("Quote Requested")}
                  </Badge>
                </div>
                <p className="flex items-start gap-2 text-sm text-emerald-700 mb-4">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  {countryLabel(plan.country)} ·{" "}
                  {regionSummary(plan.regions, plan.country)}
                </p>
                <dl className="grid sm:grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <dt className="font-semibold text-gray-900">
                      {uiCopy("Travel Timing")}
                    </dt>
                    <dd className="text-gray-600">
                      {plan.travelWhen || uiCopy("Flexible")}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900">
                      {uiCopy("Group Size")}
                    </dt>
                    <dd className="text-gray-600">
                      {plan.partySize || uiCopy("Still deciding")}
                    </dd>
                  </div>
                </dl>
                <details className="mb-5 rounded-xl border border-emerald-100 p-3">
                  <summary className="min-h-11 cursor-pointer text-sm text-emerald-800">
                    {uiCopy("Review brief and notes")}
                  </summary>
                  <PlanningAnswers answers={plan.questionnaire} />
                  {plan.message && (
                    <p className="max-h-80 overflow-auto text-gray-600 whitespace-pre-wrap break-words mb-5">
                      {plan.message}
                    </p>
                  )}
                </details>
                <p className="text-xs text-gray-500 mb-5">
                  {uiCopy("Updated ")}
                  {dateLabel(plan.updatedAt)}
                </p>
                {plan.status === "draft" ? (
                  <details className="rounded-xl border border-emerald-100 p-3">
                    <summary className="min-h-11 cursor-pointer text-sm text-emerald-800">
                      {uiCopy("Edit, share or delete draft")}
                    </summary>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditing(plan);
                          setFeedback("");
                        }}
                        disabled={Boolean(editing || requesting)}
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        {uiCopy("Edit Draft")}
                      </Button>
                      <Button
                        onClick={() => {
                          setRequesting(plan.id);
                          setFeedback("");
                        }}
                        disabled={Boolean(editing || requesting)}
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        {plan.country === "new-zealand"
                          ? uiCopy("Share with AVES")
                          : uiCopy("Request a Quote")}
                      </Button>
                      <DeleteDraft
                        plan={plan}
                        disabled={Boolean(editing || requesting)}
                        onDeleted={() => {
                          setPlans((current) =>
                            current.filter((item) => item.id !== plan.id),
                          );
                          setFeedback("Your unused draft was deleted.");
                        }}
                      />
                    </div>
                  </details>
                ) : (
                  <p className="text-sm text-gray-600">
                    {plan.country === "new-zealand"
                      ? uiCopy(
                          "Your planning brief is saved for AVES to review privately. This submitted copy stays unchanged; start another draft for different ideas. No booking is confirmed.",
                        )
                      : uiCopy(
                          "Your request is saved for AVES to review. This submitted plan is kept unchanged; you can start another draft for different ideas.",
                        )}
                  </p>
                )}
                <div className="mt-5">
                  <Button asChild variant="outline">
                    <Link href={`/account/trips/${plan.id}`}>
                      {uiCopy("Open trip workspace")}
                    </Link>
                  </Button>
                </div>
                {requesting === plan.id && (
                  <QuoteRequestForm
                    plan={plan}
                    onCancel={() => setRequesting(null)}
                    onSubmitted={(saved) => {
                      replacePlan(saved);
                      setRequesting(null);
                      setFeedback(
                        saved.country === "new-zealand"
                          ? "Your planning brief is saved for AVES to review privately. This is not a confirmed booking."
                          : "Your quote request has been saved for AVES to review. This is not a confirmed booking.",
                      );
                    }}
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <div className="pt-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
          {uiCopy("My Proposals")}
        </h2>
        {proposals.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-6">
            {proposals.map((proposal) => (
              <ProposalCard key={proposal.id} proposal={proposal} />
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <p className="text-gray-600">
                {uiCopy(
                  "Issued proposals from AVES will appear here after you request a quote.",
                )}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
      <p className="text-sm text-gray-500">
        {uiCopy("Have a question about a saved request or proposal? ")}
        <Link
          href="/contact?topic=account#inquiry"
          className="text-emerald-700 underline"
        >
          {uiCopy("Contact AVES")}
        </Link>
        .
      </p>
    </div>
  );
}
