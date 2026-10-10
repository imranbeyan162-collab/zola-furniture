# 🛋️ Zola Furniture PLC — Full-Stack Web Platform

> **"Quality and durability is our identity"**  
> Complete full-stack web application for **Zola Furniture PLC**, premier furniture manufacturer and supplier in Addis Ababa, Ethiopia.

Built to match the reference mobile/desktop dark dashboard aesthetic with warm dark brown tones (`#241e1a`), gold accents (`#c9a24a`), interactive 3D coverflow product slider, real SQLite persistent database, AI customer helper, and full-featured Admin Dashboard.

---

## 🌟 Key Features & Highlights

- **3D Coverflow Product Carousel**:
  - Touch swipe (mobile), mouse drag (desktop), arrow buttons, and keyboard arrow navigation.
  - Centered squircle card with peeking side cards, active gold glowing styling, and dynamic ETB pricing.
  - Instant Category switching (`Chair`, `Sofa`, `Table`, `Bed`, `Cupboard`, `Rotan`).
- **Capsule Search Bar**:
  - Direct 3-field filtering: **City / Area** (Bole, CMC, Kazanchis, Sarbet, Piazza), **Typology** (Home, Office, Restaurant, Cafe), and **Max Price in ETB**.
  - Real-time reactive database queries.
- **"Categories & Information" 3-Column Grid**:
  - Exact 9-tile layout matching the reference screenshot: *Home Design, Information Product, Location Store, Furniture Design, Maintenance, Customer Services, Interior Design, Administration, Blog*.
  - Interactive modals and quick links for every tile.
- **Full Products Catalog**:
  - Search by keyword, filter by category or typology, price ceiling, and availability status.
  - Real database backed.
- **Product Details & Request Quote Modals**:
  - High-resolution photography, timber specifications (Wanza, Tid, Oak), foam resilience details, and warranty terms.
  - Quote request form saves directly into the SQLite database with inline validation and confirmation.
- **Showroom & Contact Section**:
  - Tap-to-call mobile buttons for **0935 745 559** and **0962 049 696**.
  - TikTok community badge for `@dagim.fikre.falah` (3,200+ followers).
  - Showroom address in Addis Ababa with working message inbox.
- **Floating AI Assistant (`✨`)**:
  - Conversational chatbot responding to delivery areas across Addis Ababa, hardwood materials, custom dimensions, and pricing in ETB.
- **Protected Admin Dashboard (`/admin`)**:
  - JWT authentication with bcrypt password hashing.
  - Live statistics: Total Products, New Pending Inquiries, Customer Messages.
  - Product CRUD: Add new model, edit, delete, toggle featured in carousel.
  - Inquiries manager: View phone, email, specifications, and update status (`New`, `Contacted`, `Closed`).
  - Contact messages viewer and manager.
  - Pre-seeded default admin credentials with session token persistence.

---

## 📁 Project Architecture

```
Zola furniture/
├── client/                     # Frontend Application (Vite + React + Tailwind CSS)
│   ├── public/
│   │   └── images/             # Product photography & logos
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx              # Sticky glassmorphism nav with mobile drawer
│   │   │   ├── Hero.jsx                # Luxury hero banner & 3-field search capsule
│   │   │   ├── ProductCarousel.jsx     # 3D coverflow touch/swipe product slider
│   │   │   ├── CategoriesInfoGrid.jsx  # 3-column reference icon tile grid
│   │   │   ├── ProductCatalog.jsx      # Full searchable & filterable catalog
│   │   │   ├── ProductModal.jsx        # Product detail inspection modal
│   │   │   ├── QuoteModal.jsx          # Official quote request modal
│   │   │   ├── LocationShowroom.jsx    # Showroom, phones, TikTok & contact form
│   │   │   ├── SupportFAQ.jsx          # Customer FAQ accordion
│   │   │   ├── BlogSection.jsx         # Design journal & reading view
│   │   │   ├── AboutSection.jsx        # Heritage & craftsmanship story
│   │   │   ├── AIAssistant.jsx         # Floating AI helper sparkle chat
│   │   │   ├── AdminDashboard.jsx      # Protected admin management suite
│   │   │   ├── AdminLoginModal.jsx     # JWT login modal
│   │   │   ├── InfoTileModal.jsx       # Details modal for categories & info grid
│   │   │   ├── MobileBottomBar.jsx     # Fixed bottom bar matching reference
│   │   │   └── Footer.jsx              # Complete footer with contacts
│   │   ├── App.jsx             # Main state orchestration
│   │   ├── index.css           # Luxury styling & custom animations
│   │   └── main.jsx
│   ├── vite.config.js          # Vite config with API reverse proxy
│   └── package.json
│
├── server/                     # Backend API & Database
│   ├── db.js                   # Native Node.js SQLite (DatabaseSync), schemas, indexes
│   ├── seed.js                 # Database seeder (14 products, categories, blog, admin)
│   ├── server.js               # Express REST API, JWT auth, Multer uploads, AI chat
│   └── test.js                 # Automated API test suite (12 tests)
│
├── data/
│   └── zola.db                 # SQLite database file (WAL mode enabled)
├── public/
│   └── images/                 # Original client product images
├── .env.example                # Environment variables template
├── package.json                # Root scripts (start, seed, test, build)
└── README.md
```

