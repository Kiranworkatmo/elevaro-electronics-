'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { useShop } from '@/context/ShopContext';
import { Product, OrderStatus } from '@/types/electronics';
import {
  TrendingUp,
  DollarSign,
  Package,
  Users,
  AlertTriangle,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  X,
  Search,
  Filter,
  Shield,
  Layers,
  ArrowUpRight,
  Sparkles,
  Tag,
  RefreshCw,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { orders, formatPrice, addToast } = useShop();

  // Local state for product list management (Add, Edit, Delete, Stock)
  const [productList, setProductList] = useState<Product[]>(PRODUCTS);
  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'products' | 'orders' | 'inventory' | 'coupons'>('overview');

  // Search & Filter state
  const [productSearch, setProductSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // Add Product Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: 'Elevaro Masterwork',
    category: 'smartphones',
    price: 999,
    originalPrice: 1199,
    stockCount: 15,
    shortDescription: '',
    badge: 'NEW ARRIVAL',
    imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1000&auto=format&fit=crop',
  });

  // Orders local copy to allow status toggling
  const [adminOrders, setAdminOrders] = useState(orders);

  // Coupons local copy
  const [couponsList, setCouponsList] = useState([
    { code: 'ELEVARO10', discount: '10% Off', minSpend: '$200', active: true, uses: 142 },
    { code: 'LUXURY50', discount: '$50 Flat Off', minSpend: '$500', active: true, uses: 89 },
    { code: 'WELCOMEVIP', discount: '15% Off', minSpend: '$1000', active: true, uses: 54 },
  ]);

  // Analytics Metrics
  const totalRevenue = adminOrders.reduce((sum, o) => sum + o.total, 0) + 128450;
  const totalOrdersCount = adminOrders.length + 84;
  const avgOrderValue = Math.round(totalRevenue / totalOrdersCount);
  const lowStockItems = productList.filter((p) => p.stockCount <= 8);

  // Product CRUD
  const handleDeleteProduct = (id: string) => {
    setProductList((prev) => prev.filter((p) => p.id !== id));
    addToast({
      type: 'info',
      title: 'Product Removed',
      message: 'Item removed from active retail registry.',
    });
  };

  const handleToggleStock = (id: string) => {
    setProductList((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, inStock: !p.inStock } : p
      )
    );
  };

  const handleRestock = (id: string) => {
    setProductList((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, stockCount: p.stockCount + 20, inStock: true } : p
      )
    );
    addToast({
      type: 'success',
      title: 'Restock Complete',
      message: '+20 units replenished in vault.',
    });
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name.trim()) return;

    const created: Product = {
      id: `elv-custom-${Date.now()}`,
      slug: newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: newProduct.name,
      brand: newProduct.brand,
      category: newProduct.category as any,
      categoryLabel: newProduct.category.toUpperCase(),
      price: Number(newProduct.price),
      originalPrice: Number(newProduct.originalPrice),
      discountPercentage: Math.round(((newProduct.originalPrice - newProduct.price) / newProduct.originalPrice) * 100),
      rating: 5.0,
      reviewCount: 1,
      inStock: true,
      stockCount: Number(newProduct.stockCount),
      badge: newProduct.badge as any,
      shortDescription: newProduct.shortDescription || 'Precision electronic instrument milled from monolithic alloys.',
      fullDescription: 'Sculpted with aerospace tolerances for discerning patrons.',
      keyFeatures: ['Flagship silicon architecture', 'Aerospace chassis', '2-Year Care'],
      specs: {
        processor: 'Quantum-9 Neural Engine',
        warranty: '2-Year Elevaro VIP Care',
      },
      images: [newProduct.imageUrl],
    };

    setProductList((prev) => [created, ...prev]);
    setIsAddModalOpen(false);
    setNewProduct({
      name: '',
      brand: 'Elevaro Masterwork',
      category: 'smartphones',
      price: 999,
      originalPrice: 1199,
      stockCount: 15,
      shortDescription: '',
      badge: 'NEW ARRIVAL',
      imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1000&auto=format&fit=crop',
    });

    addToast({
      type: 'success',
      title: 'Product Cataloged',
      message: `${created.name} published to store.`,
    });
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setAdminOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    addToast({
      type: 'info',
      title: 'Order Status Updated',
      message: `Status updated to ${newStatus}.`,
    });
  };

  return (
    <div className="min-h-screen bg-[#080808] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500/20 to-black border border-gold-500/40 flex items-center justify-center text-gold-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/30">
                  Command Center
                </span>
                <span className="text-xs text-gray-400">v2.4.0 Production</span>
              </div>
              <h1 className="text-2xl font-black text-white font-display">
                Elevaro Electronics Operations
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="py-2.5 px-4 rounded-xl bg-gold-400 hover:bg-gold-300 text-black font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-lg shadow-gold-500/15"
            >
              <Plus className="w-4 h-4" />
              <span>Catalog New Model</span>
            </button>

            <Link
              href="/"
              className="py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-bold text-white transition-colors border border-white/[0.1]"
            >
              View Storefront
            </Link>
          </div>
        </div>

        {/* Admin Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {[
            { id: 'overview', label: 'Executive Analytics', icon: TrendingUp },
            { id: 'products', label: `Hardware Inventory (${productList.length})`, icon: Layers },
            { id: 'orders', label: `Orders Pipeline (${adminOrders.length})`, icon: Package },
            { id: 'inventory', label: `Low Stock Alerts (${lowStockItems.length})`, icon: AlertTriangle },
            { id: 'coupons', label: 'VIP Promotional Concessions', icon: Tag },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeAdminTab === tab.id
                    ? 'bg-gold-400 text-black shadow-lg shadow-gold-500/20'
                    : 'bg-[#121212] text-gray-300 hover:text-white border border-white/[0.08]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: EXECUTIVE ANALYTICS */}
        {activeAdminTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#111111] p-6 rounded-3xl border border-white/[0.08]">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span className="font-bold uppercase tracking-wider">Gross Vault Revenue</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-3xl font-black text-white font-display">
                  {formatPrice(totalRevenue)}
                </p>
                <p className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  +24.8% vs previous month
                </p>
              </div>

              <div className="bg-[#111111] p-6 rounded-3xl border border-white/[0.08]">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span className="font-bold uppercase tracking-wider">Total Dispatches</span>
                  <Package className="w-4 h-4 text-gold-400" />
                </div>
                <p className="text-3xl font-black text-white font-display">
                  {totalOrdersCount} Orders
                </p>
                <p className="text-[11px] text-gray-400 mt-2">99.8% on-time delivery</p>
              </div>

              <div className="bg-[#111111] p-6 rounded-3xl border border-white/[0.08]">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span className="font-bold uppercase tracking-wider">Average Order Value</span>
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
                <p className="text-3xl font-black text-white font-display">
                  {formatPrice(avgOrderValue)}
                </p>
                <p className="text-[11px] text-emerald-400 mt-2 font-semibold">Flagship Tier</p>
              </div>

              <div className="bg-[#111111] p-6 rounded-3xl border border-white/[0.08]">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span className="font-bold uppercase tracking-wider">Elite Patrons</span>
                  <Users className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-3xl font-black text-white font-display">1,480 Active</p>
                <p className="text-[11px] text-gray-400 mt-2">78% repeat acquisition</p>
              </div>
            </div>

            {/* Sales Chart Visualization Card */}
            <div className="bg-[#111111] p-6 sm:p-8 rounded-3xl border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    Vault Dispatches & Revenue Trajectory (2026)
                  </h3>
                  <p className="text-xs text-gray-400">Monthly fiscal performance across categories.</p>
                </div>
                <span className="text-xs text-gold-400 font-bold bg-gold-500/10 px-2.5 py-1 rounded-lg border border-gold-500/30">
                  Global Telemetry
                </span>
              </div>

              {/* Bar graph representation */}
              <div className="h-64 flex items-end justify-between gap-3 pt-8 pb-2 px-2 border-b border-white/[0.08]">
                {[
                  { month: 'Jun', val: 55, rev: '$78K' },
                  { month: 'Jul', val: 68, rev: '$94K' },
                  { month: 'Aug', val: 62, rev: '$86K' },
                  { month: 'Sep', val: 84, rev: '$118K' },
                  { month: 'Oct', val: 92, rev: '$134K' },
                  { month: 'Nov', val: 100, rev: '$152K' },
                ].map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    <span className="text-[10px] font-bold text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.rev}
                    </span>
                    <div
                      className="w-full max-w-[48px] bg-gradient-to-t from-gold-600 to-gold-400 rounded-t-xl transition-all duration-500 group-hover:scale-y-105 shadow-lg shadow-gold-500/15"
                      style={{ height: `${item.val}%` }}
                    />
                    <span className="text-xs font-semibold text-gray-400 group-hover:text-white transition-colors">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCT MANAGEMENT */}
        {activeAdminTab === 'products' && (
          <div className="bg-[#111111] rounded-3xl border border-white/[0.08] overflow-hidden p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Filter by product name, atelier or category..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full bg-black/60 border border-white/[0.1] rounded-xl pl-10 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
                />
              </div>

              <p className="text-xs text-gray-400">
                Displaying {productList.length} active flagships
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/[0.08] text-gray-400 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Hardware Instrument</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Stock Units</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {productList
                    .filter(
                      (p) =>
                        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                        p.brand.toLowerCase().includes(productSearch.toLowerCase()) ||
                        p.category.toLowerCase().includes(productSearch.toLowerCase())
                    )
                    .map((p) => (
                      <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-lg bg-[#181818] overflow-hidden shrink-0">
                              <Image
                                src={p.images[0]}
                                alt={p.name}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-bold text-white line-clamp-1">{p.name}</p>
                              <p className="text-[11px] text-gold-400">{p.brand}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 capitalize text-gray-300">
                          {p.category}
                        </td>

                        <td className="py-3.5 px-4 font-bold text-white font-display">
                          {formatPrice(p.price)}
                        </td>

                        <td className="py-3.5 px-4">
                          <span
                            className={`font-mono font-bold ${
                              p.stockCount <= 5 ? 'text-rose-400' : 'text-gray-200'
                            }`}
                          >
                            {p.stockCount} units
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => handleToggleStock(p.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                              p.inStock
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            }`}
                          >
                            {p.inStock ? 'In Stock' : 'Out of Stock'}
                          </button>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleRestock(p.id)}
                              className="p-1.5 rounded-lg bg-white/[0.04] text-gray-300 hover:text-gold-400 hover:bg-white/[0.08]"
                              title="Replenish Vault (+20 Units)"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="p-1.5 rounded-lg bg-white/[0.04] text-gray-300 hover:text-rose-400 hover:bg-rose-500/10"
                              title="Delete from Catalog"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDER MANAGEMENT PIPELINE */}
        {activeAdminTab === 'orders' && (
          <div className="bg-[#111111] rounded-3xl border border-white/[0.08] p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Dispatched Vault Orders ({adminOrders.length})
              </h3>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-400">Filter Status:</span>
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="bg-black/60 border border-white/[0.1] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="Processing">Processing</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {adminOrders
                .filter((o) => orderStatusFilter === 'all' || o.status === orderStatusFilter)
                .map((order) => (
                  <div
                    key={order.id}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">
                            {order.orderNumber}
                          </span>
                          <span className="text-[10px] font-bold text-gold-400 font-mono">
                            {order.trackingNumber}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Recipient: {order.shippingAddress.fullName} • {order.shippingAddress.city}, {order.shippingAddress.country}
                        </p>
                      </div>

                      {/* Status Switcher Dropdown */}
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-white font-display">
                          {formatPrice(order.total)}
                        </span>
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleUpdateOrderStatus(order.id, e.target.value as OrderStatus)
                          }
                          className="bg-[#181818] border border-white/[0.15] text-gold-300 font-bold text-xs py-1.5 px-3 rounded-xl focus:outline-none focus:border-gold-500 cursor-pointer"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="In Transit">In Transit</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs text-gray-300">
                      {order.items.map((item, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded bg-black/40 border border-white/[0.08]"
                        >
                          {item.quantity}x {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 4: LOW STOCK INVENTORY ALERTS */}
        {activeAdminTab === 'inventory' && (
          <div className="bg-[#111111] rounded-3xl border border-white/[0.08] p-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <AlertTriangle className="w-4 h-4" />
                <h3 className="text-sm font-bold uppercase tracking-wider">
                  Critical Vault Stock Warnings
                </h3>
              </div>
              <p className="text-xs text-gray-400">
                Models currently beneath the minimum vault safety threshold of 8 units.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {lowStockItems.map((p) => (
                <div
                  key={p.id}
                  className="p-5 rounded-2xl bg-amber-500/[0.04] border border-amber-500/30 flex flex-col justify-between"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="relative w-12 h-12 rounded-xl bg-black/60 overflow-hidden shrink-0">
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{p.name}</h4>
                      <p className="text-[11px] text-gold-400">{p.brand}</p>
                      <p className="text-xs font-bold text-rose-400 mt-1">
                        Only {p.stockCount} remaining
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRestock(p.id)}
                    className="w-full py-2 px-3 rounded-xl bg-gold-400 hover:bg-gold-300 text-black font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Replenish +20 Units</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: COUPONS */}
        {activeAdminTab === 'coupons' && (
          <div className="bg-[#111111] rounded-3xl border border-white/[0.08] p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Active Concession Tokens
                </h3>
                <p className="text-xs text-gray-400">Manage promo codes and discount parameters.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {couponsList.map((cpn, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/30">
                      {cpn.code}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      Active
                    </span>
                  </div>

                  <p className="text-base font-extrabold text-white">{cpn.discount}</p>
                  <p className="text-xs text-gray-400">Min. Spend: {cpn.minSpend}</p>
                  <p className="text-[11px] text-gray-500">Redeemed {cpn.uses} times</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADD PRODUCT MODAL */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
            <div
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />
            <div className="relative w-full max-w-lg bg-[#141414] border border-white/[0.1] rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Catalog New Electronic Instrument
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-300 mb-1 font-semibold">Instrument Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aegis Phantom 16 Titanium Workstation"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-3 py-2.5 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 mb-1 font-semibold">Atelier Brand</label>
                    <input
                      type="text"
                      required
                      value={newProduct.brand}
                      onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                      className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-3 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-1 font-semibold">Portfolio Category</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-3 py-2.5 text-white"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-gray-300 mb-1 font-semibold">Price ($)</label>
                    <input
                      type="number"
                      required
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                      className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-3 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-1 font-semibold">Original ($)</label>
                    <input
                      type="number"
                      required
                      value={newProduct.originalPrice}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, originalPrice: Number(e.target.value) })
                      }
                      className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-3 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-1 font-semibold">Initial Vault Qty</label>
                    <input
                      type="number"
                      required
                      value={newProduct.stockCount}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, stockCount: Number(e.target.value) })
                      }
                      className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-3 py-2.5 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-1 font-semibold">Unsplash Studio Image URL</label>
                  <input
                    type="url"
                    required
                    value={newProduct.imageUrl}
                    onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                    className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-3 py-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1 font-semibold">Brief Summary</label>
                  <textarea
                    rows={2}
                    value={newProduct.shortDescription}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, shortDescription: e.target.value })
                    }
                    placeholder="Short description of titanium architecture or acoustic specs..."
                    className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-3 py-2.5 text-white"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-xl bg-gold-400 hover:bg-gold-300 text-black font-extrabold text-xs uppercase"
                  >
                    Confirm & Publish
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="py-3 px-4 rounded-xl bg-white/[0.06] text-white text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
