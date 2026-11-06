'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Saree, CartItem, Currency, ConsultationBooking } from '@/types/saree';

interface CurrencyRate {
  symbol: string;
  rate: number;
  label: string;
}

const CURRENCY_MAP: Record<Currency, CurrencyRate> = {
  INR: { symbol: '₹', rate: 1, label: 'INR (₹)' },
  USD: { symbol: '$', rate: 0.012, label: 'USD ($)' },
  GBP: { symbol: '£', rate: 0.0095, label: 'GBP (£)' },
  EUR: { symbol: '€', rate: 0.011, label: 'EUR (€)' },
  AED: { symbol: 'AED ', rate: 0.044, label: 'AED (د.إ)' },
};

interface ShopContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceINR: number) => string;
  
  // Cart
  cart: CartItem[];
  addToCart: (saree: Saree, includeBlouseStitching?: boolean) => void;
  removeFromCart: (sareeId: string) => void;
  updateQuantity: (sareeId: string, quantity: number) => void;
  toggleBlouseStitching: (sareeId: string) => void;
  cartCount: number;
  cartSubtotalINR: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  
  // Wishlist
  wishlist: Saree[];
  toggleWishlist: (saree: Saree) => void;
  isInWishlist: (sareeId: string) => boolean;
  isWishlistOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;

  // Quick View
  quickViewSaree: Saree | null;
  openQuickView: (saree: Saree) => void;
  closeQuickView: () => void;

  // Consultation
  isConsultationOpen: boolean;
  openConsultation: () => void;
  closeConsultation: () => void;
  consultationSuccess: boolean;
  bookConsultation: (booking: ConsultationBooking) => void;
  resetConsultationSuccess: () => void;

  // Search
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Concierge WhatsApp
  openWhatsAppConcierge: (saree?: Saree) => void;
  checkoutViaWhatsApp: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('INR');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Saree[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewSaree, setQuickViewSaree] = useState<Saree | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationSuccess, setConsultationSuccess] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Persist cart & wishlist in localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('kiran_sarees_cart');
      if (savedCart) setCart(JSON.parse(savedCart));
      const savedWishlist = localStorage.getItem('kiran_sarees_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      const savedCurrency = localStorage.getItem('kiran_sarees_currency') as Currency;
      if (savedCurrency && CURRENCY_MAP[savedCurrency]) setCurrency(savedCurrency);
    } catch {
      // LocalStorage fallback
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('kiran_sarees_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('kiran_sarees_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  const handleSetCurrency = (c: Currency) => {
    setCurrency(c);
    try {
      localStorage.setItem('kiran_sarees_currency', c);
    } catch {}
  };

  const formatPrice = (priceINR: number) => {
    const config = CURRENCY_MAP[currency];
    const converted = Math.round(priceINR * config.rate);
    return `${config.symbol}${converted.toLocaleString('en-IN')}`;
  };

  const addToCart = (saree: Saree, includeBlouseStitching: boolean = false) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.saree.id === saree.id);
      if (existing) {
        return prev.map((item) =>
          item.saree.id === saree.id
            ? { ...item, quantity: item.quantity + 1, includeBlouseStitching: includeBlouseStitching || item.includeBlouseStitching }
            : item
        );
      }
      return [...prev, { saree, quantity: 1, includeBlouseStitching }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (sareeId: string) => {
    setCart((prev) => prev.filter((item) => item.saree.id !== sareeId));
  };

  const updateQuantity = (sareeId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(sareeId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.saree.id === sareeId ? { ...item, quantity } : item
      )
    );
  };

  const toggleBlouseStitching = (sareeId: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.saree.id === sareeId
          ? { ...item, includeBlouseStitching: !item.includeBlouseStitching }
          : item
      )
    );
  };

  const toggleWishlist = (saree: Saree) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === saree.id);
      if (exists) {
        return prev.filter((item) => item.id !== saree.id);
      }
      return [...prev, saree];
    });
  };

  const isInWishlist = (sareeId: string) => {
    return wishlist.some((item) => item.id === sareeId);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotalINR = cart.reduce((total, item) => {
    const blouseFee = item.includeBlouseStitching ? 2800 : 0;
    return total + (item.saree.priceINR + blouseFee) * item.quantity;
  }, 0);

  const bookConsultation = (booking: ConsultationBooking) => {
    // Simulated consultation booking confirmation
    setConsultationSuccess(true);
  };

  const openWhatsAppConcierge = (saree?: Saree) => {
    const phone = '919874561233';
    let text = 'Namaste Kiran Sarees Concierge. I am interested in exploring your luxury handloom collection.';
    if (saree) {
      text = `Namaste Kiran Sarees Concierge. I would like to inquire about "${saree.name}" (${saree.weave}, ${formatPrice(saree.priceINR)}). Please share high-definition draping videos and artisan authenticity details.`;
    }
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const checkoutViaWhatsApp = () => {
    const phone = '919874561233';
    if (cart.length === 0) return;
    const itemsList = cart
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.saree.name} (${item.quantity}x) - ${formatPrice(item.saree.priceINR)}${item.includeBlouseStitching ? ' + Bespoke Blouse Tailoring' : ''}`
      )
      .join('\n');
    const text = `Namaste Kiran Sarees Concierge. I wish to place a priority order for my curated shopping bag:\n\n${itemsList}\n\n*Estimated Bag Total:* ${formatPrice(cartSubtotalINR)}\n\nPlease connect me with an atelier stylist to confirm my measurements, insured delivery address, and payment link.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <ShopContext.Provider
      value={{
        currency,
        setCurrency: handleSetCurrency,
        formatPrice,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleBlouseStitching,
        cartCount,
        cartSubtotalINR,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        openWishlist: () => setIsWishlistOpen(true),
        closeWishlist: () => setIsWishlistOpen(false),
        quickViewSaree,
        openQuickView: (saree) => setQuickViewSaree(saree),
        closeQuickView: () => setQuickViewSaree(null),
        isConsultationOpen,
        openConsultation: () => setIsConsultationOpen(true),
        closeConsultation: () => {
          setIsConsultationOpen(false);
          setConsultationSuccess(false);
        },
        consultationSuccess,
        bookConsultation,
        resetConsultationSuccess: () => setConsultationSuccess(false),
        isSearchOpen,
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        searchQuery,
        setSearchQuery,
        openWhatsAppConcierge,
        checkoutViaWhatsApp,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
