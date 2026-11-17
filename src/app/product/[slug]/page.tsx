'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { useShop } from '@/context/ShopContext';
import {
  Star,
  ShoppingBag,
  Heart,
  SlidersHorizontal,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  Check,
  Share2,
  Flame,
  Zap,
  Cpu,
  Info,
  ChevronRight,
  MessageSquare,
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const product = PRODUCTS.find((p) => p.slug === slug);

  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    addToast,
    addRecentlyViewed,
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'description' | 'reviews' | 'shipping'>('specs');

  // Review submission state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState(product?.reviews || []);

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0].name);
      }
      if (product.variants && product.variants.length > 0) {
        setSelectedVariant(product.variants[0].name);
      }
      setReviewsList(product.reviews || []);
    }
  }, [product]);

  if (!product) {
    return notFound();
  }

  const isFavorited = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  // Variant price adjustment
  let currentPrice = product.price;
  if (selectedVariant && product.variants) {
    const v = product.variants.find((item) => item.name === selectedVariant);
    if (v) currentPrice += v.priceDelta;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedVariant);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedVariant);
    router.push('/checkout');
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      addToast({
        type: 'info',
        title: 'Link Copied',
        message: 'Product link copied to clipboard.',
      });
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      userName: newReviewAuthor,
      rating: newReviewRating,
      date: 'Just now',
      title: newReviewTitle || 'Exceptional craftsmanship',
      comment: newReviewComment,
      verifiedPurchase: true,
      helpfulCount: 0,
    };

    setReviewsList((prev) => [newRev, ...prev]);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
    addToast({
      type: 'success',
      title: 'Review Submitted',
      message: 'Thank you for your valuable feedback on this instrument.',
    });
  };

  // Related products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#080808] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8 overflow-x-auto whitespace-nowrap pb-1">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
          <Link href="/shop" className="hover:text-white transition-colors">
            Electronics
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
          <Link
            href={`/category/${product.category}`}
            className="hover:text-white transition-colors capitalize"
          >
            {product.categoryLabel}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-gold-400 font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Top Product Hero Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-20">
          {/* Gallery Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary High-Res Viewport */}
            <div className="relative aspect-square sm:aspect-[4/3] w-full rounded-3xl overflow-hidden bg-[#121212] border border-white/[0.08] shadow-2xl">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-all duration-500 hover:scale-105 cursor-crosshair"
              />

              {/* Badge */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.badge && (
                  <span className="text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/40 backdrop-blur-md">
                    {product.badge}
                  </span>
                )}
                {product.discountPercentage > 0 && (
                  <span className="text-xs font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 backdrop-blur-md">
                    Save {product.discountPercentage}%
                  </span>
                )}
              </div>

              {/* Share & Compare Overlay */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-full bg-black/60 text-gray-300 hover:text-white backdrop-blur-md transition-colors border border-white/10"
                  title="Share Hardware Specifications"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Thumbnail Navigation Strip */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-gold-400 scale-95 shadow-xl'
                        : 'border-white/[0.08] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Action Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                <span className="font-extrabold text-gold-400 uppercase tracking-widest">
                  {product.brand}
                </span>
                <span className="text-gray-400">SKU: {product.id.toUpperCase()}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white font-display leading-tight">
                {product.name}
              </h1>

              {/* Rating & Stock */}
              <div className="flex items-center gap-4 mt-3 pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-1 text-xs text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-white text-sm">{product.rating}</span>
                  <span className="text-gray-400 text-xs">
                    ({reviewsList.length} verified reviews)
                  </span>
                </div>

                {product.stockCount <= 8 ? (
                  <span className="text-xs text-amber-400 font-medium flex items-center gap-1.5 ml-auto">
                    <Flame className="w-4 h-4" />
                    Only {product.stockCount} units remaining
                  </span>
                ) : (
                  <span className="text-xs text-emerald-400 font-medium flex items-center gap-1 ml-auto">
                    <Check className="w-4 h-4" />
                    In Vault Stock
                  </span>
                )}
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-[#121212] p-5 rounded-2xl border border-white/[0.08] flex items-baseline justify-between">
              <div>
                <span className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
                  {formatPrice(currentPrice)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="ml-3 text-sm text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" />
                White-Glove Included
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="text-gray-400 font-medium uppercase tracking-wider">
                    Select Finish:
                  </span>
                  <span className="text-white font-bold">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all text-xs ${
                        selectedColor === c.name
                          ? 'border-gold-400 bg-gold-500/10 text-white font-bold'
                          : 'border-white/[0.1] bg-black/40 text-gray-400 hover:border-white/30'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Hardware Variants */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider block mb-2.5">
                  Internal Configuration:
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v.name)}
                      className={`p-3 rounded-xl border text-xs text-left transition-all ${
                        selectedVariant === v.name
                          ? 'border-gold-400 bg-gold-500/15 text-white font-bold shadow-lg shadow-gold-500/10'
                          : 'border-white/[0.08] bg-[#121212] text-gray-300 hover:border-white/20'
                      }`}
                    >
                      <p className="font-semibold">{v.name}</p>
                      {v.priceDelta > 0 && (
                        <p className="text-[11px] text-gold-400 mt-0.5">
                          +{formatPrice(v.priceDelta)}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & CTA Buttons */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-white/[0.1] rounded-xl bg-black/60 p-1.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 text-gray-400 hover:text-white transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-xs font-bold text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 text-gray-400 hover:text-white transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-gold-400 hover:bg-gold-300 text-black font-extrabold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-xl shadow-gold-500/20"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Vault Cart</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isFavorited
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                      : 'bg-white/[0.04] text-gray-300 border-white/[0.08] hover:text-white'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                </button>

                {/* Compare */}
                <button
                  onClick={() => toggleCompare(product)}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isCompared
                      ? 'bg-gold-500 text-black border-gold-500'
                      : 'bg-white/[0.04] text-gray-300 border-white/[0.08] hover:text-white'
                  }`}
                  title="Compare"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-extrabold text-xs tracking-wider uppercase transition-all border border-white/[0.12] flex items-center justify-center gap-2"
              >
                <span>Direct VIP Checkout</span>
              </button>
            </div>

            {/* Concierge Guarantees */}
            <div className="pt-4 border-t border-white/[0.08] grid grid-cols-2 gap-3 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Complimentary Air Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
                <span>2-Year International Care</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-gold-400 shrink-0" />
                <span>30-Day Hassle-Free Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-gold-400 shrink-0" />
                <span>100% Genuine Provenance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Deep Dive Tabs: Specs, Overview, Reviews, Delivery */}
        <div className="mt-16 bg-[#0E0E0E] rounded-3xl border border-white/[0.08] p-6 sm:p-10 shadow-2xl">
          <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                activeTab === 'specs'
                  ? 'bg-gold-400 text-black shadow-lg shadow-gold-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab('description')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                activeTab === 'description'
                  ? 'bg-gold-400 text-black shadow-lg shadow-gold-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Description & Craftsmanship
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'bg-gold-400 text-black shadow-lg shadow-gold-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Customer Reviews ({reviewsList.length})
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                activeTab === 'shipping'
                  ? 'bg-gold-400 text-black shadow-lg shadow-gold-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              White-Glove Shipping & Warranty
            </button>
          </div>

          <div className="py-8">
            {/* 1. Tech Specs Tab */}
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specs).map(([key, val]) => {
                  if (!val) return null;
                  const label = key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, (str) => str.toUpperCase());
                  return (
                    <div
                      key={key}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs"
                    >
                      <span className="font-semibold text-gray-400">{label}</span>
                      <span className="font-bold text-white text-right max-w-xs">{val}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 2. Description Tab */}
            {activeTab === 'description' && (
              <div className="space-y-6 max-w-3xl">
                <p className="text-sm text-gray-300 leading-relaxed">
                  {product.fullDescription}
                </p>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-3">
                    Architectural Key Features
                  </h3>
                  <ul className="space-y-2.5">
                    {product.keyFeatures.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <Check className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* 3. Customer Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* Submit New Review Form */}
                <div className="bg-[#141414] p-6 rounded-2xl border border-white/[0.08]">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-1">
                    Submit Verified Review
                  </h3>
                  <p className="text-xs text-gray-400 mb-4">
                    Share your experience with this electronic instrument.
                  </p>

                  <form onSubmit={handleAddReview} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-300 mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          placeholder="e.g. Lord Alistair Vance"
                          className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-gray-300 mb-1">Star Rating</label>
                        <select
                          value={newReviewRating}
                          onChange={(e) => setNewReviewRating(Number(e.target.value))}
                          className="w-full bg-[#181818] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                        >
                          <option value="5">★★★★★ (5 Stars - Exceptional)</option>
                          <option value="4">★★★★☆ (4 Stars - Great)</option>
                          <option value="3">★★★☆☆ (3 Stars - Satisfactory)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">Review Headline</label>
                      <input
                        type="text"
                        value={newReviewTitle}
                        onChange={(e) => setNewReviewTitle(e.target.value)}
                        placeholder="e.g. Unrivaled acoustic speed and build quality"
                        className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">Your Detailed Experience</label>
                      <textarea
                        required
                        rows={3}
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        placeholder="Describe tactile materials, display response, acoustic clarity, or daily utility..."
                        className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="py-2.5 px-6 rounded-xl bg-gold-400 text-black font-extrabold text-xs uppercase tracking-wider hover:bg-gold-300 transition-colors"
                    >
                      Publish Review
                    </button>
                  </form>
                </div>

                {/* Existing Reviews */}
                <div className="space-y-4">
                  {reviewsList.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-xs">{rev.userName}</span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                              Verified Patron
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-gray-500">{rev.date}</span>
                      </div>

                      <div className="flex items-center text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>

                      <h4 className="text-xs font-bold text-white">{rev.title}</h4>
                      <p className="text-xs text-gray-300 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Shipping & Warranty Tab */}
            {activeTab === 'shipping' && (
              <div className="space-y-6 max-w-3xl text-xs text-gray-300 leading-relaxed">
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                    White-Glove Insured Delivery
                  </h4>
                  <p>
                    All Elevaro pieces undergo temperature and moisture monitored transit. Each parcel is packed in our proprietary anti-static satin cushioning and dispatched via dedicated express air courier. Deliveries require a direct signature upon receipt.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                    2-Year Elevaro VIP Hardware Warranty
                  </h4>
                  <p>
                    Includes full coverage for manufacturing defects, hardware failure, and battery degradation below 80%. If any issue occurs, our concierge desk issues a pre-paid return slip and dispatches a fresh replacement unit within 24 hours.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                    30-Day Hassle-Free Returns
                  </h4>
                  <p>
                    If this instrument does not meet your personal aesthetic or performance expectations, request a complimentary doorstep pickup within 30 days of receipt.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between pb-4 mb-8 border-b border-white/[0.08]">
              <div>
                <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">
                  Complementary Instruments
                </span>
                <h3 className="text-2xl font-black text-white font-display mt-1">
                  Related in {product.categoryLabel}
                </h3>
              </div>
              <Link
                href={`/category/${product.category}`}
                className="text-xs font-bold text-gold-400 hover:text-gold-300 uppercase tracking-wider"
              >
                View Category
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
