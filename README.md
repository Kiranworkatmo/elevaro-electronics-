# ELEVARO ELECTRONICS – Premium E-Commerce Website

> **"Elevate Your Everyday Technology."**

ELEVARO ELECTRONICS is a complete, production-quality, luxury-style electronics e-commerce platform combining the minimalist industrial design of Apple, the seamless shopping architecture of Amazon, and the refined elegance of international luxury retail.

---

## 🌟 Brand Identity

- **Brand Name**: ELEVARO ELECTRONICS
- **Tagline**: *"Elevate Your Everyday Technology."*
- **Brand Positioning**: Sovereign Luxury Electronics & Technology Store
- **Design Philosophy**: Monolithic titanium geometries, deep space blacks (`#080808`, `#171717`), champagne gold accents (`#C9A96E`), ultra-crisp typography (Plus Jakarta Sans & Outfit), and generous architectural whitespace.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router, Server & Client Components)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4 with custom gold gradients, glowing glass surfaces & dark mode
- **Motion & Micro-interactions**: Framer Motion & CSS keyframe animations
- **Icons**: Lucide React
- **Media Optimization**: Next.js Image Optimization with studio-grade high-resolution Unsplash photography
- **State Architecture**: React Context API (`ShopContext`) with persistent LocalStorage synchronization:
  - Real-time Cart with Quantity Steppers, Coupon Codes, and Free Shipping Threshold meter
  - Wishlist system with badge counter
  - 4-Way Hardware Comparison Matrix
  - Smart global autocomplete search
  - User Authentication, Addresses, and Orders pipeline
  - Currency Conversion (USD `$`, INR `₹`, EUR `€`, GBP `£`)
  - Rich Animated Toast Notifications
- **Database Architecture**: PostgreSQL ready with comprehensive Prisma ORM schema (`prisma/schema.prisma`)
- **Payment Architecture**: Dual-gateway test mode architecture (Razorpay for Indian customers, Stripe for international cards, and White-Glove Cash On Delivery)

---

## 📂 Project Structure

