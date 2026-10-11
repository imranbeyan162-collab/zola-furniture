const bcrypt = require('bcryptjs');
const db = require('./db');

console.log('🌱 Starting database seeding for Zola Furniture PLC...');

// Clear existing tables
db.exec(`
  DELETE FROM products;
  DELETE FROM categories;
  DELETE FROM blog_posts;
  DELETE FROM admin_users;
  DELETE FROM inquiries;
  DELETE FROM contact_messages;
`);

// 1. Seed Categories
const insertCategory = db.prepare(`
  INSERT INTO categories (name, slug, icon, sort_order)
  VALUES (?, ?, ?, ?)
`);

const categories = [
  { name: 'Chair', slug: 'chair', icon: 'Armchair', sort_order: 1 },
  { name: 'Sofa', slug: 'sofa', icon: 'Sofa', sort_order: 2 },
  { name: 'Table', slug: 'table', icon: 'Square', sort_order: 3 },
  { name: 'Bed', slug: 'bed', icon: 'Bed', sort_order: 4 },
  { name: 'Cupboard', slug: 'cupboard', icon: 'Archive', sort_order: 5 },
  { name: 'Rotan', slug: 'rotan', icon: 'Sparkles', sort_order: 6 },
];

for (const cat of categories) {
  insertCategory.run(cat.name, cat.slug, cat.icon, cat.sort_order);
}
console.log(`✅ Seeded ${categories.length} categories`);

