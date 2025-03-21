import * as cheerio from 'cheerio';

export async function POST(request: Request) {
    const body = await request.json();
    const extensionIds = body.extensionIds;

    const extensionData: {
        id: string;
        title: string;
    }[] = [];

    const promises = extensionIds.map(async (id: string) => {
        const response = await fetch(`https://chromewebstore.google.com/detail/${id}`);
        const data = await response.text();

        const $ = cheerio.load(data);
        const title = $('title').text().split(' - ')[0];

        return {
            id: id,
            title: title || 'Unknown',
        };
    });

    const results = await Promise.all(promises);

    extensionData.push(...results);

    return new Response(JSON.stringify({extensionData: extensionData}));
}