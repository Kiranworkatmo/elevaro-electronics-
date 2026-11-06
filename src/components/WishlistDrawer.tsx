'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    closeWishlist,
    toggleWishlist,
    addToCart,
    formatPrice
  } = useShop();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={closeWishlist}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#12151B] border-l border-[#C59B27]/30 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#C59B27]/20 flex items-center justify-between bg-[#0E1013]">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-[#801823] fill-current" />
              <h2 className="font-serif text-lg tracking-[0.16em] uppercase text-[#FDF4D4] font-medium">
                Saved Heirlooms
              </h2>
              <span className="text-xs text-[#C59B27] font-semibold font-mono">
                ({wishlist.length})
              </span>
            </div>
            <button
              onClick={closeWishlist}
              className="p-2 text-[#ECE4D8]/60 hover:text-white transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="text-center py-20">
                <Heart className="w-12 h-12 text-[#C59B27]/30 mx-auto mb-3" />
                <h3 className="font-serif text-xl text-[#FDF4D4] font-medium mb-2">
                  No Saved Pieces
                </h3>
                <p className="text-xs text-[#ECE4D8]/60 font-light mb-6 max-w-xs mx-auto">
                  Click the heart icon on any saree to save it for your private trousseau review.
                </p>
                <button
                  onClick={closeWishlist}
                  className="px-6 py-2.5 bg-[#C59B27] text-[#0E1013] text-xs font-semibold tracking-[0.2em] uppercase rounded shadow-lg"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              wishlist.map((saree) => (
                <div
                  key={saree.id}
                  className="p-4 rounded-lg bg-[#0E1013] border border-[#C59B27]/20 flex gap-4"
                >
                  <img
                    src={saree.images.main}
                    alt={saree.name}
                    className="w-20 h-24 object-cover object-center rounded border border-[#C59B27]/25 flex-shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] text-[#C59B27] uppercase tracking-wider font-medium">
                          {saree.weave}
                        </span>
                        <button
                          onClick={() => toggleWishlist(saree)}
                          className="text-[#ECE4D8]/40 hover:text-red-400 transition-colors p-1"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="font-serif text-sm text-[#FDF4D4] font-medium line-clamp-1 mt-0.5">
                        {saree.name}
                      </h4>

                      <span className="font-serif text-sm text-[#F6E7B9] font-medium block mt-1">
                        {formatPrice(saree.priceINR)}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(saree);
                        toggleWishlist(saree);
                      }}
                      className="mt-3 py-1.5 px-3 bg-[#C59B27] hover:bg-[#dfbd6e] text-[#0E1013] text-[11px] font-semibold tracking-[0.16em] uppercase rounded flex items-center justify-center space-x-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
