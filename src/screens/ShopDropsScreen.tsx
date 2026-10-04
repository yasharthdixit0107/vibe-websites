import React, { useState, useEffect } from 'react';
import { ScreenType, Product } from '../types';
import { ALL_VAULT_PRODUCTS } from '../data/mockData';

interface ShopDropsScreenProps {
  initialCategory?: string;
  onNavigate: (screen: ScreenType) => void;
  onAddToCart: (product: Product, flavor?: string, size?: string) => void;
  onAddCustomBundle: (items: { product: Product; flavor: string; price: number }[]) => void;
  onOpenToast: (msg: string) => void;
}

export const ShopDropsScreen: React.FC<ShopDropsScreenProps> = ({
  initialCategory,
  onNavigate,
  onAddToCart,
  onAddCustomBundle,
  onOpenToast
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [sortBy, setSortBy] = useState<string>('hype');
  const [activeSpecs, setActiveSpecs] = useState<string[]>([]);
  const [showPreferences, setShowPreferences] = useState(true);

  // Live countdown timer state (3d 14h 22m 09s)
  const [secondsLeft, setSecondsLeft] = useState(3 * 86400 + 14 * 3600 + 22 * 60 + 9);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(secondsLeft / 86400);
  const hours = Math.floor((secondsLeft % 86400) / 3600);
  const mins = Math.floor((secondsLeft % 3600) / 60);
  const secs = secondsLeft % 60;

  // Bundle & Save State
  const [slot1, setSlot1] = useState('hyper-isolate');
  const [slot2, setSlot2] = useState('psychic-surge');
  const [slot3, setSlot3] = useState('pink-lemonade');

  const slot1Options: Record<string, { name: string; price: number; product: Product }> = {
    'hyper-isolate': { name: 'Hyper-Isolate: Blue Raz Slush', price: 44.99, product: ALL_VAULT_PRODUCTS[0] },
    'clear-iso': { name: 'Raw Clear: Mango Passion', price: 42.99, product: ALL_VAULT_PRODUCTS[4] },
    'night-casein': { name: 'Night Repair Casein: Churro', price: 46.99, product: ALL_VAULT_PRODUCTS[3] }
  };

  const slot2Options: Record<string, { name: string; price: number; product: Product }> = {
    'psychic-surge': { name: 'Psychic Surge: Sour Apple', price: 39.99, product: ALL_VAULT_PRODUCTS[1] },
    'creatine-gummies': { name: 'Creatine Gummies: Peach Ring', price: 29.99, product: ALL_VAULT_PRODUCTS[2] },
    'pump-matrix-raw': { name: 'Non-Stim Pump (Unflavored)', price: 34.99, product: ALL_VAULT_PRODUCTS[1] }
  };

  const slot3Options: Record<string, { name: string; price: number; product: Product }> = {
    'pink-lemonade': { name: 'Hyper-Hydrate: Pink Lemonade', price: 24.99, product: ALL_VAULT_PRODUCTS[5] },
    'steel-shaker': { name: 'Heavy Metal Shaker Cup 750ml', price: 18.99, product: ALL_VAULT_PRODUCTS[6] },
    'electrolyte-caps': { name: 'Salt Tablets: 90 Capsules', price: 16.99, product: ALL_VAULT_PRODUCTS[5] }
  };

  const bundleRawPrice =
    slot1Options[slot1].price + slot2Options[slot2].price + slot3Options[slot3].price;
  const bundleDiscountedPrice = (bundleRawPrice * 0.75).toFixed(2);

  const toggleSpec = (spec: string) => {
    setActiveSpecs((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  };

  // Filter products
  let productsToDisplay = ALL_VAULT_PRODUCTS.filter((prod) => {
    if (selectedCategory === 'all') return true;
    return prod.category === selectedCategory;
  });

  // Sort products
  if (sortBy === 'low-high') {
    productsToDisplay = [...productsToDisplay].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'high-low') {
    productsToDisplay = [...productsToDisplay].sort((a, b) => b.price - a.price);
  }

  const handleLockInStack = () => {
    onAddCustomBundle([
      { product: slot1Options[slot1].product, flavor: slot1Options[slot1].name, price: slot1Options[slot1].price * 0.75 },
      { product: slot2Options[slot2].product, flavor: slot2Options[slot2].name, price: slot2Options[slot2].price * 0.75 },
      { product: slot3Options[slot3].product, flavor: slot3Options[slot3].name, price: slot3Options[slot3].price * 0.75 }
    ]);
    onOpenToast('💥 25% OFF TRI-PROTOCOL STACK ADDED TO BAG!');
  };

  return (
    <div className="flex flex-col w-full">
      {/* ========================================================
          VAULT HERO & LIVE COUNTDOWN HEADER
      ======================================================== */}
      <section className="relative w-full bg-[#0e0e12] px-4 sm:px-8 py-12 lg:py-16 overflow-hidden border-b border-[#1f1f23]">
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#c3f400]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-[#ff4b89]/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#1f1f23] px-3.5 py-1.5 rounded-full mb-6 border border-[#2a292e] shadow-[0_0_20px_rgba(195,244,0,0.15)]">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c3f400] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#c3f400]" />
            </span>
            <span className="font-space font-bold text-xs text-[#c3f400] tracking-widest uppercase">
              DROP 009 COUNTDOWN ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 flex flex-col gap-2">
              <h1 className="font-syne text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-[#e4e1e7] tracking-tighter leading-none">
                THE VAULT: ACTIVE DROPS &amp; ESSENTIALS
              </h1>
              <p className="font-space text-base text-[#c4c9ac] max-w-2xl leading-relaxed">
                Ultra-pure formulas re-engineered for kinetic performance and zero-chalk taste. Once a limited batch sells out, it disappears until next season.
              </p>
            </div>

            {/* Hype Countdown Capsule */}
            <div className="lg:col-span-4 flex flex-col justify-end">
              <div className="bg-[#2a292e] p-4 rounded-xl border border-[#353439] shadow-[4px_4px_0px_#000000]">
                <div className="flex items-center justify-between text-[#c4c9ac] font-space font-bold text-xs uppercase mb-2">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#ff4b89] text-base">timer</span>
                    NEXT DROP IN
                  </span>
                  <span className="text-[#ffb1c3] font-syne font-bold text-xs">
                    YUZU CHERRY CRUSH 🍒
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center font-syne text-2xl font-extrabold text-[#c3f400]">
                  <div className="bg-[#0e0e12] py-2 rounded">
                    <span>{String(days).padStart(2, '0')}</span>
                    <span className="block font-space text-[10px] text-[#c4c9ac] font-bold">DAYS</span>
                  </div>
                  <div className="bg-[#0e0e12] py-2 rounded">
                    <span>{String(hours).padStart(2, '0')}</span>
                    <span className="block font-space text-[10px] text-[#c4c9ac] font-bold">HRS</span>
                  </div>
                  <div className="bg-[#0e0e12] py-2 rounded">
                    <span>{String(mins).padStart(2, '0')}</span>
                    <span className="block font-space text-[10px] text-[#c4c9ac] font-bold">MIN</span>
                  </div>
                  <div className="bg-[#0e0e12] py-2 rounded">
                    <span>{String(secs).padStart(2, '0')}</span>
                    <span className="block font-space text-[10px] text-[#c4c9ac] font-bold">SEC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          STICKY CONTROL & FILTER STRIP
      ======================================================== */}
      <section className="sticky top-20 z-40 w-full bg-[#1b1b1f]/95 backdrop-blur-md px-4 sm:px-8 py-4 border-b border-[#2a292e] shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col gap-3">
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-4">
            {/* Scrollable Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {[
                { id: 'all', label: 'ALL DROPS (18)' },
                { id: 'whey-isolate', label: 'WHEY ISOLATE (6)' },
                { id: 'pre-workout', label: 'PRE-WORKOUT (4)' },
                { id: 'creatine', label: 'CREATINE (3)' },
                { id: 'hydration', label: 'HYDRATION (3)' },
                { id: 'merch', label: 'MERCH & GEAR (2)' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full font-space font-bold text-xs uppercase transition-all whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-[#c3f400] text-[#161e00] shadow-[2px_2px_0px_#000000]'
                      : 'bg-[#1f1f23] text-[#c4c9ac] hover:text-[#e4e1e7] hover:bg-[#2a292e]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort & View Controls */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="relative bg-[#1f1f23] border border-[#2a292e] px-3.5 py-1.5 rounded flex items-center">
                <span className="material-symbols-outlined text-sm text-[#c3f400] mr-1.5">
                  swap_vert
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent font-space font-bold text-xs text-[#e4e1e7] uppercase focus:outline-none cursor-pointer pr-4 appearance-none"
                >
                  <option className="bg-[#1f1f23] text-[#e4e1e7]" value="hype">
                    Sort by: Hype / Viral
                  </option>
                  <option className="bg-[#1f1f23] text-[#e4e1e7]" value="low-high">
                    Price: Low to High
                  </option>
                  <option className="bg-[#1f1f23] text-[#e4e1e7]" value="high-low">
                    Price: High to Low
                  </option>
                </select>
                <span className="material-symbols-outlined text-xs text-[#c4c9ac] pointer-events-none absolute right-2">
                  expand_more
                </span>
              </div>

              <button
                onClick={() => setShowPreferences(!showPreferences)}
                className="flex items-center gap-1.5 bg-[#1f1f23] hover:bg-[#2a292e] border border-[#2a292e] px-3 py-1.5 rounded text-[#e4e1e7] transition-colors"
              >
                <span className="material-symbols-outlined text-base text-[#c3f400]">tune</span>
                <span className="font-space font-bold text-xs uppercase hidden sm:inline">Preferences</span>
              </button>
            </div>
          </div>

          {/* Quick Dietary / Vibe Filter Pills */}
          {showPreferences && (
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#2a292e]">
              <span className="font-space font-bold text-[11px] text-[#c4c9ac] uppercase tracking-wider mr-1">
                Quick Spec:
              </span>
              {[
                { id: 'vegan', label: 'Vegan Blends', emoji: '🌱' },
                { id: 'gluten', label: 'Gluten-Free Lab', emoji: '🌾' },
                { id: 'high-stim', label: 'High-Stim Fuel', emoji: '⚡' },
                { id: 'recovery', label: 'Deep Recovery Focus', emoji: '💤' }
              ].map((chip) => {
                const isActive = activeSpecs.includes(chip.id);
                return (
                  <button
                    key={chip.id}
                    onClick={() => toggleSpec(chip.id)}
                    className={`px-3 py-1 rounded font-space font-bold text-[11px] flex items-center gap-1 transition-colors ${
                      isActive
                        ? 'bg-[#c3f400] text-[#161e00]'
                        : 'bg-[#2a292e] text-[#c4c9ac] hover:bg-[#353439]'
                    }`}
                  >
                    <span>{chip.emoji}</span>
                    <span>{chip.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PRODUCT CATALOG GRID: 8 BESPOKE CARDS
      ======================================================== */}
      <section className="w-full bg-[#0e0e12] px-4 sm:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productsToDisplay.map((product) => (
              <article
                key={product.id}
                className="group relative flex flex-col justify-between bg-[#1b1b1f] border border-[#2a292e] rounded-xl p-4 transition-all duration-200 hover:-translate-y-1 hover:border-[#c3f400] hover:shadow-[0_8px_24px_rgba(195,244,0,0.15)]"
              >
                <div>
                  {/* Badges & Stock Alert */}
                  <div className="flex items-center justify-between gap-1 mb-2">
                    {product.tag && (
                      <span
                        className={`inline-block px-2.5 py-0.5 ${
                          product.tagColor === 'secondary'
                            ? 'bg-[#ff4b89] text-[#590026]'
                            : product.tagColor === 'neutral'
                            ? 'bg-[#353439] text-[#e4e1e7]'
                            : 'bg-[#c3f400] text-[#161e00]'
                        } font-space font-bold text-[10px] uppercase tracking-wider rounded shadow-[1px_1px_0px_#000000]`}
                        style={{ transform: `rotate(${product.tagRotate || '0deg'})` }}
                      >
                        {product.tag}
                      </span>
                    )}
                    {product.claimedPercent && (
                      <span className="font-space font-bold text-[10px] text-[#ffb1c3] tracking-widest uppercase">
                        {product.claimedPercent}
                      </span>
                    )}
                  </div>

                  {/* Product Media Frame */}
                  <div 
                    className="relative w-full h-56 bg-[#0e0e12] rounded overflow-hidden flex items-center justify-center p-3 mb-4 cursor-pointer"
                    onClick={() => onNavigate('product-spotlight')}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12]/60 via-transparent to-transparent pointer-events-none" />
                    <img
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      src={product.image}
                      alt={product.alt}
                    />
                    {product.specBadge && (
                      <div className="absolute bottom-2 left-2 bg-[#1f1f23]/90 px-2 py-0.5 rounded font-space font-bold text-[10px] text-[#c3f400] uppercase border border-[#2a292e]">
                        {product.specBadge}
                      </div>
                    )}
                  </div>

                  {/* Content Header */}
                  <div className="flex flex-col gap-0.5 mb-1">
                    <span className="font-space font-bold text-xs text-[#c4c9ac] uppercase">
                      {product.series}
                    </span>
                    <h2 
                      onClick={() => onNavigate('product-spotlight')}
                      className="font-syne font-bold text-sm uppercase text-[#e4e1e7] group-hover:text-[#c3f400] transition-colors line-clamp-1 cursor-pointer"
                    >
                      {product.name}
                    </h2>
                  </div>
                  <p className="font-space text-xs text-[#c4c9ac] line-clamp-2 mb-4 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Bottom Row: Price & Add to Bag */}
                <div className="pt-2 border-t border-[#2a292e]">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="font-syne text-xl font-extrabold text-[#e4e1e7]">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="font-space font-bold text-[11px] text-[#8e9379] uppercase">
                      {product.servings}
                    </span>
                  </div>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-full py-2.5 bg-[#c3f400] hover:bg-[#abd600] text-[#161e00] font-syne font-extrabold text-xs uppercase rounded transition-transform active:scale-95 shadow-[3px_3px_0px_#ff4b89] flex items-center justify-center gap-1.5"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm font-bold">add_shopping_cart</span>
                    <span>ADD TO BAG</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          INTERACTIVE BUNDLE & SAVE STACK BUILDER (UP TO 25% OFF)
      ======================================================== */}
      <section className="w-full bg-[#1f1f23] px-4 sm:px-8 py-16 relative overflow-hidden border-t border-[#2a292e]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-80 bg-[#c3f400]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Headline */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="max-w-2xl">
              <span className="px-2.5 py-1 bg-[#ff4b89] text-[#590026] font-space font-bold text-xs uppercase rounded mb-2 inline-block shadow-[2px_2px_0px_#000000]">
                DYNAMIC COMBO PROTOCOL
              </span>
              <h2 className="font-syne text-3xl sm:text-4xl font-extrabold uppercase text-[#e4e1e7] tracking-tight">
                BUILD YOUR STACK &amp; SAVE UP TO 25%
              </h2>
              <p className="font-space text-sm text-[#c4c9ac] mt-1">
                Choose one formula from each slot to unlock automatic tiered bundle discounts. Stacked athletes train harder and recover faster.
              </p>
            </div>
            <div className="bg-[#2a292e] p-4 rounded-lg flex items-center gap-4 border border-[#353439] shadow-[4px_4px_0px_#000000]">
              <div className="flex flex-col">
                <span className="font-space font-bold text-[10px] text-[#c4c9ac] uppercase">BUNDLE SAVINGS TIER</span>
                <span className="font-syne text-xl font-extrabold text-[#c3f400]">25% OFF BUNDLE</span>
              </div>
              <span className="material-symbols-outlined text-[#c3f400] text-3xl">bolt</span>
            </div>
          </div>

          {/* 3-Slot Modular Stack Builder */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* SLOT 1: BASE PROTEIN */}
            <div className="bg-[#1b1b1f] p-6 rounded-xl flex flex-col justify-between border border-[#2a292e] shadow-md">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 bg-[#353439] font-space font-bold text-[11px] text-[#c3f400] uppercase rounded">
                    SLOT 01 • THE FOUNDATION
                  </span>
                  <span className="material-symbols-outlined text-[#c3f400] text-sm">check_circle</span>
                </div>
                <h3 className="font-syne font-bold text-base uppercase text-[#e4e1e7] mb-1">
                  PICK YOUR BASE PROTEIN
                </h3>
                <p className="font-space text-xs text-[#c4c9ac] mb-4">
                  Choose your primary tissue builder and post-session repair macro.
                </p>

                <div className="space-y-2">
                  {Object.entries(slot1Options).map(([key, opt]) => (
                    <label
                      key={key}
                      className={`flex items-center justify-between p-3 rounded cursor-pointer transition-all border ${
                        slot1 === key
                          ? 'border-[#c3f400] bg-[#2a292e] shadow-[2px_2px_0px_#c3f400]'
                          : 'border-[#2a292e] bg-[#1f1f23] hover:bg-[#2a292e]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="base-protein"
                          value={key}
                          checked={slot1 === key}
                          onChange={() => setSlot1(key)}
                          className="accent-[#c3f400] w-4 h-4 cursor-pointer"
                        />
                        <span className="font-space text-xs font-bold text-[#e4e1e7]">{opt.name}</span>
                      </div>
                      <span className="font-space font-bold text-xs text-[#c3f400]">
                        +${opt.price.toFixed(2)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#2a292e] flex items-center justify-between text-[#c4c9ac] font-space font-bold text-[11px]">
                <span>STATUS: SELECTED</span>
                <span className="text-[#c3f400] uppercase">SLOT COMPLETE</span>
              </div>
            </div>

            {/* SLOT 2: FUEL & IGNITION */}
            <div className="bg-[#1b1b1f] p-6 rounded-xl flex flex-col justify-between border border-[#2a292e] shadow-md">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 bg-[#353439] font-space font-bold text-[11px] text-[#ffb1c3] uppercase rounded">
                    SLOT 02 • THE IGNITION
                  </span>
                  <span className="material-symbols-outlined text-[#ffb1c3] text-sm">check_circle</span>
                </div>
                <h3 className="font-syne font-bold text-base uppercase text-[#e4e1e7] mb-1">
                  PICK YOUR PRE-SESSION FUEL
                </h3>
                <p className="font-space text-xs text-[#c4c9ac] mb-4">
                  Maximum tunnel-vision focus or pure unflavored cellular creatine saturation.
                </p>

                <div className="space-y-2">
                  {Object.entries(slot2Options).map(([key, opt]) => (
                    <label
                      key={key}
                      className={`flex items-center justify-between p-3 rounded cursor-pointer transition-all border ${
                        slot2 === key
                          ? 'border-[#ff4b89] bg-[#2a292e] shadow-[2px_2px_0px_#ff4b89]'
                          : 'border-[#2a292e] bg-[#1f1f23] hover:bg-[#2a292e]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="ignition-fuel"
                          value={key}
                          checked={slot2 === key}
                          onChange={() => setSlot2(key)}
                          className="accent-[#ff4b89] w-4 h-4 cursor-pointer"
                        />
                        <span className="font-space text-xs font-bold text-[#e4e1e7]">{opt.name}</span>
                      </div>
                      <span className="font-space font-bold text-xs text-[#ffb1c3]">
                        +${opt.price.toFixed(2)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#2a292e] flex items-center justify-between text-[#c4c9ac] font-space font-bold text-[11px]">
                <span>STATUS: SELECTED</span>
                <span className="text-[#ffb1c3] uppercase">SLOT COMPLETE</span>
              </div>
            </div>

            {/* SLOT 3: SUSTAIN & RESTORE */}
            <div className="bg-[#1b1b1f] p-6 rounded-xl flex flex-col justify-between border border-[#2a292e] shadow-md">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 bg-[#353439] font-space font-bold text-[11px] text-[#c3f400] uppercase rounded">
                    SLOT 03 • SUSTAIN &amp; RESTORE
                  </span>
                  <span className="material-symbols-outlined text-[#c3f400] text-sm">check_circle</span>
                </div>
                <h3 className="font-syne font-bold text-base uppercase text-[#e4e1e7] mb-1">
                  PICK YOUR HYDRATION / GEAR
                </h3>
                <p className="font-space text-xs text-[#c4c9ac] mb-4">
                  Complete your daily protocol with essential electrolytes or 24H cold hardware.
                </p>

                <div className="space-y-2">
                  {Object.entries(slot3Options).map(([key, opt]) => (
                    <label
                      key={key}
                      className={`flex items-center justify-between p-3 rounded cursor-pointer transition-all border ${
                        slot3 === key
                          ? 'border-[#c3f400] bg-[#2a292e] shadow-[2px_2px_0px_#c3f400]'
                          : 'border-[#2a292e] bg-[#1f1f23] hover:bg-[#2a292e]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="recovery-slot"
                          value={key}
                          checked={slot3 === key}
                          onChange={() => setSlot3(key)}
                          className="accent-[#c3f400] w-4 h-4 cursor-pointer"
                        />
                        <span className="font-space text-xs font-bold text-[#e4e1e7]">{opt.name}</span>
                      </div>
                      <span className="font-space font-bold text-xs text-[#c3f400]">
                        +${opt.price.toFixed(2)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#2a292e] flex items-center justify-between text-[#c4c9ac] font-space font-bold text-[11px]">
                <span>STATUS: SELECTED</span>
                <span className="text-[#c3f400] uppercase">SLOT COMPLETE</span>
              </div>
            </div>
          </div>

          {/* Stack Summary & Direct Checkout Trigger */}
          <div className="bg-[#2a292e] p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#353439] shadow-[4px_4px_0px_#000000]">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-lg bg-[#0e0e12] flex items-center justify-center text-[#c3f400] border border-[#353439]">
                <span className="material-symbols-outlined text-3xl">inventory_2</span>
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="font-syne font-extrabold text-sm sm:text-base uppercase text-[#e4e1e7]">
                    COMPLETE TRI-PROTOCOL STACK
                  </span>
                  <span className="px-2 py-0.5 bg-[#c3f400] text-[#161e00] font-space font-bold text-[10px] rounded uppercase">
                    25% APPLIED
                  </span>
                </div>
                <p className="font-space text-xs text-[#c4c9ac] mt-0.5">
                  Includes Free Priority Express Shipping + Limited Drop Sticker Pack
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
              <div className="text-right">
                <span className="block font-space font-bold text-xs text-[#8e9379] line-through uppercase">
                  ${bundleRawPrice.toFixed(2)} VALUE
                </span>
                <span className="font-syne text-2xl font-extrabold text-[#c3f400]">
                  ${bundleDiscountedPrice}
                </span>
              </div>
              <button
                onClick={handleLockInStack}
                className="px-8 py-3.5 bg-[#c3f400] hover:bg-[#abd600] text-[#161e00] font-syne font-extrabold text-sm uppercase rounded shadow-[4px_4px_0px_#ff4b89] hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <span>LOCK IN STACK</span>
                <span className="material-symbols-outlined font-black">bolt</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          MARQUEE COMMUNITY PROOF RIBBON
      ======================================================== */}
      <section className="w-full bg-[#ff4b89] text-[#590026] py-3 overflow-hidden select-none">
        <div className="animate-marquee whitespace-nowrap font-syne text-xs sm:text-sm font-extrabold uppercase">
          <span className="mx-6">⚡ BATCH 009 LAB TESTED • 0% CHALK • 100% FLAVOR ACCURACY • ENDORSED BY 4,200+ KINETIC ATHLETES • DROP CULTURE NUTRITION ⚡</span>
          <span className="mx-6">⚡ BATCH 009 LAB TESTED • 0% CHALK • 100% FLAVOR ACCURACY • ENDORSED BY 4,200+ KINETIC ATHLETES • DROP CULTURE NUTRITION ⚡</span>
          <span className="mx-6">⚡ BATCH 009 LAB TESTED • 0% CHALK • 100% FLAVOR ACCURACY • ENDORSED BY 4,200+ KINETIC ATHLETES • DROP CULTURE NUTRITION ⚡</span>
        </div>
      </section>
    </div>
  );
};
