import React, { useState } from 'react';
import { Search, Filter, Sparkles, Check, ChevronRight, Eye, FileText } from 'lucide-react';

export default function ProductCatalog({ 
  products, 
  categories, 
  onViewProduct, 
  onOpenQuote, 
  filterState, 
  setFilterState 
}) {
  const [searchTerm, setSearchTerm] = useState(filterState.search || '');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setFilterState(prev => ({ ...prev, search: e.target.value }));
  };

  const handleCategoryFilter = (cat) => {
    setFilterState(prev => ({ 
      ...prev, 
      category: prev.category === cat ? 'all' : cat 
    }));
  };

  const handleTypeFilter = (type) => {
    setFilterState(prev => ({ 
      ...prev, 
      type: prev.type === type ? 'all' : type 
    }));
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setFilterState({
      category: 'all',
      type: 'all',
      area: 'all',
      maxPrice: '',
      search: ''
    });
  };

  return (
    <section id="products-section" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#cfa85c]" />
              <span className="text-xs uppercase tracking-widest text-[#cfa85c] font-semibold">
                Complete Collection
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading uppercase">
              ZOLA FURNITURE CATALOG
            </h2>
            <p className="text-xs sm:text-sm text-[#a39b91] mt-1">
              Showing {products.length} handcrafted models available for purchase & custom tailoring
            </p>
          </div>

          {/* Quick Search Field */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#cfa85c] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search sofas, chairs, tables..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#35302c] border border-white/10 text-xs text-white placeholder-[#8a8278] focus:outline-none focus:border-[#cfa85c] transition-colors"
            />
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs text-[#a39b91] flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5 text-[#cfa85c]" /> Filter by:
          </span>

          {/* Categories */}
          <button
            onClick={() => handleCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-colors cursor-pointer ${
              filterState.category === 'all'
                ? 'bg-white text-black font-bold'
                : 'bg-[#35302c] text-[#a39b91] hover:text-white border border-white/10'
            }`}
          >
            All Categories
          </button>

          {['Chair', 'Sofa', 'Table', 'Bed', 'Cupboard', 'Rotan'].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-colors cursor-pointer ${
                filterState.category.toLowerCase() === cat.toLowerCase()
                  ? 'bg-white text-black font-bold'
                  : 'bg-[#35302c] text-[#a39b91] hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}

          {/* Types */}
          <div className="h-4 w-px bg-white/10 mx-1 hidden sm:block" />
          {['home', 'office', 'restaurant', 'cafe'].map((type) => (
            <button
              key={type}
              onClick={() => handleTypeFilter(type)}
              className={`px-2.5 py-1 rounded-full text-[11px] uppercase tracking-wider transition-colors cursor-pointer ${
                filterState.type.toLowerCase() === type.toLowerCase()
                  ? 'bg-white/20 text-white font-bold border border-white/30'
                  : 'text-[#8a8278] hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}

          {/* Clear Filters Button if active */}
          {(filterState.category !== 'all' || filterState.type !== 'all' || filterState.search || filterState.maxPrice) && (
            <button
              onClick={clearAllFilters}
              className="ml-auto text-[11px] text-[#cfa85c] underline hover:text-white font-medium cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-16 luxury-card p-8 max-w-md mx-auto">
            <p className="text-sm text-[#cfc7bc] mb-4">
              No furniture pieces found matching your filter criteria.
            </p>
            <button
              onClick={clearAllFilters}
              className="gold-btn px-6 py-2.5 rounded-full text-xs uppercase font-bold"
            >
              View Full Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="luxury-card flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Image Container: Fills Frame */}
                <div 
                  onClick={() => onViewProduct(product)}
                  className="relative h-64 bg-[#191411] cursor-pointer overflow-hidden"
                >
                  <img
                    src={product.image_urls[0] || '/images/06-zola-green-corner-sofa.png'}
                    alt={product.name}
                    className="w-full h-full object-cover filter brightness-[0.98] group-hover:scale-108 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-black/70 text-white px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-sm">
                      {product.category}
                    </span>
                    {product.tag && (
                      <span className="text-[9px] font-medium bg-[#cfa85c]/25 text-[#f5d893] px-2 py-0.5 rounded-full w-fit">
                        {product.tag}
                      </span>
                    )}
                  </div>

                  <span className="absolute top-3 right-3 text-[10px] bg-black/60 text-[#a39b91] px-2 py-0.5 rounded-md uppercase font-medium">
                    {product.area}
                  </span>
                </div>

                {/* Details Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 
                      onClick={() => onViewProduct(product)}
                      className="text-sm font-bold text-white hover:text-[#cfa85c] transition-colors cursor-pointer line-clamp-1 font-heading uppercase"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#a39b91] mt-1.5 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Actions */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#8a8278] uppercase block">Price</span>
                      <span className="text-sm font-extrabold text-[#cfa85c] font-heading">
                        ETB {Number(product.price).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onViewProduct(product)}
                        className="p-2 rounded-xl bg-[#453f39] hover:bg-[#524b44] border border-white/10 text-white transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onOpenQuote(product)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#cfa85c] hover:bg-[#dfb75c] text-black text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all shadow-sm cursor-pointer"
                      >
                        <FileText className="w-3 h-3" />
                        <span>Quote</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
