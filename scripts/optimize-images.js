const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '..', 'public');
const outDir = path.join(publicDir, 'optimized');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

// Map source files to desired output base names (kebab-case)
const files = [
  { src: 'morden-family-home.jpg', name: 'modern-family-home' },
  { src: 'Commercial office Design.jpg', name: 'commercial-office-fitout' },
  { src: 'reverside.jpg', name: 'riverside-renovation' },
  { src: 'Charis-home-page-2.jpg', name: 'charis-home-page-2' },
  { src: 'charis-home-image.jpg', name: 'charis-home-image' },
  { src: 'Riversiderenovation.jpg', name: 'riverside-renovation-2' }
];

async function process() {
  for (const f of files) {
    const srcPath = path.join(publicDir, f.src);
    if (!fs.existsSync(srcPath)) {
      console.warn('Skipping missing source:', f.src);
      continue;
    }

    try {
      const img = sharp(srcPath).rotate();
      // create a large webp (1920px wide max)
      const webpOut = path.join(outDir, `${f.name}-1920.webp`);
      await img.clone().resize({ width: 1920 }).webp({ quality: 80 }).toFile(webpOut);

      // create a medium jpeg (1024)
      const jpegOut = path.join(outDir, `${f.name}-1024.jpg`);
      await img.clone().resize({ width: 1024 }).jpeg({ quality: 80 }).toFile(jpegOut);

      // create a small webp (640)
      const webpSmall = path.join(outDir, `${f.name}-640.webp`);
      await img.clone().resize({ width: 640 }).webp({ quality: 70 }).toFile(webpSmall);

      console.log('Processed', f.src, '->', webpOut);
    } catch (err) {
      console.error('Error processing', f.src, err);
    }
  }
}

process().then(() => console.log('Done')).catch(console.error);
