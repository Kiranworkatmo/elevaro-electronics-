'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ElevaroLogo from '@/components/ElevaroLogo';
import { useShop } from '@/context/ShopContext';
import { CATEGORIES } from '@/data/categories';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Mail,
  ArrowRight,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export default function Footer() {
  const { addToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;

    setIsSubscribed(true);
    addToast({
      type: 'success',
      title: 'Privileged Access Granted',
      message: 'You have been enrolled in exclusive Elevaro product premieres and private allocations.',
    });
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#050505] border-t border-white/[0.08] text-gray-400 text-xs mt-auto">
      {/* 4 Pillars Header Ribbon */}
      <div className="border-b border-white/[0.06] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-gold-500/30 flex items-center justify-center shrink-0 text-gold-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">100% Genuine Certified</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Direct vault provenance from official master manufacturers with serial authenticity verification.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-gold-500/30 flex items-center justify-center shrink-0 text-gold-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">White-Glove Delivery</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Complimentary insured express air courier on all acquisitions above $500 with personal signature receipt.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-gold-500/30 flex items-center justify-center shrink-0 text-gold-400">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">30-Day Concierge Returns</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Hassle-free complimentary return logistics. Restocking or replacement handled with complete discretion.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-gold-500/30 flex items-center justify-center shrink-0 text-gold-400">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">24/7 VIP Concierge</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Direct access to master electronics specialists for configuration, troubleshooting, and custom ordering.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Intro & Newsletter */}
          <div className="lg:col-span-2 space-y-5">
            <ElevaroLogo size="lg" />

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              &ldquo;Elevate Your Everyday Technology.&rdquo; Purveyors of sovereign mobile engineering, workstation silicon, masterclass acoustics, and architectural entertainment systems.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                Stay Ahead of Technology
              </p>
              <p className="text-[11px] text-gray-400 mb-3">
                Subscribe for exclusive private allocations, invite-only premieres, and a 10% acquisition token.
              </p>

              {isSubscribed ? (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-300">
                  <CheckCircle2 className="w-4 h-4 text-gold-400" />
                  <span className="text-xs font-semibold">Welcome to the Elevaro Inner Circle</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your VIP email address"
                      required
                      className="w-full bg-[#111111] border border-white/[0.1] focus:border-gold-500 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="py-2.5 px-5 rounded-xl bg-gold-400 hover:bg-gold-300 text-black font-extrabold text-xs tracking-wider uppercase transition-colors shrink-0 flex items-center gap-1.5"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Portfolios Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Hardware Portfolios
            </h4>
            <ul className="space-y-2.5">
              {CATEGORIES.slice(0, 7).map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/category/${c.id}`}
                    className="text-gray-400 hover:text-gold-300 transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/shop"
                  className="text-gold-400 hover:text-gold-300 transition-colors font-medium flex items-center gap-1"
                >
                  <span>All Collections</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              VIP Customer Care
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/track-order" className="text-gray-400 hover:text-gold-300 transition-colors">
                  Track Order & Shipment
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-gold-300 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-gold-300 transition-colors">
                  VIP Concierge Desk
                </Link>
              </li>
              <li>
                <Link href="/faq#shipping" className="text-gray-400 hover:text-gold-300 transition-colors">
                  Insured White-Glove Shipping
                </Link>
              </li>
              <li>
                <Link href="/faq#returns" className="text-gray-400 hover:text-gold-300 transition-colors">
                  30-Day Return & Exchange Policy
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-gray-400 hover:text-gold-300 transition-colors">
                  Hardware Comparison Matrix
                </Link>
              </li>
            </ul>
          </div>

          {/* Corporate & Legal Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Corporate & Governance
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-gold-300 transition-colors">
                  About ELEVARO
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-gold-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-gold-300 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gold-400 hover:text-gold-300 font-semibold transition-colors">
                  Admin Command Center
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-400 hover:text-gold-300 transition-colors">
                  Client Portal Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Verified Payment Channels */}
        <div className="mt-14 pt-8 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-xs text-gray-500">
            <span>© {new Date().getFullYear()} ELEVARO ELECTRONICS INC. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5 text-gray-400">
              <Lock className="w-3.5 h-3.5 text-gold-400" />
              Secure 256-Bit SSL Bank-Grade Encryption
            </span>
          </div>

          {/* Payment Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['Apple Pay', 'Google Pay', 'Visa', 'Mastercard', 'Amex', 'Razorpay', 'Stripe'].map((gateway) => (
              <span
                key={gateway}
                className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-[10px] font-semibold text-gray-300 tracking-wider"
              >
                {gateway}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
