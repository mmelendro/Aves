/**
 * Optional wrapper around next-themes. It forwards settings and children to that
 * package. The root layout does not currently mount this wrapper, so this file alone
 * does not enable a colour-theme switch on the site.
 */
'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
