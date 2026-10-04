import React, { useState } from 'react';
import { ScreenType } from '../types';
import { CreatorWatermarkSection } from '../components/CreatorWatermarkSection';

interface AboutScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenToast: (msg: string) => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onNavigate, onOpenToast }) => {
  const [activeBatchCoa, setActiveBatchCoa] = useState<'014' | '013' | '012'>('014');

  const coaData = {
    '014': {
      product: 'HYPER-ISOLATE // BIRTHDAY GLAZE #014',
      date: 'SEPTEMBER 28, 2026',
      lab: 'EUROFINS BIOANALYTICAL USA',
      proteinPurity: '93.42% (Label claim: 90.0%)',
      lead: '< 0.003 PPM (Pass)',
      mercury: '< 0.001 PPM (Pass)',
      arsenic: '< 0.004 PPM (Pass)',
      cadmium: '< 0.002 PPM (Pass)',
      bannedSubstances: 'NEGATIVE (274 WADA COMPOUNDS SCREENED)',
      eColiSalmonella: 'ABSENT / 25g (Pass)',
      status: 'VERIFIED GOLD STANDARD',
    },
    '013': {
      product: 'PSYCHIC SURGE // ELECTRIC BLUEBERRY #013',
      date: 'SEPTEMBER 12, 2026',
      lab: 'INFORMED-SPORT UK TESTING',
      proteinPurity: 'N/A (PRE-WORKOUT MATRIX)',
      lead: '< 0.005 PPM (Pass)',
      mercury: '< 0.001 PPM (Pass)',
      arsenic: '< 0.005 PPM (Pass)',
      cadmium: '< 0.002 PPM (Pass)',
      bannedSubstances: 'NEGATIVE (CERTIFIED FOR OLYMPIC USE)',
      eColiSalmonella: 'ABSENT / 25g (Pass)',
      status: 'VERIFIED GOLD STANDARD',
    },
    '012': {
      product: 'RAW ISO CLEAR // MANGO PASSION #012',
      date: 'AUGUST 22, 2026',
      lab: 'COVANCE SPECIALTY LABS',
      proteinPurity: '91.80% (Label claim: 88.0%)',
      lead: '< 0.002 PPM (Pass)',
      mercury: '< 0.001 PPM (Pass)',
      arsenic: '< 0.003 PPM (Pass)',
      cadmium: '< 0.001 PPM (Pass)',
      bannedSubstances: 'NEGATIVE (NO PROHIBITED ADULTERANTS)',
      eColiSalmonella: 'ABSENT / 25g (Pass)',
      status: 'VERIFIED GOLD STANDARD',
    },
  };

  const currentCoa = coaData[activeBatchCoa];

  return (
    <div className="flex flex-col w-full overflow-hidden bg-[#0e0e12] text-[#e4e1e7] pb-24">
      {/* ========================================================
          HERO MANIFESTO
      ======================================================== */}
      <section className="relative w-full px-4 sm:px-8 py-16 lg:py-24 border-b border-[#2a292e] overflow-hidden">
        <div className="absolute top-0 right-10 w-[550px] h-[550px] bg-[#c3f400]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute -bottom-10 left-1/3 w-[400px] h-[400px] bg-[#ff4b89]/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-[#c3f400] text-[#0e0e12] font-space font-extrabold text-xs uppercase px-3 py-1 shadow-[2px_2px_0px_#000000]">
              THE KINETIC MANIFESTO
            </span>
            <span className="font-space text-xs text-[#8f919d] tracking-widest uppercase">
              ZERO COMPROMISE BIO-ENGINEERING
            </span>
          </div>

          <h1 className="font-syne font-extrabold text-4xl sm:text-6xl lg:text-8xl uppercase tracking-tighter leading-[0.9] mb-8">
            NOT YOUR DAD&apos;S <br />
            <span className="text-[#ff4b89]">CHALKY POWDER.</span>
          </h1>

          <p className="max-w-3xl font-space text-lg sm:text-xl text-[#8f919d] leading-relaxed mb-10">
            For 30 years, legacy fitness brands sold you bitter, high-heat acid-treated whey loaded with xanthan and guar gums to mask poor solubility. You choked down foam and suffered bloating before squat day. We tore down the entire supply chain to build kinetic sports nutrition for the modern athlete.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#19181d] border-2 border-[#2a292e] p-5 shadow-[4px_4px_0px_#000000]">
              <div className="font-syne font-extrabold text-3xl sm:text-4xl text-[#c3f400] mb-1">
                93.4%
              </div>
              <div className="font-space text-xs uppercase text-[#8f919d]">
                Native Protein Purity
              </div>
            </div>
            <div className="bg-[#19181d] border-2 border-[#2a292e] p-5 shadow-[4px_4px_0px_#000000]">
              <div className="font-syne font-extrabold text-3xl sm:text-4xl text-[#ff4b89] mb-1">
                0 GUMS
              </div>
              <div className="font-space text-xs uppercase text-[#8f919d]">
                Zero Bloat / No Xanthan
              </div>
            </div>
            <div className="bg-[#19181d] border-2 border-[#2a292e] p-5 shadow-[4px_4px_0px_#000000]">
              <div className="font-syne font-extrabold text-3xl sm:text-4xl text-[#00e5ff] mb-1">
                &lt; 6 SEC
              </div>
              <div className="font-space text-xs uppercase text-[#8f919d]">
                Instant Dissolution
              </div>
            </div>
            <div className="bg-[#19181d] border-2 border-[#2a292e] p-5 shadow-[4px_4px_0px_#000000]">
              <div className="font-syne font-extrabold text-3xl sm:text-4xl text-[#e0b8ff] mb-1">
                100%
              </div>
              <div className="font-space text-xs uppercase text-[#8f919d]">
                Public COA Testing
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          BRUTALIST COMPARISON PILLARS
      ======================================================== */}
      <section className="w-full px-4 sm:px-8 py-16 max-w-7xl mx-auto">
        <h2 className="font-syne font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-center mb-12">
          THE <span className="text-[#c3f400]">KINETIC PILLARS</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#19181d] border-2 border-[#2a292e] p-8 shadow-[6px_6px_0px_#000000] relative">
            <span className="font-syne font-extrabold text-6xl text-[#2a292e] absolute top-4 right-4">
              01
            </span>
            <div className="w-12 h-12 bg-[#c3f400] text-[#0e0e12] flex items-center justify-center font-bold mb-6">
              <span className="material-symbols-outlined">filter_drama</span>
            </div>
            <h3 className="font-syne font-extrabold text-xl uppercase mb-3 text-white">
              Cold Cross-Flow Microfiltration
            </h3>
            <p className="font-space text-sm text-[#8f919d] leading-relaxed">
              Standard brands process whey using boiling chemical acid baths that denature protein chains and create foul sulfur notes. We use cold ceramic membrane filtration at 4°C to preserve bio-active immunoglobulins and lactoferrin.
            </p>
          </div>

