import { PriceHistoryPoint, MarketComparisonPoint } from '../types';

export const generatePriceHistory = (productName: string): PriceHistoryPoint[] => {
  const basePrices: Record<string, number> = {
    Tomato: 38,
    Onion: 34,
    Potato: 27,
    Carrot: 50,
    Brinjal: 30,
    Cabbage: 22,
    Beans: 56,
    'Green Chilli': 42,
  };

  const base = basePrices[productName] || 40;
  const days = [
    '01 Sep', '03 Sep', '05 Sep', '07 Sep', '09 Sep', '11 Sep',
    '13 Sep', '15 Sep', '17 Sep', '19 Sep', '21 Sep', '23 Sep',
    '25 Sep', '27 Sep', '29 Sep', '30 Sep'
  ];

  let currentPrice = base;
  return days.map((date, idx) => {
    // Generate realistic fluctuating trend
    const variance = (Math.sin(idx * 0.7) * 4) + ((idx % 3) * 1.2);
    currentPrice = Math.round(base + variance);
    const trendPrice = Math.round(base + (idx * 0.4) + (Math.cos(idx) * 1.5));
    
    return {
      date,
      price: currentPrice,
      trendPrice: trendPrice,
      product: productName,
    };
  });
};

export const getMarketComparisonData = (productName: string): MarketComparisonPoint[] => {
  const basePrices: Record<string, number> = {
    Tomato: 40,
    Onion: 36,
    Potato: 28,
    Carrot: 52,
    Brinjal: 32,
    Cabbage: 24,
    Beans: 60,
    'Green Chilli': 45,
  };

  const base = basePrices[productName] || 40;

  return [
    { market: 'Ukkadam Market', marketId: 'm1', price: base },
    { market: 'Mettupalayam Market', marketId: 'm2', price: base + 3 },
    { market: 'Singanallur Market', marketId: 'm3', price: base - 2 },
    { market: 'Pollachi Market', marketId: 'm4', price: base + 5 },
  ];
};

export const DEMO_SEASONAL_PATTERNS = [
  { month: 'Jan', avgPrice: 32, historicalAvg: 30 },
  { month: 'Feb', avgPrice: 28, historicalAvg: 29 },
  { month: 'Mar', avgPrice: 31, historicalAvg: 32 },
  { month: 'Apr', avgPrice: 36, historicalAvg: 35 },
  { month: 'May', avgPrice: 42, historicalAvg: 39 },
  { month: 'Jun', avgPrice: 48, historicalAvg: 44 },
  { month: 'Jul', avgPrice: 52, historicalAvg: 46 },
  { month: 'Aug', avgPrice: 45, historicalAvg: 42 },
  { month: 'Sep', avgPrice: 42, historicalAvg: 38 },
  { month: 'Oct', avgPrice: 39, historicalAvg: 36 },
  { month: 'Nov', avgPrice: 35, historicalAvg: 34 },
  { month: 'Dec', avgPrice: 33, historicalAvg: 31 },
];

export const DEMO_SUPPLY_DEMAND = [
  { market: 'Ukkadam', supplyScore: 65, demandScore: 80, price: 42 },
  { market: 'Mettupalayam', supplyScore: 85, demandScore: 60, price: 38 },
  { market: 'Singanallur', supplyScore: 50, demandScore: 75, price: 44 },
  { market: 'Pollachi', supplyScore: 78, demandScore: 70, price: 40 },
];
