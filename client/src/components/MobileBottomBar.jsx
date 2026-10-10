import React from 'react';
import { Home, Search, User, Sparkles } from 'lucide-react';

export default function MobileBottomBar({ onNavigate, onOpenAdmin, onFocusSearch }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#1d1714]/95 border-t border-[#c9a24a]/25 backdrop-blur-xl px-4 py-2.5">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        
        {/* Home Button */}
        <button
          onClick={() => onNavigate('home')}
          className="flex flex-col items-center justify-center text-[#c9a24a] p-1.5 focus:outline-none"
          aria-label="Home"
        >
          <div className="w-8 h-8 rounded-full bg-[#2a221b] flex items-center justify-center border border-[#c9a24a]/30">
            <Home className="w-4 h-4 text-[#c9a24a]" />
          </div>
        </button>

        {/* Search Field pill (matches screenshot!) */}
        <button
          onClick={onFocusSearch}
          className="flex-1 flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#2b231d] border border-[#44372e] text-left text-xs text-[#9c8f80] hover:border-[#c9a24a]/50 transition-colors"
        >
          <Search className="w-3.5 h-3.5 text-[#c9a24a] shrink-0" />
          <span className="truncate">Search with this Pin...</span>
        </button>

        {/* Profile / Admin Button */}
        <button
          onClick={onOpenAdmin}
          className="flex flex-col items-center justify-center text-[#a69c8f] hover:text-[#c9a24a] p-1.5 focus:outline-none"
          aria-label="Admin Profile"
        >
          <div className="w-8 h-8 rounded-full bg-[#2a221b] flex items-center justify-center border border-[#44372e] hover:border-[#c9a24a]">
            <User className="w-4 h-4 text-[#e0d6c8]" />
          </div>
        </button>

      </div>
    </div>
  );
}
