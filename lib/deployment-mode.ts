/** Preview deployments cannot create accounts, email guests or mutate the shared database. */
export const isReadOnlyPreview = () => process.env.VERCEL_ENV === "preview"
