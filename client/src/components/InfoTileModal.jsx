import React from 'react';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';

export default function InfoTileModal({ tileData, onClose, onOpenQuote }) {
  if (!tileData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-[32px] luxury-card p-6 sm:p-8 border border-[#c9a24a]/35 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#1e1915] text-[#a69c8f] hover:text-white border border-[#44382f] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c9a24a]/15 text-[#c9a24a] text-[10px] font-bold uppercase tracking-wider border border-[#c9a24a]/30 mb-3">
          <Sparkles className="w-3 h-3" />
          <span>Zola Services</span>
        </div>

        <h3 className="text-xl font-bold text-white font-heading uppercase">
          {tileData.title}
        </h3>
        
        {tileData.subtitle && (
          <p className="text-xs text-[#c9a24a] font-medium mt-1">
            {tileData.subtitle}
          </p>
        )}

        <div className="my-5 p-4 rounded-2xl bg-[#1a1411] border border-[#3e3228] text-xs text-[#cfc7bc] leading-relaxed">
          {tileData.content}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenQuote(null);
            }}
            className="flex-1 py-3 rounded-2xl gold-btn text-xs font-bold uppercase tracking-wider"
          >
            Inquire About This Service
          </button>
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-2xl bg-[#271f19] text-[#a69c8f] hover:text-white text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
