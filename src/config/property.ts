/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PROPERTY CONTENT — the only file you need to edit to update the website.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Conventions
 *  • `null` means "not supplied yet". The site shows a clearly marked
 *    placeholder (in brackets, with a dashed underline) instead of guessing.
 *  • Photos live in src/assets/photos/<folder>/. Reference them below by
 *    path relative to src/assets/photos (e.g. 'exterior/front.jpg').
 *    A photo whose file is missing is shown as a labelled placeholder.
 *  • Documents live in public/documents/. A document whose file is missing
 *    is shown as "Forthcoming" and is never linked.
 *  • After saving, the site rebuilds automatically on Vercel / Netlify
 *    (or run `npm run dev` to preview locally).
 *
 *  Nothing below should state something that is not true of the home.
 *  When in doubt, leave it `null`.
 */

export type ListingStatus = 'coming-soon' | 'for-sale' | 'under-contract' | 'sold';

export type PhotoCategory =
  | 'exterior'
  | 'living-room'
  | 'kitchen'
  | 'dining-room'
  | 'primary-suite'
  | 'bedrooms'
  | 'bathrooms'
  | 'addition'
  | 'outdoor';

export interface Photo {
  /** Short unique name used to reference the photo elsewhere in this file. */
  id: string;
  /** Path inside src/assets/photos. */
  file: string;
  category: PhotoCategory;
  /** Describe what is actually visible, for screen readers and search engines. */
  alt: string;
  /** Optional caption shown in the full-screen viewer. */
  caption?: string;
  /** Shape of the placeholder until the real photo is added (width / height). */
  placeholderAspect?: number;
  /** Force this photo to run full width in the gallery. */
  wide?: boolean;
  /** Set false to keep a photo out of the gallery (it can still be used in sections). */
  inGallery?: boolean;
}

export interface Spec {
  label: string;
  value: string | null;
  note?: string;
}

export interface PropertyDocument {
  title: string;
  description: string;
  /** File name inside public/documents, e.g. 'seller-disclosure.pdf'. */
  file: string | null;
}

