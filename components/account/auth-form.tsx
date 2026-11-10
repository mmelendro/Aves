"use client"
import { useReadOnlyPreview } from "@/components/preview-mode"

/**
 * Browser forms for Supabase Auth: sign-in, signup, password recovery, and resend.
 * Passwords go to the Auth SDK, not AVES trip/proposal tables. Form checks improve
 * feedback; Supabase's configured Auth policy remains authoritative. Private API
 * requests later verify the session again rather than trusting these screens.
 */

import { useEffect, useId, useRef, useState } from "react"
import { SiteLink as Link } from "@/components/site-link"
import { ArrowRight, CheckCircle, LockKeyhole, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { accountEntryHref, accountReturnPath } from "./account-navigation"
import type { OAuthProvider } from "@/lib/oauth-providers"

type Mode = "sign-in" | "sign-up" | "forgot-password" | "reset-password"

/**
 * Build a same-site Auth callback URL for email flows, with one of the two supported account targets.
 */
function callbackUrl(next: string) {
  const url = new URL("/australia/auth/callback", window.location.origin)
  url.searchParams.set("next", next)
  return url.href
}

/**
 * Render mode-specific Auth actions. next is allowlisted again, and oauthProviders contains server-approved names.
 */
export function AuthForm({ mode, next = "/account", oauthProviders = [] }: { mode: Mode; next?: string; oauthProviders?: OAuthProvider[] }) {
  const readOnly = useReadOnlyPreview()
  const destination = accountReturnPath(next)
  const prefix = useId()
  const busyRef = useRef(false)
  const [busy, setBusy] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [emailUpdates, setEmailUpdates] = useState(false)
  const signUpDestination = emailUpdates ? `/account/email-updates?next=${encodeURIComponent(destination)}` : destination
  const [recoveryReady, setRecoveryReady] = useState(mode !== "reset-password")
  const [recoveryChecked, setRecoveryChecked] = useState(mode !== "reset-password")
  const newPassword = mode === "sign-up" || mode === "reset-password"
  const label = { "sign-in": "Sign In", "sign-up": "Create My Account", "forgot-password": "Send a Reset Link", "reset-password": "Save New Password" }[mode]
  const socialMode = mode === "sign-in" || mode === "sign-up"

  useEffect(() => {
    if (mode === "sign-in") {
      const error = new URLSearchParams(window.location.search).get("error")
      if (error === "confirmation") setFeedback("This account link has expired or could not be verified. Sign in if you've already confirmed your email, or request a new confirmation or password reset link below.")
      if (error === "oauth-cancelled") setFeedback("Social sign-in was cancelled. You can try again or sign in with your email and password.")
      if (error === "oauth") setFeedback("Social sign-in wasn't completed. It may have been cancelled or the link may have expired. Please try again, or use your email and password.")
    }
    if (readOnly || mode !== "reset-password") return
    // This check controls form readiness, not a separate authorization grant.
    // Supabase must still authorize updateUser; ignore results after unmount.
    let active = true
    async function checkRecovery() {
      try {
        const { data, error } = await createClient().auth.getUser()
        if (!active) return
        setRecoveryReady(Boolean(data.user) && !error)
        if (!data.user || error) setFeedback("This reset link is no longer available. Request a new link to continue.")
      } catch {
        if (active) setFeedback("We couldn't check your reset link. Please request a new one or try again later.")
      } finally { if (active) setRecoveryChecked(true) }
    }
    void checkRecovery()
    return () => { active = false }
  }, [mode, readOnly])

  // Provider names are filtered on the server and checked again here. Request
  // only basic profile/email scopes; provider secrets stay in provider settings.
  async function signInWithProvider(provider: OAuthProvider) {
    if (readOnly || !socialMode || !oauthProviders.includes(provider) || busyRef.current) return
    busyRef.current = true
    setBusy(true)
    setFeedback("")
    setSuccess(false)
    try {
      const redirectTo = new URL("/australia/auth/callback", window.location.origin)
      redirectTo.searchParams.set("flow", "oauth")
      redirectTo.searchParams.set("next", signUpDestination)
      const { error } = await createClient().auth.signInWithOAuth({
        provider,
        options: { redirectTo: redirectTo.href, scopes: provider === "facebook" ? "email" : "openid email profile" },
      })
      if (error) throw error
    } catch {
      setFeedback("We couldn't start social sign-in. Please try again or use your email and password.")
    } finally {
      busyRef.current = false
      setBusy(false)
    }
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // The ref closes the gap before React renders the disabled button, reducing
    // accidental double submits. Provider/API rules remain authoritative.
    if (readOnly || busyRef.current) return
    const form = event.currentTarget
    const values = new FormData(form)
    const email = String(values.get("email") || "").trim()
    const password = String(values.get("password") || "")
    if (newPassword && password !== String(values.get("confirmPassword") || "")) {
      setSuccess(false)
      setFeedback("Your passwords don't match. Please check both fields.")
      return
    }
    busyRef.current = true
    setBusy(true)
    setFeedback("")
    setSuccess(false)
    try {
      const supabase = createClient()
      if (mode === "sign-in") {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw new Error(error.code === "email_not_confirmed" ? "Please confirm your email before signing in. Check your inbox for your account confirmation link." : "We couldn't sign you in. Check your email and password, or use the password reset link.")
        window.location.assign(signUpDestination)
      } else if (mode === "sign-up") {
        const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: callbackUrl(signUpDestination) } })
        if (error) throw new Error(error.message || "We couldn't create your account. Please try again later.")
        window.location.assign(accountEntryHref("/account/check-email", signUpDestination))
      } else if (mode === "forgot-password") {
        // Generic success text avoids asserting that an address has an account.
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: callbackUrl("/account/reset-password") })
        if (error) throw new Error("We couldn't request a reset link right now. Please try again later.")
        setSuccess(true)
        setFeedback("If an account can receive a reset email at that address, you'll receive a link to choose a new password. Check your inbox and spam folder.")
        form.reset()
      } else {
        if (!recoveryReady) throw new Error("Request a new password reset link to continue.")
        const { error } = await supabase.auth.updateUser({ password })
        if (error) throw new Error(error.message || "We couldn't update your password. Please request a new reset link.")
        setSuccess(true)
        setFeedback("Your password has been updated. You can return to your saved trip plans.")
        form.reset()
      }
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "This service is temporarily unavailable. Please try again later.")
    } finally {
      busyRef.current = false
      setBusy(false)
    }
  }

  return <Card className="border-0 shadow-xl bg-white"><CardContent className="p-6 lg:p-8">
    <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mb-6"><LockKeyhole className="w-6 h-6 text-emerald-700" /></div>
    <h2 className="text-2xl font-bold text-gray-900 mb-3">{mode === "sign-in" ? "Welcome Back" : mode === "sign-up" ? "Make Room for Your Next Adventure" : mode === "forgot-password" ? "Let's Get You Back In" : "Choose a New Password"}</h2>
    <p className="text-gray-600 mb-8">{mode === "sign-in" ? "One AVES account for your AVES destination ideas, saved plans and quote requests." : mode === "sign-up" ? "Save travel ideas for Colombia or Australia and discuss a personal proposal with AVES." : mode === "forgot-password" ? "Enter your account email to request a password reset link." : "Use a unique password with at least 12 characters."}</p>
    {socialMode && <label className="flex items-start gap-3 mb-6 text-sm"><input type="checkbox" checked={emailUpdates} disabled={busy || readOnly} onChange={event => setEmailUpdates(event.target.checked)} className="mt-1 accent-emerald-700" /><span>I'd like optional AVES email updates. After signing in, I'll confirm my subscription. This is optional and I can unsubscribe at any time.</span></label>}
    {socialMode && oauthProviders.length > 0 ? <div className="mb-6 space-y-3">
      {/* Google's unmodified artwork includes its current logo and lettering.
          Keeping it local avoids loading Google's scripts or fonts before a visitor chooses to sign in. */}
      {oauthProviders.map(provider => provider === "google" ? <button key={provider} type="button" aria-label="Sign in with Google" className="mx-auto block h-10 w-[180px] rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-50" disabled={busy || readOnly} onClick={() => signInWithProvider(provider)}><img src="/google-sign-in.svg" width={180} height={40} alt="" aria-hidden="true" /></button> : <Button key={provider} type="button" aria-label="Continue with Facebook" variant="outline" size="lg" className="w-full" disabled={busy || readOnly} onClick={() => signInWithProvider(provider)}>Continue with Facebook</Button>)}
      <p className="text-center text-sm text-gray-500">Or continue with email</p>
    </div> : null}
    <form onSubmit={submit} className="space-y-6">
      {readOnly && <p className="text-sm text-amber-800">Sign-in and account changes are disabled in this preview.</p>}
      <fieldset disabled={readOnly || busy || !recoveryReady || (mode === "reset-password" && success)} className="space-y-6">
        {mode !== "reset-password" && <div><label htmlFor={`${prefix}-email`} className="block text-sm font-medium text-gray-700 mb-2">Email Address</label><Input id={`${prefix}-email`} name="email" type="email" autoComplete="email" maxLength={254} required /></div>}
        {mode !== "forgot-password" && <div><label htmlFor={`${prefix}-password`} className="block text-sm font-medium text-gray-700 mb-2">{newPassword ? "New Password" : "Password"}</label><Input id={`${prefix}-password`} name="password" type={showPassword ? "text" : "password"} autoComplete={newPassword ? "new-password" : "current-password"} minLength={newPassword ? 12 : undefined} required />{newPassword && <p className="text-sm text-gray-500 mt-2">At least 12 characters. A password manager or a long, unique passphrase works well.</p>}</div>}
        {newPassword && <div><label htmlFor={`${prefix}-confirm`} className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label><Input id={`${prefix}-confirm`} name="confirmPassword" type={showPassword ? "text" : "password"} autoComplete="new-password" minLength={12} required /></div>}
        {mode !== "forgot-password" && <Button type="button" variant="ghost" size="sm" aria-pressed={showPassword} onClick={() => setShowPassword(value => !value)}>{showPassword ? "Hide Password" : "Show Password"}{newPassword ? "s" : ""}</Button>}
        {mode === "sign-up" && <p className="text-sm text-gray-500">Your account helps you save plans and request a quote. Read our <Link href="/privacy" className="text-emerald-700 underline">privacy information</Link> and <Link href="/terms" className="text-emerald-700 underline">information about inquiries and bookings</Link>.</p>}
        <Button type="submit" size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">{busy ? "Please wait…" : label}<ArrowRight className="w-4 h-4 ml-2" /></Button>
      </fieldset>
      {!recoveryChecked && <p className="text-sm text-gray-600" role="status">Checking your reset link…</p>}
      {feedback && <p className={`text-sm ${success ? "text-emerald-700" : "text-red-700"}`} role={success ? "status" : "alert"}>{feedback}</p>}
    </form>
    <div className="mt-8 pt-6 border-t border-gray-200 space-y-3 text-sm">
      {mode === "sign-in" && <><p><Link href="/account/forgot-password" className="text-emerald-700 underline">Forgot your password?</Link></p><p><Link href={accountEntryHref("/account/check-email", signUpDestination)} className="text-emerald-700 underline">Need a new confirmation link?</Link></p><p className="text-gray-600">New to AVES? <Link href={accountEntryHref("/account/sign-up", destination)} className="text-emerald-700 underline">Create an account</Link>.</p></>}
      {mode === "sign-up" && <p className="text-gray-600">Already have an account? <Link href={accountEntryHref("/account/sign-in", destination)} className="text-emerald-700 underline">Sign in</Link>.</p>}
      {mode === "forgot-password" && <Link href="/account/sign-in" className="text-emerald-700 underline">Return to sign in</Link>}
      {mode === "reset-password" && <Link href={success ? "/account" : "/account/forgot-password"} className="text-emerald-700 underline">{success ? "Return to My Trip Plans" : "Request a New Reset Link"}</Link>}
    </div>
  </CardContent></Card>
}

