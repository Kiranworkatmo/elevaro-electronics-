'use client';

import React from 'react';
import { COLLECTIONS } from '@/data/sarees';
import { Sparkles, ArrowRight } from 'lucide-react';

interface CuratedCollectionsProps {
  onSelectCollection: (weaveName: string) => void;
}

export default function CuratedCollections({ onSelectCollection }: CuratedCollectionsProps) {
  return (
    <section id="collections" className="py-24 bg-[#0E1013] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[#C59B27] text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Ateliers</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl tracking-[0.08em] font-normal text-[#FDF4D4] uppercase">
            The Sovereign Weaves of India
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C59B27] to-transparent mx-auto my-6" />
          <p className="text-sm sm:text-base text-[#ECE4D8]/75 font-light leading-relaxed">
            Four distinct handloom lineages, each guarded by generational families of master weavers and patronized by India’s imperial courts.
          </p>
        </div>

        {/* Collections Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {COLLECTIONS.map((c) => (
            <div
              key={c.id}
              className="group relative overflow-hidden rounded-lg border border-[#C59B27]/25 bg-[#14171D] hover:border-[#C59B27]/60 transition-all duration-500 shadow-xl"
            >
              {/* Image Container with Zoom & Sheen */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1013] via-[#0E1013]/40 to-transparent" />
                
                {/* Floating Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#170507]/90 border border-[#C59B27]/40 text-[#F6E7B9] text-[10px] font-semibold tracking-[0.2em] uppercase rounded backdrop-blur-sm">
                  {c.tag}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 relative">
                <span className="text-xs text-[#C59B27] font-medium tracking-[0.25em] uppercase block mb-1">
                  {c.title}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#FDF4D4] font-medium tracking-wide mb-2 group-hover:text-[#E7C978] transition-colors">
                  {c.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#ECE4D8]/70 font-light leading-relaxed mb-6 line-clamp-2">
                  {c.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#C59B27]/15">
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#ECE4D8]/50 block">
                      Starting From
                    </span>
                    <span className="font-serif text-lg text-[#F6E7B9] font-medium">
                      {c.startingPrice}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectCollection(c.name)}
                    className="inline-flex items-center space-x-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#C59B27] group-hover:text-[#FDF4D4] transition-colors"
                  >
                    <span>View Weaves</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
