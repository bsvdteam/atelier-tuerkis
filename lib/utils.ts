import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind-Klassen konfliktfrei zusammenführen. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
