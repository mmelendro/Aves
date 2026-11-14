"use client"
import {PreviewModeProvider} from "@/components/preview-mode"
import {ContactFormSection} from "@/features/australia/components/contact-form-section"
export default function Fixture(){return <PreviewModeProvider readOnly={false}><main><h1>Synthetic Australian enquiry</h1><ContactFormSection initialCountry="australia"/></main></PreviewModeProvider>}
