/**
 * Generates print-ready QR codes for the yard sign.
 *
 *   npm run qr                      → uses site.url from src/config/property.ts
 *   npm run qr -- https://your.site → uses the URL you pass
 *
 * Output: qr/yard-sign-qr.svg (vector, for the sign printer) and
 *         qr/yard-sign-qr.png (4000 × 4000 px).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import QRCode from 'qrcode';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const config = fs.readFileSync(path.join(root, 'src/config/property.ts'), 'utf8');
const fromConfig = config.match(/url:\s*'([^']+)'/)?.[1];
const url = (process.argv[2] ?? fromConfig ?? '').replace(/\/+$/, '');

if (!/^https:\/\/[^/]+\.[a-z]{2,}/i.test(url) || url.includes('example.com')) {
  console.error(
    `\n✗ No live URL yet (found "${url || 'nothing'}").\n` +
      `  Set site.url in src/config/property.ts to your published https:// address, or run:\n` +
      `  npm run qr -- https://your-domain.com\n`,
  );
  process.exit(1);
}
if (/\.vercel\.app|\.netlify\.app|localhost/.test(url)) {
  console.warn(`\n⚠ ${url} looks like a temporary hosting address. A custom domain is recommended for printed signs.\n`);
}

const outDir = path.join(root, 'qr');
fs.mkdirSync(outDir, { recursive: true });
// Error-correction level H keeps the code readable even if the sign is scuffed or partly shaded.
const options = { errorCorrectionLevel: 'H', margin: 4, color: { dark: '#24231f', light: '#ffffff' } };

await QRCode.toFile(path.join(outDir, 'yard-sign-qr.svg'), url, { ...options, type: 'svg' });
await QRCode.toFile(path.join(outDir, 'yard-sign-qr.png'), url, { ...options, type: 'png', width: 4000 });

console.log(`\n✓ QR codes for ${url}\n  qr/yard-sign-qr.svg\n  qr/yard-sign-qr.png (4000 × 4000 px)\n\n  Scan both with a phone before sending them to the printer.\n`);
