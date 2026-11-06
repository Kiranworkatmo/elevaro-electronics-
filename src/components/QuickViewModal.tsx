'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import {
  X,
  Heart,
  ShoppingBag,
  Award,
  Clock,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Check
} from 'lucide-react';

export default function QuickViewModal() {
  const {
    quickViewSaree,
    closeQuickView,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openWhatsAppConcierge
  } = useShop();

  const [selectedImageKey, setSelectedImageKey] = useState<'main' | 'pallu' | 'detail' | 'drape'>('main');
  const [includeBlouse, setIncludeBlouse] = useState(false);

  if (!quickViewSaree) return null;

  const inWish = isInWishlist(quickViewSaree.id);

  const imagesList: { key: 'main' | 'pallu' | 'detail' | 'drape'; label: string; url: string }[] = [
    { key: 'main', label: 'Front Drape', url: quickViewSaree.images.main },
    { key: 'pallu', label: 'Pallu Zari', url: quickViewSaree.images.pallu },
    { key: 'detail', label: 'Border Detail', url: quickViewSaree.images.detail },
    { key: 'drape', label: 'Model Silhouette', url: quickViewSaree.images.drape },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={closeQuickView}
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center py-10">
        <div className="relative inline-block w-full max-w-4xl bg-[#12151B] border border-[#C59B27]/40 rounded-xl text-left overflow-hidden shadow-2xl transform transition-all z-10 my-8">
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 p-2 text-[#ECE4D8]/60 hover:text-white bg-[#0E1013]/70 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* Left Image Gallery (5 cols) */}
            <div className="md:col-span-6 p-6 sm:p-8 bg-[#0E1013] flex flex-col justify-between">
              {/* Main Active Photo */}
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-[#C59B27]/25 shadow-xl mb-4">
                <img
                  src={quickViewSaree.images[selectedImageKey]}
                  alt={quickViewSaree.name}
                  className="w-full h-full object-cover object-center filter brightness-95"
                />
                
                {/* Silk Mark Badge */}
                <div className="absolute top-3 left-3 bg-[#0E1013]/90 border border-[#C59B27]/40 px-2.5 py-1 rounded text-[9px] text-[#C59B27] font-semibold tracking-wider uppercase backdrop-blur-sm flex items-center space-x-1">
                  <Award className="w-3 h-3" />
                  <span>Silk Mark Certified</span>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="grid grid-cols-4 gap-2">
                {imagesList.map((img) => (
                  <button
                    key={img.key}
                    onClick={() => setSelectedImageKey(img.key)}
                    className={`relative aspect-[3/4] rounded overflow-hidden border transition-all ${
                      selectedImageKey === img.key
                        ? 'border-[#C59B27] ring-1 ring-[#C59B27]'
                        : 'border-[#C59B27]/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Details Column (6 cols) */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Weave & Origin */}
                <div className="flex items-center space-x-2 text-xs text-[#C59B27] tracking-[0.2em] uppercase font-semibold mb-1">
                  <span>{quickViewSaree.weave}</span>
                  <span>•</span>
                  <span className="flex items-center space-x-1 text-[#ECE4D8]/70">
                    <MapPin className="w-3 h-3 text-[#C59B27]" />
                    <span>{quickViewSaree.craftOrigin}</span>
                  </span>
                </div>

                {/* Saree Name */}
                <h2 className="font-serif text-2xl sm:text-3xl text-[#FDF4D4] font-medium tracking-wide mb-2">
                  {quickViewSaree.name}
                </h2>

                <p className="text-xs text-[#C59B27] font-serif italic mb-4">
                  {quickViewSaree.subTitle}
                </p>

                {/* Price Display */}
                <div className="pb-4 mb-4 border-b border-[#C59B27]/15 flex items-baseline space-x-3">
                  <span className="font-serif text-3xl text-[#F6E7B9] font-medium">
                    {formatPrice(quickViewSaree.priceINR)}
                  </span>
                  <span className="text-[11px] text-[#ECE4D8]/60 uppercase tracking-wider">
                    Tax & Worldwide Insured Transit Included
                  </span>
                </div>

                {/* Story Description */}
                <p className="text-xs text-[#ECE4D8]/80 font-light leading-relaxed mb-6">
                  {quickViewSaree.description}
                </p>

                {/* Craftsmanship Specs Table */}
                <div className="space-y-2 mb-6 text-xs bg-[#0E1013] p-4 rounded-lg border border-[#C59B27]/20">
                  <div className="flex justify-between py-1 border-b border-[#C59B27]/10">
                    <span className="text-[#ECE4D8]/60">Fabric Purity:</span>
                    <span className="text-[#FDF4D4] font-medium text-right">{quickViewSaree.fabricPurity}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#C59B27]/10">
                    <span className="text-[#ECE4D8]/60">Zari Composition:</span>
                    <span className="text-[#FDF4D4] font-medium text-right">{quickViewSaree.zariType}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#C59B27]/10">
                    <span className="text-[#ECE4D8]/60">Pit-Loom Time:</span>
                    <span className="text-[#FDF4D4] font-medium text-right">{quickViewSaree.weavingDays} Handcraft Days</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#ECE4D8]/60">Blouse Fabric:</span>
                    <span className="text-[#FDF4D4] font-medium text-right">{quickViewSaree.specs.blousePiece.split(':')[0]}</span>
                  </div>
                </div>

                {/* Blouse Stitching Add-on */}
                <div className="p-3 rounded bg-[#170507] border border-[#C59B27]/30 mb-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeBlouse}
                      onChange={(e) => setIncludeBlouse(e.target.checked)}
                      className="rounded border-[#C59B27]/40 text-[#C59B27] focus:ring-0 bg-[#0E1013]"
                    />
                    <div className="text-xs">
                      <span className="text-[#FDF4D4] font-medium block">Add Bespoke Blouse Tailoring (+{formatPrice(2800)})</span>
                      <span className="text-[10px] text-[#ECE4D8]/70 block font-light">Stylist will collect measurements via WhatsApp call.</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-[#C59B27]/20 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      addToCart(quickViewSaree, includeBlouse);
                      closeQuickView();
                    }}
                    className="py-3 px-4 bg-gradient-to-r from-[#C59B27] to-[#dfbd6e] text-[#0E1013] text-xs font-semibold tracking-[0.2em] uppercase rounded flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add To Bag</span>
                  </button>

                  <button
                    onClick={() => openWhatsAppConcierge(quickViewSaree)}
                    className="py-3 px-4 bg-[#0C3027] hover:bg-[#134E3F] text-[#ECE4D8] border border-[#1B5E4B] text-xs font-semibold tracking-[0.16em] uppercase rounded flex items-center justify-center space-x-2 transition-colors"
                  >
                    <PhoneCall className="w-4 h-4 text-[#C59B27]" />
                    <span>Stylist Inquiry</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-[#ECE4D8]/60 pt-1">
                  <button
                    onClick={() => toggleWishlist(quickViewSaree)}
                    className="flex items-center space-x-1.5 hover:text-[#C59B27] transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${inWish ? 'text-[#801823] fill-current' : ''}`} />
                    <span>{inWish ? 'Saved in Wishlist' : 'Save to Wishlist'}</span>
                  </button>
                  <span className="font-mono text-[10px] text-[#C59B27]">Item #{quickViewSaree.id.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
