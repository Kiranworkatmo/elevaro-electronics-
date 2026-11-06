'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { Sparkles, ShieldCheck, ArrowRight, Video, Compass } from 'lucide-react';

export default function Hero() {
  const { openConsultation, openWhatsAppConcierge } = useShop();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#0A0C0E]">
      {/* Background Image with Cinematic Luxury Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=90"
          alt="Kiran Sarees Sovereign Royal Handlooms"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-110"
        />
        {/* Layered luxury gradient masks */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E1013] via-[#0E1013]/70 to-[#0E1013]/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1013] via-transparent to-[#0E1013]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(#C59B27_1px,transparent_1px)] [background-size:40px_40px] opacity-15" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Editorial Subtitle Crest */}
        <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full border border-[#C59B27]/40 bg-[#170507]/80 backdrop-blur-md mb-8">
          <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#F6E7B9]">
            The 2026 Sovereign Anthology
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27]" />
          <span className="text-[11px] sm:text-xs tracking-[0.2em] text-[#ECE4D8]/80 hidden sm:inline">
            Haute Couture Handlooms
          </span>
        </div>

        {/* Regal Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.06em] font-light text-[#FDF4D4] leading-[1.08] max-w-5xl">
          Heirlooms Woven in{' '}
          <span className="italic font-normal gold-text-gradient">
            Gold
          </span>
          ,<br className="hidden sm:inline" />
          {' '}Worn Through Generations.
        </h1>

        {/* Narrative Description */}
        <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-[#ECE4D8]/80 max-w-2xl font-light leading-relaxed tracking-wide font-sans">
          Purveyors of master-loomed Banarasi Katan, royal Kanchipuram temple brocades, and whisper-sheer Chanderi. Crafted on ancient wooden pit-looms with genuine silver and 24-karat gold electrogilded zari.
        </p>

        {/* Interactive CTA Buttons */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md sm:max-w-none">
          <a
            href="#catalog"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#C59B27] via-[#DFBD6E] to-[#C59B27] text-[#0E1013] font-semibold text-xs tracking-[0.22em] uppercase rounded shadow-xl hover:shadow-[#C59B27]/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
          >
            <span>Explore The Heirlooms</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={openConsultation}
            className="w-full sm:w-auto px-8 py-4 bg-[#170507]/90 hover:bg-[#25080c] text-[#FDF4D4] border border-[#C59B27]/50 font-medium text-xs tracking-[0.22em] uppercase rounded backdrop-blur-sm transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
          >
            <Video className="w-4 h-4 text-[#C59B27]" />
            <span>Book Bridal Salon Video Call</span>
          </button>
        </div>

        {/* Trust Badges & Hallmarks Bar */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-[#C59B27]/20 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 w-full max-w-4xl text-center">
          <div className="flex flex-col items-center">
            <span className="font-serif text-2xl sm:text-3xl text-[#C59B27] font-semibold">120+</span>
            <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#ECE4D8]/70 mt-1">Master Pit-Looms</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-serif text-2xl sm:text-3xl text-[#C59B27] font-semibold">100%</span>
            <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#ECE4D8]/70 mt-1">Silk Mark Certified</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-serif text-2xl sm:text-3xl text-[#C59B27] font-semibold">24K</span>
            <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#ECE4D8]/70 mt-1">Tested Gold & Silver Zari</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-serif text-2xl sm:text-3xl text-[#C59B27] font-semibold">50+</span>
            <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#ECE4D8]/70 mt-1">Years of Royal Heritage</span>
          </div>
        </div>
      </div>
    </section>
  );
}
