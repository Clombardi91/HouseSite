# Mebane Residence: Property Website

A one-page website built to market a single-story brick ranch in Mebane, North Carolina. It is designed to load quickly on a phone right after someone scans the yard-sign QR code.

- **Built with:** [Astro](https://astro.build) (it outputs plain static HTML) and Tailwind CSS. A few small scripts handle the photo viewer, menu and form.
- **Hosting:** any static host. Vercel and Netlify config files are included.
- **Editing:** almost everything lives in **one file**, `src/config/property.ts`.

---

## 1. Run it on your computer

You need [Node.js](https://nodejs.org) 18.20 or newer (22 recommended).

```bash
git clone https://github.com/Clombardi91/HouseSite.git
cd HouseSite
npm install
npm run dev        # open http://localhost:4321
```

While `npm run dev` is running, a **Content checklist** panel in the bottom-left corner lists everything still missing. Visitors never see this panel; it only appears in development. `npm run build` prints the same list.

| Command | What it does |
| --- | --- |
| `npm run dev` | Local preview that refreshes as you edit |
| `npm run build` | Builds the production site into `dist/` and optimizes every photo |
| `npm run preview` | Serves the built `dist/` folder locally |
| `npm run qr` | Creates the yard-sign QR codes (see section 8) |

---

## 2. Editing the content

Open **`src/config/property.ts`**. Each part of the site has its own labelled block:

| What you want to change | Where in `property.ts` |
| --- | --- |
| Asking price | `price: 349900` (a number, no `$` or commas) |
| Listing status / Sold | `status: 'for-sale'` → `'coming-soon'`, `'under-contract'` or `'sold'` |
| Address | `address.street`, `address.zip` |
| Headline and hero text | `hero.headline`, `hero.intro` |
| Story text | `story.paragraphs` |
| Room-by-room sections | `featured` |
| Specification sheet | `specs` |
| Photos and their order | `photos` |
| Documents | `documents` |
| Location text | `location` |
| Contact details and form | `contact` |

**The placeholder rule:** a value of `null` means "not supplied yet". The site then shows a marked placeholder such as `[ Asking price ]` or `[ To be provided ]` instead of guessing. To fill one in, swap the `null` for the real value:

```ts
price: 349900 as number | null,
address: { street: '123 Example Lane', ..., zip: '27302' },
{ label: 'Year built', value: '1994' },
```

### Marking the home Sold

```ts
status: 'sold' as ListingStatus,
soldPrice: null,      // optional; leave null to keep the price private
```

Save and deploy. The hero gets a discreet "Sold" mark, the price block reads "Sold", the showing form becomes a general contact form, and the price is removed from search-engine data. `'under-contract'` and `'coming-soon'` work the same way.

---

## 3. Adding your photographs

1. Put each photo in the matching folder under `src/assets/photos/`:

   ```
   src/assets/photos/
     exterior/       front.jpg  front-angle.jpg  addition.jpg
     living-room/    living-1.jpg  living-2.jpg  living-3.jpg
     kitchen/        kitchen-1.jpg  kitchen-2.jpg  kitchen-3.jpg
     dining-room/    dining-1.jpg  dining-2.jpg
     primary-suite/  bedroom-1.jpg  bath-vanity.jpg  bath-tub.jpg
     bedrooms/       bedroom-2.jpg  bedroom-3.jpg
     bathrooms/      bath-2.jpg
     addition/       addition-1.jpg  addition-2.jpg  addition-3.jpg
     outdoor/        backyard-1.jpg  backyard-2.jpg  rear-exterior.jpg
   ```

   If you use these exact names, photos appear automatically and the placeholders go away. Each placeholder on the site shows the exact file path it is waiting for.

2. **Using different names, or adding and removing photos:** edit the `photos` list in `property.ts`. Each entry looks like this:

   ```ts
   { id: 'kitchen-1', file: 'kitchen/kitchen-1.jpg', category: 'kitchen',
     alt: 'Kitchen with white cabinetry, granite countertops and peninsula',
     caption: 'White cabinetry and granite counters', wide: true },
   ```

   - **Order:** the gallery shows photos in list order, grouped by room.
   - **`alt`:** describe only what is actually visible. Screen readers and search engines use it.
   - **`caption`:** optional. It appears in the full-screen viewer.
   - **`wide: true`:** gives the photo a full row in the gallery. Other photos are paired side by side at a shared height, so nothing gets cropped.
   - **`inGallery: false`:** uses a photo in a section without showing it in the gallery.

3. **The hero photo** is the photo named in `hero.photo` (normally `exterior-front`). On tall phone screens the hero has to crop to fill the screen. `hero.focus` (for example `'50% 60%'`) picks which part stays in view.

4. **Featured sections** list photos by `id` in `featured[].photos`. The first photo is the large one.

**Tips for photo files:**

- JPEG, PNG, WebP and AVIF all work. Upload the largest originals you have; 2400 px or more on the long edge is ideal.
- During the build, every photo is automatically resized to several widths and converted to AVIF and WebP. Each visitor downloads only the size their screen needs, and photos below the fold load only as they scroll into view.
- Use the photographs as taken. Don't use edits that add, remove or alter features of the home.
- Before uploading, remove GPS location data from photos taken on a phone. Most phones offer this in the share sheet ("Options → Location: off").

---

## 4. Documents

1. Save each PDF into `public/documents/`, for example `public/documents/seller-disclosure.pdf`.
2. In `property.ts`, set that document's `file`:

   ```ts
   { title: 'Seller Disclosures', description: '…', file: 'seller-disclosure.pdf' },
   ```

A document appears with **View** and **Download** buttons and its file size only once its PDF exists. Until then it shows as "Forthcoming · Available on request" with no link, so a visitor can never hit a broken download. To hide documents that aren't ready instead, set `showForthcomingDocuments: false`. You can add as many document entries as you like.

Remove personal information that isn't needed (signatures, account numbers, unrelated names) before posting a document.

---

## 5. Contact form and showing requests

The form **only appears when it can actually deliver messages**. Until a service is configured, visitors see your phone and email with tap-to-call and tap-to-email buttons. Fill in `contact.name`, `contact.phone` and/or `contact.email` in any case.

Choose **one** delivery service:

| Service | Setup | `property.ts` |
| --- | --- | --- |
| **Formspree** (any host, free tier) | Sign up at formspree.io, create a form and copy its endpoint | `provider: 'formspree'`, `endpoint: 'https://formspree.io/f/abcdwxyz'` |
| **Web3Forms** (any host, free) | Get an access key at web3forms.com; messages go to the email you register | `provider: 'web3forms'`, `accessKey: 'your-key'` |
| **Netlify Forms** (Netlify hosting only) | Deploy on Netlify, then turn on form detection under *Site → Forms* | `provider: 'netlify'` |

The form shows "Thank you, your message has been sent" **only** when the service confirms delivery. Any failure tells the visitor to call or email instead. After deploying, send yourself a test message.

---

## 6. Deploying (Vercel or Netlify)

The site sits at the root of this repository, so no root or base directory setting is needed.

### Vercel

1. Go to vercel.com → **Add New… → Project** and import the GitHub repository.
2. Framework preset: **Astro** (detected automatically). Build command `npm run build`, output `dist`.
3. Click **Deploy**.

### Netlify

1. Go to app.netlify.com → **Add new site → Import an existing project** and pick the repository.
2. Leave **Base directory** empty. The build command and publish folder come from `netlify.toml`.
3. Click **Deploy**.

After that, every change you push to GitHub (a new price, a new photo, `status: 'sold'`) rebuilds and republishes the site automatically, usually within a minute or two. Both hosts also let you upload photos and edit `property.ts` directly in the GitHub web interface.

---

## 7. Connecting a custom domain

A short, memorable domain looks better on a yard sign than a `*.vercel.app` address. Something like `123examplelane.com` works well, and domains cost about $10–20 a year from registrars such as Cloudflare, Namecheap or Squarespace Domains.

**Vercel:** Project → **Settings → Domains** → add `www.yourdomain.com` and `yourdomain.com`. Vercel shows the DNS records to create at your registrar, typically an `A` record for the bare domain and a `CNAME` for `www`. HTTPS is set up automatically.

**Netlify:** Site → **Domain management → Add a domain**. Either point your registrar's nameservers at Netlify DNS, or add the `A` / `CNAME` records Netlify lists. HTTPS is automatic.

**Then:** set `site.url` in `property.ts` to the final address (for example `https://www.123examplelane.com`, no trailing slash) and push. This makes share links, link previews (Open Graph) and search-engine data use the real domain.

---

## 8. The yard-sign QR code

Generate it **after** the custom domain works, so the printed code never points at a temporary address.

```bash
npm run qr
# or, to override the URL:
npm run qr -- https://www.yourdomain.com
```

This creates:

- `qr/yard-sign-qr.svg`: vector artwork. Send this to the sign printer; it scales to any size without blurring.
- `qr/yard-sign-qr.png`: 4000 × 4000 px, for anything that needs a raster image.

The script refuses to run while `site.url` is still the `example.com` placeholder, and warns if the URL looks like a temporary hosting address. The codes use the highest error-correction level, so they stay readable when weathered or partly shaded.

**Printing advice:** print the code at least 4 × 4 inches (6 × 6 or larger reads more reliably from the curb), dark on a light background, with a clear white margin around it. Add a short line such as "Scan to tour the home". **Test it with two different phones before ordering.**

---

## 9. What's in the project

```
HouseSite/
  src/config/property.ts   ← all editable content
  src/assets/photos/       ← your photographs (optimized automatically)
  public/documents/        ← your PDFs
  src/components/          ← page sections (Hero, Gallery, Lightbox, Specs, …)
  src/lib/content.ts       ← helpers: photo lookup, formatting, checklist
  src/styles/global.css    ← colors, typography, motion
  scripts/generate-qr.mjs  ← yard-sign QR generator
```

**Design system:** warm ivory `#f7f4ee`, deep charcoal `#24231f`, muted sage `#5e6a56`, with brass `#a4875a` used only for hairline details. Headings are set in Cormorant Garamond and text in Jost. Both fonts are bundled with the site, so no third-party font requests are made. All text colors meet WCAG AA contrast.

**Built-in features:** mobile-first layout; a quick-action bar on phones (Photos / Call or Documents / Showing); native sharing (or copy-link) buttons; a full-screen gallery with swipe, arrow-key, Home/End and Escape support; scroll reveals that switch off when the visitor's device asks for reduced motion; semantic headings and landmarks; a skip link; Open Graph and Twitter preview tags (using the hero photo once added); schema.org `RealEstateListing` data that includes only confirmed facts; a favicon and app icon; a 404 page; and long-term caching for optimized assets.
