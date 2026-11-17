'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { PRODUCTS, POPULAR_SEARCH_TERMS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import {
  Search,
  X,
  ArrowRight,
  TrendingUp,
  Clock,
  Trash2,
  Sparkles,
} from 'lucide-react';

export default function SearchModal() {
  const router = useRouter();
  const {
    isSearchOpen,
    closeSearch,
    searchQuery,
    setSearchQuery,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
    formatPrice,
  } = useShop();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const trimmed = searchQuery.trim().toLowerCase();

  // Matched products
  const matchedProducts = trimmed
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.brand.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          p.shortDescription.toLowerCase().includes(trimmed)
      ).slice(0, 6)
    : [];

  // Matched categories
  const matchedCategories = trimmed
    ? CATEGORIES.filter(
        (c) =>
          c.name.toLowerCase().includes(trimmed) ||
          c.tagline.toLowerCase().includes(trimmed)
      )
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trimmed) return;
    addRecentSearch(trimmed);
    closeSearch();
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const handleTermClick = (term: string) => {
    setSearchQuery(term);
    addRecentSearch(term);
    closeSearch();
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-start justify-center pt-20">
      {/* Backdrop */}
      <div
        onClick={closeSearch}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-3xl bg-[#111111] border border-white/[0.12] rounded-3xl shadow-2xl overflow-hidden z-10 animate-fadeIn">
        {/* Search Bar Input */}
        <form onSubmit={handleSearchSubmit} className="p-4 sm:p-6 border-b border-white/[0.08] flex items-center gap-3">
          <Search className="w-6 h-6 text-gold-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search titanium smartphones, OLED laptops, beryllium acoustics..."
            className="w-full bg-transparent text-base sm:text-lg text-white placeholder-gray-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            type="button"
            onClick={closeSearch}
            className="p-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white bg-white/[0.06] rounded-xl px-3"
          >
            ESC
          </button>
        </form>

        {/* Content Area */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {trimmed ? (
            <div>
              {/* Category Quick Chips */}
              {matchedCategories.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                    Matching Categories
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {matchedCategories.map((c) => (
                      <Link
                        key={c.id}
                        href={`/category/${c.id}`}
                        onClick={closeSearch}
                        className="px-3 py-1.5 rounded-lg bg-gold-500/10 border border-gold-500/30 text-xs font-semibold text-gold-300 hover:bg-gold-500/20 transition-all flex items-center gap-1.5"
                      >
                        <span>{c.name}</span>
                        <ArrowRight className="w-3 h-3 text-gold-400" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Product Results */}
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Hardware Matches ({matchedProducts.length})
              </p>

              {matchedProducts.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-sm font-bold text-white">No exact flagship hardware found</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Try searching for Titanium, Beryllium, 4K Laser, or explore our categories below.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {matchedProducts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/product/${p.slug}`}
                      onClick={() => {
                        addRecentSearch(p.name);
                        closeSearch();
                      }}
                      className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.06] hover:border-gold-500/30 transition-all group"
                    >
                      <div className="relative w-14 h-14 rounded-lg bg-[#181818] overflow-hidden shrink-0">
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          sizes="56px"
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-gold-400 uppercase tracking-wider">
                          {p.brand} • {p.categoryLabel}
                        </p>
                        <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-gold-300 transition-colors truncate">
                          {p.name}
                        </h4>
                        <p className="text-xs text-gray-400 truncate mt-0.5">
                          {p.shortDescription}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-white font-display">
                          {formatPrice(p.price)}
                        </p>
                        {p.stockCount <= 8 && (
                          <span className="text-[10px] text-amber-400">
                            {p.stockCount} left
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}

                  <div className="pt-2 text-center">
                    <button
                      onClick={handleSearchSubmit}
                      className="text-xs font-bold text-gold-400 hover:text-gold-300 inline-flex items-center gap-1.5"
                    >
                      <span>View all results for &ldquo;{trimmed}&rdquo;</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      Recent Searches
                    </span>
                    <button
                      onClick={clearRecentSearches}
                      className="text-[11px] text-gray-400 hover:text-rose-400 transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => handleTermClick(term)}
                        className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs text-gray-200 hover:text-white transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Search Suggestions */}
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                  <TrendingUp className="w-3.5 h-3.5 text-gold-400" />
                  Trending Hardware Inquiries
                </span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCH_TERMS.map((term, i) => (
                    <button
                      key={i}
                      onClick={() => handleTermClick(term)}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:border-gold-500/40 text-xs text-gray-300 hover:text-gold-300 transition-all flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-gold-400/70" />
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
