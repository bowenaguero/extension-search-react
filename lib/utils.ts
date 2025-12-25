import {
  Extensions,
  EXTENSION_ID_LENGTH,
  EXTENSION_ID_REGEX,
  MAX_EXTENSION_IDS,
  DEBOUNCE_DELAY,
} from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// ------------------------------------------------------------------
// UI Utilities
// ------------------------------------------------------------------

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ------------------------------------------------------------------
// Extension ID Parsing
// ------------------------------------------------------------------

export function parseExtensionIds(text: string): string[] {
  const matches = text.match(EXTENSION_ID_REGEX);
  return matches ?? [];
}

// Re-export constants and types for convenience
export type { Extensions };
export { EXTENSION_ID_LENGTH, MAX_EXTENSION_IDS, DEBOUNCE_DELAY };

// ------------------------------------------------------------------
// Data Deduplication
// ------------------------------------------------------------------

export function deduplicateExtensionData(
  extensionIds: string[],
  extensions: Extensions[],
): Extensions[] {
  return extensionIds.reduce<Extensions[]>((results, extensionId) => {
    const matches = extensions.filter((ext) => ext.id === extensionId);
    const found = matches.find((ext) => ext.found);
    results.push(found ?? matches[0]);
    return results;
  }, []);
}

// ------------------------------------------------------------------
// File Operations
// ------------------------------------------------------------------

export function downloadJsonFile<T>(data: T, filename: string): void {
  const file = new File([JSON.stringify(data)], filename, {
    type: 'application/json',
  });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(file);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}
