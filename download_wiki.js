const fs = require('fs');
const https = require('https');
const path = require('path');

const outDir = path.join(__dirname, 'apps/web/public/images/categories');

function fetchWikiImageURL(query) {
    return new Promise((resolve, reject) => {
        const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=0&gsrlimit=1&pithumbsize=1000`;
        https.get(url, { headers: { 'User-Agent': 'NodeJS/1.0' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json.query && json.query.pages) {
                        const page = Object.values(json.query.pages)[0];
                        if (page && page.thumbnail && page.thumbnail.source) {
                            resolve(page.thumbnail.source);
                        } else {
                            reject('No thumbnail found');
                        }
                    } else {
                        reject('No results found');
                    }
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

function downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'NodeJS/1.0' } }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return resolve(downloadImage(res.headers.location, filename));
            }
            const file = fs.createWriteStream(filename);
            res.pipe(file);
            file.on('finish', () => resolve());
        }).on('error', reject);
    });
}

const categories = [
    { id: 'maktab', query: 'Sultan Qaboos Grand Mosque' },
    { id: 'tourist', query: 'Mutrah Corniche' },
    { id: 'police', query: 'Police car' },
    { id: 'emergency', query: 'Fire engine' },
    { id: 'news', query: 'Newspaper stack' },
    { id: 'hello_oman', query: 'Al Alam Palace' },
];

async function run() {
    for (const cat of categories) {
        try {
            console.log('Searching Wikipedia for:', cat.query);
            const url = await fetchWikiImageURL(cat.query);
            console.log('Downloading from:', url);
            await downloadImage(url, path.join(outDir, `${cat.id}.jpg`));
            console.log('Downloaded:', cat.id);
        } catch (e) {
            console.error('Failed:', cat.id, e);
        }
    }
}

run();
