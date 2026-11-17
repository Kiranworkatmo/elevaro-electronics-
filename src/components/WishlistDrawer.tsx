'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useShop } from '@/context/ShopContext';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    closeWishlist,
    removeFromWishlist,
    addToCart,
    formatPrice,
  } = useShop();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={closeWishlist}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0F0F0F] border-l border-white/[0.1] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-current" />
              <h2 className="text-base font-bold text-white tracking-wide">
                Saved Wishlist ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={closeWishlist}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/[0.06]"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlist.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-500 mb-4">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-bold text-white">Your Wishlist is Empty</h3>
                <p className="text-xs text-gray-400 max-w-xs mt-1.5 leading-relaxed">
                  Save your desired luxury laptops, audio transducers, and smartphones to track availability.
                </p>
                <button
                  onClick={closeWishlist}
                  className="mt-6 py-2.5 px-6 rounded-xl bg-gold-400 hover:bg-gold-300 text-black font-bold text-xs tracking-wider uppercase transition-colors"
                >
                  Explore Electronics
                </button>
              </div>
            ) : (
              wishlist.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
                >
                  <div className="relative w-20 h-20 rounded-lg bg-[#181818] overflow-hidden shrink-0">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={closeWishlist}
                        className="text-xs font-bold text-white hover:text-gold-300 transition-colors line-clamp-1"
                      >
                        {product.name}
                      </Link>
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="text-gray-400 hover:text-rose-400 transition-colors p-1"
                        aria-label="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-gray-400 mt-0.5">{product.brand}</p>
                    <p className="text-xs font-bold text-gold-400 mt-1">
                      {formatPrice(product.price)}
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => {
                          addToCart(product, 1);
                          removeFromWishlist(product.id);
                        }}
                        className="py-1.5 px-3 rounded-lg bg-gold-400 hover:bg-gold-300 text-black font-bold text-[11px] transition-colors flex items-center gap-1.5"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="p-5 border-t border-white/[0.08] bg-[#121212]">
              <Link
                href="/wishlist"
                onClick={closeWishlist}
                className="w-full py-3 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 border border-white/[0.08]"
              >
                <span>View Full Wishlist Page</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
