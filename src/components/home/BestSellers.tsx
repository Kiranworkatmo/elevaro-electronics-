'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, Flame } from 'lucide-react';

const FILTER_TABS = [
  { id: 'all', label: 'All Best Sellers' },
  { id: 'smartphones', label: 'Smartphones' },
  { id: 'laptops', label: 'Laptops' },
  { id: 'headphones', label: 'Headphones' },
  { id: 'accessories', label: 'Accessories' },
];

export default function BestSellers() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeTab === 'all') return p.isBestSeller || p.badge === 'BESTSELLER';
    return p.category === activeTab;
  }).slice(0, 8);

  return (
    <section className="py-20 bg-[#0A0A0A] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>International Acclaim</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
              Best Sellers
            </h2>
            <p className="text-sm text-gray-400 mt-2 max-w-xl">
              The most requested hardware masterpieces by discerning executives, creators, and audiophiles worldwide.
            </p>
          </div>

          <Link
            href="/shop?badge=BESTSELLER"
            className="text-xs font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1.5 uppercase tracking-wider"
          >
            <span>View All Best Sellers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gold-400 text-black shadow-lg shadow-gold-500/20'
                  : 'bg-white/[0.04] text-gray-300 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
