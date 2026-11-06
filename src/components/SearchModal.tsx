'use client';

import React, { useMemo } from 'react';
import { useShop } from '@/context/ShopContext';
import { SAREES_DATA } from '@/data/sarees';
import { Search, X, Sparkles, ArrowRight, Award } from 'lucide-react';

const SUGGESTED_QUERIES = [
  'Bridal Crimson Katan',
  'Emerald Kanjeevaram',
  'Gold Tissue Chanderi',
  'Royal Paithani Peacock',
  'Organza Glass Silk',
  'Double Ikat Patola'
];

export default function SearchModal() {
  const {
    isSearchOpen,
    closeSearch,
    searchQuery,
    setSearchQuery,
    openQuickView,
    formatPrice
  } = useShop();

  const results = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return SAREES_DATA.filter((saree) => {
      return (
        saree.name.toLowerCase().includes(q) ||
        saree.weave.toLowerCase().includes(q) ||
        saree.colorFamily.toLowerCase().includes(q) ||
        saree.colorName.toLowerCase().includes(q) ||
        saree.occasion.toLowerCase().includes(q) ||
        saree.craftOrigin.toLowerCase().includes(q) ||
        saree.description.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={closeSearch}
      />

      <div className="min-h-screen px-4 text-center flex items-start justify-center pt-20 sm:pt-28 pb-10">
        <div className="relative inline-block w-full max-w-2xl bg-[#12151B] border border-[#C59B27]/40 rounded-xl text-left overflow-hidden shadow-2xl z-10 p-6 sm:p-8">
          {/* Close button */}
          <button
            onClick={closeSearch}
            className="absolute top-4 right-4 p-2 text-[#ECE4D8]/60 hover:text-white bg-[#0E1013]/60 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Search Input */}
          <div className="relative mb-6">
            <Search className="w-5 h-5 text-[#C59B27] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by weave, royal color, occasion, or craft origin..."
              className="w-full bg-[#0E1013] border border-[#C59B27]/40 rounded-lg pl-12 pr-10 py-3.5 text-sm text-[#FDF4D4] placeholder-[#ECE4D8]/40 focus:outline-none focus:border-[#C59B27] focus:ring-1 focus:ring-[#C59B27]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#ECE4D8]/40 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Suggested Quick Searches */}
          {!searchQuery.trim() && (
            <div>
              <span className="text-[10px] text-[#C59B27] uppercase tracking-[0.2em] font-semibold block mb-2.5">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2 mb-4">
                {SUGGESTED_QUERIES.map((query) => (
                  <button
                    key={query}
                    onClick={() => setSearchQuery(query)}
                    className="px-3 py-1.5 rounded bg-[#0E1013] hover:bg-[#181C24] text-xs text-[#ECE4D8]/80 hover:text-[#FDF4D4] border border-[#C59B27]/20 transition-colors flex items-center space-x-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-[#C59B27]" />
                    <span>{query}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          {searchQuery.trim() && (
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              <span className="text-[10px] text-[#ECE4D8]/50 uppercase tracking-[0.2em] block mb-2">
                Found {results.length} Handloom Masterpieces
              </span>

              {results.length === 0 ? (
                <div className="text-center py-12 text-xs text-[#ECE4D8]/60 font-light">
                  No matching sarees found for "{searchQuery}". Try searching for "Banarasi", "Kanjeevaram", or "Crimson".
                </div>
              ) : (
                results.map((saree) => (
                  <div
                    key={saree.id}
                    onClick={() => {
                      openQuickView(saree);
                      closeSearch();
                    }}
                    className="p-3 rounded bg-[#0E1013] hover:bg-[#181C24] border border-[#C59B27]/20 hover:border-[#C59B27]/60 transition-all cursor-pointer flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center space-x-3.5">
                      <img
                        src={saree.images.main}
                        alt={saree.name}
                        className="w-12 h-14 object-cover rounded border border-[#C59B27]/30"
                      />
                      <div>
                        <div className="flex items-center space-x-2 text-[10px] text-[#C59B27] uppercase tracking-wider font-semibold">
                          <span>{saree.weave}</span>
                          <span>•</span>
                          <span className="text-[#ECE4D8]/60">{saree.craftOrigin.split(',')[0]}</span>
                        </div>
                        <h4 className="font-serif text-sm text-[#FDF4D4] font-medium">
                          {saree.name}
                        </h4>
                        <span className="text-[11px] text-[#ECE4D8]/60 font-light truncate max-w-xs block">
                          {saree.colorName}
                        </span>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="font-serif text-sm text-[#F6E7B9] font-medium block">
                        {formatPrice(saree.priceINR)}
                      </span>
                      <span className="text-[10px] text-[#C59B27] flex items-center justify-end space-x-1 mt-0.5">
                        <span>Inspect</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
