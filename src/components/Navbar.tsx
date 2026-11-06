'use client';

import React, { useState, useEffect } from 'react';
import { useShop } from '@/context/ShopContext';
import { Currency } from '@/types/saree';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  PhoneCall,
  Sparkles,
  ChevronDown,
  Globe,
  Award
} from 'lucide-react';

const CURRENCIES: Currency[] = ['INR', 'USD', 'GBP', 'EUR', 'AED'];

export default function Navbar() {
  const {
    currency,
    setCurrency,
    cartCount,
    openCart,
    wishlist,
    openWishlist,
    openSearch,
    openConsultation,
    openWhatsAppConcierge
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Royal Announcement Bar */}
      <div className="bg-[#170507] text-[#D5B35B] text-[11px] sm:text-xs font-medium tracking-[0.18em] uppercase py-2 px-4 border-b border-[#C59B27]/20 flex items-center justify-between z-50 relative">
        <div className="hidden lg:flex items-center space-x-2 text-[#ECE4D8]/80">
          <Award className="w-3.5 h-3.5 text-[#C59B27]" />
          <span>Silk Mark Certified Handlooms • Tested Gold Zari</span>
        </div>
        <div className="flex-1 text-center truncate px-2">
          <span className="text-[#F6E7B9] font-serif font-normal italic lowercase tracking-normal text-sm sm:text-base mr-2">privé service:</span>
          <span>Complimentary Insured White-Glove Worldwide Delivery</span>
        </div>
        <div className="hidden sm:flex items-center space-x-4">
          <button
            onClick={() => openWhatsAppConcierge()}
            className="hover:text-[#FDF4D4] transition-colors flex items-center space-x-1"
          >
            <PhoneCall className="w-3 h-3 text-[#C59B27]" />
            <span>Stylist WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Main Luxury Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0E1013]/95 backdrop-blur-md shadow-2xl border-b border-[#C59B27]/25 py-3'
            : 'bg-gradient-to-b from-[#0E1013] via-[#0E1013]/90 to-transparent border-b border-[#C59B27]/15 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left Nav Links - Desktop */}
            <nav className="hidden lg:flex items-center space-x-8 text-xs tracking-[0.2em] uppercase font-medium text-[#ECE4D8]/80">
              <a
                href="#collections"
                className="hover:text-[#C59B27] transition-colors relative py-1 group"
              >
                Collections
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C59B27] transition-all duration-300 group-hover:w-full" />
              </a>
              <a
                href="#catalog"
                className="hover:text-[#C59B27] transition-colors relative py-1 group"
              >
                Heirloom Sarees
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C59B27] transition-all duration-300 group-hover:w-full" />
              </a>
              <a
                href="#atelier"
                className="hover:text-[#C59B27] transition-colors relative py-1 group"
              >
                The Atelier
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C59B27] transition-all duration-300 group-hover:w-full" />
              </a>
              <a
                href="#boutiques"
                className="hover:text-[#C59B27] transition-colors relative py-1 group"
              >
                Boutiques
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C59B27] transition-all duration-300 group-hover:w-full" />
              </a>
            </nav>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[#C59B27] hover:text-[#F6E7B9] transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Center Brand Identity */}
            <a
              href="#"
              className="flex flex-col items-center group text-center focus:outline-none"
            >
              <div className="flex items-center space-x-1.5 mb-0.5">
                <span className="w-4 h-[1px] bg-gradient-to-r from-transparent to-[#C59B27]" />
                <Sparkles className="w-3.5 h-3.5 text-[#C59B27] group-hover:rotate-45 transition-transform duration-500" />
                <span className="w-4 h-[1px] bg-gradient-to-l from-transparent to-[#C59B27]" />
              </div>
              <span className="font-serif text-2xl sm:text-3xl md:text-3xl tracking-[0.28em] font-semibold text-[#FDF4D4] uppercase group-hover:text-[#E7C978] transition-colors">
                Kiran Sarees
              </span>
              <span className="text-[9px] tracking-[0.45em] text-[#C59B27] uppercase font-light mt-0.5">
                Varanasi • Kanchipuram • Est. 1974
              </span>
            </a>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Currency Selector */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                  className="flex items-center space-x-1 text-xs tracking-[0.1em] text-[#ECE4D8]/80 hover:text-[#C59B27] py-1 px-2 rounded border border-[#C59B27]/25 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>{currency}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                {currencyDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-28 bg-[#15181E] border border-[#C59B27]/30 shadow-2xl rounded py-1 z-50">
                    {CURRENCIES.map((curr) => (
                      <button
                        key={curr}
                        onClick={() => {
                          setCurrency(curr);
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs tracking-wider transition-colors ${
                          currency === curr
                            ? 'bg-[#C59B27]/20 text-[#F6E7B9] font-medium'
                            : 'text-[#ECE4D8]/70 hover:bg-[#C59B27]/10 hover:text-[#ECE4D8]'
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Live Search */}
              <button
                onClick={openSearch}
                className="p-2 text-[#ECE4D8]/80 hover:text-[#C59B27] transition-colors"
                title="Search Weaves & Sarees"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <button
                onClick={openWishlist}
                className="p-2 text-[#ECE4D8]/80 hover:text-[#C59B27] transition-colors relative"
                title="View Wishlist"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#801823] text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-[#0E1013]">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Bag */}
              <button
                onClick={openCart}
                className="p-2 text-[#ECE4D8]/80 hover:text-[#C59B27] transition-colors relative"
                title="View Shopping Bag"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#C59B27] text-[#0E1013] text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Bridal Concierge CTA - Desktop */}
              <button
                onClick={openConsultation}
                className="hidden xl:inline-flex items-center space-x-2 bg-gradient-to-r from-[#68131B] to-[#801823] hover:from-[#801823] hover:to-[#9b1b28] text-[#FDF4D4] border border-[#C59B27]/40 px-3.5 py-1.5 rounded text-xs tracking-[0.16em] uppercase transition-all shadow-md hover:shadow-[#C59B27]/20"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>Book Salon</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#121419] border-r border-[#C59B27]/30 shadow-2xl p-6 flex flex-col justify-between z-50">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#C59B27]/20">
                <div className="flex flex-col">
                  <span className="font-serif text-xl tracking-[0.2em] font-semibold text-[#FDF4D4] uppercase">
                    Kiran Sarees
                  </span>
                  <span className="text-[9px] tracking-[0.3em] text-[#C59B27] uppercase">
                    Haute Handlooms
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#ECE4D8]/60 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Links */}
              <nav className="mt-8 flex flex-col space-y-6 text-sm tracking-[0.2em] uppercase font-medium text-[#ECE4D8]/80">
                <a
                  href="#collections"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#C59B27] transition-colors"
                >
                  Collections
                </a>
                <a
                  href="#catalog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#C59B27] transition-colors"
                >
                  Heirloom Sarees
                </a>
                <a
                  href="#atelier"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#C59B27] transition-colors"
                >
                  The Atelier & Craft
                </a>
                <a
                  href="#real-brides"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#C59B27] transition-colors"
                >
                  Real Brides
                </a>
                <a
                  href="#boutiques"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#C59B27] transition-colors"
                >
                  Flagship Boutiques
                </a>
              </nav>

              {/* Mobile Currency Picker */}
              <div className="mt-8 pt-6 border-t border-[#C59B27]/20">
                <span className="text-xs text-[#C59B27] uppercase tracking-[0.2em] block mb-3">
                  Select Currency
                </span>
                <div className="flex flex-wrap gap-2">
                  {CURRENCIES.map((curr) => (
                    <button
                      key={curr}
                      onClick={() => setCurrency(curr)}
                      className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                        currency === curr
                          ? 'border-[#C59B27] bg-[#C59B27]/20 text-[#F6E7B9] font-medium'
                          : 'border-[#C59B27]/20 text-[#ECE4D8]/60 hover:border-[#C59B27]/40'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="pt-6 border-t border-[#C59B27]/20 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openConsultation();
                }}
                className="w-full py-2.5 bg-gradient-to-r from-[#68131B] to-[#801823] text-[#FDF4D4] border border-[#C59B27]/40 rounded text-xs tracking-[0.2em] uppercase font-medium flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-[#C59B27]" />
                <span>Book Bridal Consultation</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWhatsAppConcierge();
                }}
                className="w-full py-2.5 bg-[#0C3027] text-[#ECE4D8] border border-[#134E3F] rounded text-xs tracking-[0.2em] uppercase font-medium flex items-center justify-center space-x-2 hover:bg-[#134E3F] transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#C59B27]" />
                <span>WhatsApp Stylist</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
