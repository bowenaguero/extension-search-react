// Constants for extension ID parsing and limits
export const EXTENSION_ID_LENGTH = 32;
export const MAX_EXTENSION_IDS = 50;
export const DEBOUNCE_DELAY = 500;

// Extension ID regex pattern (Chrome/Edge: 32 chars, lowercase a-p only)
// This is the custom alphabet used by Chrome Web Store extension IDs
// Derived from SHA256 hash where hex chars (0-9, a-f) are mapped to (a-p)
export const EXTENSION_ID_REGEX = new RegExp(
  `[a-p]{${EXTENSION_ID_LENGTH}}`,
  'g',
);

export type BrowserType = 'Edge' | 'Chrome';

export interface Extensions {
  id: string;
  title: string;
  found: boolean;
  browser: BrowserType;
  url: string;
  img_source: string;
}

export interface Store {
  browser: BrowserType;
  url: string;
  img_source: string;
}

// Store configurations for Chrome and Edge
export const STORES: Store[] = [
  {
    browser: 'Edge',
    url: 'https://microsoftedge.microsoft.com/addons/detail/',
    img_source: '/images/Edge_Logo.svg',
  },
  {
    browser: 'Chrome',
    url: 'https://chromewebstore.google.com/detail/',
    img_source: '/images/Chrome_Logo.svg',
  },
] as const;

// Error page titles for each store
export const STORE_ERROR_TITLES = {
  Chrome: 'Chrome Web Store',
  Edge: 'Microsoft Edge AddonsYour Privacy Choices Opt-Out Icon',
} as const;
