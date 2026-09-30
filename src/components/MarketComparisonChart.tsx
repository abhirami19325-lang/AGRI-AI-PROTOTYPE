import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Cell 
} from 'recharts';
import { mockMarketService } from '../services/mockMarketService';
import { DEMO_PRODUCTS } from '../data/demoProducts';
import { Store, Filter } from 'lucide-react';

export const MarketComparisonChart: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>('Tomato');
  const comparisonData = mockMarketService.getMarketComparison(selectedProduct);

  const colors = ['#7C3AED', '#8B5CF6', '#F59E0B', '#4C1D95'];

  return (
    <div className="bg-white rounded-3xl p-6 md:p-7 border border-agri-dark/8 shadow-soft card-hover-lift relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-purple-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-agri-amberLight text-agri-gold flex items-center justify-center shadow-xs">
              <Store className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-agri-dark">
              Market Price Comparison
            </h3>
          </div>
          <p className="text-xs text-agri-slateText mt-1">
            Current spot prices for {selectedProduct} across monitored hubs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-agri-slateText" />
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="bg-agri-offwhite border border-agri-leaf/20 rounded-xl px-3.5 py-2 text-xs font-semibold text-agri-dark focus:outline-none focus:ring-2 focus:ring-agri-leaf cursor-pointer shadow-xs"
          >
            {DEMO_PRODUCTS.map((prod) => (
              <option key={prod.id} value={prod.name}>
                {prod.icon} {prod.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={comparisonData} margin={{ top: 15, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3E8FF" vertical={false} />
            <XAxis 
              dataKey="market" 
              tick={{ fill: '#5B5488', fontSize: 11, fontWeight: 500 }} 
              axisLine={{ stroke: '#DDD6FE' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: '#5B5488', fontSize: 11 }} 
              axisLine={{ stroke: '#DDD6FE' }}
              tickLine={false}
              unit=" ₹"
            />
            <Tooltip 
              formatter={(val: any) => [`₹${val} / kg`, 'Current Spot Rate']}
              contentStyle={{ borderRadius: '16px', border: '1px solid #DDD6FE', fontSize: '12px', fontWeight: 'bold', boxShadow: '0 10px 25px rgba(124, 58, 237, 0.15)' }}
            />
            <Bar dataKey="price" radius={[10, 10, 0, 0]} barSize={42}>
              {comparisonData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-3 border-t border-purple-100 flex items-center justify-between text-xs text-agri-slateText">
        <span>Lowest: Pollachi (₹38)</span>
        <span>Highest: Mettupalayam (₹43)</span>
      </div>
    </div>
  );
};
