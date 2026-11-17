'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Currency,
  Coupon,
  Order,
  UserProfile,
  ShippingAddress,
} from '@/types/electronics';
import { PRODUCTS, COUPONS } from '@/data/products';

interface CurrencyInfo {
  symbol: string;
  rate: number;
  label: string;
}

const CURRENCY_CONFIG: Record<Currency, CurrencyInfo> = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  INR: { symbol: '₹', rate: 83.5, label: 'INR (₹)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
};

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}

interface ShopContextType {
  // Currency
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceUSD: number) => string;
  convertPrice: (priceUSD: number) => number;
  currencySymbol: string;

  // Cart
  cart: CartItem[];
  addToCart: (
    product: Product,
    quantity?: number,
    selectedColor?: string,
    selectedVariant?: string
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  freeShippingThreshold: number;
  shippingFee: number;
  cartTotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  // Coupons
  coupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  discountAmount: number;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  wishlistCount: number;
  isWishlistOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;

  // Product Comparison
  compareList: Product[];
  toggleCompare: (product: Product) => void;
  isInCompare: (productId: string) => boolean;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isCompareOpen: boolean;
  openCompare: () => void;
  closeCompare: () => void;

  // Quick View
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Search Modal
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  recentSearches: string[];
  addRecentSearch: (term: string) => void;
  clearRecentSearches: () => void;

  // Recently Viewed
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;

  // User Auth & Orders
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, pass?: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, pass?: string) => boolean;
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrderById: (orderIdOrNumber: string) => Order | undefined;
  savedAddresses: ShippingAddress[];
  saveAddress: (address: ShippingAddress) => void;
  deleteAddress: (index: number) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Initial Demo User
const DEFAULT_USER: UserProfile = {
  id: 'usr-8921',
  fullName: 'Marcus Sterling',
  email: 'marcus.sterling@elevaro.com',
  phone: '+1 (555) 382-9012',
  membershipTier: 'Elevaro Elite VIP',
  addresses: [
    {
      fullName: 'Marcus Sterling',
      email: 'marcus.sterling@elevaro.com',
      phone: '+1 (555) 382-9012',
      street: '742 Evergreen Terrace, Suite 800',
      apartment: 'Penthouse A',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94107',
      country: 'United States',
      isDefault: true,
    },
  ],
};

