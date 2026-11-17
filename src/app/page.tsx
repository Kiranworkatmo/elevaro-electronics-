'use client';

import React from 'react';
import Hero from '@/components/home/Hero';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import BestSellers from '@/components/home/BestSellers';
import PromotionalBanner from '@/components/home/PromotionalBanner';
import NewArrivals from '@/components/home/NewArrivals';
import InnovationShowcase from '@/components/home/InnovationShowcase';
import WhyChooseElevaro from '@/components/home/WhyChooseElevaro';
import CustomerReviews from '@/components/home/CustomerReviews';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#080808]">
      {/* Hero Showcase */}
      <Hero />

      {/* 9 Curated Featured Categories */}
      <FeaturedCategories />

      {/* Best Sellers Showcase with category tabs */}
      <BestSellers />

      {/* Promotional Banner with Coupon Code */}
      <PromotionalBanner />

      {/* New Arrivals Showcase */}
      <NewArrivals />

      {/* Interactive Deep-Dive: Titanium, Silicon, Beryllium */}
      <InnovationShowcase />

      {/* Why Choose ELEVARO: 6 Core Pillars */}
      <WhyChooseElevaro />

      {/* Customer Reviews & Testimonials */}
      <CustomerReviews />
    </main>
  );
}
