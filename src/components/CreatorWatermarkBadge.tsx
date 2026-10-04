import React, { useState } from 'react';
import { CREATOR_INFO } from '../data/creatorData';

interface CreatorWatermarkBadgeProps {
  onOpenModal: () => void;
  onOpenToast: (msg: string) => void;
}

export const CreatorWatermarkBadge: React.FC<CreatorWatermarkBadgeProps> = ({
  onOpenModal,
  onOpenToast,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="fixed bottom-5 left-5 z-40 flex items-center gap-2 group animate-fadeIn"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={onOpenModal}
        className="flex items-center gap-2 px-3 py-1.5 bg-[#121217] hover:bg-[#1a1922] border-2 border-[#c3f400] text-[#e4e1e7] shadow-[4px_4px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all rounded"
        title="View Creator Proof of Work & Contact Yasharth Dixit"
      >
        <span className="w-2 h-2 rounded-full bg-[#c3f400] animate-pulse" />
        <span className="font-space font-extrabold text-[11px] uppercase tracking-wide">
          CREATED BY <strong className="text-[#c3f400]">YASHARTH DIXIT</strong>
        </span>
        <span className="bg-[#ff4b89] text-white text-[9px] font-space font-black px-1.5 py-0.5 rounded uppercase">
          WATERMARK
        </span>
      </button>

      {/* Quick Direct Actions on Hover or Desktop */}
      <div className={`hidden sm:flex items-center gap-1.5 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-85'}`}>
        <a
          href={CREATOR_INFO.mailtoUrl}
          className="p-1.5 bg-[#1a1922] hover:bg-[#c3f400] text-[#c3f400] hover:text-[#0e0e12] border border-[#2b2a36] rounded shadow-[2px_2px_0px_#000000] transition-colors"
          title={`Email: ${CREATOR_INFO.email}`}
        >
          <span className="material-symbols-outlined text-sm block">mail</span>
        </a>
        <a
          href={CREATOR_INFO.telUrl}
          className="p-1.5 bg-[#1a1922] hover:bg-[#00e5ff] text-[#00e5ff] hover:text-[#0e0e12] border border-[#2b2a36] rounded shadow-[2px_2px_0px_#000000] transition-colors"
          title={`Call: ${CREATOR_INFO.phone}`}
        >
          <span className="material-symbols-outlined text-sm block">call</span>
        </a>
      </div>
    </div>
  );
};
