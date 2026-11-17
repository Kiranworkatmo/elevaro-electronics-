'use client';

import React from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import ProductCard from '@/components/ProductCard';
import { Heart, ArrowRight, ShoppingBag } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, formatPrice } = useShop();

  return (
    <div className="min-h-screen bg-[#080808] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase tracking-widest mb-1.5">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Private Vault Allocations</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
              My Saved Wishlist
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              {wishlist.length} electronic instruments reserved for future acquisition.
            </p>
          </div>

          <Link
            href="/shop"
            className="text-xs font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1.5 uppercase tracking-wider"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-[#111111] rounded-3xl border border-white/[0.08] p-8 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-rose-400 mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">Your Wishlist is Empty</h3>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Explore our titanium smartphones, workstations, and lossless acoustic instruments to save items you admire.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-gold-400 text-black font-extrabold text-xs uppercase tracking-wider"
            >
              <span>Explore Electronics</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
