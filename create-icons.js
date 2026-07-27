import fs from 'fs';
import path from 'path';

const base64Png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
const buffer = Buffer.from(base64Png, 'base64');

const publicDir = 'public';
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

fs.writeFileSync(path.join(publicDir, 'icon16.png'), buffer);
fs.writeFileSync(path.join(publicDir, 'icon48.png'), buffer);
fs.writeFileSync(path.join(publicDir, 'icon128.png'), buffer);

console.log('Icons generated successfully.');
