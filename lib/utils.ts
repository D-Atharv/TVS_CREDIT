// File: lib/utils.ts

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function to conditionally join class names together.
 * It's particularly useful for building components with dynamic classes in Tailwind CSS.
 * It also handles merging and removing conflicting Tailwind classes.
 *
 * Example: cn("p-4", isVisible && "block", "font-bold")
 *
 * @param {...ClassValue[]} inputs - A list of class names or conditional class objects.
 * @returns {string} The merged and optimized class name string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
