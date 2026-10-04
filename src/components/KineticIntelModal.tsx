import React, { useState } from 'react';

interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

interface GroundingMetadata {
  webSearchQueries?: string[];
  groundingChunks?: GroundingChunk[];
}

interface KineticIntelModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const KineticIntelModal: React.FC<KineticIntelModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [grounding, setGrounding] = useState<GroundingMetadata | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAsk = async (searchPrompt?: string) => {
    const promptToSend = searchPrompt || query;
    if (!promptToSend.trim()) return;

    setLoading(true);
    setError(null);
    setAnswer(null);
    setGrounding(null);

    try {
      const res = await fetch('/api/kinetic-search-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptToSend }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch search-grounded intelligence');
      }

      setAnswer(data.text);
      setGrounding(data.groundingMetadata);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error executing search grounding query.');
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    '2026 WADA banned substances list changes for sports supplements',
    'Cold ceramic microfiltration vs ion-exchange whey protein denaturing',
    'Optimal leucine threshold for mTOR activation in resistance athletes',
    'Creapure creatine monohydrate saturation vs creatine HCL clinical trials',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#0e0e12] border-2 border-[#c3f400] shadow-[8px_8px_0px_#000000] overflow-hidden">
        {/* Header */}
        <div className="bg-[#19181d] border-b-2 border-[#2a292e] p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#c3f400] text-[#0e0e12] flex items-center justify-center font-bold shadow-[2px_2px_0px_#000000]">
              <span className="material-symbols-outlined text-xl">travel_explore</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-syne font-extrabold text-lg sm:text-xl uppercase text-white">
                  KINETIC INTEL // GOOGLE SEARCH GROUNDED
                </h3>
                <span className="bg-[#00e5ff] text-[#0e0e12] font-space font-extrabold text-[10px] uppercase px-2 py-0.5 shadow-[1px_1px_0px_#000000]">
                  GEMINI 3.5 FLASH
                </span>
              </div>
              <p className="font-space text-xs text-[#8f919d]">
                Live sports science data, clinical trial findings &amp; WADA regulatory verification.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 bg-[#242329] hover:bg-[#ff4b89] text-white hover:text-[#590026] border border-[#353439] flex items-center justify-center font-bold text-sm transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="p-5 border-b border-[#2a292e] bg-[#141418]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk();
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about ingredients, studies, WADA compliance, or absorption kinetics..."
                className="w-full bg-[#0e0e12] border-2 border-[#353439] focus:border-[#c3f400] text-sm font-space text-white px-4 py-3 outline-none pl-10"
              />
              <span className="material-symbols-outlined absolute left-3 top-3.5 text-[#8f919d] text-base">
                search
              </span>
            </div>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="bg-[#c3f400] hover:bg-[#abd600] disabled:opacity-50 text-[#0e0e12] font-space font-extrabold text-xs uppercase px-6 py-3 shadow-[3px_3px_0px_#000000] flex items-center gap-1.5 transition-all"
            >
              {loading ? (
                <>
                  <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>SEARCHING WEB...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">bolt</span>
                  <span>QUERY INTEL</span>
                </>
              )}
            </button>
          </form>

          {/* Prompt suggestions */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="font-space text-[10px] text-[#8f919d] uppercase mr-1">
              TRY ASKING:
            </span>
            {samplePrompts.map((sp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setQuery(sp);
                  handleAsk(sp);
                }}
                className="text-[11px] font-space text-[#c4c9ac] hover:text-[#c3f400] bg-[#1c1b21] hover:bg-[#2a292e] border border-[#2a292e] px-2 py-0.5 rounded transition-colors text-left"
              >
                &ldquo;{sp.slice(0, 38)}...&rdquo;
              </button>
            ))}
          </div>
        </div>

        {/* Result Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {error && (
            <div className="bg-[#ff4b89]/10 border border-[#ff4b89] p-4 text-xs font-space text-[#ff4b89]">
              ⚠️ <strong>Error:</strong> {error}
            </div>
          )}

          {loading && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full border-4 border-[#c3f400] border-t-transparent animate-spin" />
              <div className="font-syne font-bold text-sm uppercase text-white">
                SYNCHRONIZING WITH GOOGLE SEARCH INDEX...
              </div>
              <p className="font-space text-xs text-[#8f919d] max-w-sm">
                Retrieving clinical studies, verified peer-reviewed sports journals, and regulatory publications.
              </p>
            </div>
          )}

          {answer && (
            <div className="space-y-6 animate-fadeIn">
              {/* Grounded Web Search Queries Pill */}
              {grounding?.webSearchQueries && grounding.webSearchQueries.length > 0 && (
                <div className="bg-[#19181d] border border-[#2a292e] p-3 flex flex-wrap items-center gap-2">
                  <span className="font-space text-[10px] text-[#8f919d] uppercase font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-[#00e5ff]">
                      travel_explore
                    </span>
                    GROUNDED GOOGLE SEARCH QUERIES:
                  </span>
                  {grounding.webSearchQueries.map((q, idx) => (
                    <span
                      key={idx}
                      className="bg-[#121216] border border-[#353439] text-[#c3f400] font-space text-xs px-2 py-0.5"
                    >
                      {q}
                    </span>
                  ))}
                </div>
              )}

              {/* Answer Content */}
              <div className="bg-[#141418] border-2 border-[#2a292e] p-6 shadow-[4px_4px_0px_#000000]">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#2a292e]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c3f400] animate-pulse" />
                  <span className="font-space text-xs uppercase font-extrabold text-[#c3f400] tracking-wider">
                    EVIDENCE-BASED SYNTHESIS
                  </span>
                </div>

                <div className="font-space text-sm sm:text-base text-[#e4e1e7] leading-relaxed whitespace-pre-line space-y-3">
                  {answer}
                </div>
              </div>

              {/* Verified Web Sources / Citations */}
              {grounding?.groundingChunks && grounding.groundingChunks.length > 0 && (
                <div className="space-y-2">
                  <div className="font-space font-extrabold text-xs uppercase text-[#8f919d] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-[#c3f400]">
                      link
                    </span>
                    <span>VERIFIED WEB SOURCES &amp; CITATIONS:</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {grounding.groundingChunks.map((chunk, idx) => {
                      if (!chunk.web?.uri) return null;
                      return (
                        <a
                          key={idx}
                          href={chunk.web.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#19181d] hover:bg-[#242329] border border-[#2a292e] hover:border-[#c3f400] p-3 block transition-colors group"
                        >
                          <div className="font-syne font-bold text-xs text-white group-hover:text-[#c3f400] truncate">
                            {chunk.web.title || chunk.web.uri}
                          </div>
                          <div className="font-space text-[10px] text-[#8f919d] truncate mt-0.5">
                            {chunk.web.uri}
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {!answer && !loading && !error && (
            <div className="text-center py-10 space-y-3">
              <span className="material-symbols-outlined text-[#8f919d] text-4xl">
                psychology_alt
              </span>
              <h4 className="font-syne font-bold text-base uppercase text-white">
                LIVE BIO-KINETIC SCIENTIFIC INTELLIGENCE
              </h4>
              <p className="font-space text-xs text-[#8f919d] max-w-md mx-auto">
                Powered by Gemini 3.5 Flash and Google Search Grounding to verify sports supplement claims, amino acid ratios, and anti-doping certifications in real-time.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
