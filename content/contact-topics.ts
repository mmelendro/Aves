const contactTopics = {
  general: { title: "Contact AVES", subject: "General AVES inquiry", description: "Send us a question or idea. We will review your message and reply personally." },
  account: { title: "Help with Your AVES Account", subject: "Account or proposal support", description: "Tell us what you need help with. Please do not include passwords, payment details or identity documents." },
  privacy: { title: "Your Information and Privacy", subject: "Privacy request", description: "Ask about your information, or request access, correction or deletion. We may need to verify your identity before making changes." },
  unsubscribe: { title: "Request to Unsubscribe", subject: "Unsubscribe request", description: "Use the email address that receives your AVES updates. We will review your request to stop optional updates." },
  partnership: { title: "Connect with AVES", subject: "Partnership inquiry", description: "Tell us about your work, the place you know and how you would like to connect with AVES." },
  "new-zealand": { title: "Ask About New Zealand", subject: "New Zealand interest inquiry", description: "Share your ideas for Aotearoa New Zealand. This destination is still in development; sending a message does not create a booking or a saved trip." },
} as const

export function contactTopic(value: unknown) {
  return typeof value === "string" && Object.hasOwn(contactTopics, value)
    ? contactTopics[value as keyof typeof contactTopics]
    : null
}
