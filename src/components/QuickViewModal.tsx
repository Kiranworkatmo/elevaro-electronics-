'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  SlidersHorizontal,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  ArrowRight,
  Flame,
} from 'lucide-react';

export default function QuickViewModal() {
  const {
    quickViewProduct,
    closeQuickView,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorited = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const activeColor = selectedColor || (product.colors && product.colors[0]?.name) || '';
  const activeVar = selectedVariant || (product.variants && product.variants[0]?.name) || '';

  // Calculate price with variant delta
  let dynamicPrice = product.price;
  if (activeVar && product.variants) {
    const v = product.variants.find((item) => item.name === activeVar);
    if (v) dynamicPrice += v.priceDelta;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, activeColor, activeVar);
    closeQuickView();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={closeQuickView}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#121212] border border-white/[0.12] rounded-3xl shadow-2xl overflow-hidden z-10 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-gray-400 hover:text-white hover:bg-black transition-all border border-white/[0.1]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery Column */}
          <div className="p-6 md:p-8 bg-[#181818] flex flex-col justify-between">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black/40 border border-white/[0.08]">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-all duration-300"
              />

              {product.badge && (
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/40 backdrop-blur-md">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx ? 'border-gold-400 scale-95 shadow-lg' : 'border-white/[0.08] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} preview ${idx + 1}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Brand & Category */}
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-1.5">
                <span className="font-bold text-gold-400 uppercase tracking-widest">{product.brand}</span>
                <span>•</span>
                <span className="capitalize">{product.categoryLabel}</span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-black text-white font-display leading-tight">
                {product.name}
              </h2>

              {/* Rating & Stock */}
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5 text-xs text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-white">{product.rating}</span>
                  <span className="text-gray-400">({product.reviewCount} reviews)</span>
                </div>

                {product.stockCount <= 8 ? (
                  <span className="text-xs text-amber-400 font-medium flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" />
                    Only {product.stockCount} units remaining
                  </span>
                ) : (
                  <span className="text-xs text-emerald-400 font-medium">In Stock & Ready for Dispatch</span>
                )}
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-black text-white font-display">
                  {formatPrice(dynamicPrice)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.discountPercentage > 0 && (
                  <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                    Save {product.discountPercentage}%
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Color Choices */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-gray-400">Finish:</span>
                    <span className="text-white font-semibold">{activeColor}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-all ${
                          activeColor === c.name
                            ? 'border-gold-400 scale-110 shadow-[0_0_10px_rgba(201,169,110,0.5)]'
                            : 'border-white/20 hover:border-white/50'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Storage / Hardware Variants */}
              {product.variants && product.variants.length > 0 && (
                <div className="mt-5">
                  <span className="text-xs text-gray-400 block mb-2">Configuration:</span>
                  <div className="grid grid-cols-2 gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v.name)}
                        className={`p-2.5 rounded-xl border text-xs text-left transition-all ${
                          activeVar === v.name
                            ? 'border-gold-400 bg-gold-500/10 text-white font-bold'
                            : 'border-white/[0.08] bg-black/40 text-gray-300 hover:border-white/20'
                        }`}
                      >
                        <p className="line-clamp-1">{v.name}</p>
                        {v.priceDelta > 0 && (
                          <p className="text-[10px] text-gold-400 mt-0.5">
                            +{formatPrice(v.priceDelta)}
                          </p>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-5 border-t border-white/[0.08] space-y-4">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-white/[0.1] rounded-xl bg-black/50 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add To Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-5 rounded-xl bg-gold-400 hover:bg-gold-300 text-black font-extrabold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Vault Cart</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-xl border transition-all ${
                    isFavorited
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                      : 'bg-white/[0.04] text-gray-300 border-white/[0.08] hover:text-white'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                </button>

                {/* Compare */}
                <button
                  onClick={() => toggleCompare(product)}
                  className={`p-3 rounded-xl border transition-all ${
                    isCompared
                      ? 'bg-gold-500 text-black border-gold-500'
                      : 'bg-white/[0.04] text-gray-300 border-white/[0.08] hover:text-white'
                  }`}
                  title="Compare"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* View Full Product Link */}
              <Link
                href={`/product/${product.slug}`}
                onClick={closeQuickView}
                className="flex items-center justify-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 font-semibold transition-colors"
              >
                <span>View Full Specifications & Deep-Dive Gallery</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
