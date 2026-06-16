/**
 * Utility functions for the application.
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/* API base URL */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";