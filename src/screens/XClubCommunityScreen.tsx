import React, { useState } from 'react';
import { ScreenType, Creator, Soundtrack, Product } from '../types';
import { CREATORS_LIST, DROP_EVENTS, SOUNDTRACKS, ALL_VAULT_PRODUCTS } from '../data/mockData';

interface XClubCommunityScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onAddToCart: (product: Product, flavor?: string, size?: string) => void;
  onPlayTrack: (track: Soundtrack) => void;
  onOpenToast: (msg: string) => void;
}

export const XClubCommunityScreen: React.FC<XClubCommunityScreenProps> = ({
  onNavigate,
  onAddToCart,
  onPlayTrack,
  onOpenToast
}) => {
  const [passHandle, setPassHandle] = useState('');
  const [passEmail, setPassEmail] = useState('');
  const [passMinted, setPassMinted] = useState(false);
  const [creatorFilter, setCreatorFilter] = useState<'all' | 'powerlifting' | 'hybrid'>('all');
  const [notifiedDrops, setNotifiedDrops] = useState<string[]>([]);
  const [showAmbassadorModal, setShowAmbassadorModal] = useState(false);

  const handleMintPass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passHandle || !passEmail) return;
    setPassMinted(true);
    onOpenToast(`⚡ X-PASS MINTED FOR ${passHandle}! $10 CODE HAS BEEN APPLIED.`);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    onOpenToast(`✓ CREATOR CODE "${code}" COPIED! 15% OFF AT CHECKOUT.`);
  };

  const handleToggleNotify = (id: string, title: string) => {
    if (notifiedDrops.includes(id)) {
      setNotifiedDrops(notifiedDrops.filter((d) => d !== id));
      onOpenToast(`Removed notification for ${title}`);
    } else {
      setNotifiedDrops([...notifiedDrops, id]);
      onOpenToast(`⚡ NOTIFICATION LOCKED FOR ${title}! WE WILL SMS YOU 15M EARLY.`);
    }
  };

  const filteredCreators = CREATORS_LIST.filter((c) => {
    if (creatorFilter === 'all') return true;
    if (creatorFilter === 'powerlifting') return c.category === 'powerlifting';
    if (creatorFilter === 'hybrid') return c.category === 'hybrid' || c.category === 'core' || c.category === 'mobility';
    return true;
  });

  return (
    <div className="flex flex-col w-full bg-[#0e0e12]">
      {/* Top Marquee Sub-header */}
      <section className="w-full bg-[#ff4b89] text-[#590026] py-2 overflow-hidden select-none border-b border-[#0e0e12]">
        <div className="animate-marquee whitespace-nowrap font-syne text-xs uppercase font-extrabold flex items-center">
          <span className="mx-6 tracking-wider">
            🔥 JOIN 48,000+ CERTIFIED GYM FREAKS • NO GATEKEEPING • EXCLUSIVE CREATOR STACKS • BASS BOOSTED PLAYLISTS • SECRET DROPS 🔥
          </span>
          <span className="mx-6 tracking-wider">
            🔥 JOIN 48,000+ CERTIFIED GYM FREAKS • NO GATEKEEPING • EXCLUSIVE CREATOR STACKS • BASS BOOSTED PLAYLISTS • SECRET DROPS 🔥
          </span>
          <span className="mx-6 tracking-wider">
            🔥 JOIN 48,000+ CERTIFIED GYM FREAKS • NO GATEKEEPING • EXCLUSIVE CREATOR STACKS • BASS BOOSTED PLAYLISTS • SECRET DROPS 🔥
          </span>
        </div>
      </section>

      {/* Hero & Fast-Track Pass Section */}
      <section className="relative w-full px-4 sm:px-8 py-14 lg:py-20 bg-[#0e0e12] overflow-hidden">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[#c3f400]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-80 h-80 bg-[#ff4b89]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          {/* Left Hero Text */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-[#c3f400] text-[#161e00] font-space font-bold text-xs uppercase rounded shadow-[3px_3px_0px_#000000] rotate-[-2deg]">
                CREATOR HUB &amp; DROP NETWORK
              </span>
              <span className="px-3 py-1 bg-[#2a292e] text-[#c4c9ac] font-space font-bold text-xs uppercase rounded border border-[#353439]">
                SEASON 04 ACTIVE
              </span>
            </div>

            <h1 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-[#e4e1e7] tracking-tight leading-none">
              WELCOME TO THE <br />
              <span className="text-[#c3f400] inline-block drop-shadow-[0_0_24px_rgba(195,244,0,0.35)]">
                X-CLUB
              </span>
              <span className="text-[#ffb1c3]">⚡</span>
            </h1>

            <p className="font-space text-base text-[#c4c9ac] max-w-xl leading-relaxed">
              The anti-boring fitness collective. High-BPM soundscapes, unhinged creator stacks, experimental lab drops, and raw kinetic energy. Zero gatekeeping. Pure performance lifestyle.
            </p>

            {/* Dynamic Counter Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center gap-3 bg-[#1b1b1f] border border-[#2a292e] px-4 py-2.5 rounded-lg shadow-md">
                <span className="material-symbols-outlined text-[#c3f400] text-2xl font-bold">bolt</span>
                <div className="flex flex-col">
                  <span className="font-syne font-extrabold text-lg text-[#e4e1e7] leading-none">48.2K</span>
                  <span className="font-space font-bold text-[10px] text-[#c4c9ac] uppercase">Athletes Inside</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-[#1b1b1f] border border-[#2a292e] px-4 py-2.5 rounded-lg shadow-md">
                <span className="material-symbols-outlined text-[#ff4b89] text-2xl font-bold">trophy</span>
                <div className="flex flex-col">
                  <span className="font-syne font-extrabold text-lg text-[#e4e1e7] leading-none">$140K+</span>
                  <span className="font-space font-bold text-[10px] text-[#c4c9ac] uppercase">Rewards Claimed</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-[#1b1b1f] border border-[#2a292e] px-4 py-2.5 rounded-lg shadow-md">
                <span className="material-symbols-outlined text-[#b4c5ff] text-2xl font-bold">headphones</span>
                <div className="flex flex-col">
                  <span className="font-syne font-extrabold text-lg text-[#e4e1e7] leading-none">2.4M</span>
                  <span className="font-space font-bold text-[10px] text-[#c4c9ac] uppercase">Track Streams</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card: Interactive Membership Registration Pass */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -top-3 -right-2 z-20 bg-[#ffb1c3] text-[#66002c] px-3 py-1 font-space font-bold text-xs uppercase rounded rotate-[4deg] shadow-[4px_4px_0px_#000000]">
              INSTANT $10 UNLOCKED
            </div>

            <div className="bg-[#1f1f23] p-6 sm:p-8 rounded-2xl border-2 border-[#2a292e] shadow-[6px_6px_0px_#000000] relative">
              <div className="flex items-center justify-between pb-4 border-b border-[#2a292e]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c3f400] animate-pulse" />
                  <span className="font-syne font-extrabold text-xs text-[#e4e1e7] uppercase">
                    DIGITAL PASS • FREE TIER
                  </span>
                </div>
                <span className="font-space font-bold text-[10px] text-[#c3f400] bg-[#2a292e] px-2 py-0.5 rounded">
                  LIVE
                </span>
              </div>

              <h2 className="font-syne text-xl font-bold uppercase text-[#e4e1e7] mt-4 mb-1">
                CLAIM CLUB STATUS
              </h2>
              <p className="font-space text-xs text-[#c4c9ac] mb-6">
                Sign up below to mint your kinetic pass. Direct drop access, Discord secret channels, and $10 cart credit automatically credited.
              </p>

              {passMinted ? (
                <div className="bg-[#c3f400]/20 border border-[#c3f400] p-5 rounded-xl text-center space-y-2">
                  <span className="material-symbols-outlined text-4xl text-[#c3f400]">verified</span>
                  <h3 className="font-syne font-extrabold text-base uppercase text-[#e4e1e7]">
                    X-PASS MINTED: {passHandle}
                  </h3>
                  <p className="font-space text-xs text-[#c4c9ac]">
                    $10 cart credit code <strong className="text-[#c3f400]">CLUB10</strong> has been linked to your account!
                  </p>
                  <button
                    onClick={() => onNavigate('shop-drops')}
                    className="w-full py-2.5 bg-[#c3f400] text-[#161e00] font-syne font-bold text-xs uppercase rounded mt-2"
                  >
                    EXPLORE ACTIVE DROPS NOW
                  </button>
                </div>
              ) : (
                <form onSubmit={handleMintPass} className="flex flex-col gap-4">
                  <div>
                    <label className="block font-space font-bold text-[10px] text-[#c4c9ac] uppercase mb-1">
                      CREATOR / ATHLETE ALIAS
                    </label>
                    <input
                      className="w-full bg-[#2a292e] px-4 py-2.5 font-space text-xs text-[#e4e1e7] placeholder:text-[#c4c9ac] focus:outline-none focus:ring-1 focus:ring-[#c3f400] rounded border border-[#353439] shadow-[2px_2px_0px_#000000]"
                      placeholder="@yourhandle"
                      required
                      value={passHandle}
                      onChange={(e) => setPassHandle(e.target.value)}
                      type="text"
                    />
                  </div>

                  <div>
                    <label className="block font-space font-bold text-[10px] text-[#c4c9ac] uppercase mb-1">
                      DISPATCH EMAIL ADDRESS
                    </label>
                    <input
                      className="w-full bg-[#2a292e] px-4 py-2.5 font-space text-xs text-[#e4e1e7] placeholder:text-[#c4c9ac] focus:outline-none focus:ring-1 focus:ring-[#c3f400] rounded border border-[#353439] shadow-[2px_2px_0px_#000000]"
                      placeholder="you@domain.com"
                      required
                      value={passEmail}
                      onChange={(e) => setPassEmail(e.target.value)}
                      type="email"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 pt-1 text-xs text-[#c4c9ac] font-space">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#c3f400] text-sm">check_circle</span>
                      <span>$10 Instant Store Credit on any formula</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#c3f400] text-sm">check_circle</span>
                      <span>Priority 15-Minute Drop Window access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#c3f400] text-sm">check_circle</span>
                      <span>Private Discord role + Athlete Q&amp;A voice lounge</span>
                    </div>
                  </div>

                  <button
                    className="w-full mt-2 bg-[#c3f400] hover:bg-[#abd600] text-[#161e00] font-syne font-extrabold text-xs uppercase py-3.5 rounded shadow-[4px_4px_0px_#ff4b89] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all"
                    type="submit"
                  >
                    MINT X-PASS FREE ⚡
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Creator Roster Section */}
      <section className="w-full px-4 sm:px-8 py-16 bg-[#1b1b1f] border-t border-[#2a292e]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#ffb1c3]" />
                <span className="font-space font-bold text-xs text-[#ffb1c3] uppercase tracking-widest">
                  SQUAD PROTOCOL
                </span>
              </div>
              <h2 className="font-syne text-3xl sm:text-4xl font-extrabold uppercase text-[#e4e1e7]">
                CREATOR SQUAD SPOTLIGHT
              </h2>
              <p className="font-space text-sm text-[#c4c9ac]">
                The minds pushing boundaries across platforms. Snag their exclusive stacks and code discounts.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCreatorFilter('all')}
                className={`px-3 py-1 font-space font-bold text-xs uppercase rounded transition-colors ${
                  creatorFilter === 'all'
                    ? 'bg-[#c3f400] text-[#161e00]'
                    : 'bg-[#1f1f23] text-[#c4c9ac] hover:bg-[#2a292e]'
                }`}
              >
                All Niches
              </button>
              <button
                onClick={() => setCreatorFilter('powerlifting')}
                className={`px-3 py-1 font-space font-bold text-xs uppercase rounded transition-colors ${
                  creatorFilter === 'powerlifting'
                    ? 'bg-[#c3f400] text-[#161e00]'
                    : 'bg-[#1f1f23] text-[#c4c9ac] hover:bg-[#2a292e]'
                }`}
              >
                Powerlifting
              </button>
              <button
                onClick={() => setCreatorFilter('hybrid')}
                className={`px-3 py-1 font-space font-bold text-xs uppercase rounded transition-colors ${
                  creatorFilter === 'hybrid'
                    ? 'bg-[#c3f400] text-[#161e00]'
                    : 'bg-[#1f1f23] text-[#c4c9ac] hover:bg-[#2a292e]'
                }`}
              >
                Hybrid &amp; Run
              </button>
            </div>
          </div>

          {/* Creator Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCreators.map((creator) => (
              <div
                key={creator.id}
                className="group bg-[#1f1f23] rounded-xl border border-[#2a292e] shadow-[4px_4px_0px_#000000] hover:border-[#c3f400] hover:shadow-[6px_6px_0px_#c3f400] transition-all flex flex-col overflow-hidden"
              >
                <div className="relative w-full h-72 overflow-hidden bg-[#0e0e12]">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={creator.image}
                    alt={creator.name}
                  />
                  <div className="absolute top-3 left-3 bg-[#0e0e12]/90 px-2.5 py-1 rounded">
                    <span className="font-space font-bold text-[10px] text-[#c3f400] uppercase">
                      {creator.niche}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#ff4b89] text-[#590026] px-2.5 py-1 font-syne font-extrabold text-xs uppercase rounded rotate-[-2deg] shadow-[2px_2px_0px_#000000]">
                    CODE: {creator.code}
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-syne font-bold text-base text-[#e4e1e7]">{creator.name}</span>
                      <span className="font-space text-xs text-[#c4c9ac]">{creator.handle}</span>
                    </div>
                    <p className="font-space text-xs text-[#c4c9ac] mb-3 leading-relaxed">
                      {creator.tagline}
                    </p>

                    <div className="p-2.5 bg-[#2a292e] rounded-lg mb-1">
                      <span className="block font-space font-bold text-[10px] text-[#c3f400] uppercase">
                        FAVORITE STACK:
                      </span>
                      <span className="font-space text-xs text-[#e4e1e7] font-semibold">
                        {creator.favoriteStack}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onAddToCart(ALL_VAULT_PRODUCTS[0], creator.favoriteStack, '2.2 lbs');
                        onOpenToast(`⚡ ADDED ${creator.name.toUpperCase()}'S STACK TO BAG!`);
                      }}
                      className="flex-1 bg-[#c3f400] hover:bg-[#abd600] text-[#161e00] font-syne font-extrabold text-xs uppercase py-2.5 rounded shadow-[2px_2px_0px_#000000] text-center"
                    >
                      SHOP STACK
                    </button>
                    <button
                      onClick={() => handleCopyCode(creator.code)}
                      className="bg-[#2a292e] hover:bg-[#353439] p-2 text-[#e4e1e7] rounded hover:text-[#c3f400] transition-colors border border-[#353439]"
                      title="Copy Code"
                    >
                      <span className="material-symbols-outlined text-base">content_copy</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Drop Calendar */}
      <section className="w-full px-4 sm:px-8 py-16 bg-[#0e0e12]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <span className="px-3 py-1 bg-[#c3f400] text-[#161e00] font-space font-bold text-xs uppercase rounded">
                LIMITED EDITION ARCHIVE
              </span>
              <h2 className="font-syne text-3xl sm:text-4xl font-extrabold uppercase text-[#e4e1e7] mt-1">
                MONTHLY DROP CALENDAR
              </h2>
            </div>
            <div className="flex items-center gap-2 bg-[#1b1b1f] border border-[#2a292e] px-4 py-2 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-[#ffb4ab] animate-ping" />
              <span className="font-space font-bold text-xs text-[#e4e1e7] uppercase">
                DROPS CAP AT 1,500 JARS MAXIMUM
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {DROP_EVENTS.map((drop) => {
              const isNotified = notifiedDrops.includes(drop.id);
              return (
                <div
                  key={drop.id}
                  className="bg-[#1b1b1f] border border-[#2a292e] p-6 rounded-xl shadow-[4px_4px_0px_#000000] flex flex-col justify-between relative group hover:border-[#c3f400] transition-all"
                >
                  <div
                    className={`absolute -top-3 left-4 ${drop.badgeColor} px-3 py-1 font-syne font-extrabold text-[11px] uppercase rounded shadow-[2px_2px_0px_#000000]`}
                    style={{ transform: `rotate(${drop.badgeRotate})` }}
                  >
                    {drop.badge}
                  </div>

                  <div>
                    <div className="flex justify-between items-start mt-3 mb-4">
                      <span className="font-syne text-2xl font-extrabold text-[#c3f400]">
                        {drop.date}
                      </span>
                      <span className="font-space font-bold text-xs bg-[#2a292e] text-[#e4e1e7] px-2.5 py-1 rounded border border-[#353439]">
                        {drop.time}
                      </span>
                    </div>

                    <h3 className="font-syne font-bold text-base uppercase text-[#e4e1e7] mb-2">
                      {drop.title}
                    </h3>
                    <p className="font-space text-xs text-[#c4c9ac] mb-4 leading-relaxed">
                      {drop.description}
                    </p>

                    <div className="w-full bg-[#0e0e12] h-2 rounded-full overflow-hidden mb-2 border border-[#2a292e]">
                      <div
                        className="bg-[#c3f400] h-full"
                        style={{ width: `${drop.soldPercent}%` }}
                      />
                    </div>
                    <span className="block font-space font-bold text-[10px] text-[#c4c9ac] uppercase mb-6">
                      {drop.waitlistCount} VIPs on early waitlist
                    </span>
                  </div>

                  <button
                    onClick={() => handleToggleNotify(drop.id, drop.title)}
                    className={`w-full py-3 font-syne font-extrabold text-xs uppercase rounded shadow-[3px_3px_0px_#000000] transition-all ${
                      isNotified
                        ? 'bg-[#2a292e] text-[#c3f400] border border-[#c3f400]'
                        : 'bg-[#c3f400] hover:bg-[#abd600] text-[#161e00]'
                    }`}
                  >
                    {isNotified ? '✓ NOTIFIED! (SMS ACTIVE)' : 'NOTIFY ME ⚡'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Official Soundtracks Section */}
      <section className="w-full px-4 sm:px-8 py-16 bg-[#1b1b1f] border-t border-[#2a292e]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
            <div>
              <span className="px-3 py-1 bg-[#ff4b89] text-[#590026] font-space font-bold text-xs uppercase rounded">
                SONIC FUEL
              </span>
              <h2 className="font-syne text-3xl sm:text-4xl font-extrabold uppercase text-[#e4e1e7] mt-1">
                OFFICIAL X-CLUB SOUNDTRACKS
              </h2>
              <p className="font-space text-sm text-[#c4c9ac]">
                Engineered for maximal neurological drive. Curated weekly by touring electronic DJs and heavy lifters.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenToast('Connecting to Protein X Spotify official hub...')}
                className="px-4 py-1.5 bg-[#1f1f23] text-[#e4e1e7] hover:text-[#c3f400] font-space font-bold text-xs rounded uppercase border border-[#2a292e]"
              >
                SPOTIFY
              </button>
              <button
                onClick={() => onOpenToast('Connecting to Protein X Apple Music official hub...')}
                className="px-4 py-1.5 bg-[#1f1f23] text-[#e4e1e7] hover:text-[#c3f400] font-space font-bold text-xs rounded uppercase border border-[#2a292e]"
              >
                APPLE MUSIC
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SOUNDTRACKS.map((track) => (
              <div
                key={track.id}
                className="bg-[#1f1f23] border border-[#2a292e] p-6 rounded-xl shadow-[4px_4px_0px_#000000] flex flex-col justify-between group hover:border-[#c3f400] transition-all"
              >
                <div>
                  <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4 bg-[#0e0e12]">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      src={track.coverImage}
                      alt={track.title}
                    />
                    <div className="absolute bottom-2 left-2 bg-[#0e0e12]/90 px-2 py-0.5 rounded font-space font-bold text-[10px] text-[#c3f400]">
                      {track.bpm}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-syne font-bold text-base uppercase text-[#e4e1e7]">
                      {track.title}
                    </h3>
                    <span className="material-symbols-outlined text-[#c3f400]">graphic_eq</span>
                  </div>
                  <p className="font-space text-xs text-[#c4c9ac] mb-4 leading-relaxed">
                    {track.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#2a292e]">
                  <div className="flex items-center gap-1.5 text-[#c4c9ac] font-space text-xs">
                    <span className="material-symbols-outlined text-base">music_note</span>
                    <span>{track.duration}</span>
                  </div>
                  <button
                    onClick={() => {
                      onPlayTrack(track);
                      onOpenToast(`▶ NOW STREAMING: ${track.title}`);
                    }}
                    className="flex items-center gap-1.5 bg-[#c3f400] hover:bg-[#abd600] text-[#161e00] px-4 py-1.5 rounded font-syne font-extrabold text-xs uppercase shadow-[2px_2px_0px_#000000] active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm font-bold">play_arrow</span>
                    STREAM
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UGC Wall: #PROTEINXARMY */}
      <section className="w-full px-4 sm:px-8 py-16 bg-[#0e0e12]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
            <div>
              <span className="px-3 py-1 bg-[#c3f400] text-[#161e00] font-space font-bold text-xs uppercase rounded">
                SOCIAL PROOF PROTOCOL
              </span>
              <h2 className="font-syne text-3xl sm:text-4xl font-extrabold uppercase text-[#e4e1e7] mt-1">
                #PROTEINXARMY IN THE WILD
              </h2>
              <p className="font-space text-sm text-[#c4c9ac]">
                Real lifts, ridiculous shaker recipes, and unhinged gym humor tagged on TikTok &amp; Instagram.
              </p>
            </div>
            <button
              onClick={() => onOpenToast('Upload portal opened. Tag @proteinx to earn 500 XP!')}
              className="px-4 py-2 bg-[#2a292e] hover:bg-[#353439] text-[#c3f400] font-space font-bold text-xs uppercase rounded transition-colors border border-[#353439]"
            >
              UPLOAD YOUR CLIP &amp; GET 500 XP
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* UGC 1 */}
            <div className="relative group bg-[#1b1b1f] border border-[#2a292e] rounded-xl overflow-hidden shadow-[4px_4px_0px_#000000]">
              <div className="h-80 w-full overflow-hidden bg-[#0e0e12]">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXJsFUkiYKPtidWk95Y0jSRPWc8-o8_HxvBrokBt2w6KrbPdRK6QpMyMJhOaUv2HEw-O_Rs7ap_F-jAUzu86Wun-RcLvbV-DLyMKLsyJid4Is0oKCw7aeRVN6qZSnMJtpZE55XK061g40qwu_5xsaBwfr5KNLXgUqToDkbcPD5oE6dPyTkuRCBBli2ZrnUwx30a62kxEGdgDcnUm5Ssa84Z7W4H_o1yTwEni0JrPqrecTi273oThP7"
                  alt="UGC lift celebration"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-transparent to-transparent flex flex-col justify-end p-4">
                <span className="font-space font-bold text-[10px] text-[#c3f400] uppercase">500LB DEADLIFT PR 🎉</span>
                <span className="font-syne font-bold text-sm text-[#e4e1e7]">@jake_lifts_heavy</span>
                <p className="font-space text-xs text-[#c4c9ac]">
                  "The sour pre-workout hit right when the beat dropped."
                </p>
              </div>
            </div>

            {/* UGC 2 */}
            <div className="relative group bg-[#1b1b1f] border border-[#2a292e] rounded-xl overflow-hidden shadow-[4px_4px_0px_#000000]">
              <div className="h-80 w-full overflow-hidden bg-[#0e0e12]">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqoXlvpK82CIHj2x3u4aNz9jPup72h8ROl9hZQOlLNrqZC_gyNUDrHmZuU3vn2Y2vrHKgrzYesPU60EIZKKat9Y09eY7Hpegff3PDIKkAZzPkFGHWC1IWgt9uudn3y8hq9ndeUWrYV92fvlAqWx9w4Bt7JXowSeRVijtNZ7QAnveyu_lbGwYgnznq04Y1mMySPSRrrn3rTb24AgYM_RnZRjAojfKezuki8gVlhlgpWKSAjMIutBDHg"
                  alt="Glaze bowl protein recipe"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-transparent to-transparent flex flex-col justify-end p-4">
                <span className="font-space font-bold text-[10px] text-[#ffb1c3] uppercase">GLAZE BOWL FORMULA 🍧</span>
                <span className="font-syne font-bold text-sm text-[#e4e1e7]">@fitfood_sam</span>
                <p className="font-space text-xs text-[#c4c9ac]">
                  "42g protein dessert that tastes like strawberry shortcake."
                </p>
              </div>
            </div>

            {/* UGC 3 */}
            <div className="relative group bg-[#1b1b1f] border border-[#2a292e] rounded-xl overflow-hidden shadow-[4px_4px_0px_#000000]">
              <div className="h-80 w-full overflow-hidden bg-[#0e0e12]">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVdZ1eRhEm1yZ6l9bLlbTQRNKNlDVT22xDCWYkMVszKNo6SCyd_q3qs33TLLOUu8sAqtMPYjCujEjmK7uPMkDsckIV_MoAKzHYSeErStPj994E6ZUY73-gJB5aumTGRNxi0SvYlnWPqE-efiby8ZyTR9w6Vpi0p0vhpkSB58RJfnGzC3HUYNjHpi6EeW1iFL7JLTfiLbnwVzEMCmlSD6KqpDV7dra-LM2qOtC0dFVg8WX6l7orsIOr"
                  alt="Pump cover mirror selfie"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-transparent to-transparent flex flex-col justify-end p-4">
                <span className="font-space font-bold text-[10px] text-[#c3f400] uppercase">PUMP COVER FIT CHECK ⚡</span>
                <span className="font-syne font-bold text-sm text-[#e4e1e7]">@duo_gains</span>
                <p className="font-space text-xs text-[#c4c9ac]">
                  "Matching drops for leg day trauma."
                </p>
              </div>
            </div>

            {/* UGC 4 */}
            <div className="relative group bg-[#1b1b1f] border border-[#2a292e] rounded-xl overflow-hidden shadow-[4px_4px_0px_#000000]">
              <div className="h-80 w-full overflow-hidden bg-[#0e0e12]">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4YlDtZfApRWmVl4sm3H4MDwdHN6Uepl5H7d26EApIA4YmUZPemIuWIql611ib2opCm9_ewLfKajhbpKkFz2w4_Ei9Pu_617jLN8-h3cFSiYouhoszn61VoH51RKc_lUM-qjVhgqSGT9Y_lECNsZsjj76Sf2di9Exz33F3IhkQhRZ_xu3MsxSOtE8CteIimwMpnV5x6yp-vpGzIhaHI2y7A_WHRTp0WthF4zE4lk_4zxgeRwqzLFnT"
                  alt="Post-workout POV"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-transparent to-transparent flex flex-col justify-end p-4">
                <span className="font-space font-bold text-[10px] text-[#ffb1c3] uppercase">POST-WORKOUT REALITY 😂</span>
                <span className="font-syne font-bold text-sm text-[#e4e1e7]">@gymrat_memes</span>
                <p className="font-space text-xs text-[#c4c9ac]">
                  "When the last sip of chocolate fudge isolate is gone forever."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tiered Loyalty & XP Progression System */}
      <section className="w-full px-4 sm:px-8 py-16 bg-[#1b1b1f] border-t border-[#2a292e]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="bg-[#1f1f23] p-6 sm:p-10 rounded-2xl border border-[#2a292e] shadow-[6px_6px_0px_#000000]">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
              <div>
                <span className="px-3 py-1 bg-[#c3f400] text-[#161e00] font-space font-bold text-xs uppercase rounded">
                  PROGRESSION LADDER
                </span>
                <h2 className="font-syne text-3xl sm:text-4xl font-extrabold uppercase text-[#e4e1e7] mt-2">
                  X-TIER XP &amp; PERKS
                </h2>
                <p className="font-space text-sm text-[#c4c9ac]">
                  Every order, UGC post, and friend referred earns you XP toward mythical perks and secret test batches.
                </p>
              </div>

              {/* Current Level Pill */}
              <div className="flex items-center gap-4 bg-[#2a292e] px-6 py-3 rounded-xl border border-[#353439] shadow-[4px_4px_0px_#000000]">
                <div className="w-10 h-10 rounded-full bg-[#c3f400] text-[#161e00] flex items-center justify-center font-syne font-black text-lg">
                  3
                </div>
                <div>
                  <span className="block font-space font-bold text-[10px] text-[#c4c9ac] uppercase">CURRENT STATUS</span>
                  <span className="font-syne font-extrabold text-sm text-[#c3f400] uppercase">
                    LEVEL 3: PUMP GOD
                  </span>
                </div>
                <div className="hidden sm:block pl-4 border-l border-[#353439] text-right">
                  <span className="block font-space text-[10px] text-[#c4c9ac] uppercase font-bold">NEXT UNLOCK</span>
                  <span className="font-space font-bold text-xs text-[#e4e1e7]">250 XP TO X-ICON</span>
                </div>
              </div>
            </div>

            {/* Progress Bar Visualizer */}
            <div className="w-full mb-8">
              <div className="w-full bg-[#2a292e] h-4 rounded-full overflow-hidden p-0.5 border border-[#353439]">
                <div className="bg-gradient-to-r from-[#ff4b89] via-[#c3f400] to-[#c3f400] h-full rounded-full w-[72%] transition-all duration-500" />
              </div>
              <div className="flex justify-between items-center mt-2 font-space font-bold text-[10px] text-[#c4c9ac]">
                <span>LEVEL 1: ROOKIE (0 XP)</span>
                <span>LEVEL 2: SORE TOMORROW (1,000 XP)</span>
                <span className="text-[#c3f400]">LEVEL 3: PUMP GOD (2,500 XP)</span>
                <span>LEVEL 4: X-ICON (5,000 XP)</span>
              </div>
            </div>

            {/* 4 Tiers Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Level 1 */}
              <div className="bg-[#2a292e] p-5 rounded-xl border border-[#353439] flex flex-col justify-between">
                <div>
                  <span className="font-space font-bold text-[10px] text-[#c4c9ac] uppercase">LEVEL 01</span>
                  <h3 className="font-syne font-bold text-base uppercase text-[#e4e1e7] mt-1 mb-2">Rookie Lifter</h3>
                  <p className="font-space text-xs text-[#c4c9ac] mb-4">
                    The entry gate for newcomers to clean kinetic fitness.
                  </p>
                  <ul className="space-y-1.5 text-xs font-space text-[#c4c9ac]">
                    <li className="flex items-center gap-2 text-[#e4e1e7]"><span className="text-[#c3f400]">✓</span> $10 Welcome credit</li>
                    <li className="flex items-center gap-2 text-[#e4e1e7]"><span className="text-[#c3f400]">✓</span> Access to public drops</li>
                    <li className="flex items-center gap-2 text-[#e4e1e7]"><span className="text-[#c3f400]">✓</span> Discord member badge</li>
                  </ul>
                </div>
                <span className="mt-4 block font-space font-bold text-[10px] text-[#c4c9ac] uppercase bg-[#1f1f23] py-1 rounded text-center">
                  UNLOCKED
                </span>
              </div>

              {/* Level 2 */}
              <div className="bg-[#2a292e] p-5 rounded-xl border border-[#353439] flex flex-col justify-between">
                <div>
                  <span className="font-space font-bold text-[10px] text-[#ffb1c3] uppercase">LEVEL 02</span>
                  <h3 className="font-syne font-bold text-base uppercase text-[#e4e1e7] mt-1 mb-2">Sore Tomorrow</h3>
                  <p className="font-space text-xs text-[#c4c9ac] mb-4">
                    Consistent training consistency &amp; regular monthly restocks.
                  </p>
                  <ul className="space-y-1.5 text-xs font-space text-[#c4c9ac]">
                    <li className="flex items-center gap-2 text-[#e4e1e7]"><span className="text-[#ffb1c3]">✓</span> Free Shaker Cup with drops</li>
                    <li className="flex items-center gap-2 text-[#e4e1e7]"><span className="text-[#ffb1c3]">✓</span> 15-min drop pre-access</li>
                    <li className="flex items-center gap-2 text-[#e4e1e7]"><span className="text-[#ffb1c3]">✓</span> 1.5x XP multiplier</li>
                  </ul>
                </div>
                <span className="mt-4 block font-space font-bold text-[10px] text-[#ffb1c3] uppercase bg-[#1f1f23] py-1 rounded text-center">
                  UNLOCKED
                </span>
              </div>

              {/* Level 3: Active Tier */}
              <div className="bg-[#353439] p-5 rounded-xl border-2 border-[#c3f400] flex flex-col justify-between shadow-[0_0_20px_rgba(195,244,0,0.2)] relative">
                <div className="absolute -top-3 right-4 bg-[#c3f400] text-[#161e00] px-2 py-0.5 font-space font-bold text-[10px] uppercase rounded">
                  YOUR TIER
                </div>
                <div>
                  <span className="font-space font-bold text-[10px] text-[#c3f400] uppercase">LEVEL 03</span>
                  <h3 className="font-syne font-bold text-base uppercase text-[#e4e1e7] mt-1 mb-2">Pump God</h3>
                  <p className="font-space text-xs text-[#c4c9ac] mb-4">
                    Core loyalists holding heavy weight and spreading the word.
                  </p>
                  <ul className="space-y-1.5 text-xs font-space text-[#e4e1e7]">
                    <li className="flex items-center gap-2"><span className="text-[#c3f400]">✓</span> Secret flavor R&amp;D test vials</li>
                    <li className="flex items-center gap-2"><span className="text-[#c3f400]">✓</span> Free express shipping always</li>
                    <li className="flex items-center gap-2"><span className="text-[#c3f400]">✓</span> Voting rights on drop flavors</li>
                  </ul>
                </div>
                <span className="mt-4 block font-space font-bold text-[10px] text-[#161e00] bg-[#c3f400] py-1 rounded text-center">
                  ACTIVE PROTOCOL
                </span>
              </div>

              {/* Level 4 */}
              <div className="bg-[#2a292e] p-5 rounded-xl border border-[#353439] flex flex-col justify-between opacity-75 hover:opacity-100 transition-opacity">
                <div>
                  <span className="font-space font-bold text-[10px] text-[#c4c9ac] uppercase">LEVEL 04 • ELITE</span>
                  <h3 className="font-syne font-bold text-base uppercase text-[#e4e1e7] mt-1 mb-2">X-Icon</h3>
                  <p className="font-space text-xs text-[#c4c9ac] mb-4">
                    Inner circle royalty. True cultural ambassadors of the movement.
                  </p>
                  <ul className="space-y-1.5 text-xs font-space text-[#c4c9ac]">
                    <li className="flex items-center gap-2">• VIP invite to Annual IRL Rave Meet</li>
                    <li className="flex items-center gap-2">• Co-create a signature formula flavor</li>
                    <li className="flex items-center gap-2">• Custom engraved stainless shaker</li>
                  </ul>
                </div>
                <span className="mt-4 block font-space font-bold text-[10px] text-[#c4c9ac] uppercase bg-[#1f1f23] py-1 rounded text-center">
                  LOCKED (250 XP LEFT)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Hub CTA & Contract */}
      <section className="w-full px-4 sm:px-8 py-16 bg-[#0e0e12]">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <span className="px-3 py-1 bg-[#ff4b89] text-[#590026] font-space font-bold text-xs uppercase rounded">
              APPLY FOR AMBASSADOR CONTRACT
            </span>
            <h2 className="font-syne text-3xl sm:text-4xl font-extrabold uppercase text-[#e4e1e7] mt-2 mb-2">
              ARE YOU A HIGH-DRIVE CREATOR?
            </h2>
            <p className="font-space text-base text-[#c4c9ac] max-w-2xl mb-8 leading-relaxed">
              We pay 15% recurring affiliate commission, send unreleased drops straight to your door, and sponsor creator meetups. No follower minimums — only pure authenticity and passion for lifting culture.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setShowAmbassadorModal(true)}
                className="bg-[#c3f400] hover:bg-[#abd600] text-[#161e00] font-syne font-extrabold text-sm uppercase px-8 py-3.5 rounded shadow-[4px_4px_0px_#ff4b89] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                APPLY TO ROSTER ⚡
              </button>
              <button
                onClick={() => onOpenToast('Ambassador FAQ & Terms: 15% net rev-share paid bi-weekly via Stripe.')}
                className="font-syne font-bold text-sm text-[#e4e1e7] hover:text-[#c3f400] uppercase transition-colors"
              >
                Read Creator FAQ &amp; Terms →
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#1f1f23] border border-[#2a292e] p-6 rounded-2xl shadow-[4px_4px_0px_#000000]">
            <div className="flex items-center gap-2 mb-3 text-[#c3f400]">
              <span className="material-symbols-outlined text-lg">forum</span>
              <span className="font-syne font-extrabold text-xs uppercase">CREATOR PERKS SUMMARY</span>
            </div>
            <div className="space-y-2 text-xs font-space text-[#c4c9ac]">
              <div className="p-3 bg-[#2a292e] rounded-lg">
                <strong className="text-[#e4e1e7] block mb-0.5">15% Lifetime Cash Payouts</strong>
                Tracked in real-time via dedicated dashboard.
              </div>
              <div className="p-3 bg-[#2a292e] rounded-lg">
                <strong className="text-[#e4e1e7] block mb-0.5">Monthly Supplement Allowance</strong>
                $250 in free formulas, pre-workouts &amp; apparel.
              </div>
              <div className="p-3 bg-[#2a292e] rounded-lg">
                <strong className="text-[#e4e1e7] block mb-0.5">Studio Collab Support</strong>
                Access to our production spaces and gear giveaways.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ambassador Application Modal */}
      {showAmbassadorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#131317] border-2 border-[#c3f400] rounded-2xl overflow-hidden shadow-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="font-syne font-bold text-sm uppercase text-[#c3f400]">
                CREATOR ROSTER APPLICATION
              </span>
              <button onClick={() => setShowAmbassadorModal(false)} className="text-[#c4c9ac] hover:text-[#e4e1e7]">
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowAmbassadorModal(false);
                onOpenToast('✓ APPLICATION TRANSMITTED! OUR TALENT SCOUT WILL DM YOU.');
              }}
              className="space-y-4 font-space text-xs"
            >
              <div>
                <label className="block font-bold uppercase text-[#c4c9ac] mb-1">YOUR PRIMARY SOCIAL HANDLE</label>
                <input
                  type="text"
                  required
                  placeholder="@tiktok or @instagram"
                  className="w-full bg-[#1b1b1f] border border-[#2a292e] p-2.5 rounded text-[#e4e1e7] focus:outline-none focus:border-[#c3f400]"
                />
              </div>
              <div>
                <label className="block font-bold uppercase text-[#c4c9ac] mb-1">EMAIL / CONTACT</label>
                <input
                  type="email"
                  required
                  placeholder="manager@domain.com"
                  className="w-full bg-[#1b1b1f] border border-[#2a292e] p-2.5 rounded text-[#e4e1e7] focus:outline-none focus:border-[#c3f400]"
                />
              </div>
              <div>
                <label className="block font-bold uppercase text-[#c4c9ac] mb-1">WHAT'S YOUR LIFTING / TRAINING NICHE?</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Powerlifting, Hyrox, Hybrid, Streetwear Gym Humor"
                  className="w-full bg-[#1b1b1f] border border-[#2a292e] p-2.5 rounded text-[#e4e1e7] focus:outline-none focus:border-[#c3f400]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#c3f400] text-[#161e00] font-syne font-extrabold text-xs uppercase rounded shadow-[3px_3px_0px_#ff4b89]"
              >
                SUBMIT AMBASSADOR DOSSIER ⚡
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
