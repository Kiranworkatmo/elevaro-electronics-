'use client';

import React, { useState, useMemo } from 'react';
import { SAREES_DATA } from '@/data/sarees';
import { Saree, WeaveType, OccasionType, ColorFamily } from '@/types/saree';
import { useShop } from '@/context/ShopContext';
import {
  Sparkles,
  Heart,
  ShoppingBag,
  Eye,
  Filter,
  Check,
  PhoneCall,
  Clock,
  MapPin,
  Award
} from 'lucide-react';

interface ProductCatalogProps {
  initialWeaveFilter?: string;
}

export default function ProductCatalog({ initialWeaveFilter }: ProductCatalogProps) {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openQuickView,
    openWhatsAppConcierge
  } = useShop();

  const [selectedWeave, setSelectedWeave] = useState<string>(initialWeaveFilter || 'All');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [hoveredSareeId, setHoveredSareeId] = useState<string | null>(null);

  // Sync prop changes
  React.useEffect(() => {
    if (initialWeaveFilter) {
      if (initialWeaveFilter.includes('Banarasi')) setSelectedWeave('Banarasi Katan');
      else if (initialWeaveFilter.includes('Kanjeevaram')) setSelectedWeave('Kanjeevaram');
      else if (initialWeaveFilter.includes('Chanderi') || initialWeaveFilter.includes('Organza')) setSelectedWeave('Chanderi');
      else if (initialWeaveFilter.includes('Paithani') || initialWeaveFilter.includes('Patola')) setSelectedWeave('Paithani');
    }
  }, [initialWeaveFilter]);

  const filteredSarees = useMemo(() => {
    return SAREES_DATA.filter((saree) => {
      const matchWeave = selectedWeave === 'All' || saree.weave === selectedWeave;
      const matchOccasion = selectedOccasion === 'All' || saree.occasion === selectedOccasion;
      const matchColor = selectedColor === 'All' || saree.colorFamily === selectedColor;
      return matchWeave && matchOccasion && matchColor;
    }).sort((a, b) => {
      if (sortBy === 'price-high') return b.priceINR - a.priceINR;
      if (sortBy === 'price-low') return a.priceINR - b.priceINR;
      if (sortBy === 'duration') return b.weavingDays - a.weavingDays;
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    });
  }, [selectedWeave, selectedOccasion, selectedColor, sortBy]);

  const resetFilters = () => {
    setSelectedWeave('All');
    setSelectedOccasion('All');
    setSelectedColor('All');
    setSortBy('featured');
  };

  const WEAVES: (WeaveType | 'All')[] = [
    'All',
    'Banarasi Katan',
    'Kanjeevaram',
    'Chanderi',
    'Paithani',
    'Organza',
    'Patola'
  ];

  const OCCASIONS: (OccasionType | 'All')[] = [
    'All',
    'Bridal Trousseau',
    'Grand Reception',
    'Sangeet & Mehendi',
    'Royal Festive',
    'Red Carpet & Cocktails'
  ];

  const COLORS: (ColorFamily | 'All')[] = [
    'All',
    'Crimson & Sindoor',
    'Emerald & Peacock',
    'Antique Gold & Champagne',
    'Rani Pink & Rose',
    'Midnight Noir & Navy',
    'Ivory & Pearl'
  ];

  return (
    <section id="catalog" className="py-24 bg-[#0A0C0E] relative border-t border-[#C59B27]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-[#C59B27] text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Imperial Treasury</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl tracking-[0.08em] font-normal text-[#FDF4D4] uppercase">
            Heirloom Handloom Sarees
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C59B27] to-transparent mx-auto my-6" />
          <p className="text-sm sm:text-base text-[#ECE4D8]/75 font-light leading-relaxed">
            Every creation is individually registered and tagged with Government Silk Mark certification, guaranteed pure silk warp and tested zari.
          </p>
        </div>

        {/* Primary Filter Tabs - Weave */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-8 space-x-2 sm:space-x-3 no-scrollbar">
          {WEAVES.map((weave) => (
            <button
              key={weave}
              onClick={() => setSelectedWeave(weave)}
              className={`px-4 sm:px-5 py-2 rounded text-xs tracking-[0.16em] uppercase whitespace-nowrap transition-all duration-300 font-medium ${
                selectedWeave === weave
                  ? 'bg-[#C59B27] text-[#0E1013] shadow-lg shadow-[#C59B27]/20'
                  : 'bg-[#15181E] text-[#ECE4D8]/70 hover:text-[#FDF4D4] border border-[#C59B27]/20 hover:border-[#C59B27]/40'
              }`}
            >
              {weave === 'All' ? 'All Handlooms' : weave}
            </button>
          ))}
        </div>

        {/* Secondary Filter Bar & Sorting */}
        <div className="bg-[#121419] p-4 rounded-lg border border-[#C59B27]/25 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Occasion Dropdown */}
            <div className="flex items-center space-x-2 text-xs text-[#ECE4D8]/70">
              <span className="uppercase tracking-wider text-[10px] text-[#C59B27]">Occasion:</span>
              <select
                value={selectedOccasion}
                onChange={(e) => setSelectedOccasion(e.target.value)}
                className="bg-[#181C24] text-[#ECE4D8] border border-[#C59B27]/30 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-[#C59B27]"
              >
                {OCCASIONS.map((occ) => (
                  <option key={occ} value={occ}>
                    {occ === 'All' ? 'All Occasions' : occ}
                  </option>
                ))}
              </select>
            </div>

            {/* Color Palette Dropdown */}
            <div className="flex items-center space-x-2 text-xs text-[#ECE4D8]/70">
              <span className="uppercase tracking-wider text-[10px] text-[#C59B27]">Palette:</span>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="bg-[#181C24] text-[#ECE4D8] border border-[#C59B27]/30 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-[#C59B27]"
              >
                {COLORS.map((col) => (
                  <option key={col} value={col}>
                    {col === 'All' ? 'All Colors' : col}
                  </option>
                ))}
              </select>
            </div>

            {(selectedWeave !== 'All' || selectedOccasion !== 'All' || selectedColor !== 'All') && (
              <button
                onClick={resetFilters}
                className="text-[11px] text-[#C59B27] underline tracking-wider hover:text-white"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center space-x-2 text-xs text-[#ECE4D8]/70 w-full md:w-auto justify-end">
            <span className="uppercase tracking-wider text-[10px] text-[#C59B27]">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#181C24] text-[#ECE4D8] border border-[#C59B27]/30 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-[#C59B27]"
            >
              <option value="featured">Featured Royal Pieces</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
              <option value="duration">Artisan Weaving Days</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 px-1">
          <span className="text-xs tracking-[0.2em] uppercase text-[#ECE4D8]/60 font-light">
            Showing <strong className="text-[#C59B27] font-semibold">{filteredSarees.length}</strong> Masterpieces
          </span>
          <span className="text-xs text-[#C59B27] tracking-wider hidden sm:inline">
            Silk Mark Verified Handlooms
          </span>
        </div>

        {/* Sarees Grid */}
        {filteredSarees.length === 0 ? (
          <div className="text-center py-24 bg-[#121419] rounded-lg border border-[#C59B27]/20">
            <Sparkles className="w-8 h-8 text-[#C59B27] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-2xl text-[#FDF4D4] font-medium mb-2">No Matching Sarees Found</h3>
            <p className="text-xs text-[#ECE4D8]/70 mb-6 max-w-sm mx-auto font-light">
              We couldn't find any saree matching all selected criteria. Please reset filters or connect with our concierge.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[#C59B27] text-[#0E1013] text-xs font-semibold tracking-[0.2em] uppercase rounded"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredSarees.map((saree) => {
              const inWish = isInWishlist(saree.id);
              const isHovered = hoveredSareeId === saree.id;

              return (
                <div
                  key={saree.id}
                  onMouseEnter={() => setHoveredSareeId(saree.id)}
                  onMouseLeave={() => setHoveredSareeId(null)}
                  className="group bg-[#12151B] rounded-lg overflow-hidden border border-[#C59B27]/25 hover:border-[#C59B27]/60 transition-all duration-500 shadow-xl flex flex-col justify-between"
                >
                  {/* Image Display with Hover Image Crossfade */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#0A0C0E]">
                    <img
                      src={isHovered ? saree.images.pallu : saree.images.main}
                      alt={saree.name}
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-all duration-700 filter brightness-95"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12151B] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Floating Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {saree.isHeirloomBridal && (
                        <span className="px-2.5 py-1 bg-[#68131B]/95 text-[#FDF4D4] text-[9px] font-bold tracking-[0.2em] uppercase rounded backdrop-blur-sm border border-[#C59B27]/40 shadow-md">
                          Bridal Heirloom
                        </span>
                      )}
                      <span className="px-2.5 py-1 bg-[#0E1013]/90 text-[#C59B27] text-[9px] font-semibold tracking-[0.16em] uppercase rounded backdrop-blur-sm border border-[#C59B27]/30 flex items-center space-x-1">
                        <Award className="w-2.5 h-2.5" />
                        <span>Silk Mark</span>
                      </span>
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(saree)}
                      className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all ${
                        inWish
                          ? 'bg-[#801823] text-white shadow-lg'
                          : 'bg-[#0E1013]/70 text-[#ECE4D8]/80 hover:text-white hover:bg-[#0E1013]'
                      }`}
                      title={inWish ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      aria-label="Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${inWish ? 'fill-current' : ''}`} />
                    </button>

                    {/* Weaving Days Badge Bottom Left */}
                    <div className="absolute bottom-3 left-3 flex items-center space-x-1 text-[10px] text-[#ECE4D8]/90 bg-[#0E1013]/85 px-2.5 py-1 rounded border border-[#C59B27]/25 backdrop-blur-sm">
                      <Clock className="w-3 h-3 text-[#C59B27]" />
                      <span>{saree.weavingDays} Days Pit-Loom</span>
                    </div>

                    {/* Quick View Button Hover Action */}
                    <button
                      onClick={() => openQuickView(saree)}
                      className="absolute bottom-3 right-3 p-2 bg-[#C59B27] text-[#0E1013] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-xl"
                      title="Quick View Saree Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Origin & Weave */}
                      <div className="flex items-center justify-between text-[11px] text-[#C59B27] tracking-[0.18em] uppercase mb-1.5 font-medium">
                        <span>{saree.weave}</span>
                        <span className="flex items-center space-x-1 text-[#ECE4D8]/60">
                          <MapPin className="w-3 h-3 text-[#C59B27]" />
                          <span className="truncate max-w-[120px]">{saree.craftOrigin.split(',')[0]}</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => openQuickView(saree)}
                        className="font-serif text-xl sm:text-2xl text-[#FDF4D4] font-medium tracking-wide mb-1.5 group-hover:text-[#E7C978] transition-colors cursor-pointer"
                      >
                        {saree.name}
                      </h3>

                      {/* Short Tagline */}
                      <p className="text-xs text-[#ECE4D8]/70 font-light line-clamp-2 mb-4 leading-relaxed">
                        {saree.tagline}
                      </p>
                    </div>

                    {/* Pricing & Actions */}
                    <div className="pt-4 border-t border-[#C59B27]/15">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-[10px] tracking-[0.2em] uppercase text-[#ECE4D8]/50 block">
                            Invest in Craft
                          </span>
                          <span className="font-serif text-2xl text-[#F6E7B9] font-medium">
                            {formatPrice(saree.priceINR)}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#C59B27] tracking-wider uppercase bg-[#C59B27]/10 px-2 py-0.5 rounded border border-[#C59B27]/20">
                          {saree.colorName.split('&')[0]}
                        </span>
                      </div>

                      {/* CTA Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => addToCart(saree)}
                          className="py-2.5 px-3 bg-gradient-to-r from-[#C59B27] to-[#dfbd6e] hover:from-[#dfbd6e] hover:to-[#C59B27] text-[#0E1013] text-xs font-semibold tracking-[0.16em] uppercase rounded flex items-center justify-center space-x-1.5 shadow-md transition-all"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Bag</span>
                        </button>

                        <button
                          onClick={() => openWhatsAppConcierge(saree)}
                          className="py-2.5 px-3 bg-[#170507] hover:bg-[#25080c] text-[#FDF4D4] border border-[#C59B27]/40 text-xs font-medium tracking-[0.14em] uppercase rounded flex items-center justify-center space-x-1.5 transition-colors"
                          title="Ask our stylist on WhatsApp"
                        >
                          <PhoneCall className="w-3.5 h-3.5 text-[#C59B27]" />
                          <span>Stylist</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
