'use client';

import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Julian Montgomery',
    role: 'Principal Architect & Partner',
    location: 'Zurich, Switzerland',
    product: 'Zenith Book Ultra 16 M-Max',
    rating: 5,
    title: 'The benchmark of computational workstation luxury',
    comment: 'The display calibration and vapor chamber cooling exceed every previous machine I have used for architectural CAD rendering. The magnesium carbon chassis feels monolithic, cool, and indestructible.',
  },
  {
    id: 2,
    name: 'Seraphina De Luca',
    role: 'Grammy-Nominated Audio Producer',
    location: 'Milan, Italy',
    product: 'Aurora Prive Lossless ANC Over-Ear',
    rating: 5,
    title: 'Acoustic fidelity without a trace of artificial coloration',
    comment: 'The Beryllium drivers reproduce acoustic instruments with breathtaking spatial air. The DAC and lambskin ear cups provide comfort for 12-hour continuous mastering sessions.',
  },
  {
    id: 3,
    name: 'Vikramaditya Singhania',
    role: 'Managing Director, Horizon Capital',
    location: 'Mumbai & London',
    product: 'Aegis Pro Max 24K Titanium Edition',
    rating: 5,
    title: 'Flawless international delivery and titanium presence',
    comment: 'Ordered via Elevaro VIP Concierge desk with white-glove delivery to Mumbai. The 10x periscope telemetry camera and satellite link make this my indispensable global daily driver.',
  },
];

export default function CustomerReviews() {
  return (
    <section className="py-24 bg-[#0A0A0A] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">
            Verified Patron Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight mt-2">
            Praised by World-Class Creators & Leaders
          </h2>
          <p className="text-sm text-gray-400 mt-3">
            Read unprompted experiences from verified purchasers of Elevaro sovereign electronics across the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((r) => (
            <div
              key={r.id}
              className="relative p-8 rounded-2xl bg-[#111111] border border-white/[0.08] hover:border-gold-500/40 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl"
            >
              <div>
                {/* Rating & Quote */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-gold-500/20" />
                </div>

                <h3 className="text-sm font-bold text-white tracking-wide leading-snug">
                  &ldquo;{r.title}&rdquo;
                </h3>

                <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                  {r.comment}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">{r.name}</h4>
                    <p className="text-[11px] text-gray-400">{r.role}</p>
                    <p className="text-[10px] text-gold-400 mt-0.5">{r.location}</p>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified Buyer</span>
                  </div>
                </div>

                <div className="mt-3 text-[10px] text-gray-500 font-medium">
                  Acquisition: <span className="text-gray-300">{r.product}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
