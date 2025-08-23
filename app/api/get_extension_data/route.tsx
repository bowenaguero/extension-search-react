import { Extensions, Store } from '@/types';
import * as cheerio from 'cheerio';

const stores: Store[] = [
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
];

async function checkStore(id: string, store: Store) {
  // Set store specific variables
  const url = store.url;
  const browser = store.browser;
  const img_source = store.img_source;

  // Fetch the store page for the given extension ID
  const response = await fetch(url + id);
  const text = await response.text();
  const $ = cheerio.load(text);

  // Parse the title
  const title = $('title').text().split(' - ')[0];

  // Was the extension ID not found?
  if (
    title === 'Chrome Web Store' ||
    title === 'Microsoft Edge AddonsYour Privacy Choices Opt-Out Icon'
  ) {
    // No? Return false.
    return {
      id: id,
      title: title,
      url: url,
      found: false,
      browser: browser,
      img_source: img_source,
    };
  }

  // Yes? return true.
  return {
    id: id,
    title: title,
    url: url,
    found: true,
    browser: browser,
    img_source: img_source,
  };
}

function deduplicateExtensionData(
  extensionIds: string[],
  extensions: Extensions[],
) {
  let deduplicatedResults: Extensions[] = [];

  extensionIds.map((extensionId) => {
    const matches = extensions.filter(
      (extension) => extension.id === extensionId,
    );

    const successfulResult = matches.find((result) => result.found === true);
    if (successfulResult) {
      deduplicatedResults.push(successfulResult);
    } else {
      deduplicatedResults.push(matches[0]);
    }
  });

  return deduplicatedResults;
}

async function processExtensionIds(ids: string[]) {
  const promises: Promise<Extensions>[] = [];

  ids.map((id) => {
    stores.map((store) => {
      promises.push(checkStore(id, store));
    });
  });

  const results = await Promise.all(promises);
  const deduplicatedResults = deduplicateExtensionData(ids, results);

  return deduplicatedResults;
}

export async function POST(request: Request) {
  const body = await request.json();
  const ids = body.ids;
  const result = await processExtensionIds(ids);
  return new Response(JSON.stringify(result));
}
