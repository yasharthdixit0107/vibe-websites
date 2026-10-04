import React, { useState } from 'react';
import { CREATOR_INFO } from '../data/creatorData';
import { ScreenType } from '../types';

interface CreatorWatermarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ScreenType) => void;
  onOpenToast: (msg: string) => void;
}

export const CreatorWatermarkModal: React.FC<CreatorWatermarkModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenToast,
}) => {
  const [copiedType, setCopiedType] = useState<'email' | 'phone' | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, type: 'email' | 'phone', label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    onOpenToast(`✓ ${label} COPIED TO CLIPBOARD!`);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleGoToProofPage = () => {
    onClose();
    onNavigate('about');
    setTimeout(() => {
      const el = document.getElementById('creator-watermark-station');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-[#121217] border-2 border-[#c3f400] p-6 sm:p-8 shadow-[10px_10px_0px_#000000] text-[#e4e1e7]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8f919d] hover:text-white font-space font-bold text-lg p-1 transition-colors"
          title="Close modal"
        >
          ✕
        </button>

        {/* Header Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="bg-[#c3f400] text-[#0e0e12] font-space font-black text-[10px] uppercase px-2.5 py-0.5 shadow-[2px_2px_0px_#000000]">
            CERTIFIED ORIGINAL AUTHOR
          </span>
          <span className="bg-[#ff4b89] text-white font-space font-bold text-[10px] uppercase px-2 py-0.5">
            TRADEMARK PROOF
          </span>
        </div>

        {/* Title */}
        <h3 className="font-syne font-black text-2xl uppercase tracking-tight text-white mb-1">
          {CREATOR_INFO.name}
        </h3>
        <p className="font-space font-bold text-xs text-[#c3f400] uppercase tracking-wider mb-4">
          {CREATOR_INFO.role}
        </p>

        <p className="font-space text-xs text-[#a7a9b6] leading-relaxed mb-6">
          This platform was engineered and designed by Yasharth Dixit. Direct client connectivity, official contact channels, and verifiable proof of authorship are provided below.
        </p>

        {/* Verified Contact Details Grid */}
        <div className="space-y-3 mb-6">
          
          {/* Email Row */}
          <div className="p-3.5 bg-[#1a1922] border border-[#2e2d38] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="font-space text-[10px] uppercase text-[#8f919d] block">
                DIRECT CLIENT EMAIL
              </span>
              <a
                href={CREATOR_INFO.mailtoUrl}
                className="font-mono text-sm font-bold text-white hover:text-[#c3f400] transition-colors break-all"
              >
                {CREATOR_INFO.email}
              </a>
            </div>

            <div className="flex items-center gap-1.5 self-end sm:self-auto">
              <a
                href={CREATOR_INFO.mailtoUrl}
                className="px-2.5 py-1.5 bg-[#c3f400] hover:bg-[#abd600] text-[#0e0e12] font-space font-extrabold text-[11px] uppercase rounded"
              >
                MAIL ↗
              </a>
              <button
                onClick={() => handleCopy(CREATOR_INFO.email, 'email', 'EMAIL')}
                className="px-2 py-1.5 bg-[#2a2935] hover:bg-[#393848] text-white font-space font-bold text-[11px] rounded"
              >
                {copiedType === 'email' ? '✓' : 'COPY'}
              </button>
            </div>
          </div>

          {/* Phone Row */}
          <div className="p-3.5 bg-[#1a1922] border border-[#2e2d38] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="font-space text-[10px] uppercase text-[#8f919d] block">
                DIRECT CONTACT NUMBER
              </span>
              <a
                href={CREATOR_INFO.telUrl}
                className="font-mono text-base font-bold text-[#00e5ff] hover:underline"
              >
                {CREATOR_INFO.formattedPhone}
              </a>
            </div>

            <div className="flex items-center gap-1.5 self-end sm:self-auto">
              <a
                href={CREATOR_INFO.telUrl}
                className="px-2.5 py-1.5 bg-[#00e5ff] hover:bg-[#00c8e0] text-[#0e0e12] font-space font-extrabold text-[11px] uppercase rounded"
              >
                CALL 📞
              </a>
              <a
                href={CREATOR_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 bg-[#25D366] hover:bg-[#20ba59] text-[#0e0e12] font-space font-extrabold text-[11px] uppercase rounded"
              >
                WHATSAPP
              </a>
              <button
                onClick={() => handleCopy(CREATOR_INFO.phone, 'phone', 'PHONE NUMBER')}
                className="px-2 py-1.5 bg-[#2a2935] hover:bg-[#393848] text-white font-space font-bold text-[11px] rounded"
              >
                {copiedType === 'phone' ? '✓' : 'COPY'}
              </button>
            </div>
          </div>

        </div>

        {/* Trademark & Watermark Certificate Stamp */}
        <div className="p-3 bg-[#0a0a0d] border border-[#2a2933] text-[11px] font-space text-[#8f919d] space-y-1 mb-6">
          <div className="flex justify-between items-center">
            <span>WATERMARK REGISTER:</span>
            <span className="text-[#c3f400] font-mono font-bold">{CREATOR_INFO.trademarkId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>AUTH DIGITAL HASH:</span>
            <span className="text-[#e4e1e7] font-mono text-[10px]">YD-7505086399-VERIFIED</span>
          </div>
        </div>

        {/* View Full Proof on Last Page Button */}
        <button
          onClick={handleGoToProofPage}
          className="w-full py-3 bg-[#1e1d26] hover:bg-[#2c2b36] border border-[#c3f400] text-[#c3f400] font-space font-extrabold text-xs uppercase tracking-wider shadow-[3px_3px_0px_#000000] transition-all flex items-center justify-center gap-2"
        >
          <span>VIEW FULL WATERMARK STATION ON ABOUT PAGE</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
