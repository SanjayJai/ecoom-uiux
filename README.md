# NOVARA — Premium Lifestyle & Fashion E-Commerce

A modern, responsive e-commerce experience crafted with **pure HTML5, CSS3, and Vanilla JavaScript (ES6+)**. Designed to the visual and interaction standards of world-class design houses (Apple, Nike, Zara).

---

## 1. Project Architecture & Directory Structure

```
novara-store/
├── index.html              # Homepage with Hero, Categories, Featured, Editorial, Reviews & Footer
├── shop.html               # Catalog with live Category Pills, Price Filter, Search & Sorting
├── product.html            # Dynamic Product Detail (gallery switcher, size/color validation, stock)
├── cart.html               # Dedicated Shopping Bag with line totals, coupon engine & checkout preview
├── wishlist.html           # Wishlist with LocalStorage sync, count badges & "Move to Bag"
├── about.html              # Brand Story, 4 Craftsmanship Pillars & Flagship Studios
├── css/
│   ├── style.css           # Design tokens, typography, header, hero, footer, base utilities
│   ├── components.css      # Buttons, cards, drawers, search overlay, badges, modals, PDP layout
│   └── responsive.css      # Fluid layouts for 320px, 480px, 768px, 1024px, 1440px+
├── js/
│   ├── products.js         # 12 curated luxury products dataset & query methods (INR ₹)
│   ├── app.js              # Global app init, sticky header, announcements, toast notifications
│   ├── cart.js             # Cart state manager, integer calculation, coupons & drawer renderer
│   ├── wishlist.js         # Wishlist state manager, heart button sync & move-to-cart
│   ├── search.js           # Debounced search panel with suggestion tags & keyboard access
│   └── product-detail.js   # Dynamic PDP reader (?id=...), gallery switcher & size validations
├── assets/
│   ├── images/             # Product photography fallbacks and brand assets
│   └── icons/              # SVG icon definitions
└── README.md               # Architecture documentation & production guide
```

---

## 2. Key Features & Implementation Highlights

### A. Minimalist Luxury Aesthetics
- **Color Palette**: Deep Charcoal (`#121214`), Warm Beige (`#f5f0e6`), Cream (`#faf7f2`), Soft Gold/Champagne (`#b08d57`), and Crisp White (`#ffffff`).
- **Typography**: Google Font `Plus Jakarta Sans` for clean, high-legibility UI typography paired with `Italiana` for luxury editorial accents.
- **Micro-Interactions**: Subtle hover lifts, image cross-fade transitions, animated slide-in drawers, and floating toast notifications.

### B. Functional Cart Engine (`js/cart.js`)
- **Integer Paise Calculation**: Prevents floating-point rounding inaccuracies in totals.
- **Progressive Free Shipping**: Real-time progress bar toward the ₹1,999 free express shipping threshold.
- **Promo Coupon System**:
  - `NOVARA10`: 10% discount on order subtotal.
  - `FIRST500`: ₹500 off on orders over ₹2,500.
  - `FREESHIP`: Complimentary express shipping on any order.
- **Persistence**: Cart and coupons persist across page reloads and synchronize across open browser tabs via `localStorage`.

### C. Client-Side Catalog Filtering (`shop.html`)
- **Zero-Refresh Filtering**: Updates the product catalog instantly without reloading the page.
- **Multi-Faceted Controls**:
  - Filter by category pills (`Men`, `Women`, `Accessories`, `New Arrivals`, `Bestsellers`).
  - Filter by price tiers (`Under ₹5,000`, `₹5,000 – ₹8,000`, `Above ₹8,000`).
  - Filter by live in-store keyword search.
  - Sort by Featured, Price Low-to-High, Price High-to-Low, Highest Rated, and Newest First.

### D. Dynamic Product Detail View (`product.html`)
- Reads product parameters dynamically via URL query string (`?id=nv-101`).
- Multi-angle thumbnail image gallery with instant preview switcher.
- Strict size selection validation before adding to bag.
- Stock availability indicator directly linked to inventory counts.
- Interactive Size & Fit guide modal with measurements in inches and cm.

---

## 3. How to Run Locally

You do not need Node.js, Webpack, or NPM build tools to run this prototype.

### Option 1: Python HTTP Server (Recommended)
Open a terminal in the project directory and run:
```bash
python -m http.server 8080
```
Open your browser and navigate to:
```
http://localhost:8080/index.html
```