---

## 🚀 Quick Setup & Running Locally

### Prerequisites
- **Node.js**: v22.5.0 or later (v24.x recommended for native `node:sqlite`)
- **npm**: v10+

### 1. Install Dependencies
```bash
# Install server dependencies in root
npm install

# Install client dependencies
npm --prefix client install
```

### 2. Seed the Database
Pre-populates 14 authentic furniture products (with Ethiopian pricing in ETB), 6 categories, 2 blog posts, and default admin credentials:
```bash
npm run seed
```

### 3. Run Automated API Tests
Verifies health check, category listing, product filtering, search, quote submission validation, JWT auth, and admin endpoints:
```bash
npm test
```
*(All 12 automated tests pass with 0 failures)*

### 4. Build and Run Production Server
```bash
# Build frontend assets
npm run build

# Start full-stack server on http://localhost:5000
npm start
```
Open **[http://localhost:5000](http://localhost:5000)** in your browser!

### Development Mode (Concurrent)
To develop with live hot-reloading:
```bash
# Terminal 1: Backend server on port 5000
npm run dev:server

# Terminal 2: Vite dev server on port 3000 (proxies /api to 5000)
npm run dev:client
```
Visit `http://localhost:3000` during development.

---

## 🔐 Admin Dashboard Access

Click the **Admin** button in the top navigation bar or the profile icon on the mobile bottom bar:
- **URL**: Accessible via navigation or directly at `/admin`
- **Default Email**: `admin@zolafurniture.com`
- **Default Password**: `admin123`

> ⚠️ **Important Security Notice**: Upon deploying to production, please log in and change the default admin password in the database or via environment variables.

---

## 🗄️ Database Models

- **`products`**: `id`, `name`, `slug`, `description`, `category`, `price` (ETB), `type` (home, office, restaurant, cafe), `area`, `image_urls` (JSON), `featured` (0/1), `in_stock` (0/1), `rating`, `tag`, `created_at`, `updated_at`.
- **`categories`**: `id`, `name`, `slug`, `icon`, `sort_order`.
- **`inquiries`**: `id`, `name`, `phone`, `email`, `message`, `product_id`, `status` (`new`, `contacted`, `closed`), `created_at`.
- **`contact_messages`**: `id`, `name`, `phone`, `email`, `subject`, `message`, `created_at`.
- **`blog_posts`**: `id`, `title`, `slug`, `excerpt`, `body`, `cover_image`, `published`, `author`, `published_at`.
- **`admin_users`**: `id`, `email`, `password_hash`, `role`, `created_at`.

---

## 🌐 Production Deployment Guide

### Option 1: VPS (Ubuntu / Debian / DigitalOcean / Linode / Hetzner)
1. Install Node.js 22+:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
2. Clone repository and install dependencies:
   ```bash
   git clone <repo-url> zola-furniture
   cd zola-furniture
   npm install
   npm --prefix client install
   npm run seed
   npm run build
   ```
3. Run with PM2 for background daemon execution & automatic restart:
   ```bash
   sudo npm install -g pm2
   pm2 start server/server.js --name "zola-furniture"
   pm2 startup
   pm2 save
   ```
4. Configure Nginx reverse proxy with SSL (Certbot):
   ```nginx
   server {
       server_name zolafurniture.com www.zolafurniture.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Option 2: Render / Railway
1. Create a new **Web Service** pointing to this repository.
2. Build Command:
   ```bash
   npm install && npm --prefix client install && npm run build && npm run seed
   ```
3. Start Command:
   ```bash
   npm start
   ```
4. Environment Variables:
   - `PORT`: `5000` (or leave default assigned by platform)
   - `JWT_SECRET`: `<generate-a-strong-random-key>`
   - `NODE_ENV`: `production`

---

## 📞 Company Contact Details

- **Business Name**: Zola Furniture PLC
- **Location**: Addis Ababa, Ethiopia
- **Phone Numbers**: 
  - `0935 745 559`
  - `0962 049 696`
- **TikTok**: `@dagim.fikre.falah` (3,200+ followers)
- **Tagline**: *"Quality and durability is our identity"*
