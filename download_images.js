const fs = require('fs');
const path = require('path');
const https = require('https');

const categories = [
  { id: 'jobs', keyword: 'job,briefcase' },
  { id: 'properties', keyword: 'apartment,building' },
  { id: 'vehicles', keyword: 'car,vehicle' },
  { id: 'classifieds', keyword: 'shopping,market' },
  { id: 'community', keyword: 'people,community' },
  { id: 'embassy', keyword: 'embassy,building' },
  { id: 'doctors', keyword: 'doctor,hospital' },
  { id: 'hospitals', keyword: 'hospital,building' },
  { id: 'ambulance', keyword: 'ambulance,vehicle' },
  { id: 'lawyers', keyword: 'lawyer,judge' },
  { id: 'travel', keyword: 'airplane,travel' },
  { id: 'hotels', keyword: 'hotel,room' },
  { id: 'money', keyword: 'money,currency' },
  { id: 'maktab', keyword: 'quran,mosque' },
  { id: 'tourist', keyword: 'tourist,landmark' },
  { id: 'police', keyword: 'police,officer' },
  { id: 'emergency', keyword: 'emergency,siren' },
  { id: 'news', keyword: 'newspaper,news' },
  { id: 'hello_oman', keyword: 'oman,muscat' },
];

const outDir = path.join(__dirname, 'apps/web/public/images/categories');
fs.mkdirSync(outDir, { recursive: true });

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Handle redirect
        let redir = res.headers.location;
        if (redir.startsWith('/')) {
            redir = 'https://loremflickr.com' + redir;
        }
        return resolve(downloadImage(redir, filename));
      }
      const file = fs.createWriteStream(filename);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function searchAndDownload() {
  for (const cat of categories) {
    try {
      const url = `https://loremflickr.com/400/400/${cat.keyword}/all`;
      const filePath = path.join(outDir, `${cat.id}.jpg`);
      console.log(`Downloading ${cat.id}...`);
      await downloadImage(url, filePath);
      console.log(`Downloaded ${cat.id}`);
    } catch (e) {
      console.error(`Failed ${cat.id}:`, e);
    }
  }
}

searchAndDownload();
