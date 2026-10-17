/**
 * NOVARA - Premium Lifestyle & Fashion
 * Product Catalog Data & Helper Methods
 */

const PRODUCTS_DATA = [
  {
    id: "nv-101",
    name: "Architectural Merino Wool Blazer",
    category: "men",
    tags: ["men", "outerwear", "new-arrivals", "bestsellers"],
    price: 8990,
    originalPrice: 11990,
    badge: "Bestseller",
    rating: 4.9,
    reviewsCount: 84,
    inStock: true,
    stockCount: 7,
    sku: "NOV-BLZ-M01",
    primaryImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Charcoal Slate", hex: "#26282b" },
      { name: "Oatmeal Beige", hex: "#d8cfc4" },
      { name: "Midnight Navy", hex: "#141b2b" }
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Tailored from Italian 280gsm extrafine merino wool, this single-breasted blazer blends relaxed tailoring with razor-sharp architectural lines. Features unconstructed shoulders and genuine horn buttons.",
    details: [
      "100% Extrafine Italian Merino Wool",
      "Bemberg cupro half-lining for breathability",
      "Corozo nut button closures",
      "Double back vents with interior welt pockets",
      "Dry clean only. Made in limited batches."
    ]
  },
  {
    id: "nv-102",
    name: "Mulberry Silk Drape Shirt",
    category: "women",
    tags: ["women", "tops", "new-arrivals"],
    price: 6490,
    originalPrice: 7990,
    badge: "New Arrival",
    rating: 4.8,
    reviewsCount: 56,
    inStock: true,
    stockCount: 14,
    sku: "NOV-SLK-W02",
    primaryImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Champagne Cream", hex: "#f0e6d6" },
      { name: "Obsidian Black", hex: "#111111" },
      { name: "Terracotta Rose", hex: "#c27c69" }
    ],
    sizes: ["XS", "S", "M", "L"],
    description: "Crafted from sand-washed 22-momme Mulberry silk, the Drape Shirt offers a liquid fluid drape with a subtle matte sheen. Designed with French seams and an elongated cuff.",
    details: [
      "100% Grade 6A Mulberry Silk (22 Momme)",
      "Mother-of-pearl buttons",
      "Concealed placket with relaxed camp collar",
      "Hypoallergenic and temperature-regulating",
      "Hand wash cold or gentle dry clean"
    ]
  },
  {
    id: "nv-103",
    name: "Full-Grain Italian Leather Tote",
    category: "accessories",
    tags: ["accessories", "bags", "bestsellers"],
    price: 12490,
    originalPrice: 14990,
    badge: "Bestseller",
    rating: 5.0,
    reviewsCount: 112,
    inStock: true,
    stockCount: 5,
    sku: "NOV-TOT-A03",
    primaryImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Saddle Tan", hex: "#9b6034" },
      { name: "Nero Black", hex: "#1c1b1a" },
      { name: "Forest Moss", hex: "#354035" }
    ],
    sizes: ["One Size"],
    description: "Minimalist vegetable-tanned Tuscan leather tote designed for a lifetime of carry. Features an interior padded sleeve fitting up to a 16\" laptop, solid brass hardware, and painted edges.",
    details: [
      "Certified Tuscan vegetable-tanned full-grain leather",
      "Ages with a rich, unique patina over time",
      "Dedicated padded 16-inch laptop compartment",
      "Magnetic closure with internal key lanyard",
      "Dimensions: 42cm W x 34cm H x 14cm D"
    ]
  },
  {
    id: "nv-104",
    name: "Cashmere Ribbed Mockneck Sweater",
    category: "women",
    tags: ["women", "knitwear", "new-arrivals"],
    price: 7490,
    originalPrice: 9490,
    badge: "New",
    rating: 4.9,
    reviewsCount: 68,
    inStock: true,
    stockCount: 9,
    sku: "NOV-CSH-W04",
    primaryImage: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Warm Alabaster", hex: "#f5f0ea" },
      { name: "Camel", hex: "#b58d60" },
      { name: "Graphite", hex: "#424244" }
    ],
    sizes: ["XS", "S", "M", "L"],
    description: "Spun from 100% Grade-A Mongolian cashmere with a 7-gauge fisherman rib knit. Exceptionally soft against the skin, delivering warmth without bulk in an effortless boxy fit.",
    details: [
      "100% Sustainable Mongolian Cashmere",
      "Subtle ribbed cuffs and hem with split side seams",
      "Pill-resistant yarn processing",
      "Certified standard for sustainable cashmere",
      "Store folded; dry clean only"
    ]
  },
  {
    id: "nv-105",
    name: "Pleated Relaxed Trouser",
    category: "men",
    tags: ["men", "bottoms", "bestsellers"],
    price: 4990,
    originalPrice: 5990,
    badge: null,
    rating: 4.7,
    reviewsCount: 47,
    inStock: true,
    stockCount: 16,
    sku: "NOV-TRS-M05",
    primaryImage: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Sandstone", hex: "#cbbea9" },
      { name: "Deep Olive", hex: "#3e4235" },
      { name: "Pure Black", hex: "#0f0f10" }
    ],
    sizes: ["30", "32", "34", "36"],
    description: "Designed with a forward double pleat and a relaxed tapered leg, this trouser bridges the gap between formal tailoring and relaxed street luxury. Woven with Japanese cotton-tencel blend.",
    details: [
      "65% Lyocell / Tencel, 35% Organic Cotton",
      "Extended waist tab with concealed button",
      "Side slant pockets and rear welt pockets",
      "Finished internal bias tape binding",
      "Machine wash gentle cycle cold, hang dry"
    ]
  },
  {
    id: "nv-106",
    name: "Sculptural Acetate Sunglasses",
    category: "accessories",
    tags: ["accessories", "eyewear", "new-arrivals"],
    price: 4290,
    originalPrice: 5490,
    badge: "Sale",
    rating: 4.8,
    reviewsCount: 93,
    inStock: true,
    stockCount: 8,
    sku: "NOV-EYE-A06",
    primaryImage: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Dark Havana", hex: "#4a3423" },
      { name: "Smoky Quartz", hex: "#635f5c" },
      { name: "Solid Jet", hex: "#111111" }
    ],
    sizes: ["One Size"],
    description: "Mazzucchelli bio-acetate frames featuring beveled geometric facets and 100% UVA/UVB Carl Zeiss polarized lenses. Finished with hand-riveted 5-barrel hinges.",
    details: [
      "Handmade Japanese Mazzucchelli acetate",
      "CR-39 polarized lenses with anti-reflective coating",
      "Category 3 UV400 filter protection",
      "Includes hard leather case and microfiber cloth",
      "Frame dimensions: 51mm - 20mm - 145mm"
    ]
  },
  {
    id: "nv-107",
    name: "Minimalist Nubuck Leather Sneaker",
    category: "men",
    tags: ["men", "footwear", "bestsellers"],
    price: 6990,
    originalPrice: 8990,
    badge: "Bestseller",
    rating: 4.9,
    reviewsCount: 140,
    inStock: true,
    stockCount: 11,
    sku: "NOV-FTW-M07",
    primaryImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Chalk Off-White", hex: "#e7e4dc" },
      { name: "Taupe Suede", hex: "#a49483" },
      { name: "Onyx", hex: "#1d1d1f" }
    ],
    sizes: ["40", "41", "42", "43", "44", "45"],
    description: "Crafted in Portugal from velvety Italian nubuck with calfskin leather lining and custom vulcanized rubber Margom outsoles. Clean, unbranded aesthetic that elevates any trousers or denim.",
    details: [
      "Premium European nubuck upper",
      "Full calfskin leather lining and removable insole",
      "Stitched Margom rubber cupsole",
      "Waxed cotton tonal laces",
      "Handcrafted in Porto, Portugal"
    ]
  },
  {
    id: "nv-108",
    name: "Double-Faced Wool Belted Trench",
    category: "women",
    tags: ["women", "outerwear", "new-arrivals"],
    price: 13990,
    originalPrice: 16990,
    badge: "New",
    rating: 5.0,
    reviewsCount: 39,
    inStock: true,
    stockCount: 4,
    sku: "NOV-COT-W08",
    primaryImage: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Classic Camel", hex: "#c49a6c" },
      { name: "Midnight Charcoal", hex: "#232428" }
    ],
    sizes: ["XS", "S", "M", "L"],
    description: "Hand-finished double-faced virgin wool coat with an enveloping storm flap, raglan sleeves, and a self-fabric tie belt. The epitome of modern understated luxury.",
    details: [
      "90% Virgin Wool, 10% Cashmere",
      "Hand-sewn edges requiring 14 hours of craftsmanship",
      "Unlined construction for effortless movement",
      "Deep side welt pockets",
      "Specialist dry clean only"
    ]
  },
  {
    id: "nv-109",
    name: "Supima Cotton Oversized T-Shirt",
    category: "men",
    tags: ["men", "tops", "bestsellers"],
    price: 2490,
    originalPrice: 2990,
    badge: "Essential",
    rating: 4.8,
    reviewsCount: 215,
    inStock: true,
    stockCount: 35,
    sku: "NOV-TEE-M09",
    primaryImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Optic Chalk", hex: "#f8f8f8" },
      { name: "Washed Black", hex: "#2b2a2a" },
      { name: "Sage Gray", hex: "#8d9489" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Heavyweight 260gsm American Supima extra-long staple cotton. Pre-shrunk with a tight rib collar that retains its shape wash after wash. Dropped shoulder relaxed silhouette.",
    details: [
      "100% Certified American Supima Cotton",
      "Heavyweight 260 GSM single jersey",
      "Double needle hem and sleeve stitching",
      "Garment dyed for soft hand feel",
      "Machine wash warm with like colors"
    ]
  },
  {
    id: "nv-110",
    name: "Raw Brass & Agate Cuff Bangle",
    category: "accessories",
    tags: ["accessories", "jewelry", "new-arrivals"],
    price: 3290,
    originalPrice: 3990,
    badge: "New",
    rating: 4.7,
    reviewsCount: 31,
    inStock: true,
    stockCount: 10,
    sku: "NOV-CUF-A10",
    primaryImage: "https://images.unsplash.com/photo-1611591475879-110f0f5b1d4a?auto=format&fit=crop&w=900&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1611591475879-110f0f5b1d4a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Brushed Brass", hex: "#d1b46a" },
      { name: "Silver Rhodium", hex: "#d1d5db" }
    ],
    sizes: ["One Size"],
    description: "Hand-forged brutalist bangle crafted from solid brass with natural black moss agate inlays. Gently adjustable fit with a micro-brushed satin surface.",
    details: [
      "Solid architectural grade brass with anti-tarnish micro-coating",
      "Natural ethical black moss agate gemstone",
      "Laser engraved NOVARA hallmark inside",
      "Includes protective velvet storage pouch",
      "Wipe clean with dry jewelry cloth"
    ]
  },
  {
    id: "nv-111",
    name: "Linen-Blend Chore Overshirt",
    category: "men",
    tags: ["men", "tops", "outerwear"],
    price: 5290,
    originalPrice: 6490,
    badge: null,
    rating: 4.8,
    reviewsCount: 62,
    inStock: true,
    stockCount: 18,
    sku: "NOV-CHR-M11",
    primaryImage: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Olive Khaki", hex: "#5d634d" },
      { name: "Natural Ecru", hex: "#ebe6dc" },
      { name: "Washed Indigo", hex: "#2b3b55" }
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Inspired by vintage workwear and refined with modern proportions. Woven from breathable Normandy flax and organic cotton with three utilitarian patch pockets.",
    details: [
      "55% French Linen, 45% Organic Cotton",
      "Triple patch exterior pockets",
      "Internal reinforcement stitching at stress points",
      "Natural corozo button closures",
      "Machine wash cold, line dry"
    ]
  },
  {
    id: "nv-112",
    name: "Pleated Column Maxi Skirt",
    category: "women",
    tags: ["women", "bottoms", "bestsellers"],
    price: 5790,
    originalPrice: 6990,
    badge: "Bestseller",
    rating: 4.9,
    reviewsCount: 78,
    inStock: true,
    stockCount: 6,
    sku: "NOV-SKT-W12",
    primaryImage: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=900&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Espresso", hex: "#302621" },
      { name: "Sand", hex: "#dfd8ce" }
    ],
    sizes: ["XS", "S", "M", "L"],
    description: "An architectural column maxi silhouette featuring precision heat-set accordion pleating and an invisible side zipper. Pairs seamlessly with fine knits or structured blazers.",
    details: [
      "Permanent heat-pressed pleat technology",
      "Concealed YKK side zipper",
      "High-rise elasticated interior waistband",
      "Maxi length with subtle walking ease",
      "Hand wash cold, dry flat"
    ]
  }
];

