import React, { useState } from 'react';
import { ScreenType } from '../types';
import { LOGO_URL } from '../data/mockData';
import { CREATOR_INFO } from '../data/creatorData';

interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenToast: (msg: string) => void;
  onOpenProfile?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenToast, onOpenProfile }) => {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setJoined(true);
    onOpenToast('💥 VIP ACCESS GRANTED! USE CODE: GENZX FOR 20% OFF');
  };

  return (
    <footer className="w-full bg-[#0e0e12] border-t border-[#1f1f23]">
      {/* Newsletter VIP Banner Strip */}
      <div className="w-full bg-[#1f1f23] px-4 sm:px-8 py-10 sm:py-12 border-b border-[#2a292e]">
        <div className="w-full mx-auto max-w-7xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="max-w-xl">
            <span className="inline-block px-2.5 py-1 bg-[#c3f400] text-[#161e00] font-space font-bold text-xs uppercase mb-2 rounded shadow-[2px_2px_0px_#000000]">
              VIP Access
            </span>
            <h3 className="font-syne text-2xl font-bold uppercase text-[#e4e1e7] mb-1">
              DROP YOUR EMAIL FOR SECRET FLAVORS 💥
            </h3>
            <p className="font-space text-sm text-[#c4c9ac]">
              Unreleased drops, test-batch invitations, and zero spam. Pure fuel.
            </p>
          </div>

          {joined ? (
            <div className="bg-[#c3f400]/20 border border-[#c3f400] p-4 rounded text-center">
              <span className="font-space font-bold text-[#c3f400] text-sm uppercase block">
                ✓ YOU'RE ON THE DROP VIP LIST!
              </span>
              <span className="text-xs text-[#e4e1e7]">
                Check inbox for your VIP key. 20% code <strong className="text-[#c3f400]">GENZX</strong> is ready in your cart.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full lg:w-auto flex flex-col sm:flex-row gap-2">
              <input
                className="w-full sm:w-80 bg-[#353439] px-4 py-3 font-space font-bold text-xs text-[#e4e1e7] placeholder:text-[#c4c9ac] focus:outline-none focus:ring-2 focus:ring-[#c3f400] rounded shadow-[2px_2px_0px_#000000]"
                placeholder="ENTER YOUR EMAIL HERE"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                className="bg-[#c3f400] hover:bg-[#abd600] text-[#161e00] font-space font-bold text-sm uppercase px-8 py-3 rounded shadow-[3px_3px_0px_#ff4b89] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                type="submit"
              >
                JOIN
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer Sitemap Grid */}
      <div className="w-full px-4 sm:px-8 py-14 bg-[#1b1b1f]">
        <div className="w-full mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img alt="Protein X Logo" className="h-8 w-auto object-contain" src={LOGO_URL} />
              <span className="font-syne text-2xl font-extrabold tracking-tight uppercase text-[#e4e1e7]">
                PROTEIN X
              </span>
            </div>
            <p className="font-space text-xs text-[#c4c9ac] leading-relaxed">
              Supplements re-engineered for the modern kinetic athlete. Zero clinical nonsense. Maximum macro dominance.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {['TIKTOK', 'INSTAGRAM', 'DISCORD', 'SPOTIFY'].map((social) => (
                <button
                  key={social}
                  onClick={() => onOpenToast(`Opening official ${social} feed...`)}
                  className="px-2.5 py-1 bg-[#353439] hover:bg-[#c3f400] hover:text-[#161e00] font-space font-bold text-[11px] text-[#c3f400] rounded shadow-[2px_2px_0px_#000000] transition-colors"
                >
                  {social}
                </button>
              ))}
            </div>
          </div>

          {/* Col 2: Collections */}
          <div className="flex flex-col gap-2.5">
            <span className="font-space font-bold text-base uppercase text-[#e4e1e7] mb-1">
              COLLECTIONS
            </span>
            <button
              onClick={() => onNavigate('shop-drops')}
              className="text-left font-space text-sm text-[#c4c9ac] hover:text-[#c3f400] transition-colors"
            >
              Whey Isolate Series
            </button>
            <button
              onClick={() => onNavigate('shop-drops')}
              className="text-left font-space text-sm text-[#c4c9ac] hover:text-[#c3f400] transition-colors"
            >
              Pre-Workout Fuel
            </button>
            <button
              onClick={() => onNavigate('shop-drops')}
              className="text-left font-space text-sm text-[#c4c9ac] hover:text-[#c3f400] transition-colors"
            >
              Creatine & Gummies
            </button>
            <button
              onClick={() => onNavigate('shop-drops')}
              className="text-left font-space text-sm text-[#c4c9ac] hover:text-[#c3f400] transition-colors"
            >
              Limited Merch Drops
            </button>
          </div>

          {/* Col 3: Transparency */}
          <div className="flex flex-col gap-2.5">
            <span className="font-space font-bold text-base uppercase text-[#e4e1e7] mb-1">
              TRANSPARENCY
            </span>
            <div className="flex items-center gap-2 text-[#c4c9ac] font-space text-xs">
              <span className="w-2 h-2 rounded-full bg-[#c3f400]"></span> 100% Informed-Choice Tested
            </div>
            <div className="flex items-center gap-2 text-[#c4c9ac] font-space text-xs">
              <span className="w-2 h-2 rounded-full bg-[#c3f400]"></span> Zero Artificial Dyes
            </div>
            <div className="flex items-center gap-2 text-[#c4c9ac] font-space text-xs">
              <span className="w-2 h-2 rounded-full bg-[#c3f400]"></span> Lab Batch Verified
            </div>
            <div className="flex items-center gap-2 text-[#c4c9ac] font-space text-xs">
              <span className="w-2 h-2 rounded-full bg-[#c3f400]"></span> Carbon Neutral Freight
            </div>
          </div>

          {/* Col 4: X-Protocol */}
          <div className="flex flex-col gap-2.5">
            <span className="font-space font-bold text-base uppercase text-[#e4e1e7] mb-1">
              X-PROTOCOL
            </span>
            <button
              onClick={() => onNavigate('taste-lab')}
              className="text-left font-space text-sm text-[#c4c9ac] hover:text-[#c3f400] transition-colors"
            >
              Flavor R&D Archive
            </button>
            <button
              onClick={() => onNavigate('x-club-community')}
              className="text-left font-space text-sm text-[#c4c9ac] hover:text-[#c3f400] transition-colors"
            >
              Athlete Leaderboard
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="text-left font-space text-sm text-[#c4c9ac] hover:text-[#c3f400] transition-colors"
            >
              The Clean Manifesto
            </button>
            <button
              onClick={() => {
                if (onOpenProfile) {
                  onOpenProfile();
                } else {
                  onOpenToast('Opening Order History & Tracking...');
                }
              }}
              className="text-left font-space text-sm text-[#c4c9ac] hover:text-[#c3f400] transition-colors"
            >
              Track Drop Orders &amp; History
            </button>
          </div>
        </div>
      </div>

      {/* Creator & Developer Direct Contact Watermark Banner */}
      <div className="w-full bg-[#121217] border-t-2 border-b border-[#c3f400] px-4 sm:px-8 py-8">
        <div className="w-full mx-auto max-w-7xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#c3f400] bg-[#1a1922] flex items-center justify-center font-syne font-black text-lg text-[#c3f400] shadow-[0_0_15px_rgba(195,244,0,0.25)]">
              YD
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="bg-[#c3f400] text-[#0e0e12] font-space font-extrabold text-[10px] uppercase px-2 py-0.5 shadow-[1px_1px_0px_#000000]">
                  OFFICIAL CREATOR WATERMARK
                </span>
                <span className="font-space font-bold text-xs text-[#00e5ff] uppercase tracking-wider">
                  {CREATOR_INFO.name} • {CREATOR_INFO.role}
                </span>
              </div>
              <p className="font-space text-xs text-[#a7a9b6] max-w-xl">
                Direct client contact terminal. For commissions, architecture inquiries, or engineering partnerships:
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-1.5 font-space text-xs">
                <a 
                  href={CREATOR_INFO.mailtoUrl}
                  className="font-mono text-[#c3f400] hover:underline font-bold flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-xs">mail</span>
                  {CREATOR_INFO.email}
                </a>
                <span className="text-[#393848]">•</span>
                <a 
                  href={CREATOR_INFO.telUrl}
                  className="font-mono text-[#00e5ff] hover:underline font-bold flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-xs">call</span>
                  {CREATOR_INFO.formattedPhone} ({CREATOR_INFO.phone})
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            <a
              href={CREATOR_INFO.mailtoUrl}
              className="px-4 py-2 bg-[#c3f400] hover:bg-[#abd600] text-[#0e0e12] font-space font-extrabold text-xs uppercase rounded shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">mail</span>
              EMAIL YASHARTH
            </a>
            <a
              href={CREATOR_INFO.telUrl}
              className="px-4 py-2 bg-[#00e5ff] hover:bg-[#00c8e0] text-[#0e0e12] font-space font-extrabold text-xs uppercase rounded shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">phone</span>
              CALL DIRECT
            </a>
            <a
              href={CREATOR_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-[#25D366] hover:bg-[#20ba59] text-[#0e0e12] font-space font-extrabold text-xs uppercase rounded shadow-[2px_2px_0px_#000000] transition-all"
            >
              WHATSAPP
            </a>
            <button
              onClick={() => {
                onNavigate('about');
                setTimeout(() => {
                  const el = document.getElementById('creator-watermark-station');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 150);
              }}
              className="px-3 py-2 bg-[#1b1b22] hover:bg-[#25242e] border border-[#c3f400] text-[#c3f400] font-space font-bold text-xs uppercase rounded shadow-[2px_2px_0px_#000000] transition-colors"
            >
              VIEW WATERMARK PROOF ↗
            </button>
          </div>
        </div>
      </div>

      {/* Copyright & Trademark Watermark Bar */}
      <div className="w-full px-4 sm:px-8 py-5 bg-[#0a0a0d] border-t border-[#1f1f23]">
        <div className="w-full mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4 font-space text-xs text-[#c4c9ac]">
          <div>
            <p>© 2026 PROTEIN X ENTERPRISES INC. ALL RIGHTS RESERVED.</p>
            <p className="text-[11px] text-[#8f919d] mt-0.5">
              TRADEMARK &amp; WATERMARK PROOF: ENGINEERED BY <strong className="text-white">YASHARTH DIXIT</strong> • CONTACT: <a href={CREATOR_INFO.telUrl} className="text-[#00e5ff] hover:underline font-bold">7505086399</a> / <a href={CREATOR_INFO.mailtoUrl} className="text-[#c3f400] hover:underline font-bold">yasharthdixit0107@gmail.com</a>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-[#1f1f23] px-3 py-1 text-[#c3f400] font-mono text-[11px] font-bold tracking-wider rounded border border-[#353439]">
              {CREATOR_INFO.trademarkId}
            </span>
            <span className="bg-[#1f1f23] px-3 py-1 text-[#ffb1c3] font-bold tracking-wider rounded border border-[#353439]">
              BUILT FOR THE UNFILTERED GENERATION
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
