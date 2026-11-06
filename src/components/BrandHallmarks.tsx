'use client';

import React from 'react';
import { Award, Compass, Sparkles, Box, ShieldCheck, HeartHandshake } from 'lucide-react';

const HALLMARKS = [
  {
    icon: Award,
    title: 'Silk Mark Certified',
    subtitle: 'Tested Gold & Silver Zari',
    desc: 'Each creation carries the Government of India Silk Mark seal, verifying 100% natural mulberry filament silk and purity-tested precious metal zari.'
  },
  {
    icon: Compass,
    title: 'Generational Pit-Looms',
    subtitle: 'Zero Automated Power-Looms',
    desc: 'Crafted solely on historic wooden pit-looms in the heritage clusters of Varanasi, Kanchipuram, and Chanderi by 4th-generation master weavers.'
  },
  {
    icon: Sparkles,
    title: 'Bespoke Bridal Salon',
    subtitle: 'Personal Stylists & Monogramming',
    desc: 'Private 1-on-1 virtual styling with our master curators, matching blouse embroideries, and custom golden monogramming on the wedding pallu.'
  },
  {
    icon: Box,
    title: 'White-Glove Insured Delivery',
    subtitle: 'Keepsake Muslin Chest Packaging',
    desc: 'Complimentary insured worldwide courier in velvet-lined keepsake chests with natural neem leaves and breathable muslin wraps for generational preservation.'
  }
];

export default function BrandHallmarks() {
  return (
    <section className="py-16 bg-[#121419] border-y border-[#C59B27]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {HALLMARKS.map((h, i) => {
            const Icon = h.icon;
            return (
              <div
                key={i}
                className="group p-6 rounded bg-[#0E1013]/60 border border-[#C59B27]/20 hover:border-[#C59B27]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#C59B27]/10"
              >
                <div className="w-12 h-12 rounded-full bg-[#170507] border border-[#C59B27]/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5 text-[#C59B27]" />
                </div>
                <h3 className="font-serif text-lg text-[#FDF4D4] font-medium tracking-wide">
                  {h.title}
                </h3>
                <span className="text-[11px] text-[#C59B27] uppercase tracking-[0.16em] block mt-0.5 mb-2.5 font-medium">
                  {h.subtitle}
                </span>
                <p className="text-xs text-[#ECE4D8]/70 leading-relaxed font-light">
                  {h.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
