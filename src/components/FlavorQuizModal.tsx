import React, { useState } from 'react';
import { Product } from '../types';

interface FlavorQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStackToBag: (stackProducts: Product[], discountCode: string) => void;
}

export const FlavorQuizModal: React.FC<FlavorQuizModalProps> = ({
  isOpen,
  onClose,
  onAddStackToBag
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [split, setSplit] = useState('');
  const [flavorArchetype, setFlavorArchetype] = useState('');
  const [digestiveTarget, setDigestiveTarget] = useState('');
  const [dailyTiming, setDailyTiming] = useState('');
  const [completed, setCompleted] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSplit('');
    setFlavorArchetype('');
    setDigestiveTarget('');
    setDailyTiming('');
    setCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-[#131317] border-2 border-[#c3f400] shadow-[8px_8px_0px_#ff4b89] rounded-2xl overflow-hidden z-10">
        {/* Modal Top Header */}
        <div className="p-6 bg-[#1b1b1f] border-b border-[#2a292e] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#c3f400]">psychology</span>
            <span className="font-syne text-lg font-extrabold uppercase text-[#e4e1e7]">
              60-SECOND FORMULA ENGINE
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded bg-[#2a292e] hover:bg-[#353439] flex items-center justify-center text-[#e4e1e7]"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Modal Content */}
        {!completed ? (
          <div className="p-6 sm:p-8">
            {/* Step Progress Pills */}
            <div className="flex items-center justify-between gap-2 mb-6">
              {[
                { step: 1, label: 'SPLIT' },
                { step: 2, label: 'FLAVOR' },
                { step: 3, label: 'DIGESTION' },
                { step: 4, label: 'TIMING' }
              ].map((s) => (
                <div key={s.step} className="flex-1 text-center">
                  <div
                    className={`h-2 rounded-full mb-1.5 transition-all ${
                      currentStep >= s.step ? 'bg-[#c3f400]' : 'bg-[#2a292e]'
                    }`}
                  />
                  <span
                    className={`font-space font-bold text-[10px] uppercase ${
                      currentStep === s.step ? 'text-[#c3f400]' : 'text-[#c4c9ac]'
                    }`}
                  >
                    STEP 0{s.step} • {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Step 1: Workout Split */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="font-syne text-xl font-bold uppercase text-[#e4e1e7]">
                  WHAT IS YOUR PRIMARY TRAINING FOCUS?
                </h3>
                <p className="font-space text-sm text-[#c4c9ac]">
                  We formulate protein density based on your cellular repair requirements.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { id: 'power', title: 'Powerlifting / Heavy Iron', desc: 'Max mechanical damage, high leucine demands' },
                    { id: 'hybrid', title: 'Hybrid Endurance / Run', desc: 'High glycogen expenditure, lean recovery' },
                    { id: 'hypertrophy', title: 'High-Volume Bodybuilding', desc: 'Peak muscle protein synthesis focus' },
                    { id: 'calisthenics', title: 'Pilates / Calisthenics / Movement', desc: 'Zero bloat, light gastric transit' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSplit(opt.id)}
                      className={`p-4 rounded-lg border text-left transition-all ${
                        split === opt.id
                          ? 'border-[#c3f400] bg-[#1f1f23] shadow-[3px_3px_0px_#c3f400]'
                          : 'border-[#2a292e] bg-[#1b1b1f] hover:bg-[#1f1f23]'
                      }`}
                    >
                      <div className="font-syne font-bold text-sm text-[#e4e1e7] uppercase mb-1">
                        {opt.title}
                      </div>
                      <div className="font-space text-xs text-[#c4c9ac]">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Flavor Archetype */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="font-syne text-xl font-bold uppercase text-[#e4e1e7]">
                  WHAT FLAVOR ARCHETYPE MAKES YOUR MOUTH WATER?
                </h3>
                <p className="font-space text-sm text-[#c4c9ac]">
                  No chalk allowed. Tell us your exact palette craving.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { id: 'sour', title: 'Mouth-Puckering Sour Candy 💥', desc: 'Watermelon jolly, tart blue raspberry, sour apple' },
                    { id: 'bakery', title: 'Glazed Street Bakery 🥐', desc: 'Cinnamon roll drip, salted caramel brioche, churros' },
                    { id: 'matcha', title: 'Ceremonial Japanese Matcha 🍵', desc: 'Earthy green tea with sweet mochi cream notes' },
                    { id: 'clear', title: 'Refreshing Clear Tropical Juice 🥭', desc: 'Water-clear mango passion, pink lemonade sticks' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setFlavorArchetype(opt.id)}
                      className={`p-4 rounded-lg border text-left transition-all ${
                        flavorArchetype === opt.id
                          ? 'border-[#ff4b89] bg-[#1f1f23] shadow-[3px_3px_0px_#ff4b89]'
                          : 'border-[#2a292e] bg-[#1b1b1f] hover:bg-[#1f1f23]'
                      }`}
                    >
                      <div className="font-syne font-bold text-sm text-[#e4e1e7] uppercase mb-1">
                        {opt.title}
                      </div>
                      <div className="font-space text-xs text-[#c4c9ac]">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Digestive Target */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="font-syne text-xl font-bold uppercase text-[#e4e1e7]">
                  HOW DOES YOUR STOMACH HANDLE TYPICAL PROTEIN?
                </h3>
                <p className="font-space text-sm text-[#c4c9ac]">
                  We deploy clinical DigeZyme® multi-enzyme complexes to eliminate gas & heaviness.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { id: 'sensitive', title: 'Severe Lactose Sensitivity 🥛', desc: 'Gets bloated or sluggish from cheap whey concentrate' },
                    { id: 'iron', title: 'Iron Gut / Zero Digestion Issues ⚡', desc: 'Can digest anything, focus purely on peak macros' },
                    { id: 'clear_only', title: 'Prefer Water-Clear Drinks Only 💧', desc: 'Hate milky thick textures during summer & hot sessions' },
                    { id: 'clean', title: 'Zero Artificial Aftertaste Obsessed 🌿', desc: 'Must be naturally sweetened with organic reb-M stevia' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setDigestiveTarget(opt.id)}
                      className={`p-4 rounded-lg border text-left transition-all ${
                        digestiveTarget === opt.id
                          ? 'border-[#c3f400] bg-[#1f1f23] shadow-[3px_3px_0px_#c3f400]'
                          : 'border-[#2a292e] bg-[#1b1b1f] hover:bg-[#1f1f23]'
                      }`}
                    >
                      <div className="font-syne font-bold text-sm text-[#e4e1e7] uppercase mb-1">
                        {opt.title}
                      </div>
                      <div className="font-space text-xs text-[#c4c9ac]">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Daily Timing */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="font-syne text-xl font-bold uppercase text-[#e4e1e7]">
                  WHEN DO YOU NEED YOUR STRONGEST BOOST?
                </h3>
                <p className="font-space text-sm text-[#c4c9ac]">
                  Completing your synergistic daily stack protocol.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { id: 'morning', title: 'Pre-Workout Morning Ignition ⚡', desc: 'Caffeine, pump flow & rapid muscle saturation' },
                    { id: 'post', title: 'Post-Workout Immediate Recovery 🏋️', desc: 'Instant nitrogen spike into battered muscle fibers' },
                    { id: 'all_day', title: 'All-Day Sustained Hydration 💦', desc: 'Real Himalayan minerals & zero-sugar energy' },
                    { id: 'night', title: 'Nighttime Sleep & Anabolic Drip 🌙', desc: '8-hour slow release casein with magnesium' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setDailyTiming(opt.id)}
                      className={`p-4 rounded-lg border text-left transition-all ${
                        dailyTiming === opt.id
                          ? 'border-[#c3f400] bg-[#1f1f23] shadow-[3px_3px_0px_#c3f400]'
                          : 'border-[#2a292e] bg-[#1b1b1f] hover:bg-[#1f1f23]'
                      }`}
                    >
                      <div className="font-syne font-bold text-sm text-[#e4e1e7] uppercase mb-1">
                        {opt.title}
                      </div>
                      <div className="font-space text-xs text-[#c4c9ac]">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-[#2a292e] mt-6">
              {currentStep > 1 ? (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-4 py-2 bg-[#2a292e] text-[#c4c9ac] hover:text-[#e4e1e7] font-space font-bold text-xs uppercase rounded"
                >
                  ← BACK
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && !split) ||
                  (currentStep === 2 && !flavorArchetype) ||
                  (currentStep === 3 && !digestiveTarget) ||
                  (currentStep === 4 && !dailyTiming)
                }
                className="px-6 py-2.5 bg-[#c3f400] disabled:opacity-40 text-[#161e00] font-syne font-extrabold text-xs uppercase rounded shadow-[3px_3px_0px_#ff4b89] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all flex items-center gap-1.5"
              >
                <span>{currentStep === 4 ? 'DIAL IN MY STACK' : 'NEXT STEP'}</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        ) : (
          /* Quiz Results: Personalized Stack recommendation */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <span className="px-3 py-1 bg-[#c3f400] text-[#161e00] font-syne font-extrabold text-xs uppercase rounded shadow-[2px_2px_0px_#000000]">
                FORMULA PROTOCOL GENERATED
              </span>
              <h3 className="font-syne text-2xl font-extrabold uppercase text-[#e4e1e7]">
                YOUR CUSTOM KINETIC TRI-STACK
              </h3>
              <p className="font-space text-xs text-[#c4c9ac] max-w-md mx-auto">
                Based on your split and sensory preferences, our formulation matrix matched you to this high-octane 3-part routine.
              </p>
            </div>

            {/* Stack Match Cards */}
            <div className="space-y-2.5 bg-[#1b1b1f] p-4 rounded-xl border border-[#2a292e]">
              <div className="flex items-center justify-between bg-[#131317] p-3 rounded border border-[#2a292e]">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#ff4b89]">verified</span>
                  <div>
                    <span className="font-syne font-bold text-xs uppercase text-[#e4e1e7] block">
                      Sour Watermelon Crush Hydro Isolate
                    </span>
                    <span className="font-space text-[10px] text-[#c4c9ac]">
                      Slot 01: Cold micro-filtered tissue builder
                    </span>
                  </div>
                </div>
                <span className="font-space font-bold text-xs text-[#c3f400] bg-[#1f1f23] px-2 py-0.5 rounded">
                  MATCH 98%
                </span>
              </div>

              <div className="flex items-center justify-between bg-[#131317] p-3 rounded border border-[#2a292e]">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#ff4b89]">verified</span>
                  <div>
                    <span className="font-syne font-bold text-xs uppercase text-[#e4e1e7] block">
                      Hyper-Hydrate Electrolyte Fizz Pink Lemonade
                    </span>
                    <span className="font-space text-[10px] text-[#c4c9ac]">
                      Slot 02: Real Himalayan salt & magnesium
                    </span>
                  </div>
                </div>
                <span className="font-space font-bold text-xs text-[#c3f400] bg-[#1f1f23] px-2 py-0.5 rounded">
                  MATCH 95%
                </span>
              </div>

              <div className="flex items-center justify-between bg-[#131317] p-3 rounded border border-[#2a292e]">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#ff4b89]">verified</span>
                  <div>
                    <span className="font-syne font-bold text-xs uppercase text-[#e4e1e7] block">
                      Sour Peach Ring Creatine Gummies (120ct)
                    </span>
                    <span className="font-space text-[10px] text-[#c4c9ac]">
                      Slot 03: 5g pure Creapure cellular fuel
                    </span>
                  </div>
                </div>
                <span className="font-space font-bold text-xs text-[#c3f400] bg-[#1f1f23] px-2 py-0.5 rounded">
                  MATCH 99%
                </span>
              </div>
            </div>

            {/* Savings & Voucher Promo Banner */}
            <div className="bg-[#c3f400]/10 border border-[#c3f400] p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="font-space font-bold text-[11px] text-[#c4c9ac] uppercase block">
                  STACK DISCOUNTS & REWARDS
                </span>
                <div className="font-syne font-extrabold text-xl text-[#c3f400]">
                  SAVE $24.50 + FREE SHAKER
                </div>
                <span className="text-xs text-[#e4e1e7]">
                  Code <strong className="text-[#c3f400]">TASTE15</strong> (15% Extra Off) automatically applied
                </span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onAddStackToBag([], 'TASTE15');
                }}
                className="w-full sm:w-auto px-6 py-3 bg-[#c3f400] text-[#161e00] font-syne font-extrabold text-xs uppercase rounded shadow-[3px_3px_0px_#ff4b89] hover:bg-[#abd600] transition-all"
              >
                ADD COMPLETE STACK TO BAG
              </button>
            </div>

            <div className="text-center">
              <button
                onClick={handleReset}
                className="font-space text-xs text-[#c4c9ac] hover:text-[#c3f400] underline"
              >
                Retake Formula Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
