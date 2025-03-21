import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getExtensionIds(text: string) {
  const regexPattern = "[a-p]{32}";
  const regex = new RegExp(regexPattern, "g");
  const matches = text.match(regex);
  return matches ? matches : [];
}