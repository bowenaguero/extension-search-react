import * as cheerio from 'cheerio';

async function checkChrome(id: string) {
  const url = `https://chromewebstore.google.com/detail/${id}`;
  const response = await fetch(url);
  const data = await response.text();

  const $ = cheerio.load(data);
  const title = $('title').text().split(' - ')[0];

  let found = true;
  if (title === 'Chrome Web Store') {
    found = false;
  }

  const payload = {
    id: id,
    title: title,
    found: found,
    browser: 'Chrome',
    url: url,
    img_source: '/images/Chrome_Logo.svg',
  };

  return payload;
}

async function checkEdge(id: string) {
  const url = `https://microsoftedge.microsoft.com/addons/detail/${id}`;
  const response = await fetch(url);
  const data = await response.text();

  const $ = cheerio.load(data);
  const title = $('title').text().split(' - ')[0];

  let found = true;
  if (title === 'Microsoft Edge AddonsYour Privacy Choices Opt-Out Icon') {
    found = false;
  }

  const payload = {
    id: id,
    title: title,
    found: found,
    browser: 'Edge',
    url: url,
    img_source: '/images/Edge_Logo.svg',
  };

  return payload;
}

export async function POST(request: Request) {
  const body = await request.json();
  const id = body.id;

  const checks = [checkChrome(id), checkEdge(id)];

  let payload = { id: id };

  await Promise.all(checks).then((results) => {
    results.forEach((result) => {
      if (result.found) {
        payload = result;
      }
    });
  });

  return new Response(JSON.stringify(payload));
}
