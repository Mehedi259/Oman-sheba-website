const fs = require('fs');
const https = require('https');
const path = require('path');

const outDir = path.join(__dirname, 'apps/web/public/images/categories');
fs.mkdirSync(outDir, { recursive: true });

const categories = [
    { id: 'maktab', prompt: 'Beautiful Islamic madrasa or mosque interior, peaceful, photorealistic, 4k' },
    { id: 'tourist', prompt: 'Beautiful tourist landmark in Oman, sunny day, architectural photography, photorealistic, 4k' },
    { id: 'police', prompt: 'Modern Police car parked, photorealistic, 4k' },
    { id: 'emergency', prompt: 'Red Fire engine driving, emergency concept, photorealistic, 4k' },
    { id: 'news', prompt: 'Stack of daily newspapers on a table, news media concept, photorealistic, 4k' },
    { id: 'hello_oman', prompt: 'Muscat Oman skyline landscape, beautiful day, photorealistic, 4k' },
];

function downloadImage(prompt, filename) {
    return new Promise((resolve, reject) => {
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=400&height=300&nologo=true`;
        https.get(url, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return downloadImage(res.headers.location, filename).then(resolve).catch(reject);
            }
            const file = fs.createWriteStream(filename);
            res.pipe(file);
            file.on('finish', () => resolve());
        }).on('error', reject);
    });
}

async function run() {
    for (const cat of categories) {
        try {
            console.log(`Downloading ${cat.id}...`);
            await downloadImage(cat.prompt, path.join(outDir, `${cat.id}.jpg`));
            console.log(`Downloaded ${cat.id}`);
        } catch (e) {
            console.error(`Failed ${cat.id}:`, e);
        }
    }
}
run();
