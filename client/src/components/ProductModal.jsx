import React from 'react';
import { X, Check, ShieldCheck, Truck, Sparkles, Phone, Ruler } from 'lucide-react';

export default function ProductModal({ product, onClose, onOpenQuote }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl rounded-[32px] luxury-card p-6 sm:p-8 overflow-hidden border border-[#c9a24a]/30">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#1e1915] text-[#a69c8f] hover:text-white border border-[#44382f] transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Product Image Frame: Fills Frame */}
          <div className="h-72 sm:h-96 rounded-3xl bg-[#181310] overflow-hidden border border-[#c9a24a]/30 shadow-2xl relative">
            <img
              src={product.image_urls[0] || '/images/06-zola-green-corner-sofa.png'}
              alt={product.name}
              className="w-full h-full object-cover filter brightness-[0.98]"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
          </div>

          {/* Product Details */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#c9a24a] bg-[#c9a24a]/15 px-2.5 py-1 rounded-full border border-[#c9a24a]/25">
                {product.category}
              </span>
              <span className="text-[11px] font-semibold text-[#a69c8f] bg-white/10 px-2 py-0.5 rounded-full uppercase">
                {product.type} Living
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading uppercase leading-snug">
              {product.name}
            </h2>

            <div className="my-3 flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#c9a24a] font-heading">
                ETB {Number(product.price).toLocaleString()}
              </span>
              <span className="text-xs text-[#8e8172]">
                • Handcrafted to order
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#cfc7bc] leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Specifications Box */}
            <div className="space-y-2 mb-6 text-xs text-[#d1c8bb]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#c9a24a] shrink-0" />
                <span>Reinforced kiln-dried Ethiopian hardwood frame</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#c9a24a] shrink-0" />
                <span>Free delivery & room installation across {product.area}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#c9a24a] shrink-0" />
                <span>3-Year structural integrity guarantee from Zola Furniture PLC</span>
              </div>
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-[#c9a24a] shrink-0" />
                <span>Custom dimensions and fabric colors available upon request</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenQuote(product);
                }}
                className="flex-1 py-3 px-6 rounded-2xl gold-btn text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                <span>Request Custom Quote</span>
              </button>
              
              <a
                href="tel:0935745559"
                className="py-3 px-4 rounded-2xl bg-[#261f19] hover:bg-[#342a22] border border-[#44382f] text-xs font-semibold text-[#f5f2ed] flex items-center gap-1.5 transition-colors"
                title="Call Workshop"
              >
                <Phone className="w-3.5 h-3.5 text-[#c9a24a]" />
                <span>0935 745 559</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
