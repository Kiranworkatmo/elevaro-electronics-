export type WeaveType = 
  | 'Banarasi Katan' 
  | 'Kanjeevaram' 
  | 'Chanderi' 
  | 'Paithani' 
  | 'Organza' 
  | 'Patola';

export type OccasionType = 
  | 'Bridal Trousseau' 
  | 'Grand Reception' 
  | 'Sangeet & Mehendi' 
  | 'Royal Festive' 
  | 'Red Carpet & Cocktails';

export type ColorFamily = 
  | 'Crimson & Sindoor' 
  | 'Emerald & Peacock' 
  | 'Antique Gold & Champagne' 
  | 'Rani Pink & Rose' 
  | 'Midnight Noir & Navy' 
  | 'Ivory & Pearl';

export interface Saree {
  id: string;
  name: string;
  subTitle: string;
  tagline: string;
  weave: WeaveType;
  craftOrigin: string;
  priceINR: number;
  occasion: OccasionType;
  colorFamily: ColorFamily;
  colorName: string;
  fabricPurity: string;
  zariType: string;
  weavingDays: number;
  inStock: boolean;
  isBestseller?: boolean;
  isHeirloomBridal?: boolean;
  images: {
    main: string;
    pallu: string;
    detail: string;
    drape: string;
  };
  description: string;
  highlights: string[];
  specs: {
    length: string;
    width: string;
    weight: string;
    blousePiece: string;
    certification: string;
    care: string;
  };
}

export interface CartItem {
  saree: Saree;
  quantity: number;
  includeBlouseStitching: boolean;
  blouseMeasurements?: string;
}

export type Currency = 'INR' | 'USD' | 'GBP' | 'EUR' | 'AED';

export interface ConsultationBooking {
  name: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  occasion: string;
  budget: string;
  specialRequests?: string;
}
