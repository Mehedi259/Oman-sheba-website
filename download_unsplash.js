const fs = require('fs');
const https = require('https');
const path = require('path');

const outDir = path.join(__dirname, 'apps/web/public/images/categories');
fs.mkdirSync(outDir, { recursive: true });

function fetchJSON(keyword) {
    return new Promise((resolve, reject) => {
        https.get(`https://unsplash.com/napi/search/photos?query=${encodeURIComponent(keyword)}&per_page=1`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json.results && json.results.length > 0) {
                        resolve(json.results[0].urls.regular);
                    } else {
                        reject('No results');
                    }
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function download(url, filename) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return resolve(download(res.headers.location, filename));
            }
            const file = fs.createWriteStream(filename);
            res.pipe(file);
            file.on('finish', () => resolve());
        }).on('error', reject);
    });
}

const categories = [
  { id: 'jobs', keyword: 'corporate office professional' },
  { id: 'properties', keyword: 'modern apartment building' },
  { id: 'vehicles', keyword: 'modern car driving' },
  { id: 'classifieds', keyword: 'marketplace shopping cart' },
  { id: 'community', keyword: 'community diverse people' },
  { id: 'embassy', keyword: 'embassy flag building' },
  { id: 'doctors', keyword: 'professional doctor hospital' },
  { id: 'hospitals', keyword: 'modern hospital building' },
  { id: 'ambulance', keyword: 'ambulance emergency' },
  { id: 'lawyers', keyword: 'lawyer judge gavel' },
  { id: 'travel', keyword: 'airplane flying travel' },
  { id: 'hotels', keyword: 'luxury hotel room' },
  { id: 'money', keyword: 'currency exchange money' },
  { id: 'maktab', keyword: 'islamic school quran' },
  { id: 'tourist', keyword: 'oman tourist landmark' },
  { id: 'police', keyword: 'police car officer' },
  { id: 'emergency', keyword: 'emergency siren red' },
  { id: 'news', keyword: 'newspaper news media' },
  { id: 'hello_oman', keyword: 'oman muscat city landscape' },
];

async function run() {
    for (const cat of categories) {
        try {
            console.log('Fetching URL for:', cat.id);
            const url = await fetchJSON(cat.keyword);
            console.log('URL:', url);
            await download(url, path.join(outDir, `${cat.id}.jpg`));
            console.log('Downloaded:', cat.id);
        } catch (e) {
            console.error('Failed:', cat.id, e.message || e);
        }
    }
}
run();
