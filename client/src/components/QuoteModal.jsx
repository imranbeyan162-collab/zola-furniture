import React, { useState } from 'react';
import { X, CheckCircle2, Phone, Send, Sparkles, AlertCircle } from 'lucide-react';

export default function QuoteModal({ product, products = [], onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(product ? product.id : '');
  const [area, setArea] = useState(product ? product.area : 'Bole');
  const [message, setMessage] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Inline validation
    if (!name.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!phone.trim()) {
      setError('Please provide a valid phone number for quote follow-up.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          product_id: selectedProductId ? Number(selectedProductId) : null,
          message: `[Area: ${area}] ${message.trim() || 'Requesting custom quotation & delivery details'}`
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit quote request');
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-[32px] luxury-card p-6 sm:p-8 border border-[#c9a24a]/30 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#1e1915] text-[#a69c8f] hover:text-white border border-[#44382f] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="py-8 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#c9a24a]/20 border border-[#c9a24a] mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#c9a24a]" />
            </div>

            <h3 className="text-xl font-bold text-white font-heading uppercase mb-2">
              Quote Request Submitted!
            </h3>
            
            <p className="text-xs text-[#cfc7bc] max-w-sm mx-auto mb-6 leading-relaxed">
              Thank you, <span className="text-white font-semibold">{name}</span>! Our Zola Furniture master consultant will review your specifications and contact you via phone (<span className="text-[#c9a24a]">{phone}</span>) shortly.
            </p>

            <div className="p-4 rounded-2xl bg-[#1d1714] border border-[#3d3127] text-left text-xs text-[#a69c8f] mb-6 space-y-1">
              <p className="text-white font-semibold">Immediate Assistance Needed?</p>
              <p>Call our factory directly at <a href="tel:0935745559" className="text-[#c9a24a] underline">0935 745 559</a> or <a href="tel:0962049696" className="text-[#c9a24a] underline">0962 049 696</a>.</p>
            </div>

            <button
              onClick={onClose}
              className="gold-btn px-8 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider"
            >
              Back to Catalog
            </button>
          </div>
        ) : (
          <div>
            {/* Modal Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c9a24a]/15 text-[#c9a24a] text-[10px] font-bold uppercase tracking-wider border border-[#c9a24a]/30 mb-2">
                <Sparkles className="w-3 h-3" />
                <span>Bespoke Order / Price Inquiry</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading uppercase">
                {product ? `Request Quote: ${product.name}` : 'Request Furniture Quotation'}
              </h3>
              <p className="text-xs text-[#a69c8f] mt-1">
                Custom dimensions, upholstery options, and white-glove delivery across Addis Ababa.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Product Selector */}
              <div>
                <label className="block text-[11px] font-semibold text-[#a69c8f] uppercase tracking-wider mb-1">
                  Furniture Model
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b1613] border border-[#3e3228] text-xs text-white focus:outline-none focus:border-[#c9a24a]"
                >
                  <option value="">General Custom Inquiry (Not linked to specific item)</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} - ETB {Number(p.price).toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#a69c8f] uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dagim Fikre"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b1613] border border-[#3e3228] text-xs text-white placeholder-[#685c4f] focus:outline-none focus:border-[#c9a24a]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#a69c8f] uppercase tracking-wider mb-1">
                    Phone Number (Mobile) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0911 000 000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b1613] border border-[#3e3228] text-xs text-white placeholder-[#685c4f] focus:outline-none focus:border-[#c9a24a]"
                  />
                </div>
              </div>

              {/* Email and Delivery Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#a69c8f] uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b1613] border border-[#3e3228] text-xs text-white placeholder-[#685c4f] focus:outline-none focus:border-[#c9a24a]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#a69c8f] uppercase tracking-wider mb-1">
                    Delivery Area (Addis Ababa)
                  </label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b1613] border border-[#3e3228] text-xs text-white focus:outline-none focus:border-[#c9a24a]"
                  >
                    <option value="Bole">Bole</option>
                    <option value="CMC">CMC</option>
                    <option value="Kazanchis">Kazanchis</option>
                    <option value="Sarbet">Sarbet</option>
                    <option value="Piazza">Piazza</option>
                    <option value="Ayat">Ayat</option>
                    <option value="Gerji">Gerji</option>
                    <option value="Lebu">Lebu</option>
                    <option value="Other / Outside Addis">Other / Regional</option>
                  </select>
                </div>
              </div>

              {/* Specifications / Dimensions Message */}
              <div>
                <label className="block text-[11px] font-semibold text-[#a69c8f] uppercase tracking-wider mb-1">
                  Custom Dimensions or Special Requests
                </label>
                <textarea
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Specify desired dimensions (e.g. 3m x 2.2m), velvet/leather color preference, or room layout details..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b1613] border border-[#3e3228] text-xs text-white placeholder-[#685c4f] focus:outline-none focus:border-[#c9a24a] resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-2xl gold-btn text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span>Submitting to Zola Database...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Official Quote Request</span>
                  </>
                )}
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
