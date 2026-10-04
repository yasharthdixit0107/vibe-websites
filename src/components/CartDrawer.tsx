import React, { useState } from 'react';
import { CartItem, ScreenType } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onNavigate: (screen: ScreenType) => void;
  onCheckoutSuccess: (items: CartItem[], total: number, discount: number, shipping: number) => void;
  onOpenProfile?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onNavigate,
  onCheckoutSuccess,
  onOpenProfile
}) => {
  const [promoCode, setPromoCode] = useState('GENZX');
  const [discountPercent, setDiscountPercent] = useState(20);
  const [promoMessage, setPromoMessage] = useState('GENZX (20% OFF) APPLIED!');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlacedNum, setOrderPlacedNum] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 7.99;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const freeShippingThreshold = 50;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const neededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'GENZX') {
      setDiscountPercent(20);
      setPromoMessage('GENZX (20% OFF) APPLIED!');
    } else if (clean === 'TASTE15') {
      setDiscountPercent(15);
      setPromoMessage('TASTE15 (15% OFF) APPLIED!');
    } else if (clean === 'MARCUS' || clean === 'HYBRID' || clean === 'KAIFLOW' || clean === 'MIAPULSE') {
      setDiscountPercent(15);
      setPromoMessage(`CREATOR CODE ${clean} (15% OFF) APPLIED!`);
    } else {
      setDiscountPercent(0);
      setPromoMessage('INVALID CODE. TRY "GENZX"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#131317] border-l-2 border-[#2a292e] shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#2a292e] bg-[#1b1b1f]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="font-syne text-xl font-extrabold uppercase text-[#e4e1e7]">
                  YOUR DROP BAG
                </span>
                <span className="bg-[#ff4b89] text-[#590026] px-2 py-0.5 font-syne font-bold text-xs rounded">
                  {items.reduce((sum, item) => sum + item.quantity, 0)} ITEMS
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded bg-[#2a292e] hover:bg-[#353439] flex items-center justify-center text-[#e4e1e7] transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="bg-[#131317] p-3 rounded border border-[#2a292e]">
              <div className="flex justify-between items-center text-xs font-space font-bold uppercase mb-1.5">
                <span className={neededForFreeShipping === 0 ? 'text-[#c3f400]' : 'text-[#c4c9ac]'}>
                  {neededForFreeShipping === 0
                    ? '🎉 FREE EXPRESS SHIPPING UNLOCKED!'
                    : `ADD $${neededForFreeShipping.toFixed(2)} FOR FREE SHIPPING`}
                </span>
                <span className="text-[#c3f400]">{progressPercent.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-[#2a292e] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#c3f400] h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <span className="material-symbols-outlined text-6xl text-[#353439] mb-4">
                  shopping_basket
                </span>
                <h3 className="font-syne text-xl font-bold uppercase text-[#e4e1e7] mb-2">
                  YOUR BAG IS EMPTY
                </h3>
                <p className="font-space text-sm text-[#c4c9ac] mb-6">
                  Don't let your gains wither away. Check out our latest drop releases.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('shop-drops');
                  }}
                  className="px-6 py-3 bg-[#c3f400] text-[#161e00] font-syne font-extrabold text-sm uppercase rounded shadow-[3px_3px_0px_#ff4b89]"
                >
                  EXPLORE THE VAULT
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-[#1b1b1f] rounded-lg border border-[#2a292e] shadow-[2px_2px_0px_#000000] relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-[#0e0e12] rounded p-1 flex items-center justify-center shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-1">
                      <h4 className="font-syne text-xs font-bold uppercase text-[#e4e1e7] truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#c4c9ac] hover:text-[#ffb4ab] transition-colors"
                        title="Remove"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1 my-1">
                      <span className="text-[10px] bg-[#2a292e] text-[#c3f400] px-1.5 py-0.2 rounded font-space font-bold">
                        {item.flavor}
                      </span>
                      <span className="text-[10px] bg-[#2a292e] text-[#c4c9ac] px-1.5 py-0.2 rounded font-space">
                        {item.size}
                      </span>
                      {item.isSubscription && (
                        <span className="text-[10px] bg-[#ff4b89] text-[#590026] px-1.5 py-0.2 rounded font-space font-bold">
                          SUB 20% OFF
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity stepper */}
                      <div className="flex items-center bg-[#131317] border border-[#2a292e] rounded">
                        <button
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center font-bold text-xs hover:bg-[#2a292e] text-[#e4e1e7]"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#e4e1e7]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center font-bold text-xs hover:bg-[#2a292e] text-[#e4e1e7]"
                        >
                          +
                        </button>
                      </div>

                      {/* Line Price */}
                      <span className="font-syne font-bold text-sm text-[#c3f400]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer / Checkout */}
          {items.length > 0 && (
            <div className="p-6 bg-[#1b1b1f] border-t border-[#2a292e] space-y-4">
              {/* Promo code form */}
              <form onSubmit={applyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="PROMO CODE"
                  className="flex-1 bg-[#131317] border border-[#353439] px-3 py-1.5 rounded font-space font-bold text-xs text-[#e4e1e7] uppercase focus:outline-none focus:border-[#c3f400]"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#2a292e] hover:bg-[#353439] text-[#e4e1e7] font-space font-bold text-xs uppercase rounded transition-colors"
                >
                  APPLY
                </button>
              </form>

              {promoMessage && (
                <div className="text-[11px] font-space font-bold text-[#c3f400] uppercase">
                  {promoMessage}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs font-space">
                <div className="flex justify-between text-[#c4c9ac]">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#e4e1e7]">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#ff4b89]">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="font-bold">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#c4c9ac]">
                  <span>Express Insured Shipping</span>
                  <span className="font-bold text-[#e4e1e7]">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#2a292e] flex justify-between text-base font-syne font-extrabold text-[#e4e1e7]">
                  <span>TOTAL ESTIMATED</span>
                  <span className="text-[#c3f400]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              {orderPlacedNum ? (
                <div className="bg-[#19181d] border-2 border-[#c3f400] p-4 text-center space-y-3 shadow-[4px_4px_0px_#000000] animate-fadeIn">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-[#c3f400] text-[#0e0e12] rounded-full mx-auto">
                    <span className="material-symbols-outlined text-2xl font-bold">check</span>
                  </div>
                  <div>
                    <h4 className="font-syne font-extrabold text-base uppercase text-white">
                      ORDER #{orderPlacedNum} CONFIRMED!
                    </h4>
                    <p className="font-space text-xs text-[#8f919d] mt-1">
                      Status: <span className="text-[#fbbf24] font-bold">Processing in Cleanroom</span>
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setOrderPlacedNum(null);
                      onClose();
                      if (onOpenProfile) onOpenProfile();
                    }}
                    className="w-full py-2.5 bg-[#c3f400] text-[#0e0e12] font-space font-extrabold text-xs uppercase shadow-[2px_2px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                  >
                    📦 TRACK IN ORDER HISTORY →
                  </button>
                </div>
              ) : (
                <button
                  disabled={isCheckingOut}
                  onClick={() => {
                    setIsCheckingOut(true);
                    const newNum = `KX-${Math.floor(10000 + Math.random() * 90000)}`;
                    setTimeout(() => {
                      setOrderPlacedNum(newNum);
                      onCheckoutSuccess(items, total, discountAmount, shipping);
                      setIsCheckingOut(false);
                    }, 500);
                  }}
                  className="w-full py-3.5 bg-[#c3f400] hover:bg-[#abd600] disabled:opacity-50 text-[#161e00] font-syne font-extrabold text-sm uppercase rounded shadow-[4px_4px_0px_#ff4b89] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">bolt</span>
                  <span>
                    {isCheckingOut
                      ? 'PROCESSING PAYMENT...'
                      : `SECURE INSTANT CHECKOUT • $${total.toFixed(2)}`}
                  </span>
                </button>
              )}

              <div className="flex items-center justify-center gap-4 text-[10px] text-[#c4c9ac] font-space uppercase">
                <span>🔒 256-Bit Encrypted</span>
                <span>⚡ 24H Nevada Dispatch</span>
                <span>🔄 30-Day Zero-Chalk Guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
