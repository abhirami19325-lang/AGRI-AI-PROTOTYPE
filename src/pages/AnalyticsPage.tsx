import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { mockMarketService } from '../services/mockMarketService';
import { DEMO_PRODUCTS } from '../data/demoProducts';
import { DEMO_MARKETS } from '../data/demoMarkets';
import { BarChart3, Filter, Calendar, Activity, CloudSun, Sparkles } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>('Tomato');
  const [selectedMarket, setSelectedMarket] = useState<string>('Ukkadam Market');

  const historyData = mockMarketService.getPriceTrends(selectedProduct);
  const comparisonData = mockMarketService.getMarketComparison(selectedProduct);
  const seasonalData = mockMarketService.getSeasonalPatterns();
  const supplyDemandData = mockMarketService.getSupplyDemandData();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Filter Bar */}
      <div className="bg-white rounded-2xl p-6 border border-agri-dark/8 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-extrabold text-lg text-agri-dark flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-agri-leaf" /> Market Analytics Suite
          </h3>
          <p className="text-xs text-agri-slateText">
            In-depth statistical modeling of price trends, seasonal cycles, and market elasticity.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 bg-agri-offwhite border border-agri-dark/15 px-3 py-1.5 rounded-xl text-xs">
            <Filter className="w-3.5 h-3.5 text-agri-slateText" />
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="bg-transparent font-bold text-agri-dark focus:outline-none cursor-pointer"
            >
              {DEMO_PRODUCTS.map(p => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-agri-offwhite border border-agri-dark/15 px-3 py-1.5 rounded-xl text-xs">
            <select
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value)}
              className="bg-transparent font-bold text-agri-dark focus:outline-none cursor-pointer"
            >
              {DEMO_MARKETS.map(m => (
                <option key={m.id} value={m.name}>{m.name}</option>
              ))}
            </select>
          </div>

          <span className="text-[10px] bg-agri-gold/20 text-agri-dark font-bold px-2 py-1 rounded-full border border-agri-gold/30">
            <Sparkles className="w-2.5 h-2.5 inline mr-1" /> September 2026 Analytics
          </span>
        </div>
      </div>

      {/* Grid 1: Price History & Product Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Price History */}
        <div className="bg-white rounded-2xl p-6 border border-agri-dark/8 shadow-soft">
          <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
            <div>
              <h4 className="font-bold text-base text-agri-dark">1. Price History Line Chart</h4>
              <p className="text-xs text-agri-slateText">Daily price points for {selectedProduct}</p>
            </div>
            <span className="text-xs font-bold text-agri-leaf">₹ / kg</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748B' }} unit=" ₹" />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#2D7A5D" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Product Comparison */}
        <div className="bg-white rounded-2xl p-6 border border-agri-dark/8 shadow-soft">
          <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
            <div>
              <h4 className="font-bold text-base text-agri-dark">2. Product Comparison Bar Chart</h4>
              <p className="text-xs text-agri-slateText">{selectedProduct} rates across Mandis</p>
            </div>
            <span className="text-xs font-bold text-agri-gold">Inter-market Spread</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="market" tick={{ fontSize: 10, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748B' }} unit=" ₹" />
                <Tooltip />
                <Bar dataKey="price" fill="#D49E35" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Grid 2: Supply vs Demand & Seasonal Pattern */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 3: Supply vs Demand */}
        <div className="bg-white rounded-2xl p-6 border border-agri-dark/8 shadow-soft">
          <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
            <div>
              <h4 className="font-bold text-base text-agri-dark flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-agri-leaf" /> 3. Supply vs Demand Index
              </h4>
              <p className="text-xs text-agri-slateText">Volume vs buyer interest score (0 - 100)</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={supplyDemandData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="market" tick={{ fontSize: 10, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748B' }} />
                <Tooltip />
                <Legend verticalAlign="top" wrapperStyle={{ fontSize: '11px', fontWeight: 600 }} />
                <Bar dataKey="supplyScore" name="Supply Volume Index" fill="#1B4D3E" radius={[4, 4, 0, 0]} />
                <Bar dataKey="demandScore" name="Buyer Demand Index" fill="#D49E35" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Seasonal Pattern Area Chart */}
        <div className="bg-white rounded-2xl p-6 border border-agri-dark/8 shadow-soft">
          <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
            <div>
              <h4 className="font-bold text-base text-agri-dark flex items-center gap-1.5">
                <CloudSun className="w-4 h-4 text-agri-gold" /> 4. Seasonal Price Cycle Pattern
              </h4>
              <p className="text-xs text-agri-slateText">Annual monthly price curve (Jan – Dec)</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={seasonalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748B' }} unit=" ₹" />
                <Tooltip />
                <Legend verticalAlign="top" wrapperStyle={{ fontSize: '11px', fontWeight: 600 }} />
                <Area type="monotone" dataKey="avgPrice" name="2026 Average" stroke="#2D7A5D" fill="#E8F5F0" strokeWidth={2} />
                <Area type="monotone" dataKey="historicalAvg" name="5-Yr Historical Benchmark" stroke="#D49E35" fill="#FEF7E6" strokeWidth={2} strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
