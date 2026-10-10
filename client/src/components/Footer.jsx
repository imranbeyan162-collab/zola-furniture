import React from 'react';
import { Phone, MapPin, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ onNavigate, onOpenAdmin }) {
  return (
    <footer className="bg-[#181310] border-t border-[#3b3026] pt-16 pb-24 md:pb-16 text-[#cfc7bc] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[#2d241d]">
          
          {/* Brand Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-black border border-[#c9a24a]/40 flex items-center justify-center p-1">
                <img src="/images/02-zola-logo-black.png" alt="Zola" className="max-h-full" />
              </div>
              <span className="font-heading font-extrabold text-white text-base tracking-wider">
                ZOLA FURNITURE
              </span>
            </div>
            <p className="text-[11px] text-[#9e9081] leading-relaxed">
              Quality and durability is our identity. Addis Ababa's foremost manufacturer of bespoke residential and commercial furniture.
            </p>
            <div className="pt-1">
              <span className="text-[10px] text-[#c9a24a] font-bold uppercase tracking-wider block">
                PLC • Addis Ababa, Ethiopia
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-white font-bold uppercase font-heading text-xs tracking-wider mb-3">
              Explore Collections
            </h4>
            <ul className="space-y-2 text-[#9e9081]">
              <li><button onClick={() => onNavigate('home')} className="hover:text-[#c9a24a]">Home Living</button></li>
              <li><button onClick={() => onNavigate('products')} className="hover:text-[#c9a24a]">Living Room Sofas</button></li>
              <li><button onClick={() => onNavigate('products')} className="hover:text-[#c9a24a]">Marble & Timber Dining</button></li>
              <li><button onClick={() => onNavigate('products')} className="hover:text-[#c9a24a]">Executive Office Furniture</button></li>
              <li><button onClick={() => onNavigate('products')} className="hover:text-[#c9a24a]">Woven Rotan Collection</button></li>
            </ul>
          </div>

          {/* Quick Help */}
          <div>
            <h4 className="text-white font-bold uppercase font-heading text-xs tracking-wider mb-3">
              Information & Support
            </h4>
            <ul className="space-y-2 text-[#9e9081]">
              <li><button onClick={() => onNavigate('support')} className="hover:text-[#c9a24a]">Warranty & Care Guide</button></li>
              <li><button onClick={() => onNavigate('location')} className="hover:text-[#c9a24a]">Showroom Location & Hours</button></li>
              <li><button onClick={() => onNavigate('blog')} className="hover:text-[#c9a24a]">Hardwood & Velvet Journal</button></li>
              <li><button onClick={onOpenAdmin} className="hover:text-[#c9a24a] flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-[#c9a24a]" /> Admin Portal</button></li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="text-white font-bold uppercase font-heading text-xs tracking-wider mb-3">
              Showroom & Workshop Lines
            </h4>
            <div className="space-y-2 text-[#9e9081]">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c9a24a] shrink-0" />
                <span>Bole, Addis Ababa, Ethiopia</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#c9a24a] shrink-0" />
                <a href="tel:0935745559" className="hover:text-[#c9a24a] font-semibold text-white">0935 745 559</a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#c9a24a] shrink-0" />
                <a href="tel:0962049696" className="hover:text-[#c9a24a] font-semibold text-white">0962 049 696</a>
              </p>
              <div className="pt-2">
                <a
                  href="https://www.tiktok.com/@dagim.fikre.falah"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#c9a24a] hover:underline"
                >
                  <span>TikTok: @dagim.fikre.falah</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#786b5f] gap-3">
          <span>
            © {new Date().getFullYear()} Zola Furniture PLC. All rights reserved.
          </span>
          <span className="flex items-center gap-1">
            Manufactured with durability in Addis Ababa, Ethiopia
          </span>
        </div>

      </div>
    </footer>
  );
}
