import type { ImageMetadata } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import { property, type Photo, type PhotoCategory } from '../config/property';

// Every image placed under src/assets/photos is discovered automatically.
const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/photos/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true },
);

const images = new Map<string, ImageMetadata>();
for (const [key, mod] of Object.entries(imageModules)) {
  images.set(key.replace('/src/assets/photos/', '').toLowerCase(), mod.default);
}

export interface ResolvedPhoto extends Photo {
  image: ImageMetadata | null;
  /** width / height of the real image, or of the placeholder. */
  aspect: number;
}

const DEFAULT_ASPECT = 3 / 2;

export function resolvePhoto(photo: Photo): ResolvedPhoto {
  const image = images.get(photo.file.toLowerCase()) ?? null;
  const aspect = image ? image.width / image.height : (photo.placeholderAspect ?? DEFAULT_ASPECT);
  return { ...photo, image, aspect };
}

const photoById = new Map(property.photos.map((p) => [p.id, resolvePhoto(p)]));

export function getPhoto(id: string): ResolvedPhoto | null {
  return photoById.get(id) ?? null;
}

/** Photos shown in the gallery, grouped in category order. */
export function galleryPhotos(): ResolvedPhoto[] {
  const order = property.galleryCategories.map((c) => c.id);
  return property.photos
    .filter((p) => p.inGallery !== false)
    .map(resolvePhoto)
    .sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category));
}

export function categoryLabel(id: PhotoCategory): string {
  return property.galleryCategories.find((c) => c.id === id)?.label ?? id;
}

/** Index of a photo within the full-screen viewer sequence, or -1. */
export function lightboxIndex(id: string): number {
  return galleryPhotos().findIndex((p) => p.id === id);
}

export type GalleryRow =
  | { kind: 'full'; photos: [ResolvedPhoto] }
  | { kind: 'pair'; photos: ResolvedPhoto[] }
  | { kind: 'single'; photos: [ResolvedPhoto]; align: 'start' | 'end' };

/**
 * Arrange a category's photos into an editorial rhythm:
 * full-width feature images, side-by-side pairs sized to share a common
 * height (so nothing is cropped), and offset single images.
 */
export function buildRows(photos: ResolvedPhoto[]): GalleryRow[] {
  const rows: GalleryRow[] = [];
  let pending: ResolvedPhoto[] = [];
  let singles = 0;
  const flush = () => {
    if (pending.length === 2) rows.push({ kind: 'pair', photos: pending });
    else if (pending.length === 1) rows.push({ kind: 'single', photos: [pending[0]], align: singles++ % 2 ? 'start' : 'end' });
    pending = [];
  };
  for (const p of photos) {
    if (p.wide) {
      flush();
      rows.push({ kind: 'full', photos: [p] });
      continue;
    }
    pending.push(p);
    if (pending.length === 2) flush();
  }
  flush();
  return rows;
}

// ── Formatting ───────────────────────────────────────────────────────────────

export function formatPrice(value: number | null): string | null {
  if (value == null) return null;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

export function cityLine(): string {
  const { city, state, zip } = property.address;
  return [city, [state, zip].filter(Boolean).join(' ')].filter(Boolean).join(', ');
}

export function fullAddress(): string | null {
  const { street } = property.address;
  return street ? `${street}, ${cityLine()}` : null;
}

/** Address if known, otherwise the city — never a placeholder. */
export function identity(): string {
  return property.address.street ?? `${property.address.city}, ${property.address.stateName}`;
}

export const statusLabels = {
  'coming-soon': 'Coming Soon',
  'for-sale': 'For Sale',
  'under-contract': 'Under Contract',
  sold: 'Sold',
} as const;

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

export function mapsQuery(): string {
  return fullAddress() ?? `${property.address.city}, ${property.address.stateName}`;
}

// ── Documents ────────────────────────────────────────────────────────────────

export interface ResolvedDocument {
  title: string;
  description: string;
  href: string | null;
  size: string | null;
}

export function resolvedDocuments(): ResolvedDocument[] {
  return property.documents.map((d) => {
    if (!d.file) return { ...d, href: null, size: null };
    const abs = path.join(process.cwd(), 'public', 'documents', d.file);
    if (!fs.existsSync(abs)) return { ...d, href: null, size: null };
    const bytes = fs.statSync(abs).size;
    const size = bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
    return { ...d, href: `/documents/${encodeURIComponent(d.file)}`, size };
  });
}

// ── Content checklist ────────────────────────────────────────────────────────

/** Everything still missing before publication. Printed at build time and shown in dev. */
export function contentChecklist(): string[] {
  const missing: string[] = [];
  if (property.site.url.includes('example.com')) missing.push('Live website URL (site.url)');
  if (property.price == null && property.status !== 'sold') missing.push('Asking price (price)');
  if (!property.address.street) missing.push('Street address (address.street)');
  if (!property.address.zip) missing.push('ZIP code (address.zip)');
  if (!property.facts.squareFeetVerified) missing.push('Verified square footage (facts.squareFeetVerified)');
  for (const p of property.photos) if (!images.has(p.file.toLowerCase())) missing.push(`Photo: src/assets/photos/${p.file}`);
  for (const g of property.specs) for (const s of g.items) if (s.value == null) missing.push(`Spec: ${g.group} → ${s.label}`);
  for (const d of resolvedDocuments()) if (!d.href) missing.push(`Document: ${d.title}`);
  if (!property.location.neighborhood) missing.push('Neighborhood description (location.neighborhood)');
  if (!property.contact.name) missing.push('Contact name (contact.name)');
  if (!property.contact.email && !property.contact.phone) missing.push('Contact email or phone (contact.email / contact.phone)');
  if (property.contact.form.provider === 'none') missing.push('Contact form delivery service (contact.form)');
  return missing;
}
