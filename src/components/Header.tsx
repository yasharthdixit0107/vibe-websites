import React from 'react';
import { ScreenType } from '../types';
import { LOGO_URL, USER_AVATAR } from '../data/mockData';
import { User } from 'firebase/auth';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenProfile: () => void;
  user: User | null;
  onSignInGoogle: () => void;
  onOpenIntel: () => void;
  onOpenCreatorModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenProfile,
  user,
  onSignInGoogle,
  onOpenIntel,
  onOpenCreatorModal
}) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0e0e12]">
      {/* Top Kinetic Marquee Ticker */}
      <div className="w-full overflow-hidden bg-[#c3f400] text-[#161e00] py-1 select-none border-b border-[#0e0e12]">
        <div className="animate-marquee whitespace-nowrap font-syne text-xs uppercase font-extrabold tracking-wider">
          <span className="mx-6">⚡ FREE EXPRESS SHIPPING ON DROPS OVER $50 ⚡ USE CODE: GENZX FOR 20% OFF ⚡ 100% CLEAN INGREDIENTS • ZERO CHALK • 100% FLAVOR ⚡</span>
          <span className="mx-6">⚡ FREE EXPRESS SHIPPING ON DROPS OVER $50 ⚡ USE CODE: GENZX FOR 20% OFF ⚡ 100% CLEAN INGREDIENTS • ZERO CHALK • 100% FLAVOR ⚡</span>
          <span className="mx-6">⚡ FREE EXPRESS SHIPPING ON DROPS OVER $50 ⚡ USE CODE: GENZX FOR 20% OFF ⚡ 100% CLEAN INGREDIENTS • ZERO CHALK • 100% FLAVOR ⚡</span>
          <span className="mx-6">⚡ FREE EXPRESS SHIPPING ON DROPS OVER $50 ⚡ USE CODE: GENZX FOR 20% OFF ⚡ 100% CLEAN INGREDIENTS • ZERO CHALK • 100% FLAVOR ⚡</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="h-20 w-full px-4 sm:px-8 bg-[#1b1b1f] border-b border-[#2a292e] flex items-center justify-between shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group text-left focus:outline-none"
          >
            <img 
              alt="Protein X Logo" 
              className="h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105" 
              src={LOGO_URL} 
            />
            <span className="font-syne text-2xl font-extrabold tracking-tight uppercase text-[#e4e1e7] group-hover:text-[#c3f400] transition-colors">
              PROTEIN X
            </span>
          </button>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            <button
              onClick={() => onNavigate('home')}
              className={`px-4 py-1.5 uppercase transition-all duration-150 rounded ${
                currentScreen === 'home'
                  ? 'bg-[#c3f400] text-[#161e00] font-space font-bold text-sm shadow-[2px_2px_0px_#000000]'
                  : 'font-space font-bold text-xs tracking-wider text-[#c4c9ac] hover:text-[#e4e1e7] hover:bg-[#2a292e]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('shop-drops')}
              className={`px-4 py-1.5 uppercase transition-all duration-150 rounded ${
                currentScreen === 'shop-drops'
                  ? 'bg-[#c3f400] text-[#161e00] font-space font-bold text-sm shadow-[2px_2px_0px_#000000]'
                  : 'font-space font-bold text-xs tracking-wider text-[#c4c9ac] hover:text-[#e4e1e7] hover:bg-[#2a292e]'
              }`}
            >
              Shop Drops
            </button>
            <button
              onClick={() => onNavigate('product-spotlight')}
              className={`px-4 py-1.5 uppercase transition-all duration-150 rounded ${
                currentScreen === 'product-spotlight'
                  ? 'bg-[#c3f400] text-[#161e00] font-space font-bold text-sm shadow-[2px_2px_0px_#000000]'
                  : 'font-space font-bold text-xs tracking-wider text-[#c4c9ac] hover:text-[#e4e1e7] hover:bg-[#2a292e]'
              }`}
            >
              Product Spotlight
            </button>
            <button
              onClick={() => onNavigate('x-club-community')}
              className={`px-4 py-1.5 uppercase transition-all duration-150 rounded ${
                currentScreen === 'x-club-community'
                  ? 'bg-[#c3f400] text-[#161e00] font-space font-bold text-sm shadow-[2px_2px_0px_#000000]'
                  : 'font-space font-bold text-xs tracking-wider text-[#c4c9ac] hover:text-[#e4e1e7] hover:bg-[#2a292e]'
              }`}
            >
              X-Club Community
            </button>
            <button
              onClick={() => onNavigate('taste-lab')}
              className={`px-4 py-1.5 uppercase transition-all duration-150 rounded ${
                currentScreen === 'taste-lab'
                  ? 'bg-[#c3f400] text-[#161e00] font-space font-bold text-sm shadow-[2px_2px_0px_#000000]'
                  : 'font-space font-bold text-xs tracking-wider text-[#c4c9ac] hover:text-[#e4e1e7] hover:bg-[#2a292e]'
              }`}
            >
              Taste Lab
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`px-4 py-1.5 uppercase transition-all duration-150 rounded ${
                currentScreen === 'about'
                  ? 'bg-[#c3f400] text-[#161e00] font-space font-bold text-sm shadow-[2px_2px_0px_#000000]'
                  : 'font-space font-bold text-xs tracking-wider text-[#c4c9ac] hover:text-[#e4e1e7] hover:bg-[#2a292e]'
              }`}
            >
              About
            </button>
          </nav>
        </div>

        {/* Right Tools: Intel, Search, USD, Cart, Orders, Auth/Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Kinetic Intel (Google Search Grounded AI) */}
          <button
            onClick={onOpenIntel}
            className="flex items-center gap-1.5 bg-[#1a1921] hover:bg-[#25242e] text-[#00e5ff] border border-[#00e5ff]/40 px-2.5 sm:px-3 py-1.5 rounded transition-all font-space font-extrabold text-[11px] sm:text-xs uppercase shadow-[2px_2px_0px_#000000] hover:translate-x-0.5"
            title="Ask Kinetic Intel (Google Search Grounded via Gemini 3.5 Flash)"
          >
            <span className="material-symbols-outlined text-sm">travel_explore</span>
            <span className="hidden sm:inline">KINETIC INTEL</span>
            <span className="sm:hidden">AI</span>
          </button>

          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="hidden lg:flex items-center bg-[#1f1f23] hover:bg-[#2a292e] px-3 py-1.5 rounded transition-all border border-[#353439] group"
          >
            <span className="font-space text-xs text-[#c4c9ac] mr-2 group-hover:text-[#e4e1e7]">
              Search...
            </span>
            <span className="font-space font-bold text-[10px] bg-[#353439] text-[#c3f400] px-1 py-0.5 rounded">
              CMD+K
            </span>
          </button>

          {/* Interactive Bag Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-1.5 bg-[#ff4b89] hover:bg-[#e03975] text-[#590026] px-3 py-1.5 rounded shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all font-syne font-extrabold text-xs tracking-wider uppercase"
          >
            <span className="material-symbols-outlined text-sm">shopping_bag</span>
            <span>BAG [{cartCount}]</span>
          </button>

          {/* Orders / Profile Action Button */}
          <button
            onClick={onOpenProfile}
            className="hidden sm:flex items-center gap-1.5 bg-[#1f1f23] hover:bg-[#2a292e] text-[#e4e1e7] hover:text-[#c3f400] px-3 py-1.5 rounded border border-[#353439] transition-all font-space font-bold text-xs uppercase"
            title="View Order History & Profile"
          >
            <span className="material-symbols-outlined text-sm text-[#c3f400]">receipt_long</span>
            <span>ORDERS</span>
          </button>

          {/* Creator Watermark & Direct Contact Action Button */}
          <button
            onClick={() => {
              if (onOpenCreatorModal) {
                onOpenCreatorModal();
              } else {
                onNavigate('about');
                setTimeout(() => {
                  const el = document.getElementById('creator-watermark-station');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 150);
              }
            }}
            className="hidden md:flex items-center gap-1.5 bg-[#17161d] hover:bg-[#24232c] text-[#e4e1e7] hover:text-[#c3f400] border border-[#c3f400]/40 px-2.5 py-1.5 rounded font-space font-extrabold text-[11px] uppercase transition-all shadow-[2px_2px_0px_#000000]"
            title="Direct Contact & Trademark Watermark (Yasharth Dixit)"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#c3f400]" />
            <span>CREATOR</span>
          </button>

          {/* User Profile Avatar / Sign In */}
          {user ? (
            <button
              onClick={onOpenProfile}
              className="relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#c3f400] rounded-full transition-transform hover:scale-105"
              title={`Signed in as ${user.displayName || user.email}`}
            >
              <img 
                alt={user.displayName || 'Profile'} 
                className="w-8 h-8 rounded-full object-cover border-2 border-[#c3f400] shadow-[2px_2px_0px_#000000]" 
                src={user.photoURL || USER_AVATAR} 
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#c3f400] rounded-full border border-[#0e0e12]" />
            </button>
          ) : (
            <button
              onClick={onSignInGoogle}
              className="flex items-center gap-1.5 bg-white hover:bg-slate-100 text-[#0e0e12] px-2.5 py-1.5 rounded font-space font-extrabold text-xs uppercase shadow-[2px_2px_0px_#c3f400] transition-all"
              title="Sign in with Google (Firebase Auth)"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.15Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
                />
              </svg>
              <span className="hidden md:inline">SIGN IN</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Screen Selector Bar (for screens < xl) */}
      <div className="flex xl:hidden overflow-x-auto no-scrollbar bg-[#131317] border-b border-[#2a292e] px-4 py-2 gap-2">
        <button
          onClick={onOpenProfile}
          className="px-3 py-1 rounded text-xs uppercase font-space font-extrabold whitespace-nowrap bg-[#c3f400] text-[#161e00] flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-xs">receipt_long</span>
          <span>MY ORDERS</span>
        </button>
        <button
          onClick={() => onNavigate('home')}
          className={`px-3 py-1 rounded text-xs uppercase font-space font-bold whitespace-nowrap ${
            currentScreen === 'home' ? 'bg-[#c3f400] text-[#161e00]' : 'text-[#c4c9ac] hover:text-[#e4e1e7]'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => onNavigate('shop-drops')}
          className={`px-3 py-1 rounded text-xs uppercase font-space font-bold whitespace-nowrap ${
            currentScreen === 'shop-drops' ? 'bg-[#c3f400] text-[#161e00]' : 'text-[#c4c9ac] hover:text-[#e4e1e7]'
          }`}
        >
          Shop Drops
        </button>
        <button
          onClick={() => onNavigate('product-spotlight')}
          className={`px-3 py-1 rounded text-xs uppercase font-space font-bold whitespace-nowrap ${
            currentScreen === 'product-spotlight' ? 'bg-[#c3f400] text-[#161e00]' : 'text-[#c4c9ac] hover:text-[#e4e1e7]'
          }`}
        >
          Product Spotlight
        </button>
        <button
          onClick={() => onNavigate('x-club-community')}
          className={`px-3 py-1 rounded text-xs uppercase font-space font-bold whitespace-nowrap ${
            currentScreen === 'x-club-community' ? 'bg-[#c3f400] text-[#161e00]' : 'text-[#c4c9ac] hover:text-[#e4e1e7]'
          }`}
        >
          X-Club Community
        </button>
        <button
          onClick={() => onNavigate('taste-lab')}
          className={`px-3 py-1 rounded text-xs uppercase font-space font-bold whitespace-nowrap ${
            currentScreen === 'taste-lab' ? 'bg-[#c3f400] text-[#161e00]' : 'text-[#c4c9ac] hover:text-[#e4e1e7]'
          }`}
        >
          Taste Lab
        </button>
        <button
          onClick={() => onNavigate('about')}
          className={`px-3 py-1 rounded text-xs uppercase font-space font-bold whitespace-nowrap ${
            currentScreen === 'about' ? 'bg-[#c3f400] text-[#161e00]' : 'text-[#c4c9ac] hover:text-[#e4e1e7]'
          }`}
        >
          About
        </button>
        <button
          onClick={() => {
            if (onOpenCreatorModal) {
              onOpenCreatorModal();
            } else {
              onNavigate('about');
              setTimeout(() => {
                const el = document.getElementById('creator-watermark-station');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 150);
            }
          }}
          className="px-3 py-1 rounded text-xs uppercase font-space font-extrabold whitespace-nowrap bg-[#17161d] text-[#c3f400] border border-[#c3f400]/40 flex items-center gap-1"
        >
          <span>⚡ CREATOR</span>
        </button>
      </div>
    </header>
  );
};
