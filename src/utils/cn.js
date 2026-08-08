import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes conditionally.
 * Combines clsx for conditional class joining with tailwind-merge
 * for intelligent Tailwind class deduplication.
 *
 * @param  {...any} inputs - Class names, objects, or arrays
 * @returns {string} - Merged class string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
