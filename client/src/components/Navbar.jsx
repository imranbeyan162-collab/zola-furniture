import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ShieldCheck, Sparkles, User, ShoppingBag } from 'lucide-react';

export default function Navbar({ onNavigate, activeSection, onOpenQuote, onOpenAdmin, isAdminLoggedIn }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'products', label: 'PRODUCTS' },
    { id: 'contact', label: 'CONTACT' },
    { id: 'support', label: 'SUPPORT' },
    { id: 'location', label: 'LOCATION' },
    { id: 'about', label: 'ABOUT US' },
    { id: 'blog', label: 'BLOG' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3 shadow-2xl' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-black border border-[#c9a24a]/40 flex items-center justify-center p-1.5 shadow-lg group-hover:border-[#c9a24a] transition-colors">
              <img 
                src="/images/02-zola-logo-black.png" 
                alt="Zola Furniture Logo" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = '<span class="text-[#c9a24a] font-bold text-lg font-heading">Z</span>';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-base tracking-wider text-white group-hover:text-[#c9a24a] transition-colors">
                ZOLA FURNITURE
              </span>
              <span className="text-[10px] text-[#a69c8f] tracking-widest uppercase">
                Addis Ababa • PLC
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`text-xs font-semibold tracking-wider transition-colors duration-200 uppercase py-1 ${
                  activeSection === link.id
                    ? 'text-[#c9a24a] border-b-2 border-[#c9a24a]'
                    : 'text-[#d6cec3] hover:text-[#c9a24a]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Admin Portal Button */}
            <button
              onClick={onOpenAdmin}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                isAdminLoggedIn
                  ? 'border-[#c9a24a] text-[#c9a24a] bg-[#c9a24a]/10'
                  : 'border-[#4a3f35] text-[#a69c8f] hover:text-white hover:border-[#c9a24a]/50'
              }`}
              title="Admin Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#c9a24a]" />
              <span>{isAdminLoggedIn ? 'Dashboard' : 'Admin'}</span>
            </button>

            {/* Buy Now / Request Quote Button */}
            <button
              onClick={() => onOpenQuote(null)}
              className="gold-btn px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Buy Now</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => onOpenQuote(null)}
              className="gold-btn px-3 py-1.5 rounded-full text-xs font-bold uppercase"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#2a221c] border border-[#44382f] text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-t border-[#c9a24a]/20 px-4 pt-4 pb-6 space-y-3 animate-fade-in">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg text-xs font-semibold uppercase ${
                  activeSection === link.id
                    ? 'bg-[#c9a24a]/20 text-[#c9a24a]'
                    : 'text-[#e5decb] hover:bg-[#342921]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#44382f] flex items-center justify-between">
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs text-[#a69c8f] hover:text-[#c9a24a]"
            >
              <ShieldCheck className="w-4 h-4 text-[#c9a24a]" />
              <span>{isAdminLoggedIn ? 'Admin Dashboard' : 'Admin Login'}</span>
            </button>

            <a
              href="tel:0935745559"
              className="flex items-center gap-1.5 text-xs text-[#c9a24a] font-medium"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>0935 745 559</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
