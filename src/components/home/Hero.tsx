'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useShop } from '@/context/ShopContext';
import { ArrowRight, Sparkles, Shield, Cpu, Zap, Volume2 } from 'lucide-react';

export default function Hero() {
  const { formatPrice } = useShop();

  return (
    <section className="relative min-h-[90vh] bg-[#080808] overflow-hidden flex items-center border-b border-white/[0.08]">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Tech grid texture overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Superbadge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-gold-500/30 text-gold-300 text-xs font-semibold backdrop-blur-md shadow-lg shadow-gold-500/5">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>THE 2026 SOVEREIGN FLAGSHIP COLLECTION</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-white font-display tracking-tight leading-[1.08]">
              Technology, <br />
              <span className="gold-gradient-text">Elevated.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Discover exceptional technology designed to transform your everyday life. Sculpted from aerospace titanium, liquid-crystal optics, and neural quantum silicon.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gold-400 hover:bg-gold-300 text-black font-extrabold text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-gold-500/20 hover:scale-[1.02]"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/shop?badge=BESTSELLER"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-bold text-sm tracking-wider uppercase transition-all border border-white/[0.1] flex items-center justify-center gap-2 hover:border-gold-500/40"
              >
                <span>Shop Best Sellers</span>
              </Link>
            </div>

            {/* Engineering Highlights Quick Stat Bar */}
            <div className="pt-8 border-t border-white/[0.08] grid grid-cols-3 gap-4 sm:gap-6 text-left">
              <div>
                <div className="flex items-center gap-1.5 text-gold-400 text-xs font-semibold">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Titanium Alloy</span>
                </div>
                <p className="text-xl sm:text-2xl font-black text-white font-display mt-0.5">Grade 5</p>
                <p className="text-[11px] text-gray-400">CNC Monolith Billet</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-gold-400 text-xs font-semibold">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Neural Silicon</span>
                </div>
                <p className="text-xl sm:text-2xl font-black text-white font-display mt-0.5">3nm M-Max</p>
                <p className="text-[11px] text-gray-400">40-Core Neural Array</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-gold-400 text-xs font-semibold">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Lossless Audio</span>
                </div>
                <p className="text-xl sm:text-2xl font-black text-white font-display mt-0.5">192 kHz</p>
                <p className="text-[11px] text-gray-400">24-Bit Pure Beryllium</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Masterpiece */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Decorative Rings */}
            <div className="absolute w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] rounded-full border border-gold-500/20 animate-pulse-slow" />
            <div className="absolute w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] rounded-full border border-white/[0.08]" />

            {/* Floating Product Spotlight Card */}
            <div className="relative z-10 w-full max-w-md bg-gradient-to-b from-[#181818] to-[#0E0E0E] p-6 rounded-3xl border border-gold-500/30 shadow-2xl backdrop-blur-xl">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-black/60 mb-5 border border-white/[0.06]">
                <Image
                  src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1000&auto=format&fit=crop"
                  alt="Aegis Pro Max 24K Titanium Edition"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full bg-gold-500/25 text-gold-300 border border-gold-500/40 backdrop-blur-md">
                    FLAGSHIP PREMIERE
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                  <span className="text-xs font-bold text-white font-display">
                    {formatPrice(1599)}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span className="text-gold-400 font-bold uppercase tracking-wider">
                    Elevaro Masterwork
                  </span>
                  <span>200MP Periscope Telemetry</span>
                </div>

                <h3 className="text-lg font-bold text-white">
                  Aegis Pro Max 24K Titanium Edition
                </h3>

                <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                  Aerospace-grade sculpted titanium frame, 3,200 nits Micro-LED daylight visibility, and 120W HyperCharge.
                </p>

                <div className="mt-4 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    Ships Within 24 Hours
                  </span>

                  <Link
                    href="/product/aegis-titanium-pro-max"
                    className="text-xs font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1"
                  >
                    <span>Inspect Model</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
