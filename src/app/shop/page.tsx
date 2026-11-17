'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import ProductCard from '@/components/ProductCard';
import { useShop } from '@/context/ShopContext';
import { ProductCategory } from '@/types/electronics';
import {
  Filter,
  SlidersHorizontal,
  Grid,
  List,
  X,
  Star,
  Check,
  ChevronDown,
  RotateCcw,
} from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const { formatPrice } = useShop();

  // URL query defaults
  const initialCategory = searchParams.get('category') || 'all';
  const initialBadge = searchParams.get('badge') || '';
  const initialOffers = searchParams.get('offers') === 'true';
  const initialSort = searchParams.get('sort') || 'featured';

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(5500);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [offersOnly, setOffersOnly] = useState<boolean>(initialOffers);
  const [badgeFilter, setBadgeFilter] = useState<string>(initialBadge);
  const [sortBy, setSortBy] = useState<string>(initialSort);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract unique brands
  const allBrands = useMemo(() => {
    const brands = new Set<string>();
    PRODUCTS.forEach((p) => brands.add(p.brand));
    return Array.from(brands);
  }, []);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrands([]);
    setPriceRange(5500);
    setMinRating(0);
    setInStockOnly(false);
    setOffersOnly(false);
    setBadgeFilter('');
    setSortBy('featured');
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      // Price filter
      if (product.price > priceRange) {
        return false;
      }

      // Rating filter
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      // In stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }

      // Offers filter
      if (offersOnly && product.discountPercentage <= 0) {
        return false;
      }

      // Badge filter
      if (badgeFilter && product.badge !== badgeFilter) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [
    selectedCategory,
    selectedBrands,
    priceRange,
    minRating,
    inStockOnly,
    offersOnly,
    badgeFilter,
    sortBy,
  ]);

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedBrands.length > 0 ||
    priceRange < 5500 ||
    minRating > 0 ||
    inStockOnly ||
    offersOnly ||
    badgeFilter !== '';

  return (
    <div className="min-h-screen bg-[#080808] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-gold-400 font-medium">Shop All Electronics</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
                Electronics Catalog
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Showing {filteredProducts.length} sovereign electronics masterpieces
              </p>
            </div>

            {/* Mobile Filter Toggle Button */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] text-xs font-bold text-white border border-white/[0.1]"
              >
                <Filter className="w-3.5 h-3.5 text-gold-400" />
                <span>Filters {hasActiveFilters && '• Active'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar (Desktop) */}
          <aside className="hidden lg:block space-y-6 bg-[#0E0E0E] p-6 rounded-2xl border border-white/[0.08] h-fit sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <span className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-gold-400" />
                Filter Catalog
              </span>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-gold-400 hover:text-gold-300 transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Hardware Category
              </h3>
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedCategory === 'all'
                      ? 'bg-gold-500/20 text-gold-300 font-bold border border-gold-500/40'
                      : 'text-gray-300 hover:bg-white/[0.04]'
                  }`}
                >
                  <span>All Portfolios</span>
                  <span className="text-gray-400">{PRODUCTS.length}</span>
                </button>
                {CATEGORIES.map((cat) => {
                  const count = PRODUCTS.filter((p) => p.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                        selectedCategory === cat.id
                          ? 'bg-gold-500/20 text-gold-300 font-bold border border-gold-500/40'
                          : 'text-gray-300 hover:bg-white/[0.04]'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-gray-400">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range */}
            <div className="pt-4 border-t border-white/[0.08]">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-gray-400 uppercase tracking-wider">Max Price</span>
                <span className="text-white font-bold">{formatPrice(priceRange)}</span>
              </div>
              <input
                type="range"
                min="100"
                max="5500"
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-gold-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>{formatPrice(100)}</span>
                <span>{formatPrice(5500)}</span>
              </div>
            </div>

            {/* Brands */}
            <div className="pt-4 border-t border-white/[0.08]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Manufacture Atelier
              </h3>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {allBrands.map((brand) => {
                  const isChecked = selectedBrands.includes(brand);
                  return (
                    <label
                      key={brand}
                      className="flex items-center gap-2.5 text-xs text-gray-300 hover:text-white cursor-pointer py-1"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleBrand(brand)}
                        className="rounded border-white/20 bg-black/60 text-gold-500 focus:ring-gold-500 cursor-pointer"
                      />
                      <span>{brand}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Rating Filter */}
            <div className="pt-4 border-t border-white/[0.08]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Customer Rating
              </h3>
              <div className="space-y-1">
                {[4.9, 4.8, 4.5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                    className={`w-full text-left px-2.5 py-1 rounded text-xs flex items-center justify-between transition-colors ${
                      minRating === rating ? 'text-gold-300 font-bold bg-white/[0.04]' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-gray-200">{rating} & higher</span>
                    </div>
                    {minRating === rating && <Check className="w-3 h-3 text-gold-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="pt-4 border-t border-white/[0.08] space-y-2.5">
              <label className="flex items-center justify-between text-xs text-gray-300 cursor-pointer">
                <span>In Stock Only</span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-white/20 bg-black/60 text-gold-500 focus:ring-gold-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between text-xs text-gray-300 cursor-pointer">
                <span>Promotional Concessions</span>
                <input
                  type="checkbox"
                  checked={offersOnly}
                  onChange={(e) => setOffersOnly(e.target.checked)}
                  className="rounded border-white/20 bg-black/60 text-gold-500 focus:ring-gold-500 cursor-pointer"
                />
              </label>
            </div>
          </aside>

          {/* Main Product Showcase (Desktop + Mobile) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top Toolbar: Sorting & View Mode */}
            <div className="bg-[#0E0E0E] p-4 rounded-2xl border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Active Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs text-white">
                    <span className="capitalize">{selectedCategory}</span>
                    <button onClick={() => setSelectedCategory('all')}>
                      <X className="w-3 h-3 text-gray-400 hover:text-white" />
                    </button>
                  </span>
                )}
                {selectedBrands.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs text-white"
                  >
                    <span>{b}</span>
                    <button onClick={() => toggleBrand(b)}>
                      <X className="w-3 h-3 text-gray-400 hover:text-white" />
                    </button>
                  </span>
                ))}
                {badgeFilter && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/40 text-xs text-gold-300">
                    <span>{badgeFilter}</span>
                    <button onClick={() => setBadgeFilter('')}>
                      <X className="w-3 h-3 text-gold-400 hover:text-white" />
                    </button>
                  </span>
                )}
                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-gold-400 hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Sorting & Views */}
              <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-[#161616] border border-white/[0.1] text-xs font-semibold text-white py-2 pl-3 pr-8 rounded-xl focus:outline-none focus:border-gold-500 cursor-pointer"
                  >
                    <option value="featured">Featured First</option>
                    <option value="newest">Newest Releases</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                </div>

                <div className="flex items-center border border-white/[0.1] rounded-xl overflow-hidden bg-[#161616]">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${
                      viewMode === 'grid' ? 'bg-gold-400 text-black' : 'text-gray-400 hover:text-white'
                    }`}
                    aria-label="Grid View"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors ${
                      viewMode === 'list' ? 'bg-gold-400 text-black' : 'text-gray-400 hover:text-white'
                    }`}
                    aria-label="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Display List or Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-[#0E0E0E] rounded-2xl border border-white/[0.08] p-8">
                <h3 className="text-base font-bold text-white">No Matching Electronics Found</h3>
                <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                  Try broadening your price range, clearing brand selections, or reset your filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-6 py-2.5 px-6 rounded-xl bg-gold-400 text-black font-bold text-xs uppercase tracking-wider"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode="grid" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode="list" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Slide-over */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-[#0E0E0E] border-l border-white/[0.1] p-6 overflow-y-auto space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <span className="text-sm font-bold text-white">Filters</span>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Category
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setIsMobileFilterOpen(false);
                    }}
                    className="w-full text-left text-xs py-1 text-gray-300"
                  >
                    All Portfolios
                  </button>
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedCategory(c.id);
                        setIsMobileFilterOpen(false);
                      }}
                      className="w-full text-left text-xs py-1 text-gray-300"
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset */}
              <button
                onClick={() => {
                  handleResetFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-gold-400 text-black font-bold text-xs uppercase"
              >
                Reset & Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080808] flex items-center justify-center text-gold-400">Loading catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
