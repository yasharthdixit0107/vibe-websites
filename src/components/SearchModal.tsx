import React, { useState, useEffect } from 'react';
import { ScreenType } from '../types';
import { ALL_VAULT_PRODUCTS, CREATORS_LIST, SOUNDTRACKS } from '../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ScreenType) => void;
  onOpenProfile?: () => void;
  onOpenIntel?: (initialQ?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenProfile,
  onOpenIntel
}) => {
  const [query, setQuery] = useState('');

  // Handle escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const filteredProducts = ALL_VAULT_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.series.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCreators = CREATORS_LIST.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.handle.toLowerCase().includes(query.toLowerCase()) ||
      c.code.toLowerCase().includes(query.toLowerCase())
  );

  const filteredTracks = SOUNDTRACKS.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.genre.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative mx-auto max-w-2xl bg-[#131317] border-2 border-[#c3f400] shadow-[8px_8px_0px_#000000] rounded-xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-4 border-b border-[#2a292e] bg-[#1b1b1f]">
          <span className="material-symbols-outlined text-[#c3f400] text-2xl mr-3">
            search
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search formulas, flavors, drops, or creator codes..."
            className="w-full bg-transparent font-space font-medium text-base text-[#e4e1e7] placeholder:text-[#c4c9ac] focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="px-2 py-1 bg-[#2a292e] hover:bg-[#353439] text-[#c4c9ac] rounded text-xs font-space font-bold uppercase ml-2"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-6">
          {/* Quick Screen Shortcuts */}
          {query === '' && (
            <div>
              <span className="font-space font-bold text-xs uppercase text-[#c4c9ac] block mb-2">
                QUICK DIRECTORY
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('home');
                  }}
                  className="flex items-center gap-2 p-2.5 bg-[#1b1b1f] hover:bg-[#2a292e] rounded border border-[#2a292e] text-left transition-colors"
                >
                  <span className="material-symbols-outlined text-[#c3f400] text-lg">home</span>
                  <span className="font-space font-bold text-xs text-[#e4e1e7] uppercase">Home Page</span>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('shop-drops');
                  }}
                  className="flex items-center gap-2 p-2.5 bg-[#1b1b1f] hover:bg-[#2a292e] rounded border border-[#2a292e] text-left transition-colors"
                >
                  <span className="material-symbols-outlined text-[#c3f400] text-lg">local_mall</span>
                  <span className="font-space font-bold text-xs text-[#e4e1e7] uppercase">The Vault (Active Drops)</span>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('product-spotlight');
                  }}
                  className="flex items-center gap-2 p-2.5 bg-[#1b1b1f] hover:bg-[#2a292e] rounded border border-[#2a292e] text-left transition-colors"
                >
                  <span className="material-symbols-outlined text-[#ff4b89] text-lg">science</span>
                  <span className="font-space font-bold text-xs text-[#e4e1e7] uppercase">Hyper-Isolate Spotlight</span>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('x-club-community');
                  }}
                  className="flex items-center gap-2 p-2.5 bg-[#1b1b1f] hover:bg-[#2a292e] rounded border border-[#2a292e] text-left transition-colors"
                >
                  <span className="material-symbols-outlined text-[#c3f400] text-lg">group</span>
                  <span className="font-space font-bold text-xs text-[#e4e1e7] uppercase">X-Club & Soundtracks</span>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenProfile) onOpenProfile();
                  }}
                  className="flex items-center gap-2 p-2.5 bg-[#1b1b1f] hover:bg-[#2a292e] rounded border border-[#c3f400]/40 text-left transition-colors"
                >
                  <span className="material-symbols-outlined text-[#c3f400] text-lg">receipt_long</span>
                  <div className="flex-1 min-w-0">
                    <span className="font-space font-bold text-xs text-[#c3f400] uppercase block truncate">My Orders &amp; Tracking</span>
                    <span className="text-[10px] font-space text-[#8f919d]">PROCESSING • SHIPPED • DELIVERED</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenIntel) onOpenIntel();
                  }}
                  className="flex items-center gap-2 p-2.5 bg-[#1a1921] hover:bg-[#25242e] rounded border border-[#00e5ff]/50 text-left transition-colors"
                >
                  <span className="material-symbols-outlined text-[#00e5ff] text-lg">travel_explore</span>
                  <div className="flex-1 min-w-0">
                    <span className="font-space font-bold text-xs text-[#00e5ff] uppercase block truncate">Kinetic Intel (Google Search Grounded)</span>
                    <span className="text-[10px] font-space text-[#8f919d]">GEMINI 3.5 FLASH • STUDIES &amp; WADA DATA</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('about');
                    setTimeout(() => {
                      const el = document.getElementById('creator-watermark-station');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 150);
                  }}
                  className="col-span-2 flex items-center gap-2 p-2.5 bg-[#17161f] hover:bg-[#23222e] rounded border border-[#c3f400]/60 text-left transition-colors"
                >
                  <span className="material-symbols-outlined text-[#c3f400] text-lg">verified</span>
                  <div className="flex-1 min-w-0">
                    <span className="font-space font-bold text-xs text-[#c3f400] uppercase block truncate">
                      ⚡ Creator Proof &amp; Direct Contact: Yasharth Dixit
                    </span>
                    <span className="text-[10px] font-space text-[#a7a9b6]">
                      EMAIL: yasharthdixit0107@gmail.com • TEL: 7505086399 • OFFICIAL TRADEMARK WATERMARK
                    </span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Quick Trigger to Ask AI with current search query */}
          {query.trim().length > 2 && (
            <button
              onClick={() => {
                onClose();
                if (onOpenIntel) onOpenIntel(query);
              }}
              className="w-full bg-[#161e00] border-2 border-[#c3f400] p-3 text-left hover:bg-[#212b00] transition-colors flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#c3f400]">travel_explore</span>
                <span className="font-space font-extrabold text-xs text-[#c3f400] uppercase">
                  Ask Kinetic Intel about &ldquo;{query}&rdquo; (Google Search Grounded) →
                </span>
              </div>
              <span className="font-space font-bold text-[10px] bg-[#c3f400] text-[#0e0e12] px-2 py-0.5">
                LIVE SEARCH
              </span>
            </button>
          )}

          {/* Matching Products */}
          {filteredProducts.length > 0 && (
            <div>
              <span className="font-space font-bold text-xs uppercase text-[#c3f400] block mb-2">
                FORMULAS & DROPS ({filteredProducts.length})
              </span>
              <div className="space-y-1.5">
                {filteredProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onClose();
                      onNavigate('product-spotlight');
                    }}
                    className="w-full flex items-center justify-between p-2.5 bg-[#1b1b1f] hover:bg-[#2a292e] rounded border border-[#2a292e] text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 object-contain bg-[#0e0e12] rounded p-1" />
                      <div>
                        <span className="font-syne font-bold text-xs uppercase text-[#e4e1e7] group-hover:text-[#c3f400] block">
                          {p.name}
                        </span>
                        <span className="font-space text-[10px] text-[#c4c9ac] uppercase">
                          {p.series} • {p.servings}
                        </span>
                      </div>
                    </div>
                    <span className="font-syne font-bold text-sm text-[#c3f400]">
                      ${p.price.toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matching Creators */}
          {filteredCreators.length > 0 && (
            <div>
              <span className="font-space font-bold text-xs uppercase text-[#ff4b89] block mb-2">
                CREATOR CODES ({filteredCreators.length})
              </span>
              <div className="space-y-1.5">
                {filteredCreators.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onClose();
                      onNavigate('x-club-community');
                    }}
                    className="w-full flex items-center justify-between p-2.5 bg-[#1b1b1f] hover:bg-[#2a292e] rounded border border-[#2a292e] text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={c.image} alt={c.name} className="w-10 h-10 object-cover rounded" />
                      <div>
                        <span className="font-syne font-bold text-xs uppercase text-[#e4e1e7] group-hover:text-[#ff4b89] block">
                          {c.name} ({c.handle})
                        </span>
                        <span className="font-space text-[10px] text-[#c4c9ac] uppercase">
                          {c.niche} • {c.favoriteStack}
                        </span>
                      </div>
                    </div>
                    <span className="font-space font-bold text-xs bg-[#ff4b89] text-[#590026] px-2 py-0.5 rounded">
                      CODE: {c.code}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matching Tracks */}
          {filteredTracks.length > 0 && (
            <div>
              <span className="font-space font-bold text-xs uppercase text-[#b4c5ff] block mb-2">
                X-CLUB SOUNDTRACKS ({filteredTracks.length})
              </span>
              <div className="space-y-1.5">
                {filteredTracks.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      onClose();
                      onNavigate('x-club-community');
                    }}
                    className="w-full flex items-center justify-between p-2.5 bg-[#1b1b1f] hover:bg-[#2a292e] rounded border border-[#2a292e] text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={t.coverImage} alt={t.title} className="w-10 h-10 object-cover rounded" />
                      <div>
                        <span className="font-syne font-bold text-xs uppercase text-[#e4e1e7] group-hover:text-[#b4c5ff] block">
                          {t.title}
                        </span>
                        <span className="font-space text-[10px] text-[#c4c9ac] uppercase">
                          {t.genre} • {t.bpm}
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#c3f400]">
                      play_circle
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredProducts.length === 0 && filteredCreators.length === 0 && filteredTracks.length === 0 && (
            <div className="text-center py-10">
              <span className="font-syne text-lg uppercase text-[#c4c9ac]">
                No matching drops found for "{query}"
              </span>
              <p className="font-space text-xs text-[#8e9379] mt-1">
                Try searching "isolate", "matcha", "marcus", or "creatine"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
