'use client';

import React from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function NewArrivals() {
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival || p.badge === 'NEW ARRIVAL').slice(0, 4);

  return (
    <section className="py-20 bg-[#080808] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-400 uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Vault Fresh Allocations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
              New Arrivals
            </h2>
            <p className="text-sm text-gray-400 mt-2 max-w-xl">
              Newly launched flagships featuring next-generation processors, tandem OLED panels, and medium-format optics.
            </p>
          </div>

          <Link
            href="/shop?sort=newest"
            className="text-xs font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1.5 uppercase tracking-wider"
          >
            <span>Explore All New Releases</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
