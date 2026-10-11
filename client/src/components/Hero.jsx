import React, { useState, useEffect } from 'react';
import { Search, MapPin, Building, DollarSign, ChevronRight, ArrowRight } from 'lucide-react';

export default function Hero({ onSearchSubmit, onQuickFilter, onOpenQuote }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cityArea, setCityArea] = useState('Bole');
  const [typology, setTypology] = useState('Home & Apart');
  const [priceMax, setPriceMax] = useState('100000');

  // Ultra-luxury architectural interior slides matching Image 2
  const slides = [
    {
      image: '/images/hero-slide-2.jpg',
      alt: 'Zola Home Modern Open Penthouse Lounge',
      tagline: 'Modern Architectural Living'
    },
    {
      image: '/images/hero-slide-1.jpg',
      alt: 'Zola Panoramic Skyline Living Penthouse',
      tagline: 'Executive High-Rise Suites'
    },
    {
      image: '/images/hero-slide-3.jpg',
      alt: 'Zola Minimalist Curved Salon & Timber Wall',
      tagline: 'Bespoke Ethiopian Hardwood & Boucle'
    },
    {
      image: '/images/hero-luxury-living.jpg',
      alt: 'Zola Cove-Lit Modern Living Room',
      tagline: 'Signature Handcrafted Collection'
    }
  ];

  // ⏱️ SLIDES TRANSIT BY THEMSELVES EVERY 5 SECONDS WITH ULTRA-SMOOTH TRANSITIONS
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearchSubmit({
      area: cityArea === 'All Addis Ababa' ? '' : cityArea,
      type: typology === 'Home & Apart' ? '' : typology.toLowerCase(),
      maxPrice: priceMax === 'Any Price' ? '' : priceMax
    });
  };

  return (
    <section className="relative pt-20 pb-8 sm:pt-24 sm:pb-12 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Stage Frame matching the second reference image */}
        <div className="relative rounded-[36px] sm:rounded-[44px] overflow-hidden border border-white/10 shadow-2xl min-h-[540px] sm:min-h-[620px] flex flex-col justify-between p-6 sm:p-12 transition-all duration-700 bg-[#2d2926]">
          
          {/* 5-SECOND SLIDING BACKGROUND WITH ULTRA SMOOTH KEN BURNS & CROSSFADE TRANSITIONS */}
          <div className="absolute inset-0 overflow-hidden">
            {slides.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <div
                  key={slide.image}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    isActive ? 'opacity-100 z-1' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className={`w-full h-full object-cover object-center transition-transform duration-[6000ms] ease-out ${
                      isActive ? 'scale-105' : 'scale-100'
                    }`}
                  />
                  {/* Subtle architectural ambient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2c2825]/90 via-[#2c2825]/30 to-black/35" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />
                </div>
              );
            })}
          </div>

          {/* TOP BAR / PROGRESS TIMER */}
          <div className="relative z-10 flex items-center justify-between">
            {/* Slide Progress Dots */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Jump to slide ${i + 1}`}
                  className={`transition-all duration-500 rounded-full ${
                    i === currentSlide
                      ? 'w-6 h-1.5 bg-white'
                      : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
              <span className="text-[10px] text-white/70 ml-1.5 font-medium tracking-wider">
                AUTO-SLIDE 5S
              </span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs text-white/90">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold">{slides[currentSlide].tagline}</span>
            </div>
          </div>

          {/* CENTER-LEFT HEADLINE (Matching Image 2: "COCO HOME / INTERIOR MODERN" -> "ZOLA HOME / INTERIOR MODERN") */}
          <div className="relative z-10 my-auto py-8 max-w-2xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[1.04] drop-shadow-2xl">
              ZOLA HOME <br />
              INTERIOR MODERN
            </h1>

            {/* Pill Search Button directly below title matching Image 2 */}
            <div className="mt-5">
              <button
                onClick={() => {
                  document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase backdrop-blur-md border border-white/25 transition-all duration-300 hover:scale-105 shadow-lg group"
              >
                <span>Explore Products</span>
                <span className="text-base font-light transition-transform duration-300 group-hover:translate-x-1.5">
                  ──────→
                </span>
              </button>
            </div>
          </div>

          {/* FLOATING CAPSULE SEARCH BAR (Directly matching Image 2's white rounded capsule) */}
          <div className="relative z-10 w-full mt-4">
            <form 
              onSubmit={handleSearch}
              className="bg-white text-[#2a2724] rounded-[24px] sm:rounded-[28px] p-2 sm:p-2.5 shadow-2xl flex flex-col md:flex-row items-center gap-2 sm:gap-4 border border-white/80"
            >
              {/* Field 1: City Street */}
              <div className="flex-1 w-full flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-neutral-200">
                <MapPin className="w-4 h-4 text-[#8a8278] shrink-0 mr-3" />
                <div className="flex flex-col w-full">
                  <span className="text-[10px] text-[#787168] uppercase tracking-wider font-bold">
                    City Street ▾
                  </span>
                  <select 
                    value={cityArea}
                    onChange={(e) => setCityArea(e.target.value)}
                    className="bg-transparent text-xs font-black text-[#2a2724] focus:outline-none cursor-pointer tracking-wide"
                  >
                    <option value="Bole">234 STREET (BOLE)</option>
                    <option value="CMC">CMC BOULEVARD</option>
                    <option value="Kazanchis">KAZANCHIS</option>
                    <option value="Sarbet">SARBET</option>
                    <option value="All Addis Ababa">ALL ADDIS ABABA</option>
                  </select>
                </div>
              </div>

              {/* Field 2: Typology Of Rent / Space */}
              <div className="flex-1 w-full flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-neutral-200">
                <Building className="w-4 h-4 text-[#8a8278] shrink-0 mr-3" />
                <div className="flex flex-col w-full">
                  <span className="text-[10px] text-[#787168] uppercase tracking-wider font-bold">
                    Typology Of Rent ▾
                  </span>
                  <select 
                    value={typology}
                    onChange={(e) => setTypology(e.target.value)}
                    className="bg-transparent text-xs font-black text-[#2a2724] focus:outline-none cursor-pointer tracking-wide"
                  >
                    <option value="Home & Apart">Home & Apart</option>
                    <option value="home">Luxury Penthouse</option>
                    <option value="office">Executive Office</option>
                    <option value="hospitality">Hospitality & Villa</option>
                  </select>
                </div>
              </div>

              {/* Field 3: Price */}
              <div className="flex-1 w-full flex items-center px-4 py-2 border-b md:border-b-0 border-neutral-200">
                <DollarSign className="w-4 h-4 text-[#8a8278] shrink-0 mr-3" />
                <div className="flex flex-col w-full">
                  <span className="text-[10px] text-[#787168] uppercase tracking-wider font-bold">
                    Price ▾
                  </span>
                  <select 
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="bg-transparent text-xs font-black text-[#2a2724] focus:outline-none cursor-pointer tracking-wide"
                  >
                    <option value="100000">ETB 100,000 (Best Offer)</option>
                    <option value="50000">ETB 50,000</option>
                    <option value="40000">ETB 40,000</option>
                    <option value="25000">ETB 25,000</option>
                  </select>
                </div>
              </div>

              {/* Search Pill Button matching Image 2 */}
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3.5 bg-[#2d2926] hover:bg-black text-white rounded-[20px] font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2.5 transition-all hover:scale-[1.03] shadow-lg shrink-0 cursor-pointer"
              >
                <Search className="w-4 h-4 text-white" />
                <span>Search</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
