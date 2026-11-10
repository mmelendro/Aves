"use client"

import { JourneyContactForm, type JourneyContactFormProps } from "./journey-contact-form"

export function ContactFormSection(props: JourneyContactFormProps) {
  return <JourneyContactForm {...props} initialCountry={props.initialCountry??"australia"}/>
}
