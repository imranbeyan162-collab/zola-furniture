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
  { name: 'Table', slug: 'table', icon: 'Square', sort_order: 1 },
  { name: 'Chair', slug: 'chair', icon: 'Armchair', sort_order: 2 },
  { name: 'Sofa', slug: 'sofa', icon: 'Sofa', sort_order: 3 },
  { name: 'Bed', slug: 'bed', icon: 'Bed', sort_order: 4 },
  { name: 'Cupboard', slug: 'cupboard', icon: 'Archive', sort_order: 5 },
  { name: 'Rotan', slug: 'rotan', icon: 'Sparkles', sort_order: 6 },
];

for (const cat of categories) {
  insertCategory.run(cat.name, cat.slug, cat.icon, cat.sort_order);
}
console.log(`✅ Seeded ${categories.length} categories`);

// 2. Seed Products (including actual supplied photos from /images/)
const insertProduct = db.prepare(`
  INSERT INTO products (
    name, slug, description, category, price, type, area,
    image_urls, featured, in_stock, rating, tag
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const products = [
  {
    name: 'SOFA MODERN SECTIONAL',
    slug: 'sofa-modern-sectional',
    description: 'Bespoke deep-cushion emerald velvet corner sofa crafted by Zola artisans in Addis Ababa. Features reinforced kiln-dried hardwood framing, high-density resilience foam, and premium stain-resistant velvet fabric tailored for modern living spaces.',
    category: 'Sofa',
    price: 48500,
    type: 'home',
    area: 'Bole',
    image_urls: JSON.stringify(['/images/06-zola-green-corner-sofa.png']),
    featured: 1,
    in_stock: 1,
    rating: 4.95,
    tag: 'Best deal'
  },
  {
    name: 'ROYAL PATTERNED ACCENT CHAIR',
    slug: 'royal-patterned-accent-chair',
    description: 'Distinctive custom-upholstered armchair with geometric patterned fabric, solid turned wooden legs, and ergonomic lumbar contouring. Ideal for executive lounges, hotel suites, and statement living rooms.',
    category: 'Chair',
    price: 18500,
    type: 'home',
    area: 'Kazanchis',
    image_urls: JSON.stringify(['/images/03-zola-patterned-dining-chair.png']),
    featured: 1,
    in_stock: 1,
    rating: 4.9,
    tag: 'Approved quality'
  },
  {
    name: 'MIDNIGHT VELVET DINING SUITE',
    slug: 'midnight-velvet-dining-suite',
    description: 'Complete 6-seater luxury dining suite featuring diamond-quilted midnight black velvet dining chairs paired with a reinforced dark stain dining table. High durability finish designed for family gatherings and fine dining.',
    category: 'Table',
    price: 64000,
    type: 'home',
    area: 'CMC',
    image_urls: JSON.stringify(['/images/05-zola-black-velvet-dining-set.png']),
    featured: 1,
    in_stock: 1,
    rating: 5.0,
    tag: 'Best quality'
  },
  {
    name: 'CARRARA MARBLE DINING TABLE SET',
    slug: 'carrara-marble-dining-table-set',
    description: 'Polished genuine marble top dining table accompanied by brass-trimmed ergonomic upholstered chairs. Resistant to heat and moisture, engineered for sophisticated residential and luxury hotel dining.',
    category: 'Table',
    price: 89000,
    type: 'restaurant',
    area: 'Sarbet',
    image_urls: JSON.stringify(['/images/07-zola-marble-dining-set.png']),
    featured: 1,
    in_stock: 1,
    rating: 4.92,
    tag: 'Best quality'
  },
  {
    name: 'SAPPHIRE ROYAL VELVET SOFA SET',
    slug: 'sapphire-royal-velvet-sofa-set',
    description: 'Grand 3+2+1 Chesterfield sofa set upholstered in sapphire blue velvet with hand-tufted diamond buttons and antique brass studs. Masterpiece craftsmanship from Zola Furniture PLC factory.',
    category: 'Sofa',
    price: 76000,
    type: 'home',
    area: 'Bole',
    image_urls: JSON.stringify(['/images/08-zola-blue-velvet-sofa-set.png']),
    featured: 1,
    in_stock: 1,
    rating: 4.98,
    tag: 'Best quality'
  },
  {
    name: 'ARTISAN BAR TABLE & HIGH STOOLS',
    slug: 'artisan-bar-table-high-stools',
    description: 'Heavy-duty commercial bar height counter table with 4 matching high-back upholstered barstools. Powder-coated steel structure with solid timber tops, engineered for restaurants, cafes, and rooftop lounges.',
    category: 'Chair',
    price: 36000,
    type: 'bar',
    area: 'Piazza',
    image_urls: JSON.stringify(['/images/04-zola-bar-table-and-stools.png']),
    featured: 1,
    in_stock: 1,
    rating: 4.88,
    tag: 'Commercial grade'
  },
  {
    name: 'URBAN CAFE & BISTRO BOOTH SET',
    slug: 'urban-cafe-bistro-booth-set',
    description: 'Modular banquet seating and cafe table combination with wipe-clean commercial upholstery and reinforced high-traffic bases. Ideal for coffee shops, pastry bars, and fast-casual restaurants in Addis Ababa.',
    category: 'Chair',
    price: 42000,
    type: 'cafe',
    area: 'Bole',
    image_urls: JSON.stringify(['/images/09-zola-cafe-seating.png']),
    featured: 1,
    in_stock: 1,
    rating: 4.85,
    tag: 'Cafe special'
  },
  {
    name: 'HAND-WOVEN ROTAN LOUNGE CHAIR',
    slug: 'hand-woven-rotan-lounge-chair',
    description: 'All-weather organic rattan round egg chair with waterproof orange accent cushion and weather-treated woven frame. Perfect for verandas, garden patios, and sunlit balcony corners.',
    category: 'Rotan',
    price: 22500,
    type: 'home',
    area: 'All Addis Ababa',
    image_urls: JSON.stringify(['https://images.unsplash.com/photo-1580481077195-c228ff31a98e?auto=format&fit=crop&w=800&q=80']),
    featured: 1,
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
    featured: 1,
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
    name: 'EXECUTIVE TIMBER OFFICE DESK',
    slug: 'executive-timber-office-desk',
    description: 'Heavy solid wanza wood executive desk with integrated cable management, locking document drawers, and brushed gold aluminum inlays. Built for C-suite offices and corporate boardrooms.',
    category: 'Table',
    price: 52000,
    type: 'office',
    area: 'Bole',
    image_urls: JSON.stringify(['https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80']),
    featured: 0,
    in_stock: 1,
    rating: 4.94,
    tag: 'Executive line'
  },
  {
    name: 'ERGONOMIC LEATHER OFFICE TASK CHAIR',
    slug: 'ergonomic-leather-office-task-chair',
    description: 'High-back executive task chair wrapped in breathable top-grain leather with synchronized tilt-lock mechanism, adjustable 3D armrests, and quiet polyurethane casters.',
    category: 'Chair',
    price: 24500,
    type: 'office',
    area: 'Kazanchis',
    image_urls: JSON.stringify(['https://images.unsplash.com/photo-1580481077195-c228ff31a98e?auto=format&fit=crop&w=800&q=80']),
    featured: 0,
    in_stock: 1,
    rating: 4.87,
    tag: 'Office essential'
  },
  {
    name: 'SCANDINAVIAN ROTAN DINING CHAIR',
    slug: 'scandinavian-rotan-dining-chair',
    description: 'Natural woven cane back dining chair with solid beech wood structure and neutral padded seat. Blends timeless mid-century elegance with breathable Ethiopian climate comfort.',
    category: 'Rotan',
    price: 16500,
    type: 'restaurant',
    area: 'Sarbet',
    image_urls: JSON.stringify(['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80']),
    featured: 0,
    in_stock: 1,
    rating: 4.82,
    tag: 'Trending'
  },
  {
    name: 'MODERN LOW-PROFILE COFFEE TABLE',
    slug: 'modern-low-profile-coffee-table',
    description: 'Double tier organic oval coffee table with fluted oak base and tempered bronze glass top. An exquisite centerpiece for living room ensembles.',
    category: 'Table',
    price: 19500,
    type: 'home',
    area: 'All Addis Ababa',
    image_urls: JSON.stringify(['https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80']),
    featured: 0,
    in_stock: 1,
    rating: 4.89,
    tag: 'New arrival'
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
    cover_image: '/images/08-zola-blue-velvet-sofa-set.png',
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
    cover_image: '/images/05-zola-black-velvet-dining-set.png',
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
// Password: admin123 (bcrypt hashed)
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
insertInquiry.run(
  'Abebe Kebede',
  '0911 234 567',
  'abebe.kebede@gmail.com',
  'Interested in purchasing the 6-seater Midnight Velvet Dining Suite. Do you deliver to CMC near Michael Church?',
  3,
  'new'
);
insertInquiry.run(
  'Selamawit Haile',
  '0922 876 543',
  'selam.haile@yahoo.com',
  'Can the emerald sofa sectional be customized to 3.2m x 2.4m dimensions to fit our living room in Bole?',
  1,
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
  'Commercial Furniture Quote for New Cafe in Kazanchis',
  'We are opening a 45-seat specialty coffee lounge in Kazanchis next month and would like a catalogue and price list for bulk cafe booth seating.',
);
console.log('✅ Seeded 1 sample contact message');

console.log('🎉 Database seeding completed successfully!');
