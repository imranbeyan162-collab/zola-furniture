import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCarousel from './components/ProductCarousel';
import CategoriesInfoGrid from './components/CategoriesInfoGrid';
import ProductCatalog from './components/ProductCatalog';
import ProductModal from './components/ProductModal';
import QuoteModal from './components/QuoteModal';
import LocationShowroom from './components/LocationShowroom';
import SupportFAQ from './components/SupportFAQ';
import BlogSection from './components/BlogSection';
import AboutSection from './components/AboutSection';
import AIAssistant from './components/AIAssistant';
import AdminDashboard from './components/AdminDashboard';
import AdminLoginModal from './components/AdminLoginModal';
import InfoTileModal from './components/InfoTileModal';
import MobileBottomBar from './components/MobileBottomBar';
import Footer from './components/Footer';

export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [carouselCategory, setCarouselCategory] = useState('all');
  const [activeSection, setActiveSection] = useState('home');

  // Filter State for Main Catalog
  const [catalogFilters, setCatalogFilters] = useState({
    category: 'all',
    type: 'all',
    area: 'all',
    maxPrice: '',
    search: ''
  });

  // Modal States
  const [viewProduct, setViewProduct] = useState(null);
  const [quoteProduct, setQuoteProduct] = useState(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [activeInfoTile, setActiveInfoTile] = useState(null);

  // Admin Auth & Dashboard State
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('zola_admin_token') || '');
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  // Fetch initial products and categories from backend
  const fetchProducts = async () => {
    try {
      let url = '/api/products?';
      const params = new URLSearchParams();
      if (catalogFilters.category && catalogFilters.category !== 'all') params.append('category', catalogFilters.category);
      if (catalogFilters.type && catalogFilters.type !== 'all') params.append('type', catalogFilters.type);
      if (catalogFilters.area && catalogFilters.area !== 'all') params.append('area', catalogFilters.area);
      if (catalogFilters.maxPrice) params.append('maxPrice', catalogFilters.maxPrice);
      if (catalogFilters.search) params.append('search', catalogFilters.search);

      const res = await fetch(url + params.toString());
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (e) {
      console.error('Failed to load products from API:', e);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (e) {
      console.error('Failed to load categories:', e);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [catalogFilters]);

  // Section navigation helper
  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'products') {
      document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'contact' || sectionId === 'location') {
      document.getElementById('location-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'support') {
      document.getElementById('support-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'about') {
      document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'blog') {
      document.getElementById('blog-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'admin') {
      handleOpenAdmin();
    }
  };

  // Search from Hero capsule bar
  const handleHeroSearch = (filters) => {
    setCatalogFilters(prev => ({
      ...prev,
      ...filters
    }));
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Quote Request Modal Trigger
  const handleOpenQuote = (product = null) => {
    setQuoteProduct(product);
    setIsQuoteOpen(true);
  };

  // Admin Portal Trigger
  const handleOpenAdmin = () => {
    if (adminToken) {
      setIsAdminDashboardOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleAdminLoginSuccess = (token) => {
    localStorage.setItem('zola_admin_token', token);
    setAdminToken(token);
    setIsAdminDashboardOpen(true);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('zola_admin_token');
    setAdminToken('');
    setIsAdminDashboardOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#241e1a] text-[#f5f2ed] flex flex-col font-sans selection:bg-[#c9a24a] selection:text-black">
      
      {/* 1. Sticky Navigation */}
      <Navbar
        onNavigate={handleNavigate}
        activeSection={activeSection}
        onOpenQuote={handleOpenQuote}
        onOpenAdmin={handleOpenAdmin}
        isAdminLoggedIn={!!adminToken}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        
        {/* 2. Hero Section with Capsule Filter */}
        <Hero
          onSearchSubmit={handleHeroSearch}
          onQuickFilter={(cat) => setCarouselCategory(cat)}
        />

        {/* 3. Featured Product 3D Carousel (Matching reference screenshot coverflow) */}
        <ProductCarousel
          products={products}
          activeCategory={carouselCategory}
          onSelectCategory={(cat) => setCarouselCategory(cat)}
          onViewProduct={(p) => setViewProduct(p)}
          onOpenQuote={(p) => handleOpenQuote(p)}
        />

        {/* 4. Categories & Information 3-Column Grid (Matching reference screenshot) */}
        <CategoriesInfoGrid
          onTileClick={(tile) => setActiveInfoTile(tile)}
          onNavigateSection={handleNavigate}
        />

        {/* 5. Full Products Catalog with Live Filters */}
        <ProductCatalog
          products={products}
          categories={categories}
          filterState={catalogFilters}
          setFilterState={setCatalogFilters}
          onViewProduct={(p) => setViewProduct(p)}
          onOpenQuote={(p) => handleOpenQuote(p)}
        />

        {/* 6. Heritage & About Section */}
        <AboutSection onOpenQuote={handleOpenQuote} />

        {/* 7. Location & Showroom & Contact Messages Form */}
        <LocationShowroom />

        {/* 8. Support & FAQ Section */}
        <SupportFAQ />

        {/* 9. Blog Articles Section */}
        <BlogSection />

      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Fixed Mobile Bottom Navigation Bar (Matches screenshot!) */}
      <MobileBottomBar
        onNavigate={handleNavigate}
        onOpenAdmin={handleOpenAdmin}
        onFocusSearch={() => {
          document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Floating AI Helper Sparkle Button & Chat Modal */}
      <AIAssistant />

      {/* Product Detail Modal */}
      {viewProduct && (
        <ProductModal
          product={viewProduct}
          onClose={() => setViewProduct(null)}
          onOpenQuote={handleOpenQuote}
        />
      )}

      {/* Request Quote / Inquiry Modal */}
      {isQuoteOpen && (
        <QuoteModal
          product={quoteProduct}
          products={products}
          onClose={() => setIsQuoteOpen(false)}
        />
      )}

      {/* Categories & Information Tile Detail Modal */}
      {activeInfoTile && (
        <InfoTileModal
          tileData={activeInfoTile}
          onClose={() => setActiveInfoTile(null)}
          onOpenQuote={handleOpenQuote}
        />
      )}

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      {/* Protected Admin Dashboard */}
      {isAdminDashboardOpen && adminToken && (
        <AdminDashboard
          token={adminToken}
          onLogout={handleAdminLogout}
          onClose={() => setIsAdminDashboardOpen(false)}
          onRefreshCatalog={fetchProducts}
        />
      )}

    </div>
  );
}
