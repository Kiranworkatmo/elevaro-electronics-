'use client';

import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#080808] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">
            Legal Terms & Conditions
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight mt-1">
            Terms of Service
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Last Updated: November 2026 • Elevaro International Electronics Inc.
          </p>
        </div>

        <div className="bg-[#111111] p-8 sm:p-10 rounded-3xl border border-white/[0.08] space-y-6 text-xs text-gray-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              1. Agreement to Terms
            </h2>
            <p>
              By accessing the ELEVARO ELECTRONICS platform or acquiring hardware through our digital vaults, you agree to be bound by these Terms of Service and all applicable trade regulations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              2. Authentic Hardware Guarantee
            </h2>
            <p>
              All instruments sold through Elevaro are 100% factory original, brand sealed, and traceable to authorized manufacture ateliers. Any alteration of serial numbers or tamper-evident seals terminates warranty coverage.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              3. Pricing, Tariffs & Currency
            </h2>
            <p>
              Prices are displayed in your chosen currency (USD, INR, EUR, GBP) and include all applicable export duties. Orders above $500 qualify for complimentary White-Glove Air Courier delivery.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              4. 2-Year International Hardware Warranty
            </h2>
            <p>
              Hardware is warranted against manufacturing defects for twenty-four (24) months from delivery date. Accidental physical drops, liquid submersion beyond IP ratings, and unauthorized third-party repairs are excluded from standard coverage.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              5. 30-Day Concierge Return Rights
            </h2>
            <p>
              Patrons may initiate a return within 30 days of receiving the delivery. The hardware must be returned in its original condition with all accessories, cables, and packaging intact.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              6. Governing Law & Arbitration
            </h2>
            <p>
              These terms are governed by the commercial statutes of Zurich, Switzerland, and the State of California, United States, without regard to conflict of law principles.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
