import React, { useState } from 'react';
import { Soundtrack } from '../types';

interface AudioPlayerWidgetProps {
  currentTrack: Soundtrack | null;
  onClose: () => void;
}

export const AudioPlayerWidget: React.FC<AudioPlayerWidgetProps> = ({
  currentTrack,
  onClose
}) => {
  const [isPlaying, setIsPlaying] = useState(true);

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-40 bg-[#131317] border-2 border-[#c3f400] rounded-xl p-3 shadow-[6px_6px_0px_#000000] flex items-center justify-between gap-3 animate-bounce-once">
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative w-12 h-12 rounded bg-[#1f1f23] overflow-hidden shrink-0 border border-[#2a292e]">
          <img
            src={currentTrack.coverImage}
            alt={currentTrack.title}
            className="w-full h-full object-cover"
          />
          {isPlaying && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-0.5">
              <span className="w-1 h-3 bg-[#c3f400] animate-pulse" />
              <span className="w-1 h-5 bg-[#c3f400] animate-pulse delay-75" />
              <span className="w-1 h-2 bg-[#c3f400] animate-pulse delay-150" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="font-syne font-extrabold text-xs text-[#e4e1e7] truncate uppercase">
              {currentTrack.title}
            </span>
            <span className="text-[9px] bg-[#c3f400] text-[#161e00] font-syne font-extrabold px-1 rounded">
              {currentTrack.bpm}
            </span>
          </div>
          <p className="font-space text-[10px] text-[#c4c9ac] truncate">
            {currentTrack.audioTrackTitle} • {currentTrack.artist}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-8 h-8 rounded bg-[#c3f400] hover:bg-[#abd600] text-[#161e00] flex items-center justify-center shadow-[1px_1px_0px_#000000]"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          <span className="material-symbols-outlined text-sm font-bold">
            {isPlaying ? 'pause' : 'play_arrow'}
          </span>
        </button>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded hover:bg-[#2a292e] text-[#c4c9ac] flex items-center justify-center transition-colors"
          title="Close player"
        >
          <span className="material-symbols-outlined text-xs">close</span>
        </button>
      </div>
    </div>
  );
};
