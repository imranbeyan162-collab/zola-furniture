const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'zola-furniture-super-secret-jwt-key-2026';

// 1. Middleware & Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

app.use(cors({
  origin: '*', // Allow local frontend and deployment domain
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static images serving
const publicDir = path.join(__dirname, '..', 'public');
app.use('/images', express.static(path.join(publicDir, 'images')));

// Ensure uploads directory exists
const uploadsDir = path.join(publicDir, 'images', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer upload config for admin product images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueName = `zola-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif/;
    const ext = path.extname(file.originalname).toLowerCase().slice(1);
    if (allowed.test(ext)) {
      return cb(null, true);
    }
    cb(new Error('Only image files (jpg, jpeg, png, webp) are permitted.'));
  }
});

// Simple rate limiter for inquiry & auth endpoints
const rateLimitMap = new Map();
function rateLimiter(limitCount = 20, windowMs = 60000) {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();
    const entry = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };

    if (now > entry.resetTime) {
      entry.count = 1;
      entry.resetTime = now + windowMs;
    } else {
      entry.count += 1;
    }

    rateLimitMap.set(ip, entry);

    if (entry.count > limitCount) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests. Please wait a moment before trying again.'
      });
    }
    next();
  };
}

// JWT Authentication Middleware for Admin Routes
function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Unauthorized: Admin authentication token required' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Unauthorized: Invalid or expired session token' });
  }
}

// ==========================================
// PUBLIC API ROUTES
// ==========================================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Zola Furniture PLC API',
    timestamp: new Date().toISOString()
  });
});

// Categories
app.get('/api/categories', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM categories ORDER BY sort_order ASC');
    const categories = stmt.all();
    res.json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, error: 'Unable to retrieve categories' });
  }
});

// Products (with filtering, search, pagination)
app.get('/api/products', (req, res) => {
  try {
    const { category, type, area, maxPrice, search, featured, page = 1, limit = 50 } = req.query;

    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (category && category !== 'all' && category !== 'All') {
      query += ' AND LOWER(category) = LOWER(?)';
      params.push(category);
    }

    if (type && type !== 'all' && type !== 'All') {
      query += ' AND LOWER(type) = LOWER(?)';
      params.push(type);
    }

    if (area && area !== 'all' && area !== 'All' && area !== 'All Addis Ababa') {
      query += ' AND (LOWER(area) = LOWER(?) OR area = "All Addis Ababa")';
      params.push(area);
    }

    if (maxPrice && !isNaN(Number(maxPrice))) {
      query += ' AND price <= ?';
      params.push(Number(maxPrice));
    }

    if (featured === 'true' || featured === '1') {
      query += ' AND featured = 1';
    }

    if (search && search.trim() !== '') {
      query += ' AND (name LIKE ? OR description LIKE ? OR tag LIKE ?)';
      const term = `%${search.trim()}%`;
      params.push(term, term, term);
    }

    query += ' ORDER BY featured DESC, id DESC';

    const countStmt = db.prepare(query.replace('SELECT * FROM', 'SELECT COUNT(*) as total FROM'));
    const totalRow = countStmt.get(...params);
    const total = totalRow ? totalRow.total : 0;

    const offset = (Number(page) - 1) * Number(limit);
    query += ' LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));

    const stmt = db.prepare(query);
    const products = stmt.all(...params).map(p => ({
      ...p,
      image_urls: JSON.parse(p.image_urls || '[]')
    }));

    res.json({
      success: true,
      data: products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, error: 'Unable to retrieve products' });
  }
});

// Single Product by slug or ID
app.get('/api/products/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    const stmt = db.prepare('SELECT * FROM products WHERE slug = ? OR id = ?');
    const product = stmt.get(slug, slug);

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.json({
      success: true,
      data: {
        ...product,
        image_urls: JSON.parse(product.image_urls || '[]')
      }
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ success: false, error: 'Error fetching product' });
  }
});

// Quote Request / Inquiry Submission
app.post('/api/inquiries', rateLimiter(15), (req, res) => {
  try {
    const { name, phone, email, message, product_id } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Please enter your full name.' });
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ success: false, error: 'Please enter a valid phone number for quote follow-up.' });
    }
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
    }

    const stmt = db.prepare(`
      INSERT INTO inquiries (name, phone, email, message, product_id, status)
      VALUES (?, ?, ?, ?, ?, 'new')
    `);

    const result = stmt.run(
      name.trim(),
      phone.trim(),
      email.trim(),
      (message || 'No additional specifications provided').trim(),
      product_id ? Number(product_id) : null
    );

    res.status(201).json({
      success: true,
      message: 'Thank you! Your quote request has been received. Our Zola Furniture consultant will call you shortly.',
      inquiryId: result.lastInsertRowid
    });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    res.status(500).json({ success: false, error: 'Failed to process inquiry. Please try again.' });
  }
});

// Contact Message Submission
app.post('/api/contact', rateLimiter(15), (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Please enter your name.' });
    }
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Please enter your message.' });
    }

    const stmt = db.prepare(`
      INSERT INTO contact_messages (name, phone, email, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `);

    stmt.run(
      name.trim(),
      phone ? phone.trim() : '',
      email.trim(),
      (subject || 'General Inquiry').trim(),
      message.trim()
    );

    res.status(201).json({
      success: true,
      message: 'Message delivered! Our customer support team will reply within 24 hours.'
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ success: false, error: 'Failed to send message.' });
  }
});

// Blog Posts
app.get('/api/blog', (req, res) => {
  try {
    const stmt = db.prepare('SELECT id, title, slug, excerpt, cover_image, author, published_at FROM blog_posts WHERE published = 1 ORDER BY id DESC');
    const posts = stmt.all();
    res.json({ success: true, data: posts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ success: false, error: 'Unable to retrieve blog posts' });
  }
});

app.get('/api/blog/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    const stmt = db.prepare('SELECT * FROM blog_posts WHERE slug = ? OR id = ?');
    const post = stmt.get(slug, slug);

    if (!post) {
      return res.status(404).json({ success: false, error: 'Article not found' });
    }

    res.json({ success: true, data: post });
  } catch (error) {
    console.error('Error fetching blog article:', error);
    res.status(500).json({ success: false, error: 'Unable to retrieve article' });
  }
});

// Floating AI Helper Chat Endpoint
app.post('/api/ai-chat', rateLimiter(30), (req, res) => {
  try {
    const { message } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, reply: 'How can I assist you with Zola Furniture today?' });
    }

    const lower = message.toLowerCase();
    let reply = '';

    if (lower.includes('deliver') || lower.includes('shipping') || lower.includes('location') || lower.includes('where')) {
      reply = `🚚 **Delivery & Coverage:** Zola Furniture PLC delivers across all sub-cities in Addis Ababa (Bole, CMC, Kazanchis, Sarbet, Piazza, Ayat, Lebu, and Gerji). White-glove installation and assembly in your room of choice is included with every delivery!`;
    } else if (lower.includes('price') || lower.includes('cost') || lower.includes('etb') || lower.includes('quote') || lower.includes('birr')) {
      reply = `💰 **Pricing & Quotes:** Our pricing is in Ethiopian Birr (ETB), starting from ETB 16,500 for crafted chairs to ETB 89,000 for imported Italian Carrara marble dining sets. You can request an exact custom quote on any product card by clicking **"Request Quote"**!`;
    } else if (lower.includes('wood') || lower.includes('material') || lower.includes('timber') || lower.includes('quality') || lower.includes('leather') || lower.includes('fabric')) {
      reply = `🪵 **Materials & Craftsmanship:** Our signature tagline is *"Quality and durability is our identity"*. We craft frames from kiln-dried Ethiopian hardwoods (Wanza, Tid, and treated Oak) paired with high-density foam (32-38 kg/m³) and stain-resistant velvet or top-grain leather.`;
    } else if (lower.includes('custom') || lower.includes('size') || lower.includes('dimension') || lower.includes('color')) {
      reply = `✨ **Custom Orders:** Yes! Every sofa, bed, or wardrobe can be custom-tailored to your exact room dimensions and fabric palette. Simply submit a quote request or visit our showroom with your floor plans.`;
    } else if (lower.includes('contact') || lower.includes('call') || lower.includes('phone') || lower.includes('tiktok') || lower.includes('number')) {
      reply = `📞 **Contact Zola Furniture PLC:**\n• Phone: 0935 745 559 / 0962 049 696\n• TikTok: @dagim.fikre.falah (3,200+ followers)\n• Location: Addis Ababa, Ethiopia`;
    } else {
      reply = `Welcome to **Zola Furniture PLC**! Quality and durability is our identity. I can help you with product recommendations, custom dimensions, delivery details in Addis Ababa, or pricing in ETB. What furniture piece are you searching for today?`;
    }

    res.json({ success: true, reply });
  } catch (error) {
    res.status(500).json({ success: false, reply: 'I am here to assist with Zola Furniture. Please ask your question!' });
  }
});

// ==========================================
// ADMIN AUTHENTICATION & DASHBOARD
// ==========================================

// Admin Login
app.post('/api/auth/login', rateLimiter(10), (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const stmt = db.prepare('SELECT * FROM admin_users WHERE email = ?');
    const user = stmt.get(email.trim().toLowerCase());

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid admin credentials' });
    }

    const valid = bcrypt.compareSync(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ success: false, error: 'Invalid admin credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: { id: user.id, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Authentication failed' });
  }
});

// Admin Stats
app.get('/api/admin/stats', requireAdmin, (req, res) => {
  try {
    const productsCount = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
    const newInquiries = db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE status = 'new'").get().count;
    const totalInquiries = db.prepare('SELECT COUNT(*) as count FROM inquiries').get().count;
    const totalContacts = db.prepare('SELECT COUNT(*) as count FROM contact_messages').get().count;

    const recentInquiries = db.prepare(`
      SELECT i.*, p.name as product_name
      FROM inquiries i
      LEFT JOIN products p ON i.product_id = p.id
      ORDER BY i.id DESC LIMIT 5
    `).all();

    const recentContacts = db.prepare('SELECT * FROM contact_messages ORDER BY id DESC LIMIT 5').all();

    res.json({
      success: true,
      data: {
        productsCount,
        newInquiries,
        totalInquiries,
        totalContacts,
        recentInquiries,
        recentContacts
      }
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch admin stats' });
  }
});

// Admin Inquiries List & Status Update
app.get('/api/admin/inquiries', requireAdmin, (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT i.*, p.name as product_name
      FROM inquiries i
      LEFT JOIN products p ON i.product_id = p.id
      ORDER BY i.id DESC
    `);
    const inquiries = stmt.all();
    res.json({ success: true, data: inquiries });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to load inquiries' });
  }
});

app.patch('/api/admin/inquiries/:id/status', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['new', 'contacted', 'closed'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' });
    }

    const stmt = db.prepare('UPDATE inquiries SET status = ? WHERE id = ?');
    stmt.run(status, Number(id));

    res.json({ success: true, message: 'Inquiry status updated' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update status' });
  }
});

app.delete('/api/admin/inquiries/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM inquiries WHERE id = ?').run(Number(id));
    res.json({ success: true, message: 'Inquiry deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete inquiry' });
  }
});