          <div className="bg-[#19181d] border-2 border-[#2a292e] p-8 shadow-[6px_6px_0px_#000000] relative">
            <span className="font-syne font-extrabold text-6xl text-[#2a292e] absolute top-4 right-4">
              02
            </span>
            <div className="w-12 h-12 bg-[#ff4b89] text-[#0e0e12] flex items-center justify-center font-bold mb-6">
              <span className="material-symbols-outlined">health_and_safety</span>
            </div>
            <h3 className="font-syne font-extrabold text-xl uppercase mb-3 text-white">
              Zero Artificial Gums or Fillers
            </h3>
            <p className="font-space text-sm text-[#8f919d] leading-relaxed">
              Big box supplements pump their powder full of xanthan gum, maltodextrin, and carrageenan to create fake thickness and inflate profit margins. Protein X is 100% gum-free: smooth as silk milk with zero gut distress.
            </p>
          </div>

          <div className="bg-[#19181d] border-2 border-[#2a292e] p-8 shadow-[6px_6px_0px_#000000] relative">
            <span className="font-syne font-extrabold text-6xl text-[#2a292e] absolute top-4 right-4">
              03
            </span>
            <div className="w-12 h-12 bg-[#00e5ff] text-[#0e0e12] flex items-center justify-center font-bold mb-6">
              <span className="material-symbols-outlined">science</span>
            </div>
            <h3 className="font-syne font-extrabold text-xl uppercase mb-3 text-white">
              Real Culinary Confection Notes
            </h3>
            <p className="font-space text-sm text-[#8f919d] leading-relaxed">
              We collaborate with Michelin-trained pastry chefs and food scientists. Freeze-dried strawberries, real cinnamon crisps, and sea salt flakes replace generic industrial chemical flavor bottles.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          PUBLIC COA AUDIT STATION
      ======================================================== */}
      <section className="w-full px-4 sm:px-8 py-16 bg-[#131317] border-y border-[#2a292e]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="bg-[#c3f400] text-[#0e0e12] font-space font-extrabold text-xs uppercase px-3 py-1 shadow-[2px_2px_0px_#000000] inline-block mb-3">
                TRANSPARENCY DATABASE
              </span>
              <h2 className="font-syne font-extrabold text-3xl sm:text-5xl uppercase tracking-tight">
                3RD PARTY LAB <span className="text-[#c3f400]">CERTIFICATES (COA)</span>
              </h2>
            </div>
            <div className="font-space text-sm text-[#8f919d] max-w-md">
              Every production lot undergoes independent ISO 17025 accredited laboratory assays before leaving the facility. Select a batch below:
            </div>
          </div>

          {/* Batch Selector Tabs */}
          <div className="flex flex-wrap gap-3 mb-8">
            {(['014', '013', '012'] as const).map((batch) => (
              <button
                key={batch}
                onClick={() => setActiveBatchCoa(batch)}
                className={`font-space font-extrabold text-xs uppercase px-6 py-3 shadow-[3px_3px_0px_#000000] transition-all ${
                  activeBatchCoa === batch
                    ? 'bg-[#c3f400] text-[#0e0e12] border-2 border-[#c3f400]'
                    : 'bg-[#1c1b1f] text-[#8f919d] border-2 border-[#2a292e] hover:border-white'
                }`}
              >
                BATCH #{batch} ANALYSIS
              </button>
            ))}
          </div>

          {/* COA Certificate Display */}
          <div className="bg-[#0e0e12] border-2 border-[#353439] p-6 sm:p-10 shadow-[8px_8px_0px_#000000] relative">
            <div className="flex flex-wrap items-center justify-between border-b border-[#2a292e] pb-6 mb-6 gap-4">
              <div>
                <span className="font-space text-xs text-[#c3f400] uppercase font-bold tracking-wider">
                  OFFICIAL INDEPENDENT AUDIT REPORT
                </span>
                <h3 className="font-syne font-extrabold text-2xl sm:text-3xl text-white uppercase mt-1">
                  {currentCoa.product}
                </h3>
              </div>
              <div className="text-right">
                <span className="inline-block bg-[#c3f400] text-[#0e0e12] font-space font-bold text-xs uppercase px-3 py-1 shadow-[2px_2px_0px_#000000]">
                  {currentCoa.status}
                </span>
                <div className="font-space text-xs text-[#8f919d] mt-1">
                  Tested: {currentCoa.date} by {currentCoa.lab}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-[#19181d] p-4 border border-[#2a292e]">
                <div className="font-space text-xs text-[#8f919d] uppercase mb-1">
                  Protein Purity Assay
                </div>
                <div className="font-syne font-extrabold text-lg text-white">
                  {currentCoa.proteinPurity}
                </div>
              </div>

              <div className="bg-[#19181d] p-4 border border-[#2a292e]">
                <div className="font-space text-xs text-[#8f919d] uppercase mb-1">
                  Heavy Metals (Lead / Arsenic)
                </div>
                <div className="font-syne font-extrabold text-lg text-[#c3f400]">
                  {currentCoa.lead} / {currentCoa.arsenic}
                </div>
              </div>

              <div className="bg-[#19181d] p-4 border border-[#2a292e]">
                <div className="font-space text-xs text-[#8f919d] uppercase mb-1">
                  Mercury &amp; Cadmium
                </div>
                <div className="font-syne font-extrabold text-lg text-[#c3f400]">
                  {currentCoa.mercury} / {currentCoa.cadmium}
                </div>
              </div>

              <div className="bg-[#19181d] p-4 border border-[#2a292e] md:col-span-2">
                <div className="font-space text-xs text-[#8f919d] uppercase mb-1">
                  WADA 2026 Prohibited Substances
                </div>
                <div className="font-syne font-extrabold text-lg text-white">
                  {currentCoa.bannedSubstances}
                </div>
              </div>

              <div className="bg-[#19181d] p-4 border border-[#2a292e]">
                <div className="font-space text-xs text-[#8f919d] uppercase mb-1">
                  Microbiological Screen
                </div>
                <div className="font-syne font-extrabold text-lg text-[#c3f400]">
                  {currentCoa.eColiSalmonella}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#2a292e] flex flex-wrap items-center justify-between gap-4">
              <span className="font-space text-xs text-[#8f919d]">
                Digital Verification Hash: SHA256: 8f9b4c09d3e8e2...verified on blockchain registry
              </span>
              <button
                onClick={() =>
                  onOpenToast(`✓ CERTIFICATE OF ANALYSIS BATCH #${activeBatchCoa} DOWNLOADED!`)
                }
                className="bg-[#1c1b1f] border border-[#c3f400] text-[#c3f400] font-space font-extrabold text-xs uppercase px-5 py-2.5 shadow-[3px_3px_0px_#000000] hover:bg-[#c3f400] hover:text-[#0e0e12] transition-colors"
              >
                DOWNLOAD FULL PDF REPORT ↗
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          ZERO-CHALK MONEY-BACK GUARANTEE CALLOUT
      ======================================================== */}
      <section className="w-full px-4 sm:px-8 py-16 max-w-7xl mx-auto">
        <div className="bg-[#c3f400] text-[#0e0e12] p-8 sm:p-12 shadow-[8px_8px_0px_#000000] flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-syne font-extrabold text-3xl sm:text-5xl uppercase tracking-tighter mb-3">
              THE ZERO-CHALK CONTRACT
            </h3>
            <p className="font-space font-medium text-base sm:text-lg max-w-2xl text-[#1e1e24] leading-relaxed">
              If your Protein X tub leaves gritty sediment at the bottom of your shaker cup, or causes gastrointestinal bloating within 30 days of ordering: send one email. We give you a 100% full refund and you don&apos;t even have to ship the tub back.
            </p>
          </div>

          <button
            onClick={() => onNavigate('shop-drops')}
            className="shrink-0 bg-[#0e0e12] text-white font-space font-extrabold text-sm uppercase px-8 py-4 shadow-[4px_4px_0px_#ffffff] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            EXPERIENCE THE SHIFT →
          </button>
        </div>
      </section>

      {/* ========================================================
          OFFICIAL CREATOR WATERMARK & DIRECT CONTACT TERMINAL
          (Proof of Authorship: Yasharth Dixit)
      ======================================================== */}
      <CreatorWatermarkSection onOpenToast={onOpenToast} />
    </div>
  );
};
