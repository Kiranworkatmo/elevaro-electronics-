'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { Sparkles, Video, Calendar, Shield, HeartHandshake, PhoneCall, Check } from 'lucide-react';

export default function BridalConciergeSection() {
  const { openConsultation, openWhatsAppConcierge } = useShop();

  return (
    <section className="py-24 bg-[#140608] relative overflow-hidden border-t border-[#C59B27]/25">
      {/* Background Opulent Textures */}
      <div className="absolute inset-0 bg-[radial-gradient(#C59B27_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & Concierge Offerings */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center space-x-2 text-[#C59B27] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Privé Bridal Concierge</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-[0.06em] font-normal text-[#FDF4D4] leading-[1.12] mb-6">
              Curate Your Once-In-A-Lifetime Trousseau.
            </h2>

            <p className="text-sm sm:text-base text-[#ECE4D8]/80 font-light leading-relaxed mb-8 max-w-xl">
              Whether you are preparing for royal nuptials in an Indian palace or a destination celebration in Lake Como, our senior saree curators guide your family through an intimate styling journey.
            </p>

            {/* Concierge Perks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <div className="flex items-start space-x-3 p-3.5 rounded bg-[#0E1013]/60 border border-[#C59B27]/20">
                <Check className="w-4 h-4 text-[#C59B27] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-[#FDF4D4] tracking-wider uppercase">HD Video Consultation</h4>
                  <p className="text-[11px] text-[#ECE4D8]/70 font-light mt-0.5">Live fabric draping under daylight simulation.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 rounded bg-[#0E1013]/60 border border-[#C59B27]/20">
                <Check className="w-4 h-4 text-[#C59B27] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-[#FDF4D4] tracking-wider uppercase">Bespoke Pallu Monogram</h4>
                  <p className="text-[11px] text-[#ECE4D8]/70 font-light mt-0.5">Bride & groom initials woven in pure gold zari.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 rounded bg-[#0E1013]/60 border border-[#C59B27]/20">
                <Check className="w-4 h-4 text-[#C59B27] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-[#FDF4D4] tracking-wider uppercase">Custom Blouse Tailoring</h4>
                  <p className="text-[11px] text-[#ECE4D8]/70 font-light mt-0.5">Master pattern-making with hand zardozi accents.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 rounded bg-[#0E1013]/60 border border-[#C59B27]/20">
                <Check className="w-4 h-4 text-[#C59B27] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-[#FDF4D4] tracking-wider uppercase">Insured Global Escort</h4>
                  <p className="text-[11px] text-[#ECE4D8]/70 font-light mt-0.5">Tamper-proof insured delivery to your doorstep.</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={openConsultation}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#C59B27] to-[#dfbd6e] text-[#0E1013] text-xs font-semibold tracking-[0.22em] uppercase rounded shadow-xl hover:shadow-[#C59B27]/30 transition-all flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Virtual Consultation</span>
              </button>

              <button
                onClick={() => openWhatsAppConcierge()}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#0E1013] text-[#FDF4D4] border border-[#C59B27]/40 text-xs font-medium tracking-[0.18em] uppercase rounded hover:bg-[#1a1e26] transition-colors flex items-center justify-center space-x-2"
              >
                <PhoneCall className="w-4 h-4 text-[#C59B27]" />
                <span>WhatsApp Senior Stylist</span>
              </button>
            </div>
          </div>

          {/* Right Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden border-2 border-[#C59B27]/40 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"
                alt="Kiran Sarees Bridal Trousseau"
                className="w-full h-full object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140608] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded bg-[#0E1013]/90 border border-[#C59B27]/30 backdrop-blur-md">
                <span className="text-[10px] text-[#C59B27] font-semibold tracking-[0.2em] uppercase block mb-1">
                  Private Salon Service
                </span>
                <span className="font-serif text-lg text-[#FDF4D4] font-medium block">
                  Complimentary 45-Minute 1-on-1 Styling
                </span>
                <span className="text-xs text-[#ECE4D8]/70 font-light block mt-0.5">
                  Available in English, Hindi, Gujarati, Tamil & Telugu.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
