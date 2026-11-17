'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/electronics';
import { useShop } from '@/context/ShopContext';
import {
  Heart,
  Eye,
  ShoppingBag,
  Star,
  SlidersHorizontal,
  Flame,
  Check,
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export default function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    openQuickView,
  } = useShop();

  const isFavorited = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  // Badge stylings
  let badgeClasses = 'bg-gold-500/20 text-gold-300 border-gold-500/40';
  if (product.badge === 'LIMITED EDITION') {
    badgeClasses = 'bg-purple-500/20 text-purple-300 border-purple-500/40';
  } else if (product.badge === 'FLAGSHIP') {
    badgeClasses = 'bg-amber-500/25 text-amber-300 border-amber-500/40 font-bold';
  } else if (product.badge === 'BESTSELLER') {
    badgeClasses = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
  }

  if (viewMode === 'list') {
    return (
      <div className="group relative bg-[#111111] border border-white/[0.08] hover:border-gold-500/40 rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:shadow-2xl flex flex-col md:flex-row gap-6 items-center">
        {/* Image Thumbnail */}
        <div className="relative w-full md:w-56 h-52 bg-[#171717] rounded-xl overflow-hidden shrink-0">
          <Link href={`/product/${product.slug}`} className="block w-full h-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 224px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.badge && (
              <span className={`text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full border backdrop-blur-md ${badgeClasses}`}>
                {product.badge}
              </span>
            )}
            {product.discountPercentage > 0 && (
              <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Content Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
            <span className="text-gold-400 font-semibold uppercase tracking-wider">{product.brand}</span>
            <span>•</span>
            <span className="capitalize">{product.categoryLabel}</span>
          </div>

          <Link href={`/product/${product.slug}`}>
            <h3 className="text-lg font-bold text-white group-hover:text-gold-300 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Ratings & Low stock */}
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-xs text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-semibold text-white">{product.rating}</span>
              <span className="text-gray-400">({product.reviewCount} reviews)</span>
            </div>

            {product.stockCount <= 8 && (
              <span className="text-[11px] text-amber-400/90 font-medium flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" />
                Only {product.stockCount} in vault
              </span>
            )}
          </div>

          {/* Color previews */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-3">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider">Finishes:</span>
              <div className="flex items-center gap-1">
                {product.colors.map((c) => (
                  <span
                    key={c.name}
                    title={c.name}
                    className="w-3 h-3 rounded-full border border-white/20"
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Price & Action Column */}
        <div className="w-full md:w-52 shrink-0 flex flex-col justify-between items-start md:items-end border-t md:border-t-0 md:border-l border-white/[0.08] pt-4 md:pt-0 md:pl-6">
          <div className="text-left md:text-right">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white font-display tracking-tight">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <p className="text-[11px] text-emerald-400 mt-0.5">Complimentary Insured Delivery</p>
          </div>

          <div className="flex items-center gap-2 mt-4 w-full">
            <button
              onClick={() => addToCart(product, 1)}
              className="flex-1 py-2.5 px-3 rounded-xl bg-gold-400 hover:bg-gold-300 text-black font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-gold-500/10"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className={`p-2.5 rounded-xl border transition-all ${
                isFavorited
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                  : 'bg-white/[0.04] text-gray-300 border-white/[0.08] hover:text-white'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => openQuickView(product)}
              className="p-2.5 rounded-xl bg-white/[0.04] text-gray-300 border border-white/[0.08] hover:text-white transition-all"
              title="Quick Preview"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default Grid View Card
  return (
    <div className="group relative bg-[#121212] border border-white/[0.08] hover:border-gold-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between">
      {/* Product Image Stage */}
      <div className="relative aspect-square w-full bg-[#181818] overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.badge && (
            <span className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full border backdrop-blur-md shadow-md ${badgeClasses}`}>
              {product.badge}
            </span>
          )}
          {product.discountPercentage > 0 && (
            <span className="text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-full bg-rose-600/80 text-white backdrop-blur-md shadow-sm">
              -{product.discountPercentage}%
            </span>
          )}
        </div>

        {/* Floating Quick Action Overlays */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => toggleWishlist(product)}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-lg ${
              isFavorited
                ? 'bg-rose-500 text-white shadow-rose-500/30'
                : 'bg-black/60 text-white hover:bg-gold-500 hover:text-black'
            }`}
            aria-label="Wishlist"
            title="Add to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={() => toggleCompare(product)}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-lg ${
              isCompared
                ? 'bg-gold-500 text-black shadow-gold-500/30'
                : 'bg-black/60 text-white hover:bg-gold-500 hover:text-black'
            }`}
            aria-label="Compare"
            title="Compare Specs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => openQuickView(product)}
            className="w-8 h-8 rounded-full bg-black/60 text-white hover:bg-gold-500 hover:text-black flex items-center justify-center backdrop-blur-md transition-all shadow-lg"
            aria-label="Quick View"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Add Overlay on Hover Bottom */}
        <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hidden sm:block">
          <button
            onClick={() => addToCart(product, 1)}
            className="w-full py-2.5 px-4 rounded-xl bg-gold-400 hover:bg-gold-300 text-black font-extrabold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-xl shadow-gold-500/20"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Product Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1.5">
            <span className="font-semibold text-gold-400 uppercase tracking-wider">{product.brand}</span>
            <span className="capitalize">{product.categoryLabel}</span>
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="text-sm font-bold text-white group-hover:text-gold-300 transition-colors line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-bold text-white text-xs">{product.rating}</span>
            <span className="text-gray-400 text-[11px]">({product.reviewCount})</span>

            {product.stockCount <= 8 && (
              <span className="ml-auto text-[10px] text-amber-400/90 font-medium">
                {product.stockCount} left
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Mobile Add to Cart */}
        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
          <div>
            <span className="text-lg font-extrabold text-white font-display tracking-tight">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="ml-2 text-xs text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Mobile Only Direct Add Button */}
          <button
            onClick={() => addToCart(product, 1)}
            className="sm:hidden p-2 rounded-lg bg-gold-400 text-black font-bold"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
