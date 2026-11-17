import type { Metadata } from 'next';
import './globals.css';
import { ShopProvider } from '@/context/ShopContext';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import WishlistDrawer from '@/components/WishlistDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import SearchModal from '@/components/SearchModal';
import WhatsAppButton from '@/components/WhatsAppButton';
import ToastContainer from '@/components/ToastContainer';

export const metadata: Metadata = {
  title: 'ELEVARO ELECTRONICS | Elevate Your Everyday Technology',
  description: 'International luxury electronics store featuring aerospace titanium smartphones, forged workstations, lossless beryllium acoustics, medium-format cameras, and architectural home audio.',
  keywords: 'Elevaro Electronics, luxury electronics, premium smartphones, titanium laptops, high-fidelity headphones, medium format cameras, smartwatches, luxury tech, Apple alternative',
  openGraph: {
    title: 'ELEVARO ELECTRONICS | Elevate Your Everyday Technology',
    description: 'Discover exceptional technology designed to transform your everyday life. Luxury precision electronics.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#080808] text-[#F5F5F7] min-h-screen antialiased flex flex-col font-sans selection:bg-gold-500/30 selection:text-gold-200">
        <ShopProvider>
          <AnnouncementBar />
          <Navbar />
          <div className="flex-1">
            {children}
          </div>
          <Footer />

          {/* Persistent global drawers & modals */}
          <CartDrawer />
          <WishlistDrawer />
          <QuickViewModal />
          <SearchModal />
          <WhatsAppButton />
          <ToastContainer />
        </ShopProvider>
      </body>
    </html>
  );
}
