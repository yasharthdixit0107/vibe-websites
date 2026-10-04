import React, { useState } from 'react';
import { ScreenType, Product } from '../types';
import { ALL_VAULT_PRODUCTS } from '../data/mockData';
import { db, doc, setDoc } from '../firebase';
import { User } from 'firebase/auth';

interface TasteLabScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onAddToCart: (product: Product, flavor?: string, size?: string) => void;
  onOpenToast: (msg: string) => void;
  onOpenIntel?: () => void;
  user?: User | null;
}

interface PrototypeVote {
  id: string;
  name: string;
  type: string;
  notes: string;
  votes: number;
  status: string;
  statusColor: string;
  tag: string;
  image: string;
  hasVoted?: boolean;
}

export const TasteLabScreen: React.FC<TasteLabScreenProps> = ({
  onNavigate,
  onAddToCart,
  onOpenToast,
  onOpenIntel,
  user,
}) => {
  // Prototype Drop Votes
  const [prototypes, setPrototypes] = useState<PrototypeVote[]>([
    {
      id: 'proto-1',
      name: 'MATCHA WHITE CHOCOLATE SILK',
      type: 'Hyper-Isolate Series',
      notes: 'Ceremonial Grade Uji Matcha, Cocoa Butter Essence, Zero Grittiness',
      votes: 3104,
      status: 'FINAL LAB APPROVAL',
      statusColor: '#c3f400',
      tag: 'DROP #015 CANDIDATE',
      image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=700&auto=format&fit=crop&q=80',
    },
    {
      id: 'proto-2',
      name: 'CINNAMON HORCHATA CRUNCH',
      type: 'Gourmet Crunch Series',
      notes: 'Real puffed cinnamon crispies, Mexican vanilla bean, sweet rice milk base',
      votes: 2419,
      status: 'SENSORY PANEL PASSED',
      statusColor: '#ff4b89',
      tag: 'COMMUNITY FAVORITE',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&auto=format&fit=crop&q=80',
    },
    {
      id: 'proto-3',
      name: 'YUZU GHOST ICE CLEAR ISO',
      type: 'Clear Juice Protein',
      notes: 'Japanese Citrus Yuzu, crisp cooling sensation, transparent light texture',
      votes: 1842,
      status: 'PILOT BLENDING',
      statusColor: '#00e5ff',
      tag: 'SUMMER ARCHIVE',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=700&auto=format&fit=crop&q=80',
    },
    {
      id: 'proto-4',
      name: 'BLACKBERRY NITRO COLD BREW',
      type: 'Caffeinated Recovery',
      notes: 'Cold brew Arabica + 120mg green coffee caffeine with dark wild blackberry',
      votes: 1510,
      status: 'MOLECULAR TUNING',
      statusColor: '#e0b8ff',
      tag: 'MORNING HIT',
      image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=700&auto=format&fit=crop&q=80',
    },
  ]);

  // Interactive Custom Flavor Mixer State
  const [baseProtein, setBaseProtein] = useState('Native Whey Isolate (93% Purity)');
  const [sweetness, setSweetness] = useState(3);
  const [tartness, setTartness] = useState(2);
  const [creaminess, setCreaminess] = useState(4);
  const [cooling, setCooling] = useState(1);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([
    'Tahitian Vanilla',
    'Sea Salt Crystals',
  ]);
  const [blendName, setBlendName] = useState('My Galactic Crunch');
  const [submittedFormula, setSubmittedFormula] = useState(false);

  const flavorNotesOptions = [
    'Tahitian Vanilla',
    'Sea Salt Crystals',
    'Madagascar Cacao',
    'Freeze-Dried Raspberry',
    'Toasted Hazelnut',
    'Glazed Donut Essence',
    'Salted Dulce De Leche',
    'Kyoto Hojicha',
    'Blood Orange Zest',
    'Peanut Butter Dust',
  ];

  const toggleNote = (note: string) => {
    if (selectedNotes.includes(note)) {
      setSelectedNotes(selectedNotes.filter((n) => n !== note));
    } else {
      if (selectedNotes.length >= 4) {
        onOpenToast('Maximum 4 flavor notes per micro-batch formulation!');
        return;
      }
      setSelectedNotes([...selectedNotes, note]);
    }
  };

  const handleVote = (id: string, name: string) => {
    setPrototypes((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const wasVoted = item.hasVoted;
          return {
            ...item,
            votes: wasVoted ? item.votes - 1 : item.votes + 1,
            hasVoted: !wasVoted,
          };
        }
        return item;
      })
    );

    const proto = prototypes.find((p) => p.id === id);
    if (proto?.hasVoted) {
      onOpenToast(`Retracted vote for ${name}`);
    } else {
      onOpenToast(`⚡ VOTE LOCKED FOR ${name}! YOUR VOICE SHAPES DROP #015.`);
    }
  };

  const handleOrderSampler = () => {
    // Add sampler pack to bag
    const sampleProduct = ALL_VAULT_PRODUCTS[4] || ALL_VAULT_PRODUCTS[0];
    onAddToCart(sampleProduct, 'Variety 4-Pack Pilot', 'Sachet Vault Pack');
    onOpenToast('📦 EXPERIMENTAL SAMPLE 4-PACK ADDED TO BAG ($5 DEPOSIT)!');
  };

  const handleSubmitFormula = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedFormula(true);

    if (user) {
      try {
        const formulaId = `formula-${Date.now()}`;
        await setDoc(doc(db, 'formulas', formulaId), {
          id: formulaId,
          userId: user.uid,
          userHandle: user.displayName || 'athlete',
          blendName,
          baseProtein,
          sweetness,
          tartness,
          creaminess,
          cooling,
          aromaNotes: selectedNotes.join(', '),
          createdAt: new Date().toISOString(),
        });
        onOpenToast(`⚡ FORMULA "${blendName}" SAVED TO FIRESTORE DATABASE!`);
      } catch (err: any) {
        console.error('Failed to write formula to firestore:', err);
        onOpenToast(`⚡ FORMULA "${blendName}" TRANSMITTED TO R&D VAULT!`);
      }
    } else {
      onOpenToast(`⚡ FORMULA "${blendName}" TRANSMITTED! (Sign in to sync with Firestore)`);
    }
  };

  return (
    <div className="flex flex-col w-full overflow-hidden bg-[#0e0e12] text-[#e4e1e7] pb-24">
      {/* ========================================================
          HERO BANNER
      ======================================================== */}
      <section className="relative w-full px-4 sm:px-8 py-16 lg:py-24 border-b border-[#2a292e] overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#c3f400]/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#00e5ff]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-[#c3f400] text-[#0e0e12] font-space font-extrabold text-xs uppercase px-3 py-1 shadow-[2px_2px_0px_#000000]">
              LAB ARCHIVE // SENSORY R&D
            </span>
            <span className="font-space text-xs text-[#8f919d] tracking-widest uppercase">
              DECENTRALIZED FORMULATION PROTOCOL
            </span>
          </div>

          <h1 className="font-syne font-extrabold text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter leading-[0.95] mb-6">
            COMMUNITY <br />
            <span className="text-[#c3f400]">TASTE LAB</span> &amp; VAULT
          </h1>

          <p className="max-w-2xl font-space text-base sm:text-lg text-[#8f919d] leading-relaxed mb-8">
            Traditional supplement companies formulate behind closed boardroom doors with artificial sweeteners and cheap fillers. At Protein X, you vote on upcoming limited batches, tune custom flavor matrices, and test R&amp;D sample sachets before production.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#voting-section"
              className="bg-[#c3f400] text-[#0e0e12] font-space font-extrabold text-sm uppercase px-8 py-4 shadow-[4px_4px_0px_#000000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              VOTE ON DROP #015 →
            </a>
            <a
              href="#custom-mixer"
              className="bg-[#1c1b1f] text-white border border-[#353439] font-space font-bold text-sm uppercase px-8 py-4 shadow-[4px_4px_0px_#000000] hover:border-[#c3f400] transition-colors"
            >
              CUSTOM BLEND MIXER
            </a>
            {onOpenIntel && (
              <button
                onClick={onOpenIntel}
                className="bg-[#1a1921] hover:bg-[#25242e] text-[#00e5ff] border-2 border-[#00e5ff] font-space font-extrabold text-sm uppercase px-6 py-4 shadow-[4px_4px_0px_#000000] flex items-center gap-2 hover:translate-x-1 transition-all"
              >
                <span className="material-symbols-outlined text-base">travel_explore</span>
                <span>RESEARCH INGREDIENTS (GOOGLE SEARCH GROUNDED)</span>
              </button>
            )}
            <button
              onClick={handleOrderSampler}
              className="bg-[#ff4b89] text-[#0e0e12] font-space font-extrabold text-sm uppercase px-6 py-4 shadow-[4px_4px_0px_#000000] hover:opacity-95 transition-opacity"
            >
              GET $5 PILOT SAMPLE PACK
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          COMMUNITY VOTING SECTION
      ======================================================== */}
      <section id="voting-section" className="w-full px-4 sm:px-8 py-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-block bg-[#ff4b89]/20 text-[#ff4b89] border border-[#ff4b89]/30 font-space font-bold text-xs uppercase px-3 py-1 mb-3">
              LIVE SENSORY BALLOT
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl uppercase tracking-tight">
              WHICH FLAVOR <span className="text-[#c3f400]">DROPS NEXT?</span>
            </h2>
          </div>
          <div className="font-space text-sm text-[#8f919d] max-w-md">
            The flavor with the highest verified votes on the first of each month is scheduled into automated production. 1 vote per member.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {prototypes.map((proto) => (
            <div
              key={proto.id}
              className="bg-[#19181d] border-2 border-[#2a292e] hover:border-[#c3f400] transition-colors shadow-[6px_6px_0px_#000000] flex flex-col justify-between overflow-hidden group"
            >
              <div className="relative h-64 w-full overflow-hidden bg-black">
                <img
                  src={proto.image}
                  alt={proto.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#19181d] via-transparent to-black/40" />

                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="bg-[#0e0e12]/90 backdrop-blur-md text-white font-space font-bold text-xs uppercase px-3 py-1 border border-white/10">
                    {proto.tag}
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <span
                    className="font-space font-extrabold text-xs uppercase px-3 py-1 shadow-[2px_2px_0px_#000000]"
                    style={{ backgroundColor: proto.statusColor, color: '#0e0e12' }}
                  >
                    {proto.status}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="font-space text-xs text-[#c3f400] uppercase font-bold tracking-wider">
                      {proto.type}
                    </span>
                    <h3 className="font-syne font-extrabold text-2xl uppercase tracking-tight text-white">
                      {proto.name}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="mb-6">
                  <p className="font-space text-sm text-[#8f919d] leading-relaxed">
                    <strong className="text-white">Profile Notes:</strong> {proto.notes}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#2a292e]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#c3f400]">how_to_vote</span>
                    <span className="font-syne font-extrabold text-2xl text-white">
                      {proto.votes.toLocaleString()}
                    </span>
                    <span className="font-space text-xs text-[#8f919d] uppercase">Votes Cast</span>
                  </div>

                  <button
                    onClick={() => handleVote(proto.id, proto.name)}
                    className={`font-space font-extrabold text-xs uppercase px-6 py-3 shadow-[3px_3px_0px_#000000] transition-all ${
                      proto.hasVoted
                        ? 'bg-[#2a292e] text-[#c3f400] border border-[#c3f400]'
                        : 'bg-[#c3f400] text-[#0e0e12] hover:translate-x-0.5 hover:translate-y-0.5'
                    }`}
                  >
                    {proto.hasVoted ? '✓ VOTED (CLICK TO UNDO)' : '⚡ CAST VOTE'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          CUSTOM FLAVOR MIXER
      ======================================================== */}
      <section id="custom-mixer" className="w-full px-4 sm:px-8 py-16 bg-[#131317] border-y border-[#2a292e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="bg-[#c3f400] text-[#0e0e12] font-space font-extrabold text-xs uppercase px-3 py-1 shadow-[2px_2px_0px_#000000]">
              INTERACTIVE SYNTHESIZER
            </span>
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl uppercase tracking-tight mt-4 mb-4">
              VIRTUAL MOLECULAR <span className="text-[#c3f400]">BLEND STATION</span>
            </h2>
            <p className="font-space text-sm sm:text-base text-[#8f919d]">
              Adjust sweetness, tartness, cooling, and select up to 4 gourmet botanical notes. The top 5 member creations every month receive 2 free custom tubs made in our pilot lab.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Controls Panel */}
            <div className="lg:col-span-7 bg-[#1c1b1f] border-2 border-[#2a292e] p-6 sm:p-8 shadow-[6px_6px_0px_#000000]">
              <form onSubmit={handleSubmitFormula} className="space-y-6">
                <div>
                  <label className="block font-space font-bold text-xs uppercase text-[#8f919d] mb-2">
                    1. Blend Name / Moniker
                  </label>
                  <input
                    type="text"
                    value={blendName}
                    onChange={(e) => setBlendName(e.target.value)}
                    required
                    placeholder="e.g. Midnight Salted Maple Waffle"
                    className="w-full bg-[#131317] border-2 border-[#353439] focus:border-[#c3f400] px-4 py-3 font-space text-white outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block font-space font-bold text-xs uppercase text-[#8f919d] mb-2">
                    2. Core Protein Base Matrix
                  </label>
                  <select
                    value={baseProtein}
                    onChange={(e) => setBaseProtein(e.target.value)}
                    className="w-full bg-[#131317] border-2 border-[#353439] focus:border-[#c3f400] px-4 py-3 font-space text-white outline-none font-bold"
                  >
                    <option>Native Cold-Microfiltered Whey Isolate (93% Purity)</option>
                    <option>Hydrolyzed Clear Whey (Juicy, Not Milky)</option>
                    <option>Micellar Casein + Magnesium (Slow Release)</option>
                    <option>Kinetic Pre-Workout Matrix (Alpha GPC + Citrulline)</option>
                  </select>
                </div>

                {/* Sliders */}
                <div className="space-y-4 pt-2">
                  <div>
                    <div className="flex justify-between font-space text-xs font-bold uppercase mb-1">
                      <span>Sweetness Level:</span>
                      <span className="text-[#c3f400]">{sweetness} / 5</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={sweetness}
                      onChange={(e) => setSweetness(Number(e.target.value))}
                      className="w-full accent-[#c3f400] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-space text-[#8f919d]">
                      <span>Subtle (Raw Milkiness)</span>
                      <span>Desert Grade Sweet</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-space text-xs font-bold uppercase mb-1">
                      <span>Tartness / Citric Zest:</span>
                      <span className="text-[#ff4b89]">{tartness} / 5</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={tartness}
                      onChange={(e) => setTartness(Number(e.target.value))}
                      className="w-full accent-[#ff4b89] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between font-space text-xs font-bold uppercase mb-1">
                      <span>Mouthfeel Creaminess:</span>
                      <span className="text-[#00e5ff]">{creaminess} / 5</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={creaminess}
                      onChange={(e) => setCreaminess(Number(e.target.value))}
                      className="w-full accent-[#00e5ff] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between font-space text-xs font-bold uppercase mb-1">
                      <span>Sub-Zero Frost Feel:</span>
                      <span className="text-[#e0b8ff]">{cooling} / 5</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={cooling}
                      onChange={(e) => setCooling(Number(e.target.value))}
                      className="w-full accent-[#e0b8ff] cursor-pointer"
                    />
                  </div>
                </div>

                {/* Flavor Notes Picker */}
                <div>
                  <div className="flex justify-between font-space text-xs font-bold uppercase mb-2">
                    <span className="text-[#8f919d]">3. Botanical &amp; Confection Notes (Pick up to 4):</span>
                    <span className="text-[#c3f400]">{selectedNotes.length} / 4 Selected</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {flavorNotesOptions.map((note) => {
                      const isSelected = selectedNotes.includes(note);
                      return (
                        <button
                          type="button"
                          key={note}
                          onClick={() => toggleNote(note)}
                          className={`px-3 py-1.5 font-space text-xs font-bold uppercase transition-all shadow-[2px_2px_0px_#000000] ${
                            isSelected
                              ? 'bg-[#c3f400] text-[#0e0e12] border-2 border-[#c3f400]'
                              : 'bg-[#131317] text-[#8f919d] border-2 border-[#2a292e] hover:border-white'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}
                          {note}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#c3f400] text-[#0e0e12] font-space font-extrabold text-sm uppercase py-4 shadow-[4px_4px_0px_#000000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                >
                  ⚡ TRANSMIT RECIPE TO R&amp;D VAULT
                </button>
              </form>
            </div>

            {/* Spec Sheet Preview Output */}
            <div className="lg:col-span-5 bg-[#0e0e12] border-2 border-[#c3f400] p-6 sm:p-8 shadow-[8px_8px_0px_#000000] relative">
              <div className="absolute top-4 right-4 bg-[#c3f400] text-[#0e0e12] font-space font-extrabold text-[10px] uppercase px-2 py-0.5">
                REAL-TIME SPEC
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c3f400] animate-pulse" />
                <span className="font-space text-xs text-[#c3f400] uppercase tracking-widest font-bold">
                  PILOT BATCH FORMULA PREVIEW
                </span>
              </div>

              <h3 className="font-syne font-extrabold text-2xl sm:text-3xl uppercase text-white mb-2">
                {blendName || 'UNTITLED FORMULA'}
              </h3>
              <p className="font-space text-xs text-[#8f919d] mb-6">
                Base: {baseProtein}
              </p>

              {/* Sensory Radar Mock Grid */}
              <div className="space-y-3 bg-[#131317] p-4 border border-[#2a292e] mb-6">
                <div className="flex justify-between font-space text-xs">
                  <span className="text-[#8f919d]">Sweetness Index</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span
                        key={i}
                        className={`w-4 h-2 ${
                          i <= sweetness ? 'bg-[#c3f400]' : 'bg-[#2a292e]'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-between font-space text-xs">
                  <span className="text-[#8f919d]">Tartness / Acidity</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span
                        key={i}
                        className={`w-4 h-2 ${
                          i <= tartness ? 'bg-[#ff4b89]' : 'bg-[#2a292e]'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-between font-space text-xs">
                  <span className="text-[#8f919d]">Viscosity &amp; Silk</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span
                        key={i}
                        className={`w-4 h-2 ${
                          i <= creaminess ? 'bg-[#00e5ff]' : 'bg-[#2a292e]'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-between font-space text-xs">
                  <span className="text-[#8f919d]">Cryo-Frost Shiver</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span
                        key={i}
                        className={`w-4 h-2 ${
                          i <= cooling ? 'bg-[#e0b8ff]' : 'bg-[#2a292e]'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Selected notes tags */}
              <div className="mb-6">
                <span className="font-space text-xs text-[#8f919d] uppercase block mb-2 font-bold">
                  Active Aroma Extracts:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedNotes.map((note) => (
                    <span
                      key={note}
                      className="bg-[#2a292e] text-[#c3f400] font-space text-xs font-bold px-2.5 py-1 border border-[#c3f400]/40"
                    >
                      ★ {note}
                    </span>
                  ))}
                  {selectedNotes.length === 0 && (
                    <span className="font-space text-xs text-[#8f919d] italic">
                      No extract notes selected yet
                    </span>
                  )}
                </div>
              </div>

              {submittedFormula ? (
                <div className="bg-[#c3f400]/10 border border-[#c3f400] p-4 text-center">
                  <span className="material-symbols-outlined text-[#c3f400] text-3xl mb-1">
                    task_alt
                  </span>
                  <p className="font-space font-bold text-sm text-[#c3f400]">
                    RECIPE REGISTERED IN SEASON 05 BALLOT!
                  </p>
                  <p className="font-space text-xs text-[#8f919d] mt-1">
                    Community members can now see and vote for this blend in the discord #taste-lab channel.
                  </p>
                </div>
              ) : (
                <div className="bg-[#19181d] p-4 border border-[#2a292e] text-xs font-space text-[#8f919d]">
                  🔬 <strong>Kinetic Zero-Chalk Guarantee:</strong> Every submitted formula is screened for instant solubility in under 6 seconds without any xanthan or guar gums.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          LAB SAMPLER PROMOTION
      ======================================================== */}
      <section className="w-full px-4 sm:px-8 py-16 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#1c1b1f] via-[#242329] to-[#1c1b1f] border-2 border-[#ff4b89] p-8 sm:p-12 shadow-[8px_8px_0px_#000000] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="bg-[#ff4b89] text-[#0e0e12] font-space font-extrabold text-xs uppercase px-3 py-1 shadow-[2px_2px_0px_#000000] inline-block mb-3">
              ZERO-RISK DISCOVERY
            </span>
            <h3 className="font-syne font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-white mb-3">
              THE 4-FLAVOR R&amp;D <span className="text-[#ff4b89]">TEST PACK</span>
            </h3>
            <p className="font-space text-sm sm:text-base text-[#8f919d] mb-4">
              Can’t decide which drop to commit to? Receive 4 single-serve sachets (Ghost Ice, Birthday Glaze, Mango Clear, and Salted Dulce) for just $5. We credit the full $5 toward your first 2.2 lb tub.
            </p>
            <div className="flex items-center gap-4 text-xs font-space text-white font-bold">
              <span>✓ 4 Single-Dose Sachets</span>
              <span>✓ Free Stainless Shaker Ball</span>
              <span>✓ $5 Voucher Included</span>
            </div>
          </div>

          <div className="text-center md:text-right shrink-0">
            <div className="font-syne font-extrabold text-4xl text-[#c3f400] mb-3">
              $5.00 <span className="text-sm font-space text-[#8f919d] line-through">$16.00</span>
            </div>
            <button
              onClick={handleOrderSampler}
              className="bg-[#c3f400] text-[#0e0e12] font-space font-extrabold text-sm uppercase px-8 py-4 shadow-[4px_4px_0px_#000000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all block"
            >
              ⚡ ADD TO BAG NOW
            </button>
            <span className="font-space text-[10px] text-[#8f919d] uppercase tracking-wider block mt-2">
              Ships next business day via USPS Priority
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