/**
 * Offer confirmation guidance and an explicit resend request; generic success wording does not disclose account existence.
 */
export function CheckEmail({ next = "/account" }: { next?: string }) {
  const readOnly = useReadOnlyPreview()
  const prefix = useId()
  const busyRef = useRef(false)
  const [busy, setBusy] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [failed, setFailed] = useState(false)
  async function resend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (readOnly || busyRef.current) return
    const email = String(new FormData(event.currentTarget).get("email") || "").trim()
    busyRef.current = true; setBusy(true); setFeedback(""); setFailed(false)
    try {
      const { error } = await createClient().auth.resend({ type: "signup", email, options: { emailRedirectTo: callbackUrl(accountReturnPath(next)) } })
      if (error) throw new Error("We couldn't request a confirmation email right now. Please wait a little and try again.")
      setFeedback("If this address needs confirmation, a new link has been requested. Check your inbox and spam folder.")
    } catch (error) { setFailed(true); setFeedback(error instanceof Error ? error.message : "Please try again later.") }
    finally { busyRef.current = false; setBusy(false) }
  }
  return <Card className="border-0 shadow-xl bg-white"><CardContent className="p-6 lg:p-8">
    <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mb-6"><Mail className="w-6 h-6 text-emerald-700" /></div>
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Confirm Your Email</h2>
    <p className="text-gray-600 mb-5">Check your inbox for an AVES account confirmation link. If a confirmation was issued, follow the link to finish setting up your account. Check your spam folder too.</p>
    <p className="text-gray-600 mb-8">Already confirmed your email or have an account? You can sign in to continue.</p>
    <Button asChild size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"><Link href={accountEntryHref("/account/sign-in", next)}><CheckCircle className="w-4 h-4 mr-2" />Continue to Sign In</Link></Button>
    <form onSubmit={resend} className="mt-8 pt-6 border-t border-gray-200 space-y-4"><fieldset disabled={busy || readOnly} className="space-y-4"><legend className="font-semibold text-gray-900 mb-3">Need a New Confirmation Link?</legend><div><label htmlFor={`${prefix}-email`} className="block text-sm font-medium text-gray-700 mb-2">Account Email Address</label><Input id={`${prefix}-email`} name="email" type="email" autoComplete="email" maxLength={254} required /></div><Button type="submit" variant="outline" className="w-full">{busy ? "Requesting…" : "Request a Confirmation Link"}</Button></fieldset>{feedback && <p role={failed ? "alert" : "status"} className={`text-sm ${failed ? "text-red-700" : "text-emerald-700"}`}>{feedback}</p>}</form>
    <p className="text-sm text-gray-500 mt-6">Need help? <Link href="/contact?topic=account#inquiry" className="text-emerald-700 underline">Contact AVES</Link>.</p>
  </CardContent></Card>
}