```
kiransarees/
├── prisma/
│   └── schema.prisma              # Production PostgreSQL schema (User, Product, Category, Order, OrderItem, Coupon, Review, Address)
├── public/                        # Static assets & icons
├── src/
│   ├── app/
│   │   ├── about/page.tsx         # Brand philosophy, metallurgy, cleanroom standards
│   │   ├── account/page.tsx       # User profile, orders history, saved addresses, security
│   │   ├── admin/page.tsx         # Admin command center (KPI analytics, CRUD products, orders pipeline, restock alerts, coupons)
│   │   ├── cart/page.tsx          # Full shopping cart with discount coupons & free shipping progress
│   │   ├── category/[slug]/page.tsx # Category pages with dedicated hero banners & filtered grids
│   │   ├── checkout/
│   │   │   ├── page.tsx           # Multi-step checkout with Stripe & Razorpay simulation
│   │   │   └── success/page.tsx   # Order confirmation, invoice print, celebration confetti
│   │   ├── compare/page.tsx       # Side-by-side 4-device technical spec comparison table
│   │   ├── contact/page.tsx       # VIP concierge contact desk & consultation booking
│   │   ├── faq/page.tsx           # Categorized searchable accordion FAQ
│   │   ├── login/page.tsx         # Secure login with 1-click Demo Patron & Admin shortcuts
│   │   ├── privacy-policy/page.tsx# Privacy & data security governance
│   │   ├── product/[slug]/page.tsx# Multi-image zoom gallery, specs matrix, reviews submission, variants, buy now
│   │   ├── register/page.tsx      # Patron account enrollment
│   │   ├── search/page.tsx        # Global search results with live keywords & filter
│   │   ├── shop/page.tsx          # Catalog with multi-faceted sidebar filters (Brand, Price slider, Rating, In-Stock, Sort)
│   │   ├── terms/page.tsx         # Terms of Service & 2-year warranty conditions
│   │   ├── track-order/page.tsx   # Live order tracking with 5-step visual delivery timeline
│   │   ├── wishlist/page.tsx      # Private wishlist vault with move-to-cart
│   │   ├── globals.css            # Custom CSS, fonts, gold gradients, glass panels
│   │   ├── layout.tsx             # Root layout with AnnouncementBar, Navbar, Footer, Drawers
│   │   └── page.tsx               # Homepage assembling all flagship showcase sections
│   ├── components/
│   │   ├── home/
│   │   │   ├── Hero.tsx                 # "Technology, Elevated." flagship showcase
│   │   │   ├── FeaturedCategories.tsx   # 9 hardware portfolio cards
│   │   │   ├── BestSellers.tsx          # Curated top models with category tabs
│   │   │   ├── PromotionalBanner.tsx    # "Upgrade Your World" with promo code ELEVARO10
│   │   │   ├── NewArrivals.tsx          # Newly released hardware
│   │   │   ├── InnovationShowcase.tsx   # Interactive Titanium, Silicon, Beryllium tabs
│   │   │   ├── WhyChooseElevaro.tsx     # 6 core luxury pillars
│   │   │   └── CustomerReviews.tsx      # Verified patron testimonials
│   │   ├── AnnouncementBar.tsx    # Rotating top banner & currency selector
│   │   ├── Navbar.tsx             # Luxury logo, mega menu dropdown, search, cart, wishlist, profile
│   │   ├── Footer.tsx             # Comprehensive directory, newsletter, payment badges
│   │   ├── ProductCard.tsx        # Card with quick view, wishlist, compare, add to cart, rating
│   │   ├── CartDrawer.tsx         # Slide-out cart with free shipping meter & coupons
│   │   ├── WishlistDrawer.tsx     # Slide-out saved items drawer
│   │   ├── QuickViewModal.tsx     # Interactive preview modal with variant selector
│   │   ├── SearchModal.tsx        # Global autocomplete search modal
│   │   ├── WhatsAppButton.tsx     # Floating VIP concierge support with quick prompts
│   │   └── ToastContainer.tsx     # Animated feedback notifications
│   ├── context/
│   │   └── ShopContext.tsx        # Comprehensive application state management
│   ├── data/
│   │   ├── categories.ts          # 9 luxury categories metadata & banners
│   │   └── products.ts            # 24+ flagship electronics products with full technical specs
│   └── types/
│       └── electronics.ts         # TypeScript models
├── .env.example                   # Environment configuration template
├── package.json
└── tailwind.config.ts
```

---

## ⚡ Quick Start & Installation

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Copy the example environment configuration:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 💳 Payment Gateway Configuration (Test Mode)

The website is engineered with production-ready payment gateway abstractions:

1. **Stripe Test Mode**:
   - Accepts international cards (Visa, MasterCard, AMEX).
   - Test Card: `4242 4242 4242 4242` with any future date and CVC.

2. **Razorpay Test Mode**:
   - Supports UPI QR, PhonePe, Google Pay, and Indian Net Banking.
   - Sandbox testing automatically records and assigns order numbers without charging live accounts.

3. **White-Glove Cash On Delivery**:
   - Patrons can inspect the tamper-evident holographic seal with the personal courier upon arrival.

---

## 🎟️ Active Demo Promotional Codes

- `ELEVARO10` — 10% discount across any order above $200.
- `LUXURY50` — $50 flat VIP concession on orders above $500.
- `WELCOMEVIP` — 15% discount for first-time patrons (Min. $1,000 order).

---

## 🛡️ Admin Command Center Credentials

Navigate to `/login` and use the 1-click **"Demo Admin"** button or log in directly:
- **Email**: `admin@elevaro.com`
- **Dashboard Route**: `/admin`
- **Capabilities**: View live revenue KPIs, catalog new electronics models, delete/replenish inventory, update order statuses (Processing, Shipped, Delivered), and manage coupon codes.

---

## 📄 License
© 2026 ELEVARO ELECTRONICS INC. All rights reserved.
