import React, { useState } from 'react';
import { ScreenType, Product } from '../types';
import { PDP_THUMBNAILS, PDP_FLAVORS, PDP_REVIEWS, ALL_VAULT_PRODUCTS } from '../data/mockData';

interface ProductSpotlightScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onAddToCart: (product: Product, flavor?: string, size?: string, isSub?: boolean, customPrice?: number) => void;
  onOpenToast: (msg: string) => void;
}

export const ProductSpotlightScreen: React.FC<ProductSpotlightScreenProps> = ({
  onNavigate,
  onAddToCart,
  onOpenToast
}) => {
  const [selectedThumb, setSelectedThumb] = useState(0);
  const [activeFlavor, setActiveFlavor] = useState(PDP_FLAVORS[0]);
  const [sizeWeight, setSizeWeight] = useState<'2.2' | '5.0'>('2.2');
  const [isSubscription, setIsSubscription] = useState(true);
  const [qty, setQty] = useState(1);
  const [reviewFilter, setReviewFilter] = useState('all');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showWriteReview, setShowWriteReview] = useState(false);

  // Dynamic price calculation
  const basePriceOneTime = sizeWeight === '2.2' ? 44.99 : 89.99;
  const basePriceSub = sizeWeight === '2.2' ? 35.99 : 71.99;
  const activeSinglePrice = isSubscription ? basePriceSub : basePriceOneTime;
  const totalPrice = (activeSinglePrice * qty).toFixed(2);

  const handleAddCurrentToBag = () => {
    const product = ALL_VAULT_PRODUCTS[0];
    onAddToCart(
      product,
      activeFlavor.name,
      sizeWeight === '2.2' ? '2.2 lbs' : '5.0 lbs Jumbo',
      isSubscription,
      activeSinglePrice
    );
    onOpenToast(`⚡ ADDED ${activeFlavor.name} (${sizeWeight} LBS) TO BAG!`);
  };

  const filteredReviews = PDP_REVIEWS.filter((r) => {
    if (reviewFilter === 'all') return true;
    return r.flavor === reviewFilter;
  });

  return (
    <div className="flex flex-col w-full bg-[#0e0e12]">
      {/* TOP TICKER ACCENT */}
      <div className="w-full bg-[#ff4b89] py-2 px-4 sm:px-8 flex items-center justify-between text-[#590026] overflow-hidden select-none border-b border-[#0e0e12]">
        <div className="flex items-center gap-6 font-space font-bold text-xs uppercase tracking-wider mx-auto">
          <span>⚡ BATCH #X-882 FRESH LAB RELEASE</span>
          <span className="opacity-40">•</span>
          <span>FREE LIMITED-EDITION MATTE SHAKER TUB WITH ORDERS &gt; $75</span>
          <span className="opacity-40">•</span>
          <span>100% INSTANTIZED DISSOLVE TECH</span>
        </div>
      </div>

      {/* MAIN PRODUCT CONSOLE */}
      <section className="w-full px-4 sm:px-8 py-10 max-w-7xl mx-auto">
        {/* Breadcrumb & Hype Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 font-space font-bold text-xs text-[#c4c9ac] uppercase">
            <button onClick={() => onNavigate('shop-drops')} className="hover:text-[#c3f400] transition-colors">
              Drops
            </button>
            <span>/</span>
            <button onClick={() => onNavigate('shop-drops')} className="hover:text-[#c3f400] transition-colors">
              Whey Isolate
            </button>
            <span>/</span>
            <span className="text-[#c3f400] font-syne font-bold">HYPER-ISOLATE GOURMET SERIES</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#c3f400] text-[#161e00] font-syne font-extrabold text-xs uppercase rounded shadow-[2px_2px_0px_#000000]">
              DROP 04 // IN STOCK
            </span>
            <span className="px-3 py-1 bg-[#2a292e] text-[#e4e1e7] font-space font-bold text-xs uppercase rounded border border-[#353439]">
              BATCH TESTED
            </span>
          </div>
        </div>

        {/* 2 Column Master PDP Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: VISUAL GALLERY */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Stage Container with Neon Underglow */}
            <div className="relative w-full aspect-[4/3] sm:aspect-square bg-[#1b1b1f] rounded-2xl overflow-hidden border border-[#2a292e] shadow-2xl flex items-center justify-center p-8 group">
              {/* Dynamic Ambient Glow Aura */}
              <div
                className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full blur-3xl transition-all duration-700 pointer-events-none"
                style={{
                  backgroundColor: activeFlavor.color,
                  opacity: 0.25
                }}
              />

              {/* Badge overlay */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                <span className="px-3 py-1 bg-[#0e0e12] text-[#c3f400] font-syne font-extrabold text-xs uppercase tracking-wider rounded shadow-[3px_3px_0px_#c3f400] border border-[#2a292e]">
                  COLD-FILTERED ISOLATE
                </span>
                <span className="px-3 py-1 bg-[#ff4b89] text-[#590026] font-space font-bold text-[11px] uppercase rounded shadow-[3px_3px_0px_#000000]">
                  LIMITED RECIPE
                </span>
              </div>

              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => onOpenToast('3D Interactive Model Viewer Activated')}
                  className="p-2.5 bg-[#2a292e] text-[#e4e1e7] hover:text-[#c3f400] rounded-lg transition-colors border border-[#353439] shadow-md"
                  title="3D Rotate View"
                >
                  <span className="material-symbols-outlined text-xl">3d_rotation</span>
                </button>
              </div>

              {/* Main Featured Image Canvas */}
              <div className="relative z-1 w-full h-full flex items-center justify-center">
                <img
                  className="max-h-full max-w-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:scale-105"
                  src={PDP_THUMBNAILS[selectedThumb].mainSrc}
                  alt={PDP_THUMBNAILS[selectedThumb].title}
                />
              </div>

              {/* Bottom spec pill */}
              <div className="absolute bottom-4 left-4 z-10 font-space font-bold text-[11px] text-[#c4c9ac] flex items-center gap-1.5 bg-[#0e0e12]/85 px-3 py-1.5 rounded border border-[#2a292e] backdrop-blur-sm">
                <span className="material-symbols-outlined text-sm text-[#c3f400]">verified</span>
                <span>SPEC: 90% PROTEIN PER SCOOP // ZERO BLOAT</span>
              </div>
            </div>

            {/* Thumbnails Strip */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {PDP_THUMBNAILS.map((thumb, idx) => (
                <button
                  key={thumb.id}
                  onClick={() => setSelectedThumb(idx)}
                  className={`p-1 rounded-xl focus:outline-none transition-all duration-200 border ${
                    selectedThumb === idx
                      ? 'border-[#c3f400] bg-[#1f1f23] shadow-[2px_2px_0px_#c3f400]'
                      : 'border-[#2a292e] bg-[#1b1b1f] hover:bg-[#2a292e]'
                  }`}
                >
                  <img
                    className="w-full aspect-square object-cover rounded-lg"
                    src={thumb.src}
                    alt={thumb.title}
                  />
                </button>
              ))}
            </div>

            {/* Quick Proof Micro-Bar */}
            <div className="grid grid-cols-3 gap-3 bg-[#1b1b1f] border border-[#2a292e] p-4 rounded-xl text-center shadow-inner">
              <div className="flex flex-col items-center">
                <span className="font-syne text-xl font-bold text-[#c3f400]">10 SEC</span>
                <span className="font-space font-bold text-[11px] text-[#c4c9ac] uppercase">
                  INSTANT DISSOLVE
                </span>
              </div>
              <div className="flex flex-col items-center border-x border-[#2a292e]">
                <span className="font-syne text-xl font-bold text-[#ff4b89]">0 GRAMS</span>
                <span className="font-space font-bold text-[11px] text-[#c4c9ac] uppercase">
                  ADDED SUGAR
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-syne text-xl font-bold text-[#e4e1e7]">5 ENZYMES</span>
                <span className="font-space font-bold text-[11px] text-[#c4c9ac] uppercase">
                  DIGEZIBLEND™ ANTI-BLOAT
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: PURCHASING CONSOLE (STICKY) */}
          <div className="lg:col-span-5 flex flex-col gap-6 bg-[#1b1b1f] border border-[#2a292e] p-6 sm:p-8 rounded-2xl shadow-xl">
            {/* Header & Social Proof */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <div className="flex text-[#c3f400] text-sm">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-base">star</span>
                  ))}
                </div>
                <a
                  href="#reviews-section"
                  className="font-space font-bold text-xs text-[#c4c9ac] hover:text-[#c3f400] uppercase transition-colors underline underline-offset-4"
                >
                  4.9 (2,840 VERIFIED DROPS)
                </a>
              </div>

              <h1 className="font-syne text-3xl sm:text-4xl font-extrabold uppercase text-[#e4e1e7] tracking-tight leading-none mt-1">
                HYPER-ISOLATE WHEY
              </h1>
              <p className="font-space text-sm text-[#c4c9ac] leading-relaxed">
                Gourmet Edition. Ultra-pure cold-filtered isolate engineered for lightning recovery and zero stomach heavy-down.
              </p>
            </div>

            {/* Price Display */}
            <div className="flex items-baseline justify-between p-4 bg-[#1f1f23] border border-[#2a292e] rounded-xl">
              <div className="flex items-baseline gap-2">
                <span className="font-syne text-3xl font-extrabold text-[#c3f400]">
                  ${activeSinglePrice.toFixed(2)}
                </span>
                <span className="font-space font-bold text-xs text-[#c4c9ac] uppercase">
                  {isSubscription ? 'SUBSCRIBE & SAVE (20% OFF)' : 'ONE-TIME DROP'}
                </span>
              </div>
              <span className="font-space font-bold text-xs px-2.5 py-1 bg-[#2a292e] text-[#ffb1c3] rounded border border-[#353439]">
                ${(activeSinglePrice / (sizeWeight === '2.2' ? 30 : 70)).toFixed(2)} / SERVING
              </span>
            </div>

            {/* Flavor Selector Engine */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="font-space font-bold text-xs text-[#e4e1e7] uppercase">
                  FLAVOR PROFILE:{' '}
                  <span className="text-[#c3f400] font-syne font-extrabold ml-1">
                    {activeFlavor.name}
                  </span>
                </span>
                <span className="font-space font-bold text-xs text-[#ff4b89] animate-pulse">
                  HOT DROP 🔥
                </span>
              </div>

              {/* Flavor Buttons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PDP_FLAVORS.map((flavor) => (
                  <button
                    key={flavor.id}
                    onClick={() => setActiveFlavor(flavor)}
                    className={`flex items-center gap-3 p-3 rounded-lg text-left transition-all border ${
                      activeFlavor.id === flavor.id
                        ? 'border-[#c3f400] bg-[#2a292e] shadow-[2px_2px_0px_#c3f400]'
                        : 'border-[#2a292e] bg-[#1f1f23] hover:bg-[#2a292e]'
                    } ${flavor.id === 'caramel' ? 'sm:col-span-2' : ''}`}
                  >
                    <span className="text-2xl p-1.5 bg-[#131317] rounded-md border border-[#2a292e]">
                      {flavor.emoji}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-syne font-bold text-xs text-[#e4e1e7] truncate uppercase">
                        {flavor.name}
                      </span>
                      <span
                        className="font-space font-bold text-[10px]"
                        style={{ color: flavor.color }}
                      >
                        {flavor.tagline}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Size / Tiers */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between font-space font-bold text-xs text-[#e4e1e7] uppercase">
                <span>NET WEIGHT // SERVING CAPACITY</span>
                <span className="text-[#c3f400]">30 GRAM SCOOP SIZE</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSizeWeight('2.2')}
                  className={`p-3.5 rounded-lg text-left transition-all border ${
                    sizeWeight === '2.2'
                      ? 'border-[#c3f400] bg-[#1f1f23] shadow-[2px_2px_0px_#c3f400]'
                      : 'border-[#2a292e] bg-[#2a292e] hover:bg-[#353439]'
                  }`}
                >
                  <div className="font-syne font-extrabold text-base text-[#e4e1e7]">2.2 LBS</div>
                  <div className="font-space font-bold text-[10px] text-[#c3f400]">
                    30 SERVINGS REGULAR
                  </div>
                </button>
                <button
                  onClick={() => setSizeWeight('5.0')}
                  className={`p-3.5 rounded-lg text-left transition-all border ${
                    sizeWeight === '5.0'
                      ? 'border-[#c3f400] bg-[#1f1f23] shadow-[2px_2px_0px_#c3f400]'
                      : 'border-[#2a292e] bg-[#2a292e] hover:bg-[#353439]'
                  }`}
                >
                  <div className="font-syne font-extrabold text-base text-[#e4e1e7]">5.0 LBS JUMBO</div>
                  <div className="font-space font-bold text-[10px] text-[#ffb1c3]">
                    70 SERVINGS • SAVE $15
                  </div>
                </button>
              </div>
            </div>

            {/* Purchase Subscription Toggle Box */}
            <div className="flex flex-col gap-2 bg-[#1f1f23] p-3 rounded-xl border border-[#2a292e]">
              <label className="flex items-center justify-between p-2.5 rounded-lg bg-[#2a292e] cursor-pointer hover:bg-[#353439] transition-colors border border-[#353439]">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="purchase_type"
                    checked={isSubscription}
                    onChange={() => setIsSubscription(true)}
                    className="accent-[#c3f400] w-4 h-4 cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="font-syne font-bold text-xs text-[#e4e1e7] uppercase">
                      SUBSCRIBE &amp; LEVEL UP (20% OFF)
                    </span>
                    <span className="font-space text-[11px] text-[#c4c9ac]">
                      Auto-ships every 30 days. Cancel anytime via SMS.
                    </span>
                  </div>
                </div>
                <span className="font-syne font-extrabold text-sm text-[#c3f400]">
                  ${basePriceSub.toFixed(2)}
                </span>
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#2a292e] cursor-pointer transition-colors border border-transparent">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="purchase_type"
                    checked={!isSubscription}
                    onChange={() => setIsSubscription(false)}
                    className="accent-[#c3f400] w-4 h-4 cursor-pointer"
                  />
                  <span className="font-syne font-bold text-xs text-[#e4e1e7] uppercase">
                    ONE-TIME DROP ONLY
                  </span>
                </div>
                <span className="font-syne font-extrabold text-sm text-[#c4c9ac]">
                  ${basePriceOneTime.toFixed(2)}
                </span>
              </label>
            </div>

            {/* Quantity Stepper & Big Action Button */}
            <div className="flex gap-3 items-stretch">
              <div className="flex items-center bg-[#1f1f23] border border-[#2a292e] px-2 rounded-lg">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-8 h-8 flex items-center justify-center font-bold text-sm text-[#e4e1e7] hover:text-[#c3f400]"
                >
                  -
                </button>
                <span className="w-8 text-center font-syne font-bold text-sm text-[#e4e1e7]">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-8 h-8 flex items-center justify-center font-bold text-sm text-[#e4e1e7] hover:text-[#c3f400]"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddCurrentToBag}
                className="flex-1 py-4 px-6 bg-[#c3f400] hover:bg-[#abd600] text-[#161e00] font-syne font-extrabold text-sm uppercase rounded-xl shadow-[4px_4px_0px_#ff4b89] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg font-black">bolt</span>
                <span>ADD TO BAG • ${totalPrice}</span>
              </button>
            </div>

            {/* Guarantees Checklist */}
            <div className="pt-2 flex flex-col gap-2 text-[#c4c9ac] font-space text-xs border-t border-[#2a292e]">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#c3f400] text-lg">local_shipping</span>
                <span>Ships within 24h from Nevada or Ohio hub.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#ff4b89] text-lg">verified_user</span>
                <span>30-Day Zero-Chalk Taste Guarantee or 100% refund.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#c3f400] text-lg">eco</span>
                <span>100% Grass-Fed US &amp; Irish dairy source. Soy &amp; Gluten free.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          HYPER STATS BANNER / NUTRITION SCIENCE
      ======================================================== */}
      <section className="w-full bg-[#1b1b1f] py-16 border-t border-[#2a292e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-space font-bold text-xs text-[#c3f400] uppercase tracking-wider block mb-1">
                BIOMECHANICAL ARCHITECTURE
              </span>
              <h2 className="font-syne text-3xl sm:text-4xl font-extrabold uppercase text-[#e4e1e7] tracking-tight">
                PURE MACROS. NO FILLER BS.
              </h2>
            </div>
            <p className="font-space text-sm text-[#c4c9ac] max-w-md">
              Each batch is micro-filtered under cold temperatures to preserve fragile immunoglobulins without baking the protein into dead chalk.
            </p>
          </div>

          {/* 4 Bento Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#1f1f23] p-6 rounded-xl border border-[#2a292e] flex flex-col justify-between shadow-lg group hover:border-[#c3f400] transition-colors">
              <div className="w-full flex justify-between items-start mb-6">
                <span className="font-syne font-bold text-xs text-[#c3f400]">METRIC 01</span>
                <span className="material-symbols-outlined text-[#c3f400]">fitness_center</span>
              </div>
              <div>
                <div className="font-syne text-4xl font-extrabold text-[#e4e1e7] tracking-tight mb-1">27G</div>
                <div className="font-syne font-bold text-xs text-[#e4e1e7] uppercase mb-1">
                  COLD ISOLATE PROTEIN
                </div>
                <p className="font-space text-xs text-[#c4c9ac]">
                  Zero whey concentrate blending. 90% dry-basis concentration for instantaneous nitrogen retention.
                </p>
              </div>
              <div className="w-full bg-[#353439] h-1.5 mt-4 rounded-full overflow-hidden">
                <div className="bg-[#c3f400] h-full w-[90%]" />
              </div>
            </div>

            <div className="bg-[#1f1f23] p-6 rounded-xl border border-[#2a292e] flex flex-col justify-between shadow-lg group hover:border-[#ff4b89] transition-colors">
              <div className="w-full flex justify-between items-start mb-6">
                <span className="font-syne font-bold text-xs text-[#ff4b89]">METRIC 02</span>
                <span className="material-symbols-outlined text-[#ff4b89]">electric_bolt</span>
              </div>
              <div>
                <div className="font-syne text-4xl font-extrabold text-[#e4e1e7] tracking-tight mb-1">6.2G</div>
                <div className="font-syne font-bold text-xs text-[#e4e1e7] uppercase mb-1">
                  NATURAL BCAAS &amp; EAAS
                </div>
                <p className="font-space text-xs text-[#c4c9ac]">
                  Optimal 2:1:1 leucine trigger concentration to ignite post-workout muscle protein synthesis immediately.
                </p>
              </div>
              <div className="w-full bg-[#353439] h-1.5 mt-4 rounded-full overflow-hidden">
                <div className="bg-[#ff4b89] h-full w-[78%]" />
              </div>
            </div>

            <div className="bg-[#1f1f23] p-6 rounded-xl border border-[#2a292e] flex flex-col justify-between shadow-lg group hover:border-[#b4c5ff] transition-colors">
              <div className="w-full flex justify-between items-start mb-6">
                <span className="font-syne font-bold text-xs text-[#b4c5ff]">METRIC 03</span>
                <span className="material-symbols-outlined text-[#b4c5ff]">spa</span>
              </div>
              <div>
                <div className="font-syne text-4xl font-extrabold text-[#e4e1e7] tracking-tight mb-1">5 ENZ</div>
                <div className="font-syne font-bold text-xs text-[#e4e1e7] uppercase mb-1">
                  DIGEZIBLEND™ COMPLEX
                </div>
                <p className="font-space text-xs text-[#c4c9ac]">
                  Protease, amylase, lactase, lipase &amp; cellulase. Zero bloat, zero digestive sluggishness.
                </p>
              </div>
              <div className="w-full bg-[#353439] h-1.5 mt-4 rounded-full overflow-hidden">
                <div className="bg-[#b4c5ff] h-full w-[100%]" />
              </div>
            </div>

            <div className="bg-[#1f1f23] p-6 rounded-xl border border-[#2a292e] flex flex-col justify-between shadow-lg group hover:border-[#c3f400] transition-colors">
              <div className="w-full flex justify-between items-start mb-6">
                <span className="font-syne font-bold text-xs text-[#c4c9ac]">METRIC 04</span>
                <span className="material-symbols-outlined text-[#c4c9ac]">health_and_safety</span>
              </div>
              <div>
                <div className="font-syne text-4xl font-extrabold text-[#e4e1e7] tracking-tight mb-1">&lt;1G</div>
                <div className="font-syne font-bold text-xs text-[#e4e1e7] uppercase mb-1">
                  TOTAL CARBS &amp; SUGAR
                </div>
                <p className="font-space text-xs text-[#c4c9ac]">
                  Sweetened solely through fermented reb-M stevia extract and real freeze-dried flavors. No sucrose spikes.
                </p>
              </div>
              <div className="w-full bg-[#353439] h-1.5 mt-4 rounded-full overflow-hidden">
                <div className="bg-[#c3f400] h-full w-[96%]" />
              </div>
            </div>
          </div>

          {/* Expandable Nutrition Facts & Aminogram Panel */}
          <div className="w-full bg-[#1f1f23] border border-[#2a292e] rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* FDA Spec Block */}
              <div className="w-full lg:w-1/2 bg-[#0e0e12] border border-[#2a292e] p-5 rounded-xl font-space text-xs text-[#e4e1e7]">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-syne text-2xl font-black uppercase">NUTRITION FACTS</span>
                  <span className="font-space font-bold text-xs text-[#c3f400]">30 SERVINGS PER TUB</span>
                </div>
                <div className="text-[11px] text-[#c4c9ac] mb-3">
                  Serving Size: 1 Scoop (30.8g) // Matcha Gourmet Cut
                </div>
                <div className="h-2 bg-[#e4e1e7] w-full mb-2" />
                <div className="flex justify-between font-syne text-lg font-bold mb-1">
                  <span>Amount Per Serving</span>
                  <span>CALORIES 110</span>
                </div>
                <div className="h-1 bg-[#353439] w-full mb-2" />
                <div className="flex justify-between py-1 border-b border-[#2a292e]">
                  <span className="font-bold">Total Fat <span className="font-normal text-[#c4c9ac]">0.5g</span></span>
                  <span className="font-bold">1%</span>
                </div>
                <div className="flex justify-between py-1 text-[#c4c9ac] pl-4 border-b border-[#2a292e]">
                  <span>Saturated Fat 0g</span>
                  <span>0%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#2a292e]">
                  <span className="font-bold">Cholesterol <span className="font-normal text-[#c4c9ac]">5mg</span></span>
                  <span className="font-bold">2%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#2a292e]">
                  <span className="font-bold">Sodium <span className="font-normal text-[#c4c9ac]">110mg</span></span>
                  <span className="font-bold">5%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#2a292e]">
                  <span className="font-bold">Total Carbohydrate <span className="font-normal text-[#c4c9ac]">&lt;1g</span></span>
                  <span className="font-bold">0%</span>
                </div>
                <div className="flex justify-between py-1 text-[#c4c9ac] pl-4 border-b border-[#2a292e]">
                  <span>Total Sugars 0g</span>
                  <span>0%</span>
                </div>
                <div className="flex justify-between py-2 bg-[#c3f400]/10 px-2 rounded my-1 border border-[#c3f400]/30">
                  <span className="font-syne font-bold text-sm text-[#c3f400] uppercase">PROTEIN 27g</span>
                  <span className="font-syne font-bold text-sm text-[#c3f400]">54%</span>
                </div>
                <div className="mt-3 pt-2 border-t border-[#353439] text-[11px] text-[#c4c9ac] leading-relaxed">
                  <strong>Ingredients:</strong> Instantized Cross-Flow Micro-Filtered Whey Protein Isolate, Uji Ceremonial Matcha Powder, DigeZiBlend™ (Protease, Amylase, Lactase, Lipase, Cellulase), Himalayan Pink Salt, Organic Stevia Leaf Extract, Sunflower Lecithin.
                </div>
              </div>

              {/* Aminogram Bars */}
              <div className="w-full lg:w-1/2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-syne font-bold text-sm sm:text-base uppercase text-[#e4e1e7]">
                      FULL SPECTRUM AMINOGRAM
                    </span>
                    <span className="font-space font-bold text-[10px] text-[#c3f400] bg-[#2a292e] px-2.5 py-1 rounded">
                      BATCH LAB VERIFIED
                    </span>
                  </div>
                  <p className="font-space text-xs text-[#c4c9ac] mb-4">
                    Guaranteed active milligrams of muscle-repairing amino acids per single scoop serving.
                  </p>

                  <div className="space-y-3 font-space text-xs">
                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span>L-LEUCINE (ANABOLIC KEY)</span>
                        <span className="text-[#c3f400]">3,120 MG</span>
                      </div>
                      <div className="h-2 bg-[#353439] rounded-full overflow-hidden">
                        <div className="h-full bg-[#c3f400] w-[95%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span>L-ISOLEUCINE</span>
                        <span className="text-[#c3f400]">1,540 MG</span>
                      </div>
                      <div className="h-2 bg-[#353439] rounded-full overflow-hidden">
                        <div className="h-full bg-[#c3f400] w-[70%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span>L-VALINE</span>
                        <span className="text-[#c3f400]">1,490 MG</span>
                      </div>
                      <div className="h-2 bg-[#353439] rounded-full overflow-hidden">
                        <div className="h-full bg-[#c3f400] w-[65%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span>L-GLUTAMIC ACID</span>
                        <span className="text-[#ff4b89]">4,880 MG</span>
                      </div>
                      <div className="h-2 bg-[#353439] rounded-full overflow-hidden">
                        <div className="h-full bg-[#ff4b89] w-[100%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span>L-LYSINE</span>
                        <span className="text-[#e4e1e7]">2,610 MG</span>
                      </div>
                      <div className="h-2 bg-[#353439] rounded-full overflow-hidden">
                        <div className="h-full bg-[#e4e1e7] w-[80%]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-[#1b1b1f] border border-[#2a292e] rounded-xl flex items-center gap-4">
                  <span className="material-symbols-outlined text-[#c3f400] text-2xl">science</span>
                  <div>
                    <span className="font-syne font-bold text-xs uppercase text-[#e4e1e7] block">
                      THIRD PARTY HPLC PURITY TESTED
                    </span>
                    <span className="font-space text-xs text-[#c4c9ac]">
                      No amino-spiking, zero cheap taurine fillers, no unlisted nitrogen boosters.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          MIXABILITY & TASTE LAB PROOF SECTION
      ======================================================== */}
      <section className="w-full px-4 sm:px-8 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 flex flex-col gap-4">
            <span className="px-3 py-1 bg-[#2a292e] text-[#c3f400] font-space font-bold text-xs uppercase w-max rounded">
              PATENTED FLUID DISSOLVE TECH
            </span>
            <h2 className="font-syne text-3xl sm:text-4xl font-extrabold uppercase text-[#e4e1e7] tracking-tight leading-tight">
              SHAKE FOR 10 SECONDS.<br />ZERO CLUMPS. EVER.
            </h2>
            <p className="font-space text-sm text-[#c4c9ac] leading-relaxed">
              We banned the thick chalky goop that ruins normal protein powders. Hyper-Isolate is agglomerated at cold temps to effortlessly dissolve into ice-cold water, almond milk, or iced espresso without needing a wire metal shaker ball.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#1b1b1f] border border-[#2a292e] rounded-xl flex flex-col gap-1">
                <span className="font-syne font-bold text-sm text-[#c3f400]">100% WATER CLEAR</span>
                <span className="font-space text-xs text-[#c4c9ac]">
                  Blends seamlessly without heavy dairy coating your tongue.
                </span>
              </div>
              <div className="p-4 bg-[#1b1b1f] border border-[#2a292e] rounded-xl flex flex-col gap-1">
                <span className="font-syne font-bold text-sm text-[#ff4b89]">NO SLUDGE AT BOTTOM</span>
                <span className="font-space text-xs text-[#c4c9ac]">
                  Finished drinks leave zero gritty residue behind.
                </span>
              </div>
            </div>
          </div>

          {/* Visual Mix Showcase */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden bg-[#1b1b1f] border border-[#2a292e] shadow-2xl group cursor-pointer" onClick={() => setShowVideoModal(true)}>
            <img
              className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzx0vY0ofG1KdbEnr1yhT2JA8mVNILQ-kmafp4qnkALI82cjRokc3Ye4AKuHmkqUn5JwatK7umbrZEYZ5aLzqoZsekZdKCA1avet4JD-BvoKFplmJBaVJ369WASjdib700f-2Jc3muLHI_EMQz7YmpLV52bSnHuQfnVgcEJHkTOkocVoTR03Yz7EMkK0il2DCYZLL54ouj06wxHhG019GOMw7pEJM1js8fZ4FInsB5epHbnrRZflxz"
              alt="Liquid dissolve test"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-transparent to-transparent flex flex-col justify-end p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#c3f400] text-[#161e00] flex items-center justify-center font-bold shadow-[2px_2px_0px_#000000] group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl font-black">play_arrow</span>
                </div>
                <div>
                  <span className="font-syne font-extrabold text-sm uppercase text-[#e4e1e7] block">
                    WATCH LAB DISSOLVE MIX TEST
                  </span>
                  <span className="font-space text-xs text-[#c4c9ac]">
                    0:15 ULTRA-HD CLUMP BENCHMARK (CLICK TO PLAY)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          ATHLETE EXPERIENCES REVIEWS & UGC
      ======================================================== */}
      <section className="w-full bg-[#1b1b1f] py-16 border-t border-[#2a292e]" id="reviews-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 pb-4">
            <div>
              <span className="font-space font-bold text-xs text-[#ffb1c3] uppercase tracking-wider block mb-1">
                THE UNCENSORED CONSENSUS
              </span>
              <h2 className="font-syne text-3xl sm:text-4xl font-extrabold uppercase text-[#e4e1e7] tracking-tight">
                ATHLETE EXPERIENCES
              </h2>
            </div>

            <div className="flex items-center gap-6 bg-[#1f1f23] border border-[#2a292e] p-4 rounded-xl">
              <div className="flex flex-col items-center">
                <span className="font-syne text-4xl font-extrabold text-[#c3f400] leading-none">4.9</span>
                <div className="flex text-[#c3f400] text-xs mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm">star</span>
                  ))}
                </div>
                <span className="font-space text-[10px] text-[#c4c9ac] mt-1 font-bold">2,840 REVIEWS</span>
              </div>

              <div className="hidden sm:flex flex-col gap-1 w-44 text-[10px] font-space font-bold">
                <div className="flex items-center gap-2">
                  <span>5★</span>
                  <div className="flex-1 h-1.5 bg-[#353439] rounded-full overflow-hidden">
                    <div className="h-full bg-[#c3f400] w-[94%]" />
                  </div>
                  <span className="text-[#c4c9ac]">94%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>4★</span>
                  <div className="flex-1 h-1.5 bg-[#353439] rounded-full overflow-hidden">
                    <div className="h-full bg-[#c3f400] w-[5%]" />
                  </div>
                  <span className="text-[#c4c9ac]">5%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>3★</span>
                  <div className="flex-1 h-1.5 bg-[#353439] rounded-full overflow-hidden">
                    <div className="h-full bg-[#c3f400] w-[1%]" />
                  </div>
                  <span className="text-[#c4c9ac]">1%</span>
                </div>
              </div>

              <button
                onClick={() => setShowWriteReview(true)}
                className="py-2.5 px-4 bg-[#353439] hover:bg-[#c3f400] hover:text-[#161e00] text-[#e4e1e7] font-space font-bold text-xs uppercase rounded transition-colors"
              >
                WRITE A REVIEW
              </button>
            </div>
          </div>

          {/* Flavor filter pills */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-space font-bold text-xs text-[#c4c9ac] mr-1 uppercase">Filter by drop:</span>
            {[
              { id: 'all', label: 'All Flavors (2.8k)' },
              { id: 'matcha', label: '🍵 Mochi Matcha (890)' },
              { id: 'bluerasp', label: '🫐 Blue Raz (610)' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setReviewFilter(f.id)}
                className={`px-3 py-1 rounded-full font-space font-bold text-xs uppercase transition-colors ${
                  reviewFilter === f.id
                    ? 'bg-[#c3f400] text-[#161e00]'
                    : 'bg-[#2a292e] text-[#e4e1e7] hover:bg-[#353439]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#1f1f23] border border-[#2a292e] p-6 rounded-xl flex flex-col justify-between shadow-md"
              >
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex text-[#c3f400]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-sm">star</span>
                      ))}
                    </div>
                    <span className="font-space font-bold text-[10px] text-[#c3f400] bg-[#131317] px-2 py-0.5 rounded border border-[#2a292e]">
                      VERIFIED DROP
                    </span>
                  </div>

                  <p className="font-syne font-bold text-sm text-[#e4e1e7] uppercase leading-tight">
                    {rev.title}
                  </p>
                  <p className="font-space text-xs text-[#c4c9ac] leading-relaxed">
                    {rev.content}
                  </p>

                  {rev.userImage && (
                    <img
                      src={rev.userImage}
                      alt="Customer review drink"
                      className="w-full h-32 object-cover rounded-lg mt-1 border border-[#2a292e]"
                    />
                  )}
                </div>

                <div className="flex items-center gap-3 pt-4 mt-4 border-t border-[#2a292e]">
                  <img
                    className="w-10 h-10 rounded-full object-cover border border-[#2a292e]"
                    src={rev.avatar}
                    alt={rev.name}
                  />
                  <div className="flex flex-col">
                    <span className="font-syne font-bold text-xs text-[#e4e1e7]">{rev.name}</span>
                    <span className="font-space text-[10px] text-[#c4c9ac]">{rev.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Accordion Matrix */}
          <div className="mt-8 p-6 sm:p-8 bg-[#1f1f23] border border-[#2a292e] rounded-xl">
            <h3 className="font-syne text-xl font-bold uppercase text-[#e4e1e7] mb-6">
              FREQUENTLY ASKED PROTOCOLS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#1b1b1f] border border-[#2a292e] rounded-lg">
                <span className="font-syne font-bold text-xs text-[#c3f400] block mb-1">
                  WHY IS COLD-FILTERED ISOLATE SUPERIOR?
                </span>
                <p className="font-space text-xs text-[#c4c9ac] leading-relaxed">
                  Unlike ion-exchange processing which uses harsh heat and chemical acid baths, cross-flow cold micro-filtration preserves bioactive peptide chains, providing greater bioavailability and pure zero-fat macros.
                </p>
              </div>

              <div className="p-4 bg-[#1b1b1f] border border-[#2a292e] rounded-lg">
                <span className="font-syne font-bold text-xs text-[#c3f400] block mb-1">
                  HOW DOES THE 30-DAY ZERO-CHALK GUARANTEE WORK?
                </span>
                <p className="font-space text-xs text-[#c4c9ac] leading-relaxed">
                  If you try your tub and feel even a hint of chalkiness or dislike the flavor, email our concierge within 30 days. We send a prepaid return label and issue a 100% full refund with no questions asked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Dissolve Test Modal Simulator */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#131317] border-2 border-[#c3f400] rounded-2xl overflow-hidden shadow-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="font-syne font-bold text-sm uppercase text-[#c3f400]">
                LAB DISSOLVE MIX TEST BENCHMARK
              </span>
              <button onClick={() => setShowVideoModal(false)} className="text-[#c4c9ac] hover:text-[#e4e1e7]">
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center border border-[#2a292e]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzx0vY0ofG1KdbEnr1yhT2JA8mVNILQ-kmafp4qnkALI82cjRokc3Ye4AKuHmkqUn5JwatK7umbrZEYZ5aLzqoZsekZdKCA1avet4JD-BvoKFplmJBaVJ369WASjdib700f-2Jc3muLHI_EMQz7YmpLV52bSnHuQfnVgcEJHkTOkocVoTR03Yz7EMkK0il2DCYZLL54ouj06wxHhG019GOMw7pEJM1js8fZ4FInsB5epHbnrRZflxz"
                alt="Dissolve video preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4">
                <span className="w-16 h-16 rounded-full bg-[#c3f400] text-[#161e00] flex items-center justify-center font-bold text-2xl mb-2 animate-pulse">
                  ✓
                </span>
                <span className="font-syne font-extrabold text-lg uppercase text-[#e4e1e7]">
                  ZERO CLUMPS IN 5 SHAKES
                </span>
                <span className="font-space text-xs text-[#c4c9ac]">
                  Tested with 10oz refrigerated water at 38°F. 100% water-clear dissolution verified.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Write a review modal */}
      {showWriteReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#131317] border-2 border-[#c3f400] rounded-2xl overflow-hidden shadow-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="font-syne font-bold text-sm uppercase text-[#c3f400]">
                SUBMIT DROP REVIEW
              </span>
              <button onClick={() => setShowWriteReview(false)} className="text-[#c4c9ac] hover:text-[#e4e1e7]">
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowWriteReview(false);
                onOpenToast('✓ REVIEW SUBMITTED! +250 XP CREDITED TO YOUR X-TIER');
              }}
              className="space-y-4"
            >
              <div>
                <label className="block font-space font-bold text-xs uppercase text-[#c4c9ac] mb-1">
                  YOUR RATING
                </label>
                <div className="flex text-[#c3f400] text-2xl gap-1 cursor-pointer">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined">star</span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block font-space font-bold text-xs uppercase text-[#c4c9ac] mb-1">
                  HEADLINE / TLDR
                </label>
                <input
                  type="text"
                  required
                  placeholder='e.g., "Legit tastes like dessert"'
                  className="w-full bg-[#1b1b1f] border border-[#2a292e] p-2.5 rounded font-space text-xs text-[#e4e1e7] focus:outline-none focus:border-[#c3f400]"
                />
              </div>
              <div>
                <label className="block font-space font-bold text-xs uppercase text-[#c4c9ac] mb-1">
                  REVIEW DETAILS
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell other athletes about flavor, mixability, and digestion..."
                  className="w-full bg-[#1b1b1f] border border-[#2a292e] p-2.5 rounded font-space text-xs text-[#e4e1e7] focus:outline-none focus:border-[#c3f400]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#c3f400] text-[#161e00] font-syne font-bold text-xs uppercase rounded shadow-[3px_3px_0px_#ff4b89]"
              >
                POST VERIFIED REVIEW
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
