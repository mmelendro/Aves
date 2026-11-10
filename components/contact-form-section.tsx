"use client"

import { JourneyContactForm, type JourneyContactFormProps } from "./journey-contact-form"
import { useColombiaHomeCopy } from "./colombia-home-language"

export function ContactFormSection(props: JourneyContactFormProps) {
  const localizeHome=useColombiaHomeCopy()
  return localizeHome(<JourneyContactForm {...props} initialCountry={props.initialCountry??"colombia"}/>)
}
