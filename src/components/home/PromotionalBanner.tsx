'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Tag, ShieldCheck } from 'lucide-react';

export default function PromotionalBanner() {
  return (
    <section className="py-16 bg-[#080808] px-4 sm:px-6 lg:px-8 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#171717] via-[#121212] to-[#0A0A0A] border border-gold-500/30 p-8 sm:p-12 lg:p-16 shadow-2xl">
        {/* Glow orb */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Limited Horizon Privilege</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight leading-tight">
            Upgrade Your World.
          </h2>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
            Discover premium technology at exceptional value. For a limited window, acquire certified sovereign electronics with complimentary insured courier and preferential financing.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-black/60 border border-gold-500/40 text-xs font-semibold text-white">
              <Tag className="w-3.5 h-3.5 text-gold-400" />
              <span>Use Code:</span>
              <span className="font-extrabold text-gold-400 tracking-wider">ELEVARO10</span>
              <span className="text-gray-400">(10% Off)</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-gray-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>2-Year International Warranty Included</span>
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/shop?offers=true"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gold-400 hover:bg-gold-300 text-black font-extrabold text-xs tracking-wider uppercase transition-all shadow-xl shadow-gold-500/20 hover:scale-105"
            >
              <span>Explore Offers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
