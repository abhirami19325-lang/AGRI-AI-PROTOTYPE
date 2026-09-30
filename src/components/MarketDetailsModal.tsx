import React from 'react';
import { Market } from '../types';
import { X, MapPin, Store, Calendar, TrendingUp, Map as MapIcon } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { mockMarketService } from '../services/mockMarketService';

interface MarketDetailsModalProps {
  market: Market | null;
  onClose: () => void;
  onViewOnMap: (market: Market) => void;
}

export const MarketDetailsModal: React.FC<MarketDetailsModalProps> = ({
  market,
  onClose,
  onViewOnMap,
}) => {
  if (!market) return null;

  const trendData = mockMarketService.getPriceTrends('Tomato');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-agri-dark/10 relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 pb-4 mb-4">
          <div>
            <span className="text-[10px] bg-agri-gold/20 text-agri-dark font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              {market.city} Mandi Hub
            </span>
            <h3 className="font-extrabold text-xl text-agri-dark mt-1 flex items-center gap-2">
              <Store className="w-5 h-5 text-agri-leaf" /> {market.name}
            </h3>
            <p className="text-xs text-agri-slateText flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-agri-gold" /> {market.address}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-agri-slateText hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-agri-offwhite p-3 rounded-xl border border-agri-dark/5">
            <span className="text-[11px] text-agri-slateText block">Products Tracked</span>
            <strong className="text-lg font-black text-agri-dark">{market.productsCount} Crops</strong>
          </div>

          <div className="bg-agri-lightLeaf p-3 rounded-xl border border-agri-leaf/20">
            <span className="text-[11px] text-agri-leaf block font-semibold">Average Spot Price</span>
            <strong className="text-lg font-black text-agri-emerald">₹{market.avgPrice} / kg</strong>
          </div>

          <div className="bg-agri-offwhite p-3 rounded-xl border border-agri-dark/5">
            <span className="text-[11px] text-agri-slateText block">Field Records</span>
            <strong className="text-lg font-black text-agri-dark">{market.observationsCount} Visits</strong>
          </div>
        </div>

        {/* Latest Observation Detail */}
        <div className="bg-agri-creamLight p-4 rounded-xl border border-agri-gold/30 mb-6">
          <div className="flex items-center justify-between text-xs font-bold text-agri-dark mb-1">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-agri-gold" /> Latest Field Inspection
            </span>
            <span className="text-agri-slateText font-medium">{market.lastUpdated}</span>
          </div>
          <p className="text-xs text-agri-charcoal leading-relaxed">
            &ldquo;Vegetable consignment arrivals steady. High volume trading recorded for Tomatoes and Nilgiri Carrots. Vendor pricing aligned with regional mandi benchmarks.&rdquo;
          </p>
        </div>

        {/* Market Trend Mini Chart */}
        <div className="mb-6">
          <h4 className="font-bold text-xs text-agri-dark uppercase tracking-wider mb-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-agri-leaf" /> Market Price Movement (Tomato)
          </h4>

          <div className="h-44 w-full bg-agri-offwhite/50 p-2 rounded-xl border border-agri-dark/5">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748B' }} unit=" ₹" />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#2D7A5D" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-200 text-agri-slateText text-xs font-bold hover:bg-gray-50"
          >
            Close
          </button>

          <button
            onClick={() => onViewOnMap(market)}
            className="px-5 py-2 rounded-xl bg-agri-leaf hover:bg-agri-leafHover text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <MapIcon className="w-4 h-4" />
            <span>View on Map</span>
          </button>
        </div>
      </div>
    </div>
  );
};