export const property = {
  // ── Site & search engines ────────────────────────────────────────────────
  site: {
    /** The live URL (no trailing slash). Used for share links, SEO and the yard-sign QR code. */
    url: 'https://www.example.com',
    /** Browser-tab / search result title. The address is appended automatically when set. */
    title: 'A Brick Ranch Residence in Mebane, North Carolina',
    description:
      'A single-level brick ranch in Mebane, North Carolina: three bedrooms, two baths, a vaulted living room with fireplace, a flexible climate-controlled addition, and a tree-lined backyard.',
    /** Two-letter monogram used for the favicon and footer mark. */
    monogram: 'M',
  },

  // ── Listing status ───────────────────────────────────────────────────────
  /** 'coming-soon' | 'for-sale' | 'under-contract' | 'sold' */
  status: 'for-sale' as ListingStatus,
  /** Asking price in dollars, e.g. 365000. */
  price: null as number | null,
  /** Optional: shown only when status is 'sold'. Leave null to keep it private. */
  soldPrice: null as number | null,

  // ── Address ──────────────────────────────────────────────────────────────
  address: {
    street: null as string | null, // e.g. '123 Example Lane'
    city: 'Mebane',
    state: 'NC',
    stateName: 'North Carolina',
    zip: null as string | null,
  },

  // ── Hero ─────────────────────────────────────────────────────────────────
  hero: {
    headline: 'Welcome Home.',
    intro: 'A single-level brick ranch with light-filled rooms, a flexible addition, and a backyard framed by mature trees.',
    photo: 'exterior-front',
    /** Which part of the hero photo to keep in view on narrow screens (CSS object-position). */
    focus: '50% 60%',
  },

  // ── Key facts ────────────────────────────────────────────────────────────
  facts: {
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1700,
    /** Set true once the square footage is confirmed (it is then also published to search engines). */
    squareFeetVerified: false,
    squareFeetNote:
      'Approximately 1,700 finished square feet, including an approximately 225-square-foot addition. Subject to verification.',
    garage: '2-Car Garage',
  },

  // ── The story ────────────────────────────────────────────────────────────
  story: {
    eyebrow: 'The Residence',
    heading: 'Single-level living, rooted in brick and warmed by light.',
    paragraphs: [
      'This brick ranch offers the ease of living on one level, with a sense of space that unfolds room by room. Three bedrooms and two baths share a single floor, and the attached two-car garage keeps everyday arrivals simple.',
      'The living room rises beneath a vaulted ceiling, anchored by a fireplace and built-in shelving and brightened by abundant natural light. Nearby, a dining room with a tray ceiling, hardwood floors and substantial windows sets the table for weeknight dinners and holiday gatherings alike.',
      'A climate-controlled addition extends what the home can be: a home office and playroom today, and whatever the next chapter asks of it tomorrow. Out back, a grassy yard beneath mature trees invites play, quiet mornings and long summer evenings.',
    ],
    photo: 'exterior-angle',
  },

  // ── Photographs ──────────────────────────────────────────────────────────
  // Order here = order in the gallery. Add, remove or reorder freely.
  galleryCategories: [
    { id: 'exterior', label: 'Exterior' },
    { id: 'living-room', label: 'Living Room' },
    { id: 'kitchen', label: 'Kitchen' },
    { id: 'dining-room', label: 'Dining Room' },
    { id: 'primary-suite', label: 'Primary Suite' },
    { id: 'bedrooms', label: 'Additional Bedrooms' },
    { id: 'bathrooms', label: 'Bathrooms' },
    { id: 'addition', label: 'Home Office & Bonus Room' },
    { id: 'outdoor', label: 'Backyard & Outdoors' },
  ] as { id: PhotoCategory; label: string }[],

  photos: [
    // Exterior
    { id: 'exterior-front', file: 'exterior/front.jpg', category: 'exterior', alt: 'Front exterior of the brick ranch home', caption: 'The brick façade', wide: true },
    { id: 'exterior-angle', file: 'exterior/front-angle.jpg', category: 'exterior', alt: 'Angled view of the home’s brick exterior and attached two-car garage', caption: 'Attached two-car garage' },
    { id: 'exterior-addition', file: 'exterior/addition.jpg', category: 'exterior', alt: 'Exterior of the addition with siding alongside the original brick', caption: 'The addition, finished in complementary siding' },

    // Living room
    { id: 'living-1', file: 'living-room/living-1.jpg', category: 'living-room', alt: 'Living room with vaulted ceiling and fireplace', caption: 'Vaulted ceiling and fireplace', wide: true },
    { id: 'living-2', file: 'living-room/living-2.jpg', category: 'living-room', alt: 'Built-in shelving in the living room', caption: 'Built-in shelving', placeholderAspect: 4 / 5 },
    { id: 'living-3', file: 'living-room/living-3.jpg', category: 'living-room', alt: 'Natural light in the living room', caption: 'Natural light throughout', placeholderAspect: 4 / 5 },

    // Kitchen
    { id: 'kitchen-1', file: 'kitchen/kitchen-1.jpg', category: 'kitchen', alt: 'Kitchen with white cabinetry, granite countertops and peninsula', caption: 'White cabinetry and granite counters', wide: true },
    { id: 'kitchen-2', file: 'kitchen/kitchen-2.jpg', category: 'kitchen', alt: 'Kitchen peninsula with double sink', caption: 'Peninsula with double sink' },
    { id: 'kitchen-3', file: 'kitchen/kitchen-3.jpg', category: 'kitchen', alt: 'Decorative backsplash and under-cabinet lighting', caption: 'Backsplash and under-cabinet lighting', placeholderAspect: 4 / 5 },

    // Dining room
    { id: 'dining-1', file: 'dining-room/dining-1.jpg', category: 'dining-room', alt: 'Dining room with hardwood floors and large windows', caption: 'Hardwood floors and substantial windows' },
    { id: 'dining-2', file: 'dining-room/dining-2.jpg', category: 'dining-room', alt: 'Tray ceiling and decorative trim in the dining room', caption: 'Tray ceiling and decorative trim', placeholderAspect: 4 / 5 },

    // Primary suite
    { id: 'primary-1', file: 'primary-suite/bedroom-1.jpg', category: 'primary-suite', alt: 'Primary bedroom', caption: 'The primary bedroom', wide: true },
    { id: 'primary-bath-1', file: 'primary-suite/bath-vanity.jpg', category: 'primary-suite', alt: 'Primary bathroom double-sink vanity', caption: 'Double-sink vanity', placeholderAspect: 4 / 5 },
    { id: 'primary-bath-2', file: 'primary-suite/bath-tub.jpg', category: 'primary-suite', alt: 'Jetted soaking tub beneath a large glass-block window', caption: 'Jetted soaking tub and glass-block window', placeholderAspect: 4 / 5 },

    // Additional bedrooms
    { id: 'bedroom-2', file: 'bedrooms/bedroom-2.jpg', category: 'bedrooms', alt: 'Second bedroom', caption: 'Bedroom two' },
    { id: 'bedroom-3', file: 'bedrooms/bedroom-3.jpg', category: 'bedrooms', alt: 'Third bedroom', caption: 'Bedroom three' },

    // Bathrooms
    { id: 'bath-2', file: 'bathrooms/bath-2.jpg', category: 'bathrooms', alt: 'Second full bathroom', caption: 'Second full bath', placeholderAspect: 4 / 5 },

    // Addition
    { id: 'addition-1', file: 'addition/addition-1.jpg', category: 'addition', alt: 'Climate-controlled addition used as a home office and playroom', caption: 'Home office and playroom', wide: true },
    { id: 'addition-2', file: 'addition/addition-2.jpg', category: 'addition', alt: 'Windows and natural light in the addition', caption: 'Windows on the addition' },
    { id: 'addition-3', file: 'addition/addition-3.jpg', category: 'addition', alt: 'Brick architectural detail in the addition', caption: 'Existing brick character', placeholderAspect: 4 / 5 },

    // Outdoor
    { id: 'outdoor-1', file: 'outdoor/backyard-1.jpg', category: 'outdoor', alt: 'Grassy backyard with mature trees', caption: 'A backyard framed by mature trees', wide: true },
    { id: 'outdoor-2', file: 'outdoor/backyard-2.jpg', category: 'outdoor', alt: 'Outdoor play equipment in the backyard', caption: 'Room to play' },
    { id: 'outdoor-3', file: 'outdoor/rear-exterior.jpg', category: 'outdoor', alt: 'Rear of the home with access to the backyard', caption: 'Access from the rear of the home' },
  ] as Photo[],

  // ── Featured spaces ──────────────────────────────────────────────────────
  // layout: 'split' | 'split-reverse' | 'wide' | 'mosaic' | 'portrait' | 'panorama'
  featured: [
    {
      id: 'living',
      eyebrow: 'The Living Room',
      title: 'Volume, light, and a place to gather.',
      body: [
        'A vaulted ceiling lends the living room an airy, generous proportion. The fireplace gives the room its natural center, flanked by built-in shelving for books, photographs and the things worth keeping close.',
        'Abundant natural light moves through the space over the course of the day.',
      ],
      photos: ['living-1', 'living-2'],
      layout: 'split',
    },
    {
      id: 'kitchen',
      eyebrow: 'The Kitchen',
      title: 'Crisp, bright, and made for the everyday.',
      body: [
        'White cabinetry and granite countertops set a clean, timeless tone. A peninsula with a double sink keeps prep and cleanup in easy reach — and keeps the cook part of the conversation.',
        'A decorative backsplash and under-cabinet lighting finish the room with quiet detail.',
      ],
      photos: ['kitchen-1', 'kitchen-2', 'kitchen-3'],
      layout: 'mosaic',
    },
    {
      id: 'dining',
      eyebrow: 'The Dining Room',
      title: 'A room that invites you to linger.',
      body: [
        'A tray ceiling and decorative trim give the dining room a sense of occasion, while hardwood floors and substantial windows keep it warm and welcoming — as suited to Sunday supper as to a holiday table.',
      ],
      photos: ['dining-1', 'dining-2'],
      layout: 'split-reverse',
    },
    {
      id: 'primary',
      eyebrow: 'The Primary Suite',
      title: 'A private retreat at the end of the day.',
      body: [
        'The primary bedroom is paired with its own bath, appointed with a double-sink vanity and a jetted soaking tub set beneath a large glass-block window — bringing in daylight while preserving privacy.',
      ],
      photos: ['primary-1', 'primary-bath-1', 'primary-bath-2'],
      layout: 'wide',
    },
    {
      id: 'addition',
      eyebrow: 'The Flexible Addition',
      title: 'Room for whatever comes next.',
      body: [
        'Approximately 225 square feet of climate-controlled space extends the home beyond its original footprint. Today it serves as a home office and playroom; its windows draw in natural light, and the home’s existing brick lends it architectural character.',
        'Studio, den, guest retreat, or a quiet place for hobbies — the room adapts as needs change.',
      ],
      photos: ['addition-1', 'addition-2', 'addition-3'],
      layout: 'portrait',
      stat: { value: '225', label: 'Approx. square feet of climate-controlled space' },
    },
    {
      id: 'outdoor',
      eyebrow: 'Outdoor Living',
      title: 'Green lawn, mature trees, open sky.',
      body: [
        'Step out from the rear of the home onto a grassy yard framed by mature trees. Outdoor play equipment makes it a ready-made playground, while the lawn leaves room for gatherings, games and slow evenings outside.',
      ],
      photos: ['outdoor-1', 'outdoor-2', 'outdoor-3'],
      layout: 'panorama',
    },
  ] as {
    id: string;
    eyebrow: string;
    title: string;
    body: string[];
    photos: string[];
    layout: 'split' | 'split-reverse' | 'wide' | 'mosaic' | 'portrait' | 'panorama';
    /** Optional large figure shown beside the text. */
    stat?: { value: string; label: string };
  }[],

  // ── Specification sheet ──────────────────────────────────────────────────
  specs: [
    {
      group: 'The Home',
      items: [
        { label: 'Style', value: 'Single-story brick ranch with attached addition' },
        { label: 'Bedrooms', value: '3' },
        { label: 'Bathrooms', value: '2 full' },
        { label: 'Finished living area', value: 'Approx. 1,700 sq. ft.', note: 'Includes an approx. 225 sq. ft. addition. Subject to verification.' },
        { label: 'Year built', value: null },
        { label: 'Lot size', value: null },
        { label: 'County', value: null },
      ],
    },
    {
      group: 'Interior',
      items: [
        { label: 'Living room', value: 'Vaulted ceiling, fireplace, built-in shelving' },
        { label: 'Dining room', value: 'Tray ceiling, hardwood flooring, decorative trim' },
        { label: 'Addition', value: 'Climate-controlled; currently a home office and playroom' },
        { label: 'Natural light', value: 'Substantial windows throughout the main living spaces' },
      ],
    },
    {
      group: 'Kitchen & Baths',
      items: [
        { label: 'Kitchen', value: 'White cabinetry, granite countertops' },
        { label: 'Peninsula', value: 'With double sink' },
        { label: 'Details', value: 'Decorative backsplash, under-cabinet lighting' },
        { label: 'Primary bath', value: 'Double-sink vanity, jetted soaking tub, large glass-block window' },
        { label: 'Appliances included', value: null },
      ],
    },
    {
      group: 'Exterior & Grounds',
      items: [
        { label: 'Construction', value: 'Brick, with complementary siding on the addition' },
        { label: 'Garage', value: 'Attached two-car garage' },
        { label: 'Backyard', value: 'Grassy lawn, mature trees, outdoor play equipment' },
        { label: 'Driveway & parking', value: null },
      ],
    },
    {
      group: 'Systems & Updates',
      items: [
        { label: 'Roof', value: 'Replaced in 2020' },
        { label: 'HVAC', value: 'Major components rebuilt or replaced c. 2020', note: 'Exact details to be confirmed.' },
        { label: 'Heating fuel', value: null },
        { label: 'Water & sewer', value: null },
        { label: 'Other improvements', value: null },
      ],
    },
  ] as { group: string; items: Spec[] }[],

  // ── Documents ────────────────────────────────────────────────────────────
  // Put PDFs in public/documents and set `file`. Missing files show as "Forthcoming".
  documents: [
    { title: 'Property Information Sheet', description: 'A one-page summary of the home’s features and specifications.', file: null },
    { title: 'Seller Disclosures', description: 'North Carolina residential property disclosure statement.', file: null },
    { title: 'Floor Plan', description: 'Room layout and approximate dimensions.', file: null },
    { title: 'Survey / Plat', description: 'Recorded survey or plat of the property.', file: null },
    { title: 'Improvements & Updates', description: 'Roof (2020), HVAC work (c. 2020) and other improvements, with dates.', file: null },
  ] as PropertyDocument[],
  /** Show documents that haven't been supplied yet as "Forthcoming". Set false to hide them. */
  showForthcomingDocuments: true,

  // ── Location ─────────────────────────────────────────────────────────────
  location: {
    heading: 'Mebane, North Carolina',
    // Please review this introduction before publishing.
    intro: [
      'Mebane sits in the rolling Piedmont of North Carolina, between Burlington and Hillsborough along the Interstate 40/85 corridor, with a historic downtown at its heart.',
    ],
    /** A short, verified description of the immediate neighborhood. */
    neighborhood: null as string | null,
    /** Verified nearby places, e.g. { name: 'Downtown Mebane', detail: 'Shops and dining' }. */
    nearby: [] as { name: string; detail?: string }[],
    /** Show an embedded map. Uses the full address when supplied, otherwise the city. */
    showMap: true,
  },

  // ── Contact & showings ───────────────────────────────────────────────────
  contact: {
    /** Name shown as the point of contact (agent or owner). */
    name: null as string | null,
    /** e.g. 'Listing Agent' or 'Offered by the Owner'. */
    role: null as string | null,
    brokerage: null as string | null,
    email: null as string | null,
    /** Display format, e.g. '(919) 555-0100'. */
    phone: null as string | null,
    showingInstructions:
      'Private showings are available by appointment. Share a preferred date and we will be in touch to confirm a time.' as string,
    /**
     * Where form submissions are delivered. The form only appears when a
     * provider is configured — it never pretends to send.
     *  • 'formspree'  → endpoint: 'https://formspree.io/f/xxxxxxx'
     *  • 'web3forms'  → accessKey: 'your-web3forms-access-key'
     *  • 'netlify'    → no key needed (only works when hosted on Netlify)
     *  • 'none'       → visitors are offered email / phone instead
     */
    form: {
      provider: 'none' as 'formspree' | 'web3forms' | 'netlify' | 'none',
      endpoint: null as string | null,
      accessKey: null as string | null,
    },
  },

  // ── Footer ───────────────────────────────────────────────────────────────
  legal:
    'Information is believed accurate but is not guaranteed and should be independently verified. Square footage is approximate.',
};

export type Property = typeof property;
