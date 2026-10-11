import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

export default function Hero({ onOpenQuote }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // The 4 user-selected furniture photos
  const slides = [
    {
      image: '/images/hero-slide-1.png',
      title: 'MODERN DINING & KITCHEN',
      subtitle: 'Premium marble top dining table with sculpted dual-tone ergonomic chairs'
    },
    {
      image: '/images/hero-slide-2.png',
      title: 'OUTDOOR & PATIO LUXURY',
      subtitle: 'Weather-resistant solid teak wood dining set engineered for modern residences'
    },
    {
      image: '/images/hero-slide-3.png',
      title: 'LUXURY SUITE BEDROOM',
      subtitle: 'Fluted velvet upholstered king bed with bespoke nightstands and ambient styling'
    },
    {
      image: '/images/hero-slide-4.png',
      title: 'SCULPTURAL LIVING ROOM',
      subtitle: 'Curved minimalist cream boucle sofa with solid nero marble coffee table'
    }
  ];

  // ⏱️ AUTOMATIC SLIDING EVERY 5 SECONDS WITH ULTRA-SMOOTH TRANSITIONS
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length, isHovered]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section 
      className="relative pt-20 pb-6 sm:pt-24 sm:pb-10 overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Stage Frame matching Image 2 with clean minimalist finish */}
        <div className="relative rounded-[36px] sm:rounded-[44px] overflow-hidden border border-white/10 shadow-2xl min-h-[520px] sm:min-h-[580px] flex flex-col justify-between p-6 sm:p-12 transition-all duration-700 bg-[#2b2724]">
          
          {/* 5-SECOND ULTRA-SMOOTH BACKGROUND SLIDER */}
          <div className="absolute inset-0 overflow-hidden">
            {slides.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <div
                  key={slide.image}
                  className={`absolute inset-0 transition-opacity duration-1200 ease-in-out ${
                    isActive ? 'opacity-100 z-1' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className={`w-full h-full object-cover object-center transition-transform duration-[7000ms] ease-out ${
                      isActive ? 'scale-105' : 'scale-100'
                    }`}
                  />
                  {/* Smooth dark architectural vignette for crystal-clear readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2c2825]/90 via-[#2c2825]/40 to-black/40" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />
                </div>
              );
            })}
          </div>

          {/* TOP ROW: SLIDE TIMER & PROGRESS */}
          <div className="relative z-10 flex items-center justify-between">
            {/* Slide Progress Pill */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 shadow-lg">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`transition-all duration-500 rounded-full cursor-pointer ${
                    i === currentSlide
                      ? 'w-7 h-1.5 bg-white shadow-sm'
                      : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80'
                  }`}
                />
              ))}
              <span className="text-[10px] text-white/80 ml-2 font-semibold tracking-wider">
                {isHovered ? 'PAUSED' : 'AUTO-SLIDE 5S'}
              </span>
            </div>

            {/* Quick Slide Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                aria-label="Previous Hero Slide"
                className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-md cursor-pointer hover:scale-105"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next Hero Slide"
                className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-md cursor-pointer hover:scale-105"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CENTER-LEFT HEADLINE (Matching Image 2: "COCO HOME / INTERIOR MODERN" -> "ZOLA HOME / INTERIOR MODERN") */}
          <div className="relative z-10 my-auto py-8 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-3 text-[11px] font-bold text-white uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#cfa85c]" />
              <span>{slides[currentSlide].title}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-[1.03] drop-shadow-2xl">
              ZOLA HOME <br />
              INTERIOR MODERN
            </h1>

            <p className="mt-3 text-xs sm:text-sm text-[#e0d9cf] max-w-lg font-light leading-relaxed drop-shadow">
              {slides[currentSlide].subtitle}
            </p>

            {/* Pill Search Button directly below title matching Image 2 */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-4 px-7 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase backdrop-blur-md border border-white/30 transition-all duration-300 hover:scale-105 shadow-xl group cursor-pointer"
              >
                <span>Explore Products</span>
                <span className="text-base font-light transition-transform duration-300 group-hover:translate-x-1.5">
                  ──────→
                </span>
              </button>

              <button
                onClick={() => onOpenQuote && onOpenQuote(null)}
                className="px-6 py-3 rounded-full bg-black/50 hover:bg-black/70 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase backdrop-blur-md border border-white/15 transition-all hover:border-white/30 cursor-pointer"
              >
                Bespoke Order
              </button>
            </div>
          </div>

          {/* BOTTOM SUBTLE FOOTER BAR INSIDE HERO */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#d4ccc0]">
            <span className="font-medium tracking-wide">
              Addis Ababa Master Woodworking & Luxury Upholstery
            </span>
            <span className="hidden sm:inline font-semibold text-white">
              0935 745 559 • Bole Showroom
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
