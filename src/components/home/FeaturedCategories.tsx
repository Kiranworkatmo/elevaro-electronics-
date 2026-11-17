'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES } from '@/data/categories';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FeaturedCategories() {
  return (
    <section className="py-20 bg-[#080808] border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-gold-400 uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sovereign Categorization</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
              Featured Hardware Portfolios
            </h2>
            <p className="text-sm text-gray-400 mt-2 max-w-xl">
              Engineered with zero compromise. Select an architectural category to explore precision-tested electronics.
            </p>
          </div>

          <Link
            href="/shop"
            className="text-xs font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1.5 uppercase tracking-wider group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 9 Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/category/${cat.id}`}
              className="group relative h-72 rounded-2xl overflow-hidden bg-[#121212] border border-white/[0.08] hover:border-gold-500/50 transition-all duration-500 flex flex-col justify-end p-6 hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Background Product Photography */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              </div>

              {/* Card Foreground Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400">
                    Port {String(idx + 1).padStart(2, '0')} • {cat.itemCount} Flagships
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/[0.1] backdrop-blur-md flex items-center justify-center text-white group-hover:bg-gold-500 group-hover:text-black transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-gold-300 transition-colors font-display">
                  {cat.name}
                </h3>

                <p className="text-xs text-gray-300 mt-1 line-clamp-2 leading-relaxed opacity-90">
                  {cat.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
