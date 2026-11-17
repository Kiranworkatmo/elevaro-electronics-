'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

const FAQS = [
  {
    category: 'Ordering & Payment',
    items: [
      {
        q: 'What payment methods does Elevaro accept?',
        a: 'We accept all major global credit cards (Visa, MasterCard, American Express) via Stripe tokenized encryption, as well as Indian payment methods including UPI, Google Pay, PhonePe, and Net Banking via Razorpay. We also offer White-Glove Courier Inspection upon Delivery.',
      },
      {
        q: 'Can I request bespoke corporate or executive gift packaging?',
        a: 'Yes. All orders are naturally sheathed in our signature luxury satin-lined hard boxes. For custom laser monogramming or multi-unit executive allocations, contact our VIP Concierge Desk.',
      },
      {
        q: 'How do I use a promotional voucher or coupon code?',
        a: 'Enter your valid code (such as ELEVARO10 for 10% off or LUXURY50 for $50 off) in the promo box inside your cart or at checkout. The deduction reflects instantly.',
      },
    ],
  },
  {
    category: 'White-Glove Shipping & Transit',
    items: [
      {
        q: 'What are the delivery timescales and charges?',
        a: 'Orders above $500 enjoy complimentary Insured Express Air Courier delivery worldwide. Delivery takes 24 to 48 hours to major metropolitan centers. Orders under $500 carry a flat $35 courier fee.',
      },
      {
        q: 'Is signature required upon receipt?',
        a: 'Yes. For your security and to maintain complete chain-of-custody, an adult signature is required for all hardware deliveries.',
      },
      {
        q: 'How can I track the progress of my vault shipment?',
        a: 'Navigate to our Live Order Tracking page and input your Order ID (e.g. ELV-89421-2026) or tracking code. You will see real-time updates as the device passes cleanroom verification, air transit, and final delivery.',
      },
    ],
  },
  {
    category: 'Warranty & Care',
    items: [
      {
        q: 'What does the 2-Year Elevaro VIP Care Warranty cover?',
        a: 'Every electronic device purchased from Elevaro is protected by our comprehensive 2-Year Warranty. This covers all internal hardware faults, display pixel abnormalities, acoustic driver degradation, and battery performance below 80%.',
      },
      {
        q: 'How does replacement work if my device develops a fault?',
        a: 'If our diagnostic team confirms an issue that cannot be resolved remotely, we immediately dispatch a fresh replacement unit with a pre-paid return kit for the existing unit.',
      },
    ],
  },
  {
    category: 'Returns & Discretion',
    items: [
      {
        q: 'What is your return policy?',
        a: 'We offer a 30-Day Hassle-Free Concierge Return policy. If an instrument does not exceed your exacting expectations, initiate a return via your account or contact our concierge, and we will arrange a doorstep courier pickup at no cost to you.',
      },
      {
        q: 'How long do refunds take to process?',
        a: 'Once the returned unit arrives at our vault and completes physical verification (typically within 24 hours), the full refund is credited back to your original payment channel.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    '0-0': true,
    '1-0': true,
  });

  const toggleItem = (catIdx: number, itemIdx: number) => {
    const key = `${catIdx}-${itemIdx}`;
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#080808] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-400 uppercase tracking-widest mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Patron Knowledge Center</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 mt-2">
            Everything you need to know about purchasing, insured transit, and our 2-year warranty care.
          </p>
        </div>

        <div className="space-y-12">
          {FAQS.map((cat, catIdx) => (
            <div key={cat.category} className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gold-400 pb-2 border-b border-white/[0.08]">
                {cat.category}
              </h2>

              <div className="space-y-3">
                {cat.items.map((item, itemIdx) => {
                  const key = `${catIdx}-${itemIdx}`;
                  const isOpen = !!openItems[key];

                  return (
                    <div
                      key={itemIdx}
                      className="bg-[#111111] border border-white/[0.08] hover:border-white/[0.15] rounded-2xl overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => toggleItem(catIdx, itemIdx)}
                        className="w-full text-left p-5 flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-white transition-colors"
                      >
                        <span>{item.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-gold-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 text-xs text-gray-300 leading-relaxed border-t border-white/[0.04] pt-3">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact footer */}
        <div className="mt-16 p-8 rounded-3xl bg-[#111111] border border-gold-500/30 text-center space-y-4">
          <h3 className="text-lg font-bold text-white">Have a Bespoke Inquiry?</h3>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            Our certified technology specialists are on standby to consult on custom requirements, private acquisitions, and enterprise configurations.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-gold-400 text-black font-extrabold text-xs uppercase tracking-wider hover:bg-gold-300 transition-colors"
          >
            <span>Consult VIP Concierge Desk</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
