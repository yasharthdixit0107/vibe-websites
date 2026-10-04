import React, { useState, useEffect } from 'react';
import { Order } from '../types';
import { OrderHistory } from './OrderHistory';
import { USER_AVATAR, ALL_VAULT_PRODUCTS } from '../data/mockData';
import { User } from 'firebase/auth';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onReorder: (order: Order) => void;
  onOpenToast: (msg: string) => void;
  user: User | null;
  onSignInGoogle: () => void;
  onSignOutGoogle: () => void;
  isFirestoreLive?: boolean;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  orders,
  onReorder,
  onOpenToast,
  user,
  onSignInGoogle,
  onSignOutGoogle,
  isFirestoreLive = true,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'pass' | 'address' | 'subs'>('orders');

  // Subscription state
  const [subFrequency, setSubFrequency] = useState('Every 30 Days');
  const [isSubPaused, setIsSubPaused] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const displayName = user?.displayName || 'KAI CHEN';
  const displayEmail = user?.email || 'yasharthdixit0107@gmail.com';
  const displayPhoto = user?.photoURL || USER_AVATAR;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Account Dialog */}
      <div className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0e0e12] border-2 border-[#c3f400] shadow-[10px_10px_0px_#000000] overflow-hidden">
        {/* Header Profile Identity Strip */}
        <div className="bg-[#19181d] border-b-2 border-[#2a292e] p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={displayPhoto}
                alt={displayName}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#c3f400] shadow-[3px_3px_0px_#000000]"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#c3f400] rounded-full border-2 border-[#0e0e12]" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-syne font-extrabold text-xl sm:text-2xl uppercase tracking-tight text-white">
                  {displayName}
                </h2>
                <span className="bg-[#c3f400] text-[#0e0e12] font-space font-extrabold text-[10px] uppercase px-2.5 py-0.5 shadow-[1px_1px_0px_#000000]">
                  TITANIUM VIP // TIER 3
                </span>
                {isFirestoreLive && (
                  <span className="bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/40 font-space font-extrabold text-[10px] uppercase px-2 py-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-ping" />
                    FIRESTORE SYNC
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 font-space text-xs text-[#8f919d] mt-1">
                <span>@{user ? displayName.toLowerCase().replace(/\s+/g, '_') : 'kaichen_lifts'}</span>
                <span>•</span>
                <span>{displayEmail}</span>
                <span>•</span>
                <span className="text-[#c3f400] font-bold">
                  PASS {user ? `#KP-${user.uid.slice(0, 5).toUpperCase()}` : '#KP-84920'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Google Auth Status / Actions */}
            {user ? (
              <button
                onClick={onSignOutGoogle}
                className="bg-[#242329] hover:bg-[#ff4b89] text-white hover:text-[#590026] border border-[#353439] px-3 py-1.5 font-space text-xs font-bold uppercase transition-colors"
              >
                SIGN OUT
              </button>
            ) : (
              <button
                onClick={onSignInGoogle}
                className="bg-white hover:bg-slate-100 text-[#0e0e12] font-space font-extrabold text-xs uppercase px-3.5 py-2 shadow-[2px_2px_0px_#c3f400] flex items-center gap-2 transition-all"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.15Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
                  />
                </svg>
                <span>GOOGLE SIGN-IN</span>
              </button>
            )}

            {/* XP Points Pill */}
            <div className="bg-[#131317] border border-[#353439] px-4 py-1.5 text-right">
              <div className="font-space text-[9px] uppercase text-[#8f919d]">
                BALANCE
              </div>
              <div className="font-syne font-extrabold text-sm text-[#c3f400]">
                4,850 XP
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 bg-[#2a292e] hover:bg-[#ff4b89] text-white hover:text-[#590026] border border-[#353439] flex items-center justify-center font-bold text-base transition-colors shadow-[2px_2px_0px_#000000]"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Google Authentication banner notice if unauthenticated */}
        {!user && (
          <div className="bg-[#131317] border-b border-[#2a292e] px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-space">
            <div className="flex items-center gap-2 text-[#c4c9ac]">
              <span className="material-symbols-outlined text-[#c3f400] text-sm">lock</span>
              <span>Sign in with Google to synchronize your purchases and custom formulas to Firebase Firestore.</span>
            </div>
            <button
              onClick={onSignInGoogle}
              className="text-[#c3f400] hover:underline font-bold text-xs uppercase"
            >
              AUTHENTICATE NOW →
            </button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto no-scrollbar bg-[#141418] border-b border-[#2a292e] px-4 sm:px-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`font-space font-bold text-xs uppercase px-4 py-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-[#c3f400] text-[#c3f400] bg-[#19181d]'
                : 'border-transparent text-[#8f919d] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">inventory_2</span>
            <span>ORDER HISTORY ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('pass')}
            className={`font-space font-bold text-xs uppercase px-4 py-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'pass'
                ? 'border-[#c3f400] text-[#c3f400] bg-[#19181d]'
                : 'border-transparent text-[#8f919d] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">badge</span>
            <span>PASS &amp; PERKS</span>
          </button>

          <button
            onClick={() => setActiveTab('subs')}
            className={`font-space font-bold text-xs uppercase px-4 py-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'subs'
                ? 'border-[#c3f400] text-[#c3f400] bg-[#19181d]'
                : 'border-transparent text-[#8f919d] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">autorenew</span>
            <span>SUBSCRIPTIONS (1)</span>
          </button>

          <button
            onClick={() => setActiveTab('address')}
            className={`font-space font-bold text-xs uppercase px-4 py-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'address'
                ? 'border-[#c3f400] text-[#c3f400] bg-[#19181d]'
                : 'border-transparent text-[#8f919d] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">local_shipping</span>
            <span>SHIPPING &amp; PAYMENT</span>
          </button>
        </div>

        {/* Tab Body with Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {activeTab === 'orders' && (
            <OrderHistory
              orders={orders}
              onReorder={onReorder}
              onOpenToast={onOpenToast}
            />
          )}

          {activeTab === 'pass' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#1c1b1f] via-[#242329] to-[#141418] border-2 border-[#c3f400] p-6 shadow-[6px_6px_0px_#000000] relative overflow-hidden">
                <div className="absolute top-2 right-4 font-syne font-black text-6xl text-[#c3f400]/10 select-none">
                  TIER 03
                </div>

                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="bg-[#c3f400] text-[#0e0e12] font-space font-extrabold text-[10px] uppercase px-2 py-0.5">
                      OFFICIAL DIGITAL VAULT PASS
                    </span>
                    <h4 className="font-syne font-extrabold text-2xl uppercase text-white mt-1">
                      TITANIUM ALL-ACCESS PASS
                    </h4>
                  </div>
                  <span className="font-space font-bold text-xs text-[#c3f400]">
                    PASS ID: #KP-84920
                  </span>
                </div>

                {/* Level Progress */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between font-space text-xs">
                    <span className="text-[#8f919d]">Level 3 Progression:</span>
                    <span className="text-white font-bold">4,850 / 5,000 XP (150 XP to Diamond Tier)</span>
                  </div>
                  <div className="w-full h-3 bg-[#131317] border border-[#353439] overflow-hidden p-0.5">
                    <div
                      className="h-full bg-[#c3f400]"
                      style={{ width: '97%' }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-[#131317] p-3 border border-[#2a292e]">
                    <span className="material-symbols-outlined text-[#c3f400] text-xl mb-1">
                      bolt
                    </span>
                    <div className="font-syne font-bold text-xs text-white uppercase">
                      15-Min Early Drop Access
                    </div>
                    <div className="font-space text-[10px] text-[#8f919d]">
                      Guaranteed inventory for all limited batches.
                    </div>
                  </div>

                  <div className="bg-[#131317] p-3 border border-[#2a292e]">
                    <span className="material-symbols-outlined text-[#ff4b89] text-xl mb-1">
                      local_shipping
                    </span>
                    <div className="font-syne font-bold text-xs text-white uppercase">
                      Free Express Shipping
                    </div>
                    <div className="font-space text-[10px] text-[#8f919d]">
                      Applied automatically to all orders.
                    </div>
                  </div>

                  <div className="bg-[#131317] p-3 border border-[#2a292e]">
                    <span className="material-symbols-outlined text-[#00e5ff] text-xl mb-1">
                      science
                    </span>
                    <div className="font-syne font-bold text-xs text-white uppercase">
                      Taste Lab Voting Weight
                    </div>
                    <div className="font-space text-[10px] text-[#8f919d]">
                      2x vote weight on prototype flavor ballots.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'subs' && (
            <div className="space-y-6">
              <div className="bg-[#19181d] border-2 border-[#2a292e] p-5 shadow-[4px_4px_0px_#000000]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2a292e] pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={ALL_VAULT_PRODUCTS[0].image}
                      alt={ALL_VAULT_PRODUCTS[0].name}
                      className="w-14 h-14 object-cover border border-[#2a292e]"
                    />
                    <div>
                      <span className="bg-[#c3f400]/20 text-[#c3f400] font-space font-extrabold text-[10px] uppercase px-2 py-0.5 border border-[#c3f400]/30 inline-block mb-1">
                        ACTIVE VIP RECURRING
                      </span>
                      <h4 className="font-syne font-extrabold text-base uppercase text-white">
                        HYPER-ISOLATE // BIRTHDAY GLAZE #014
                      </h4>
                      <p className="font-space text-xs text-[#8f919d]">
                        Glazed Donut Core • 2.2 lbs Tub • $35.99/mo (Saved 20%)
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-space text-[10px] text-[#8f919d] block">
                      NEXT DISPATCH
                    </span>
                    <span className="font-syne font-extrabold text-sm text-[#c3f400]">
                      {isSubPaused ? 'PAUSED' : 'OCTOBER 28, 2026'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-space text-xs uppercase text-[#8f919d] mb-1">
                      Delivery Frequency:
                    </label>
                    <select
                      value={subFrequency}
                      onChange={(e) => {
                        setSubFrequency(e.target.value);
                        onOpenToast(`Subscription cycle updated to ${e.target.value}`);
                      }}
                      className="w-full bg-[#131317] border border-[#353439] text-xs font-space text-white px-3 py-2 outline-none"
                    >
                      <option>Every 21 Days (High Volume)</option>
                      <option>Every 30 Days (Standard Cycle)</option>
                      <option>Every 45 Days</option>
                      <option>Every 60 Days (Occasional)</option>
                    </select>
                  </div>

                  <div className="flex items-end gap-2">
                    <button
                      onClick={() => {
                        setIsSubPaused(!isSubPaused);
                        onOpenToast(
                          isSubPaused
                            ? '✓ Subscription resumed! Next drop ships Oct 28.'
                            : '⏸ Subscription paused for 30 days.'
                        );
                      }}
                      className="flex-1 bg-[#242329] hover:bg-[#2a292e] text-white border border-[#353439] font-space font-bold text-xs uppercase py-2 transition-colors"
                    >
                      {isSubPaused ? 'RESUME SUBSCRIPTION' : 'PAUSE 1 CYCLE'}
                    </button>

                    <button
                      onClick={() => onOpenToast('⚡ Next delivery expedited! Ships tomorrow.')}
                      className="flex-1 bg-[#c3f400] text-[#0e0e12] font-space font-extrabold text-xs uppercase py-2 shadow-[2px_2px_0px_#000000]"
                    >
                      SHIP NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'address' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#19181d] border-2 border-[#2a292e] p-5">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-syne font-bold text-sm uppercase text-white">
                    PRIMARY SHIPPING DESTINATION
                  </h4>
                  <span className="bg-[#c3f400]/20 text-[#c3f400] font-space text-[10px] font-bold px-2 py-0.5">
                    DEFAULT
                  </span>
                </div>
                <p className="font-space text-xs text-[#8f919d] leading-relaxed">
                  <strong className="text-white">Kai Chen</strong><br />
                  1420 Olympic Blvd, Apt 4B<br />
                  Los Angeles, CA 90015<br />
                  United States<br />
                  Phone: (213) 555-0194
                </p>
                <button
                  onClick={() => onOpenToast('Edit address flow triggered')}
                  className="mt-4 font-space text-xs font-bold text-[#c3f400] hover:underline"
                >
                  EDIT ADDRESS ↗
                </button>
              </div>

              <div className="bg-[#19181d] border-2 border-[#2a292e] p-5">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-syne font-bold text-sm uppercase text-white">
                    PAYMENT METHOD
                  </h4>
                  <span className="bg-[#c3f400]/20 text-[#c3f400] font-space text-[10px] font-bold px-2 py-0.5">
                    PRIMARY
                  </span>
                </div>
                <p className="font-space text-xs text-[#8f919d] leading-relaxed">
                  <strong className="text-white">Apple Pay / Visa Ending in 4920</strong><br />
                  Exp: 08/29<br />
                  Billing same as shipping address
                </p>
                <button
                  onClick={() => onOpenToast('Update payment flow triggered')}
                  className="mt-4 font-space text-xs font-bold text-[#c3f400] hover:underline"
                >
                  UPDATE PAYMENT METHOD ↗
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
