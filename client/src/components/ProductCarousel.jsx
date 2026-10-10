import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, CheckCircle2, Eye, FileText, Play, Pause } from 'lucide-react';

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
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Available Category Tabs matching reference screenshot
  const categoryTabs = [
    { label: 'ALL', value: 'all' },
    { label: 'CHAIR DESIGN', value: 'chair' },
    { label: 'SOFA', value: 'sofa' },
    { label: 'TABLE', value: 'table' },
    { label: 'BED', value: 'bed' },
    { label: 'CUPBOARD', value: 'cupboard' },
    { label: 'ROTAN', value: 'rotan' },
  ];

  // Filter products for carousel (featured items or category filtered)
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

  // ⏱️ AUTOMATIC SLIDING EVERY 5 SECONDS
  useEffect(() => {
    if (isHovered || isDragging || displayList.length <= 1) return;

    const autoTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayList.length);
    }, 5000); // 5 seconds interval

    return () => clearInterval(autoTimer);
  }, [currentIndex, displayList.length, isHovered, isDragging]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, displayList.length]);

  const nextSlide = () => {
    if (displayList.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % displayList.length);
  };

  const prevSlide = () => {
    if (displayList.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + displayList.length) % displayList.length);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Mouse drag handlers for desktop swipe
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = dragStartX - e.clientX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
  };

  if (displayList.length === 0) {
    return null;
  }

  // Get current, previous, and next products for 3D coverflow layout
  const currentProduct = displayList[currentIndex];
  const prevIndex = (currentIndex - 1 + displayList.length) % displayList.length;
  const prevProduct = displayList[prevIndex];
  const nextIndex = (currentIndex + 1) % displayList.length;
  const nextProduct = displayList[nextIndex];

  return (
    <section 
      className="py-8 relative select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* 1. Category Tabs in a Row (Matching the screenshot: TABLE, NAKAS, CHAIR DESIGN, BED...) */}
        <div className="flex items-center justify-center overflow-x-auto py-2 no-scrollbar mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-4 sm:gap-8 px-4 border-b border-[#3d322a] pb-3">
            {categoryTabs.map((tab) => {
              const isActive = activeCategory.toLowerCase() === tab.value.toLowerCase();
              return (
                <button
                  key={tab.value}
                  onClick={() => onSelectCategory(tab.value)}
                  className={`category-tab text-xs sm:text-sm uppercase tracking-wider font-semibold transition-all ${
                    isActive
                      ? 'active text-[#c9a24a] scale-105'
                      : 'text-[#9e9386] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. 3D Coverflow Product Carousel Stage */}
        <div 
          className="relative w-full max-w-5xl mx-auto flex items-center justify-center overflow-hidden py-4 sm:py-6"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {/* Left Arrow Button */}
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute left-2 sm:left-6 z-30 w-11 h-11 rounded-full bg-black/60 border border-[#c9a24a]/30 text-[#f5f2ed] hover:border-[#c9a24a] hover:bg-[#c9a24a] hover:text-black flex items-center justify-center transition-all shadow-lg backdrop-blur-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute right-2 sm:right-6 z-30 w-11 h-11 rounded-full bg-black/60 border border-[#c9a24a]/30 text-[#f5f2ed] hover:border-[#c9a24a] hover:bg-[#c9a24a] hover:text-black flex items-center justify-center transition-all shadow-lg backdrop-blur-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slider Layout with Left, Center, and Right visible cards */}
          <div className="relative w-full flex items-center justify-center min-h-[500px] sm:min-h-[550px]">

            {/* PREVIOUS SIDE CARD (peeks in on left, scaled down, faded, fills frame) */}
            {displayList.length > 1 && (
              <div 
                onClick={prevSlide}
                className="hidden md:block absolute left-4 lg:left-8 w-[280px] lg:w-[320px] h-[440px] rounded-[34px] bg-[#1e1915] border border-[#c9a24a]/20 opacity-40 scale-85 hover:opacity-65 cursor-pointer transition-all duration-500 transform -translate-x-6 z-10 overflow-hidden shadow-2xl flex flex-col justify-between"
              >
                <div className="p-4 text-center">
                  <span className="text-[11px] text-[#a69c8f] uppercase tracking-wider block font-bold">
                    {prevProduct.category}
                  </span>
                  <h4 className="text-xs font-bold text-[#dfd7cc] truncate mt-1">
                    {prevProduct.name}
                  </h4>
                </div>
                
                {/* Image fills frame */}
                <div className="h-[280px] w-full overflow-hidden bg-[#15110e] relative">
                  <img
                    src={prevProduct.image_urls[0] || '/images/06-zola-green-corner-sofa.png'}
                    alt={prevProduct.name}
                    className="w-full h-full object-cover filter brightness-[0.95]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                <div className="text-center py-3">
                  <span className="text-xs font-semibold text-[#c9a24a]">
                    ETB {Number(prevProduct.price).toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {/* ACTIVE CENTER CARD (Large centered squircle card filling frame edge-to-edge) */}
            <div className="relative z-20 w-full max-w-[360px] sm:max-w-[440px] rounded-[40px] squircle-card p-5 sm:p-6 transition-all duration-500 gold-glow flex flex-col justify-between">
              
              {/* Product Header inside Card */}
              <div className="text-center mb-2">
                <div className="flex items-center justify-center gap-2 mb-1.5">
                  <span className="text-xs font-extrabold text-[#c9a24a] tracking-widest font-heading">
                    ETB {Number(currentProduct.price).toLocaleString()}
                  </span>
                  <span className="text-[10px] text-[#8e8275]">•</span>
                  <span className="text-[10px] bg-[#c9a24a]/20 text-[#f3d994] px-2.5 py-0.5 rounded-full font-semibold border border-[#c9a24a]/30">
                    {currentProduct.tag || 'Best deal'}
                  </span>
                  <span className="text-[10px] bg-white/10 text-[#d4cbbe] px-2 py-0.5 rounded-full font-medium">
                    Approved quality
                  </span>
                </div>

                <h3 className="text-base sm:text-xl font-extrabold text-white tracking-wider font-heading uppercase drop-shadow line-clamp-1">
                  {currentProduct.name}
                </h3>
              </div>

              {/* Product Image Frame: NOW FILLS THE FRAME COMPLETELY */}
              <div 
                onClick={() => onViewProduct(currentProduct)}
                className="relative h-[280px] sm:h-[330px] w-full cursor-pointer group my-2 overflow-hidden rounded-[28px] bg-[#171310] border border-[#c9a24a]/30 shadow-2xl"
              >
                <img
                  src={currentProduct.image_urls[0] || '/images/06-zola-green-corner-sofa.png'}
                  alt={currentProduct.name}
                  className="w-full h-full object-cover filter brightness-[0.98] transition-transform duration-700 group-hover:scale-108"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80';
                  }}
                />

                {/* Subtle dark gradient overlay at bottom of photo for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <span className="text-xs font-semibold text-white bg-black/80 px-4 py-2 rounded-full border border-[#c9a24a] flex items-center gap-1.5 shadow-2xl backdrop-blur-md">
                    <Eye className="w-3.5 h-3.5 text-[#c9a24a]" /> Click to Inspect
                  </span>
                </div>
              </div>

              {/* 5-Second Auto-Slide Timer Indicator */}
              <div className="w-full h-1 bg-[#3a3026] rounded-full overflow-hidden my-2">
                <div 
                  key={currentIndex}
                  className={`h-full bg-gradient-to-r from-[#c9a24a] via-[#f3d994] to-[#c9a24a] rounded-full ${
                    isHovered ? 'w-full' : 'animate-progress-5s'
                  }`}
                />
              </div>

              {/* Specs & Quick Action Buttons */}
              <div className="pt-2 border-t border-[#3b3028] flex items-center gap-2.5">
                <button
                  onClick={() => onViewProduct(currentProduct)}
                  className="flex-1 py-2.5 px-3 rounded-2xl bg-[#2b221c] hover:bg-[#382d25] border border-[#4a3d33] text-xs font-semibold text-[#f5f2ed] transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-[#c9a24a]" />
                  <span>Details</span>
                </button>

                <button
                  onClick={() => onOpenQuote(currentProduct)}
                  className="flex-1 py-2.5 px-3 rounded-2xl gold-btn text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Request Quote</span>
                </button>
              </div>

            </div>

            {/* NEXT SIDE CARD (peeks in on right, scaled down, faded, fills frame) */}
            {displayList.length > 1 && (
              <div 
                onClick={nextSlide}
                className="hidden md:block absolute right-4 lg:right-8 w-[280px] lg:w-[320px] h-[440px] rounded-[34px] bg-[#1e1915] border border-[#c9a24a]/20 opacity-40 scale-85 hover:opacity-65 cursor-pointer transition-all duration-500 transform translate-x-6 z-10 overflow-hidden shadow-2xl flex flex-col justify-between"
              >
                <div className="p-4 text-center">
                  <span className="text-[11px] text-[#a69c8f] uppercase tracking-wider block font-bold">
                    {nextProduct.category}
                  </span>
                  <h4 className="text-xs font-bold text-[#dfd7cc] truncate mt-1">
                    {nextProduct.name}
                  </h4>
                </div>
                
                {/* Image fills frame */}
                <div className="h-[280px] w-full overflow-hidden bg-[#15110e] relative">
                  <img
                    src={nextProduct.image_urls[0] || '/images/06-zola-green-corner-sofa.png'}
                    alt={nextProduct.name}
                    className="w-full h-full object-cover filter brightness-[0.95]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                <div className="text-center py-3">
                  <span className="text-xs font-semibold text-[#c9a24a]">
                    ETB {Number(nextProduct.price).toLocaleString()}
                  </span>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* 3. Carousel Paging Dots (with active auto-slide indicator) */}
        <div className="flex items-center justify-center gap-2 mt-2 sm:mt-4">
          {displayList.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${
                idx === currentIndex
                  ? 'w-7 h-2 bg-[#c9a24a] shadow-md shadow-[#c9a24a]/50'
                  : 'w-2 h-2 bg-[#524438] hover:bg-[#85705e]'
              }`}
            />
          ))}
        </div>

        {/* Status Hint */}
        <p className="text-center text-[11px] text-[#827568] mt-2">
          {isHovered ? 'Slide auto-rotation paused on hover' : 'Slides automatically rotate every 5 seconds • Swipe or click to browse'}
        </p>

      </div>
    </section>
  );
}
