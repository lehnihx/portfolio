import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const ANIMATION = {
  initial: { opacity: 0, y: 0 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1 }
} as const
export const CACHE_REVALIDATION = 24 * 60 * 60