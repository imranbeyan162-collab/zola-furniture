import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Package, 
  MessageSquare, 
  Mail, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Star, 
  CheckCircle, 
  Clock, 
  X, 
  Upload,
  AlertCircle 
} from 'lucide-react';

export default function AdminDashboard({ token, onLogout, onClose, onRefreshCatalog }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'products', 'inquiries', 'contacts'
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Product creation / edit modal
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Sofa',
    price: '',
    type: 'home',
    area: 'Bole',
    description: '',
    tag: 'Best quality',
    image_url: '/images/06-zola-green-corner-sofa.png',
    featured: false
  });

  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      // 1. Fetch Stats
      const statsRes = await fetch('/api/admin/stats', { headers: authHeaders });
      if (statsRes.status === 401) {
        onLogout();
        return;
      }
      const statsData = await statsRes.json();
      if (statsData.success) setStats(statsData.data);

      // 2. Fetch All Products
      const prodRes = await fetch('/api/products?limit=100');
      const prodData = await prodRes.json();
      if (prodData.success) setProducts(prodData.data);

      // 3. Fetch Inquiries
      const inqRes = await fetch('/api/admin/inquiries', { headers: authHeaders });
      const inqData = await inqRes.json();
      if (inqData.success) setInquiries(inqData.data);

      // 4. Fetch Contacts
      const contRes = await fetch('/api/admin/contacts', { headers: authHeaders });
      const contData = await contRes.json();
      if (contData.success) setContacts(contData.data);

    } catch (err) {
      setError('Error loading administrative data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Update Inquiry Status
  const handleUpdateInquiryStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}/status`, {
        method: 'PATCH',
        headers: authHeaders,
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
        loadData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'DELETE',
        headers: authHeaders
      });
      if (res.ok) {
        setInquiries(prev => prev.filter(i => i.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Delete Contact Message
  const handleDeleteContact = async (id) => {
    if (!window.confirm('Delete this customer message?')) return;
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: authHeaders
      });
      if (res.ok) {
        setContacts(prev => prev.filter(c => c.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Toggle Product Featured
  const handleToggleFeatured = async (id) => {
    try {
      const res = await fetch(`/api/admin/products/${id}/feature`, {
        method: 'PATCH',
        headers: authHeaders
      });
      const data = await res.json();
      if (data.success) {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, featured: data.featured } : p));
        if (onRefreshCatalog) onRefreshCatalog();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this product?')) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: authHeaders
      });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));
        if (onRefreshCatalog) onRefreshCatalog();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Save / Edit Product
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: productForm.name,
        category: productForm.category,
        price: Number(productForm.price),
        type: productForm.type,
        area: productForm.area,
        description: productForm.description,
        tag: productForm.tag,
        image_urls: [productForm.image_url || '/images/06-zola-green-corner-sofa.png'],
        featured: productForm.featured
      };

      let url = '/api/admin/products';
      let method = 'POST';

      if (editingProduct) {
        url = `/api/admin/products/${editingProduct.id}`;
        method = 'PUT';
      }

      const res = await fetch(url, {
        method,
        headers: authHeaders,
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAddProductOpen(false);
        setEditingProduct(null);
        loadData();
        if (onRefreshCatalog) onRefreshCatalog();
      } else {
        alert(data.error || 'Failed to save product');
      }
    } catch (err) {
      alert('Error saving product');
    }
  };

  const openEditModal = (p) => {
    setEditingProduct(p);
    setProductForm({
      name: p.name,
      category: p.category,
      price: p.price,
      type: p.type,
      area: p.area,
      description: p.description,
      tag: p.tag || 'Best quality',
      image_url: p.image_urls[0] || '',
      featured: !!p.featured
    });
    setIsAddProductOpen(true);
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'Sofa',
      price: '',
      type: 'home',
      area: 'Bole',
      description: '',
      tag: 'Best quality',
      image_url: '/images/06-zola-green-corner-sofa.png',
      featured: false
    });
    setIsAddProductOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl p-4 sm:p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto rounded-[36px] luxury-card border border-[#c9a24a]/30 p-6 sm:p-8 min-h-[90vh] flex flex-col justify-between">
        
        {/* Top Header */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#3d3127] gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#c9a24a]/20 border border-[#c9a24a] flex items-center justify-center text-[#c9a24a]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white font-heading uppercase">
                  ZOLA FURNITURE ADMIN PORTAL
                </h2>
                <span className="text-xs text-[#a69c8f]">
                  Logged in as Administrator • Addis Ababa HQ
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onLogout}
                className="px-4 py-2 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-xs text-red-200 font-semibold flex items-center gap-1.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-[#221c17] hover:bg-[#322922] border border-[#44382e] text-white transition-colors"
                title="Close Dashboard"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-3 mt-6 border-b border-[#3d3127] pb-3 overflow-x-auto no-scrollbar">
            {[
              { id: 'overview', label: 'Overview & Stats', icon: ShieldCheck },
              { id: 'products', label: `Products (${products.length})`, icon: Package },
              { id: 'inquiries', label: `Quote Requests (${inquiries.length})`, icon: MessageSquare },
              { id: 'contacts', label: `Customer Messages (${contacts.length})`, icon: Mail },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#c9a24a] text-black shadow-md'
                      : 'bg-[#221a15] text-[#a69c8f] hover:text-white border border-[#3d3127]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="py-6 space-y-8 animate-fade-in">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#1d1713] border border-[#3e3228]">
                  <span className="text-[11px] text-[#a69c8f] uppercase font-semibold">Total Catalog Products</span>
                  <p className="text-2xl font-black text-white font-heading mt-1">
                    {stats ? stats.productsCount : products.length}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#1d1713] border border-[#3e3228]">
                  <span className="text-[11px] text-[#c9a24a] uppercase font-semibold">New Pending Inquiries</span>
                  <p className="text-2xl font-black text-[#c9a24a] font-heading mt-1">
                    {stats ? stats.newInquiries : 0}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#1d1713] border border-[#3e3228]">
                  <span className="text-[11px] text-[#a69c8f] uppercase font-semibold">Total Quotes Requested</span>
                  <p className="text-2xl font-black text-white font-heading mt-1">
                    {stats ? stats.totalInquiries : inquiries.length}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#1d1713] border border-[#3e3228]">
                  <span className="text-[11px] text-[#a69c8f] uppercase font-semibold">Customer Messages</span>
                  <p className="text-2xl font-black text-white font-heading mt-1">
                    {stats ? stats.totalContacts : contacts.length}
                  </p>
                </div>
              </div>

              {/* Recent Inquiries preview */}
              <div className="rounded-2xl bg-[#1d1713] border border-[#3e3228] p-5">
                <h4 className="text-xs font-bold text-white font-heading uppercase mb-4 flex items-center justify-between">
                  <span>Recent Quote Inquiries</span>
                  <button onClick={() => setActiveTab('inquiries')} className="text-[#c9a24a] underline font-sans text-[11px]">
                    View All
                  </button>
                </h4>
                
                <div className="space-y-3">
                  {inquiries.slice(0, 3).map(inq => (
                    <div key={inq.id} className="p-3.5 rounded-xl bg-[#241c17] border border-[#382d24] flex items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold text-white block">{inq.name} ({inq.phone})</span>
                        <span className="text-[11px] text-[#c9a24a]">{inq.product_name || 'General Inquiry'}</span>
                        <p className="text-[11px] text-[#8e8172] line-clamp-1 mt-0.5">{inq.message}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        inq.status === 'new' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                        inq.status === 'contacted' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' :
                        'bg-green-500/20 text-green-300 border border-green-500/40'
                      }`}>
                        {inq.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="py-6 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#a69c8f]">
                  Manage showroom inventory, pricing in ETB, and featured carousel display
                </span>
                <button
                  onClick={openCreateModal}
                  className="gold-btn px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Product</span>
                </button>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-[#3e3228]">
                <table className="w-full text-left text-xs text-[#d1c8bb]">
                  <thead className="bg-[#1b1613] text-[#a69c8f] uppercase text-[10px] font-bold border-b border-[#3e3228]">
                    <tr>
                      <th className="p-3.5">Image</th>
                      <th className="p-3.5">Model Name</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Price (ETB)</th>
                      <th className="p-3.5">Area</th>
                      <th className="p-3.5">Featured</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2d241d] bg-[#1d1714]">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-[#251e18] transition-colors">
                        <td className="p-3">
                          <img
                            src={p.image_urls[0] || '/images/06-zola-green-corner-sofa.png'}
                            alt={p.name}
                            className="w-12 h-10 object-contain rounded-lg bg-[#140f0c] p-1 border border-[#3d3127]"
                          />
                        </td>
                        <td className="p-3 font-bold text-white uppercase">{p.name}</td>
                        <td className="p-3 text-[#c9a24a]">{p.category}</td>
                        <td className="p-3 font-bold">ETB {Number(p.price).toLocaleString()}</td>
                        <td className="p-3 text-[#9e9081]">{p.area}</td>
                        <td className="p-3">
                          <button
                            onClick={() => handleToggleFeatured(p.id)}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              p.featured
                                ? 'bg-[#c9a24a]/20 border-[#c9a24a] text-[#c9a24a]'
                                : 'bg-[#181310] border-[#382e25] text-[#55473a]'
                            }`}
                            title="Toggle Carousel Feature"
                          >
                            <Star className="w-3.5 h-3.5 fill-current" />
                          </button>
                        </td>
                        <td className="p-3 text-right space-x-1.5">
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-1.5 rounded-lg bg-[#271f19] hover:bg-[#342921] border border-[#3e3228] text-white"
                            title="Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900 border border-red-500/30 text-red-300"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: INQUIRIES MANAGEMENT */}
          {activeTab === 'inquiries' && (
            <div className="py-6 space-y-4 animate-fade-in">
              <span className="text-xs text-[#a69c8f] block">
                Customer quote inquiries submitted from the website forms with phone numbers and specs
              </span>

              <div className="overflow-x-auto rounded-2xl border border-[#3e3228]">
                <table className="w-full text-left text-xs text-[#d1c8bb]">
                  <thead className="bg-[#1b1613] text-[#a69c8f] uppercase text-[10px] font-bold border-b border-[#3e3228]">
                    <tr>
                      <th className="p-3.5">Client Name</th>
                      <th className="p-3.5">Contact Phone</th>
                      <th className="p-3.5">Email</th>
                      <th className="p-3.5">Product</th>
                      <th className="p-3.5">Message / Specs</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2d241d] bg-[#1d1714]">
                    {inquiries.map(inq => (
                      <tr key={inq.id} className="hover:bg-[#251e18] transition-colors">
                        <td className="p-3 font-bold text-white">{inq.name}</td>
                        <td className="p-3">
                          <a href={`tel:${inq.phone}`} className="text-[#c9a24a] hover:underline font-semibold">
                            {inq.phone}
                          </a>
                        </td>
                        <td className="p-3 text-[#9e9081]">{inq.email}</td>
                        <td className="p-3 text-white font-medium">{inq.product_name || 'General Quote'}</td>
                        <td className="p-3 text-[#b8ab9b] max-w-xs">{inq.message}</td>
                        <td className="p-3">
                          <select
                            value={inq.status}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase cursor-pointer border ${
                              inq.status === 'new' ? 'bg-amber-950/60 border-amber-500/40 text-amber-300' :
                              inq.status === 'contacted' ? 'bg-blue-950/60 border-blue-500/40 text-blue-300' :
                              'bg-green-950/60 border-green-500/40 text-green-300'
                            }`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900 border border-red-500/30 text-red-300"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: CONTACT MESSAGES */}
          {activeTab === 'contacts' && (
            <div className="py-6 space-y-4 animate-fade-in">
              <span className="text-xs text-[#a69c8f] block">
                Messages sent via the Showroom & Workshop Contact Form
              </span>

              <div className="space-y-3">
                {contacts.length === 0 ? (
                  <p className="text-xs text-[#8e8172] py-8 text-center">No messages yet.</p>
                ) : (
                  contacts.map(c => (
                    <div key={c.id} className="p-4 rounded-2xl bg-[#1d1714] border border-[#3e3228] flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{c.name}</span>
                          <span className="text-[11px] text-[#a69c8f]">• {c.email}</span>
                          {c.phone && <span className="text-[11px] text-[#c9a24a]">• {c.phone}</span>}
                        </div>
                        <h5 className="text-xs font-semibold text-[#f0e6d8]">{c.subject}</h5>
                        <p className="text-xs text-[#a69c8f] leading-relaxed pt-1">{c.message}</p>
                      </div>

                      <button
                        onClick={() => handleDeleteContact(c.id)}
                        className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900 border border-red-500/30 text-red-300 shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>

        {/* Footer Note */}
        <div className="pt-6 border-t border-[#3d3127] flex items-center justify-between text-[11px] text-[#8e8172]">
          <span>Zola Furniture PLC Admin Suite • SQLite Local Database Connected</span>
          <span>Addis Ababa, Ethiopia</span>
        </div>

      </div>

      {/* Add / Edit Product Modal */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl rounded-3xl luxury-card p-6 border border-[#c9a24a]/40 shadow-2xl">
            <button
              onClick={() => setIsAddProductOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#1b1613] text-[#a69c8f] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white font-heading uppercase mb-4">
              {editingProduct ? 'Edit Furniture Model' : 'Add New Furniture Model'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[#a69c8f] uppercase font-semibold mb-1">Model Name *</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. LUXURY LEATHER SECTIONAL"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#1b1613] border border-[#3e3228] text-white focus:outline-none focus:border-[#c9a24a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#a69c8f] uppercase font-semibold mb-1">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={e => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#1b1613] border border-[#3e3228] text-white focus:outline-none focus:border-[#c9a24a]"
                  >
                    <option value="Chair">Chair</option>
                    <option value="Sofa">Sofa</option>
                    <option value="Table">Table</option>
                    <option value="Bed">Bed</option>
                    <option value="Cupboard">Cupboard</option>
                    <option value="Rotan">Rotan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#a69c8f] uppercase font-semibold mb-1">Price in ETB *</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={e => setProductForm({ ...productForm, price: e.target.value })}
                    placeholder="45000"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#1b1613] border border-[#3e3228] text-white focus:outline-none focus:border-[#c9a24a]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#a69c8f] uppercase font-semibold mb-1">Typology</label>
                  <select
                    value={productForm.type}
                    onChange={e => setProductForm({ ...productForm, type: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#1b1613] border border-[#3e3228] text-white focus:outline-none focus:border-[#c9a24a]"
                  >
                    <option value="home">Home</option>
                    <option value="office">Office</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="cafe">Cafe</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#a69c8f] uppercase font-semibold mb-1">Area Availability</label>
                  <select
                    value={productForm.area}
                    onChange={e => setProductForm({ ...productForm, area: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#1b1613] border border-[#3e3228] text-white focus:outline-none focus:border-[#c9a24a]"
                  >
                    <option value="All Addis Ababa">All Addis Ababa</option>
                    <option value="Bole">Bole</option>
                    <option value="CMC">CMC</option>
                    <option value="Kazanchis">Kazanchis</option>
                    <option value="Sarbet">Sarbet</option>
                    <option value="Piazza">Piazza</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#a69c8f] uppercase font-semibold mb-1">Image URL / Path</label>
                <input
                  type="text"
                  value={productForm.image_url}
                  onChange={e => setProductForm({ ...productForm, image_url: e.target.value })}
                  placeholder="/images/06-zola-green-corner-sofa.png"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#1b1613] border border-[#3e3228] text-white focus:outline-none focus:border-[#c9a24a]"
                />
              </div>

              <div>
                <label className="block text-[#a69c8f] uppercase font-semibold mb-1">Description</label>
                <textarea
                  rows="3"
                  value={productForm.description}
                  onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Crafted with Ethiopian hardwoods and high-density foam..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#1b1613] border border-[#3e3228] text-white focus:outline-none focus:border-[#c9a24a] resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featCheckbox"
                  checked={productForm.featured}
                  onChange={e => setProductForm({ ...productForm, featured: e.target.checked })}
                  className="rounded accent-[#c9a24a]"
                />
                <label htmlFor="featCheckbox" className="text-white cursor-pointer font-medium">
                  Feature in Top 3D Carousel Slider
                </label>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl gold-btn font-bold uppercase tracking-wider"
                >
                  Save Model
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#2b221c] text-[#a69c8f] hover:text-white"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
