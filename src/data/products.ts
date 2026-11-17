import { Product } from '@/types/electronics';

export const PRODUCTS: Product[] = [
  // 1. SMARTPHONES
  {
    id: 'elv-sp-01',
    slug: 'aegis-titanium-pro-max',
    name: 'Aegis Pro Max 24K Titanium Edition',
    brand: 'Elevaro Masterwork',
    category: 'smartphones',
    categoryLabel: 'Smartphones',
    price: 1599,
    originalPrice: 1799,
    discountPercentage: 11,
    rating: 4.95,
    reviewCount: 142,
    inStock: true,
    stockCount: 8,
    badge: 'FLAGSHIP',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    shortDescription: 'Aerospace-grade sculpted titanium frame, 200MP periscope telemetry lens, and neural quantum silicon.',
    fullDescription: 'The Aegis Pro Max 24K Titanium Edition embodies the pinnacle of sovereign mobile craftsmanship. Milled from a monolithic billet of Grade 5 titanium with hand-brushed chamfered edges, it encases a custom 6.8-inch Dynamic Micro-LED display boasting 3,200 nits peak brightness. Powered by the bespoke Quantum-9 Neural APU with hardware-accelerated ray tracing and dedicated cryptographic vault hardware.',
    keyFeatures: [
      'Monolithic Grade 5 Aerospace Titanium chassis with diamond-cut bevels',
      '6.8" 120Hz LTPO Micro-LED with 3,200 nits daylight visibility',
      'Quad Optical Array: 200MP main f/1.4 + 50MP 10x Periscope Telephoto',
      '5,400mAh Silicon-Carbon cell with 120W HyperCharge (0-100% in 18m)',
      'Hardware-level AES-256 Quantum Secure Enclave and satellite SOS uplink'
    ],
    specs: {
      processor: 'Quantum-9 Octa-Core 3.8GHz Neural Architecture',
      ram: '16GB LPDDR5X Ultra-Bandwidth',
      storage: '512GB UFS 4.1 High-Speed NVMe',
      display: '6.8" Dynamic Micro-LED 1-120Hz Adaptive HDR10+',
      battery: '5,400mAh Silicon-Carbon anode (Up to 34h talk time)',
      cameraSetup: '200MP + 50MP 10x Periscope + 48MP Ultrawide Macro',
      connectivity: '5G Dual-SIM, Wi-Fi 7, Bluetooth 5.4, UWB, Satellite Link',
      material: 'Grade 5 Titanium & Ceramic Shield Crystal Glass',
      weight: '218 grams',
      dimensions: '160.8 x 77.2 x 8.2 mm',
      warranty: '2-Year Elevaro VIP Concierge Replacement Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Champagne Gold', hex: '#C9A96E' },
      { name: 'Titanium Black', hex: '#1C1C1E' },
      { name: 'Sovereign Silver', hex: '#D2D2D7' }
    ],
    variants: [
      { id: 'v-256', name: '256GB Storage', type: 'storage', priceDelta: 0 },
      { id: 'v-512', name: '512GB Storage', type: 'storage', priceDelta: 200 },
      { id: 'v-1tb', name: '1TB Sovereign Vault', type: 'storage', priceDelta: 450 }
    ],
    reviews: [
      {
        id: 'rev-01',
        userName: 'Alexander Vance',
        rating: 5,
        date: '3 days ago',
        title: 'Unrivaled tactile luxury and camera clarity',
        comment: 'The weight distribution and hand-finished titanium frame are sublime. The 10x periscope lens captures texture and skin tones with medium-format fidelity.',
        verifiedPurchase: true,
        helpfulCount: 34
      },
      {
        id: 'rev-02',
        userName: 'Dr. Evelyn Sterling',
        rating: 5,
        date: '1 week ago',
        title: 'Battery endurance exceeds every other flagship',
        comment: 'Even during continuous 4K video capture and satellite testing, the device stayed cool and powered through two full business days.',
        verifiedPurchase: true,
        helpfulCount: 19
      }
    ]
  },
  {
    id: 'elv-sp-02',
    slug: 'luminary-fold-infinite',
    name: 'Luminary Fold Infinite Ceramic',
    brand: 'Elevaro Prive',
    category: 'smartphones',
    categoryLabel: 'Smartphones',
    price: 2199,
    originalPrice: 2499,
    discountPercentage: 12,
    rating: 4.88,
    reviewCount: 96,
    inStock: true,
    stockCount: 5,
    badge: 'LIMITED EDITION',
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    shortDescription: 'Zero-crease titanium waterdrop hinge with 8.0-inch 120Hz foldable micro-crystal OLED.',
    fullDescription: 'Sculpted for monarchs of industry, the Luminary Fold Infinite seamlessly unfurls from a svelte 5.4mm one-handed companion into an immersive 8.0-inch cinema canvas. Features a frictionless liquid-metal hinge tested to 500,000 actuations and high-gloss zirconia ceramic exterior plate.',
    keyFeatures: [
      'Zero-crease fluid titanium waterdrop hinge mechanism',
      '8.0" Inner Flex-OLED 120Hz + 6.4" Outer Crystal Shield Display',
      'Pure Zirconia Ceramic back panel with scratch-proof thermal dispersal',
      'Integrated stylus holster with 4,096 levels of magnetic pressure sensitivity'
    ],
    specs: {
      processor: 'Snapdragon 8 Gen 3 Leading Edition',
      ram: '16GB LPDDR5X',
      storage: '1TB UFS 4.0 Storage',
      display: '8.0" Inner 2200x2480 120Hz OLED, 6.4" Outer 120Hz',
      battery: '5,000mAh Dual-Cell with 80W Wireless Qi2',
      material: 'Titanium Alloy Hinge + Zirconia Ceramic Body',
      weight: '235 grams',
      warranty: '2-Year VIP Priority Screen Care & Concierge'
    },
    images: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Obsidian Ceramic', hex: '#111111' },
      { name: 'Opaline White', hex: '#EBEBEB' }
    ]
  },

  // 2. LAPTOPS
  {
    id: 'elv-lp-01',
    slug: 'elevaro-zenith-book-ultra-16',
    name: 'Zenith Book Ultra 16 M-Max Carbon',
    brand: 'Elevaro Masterwork',
    category: 'laptops',
    categoryLabel: 'Laptops',
    price: 3299,
    originalPrice: 3699,
    discountPercentage: 10,
    rating: 4.97,
    reviewCount: 88,
    inStock: true,
    stockCount: 6,
    badge: 'FLAGSHIP',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    shortDescription: 'Unibody magnesium-forged chassis, 16.2" Mini-LED 1600 nits, 40-core GPU workstation.',
    fullDescription: 'Engineered without compromise for architects, music producers, and visionary directors. The Zenith Book Ultra 16 pairs an aerospace forged magnesium-carbon chassis with a reference-calibrated 16.2-inch Liquid Retina XDR display. Features active vapor chamber cooling delivering sustained, whisper-quiet performance under extreme workloads.',
    keyFeatures: [
      '16.2" Liquid Mini-LED 3.5K Display with 1,000,000:1 contrast & 1600 nits',
      '16-Core Ultra CPU + 40-Core Neural GPU architecture',
      '64GB Unified High-Bandwidth Memory with 800GB/s bandwidth',
      'Bespoke 6-Speaker spatial acoustic array with force-cancelling subwoofers',
      'Up to 22 hours of continuous real-world battery endurance'
    ],
    specs: {
      processor: 'Elevaro M-Max 16-Core Silicon (3nm Architecture)',
      ram: '64GB Unified High-Bandwidth Memory',
      storage: '2TB PCIe Gen 5 NVMe SSD (Up to 14,000 MB/s)',
      display: '16.2" Mini-LED (3456 x 2234) 120Hz ProMotion',
      battery: '100Wh Lithium-Polymer (22h Video Playback)',
      connectivity: 'Wi-Fi 7, Thunderbolt 5 (x3), HDMI 2.1, SDXC UHS-II',
      material: 'Forged Magnesium-Aluminium Unibody',
      weight: '1.98 kg',
      warranty: '3-Year Global Express Repair & White-Glove Support'
    },
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Space Black', hex: '#1E1E20' },
      { name: 'Champagne Silver', hex: '#DCD4C4' }
    ],
    variants: [
      { id: 'v-64gb', name: '64GB RAM / 2TB SSD', type: 'storage', priceDelta: 0 },
      { id: 'v-128gb', name: '128GB RAM / 4TB SSD Extreme', type: 'storage', priceDelta: 1100 }
    ]
  },
  {
    id: 'elv-lp-02',
    slug: 'aerolite-carbon-pro-14',
    name: 'AeroLite Carbon Pro 14 Featherweight',
    brand: 'Elevaro Studio',
    category: 'laptops',
    categoryLabel: 'Laptops',
    price: 2499,
    originalPrice: 2799,
    discountPercentage: 11,
    rating: 4.89,
    reviewCount: 74,
    inStock: true,
    stockCount: 12,
    badge: 'BESTSELLER',
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: true,
    shortDescription: 'Weighs merely 920g with multi-layer woven carbon fiber shell and 3K OLED touch display.',
    fullDescription: 'The AeroLite Carbon Pro 14 defines the ultimate portable executive laptop. At just 920 grams, its structural integrity is derived from formula-one grade woven carbon fiber. Packed with an Intel Core Ultra 9 processor and a breath-taking 3K 120Hz OLED screen.',
    keyFeatures: [
      'Featherweight 920 grams total chassis weight',
      '14.0" 3K OLED (2880 x 1800) 100% DCI-P3 Color Accuracy',
      'Zero-throttle graphene vapor heat spreader with silent maglev fans',
      'Backlit tactile scissor keyboard with 1.5mm key travel'
    ],
    specs: {
      processor: 'Intel Core Ultra 9 185H with Dedicated Intel NPU',
      ram: '32GB LPDDR5X 7467MHz',
      storage: '1TB PCIe 4.0 NVMe SSD',
      display: '14" 3K OLED 120Hz Touch, Corning Gorilla Glass Victus',
      battery: '75Wh High-Density Cell (Up to 18 Hours)',
      material: 'Toray High-Tensile Carbon Fiber',
      weight: '920 grams',
      warranty: '2-Year Global Protection'
    },
    images: [
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Matte Carbon Black', hex: '#1B1C1E' }
    ]
  },

  // 3. TABLETS
  {
    id: 'elv-tb-01',
    slug: 'slate-studio-pro-13',
    name: 'Slate Studio Pro 13 Tandem OLED',
    brand: 'Elevaro Studio',
    category: 'tablets',
    categoryLabel: 'Tablets',
    price: 1399,
    originalPrice: 1549,
    discountPercentage: 10,
    rating: 4.93,
    reviewCount: 63,
    inStock: true,
    stockCount: 15,
    badge: 'FLAGSHIP',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    shortDescription: 'World’s thinnest 5.1mm chassis with Tandem OLED 1600 nits and tactile haptic pen.',
    fullDescription: 'The Slate Studio Pro 13 fuses boundless creative expression with workstation power. Its groundbreaking Tandem OLED display layers two OLED panels to achieve blistering 1600 nits peak brightness and true specular highlights. Includes the Elevaro Precision Pen 2 with zero-millisecond felt resistance.',
    keyFeatures: [
      '5.1mm razor-thin CNC milled aluminum enclosure',
      '13.0" Tandem OLED Ultra Retina with 120Hz ProMotion',
      'Haptic feedback digital stylus with barrel roll sensitivity',
      'Quad studio-grade acoustic transducers with Dolby Atmos'
    ],
    specs: {
      processor: 'Elevaro M4 Neural Chip with 10-core GPU',
      ram: '16GB Unified RAM',
      storage: '512GB High-Speed SSD',
      display: '13.0" Tandem OLED 2752 x 2064 at 264 ppi',
      battery: '38.99Wh (Up to 12 hours active creative rendering)',
      weight: '579 grams',
      warranty: '2-Year Hardware Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Titanium Slate', hex: '#2A2C2E' },
      { name: 'Silver Mist', hex: '#E2E2E6' }
    ]
  },

  // 4. HEADPHONES
  {
    id: 'elv-hp-01',
    slug: 'aurora-lossless-anc-over-ear',
    name: 'Aurora Prive Lossless ANC Over-Ear',
    brand: 'Elevaro Acoustics',
    category: 'headphones',
    categoryLabel: 'Headphones',
    price: 649,
    originalPrice: 799,
    discountPercentage: 19,
    rating: 4.96,
    reviewCount: 210,
    inStock: true,
    stockCount: 18,
    badge: 'BESTSELLER',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    shortDescription: 'Custom 40mm Beryllium acoustic drivers, memory foam lambskin cups, and lossless 24-bit 192kHz DAC.',
    fullDescription: 'Crafted for those who worship sonic purity. The Aurora Prive pairs handcrafted Italian lambskin leather and bead-blasted anodized aluminium earcups with ultra-rigid 40mm Beryllium diaphragms. Features 4-mode Hybrid Active Noise Cancellation powered by eight calibration microphones measuring ambient sound 50,000 times per second.',
    keyFeatures: [
      '40mm Pure Beryllium Diaphragm drivers with <0.02% THD',
      'Internal 24-bit/192kHz audiophile ESS SABRE DAC via USB-C or LDAC',
      'Sublime 45dB Active Noise Cancellation with Natural Transparency Mode',
      'Handcrafted memory foam ear cushions sheathed in bespoke lambskin',
      '55-Hour battery reserve with rapid-charge (15m gives 10 hours)'
    ],
    specs: {
      driverSize: '40mm Beryllium Dome with Neodymium Magnets',
      frequencyResponse: '5Hz - 48,000Hz Ultra-Wide Hi-Res',
      impedance: '32 Ohms (Active or Passive cable mode)',
      batteryLife: '55 hours with ANC ON / 70 hours ANC OFF',
      connectivity: 'Bluetooth 5.4, aptX Lossless, LDAC, USB-C DAC, 3.5mm Gold Jack',
      weight: '320 grams',
      warranty: '3-Year Concierge Audiophile Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Champagne Gold & Cocoa', hex: '#C9A96E' },
      { name: 'Midnight Charcoal', hex: '#19191B' },
      { name: 'Arctic Platinum', hex: '#E5E5E9' }
    ]
  },
  {
    id: 'elv-hp-02',
    slug: 'resonance-pro-wireless-earbuds',
    name: 'Resonance Pro True Wireless Earbuds',
    brand: 'Elevaro Acoustics',
    category: 'headphones',
    categoryLabel: 'Headphones',
    price: 349,
    originalPrice: 399,
    discountPercentage: 12,
    rating: 4.87,
    reviewCount: 168,
    inStock: true,
    stockCount: 22,
    badge: 'NEW ARRIVAL',
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    shortDescription: 'Graphene dual-drivers, titanium charging case, and personalized acoustic canal mapping.',
    fullDescription: 'The Resonance Pro delivers an astonishingly spacious soundstage from a miniature in-ear form factor. The accompanying charging capsule is machined from solid aircraft aluminum with a spring-damped magnetic hinge.',
    keyFeatures: [
      'Dual Dynamic 11mm Graphene driver + Balanced Armature tweeter',
      'Adaptive Spatial Audio with dynamic 6-axis head tracking',
      'Grade 5 titanium-look inductive charging case with LED battery jewel',
      'IPX7 water & perspiration resistance for athletic endurance'
    ],
    specs: {
      batteryLife: '10 hours earbuds + 32 hours via case',
      connectivity: 'Bluetooth 5.4 with multipoint pairing',
      weight: '5.2g per earbud',
      warranty: '2-Year Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#161618' },
      { name: 'Pearl Ivory', hex: '#F2EFE9' }
    ]
  },

  // 5. SMARTWATCHES
  {
    id: 'elv-sw-01',
    slug: 'chronos-vanguard-titanium-smartwatch',
    name: 'Chronos Vanguard Titanium Chronograph',
    brand: 'Elevaro Horology',
    category: 'smartwatches',
    categoryLabel: 'Smartwatches',
    price: 899,
    originalPrice: 999,
    discountPercentage: 10,
    rating: 4.94,
    reviewCount: 115,
    inStock: true,
    stockCount: 7,
    badge: 'FLAGSHIP',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    shortDescription: 'Sapphire crystal dome, grade 5 titanium case, ECG sensor, and 14-day solar battery reserve.',
    fullDescription: 'Where classical Swiss horology meets state-of-the-art biotelemetry. The Chronos Vanguard features a double-domed synthetic sapphire crystal with dual anti-reflective coating, encasing a vivid 1.5-inch Always-On AMOLED screen with 2,500 nits brightness. Embedded medical-grade ECG and blood oxygen monitoring deliver hospital-grade cardiovascular insights.',
    keyFeatures: [
      'Monolithic Grade 5 Titanium 46mm case with hand-polished bevels',
      'Double-domed scratchproof Sapphire Crystal glass',
      'Medical ECG telemetry and arterial stiffness analysis',
      '14-Day battery life with ambient solar photovoltaic perimeter ring',
      '100-Meter (10 ATM) diver water resistance with dive depth computer'
    ],
    specs: {
      display: '1.5" Sapphire AMOLED 480x480 Always-On Display',
      sensors: 'Clinical 1-Lead ECG, SpO2, Skin Temperature, Barometer, Multi-Band GPS',
      batteryLife: 'Up to 14 days standard / 21 days with Solar Boost',
      waterResistance: '10 ATM (100 meters / 330 ft)',
      caseMaterial: 'Grade 5 Aerospace Titanium with Ceramic Caseback',
      weight: '56 grams (without strap)',
      warranty: '3-Year Global Horology Guarantee'
    },
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Raw Brushed Titanium', hex: '#949599' },
      { name: 'Champagne Gold PVD', hex: '#C9A96E' },
      { name: 'DLC Midnight Black', hex: '#1C1C1E' }
    ]
  },

  // 6. CAMERAS
  {
    id: 'elv-cm-01',
    slug: 'lumina-x1-medium-format-mirrorless',
    name: 'Lumina X1 100MP Medium-Format Mirrorless',
    brand: 'Leica & Elevaro Atelier',
    category: 'cameras',
    categoryLabel: 'Cameras',
    price: 4999,
    originalPrice: 5499,
    discountPercentage: 9,
    rating: 4.98,
    reviewCount: 45,
    inStock: true,
    stockCount: 4,
    badge: 'LIMITED EDITION',
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    shortDescription: '100-Megapixel 44x33mm BSI CMOS sensor with 16-bit color depth and 7-stop in-body stabilization.',
    fullDescription: 'The Lumina X1 redefines photographic grandeur. Featuring a magnificent 100MP medium-format sensor offering 15 stops of dynamic range, it captures nuances of light, shadow, and tonal transition previously thought impossible in a handheld body. Sheathed in vulcanized leatherette and solid brass top plates.',
    keyFeatures: [
      '100-Megapixel Medium Format (43.8 x 32.9 mm) BSI Sensor',
      '16-Bit RAW color reproduction capturing 281 trillion distinct hues',
      '5-Axis 7.0-Stop In-Body Image Stabilization (IBIS)',
      '5.76M-dot OLED Electronic Viewfinder with 120fps refresh rate',
      'Direct Apple ProRes 422 HQ 4K internal video recording'
    ],
    specs: {
      sensor: '100MP Medium Format BSI CMOS (43.8 x 32.9 mm)',
      isoRange: 'ISO 64 - 25,600 (Expandable to 102,400)',
      storageSlots: 'Dual CFexpress Type B + SD UHS-II',
      viewfinder: '5.76M-Dot 0.86x OLED EVF',
      shutter: 'Up to 1/16,000s electronic, 1/4000s mechanical',
      weight: '820 grams (body only)',
      warranty: '3-Year Pro Concierge Guarantee with Loaner Unit Support'
    },
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Classic Silver Chrome & Black', hex: '#C2C4C8' },
      { name: 'Monochrome Stealth Black', hex: '#18191B' }
    ]
  },

  // 7. GAMING
  {
    id: 'elv-gm-01',
    slug: 'apex-cyber-rig-liquid-cooled',
    name: 'Apex Cyber Workstation Liquid Ultra',
    brand: 'ASUS ROG x Elevaro',
    category: 'gaming',
    categoryLabel: 'Gaming',
    price: 4499,
    originalPrice: 4999,
    discountPercentage: 10,
    rating: 4.95,
    reviewCount: 38,
    inStock: true,
    stockCount: 3,
    badge: 'EXCLUSIVE',
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    shortDescription: 'RTX 4090 24GB, Core i9 14900KS, bespoke hard-tube copper liquid loops in smoked glass housing.',
    fullDescription: 'The sovereign zenith of computer gaming and visual engineering. Assembled by master technicians with custom hard-line borosilicate glass tubing carrying non-conductive coolant over pure copper water blocks. Delivers uncapped framerates in 4K ray-traced immersion while operating virtually silent under full thermal load.',
    keyFeatures: [
      'GeForce RTX 4090 24GB with custom full-cover copper waterblock',
      'Intel Core i9-14900KS 24-Core processor clocked to 6.2GHz',
      '64GB DDR5 7200MHz low-latency Corsair Dominator Platinum memory',
      'Smoked tempered glass chassis with CNC aerospace aluminium skeleton',
      'Dual 360mm high-fin density brass radiators with whisper magnetic-levitation fans'
    ],
    specs: {
      gpu: 'NVIDIA GeForce RTX 4090 24GB GDDR6X',
      cpu: 'Intel Core i9-14900KS (24 Cores / 32 Threads)',
      motherboard: 'ROG Maximus Z790 Dark Hero',
      cooling: 'Custom Hard-Tube Custom Water Loop (EK Quantum)',
      psu: '1200W 80-Plus Titanium Fully Modular',
      weight: '24 kg',
      warranty: '3-Year On-Site Master Support'
    },
    images: [
      'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Dark Titanium & Smoked Glass', hex: '#1C1D21' }
    ]
  },
  {
    id: 'elv-gm-02',
    slug: 'valkyrie-oled-curved-gaming-display',
    name: 'Valkyrie 49" Curved QD-OLED 240Hz Display',
    brand: 'Elevaro Gaming Lab',
    category: 'gaming',
    categoryLabel: 'Gaming',
    price: 1799,
    originalPrice: 1999,
    discountPercentage: 10,
    rating: 4.91,
    reviewCount: 52,
    inStock: true,
    stockCount: 9,
    badge: 'BESTSELLER',
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    shortDescription: 'Dual QHD 5120x1440 32:9 super ultra-wide QD-OLED with 0.03ms response and 1800R curve.',
    fullDescription: 'Envelop your peripheral vision in peerless color and speed. The Valkyrie 49 combines quantum dot vibrancy with organic light-emitting diode contrast, yielding deep infinite blacks and dazzling 1000 nits specular highlights.',
    keyFeatures: [
      '49" 32:9 Super Ultra-Wide (Equivalent to two 27" QHD displays)',
      'Blazing 240Hz refresh rate with 0.03ms grey-to-grey response time',
      'G-Sync Compatible and AMD FreeSync Premium Pro certification'
    ],
    specs: {
      resolution: '5120 x 1440 Dual QHD',
      panelType: 'Samsung Quantum Dot OLED',
      curvature: '1800R Immersive Arc',
      weight: '12.9 kg with stand',
      warranty: '3-Year Zero-Burn-In Guarantee'
    },
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Slate Silver', hex: '#C4C6CA' }
    ]
  },

  // 8. HOME ELECTRONICS
  {
    id: 'elv-he-01',
    slug: 'sonus-sculpt-architectural-soundbar',
    name: 'Sonus Sculpt Architectural 9.1.4 Dolby Atmos Soundbar',
    brand: 'Bang & Olufsen x Elevaro',
    category: 'home-electronics',
    categoryLabel: 'Home Electronics',
    price: 2499,
    originalPrice: 2899,
    discountPercentage: 14,
    rating: 4.96,
    reviewCount: 78,
    inStock: true,
    stockCount: 6,
    badge: 'FLAGSHIP',
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: false,
    shortDescription: 'Real oak wood slats, bead-blasted aluminum chassis, 17 high-output acoustic drivers.',
    fullDescription: 'Sculpted to exist as fine Scandinavian furniture as much as a cinematic sound system. The Sonus Sculpt features real smoked oak wood slats over acoustic Kvadrat fabric, housing 17 custom transducers driven by 850 watts of Class-D amplification to project true height and surround channels without messy satellite cables.',
    keyFeatures: [
      '17 Custom Transducers with dedicated acoustic wave guides',
      'True 9.1.4 Dolby Atmos and DTS:X decoding with spatial room calibration',
      'Crafted with sustainable FSC-certified natural smoked oak and solid aluminium',
      'HDMI eARC 2.1, Apple AirPlay 2, Spotify Connect, and Tidal HiFi Lossless'
    ],
    specs: {
      powerOutput: '850 Watts Total Class-D Amplification',
      audioChannels: '9.1.4 True Spatial Atmos',
      frequencyRange: '28Hz - 24,000Hz with integrated dual 6.5" woofers',
      dimensions: '125 x 11.5 x 14 cm',
      weight: '14.2 kg',
      warranty: '5-Year Architectural Acoustic Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Natural Smoked Oak & Champagne', hex: '#C9A96E' },
      { name: 'Black Walnut & Anthracite', hex: '#23201D' }
    ]
  },
  {
    id: 'elv-he-02',
    slug: 'optima-vision-4k-laser-cinema',
    name: 'Optima Vision Ultra 4K Triple-Laser Projector',
    brand: 'Elevaro Cinema',
    category: 'home-electronics',
    categoryLabel: 'Home Electronics',
    price: 3699,
    originalPrice: 4199,
    discountPercentage: 12,
    rating: 4.92,
    reviewCount: 41,
    inStock: true,
    stockCount: 5,
    badge: 'EXCLUSIVE',
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    shortDescription: '150-inch cinematic projection from just 9 inches away, 3500 ANSI lumens RGB laser engine.',
    fullDescription: 'Transform any living salon into a private IMAX theater. The Optima Vision Ultra casts up to a 150-inch reference 4K HDR image from mere inches against your wall. Triple pure RGB lasers cover 107% of the BT.2020 color spectrum.',
    keyFeatures: [
      'Ultra-Short Throw 0.21:1 optics casting 150" from 9.8 inches away',
      'Pure RGB Triple-Laser Engine producing 3,500 ANSI lumens',
      'Dolby Vision & HDR10+ certification with dynamic tone mapping'
    ],
    specs: {
      brightness: '3,500 ANSI Lumens',
      colorGamut: '107% BT.2020 Ultra-Wide',
      lightSourceLife: '30,000+ hours maintenance-free',
      weight: '11.8 kg',
      warranty: '3-Year Laser Engine Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Matte Titanium White', hex: '#F0EFF4' },
      { name: 'Charcoal Noir', hex: '#1C1C1E' }
    ]
  },

  // 9. ACCESSORIES
  {
    id: 'elv-ac-01',
    slug: 'monolith-3-in-1-wireless-pedestal',
    name: 'Monolith 3-in-1 Wireless MagSafe Pedestal',
    brand: 'Elevaro Atelier',
    category: 'accessories',
    categoryLabel: 'Accessories',
    price: 199,
    originalPrice: 249,
    discountPercentage: 20,
    rating: 4.91,
    reviewCount: 289,
    inStock: true,
    stockCount: 34,
    badge: 'BESTSELLER',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    shortDescription: 'Solid billet zinc base, handcrafted Italian Horween leather pad, 25W Qi2 fast charging.',
    fullDescription: 'The Monolith 3-in-1 elevates your desk and nightstand aesthetic. Machined from a 1.2-kilogram solid block of weighted zinc so you can detach your smartphone with a single hand without the stand moving. Charges your smartphone, smartwatch, and earbuds simultaneously with Qi2 25W wireless induction.',
    keyFeatures: [
      '1.2 kg heavy weighted base for effortless one-handed detachment',
      'Official Apple-certified Qi2 25W fast inductive charging',
      'Hand-stitched genuine Italian vegetable-tanned leather contact surfaces',
      'Hidden braided Kevlar 2-meter USB-C power delivery cable included'
    ],
    specs: {
      powerInput: '100W GaN Adapter included',
      outputs: '25W Phone + 5W Watch + 5W Earbuds',
      material: 'CNC Zinc Alloy, Anodized Aluminium, Horween Leather',
      weight: '1,240 grams',
      warranty: 'Lifetime Craftsmanship Guarantee'
    },
    images: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1622445262464-84b1456045b6?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Champagne Gold & Saddle Brown', hex: '#C9A96E' },
      { name: 'Matte Gunmetal & Black Leather', hex: '#232528' }
    ]
  },
  {
    id: 'elv-ac-02',
    slug: 'valet-leather-sleeve-macbook-pro',
    name: 'Valet Full-Grain Italian Leather Folio',
    brand: 'Elevaro Leatherworks',
    category: 'accessories',
    categoryLabel: 'Accessories',
    price: 159,
    originalPrice: 189,
    discountPercentage: 15,
    rating: 4.88,
    reviewCount: 142,
    inStock: true,
    stockCount: 20,
    badge: 'NEW ARRIVAL',
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    shortDescription: 'Full-grain Tuscan leather with micro-suede protective lining and magnetic security flap.',
    fullDescription: 'Tanned in Tuscany using centuries-old vegetable tannins that develop a rich, personal patina over years of use. Designed to snugly house laptops from 14-inch to 16-inch sizes with dedicated magnetic closure.',
    keyFeatures: [
      'Hand-selected Grade A Tuscan vegetable-tanned leather',
      'Plush Japanese microfiber interior lining preventing micro-scratches',
      'Concealed neodymium magnetic array for clean snap closure'
    ],
    specs: {
      compatibility: 'MacBook Pro 14" / 16", Zenith Book 16, Slate 13',
      dimensions: '37 x 26 x 1.2 cm',
      material: 'Full-Grain Italian Calfskin Leather',
      weight: '340 grams',
      warranty: '5-Year Guarantee'
    },
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Cognac Tan', hex: '#94532B' },
      { name: 'Espresso Noir', hex: '#1F1A18' }
    ]
  },
  {
    id: 'elv-ac-03',
    slug: 'gan-titanium-140w-travel-charger',
    name: 'GaN Prime 140W Titanium Multi-Port Travel Hub',
    brand: 'Elevaro Power',
    category: 'accessories',
    categoryLabel: 'Accessories',
    price: 129,
    originalPrice: 149,
    discountPercentage: 13,
    rating: 4.93,
    reviewCount: 312,
    inStock: true,
    stockCount: 45,
    badge: 'BESTSELLER',
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    shortDescription: 'Gallium Nitride 5th Gen silicon, 3x USB-C 140W PD 3.1 + 1x USB-A in a pocket-sized package.',
    fullDescription: 'Replace all your bulky power bricks with one titanium-shielded hub. Capable of charging a 16-inch workstation laptop at maximum 140W speeds while simultaneously powering your phone and earbuds.',
    keyFeatures: [
      'Next-gen GaN-V semiconductors yielding 96% thermal efficiency',
      'Power Delivery 3.1 supporting single-port 140W output',
      'Dynamic power re-balancing across 4 ports in real-time',
      'Interchangeable worldwide travel plug adapters (US, UK, EU, AU)'
    ],
    specs: {
      totalOutput: '140W Max',
      ports: '3x USB-C PD 3.1, 1x USB-A QC 4.0',
      dimensions: '7.8 x 6.5 x 3.1 cm',
      weight: '260 grams',
      warranty: '3-Year Replacement'
    },
    images: [
      'https://images.unsplash.com/photo-1585338107529-13afc5f02586?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Space Gray & Gold Accents', hex: '#2A2C30' }
    ]
  }
];

export const POPULAR_SEARCH_TERMS = [
  'Titanium',
  'Aegis Pro',
  'OLED',
  'Beryllium Headphones',
  'MagSafe Pedestal',
  'Chronos Watch',
  '4K Laser Projector',
  'RTX 4090',
  'Wireless Earbuds'
];

export const COUPONS = [
  {
    code: 'ELEVARO10',
    discountType: 'percentage',
    discountValue: 10,
    minPurchase: 200,
    description: '10% off your entire order (Min. $200 purchase)',
    expiresAt: '2027-12-31'
  },
  {
    code: 'LUXURY50',
    discountType: 'fixed',
    discountValue: 50,
    minPurchase: 500,
    description: '$50 flat VIP concession on orders above $500',
    expiresAt: '2027-12-31'
  },
  {
    code: 'WELCOMEVIP',
    discountType: 'percentage',
    discountValue: 15,
    minPurchase: 1000,
    description: '15% off first flagship acquisition (Min. $1000)',
    expiresAt: '2027-12-31'
  }
];
