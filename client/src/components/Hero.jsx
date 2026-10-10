import React, { useState } from 'react';
import { Search, MapPin, Building, DollarSign, Sparkles } from 'lucide-react';

export default function Hero({ onSearchSubmit, onQuickFilter }) {
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
      {/* Background Graphic & Atmosphere */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden border border-[#c9a24a]/25 shadow-2xl min-h-[460px] sm:min-h-[520px] flex flex-col justify-between p-6 sm:p-12">
          
          {/* Background Image with Dark Warm Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b1613] via-[#241e1a]/85 to-[#241e1a]/40 backdrop-blur-[1px]" />

          {/* Top Tagline / Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-[#c9a24a]/40 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#c9a24a] animate-pulse" />
              <span className="text-[11px] font-semibold text-[#f5f2ed] tracking-wider uppercase">
                Quality and durability is our identity
              </span>
            </div>
          </div>

          {/* Headline (Matching Reference Screenshot layout) */}
          <div className="relative z-10 my-auto py-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase font-heading leading-tight max-w-2xl drop-shadow-lg">
              ZOLA FURNITURE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f0e3cc] to-[#c9a24a]">
                MODERN LIVING
              </span>
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-[#cfc7bc] max-w-lg font-light leading-relaxed">
              Addis Ababa's foremost master furniture artisans. Custom handcrafted hardwood, luxury velvet seating, and architectural furnishings built for life.
            </p>
          </div>

          {/* Capsule Search Bar (Directly matching the screenshot) */}
          <div className="relative z-10 w-full mt-4">
            <form 
              onSubmit={handleSearch}
              className="bg-[#f5f2ed] text-[#241e1a] rounded-[26px] p-2 sm:p-2.5 shadow-2xl flex flex-col md:flex-row items-center gap-2 sm:gap-3"
            >
              {/* Field 1: City Street / Area */}
              <div className="flex-1 w-full flex items-center px-3 py-1.5 border-b md:border-b-0 md:border-r border-[#d4cbbe]">
                <MapPin className="w-4 h-4 text-[#c9a24a] shrink-0 mr-2" />
                <div className="flex flex-col w-full">
                  <span className="text-[10px] text-[#786c5f] uppercase tracking-wider font-semibold">
                    City / Area
                  </span>
                  <select 
                    value={cityArea}
                    onChange={(e) => setCityArea(e.target.value)}
                    className="bg-transparent text-xs font-bold text-[#1f1a16] focus:outline-none cursor-pointer"
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
              <div className="flex-1 w-full flex items-center px-3 py-1.5 border-b md:border-b-0 md:border-r border-[#d4cbbe]">
                <Building className="w-4 h-4 text-[#c9a24a] shrink-0 mr-2" />
                <div className="flex flex-col w-full">
                  <span className="text-[10px] text-[#786c5f] uppercase tracking-wider font-semibold">
                    Typology
                  </span>
                  <select 
                    value={typology}
                    onChange={(e) => setTypology(e.target.value)}
                    className="bg-transparent text-xs font-bold text-[#1f1a16] focus:outline-none cursor-pointer"
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
              <div className="flex-1 w-full flex items-center px-3 py-1.5 border-b md:border-b-0 border-[#d4cbbe]">
                <DollarSign className="w-4 h-4 text-[#c9a24a] shrink-0 mr-2" />
                <div className="flex flex-col w-full">
                  <span className="text-[10px] text-[#786c5f] uppercase tracking-wider font-semibold">
                    Max Price
                  </span>
                  <select 
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="bg-transparent text-xs font-bold text-[#1f1a16] focus:outline-none cursor-pointer"
                  >
                    <option value="Any Price">Any Price (ETB)</option>
                    <option value="25000">Up to ETB 25,000</option>
                    <option value="50000">Up to ETB 50,000</option>
                    <option value="75000">Up to ETB 75,000</option>
                    <option value="100000">Up to ETB 100,000</option>
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-[#241e1a] hover:bg-[#15110e] text-[#f5f2ed] rounded-[20px] font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-md shrink-0"
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
