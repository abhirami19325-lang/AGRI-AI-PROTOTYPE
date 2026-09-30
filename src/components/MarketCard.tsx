import React from 'react';
import { Market } from '../types';
import { MapPin, Eye, Store, Calendar, ArrowUpRight } from 'lucide-react';

interface MarketCardProps {
  market: Market;
  onViewMarket: (market: Market) => void;
}

export const MarketCard: React.FC<MarketCardProps> = ({ market, onViewMarket }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-agri-dark/8 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-agri-lightLeaf/50 rounded-bl-full -z-0 pointer-events-none group-hover:scale-110 transition-transform" />

      <div className="z-10">
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="text-[10px] bg-agri-gold/20 text-agri-dark font-bold px-2 py-0.5 rounded border border-agri-gold/30 uppercase tracking-wider">
              {market.city}
            </span>
            <h3 className="font-extrabold text-lg text-agri-dark mt-1 group-hover:text-agri-leaf transition-colors flex items-center gap-1.5">
              <Store className="w-4 h-4 text-agri-leaf" /> {market.name}
            </h3>
          </div>

          <div className="w-10 h-10 rounded-xl bg-agri-offwhite text-agri-dark flex items-center justify-center font-bold text-xs border border-agri-dark/10 shadow-xs">
            ₹{market.avgPrice}
          </div>
        </div>

        <p className="text-xs text-agri-slateText flex items-center gap-1 mb-4">
          <MapPin className="w-3.5 h-3.5 text-agri-gold shrink-0" />
          <span className="truncate">{market.district}, Tamil Nadu</span>
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 p-3 bg-agri-offwhite rounded-xl border border-agri-dark/5 text-xs mb-4">
          <div>
            <span className="text-agri-slateText block text-[11px]">Products Tracked</span>
            <strong className="text-agri-dark text-sm font-bold">{market.productsCount}</strong>
          </div>
          <div>
            <span className="text-agri-slateText block text-[11px]">Observations</span>
            <strong className="text-agri-leaf text-sm font-bold">{market.observationsCount}</strong>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-agri-dark/5 flex items-center justify-between text-xs z-10">
        <span className="text-[11px] text-agri-slateText flex items-center gap-1">
          <Calendar className="w-3 h-3 text-agri-slateText" /> Updated {market.lastUpdated}
        </span>

        <button
          onClick={() => onViewMarket(market)}
          className="px-3.5 py-1.5 rounded-xl bg-agri-dark group-hover:bg-agri-leaf text-white font-bold text-xs flex items-center gap-1 transition-all shadow-xs"
        >
          <span>View Market</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-agri-gold" />
        </button>
      </div>
    </div>
  );
};
