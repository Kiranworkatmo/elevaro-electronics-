'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Lock } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#080808] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">
            Corporate Governance
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight mt-1">
            Privacy Policy & Data Security
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Effective Date: November 2026 • Elevaro International Electronics Inc.
          </p>
        </div>

        <div className="bg-[#111111] p-8 sm:p-10 rounded-3xl border border-white/[0.08] space-y-6 text-xs text-gray-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              1. Our Sovereign Privacy Standard
            </h2>
            <p>
              At ELEVARO ELECTRONICS, we regard patron privacy as an essential luxury hallmark. We never monetize, rent, or sell your personal details, biometric telemetry, or acquisition histories to third-party ad networks or brokers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              2. Information Collected
            </h2>
            <p>
              When acquiring instruments or creating an Elevaro Prive account, we collect only essential operational data: legal name, contact email, delivery destination, telephone number for courier custody handoff, and encrypted transaction metadata.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              3. Payment Security & Tokenization
            </h2>
            <p>
              Payment data is never stored on Elevaro internal servers. All credit card transactions are processed via Stripe (PCI-DSS Level 1 certified), and Indian digital payments are processed through Razorpay with direct bank encryption and dual-factor authentication.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              4. Hardware Diagnostic Telemetry
            </h2>
            <p>
              Cleanroom verification logs and hardware serial numbers are retained solely for warranty tracking and genuine provenance verification under your 2-Year Elevaro VIP Care plan.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              5. Your Legal Rights & Data Portability
            </h2>
            <p>
              You maintain total dominion over your data. You may request an export of your vault history or submit a complete data erasure request at any time by contacting privacy@elevaro.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
