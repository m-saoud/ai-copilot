import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
const svgPath = path.join(publicDir, 'favicon.svg');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

async function generateIcons() {
  const sizes = [16, 48, 128];
  for (const size of sizes) {
    const outputPath = path.join(publicDir, `icon${size}.png`);
    await sharp(svgPath)
      .resize(size, size)
      .png()
      .toFile(outputPath);
    console.log(`Generated icon${size}.png (${size}x${size})`);
  }
}

generateIcons().catch(console.error);
