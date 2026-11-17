'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { Order, OrderItem } from '@/types/electronics';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Lock,
  Sparkles,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    cartSubtotal,
    cartTotal,
    discountAmount,
    shippingFee,
    formatPrice,
    currency,
    user,
    addOrder,
    addToast,
  } = useShop();

  // Form State
  const [formData, setFormData] = useState({
    fullName: user?.fullName || 'Marcus Sterling',
    email: user?.email || 'marcus.sterling@elevaro.com',
    phone: user?.phone || '+1 (555) 382-9012',
    street: user?.addresses[0]?.street || '742 Evergreen Terrace, Suite 800',
    apartment: user?.addresses[0]?.apartment || 'Penthouse A',
    city: user?.addresses[0]?.city || 'San Francisco',
    state: user?.addresses[0]?.state || 'CA',
    postalCode: user?.addresses[0]?.postalCode || '94107',
    country: user?.addresses[0]?.country || 'United States',
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'priority'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'stripe' | 'cod'>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4">
        <div className="text-center p-8 bg-[#111111] rounded-3xl border border-white/[0.08] max-w-md w-full">
          <h2 className="text-lg font-bold text-white">Your Cart is Empty</h2>
          <p className="text-xs text-gray-400 mt-2">
            Add items to your vault before checking out.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-block py-2.5 px-6 rounded-xl bg-gold-400 text-black font-bold text-xs uppercase tracking-wider"
          >
            Explore Catalog
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName || !formData.email || !formData.street || !formData.city) {
      setErrorMessage('Please provide all mandatory delivery fields.');
      return;
    }

    setIsProcessing(true);

    // Simulate safe test-mode payment gateway processing
    setTimeout(() => {
      const orderNumber = `ELV-${Math.floor(10000 + Math.random() * 90000)}-${new Date().getFullYear()}`;
      const trackingNumber = `FDX-${Math.floor(100000000 + Math.random() * 900000000)}US`;

      const orderItems: OrderItem[] = cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        brand: item.product.brand,
        price: item.unitPrice,
        quantity: item.quantity,
        image: item.product.images[0],
        selectedColor: item.selectedColor,
        selectedVariant: item.selectedVariant,
      }));

      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber,
        createdAt: new Date().toISOString(),
        status: 'Processing',
        items: orderItems,
        subtotal: cartSubtotal,
        discount: discountAmount,
        shippingFee: shippingFee,
        total: cartTotal,
        currency,
        shippingAddress: {
          ...formData,
        },
        paymentMethod,
        paymentStatus: 'Paid',
        trackingNumber,
        courierName: 'FedEx Priority White-Glove Air',
        estimatedDelivery: 'November 22, 2026',
        trackingEvents: [
          {
            title: 'Order Placed & Vault Verified',
            description: 'Order confirmed and reserved in secure air-conditioned vault.',
            date: 'Today, Just Now',
            completed: true,
          },
          {
            title: 'Diagnostic Quality Seals',
            description: 'Hardware entering 32-point cleanroom inspection.',
            date: 'Tomorrow, Scheduled',
            completed: false,
          },
          {
            title: 'White-Glove Courier Dispatch',
            description: 'Departure via dedicated express air transport.',
            date: 'In 2 Days',
            completed: false,
          },
        ],
      };

      addOrder(newOrder);
      setIsProcessing(false);

      addToast({
        type: 'success',
        title: 'Acquisition Confirmed',
        message: `Order #${orderNumber} registered in secure vault.`,
      });

      router.push(`/checkout/success?orderId=${newOrder.id}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#080808] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sandbox Test Banner */}
        <div className="mb-8 p-3.5 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-between text-xs text-gold-300">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-gold-400 shrink-0" />
            <span>
              <strong>ELEVARO TEST ENVIRONMENT ACTIVE</strong>: Safe sandbox mode simulation. No real money will be charged.
            </span>
          </div>
          <span className="hidden sm:inline font-mono text-[11px] bg-black/40 px-2.5 py-1 rounded border border-gold-500/30">
            TEST_GATEWAY_V2
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight mb-8 pb-4 border-b border-white/[0.08]">
          White-Glove Vault Checkout
        </h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Checkout Form Columns (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Customer Contact */}
            <div className="bg-[#111111] p-6 sm:p-8 rounded-3xl border border-white/[0.08] space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gold-400 text-black font-extrabold text-xs flex items-center justify-center">
                  1
                </span>
                Client Identification
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs text-gray-300 mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-300 mb-1 font-medium">Email for Vault Updates</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs text-gray-300 mb-1 font-medium">Direct Telephone (for Courier Delivery)</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination */}
            <div className="bg-[#111111] p-6 sm:p-8 rounded-3xl border border-white/[0.08] space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gold-400 text-black font-extrabold text-xs flex items-center justify-center">
                  2
                </span>
                Delivery Destination
              </h2>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs text-gray-300 mb-1 font-medium">Street Address</label>
                  <input
                    type="text"
                    name="street"
                    required
                    value={formData.street}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-300 mb-1 font-medium">Apartment, Suite, Penthouse (Optional)</label>
                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-gray-300 mb-1 font-medium">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-300 mb-1 font-medium">State / Region</label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-300 mb-1 font-medium">Postal / ZIP Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-300 mb-1 font-medium">Country / Territory</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                  >
                    <option value="United States">United States</option>
                    <option value="India">India</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Germany">Germany</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Gateway Selector */}
            <div className="bg-[#111111] p-6 sm:p-8 rounded-3xl border border-white/[0.08] space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gold-400 text-black font-extrabold text-xs flex items-center justify-center">
                  3
                </span>
                Payment Architecture & Protocol
              </h2>

              <div className="space-y-3 pt-2">
                {/* Stripe */}
                <label
                  className={`p-4 rounded-2xl border transition-all flex items-start justify-between cursor-pointer ${
                    paymentMethod === 'stripe'
                      ? 'border-gold-400 bg-gold-500/10'
                      : 'border-white/[0.08] bg-black/40 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'stripe'}
                      onChange={() => setPaymentMethod('stripe')}
                      className="mt-1 text-gold-500 focus:ring-gold-500"
                    />
                    <div>
                      <p className="text-xs font-bold text-white flex items-center gap-2">
                        <span>Stripe Global Vault Card Payment</span>
                        <span className="text-[10px] bg-white/[0.1] px-2 py-0.5 rounded text-gray-300">
                          Visa, Mastercard, Amex, Apple Pay
                        </span>
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        Tokenized 256-bit bank encryption. Test card: 4242 •••• •••• 4242
                      </p>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-gold-400 shrink-0" />
                </label>

                {/* Razorpay */}
                <label
                  className={`p-4 rounded-2xl border transition-all flex items-start justify-between cursor-pointer ${
                    paymentMethod === 'razorpay'
                      ? 'border-gold-400 bg-gold-500/10'
                      : 'border-white/[0.08] bg-black/40 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'razorpay'}
                      onChange={() => setPaymentMethod('razorpay')}
                      className="mt-1 text-gold-500 focus:ring-gold-500"
                    />
                    <div>
                      <p className="text-xs font-bold text-white flex items-center gap-2">
                        <span>Razorpay Payment Gateway</span>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">
                          UPI, Net Banking & Indian Cards
                        </span>
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        Instant UPI QR code simulation, Google Pay, PhonePe, and HDFC/ICICI Net Banking.
                      </p>
                    </div>
                  </div>
                  <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
                </label>

                {/* White-Glove Cash on Delivery */}
                <label
                  className={`p-4 rounded-2xl border transition-all flex items-start justify-between cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-gold-400 bg-gold-500/10'
                      : 'border-white/[0.08] bg-black/40 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 text-gold-500 focus:ring-gold-500"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">
                        White-Glove Courier Inspection & Payment
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        Inspect the tamper-evident holographic seal with the personal courier prior to disbursement.
                      </p>
                    </div>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-gray-400 shrink-0" />
                </label>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-xs text-rose-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Order Summary (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#111111] p-6 sm:p-8 rounded-3xl border border-white/[0.08] sticky top-24 space-y-6 shadow-2xl">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/[0.08] pb-4">
                Vault Acquisition Review ({cart.length} Models)
              </h3>

              {/* Itemized preview */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 text-xs">
                    <div className="relative w-12 h-12 rounded-lg bg-[#181818] overflow-hidden shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white truncate">{item.product.name}</p>
                      <p className="text-[11px] text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-white">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing breakdown */}
              <div className="space-y-2.5 pt-4 border-t border-white/[0.08] text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">{formatPrice(cartSubtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-gold-400">
                    <span>VIP Concession</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-400">
                  <span>VIP White-Glove Air Courier</span>
                  <span className={shippingFee === 0 ? 'text-emerald-400 font-semibold' : 'text-white'}>
                    {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}
                  </span>
                </div>

                <div className="pt-3 border-t border-white/[0.08] flex justify-between text-white font-bold text-sm">
                  <span>Total Disbursement</span>
                  <span className="text-xl text-gold-400 font-display font-black">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-xl bg-gold-400 hover:bg-gold-300 disabled:bg-gray-700 text-black font-extrabold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-xl shadow-gold-500/20"
              >
                {isProcessing ? (
                  <span>Securing Vault Authorization...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Authorize Acquisition ({formatPrice(cartTotal)})</span>
                  </>
                )}
              </button>

              <div className="text-[11px] text-gray-400 space-y-1.5 pt-2 text-center">
                <p className="flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                  Direct Manufacturer Serial Numbers Assigned Upon Confirmation
                </p>
                <p>30-Day Doorstep Courier Returns Guaranteed</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