const DEFAULT_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'ELV-89421-2026',
    createdAt: '2026-11-12T10:30:00Z',
    status: 'In Transit',
    items: [
      {
        productId: 'elv-sp-01',
        name: 'Aegis Pro Max 24K Titanium Edition',
        brand: 'Elevaro Masterwork',
        price: 1599,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1200&auto=format&fit=crop',
        selectedColor: 'Champagne Gold',
        selectedVariant: '512GB Storage',
      },
      {
        productId: 'elv-ac-01',
        name: 'Monolith 3-in-1 Wireless MagSafe Pedestal',
        brand: 'Elevaro Atelier',
        price: 199,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1200&auto=format&fit=crop',
      },
    ],
    subtotal: 1798,
    discount: 179.8,
    shippingFee: 0,
    total: 1618.2,
    currency: 'USD',
    shippingAddress: {
      fullName: 'Marcus Sterling',
      email: 'marcus.sterling@elevaro.com',
      phone: '+1 (555) 382-9012',
      street: '742 Evergreen Terrace, Suite 800',
      apartment: 'Penthouse A',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94107',
      country: 'United States',
    },
    paymentMethod: 'stripe',
    paymentStatus: 'Paid',
    trackingNumber: 'FDX-994204812US',
    courierName: 'FedEx Priority White-Glove',
    estimatedDelivery: 'November 19, 2026',
    trackingEvents: [
      {
        title: 'Order Placed & Vault Verified',
        description: 'Order confirmed and reserved in secure air-conditioned vault.',
        date: 'Nov 12, 10:30 AM',
        completed: true,
      },
      {
        title: 'Master Inspection & Quality Seals',
        description: 'Passed 32-point electronics hardware diagnostics and sealed in tamper-proof satin box.',
        date: 'Nov 13, 02:15 PM',
        completed: true,
      },
      {
        title: 'Dispatched via Express Air Courier',
        description: 'Departed Elevaro International Logistics Hub.',
        date: 'Nov 14, 08:45 AM',
        completed: true,
      },
      {
        title: 'In Regional Transit Hub',
        description: 'Sorted at San Francisco West Gateway distribution center.',
        date: 'Nov 16, 04:20 PM',
        completed: true,
      },
      {
        title: 'Out for White-Glove Delivery',
        description: 'Scheduled with personal concierge courier.',
        date: 'Nov 18, 09:00 AM',
        completed: false,
      },
    ],
  },
];

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Currency state
  const [currency, setCurrency] = useState<Currency>('USD');

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [coupon, setCoupon] = useState<Coupon | null>(null);

  // Wishlist state
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Compare state
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Quick view state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Search state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Aegis Titanium',
    'Beryllium Headphones',
    'OLED Gaming Display',
  ]);

  // Recently viewed
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // User state
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_USER);
  const [orders, setOrders] = useState<Order[]>(DEFAULT_ORDERS);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Restore client state from localStorage safely
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('elevaro_cart');
      if (storedCart) setCart(JSON.parse(storedCart));

      const storedWishlist = localStorage.getItem('elevaro_wishlist');
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));

      const storedCompare = localStorage.getItem('elevaro_compare');
      if (storedCompare) setCompareList(JSON.parse(storedCompare));

      const storedCurrency = localStorage.getItem('elevaro_currency');
      if (storedCurrency && ['USD', 'INR', 'EUR', 'GBP'].includes(storedCurrency)) {
        setCurrency(storedCurrency as Currency);
      }

      const storedUser = localStorage.getItem('elevaro_user');
      if (storedUser) setUser(JSON.parse(storedUser));

      const storedOrders = localStorage.getItem('elevaro_orders');
      if (storedOrders) setOrders(JSON.parse(storedOrders));

      const storedRecent = localStorage.getItem('elevaro_recent_searches');
      if (storedRecent) setRecentSearches(JSON.parse(storedRecent));
    } catch {
      // LocalStorage access failback
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('elevaro_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('elevaro_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('elevaro_compare', JSON.stringify(compareList));
    } catch {}
  }, [compareList]);

  useEffect(() => {
    try {
      localStorage.setItem('elevaro_currency', currency);
    } catch {}
  }, [currency]);

  useEffect(() => {
    try {
      if (user) localStorage.setItem('elevaro_user', JSON.stringify(user));
      else localStorage.removeItem('elevaro_user');
    } catch {}
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('elevaro_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  // Toast Helper
  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const newToast: ToastMessage = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Currency Formatter
  const convertPrice = (priceUSD: number): number => {
    const rate = CURRENCY_CONFIG[currency]?.rate || 1.0;
    return Math.round(priceUSD * rate);
  };

  const formatPrice = (priceUSD: number): string => {
    const info = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.USD;
    const converted = convertPrice(priceUSD);
    return `${info.symbol}${converted.toLocaleString('en-US')}`;
  };

  const currencySymbol = CURRENCY_CONFIG[currency]?.symbol || '$';

  // Cart operations
  const addToCart = (
    product: Product,
    quantity = 1,
    selectedColor?: string,
    selectedVariant?: string
  ) => {
    // Find variant delta
    let unitPrice = product.price;
    if (selectedVariant && product.variants) {
      const v = product.variants.find((item) => item.name === selectedVariant);
      if (v) unitPrice += v.priceDelta;
    }

    const itemId = `${product.id}-${selectedColor || 'default'}-${selectedVariant || 'default'}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          quantity,
          selectedColor: selectedColor || (product.colors && product.colors[0]?.name),
          selectedVariant,
          unitPrice,
        },
      ];
    });

    addToast({
      type: 'success',
      title: 'Added to Cart',
      message: `${product.name} (x${quantity}) has been added to your vault cart.`,
    });
  };

  const removeFromCart = (cartItemId: string) => {
    const item = cart.find((i) => i.id === cartItemId);
    setCart((prev) => prev.filter((i) => i.id !== cartItemId));
    if (item) {
      addToast({
        type: 'info',
        title: 'Removed from Cart',
        message: `${item.product.name} has been removed.`,
      });
    }
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  // Free shipping threshold = $500
  const freeShippingThreshold = 500;
  const shippingFee = cartSubtotal === 0 || cartSubtotal >= freeShippingThreshold ? 0 : 35;

  // Coupon handling
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const matched = COUPONS.find((c) => c.code === cleanCode);

    if (!matched) {
      return { success: false, message: 'Invalid or expired promotional code.' };
    }

    if (cartSubtotal < matched.minPurchase) {
      return {
        success: false,
        message: `This code requires a minimum purchase of $${matched.minPurchase}.`,
      };
    }

    setCoupon(matched as Coupon);
    addToast({
      type: 'success',
      title: 'VIP Concession Applied',
      message: matched.description,
    });
    return { success: true, message: 'Coupon applied successfully!' };
  };

  const removeCoupon = () => {
    setCoupon(null);
    addToast({
      type: 'info',
      title: 'Coupon Removed',
      message: 'Promotional code has been detached.',
    });
  };

  let discountAmount = 0;
  if (coupon) {
    if (coupon.discountType === 'percentage') {
      discountAmount = (cartSubtotal * coupon.discountValue) / 100;
    } else {
      discountAmount = coupon.discountValue;
    }
  }

  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  // Wishlist
  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some((p) => p.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
      addToast({
        type: 'info',
        title: 'Removed from Wishlist',
        message: `${product.name} removed from your private wishlist.`,
      });
    } else {
      setWishlist((prev) => [...prev, product]);
      addToast({
        type: 'success',
        title: 'Saved to Wishlist',
        message: `${product.name} added to your private wishlist.`,
      });
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  const wishlistCount = wishlist.length;

  // Compare
  const toggleCompare = (product: Product) => {
    const exists = compareList.some((p) => p.id === product.id);
    if (exists) {
      setCompareList((prev) => prev.filter((p) => p.id !== product.id));
      addToast({
        type: 'info',
        title: 'Comparison Updated',
        message: `${product.name} removed from side-by-side comparison.`,
      });
    } else {
      if (compareList.length >= 4) {
        addToast({
          type: 'error',
          title: 'Comparison Limit Reached',
          message: 'You can compare a maximum of 4 electronics flagships at once.',
        });
        return;
      }
      setCompareList((prev) => [...prev, product]);
      addToast({
        type: 'success',
        title: 'Added to Comparison',
        message: `${product.name} added. Compare up to 4 models.`,
      });
    }
  };

  const isInCompare = (productId: string) => {
    return compareList.some((p) => p.id === productId);
  };

  const removeFromCompare = (productId: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  // Quick View
  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  // Search
  const addRecentSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((t) => t.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, 8);
      try {
        localStorage.setItem('elevaro_recent_searches', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem('elevaro_recent_searches');
    } catch {}
  };

  // Recently Viewed
  const addRecentlyViewed = (product: Product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  };

  // User Auth & Orders
  const login = (email: string, _pass?: string) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email,
      membershipTier: 'Elevaro Elite VIP',
      addresses: DEFAULT_USER.addresses,
    };
    setUser(newUser);
    addToast({
      type: 'success',
      title: 'Welcome Back',
      message: `Signed in as ${newUser.fullName}. Accessing Elevaro Vault.`,
    });
    return true;
  };

  const logout = () => {
    setUser(null);
    addToast({
      type: 'info',
      title: 'Signed Out',
      message: 'You have been securely logged out.',
    });
  };

  const register = (name: string, email: string, _pass?: string) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: name,
      email,
      membershipTier: 'Elevaro Prive',
      addresses: [],
    };
    setUser(newUser);
    addToast({
      type: 'success',
      title: 'Account Created',
      message: `Welcome to Elevaro Electronics, ${name}.`,
    });
    return true;
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    clearCart();
  };

  const getOrderById = (orderIdOrNumber: string) => {
    const clean = orderIdOrNumber.trim().toLowerCase();
    return orders.find(
      (o) =>
        o.id.toLowerCase() === clean ||
        o.orderNumber.toLowerCase() === clean ||
        o.trackingNumber.toLowerCase() === clean
    );
  };

  const saveAddress = (address: ShippingAddress) => {
    if (!user) return;
    const updated = {
      ...user,
      addresses: [...user.addresses, address],
    };
    setUser(updated);
    addToast({
      type: 'success',
      title: 'Address Saved',
      message: 'New delivery destination registered in your profile.',
    });
  };

  const deleteAddress = (index: number) => {
    if (!user) return;
    const updated = {
      ...user,
      addresses: user.addresses.filter((_, i) => i !== index),
    };
    setUser(updated);
  };

  return (
    <ShopContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        convertPrice,
        currencySymbol,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        freeShippingThreshold,
        shippingFee,
        cartTotal,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        coupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        wishlistCount,
        isWishlistOpen,
        openWishlist: () => setIsWishlistOpen(true),
        closeWishlist: () => setIsWishlistOpen(false),
        compareList,
        toggleCompare,
        isInCompare,
        removeFromCompare,
        clearCompare,
        isCompareOpen,
        openCompare: () => setIsCompareOpen(true),
        closeCompare: () => setIsCompareOpen(false),
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isSearchOpen,
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        searchQuery,
        setSearchQuery,
        recentSearches,
        addRecentSearch,
        clearRecentSearches,
        recentlyViewed,
        addRecentlyViewed,
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        orders,
        addOrder,
        getOrderById,
        savedAddresses: user?.addresses || [],
        saveAddress,
        deleteAddress,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
