'use client';

import React from 'react';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  RotateCcw,
  Headphones,
  Award,
} from 'lucide-react';

const ADVANTAGES = [
  {
    icon: ShieldCheck,
    title: '100% Genuine Products',
    tagline: 'Direct Provenance & Serial Validation',
    description: 'Every device arrives brand-sealed with verified international manufacturer warranty, tamper-evident seals, and digital provenance certificates.',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    tagline: 'Bank-Grade 256-Bit Encryption',
    description: 'Seamless checkout powered by Stripe & Razorpay with dual-layer fraud protection, tokenized credentials, and zero liability assurance.',
  },
  {
    icon: Truck,
    title: 'Fast & Reliable Delivery',
    tagline: 'Insured White-Glove Courier',
    description: 'Complimentary priority air dispatch on orders over $500. Temperature-monitored courier transit with signature verification upon delivery.',
  },
  {
    icon: RotateCcw,
    title: 'Easy 30-Day Returns',
    tagline: 'Zero-Friction Concierge Pickup',
    description: '30-day trial window. If a piece does not exceed your exacting expectations, our personal courier will retrieve it from your residence.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Customer Support',
    tagline: 'Certified Hardware Specialists 24/7',
    description: 'Immediate direct access to audio engineers and electronics architects via phone, encrypted WhatsApp, or private video walkthrough.',
  },
  {
    icon: Award,
    title: '2-Year VIP Warranty',
    tagline: 'Zero-Downtime Replacement Care',
    description: 'All flagship electronics include an automatic 2-year Elevaro Care warranty with immediate replacement unit dispatch in case of any defect.',
  },
];

export default function WhyChooseElevaro() {
  return (
    <section className="py-24 bg-[#0A0A0A] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">
            The Sovereign Standard
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight mt-2">
            Why Choose ELEVARO?
          </h2>
          <p className="text-sm text-gray-400 mt-3 leading-relaxed">
            Elevating your retail relationship into a sovereign luxury partnership. Built upon certified authenticity, discrete speed, and lifetime support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ADVANTAGES.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="group p-8 rounded-2xl bg-[#111111] border border-white/[0.08] hover:border-gold-500/40 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6 group-hover:scale-110 group-hover:border-gold-400 transition-all">
                  <IconComponent className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs font-semibold text-gold-400/90 mt-1 uppercase tracking-wider">
                  {item.tagline}
                </p>

                <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
