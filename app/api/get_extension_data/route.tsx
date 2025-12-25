import { Extensions, STORES, STORE_ERROR_TITLES } from '@/types';
import * as cheerio from 'cheerio';

// ------------------------------------------------------------------
// Store Lookup
// ------------------------------------------------------------------

interface StoreLookupResult {
  id: string;
  title: string;
  found: boolean;
  browser: Extensions['browser'];
  url: string;
  img_source: string;
}

async function lookupExtensionInStore(
  id: string,
  store: (typeof STORES)[number],
): Promise<StoreLookupResult> {
  const response = await fetch(store.url + id);
  const html = await response.text();
  const $ = cheerio.load(html);
  const title = $('title').text().split(' - ')[0];
  const isNotFound = title === STORE_ERROR_TITLES[store.browser];

  return {
    id,
    title,
    found: !isNotFound,
    browser: store.browser,
    url: store.url,
    img_source: store.img_source,
  };
}

// ------------------------------------------------------------------
// Deduplication
// ------------------------------------------------------------------

function selectBestResults(
  extensionIds: string[],
  results: Extensions[],
): Extensions[] {
  return extensionIds.map((id) => {
    const matches = results.filter((ext) => ext.id === id);
    const found = matches.find((ext) => ext.found);
    return found ?? matches[0];
  });
}

// ------------------------------------------------------------------
// API Handler
// ------------------------------------------------------------------

async function processExtensionIds(ids: string[]): Promise<Extensions[]> {
  const lookups = ids.flatMap((id) =>
    STORES.map((store) => lookupExtensionInStore(id, store)),
  );
  const results = await Promise.all(lookups);
  return selectBestResults(ids, results);
}

export async function POST(request: Request) {
  const { ids } = await request.json();
  const result = await processExtensionIds(ids);
  return new Response(JSON.stringify(result));
}
