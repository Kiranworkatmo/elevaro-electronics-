'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import {
  Package,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get('orderId') || '';

  const { orders, getOrderById, formatPrice } = useShop();

  const [searchInput, setSearchInput] = useState(initialOrderId || (orders[0]?.orderNumber ?? 'ELV-89421-2026'));
  const [activeOrder, setActiveOrder] = useState<any>(null);

  useEffect(() => {
    if (searchInput) {
      const found = getOrderById(searchInput) || orders[0];
      setActiveOrder(found);
    }
  }, [searchInput, orders, getOrderById]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const found = getOrderById(searchInput.trim());
    setActiveOrder(found || null);
  };

  return (
    <div className="min-h-screen bg-[#080808] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-400 uppercase tracking-widest mb-2">
            <Truck className="w-3.5 h-3.5" />
            <span>Vault Logistics Telemetry</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
            Live Order Tracking
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            Inspect real-time cleanroom diagnostics, climate-monitored transit, and white-glove arrival schedules.
          </p>

          {/* Search Input Bar */}
          <form onSubmit={handleSearch} className="mt-6 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Order Number (e.g. ELV-89421-2026) or Tracking ID"
                className="w-full bg-[#121212] border border-white/[0.1] focus:border-gold-500 rounded-2xl pl-11 pr-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-gold-400 hover:bg-gold-300 text-black font-extrabold text-xs uppercase tracking-wider transition-colors"
            >
              Track
            </button>
          </form>
        </div>

        {/* Order Result Card */}
        {activeOrder ? (
          <div className="bg-[#111111] rounded-3xl border border-white/[0.08] p-6 sm:p-10 shadow-2xl space-y-8">
            {/* Status Summary */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-mono">Order {activeOrder.orderNumber}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30">
                    {activeOrder.status}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-white mt-1">
                  Courier: {activeOrder.courierName}
                </h2>
                <p className="text-xs text-gold-400 font-mono mt-0.5">
                  Tracking Code: {activeOrder.trackingNumber}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Estimated Arrival</p>
                <p className="text-base font-black text-emerald-400 font-display mt-0.5">
                  {activeOrder.estimatedDelivery}
                </p>
              </div>
            </div>

            {/* Visual Timeline Stepper */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-6">
                Vault Checkpoint Progression
              </h3>

              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-white/[0.1]">
                {activeOrder.trackingEvents &&
                  activeOrder.trackingEvents.map((evt: any, idx: number) => (
                    <div key={idx} className="relative">
                      {/* Checkpoint Dot */}
                      <div
                        className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                          evt.completed
                            ? 'bg-gold-500 border-gold-400 text-black shadow-[0_0_12px_rgba(201,169,110,0.5)]'
                            : 'bg-[#181818] border-white/20 text-gray-500'
                        }`}
                      >
                        {evt.completed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 fill-current" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                      </div>

                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h4
                            className={`text-sm font-bold ${
                              evt.completed ? 'text-white' : 'text-gray-400'
                            }`}
                          >
                            {evt.title}
                          </h4>
                          <span className="text-[11px] text-gold-400 font-medium">
                            {evt.date}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                          {evt.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Hardware Items In Transit */}
            <div className="pt-6 border-t border-white/[0.08]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                Manifest Instruments ({activeOrder.items.length})
              </h3>
              <div className="space-y-3">
                {activeOrder.items.map((item: any, i: number) => (
                  <div
                    key={i}
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
                    <span className="font-bold text-white font-display">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Destination Address Card */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] flex items-start gap-3 text-xs">
              <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">Delivery Destination</p>
                <p className="text-gray-400 mt-0.5">
                  {activeOrder.shippingAddress.fullName} • {activeOrder.shippingAddress.street}, {activeOrder.shippingAddress.city}, {activeOrder.shippingAddress.state} {activeOrder.shippingAddress.postalCode}, {activeOrder.shippingAddress.country}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-[#111111] rounded-3xl border border-white/[0.08] p-8">
            <h3 className="text-base font-bold text-white">No Order Found</h3>
            <p className="text-xs text-gray-400 mt-2">
              Please verify your order identifier or tracking code.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080808] flex items-center justify-center text-gold-400">Loading tracking...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
