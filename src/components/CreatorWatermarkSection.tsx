import React, { useState } from 'react';
import { CREATOR_INFO } from '../data/creatorData';

interface CreatorWatermarkSectionProps {
  onOpenToast: (msg: string) => void;
}

export const CreatorWatermarkSection: React.FC<CreatorWatermarkSectionProps> = ({ onOpenToast }) => {
  const [copiedType, setCopiedType] = useState<'email' | 'phone' | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientProject, setClientProject] = useState('');

  const copyToClipboard = (text: string, type: 'email' | 'phone', label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    onOpenToast(`✓ ${label} COPIED TO CLIPBOARD!`);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleQuickInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Inquiry from ${clientName || 'Direct Client'} // Yasharth Dixit`);
    const body = encodeURIComponent(
      `Hi Yasharth,\n\nI am contacting you directly regarding your work on the Protein X web application.\n\nClient Name: ${clientName}\nClient Email: ${clientEmail}\nProject Details:\n${clientProject}\n\nPlease reach me back soon!`
    );
    window.location.href = `mailto:${CREATOR_INFO.email}?subject=${subject}&body=${body}`;
    onOpenToast('Opening direct email client for Yasharth Dixit...');
  };

  return (
    <section 
      id="creator-watermark-station"
      className="relative w-full px-4 sm:px-8 py-20 bg-[#0b0b0e] border-t-4 border-[#c3f400] text-[#e4e1e7] overflow-hidden"
    >
      {/* Background kinetic ambient lighting */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#c3f400]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#ff4b89]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Repeating Diagonal Watermark Pattern (Semi-Transparent Background Layer) */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-[0.035] overflow-hidden flex flex-wrap gap-12 font-syne font-black text-6xl tracking-widest text-[#ffffff] transform -rotate-12 scale-110">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="whitespace-nowrap">
            YASHARTH DIXIT • OFFICIAL WATERMARK • PROOF OF WORK •
          </span>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-[#c3f400] text-[#0e0e12] font-space font-extrabold text-xs uppercase px-3 py-1 shadow-[2px_2px_0px_#000000]">
                AUTHENTICATED CREATOR PROOF
              </span>
              <span className="bg-[#ff4b89] text-[#ffffff] font-space font-bold text-xs uppercase px-2.5 py-1 shadow-[2px_2px_0px_#000000]">
                REGISTERED TRADEMARK &amp; WATERMARK
              </span>
              <span className="font-space text-xs text-[#00e5ff] tracking-widest uppercase">
                ORIGINAL AUTHORSHIP VERIFIED
              </span>
            </div>

            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tighter text-white">
              CRAFTED BY <span className="text-[#c3f400]">YASHARTH DIXIT</span>
            </h2>
            <p className="font-space text-sm sm:text-base text-[#a7a9b6] max-w-2xl mt-2">
              Official verifiable watermark, trademark certification, and direct client communication terminal. Clients can reach out directly via Email, Phone, or WhatsApp for collaborations, bespoke digital platforms, or project queries.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onOpenToast('🛡️ WATERMARK VERIFIED: SHA256 VALIDATED FOR YASHARTH DIXIT');
              }}
              className="px-4 py-2 bg-[#1b1b22] hover:bg-[#25242e] border-2 border-[#00e5ff] text-[#00e5ff] font-space font-bold text-xs uppercase shadow-[3px_3px_0px_#000000] flex items-center gap-2 transition-all active:translate-x-0.5 active:translate-y-0.5"
            >
              <span className="material-symbols-outlined text-sm">verified_user</span>
              VERIFY DIGITAL WATERMARK
            </button>
          </div>
        </div>

        {/* Main Grid: Watermark Seal Card (Left) & Direct Client Contact Console (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Official Trademark & Watermark Certificate Card (5 Columns) */}
          <div className="lg:col-span-5 bg-[#141419] border-2 border-[#c3f400] p-6 sm:p-8 shadow-[8px_8px_0px_#000000] relative group">
            
            {/* Corner Authenticity Badge */}
            <div className="absolute -top-3 -right-3 bg-[#c3f400] text-[#0e0e12] font-space font-black text-[11px] px-3 py-1 uppercase shadow-[2px_2px_0px_#000000] rotate-3">
              100% ORIGINAL WORK
            </div>

            {/* Visual Watermark Seal Emblem */}
            <div className="flex flex-col items-center text-center p-6 bg-[#0e0e12] border-2 border-[#2b2b36] relative mb-6">
              
              {/* Decorative Holographic Watermark Crest */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-dashed border-[#c3f400] flex items-center justify-center relative mb-4 p-1 shadow-[0_0_20px_rgba(195,244,0,0.2)]">
                <div className="w-full h-full rounded-full bg-[#1b1b24] border-2 border-[#ff4b89] flex flex-col items-center justify-center relative overflow-hidden">
                  <span className="font-syne font-extrabold text-2xl sm:text-3xl text-[#c3f400] tracking-tighter">
                    YD
                  </span>
                  <span className="font-space font-bold text-[8px] tracking-widest text-[#00e5ff] uppercase -mt-1">
                    ARCHITECT
                  </span>
                </div>
                {/* Spinning subtle badge icon */}
                <div className="absolute -bottom-1 -right-1 bg-[#c3f400] text-[#0e0e12] w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-md">
                  ★
                </div>
              </div>

              <div className="font-syne font-black text-xl text-white uppercase tracking-tight">
                {CREATOR_INFO.name}
              </div>
              <div className="font-space font-bold text-xs text-[#c3f400] uppercase tracking-wider mt-0.5">
                {CREATOR_INFO.role}
              </div>

              <div className="w-full h-px bg-[#2b2b36] my-4" />

              {/* Watermark Certification Stamp */}
              <div className="font-space text-xs text-[#8f919d] leading-relaxed text-left space-y-1.5 w-full">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-[#8f919d] uppercase">Trademark Code:</span>
                  <span className="font-mono text-[#e4e1e7] font-bold">{CREATOR_INFO.trademarkId}</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-[#8f919d] uppercase">Digital Stamp:</span>
                  <span className="font-mono text-[#00e5ff] font-bold">CERTIFIED 2026</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-[#8f919d] uppercase">Authorship Status:</span>
                  <span className="text-[#c3f400] font-bold">PRIMARY ARCHITECT</span>
                </div>
              </div>
            </div>

            {/* Proof Declaration Statement */}
            <div className="p-4 bg-[#1b1b22] border-l-4 border-[#ff4b89] mb-6">
              <span className="font-space font-bold text-xs text-[#ff4b89] uppercase block mb-1">
                PROOF OF AUTHORSHIP GUARANTEE
              </span>
              <p className="font-space text-xs text-[#c4c9ac] leading-relaxed">
                This page stands as cryptographic and visual proof that this platform was conceived, developed, and engineered by <strong>Yasharth Dixit</strong>. All interactive components, custom soundscape players, real-time Firebase systems, and kinetic streetwear UI were custom crafted by the creator.
              </p>
            </div>

            {/* One-Click Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={CREATOR_INFO.mailtoUrl}
                className="py-3 px-4 bg-[#c3f400] hover:bg-[#abd600] text-[#0e0e12] font-space font-extrabold text-xs uppercase text-center rounded shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">mail</span>
                EMAIL YASHARTH
              </a>

              <a
                href={CREATOR_INFO.telUrl}
                className="py-3 px-4 bg-[#1f1e26] hover:bg-[#2c2b36] text-[#e4e1e7] hover:text-[#c3f400] border border-[#353439] font-space font-bold text-xs uppercase text-center rounded shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm text-[#c3f400]">call</span>
                CALL DIRECT
              </a>
            </div>
          </div>

          {/* RIGHT: Direct Client Contact Hub & Fast Connect Terminal (7 Columns) */}
          <div className="lg:col-span-7 bg-[#141419] border-2 border-[#2b2b36] p-6 sm:p-8 shadow-[8px_8px_0px_#000000] flex flex-col gap-6">
            
            <div>
              <span className="bg-[#1f1e26] text-[#c3f400] font-space font-bold text-xs uppercase px-2.5 py-1 border border-[#353439] inline-block mb-2">
                DIRECT CLIENT COMMUNICATIONS
              </span>
              <h3 className="font-syne font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-white">
                GET IN TOUCH WITH THE DEVELOPER
              </h3>
              <p className="font-space text-xs sm:text-sm text-[#8f919d] mt-1">
                Clients can directly initiate telephone calls, send high-priority emails, or connect via WhatsApp using the verified contact details below.
              </p>
            </div>

            {/* Direct Contact Cards (Email & Phone) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Email Contact Card */}
              <div className="bg-[#1b1b22] border-2 border-[#353439] hover:border-[#c3f400] p-5 shadow-[4px_4px_0px_#000000] transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-space font-bold text-xs uppercase text-[#8f919d]">
                      OFFICIAL EMAIL ADDRESS
                    </span>
                    <span className="material-symbols-outlined text-[#c3f400] text-lg">mail</span>
                  </div>
                  <div className="font-mono text-sm sm:text-base font-bold text-white break-all select-all">
                    {CREATOR_INFO.email}
                  </div>
                  <p className="font-space text-[11px] text-[#8f919d] mt-1">
                    Direct inbox for client inquiries, code architecture, and contracts.
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#2a2933]">
                  <a
                    href={CREATOR_INFO.mailtoUrl}
                    className="flex-1 py-2 bg-[#c3f400] hover:bg-[#abd600] text-[#0e0e12] font-space font-extrabold text-xs uppercase text-center rounded transition-all"
                  >
                    SEND EMAIL ↗
                  </a>
                  <button
                    onClick={() => copyToClipboard(CREATOR_INFO.email, 'email', 'EMAIL')}
                    className="px-3 py-2 bg-[#26252e] hover:bg-[#35343f] text-white font-space font-bold text-xs rounded transition-colors"
                    title="Copy Email"
                  >
                    {copiedType === 'email' ? '✓ COPIED' : 'COPY'}
                  </button>
                </div>
              </div>

              {/* Phone / Mobile Contact Card */}
              <div className="bg-[#1b1b22] border-2 border-[#353439] hover:border-[#00e5ff] p-5 shadow-[4px_4px_0px_#000000] transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-space font-bold text-xs uppercase text-[#8f919d]">
                      CONTACT NUMBER / DIRECT LINE
                    </span>
                    <span className="material-symbols-outlined text-[#00e5ff] text-lg">phone_iphone</span>
                  </div>
                  <div className="font-mono text-lg sm:text-xl font-bold text-white select-all">
                    {CREATOR_INFO.formattedPhone}
                  </div>
                  <p className="font-space text-[11px] text-[#8f919d] mt-1">
                    Direct voice, SMS, and WhatsApp connectivity (Local: {CREATOR_INFO.phone}).
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#2a2933]">
                  <a
                    href={CREATOR_INFO.telUrl}
                    className="flex-1 py-2 bg-[#00e5ff] hover:bg-[#00c8e0] text-[#0e0e12] font-space font-extrabold text-xs uppercase text-center rounded transition-all"
                  >
                    CALL NOW 📞
                  </a>
                  <a
                    href={CREATOR_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-[#25D366] hover:bg-[#20ba59] text-[#0e0e12] font-space font-bold text-xs uppercase rounded transition-colors"
                    title="Chat on WhatsApp"
                  >
                    WHATSAPP
                  </a>
                  <button
                    onClick={() => copyToClipboard(CREATOR_INFO.phone, 'phone', 'PHONE NUMBER')}
                    className="px-2.5 py-2 bg-[#26252e] hover:bg-[#35343f] text-white font-space font-bold text-xs rounded transition-colors"
                    title="Copy Phone"
                  >
                    {copiedType === 'phone' ? '✓' : 'COPY'}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Interactive Client Inquiry Messenger */}
            <div className="bg-[#191820] border border-[#2b2b36] p-5 rounded">
              <div className="flex items-center justify-between mb-3">
                <span className="font-space font-bold text-xs uppercase text-[#e4e1e7]">
                  FAST INQUIRY DISPATCH FOR CLIENTS
                </span>
                <span className="font-space text-[11px] text-[#8f919d]">
                  Direct to yasharthdixit0107@gmail.com
                </span>
              </div>

              <form onSubmit={handleQuickInquiry} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Name / Organization"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    required
                    className="bg-[#24232c] border border-[#353439] focus:border-[#c3f400] text-[#e4e1e7] font-space text-xs px-3.5 py-2.5 rounded focus:outline-none placeholder:text-[#6a6c78]"
                  />
                  <input
                    type="email"
                    placeholder="Your Contact Email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    required
                    className="bg-[#24232c] border border-[#353439] focus:border-[#c3f400] text-[#e4e1e7] font-space text-xs px-3.5 py-2.5 rounded focus:outline-none placeholder:text-[#6a6c78]"
                  />
                </div>

                <textarea
                  placeholder="Describe your project, custom development requirements, or inquiry..."
                  rows={2}
                  value={clientProject}
                  onChange={(e) => setClientProject(e.target.value)}
                  required
                  className="w-full bg-[#24232c] border border-[#353439] focus:border-[#c3f400] text-[#e4e1e7] font-space text-xs px-3.5 py-2.5 rounded focus:outline-none placeholder:text-[#6a6c78] resize-none"
                />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                  <span className="font-space text-[11px] text-[#8f919d]">
                    * Automatically opens your default email client with Yasharth's inbox pre-filled.
                  </span>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#c3f400] hover:bg-[#abd600] text-[#0e0e12] font-space font-extrabold text-xs uppercase rounded shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  >
                    DISPATCH CLIENT INQUIRY →
                  </button>
                </div>
              </form>
            </div>

            {/* Trademark Legal Bar & Watermark Serial Verification */}
            <div className="pt-4 border-t border-[#23232d] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 font-space text-[11px] text-[#8f919d]">
              <div>
                <strong className="text-[#e4e1e7]">TRADEMARK VERIFIED:</strong> {CREATOR_INFO.trademarkId}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[#00e5ff] font-bold">TEL: {CREATOR_INFO.phone}</span>
                <span className="text-[#c3f400] font-bold">{CREATOR_INFO.email}</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
