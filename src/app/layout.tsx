import type { Metadata } from 'next';
import './globals.css';
import { ShopProvider } from '@/context/ShopContext';
import CartDrawer from '@/components/CartDrawer';
import WishlistDrawer from '@/components/WishlistDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import ConsultationModal from '@/components/ConsultationModal';
import SearchModal from '@/components/SearchModal';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export const metadata: Metadata = {
  title: 'Kiran Sarees | Sovereign Indian Handlooms & Bridal Heirlooms',
  description: 'Purveyors of master-woven Banarasi Katan, Kanjeevaram Temple Silks, Royal Paithani, and Chanderi. Certified Silk Mark India with tested 24-karat gold zari.',
  keywords: 'Kiran Sarees, luxury sarees, pure silk sarees, Banarasi Katan silk, bridal Kanjeevaram, Silk Mark certified, handloom sarees, Indian bridal trousseau, high-end sarees',
  openGraph: {
    title: 'Kiran Sarees | Sovereign Indian Handlooms & Bridal Heirlooms',
    description: 'Heirlooms woven in pure gold zari and mulberry silk. Handcrafted by master generational artisans.',
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
      <body className="bg-[#0E1013] text-[#ECE4D8] selection:bg-[#C59B27]/30 selection:text-[#FFF4D2] min-h-screen antialiased flex flex-col">
        <ShopProvider>
          {children}
          <CartDrawer />
          <WishlistDrawer />
          <QuickViewModal />
          <ConsultationModal />
          <SearchModal />
          <FloatingWhatsApp />
        </ShopProvider>
      </body>
    </html>
  );
}
