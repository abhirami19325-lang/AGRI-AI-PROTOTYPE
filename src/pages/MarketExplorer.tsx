import React, { useState, useMemo } from 'react';
import { Search, Filter, Store, MapPin, Sparkles } from 'lucide-react';
import { MarketCard } from '../components/MarketCard';
import { MarketDetailsModal } from '../components/MarketDetailsModal';
import { DEMO_MARKETS } from '../data/demoMarkets';
import { Market, PageId } from '../types';

interface MarketExplorerProps {
  onNavigate: (page: PageId) => void;
  onSelectMarketForMap: (market: Market) => void;
}

export const MarketExplorer: React.FC<MarketExplorerProps> = ({
  onNavigate,
  onSelectMarketForMap,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('ALL');
  const [selectedMarketModal, setSelectedMarketModal] = useState<Market | null>(null);

  const filteredMarkets = useMemo(() => {
    return DEMO_MARKETS.filter(m => {
      const matchesSearch = 
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.district.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCity = selectedCity === 'ALL' || m.city === selectedCity;

      return matchesSearch && matchesCity;
    });
  }, [searchTerm, selectedCity]);

  const uniqueCities = Array.from(new Set(DEMO_MARKETS.map(m => m.city)));

  const handleViewOnMap = (m: Market) => {
    setSelectedMarketModal(null);
    onSelectMarketForMap(m);
    onNavigate('market-map');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Controls */}
      <div className="bg-white rounded-2xl p-6 border border-agri-dark/8 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-lg text-agri-dark flex items-center gap-2">
              <Store className="w-5 h-5 text-agri-leaf" /> Agricultural Mandi Directory
            </h3>
            <p className="text-xs text-agri-slateText">
              Explore primary wholesale terminals and farmer auction markets in Western Tamil Nadu.
            </p>
          </div>

          <span className="text-[10px] bg-agri-lightLeaf text-agri-leaf font-bold px-2 py-1 rounded-full border border-agri-leaf/20 self-start sm:self-auto">
            <Sparkles className="w-2.5 h-2.5 inline mr-1" /> 4 Monitored Hubs
          </span>
        </div>

        {/* Search & Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-gray-100">
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-agri-slateText absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search markets, cities, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-agri-offwhite border border-agri-dark/15 rounded-xl text-xs font-medium focus:ring-2 focus:ring-agri-leaf"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-agri-slateText" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2 bg-agri-offwhite border border-agri-dark/15 rounded-xl text-xs font-medium text-agri-dark focus:ring-2 focus:ring-agri-leaf cursor-pointer"
            >
              <option value="ALL">All Locations ({uniqueCities.length})</option>
              {uniqueCities.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Markets Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMarkets.map(market => (
          <MarketCard
            key={market.id}
            market={market}
            onViewMarket={(m) => setSelectedMarketModal(m)}
          />
        ))}
      </div>

      {/* Modal */}
      <MarketDetailsModal
        market={selectedMarketModal}
        onClose={() => setSelectedMarketModal(null)}
        onViewOnMap={handleViewOnMap}
      />
    </div>
  );
};
