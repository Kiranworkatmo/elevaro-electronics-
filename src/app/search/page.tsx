'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PRODUCTS, POPULAR_SEARCH_TERMS } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Search, Sparkles, ArrowRight, SlidersHorizontal } from 'lucide-react';

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const [inputVal, setInputVal] = useState(queryParam);

  const matchedProducts = useMemo(() => {
    const clean = queryParam.trim().toLowerCase();
    if (!clean) return [];

    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(clean) ||
        p.brand.toLowerCase().includes(clean) ||
        p.category.toLowerCase().includes(clean) ||
        p.shortDescription.toLowerCase().includes(clean) ||
        p.fullDescription.toLowerCase().includes(clean) ||
        Object.values(p.specs).some((v) => v && v.toLowerCase().includes(clean))
    );
  }, [queryParam]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    router.push(`/search?q=${encodeURIComponent(inputVal.trim())}`);
  };

  const handleTermClick = (term: string) => {
    setInputVal(term);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <div className="min-h-screen bg-[#080808] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header Banner */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">
            Hardware Intelligence
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight mt-2">
            Search Elevaro Inventory
          </h1>

          {/* Search Form Input */}
          <form onSubmit={handleSearchSubmit} className="mt-6 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Search titanium, OLED, beryllium audio, medium format..."
                className="w-full bg-[#121212] border border-white/[0.1] focus:border-gold-500 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none shadow-xl"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 rounded-2xl bg-gold-400 hover:bg-gold-300 text-black font-extrabold text-xs uppercase tracking-wider transition-colors shadow-xl"
            >
              Search
            </button>
          </form>

          {/* Popular Suggestions */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-gray-500">Popular:</span>
            {POPULAR_SEARCH_TERMS.slice(0, 5).map((term) => (
              <button
                key={term}
                onClick={() => handleTermClick(term)}
                className="text-xs text-gray-400 hover:text-gold-300 transition-colors underline underline-offset-2"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        {queryParam ? (
          <div>
            <div className="flex items-center justify-between pb-4 mb-8 border-b border-white/[0.08]">
              <p className="text-sm text-gray-300">
                Found <span className="font-bold text-white">{matchedProducts.length}</span> electronics models for &ldquo;<span className="text-gold-400 font-semibold">{queryParam}</span>&rdquo;
              </p>
            </div>

            {matchedProducts.length === 0 ? (
              <div className="text-center py-20 bg-[#121212] rounded-3xl border border-white/[0.08] p-8 max-w-2xl mx-auto">
                <h3 className="text-lg font-bold text-white">No Results for &ldquo;{queryParam}&rdquo;</h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  We could not find an exact match in our current vault. Try searching by category, brand, or explore our top-rated flagships below.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-2">
                  {POPULAR_SEARCH_TERMS.map((t) => (
                    <button
                      key={t}
                      onClick={() => handleTermClick(t)}
                      className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-gray-300 hover:text-gold-300 transition-colors"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {matchedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 text-sm">
            Enter a keyword above to scan our global electronics database.
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080808] flex items-center justify-center text-gold-400">Loading search...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