// Admin Contacts List & Delete
app.get('/api/admin/contacts', requireAdmin, (req, res) => {
  try {
    const messages = db.prepare('SELECT * FROM contact_messages ORDER BY id DESC').all();
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to load messages' });
  }
});

app.delete('/api/admin/contacts/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM contact_messages WHERE id = ?').run(Number(id));
    res.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete message' });
  }
});

// Admin Product CRUD
app.post('/api/admin/products', requireAdmin, (req, res) => {
  try {
    const { name, description, category, price, type, area, image_urls, featured, in_stock, tag } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ success: false, error: 'Name, price, and category are required' });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);

    const stmt = db.prepare(`
      INSERT INTO products (
        name, slug, description, category, price, type, area,
        image_urls, featured, in_stock, tag
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      name,
      slug,
      description || '',
      category,
      Number(price),
      type || 'home',
      area || 'All Addis Ababa',
      JSON.stringify(Array.isArray(image_urls) ? image_urls : ['/images/06-zola-green-corner-sofa.png']),
      featured ? 1 : 0,
      in_stock ? 1 : 0,
      tag || 'New arrival'
    );

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      productId: result.lastInsertRowid,
      slug
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, error: 'Failed to create product' });
  }
});

app.put('/api/admin/products/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, price, type, area, image_urls, featured, in_stock, tag } = req.body;

    const stmt = db.prepare(`
      UPDATE products
      SET name = ?, description = ?, category = ?, price = ?, type = ?, area = ?,
          image_urls = ?, featured = ?, in_stock = ?, tag = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    stmt.run(
      name,
      description || '',
      category,
      Number(price),
      type || 'home',
      area || 'All Addis Ababa',
      JSON.stringify(Array.isArray(image_urls) ? image_urls : [image_urls]),
      featured ? 1 : 0,
      in_stock ? 1 : 0,
      tag || 'Best quality',
      Number(id)
    );

    res.json({ success: true, message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, error: 'Failed to update product' });
  }
});

app.patch('/api/admin/products/:id/feature', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const current = db.prepare('SELECT featured FROM products WHERE id = ?').get(Number(id));
    if (!current) return res.status(404).json({ success: false, error: 'Product not found' });

    const newFeatured = current.featured ? 0 : 1;
    db.prepare('UPDATE products SET featured = ? WHERE id = ?').run(newFeatured, Number(id));

    res.json({ success: true, featured: newFeatured });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to toggle featured status' });
  }
});

app.delete('/api/admin/products/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM products WHERE id = ?').run(Number(id));
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete product' });
  }
});

// Image Upload Endpoint
app.post('/api/admin/upload', requireAdmin, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No image uploaded' });
    }
    const imageUrl = `/images/uploads/${req.file.filename}`;
    res.json({ success: true, url: imageUrl });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || 'Image upload failed' });
  }
});

// Serve frontend build in production
const clientDist = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.use((req, res, next) => {
    if (!req.path.startsWith('/api') && !req.path.startsWith('/images')) {
      return res.sendFile(path.join(clientDist, 'index.html'));
    }
    next();
  });
}

// Start Server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Zola Furniture Backend running on http://localhost:${PORT}`);
  });
}

module.exports = app;
