import ContactPage from "@/app/contact/page"
import { PreviewModeProvider } from "@/components/preview-mode"

// Copied only into the isolated CI harness. Requests are intercepted by tests;
// production and preview routes retain their normal write restrictions.
export default async function SyntheticContact(props: Parameters<typeof ContactPage>[0]) {
  return <PreviewModeProvider readOnly={false}>{await ContactPage(props)}</PreviewModeProvider>
}
