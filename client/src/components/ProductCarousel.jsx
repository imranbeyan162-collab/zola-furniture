import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye, FileText } from 'lucide-react';

export default function ProductCarousel({ 
  products, 
  activeCategory, 
  onSelectCategory, 
  onViewProduct, 
  onOpenQuote 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // Category Tabs matching Image 2: TABLE, NAKAS, CHAIR DESIGN, BED, CUPBOARD, ROTAN
  const categoryTabs = [
    { label: 'TABLE', value: 'table' },
    { label: 'NAKAS', value: 'sofa' },
    { label: 'CHAIR DESIGN', value: 'chair' },
    { label: 'BED', value: 'bed' },
    { label: 'CUPBOARD', value: 'cupboard' },
    { label: 'ROTAN', value: 'rotan' },
  ];

  // Filter products
  const filteredProducts = products.length > 0
    ? (activeCategory === 'all'
        ? products
        : products.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase()))
    : [];

  const displayList = filteredProducts.length > 0 ? filteredProducts : products;

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  // ⏱️ SLIDES TRANSIT BY THEMSELVES EVERY 5 SECONDS WITH ULTRA-SMOOTH TRANSITIONS
  useEffect(() => {
    if (isHovered || displayList.length <= 1) return;

    const autoTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayList.length);
    }, 5000);

    return () => clearInterval(autoTimer);
  }, [currentIndex, displayList.length, isHovered]);

  const nextSlide = () => {
    if (displayList.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % displayList.length);
  };

  const prevSlide = () => {
    if (displayList.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + displayList.length) % displayList.length);
  };

  // Touch handlers
  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
  };

  if (displayList.length === 0) return null;

  const currentProduct = displayList[currentIndex];
  const prevIndex = (currentIndex - 1 + displayList.length) % displayList.length;
  const prevProduct = displayList[prevIndex];
  const nextIndex = (currentIndex + 1) % displayList.length;
  const nextProduct = displayList[nextIndex];

  return (
    <section 
      id="products-section"
      className="py-12 sm:py-16 relative select-none bg-[#2c2825]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* 1. CATEGORY TABS ROW (Directly matching Image 2: TABLE  NAKAS  CHAIR DESIGN  BED  CUPBOARD) */}
        <div className="flex items-center justify-center overflow-x-auto py-4 no-scrollbar mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-6 sm:gap-10 md:gap-14 px-4">
            {categoryTabs.map((tab) => {
              const isActive = activeCategory.toLowerCase() === tab.value.toLowerCase();
              return (
                <button
                  key={tab.value}
                  onClick={() => onSelectCategory(tab.value)}
                  className={`transition-all duration-300 uppercase tracking-widest whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-white font-black text-xl sm:text-3xl drop-shadow-md scale-105'
                      : 'text-[#9c9387] hover:text-white font-bold text-xs sm:text-base opacity-70 hover:opacity-100'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. 3D COVERFLOW SLIDER STAGE matching Image 2 */}
        <div 
          className="relative w-full max-w-5xl mx-auto flex items-center justify-center overflow-hidden py-4"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            aria-label="Previous Product"
            className="absolute left-2 sm:left-4 z-30 w-12 h-12 rounded-full bg-[#38332e]/80 hover:bg-[#48423c] border border-white/10 text-white flex items-center justify-center transition-all duration-300 shadow-xl backdrop-blur-md cursor-pointer hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next Product"
            className="absolute right-2 sm:right-4 z-30 w-12 h-12 rounded-full bg-[#38332e]/80 hover:bg-[#48423c] border border-white/10 text-white flex items-center justify-center transition-all duration-300 shadow-xl backdrop-blur-md cursor-pointer hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards Frame */}
          <div className="relative w-full flex items-center justify-center min-h-[480px] sm:min-h-[530px]">

            {/* PREVIOUS CARD (peeks in on left side matching Image 2) */}
            {displayList.length > 1 && (
              <div 
                onClick={prevSlide}
                className="hidden md:flex absolute left-4 lg:left-8 w-[280px] lg:w-[310px] h-[430px] rounded-[36px] bg-[#332e2a] border border-white/5 opacity-50 scale-90 hover:opacity-75 cursor-pointer transition-all duration-500 transform -translate-x-8 z-10 overflow-hidden shadow-2xl flex-col justify-between p-6"
              >
                <div className="text-center">
                  <h4 className="text-sm font-extrabold text-white uppercase tracking-wider truncate">
                    {prevProduct.category || 'CHAIR'}
                  </h4>
                  <span className="text-[11px] text-[#a89f92] mt-0.5 block">
                    {prevProduct.tag || 'Best quality'}
                  </span>
                </div>

                <div className="h-[240px] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-[#282421]/60">
                  <img
                    src={prevProduct.image_urls[0]}
                    alt={prevProduct.name}
                    className="w-full h-full object-cover filter brightness-95"
                  />
                </div>

                <div className="text-center">
                  <span className="text-xs font-bold text-[#cfa85c]">
                    ETB {Number(prevProduct.price).toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {/* CENTER ACTIVE CARD (Matching Image 2: "SOFA MODERN", subdetails, large clean frame) */}
            <div className="relative z-20 w-full max-w-[360px] sm:max-w-[430px] rounded-[38px] bg-[#35302c] border border-white/10 p-6 sm:p-7 transition-all duration-500 shadow-2xl flex flex-col justify-between">
              
              {/* Product Header inside Card */}
              <div className="text-center mb-3">
                <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-wide uppercase drop-shadow line-clamp-1">
                  {currentProduct.name}
                </h3>

                <div className="flex items-center justify-center gap-3 mt-1.5 text-xs text-[#b0a79a]">
                  <span className="font-extrabold text-[#cfa85c]">
                    ETB {Number(currentProduct.price).toLocaleString()}
                  </span>
                  <span>•</span>
                  <span>{currentProduct.tag || 'Best deal'}</span>
                  <span>•</span>
                  <span className="text-[#ddd6ca]">Approved quality</span>
                </div>
              </div>

              {/* Product Image Stage */}
              <div 
                onClick={() => onViewProduct(currentProduct)}
                className="relative h-[270px] sm:h-[310px] w-full cursor-pointer group my-2 overflow-hidden rounded-[28px] bg-[#292522] border border-white/5 shadow-inner"
              >
                <img
                  src={currentProduct.image_urls[0]}
                  alt={currentProduct.name}
                  className="w-full h-full object-cover filter brightness-[0.98] transition-transform duration-700 group-hover:scale-108"
                />

                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-xs font-semibold text-white bg-black/80 px-4 py-2 rounded-full border border-white/20 flex items-center gap-1.5 shadow-xl backdrop-blur-md">
                    <Eye className="w-3.5 h-3.5 text-[#cfa85c]" /> Quick View
                  </span>
                </div>
              </div>

              {/* 5-Second Timer Bar */}
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden my-3">
                <div 
                  key={currentIndex}
                  className={`h-full bg-gradient-to-r from-[#cfa85c] to-white rounded-full ${
                    isHovered ? 'w-full' : 'animate-progress-5s'
                  }`}
                />
              </div>

              {/* Quick Actions */}
              <div className="pt-2 border-t border-white/10 flex items-center gap-3">
                <button
                  onClick={() => onViewProduct(currentProduct)}
                  className="flex-1 py-2.5 px-3 rounded-2xl bg-[#413b35] hover:bg-[#4d463f] text-xs font-semibold text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#cfa85c]" />
                  <span>Inspect</span>
                </button>

                <button
                  onClick={() => onOpenQuote(currentProduct)}
                  className="flex-1 py-2.5 px-3 rounded-2xl bg-[#cfa85c] hover:bg-[#dfb75c] text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Quote</span>
                </button>
              </div>

            </div>

            {/* NEXT CARD (peeks in on right side matching Image 2) */}
            {displayList.length > 1 && (
              <div 
                onClick={nextSlide}
                className="hidden md:flex absolute right-4 lg:right-8 w-[280px] lg:w-[310px] h-[430px] rounded-[36px] bg-[#332e2a] border border-white/5 opacity-50 scale-90 hover:opacity-75 cursor-pointer transition-all duration-500 transform translate-x-8 z-10 overflow-hidden shadow-2xl flex-col justify-between p-6"
              >
                <div className="text-center">
                  <h4 className="text-sm font-extrabold text-white uppercase tracking-wider truncate">
                    {nextProduct.category || 'ROTAN'}
                  </h4>
                  <span className="text-[11px] text-[#a89f92] mt-0.5 block">
                    {nextProduct.tag || 'Discount'}
                  </span>
                </div>

                <div className="h-[240px] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-[#282421]/60">
                  <img
                    src={nextProduct.image_urls[0]}
                    alt={nextProduct.name}
                    className="w-full h-full object-cover filter brightness-95"
                  />
                </div>

                <div className="text-center">
                  <span className="text-xs font-bold text-[#cfa85c]">
                    ETB {Number(nextProduct.price).toLocaleString()}
                  </span>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* 3. PAGINATION DOTS (Directly matching Image 2: 3 dots ● ○ ○ with active amber/gold) */}
        <div className="flex items-center justify-center gap-3 mt-4 sm:mt-6">
          <button
            onClick={prevSlide}
            aria-label="Previous"
            className="w-2.5 h-2.5 rounded-full bg-white/30 hover:bg-white/60 transition-all cursor-pointer"
          />
          <button
            onClick={() => {}}
            aria-label="Current Active"
            className="w-3 h-3 rounded-full bg-[#cfa85c] shadow-md shadow-[#cfa85c]/50 transition-all cursor-pointer scale-110"
          />
          <button
            onClick={nextSlide}
            aria-label="Next"
            className="w-2.5 h-2.5 rounded-full bg-white/30 hover:bg-white/60 transition-all cursor-pointer"
          />
        </div>

      </div>
    </section>
  );
}
