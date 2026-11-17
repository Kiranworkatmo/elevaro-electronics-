'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useShop } from '@/context/ShopContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
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
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  return (
    <div className="min-h-screen bg-[#080808] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-400 uppercase tracking-widest mb-1.5">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Acquisition Summary</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
              Vault Shopping Cart
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              {cart.reduce((s, i) => s + i.quantity, 0)} electronic instruments currently in your vault.
            </p>
          </div>

          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Empty Vault</span>
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-24 bg-[#111111] rounded-3xl border border-white/[0.08] p-8 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-400 mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">Your Cart is Currently Empty</h3>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Explore our master-crafted smartphones, titanium workstations, and high-fidelity acoustic transducers.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-gold-400 text-black font-extrabold text-xs uppercase tracking-wider"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Cart Items List (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free shipping bar */}
              <div className="p-4 rounded-2xl bg-[#111111] border border-white/[0.08]">
                {amountToFreeShipping > 0 ? (
                  <div>
                    <div className="flex justify-between text-xs text-gray-300 mb-2">
                      <span>Add <strong className="text-gold-400">{formatPrice(amountToFreeShipping)}</strong> more for Complimentary VIP Air Courier</span>
                      <span className="font-semibold text-white">{Math.round(progressPercent)}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-500 rounded-full"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                    <Sparkles className="w-4 h-4" />
                    <span>You have unlocked Complimentary VIP White-Glove Air Shipping!</span>
                  </div>
                )}
              </div>

              {/* Items */}
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-[#111111] border border-white/[0.08] flex flex-col sm:flex-row items-center gap-6"
                >
                  <div className="relative w-24 h-24 rounded-xl bg-[#181818] overflow-hidden shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <p className="text-[11px] font-bold text-gold-400 uppercase tracking-widest">
                      {item.product.brand}
                    </p>
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="text-sm font-bold text-white hover:text-gold-300 transition-colors line-clamp-1 mt-0.5"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {item.selectedColor && `Finish: ${item.selectedColor}`}
                      {item.selectedVariant && ` • ${item.selectedVariant}`}
                    </p>
                    <p className="text-xs font-bold text-white mt-1">
                      {formatPrice(item.unitPrice)} each
                    </p>
                  </div>

                  <div className="flex items-center gap-6 shrink-0">
                    {/* Stepper */}
                    <div className="flex items-center border border-white/[0.1] rounded-xl bg-black/60 p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 text-gray-400 hover:text-white"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 text-gray-400 hover:text-white"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right w-24">
                      <p className="text-base font-black text-white font-display">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-400 hover:text-rose-400 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Column (4 cols) */}
            <div className="lg:col-span-4">
              <div className="bg-[#111111] border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-6 sticky top-24 shadow-2xl">
                <h3 className="text-base font-bold text-white tracking-wide border-b border-white/[0.08] pb-4">
                  Order Summary
                </h3>

                {/* Promo Code Box */}
                <div>
                  {coupon ? (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gold-500/10 border border-gold-500/30 text-xs">
                      <div className="flex items-center gap-2">
                        <Tag className="w-3.5 h-3.5 text-gold-400" />
                        <span className="font-bold text-gold-300">{coupon.code}</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs text-rose-400 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Promo code (e.g. ELEVARO10)"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          className="flex-1 bg-black/60 border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 uppercase"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-white/[0.08] hover:bg-white/[0.15] text-xs font-bold text-white rounded-xl transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-[11px] text-rose-400">{couponError}</p>
                      )}
                    </form>
                  )}
                </div>

                {/* Breakdown */}
                <div className="space-y-3 text-xs border-b border-white/[0.08] pb-4">
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
                </div>

                {/* Grand Total */}
                <div className="flex justify-between items-baseline text-white">
                  <span className="text-sm font-bold">Total Investment</span>
                  <span className="text-2xl font-black text-gold-400 font-display">
                    {formatPrice(cartTotal)}
                  </span>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  className="w-full py-4 px-6 rounded-xl bg-gold-400 hover:bg-gold-300 text-black font-extrabold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-xl shadow-gold-500/20 hover:scale-[1.02]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="space-y-2 pt-2 text-[11px] text-gray-400">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                    <span>256-Bit SSL Encrypted Vault Checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                    <span>Insured Air Courier with Signature Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
