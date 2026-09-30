import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { mockMarketService } from '../services/mockMarketService';
import { DEMO_PRODUCTS } from '../data/demoProducts';
import { TrendingUp, Filter, Sparkles } from 'lucide-react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-agri-leaf/20 shadow-xl text-xs space-y-1.5">
        <p className="font-bold text-agri-dark border-b border-purple-100 pb-1 flex items-center justify-between gap-2">
          <span>{label} 2026</span>
          <span className="text-[10px] text-agri-leaf font-semibold">Coimbatore Mandi</span>
        </p>
        <div className="space-y-1">
          <p className="text-agri-leaf font-semibold flex items-center justify-between gap-4">
            <span>Actual Price:</span>
            <span className="text-sm font-bold text-agri-leaf">₹{payload[0].value} / kg</span>
          </p>
          {payload[1] && (
            <p className="text-agri-gold font-semibold flex items-center justify-between gap-4">
              <span>Estimated Trend:</span>
              <span className="text-sm font-bold text-agri-gold">₹{payload[1].value} / kg</span>
            </p>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export const PriceChart: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>('Tomato');
  const data = mockMarketService.getPriceTrends(selectedProduct);

  const selectedProdObj = DEMO_PRODUCTS.find(p => p.name === selectedProduct) || DEMO_PRODUCTS[0];

  return (
    <div className="bg-white rounded-3xl p-6 md:p-7 border border-agri-dark/8 shadow-soft card-hover-lift relative overflow-hidden">
      {/* Background Decorative Lavender Gradient Circle */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#ECE3F7]/60 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#ECE3F7]">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-agri-lightLeaf text-agri-leaf flex items-center justify-center shadow-xs">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-agri-dark">
              Agricultural Price Trends
            </h3>
            <span className="text-[10px] bg-agri-lightLeaf text-agri-leaf px-2 py-0.5 rounded-full font-bold uppercase border border-[#CBB2ED]/40">
              <Sparkles className="w-2.5 h-2.5 inline mr-0.5" /> Lavender Theme
            </span>
          </div>
          <p className="text-xs text-agri-slateText mt-1">
            Historical spot price observations and estimated trendlines in Tamil Nadu terminals.
          </p>
        </div>

        {/* Product Dropdown */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Filter className="w-4 h-4 text-agri-slateText" />
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="bg-agri-offwhite border border-agri-leaf/20 rounded-xl px-3.5 py-2 text-xs font-semibold text-agri-dark focus:outline-none focus:ring-2 focus:ring-agri-leaf cursor-pointer shadow-xs hover:border-agri-leaf transition-all"
          >
            {DEMO_PRODUCTS.map((prod) => (
              <option key={prod.id} value={prod.name}>
                {prod.icon} {prod.name} ({prod.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Recharts Chart */}
      <div className="h-72 md:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ECE3F7" vertical={false} />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#6E6285', fontSize: 11 }} 
              axisLine={{ stroke: '#CBB2ED' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: '#6E6285', fontSize: 11 }} 
              axisLine={{ stroke: '#CBB2ED' }}
              tickLine={false}
              unit=" ₹"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={36} 
              iconType="circle"
              wrapperStyle={{ fontSize: '12px', fontWeight: 600 }}
            />
            <Line
              type="monotone"
              dataKey="price"
              name={`Actual Price (${selectedProdObj.name})`}
              stroke="#9B72CF"
              strokeWidth={3.5}
              dot={{ r: 4, fill: '#9B72CF', strokeWidth: 2, stroke: '#FFFFFF' }}
              activeDot={{ r: 8, fill: '#875BBF', stroke: '#ECE3F7', strokeWidth: 3 }}
            />
            <Line
              type="monotone"
              dataKey="trendPrice"
              name="Estimated Trend"
              stroke="#D99B26"
              strokeWidth={2.5}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-3 border-t border-[#ECE3F7] flex items-center justify-between text-xs text-agri-slateText">
        <span>Units: ₹ / kg</span>
        <span className="font-semibold text-agri-leaf">Updated daily from direct field observations</span>
      </div>
    </div>
  );
};
