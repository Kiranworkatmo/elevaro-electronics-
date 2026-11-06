'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BrandHallmarks from '@/components/BrandHallmarks';
import CuratedCollections from '@/components/CuratedCollections';
import ProductCatalog from '@/components/ProductCatalog';
import AtelierStory from '@/components/AtelierStory';
import BridalConciergeSection from '@/components/BridalConciergeSection';
import RealBridesGallery from '@/components/RealBridesGallery';
import BoutiqueLocator from '@/components/BoutiqueLocator';
import Footer from '@/components/Footer';

export default function Home() {
  const [activeWeaveFilter, setActiveWeaveFilter] = useState<string>('All');

  const handleSelectCollection = (weaveName: string) => {
    setActiveWeaveFilter(weaveName);
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#0E1013] text-[#ECE4D8]">
      {/* Top Navigation */}
      <Navbar />

      {/* Haute Couture Hero Showcase */}
      <Hero />

      {/* 4 Sovereign Hallmarks (Silk Mark, Pit-Looms, Salon, Delivery) */}
      <BrandHallmarks />

      {/* Curated Ateliers Editorial Grid */}
      <CuratedCollections onSelectCollection={handleSelectCollection} />

      {/* Main Interactive Product Treasury & Filters */}
      <ProductCatalog initialWeaveFilter={activeWeaveFilter} />

      {/* The Loom of Generations: 4-Stage Atelier Craft Story */}
      <AtelierStory />

      {/* Privé Bridal Concierge Salon Suite */}
      <BridalConciergeSection />

      {/* Real Brides of Kiran Sarees & Press Spotlight */}
      <RealBridesGallery />

      {/* Flagship Boutiques (Mumbai, Delhi, Hyderabad) */}
      <BoutiqueLocator />

      {/* Grand Imperial Footer */}
      <Footer />
    </main>
  );
}
