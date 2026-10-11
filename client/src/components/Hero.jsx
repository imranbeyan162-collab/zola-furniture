import React, { useState } from 'react';
import { Search, MapPin, Building, DollarSign, Sparkles, Phone, ArrowRight, Compass } from 'lucide-react';

export default function Hero({ onSearchSubmit, onQuickFilter, onOpenQuote }) {
  const [cityArea, setCityArea] = useState('All Addis Ababa');
  const [typology, setTypology] = useState('All Types');
  const [priceMax, setPriceMax] = useState('Any Price');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearchSubmit({
      area: cityArea === 'All Addis Ababa' ? '' : cityArea,
      type: typology === 'All Types' ? '' : typology.toLowerCase(),
      maxPrice: priceMax === 'Any Price' ? '' : priceMax.replace(/[^0-9]/g, '')
    });
  };

  return (
    <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 overflow-hidden">
      
      {/* Ambient Architectural Cove Glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[250px] bg-gradient-to-b from-[#c9a24a]/12 via-[#c9a24a]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Container matching Image 4 & Image 5 */}
        <div className="relative rounded-[36px] sm:rounded-[44px] overflow-hidden border border-[#c9a24a]/30 shadow-2xl min-h-[520px] sm:min-h-[580px] flex flex-col justify-between p-6 sm:p-12 transition-all duration-700">
          
          {/* Background Image: High-Resolution Architectural Living Room with Ribbed Wood & Cove Lighting */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-102 hover:scale-105"
            style={{
              backgroundImage: `url('/images/hero-luxury-living.jpg')`,
            }}
          />
          
          {/* Cinematic Dark Warm Vignette & Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#140f0c]/95 via-[#1a1410]/80 to-[#140f0c]/60 backdrop-blur-[0.5px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140f0c] via-transparent to-black/30" />

          {/* Top Row: Tagline Pill & Quality Badge */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/70 border border-[#c9a24a]/40 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#c9a24a] animate-pulse" />
              <span className="text-[11px] font-bold text-[#f5f2ed] tracking-widest uppercase">
                Quality and durability is our identity
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-[#d8cfc0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
              <span className="font-semibold">Addis Ababa Workshop Open</span>
              <span className="text-[#8e8275]">• Mon - Sat</span>
            </div>
          </div>

          {/* Center Showcase Content (Matching Reference 4 Editorial Design) */}
          <div className="relative z-10 my-auto py-8 sm:py-12 max-w-3xl">
            
            <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#c9a24a] font-bold block mb-2 font-heading">
              Bespoke Handcrafted Living • Addis Ababa PLC
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase font-heading leading-[1.08] drop-shadow-2xl">
              EXPERIENCE ELEGANCE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f7ebd4] to-[#c9a24a]">
                WITH OUR SLEEK MODERN
              </span> <br />
              <span className="text-[#c9a24a]">LUXURY FURNITURE.</span>
            </h1>

            <p className="mt-4 text-xs sm:text-sm text-[#d4cbbe] max-w-xl font-light leading-relaxed drop-shadow">
              Introducing our signature architectural collection: a seamless blend of seasoned Ethiopian hardwoods (Wanza, Tid, Oak) and high-resilience luxury velvet. Engineered for statement residences and executive penthouses in Addis Ababa.
            </p>

            {/* Quick Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="gold-btn px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xl"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenQuote && onOpenQuote(null)}
                className="px-6 py-3 rounded-full bg-black/60 hover:bg-black/80 border border-[#c9a24a]/40 text-xs font-bold text-white uppercase tracking-wider backdrop-blur-md transition-all hover:border-[#c9a24a]"
              >
                Commission Bespoke Order
              </button>

              {/* Social / Direct Phone Pill */}
              <a
                href="tel:0935745559"
                className="hidden lg:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1e1713]/80 border border-[#3e3228] text-xs text-[#c9a24a] hover:border-[#c9a24a] transition-colors ml-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="font-semibold text-white">0935 745 559</span>
              </a>
            </div>

          </div>

          {/* Bottom Capsule Search Bar (Directly matching Reference Image 5) */}
          <div className="relative z-10 w-full mt-4">
            <form 
              onSubmit={handleSearch}
              className="bg-[#f8f5ee] text-[#241e1a] rounded-[28px] p-2 sm:p-2.5 shadow-2xl flex flex-col md:flex-row items-center gap-2 sm:gap-3 border border-[#c9a24a]/30"
            >
              {/* Field 1: City Street / Area */}
              <div className="flex-1 w-full flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-[#d8cfbf]">
                <MapPin className="w-4 h-4 text-[#c9a24a] shrink-0 mr-2.5" />
                <div className="flex flex-col w-full">
                  <span className="text-[10px] text-[#786c5f] uppercase tracking-wider font-bold">
                    City / Area
                  </span>
                  <select 
                    value={cityArea}
                    onChange={(e) => setCityArea(e.target.value)}
                    className="bg-transparent text-xs font-extrabold text-[#1f1a16] focus:outline-none cursor-pointer"
                  >
                    <option value="All Addis Ababa">All Addis Ababa</option>
                    <option value="Bole">Bole (234 Street)</option>
                    <option value="CMC">CMC Area</option>
                    <option value="Kazanchis">Kazanchis</option>
                    <option value="Sarbet">Sarbet</option>
                    <option value="Piazza">Piazza</option>
                  </select>
                </div>
              </div>

              {/* Field 2: Typology / Space */}
              <div className="flex-1 w-full flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-[#d8cfbf]">
                <Building className="w-4 h-4 text-[#c9a24a] shrink-0 mr-2.5" />
                <div className="flex flex-col w-full">
                  <span className="text-[10px] text-[#786c5f] uppercase tracking-wider font-bold">
                    Typology
                  </span>
                  <select 
                    value={typology}
                    onChange={(e) => setTypology(e.target.value)}
                    className="bg-transparent text-xs font-extrabold text-[#1f1a16] focus:outline-none cursor-pointer"
                  >
                    <option value="All Types">Home & Apart</option>
                    <option value="Home">Home Living</option>
                    <option value="Office">Executive Office</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Cafe">Modern Cafe</option>
                  </select>
                </div>
              </div>

              {/* Field 3: Price in ETB */}
              <div className="flex-1 w-full flex items-center px-4 py-2 border-b md:border-b-0 border-[#d8cfbf]">
                <DollarSign className="w-4 h-4 text-[#c9a24a] shrink-0 mr-2.5" />
                <div className="flex flex-col w-full">
                  <span className="text-[10px] text-[#786c5f] uppercase tracking-wider font-bold">
                    Max Price
                  </span>
                  <select 
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="bg-transparent text-xs font-extrabold text-[#1f1a16] focus:outline-none cursor-pointer"
                  >
                    <option value="Any Price">Any Price (ETB)</option>
                    <option value="25000">Up to ETB 25,000</option>
                    <option value="50000">Up to ETB 50,000</option>
                    <option value="75000">Up to ETB 75,000</option>
                    <option value="100000">Up to ETB 100,000+</option>
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="w-full md:w-auto px-7 py-3.5 bg-[#1f1915] hover:bg-black text-[#f5f2ed] rounded-[22px] font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all hover:scale-[1.03] shadow-lg shrink-0"
              >
                <Search className="w-4 h-4 text-[#c9a24a]" />
                <span>Search</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
