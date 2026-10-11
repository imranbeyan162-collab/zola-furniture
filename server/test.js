const http = require('http');
const app = require('./server');

const testPort = 5555;
const server = app.listen(testPort, async () => {
  console.log(`🧪 Running automated tests on port ${testPort}...`);

  const baseUrl = `http://localhost:${testPort}`;

  async function request(path, options = {}) {
    return new Promise((resolve, reject) => {
      const url = new URL(path, baseUrl);
      const req = http.request(url, options, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, headers: res.headers, data: JSON.parse(body) });
          } catch (e) {
            resolve({ status: res.statusCode, headers: res.headers, raw: body });
          }
        });
      });
      req.on('error', reject);
      if (options.body) {
        req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
      }
      req.end();
    });
  }

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // Test 1: Health check
    const health = await request('/api/health');
    assert(health.status === 200 && health.data.status === 'ok', 'GET /api/health returns 200 OK');

    // Test 2: Categories listing
    const cats = await request('/api/categories');
    assert(cats.status === 200 && Array.isArray(cats.data.data) && cats.data.data.length >= 6, 'GET /api/categories returns >= 6 categories');

    // Test 3: Products listing & filter by category
    const products = await request('/api/products?category=Sofa');
    assert(products.status === 200 && Array.isArray(products.data.data), 'GET /api/products?category=Sofa returns products');
    assert(products.data.data.every(p => p.category.toLowerCase() === 'sofa'), 'All filtered products match category Sofa');

    // Test 4: Products search & max price filter
    const allProducts = await request('/api/products');
    const firstProduct = allProducts.data && allProducts.data.data ? allProducts.data.data[0] : null;

    const searchRes = await request('/api/products?search=Dining&maxPrice=100000');
    assert(searchRes.status === 200 && searchRes.data.data.length > 0, 'GET /api/products with search & maxPrice works');

    // Test 5: Single product retrieval
    const single = await request(`/api/products/${firstProduct ? firstProduct.slug : 'the-shell-luxury-lounge-chair'}`);
    assert(single.status === 200 && single.data.data && single.data.data.slug, 'GET /api/products/:slug returns correct product');

    // Test 6: Inquiry quote submission with validation
    const invalidInquiry = await request('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { name: '' }
    });
    assert(invalidInquiry.status === 400, 'POST /api/inquiries rejects empty input with 400');

    const validInquiry = await request('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        name: 'Test Customer',
        phone: '0911001122',
        email: 'test@customer.et',
        message: 'Looking for a custom 8-seater table in Bole',
        product_id: firstProduct ? firstProduct.id : null
      }
    });
    assert(validInquiry.status === 201 && validInquiry.data.success === true, 'POST /api/inquiries creates inquiry and returns 201');

    // Test 7: Admin Login
    const failedLogin = await request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { email: 'admin@zolafurniture.com', password: 'wrongpassword' }
    });
    assert(failedLogin.status === 401, 'POST /api/auth/login rejects wrong password with 401');

    const loginRes = await request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { email: 'admin@zolafurniture.com', password: 'admin123' }
    });
    assert(loginRes.status === 200 && !!loginRes.data.token, 'POST /api/auth/login succeeds and returns JWT token');

    const adminToken = loginRes.data.token;

    // Test 8: Protected Admin Endpoint
    const statsRes = await request('/api/admin/stats', {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert(statsRes.status === 200 && statsRes.data.data.productsCount > 0, 'GET /api/admin/stats returns statistics with valid JWT');

    // Test 9: Protected Admin Endpoint rejection without token
    const unauthRes = await request('/api/admin/stats');
    assert(unauthRes.status === 401, 'GET /api/admin/stats rejects unauthorized request with 401');

    console.log(`\n========================================`);
    console.log(`🏁 Automated Tests Completed: ${passed} passed, ${failed} failed`);
    console.log(`========================================\n`);

  } catch (err) {
    console.error('Test execution error:', err);
    failed++;
  } finally {
    server.close();
    process.exit(failed > 0 ? 1 : 0);
  }
});