// Helper functions
const NovaraCatalog = {
  getAll: () => PRODUCTS_DATA,
  
  getById: (id) => PRODUCTS_DATA.find(p => p.id === id) || null,
  
  getFeatured: (limit = 8) => PRODUCTS_DATA.slice(0, limit),
  
  getBestsellers: (limit = 4) => PRODUCTS_DATA.filter(p => p.tags.includes("bestsellers")).slice(0, limit),
  
  getNewArrivals: (limit = 4) => PRODUCTS_DATA.filter(p => p.tags.includes("new-arrivals")).slice(0, limit),
  
  getByCategory: (category) => {
    if (!category || category === "all") return PRODUCTS_DATA;
    return PRODUCTS_DATA.filter(p => p.category === category || p.tags.includes(category));
  },
  
  getRelated: (productId, limit = 4) => {
    const current = NovaraCatalog.getById(productId);
    if (!current) return PRODUCTS_DATA.slice(0, limit);
    return PRODUCTS_DATA
      .filter(p => p.id !== productId && (p.category === current.category || p.tags.some(t => current.tags.includes(t))))
      .slice(0, limit);
  },
  
  formatCurrency: (amount) => {
    const formatted = new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0
    }).format(amount);
    return `₹${formatted}`;
  },
  
  calculateDiscount: (original, current) => {
    if (!original || original <= current) return 0;
    return Math.round(((original - current) / original) * 100);
  }
};

// Export to window
if (typeof window !== "undefined") {
  window.PRODUCTS_DATA = PRODUCTS_DATA;
  window.NovaraCatalog = NovaraCatalog;
}
