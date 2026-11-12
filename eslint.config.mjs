import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { FlatCompat } from "@eslint/eslintrc"

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) })

export default [
  { ignores: [".next/**", "node_modules/**", "docs/**", "public/**", "tests/**", "scripts/**", "supabase/**"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Editorial apostrophes are valid JSX text. Escaping them is not a release gate.
      "react/no-unescaped-entities": "off",
      // Some shared media transitions deliberately use native document navigation.
      // Replacing these links blindly would interrupt the existing playback handoff.
      "@next/next/no-html-link-for-pages": "off",
    },
  },
]
