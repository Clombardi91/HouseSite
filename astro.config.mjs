// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { property } from './src/config/property.ts';

// The live address of the site (used for canonical links, Open Graph and the QR code).
// Set it in src/config/property.ts → site.url once the domain is live.
const site = property.site.url && !property.site.url.includes('example.com') ? property.site.url : undefined;

/**
 * Astro also publishes each original photo as a fallback. Phone photos can
 * carry GPS coordinates and camera details, so strip all metadata from any
 * published image that still has it (optimized variants are already clean).
 */
/** @returns {import('astro').AstroIntegration} */
function stripPhotoMetadata() {
  return {
    name: 'strip-photo-metadata',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const assets = path.join(fileURLToPath(dir), '_astro');
        const files = (await fs.readdir(assets).catch(() => [])).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f));
        let cleaned = 0;
        for (const file of files) {
          const full = path.join(assets, file);
          const meta = await sharp(full).metadata();
          if (!meta.exif && !meta.xmp && !meta.iptc) continue;
          const out = await sharp(full).rotate().toFormat(/** @type {any} */ (meta.format), { quality: 90 }).toBuffer();
          await fs.writeFile(full, out);
          cleaned++;
        }
        if (cleaned) logger.info(`Removed location/camera metadata from ${cleaned} published photo(s).`);
      },
    },
  };
}

export default defineConfig({
  site,
  compressHTML: true,
  integrations: [stripPhotoMetadata()],
  vite: {
    // Cast: Astro and Tailwind ship slightly different Vite type versions.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
