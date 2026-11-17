'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES } from '@/data/categories';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const category = CATEGORIES.find((c) => c.id === slug);

  if (!category) {
    return notFound();
  }

  const categoryProducts = PRODUCTS.filter((p) => p.category === category.id);

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Category Hero Banner */}
      <div className="relative h-96 sm:h-[420px] bg-[#0E0E0E] overflow-hidden border-b border-white/[0.08] flex items-center">
        {/* Background photo */}
        <div className="absolute inset-0 z-0">
          <Image
            src={category.image}
            alt={category.name}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-white transition-colors">
              Portfolios
            </Link>
            <span>/</span>
            <span className="text-gold-400 font-semibold">{category.name}</span>
          </div>

          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Sovereign Portfolio</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-white font-display tracking-tight">
              {category.name}
            </h1>

            <p className="text-base sm:text-lg text-gold-300 font-medium">
              {category.tagline}
            </p>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl">
              {category.description}
            </p>

            <div className="pt-2 flex items-center gap-6 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                2-Year Concierge Care
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-gold-400" />
                {categoryProducts.length} Models Ready for Dispatch
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/[0.08]">
          <h2 className="text-xl font-bold text-white tracking-wide">
            Available {category.name} Models ({categoryProducts.length})
          </h2>
          <Link
            href="/shop"
            className="text-xs font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1 uppercase tracking-wider"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {categoryProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#111111] rounded-2xl border border-white/[0.08] p-8">
            <h3 className="text-base font-bold text-white">No Models in this Category</h3>
            <p className="text-xs text-gray-400 mt-2">
              New allocations for this portfolio are currently being manufactured in our cleanrooms.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-block py-2.5 px-6 rounded-xl bg-gold-400 text-black font-bold text-xs uppercase tracking-wider"
            >
              Explore Other Portfolios
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
