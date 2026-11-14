"use client"
import {PreviewModeProvider} from "@/components/preview-mode"
import {ContactFormSection} from "@/components/contact-form-section"
export default function Fixture(){return <PreviewModeProvider readOnly={false}><main><h1>Synthetic Colombian enquiry</h1><ContactFormSection/></main></PreviewModeProvider>}
