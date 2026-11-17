'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Award, Globe, Sparkles, ArrowRight, Check } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#080808] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>The Elevaro Philosophy</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white font-display tracking-tight leading-tight">
            Elevating Everyday <br />
            <span className="gold-gradient-text">Human Technology.</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
            ELEVARO was founded on a singular conviction: technology should not be a disposable commodity. It should be a masterwork of human craftsmanship, sculpted from sovereign materials and engineered to endure.
          </p>
        </div>

        {/* Visual Story Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#181818] border border-white/[0.08] shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop"
              alt="Elevaro Cleanroom Laboratory"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">
              Origin & Lineage
            </span>
            <h2 className="text-3xl font-black text-white font-display leading-tight">
              Where Aerospace Metallurgy Meets Neural Silicon
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Headquartered between Zurich and San Francisco, ELEVARO curates and crafts electronic instruments that combine the precision of Swiss horology with the frontier architectures of artificial intelligence and high-resolution optics.
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              We reject cheap plastic polymers and planned obsolescence. Every smartphone, workstation laptop, and acoustic transducer in our vault is milled from Grade 5 titanium, aerospace magnesium alloys, and pure beryllium diaphragms.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#111111] border border-white/[0.08]">
                <p className="text-2xl font-black text-white font-display">99.8%</p>
                <p className="text-xs text-gray-400 mt-0.5">Hardware Reliability Index</p>
              </div>
              <div className="p-4 rounded-xl bg-[#111111] border border-white/[0.08]">
                <p className="text-2xl font-black text-gold-400 font-display">48 Hours</p>
                <p className="text-xs text-gray-400 mt-0.5">Global Express White-Glove Air</p>
              </div>
            </div>
          </div>
        </div>

        {/* The 4 Sovereign Commitments */}
        <div className="bg-[#111111] rounded-3xl border border-white/[0.08] p-8 sm:p-14 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
              The Elevaro Sovereign Code
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              Our inviolable charter to patrons and collectors worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Authenticity Guaranteed',
                desc: 'Zero tolerance for grey-market components. 100% factory sealed with verified digital serials.',
              },
              {
                title: 'Cleanroom Diagnostics',
                desc: '32-point hardware stress tests prior to packaging into tamper-evident satin boxes.',
              },
              {
                title: '2-Year Care Included',
                desc: 'Automatic priority warranty covering accidental failures with 24-hour loaner unit dispatch.',
              },
              {
                title: 'Lifetime Concierge',
                desc: 'Dedicated hardware architects standing by via private encrypted WhatsApp and telephone.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="w-8 h-8 rounded-lg bg-gold-500/20 text-gold-400 font-bold flex items-center justify-center mb-4">
                  0{idx + 1}
                </div>
                <h4 className="text-sm font-bold text-white mb-2">{item.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Global Salons & Concierge */}
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold text-white font-display">
            Global Vaults & Private Appointment Salons
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 font-medium">
            <span>Zurich • Bahnhofstrasse</span>
            <span>•</span>
            <span>San Francisco • Presidio Heights</span>
            <span>•</span>
            <span>Tokyo • Ginza</span>
            <span>•</span>
            <span>London • Mayfair</span>
            <span>•</span>
            <span>Mumbai • Bandra Kurla Complex</span>
          </div>

          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-gold-400 text-black font-extrabold text-xs uppercase tracking-wider hover:bg-gold-300 transition-colors"
            >
              <span>Book a Private Hardware Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
