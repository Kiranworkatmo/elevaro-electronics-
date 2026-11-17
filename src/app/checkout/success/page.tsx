'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { useShop } from '@/context/ShopContext';
import {
  CheckCircle2,
  Package,
  Printer,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
} from 'lucide-react';

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { orders, formatPrice } = useShop();

  const currentOrder = orders.find((o) => o.id === orderId) || orders[0];

  useEffect(() => {
    // Launch gold & platinum celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C9A96E', '#EAD7B0', '#FFFFFF', '#B69352'],
      });
    } catch {}
  }, []);

  const handlePrintReceipt = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  if (!currentOrder) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4">
        <div className="text-center p-8 bg-[#111111] rounded-3xl border border-white/[0.08] max-w-md w-full">
          <CheckCircle2 className="w-12 h-12 text-gold-400 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-white">Order Confirmed</h2>
          <Link
            href="/account"
            className="mt-6 inline-block py-2.5 px-6 rounded-xl bg-gold-400 text-black font-bold text-xs uppercase"
          >
            Go to My Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111] border border-gold-500/30 rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Top ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-gold-500/10 rounded-full blur-[80px] pointer-events-none" />

          {/* Header */}
          <div className="text-center max-w-lg mx-auto mb-10 relative z-10">
            <div className="w-16 h-16 rounded-full bg-gold-500/15 border border-gold-500/40 flex items-center justify-center text-gold-400 mx-auto mb-4 shadow-xl shadow-gold-500/10">
              <Sparkles className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">
              Acquisition Confirmed
            </span>

            <h1 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight mt-1">
              Thank You for Your Order
            </h1>

            <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
              Your electronics hardware has been registered in the Elevaro Vault under order identifier <strong className="text-white">{currentOrder.orderNumber}</strong>.
            </p>
          </div>

          {/* Quick Details Ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-black/40 border border-white/[0.08] mb-8 text-xs">
            <div>
              <p className="text-gray-400 uppercase tracking-wider text-[10px]">Order Number</p>
              <p className="text-white font-bold font-mono text-sm mt-0.5">{currentOrder.orderNumber}</p>
            </div>
            <div>
              <p className="text-gray-400 uppercase tracking-wider text-[10px]">Courier Tracking ID</p>
              <p className="text-gold-400 font-bold font-mono text-sm mt-0.5">{currentOrder.trackingNumber}</p>
            </div>
            <div>
              <p className="text-gray-400 uppercase tracking-wider text-[10px]">Estimated Vault Delivery</p>
              <p className="text-emerald-400 font-bold text-sm mt-0.5">{currentOrder.estimatedDelivery}</p>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              Reserved Instruments
            </h3>
            <div className="space-y-3">
              {currentOrder.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg bg-[#181818] overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-white">{item.name}</p>
                      <p className="text-[11px] text-gray-400">
                        {item.brand} {item.selectedColor && `• ${item.selectedColor}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white font-display">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <p className="text-[10px] text-gray-400">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Financial Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/[0.08] text-xs">
            <div>
              <h4 className="font-bold text-gray-300 uppercase tracking-wider mb-2">
                Destination Address
              </h4>
              <p className="text-white font-semibold">{currentOrder.shippingAddress.fullName}</p>
              <p className="text-gray-400">{currentOrder.shippingAddress.street}</p>
              {currentOrder.shippingAddress.apartment && (
                <p className="text-gray-400">{currentOrder.shippingAddress.apartment}</p>
              )}
              <p className="text-gray-400">
                {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} {currentOrder.shippingAddress.postalCode}
              </p>
              <p className="text-gray-400">{currentOrder.shippingAddress.country}</p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-gray-300 uppercase tracking-wider mb-2">
                Settlement
              </h4>
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="text-white">{formatPrice(currentOrder.subtotal)}</span>
              </div>
              {currentOrder.discount > 0 && (
                <div className="flex justify-between text-gold-400">
                  <span>VIP Concession</span>
                  <span>-{formatPrice(currentOrder.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-400">
                <span>White-Glove Shipping</span>
                <span className="text-emerald-400">Complimentary</span>
              </div>
              <div className="pt-2 border-t border-white/[0.08] flex justify-between font-bold text-sm text-white">
                <span>Total Settled</span>
                <span className="text-gold-400 font-display">{formatPrice(currentOrder.total)}</span>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="mt-10 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handlePrintReceipt}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-bold text-white transition-colors flex items-center justify-center gap-2 border border-white/[0.1]"
            >
              <Printer className="w-4 h-4 text-gray-400" />
              <span>Print Vault Receipt</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href={`/track-order?orderId=${currentOrder.orderNumber}`}
                className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-gold-400 hover:bg-gold-300 text-black font-extrabold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20"
              >
                <Package className="w-4 h-4" />
                <span>Track Vault Dispatch</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080808] flex items-center justify-center text-gold-400">Loading order...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}
