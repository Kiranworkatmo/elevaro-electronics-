export type ProductCategory =
  | 'smartphones'
  | 'laptops'
  | 'tablets'
  | 'headphones'
  | 'smartwatches'
  | 'cameras'
  | 'gaming'
  | 'home-electronics'
  | 'accessories';

export type ProductBadge = 'FLAGSHIP' | 'BESTSELLER' | 'NEW ARRIVAL' | 'LIMITED EDITION' | 'EXCLUSIVE';

export type Currency = 'USD' | 'INR' | 'EUR' | 'GBP';

export interface ProductVariant {
  id: string;
  name: string;
  type: 'storage' | 'color' | 'size' | 'edition';
  priceDelta: number;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductReview {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface ProductSpecs {
  processor?: string;
  ram?: string;
  storage?: string;
  display?: string;
  battery?: string;
  connectivity?: string;
  weight?: string;
  dimensions?: string;
  warranty?: string;
  material?: string;
  audioFeatures?: string;
  sensor?: string;
  cameraSetup?: string;
  os?: string;
  [key: string]: string | undefined;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number; // In USD
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  badge?: ProductBadge;
  shortDescription: string;
  fullDescription: string;
  keyFeatures: string[];
  specs: ProductSpecs;
  images: string[];
  colors?: ProductColor[];
  variants?: ProductVariant[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  reviews?: ProductReview[];
}

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  tagline: string;
  description: string;
  itemCount: number;
  image: string;
  featuredProductSlug: string;
}

export interface CartItem {
  id: string; // unique item entry id
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedVariant?: string;
  unitPrice: number;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchase: number;
  description: string;
  expiresAt: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export type OrderStatus = 'Processing' | 'Confirmed' | 'Dispatched' | 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  productId: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image: string;
  selectedColor?: string;
  selectedVariant?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  currency: Currency;
  shippingAddress: ShippingAddress;
  paymentMethod: 'razorpay' | 'stripe' | 'cod';
  paymentStatus: 'Paid' | 'Pending';
  trackingNumber: string;
  courierName: string;
  estimatedDelivery: string;
  trackingEvents: {
    title: string;
    description: string;
    date: string;
    completed: boolean;
  }[];
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  membershipTier: 'Elevaro Standard' | 'Elevaro Prive' | 'Elevaro Elite VIP';
  addresses: ShippingAddress[];
  savedCards?: {
    id: string;
    last4: string;
    brand: string;
    expiry: string;
  }[];
}
