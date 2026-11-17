'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useShop } from '@/context/ShopContext';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartTotal,
    discountAmount,
    shippingFee,
    freeShippingThreshold,
    coupon,
    applyCoupon,
    removeCoupon,
    formatPrice,
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0F0F0F] border-l border-white/[0.1] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gold-400" />
              <h2 className="text-base font-bold text-white tracking-wide">
                Vault Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/[0.06]"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Tier Bar */}
          <div className="bg-[#141414] px-5 py-3 border-b border-white/[0.06]">
            {amountToFreeShipping > 0 ? (
              <div>
                <p className="text-xs text-gray-300">
                  Add <span className="font-bold text-gold-400">{formatPrice(amountToFreeShipping)}</span> more for <span className="text-white font-medium">Complimentary VIP Air Courier</span>
                </p>
                <div className="w-full h-1.5 bg-white/[0.08] rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>You have unlocked Complimentary VIP White-Glove Shipping!</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-500 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-bold text-white">Your Vault is Empty</h3>
                <p className="text-xs text-gray-400 max-w-xs mt-1.5 leading-relaxed">
                  Discover our curated collections of precision smartphones, workstations, and high-fidelity acoustics.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-6 py-2.5 px-6 rounded-xl bg-gold-400 hover:bg-gold-300 text-black font-bold text-xs tracking-wider uppercase transition-colors"
                >
                  Explore Electronics
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-lg bg-[#181818] overflow-hidden shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/product/${item.product.slug}`}
                        onClick={closeCart}
                        className="text-xs font-bold text-white hover:text-gold-300 transition-colors line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-rose-400 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {item.product.brand}
                      {item.selectedColor && ` • ${item.selectedColor}`}
                      {item.selectedVariant && ` • ${item.selectedVariant}`}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-white/[0.1] rounded-lg bg-black/40">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-gray-400 hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-gray-400 hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-extrabold text-white">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-white/[0.08] bg-[#121212] space-y-4">
              {/* Promo Code Box */}
              <div>
                {coupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-gold-500/10 border border-gold-500/30 text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-gold-400" />
                      <span className="font-bold text-gold-300">{coupon.code}</span>
                      <span className="text-gray-400">(-{formatPrice(discountAmount)})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-gray-400 hover:text-rose-400 transition-colors text-xs underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. ELEVARO10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 bg-black/60 border border-white/[0.1] focus:border-gold-500 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none uppercase"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-white/[0.08] hover:bg-white/[0.15] text-xs font-bold text-white rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-rose-400 mt-1">{couponError}</p>
                )}
              </div>

              {/* Subtotal, Shipping, Total */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">{formatPrice(cartSubtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-gold-400">
                    <span>VIP Concession</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-400">
                  <span>VIP White-Glove Shipping</span>
                  <span className={shippingFee === 0 ? 'text-emerald-400 font-semibold' : 'text-white'}>
                    {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}
                  </span>
                </div>

                <div className="pt-2 border-t border-white/[0.08] flex justify-between text-sm font-extrabold text-white">
                  <span>Grand Total</span>
                  <span className="text-base text-gold-400 font-display font-black">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full py-3.5 px-4 rounded-xl bg-gold-400 hover:bg-gold-300 text-black font-extrabold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-xl shadow-gold-500/20"
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="block text-center w-full py-2.5 text-xs text-gray-400 hover:text-white transition-colors"
                >
                  View Full Cart & Detailed Estimates
                </Link>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                <span>256-Bit Encrypted Vault Checkout • 30-Day Returns</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