// 2. Seed Products
const insertProduct = db.prepare(`
  INSERT INTO products (
    name, slug, description, category, price, type, area,
    image_urls, featured, in_stock, rating, tag
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const products = [
  {
    name: 'THE SHELL LUXURY LOUNGE CHAIR',
    slug: 'the-shell-luxury-lounge-chair',
    description: 'Sculptural organic armchair crafted with fluted cream velvet upholstery and an architectural bent solid walnut shell. Inspired by contemporary Italian salon aesthetics and tailored by Zola Furniture master woodworkers in Addis Ababa.',
    category: 'Chair',
    price: 38500,
    type: 'home',
    area: 'Bole',
    image_urls: JSON.stringify(['/images/the-shell-luxury-chair.jpg']),
    featured: 1,
    in_stock: 1,
    rating: 5.0,
    tag: 'Signature Piece'
  },
  {
    name: 'THE NAUTILUS SCULPTURAL ROCKER',
    slug: 'the-nautilus-sculptural-rocker',
    description: 'Breathtaking fluid loop lounge rocker made from seasoned Ethiopian hardwood with an organic olive green velvet contoured seat. A dramatic statement piece for executive penthouse residences and luxury hotel lounges.',
    category: 'Chair',
    price: 45000,
    type: 'home',
    area: 'Kazanchis',
    image_urls: JSON.stringify(['/images/the-nautilus-luxury-chair.jpg']),
    featured: 1,
    in_stock: 1,
    rating: 4.98,
    tag: 'Masterpiece'
  },
  {
    name: 'THE CONCH BOUCLE ACCENT CHAIR',
    slug: 'the-conch-boucle-accent-chair',
    description: 'Textured ivory boucle fabric contoured inside a sweeping natural timber wing shell. Designed for deep relaxation, ergonomic lumbar posture, and refined contemporary interior warmth.',
    category: 'Chair',
    price: 34000,
    type: 'home',
    area: 'CMC',
    image_urls: JSON.stringify(['/images/the-conch-luxury-chair.jpg']),
    featured: 1,
    in_stock: 1,
    rating: 4.95,
    tag: 'Trending'
  },
  {
    name: 'EMERALD ROYAL MODULAR SECTIONAL',
    slug: 'emerald-royal-modular-sectional',
    description: 'Deep jewel-tone emerald green royal velvet modular corner sectional sofa. Kiln-dried hardwood framing, 38kg/m³ high-resilience memory foam cushions, brushed brass accent legs, and stain-resistant treatment.',
    category: 'Sofa',
    price: 78500,
    type: 'home',
    area: 'Bole',
    image_urls: JSON.stringify(['/images/luxury-emerald-sofa.jpg']),
    featured: 1,
    in_stock: 1,
    rating: 4.96,
    tag: 'Best seller'
  },
  {
    name: 'CARRARA MARBLE ARCHITECTURAL DINING SET',
    slug: 'carrara-marble-architectural-dining-set',
    description: 'Round genuine Carrara marble top dining table accompanied by fluted architectural brass pedestals and 6 tailored charcoal velvet ergonomic dining armchairs. Heat and scratch resistant finish.',
    category: 'Table',
    price: 98000,
    type: 'restaurant',
    area: 'Sarbet',
    image_urls: JSON.stringify(['/images/luxury-marble-table.jpg']),
    featured: 1,
    in_stock: 1,
    rating: 5.0,
    tag: 'Luxury Dining'
  },
  {
    name: 'SAPPHIRE ROYAL VELVET SOFA SET',
    slug: 'sapphire-royal-velvet-sofa-set',
    description: 'Grand 3+2+1 Chesterfield sofa set upholstered in sapphire blue velvet with hand-tufted diamond buttons and antique brass studs. Built with pride inside the Zola Furniture PLC Addis Ababa workshop.',
    category: 'Sofa',
    price: 76000,
    type: 'home',
    area: 'Bole',
    image_urls: JSON.stringify(['/images/08-zola-blue-velvet-sofa-set.png']),
    featured: 1,
    in_stock: 1,
    rating: 4.98,
    tag: 'Royal Line'
  },
  {
    name: 'MIDNIGHT VELVET 6-SEATER DINING SUITE',
    slug: 'midnight-velvet-6-seater-dining-suite',
    description: '6-seater luxury dining suite featuring diamond-quilted midnight black velvet dining chairs paired with a reinforced dark stain dining table. High durability finish engineered for family gatherings and fine dining.',
    category: 'Table',
    price: 64000,
    type: 'home',
    area: 'CMC',
    image_urls: JSON.stringify(['/images/05-zola-black-velvet-dining-set.png']),
    featured: 1,
    in_stock: 1,
    rating: 4.92,
    tag: 'Approved quality'
  },
  {
    name: 'ROYAL GEOMETRIC ACCENT CHAIR',
    slug: 'royal-geometric-accent-chair',
    description: 'Bespoke custom-upholstered armchair with geometric patterned fabric, solid turned wooden legs, and ergonomic lumbar contouring. Ideal for executive lounges and statement living rooms.',
    category: 'Chair',
    price: 18500,
    type: 'home',
    area: 'Kazanchis',
    image_urls: JSON.stringify(['/images/03-zola-patterned-dining-chair.png']),
    featured: 0,
    in_stock: 1,
    rating: 4.9,
    tag: 'Artisan Made'
  },
  {
    name: 'ARTISAN BAR TABLE & HIGH STOOLS',
    slug: 'artisan-bar-table-high-stools',
    description: 'Commercial bar-height counter table with 4 matching high-back upholstered barstools. Powder-coated steel structure with solid timber tops, engineered for cafes, restaurants, and rooftop lounges in Addis Ababa.',
    category: 'Chair',
    price: 36000,
    type: 'cafe',
    area: 'Piazza',
    image_urls: JSON.stringify(['/images/04-zola-bar-table-and-stools.png']),
    featured: 0,
    in_stock: 1,
    rating: 4.88,
    tag: 'Commercial grade'
  },
  {
    name: 'URBAN CAFE & BISTRO BOOTH SET',
    slug: 'urban-cafe-bistro-booth-set',
    description: 'Modular banquet seating and cafe table combination with wipe-clean commercial upholstery and reinforced high-traffic bases. Perfect for specialty coffee shops and hospitality venues.',
    category: 'Chair',
    price: 42000,
    type: 'cafe',
    area: 'Bole',
    image_urls: JSON.stringify(['/images/09-zola-cafe-seating.png']),
    featured: 0,
    in_stock: 1,
    rating: 4.85,
    tag: 'Cafe Special'
  },
  {
    name: 'HAND-WOVEN ORGANIC ROTAN LOUNGE CHAIR',
    slug: 'hand-woven-organic-rotan-lounge-chair',
    description: 'All-weather organic rattan round egg chair with waterproof accent cushion and weather-treated woven frame. Perfect for verandas, garden patios, and sunlit balcony corners.',
    category: 'Rotan',
    price: 22500,
    type: 'home',
    area: 'All Addis Ababa',
    image_urls: JSON.stringify(['https://images.unsplash.com/photo-1580481077195-c228ff31a98e?auto=format&fit=crop&w=800&q=80']),
    featured: 0,
    in_stock: 1,
    rating: 4.89,
    tag: 'Handcrafted'
  },
  {
    name: 'ADDIS LUXURY KING PLATFORM BED',
    slug: 'addis-luxury-king-platform-bed',
    description: 'Grand upholstered king size bed frame featuring tall fluted acoustic headboard, integrated under-bed hydraulic storage compartment, and silent slat suspension system.',
    category: 'Bed',
    price: 58000,
    type: 'home',
    area: 'CMC',
    image_urls: JSON.stringify(['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80']),
    featured: 0,
    in_stock: 1,
    rating: 4.96,
    tag: 'Master bedroom'
  },
  {
    name: 'MODULAR WARDROBE & CUPBOARD SYSTEM',
    slug: 'modular-wardrobe-cupboard-system',
    description: 'Four-door floor-to-ceiling wardrobe with smoked glass doors, internal warm LED motion lighting, aluminum hanging rods, and soft-close soft-touch German drawer slides.',
    category: 'Cupboard',
    price: 68000,
    type: 'home',
    area: 'Kazanchis',
    image_urls: JSON.stringify(['https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80']),
    featured: 0,
    in_stock: 1,
    rating: 4.91,
    tag: 'Custom fitted'
  },
  {
    name: 'EXECUTIVE SOLID WANZA OFFICE DESK',
    slug: 'executive-solid-wanza-office-desk',
    description: 'Heavy solid wanza wood executive desk with integrated cable management, locking document drawers, and brushed gold aluminum inlays. Built for corporate headquarters and boardroom suites.',
    category: 'Table',
    price: 52000,
    type: 'office',
    area: 'Bole',
    image_urls: JSON.stringify(['https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80']),
    featured: 0,
    in_stock: 1,
    rating: 4.94,
    tag: 'Executive line'
  }
];

for (const p of products) {
  insertProduct.run(
    p.name,
    p.slug,
    p.description,
    p.category,
    p.price,
    p.type,
    p.area,
    p.image_urls,
    p.featured,
    p.in_stock,
    p.rating,
    p.tag
  );
}
console.log(`✅ Seeded ${products.length} products`);

// 3. Seed Blog Posts
const insertBlog = db.prepare(`
  INSERT INTO blog_posts (title, slug, excerpt, body, cover_image, published, author)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const blogPosts = [
  {
    title: 'Top 5 Furniture Trends Transforming Addis Ababa Homes in 2026',
    slug: 'top-5-furniture-trends-addis-ababa-2026',
    excerpt: 'Discover why dark warm woods, curved silhouettes, and custom velvet fabrics are leading contemporary Ethiopian interior architecture.',
    body: `Modern living in Addis Ababa has entered an era of refined warmth. Homeowners and interior designers are moving away from sterile, cold aesthetics toward rich dark timbers, soft curved silhouettes, and custom jewel-tone velvets.

At Zola Furniture PLC, we have witnessed a surging preference for locally manufactured, durable pieces tailored to the unique climate and lifestyle of Addis Ababa. From Bole high-rise penthouses to spacious family residences in CMC and Sarbet, clients demand furniture that balances luxury with long-term durability.

Key highlights include:
1. Warm Dark Wood Accents: Replacing stark metals with organic timber warmth.
2. Curved Sculptural Sofas: Welcoming layouts that promote fluid family gatherings.
3. Multi-Functional Dining Spaces: Tables designed to transition seamlessly from family dinners to work-from-home hubs.
4. Locally Sourced Craftsmanship: Supporting master Ethiopian artisans while receiving custom made-to-measure furniture.`,
    cover_image: '/images/hero-luxury-living.jpg',
    published: 1,
    author: 'Dagim Fikre (Zola Furniture Design Director)'
  },
  {
    title: 'How to Care for Velvet and Hardwood Furniture in Ethiopian Climates',
    slug: 'care-for-velvet-and-hardwood-furniture-ethiopia',
    excerpt: 'Expert maintenance advice to protect your luxury upholstery and solid wood furnishings across dry and rainy seasons.',
    body: `Investing in bespoke furnishings requires proper seasonal care to ensure decades of beauty. Addis Ababa experiences distinct seasonal shifts between the dry winter and rainy Bega/Kiremt periods.

Velvet Upholstery Maintenance:
- Regular Gentle Vacuuming: Use a soft brush nozzle weekly to remove dust particles before they settle into pile fibers.
- Immediate Spill Action: Blot spills with a clean microfiber cloth immediately; never rub aggressively.
- Professional Steam Refresh: Gentle steam revives crushed velvet piles after heavy usage.

Hardwood Care:
- Maintain Distance from Direct Intense Sunlight: Protect timber finishes from UV fading.
- Nourish with Natural Beeswax: Twice a year, apply high-quality timber conditioner to prevent dryness during arid months.
- Clean with Damp Cloth Only: Avoid harsh chemical detergents that degrade protective sealants.

For custom restoration or re-upholstery inquiries, the Zola Furniture workshop provides lifetime maintenance services.`,
    cover_image: '/images/luxury-emerald-sofa.jpg',
    published: 1,
    author: 'Zola Master Workshop Team'
  }
];

for (const post of blogPosts) {
  insertBlog.run(
    post.title,
    post.slug,
    post.excerpt,
    post.body,
    post.cover_image,
    post.published,
    post.author
  );
}
console.log(`✅ Seeded ${blogPosts.length} blog posts`);

// 4. Seed Admin User
const passwordHash = bcrypt.hashSync('admin123', 10);
const insertAdmin = db.prepare(`
  INSERT INTO admin_users (email, password_hash, role)
  VALUES (?, ?, ?)
`);
insertAdmin.run('admin@zolafurniture.com', passwordHash, 'admin');
console.log('✅ Seeded admin user: admin@zolafurniture.com / admin123');

// 5. Seed sample inquiries
const insertInquiry = db.prepare(`
  INSERT INTO inquiries (name, phone, email, message, product_id, status)
  VALUES (?, ?, ?, ?, ?, ?)
`);
const firstProduct = db.prepare('SELECT id FROM products LIMIT 1').get();
const sampleProdId = firstProduct ? firstProduct.id : null;

insertInquiry.run(
  'Abebe Kebede',
  '0911 234 567',
  'abebe.kebede@gmail.com',
  'Interested in purchasing The Shell Lounge Chair and Marble Dining Table. Do you deliver to Bole near Edna Mall?',
  sampleProdId,
  'new'
);
insertInquiry.run(
  'Selamawit Haile',
  '0922 876 543',
  'selam.haile@yahoo.com',
  'Can the emerald sectional sofa be customized to 3.4m x 2.2m dimensions?',
  sampleProdId,
  'contacted'
);
console.log('✅ Seeded 2 sample customer quote inquiries');

// 6. Seed sample contact message
const insertContact = db.prepare(`
  INSERT INTO contact_messages (name, phone, email, subject, message)
  VALUES (?, ?, ?, ?, ?)
`);
insertContact.run(
  'Dawit Tadesse',
  '0933 555 777',
  'dawit.t@enterprise.et',
  'Commercial Furniture Quote for New Luxury Hotel Lounge in Kazanchis',
  'We need 24 custom lounge chairs and 8 marble dining tables for our new penthouse restaurant.',
);
console.log('✅ Seeded 1 sample contact message');

console.log('🎉 Database seeding completed successfully!');
