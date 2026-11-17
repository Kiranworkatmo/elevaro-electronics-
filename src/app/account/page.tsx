'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import {
  User,
  Package,
  MapPin,
  Shield,
  LogOut,
  Plus,
  Trash2,
  ExternalLink,
  Sparkles,
  CreditCard,
  ChevronRight,
} from 'lucide-react';
import { ShippingAddress } from '@/types/electronics';

function AccountDashboardContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';

  const {
    user,
    orders,
    savedAddresses,
    saveAddress,
    deleteAddress,
    logout,
    formatPrice,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'addresses' | 'security'>(
    initialTab as any
  );

  // New Address Modal / Form state
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddr, setNewAddr] = useState<ShippingAddress>({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: '',
    street: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
  });

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.city) return;
    saveAddress(newAddr);
    setShowAddressForm(false);
    setNewAddr({
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: '',
      street: '',
      apartment: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'United States',
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4">
        <div className="text-center p-8 bg-[#111111] rounded-3xl border border-white/[0.08] max-w-md w-full">
          <User className="w-12 h-12 text-gold-400 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-white">Client Session Required</h2>
          <p className="text-xs text-gray-400 mt-2">
            Please authenticate to inspect your vault orders and preferences.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block py-2.5 px-6 rounded-xl bg-gold-400 text-black font-bold text-xs uppercase"
          >
            Authenticate
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Greeting Header */}
        <div className="bg-[#111111] border border-white/[0.08] rounded-3xl p-6 sm:p-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1E1E22] to-[#0A0A0A] border border-gold-500/40 flex items-center justify-center text-xl font-black text-gold-400 shadow-xl">
              {user.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gold-400 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-gold-500/15 border border-gold-500/30">
                  {user.membershipTier}
                </span>
                <span className="text-xs text-gray-400">ID: {user.id}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-display mt-1">
                {user.fullName}
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-gold-500/30 text-xs font-bold text-gold-400 transition-colors flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              <span>Admin Portal</span>
            </Link>

            <button
              onClick={logout}
              className="py-2.5 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-xs font-bold text-rose-400 border border-rose-500/30 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Nav (3 cols) */}
          <div className="lg:col-span-3 space-y-2">
            {[
              { id: 'overview', label: 'Vault Overview', icon: User },
              { id: 'orders', label: `My Orders (${orders.length})`, icon: Package },
              { id: 'addresses', label: `Saved Addresses (${savedAddresses.length})`, icon: MapPin },
              { id: 'security', label: 'Security & Privileges', icon: Shield },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left p-3.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
                    activeTab === tab.id
                      ? 'bg-gold-400 text-black shadow-lg shadow-gold-500/15'
                      : 'bg-[#111111] text-gray-300 hover:text-white hover:bg-white/[0.04] border border-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>
              );
            })}
          </div>

          {/* Tab Content Display (9 cols) */}
          <div className="lg:col-span-9">
            {/* 1. Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-[#111111] p-5 rounded-2xl border border-white/[0.08]">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Total Acquisitions
                    </p>
                    <p className="text-2xl font-black text-white font-display mt-1">
                      {orders.length} Orders
                    </p>
                  </div>
                  <div className="bg-[#111111] p-5 rounded-2xl border border-white/[0.08]">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Concierge Care Tier
                    </p>
                    <p className="text-xl font-bold text-gold-400 mt-1">
                      Priority VIP Desk
                    </p>
                  </div>
                  <div className="bg-[#111111] p-5 rounded-2xl border border-white/[0.08]">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Active Vault Shipments
                    </p>
                    <p className="text-2xl font-black text-emerald-400 font-display mt-1">
                      {orders.filter((o) => o.status !== 'Delivered').length} In Transit
                    </p>
                  </div>
                </div>

                {/* Latest Order Card */}
                {orders[0] && (
                  <div className="bg-[#111111] p-6 rounded-2xl border border-white/[0.08]">
                    <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                          Latest Acquisition
                        </span>
                        <h3 className="text-sm font-bold text-white">
                          Order #{orders[0].orderNumber}
                        </h3>
                      </div>
                      <Link
                        href={`/track-order?orderId=${orders[0].orderNumber}`}
                        className="text-xs font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1"
                      >
                        <span>Live Telemetry</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="py-4 space-y-3">
                      {orders[0].items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-xs">
                          <span className="text-gray-300">
                            {item.quantity}x {item.name} ({item.brand})
                          </span>
                          <span className="font-bold text-white">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-gray-400">
                      <span>Status: <strong className="text-gold-400">{orders[0].status}</strong></span>
                      <span>Courier: {orders[0].courierName}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <div className="text-center py-16 bg-[#111111] rounded-2xl border border-white/[0.08]">
                    <p className="text-sm text-gray-400">No past orders registered.</p>
                  </div>
                ) : (
                  orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-[#111111] p-6 rounded-2xl border border-white/[0.08] space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.08]">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">
                              #{ord.orderNumber}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gold-500/20 text-gold-300 border border-gold-500/30">
                              {ord.status}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">
                            Placed on {new Date(ord.createdAt).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="text-base font-black text-white font-display">
                            {formatPrice(ord.total)}
                          </span>
                          <Link
                            href={`/track-order?orderId=${ord.orderNumber}`}
                            className="py-1.5 px-3 rounded-lg bg-gold-400 text-black font-bold text-xs flex items-center gap-1"
                          >
                            <span>Track</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-3">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-10 rounded-lg bg-[#181818] overflow-hidden shrink-0">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  sizes="40px"
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-bold text-white">{item.name}</p>
                                <p className="text-[11px] text-gray-400">{item.brand}</p>
                              </div>
                            </div>
                            <span className="font-medium text-gray-200">
                              Qty: {item.quantity} • {formatPrice(item.price)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* 3. Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    Registered Delivery Destinations
                  </h3>
                  <button
                    onClick={() => setShowAddressForm(!showAddressForm)}
                    className="py-2 px-3 rounded-xl bg-gold-400 text-black font-bold text-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Destination</span>
                  </button>
                </div>

                {/* Add Address Form Modal / Drawer */}
                {showAddressForm && (
                  <form onSubmit={handleAddAddress} className="p-6 rounded-2xl bg-[#141414] border border-gold-500/30 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                      New Shipping Address
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Street Address"
                        required
                        value={newAddr.street}
                        onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                        className="bg-black/60 border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Apartment, Suite (Optional)"
                        value={newAddr.apartment}
                        onChange={(e) => setNewAddr({ ...newAddr, apartment: e.target.value })}
                        className="bg-black/60 border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="City"
                        required
                        value={newAddr.city}
                        onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                        className="bg-black/60 border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        required
                        value={newAddr.state}
                        onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                        className="bg-black/60 border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Postal Code"
                        required
                        value={newAddr.postalCode}
                        onChange={(e) => setNewAddr({ ...newAddr, postalCode: e.target.value })}
                        className="bg-black/60 border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Country"
                        required
                        value={newAddr.country}
                        onChange={(e) => setNewAddr({ ...newAddr, country: e.target.value })}
                        className="bg-black/60 border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="py-2 px-4 rounded-xl bg-gold-400 text-black font-bold text-xs"
                      >
                        Save Address
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddressForm(false)}
                        className="py-2 px-4 rounded-xl bg-white/[0.06] text-white text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedAddresses.map((addr, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#111111] border border-white/[0.08] flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-gold-400">
                            {idx === 0 ? 'Default Destination' : `Address #${idx + 1}`}
                          </span>
                          {savedAddresses.length > 1 && (
                            <button
                              onClick={() => deleteAddress(idx)}
                              className="text-gray-400 hover:text-rose-400"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-white">{addr.fullName}</p>
                        <p className="text-xs text-gray-300 mt-1">{addr.street}</p>
                        {addr.apartment && <p className="text-xs text-gray-400">{addr.apartment}</p>}
                        <p className="text-xs text-gray-400">
                          {addr.city}, {addr.state} {addr.postalCode}
                        </p>
                        <p className="text-xs text-gray-400">{addr.country}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Security Tab */}
            {activeTab === 'security' && (
              <div className="bg-[#111111] p-6 sm:p-8 rounded-2xl border border-white/[0.08] space-y-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-1">
                    Elevaro Vault Security Protocol
                  </h3>
                  <p className="text-xs text-gray-400">
                    Your account is shielded with 256-bit elliptic-curve encryption and multi-factor authorization.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white">Biometric Passkey Authentication</p>
                    <p className="text-gray-400 mt-0.5">Use Apple Touch ID / Windows Hello</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Active
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white">Direct Concierge Hotline</p>
                    <p className="text-gray-400 mt-0.5">Dedicated private line for Elevaro Elite members</p>
                  </div>
                  <span className="text-gold-400 font-mono font-bold">+1 (800) 4-ELEVARO</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080808] flex items-center justify-center text-gold-400">Loading profile...</div>}>
      <AccountDashboardContent />
    </Suspense>
  );
}
