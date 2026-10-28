import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Shared easing curve used across all motion for a consistent feel. */
export const EASE = [0.22, 1, 0.36, 1] as const;
