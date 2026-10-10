import React from 'react';
import { Award, Shield, Hammer, Users } from 'lucide-react';

export default function AboutSection({ onOpenQuote }) {
  return (
    <section id="about-section" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="luxury-card p-8 sm:p-12 relative overflow-hidden border border-[#c9a24a]/30">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9a24a]/15 text-[#c9a24a] text-xs font-bold uppercase tracking-wider border border-[#c9a24a]/30">
                <Award className="w-3.5 h-3.5" />
                <span>Our Heritage & Craft</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading uppercase leading-tight">
                ZOLA FURNITURE PLC <br />
                <span className="text-[#c9a24a]">"Quality and durability is our identity"</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#cfc7bc] leading-relaxed">
                Founded in Addis Ababa, Ethiopia, Zola Furniture PLC is dedicated to creating furnishings that merge European ergonomics with Ethiopian artisanal master woodcraft. Each piece is constructed inside our Addis Ababa manufacturing facilities utilizing sustainably seasoned native timber and imported luxury textiles.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#3b3026]">
                <div>
                  <span className="text-2xl font-black text-white font-heading">15+</span>
                  <span className="text-[11px] text-[#a69c8f] uppercase block font-medium">Years of Craft</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-[#c9a24a] font-heading">3,200+</span>
                  <span className="text-[11px] text-[#a69c8f] uppercase block font-medium">TikTok Community</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-white font-heading">100%</span>
                  <span className="text-[11px] text-[#a69c8f] uppercase block font-medium">Kiln-Dried Hardwood</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onOpenQuote(null)}
                  className="gold-btn px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider"
                >
                  Commission Custom Project
                </button>
              </div>
            </div>

            {/* Visual Mosaic */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <img
                src="/images/05-zola-black-velvet-dining-set.png"
                alt="Zola Craftsmanship"
                className="w-full h-44 object-cover rounded-2xl border border-[#3e3228]"
              />
              <img
                src="/images/07-zola-marble-dining-set.png"
                alt="Zola Marble Craft"
                className="w-full h-44 object-cover rounded-2xl border border-[#3e3228] mt-4"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
