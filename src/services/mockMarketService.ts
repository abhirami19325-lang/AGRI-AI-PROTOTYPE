import { DEMO_MARKETS } from '../data/demoMarkets';
import { DEMO_PRODUCTS } from '../data/demoProducts';
import { generatePriceHistory, getMarketComparisonData, DEMO_SEASONAL_PATTERNS, DEMO_SUPPLY_DEMAND } from '../data/demoPrices';
import { INITIAL_OBSERVATIONS, INITIAL_VISITS } from '../data/demoObservations';
import { FieldObservation, Market, Product, PriceAlert, FieldVisit } from '../types';

const STORAGE_KEYS = {
  OBSERVATIONS: 'agri_price_ai_observations',
  VISITS: 'agri_price_ai_visits',
  ALERTS: 'agri_price_ai_alerts',
};

// Utility to load or default localStorage
const loadFromStorage = <T>(key: string, defaultVal: T): T => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultVal;
  } catch (e) {
    console.warn(`Error reading ${key} from localStorage`, e);
    return defaultVal;
  }
};

const saveToStorage = <T>(key: string, val: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.warn(`Error saving ${key} to localStorage`, e);
  }
};

export const mockMarketService = {
  getProducts(): Product[] {
    return DEMO_PRODUCTS;
  },

  getMarkets(): Market[] {
    return DEMO_MARKETS;
  },

  getMarketById(id: string): Market | undefined {
    return DEMO_MARKETS.find(m => m.id === id);
  },

  getPriceTrends(productName: string) {
    return generatePriceHistory(productName);
  },

  getMarketComparison(productName: string) {
    return getMarketComparisonData(productName);
  },

  getSeasonalPatterns() {
    return DEMO_SEASONAL_PATTERNS;
  },

  getSupplyDemandData() {
    return DEMO_SUPPLY_DEMAND;
  },

  getObservations(): FieldObservation[] {
    return loadFromStorage<FieldObservation[]>(STORAGE_KEYS.OBSERVATIONS, INITIAL_OBSERVATIONS);
  },

  addObservation(newObs: Omit<FieldObservation, 'id' | 'status'>): FieldObservation {
    const current = this.getObservations();
    const created: FieldObservation = {
      ...newObs,
      id: `obs-${Date.now()}`,
      status: 'Completed',
    };
    const updated = [created, ...current];
    saveToStorage(STORAGE_KEYS.OBSERVATIONS, updated);
    return created;
  },

  getVisits(): FieldVisit[] {
    return loadFromStorage<FieldVisit[]>(STORAGE_KEYS.VISITS, INITIAL_VISITS);
  },

  getAlerts(): PriceAlert[] {
    return loadFromStorage<PriceAlert[]>(STORAGE_KEYS.ALERTS, [
      { id: 'alt-1', product: 'Tomato', thresholdPercent: 10, createdDate: '2026-09-28', status: 'Active' },
      { id: 'alt-2', product: 'Onion', thresholdPercent: 15, createdDate: '2026-09-25', status: 'Active' },
    ]);
  },

  addAlert(alert: Omit<PriceAlert, 'id' | 'createdDate' | 'status'>): PriceAlert {
    const current = this.getAlerts();
    const created: PriceAlert = {
      ...alert,
      id: `alt-${Date.now()}`,
      createdDate: new Date().toISOString().split('T')[0],
      status: 'Active',
    };
    const updated = [created, ...current];
    saveToStorage(STORAGE_KEYS.ALERTS, updated);
    return created;
  },

  deleteAlert(id: string): void {
    const current = this.getAlerts();
    const updated = current.filter(a => a.id !== id);
    saveToStorage(STORAGE_KEYS.ALERTS, updated);
  }
};
