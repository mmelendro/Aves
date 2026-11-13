"use client";
import { AccountDashboard } from "@/components/account/account-dashboard";
import { UiLanguageProvider } from "@/components/ui-language";
// CI-only synthetic dashboard. Production always requires the server account page.
export default function DashboardFixture() {
  return (
    <UiLanguageProvider scope="account">
      <main id="main-content" className="mx-auto max-w-6xl p-5">
        <h1>Synthetic saved trips</h1>
        <AccountDashboard email="synthetic@example.test" />
      </main>
    </UiLanguageProvider>
  );
}
