import React from 'react';
import { ScreenType, Product } from '../types';
import { HERO_PRODUCTS, HYPE_WALL_PRODUCTS, ALL_VAULT_PRODUCTS } from '../data/mockData';

interface HomeScreenProps {
  onNavigate: (screen: ScreenType, categoryFilter?: string) => void;
  onAddToCart: (product: Product, flavor?: string, size?: string) => void;
  onOpenQuiz: () => void;
  onOpenToast: (msg: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onAddToCart,
  onOpenQuiz,
  onOpenToast
}) => {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* ========================================================
          HERO SECTION
      ======================================================== */}
      <section className="relative w-full px-4 sm:px-8 py-12 lg:py-20 bg-[#0e0e12] overflow-hidden">
        {/* Ambient Glowing Aura Backdrops */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-[#c3f400]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -top-12 -right-12 w-[450px] h-[450px] bg-[#ff4b89]/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
          {/* Top Sticker Ribbon & Live Stock Indicator */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <div className="inline-flex items-center gap-2 bg-[#2a292e] px-4 py-1.5 rounded-full shadow-[3px_3px_0px_#000000]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#c3f400] animate-ping" />
              <span className="w-2 h-2 rounded-full bg-[#c3f400] -ml-3.5" />
              <span className="font-space font-bold text-xs text-[#c3f400] uppercase tracking-wider">
                BATCH #014 NOW LIVE
              </span>
            </div>
            <div className="inline-block bg-[#ff4b89] text-[#590026] px-4 py-1.5 rounded font-space font-bold text-xs uppercase rotate-[-2deg] shadow-[3px_3px_0px_#000000]">
              🔥 6 DROPS SOLD OUT IN &lt;48HRS
            </div>
            <div className="hidden sm:inline-block bg-[#353439] text-[#e4e1e7] px-4 py-1.5 rounded font-space font-bold text-xs uppercase rotate-[1.5deg] shadow-[3px_3px_0px_#000000]">
              ⚡ ZERO CHALK GUARANTEE
            </div>
          </div>

          {/* Main Brutalist Headline */}
          <h1 className="font-syne text-5xl sm:text-7xl lg:text-8xl uppercase text-[#e4e1e7] tracking-tighter max-w-5xl leading-[0.92] mb-6 font-extrabold">
            NOT YOUR DAD'S <br className="hidden sm:block" />
            <span className="relative inline-block text-[#161e00] bg-[#c3f400] px-4 sm:px-6 py-1 rotate-[-1deg] my-2 shadow-[6px_6px_0px_#ff4b89]">
              CHALKY PROTEIN.
            </span>
          </h1>

          <p className="font-space text-base sm:text-lg text-[#c4c9ac] max-w-2xl mx-auto mb-10 leading-relaxed">
            High-octane fuel re-engineered for the kinetic generation. 25g pure micro-filtered whey isolate, live DigeZyme® digestive matrix, and candy shop flavors that hit like pure serotonin.
          </p>

          {/* Hero Call-to-Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mb-16">
            <button
              onClick={() => onNavigate('shop-drops')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#c3f400] hover:bg-[#abd600] text-[#161e00] font-syne font-extrabold text-sm uppercase px-8 py-4 rounded shadow-[5px_5px_0px_#ff4b89] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0px_#ff4b89] active:translate-x-1 active:translate-y-1 transition-all"
            >
              <span>EXPLORE THE DROP</span>
              <span className="material-symbols-outlined font-black text-lg">bolt</span>
            </button>
            <button
              onClick={onOpenQuiz}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2a292e] hover:bg-[#353439] text-[#e4e1e7] font-syne font-extrabold text-sm uppercase px-7 py-4 rounded shadow-[5px_5px_0px_#c3f400] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0px_#c3f400] active:translate-x-1 active:translate-y-1 transition-all"
            >
              <span className="material-symbols-outlined text-[#ffb1c3] text-lg">science</span>
              <span>FLAVOR QUIZ</span>
            </button>
          </div>

          {/* Hero Product Explosive Visual Showcase Mosaic */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 relative mt-4">
            {/* Flavor Card 1: Sour Watermelon */}
            <div className="relative bg-[#1b1b1f] rounded-xl p-6 flex flex-col items-center justify-between text-left group overflow-hidden border border-[#2a292e] shadow-[6px_6px_0px_#000000] hover:bg-[#1f1f23] transition-all">
              <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#ff4b89]/20 rounded-full blur-2xl pointer-events-none" />
              <div className="w-full flex justify-between items-start z-10">
                <span className="bg-[#ff4b89] text-[#590026] font-space font-bold text-xs px-2.5 py-1 rounded-full uppercase">
                  NEW DROP
                </span>
                <span className="font-syne text-xl font-bold text-[#e4e1e7]">$44.99</span>
              </div>
              <div className="relative w-full h-64 my-4 flex items-center justify-center cursor-pointer" onClick={() => onNavigate('product-spotlight')}>
                <img
                  className="w-56 h-56 object-contain drop-shadow-[0_15px_30px_rgba(255,75,137,0.35)] group-hover:scale-105 transition-transform duration-300"
                  src={HERO_PRODUCTS[0].image}
                  alt={HERO_PRODUCTS[0].alt}
                />
              </div>
              <div className="w-full z-10">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="bg-[#353439] text-[#c3f400] px-2 py-0.5 font-space font-bold text-[10px] rounded">
                    25G ISOLATE
                  </span>
                  <span className="bg-[#353439] text-[#c4c9ac] px-2 py-0.5 font-space font-bold text-[10px] rounded">
                    0G SUGAR
                  </span>
                </div>
                <h3 className="font-syne text-xl font-extrabold uppercase text-[#e4e1e7] group-hover:text-[#c3f400] transition-colors">
                  SOUR WATERMELON CRUSH
                </h3>
                <p className="font-space text-xs text-[#c4c9ac] mt-1">
                  Tart jolly rancher vibes without the insulin crash.
                </p>
                <button
                  onClick={() => onAddToCart(ALL_VAULT_PRODUCTS[0], 'Sour Watermelon Crush', '2.2 lbs')}
                  className="w-full mt-3 py-2 bg-[#2a292e] hover:bg-[#c3f400] hover:text-[#161e00] text-[#e4e1e7] font-syne font-bold text-xs uppercase rounded transition-colors flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                  ADD TO BAG
                </button>
              </div>
            </div>

            {/* Flavor Card 2: Electric Matcha Mochi (Hero Centerpiece) */}
            <div className="relative bg-[#1f1f23] rounded-xl p-6 flex flex-col items-center justify-between text-left group overflow-hidden border-2 border-[#c3f400] shadow-[8px_8px_0px_#c3f400] md:-translate-y-4">
              <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#c3f400]/25 rounded-full blur-3xl pointer-events-none" />
              <div className="w-full flex justify-between items-start z-10">
                <div className="flex items-center gap-1.5">
                  <span className="bg-[#c3f400] text-[#161e00] font-space font-bold text-xs px-2.5 py-1 rounded-full uppercase">
                    VIRAL #1 PICK
                  </span>
                  <span className="bg-[#353439] text-[#e4e1e7] font-space font-bold text-xs px-2.5 py-1 rounded-full uppercase">
                    RESTOCKED
                  </span>
                </div>
                <span className="font-syne text-2xl font-extrabold text-[#c3f400]">$46.99</span>
              </div>
              <div className="relative w-full h-72 my-4 flex items-center justify-center cursor-pointer" onClick={() => onNavigate('product-spotlight')}>
                <img
                  className="w-64 h-64 object-contain drop-shadow-[0_20px_40px_rgba(195,244,0,0.35)] group-hover:scale-105 transition-transform duration-300"
                  src={HERO_PRODUCTS[1].image}
                  alt={HERO_PRODUCTS[1].alt}
                />
              </div>
              <div className="w-full z-10">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="bg-[#353439] text-[#c3f400] px-2 py-0.5 font-space font-bold text-[10px] rounded">
                    CEREMONIAL MATCHA
                  </span>
                  <span className="bg-[#353439] text-[#c4c9ac] px-2 py-0.5 font-space font-bold text-[10px] rounded">
                    110 KCAL
                  </span>
                </div>
                <h3 className="font-syne text-2xl font-extrabold uppercase text-[#e4e1e7] group-hover:text-[#c3f400] transition-colors">
                  ELECTRIC MATCHA MOCHI
                </h3>
                <p className="font-space text-xs text-[#c4c9ac] mt-1">
                  Infused with Uji green tea and sweet mochi cream undertones.
                </p>
                <button
                  onClick={() => onAddToCart(ALL_VAULT_PRODUCTS[0], 'Electric Mochi Matcha', '2.2 lbs')}
                  className="w-full mt-3 py-2.5 bg-[#c3f400] hover:bg-[#abd600] text-[#161e00] font-syne font-extrabold text-xs uppercase rounded shadow-[3px_3px_0px_#ff4b89] transition-all flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm font-bold">bolt</span>
                  QUICK COP • $46.99
                </button>
              </div>
            </div>

            {/* Flavor Card 3: Cinnamon Roll Drip */}
            <div className="relative bg-[#1b1b1f] rounded-xl p-6 flex flex-col items-center justify-between text-left group overflow-hidden border border-[#2a292e] shadow-[6px_6px_0px_#000000] hover:bg-[#1f1f23] transition-all">
              <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#39393d]/20 rounded-full blur-2xl pointer-events-none" />
              <div className="w-full flex justify-between items-start z-10">
                <span className="bg-[#353439] text-[#e4e1e7] font-space font-bold text-xs px-2.5 py-1 rounded-full uppercase">
                  BAKERY SPEC
                </span>
                <span className="font-syne text-xl font-bold text-[#e4e1e7]">$44.99</span>
              </div>
              <div className="relative w-full h-64 my-4 flex items-center justify-center cursor-pointer" onClick={() => onNavigate('product-spotlight')}>
                <img
                  className="w-56 h-56 object-contain drop-shadow-[0_15px_30px_rgba(255,255,255,0.15)] group-hover:scale-105 transition-transform duration-300"
                  src={HERO_PRODUCTS[2].image}
                  alt={HERO_PRODUCTS[2].alt}
                />
              </div>
              <div className="w-full z-10">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="bg-[#353439] text-[#c3f400] px-2 py-0.5 font-space font-bold text-[10px] rounded">
                    BREAD PUDDING TEXTURE
                  </span>
                  <span className="bg-[#353439] text-[#c4c9ac] px-2 py-0.5 font-space font-bold text-[10px] rounded">
                    NATURAL STEVIA
                  </span>
                </div>
                <h3 className="font-syne text-xl font-extrabold uppercase text-[#e4e1e7] group-hover:text-[#c3f400] transition-colors">
                  CINNAMON ROLL DRIP
                </h3>
                <p className="font-space text-xs text-[#c4c9ac] mt-1">
                  Warm bakery cinnamon glaze with zero synthetic aftertaste.
                </p>
                <button
                  onClick={() => onAddToCart(ALL_VAULT_PRODUCTS[0], 'Cinnamon Roll Drip', '2.2 lbs')}
                  className="w-full mt-3 py-2 bg-[#2a292e] hover:bg-[#c3f400] hover:text-[#161e00] text-[#e4e1e7] font-syne font-bold text-xs uppercase rounded transition-colors flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                  ADD TO BAG
                </button>
              </div>
            </div>
          </div>

          {/* Trust Badges & Micro Metrics */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 bg-[#1b1b1f]/60 border border-[#2a292e] rounded-xl p-4">
            <div className="flex flex-col items-center justify-center text-center p-2">
              <span className="font-syne text-3xl sm:text-4xl font-extrabold text-[#c3f400]">4.92★</span>
              <span className="font-space font-bold text-xs text-[#c4c9ac] uppercase mt-1">
                12,400+ VERIFIED REVIEWS
              </span>
            </div>
            <div className="flex flex-col items-center justify-center text-center p-2">
              <span className="font-syne text-3xl sm:text-4xl font-extrabold text-[#ff4b89]">100%</span>
              <span className="font-space font-bold text-xs text-[#c4c9ac] uppercase mt-1">
                INFORMED-CHOICE SPORT
              </span>
            </div>
            <div className="flex flex-col items-center justify-center text-center p-2">
              <span className="font-syne text-3xl sm:text-4xl font-extrabold text-[#e4e1e7]">0.0G</span>
              <span className="font-space font-bold text-xs text-[#c4c9ac] uppercase mt-1">
                ADDED SUGAR OR FILLERS
              </span>
            </div>
            <div className="flex flex-col items-center justify-center text-center p-2">
              <span className="font-syne text-3xl sm:text-4xl font-extrabold text-[#c3f400]">0 BLOAT</span>
              <span className="font-space font-bold text-xs text-[#c4c9ac] uppercase mt-1">
                CLINICAL ENZYME SYSTEM
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          KINETIC SLANTED TICKER STRIP
      ======================================================== */}
      <div className="w-full bg-[#ff4b89] text-[#590026] py-3 overflow-hidden rotate-[-1deg] scale-105 my-8 shadow-[0_4px_12px_rgba(0,0,0,0.5)] select-none">
        <div className="animate-marquee whitespace-nowrap font-syne text-sm sm:text-base uppercase font-extrabold flex items-center">
          <span className="mx-6">💥 ZERO ARTIFICIAL SWEETENERS</span>
          <span className="mx-6">⚡ BIO-AVAILABLE 25G WHEY PEPTIDES</span>
          <span className="mx-6">👾 STREETWEAR DROP MODEL</span>
          <span className="mx-6">🔥 THIRD-PARTY HEAVY METAL TESTED</span>
          <span className="mx-6">🧪 SOUR CANDY LAB FORMULATED</span>
          <span className="mx-6">💥 ZERO ARTIFICIAL SWEETENERS</span>
          <span className="mx-6">⚡ BIO-AVAILABLE 25G WHEY PEPTIDES</span>
          <span className="mx-6">👾 STREETWEAR DROP MODEL</span>
        </div>
      </div>

      {/* ========================================================
          CATEGORY HYPER-RAIL: CHOOSE YOUR WEAPON
      ======================================================== */}
      <section className="w-full px-4 sm:px-8 py-16 bg-[#0e0e12]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-block px-2.5 py-1 bg-[#353439] text-[#c3f400] font-space font-bold text-xs rounded uppercase mb-2">
                Engineered By Category
              </div>
              <h2 className="font-syne text-3xl sm:text-4xl font-extrabold uppercase text-[#e4e1e7]">
                CHOOSE YOUR WEAPON.
              </h2>
            </div>
            <p className="font-space text-sm text-[#c4c9ac] max-w-md">
              Every formula is dialed for hyper-specific metabolic output. No redundant proprietary blends or caffeine heart-palpitations.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Cat 1 */}
            <div
              onClick={() => onNavigate('shop-drops', 'whey-isolate')}
              className="group relative bg-[#1b1b1f] rounded-xl p-6 overflow-hidden border border-[#2a292e] shadow-[4px_4px_0px_#000000] hover:bg-[#1f1f23] hover:-translate-y-1 transition-all cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg bg-[#c3f400] text-[#161e00] flex items-center justify-center font-bold mb-6 shadow-[3px_3px_0px_#000000]">
                <span className="material-symbols-outlined text-2xl">water_drop</span>
              </div>
              <span className="font-space font-bold text-xs text-[#c3f400] uppercase">SERIES 01</span>
              <h3 className="font-syne text-xl font-bold uppercase text-[#e4e1e7] mt-1 mb-2">
                HYDRO ISOLATE
              </h3>
              <p className="font-space text-xs text-[#c4c9ac] mb-4">
                Cross-flow micro-filtered whey that mixes clear like juice. Zero milk sludge.
              </p>
              <div className="flex items-center text-[#c3f400] font-space font-bold text-xs uppercase gap-1 group-hover:gap-2 transition-all">
                <span>VIEW 6 FLAVORS</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>

            {/* Cat 2 */}
            <div
              onClick={() => onNavigate('shop-drops', 'pre-workout')}
              className="group relative bg-[#1b1b1f] rounded-xl p-6 overflow-hidden border border-[#2a292e] shadow-[4px_4px_0px_#000000] hover:bg-[#1f1f23] hover:-translate-y-1 transition-all cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg bg-[#ff4b89] text-[#590026] flex items-center justify-center font-bold mb-6 shadow-[3px_3px_0px_#000000]">
                <span className="material-symbols-outlined text-2xl">flash_on</span>
              </div>
              <span className="font-space font-bold text-xs text-[#ffb1c3] uppercase">SERIES 02</span>
              <h3 className="font-syne text-xl font-bold uppercase text-[#e4e1e7] mt-1 mb-2">
                ALL-OUT PRE-WORKOUT
              </h3>
              <p className="font-space text-xs text-[#c4c9ac] mb-4">
                6000mg L-Citrulline, Alpha-GPC and clean caffeine. Laser focus, zero crash.
              </p>
              <div className="flex items-center text-[#ffb1c3] uppercase font-space font-bold text-xs gap-1 group-hover:gap-2 transition-all">
                <span>EXPLORE PUMPS</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>

            {/* Cat 3 */}
            <div
              onClick={() => onNavigate('shop-drops', 'creatine')}
              className="group relative bg-[#1b1b1f] rounded-xl p-6 overflow-hidden border border-[#2a292e] shadow-[4px_4px_0px_#000000] hover:bg-[#1f1f23] hover:-translate-y-1 transition-all cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg bg-[#353439] text-[#e4e1e7] flex items-center justify-center font-bold mb-6 shadow-[3px_3px_0px_#000000]">
                <span className="material-symbols-outlined text-2xl">cookie</span>
              </div>
              <span className="font-space font-bold text-xs text-[#c4c9ac] uppercase">SERIES 03</span>
              <h3 className="font-syne text-xl font-bold uppercase text-[#e4e1e7] mt-1 mb-2">
                CREATINE GUMMIES
              </h3>
              <p className="font-space text-xs text-[#c4c9ac] mb-4">
                5g pure Creapure® per serving in mouth-puckering sour peach rings.
              </p>
              <div className="flex items-center text-[#e4e1e7] font-space font-bold text-xs uppercase gap-1 group-hover:gap-2 transition-all">
                <span>GET CHEWS</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>

            {/* Cat 4 */}
            <div
              onClick={() => onNavigate('shop-drops', 'hydration')}
              className="group relative bg-[#1b1b1f] rounded-xl p-6 overflow-hidden border border-[#2a292e] shadow-[4px_4px_0px_#000000] hover:bg-[#1f1f23] hover:-translate-y-1 transition-all cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg bg-[#39393d] text-[#c3f400] flex items-center justify-center font-bold mb-6 shadow-[3px_3px_0px_#000000]">
                <span className="material-symbols-outlined text-2xl">vital_signs</span>
              </div>
              <span className="font-space font-bold text-xs text-[#c3f400] uppercase">SERIES 04</span>
              <h3 className="font-syne text-xl font-bold uppercase text-[#e4e1e7] mt-1 mb-2">
                ELECTROLYTE FIZZ
              </h3>
              <p className="font-space text-xs text-[#c4c9ac] mb-4">
                Pink Himalayan salt, magnesium bisglycinate, zero maltodextrin trash.
              </p>
              <div className="flex items-center text-[#c3f400] font-space font-bold text-xs uppercase gap-1 group-hover:gap-2 transition-all">
                <span>DISCOVER HYDRATION</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          THE HYPE WALL: 4 TOP SELLERS
      ======================================================== */}
      <section className="w-full px-4 sm:px-8 py-16 bg-[#1b1b1f] border-y border-[#2a292e]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <span className="bg-[#c3f400] text-[#161e00] font-space font-bold text-xs px-2.5 py-1 uppercase rounded">
                LIVE DEMAND
              </span>
              <h2 className="font-syne text-3xl sm:text-4xl font-extrabold uppercase text-[#e4e1e7] mt-1">
                THE HYPE WALL
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#ff4b89] animate-pulse" />
              <span className="font-space font-bold text-xs text-[#c4c9ac] uppercase">
                CURRENTLY 148 PEOPLE VIEWING
              </span>
            </div>
          </div>

          {/* 4 Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HYPE_WALL_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="bg-[#1f1f23] rounded-xl p-4 flex flex-col justify-between border border-[#2a292e] shadow-[5px_5px_0px_#000000] relative group hover:border-[#c3f400] transition-colors"
              >
                {prod.tag && (
                  <div
                    className={`absolute top-4 left-4 z-10 ${
                      prod.tagColor === 'secondary'
                        ? 'bg-[#ff4b89] text-[#590026]'
                        : prod.tagColor === 'neutral'
                        ? 'bg-[#353439] text-[#c3f400]'
                        : 'bg-[#c3f400] text-[#161e00]'
                    } font-space font-bold text-[10px] px-2 py-0.5 rounded shadow-[1px_1px_0px_#000000]`}
                    style={{ transform: `rotate(${prod.tagRotate || '0deg'})` }}
                  >
                    {prod.tag}
                  </div>
                )}

                <div 
                  className="relative w-full h-56 bg-[#0e0e12] rounded-lg p-4 flex items-center justify-center overflow-hidden mb-4 cursor-pointer"
                  onClick={() => onNavigate('product-spotlight')}
                >
                  <img
                    className="w-44 h-44 object-contain group-hover:scale-105 transition-transform duration-300"
                    src={prod.image}
                    alt={prod.alt}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-space font-bold text-xs text-[#ffb1c3]">
                      {prod.series}
                    </span>
                    <span className="font-syne font-bold text-base text-[#e4e1e7]">
                      ${prod.price.toFixed(2)}
                    </span>
                  </div>
                  <h4 className="font-syne font-bold text-sm uppercase text-[#e4e1e7] line-clamp-1 group-hover:text-[#c3f400] transition-colors">
                    {prod.name}
                  </h4>

                  <div className="flex items-center gap-1.5 mt-1.5 mb-4">
                    {prod.protein && (
                      <span className="bg-[#353439] px-2 py-0.5 rounded text-[#c4c9ac] font-space font-bold text-[10px]">
                        {prod.protein}
                      </span>
                    )}
                    {prod.cals && (
                      <span className="bg-[#353439] px-2 py-0.5 rounded text-[#c4c9ac] font-space font-bold text-[10px]">
                        {prod.cals}
                      </span>
                    )}
                    {prod.caffeine && (
                      <span className="bg-[#353439] px-2 py-0.5 rounded text-[#c4c9ac] font-space font-bold text-[10px]">
                        {prod.caffeine}
                      </span>
                    )}
                    {prod.citrulline && (
                      <span className="bg-[#353439] px-2 py-0.5 rounded text-[#c4c9ac] font-space font-bold text-[10px]">
                        {prod.citrulline}
                      </span>
                    )}
                    {prod.creapure && (
                      <span className="bg-[#353439] px-2 py-0.5 rounded text-[#c4c9ac] font-space font-bold text-[10px]">
                        {prod.creapure}
                      </span>
                    )}
                    {prod.specBadge && (
                      <span className="bg-[#353439] px-2 py-0.5 rounded text-[#c4c9ac] font-space font-bold text-[10px]">
                        {prod.specBadge}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => onAddToCart(prod)}
                  className="w-full py-2.5 bg-[#353439] hover:bg-[#c3f400] hover:text-[#161e00] text-[#e4e1e7] font-syne font-extrabold text-xs uppercase rounded flex items-center justify-center gap-1.5 shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  type="button"
                >
                  <span>ADD TO BAG</span>
                  <span className="material-symbols-outlined text-sm font-bold">add_shopping_cart</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          BRUTALIST COMPARISON GRID: PROTEIN X vs THE BOOMERS
      ======================================================== */}
      <section className="w-full px-4 sm:px-8 py-16 bg-[#0e0e12]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="px-2.5 py-1 bg-[#ff4b89] text-[#590026] font-space font-bold text-xs uppercase rounded">
              NO CAP COMPARISON
            </span>
            <h2 className="font-syne text-3xl sm:text-4xl font-extrabold uppercase text-[#e4e1e7] mt-2 mb-2">
              WHY GEN-Z CANCELS TRADITIONAL POWDER
            </h2>
            <p className="font-space text-sm text-[#c4c9ac]">
              We benchmarked against the 5 leading legacy brands. The results are frankly embarrassing for them.
            </p>
          </div>

          {/* Matrix Comparison Table */}
          <div className="w-full overflow-x-auto no-scrollbar">
            <div className="min-w-[680px] bg-[#1b1b1f] rounded-xl p-6 border border-[#2a292e] shadow-[6px_6px_0px_#000000]">
              {/* Table Header */}
              <div className="grid grid-cols-12 pb-4 border-b-2 border-[#353439] font-syne text-sm uppercase text-[#e4e1e7] font-bold">
                <div className="col-span-4 text-[#c4c9ac]">ATTRIBUTE</div>
                <div className="col-span-4 text-[#c3f400] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#c3f400] rounded-full" />
                  <span>PROTEIN X FORMULA</span>
                </div>
                <div className="col-span-4 text-[#c4c9ac]/60 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#353439] rounded-full" />
                  <span>OLD-SCHOOL PHARMACY BRANDS</span>
                </div>
              </div>

              {/* Rows */}
              {[
                {
                  attribute: 'TASTE & FLAVOR PROFILE',
                  us: 'Sour Candy & Bakery-grade authentic extracts',
                  them: 'Bland, gritty chalk + chemical sucralose bomb'
                },
                {
                  attribute: 'MIXABILITY (3 SHAKES)',
                  us: 'Instant water-clear dissolution, zero clumps',
                  them: 'Sludgy clumps stuck to your shaker grate'
                },
                {
                  attribute: 'GUT DIGESTIBILITY',
                  us: 'DigeZyme® multi-enzyme complex = ZERO bloat',
                  them: 'Lactose belly, gas & post-lift sluggishness'
                },
                {
                  attribute: 'LABEL INTEGRITY',
                  us: '100% Transparent batch-scannable QR testing',
                  them: 'Amino-spiking & hidden proprietary blends'
                },
                {
                  attribute: 'GYM BAG AESTHETIC',
                  us: 'Looks like high-fashion street culture collectible',
                  them: 'Generic black tub from a sterile drugstore aisle'
                }
              ].map((row, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-12 py-4 items-center ${
                    idx < 4 ? 'border-b border-[#2a292e]' : ''
                  }`}
                >
                  <div className="col-span-4 font-syne text-xs uppercase font-bold text-[#e4e1e7]">
                    {row.attribute}
                  </div>
                  <div className="col-span-4 flex items-center gap-2 text-[#c3f400] font-space text-xs font-bold">
                    <span className="material-symbols-outlined text-[#c3f400] text-base">check_circle</span>
                    <span>{row.us}</span>
                  </div>
                  <div className="col-span-4 flex items-center gap-2 text-[#c4c9ac]/70 font-space text-xs">
                    <span className="material-symbols-outlined text-[#ffb4ab] text-base">cancel</span>
                    <span>{row.them}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          VIRAL COMMUNITY FEED / TIKTOK CULTURE
      ======================================================== */}
      <section className="w-full px-4 sm:px-8 py-16 bg-[#0e0e12]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="bg-[#c3f400] text-[#161e00] font-space font-bold text-xs px-2.5 py-1 uppercase rounded">
                VIRAL ON FEED
              </span>
              <h2 className="font-syne text-3xl sm:text-4xl font-extrabold uppercase text-[#e4e1e7] mt-1">
                #PROTEINX DROP REVIEWS
              </h2>
            </div>
            <button
              onClick={() => onOpenToast('Redirecting to TikTok @proteinx feed...')}
              className="inline-flex items-center gap-2 bg-[#2a292e] hover:bg-[#353439] px-4 py-2 rounded text-[#e4e1e7] font-space font-bold text-xs uppercase transition-colors shadow-[3px_3px_0px_#000000]"
            >
              <span>JOIN 45,000+ ON TIKTOK</span>
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </button>
          </div>

          {/* Masonry Grid of Creators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="relative bg-[#1b1b1f] rounded-xl overflow-hidden shadow-[5px_5px_0px_#000000] border border-[#2a292e] group">
              <div className="h-80 w-full relative overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJfIEwClu_4K5TL6_Jvj_u0kyDpVzz-gNdovdTmOljOUyggVq0d0-SwmYwx76IcGtJMda_irHis8SpcTtO8lyT_QnfenjrrDxw51IC2b3thfZORddnsH20fqj5W55VKBwaQNCwae0m6_ctMkpo2tVjgWegGTZww5FcIgDs-qLLwfqfibFXoa7dYzxDXfn5XdbgBCqZwKD32i1CNM2w48TW7nqiJ4pywsoSv9aIAr9D0d754m2lXUAO"
                  alt="Influencer Maya holding shaker bottle"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-transparent to-transparent" />
                <div className="absolute top-3 left-3 bg-[#ff4b89] text-[#590026] px-2 py-0.5 rounded font-space font-bold text-xs">
                  2.4M VIEWS
                </div>
              </div>
              <div className="p-4 -mt-8 relative z-10">
                <div className="flex items-center gap-1.5 text-[#c3f400] mb-1 font-space font-bold text-xs">
                  <span className="material-symbols-outlined text-sm">music_note</span>
                  <span className="truncate">original sound - @maya.lifts</span>
                </div>
                <p className="font-space text-xs text-[#e4e1e7] font-semibold">
                  "Literally taste tested blindfolded. Thought it was watermelon jolly rancher 😭"
                </p>
                <span className="block mt-1 text-[#c4c9ac] font-space text-[11px]">
                  @maya.lifts • 340K followers
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative bg-[#1b1b1f] rounded-xl overflow-hidden shadow-[5px_5px_0px_#000000] border border-[#2a292e] group">
              <div className="h-80 w-full relative overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0GxfdwEXZazusJJxJKilGrbLqofaR63EilISh1kHh1n3OLKPbpAim1jZwzUU6XsAOl3e22JbKYHLgAO3Rhh1eY39eZwLjV1hp4VZH6dYoOOpicUPPNYuItUTZaYWzS3jiTJhaQlVIlT5qfyskoMF3KZNQZKWn4qcZ5wx9xKYiZJ17UYaq6k__-JH8PedhtPF1RzZoTUN8Prdrto6tFpSn4dxguM5ELq3Gxv_Y2WDvRfE4k7AqoHwW"
                  alt="Zack unboxing Protein X package"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-transparent to-transparent" />
                <div className="absolute top-3 left-3 bg-[#c3f400] text-[#161e00] px-2 py-0.5 rounded font-space font-bold text-xs">
                  1.8M VIEWS
                </div>
              </div>
              <div className="p-4 -mt-8 relative z-10">
                <div className="flex items-center gap-1.5 text-[#c3f400] mb-1 font-space font-bold text-xs">
                  <span className="material-symbols-outlined text-sm">music_note</span>
                  <span className="truncate">phonk drift - Kordhell</span>
                </div>
                <p className="font-space text-xs text-[#e4e1e7] font-semibold">
                  "No post-shake bloating for the first time in 4 years of lifting heavy."
                </p>
                <span className="block mt-1 text-[#c4c9ac] font-space text-[11px]">
                  @zack_iron • 620K followers
                </span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative bg-[#1b1b1f] rounded-xl overflow-hidden shadow-[5px_5px_0px_#000000] border border-[#2a292e] group">
              <div className="h-80 w-full relative overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAliOw97-kvm7ivnOz8BfpKAcBJU3_nuCC0bwXq61dpmohJkgKDQX8qx8cSsT4TtEOKKZKZcAMJ8rD14Fg2EbBrVpxxGZWYIYPnhdBMsP28R2a4wooGER1-Lrwo5zidtx6UfXsrbuLHHsBWL7yJ9N5PO_neGyQ5Q3oOCwwyzn6SzeEMDHrmM0WQD_9x641KoSEi0msg_UltemLJZpkfnoy9DHxkuQ8UxrVkcIkep2GAwGdT0FtRJ62B"
                  alt="Matcha shake macro swirl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-transparent to-transparent" />
                <div className="absolute top-3 left-3 bg-[#353439] text-[#e4e1e7] px-2 py-0.5 rounded font-space font-bold text-xs">
                  890K VIEWS
                </div>
              </div>
              <div className="p-4 -mt-8 relative z-10">
                <div className="flex items-center gap-1.5 text-[#c3f400] mb-1 font-space font-bold text-xs">
                  <span className="material-symbols-outlined text-sm">music_note</span>
                  <span className="truncate">lo-fi matcha beats - chillguy</span>
                </div>
                <p className="font-space text-xs text-[#e4e1e7] font-semibold">
                  "Matcha mochi flavor with oat milk = better than my $9 cafe order."
                </p>
                <span className="block mt-1 text-[#c4c9ac] font-space text-[11px]">
                  @chloe_wellness • 190K followers
                </span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="relative bg-[#1b1b1f] rounded-xl overflow-hidden shadow-[5px_5px_0px_#000000] border border-[#2a292e] group">
              <div className="h-80 w-full relative overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3Zjh9bHzVaK-XhCzsHHKfjY_uh2ZjGi38xCYlVknXBKYLW3SUZaIXg19JM9QpERgxZqiIaInufiAMvcx9xR2YCK8QW6k87SA6kM5GCpSaPYZydx7DB3_62qj_bAjEARM3xDYiUCT-_gAL8BpTZFcbY3Elq1FbhBeUZyiErwHL5PQNT7mpagElZtPeVnBDUMjC5kMIIItigBMjxEliSb5tIOnPOCtoCUlcaTC0hh6vyFR2_gQlIBAJ"
                  alt="Athletic twins high fiving"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-transparent to-transparent" />
                <div className="absolute top-3 left-3 bg-[#ff4b89] text-[#590026] px-2 py-0.5 rounded font-space font-bold text-xs">
                  3.1M VIEWS
                </div>
              </div>
              <div className="p-4 -mt-8 relative z-10">
                <div className="flex items-center gap-1.5 text-[#c3f400] mb-1 font-space font-bold text-xs">
                  <span className="material-symbols-outlined text-sm">music_note</span>
                  <span className="truncate">BRAZILIAN PHONK - slow + reverb</span>
                </div>
                <p className="font-space text-xs text-[#e4e1e7] font-semibold">
                  "When the All-Out Pre hits right at 5:30 PM. PR was guaranteed."
                </p>
                <span className="block mt-1 text-[#c4c9ac] font-space text-[11px]">
                  @kinetic_twins • 880K followers
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          INTERACTIVE 60-SEC QUIZ CARD & PREVIEW
      ======================================================== */}
      <section className="w-full px-4 sm:px-8 py-16 bg-[#0e0e12]" id="quiz">
        <div className="max-w-7xl mx-auto w-full">
          <div className="relative bg-[#1f1f23] rounded-2xl p-6 sm:p-10 lg:p-12 overflow-hidden shadow-[8px_8px_0px_#c3f400] border-2 border-[#c3f400]">
            {/* Background Flares */}
            <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-[#c3f400]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -top-20 w-80 h-80 bg-[#ff4b89]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-1.5 bg-[#353439] px-3 py-1 rounded-full mb-4">
                  <span className="material-symbols-outlined text-[#c3f400] text-sm">psychology</span>
                  <span className="font-space font-bold text-xs text-[#c3f400] uppercase">
                    60-SECOND FORMULA ENGINE
                  </span>
                </div>
                <h2 className="font-syne text-2xl sm:text-4xl font-extrabold uppercase text-[#e4e1e7] mb-2 leading-tight">
                  DON’T GUESS YOUR FLAVOR PROFILE. <br />
                  <span className="text-[#c3f400]">LET OUR LAB DIAL IT IN.</span>
                </h2>
                <p className="font-space text-sm sm:text-base text-[#c4c9ac] mb-6 max-w-xl">
                  Answer 4 rapid questions about your workout split, sweet vs sour tolerance, and stomach sensitivity to get your personalized stack + unlock an instant 15% discount code.
                </p>

                {/* 3 Step Visual Preview */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
                  <div className="bg-[#2a292e] p-3 rounded shadow-[2px_2px_0px_#000000]">
                    <span className="font-space font-bold text-xs text-[#ffb1c3] uppercase block mb-0.5">
                      STEP 01
                    </span>
                    <span className="font-space text-sm text-[#e4e1e7] font-bold">Pick Your Split</span>
                  </div>
                  <div className="bg-[#2a292e] p-3 rounded shadow-[2px_2px_0px_#000000]">
                    <span className="font-space font-bold text-xs text-[#c3f400] uppercase block mb-0.5">
                      STEP 02
                    </span>
                    <span className="font-space text-sm text-[#e4e1e7] font-bold">Flavor Archetype</span>
                  </div>
                  <div className="bg-[#2a292e] p-3 rounded shadow-[2px_2px_0px_#000000]">
                    <span className="font-space font-bold text-xs text-[#c4c9ac] uppercase block mb-0.5">
                      STEP 03
                    </span>
                    <span className="font-space text-sm text-[#e4e1e7] font-bold">Digestive Target</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <button
                    onClick={onOpenQuiz}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#c3f400] hover:bg-[#abd600] text-[#161e00] font-syne font-extrabold text-sm uppercase rounded shadow-[4px_4px_0px_#ff4b89] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#ff4b89] active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2"
                  >
                    <span>START 60S TASTE QUIZ</span>
                    <span className="material-symbols-outlined font-black">arrow_forward</span>
                  </button>
                  <span className="font-space text-xs text-[#c4c9ac]">
                    Takes &lt; 1 minute • 15% voucher included
                  </span>
                </div>
              </div>

              {/* Stack Preview Panel */}
              <div className="lg:col-span-5 bg-[#0e0e12] p-6 rounded-xl border border-[#2a292e] shadow-[5px_5px_0px_#000000]">
                <div className="flex items-center justify-between border-b border-[#353439] pb-3 mb-4">
                  <span className="font-syne font-bold text-sm text-[#e4e1e7] uppercase">
                    RECOMMENDED STACK
                  </span>
                  <span className="bg-[#c3f400] text-[#161e00] px-2 py-0.5 font-space font-bold text-[10px] rounded">
                    PREVIEW
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between bg-[#2a292e] p-2.5 rounded">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#ffb1c3] text-base">check_circle</span>
                      <span className="font-space text-xs text-[#e4e1e7]">Sour Watermelon Crush Hydro Isolate</span>
                    </div>
                    <span className="font-space font-bold text-[11px] text-[#c3f400]">MATCH 98%</span>
                  </div>

                  <div className="flex items-center justify-between bg-[#2a292e] p-2.5 rounded">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#ffb1c3] text-base">check_circle</span>
                      <span className="font-space text-xs text-[#e4e1e7]">Electrolyte Fizz Pink Lemonade</span>
                    </div>
                    <span className="font-space font-bold text-[11px] text-[#c3f400]">MATCH 94%</span>
                  </div>

                  <div className="flex items-center justify-between bg-[#2a292e] p-2.5 rounded">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#ffb1c3] text-base">check_circle</span>
                      <span className="font-space text-xs text-[#e4e1e7]">Sour Peach Ring Creatine Gummies</span>
                    </div>
                    <span className="font-space font-bold text-[11px] text-[#c3f400]">MATCH 99%</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#353439] flex items-center justify-between">
                  <div>
                    <span className="font-space font-bold text-[10px] text-[#c4c9ac] uppercase block">
                      STACK SAVINGS
                    </span>
                    <span className="font-syne font-extrabold text-sm text-[#c3f400]">
                      SAVE $22.50 BUNDLE
                    </span>
                  </div>
                  <span className="font-space font-bold text-[11px] bg-[#353439] text-[#e4e1e7] px-2.5 py-1 rounded uppercase">
                    FREE SHAKER INCLUDED
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
