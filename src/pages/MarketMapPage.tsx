import React, { useState } from 'react';
import { MarketMap } from '../components/MarketMap';
import { MarketDetailsModal } from '../components/MarketDetailsModal';
import { Market, PageId } from '../types';
import { Map as MapIcon, Sparkles } from 'lucide-react';

interface MarketMapPageProps {
  initialSelectedMarket: Market | null;
  onNavigate: (page: PageId) => void;
}

export const MarketMapPage: React.FC<MarketMapPageProps> = ({
  initialSelectedMarket,
  onNavigate,
}) => {
  const [selectedMarketModal, setSelectedMarketModal] = useState<Market | null>(initialSelectedMarket);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Info */}
      <div className="bg-white rounded-2xl p-6 border border-agri-dark/8 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-extrabold text-lg text-agri-dark flex items-center gap-2">
            <MapIcon className="w-5 h-5 text-agri-leaf" /> Full Agricultural Market Map
          </h3>
          <p className="text-xs text-agri-slateText">
            Geographical layout of wholesale Mandis across Coimbatore, Nilgiris transport corridors, and Pollachi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-agri-lightLeaf text-agri-leaf font-bold px-3 py-1 rounded-full border border-agri-leaf/30">
            <Sparkles className="w-2.5 h-2.5 inline mr-1" /> OpenStreetMap Interactive GIS
          </span>
        </div>
      </div>

      {/* Full-size Map Container */}
      <MarketMap
        heightClass="h-[650px]"
        onSelectMarket={(market) => setSelectedMarketModal(market)}
      />

      {/* Market Modal when marker view details clicked */}
      <MarketDetailsModal
        market={selectedMarketModal}
        onClose={() => setSelectedMarketModal(null)}
        onViewOnMap={() => setSelectedMarketModal(null)}
      />
    </div>
  );
};
