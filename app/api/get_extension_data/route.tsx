import * as cheerio from 'cheerio';

const stores = [
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

async function checkStores(id: string) {
  const result = {
    id: id,
    found: false,
    title: '',
    browser: '',
    url: '',
    img_source: '',
  };

  for (let i = 0; i < stores.length; i++) {
    const url = stores[i].url + id;
    const browser = stores[i].browser;
    const img = stores[i].img_source;

    const response = await fetch(url);
    const data = await response.text();

    const $ = cheerio.load(data);
    const title = $('title').text().split(' - ')[0];

    if (
      title === 'Microsoft Edge AddonsYour Privacy Choices Opt-Out Icon' ||
      title === 'Chrome Web Store'
    ) {
      continue;
    } else {
      return {
        id: id,
        title: title,
        found: true,
        browser: browser,
        url: url,
        img_source: img,
      };
    }
  }

  return result;
}

export async function POST(request: Request) {
  const body = await request.json();
  const id = body.id;

  const result = await checkStores(id);

  return new Response(JSON.stringify(result));
}
