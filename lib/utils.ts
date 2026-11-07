/**
 * Shared styling helper. cn accepts strings and conditional class-name objects.
 * clsx removes false/empty choices; twMerge resolves conflicting Tailwind utilities
 * (for example, a later padding class can replace an earlier default).
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
