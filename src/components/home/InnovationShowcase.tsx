'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Shield, Cpu, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';

const PILLARS = [
  {
    id: 'titanium',
    title: 'Aerospace Grade 5 Titanium',
    category: 'Materials Engineering',
    icon: Shield,
    headline: 'Forged under 4,000 tons of hydraulic pressure.',
    description: 'We harvest Grade 5 Ti-6Al-4V titanium alloy, precision CNC-machined over 14 hours per chassis. The outcome is half the weight of stainless steel with double the tensile rigidity.',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1200&auto=format&fit=crop',
    stats: [
      { label: 'Tensile Strength', value: '1,170 MPa' },
      { label: 'Weight Reduction', value: '-45%' },
      { label: 'Thermal Dispersion', value: '4.2x Faster' },
    ],
    highlights: [
      'Anodized electrochemical vapor deposition color adhesion',
      'Sub-micron laser chamfered diamond-cut perimeter bevels',
      'Impervious to saltwater, perspiration, and kinetic micro-abrasion',
    ],
  },
  {
    id: 'silicon',
    title: '3nm Quantum Neural Silicon',
    category: 'Computational Architecture',
    icon: Cpu,
    headline: '32 billion transistors firing at 3.8 GHz.',
    description: 'Bespoke silicon architectures featuring dedicated hardware neural acceleration, hardware ray-tracing cores, and custom cryptographic security vaults.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
    stats: [
      { label: 'Fabrication Node', value: '3 Nanometer' },
      { label: 'AI TOPS Throughput', value: '45 TOPS' },
      { label: 'Power Efficiency', value: '+35% Gain' },
    ],
    highlights: [
      'Zero-throttle vapor-chamber liquid heat dissipation',
      'Unified high-bandwidth memory delivering 800 GB/s bandwidth',
      'Hardware-level post-quantum cryptographic security vault',
    ],
  },
  {
    id: 'acoustics',
    title: 'Pure Beryllium Transducers',
    category: 'Lossless Sonic Artistry',
    icon: Volume2,
    headline: 'Frequency extension reaching beyond 48,000 Hz.',
    description: 'Beryllium possesses four times the stiffness of titanium with one-third the mass. The result is zero cone distortion, absolute transient speed, and effortless spatial holography.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
    stats: [
      { label: 'Total Harmonic Distortion', value: '< 0.02%' },
      { label: 'Sample Resolution', value: '24-Bit / 192kHz' },
      { label: 'Soundstage Expansion', value: '180° Spatial' },
    ],
    highlights: [
      'Lambskin-clad memory foam acoustically tuned ear seals',
      'Internal dual ESS SABRE 32-bit reference DAC architecture',
      'Hybrid ANC utilizing 8 real-time environmental microphones',
    ],
  },
];

export default function InnovationShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const activePillar = PILLARS[activeTab];
  const IconComponent = activePillar.icon;

  return (
    <section className="py-24 bg-[#080808] border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-400 uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Architectural Integrity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
            The Craftsmanship of Sovereign Hardware
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            Explore how aerospace alloys, bespoke micro-architectures, and acoustic purity converge into timeless instruments.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#141414] border border-white/[0.08]">
            {PILLARS.map((p, idx) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
                    activeTab === idx
                      ? 'bg-gold-400 text-black shadow-lg shadow-gold-500/20'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{p.title}</span>
                  <span className="sm:hidden">{p.id}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Display Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#111111] border border-white/[0.08] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold text-gold-400 uppercase tracking-widest">
              <IconComponent className="w-4 h-4" />
              <span>{activePillar.category}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white font-display leading-tight">
              {activePillar.headline}
            </h3>

            <p className="text-sm text-gray-300 leading-relaxed font-normal">
              {activePillar.description}
            </p>

            {/* Metric Highlights */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/[0.08]">
              {activePillar.stats.map((stat, i) => (
                <div key={i}>
                  <p className="text-xl sm:text-2xl font-black text-white font-display">
                    {stat.value}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Bullet List */}
            <ul className="space-y-2.5">
              {activePillar.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-xs font-bold text-gold-400 hover:text-gold-300 uppercase tracking-wider"
              >
                <span>Discover All Models Featuring This Technology</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/[0.08]">
            <Image
              src={activePillar.image}
              alt={activePillar.title}
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover transition-all duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
