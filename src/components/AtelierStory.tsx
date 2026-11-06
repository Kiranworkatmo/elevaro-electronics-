'use client';

import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Flame, Compass, Feather } from 'lucide-react';

const CRAFT_STEPS = [
  {
    step: '01',
    title: 'The Sovereign Mulberry Filament',
    tag: 'Grade-A Sericulture',
    desc: 'Only the finest bivoltine natural mulberry cocoons are chosen. Reeled in continuous gossamer threads, the raw silk yields unrivaled tensile strength and liquid drape weight.',
    metrics: '3-ply tightly twisted Murukku silk threads',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85'
  },
  {
    step: '02',
    title: 'Pure Silver & 24k Gold Metallurgy',
    tag: 'Assay-Tested Zari',
    desc: 'Our zari begins as pure silver ingots drawn into microscopic flat ribbon wires (Badla). These ribbons are tightly wound around pure silk cores and electroplated in a 24-karat gold wash.',
    metrics: 'Real Silver Core with 24k Gold Gilding',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85'
  },
  {
    step: '03',
    title: 'The Historic Pit-Looms',
    tag: 'Non-Electric Handcraft',
    desc: 'Zero machinery. Weavers sit in sunken floor pits using wooden pedal levers, manually guiding wood shuttles. Two artisans sit side-by-side for Korvai and Kadwa weaves, locking each buta by hand.',
    metrics: 'Between 30 to 90 days per saree',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85'
  },
  {
    step: '04',
    title: 'The 108-Point Purity Audit',
    tag: 'Government Silk Mark Guarantee',
    desc: 'Before any saree receives the Kiran Sarees seal, our chief archivist conducts a microscopic 108-point inspection: thread tension, zari luster, border symmetry, and Government Silk Mark tagging.',
    metrics: 'Individually serialized authenticity certificate',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=85'
  }
];

export default function AtelierStory() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="atelier" className="py-24 bg-[#0E1013] relative overflow-hidden border-t border-[#C59B27]/20">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#68131B]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[#C59B27] text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Loom of Generations</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl tracking-[0.08em] font-normal text-[#FDF4D4] uppercase">
            The Making of a Kiran Heirloom
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C59B27] to-transparent mx-auto my-6" />
          <p className="text-sm sm:text-base text-[#ECE4D8]/75 font-light leading-relaxed">
            In an era of fleeting machine manufacture, we preserve the meditative rhythm of traditional handlooms. Walk through the four sacred stages of our master atelier.
          </p>
        </div>

        {/* Step Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {CRAFT_STEPS.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-lg border text-left transition-all duration-300 ${
                activeStep === idx
                  ? 'bg-[#181C24] border-[#C59B27] shadow-xl shadow-[#C59B27]/10'
                  : 'bg-[#121419]/70 border-[#C59B27]/20 hover:border-[#C59B27]/40 text-[#ECE4D8]/70'
              }`}
            >
              <span className={`text-xs font-serif font-bold block mb-1 ${activeStep === idx ? 'text-[#C59B27]' : 'text-[#ECE4D8]/40'}`}>
                STEP {s.step}
              </span>
              <span className="font-serif text-sm sm:text-base text-[#FDF4D4] font-medium block truncate">
                {s.title.split(' ')[1]} {s.title.split(' ')[2] || ''}
              </span>
              <span className="text-[10px] text-[#C59B27] uppercase tracking-wider block mt-1">
                {s.tag}
              </span>
            </button>
          ))}
        </div>

        {/* Active Stage Deep Dive */}
        <div className="bg-[#14171D] border border-[#C59B27]/30 rounded-xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Text Column */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#C59B27] mb-4">
                <span className="w-2 h-2 rounded-full bg-[#C59B27]" />
                <span>Stage {CRAFT_STEPS[activeStep].step} • {CRAFT_STEPS[activeStep].tag}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-4xl text-[#FDF4D4] font-medium tracking-wide mb-6">
                {CRAFT_STEPS[activeStep].title}
              </h3>

              <p className="text-sm sm:text-base text-[#ECE4D8]/80 font-light leading-relaxed mb-8">
                {CRAFT_STEPS[activeStep].desc}
              </p>

              <div className="p-4 rounded bg-[#0E1013] border border-[#C59B27]/20 flex items-center space-x-3 mb-8">
                <ShieldCheck className="w-5 h-5 text-[#C59B27] flex-shrink-0" />
                <span className="text-xs sm:text-sm text-[#F6E7B9] font-medium tracking-wide">
                  Benchmark: {CRAFT_STEPS[activeStep].metrics}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-6 border-t border-[#C59B27]/15">
              <span className="text-xs text-[#ECE4D8]/50 uppercase tracking-widest font-mono">
                Atelier Heritage Archive #74
              </span>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
            <img
              src={CRAFT_STEPS[activeStep].image}
              alt={CRAFT_STEPS[activeStep].title}
              className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14171D] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#14171D] lg:via-transparent lg:to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
