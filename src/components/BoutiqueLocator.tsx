'use client';

import React from 'react';
import { BOUTIQUES } from '@/data/sarees';
import { useShop } from '@/context/ShopContext';
import { Sparkles, MapPin, Phone, Clock, Calendar } from 'lucide-react';

export default function BoutiqueLocator() {
  const { openConsultation } = useShop();

  return (
    <section id="boutiques" className="py-24 bg-[#0E1013] relative border-t border-[#C59B27]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[#C59B27] text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Flagship Salons</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl tracking-[0.08em] font-normal text-[#FDF4D4] uppercase">
            Experience Our Ateliers In Person
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C59B27] to-transparent mx-auto my-6" />
          <p className="text-sm sm:text-base text-[#ECE4D8]/75 font-light leading-relaxed">
            Step into our quiet heritage salons for an intimate private draping experience with champagne service and personalized color analysis.
          </p>
        </div>

        {/* Boutiques Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BOUTIQUES.map((boutique, idx) => (
            <div
              key={idx}
              className="group bg-[#14171D] border border-[#C59B27]/25 rounded-lg overflow-hidden shadow-xl hover:border-[#C59B27]/50 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={boutique.image}
                  alt={boutique.name}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14171D] via-transparent to-transparent opacity-80" />
                
                <div className="absolute top-3 left-3 bg-[#170507]/90 border border-[#C59B27]/30 px-3 py-1 rounded text-[10px] text-[#F6E7B9] font-bold tracking-[0.2em] uppercase backdrop-blur-sm">
                  {boutique.city} Flagship
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-[#C59B27] font-medium tracking-[0.18em] uppercase block mb-1">
                    {boutique.neighborhood}
                  </span>
                  <h3 className="font-serif text-2xl text-[#FDF4D4] font-medium tracking-wide mb-3">
                    {boutique.name}
                  </h3>

                  <div className="space-y-2.5 text-xs text-[#ECE4D8]/70 font-light mb-6">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-[#C59B27] flex-shrink-0 mt-0.5" />
                      <span>{boutique.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-[#C59B27] flex-shrink-0" />
                      <span>{boutique.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-[#C59B27] flex-shrink-0" />
                      <span>{boutique.hours}</span>
                    </div>
                  </div>

                  {/* Salon Services Chips */}
                  <div className="mb-6 pt-4 border-t border-[#C59B27]/15">
                    <span className="text-[10px] text-[#C59B27] uppercase tracking-[0.2em] block mb-2 font-semibold">
                      Private Salon Amenities:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {boutique.salonServices.map((service, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] bg-[#0E1013] text-[#ECE4D8]/80 px-2 py-0.5 rounded border border-[#C59B27]/20"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={openConsultation}
                  className="w-full py-2.5 bg-[#170507] hover:bg-[#25080c] text-[#FDF4D4] border border-[#C59B27]/40 text-xs font-semibold tracking-[0.18em] uppercase rounded flex items-center justify-center space-x-2 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Reserve Private Salon</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
