'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  PhoneCall,
  Sparkles,
  ArrowRight,
  Gift
} from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    toggleBlouseStitching,
    cartSubtotalINR,
    formatPrice,
    checkoutViaWhatsApp
  } = useShop();

  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [giftBox, setGiftBox] = useState(true);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#12151B] border-l border-[#C59B27]/30 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#C59B27]/20 flex items-center justify-between bg-[#0E1013]">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#C59B27]" />
              <h2 className="font-serif text-lg tracking-[0.16em] uppercase text-[#FDF4D4] font-medium">
                Your Shopping Bag
              </h2>
              <span className="text-xs text-[#C59B27] font-semibold font-mono">
                ({cart.length})
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-[#ECE4D8]/60 hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {checkoutComplete ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#170507] border-2 border-[#C59B27] flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-[#C59B27]" />
                </div>
                <h3 className="font-serif text-2xl text-[#FDF4D4] font-medium mb-2">
                  Reservation Confirmed
                </h3>
                <p className="text-xs text-[#ECE4D8]/70 leading-relaxed max-w-xs mx-auto mb-6">
                  Your heirlooms have been reserved with our senior archivist. A luxury concierge specialist will contact you shortly to confirm measurements and insured dispatch.
                </p>
                <button
                  onClick={() => {
                    setCheckoutComplete(false);
                    closeCart();
                  }}
                  className="px-6 py-2.5 bg-[#C59B27] text-[#0E1013] text-xs font-semibold tracking-[0.2em] uppercase rounded"
                >
                  Return to Boutique
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag className="w-12 h-12 text-[#C59B27]/40 mx-auto mb-3" />
                <h3 className="font-serif text-xl text-[#FDF4D4] font-medium mb-2">
                  Your Bag Is Empty
                </h3>
                <p className="text-xs text-[#ECE4D8]/60 font-light mb-6 max-w-xs mx-auto">
                  Explore our treasury of hand-woven Banarasi Katan, Kanchipuram, and Chanderi heirlooms.
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 bg-[#C59B27] text-[#0E1013] text-xs font-semibold tracking-[0.2em] uppercase rounded shadow-lg"
                >
                  Explore The Collection
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.saree.id}
                    className="p-4 rounded-lg bg-[#0E1013] border border-[#C59B27]/20 flex gap-4"
                  >
                    {/* Saree Thumbnail */}
                    <img
                      src={item.saree.images.main}
                      alt={item.saree.name}
                      className="w-20 h-24 object-cover object-center rounded border border-[#C59B27]/25 flex-shrink-0"
                    />

                    {/* Saree Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <span className="text-[10px] text-[#C59B27] uppercase tracking-wider font-medium">
                            {item.saree.weave}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.saree.id)}
                            className="text-[#ECE4D8]/40 hover:text-red-400 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <h4 className="font-serif text-sm text-[#FDF4D4] font-medium line-clamp-1 mt-0.5">
                          {item.saree.name}
                        </h4>

                        <span className="font-serif text-sm text-[#F6E7B9] font-medium block mt-1">
                          {formatPrice(item.saree.priceINR)}
                        </span>
                      </div>

                      {/* Blouse Stitching Addon Toggle */}
                      <div className="pt-2 mt-2 border-t border-[#C59B27]/10 flex items-center justify-between">
                        <label className="flex items-center space-x-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.includeBlouseStitching}
                            onChange={() => toggleBlouseStitching(item.saree.id)}
                            className="rounded border-[#C59B27]/40 text-[#C59B27] focus:ring-0 focus:outline-none bg-[#15181E]"
                          />
                          <span className="text-[10px] text-[#ECE4D8]/80 font-light">
                            Bespoke Blouse Tailoring (+{formatPrice(2800)})
                          </span>
                        </label>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-[#C59B27]/30 rounded bg-[#15181E]">
                          <button
                            onClick={() => updateQuantity(item.saree.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-[#ECE4D8]/60 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono text-[#FDF4D4]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.saree.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-[#ECE4D8]/60 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Complimentary Gift Wrapping Note */}
                <div className="p-3.5 rounded bg-[#170507] border border-[#C59B27]/25 flex items-center space-x-3">
                  <Gift className="w-5 h-5 text-[#C59B27] flex-shrink-0" />
                  <div className="text-xs">
                    <span className="text-[#F6E7B9] font-medium block">Complimentary Heirloom Box</span>
                    <span className="text-[10px] text-[#ECE4D8]/60 font-light block">
                      Includes velvet-lined keepsake chest & handloom certificate.
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Subtotal & Checkouts */}
          {cart.length > 0 && !checkoutComplete && (
            <div className="p-6 border-t border-[#C59B27]/20 bg-[#0E1013] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#ECE4D8]/60 block">
                    Estimated Bag Total
                  </span>
                  <span className="text-[11px] text-[#C59B27]">Inclusive of Insured Delivery</span>
                </div>
                <span className="font-serif text-2xl text-[#F6E7B9] font-semibold">
                  {formatPrice(cartSubtotalINR)}
                </span>
              </div>

              {/* Direct WhatsApp Checkout (Luxury standard) */}
              <button
                onClick={checkoutViaWhatsApp}
                className="w-full py-3 bg-[#0C3027] hover:bg-[#134E3F] text-[#ECE4D8] border border-[#1B5E4B] text-xs font-semibold tracking-[0.18em] uppercase rounded flex items-center justify-center space-x-2 transition-all shadow-md"
              >
                <PhoneCall className="w-4 h-4 text-[#C59B27]" />
                <span>Checkout via WhatsApp Concierge</span>
              </button>

              {/* Secure Online Checkout */}
              <button
                onClick={() => setCheckoutComplete(true)}
                className="w-full py-3.5 bg-gradient-to-r from-[#C59B27] via-[#DFBD6E] to-[#C59B27] text-[#0E1013] text-xs font-semibold tracking-[0.2em] uppercase rounded flex items-center justify-center space-x-2 shadow-xl hover:shadow-[#C59B27]/25 transition-all"
              >
                <span>Proceed to Reserve & Pay</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-[#ECE4D8]/50 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>100% Insured Transit • Official Silk Mark Verified</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
