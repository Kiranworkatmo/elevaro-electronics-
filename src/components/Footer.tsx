'use client';

import React, { useState } from 'react';
import { Sparkles, Mail, Check, ShieldCheck, Award } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#08090C] border-t border-[#C59B27]/25 text-[#ECE4D8]/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* VIP Privé Circle Box */}
        <div className="bg-[#121419] border border-[#C59B27]/30 rounded-xl p-8 sm:p-12 mb-16 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center space-x-2 text-[#C59B27] text-xs font-semibold tracking-[0.3em] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Privé Circle</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h3 className="font-serif text-2xl sm:text-4xl text-[#FDF4D4] font-medium tracking-wide mb-3">
              Private Access to Limited Handloom Releases
            </h3>
            <p className="text-xs sm:text-sm text-[#ECE4D8]/70 font-light mb-8 max-w-lg mx-auto">
              Be the first to inspect our seasonal pit-loom departures, limited bridal editions, and private trunk show invitations.
            </p>

            {subscribed ? (
              <div className="p-4 bg-[#0E1013] border border-[#C59B27] rounded text-center text-xs tracking-wider text-[#F6E7B9] flex items-center justify-center space-x-2">
                <Check className="w-4 h-4 text-[#C59B27]" />
                <span>You have been inducted into The Kiran Privé Circle. Welcome.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your confidential email..."
                  required
                  className="flex-1 bg-[#0E1013] border border-[#C59B27]/30 rounded px-4 py-3 text-xs text-[#ECE4D8] placeholder-[#ECE4D8]/40 focus:outline-none focus:border-[#C59B27]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#C59B27] hover:bg-[#dfbd6e] text-[#0E1013] text-xs font-semibold tracking-[0.2em] uppercase rounded transition-colors whitespace-nowrap"
                >
                  Request Invite
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#C59B27]/15">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] font-semibold text-[#FDF4D4] uppercase block">
              Kiran Sarees
            </span>
            <span className="text-[9px] tracking-[0.4em] text-[#C59B27] uppercase block mt-1 mb-4 font-light">
              Haute Handlooms • Est. 1974
            </span>
            <p className="text-xs text-[#ECE4D8]/70 font-light leading-relaxed max-w-sm mb-6">
              Purveyors of master-loomed pure silk sarees and certified precious metal zari. Preserving India’s finest generational handloom heritage through fair weaver compensation and uncompromising craftsmanship.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-[#F6E7B9] font-medium">
              <Award className="w-4 h-4 text-[#C59B27]" />
              <span>Silk Mark India Registered Firm #SM-0924</span>
            </div>
          </div>

          {/* Column 2: The Ateliers */}
          <div>
            <h4 className="font-serif text-sm text-[#FDF4D4] font-medium tracking-[0.16em] uppercase mb-4">
              The Ateliers
            </h4>
            <ul className="space-y-2.5 text-xs text-[#ECE4D8]/70 font-light">
              <li><a href="#catalog" className="hover:text-[#C59B27] transition-colors">Banarasi Katan Silk</a></li>
              <li><a href="#catalog" className="hover:text-[#C59B27] transition-colors">Kanjeevaram Temple Brocades</a></li>
              <li><a href="#catalog" className="hover:text-[#C59B27] transition-colors">Chanderi Gossamer Sheers</a></li>
              <li><a href="#catalog" className="hover:text-[#C59B27] transition-colors">Royal Paithani Heirlooms</a></li>
              <li><a href="#catalog" className="hover:text-[#C59B27] transition-colors">Patan Patola Double Ikat</a></li>
              <li><a href="#catalog" className="hover:text-[#C59B27] transition-colors">Pure Silk Glass Organza</a></li>
            </ul>
          </div>

          {/* Column 3: Privé Services */}
          <div>
            <h4 className="font-serif text-sm text-[#FDF4D4] font-medium tracking-[0.16em] uppercase mb-4">
              Privé Services
            </h4>
            <ul className="space-y-2.5 text-xs text-[#ECE4D8]/70 font-light">
              <li><a href="#boutiques" className="hover:text-[#C59B27] transition-colors">Private Salon Booking</a></li>
              <li><a href="#atelier" className="hover:text-[#C59B27] transition-colors">Virtual Draping Video Calls</a></li>
              <li><a href="#catalog" className="hover:text-[#C59B27] transition-colors">Bespoke Pallu Monograms</a></li>
              <li><a href="#catalog" className="hover:text-[#C59B27] transition-colors">Master Blouse Tailoring</a></li>
              <li><a href="#boutiques" className="hover:text-[#C59B27] transition-colors">Zari Assay Testing</a></li>
              <li><a href="#boutiques" className="hover:text-[#C59B27] transition-colors">Heirloom Restoration</a></li>
            </ul>
          </div>

          {/* Column 4: Client Care */}
          <div>
            <h4 className="font-serif text-sm text-[#FDF4D4] font-medium tracking-[0.16em] uppercase mb-4">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#ECE4D8]/70 font-light">
              <li><span className="text-[#ECE4D8]/90">Concierge Desk:</span></li>
              <li className="font-mono text-[11px] text-[#C59B27]">+91 9874561233 (WhatsApp)</li>
              <li className="font-mono text-[11px] text-[#ECE4D8]/80">+91 (022) 4982 7700 (Salons)</li>
              <li className="font-mono text-[11px] text-[#ECE4D8]/60">prive@kiransarees.com</li>
              <li className="pt-2"><span className="hover:text-[#C59B27] transition-colors cursor-pointer">Worldwide Insured Transit</span></li>
              <li><span className="hover:text-[#C59B27] transition-colors cursor-pointer">Silk Care & Storage Manual</span></li>
              <li><span className="hover:text-[#C59B27] transition-colors cursor-pointer">Authenticity Tag Lookup</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#ECE4D8]/50 font-light tracking-wider">
          <p>© {new Date().getFullYear()} Kiran Sarees Haute Handlooms Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <span className="hover:text-[#C59B27] cursor-pointer">Privacy & Discretion</span>
            <span className="hover:text-[#C59B27] cursor-pointer">Terms of Heritage</span>
            <span className="hover:text-[#C59B27] cursor-pointer">Fair Artisan Pact</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
