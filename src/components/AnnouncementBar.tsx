'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { Sparkles, Truck, RotateCcw, ShieldCheck, ChevronDown, Globe } from 'lucide-react';
import { Currency } from '@/types/electronics';

const ANNOUNCEMENTS = [
  { icon: Truck, text: 'Complimentary VIP White-Glove Shipping on Orders Above $500' },
  { icon: Sparkles, text: 'Exclusive Launch Concession: Use Code ELEVARO10 for 10% Off' },
  { icon: ShieldCheck, text: '2-Year International Hardware Warranty & Authenticity Guarantee' },
  { icon: RotateCcw, text: '30-Day Hassle-Free Concierge Returns & Exchange' },
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { currency, setCurrency } = useShop();
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const activeAnnouncement = ANNOUNCEMENTS[currentIndex];
  const IconComponent = activeAnnouncement.icon;

  const currencies: { code: Currency; label: string; symbol: string }[] = [
    { code: 'USD', label: 'USD', symbol: '$' },
    { code: 'INR', label: 'INR', symbol: '₹' },
    { code: 'EUR', label: 'EUR', symbol: '€' },
    { code: 'GBP', label: 'GBP', symbol: '£' },
  ];

  return (
    <div className="bg-[#050505] border-b border-white/[0.06] text-xs text-gray-300 py-2 px-4 select-none relative z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Links */}
        <div className="hidden lg:flex items-center space-x-6 text-gray-400">
          <Link
            href="/track-order"
            className="hover:text-gold-400 transition-colors flex items-center gap-1.5"
          >
            <span>Track Order</span>
          </Link>
          <span className="text-white/10">•</span>
          <Link
            href="/about"
            className="hover:text-gold-400 transition-colors"
          >
            The Elevaro Standard
          </Link>
          <span className="text-white/10">•</span>
          <Link
            href="/contact"
            className="hover:text-gold-400 transition-colors"
          >
            VIP Concierge
          </Link>
        </div>

        {/* Center Rotating Banner */}
        <div className="flex-1 flex items-center justify-center text-center overflow-hidden">
          <div
            key={currentIndex}
            className="flex items-center justify-center gap-2 transition-all duration-500 transform animate-fadeIn text-[11px] sm:text-xs"
          >
            <IconComponent className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span className="font-medium tracking-wide text-gray-200">
              {activeAnnouncement.text}
            </span>
          </div>
        </div>

        {/* Right Currency & Language Selector */}
        <div className="flex items-center space-x-4 shrink-0">
          <div className="relative">
            <button
              onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
              className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors py-0.5 px-2 rounded bg-white/[0.04] border border-white/[0.08]"
              aria-expanded={isCurrencyDropdownOpen}
            >
              <Globe className="w-3 h-3 text-gold-400" />
              <span className="font-medium">{currency}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {isCurrencyDropdownOpen && (
              <div
                className="absolute right-0 mt-1.5 w-32 bg-[#121212] border border-gold-500/30 rounded-lg shadow-2xl py-1 z-50 backdrop-blur-xl"
                onMouseLeave={() => setIsCurrencyDropdownOpen(false)}
              >
                {currencies.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => {
                      setCurrency(curr.code);
                      setIsCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-white/[0.08] transition-colors ${
                      currency === curr.code ? 'text-gold-400 font-semibold bg-white/[0.04]' : 'text-gray-300'
                    }`}
                  >
                    <span>{curr.label}</span>
                    <span className="text-gray-400">{curr.symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
