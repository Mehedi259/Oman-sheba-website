const fs = require('fs');
const https = require('https');
const path = require('path');
const outDir = path.join(__dirname, 'apps/web/public/images/categories');
const url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Newspaper_stack.jpg/1280px-Newspaper_stack.jpg';
https.get(url, (res) => {
    const file = fs.createWriteStream(path.join(outDir, 'news.jpg'));
    res.pipe(file);
});
