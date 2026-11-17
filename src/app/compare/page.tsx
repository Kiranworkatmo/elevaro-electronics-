'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useShop } from '@/context/ShopContext';
import {
  SlidersHorizontal,
  X,
  ShoppingBag,
  Star,
  Check,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

export default function ComparePage() {
  const {
    compareList,
    removeFromCompare,
    clearCompare,
    addToCart,
    formatPrice,
  } = useShop();

  const specRows = [
    { label: 'Category', key: 'categoryLabel' },
    { label: 'Manufacture Atelier', key: 'brand' },
    { label: 'Base Pricing', custom: (p: any) => formatPrice(p.price) },
    {
      label: 'Client Rating',
      custom: (p: any) => (
        <div className="flex items-center gap-1 text-amber-400">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span className="font-bold text-white text-xs">{p.rating}</span>
          <span className="text-[11px] text-gray-400">({p.reviewCount})</span>
        </div>
      ),
    },
    { label: 'Processor / Silicon', specKey: 'processor' },
    { label: 'Memory / RAM', specKey: 'ram' },
    { label: 'Storage Capacity', specKey: 'storage' },
    { label: 'Display Panel', specKey: 'display' },
    { label: 'Battery & Endurance', specKey: 'battery' },
    { label: 'Connectivity Protocols', specKey: 'connectivity' },
    { label: 'Material Enclosure', specKey: 'material' },
    { label: 'Weight', specKey: 'weight' },
    { label: 'Concierge Warranty', specKey: 'warranty' },
  ];

  return (
    <div className="min-h-screen bg-[#080808] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-gold-400 uppercase tracking-widest mb-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Telemetry Matrix</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
              Compare Specifications
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Side-by-side architectural analysis of your selected electronics flagships.
            </p>
          </div>

          {compareList.length > 0 && (
            <button
              onClick={clearCompare}
              className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1 self-start sm:self-auto"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear Comparison Matrix</span>
            </button>
          )}
        </div>

        {compareList.length === 0 ? (
          <div className="text-center py-20 bg-[#111111] rounded-3xl border border-white/[0.08] p-8 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gold-400 mx-auto mb-4">
              <SlidersHorizontal className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">No Models Selected for Comparison</h3>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Browse our catalog and click the compare icon on any product card to analyze specifications side-by-side (up to 4 items).
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-gold-400 text-black font-extrabold text-xs uppercase tracking-wider"
            >
              <span>Explore Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto bg-[#111111] rounded-3xl border border-white/[0.08] shadow-2xl p-6">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr>
                  <th className="p-4 w-52 text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-white/[0.08]">
                    Hardware Overview
                  </th>
                  {compareList.map((product) => (
                    <th
                      key={product.id}
                      className="p-4 w-64 border-b border-white/[0.08] align-top"
                    >
                      <div className="relative">
                        <button
                          onClick={() => removeFromCompare(product.id)}
                          className="absolute -top-1 -right-1 p-1 rounded-full bg-white/[0.08] text-gray-400 hover:text-rose-400 transition-colors"
                          title="Remove from comparison"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#181818] mb-3">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            sizes="200px"
                            className="object-cover"
                          />
                        </div>

                        <p className="text-[11px] font-bold text-gold-400 uppercase tracking-wider">
                          {product.brand}
                        </p>
                        <h4 className="text-sm font-bold text-white line-clamp-1 mt-0.5">
                          {product.name}
                        </h4>
                        <p className="text-base font-extrabold text-white font-display mt-1">
                          {formatPrice(product.price)}
                        </p>

                        <button
                          onClick={() => addToCart(product, 1)}
                          className="w-full mt-3 py-2 px-3 rounded-xl bg-gold-400 hover:bg-gold-300 text-black font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-white/[0.06] text-xs">
                {specRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-bold text-gray-300 uppercase tracking-wider bg-black/20">
                      {row.label}
                    </td>
                    {compareList.map((p) => {
                      let cellContent: React.ReactNode = '—';
                      if (row.custom) {
                        cellContent = row.custom(p);
                      } else if (row.key) {
                        cellContent = (p as any)[row.key];
                      } else if (row.specKey) {
                        cellContent = p.specs[row.specKey] || '—';
                      }

                      return (
                        <td key={p.id} className="p-4 text-gray-300 font-medium">
                          {cellContent}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
