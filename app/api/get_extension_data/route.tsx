import * as cheerio from 'cheerio';

export async function POST(request: Request) {
    const body = await request.json();
    const id = body.id;

    const response = await fetch(`https://chromewebstore.google.com/detail/${id}`);
    const data = await response.text();

    const $ = cheerio.load(data);
    const title = $('title').text().split(' - ')[0];
    let found = true;
    if (title === "Chrome Web Store") {
        found = false;
    };

    return new Response(JSON.stringify({id: id, title: title, found: found}));
}