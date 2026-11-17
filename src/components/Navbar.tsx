'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ElevaroLogo from '@/components/ElevaroLogo';
import { useShop } from '@/context/ShopContext';
import { CATEGORIES } from '@/data/categories';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Layers,
  ChevronDown,
  ArrowRight,
  Shield,
  Sparkles,
  LogOut,
  Package,
  MapPin,
  SlidersHorizontal,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const {
    cartCount,
    wishlistCount,
    compareList,
    openCart,
    openWishlist,
    openSearch,
    user,
    isAuthenticated,
    logout,
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryMegaMenuOpen, setIsCategoryMegaMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCategoryMegaMenuOpen(false);
    setIsUserDropdownOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080808]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl py-3.5'
          : 'bg-[#080808] border-b border-white/[0.05] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <ElevaroLogo size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium">
            <Link
              href="/"
              className={`transition-colors tracking-wide hover:text-gold-400 ${
                pathname === '/' ? 'text-gold-400 font-semibold' : 'text-gray-300'
              }`}
            >
              Home
            </Link>

            <Link
              href="/shop"
              className={`transition-colors tracking-wide hover:text-gold-400 ${
                pathname === '/shop' ? 'text-gold-400 font-semibold' : 'text-gray-300'
              }`}
            >
              Shop All
            </Link>

            {/* Categories Mega Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setIsCategoryMegaMenuOpen(true)}
              onMouseLeave={() => setIsCategoryMegaMenuOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 transition-colors tracking-wide py-2 hover:text-gold-400 ${
                  pathname.startsWith('/category') ? 'text-gold-400 font-semibold' : 'text-gray-300'
                }`}
              >
                <span>Categories</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                    isCategoryMegaMenuOpen ? 'rotate-180 text-gold-400' : ''
                  }`}
                />
              </button>

              {/* Mega Menu Dropdown */}
              {isCategoryMegaMenuOpen && (
                <div className="absolute top-full -left-20 w-[780px] bg-[#0E0E0E]/98 border border-white/[0.12] rounded-2xl shadow-2xl p-6 backdrop-blur-2xl z-50 animate-fadeIn">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                        Curated Hardware Portfolios
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Engineered with aerospace materials, flagship silicon, and acoustic mastery.
                      </p>
                    </div>
                    <Link
                      href="/shop"
                      className="text-xs font-semibold text-gold-400 hover:text-gold-300 flex items-center gap-1"
                    >
                      <span>Explore Catalog</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/category/${cat.id}`}
                        className="group/item p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.06] hover:border-gold-500/30 transition-all flex items-start gap-3"
                      >
                        <div className="w-10 h-10 rounded-lg bg-black/60 border border-white/[0.08] flex items-center justify-center shrink-0 group-hover/item:border-gold-400/50">
                          <Layers className="w-4 h-4 text-gold-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-white group-hover/item:text-gold-300 transition-colors">
                            {cat.name}
                          </p>
                          <p className="text-[11px] text-gray-400 truncate mt-0.5">
                            {cat.itemCount} Flagship Models
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Mega Menu Footer Callout */}
                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1.5 text-gold-400/90 font-medium">
                      <Sparkles className="w-3.5 h-3.5" />
                      Free 2-Day Air Express on orders over $500
                    </span>
                    <Link
                      href="/compare"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Compare Flagship Specifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/shop?sort=newest"
              className="text-gray-300 hover:text-gold-400 transition-colors tracking-wide"
            >
              New Arrivals
            </Link>

            <Link
              href="/shop?badge=BESTSELLER"
              className="text-gray-300 hover:text-gold-400 transition-colors tracking-wide"
            >
              Best Sellers
            </Link>

            <Link
              href="/shop?offers=true"
              className="text-gold-400 hover:text-gold-300 transition-colors tracking-wide flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Offers</span>
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Global Search Trigger */}
            <button
              onClick={openSearch}
              className="p-2.5 rounded-full text-gray-300 hover:text-white hover:bg-white/[0.06] transition-all"
              aria-label="Open search dialog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Compare Bar Icon */}
            <Link
              href="/compare"
              className="relative p-2.5 rounded-full text-gray-300 hover:text-white hover:bg-white/[0.06] transition-all hidden sm:flex"
              aria-label="Product comparison"
              title="Compare Specifications"
            >
              <SlidersHorizontal className="w-5 h-5" />
              {compareList.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-gold-500 text-black font-extrabold text-[10px] flex items-center justify-center shadow-md">
                  {compareList.length}
                </span>
              )}
            </Link>

            {/* Wishlist Trigger */}
            <button
              onClick={openWishlist}
              className="relative p-2.5 rounded-full text-gray-300 hover:text-white hover:bg-white/[0.06] transition-all"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-extrabold text-[10px] flex items-center justify-center shadow-md">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-full text-gray-300 hover:text-white hover:bg-white/[0.06] transition-all"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-gold-400 text-black font-extrabold text-[10px] flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className={`p-2.5 rounded-full transition-all flex items-center justify-center ${
                  isAuthenticated
                    ? 'text-gold-400 bg-gold-500/10 border border-gold-500/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/[0.06]'
                }`}
                aria-label="Account menu"
              >
                <User className="w-5 h-5" />
              </button>

              {isUserDropdownOpen && (
                <div
                  className="absolute right-0 mt-2.5 w-60 bg-[#121212] border border-gold-500/30 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-2xl animate-fadeIn"
                  onMouseLeave={() => setIsUserDropdownOpen(false)}
                >
                  {isAuthenticated && user ? (
                    <>
                      <div className="px-4 py-3 border-b border-white/[0.08]">
                        <p className="text-xs text-gold-400 font-semibold tracking-wider uppercase">
                          {user.membershipTier}
                        </p>
                        <p className="text-sm font-bold text-white truncate mt-0.5">
                          {user.fullName}
                        </p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/account"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-200 hover:bg-white/[0.06] hover:text-gold-300 transition-colors"
                        >
                          <User className="w-4 h-4 text-gray-400" />
                          <span>My Account Overview</span>
                        </Link>

                        <Link
                          href="/account?tab=orders"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-200 hover:bg-white/[0.06] hover:text-gold-300 transition-colors"
                        >
                          <Package className="w-4 h-4 text-gray-400" />
                          <span>Orders & Vault Shipments</span>
                        </Link>

                        <Link
                          href="/track-order"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-200 hover:bg-white/[0.06] hover:text-gold-300 transition-colors"
                        >
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>Live Order Tracking</span>
                        </Link>

                        <Link
                          href="/admin"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs text-gold-400 hover:bg-white/[0.06] transition-colors border-t border-b border-white/[0.06] my-1"
                        >
                          <Shield className="w-4 h-4 text-gold-400" />
                          <span className="font-semibold">Admin Command Center</span>
                        </Link>

                        <button
                          onClick={() => {
                            logout();
                            setIsUserDropdownOpen(false);
                          }}
                          className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-3">
                      <div className="mb-3 px-1">
                        <p className="text-xs font-bold text-white">Elevaro Prive Membership</p>
                        <p className="text-[11px] text-gray-400">
                          Sign in for concierge hardware support and expedited dispatch.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Link
                          href="/login"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="block w-full py-2 px-3 text-center text-xs font-bold text-black bg-gold-400 hover:bg-gold-300 rounded-lg transition-colors"
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/register"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="block w-full py-2 px-3 text-center text-xs font-semibold text-gray-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] rounded-lg transition-colors border border-white/[0.08]"
                        >
                          Create Account
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[108px] bg-black/95 backdrop-blur-2xl z-40 border-t border-white/[0.08] overflow-y-auto px-6 py-6 animate-fadeIn">
          <div className="flex flex-col space-y-6">
            <div className="space-y-3">
              <p className="text-[11px] font-bold tracking-widest text-gold-400 uppercase">
                Explore Hardware
              </p>
              <Link
                href="/"
                className="block text-base font-semibold text-white hover:text-gold-300"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="block text-base font-semibold text-white hover:text-gold-300"
              >
                Shop All Electronics
              </Link>
              <Link
                href="/shop?badge=BESTSELLER"
                className="block text-base font-semibold text-white hover:text-gold-300"
              >
                Best Sellers
              </Link>
              <Link
                href="/shop?sort=newest"
                className="block text-base font-semibold text-white hover:text-gold-300"
              >
                New Arrivals
              </Link>
              <Link
                href="/compare"
                className="block text-base font-semibold text-gold-400 hover:text-gold-300"
              >
                Compare Specifications ({compareList.length})
              </Link>
            </div>

            {/* Categories Mobile Grid */}
            <div className="pt-4 border-t border-white/[0.08]">
              <p className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-3">
                Categories
              </p>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.id}`}
                    className="p-2.5 rounded-lg bg-white/[0.04] text-xs font-medium text-gray-200 hover:text-gold-300 hover:bg-white/[0.08] transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Account Links */}
            <div className="pt-4 border-t border-white/[0.08] space-y-3">
              <Link
                href="/account"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
              >
                <User className="w-4 h-4 text-gold-400" />
                <span>My Account</span>
              </Link>
              <Link
                href="/track-order"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
              >
                <Package className="w-4 h-4 text-gold-400" />
                <span>Track Order</span>
              </Link>
              <Link
                href="/admin"
                className="flex items-center gap-2 text-sm text-gold-400 font-semibold"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