### Option 2: Node.js `npx serve`
```bash
npx -y serve .
```

### Option 3: Direct File Opening
Double-click `index.html` in your file explorer to open it directly in Google Chrome, Edge, Safari, or Firefox.

---

## 4. Customization Guide

### How to Change Branding & Logo
1. Open `css/style.css` and customize color tokens in `:root`:
   ```css
   --color-black: #121214;       /* Primary text & dark surfaces */
   --color-cream: #faf7f2;       /* Page background */
   --color-accent: #b08d57;      /* Brand accent / champagne gold */
   ```
2. Replace brand name `NOVARA` in the `<header>` across `index.html`, `shop.html`, `product.html`, `cart.html`, `wishlist.html`, and `about.html`.

### How to Add or Update Products
Open `js/products.js` and add a new item to `PRODUCTS_DATA`:
```javascript
{
  id: "nv-113",
  name: "Silk-Cashmere Knit Polo",
  category: "men",
  tags: ["men", "tops", "new-arrivals"],
  price: 6990,
  originalPrice: 8490,
  badge: "New",
  rating: 4.9,
  reviewsCount: 24,
  inStock: true,
  stockCount: 8,
  sku: "NOV-POLO-M13",
  primaryImage: "https://your-image-url-here.jpg",
  secondaryImage: "https://your-hover-image-url-here.jpg",
  gallery: ["url1.jpg", "url2.jpg"],
  colors: [{ name: "Ivory", hex: "#f8f5ee" }],
  sizes: ["S", "M", "L", "XL"],
  description: "Crafted from a featherweight 70% silk 30% cashmere blend.",
  details: ["70% Mulberry Silk, 30% Cashmere", "Hand wash cold"]
}
```

---

## 5. Testing & Quality Assurance Checklist

| Area | Desktop (1440px / 1200px) | Tablet (768px – 1024px) | Mobile (320px – 480px) |
|---|---|---|---|
| **Sticky Header** | Elevates with subtle shadow on scroll | Elevates; shows hamburger menu toggle | Responsive logo scale, touch icons (44px target) |
| **Hero Section** | 2-column split with floating badge | Stacked layout with centered typography | Full-width buttons, responsive text scaling |
| **Category Cards** | 4-column grid with image zoom | 2-column grid | 1-column cards with comfortable touch targets |
| **Product Grid** | 4 columns, secondary image hover | 2 columns with easy tap | 1 or 2 columns, accessible Quick Add |
| **Cart Drawer** | Slides in 460px from right | Slides in with smooth blur backdrop | 100% width drawer, touch-friendly stepper |
| **Live Search** | Dropdown panel with instant results | Full width overlay with trending pills | Virtual keyboard friendly, clear button |
| **Wishlist** | Heart toggle with live count badge | Synced via localStorage | Quick "Move to Bag" button |
| **Checkout Flow** | Subtotal + Shipping + Promo discount | Responsive summary sticky card | Stacked summary card with secure badges |

---

## 6. Production Backend Integration Requirements (e.g., Laravel / Node.js)

Because this is a frontend-only prototype, real commercial deployment requires server-side architecture:

1. **Authentication & Session Management**:
   - Integrate Laravel Sanctum or OAuth 2.0 / JWT for customer accounts, password resets, and session tokens.
2. **Authoritative Price & Inventory Validation**:
   - Never trust frontend prices, quantities, or discounts calculated in browser JavaScript.
   - The server must validate stock levels in a PostgreSQL/MySQL database before issuing an order lock.
3. **Payment Gateway Integration**:
   - Integrate server-side SDKs for Razorpay, Stripe, or Cashfree.
   - Use HMAC-SHA256 signature verification on webhooks to confirm payment capture before marking orders as paid.
4. **Coupon & Discount Engine**:
   - Validate coupon codes against database rules (expiration date, usage limit per user, minimum cart value).
5. **Transactional Email / SMS**:
   - Connect SendGrid, AWS SES, or Twilio via background job queues (e.g. Laravel Redis Queues) for order receipts, tracking numbers, and newsletter welcome emails.
6. **Content Delivery Network (CDN) & Asset Optimization**:
   - Host product photography on Amazon S3 / Cloudflare R2 with WebP/AVIF auto-compression.
# ecoom-uiux
