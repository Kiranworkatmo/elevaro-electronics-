'use client';

import React from 'react';
import { REAL_BRIDES } from '@/data/sarees';
import { Sparkles, Quote, MapPin } from 'lucide-react';

export default function RealBridesGallery() {
  return (
    <section id="real-brides" className="py-24 bg-[#0A0C0E] relative border-t border-[#C59B27]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[#C59B27] text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Privé Circle</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl tracking-[0.08em] font-normal text-[#FDF4D4] uppercase">
            Brides of Kiran Sarees
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C59B27] to-transparent mx-auto my-6" />
          <p className="text-sm sm:text-base text-[#ECE4D8]/75 font-light leading-relaxed">
            Real celebrations, real royal handlooms. Gracing wedding mandaps from historic palaces of Rajasthan to private villas across the world.
          </p>
        </div>

        {/* Press Badges */}
        <div className="flex items-center justify-center flex-wrap gap-8 sm:gap-14 mb-16 py-6 px-4 border-y border-[#C59B27]/15">
          <span className="font-serif text-lg tracking-[0.3em] uppercase text-[#ECE4D8]/50">VOGUE INDIA</span>
          <span className="font-serif text-lg tracking-[0.3em] uppercase text-[#ECE4D8]/50">HARPER’S BAZAAR BRIDE</span>
          <span className="font-serif text-lg tracking-[0.3em] uppercase text-[#ECE4D8]/50">ELLE COUTURE</span>
          <span className="font-serif text-lg tracking-[0.3em] uppercase text-[#ECE4D8]/50">ARCHITECTURAL DIGEST</span>
        </div>

        {/* Real Brides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REAL_BRIDES.map((b, idx) => (
            <div
              key={idx}
              className="bg-[#12151B] border border-[#C59B27]/25 rounded-lg overflow-hidden shadow-xl flex flex-col justify-between hover:border-[#C59B27]/50 transition-colors"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={b.image}
                  alt={b.name}
                  className="w-full h-full object-cover object-center filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12151B] via-transparent to-transparent opacity-80" />
                
                <div className="absolute top-3 left-3 bg-[#0E1013]/90 border border-[#C59B27]/30 px-3 py-1 rounded text-[10px] text-[#C59B27] font-semibold tracking-wider uppercase backdrop-blur-sm">
                  {b.sareeWorn}
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-serif text-xl text-[#FDF4D4] font-medium tracking-wide">
                    {b.name}
                  </h3>
                  <span className="flex items-center space-x-1 text-xs text-[#ECE4D8]/70 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#C59B27]" />
                    <span>{b.location}</span>
                  </span>
                </div>
              </div>

              <div className="p-6 relative">
                <Quote className="w-6 h-6 text-[#C59B27]/30 absolute top-4 right-4" />
                <p className="text-xs sm:text-sm text-[#ECE4D8]/80 font-light italic leading-relaxed pt-2">
                  "{b.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
