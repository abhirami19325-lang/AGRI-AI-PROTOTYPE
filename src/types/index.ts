export type PageId = 
  | 'landing'
  | 'dashboard'
  | 'field-observation'
  | 'market-explorer'
  | 'prediction'
  | 'analytics'
  | 'field-visits'
  | 'market-map'
  | 'about';

export type AvailabilityLevel = 'Low' | 'Medium' | 'High';
export type DemandLevel = 'Low' | 'Medium' | 'High';

export interface Product {
  id: string;
  name: string;
  category: string;
  icon: string;
  defaultPrice: number;
  unit: string;
}

export interface Market {
  id: string;
  name: string;
  city: string;
  district: string;
  productsCount: number;
  observationsCount: number;
  lastUpdated: string;
  coordinates: [number, number]; // [lat, lng]
  avgPrice: number;
  address: string;
  vendorCount: number;
}

export interface FieldObservation {
  id: string;
  date: string;
  product: string;
  market: string;
  marketId: string;
  category: string;
  variety: string;
  location: string;
  vendorType: string;
  price: number;
  minPrice: number;
  maxPrice: number;
  availability: AvailabilityLevel;
  demand: DemandLevel;
  temperature: number;
  rainfall: string;
  season: string;
  notes: string;
  status: 'Completed' | 'Pending' | 'Verified';
  photoUrl?: string;
}

export interface PriceHistoryPoint {
  date: string;
  price: number;
  trendPrice: number;
  product: string;
}

export interface MarketComparisonPoint {
  market: string;
  marketId: string;
  price: number;
}

export interface PredictionInput {
  product: string;
  market: string;
  periodDays: number;
  availability: AvailabilityLevel;
  demand: DemandLevel;
}

export interface InfluencingFactor {
  title: string;
  desc: string;
  icon: string;
  impact: 'up' | 'down' | 'neutral';
}

export interface PredictionResult {
  product: string;
  market: string;
  periodDays: number;
  predictedPrice: number;
  rangeMin: number;
  rangeMax: number;
  trend: 'Up' | 'Down' | 'Stable';
  reliabilityScore: number; // e.g. 78
  influences: InfluencingFactor[];
  generatedAt: string;
}

export interface PriceAlert {
  id: string;
  product: string;
  thresholdPercent: number;
  createdDate: string;
  status: 'Active' | 'Triggered';
}

export interface FieldVisit {
  id: string;
  date: string;
  marketName: string;
  marketId: string;
  location: string;
  products: string[];
  observationsCount: number;
  status: 'Completed' | 'In Progress' | 'Scheduled';
  investigator: string;
  summaryNotes: string;
}

export interface UploadedPhoto {
  id: string;
  url: string;
  product: string;
  location: string;
  date: string;
}
